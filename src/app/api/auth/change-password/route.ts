import crypto from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ensureSchema, getPool } from "@/lib/db";
import { generateSaltB64, generateSessionToken, hashPassword, sha256B64 } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SESSION_COOKIE = "otizmSessionV1";

const sameOriginOk = (req: Request) => {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const host = req.headers.get("host");
  if (!host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
};

const readBody = async (req: Request) => {
  try {
    return (await req.json()) as unknown;
  } catch {
    return null;
  }
};

export async function POST(req: Request) {
  try {
    if (!sameOriginOk(req)) {
      return NextResponse.json({ error: "İstek engellendi." }, { status: 403 });
    }

    const jar = await cookies();
    const token = jar.get(SESSION_COOKIE)?.value ?? null;
    if (!token) return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });

    const body = await readBody(req);
    const currentPassword = body && typeof body === "object" ? (body as { currentPassword?: unknown }).currentPassword : null;
    const newPassword = body && typeof body === "object" ? (body as { newPassword?: unknown }).newPassword : null;
    const newPassword2 = body && typeof body === "object" ? (body as { newPassword2?: unknown }).newPassword2 : null;

    if (typeof currentPassword !== "string" || currentPassword.length < 1) {
      return NextResponse.json({ error: "Mevcut şifre gerekli." }, { status: 400 });
    }
    if (typeof newPassword !== "string" || newPassword.length < 8) {
      return NextResponse.json({ error: "Yeni şifre en az 8 karakter olmalı." }, { status: 400 });
    }
    if (newPassword.length > 200) {
      return NextResponse.json({ error: "Yeni şifre çok uzun." }, { status: 400 });
    }
    if (newPassword2 !== newPassword) {
      return NextResponse.json({ error: "Yeni şifreler eşleşmiyor." }, { status: 400 });
    }

    await ensureSchema();
    const db = getPool();
    const tokenHashB64 = sha256B64(token);

    const userRes = await db.query(
      `
        SELECT u.id, u.password_hash, u.salt_b64
        FROM sessions s
        JOIN users u ON u.id = s.user_id
        WHERE s.token_hash_b64 = $1 AND s.expires_at > $2
        LIMIT 1
      `,
      [tokenHashB64, new Date().toISOString()]
    );
    const row = userRes.rows[0] as { id?: string; password_hash?: string; salt_b64?: string } | undefined;
    if (!row?.id || !row.password_hash || !row.salt_b64) {
      return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });
    }

    const computed = await hashPassword(currentPassword, row.salt_b64);
    if (computed !== row.password_hash) {
      return NextResponse.json({ error: "Mevcut şifre hatalı." }, { status: 401 });
    }

    const nextSalt = generateSaltB64();
    const nextHash = await hashPassword(newPassword, nextSalt);

    await db.query("UPDATE users SET password_hash = $1, salt_b64 = $2 WHERE id = $3", [nextHash, nextSalt, row.id]);

    await db.query("DELETE FROM sessions WHERE user_id = $1", [row.id]);

    const nextToken = generateSessionToken();
    const nextTokenHashB64 = sha256B64(nextToken);
    const sessionId = crypto.randomUUID();
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);

    await db.query(
      "INSERT INTO sessions (id, user_id, token_hash_b64, created_at, expires_at) VALUES ($1, $2, $3, $4, $5)",
      [sessionId, row.id, nextTokenHashB64, createdAt.toISOString(), expiresAt.toISOString()]
    );

    jar.set({
      name: SESSION_COOKIE,
      value: nextToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Sunucu hatası." }, { status: 500 });
  }
}


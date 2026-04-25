import crypto from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ensureSchema, getPool } from "@/lib/db";
import { generateSaltB64, generateSessionToken, hashPassword, normalizeEmail, sha256B64 } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SESSION_COOKIE = "otizmSessionV1";

type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number };

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

const getClientKey = (req: Request) => {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0]?.trim() : req.headers.get("x-real-ip");
  return ip && ip.length > 0 ? ip : "unknown";
};

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

const rateLimit = (bucketKey: string, limit: number, windowMs: number): RateLimitResult => {
  const now = Date.now();
  const existing = rateBuckets.get(bucketKey);
  if (!existing || existing.resetAt <= now) {
    rateBuckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (existing.count >= limit) {
    return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)) };
  }
  existing.count += 1;
  rateBuckets.set(bucketKey, existing);
  return { ok: true };
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
    const rl = rateLimit(`register:${getClientKey(req)}`, 10, 60_000);
    if (!rl.ok) {
      return NextResponse.json(
        { error: `Çok fazla deneme yapıldı. ${rl.retryAfterSeconds} sn sonra tekrar deneyin.` },
        { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } }
      );
    }

    const body = await readBody(req);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
    }

    const candidate = body as { email?: unknown; password?: unknown };
    const email = typeof candidate.email === "string" ? normalizeEmail(candidate.email) : "";
    const password = typeof candidate.password === "string" ? candidate.password : "";

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Geçerli bir e-posta girin." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Şifre en az 8 karakter olmalı." }, { status: 400 });
    }

    await ensureSchema();
    const db = getPool();

    const exists = await db.query("SELECT 1 FROM users WHERE email = $1 LIMIT 1", [email]);
    if (exists.rowCount && exists.rowCount > 0) {
      return NextResponse.json({ error: "Bu e-posta ile zaten kayıt var." }, { status: 409 });
    }

    const userId = crypto.randomUUID();
    const saltB64 = generateSaltB64();
    const passwordHashB64 = await hashPassword(password, saltB64);

    await db.query(
      "INSERT INTO users (id, email, password_hash, salt_b64, created_at) VALUES ($1, $2, $3, $4, $5)",
      [userId, email, passwordHashB64, saltB64, new Date().toISOString()]
    );

    const token = generateSessionToken();
    const tokenHashB64 = sha256B64(token);
    const sessionId = crypto.randomUUID();
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);

    await db.query(
      "INSERT INTO sessions (id, user_id, token_hash_b64, created_at, expires_at) VALUES ($1, $2, $3, $4, $5)",
      [sessionId, userId, tokenHashB64, createdAt.toISOString(), expiresAt.toISOString()]
    );

    const jar = await cookies();
    jar.set({
      name: SESSION_COOKIE,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return NextResponse.json({ email });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Sunucu hatası.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ensureSchema, getPool } from "@/lib/db";
import { hashPassword, sha256B64 } from "@/lib/auth";

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
    const confirm = body && typeof body === "object" ? (body as { confirm?: unknown }).confirm : null;
    const password = body && typeof body === "object" ? (body as { password?: unknown }).password : null;

    if (confirm !== "SIL") {
      return NextResponse.json({ error: 'Onay gerekli. confirm="SIL"' }, { status: 400 });
    }
    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json({ error: "Şifre gerekli (en az 8 karakter)." }, { status: 400 });
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

    const computed = await hashPassword(password, row.salt_b64);
    if (computed !== row.password_hash) {
      return NextResponse.json({ error: "Şifre hatalı." }, { status: 401 });
    }

    await db.query("DELETE FROM users WHERE id = $1", [row.id]);

    jar.set({
      name: SESSION_COOKIE,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Sunucu hatası." }, { status: 500 });
  }
}


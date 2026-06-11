import crypto from "crypto";
import { NextResponse } from "next/server";
import { ensureSchema, getPool } from "@/lib/db";
import { normalizeEmail, sha256B64 } from "@/lib/auth";
import { sendResetEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function POST(req: Request) {
  try {
    if (!sameOriginOk(req)) {
      return NextResponse.json({ error: "İstek engellendi." }, { status: 403 });
    }
    const rl = rateLimit(`forgot:${getClientKey(req)}`, 5, 60_000); // Max 5 requests per minute
    if (!rl.ok) {
      return NextResponse.json(
        { error: `Çok fazla deneme yapıldı. ${rl.retryAfterSeconds} sn sonra tekrar deneyin.` },
        { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } }
      );
    }

    let body: any = null;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
    }

    const email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Geçerli bir e-posta girin." }, { status: 400 });
    }

    await ensureSchema();
    const db = getPool();

    // Check if user exists in db
    const userRes = await db.query("SELECT id FROM users WHERE email = $1 LIMIT 1", [email]);
    if (userRes.rows.length === 0) {
      // Standard security practice: return success even if email does not exist to prevent harvesting active user emails
      return NextResponse.json({ message: "Şifre sıfırlama kodu e-posta adresinize gönderildi (eğer kayıtlıysa)." });
    }

    // Generate a 6-digit numeric verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = sha256B64(code);

    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 15 * 60 * 1000); // 15 minutes expiration
    const resetId = crypto.randomUUID();

    // Remove any previous active reset codes for this email
    await db.query("DELETE FROM password_resets WHERE email = $1", [email]);

    // Insert new reset entry
    await db.query(
      "INSERT INTO password_resets (id, email, code_hash, created_at, expires_at) VALUES ($1, $2, $3, $4, $5)",
      [resetId, email, codeHash, createdAt.toISOString(), expiresAt.toISOString()]
    );

    // Call email helper
    await sendResetEmail(email, code);

    return NextResponse.json({ message: "Şifre sıfırlama kodu e-posta adresinize gönderildi." });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Sunucu hatası.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

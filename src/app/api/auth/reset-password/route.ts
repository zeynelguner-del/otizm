import { NextResponse } from "next/server";
import { ensureSchema, getPool } from "@/lib/db";
import { generateSaltB64, hashPassword, normalizeEmail, sha256B64 } from "@/lib/auth";

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
    const rl = rateLimit(`reset:${getClientKey(req)}`, 10, 60_000); // Max 10 attempts per minute
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
    const code = typeof body?.code === "string" ? body.code.trim() : "";
    const newPassword = typeof body?.newPassword === "string" ? body.newPassword : "";

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Geçerli bir e-posta girin." }, { status: 400 });
    }
    if (!code || code.length !== 6) {
      return NextResponse.json({ error: "6 haneli doğrulama kodunu girin." }, { status: 400 });
    }
    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json({ error: "Yeni şifre en az 8 karakter olmalıdır." }, { status: 400 });
    }

    await ensureSchema();
    const db = getPool();

    // Fetch active reset code record
    const resetRes = await db.query(
      "SELECT id, code_hash, expires_at FROM password_resets WHERE email = $1 ORDER BY created_at DESC LIMIT 1",
      [email]
    );

    if (resetRes.rows.length === 0) {
      return NextResponse.json({ error: "Sıfırlama talebi bulunamadı veya süresi geçmiş." }, { status: 400 });
    }

    const resetRow = resetRes.rows[0] as { id: string; code_hash: string; expires_at: Date };
    
    // Check if expired
    if (new Date(resetRow.expires_at).getTime() < Date.now()) {
      await db.query("DELETE FROM password_resets WHERE email = $1", [email]);
      return NextResponse.json({ error: "Doğrulama kodunun süresi dolmuş." }, { status: 400 });
    }

    // Verify hashed code
    const inputCodeHash = sha256B64(code);
    if (inputCodeHash !== resetRow.code_hash) {
      return NextResponse.json({ error: "Doğrulama kodu hatalı." }, { status: 400 });
    }

    // Fetch user
    const userRes = await db.query("SELECT id FROM users WHERE email = $1 LIMIT 1", [email]);
    if (userRes.rows.length === 0) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });
    }
    const userId = userRes.rows[0].id;

    // Generate new salt and hash the new password
    const newSalt = generateSaltB64();
    const newHash = await hashPassword(newPassword, newSalt);

    // Update user password and salt
    await db.query("UPDATE users SET password_hash = $1, salt_b64 = $2 WHERE id = $3", [
      newHash,
      newSalt,
      userId,
    ]);

    // Log out user everywhere by deleting active session tokens
    await db.query("DELETE FROM sessions WHERE user_id = $1", [userId]);

    // Clean up reset code records
    await db.query("DELETE FROM password_resets WHERE email = $1", [email]);

    return NextResponse.json({ message: "Şifreniz başarıyla güncellendi. Giriş yapabilirsiniz." });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Sunucu hatası.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

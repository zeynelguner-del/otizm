import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ensureSchema, getPool } from "@/lib/db";
import { sha256B64 } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SESSION_COOKIE = "otizmSessionV1";

export async function GET() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value ?? null;
  if (!token) return NextResponse.json({ session: null });

  try {
    await ensureSchema();
    const db = getPool();
    const tokenHashB64 = sha256B64(token);
    const res = await db.query(
      `
        SELECT u.id, u.email
        FROM sessions s
        JOIN users u ON u.id = s.user_id
        WHERE s.token_hash_b64 = $1 AND s.expires_at > $2
        LIMIT 1
      `,
      [tokenHashB64, new Date().toISOString()]
    );
    const row = res.rows[0] as { id?: string; email?: string } | undefined;
    if (!row?.id || !row.email) {
      jar.set({
        name: SESSION_COOKIE,
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      return NextResponse.json({ session: null });
    }
    const consentRes = await db.query("SELECT version, accepted_at FROM kvkk_consents WHERE user_id = $1 LIMIT 1", [row.id]);
    const consent = consentRes.rows[0] as { version?: number; accepted_at?: string } | undefined;
    const kvkkAccepted = typeof consent?.accepted_at === "string";
    return NextResponse.json({
      session: { email: row.email },
      kvkkAccepted,
      kvkkVersion: kvkkAccepted ? (consent?.version ?? 1) : null,
      kvkkAcceptedAt: kvkkAccepted ? (consent?.accepted_at ?? null) : null,
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Sunucu hatası." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ensureSchema, getPool } from "@/lib/db";
import { sha256B64 } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SESSION_COOKIE = "otizmSessionV1";

const getAuthedUser = async () => {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value ?? null;
  if (!token) return null;
  await ensureSchema();
  const db = getPool();
  const tokenHashB64 = sha256B64(token);
  const res = await db.query(
    `
      SELECT u.id, u.email, u.created_at
      FROM sessions s
      JOIN users u ON u.id = s.user_id
      WHERE s.token_hash_b64 = $1 AND s.expires_at > $2
      LIMIT 1
    `,
    [tokenHashB64, new Date().toISOString()]
  );
  const row = res.rows[0] as { id?: string; email?: string; created_at?: string } | undefined;
  if (!row?.id || !row.email || !row.created_at) return null;
  return { id: row.id, email: row.email, createdAt: row.created_at };
};

export async function GET() {
  try {
    const user = await getAuthedUser();
    if (!user) return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });

    const db = getPool();
    const consentRes = await db.query("SELECT version, accepted_at FROM kvkk_consents WHERE user_id = $1 LIMIT 1", [user.id]);
    const consentRow = consentRes.rows[0] as { version?: number; accepted_at?: string } | undefined;

    const sessionsRes = await db.query(
      "SELECT created_at, expires_at FROM sessions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20",
      [user.id]
    );
    const sessions = sessionsRes.rows
      .map((r) => r as { created_at?: string; expires_at?: string })
      .filter((r) => typeof r.created_at === "string" && typeof r.expires_at === "string")
      .map((r) => ({ createdAt: r.created_at as string, expiresAt: r.expires_at as string }));

    const payload = {
      exportedAt: new Date().toISOString(),
      user: { email: user.email, createdAt: user.createdAt },
      kvkkConsent: consentRow?.accepted_at ? { version: consentRow.version ?? 1, acceptedAt: consentRow.accepted_at } : null,
      sessions,
    };

    return new NextResponse(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "content-disposition": `attachment; filename="otizm-veri-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Sunucu hatası." }, { status: 500 });
  }
}


import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ensureSchema, getPool } from "@/lib/db";
import { sha256B64 } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SESSION_COOKIE = "otizmSessionV1";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const getAdminEmails = () => {
  const raw = process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "";
  if (!raw) return [];
  return raw
    .split(",")
    .map((e) => normalizeEmail(e))
    .filter(Boolean);
};

const getAuthedEmail = async () => {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value ?? null;
  if (!token) return null;
  await ensureSchema();
  const db = getPool();
  const tokenHashB64 = sha256B64(token);
  const res = await db.query(
    `
      SELECT u.email
      FROM sessions s
      JOIN users u ON u.id = s.user_id
      WHERE s.token_hash_b64 = $1 AND s.expires_at > $2
      LIMIT 1
    `,
    [tokenHashB64, new Date().toISOString()]
  );
  const row = res.rows[0] as { email?: string } | undefined;
  return typeof row?.email === "string" ? row.email : null;
};

export async function GET() {
  try {
    const email = await getAuthedEmail();
    if (!email) return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });

    const admins = getAdminEmails();
    if (admins.length === 0) return NextResponse.json({ error: "Yönetici yapılandırılmadı." }, { status: 403 });
    if (!admins.includes(normalizeEmail(email))) return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });

    const db = getPool();
    const nowIso = new Date().toISOString();

    const usersRes = await db.query("SELECT COUNT(*)::int AS count, MAX(created_at) AS last_created_at FROM users");
    const sessionsRes = await db.query("SELECT COUNT(*)::int AS count FROM sessions WHERE expires_at > $1", [nowIso]);
    const kvkkRes = await db.query("SELECT COUNT(*)::int AS count FROM kvkk_consents");
    const profilesRes = await db.query("SELECT COUNT(*)::int AS count FROM user_profiles");
    const last7dRes = await db.query(
      "SELECT COUNT(*)::int AS count FROM users WHERE created_at >= ($1::timestamptz - interval '7 days')",
      [nowIso]
    );

    const usersRow = usersRes.rows[0] as { count?: number; last_created_at?: string | null } | undefined;
    const sessionsRow = sessionsRes.rows[0] as { count?: number } | undefined;
    const kvkkRow = kvkkRes.rows[0] as { count?: number } | undefined;
    const profilesRow = profilesRes.rows[0] as { count?: number } | undefined;
    const last7dRow = last7dRes.rows[0] as { count?: number } | undefined;

    return NextResponse.json({
      now: nowIso,
      usersTotal: typeof usersRow?.count === "number" ? usersRow.count : 0,
      usersLastCreatedAt: typeof usersRow?.last_created_at === "string" ? usersRow.last_created_at : null,
      usersLast7Days: typeof last7dRow?.count === "number" ? last7dRow.count : 0,
      sessionsActive: typeof sessionsRow?.count === "number" ? sessionsRow.count : 0,
      kvkkAccepted: typeof kvkkRow?.count === "number" ? kvkkRow.count : 0,
      profilesSaved: typeof profilesRow?.count === "number" ? profilesRow.count : 0,
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Sunucu hatası." }, { status: 500 });
  }
}

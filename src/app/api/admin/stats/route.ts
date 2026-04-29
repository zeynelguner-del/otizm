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

const toIsoOrNull = (value: unknown) => {
  if (typeof value === "string") return value;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString();
  return null;
};

type ProfileMini = { email: string; updatedAt: string | null; activeProfileId: string | null; profileNames: string[]; profileCount: number };

const extractProfileNames = (raw: unknown) => {
  if (!Array.isArray(raw)) return [];
  const out: string[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const id = typeof o.id === "string" ? o.id : "";
    if (!id) continue;
    const name = typeof o.name === "string" ? o.name.trim() : "";
    out.push(name || "İsimsiz");
  }
  return out;
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
    const profilesListRes = await db.query(
      `
        SELECT u.email, up.profiles_json, up.active_profile_id, up.updated_at
        FROM user_profiles up
        JOIN users u ON u.id = up.user_id
        ORDER BY up.updated_at DESC
        LIMIT 50
      `
    );

    const usersRow = usersRes.rows[0] as { count?: number; last_created_at?: unknown } | undefined;
    const sessionsRow = sessionsRes.rows[0] as { count?: number } | undefined;
    const kvkkRow = kvkkRes.rows[0] as { count?: number } | undefined;
    const profilesRow = profilesRes.rows[0] as { count?: number } | undefined;
    const last7dRow = last7dRes.rows[0] as { count?: number } | undefined;
    const profilesList: ProfileMini[] = profilesListRes.rows
      .map((r) => {
        const email = typeof r.email === "string" ? r.email : "";
        const profileNames = extractProfileNames(r.profiles_json);
        return {
          email,
          updatedAt: toIsoOrNull(r.updated_at),
          activeProfileId: typeof r.active_profile_id === "string" ? r.active_profile_id : null,
          profileNames,
          profileCount: profileNames.length,
        };
      })
      .filter((x) => x.email);

    return NextResponse.json({
      now: nowIso,
      usersTotal: typeof usersRow?.count === "number" ? usersRow.count : 0,
      usersLastCreatedAt: toIsoOrNull(usersRow?.last_created_at),
      usersLast7Days: typeof last7dRow?.count === "number" ? last7dRow.count : 0,
      sessionsActive: typeof sessionsRow?.count === "number" ? sessionsRow.count : 0,
      kvkkAccepted: typeof kvkkRow?.count === "number" ? kvkkRow.count : 0,
      profilesSaved: typeof profilesRow?.count === "number" ? profilesRow.count : 0,
      profilesList,
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Sunucu hatası." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ensureSchema, getPool } from "@/lib/db";
import { sha256B64 } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SESSION_COOKIE = "otizmSessionV1";

type Profile = {
  id: string;
  name: string;
  birthDate: string;
  familyNotes: string;
  educationNotes: string;
  legacyAge: string;
  photoDataUrl: string;
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

const readBody = async (req: Request) => {
  try {
    return (await req.json()) as unknown;
  } catch {
    return null;
  }
};

const toDateInputValue = (isoOrEmpty: string) => {
  if (!isoOrEmpty) return "";
  const m = isoOrEmpty.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return "";
  return `${m[1]}-${m[2]}-${m[3]}`;
};

const normalizeProfiles = (v: unknown): Profile[] | null => {
  if (!Array.isArray(v)) return null;
  const out: Profile[] = [];
  for (const item of v) {
    if (!item || typeof item !== "object") return null;
    const o = item as Record<string, unknown>;
    const id = typeof o.id === "string" ? o.id : "";
    const name = typeof o.name === "string" ? o.name : "";
    const birthDate = typeof o.birthDate === "string" ? toDateInputValue(o.birthDate) : "";
    const legacyAge = typeof o.legacyAge === "string" ? o.legacyAge : typeof o.age === "string" ? o.age : "";
    const familyNotes = typeof o.familyNotes === "string" ? o.familyNotes : "";
    const educationNotes = typeof o.educationNotes === "string" ? o.educationNotes : "";
    const photoDataUrl = typeof o.photoDataUrl === "string" ? o.photoDataUrl : "";
    if (!id) return null;
    out.push({
      id: id.slice(0, 64),
      name: name.slice(0, 200),
      birthDate: birthDate.slice(0, 10),
      familyNotes: familyNotes.slice(0, 5000),
      educationNotes: educationNotes.slice(0, 5000),
      legacyAge: legacyAge.slice(0, 32),
      photoDataUrl: photoDataUrl.slice(0, 200_000),
    });
    if (out.length > 50) return null;
  }
  return out;
};

const getAuthedUserId = async () => {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value ?? null;
  if (!token) return null;
  await ensureSchema();
  const db = getPool();
  const tokenHashB64 = sha256B64(token);
  const res = await db.query(
    `
      SELECT u.id
      FROM sessions s
      JOIN users u ON u.id = s.user_id
      WHERE s.token_hash_b64 = $1 AND s.expires_at > $2
      LIMIT 1
    `,
    [tokenHashB64, new Date().toISOString()]
  );
  const row = res.rows[0] as { id?: string } | undefined;
  return row?.id ?? null;
};

export async function GET() {
  try {
    const userId = await getAuthedUserId();
    if (!userId) return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });

    const db = getPool();
    const res = await db.query(
      "SELECT profiles_json, active_profile_id, updated_at FROM user_profiles WHERE user_id = $1 LIMIT 1",
      [userId]
    );
    const row = res.rows[0] as { profiles_json?: unknown; active_profile_id?: unknown; updated_at?: unknown } | undefined;
    if (!row) return NextResponse.json({ profile: null });

    const profiles = normalizeProfiles(row.profiles_json);
    const activeProfileId = typeof row.active_profile_id === "string" ? row.active_profile_id : "";
    if (!profiles || !activeProfileId) return NextResponse.json({ profile: null });

    return NextResponse.json({
      profile: {
        profiles,
        activeProfileId,
        updatedAt: typeof row.updated_at === "string" ? row.updated_at : null,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Sunucu hatası." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!sameOriginOk(req)) {
      return NextResponse.json({ error: "İstek engellendi." }, { status: 403 });
    }

    const userId = await getAuthedUserId();
    if (!userId) return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });

    const body = await readBody(req);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
    }
    const obj = body as { profiles?: unknown; activeProfileId?: unknown };
    const profiles = normalizeProfiles(obj.profiles);
    const activeProfileId = typeof obj.activeProfileId === "string" ? obj.activeProfileId : "";
    if (!profiles || !activeProfileId) return NextResponse.json({ error: "Geçersiz veri." }, { status: 400 });
    if (!profiles.some((p) => p.id === activeProfileId)) return NextResponse.json({ error: "Geçersiz profil seçimi." }, { status: 400 });

    const db = getPool();
    const now = new Date().toISOString();
    await db.query(
      `
        INSERT INTO user_profiles (user_id, profiles_json, active_profile_id, updated_at)
        VALUES ($1, $2::jsonb, $3, $4)
        ON CONFLICT (user_id)
        DO UPDATE SET profiles_json = EXCLUDED.profiles_json, active_profile_id = EXCLUDED.active_profile_id, updated_at = EXCLUDED.updated_at
      `,
      [userId, JSON.stringify(profiles), activeProfileId, now]
    );

    return NextResponse.json({ ok: true, updatedAt: now });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Sunucu hatası." }, { status: 500 });
  }
}

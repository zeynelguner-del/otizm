import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ensureSchema, getPool } from "@/lib/db";
import { sha256B64 } from "@/lib/auth";

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

type UserMeta = {
  userFullName: string;
  userPhone: string;
  instructorPhone: string;
  doctorPhone: string;
};

const normalizeMeta = (raw: unknown): UserMeta => {
  const o = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const userFullName = typeof o.userFullName === "string" ? o.userFullName : "";
  const userPhone = typeof o.userPhone === "string" ? o.userPhone : "";
  const instructorPhone = typeof o.instructorPhone === "string" ? o.instructorPhone : "";
  const doctorPhone = typeof o.doctorPhone === "string" ? o.doctorPhone : "";
  return {
    userFullName: userFullName.slice(0, 200),
    userPhone: userPhone.slice(0, 64),
    instructorPhone: instructorPhone.slice(0, 64),
    doctorPhone: doctorPhone.slice(0, 64),
  };
};

const mergeMeta = (base: UserMeta, patch: Partial<UserMeta>): UserMeta => {
  const next: UserMeta = { ...base };
  if (typeof patch.userFullName === "string") next.userFullName = patch.userFullName.slice(0, 200);
  if (typeof patch.userPhone === "string") next.userPhone = patch.userPhone.slice(0, 64);
  if (typeof patch.instructorPhone === "string") next.instructorPhone = patch.instructorPhone.slice(0, 64);
  if (typeof patch.doctorPhone === "string") next.doctorPhone = patch.doctorPhone.slice(0, 64);
  return next;
};

export async function GET() {
  try {
    const userId = await getAuthedUserId();
    if (!userId) return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });

    const db = getPool();
    const res = await db.query("SELECT meta_json, updated_at FROM user_meta WHERE user_id = $1 LIMIT 1", [userId]);
    const row = res.rows[0] as { meta_json?: unknown; updated_at?: unknown } | undefined;
    if (!row) return NextResponse.json({ meta: null });

    const meta = normalizeMeta(row.meta_json);
    const updatedAt = typeof row.updated_at === "string" ? row.updated_at : null;
    return NextResponse.json({ meta, updatedAt });
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

    const obj = body as Partial<UserMeta>;
    const patch: Partial<UserMeta> = {};
    if (typeof obj.userFullName === "string") patch.userFullName = obj.userFullName.trim();
    if (typeof obj.userPhone === "string") patch.userPhone = obj.userPhone.trim();
    if (typeof obj.instructorPhone === "string") patch.instructorPhone = obj.instructorPhone.trim();
    if (typeof obj.doctorPhone === "string") patch.doctorPhone = obj.doctorPhone.trim();

    const db = getPool();
    const existingRes = await db.query("SELECT meta_json FROM user_meta WHERE user_id = $1 LIMIT 1", [userId]);
    const existingRow = existingRes.rows[0] as { meta_json?: unknown } | undefined;
    const base = normalizeMeta(existingRow?.meta_json);
    const next = mergeMeta(base, patch);
    const now = new Date().toISOString();

    await db.query(
      `
        INSERT INTO user_meta (user_id, meta_json, updated_at)
        VALUES ($1, $2::jsonb, $3)
        ON CONFLICT (user_id)
        DO UPDATE SET meta_json = EXCLUDED.meta_json, updated_at = EXCLUDED.updated_at
      `,
      [userId, JSON.stringify(next), now]
    );

    return NextResponse.json({ ok: true, updatedAt: now });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Sunucu hatası." }, { status: 500 });
  }
}

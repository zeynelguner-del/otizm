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

export async function POST(req: Request) {
  try {
    if (!sameOriginOk(req)) {
      return NextResponse.json({ error: "İstek engellendi." }, { status: 403 });
    }

    const jar = await cookies();
    const token = jar.get(SESSION_COOKIE)?.value ?? null;
    if (!token) return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });

    const body = await readBody(req);
    const version = (() => {
      if (!body || typeof body !== "object") return 1;
      const v = (body as { version?: unknown }).version;
      return typeof v === "number" && Number.isFinite(v) && v >= 1 ? Math.floor(v) : 1;
    })();

    await ensureSchema();
    const db = getPool();
    const tokenHashB64 = sha256B64(token);
    const userRes = await db.query(
      `
        SELECT u.id
        FROM sessions s
        JOIN users u ON u.id = s.user_id
        WHERE s.token_hash_b64 = $1 AND s.expires_at > $2
        LIMIT 1
      `,
      [tokenHashB64, new Date().toISOString()]
    );
    const row = userRes.rows[0] as { id?: string } | undefined;
    if (!row?.id) return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });

    await db.query(
      `
        INSERT INTO kvkk_consents (user_id, version, accepted_at)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id)
        DO UPDATE SET version = EXCLUDED.version, accepted_at = EXCLUDED.accepted_at
      `,
      [row.id, version, new Date().toISOString()]
    );

    return NextResponse.json({ ok: true, version });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Sunucu hatası." }, { status: 500 });
  }
}


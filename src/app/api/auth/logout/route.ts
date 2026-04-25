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

export async function POST(req: Request) {
  try {
    if (!sameOriginOk(req)) {
      return NextResponse.json({ error: "İstek engellendi." }, { status: 403 });
    }

    const jar = await cookies();
    const token = jar.get(SESSION_COOKIE)?.value ?? null;

    if (token) {
      try {
        await ensureSchema();
        const db = getPool();
        const tokenHashB64 = sha256B64(token);
        await db.query("DELETE FROM sessions WHERE token_hash_b64 = $1", [tokenHashB64]);
      } catch {}
    }

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
    const msg = e instanceof Error ? e.message : "Sunucu hatası.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

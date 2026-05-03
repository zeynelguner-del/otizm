import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(_req: NextRequest) {
  const body = "google.com, pub-6555296619233151, DIRECT, f08c47fec0942fa0\n";
  return new NextResponse(body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}

export const config = {
  matcher: ["/ads.txt"],
};


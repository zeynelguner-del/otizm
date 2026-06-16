export const runtime = "nodejs";

export async function GET() {
  const body = 
    "google.com, pub-6555296619233151, DIRECT, f08c47fec0942fa0\n" +
    "google.com, pub-7473340730819857, DIRECT, f08c47fec0942fa0\n" +
    "google.com, pub-6550290611228151, DIRECT, f08c47fec0942fa0\n";
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}


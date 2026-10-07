// Liveness probe for Docker / the reverse proxy. Deliberately says nothing about the config.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok", timestamp: new Date().toISOString() });
}

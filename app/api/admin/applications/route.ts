import { getPool } from '@/server/db';
import type { Application } from '@/server/db';

export async function GET() {
  const p = getPool();
  if (!p) {
    return new Response(JSON.stringify({ error: 'No DB connection' }), { status: 500 });
  }
  const [rows] = await p.query(`SELECT * FROM "Application" ORDER BY "submittedAt" DESC`);
  const apps = rows as unknown as Application[];
  return new Response(JSON.stringify(apps), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

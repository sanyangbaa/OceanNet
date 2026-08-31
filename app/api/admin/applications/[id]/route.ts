import { NextResponse } from "next/server";
import { getApplicationById, updateApplication } from "@/lib/careers";
import { getPool } from "@/server/db";
import { getSession } from "@/lib/auth";

type IdParams = { id: string } | Promise<{ id: string }>;

export async function GET(request: Request, context: { params: IdParams }) {
  const params = await Promise.resolve(context.params);
  const app = await getApplicationById(params.id);
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(app);
}

export async function PUT(request: Request, context: { params: IdParams }) {
  try {
    const body = await request.json();
    const params = await Promise.resolve(context.params);
    const updated = await updateApplication(params.id, { status: body.status, internalNotes: body.internalNotes });
    return NextResponse.json({ application: updated });
  } catch (e) {
    console.error('Update application error', e);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: IdParams }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const params = await Promise.resolve(context.params);
    const p = getPool();
    if (!p) return NextResponse.json({ error: "No DB" }, { status: 500 });

    await p.execute(`DELETE FROM "Application" WHERE id = ?`, [params.id]);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Delete application error', e);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

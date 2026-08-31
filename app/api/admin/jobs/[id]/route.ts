import { NextResponse } from "next/server";
import { getJobById, updateJob, deleteJob } from "@/lib/careers";
import { getSession } from "@/lib/auth";

type IdParams = { id: string } | Promise<{ id: string }>;

export async function GET(request: Request, context: { params: IdParams }) {
  const params = await Promise.resolve(context.params);
  const job = await getJobById(params.id);
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(job);
}

export async function PUT(request: Request, context: { params: IdParams }) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const params = await Promise.resolve(context.params);
    const data = await request.json();
    // Ensure expiresAt is a Date when provided (client sends YYYY-MM-DD string)
    if (data?.expiresAt) {
      try {
        data.expiresAt = new Date(data.expiresAt);
      } catch (e) {
        // leave as-is; updateJob will handle or throw
      }
    }
    const updated = await updateJob(params.id, data);
    return NextResponse.json(updated);
  } catch (e) {
    console.error("Update job error", e);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: IdParams }) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const params = await Promise.resolve(context.params);
    await deleteJob(params.id);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Delete job error", e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getJobById, updateJob, deleteJob } from "@/lib/careers";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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
      return NextResponse.json({ error: "Unauthorized. Please log in to admin first." }, { status: 401 });

    const params = await Promise.resolve(context.params);
    const data = await request.json().catch(() => null);
    if (!data) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    // Ensure expiresAt is a Date when provided
    if ("expiresAt" in data) {
      if (data.expiresAt) {
        const d = new Date(data.expiresAt);
        data.expiresAt = !isNaN(d.getTime()) ? d : null;
      } else {
        data.expiresAt = null;
      }
    }
    const updated = await updateJob(params.id, data);
    if (!updated) {
      return NextResponse.json({ error: "Job not found or update failed" }, { status: 404 });
    }

    try {
      revalidatePath("/admin/careers");
      revalidatePath("/careers");
    } catch {}

    return NextResponse.json(updated);
  } catch (e: any) {
    console.error("Update job error", e);
    return NextResponse.json({ error: e?.message || "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: IdParams }) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized. Please log in to admin first." }, { status: 401 });

    const params = await Promise.resolve(context.params);
    await deleteJob(params.id);

    try {
      revalidatePath("/admin/careers");
      revalidatePath("/careers");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("Delete job error", e);
    return NextResponse.json({ error: e?.message || "Failed to delete" }, { status: 500 });
  }
}


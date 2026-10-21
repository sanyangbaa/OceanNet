import { createJob, getAllJobs } from "@/lib/careers";
import { getSession } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  const jobs = await getAllJobs();
  return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to admin first." },
        { status: 401 },
      );
    }

    const data = await request.json().catch(() => null);
    if (!data || !data.title || typeof data.title !== "string" || !data.title.trim()) {
      return NextResponse.json(
        { error: "Job title is required" },
        { status: 400 },
      );
    }

    let expiresAt: Date | null = null;
    if (data.expiresAt) {
      const d = new Date(data.expiresAt);
      if (!isNaN(d.getTime())) {
        expiresAt = d;
      }
    }

    const job = await createJob({
      title: data.title.trim(),
      jobType: data.jobType ?? "Full-time",
      description: data.description ?? null,
      responsibilities: data.responsibilities ?? [],
      qualifications: data.qualifications ?? [],
      benefits: data.benefits ?? [],
      expiresAt,
      archived: Boolean(data.archived),
    });

    if (!job) {
      return NextResponse.json(
        { error: "Failed to create job in database" },
        { status: 500 },
      );
    }

    try {
      revalidatePath("/admin/careers");
      revalidatePath("/careers");
    } catch {}

    return NextResponse.json(job, { status: 201 });
  } catch (e: any) {
    console.error("Create job error:", e);
    return NextResponse.json(
      { error: e?.message || "Failed to create job" },
      { status: 500 },
    );
  }
}


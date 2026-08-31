import { NextResponse } from "next/server";
import { getJobById, createApplication } from "@/lib/careers";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { jobId, name, email, phone, resumeUrl, coverLetter } = data;
    if (!jobId || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const job = await getJobById(jobId);
    if (!job)
      return NextResponse.json({ error: "Job not found" }, { status: 404 });

    const application = await createApplication({
      jobId: job.id,
      name,
      email,
      phone,
      resumeUrl,
      coverLetter,
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (e) {
    console.error("Apply error:", e);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 },
    );
  }
}

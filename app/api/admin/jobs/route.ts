import { createJob, getAllJobs } from "@/lib/careers";
import type { NextRequest } from "next/server";

export async function GET() {
  const jobs = await getAllJobs();
  return new Response(JSON.stringify(jobs), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const job = await createJob({
      title: data.title,
      jobType: data.jobType ?? "Full-time",
      description: data.description ?? null,
      responsibilities: data.responsibilities ?? null,
      qualifications: data.qualifications ?? null,
      benefits: data.benefits ?? null,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
    });
    return new Response(JSON.stringify(job), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Create job error:", e);
    return new Response(JSON.stringify({ error: "Failed to create job" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

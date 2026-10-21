import React from "react";
import { getJobById } from "@/lib/careers";
import JobFormClient from "@/components/admin/job-form-client";
import DeleteJobClient from "@/components/admin/delete-job-client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) {
    return (
      <div className="p-6 md:p-8 bg-[#0a0a0a] min-h-screen text-gray-200">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
          Job not found.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-[#0a0a0a] min-h-screen text-gray-200 space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/careers"
          className="text-gray-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/5"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Edit Job Posting</h1>
          <p className="text-sm text-gray-400 mt-1">Update details for {job.title}</p>
        </div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-8">
        {/* @ts-ignore */}
        <JobFormClient job={job} />
        {/* @ts-ignore */}
        <div className="pt-6 border-t border-white/10">
          <DeleteJobClient id={job.id} />
        </div>
      </div>
    </div>
  );
}

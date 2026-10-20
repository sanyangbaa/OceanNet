import React from "react";
import JobFormClient from "@/components/admin/job-form-client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewJobPage() {
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
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Create Job Posting</h1>
          <p className="text-sm text-gray-400 mt-1">Add a new career opportunity to your listings</p>
        </div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        <JobFormClient />
      </div>
    </div>
  );
}

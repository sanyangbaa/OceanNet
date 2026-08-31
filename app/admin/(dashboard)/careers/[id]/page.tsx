import React from 'react';
import { getJobById } from '@/lib/careers';
import JobFormClient from '@/components/admin/job-form-client';
import DeleteJobClient from '@/components/admin/delete-job-client';

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) return <div className="p-4 text-red-400">Job not found.</div>;

  return (
    <div className="p-6 bg-[#0a0a0a] min-h-screen text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      {/* @ts-ignore */}
      <JobFormClient job={job} />
      {/* @ts-ignore */}
      <div className="mt-6">
        <DeleteJobClient id={job.id} />
      </div>
    </div>
  );
}

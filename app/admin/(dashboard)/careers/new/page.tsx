import React from 'react';
import JobFormClient from '@/components/admin/job-form-client';

export default function NewJobPage() {
  return (
    <div className="p-6 bg-[#0a0a0a] min-h-screen text-gray-200">
      <h1 className="text-2xl font-bold mb-4">New Job</h1>
      <JobFormClient />
    </div>
  );
}

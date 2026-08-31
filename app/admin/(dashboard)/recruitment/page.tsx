import React from "react";
import { getRecruitmentAnalytics } from "@/lib/careers";

export default async function RecruitmentStatsPage() {
  const stats = await getRecruitmentAnalytics();

  return (
    <div className="p-6 bg-[#0a0a0a] min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Recruitment Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white/5 rounded">
          <h2 className="text-lg font-semibold">Total Applicants</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalApplicants}</p>
        </div>
        <div className="p-4 bg-white/5 rounded">
          <h2 className="text-lg font-semibold">Open Jobs</h2>
          <p className="text-3xl font-bold mt-2">{stats.openJobs}</p>
        </div>
        <div className="p-4 bg-white/5 rounded">
          <h2 className="text-lg font-semibold">
            Top Positions (by applications)
          </h2>
          <ol className="mt-2 text-sm text-gray-300">
            {stats.applicantsPerPosition.slice(0, 5).map((p: any) => (
              <li key={p.jobId} className="mt-1">
                {p.title} — {p.count}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

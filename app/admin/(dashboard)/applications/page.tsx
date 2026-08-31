import React from "react";
import Link from "next/link";
import { getPool } from "@/server/db";
import DeleteButton from "@/components/admin/delete-button-client";
import type { Application, Job } from "@/server/db";

interface TalentSubmission {
  id: string;
  name: string;
  email: string;
  resumeUrl?: string | null;
  areaOfInterest?: string | null;
  createdAt: Date;
}

interface ApplicationCandidate {
  id: string;
  name: string;
  email: string;
  resumeUrl?: string | null;
  source: "application";
  jobId: string;
  date: Date;
}

interface TalentCandidate {
  id: string;
  name: string;
  email: string;
  resumeUrl?: string | null;
  source: "talent";
  areaOfInterest?: string | null;
  date: Date;
}

type UnifiedCandidate = ApplicationCandidate | TalentCandidate;

export default async function ApplicationsPage() {
  const p = getPool();
  if (!p) {
    return (
      <div className="p-4 text-red-500">Database connection unavailable.</div>
    );
  }
  const [appRows] = await p.query(
    `SELECT * FROM "Application" ORDER BY "submittedAt" DESC`,
  );
  const applications = appRows as unknown as Application[];

  const [talentRows] = await p.query(
    `SELECT * FROM "Talent" ORDER BY "createdAt" DESC`,
  );
  const talents = talentRows as unknown as TalentSubmission[];

  const [jobRows] = await p.query(`SELECT id, title FROM "Job"`);
  const jobs = jobRows as unknown as Job[];
  const jobMap = new Map(jobs.map((j) => [j.id, j.title]));

  // Merge applications and talents into one list for admin view
  const unified: UnifiedCandidate[] = [
    ...applications.map<ApplicationCandidate>((a) => ({
      id: a.id,
      name: a.name,
      email: a.email,
      resumeUrl: a.resumeUrl,
      source: "application" as const,
      jobId: a.jobId,
      date: a.submittedAt,
    })),
    ...talents.map<TalentCandidate>((t) => ({
      id: t.id,
      name: t.name,
      email: t.email,
      resumeUrl: t.resumeUrl,
      source: "talent" as const,
      areaOfInterest: t.areaOfInterest,
      date: t.createdAt,
    })),
  ];
  unified.sort(
    (x, y) => new Date(y.date).getTime() - new Date(x.date).getTime(),
  );

  return (
    <div className="p-6 bg-[#0a0a0a] min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Candidate Applications
      </h1>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white/5 border border-white/5">
          <thead className="bg-white/10">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                Position / Area
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                Resume
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                Submitted
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {unified.map((row) => (
              <tr
                key={row.id}
                className="border-b border-white/5 hover:bg-white/10 transition-colors"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/applications/${row.id}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {row.name}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`mailto:${row.email}`}
                    className="text-primary hover:underline"
                  >
                    {row.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {row.source === "application" ? "Application" : "Talent"}
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {row.source === "application"
                    ? jobMap.get(row.jobId) || "—"
                    : row.areaOfInterest || "—"}
                </td>
                <td className="px-4 py-3">
                  {row.resumeUrl ? (
                    <Link
                      href={row.resumeUrl}
                      target="_blank"
                      className="text-primary hover:underline"
                    >
                      View Resume
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {new Date(row.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  {row.source === "application" ? (
                    <DeleteButton
                      id={row.id}
                      apiPath="/api/admin/applications"
                      redirectUrl="/admin/applications"
                    />
                  ) : (
                    <DeleteButton
                      id={row.id}
                      apiPath="/api/admin/talent"
                      redirectUrl="/admin/applications"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

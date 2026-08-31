import React from "react";
import { getApplicationById, getJobById } from "@/lib/careers";
import ApplicationEditorClient from "@/components/admin/application-editor-client";
import { getPool } from "@/server/db";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = await getApplicationById(id);
  if (app) {
    const job = await getJobById(app.jobId);

    return (
      <div className="p-6 bg-[#0a0a0a] min-h-screen text-gray-200">
        <h1 className="text-2xl font-bold mb-4">Application: {app.name}</h1>
        <p className="text-gray-300">Position: {job?.title || "—"}</p>
        <p className="text-gray-300">
          Email:{" "}
          <a href={`mailto:${app.email}`} className="text-primary underline">
            {app.email}
          </a>
        </p>
        <p className="text-gray-300">Phone: {app.phone || "—"}</p>
        <p className="mt-4 text-gray-300">Cover letter:</p>
        <div className="p-3 bg-white/5 rounded mt-2 text-gray-200">
          {app.coverLetter || "—"}
        </div>
        <p className="mt-4 text-gray-300">Resume:</p>
        <div className="mt-2">
          {app.resumeUrl ? (
            <a
              href={app.resumeUrl}
              target="_blank"
              className="text-primary underline"
            >
              View Resume
            </a>
          ) : (
            "—"
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Manage Application</h2>
          {/* Client editor */}
          {/* @ts-ignore */}
          <ApplicationEditorClient application={app} />
        </div>
      </div>
    );
  }

  // Fallback: check Talent table
  const p = getPool();
  if (!p)
    return (
      <div className="p-4 text-red-400">Database connection unavailable.</div>
    );
  const [rows] = await p.query(`SELECT * FROM "Talent" WHERE id = ? LIMIT 1`, [
    id,
  ]);
  // @ts-ignore
  const talent = (rows as any[])[0];
  if (!talent)
    return <div className="p-4 text-red-400">Application not found.</div>;

  return (
    <div className="p-6 bg-white min-h-screen text-gray-900">
      <h1 className="text-2xl font-bold mb-4">
        Talent Submission: {talent.name}
      </h1>
      <p className="text-gray-700">
        Area of interest: {talent.areaOfInterest || "—"}
      </p>
      <p className="text-gray-700">
        Email:{" "}
        <a href={`mailto:${talent.email}`} className="text-primary underline">
          {talent.email}
        </a>
      </p>
      <p className="mt-4 text-gray-700">Resume:</p>
      <div className="mt-2">
        {talent.resumeUrl ? (
          <a
            href={talent.resumeUrl}
            target="_blank"
            className="text-primary underline"
          >
            View Resume
          </a>
        ) : (
          "—"
        )}
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Submitted: {new Date(talent.createdAt).toLocaleString()}
      </p>
    </div>
  );
}

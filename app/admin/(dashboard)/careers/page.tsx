import { getAllJobs } from "@/lib/careers";
import Link from "next/link";
import DeleteButton from "@/components/admin/delete-button-client";
import CareerTabsClient from "@/components/admin/career-tabs-client";
import { Briefcase, Plus, Calendar, Archive } from "lucide-react";

export default async function AdminCareersPage() {
  const jobs = await getAllJobs();

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#0a0a0a] min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Careers Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {jobs.length} job posting{jobs.length !== 1 ? "s" : ""} total
          </p>
        </div>
        {/* Tabs: List / Create (Create embeds JobFormClient) */}
        <div className="w-full md:w-auto">
          <CareerTabsClient />
        </div>
      </div>

      {/* Table */}
      {jobs.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto">
            <Briefcase className="h-8 w-8 text-gray-500" />
          </div>
          <p className="text-gray-400 font-medium">No job postings yet.</p>
          <Link
            href="/admin/careers/new"
            className="inline-flex items-center gap-2 bg-primary text-black px-6 py-2.5 rounded-xl font-bold hover:bg-yellow-400 transition-all text-sm"
          >
            <Plus className="h-4 w-4" />
            Create First Job
          </Link>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                    Job Type
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                    Posted
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                    Status
                  </th>
                  <th className="p-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <Link
                        href={`/admin/careers/${job.id}`}
                        prefetch={false}
                        className="font-semibold text-white hover:text-primary transition-colors text-sm"
                      >
                        {job.title}
                      </Link>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                        {String(job.jobType || "Full-time")}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-xs text-gray-400 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(job.postedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      {job.archived ? (
                        <span className="text-xs font-bold bg-gray-500/10 text-gray-400 px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                          <Archive className="h-3 w-3" />
                          Archived
                        </span>
                      ) : (
                        <span className="text-xs font-bold bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full w-fit block">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/admin/careers/${job.id}`}
                          prefetch={false}
                          className="text-xs font-bold text-primary hover:text-white bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-all"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          id={job.id}
                          apiPath="/api/admin/jobs"
                          redirectUrl="/admin/careers"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Remote",
  "Hybrid",
  "Volunteer",
];

export default function JobFormClient({ job }: { job?: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: job?.title || "",
    jobType: job?.jobType || "Full-time",
    description: job?.description || "",
    responsibilities:
      job?.responsibilities && Array.isArray(job.responsibilities)
        ? job.responsibilities.join("\n")
        : job?.responsibilities || "",
    qualifications:
      job?.qualifications && Array.isArray(job.qualifications)
        ? job.qualifications.join("\n")
        : job?.qualifications || "",
    benefits:
      job?.benefits && Array.isArray(job.benefits)
        ? job.benefits.join("\n")
        : job?.benefits || "",
    expiresAt: job?.expiresAt
      ? new Date(job.expiresAt).toISOString().slice(0, 10)
      : "",
    archived: job?.archived ? true : false,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        title: form.title,
        jobType: form.jobType,
        description: form.description,
        responsibilities: form.responsibilities
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean),
        qualifications: form.qualifications
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean),
        benefits: form.benefits
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean),
        expiresAt: form.expiresAt || null,
        archived: form.archived || false,
      };

      const url = job ? `/api/admin/jobs/${job.id}` : `/api/admin/jobs`;
      const method = job ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Save failed");
      setMessage("Saved successfully!");
      if (!job) {
        router.push("/admin/careers");
      }
    } catch (e) {
      console.error(e);
      setMessage("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full p-3 rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm";
  const labelClass = "block text-sm font-semibold text-gray-300 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Job Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            className={inputClass}
            placeholder="e.g. Senior Network Engineer"
            required
          />
        </div>
        <div>
          <label className={labelClass}>Job Type</label>
          <select
            name="jobType"
            value={form.jobType}
            onChange={onChange}
            className={inputClass + " appearance-none cursor-pointer"}
          >
            {JOB_TYPES.map((t) => (
              <option key={t} value={t} className="bg-[#0a0a0a]">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Description (HTML allowed)</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={5}
          className={inputClass}
          placeholder="Provide a detailed overview of the role..."
        />
      </div>

      <div>
        <label className={labelClass}>Responsibilities (one per line)</label>
        <textarea
          name="responsibilities"
          value={form.responsibilities}
          onChange={onChange}
          rows={5}
          className={inputClass}
          placeholder="Design and implement network infrastructure&#10;Monitor system performance..."
        />
      </div>

      <div>
        <label className={labelClass}>Qualifications (one per line)</label>
        <textarea
          name="qualifications"
          value={form.qualifications}
          onChange={onChange}
          rows={5}
          className={inputClass}
          placeholder="Bachelor's degree in Computer Science&#10;3+ years of experience..."
        />
      </div>

      <div>
        <label className={labelClass}>Benefits & Perks (one per line)</label>
        <textarea
          name="benefits"
          value={form.benefits}
          onChange={onChange}
          rows={4}
          className={inputClass}
          placeholder="Competitive salary&#10;Health insurance..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className={labelClass}>Application Deadline</label>
          <input
            name="expiresAt"
            type="date"
            value={form.expiresAt}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div className="flex items-center gap-3 pb-1">
          <input
            type="checkbox"
            id="archived"
            name="archived"
            checked={form.archived}
            onChange={(e) =>
              setForm((s) => ({ ...s, archived: e.target.checked }))
            }
            className="w-4 h-4 accent-primary cursor-pointer"
          />
          <label
            htmlFor="archived"
            className="text-sm text-gray-300 cursor-pointer"
          >
            Archive this job (hide from public listings)
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          className="bg-primary text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 hover:shadow-lg active:scale-95 transition-all text-sm cursor-pointer disabled:opacity-60"
          type="submit"
          disabled={saving}
        >
          {saving ? "Saving…" : job ? "Update Job" : "Create Job"}
        </button>
        {job && (
          <button
            type="button"
            onClick={() => router.push("/admin/careers")}
            className="px-6 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all text-sm font-medium cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>

      {message && (
        <div
          className={`text-sm p-4 rounded-xl border ${
            message.includes("fail") || message.includes("error")
              ? "text-red-400 bg-red-500/10 border-red-500/20"
              : "text-green-400 bg-green-500/10 border-green-500/20"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}

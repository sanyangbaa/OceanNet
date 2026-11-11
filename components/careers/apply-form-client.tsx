"use client";

import React, { useState } from "react";

export default function ApplyFormClient({ jobId }: { jobId: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    linkedin: "",
    portfolio: "",
    resumeUrl: "",
    coverLetter: "",
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "careers/apply");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Upload failed");
      if (json.urls && json.urls.length) {
        setForm((s) => ({ ...s, resumeUrl: json.urls[0] }));
        setMessage("Resume uploaded");
      }
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, ...form }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Submission failed");
      setMessage("Application submitted. Thank you!");
      setForm({
        name: "",
        email: "",
        phone: "",
        country: "",
        linkedin: "",
        portfolio: "",
        resumeUrl: "",
        coverLetter: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-1.5">
            Full name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder="John Doe"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-1.5">
            Email address
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder="john@example.com"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-1.5">
            Phone number
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="+220 278 5585"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-1.5">
            Country of residence
          </label>
          <input
            name="country"
            value={form.country}
            onChange={onChange}
            placeholder="Gambia"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-1.5">
            LinkedIn profile URL
          </label>
          <input
            name="linkedin"
            value={form.linkedin}
            onChange={onChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-1.5">
            Portfolio / Website
          </label>
          <input
            name="portfolio"
            value={form.portfolio}
            onChange={onChange}
            placeholder="https://myportfolio.com"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/80 mb-1.5">
          Resume (PDF / DOC / DOCX)
        </label>
        <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-white/20 hover:border-accent rounded-2xl p-6 bg-white/5 transition-all text-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFile}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <span className="text-sm text-white/80 font-medium">
            Click to upload or drag resume file here
          </span>
          <span className="text-xs text-white/50 mt-1">
            PDF, DOC, DOCX up to 10MB
          </span>
        </div>
        {uploading && (
          <p className="text-xs text-accent mt-2 animate-pulse">
            Uploading resume...
          </p>
        )}
        {form.resumeUrl && (
          <p className="text-xs text-green-400 mt-2 flex items-center gap-1.5">
            ✓ Resume uploaded successfully!
            <a
              className="text-accent underline font-semibold hover:text-white"
              href={form.resumeUrl}
              target="_blank"
            >
              View file
            </a>
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/80 mb-1.5">
          Cover letter (optional)
        </label>
        <textarea
          name="coverLetter"
          value={form.coverLetter}
          onChange={onChange}
          rows={4}
          placeholder="Briefly introduce yourself and why you're interested in this position..."
          className="w-full p-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={submitting || uploading}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-white hover:text-secondary hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] transition-all duration-300 text-sm tracking-wider uppercase cursor-pointer shadow-lg"
        >
          {submitting ? "Submitting Application…" : "Submit Application"}
        </button>
      </div>

      {message && (
        <div
          className={`text-sm p-4 rounded-xl mt-4 border ${
            message.toLowerCase().includes("fail") ||
            message.toLowerCase().includes("error")
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

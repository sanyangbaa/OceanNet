"use client";

import React, { useState } from "react";

export default function TalentFormClient({
  defaultAreaOfInterest,
  onSuccess,
  variant = "light",
}: {
  defaultAreaOfInterest?: string;
  onSuccess?: () => void;
  variant?: "light" | "dark";
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    areaOfInterest: defaultAreaOfInterest || "",
    resumeUrl: "",
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
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "careers/talent");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Upload failed");
      setForm((s) => ({ ...s, resumeUrl: json.urls?.[0] || "" }));
      setMessage("Resume uploaded");
    } catch (e) {
      console.error(e);
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
      const res = await fetch("/api/careers/talent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Submit failed");
      setMessage("Thanks — we have your submission.");
      setForm({ name: "", email: "", areaOfInterest: "", resumeUrl: "" });
      if (onSuccess) onSuccess();
    } catch (e) {
      console.error(e);
      setMessage("Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  const labelClass =
    variant === "light"
      ? "block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5"
      : "block text-xs font-bold uppercase tracking-wider text-white/90 mb-1.5";
  const inputClass =
    variant === "light"
      ? "w-full p-3 rounded-xl bg-background border border-border text-secondary placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
      : "w-full p-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
      <div>
        <label className={labelClass}>Full name</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          required
          placeholder="Jane Doe"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Email address</label>
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          type="email"
          required
          placeholder="jane@example.com"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Area of interest</label>
        <input
          name="areaOfInterest"
          value={form.areaOfInterest}
          onChange={onChange}
          placeholder="e.g. Frontend Development, UI/UX Design"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Resume (optional)</label>
        <div
          className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 transition-all text-center ${
            variant === "light"
              ? "border-border hover:border-primary/50 bg-background"
              : "border-white/15 hover:border-accent bg-white/5"
          }`}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFile}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <span
            className={`text-xs font-medium ${variant === "light" ? "text-muted-foreground" : "text-white/80"}`}
          >
            Click to upload resume file
          </span>
          <span className="text-[10px] text-muted-foreground/60 mt-0.5">
            PDF, DOC, DOCX up to 10MB
          </span>
        </div>
        {uploading && (
          <p className="text-xs text-primary mt-1.5 animate-pulse">
            Uploading resume...
          </p>
        )}
        {form.resumeUrl && (
          <p className="text-xs text-green-400 mt-1.5 flex items-center gap-1">
            ✓ Uploaded!
            <a
              className="text-primary underline font-semibold hover:text-secondary"
              href={form.resumeUrl}
              target="_blank"
            >
              View file
            </a>
          </p>
        )}
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting || uploading}
          className={`w-full py-3 rounded-xl font-bold transition-all text-xs uppercase tracking-wider cursor-pointer shadow-md ${
            variant === "dark"
              ? "bg-white text-secondary hover:bg-secondary hover:text-white"
              : "bg-primary text-white hover:bg-secondary"
          }`}
        >
          {submitting ? "Submitting…" : "Join Talent Community"}
        </button>
      </div>
      {message && (
        <div
          className={`text-xs p-3 rounded-xl mt-3 border ${
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

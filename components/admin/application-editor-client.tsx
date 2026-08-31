"use client";

import React, { useState } from "react";

export default function ApplicationEditorClient({ application }: { application: any }) {
  const [status, setStatus] = useState(application.status || "Application Received");
  const [notes, setNotes] = useState(application.internalNotes || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const statuses = [
    "Application Received",
    "Under Review",
    "Shortlisted",
    "Assessment Stage",
    "Interview Scheduled",
    "Offer Extended",
    "Position Filled",
    "Unsuccessful",
  ];

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/applications/${application.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, internalNotes: notes }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Save failed");
      setMessage("Saved");
    } catch (e) {
      console.error(e);
      setMessage("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-300">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2 rounded bg-white/5 w-full">
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-300">Internal notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={6} className="w-full p-2 rounded bg-white/5" />
      </div>
      <div>
        <button onClick={save} disabled={saving} className="bg-primary text-black px-4 py-2 rounded">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
      {message && <p className="text-sm text-gray-300">{message}</p>}
    </div>
  );
}

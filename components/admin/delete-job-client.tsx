"use client";

import React, { useState } from "react";

export default function DeleteJobClient({ id }: { id: string }) {
  const [deleting, setDeleting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const del = async () => {
    if (!confirm('Delete this job? This action cannot be undone.')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Delete failed');
      // navigate back to admin careers list
      window.location.href = '/admin/careers';
    } catch (e) {
      console.error(e);
      setMsg('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mt-4">
      <button onClick={del} disabled={deleting} className="bg-red-600 text-white px-3 py-2 rounded">
        {deleting ? 'Deleting…' : 'Delete Job'}
      </button>
      {msg && <p className="text-sm text-gray-300">{msg}</p>}
    </div>
  );
}

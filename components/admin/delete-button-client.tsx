"use client";

import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteButton({
  id,
  apiPath,
  redirectUrl,
  confirmMessage = "Delete this item? This action cannot be undone.",
}: {
  id: string;
  apiPath: string;
  redirectUrl?: string;
  confirmMessage?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!confirm(confirmMessage)) return;
    setLoading(true);
    try {
      const res = await fetch(`${apiPath}/${id}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Delete failed");
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      title="Delete"
    >
      {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Trash2 size={16} />}
    </button>
  );
}

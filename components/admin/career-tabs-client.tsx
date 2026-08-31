"use client";

import React, { useState } from "react";
import JobFormClient from "@/components/admin/job-form-client";

export default function CareerTabsClient() {
  const [active, setActive] = useState<"list" | "create">("list");

  return (
    <div className="space-y-4">
      <div className="bg-white/5 p-2 rounded-xl inline-flex gap-2">
        <button
          onClick={() => setActive("list")}
          className={`px-4 py-2 text-sm font-bold rounded-lg ${
            active === "list" ? "bg-primary text-black" : "text-gray-400"
          }`}
        >
          List
        </button>
        <button
          onClick={() => setActive("create")}
          className={`px-4 py-2 text-sm font-bold rounded-lg ${
            active === "create" ? "bg-primary text-black" : "text-gray-400"
          }`}
        >
          Create
        </button>
      </div>

      {active === "create" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <JobFormClient />
        </div>
      )}
    </div>
  );
}

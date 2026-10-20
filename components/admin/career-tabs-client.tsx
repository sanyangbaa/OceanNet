"use client";

import React, { useState } from "react";
import JobFormClient from "@/components/admin/job-form-client";
import { Plus, X } from "lucide-react";

export default function CareerTabsClient() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowCreate(true)}
        className="inline-flex items-center gap-2 bg-primary text-black px-5 py-2.5 rounded-xl font-bold hover:bg-yellow-400 transition-all text-sm shadow-lg shadow-primary/20 cursor-pointer active:scale-95"
      >
        <Plus className="h-4 w-4" />
        Add Job
      </button>

      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Create Job Posting</h2>
                <p className="text-xs text-gray-400 mt-1">Publish a new career opportunity on the website</p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <JobFormClient onSuccess={() => setShowCreate(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

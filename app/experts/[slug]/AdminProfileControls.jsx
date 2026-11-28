"use client";

import React, { useState } from "react";
import { ShieldAlert, Trash2, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminProfileControls({ applicationId, displayName, slug }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (
      !window.confirm(
        `ADMIN ACTION: Are you sure you want to PERMANENTLY DELETE the profile for "${displayName}"? This will delete the database record and cannot be undone.`
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/mentors/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: applicationId, action: "delete" }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Profile for "${displayName}" deleted successfully.`);
        window.location.href = "/find-mentor";
      } else {
        alert(data.error || "Failed to delete profile.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-950/40 border border-red-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
      <div className="flex items-center gap-2 text-red-200">
        <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
        <span className="font-bold">Admin Management Mode</span>
        <span className="text-red-300/80">• You are signed in as an administrator</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/admin/mentors"
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition flex items-center gap-1.5 font-medium"
        >
          <span>Admin Hub</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
        <button
          type="button"
          disabled={loading}
          onClick={handleDelete}
          className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition flex items-center gap-1.5 shadow-xs disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
          <span>Delete Profile</span>
        </button>
      </div>
    </div>
  );
}

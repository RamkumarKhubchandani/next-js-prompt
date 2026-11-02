"use client";

import React, { useState, useEffect } from "react";
import {
  Check,
  X,
  Eye,
  EyeOff,
  UserCheck,
  Briefcase,
  GraduationCap,
  Calendar,
  DollarSign,
  MapPin,
  ExternalLink,
  Mail,
  ShieldCheck,
  Clock,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { SKILLS, LOCATIONS } from "@/app/lib/seo-data";

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export default function AdminMentorsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending"); // Default to pending as requested
  const [expandedId, setExpandedId] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [rejectModalApp, setRejectModalApp] = useState(null);
  const [rejectNote, setRejectNote] = useState("");

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/mentors/list?status=${filter}`);
      const data = await res.json();
      if (res.ok) {
        setApplications(data.applications || []);
      } else {
        console.error(data.error);
        setApplications([]);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action, extra = {}) => {
    setActionLoadingId(id);
    try {
      const res = await fetch("/api/admin/mentors/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, ...extra }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchApplications();
        if (action === "reject") {
          setRejectModalApp(null);
          setRejectNote("");
        }
      } else {
        alert(data.error || "Action failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error performing action");
    } finally {
      setActionLoadingId(null);
    }
  };

  const resolveSkillName = (id) => {
    const s = SKILLS.find((sk) => sk.id === id);
    return s ? s.name : id;
  };

  const resolveLocationName = (id, other) => {
    if (id === "other") {
      return `${other?.city || "City"}, ${other?.country || "Country"}`;
    }
    const l = LOCATIONS.find((loc) => loc.id === id);
    return l ? `${l.name} (${l.country})` : id || "Online";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Expert Applications & Approvals
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Review expert profiles, compare proposed Draft vs Published live content, and grant verified status.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/leads"
              className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <span>Manage Leads & Dispatch</span>
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-semibold transition"
            >
              ← Back to Admin Hub
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
          {[
            { id: "pending", label: "Pending Review" },
            { id: "all", label: "All Applicants" },
            { id: "approved", label: "Approved (Live)" },
            { id: "rejected", label: "Rejected" },
            { id: "hidden", label: "Hidden" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                filter === tab.id
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List of Applications */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
        ) : applications.length === 0 ? (
          <div className="py-16 text-center bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
            <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-300">No applications in this category</h3>
            <p className="text-xs text-slate-500 mt-1">
              {filter === "pending"
                ? "All submitted mentor and hire applications have been reviewed."
                : "No expert profile records found for the selected filter."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => {
              const isExpanded = expandedId === app._id;
              const isBusy = actionLoadingId === app._id;
              const draft = app.draft || {};
              const pub = app.published;

              return (
                <div
                  key={app._id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg transition hover:border-slate-700"
                >
                  {/* Card Top Row */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Photo */}
                      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-800 border-2 border-emerald-500/30 shrink-0">
                        {app.photoUrl ? (
                          <img
                            src={app.photoUrl}
                            alt={app.displayName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            <GraduationCap className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">
                            {app.displayName || app.userId?.name || "Developer"}
                          </h3>
                          {app.slug && (
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                              /{app.slug}
                            </span>
                          )}
                          {app.interviewedAt && (
                            <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-400" />
                              <span>Interviewed by OutlineDev</span>
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-3">
                          <span>{app.userId?.email || "No email"}</span>
                          {app.phone && <span>• Phone: {app.phone}</span>}
                          <span>
                            • Applied: {new Date(app.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {(app.roles || ["mentor"]).map((r) => (
                            <span
                              key={r}
                              className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                                r === "mentor"
                                  ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/40"
                                  : "bg-cyan-950/80 text-cyan-300 border border-cyan-800/40"
                              }`}
                            >
                              {r === "mentor" ? "Mentor" : "Hire Developer"}
                            </span>
                          ))}
                          <span
                            className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                              app.status === "approved"
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                : app.status === "pending"
                                ? "bg-amber-950 text-amber-300 border border-amber-800"
                                : app.status === "hidden"
                                ? "bg-slate-800 text-slate-400 border border-slate-700"
                                : "bg-red-950 text-red-300 border border-red-800"
                            }`}
                          >
                            Status: {app.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                      {/* Approve Button */}
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleAction(app._id, "approve")}
                        className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-md shadow-emerald-500/10"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{app.status === "approved" ? "Re-Approve Draft" : "Approve Profile"}</span>
                      </button>

                      {/* Reject Button */}
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => {
                          setRejectModalApp(app);
                          setRejectNote(app.adminNotes || "");
                        }}
                        className="px-3 py-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-800/40 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>

                      {/* Set Interviewed Button */}
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleAction(app._id, "setInterviewed")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border ${
                          app.interviewedAt
                            ? "bg-emerald-950/50 text-emerald-300 border-emerald-800 hover:bg-emerald-900/60"
                            : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{app.interviewedAt ? "Interviewed ✓" : "Mark Interviewed"}</span>
                      </button>

                      {/* Hide / Unhide Button */}
                      {app.status === "hidden" ? (
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleAction(app._id, "unhide")}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Unhide</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleAction(app._id, "hide")}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                        >
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hide</span>
                        </button>
                      )}

                      {/* Toggle Details Accordion */}
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : app._id)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition flex items-center gap-1 border border-slate-700"
                      >
                        <span>{isExpanded ? "Hide Comparison" : "Compare Draft vs Live"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* DETAILS COMPARISON (DRAFT VS PUBLISHED) */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-slate-800">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* LEFT: PROPOSED DRAFT */}
                        <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                              <span>Proposed Draft (Submitted by User)</span>
                            </span>
                            <span className="text-[11px] text-slate-400">
                              Updated: {new Date(app.updatedAt).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Mentor Draft */}
                          {(app.roles || []).includes("mentor") && (
                            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-emerald-500/20 space-y-2">
                              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                                Mentor Profile
                              </span>
                              <div>
                                <span className="text-[11px] text-slate-400 font-semibold block">Headline:</span>
                                <p className="text-xs text-white font-medium">
                                  {draft.mentor?.headline || app.mentorHeadline || "Not specified"}
                                </p>
                              </div>
                              <div>
                                <span className="text-[11px] text-slate-400 font-semibold block">
                                  Summary ({countWords(draft.mentor?.summary || app.mentorBio || app.bio)} words):
                                </span>
                                <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                                  {draft.mentor?.summary || app.mentorBio || app.bio || "No summary"}
                                </p>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                                <span>Rate: ${draft.mentor?.rate || app.hourlyRate || 0}/hr</span>
                                <span>Formats: {(draft.mentor?.formats || []).join(", ") || "Calls, Reviews"}</span>
                              </div>
                            </div>
                          )}

                          {/* Hire Draft */}
                          {(app.roles || []).includes("hire") && (
                            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-cyan-500/20 space-y-2">
                              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                                Hire Developer Profile
                              </span>
                              <div>
                                <span className="text-[11px] text-slate-400 font-semibold block">Headline:</span>
                                <p className="text-xs text-white font-medium">
                                  {draft.hire?.headline || app.hireHeadline || "Not specified"}
                                </p>
                              </div>
                              <div>
                                <span className="text-[11px] text-slate-400 font-semibold block">
                                  Summary ({countWords(draft.hire?.summary || app.hireBio || app.bio)} words):
                                </span>
                                <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                                  {draft.hire?.summary || app.hireBio || app.bio || "No summary"}
                                </p>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                                <span>Rate: ${draft.hire?.rate || app.hourlyRate || 0}/hr</span>
                                <span>Availability: {draft.hire?.availability || app.availability || "Flexible"}</span>
                              </div>
                            </div>
                          )}

                          {/* Common Draft Meta */}
                          <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                            <div>
                              <span className="text-slate-500 font-semibold">Skills: </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {(draft.skillIds?.length ? draft.skillIds : app.skills || []).map((sId) => (
                                  <span
                                    key={sId}
                                    className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[11px]"
                                  >
                                    {resolveSkillName(sId)}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-1 text-slate-400">
                              <span>
                                Location: {resolveLocationName(draft.locationId, draft.locationOther)}
                              </span>
                              <span>Timezone: {draft.timezone || "UTC"}</span>
                              <span>Experience: {draft.yearsExperience || app.yearsExperience || 0} years</span>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-1">
                              {draft.links?.github && (
                                <a
                                  href={draft.links.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-emerald-400 hover:underline flex items-center gap-1"
                                >
                                  <span>GitHub</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                              {draft.links?.linkedin && (
                                <a
                                  href={draft.links.linkedin}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-emerald-400 hover:underline flex items-center gap-1"
                                >
                                  <span>LinkedIn</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                            {/* Showcase Projects */}
                            {draft.projects?.length > 0 && (
                              <div className="pt-2">
                                <span className="text-slate-500 font-semibold block mb-1">
                                  Showcase Projects ({draft.projects.length}):
                                </span>
                                <div className="space-y-1.5">
                                  {draft.projects.map((p, pIdx) => (
                                    <div
                                      key={pIdx}
                                      className="p-2 rounded bg-slate-900 border border-slate-800 text-xs"
                                    >
                                      <div className="font-semibold text-white flex items-center justify-between">
                                        <span>{p.title}</span>
                                        {p.url && (
                                          <a
                                            href={p.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-emerald-400 hover:underline text-[11px] flex items-center gap-1"
                                          >
                                            <span>Link</span>
                                            <ExternalLink className="w-2.5 h-2.5" />
                                          </a>
                                        )}
                                      </div>
                                      <p className="text-slate-400 text-[11px] mt-0.5">{p.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* RIGHT: CURRENT LIVE PUBLISHED CONTENT */}
                        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                              <span>Currently Live (Published in Production)</span>
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {app.approvedAt ? `Approved: ${new Date(app.approvedAt).toLocaleDateString()}` : "Not yet approved"}
                            </span>
                          </div>

                          {!pub ? (
                            <div className="py-12 text-center text-slate-500 text-xs italic">
                              No published version currently live in production. Approving will publish the proposed draft.
                            </div>
                          ) : (
                            <>
                              {pub.mentor?.headline && (
                                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                                    Live Mentor Profile
                                  </span>
                                  <div>
                                    <span className="text-[11px] text-slate-500 font-semibold block">Headline:</span>
                                    <p className="text-xs text-white font-medium">{pub.mentor.headline}</p>
                                  </div>
                                  <div>
                                    <span className="text-[11px] text-slate-500 font-semibold block">Summary:</span>
                                    <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed line-clamp-4">
                                      {pub.mentor.summary}
                                    </p>
                                  </div>
                                  <div className="text-xs text-slate-400">Rate: ${pub.mentor.rate}/hr</div>
                                </div>
                              )}

                              {pub.hire?.headline && (
                                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                                    Live Hire Developer Profile
                                  </span>
                                  <div>
                                    <span className="text-[11px] text-slate-500 font-semibold block">Headline:</span>
                                    <p className="text-xs text-white font-medium">{pub.hire.headline}</p>
                                  </div>
                                  <div>
                                    <span className="text-[11px] text-slate-500 font-semibold block">Summary:</span>
                                    <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed line-clamp-4">
                                      {pub.hire.summary}
                                    </p>
                                  </div>
                                  <div className="text-xs text-slate-400">
                                    Rate: ${pub.hire.rate}/hr • {pub.hire.availability}
                                  </div>
                                </div>
                              )}

                              <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                                <div>
                                  <span className="text-slate-500 font-semibold">Live Skills: </span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {(pub.skillIds || []).map((sId) => (
                                      <span
                                        key={sId}
                                        className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[11px]"
                                      >
                                        {resolveSkillName(sId)}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="pt-1">
                                  Location: {resolveLocationName(pub.locationId, pub.locationOther)} • Timezone: {pub.timezone}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Rejection Modal with Note */}
        {rejectModalApp && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span>Reject Application: {rejectModalApp.displayName}</span>
                </h3>
                <button
                  onClick={() => setRejectModalApp(null)}
                  className="text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-400">
                Please provide a constructive note explaining why the application is not approved at this time. This reason will be emailed to the applicant.
              </p>

              <textarea
                rows={4}
                required
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
                placeholder="e.g., Please provide a higher resolution profile photo and expand on your specific Next.js project architecture in the summary..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:border-red-500 focus:outline-none"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectModalApp(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleAction(rejectModalApp._id, "reject", { note: rejectNote })
                  }
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20"
                >
                  Confirm Rejection & Email Applicant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

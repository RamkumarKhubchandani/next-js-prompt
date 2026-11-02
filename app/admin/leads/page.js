"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  Users,
  Briefcase,
  GraduationCap,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  X,
  Check,
  AlertCircle,
  Filter,
} from "lucide-react";
import Link from "next/link";

export default function AdminLeadsPage() {
  const [data, setData] = useState({
    mentorshipRequests: [],
    hireInquiries: [],
    approvedExperts: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'mentorship' | 'hire'
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'pending' | 'sent'

  // Modal State for Dispatching Lead
  const [selectedLead, setSelectedLead] = useState(null); // { leadType, item }
  const [selectedExpertIds, setSelectedExpertIds] = useState([]);
  const [dispatching, setDispatching] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setFeedback({ type: "error", text: json.error || "Failed to fetch leads." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network error fetching leads." });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDispatchModal = (leadType, item) => {
    setSelectedLead({ leadType, item });
    // Pre-select already assigned experts if any (up to 3)
    const existing = Array.isArray(item.assignedExpertIds)
      ? item.assignedExpertIds.map((e) => (typeof e === "string" ? e : e._id)).slice(0, 3)
      : [];
    setSelectedExpertIds(existing);
    setFeedback({ type: "", text: "" });
  };

  const toggleExpertSelection = (expertId) => {
    if (selectedExpertIds.includes(expertId)) {
      setSelectedExpertIds(selectedExpertIds.filter((id) => id !== expertId));
    } else {
      if (selectedExpertIds.length >= 3) {
        alert("You can select a maximum of 3 experts per lead.");
        return;
      }
      setSelectedExpertIds([...selectedExpertIds, expertId]);
    }
  };

  const handleDispatch = async () => {
    if (!selectedLead) return;
    if (selectedExpertIds.length < 1 || selectedExpertIds.length > 3) {
      alert("Please select between 1 and 3 approved experts.");
      return;
    }

    setDispatching(true);
    try {
      const res = await fetch("/api/admin/leads/send-to-expert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: selectedLead.leadType,
          leadId: selectedLead.item._id,
          expertIds: selectedExpertIds,
        }),
      });

      const resJson = await res.json();
      if (res.ok) {
        setFeedback({
          type: "success",
          text: `Lead successfully dispatched to ${resJson.sentCount} expert(s)!`,
        });
        setSelectedLead(null);
        setSelectedExpertIds([]);
        fetchLeads();
      } else {
        alert(resJson.error || "Failed to dispatch lead.");
      }
    } catch (err) {
      alert("Error dispatching lead.");
    } finally {
      setDispatching(false);
    }
  };

  // Combine and sort leads
  const mentorshipList = (data.mentorshipRequests || []).map((m) => ({
    ...m,
    leadType: "mentorship",
  }));
  const hireList = (data.hireInquiries || []).map((h) => ({
    ...h,
    leadType: "hire",
  }));

  let combined = [];
  if (activeTab === "all") combined = [...mentorshipList, ...hireList];
  if (activeTab === "mentorship") combined = mentorshipList;
  if (activeTab === "hire") combined = hireList;

  // Filter by status if set
  if (statusFilter !== "all") {
    combined = combined.filter((item) => (item.status || "pending") === statusFilter);
  }

  combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Lead Dispatch & Inquiries
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Review client requests for 1-on-1 mentorship and contract hiring. Match and dispatch to 1-3 approved experts.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/mentors"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-semibold transition"
            >
              Mentor Profiles
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-semibold transition"
            >
              ← Admin Hub
            </Link>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {feedback.text && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between ${
              feedback.type === "error"
                ? "bg-red-950/60 border border-red-800 text-red-200"
                : "bg-emerald-950/60 border border-emerald-800 text-emerald-200"
            }`}
          >
            <span>{feedback.text}</span>
            <button onClick={() => setFeedback({ type: "", text: "" })} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: `All Leads (${mentorshipList.length + hireList.length})` },
              { id: "mentorship", label: `Mentorship (${mentorshipList.length})` },
              { id: "hire", label: `Hire Developer (${hireList.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="sent">Dispatched (Sent)</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Leads Table / Cards */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
        ) : combined.length === 0 ? (
          <div className="py-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
            <CheckCircle2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-300">No inquiry records found</h3>
            <p className="text-xs text-slate-500 mt-1">
              No leads match the selected type or status filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {combined.map((lead) => {
              const isMentorship = lead.leadType === "mentorship";
              const isSent = lead.status === "sent" || (lead.assignedExpertIds && lead.assignedExpertIds.length > 0);

              return (
                <div
                  key={lead._id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg hover:border-slate-700 transition"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    {/* Left: Client info & tag */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                            isMentorship
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                              : "bg-cyan-950 text-cyan-300 border border-cyan-800"
                          }`}
                        >
                          {isMentorship ? <GraduationCap className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                          <span>{isMentorship ? "Mentorship Request" : "Hire Inquiry"}</span>
                        </span>

                        <span
                          className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                            lead.status === "sent"
                              ? "bg-purple-950 text-purple-300 border border-purple-800"
                              : lead.status === "closed"
                              ? "bg-slate-800 text-slate-400 border border-slate-700"
                              : "bg-amber-950 text-amber-300 border border-amber-800"
                          }`}
                        >
                          {lead.status || "pending"}
                        </span>

                        <span className="text-[11px] text-slate-500">
                          Received: {new Date(lead.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white">{lead.name}</h3>
                        <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-500" />
                            <span>{lead.email}</span>
                          </span>
                          {lead.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-500" />
                              <span>{lead.phone}</span>
                            </span>
                          )}
                          {lead.company && <span>• Company: {lead.company}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Right: Dispatch Button & Action */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleOpenDispatchModal(lead.leadType, lead)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md ${
                          isSent
                            ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                            : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/10"
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSent ? "Re-Dispatch / Change Experts" : "Send to Expert"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Lead Message & Details */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="md:col-span-2 space-y-1">
                      <span className="text-slate-500 font-semibold block">Client Message / Requirement:</span>
                      <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {lead.message || lead.description || "No description provided."}
                      </p>
                    </div>

                    <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800/60">
                      <div>
                        <span className="text-slate-500 font-semibold">Goal / Role: </span>
                        <span className="text-white font-medium">{lead.roleSlug || lead.goal || "General"}</span>
                      </div>
                      {lead.stack?.length > 0 && (
                        <div>
                          <span className="text-slate-500 font-semibold">Tech Stack: </span>
                          <span className="text-emerald-400 font-medium">
                            {lead.stack.join(", ")}
                            {lead.otherStack ? ` (${lead.otherStack})` : ""}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="text-slate-500 font-semibold">Budget: </span>
                        <span className="text-white font-medium">{lead.budget || "Flexible"}</span>
                      </div>
                      {lead.startDate && (
                        <div>
                          <span className="text-slate-500 font-semibold">Target Start: </span>
                          <span className="text-white font-medium">{lead.startDate}</span>
                        </div>
                      )}
                      {lead.urgency && (
                        <div>
                          <span className="text-slate-500 font-semibold">Urgency: </span>
                          <span className="text-white font-medium">{lead.urgency}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dispatched Experts Tracker */}
                  {lead.assignedExpertIds?.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-slate-500 font-semibold">Dispatched To:</span>
                      {lead.assignedExpertIds.map((expert) => {
                        const expertName = typeof expert === "object" ? expert.displayName || expert.slug : expert;
                        const slug = typeof expert === "object" ? expert.slug : null;

                        return (
                          <span
                            key={typeof expert === "object" ? expert._id : expert}
                            className="px-2.5 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[11px] font-semibold flex items-center gap-1"
                          >
                            <span>{expertName}</span>
                            {slug && (
                              <Link
                                href={`/experts/${slug}`}
                                target="_blank"
                                className="text-purple-400 hover:text-white"
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                              </Link>
                            )}
                          </span>
                        );
                      })}
                      {lead.sentAt && (
                        <span className="text-slate-500 text-[11px] ml-2">
                          (Sent: {new Date(lead.sentAt).toLocaleString()})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* MODAL: SEND TO 1-3 EXPERTS */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Send className="w-5 h-5 text-emerald-400" />
                    <span>Dispatch Lead to Matched Experts</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select <strong>1 to 3 approved experts</strong> who have consented to receive leads. An email notification will be dispatched with reply-to set to the client.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-slate-500 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Client Brief */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{selectedLead.item.name}</span>
                  <span className="text-slate-400">{selectedLead.item.email}</span>
                </div>
                <p className="text-slate-400 line-clamp-2">
                  {selectedLead.item.message || selectedLead.item.description}
                </p>
              </div>

              {/* Selection Counter */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Available Approved Experts ({data.approvedExperts?.length || 0})
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    selectedExpertIds.length >= 1 && selectedExpertIds.length <= 3
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  Selected: {selectedExpertIds.length} / 3 experts
                </span>
              </div>

              {/* Experts List */}
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {data.approvedExperts?.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-4 bg-slate-950 rounded-xl text-center">
                    No approved experts currently have receiveLeads consent enabled.
                  </p>
                ) : (
                  data.approvedExperts.map((exp) => {
                    const isSelected = selectedExpertIds.includes(exp._id);
                    const isMatch =
                      selectedLead.leadType === "mentorship"
                        ? (exp.roles || []).includes("mentor")
                        : (exp.roles || []).includes("hire");

                    return (
                      <div
                        key={exp._id}
                        onClick={() => toggleExpertSelection(exp._id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                          isSelected
                            ? "bg-emerald-950/60 border-emerald-500 text-white shadow-md shadow-emerald-950/20"
                            : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                            {exp.photoUrl ? (
                              <img src={exp.photoUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-600">
                                <Users className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-white">{exp.displayName}</span>
                              {exp.slug && (
                                <span className="text-[10px] text-slate-500 font-mono">/{exp.slug}</span>
                              )}
                              {isMatch && (
                                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-semibold">
                                  Role Match
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Roles: {(exp.roles || []).join(", ")} • Rate: ${exp.hourlyRate || 0}/hr • Assigned Leads: {exp.assignedLeadsCount || 0}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                            isSelected
                              ? "bg-emerald-500 border-emerald-500 text-slate-950"
                              : "border-slate-700 bg-slate-900"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={dispatching || selectedExpertIds.length < 1 || selectedExpertIds.length > 3}
                  onClick={handleDispatch}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  {dispatching ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch to {selectedExpertIds.length} Expert(s)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

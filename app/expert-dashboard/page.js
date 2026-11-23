"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  EyeOff,
  ExternalLink,
  Edit3,
  Mail,
  Phone,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Calendar,
  Lock,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function ExpertDashboardPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();

  const [application, setApplication] = useState(null);
  const [leads, setLeads] = useState([]);
  const [activeTab, setActiveTab] = useState("mentorship");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/login?callbackUrl=/expert-dashboard");
      return;
    }

    if (authStatus === "authenticated") {
      fetchDashboardData();
    }
  }, [authStatus, router]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [appRes, leadsRes] = await Promise.all([
        fetch("/api/mentor/apply"),
        fetch("/api/expert/leads"),
      ]);

      if (appRes.ok) {
        const appData = await appRes.json();
        setApplication(appData.application || null);
      }

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads || []);
      }
    } catch (err) {
      console.error("Failed to load expert dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (authStatus === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col justify-between">
        <Header />
        <div className="flex-1 flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const appStatus = application?.status || "draft";
  const publicSlug = application?.slug;
  const publicUrl = publicSlug ? `https://www.outlinedev.com/experts/${publicSlug}` : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-400">
                OutlineDev Verified Network
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Expert Hub</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Expert Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Track your expert profile status, manage private contact channels, and view assigned client requests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/join"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Expert Profile</span>
            </Link>
          </div>
        </div>

        {!application ? (
          /* No Application Found */
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Create Your Expert Profile</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              You haven&apos;t started an expert application yet. Register to offer 1-on-1 mentorship, get hired for contract projects, or both.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition shadow-sm"
            >
              <span>Get Started</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Status & Contact Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Status Card */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    Profile Status
                  </h2>
                  <span
                    className={`text-xs uppercase tracking-wider font-extrabold px-3 py-1 rounded-full border ${
                      appStatus === "approved"
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                        : appStatus === "pending"
                        ? "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800"
                        : appStatus === "hidden"
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-700"
                        : appStatus === "rejected"
                        ? "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                    }`}
                  >
                    {appStatus === "approved" && "Approved"}
                    {appStatus === "pending" && "Submitted for review"}
                    {appStatus === "hidden" && "Hidden"}
                    {appStatus === "rejected" && "Rejected"}
                    {appStatus === "draft" && "Draft"}
                  </span>
                </div>

                {/* Status-specific descriptions */}
                <div className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                  {appStatus === "approved" && (
                    <div className="space-y-3">
                      <p className="text-emerald-700 dark:text-emerald-300/90 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        Your verified expert profile is live and discoverable on OutlineDev!
                      </p>
                      {publicUrl && (
                        <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                          <a
                            href={publicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 dark:text-emerald-400 hover:underline font-mono inline-flex items-center gap-1"
                          >
                            <span>{publicUrl}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <a
                            href={publicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            <span>Preview public profile</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {appStatus === "pending" && (
                    <div className="space-y-2">
                      <p className="text-blue-700 dark:text-blue-300 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                        Your application has been submitted and is currently being reviewed by OutlineDev.
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Our review team will verify your credentials and may reach out via WhatsApp or email for a short interview before approving your profile.
                      </p>
                    </div>
                  )}

                  {appStatus === "rejected" && (
                    <div className="space-y-3">
                      <p className="text-red-700 dark:text-red-300 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                        Your application requires updates before it can be approved.
                      </p>
                      {application.adminNotes && (
                        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/80 text-xs text-red-800 dark:text-red-200">
                          <strong className="block mb-1 text-red-700 dark:text-red-300">Reason:</strong>
                          <p className="whitespace-pre-wrap">{application.adminNotes}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {appStatus === "hidden" && (
                    <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-slate-400 shrink-0" />
                      Your profile is currently hidden from public discovery. You can unhide it from your profile form.
                    </p>
                  )}

                  {appStatus === "draft" && (
                    <p className="text-slate-500 dark:text-slate-400">
                      Your profile draft is saved. Fill in all required details and submit when you&apos;re ready for admin review.
                    </p>
                  )}
                </div>

                {/* Edit profile note */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start justify-between gap-4">
                  <p>
                    <strong className="text-slate-800 dark:text-slate-300">Notice on Profile Edits:</strong> Edits to your profile are reviewed by admin before they go live. If your profile is already approved, your current live version stays published while your updates are reviewed.
                  </p>
                  <Link
                    href="/join"
                    className="shrink-0 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-semibold underline"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>

              {/* Private WhatsApp Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      WhatsApp Contact
                    </h2>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      Private
                    </span>
                  </div>

                  <div className="my-4">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                      Registered Number
                    </span>
                    <p className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                      {application.whatsapp || <span className="text-slate-500 font-normal italic text-sm">Not provided yet</span>}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Private channel. Only OutlineDev uses this number to contact you about client requests and dispatch notifications. It is <strong>never displayed on the website</strong>.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <Link
                    href="/join"
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                  >
                    <span>Update number in profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Requests Assigned to You */}
            {(() => {
              const sortedLeads = [...leads].sort((a, b) => new Date(b.date) - new Date(a.date));
              const mentorshipLeads = sortedLeads.filter(
                (l) => l.type === "1-on-1 Mentorship" || l.type?.toLowerCase().includes("mentor")
              );
              const hireLeads = sortedLeads.filter(
                (l) => l.type === "Hire Inquiry" || l.type?.toLowerCase().includes("hire")
              );
              const displayedLeads = activeTab === "mentorship" ? mentorshipLeads : hireLeads;

              return (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800 flex-wrap gap-2">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-emerald-400" />
                        Requests Assigned to You
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">
                        Client mentorship requests and freelance inquiries matched to you by OutlineDev coordinators.
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
                      {leads.length} {leads.length === 1 ? "Lead" : "Leads"} Total
                    </span>
                  </div>

                  {/* Grouped Tabs */}
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab("mentorship")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                        activeTab === "mentorship"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      <span>Mentorship students</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          activeTab === "mentorship"
                            ? "bg-white/20 text-white"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {mentorshipLeads.length}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("hire")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                        activeTab === "hire"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      <span>Hire enquiries</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          activeTab === "hire"
                            ? "bg-white/20 text-white"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {hireLeads.length}
                      </span>
                    </button>
                  </div>

                  {displayedLeads.length === 0 ? (
                    <div className="py-16 text-center bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800/80 p-8">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 flex items-center justify-center mx-auto mb-3">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-300">No assigned enquiries yet</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-md mx-auto">
                        No assigned enquiries yet. When OutlineDev assigns a student or client to you, you will see it here and get an email.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {displayedLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="p-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-base font-bold text-slate-900 dark:text-white">{lead.clientName}</h4>
                              <span
                                className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full border ${
                                  lead.type === "1-on-1 Mentorship" || lead.type?.toLowerCase().includes("mentor")
                                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                                    : "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                                }`}
                              >
                                {lead.type}
                              </span>
                              {lead.skill && (
                                <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
                                  {lead.skill}
                                </span>
                              )}
                              {lead.company && (
                                <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                  🏢 {lead.company}
                                </span>
                              )}
                            </div>

                            <div className="text-xs text-slate-500 flex items-center gap-1 shrink-0">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>
                                {new Date(lead.date).toLocaleDateString("en-IN", {
                                  dateStyle: "medium",
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Client Reply Email & Phone */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3 text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                              <span>Reply to client:</span>
                              <a
                                href={`mailto:${lead.clientEmail}`}
                                className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                              >
                                {lead.clientEmail}
                              </a>
                            </div>
                            {lead.phone ? (
                              <div className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                                <span>Phone:</span>
                                <span className="text-slate-800 dark:text-slate-300 font-mono">{lead.phone}</span>
                              </div>
                            ) : null}
                          </div>

                          {/* Message / Details */}
                          {lead.message && (
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                              <strong className="block text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider mb-1">
                                Request Details:
                              </strong>
                              {lead.message}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

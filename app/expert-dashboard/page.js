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
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-400">
                OutlineDev Verified Network
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Expert Hub</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Expert Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Track your expert profile status, manage private contact channels, and view assigned client requests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/join"
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Expert Profile</span>
            </Link>
          </div>
        </div>

        {!application ? (
          /* No Application Found */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Create Your Expert Profile</h2>
            <p className="text-slate-400 text-sm mb-6">
              You haven&apos;t started an expert application yet. Register to offer 1-on-1 mentorship, get hired for contract projects, or both.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition"
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
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    Profile Status
                  </h2>
                  <span
                    className={`text-xs uppercase tracking-wider font-extrabold px-3 py-1 rounded-full border ${
                      appStatus === "approved"
                        ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                        : appStatus === "pending"
                        ? "bg-amber-950 text-amber-300 border-amber-800"
                        : appStatus === "hidden"
                        ? "bg-slate-800 text-slate-400 border-slate-700"
                        : appStatus === "rejected"
                        ? "bg-red-950 text-red-300 border-red-800"
                        : "bg-slate-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    {appStatus === "approved" && "Approved & Active"}
                    {appStatus === "pending" && "Pending Review"}
                    {appStatus === "hidden" && "Hidden from Search"}
                    {appStatus === "rejected" && "Changes Requested"}
                    {appStatus === "draft" && "Draft in Progress"}
                  </span>
                </div>

                {/* Status-specific descriptions */}
                <div className="text-sm text-slate-300 mb-4">
                  {appStatus === "approved" && (
                    <div className="space-y-3">
                      <p className="text-emerald-300/90 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        Your verified expert profile is live and discoverable on OutlineDev!
                      </p>
                      {publicUrl && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-400">Public listing URL:</span>
                          <a
                            href={publicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline font-mono inline-flex items-center gap-1"
                          >
                            <span>/experts/{publicSlug}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {appStatus === "pending" && (
                    <div className="space-y-2">
                      <p className="text-amber-300/90 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                        Your application has been submitted and is currently being reviewed by OutlineDev.
                      </p>
                      <p className="text-xs text-slate-400">
                        Our review team will verify your credentials and may reach out via WhatsApp or email for an interview before approving your profile.
                      </p>
                    </div>
                  )}

                  {appStatus === "rejected" && (
                    <div className="space-y-3">
                      <p className="text-red-300 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        Your application requires updates before it can be approved.
                      </p>
                      {application.adminNotes && (
                        <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/80 text-xs text-red-200">
                          <strong className="block mb-1 text-red-300">Admin Review Note:</strong>
                          <p className="whitespace-pre-wrap">{application.adminNotes}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {appStatus === "hidden" && (
                    <p className="text-slate-400 flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-slate-400 shrink-0" />
                      Your profile is currently hidden from public discovery. You can unhide it from your profile form.
                    </p>
                  )}

                  {appStatus === "draft" && (
                    <p className="text-slate-400">
                      Your profile draft is saved. Fill in all required details and submit when you&apos;re ready for admin review.
                    </p>
                  )}
                </div>

                {/* Edit profile note */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-start justify-between gap-4">
                  <p>
                    <strong className="text-slate-300">Notice on Profile Edits:</strong> Edits to your profile are reviewed by admin before they go live. If your profile is already approved, your current live version stays published while your updates are reviewed.
                  </p>
                  <Link
                    href="/join"
                    className="shrink-0 text-emerald-400 hover:text-emerald-300 font-semibold underline"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>

              {/* Private WhatsApp Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      WhatsApp Contact
                    </h2>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      Private
                    </span>
                  </div>

                  <div className="my-4">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                      Registered Number
                    </span>
                    <p className="text-lg font-mono font-bold text-white">
                      {application.whatsapp || <span className="text-slate-500 font-normal italic text-sm">Not provided yet</span>}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Private channel. Only OutlineDev uses this number to contact you about client requests and dispatch notifications. It is <strong>never displayed on the website</strong>.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800">
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
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 flex-wrap gap-2">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-emerald-400" />
                    Requests Assigned to You
                  </h2>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Client mentorship requests and freelance inquiries matched to you by OutlineDev coordinators.
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {leads.length} {leads.length === 1 ? "Lead" : "Leads"} Assigned
                </span>
              </div>

              {leads.length === 0 ? (
                <div className="py-16 text-center bg-slate-950/40 rounded-xl border border-slate-800/80 p-8">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 text-slate-500 flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-300">No requests assigned yet</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    When clients submit mentorship or hire developer inquiries that match your primary skills, OutlineDev coordinators assign them directly to you here and notify you by email.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-5 bg-slate-950/60 border border-slate-800 rounded-xl hover:border-slate-700 transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-bold text-white">{lead.clientName}</h4>
                          <span
                            className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full border ${
                              lead.type === "1-on-1 Mentorship"
                                ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                                : "bg-amber-950 text-amber-300 border-amber-800"
                            }`}
                          >
                            {lead.type}
                          </span>
                          {lead.skill && (
                            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {lead.skill}
                            </span>
                          )}
                          {lead.company && (
                            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3 text-slate-400">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Reply to client:</span>
                          <a
                            href={`mailto:${lead.clientEmail}`}
                            className="text-emerald-400 hover:underline font-medium"
                          >
                            {lead.clientEmail}
                          </a>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Phone:</span>
                            <span className="text-slate-300 font-mono">{lead.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* Message / Details */}
                      {lead.message && (
                        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                          <strong className="block text-slate-400 text-[11px] uppercase tracking-wider mb-1">
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
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

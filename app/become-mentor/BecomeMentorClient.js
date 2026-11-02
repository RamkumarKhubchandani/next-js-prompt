"use client";

import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  Loader2,
  Trash2,
  EyeOff,
  Eye,
  Camera,
  Globe,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Plus,
  X,
  Clock,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  Save,
} from "lucide-react";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SKILLS, LOCATIONS } from "../lib/seo-data";

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export default function BecomeMentorClient() {
  const { data: session, status: authStatus } = useSession();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [rejectionNote, setRejectionNote] = useState("");
  const [hasPublished, setHasPublished] = useState(false);
  const [skillSearch, setSkillSearch] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    displayName: "",
    photoUrl: "",
    photoPublicId: "",
    roles: ["mentor"],
    draft: {
      mentor: {
        headline: "",
        summary: "",
        rate: 45,
        topics: ["System Design", "Code Reviews", "Interview Prep"],
        formats: ["1-on-1 Video Calls", "Async Code Reviews"],
      },
      hire: {
        headline: "",
        summary: "",
        rate: 55,
        availability: "Part-time (10-20 hrs/week)",
        engagementTypes: ["Hourly Contractor", "Fixed-Price Projects"],
      },
      skillIds: [],
      locationId: "online",
      locationOther: { country: "", city: "" },
      timezone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC",
      yearsExperience: 4,
      languages: ["English"],
      links: { github: "", linkedin: "" },
      projects: [],
    },
    consents: {
      publicProfile: false,
      publicPhoto: false,
      realName: false,
      terms: false,
      mayInterview: false,
      receiveLeads: false,
    },
  });

  // Load existing application
  useEffect(() => {
    if (authStatus === "loading") return;
    if (!session) {
      setLoading(false);
      return;
    }

    async function fetchApp() {
      try {
        const res = await fetch("/api/mentor/apply");
        if (res.ok) {
          const data = await res.json();
          if (data.application) {
            const app = data.application;
            setApplicationStatus(app.status || "draft");
            setRejectionNote(app.adminNotes || "");
            setHasPublished(Boolean(app.published));

            const draftData = app.draft || {};
            setFormData({
              displayName: app.displayName || session.user?.name || "",
              photoUrl: app.photoUrl || session.user?.image || "",
              photoPublicId: app.photoPublicId || "",
              roles: Array.isArray(app.roles) && app.roles.length > 0 ? app.roles : ["mentor"],
              draft: {
                mentor: {
                  headline: draftData.mentor?.headline || app.mentorHeadline || "",
                  summary: draftData.mentor?.summary || app.mentorBio || app.bio || "",
                  rate: draftData.mentor?.rate || app.hourlyRate || 45,
                  topics: draftData.mentor?.topics?.length
                    ? draftData.mentor.topics
                    : ["System Design", "Code Reviews", "Interview Prep"],
                  formats: draftData.mentor?.formats?.length
                    ? draftData.mentor.formats
                    : ["1-on-1 Video Calls", "Async Code Reviews"],
                },
                hire: {
                  headline: draftData.hire?.headline || app.hireHeadline || "",
                  summary: draftData.hire?.summary || app.hireBio || app.bio || "",
                  rate: draftData.hire?.rate || app.hourlyRate || 55,
                  availability: draftData.hire?.availability || app.availability || "Part-time (10-20 hrs/week)",
                  engagementTypes: draftData.hire?.engagementTypes?.length
                    ? draftData.hire.engagementTypes
                    : ["Hourly Contractor", "Fixed-Price Projects"],
                },
                skillIds: draftData.skillIds?.length ? draftData.skillIds : app.skills || [],
                locationId: draftData.locationId || "online",
                locationOther: draftData.locationOther || { country: app.country || "", city: app.city || "" },
                timezone: draftData.timezone || (typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC"),
                yearsExperience: draftData.yearsExperience || app.yearsExperience || 3,
                languages: draftData.languages?.length ? draftData.languages : ["English"],
                links: {
                  github: draftData.links?.github || app.github || "",
                  linkedin: draftData.links?.linkedin || app.linkedin || "",
                },
                projects: Array.isArray(draftData.projects) ? draftData.projects : [],
              },
              consents: {
                publicProfile: Boolean(app.consents?.publicProfile),
                publicPhoto: Boolean(app.consents?.publicPhoto),
                realName: Boolean(app.consents?.realName),
                terms: Boolean(app.consents?.terms),
                mayInterview: Boolean(app.consents?.mayInterview),
                receiveLeads: Boolean(app.consents?.receiveLeads),
              },
            });
          } else {
            // New user defaults
            setFormData((prev) => ({
              ...prev,
              displayName: session.user?.name || "",
              photoUrl: session.user?.image || "",
            }));
          }
        }
      } catch (err) {
        console.error("Failed to load application:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchApp();
  }, [session, authStatus]);

  // Handle Photo Upload via Cloudinary
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError("");

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowed.includes(file.type.toLowerCase())) {
      setPhotoError("Please upload a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Image size must be under 5MB.");
      return;
    }

    setUploadingPhoto(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/mentor/upload-photo", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();

      if (res.ok && data.url) {
        setFormData((prev) => ({
          ...prev,
          photoUrl: data.url,
          photoPublicId: data.public_id || prev.photoPublicId,
        }));
      } else {
        setPhotoError(data.error || "Failed to upload photo.");
      }
    } catch (err) {
      setPhotoError("Network error while uploading photo.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Toggle roles
  const toggleRole = (role) => {
    setFormError("");
    setFormData((prev) => {
      const exists = prev.roles.includes(role);
      let newRoles;
      if (exists) {
        if (prev.roles.length === 1) return prev; // Must keep at least one
        newRoles = prev.roles.filter((r) => r !== role);
      } else {
        newRoles = [...prev.roles, role];
      }
      return { ...prev, roles: newRoles };
    });
  };

  // Toggle skills (max 8)
  const toggleSkill = (skillId) => {
    setFormError("");
    setFormData((prev) => {
      const current = prev.draft.skillIds;
      if (current.includes(skillId)) {
        return {
          ...prev,
          draft: { ...prev.draft, skillIds: current.filter((id) => id !== skillId) },
        };
      }
      if (current.length >= 8) {
        setFormError("You can choose a maximum of 8 primary skills.");
        return prev;
      }
      return {
        ...prev,
        draft: { ...prev.draft, skillIds: [...current, skillId] },
      };
    });
  };

  // Project management (max 3)
  const addProject = () => {
    if (formData.draft.projects.length >= 3) return;
    setFormData((prev) => ({
      ...prev,
      draft: {
        ...prev.draft,
        projects: [...prev.draft.projects, { title: "", description: "", url: "" }],
      },
    }));
  };

  const updateProject = (index, field, value) => {
    setFormData((prev) => {
      const list = [...prev.draft.projects];
      list[index] = { ...list[index], [field]: value };
      return {
        ...prev,
        draft: { ...prev.draft, projects: list },
      };
    });
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      draft: {
        ...prev.draft,
        projects: prev.draft.projects.filter((_, i) => i !== index),
      },
    }));
  };

  // Step Validation
  const validateStep1 = () => {
    setFormError("");
    if (!formData.displayName.trim()) {
      setFormError("Please enter your real full name.");
      return false;
    }
    if (!formData.photoUrl) {
      setFormError("Please upload a real professional photo of yourself.");
      return false;
    }
    if (formData.draft.skillIds.length === 0) {
      setFormError("Please select at least 1 primary skill.");
      return false;
    }
    if (formData.draft.locationId === "other") {
      if (!formData.draft.locationOther.country.trim() || !formData.draft.locationOther.city.trim()) {
        setFormError("Please enter both your Country and City.");
        return false;
      }
    }
    return true;
  };

  const validateStep2 = () => {
    setFormError("");
    if (formData.roles.includes("mentor")) {
      const h = formData.draft.mentor.headline.trim();
      if (!h) {
        setFormError("Mentor Headline is required.");
        return false;
      }
      if (h.length > 70) {
        setFormError(`Mentor Headline cannot exceed 70 characters (currently ${h.length}).`);
        return false;
      }
      if (/<[^>]*>/g.test(h)) {
        setFormError("Mentor Headline must be plain text without HTML.");
        return false;
      }
      if (/https?:\/\/|www\.|\.(?:com|org|net|io|dev|app)\b/i.test(h)) {
        setFormError("Mentor Headline cannot contain website links or URLs.");
        return false;
      }
      const words = countWords(formData.draft.mentor.summary);
      if (words < 80 || words > 300) {
        setFormError(`Mentor Summary must be between 80 and 300 words (currently ${words} words).`);
        return false;
      }
    }

    if (formData.roles.includes("hire")) {
      const h = formData.draft.hire.headline.trim();
      if (!h) {
        setFormError("Hire Headline is required.");
        return false;
      }
      if (h.length > 70) {
        setFormError(`Hire Headline cannot exceed 70 characters (currently ${h.length}).`);
        return false;
      }
      if (/<[^>]*>/g.test(h)) {
        setFormError("Hire Headline must be plain text without HTML.");
        return false;
      }
      if (/https?:\/\/|www\.|\.(?:com|org|net|io|dev|app)\b/i.test(h)) {
        setFormError("Hire Headline cannot contain website links or URLs.");
        return false;
      }
      const words = countWords(formData.draft.hire.summary);
      if (words < 80 || words > 300) {
        setFormError(`Hire Summary must be between 80 and 300 words (currently ${words} words).`);
        return false;
      }
    }
    return true;
  };

  const validateStep3 = () => {
    setFormError("");
    // Check projects
    for (let i = 0; i < formData.draft.projects.length; i++) {
      const p = formData.draft.projects[i];
      if (!p.title.trim() || !p.description.trim()) {
        setFormError(`Project #${i + 1} requires both a title and a one-line description.`);
        return false;
      }
    }
    // Check all 6 consents
    const consents = formData.consents;
    if (
      !consents.publicProfile ||
      !consents.publicPhoto ||
      !consents.realName ||
      !consents.terms ||
      !consents.mayInterview ||
      !consents.receiveLeads
    ) {
      setFormError("You must agree to all 6 declaration statements before submitting.");
      return false;
    }
    return true;
  };

  // Submit Application
  const handleSaveOrSubmit = async (isDraftSave = false) => {
    if (!isDraftSave) {
      if (!validateStep1() || !validateStep2() || !validateStep3()) {
        return;
      }
    }

    setSaving(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/mentor/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          isDraftSave,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setApplicationStatus(data.application?.status || (isDraftSave ? "draft" : "pending"));
        setSuccessMessage(
          isDraftSave
            ? "Your draft has been saved successfully."
            : "Your application has been submitted for review! OutlineDev admins will review your draft."
        );
      } else {
        setFormError(data.error || "Failed to submit. Please review your fields.");
      }
    } catch (err) {
      setFormError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Action: Hide profile
  const handleHideProfile = async () => {
    if (!confirm("Are you sure you want to hide your profile from public discovery?")) return;
    setSaving(true);
    try {
      const res = await fetch("/api/mentor/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "hide" }),
      });
      if (res.ok) {
        setApplicationStatus("hidden");
        setSuccessMessage("Your profile is now hidden from public listings.");
      }
    } finally {
      setSaving(false);
    }
  };

  // Action: Unhide profile
  const handleUnhideProfile = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/mentor/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "unhide" }),
      });
      if (res.ok) {
        setApplicationStatus("approved");
        setSuccessMessage("Your profile is now active and live!");
      }
    } finally {
      setSaving(false);
    }
  };

  // Action: Delete profile
  const handleDeleteProfile = async () => {
    const verified = confirm(
      "Are you sure you want to completely delete your expert profile? This permanently removes your listing, photo, and review history."
    );
    if (!verified) return;

    setSaving(true);
    try {
      const res = await fetch("/api/mentor/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete" }),
      });
      if (res.ok) {
        alert("Your expert profile and photo have been deleted.");
        window.location.reload();
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
        <Header />
        <main className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Join OutlineDev as an Expert</h1>
          <p className="text-slate-400 mb-8">
            Create ONE verified expert profile to offer 1-on-1 mentorship, take on high-paying contract work, or both.
          </p>
          <button
            onClick={() => signIn("google")}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition shadow-lg shadow-emerald-500/20"
          >
            Sign in with Google to Apply
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const filteredSkills = SKILLS.filter((s) => {
    const q = skillSearch.toLowerCase().trim();
    if (!q) return true;
    return s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Status Banner */}
        {applicationStatus && applicationStatus !== "draft" && (
          <div className="mb-8 p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border-slate-800">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  applicationStatus === "approved"
                    ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                    : applicationStatus === "pending"
                    ? "bg-amber-950 text-amber-300 border border-amber-800"
                    : applicationStatus === "hidden"
                    ? "bg-slate-800 text-slate-400 border border-slate-700"
                    : "bg-red-950 text-red-300 border border-red-800"
                }`}
              >
                Status: {applicationStatus}
              </span>
              <p className="text-xs text-slate-400">
                {applicationStatus === "approved" &&
                  "Your published profile is live. Changes you save to your draft will be reviewed by admin."}
                {applicationStatus === "pending" &&
                  "Your application is currently under admin review. We may reach out for an interview."}
                {applicationStatus === "hidden" && "Your profile is hidden from public discovery."}
                {applicationStatus === "rejected" && `Review note: ${rejectionNote || "Not approved at this time."}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {applicationStatus === "approved" && (
                <button
                  type="button"
                  onClick={handleHideProfile}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition flex items-center gap-1.5"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide my profile</span>
                </button>
              )}
              {applicationStatus === "hidden" && (
                <button
                  type="button"
                  onClick={handleUnhideProfile}
                  className="px-3 py-1.5 text-xs text-emerald-300 hover:text-white bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 rounded-lg transition flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Make profile live</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleDeleteProfile}
                className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 rounded-lg transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Request deletion</span>
              </button>
            </div>
          </div>
        )}

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Expert Profile Registration
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            One public profile. Mentor aspiring developers, get hired for client projects, or both.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[
            { num: 1, label: "Basics & Skills" },
            { num: 2, label: "Roles & Offerings" },
            { num: 3, label: "Projects & Consents" },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                if (s.num === 1) setStep(1);
                if (s.num === 2 && validateStep1()) setStep(2);
                if (s.num === 3 && validateStep1() && validateStep2()) setStep(3);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
                step === s.num
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : step > s.num
                  ? "bg-slate-900 text-slate-300 border border-slate-800"
                  : "bg-slate-900/40 text-slate-500 border border-slate-800/60"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                  step === s.num ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-400"
                }`}
              >
                {s.num}
              </span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Error & Success Alerts */}
        {formError && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}
        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">Step 1: Authentic Identity & Core Skills</h2>
                <p className="text-xs text-slate-400 mt-1">
                  OutlineDev values authenticity. We require your real name, a clear professional photo, and verified skills.
                </p>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Real Professional Photo *
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-slate-800 border-2 border-emerald-500/30 shrink-0">
                    {formData.photoUrl ? (
                      <img
                        src={formData.photoUrl}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <Camera className="w-8 h-8" />
                      </div>
                    )}
                    {uploadingPhoto && (
                      <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold transition border border-emerald-500/30">
                      <UploadCloud className="w-4 h-4" />
                      <span>{formData.photoUrl ? "Replace Photo" : "Upload Photo"}</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={handlePhotoUpload}
                        disabled={uploadingPhoto}
                      />
                    </label>
                    <p className="text-[11px] text-slate-500 mt-2">
                      JPG, PNG, or WebP. Max 5MB. Automatic face centering will be applied.
                    </p>
                    {photoError && <p className="text-xs text-red-400 mt-1">{photoError}</p>}
                  </div>
                </div>
              </div>

              {/* Real Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Real Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="e.g., Alex Johnson"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Location & Timezone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Primary Location *
                  </label>
                  <select
                    value={formData.draft.locationId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        draft: { ...formData.draft, locationId: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="online">Online / Remote (Global)</option>
                    {LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} ({loc.country})
                      </option>
                    ))}
                    <option value="other">Other (Specify below)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Timezone
                  </label>
                  <input
                    type="text"
                    value={formData.draft.timezone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        draft: { ...formData.draft, timezone: e.target.value },
                      })
                    }
                    placeholder="e.g., America/New_York or Asia/Kolkata"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Location Other Details */}
              {formData.draft.locationId === "other" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Country *</label>
                    <input
                      type="text"
                      value={formData.draft.locationOther.country}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          draft: {
                            ...formData.draft,
                            locationOther: { ...formData.draft.locationOther, country: e.target.value },
                          },
                        })
                      }
                      placeholder="e.g., Canada"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">City *</label>
                    <input
                      type="text"
                      value={formData.draft.locationOther.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          draft: {
                            ...formData.draft,
                            locationOther: { ...formData.draft.locationOther, city: e.target.value },
                          },
                        })
                      }
                      placeholder="e.g., Toronto"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* Experience & Languages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Years of Professional Experience *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={formData.draft.yearsExperience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        draft: { ...formData.draft, yearsExperience: Number(e.target.value) },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Languages Spoken (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.draft.languages.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        draft: {
                          ...formData.draft,
                          languages: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        },
                      })
                    }
                    placeholder="English, Spanish, Hindi"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Primary Skills Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Core Technical Skills * (Max 8)
                  </label>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      formData.draft.skillIds.length === 8
                        ? "bg-amber-950 text-amber-300 border border-amber-800"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {formData.draft.skillIds.length} / 8 selected
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Filter skills (e.g. React, Next.js, Python, AWS)..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white mb-3 focus:outline-none focus:border-emerald-500"
                />
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {filteredSkills.map((s) => {
                    const isSelected = formData.draft.skillIds.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleSkill(s.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-emerald-500 text-slate-950 font-semibold"
                            : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{s.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition flex items-center gap-2"
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ROLES & OFFERINGS */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">Step 2: Role Profiles & Offerings</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Choose whether you want to act as a Mentor, a Hire developer, or both. Each role carries its own headline and summary.
                </p>
              </div>

              {/* Role Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => toggleRole("mentor")}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    formData.roles.includes("mentor")
                      ? "bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/20"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap
                        className={`w-5 h-5 ${
                          formData.roles.includes("mentor") ? "text-emerald-400" : "text-slate-400"
                        }`}
                      />
                      <span className="font-bold text-white text-sm">Mentor Profile</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.roles.includes("mentor")}
                      onChange={() => {}}
                      className="w-4 h-4 text-emerald-500 rounded bg-slate-900 border-slate-700"
                    />
                  </div>
                  <p className="text-xs text-slate-400">
                    Host 1-on-1 coaching, conduct code reviews, mock interviews, and career mentoring.
                  </p>
                </div>

                <div
                  onClick={() => toggleRole("hire")}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    formData.roles.includes("hire")
                      ? "bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-950/20"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Briefcase
                        className={`w-5 h-5 ${
                          formData.roles.includes("hire") ? "text-cyan-400" : "text-slate-400"
                        }`}
                      />
                      <span className="font-bold text-white text-sm">Hire Developer Profile</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.roles.includes("hire")}
                      onChange={() => {}}
                      className="w-4 h-4 text-cyan-500 rounded bg-slate-900 border-slate-700"
                    />
                  </div>
                  <p className="text-xs text-slate-400">
                    Get booked for full-stack engineering contracts, feature delivery, and team augmentation.
                  </p>
                </div>
              </div>

              {/* MENTOR SECTION */}
              {formData.roles.includes("mentor") && (
                <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>Mentor Profile Details</span>
                    </span>
                    <span className="text-xs text-slate-400">Headline max 70 chars • Summary 80-300 words</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs text-slate-300 font-semibold">
                        Mentor Headline * (Plain text, no URLs)
                      </label>
                      <span
                        className={`text-[11px] ${
                          formData.draft.mentor.headline.length > 70 ? "text-red-400" : "text-slate-500"
                        }`}
                      >
                        {formData.draft.mentor.headline.length} / 70
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={70}
                      value={formData.draft.mentor.headline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          draft: {
                            ...formData.draft,
                            mentor: { ...formData.draft.mentor, headline: e.target.value },
                          },
                        })
                      }
                      placeholder="e.g., Senior Full-Stack Engineer & React Systems Coach"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs text-slate-300 font-semibold">
                        Mentorship Summary * (80 - 300 words)
                      </label>
                      <span
                        className={`text-[11px] ${
                          countWords(formData.draft.mentor.summary) < 80 ||
                          countWords(formData.draft.mentor.summary) > 300
                            ? "text-amber-400"
                            : "text-emerald-400"
                        }`}
                      >
                        {countWords(formData.draft.mentor.summary)} words
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={formData.draft.mentor.summary}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          draft: {
                            ...formData.draft,
                            mentor: { ...formData.draft.mentor, summary: e.target.value },
                          },
                        })
                      }
                      placeholder="Describe your teaching approach, background, how you guide learners through complex problems, and how 1-on-1 calls are conducted..."
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Hourly Mentorship Rate ($/hr)</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.draft.mentor.rate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            draft: {
                              ...formData.draft,
                              mentor: { ...formData.draft.mentor, rate: Number(e.target.value) },
                            },
                          })
                        }
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Mentorship Formats</label>
                      <input
                        type="text"
                        value={formData.draft.mentor.formats.join(", ")}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            draft: {
                              ...formData.draft,
                              mentor: {
                                ...formData.draft.mentor,
                                formats: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                              },
                            },
                          })
                        }
                        placeholder="1-on-1 Calls, Code Reviews, Chat"
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* HIRE SECTION */}
              {formData.roles.includes("hire") && (
                <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>Hire Developer Details</span>
                    </span>
                    <span className="text-xs text-slate-400">Headline max 70 chars • Summary 80-300 words</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs text-slate-300 font-semibold">
                        Hire Headline * (Plain text, no URLs)
                      </label>
                      <span
                        className={`text-[11px] ${
                          formData.draft.hire.headline.length > 70 ? "text-red-400" : "text-slate-500"
                        }`}
                      >
                        {formData.draft.hire.headline.length} / 70
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={70}
                      value={formData.draft.hire.headline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          draft: {
                            ...formData.draft,
                            hire: { ...formData.draft.hire, headline: e.target.value },
                          },
                        })
                      }
                      placeholder="e.g., Contract Full-Stack Engineer: Next.js & Cloud Architecture"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs text-slate-300 font-semibold">
                        Hire Summary * (80 - 300 words)
                      </label>
                      <span
                        className={`text-[11px] ${
                          countWords(formData.draft.hire.summary) < 80 ||
                          countWords(formData.draft.hire.summary) > 300
                            ? "text-amber-400"
                            : "text-cyan-400"
                        }`}
                      >
                        {countWords(formData.draft.hire.summary)} words
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={formData.draft.hire.summary}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          draft: {
                            ...formData.draft,
                            hire: { ...formData.draft.hire, summary: e.target.value },
                          },
                        })
                      }
                      placeholder="Describe what client systems you build, performance and architecture standards, testing practices, and how you deliver software on time..."
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Contract Rate ($/hr)</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.draft.hire.rate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            draft: {
                              ...formData.draft,
                              hire: { ...formData.draft.hire, rate: Number(e.target.value) },
                            },
                          })
                        }
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Availability</label>
                      <select
                        value={formData.draft.hire.availability}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            draft: {
                              ...formData.draft,
                              hire: { ...formData.draft.hire, availability: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-cyan-500"
                      >
                        <option value="Part-time (10-20 hrs/week)">Part-time (10-20 hrs/week)</option>
                        <option value="Full-time (30-40 hrs/week)">Full-time (30-40 hrs/week)</option>
                        <option value="Ad-hoc / Hourly Consultation">Ad-hoc / Hourly Consultation</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Step 1</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep2()) setStep(3);
                  }}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition flex items-center gap-2"
                >
                  <span>Continue to Step 3</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PROJECTS, LINKS & CONSENTS */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">Step 3: Proof of Work & Declarations</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Add projects you've built, professional profiles, and mandatory platform consents.
                </p>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    value={formData.draft.links.github}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        draft: {
                          ...formData.draft,
                          links: { ...formData.draft.links, github: e.target.value },
                        },
                      })
                    }
                    placeholder="https://github.com/yourusername"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={formData.draft.links.linkedin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        draft: {
                          ...formData.draft,
                          links: { ...formData.draft.links, linkedin: e.target.value },
                        },
                      })
                    }
                    placeholder="https://linkedin.com/in/yourusername"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Projects (Max 3) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Showcase Projects (Max 3)
                  </label>
                  {formData.draft.projects.length < 3 && (
                    <button
                      type="button"
                      onClick={addProject}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition flex items-center gap-1 border border-slate-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project</span>
                    </button>
                  )}
                </div>

                {formData.draft.projects.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                    No projects added yet. Click &quot;Add Project&quot; to showcase your code.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {formData.draft.projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 relative"
                      >
                        <button
                          type="button"
                          onClick={() => removeProject(idx)}
                          className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Project Title *</label>
                            <input
                              type="text"
                              required
                              value={proj.title}
                              onChange={(e) => updateProject(idx, "title", e.target.value)}
                              placeholder="e.g. Distributed Task Queue"
                              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Project Link (Optional)</label>
                            <input
                              type="url"
                              value={proj.url}
                              onChange={(e) => updateProject(idx, "url", e.target.value)}
                              placeholder="https://..."
                              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:border-emerald-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">
                            One-Line Description *
                          </label>
                          <input
                            type="text"
                            required
                            value={proj.description}
                            onChange={(e) => updateProject(idx, "description", e.target.value)}
                            placeholder="Built with Redis, Node.js, and Docker to process 50k background events/min"
                            className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mandatory Consents */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Mandatory Consents & Declarations *
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  All 6 items are required to publish on OutlineDev.
                </p>

                {[
                  {
                    key: "publicProfile",
                    text: "I consent to creating and publishing my expert profile on OutlineDev.",
                  },
                  {
                    key: "publicPhoto",
                    text: "I confirm this is my authentic photo and consent to its public display on OutlineDev.",
                  },
                  {
                    key: "realName",
                    text: "I confirm that I have provided my real legal/professional name and authentic credentials.",
                  },
                  {
                    key: "terms",
                    text: "I agree to OutlineDev's Expert Community Terms and Code of Conduct.",
                  },
                  {
                    key: "mayInterview",
                    text: "I understand OutlineDev may contact me for a short technical interview prior to approval.",
                  },
                  {
                    key: "receiveLeads",
                    text: "I consent to receiving client mentorship and contract leads routed through OutlineDev.",
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-start gap-3 text-xs text-slate-300 cursor-pointer select-none p-2 rounded-lg hover:bg-slate-900 transition"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(formData.consents[item.key])}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          consents: { ...formData.consents, [item.key]: e.target.checked },
                        })
                      }
                      className="w-4 h-4 mt-0.5 rounded text-emerald-500 bg-slate-900 border-slate-700 focus:ring-emerald-500"
                    />
                    <span>{item.text}</span>
                  </label>
                ))}
              </div>

              {/* Mandatory Notice Before Submit */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 text-amber-200 text-xs leading-relaxed">
                <p className="font-semibold mb-1">Important Notice:</p>
                <p>
                  &quot;We may contact you for a short interview before approval. Approval is not guaranteed and listing does not guarantee leads.&quot;
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Step 2</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveOrSubmit(true)}
                    className="flex-1 sm:flex-initial px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Draft</span>
                  </button>

                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveOrSubmit(false)}
                    className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Submit for Approval</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

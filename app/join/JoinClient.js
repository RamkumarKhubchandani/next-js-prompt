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
  Lock,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SKILLS, LOCATIONS } from "../lib/seo-data";
import { validateWhatsApp, parseYearsExperience, mapServerErrorToField, validateLocation, ALLOWED_OVERLAP_ZONES } from "../lib/experts";

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export default function JoinClient() {
  const { data: session, status: authStatus } = useSession();
  const [step, setStep] = useState(1);
  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    try {
      window.scrollTo(0, 0);
    } catch (e) {}
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  const goToStep = (newStep) => {
    if (typeof document !== "undefined" && document.activeElement) {
      try {
        document.activeElement.blur();
      } catch (e) {}
    }
    setStep(newStep);
    scrollToTop();
  };

  // Turn off browser scroll-anchoring on document root while on Join page
  useEffect(() => {
    try {
      document.documentElement.style.overflowAnchor = "none";
      document.body.style.overflowAnchor = "none";
    } catch (e) {}
    return () => {
      try {
        document.documentElement.style.overflowAnchor = "";
        document.body.style.overflowAnchor = "";
      } catch (e) {}
    };
  }, []);

  // Snap instantly to top whenever step changes
  useEffect(() => {
    scrollToTop();
  }, [step]);
  const [languagesInput, setLanguagesInput] = useState("English");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [stepSummaryError, setStepSummaryError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [rejectionNote, setRejectionNote] = useState("");
  const [hasPublished, setHasPublished] = useState(false);
  const [skillSearch, setSkillSearch] = useState("");
  const [offersOnline, setOffersOnline] = useState(true);
  const [homeLocationSearch, setHomeLocationSearch] = useState("");
  const [supportLocationSearch, setSupportLocationSearch] = useState("");
  const [isChangingHomeLocation, setIsChangingHomeLocation] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    displayName: "",
    whatsapp: "",
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
      locationId: "pune",
      locationIds: ["pune", "online"],
      overlapZones: [],
      locationOther: { country: "", city: "" },
      timezone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC",
      yearsExperience: "", // Default value is empty string (not 0 or 4)
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

  // Step field key groupings for error dots and step jumping
  const step1FieldKeys = [
    "displayName",
    "whatsapp",
    "photoUrl",
    "roles",
    "skillIds",
    "locationIds",
    "locationId",
    "locationOther",
    "yearsExperience",
    "draft.links.github",
    "draft.links.linkedin",
  ];
  const step2FieldKeys = ["mentor.headline", "mentor.summary", "hire.headline", "hire.summary"];
  const step3FieldKeys = ["projects", "consents"];

  const stepHasErrors = (stepNum) => {
    const activeKeys = Object.keys(fieldErrors).filter((k) => Boolean(fieldErrors[k]));
    if (stepNum === 1) return activeKeys.some((k) => step1FieldKeys.includes(k) || k.startsWith("draft.links"));
    if (stepNum === 2) return activeKeys.some((k) => step2FieldKeys.includes(k));
    if (stepNum === 3) return activeKeys.some((k) => step3FieldKeys.includes(k) || k.startsWith("projects"));
    return false;
  };

  const scrollToFirstError = (errors) => {
    const keys = Object.keys(errors);
    if (keys.length === 0) return;
    const firstKey = keys[0];
    const elementId = `field-${firstKey.replace(/\./g, "-")}`;
    const el =
      document.getElementById(elementId) ||
      (firstKey === "locationId" ? document.getElementById("field-locationIds") : null) ||
      document.querySelector(`[data-field="${firstKey}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "auto", block: "nearest" });
      if (typeof el.focus === "function") {
        try {
          el.focus();
        } catch (e) {}
      }
    }
  };

  const clearFieldError = (fieldName) => {
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

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
            const loadedYears =
              draftData.yearsExperience !== undefined && draftData.yearsExperience !== null
                ? String(draftData.yearsExperience)
                : app.yearsExperience !== undefined && app.yearsExperience !== null
                ? String(app.yearsExperience)
                : "";
            const rawLoadedLocationIds = draftData.locationIds?.length
              ? draftData.locationIds
              : [draftData.locationId || app.locationId || "pune"];
            const hasOnline = rawLoadedLocationIds.includes("online");
            setOffersOnline(hasOnline);

            let loadedLocationIds = [...rawLoadedLocationIds];
            if (loadedLocationIds[0] === "online" && loadedLocationIds.length > 1) {
              const physicalIndex = loadedLocationIds.findIndex((x) => x !== "online");
              if (physicalIndex > -1) {
                const physical = loadedLocationIds.splice(physicalIndex, 1)[0];
                loadedLocationIds.unshift(physical);
              }
            }
            const loadedOverlapZones = Array.isArray(draftData.overlapZones)
              ? draftData.overlapZones
              : (Array.isArray(app.overlapZones) ? app.overlapZones : []);

            setFormData({
              displayName: app.displayName || session.user?.name || "",
              whatsapp: app.whatsapp || "",
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
                locationId: loadedLocationIds[0] || "online",
                locationIds: loadedLocationIds,
                overlapZones: loadedOverlapZones,
                locationOther: draftData.locationOther || { country: app.country || "", city: app.city || "" },
                timezone: draftData.timezone || (typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC"),
                yearsExperience: loadedYears,
                languages: draftData.languages?.length ? draftData.languages : (app.languages?.length ? app.languages : ["English"]),
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
            const loadedLangs = draftData.languages?.length ? draftData.languages : (app.languages?.length ? app.languages : ["English"]);
            setLanguagesInput(loadedLangs.join(", "));
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
    clearFieldError("photoUrl");

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
    clearFieldError("roles");
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
    clearFieldError("skillIds");
    setFormData((prev) => {
      const current = prev.draft.skillIds;
      if (current.includes(skillId)) {
        return {
          ...prev,
          draft: { ...prev.draft, skillIds: current.filter((id) => id !== skillId) },
        };
      }
      if (current.length >= 8) {
        setFieldErrors((f) => ({ ...f, skillIds: "You can choose a maximum of 8 primary skills." }));
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
    clearFieldError("projects");
    setFormData((prev) => ({
      ...prev,
      draft: {
        ...prev.draft,
        projects: [...prev.draft.projects, { title: "", description: "", url: "" }],
      },
    }));
  };

  const updateProject = (index, field, value) => {
    clearFieldError("projects");
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
    clearFieldError("projects");
    setFormData((prev) => ({
      ...prev,
      draft: {
        ...prev.draft,
        projects: prev.draft.projects.filter((_, i) => i !== index),
      },
    }));
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errors = {};

    if (!formData.displayName.trim()) {
      errors.displayName = "Add your full name.";
    } else if (formData.displayName.trim().length < 2 || formData.displayName.trim().length > 60) {
      errors.displayName = "Full name must be between 2 and 60 characters.";
    } else if (/[<>]/.test(formData.displayName)) {
      errors.displayName = "Full name cannot contain angle brackets (< or >).";
    }

    if (!formData.photoUrl) {
      errors.photoUrl = "Upload a professional photo of yourself.";
    }

    const whatsappErr = validateWhatsApp(formData.whatsapp, false);
    if (whatsappErr) {
      errors.whatsapp = whatsappErr;
    }

    if (!Array.isArray(formData.roles) || formData.roles.length === 0) {
      errors.roles = "Select at least one offering: Mentor, Contract Work, or both.";
    }

    if (!formData.draft.skillIds || formData.draft.skillIds.length === 0) {
      errors.skillIds = "Choose 1 to 8 skills.";
    } else if (formData.draft.skillIds.length > 8) {
      errors.skillIds = "Choose at most 8 primary skills.";
    }

    if (formData.draft.locationId === "other" || (formData.draft.locationIds || []).includes("other")) {
      if (!formData.draft.locationOther?.country?.trim() || !formData.draft.locationOther?.city?.trim()) {
        errors.locationIds = "For custom location, enter both your Country and City.";
      }
    }

    const yrsCheck = parseYearsExperience(formData.draft.yearsExperience, false);
    if (!yrsCheck.valid) {
      errors.yearsExperience = yrsCheck.error || "Enter your years of experience (0-40).";
    }

    setFieldErrors((prev) => ({ ...prev, ...errors }));
    const errorCount = Object.keys(errors).length;
    if (errorCount > 0) {
      setStepSummaryError(`Please fix ${errorCount} ${errorCount === 1 ? "field" : "fields"} in this step before continuing.`);
      scrollToFirstError(errors);
      return false;
    }

    setStepSummaryError("");
    return true;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errors = {};

    if (formData.roles.includes("mentor")) {
      const h = formData.draft.mentor.headline?.trim() || "";
      if (!h) {
        errors["mentor.headline"] = "Headline is required.";
      } else if (h.length > 70) {
        errors["mentor.headline"] = `Headline is ${h.length} characters, the maximum is 70.`;
      } else if (/<[^>]*>/g.test(h)) {
        errors["mentor.headline"] = "Headline must be plain text without HTML.";
      } else if (/https?:\/\/|www\.|\.(?:com|org|net|io|dev|app)\b/i.test(h)) {
        errors["mentor.headline"] = "Headline cannot contain website links or URLs.";
      }

      const words = countWords(formData.draft.mentor.summary);
      if (words < 80 || words > 300) {
        errors["mentor.summary"] = `Mentor summary must be between 80 and 300 words (currently ${words} words).`;
      }
    }

    if (formData.roles.includes("hire")) {
      const h = formData.draft.hire.headline?.trim() || "";
      if (!h) {
        errors["hire.headline"] = "Headline is required.";
      } else if (h.length > 70) {
        errors["hire.headline"] = `Headline is ${h.length} characters, the maximum is 70.`;
      } else if (/<[^>]*>/g.test(h)) {
        errors["hire.headline"] = "Headline must be plain text without HTML.";
      } else if (/https?:\/\/|www\.|\.(?:com|org|net|io|dev|app)\b/i.test(h)) {
        errors["hire.headline"] = "Headline cannot contain website links or URLs.";
      }

      const words = countWords(formData.draft.hire.summary);
      if (words < 80 || words > 300) {
        errors["hire.summary"] = `Hire summary must be between 80 and 300 words (currently ${words} words).`;
      }
    }

    setFieldErrors((prev) => ({ ...prev, ...errors }));
    const errorCount = Object.keys(errors).length;
    if (errorCount > 0) {
      setStepSummaryError(`Please fix ${errorCount} ${errorCount === 1 ? "field" : "fields"} in this step before continuing.`);
      scrollToFirstError(errors);
      return false;
    }

    setStepSummaryError("");
    return true;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errors = {};

    for (let i = 0; i < formData.draft.projects.length; i++) {
      const p = formData.draft.projects[i];
      if (!p.title.trim() || !p.description.trim()) {
        errors.projects = `Project #${i + 1} requires both a title and description.`;
        break;
      }
    }

    const consents = formData.consents;
    if (
      !consents.publicProfile ||
      !consents.publicPhoto ||
      !consents.realName ||
      !consents.terms ||
      !consents.mayInterview ||
      !consents.receiveLeads
    ) {
      errors.consents = "You must agree to all 6 declaration statements before submitting.";
    }

    setFieldErrors((prev) => ({ ...prev, ...errors }));
    const errorCount = Object.keys(errors).length;
    if (errorCount > 0) {
      setStepSummaryError(`Please fix ${errorCount} ${errorCount === 1 ? "field" : "fields"} in this step before submitting.`);
      scrollToFirstError(errors);
      return false;
    }

    setStepSummaryError("");
    return true;
  };

  // Submit Application
  const handleSaveOrSubmit = async (isDraftSave = false) => {
    if (!isDraftSave) {
      const s1 = validateStep1();
      const s2 = validateStep2();
      const s3 = validateStep3();
      if (!s1 || !s2 || !s3) {
        if (!s1) setStep(1);
        else if (!s2) setStep(2);
        else if (!s3) setStep(3);
        return;
      }
    }

    setSaving(true);
    setFieldErrors({});
    setStepSummaryError("");
    setSuccessMessage("");

    try {
      // Parse years to number on submit
      const parsedYrs = parseYearsExperience(formData.draft.yearsExperience, isDraftSave);
      const payload = {
        ...formData,
        draft: {
          ...formData.draft,
          yearsExperience: parsedYrs.valid ? parsedYrs.value : (Number(formData.draft.yearsExperience) || 0),
        },
        isDraftSave,
      };

      const res = await fetch("/api/mentor/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setApplicationStatus(data.application?.status || (isDraftSave ? "draft" : "pending"));
        setSuccessMessage(
          isDraftSave
            ? "Your draft has been saved successfully."
            : "Your application has been submitted for review! OutlineDev admins will review your profile."
        );
      } else {
        if (data.field) {
          const mappedField = mapServerErrorToField(data.field);
          setFieldErrors({ [mappedField]: data.error });
          setStepSummaryError(data.error);
          scrollToFirstError({ [mappedField]: data.error });
          if (step1FieldKeys.includes(mappedField)) setStep(1);
          else if (step2FieldKeys.includes(mappedField)) setStep(2);
          else if (step3FieldKeys.includes(mappedField)) setStep(3);
        } else {
          setStepSummaryError(data.error || "Failed to submit. Please review your fields.");
        }
      }
    } catch (err) {
      setStepSummaryError("Network error. Please try again.");
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col justify-between font-sans">
        <Header />
        <main className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">Join as a Mentor or Developer</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Create ONE verified expert profile to offer 1-on-1 mentorship, take on high-paying contract work, or both.
          </p>
          <button
            onClick={() => signIn("google")}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-md shadow-emerald-600/20"
          >
            Sign in with Google to Apply
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  function setHomeLocation(id) {
    setFormData((prev) => {
      const existingSupport = (prev.draft.locationIds || []).filter(
        (x) => x !== id && x !== "online" && x !== prev.draft.locationId
      );
      const nextIds = [
        id,
        ...(offersOnline ? ["online"] : []),
        ...existingSupport,
      ].slice(0, 5);

      return {
        ...prev,
        draft: {
          ...prev.draft,
          locationId: id,
          locationIds: nextIds,
          ...(id !== "other" && prev.draft.locationId === "other" && !existingSupport.includes("other")
            ? { locationOther: { country: "", city: "" } }
            : {}),
        },
      };
    });
    setIsChangingHomeLocation(false);
    setHomeLocationSearch("");
    clearFieldError("locationIds");
    clearFieldError("locationId");
  }

  function toggleOnlineSupport() {
    const nextOffersOnline = !offersOnline;
    setOffersOnline(nextOffersOnline);
    setFormData((prev) => {
      const homeId = prev.draft.locationId;
      const supportIds = (prev.draft.locationIds || []).filter(
        (x) => x !== "online" && x !== homeId
      );
      const nextIds = [
        homeId || (nextOffersOnline ? "online" : ""),
        ...(nextOffersOnline && homeId && homeId !== "online" ? ["online"] : []),
        ...supportIds,
      ].filter(Boolean).slice(0, 5);

      return {
        ...prev,
        draft: {
          ...prev.draft,
          locationId: homeId || (nextOffersOnline ? "online" : supportIds[0] || "online"),
          locationIds: nextIds.length > 0 ? nextIds : ["online"],
        },
      };
    });
    clearFieldError("locationIds");
  }

  function addSupportLocation(id) {
    setFormData((prev) => {
      const current = prev.draft.locationIds || [];
      if (current.includes(id) || current.length >= 5) return prev;
      const next = [...current, id];
      return {
        ...prev,
        draft: {
          ...prev.draft,
          locationIds: next,
        },
      };
    });
    setSupportLocationSearch("");
    clearFieldError("locationIds");
  }

  function removeSupportLocation(id) {
    setFormData((prev) => {
      const current = prev.draft.locationIds || [];
      const next = current.filter((x) => x !== id);
      const fallback = next.length > 0 ? next : ["online"];
      return {
        ...prev,
        draft: {
          ...prev.draft,
          locationIds: fallback,
          locationId: fallback[0] || "online",
          ...(id === "other" && prev.draft.locationId !== "other"
            ? { locationOther: { country: "", city: "" } }
            : {}),
        },
      };
    });
    clearFieldError("locationIds");
  }

  function toggleOverlapZone(zone) {
    const current = formData.draft.overlapZones || [];
    const next = current.includes(zone)
      ? current.filter((z) => z !== zone)
      : [...current, zone];
    setFormData({
      ...formData,
      draft: {
        ...formData.draft,
        overlapZones: next,
      },
    });
  }

  function resolveLocationLabel(id) {
    if (id === 'online') return 'Online / Remote (Global)';
    if (id === 'other') {
      const otherStr = [formData.draft.locationOther?.city, formData.draft.locationOther?.country].filter(Boolean).join(', ');
      return otherStr ? `Other: ${otherStr}` : 'Other (Custom)';
    }
    const match = LOCATIONS.find(l => l.id === id);
    return match ? `${match.name} (${match.country})` : id;
  }

  const filteredSkills = SKILLS.filter((s) => s.name.toLowerCase().includes(skillSearch.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between font-sans" style={{ overflowAnchor: "none" }}>
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full flex-1" style={{ overflowAnchor: "none" }}>
        {/* Status Banner */}
        {applicationStatus && applicationStatus !== "draft" && (
          <div className="mb-8 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className={`text-xs uppercase tracking-wider font-extrabold px-3 py-1 rounded-full ${
                  applicationStatus === "approved"
                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                    : applicationStatus === "pending"
                    ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                    : applicationStatus === "hidden"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border border-slate-300 dark:border-slate-700"
                    : "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800"
                }`}
              >
                Status: {applicationStatus}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
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
                  className="px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition flex items-center gap-1.5"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide my profile</span>
                </button>
              )}
              {applicationStatus === "hidden" && (
                <button
                  type="button"
                  onClick={handleUnhideProfile}
                  className="px-3 py-1.5 text-xs text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-white bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-800 rounded-lg transition flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Make profile live</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleDeleteProfile}
                className="px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 border border-red-200 dark:border-red-800/40 rounded-lg transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Request deletion</span>
              </button>
            </div>
          </div>
        )}

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Join as a Mentor or Developer
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
            One public profile. Mentor aspiring developers, get hired for client projects, or both.
          </p>
        </div>

        {/* Step Indicator with Red Dot on Error */}
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
                if (s.num === 1) goToStep(1);
                if (s.num === 2 && validateStep1()) goToStep(2);
                if (s.num === 3 && validateStep1() && validateStep2()) goToStep(3);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition relative ${
                step === s.num
                  ? "bg-emerald-600 text-white border border-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30"
                  : step > s.num
                  ? "bg-slate-200 text-slate-700 border border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800"
                  : "bg-slate-100 text-slate-500 border border-slate-200 dark:bg-slate-900/40 dark:text-slate-500 dark:border-slate-800/60"
              }`}
            >
              <span className="relative flex items-center justify-center">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                    step === s.num
                      ? "bg-white text-emerald-700 dark:bg-emerald-500 dark:text-slate-950 font-bold"
                      : "bg-slate-300 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {s.num}
                </span>
                {stepHasErrors(s.num) && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950 animate-pulse" />
                )}
              </span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Step Summary Error Alert */}
        {stepSummaryError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <span>{stepSummaryError}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
            <Link
              href="/expert-dashboard"
              className="shrink-0 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Go to My Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Step 1: Authentic Identity & Core Skills</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  OutlineDev values authenticity. We require your real name, a clear professional photo, and verified skills.
                </p>
              </div>

              {/* Photo Upload */}
              <div id="field-photoUrl" data-field="photoUrl">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Real Professional Photo *
                </label>
                <div
                  className={`flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 transition ${
                    fieldErrors.photoUrl ? "border-red-500 ring-1 ring-red-500/30" : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-emerald-500/30 shrink-0">
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
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-semibold transition border border-emerald-300 dark:border-emerald-500/30">
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
                    {photoError && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{photoError}</p>}
                    {fieldErrors.photoUrl && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {fieldErrors.photoUrl}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Real Full Name */}
              <div id="field-displayName" data-field="displayName">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Real Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.displayName}
                  onChange={(e) => {
                    setFormData({ ...formData, displayName: e.target.value });
                    clearFieldError("displayName");
                  }}
                  placeholder="e.g., Alex Johnson"
                  className={`w-full px-4 py-2.5 bg-white dark:bg-slate-950 border rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none transition placeholder-slate-400 ${
                    fieldErrors.displayName
                      ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                      : "border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  }`}
                />
                {fieldErrors.displayName && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {fieldErrors.displayName}
                  </p>
                )}
              </div>

              {/* WhatsApp Number (Private) */}
              <div id="field-whatsapp" data-field="whatsapp">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  WhatsApp number (with country code) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => {
                    setFormData({ ...formData, whatsapp: e.target.value });
                    clearFieldError("whatsapp");
                  }}
                  placeholder="e.g., +91 98765 43210 or +1 415 555 2671"
                  className={`w-full px-4 py-2.5 bg-white dark:bg-slate-950 border rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none transition placeholder-slate-400 ${
                    fieldErrors.whatsapp
                      ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                      : "border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  }`}
                />
                {fieldErrors.whatsapp && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {fieldErrors.whatsapp}
                  </p>
                )}
                <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>Private. Only OutlineDev uses this to contact you about requests. It is never shown on the website.</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>OutlineDev may contact me by WhatsApp or email about requests</span>
                </p>
              </div>

              {/* Multi-Location & Service Availability Section */}
              <div id="field-locationIds" data-field="locationIds" className="space-y-6">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Location & Service Availability *
                    </label>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      {(formData.draft.locationIds || []).length} / 5 places active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Your physical home base is separated from your service delivery scope.
                  </p>
                </div>

                {/* 1. PRIMARY LOCATION (WHERE YOU LIVE) */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                          1. Primary Location (Where you stay right now) *
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Your physical home base city. Shown on your public profile and sets your primary timezone.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Current Home Base display */}
                  {formData.draft.locationId && formData.draft.locationId !== "online" && !isChangingHomeLocation ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-700/60">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white shadow-sm shrink-0">
                          Home Base
                        </span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {resolveLocationLabel(formData.draft.locationId)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsChangingHomeLocation(true)}
                        className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline px-2 py-1 rounded self-start sm:self-auto"
                      >
                        Change Home City
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 pt-1">
                      {formData.draft.locationId && formData.draft.locationId !== "online" && (
                        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                          <span>Select a new home base:</span>
                          <button
                            type="button"
                            onClick={() => setIsChangingHomeLocation(false)}
                            className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                          >
                            Keep current ({resolveLocationLabel(formData.draft.locationId)})
                          </button>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Search your city (e.g., Pune, Bangalore, London, New York)..."
                          value={homeLocationSearch}
                          onChange={(e) => setHomeLocationSearch(e.target.value)}
                          className="flex-1 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={() => setHomeLocation("other")}
                          className={`px-3 py-2 text-xs font-semibold rounded-xl border transition shrink-0 ${
                            formData.draft.locationId === "other"
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                          }`}
                        >
                          + Other City (Custom)
                        </button>
                      </div>

                      {/* Filtered Search Results */}
                      {homeLocationSearch.trim() && (
                        <div className="max-h-36 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-wrap gap-1.5 shadow-inner">
                          {LOCATIONS.filter(
                            (l) =>
                              l.id !== "online" &&
                              l.id !== "remote" &&
                              l.id !== "near-me" &&
                              (l.name.toLowerCase().includes(homeLocationSearch.toLowerCase()) ||
                                l.country.toLowerCase().includes(homeLocationSearch.toLowerCase()))
                          ).map((loc) => (
                            <button
                              key={loc.id}
                              type="button"
                              onClick={() => setHomeLocation(loc.id)}
                              className="px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white border border-slate-200 dark:border-slate-700 transition"
                            >
                              {loc.name} ({loc.country})
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Quick Tech Hub Pills */}
                      <div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1.5 font-medium">
                          Popular Tech Hubs (1-click select):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { id: "pune", label: "Pune" },
                            { id: "bangalore", label: "Bangalore" },
                            { id: "hyderabad", label: "Hyderabad" },
                            { id: "mumbai", label: "Mumbai" },
                            { id: "delhi", label: "Delhi / NCR" },
                            { id: "noida", label: "Noida" },
                            { id: "gurgaon", label: "Gurgaon" },
                            { id: "london", label: "London" },
                            { id: "new-york", label: "New York" },
                            { id: "san-francisco", label: "San Francisco" },
                            { id: "austin", label: "Austin" },
                            { id: "seattle", label: "Seattle" },
                            { id: "toronto", label: "Toronto" },
                            { id: "singapore", label: "Singapore" },
                            { id: "berlin", label: "Berlin" },
                            { id: "dubai", label: "Dubai" },
                          ].map((city) => (
                            <button
                              key={city.id}
                              type="button"
                              onClick={() => setHomeLocation(city.id)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                                formData.draft.locationId === city.id
                                  ? "bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm"
                                  : "bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                              }`}
                            >
                              {city.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Custom Location details if 'other' is chosen as home */}
                  {(formData.draft.locationId === "other" || (formData.draft.locationIds || []).includes("other")) && (
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          Custom Home City & Country
                        </span>
                        <button
                          type="button"
                          onClick={() => setHomeLocation("pune")}
                          className="text-xs text-red-600 dark:text-red-400 hover:underline"
                        >
                          Clear custom city
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Country *</label>
                          <input
                            type="text"
                            value={formData.draft.locationOther.country}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                draft: {
                                  ...prev.draft,
                                  locationOther: { ...prev.draft.locationOther, country: e.target.value },
                                },
                              }));
                              clearFieldError("locationIds");
                            }}
                            placeholder="e.g., India or Canada"
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs focus:border-emerald-500 placeholder-slate-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">City *</label>
                          <input
                            type="text"
                            value={formData.draft.locationOther.city}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                draft: {
                                  ...prev.draft,
                                  locationOther: { ...prev.draft.locationOther, city: e.target.value },
                                },
                              }));
                              clearFieldError("locationIds");
                            }}
                            placeholder="e.g., Jamnagar or Toronto"
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs focus:border-emerald-500 placeholder-slate-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. ONLINE / REMOTE WORK (DEFAULT ENABLED) */}
                <div
                  onClick={toggleOnlineSupport}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-start sm:items-center justify-between gap-4 ${
                    offersOnline
                      ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700/60 shadow-sm"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        offersOnline
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          2. Online / Remote Support (Global)
                        </span>
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                          Enabled
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        Available for 1-on-1 video calls, async code reviews, and remote contract projects worldwide.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={offersOnline}
                    onChange={() => {}}
                    className="w-4 h-4 text-emerald-600 rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 shrink-0 mt-1 sm:mt-0"
                  />
                </div>

                {/* 3. ADDITIONAL IN-PERSON SUPPORT CITIES (OPTIONAL) */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        3. In-Person / Additional Support Cities (Optional, up to 3 more)
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Other cities where you can travel or provide in-person consulting, meetings, or training.
                      </p>
                    </div>
                    <span className="text-xs text-slate-400">
                      {(formData.draft.locationIds || []).filter(
                        (id) => id !== formData.draft.locationId && id !== "online"
                      ).length} / 3 cities
                    </span>
                  </div>

                  {/* Support City Chips */}
                  <div className="flex flex-wrap gap-2">
                    {(formData.draft.locationIds || [])
                      .filter((id) => id !== formData.draft.locationId && id !== "online")
                      .map((id) => (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm"
                        >
                          <span>{resolveLocationLabel(id)}</span>
                          <button
                            type="button"
                            onClick={() => removeSupportLocation(id)}
                            className="text-slate-400 hover:text-red-500 p-0.5 rounded transition"
                            title={`Remove ${resolveLocationLabel(id)}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    {(formData.draft.locationIds || []).filter(
                      (id) => id !== formData.draft.locationId && id !== "online"
                    ).length === 0 && (
                      <span className="text-xs text-slate-400 italic">No additional in-person cities added (optional).</span>
                    )}
                  </div>

                  {/* Add Support City Search */}
                  {(formData.draft.locationIds || []).length < 5 && (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        placeholder="Search and add a support city (e.g., Mumbai, Bangalore, London)..."
                        value={supportLocationSearch}
                        onChange={(e) => setSupportLocationSearch(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                      {supportLocationSearch.trim() && (
                        <div className="max-h-32 overflow-y-auto p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-wrap gap-1.5 shadow-sm">
                          {LOCATIONS.filter(
                            (l) =>
                              l.id !== "online" &&
                              l.id !== "remote" &&
                              l.id !== "near-me" &&
                              l.id !== formData.draft.locationId &&
                              !(formData.draft.locationIds || []).includes(l.id) &&
                              (l.name.toLowerCase().includes(supportLocationSearch.toLowerCase()) ||
                                l.country.toLowerCase().includes(supportLocationSearch.toLowerCase()))
                          ).map((loc) => (
                            <button
                              key={loc.id}
                              type="button"
                              onClick={() => addSupportLocation(loc.id)}
                              className="px-2.5 py-1 rounded text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 border border-slate-200 dark:border-slate-700 transition"
                            >
                              + {loc.name} ({loc.country})
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {fieldErrors.locationIds && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {fieldErrors.locationIds}
                  </p>
                )}

                {/* Overlap Time Zones */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Time zones I can work in
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ALLOWED_OVERLAP_ZONES.map((zone) => {
                      const checked = (formData.draft.overlapZones || []).includes(zone);
                      return (
                        <button
                          key={zone}
                          type="button"
                          onClick={() => toggleOverlapZone(zone)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 ${
                            checked
                              ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 font-semibold"
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                          }`}
                        >
                          {checked && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
                          <span>{zone}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    Pick the cities or time zones where you can take students or clients. Your profile will be shown on those pages.
                  </p>
                </div>
              </div>

              {/* Experience & Languages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div id="field-yearsExperience" data-field="yearsExperience">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Years of Professional Experience *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 5"
                    value={formData.draft.yearsExperience}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/\D/g, "").slice(0, 2);
                      setFormData({
                        ...formData,
                        draft: { ...formData.draft, yearsExperience: clean },
                      });
                      clearFieldError("yearsExperience");
                    }}
                    className={`w-full px-4 py-2.5 bg-white dark:bg-slate-950 border rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none transition placeholder-slate-400 ${
                      fieldErrors.yearsExperience
                        ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                        : "border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    }`}
                  />
                  {fieldErrors.yearsExperience && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {fieldErrors.yearsExperience}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Languages Spoken (comma separated)
                  </label>
                  <input
                    type="text"
                    value={languagesInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      setLanguagesInput(val);
                      const parsed = val.split(",").map((s) => s.trim()).filter(Boolean);
                      setFormData((prev) => ({
                        ...prev,
                        draft: {
                          ...prev.draft,
                          languages: parsed.length ? parsed : ["English"],
                        },
                      }));
                    }}
                    onBlur={() => {
                      const parsed = languagesInput.split(",").map((s) => s.trim()).filter(Boolean);
                      const normalized = parsed.length ? parsed : ["English"];
                      setLanguagesInput(normalized.join(", "));
                      setFormData((prev) => ({
                        ...prev,
                        draft: {
                          ...prev.draft,
                          languages: normalized,
                        },
                      }));
                    }}
                    placeholder="English, Spanish, Hindi"
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:border-emerald-500 placeholder-slate-400"
                  />
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[11px] text-slate-500">Quick add:</span>
                    {["Hindi", "Spanish", "French", "German", "Gujarati", "Bengali", "Telugu", "Tamil", "Marathi", "Kannada", "Arabic", "Portuguese"].map((lang) => {
                      const currentList = formData.draft.languages || [];
                      const hasLang = currentList.some((l) => l.toLowerCase() === lang.toLowerCase());
                      if (hasLang) return null;
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => {
                            const next = [...currentList, lang];
                            setLanguagesInput(next.join(", "));
                            setFormData((prev) => ({
                              ...prev,
                              draft: {
                                ...prev.draft,
                                languages: next,
                              },
                            }));
                          }}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                        >
                          + {lang}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Primary Skills Selection */}
              <div id="field-skillIds" data-field="skillIds">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Primary Technical Skills * (1 to 8 skills)
                  </label>
                  <span
                    className={`text-xs ${
                      formData.draft.skillIds.length > 8 ? "text-red-400 font-bold" : "text-slate-400"
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
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white mb-3 focus:outline-none focus:border-emerald-500 placeholder-slate-400"
                />
                <div
                  className={`flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border transition ${
                    fieldErrors.skillIds ? "border-red-500 ring-1 ring-red-500/30" : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  {filteredSkills.map((s) => {
                    const isSelected = formData.draft.skillIds.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleSkill(s.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 font-semibold"
                            : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{s.name}</span>
                      </button>
                    );
                  })}
                </div>
                {fieldErrors.skillIds && (
                  <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {fieldErrors.skillIds}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep1()) goToStep(2);
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-sm flex items-center gap-2"
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
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Step 2: Role Profiles & Offerings</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Choose whether you want to act as a Mentor, a Hire developer, or both. Each role carries its own headline and summary.
                </p>
              </div>

              {/* Role Selectors */}
              <div id="field-roles" data-field="roles" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => toggleRole("mentor")}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    formData.roles.includes("mentor")
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/20"
                      : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap
                        className={`w-5 h-5 ${
                          formData.roles.includes("mentor") ? "text-emerald-400" : "text-slate-400"
                        }`}
                      />
                      <span className="font-bold text-slate-900 dark:text-white text-sm">Mentor Profile</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.roles.includes("mentor")}
                      onChange={() => {}}
                      className="w-4 h-4 text-emerald-600 rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                    />
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Host 1-on-1 coaching, conduct code reviews, mock interviews, and career mentoring.
                  </p>
                </div>

                <div
                  onClick={() => toggleRole("hire")}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    formData.roles.includes("hire")
                      ? "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-950/20"
                      : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Briefcase
                        className={`w-5 h-5 ${
                          formData.roles.includes("hire") ? "text-cyan-500 dark:text-cyan-400" : "text-slate-400"
                        }`}
                      />
                      <span className="font-bold text-slate-900 dark:text-white text-sm">Hire Developer Profile</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.roles.includes("hire")}
                      onChange={() => {}}
                      className="w-4 h-4 text-cyan-600 rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                    />
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Get booked for full-stack engineering contracts, feature delivery, and team augmentation.
                  </p>
                </div>
              </div>
              {fieldErrors.roles && (
                <p className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {fieldErrors.roles}
                </p>
              )}

              {/* MENTOR SECTION */}
              {formData.roles.includes("mentor") && (
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-emerald-300 dark:border-emerald-500/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>Mentor Profile Details</span>
                    </span>
                    <span className="text-xs text-slate-400">Headline max 70 chars • Summary 80-300 words</span>
                  </div>

                  <div id="field-mentor-headline" data-field="mentor.headline">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs text-slate-700 dark:text-slate-300 font-semibold">
                        Mentor Headline * (Plain text, no URLs)
                      </label>
                      <span
                        className={`text-[11px] ${
                          formData.draft.mentor.headline.length > 70 ? "text-red-400 font-bold" : "text-slate-500"
                        }`}
                      >
                        {formData.draft.mentor.headline.length} / 70
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={70}
                      value={formData.draft.mentor.headline}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          draft: {
                            ...formData.draft,
                            mentor: { ...formData.draft.mentor, headline: e.target.value },
                          },
                        });
                        clearFieldError("mentor.headline");
                      }}
                      placeholder="e.g., Senior Full-Stack Engineer & React Systems Coach"
                      className={`w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none transition placeholder-slate-400 ${
                        fieldErrors["mentor.headline"]
                          ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                          : "border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      }`}
                    />
                    {fieldErrors["mentor.headline"] && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {fieldErrors["mentor.headline"]}
                      </p>
                    )}
                  </div>

                  <div id="field-mentor-summary" data-field="mentor.summary">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs text-slate-700 dark:text-slate-300 font-semibold">
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
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          draft: {
                            ...formData.draft,
                            mentor: { ...formData.draft.mentor, summary: e.target.value },
                          },
                        });
                        clearFieldError("mentor.summary");
                      }}
                      placeholder="Describe your teaching approach, background, how you guide learners through complex problems, and how 1-on-1 calls are conducted..."
                      className={`w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none transition placeholder-slate-400 ${
                        fieldErrors["mentor.summary"]
                          ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                          : "border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      }`}
                    />
                    {fieldErrors["mentor.summary"] && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {fieldErrors["mentor.summary"]}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Hourly Mentorship Rate ($/hr)</label>
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
                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Mentorship Formats</label>
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
                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* HIRE DEVELOPER SECTION */}
              {formData.roles.includes("hire") && (
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-cyan-300 dark:border-cyan-500/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>Contract Developer Details</span>
                    </span>
                    <span className="text-xs text-slate-400">Headline max 70 chars • Summary 80-300 words</span>
                  </div>

                  <div id="field-hire-headline" data-field="hire.headline">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs text-slate-700 dark:text-slate-300 font-semibold">
                        Contract Developer Headline * (Plain text, no URLs)
                      </label>
                      <span
                        className={`text-[11px] ${
                          formData.draft.hire.headline.length > 70 ? "text-red-400 font-bold" : "text-slate-500"
                        }`}
                      >
                        {formData.draft.hire.headline.length} / 70
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={70}
                      value={formData.draft.hire.headline}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          draft: {
                            ...formData.draft,
                            hire: { ...formData.draft.hire, headline: e.target.value },
                          },
                        });
                        clearFieldError("hire.headline");
                      }}
                      placeholder="e.g., Staff Next.js Architect & Performance Specialist"
                      className={`w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none transition placeholder-slate-400 ${
                        fieldErrors["hire.headline"]
                          ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                          : "border-slate-700 focus:border-cyan-500"
                      }`}
                    />
                    {fieldErrors["hire.headline"] && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {fieldErrors["hire.headline"]}
                      </p>
                    )}
                  </div>

                  <div id="field-hire-summary" data-field="hire.summary">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs text-slate-700 dark:text-slate-300 font-semibold">
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
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          draft: {
                            ...formData.draft,
                            hire: { ...formData.draft.hire, summary: e.target.value },
                          },
                        });
                        clearFieldError("hire.summary");
                      }}
                      placeholder="Describe what client systems you build, performance and architecture standards, testing practices, and how you deliver software on time..."
                      className={`w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none transition placeholder-slate-400 ${
                        fieldErrors["hire.summary"]
                          ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                          : "border-slate-700 focus:border-cyan-500"
                      }`}
                    />
                    {fieldErrors["hire.summary"] && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {fieldErrors["hire.summary"]}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Contract Rate ($/hr)</label>
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
                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Availability</label>
                      <input
                        type="text"
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
                        placeholder="Part-time (15-20 hrs/week), Full-time"
                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Step 1</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep2()) goToStep(3);
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-sm flex items-center gap-2"
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
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Step 3: Proof of Work & Declarations</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Add projects you&apos;ve built, professional profiles, and mandatory platform consents.
                </p>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
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
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:border-emerald-500 placeholder-slate-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
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
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:border-emerald-500 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Key Projects */}
              <div id="field-projects" data-field="projects">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Key Projects (up to 3)
                  </label>
                  {formData.draft.projects.length < 3 && (
                    <button
                      type="button"
                      onClick={addProject}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project</span>
                    </button>
                  )}
                </div>

                {formData.draft.projects.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                    No projects added yet. Click &apos;Add Project&apos; to showcase client deliverables or open-source software.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {formData.draft.projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-400">Project #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeProject(idx)}
                            className="text-xs text-red-600 dark:text-red-400 hover:text-red-300 flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Project Title *</label>
                            <input
                              type="text"
                              required
                              value={proj.title}
                              onChange={(e) => updateProject(idx, "title", e.target.value)}
                              placeholder="e.g., Enterprise E-Commerce Platform"
                              className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs focus:border-emerald-500 placeholder-slate-400"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Project Link (Optional)</label>
                            <input
                              type="url"
                              value={proj.url}
                              onChange={(e) => updateProject(idx, "url", e.target.value)}
                              placeholder="https://..."
                              className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs focus:border-emerald-500 placeholder-slate-400"
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
                            className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs focus:border-emerald-500 placeholder-slate-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {fieldErrors.projects && (
                  <p className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {fieldErrors.projects}
                  </p>
                )}
              </div>

              {/* Mandatory Consents */}
              <div
                id="field-consents"
                data-field="consents"
                className={`p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border transition space-y-3 ${
                  fieldErrors.consents ? "border-red-500 ring-1 ring-red-500/30" : "border-slate-200 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
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
                    className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300 cursor-pointer select-none p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(formData.consents[item.key])}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          consents: { ...formData.consents, [item.key]: e.target.checked },
                        });
                        clearFieldError("consents");
                      }}
                      className="w-4 h-4 mt-0.5 rounded text-emerald-600 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:ring-emerald-500"
                    />
                    <span>{item.text}</span>
                  </label>
                ))}

                {fieldErrors.consents && (
                  <p className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {fieldErrors.consents}
                  </p>
                )}
              </div>

              {/* Mandatory Notice Before Submit */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-200 text-xs leading-relaxed">
                <p className="font-semibold mb-1">Important Notice:</p>
                <p>
                  &quot;We may contact you for a short interview before approval. Approval is not guaranteed and listing does not guarantee leads.&quot;
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Step 2</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveOrSubmit(true)}
                    className="flex-1 sm:flex-initial px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Draft</span>
                  </button>

                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveOrSubmit(false)}
                    className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 dark:shadow-emerald-500/20"
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

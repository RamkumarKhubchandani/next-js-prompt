import { safeJsonLd } from '@/app/lib/schema-helpers';
import { notFound } from "next/navigation";
import dbConnect from "@/app/lib/mongodb";
import MentorApplication from "@/app/models/MentorApplication";
import { toPublicProfile } from "@/app/lib/experts";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import {
  ShieldCheck,
  MapPin,
  Clock,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Award,
  BookOpen,
  Code2,
  Globe,
  Home,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// 30 days ISR revalidation; on-demand rendering (no generateStaticParams)
export const revalidate = 2592000;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    await dbConnect();
    const doc = await MentorApplication.findOne({
      slug,
      status: { $nin: ["hidden", "rejected"] },
      published: { $ne: null },
    }).lean();
    const profile = toPublicProfile(doc);

    if (!profile) {
      return {
        title: "Expert Not Found | OutlineDev",
        robots: { index: false, follow: false },
      };
    }

    const jobTitle =
      profile.mentor?.headline ||
      profile.hire?.headline ||
      "Verified Software Engineer & Mentor";

    const title = `${profile.displayName} - ${jobTitle} | OutlineDev`;
    const rawDesc =
      profile.mentor?.summary ||
      profile.hire?.summary ||
      `Connect with ${profile.displayName} on OutlineDev for technical mentorship, code reviews, and contract software engineering.`;
    const description = rawDesc.slice(0, 155).trim() + (rawDesc.length > 155 ? "..." : "");

    return {
      title,
      description,
      alternates: {
        canonical: `https://outlinedev.com/experts/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title,
        description,
        url: `https://outlinedev.com/experts/${slug}`,
        siteName: "OutlineDev",
        type: "profile",
        images: profile.photoUrl ? [{ url: profile.photoUrl, alt: profile.displayName }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: profile.photoUrl ? [profile.photoUrl] : [],
      },
    };
  } catch (e) {
    return {
      title: "Expert Profile | OutlineDev",
      robots: { index: false, follow: false },
    };
  }
}

export default async function ExpertProfilePage({ params }) {
  const { slug } = await params;

  await dbConnect();
  const doc = await MentorApplication.findOne({
    slug,
    status: { $nin: ["hidden", "rejected"] },
    published: { $ne: null },
  }).lean();

  if (!doc) {
    notFound();
  }

  // Read published fields through toPublicProfile() ONLY
  const profile = toPublicProfile(doc);
  if (!profile) {
    notFound();
  }

  // Construct Person JSON-LD (Strictly NO worksFor, NO Founder)
  const jobTitle =
    profile.mentor?.headline ||
    profile.hire?.headline ||
    "Verified Software Engineer";

  const sameAs = [profile.links?.github, profile.links?.linkedin].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.displayName,
    ...(profile.photoUrl && { image: profile.photoUrl }),
    jobTitle: jobTitle,
    knowsAbout: profile.skills.map((s) => s.name),
    ...(sameAs.length > 0 && { sameAs }),
  };

  const supportLocations = Array.isArray(profile.locations)
    ? profile.locations.filter(
        (l) => l.id !== profile.location?.id && l.id !== 'online' && l.name
      )
    : [];

  const hasOfflineSupport = Boolean(profile.offlineSupport || profile.mentor?.offlineSupport);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-brand-primary selection:text-slate-950 font-sans">
      {/* Inject Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <Header />

      <main className="pt-36 sm:pt-40 pb-24 max-w-6xl mx-auto px-4 sm:px-6 w-full space-y-8">
        {/* TOP BREADCRUMB & DIRECTORY NAVIGATION */}
        <div className="flex items-center justify-between text-sm sm:text-base text-slate-600 dark:text-slate-400">
          <Link
            href="/find-mentor"
            className="inline-flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Mentors & Experts</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm">
            <Link href="/" className="hover:text-slate-700 dark:hover:text-slate-300">Home</Link>
            <span>/</span>
            <Link href="/find-mentor" className="hover:text-slate-700 dark:hover:text-slate-300">Experts</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold">{profile.displayName}</span>
          </div>
        </div>

        {/* 2-COLUMN MODERN CONSULTANT LAYOUT */}
        <div className="lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDEBAR: TOP TECHNICAL SKILLS & STICKY BIO/BOOKING CARDS */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-36">
            {/* 1. TOP OF LEFT SIDEBAR: VERIFIED TECHNICAL SKILLS CARD */}
            {profile.skills?.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm dark:shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-wide flex items-center gap-2.5">
                    <Code2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Technical Skills ({profile.skills.length})</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Verified
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {profile.skills.map((s) => (
                    <span
                      key={s.id}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm sm:text-base font-bold bg-emerald-50 text-emerald-950 border border-emerald-200 dark:bg-slate-950 dark:text-emerald-300 dark:border-slate-800 shadow-2xs hover:border-emerald-400 transition"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 2. IDENTITY & BOOKING CARD */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm dark:shadow-xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Profile Photo & Availability Status */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-emerald-500/30 shadow-md shrink-0">
                  {profile.photoUrl ? (
                    <img
                      src={profile.photoUrl}
                      alt={profile.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                      <GraduationCap className="w-14 h-14" />
                    </div>
                  )}
                  {/* Status Indicator */}
                  <span className="absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-xs" title="Available this week" />
                </div>

                <div className="space-y-1.5 w-full">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Available this week</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {profile.displayName}
                  </h1>
                  <p className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                    {jobTitle}
                  </p>
                </div>

                {/* Interviewed & Verified Badge */}
                {profile.interviewedByOutlineDev && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Interviewed by OutlineDev</span>
                  </div>
                )}
              </div>

              {/* Direct Booking & Inquire Buttons */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                {profile.roles.includes("mentor") && (
                  <Link
                    href={`/mentorship?mentor=${encodeURIComponent(profile.slug)}`}
                    prefetch={false}
                    className="w-full py-4 px-5 rounded-2xl bg-brand-primary hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition hover:shadow-md"
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>Book 1:1 Mentorship (${profile.mentor?.rate || 0}/hr)</span>
                  </Link>
                )}
                {profile.roles.includes("hire") && (
                  <Link
                    href={`/services?expert=${encodeURIComponent(profile.slug)}`}
                    prefetch={false}
                    className="w-full py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 border border-slate-700 shadow-sm transition"
                  >
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    <span>Inquire to Hire (${profile.hire?.rate || 0}/hr)</span>
                  </Link>
                )}
              </div>

              {/* Location & Offline Home Support */}
              <div className="space-y-3.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                  <MapPin className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span>
                    <strong className="text-slate-900 dark:text-white font-bold">
                      {profile.location.name}{profile.location.country && profile.location.country !== 'Global' ? `, ${profile.location.country}` : ''}
                    </strong>
                    {supportLocations.length > 0 && (
                      <span className="text-slate-500 dark:text-slate-400 ml-1">
                        (Support: {supportLocations.map((l) => l.name).join(', ')})
                      </span>
                    )}
                  </span>
                </div>

                {/* Highlighted Offline / Home Support Badge */}
                {hasOfflineSupport && (
                  <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/80 flex items-start gap-3 text-sm text-emerald-950 dark:text-emerald-200">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="font-extrabold block text-emerald-950 dark:text-emerald-100 text-sm sm:text-base">
                        In-Person & Home Support Available
                      </strong>
                      <span className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-snug block mt-1">
                        Available for offline tutoring & home visits for learners nearby in {profile.location.name}.
                      </span>
                    </div>
                  </div>
                )}

                {/* Experience, Timezone, Languages */}
                <div className="grid grid-cols-1 gap-2.5 pt-1 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                  {profile.yearsExperience > 0 && (
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400 shrink-0" />
                      <span>
                        <strong className="text-slate-900 dark:text-white font-bold">{profile.yearsExperience}+ Years</strong> of Engineering Experience
                      </span>
                    </div>
                  )}
                  {profile.timezone && (
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400 shrink-0" />
                      <span>Timezone: <strong className="text-slate-900 dark:text-white font-bold">{profile.timezone}</strong></span>
                    </div>
                  )}
                  {profile.languages?.length > 0 && (
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400 shrink-0" />
                      <span>Speaks: <strong className="text-slate-900 dark:text-white font-bold">{profile.languages.join(", ")}</strong></span>
                    </div>
                  )}
                </div>

                {/* Links */}
                {(profile.links?.github || profile.links?.linkedin) && (
                  <div className="flex items-center gap-2.5 pt-2">
                    {profile.links.github && (
                      <a
                        href={profile.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {profile.links.linkedin && (
                      <a
                        href={profile.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                      >
                        <span>LinkedIn</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* OutlineDev Trust Guarantee Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>OutlineDev Verified Assurance</span>
                </div>
                <p className="leading-relaxed">
                  Direct communication, private dashboard access, and 100% money-back satisfaction guarantee.
                </p>
              </div>
            </div>
          </aside>

          {/* RIGHT MAIN CONTENT AREA */}
          <section className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* 1. MENTORSHIP & COACHING SECTION */}
            {profile.roles.includes("mentor") && profile.mentor && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl space-y-7 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        1-on-1 Mentorship & Career Guidance
                      </h2>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
                        Personalized engineering sessions with {profile.displayName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 block font-semibold">
                        Session Rate
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                        ${profile.mentor.rate}/hr
                      </span>
                    </div>
                    <Link
                      href={`/mentorship?mentor=${encodeURIComponent(profile.slug)}`}
                      prefetch={false}
                      className="px-6 py-3 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm sm:text-base transition shadow-sm hover:shadow-md"
                    >
                      Book Mentorship
                    </Link>
                  </div>
                </div>

                {/* Teaching Focus Headline */}
                {profile.mentor.headline && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60">
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-1.5">
                      Teaching Focus
                    </span>
                    <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                      {profile.mentor.headline}
                    </p>
                  </div>
                )}

                {/* Mentorship Approach & Summary - LARGE READABLE HIGH-CONTRAST FONT */}
                {profile.mentor.summary && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        Mentorship Approach & Summary
                      </h3>
                    </div>
                    <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 shadow-2xs">
                      <div className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-sans space-y-4">
                        {profile.mentor.summary}
                      </div>
                    </div>
                  </div>
                )}

                {/* Topics & Formats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                  {profile.mentor.topics?.length > 0 && (
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider block">
                        Focus Areas & Topics
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {profile.mentor.topics.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 text-sm font-semibold border border-slate-200 dark:border-slate-800 shadow-2xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.mentor.formats?.length > 0 && (
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider block">
                        Available Delivery Formats
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {profile.mentor.formats.map((f, idx) => {
                          const isHome = f.includes("In-Person") || f.includes("Home");
                          return (
                            <span
                              key={idx}
                              className={`px-3.5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${
                                isHome
                                  ? "bg-emerald-100 text-emerald-950 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 shadow-xs"
                                  : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-2xs"
                              }`}
                            >
                              {isHome && <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                              <span>{f}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Structured Course / Curriculum Details */}
                {profile.mentor.courseDetails?.title && (
                  <div className="p-6 sm:p-7 rounded-2xl bg-emerald-50/50 dark:bg-slate-950 border border-emerald-200 dark:border-emerald-500/30 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/80 dark:border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                        <span className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                          Featured Course & Curriculum
                        </span>
                      </div>
                      {profile.mentor.courseDetails.syllabusUrl && (
                        <a
                          href={profile.mentor.courseDetails.syllabusUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 font-bold transition"
                        >
                          <span>View Full Syllabus</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {profile.mentor.courseDetails.title}
                      </h3>
                      {profile.mentor.courseDetails.audience && (
                        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mt-1.5">
                          <strong className="text-slate-900 dark:text-white">Target Audience: </strong>
                          {profile.mentor.courseDetails.audience}
                        </p>
                      )}
                    </div>

                    {profile.mentor.courseDetails.curriculum && (
                      <div className="pt-1">
                        <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-2">
                          Curriculum Highlights
                        </span>
                        <div className="p-5 rounded-xl bg-white dark:bg-slate-900/80 border border-emerald-100 dark:border-slate-800 text-sm sm:text-base text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
                          {profile.mentor.courseDetails.curriculum}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 2. ENGINEERING SERVICES & CONTRACT HIRE SECTION */}
            {profile.roles.includes("hire") && profile.hire && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl space-y-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                      <Briefcase className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Hire for Engineering & Projects
                      </h2>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
                        Contract development, architecture consulting & staff augmentation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 block font-semibold">
                        Starting Rate
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-cyan-400">
                        ${profile.hire.rate}/hr
                      </span>
                    </div>
                    <Link
                      href={`/services?expert=${encodeURIComponent(profile.slug)}`}
                      prefetch={false}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-black rounded-xl text-sm sm:text-base transition shadow-sm hover:shadow-md"
                    >
                      Inquire to Hire
                    </Link>
                  </div>
                </div>

                {/* Headline */}
                {profile.hire.headline && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/60 dark:bg-cyan-950/20 border border-blue-200 dark:border-cyan-800/60">
                    <span className="text-xs sm:text-sm font-extrabold text-blue-800 dark:text-cyan-300 uppercase tracking-wider mb-1.5 block">
                      Engineering Services Focus
                    </span>
                    <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                      {profile.hire.headline}
                    </p>
                  </div>
                )}

                {/* Summary */}
                {profile.hire.summary && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        Contract Offerings & Work Style
                      </h3>
                    </div>
                    <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 shadow-2xs">
                      <div className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-sans space-y-4">
                        {profile.hire.summary}
                      </div>
                    </div>
                  </div>
                )}

                {/* Availability & Engagement Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                  {profile.hire.availability && (
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider block">
                        Current Availability
                      </span>
                      <p className="text-base font-bold text-slate-900 dark:text-white">
                        {profile.hire.availability}
                      </p>
                    </div>
                  )}

                  {profile.hire.engagementTypes?.length > 0 && (
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider block">
                        Engagement Models
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {profile.hire.engagementTypes.map((e, idx) => (
                          <span
                            key={idx}
                            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 text-sm font-semibold border border-slate-200 dark:border-slate-800 shadow-2xs"
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. SHOWCASE PROJECTS */}
            {profile.projects?.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl space-y-6">
                <div className="flex items-center gap-3.5 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      Showcase Projects
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Featured production code and technical architecture built by {profile.displayName}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {profile.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/40 transition shadow-2xs"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                            {proj.title}
                          </h3>
                          {proj.url && (
                            <a
                              href={proj.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                              title="View project link"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-emerald-700 dark:text-emerald-400 hover:underline mt-5 font-bold"
                        >
                          <span>Explore Project</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. READY TO WORK CTA BANNER */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-emerald-200 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Start collaborating</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Ready to accelerate your engineering with {profile.displayName.split(" ")[0]}?
                </h3>
                <p className="text-sm sm:text-base text-emerald-100 max-w-lg">
                  Choose 1-on-1 personalized mentorship or inquire about contract development.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
                {profile.roles.includes("mentor") && (
                  <Link
                    href={`/mentorship?mentor=${encodeURIComponent(profile.slug)}`}
                    prefetch={false}
                    className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-sm sm:text-base transition shadow-sm"
                  >
                    Book Mentorship
                  </Link>
                )}
                {profile.roles.includes("hire") && (
                  <Link
                    href={`/services?expert=${encodeURIComponent(profile.slug)}`}
                    prefetch={false}
                    className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm sm:text-base transition shadow-sm border border-emerald-400/30"
                  >
                    Inquire to Hire
                  </Link>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-brand-primary selection:text-slate-950 font-sans">
      {/* Inject Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <Header />

      <main className="pt-28 sm:pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 w-full space-y-10">
        {/* HERO / BIO CARD */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm dark:shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            {/* Profile Photo */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-emerald-500/30 shrink-0 shadow-md">
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
            </div>

            {/* Profile Header & Identity */}
            <div className="flex-1 text-center md:text-left space-y-4 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {profile.displayName}
                  </h1>
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold text-base sm:text-lg mt-1">
                    {jobTitle}
                  </p>
                </div>

                {/* Interviewed by OutlineDev Badge */}
                {profile.interviewedByOutlineDev && (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 shadow-xs shrink-0 mx-auto md:mx-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Interviewed by OutlineDev</span>
                  </div>
                )}
              </div>

              {/* Meta details: Locations, Experience, Timezone, Languages */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-4 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {profile.location.name}{profile.location.country && profile.location.country !== 'Global' ? `, ${profile.location.country}` : ''}
                    </strong>
                    {supportLocations.length > 0 && (
                      <span className="text-slate-500 dark:text-slate-400 ml-1">
                        (Support: {supportLocations.map((l) => l.name).join(', ')})
                      </span>
                    )}
                  </span>
                </div>
                {profile.yearsExperience > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {profile.yearsExperience}+ Years Experience
                    </span>
                  </div>
                )}
                {profile.timezone && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                    <span>{profile.timezone}</span>
                  </div>
                )}
                {profile.languages?.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                    <span>{profile.languages.join(", ")}</span>
                  </div>
                )}
              </div>

              {/* Offerings & Availability Badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-2">
                {profile.roles.includes("mentor") && (
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <GraduationCap className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span>Available for Mentorship (${profile.mentor?.rate || 0}/hr)</span>
                  </span>
                )}
                {profile.roles.includes("hire") && (
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-900 border border-blue-300 dark:bg-cyan-950/80 dark:text-cyan-300 dark:border-cyan-800 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <Briefcase className="w-4 h-4 text-blue-700 dark:text-cyan-400" />
                    <span>Available for Hire (${profile.hire?.rate || 0}/hr)</span>
                  </span>
                )}
                {profile.links?.github && (
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {profile.links?.linkedin && (
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Prominent Verified Technical Skills */}
              {profile.skills?.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 justify-center md:justify-start">
                    <Code2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Verified Technical Skills ({profile.skills.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {profile.skills.map((s) => (
                      <span
                        key={s.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-slate-950 dark:text-emerald-300 dark:border-slate-800 shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ROLE SECTIONS: MENTOR & HIRE */}
        <div className="space-y-8">
          {/* MENTOR SECTION */}
          {profile.roles.includes("mentor") && profile.mentor && (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      1-on-1 Mentorship & Career Guidance
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Personalized engineering sessions with {profile.displayName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">
                      Session Rate
                    </span>
                    <span className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                      ${profile.mentor.rate}/hr
                    </span>
                  </div>
                  <Link
                    href={`/mentorship?mentor=${encodeURIComponent(profile.slug)}`}
                    prefetch={false}
                    className="px-5 py-2.5 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-sm"
                  >
                    Book Mentorship
                  </Link>
                </div>
              </div>

              {/* Headline */}
              {profile.mentor.headline && (
                <div>
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Teaching Focus
                  </h3>
                  <p className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {profile.mentor.headline}
                  </p>
                </div>
              )}

              {/* Summary */}
              {profile.mentor.summary && (
                <div>
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Mentorship Summary
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {profile.mentor.summary}
                  </p>
                </div>
              )}

              {/* Topics & Formats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {profile.mentor.topics?.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5">
                      Focus Areas & Topics
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.mentor.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 text-xs border border-slate-200 dark:border-slate-800 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {profile.mentor.formats?.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5">
                      Available Formats
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.mentor.formats.map((f, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 text-xs border border-slate-200 dark:border-slate-800 font-medium"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Structured Course / Curriculum Details */}
              {profile.mentor.courseDetails?.title && (
                <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/50 dark:bg-slate-950 border border-emerald-200 dark:border-emerald-500/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/80 dark:border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                        Featured Course & Curriculum
                      </span>
                    </div>
                    {profile.mentor.courseDetails.syllabusUrl && (
                      <a
                        href={profile.mentor.courseDetails.syllabusUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 font-semibold transition"
                      >
                        <span>View Full Syllabus</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {profile.mentor.courseDetails.title}
                    </h3>
                    {profile.mentor.courseDetails.audience && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        <strong className="text-slate-800 dark:text-slate-300">Target Audience: </strong>
                        {profile.mentor.courseDetails.audience}
                      </p>
                    )}
                  </div>

                  {profile.mentor.courseDetails.curriculum && (
                    <div className="pt-1">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                        Curriculum Highlights
                      </span>
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-emerald-100 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">
                        {profile.mentor.courseDetails.curriculum}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* HIRE SECTION */}
          {profile.roles.includes("hire") && profile.hire && (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Hire for Engineering & Projects
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Contract development, architecture consulting & staff augmentation
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">
                      Starting Rate
                    </span>
                    <span className="text-xl font-bold text-blue-700 dark:text-cyan-400">
                      ${profile.hire.rate}/hr
                    </span>
                  </div>
                  <Link
                    href={`/services?expert=${encodeURIComponent(profile.slug)}`}
                    prefetch={false}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold rounded-xl text-xs transition shadow-sm"
                  >
                    Inquire to Hire
                  </Link>
                </div>
              </div>

              {/* Headline */}
              {profile.hire.headline && (
                <div>
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Engineering Services
                  </h3>
                  <p className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {profile.hire.headline}
                  </p>
                </div>
              )}

              {/* Summary */}
              {profile.hire.summary && (
                <div>
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Contract Offerings & Work Style
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {profile.hire.summary}
                  </p>
                </div>
              )}

              {/* Availability & Engagement Types */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {profile.hire.availability && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                      Current Availability
                    </span>
                    <p className="text-xs text-slate-900 dark:text-white font-semibold">
                      {profile.hire.availability}
                    </p>
                  </div>
                )}

                {profile.hire.engagementTypes?.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5">
                      Engagement Models
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.hire.engagementTypes.map((e, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 text-xs border border-slate-200 dark:border-slate-800 font-medium"
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* SHOWCASE PROJECTS SECTION */}
        {profile.projects?.length > 0 && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Showcase Projects
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Featured production code and technical architecture built by {profile.displayName}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profile.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/40 transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
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
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline mt-4 font-semibold"
                    >
                      <span>Explore Project</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

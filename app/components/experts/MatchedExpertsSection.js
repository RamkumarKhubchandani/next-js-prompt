import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { getExpertsFor } from '@/app/lib/experts';

export default async function MatchedExpertsSection({
  skillId,
  locationId,
  intent = 'mentor',
  title,
  subtitle,
}) {
  // Flag check: if disabled, return null immediately so HTML is 100% unchanged
  const isEnabled =
    process.env.EXPERTS_MATCHING_ENABLED === 'true' ||
    process.env.EXPERTS_MATCHING_ENABLED === '1';

  if (!isEnabled) {
    return null;
  }

  const experts = await getExpertsFor({ skillId, locationId, intent });
  if (!experts || experts.length === 0) {
    return null;
  }

  const sectionTitle =
    title ||
    (intent === 'mentor'
      ? 'Verified 1-on-1 Mentors & Tech Advisors'
      : 'Available Freelance Engineers & Consultants');

  const sectionSubtitle =
    subtitle ||
    (intent === 'mentor'
      ? 'Connect directly with experienced engineer mentors for personalized 1:1 sessions.'
      : 'Hire experienced contract specialists ready to collaborate on your technical roadmap.');

  const gridLayoutClass =
    experts.length === 1
      ? 'max-w-md mx-auto grid grid-cols-1 gap-6'
      : experts.length === 2
      ? 'max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8';

  return (
    <section className="py-16 sm:py-20 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block py-1 px-3.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-bold text-xs uppercase tracking-wider mb-3">
            {intent === 'mentor' ? 'Verified Mentors' : 'Freelance Specialists'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2.5 max-w-2xl mx-auto leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* Dynamic 3-Column Responsive Grid (Centered for 1, 2, or 3+ profiles) */}
        <div className={gridLayoutClass}>
          {experts.map((expert) => {
            const roleData = intent === 'mentor' ? expert.mentor : expert.hire;
            const headline =
              roleData?.headline ||
              (intent === 'mentor' ? expert.mentor?.headline : expert.hire?.headline) ||
              '';
            const summary =
              roleData?.summary ||
              (intent === 'mentor' ? expert.mentor?.summary : expert.hire?.summary) ||
              '';
            const rate = roleData?.rate || expert.mentor?.rate || expert.hire?.rate || 30;

            return (
              <div
                key={expert.slug}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group"
              >
                {/* Subtle Decorative Ambient Glow on Hover */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all duration-300 pointer-events-none" />

                <div className="relative z-10">
                  {/* Header: Photo, Name, Interviewed, Location, Rate Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-100 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-xs">
                        {expert.photoUrl ? (
                          <img
                            src={expert.photoUrl}
                            alt={expert.displayName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-extrabold text-xl flex items-center justify-center shadow-xs">
                            {expert.displayName?.charAt(0) || 'D'}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {expert.displayName}
                          </h3>
                          {expert.interviewedByOutlineDev && (
                            <span
                              title="Interviewed by OutlineDev"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-2xs"
                            >
                              <ShieldCheck size={11} className="text-emerald-600 dark:text-emerald-400" />
                              <span>Interviewed</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <MapPin size={12} className="shrink-0 text-slate-400 dark:text-slate-500" />
                          <span className="truncate">
                            {expert.location?.name || 'Online'}
                            {expert.location?.country && expert.location.country !== 'Global'
                              ? `, ${expert.location.country}`
                              : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 bg-emerald-50/80 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200/80 dark:border-emerald-800/50 shadow-2xs">
                      <span className="text-[10px] uppercase font-bold text-emerald-800/70 dark:text-emerald-400/80 block leading-tight">
                        {intent === 'mentor' ? 'Session' : 'Starting'}
                      </span>
                      <span className="text-base font-black text-emerald-700 dark:text-emerald-300">
                        ${rate}/hr
                      </span>
                    </div>
                  </div>

                  {/* Role-specific Headline */}
                  {headline && (
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-4 mb-2 line-clamp-2 leading-snug">
                      {headline}
                    </p>
                  )}

                  {/* Role-specific Summary */}
                  {summary && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                      {summary}
                    </p>
                  )}

                  {/* Skill Chips */}
                  {Array.isArray(expert.skills) && expert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6 pt-1">
                      {expert.skills.slice(0, 6).map((sk) => (
                        <span
                          key={sk.id}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 group-hover:border-emerald-500/30 transition-colors"
                        >
                          {sk.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Action CTA Button */}
                <div className="relative z-10 pt-2">
                  <Link
                    href={`/experts/${expert.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    prefetch={false}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold bg-slate-900 text-white hover:bg-emerald-600 dark:bg-slate-800 dark:text-white dark:hover:bg-emerald-500 dark:hover:text-slate-950 transition-all duration-200 shadow-xs group-hover:shadow-md"
                  >
                    <span>View Full Profile</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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

  return (
    <section className="py-10 border-b border-slate-200 dark:border-slate-800">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {sectionTitle}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-primary/50 dark:hover:border-brand-primary/50 transition-all shadow-sm hover:shadow-md group"
            >
              <div>
                {/* Header: Photo, Name, Interviewed, Location, Rate */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-xs">
                      {expert.photoUrl ? (
                        <img
                          src={expert.photoUrl}
                          alt={expert.displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-slate-500">
                          {expert.displayName?.charAt(0) || 'D'}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                          {expert.displayName}
                        </h3>
                        {expert.interviewedByOutlineDev && (
                          <span
                            title="Interviewed by OutlineDev"
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                          >
                            <ShieldCheck size={11} /> Interviewed
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <MapPin size={12} className="shrink-0" />
                        <span className="truncate">
                          {expert.location?.name || 'Online'}
                          {expert.location?.country && expert.location.country !== 'Global'
                            ? `, ${expert.location.country}`
                            : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block leading-tight">
                      {intent === 'mentor' ? 'Session' : 'Starting'}
                    </span>
                    <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                      ${rate}/hr
                    </span>
                  </div>
                </div>

                {/* Role-specific Headline */}
                {headline && (
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2 line-clamp-2 leading-snug">
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
                  <div className="flex flex-wrap gap-1.5 mb-5 pt-1">
                    {expert.skills.slice(0, 6).map((sk) => (
                      <span
                        key={sk.id}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/70 dark:border-slate-700/70"
                      >
                        {sk.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Link */}
              <Link
                href={`/experts/${expert.slug}`}
                prefetch={false}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-brand-primary text-slate-900 hover:text-slate-950 dark:bg-slate-800 dark:hover:bg-brand-primary dark:text-slate-200 dark:hover:text-slate-950 transition-colors shadow-2xs"
              >
                <span>View Full Profile</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

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
      ? 'Connect directly with vetted senior engineers for personalized 1:1 sessions.'
      : 'Hire experienced contract specialists ready to collaborate on your technical roadmap.');

  return (
    <section className="py-12 border-b border-slate-200 dark:border-slate-800">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {sectionTitle}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-primary/50 dark:hover:border-brand-primary/50 transition-all shadow-sm group"
            >
              <div>
                {/* Header: Photo, Name, Badge */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
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

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white truncate">
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

                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {expert.location?.name || 'Online'}
                        {expert.location?.country && expert.location.country !== 'Global'
                          ? `, ${expert.location.country}`
                          : ''}
                      </span>
                      <span>•</span>
                      <span>Starting ${rate}/hr</span>
                    </div>
                  </div>
                </div>

                {/* Role-specific Headline */}
                {headline && (
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 line-clamp-2">
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
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {expert.skills.slice(0, 4).map((sk) => (
                      <span
                        key={sk.id}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
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
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-brand-primary text-slate-900 hover:text-white dark:bg-slate-800 dark:hover:bg-brand-primary dark:text-slate-200 dark:hover:text-white transition-colors"
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

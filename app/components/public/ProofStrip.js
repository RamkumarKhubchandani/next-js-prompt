import React from 'react';
import Link from 'next/link';
import GoogleRatingLine from './GoogleRatingLine';
import YouTubeFacade from './YouTubeFacade';
import { REAL_REVIEWS } from '@/app/lib/reviews';
import { VIDEOS } from '@/app/lib/videos';

export function getProofReviews(skillId) {
  let normalized = (skillId || '').toLowerCase().trim();
  if (normalized === 'node') normalized = 'nodejs';
  if (normalized === 'vuejs') normalized = 'vue';
  const matched = [];

  if (normalized) {
    for (const r of REAL_REVIEWS) {
      if (Array.isArray(r.skills)) {
        const hasSkill = r.skills.some((s) => {
          const ns = s.toLowerCase();
          return ns === normalized ||
            (normalized === 'nodejs' && ns === 'node') ||
            (normalized === 'node' && ns === 'nodejs') ||
            (normalized === 'vue' && ns === 'vuejs') ||
            (normalized === 'vuejs' && ns === 'vue');
        });
        if (hasSkill) matched.push(r);
      }
    }
  }

  const result = [...matched];
  for (const r of REAL_REVIEWS) {
    if (result.length >= 2) break;
    if (!result.includes(r)) {
      result.push(r);
    }
  }

  return result.slice(0, 2);
}

export function getProofVideo(skillId) {
  const normalized = (skillId || '').toLowerCase().trim();
  if (!normalized) return null;
  return VIDEOS.find((v) => Array.isArray(v.skills) && v.skills.some((s) => s.toLowerCase() === normalized)) || null;
}

export default function ProofStrip({ skillId, className = '' }) {
  const reviews = getProofReviews(skillId);
  const video = getProofVideo(skillId);

  return (
    <section aria-label="Social proof and verified student reviews" className={`my-8 p-6 sm:p-8 rounded-3xl bg-slate-100/80 dark:bg-dark-850/80 border border-slate-200 dark:border-dark-700 shadow-sm ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-dark-700">
        <GoogleRatingLine />
        <Link
          href="/reviews"
          prefetch={false}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
        >
          <span>See all reviews</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200/80 dark:border-dark-700/80 flex flex-col justify-between"
          >
            <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
              {"★".repeat(rev.stars || 5)}
              <span className="text-[11px] font-medium text-slate-400 ml-1.5">Google Review</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic line-clamp-3 mb-4">
              "{rev.text}"
            </p>
            <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100 dark:border-dark-800">
              <img
                src={rev.img}
                alt={rev.name}
                loading="lazy"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full bg-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{rev.name}</p>
                {rev.role && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{rev.role}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {video && (
        <div className="mt-6 max-w-md mx-auto">
          <YouTubeFacade id={video.id} title={video.title} />
          {video.transcriptExcerpt && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic text-center">
              "{video.transcriptExcerpt}"
            </p>
          )}
        </div>
      )}
    </section>
  );
}

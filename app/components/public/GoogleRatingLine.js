import React from 'react';
import { GOOGLE_RATING, formatAsOfDate } from '@/app/lib/reviews';

// Visible Google rating line. Update value/count/asOf in app/lib/reviews.js whenever the Google profile changes.
export default function GoogleRatingLine({ className = '' }) {
  const asOfText = formatAsOfDate(GOOGLE_RATING.asOf);

  return (
    <div className={`inline-flex flex-wrap items-center gap-2 text-sm ${className}`}>
      <span className="flex items-center text-amber-500 font-bold tracking-wide" aria-label={`${GOOGLE_RATING.value} out of 5 stars`}>
        {"★".repeat(5)}
      </span>
      <a
        href={GOOGLE_RATING.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-slate-900 dark:text-white hover:text-brand-primary underline decoration-slate-300 dark:decoration-slate-700 underline-offset-4 transition-colors"
      >
        Rated {GOOGLE_RATING.value} on Google ({GOOGLE_RATING.count} reviews)
      </a>
      {asOfText && (
        <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
          (as of {asOfText})
        </span>
      )}
    </div>
  );
}

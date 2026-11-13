import React from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import GoogleRatingLine from '../components/public/GoogleRatingLine';
import YouTubeFacade from '../components/public/YouTubeFacade';
import { REAL_REVIEWS, GOOGLE_RATING } from '../lib/reviews';
import { VIDEOS } from '../lib/videos';
import { ArrowRight, ExternalLink, ShieldCheck, Video } from 'lucide-react';

export const metadata = {
  title: 'Reviews from Students & Clients | OutlineDev',
  description: 'Read authentic student reviews, client testimonials, and video feedback for OutlineDev 1-on-1 coding mentorship and freelance software development.',
  alternates: {
    canonical: 'https://www.outlinedev.com/reviews',
  },
  openGraph: {
    title: 'Reviews from Students & Clients | OutlineDev',
    description: 'Read authentic student reviews, client testimonials, and video feedback for OutlineDev 1-on-1 coding mentorship and freelance software development.',
    url: 'https://www.outlinedev.com/reviews',
    type: 'website',
  },
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-brand-primary/30 transition-colors duration-500">
      <Header />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header / Hero */}
        <header className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} />
            Verified Feedback
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
            Reviews from students and clients
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Real feedback from software engineers, career switchers, and clients who took 1-on-1 mentorship sessions or hired us for custom software development.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 rounded-2xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 shadow-sm max-w-xl mx-auto">
            <GoogleRatingLine />
            <a
              href={GOOGLE_RATING.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:underline shrink-0"
            >
              <span>See all reviews on Google</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </header>

        {/* Video Feedback Facades */}
        {VIDEOS.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-2 mb-6">
              <Video className="text-brand-primary" size={20} />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Video Feedback
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VIDEOS.map((vid) => (
                <div key={vid.id} className="flex flex-col">
                  <YouTubeFacade id={vid.id} title={vid.title} />
                  {vid.transcriptExcerpt && (
                    <blockquote className="mt-3 text-xs text-slate-600 dark:text-slate-400 italic bg-white dark:bg-dark-800 p-3 rounded-xl border border-slate-200 dark:border-dark-700">
                      "{vid.transcriptExcerpt}"
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Text Reviews Grid */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Written Reviews ({REAL_REVIEWS.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REAL_REVIEWS.map((rev, idx) => (
              <article
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 flex flex-col justify-between shadow-sm hover:border-brand-primary/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex text-amber-400 text-sm tracking-widest" aria-label={`${rev.stars || 5} stars`}>
                      {"★".repeat(rev.stars || 5)}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Google Review
                    </span>
                  </div>
                  <blockquote className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                    "{rev.text}"
                  </blockquote>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-dark-700">
                  <img
                    src={rev.img}
                    alt={rev.name}
                    loading="lazy"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full bg-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{rev.name}</p>
                    {rev.role && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{rev.role}</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Disclaimer Note */}
        <section className="mb-20 p-6 rounded-2xl bg-slate-100 dark:bg-dark-850 border border-slate-200 dark:border-dark-700 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>Honest Disclosure:</strong> Reviews are copied word for word from our Google Business profile. Individual outcomes depend on prior experience, effort, and project requirements; reviews represent the reviewers' own individual experiences and do not guarantee the same results.
          </p>
        </section>

        {/* Call To Action */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-dark-850 to-slate-950 text-white border border-slate-800 text-center max-w-4xl mx-auto shadow-2xl">
          <h2 className="text-3xl font-black mb-4">
            Ready to Accelerate Your Career or Build Your Next Product?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Get personalized 1-on-1 coaching on modern full-stack engineering, or hire Ramkumar Khubchandani for dedicated contract development.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/mentorship"
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-brand-primary hover:bg-emerald-400 transition-colors inline-flex items-center gap-2"
            >
              <span>Explore 1-on-1 Mentorship</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/hire/full-stack-developer"
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors inline-flex items-center gap-2"
            >
              <span>Hire Full Stack Developer</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

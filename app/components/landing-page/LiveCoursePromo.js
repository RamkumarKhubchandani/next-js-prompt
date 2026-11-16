"use client";
import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { COURSE_INDIA } from '@/app/lib/course-india';

export function LiveCoursePromo() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 border border-indigo-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Live Cohort (India)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {COURSE_INDIA.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
            {COURSE_INDIA.sessions} ({COURSE_INDIA.hours} hours) taught directly by Principal Engineer Ramkumar Khubchandani.
            Zero slide decks: build 3 production-grade portfolio apps, review code on GitHub pull requests, and master modern JavaScript, Node.js, Express, and React.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800/60 backdrop-blur rounded-xl p-4 border border-slate-700/60">
              <div className="text-2xl font-black text-indigo-400">{COURSE_INDIA.hours}h</div>
              <div className="text-xs text-slate-400 mt-1">{COURSE_INDIA.sessions}</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur rounded-xl p-4 border border-slate-700/60">
              <div className="text-2xl font-black text-emerald-400">3 Apps</div>
              <div className="text-xs text-slate-400 mt-1">Real Portfolio</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur rounded-xl p-4 border border-slate-700/60">
              <div className="text-2xl font-black text-amber-400">GitHub</div>
              <div className="text-xs text-slate-400 mt-1">PR Code Reviews</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur rounded-xl p-4 border border-slate-700/60">
              <div className="text-2xl font-black text-white">₹{COURSE_INDIA.fee.toLocaleString('en-IN')}</div>
              <div className="text-xs text-slate-400 mt-1">{COURSE_INDIA.feeNote}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/${COURSE_INDIA.slug}`}
              prefetch={false}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:translate-y-[-1px]"
            >
              <span>Explore Syllabus & Batches</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-xs text-slate-400">
              Free 15-minute intro call before any payment.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

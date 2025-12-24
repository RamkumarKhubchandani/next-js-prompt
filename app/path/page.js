"use client";

import Link from "next/link";
import { useMemo } from "react";
import { COURSES } from "../lib/courses/index";
import { ArrowRight, BookOpen } from "lucide-react";

export default function PathIndexPage() {
  const courseList = useMemo(() => {
    const vals = Object.values(COURSES || {});
    // stable ordering: keep react/javascript/html/css near top if present
    const preferred = ["react", "javascript", "html", "css", "fullstack", "angular"];
    vals.sort((a, b) => {
      const ai = preferred.indexOf(String(a.id));
      const bi = preferred.indexOf(String(b.id));
      const ax = ai === -1 ? 999 : ai;
      const bx = bi === -1 ? 999 : bi;
      if (ax !== bx) return ax - bx;
      return String(a.title || a.id).localeCompare(String(b.title || b.id));
    });
    return vals;
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-widest uppercase">
            <BookOpen size={14} />
            Learning Paths
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Choose a course and learn day-by-day
          </h1>
          <p className="mt-4 text-lg text-dark-900/70 dark:text-light-200 max-w-3xl">
            Pick your track. Each course is structured into daily lessons with checkpoints, guided labs, and an AI tutor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((c) => (
            <Link
              key={c.id}
              href={`/path/${c.id}`}
              className="group relative overflow-hidden rounded-2xl border border-dark-700/10 dark:border-dark-700 bg-white/70 dark:bg-dark-800 p-6 backdrop-blur-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-brand-primary/10 via-transparent to-purple-500/10" />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold text-dark-900 dark:text-white">
                    {c.title || c.id}
                  </h2>
                  <span className="inline-flex items-center gap-1 text-brand-primary font-bold text-sm">
                    Start <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
                {c.description && (
                  <p className="mt-3 text-sm leading-relaxed text-dark-900/70 dark:text-light-300">
                    {c.description}
                  </p>
                )}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-dark-900/50 dark:text-light-400">
                    {Array.isArray(c.days) ? `${c.days.length} days` : "Day-by-day"}
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-dark-900/50 dark:text-light-400">
                    /path/{c.id}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bug, ArrowRight, Zap, Lock } from "lucide-react";

export function DailyChallenges() {
  const [loading, setLoading] = useState(true);
  const [dateKey, setDateKey] = useState("");
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/challenges/featured")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setDateKey(data?.dateKey || "");
        setFeatured(Array.isArray(data?.featured) ? data.featured : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-900 dark:text-white">
              Today’s Bug Squash Challenges
            </h2>
            <p className="mt-2 text-sm sm:text-base text-dark-900/60 dark:text-light-100/70 max-w-2xl">
              Fresh every day (JavaScript, React, TypeScript). Fix real bugs, earn XP, and level up like an engineer.
              {dateKey ? ` • ${dateKey}` : ""}
            </p>
          </div>

          <Link
            href="/challenges"
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 bg-dark-900 text-white dark:bg-white dark:text-dark-900 font-extrabold hover:opacity-90 transition-opacity"
          >
            Explore Arena <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-dark-700/10 dark:border-dark-700 bg-white/60 dark:bg-dark-800/40 p-10 text-center text-dark-900/60 dark:text-light-100/70">
            Loading today’s challenges…
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((challenge, index) => (
              <motion.div
                key={challenge.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="group rounded-3xl overflow-hidden border border-dark-700/10 dark:border-dark-700 bg-white/70 dark:bg-dark-800/60 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-2 rounded-xl ${
                        challenge.difficulty === "Easy"
                          ? "bg-green-500/15 text-green-600 dark:text-green-400"
                          : challenge.difficulty === "Medium"
                            ? "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"
                            : "bg-red-500/15 text-red-700 dark:text-red-400"
                      }`}
                    >
                      <Bug size={20} />
                    </div>
                    <div className="text-xs font-mono text-dark-900/40 dark:text-light-100/40">
                      #{challenge.dayNumber ?? index + 1}
                    </div>
                  </div>

                  <h3 className="text-lg font-extrabold text-dark-900 dark:text-white group-hover:text-brand-primary transition-colors">
                    {challenge.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-xs px-2 py-1 rounded-full border border-dark-700/10 dark:border-dark-700 bg-light-100 dark:bg-dark-900 text-dark-900/70 dark:text-light-100/70">
                      {challenge.category}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${
                        challenge.difficulty === "Easy"
                          ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300"
                          : challenge.difficulty === "Medium"
                            ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-800 dark:text-yellow-300"
                            : "bg-red-500/10 border-red-500/20 text-red-800 dark:text-red-300"
                      }`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm font-extrabold text-yellow-600 dark:text-yellow-400">
                      <Zap size={14} fill="currentColor" />
                      <span>+{challenge.xpReward ?? 50} XP</span>
                    </div>
                    <Link
                      href={`/challenges/${challenge.slug}`}
                      className="text-sm font-extrabold text-dark-900 dark:text-white inline-flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Start <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Pro teaser */}
            <div className="rounded-3xl border border-dark-700/10 dark:border-dark-700 bg-gradient-to-br from-brand-primary/10 via-transparent to-purple-500/10 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-extrabold text-dark-900 dark:text-white">
                  <Lock size={16} />
                  Pro Unlock
                </div>
                <h3 className="mt-3 text-xl font-extrabold text-dark-900 dark:text-white">
                  Get the full Bug Squash Arena
                </h3>
                <p className="mt-2 text-sm text-dark-900/60 dark:text-light-100/70">
                  Pro members can access the full library of challenges, not just today’s picks.
                </p>
              </div>
              <Link
                href="/pricing"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-primary px-5 py-2.5 font-extrabold text-dark-900 hover:opacity-90 transition-opacity"
              >
                Go Pro
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}



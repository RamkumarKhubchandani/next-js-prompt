"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bug, ArrowRight, Zap, Trophy, Timer, Swords } from "lucide-react";
import { cn } from "../../lib/utils";

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
    <section className="py-24 px-6 lg:px-8 bg-white dark:bg-[#050505] relative overflow-hidden">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 dark:bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Swords className="text-brand-primary animate-pulse" />
              <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">Daily Global Arena</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Code. Compete. Conquer.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Fresh combat scenarios dropped every 24 hours. Fix real-world bugs in React, Node, and Rust.
              Earn XP, climb the global leaderboard, and prove your engineering mettle.
              {dateKey && <span className="block mt-2 text-brand-primary font-mono text-sm border border-brand-primary/20 bg-brand-primary/5 px-2 py-1 rounded w-fit">Combat Date: {dateKey}</span>}
            </p>
          </div>

          <Link
            href="/challenges"
            className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-gray-900 text-white dark:bg-white dark:text-black font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-xl"
          >
            Enter the Arena <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 rounded-3xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((challenge, index) => (
              <motion.div
                key={challenge.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0A0A0C] hover:border-brand-primary/50 hover:shadow-xl transition-all duration-300"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-8 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn(
                      "p-3 rounded-2xl flex items-center justify-center",
                      challenge.difficulty === "Easy" ? "bg-green-500/10 text-green-600 dark:text-green-400" :
                        challenge.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" : "bg-red-500/10 text-red-600 dark:text-red-400"
                    )}>
                      <Bug size={24} />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-mono text-gray-500 bg-white dark:bg-white/5 px-2 py-1 rounded border border-gray-200 dark:border-white/5">
                      <Timer size={12} />
                      <span>{challenge.dayNumber ? `Day ${challenge.dayNumber}` : 'Daily'}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {challenge.title}
                  </h3>

                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-6 font-mono">
                    <span>{challenge.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600" />
                    <span className={cn(
                      challenge.difficulty === "Easy" ? "text-green-600 dark:text-green-400" :
                        challenge.difficulty === "Medium" ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"
                    )}>{challenge.difficulty}</span>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-yellow-600 dark:text-yellow-400">
                      <Zap size={16} fill="currentColor" />
                      <span>+{challenge.xpReward ?? 50} XP</span>
                    </div>
                    <Link
                      href={`/challenges/${challenge.slug}`}
                      className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 group/link"
                    >
                      Start Challenge <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform text-brand-primary" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Pro Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A0A0C] to-gray-900 border border-white/10 p-8 flex flex-col justify-between group md:col-span-1 lg:col-span-1">
              <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay" />
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <Trophy size={100} className="text-white rotate-12" />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30 mb-6">
                  <Trophy size={12} /> PRO ACCESS
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Unlock the Archive</h3>
                <p className="text-gray-400 text-sm">
                  Missed a battle? Access the full history of 500+ daily combat scenarios and sharpen your skills at your own pace.
                </p>
              </div>

              <Link href="/pricing" className="relative z-10 mt-6 w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                Get Unlimited Access
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

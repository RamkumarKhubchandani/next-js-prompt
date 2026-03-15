'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight, Map, Crown, Zap, Bug, Lock } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export default function DailyFocus({
    session,
    stats,
    isPro,
    isTrial,
    trialDaysLeft,
    handleChangeMajor,
    progressData,
    hasActivePath = true,
    learningPath = 'react',
    PATH_NAMES = {
        react: 'React Mastery',
        fullstack: 'Fullstack Zero to Hero',
        javascript: 'Advanced JavaScript',
        angular: 'Angular 21 Mastery',
        html: 'Semantic HTML Pro',
        css: 'Modern CSS Systems',
        typescript: 'TypeScript Mastery',
        zustand: 'Zustand State',
        redux: 'Redux Toolkit'
    }
}) {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Left: Daily Bug Challenge */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1 h-full"
            >
                <SpotlightCard className="h-full p-8 flex flex-col justify-between relative overflow-hidden" spotlightColor="rgba(239, 68, 68, 0.15)">

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
                                <Bug size={12} /> Daily Bug
                            </div>
                            <span className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-dark-700 px-2 py-0.5 rounded">
                                #302
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Infinite Loop in UseEffect
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                            A classic React mistake is causing this component to re-render 10,000 times per second. Can you spot the dependency array issue?
                        </p>
                    </div>

                    <div className="mt-auto">
                        <Link href="/daily-bug">
                            <button className="w-full py-3 bg-white dark:bg-dark-700 text-gray-900 dark:text-white font-bold rounded-xl border border-gray-200 dark:border-dark-600 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                                <Zap className="text-yellow-500" size={16} fill="currentColor" />
                                Fix & Earn 50 XP
                            </button>
                        </Link>
                        <p className="text-xs text-center text-gray-400 mt-3">
                            Streak Risk: High 🔥
                        </p>
                    </div>
                </SpotlightCard>
            </motion.div>

            {/* Right: Active Path / CTA (2 columns) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 h-full"
            >
                <SpotlightCard className="h-full shadow-xl relative overflow-hidden" spotlightColor="rgba(0, 245, 160, 0.15)">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-primary/10 blur-3xl rounded-full pointer-events-none" />

                    <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                        {hasActivePath ? (
                            <>
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider">
                                            <Map size={12} /> Active Major
                                        </div>
                                        <button
                                            onClick={handleChangeMajor}
                                            className="text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs font-medium transition-colors"
                                        >
                                            Switch
                                        </button>
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {PATH_NAMES[learningPath] || 'Your Learning Path'}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg">
                                        Continue where you left off. Complete today's lesson to keep your streak alive and earn <strong>+150 XP</strong>.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 mt-auto">
                                    {/* New function to calculate resume link */}
                                    {(() => {
                                        const getResumeLink = () => {
                                            // Auto-calculate next day
                                            if (!progressData || !progressData.completedTutorials) return `/path/${learningPath}`;

                                            // Filter completed for this path
                                            // Formats: 'react-day-1', 'typescript-day-5'
                                            const prefix = `${learningPath}-day-`;
                                            const completedIndices = progressData.completedTutorials
                                                .filter(id => id.startsWith(prefix))
                                                .map(id => parseInt(id.replace(prefix, ''), 10))
                                                .filter(n => !isNaN(n))
                                                .sort((a, b) => a - b);

                                            // If no completed, start at 1
                                            if (completedIndices.length === 0) return `/path/${learningPath}?day=1`;

                                            // Find first gap or next day
                                            // If [1, 2, 3] -> 4. If [1, 3] -> 2.
                                            let nextDay = 1;
                                            for (const day of completedIndices) {
                                                if (day === nextDay) {
                                                    nextDay++;
                                                } else if (day > nextDay) {
                                                    // Gap found (e.g. completed 1, 3... so 2 is missing)
                                                    break;
                                                }
                                            }
                                            return `/path/${learningPath}?day=${nextDay}`;
                                        };
                                        const resumeHref = getResumeLink();
                                        return (
                                            <Link href={resumeHref}>
                                                <button className="px-6 py-3 bg-brand-primary text-dark-900 font-bold rounded-xl shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                                                    Resume Lesson <ArrowRight size={18} />
                                                </button>
                                            </Link>
                                        );
                                    })()}
                                    <div className="text-sm text-gray-500 font-medium">
                                        Day 1 Progress: <span className="text-brand-primary">0%</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
                                        <Sparkles size={12} /> Start Your Journey
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        Select Your Major
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg">
                                        Choose a specialized track to get a structured day-by-day learning plan, tailored projects, and certification.
                                    </p>
                                </div>
                                <div className="mt-auto">
                                    <div className="text-sm text-gray-500 italic flex items-center gap-2">
                                        <ArrowRight className="animate-bounce-x" size={16} />
                                        Browse available majors below
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </SpotlightCard>
            </motion.div>
        </section>
    );
}

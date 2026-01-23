"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, ArrowRight, TrendingUp, Award, Lock } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function CareerGoalPromo() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleCtaClick = () => {
        if (session) {
            router.push('/goals');
        } else {
            router.push('/login?callbackUrl=/goals');
        }
    };

    return (
        <section id="career-goals" className="py-24 relative overflow-hidden bg-white dark:bg-[#050505]">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-[#111] dark:to-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">

                    {/* Decorative Grid */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />

                    {/* Glowing Accents */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-500/30 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                                <Target size={14} /> New Feature
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-gray-900 dark:text-white">
                                Don't Just Dream.<br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                    Architect Your Career.
                                </span>
                            </h2>

                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-xl">
                                Setting clear, actionable goals is the #1 predictor of career success.
                                Our new <strong className="text-gray-900 dark:text-white">AI-Powered Career Compass</strong> helps you define your path, track milestones, and get personalized course recommendations to reach the next level.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {[
                                    { icon: TrendingUp, text: 'Track Progress with Monthly & Yearly Goals' },
                                    { icon: Target, text: 'Get AI-Suggested Sub-tasks & Milestones' },
                                    { icon: Award, text: 'Unlock Curated Learning Paths' }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-gray-700 dark:text-gray-300 font-medium">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-white/5">
                                            <item.icon size={20} />
                                        </div>
                                        {item.text}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={handleCtaClick}
                                className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-blue-600 text-white font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-500 hover:scale-105 transition-all duration-300 group/btn"
                            >
                                {session ? 'Go to My Goals' : 'Login to Set Goals'}
                                <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </button>

                            {!session && (
                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-500 flex items-center gap-2">
                                    <Lock size={12} /> Login required to persist your roadmap
                                </p>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative"
                        >
                            {/* Visual Abstract UI Representation */}
                            <div className="relative bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl p-6 md:p-8 transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full blur-[40px] opacity-20 animate-pulse" />

                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                        <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                                        XP
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${i === 1 ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                                {i === 1 && <Target size={12} />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                                <div className="h-2 w-1/2 bg-gray-100 dark:bg-gray-800 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-6 -left-6 bg-white dark:bg-[#222] p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                                        <TrendingUp size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Progress</div>
                                        <div className="text-xl font-black text-gray-900 dark:text-white">+125%</div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

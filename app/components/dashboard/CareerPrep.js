'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle, Lock, Crown } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export default function CareerPrep({ isPro }) {
    return (
        <section className="mb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-2xl shadow-orange-500/10"
            >
                <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-2xl shadow-orange-500/10">
                    <SpotlightCard className="rounded-[23px] p-8 md:p-12 relative overflow-hidden h-full" spotlightColor="rgba(245, 158, 11, 0.15)">

                        <div>
                            {/* Ambient Background */}
                            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-amber-500/20 blur-[100px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                <div className="max-w-2xl">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20 mb-6">
                                        <Sparkles size={14} />
                                        Premium Feature
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-400 mb-6 tracking-tight">
                                        Crack the Top Tech Interviews
                                    </h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                        Master the <strong>Elite Questions</strong> asked at FAANG and top product companies.
                                        Curated deep-dives for JavaScript, React, and System Design patterns.
                                    </p>

                                    <div className="flex flex-wrap gap-6">
                                        {[
                                            '100+ Top JS Questions',
                                            'Standard & Advanced Patterns',
                                            'Interactive Code Runner'
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                <div className="p-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                                                    <CheckCircle size={12} strokeWidth={3} />
                                                </div>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <Link href="/interview">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-orange-500/20 transition-all overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            <span className="relative flex items-center gap-3">
                                                Start Preparing <ArrowRight size={20} />
                                            </span>
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SpotlightCard>
                </div>
            </motion.div>
        </section>
    );
}

"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BrainCircuit, ScanFace, Sparkles, Fingerprint } from "lucide-react";

export const AiQuizCta = () => {
    return (
        <div className="relative py-32 overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-white dark:bg-[#050505]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:14px_24px]" />
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="rounded-[3rem] bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black border border-gray-200 dark:border-white/10 p-8 md:p-16 relative overflow-hidden text-center md:text-left shadow-2xl">
                    {/* Glossy Overlay */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_40%)] pointer-events-none" />

                    {/* Floating Icons */}
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-10 top-10 hidden lg:block text-brand-primary opacity-20"
                    >
                        <BrainCircuit size={120} />
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest mb-6">
                                <ScanFace size={16} />
                                AI-Human Hybrid Profiling
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                                Discover Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-brand-primary to-green-600 dark:from-blue-400 dark:via-brand-primary dark:to-green-400">
                                    Engineering DNA
                                </span>
                            </h2>

                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
                                Stop guessing where you stand. Our 15-minute AI assessment analyzes your code intuition, system design prediction, and debugging speed.
                                We compare you against 50,000+ engineers globally and visualize your exact percentile.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/ai-quiz">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full sm:w-auto relative group overflow-hidden rounded-full bg-gray-900 dark:bg-white px-8 py-4 text-white dark:text-black text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                                        <span className="relative flex items-center justify-center gap-2">
                                            Start Free Assessment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </motion.button>
                                </Link>
                                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm font-mono px-4">
                                    <Fingerprint size={16} />
                                    <span>No Login Required</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Representation of Analysis */}
                        <div className="relative hidden md:block h-64 lg:h-auto">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-purple-500/20 blur-[60px] rounded-full" />
                            <div className="relative bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-2xl">
                                <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold">Candidate Analysis</p>
                                        <p className="text-gray-900 dark:text-white font-bold">Anonymous_User_X92</p>
                                    </div>
                                    <div className="px-3 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold border border-green-500/20">
                                        Top 5% Potential
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
                                            <span>React / Next.js Patterns</span>
                                            <span className="text-brand-primary">92/100</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "92%" }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-brand-primary"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
                                            <span>System Design Intuition</span>
                                            <span className="text-purple-600 dark:text-purple-400">88/100</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "88%" }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                                className="h-full bg-purple-600 dark:bg-purple-400"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
                                            <span>Algorithmic Efficiency</span>
                                            <span className="text-blue-600 dark:text-blue-400">76/100</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "76%" }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                                                className="h-full bg-blue-600 dark:bg-blue-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                                    <p className="text-xs text-gray-500">AI Recommendation:</p>
                                    <p className="text-xs text-gray-900 dark:text-white font-bold flex items-center gap-1">
                                        <Sparkles size={12} className="text-yellow-500 dark:text-yellow-400" />
                                        Advanced Distributed Systems Course
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

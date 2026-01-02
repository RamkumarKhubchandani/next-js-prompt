"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CareerGoalsCTA() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
        >
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121212] p-6 md:p-8 shadow-sm group">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                                New Feature
                            </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Set Your North Star
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                            Use our new AI-powered career goal tracker to define your path, break down milestones, and get custom course recommendations.
                        </p>
                    </div>

                    <Link href="/goals" className="w-full md:w-auto">
                        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]">
                            <Target size={18} />
                            Launch Career Compass
                            <ArrowRight size={18} />
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Award } from 'lucide-react';

import { SpotlightCard } from '../ui/SpotlightCard';

// ...

export default function Milestones({ stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="h-full"
            >
                <SpotlightCard className="h-full p-8 shadow-xl" spotlightColor="rgba(0, 245, 160, 0.1)">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                        <Award className="text-brand-primary" fill="currentColor" />
                        Next Milestones
                    </h2>
                    <div className="space-y-6">
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-brand-primary bg-brand-primary/20">
                                    Frontend Novice
                                </span>
                                <span className="text-xs font-semibold inline-block text-brand-primary">
                                    {(stats.xp / 500 * 100).toFixed(0)}%
                                </span>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-dark-700">
                                <div style={{ width: `${Math.min(100, stats.xp / 500 * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-primary transition-all duration-500"></div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Reach 500 XP to unlock the "Frontend Novice" badge.</p>
                        </div>
                    </div>
                </SpotlightCard>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="h-full"
            >
                <SpotlightCard className="h-full p-8 shadow-xl flex flex-col justify-center items-center text-center" spotlightColor="rgba(0, 184, 212, 0.1)">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Continue Learning</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">Jump back into the tutorials and keep your streak alive!</p>
                    <div className="flex gap-4">
                        <Link href="/blogs">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-full bg-brand-primary px-6 py-3 text-base font-semibold text-dark-900 shadow-md hover:shadow-lg transition-all"
                            >
                                Browse Tutorials
                            </motion.button>
                        </Link>
                        <Link href="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-full bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 px-6 py-3 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-600 shadow-sm hover:shadow-md transition-all"
                            >
                                Visit Shop
                            </motion.button>
                        </Link>
                    </div>
                </SpotlightCard>
            </motion.div>
        </div>
    );
}

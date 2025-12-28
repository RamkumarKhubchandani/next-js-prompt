'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, Users, Lock } from 'lucide-react';

import { SpotlightCard } from '../ui/SpotlightCard';

// ...

export default function CareerSimulator({ isPro }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-[1px] rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 h-full relative"
            >
                <SpotlightCard className="rounded-[15px] p-8 h-full flex flex-col justify-between" spotlightColor="rgba(37, 99, 235, 0.2)">
                    {/* Lock Overlay */}
                    {!isPro && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/50 dark:bg-dark-900/50 rounded-[15px]">
                            <div className="w-12 h-12 rounded-full bg-dark-900/90 flex items-center justify-center mb-3 shadow-xl">
                                <Lock size={20} className="text-blue-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 drop-shadow-md">Career Mode Locked</h3>
                            <Link href="/pricing" className="pointer-events-auto">
                                <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-500 transition-colors shadow-lg">
                                    Unlock Beta
                                </button>
                            </Link>
                        </div>
                    )}

                    <div className={!isPro ? 'opacity-80 pointer-events-none select-none grayscale-[0.5]' : ''}>
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase rounded tracking-wider border border-blue-500/20">Beta</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">DevSim: Career Mode</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                                Experience the life of a junior developer. Fix bugs, push code, and earn XP in a virtual OS.
                            </p>
                        </div>
                        <Link href="/career">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-6 py-3 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 border border-gray-200 dark:border-dark-600"
                            >
                                <Briefcase size={20} className="text-purple-600 dark:text-purple-400" />
                                Start Internship
                            </motion.button>
                        </Link>
                    </div>
                </SpotlightCard>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-[1px] rounded-2xl bg-gradient-to-r from-brand-primary to-green-500 h-full relative"
            >
                <SpotlightCard className="rounded-[15px] p-8 h-full flex flex-col justify-between" spotlightColor="rgba(0, 245, 160, 0.2)">
                    {/* Lock Overlay */}
                    {!isPro && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/10 dark:bg-dark-900/10 backdrop-blur-md rounded-[15px]">
                            <div className="w-12 h-12 rounded-full bg-dark-900/80 flex items-center justify-center mb-3">
                                <Lock size={20} className="text-green-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Multiplayer Locked</h3>
                            <Link href="/pricing">
                                <button className="mt-3 px-4 py-2 bg-green-500 text-dark-900 text-sm font-bold rounded-lg hover:bg-green-400 transition-colors">
                                    Unlock Beta
                                </button>
                            </Link>
                        </div>
                    )}

                    <div className={!isPro ? 'filter blur-[2px] opacity-40 pointer-events-none' : ''}>
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-1 bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold uppercase rounded tracking-wider border border-green-500/20">New</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">DevRooms: Multiplayer</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                                Code live with friends or mentors. Share a link and pair program in real-time.
                            </p>
                        </div>
                        <Link href="/pair">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-6 py-3 rounded-xl bg-brand-primary text-dark-900 font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                            >
                                <Users className="text-dark-900" size={20} />
                                Create Room
                            </motion.button>
                        </Link>
                    </div>
                </SpotlightCard>
            </motion.div>
        </div>
    );
}

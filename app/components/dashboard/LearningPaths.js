'use client';
import { motion } from 'framer-motion';
import { Crown, ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';
import { SpotlightCard } from '../ui/SpotlightCard';

import { useRouter } from 'next/navigation';

export default function LearningPaths({ paths, isPro, handleSelectPath, loading }) {
    const router = useRouter();

    const onPathClick = async (pathId) => {
        // 1. Update DB state
        if (handleSelectPath) {
            await handleSelectPath(pathId);
        }

        // 2. Navigate
        router.push(`/path/${pathId}`);
    };

    return (
        <section className="mb-12" id="learning-paths">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        🎓 Choose Your Major
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Select a specialized track to get a structured day-by-day learning plan.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {paths.map((path, index) => {
                    return (
                        <motion.div
                            key={path.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="h-full"
                        >
                            <SpotlightCard className="h-full relative overflow-hidden p-6 hover:shadow-xl transition-all" spotlightColor="rgba(0, 245, 160, 0.15)">

                                <div>
                                    {/* Gradient Accent */}
                                    <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${path.accent}`} />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${path.accent} opacity-0 group-hover:opacity-5 transition-opacity`} />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-start justify-between gap-3 mb-4">
                                            <span className="text-4xl">{path.icon}</span>
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded-full border border-gray-200 dark:border-dark-600">
                                                {path.tag}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-primary transition-colors">
                                            {path.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-1">
                                            {path.desc}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-dark-700/50 pt-4 mt-auto">
                                            <button className="flex items-center gap-2 text-xs font-bold text-brand-primary bg-brand-primary/10 px-3 py-1.5 rounded-lg hover:bg-brand-primary/20 transition-colors">
                                                Start Path <ArrowRight size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    onClick={() => onPathClick(path.id)}
                                    className="absolute inset-0 z-30 cursor-pointer"
                                    role="button"
                                    tabIndex={0}
                                />
                            </SpotlightCard>
                        </motion.div>
                    );
                })}
            </div>
        </section >
    );
}

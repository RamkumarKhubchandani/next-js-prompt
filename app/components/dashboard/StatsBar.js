'use client';
import { motion } from 'framer-motion';
import { Trophy, BookOpen, Flame, Mic, Layers } from 'lucide-react';
import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function StatsBar({ stats, loading }) {
    const { data: session } = useSession();
    const StatItem = ({ icon: Icon, label, value, color, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="flex items-center gap-3 bg-white/50 dark:bg-dark-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200/50 dark:border-dark-700/50 shadow-sm"
        >
            <div className={`p-1.5 rounded-full ${color.bg} ${color.text}`}>
                <Icon size={14} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider text-xs">{label}</span>
                <span className="font-bold text-gray-900 dark:text-white text-sm">
                    {loading ? '...' : value}
                </span>
            </div>
        </motion.div>
    );

    const [showCard, setShowCard] = React.useState(false);

    // Import DevCard dynamically or pass it? Better to import at top but let's do modal logic here.
    // For cleaner code, we'll just add the button here and assume the parent or a global modal handles it, 
    // OR we can simple render the modal here. Let's render it here for simplicity.

    return (
        <>
            <div className="flex flex-wrap gap-3 items-center">
                <StatItem
                    icon={Trophy}
                    label="XP"
                    value={stats.xp}
                    color={{ bg: 'bg-yellow-500/10', text: 'text-yellow-600 dark:text-yellow-400' }}
                    delay={0.1}
                />
                <StatItem
                    icon={BookOpen}
                    label="Tutorials"
                    value={stats.completedTutorialsCount ?? 0}
                    color={{ bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' }}
                    delay={0.2}
                />
                <StatItem
                    icon={Flame}
                    label="Streak"
                    value={stats.streak?.count || 0}
                    color={{ bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400' }}
                    delay={0.3}
                />

                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCard(true)}
                    className="ml-2 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg shadow-purple-500/20 flex items-center gap-1.5 hover:shadow-purple-500/40 transition-all border border-white/10"
                >
                    <Trophy size={12} />
                    My Card
                </motion.button>

                <Link href="/interview/mock">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="ml-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg shadow-blue-500/20 flex items-center gap-1.5 hover:shadow-blue-500/40 transition-all border border-white/10"
                    >
                        <Mic size={12} />
                        AI Interview
                    </motion.button>
                </Link>

                <Link href="/resume-audit">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="ml-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold rounded-full shadow-lg shadow-green-500/20 flex items-center gap-1.5 hover:shadow-green-500/40 transition-all border border-white/10"
                    >
                        <BookOpen size={12} />
                        Resume Audit
                    </motion.button>
                </Link>

                <Link href="/system-design">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="ml-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg shadow-orange-500/20 flex items-center gap-1.5 hover:shadow-orange-500/40 transition-all border border-white/10"
                    >
                        <Layers size={12} />
                        System Design
                    </motion.button>
                </Link>
            </div>

            {/* Dev Card Modal */}
            {showCard && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative">
                        <button
                            onClick={() => setShowCard(false)}
                            className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
                        >
                            Close
                        </button>
                        <DevCardLoader stats={stats} user={session?.user || { name: 'Guest User' }} activeGoal="Fullstack Mastery" />
                    </div>
                </div>
            )}
        </>
    );
}

// Lazy load DevCard to avoid heavy initial bundle
import dynamic from 'next/dynamic';
const DevCardLoader = dynamic(() => import('./DevCard'), {
    loading: () => <div className="text-white">Minting your identity...</div>
});

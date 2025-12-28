'use client';
import { motion } from 'framer-motion';
import { Trophy, BookOpen, Flame } from 'lucide-react';

export default function StatsBar({ stats, loading }) {
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

    return (
        <div className="flex flex-wrap gap-3">
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
        </div>
    );
}

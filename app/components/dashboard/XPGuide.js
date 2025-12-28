'use client';
import { motion } from 'framer-motion';
import { SpotlightCard } from '../ui/SpotlightCard';
import { BookOpen, CheckCircle, Zap } from 'lucide-react';

export default function XPGuide() {
    const opportunities = [
        {
            title: 'Complete a Lesson',
            xp: '+150 XP',
            desc: 'Finish a daily lesson or chapter.',
            icon: <BookOpen size={18} className="text-blue-500" />
        },
        {
            title: 'Fix a Daily Bug',
            xp: '+50 XP',
            desc: 'Solve the daily code challenge.',
            icon: <Zap size={18} className="text-yellow-500" />
        },
        {
            title: 'Pass a Quiz',
            xp: '+100 XP',
            desc: 'Score 80% or higher on a topic quiz.',
            icon: <CheckCircle size={18} className="text-green-500" />
        },
        {
            title: '7-Day Streak',
            xp: '+500 XP',
            desc: 'Learn for 7 consecutive days.',
            icon: <Zap size={18} className="text-purple-500" />
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
        >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Zap className="text-yellow-500" fill="currentColor" />
                How to Earn XP
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {opportunities.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="h-full"
                    >
                        <SpotlightCard className="h-full p-6 shadow-sm flex flex-col gap-3" spotlightColor="rgba(255, 255, 255, 0.1)">
                            <div className="flex justify-between items-start">
                                <div className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 w-fit">
                                    {item.icon}
                                </div>
                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                                    {item.xp}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

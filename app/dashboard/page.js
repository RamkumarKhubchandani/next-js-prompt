"use client";
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Trophy, BookOpen, Flame, Award, Zap, CheckCircle, Settings, Briefcase, Crown, ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';

const PATHS = [
    { id: 'react', title: 'React Mastery', icon: '⚛️', desc: 'Master React, Next.js, and Redux.' },
    { id: 'fullstack', title: 'Fullstack Zero to Hero', icon: '🚀', desc: 'Node.js, Express, MongoDB, and React.' },
    { id: 'javascript', title: 'Advanced JavaScript', icon: '📜', desc: 'Deep dive into closures, prototypes, and async.' },
];

export default function DashboardPage() {
    const { data: session } = useSession();
    const [stats, setStats] = useState({ xp: 0, completedTutorials: [], streak: { count: 0 }, plan: 'free', learningPath: 'none' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetch('/api/user/progress')
                .then(res => res.json())
                .then(data => {
                    setStats(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [session]);

    const handleSelectPath = async (pathId) => {
        try {
            await fetch('/api/user/path', {
                method: 'POST',
                body: JSON.stringify({ path: pathId })
            });
            setStats(prev => ({ ...prev, learningPath: pathId }));
        } catch (e) {
            console.error(e);
        }
    };

    // Listen for XP updates from the CompleteButton
    useEffect(() => {
        const handleXpUpdate = () => {
             fetch('/api/user/progress')
                .then(res => res.json())
                .then(data => setStats(data));
        };
        window.addEventListener('xp-updated', handleXpUpdate);
        return () => window.removeEventListener('xp-updated', handleXpUpdate);
    }, []);

    const isPro = stats.plan && stats.plan.startsWith('pro_');

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800 p-6 rounded-2xl border border-dark-700 flex items-center gap-4"
        >
            <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
                <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
            </div>
            <div>
                <p className="text-light-300 text-sm font-medium">{label}</p>
                <p className="text-2xl font-bold text-light-100">{value}</p>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-900 text-light-100">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
                >
                    <div>
                        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
                            Welcome back, {session?.user?.name || 'Student'}!
                            {isPro && <span className="px-3 py-1 bg-brand-primary text-dark-900 text-xs font-bold rounded-full uppercase">Pro Member</span>}
                        </h1>
                        <p className="text-xl text-light-200">Ready to continue your learning journey?</p>
                    </div>
                    <Link href="/dashboard/settings">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800 border border-dark-700 hover:bg-dark-700 hover:text-white transition-colors text-light-300">
                            <Settings size={18} />
                            Manage Profile
                        </button>
                    </Link>
                </motion.div>

                {/* PRO ONBOARDING: Select Path */}
                {isPro && stats.learningPath === 'none' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-12 bg-gradient-to-b from-brand-primary/20 to-dark-800 rounded-2xl p-8 border border-brand-primary/30"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">🎓 Select your Major</h2>
                        <p className="text-light-300 mb-8">As a Pro member, you get a structured, day-by-day learning path. Choose your focus:</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {PATHS.map((path) => (
                                <button
                                    key={path.id}
                                    onClick={() => handleSelectPath(path.id)}
                                    className="bg-dark-900 hover:bg-dark-700 border border-dark-600 hover:border-brand-primary p-6 rounded-xl transition-all text-left group"
                                >
                                    <div className="text-4xl mb-4">{path.icon}</div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary">{path.title}</h3>
                                    <p className="text-sm text-gray-400">{path.desc}</p>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* PRO SCHEDULE: Daily Plan */}
                {isPro && stats.learningPath !== 'none' && (
                    <motion.div 
                         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                         className="mb-12 bg-dark-800 rounded-2xl p-8 border border-brand-primary/20"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <CheckCircle className="text-brand-primary" />
                                Daily Schedule: {stats.learningPath === 'react' ? 'React Mastery' : stats.learningPath === 'javascript' ? 'JS Advanced' : 'Fullstack'}
                            </h2>
                            <span className="text-sm text-gray-400">Day 1 of 30</span>
                        </div>
                        
                        <div className="bg-dark-900 rounded-xl p-6 border border-dark-700 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Day 1: The Foundation</h3>
                                <p className="text-gray-400 text-sm">Understanding the core concepts before we build.</p>
                            </div>
                            <Link href={`/path/${stats.learningPath}`}>
                                <button className="px-6 py-2 bg-brand-primary text-dark-900 font-bold rounded-lg hover:opacity-90 transition">
                                    Start Lesson
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}

                {/* FREE USER UPGRADE BANNER */}
                {!isPro && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900 to-blue-900 p-8 border border-white/10"
                    >
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    <Crown className="text-yellow-400" fill="currentColor" />
                                    Unlock Your Full Potential
                                </h2>
                                <p className="text-blue-100 max-w-xl">
                                    Get structured day-by-day learning, verified certificates, and AI interview prep with Pro.
                                </p>
                            </div>
                            <Link href="/pricing">
                                <button className="px-8 py-3 bg-white text-purple-900 font-bold rounded-xl hover:bg-gray-100 transition shadow-lg flex items-center gap-2 whitespace-nowrap">
                                    Upgrade to Pro <ArrowRight size={18} />
                                </button>
                            </Link>
                        </div>
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-primary opacity-20 blur-3xl rounded-full"></div>
                    </motion.div>
                )}

                {/* NEW FEATURE: Career Simulator */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-[1px] rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                        <div className="bg-dark-800 rounded-2xl p-8 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase rounded tracking-wider border border-blue-500/20">Beta</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">DevSim: Career Mode</h2>
                                <p className="text-light-300 text-sm leading-relaxed mb-6">
                                    Experience the life of a junior developer. Fix bugs, push code, and earn XP in a virtual OS.
                                </p>
                            </div>
                            <Link href="/career">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-6 py-3 rounded-xl bg-white text-dark-900 font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <Briefcase size={20} className="text-purple-600" />
                                    Start Internship
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-[1px] rounded-2xl bg-gradient-to-r from-brand-primary to-green-500"
                    >
                        <div className="bg-dark-800 rounded-2xl p-8 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold uppercase rounded tracking-wider border border-green-500/20">New</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">DevRooms: Multiplayer</h2>
                                <p className="text-light-300 text-sm leading-relaxed mb-6">
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
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard 
                        icon={Trophy} 
                        label="Total XP" 
                        value={loading ? '...' : stats.xp} 
                        color="bg-yellow-500 text-yellow-500" 
                    />
                    <StatCard 
                        icon={BookOpen} 
                        label="Tutorials Completed" 
                        value={loading ? '...' : stats.completedTutorials?.length || 0} 
                        color="bg-blue-500 text-blue-500" 
                    />
                    <StatCard 
                        icon={Flame} 
                        label="Day Streak" 
                        value={loading ? '...' : stats.streak?.count || 0} 
                        color="bg-orange-500 text-orange-500" 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-dark-800 rounded-2xl p-8 border border-dark-700"
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Award className="text-brand-primary" />
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
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-dark-700">
                                    <div style={{ width: `${Math.min(100, stats.xp / 500 * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-primary transition-all duration-500"></div>
                                </div>
                                <p className="text-sm text-light-300">Reach 500 XP to unlock the "Frontend Novice" badge.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-dark-800 rounded-2xl p-8 border border-dark-700 flex flex-col justify-center items-center text-center"
                    >
                        <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
                        <p className="text-light-200 mb-8">Jump back into the tutorials and keep your streak alive!</p>
                        <div className="flex gap-4">
                            <Link href="/tutorials">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="rounded-full bg-brand-primary px-6 py-3 text-base font-semibold text-dark-900"
                                >
                                    Browse Tutorials
                                </motion.button>
                            </Link>
                            <Link href="/shop">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="rounded-full bg-dark-700 border border-dark-600 px-6 py-3 text-base font-semibold text-white hover:bg-dark-600"
                                >
                                    Visit Shop
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* XP Guide */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-dark-800 rounded-2xl p-8 border border-dark-700"
                >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Zap className="text-yellow-500" />
                        How to Earn XP
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-dark-900 p-4 rounded-xl border border-dark-700 flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold text-white">Read Tutorial</p>
                                <p className="text-sm text-brand-primary">+50 XP</p>
                            </div>
                        </div>
                        <div className="bg-dark-900 p-4 rounded-xl border border-dark-700 flex items-center gap-3">
                            <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold text-white">Complete Quiz</p>
                                <p className="text-sm text-brand-primary">+100 XP</p>
                            </div>
                        </div>
                        <div className="bg-dark-900 p-4 rounded-xl border border-dark-700 flex items-center gap-3">
                            <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                                <Flame className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold text-white">Daily Login</p>
                                <p className="text-sm text-brand-primary">+10 XP</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

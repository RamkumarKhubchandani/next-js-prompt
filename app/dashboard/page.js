"use client";
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Trophy, BookOpen, Flame, Award, Zap, CheckCircle, Settings, Briefcase, Crown, ArrowRight, Users, Map, Sparkles } from 'lucide-react';
import Link from 'next/link';
import DailyChallengeCard from '../components/public/DailyChallengeCard';

const PATHS = [
    {
        id: 'react',
        title: 'React Mastery',
        icon: '⚛️',
        desc: 'React 19, Next.js, Suspense, patterns, and real-world refactors.',
        accent: 'from-cyan-500/15 via-brand-primary/10 to-white/70 dark:from-cyan-500/20 dark:via-brand-primary/10 dark:to-dark-800',
        tag: 'Frontend'
    },
    {
        id: 'fullstack',
        title: 'Fullstack Zero to Hero',
        icon: '🚀',
        desc: 'Node.js, APIs, MongoDB, auth, and shipping complete products.',
        accent: 'from-purple-500/15 via-blue-500/10 to-white/70 dark:from-purple-500/20 dark:via-blue-500/10 dark:to-dark-800',
        tag: 'Fullstack'
    },
    {
        id: 'javascript',
        title: 'Advanced JavaScript',
        icon: '📜',
        desc: 'V8 internals, async, performance, closures, and debugging drills.',
        accent: 'from-amber-500/15 via-orange-500/10 to-white/70 dark:from-amber-500/20 dark:via-orange-500/10 dark:to-dark-800',
        tag: 'Core'
    },
    {
        id: 'angular',
        title: 'Angular 21 Mastery',
        icon: '🅰️',
        desc: 'Signals, RxJS, routing, SSR, and interview-ready architecture.',
        accent: 'from-red-500/15 via-fuchsia-500/10 to-white/70 dark:from-red-500/20 dark:via-fuchsia-500/10 dark:to-dark-800',
        tag: 'Frontend'
    },
    {
        id: 'html',
        title: 'Semantic HTML Pro',
        icon: '🧱',
        desc: 'Semantics, accessibility-first structure, forms, media, tables, and SEO foundations.',
        accent: 'from-emerald-500/15 via-teal-500/10 to-white/70 dark:from-emerald-500/20 dark:via-teal-500/10 dark:to-dark-800',
        tag: 'Foundation'
    },
    {
        id: 'css',
        title: 'Modern CSS Systems',
        icon: '🎨',
        desc: 'Cascade, layout, responsive systems, tokens/theming, animation, performance, and architecture.',
        accent: 'from-sky-500/15 via-indigo-500/10 to-white/70 dark:from-sky-500/20 dark:via-indigo-500/10 dark:to-dark-800',
        tag: 'Foundation'
    },
    {
        id: 'typescript',
        title: 'TypeScript Mastery',
        icon: '📘',
        desc: 'From basic types to advanced generics, utility types, and building type-safe systems.',
        accent: 'from-blue-600/15 via-indigo-600/10 to-white/70 dark:from-blue-600/20 dark:via-indigo-600/10 dark:to-dark-800',
        tag: 'Language'
    },
    {
        id: 'zustand',
        title: 'Zustand State',
        icon: '🐻',
        desc: 'Master the minimalist state manager. Hooks, slices, middleware, and performance optimization.',
        accent: 'from-yellow-800/15 via-orange-800/10 to-white/70 dark:from-yellow-800/20 dark:via-orange-800/10 dark:to-dark-800',
        tag: 'State'
    },
    {
        id: 'redux',
        title: 'Redux Toolkit',
        icon: '⚛️',
        desc: 'Enterprise state management. RTK, Slices, AsyncThunks, RTK Query, and scalable architecture.',
        accent: 'from-purple-600/15 via-violet-600/10 to-white/70 dark:from-purple-600/20 dark:via-violet-600/10 dark:to-dark-800',
        tag: 'State'
    },
];

export default function DashboardPage() {
    const { data: session, status, update } = useSession();
    // Start with plan/path unknown to avoid "free banner flicker" before session/progress resolves.
    const [stats, setStats] = useState({ xp: 0, completedTutorialsCount: 0, streak: { count: 0 }, plan: undefined, learningPath: undefined });
    const [loading, setLoading] = useState(true);

    // Seed plan + learningPath from the session ASAP (so pro UI can render without waiting on /api/user/progress)
    useEffect(() => {
        if (session?.user) {
            setStats(prev => ({
                ...prev,
                plan: session.user.plan ?? prev.plan,
                learningPath: session.user.learningPath ?? prev.learningPath
            }));
        }
    }, [session]);

    useEffect(() => {
        if (session) {
            fetch('/api/user/progress?summary=1')
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
            // Keep next-auth session in sync to avoid stale UI until refresh
            await update?.({ learningPath: pathId });
        } catch (e) {
            console.error(e);
        }
    };

    const handleChangeMajor = async () => {
        // Reset learning path so the "Select your Major" UI appears again
        await handleSelectPath('none');
    };

    // Listen for XP updates from the CompleteButton
    useEffect(() => {
        const handleXpUpdate = () => {
            fetch('/api/user/progress?summary=1')
                .then(res => res.json())
                .then(data => setStats(data));
        };
        window.addEventListener('xp-updated', handleXpUpdate);
        return () => window.removeEventListener('xp-updated', handleXpUpdate);
    }, []);

    const plan = session?.user?.plan ?? stats.plan;
    const learningPath = session?.user?.learningPath ?? stats.learningPath;
    const planResolved = status !== 'loading' && typeof plan === 'string';
    const learningPathResolved = typeof learningPath === 'string';

    // Pro logic: includes 'pro_trial', 'pro_weekly', etc.
    const isPro = planResolved && plan.startsWith('pro');
    const isTrial = plan === 'pro_trial';

    // Calculate trial days left
    const [trialDaysLeft, setTrialDaysLeft] = useState(0);

    useEffect(() => {
        if (isTrial && session?.user?.trialEndsAt) {
            const end = new Date(session.user.trialEndsAt);
            const now = new Date();
            const diffTime = Math.abs(end - now);
            setTrialDaysLeft(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        }
    }, [isTrial, session]);

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 dark:bg-dark-800 p-6 rounded-2xl border border-dark-700/10 dark:border-dark-700 flex items-center gap-4 backdrop-blur-lg"
        >
            <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
                <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
            </div>
            <div>
                <p className="text-dark-900/60 dark:text-light-300 text-sm font-medium">{label}</p>
                <p className="text-2xl font-bold text-dark-900 dark:text-light-100">{value}</p>
            </div>
        </motion.div>
    );

    const LockedFeature = ({ children, isLocked, title }) => {
        if (!isLocked) return children;
        return (
            <div className="relative">
                <div className="filter blur-sm pointer-events-none select-none opacity-50">
                    {children}
                </div>
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-xl p-8 rounded-3xl border border-brand-primary/20 shadow-2xl max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
                        <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Crown className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
                            Unlock {title}
                        </h3>
                        <p className="text-dark-900/60 dark:text-light-300 mb-6">
                            Upgrade to Pro to access this feature and accelerate your learning journey.
                        </p>
                        <Link href="/pricing">
                            <button className="px-8 py-3 bg-brand-primary text-dark-900 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,245,160,0.4)] transition-all flex items-center gap-2 mx-auto">
                                Upgrade Now <ArrowRight size={18} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
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
                        <p className="text-xl text-dark-900/70 dark:text-light-200">Ready to continue your learning journey?</p>
                    </div>
                    <Link href="/dashboard/settings">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/70 dark:bg-dark-800 border border-dark-700/10 dark:border-dark-700 hover:bg-dark-900/5 dark:hover:bg-dark-700 transition-colors text-dark-900/70 dark:text-light-300 backdrop-blur-lg">
                            <Settings size={18} />
                            Manage Profile
                        </button>
                    </Link>
                </motion.div>

                {/* TRIAL BANNER */}
                {isTrial && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 bg-gradient-to-r from-brand-primary/20 to-purple-500/20 border border-brand-primary/30 rounded-2xl p-4 flex items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-brand-primary/20 rounded-lg">
                                <Crown className="w-5 h-5 text-brand-primary" />
                            </div>
                            <div>
                                <p className="font-bold text-dark-900 dark:text-white">Pro Trial Active</p>
                                <p className="text-sm text-dark-900/70 dark:text-light-300">
                                    You have <span className="font-bold text-brand-primary">{trialDaysLeft} days</span> left in your free trial.
                                </p>
                            </div>
                        </div>
                        <Link href="/pricing">
                            <button className="px-4 py-2 bg-brand-primary text-dark-900 text-sm font-bold rounded-lg hover:opacity-90 transition whitespace-nowrap">
                                Keep Pro Features
                            </button>
                        </Link>
                    </motion.div>
                )}

                {/* DAILY CHALLENGE CARD */}
                <div className="mb-12">
                    <DailyChallengeCard />
                </div>

                {/* PRO ONBOARDING: Select Path (Visible to Pro or Locked for Free) */}
                {/* Only show if NO path is selected yet. If locked, we show a preview. */}
                {learningPathResolved && learningPath === 'none' && (
                    <LockedFeature isLocked={!isPro} title="Learning Paths">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="mb-12 bg-gradient-to-b from-brand-primary/20 to-white/70 dark:to-dark-800 rounded-2xl p-8 border border-brand-primary/30 backdrop-blur-lg"
                        >
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">🎓 Select your Major</h2>
                                    <p className="text-dark-900/70 dark:text-light-300">Pick a track now — you can switch anytime.</p>
                                </div>
                                <div className="text-xs text-dark-900/50 dark:text-light-400">
                                    Tip: you can also switch inside any course page via the course switcher.
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {PATHS.map((path) => (
                                    <button
                                        key={path.id}
                                        onClick={() => isPro && handleSelectPath(path.id)}
                                        className={`relative overflow-hidden bg-gradient-to-br ${path.accent} border border-dark-700/10 dark:border-dark-600 hover:border-brand-primary/60 p-6 rounded-2xl transition-all text-left group hover:-translate-y-0.5 backdrop-blur-lg cursor-pointer`}
                                    >
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/5" />
                                        <div className="relative">
                                            <div className="flex items-start justify-between gap-3 mb-4">
                                                <div className="text-4xl">{path.icon}</div>
                                                <span className="text-[11px] font-bold tracking-widest uppercase text-dark-900/70 dark:text-light-300/90 bg-white/70 dark:bg-dark-900/60 border border-dark-700/10 dark:border-dark-600 px-2 py-1 rounded-full">
                                                    {path.tag}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2 group-hover:text-brand-primary transition-colors">{path.title}</h3>
                                            <p className="text-sm text-dark-900/70 dark:text-gray-300/80 leading-relaxed">{path.desc}</p>
                                            <div className="mt-5 flex items-center justify-between">
                                                <span className="text-xs text-dark-900/50 dark:text-light-400">Start day-by-day</span>
                                                <span className="text-xs font-bold text-brand-primary group-hover:translate-x-0.5 transition-transform">
                                                    Choose →
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </LockedFeature>
                )}

                {/* Certifications Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Award className="text-brand-primary" />
                        Get Certified
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Fullstack Certification */}
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-200 dark:border-dark-700 hover:border-purple-500/50 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Award size={100} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-4">
                                    <span className="font-bold text-lg">FS</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fullstack Architect</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                    Master Node.js, Databases, and System Design.
                                </p>
                                <Link href="/course/fullstack/assessment" className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold hover:gap-3 transition-all">
                                    Take Assessment <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        {/* React Certification */}
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-200 dark:border-dark-700 hover:border-brand-primary/50 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Award size={100} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-4">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">React.js Professional</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                    Validate your expertise in React hooks, patterns, and performance.
                                </p>
                                <Link href="/course/react/assessment" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all">
                                    Take Assessment <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        {/* JavaScript Certification */}
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-200 dark:border-dark-700 hover:border-yellow-500/50 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Award size={100} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-4">
                                    <span className="font-bold text-lg">JS</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">JavaScript Professional</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                    Prove your mastery of ES6+, closures, and async programming.
                                </p>
                                <Link href="/course/javascript/assessment" className="inline-flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-bold hover:gap-3 transition-all">
                                    Take Assessment <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        {/* Angular Certification */}
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-200 dark:border-dark-700 hover:border-red-500/50 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Award size={100} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 mb-4">
                                    <span className="font-bold text-lg">NG</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Angular Professional</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                    Demonstrate your skills in components, services, and RxJS.
                                </p>
                                <Link href="/course/angular/assessment" className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-bold hover:gap-3 transition-all">
                                    Take Assessment <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        {/* HTML Certification */}
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-200 dark:border-dark-700 hover:border-orange-500/50 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Award size={100} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-4">
                                    <span className="font-bold text-lg">H5</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">HTML5 Professional</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                    Master semantic HTML, accessibility, and SEO.
                                </p>
                                <Link href="/course/html/assessment" className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold hover:gap-3 transition-all">
                                    Take Assessment <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        {/* CSS Certification */}
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-200 dark:border-dark-700 hover:border-sky-500/50 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Award size={100} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-500 mb-4">
                                    <span className="font-bold text-lg">CSS</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">CSS3 Expert</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                    Master Flexbox, Grid, animations, and responsive design.
                                </p>
                                <Link href="/course/css/assessment" className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold hover:gap-3 transition-all">
                                    Take Assessment <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PRO SCHEDULE: Daily Plan (Visible to Pro or Locked for Free) */}
                {/* If Free, we show a dummy schedule or the schedule for 'fullstack' as preview */}
                {learningPathResolved && (learningPath !== 'none' || !isPro) && (
                    <LockedFeature isLocked={!isPro} title="Daily Schedule">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="mb-12 bg-white/70 dark:bg-dark-800 rounded-2xl p-8 border border-brand-primary/20 backdrop-blur-lg"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
                                    <CheckCircle className="text-brand-primary" />
                                    Daily Schedule: {
                                        (!isPro || learningPath === 'none') ? 'Fullstack Zero to Hero' : // Preview title for free users
                                            learningPath === 'html' ? 'Semantic HTML Pro' :
                                                learningPath === 'css' ? 'Modern CSS Systems' :
                                                    learningPath === 'react' ? 'React Mastery' :
                                                        learningPath === 'javascript' ? 'JS Advanced' :
                                                            learningPath === 'angular' ? 'Angular 21 Mastery' :
                                                                'Fullstack'
                                    }
                                </h2>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={handleChangeMajor}
                                        className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-900/5 dark:bg-dark-700 border border-dark-700/10 dark:border-dark-600 hover:bg-dark-900/10 dark:hover:bg-dark-600 hover:border-brand-primary/40 transition-colors text-dark-900/70 dark:text-light-200 text-sm"
                                        title="Change your major"
                                    >
                                        <Sparkles size={16} className="text-brand-primary" />
                                        Change Major
                                    </button>
                                    <span className="text-sm text-dark-900/50 dark:text-gray-400">Day 1</span>
                                </div>
                            </div>

                            <div className="bg-white/70 dark:bg-dark-900 rounded-xl p-6 border border-dark-700/10 dark:border-dark-700 flex items-center justify-between backdrop-blur-lg">
                                <div>
                                    <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-1">Day 1: The Foundation</h3>
                                    <p className="text-dark-900/60 dark:text-gray-400 text-sm">Understanding the core concepts before we build.</p>
                                </div>
                                <Link href={isPro ? `/path/${learningPath}` : '#'}>
                                    <button className="px-6 py-2 bg-brand-primary text-dark-900 font-bold rounded-lg hover:opacity-90 transition">
                                        Start Lesson
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </LockedFeature>
                )}

                {/* PRO FEATURE: Living Roadmap */}
                <LockedFeature isLocked={!isPro} title="Living Roadmap">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 bg-white/70 dark:bg-dark-800 rounded-2xl p-8 border border-dark-700/10 dark:border-dark-700 backdrop-blur-lg"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
                                    <Map className="text-brand-primary" />
                                    Living Roadmap 2025 (Pro)
                                </h2>
                                <p className="text-dark-900/70 dark:text-light-300 mt-2 max-w-2xl">
                                    A clickable visual learning path (HTML → CSS → JS → React → Next.js). Each node includes a guided explanation and a Cursor demo media slot.
                                </p>
                            </div>
                            <Link href="/roadmap">
                                <button className="px-6 py-3 bg-brand-primary text-dark-900 font-bold rounded-lg hover:opacity-90 transition whitespace-nowrap">
                                    Open Roadmap
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </LockedFeature>

                {/* FREE USER UPGRADE BANNER - Only show if NOT trial and NOT pro */}
                {planResolved && !isPro && !isTrial && (
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
                        <div className="bg-white/70 dark:bg-dark-800 rounded-2xl p-8 h-full flex flex-col justify-between backdrop-blur-lg">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase rounded tracking-wider border border-blue-500/20">Beta</span>
                                </div>
                                <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-3">DevSim: Career Mode</h2>
                                <p className="text-dark-900/70 dark:text-light-300 text-sm leading-relaxed mb-6">
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
                        <div className="bg-white/70 dark:bg-dark-800 rounded-2xl p-8 h-full flex flex-col justify-between backdrop-blur-lg">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold uppercase rounded tracking-wider border border-green-500/20">New</span>
                                </div>
                                <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-3">DevRooms: Multiplayer</h2>
                                <p className="text-dark-900/70 dark:text-light-300 text-sm leading-relaxed mb-6">
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

                {/* NEW FEATURE: Interview Prep CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
                >
                    <div className="bg-white dark:bg-dark-900 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-sm font-bold mb-4 border border-amber-500/20">
                                    <Sparkles size={16} />
                                    Premium Feature
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                    Crack the Top Tech Interviews
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                    Master the most asked questions from FAANG and top product companies. Curated deep-dives for JavaScript, React, and System Design.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <CheckCircle size={16} className="text-amber-500" /> 50+ Top JS Questions
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <CheckCircle size={16} className="text-amber-500" /> Detailed Explanations
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <CheckCircle size={16} className="text-amber-500" /> Live Code Examples
                                    </div>
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <Link href="/interview">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-orange-500/20 transition-all flex items-center gap-3"
                                    >
                                        Start Preparing <ArrowRight size={20} />
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

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
                        value={loading ? '...' : stats.completedTutorialsCount ?? 0}
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
                        className="bg-white/70 dark:bg-dark-800 rounded-2xl p-8 border border-dark-700/10 dark:border-dark-700 backdrop-blur-lg"
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
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-dark-900/10 dark:bg-dark-700">
                                    <div style={{ width: `${Math.min(100, stats.xp / 500 * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-primary transition-all duration-500"></div>
                                </div>
                                <p className="text-sm text-dark-900/70 dark:text-light-300">Reach 500 XP to unlock the "Frontend Novice" badge.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/70 dark:bg-dark-800 rounded-2xl p-8 border border-dark-700/10 dark:border-dark-700 flex flex-col justify-center items-center text-center backdrop-blur-lg"
                    >
                        <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
                        <p className="text-dark-900/70 dark:text-light-200 mb-8">Jump back into the tutorials and keep your streak alive!</p>
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
                                    className="rounded-full bg-dark-900/5 dark:bg-dark-700 border border-dark-700/10 dark:border-dark-600 px-6 py-3 text-base font-semibold text-dark-900 dark:text-white hover:bg-dark-900/10 dark:hover:bg-dark-600"
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
                    className="bg-white/70 dark:bg-dark-800 rounded-2xl p-8 border border-dark-700/10 dark:border-dark-700 backdrop-blur-lg"
                >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Zap className="text-yellow-500" />
                        How to Earn XP
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white/70 dark:bg-dark-900 p-4 rounded-xl border border-dark-700/10 dark:border-dark-700 flex items-center gap-3 backdrop-blur-lg">
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold text-dark-900 dark:text-white">Read Tutorial</p>
                                <p className="text-sm text-brand-primary">+50 XP</p>
                            </div>
                        </div>
                        <div className="bg-white/70 dark:bg-dark-900 p-4 rounded-xl border border-dark-700/10 dark:border-dark-700 flex items-center gap-3 backdrop-blur-lg">
                            <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold text-dark-900 dark:text-white">Complete Quiz</p>
                                <p className="text-sm text-brand-primary">+100 XP</p>
                            </div>
                        </div>
                        <div className="bg-white/70 dark:bg-dark-900 p-4 rounded-xl border border-dark-700/10 dark:border-dark-700 flex items-center gap-3 backdrop-blur-lg">
                            <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                                <Flame className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold text-dark-900 dark:text-white">Daily Login</p>
                                <p className="text-sm text-brand-primary">+10 XP</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

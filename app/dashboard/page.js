"use client";
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Settings, Trophy, BookOpen, Mic, Layers, Wand2 } from 'lucide-react';
import { PremiumAction } from '../components/dashboard/PremiumAction';
import dynamic from 'next/dynamic';

const DevCardLoader = dynamic(() => import('../components/dashboard/DevCard'), {
    loading: () => <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">Loading...</div>
});
import StatsBar from '../components/dashboard/StatsBar';
import DailyFocus from '../components/dashboard/DailyFocus';
import LearningPaths from '../components/dashboard/LearningPaths';
import CareerPrep from '../components/dashboard/CareerPrep';
import Certifications from '../components/dashboard/Certifications';
import LivingRoadmap from '../components/dashboard/LivingRoadmap';
import UpgradeBanner from '../components/dashboard/UpgradeBanner';
import CareerSimulator from '../components/dashboard/CareerSimulator';
import Milestones from '../components/dashboard/Milestones';
import XPGuide from '../components/dashboard/XPGuide';
import CareerGoalsCTA from '../components/dashboard/CareerGoalsCTA';

// Paths Definition
const PATHS = [
    {
        id: 'react',
        title: 'React Mastery',
        icon: '⚛️',
        desc: 'React 19, Next.js, Suspense, patterns, and real-world refactors.',
        accent: 'from-cyan-500/20 via-blue-500/10 to-transparent',
        tag: 'Frontend'
    },
    {
        id: 'fullstack',
        title: 'Fullstack Zero to Hero',
        icon: '🚀',
        desc: 'Node.js, APIs, MongoDB, auth, and shipping complete products.',
        accent: 'from-purple-500/20 via-blue-500/10 to-transparent',
        tag: 'Fullstack'
    },
    {
        id: 'javascript',
        title: 'Advanced JavaScript',
        icon: '📜',
        desc: 'V8 internals, async, performance, closures, and debugging drills.',
        accent: 'from-amber-500/20 via-orange-500/10 to-transparent',
        tag: 'Core'
    },
    {
        id: 'angular',
        title: 'Angular 21 Mastery',
        icon: '🅰️',
        desc: 'Signals, RxJS, routing, SSR, and interview-ready architecture.',
        accent: 'from-red-500/20 via-pink-500/10 to-transparent',
        tag: 'Frontend'
    },
    {
        id: 'html',
        title: 'Semantic HTML Pro',
        icon: '🧱',
        desc: 'Semantics, accessibility-first structure, forms, media, tables, and SEO foundations.',
        accent: 'from-emerald-500/20 via-teal-500/10 to-transparent',
        tag: 'Foundation'
    },
    {
        id: 'css',
        title: 'Modern CSS Systems',
        icon: '🎨',
        desc: 'Cascade, layout, responsive systems, tokens/theming, animation, performance, and architecture.',
        accent: 'from-sky-500/20 via-indigo-500/10 to-transparent',
        tag: 'Foundation'
    },
    {
        id: 'typescript',
        title: 'TypeScript Mastery',
        icon: '📘',
        desc: 'From basic types to advanced generics, utility types, and building type-safe systems.',
        accent: 'from-blue-600/20 via-indigo-600/10 to-transparent',
        tag: 'Language'
    },
    {
        id: 'zustand',
        title: 'Zustand State',
        icon: '🐻',
        desc: 'Master the minimalist state manager. Hooks, slices, middleware, and performance optimization.',
        accent: 'from-yellow-800/20 via-orange-800/10 to-transparent',
        tag: 'State'
    },
    {
        id: 'redux',
        title: 'Redux Toolkit',
        icon: '⚛️',
        desc: 'Enterprise state management. RTK, Slices, AsyncThunks, RTK Query, and scalable architecture.',
        accent: 'from-purple-600/20 via-violet-600/10 to-transparent',
        tag: 'State'
    },
];

import { MeteorBackground } from '../components/ui/MeteorBackground';

export default function DashboardPage() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    // Mock initial stats
    const [stats, setStats] = useState({
        xp: 2450,
        streak: 12,
        tutorials: 24,
        level: 8,
        rank: 'Code Artisan'
    });
    const [isPro, setIsPro] = useState(false);
    const [isTrial, setIsTrial] = useState(false);
    const [trialDaysLeft, setTrialDaysLeft] = useState(0);
    const [planResolved, setPlanResolved] = useState(false);
    const [learningPath, setLearningPath] = useState('none');
    const [progressData, setProgressData] = useState(null);
    const [showDevCard, setShowDevCard] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            let data;
            if (!session?.user?.email) return;

            try {
                const res = await fetch('/api/user/progress');
                if (res.ok) {
                    data = await res.json();

                    setStats({
                        xp: data.xp || 0,
                        streak: data.streak?.count || 0,
                        tutorials: data.completedTutorialsCount || 0,
                        level: Math.floor((data.xp || 0) / 1000) + 1,
                        rank: (data.xp || 0) > 5000 ? 'Code Sorcerer' : 'Code Artisan'
                    });

                    if (data.learningPath && data.learningPath !== 'none') {
                        setLearningPath(data.learningPath);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch user data', error);
            } finally {
                setLoading(false);
                setPlanResolved(true);
            }

            // Set Pro status based on API response
            console.log("data ---", data)
            const isProUser = data?.plan.includes("pro") || data?.activePro === true;
            setIsPro(isProUser);
            setIsTrial(data?.plan === 'trial');
            setTrialDaysLeft(data?.trialDaysLeft || 0);
            setProgressData(data);
        };

        fetchUserData();
    }, [session]);

    const handleChangeMajor = () => {
        // Scroll to learning paths section
        const element = document.getElementById('learning-paths');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 500, behavior: 'smooth' });
        }
    };

    const handleSelectPath = async (pathId) => {
        setLearningPath(pathId);

        try {
            await fetch('/api/user/path', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: pathId })
            });
            // window.location.reload(); // Removed to prevent blocking navigation
        } catch (error) {
            console.error('Failed to update path', error);
        }
    };

    const [greeting, setGreeting] = useState('Good Morning');

    useEffect(() => {
        const hour = new Date().getHours();
        setGreeting(hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening');
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 text-gray-900 dark:bg-dark-900 dark:text-gray-100 font-sans relative overflow-hidden">
            <MeteorBackground />
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    {/* Header Row */}
                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-8">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                                {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-500">
                                    {session?.user?.name || 'Student'}
                                </span>
                            </h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                                Ready to level up your skills today?
                            </p>
                        </div>

                        <div className="w-full xl:w-auto flex items-center justify-between xl:justify-end gap-4">
                            <StatsBar stats={stats} loading={loading} />

                            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>

                            <Link href="/dashboard/settings">
                                <button className="p-2 rounded-full bg-white dark:bg-dark-800 text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-dark-700 transition-colors shadow-sm">
                                    <Settings size={20} />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Premium Tools Hero Grid - The "Command Center" */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <PremiumAction
                            icon={Trophy}
                            label="YOUR DEV CARD"
                            gradient="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600"
                            shadow="shadow-purple-500/10 hover:shadow-purple-500/25"
                            onClick={() => setShowDevCard(true)}
                            delay={0.1}
                        />

                        <PremiumAction
                            href="/interview/mock"
                            icon={Mic}
                            label="AI INTERVIEW"
                            gradient="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500"
                            shadow="shadow-blue-500/10 hover:shadow-blue-500/25"
                            delay={0.2}
                        />

                        <PremiumAction
                            href="/resume-audit"
                            icon={BookOpen}
                            label="RESUME AUDIT"
                            gradient="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
                            shadow="shadow-emerald-500/10 hover:shadow-emerald-500/25"
                            delay={0.3}
                        />

                        <PremiumAction
                            href="/system-design"
                            icon={Layers}
                            label="SYSTEM DESIGN"
                            gradient="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500"
                            shadow="shadow-orange-500/10 hover:shadow-orange-500/25"
                            delay={0.4}
                        />
                    </div>
                </motion.div>




                {/* New Feature CTA */}
                <CareerGoalsCTA />

                {/* 1. The Daily Focus */}
                <DailyFocus
                    session={session}
                    stats={stats}
                    isPro={isPro}
                    isTrial={isTrial}
                    trialDaysLeft={trialDaysLeft}
                    handleChangeMajor={handleChangeMajor}
                    hasActivePath={learningPath !== 'none' && learningPath !== null}
                    learningPath={learningPath}
                    progressData={progressData}
                />

                {/* 2. Choose Major (Learning Paths) */}
                <LearningPaths
                    paths={PATHS}
                    isPro={isPro}
                    handleSelectPath={handleSelectPath}
                    loading={loading}
                />

                {/* 3. Living Roadmap (Restored) */}
                <LivingRoadmap isPro={isPro} />

                {/* 4. Upgrade Banner (Restored) */}
                <UpgradeBanner isPro={isPro} isTrial={isTrial} planResolved={planResolved} />

                {/* 5. Career Simulator (Restored) */}
                <CareerSimulator isPro={isPro} />

                {/* 6. Career Prep (Interview Hub) */}
                <CareerPrep isPro={isPro} />

                {/* 7. Certifications */}
                <Certifications isPro={isPro} />

                {/* 8. Milestones & Continue Learning (Restored) */}
                <Milestones stats={stats} />

                {/* 9. XP Guide (Restored) */}
                <XPGuide />

                {/* Dev Card Modal */}
                {showDevCard && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="relative">
                            <button
                                onClick={() => setShowDevCard(false)}
                                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
                            >
                                Close
                            </button>
                            <DevCardLoader stats={stats} user={session?.user || { name: 'Guest User' }} activeGoal="Fullstack Mastery" />
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}

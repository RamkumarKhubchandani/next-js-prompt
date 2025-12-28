"use client";
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Settings } from 'lucide-react';
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
                    className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                    <div>
                        <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
                            {greeting},
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-500">
                                {session?.user?.name || 'Student'}
                            </span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">Ready to level up your skills today?</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Stats Bar Integrated Here */}
                        <StatsBar stats={stats} loading={loading} />

                        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>

                        <Link href="/dashboard/settings">
                            <button className="p-2 rounded-full bg-white dark:bg-dark-800 text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-dark-700 transition-colors">
                                <Settings size={20} />
                            </button>
                        </Link>
                    </div>
                </motion.div>

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

            </div>
        </div>
    );
}

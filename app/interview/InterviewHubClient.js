'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '../components/Header';
import { ArrowRight, ArrowLeft, Code2, Database, Globe, Hash, Layers, Layout, Lock, Sparkles, Terminal, Zap } from 'lucide-react';

const TRACKS = [
    {
        id: 'typescript',
        title: 'TypeScript Mastery',
        description: 'Advanced Types, Generics, Utility Types, and Real World Patterns.',
        icon: <Hash size={32} />,
        color: 'from-blue-600 to-indigo-700',
        textColor: 'text-blue-600',
        available: true,
        count: '50+ Questions'
    },
    {
        id: 'javascript',
        title: 'JavaScript Deep Dive',
        description: 'Closures, Prototypes, Async/Await, Coercion, and V8 Internals.',
        icon: <Terminal size={32} />,
        color: 'from-yellow-400 to-orange-500',
        textColor: 'text-yellow-500',
        available: true,
        count: '100+ Questions'
    },
    {
        id: 'react',
        title: 'React Architecture',
        description: 'Hooks, Fiber, Reconciliation, SSR vs CSR, and Performance.',
        icon: <Code2 size={32} />,
        color: 'from-cyan-400 to-blue-500',
        textColor: 'text-cyan-500',
        available: true,
        count: '100+ Questions'
    },
    {
        id: 'html-css',
        title: 'HTML & CSS Mastery',
        description: 'Semantic HTML5, Advanced CSS, Grid/Flexbox, Accessibility, and Responsive Design.',
        icon: <Globe size={32} />,
        color: 'from-orange-400 to-blue-500',
        textColor: 'text-orange-500',
        available: true,
        count: '75+ Questions'
    },
    {
        id: 'angular',
        title: 'Angular Concepts',
        description: 'DI, RxJS, Change Detection, Signals, and Real Interview Questions.',
        icon: <Layers size={32} />,
        color: 'from-red-500 to-pink-600',
        textColor: 'text-red-500',
        available: true,
        count: '125+ Questions'
    },
    {
        id: 'zustand',
        title: 'Zustand Mastery',
        description: 'Store configuration, Selectors, Middleware, Async actions, and Scaling.',
        icon: <Zap size={32} />,
        color: 'from-emerald-400 to-green-500',
        textColor: 'text-emerald-500',
        available: true,
        count: '15+ Questions'
    },
    {
        id: 'fullstack',
        title: 'Fullstack Systems',
        description: 'Node.js Event Loop, Scalability, DB Design, and CAP Theorem.',
        icon: <Database size={32} />,
        color: 'from-purple-400 to-pink-500',
        textColor: 'text-purple-500',
        available: false,
        count: 'Coming Soon'
    }
];

export default function InterviewHub() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-white">
            <Header />

            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors font-medium">
                        <ArrowLeft size={16} /> Back to Dashboard
                    </Link>
                </div>
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20 mb-6"
                    >
                        <Sparkles size={16} />
                        Ace Your Next Interview
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
                    >
                        Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Interview</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        Curated deep-dive questions, code challenges, and expert explanations to help you crack technical interviews at top tier companies.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TRACKS.map((track, index) => (
                        <motion.div
                            key={track.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (index + 3) }}
                        >
                            <Link href={track.available ? `/interview/${track.id}` : '#'} className={`block h-full ${!track.available ? 'cursor-not-allowed' : ''}`}>
                                <div className={`relative h-full bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-200 dark:border-dark-700 transition-all duration-300 ${track.available ? 'hover:shadow-xl hover:-translate-y-1 hover:border-amber-500/30' : 'opacity-70 grayscale'}`}>
                                    {/* Gradient Background Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 ${track.available ? 'group-hover:opacity-5 transition-opacity' : ''} rounded-2xl`} />

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`w-14 h-14 rounded-xl bg-gray-50 dark:bg-dark-700 flex items-center justify-center ${track.textColor}`}>
                                                {track.icon}
                                            </div>
                                            {!track.available && (
                                                <span className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-500 text-xs font-bold uppercase rounded-full flex items-center gap-1">
                                                    <Lock size={12} /> Coming Soon
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-2xl font-bold mb-3">{track.title}</h2>
                                        <p className="text-gray-500 dark:text-gray-400 mb-6 min-h-[48px]">
                                            {track.description}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-dark-700 pt-4">
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                {track.count}
                                            </span>
                                            {track.available && (
                                                <span className={`flex items-center gap-2 font-bold ${track.textColor}`}>
                                                    Start <ArrowRight size={16} />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}

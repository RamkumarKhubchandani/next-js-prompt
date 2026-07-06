"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Home, BookOpen, Compass } from 'lucide-react';
import { Logo } from './components/Logo';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-light-100 text-dark-900 dark:bg-[#050505] dark:text-light-100 font-sans flex flex-col justify-between relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] -z-10 animate-pulse delay-1000 pointer-events-none" />

            {/* Header */}
            <header className="px-6 py-6 border-b border-dark-700/10 dark:border-dark-700/40 bg-white/20 dark:bg-black/20 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-6 py-16">
                <div className="max-w-lg w-full text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-24 rounded-3xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mx-auto mb-8 text-brand-primary shadow-xl shadow-brand-primary/5"
                    >
                        <AlertCircle size={48} className="animate-bounce" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl font-black mb-4 tracking-tight"
                    >
                        404
                    </motion.h1>

                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200"
                    >
                        Page Not Found
                    </motion.h2>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-slate-650 dark:text-slate-400 mb-10 leading-relaxed text-sm"
                    >
                        We couldn't find the page you're looking for. The link might be broken, or the page has been moved. Explore our tools below to get back on track.
                    </motion.p>

                    {/* Navigation Options */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col gap-4"
                    >
                        <Link href="/">
                            <button className="w-full py-4 bg-brand-primary text-dark-900 font-extrabold rounded-2xl hover:shadow-[0_0_30px_rgba(0,245,160,0.4)] transition-all flex items-center justify-center gap-2">
                                <Home size={18} />
                                Back to Homepage
                            </button>
                        </Link>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/dashboard">
                                <button className="w-full py-3.5 border-2 border-slate-200 dark:border-dark-700 bg-white/5 hover:bg-white/10 dark:hover:bg-dark-800 text-slate-850 dark:text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-xs">
                                    <Compass size={16} />
                                    Dashboard
                                </button>
                            </Link>
                            <Link href="/mentorship">
                                <button className="w-full py-3.5 border-2 border-slate-200 dark:border-dark-700 bg-white/5 hover:bg-white/10 dark:hover:bg-dark-800 text-slate-850 dark:text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-xs">
                                    <BookOpen size={16} />
                                    Find a Mentor
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-slate-400 border-t border-dark-700/10 dark:border-dark-700/40">
                <p>&copy; {new Date().getFullYear()} OutlineDev. All rights reserved.</p>
            </footer>
        </div>
    );
}

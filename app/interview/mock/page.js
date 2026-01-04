"use client";
import VoiceInterviewer from '@/app/components/interview/VoiceInterviewer';
import { Header } from '@/app/components/Header';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function MockInterviewPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-slate-900 dark:text-white font-sans selection:bg-brand-primary/30">
            <Header />
            <main className="pt-24 pb-12 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] dark:opacity-[0.03] pointer-events-none" />

                <div className="relative z-10 px-4">
                    <div className="max-w-6xl mx-auto mb-6">
                        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                            <ChevronLeft size={20} />
                            <span className="font-medium">Back to Dashboard</span>
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-0"
                    >
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                            AI Interview Simulator
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                            Practice real Google L4/L5 questions with our AI. Speak your answers naturally and get instant, brutally honest feedback.
                        </p>
                    </motion.div>

                    <VoiceInterviewer />
                </div>
            </main>
        </div>
    );
}

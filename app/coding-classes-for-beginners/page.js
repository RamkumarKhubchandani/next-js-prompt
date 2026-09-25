import React from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
    CheckCircle2, 
    ArrowRight, 
    Sparkles, 
    Users, 
    Laptop, 
    Clock, 
    MessageSquare, 
    Star 
} from 'lucide-react';

export const metadata = {
    title: 'Coding Classes for Beginners | 1-on-1 Online Programming Lessons | OutlineDev',
    description: 'Start learning to code from scratch with personalized 1-on-1 online coding classes for beginners. Master HTML, CSS, JavaScript, React, and Python with live mentorship.',
    keywords: [
        'coding classes for beginners',
        'learn to code for beginners',
        'beginner programming course',
        '1 on 1 coding classes',
        'online coding tutor for beginners',
        'start coding from scratch',
        'python for beginners',
        'web development beginner classes'
    ],
    alternates: {
        canonical: 'https://www.outlinedev.com/coding-classes-for-beginners',
    },
    openGraph: {
        title: 'Coding Classes for Beginners | 1-on-1 Mentorship | OutlineDev',
        description: 'Personalized 1-on-1 online programming lessons designed for absolute beginners. Learn at your own pace with senior software engineers.',
        url: 'https://www.outlinedev.com/coding-classes-for-beginners',
        images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'],
    }
};

export default function CodingClassesForBeginnersPage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white selection:bg-brand-primary selection:text-slate-900">
            <Header />

            <main className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Ambience */}
                <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-brand-primary/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/10 blur-[140px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Hero Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
                            <Sparkles size={14} />
                            Zero Coding Experience Required
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                            Personalized 1-on-1 <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-emerald-300 to-teal-400">
                                Coding Classes for Beginners
                            </span>
                        </h1>

                        <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Stop getting stuck in tutorial hell. Learn to build real web applications from scratch with live, 1-on-1 screen-sharing guidance from senior developers.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/mentorship"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-slate-900 bg-brand-primary hover:bg-emerald-400 shadow-xl shadow-brand-primary/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                            >
                                <span>Book Free 1:1 Intro Session</span>
                                <ArrowRight size={18} />
                            </Link>

                            <a
                                href="https://wa.me/918237320942?text=Hi%2C%20I%20am%20interested%20in%20coding%20classes%20for%20beginners."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-white bg-[#25D366] hover:bg-[#1ebe5d] shadow-xl shadow-green-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                            >
                                <MessageSquare size={18} />
                                Chat on WhatsApp
                            </a>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-400 border-t border-slate-800/80 pt-6">
                            <div className="flex items-center justify-center gap-2">
                                <Users size={16} className="text-brand-primary" />
                                <span>100% 1-on-1 Attention</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Laptop size={16} className="text-brand-primary" />
                                <span>Hands-on Project Building</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Clock size={16} className="text-brand-primary" />
                                <span>Flexible Weekend / Evening Slots</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Star size={16} className="text-brand-primary" />
                                <span>4.9/5 Rating (Verified Reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="my-20">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Learn with a 1-on-1 Mentor?</h2>
                            <p className="mt-3 text-sm text-slate-400">The fastest and least frustrating way for beginners to learn programming.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4 font-bold">1</div>
                                <h3 className="text-lg font-bold text-white mb-2">Learn at Your Own Pace</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">No rushed group classes or rigid deadlines. Ask as many questions as you need until every core concept clicks.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4 font-bold">2</div>
                                <h3 className="text-lg font-bold text-white mb-2">Live Pair-Programming</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">Share your screen over Google Meet or Zoom. Your mentor watches you write code, correcting mistakes in real time.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4 font-bold">3</div>
                                <h3 className="text-lg font-bold text-white mb-2">Portfolio-Ready Projects</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">Instead of toy examples, build functional websites and tools that you can proudly showcase on your GitHub and resume.</p>
                            </div>
                        </div>
                    </div>

                    {/* TODO: insert real beginner course structure once provided */}

                    {/* Final CTA Card */}
                    <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 text-center relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                                Ready to write your first line of code?
                            </h2>
                            <p className="text-slate-300 text-sm sm:text-base mb-8">
                                Connect with our lead mentor to discuss your goals, learning style, and custom roadmap.
                            </p>
                            <Link
                                href="/mentorship"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-extrabold text-slate-900 bg-brand-primary hover:bg-emerald-400 shadow-xl shadow-brand-primary/25 transition-all text-sm"
                            >
                                <span>Get Started with 1:1 Mentorship</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

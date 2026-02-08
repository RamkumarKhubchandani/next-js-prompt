"use client";
import React from 'react';
import { Code, CheckCircle, Github, MessageSquare, ArrowRight, Shield, Zap, Layers, Terminal, Star } from 'lucide-react';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';

export default function CodeReviewPage() {

    const openConnectModal = () => {
        const event = new CustomEvent('open-connect-modal-global', {
            detail: {
                headline: "Expert Code Review",
                subhead: "Submit your PR or repo link. We'll analyze your code for security, performance, and best practices.",
                defaultNotes: "I'd like a review for my [React/Node/etc] project...",
                ctaLabel: "Request Code Review"
            }
        });
        window.dispatchEvent(event);
    };

    const testimonials = [
        {
            name: "Alex Rivera",
            role: "Frontend Dev at Startup Inc",
            text: "I thought my React code was clean until the OutlineDev team reviewed it. They found 3 major performance bottlenecks and a security flaw I missed. Best investment ever.",
            image: "https://randomuser.me/api/portraits/men/33.jpg"
        },
        {
            name: "Emily Zhang",
            role: "Junior Engineer",
            text: "It's like having a Staff Engineer looking over your shoulder. The feedback wasn't just 'fix this', it was 'here is why this is bad and how to do it better'. Learned so much.",
            image: "https://randomuser.me/api/portraits/women/26.jpg"
        },
        {
            name: "Michael Scott",
            role: "Full Stack Developer",
            text: "The detailed breakdown of my API structure helped me refactor my entire backend. Now it's scalable and much easier to maintain.",
            image: "https://randomuser.me/api/portraits/men/55.jpg"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#050510] relative text-slate-900 dark:text-slate-100 font-sans">
            <Header />

            <main className="relative pt-32 pb-20 px-6">

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-32">

                    <div className="space-y-8 animate-fade-in-up order-2 md:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest">
                            <Code size={14} />
                            Code Hygiene
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black leading-tight">
                            Stop Shipping <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Spaghetti Code</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                            Get your PRs reviewed by Senior Engineers within 24 hours. We catch bugs, suggest architectural improvements, and help you write production-grade code that scales.
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Security Vulnerability Checks (OWASP Top 10)',
                                'Performance Optimization & Memoization',
                                'Clean Code & SOLID Principles',
                                'Scalable Folder Structure Review'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-200">
                                    <CheckCircle className="text-green-500 shrink-0" size={20} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4 flex flex-wrap gap-4">
                            <button
                                onClick={openConnectModal}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-600/25"
                            >
                                Request a Review
                                <ArrowRight size={18} />
                            </button>
                            <div className="flex items-center gap-[-10px]">
                                <div className="flex -space-x-3">
                                    {testimonials.map((t, i) => (
                                        <img key={i} src={t.image} alt={t.name} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" />
                                    ))}
                                </div>
                                <span className="ml-4 text-sm font-bold text-slate-500">Loved by 500+ devs</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl relative group hover:border-slate-700 transition-colors order-1 md:order-2">
                        {/* Abstract BG decorations */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4 relative z-10">
                            <Github className="text-slate-400" />
                            <span className="text-slate-400 font-mono text-sm">PR #429: Refactor Auth Flow</span>
                        </div>
                        <div className="space-y-4 font-mono text-sm relative z-10">
                            <div className="p-3 bg-red-500/10 border-l-4 border-red-500 text-red-200 opacity-70">
                                - const token = localStorage.getItem('token');
                            </div>
                            <div className="p-3 bg-green-500/10 border-l-4 border-green-500 text-green-200">
                                + const token = await secureStorage.getToken();
                            </div>
                            <div className="mt-4 flex gap-3 animate-pulse-slow">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">SR</div>
                                <div className="bg-slate-800 p-3 rounded-xl rounded-tl-none border border-slate-700 text-slate-300 shadow-sm">
                                    <p className="mb-2">Avoid direct localStorage access. It's vulnerable to XSS. Use the secure storage wrapper we discussed.</p>
                                    <div className="text-xs text-slate-500">Just now</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Features Grid */}
                <div className="max-w-7xl mx-auto mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4">What We Look For</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">We don't just lint your code. We provide a deep architectural analysis.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Shield, title: "Security", desc: "Identify XSS, CSRF, and injection vulnerabilities before deployment." },
                            { icon: Zap, title: "Performance", desc: "Spot unnecessary re-renders, memory leaks, and unoptimized queries." },
                            { icon: Layers, title: "Architecture", desc: "Ensure your component hierarchy and state management are scalable." },
                            { icon: Terminal, title: "Best Practices", desc: "Enforce consistent naming, error handling, and modern ES6+ usage." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-colors group">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">Developer Love</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 relative">
                                <div className="flex gap-1 text-orange-400 mb-4">
                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 mb-6 italic">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <div className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</div>
                                        <div className="text-xs text-slate-500 font-bold uppercase">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}

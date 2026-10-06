"use client";
import React from 'react';
import { Code, CheckCircle, Github, ArrowRight, Shield, Zap, Layers, Terminal, MessageSquare } from 'lucide-react';
import { Header } from '../components/Header';

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
                            OutlineDev Code Review provides PR auditing and code analysis. Submit your repository or pull request link, and our senior engineers will analyze your code for security vulnerabilities, performance bottlenecks, and architectural optimizations.
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
                        <div className="pt-4 flex flex-wrap gap-4 items-center">
                            <button
                                onClick={openConnectModal}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-600/25"
                            >
                                Request a Review
                                <ArrowRight size={18} />
                            </button>
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

                {/* Honest Early Client Section */}
                <div className="max-w-4xl mx-auto text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 md:p-16 shadow-lg shadow-slate-200/50 dark:shadow-none">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-6">
                        <MessageSquare size={32} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-4">Be One of Our First Code Review Clients</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
                        Submit your repository or pull request today. Get actionable feedback on performance, code structure, and security directly from experienced engineers.
                    </p>
                    <button
                        onClick={openConnectModal}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-600/25"
                    >
                        Submit Your Code for Review
                        <ArrowRight size={18} />
                    </button>
                </div>

            </main>
        </div>
    );
}

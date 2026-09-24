import React from 'react';
import Link from 'next/link';
import { 
    Download, 
    CheckCircle2, 
    BookOpen, 
    Code2, 
    Sparkles, 
    Zap, 
    ShieldCheck, 
    MessageSquare, 
    ArrowRight, 
    Laptop, 
    Layers, 
    Cpu, 
    Check, 
    FileText, 
    Star 
} from 'lucide-react';

export const metadata = {
    title: "2026 Senior Developer Toolkit & Next.js 15 Architecture Cheatsheet | OutlineDev",
    description: "Instant access to the 2026 Senior Frontend & Next.js Architecture Cheatsheet, FAANG Interview Questions, and 1:1 Code Audit diagnostic checklist.",
};

const CHEATSHEET_TOPICS = [
    {
        title: "1. React 19 & Next.js 15 Architecture Mastery",
        icon: Code2,
        points: [
            "Server Components (RSC) vs Client Components boundary design: Keep data fetching and heavy libraries on the server to achieve 0kb client bundle overhead.",
            "React 19 Actions & 'use actionState': Eliminate manual isLoading/error states with native asynchronous transitions.",
            "Next.js 15 Caching Paradigm: Explicit opt-in caching with 'use cache' directive, replacing automatic fetch caching.",
            "Streaming SSR & Suspense boundaries: Prioritize critical UI rendering and stream slow database/API payloads progressively.",
            "Hydration Optimization: Eliminate layout shifts (CLS < 0.1) and reduce Total Blocking Time (TBT < 100ms)."
        ]
    },
    {
        title: "2. Top Senior Frontend & System Design Topics",
        icon: Layers,
        points: [
            "Micro-Frontends & Module Federation: When to decouple apps and when monolithic modular architecture wins.",
            "State Management in 2026: Zustand vs Server State (TanStack Query / SWR) — avoiding prop drilling without global store bloat.",
            "Real-Time Data Pipelines: WebSockets vs Server-Sent Events (SSE) for scalable live notifications and chat.",
            "Security Hardening: Content Security Policy (CSP), CSRF protection, HttpOnly cookie authentication, and secure JWT rotation.",
            "Core Web Vitals Checklist: INP (Interaction to Next Paint < 200ms), LCP (< 2.5s), and responsive asset preloading."
        ]
    },
    {
        title: "3. FAANG Technical Interview Preparation (50 Core Questions)",
        icon: BookOpen,
        points: [
            "Deep Javascript Internals: Event loop microtasks vs macrotasks, Garbage Collection (V8 hidden classes), and Closures memory management.",
            "Custom Hook Design: Building resilient, debounced, retry-enabled async hooks with abort controller cancellation.",
            "Polyfill Implementations: Promise.allSettled, deepClone with Circular Reference handling, and Array.flat.",
            "Frontend Architecture Whiteboarding: Designing Netflix / Figma / Google Docs UI architecture at scale.",
            "Debugging Live Production Issues: Memory leak profiling with Chrome DevTools heap snapshots."
        ]
    },
    {
        title: "4. Free 15-Minute Live Code Audit Checklist",
        icon: Zap,
        points: [
            "Identify 3 immediate performance bottlenecks in your current project or portfolio codebase.",
            "Review component architecture and eliminate redundant re-renders with React DevTools profiler.",
            "Career & Resume Blueprint: Reframing junior/mid-level bullets into high-impact Senior Engineering achievements.",
            "Direct 1-on-1 feedback with Staff Engineer Ramkumar."
        ]
    }
];

export default function DeveloperToolkitPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-brand-primary selection:text-black">
            {/* Background Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-primary/10 blur-[140px] rounded-full" />
                <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Header Badge */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/15 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider shadow-inner">
                        <Sparkles size={14} />
                        Official 2026 Developer Toolkit & Cheatsheet
                    </div>
                </div>

                {/* Hero Title */}
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                        Senior Developer Toolkit & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-emerald-300 to-teal-400">
                            Architecture Cheatsheet (2026 Edition)
                        </span>
                    </h1>
                    <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                        Curated by Senior Staff Engineers to help you master React 19, Next.js 15, Frontend System Design, and crack Senior FAANG Technical Interviews.
                    </p>
                </div>

                {/* Quick Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <a
                        href="https://wa.me/918237320942?text=Hi%20Ram%2C%20I%20have%20opened%20the%202026%20Developer%20Toolkit%20and%20would%20like%20to%20schedule%20my%20free%2015-minute%20code%20audit."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#1ebe5d] transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/30"
                    >
                        <MessageSquare size={17} />
                        Claim Free 15-Min Code Audit on WhatsApp
                    </a>

                    <Link
                        href="/mentorship"
                        className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-900 bg-brand-primary hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-lg shadow-brand-primary/20"
                    >
                        <Laptop size={17} />
                        Explore 1:1 Mentorship Program
                    </Link>
                </div>

                {/* Main Cheatsheet Grid */}
                <div className="mt-14 space-y-8">
                    {CHEATSHEET_TOPICS.map((section, idx) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden backdrop-blur-md"
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary shrink-0">
                                        <Icon size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">
                                        {section.title}
                                    </h2>
                                </div>

                                <div className="space-y-3.5">
                                    {section.points.map((pt, pIdx) => (
                                        <div key={pIdx} className="flex items-start gap-3 text-sm text-slate-300">
                                            <CheckCircle2 size={18} className="text-brand-primary shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{pt}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Interactive Diagnostic Checklist */}
                <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-brand-primary/30 rounded-3xl p-8 shadow-2xl text-center">
                    <div className="inline-flex p-3 rounded-2xl bg-brand-primary/20 text-brand-primary mb-4">
                        <Cpu size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                        Ready to audit your code & level up your salary?
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
                        Book your free 1-on-1 sprint review with Ramkumar. We will review your GitHub repository, optimize your architecture, and build a tailored career roadmap.
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <a
                            href="https://wa.me/918237320942?text=Hi%20Ram%2C%20I%20reviewed%20the%202026%20Toolkit%20and%20want%20to%20schedule%20my%201:1%20diagnostic%20session."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-xl font-black text-slate-900 bg-gradient-to-r from-brand-primary via-emerald-400 to-brand-primary hover:opacity-95 transition-all text-sm flex items-center gap-2 shadow-xl shadow-brand-primary/30"
                        >
                            <MessageSquare size={18} />
                            Schedule 1:1 Live Review with Ram
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>

                {/* Footer link */}
                <div className="mt-12 text-center text-xs text-slate-500">
                    <p>© 2026 OutlineDev Mentorship Platform. All Rights Reserved.</p>
                    <div className="mt-2 flex justify-center gap-4 text-slate-400">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>•</span>
                        <Link href="/mentorship" className="hover:text-white transition-colors">1:1 Mentorship</Link>
                        <span>•</span>
                        <Link href="/job-support" className="hover:text-white transition-colors">Job Support</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

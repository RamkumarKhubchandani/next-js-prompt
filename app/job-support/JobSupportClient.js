"use client";

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import ConnectOneToOneModal from '../components/public/ConnectOneToOneModal';
import GoogleReviewsSection from '../components/public/GoogleReviewsSection';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
    Zap,
    Shield,
    Clock,
    CheckCircle,
    ArrowRight,
    MessageSquare,
    PhoneCall,
    Terminal,
    Bug,
    GitPullRequest,
    Users,
    Sparkles,
    Star,
    Layers,
    Cpu,
    HelpCircle,
    ChevronDown,
    Lock
} from 'lucide-react';

const SUPPORTED_STACKS = [
    { name: "React / Next.js", desc: "Hooks, RSC, App Router, SSR, Zustand, Redux", icon: "⚛️" },
    { name: "TypeScript / JavaScript", desc: "Types, Generics, Event Loop, Closures, Async", icon: "🟦" },
    { name: "Node.js & Express", desc: "REST, WebSockets, Streams, Microservices, Auth", icon: "🟢" },
    { name: "MongoDB & PostgreSQL", desc: "Aggregations, Indexes, Schema Design, Prisma", icon: "🍃" },
    { name: "Playwright & Cypress", desc: "E2E Test Automation, Flaky Mitigations, CI/CD", icon: "🎭" },
    { name: "Angular & Vue / Svelte", desc: "RxJS, Signals, Pinia, Composition API, Runes", icon: "🅰️" },
    { name: "HTML5, CSS & Tailwind", desc: "Responsive Layouts, Design Systems, Animations", icon: "🎨" },
    { name: "DevOps & Cloud (Docker/AWS)", desc: "Dockerfiles, CI/CD Actions, Vercel, ECS", icon: "🐳" }
];

const USE_CASES = [
    {
        icon: Bug,
        title: "Urgent Bug & Blocker Resolution",
        desc: "Stuck on an obscure production error, memory leak, or broken test suite? We share screen and solve it live in minutes."
    },
    {
        icon: GitPullRequest,
        title: "Sprint Tasks & PR Reviews",
        desc: "Deliver your assigned Jira stories on time. We review your architecture, clean up code, and ensure PR approvals."
    },
    {
        icon: Users,
        title: "Daily Standup & Tech Alignment",
        desc: "Never feel anxious in engineering standups. We help you articulate blockers, explain solutions, and plan daily deliverables."
    },
    {
        icon: Terminal,
        title: "New Job & Tech Stack Onboarding",
        desc: "Joined a new company with an unfamiliar codebase? Get a senior mentor to guide your onboarding and codebase walkthrough."
    }
];

const PRICING_TIERS = [
    {
        name: "Pay-As-You-Go",
        tag: "Instant Fix",
        price: "$35",
        unit: "/ hour",
        desc: "Best for immediate blockers, quick PR reviews, or one-off debugging sessions.",
        features: [
            "Connect within 30 minutes",
            "1-on-1 live screen share (Google Meet / Zoom)",
            "Step-by-step root cause explanation",
            "Zero monthly commitment",
            "100% Confidential & NDA Protected"
        ],
        cta: "Book Instant Session",
        popular: false
    },
    {
        name: "Sprint Deliveries",
        tag: "Most Popular",
        price: "$199",
        unit: "/ 8 hours",
        desc: "Ideal for handling a tough 2-week sprint with continuous guidance and PR prep.",
        features: [
            "Dedicated Senior Staff Mentor",
            "Priority same-day scheduling",
            "Daily standup prep & advice",
            "Direct WhatsApp / Slack async support",
            "Code architecture reviews",
            "Roll over unused hours"
        ],
        cta: "Start Sprint Support",
        popular: true
    },
    {
        name: "Monthly Retainer",
        tag: "Complete Peace of Mind",
        price: "$499",
        unit: "/ month",
        desc: "Dedicated personal staff engineer in your corner for all your daily job needs.",
        features: [
            "Up to 25 live hours / month",
            "Unlimited WhatsApp / Slack Q&A",
            "Daily sprint task breakdown",
            "Mock dry-run for engineering demos",
            "Quarterly appraisal & promotion roadmap",
            "Priority weekend availability"
        ],
        cta: "Hire Dedicated Mentor",
        popular: false
    }
];

const FAQS = [
    {
        q: "How fast can I connect with a mentor when I have a blocker?",
        a: "Our global mentors are on standby across US, UK, and APAC time zones. For urgent issues, we connect within 15 to 30 minutes via Google Meet or Zoom."
    },
    {
        q: "Is my company code and IP safe and confidential?",
        a: "Absolutely. We adhere to strict confidentiality standards. We never record sessions without your permission, and we can sign standard Non-Disclosure Agreements (NDAs). You can also anonymize company names or use sample data during sessions."
    },
    {
        q: "What if my bug is not resolved in the first session?",
        a: "We only charge for productive, actionable support. If we determine an issue requires deeper investigation outside the call, you are never charged for inactive time."
    },
    {
        q: "Can you help me prepare for daily engineering standups?",
        a: "Yes! Many developers use our morning 15-minute quick-syncs to summarize what was done, articulate technical blockers clearly, and gain 100% confidence before speaking with their engineering managers."
    },
    {
        q: "Which payment methods are supported?",
        a: "We accept all major credit cards, Stripe, PayPal, UPI, and international wire transfers with instant invoicing."
    }
];

export default function JobSupportClient() {
    const { data: session } = useSession();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStack, setSelectedStack] = useState("React / Next.js");
    const [activeFaq, setActiveFaq] = useState(null);

    const openBooking = (customNote = '') => {
        setModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white selection:bg-brand-primary selection:text-slate-900">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/15 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary" />
                            </span>
                            Live On-The-Job Sprint & Bug Support
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                            Never Get Stuck on a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-emerald-300 to-teal-400">
                                Jira Ticket or Blocker Again
                            </span>
                        </h1>

                        <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Live 1-on-1 screen-sharing with Senior Staff Engineers. Fix production bugs, ship complex features, and pass daily standups with total confidence.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => openBooking()}
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-slate-900 bg-brand-primary hover:bg-emerald-400 shadow-xl shadow-brand-primary/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                            >
                                <Zap size={20} className="fill-current" />
                                Get Instant Help (Under 30 Mins)
                            </button>

                            <a
                                href="https://wa.me/918237320942?text=Hi%2C%20I%20need%20urgent%20on-the-job%20IT%20support%20for%20my%20sprint%20task."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-white bg-[#25D366] hover:bg-[#1ebe5d] shadow-xl shadow-green-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                            >
                                <MessageSquare size={20} />
                                Chat on WhatsApp
                            </a>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-400 border-t border-slate-800/80 pt-6">
                            <div className="flex items-center justify-center gap-2">
                                <Clock size={16} className="text-brand-primary" />
                                <span>Avg Response: 18 Mins</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Shield size={16} className="text-brand-primary" />
                                <span>100% NDA Protected</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Star size={16} className="text-brand-primary" />
                                <span>4.9/5 Rating (500+ Devs)</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Lock size={16} className="text-brand-primary" />
                                <span>Strict IP Confidentiality</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Grid */}
            <section className="py-20 bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            How We Help You Win at Work
                        </h2>
                        <p className="mt-4 text-slate-400">
                            Whether you're facing tight deadlines or complex architectures, we provide senior pair-programming when you need it most.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {USE_CASES.map((uc, i) => {
                            const IconComponent = uc.icon;
                            return (
                                <div
                                    key={i}
                                    className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-brand-primary/50 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {uc.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        {uc.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Supported Tech Stacks */}
            <section className="py-20 bg-slate-900 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            Technologies We Support
                        </h2>
                        <p className="mt-4 text-slate-400">
                            Dedicated mentors with 7+ years of real-world production experience in modern stacks.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SUPPORTED_STACKS.map((stack, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="text-3xl mb-4">{stack.icon}</div>
                                    <h3 className="text-lg font-bold text-white mb-2">{stack.name}</h3>
                                    <p className="text-slate-400 text-xs leading-relaxed">{stack.desc}</p>
                                </div>
                                <button
                                    onClick={() => openBooking(`Stack: ${stack.name}`)}
                                    className="mt-6 text-xs font-bold text-brand-primary hover:text-emerald-300 flex items-center gap-1 group"
                                >
                                    Get {stack.name.split('/')[0]} Help <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-slate-950 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            3 Simple Steps to Get Unblocked
                        </h2>
                        <p className="mt-4 text-slate-400">
                            No lengthy contracts. Instant access to senior pair programming whenever you need it.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 relative">
                            <div className="w-12 h-12 rounded-full bg-brand-primary text-slate-900 font-extrabold text-lg flex items-center justify-center mx-auto mb-6">
                                1
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Share Your Challenge</h3>
                            <p className="text-slate-400 text-sm">
                                Tell us your tech stack and the issue you're trying to resolve via WhatsApp or our booking form.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 relative">
                            <div className="w-12 h-12 rounded-full bg-brand-primary text-slate-900 font-extrabold text-lg flex items-center justify-center mx-auto mb-6">
                                2
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Live Screen Share</h3>
                            <p className="text-slate-400 text-sm">
                                Hop on a 1-on-1 Google Meet / Zoom call with a senior engineer to diagnose and fix the issue.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 relative">
                            <div className="w-12 h-12 rounded-full bg-brand-primary text-slate-900 font-extrabold text-lg flex items-center justify-center mx-auto mb-6">
                                3
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Ship & Excel</h3>
                            <p className="text-slate-400 text-sm">
                                Merge your pull request with clean, production-ready code and complete understanding.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-slate-900 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            Transparent Support Pricing
                        </h2>
                        <p className="mt-4 text-slate-400">
                            Flexible options tailored for developers, new joiners, and tech leads.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        {PRICING_TIERS.map((tier, idx) => (
                            <div
                                key={idx}
                                className={`rounded-2xl p-8 flex flex-col justify-between relative transition-all ${
                                    tier.popular
                                        ? 'bg-slate-950 border-2 border-brand-primary shadow-2xl shadow-brand-primary/10'
                                        : 'bg-slate-950/60 border border-slate-800'
                                }`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-primary text-slate-900 font-extrabold text-xs uppercase tracking-wider">
                                        {tier.tag}
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                                    <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{tier.desc}</p>

                                    <div className="mt-6 mb-8 flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                                        <span className="text-slate-400 text-sm">{tier.unit}</span>
                                    </div>

                                    <div className="space-y-3 border-t border-slate-800 pt-6">
                                        {tier.features.map((feat, fIdx) => (
                                            <div key={fIdx} className="flex items-center gap-3 text-sm text-slate-300">
                                                <CheckCircle size={16} className="text-brand-primary shrink-0" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        onClick={() => openBooking(`Plan Selected: ${tier.name}`)}
                                        className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                                            tier.popular
                                                ? 'bg-brand-primary text-slate-900 hover:bg-emerald-400 shadow-lg shadow-brand-primary/20'
                                                : 'bg-slate-800 text-white hover:bg-slate-700'
                                        }`}
                                    >
                                        {tier.cta}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Google Reviews Social Proof Section */}
            <GoogleReviewsSection />

            {/* FAQs */}
            <section className="py-20 bg-slate-950 border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-4 text-slate-400">
                            Everything you need to know about our 1-on-1 on-the-job assistance.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {FAQS.map((faq, idx) => {
                            const isOpen = activeFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="border border-slate-800 rounded-xl bg-slate-900/60 overflow-hidden"
                                >
                                    <button
                                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                                        className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-white hover:text-brand-primary transition-colors text-base"
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown
                                            size={18}
                                            className={`transform transition-transform text-slate-400 ${
                                                isOpen ? 'rotate-180 text-brand-primary' : ''
                                            }`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-6 pb-5 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Bottom Final CTA */}
            <section className="py-16 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-extrabold text-white">
                        Have an Urgent Sprint Blocker Right Now?
                    </h2>
                    <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto">
                        Connect with a mentor immediately via WhatsApp or schedule your 1-on-1 screen-share session.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => openBooking()}
                            className="px-8 py-4 rounded-xl font-extrabold text-slate-900 bg-brand-primary hover:bg-emerald-400 shadow-xl shadow-brand-primary/20 transition-all text-base"
                        >
                            Book Live 1:1 Screen Share
                        </button>
                        <a
                            href="https://wa.me/918237320942?text=Hi%2C%20I%20have%20an%20urgent%20sprint%20ticket%20issue.%20Can%20we%20connect%20now%3F"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-xl font-extrabold text-white bg-[#25D366] hover:bg-[#1ebe5d] shadow-xl shadow-green-500/20 transition-all text-base flex items-center justify-center gap-2"
                        >
                            <MessageSquare size={18} />
                            WhatsApp Instant Line
                        </a>
                    </div>
                </div>
            </section>

            <Footer />

            <ConnectOneToOneModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                sessionUser={session?.user}
                headline="Book Live IT Job Support Session"
                subhead="Share your screen with a senior engineer and get your ticket unblocked in minutes."
                ctaLabel="Request Immediate Support"
            />
        </div>
    );
}

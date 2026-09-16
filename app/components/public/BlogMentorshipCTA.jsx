"use client";
import React from 'react';
import Link from 'next/link';
import { Star, Zap, ShieldCheck, MessageCircle, Calendar, ArrowRight, CheckCircle2, UserCheck, Sparkles, Terminal } from 'lucide-react';

export function BlogSidebarCTA({ tutorialTitle, tags = [] }) {
    const techName = tags?.[0] || 'Modern Web Tech';
    const waMessage = encodeURIComponent(
        `Hi Ramkumar, I was reading your guide on "${tutorialTitle || 'Web Development'}" on OutlineDev and would love to discuss 1-on-1 mentorship / urgent project job support for ${techName}.`
    );
    const waUrl = `https://wa.me/918237320942?text=${waMessage}`;

    const handleOpenBooking = () => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(
                new CustomEvent('open-connect-modal-global', {
                    detail: {
                        headline: `1:1 Mentorship: ${techName}`,
                        subhead: `Get personalized 1-on-1 code reviews, urgent job sprint support, or senior interview prep.`,
                        defaultNotes: `Need 1:1 live assistance with ${tutorialTitle ? `"${tutorialTitle}"` : techName}.`,
                        ctaLabel: 'Book 1:1 Live Session'
                    }
                })
            );
        }
    };

    return (
        <div className="rounded-2xl p-5 bg-gradient-to-br from-white to-slate-50 dark:from-dark-850 dark:to-dark-900 border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden font-sans">
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-primary via-blue-500 to-purple-500" />

            {/* Live Availability Badge */}
            <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-[11px] font-bold uppercase tracking-wider">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Slots Open This Week
                </span>
                <div className="flex items-center text-yellow-500 gap-0.5">
                    <Star size={12} className="fill-current" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">4.9/5</span>
                </div>
            </div>

            <h4 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug mb-2">
                Need 1:1 Live Guidance or Urgent Job Support?
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed font-medium">
                Get direct screen-share help from senior architects. Fix production bugs, review architecture, or prepare for FAANG machine coding rounds.
            </p>

            <div className="space-y-2 mb-5 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-brand-primary shrink-0" />
                    <span>Live 1:1 Screen-Share Debugging</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-brand-primary shrink-0" />
                    <span>Sprint Help: React, Node, TS, Playwright</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-brand-primary shrink-0" />
                    <span>Mock Technical Interview & Resume Polish</span>
                </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2">
                <button
                    onClick={handleOpenBooking}
                    className="w-full py-2.5 px-3 rounded-xl bg-dark-900 dark:bg-white text-white dark:text-dark-900 font-bold text-xs hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-1.5 text-center group cursor-pointer"
                >
                    <Calendar size={14} className="text-brand-primary dark:text-blue-600" />
                    <span>Book 1:1 Live Session</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>

                <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#128C7E] dark:text-green-400 font-bold text-xs transition-all flex items-center justify-center gap-1.5 text-center cursor-pointer"
                >
                    <MessageCircle size={14} className="text-[#25D366]" />
                    <span>Chat on WhatsApp Directly</span>
                </a>
            </div>

            {/* Free Workshop Teaser */}
            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Free Live Cohorts</span>
                <Link href="/events" className="text-brand-primary hover:underline font-bold flex items-center gap-1">
                    View Workshops →
                </Link>
            </div>
        </div>
    );
}

export function BlogBottomCTA({ tutorialTitle, tags = [] }) {
    const techName = tags?.[0] || 'Full Stack & Modern Web';
    const waMessage = encodeURIComponent(
        `Hi Ramkumar, I finished reading "${tutorialTitle || 'the guide'}" on OutlineDev. I am looking for 1:1 mentorship / IT job support for ${techName}. Let me know how we can connect.`
    );
    const waUrl = `https://wa.me/918237320942?text=${waMessage}`;

    const handleOpenBooking = () => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(
                new CustomEvent('open-connect-modal-global', {
                    detail: {
                        headline: `1:1 Mentorship & Career Accelerator`,
                        subhead: `Accelerate your engineering journey with customized 1-on-1 coaching for ${techName}.`,
                        defaultNotes: `Completed reading "${tutorialTitle}". Looking for personalized 1:1 mentorship or job sprint support.`,
                        ctaLabel: 'Schedule 1:1 Discovery Call'
                    }
                })
            );
        }
    };

    return (
        <section className="my-16 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-dark-900 to-indigo-950 text-white p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden font-sans">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={13} />
                        Personalized Engineering Mentorship
                    </span>
                    <div className="flex items-center text-yellow-400 gap-1 text-xs font-bold">
                        <Star size={14} className="fill-current" />
                        <Star size={14} className="fill-current" />
                        <Star size={14} className="fill-current" />
                        <Star size={14} className="fill-current" />
                        <Star size={14} className="fill-current" />
                        <span className="text-slate-300 ml-1">4.9/5 from 250+ Engineers Coached</span>
                    </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white leading-tight">
                    Stuck on a Complex Codebase or Preparing for Senior Dev Interviews?
                </h2>

                <p className="text-base md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed font-medium">
                    Whether you need urgent sprint job support to fix stubborn bugs in production, architectural guidance for your enterprise app, or targeted 1:1 mentorship to land a senior role — get real-time screen-share assistance.
                </p>

                {/* 3 Core Value Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="w-9 h-9 rounded-xl bg-brand-primary/20 text-brand-primary flex items-center justify-center mb-3">
                            <UserCheck size={18} />
                        </div>
                        <h4 className="font-bold text-white text-base mb-1">1:1 Deep-Dive Mentorship</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                            Weekly 1-on-1 live coding, design pattern reviews, and customized roadmaps in React, Node, TS, Playwright, and Mongo.
                        </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                            <Zap size={18} />
                        </div>
                        <h4 className="font-bold text-white text-base mb-1">Live IT Job & Sprint Support</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                            Urgent on-demand screen-share assistance to unblock sprint deliverables, debug memory leaks, and optimize slow queries.
                        </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                            <Terminal size={18} />
                        </div>
                        <h4 className="font-bold text-white text-base mb-1">FAANG Mock Coding Rounds</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                            Simulated machine coding rounds with line-by-line code reviews, rubric scoring, and Google X-Y-Z resume optimization.
                        </p>
                    </div>
                </div>

                {/* Bottom Action Row */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                    <button
                        onClick={handleOpenBooking}
                        className="py-4 px-8 rounded-2xl bg-brand-primary text-dark-950 font-black text-sm hover:bg-brand-primary/90 transition-all shadow-xl hover:shadow-brand-primary/20 flex items-center gap-2 cursor-pointer"
                    >
                        <Calendar size={18} />
                        <span>Book Free 15-Min 1:1 Strategy Call</span>
                    </button>

                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm transition-all shadow-lg shadow-green-500/20 flex items-center gap-2 cursor-pointer"
                    >
                        <MessageCircle size={18} />
                        <span>Chat on WhatsApp Directly</span>
                    </a>

                    <Link
                        href="/events"
                        className="py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-sm transition-all flex items-center gap-2"
                    >
                        <span>Browse Free Weekend Cohorts</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

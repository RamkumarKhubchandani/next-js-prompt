"use client";
import React from 'react';
import { Sparkles, Zap, MessageCircle, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export function ChallengeSidebarCTA({ challengeTitle, difficulty }) {
    const waMessage = encodeURIComponent(
        `Hi Ramkumar, I am practicing "${challengeTitle || 'Machine Coding Challenges'}" on OutlineDev and would like 1:1 live interview coaching / debugging guidance.`
    );
    const waUrl = `https://wa.me/918237320942?text=${waMessage}`;

    const handleOpenBooking = () => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(
                new CustomEvent('open-connect-modal-global', {
                    detail: {
                        headline: `Mock Coding Interview & Debugging Guidance`,
                        subhead: `Get 1-on-1 machine coding review and live technical interview prep.`,
                        defaultNotes: `Practicing challenge: "${challengeTitle}". Need 1:1 coaching or mock coding interview round.`,
                        ctaLabel: 'Book 1:1 Mock Interview'
                    }
                })
            );
        }
    };

    return (
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-dark-900 via-dark-850 to-brand-primary/10 border border-brand-primary/20 text-light-100 font-sans shadow-lg">
            <div className="flex items-center gap-2 mb-2">
                <span className="p-1 rounded-lg bg-brand-primary/20 text-brand-primary">
                    <Zap size={15} />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                    Need 1:1 Live Help?
                </span>
            </div>

            <h4 className="font-extrabold text-white text-sm leading-snug mb-1.5">
                Machine Coding Round Prep & Job Support
            </h4>

            <p className="text-xs text-light-400 mb-4 leading-relaxed">
                Stuck on a tricky edge case or preparing for a senior frontend/fullstack interview? Get screen-share guidance from senior architects.
            </p>

            <div className="flex flex-col gap-2">
                <button
                    onClick={handleOpenBooking}
                    className="w-full py-2.5 px-3 rounded-xl bg-brand-primary text-dark-950 font-bold text-xs hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                    <Calendar size={13} />
                    <span>Book 1:1 Live Guidance</span>
                </button>

                <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-green-400 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                    <MessageCircle size={13} className="text-[#25D366]" />
                    <span>Quick WhatsApp Help</span>
                </a>
            </div>
        </div>
    );
}

export function ChallengeBannerCTA() {
    return (
        <div className="my-10 p-8 rounded-3xl bg-gradient-to-r from-dark-900 via-indigo-950/40 to-dark-900 border border-brand-primary/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl font-sans">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles size={13} /> Senior Interview Accelerator
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                    Master Machine Coding Rounds with 1:1 FAANG Mentors
                </h3>
                <p className="text-sm text-light-300 max-w-xl leading-relaxed">
                    Practice real-world machine coding rounds (Uber, Swiggy, Amazon, Flipkart) with live rubric scoring, time-management techniques, and Google X-Y-Z resume polishing.
                </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
                <button
                    onClick={() => {
                        if (typeof window !== 'undefined') {
                            window.dispatchEvent(
                                new CustomEvent('open-connect-modal-global', {
                                    detail: {
                                        headline: 'Machine Coding Interview Mentorship',
                                        subhead: '1-on-1 interview simulations, live rubric feedback, and architecture audits.',
                                        defaultNotes: 'Interested in 1:1 machine coding interview coaching and job support.'
                                    }
                                })
                            );
                        }
                    }}
                    className="py-3.5 px-6 rounded-2xl bg-brand-primary text-dark-950 font-black text-sm hover:bg-brand-primary/90 transition-all shadow-lg cursor-pointer"
                >
                    Book 1:1 Mock Interview
                </button>
                <a
                    href="https://wa.me/918237320942?text=Hi%20Ramkumar,%20I'm%20practicing%20coding%20challenges%20on%20OutlineDev%20and%20want%20to%20know%20about%20your%201:1%20interview%20and%20job%20support%20programs."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-5 rounded-2xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#20ba5a] transition-all flex items-center gap-2"
                >
                    <MessageCircle size={16} />
                    WhatsApp
                </a>
            </div>
        </div>
    );
}

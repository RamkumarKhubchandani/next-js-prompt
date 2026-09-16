"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, CheckCircle2, ArrowRight } from 'lucide-react';

const RECENT_ACTIVITIES = [
    {
        name: "Rahul S.",
        location: "Bangalore, India",
        action: "booked 1:1 React & TypeScript Job Support",
        time: "4 mins ago",
        avatar: "RS",
        avatarBg: "from-blue-500 to-indigo-600"
    },
    {
        name: "David K.",
        location: "London, UK",
        action: "scheduled Next.js 15 Architecture Code Review",
        time: "11 mins ago",
        avatar: "DK",
        avatarBg: "from-emerald-500 to-teal-600"
    },
    {
        name: "Priya M.",
        location: "Pune, India",
        action: "reserved a seat for Node.js + Mongo Masterclass",
        time: "16 mins ago",
        avatar: "PM",
        avatarBg: "from-purple-500 to-pink-600"
    },
    {
        name: "Marcus T.",
        location: "San Francisco, USA",
        action: "booked 1:1 Playwright Automation Coaching",
        time: "24 mins ago",
        avatar: "MT",
        avatarBg: "from-amber-500 to-orange-600"
    },
    {
        name: "Alex B.",
        location: "Toronto, Canada",
        action: "requested urgent Sprint Bug Fixing assistance",
        time: "32 mins ago",
        avatar: "AB",
        avatarBg: "from-cyan-500 to-blue-600"
    },
    {
        name: "Sneha R.",
        location: "Hyderabad, India",
        action: "started 1:1 Frontend Engineering Mentorship",
        time: "45 mins ago",
        avatar: "SR",
        avatarBg: "from-rose-500 to-red-600"
    }
];

export default function SocialProofTicker() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        if (dismissed) return;

        // Start cycle after 5 seconds
        const startTimer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);

        const interval = setInterval(() => {
            setIsVisible(false);

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
                setIsVisible(true);
            }, 8000); // 8s hidden between notifications
        }, 16000); // 8s shown + 8s hidden

        return () => {
            clearTimeout(startTimer);
            clearInterval(interval);
        };
    }, [dismissed]);

    const handleToastClick = () => {
        try {
            window.dispatchEvent(new CustomEvent('open-connect-modal-global', {
                detail: {
                    headline: 'Book Your 1:1 Session',
                    subhead: 'Join developers from top tech hubs who get live coding and sprint help.',
                    defaultNotes: 'Referred from Social Proof Activity Ticker'
                }
            }));
        } catch { }
    };

    if (dismissed) return null;

    const current = RECENT_ACTIVITIES[currentIndex];

    return (
        <div className="fixed bottom-6 left-6 z-50 pointer-events-none font-sans">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="pointer-events-auto bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-800 text-white p-3.5 rounded-2xl shadow-2xl flex items-center gap-3.5 max-w-[340px] hover:border-brand-primary/50 transition-all cursor-pointer group"
                        onClick={handleToastClick}
                    >
                        {/* Avatar */}
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${current.avatarBg} flex items-center justify-center font-extrabold text-xs text-white shadow-md shrink-0`}>
                            {current.avatar}
                        </div>

                        {/* Text Details */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className="font-bold text-xs text-white truncate">
                                    {current.name} <span className="text-[10px] text-slate-400 font-normal">({current.location})</span>
                                </span>
                                <span className="text-[10px] text-brand-primary font-semibold shrink-0">
                                    {current.time}
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-300 line-clamp-1 group-hover:text-brand-primary transition-colors">
                                {current.action}
                            </p>
                        </div>

                        {/* Close button */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setDismissed(true);
                            }}
                            className="text-slate-500 hover:text-slate-300 p-1 shrink-0 -mr-1"
                            title="Dismiss notifications"
                        >
                            <X size={13} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

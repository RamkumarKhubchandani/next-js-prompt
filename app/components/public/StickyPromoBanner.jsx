"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, MessageSquare, Calendar, X, Sparkles } from 'lucide-react';

export default function StickyPromoBanner() {
    const [isVisible, setIsVisible] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            if (sessionStorage.getItem('outline_promo_dismissed')) {
                setIsVisible(false);
            }
        } catch { }
    }, []);

    const handleDismiss = (e) => {
        e?.stopPropagation();
        setIsVisible(false);
        try {
            sessionStorage.setItem('outline_promo_dismissed', 'true');
        } catch { }
    };

    const handleOpenBooking = () => {
        try {
            window.dispatchEvent(new CustomEvent('open-connect-modal-global', {
                detail: {
                    headline: 'Claim Your Free 15-Minute Live Session',
                    subhead: 'Get live sprint debugging, project review, or 1-on-1 mentorship roadmap.',
                    defaultNotes: 'Referred from Sticky Promo Banner (Free 15-Min Offer)'
                }
            }));
        } catch { }
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-40 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 border-b border-brand-primary/30 text-white font-sans text-xs px-3 py-2 shadow-lg"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
                    {/* Left & Center Banner Content */}
                    <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-primary/20 text-brand-primary border border-brand-primary/40 font-extrabold text-[10px] uppercase tracking-wider shrink-0">
                            <Sparkles size={11} />
                            Limited Slots
                        </span>
                        <p className="truncate text-slate-200 font-medium">
                            <strong className="text-white font-bold">Stuck on a Bug or Jira Ticket?</strong>{' '}
                            <span className="hidden md:inline text-slate-300">
                                Get a Free 15-Minute Live Screen Share Session with a Senior Staff Engineer.
                            </span>
                        </p>
                    </div>

                    {/* Right CTA Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={handleOpenBooking}
                            className="px-3 py-1 rounded-full font-bold text-[11px] text-slate-900 bg-brand-primary hover:bg-emerald-300 shadow-md shadow-brand-primary/20 transition-all flex items-center gap-1 whitespace-nowrap active:scale-95"
                        >
                            <Calendar size={12} />
                            <span>Book Free 15m Call</span>
                        </button>

                        <a
                            href="https://wa.me/918237320942?text=Hi%20Ram%2C%20I%20saw%20the%20promo%20banner%20on%20OutlineDev%20and%20want%20to%20claim%20my%20free%2015-minute%201%3A1%20session."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[11px] text-white bg-[#25D366] hover:bg-[#1ebe5d] transition-all shadow-sm whitespace-nowrap active:scale-95"
                        >
                            <MessageSquare size={12} />
                            <span>WhatsApp</span>
                        </a>

                        <button
                            type="button"
                            onClick={handleDismiss}
                            className="text-slate-400 hover:text-white p-1 transition-colors rounded-full hover:bg-slate-800"
                            title="Dismiss for 24 hours"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

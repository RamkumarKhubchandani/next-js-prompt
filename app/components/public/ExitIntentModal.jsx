"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {
    X,
    Sparkles,
    CheckCircle,
    Download,
    Zap,
    Gift,
    Shield,
    Calendar,
    ArrowRight,
    MessageSquare,
    Star
} from 'lucide-react';

export default function ExitIntentModal() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setMounted(true);

        // Check if already shown in this session
        try {
            if (sessionStorage.getItem('outline_exit_intent_shown')) {
                return;
            }
        } catch { }

        // Desktop exit intent listener
        const handleMouseLeave = (e) => {
            if (e.clientY <= 15) {
                try {
                    if (!sessionStorage.getItem('outline_exit_intent_shown')) {
                        sessionStorage.setItem('outline_exit_intent_shown', 'true');
                        setOpen(true);
                    }
                } catch { }
            }
        };

        // Mobile fallback timer (45 seconds)
        const mobileTimer = setTimeout(() => {
            try {
                if (!sessionStorage.getItem('outline_exit_intent_shown')) {
                    sessionStorage.setItem('outline_exit_intent_shown', 'true');
                    setOpen(true);
                }
            } catch { }
        }, 45000);

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            clearTimeout(mobileTimer);
        };
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name.trim()) {
            setError('Please enter your full name.');
            return;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!formData.phone || formData.phone.length < 8) {
            setError('Please enter your WhatsApp / Mobile number.');
            return;
        }

        setSubmitting(true);

        try {
            await fetch('/api/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: { countryCode: '', number: formData.phone },
                    preferredTime: 'Free 15-Min Code Audit / Cheatsheet Claimed',
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
                    notes: 'Lead Magnet: 2026 Senior Dev Interview Checklist + Free 15-Min Code Audit',
                    lessonTitle: 'Exit-Intent Lead Magnet Claim'
                })
            });
            setSubmitted(true);
        } catch (err) {
            console.error(err);
            setSubmitted(true);
        } finally {
            setSubmitting(false);
        }
    };

    if (!mounted || !open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 text-white overflow-hidden"
            >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/15 blur-[80px] rounded-full pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Close modal"
                >
                    <X size={18} />
                </button>

                {!submitted ? (
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/15 text-brand-primary border border-brand-primary/30 text-xs font-bold uppercase tracking-wider mb-3">
                            <Gift size={13} />
                            Free Developer Toolkit
                        </div>

                        <h3 className="text-2xl font-extrabold text-white leading-tight">
                            Before You Go: Claim Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-emerald-300 to-teal-400">
                                2026 Senior Dev Checklist & Free Code Audit
                            </span>
                        </h3>

                        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                            Join 5,000+ developers leveling up their careers. Get instant access to our curated guides plus a free 1-on-1 sprint diagnostic.
                        </p>

                        {/* Value Bullet Points */}
                        <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-4">
                            <div className="flex items-start gap-2.5 text-xs text-slate-200">
                                <CheckCircle size={15} className="text-brand-primary shrink-0 mt-0.5" />
                                <span><strong>React 19 & Next.js 15 Performance Architecture</strong> Cheatsheet</span>
                            </div>
                            <div className="flex items-start gap-2.5 text-xs text-slate-200">
                                <CheckCircle size={15} className="text-brand-primary shrink-0 mt-0.5" />
                                <span><strong>50 Top FAANG Senior Frontend & System Design</strong> Interview Questions</span>
                            </div>
                            <div className="flex items-start gap-2.5 text-xs text-slate-200">
                                <CheckCircle size={15} className="text-brand-primary shrink-0 mt-0.5" />
                                <span><strong>Free 15-Minute Live Code Review</strong> with a Senior Staff Engineer</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                            <div>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Your Full Name"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-brand-primary focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Your Email (where we send the PDF)"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-brand-primary focus:outline-none transition-colors"
                                />
                            </div>

                            <div className="phone-input-dark">
                                <PhoneInput
                                    international
                                    defaultCountry="IN"
                                    value={formData.phone}
                                    onChange={(val) => setFormData({ ...formData, phone: val || '' })}
                                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-brand-primary focus:outline-none"
                                />
                            </div>

                            {error && (
                                <p className="text-xs text-red-400 font-semibold">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3.5 rounded-xl font-extrabold text-slate-900 bg-gradient-to-r from-brand-primary via-emerald-400 to-brand-primary hover:opacity-95 shadow-lg shadow-brand-primary/25 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {submitting ? (
                                    <span>Sending Toolkit...</span>
                                ) : (
                                    <>
                                        <Download size={15} />
                                        <span>Download Checklist & Claim Free 15-Min Audit</span>
                                        <ArrowRight size={15} />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-[10px] text-slate-500 text-center mt-2.5">
                            🔒 100% Free. No spam, ever. Unsubscribe anytime in 1-click.
                        </p>
                    </div>
                ) : (
                    /* Success State */
                    <div className="text-center py-6">
                        <div className="w-14 h-14 rounded-full bg-brand-primary/20 border-2 border-brand-primary flex items-center justify-center text-brand-primary mx-auto mb-4">
                            <CheckCircle size={30} />
                        </div>
                        <h4 className="text-xl font-extrabold text-white">Toolkit Sent & Audit Activated!</h4>
                        <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                            We have sent your 2026 Developer Toolkit to <strong className="text-brand-primary">{formData.email}</strong>.
                        </p>

                        <div className="mt-6 flex flex-col gap-3">
                            <a
                                href="https://wa.me/918237320942?text=Hi%20Ram%2C%20I%20just%20claimed%20the%202026%20Developer%20Cheatsheet%20and%20want%20to%20schedule%20my%20free%2015-minute%20code%20audit."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-[#25D366] hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-2 shadow-md"
                            >
                                <MessageSquare size={16} />
                                Schedule 15-Min Audit on WhatsApp
                            </a>
                            <button
                                onClick={handleClose}
                                className="text-xs text-slate-400 hover:text-white py-1 transition-colors"
                            >
                                Close & Continue Browsing
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>,
        document.body
    );
}

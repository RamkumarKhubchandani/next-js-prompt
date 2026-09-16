"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Calendar, X, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppWidget() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Show widget after 1.5 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        // Show tooltip after 3.5 seconds
        const tooltipTimer = setTimeout(() => {
            setShowTooltip(true);
        }, 3500);

        return () => {
            clearTimeout(timer);
            clearTimeout(tooltipTimer);
        };
    }, []);

    // Formulate contextual WhatsApp message based on active page
    const getWhatsAppUrl = () => {
        let text = "Hi Ram, I visited OutlineDev and want to know more about 1-on-1 mentorship and IT job support.";
        if (pathname?.includes('job-support')) {
            text = "Hi Ram, I need urgent 1-on-1 IT job support for my sprint task.";
        } else if (pathname?.includes('services')) {
            text = "Hi Ram, I want to discuss a custom web development or design project.";
        } else if (pathname?.includes('blogs')) {
            text = "Hi Ram, I was reading your technical tutorials and want 1-on-1 coaching.";
        } else if (pathname?.includes('challenges')) {
            text = "Hi Ram, I was practicing coding challenges and want 1-on-1 mentorship.";
        } else if (pathname?.includes('events')) {
            text = "Hi Ram, I want to join your live weekend masterclass cohort.";
        }
        return `https://wa.me/918237320942?text=${encodeURIComponent(text)}`;
    };

    const handleOpenConnectModal = () => {
        try {
            window.dispatchEvent(new CustomEvent('open-connect-modal-global', {
                detail: {
                    headline: 'Get Live 1:1 Code & Mentorship Help',
                    subhead: 'Connect with a senior engineer for live debugging, job support, or project guidance.',
                    defaultNotes: `Page Context: ${pathname || '/'}`
                }
            }));
        } catch { }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-sans pointer-events-none">
            {/* Contextual Interactive Tooltip */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white p-3 rounded-2xl shadow-2xl text-xs leading-tight pointer-events-auto max-w-[240px] relative mb-1"
                    >
                        <div className="flex items-center justify-between gap-1 mb-2">
                            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                Live Mentors Online
                            </div>
                            <button
                                onClick={() => setShowTooltip(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-0.5"
                                title="Close"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        <p className="text-gray-600 dark:text-slate-300 text-[11px] mb-2.5">
                            Need instant code help, job support, or 1:1 mentorship?
                        </p>

                        <div className="flex flex-col gap-1.5">
                            <a
                                href={getWhatsAppUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-1.5 px-2.5 rounded-lg font-bold text-[11px] text-white bg-[#25D366] hover:bg-[#1ebe5d] text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp (15m SLA)
                            </a>
                            <button
                                onClick={handleOpenConnectModal}
                                className="w-full py-1 px-2 rounded-lg font-semibold text-[10px] text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary bg-gray-100 dark:bg-slate-800 transition-colors flex items-center justify-center gap-1"
                            >
                                <Calendar size={11} />
                                Book Free 15-Min Call
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pulsing Floating WhatsApp Trigger */}
            <motion.a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-4 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:shadow-[0_8px_40px_rgb(37,211,102,0.6)] hover:bg-[#20ba5a] transition-all cursor-pointer pointer-events-auto flex items-center justify-center group"
                title="Chat on WhatsApp"
            >
                {/* Ping ring animation */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping group-hover:animate-none -z-10" />

                {/* WhatsApp custom SVG logo */}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </motion.a>
        </div>
    );
}


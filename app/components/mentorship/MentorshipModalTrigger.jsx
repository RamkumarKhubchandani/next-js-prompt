"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import MentorshipClient from '../../mentorship/MentorshipClient';

export default function MentorshipModalTrigger({ skill, className, children }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className={className}
            >
                {children}
            </button>

            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="relative w-full max-w-5xl bg-white dark:bg-dark-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="absolute top-4 right-4 z-50 p-2 bg-slate-100 dark:bg-dark-800 rounded-full hover:bg-slate-200 dark:hover:bg-dark-700 transition-colors"
                                title="Close"
                            >
                                <X size={20} />
                            </button>
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <div className="p-1">
                                    <MentorshipClient prefill={{ stack: [skill.id] }} isInModal={true} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

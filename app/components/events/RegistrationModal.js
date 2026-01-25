"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Calendar } from 'lucide-react';

export function RegistrationModal({ open, onClose, eventName, date, time }) {
    const [formData, setFormData] = useState({
        email: '',
        whatsapp: '',
        city: '',
        country: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        try {
            // In a real app, this would be a fetch to /api/register
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock success
            console.log("Registered:", { event: eventName, date, ...formData });
            setStatus('success');

        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white dark:bg-dark-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden pointer-events-auto border border-dark-700">
                            {/* Header */}
                            <div className="relative p-8 bg-gradient-to-r from-brand-primary/20 to-transparent">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                >
                                    <X size={20} className="text-dark-500 dark:text-light-400" />
                                </button>
                                <h2 className="text-2xl font-black text-dark-900 dark:text-white mb-2">Secure your spot</h2>
                                <p className="text-sm font-medium text-brand-primary uppercase tracking-wide">
                                    {eventName}
                                </p>
                                {date && (
                                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-600 dark:text-light-300">
                                        <Calendar size={16} />
                                        <span>{date} • {time}</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-8">
                                {status === 'success' ? (
                                    <div className="text-center py-8">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 size={40} className="text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">You're In! 🚀</h3>
                                        <p className="text-gray-600 dark:text-light-300 mb-6">
                                            Thanks for registering. We've sent a confirmation email to <strong>{formData.email}</strong> with all the details and the calendar invite.
                                        </p>
                                        <button
                                            onClick={onClose}
                                            className="px-8 py-3 bg-brand-primary text-dark-900 font-bold rounded-xl hover:bg-brand-primary/90 transition-colors w-full"
                                        >
                                            Done
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-light-300 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                                placeholder="you@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-light-300 mb-2">
                                                WhatsApp Number
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.whatsapp}
                                                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                                placeholder="+1 234 567 8900"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">We'll add you to the exclusive cohort group.</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-light-300 mb-2">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                                    placeholder="New York"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-light-300 mb-2">
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.country}
                                                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                                    placeholder="USA"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={status === 'submitting'}
                                                className="w-full py-4 rounded-xl bg-brand-primary text-dark-900 font-bold text-lg hover:bg-brand-primary/90 transition-all shadow-lg hover:shadow-brand-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {status === 'submitting' ? (
                                                    <>
                                                        <Loader2 size={24} className="animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    "Complete Registration"
                                                )}
                                            </button>
                                            <p className="text-center text-xs text-gray-500 mt-4">
                                                No payment required now. Limited spots available.
                                            </p>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

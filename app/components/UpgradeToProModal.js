"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

export default function UpgradeToProModal({ open, onClose }) {
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!open) return null;

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/upgrade', {
                method: 'POST',
            });
            if (res.ok) {
                setSuccess(true);
            } else {
                alert('Failed to submit request. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white/80 hover:text-white transition-all z-50 backdrop-blur-sm"
                        >
                            <X size={20} />
                        </button>

                        {/* Gradient Header */}
                        <div className="h-32 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-xl relative z-10">
                                <Sparkles className="text-white drop-shadow-md" size={32} />
                            </div>
                        </div>

                        <div className="p-8 text-center">
                            {!success ? (
                                <>
                                    <h2 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">Upgrade to Pro</h2>
                                    <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">
                                        Unlock unlimited access to all courses, premium mock interviews, and advanced resume optimization.
                                    </p>

                                    {!session ? (
                                        <div className="space-y-4">
                                            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/30 text-left text-amber-800 dark:text-amber-300 text-sm">
                                                Please log in or create a free account to upgrade your membership.
                                            </div>
                                            <button
                                                onClick={() => {
                                                    onClose();
                                                    router.push(`/login?callbackUrl=${encodeURIComponent(pathname || '/')}`);
                                                }}
                                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98]"
                                            >
                                                Log In / Register
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-4 text-left mb-8">
                                                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Your Email</label>
                                                    <div className="font-mono text-sm text-slate-900 dark:text-slate-200 truncate">{session?.user?.email}</div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleSubmit}
                                                disabled={loading}
                                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 size={18} className="animate-spin" />
                                                        Sending Request...
                                                    </>
                                                ) : (
                                                    'Submit Upgrade Request'
                                                )}
                                            </button>
                                            <p className="text-xs text-slate-400 mt-4">
                                                Admins will review your request shortly.
                                            </p>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="py-8">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Request Sent!</h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                                        We've received your request to upgrade using <strong>{session?.user?.email}</strong>. You'll be notified once approved.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="px-8 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 transition-transform"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

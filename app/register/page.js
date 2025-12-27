"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Logo } from '../components/Logo';
import Link from 'next/link';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        setError('');

        if (!name || !email || !password) {
            setError('All fields are necessary.');
            return;
        }

        try {
            setSubmitting(true);
            const res = await fetch('/api/student/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                router.push('/login');
            } else {
                const data = await res.json();
                setError(data.message || 'Registration failed.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
            {/* Minimal auth header */}
            <header className="fixed inset-x-0 top-0 z-40 border-b border-dark-700/10 dark:border-dark-700 bg-light-100/70 dark:bg-dark-900/60 backdrop-blur-lg">
                <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center">
                    <Link href="/" className="inline-flex items-center">
                        <Logo />
                    </Link>
                </div>
            </header>

            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                        {/* Benefits Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="hidden lg:block pt-8"
                        >
                            <h2 className="text-3xl font-extrabold tracking-tight text-dark-900 dark:text-white mb-6">
                                Join the elite circle of <span className="text-brand-primary">top 1% developers</span>
                            </h2>

                            <div className="space-y-8">
                                <div className="relative overflow-hidden rounded-2xl border border-dark-700/10 dark:border-dark-700 bg-white/50 dark:bg-dark-800/50 p-6">
                                    <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 rounded-full bg-gray-400"></span>
                                        Free Account
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            'Access to basic courses',
                                            'Community support',
                                            'Limited progress tracking'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-dark-900/70 dark:text-light-100/70">
                                                <div className="mt-1 text-gray-400">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                </div>
                                                <span className="text-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="relative overflow-hidden rounded-2xl border-2 border-brand-primary/20 bg-brand-primary/5 dark:bg-brand-primary/5 p-6">
                                    <div className="absolute top-0 right-0 bg-brand-primary text-dark-900 text-xs font-bold px-3 py-1 rounded-bl-xl">
                                        RECOMMENDED
                                    </div>
                                    <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 rounded-full bg-brand-primary"></span>
                                        Pro Account
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            'All Free benefits included',
                                            'Advanced "Architect\'s Notes" & "War Stories"',
                                            'System Design deep dives',
                                            'Priority support',
                                            'Certificate of completion'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-dark-900 dark:text-white">
                                                <div className="mt-1 text-brand-primary">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                </div>
                                                <span className="text-sm font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Registration Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative overflow-hidden rounded-3xl border border-dark-700/10 dark:border-dark-700 bg-white/70 dark:bg-dark-800 shadow-xl backdrop-blur-lg"
                        >
                            <div className="absolute inset-0 opacity-60 pointer-events-none bg-gradient-to-br from-brand-primary/10 via-transparent to-purple-500/10" />
                            <div className="relative p-8">
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-dark-900 dark:text-white">
                                    Create your account
                                </h1>
                                <p className="mt-2 text-sm text-dark-900/60 dark:text-light-100/70">
                                    Start learning day-by-day and track your progress.
                                </p>

                                {/* Mobile-only benefits summary */}
                                <div className="lg:hidden mt-6 mb-6 p-4 rounded-xl bg-brand-primary/5 border border-brand-primary/10">
                                    <p className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">Why Go Pro?</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-sm text-dark-900 dark:text-white">
                                            <div className="text-brand-primary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                            Architect's Notes & War Stories
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-dark-900 dark:text-white">
                                            <div className="text-brand-primary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                            System Design deep dives
                                        </li>
                                    </ul>
                                </div>

                                {error && (
                                    <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-200 px-4 py-3 flex items-start gap-2">
                                        <AlertTriangle size={18} className="mt-0.5" />
                                        <p className="text-sm font-semibold">{error}</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold tracking-widest uppercase text-dark-900/60 dark:text-light-100/70 mb-2">
                                            Full name
                                        </label>
                                        <Input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold tracking-widest uppercase text-dark-900/60 dark:text-light-100/70 mb-2">
                                            Email
                                        </label>
                                        <Input type="email" placeholder="you@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold tracking-widest uppercase text-dark-900/60 dark:text-light-100/70 mb-2">
                                            Password
                                        </label>
                                        <Input type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: submitting ? 1 : 1.02 }}
                                        whileTap={{ scale: submitting ? 1 : 0.98 }}
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-base font-extrabold text-dark-900 shadow-[0_0_25px_rgba(0,245,160,0.25)] hover:shadow-[0_0_35px_rgba(0,245,160,0.35)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {submitting && <Loader2 size={18} className="animate-spin" />}
                                        {submitting ? 'Creating account…' : 'Register'}
                                    </motion.button>
                                </form>

                                <p className="mt-6 text-center text-sm text-dark-900/60 dark:text-light-100/70">
                                    Already have an account?{' '}
                                    <Link href="/login" className="font-extrabold text-brand-primary hover:underline">
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}

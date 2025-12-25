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
                <div className="mx-auto max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden rounded-3xl border border-dark-700/10 dark:border-dark-700 bg-white/70 dark:bg-dark-800 shadow-xl backdrop-blur-lg"
                    >
                        <div className="absolute inset-0 opacity-60 pointer-events-none bg-gradient-to-br from-brand-primary/10 via-transparent to-purple-500/10" />
                        <div className="relative p-8">
                            <h1 className="text-3xl font-extrabold tracking-tight text-dark-900 dark:text-white">
                                Create your account
                            </h1>
                            <p className="mt-2 text-sm text-dark-900/60 dark:text-light-100/70">
                                Start learning day-by-day and track your progress.
                            </p>

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
            </main>
        </div>
    );
}

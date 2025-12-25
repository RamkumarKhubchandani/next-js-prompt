"use client";
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Logo } from '../components/Logo';
import Link from 'next/link';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        setError('');
        setSubmitting(true);
        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid email or password.');
                return;
            }

            router.replace('/dashboard'); // Redirect to a student dashboard
        } catch (error) {
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
                                Login to your account
                            </h1>
                            <p className="mt-2 text-sm text-dark-900/60 dark:text-light-100/70">
                                Welcome back. Continue your learning journey.
                            </p>

                            <div className="mt-6">
                                <motion.button
                                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                                    type="button"
                                    disabled={submitting}
                                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-dark-700/20 dark:border-dark-700 bg-white/90 dark:bg-dark-900/60 px-6 py-3 text-sm font-extrabold text-dark-900 dark:text-white hover:bg-white dark:hover:bg-dark-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    Continue with Google
                                </motion.button>
                                <div className="mt-4 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-dark-700/10 dark:bg-dark-700" />
                                    <span className="text-xs font-bold text-dark-900/40 dark:text-light-100/40">OR</span>
                                    <div className="h-px flex-1 bg-dark-700/10 dark:bg-dark-700" />
                                </div>
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
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="you@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold tracking-widest uppercase text-dark-900/60 dark:text-light-100/70 mb-2">
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-base font-extrabold text-dark-900 shadow-[0_0_25px_rgba(0,245,160,0.25)] hover:shadow-[0_0_35px_rgba(0,245,160,0.35)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {submitting && <Loader2 size={18} className="animate-spin" />}
                                    {submitting ? 'Logging in…' : 'Log In'}
                                </motion.button>
                            </form>

                            <p className="mt-6 text-center text-sm text-dark-900/60 dark:text-light-100/70">
                                Don&apos;t have an account?{' '}
                                <Link href="/register" className="font-extrabold text-brand-primary hover:underline">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

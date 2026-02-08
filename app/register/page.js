"use client";
import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Logo } from '../components/Logo';
import Link from 'next/link';
import { Loader2, AlertTriangle, Brain, Code, Rocket, Users, Trophy, Zap, Sparkles, CheckCircle, Crown, Gift } from 'lucide-react';

export default function RegisterPage() {
    const { data: session, status } = useSession();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('/dashboard');
        }
    }, [status, router]);

    // Don't render the form if checking session or already authenticated
    if (status === 'loading' || status === 'authenticated') {
        return (
            <div className="min-h-screen bg-light-100 dark:bg-dark-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
            </div>
        );
    }

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

    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: '/dashboard' });
    };

    const benefits = [
        {
            icon: Brain,
            title: "AI-Powered Learning",
            description: "Get instant answers with our advanced AI assistant",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: Code,
            title: "Interactive Coding",
            description: "Practice with real-time code execution and feedback",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: Rocket,
            title: "Personalized Paths",
            description: "Custom learning roadmaps tailored to your goals",
            gradient: "from-orange-500 to-red-500"
        },
        {
            icon: Users,
            title: "1:1 Mentorship",
            description: "Connect with expert mentors from top companies",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            icon: Trophy,
            title: "Certificates & Projects",
            description: "Build portfolio projects and earn certificates",
            gradient: "from-yellow-500 to-orange-500"
        },
        {
            icon: Zap,
            title: "Unlimited Access",
            description: "All courses, all features, no limits",
            gradient: "from-indigo-500 to-purple-500"
        }
    ];

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

            <main className="pt-16">
                <div className="min-h-screen grid lg:grid-cols-2">
                    {/* Left Side - Registration Form */}
                    <div className="flex items-center justify-center p-8 lg:p-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="w-full max-w-md">
                            <div className="mb-8">
                                <h1 className="text-4xl font-black tracking-tight text-dark-900 dark:text-white mb-2">
                                    Start Learning Today
                                </h1>
                                <p className="text-lg text-dark-900/60 dark:text-light-100/70">
                                    Join 50,000+ developers mastering their craft
                                </p>
                            </div>

                            {/* Free Access Badge */}
                            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                                        <Gift size={24} />
                                    </div>
                                    <div>
                                        <div className="font-black text-green-600 dark:text-green-400 text-lg">100% FREE Access</div>
                                        <div className="text-sm text-dark-900/70 dark:text-light-100/70">Upgrade to Pro anytime you like!</div>
                                    </div>
                                </div>
                            </div>

                            {/* Google Sign In Button */}
                            <motion.button
                                whileHover={{ scale: submitting ? 1 : 1.02 }}
                                whileTap={{ scale: submitting ? 1 : 0.98 }}
                                type="button"
                                disabled={submitting}
                                onClick={handleGoogleSignIn}
                                className="w-full inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-6 py-4 text-base font-bold text-dark-900 dark:text-white hover:border-brand-primary hover:bg-gray-50 dark:hover:bg-dark-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </motion.button>

                            <div className="mt-6 flex items-center gap-3">
                                <div className="h-px flex-1 bg-dark-700/10 dark:bg-dark-700" />
                                <span className="text-xs font-bold text-dark-900/40 dark:text-light-100/40">OR</span>
                                <div className="h-px flex-1 bg-dark-700/10 dark:bg-dark-700" />
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
                                        Full Name
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
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
                                        placeholder="Create a strong password"
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
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 py-4 text-base font-extrabold text-dark-900 shadow-[0_0_25px_rgba(0,245,160,0.25)] hover:shadow-[0_0_35px_rgba(0,245,160,0.35)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {submitting && <Loader2 size={18} className="animate-spin" />}
                                    {submitting ? 'Creating account…' : 'Create Free Account'}
                                </motion.button>
                            </form>

                            <p className="mt-6 text-center text-sm text-dark-900/60 dark:text-light-100/70">
                                Already have an account?{' '}
                                <Link href="/login" className="font-extrabold text-brand-primary hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Side - Benefits */}
                    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-brand-primary/10 via-purple-500/10 to-pink-500/10 dark:from-brand-primary/5 dark:via-purple-500/5 dark:to-pink-500/5 p-12 relative overflow-hidden">
                        {/* Animated background elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative z-10 max-w-lg"
                        >
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm mb-4">
                                    <Sparkles className="text-brand-primary animate-pulse" size={20} />
                                    <span className="font-bold text-dark-900 dark:text-white">Everything Included FREE</span>
                                </div>
                                <h2 className="text-4xl font-black text-dark-900 dark:text-white mb-4">
                                    Access Everything. Upgrade Later.
                                </h2>
                                <p className="text-lg text-dark-900/70 dark:text-light-100/70">
                                    Start with full access to all features. Love the platform? Upgrade to Pro for advanced content!
                                </p>
                            </div>

                            <div className="grid gap-4 mb-8">
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="group flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-dark-700/50 hover:border-brand-primary/50 transition-all hover:shadow-lg"
                                    >
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                                            <benefit.icon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-dark-900 dark:text-white mb-1">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-sm text-dark-900/60 dark:text-light-100/60">
                                                {benefit.description}
                                            </p>
                                        </div>
                                        <CheckCircle className="flex-shrink-0 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pro Upgrade Teaser */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                                        <Crown size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-dark-900 dark:text-white">Upgrade to Pro Anytime</h3>
                                        <p className="text-sm text-dark-900/60 dark:text-light-100/60 mt-1">
                                            Love the platform? Unlock advanced system design, architect notes, and priority support!
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-bold">
                                    <span>No pressure. Upgrade only when you're ready!</span>
                                    <Sparkles size={16} className="animate-pulse" />
                                </div>
                            </div>

                            <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                                <div className="flex items-center justify-around text-center">
                                    <div>
                                        <div className="text-2xl font-black text-green-600 dark:text-green-400">50K+</div>
                                        <div className="text-xs text-dark-900/60 dark:text-light-100/60">Learners</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-green-600 dark:text-green-400">100+</div>
                                        <div className="text-xs text-dark-900/60 dark:text-light-100/60">Mentors</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-green-600 dark:text-green-400">4.9/5</div>
                                        <div className="text-xs text-dark-900/60 dark:text-light-100/60">Rating</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-green-600 dark:text-green-400">FREE</div>
                                        <div className="text-xs text-dark-900/60 dark:text-light-100/60">Forever</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}

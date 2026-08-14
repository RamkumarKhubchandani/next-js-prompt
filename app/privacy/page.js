import React from 'react';
import { Lock, Eye, ShieldCheck, Database, Server, UserCheck } from 'lucide-react';
import { Header } from '../components/Header';

import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy | OutlineDev',
    description: 'How we collect, use, and protect your data.',
    alternates: {
        canonical: 'https://www.outlinedev.com/privacy',
    }
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#050510] relative overflow-hidden text-slate-900 dark:text-slate-100">
            <Header />

            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
            <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <main className="relative max-w-4xl mx-auto px-6 pt-32 pb-20">
                <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-primary mb-8 transition-colors">
                    ← Back to Homepage
                </Link>

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
                        <Lock size={14} />
                        Data Protection
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-gray-200 dark:to-gray-400">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Your privacy is non-negotiable. Here’s how we protect your personal information and code.
                    </p>
                </div>

                {/* Content Container */}
                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-white/5 p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-black/20">

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-brand-primary/30 transition-colors">
                            <Eye className="w-8 h-8 text-brand-primary mb-4" />
                            <h3 className="font-bold text-lg mb-2">Transparent</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">We are clear about what we collect and why. No hidden trackers.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-brand-primary/30 transition-colors">
                            <ShieldCheck className="w-8 h-8 text-purple-500 mb-4" />
                            <h3 className="font-bold text-lg mb-2">Secure</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Your data is encrypted at rest and in transit using industry standards.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-brand-primary/30 transition-colors">
                            <UserCheck className="w-8 h-8 text-blue-500 mb-4" />
                            <h3 className="font-bold text-lg mb-2">Control</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">You own your data. Export or delete your account at any time.</p>
                        </div>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-primary">

                        <section className="mb-12">
                            <h2 className="text-2xl mb-4">1. Information We Collect</h2>
                            <p>We collect information to provide and improve our services:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Account Information:</strong> Name, email address, and profile details provided during registration.</li>
                                <li><strong>Usage Data:</strong> Course progress, quiz scores, and interaction with platform features to personalize your learning path.</li>
                                <li><strong>Code Submissions:</strong> Code you write in our editor is saved to your profile for your review and portfolio.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl mb-4">2. How We Use Your Data</h2>
                            <p>We use your information strictly to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Authenticate you and secure your account.</li>
                                <li>Track your learning progress and generate certificates.</li>
                                <li><strong>Connect Teachers, Mentors & Students:</strong> We use your profile to facilitate meaningful connections between teachers, industry mentors, and students, creating a vibrant ecosystem where knowledge flows freely (only with your explicit request).</li>
                                <li>Send important updates regarding your account or course material.</li>
                            </ul>
                            <p className="mt-4">
                                <strong>We do not sell your personal data to third parties.</strong>
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl mb-4">3. Cookies & Tracking</h2>
                            <p>
                                We use necessary cookies to keep you logged in and functional cookies to remember your preferences (like dark mode). Analytics are used anonymously to understand platform performance.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl mb-4">4. Data Security</h2>
                            <p>
                                We implement robust security measures:
                            </p>
                            <div className="flex flex-col gap-4 mt-4 not-prose">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5">
                                    <Lock className="shrink-0 text-slate-500 dark:text-slate-400" size={20} />
                                    <div>
                                        <h4 className="font-bold text-sm">Encryption</h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">All sensitive data (passwords, payments) is encrypted using AES-256 protocols.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5">
                                    <Database className="shrink-0 text-slate-500 dark:text-slate-400" size={20} />
                                    <div>
                                        <h4 className="font-bold text-sm">Data Minimization</h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">We only store what is strictly necessary for your learning experience.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl mb-4">5. Your Rights</h2>
                            <p>
                                Under GDPR and CCPA, you have the right to access, correct, or delete your personal data. You can manage most settings directly in your dashboard. For full data deletion requests, please contact support.
                            </p>
                        </section>

                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            For privacy-related inquiries, reach out to <a href="mailto:privacy@outlinedev.com" className="text-brand-primary hover:underline">privacy@outlinedev.com</a>
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
}

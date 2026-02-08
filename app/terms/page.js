import React from 'react';
import { Scroll, Shield, Scale, Clock, AlertCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service | OutlineDev',
    description: 'Terms and conditions for using OutlineDev services.',
};

import { Header } from '../components/Header'; // Import Header

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#050510] relative overflow-hidden text-slate-900 dark:text-slate-100">
            <Header /> {/* Added Header */}

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-primary/5 to-transparent pointer-events-none" />
            <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <main className="relative max-w-4xl mx-auto px-6 pt-32 pb-20">
                <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-primary mb-8 transition-colors">
                    ← Back to Homepage
                </Link>

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary dark:text-brand-primary font-bold uppercase tracking-widest mb-6 shadow-sm">
                        <Scale size={14} />
                        Legal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-gray-200 dark:to-gray-400">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Please read these terms carefully before using our platform. They outline your rights and obligations when using OutlineDev.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-500 font-mono">
                        <Clock size={14} />
                        Last Updated: February 2026
                    </div>
                </div>

                {/* Content Container */}
                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-white/5 p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-black/20">

                    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-primary">

                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-2xl mb-6">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm">1</span>
                                Acceptance of Terms
                            </h2>
                            <p>
                                By accessing or using OutlineDev ("the Platform"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Platform. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of those changes.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-2xl mb-6">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm">2</span>
                                Educational Services
                            </h2>
                            <p>
                                OutlineDev provides mentorship, code reviews, and educational content. While we strive for excellence:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-brand-primary">
                                <li><strong>Career Commitment:</strong> While the tech market is dynamic, we are fully committed to your success. We provide top-tier resources, resume reviews, and interview prep to maximize your chances of landing your dream job. We are your partners in this journey.</li>
                                <li><strong>Empowerment & Responsibility:</strong> We empower you to build production-grade software. You own your code and your creative decisions—our mentors are here to guide, review, and elevate your work, ensuring you retain full intellectual ownership and responsibility for what you ship.</li>
                                <li><strong>Mentorship Availability:</strong> Sessions are subject to mentor availability. We reserve the right to reschedule with reasonable notice.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-2xl mb-6">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-sm">3</span>
                                User Accounts
                            </h2>
                            <p>
                                To access certain features, you must create an account. You represent that:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 not-prose">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                    <h3 className="font-bold mb-2">Security</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">You are responsible for safeguarding your password and for all activities that occur under your account.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                    <h3 className="font-bold mb-2">Accuracy</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">You agree to provide accurate, current, and complete information during the registration process.</p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-2xl mb-6">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm">4</span>
                                Intellectual Property
                            </h2>
                            <p>
                                The content, features, and functionality of OutlineDev (including but not limited to tutorials, videos, and design) are owned by OutlineDev and are protected by international copyright, trademark, and other intellectual property laws.
                            </p>
                            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 my-4 rounded-r-lg not-prose">
                                <div className="flex gap-3">
                                    <AlertCircle className="text-amber-600 dark:text-amber-500 shrink-0" size={20} />
                                    <p className="text-sm text-amber-900 dark:text-amber-200">
                                        <strong>Note:</strong> Course materials are for your personal use only. Sharing, redistributing, or reselling our content is strictly prohibited and may result in immediate account termination.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-2xl mb-6">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm">5</span>
                                Payment & Refunds
                            </h2>
                            <p>
                                Certain services on OutlineDev are paid.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-brand-primary">
                                <li><strong>Subscription Services:</strong> Billed in advance on a recurring basis. You may cancel at any time.</li>
                                <li><strong>Refund Policy:</strong> We offer a 14-day money-back guarantee for course purchases if the content has not been substantially consumed ({'>'}30%). 1-on-1 mentorship sessions are non-refundable once completed.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="flex items-center gap-3 text-2xl mb-6">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/10 text-slate-600 dark:text-slate-400 text-sm">6</span>
                                Termination
                            </h2>
                            <p>
                                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                            </p>
                        </section>

                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-sm text-slate-500 dark:text-slate-500">
                            Questions? Contact us at <a href="mailto:support@outlinedev.com" className="text-brand-primary hover:underline">support@outlinedev.com</a>
                        </p>
                        <div className="flex gap-4">
                            <button className="px-6 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity">
                                I Agree
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

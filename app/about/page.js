import React from 'react';
import Image from 'next/image';
import { Target, Users, Globe, Award, Briefcase, Code } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../components/Header';

export const metadata = {
    title: 'About Us | OutlineDev',
    description: 'Learn about our mission to create the next generation of senior engineers.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#050510] relative overflow-hidden text-slate-900 dark:text-slate-100">
            <Header />

            {/* Background Ambience */}
            <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-brand-primary/5 via-purple-500/5 to-transparent pointer-events-none" />

            <main className="relative pt-32 pb-20">

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
                        <Users size={14} />
                        Our Story
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
                        Building the <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600 dark:to-blue-400">Modern Engineer</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        OutlineDev wasn't built to just teach you syntax. We built this platform to bridge the massive gap between "knowing code" and "engineering systems."
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {[
                            { label: 'Learners', value: '50K+', icon: Users, color: 'text-blue-500' },
                            { label: 'Countries', value: '120+', icon: Globe, color: 'text-purple-500' },
                            { label: 'Mentors', value: '100+', icon: Target, color: 'text-green-500' },
                            { label: 'Hired', value: '94%', icon: Award, color: 'text-orange-500' },
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/5 p-8 rounded-3xl flex flex-col items-center text-center shadow-lg shadow-slate-200/50 dark:shadow-none">
                                <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
                                <div className="text-4xl font-black mb-1">{stat.value}</div>
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission Section */}
                <div className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-white/5 py-24 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">

                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl font-black">Not Just a Bootcamp.<br />A Career Forge.</h2>
                            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300">
                                <p>
                                    Most platforms stop at "Hello World." We start where others finish. Our curriculum is designed by Staff Engineers from top tech companies who faced the real challenges of scaling systems.
                                </p>
                                <p>
                                    We believe that <strong className="text-slate-900 dark:text-white">mentorship is the cheat code</strong> to a successful career. That's why we've integrated 1-on-1 guidance directly into your learning path.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-white/5">
                                    <Code className="text-brand-primary" />
                                    <span className="font-bold">Real-world Codebases</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-white/5">
                                    <Briefcase className="text-brand-primary" />
                                    <span className="font-bold">System Design Focus</span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-full hover:scale-105 transition-transform">
                                    Join the Movement
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-purple-500/20 rounded-3xl blur-3xl transform rotate-3" />
                            <div className="relative bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/10 flex-shrink-0" />
                                        <div className="space-y-2 w-full">
                                            <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-3/4" />
                                            <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-1/2" />
                                        </div>
                                    </div>
                                    <div className="h-32 bg-slate-200 dark:bg-white/10 rounded-xl w-full" />
                                    <div className="space-y-2">
                                        <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-full" />
                                        <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-5/6" />
                                    </div>
                                </div>
                                {/* Floating badge */}
                                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-dark-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                        <Award size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Top Rated Content</div>
                                        <div className="text-xs text-slate-500">By Industry Leaders</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}

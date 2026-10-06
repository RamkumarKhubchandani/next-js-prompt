import React from 'react';
import Image from 'next/image';
import { Target, Users, Globe, Award, Briefcase, Code } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../components/Header';

export const metadata = {
    title: 'About Us | OutlineDev',
    description: 'Learn about our mission to help developers build real, production-ready skills through personalized 1-on-1 mentorship.',
    alternates: {
        canonical: 'https://www.outlinedev.com/about',
    }
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
                        Our Mission
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
                        Building the <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600 dark:to-blue-400">Modern Engineer</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        We help developers build real, production-ready skills through personalized 1-on-1 mentorship, bridging the gap between basic syntax and architecting production systems.
                    </p>
                </div>

                {/* Core Pillars */}
                <div className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {[
                            { title: '1-on-1 Mentorship', desc: 'Direct, personal guidance tailored to your pace and goals.', icon: Users, color: 'text-blue-500' },
                            { title: 'Real Codebases', desc: 'Build and debug production-grade applications.', icon: Code, color: 'text-purple-500' },
                            { title: 'System Design', desc: 'Master architecture, scalability, and state management.', icon: Briefcase, color: 'text-green-500' },
                            { title: 'Career Outcomes', desc: 'Gain confidence for technical interviews and senior roles.', icon: Award, color: 'text-orange-500' },
                        ].map((pillar, idx) => (
                            <div key={idx} className="bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/5 p-8 rounded-3xl flex flex-col items-center text-center shadow-lg shadow-slate-200/50 dark:shadow-none">
                                <pillar.icon className={`w-8 h-8 mb-4 ${pillar.color}`} />
                                <div className="text-xl font-black mb-2">{pillar.title}</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">{pillar.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission Section */}
                <div className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-white/5 py-24 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">

                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl font-black">Not Just a Course.<br />A Dedicated Mentorship.</h2>
                            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300">
                                <p>
                                    Most platforms stop at syntax walkthroughs. We focus on real-world engineering challenges, code reviews, and architectural problem-solving.
                                </p>
                                <p>
                                    We believe that <strong className="text-slate-900 dark:text-white">mentorship accelerates growth</strong>. That's why we pair learners directly with experienced engineers for tailored feedback and live debugging sessions.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-white/5">
                                    <Code className="text-brand-primary" />
                                    <span className="font-bold">Production Codebases</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-white/5">
                                    <Briefcase className="text-brand-primary" />
                                    <span className="font-bold">System Design Focus</span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-full hover:scale-105 transition-transform">
                                    Get Started
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
                                        <div className="font-bold text-sm">Practitioner Mentors</div>
                                        <div className="text-xs text-slate-500">Real Engineering Insights</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Methodology Section (E-E-A-T Trust Builder) */}
                <div className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-4">Our Learning Methodology</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                            A hands-on framework designed to help engineers develop problem-solving independence and technical depth.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "1. Vetted Engineering Curriculums",
                                desc: "No random tutorials. Our roadmaps focus on production-relevant skills, scalable design patterns, and modern tooling.",
                                icon: Code
                            },
                            {
                                title: "2. Active Debugging Sprints",
                                desc: "Real engineers don't just write code; they fix it. Our sessions train your mental model to isolate, debug, and resolve complex issues.",
                                icon: Target
                            },
                            {
                                title: "3. Direct 1-on-1 Guidance",
                                desc: "Review architecture, walk through difficult pull requests, and get personalized feedback on best practices and design decisions.",
                                icon: Users
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-[#0c0c14] border border-slate-200 dark:border-white/5 p-8 rounded-3xl shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6">
                                    <item.icon size={22} />
                                </div>
                                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mentorship Philosophy Section */}
                <div className="max-w-7xl mx-auto px-6 mb-20">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[2.5rem] p-8 md:p-14 border border-slate-700 shadow-xl">
                        <div className="max-w-3xl">
                            <h2 className="text-3xl md:text-4xl font-black mb-6">Mentorship by Real Practitioners</h2>
                            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                We connect engineers with mentors who have practical industry experience in React, Next.js, Node.js, and distributed system design. Whether you are prepping for senior interviews, architecting a project, or breaking through a plateau, our mentors provide direct, actionable guidance.
                            </p>
                            <Link href="/mentors" className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-slate-900 bg-brand-primary rounded-full hover:scale-105 transition-transform">
                                Explore Mentorship Areas
                            </Link>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}

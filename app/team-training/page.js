"use client";
import React from 'react';
import { Presentation, TrendingUp, Zap, Users, ArrowRight, CheckCircle, BarChart, Server } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../components/Header';

export default function TeamTrainingPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#050510] relative text-slate-900 dark:text-slate-100 font-sans">
            <Header />

            <main className="relative pt-32 pb-20 px-6">

                {/* Hero */}
                <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-bold uppercase tracking-widest mb-6">
                        <Users size={14} />
                        Enterprise Training
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                        Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">High-Performance</span> <br /> Engineering Culture
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
                        Stop technical debt before it starts. Customized training programs for teams moving to React, Next.js, or cloud-native architectures.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform shadow-xl">
                        Schedule a Consultation
                        <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-orange-500/5 via-red-500/5 to-transparent pointer-events-none" />

                {/* Features Grid */}
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        { title: 'Modern Stack Migration', icon: Zap, desc: 'Move from legacy code (AngularJS, jQuery) to Next.js without halting production features.' },
                        { title: 'Testing Culture', icon: CheckCircle, desc: 'Implement TDD and shifting left with Playwright, Vitest, and CI/CD pipelines.' },
                        { title: 'System Design Workshops', icon: Server, desc: 'Interactive whiteboarding sessions for senior engineers to master scalability.' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-3xl hover:border-orange-500/50 transition-colors shadow-lg shadow-slate-200/50 dark:shadow-none group">
                            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* ROI Section */}
                <div className="max-w-7xl mx-auto bg-slate-900 text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden mb-24">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black mb-6">The ROI of Excellence</h2>
                            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                Investing in your team's skills is cheaper than refactoring bad code or hiring new seniors. Our training pays for itself in:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Reduced code review cycles by 40%',
                                    'Zero critical bugs in production post-training',
                                    'Higher retention of senior engineering talent',
                                    'Faster onboarding for new hires'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 font-bold text-slate-100">
                                        <div className="bg-green-500/20 p-1 rounded-full">
                                            <CheckCircle className="text-green-400" size={16} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                            <div className="flex items-end gap-4 h-48 mb-6">
                                <div className="w-1/4 bg-white/10 rounded-t-xl h-[40%]" />
                                <div className="w-1/4 bg-white/10 rounded-t-xl h-[60%]" />
                                <div className="w-1/4 bg-white/10 rounded-t-xl h-[50%]" />
                                <div className="w-1/4 bg-gradient-to-t from-orange-500 to-red-500 rounded-t-xl h-[90%] relative">
                                    <div className="absolute -top-10 inset-x-0 text-center font-bold text-orange-400">+300%</div>
                                </div>
                            </div>
                            <p className="text-center font-mono text-sm text-slate-400">Team Velocity Increase</p>
                        </div>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="text-center">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Trusted By Engineering Teams At</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder Company Logos - Using text for simplicity, specific icons could be added */}
                        {['Acme Corp', 'TechFlow', 'DataSystems', 'CloudScale', 'InnovateX'].map((company, i) => (
                            <span key={i} className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-200">{company}</span>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}

"use client";
import React from 'react';
import { Mic, Video, Award, Calendar, Star, Check, Users, MonitorPlay, Code2 } from 'lucide-react';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';

export default function MockInterviewsPage() {

    const openConnectModal = () => {
        const event = new CustomEvent('open-connect-modal-global', {
            detail: {
                headline: "Book a Mock Interview",
                subhead: "Simulate a real FAANG interview. Choose typical Algo/DS, System Design, or Frontend specific rounds.",
                defaultNotes: "I want to practice for a [Role] position at [Company]...",
                ctaLabel: "Schedule Session"
            }
        });
        window.dispatchEvent(event);
    };

    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "Senior Frontend at Vercel",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            text: "The system design feedback was brutal but necessary. My actual interview felt easy in comparison. Worth every penny."
        },
        {
            name: "David Chen",
            role: "Backend Engineer at Uber",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            text: "My mentor spotted a recursive pattern flaw I've been making for years. Fixed it, and cleared the Amazon bar raiser next week."
        },
        {
            name: "Priya Patel",
            role: "SDE II at Amazon",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            text: "I was freezing up during live coding. The mock sessions helped me talk through my thought process while typing. Highly recommend!"
        },
        {
            name: "Michael Ross",
            role: "Full Stack at Notion",
            image: "https://randomuser.me/api/portraits/men/86.jpg",
            text: "No fluff. Just straight, actionable advice on how to structure my answers for L5/Senior roles."
        },
        {
            name: "James Wilson",
            role: "Staff Engineer at Netflix",
            image: "https://randomuser.me/api/portraits/men/22.jpg",
            text: "The mock interview environment was exactly like the real thing. It helped me get over my nerves completely."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#050510] relative text-slate-900 dark:text-slate-100 font-sans">
            <Header />

            <main className="relative pt-32 pb-20 px-6">

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-32">

                    <div className="order-2 md:order-1 relative group">
                        <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-500" />
                        <div className="relative bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-white/10 shadow-xl transition-transform hover:scale-[1.02]">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                    <span className="font-bold text-sm uppercase tracking-wider text-red-500">Live Recording</span>
                                </div>
                                <div className="bg-slate-100 dark:bg-black/40 px-3 py-1 rounded text-xs font-mono text-slate-500">
                                    00:45:22
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 h-64 mb-6">
                                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden ring-4 ring-transparent hover:ring-brand-primary/20 transition-all">
                                    <UsersOverlay name="You" />
                                    <Code2 className="opacity-10 w-24 h-24 absolute" />
                                </div>
                                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden ring-4 ring-transparent hover:ring-brand-primary/20 transition-all">
                                    <Video className="text-slate-400 w-12 h-12" />
                                    <UsersOverlay name="Ex-Google Interviewer" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest px-2">
                                <span>Voice Connected</span>
                                <span className="text-green-500">Excellent Connection</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 md:order-2 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-xs font-bold uppercase tracking-widest">
                            <Mic size={14} />
                            Interview Prep
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black leading-tight">
                            Crush Your Next <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Coding Interview</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                            Don't practice on your dream job. Book mock interviews with mentors who have hired for Google, Amazon, and Netflix. Get actionable feedback on your code, communication, and system design.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <button
                                onClick={openConnectModal}
                                className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 hover:scale-105 transition-all shadow-lg shadow-purple-600/25 flex items-center gap-2"
                            >
                                <Calendar size={18} />
                                Book a Session
                            </button>
                            <div className="flex -space-x-3 items-center px-4">
                                {testimonials.slice(0, 3).map((t, i) => (
                                    <img key={i} src={t.image} alt={t.name} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" />
                                ))}
                                <span className="ml-4 text-sm font-bold text-slate-500">+200 hired</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Features / Details Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-32">
                    {[
                        { icon: Code2, title: "Data Structures", desc: "Master Trees, Graphs, DP and Heaps with problems actually asked in interviews." },
                        { icon: MonitorPlay, title: "System Design", desc: "Learn to design scalable systems like Twitter, Uber, or WhatsApp from scratch." },
                        { icon: Users, title: "Behavioral", desc: "Nail the 'STAR' method and culture fit questions to show you're a team player." }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-brand-primary/50 transition-colors">
                            <feature.icon className="w-10 h-10 text-brand-primary mb-6" />
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Reviews Section */}
                <div className="mb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Real Engineers. Real Results.</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">Join hundreds of engineers who leveled up their careers.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 relative">
                                <div className="flex gap-1 text-orange-400 mb-4">
                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 mb-6 font-medium leading-relaxed">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">{t.name}</div>
                                        <div className="text-xs font-bold text-brand-primary uppercase tracking-wider">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}

function UsersOverlay({ name }) {
    return (
        <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1.5 rounded-lg text-white text-xs font-bold backdrop-blur-md flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {name}
        </div>
    )
}

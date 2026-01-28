"use client";
import React, { useState, useEffect } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Shield, Clock, CheckCircle, ArrowRight, Code, Trophy, Users, Zap, X, Globe, Video, MessageSquare, Sparkles } from 'lucide-react';
import MentorshipClient from '../../mentorship/MentorshipClient';

export function MentorshipLanding({ skill, location, suffix }) {
    const [showForm, setShowForm] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Capitalize helper
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const title = `Top ${skill.name} ${cap(suffix)} in ${location.name}`;

    const toggleForm = () => setShowForm(!showForm);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Live Activity Ticker Data - REALISTIC GLOBAL NAMES
    const requests = [
        { name: 'Rahul', topic: skill.name, loc: 'Bangalore, India', time: 'just now' },
        { name: 'Sarah', topic: 'Full Stack', loc: 'Austin, USA', time: '2 mins ago' },
        { name: 'Amit', topic: 'React', loc: 'Pune, India', time: '5 mins ago' },
        { name: 'James', topic: skill.name, loc: 'London, UK', time: '12 mins ago' },
        { name: 'Priya', topic: 'Node.js', loc: 'Mumbai, India', time: '15 mins ago' },
        { name: 'David', topic: skill.name, loc: 'New York, USA', time: '22 mins ago' },
        { name: 'Sneha', topic: 'Python', loc: 'Delhi, India', time: '30 mins ago' },
        { name: 'Michael', topic: 'AWS', loc: 'San Francisco, USA', time: '45 mins ago' },
    ];

    return (
        <div className="min-h-screen bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100 font-sans selection:bg-brand-primary/30">
            <Header />

            {/* Hero Section with Premium Gradient Background */}
            <section className="relative pt-32 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-dark-900">
                {/* Animated Background Orbs */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/20 rounded-full blur-[120px] -z-10 animate-pulse mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000 mix-blend-screen" />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Left Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-brand-primary font-bold mb-8 shadow-xl"
                            >
                                <Users size={18} className="animate-bounce" />
                                <span className="text-white">World-class experts available for {location.name}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-white"
                            >
                                Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-400">{skill.name}</span> <br />
                                with Premium {cap(suffix).replace(/-/g, ' ')}.
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                            >
                                Stop struggling with bugs alone. Get instant, 1:1 {suffix.includes('help') ? 'assistance' : 'mentorship'} from senior {skill.name} engineers who provide expert guidance online. We bring the world's best talent directly to you in {location.name}.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
                            >
                                <button
                                    onClick={toggleForm}
                                    className="group relative px-8 py-5 bg-brand-primary text-dark-900 font-extrabold text-lg rounded-full hover:shadow-[0_0_40px_-10px_rgba(0,245,160,0.5)] transition-all overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative flex items-center gap-3">
                                        <Zap size={20} fill="currentColor" />
                                        {suffix.includes('help') ? `Get ${skill.name} Help` : `Find a ${skill.name} Mentor`}
                                    </span>
                                </button>

                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-4">
                                        {[
                                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
                                            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                                            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop'
                                        ].map((src, i) => (
                                            <img key={i} src={src} alt="Mentor" className="w-12 h-12 rounded-full border-2 border-dark-900 object-cover" />
                                        ))}
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                        </div>
                                        <span className="text-sm font-medium text-gray-400">Trusted by 2,000+ developers</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Visual - Code Window Stylized */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="hidden lg:block w-full max-w-lg relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse" />
                            <div className="relative bg-dark-800 border border-dark-700 rounded-3xl p-6 shadow-2xl">
                                <div className="flex items-center gap-2 mb-4 border-b border-dark-700 pb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-2 text-xs text-gray-500 font-mono">mentor_session.js</span>
                                </div>
                                <div className="space-y-3 font-mono text-sm">
                                    <div className="flex gap-4">
                                        <span className="text-gray-600">1</span>
                                        <span className="text-purple-400">import</span>
                                        <span className="text-white">{`{ Expert }`}</span>
                                        <span className="text-purple-400">from</span>
                                        <span className="text-green-400">'{`./${location.id}`}'</span>;
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600">2</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600">3</span>
                                        <span className="text-purple-400">async function</span>
                                        <span className="text-blue-400">master{skill.name}</span>() {`{`}
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600">4</span>
                                        <span className="ml-4 text-purple-400">const</span>
                                        <span className="text-white">mentor</span>
                                        <span className="text-purple-400">=</span>
                                        <span className="text-purple-400">await</span>
                                        <span className="text-blue-400">findMentor</span>({`{`}
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600">5</span>
                                        <span className="ml-8 text-white">skill:</span>
                                        <span className="text-green-400">'{skill.name}'</span>,
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600">6</span>
                                        <span className="ml-8 text-white">location:</span>
                                        <span className="text-green-400">'{location.name}'</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600">7</span>
                                        <span className="ml-4">{`});`}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600">8</span>
                                        <span className="ml-4 text-white">mentor.solveBug();</span> <span className="text-gray-500">// 🚀 instant fix!</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600">9</span>
                                        <span className="text-white">{`}`}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Float Card */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="absolute -bottom-6 -left-6 bg-white dark:bg-dark-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-dark-700 flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Payment</p>
                                    <p className="font-bold text-dark-900 dark:text-white">100% Secured in Escrow</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Live Activity Ticker - HIGH CONTRAST & VISIBLE */}
            <div className="bg-brand-primary text-dark-900 border-y border-brand-primary/20 py-3 overflow-hidden font-bold sticky top-16 z-30 shadow-lg">
                <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
                    {[...requests, ...requests, ...requests].map((r, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 rounded-full bg-dark-900 animate-ping" />
                            <span>{r.name} from {r.loc} found a <span className="underline">{r.topic}</span> mentor {r.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* NEW: How It Works (CodeMentor Improved) - HIGH CONTRAST & WOW */}
            <section className="py-32 bg-[#050505] relative overflow-hidden">
                {/* Ambient Blurs for "WOW" Factor */}
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-24">
                        <span className="inline-block py-1 px-4 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 font-bold text-sm mb-6 tracking-widest uppercase shadow-[0_0_20px_-5px_rgba(0,245,160,0.3)]">
                            The Future of Learning
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            How to get <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-green-400 drop-shadow-[0_0_15px_rgba(0,245,160,0.5)]">AI-Matched</span> <br className="hidden md:block" /> {skill.name} help.
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            We replaced the "search bar" with an intelligent agent. It understands your code context and finds the perfect human match in milliseconds.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-16">
                        {/* Step 1 */}
                        <div className="group relative bg-dark-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:bg-dark-900/80 transition-all duration-500 hover:-translate-y-2 hover:border-brand-primary/50 hover:shadow-[0_0_50px_-20px_rgba(0,245,160,0.4)]">
                            <div className="absolute -top-6 left-8 w-14 h-14 bg-brand-primary text-dark-900 rounded-2xl flex items-center justify-center border-4 border-[#050505] shadow-[0_0_20px_rgba(0,245,160,0.6)] z-20 transform group-hover:scale-110 transition-transform duration-300">
                                <span className="font-black text-2xl">1</span>
                            </div>
                            <div className="mt-8 mb-6 h-40 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent rounded-2xl group-hover:from-brand-primary/10 transition-colors border border-white/5">
                                <MessageSquare size={64} className="text-gray-400 group-hover:text-brand-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Post a Request</h3>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                                Tell our AI exactly what you need. <br />
                                <span className="text-brand-primary/90 italic font-medium">"Fix my Playwright flakiness"</span>
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="group relative bg-dark-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:bg-dark-900/80 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_0_50px_-20px_rgba(59,130,246,0.4)]">
                            <div className="absolute -top-6 left-8 w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center border-4 border-[#050505] shadow-[0_0_20px_rgba(59,130,246,0.6)] z-20 transform group-hover:scale-110 transition-transform duration-300">
                                <span className="font-black text-2xl">2</span>
                            </div>
                            <div className="mt-8 mb-6 h-40 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent rounded-2xl group-hover:from-blue-500/10 transition-colors border border-white/5">
                                <Sparkles size={64} className="text-gray-400 group-hover:text-blue-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">AI Matches You</h3>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                                Our engine scans 5,000+ profiles to find the 3 experts who have solved your <b>exact value</b> proposition before.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="group relative bg-dark-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:bg-dark-900/80 transition-all duration-500 hover:-translate-y-2 hover:border-green-500/50 hover:shadow-[0_0_50px_-20px_rgba(34,197,94,0.4)]">
                            <div className="absolute -top-6 left-8 w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center border-4 border-[#050505] shadow-[0_0_20px_rgba(34,197,94,0.6)] z-20 transform group-hover:scale-110 transition-transform duration-300">
                                <span className="font-black text-2xl">3</span>
                            </div>
                            <div className="mt-8 mb-6 h-40 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent rounded-2xl group-hover:from-green-500/10 transition-colors border border-white/5">
                                <Shield size={64} className="text-gray-400 group-hover:text-green-500 transition-all duration-500 group-hover:scale-110" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Secure Escrow</h3>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                                Chat for free. Money is held safely by us until you approve the session. <span className="text-green-400 font-bold">100% Risk Free.</span>
                            </p>
                        </div>
                    </div>

                    {/* NEW: Vetting / Trust Section */}
                    <div className="mt-24 p-8 md:p-12 bg-dark-900/50 border border-white/10 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[80px]" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 font-bold text-xs uppercase mb-4 border border-yellow-500/20">
                                    <Trophy size={14} />
                                    Top 1% Talent Only
                                </div>
                                <h3 className="text-3xl font-black text-white mb-4">We reject 99% of applicants.</h3>
                                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                    Most platforms let anyone join. We don't. Every mentor passes a rigorous <b>7-Round Interview Process</b> testing technical depth, communication, and teaching ability.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {['Code Tests', 'System Design', 'Communication', 'Live Teaching'].map(item => (
                                        <li key={item} className="flex items-center gap-2 text-gray-300 font-medium">
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                                <CheckCircle size={12} strokeWidth={4} />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Visual Stat */}
                            <div className="w-full md:w-auto bg-black/50 p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center min-w-[200px]">
                                <span className="text-5xl font-black text-white mb-2">7</span>
                                <span className="text-sm text-gray-400 uppercase tracking-wider text-center">Interview<br />Rounds</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 text-center">
                        <button
                            onClick={toggleForm}
                            className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-black text-dark-900 transition-all duration-200 bg-brand-primary rounded-full hover:w-full md:hover:w-auto hover:px-16 hover:shadow-[0_0_60px_-15px_rgba(0,245,160,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                        >
                            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                            <span className="relative flex items-center gap-3">
                                Get {skill.name} Help Now
                                <ArrowRight className="transition-transform group-hover:translate-x-2" />
                            </span>
                        </button>
                        <p className="mt-6 text-sm text-gray-500 uppercase tracking-widest font-bold">
                            <Clock size={14} className="inline mr-2 -mt-1 text-brand-primary" />
                            Avg Response: <span className="text-white">120 Seconds</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* NEW: AI Matching Intelligence Section */}
            <section className="py-24 bg-gradient-to-b from-dark-900 via-dark-800 to-white dark:to-dark-900 overflow-hidden relative">
                {/* Background beams */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[100px] animate-pulse" />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm mb-4 border border-brand-primary/20">
                            <Sparkles size={14} className="inline mr-1" />
                            Smart-Match Technology™
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                            Humans make mistakes. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">Our AI doesn't.</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Stop scrolling through hundreds of profiles hoping to find "the one".
                            Our AI analyzes your code style, goals, and personality to predict the perfect mentorship match.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* THE OLD WAY (Mistake Prone) - IMPROVED VISIBILITY */}
                        <div className="bg-dark-900 p-8 rounded-3xl border border-red-500/20 relative group hover:border-red-500/40 transition-all duration-300">
                            <div className="absolute top-4 right-4 bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-xs font-bold uppercase border border-red-500/20">The Old Way</div>
                            <h3 className="text-2xl font-bold text-gray-200 mb-6">Manual Selection</h3>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-4 text-gray-400 group-hover:text-gray-300 transition-colors">
                                    <div className="mt-1 p-1 bg-red-500/10 rounded-full text-red-500 shrink-0">
                                        <X size={16} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <span className="block font-medium text-white mb-1">Guesswork & Hope</span>
                                        <span className="text-sm">Endless scrolling through profiles with unverified claims.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 text-gray-400 group-hover:text-gray-300 transition-colors">
                                    <div className="mt-1 p-1 bg-red-500/10 rounded-full text-red-500 shrink-0">
                                        <X size={16} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <span className="block font-medium text-white mb-1">Risk of Fraud</span>
                                        <span className="text-sm">No escrow protection. You pay upfront and hope they deliver.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 text-gray-400 group-hover:text-gray-300 transition-colors">
                                    <div className="mt-1 p-1 bg-red-500/10 rounded-full text-red-500 shrink-0">
                                        <X size={16} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <span className="block font-medium text-white mb-1">Mismatched Skills</span>
                                        <span className="text-sm">Often they don't know the exact version or framework you need.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* THE AI WAY (Perfect) */}
                        <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-8 rounded-3xl border border-brand-primary/30 shadow-[0_0_50px_-20px_rgba(0,245,160,0.3)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-brand-primary/5 animate-pulse" />
                            <div className="relative z-10">
                                <div className="absolute top-4 right-4 bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                                    <Zap size={12} fill="currentColor" />
                                    AI Powered
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Intelligent Matching</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-gray-300">
                                        <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                                            <Code size={16} />
                                        </div>
                                        <span>Matches your exact tech stack & version</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-300">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                            <MessageSquare size={16} />
                                        </div>
                                        <span>Adapts to your communication style</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-300">
                                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                                            <Trophy size={16} />
                                        </div>
                                        <span>Proven 98% Match Success Rate</span>
                                    </li>
                                </ul>
                                <button onClick={toggleForm} className="w-full mt-8 py-4 rounded-xl bg-brand-primary text-dark-900 font-bold hover:bg-white transition-colors flex items-center justify-center gap-2">
                                    <Sparkles size={18} />
                                    Find My Perfect Match with AI
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Props Grid - BENTO GRID STYLE */}
            <section className="py-24 px-4 bg-white dark:bg-dark-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Why learn {skill.name} with us?</h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">We don't just match you with anyone. We match you with industry veterans.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                        {/* Card 1: Large */}
                        <div className="md:col-span-2 row-span-1 bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl p-8 border border-dark-700 relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10" />
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center text-brand-primary mb-6">
                                        <Code size={24} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2">Real-World {skill.name} Projects</h3>
                                    <p className="text-gray-400 text-lg">Don't just watch videos. Build production-grade applications with guidance on architecture, clean code, and deployment.</p>
                                </div>
                                <div className="flex gap-2">
                                    {['System Design', 'Code Review', 'Testing', 'Deployment'].map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-dark-700 text-xs font-mono text-gray-300 border border-dark-600">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-gray-50 dark:bg-dark-800 rounded-3xl p-8 border border-gray-200 dark:border-dark-700 hover:scale-[1.02] transition-transform">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">1:1 Personalization</h3>
                            <p className="text-gray-500">Your mentor adapts to YOUR learning style. No generic curriculum. We solve YOUR specific problems.</p>
                        </div>

                        {/* Card 3 - UPDATED TIMEZONE MESSAGING */}
                        <div className="bg-gray-50 dark:bg-dark-800 rounded-3xl p-8 border border-gray-200 dark:border-dark-700 hover:scale-[1.02] transition-transform">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                                <Globe size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Timezone Agnostic</h3>
                            <p className="text-gray-500">Timezones are not a worry at all. Our developers are available 24/7 globally. We work on your schedule, anytime.</p>
                        </div>

                        {/* Card 4: Large */}
                        <div className="md:col-span-2 bg-gradient-to-br from-brand-primary to-green-400 rounded-3xl p-8 relative overflow-hidden text-dark-900">
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                                <div className="flex-1">
                                    <h3 className="text-3xl font-black mb-2">Satisfaction Guaranteed</h3>
                                    <p className="font-medium text-dark-800/80 mb-6 text-lg">Not happy with your first session? We offer a full refund. We are that confident in our {skill.name} experts.</p>
                                    <button onClick={toggleForm} className="px-6 py-3 bg-dark-900 text-white font-bold rounded-xl hover:bg-black transition-colors">
                                        Find a Mentor Risk-Free
                                    </button>
                                </div>
                                <div className="w-32 h-32 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                                    <Shield size={64} className="text-dark-900/80" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Content Block - REVAMPED: THE LOCAL ADVANTAGE */}
            <section className="py-20 px-4 bg-gray-50 dark:bg-dark-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black mb-4 dark:text-white">Why find a {skill.name} mentor in {location.name}?</h2>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                            {location.name} is a thriving tech hub. Don't just learn to code; learn to build a career in your local market.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-dark-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-dark-700">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                                <Globe size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 dark:text-white">Insider {location.name} Market Access</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Get referrals to top companies in {location.name}. Our mentors work at the companies you want to join.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-dark-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-dark-700">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 dark:text-white">Local Networking</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Connect with other {skill.name} developers in {location.country}. Build a network that lasts a lifetime.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-dark-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-dark-700">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                                <Code size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 dark:text-white">Industry-Standard Reviews</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Stop writing "tutorial code". Learn the design patterns and architecture used by senior engineers in {location.name} today.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW: FAQ Section */}
            <section className="py-20 bg-dark-900 border-t border-dark-800">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-black text-center text-white mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Is the first chat really free?", a: "Yes. You can chat with potential mentors, discuss your goals, and ensure they are a good fit before you ever pay a cent." },
                            { q: "How does the AI matching work?", a: "Our system analyzes your specific 'ask' (e.g. 'Playwright v1.4 debugging') and matches you with mentors who have solved that exact problem recently." },
                            { q: "Is my payment secure?", a: "100% Secure. Your payment is held in escrow by us. We only release it to the mentor after you confirm you are satisfied with the session." },
                            { q: "Can I get help with a specific assignment?", a: "Absolutely. Our experts specialize in unblocking you on specific tasks, assignments, and bug fixes. Just describe what you need." }
                        ].map((faq, i) => (
                            <details key={i} className="group bg-dark-800 rounded-2xl border border-dark-700 open:border-brand-primary/50 transition-colors">
                                <summary className="p-6 cursor-pointer font-bold text-white flex items-center justify-between">
                                    {faq.q}
                                    <span className="text-brand-primary group-open:rotate-180 transition-transform">
                                        <ArrowRight size={20} className="rotate-90" />
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* FIXED: Modal Layout */}
            <AnimatePresence>
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleForm}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="relative w-full max-w-5xl bg-white dark:bg-dark-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={toggleForm}
                                className="absolute top-4 right-4 z-50 p-2 bg-gray-100 dark:bg-dark-800 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
                                title="Close"
                            >
                                <X size={20} />
                            </button>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                {/* We wrap the client in a tailored container to ensure it renders correctly */}
                                <div className="p-1">
                                    <MentorshipClient prefill={{ stack: [skill.id] }} isInModal={true} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}

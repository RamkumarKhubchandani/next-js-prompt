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

    // Fake "Live" requests for social proof
    const requests = [
        { name: 'David', topic: skill.name, loc: location.name, time: '2 mins ago' },
        { name: 'Sarah', topic: 'Full Stack', loc: location.name, time: '14 mins ago' },
        { name: 'Rahul', topic: skill.name, loc: 'Remote', time: '1 hour ago' },
        { name: 'Priya', topic: 'React', loc: location.name, time: '5 mins ago' },
        { name: 'James', topic: 'Python', loc: 'New York', time: '10 mins ago' },
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
                                <MapPin size={18} className="animate-bounce" />
                                <span className="text-white">Connecting experts in {location.name}, {location.country}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-white"
                            >
                                Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-400">{skill.name}</span> <br />
                                with Local Experts.
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                            >
                                Stop struggling with bugs alone. Get instant, 1:1 help from senior {skill.name} engineers in {location.name} who have been exactly where you are.
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
                                        Find a {skill.name} Mentor
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
                                        <span className="text-sm font-medium text-gray-400">4.9/5 from 2,000+ students</span>
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
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Status</p>
                                    <p className="font-bold text-dark-900 dark:text-white">Mentor Matched!</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Live Activity Ticker Stylized */}
            <div className="bg-dark-800/50 border-y border-dark-700 py-3 overflow-hidden backdrop-blur-sm sticky top-16 z-30">
                <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
                    {[...requests, ...requests, ...requests].map((r, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shadow-[0_0_10px_rgba(0,245,160,0.5)]" />
                            <span className="font-medium text-white">{r.name}</span> from {r.loc} found a <span className="text-brand-primary">{r.topic}</span> mentor {r.time}
                        </div>
                    ))}
                </div>
            </div>

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

                        {/* Card 3 */}
                        <div className="bg-gray-50 dark:bg-dark-800 rounded-3xl p-8 border border-gray-200 dark:border-dark-700 hover:scale-[1.02] transition-transform">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                                <Globe size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Timezone Matched</h3>
                            <p className="text-gray-500">Mentors available in {location.name} timezones. No more waking up at 3 AM for a tutoring session.</p>
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

            {/* SEO Content Block */}
            <section className="py-20 px-4 bg-gray-50 dark:bg-dark-800/50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">Why find a {skill.name} mentor in {location.name}?</h2>
                    <div className="prose dark:prose-invert prose-lg mx-auto text-gray-600 dark:text-gray-400">
                        <p>
                            {location.name} is rapidly becoming a major hub for technology. With hundreds of startups and established tech giants hiring in {location.name}, the demand for skilled {skill.name} developers is higher than ever.
                        </p>
                        <p>
                            However, learning {skill.name} on your own can be frustrating. Tutorials often skip the "why" and focus only on the "how". By connecting with a local mentor in {location.name}, you get:
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-4 list-none pl-0 my-8">
                            {[
                                `Insider knowledge of the ${location.name} job market`,
                                `Networking opportunities within ${location.country}`,
                                `Code reviews based on industry standards`,
                                `Mock interviews tailored to local companies`
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 bg-white dark:bg-dark-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-dark-700">
                                    <CheckCircle className="text-brand-primary shrink-0 mt-1" size={18} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p>
                            Whether you are looking to break into the industry or upgrade your existing skills, finding a {skill.name} {suffix} in {location.name} can significantly accelerate your journey.
                        </p>
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

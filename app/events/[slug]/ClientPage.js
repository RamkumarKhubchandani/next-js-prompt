"use client";
import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Zap, BookOpen, ChevronDown, CheckCircle2, ShieldCheck, Trophy, Users, Star, MessageCircle, Quote } from 'lucide-react';
import { eventsData } from '../../lib/eventsData';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { RegistrationModal } from '../../components/events/RegistrationModal';

export default function EventDetailPage({ initialEvent }) {
    const event = initialEvent;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [openModule, setOpenModule] = useState(null);
    const [activeTab, setActiveTab] = useState("group");

    // If event not found, return null (the server component handles 404 usually, but good to be safe)
    if (!event) {
        return <div className="min-h-screen flex items-center justify-center">Event not found</div>;
    }

    const handleRegister = (dateObj) => {
        setSelectedDate(dateObj);
        setIsModalOpen(true);
    };

    const toggleModule = (index) => {
        setOpenModule(openModule === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-light-50 dark:bg-dark-900 text-dark-900 dark:text-light-100 font-sans selection:bg-brand-primary/30">
            <Header />

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brand-primary/5 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] left-[-20%] w-[50vw] h-[50vw] bg-blue-500/5 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Link
                    href="/events"
                    className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-brand-primary mb-10 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to All Events
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-8">

                        {/* Title Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-12"
                        >
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${event.price === 'FREE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-brand-primary/10 text-brand-primary'}`}>
                                    {event.price === 'FREE' ? 'Scholarship / Free' : 'Premium'}
                                </span>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={16} className="fill-current" />
                                    <Star size={16} className="fill-current" />
                                    <Star size={16} className="fill-current" />
                                    <Star size={16} className="fill-current" />
                                    <Star size={16} className="fill-current" />
                                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">({event.rating || 4.9}/5 from {event.reviewCount || '500+'} alumni)</span>
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-dark-900 dark:text-white leading-[1.1]">
                                {event.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 dark:text-light-300 font-medium leading-relaxed">
                                {event.shortDescription}
                            </p>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="rounded-3xl overflow-hidden aspect-video relative mb-12 shadow-2xl shadow-gray-200 dark:shadow-black/50"
                        >
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                            <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-primary/10 to-transparent border border-brand-primary/10">
                                <h4 className="font-bold text-brand-primary mb-2 flex items-center gap-2">
                                    <Zap size={18} /> AI-Assisted Engineering
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Master "LLM Prompting" to code 5x faster. Learn how to pair-program with AI effectively.
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/10">
                                <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                                    <Users size={18} /> 5-Person Squads
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Build the capstone project in a real Agile team. Experience merge conflicts, code reviews, and sprints.
                                </p>
                            </div>
                            {event.highlights.map((h, i) => (
                                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-700 shadow-sm">
                                    <div className="mt-1 bg-gray-100 dark:bg-dark-700 p-2 rounded-full text-gray-500 shrink-0">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <span className="font-bold text-dark-900 dark:text-white">{h}</span>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="prose prose-lg dark:prose-invert max-w-none mb-20">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <BookOpen className="text-brand-primary" />
                                Deep Dive Overview
                            </h3>
                            <p className="text-gray-600 dark:text-light-300 leading-relaxed font-medium">
                                {event.fullDescription}
                            </p>
                            <div className="not-prose mt-6 p-6 rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30">
                                <p className="text-yellow-800 dark:text-yellow-500 font-bold flex gap-2">
                                    <Star className="fill-yellow-500 text-yellow-500" />
                                    Premium Feature: Learn with AI
                                </p>
                                <p className="text-sm text-yellow-800/80 dark:text-yellow-500/80 mt-2">
                                    We don't just teach code. We master <strong className="font-bold text-yellow-900 dark:text-yellow-400">Generative AI Integration</strong> for accelerated learning. You will learn advanced <strong className="font-bold text-yellow-900 dark:text-yellow-400">LLM Prompting Strategies</strong> to debug, refactor, and build complex systems 10x faster.
                                </p>
                            </div>
                        </div>

                        {/* Timeline Curriculum */}
                        <div className="mb-20">
                            <h2 className="text-3xl font-black text-dark-900 dark:text-white mb-8">Professional Roadmap</h2>

                            {/* Tab Switcher */}
                            {event.groupCurriculum && event.oneToOneCurriculum && (
                                <div className="flex border border-gray-200 dark:border-dark-700 mb-8 p-1 bg-gray-100/50 dark:bg-dark-800/50 rounded-2xl max-w-lg">
                                    <button
                                        onClick={() => { setActiveTab("group"); setOpenModule(null); }}
                                        className={`flex-1 py-3 text-center text-sm font-bold rounded-xl transition-all ${
                                            activeTab === "group"
                                                ? "bg-white dark:bg-dark-700 text-brand-primary shadow-sm"
                                                : "text-gray-500 hover:text-gray-950 dark:hover:text-white"
                                        }`}
                                    >
                                        Group Workshop (2 Days, 4h)
                                    </button>
                                    <button
                                        onClick={() => { setActiveTab("oneToOne"); setOpenModule(null); }}
                                        className={`flex-1 py-3 text-center text-sm font-bold rounded-xl transition-all ${
                                            activeTab === "oneToOne"
                                                ? "bg-white dark:bg-dark-700 text-brand-primary shadow-sm"
                                                : "text-gray-500 hover:text-gray-950 dark:hover:text-white"
                                        }`}
                                    >
                                        1-on-1 Training (10 Days)
                                    </button>
                                </div>
                            )}

                            <div className="relative border-l-2 border-gray-200 dark:border-dark-700 ml-4 md:ml-6 space-y-8 pb-4">
                                {((event.groupCurriculum && event.oneToOneCurriculum)
                                    ? (activeTab === "group" ? event.groupCurriculum : event.oneToOneCurriculum)
                                    : event.curriculum
                                ).map((item, idx) => {
                                    const isOpen = openModule === idx;
                                    return (
                                        <div key={idx} className="relative pl-8 md:pl-12">
                                            <div className={`absolute -left-[9px] top-6 w-5 h-5 rounded-full border-4 transition-all duration-300 z-10 ${isOpen ? 'bg-brand-primary border-brand-primary/30 scale-110' : 'bg-white dark:bg-dark-800 border-gray-300 dark:border-dark-600'}`} />

                                            <motion.div
                                                className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${isOpen ? 'bg-white dark:bg-dark-800 border-brand-primary ring-1 ring-brand-primary/20 shadow-xl' : 'bg-white dark:bg-dark-800/50 border-gray-200 dark:border-dark-700 hover:border-brand-primary/50'
                                                    }`}
                                                onClick={() => toggleModule(idx)}
                                            >
                                                <div className="p-6 flex items-center justify-between">
                                                    <div className="flex items-center gap-4 md:gap-6">
                                                        <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${isOpen ? 'bg-brand-primary text-white' : 'bg-gray-100 dark:bg-dark-700 text-gray-500'}`}>
                                                            {item.day}
                                                        </span>
                                                        <h4 className={`text-lg md:text-xl font-bold ${isOpen ? 'text-dark-900 dark:text-white' : 'text-gray-700 dark:text-light-300'}`}>
                                                            {item.title}
                                                        </h4>
                                                    </div>
                                                    <ChevronDown size={20} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-brand-primary' : ''}`} />
                                                </div>

                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                        >
                                                            <div className="px-6 pb-6 pt-0 border-t border-gray-100 dark:border-dark-700/50 mt-2">
                                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                                                                    {item.topics?.map((t, i) => (
                                                                        <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-600 dark:text-light-300">
                                                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                                                                            <span>{t}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="mb-20">
                            <h2 className="text-3xl font-black text-dark-900 dark:text-white mb-10 flex items-center gap-3">
                                <MessageCircle className="text-brand-primary" />
                                Alumni Success Stories
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {(event.reviews || []).map((review) => (
                                    <div key={review.id} className="p-6 rounded-3xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-700 shadow-lg shadow-gray-200/50 dark:shadow-none">
                                        <div className="flex items-center gap-4 mb-4">
                                            <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border-2 border-brand-primary/20" />
                                            <div>
                                                <h5 className="font-bold text-dark-900 dark:text-white">{review.name}</h5>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{review.role}</p>
                                            </div>
                                            <div className="ml-auto flex gap-0.5 text-yellow-500">
                                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">
                                            "{review.text}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Sticky Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-6">

                            {/* Registration Card */}
                            <div className="p-8 rounded-[2rem] bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 shadow-2xl shadow-gray-200/50 dark:shadow-black/50 relative overflow-hidden">
                                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-primary to-blue-500" />

                                <div className="text-center mb-8 mt-2">
                                    <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-3">Total Investment</p>
                                    <div className="flex items-center justify-center gap-3">
                                        <span className="text-5xl font-black text-dark-900 dark:text-white tracking-tighter">
                                            {event.price}
                                        </span>
                                    </div>
                                    {event.price === 'FREE' ? (
                                        <p className="text-sm font-medium text-green-600 mt-2 bg-green-50 dark:bg-green-900/20 inline-block px-3 py-1 rounded-full">
                                            Usually $499 • Scholarship applied
                                        </p>
                                    ) : event.pricingDetails ? (
                                        <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-dark-700/50 border border-gray-100 dark:border-dark-700 text-left space-y-2 text-xs font-medium">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Group Cohort:</span>
                                                <span className="font-bold text-dark-900 dark:text-white">{event.pricingDetails.group}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">1-on-1 Mentorship:</span>
                                                <span className="font-bold text-dark-900 dark:text-white">{event.pricingDetails.oneToOne}</span>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-light-300">
                                        <ShieldCheck className="text-green-500" size={18} />
                                        <span>Official Certification Included</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold text-dark-900 dark:text-white bg-brand-primary/10 -mx-3 px-3 py-2 rounded-lg">
                                        <Trophy className="text-brand-primary" size={18} />
                                        <span>Interview Prep + Job Support</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-light-300">
                                        <Users className="text-blue-500" size={18} />
                                        <span>5-Person Group Project</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-light-300">
                                        <Zap className="text-purple-500" size={18} />
                                        <span>Learn with LLM Techniques</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {!event.isComingSoon && event.dates.length > 0 ? (
                                        event.dates.map(date => (
                                            <button
                                                key={date.id}
                                                onClick={() => handleRegister(date)}
                                                className="w-full py-4 rounded-xl bg-dark-900 dark:bg-white text-white dark:text-dark-900 font-bold hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg flex justify-between items-center px-6"
                                            >
                                                <div className="text-left">
                                                    <div className="text-sm opacity-80 font-medium">Workshop Starts</div>
                                                    <div>{date.date}</div>
                                                </div>
                                                <ArrowRight size={20} />
                                            </button>
                                        ))
                                    ) : (
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="w-full py-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-dark-600 text-gray-500 hover:text-brand-primary hover:border-brand-primary font-bold transition-all"
                                        >
                                            Join Priority Waitlist
                                        </button>
                                    )}
                                </div>
                                <p className="text-center text-xs text-gray-400 mt-6">
                                    Selection based on profile review.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <RegistrationModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                eventName={event.title}
                date={selectedDate?.date}
                time={selectedDate?.time}
            />
        </div>
    );
}

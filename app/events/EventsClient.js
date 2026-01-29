"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Users, Code, ArrowRight, Sparkles, Star, Globe } from 'lucide-react';
import { eventsData } from '../lib/eventsData';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

function SpotlightCard({ children, className = "" }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.1),
              transparent 80%
            )
          `,
                }}
            />
            {children}
        </div>
    );
}

export default function EventsClient() {
    return (
        <div className="min-h-screen bg-light-50 dark:bg-dark-900 text-dark-900 dark:text-light-100 font-sans selection:bg-brand-primary/30">
            <Header />

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-primary/5 rounded-full blur-[100px]" />
                <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                {/* Hero Section */}
                <div className="text-center mb-20 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8"
                    >
                        <Globe size={14} className="text-teal-600 dark:text-brand-primary" />
                        <span className="text-sm font-bold tracking-wide uppercase text-teal-600 dark:text-brand-primary">Global Cohorts Open</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black tracking-tight mb-6 text-dark-900 dark:text-white"
                    >
                        Accelerate Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600">Engineering Career.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        Expert-led workshops. Collaborative builds. <span className="text-dark-900 dark:text-white font-bold underline decoration-brand-primary underline-offset-4">Zero cost for top talent.</span>
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventsData.map((event, index) => (
                        <SpotlightCard key={event.id} className="rounded-3xl flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300">
                            {/* Image */}
                            <div className="h-56 relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 z-20">
                                    <div className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md border border-gray-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-dark-900 dark:text-white shadow-sm">
                                        {event.price === 'FREE' ? 'Scholarship / Free' : event.price}
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 z-20">
                                    {event.isComingSoon ? (
                                        <span className="px-3 py-1 rounded-full bg-yellow-400 text-dark-900 text-xs font-bold uppercase shadow-sm">
                                            Waitlist
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 rounded-full bg-brand-primary text-white text-xs font-bold uppercase shadow-sm flex items-center gap-1.5">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                            </span>
                                            Active
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-black mb-2 text-dark-900 dark:text-white group-hover:text-brand-primary transition-colors leading-tight">
                                    {event.title}
                                </h3>

                                <div className="flex items-center gap-1 mb-4">
                                    <div className="flex text-yellow-500">
                                        <Star size={14} className="fill-current" />
                                        <Star size={14} className="fill-current" />
                                        <Star size={14} className="fill-current" />
                                        <Star size={14} className="fill-current" />
                                        <Star size={14} className="fill-current" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 ml-1">{event.rating || 4.9} ({event.reviewCount || '100+'} reviews)</span>
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                                    {event.shortDescription}
                                </p>

                                <div className="mt-auto space-y-6">
                                    <div className="flex items-center gap-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1.5">
                                            <Users size={16} className="text-brand-primary" />
                                            <span>10 Seats</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Code size={16} className="text-blue-500" />
                                            <span>30 Days</span>
                                        </div>
                                    </div>

                                    {/* Highlighted Benefit */}
                                    <div className="py-2 px-4 -mx-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 flex items-center gap-2">
                                        <Star size={16} className="text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400 animate-pulse" />
                                        <span className="text-sm font-bold text-green-700 dark:text-green-300">
                                            Interview Prep + Job Support
                                        </span>
                                    </div>

                                    <Link
                                        href={`/events/${event.slug}`}
                                        className="group/btn relative flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-dark-900 dark:bg-white text-white dark:text-dark-900 font-bold text-center hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                                    >
                                        View Details
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-32 p-12 rounded-[2.5rem] bg-gradient-to-br from-indigo-900 to-dark-900 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                        <Sparkles size={200} className="text-white" />
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Not sure which path to take?</h2>
                        <p className="text-indigo-200 text-lg mb-8">
                            Talk to our mentor team. We'll review your GitHub and goals to place you in the perfect cohort.
                        </p>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-connect-modal-global', { detail: { headline: 'Consult with an Expert', subhead: 'Let\'s find the right workshop for you.' } }))}
                            className="px-8 py-4 bg-white text-indigo-900 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg"
                        >
                            Talk to an Advisor
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

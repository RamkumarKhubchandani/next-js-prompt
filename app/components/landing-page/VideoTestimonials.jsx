"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ShieldCheck, Star, Video, Sparkles, UserCheck } from 'lucide-react';
import { trackEvent } from '../GoogleAnalytics';

const VIDEO_TESTIMONIALS = [
    {
        id: "j95D0J5sbIw",
        name: "Nitin Jangra",
        role: "Frontend & React AI Student",
        location: "India",
        headline: "“Ramkumar Sir provided exceptionally detailed and precise instruction.”",
        summary: "Nitin shares how the live 1-on-1 sessions, personalized code reviews, and React + AI hands-on guidance transformed his engineering skills.",
        tag: "1:1 Mentorship",
        rating: 5
    },
    {
        id: "to-XFIrB89U",
        name: "Devindra",
        role: "Full Stack Development Mentee",
        location: "India",
        headline: "“Clear conceptual clarity and real-world problem solving approach.”",
        summary: "Devindra walks through his learning journey, highlighting how complex web architecture concepts were broken down into practical steps.",
        tag: "Career & Tech Mentorship",
        rating: 5
    }
];

export function VideoTestimonials() {
    const [activeVideoId, setActiveVideoId] = useState(null);

    const handlePlay = (video) => {
        setActiveVideoId(video.id);
        try {
            if (typeof trackEvent === 'function') {
                trackEvent('video_testimonial_play', {
                    video_id: video.id,
                    student_name: video.name
                });
            }
        } catch (e) {
            // Ignore analytics errors
        }
    };

    return (
        <section id="video-testimonials" className="py-24 bg-slate-50 dark:bg-[#08080A] border-y border-slate-200/80 dark:border-white/5 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-primary/10 dark:bg-brand-primary/15 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-brand-primary text-xs font-bold uppercase tracking-wider mb-4"
                    >
                        <Video size={14} />
                        Real Student Experiences
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4"
                    >
                        Watch Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-brand-primary to-teal-400">Testimonials</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
                    >
                        Hear directly from developers who accelerated their engineering careers through live 1-on-1 mentorship with Ramkumar Khubchandani.
                    </motion.p>
                </div>

                {/* 2-Column Video Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {VIDEO_TESTIMONIALS.map((video, idx) => {
                        const isPlaying = activeVideoId === video.id;

                        return (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.15 }}
                                viewport={{ once: true }}
                                className="flex flex-col bg-white dark:bg-[#0D0D11] rounded-3xl border border-slate-200 dark:border-white/10 p-5 sm:p-6 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(0,245,160,0.08)] transition-all duration-300"
                            >
                                {/* Video Container (16:9 Aspect Ratio) */}
                                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner group">
                                    {isPlaying ? (
                                        <iframe
                                            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                                            title={`${video.name} Testimonial`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="w-full h-full border-0"
                                        />
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handlePlay(video)}
                                            aria-label={`Play testimonial video from ${video.name}`}
                                            className="w-full h-full relative block text-left focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                        >
                                            {/* Lazy loaded thumbnail image */}
                                            <img
                                                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                                                alt={`${video.name} Video Feedback`}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                            />

                                            {/* Gradient Shade Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:via-black/20 transition-colors" />

                                            {/* Top Pill: Verified Badge */}
                                            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold">
                                                <UserCheck size={12} className="text-brand-primary" />
                                                <span>{video.tag}</span>
                                            </div>

                                            {/* Center Play Button Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] transition-all duration-300">
                                                    <Play size={28} className="fill-white translate-x-0.5" />
                                                </div>
                                            </div>

                                            {/* Bottom Caption Overlay */}
                                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                                                <span className="font-semibold drop-shadow-md flex items-center gap-1.5">
                                                    <Sparkles size={13} className="text-amber-400" />
                                                    Click to play video
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono">
                                                    YouTube
                                                </span>
                                            </div>
                                        </button>
                                    )}
                                </div>

                                {/* Video Metadata & Review Text */}
                                <div className="mt-5 flex flex-col flex-1 justify-between">
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <div className="flex items-center gap-1">
                                                {[...Array(video.rating)].map((_, i) => (
                                                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                                                ))}
                                                <span className="ml-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                                                    5.0
                                                </span>
                                            </div>
                                            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                                                Verified Student
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug mb-2">
                                            {video.headline}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                            {video.summary}
                                        </p>
                                    </div>

                                    {/* Student Info Footer */}
                                    <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                                                {video.name}
                                                <ShieldCheck size={14} className="text-brand-primary" fill="currentColor" stroke="black" />
                                            </h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {video.role} • {video.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default VideoTestimonials;

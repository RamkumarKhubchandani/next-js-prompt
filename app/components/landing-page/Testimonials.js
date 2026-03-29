"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { MessageSquareQuote, MapPin, Star, Terminal, ShieldCheck, Code2, Globe2 } from "lucide-react";
import { cn } from "../../lib/utils";

// --- Data (Keeping the user requested dataset) ---
const testimonials = [
    { name: "Anjali Khubchandani", email: "anjali0311@gmail.com", location: "Bangalore, India", stack: "React", quote: "The advanced React patterns and architecture deep-dives drastically improved how I build enterprise applications. A total game-changer.", gradient: "from-blue-500 to-cyan-500", initials: "AK" },
    { name: "Lamia Khan", email: "lamiakhan89@gmail.com", location: "London, UK", stack: "JavaScript", quote: "Mastering under-the-hood JavaScript mechanics gave me the confidence to ace top-tier engineering interviews.", gradient: "from-yellow-400 to-orange-500", initials: "LK" },
    { name: "Amandeep Kaur", email: "aman.kaur21@gmail.com", location: "Toronto, Canada", stack: "Angular", quote: "Finally, a curriculum that explains Angular Signals and complex RxJS streams in a way that actually makes sense.", gradient: "from-red-500 to-pink-600", initials: "AK" },
    { name: "Komal Baskar", email: "komal.bharathgadde@gmail.com", location: "Sydney, Australia", stack: "Playwright", quote: "Automating our entire end-to-end testing suite was seamless after understanding the Playwright architecture taught here. Highly recommended!", gradient: "from-emerald-400 to-teal-500", initials: "KB" },
    { name: "Nitish More", email: "nitesh89more@gmail.com", location: "Pune, India", stack: "Node.js", quote: "Learning to optimize Node.js event loops helped me architect high-performance APIs capable of handling millions of users.", gradient: "from-green-600 to-emerald-800", initials: "NM" },
    { name: "Manisha D", email: "manisha05dhole@gmail.com", location: "Mumbai, India", stack: "Vue", quote: "The Composition API explanations were incredibly clear. Transitioning our legacy codebase to Vue 3 became instantly manageable.", gradient: "from-emerald-300 to-emerald-600", initials: "MD" },
    { name: "Nisha Sachdev", email: "nishassach@gmail.com", location: "New York, USA", stack: "Full Stack", quote: "The perfect bridge between frontend design and backend scalable architecture. I launched my full-stack MERN application in weeks.", gradient: "from-purple-600 to-indigo-600", initials: "NS" },
    { name: "Melinda Lindgren", email: "melinda_lindgren@hotmail.com", location: "Stockholm, Sweden", stack: "TypeScript", quote: "Strict typing, advanced generics, and enterprise TS implementations saved our repository from countless production bugs.", gradient: "from-blue-600 to-indigo-800", initials: "ML" },
    { name: "Thais Ribeiro", email: "thaisr44@gmail.com", location: "São Paulo, Brazil", stack: "React & Next.js", quote: "The Next.js App Router and Server Components modules completely changed my approach to building fast, SEO-optimized web apps.", gradient: "from-gray-700 to-gray-900", initials: "TR" },
    { name: "Vishal Chavan", email: "vishalcha22@gmail.com", location: "Hyderabad, India", stack: "Angular & RxJS", quote: "The mentor-led approach to solving complex state management in Angular is what sets this training apart from standard online courses.", gradient: "from-red-600 to-red-800", initials: "VC" },
    { name: "Riya Shelar", email: "riyashelar137@gmail.com", location: "Pune, India", stack: "Full Stack - React", quote: "The MERN stack deep dives covered every aspect of building real-world enterprise architectures.", gradient: "from-blue-600 to-indigo-800", initials: "RS" },
    { name: "Evgeniya Blekher", email: "Evgeniya.Blekher@gmail.com", location: "Berlin, Germany", stack: "Playwright", quote: "Setting up CI/CD pipelines with Playwright has never been easier. Exceptional mentoring.", gradient: "from-emerald-500 to-teal-700", initials: "EB" }
];

const TechIcon = ({ label }) => (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
        <div className={`w-1.5 h-1.5 rounded-full ${label.includes("React") ? "bg-blue-400" :
                label.includes("Angular") ? "bg-red-500" :
                    label.includes("Vue") ? "bg-green-500" :
                        label.includes("Node") ? "bg-green-600" :
                            label.includes("JavaScript") ? "bg-yellow-400" :
                                label.includes("TypeScript") ? "bg-blue-600" :
                                    label.includes("Playwright") ? "bg-emerald-500" :
                                        label.includes("Full Stack") ? "bg-purple-500" :
                                            "bg-brand-primary"
            }`} />
        <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{label}</span>
    </div>
);

const TestimonialCard = ({ data, index }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className="relative p-6 rounded-2xl bg-white dark:bg-[#0A0A0C] border border-gray-100 dark:border-white/5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] dark:shadow-none hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(0,245,160,0.1)] transition-all duration-300 group"
    >
        {/* Tech Stack Badge - Absolute Top Right */}
        <div className="absolute top-4 right-4">
            <TechIcon label={data.stack} />
        </div>

        {/* Header: Avatar + Info */}
        <div className="flex items-start gap-4 mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${data.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                {data.initials}
            </div>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white leading-tight">
                    {data.name}
                    <ShieldCheck className="inline-block ml-1.5 w-4 h-4 text-brand-primary align-text-bottom" fill="currentColor" stroke="black" />
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{data.email}</p>
                <div className="flex items-center gap-1 mt-1.5 text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                    <MapPin size={10} />
                    {data.location}
                </div>
            </div>
        </div>

        {/* Quote */}
        <div className="relative z-10">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium">
                "{data.quote}"
            </p>
        </div>

        {/* Decorative Bottom Line */}
        <div className={`absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r ${data.gradient} opacity-20`} />
    </motion.div>
);

const MarqueeColumn = ({ items, speed = 50, reverse = false }) => {
    return (
        <div className="flex flex-col gap-6 overflow-hidden h-[800px] relative">
            <motion.div
                initial={{ y: reverse ? -1000 : 0 }}
                animate={{ y: reverse ? 0 : -1000 }}
                transition={{
                    repeat: Infinity,
                    duration: speed,
                    ease: "linear"
                }}
                className="flex flex-col gap-6"
            >
                {items.map((item, i) => (
                    <TestimonialCard key={i} data={item} index={i} />
                ))}
                {items.map((item, i) => (
                    <TestimonialCard key={`copy-${i}`} data={item} index={i} />
                ))}
            </motion.div>

            {/* Gradient Masks for Smooth Fade In/Out */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
        </div>
    );
};

export const Testimonials = () => {
    // Distribute testimonials into 3 columns for Marquee
    const col1 = testimonials.slice(0, 4);
    const col2 = testimonials.slice(4, 8);
    const col3 = testimonials.slice(8, 12);

    return (
        <section id="testimonials" className="py-32 bg-white dark:bg-[#050505] relative overflow-hidden">
            {/* Background World Map Abstract */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(128,128,128,0.5)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-20">
                {/* Premium Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Globe2 size={14} />
                        Global Engineering Hub
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
                    >
                        Trusted by the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 px-2 via-brand-primary to-purple-600 dark:from-blue-400 dark:via-brand-primary dark:to-purple-400">
                            World's Best Engineers
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        From <span className="font-bold text-gray-900 dark:text-white">Silicon Valley to Tokyo</span>. Join <span className="font-bold text-brand-primary">1,000+</span> architects mastering the modern stack.
                    </motion.p>

                    {/* Tech Stack Horizontal Strip */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-10 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        {["JavaScript", "React", "Angular", "Vue", "Node.js", "Python", "Rust", "Playwright"].map(tech => (
                            <div key={tech} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{tech}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Vertical Parallax Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[800px] overflow-hidden mask-gradient relative">
                    <MarqueeColumn items={col1} speed={60} />
                    <div className="hidden md:block pt-12"> {/* Offset the middle column */}
                        <MarqueeColumn items={col2} speed={80} reverse={true} />
                    </div>
                    <div className="hidden lg:block">
                        <MarqueeColumn items={col3} speed={70} />
                    </div>
                </div>
            </div>
        </section>
    );
};

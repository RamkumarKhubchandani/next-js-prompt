"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { MessageSquareQuote, MapPin, Star, Terminal, ShieldCheck, Code2, Globe2 } from "lucide-react";
import { cn } from "../../lib/utils";

// --- Data (Keeping the rich dataset) ---
const testimonials = [
    // React & Next.js
    { name: "Priya Sharma", role: "Frontend Lead", company: "Razorpay", location: "Bangalore, India", stack: "React & Next.js", quote: "The Next.js 15 advanced patterns modules are world-class. Finally understood Server Actions.", gradient: "from-blue-500 to-cyan-500", initials: "PS" },
    { name: "James Wilson", role: "Senior Dev", company: "Vercel", location: "San Francisco, USA", stack: "React", quote: "I've been using React for years, but the architectural deep dives here are unmatched.", gradient: "from-gray-700 to-gray-900", initials: "JW" },
    { name: "Arjun Mehta", role: "SDE II", company: "Swiggy", location: "Hyderabad, India", stack: "React Native", quote: "Moved from Web to Mobile smoothly thanks to the cross-platform tracks.", gradient: "from-orange-500 to-red-500", initials: "AM" },
    { name: "Sarah Jenkins", role: "UI Engineer", company: "Netflix", location: "Los Gatos, USA", stack: "React Performance", quote: "Optimized our render cycles by 40% after the 'React Internals' workshop.", gradient: "from-red-600 to-red-900", initials: "SJ" },

    // Angular
    { name: "Karthik R.", role: "Architect", company: "Infosys", location: "Pune, India", stack: "Angular", quote: "The only course that covers Angular Signals and RxJS properly.", gradient: "from-red-500 to-pink-600", initials: "KR" },
    { name: "Elena Popov", role: "Lead Dev", company: "Banking Corp", location: "London, UK", stack: "Angular Enterprise", quote: "Migrated our legacy app to Angular 17 smoothly.", gradient: "from-blue-600 to-blue-800", initials: "EP" },
    { name: "Amit Patel", role: "Tech Lead", company: "TCS", location: "Mumbai, India", stack: "Microfrontends", quote: "Mastered module federation. My team is flying now.", gradient: "from-indigo-500 to-purple-500", initials: "AP" },

    // Vue
    { name: "Zhang Wei", role: "Frontend Dev", company: "Tencent", location: "Shenzhen, China", stack: "Vue 3", quote: "Composition API explained perfectly. Vue has never felt this powerful.", gradient: "from-green-500 to-emerald-600", initials: "ZW" },
    { name: "Lucas Dubois", role: "Web Dev", company: "Ubisoft", location: "Paris, France", stack: "Vue & Nuxt", quote: "Built a massive e-com platform using Nuxt concepts.", gradient: "from-emerald-400 to-teal-500", initials: "LD" },

    // Node & Backend
    { name: "Rahul Verma", role: "Backend Lead", company: "Paytm", location: "Noida, India", stack: "Node.js & MongoDB", quote: "Scaling MongoDB sharding and indexing strategies were explained brilliantly.", gradient: "from-blue-700 to-indigo-900", initials: "RV" },
    { name: "Michael Chang", role: "Staff Eng", company: "LinkedIn", location: "Sunnyvale, USA", stack: "Node.js Streams", quote: "The Node.js internals section is a must for any senior engineer.", gradient: "from-blue-500 to-cyan-600", initials: "MC" },
    { name: "Ananya Das", role: "SDE III", company: "Flipkart", location: "Bangalore, India", stack: "Microservices", quote: "Event-driven architecture with Kafka and Node.js. Pure gold.", gradient: "from-yellow-500 to-orange-500", initials: "AD" },

    // Python & AI
    { name: "Kenji Tanaka", role: "AI Engineer", company: "Sony", location: "Tokyo, Japan", stack: "Python AI", quote: "Integrated LLMs into our pipeline using the Python + LangChain modules.", gradient: "from-rose-500 to-red-600", initials: "KT" },
    { name: "Jessica Lee", role: "SDET", company: "Microsoft", location: "Seattle, USA", stack: "Playwright", quote: "Automated our entire E2E suite with Python.", gradient: "from-blue-400 to-blue-600", initials: "JL" },

    // More Global
    { name: "Neha Roy", role: "DevOps", company: "Zoho", location: "Chennai, India", stack: "CI/CD", quote: "Best explanation of AWS ECS and K8s for developers.", gradient: "from-yellow-600 to-yellow-800", initials: "NR" },
    { name: "Carlos Gomez", role: "Full Stack", company: "Glovo", location: "Madrid, Spain", stack: "MERN Stack", quote: "The MERN advanced project saved me months of trial and error.", gradient: "from-yellow-400 to-orange-500", initials: "CG" },
    { name: "Siddharth Rao", role: "Founder", company: "TechStart", location: "Hyderabad, India", stack: "Full Stack", quote: "Launched my MVP in 4 weeks using the boilerplate provided.", gradient: "from-purple-600 to-indigo-600", initials: "SR" },
    { name: "Lars Jensen", role: "Backend", company: "Spotify", location: "Stockholm, SE", stack: "Rust/Node", quote: "The Rust for JS developers track is genius.", gradient: "from-green-500 to-emerald-700", initials: "LJ" },
    { name: "Divya Nair", role: "SDE", company: "Oracle", location: "Bangalore, India", stack: "Java/JS", quote: "Bridged my knowledge gap between enterprise Java and modern JS.", gradient: "from-red-600 to-red-800", initials: "DN" },
    { name: "Aditya Kumar", role: "Student", company: "IIT Bombay", location: "Mumbai, India", stack: "DSA", quote: "Placed at Google. The DSA in JS section was critical.", gradient: "from-blue-600 to-blue-900", initials: "AK" },
    { name: "Sophie Martin", role: "UX Eng", company: "Airbnb", location: "San Francisco, USA", stack: "Design Systems", quote: "The way you teach Design Systems with React is spot on.", gradient: "from-rose-500 to-red-500", initials: "SM" },
    { name: "Fatima Al-Sayed", role: "Backend", company: "Aramco", location: "Dhahran, SA", stack: "Python/Django", quote: "Enterprise Python patterns explained well.", gradient: "from-emerald-600 to-emerald-800", initials: "FA" },
    { name: "Varun Dhawan", role: "UI Dev", company: "Media.net", location: "Mumbai, India", stack: "CSS/JS", quote: "Animations module is fantastic.", gradient: "from-pink-500 to-purple-500", initials: "VD" },
    { name: "Bhavya Singh", role: "Full Stack", company: "PhonePe", location: "Bangalore, India", stack: "React/Node", quote: "Best resource for MERN stack scaling.", gradient: "from-purple-600 to-purple-800", initials: "BS" },
    { name: "Chitra Ramaswamy", role: "Lead", company: "HCL", location: "Chennai, India", stack: "Angular", quote: "Trained my whole team using this platform.", gradient: "from-blue-700 to-blue-900", initials: "CR" },
];

const TechIcon = ({ label }) => (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
        <div className={`w-1.5 h-1.5 rounded-full ${label.includes("React") ? "bg-blue-400" :
                label.includes("Angular") ? "bg-red-500" :
                    label.includes("Vue") ? "bg-green-500" :
                        label.includes("Node") ? "bg-green-600" :
                            label.includes("Python") ? "bg-yellow-500" :
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
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{data.role} @ {data.company}</p>
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
    // Distribute testimonials into 3 columns
    const col1 = testimonials.slice(0, 8);
    const col2 = testimonials.slice(8, 16);
    const col3 = testimonials.slice(16, 24);

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
                        From <span className="font-bold text-gray-900 dark:text-white">Silicon Valley to Tokyo</span>. Join <span className="font-bold text-brand-primary">50,000+</span> architects mastering the modern stack.
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

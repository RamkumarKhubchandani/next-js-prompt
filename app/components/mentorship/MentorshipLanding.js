"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Star, 
    Shield, 
    CheckCircle, 
    ArrowRight, 
    Code, 
    Users, 
    Zap, 
    X, 
    Globe, 
    MessageSquare, 
    Sparkles, 
    Building2, 
    PenTool,
    MapPin,
    Layers,
    Compass,
    BookOpen,
    Briefcase,
    Trophy,
    Clock,
    Check
} from 'lucide-react';
import MentorshipClient from '../../mentorship/MentorshipClient';
import { getSkillContent, getLocationContent } from '../../lib/seo-content';

// INITIAL REVIEWS DATA
const INITIAL_REVIEWS = [
    // Row 1
    { name: "Jason M.", role: "Frontend Dev", company: "Freelance", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop", text: "I was stuck on a hydration error for 3 days. My mentor fixed it in 2 minutes.", stars: 5 },
    { name: "Anjali P.", role: "Student", company: "University", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop", text: "The Mock Interview service is a game changer. I cracked the Amazon SDE-1 interview.", stars: 5 },
    { name: "Michael T.", role: "CTO", company: "Startup", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", text: "We use this to train our juniors. The quality of mentors is consistently excellent.", stars: 5 },
    { name: "Sarah L.", role: "QA Engineer", company: "TechCorp", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", text: "My test scripts were flaky. The mentor showed me the best patterns and now they are stable.", stars: 5 },
    { name: "David K.", role: "Full Stack", company: "Agency", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop", text: "Worth every penny. I learned more tricks in 1 hour here than in 20 hours of Udemy.", stars: 5 },
    { name: "Elena R.", role: "Backend Dev", company: "FinTech", img: "https://images.unsplash.com/photo-1554151228-14d9def656ec?w=100&h=100&fit=crop", text: "The expert helped me optimize my database queries. Saved us 50% on AWS bills!", stars: 5 },
    { name: "James H.", role: "Student", company: "Bootcamp", img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop", text: "My bootcamp didn't teach advanced patterns. This mentorship filled that gap perfectly.", stars: 5 },
    { name: "Priya S.", role: "Senior Dev", company: "MNC", img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop", text: "I needed a second opinion on my architecture. The mentor was world-class.", stars: 5 },
    { name: "Tom B.", role: "Indie Hacker", company: "Self", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop", text: "Built my MVP thanks to weekly guidance. Launched and profitable now!", stars: 5 },
    { name: "Grace L.", role: "Junior Dev", company: "Studio", img: "https://images.unsplash.com/photo-1595152772835-219674b2fa82?w=100&h=100&fit=crop", text: "I was terrified of deployment. My mentor walked me through CI/CD step by step.", stars: 5 },
    // Row 2
    { name: "Aiden M.", role: "Mobile Dev", company: "AppCo", img: "https://images.unsplash.com/photo-1618641986557-1ecd23095910?w=100&h=100&fit=crop", text: "Transitioning to a new stack was hard until I found this site. The roadmap helped immensely.", stars: 5 },
    { name: "Olivia C.", role: "Product Mgr", company: "SaaS", img: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=100&h=100&fit=crop", text: "I learned enough to communicate better with my eng team. Highly recommended for PMs.", stars: 4 },
    { name: "Daniel W.", role: "Freelancer", company: "Remote", img: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=100&h=100&fit=crop", text: "The escrow payment help makes me feel safe. No risk of getting scammed.", stars: 5 },
    { name: "Sophia K.", role: "Founder", company: "AI Startup", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop", text: "We hired a consultant here to review our code. Found critical security bugs instantly.", stars: 5 },
    { name: "Lucas F.", role: "Intern", company: "BigTech", img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop", text: "My mentor prepared me for my return offer interview. I got the job!", stars: 5 },
    { name: "Mia V.", role: "Self Taught", company: "N/A", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop", text: "Self-learning is lonely. Having a mentor to check in with weekly kept me accountable.", stars: 5 },
    { name: "Ethan R.", role: "DevOps", company: "CloudInc", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop", text: "Needed help with Docker integration. The expert knew exactly what flag I was missing.", stars: 5 },
    { name: "Ava J.", role: "Designer", company: "Creative", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop", text: "I bridge the gap between design and code now. Thanks to my amazing mentor!", stars: 5 },
    { name: "Noah P.", role: "SRE", company: "Bank", img: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=100&h=100&fit=crop", text: "Fixed a critical production bug in our service with help from a senior mentor.", stars: 5 },
    { name: "Bella T.", role: "Student", company: "College", img: "https://images.unsplash.com/photo-1628890917312-ac6235806175?w=100&h=100&fit=crop", text: "Best investment in my education. Way better than my university lectures.", stars: 5 }
];

// TOP TECH SKILLS FOR CROSS-LINKING
const POPULAR_INTERLINK_SKILLS = [
    { id: 'react', name: 'React' },
    { id: 'nextjs', name: 'Next.js' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'nodejs', name: 'Node.js' },
    { id: 'python', name: 'Python' },
    { id: 'ai-frontend', name: 'AI Frontend' },
    { id: 'react-native', name: 'React Native' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'angular', name: 'Angular' },
    { id: 'vue', name: 'Vue.js' },
    { id: 'svelte', name: 'Svelte' },
    { id: 'tailwind', name: 'Tailwind CSS' },
    { id: 'redux', name: 'Redux' },
    { id: 'playwright', name: 'Playwright' },
    { id: 'frontend-engineering', name: 'Frontend Engineering' },
    { id: 'website-design', name: 'Website Design' },
    { id: 'job-support', name: 'Job Support' },
];

// MAJOR TECH HUBS FOR WORLDWIDE CROSS-LINKING
const MAJOR_TECH_HUBS = [
    { id: 'online', name: 'Online / Remote' },
    { id: 'chicago', name: 'Chicago' },
    { id: 'new-york', name: 'New York' },
    { id: 'san-francisco', name: 'San Francisco' },
    { id: 'austin', name: 'Austin' },
    { id: 'seattle', name: 'Seattle' },
    { id: 'boston', name: 'Boston' },
    { id: 'los-angeles', name: 'Los Angeles' },
    { id: 'dallas', name: 'Dallas' },
    { id: 'silicon-valley', name: 'Silicon Valley' },
    { id: 'london', name: 'London' },
    { id: 'manchester', name: 'Manchester' },
    { id: 'toronto', name: 'Toronto' },
    { id: 'vancouver', name: 'Vancouver' },
    { id: 'montreal', name: 'Montreal' },
    { id: 'berlin', name: 'Berlin' },
    { id: 'amsterdam', name: 'Amsterdam' },
    { id: 'dublin', name: 'Dublin' },
    { id: 'paris', name: 'Paris' },
    { id: 'zurich', name: 'Zurich' },
    { id: 'stockholm', name: 'Stockholm' },
    { id: 'sydney', name: 'Sydney' },
    { id: 'singapore', name: 'Singapore' },
    { id: 'dubai', name: 'Dubai' },
    { id: 'tokyo', name: 'Tokyo' },
    { id: 'bangalore', name: 'Bangalore' },
    { id: 'pune', name: 'Pune' },
    { id: 'hyderabad', name: 'Hyderabad' },
    { id: 'gurgaon', name: 'Gurgaon' },
    { id: 'noida', name: 'Noida' },
    { id: 'mumbai', name: 'Mumbai' },
    { id: 'delhi', name: 'Delhi' },
];

export function MentorshipLanding({ skill, location, suffix, prefix, currentSlug }) {
    const [showForm, setShowForm] = useState(false);

    const [reviews, setReviews] = useState(INITIAL_REVIEWS);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [newReview, setNewReview] = useState({ name: '', role: '', company: '', text: '', stars: 5 });

    const skillContent = getSkillContent(skill.id);
    const locationContent = getLocationContent(location.id, location.name);

    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const toggleForm = () => setShowForm(!showForm);
    const toggleReviewModal = () => setShowReviewModal(!showReviewModal);

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const reviewToAdd = { ...newReview, img: `https://ui-avatars.com/api/?name=${newReview.name.replace(' ', '+')}&background=random&color=fff` };
        setReviews([reviewToAdd, ...reviews]);
        setShowReviewModal(false);
        setNewReview({ name: '', role: '', company: '', text: '', stars: 5 });
        alert('Thanks for your feedback! Your review has been added to the Wall of Love.');
    };

    const requests = [
        { name: 'Rahul', topic: skill.name, loc: 'Bangalore, India', time: 'just now' },
        { name: 'Sarah', topic: 'Full Stack', loc: 'Austin, USA', time: '2 mins ago' },
        { name: 'Amit', topic: 'React', loc: 'Pune, India', time: '5 mins ago' }
    ];

    const midPoint = Math.ceil(reviews.length / 2);
    const row1 = reviews.slice(0, midPoint);
    const row2 = reviews.slice(midPoint);

    // Related format slugs for the current skill + location
    const formatVariations = [
        { label: `1:1 ${skill.name} Tutors`, href: `/mentors/one-to-one-${skill.id}-tutors-in-${location.id}`, desc: "Personalized private coaching" },
        { label: `${skill.name} Job Support`, href: `/mentors/${skill.id}-job-support-in-${location.id}`, desc: "Sprint assistance & debugging" },
        { label: `${skill.name} Interview Prep`, href: `/mentors/${skill.id}-interview-help-in-${location.id}`, desc: "Mock interviews & system design" },
        { label: `Hire ${skill.name} Developers`, href: `/mentors/hire-${skill.id}-developers-in-${location.id}`, desc: "Vetted top 1% contract engineers" },
        { label: `Freelance ${skill.name} Experts`, href: `/mentors/freelance-${skill.id}-experts-in-${location.id}`, desc: "On-demand architecture consulting" },
        { label: `${skill.name} Mentors & Coaches`, href: `/mentors/${skill.id}-mentors-in-${location.id}`, desc: "Long-term career roadmap" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-dark-900 dark:text-light-100 font-sans selection:bg-brand-primary/30 transition-colors duration-500">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-dark-900 transition-colors duration-500">
                {/* Dual Mode Gradients */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full blur-[120px] -z-10 animate-pulse mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000 mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30 dark:opacity-20 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/50 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 text-brand-primary font-bold mb-8 shadow-xl"
                            >
                                <Users size={18} className="animate-bounce" />
                                <span className="text-slate-800 dark:text-white">World-class experts available for {location.name}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-slate-900 dark:text-white"
                            >
                                Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-500 dark:to-purple-400">{skill.name}</span> <br />
                                with Premium {cap(suffix).replace(/-/g, ' ')}.
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-lg md:text-xl text-slate-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
                            >
                                Accelerate your career with elite 1-on-1 {skill.name} coaching, live code reviews, and on-demand sprint debugging in {location.name}. Custom syllabus, job support, and zero fluff.
                            </motion.p>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                <button
                                    onClick={toggleForm}
                                    className="px-8 py-4 rounded-xl font-bold text-slate-950 bg-brand-primary hover:bg-emerald-400 shadow-xl shadow-brand-primary/20 transition-all flex items-center gap-2 cursor-pointer"
                                >
                                    <Zap size={18} />
                                    <span>Connect with a {skill.name} Mentor</span>
                                    <ArrowRight size={18} />
                                </button>
                                <a
                                    href={`https://wa.me/918237320942?text=Hi%20Ram%2C%20I%20am%20looking%20for%20a%20${encodeURIComponent(skill.name)}%20mentor%20in%20${encodeURIComponent(location.name)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-4 rounded-xl font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all flex items-center gap-2"
                                >
                                    <MessageSquare size={18} className="text-[#25D366]" />
                                    <span>Chat on WhatsApp</span>
                                </a>
                            </div>
                        </div>

                        {/* Right Form Card */}
                        <div className="w-full lg:w-[480px]">
                            <div className="bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase mb-4">
                                    <Sparkles size={13} />
                                    1:1 Matchmaker
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
                                    Find Your {skill.name} Mentor in {location.name}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-gray-400 mb-6">
                                    Tell us your current challenge or learning goal. We'll match you within 15 minutes.
                                </p>
                                <MentorshipClient prefill={{ stack: [skill.id] }} isInModal={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Activity Ticker - Dynamic Social Proof */}
            <div className="bg-brand-primary text-slate-950 border-y border-emerald-500/20 py-3.5 overflow-hidden font-bold sticky top-16 z-30 shadow-md">
                <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
                    {[...requests, ...requests, ...requests, ...requests].map((r, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping" />
                            <span>{r.name} from {r.loc} connected with a <strong className="underline">{r.topic}</strong> mentor {r.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works (AI Matching Process) */}
            <section className="py-24 bg-white dark:bg-[#080b14] relative overflow-hidden transition-colors duration-500">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-20">
                        <span className="inline-block py-1 px-4 rounded-full bg-brand-primary/15 text-brand-primary border border-brand-primary/30 font-bold text-xs uppercase tracking-wider mb-4">
                            How OutlineDev Works
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                            Get Matched with an Expert <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-emerald-400 to-teal-300">
                                {skill.name} Engineer in 15 Minutes
                            </span>
                        </h2>
                        <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
                            No endless browsing or unverified freelancers. Our platform pairs you directly with engineers who work with your exact tech stack.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {/* Step 1 */}
                        <div className="relative bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 p-8 rounded-3xl hover:-translate-y-2 transition-all duration-300 shadow-lg">
                            <div className="w-12 h-12 bg-brand-primary text-slate-950 font-black text-xl rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-brand-primary/30">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Share Your Challenge</h3>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                                Tell us whether you need 1-on-1 coaching, sprint debugging help, code reviews, or senior interview preparation.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 p-8 rounded-3xl hover:-translate-y-2 transition-all duration-300 shadow-lg">
                            <div className="w-12 h-12 bg-blue-500 text-white font-black text-xl rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-blue-500/30">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Instant Mentor Pairing</h3>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                                We match you with senior engineers who have already solved production problems in {skill.name}.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 p-8 rounded-3xl hover:-translate-y-2 transition-all duration-300 shadow-lg">
                            <div className="w-12 h-12 bg-emerald-500 text-white font-black text-xl rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-emerald-500/30">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Live Pair-Programming</h3>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                                Jump into a 1-on-1 session with screen share, live terminal debugging, and clear architectural feedback.
                            </p>
                        </div>
                    </div>

                    {/* Vetting / Trust Card */}
                    <div className="mt-16 p-8 md:p-10 bg-slate-100 dark:bg-dark-850 border border-slate-200 dark:border-dark-700 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold uppercase mb-3">
                                <Trophy size={14} />
                                Rigorously Vetted Engineers
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                                Top 1% Senior Technical Mentors
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                                Every mentor undergoes a multi-step code review and live technical screening to ensure you receive world-class guidance on modern architecture, security, and best practices.
                            </p>
                        </div>
                        <button
                            onClick={toggleForm}
                            className="px-8 py-4 rounded-xl font-bold text-slate-950 bg-brand-primary hover:bg-emerald-400 transition-all shrink-0 shadow-lg shadow-brand-primary/25 cursor-pointer"
                        >
                            Find a {skill.name} Mentor Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Wall of Love (Social Proof) */}
            <section className="py-20 bg-slate-100/60 dark:bg-dark-850 overflow-hidden border-y border-slate-200 dark:border-dark-800 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">Wall of Love</h2>
                    <p className="text-sm text-slate-500 dark:text-gray-400 mt-2">Loved by hundreds of engineers worldwide</p>
                </div>

                {/* Row 1 */}
                <div className="flex gap-6 animate-marquee hover:pause mb-6">
                    {row1.map((review, i) => (
                        <div key={i} className="min-w-[400px] bg-white dark:bg-dark-900 p-6 rounded-2xl border border-slate-200 dark:border-dark-700 shadow-lg hover:border-teal-500/50 dark:hover:border-brand-primary/50 transition-colors">
                            <div className="flex text-yellow-500 dark:text-yellow-400 mb-4 items-center gap-1">{[...Array(review.stars)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}</div>
                            <p className="text-slate-700 dark:text-gray-300 mb-6 italic text-sm leading-relaxed">"{review.text}"</p>
                            <div className="flex items-center gap-3">
                                <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full object-cover border border-slate-100 dark:border-white/10" />
                                <div><h4 className="text-slate-900 dark:text-white font-bold text-sm">{review.name}</h4><p className="text-xs text-slate-500 dark:text-gray-500">{review.role} @ {review.company}</p></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Row 2 */}
                <div className="flex gap-6 animate-marquee hover:pause" style={{ animationDirection: 'reverse' }}>
                    {row2.map((review, i) => (
                        <div key={i} className="min-w-[400px] bg-white dark:bg-dark-900 p-6 rounded-2xl border border-slate-200 dark:border-dark-700 shadow-lg hover:border-teal-500/50 dark:hover:border-brand-primary/50 transition-colors">
                            <div className="flex text-yellow-500 dark:text-yellow-400 mb-4 items-center gap-1">{[...Array(review.stars)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}</div>
                            <p className="text-slate-700 dark:text-gray-300 mb-6 italic text-sm leading-relaxed">"{review.text}"</p>
                            <div className="flex items-center gap-3">
                                <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full object-cover border border-slate-100 dark:border-white/10" />
                                <div><h4 className="text-slate-900 dark:text-white font-bold text-sm">{review.name}</h4><p className="text-xs text-slate-500 dark:text-gray-500">{review.role} @ {review.company}</p></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SEO Content Block */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-dark-900 transition-colors duration-500">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">Why find a {skill.name} mentor in {location.name}?</h2>
                        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">{location.name} has a rapidly expanding tech ecosystem. Build production-grade skills aligned with modern engineering requirements.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-dark-700 hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6"><Globe size={24} /></div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{location.name} Tech Ecosystem</h3>
                            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{locationContent.techHubDescription} {locationContent.referralNetwork}</p>
                        </div>

                        <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-dark-700 hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6"><Users size={24} /></div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{skill.name} Core Roadmap</h3>
                            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">Our structured milestones cover: {skillContent.modules.map(m => m.title).join(', ')}. Each module includes building production-ready apps.</p>
                        </div>

                        <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-dark-700 hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-6"><Code size={24} /></div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Technical Interview Prep</h3>
                            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed"><strong>{skillContent.faq.question}</strong> {skillContent.faq.answer.substring(0, 140)}...</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-slate-100/70 dark:bg-dark-850 border-t border-slate-200 dark:border-dark-800 transition-colors duration-500">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: skillContent.faq.question, a: skillContent.faq.answer },
                            { q: `How does 1-on-1 ${skill.name} mentorship in ${location.name} work?`, a: `You are matched directly with a Senior ${skill.name} mentor. Every session is 100% interactive, featuring live pair programming, architectural design, debugging assistance, and interview preparation.` },
                            { q: "Is the first diagnostic chat free?", a: "Yes. You can chat with your mentor, discuss your blockers or goals, and ensure they are a great fit before committing to paid coaching." },
                            { q: "Do you provide on-the-job sprint support?", a: "Yes! If you are currently working on a production project and need confidential, senior guidance on tricky bugs or architecture, we offer flexible job support packages." }
                        ].map((faq, i) => (
                            <details key={i} className="group bg-white dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-dark-700 open:border-brand-primary/50 transition-colors shadow-sm">
                                <summary className="p-6 cursor-pointer font-bold text-slate-900 dark:text-white flex items-center justify-between">{faq.q}<span className="text-brand-primary group-open:rotate-180 transition-transform"><ArrowRight size={20} className="rotate-90" /></span></summary>
                                <div className="px-6 pb-6 text-slate-600 dark:text-gray-400 leading-relaxed">{faq.a}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* DYNAMIC SEO INTERLINKING MESH (Google Discovery & Internal Authority Network) */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-dark-900 border-t border-slate-200 dark:border-dark-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
                            <Compass size={14} />
                            Explore Global Mentorship Network
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                            More Developer Tutors & Mentors in {location.name}
                        </h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-gray-400">
                            Browse verified 1-on-1 coding tutors, job support engineers, and technical interview coaches across popular stacks and global hubs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cluster 1: Other Tech Stacks in Current Location */}
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-slate-200 dark:border-dark-700 shadow-lg">
                            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-100 dark:border-dark-700 text-slate-900 dark:text-white">
                                <div className="w-8 h-8 rounded-lg bg-brand-primary/15 text-brand-primary flex items-center justify-center">
                                    <MapPin size={18} />
                                </div>
                                <h3 className="font-bold text-base">Top Tutors in {location.name}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {POPULAR_INTERLINK_SKILLS.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/mentors/one-to-one-${item.id}-tutors-in-${location.id}`}
                                        className={`text-xs px-3 py-2 rounded-xl border transition-all font-medium ${item.id === skill.id
                                            ? 'bg-brand-primary/15 text-brand-primary border-brand-primary/40 font-bold'
                                            : 'bg-slate-50 dark:bg-dark-900/80 text-slate-700 dark:text-gray-300 border-slate-200 dark:border-dark-700 hover:border-brand-primary/50 hover:text-brand-primary'
                                        }`}
                                    >
                                        1:1 {item.name} in {location.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Cluster 2: Current Tech Stack in Worldwide Global Hubs */}
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-slate-200 dark:border-dark-700 shadow-lg">
                            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-100 dark:border-dark-700 text-slate-900 dark:text-white">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center">
                                    <Globe size={18} />
                                </div>
                                <h3 className="font-bold text-base">{skill.name} Tutors Worldwide</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {MAJOR_TECH_HUBS.map((hub) => (
                                    <Link
                                        key={hub.id}
                                        href={`/mentors/one-to-one-${skill.id}-tutors-in-${hub.id}`}
                                        className={`text-xs px-3 py-2 rounded-xl border transition-all font-medium ${hub.id === location.id
                                            ? 'bg-blue-500/15 text-blue-500 border-blue-500/40 font-bold'
                                            : 'bg-slate-50 dark:bg-dark-900/80 text-slate-700 dark:text-gray-300 border-slate-200 dark:border-dark-700 hover:border-blue-500/50 hover:text-blue-500'
                                        }`}
                                    >
                                        {skill.name} in {hub.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Cluster 3: Alternative Formats for this Skill & Location */}
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-slate-200 dark:border-dark-700 shadow-lg">
                            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-100 dark:border-dark-700 text-slate-900 dark:text-white">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-500 flex items-center justify-center">
                                    <Briefcase size={18} />
                                </div>
                                <h3 className="font-bold text-base">{skill.name} Formats in {location.name}</h3>
                            </div>
                            <div className="space-y-2.5">
                                {formatVariations.map((v, idx) => (
                                    <Link
                                        key={idx}
                                        href={v.href}
                                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-dark-900/80 border border-slate-200 dark:border-dark-700 hover:border-purple-500/50 group transition-all"
                                    >
                                        <div>
                                            <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors block">
                                                {v.label}
                                            </span>
                                            <span className="text-[11px] text-slate-500 dark:text-gray-400">
                                                {v.desc}
                                            </span>
                                        </div>
                                        <ArrowRight size={14} className="text-slate-400 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MODALS */}
            <AnimatePresence>
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleForm} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 50 }} className="relative w-full max-w-5xl bg-white dark:bg-dark-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                            <button onClick={toggleForm} className="absolute top-4 right-4 z-50 p-2 bg-slate-100 dark:bg-dark-800 rounded-full hover:bg-slate-200 dark:hover:bg-dark-700 transition-colors" title="Close"><X size={20} /></button>
                            <div className="flex-1 overflow-y-auto custom-scrollbar"><div className="p-1"><MentorshipClient prefill={{ stack: [skill.id] }} isInModal={true} /></div></div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showReviewModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleReviewModal} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-lg bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-2xl shadow-2xl p-8 z-10">
                            <button onClick={toggleReviewModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:text-gray-500 dark:hover:text-white"><X size={24} /></button>
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-4"><Star size={32} fill="currentColor" /></div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Share Your Experience</h3>
                            </div>
                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-bold text-slate-500 dark:text-gray-400 mb-1">Name</label><input required type="text" className="w-full bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:outline-none" value={newReview.name} onChange={e => setNewReview({ ...newReview, name: e.target.value })} /></div>
                                    <div><label className="block text-sm font-bold text-slate-500 dark:text-gray-400 mb-1">Role</label><input required type="text" className="w-full bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:outline-none" value={newReview.role} onChange={e => setNewReview({ ...newReview, role: e.target.value })} /></div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 dark:text-gray-400 mb-3">Rating</label>
                                    <div className="flex justify-center gap-2">{[1, 2, 3, 4, 5].map(star => (<button type="button" key={star} onClick={() => setNewReview({ ...newReview, stars: star })} className={`p-2 rounded-full transition-all ${newReview.stars >= star ? 'text-yellow-400 scale-110' : 'text-slate-300 dark:text-gray-600'}`}><Star size={28} fill={newReview.stars >= star ? "currentColor" : "none"} /></button>))}</div>
                                </div>
                                <div><label className="block text-sm font-bold text-slate-500 dark:text-gray-400 mb-1">Review</label><textarea required rows={3} className="w-full bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:outline-none resize-none" value={newReview.text} onChange={e => setNewReview({ ...newReview, text: e.target.value })} /></div>
                                <button type="submit" className="w-full py-4 bg-brand-primary text-dark-900 font-black text-lg rounded-xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-dark-900 transition-colors mt-4">Submit Review</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}

"use client";
import React, { useState, useEffect } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Shield, CheckCircle, ArrowRight, Code, Users, Zap, X, Globe, MessageSquare, Sparkles, Building2, PenTool } from 'lucide-react';
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

export function MentorshipLanding({ skill, location, suffix }) {
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
                                className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                            >
                                {skillContent.description} Get instant, 1:1 {suffix.includes('help') ? 'assistance' : 'mentorship'} from senior {skill.name} engineers who provide expert guidance in {location.name} online.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
                            >
                                <button onClick={toggleForm} className="group relative px-8 py-5 bg-brand-primary text-dark-900 font-extrabold text-lg rounded-full hover:shadow-[0_0_40px_-10px_rgba(0,245,160,0.5)] transition-all overflow-hidden shadow-lg shadow-brand-primary/20">
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative flex items-center gap-3"><Zap size={20} fill="currentColor" />{suffix.includes('help') ? `Get ${skill.name} Help` : `Find a ${skill.name} Mentor`}</span>
                                </button>

                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-4">
                                        {['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop'].map((src, i) => (
                                            <img key={i} src={src} alt="Mentor" className="w-12 h-12 rounded-full border-2 border-white dark:border-dark-900 object-cover shadow-sm" />
                                        ))}
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                        </div>
                                        <span className="text-sm font-medium text-slate-500 dark:text-gray-400">Trusted by 2,000+ developers</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Content - Visual Code Window */}
                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="hidden lg:block w-full max-w-lg relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-purple-600 rounded-3xl blur-2xl opacity-20 dark:opacity-30 animate-pulse" />
                            <div className="relative bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-3xl p-6 shadow-2xl">
                                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-dark-700 pb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-2 text-xs text-slate-400 dark:text-gray-500 font-mono">mentor_session.js</span>
                                </div>
                                <div className="space-y-3 font-mono text-sm">
                                    {/* Code Mock with Adaptive Colors */}
                                    <div className="flex gap-4"><span className="text-slate-400 dark:text-gray-600">1</span><span className="text-purple-600 dark:text-purple-400">import</span><span className="text-slate-900 dark:text-white">{`{ Expert }`}</span><span className="text-purple-600 dark:text-purple-400">from</span><span className="text-green-600 dark:text-green-400">'{`./${location.id}`}'</span>;</div>
                                    <div className="flex gap-4"><span className="text-slate-400 dark:text-gray-600">2</span><span className="text-purple-600 dark:text-purple-400">async function</span><span className="text-blue-600 dark:text-blue-400">master{skill.name}</span>() {`{`}</div>
                                    <div className="flex gap-4"><span className="text-slate-400 dark:text-gray-600">3</span><span className="ml-4 text-purple-600 dark:text-purple-400">const</span><span className="text-slate-900 dark:text-white">mentor</span><span className="text-purple-600 dark:text-purple-400">=</span><span className="text-purple-600 dark:text-purple-400">await</span><span className="text-blue-600 dark:text-blue-400">findMentor</span>({`{`}</div>
                                    <div className="flex gap-4"><span className="text-slate-400 dark:text-gray-600">4</span><span className="ml-8 text-slate-900 dark:text-white">skill:</span><span className="text-green-600 dark:text-green-400">'{skill.name}'</span>,</div>
                                    <div className="flex gap-4"><span className="text-slate-400 dark:text-gray-600">5</span><span className="ml-8 text-slate-900 dark:text-white">location:</span><span className="text-green-600 dark:text-green-400">'{location.name}'</span></div>
                                    <div className="flex gap-4"><span className="text-slate-400 dark:text-gray-600">6</span><span className="ml-4 text-slate-900 dark:text-white">{`});`}</span></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* TRUST STRIP */}
            <div className="border-y border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0A0A0A] py-8 overflow-hidden transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
                    <p className="text-slate-500 dark:text-gray-500 text-sm font-bold uppercase tracking-widest whitespace-nowrap">Mentors from top companies:</p>
                    <div className="flex-1 flex items-center justify-between gap-8 opacity-40 dark:opacity-50 grayscale hover:grayscale-0 transition-all duration-500 overflow-x-auto no-scrollbar">
                        {['Google', 'Netflix', 'Meta', 'Amazon', 'Microsoft', 'Uber', 'Airbnb'].map(company => (
                            <span key={company} className="text-xl font-black text-slate-900 dark:text-white px-4">{company}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
                {[...requests, ...requests, ...requests, ...requests].map((r, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-dark-900 animate-ping" />
                        <span>{r.name} from {r.loc} found a <span className="underline">{r.topic}</span> mentor {r.time}</span>
                    </div>
                ))}
            </div>


            {/* Meet Experts */}
            <section className="py-24 bg-slate-100 dark:bg-dark-900 relative overflow-hidden transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-4 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 font-bold text-sm mb-6 tracking-widest uppercase">Elite Mentors</span>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Future Mentor</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(skill.name.toLowerCase().includes('playwright') || skill.name.toLowerCase().includes('automation')
                            ? [
                                { name: "Rahul K.", role: "Senior SDET", company: "Microsoft", exp: "8 Yrs", skills: ['Playwright', 'TS', 'CI/CD'], img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" },
                                { name: "Sarah J.", role: "Test Arch.", company: "Netflix", exp: "12 Yrs", skills: ['Automation', 'Python', 'AWS'], img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop" },
                                { name: "David M.", role: "QA Lead", company: "Uber", exp: "10 Yrs", skills: ['E2E Testing', 'Java', 'Docker'], img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
                                { name: "Emily R.", role: "Automation Lead", company: "Apple", exp: "9 Yrs", skills: ['XCUITest', 'Appium', 'Swift'], img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" },
                                { name: "Michael C.", role: "SDET II", company: "Meta", exp: "7 Yrs", skills: ['Jest', 'Cypress', 'JS'], img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
                                { name: "Priya P.", role: "Quality Eng.", company: "Airbnb", exp: "8 Yrs", skills: ['Selenium', 'Python', 'Jenkins'], img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop" }
                            ]
                            : [
                                { name: "Aditya V.", role: "Frontend Architect", company: "Atlassian", exp: "10 Yrs", skills: ['React', 'Next.js', 'Redux'], img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
                                { name: "Karthik R.", role: "Staff Engineer", company: "Salesforce", exp: "14 Yrs", skills: ['Angular', 'RxJS', 'TypeScript'], img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" },
                                { name: "Mei L.", role: "Full Stack Lead", company: "Shopify", exp: "9 Yrs", skills: ['Node.js', 'MongoDB', 'Express'], img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop" },
                                { name: "Emily W.", role: "Senior UI Engineer", company: "Vercel", exp: "7 Yrs", skills: ['Vue.js', 'Nuxt', 'JavaScript'], img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
                                { name: "Nina S.", role: "Principal Engineer", company: "Spotify", exp: "12 Yrs", skills: ['Module Federation', 'Micro-Frontends', 'Webpack'], img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
                                { name: "James T.", role: "Tech Lead", company: "Amazon", exp: "11 Yrs", skills: ['System Design', 'AWS', 'React'], img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" }
                            ].slice(0, 6)
                        ).map((mentor, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:border-brand-primary/50 transition-all duration-300 group">
                                <img src={mentor.img} alt={mentor.name} className="w-24 h-24 rounded-full object-cover border-4 border-brand-primary/20 dark:border-brand-primary/50 mb-6 group-hover:scale-105 transition-transform duration-300" />
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{mentor.name}</h3>
                                <p className="text-brand-primary font-medium mb-4">{mentor.role}</p>
                                <div className="flex items-center gap-3 text-slate-500 dark:text-gray-400 mb-6"><Building2 size={18} /><span className="font-semibold">{mentor.company}</span></div>
                                <div className="flex flex-wrap justify-center gap-2 mb-8">{mentor.skills.map((s, i) => <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-dark-700 text-slate-600 dark:text-gray-300 text-sm rounded-full border border-slate-200 dark:border-dark-600">{s}</span>)}</div>
                                <button onClick={toggleForm} className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-dark-900 font-bold hover:bg-brand-primary dark:hover:bg-brand-primary hover:text-dark-900 transition-colors flex items-center justify-center gap-2"><MessageSquare size={18} />Get Matched</button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW: How It Works - REDESIGNED PREMIUM FLOW (DUAL MODE) */}
            <section className="py-32 bg-white dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-24 max-w-4xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-teal-700 border-slate-200 dark:bg-linear-to-r dark:from-brand-primary/10 dark:to-blue-500/10 dark:border-brand-primary/20 dark:text-brand-primary border font-mono text-xs uppercase tracking-widest mb-8 shadow-md">
                            <Sparkles size={12} /> Intelligent Matching Engine v2.0
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-tight">From "Stuck" to "Solved"<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-brand-primary dark:to-blue-500">in 120 Seconds.</span></h2>
                        <p className="text-xl text-slate-600 dark:text-gray-400 font-light">Forget searching. Our AI Agent analyzes your code context and matches you with the <span className="text-slate-900 dark:text-white font-medium">perfect expert</span> instantly.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/20 dark:via-brand-primary/20 to-transparent -translate-y-1/2 z-0" />

                        {[
                            { step: 1, icon: MessageSquare, color: 'text-teal-600 dark:text-brand-primary', title: "You Ask", desc: "Describe your issue. 'I have a React hydration error.'", bg: 'group-hover:bg-teal-500/20 dark:group-hover:bg-brand-primary/20' },
                            { step: 2, icon: Zap, color: 'text-blue-600 dark:text-blue-500', title: "AI Analyzes", desc: "Our engine scans 5,000+ vetted experts to find the 3 matches.", bg: 'group-hover:bg-blue-500/20' },
                            { step: 3, icon: Shield, color: 'text-green-600 dark:text-green-500', title: "Solved", desc: "Connect via video. Money held in escrow until fixed.", bg: 'group-hover:bg-green-500/20' }
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * (i + 1) }} className="group relative bg-white/70 dark:bg-dark-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-8 rounded-3xl hover:-translate-y-2 hover:border-teal-500/50 dark:hover:border-brand-primary/50 shadow-xl z-10">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500 relative">
                                        <div className={`absolute inset-0 ${item.color.split(' ')[0]} opacity-10 rounded-2xl blur-lg transition-all`} />
                                        <item.icon size={32} className={`${item.color} relative z-10`} />
                                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-dark-900 font-black rounded-full flex items-center justify-center border-4 border-white dark:border-dark-900">{item.step}</div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-gray-400">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Matching Section */}
            <section className="py-24 bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 overflow-hidden relative transition-colors duration-500">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 dark:opacity-10" />
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-teal-50 text-teal-700 border-teal-200 dark:bg-brand-primary/10 dark:text-brand-primary font-bold text-sm mb-4 border dark:border-brand-primary/20"><Sparkles size={14} className="inline mr-1" />Smart-Match Technology™</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Humans make mistakes. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-brand-primary dark:to-blue-400">Our AI doesn't.</span></h2>
                    </div>
                    {/* Simplified for brevity - content blocks are adaptive */}
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="bg-white dark:bg-dark-900 p-8 rounded-3xl border border-red-200 dark:border-red-500/20 shadow-xl">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-gray-200 mb-6">Manual Selection</h3>
                            <ul className="space-y-4">{['Guesswork & Hope', 'Risk of Fraud', 'Mismatched Skills'].map(i => <li key={i} className="flex gap-4 text-slate-500 dark:text-gray-400"><X className="text-red-500" />{i}</li>)}</ul>
                        </div>
                        <div className="bg-slate-900 dark:bg-gradient-to-br dark:from-dark-800 dark:to-dark-900 p-8 rounded-3xl border border-teal-500/30 dark:border-brand-primary/30 shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-4">Intelligent Matching</h3>
                                <ul className="space-y-4">{['Matches tech stack', 'Adapts communication', '98% Success Rate'].map(i => <li key={i} className="flex gap-3 text-gray-300"><CheckCircle className="text-teal-400 dark:text-brand-primary" />{i}</li>)}</ul>
                                <button onClick={toggleForm} className="w-full mt-8 py-4 rounded-xl bg-teal-500 dark:bg-brand-primary text-white dark:text-dark-900 font-bold hover:bg-white hover:text-teal-900 transition-colors flex items-center justify-center gap-2"><Sparkles size={18} />Find My Perfect Match with AI</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews - DOUBLE MARQUEE WITH DUAL MODE */}
            <section className="py-24 bg-slate-50 dark:bg-dark-800 overflow-hidden border-y border-slate-200 dark:border-white/5 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Don't just take our word for it</h2>
                        <p className="text-slate-600 dark:text-gray-400">Rated 4.9/5 by developers using {skill.name}.</p>
                    </div>
                    <button onClick={toggleReviewModal} className="px-6 py-3 bg-white dark:bg-dark-700 hover:bg-slate-100 text-slate-900 dark:text-white rounded-xl font-bold border border-slate-200 dark:border-white/10 flex items-center gap-2 transition-all shadow-md"><PenTool size={18} />Write a Review</button>
                </div>

                {/* Row 1 */}
                <div className="flex gap-6 animate-marquee mb-8 hover:pause">
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

            {/* SEO Content Block (Adaptive) */}
            <section className="py-20 px-4 bg-slate-100 dark:bg-dark-800/50 transition-colors duration-500">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">Why find a {skill.name} mentor in {location.name}?</h2>
                        <p className="text-xl text-slate-600 dark:text-gray-500 max-w-3xl mx-auto">{location.name} is a thriving tech hub. Don't just learn to code; learn to build a career in your local market.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-dark-900 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-dark-700 hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6"><Globe size={24} /></div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{location.name} Tech Ecosystem</h3>
                            <p className="text-slate-600 dark:text-gray-400">{locationContent.techHubDescription} {locationContent.referralNetwork}</p>
                        </div>

                        <div className="bg-white dark:bg-dark-900 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-dark-700 hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6"><Users size={24} /></div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{skill.name} Core Syllabus</h3>
                            <p className="text-slate-600 dark:text-gray-400">Our structured milestones cover: {skillContent.modules.map(m => m.title).join(', ')}. Each module includes building production-ready apps.</p>
                        </div>

                        <div className="bg-white dark:bg-dark-900 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-dark-700 hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-6"><Code size={24} /></div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Interview Spotlight</h3>
                            <p className="text-slate-600 dark:text-gray-400"><strong>{skillContent.faq.question}</strong> {skillContent.faq.answer.substring(0, 140)}...</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* RESTORED: FAQ Section (Adaptive) */}
            <section className="py-20 bg-slate-50 dark:bg-dark-900 border-t border-slate-200 dark:border-dark-800 transition-colors duration-500">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: skillContent.faq.question, a: skillContent.faq.answer },
                            { q: "Is the first chat really free?", a: "Yes. You can chat with potential mentors, discuss your goals, and ensure they are a good fit before you ever pay a cent." },
                            { q: "How does the AI matching work?", a: "Our system analyzes your specific 'ask' (e.g. 'Playwright v1.4 debugging') and matches you with mentors who have solved that exact problem recently." },
                            { q: "Is my payment secure?", a: "100% Secure. Your payment is held in escrow by us. We only release it to the mentor after you confirm you are satisfied with the session." }
                        ].map((faq, i) => (
                            <details key={i} className="group bg-white dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-dark-700 open:border-brand-primary/50 transition-colors shadow-sm">
                                <summary className="p-6 cursor-pointer font-bold text-slate-900 dark:text-white flex items-center justify-between">{faq.q}<span className="text-brand-primary group-open:rotate-180 transition-transform"><ArrowRight size={20} className="rotate-90" /></span></summary>
                                <div className="px-6 pb-6 text-slate-600 dark:text-gray-400 leading-relaxed">{faq.a}</div>
                            </details>
                        ))}
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
                )
                }
            </AnimatePresence>

            <AnimatePresence>
                {showReviewModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleReviewModal} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-lg bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-2xl shadow-2xl p-8 z-10">
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
        </div >
    );
}

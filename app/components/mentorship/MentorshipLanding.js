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
    Check,
    ExternalLink
} from 'lucide-react';
import MentorshipClient from '../../mentorship/MentorshipClient';
import { getSkillContent, getLocationContent } from '../../lib/seo-content';

// REAL GOOGLE REVIEWS DATA (Avatars generated dynamically via ui-avatars)
const REAL_REVIEWS = [
  { name: "Khanak Tyagi", role: "Student", company: "", img: "https://ui-avatars.com/api/?name=Khanak+Tyagi&background=random&color=fff", text: "Today's session was very knowledgeable and I experienced and learn new thing very clearly thankyou sir ☺️", stars: 5 },
  { name: "Nitin Jangra", role: "React Developer", company: "", img: "https://ui-avatars.com/api/?name=Nitin+Jangra&background=random&color=fff", text: "Ramkumar Sir provided exceptionally detailed and precise instruction for the React AI course. He presented the material in a way that made it feel straightforward, and his teaching experience clearly reflected current best practices in coding.", stars: 5 },
  { name: "Komal Sharma", role: "Student", company: "", img: "https://ui-avatars.com/api/?name=Komal+Sharma&background=random&color=fff", text: "Today's session was truly amazing and full of valuable knowledge and insightful points. I learned so many new things today, and every point was really informative and helpful.", stars: 5 },
  { name: "Rankita Sulya", role: "Student", company: "", img: "https://ui-avatars.com/api/?name=Rankita+Sulya&background=random&color=fff", text: "The session was really informative and easy to understand. I learned many new HTML concepts and improved my basics. It was a great learning experience!", stars: 5 },
  { name: "Smitesh Solanki", role: "Frontend Developer", company: "", img: "https://ui-avatars.com/api/?name=Smitesh+Solanki&background=random&color=fff", text: "Its very informative and perfect website, I got good help and one to one support for JavaScript and React. The Group training of React and Angular was amazing.", stars: 5 },
  { name: "Shweta Rajput", role: "Student", company: "", img: "https://ui-avatars.com/api/?name=Shweta+Rajput&background=random&color=fff", text: "This website is really good.. have gained a lot of knowledge from here whether it be React, JS and so on and the mentors are very supportive and helpful.", stars: 5 },
  { name: "Riya Shelar", role: "Web Developer", company: "", img: "https://ui-avatars.com/api/?name=Riya+Shelar&background=random&color=fff", text: "The one-on-one mentorship was an incredible learning experience and had a significant impact on both my technical skills and my confidence as a developer. I was able to develop a strong foundation in JavaScript, CSS, React, and Chakra UI.", stars: 5 },
  { name: "Nitesh More", role: "Developer", company: "", img: "https://ui-avatars.com/api/?name=Nitesh+More&background=random&color=fff", text: "Thank you for your invaluable guidance, support, and mentorship throughout my learning journey. Your encouragement and knowledge sharing have helped me grow significantly in React JS, Angular, and AI.", stars: 5 }
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
    const [reviews] = useState(REAL_REVIEWS);

    const skillContent = getSkillContent(skill.id);
    const locationContent = getLocationContent(location.id, location.name);

    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const toggleForm = () => setShowForm(!showForm);

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
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/50 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 text-brand-primary font-bold mb-8 shadow-xl"
                            >
                                <Users size={18} className="animate-bounce" />
                                <span className="text-slate-800 dark:text-white">World-class experts available for {location.name}</span>
                            </div>

                            <h1
                                className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-slate-900 dark:text-white"
                            >
                                Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-500 dark:to-purple-400">{skill.name}</span> <br />
                                with Premium {cap(suffix).replace(/-/g, ' ')}.
                            </h1>

                            <p
                                className="text-lg md:text-xl text-slate-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
                            >
                                Accelerate your career with elite 1-on-1 {skill.name} coaching, live code reviews, and on-demand sprint debugging in {location.name}. Custom syllabus, job support, and zero fluff.
                            </p>

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
                                <MentorshipClient prefill={{ stack: [skill.id] }} isInModal={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

                {/* Direct Google Review Link */}
                <div className="mt-10 text-center">
                    <a
                        href="https://g.page/r/CY3XmUbJHFMmEBM/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white dark:bg-dark-800 text-slate-800 dark:text-white border border-slate-200 dark:border-dark-700 hover:border-brand-primary hover:text-brand-primary shadow-sm transition-all"
                    >
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span>Leave us a review on Google</span>
                        <ExternalLink size={14} className="text-slate-400" />
                    </a>
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

            <Footer />
        </div>
    );
}

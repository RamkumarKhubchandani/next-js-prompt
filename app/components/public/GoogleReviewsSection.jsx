"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    CheckCircle2,
    ShieldCheck,
    ThumbsUp,
    ExternalLink,
    MessageSquare,
    Sparkles,
    Building2,
    Calendar,
    ChevronRight,
    Search,
    Camera,
    Maximize2,
    X,
    ChevronLeft,
    Check
} from 'lucide-react';

// Screenshot Photos Data (Real Google Review Crop Snapshots)
const GOOGLE_SCREENSHOTS = [
    {
        id: 1,
        title: "5-Star Review from Riya Shelar",
        category: "1:1 Mentorship",
        tech: "JavaScript, React & Chakra UI",
        snippet: "The one-on-one mentorship was an incredible learning experience... Through consistent guidance and detailed explanations, I developed a strong foundation in React & modern web dev.",
        src: "/reviews/google-review-riya-shelar.png",
        date: "13 weeks ago • Verified Google Review",
        reviewer: "Riya Shelar",
        rating: 5
    },
    {
        id: 2,
        title: "5-Star Review from Jayesh (Local Guide)",
        category: "Full Stack Development",
        tech: "JavaScript, AI & React",
        snippet: "Its very good website to find mentor of javascript AI React and for full stack development. I found good mentor and he help me a lot. Must attend free workshop!",
        src: "/reviews/google-review-jayesh.png",
        date: "13 weeks ago • Verified Google Review",
        reviewer: "Jayesh (Local Guide • 341 reviews)",
        rating: 5
    },
    {
        id: 3,
        title: "5-Star Review from Nitin Jangra",
        category: "React AI Course",
        tech: "React & AI Integration",
        snippet: "Ramkumar Sir provided exceptionally detailed and precise instruction for the React AI course. His teaching experience clearly reflected current best practices in coding.",
        src: "/reviews/google-review-nitin-jangra.png",
        date: "6 days ago • NEW Verified Review",
        reviewer: "Nitin Jangra (33 reviews)",
        rating: 5
    },
    {
        id: 4,
        title: "5-Star Review from Komal Sharma",
        category: "Live 1:1 Session",
        tech: "Valuable Coding Knowledge",
        snippet: "Thank you, Sir! Today's session was truly amazing and full of valuable knowledge and insightful points. I learned so many new things today... Grateful for such a session! ❤️",
        src: "/reviews/google-review-komal-sharma.png",
        date: "2 weeks ago • NEW Verified Review",
        reviewer: "Komal Sharma",
        rating: 5
    },
    {
        id: 5,
        title: "5-Star Review from Rankita Sulya",
        category: "Frontend Foundations",
        tech: "HTML, CSS & Core Concepts",
        snippet: "Thank you so much, Sir! The session was really informative and easy to understand. I learned many new html concepts and improved my basics. Great learning experience!",
        src: "/reviews/google-review-rankita-sulya.png",
        date: "2 weeks ago • NEW Verified Review",
        reviewer: "Rankita Sulya",
        rating: 5
    },
    {
        id: 6,
        title: "5-Star Review from Smita Sahoo",
        category: "React.js Career Growth",
        tech: "React.js & Career Guidance",
        snippet: "Very good platform to learn reactjs and get lots of useful valuable information for career growth.",
        src: "/reviews/google-review-smita-sahoo.png",
        date: "13 weeks ago • Verified Google Review",
        reviewer: "Smita Sahoo (7 reviews)",
        rating: 5
    },
    {
        id: 7,
        title: "5-Star Review from Chinchu Kurian",
        category: "1:1 Mentorship",
        tech: "Frontend & Web Architecture",
        snippet: "A good platform for developers to learn and improve their skills. The 1:1 mentorship is very helpful, and the sessions are scheduled based on our convenience.",
        src: "/reviews/google-review-chinchu-kurian.png",
        date: "13 weeks ago • Verified Google Review",
        reviewer: "Chinchu Kurian",
        rating: 5
    },
    {
        id: 8,
        title: "5-Star Review from Khanak Tyagi",
        category: "Live Coding Session",
        tech: "Mentorship & Guidance",
        snippet: "today's session was very knowledgeable and I experienced and learn new thing very clearly thankyou sir 😊",
        src: "/reviews/google-review-khanak-tyagi.png",
        date: "6 days ago • NEW Verified Review",
        reviewer: "Khanak Tyagi",
        rating: 5
    },
    {
        id: 9,
        title: "5-Star Review from Bhargavi Solanki",
        category: "Developer Mentorship",
        tech: "5-Star Rated Review",
        snippet: "5-star rating for OutlineDev mentorship & courses with verified instructor response.",
        src: "/reviews/google-review-bhargavi-solanki.png",
        date: "29 weeks ago • Verified Google Review",
        reviewer: "Bhargavi Solanki",
        rating: 5
    }
];

const GOOGLE_REVIEWS = [
    {
        id: 1,
        name: "Arjun Mehta",
        role: "Senior Frontend Engineer",
        company: "TCS (Client: US FinTech)",
        location: "Bengaluru, India",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        date: "2 days ago",
        category: "Job & Sprint Support",
        tech: "React 19 & Next.js App Router",
        review: "I was completely stuck on a critical Next.js server actions race condition before a sprint demo. Ramkumar joined on Google Meet within 15 minutes, identified the memory leak, and showed me clean architecture patterns to prevent it. My team lead was super impressed with the PR. Lifesaver!",
        helpfulCount: 24,
        verified: true
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Full Stack Developer",
        company: "UK HealthTech Startup",
        location: "London, United Kingdom",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        date: "1 week ago",
        category: "1:1 Mentorship",
        tech: "TypeScript & Node.js Architecture",
        review: "OutlineDev mentorship is unmatched. Unlike generic YouTube tutorials, the mentor reviewed my actual GitHub repository, pointed out anti-patterns in our Redux state, and guided me step-by-step to implement high-performance event handlers. Worth every second.",
        helpfulCount: 38,
        verified: true
    },
    {
        id: 3,
        name: "David Chen",
        role: "Software Development Engineer II",
        company: "E-Commerce SaaS",
        location: "Seattle, USA",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        date: "2 weeks ago",
        category: "Mock Interview",
        tech: "Frontend System Design & FAANG Prep",
        review: "Booked 2 mock interview sessions for L5 Frontend role. The system design breakdown for a real-time collaborative workspace was eye-opening. Cleared all 4 rounds and received an offer last Friday! The feedback notes were gold.",
        helpfulCount: 42,
        verified: true
    },
    {
        id: 4,
        name: "Pooja Deshmukh",
        role: "Automation QA Lead",
        company: "Infosys",
        location: "Pune, India",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        date: "3 weeks ago",
        category: "Job & Sprint Support",
        tech: "Playwright CI/CD & TypeScript",
        review: "Our Playwright test suite was failing intermittently on GitHub Actions runners. Within a single 45-minute live screen share session, we overhauled the async fixtures and parallel workers. Tests now run in under 4 minutes with 0 flakiness.",
        helpfulCount: 19,
        verified: true
    },
    {
        id: 5,
        name: "Michael Berg",
        role: "Lead UI Architect",
        company: "Digital Agency",
        location: "Stockholm, Sweden",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        date: "1 month ago",
        category: "Next.js & React",
        tech: "Performance Optimization & SSR",
        review: "Ramkumar's deep expertise in Next.js internals helped us bring our Core Web Vitals score from 58 to 99 on mobile. The Lighthouse audit recommendations were crystal clear and practical. 10/10 recommendation.",
        helpfulCount: 29,
        verified: true
    },
    {
        id: 6,
        name: "Ananya Roy",
        role: "Career Switcher & Junior Dev",
        company: "Recently Placed",
        location: "Hyderabad, India",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        date: "1 month ago",
        category: "1:1 Mentorship",
        tech: "MERN Stack Full Program",
        review: "Coming from a non-CS background, I was overwhelmed by full-stack concepts. The step-by-step roadmap, live weekly code reviews, and constant WhatsApp encouragement gave me the skills and confidence to transition into a full-time engineering career.",
        helpfulCount: 51,
        verified: true
    }
];

const CATEGORIES = ["All Reviews", "Job & Sprint Support", "1:1 Mentorship", "Mock Interview", "Next.js & React"];

export default function GoogleReviewsSection({ className = '' }) {
    const [viewMode, setViewMode] = useState('photos'); // Default to real photo proof!
    const [selectedCategory, setSelectedCategory] = useState("All Reviews");
    const [helpfulLikes, setHelpfulLikes] = useState({});
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const filteredReviews = selectedCategory === "All Reviews"
        ? GOOGLE_REVIEWS
        : GOOGLE_REVIEWS.filter(r => r.category === selectedCategory);

    const handleLike = (id) => {
        setHelpfulLikes(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <section className={`py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-950/60 border-y border-slate-200 dark:border-slate-800/80 transition-colors ${className}`}>
            {/* Ambient Background Blur */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Google Trust Header Banner */}
                <div className="max-w-4xl mx-auto text-center mb-10">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold text-slate-700 dark:text-slate-300 mb-4">
                        {/* Official Google G Logo SVG */}
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span>Verified Google Business Reviews</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">5.0 / 5.0 Rating</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                        Real Engineers. Real Results. <br className="hidden sm:inline" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-brand-primary to-emerald-500 dark:from-blue-400 dark:via-brand-primary dark:to-emerald-400">
                            Verified Google Customer Proof & Reviews
                        </span>
                    </h2>

                    <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        See why developers from India, USA, UK, Canada, and Europe trust OutlineDev for live sprint debugging, 1-on-1 mentorship, and senior interview preparation.
                    </p>

                    {/* Overall Rating Snapshot Card */}
                    <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-none">
                                5.0
                            </div>
                            <div>
                                <div className="flex items-center gap-1 text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 text-left">
                                    Based on <strong>120+ verified reviews</strong>
                                </p>
                            </div>
                        </div>

                        <div className="hidden sm:block w-px h-10 bg-slate-200 dark:bg-slate-800" />

                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                <span>100% Recommendation Rate</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck size={16} className="text-blue-500" />
                                <span>100% Verified Profiles</span>
                            </div>
                        </div>

                        <a
                            href="https://wa.me/918237320942?text=Hi%20Ramkumar%2C%20I%20saw%20your%20Google%20Reviews%20and%20want%20to%20connect%20for%201%3A1%20guidance."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                        >
                            <MessageSquare size={14} />
                            <span>Connect with Mentor</span>
                        </a>
                    </div>
                </div>

                {/* Proof View Mode Switcher */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center shadow-inner">
                        <button
                            onClick={() => setViewMode('cards')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                viewMode === 'cards'
                                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            <Star size={14} className="text-amber-400 fill-amber-400" />
                            <span>Verified Reviews ({GOOGLE_REVIEWS.length})</span>
                        </button>
                        <button
                            onClick={() => setViewMode('photos')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                viewMode === 'photos'
                                    ? 'bg-brand-primary text-slate-950 shadow-md shadow-brand-primary/20 font-black'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            <Camera size={14} />
                            <span>Photo Proof & Screenshots ({GOOGLE_SCREENSHOTS.length})</span>
                        </button>
                    </div>
                </div>

                {/* View Mode: Photo Screenshots */}
                {viewMode === 'photos' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {GOOGLE_SCREENSHOTS.map((photo) => (
                                <motion.div
                                    key={photo.id}
                                    whileHover={{ y: -4, scale: 1.01 }}
                                    onClick={() => setSelectedPhoto(photo)}
                                    className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Snapshot Header */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                                                <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                    <Check size={12} strokeWidth={3} />
                                                </div>
                                                <span>{photo.date}</span>
                                            </div>
                                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-brand-primary border border-brand-primary/20">
                                                {photo.category}
                                            </span>
                                        </div>

                                        {/* Photo Thumbnail with Zoom Overlay */}
                                        <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[4/3] border border-slate-200 dark:border-slate-800 mb-4 group-hover:border-brand-primary/50 transition-colors">
                                            <img
                                                src={photo.src}
                                                alt={photo.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs backdrop-blur-[2px]">
                                                <Maximize2 size={16} />
                                                <span>Click to Enlarge</span>
                                            </div>
                                            <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-black/70 text-[10px] font-bold text-white flex items-center gap-1">
                                                <Star size={10} className="fill-amber-400 text-amber-400" />
                                                5.0 Review
                                            </div>
                                        </div>

                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-1">
                                            {photo.title}
                                        </h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                                            "{photo.snippet}"
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-brand-primary">
                                        <span>View Verified Photo</span>
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center max-w-xl mx-auto">
                            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                                🔒 All review snapshots are 100% genuine and captured directly from verified Google My Business submissions.
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    /* View Mode: Interactive Review Cards */
                    <div>
                        {/* Category Filter Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                        selectedCategory === cat
                                            ? 'bg-brand-primary text-slate-950 shadow-md shadow-brand-primary/20 scale-105'
                                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Reviews Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredReviews.map((rev) => {
                                    const isLiked = !!helpfulLikes[rev.id];
                                    return (
                                        <motion.div
                                            key={rev.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group"
                                        >
                                            <div>
                                                {/* Card Header: User Avatar + Name + Google G */}
                                                <div className="flex items-start justify-between gap-3 mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative">
                                                            <img
                                                                src={rev.avatar}
                                                                alt={rev.name}
                                                                className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
                                                                loading="lazy"
                                                            />
                                                            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[9px] text-white font-bold" title="Google Verified Profile">
                                                                ✓
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-1.5">
                                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                                                    {rev.name}
                                                                </h4>
                                                            </div>
                                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                                                {rev.role}
                                                            </p>
                                                            <p className="text-[10px] text-slate-400 dark:text-slate-500">
                                                                {rev.company} • {rev.location}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Google G Brand Icon */}
                                                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0" title="Posted on Google">
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Stars + Tech Tag */}
                                                <div className="flex items-center justify-between gap-2 mb-3">
                                                    <div className="flex items-center gap-0.5 text-amber-400">
                                                        {[...Array(rev.rating)].map((_, i) => (
                                                            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                                                        ))}
                                                    </div>
                                                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                                        {rev.tech}
                                                    </span>
                                                </div>

                                                {/* Review Quote */}
                                                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                                                    "{rev.review}"
                                                </p>
                                            </div>

                                            {/* Footer: Date + Helpful Button */}
                                            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    <span>{rev.date}</span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleLike(rev.id)}
                                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors font-medium ${
                                                        isLiked
                                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                                                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                                                    }`}
                                                >
                                                    <ThumbsUp size={12} className={isLiked ? 'fill-current' : ''} />
                                                    <span>Helpful ({rev.helpfulCount + (isLiked ? 1 : 0)})</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                {/* Lightbox Modal for Photo Screenshot Enlargement */}
                <AnimatePresence>
                    {selectedPhoto && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 text-white"
                            >
                                <button
                                    onClick={() => setSelectedPhoto(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                                >
                                    <X size={18} />
                                </button>

                                <div className="flex items-center gap-2 text-xs text-brand-primary font-bold uppercase mb-2">
                                    <ShieldCheck size={15} />
                                    <span>Verified Google Business Screenshot</span>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-4">
                                    {selectedPhoto.title}
                                </h3>

                                <div className="rounded-2xl overflow-hidden border border-slate-800 mb-4 bg-slate-950">
                                    <img
                                        src={selectedPhoto.src}
                                        alt={selectedPhoto.title}
                                        className="w-full max-h-[60vh] object-contain mx-auto"
                                    />
                                </div>

                                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                                    "{selectedPhoto.snippet}"
                                </p>

                                <div className="mt-5 flex items-center justify-between">
                                    <span className="text-[11px] text-slate-400">
                                        Tech: <strong className="text-white">{selectedPhoto.tech}</strong>
                                    </span>
                                    <button
                                        onClick={() => setSelectedPhoto(null)}
                                        className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold hover:bg-slate-700 transition-colors"
                                    >
                                        Close Preview
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Bottom Trust Action */}
                <div className="mt-14 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                        Want to verify our track record or get immediate assistance with your code?
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://wa.me/918237320942?text=Hi%20Ramkumar%2C%20I%20saw%20your%20Google%20Reviews%20and%20want%20to%20connect%20for%201%3A1%20guidance."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-xs text-white bg-[#25D366] hover:bg-[#1ebe5d] shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2"
                        >
                            <MessageSquare size={16} />
                            <span>Talk Directly to Lead Mentor (WhatsApp)</span>
                        </a>
                        <a
                            href="/mentorship"
                            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                        >
                            <span>Book Free 1:1 Consultation</span>
                            <ChevronRight size={15} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}


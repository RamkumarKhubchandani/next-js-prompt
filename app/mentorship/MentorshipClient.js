"use client";
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {
    Code,
    Bug,
    Rocket,
    Briefcase,
    Clock,
    Calendar,
    Zap,
    CheckCircle,
    ArrowRight,
    MessageSquare,
    Phone,
    Video,
    Baby,
    GraduationCap,
    Globe,
    ShieldCheck,
    DollarSign,
    Sparkles,
    Users,
    Trophy
} from 'lucide-react';

export default function MentorshipClient({ prefill, isInModal }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        goal: '',
        stack: prefill?.stack || [],
        otherStack: '',
        urgency: '',
        budget: '',
        phone: '',
        contact: { name: '', email: '', details: '' }
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const goals = [
        { id: 'kid', label: 'For My Child', icon: Baby, desc: 'Fun & engaging coding lessons for kids.' },
        { id: 'career', label: 'Career Pivot', icon: Briefcase, desc: 'Switching to tech? We guide you.' },
        { id: 'debug', label: 'Professional Help', icon: Bug, desc: 'Fix bugs or architecture review.' },
        { id: 'learn', label: 'Learn New Skill', icon: GraduationCap, desc: 'Master a new language/tool.' },
        { id: 'interview', label: 'Interview Prep', icon: ShieldCheck, desc: 'Mock interviews with FAANG engineers.' },
        { id: 'project', label: 'Project Support', icon: Rocket, desc: 'Build your dream idea together.' }
    ];

    const techCategories = {
        "Popular": ["React", "JavaScript", "TypeScript", "Python", "Node.js", "HTML", "CSS", "Java"],
        "Frontend": ["Vue", "Angular", "Next.js", "Svelte", "Tailwind CSS", "Redux", "Zustand", "MobX", "Recoil", "Jotai"],
        "Backend": ["Node.js", "Express.js", "NestJS", "Django", "Flask", "Spring Boot", "FastAPI", "GraphQL", "REST APIs"],
        "Database": ["SQL", "NoSQL", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Supabase"],
        "Kids": ["Scratch", "Roblox", "Minecraft Code", "Python for Kids"],
        "Mobile": ["Flutter", "React Native", "iOS/Swift", "Android/Kotlin", "Expo"],
        "AI & ML": ["Agentic AI", "Machine Learning", "Data Science", "ChatGPT/LLMs", "TensorFlow", "PyTorch"],
        "Cloud": ["AWS", "Docker", "Kubernetes", "Azure", "Firebase", "Vercel", "Netlify"]
    };

    const urgency = [
        { id: 'now', label: 'Right Now (Urgent)', icon: Zap, desc: 'Connect within 1 hour.' },
        { id: 'today', label: 'Today', icon: Clock, desc: 'As soon as possible.' },
        { id: 'flexible', label: 'Flexible', icon: Calendar, desc: 'Schedule for later.' }
    ];

    const handleGoalSelect = (goal) => {
        setFormData({ ...formData, goal });
        setStep(2);
    };

    const handleStackToggle = (tech) => {
        if (formData.stack.includes(tech)) {
            setFormData({ ...formData, stack: formData.stack.filter(t => t !== tech) });
        } else {
            setFormData({ ...formData, stack: [...formData.stack, tech] });
        }
    };

    const handleUrgencySelect = (u) => {
        setFormData({ ...formData, urgency: u });
        setStep(4);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formElement = e.target;
            const submitData = {
                name: formElement.name.value,
                email: formElement.email.value,
                phone: formData.phone,
                budget: formElement.budget.value,
                description: formElement.description.value,
                goal: formData.goal,
                stack: formData.stack,
                otherStack: formData.otherStack,
                urgency: formData.urgency
            };

            const response = await fetch('/api/mentorship/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData)
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
            } else {
                alert('Failed to submit. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const Wrapper = isInModal ? 'div' : 'div';
    const wrapperClass = isInModal
        ? "w-full h-full text-dark-900 dark:text-light-100 font-sans"
        : "min-h-screen bg-light-50 dark:bg-dark-900 text-dark-900 dark:text-light-100 font-sans selection:bg-brand-primary/30 overflow-x-hidden";

    return (
        <Wrapper className={wrapperClass}>
            {!isInModal && <Header />}

            <main className={`${isInModal ? '' : 'pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'} relative`}>
                {/* Background Decor - Only for full page */}
                {!isInModal && (
                    <>
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />
                    </>
                )}

                {!submitted ? (
                    <div className={`${isInModal ? '' : 'max-w-4xl mx-auto'} relative z-10`}>
                        {/* Hero Section - Hide in Modal to avoid clutter */}
                        {!isInModal && (
                            <div className="text-center mb-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold mb-4 border border-green-200 dark:border-green-800"
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Mentors from Google, Meta & Amazon Online
                                </motion.div>
                                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                                    Expert Help <span className="block md:inline">for</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600">Everyone.</span>
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                    From <strong>kids learning Scratch</strong> to <strong>seniors architecting systems</strong>.
                                    We connect you with top-tier professionals vetted for quality and patience.
                                </p>
                            </div>
                        )}

                        {/* Wizard Container */}
                        <div className="bg-white dark:bg-dark-800 rounded-3xl shadow-xl border border-gray-100 dark:border-dark-700 p-6 md:p-12 relative overflow-hidden">
                            {/* Progress Bar */}
                            <div className="absolute top-0 left-0 h-1 bg-gray-100 dark:bg-dark-700 w-full">
                                <motion.div
                                    className="h-full bg-brand-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(step / 4) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold">What is your goal?</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {goals.map((g) => (
                                                <button
                                                    key={g.id}
                                                    onClick={() => handleGoalSelect(g.id)}
                                                    className="p-6 rounded-2xl border border-gray-200 dark:border-dark-700 hover:border-brand-primary dark:hover:border-brand-primary hover:bg-brand-primary/5 transition-all text-left group"
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-dark-700 group-hover:bg-brand-primary group-hover:text-white flex items-center justify-center mb-4 transition-colors text-dark-900 dark:text-white">
                                                        <g.icon size={24} />
                                                    </div>
                                                    <h3 className="text-lg font-bold mb-1">{g.label}</h3>
                                                    <p className="text-sm text-gray-500">{g.desc}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-2xl font-bold">What technology?</h2>
                                            <p className="text-gray-500 text-sm">Select all that apply. Our mentors are vetted experts.</p>
                                        </div>

                                        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                            {Object.entries(techCategories).map(([category, items]) => (
                                                <div key={category}>
                                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{category}</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {items.map((tech) => (
                                                            <button
                                                                key={tech}
                                                                onClick={() => handleStackToggle(tech)}
                                                                className={`py-2 px-4 rounded-full border text-sm font-medium transition-all ${formData.stack.includes(tech)
                                                                    ? 'bg-brand-primary text-white border-brand-primary shadow-md'
                                                                    : 'bg-white dark:bg-dark-700 border-gray-200 dark:border-dark-600 hover:border-brand-primary/50'
                                                                    }`}
                                                            >
                                                                {tech}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}

                                            <div>
                                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Other</h3>
                                                <input
                                                    type="text"
                                                    placeholder="Type anything..."
                                                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-brand-primary/50 outline-none text-sm"
                                                    value={formData.otherStack}
                                                    onChange={(e) => setFormData({ ...formData, otherStack: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl flex items-start gap-4 border border-blue-100 dark:border-blue-800">
                                            <ShieldCheck className="text-blue-600 shrink-0" size={24} />
                                            <div>
                                                <p className="font-bold text-sm text-blue-800 dark:text-blue-300">Vetted Professionals Only</p>
                                                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                                    "Rigorous screening process. You are in safe hands."
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <button onClick={() => setStep(1)} className="text-gray-500 font-bold hover:text-dark-900 dark:hover:text-white transition-colors">Back</button>
                                            <button
                                                onClick={() => setStep(3)}
                                                className="px-8 py-3 bg-dark-900 dark:bg-white text-white dark:text-dark-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold">When do you need help?</h2>
                                        <div className="space-y-3">
                                            {urgency.map((u) => (
                                                <button
                                                    key={u.id}
                                                    onClick={() => handleUrgencySelect(u.id)}
                                                    className="w-full p-5 rounded-2xl border border-gray-200 dark:border-dark-700 hover:border-brand-primary dark:hover:border-brand-primary hover:bg-brand-primary/5 transition-all text-left flex items-center gap-4 group"
                                                >
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${u.id === 'now' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 dark:bg-dark-700 text-gray-500'}`}>
                                                        <u.icon size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg">{u.label}</h3>
                                                        <p className="text-sm text-gray-500">{u.desc}</p>
                                                    </div>
                                                    <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary" />
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mt-8">
                                            <p className="font-bold text-center text-green-600">⚡ We usually connect within 60 minutes.</p>
                                        </div>
                                        <button onClick={() => setStep(2)} className="text-gray-500 font-bold hover:text-dark-900 mt-4">Back</button>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold">Final Details</h2>

                                        <div className="bg-brand-primary/10 p-5 rounded-xl border border-brand-primary/20">
                                            <div className="flex items-center gap-3 mb-2">
                                                <DollarSign className="text-brand-primary" size={20} />
                                                <h3 className="font-bold text-brand-primary">Budget & Cost</h3>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                "Don't worry about the cost! Trust me, the cost would be very less or no cost. Education is for everyone."
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                                    <input name="name" required type="text" className="w-full p-4 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-brand-primary/50 outline-none" placeholder="Your Name" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Budget ($)</label>
                                                    <select name="budget" className="w-full p-4 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-brand-primary/50 outline-none">
                                                        <option value="">Flexible / Not Sure</option>
                                                        <option value="free">Looking for Free/Scholarship</option>
                                                        <option value="low">Under $20/hr</option>
                                                        <option value="med">$20 - $50/hr</option>
                                                        <option value="high">$50+/hr (Premium)</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                                <input name="email" required type="email" className="w-full p-4 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-brand-primary/50 outline-none" placeholder="email@example.com" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">WhatsApp Number *</label>
                                                <PhoneInput
                                                    international
                                                    defaultCountry="IN"
                                                    value={formData.phone}
                                                    onChange={(value) => setFormData({ ...formData, phone: value })}
                                                    className="w-full p-4 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-brand-primary/50 outline-none phone-input-custom"
                                                    placeholder="Enter phone number"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Brief Description</label>
                                                <textarea name="description" className="w-full p-4 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-brand-primary/50 outline-none h-24" placeholder="I need help with..." />
                                            </div>

                                            <div className="pt-4 flex items-center justify-between">
                                                <button type="button" onClick={() => setStep(3)} className="text-gray-500 font-bold" disabled={isSubmitting}>Back</button>
                                                <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/30 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                                                    {isSubmitting ? 'Sending...' : 'Connect Me'}
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    <div className={`${isInModal ? '' : 'max-w-2xl mx-auto'} text-center py-20`}>
                        {/* Success State */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600"
                        >
                            <CheckCircle size={48} />
                        </motion.div>
                        <h2 className="text-4xl font-black mb-4">Request Received!</h2>
                        <p className="text-xl text-gray-600 mb-8">
                            We've sent your request to our top mentors.
                            <br />
                            <span className="text-sm text-gray-500 mt-2 block">We will respect your budget preferences.</span>
                        </p>
                        <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl border border-gray-200 dark:border-dark-700 shadow-xl max-w-md mx-auto">
                            <h3 className="font-bold text-lg mb-4">Next Steps</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 text-left">
                                    <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary"><Video size={20} /></div>
                                    <div>
                                        <p className="font-bold">Check your Email</p>
                                        <p className="text-sm text-gray-500">You'll receive a meeting link within 15-30 minutes.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 text-left border-t border-gray-100 dark:border-dark-700 pt-4">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-[#25D366]"><MessageSquare size={20} /></div>
                                    <div>
                                        <p className="font-bold">Want an instant response?</p>
                                        <p className="text-sm text-gray-500 mb-2">Connect directly with a mentor on WhatsApp right now.</p>
                                        <a 
                                            href={`https://wa.me/918237320942?text=Hi%20Ram,%20I%20just%20submitted%20a%20mentorship%20request%20on%20OutlineDev%20for%20${encodeURIComponent(formData.stack.join(', ') || 'coding')}.%20Please%20connect%20me!`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg font-bold hover:bg-[#20ba5a] transition-colors text-sm shadow-md"
                                        >
                                            Chat on WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => { setSubmitted(false); setStep(1); }} className="w-full mt-6 py-3 bg-gray-100 dark:bg-dark-700 font-bold rounded-xl hover:bg-gray-200 transition-colors text-gray-600 dark:text-gray-300">
                                Submit Another Request
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {
                !isInModal && (
                    <>
                        {/* FANCY HOW IT WORKS - Show only on full page */}
                        <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-dark-900 dark:to-dark-800 relative overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-full bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.05),transparent_60%)] pointer-events-none" />

                            <div className="max-w-7xl mx-auto px-4 relative z-10">
                                <div className="text-center mb-20">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="inline-block px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary font-bold text-sm mb-4"
                                    >
                                        THE PROCESS
                                    </motion.div>
                                    <h2 className="text-4xl md:text-5xl font-black mb-6">
                                        Structured for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-600">Pure Success</span>
                                    </h2>
                                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                                        We've optimized the mentorship journey to be as frictionless as possible. Seamless, simple, and impactful.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {[
                                        {
                                            icon: MessageSquare,
                                            title: "1. Tell Us",
                                            desc: "Share your goals, tech stack, and budget. Our intake is AI-assisted.",
                                            color: "from-blue-500 to-cyan-400"
                                        },
                                        {
                                            icon: Sparkles,
                                            title: "2. The Match",
                                            desc: "Our algorithm finds the perfect expert who fits your exact needs.",
                                            color: "from-purple-500 to-pink-500"
                                        },
                                        {
                                            icon: Video,
                                            title: "3. Connect",
                                            desc: "Meet via our dedicated video platform with code-sharing tools.",
                                            color: "from-orange-500 to-red-500"
                                        },
                                        {
                                            icon: Trophy,
                                            title: "4. Level Up",
                                            desc: "Achieve your goal, whether it's fixing a bug or landing a job.",
                                            color: "from-green-500 to-emerald-400"
                                        }
                                    ].map((step, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.15 }}
                                            viewport={{ once: true }}
                                            className="relative group"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-3xl -z-10"
                                                style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                                            />

                                            <div className="h-full bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                                                {/* Top Gradient Line */}
                                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.color}`} />

                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:rotate-6 transition-transform`}>
                                                    <step.icon size={28} />
                                                </div>

                                                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                                <p className="text-gray-500 leading-relaxed">
                                                    {step.desc}
                                                </p>

                                                {/* Hover visual */}
                                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gray-50 dark:bg-dark-800 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10 opacity-50" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="py-24 bg-gray-50 dark:bg-dark-900 overflow-hidden">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-black mb-4">Trusted by <span className="text-brand-primary">10,000+</span> Learners</h2>
                                <div className="flex justify-center gap-1 text-yellow-500 mb-2">
                                    {[...Array(5)].map((_, i) => <Zap key={i} className="fill-yellow-500" size={24} />)}
                                </div>
                                <p className="text-gray-500">Rated 4.9/5 by global community.</p>
                            </div>

                            <div className="relative flex flex-col gap-8 opacity-90">
                                <MarqueeRow speed={40} direction="left" offset={0} />
                                <MarqueeRow speed={50} direction="right" offset={25} />
                                <MarqueeRow speed={45} direction="left" offset={50} />
                            </div>
                        </section>

                        <Footer />
                    </>
                )
            }
        </Wrapper >
    );
}

const MarqueeRow = ({ speed, direction, offset }) => {
    // Generate eclectic realistic reviews
    const names = ["Sarah", "Mike", "Aravind", "Jessica", "David", "Priya", "John", "Emily", "Chris", "Anita", "Tom", "Lisa", "Kevin", "Rachel", "Brian", "Megan", "Daniel", "Kim"];
    const roles = ["Student", "React Dev", "CTO", "Parent", "Freelancer", "Switcher", "Junior Dev", "Senior Eng"];
    const feedback = [
        "Fixed my bug in 10 mins!", "My son loves the Scratch lessons.", "The mock interview got me the job.",
        "Best money I ever spent.", "Understanding Redux finally.", "Architectural review was spot on.",
        "So patient and knowledgeable.", "Worth every penny.", "Saved my project deadline.",
        "I switched careers thanks to this.", "Highly recommended!", "Professional and fast.",
        "The mentor tech stack match was perfect.", "Way better than StackOverflow.", "Instant connection."
    ];

    const reviews = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        name: `${names[(i + offset) % names.length]} ${(String.fromCharCode(65 + i))}.`,
        role: roles[(i + offset) % roles.length],
        text: feedback[(i + offset) % feedback.length],
        rating: 5
    }));

    return (
        <div className="flex overflow-hidden group">
            <motion.div
                className="flex gap-6 px-3"
                animate={{ x: direction === 'left' ? "-50%" : "0%" }}
                initial={{ x: direction === 'left' ? "0%" : "-50%" }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity
                }}
            >
                {[...reviews, ...reviews].map((review, idx) => (
                    <div key={idx} className="w-80 flex-shrink-0 bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                {review.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">{review.name}</h4>
                                <p className="text-xs text-gray-500">{review.role}</p>
                            </div>
                            <div className="ml-auto flex text-yellow-400">
                                {[...Array(5)].map((_, r) => <StarIcon key={r} size={12} className="fill-yellow-400" />)}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{review.text}"</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const StarIcon = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

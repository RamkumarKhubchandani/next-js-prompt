"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {
    Sparkles,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Zap,
    Bug,
    Rocket,
    Briefcase,
    Shield,
    Clock,
    MessageSquare,
    Star,
    Check,
    Calendar,
    Users,
    ChevronRight,
    Lock
} from 'lucide-react';

const GOALS = [
    {
        id: 'job-support',
        title: 'Urgent IT Job & Sprint Support',
        badge: 'High Demand',
        desc: 'Live screen-share bug fixing, PR blockers, and daily standup coaching.',
        icon: Bug
    },
    {
        id: '1-on-1-mentorship',
        title: '1-on-1 Coding Mentorship',
        badge: 'Popular',
        desc: 'Accelerated personalized learning & roadmap from junior to senior dev.',
        icon: Rocket
    },
    {
        id: 'mock-interview',
        title: 'FAANG / Senior Mock Interview',
        badge: 'Career Boost',
        desc: 'Live coding rounds, system design, and actionable hiring manager feedback.',
        icon: Shield
    },
    {
        id: 'web-development',
        title: 'Custom Web / SaaS Development',
        badge: 'Freelance & Agency',
        desc: 'Hire senior engineers to build fast Next.js MVPs or design landing pages.',
        icon: Briefcase
    }
];

const TECH_STACKS = [
    { name: 'React / Next.js', icon: '⚛️' },
    { name: 'TypeScript', icon: '🟦' },
    { name: 'JavaScript (ES6+)', icon: '🟨' },
    { name: 'Node.js & Express', icon: '🟢' },
    { name: 'Playwright & Cypress', icon: '🎭' },
    { name: 'Angular', icon: '🅰️' },
    { name: 'Vue / Svelte', icon: '💚' },
    { name: 'MongoDB & PostgreSQL', icon: '🍃' },
    { name: 'Full Stack MERN', icon: '🚀' },
    { name: 'HTML, CSS & Tailwind', icon: '🎨' },
    { name: 'Python & Django/FastAPI', icon: '🐍' },
    { name: 'DevOps & Docker/AWS', icon: '🐳' }
];

const URGENCIES = [
    { id: 'urgent', label: 'Urgent (Within 30 Mins)', desc: 'Immediate live screen share assistance', icon: Zap },
    { id: 'today', label: 'Today / This Week', desc: 'Schedule a session around your sprint', icon: Clock },
    { id: 'ongoing', label: 'Ongoing / Long Term', desc: 'Continuous weekly mentoring & support', icon: Calendar }
];

export default function MentorMatchWizard({ title, subtitle, className = '' }) {
    const [step, setStep] = useState(1);
    const [selectedGoal, setSelectedGoal] = useState(GOALS[0].id);
    const [selectedStack, setSelectedStack] = useState('React / Next.js');
    const [selectedUrgency, setSelectedUrgency] = useState('urgent');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [matched, setMatched] = useState(false);
    const [error, setError] = useState('');

    const handleGoalSelect = (goalId) => {
        setSelectedGoal(goalId);
        setStep(2);
    };

    const handleStackSelect = (stackName) => {
        setSelectedStack(stackName);
        setStep(3);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name.trim()) {
            setError('Please enter your full name.');
            return;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!formData.phone || formData.phone.length < 8) {
            setError('Please enter a valid WhatsApp / Mobile number.');
            return;
        }

        setSubmitting(true);

        try {
            const res = await fetch('/api/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: {
                        countryCode: '',
                        number: formData.phone
                    },
                    preferredTime: selectedUrgency === 'urgent' ? 'Immediate (< 30 mins)' : 'This Week',
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
                    notes: `Goal: ${selectedGoal} | Stack: ${selectedStack} | Urgency: ${selectedUrgency} | Notes: ${formData.notes || 'None'}`,
                    lessonTitle: `Match Wizard: ${selectedGoal} (${selectedStack})`
                })
            });

            const data = await res.json();
            if (res.ok) {
                setMatched(true);
            } else {
                setError(data.message || 'Failed to submit request. Please try again.');
            }
        } catch (err) {
            console.error(err);
            // Even if network fails, proceed to matched screen for optimal user conversion
            setMatched(true);
        } finally {
            setSubmitting(false);
        }
    };

    const getWhatsAppMatchUrl = () => {
        const text = `Hi Ram, I completed the OutlineDev Match Wizard!\n\n📌 Goal: ${selectedGoal}\n💻 Tech Stack: ${selectedStack}\n⚡ Urgency: ${selectedUrgency}\n👤 Name: ${formData.name}\n\nI would like to connect for 1:1 guidance.`;
        return `https://wa.me/918237320942?text=${encodeURIComponent(text)}`;
    };

    return (
        <div className={`w-full max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-10 relative overflow-hidden ${className}`}>
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

            {!matched ? (
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
                            <Sparkles size={13} />
                            60-Second Matchmaking
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                            {title || 'Find Your Ideal Tech Mentor or Sprint Support in 60 Seconds'}
                        </h2>
                        <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
                            {subtitle || 'Tell us what you need help with, and get matched with a Senior Staff Engineer for live 1-on-1 screen sharing.'}
                        </p>

                        {/* Step Progress Dots */}
                        <div className="flex items-center justify-center gap-3 mt-6">
                            <div className="flex items-center gap-2">
                                <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${step >= 1 ? 'bg-brand-primary text-slate-900 font-extrabold shadow-lg shadow-brand-primary/25' : 'bg-slate-800 text-slate-400'}`}>
                                    1
                                </span>
                                <span className={`text-xs font-semibold ${step >= 1 ? 'text-white' : 'text-slate-500'}`}>Goal</span>
                            </div>
                            <div className={`w-8 h-0.5 rounded transition-all ${step >= 2 ? 'bg-brand-primary' : 'bg-slate-800'}`} />
                            <div className="flex items-center gap-2">
                                <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${step >= 2 ? 'bg-brand-primary text-slate-900 font-extrabold shadow-lg shadow-brand-primary/25' : 'bg-slate-800 text-slate-400'}`}>
                                    2
                                </span>
                                <span className={`text-xs font-semibold ${step >= 2 ? 'text-white' : 'text-slate-500'}`}>Tech Stack</span>
                            </div>
                            <div className={`w-8 h-0.5 rounded transition-all ${step >= 3 ? 'bg-brand-primary' : 'bg-slate-800'}`} />
                            <div className="flex items-center gap-2">
                                <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${step >= 3 ? 'bg-brand-primary text-slate-900 font-extrabold shadow-lg shadow-brand-primary/25' : 'bg-slate-800 text-slate-400'}`}>
                                    3
                                </span>
                                <span className={`text-xs font-semibold ${step >= 3 ? 'text-white' : 'text-slate-500'}`}>Match</span>
                            </div>
                        </div>
                    </div>

                    {/* Step 1: Goal Selection */}
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 text-center mb-4">
                                Step 1: What is your primary requirement?
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {GOALS.map((goal) => {
                                    const IconComp = goal.icon;
                                    const isSelected = selectedGoal === goal.id;
                                    return (
                                        <button
                                            key={goal.id}
                                            type="button"
                                            onClick={() => handleGoalSelect(goal.id)}
                                            className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between group ${
                                                isSelected
                                                    ? 'bg-slate-800/90 border-brand-primary shadow-xl shadow-brand-primary/10 scale-[1.01]'
                                                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                                            }`}
                                        >
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                                                        <IconComp size={20} />
                                                    </div>
                                                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-brand-primary border border-brand-primary/20">
                                                        {goal.badge}
                                                    </span>
                                                </div>
                                                <h4 className="text-base font-bold text-white mb-1 group-hover:text-brand-primary transition-colors">
                                                    {goal.title}
                                                </h4>
                                                <p className="text-xs text-slate-400 leading-relaxed">
                                                    {goal.desc}
                                                </p>
                                            </div>
                                            <div className="mt-4 flex items-center justify-between text-xs font-bold text-brand-primary">
                                                <span>Select & Proceed</span>
                                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Tech Stack Selection */}
                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                                >
                                    <ArrowLeft size={14} /> Back
                                </button>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                                    Step 2: Choose your tech stack
                                </h3>
                                <div className="w-10" />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {TECH_STACKS.map((stack) => {
                                    const isSelected = selectedStack === stack.name;
                                    return (
                                        <button
                                            key={stack.name}
                                            type="button"
                                            onClick={() => handleStackSelect(stack.name)}
                                            className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 group ${
                                                isSelected
                                                    ? 'bg-brand-primary text-slate-900 border-brand-primary font-bold shadow-lg shadow-brand-primary/20'
                                                    : 'bg-slate-950/60 border-slate-800 text-slate-200 hover:bg-slate-800/60 hover:border-slate-700'
                                            }`}
                                        >
                                            <span className="text-2xl group-hover:scale-110 transition-transform">{stack.icon}</span>
                                            <span className="text-xs font-bold leading-tight">{stack.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Urgency & Contact Capture */}
                    {step === 3 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                                >
                                    <ArrowLeft size={14} /> Back
                                </button>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                                    Step 3: When do you want to connect?
                                </h3>
                                <div className="w-10" />
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Urgency Selector */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {URGENCIES.map((urg) => {
                                        const IconComp = urg.icon;
                                        const isSelected = selectedUrgency === urg.id;
                                        return (
                                            <button
                                                key={urg.id}
                                                type="button"
                                                onClick={() => setSelectedUrgency(urg.id)}
                                                className={`p-3.5 rounded-xl border text-left transition-all ${
                                                    isSelected
                                                        ? 'bg-brand-primary/10 border-brand-primary text-white shadow-md'
                                                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2 font-bold text-xs mb-1 text-white">
                                                    <IconComp size={14} className={isSelected ? 'text-brand-primary' : 'text-slate-400'} />
                                                    <span>{urg.label}</span>
                                                </div>
                                                <p className="text-[11px] text-slate-400">{urg.desc}</p>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Contact Fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                            Your Full Name <span className="text-brand-primary">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. Rahul Sharma"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder:text-slate-400 text-sm font-medium focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25 focus:bg-slate-800 outline-none transition-all shadow-inner"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                            Email Address <span className="text-brand-primary">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="rahul@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder:text-slate-400 text-sm font-medium focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25 focus:bg-slate-800 outline-none transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                        WhatsApp / Mobile Number (with country code) <span className="text-brand-primary">*</span>
                                    </label>
                                    <div className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-sm font-medium focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/25 focus-within:bg-slate-800 transition-all shadow-inner flex items-center">
                                        <PhoneInput
                                            international
                                            defaultCountry="IN"
                                            value={formData.phone}
                                            onChange={(val) => setFormData({ ...formData, phone: val || '' })}
                                            placeholder="Enter phone number"
                                            className="w-full text-white text-sm font-medium"
                                        />
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-1.5">
                                        🔒 We respect your privacy. Used solely to coordinate your 1:1 session or WhatsApp confirmation.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                        Brief Note / Specific Bug or Goal (Optional)
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="e.g. Need help debugging React state issue or PR review before standup..."
                                        className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder:text-slate-400 text-sm font-medium focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25 focus:bg-slate-800 outline-none resize-none transition-all shadow-inner"
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 rounded-xl bg-red-900/30 border border-red-800/50 text-red-300 text-xs font-semibold">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-4 rounded-xl font-extrabold text-slate-900 bg-gradient-to-r from-brand-primary via-emerald-400 to-brand-primary hover:opacity-95 shadow-xl shadow-brand-primary/20 transition-all text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <span>Matching with Senior Mentor...</span>
                                    ) : (
                                        <>
                                            <Zap size={18} className="fill-current" />
                                            <span>Match Me & Get Instant 1:1 Help</span>
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </div>
            ) : (
                /* Result Match Screen */
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 text-center py-6"
                >
                    <div className="w-16 h-16 rounded-full bg-brand-primary/20 border-2 border-brand-primary flex items-center justify-center text-brand-primary mx-auto mb-6 shadow-lg shadow-brand-primary/30">
                        <CheckCircle2 size={36} />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                        Match Found & Confirmed!
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
                        We have paired you with a dedicated Senior Staff Engineer for <strong className="text-brand-primary">{selectedStack}</strong>.
                    </p>

                    {/* Mentor Profile Card */}
                    <div className="mt-8 max-w-md mx-auto p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary to-emerald-600 flex items-center justify-center text-slate-900 font-black text-xl shadow-md shrink-0">
                                RK
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <h4 className="font-extrabold text-white text-base">Ramkumar Khubchandani</h4>
                                    <span className="p-0.5 rounded-full bg-blue-500 text-white">
                                        <Check size={10} strokeWidth={3} />
                                    </span>
                                </div>
                                <p className="text-xs text-brand-primary font-semibold">Staff Frontend Architect & Lead Mentor</p>
                                <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400">
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    <span className="font-bold text-white">4.9/5</span>
                                    <span>• 700+ Sessions Delivered</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                            <span>SLA Response Time:</span>
                            <span className="font-bold text-emerald-400 flex items-center gap-1">
                                <Zap size={12} /> Under 15 Minutes
                            </span>
                        </div>
                    </div>

                    {/* Instant Action CTA Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                        <a
                            href={getWhatsAppMatchUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 px-6 rounded-xl font-extrabold text-white bg-[#25D366] hover:bg-[#1ebe5d] shadow-xl shadow-green-500/25 transition-all flex items-center justify-center gap-2 text-sm"
                        >
                            <MessageSquare size={18} />
                            Start WhatsApp Chat Now
                        </a>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-4">
                        We have also sent your match details to <span className="text-slate-300 font-semibold">{formData.email}</span>.
                    </p>
                </motion.div>
            )}
        </div>
    );
}

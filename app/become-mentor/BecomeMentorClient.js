"use client";
import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Globe, DollarSign, Clock, Layout, Users, Send, Briefcase, MapPin, Phone, Linkedin, GraduationCap, Video } from 'lucide-react';
import { countryList } from '../components/countryList';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const SKILLS = [
    "React", "Node.js", "Angular", "Vue.js", "System Design",
    "Python", "Java", "Go", "Rust", "AWS", "Docker", "Kubernetes",
    "Product Management", "UI/UX Design", "Career Coaching"
];

function StepIndicator({ currentStep, totalSteps }) {
    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            {[...Array(totalSteps)].map((_, i) => (
                <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${i + 1 <= currentStep ? "w-8 bg-brand-primary" : "w-2 bg-gray-200 dark:bg-gray-700"
                        }`}
                />
            ))}
        </div>
    );
}

export default function BecomeMentorClient() {
    const { data: session } = useSession();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        phone: '',
        country: '',
        city: '',
        linkedin: '',
        portfolio: '',
        yearsExperience: '',
        skills: [],
        hourlyRate: '',
        availability: '',
        bio: '',
        education: '',
        videoIntro: '' // Optional URL
    });

    // Fetch existing application
    useEffect(() => {
        if (!session) return;

        async function loadApp() {
            try {
                const res = await fetch('/api/mentor/apply');
                if (res.ok) {
                    const data = await res.json();
                    if (data.application) {
                        setFormData(prev => ({
                            ...prev,
                            ...data.application,
                            // Ensure arrays are arrays
                            skills: data.application.skills || []
                        }));
                        // If they are already pending/approved, we might show the success screen initially?
                        // Or let them edit. The user asked to "edit and send back".
                        // So we just load the data.
                        if (data.application.status === 'pending') {
                            setIsSuccess(true); // Show "Received" screen first, but provide "Edit" button there?
                        }
                    }
                }
            } catch (e) { console.error(e); }
        }
        loadApp();
    }, [session]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleSkill = (skill) => {
        setFormData(prev => {
            const skills = prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill];
            return { ...prev, skills };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/mentor/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsSuccess(true);
            } else {
                const data = await res.json();
                alert(data.error || "Something went wrong.");
            }
        } catch (err) {
            console.error(err);
            alert("Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-light-50 dark:bg-[#050505] text-dark-900 dark:text-light-100 flex flex-col font-sans">
                <Header />
                <main className="flex-grow flex items-center justify-center p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="max-w-md w-full bg-white dark:bg-dark-800 p-8 rounded-3xl border border-gray-200 dark:border-dark-700 text-center shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-primary to-purple-600" />
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} className="text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-3xl font-black mb-4 text-dark-900 dark:text-white">Application Received!</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            Thank you for applying to join the Elite Mentor League. Our team will review your profile and schedule a <strong>Skill Assessment Interview</strong> within 48 hours.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="block w-full py-3 bg-brand-primary text-dark-900 font-bold rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Edit Application
                            </button>
                            <Link href="/" className="block w-full py-3 bg-dark-900 dark:bg-white text-dark-900 dark:text-dark-900 font-bold rounded-xl hover:opacity-90 transition-opacity bg-opacity-10 dark:bg-opacity-10 border border-dark-900/10 dark:border-white/10">
                                Return Home
                            </Link>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light-50 dark:bg-[#050505] text-dark-900 dark:text-light-100 flex flex-col font-sans">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                {/* HERO SECTION */}
                <section className="relative px-4 sm:px-6 lg:px-8 mb-24 max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
                            Join the Top 1% of Educators
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-dark-900 dark:text-white">
                            Share Knowledge. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-600">Earn Globally.</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Join the world's fastest-growing mentorship platform. We handle the marketing, scheduling, and payments. You focus on <strong>building the next generation of engineers.</strong>
                        </p>
                    </motion.div>
                </section>

                <section className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT COLUMN: Benefits */}
                    <div className="space-y-12">
                        <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl border border-gray-200 dark:border-dark-700 shadow-xl relative overflow-hidden group hover:border-brand-primary/50 transition-colors">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Globe size={120} />
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                                <Globe size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-dark-900 dark:text-white">Global Reach</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Teach students from 150+ countries. Our platform localizes payments and schedules, connecting you with eager learners worldwide.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl border border-gray-200 dark:border-dark-700 shadow-xl relative overflow-hidden group hover:border-green-500/50 transition-colors">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <DollarSign size={120} />
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                                <DollarSign size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-dark-900 dark:text-white">Set Your Own Rates</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                You decide what your time is worth. Top mentors earn over <strong>$5,000/month</strong> teaching part-time. We take a minimal platform fee.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl border border-gray-200 dark:border-dark-700 shadow-xl relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Layout size={120} />
                            </div>
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                                <Users size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-dark-900 dark:text-white">Integrated Tools</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                No more Zoom links or messy calendars. Our platform includes built-in video conferencing, code collaboration, and scheduling.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Application Form */}
                    <div className="relative">
                        {/* Decorative background blur */}
                        <div className="absolute inset-0 bg-brand-primary/20 blur-[100px] rounded-full -z-10" />

                        <div className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-black text-dark-900 dark:text-white">Apply Now</h2>
                                <p className="text-gray-500 dark:text-gray-400">Mentorship Application</p>
                            </div>

                            {!session ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Users size={32} className="text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-dark-900 dark:text-white">Create an Account to Apply</h3>
                                    <div className="text-left text-gray-500 mb-8 space-y-2 bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10">
                                        <p className="font-semibold text-dark-900 dark:text-white">How to apply:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-sm">
                                            <li>Click the button below to <strong>Log In</strong> or <strong>Register</strong>.</li>
                                            <li>Once logged in, return to this page (or check your Dashboard).</li>
                                            <li>Fill out this form to submit your application.</li>
                                        </ol>
                                    </div>
                                    <button
                                        onClick={() => signIn(undefined, { callbackUrl: '/become-mentor' })}
                                        className="w-full py-4 bg-brand-primary text-dark-900 font-bold text-lg rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,255,178,0.3)]"
                                    >
                                        Sign In / Register
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <StepIndicator currentStep={step} totalSteps={3} />

                                    <AnimatePresence mode="wait">
                                        {/* STEP 1: PERSONAL INFO */}
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="col-span-2">
                                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                                        <input
                                                            type="text"
                                                            value={session.user.name}
                                                            disabled
                                                            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-500 cursor-not-allowed"
                                                        />
                                                    </div>
                                                    <div className="col-span-2 md:col-span-1">
                                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            required
                                                            placeholder="+1 555-000-0000"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 focus:border-brand-primary outline-none transition-colors"
                                                        />
                                                    </div>
                                                    <div className="col-span-2 md:col-span-1">
                                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Country</label>
                                                        <select
                                                            name="country"
                                                            required
                                                            value={formData.country}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 focus:border-brand-primary outline-none transition-colors"
                                                        >
                                                            <option value="">Select...</option>
                                                            {countryList.map(c => (
                                                                <option key={c.code} value={c.name}>{c.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">LinkedIn Profile</label>
                                                    <div className="relative">
                                                        <Linkedin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="url"
                                                            name="linkedin"
                                                            required
                                                            placeholder="https://linkedin.com/in/..."
                                                            value={formData.linkedin}
                                                            onChange={handleInputChange}
                                                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 focus:border-brand-primary outline-none transition-colors"
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => setStep(2)}
                                                    className="w-full py-4 mt-4 bg-dark-900 dark:bg-white text-white dark:text-dark-900 font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                                >
                                                    Next Step <Layout size={18} />
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* STEP 2: PROFESSIONAL INFO */}
                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Primary Expertise (Select multiple)</label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {SKILLS.map(skill => (
                                                            <button
                                                                key={skill}
                                                                type="button"
                                                                onClick={() => toggleSkill(skill)}
                                                                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${formData.skills.includes(skill)
                                                                    ? "bg-brand-primary text-dark-900 border-brand-primary"
                                                                    : "bg-transparent text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-gray-400"
                                                                    }`}
                                                            >
                                                                {skill}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Years of Exp.</label>
                                                        <input
                                                            type="number"
                                                            name="yearsExperience"
                                                            required
                                                            min="0"
                                                            placeholder="e.g. 5"
                                                            value={formData.yearsExperience}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 focus:border-brand-primary outline-none transition-colors"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Hourly Rate ($)</label>
                                                        <input
                                                            type="number"
                                                            name="hourlyRate"
                                                            required
                                                            min="0"
                                                            placeholder="e.g. 50"
                                                            value={formData.hourlyRate}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 focus:border-brand-primary outline-none transition-colors"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Education / Highest Degree</label>
                                                    <div className="relative">
                                                        <GraduationCap size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            name="education"
                                                            required
                                                            placeholder="e.g. MS in Computer Science"
                                                            value={formData.education}
                                                            onChange={handleInputChange}
                                                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 focus:border-brand-primary outline-none transition-colors"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setStep(1)}
                                                        className="flex-1 py-4 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setStep(3)}
                                                        className="flex-[2] py-4 bg-dark-900 dark:bg-white text-white dark:text-dark-900 font-bold rounded-xl hover:opacity-90 transition-opacity"
                                                    >
                                                        Next Step
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* STEP 3: BIO & REVIEW */}
                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Mentor Bio</label>
                                                    <textarea
                                                        name="bio"
                                                        required
                                                        rows={4}
                                                        placeholder="Introduce yourself to student. What is your teaching style? What have you built?"
                                                        value={formData.bio}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 focus:border-brand-primary outline-none transition-colors resize-none"
                                                    />
                                                </div>

                                                <div className="p-4 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
                                                    <h4 className="text-sm font-bold text-brand-primary mb-2 flex items-center gap-2">
                                                        <Video size={16} /> Interview Process
                                                    </h4>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        After submission, we will schedule a 30-min video interview to verify your skills. Once approved, your profile goes live to millions.
                                                    </p>
                                                </div>

                                                <div className="flex gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setStep(2)}
                                                        className="flex-1 py-4 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="flex-[2] py-4 bg-gradient-to-r from-brand-primary to-green-500 text-dark-900 font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20"
                                                    >
                                                        {isSubmitting ? "Submitting..." : "Submit Application"} <Send size={18} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

"use client";
import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Globe, DollarSign, Clock, Layout, Users, Send, Briefcase, MapPin, Phone, Linkedin, GraduationCap, Video, Search, X, Check } from 'lucide-react';
import { countryList } from '../components/countryList';
import { SKILLS as SEO_SKILLS } from '../lib/seo-data';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

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
    const [skillSearch, setSkillSearch] = useState('');
    const [roleError, setRoleError] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        roles: [],
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
        videoIntro: '', // Optional URL
        photoUrl: null
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
                            roles: data.application.roles || [],
                            skills: data.application.skills || []
                        }));
                        if (data.application.status === 'pending') {
                            setIsSuccess(true);
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

    const toggleRole = (role) => {
        setRoleError('');
        setFormData(prev => {
            const roles = prev.roles.includes(role)
                ? prev.roles.filter(r => r !== role)
                : [...prev.roles, role];
            return { ...prev, roles };
        });
    };

    const toggleSkill = (skill) => {
        setFormData(prev => {
            const skills = prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill];
            return { ...prev, skills };
        });
    };

    const handleStep1Next = () => {
        if (!formData.roles || formData.roles.length === 0) {
            setRoleError('Please select at least one role you are applying for.');
            return;
        }
        if (!formData.phone || !formData.country || !formData.linkedin) {
            alert('Please fill in your phone number, country, and LinkedIn profile.');
            return;
        }
        setStep(2);
    };

    const filteredSkills = SEO_SKILLS.filter(s => {
        const q = skillSearch.toLowerCase().trim();
        if (!q) return true;
        return s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.keywords?.some(k => k.toLowerCase().includes(q));
    });

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
                            Thank you for applying to join our mentor network. Our team will review your profile within 3-5 business days.
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
                            Join Our Mentorship Network
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-dark-900 dark:text-white">
                            Share Knowledge. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-600">Mentor Engineers.</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Connect with learners looking for direct guidance in React, Node.js, and System Design. Set your terms, teach directly, and help build the next generation of engineers.
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
                                Connect with motivated learners seeking personalized 1-on-1 mentorship, code reviews, and career guidance.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl border border-gray-200 dark:border-dark-700 shadow-xl relative overflow-hidden group hover:border-green-500/50 transition-colors">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <DollarSign size={120} />
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                                <DollarSign size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-dark-900 dark:text-white">Direct Terms & Payments</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                You arrange payment directly with the client or student — we don't take a cut, and we don't hold your money. We introduce the lead; terms are between you and them.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl border border-gray-200 dark:border-dark-700 shadow-xl relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Layout size={120} />
                            </div>
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                                <Users size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-dark-900 dark:text-white">Focused Mentorship</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Focus on hands-on pairing, code reviews, and system architecture walkthroughs using your preferred workflow and tools.
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
                                        {/* STEP 1: PERSONAL INFO & ROLE SELECTION */}
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                {/* Role Selection */}
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                        I am applying as: <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleRole('mentor')}
                                                            className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                                                                formData.roles.includes('mentor')
                                                                    ? "border-brand-primary bg-brand-primary/10 text-dark-900 dark:text-white"
                                                                    : "border-gray-200 dark:border-white/10 hover:border-gray-400 text-gray-700 dark:text-gray-300"
                                                            }`}
                                                        >
                                                            <div className={`w-5 h-5 rounded flex items-center justify-center border mt-0.5 ${formData.roles.includes('mentor') ? 'bg-brand-primary border-brand-primary text-dark-900' : 'border-gray-400'}`}>
                                                                {formData.roles.includes('mentor') && <Check size={14} />}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-sm">Mentor</div>
                                                                <div className="text-xs text-gray-500 dark:text-gray-400">Teaching, coaching & 1-on-1 sessions</div>
                                                            </div>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => toggleRole('hire')}
                                                            className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                                                                formData.roles.includes('hire')
                                                                    ? "border-brand-primary bg-brand-primary/10 text-dark-900 dark:text-white"
                                                                    : "border-gray-200 dark:border-white/10 hover:border-gray-400 text-gray-700 dark:text-gray-300"
                                                            }`}
                                                        >
                                                            <div className={`w-5 h-5 rounded flex items-center justify-center border mt-0.5 ${formData.roles.includes('hire') ? 'bg-brand-primary border-brand-primary text-dark-900' : 'border-gray-400'}`}>
                                                                {formData.roles.includes('hire') && <Check size={14} />}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-sm">Available for Hire</div>
                                                                <div className="text-xs text-gray-500 dark:text-gray-400">Freelance, contract & project work</div>
                                                            </div>
                                                        </button>
                                                    </div>
                                                    {roleError && <p className="text-xs text-red-500 font-semibold mt-2">{roleError}</p>}
                                                </div>

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
                                                    onClick={handleStep1Next}
                                                    className="w-full py-4 mt-4 bg-dark-900 dark:bg-white text-white dark:text-dark-900 font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                                >
                                                    Next Step <Layout size={18} />
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* STEP 2: PROFESSIONAL INFO & SEARCHABLE MULTI-SELECT SKILLS */}
                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                                                            Primary Expertise (Select multiple)
                                                        </label>
                                                        <span className="text-xs text-gray-500 font-medium">
                                                            {formData.skills.length} selected
                                                        </span>
                                                    </div>

                                                    {/* Selected removable tags */}
                                                    {formData.skills.length > 0 && (
                                                        <div className="flex flex-wrap gap-1.5 p-3 mb-3 bg-gray-50 dark:bg-black/30 rounded-xl border border-gray-200 dark:border-white/10 max-h-32 overflow-y-auto">
                                                            {formData.skills.map(skill => (
                                                                <span
                                                                    key={skill}
                                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-primary text-dark-900 font-bold rounded-lg text-xs"
                                                                >
                                                                    {skill}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => toggleSkill(skill)}
                                                                        className="hover:opacity-75 focus:outline-none"
                                                                    >
                                                                        <X size={12} />
                                                                    </button>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Search Input */}
                                                    <div className="relative mb-3">
                                                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                        <input
                                                            type="text"
                                                            value={skillSearch}
                                                            onChange={(e) => setSkillSearch(e.target.value)}
                                                            placeholder="Filter skills (e.g. React, Next.js, Python, AWS, MFE)..."
                                                            className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 focus:border-brand-primary outline-none text-sm transition-colors"
                                                        />
                                                        {skillSearch && (
                                                            <button
                                                                type="button"
                                                                onClick={() => setSkillSearch('')}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Filterable Skill Grid */}
                                                    <div className="max-h-48 overflow-y-auto p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 flex flex-wrap gap-1.5">
                                                        {filteredSkills.length > 0 ? (
                                                            filteredSkills.map(skill => {
                                                                const isSelected = formData.skills.includes(skill.name);
                                                                return (
                                                                    <button
                                                                        key={skill.id}
                                                                        type="button"
                                                                        onClick={() => toggleSkill(skill.name)}
                                                                        className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                                                                            isSelected
                                                                                ? "bg-brand-primary text-dark-900 border-brand-primary shadow-sm"
                                                                                : "bg-transparent text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-brand-primary/50"
                                                                        }`}
                                                                    >
                                                                        {isSelected ? "✓ " : "+ "}
                                                                        {skill.name}
                                                                    </button>
                                                                );
                                                            })
                                                        ) : (
                                                            <p className="text-xs text-gray-400 p-2">No matching skills found for "{skillSearch}".</p>
                                                        )}
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
                                                        For most applicants, we schedule a short 30-minute video interview to verify your skills — strong profiles with clear project history may be approved without one.
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

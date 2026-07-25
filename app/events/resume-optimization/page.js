"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Sparkles, CheckCircle2, AlertTriangle, Cpu, FileText, ArrowRight, User, Mail, MessageSquare, Loader2 } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function ResumeOptimizationEventPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch('/api/events/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    eventSlug: 'resume-optimization',
                    eventTitle: 'AI-Driven Resume Optimization Masterclass'
                })
            });

            const data = await res.json();
            if (data.success) {
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMessage(data.message || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setStatus('error');
            setErrorMessage('Network error. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-light-100 font-sans selection:bg-brand-primary/30 relative overflow-hidden">
            <Header />

            {/* Glowing Auroras */}
            <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[150px] animate-pulse" />
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8"
                    >
                        <Sparkles size={14} className="text-brand-primary animate-pulse" />
                        <span className="text-xs font-black tracking-widest uppercase text-brand-primary">Free Live Workshop</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.05]"
                    >
                        Bypass the ATS. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">Land 5x More Interviews.</span>
                    </motion.h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed mb-10">
                        Stop sending resumes into a black hole. Learn the exact AI prompt pipelines and metric formulas used by top-tier engineers to get noticed by Google, Meta, and Swiggy.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-gray-400">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                            <Calendar size={16} className="text-brand-primary" />
                            <span>Sunday, Jan 31, 2026</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                            <Clock size={16} className="text-blue-400" />
                            <span>07:00 PM - 08:30 PM IST</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column: Problem & Breakdown */}
                    <div className="lg:col-span-7 space-y-16">
                        
                        {/* The Problem */}
                        <div className="p-8 md:p-10 rounded-3xl bg-red-950/20 border border-red-500/20">
                            <h2 className="text-2xl md:text-3xl font-black text-red-400 mb-6 flex items-center gap-3">
                                <AlertTriangle size={28} />
                                The Problem: Why Resumes Fail
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                98% of candidate resumes are filtered out automatically by Applicant Tracking Systems (ATS) before a human recruiter even sees them. Standard builder resumes fail for three main reasons:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-sm text-gray-400">
                                    <span className="text-red-500 font-bold">✕</span>
                                    <div>
                                        <strong className="text-white font-bold">Vague Responsibilities:</strong> Listing "Responsible for writing React components" instead of showing measurable business outcomes.
                                    </div>
                                </li>
                                <li className="flex gap-3 text-sm text-gray-400">
                                    <span className="text-red-500 font-bold">✕</span>
                                    <div>
                                        <strong className="text-white font-bold">Lack of Keyword Density:</strong> Resumes lack the specific technical terms that match the target Job Description (JD).
                                    </div>
                                </li>
                                <li className="flex gap-3 text-sm text-gray-400">
                                    <span className="text-red-500 font-bold">✕</span>
                                    <div>
                                        <strong className="text-white font-bold">Complex Layouts:</strong> Multi-column formats, images, and tables confuse ATS parsers, resulting in auto-rejection.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* The Solution */}
                        <div>
                            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                                <CheckCircle2 className="text-brand-primary" size={28} />
                                How We Solve It: The AI-Driven Masterclass
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                In this 90-minute workshop, we will break down the exact strategies to optimize your resume with artificial intelligence. We will build a live, ATS-proof resume from scratch using real-world templates.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-primary/30 transition-all">
                                    <Cpu size={24} className="text-brand-primary mb-4" />
                                    <h4 className="font-bold text-white mb-2">Semantic Keywords Matching</h4>
                                    <p className="text-xs text-gray-400">
                                        Use LLM models to analyze Job Descriptions and extract hidden keywords to align your resume with ATS search criteria.
                                    </p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/30 transition-all">
                                    <FileText size={24} className="text-blue-400 mb-4" />
                                    <h4 className="font-bold text-white mb-2">The Google X-Y-Z Formula</h4>
                                    <p className="text-xs text-gray-400">
                                        Learn to rephrase passive bullet points into "Accomplished X, measured by Y, by doing Z" to capture hiring managers.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* AI Breakdown */}
                        <div>
                            <h2 className="text-3xl font-black text-white mb-6">AI Optimization Breakdown</h2>
                            <div className="relative border-l border-white/10 pl-6 space-y-8">
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-brand-primary border-4 border-black" />
                                    <h4 className="font-bold text-white mb-1">Step 1: Raw Parser Auditing</h4>
                                    <p className="text-sm text-gray-400">
                                        Learn how to feed your raw resume text into an LLM using specific audit prompts to flag missing skills and grammatical bottlenecks.
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-400 border-4 border-black" />
                                    <h4 className="font-bold text-white mb-1">Step 2: JD Mapping</h4>
                                    <p className="text-sm text-gray-400">
                                        Extract target components (e.g., state sync, bundle sizes, custom hooks) from the job description and inject them natively into your achievements.
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-400 border-4 border-black" />
                                    <h4 className="font-bold text-white mb-1">Step 3: Verification & Formatting</h4>
                                    <p className="text-sm text-gray-400">
                                        Convert the generated content into clean, plain-text markdown schemas to ensure 100% readability across all standard recruitment software.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Registration Card */}
                    <div className="lg:col-span-5 sticky top-32">
                        <div className="p-8 rounded-[2.5rem] bg-dark-800 border border-white/5 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-primary to-blue-500" />
                            
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-black mb-2">Claim Your Spot</h3>
                                <p className="text-xs text-brand-primary font-bold uppercase tracking-wider bg-brand-primary/10 px-3 py-1 rounded-full w-fit mx-auto">
                                    100% Free Live Session
                                </p>
                            </div>

                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-primary/30">
                                            <CheckCircle2 size={40} className="text-brand-primary" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-white mb-2">You're Registered! 🎉</h4>
                                        <p className="text-sm text-gray-400 mb-6">
                                            We've sent a WhatsApp confirmation and email invite containing the private workshop link to <strong>{formData.email}</strong>.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black border border-white/10 focus:border-brand-primary/50 outline-none text-white text-sm transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black border border-white/10 focus:border-brand-primary/50 outline-none text-white text-sm transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">WhatsApp Number</label>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.whatsapp}
                                                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black border border-white/10 focus:border-brand-primary/50 outline-none text-white text-sm transition-all"
                                                    placeholder="+91 98765 43210"
                                                />
                                            </div>
                                            <p className="text-[10px] text-gray-500 mt-2">Required to send the private session URL.</p>
                                        </div>

                                        {status === 'error' && (
                                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold">
                                                {errorMessage}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="w-full py-4 rounded-xl bg-brand-primary text-black font-black text-sm uppercase tracking-widest hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-primary/20"
                                        >
                                            {status === 'submitting' ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Secure Free Spot
                                                    <ArrowRight size={16} />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>

            </main>
            <Footer />
        </div>
    );
}

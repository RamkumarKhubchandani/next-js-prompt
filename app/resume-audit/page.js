"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/app/components/Header';
import { Upload, FileText, CheckCircle, AlertTriangle, ArrowRight, Loader2, Sparkles, AlertCircle, X, ShieldCheck, Download, Wand2, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResumeAuditPage() {
    const [auditState, setAuditState] = useState('idle'); // idle, job-input, uploading, analyzing, results, optimizing, optimized
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [optimizedResume, setOptimizedResume] = useState(null);
    const [copied, setCopied] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setAuditState('job-input');
        }
    };

    const startAnalysis = async () => {
        setAuditState('analyzing');

        // Mock Analysis Delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Mock Result Data
        const mockResult = {
            score: 64,
            summary: "Your resume has a strong technical foundation but lacks quantitative impact. It might get filtered by ATS due to complex formatting.",
            ats_compatibility: "Medium",
            keywords_found: ["React", "JavaScript", "CSS"],
            keywords_missing: ["CI/CD", "TypeScript", "System Design", "Unit Testing"],
            formatting_issues: ["Multiple columns detected (bad for ATS)", "Font size too small (10px)"],
            improvements: [
                { section: "Experience", tip: "Use the 'X-Y-Z' formula: Achieved [X] as measured by [Y], by doing [Z]." },
                { section: "Skills", tip: "Group skills by category (Languages, Tools, Frameworks) for better readability." },
                { section: "Summary", tip: "Remove the 'Objective' section. Replace with a 'Professional Summary' highlighting 3 key achievements." }
            ]
        };

        setAnalysis(mockResult);
        setAuditState('results');
        if (mockResult.score > 80) confetti();
    };

    const optimizeResume = async () => {
        setAuditState('optimizing');

        // Mock Optimization Delay
        await new Promise(resolve => setTimeout(resolve, 4000));

        // Mock Optimized Resume
        const mockOptimized = {
            score: 92,
            sections: {
                summary: "Results-driven Senior Software Engineer with 5+ years building scalable web applications. Increased system performance by 40% through React optimization and reduced deployment time by 60% via CI/CD automation. Expert in TypeScript, System Design, and Unit Testing.",
                experience: [
                    {
                        title: "Senior Software Engineer",
                        company: "Tech Corp",
                        duration: "2021 - Present",
                        bullets: [
                            "Architected and deployed microservices infrastructure serving 2M+ users, reducing latency by 35% through Redis caching and load balancing",
                            "Led migration from JavaScript to TypeScript, improving code quality by 50% as measured by 80% reduction in runtime errors",
                            "Implemented CI/CD pipeline using GitHub Actions and Docker, decreasing deployment time from 2 hours to 15 minutes (87.5% improvement)",
                            "Mentored 5 junior developers on React best practices and system design, resulting in 30% faster feature delivery"
                        ]
                    }
                ],
                skills: {
                    languages: ["TypeScript", "JavaScript", "Python", "Go"],
                    frameworks: ["React", "Next.js", "Node.js", "Express"],
                    tools: ["Docker", "Kubernetes", "AWS", "CI/CD", "Git"],
                    practices: ["System Design", "Unit Testing", "Agile", "Code Review"]
                }
            },
            improvements_made: [
                "Added quantifiable metrics to all experience bullets",
                "Incorporated missing keywords: TypeScript, CI/CD, System Design, Unit Testing",
                "Restructured skills section by category for ATS compatibility",
                "Replaced generic objective with achievement-focused professional summary",
                "Removed complex formatting for better ATS parsing"
            ]
        };

        setOptimizedResume(mockOptimized);
        setAuditState('optimized');
        confetti();
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 text-slate-900 dark:text-white font-sans selection:bg-brand-primary/30 transition-colors duration-300">
            <Header />

            <main className="pt-24 pb-12 px-4 relative overflow-hidden min-h-screen">
                {/* Background Decor */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">

                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/20 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-4"
                        >
                            <Sparkles size={12} /> AI-Powered Resume Optimizer
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black tracking-tight mb-4"
                        >
                            Get Your Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:to-pink-400">Interview-Ready</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                        >
                            Upload your resume + paste job description. Our AI rewrites it to beat ATS systems and impress recruiters.
                        </motion.p>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* STATE: UPLOAD */}
                        {auditState === 'idle' && (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="max-w-2xl mx-auto"
                            >
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="group relative border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-12 text-center cursor-pointer transition-all hover:scale-105 shadow-xl"
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept=".pdf"
                                        className="hidden"
                                    />

                                    <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <Upload size={32} className="text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        Drop your resume (PDF) here
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                        or click to browse • We'll analyze and optimize it for you
                                    </p>
                                    <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                                        <span className="flex items-center gap-1"><ShieldCheck size={12} /> Privacy First</span>
                                        <span className="flex items-center gap-1"><FileText size={12} /> PDF Only</span>
                                        <span className="flex items-center gap-1"><Wand2 size={12} /> AI Powered</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STATE: JOB DESCRIPTION INPUT */}
                        {auditState === 'job-input' && (
                            <motion.div
                                key="job-input"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-3xl mx-auto"
                            >
                                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-2xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                            <FileText className="text-purple-600 dark:text-purple-400" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Paste Job Description</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Help us tailor your resume to this specific role</p>
                                        </div>
                                    </div>

                                    <textarea
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        placeholder="Paste the full job description here...

Example:
We're looking for a Senior Software Engineer with 5+ years of experience in React, TypeScript, and system design. You'll build scalable web applications, mentor junior developers, and implement CI/CD pipelines..."
                                        className="w-full h-64 p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                    />

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={() => setAuditState('idle')}
                                            className="px-6 py-3 bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-slate-700 transition-all"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            onClick={startAnalysis}
                                            disabled={!jobDescription.trim()}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                                        >
                                            Analyze Resume →
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                                        💡 Tip: The more detailed the job description, the better we can optimize your resume
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* STATE: ANALYZING */}
                        {auditState === 'analyzing' && (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="max-w-md mx-auto text-center pt-10"
                            >
                                <div className="relative w-32 h-32 mx-auto mb-8">
                                    <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-800 rounded-full" />
                                    <motion.div
                                        className="absolute inset-0 border-4 border-t-purple-600 border-r-pink-600 border-b-transparent border-l-transparent rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FileText size={40} className="text-gray-400 animate-pulse" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Analyzing Resume...</h3>
                                <div className="space-y-2">
                                    <ScanningStep text="Extracting text layers..." delay={0} />
                                    <ScanningStep text="Checking ATS readability..." delay={1} />
                                    <ScanningStep text="Comparing with job description..." delay={2} />
                                    <ScanningStep text="Finding missing keywords..." delay={3} />
                                </div>
                            </motion.div>
                        )}

                        {/* STATE: RESULTS */}
                        {auditState === 'results' && analysis && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full"
                            >
                                {/* Scorecard */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                                    <div className="md:col-span-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center shadow-xl relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
                                        <h3 className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Current Score</h3>
                                        <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-100 dark:text-slate-800" />
                                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * analysis.score) / 100} className={`text-orange-500 transition-all duration-1000 ease-out`} />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-5xl font-black text-gray-900 dark:text-white">{analysis.score}</span>
                                                <span className="text-sm font-bold text-gray-400">/ 100</span>
                                            </div>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-sm font-bold ${analysis.score > 70 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'} mb-2`}>
                                            {analysis.score > 70 ? 'Good Start' : 'Needs Optimization'}
                                        </div>
                                    </div>

                                    <div className="md:col-span-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-xl">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Analysis Summary</h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                            {analysis.summary}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CheckCircle size={16} className="text-green-500" />
                                                    <span className="font-bold text-sm text-gray-900 dark:text-white">Keywords Found</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {analysis.keywords_found.map(k => (
                                                        <span key={k} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded font-medium">{k}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/30">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <AlertTriangle size={16} className="text-orange-500" />
                                                    <span className="font-bold text-sm text-gray-900 dark:text-white">Missing Keywords</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {analysis.keywords_missing.map(k => (
                                                        <span key={k} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs rounded font-medium">{k}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA: Optimize Resume */}
                                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-center text-white shadow-2xl mb-8">
                                    <Wand2 size={48} className="mx-auto mb-4" />
                                    <h3 className="text-3xl font-black mb-3">Want to Fix All These Issues?</h3>
                                    <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                                        Our AI will rewrite your resume sections, add missing keywords, fix formatting, and boost your ATS score to 90+
                                    </p>
                                    <button
                                        onClick={optimizeResume}
                                        className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-xl inline-flex items-center gap-2"
                                    >
                                        <Sparkles size={20} /> Optimize My Resume with AI
                                    </button>
                                </div>

                                {/* Issues */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            <AlertCircle className="text-red-500" /> Critical Issues
                                        </h3>
                                        {analysis.formatting_issues.map((issue, i) => (
                                            <div key={i} className="flex gap-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl">
                                                <X className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                                                <div>
                                                    <p className="text-gray-800 dark:text-gray-200 font-medium text-sm">{issue}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            <Sparkles className="text-purple-500" /> Suggested Improvements
                                        </h3>
                                        {analysis.improvements.map((imp, i) => (
                                            <div key={i} className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm">
                                                <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">{imp.section}</div>
                                                <p className="text-gray-700 dark:text-gray-300 text-sm">{imp.tip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STATE: OPTIMIZING */}
                        {auditState === 'optimizing' && (
                            <motion.div
                                key="optimizing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="max-w-md mx-auto text-center pt-10"
                            >
                                <div className="relative w-32 h-32 mx-auto mb-8">
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Wand2 size={64} className="text-purple-600 dark:text-purple-400 mx-auto" />
                                    </motion.div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">AI is Optimizing Your Resume...</h3>
                                <div className="space-y-2">
                                    <ScanningStep text="Rewriting experience bullets with metrics..." delay={0} />
                                    <ScanningStep text="Adding missing keywords naturally..." delay={1} />
                                    <ScanningStep text="Restructuring for ATS compatibility..." delay={2} />
                                    <ScanningStep text="Crafting achievement-focused summary..." delay={3} />
                                </div>
                            </motion.div>
                        )}

                        {/* STATE: OPTIMIZED */}
                        {auditState === 'optimized' && optimizedResume && (
                            <motion.div
                                key="optimized"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full"
                            >
                                {/* Score Improvement */}
                                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-center text-white shadow-2xl mb-8">
                                    <div className="flex items-center justify-center gap-8 mb-4">
                                        <div>
                                            <div className="text-5xl font-black">{analysis.score}</div>
                                            <div className="text-sm opacity-90">Before</div>
                                        </div>
                                        <ArrowRight size={32} />
                                        <div>
                                            <div className="text-6xl font-black">{optimizedResume.score}</div>
                                            <div className="text-sm opacity-90">After</div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">🎉 +{optimizedResume.score - analysis.score} Point Improvement!</h3>
                                    <p className="text-green-100">Your resume is now ATS-optimized and interview-ready</p>
                                </div>

                                {/* Optimized Content */}
                                <div className="grid grid-cols-1 gap-6">
                                    {/* Professional Summary */}
                                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">✨ Professional Summary</h3>
                                            <button
                                                onClick={() => copyToClipboard(optimizedResume.sections.summary)}
                                                className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-bold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all flex items-center gap-2"
                                            >
                                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                                {copied ? 'Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{optimizedResume.sections.summary}</p>
                                    </div>

                                    {/* Experience */}
                                    {optimizedResume.sections.experience.map((exp, i) => (
                                        <div key={i} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company} • {exp.duration}</p>
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(exp.bullets.join('\n'))}
                                                    className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-bold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all flex items-center gap-2"
                                                >
                                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                                </button>
                                            </div>
                                            <ul className="space-y-2">
                                                {exp.bullets.map((bullet, j) => (
                                                    <li key={j} className="flex gap-3 text-gray-700 dark:text-gray-300 text-sm">
                                                        <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}

                                    {/* Skills */}
                                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">🛠️ Skills (ATS-Optimized)</h3>
                                            <button
                                                onClick={() => copyToClipboard(JSON.stringify(optimizedResume.sections.skills, null, 2))}
                                                className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-bold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all flex items-center gap-2"
                                            >
                                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {Object.entries(optimizedResume.sections.skills).map(([category, skills]) => (
                                                <div key={category}>
                                                    <h4 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase mb-2">{category}</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {skills.map(skill => (
                                                            <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg">{skill}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Improvements Made */}
                                    <div className="bg-purple-50 dark:bg-purple-900/10 rounded-3xl p-6 border border-purple-100 dark:border-purple-900/30">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <CheckCircle className="text-green-500" /> What We Improved
                                        </h3>
                                        <ul className="space-y-2">
                                            {optimizedResume.improvements_made.map((improvement, i) => (
                                                <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300 text-sm">
                                                    <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span>{improvement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 flex gap-4 justify-center">
                                    <button
                                        onClick={() => setAuditState('idle')}
                                        className="px-6 py-3 bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-slate-700 transition-all"
                                    >
                                        Optimize Another Resume
                                    </button>
                                    <button
                                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
                                    >
                                        <Download size={20} /> Download Optimized Resume
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </main>
        </div>
    );
}

function ScanningStep({ text, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay * 0.8 }}
            className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm"
        >
            <CheckCircle size={14} className="text-green-500" /> {text}
        </motion.div>
    );
}

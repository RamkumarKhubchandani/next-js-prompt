"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/app/components/Header';
import { Upload, FileText, CheckCircle, AlertTriangle, ArrowRight, Loader2, Sparkles, AlertCircle, X, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResumeAuditPage() {
    const [auditState, setAuditState] = useState('idle'); // idle, uploading, analyzing, results
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            startAnalysis(selectedFile);
        }
    };

    const startAnalysis = async (file) => {
        setAuditState('analyzing');

        // Mock Analysis Delay to simulate "Deep AI Work"
        // In a real app, this would send formData to an API route that uses pdf-parse and OpenAI
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Mock Result Data - logic will be replaced by real AI later
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-slate-900 dark:text-white font-sans selection:bg-brand-primary/30">
            <Header />

            <main className="pt-24 pb-12 px-4 relative overflow-hidden min-h-screen">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] dark:opacity-[0.03] pointer-events-none" />
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

                <div className="max-w-5xl mx-auto relative z-10">

                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-4 border border-brand-primary/20"
                        >
                            <Sparkles size={12} /> AI-Powered Beta
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-slate-900 dark:text-white"
                        >
                            Is Your Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">ATS Proof?</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                        >
                            75% of resumes are rejected by automated systems before a human ever sees them. Get a free, instant audit with our L5-Level AI Analyst.
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
                                    className="group relative border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-primary bg-white dark:bg-dark-800/50 rounded-3xl p-12 text-center cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-dark-800"
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept=".pdf"
                                        className="hidden"
                                    />

                                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <Upload size={32} className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        Drop your resume (PDF) here
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                        or click to browse checks for ATS compatibility, keyword density, and red flags.
                                    </p>
                                    <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                                        <span className="flex items-center gap-1"><ShieldCheck size={12} /> Privacy First</span>
                                        <span className="flex items-center gap-1"><FileText size={12} /> PDF Only</span>
                                    </div>
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
                                        className="absolute inset-0 border-4 border-t-brand-primary border-r-brand-primary border-b-transparent border-l-transparent rounded-full"
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
                                    <ScanningStep text="Searching for 'Red Flags'..." delay={2} />
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
                                    <div className="md:col-span-4 bg-white dark:bg-dark-800 rounded-3xl p-8 border border-gray-200 dark:border-dark-700 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
                                        <h3 className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Overall Score</h3>
                                        <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-100 dark:text-dark-700" />
                                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * analysis.score) / 100} className={`text-brand-primary transition-all duration-1000 ease-out`} />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-5xl font-black text-gray-900 dark:text-white">{analysis.score}</span>
                                                <span className="text-sm font-bold text-gray-400">/ 100</span>
                                            </div>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-sm font-bold ${analysis.score > 70 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'} mb-2`}>
                                            {analysis.score > 70 ? 'Interview Ready' : 'Needs Work'}
                                        </div>
                                    </div>

                                    <div className="md:col-span-8 bg-white dark:bg-dark-800 rounded-3xl p-8 border border-gray-200 dark:border-dark-700 shadow-lg relative overflow-hidden">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Executive Summary</h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                            {analysis.summary}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gray-50 dark:bg-dark-900/50 p-4 rounded-xl border border-gray-100 dark:border-dark-700">
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

                                {/* Deep Dive Analysis */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            <AlertCircle className="text-red-500" /> Critical Formatting Issues
                                        </h3>
                                        {analysis.formatting_issues.map((issue, i) => (
                                            <div key={i} className="flex gap-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl">
                                                <X className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                                                <div>
                                                    <p className="text-gray-800 dark:text-gray-200 font-medium text-sm">{issue}</p>
                                                    <p className="text-xs text-gray-500 mt-1">This prevents ATS parsers from reading your data correct.</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            <Sparkles className="text-brand-primary" /> AI Suggested Improvements
                                        </h3>
                                        {analysis.improvements.map((imp, i) => (
                                            <div key={i} className="p-4 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl shadow-sm">
                                                <div className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-1">{imp.section}</div>
                                                <p className="text-gray-700 dark:text-gray-300 text-sm">{imp.tip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-12 text-center">
                                    <button
                                        onClick={() => setAuditState('idle')}
                                        className="bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
                                    >
                                        Upload Another Resume
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

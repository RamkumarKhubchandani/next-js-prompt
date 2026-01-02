"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Play, Loader2, RefreshCw, CheckCircle, AlertCircle, Volume2, Square, Briefcase, Code, Layers, Sparkles } from 'lucide-react';

const ROLES = [
    { id: 'frontend', label: 'Frontend Engineer', icon: Code },
    { id: 'backend', label: 'Backend Engineer', icon: Layers },
    { id: 'fullstack', label: 'Full Stack Engineer', icon: Briefcase }
];

const TECH_STACKS = {
    frontend: ['React', 'Angular', 'Vue.js', 'TypeScript', 'JavaScript', 'Next.js', 'CSS/HTML'],
    backend: ['Node.js', 'Python', 'Go', 'Java', 'SQL', 'MongoDB', 'System Design'],
    fullstack: ['React', 'Node.js', 'Next.js', 'TypeScript', 'SQL', 'MongoDB', 'System Design']
};

// Expanded Question Bank simulating AI generation based on context
// Expanded Question Bank simulating AI generation based on context
const QUESTION_BANK = {
    frontend: [
        {
            text: "Explain the virtual DOM in React and how it optimizes performance.",
            level: "L4",
            tags: ['React'],
            keywords: ['memory', 'copy', 'diff', 'reconciliation', 'batch', 'update', 'actual dom']
        },
        {
            text: "How would you optimize the critical rendering path for a content-heavy news site?",
            level: "L5",
            tags: ['Performance', 'CSS/HTML'],
            keywords: ['lazy load', 'minif', 'compress', 'critical css', 'render block', 'defer', 'script', 'image']
        },
        {
            text: "What are the trade-offs between Client-Side Rendering (CSR) and Server-Side Rendering (SSR)?",
            level: "L4",
            tags: ['Next.js', 'React'],
            keywords: ['seo', 'initial load', 'time to first byte', 'interactive', 'caching', 'server load']
        },
    ],
    backend: [
        {
            text: "Design a rate limiter for a high-traffic API. What algorithms would you use?",
            level: "L5",
            tags: ['System Design'],
            keywords: ['token bucket', 'leaky bucket', 'sliding window', 'redis', 'distributed', 'ip address']
        },
        {
            text: "Explain database normalization vs denormalization. When would you use each?",
            level: "L4",
            tags: ['SQL'],
            keywords: ['redundancy', 'duplicate', 'read heavy', 'write heavy', 'join', 'performance', 'integrity']
        },
        {
            text: "How does Node.js handle concurrency given it is single-threaded?",
            level: "L4",
            tags: ['Node.js'],
            keywords: ['event loop', 'libuv', 'non-blocking', 'async', 'callback', 'worker threads', 'thread pool']
        },
    ],
    fullstack: [
        {
            text: "Design a real-time chat application. Discuss both the frontend polling/sockets strategy and backend scaling.",
            level: "L5",
            tags: ['System Design', 'React', 'Node.js'],
            keywords: ['websocket', 'socket.io', 'polling', 'long polling', 'pub/sub', 'redis', 'load balancer', 'horizontal scaling']
        },
        {
            text: "How would you handle authentication and session management in a distributed microservices architecture?",
            level: "L5",
            tags: ['System Design'],
            keywords: ['jwt', 'json web token', 'stateless', 'oauth', 'redis', 'cookie', 'gateway', 'centralized']
        },
    ]
};

// ...



export default function VoiceInterviewer() {
    const [state, setState] = useState('setup'); // setup, idle, questioning, listening, processing, feedback
    const [config, setConfig] = useState({ role: null, tech: [] });
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [recognition, setRecognition] = useState(null);

    const synthRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthRef.current = window.speechSynthesis;
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'en-US';
                recognition.onresult = (e) => {
                    const t = Array.from(e.results).map(r => r[0].transcript).join('');
                    setTranscript(t);
                };
                setRecognition(recognition);
            }
        }
    }, []);

    const speak = (text) => {
        if (!synthRef.current) return;
        synthRef.current.cancel();
        const u = new SpeechSynthesisUtterance(text);
        const voices = synthRef.current.getVoices();
        const googleVoice = voices.find(v => v.name.includes('Google US English'));
        if (googleVoice) u.voice = googleVoice;
        synthRef.current.speak(u);
    };

    const handleRoleSelect = (roleId) => {
        setConfig(prev => ({ ...prev, role: roleId, tech: [] }));
    };

    const toggleTech = (tech) => {
        setConfig(prev => {
            const exists = prev.tech.includes(tech);
            return {
                ...prev,
                tech: exists ? prev.tech.filter(t => t !== tech) : [...prev.tech, tech]
            };
        });
    };

    const getQuestions = () => {
        // Simple logic to fetch questions based on role
        // In real app, this filters by selected tech tags too
        const pool = QUESTION_BANK[config.role] || QUESTION_BANK.fullstack;
        const relevant = pool.filter(q =>
            config.tech.some(t => q.tags.includes(t)) || q.tags.includes('System Design') || q.tags.includes('Performance')
        );
        return relevant.length > 0 ? relevant : pool;
    };

    const startSession = () => {
        if (!config.role || config.tech.length === 0) return;
        setState('idle');
        const questions = getQuestions();
        setActiveQuestion(questions[0]); // Start with first relevant question
    };

    const startInterview = (questionOrEvent) => {
        // Handle if called via onClick (valid event) or direct call (question object)
        let questionToAsk = activeQuestion;
        if (questionOrEvent && questionOrEvent.text) {
            questionToAsk = questionOrEvent;
        }

        setState('questioning');
        setTranscript('');
        setFeedback(null);
        setTimeout(() => {
            if (!questionToAsk) return;

            // Re-implement speak with callback
            const u = new SpeechSynthesisUtterance(questionToAsk.text);
            const voices = synthRef.current.getVoices();
            const googleVoice = voices.find(v => v.name.includes('Google US English'));
            if (googleVoice) u.voice = googleVoice;
            u.onend = () => startListening();
            synthRef.current.speak(u);

        }, 500);
    };

    const startListening = () => {
        if (recognition) {
            try { recognition.start(); } catch (e) { }
            setState('listening');
        }
    };

    const stopListening = () => {
        if (recognition) recognition.stop();
        setState('processing');
        // Mock Processing
        setTimeout(() => {
            generateFeedback();
        }, 2000);
    };

    const generateFeedback = () => {
        const lowerTranscript = transcript.toLowerCase();
        const keywords = activeQuestion.keywords || [];

        // 1. Check for Matches
        const found = keywords.filter(k => lowerTranscript.includes(k.toLowerCase()));
        const missing = keywords.filter(k => !lowerTranscript.includes(k.toLowerCase()));
        const matchPercentage = keywords.length > 0 ? found.length / keywords.length : 0;

        // 2. Calculate Score
        let score = 0;
        if (transcript.split(' ').length < 5) {
            score = 10; // Extremely short/nonsense
        } else {
            // Base score 20 + up to 80 based on keywords
            score = 20 + (matchPercentage * 80);
            // Cap at 98
            score = Math.min(98, Math.floor(score));
        }

        // 3. Construct Feedback String
        let summary = "";
        let strengths = [];
        let improvements = [];

        if (score < 30) {
            summary = "Your answer seems unrelated or too brief. Make sure to address the core technical concepts directly.";
            strengths = ["Attempted answer"];
            improvements = ["Focus on the question", `Include terms like: ${missing.slice(0, 3).join(', ')}`];
        } else if (matchPercentage < 0.4) {
            summary = `You missed key technical terms expected for a ${activeQuestion.level} role. Try to be more specific.`;
            strengths = ["Good flow", "General understanding"];
            improvements = [`Missing concepts: ${missing.slice(0, 3).join(', ')}`, "Deepen technical vocabulary"];
        } else {
            summary = `Strong answer! You correctly identified key components like ${found.slice(0, 3).join(', ')}. ${missing.length > 0 ? `To improve, mention: ${missing.slice(0, 2).join(', ')}.` : "Excellent depth."}`;
            strengths = [`Covered: ${found.slice(0, 3).join(', ')}`, "Solid technical understanding"];
            improvements = missing.length > 0 ? [`Add details on: ${missing[0]}`] : ["Discuss edge cases", "System scale"];
        }

        const feedbackData = {
            score,
            summary,
            strengths,
            improvements
        };

        setFeedback(feedbackData);
        setState('feedback');
        speak(feedbackData.summary);
    };

    const nextQuestion = () => {
        // Randomly pick next
        const questions = getQuestions();
        let next = questions[Math.floor(Math.random() * questions.length)];
        // Ensure we don't pick the same question if possible
        if (questions.length > 1 && next === activeQuestion) {
            const others = questions.filter(q => q !== activeQuestion);
            next = others[Math.floor(Math.random() * others.length)];
        }

        setActiveQuestion(next);
        // Important: Pass 'next' directly to avoid stale state closure issue
        startInterview(next);
    };

    if (state === 'setup') {
        return (
            <div className="w-full max-w-4xl mx-auto p-6 md:p-8 min-h-[600px] flex flex-col items-center justify-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-brand-primary/10 rounded-full mb-4">
                        <Sparkles className="text-brand-primary" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Configure Your Interview</h2>
                    <p className="text-gray-600 dark:text-gray-400">Select your target role and tech stack. We'll simulate a top-tier product company interview (L4-L6).</p>
                </motion.div>

                <div className="w-full max-w-2xl space-y-8">
                    {/* Role Selection */}
                    <div>
                        <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 block">Target Role</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {ROLES.map(role => {
                                const Icon = role.icon;
                                const isSelected = config.role === role.id;
                                return (
                                    <button
                                        key={role.id}
                                        onClick={() => handleRoleSelect(role.id)}
                                        className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${isSelected
                                            ? 'bg-brand-primary/20 border-brand-primary text-gray-900 dark:text-white shadow-lg shadow-brand-primary/20'
                                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 dark:bg-dark-800 dark:border-dark-700 dark:text-gray-400 dark:hover:bg-dark-700'
                                            }`}
                                    >
                                        <Icon size={24} />
                                        <span className="font-bold text-sm">{role.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tech Stack Selection */}
                    <AnimatePresence>
                        {config.role && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 block">
                                    Stack (Select all that apply)
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {TECH_STACKS[config.role].map(tech => (
                                        <button
                                            key={tech}
                                            onClick={() => toggleTech(tech)}
                                            className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${config.tech.includes(tech)
                                                ? 'bg-dark-900 text-white border-dark-900 dark:bg-white dark:text-black dark:border-white'
                                                : 'bg-transparent border-gray-300 text-gray-500 hover:border-gray-400 dark:border-dark-600 dark:text-gray-400 dark:hover:border-gray-400'
                                                }`}
                                        >
                                            {tech}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Start Button */}
                    <div className="pt-4 flex justify-center">
                        <button
                            onClick={startSession}
                            disabled={!config.role || config.tech.length === 0}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                        >
                            Start Mock Interview <Play size={18} fill="currentColor" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Existing Interface (Reused with activeQuestion)
    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 min-h-[600px] flex flex-col items-center justify-center relative">

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px] transition-all duration-1000 ${state === 'listening' ? 'scale-150 opacity-40' : 'scale-100 opacity-20'}`} />
            </div>

            {/* AI Avatar / Orb */}
            <div className="relative z-10 mb-12">
                <motion.div
                    animate={{
                        scale: state === 'questioning' ? [1, 1.1, 1] : state === 'listening' ? [1, 1.2, 1] : 1,
                        boxShadow: state === 'listening'
                            ? "0 0 50px 10px rgba(59, 130, 246, 0.5)"
                            : "0 0 20px 5px rgba(59, 130, 246, 0.2)"
                    }}
                    transition={{
                        duration: state === 'listening' ? 1.5 : 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={`w-32 h-32 rounded-full flex items-center justify-center border-4 backdrop-blur-md transition-colors duration-500
                        ${state === 'idle' ? 'bg-gray-100 border-gray-200 dark:bg-dark-800 dark:border-gray-700' : ''}
                        ${state === 'questioning' ? 'bg-blue-600/10 border-blue-500 dark:bg-blue-600/20' : ''}
                        ${state === 'listening' ? 'bg-red-500/10 border-red-500 dark:bg-red-500/20' : ''}
                        ${state === 'processing' ? 'bg-purple-600/10 border-purple-500 dark:bg-purple-600/20' : ''}
                        ${state === 'feedback' ? 'bg-green-600/10 border-green-500 dark:bg-green-600/20' : ''}
                    `}
                >
                    {state === 'idle' && <Volume2 size={48} className="text-gray-500" />}
                    {state === 'questioning' && <div className="space-y-1"><div className="w-16 h-1 bg-blue-400 rounded-full animate-pulse" /><div className="w-10 h-1 bg-blue-400 rounded-full animate-pulse mx-auto" /></div>}
                    {state === 'listening' && <Mic size={48} className="text-red-400 animate-pulse" />}
                    {state === 'processing' && <Loader2 size={48} className="text-purple-400 animate-spin" />}
                    {state === 'feedback' && <CheckCircle size={48} className="text-green-400" />}
                </motion.div>

                {/* Status Label */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="bg-white/80 dark:bg-dark-800/80 border border-gray-200 dark:border-dark-700 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-light-300">
                        {state === 'idle' && 'AI Ready'}
                        {state === 'questioning' && 'Interviewer Speaking...'}
                        {state === 'listening' && 'Listening...'}
                        {state === 'processing' && 'Analyzing Answer...'}
                        {state === 'feedback' && 'Feedback Ready'}
                    </span>
                </div>
            </div>

            {/* Interaction Area */}
            <div className="w-full max-w-2xl bg-white/50 dark:bg-dark-800/50 backdrop-blur-xl border border-gray-200 dark:border-dark-700 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 transition-all">

                {/* Question Section */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="text-[10px] font-bold uppercase bg-brand-primary/10 text-brand-primary px-2 py-1 rounded">
                            {activeQuestion?.level || 'L4'} Question
                        </span>
                        {activeQuestion?.tags && activeQuestion.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold uppercase bg-gray-200 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 px-2 py-1 rounded border border-gray-300 dark:border-gray-600">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                        {state === 'idle' ? "Ready for your interview?" : activeQuestion?.text}
                    </h3>
                </div>

                {/* Transcript Area (Real-time) */}
                {(state === 'listening' || state === 'processing' || state === 'feedback') && (
                    <div className="mb-8 p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 min-h-[100px] max-h-[200px] overflow-y-auto">
                        <p className="text-gray-700 dark:text-gray-300 font-mono text-sm leading-relaxed">
                            {transcript || <span className="text-gray-400 dark:text-gray-600 italic">Listening for your answer... speak clearly...</span>}
                        </p>
                    </div>
                )}

                {/* Feedback Report */}
                <AnimatePresence>
                    {state === 'feedback' && feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/80 dark:bg-dark-900/80 rounded-xl p-6 border border-gray-200 dark:border-dark-600 mb-8"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-gray-900 dark:text-white">AI Analysis</h4>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${feedback.score >= 70 ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'}`}>
                                    Score: {feedback.score}/100
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed border-l-2 border-brand-primary pl-4">
                                {feedback.summary}
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <div className="font-bold text-green-600 dark:text-green-400 mb-2 flex items-center gap-1"><CheckCircle size={10} /> Strengths</div>
                                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                        {feedback.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <div className="font-bold text-orange-600 dark:text-orange-400 mb-2 flex items-center gap-1"><AlertCircle size={10} /> Improvements</div>
                                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                        {feedback.improvements.map((s, i) => <li key={i}>• {s}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                    {state === 'idle' && (
                        <button
                            onClick={startInterview}
                            className="flex items-center gap-2 bg-brand-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-brand-primary/20 transition-all hover:scale-105"
                        >
                            <Play size={18} fill="currentColor" /> Start Interview
                        </button>
                    )}

                    {state === 'listening' && (
                        <button
                            onClick={stopListening}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-red-500/20 transition-all hover:scale-105 animate-pulse"
                        >
                            <Square size={18} fill="currentColor" /> I'm Done Speaking
                        </button>
                    )}

                    {state === 'feedback' && (
                        <div className="flex gap-3">
                            <button
                                onClick={startInterview}
                                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-dark-700 dark:hover:bg-dark-600 dark:text-white px-6 py-3 rounded-full font-semibold transition-all"
                            >
                                <RefreshCw size={18} /> Retry Question
                            </button>
                            <button
                                onClick={nextQuestion}
                                className="flex items-center gap-2 bg-brand-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-brand-primary/20 transition-all hover:scale-105"
                            >
                                Next Question <Play size={18} fill="currentColor" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={() => setState('setup')}
                className="mt-8 text-xs text-center text-gray-500 hover:text-white underline transition-colors"
            >
                Change Configuration
            </button>
        </div>
    );
}

"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Play, Loader2, RefreshCw, CheckCircle, AlertCircle, Volume2, Square, Briefcase, Code, Layers, Sparkles, Video, VideoOff } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Webcam = dynamic(() => import('react-webcam'), { ssr: false });

const ROLES = [
    { id: 'frontend', label: 'Frontend Engineer', icon: Code },
    { id: 'backend', label: 'Backend Engineer', icon: Layers },
    { id: 'fullstack', label: 'Full Stack Engineer', icon: Briefcase }
];

const COMPANIES = [
    { id: 'google', label: 'Google', color: 'from-blue-500 to-red-500', focus: "Scalability & Edge Cases" },
    { id: 'amazon', label: 'Amazon', color: 'from-orange-500 to-yellow-500', focus: "Leadership Principles" },
    { id: 'meta', label: 'Meta', color: 'from-blue-400 to-blue-600', focus: "Move Fast & Product Sense" },
    { id: 'generic', label: 'Generic', color: 'from-gray-500 to-gray-700', focus: "Standard Assessment" }
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
    const [config, setConfig] = useState({ role: null, tech: [], company: 'generic' });
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
        // Insider Mode: In a real app, we would filter or fetch specific company questions here.
        // For now, we will just use the pool but the feedback will be customized.
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

        const company = COMPANIES.find(c => c.id === config.company) || COMPANIES[3];
        const prefix = config.company !== 'generic' ? `[${company.label} Mode]: ` : "";

        if (score < 30) {
            summary = `${prefix}Your answer seems unrelated or too brief. Make sure to address the core technical concepts directly.`;
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

                    {/* Company Selection (Insider Mode) */}
                    <AnimatePresence>
                        {config.role && config.tech.length > 0 && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 block flex justify-between">
                                    <span>Target Company (Insider Mode)</span>
                                    <span className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full">PRO Feature</span>
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {COMPANIES.map(company => (
                                        <button
                                            key={company.id}
                                            onClick={() => setConfig(prev => ({ ...prev, company: company.id }))}
                                            className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all relative overflow-hidden ${config.company === company.id
                                                ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white ring-2 ring-brand-primary ring-offset-2 dark:ring-offset-black'
                                                : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 dark:bg-dark-800 dark:border-dark-700 dark:text-gray-400 dark:hover:bg-dark-700'
                                                }`}
                                        >
                                            <span className={`font-bold text-sm ${config.company === company.id ? 'text-transparent bg-clip-text bg-gradient-to-r ' + company.color : ''}`}>
                                                {company.label}
                                            </span>
                                            <span className="text-[10px] opacity-70 text-center leading-tight">{company.focus}</span>
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


    // Active Interview Interface - Video Call Style
    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-6 min-h-[600px] flex flex-col gap-6">

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">

                {/* AI Interviewer Feed */}
                <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 ring-1 ring-white/10 group">
                    <Image
                        src="/ai-interviewer.png"
                        alt="AI Interviewer"
                        fill
                        className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Speaking Indicator / Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Status Visualizer */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${state === 'questioning'
                                ? 'bg-blue-500/20 border-blue-400 animate-pulse ring-2 ring-blue-500/40'
                                : 'bg-white/10 border-white/20'
                                }`}>
                                {state === 'questioning' ? <Volume2 size={20} className="text-blue-400" /> : <div className="w-3 h-3 bg-green-500 rounded-full" />}
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm leading-none mb-1">Sarah (AI Interviewer)</h3>
                                <p className="text-blue-300 text-[10px] font-mono uppercase tracking-wider flex items-center gap-2">
                                    {state === 'questioning' ? 'Speaking...' : state === 'listening' ? 'Listening...' : 'Online'}
                                    {config.company !== 'generic' && (
                                        <span className="bg-white/10 px-1 rounded text-[8px] text-white/80 border border-white/10">{COMPANIES.find(c => c.id === config.company)?.label} Mode</span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Orb mini-visualizer */}
                        {state === 'questioning' && (
                            <div className="flex gap-1 h-4 items-end">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [4, 16, 4] }}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                        className="w-1 bg-blue-400 rounded-full"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* User Feed (Webcam) */}
                <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 ring-1 ring-white/10">
                    <Webcam
                        audio={false}
                        className="w-full h-full object-cover mirror-mode" // Add mirror class if needed in global css or styled component
                        mirrored={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${state === 'listening'
                            ? 'bg-red-500/20 border-red-400 animate-pulse ring-2 ring-red-500/40'
                            : 'bg-white/10 border-white/20'
                            }`}>
                            {state === 'listening' ? <Mic size={20} className="text-red-400" /> : <MicOff size={20} className="text-gray-400" />}
                        </div>
                        <h3 className="text-white font-bold text-sm">You</h3>
                    </div>
                </div>

            </div>

            {/* Interaction / Question Panel - Below Video */}
            <div className="w-full bg-white dark:bg-dark-800/80 backdrop-blur-xl border border-gray-200 dark:border-dark-700 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center transition-all bg-opacity-90">
                {/* Active Question Display */}
                <div className="mb-6 max-w-3xl">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold mb-3 uppercase tracking-wider">
                        {activeQuestion?.level || 'L4'} Question
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-relaxed">
                        "{activeQuestion?.text}"
                    </h2>
                </div>

                {/* Controls Bar */}
                <div className="flex items-center gap-4">
                    {state === 'idle' && (
                        <button
                            onClick={startInterview}
                            className="flex items-center gap-2 bg-brand-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-brand-primary/20 transition-all hover:scale-105"
                        >
                            <Play size={18} fill="currentColor" /> Begin Session
                        </button>
                    )}

                    {state === 'listening' && (
                        <button
                            onClick={stopListening}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-red-500/20 transition-all hover:scale-105 animate-pulse"
                        >
                            <Square size={18} fill="currentColor" /> Stop Recording
                        </button>
                    )}

                    {state === 'feedback' && (
                        <div className="flex gap-3">
                            <button
                                onClick={startInterview}
                                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-dark-700 dark:hover:bg-dark-600 dark:text-white px-6 py-3 rounded-full font-semibold transition-all"
                            >
                                <RefreshCw size={18} /> Retry
                            </button>
                            <button
                                onClick={nextQuestion}
                                className="flex items-center gap-2 bg-brand-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-brand-primary/20 transition-all hover:scale-105"
                            >
                                Next <Play size={18} fill="currentColor" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Feedback Overlay - Animated Pop-up */}
                <AnimatePresence>
                    {state === 'feedback' && feedback && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                            className="w-full max-w-4xl text-left bg-gray-50 dark:bg-black/40 rounded-xl p-6 border border-gray-200 dark:border-white/5 overflow-hidden"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <Sparkles size={20} className="text-brand-primary" />
                                <h4 className="font-bold text-gray-900 dark:text-white">Live Feedback Analysis</h4>
                                <div className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${feedback.score >= 70 ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'}`}>
                                    Score: {feedback.score}/100
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                                {feedback.summary}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                <div className="space-y-1">
                                    <div className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1"><CheckCircle size={10} /> Good Points</div>
                                    {feedback.strengths.map((s, i) => <div key={i} className="text-gray-500 dark:text-gray-400 pl-4 border-l border-gray-300 dark:border-gray-700">{s}</div>)}
                                </div>
                                <div className="space-y-1">
                                    <div className="font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1"><AlertCircle size={10} /> Needs Work</div>
                                    {feedback.improvements.map((s, i) => <div key={i} className="text-gray-500 dark:text-gray-400 pl-4 border-l border-gray-300 dark:border-gray-700">{s}</div>)}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Live Transcript (Subtitle style) */}
            {(state === 'listening' || state === 'processing') && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur px-6 py-3 rounded-full border border-white/10 max-w-2xl text-center z-50 shadow-2xl">
                    <p className="text-white font-medium text-lg animate-fade-in transition-all">
                        {transcript || <span className="opacity-50 italic">Listening...</span>}
                    </p>
                </div>
            )}

            <button
                onClick={() => setState('setup')}
                className="text-xs text-center text-gray-400 hover:text-gray-900 dark:hover:text-white underline transition-colors"
            >
                End Session & Reconfigure
            </button>
        </div>
    );
}

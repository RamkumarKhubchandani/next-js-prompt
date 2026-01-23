"use client";
import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "../components/ui/Input";
import { getQuestionsForTech } from "../lib/ai";
import { Check, X, ChevronRight, ChevronLeft, Award, code, Terminal, Cpu, Layers, Database, Globe, Box, Hash, Lock, Sparkles, BookOpen, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const steps = [
    { id: 'lead-capture' },
    { id: 'tech-selection' },
    { id: 'quiz' },
    { id: 'results' },
];

// --- Sub-components for Icons ---
const TechIcon = ({ name, className }) => {
    switch (name) {
        case "React": return <span className={className}>⚛️</span>;
        case "Angular": return <span className={className}>🅰️</span>;
        case "Vue": return <span className={className}>💚</span>;
        case "Node.js": return <span className={className}>🟢</span>;
        case "Python": return <span className={className}>🐍</span>;
        case "TypeScript": return <span className={className}>📘</span>;
        case "JavaScript": return <span className={className}>🟨</span>;
        case "MongoDB": return <span className={className}>🍃</span>;
        case "Redux": return <span className={className}>🔄</span>;
        default: return <Terminal className={className} />;
    }
};

const LeadCaptureStep = ({ onNext, defaults }) => {
    const { data: session } = useSession();
    const [name, setName] = useState(defaults?.name || '');
    const [email, setEmail] = useState(defaults?.email || '');
    const [phone, setPhone] = useState(defaults?.phone || '');

    useEffect(() => {
        if (!defaults) return;
        setName(prev => prev || defaults.name || '');
        setEmail(prev => prev || defaults.email || '');
        setPhone(prev => prev || defaults.phone || '');
    }, [defaults]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ name, email, phone });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md mx-auto"
        >
            <div className="text-center mb-10">
                <span className="inline-block p-3 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-purple-600/20 mb-4 border border-brand-primary/10">
                    <Terminal className="w-8 h-8 text-brand-primary" />
                </span>
                <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">
                    Identity Verification
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Initialize session to access the technical assessment.
                </p>
            </div>

            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl space-y-6">

                {/* Login Nudge for Guests */}
                {!session && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-500/20 rounded-xl p-4 flex gap-4 items-start"
                    >
                        <div className="bg-orange-100 dark:bg-orange-500/20 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Not Logged In</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                                Your assessment score will <strong>not</strong> be saved to your public profile. Create a free account to track your progress.
                            </p>
                            <Link href="/login" className="inline-block mt-3 text-xs font-bold text-brand-primary hover:underline">
                                Login or Create Account &rarr;
                            </Link>
                        </div>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1 mb-2 block">Full Name</label>
                            <Input className="bg-white/50 dark:bg-black/20 border-gray-200 dark:border-white/10 h-12" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1 mb-2 block">Work Email</label>
                            <Input className="bg-white/50 dark:bg-black/20 border-gray-200 dark:border-white/10 h-12" type="email" placeholder="john@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1 mb-2 block">Phone</label>
                            <Input className="bg-white/50 dark:bg-black/20 border-gray-200 dark:border-white/10 h-12" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full mt-6 rounded-xl bg-gradient-to-r from-brand-primary to-purple-600 text-white shadow-lg shadow-brand-primary/25 h-12 font-bold text-lg flex items-center justify-center gap-2"
                    >
                        {session ? "Begin Assessment" : "Continue as Guest"} <ChevronRight className="w-5 h-5" />
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

const technologies = [
    { name: "JavaScript", desc: "Core Language" },
    { name: "TypeScript", desc: "Static Typing" },
    { name: "React", desc: "UI Library" },
    { name: "Angular", desc: "Framework" },
    { name: "Vue", desc: "Progressive FW" },
    { name: "Node.js", desc: "Runtime" },
    { name: "MongoDB", desc: "NoSQL Database" },
    { name: "Python", desc: "Backend & AI" },
    { name: "Redux", desc: "State Mgmt" },
];

const TechSelectionStep = ({ onNext, onPrev }) => {
    const [selectedTechs, setSelectedTechs] = useState([]);

    const toggleTech = (techName) => {
        setSelectedTechs(prev =>
            prev.includes(techName) ? prev.filter(t => t !== techName) : [...prev, techName]
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Select Competency Areas</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Choose the technologies you wish to be evaluated on.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
                {technologies.map(tech => {
                    const isSelected = selectedTechs.includes(tech.name);
                    return (
                        <motion.button
                            key={tech.name}
                            onClick={() => toggleTech(tech.name)}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                                relative overflow-hidden group p-6 rounded-2xl border transition-all duration-300
                                ${isSelected
                                    ? "bg-brand-primary/10 border-brand-primary dark:border-brand-primary shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.2)]"
                                    : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-brand-primary/50"}
                            `}
                        >
                            <div className="relative z-10 flex flex-col items-center gap-3">
                                <TechIcon name={tech.name} className="text-4xl filter drop-shadow-lg" />
                                <div className="text-center">
                                    <h3 className={`font-bold text-lg ${isSelected ? "text-brand-primary" : "text-gray-700 dark:text-gray-200"}`}>{tech.name}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium opacity-80">{tech.desc}</p>
                                </div>
                            </div>
                            {isSelected && (
                                <div className="absolute top-3 right-3 text-brand-primary">
                                    <div className="bg-brand-primary rounded-full p-1 text-white shadow-sm">
                                        <Check className="w-3 h-3" strokeWidth={4} />
                                    </div>
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <div className="flex justify-center gap-4">
                <motion.button
                    onClick={onPrev}
                    className="px-8 py-3 rounded-xl font-bold bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                    Back
                </motion.button>
                <motion.button
                    onClick={() => onNext(selectedTechs)}
                    disabled={selectedTechs.length === 0}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-3 rounded-xl font-bold bg-brand-primary text-white shadow-lg shadow-brand-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Start Assessment
                </motion.button>
            </div>
        </motion.div>
    );
};

const QuizStep = ({ questions, onFinish, onPrev }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Progress calculation
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (optionIndex) => {
        if (isAnswered) return;
        setSelectedOption(optionIndex);
        setIsAnswered(true);
        const isCorrect = optionIndex === currentQuestion.answer;

        const newAnswers = [...answers, {
            question: currentQuestion.question,
            answer: currentQuestion.options[optionIndex],
            correctAnswer: currentQuestion.options[currentQuestion.answer],
            explanation: currentQuestion.explanation,
            technology: currentQuestion.technology,
            isCorrect
        }];

        // Slight delay to show result before moving
        setTimeout(() => {
            setAnswers(newAnswers);
            setIsAnswered(false);
            setSelectedOption(null);
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                const finalScore = newAnswers.filter(a => a.isCorrect).length;
                onFinish(finalScore, newAnswers);
            }
        }, 1200);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-4xl mx-auto"
        >
            {/* Header / Progress */}
            <div className="mb-8 p-6 bg-white dark:bg-black/30 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Question {currentQuestionIndex + 1} / {questions.length}</span>
                    <span className="flex items-center gap-2 text-sm font-bold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">
                        <TechIcon name={currentQuestion.technology} className="text-base" />
                        {currentQuestion.technology}
                    </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-brand-primary shadow-[0_0_10px_rgba(var(--brand-primary-rgb),0.5)]"
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="relative">
                {/* Glow effect behind */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-10 blur-2xl pointer-events-none" />

                <div className="relative bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option, index) => {
                            const isSelected = selectedOption === index;
                            const isCorrect = currentQuestion.answer === index;
                            let stateClass = "border-gray-200 dark:border-white/10 hover:border-brand-primary/50 hover:bg-gray-50 dark:hover:bg-white/5"; // default

                            if (isAnswered) {
                                if (isCorrect) stateClass = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-300";
                                else if (isSelected) stateClass = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300";
                                else if (index === currentQuestion.answer && isSelected) stateClass = "border-green-500 bg-green-500/10"; // show correct if wrong picked? optional
                            } else if (isSelected) {
                                stateClass = "border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary";
                            }

                            return (
                                <motion.button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    whileHover={!isAnswered ? { scale: 1.01, x: 4 } : {}}
                                    whileTap={!isAnswered ? { scale: 0.99 } : {}}
                                    disabled={isAnswered}
                                    className={`
                                        w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                                        ${stateClass}
                                    `}
                                >
                                    <span className="font-medium text-lg text-gray-700 dark:text-gray-200">{option}</span>
                                    {isAnswered && isCorrect && <Check className="text-green-500 w-6 h-6" />}
                                    {isAnswered && isSelected && !isCorrect && <X className="text-red-500 w-6 h-6" />}
                                    {!isAnswered && <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-brand-primary transition-colors" />}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ResultsStep = ({ score, total, technologies }) => {
    const { data: session } = useSession();
    const [analyzing, setAnalyzing] = useState(true);
    const percentage = Math.round((score / total) * 100);
    const isPassing = percentage >= 70;

    useEffect(() => {
        // Simulate AI analysis delay
        const timer = setTimeout(() => {
            setAnalyzing(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // Smart Course Recommendation Logic
    const getTechRecommendation = () => {
        const tech = technologies.length > 0 ? technologies[0] : 'General';

        switch (tech) {
            case 'React': return { name: 'Use Cases for React', path: '/blogs/use-cases-react' };
            case 'Angular': return { name: 'Zoneless Angular Mastery', path: '/blogs/zoneless-angular' };
            case 'Node.js': return { name: 'Node.js Performance', path: '/blogs/node-native-sqlite' };
            case 'JavaScript': return { name: 'JavaScript Pipeline Operator', path: '/blogs/javascript-pipeline-operator' };
            case 'Vue': return { name: 'Vue 3 Deep Dive', path: '/blogs/vue3-deep-dive' };
            case 'Python': return { name: 'Python for AI', path: '/blogs/python-ai' };
            default: return { name: 'Advanced JavaScript Patterns', path: '/blogs/pattern-matching-js' };
        }
    };

    const techRec = getTechRecommendation();
    const systemDesignRec = { name: 'System Design Interview Guide', path: '/blogs/micro-frontends-2' };

    if (analyzing) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-20 text-center"
            >
                <div className="relative w-24 h-24 mb-8">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full rounded-full border-t-4 border-l-4 border-brand-primary"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-brand-primary animate-pulse" />
                    </div>
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Analyzing Performance...</h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md">
                    Our AI is reviewing your answers and generating a personalized learning path.
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl mx-auto text-center"
        >
            <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2rem] p-12 shadow-2xl relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Assessment Report</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">Technical Proficiency Analysis</p>

                <div className="relative w-64 h-64 mx-auto mb-12">
                    {/* Ring Background */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="128"
                            cy="128"
                            r="120"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-gray-100 dark:text-white/5"
                        />
                        <motion.circle
                            initial={{ strokeDashoffset: 753 }}
                            animate={{ strokeDashoffset: 753 - (753 * percentage) / 100 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            cx="128"
                            cy="128"
                            r="120"
                            stroke="url(#gradient)"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray="753"
                            strokeLinecap="round"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter">{percentage}%</span>
                        <span className={`text-sm font-bold uppercase tracking-widest mt-2 ${isPassing ? 'text-green-500' : 'text-orange-500'}`}>
                            {isPassing ? 'Proficient' : 'Needs Work'}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                        <div className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Correct Answers</div>
                        <div className="text-2xl font-black text-gray-900 dark:text-white">{score} <span className="text-base text-gray-400 font-normal">/ {total}</span></div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                        <div className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Evaluation Time</div>
                        <div className="text-2xl font-black text-gray-900 dark:text-white">~{Math.ceil(total * 0.8)}m</div>
                    </div>
                </div>

                {/* Dual Recommendations */}
                <div className="text-left mb-8">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-brand-primary" /> Recommended Learning Path
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 1. Tech Specific */}
                        <Link href={techRec.path} className="group block p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-100 dark:border-white/10 hover:shadow-md transition-all">
                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 block">Part 1: Tech Mastery</span>
                            <h5 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{techRec.name}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">Start Tutorial <ChevronRight className="w-4 h-4" /></span>
                        </Link>

                        {/* 2. System Design */}
                        <Link href={systemDesignRec.path} className="group block p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-100 dark:border-white/10 hover:shadow-md transition-all">
                            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2 block">Part 2: Architecture</span>
                            <h5 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{systemDesignRec.name}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">Start Guide <ChevronRight className="w-4 h-4" /></span>
                        </Link>
                    </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-lg mx-auto text-sm">
                    {isPassing
                        ? (
                            <>
                                <strong>Great job!</strong> You have strong potential. To truly stand out for Senior roles, mastering <strong>System Design</strong> alongside {technologies.length > 0 ? technologies[0] : 'your tech stack'} is key. Let's discuss how to elevate your expertise in a brief 1:1 session.
                            </>
                        )
                        : "Good effort. We identified some foundational gaps that we can address with a targeted learning roadmap. Let's review them together."}
                </p>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3 max-w-lg mx-auto text-sm">
                    Want a detailed breakdown of <em>why</em> you missed certain questions?
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-brand-primary to-purple-600 text-white font-bold text-lg py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                    onClick={() => {
                        const techList = Array.isArray(technologies) ? technologies.join(', ') : '';
                        const notes = `AI Assessment Result\n\nTechnologies: ${techList}\nScore: ${score}/${total} (${percentage}%)\n\nRecommended Path: ${techRec.name} + System Design\n\nWhat I want help with:\n- Detailed breakdown of my wrong answers\n- Personalized roadmap based on my gaps\n- Career guidance from a Senior Engineer\n\n`;
                        try {
                            window.dispatchEvent(new CustomEvent('open-connect-modal-global', {
                                detail: {
                                    headline: 'Review Results with a Mentor',
                                    subhead: 'Book a 100% FREE 1:1 session to review your wrong answers and build a growth plan.',
                                    ctaLabel: 'Book Free Session',
                                    defaultNotes: notes,
                                }
                            }));
                        } catch { }
                    }}
                >
                    <PhoneCall className="w-5 h-5" />
                    Book Free 1:1 Mentor Call
                </motion.button>

                <p className="mt-4 text-xs text-center text-gray-400">
                    * Limited spots available for free mentorship.
                </p>
            </div>
        </motion.div>
    );
};

export default function AiQuizPage() {
    const { data: session } = useSession();
    const [currentStep, setCurrentStep] = useState(0);
    const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);

    // Prefill lead-capture details
    useEffect(() => {
        if (!session?.user) return;
        setUserData(prev => ({
            name: prev.name || session.user.name || session.user.username || '',
            email: prev.email || session.user.email || '',
            phone: prev.phone || prev.phone
        }));

        (async () => {
            try {
                const res = await fetch('/api/user/settings');
                if (!res.ok) return;
                const data = await res.json();
                const cc = String(data?.phone?.countryCode || '').trim();
                const num = String(data?.phone?.number || '').trim();
                const formatted = [cc, num].filter(Boolean).join(' ').trim();
                if (!formatted) return;
                setUserData(prev => ({ ...prev, phone: prev.phone || formatted }));
            } catch { }
        })();
    }, [session?.user]);

    const goNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const goPrev = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleUserData = (data) => {
        setUserData(data);
        goNext();
    };

    const handleStartQuiz = (techs) => {
        setSelectedTechs(techs);
        setQuestions(getQuestionsForTech(techs));
        goNext();
    };

    const handleFinishQuiz = async (finalScore, finalAnswers) => {
        setScore(finalScore);
        setAnswers(finalAnswers);

        const resultData = {
            ...userData,
            username: session?.user?.username,
            technologies: selectedTechs,
            score: finalScore,
            total: questions.length,
            answers: finalAnswers,
        };

        try {
            await fetch('/api/quiz-results', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resultData),
            });
        } catch (error) {
            console.error("Failed to save quiz results:", error);
        }

        goNext();
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-dark-900 dark:bg-[#050505] dark:text-light-100 overflow-hidden relative">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]" />
            </div>

            <Header />
            <main className="flex-1 relative z-10 flex flex-col justify-center py-20">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        {steps[currentStep].id === 'lead-capture' && (
                            <motion.div key="lead" className="w-full">
                                <LeadCaptureStep onNext={handleUserData} defaults={userData} />
                            </motion.div>
                        )}
                        {steps[currentStep].id === 'tech-selection' && (
                            <motion.div key="tech" className="w-full">
                                <TechSelectionStep onNext={handleStartQuiz} onPrev={goPrev} />
                            </motion.div>
                        )}
                        {steps[currentStep].id === 'quiz' && (
                            <motion.div key="quiz" className="w-full">
                                <QuizStep questions={questions} onFinish={handleFinishQuiz} onPrev={goPrev} />
                            </motion.div>
                        )}
                        {steps[currentStep].id === 'results' && (
                            <motion.div key="results" className="w-full">
                                <ResultsStep score={score} total={questions.length} technologies={selectedTechs} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
            <Footer />
        </div>
    );
}

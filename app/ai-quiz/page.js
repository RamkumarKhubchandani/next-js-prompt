"use client";
import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "../components/ui/Input";
import { getQuestionsForTech } from "../lib/ai";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const steps = [
    { id: 'lead-capture' },
    { id: 'tech-selection' },
    { id: 'quiz' },
    { id: 'results' },
];

const LeadCaptureStep = ({ onNext, defaults }) => {
    const [name, setName] = useState(defaults?.name || '');
    const [email, setEmail] = useState(defaults?.email || '');
    const [phone, setPhone] = useState(defaults?.phone || '');

    useEffect(() => {
        if (!defaults) return;
        setName(prev => prev || defaults.name || '');
        setEmail(prev => prev || defaults.email || '');
        setPhone(prev => prev || defaults.phone || '');
    }, [defaults?.name, defaults?.email, defaults?.phone]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ name, email, phone });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <h2 className="text-3xl font-bold text-dark-900 dark:text-light-100">Let's Get Started</h2>
            <p className="mt-2 text-dark-900/70 dark:text-light-200">First, tell us a little about yourself.</p>
            <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto space-y-4">
                <Input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input type="tel" placeholder="Your Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full mt-4 rounded-full bg-brand-primary px-8 py-3 text-base font-semibold text-dark-900"
                >
                    Next
                </motion.button>
            </form>
        </motion.div>
    );
};

const technologies = [
    { name: "JavaScript", logo: "/logos/javascript.svg" },
    { name: "TypeScript", logo: "/logos/typescript.svg" },
    { name: "React", logo: "/logos/react.svg" },
    { name: "Angular", logo: "/logos/angular.svg" },
    { name: "Vue", logo: "/logos/vue.svg" },
    { name: "Node.js", logo: "/logos/nodejs.svg" },
    { name: "MongoDB", logo: "/logos/mongodb.svg" },
    { name: "Python", logo: "/logos/python.svg" },
    { name: "Redux", logo: "/logos/redux.svg" },
];

const TechSelectionStep = ({ onNext, onPrev }) => {
    const [selectedTechs, setSelectedTechs] = useState([]);
    const toggleTech = (techName) => {
        setSelectedTechs(prev =>
            prev.includes(techName)
                ? prev.filter(t => t !== techName)
                : [...prev, techName]
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <h2 className="text-3xl font-bold text-dark-900 dark:text-light-100">Choose Your Arena</h2>
            <p className="mt-2 text-dark-900/70 dark:text-light-200">Select the technologies you want to be assessed on.</p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                {technologies.map(tech => (
                    <motion.div
                        key={tech.name}
                        onClick={() => toggleTech(tech.name)}
                        whileHover={{ scale: 1.05 }}
                        animate={{
                            borderColor: selectedTechs.includes(tech.name) ? "rgba(0, 245, 160, 1)" : "rgba(58, 58, 58, 1)",
                            boxShadow: selectedTechs.includes(tech.name) ? "0 0 15px rgba(0, 245, 160, 0.5)" : "none",
                        }}
                        className="p-6 bg-white/70 dark:bg-dark-800 border border-dark-700/10 dark:border-dark-700 rounded-lg cursor-pointer text-center backdrop-blur-lg"
                    >
                        <img src={tech.logo} alt={tech.name} className="h-12 w-12 mx-auto" />
                        <p className="mt-4 font-semibold text-dark-900 dark:text-light-100">{tech.name}</p>
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-between mt-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onPrev}
                    className="w-1/2 mr-2 rounded-full bg-dark-900/5 dark:bg-dark-700 px-8 py-3 text-base font-semibold text-dark-900 dark:text-light-100 border border-dark-700/10 dark:border-dark-600 hover:bg-dark-900/10 dark:hover:bg-dark-600 transition-colors"
                >
                    Back
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNext(selectedTechs)}
                    disabled={selectedTechs.length === 0}
                    className="w-1/2 ml-2 rounded-full bg-brand-primary px-8 py-3 text-base font-semibold text-dark-900 disabled:bg-gray-500"
                >
                    Start Quiz
                </motion.button>
            </div>
        </motion.div>
    );
};

const QuizStep = ({ questions, onFinish, onPrev }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]); // This was the missing piece
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (optionIndex) => {
        if (isAnswered) return;
        setSelectedOption(optionIndex);
        setIsAnswered(true);
        const isCorrect = optionIndex === currentQuestion.answer;
        
        const newAnswers = [...answers, { 
            question: currentQuestion.question, 
            answer: currentQuestion.options[optionIndex], // user's answer
            correctAnswer: currentQuestion.options[currentQuestion.answer],
            explanation: currentQuestion.explanation,
            technology: currentQuestion.technology,
            isCorrect
        }];

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
        }, 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <p className="text-dark-900/70 dark:text-light-200">Question {currentQuestionIndex + 1} of {questions.length}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-dark-900 dark:text-light-100 my-6">{currentQuestion.question}</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrect = currentQuestion.answer === index;
                    return (
                        <motion.button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            whileHover={{ scale: 1.05 }}
                            className={`p-4 border rounded-lg text-left transition-all duration-300 ${
                                isAnswered && isCorrect && isSelected ? 'bg-green-500 border-green-400' :
                                isAnswered && !isCorrect && isSelected ? 'bg-red-500 border-red-400' :
                                'bg-white/70 border-dark-700/10 hover:bg-dark-900/5 dark:bg-dark-800 dark:border-dark-700 dark:hover:bg-dark-700 backdrop-blur-lg'
                            }`}
                        >
                            {option}
                        </motion.button>
                    );
                })}
            </div>
            <div className="flex justify-between mt-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onPrev}
                    className="w-1/2 mr-2 rounded-full bg-dark-900/5 dark:bg-dark-700 px-8 py-3 text-base font-semibold text-dark-900 dark:text-light-100 border border-dark-700/10 dark:border-dark-600 hover:bg-dark-900/10 dark:hover:bg-dark-600 transition-colors"
                >
                    Back
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(selectedOption)}
                    disabled={selectedOption === null}
                    className="w-1/2 ml-2 rounded-full bg-brand-primary px-8 py-3 text-base font-semibold text-dark-900 disabled:bg-gray-500"
                >
                    {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
                </motion.button>
            </div>
        </motion.div>
    );
};

const ResultsStep = ({ score, total, technologies }) => {
    const percentage = Math.round((score / total) * 100);
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
        >
            <h2 className="text-4xl font-bold text-dark-900 dark:text-light-100">Assessment Complete!</h2>
            <p className="mt-4 text-lg text-dark-900/70 dark:text-light-200">You scored</p>
            <div className="my-8">
                <motion.div
                    initial={{ strokeDashoffset: 1 }}
                    animate={{ strokeDashoffset: 1 - percentage / 100 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="relative w-48 h-48 mx-auto"
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" className="stroke-dark-700/20 dark:stroke-dark-700" strokeWidth="10" fill="transparent" />
                        <motion.circle
                            cx="50" cy="50" r="45"
                            className="stroke-brand-primary" strokeWidth="10" fill="transparent"
                            strokeDasharray="283"
                            strokeDashoffset={283 * (1 - percentage / 100)}
                            transform="rotate(-90 50 50)"
                        />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-dark-900 dark:text-light-100">{percentage}%</span>
                </motion.div>
            </div>
            <p className="text-xl text-dark-900/70 dark:text-light-200">Ready to level up and close the gap? <br/> Let's build your personalized roadmap to success.</p>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 rounded-full bg-brand-primary px-8 py-4 text-lg font-semibold text-dark-900"
                onClick={() => {
                    const techList = Array.isArray(technologies) ? technologies.join(', ') : '';
                    const notes = `AI Assessment Result\n\nTechnologies: ${techList}\nScore: ${score}/${total} (${percentage}%)\n\nWhat I want help with:\n- Personalized roadmap based on my gaps\n- Next 7-day plan\n- Live debugging / project guidance\n\n`;
                    try {
                        window.dispatchEvent(new CustomEvent('open-connect-modal-global', {
                            detail: {
                                headline: 'Free Consultation (AI Assessment)',
                                subhead: 'We’ll review your results and create a personalized roadmap + next 7-day plan.',
                                ctaLabel: 'Request consultation',
                                defaultNotes: notes,
                            }
                        }));
                    } catch {}
                }}
            >
                Book Your Free Consultation
            </motion.button>
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

    // Prefill lead-capture details when logged in (name/email from session, phone from profile settings)
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
            } catch {}
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
        <div className="min-h-screen flex flex-col bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
            <Header />
            <main className="flex-1 py-24 sm:py-32">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        {steps[currentStep].id === 'lead-capture' && <LeadCaptureStep onNext={handleUserData} defaults={userData} />}
                        {steps[currentStep].id === 'tech-selection' && <TechSelectionStep onNext={handleStartQuiz} onPrev={goPrev} />}
                        {steps[currentStep].id === 'quiz' && <QuizStep questions={questions} onFinish={handleFinishQuiz} onPrev={goPrev} />}
                        {steps[currentStep].id === 'results' && <ResultsStep score={score} total={questions.length} technologies={selectedTechs} />}
                    </AnimatePresence>
                </div>
            </main>
            <Footer />
        </div>
    );
}

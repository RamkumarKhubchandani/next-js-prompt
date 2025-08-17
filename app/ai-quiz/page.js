"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "../components/ui/Input";
import { getQuestionsForTech } from "../lib/ai";
import { Check, X } from "lucide-react";
import Link from "next/link";

const steps = [
    { id: 'lead-capture' },
    { id: 'tech-selection' },
    { id: 'quiz' },
    { id: 'results' },
];

const LeadCaptureStep = ({ onNext }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

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
            <h2 className="text-3xl font-bold text-light-100">Let's Get Started</h2>
            <p className="mt-2 text-light-200">First, tell us a little about yourself.</p>
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
            <h2 className="text-3xl font-bold text-light-100">Choose Your Arena</h2>
            <p className="mt-2 text-light-200">Select the technologies you want to be assessed on.</p>
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
                        className="p-6 bg-dark-800 border rounded-lg cursor-pointer text-center"
                    >
                        <img src={tech.logo} alt={tech.name} className="h-12 w-12 mx-auto" />
                        <p className="mt-4 font-semibold text-light-100">{tech.name}</p>
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-between mt-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onPrev}
                    className="w-1/2 mr-2 rounded-full bg-dark-700 px-8 py-3 text-base font-semibold text-light-100"
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
            answer: currentQuestion.options[optionIndex], // Corrected property name
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
            <p className="text-light-200">Question {currentQuestionIndex + 1} of {questions.length}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-light-100 my-6">{currentQuestion.question}</h2>
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
                                'bg-dark-800 border-dark-700 hover:bg-dark-700'
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
                    className="w-1/2 mr-2 rounded-full bg-dark-700 px-8 py-3 text-base font-semibold text-light-100"
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

const ResultsStep = ({ score, total }) => {
    const percentage = Math.round((score / total) * 100);
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
        >
            <h2 className="text-4xl font-bold text-light-100">Assessment Complete!</h2>
            <p className="mt-4 text-lg text-light-200">You scored</p>
            <div className="my-8">
                <motion.div
                    initial={{ strokeDashoffset: 1 }}
                    animate={{ strokeDashoffset: 1 - percentage / 100 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="relative w-48 h-48 mx-auto"
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" className="stroke-dark-700" strokeWidth="10" fill="transparent" />
                        <motion.circle
                            cx="50" cy="50" r="45"
                            className="stroke-brand-primary" strokeWidth="10" fill="transparent"
                            strokeDasharray="283"
                            strokeDashoffset={283 * (1 - percentage / 100)}
                            transform="rotate(-90 50 50)"
                        />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold">{percentage}%</span>
                </motion.div>
            </div>
            <p className="text-xl text-light-200">Ready to level up and close the gap? <br/> Let's build your personalized roadmap to success.</p>
            <Link href="/contact-us">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 rounded-full bg-brand-primary px-8 py-4 text-lg font-semibold text-dark-900"
                >
                    Book Your Free Consultation
                </motion.button>
            </Link>
        </motion.div>
    );
};

export default function AiQuizPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);

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
        <div className="bg-dark-900 min-h-screen">
            <Header />
            <main className="py-24 sm:py-32">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        {steps[currentStep].id === 'lead-capture' && <LeadCaptureStep onNext={handleUserData} />}
                        {steps[currentStep].id === 'tech-selection' && <TechSelectionStep onNext={handleStartQuiz} onPrev={goPrev} />}
                        {steps[currentStep].id === 'quiz' && <QuizStep questions={questions} onFinish={handleFinishQuiz} onPrev={goPrev} />}
                        {steps[currentStep].id === 'results' && <ResultsStep score={score} total={questions.length} />}
                    </AnimatePresence>
                </div>
            </main>
            <Footer />
        </div>
    );
}

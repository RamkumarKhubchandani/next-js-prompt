'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { reactAssessment } from '../../../lib/assessments/react';
import { htmlAssessment } from '../../../lib/assessments/html';
import { cssAssessment } from '../../../lib/assessments/css';
import { fullstackAssessment } from '../../../lib/assessments/fullstack';
import { javascriptAssessment } from '../../../lib/assessments/javascript';
import { angularAssessment } from '../../../lib/assessments/angular';
import { Trophy, AlertCircle, CheckCircle, XCircle, ArrowRight, Loader2, Timer, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Header } from '../../../components/Header';

// Map course IDs to their assessment data
const ASSESSMENTS = {
    react: reactAssessment,
    html: htmlAssessment,
    css: cssAssessment,
    fullstack: fullstackAssessment,
    javascript: javascriptAssessment,
    angular: angularAssessment,
};

export default function AssessmentPage({ params }) {
    const [courseId, setCourseId] = useState(null);
    const [assessment, setAssessment] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({}); // { questionId: optionIndex }
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [passed, setPassed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params;
            setCourseId(resolvedParams.courseId);
            const data = ASSESSMENTS[resolvedParams.courseId];
            if (data) {
                setAssessment(data);
            }
            setLoading(false);
        };
        unwrapParams();
    }, [params]);

    const handleOptionSelect = (questionId, optionIndex) => {
        if (submitted) return;
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const calculateScore = () => {
        let correct = 0;
        assessment.questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correct++;
            }
        });
        return Math.round((correct / assessment.questions.length) * 100);
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length < assessment.questions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }

        setSubmitting(true);
        const finalScore = calculateScore();
        setScore(finalScore);
        setSubmitted(true);

        const isPassed = finalScore >= assessment.passingScore;
        setPassed(isPassed);

        if (isPassed) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#8b5cf6', '#10b981']
            });

            try {
                const res = await fetch('/api/user/certificate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        courseId: courseId,
                        score: finalScore
                    })
                });
                if (!res.ok) throw new Error('Failed to save certificate');
            } catch (error) {
                console.error("Error saving certificate:", error);
            }
        }
        setSubmitting(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-dark-900 flex items-center justify-center text-gray-900 dark:text-white">
                <Loader2 className="animate-spin text-brand-primary" size={32} />
            </div>
        );
    }

    if (!assessment) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-white dark:bg-dark-900 flex items-center justify-center text-gray-900 dark:text-white pt-20">
                    <div className="text-center max-w-md px-4">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle size={32} className="text-gray-400" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Assessment Not Found</h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            The assessment for this course is not available yet. Please check back later.
                        </p>
                        <button onClick={() => router.back()} className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:opacity-90 transition-opacity">
                            Go Back
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-white">
            <Header />

            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

                {/* Header Section */}
                <div className="mb-10 text-center relative">
                    <Link href="/dashboard" className="absolute left-0 top-0 hidden md:flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                        <ArrowRight size={20} className="rotate-180" />
                        Back to Dashboard
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-bold mb-4 border border-brand-primary/20">
                        <Award size={16} />
                        Professional Certification
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                        {assessment.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        Prove your expertise. Pass with <span className="font-bold text-gray-900 dark:text-white">{assessment.passingScore}%</span> or higher to earn your verified certificate.
                    </p>
                </div>

                {/* Results View */}
                {submitted ? (
                    <div className="bg-white dark:bg-dark-800 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-dark-700 text-center shadow-xl animate-in fade-in zoom-in duration-300">
                        <div className="mb-8 flex justify-center">
                            {passed ? (
                                <div className="relative">
                                    <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full" />
                                    <div className="relative w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg">
                                        <Trophy size={64} />
                                    </div>
                                </div>
                            ) : (
                                <div className="w-32 h-32 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500 border-4 border-red-100 dark:border-red-500/20">
                                    <XCircle size={64} />
                                </div>
                            )}
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {passed ? "Certification Earned! 🎉" : "Keep Learning! 💪"}
                        </h2>

                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="text-center px-6 py-3 bg-gray-50 dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-700">
                                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Your Score</p>
                                <p className={`text-3xl font-bold ${passed ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                                    {score}%
                                </p>
                            </div>
                            <div className="text-center px-6 py-3 bg-gray-50 dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-700">
                                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Required</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {assessment.passingScore}%
                                </p>
                            </div>
                        </div>

                        {passed ? (
                            <div className="space-y-6 max-w-md mx-auto">
                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                    Congratulations! Your official certificate has been generated and added to your profile.
                                </p>
                                <button
                                    onClick={() => router.push('/u/me')}
                                    className="w-full py-4 bg-brand-primary hover:bg-blue-600 rounded-xl font-bold text-white transition-all shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:-translate-y-0.5"
                                >
                                    View My Certificate
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6 max-w-md mx-auto">
                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                    You didn't meet the passing criteria this time. Review the course material and try again to earn your credential.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="w-full py-4 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-0.5"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Quiz View */
                    <div className="space-y-8">
                        {assessment.questions.map((q, index) => (
                            <div key={q.id} className="bg-white dark:bg-dark-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-dark-700 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex gap-4 mb-6">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </span>
                                    <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white leading-relaxed">
                                        {q.question}
                                    </h3>
                                </div>

                                <div className="space-y-3 pl-0 md:pl-12">
                                    {q.options.map((option, optIndex) => (
                                        <button
                                            key={optIndex}
                                            onClick={() => handleOptionSelect(q.id, optIndex)}
                                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group ${answers[q.id] === optIndex
                                                ? 'bg-brand-primary/5 border-brand-primary text-brand-primary dark:text-white'
                                                : 'bg-gray-50 dark:bg-dark-900/50 border-transparent hover:border-gray-200 dark:hover:border-dark-600 text-gray-600 dark:text-gray-300'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${answers[q.id] === optIndex
                                                    ? 'border-brand-primary bg-brand-primary'
                                                    : 'border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500'
                                                    }`}>
                                                    {answers[q.id] === optIndex && <div className="w-2 h-2 bg-white rounded-full" />}
                                                </div>
                                                <span className="font-medium">{option}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="sticky bottom-6 z-20">
                            <div className="absolute inset-0 bg-white/50 dark:bg-dark-900/50 backdrop-blur-xl -m-6 p-6 rounded-3xl -z-10 shadow-2xl border border-white/20 dark:border-white/5" />
                            <div className="flex items-center justify-between gap-4">
                                <div className="hidden md:block text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    {Object.keys(answers).length} of {assessment.questions.length} answered
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="w-full md:w-auto ml-auto flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-white text-lg transition-all shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:-translate-y-0.5"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="animate-spin" /> Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Assessment <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

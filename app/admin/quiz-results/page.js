import React from 'react';
import connectDB from '../../lib/mongodb';
import QuizResult from '../../models/QuizResult';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import Link from 'next/link';

async function getQuizResults() {
    await connectDB();
    const results = await QuizResult.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(results));
}

export default async function QuizResultsPage() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.email !== 'admin@example.com')) {
        return (
            <div className="min-h-screen pt-24 px-6 bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-2">Unauthorized</h1>
                    <p className="text-dark-900/70 dark:text-light-200">
                        You need an admin account to view quiz reports.
                    </p>
                    <Link href="/" className="inline-block mt-6 text-brand-primary font-bold">Go home</Link>
                </div>
            </div>
        );
    }

    const results = await getQuizResults();

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-2">AI Quiz Reports</h1>
                <p className="text-dark-900/70 dark:text-light-200 mb-8">
                    Full assessment attempts (tech + score + every answer with right/wrong).
                </p>

                <div className="space-y-6">
                    {results.map((r) => {
                        const pct = Math.round((r.score / Math.max(1, r.total)) * 100);
                        return (
                            <details key={r._id} className="rounded-2xl border border-dark-700/10 dark:border-dark-700 bg-white/70 dark:bg-dark-800 backdrop-blur-lg p-5">
                                <summary className="cursor-pointer list-none">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="font-bold text-lg truncate">{r.name}</p>
                                            <p className="text-sm text-dark-900/60 dark:text-light-300 truncate">
                                                {r.email} • {r.phone} • {new Date(r.createdAt).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-dark-900/60 dark:text-light-300 mt-1">
                                                {(r.technologies || []).join(' • ')}
                                            </p>
                                        </div>
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-3xl font-extrabold">{pct}%</span>
                                            <span className="text-sm text-dark-900/60 dark:text-light-300">({r.score}/{r.total})</span>
                                        </div>
                                    </div>
                                </summary>

                                <div className="mt-5 border-t border-dark-700/10 dark:border-dark-700 pt-5 space-y-3">
                                    {(r.answers || []).map((a, idx) => (
                                        <div key={idx} className="rounded-xl border border-dark-700/10 dark:border-dark-700 p-4 bg-white/60 dark:bg-dark-900/40">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <p className="font-bold">
                                                        Q{idx + 1}{a.technology ? ` (${a.technology})` : ''}: {a.question}
                                                    </p>
                                                    <p className="mt-2 text-sm">
                                                        <span className="font-semibold">User answer:</span>{' '}
                                                        <span className={a.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                                                            {a.answer}
                                                        </span>
                                                    </p>
                                                    {a.correctAnswer && (
                                                        <p className="mt-1 text-sm text-dark-900/70 dark:text-light-200">
                                                            <span className="font-semibold">Correct:</span> {a.correctAnswer}
                                                        </p>
                                                    )}
                                                    {a.explanation && (
                                                        <p className="mt-2 text-sm text-dark-900/60 dark:text-light-300">
                                                            <span className="font-semibold">Explanation:</span> {a.explanation}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full border ${
                                                    a.isCorrect ? 'border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300' : 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300'
                                                }`}>
                                                    {a.isCorrect ? 'Correct' : 'Wrong'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

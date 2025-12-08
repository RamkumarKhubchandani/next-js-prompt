"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Bug, ArrowRight, Zap, CheckCircle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChallengesIndexPage() {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/challenges')
            .then(res => res.json())
            .then(data => {
                setChallenges(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-dark-950 text-light-100">
            <Header showNav={true} />
            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
                            Bug Squash Arena
                        </span>
                    </h1>
                    <p className="text-light-300 max-w-2xl mx-auto">
                        Sharpen your debugging skills. Fix broken code, earn XP, and climb the leaderboard.
                        New challenges added daily.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12">Loading challenges...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {challenges.map((challenge, index) => (
                            <motion.div
                                key={challenge.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-all group"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 rounded-lg ${
                                            challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                                            challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-red-500/20 text-red-400'
                                        }`}>
                                            <Bug size={20} />
                                        </div>
                                        <div className="text-xs font-mono text-dark-500">#{challenge.dayNumber || index + 1}</div>
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                                        {challenge.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="text-xs bg-dark-800 px-2 py-1 rounded text-light-400 border border-dark-700">
                                            {challenge.category}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded border ${
                                            challenge.difficulty === 'Easy' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                                            challenge.difficulty === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
                                            'bg-red-500/10 border-red-500/30 text-red-400'
                                        }`}>
                                            {challenge.difficulty}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-1 text-sm text-yellow-500 font-bold">
                                            <Zap size={14} fill="currentColor" />
                                            <span>+{challenge.difficulty === 'Easy' ? 50 : 100} XP</span>
                                        </div>
                                        <Link href={`/challenges/${challenge.slug}`} className="text-sm font-bold text-white flex items-center gap-1 hover:gap-2 transition-all">
                                            Start <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

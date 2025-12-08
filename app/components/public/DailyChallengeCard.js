"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bug, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DailyChallengeCard() {
    const [challenge, setChallenge] = useState(null);

    useEffect(() => {
        // Fetch a random or "daily" challenge
        // For now just fetch the first one
        fetch('/api/challenges')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setChallenge(data[0]); // Just pick the first one for the homepage
                }
            })
            .catch(err => console.error(err));
    }, []);

    if (!challenge) return null;

    return (
        <motion.div 
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/40 to-dark-800 border border-red-500/30 p-1"
        >
            <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative h-full bg-dark-900/90 backdrop-blur-sm rounded-xl p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-red-500/20 text-red-400 p-2 rounded-lg">
                        <Bug size={24} />
                    </div>
                    <span className="text-xs font-bold bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                        DAILY BUG
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {challenge.title}
                </h3>
                
                <p className="text-light-400 text-sm mb-6 flex-grow">
                    Can you fix this broken React component? Spot the bug and save the render cycle.
                </p>

                <div className="flex items-center justify-between mt-auto gap-4">
                    <Link href="/challenges" className="text-xs font-medium text-light-400 hover:text-white underline decoration-light-600 hover:decoration-white">
                        View All Challenges
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-yellow-400">
                            <Zap size={16} fill="currentColor" />
                            <span>+{challenge.difficulty === 'Easy' ? 50 : 100} XP</span>
                        </div>
                        
                        <Link href={`/challenges/${challenge.slug}`} className="flex items-center gap-2 text-white font-bold hover:gap-3 transition-all">
                            Fix Now <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

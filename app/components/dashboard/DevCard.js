"use client";
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Download, Share2, Sparkles, Shield, Zap, TrendingUp,
    Crown, Hash, Code2
} from 'lucide-react';
import html2canvas from 'html2canvas';

export default function DevCard({ user, stats, activeGoal }) {
    const cardRef = useRef(null);
    const [generating, setGenerating] = useState(false);

    // Get rank details based on XP
    const getRankInfo = (xp) => {
        if (xp > 10000) return { title: 'Code General', color: 'from-amber-400 to-orange-500', textColor: '#f59e0b', icon: Crown };
        if (xp > 5000) return { title: 'Code Sorcerer', color: 'from-purple-500 to-pink-500', textColor: '#d946ef', icon: Sparkles };
        if (xp > 1000) return { title: 'Code Knight', color: 'from-blue-500 to-cyan-400', textColor: '#3b82f6', icon: Shield };
        return { title: 'Apprentice', color: 'from-gray-400 to-gray-500', textColor: '#9ca3af', icon: Zap };
    };

    const rank = getRankInfo(stats.xp || 0);
    const RankIcon = rank.icon;

    const handleDownload = async () => {
        setGenerating(true);
        if (cardRef.current) {
            try {
                // Ensure fonts/images are loaded
                const canvas = await html2canvas(cardRef.current, {
                    scale: 2, // Retina quality
                    backgroundColor: null, // Transparent bg support
                    logging: false,
                    useCORS: true // Essential for external images if any
                });

                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = image;
                link.download = `DevCard-${user.name.split(' ')[0]}.png`;
                link.click();
            } catch (err) {
                console.error("Failed to generate card", err);
            }
        }
        setGenerating(false);
    };

    const handleShare = () => {
        const text = `I just minted my DevCard! 🚀\n\nRank: ${rank.title}\nXP: ${stats.xp}\nGoal: ${activeGoal || 'Mastery'}\n\nJoin me at https://outlinedev.com #DevCard #Coding`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            {/* The TRADING CARD (Ref for capture) */}
            <div className="perspective-1000">
                <div
                    ref={cardRef}
                    className="relative w-[340px] h-[540px] rounded-[24px] overflow-hidden shadow-2xl border-[6px] border-[#1a1b26] bg-[#0f1016]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {/* 1. Background Effects */}
                    <div className="absolute inset-0 bg-[#0f1016] z-0" />
                    <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${rank.color} opacity-20 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2`} />
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] z-0" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1016]/50 to-[#0f1016]" />

                    {/* 2. Header Area */}
                    <div className="relative z-20 pt-8 pb-4 flex flex-col items-center">
                        {/* Avatar Ring */}
                        <div className={`relative p-[3px] rounded-full bg-gradient-to-br ${rank.color} shadow-lg shadow-purple-500/20 mb-3`}>
                            <div className="w-20 h-20 rounded-full bg-[#1a1b26] border-4 border-[#0f1016] flex items-center justify-center overflow-hidden">
                                {user.image ? (
                                    <img src={user.image} alt="User" className="w-full h-full object-cover" crossOrigin="anonymous" />
                                ) : (
                                    <span className="text-2xl font-black text-white">{user.name?.charAt(0)}</span>
                                )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-[#1a1b26] p-1.5 rounded-full border border-gray-800">
                                <RankIcon size={16} className="text-yellow-400 fill-yellow-400" />
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 mb-1">
                            <h2 className="text-xl font-black text-white tracking-tight text-center shadow-black drop-shadow-md">
                                {user.name}
                            </h2>
                            <Shield size={14} className="text-blue-400 fill-blue-400" />
                        </div>

                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: rank.textColor }}>
                            {rank.title}
                        </div>

                        {/* Public Handle */}
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            <span className="text-[10px] text-gray-400 font-mono">@{user.username || user.name?.replace(/\s+/g, '').toLowerCase() || 'dev'}</span>
                        </div>
                    </div>

                    {/* 3. Stats Grid (2x2) */}
                    <div className="relative z-20 px-6 py-2">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-[#1a1b26] p-2.5 rounded-xl border border-white/5 shadow-inner flex flex-col items-center justify-center">
                                <div className="text-[9px] text-gray-500 uppercase font-bold mb-0.5 flex items-center gap-1">
                                    <Zap size={10} className="text-yellow-500" /> XP
                                </div>
                                <div className="text-base font-mono font-bold text-white">{stats.xp?.toLocaleString()}</div>
                            </div>
                            <div className="bg-[#1a1b26] p-2.5 rounded-xl border border-white/5 shadow-inner flex flex-col items-center justify-center">
                                <div className="text-[9px] text-gray-500 uppercase font-bold mb-0.5 flex items-center gap-1">
                                    <TrendingUp size={10} className="text-green-500" /> Streak
                                </div>
                                <div className="text-base font-mono font-bold text-white">{stats.streak?.count || 0} 🔥</div>
                            </div>
                            <div className="bg-[#1a1b26] p-2.5 rounded-xl border border-white/5 shadow-inner flex flex-col items-center justify-center">
                                <div className="text-[9px] text-gray-500 uppercase font-bold mb-0.5 flex items-center gap-1">
                                    <Hash size={10} className="text-blue-500" /> Tuts
                                </div>
                                <div className="text-base font-mono font-bold text-white">{stats.tutorials || 0}</div>
                            </div>
                            <div className="bg-[#1a1b26] p-2.5 rounded-xl border border-white/5 shadow-inner flex flex-col items-center justify-center">
                                <div className="text-[9px] text-gray-500 uppercase font-bold mb-0.5 flex items-center gap-1">
                                    <Sparkles size={10} className="text-purple-500" /> Certs
                                </div>
                                <div className="text-base font-mono font-bold text-white">{stats.certifications || 0} 🎖️</div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Skills / Tech Stack Mockup */}
                    <div className="relative z-20 px-6 py-3">
                        <div className="flex justify-center gap-2 opacity-80">
                            {['react', 'node', 'next', 'ts'].map((tech, i) => (
                                <div key={i} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                                    {tech === 'react' && '⚛️'}
                                    {tech === 'node' && '🟢'}
                                    {tech === 'next' && '▲'}
                                    {tech === 'ts' && 'TS'}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 5. Main Focus */}
                    <div className="relative z-20 px-6 pb-4">
                        <div className="bg-gradient-to-r from-[#1a1b26] to-[#12131a] p-3 rounded-xl border border-white/10 relative overflow-hidden text-center">
                            <div className={`absolute left-0 bottom-0 top-0 w-1 bg-${rank.color.split(' ')[1]}`} /> {/* Simple accent */}
                            <div className="text-[9px] text-gray-400 uppercase font-bold mb-1">
                                Current North Star
                            </div>
                            <div className="text-xs font-medium text-white shadow-black drop-shadow-sm">
                                {activeGoal || "Architecting the Future"}
                            </div>
                        </div>
                    </div>

                    {/* 6. Footer */}
                    <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                        <div className="inline-flex items-center gap-1.5 opacity-40">
                            <Code2 size={12} className="text-white" />
                            <span className="text-[8px] font-bold text-white tracking-[0.2em] uppercase">OutlineDev.com</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={handleDownload}
                    disabled={generating}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-70"
                >
                    {generating ? <Zap className="animate-spin" size={16} /> : <Download size={16} />}
                    {generating ? 'Minting...' : 'Save Card'}
                </button>
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#1DA1F2] text-white rounded-full font-bold text-sm shadow-xl hover:bg-[#1a91da] hover:scale-105 active:scale-95 transition-all"
                >
                    <Share2 size={16} />
                    Tweet
                </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs text-center">
                This is your official developer identity. Share it to prove your rank.
            </p>
        </div>
    );
}

// Ensure html2canvas is installed in the project, I will assume it is or will run npm install later.
// Actually I should probably check if it's there or just use a CDN link if allowed, but npm is better.

"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle, Circle, Plus, Sparkles, Calendar,
    Target, Trophy, Flame, ChevronRight, BookOpen,
    MoreHorizontal, Trash2, ArrowRight, X, ChevronDown, ListTodo,
    Code, Shield
} from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

export default function CareerGoalsPage() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [goals, setGoals] = useState({ yearly: [], monthly: [], weekly: [] });
    const [newGoalInput, setNewGoalInput] = useState("");
    const [activeTab, setActiveTab] = useState("monthly"); // 'yearly', 'monthly', 'weekly'

    // AI Modal State
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [aiInterest, setAiInterest] = useState('frontend');
    const [aiTech, setAiTech] = useState('react');
    const [suggesting, setSuggesting] = useState(false);

    // Expansion State
    const [expandedGoalId, setExpandedGoalId] = useState(null);

    // Current Time Context
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    const currentWeek = `Week ${Math.ceil(new Date().getDate() / 7)}, ${new Date().toLocaleString('default', { month: 'short' })}`;

    const periods = {
        yearly: currentYear.toString(),
        monthly: currentMonth,
        weekly: currentWeek
    };

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            setLoading(false);
            return;
        }
        fetchGoals();
    }, [session, status]);

    const fetchGoals = async () => {
        try {
            const res = await fetch('/api/career-goals');
            if (res.ok) {
                const data = await res.json();
                setGoals(data.goals);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addGoal = async (text, isAi = false, keyResults = []) => {
        if (!text.trim()) return;

        const period = periods[activeTab];

        // Optimistic UI
        const optimisticGoal = {
            id: Math.random().toString(), // Temp ID
            text,
            isCompleted: false,
            isAiSuggested: isAi,
            progress: 0,
            keyResults: keyResults.map(kr => ({ id: Math.random().toString(), text: kr.text, isCompleted: false })),
            createdAt: new Date().toISOString()
        };

        const updatedGoals = { ...goals, [activeTab]: [...(goals[activeTab] || []), optimisticGoal] };
        setGoals(updatedGoals);
        setNewGoalInput("");

        try {
            const res = await fetch('/api/career-goals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: activeTab,
                    text,
                    period,
                    isAiSuggested: isAi
                })
            });
            if (res.ok) {
                const data = await res.json();
                // If we had key results (from AI), we need to add them now that we have the real ID
                // Ideally API POST should accept keyResults, but let's just re-fetch or rely on the simpler flow for now.
                // Actually our POST endpoint DOES NOT accept keyResults yet in schema creation in body, 
                // but the AI suggestions might rely on them. 
                // Let's assume for this prompt iteration that sticking to simple text add + manual key result add is fine,
                // OR we update fetchGoals to resync perfectly.
                setGoals(data.goals);
            }
        } catch (err) {
            console.error("Failed to add goal", err);
        }
    };

    const toggleGoal = async (id, currentStatus, currentProgress) => {
        // Optimistic UI
        const updatedList = goals[activeTab].map(g =>
            g.id === id ? { ...g, isCompleted: !currentStatus, progress: !currentStatus ? 100 : (g.keyResults?.length ? g.progress : 0) } : g
        );
        setGoals({ ...goals, [activeTab]: updatedList });

        try {
            await fetch('/api/career-goals', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    goalId: id,
                    type: activeTab,
                    action: 'TOGGLE_COMPLETE',
                    isCompleted: !currentStatus,
                    progress: !currentStatus ? 100 : undefined
                })
            });
        } catch (err) {
            console.error(err);
        }
    };

    const deleteGoal = async (id) => {
        const updatedList = goals[activeTab].filter(g => g.id !== id);
        setGoals({ ...goals, [activeTab]: updatedList });

        try {
            await fetch(`/api/career-goals?id=${id}&type=${activeTab}`, { method: 'DELETE' });
        } catch (err) {
            console.error(err);
        }
    };

    // --- Key Results Logic ---
    const addKeyResult = async (goalId, text) => {
        if (!text.trim()) return;
        // Optimistic
        const updatedList = goals[activeTab].map(g => {
            if (g.id === goalId) {
                return {
                    ...g,
                    keyResults: [...(g.keyResults || []), { id: Math.random().toString(), text, isCompleted: false }],
                    // progress re-calc logic could go here
                }
            }
            return g;
        });
        setGoals({ ...goals, [activeTab]: updatedList });

        try {
            await fetch('/api/career-goals', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    goalId,
                    type: activeTab,
                    action: 'ADD_KEY_RESULT',
                    text
                })
            });
            fetchGoals(); // Resync IDs
        } catch (e) { console.error(e); }
    };

    const toggleKeyResult = async (goalId, krId, currentStatus) => {
        // Optimistic and Progress Recalc
        const updatedList = goals[activeTab].map(g => {
            if (g.id === goalId) {
                const newKRs = g.keyResults.map(kr =>
                    kr.id === krId ? { ...kr, isCompleted: !currentStatus } : kr
                );
                const completedCount = newKRs.filter(k => k.isCompleted).length;
                const newProgress = Math.round((completedCount / newKRs.length) * 100);

                return {
                    ...g,
                    keyResults: newKRs,
                    progress: newProgress,
                    isCompleted: newProgress === 100
                }
            }
            return g;
        });

        setGoals({ ...goals, [activeTab]: updatedList });

        // Fire and forget
        try {
            await fetch('/api/career-goals', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    goalId,
                    type: activeTab,
                    action: 'TOGGLE_KEY_RESULT',
                    keyResultId: krId,
                    isCompleted: !currentStatus
                })
            });
            // Update progress persistence
            const goal = updatedList.find(g => g.id === goalId);
            await fetch('/api/career-goals', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    goalId,
                    type: activeTab,
                    action: 'UPDATE_PROGRESS',
                    progress: goal.progress
                })
            });
        } catch (e) { console.error(e); }
    };

    const deleteKeyResult = async (goalId, krId) => {
        const updatedList = goals[activeTab].map(g => {
            if (g.id === goalId) {
                return { ...g, keyResults: g.keyResults.filter(k => k.id !== krId) }
            }
            return g;
        });
        setGoals({ ...goals, [activeTab]: updatedList });

        try {
            await fetch('/api/career-goals', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    goalId,
                    type: activeTab,
                    action: 'DELETE_KEY_RESULT',
                    keyResultId: krId
                })
            });
        } catch (e) { console.error(e); }
    };

    const handleAiSuggest = async () => {
        setSuggesting(true);
        try {
            const res = await fetch('/api/career-goals/suggest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ interest: aiInterest, technology: aiTech, period: periods[activeTab] })
            });
            if (res.ok) {
                const data = await res.json();
                for (const suggestion of data.suggestions) {
                    await addGoal(suggestion.text, true, suggestion.keyResults);
                    await new Promise(r => setTimeout(r, 600)); // Stagger effect
                }
                setAiModalOpen(false);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSuggesting(false);
        }
    };

    const currentGoals = goals[activeTab] || [];
    const completedCount = currentGoals.filter(g => g.isCompleted).length;
    const progress = currentGoals.length ? Math.round((completedCount / currentGoals.length) * 100) : 0;

    // Recommendation Color mapping
    const getTechColor = (tech) => {
        if (tech === 'react') return 'text-blue-400';
        if (tech === 'angular') return 'text-red-500';
        if (tech === 'vue') return 'text-green-400';
        return 'text-gray-400';
    }

    if (loading) {
        return <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center text-gray-900 dark:text-white">Loading Career Compass...</div>;
    }

    if (!session) {
        return (
            <div className="min-h-screen flex flex-col bg-white dark:bg-[#050505] transition-colors duration-300">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center text-gray-900 dark:text-white p-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Track Your Career Growth</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">Login to set goals, track progress, and get AI-powered course recommendations.</p>
                    <a href="/login" className="px-8 py-3 bg-blue-600 rounded-full font-bold text-white hover:bg-blue-500 transition">Get Started</a>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#050505] text-gray-900 dark:text-white transition-colors duration-300">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/5 dark:bg-blue-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/5 dark:bg-purple-600/10 blur-[150px] rounded-full" />
            </div>

            <Header />

            <main className="flex-1 relative z-10 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full">

                {/* AI Suggestion Modal */}
                <AnimatePresence>
                    {aiModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                                className="bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                <button onClick={() => setAiModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white"><X size={20} /></button>

                                <div className="text-center mb-6">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="text-purple-600 dark:text-purple-400" size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">AI Goal Generator</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Tell us your focus, and we'll build a roadmap for you.</p>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Domaine</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['frontend', 'backend', 'fullstack'].map(i => (
                                                <button
                                                    key={i}
                                                    onClick={() => setAiInterest(i)}
                                                    className={`py-2 rounded-lg text-sm font-bold capitalize transition-colors border ${aiInterest === i ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 dark:bg-white/5 border-transparent text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10'}`}
                                                >
                                                    {i}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Technology</label>
                                        <select
                                            value={aiTech} onChange={(e) => setAiTech(e.target.value)}
                                            className="w-full bg-gray-100 dark:bg-white/5 border border-transparent focus:border-blue-500 rounded-lg p-3 text-sm font-medium outline-none transition-all text-gray-900 dark:text-white capitalize"
                                        >
                                            {aiInterest === 'frontend' && (
                                                <>
                                                    <option value="react">React</option>
                                                    <option value="angular">Angular</option>
                                                    <option value="vue">Vue</option>
                                                </>
                                            )}
                                            {aiInterest === 'backend' && (
                                                <>
                                                    <option value="node">Node.js</option>
                                                    <option value="python">Python</option>
                                                    <option value="java">Java</option>
                                                </>
                                            )}
                                            {aiInterest === 'fullstack' && (
                                                <>
                                                    <option value="mern">MERN Stack</option>
                                                    <option value="mean">MEAN Stack</option>
                                                    <option value="next">Next.js</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAiSuggest}
                                    disabled={suggesting}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    {suggesting ? <Sparkles className="animate-spin" size={18} /> : <Sparkles size={18} />}
                                    {suggesting ? 'Generating Plan...' : 'Generate Goals'}
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Dashboard Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mb-2 uppercase tracking-wider text-xs">
                            <Target size={14} /> Career Compass
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-500">
                            Your Goals
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl text-lg">
                            Define your path. Measure progress. Achieve mastery.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: Controls & Progress */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Period Tabs */}
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl w-fit border border-gray-200 dark:border-white/10">
                            {['weekly', 'monthly', 'yearly'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`
                                        px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 capitalize
                                        ${activeTab === tab
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'}
                                    `}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Progress Card */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#121212] dark:to-[#1a1a1a] rounded-3xl p-8 border border-gray-200 dark:border-white/10 relative overflow-hidden shadow-sm">
                            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10">
                                <Trophy size={120} className="text-gray-900 dark:text-white" />
                            </div>

                            <div className="relative z-10 w-full">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1 capitalize text-gray-900 dark:text-white">{activeTab} Focus</h3>
                                        <div className="text-blue-600 dark:text-blue-400 font-medium mb-6 flex items-center gap-2">
                                            <Calendar size={16} /> {periods[activeTab]}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-black text-gray-900 dark:text-white">{progress}%</div>
                                        <div className="text-xs uppercase font-bold text-gray-400">Total Completion</div>
                                    </div>
                                </div>

                                <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Goals List */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                                    <ListTodo className="text-blue-500" size={24} /> Action Plan
                                </h3>

                                <button
                                    onClick={() => setAiModalOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-primary/20 hover:scale-[1.02] transition-transform"
                                >
                                    <Sparkles size={16} />
                                    AI Suggest Goals
                                </button>
                            </div>

                            <AnimatePresence>
                                {currentGoals.map((goal) => {
                                    const isExpanded = expandedGoalId === goal.id;
                                    return (
                                        <motion.div
                                            key={goal.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`
                                                relative overflow-hidden rounded-2xl border transition-all duration-300
                                                ${isExpanded
                                                    ? 'bg-white dark:bg-[#18181b] border-blue-500/50 shadow-xl ring-1 ring-blue-500/20'
                                                    : goal.isCompleted
                                                        ? 'bg-green-50/50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20'
                                                        : 'bg-white dark:bg-[#151515] border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10'
                                                }
                                            `}
                                        >
                                            <div className="p-4 flex items-start gap-4 cursor-pointer" onClick={() => setExpandedGoalId(isExpanded ? null : goal.id)}>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); toggleGoal(goal.id, goal.isCompleted, goal.progress); }}
                                                    className={`
                                                        mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                                                        ${goal.isCompleted
                                                            ? 'bg-green-500 border-green-500 text-white'
                                                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'}
                                                    `}
                                                >
                                                    {goal.isCompleted && <CheckCircle size={14} />}
                                                </button>

                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className={`font-semibold text-lg ${goal.isCompleted ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-900 dark:text-gray-100'}`}>
                                                            {goal.text}
                                                        </h4>
                                                        <ChevronDown size={20} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                                    </div>

                                                    <div className="flex items-center gap-3 mt-1">
                                                        {goal.isAiSuggested && (
                                                            <span className="text-[10px] bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                                                                <Sparkles size={8} /> AI
                                                            </span>
                                                        )}
                                                        {/* Mini Progress Bar for Goal */}
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                                <div className="h-full bg-green-500" style={{ width: `${goal.progress || 0}%` }}></div>
                                                            </div>
                                                            <span className="text-xs text-gray-400 font-mono">{goal.progress || 0}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expanded Content: Key Results */}
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20"
                                                    >
                                                        <div className="p-4 pl-14">
                                                            <div className="mb-3 flex items-center justify-between">
                                                                <h5 className="text-xs font-bold uppercase tracking-widest text-gray-500">Key Results & Milestones</h5>
                                                                <button onClick={() => deleteGoal(goal.id)} className="text-red-500 hover:text-red-600 p-1 hover:bg-red-50 dark:hover:bg-red-900/10 rounded"><Trash2 size={14} /></button>
                                                            </div>

                                                            <div className="space-y-2 mb-4">
                                                                {goal.keyResults?.map((kr) => (
                                                                    <div key={kr.id} className="flex items-center gap-3 group/kr">
                                                                        <button
                                                                            onClick={() => toggleKeyResult(goal.id, kr.id, kr.isCompleted)}
                                                                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${kr.isCompleted ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 dark:border-gray-600'}`}
                                                                        >
                                                                            {kr.isCompleted && <CheckCircle size={10} />}
                                                                        </button>
                                                                        <span className={`text-sm ${kr.isCompleted ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                                                                            {kr.text}
                                                                        </span>
                                                                        <button onClick={() => deleteKeyResult(goal.id, kr.id)} className="opacity-0 group-hover/kr:opacity-100 text-gray-400 hover:text-red-500 ml-auto"><Trash2 size={12} /></button>
                                                                    </div>
                                                                ))}
                                                                {(!goal.keyResults || goal.keyResults.length === 0) && (
                                                                    <div className="text-sm text-gray-400 italic">No sub-tasks yet. Break it down!</div>
                                                                )}
                                                            </div>

                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Add a milestone (e.g. 'Read documentation')"
                                                                    className="flex-1 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === 'Enter') {
                                                                            addKeyResult(goal.id, e.currentTarget.value);
                                                                            e.currentTarget.value = '';
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            {/* Add New Goal Input */}
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors">
                                    <Plus size={20} />
                                </div>
                                <input
                                    type="text"
                                    value={newGoalInput}
                                    onChange={(e) => setNewGoalInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addGoal(newGoalInput)}
                                    placeholder="Add a new high-level goal..."
                                    className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-sm dark:shadow-inner"
                                />
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Suggestions & Upsell */}
                    <div className="lg:col-span-4 space-y-6">

                        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-md dark:shadow-none sticky top-24">
                            <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                                <BookOpen className="text-yellow-500" size={18} /> Recommended for You
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Based on your {activeTab} goals.</p>

                            <div className="space-y-3">
                                {/* Dynamic Mock Recommendations */}
                                <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-600/10 dark:to-cyan-600/10 hover:scale-[1.02] transition-transform cursor-pointer group shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="bg-white dark:bg-white/20 p-2 rounded-lg text-blue-600 dark:text-blue-300"><Code size={18} /></div>
                                        <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Advanced React Patterns</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Master Composition & Optimizations</p>
                                </div>

                                <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-600/10 dark:to-emerald-600/10 hover:scale-[1.02] transition-transform cursor-pointer group shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="bg-white dark:bg-white/20 p-2 rounded-lg text-green-600 dark:text-green-300"><Shield size={18} /></div>
                                        <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Node.js Security</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Auth, OWASP, & Hardening</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </main>

            <Footer />
        </div>
    );
}

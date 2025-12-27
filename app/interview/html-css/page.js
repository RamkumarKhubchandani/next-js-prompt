'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../../components/Header';
import { htmlCssQuestions } from '../../lib/interview-questions/html-css';
import { ArrowLeft, ChevronDown, Code, Search, Filter, Play, RotateCcw, Copy, Check, Eye } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function HtmlCssInterviewPage() {
    const [openId, setOpenId] = useState(null);
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [difficulty, setDifficulty] = useState('All');
    const [runOutput, setRunOutput] = useState({});
    const [copiedId, setCopiedId] = useState(null);

    const toggle = (id) => setOpenId(openId === id ? null : id);

    const handleCopy = async (text, id) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Get unique categories
    const categories = ['All', ...new Set(htmlCssQuestions.map(q => q.category))];
    const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Expert', 'Elite'];

    const filteredQuestions = useMemo(() => {
        return htmlCssQuestions.filter(q => {
            const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase()) ||
                q.answer.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = activeFilter === 'All' || q.category === activeFilter;
            const matchesDifficulty = difficulty === 'All' || q.difficulty === difficulty;

            return matchesSearch && matchesCategory && matchesDifficulty;
        });
    }, [search, activeFilter, difficulty]);

    // Visual HTML/CSS Runner
    const runCode = (code, id) => {
        setRunOutput(prev => ({
            ...prev,
            [id]: { html: code }
        }));
    };

    const resetOutput = (questionId) => {
        setRunOutput(prev => {
            const newOutput = { ...prev };
            delete newOutput[questionId];
            return newOutput;
        });
    };

    const getDifficultyColor = (diff) => {
        const colors = {
            'Easy': 'bg-green-500/10 text-green-400 border-green-500/20',
            'Medium': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
            'Hard': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
            'Expert': 'bg-red-500/10 text-red-400 border-red-500/20',
            'Elite': 'bg-purple-500/10 text-purple-400 border-purple-500/20'
        };
        return colors[diff] || colors['Medium'];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <Header />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-teal-600/10 border-b border-blue-500/20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-6 py-16 relative">
                    <Link href="/interview" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Interview Prep
                    </Link>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            {/* Brand HTML5 Icon style */}
                            <svg className="w-12 h-12 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2.5 4.5l1.5 16.5L12 23l8-2 1.5-16.5L12 2zm0 2.25l6.5 1.75-1 11.5L12 20.25l-5.5-2.75 1-11.5L12 4.25z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-5xl font-bold text-white mb-2">
                                HTML & CSS Questions
                            </h1>
                            <p className="text-xl text-gray-300">
                                {htmlCssQuestions.length} Elite Questions • Semantic HTML5 • Modern Layouts • Accessibility
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-6">
                        <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                            <span className="text-gray-400 text-sm">Total Questions:</span>
                            <span className="text-white font-bold ml-2">{htmlCssQuestions.length}</span>
                        </div>
                        <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                            <span className="text-gray-400 text-sm">Categories:</span>
                            <span className="text-white font-bold ml-2">{categories.length - 1}</span>
                        </div>
                        <div className="px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <span className="text-blue-300 text-sm">✨ Visual Preview Runner</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search questions (e.g. 'flexbox', 'aria', 'meta')..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Filter className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-400">Category</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === cat
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Filter className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-400">Difficulty</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {difficulties.map(diff => (
                                <button
                                    key={diff}
                                    onClick={() => setDifficulty(diff)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${difficulty === diff
                                        ? getDifficultyColor(diff) + ' border'
                                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                        }`}
                                >
                                    {diff}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-400">
                        Showing {filteredQuestions.length} of {htmlCssQuestions.length} questions
                    </div>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredQuestions.map((question, index) => (
                            <motion.div
                                key={question.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all"
                            >
                                {/* Question Header */}
                                <button
                                    onClick={() => toggle(question.id)}
                                    className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                                                {question.difficulty}
                                            </span>
                                            <span className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                {question.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-1">
                                            {question.question}
                                        </h3>
                                    </div>
                                    <ChevronDown
                                        className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ${openId === question.id ? 'transform rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {/* Question Content */}
                                <AnimatePresence>
                                    {openId === question.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-t border-white/10"
                                        >
                                            <div className="p-6 space-y-6">
                                                {/* Answer */}
                                                <div>
                                                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                                        <Code className="w-5 h-5 text-blue-400" />
                                                        Explanation
                                                    </h4>
                                                    <div className="prose prose-invert prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-code:text-blue-300 max-w-none">
                                                        <ReactMarkdown>{question.answer}</ReactMarkdown>
                                                    </div>
                                                </div>

                                                {/* Code Example */}
                                                {question.codeExample && (
                                                    <div>
                                                        <div className="flex items-center justify-between mb-3">
                                                            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                                                                <Code className="w-5 h-5 text-blue-400" />
                                                                Code Example
                                                            </h4>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => runCode(question.codeExample, question.id)}
                                                                    className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors flex items-center gap-2 text-sm font-medium border border-green-500/20"
                                                                >
                                                                    <Eye className="w-4 h-4" />
                                                                    Preview code
                                                                </button>
                                                                {runOutput[question.id] && (
                                                                    <button
                                                                        onClick={() => resetOutput(question.id)}
                                                                        className="px-4 py-2 bg-gray-500/10 text-gray-400 rounded-lg hover:bg-gray-500/20 transition-colors flex items-center gap-2 text-sm font-medium border border-gray-500/20"
                                                                    >
                                                                        <RotateCcw className="w-4 h-4" />
                                                                        Close Preview
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => handleCopy(question.codeExample, question.id)}
                                                                    className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2 text-sm font-medium border border-blue-500/20"
                                                                >
                                                                    {copiedId === question.id ? (
                                                                        <>
                                                                            <Check className="w-4 h-4" />
                                                                            Copied!
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Copy className="w-4 h-4" />
                                                                            Copy
                                                                        </>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                            {/* Code Editor Side */}
                                                            <div className="rounded-xl overflow-hidden border border-white/10 h-[400px] flex flex-col">
                                                                <div className="bg-black/50 p-2 border-b border-white/10 text-xs text-gray-500 flex justify-between">
                                                                    <span>Source</span>
                                                                    <span className="text-blue-400">HTML & CSS</span>
                                                                </div>
                                                                <div className="flex-1 overflow-auto">
                                                                    <SyntaxHighlighter
                                                                        language="html"
                                                                        style={vscDarkPlus}
                                                                        customStyle={{
                                                                            margin: 0,
                                                                            borderRadius: 0,
                                                                            height: '100%',
                                                                            background: 'rgba(0, 0, 0, 0.3)'
                                                                        }}
                                                                        showLineNumbers={true}
                                                                        wrapLines={true}
                                                                    >
                                                                        {question.codeExample}
                                                                    </SyntaxHighlighter>
                                                                </div>
                                                            </div>

                                                            {/* Output Side (Visible only if ran or on large screens? No, always there but maybe placeholder or hidden) */}
                                                            {/* User requested "run it", so maybe hidden until runCode is clicked? */}
                                                            {/* I'll show it only if runOutput exists, or a placeholder */}

                                                            <div className={`rounded-xl overflow-hidden border border-white/10 h-[400px] flex flex-col bg-white ${!runOutput[question.id] ? 'justify-center items-center bg-gray-900 border-dashed' : ''}`}>
                                                                {runOutput[question.id] ? (
                                                                    <>
                                                                        <div className="bg-gray-100 p-2 border-b border-gray-200 text-xs text-gray-500 flex justify-between">
                                                                            <span>Preview</span>
                                                                            <span className="text-green-600">Live</span>
                                                                        </div>
                                                                        <iframe
                                                                            srcDoc={runOutput[question.id].html} // Rendering the HTML string
                                                                            title="Preview"
                                                                            className="w-full h-full border-none bg-white"
                                                                            sandbox="allow-scripts" // Allow scripts safely
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    <div className="text-gray-500 flex flex-col items-center">
                                                                        <Play className="w-12 h-12 mb-2 opacity-20" />
                                                                        <p>Click "Preview code" to see the result</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

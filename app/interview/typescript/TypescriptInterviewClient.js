'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, ChevronRight, Code2, Play, AlertCircle,
    CheckCircle2, Copy, Trophy, Terminal, Hash, Braces, Sparkles, BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { ArrowLeft } from 'lucide-react';
import * as Babel from '@babel/standalone';
import ReactMarkdown from 'react-markdown';

// Import Questions (You need to ensure this path exists and exports 'typescriptQuestions')
import { typescriptQuestions } from '../../lib/interview-questions/typescript';

// Syntax Highlighting
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('typescript', ts);

const CATEGORIES = [
    'All',
    'Basics & Primitives',
    'Functions & Classes',
    'Generics',
    'Advanced Types',
    'Utility Types',
    'Real World Scenarios'
];

export default function TypescriptInterview() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [codeOutput, setCodeOutput] = useState({}); // { [id]: { logs: [], error: null } }

    const filteredQuestions = useMemo(() => {
        return typescriptQuestions.filter(q => {
            const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const runCode = (questionId, code) => {
        try {
            // Transpile TS -> JS
            const jsCode = Babel.transform(code, {
                presets: ['typescript', 'env'],
                filename: 'example.ts',
            }).code;

            // Capture logs
            const logs = [];
            const mockConsole = {
                log: (...args) => logs.push(args.map(a =>
                    typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
                ).join(' ')),
                error: (...args) => logs.push('Error: ' + args.join(' ')),
                warn: (...args) => logs.push('Warn: ' + args.join(' '))
            };

            // Safe Eval
            const run = new Function('console', jsCode);
            run(mockConsole);

            setCodeOutput(prev => ({
                ...prev,
                [questionId]: { logs, error: null }
            }));

        } catch (err) {
            setCodeOutput(prev => ({
                ...prev,
                [questionId]: { logs: [], error: err.message }
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 font-sans">
            <Header />

            {/* Hero Section */}
            <div className="bg-blue-600/5 border-b border-blue-600/10 pt-24 pb-12 px-6">
                <div className="w-full mx-auto">
                    <Link href="/interview" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-bold mb-6 hover:underline">
                        <ArrowLeft size={16} /> Back to Hub
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-2xl shadow-blue-600/20">
                                <Hash size={32} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">TypeScript Mastery</h1>
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    Advanced Types, Generics, and Real World Patterns.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-blue-600/10 shadow-lg">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Questions</div>
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{typescriptQuestions.length}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8 px-6 w-full flex flex-col lg:flex-row gap-8">

                {/* Sidebar */}
                <aside className="lg:w-80 flex-shrink-0 space-y-8 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search types, generics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                        />
                    </div>

                    {/* Categories */}
                    <div className="space-y-1">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Modules</h3>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group ${selectedCategory === cat
                                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800'
                                    }`}
                            >
                                {cat}
                                {selectedCategory === cat && <ChevronRight size={14} />}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="space-y-6">
                        {filteredQuestions.map((q) => (
                            <motion.div
                                layout
                                key={q.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`bg-white dark:bg-dark-800 rounded-2xl border transition-all duration-300 overflow-hidden ${selectedQuestion === q.id
                                    ? 'border-blue-500 shadow-lg ring-1 ring-blue-500/20'
                                    : 'border-gray-200 dark:border-dark-700 hover:border-blue-300 dark:hover:border-blue-700/50'
                                    }`}
                            >
                                {/* Question Header */}
                                <div
                                    onClick={() => setSelectedQuestion(selectedQuestion === q.id ? null : q.id)}
                                    className="p-6 cursor-pointer select-none"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`mt-1 p-2 rounded-lg flex-shrink-0 ${q.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                                            q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' :
                                                'bg-red-100 text-red-700 dark:bg-red-900/30'
                                            }`}>
                                            <Hash size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{q.category}</span>
                                                <span className="text-gray-300">•</span>
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${q.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                                    q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>{q.difficulty}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                                {q.question}
                                            </h3>
                                        </div>
                                        <div className={`transition-transform duration-300 text-gray-400 ${selectedQuestion === q.id ? 'rotate-180 text-blue-500' : ''
                                            }`}>
                                            <ChevronRight />
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {selectedQuestion === q.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-gray-100 dark:border-dark-700 bg-gray-50/50 dark:bg-dark-800/50"
                                        >
                                            <div className="p-6 space-y-6">
                                                {/* Answer */}
                                                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                                                    <ReactMarkdown>{q.answer}</ReactMarkdown>
                                                </div>

                                                {/* Code Playground */}
                                                {q.codeExample && (
                                                    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                                                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
                                                            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                                                <Code2 size={14} />
                                                                <span>Live TypeScript Playground</span>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        runCode(q.id, q.codeExample);
                                                                    }}
                                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-bold transition-all active:scale-95"
                                                                >
                                                                    <Play size={12} /> Run Code
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-700">
                                                            {/* Editor */}
                                                            <div className="relative group">
                                                                <SyntaxHighlighter
                                                                    language="typescript"
                                                                    style={vscDarkPlus}
                                                                    customStyle={{ margin: 0, padding: '1.5rem', height: '100%', fontSize: '0.9rem' }}
                                                                    wrapLines={true}
                                                                >
                                                                    {q.codeExample}
                                                                </SyntaxHighlighter>
                                                            </div>

                                                            {/* Console Output */}
                                                            <div className="bg-[#1e1e1e] p-4 min-h-[200px] font-mono text-sm">
                                                                <div className="text-gray-500 text-xs mb-2 uppercase tracking-wide font-bold flex items-center gap-2">
                                                                    <Terminal size={12} /> Console Output
                                                                </div>

                                                                {codeOutput[q.id] ? (
                                                                    <>
                                                                        {codeOutput[q.id].error && (
                                                                            <div className="text-red-400 whitespace-pre-wrap mb-2 p-2 bg-red-900/20 rounded border border-red-900/50 flex gap-2">
                                                                                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                                                                {codeOutput[q.id].error}
                                                                            </div>
                                                                        )}
                                                                        {codeOutput[q.id].logs.map((log, i) => (
                                                                            <div key={i} className="text-green-400 border-b border-gray-800/50 pb-1 mb-1 last:border-0 font-medium">
                                                                                <span className="text-gray-600 mr-2 opacity-50">$</span>
                                                                                {log}
                                                                            </div>
                                                                        ))}
                                                                        {codeOutput[q.id].logs.length === 0 && !codeOutput[q.id].error && (
                                                                            <div className="text-gray-600 italic">No output returned.</div>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <div className="text-gray-600 italic">Click "Run Code" to compile TypeScript & execute...</div>
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
                    </div>
                </main>
            </div>
        </div>
    );
}

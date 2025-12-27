'use client';

import { useState, useMemo, useEffect, useCallback, useRef, memo, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../../components/Header';
import { reactInterviewQuestions } from '../../lib/interview-questions/react';
import { ArrowLeft, ChevronDown, CheckCircle, Code, Search, Bookmark, Copy, Sparkles, Filter, Play, RotateCcw, Check } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Script from 'next/script';
import * as Babel from '@babel/standalone';

export default function ReactInterviewPage() {
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
    const categories = ['All', ...new Set(reactInterviewQuestions.map(q => q.category))];
    const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Expert', 'Elite'];

    const filteredQuestions = useMemo(() => {
        return reactInterviewQuestions.filter(q => {
            const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase()) ||
                q.answer.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = activeFilter === 'All' || q.category === activeFilter;
            const matchesDifficulty = difficulty === 'All' || q.difficulty === difficulty;

            return matchesSearch && matchesCategory && matchesDifficulty;
        });
    }, [search, activeFilter, difficulty]);

    // Enhanced runCode with JSX/React support using Babel
    const runCode = (code, id) => {
        try {
            const logs = [];

            // Check if code contains JSX
            const hasJSX = code.includes('<') && (code.includes('/>') || code.includes('</'));

            let executableCode = code;

            // Transform JSX to JavaScript using Babel
            if (hasJSX) {
                try {
                    const transformed = Babel.transform(code, {
                        presets: ['react'],
                        plugins: [],
                    });
                    executableCode = transformed.code;
                } catch (babelError) {
                    // If Babel fails, try to run as plain JS
                    console.log('Babel transform failed, running as plain JS');
                }
            }

            // Create execution environment with React hooks simulation
            const wrappedCode = `
                const _logs = [];
                const _log = (...args) => _logs.push(args.map(a => 
                    typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
                ).join(' '));
                
                // Console mock
                const console = { log: _log, error: _log, warn: _log };
                
                // React hooks simulation for demo purposes
                const React = {
                    createElement: (type, props, ...children) => ({
                        type,
                        props: { ...props, children: children.length === 1 ? children[0] : children }
                    }),
                    useState: (initial) => {
                        const val = typeof initial === 'function' ? initial() : initial;
                        return [val, (newVal) => { _log('setState called with:', typeof newVal === 'function' ? 'function' : newVal); }];
                    },
                    useEffect: (fn, deps) => {
                        _log('useEffect registered' + (deps ? ' with ' + deps.length + ' deps' : ''));
                        const cleanup = fn();
                        if (cleanup) _log('Cleanup function registered');
                    },
                    useMemo: (fn, deps) => {
                        _log('useMemo computed' + (deps ? ' with ' + deps.length + ' deps' : ''));
                        return fn();
                    },
                    useCallback: (fn, deps) => {
                        _log('useCallback memoized' + (deps ? ' with ' + deps.length + ' deps' : ''));
                        return fn;
                    },
                    useRef: (initial) => {
                        _log('useRef created with:', initial);
                        return { current: initial };
                    },
                    useContext: (ctx) => {
                        _log('useContext called');
                        return ctx._currentValue || {};
                    },
                    createContext: (defaultValue) => {
                        _log('createContext created');
                        return { Provider: ({children}) => children, Consumer: () => null, _currentValue: defaultValue };
                    },
                    memo: (component) => {
                        _log('React.memo wrapper created');
                        return component;
                    },
                    lazy: (fn) => {
                        _log('React.lazy registered');
                        return { _lazy: true };
                    },
                    Suspense: ({ children, fallback }) => {
                        _log('Suspense boundary: fallback =', typeof fallback);
                        return children;
                    },
                    Fragment: ({ children }) => children
                };
                
                // Destructure for convenience
                const { useState, useEffect, useMemo, useCallback, useRef, useContext, createContext, memo, lazy, Suspense } = React;
                
                // Import mock
                function require(module) {
                    if (module === 'react') return React;
                    return {};
                }
                
                // Execute and capture result
                const _result = (() => {
                    ${executableCode}
                })();
                
                // Return both logs and result
                return { logs: _logs, result: _result };
            `;

            const { logs: capturedLogs, result } = new Function(wrappedCode)();

            // Combine captured logs
            const allLogs = [...logs, ...capturedLogs];

            // Add return value if it exists and isn't undefined
            if (result !== undefined) {
                const resultStr = typeof result === 'object'
                    ? JSON.stringify(result, null, 2)
                    : String(result);
                allLogs.push(`→ ${resultStr}`);
            }

            setRunOutput(prev => ({
                ...prev,
                [id]: allLogs.length ? allLogs.join('\n') : "✓ Code executed successfully"
            }));
        } catch (e) {
            setRunOutput(prev => ({ ...prev, [id]: `❌ Error: ${e.message}` }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-white transition-colors duration-300">
            <Header />

            <div className="bg-cyan-500/10 border-b border-cyan-500/10 pt-24 pb-12 px-4">
                <div className="w-full max-w-[98%] mx-auto">
                    <Link href="/interview" className="inline-flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 font-bold mb-6 hover:underline">
                        <ArrowLeft size={16} /> Back to Hub
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">React Interview Prep</h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Expert-Level Questions with Working JSX Examples. FAANG Ready.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-cyan-500/20 shadow-lg">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Questions</div>
                            <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">{reactInterviewQuestions.length}+</div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="w-full max-w-[98%] mx-auto px-4 py-8">

                {/* JSX Support Notice */}
                <div className="mb-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                            <Code size={20} className="text-cyan-500" />
                        </div>
                        <div>
                            <div className="font-bold text-cyan-600 dark:text-cyan-400">🚀 Live JSX Execution</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Code examples include React hooks simulation. Click "Run" to see how each concept works!
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search & Filter Container */}
                <div className="sticky top-20 z-10 bg-gray-50/95 dark:bg-dark-900/95 backdrop-blur-xl py-4 mb-8 -mx-4 px-4 border-b border-gray-200 dark:border-dark-700">
                    <div className="flex flex-col gap-4">
                        {/* Search Bar */}
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search questions (e.g., 'hooks', 'performance', 'fiber')..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                            />
                        </div>

                        {/* Filter Bar */}
                        <div className="flex flex-col gap-3">
                            {/* Categories */}
                            <div className="flex flex-wrap gap-2">
                                <span className="text-sm font-bold text-gray-400 py-2 mr-2">Topics:</span>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveFilter(cat)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeFilter === cat
                                            ? 'bg-cyan-500 text-white'
                                            : 'bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-300'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Difficulties */}
                            <div className="flex flex-wrap gap-2 items-center border-t border-gray-100 dark:border-gray-800 pt-2">
                                <span className="text-sm font-bold text-gray-400 mr-2">Level:</span>
                                {difficulties.map(diff => (
                                    <button
                                        key={diff}
                                        onClick={() => setDifficulty(diff)}
                                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all border ${difficulty === diff
                                            ? diff === 'Elite' ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20' : 'bg-gray-800 text-white border-gray-800 shadow-md'
                                            : 'bg-transparent border-gray-200 dark:border-dark-700 text-gray-500 hover:border-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                            }`}
                                    >
                                        {diff}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                    {filteredQuestions.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            No questions found matching your search.
                        </div>
                    ) : (
                        filteredQuestions.map((q, index) => (
                            <motion.div
                                key={q.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`bg-white dark:bg-dark-800 rounded-2xl border transition-all duration-300 ${openId === q.id
                                    ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                                    : 'border-gray-200 dark:border-dark-700 hover:border-cyan-500/30'
                                    }`}
                            >
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => toggle(q.id)}
                                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle(q.id)}
                                    className="w-full text-left p-6 flex items-start gap-4 cursor-pointer outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-t-2xl"
                                >
                                    <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${q.difficulty === 'Easy' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                                        q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                            q.difficulty === 'Elite' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                                                'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                        {q.difficulty[0]}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                            {q.question}
                                        </h3>
                                        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                            <span className="bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded">{q.category}</span>
                                            <span>ID: {q.id}</span>
                                        </div>
                                    </div>
                                    <ChevronDown
                                        className={`text-gray-400 transition-transform duration-300 ${openId === q.id ? 'rotate-180' : ''}`}
                                    />
                                </div>

                                {openId === q.id && (
                                    <div className="overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                                        <div className="px-6 pb-6 pt-0">
                                            <div className="pt-6 border-t border-gray-100 dark:border-dark-700">
                                                {/* Markdown Rendering */}
                                                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                                                    <ReactMarkdown
                                                        components={{
                                                            strong: ({ node, ...props }) => <strong className="text-gray-900 dark:text-white font-bold" {...props} />,
                                                            code: ({ node, inline, className, children, ...props }) => {
                                                                return inline ? (
                                                                    <code className="bg-gray-100 dark:bg-dark-700 px-1 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400 font-mono" {...props}>
                                                                        {children}
                                                                    </code>
                                                                ) : (
                                                                    <code className={className} {...props}>
                                                                        {children}
                                                                    </code>
                                                                )
                                                            }
                                                        }}
                                                    >
                                                        {q.answer}
                                                    </ReactMarkdown>
                                                </div>

                                                {q.codeExample && (
                                                    <div className="mt-4 relative group">
                                                        {/* Floating Actions */}
                                                        <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleCopy(q.codeExample, q.id);
                                                                }}
                                                                className={`px-3 py-1.5 font-bold text-xs rounded-lg flex items-center gap-1 shadow-lg transition-all ${copiedId === q.id
                                                                    ? 'bg-green-500 text-white'
                                                                    : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                                                                    }`}
                                                            >
                                                                {copiedId === q.id ? <Check size={12} /> : <Copy size={12} />}
                                                                {copiedId === q.id ? 'Copied!' : 'Copy'}
                                                            </button>

                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    runCode(q.codeExample, q.id);
                                                                }}
                                                                className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs rounded-lg flex items-center gap-1 shadow-lg shadow-cyan-500/20 transition-all"
                                                            >
                                                                <Play size={12} fill="currentColor" /> Run
                                                            </button>
                                                        </div>

                                                        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 relative">
                                                            <SyntaxHighlighter
                                                                language="jsx"
                                                                style={vscDarkPlus}
                                                                customStyle={{
                                                                    margin: 0,
                                                                    padding: '1.5rem',
                                                                    fontSize: '0.875rem',
                                                                    lineHeight: '1.5',
                                                                    backgroundColor: '#1E1E1E',
                                                                }}
                                                                showLineNumbers={true}
                                                                wrapLines={true}
                                                            >
                                                                {q.codeExample}
                                                            </SyntaxHighlighter>
                                                        </div>

                                                        {runOutput[q.id] !== undefined && (
                                                            <div className="mt-2 bg-black rounded-lg border border-gray-800 overflow-hidden">
                                                                <div className="flex items-center justify-between px-3 py-1 bg-gray-900 border-b border-gray-800">
                                                                    <span className="text-[10px] uppercase font-bold text-gray-500">Console Output</span>
                                                                    <button
                                                                        onClick={() => setRunOutput(prev => {
                                                                            const next = { ...prev };
                                                                            delete next[q.id];
                                                                            return next;
                                                                        })}
                                                                        className="text-gray-500 hover:text-white"
                                                                    >
                                                                        <RotateCcw size={10} />
                                                                    </button>
                                                                </div>
                                                                <div className="p-3 text-xs font-mono text-green-400 whitespace-pre-wrap">
                                                                    {runOutput[q.id]}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="mt-6 flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 font-medium bg-cyan-50 dark:bg-cyan-900/10 px-4 py-3 rounded-lg border border-cyan-100 dark:border-cyan-900/20">
                                                    <Sparkles size={16} />
                                                    <strong>Pro Tip:</strong> Understanding the "why" behind React patterns impresses interviewers!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

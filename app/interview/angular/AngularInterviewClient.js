'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../../components/Header';
import { angularInterviewQuestions } from '../../lib/interview-questions/angular';
import { ArrowLeft, ChevronDown, Code, Search, Filter, Play, RotateCcw, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as Babel from '@babel/standalone';

export default function AngularInterviewPage() {
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
    const categories = ['All', ...new Set(angularInterviewQuestions.map(q => q.category))];
    const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Expert', 'Elite'];

    const filteredQuestions = useMemo(() => {
        return angularInterviewQuestions.filter(q => {
            const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase()) ||
                q.answer.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = activeFilter === 'All' || q.category === activeFilter;
            const matchesDifficulty = difficulty === 'All' || q.difficulty === difficulty;

            return matchesSearch && matchesCategory && matchesDifficulty;
        });
    }, [search, activeFilter, difficulty]);

    // Enhanced Angular Code Runner with TypeScript support
    const runCode = (code, id) => {
        try {
            setRunOutput(prev => ({ ...prev, [id]: { loading: true } }));

            const logs = [];
            let executableCode = code;

            // Transform TypeScript to JavaScript using Babel
            try {
                // Check if Babel is available (it should be imported)
                if (typeof Babel !== 'undefined') {
                    const transformed = Babel.transform(code, {
                        filename: 'file.ts',
                        presets: ['typescript'],
                        plugins: [['proposal-decorators', { legacy: true }], 'proposal-class-properties'],
                    });
                    executableCode = transformed.code;
                }
            } catch (babelError) {
                logs.push({ type: 'warn', content: `Transpilation warning: ${babelError.message}. Running as JS.` });
            }

            // Create simulation environment
            const wrappedCode = `
                const _logs = [];
                const _log = (...args) => _logs.push({ type: 'log', content: args.map(a => 
                    typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
                ).join(' ') });
                
                const console = { 
                    log: _log, 
                    error: (...args) => _logs.push({ type: 'error', content: args.join(' ') }), 
                    warn: (...args) => _logs.push({ type: 'warn', content: args.join(' ') }) 
                };

                // --- Angular Mocks ---
                
                // Signal Implementation
                function signal(initialValue) {
                    let _val = initialValue;
                    const s = () => _val;
                    s.set = (v) => { _val = v; _log('[Signal] Set:', v); };
                    s.update = (fn) => { _val = fn(_val); _log('[Signal] Update:', _val); };
                    s.asReadonly = () => () => _val;
                    return s;
                }
                
                function computed(fn) {
                    return () => {
                        const val = fn();
                        // _log('[Computed] Derived:', val);
                        return val;
                    };
                }
                
                function effect(fn) {
                    _log('[Effect] Registered');
                    setTimeout(() => {
                        _log('[Effect] Triggered');
                        fn();
                    }, 0);
                }

                // Decorators (No-op or Logging)
                function Component(config) {
                    return (target) => {
                        _log('[Component] @Component ' + target.name + ' created with selector: ' + config.selector);
                        // Attach config to class for inspection
                        target.__config__ = config;
                        return target;
                    };
                }

                function Directive(config) {
                    return (target) => {
                        _log('[Directive] @Directive ' + target.name + ' registered');
                        return target;
                    };
                }

                function Injectable(config) {
                    return (target) => {
                        // _log('[Injectable] @Injectable ' + target.name + ' registered');
                        return target;
                    };
                }
                
                function Input() { return (t, k) => { t[k] = undefined; }; }
                function Output() { return (t, k) => { t[k] = new EventEmitter(); }; }

                // DI
                const _providers = new Map();
                function inject(token) {
                    if (_providers.has(token)) return _providers.get(token);
                    // Simple mock return or instantiation if it's a class
                    try {
                        if (typeof token === 'function') {
                             const instance = new token();
                             _providers.set(token, instance);
                             return instance;
                        }
                    } catch (e) {}
                    return { name: token.name || 'MockService', get: () => 'MockValue' };
                }

                // Utilities
                class EventEmitter {
                    emit(val) { _log('[EventEmitter] Emitted:', val); }
                    subscribe(fn) { _log('[EventEmitter] Subscribed'); fn('MockEvent'); }
                }

                // RxJS Mocks (Basic)
                const of = (val) => ({ subscribe: (fn) => fn(val), pipe: () => of(val) });
                const map = (fn) => (source) => ({ subscribe: (sub) => source.subscribe(v => sub(fn(v))) });
                const tap = (fn) => (source) => ({ subscribe: (sub) => source.subscribe(v => { fn(v); sub(v); }) });
                const BehaviorSubject = class {
                    constructor(v) { this.val = v; }
                    next(v) { this.val = v; _log('[BehaviorSubject] Next:', v); }
                    subscribe(fn) { fn(this.val); return { unsubscribe: () => {} }; }
                    asObservable() { return this; }
                };
                const Subject = class {
                    next(v) { _log('[Subject] Next:', v); }
                    subscribe(fn) { return { unsubscribe: () => {} }; }
                    asObservable() { return this; }
                };

                // Browser Mocks
                const localStorage = {
                    getItem: (k) => _log('[localStorage] Get:', k),
                    setItem: (k, v) => _log('[localStorage] Set:', k, v)
                };

                // Expose to execution scope
                const Angular = { 
                    signal, computed, effect, 
                    Component, Injectable, Directive, Input, Output, 
                    inject, EventEmitter 
                };

                // --- End Mocks ---

                // Execute User Code
                try {
                    ${executableCode}
                    
                    // Auto-instantiate check
                    // If the user defined a class ending in component, try to new it? 
                    // No, let's rely on the user code to be complete or use console.log
                } catch (err) {
                    _log('[Runtime Error]', err.message);
                }

                return _logs;
            `;

            const results = new Function(wrappedCode)();

            setRunOutput(prev => ({
                ...prev,
                [id]: {
                    loading: false,
                    logs: results,
                    success: !results.some(l => l.type === 'error')
                }
            }));

        } catch (error) {
            setRunOutput(prev => ({
                ...prev,
                [id]: {
                    loading: false,
                    logs: [{ type: 'error', content: `System Error: ${error.message}` }],
                    success: false
                }
            }));
        }
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
            <div className="relative overflow-hidden bg-gradient-to-r from-red-600/10 via-pink-600/10 to-purple-600/10 border-b border-red-500/20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-6 py-16 relative">
                    <Link href="/interview" className="inline-flex items-center text-red-400 hover:text-red-300 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Interview Prep
                    </Link>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                            <svg className="w-12 h-12 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9.93 12.645h4.134L12 8.587l-2.07 4.058zm8.376 3.027l-1.917-3.772H20.4L12 1.863 3.6 15.9h4.011l-1.917 3.772L12 23.937l6.306-4.265z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-5xl font-bold text-white mb-2">
                                Angular Interview Questions
                            </h1>
                            <p className="text-xl text-gray-300">
                                100 Elite Questions • Angular 18+ • Signals • Zoneless • TypeScript
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-6">
                        <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                            <span className="text-gray-400 text-sm">Total Questions:</span>
                            <span className="text-white font-bold ml-2">{angularInterviewQuestions.length}</span>
                        </div>
                        <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                            <span className="text-gray-400 text-sm">Categories:</span>
                            <span className="text-white font-bold ml-2">{categories.length - 1}</span>
                        </div>
                        <div className="px-4 py-2 bg-red-500/10 rounded-lg border border-red-500/20">
                            <span className="text-red-300 text-sm">✨ Runnable Code Examples</span>
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
                            placeholder="Search questions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
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
                                        ? 'bg-red-500 text-white'
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
                        Showing {filteredQuestions.length} of {angularInterviewQuestions.length} questions
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
                                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-red-500/30 transition-all"
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
                                            <span className="px-3 py-1 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
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
                                                        <Code className="w-5 h-5 text-red-400" />
                                                        Explanation
                                                    </h4>
                                                    <div className="prose prose-invert prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-code:text-red-300 max-w-none">
                                                        <ReactMarkdown>{question.answer}</ReactMarkdown>
                                                    </div>
                                                </div>

                                                {/* Code Example */}
                                                {question.codeExample && (
                                                    <div>
                                                        <div className="flex items-center justify-between mb-3">
                                                            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                                                                <Code className="w-5 h-5 text-red-400" />
                                                                Code Example
                                                            </h4>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => runCode(question.codeExample, question.id)}
                                                                    className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors flex items-center gap-2 text-sm font-medium border border-green-500/20"
                                                                >
                                                                    <Play className="w-4 h-4" />
                                                                    Run Code
                                                                </button>
                                                                {runOutput[question.id] && (
                                                                    <button
                                                                        onClick={() => resetOutput(question.id)}
                                                                        className="px-4 py-2 bg-gray-500/10 text-gray-400 rounded-lg hover:bg-gray-500/20 transition-colors flex items-center gap-2 text-sm font-medium border border-gray-500/20"
                                                                    >
                                                                        <RotateCcw className="w-4 h-4" />
                                                                        Reset
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
                                                        <div className="rounded-xl overflow-hidden border border-white/10">
                                                            <SyntaxHighlighter
                                                                language="typescript"
                                                                style={vscDarkPlus}
                                                                customStyle={{
                                                                    margin: 0,
                                                                    borderRadius: 0,
                                                                    background: 'rgba(0, 0, 0, 0.3)'
                                                                }}
                                                            >
                                                                {question.codeExample}
                                                            </SyntaxHighlighter>
                                                        </div>

                                                        {/* Output */}
                                                        {runOutput[question.id] && (
                                                            <div className="mt-4">
                                                                <h5 className="text-sm font-semibold text-gray-300 mb-2">Output:</h5>
                                                                <div className="bg-black/50 rounded-xl p-4 border border-white/10 font-mono text-sm">
                                                                    {runOutput[question.id].loading ? (
                                                                        <div className="text-gray-400">Running...</div>
                                                                    ) : (
                                                                        <div className="space-y-1">
                                                                            {runOutput[question.id].logs.map((log, i) => (
                                                                                <div
                                                                                    key={i}
                                                                                    className={`${log.type === 'error'
                                                                                        ? 'text-red-400'
                                                                                        : log.type === 'warn'
                                                                                            ? 'text-yellow-400'
                                                                                            : 'text-green-400'
                                                                                        }`}
                                                                                >
                                                                                    {log.content}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
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

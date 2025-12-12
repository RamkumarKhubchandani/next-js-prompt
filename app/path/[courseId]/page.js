"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSES } from '../../lib/courses/index';
import { Lock, CheckCircle, PlayCircle, ChevronRight, HelpCircle, BookOpen, Code, Brain, Youtube, Scale, Copy, Check, Play, RotateCcw } from 'lucide-react';
import { useSession } from 'next-auth/react';
import CompleteButton from '../../components/public/CompleteButton';
import CodeComparison from '../../components/public/CodeComparison';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

// React Live Editor Component - Simple version
function ReactLiveEditor({ initialCode }) {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(initialCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    // Clean up any existing render calls
    let cleanCode = initialCode
        .replace(/ReactDOM\.createRoot.*render\(.*\);?/gs, '')
        .replace(/ReactDOM\.render\(.*\);?/gs, '')
        .replace(/render\s*\(\s*<App\s*\/>\s*\)\s*;?/g, '')
        .trim();
    
    // Check if code has multiple top-level declarations (needs noInline)
    // Count function/const declarations at start of lines
    const hasMultipleDeclarations = (cleanCode.match(/^(const |function |class )/gm) || []).length > 1;
    
    // If multiple declarations, add render() call for noInline mode
    if (hasMultipleDeclarations && !cleanCode.includes('render(')) {
        cleanCode = cleanCode + '\n\nrender(<App />);';
    }
    
    return (
        <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Code className="text-blue-400" /> 
                Live Lab: Try It Yourself
                <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                    React
                </span>
            </h3>
            <div className="rounded-xl overflow-hidden border border-dark-600 shadow-2xl">
                <LiveProvider 
                    code={cleanCode} 
                    noInline={hasMultipleDeclarations}
                    scope={{ React }}
                >
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-700">
                        <span className="text-xs font-mono text-light-400">App.jsx</span>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-light-300 hover:text-white bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                        >
                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    
                    {/* Code Editor */}
                    <div className="bg-[#1a1a2e] text-sm font-mono">
                        <LiveEditor 
                            style={{
                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                fontSize: '14px',
                                padding: '16px',
                                minHeight: '200px',
                                backgroundColor: '#1a1a2e',
                            }}
                        />
                    </div>
                    
                    {/* Error Display */}
                    <LiveError 
                        style={{
                            padding: '12px 16px',
                            backgroundColor: '#2d1f1f',
                            color: '#ff6b6b',
                            fontFamily: 'monospace',
                            fontSize: '13px',
                            borderTop: '1px solid #4a3333',
                        }}
                    />
                    
                    {/* Live Preview */}
                    <div className="bg-dark-900 border-t border-dark-600">
                        <div className="px-4 py-2 text-xs font-mono text-light-300 border-b border-dark-700 flex items-center gap-2 bg-dark-800">
                            <span className="text-blue-400">●</span> Live Preview
                        </div>
                        <div className="p-4 min-h-[120px] bg-white text-gray-900">
                            <LivePreview />
                        </div>
                    </div>
                </LiveProvider>
            </div>
            <p className="mt-3 text-sm text-light-400 flex items-center gap-2">
                <span className="text-blue-400">⚡</span>
                Edit the code above - changes appear instantly!
            </p>
        </div>
    );
}

// JavaScript Live Code Editor with iframe execution
function LiveCodeEditor({ initialCode }) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState([]);
    const [copied, setCopied] = useState(false);
    const iframeRef = useRef(null);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    const handleReset = () => {
        setCode(initialCode);
        setOutput([]);
    };
    
    const handleRun = () => {
        setOutput([]);
        
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <script>
                    ['log', 'error', 'warn', 'info'].forEach(method => {
                        console[method] = (...args) => {
                            const formatted = args.map(arg => {
                                if (typeof arg === 'object') {
                                    try { return JSON.stringify(arg, null, 2); }
                                    catch { return String(arg); }
                                }
                                return String(arg);
                            }).join(' ');
                            window.parent.postMessage({ type: 'console', method, content: formatted }, '*');
                        };
                    });
                    window.onerror = (msg, url, line) => {
                        window.parent.postMessage({ type: 'console', method: 'error', content: msg + ' (line ' + line + ')' }, '*');
                        return true;
                    };
                </script>
            </head>
            <body>
                <script>
                    try {
                        ${code}
                    } catch(e) {
                        console.error(e.message);
                    }
                </script>
            </body>
            </html>
        `;
        
        if (iframeRef.current) {
            iframeRef.current.srcdoc = html;
        }
    };
    
    // Listen for console messages from iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === 'console') {
                setOutput(prev => [...prev, {
                    method: event.data.method,
                    content: event.data.content
                }]);
            }
        };
        
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);
    
    return (
        <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Code className="text-blue-400" /> 
                Live Lab: Try It Yourself
            </h3>
            <div className="rounded-xl overflow-hidden border border-dark-600 shadow-2xl">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-700">
                    <span className="text-xs font-mono text-light-400">index.js</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-light-300 hover:text-white bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                        >
                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-light-300 hover:text-white bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                        >
                            <RotateCcw size={14} />
                            Reset
                        </button>
                        <button
                            onClick={handleRun}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-dark-900 bg-green-500 hover:bg-green-400 rounded-lg transition-colors"
                        >
                            <Play size={14} fill="currentColor" />
                            Run
                        </button>
                    </div>
                </div>
                
                {/* Code Editor (textarea) */}
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck={false}
                    className="w-full h-64 p-4 bg-[#1a1a2e] text-light-100 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    style={{ tabSize: 2 }}
                />
                
                {/* Console Output */}
                <div className="bg-dark-900 border-t border-dark-600">
                    <div className="px-4 py-2 text-xs font-mono text-light-300 border-b border-dark-700 flex items-center gap-2 bg-dark-800">
                        <span className="text-green-400">●</span> Console Output
                    </div>
                    <div className="h-40 overflow-y-auto p-4 font-mono text-sm space-y-1">
                        {output.length === 0 ? (
                            <span className="text-light-500 italic">Click "Run" to see output...</span>
                        ) : (
                            output.map((item, i) => (
                                <div 
                                    key={i} 
                                    className={`${
                                        item.method === 'error' ? 'text-red-400' :
                                        item.method === 'warn' ? 'text-yellow-400' :
                                        'text-green-300'
                                    }`}
                                >
                                    {item.content}
                                </div>
                            ))
                        )}
                    </div>
                </div>
                
                {/* Hidden iframe for JS execution */}
                <iframe 
                    ref={iframeRef}
                    sandbox="allow-scripts"
                    style={{ display: 'none' }}
                    title="Code Execution"
                />
            </div>
        </div>
    );
}

export default function LearningPathPage() {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const courseId = params.courseId;
    const course = COURSES[courseId];

    const [activeDay, setActiveDay] = useState(courseId === 'react' || courseId === 'fullstack' ? 0 : 1);
    const [completedDays, setCompletedDays] = useState([]); 

    if (!course) return <div className="text-white p-10">Course not found</div>;

    const activeContent = course.days.find(d => d.day === activeDay) || course.days[0];

    return (
        <div className="min-h-screen bg-dark-900 text-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Header */}
                <div className="mb-12">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-brand-primary uppercase bg-brand-primary/10 rounded-full border border-brand-primary/20">
                        Professional Track
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-blue-400 to-purple-500">
                        {course.title}
                    </h1>
                    <p className="text-xl text-light-300 max-w-3xl leading-relaxed">{course.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Sidebar: Timeline (3 Columns) */}
                    <div className="lg:col-span-3">
                        <div className="bg-dark-800 rounded-2xl border border-dark-700 p-6 h-[calc(100vh-120px)] sticky top-24 overflow-y-auto custom-scrollbar">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white">
                                <BookOpen className="text-brand-primary" size={20} /> Curriculum
                            </h3>
                            <div className="space-y-2 relative">
                                {/* Connecting Line */}
                                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-dark-700 z-0"></div>

                                {course.days.map((day) => (
                                    <button
                                        key={day.day}
                                        onClick={() => setActiveDay(day.day)}
                                        className={`relative z-10 w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left group ${
                                            activeDay === day.day 
                                                ? 'bg-brand-primary/10 border border-brand-primary/50 shadow-[0_0_15px_rgba(0,255,150,0.1)]' 
                                                : 'hover:bg-dark-700 border border-transparent'
                                        }`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm transition-colors ${
                                            activeDay === day.day 
                                                ? 'bg-brand-primary text-dark-900 shadow-lg shadow-brand-primary/50' 
                                                : 'bg-dark-600 text-light-400 group-hover:bg-dark-500'
                                        }`}>
                                            {day.day}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-bold text-sm truncate ${activeDay === day.day ? 'text-white' : 'text-light-300 group-hover:text-white'}`}>
                                                {day.title}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                                
                                {/* Locked Days Placeholder */}
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="relative z-10 w-full flex items-center gap-4 p-3 rounded-xl opacity-40 cursor-not-allowed">
                                        <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center shrink-0 text-light-500 border border-dark-600">
                                            <Lock size={12} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-light-500">Day {course.days.length + i + 1}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content (9 Columns) */}
                    <div className="lg:col-span-9 space-y-8">
                        
                        {/* Lesson Header */}
                        <motion.div 
                            key={activeDay}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-dark-800 rounded-2xl p-8 border border-dark-700 shadow-xl"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-8 border-b border-dark-700">
                                <div>
                                    <span className="text-brand-primary font-mono text-xs font-bold tracking-widest uppercase bg-brand-primary/10 px-2 py-1 rounded">Day {activeDay}</span>
                                    <h2 className="text-3xl font-bold text-white mt-3">{activeContent.title}</h2>
                                </div>
                                <CompleteButton postId={`${courseId}-day-${activeDay}`} />
                            </div>
                            
                            <div className="p-6 bg-brand-primary/5 rounded-xl border-l-4 border-brand-primary mb-10">
                                <p className="text-lg text-light-100 italic leading-relaxed">
                                    "{activeContent.intro}"
                                </p>
                            </div>

                            {/* Video Section (If Available) */}
                            {activeContent.video && (
                                <div className="mb-12">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <Youtube className="text-red-500" /> 
                                        Video Guide
                                    </h3>
                                    <div className="aspect-video rounded-xl overflow-hidden border border-dark-600 shadow-2xl bg-black">
                                        <iframe 
                                            width="100%" 
                                            height="100%" 
                                            src={`https://www.youtube.com/embed/${activeContent.video}`} 
                                            title="YouTube video player" 
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                            {/* Theory Content */}
                            <div className="prose prose-invert max-w-none mb-12 text-light-200">
                                <div dangerouslySetInnerHTML={{ __html: activeContent.content }} />
                            </div>

                            {/* AI vs Junior Comparison */}
                            {activeContent.comparison && (
                                <div className="mb-12">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <Scale className="text-purple-400" /> 
                                        The "Zero to Architect" Diff
                                    </h3>
                                    <p className="text-light-400 mb-6">
                                        See how a Junior Developer writes this vs. how an AI Architect refactors it for production.
                                    </p>
                                    <CodeComparison 
                                        juniorCode={activeContent.comparison.junior} 
                                        seniorCode={activeContent.comparison.senior} 
                                    />
                                </div>
                            )}

                            {/* Live Code Lab */}
                            {activeContent.code && (
                                courseId === 'react' 
                                    ? <ReactLiveEditor initialCode={activeContent.code} />
                                    : <LiveCodeEditor initialCode={activeContent.code} />
                            )}

                            {/* Interview Prep */}
                            {activeContent.interview && (
                                <div className="bg-gradient-to-br from-dark-700 to-dark-800 rounded-2xl p-1 border border-purple-500/30 shadow-lg">
                                    <div className="bg-dark-800 rounded-xl p-8">
                                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                            <Brain className="text-purple-400" /> 
                                            Senior Engineer Interview Prep
                                        </h3>
                                        
                                        <div className="space-y-4">
                                            {activeContent.interview.questions.map((q, i) => (
                                                <div key={i} className="border border-dark-600 rounded-xl overflow-hidden">
                                                    <details className="group">
                                                        <summary className="flex justify-between items-center p-4 cursor-pointer bg-dark-700/50 hover:bg-dark-700 transition">
                                                            <span className="font-bold text-light-100 pr-4">Q{i+1}: {q.q}</span>
                                                            <ChevronRight className="text-brand-primary group-open:rotate-90 transition-transform shrink-0" />
                                                        </summary>
                                                        <div className="p-6 bg-dark-900/50 text-light-300 leading-relaxed border-t border-dark-600">
                                                            <span className="text-purple-400 font-bold text-xs uppercase tracking-wider mb-2 block">Answer Strategy</span>
                                                            {q.a}
                                                        </div>
                                                    </details>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
}
"use client";
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSES } from '../../lib/courses/index';
import { Lock, CheckCircle, PlayCircle, ChevronRight, HelpCircle, BookOpen, Code, Brain, Youtube, Scale, Copy, Check, Play, RotateCcw } from 'lucide-react';
import { useSession } from 'next-auth/react';
import CompleteButton from '../../components/public/CompleteButton';
import CodeComparison from '../../components/public/CodeComparison';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

function progressKey(courseId, day) {
    return `asio:path:${courseId}:day:${day}:progress`;
}

function safeJsonParse(value, fallback) {
    try { return JSON.parse(value); } catch { return fallback; }
}

function loadDayProgress(courseId, day) {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(progressKey(courseId, day));
    if (!raw) return null;
    return safeJsonParse(raw, null);
}

function saveDayProgress(courseId, day, progress) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(progressKey(courseId, day), JSON.stringify(progress));
}

function slugifyId(input) {
    const s = String(input ?? '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return s || 'item';
}

function getMasteryChecklistItems(dayObj) {
    // Preferred: author-provided checklist
    const raw = dayObj?.masteryChecklist;
    if (Array.isArray(raw) && raw.length > 0) {
        return raw
            .map((it, idx) => {
                if (typeof it === 'string') {
                    return { id: `m-${idx}-${slugifyId(it).slice(0, 24)}`, text: it };
                }
                const text = it?.text ?? it?.label ?? '';
                if (!text) return null;
                const id = it?.id ? String(it.id) : `m-${idx}-${slugifyId(text).slice(0, 24)}`;
                return { id, text };
            })
            .filter(Boolean);
    }

    // Fallback: derive from recap.takeaways
    const takeaways = dayObj?.recap?.takeaways;
    if (Array.isArray(takeaways) && takeaways.length > 0) {
        return takeaways
            .slice(0, 5)
            .map((t, idx) => ({ id: `auto-${idx}-${slugifyId(t).slice(0, 24)}`, text: String(t) }));
    }

    return [];
}

function MasteryChecklist({ items = [], progress, onProgress }) {
    if (!Array.isArray(items) || items.length === 0) return null;
    const doneCount = items.reduce((acc, it) => acc + (progress?.masteryChecklist?.[it.id] ? 1 : 0), 0);

    return (
        <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-400" />
                End-of-day mastery checklist
                <span className="text-sm font-bold text-light-300 ml-2">
                    ({doneCount}/{items.length})
                </span>
            </h3>
            <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5 space-y-3">
                {items.map((it) => {
                    const checked = !!progress?.masteryChecklist?.[it.id];
                    return (
                        <label key={it.id} className="flex items-start gap-3 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                    onProgress?.({ type: 'mastery_toggle', itemId: it.id, value: e.target.checked });
                                }}
                                className="mt-1 accent-green-400"
                            />
                            <span className={`text-light-200 ${checked ? 'line-through opacity-80' : ''}`}>
                                {it.text}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

function LearningCheckpoints({ courseId, day, checkpoints = [], progress, onProgress }) {
    const [answers, setAnswers] = useState({});

    if (!Array.isArray(checkpoints) || checkpoints.length === 0) return null;

    return (
        <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <HelpCircle className="text-yellow-400" />
                Checkpoints: Prove You Understand
            </h3>

            <div className="space-y-4">
                {checkpoints.map((c, idx) => {
                    const selected = answers[idx];
                    const isAnswered = selected !== undefined;
                    const isCorrect = isAnswered && selected === c.correctIndex;

                    return (
                        <div key={idx} className="border border-dark-600 rounded-xl overflow-hidden bg-dark-800">
                            <div className="p-5 border-b border-dark-700">
                                <div className="flex items-start justify-between gap-4">
                                    <p className="font-bold text-light-100">
                                        {idx + 1}. {c.prompt}
                                    </p>
                                    {isAnswered && (
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full border ${
                                            isCorrect
                                                ? 'text-green-300 bg-green-500/10 border-green-500/30'
                                                : 'text-red-300 bg-red-500/10 border-red-500/30'
                                        }`}>
                                            {isCorrect ? 'Correct' : 'Not quite'}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-5 space-y-3">
                                <div className="grid md:grid-cols-2 gap-3">
                                    {(c.options || []).map((opt, optIdx) => {
                                        const picked = selected === optIdx;
                                        const showCorrect = isAnswered && optIdx === c.correctIndex;
                                        const showWrongPicked = isAnswered && picked && optIdx !== c.correctIndex;

                                        return (
                                            <button
                                                key={optIdx}
                                                onClick={() => setAnswers(prev => ({ ...prev, [idx]: optIdx }))}
                                                onMouseUp={() => {
                                                    // Sticky mastery: once correct, it stays correct even if user clicks other options later.
                                                    const isNowCorrect = optIdx === c.correctIndex;
                                                    if (!courseId && courseId !== '') return;
                                                    if (typeof day !== 'number') return;
                                                    if (!isNowCorrect) return;

                                                    onProgress?.({
                                                        type: 'checkpoint_correct',
                                                        checkpointIndex: idx
                                                    });
                                                }}
                                                className={`text-left w-full p-3 rounded-xl border transition ${
                                                    picked
                                                        ? 'border-brand-primary/60 bg-brand-primary/10'
                                                        : 'border-dark-600 bg-dark-900/30 hover:bg-dark-700'
                                                } ${showCorrect ? 'ring-1 ring-green-500/40' : ''} ${showWrongPicked ? 'ring-1 ring-red-500/40' : ''}`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                                                        showCorrect
                                                            ? 'border-green-500/40 text-green-300 bg-green-500/10'
                                                            : showWrongPicked
                                                                ? 'border-red-500/40 text-red-300 bg-red-500/10'
                                                                : 'border-dark-600 text-light-400 bg-dark-800'
                                                    }`}>
                                                        {String.fromCharCode(65 + optIdx)}
                                                    </span>
                                                    <span className="text-light-200">{opt}</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {isAnswered && (
                                    <div className={`p-4 rounded-xl border ${
                                        isCorrect
                                            ? 'border-green-500/30 bg-green-500/5'
                                            : 'border-yellow-500/30 bg-yellow-500/5'
                                    }`}>
                                        <p className="text-xs font-bold tracking-widest uppercase mb-2 text-light-300">
                                            Explanation
                                        </p>
                                        <p className="text-light-200 leading-relaxed">
                                            {c.explanation}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function GuidedLab({ steps = [], onLoad }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const active = Array.isArray(steps) ? steps[activeIdx] : null;

    useEffect(() => {
        setActiveIdx(0);
    }, [steps]);

    if (!Array.isArray(steps) || steps.length === 0) return null;

    return (
        <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <PlayCircle className="text-green-400" />
                Guided Lab: Bug → Observe → Fix (Like a Human Teacher)
            </h3>
            <p className="text-sm text-light-400 mb-6">
                This is optional, but it’s the fastest path. Load the buggy step, predict what happens, run it, then load the fix and explain why it works.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4">
                    <div className="bg-dark-800 border border-dark-700 rounded-2xl p-4">
                        <p className="text-xs font-bold tracking-widest uppercase text-light-400 mb-3">
                            Steps
                        </p>
                        <div className="space-y-2">
                            {steps.map((s, i) => (
                                <button
                                    key={s.id || i}
                                    onClick={() => setActiveIdx(i)}
                                    className={`w-full text-left p-3 rounded-xl border transition ${
                                        i === activeIdx
                                            ? 'border-green-500/40 bg-green-500/10'
                                            : 'border-dark-700 bg-dark-900/20 hover:bg-dark-700'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                                            i === activeIdx
                                                ? 'border-green-500/40 text-green-300 bg-green-500/10'
                                                : 'border-dark-600 text-light-400 bg-dark-800'
                                        }`}>
                                            {i + 1}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="font-bold text-light-100 truncate">{s.title}</p>
                                            {s.subtitle && (
                                                <p className="text-xs text-light-400 mt-1 truncate">{s.subtitle}</p>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <p className="text-xs font-bold tracking-widest uppercase text-green-300 mb-2">
                                    Step {activeIdx + 1} / {steps.length}
                                </p>
                                <h4 className="text-xl font-bold text-white">{active?.title}</h4>
                                {active?.subtitle && (
                                    <p className="text-sm text-light-400 mt-2">{active.subtitle}</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveIdx(i => Math.max(0, i - 1))}
                                    disabled={activeIdx === 0}
                                    className={`px-3 py-2 rounded-xl text-xs font-bold border ${
                                        activeIdx === 0
                                            ? 'opacity-50 cursor-not-allowed bg-dark-700 border-dark-600 text-light-400'
                                            : 'bg-dark-700 hover:bg-dark-600 border-dark-600 text-light-200'
                                    }`}
                                >
                                    Prev
                                </button>
                                <button
                                    onClick={() => setActiveIdx(i => Math.min(steps.length - 1, i + 1))}
                                    disabled={activeIdx === steps.length - 1}
                                    className={`px-3 py-2 rounded-xl text-xs font-bold border ${
                                        activeIdx === steps.length - 1
                                            ? 'opacity-50 cursor-not-allowed bg-dark-700 border-dark-600 text-light-400'
                                            : 'bg-dark-700 hover:bg-dark-600 border-dark-600 text-light-200'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        {active?.teacherNote && (
                            <div className="mb-5 p-4 rounded-xl border border-blue-500/30 bg-blue-500/5">
                                <p className="text-xs font-bold tracking-widest uppercase text-blue-300 mb-2">
                                    Teacher Note
                                </p>
                                <p className="text-light-200 leading-relaxed">{active.teacherNote}</p>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-3 mb-5">
                            <button
                                onClick={() => onLoad?.({
                                    stepId: active?.id,
                                    kind: 'bug',
                                    code: active?.bugCode || '',
                                    focus: active?.bugFocus,
                                    label: 'Buggy Version'
                                })}
                                className="p-4 rounded-2xl border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 transition"
                            >
                                <p className="text-xs font-bold tracking-widest uppercase text-red-300 mb-2">
                                    Load Bug
                                </p>
                                <p className="text-light-200 text-sm leading-relaxed">
                                    Run it and observe the wrong output / crash.
                                </p>
                            </button>
                            <button
                                onClick={() => onLoad?.({
                                    stepId: active?.id,
                                    kind: 'fix',
                                    code: active?.fixCode || '',
                                    focus: active?.fixFocus,
                                    label: 'Fixed Version'
                                })}
                                className="p-4 rounded-2xl border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition"
                            >
                                <p className="text-xs font-bold tracking-widest uppercase text-green-300 mb-2">
                                    Load Fix
                                </p>
                                <p className="text-light-200 text-sm leading-relaxed">
                                    Compare the change, then run again.
                                </p>
                            </button>
                        </div>

                        {active?.whatToNotice && (
                            <div className="p-4 rounded-xl border border-dark-600 bg-dark-900/30">
                                <p className="text-xs font-bold tracking-widest uppercase text-light-400 mb-2">
                                    What to notice
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-light-200">
                                    {active.whatToNotice.map((x, i) => (
                                        <li key={i}>{x}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function LessonRecap({ recap }) {
    if (!recap) return null;
    const takeaways = Array.isArray(recap.takeaways) ? recap.takeaways : [];
    const mistakes = Array.isArray(recap.commonMistakes) ? recap.commonMistakes : [];
    const next = Array.isArray(recap.nextActions) ? recap.nextActions : [];

    if (takeaways.length === 0 && mistakes.length === 0 && next.length === 0) return null;

    return (
        <div className="mt-10">
            <div className="bg-gradient-to-br from-dark-700 to-dark-800 rounded-2xl p-1 border border-brand-primary/25 shadow-lg">
                <div className="bg-dark-800 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <CheckCircle className="text-brand-primary" />
                        Mini Recap (Teacher Summary)
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {takeaways.length > 0 && (
                            <div className="lg:col-span-6 bg-dark-900/30 border border-dark-600 rounded-2xl p-6">
                                <p className="text-xs font-bold tracking-widest uppercase text-light-400 mb-3">
                                    Key takeaways
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-light-200">
                                    {takeaways.slice(0, 8).map((t, i) => <li key={i}>{t}</li>)}
                                </ul>
                            </div>
                        )}

                        {mistakes.length > 0 && (
                            <div className="lg:col-span-6 bg-dark-900/30 border border-dark-600 rounded-2xl p-6">
                                <p className="text-xs font-bold tracking-widest uppercase text-light-400 mb-3">
                                    Common mistakes
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-light-200">
                                    {mistakes.slice(0, 8).map((m, i) => <li key={i}>{m}</li>)}
                                </ul>
                            </div>
                        )}

                        {next.length > 0 && (
                            <div className="lg:col-span-12 bg-dark-900/30 border border-dark-600 rounded-2xl p-6">
                                <p className="text-xs font-bold tracking-widest uppercase text-light-400 mb-3">
                                    Next actions (10 minutes)
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-light-200">
                                    {next.slice(0, 8).map((n, i) => <li key={i}>{n}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

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
const LiveCodeEditor = forwardRef(function LiveCodeEditor({ initialCode, predictions = [], title = 'Live Lab: Try It Yourself', subtitle = null }, ref) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState([]);
    const [copied, setCopied] = useState(false);
    const iframeRef = useRef(null);
    const textareaRef = useRef(null);
    const baselineRef = useRef(initialCode);
    const currentCodeRef = useRef(initialCode);
    const typingTimerRef = useRef(null);
    const typingAbortRef = useRef(false);
    const [isTyping, setIsTyping] = useState(false);
    const [lastLoadedLabel, setLastLoadedLabel] = useState(null);
    const [teacherFocusPulse, setTeacherFocusPulse] = useState(false);

    const [predictionOpen, setPredictionOpen] = useState(false);
    const [predictionIndex, setPredictionIndex] = useState(0);
    const [predictionChoice, setPredictionChoice] = useState(null);
    const [predictionRevealed, setPredictionRevealed] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    const handleReset = () => {
        setCode(baselineRef.current);
        setOutput([]);
    };
    
    const execute = () => {
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

    const focusLines = (focus) => {
        if (!focus || !textareaRef.current) return;
        const { fromLine, toLine } = focus;
        if (!fromLine || !toLine) return;

        const lines = code.split('\n');
        const startLineIdx = Math.max(0, fromLine - 1);
        const endLineIdx = Math.min(lines.length - 1, toLine - 1);

        let start = 0;
        for (let i = 0; i < startLineIdx; i++) start += lines[i].length + 1;

        let end = start;
        for (let i = startLineIdx; i <= endLineIdx; i++) end += lines[i].length + 1;

        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start, Math.max(start, end - 1));
    };

    const pulseTeacherFocus = (focus) => {
        // Keep selection highlighted briefly (acts like “teacher pointing”), then drop caret.
        setTimeout(() => {
            focusLines(focus);
            setTeacherFocusPulse(true);
            setTimeout(() => setTeacherFocusPulse(false), 900);
            setTimeout(() => {
                if (!textareaRef.current) return;
                const end = textareaRef.current.selectionEnd ?? 0;
                textareaRef.current.setSelectionRange(end, end);
            }, 850);
        }, 0);
    };

    const stopTyping = () => {
        typingAbortRef.current = true;
        if (typingTimerRef.current) {
            clearTimeout(typingTimerRef.current);
            typingTimerRef.current = null;
        }
        setIsTyping(false);
    };

    const startTypingTo = ({
        nextCode,
        focus,
        label,
        // "Calm teacher" defaults: slower, steadier, more pauses.
        speedMs = 38,          // slower baseline
        charsPerTick = 1,      // more “human”
        jitterRatio = 0.18,    // steadier speed (less robotic, but not chaotic)
        microPauseMs = 220,    // pauses at punctuation
        newlinePauseMs = 420   // bigger pause at newlines (like a teacher thinking)
    }) => {
        stopTyping();
        typingAbortRef.current = false;
        setIsTyping(true);
        setLastLoadedLabel(label || null);
        setOutput([]);

        const from = currentCodeRef.current ?? '';
        const to = nextCode ?? '';

        // Find common prefix to avoid retyping unchanged beginning.
        let prefixLen = 0;
        const minLen = Math.min(from.length, to.length);
        while (prefixLen < minLen && from[prefixLen] === to[prefixLen]) prefixLen++;

        // Phase 1: backspace down to prefixLen
        let cur = from;
        let phase = 'backspace';

        const randDelay = () => {
            const jitter = speedMs * jitterRatio;
            const d = speedMs + (Math.random() * 2 - 1) * jitter;
            return Math.max(6, Math.floor(d));
        };

        const pauseForChar = (ch) => {
            if (ch === '\n') return newlinePauseMs;
            if (ch === ';' || ch === '{' || ch === '}') return microPauseMs;
            return 0;
        };

        const tick = () => {
            if (typingAbortRef.current) return;

            let extraPause = 0;

            if (phase === 'backspace') {
                if (cur.length > prefixLen) {
                    const prevChar = cur[cur.length - 1];
                    cur = cur.slice(0, Math.max(prefixLen, cur.length - charsPerTick));
                    setCode(cur);
                    extraPause = pauseForChar(prevChar);
                } else {
                    phase = 'type';
                }
            }

            if (phase === 'type') {
                if (cur.length < to.length) {
                    const nextLen = Math.min(to.length, cur.length + charsPerTick);
                    const nextChar = to[nextLen - 1];
                    cur = to.slice(0, nextLen);
                    setCode(cur);
                    extraPause = pauseForChar(nextChar);
                } else {
                    // Done
                    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
                    typingTimerRef.current = null;
                    setIsTyping(false);
                    baselineRef.current = to;
                    pulseTeacherFocus(focus);
                    return;
                }
            }

            typingTimerRef.current = setTimeout(tick, randDelay() + extraPause);
        };

        tick();
    };

    useImperativeHandle(ref, () => ({
        loadStep: ({ code: nextCode, focus, animate = true, label, speedMs, charsPerTick } = {}) => {
            const to = nextCode ?? '';

            if (!animate) {
                stopTyping();
                setLastLoadedLabel(label || null);
                baselineRef.current = to;
                setCode(to);
                setOutput([]);
                setTimeout(() => focusLines(focus), 0);
                return;
            }

            startTypingTo({ nextCode: to, focus, label, speedMs, charsPerTick });
        },
        stopTyping
    }), [code]);

    useEffect(() => {
        currentCodeRef.current = code;
    }, [code]);

    useEffect(() => {
        stopTyping();
        baselineRef.current = initialCode;
        setCode(initialCode);
        setOutput([]);
        // Reset prediction gate per lesson
        setPredictionIndex(0);
        setPredictionChoice(null);
        setPredictionRevealed(false);
        setPredictionOpen(false);
    }, [initialCode]);

    const handleRun = () => {
        if (Array.isArray(predictions) && predictions.length > 0) {
            const p = predictions[predictionIndex];
            if (p && !predictionRevealed) {
                setPredictionOpen(true);
                return;
            }
        }
        execute();
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
                {title}
            </h3>
            {subtitle && (
                <p className="text-sm text-light-400 -mt-2 mb-4">
                    {subtitle}
                </p>
            )}

            {/* Prediction Gate */}
            {predictionOpen && Array.isArray(predictions) && predictions[predictionIndex] && (
                <div className="mb-6 border border-purple-500/30 bg-purple-500/5 rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                            <p className="text-xs font-bold tracking-widest uppercase text-purple-300 mb-2">
                                Prediction Check (before you run)
                            </p>
                            <p className="text-lg font-bold text-white">
                                {predictions[predictionIndex].prompt}
                            </p>
                            <p className="text-sm text-light-400 mt-2">
                                Pick an answer, then we’ll reveal why. This is how you build real intuition.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setPredictionOpen(false);
                                setPredictionChoice(null);
                                setPredictionRevealed(false);
                            }}
                            className="text-xs font-bold px-3 py-2 rounded-xl bg-dark-700 hover:bg-dark-600 border border-dark-600 text-light-200"
                        >
                            Close
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                        {(predictions[predictionIndex].options || []).map((opt, i) => {
                            const picked = predictionChoice === i;
                            const correct = predictions[predictionIndex].correctIndex === i;
                            const showCorrect = predictionRevealed && correct;
                            const showWrong = predictionRevealed && picked && !correct;

                            return (
                                <button
                                    key={i}
                                    onClick={() => setPredictionChoice(i)}
                                    className={`text-left w-full p-3 rounded-xl border transition ${
                                        picked ? 'border-purple-400/60 bg-purple-500/10' : 'border-dark-600 bg-dark-900/30 hover:bg-dark-700'
                                    } ${showCorrect ? 'ring-1 ring-green-500/40' : ''} ${showWrong ? 'ring-1 ring-red-500/40' : ''}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                                            showCorrect
                                                ? 'border-green-500/40 text-green-300 bg-green-500/10'
                                                : showWrong
                                                    ? 'border-red-500/40 text-red-300 bg-red-500/10'
                                                    : 'border-dark-600 text-light-400 bg-dark-800'
                                        }`}>
                                            {String.fromCharCode(65 + i)}
                                        </span>
                                        <span className="text-light-200">{opt}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {!predictionRevealed ? (
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => setPredictionRevealed(true)}
                                disabled={predictionChoice === null}
                                className={`px-4 py-2 rounded-xl font-bold text-sm border ${
                                    predictionChoice === null
                                        ? 'opacity-50 cursor-not-allowed bg-dark-700 border-dark-600 text-light-400'
                                        : 'bg-purple-500/20 border-purple-500/30 text-purple-200 hover:bg-purple-500/25'
                                }`}
                            >
                                Reveal Explanation
                            </button>
                            <button
                                onClick={() => {
                                    setPredictionOpen(false);
                                    execute();
                                }}
                                className="px-4 py-2 rounded-xl font-bold text-sm bg-green-500 hover:bg-green-400 text-dark-900 border border-green-500/30"
                            >
                                Run Code Now
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="p-4 rounded-xl border border-purple-500/30 bg-dark-900/40">
                                <p className="text-xs font-bold tracking-widest uppercase text-purple-300 mb-2">
                                    Why
                                </p>
                                <p className="text-light-200 leading-relaxed">
                                    {predictions[predictionIndex].explanation}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => {
                                        setPredictionOpen(false);
                                        execute();
                                    }}
                                    className="px-4 py-2 rounded-xl font-bold text-sm bg-green-500 hover:bg-green-400 text-dark-900 border border-green-500/30"
                                >
                                    Run Code Now
                                </button>
                                {predictionIndex < predictions.length - 1 ? (
                                    <button
                                        onClick={() => {
                                            setPredictionIndex(i => i + 1);
                                            setPredictionChoice(null);
                                            setPredictionRevealed(false);
                                        }}
                                        className="px-4 py-2 rounded-xl font-bold text-sm bg-dark-700 hover:bg-dark-600 border border-dark-600 text-light-200"
                                    >
                                        Next Prediction
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setPredictionOpen(false);
                                            setPredictionChoice(null);
                                            setPredictionRevealed(false);
                                        }}
                                        className="px-4 py-2 rounded-xl font-bold text-sm bg-dark-700 hover:bg-dark-600 border border-dark-600 text-light-200"
                                    >
                                        Done
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className="rounded-xl overflow-hidden border border-dark-600 shadow-2xl">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-700">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-mono text-light-400">index.js</span>
                        {lastLoadedLabel && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-dark-600 bg-dark-700/50 text-light-300 truncate">
                                {lastLoadedLabel}
                            </span>
                        )}
                        {isTyping && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-200">
                                Typing…
                            </span>
                        )}
                    </div>
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
                        {isTyping && (
                            <button
                                onClick={stopTyping}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-light-200 bg-purple-500/20 hover:bg-purple-500/25 rounded-lg transition-colors border border-purple-500/30"
                            >
                                Stop
                            </button>
                        )}
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
                        ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    readOnly={isTyping}
                    spellCheck={false}
                    className={`w-full h-64 p-4 bg-[#1a1a2e] text-light-100 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/50 ${
                        teacherFocusPulse ? 'ring-2 ring-green-400/40 shadow-[0_0_0_4px_rgba(34,197,94,0.08)]' : ''
                    }`}
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
});

export default function LearningPathPage() {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const courseId = params.courseId;
    const course = COURSES[courseId];

    const initialDay =
        courseId && COURSES[courseId]?.days?.length
            ? COURSES[courseId].days[0].day
            : 0;

    const [activeDay, setActiveDay] = useState(initialDay);
    const [completedDays, setCompletedDays] = useState([]); 
    const liveLabEditorRef = useRef(null);
    const guidedLabEditorRef = useRef(null);
    const [progressByDay, setProgressByDay] = useState({});

    // If user navigates between courses, reset to the first available day for that course.
    useEffect(() => {
        setActiveDay(initialDay);
    }, [initialDay]);

    // Load progress for this course from localStorage
    useEffect(() => {
        if (!courseId || !course?.days?.length) return;
        const next = {};
        for (const d of course.days) {
            next[d.day] = loadDayProgress(courseId, d.day) || {
                checkpointsCorrect: {},
                lab: {},
                masteryChecklist: {}
            };
        }
        setProgressByDay(next);
    }, [courseId, course?.days?.length]);

    if (!course) return <div className="text-white p-10">Course not found</div>;

    const activeContent = course.days.find(d => d.day === activeDay) || course.days[0];

    const isDayMastered = (dayNumber) => {
        const dayObj = course.days.find(d => d.day === dayNumber);
        if (!dayObj) return false;
        const p = progressByDay?.[dayNumber] || { checkpointsCorrect: {}, lab: {}, masteryChecklist: {} };

        const checkpoints = Array.isArray(dayObj.checkpoints) ? dayObj.checkpoints : [];
        const needsCheckpoints = checkpoints.length > 0;
        const checkpointsOk = !needsCheckpoints
            ? true
            : checkpoints.every((_, idx) => p.checkpointsCorrect?.[idx] === true);

        const steps = Array.isArray(dayObj.labSteps) ? dayObj.labSteps : [];
        const needsLabs = steps.length > 0;
        const labsOk = !needsLabs
            ? true
            : steps.every(s => p.lab?.[s.id]?.bug === true && p.lab?.[s.id]?.fix === true);

        return checkpointsOk && labsOk;
    };

    const handleSelectDay = (dayNumber) => setActiveDay(dayNumber);

    const updateProgress = (dayNumber, updater) => {
        setProgressByDay(prev => {
            const current = prev?.[dayNumber] || { checkpointsCorrect: {}, lab: {}, masteryChecklist: {} };
            const nextForDay = updater(current);
            const next = { ...prev, [dayNumber]: nextForDay };
            saveDayProgress(courseId, dayNumber, nextForDay);
            return next;
        });
    };

    const activeProgress = progressByDay?.[activeDay] || { checkpointsCorrect: {}, lab: {}, masteryChecklist: {} };
    const activeCheckpoints = Array.isArray(activeContent.checkpoints) ? activeContent.checkpoints : [];
    const activeLabSteps = Array.isArray(activeContent.labSteps) ? activeContent.labSteps : [];
    const activeMasteryItems = getMasteryChecklistItems(activeContent);
    const activeMasteryDoneCount = activeMasteryItems.reduce((acc, it) => acc + (activeProgress.masteryChecklist?.[it.id] ? 1 : 0), 0);
    const activeCheckpointsCorrectCount = activeCheckpoints.reduce((acc, _, idx) => acc + (activeProgress.checkpointsCorrect?.[idx] ? 1 : 0), 0);
    const activeLabCompletedCount = activeLabSteps.reduce((acc, s) => {
        const st = activeProgress.lab?.[s.id];
        return acc + (st?.bug && st?.fix ? 1 : 0);
    }, 0);

    const maxDayNumber = Array.isArray(course?.days) && course.days.length
        ? Math.max(...course.days.map((d) => Number(d?.day ?? 0)))
        : 0;

    const jsBonusStartDay = courseId === 'javascript' ? 34 : null;
    const jsHasBonusDays = jsBonusStartDay != null && Array.isArray(course?.days)
        ? course.days.some((d) => Number(d?.day ?? 0) >= jsBonusStartDay)
        : false;
    const jsBonusStartIndex = jsHasBonusDays
        ? course.days.findIndex((d) => Number(d?.day ?? 0) >= jsBonusStartDay)
        : -1;

    // Reset the guided sandbox when changing lessons (so it doesn't carry code across days)
    useEffect(() => {
        const placeholder = `// Guided Lab Sandbox\n// Use "Load Bug" / "Load Fix" above to load code here.\nconsole.clear();\n`;
        guidedLabEditorRef.current?.loadStep({
            code: placeholder,
            focus: { fromLine: 1, toLine: 2 },
            label: 'Guided Lab Sandbox',
            animate: false
        });
    }, [courseId, activeDay]);

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

                                {course.days.map((day, idx) => (
                                    <React.Fragment key={day.day}>
                                        {jsHasBonusDays && idx === jsBonusStartIndex && (
                                            <div className="relative z-10 mt-3 mb-2">
                                                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10">
                                                    <span className="text-xs font-bold tracking-widest uppercase text-fuchsia-200">
                                                        Bonus days 34–40
                                                    </span>
                                                    <span className="text-[11px] text-light-300">
                                                        Advanced patterns toolkit
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => handleSelectDay(day.day)}
                                            title={`Open Day ${day.day}`}
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
                                    </React.Fragment>
                                ))}
                                
                                {/* Locked Days Placeholder */}
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="relative z-10 w-full flex items-center gap-4 p-3 rounded-xl opacity-40 cursor-not-allowed">
                                        <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center shrink-0 text-light-500 border border-dark-600">
                                            <Lock size={12} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-light-500">Day {maxDayNumber + i + 1}</p>
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

                            {(activeCheckpoints.length > 0 || activeLabSteps.length > 0) && (
                                <div className="mb-8 bg-dark-900/30 border border-dark-700 rounded-2xl p-5">
                                    <p className="text-xs font-bold tracking-widest uppercase text-light-400 mb-3">
                                        Lesson Progress
                                    </p>
                                    <div className="flex flex-col md:flex-row gap-3">
                                        {activeCheckpoints.length > 0 && (
                                            <div className="flex-1 p-4 rounded-xl border border-dark-600 bg-dark-800">
                                                <p className="text-sm font-bold text-white">Checkpoints</p>
                                                <p className="text-sm text-light-300 mt-1">
                                                    {activeCheckpointsCorrectCount} / {activeCheckpoints.length} correct
                                                </p>
                                            </div>
                                        )}
                                        {activeLabSteps.length > 0 && (
                                            <div className="flex-1 p-4 rounded-xl border border-dark-600 bg-dark-800">
                                                <p className="text-sm font-bold text-white">Guided Lab</p>
                                                <p className="text-sm text-light-300 mt-1">
                                                    {activeLabCompletedCount} / {activeLabSteps.length} steps completed (bug + fix)
                                                </p>
                                            </div>
                                        )}
                                        {activeMasteryItems.length > 0 && (
                                            <div className="flex-1 p-4 rounded-xl border border-dark-600 bg-dark-800">
                                                <p className="text-sm font-bold text-white">Mastery checklist</p>
                                                <p className="text-sm text-light-300 mt-1">
                                                    {activeMasteryDoneCount} / {activeMasteryItems.length} checked
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {isDayMastered(activeDay) && (
                                        <p className="mt-3 text-sm text-green-300 font-bold">
                                            Mastery achieved.
                                        </p>
                                    )}
                                </div>
                            )}
                            
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

                            {/* Checkpoints */}
                            {activeContent.checkpoints && (
                                <LearningCheckpoints
                                    courseId={courseId}
                                    day={activeDay}
                                    checkpoints={activeContent.checkpoints}
                                    progress={activeProgress}
                                    onProgress={(evt) => {
                                        if (evt?.type === 'checkpoint_correct') {
                                            updateProgress(activeDay, (p) => ({
                                                ...p,
                                                checkpointsCorrect: {
                                                    ...(p.checkpointsCorrect || {}),
                                                    [evt.checkpointIndex]: true
                                                }
                                            }));
                                        }
                                    }}
                                />
                            )}

                            {/* Guided Lab (Optional) */}
                            {activeContent.labSteps && (
                                <>
                                    <GuidedLab
                                        steps={activeContent.labSteps}
                                        onLoad={({ stepId, kind, code, focus, label }) => {
                                            if (stepId && (kind === 'bug' || kind === 'fix')) {
                                                updateProgress(activeDay, (p) => ({
                                                    ...p,
                                                    lab: {
                                                        ...(p.lab || {}),
                                                        [stepId]: {
                                                            ...(p.lab?.[stepId] || {}),
                                                            [kind]: true
                                                        }
                                                    }
                                                }));
                                            }
                                            guidedLabEditorRef.current?.loadStep({ code, focus, label, animate: true });
                                        }}
                                    />

                                    {/* Separate sandbox for Guided Lab so it doesn't overwrite the main exercise */}
                                    <LiveCodeEditor
                                        ref={guidedLabEditorRef}
                                        initialCode={`// Guided Lab Sandbox\n// Use "Load Bug" / "Load Fix" above to load code here.\nconsole.clear();\n`}
                                        predictions={[]}
                                        title="Guided Lab Sandbox"
                                        subtitle="This editor is for the guided bug→fix steps. Your main exercise below stays unchanged."
                                    />
                                </>
                            )}

                            {/* Live Code Lab */}
                            {activeContent.code && (
                                courseId === 'react' 
                                    ? <ReactLiveEditor initialCode={activeContent.code} />
                                    : <LiveCodeEditor
                                        ref={liveLabEditorRef}
                                        initialCode={activeContent.code}
                                        predictions={activeContent.predictions}
                                        title="Live Lab: Try It Yourself"
                                        subtitle="This is your main exercise sandbox. It won’t be overwritten by Guided Lab anymore."
                                    />
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

                            {/* Mini Recap */}
                            {activeContent.recap && (
                                <LessonRecap recap={activeContent.recap} />
                            )}

                            {/* End-of-day Mastery Checklist */}
                            <MasteryChecklist
                                items={activeMasteryItems}
                                progress={activeProgress}
                                onProgress={(evt) => {
                                    if (evt?.type !== 'mastery_toggle') return;
                                    updateProgress(activeDay, (p) => ({
                                        ...p,
                                        masteryChecklist: {
                                            ...(p.masteryChecklist || {}),
                                            [evt.itemId]: !!evt.value
                                        }
                                    }));
                                }}
                            />

                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
}
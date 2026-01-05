import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Check, Copy, RotateCcw, Play, Code } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// JavaScript Live Code Editor with iframe execution
export const LiveCodeEditor = forwardRef(function LiveCodeEditor({ initialCode, predictions = [], title = 'Live Lab: Try It Yourself', subtitle = null, onRun }, ref) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState([]);
    const [copied, setCopied] = useState(false);
    const iframeRef = useRef(null);
    const textareaRef = useRef(null);
    const highlighterRef = useRef(null);
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
        if (onRun) onRun(code);
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
        stopTyping,
        getCode: () => code,
        getOutput: () => output
    }), [code, output]);

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
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Code className="text-blue-400" />
                {title}
            </h3>
            {subtitle && (
                <p className="text-sm text-gray-500 dark:text-light-400 -mt-2 mb-4">
                    {subtitle}
                </p>
            )}

            {/* Prediction Gate */}
            {predictionOpen && Array.isArray(predictions) && predictions[predictionIndex] && (
                <div className="mb-6 border border-purple-500/30 bg-purple-500/5 rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                            <p className="text-xs font-bold tracking-widest uppercase text-purple-700 dark:text-purple-300 mb-2">
                                Prediction Check (before you run)
                            </p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                {predictions[predictionIndex].prompt}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-light-400 mt-2">
                                Pick an answer, then we’ll reveal why. This is how you build real intuition.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setPredictionOpen(false);
                                setPredictionChoice(null);
                                setPredictionRevealed(false);
                            }}
                            className="text-xs font-bold px-3 py-2 rounded-xl bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-light-200"
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
                                    className={`text-left w-full p-3 rounded-xl border transition ${picked ? 'border-purple-400/60 bg-purple-500/10' : 'border-gray-200 dark:border-dark-600 bg-gray-100 dark:bg-dark-900/30 hover:bg-gray-200 dark:hover:bg-dark-700'
                                        } ${showCorrect ? 'ring-1 ring-green-500/40' : ''} ${showWrong ? 'ring-1 ring-red-500/40' : ''}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${showCorrect
                                            ? 'border-green-500/40 text-green-300 bg-green-500/10'
                                            : showWrong
                                                ? 'border-red-500/40 text-red-300 bg-red-500/10'
                                                : 'border-gray-200 dark:border-dark-600 text-gray-500 dark:text-light-400 bg-white dark:bg-dark-800'
                                            }`}>
                                            {String.fromCharCode(65 + i)}
                                        </span>
                                        <span className="text-gray-700 dark:text-light-200">{opt}</span>
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
                                className={`px-4 py-2 rounded-xl font-bold text-sm border ${predictionChoice === null
                                    ? 'opacity-50 cursor-not-allowed bg-gray-200 dark:bg-dark-700 border-gray-300 dark:border-dark-600 text-gray-500 dark:text-light-400'
                                    : 'bg-purple-500/20 border-purple-500/30 text-purple-700 dark:text-purple-200 hover:bg-purple-500/25'
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
                            <div className="p-4 rounded-xl border border-purple-500/30 bg-gray-50 dark:bg-dark-900/40">
                                <p className="text-xs font-bold tracking-widest uppercase text-purple-700 dark:text-purple-300 mb-2">
                                    Why
                                </p>
                                <p className="text-gray-700 dark:text-light-200 leading-relaxed">
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
                                        className="px-4 py-2 rounded-xl font-bold text-sm bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-light-200"
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
                                        className="px-4 py-2 rounded-xl font-bold text-sm bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-light-200"
                                    >
                                        Done
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-dark-600 shadow-2xl">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-mono text-gray-500 dark:text-light-400">index.js</span>
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
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-light-300 hover:text-gray-900 dark:hover:text-white bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 rounded-lg transition-colors"
                        >
                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-light-300 hover:text-gray-900 dark:hover:text-white bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 rounded-lg transition-colors"
                        >
                            <RotateCcw size={14} />
                            Reset
                        </button>
                        {isTyping && (
                            <button
                                onClick={stopTyping}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-700 dark:text-light-200 bg-purple-500/20 hover:bg-purple-500/25 rounded-lg transition-colors border border-purple-500/30"
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
                {/* Code Editor (Overlay) */}
                <div className="relative w-full h-64 bg-[#1e1e1e] text-sm group rounded-b-xl overflow-hidden">
                    <div
                        ref={highlighterRef}
                        className="absolute inset-0 p-4 overflow-auto pointer-events-none element-no-scrollbar"
                        style={{
                            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            whiteSpace: 'pre'
                        }}
                    >
                        <SyntaxHighlighter
                            language="javascript"
                            style={vscDarkPlus}
                            customStyle={{
                                margin: 0,
                                padding: 0,
                                background: 'transparent',
                                fontSize: 'inherit',
                                lineHeight: 'inherit',
                                fontFamily: 'inherit',
                                whiteSpace: 'pre'
                            }}
                            codeTagProps={{ style: { fontFamily: 'inherit' } }}
                        >
                            {code || ' '}
                        </SyntaxHighlighter>
                    </div>
                    <textarea
                        ref={textareaRef}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onScroll={(e) => {
                            if (highlighterRef.current) {
                                highlighterRef.current.scrollTop = e.target.scrollTop;
                                highlighterRef.current.scrollLeft = e.target.scrollLeft;
                            }
                        }}
                        readOnly={isTyping}
                        spellCheck={false}
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        className={`absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/50 z-10 element-custom-scrollbar ${teacherFocusPulse ? 'ring-2 ring-green-400/40 shadow-[0_0_0_4px_rgba(34,197,94,0.08)]' : ''
                            }`}
                        style={{
                            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            whiteSpace: 'pre',
                            tabSize: 2
                        }}
                    />
                </div>

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
                                    className={`${item.method === 'error' ? 'text-red-400' :
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

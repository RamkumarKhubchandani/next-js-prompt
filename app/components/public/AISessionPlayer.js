import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Check, Play, ChevronRight, Terminal, Sparkles, Volume2, VolumeX, Mic, Bug } from 'lucide-react';
import { LiveCodeEditor } from './LiveCodeEditor';

export default function AISessionPlayer({ session, onComplete }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [chatHistory, setChatHistory] = useState([]);
    const [isAiTyping, setIsAiTyping] = useState(false);
    const [waitingForInteraction, setWaitingForInteraction] = useState(false);
    const [isAudioEnabled, setIsAudioEnabled] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const editorRef = useRef(null);
    const chatContainerRef = useRef(null);
    const speechRef = useRef(null);
    const audioEnabledRef = useRef(isAudioEnabled);

    // Sync ref for closure access
    useEffect(() => {
        audioEnabledRef.current = isAudioEnabled;
    }, [isAudioEnabled]);

    const steps = session?.steps || [];
    const currentStep = steps[currentStepIndex];
    const isFinished = currentStepIndex >= steps.length;

    // Scroll to bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [chatHistory, isAiTyping]);

    // Format Markdown (Bold)
    const formatMessage = (text) => {
        if (typeof text !== 'string') return text;
        return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    // TTS Helper
    const speak = useCallback((text) => {
        if (!audioEnabledRef.current || typeof window === 'undefined') return;

        window.speechSynthesis.cancel();

        // Strip markdown for speech
        const cleanText = text.replace(/\*\*/g, '');

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google US English')) || voices.find(v => v.lang.startsWith('en'));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, []);

    // Stop speech on unmount
    useEffect(() => {
        return () => {
            if (typeof window !== 'undefined') window.speechSynthesis.cancel();
        };
    }, []);

    // Toggle Audio
    const toggleAudio = () => {
        const newState = !isAudioEnabled;
        setIsAudioEnabled(newState);
        if (!newState) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    // Handle User Code Execution (for Challenge Steps)
    const handleCodeRun = useCallback(async (code) => {
        if (currentStep?.type !== 'challenge') return;

        // Simulate AI watching/analyzing
        const analyzingMsgId = Date.now();
        setChatHistory(prev => [...prev, { type: 'talk', message: "Analyzing your fix...", id: analyzingMsgId, isAnalyzing: true }]);

        // Wait for execution result (give iframe time to post message)
        await new Promise(r => setTimeout(r, 1500));

        const outputArray = editorRef.current?.getOutput() || [];
        const outputText = outputArray.map(o => o.content).join('\n');

        let passed = false;

        // 1. Verify Output (if defined)
        if (currentStep.verifyOutput) {
            try {
                const regex = new RegExp(currentStep.verifyOutput, 'i');
                if (regex.test(outputText)) passed = true;
            } catch (e) { console.error(e); }
        }
        // 2. Verify Code (if defined)
        if (!passed && currentStep.verifyCode) {
            try {
                const regex = new RegExp(currentStep.verifyCode);
                if (regex.test(code)) passed = true;
            } catch (e) { console.error(e); }
        }

        // Remove "Analyzing..." message
        setChatHistory(prev => prev.filter(m => m.id !== analyzingMsgId));

        if (passed) {
            const successMsg = currentStep.successMessage || "Brilliant! You fixed it.";
            speak(successMsg);
            setChatHistory(prev => [...prev, { type: 'talk', message: successMsg, id: Date.now(), isSuccess: true }]);

            // Advance
            setTimeout(() => {
                setWaitingForInteraction(false);
                setCurrentStepIndex(i => i + 1);
            }, 2500);
        } else {
            const hint = currentStep.hint || "That didn't quite work. Check the error output.";
            speak(hint);
            setChatHistory(prev => [...prev, {
                type: 'talk',
                message: hint,
                id: Date.now(),
                isError: true,
                interactive: true,
                options: ["Reveal Solution"],
                answered: false
            }]);
        }
    }, [currentStep, speak]);

    // Process Steps
    useEffect(() => {
        if (!currentStep || isFinished) {
            if (isFinished && onComplete) onComplete();
            return;
        }

        let timeoutId;

        const processStep = async () => {
            // TALK
            if (currentStep.type === 'talk') {
                setIsAiTyping(true);
                const thinkingTime = currentStep.delay || 800;

                timeoutId = setTimeout(() => {
                    const msgText = currentStep.message;
                    setChatHistory(prev => [...prev, { ...currentStep, id: Date.now() }]);
                    setIsAiTyping(false);
                    speak(msgText);

                    // Auto-advance
                    const estimatedSpeechTime = (msgText.length / 15) * 1000 + 1000;
                    const readingTime = Math.max(2000, estimatedSpeechTime);

                    timeoutId = setTimeout(() => {
                        setCurrentStepIndex(i => i + 1);
                    }, readingTime);
                }, thinkingTime);
            }
            // CODE (Demonstration)
            else if (currentStep.type === 'code') {
                setWaitingForInteraction(true);
                if (currentStep.caption) {
                    setChatHistory(prev => [...prev, { type: 'talk', message: currentStep.caption, id: Date.now() }]);
                    speak(currentStep.caption);
                }

                if (editorRef.current) {
                    editorRef.current.loadStep({
                        code: currentStep.code,
                        animate: true,
                        speedMs: currentStep.speed === 'fast' ? 10 : 30,
                        label: 'AI Demo'
                    });
                    const typeDuration = currentStep.code.length * (currentStep.speed === 'fast' ? 10 : 30) + 1000;
                    timeoutId = setTimeout(() => {
                        setWaitingForInteraction(false);
                        setCurrentStepIndex(i => i + 1);
                    }, typeDuration);
                }
            }
            // CHALLENGE (Interactive Fix)
            else if (currentStep.type === 'challenge') {
                setWaitingForInteraction(true);
                setIsAiTyping(true);

                setTimeout(() => {
                    setIsAiTyping(false);
                    const msgText = currentStep.instruction;
                    speak(msgText);

                    // Special Challenge Message
                    setChatHistory(prev => [...prev, {
                        type: 'challenge',
                        message: msgText,
                        id: Date.now()
                    }]);

                    if (editorRef.current) {
                        editorRef.current.loadStep({
                            code: currentStep.buggyCode,
                            animate: true,
                            speedMs: 20,
                            label: '🛑 Bug Detected: Needs Human Fix'
                        });
                    }
                }, 800);
            }
            // ASK (Quiz)
            else if (currentStep.type === 'ask') {
                setIsAiTyping(true);
                setTimeout(() => {
                    setIsAiTyping(false);
                    const questionText = currentStep.question || currentStep.message;
                    setChatHistory(prev => [...prev, { ...currentStep, message: questionText, id: Date.now(), interactive: true }]);
                    speak(questionText);
                    setWaitingForInteraction(true);
                }, 600);
            }
        };

        processStep();
        return () => clearTimeout(timeoutId);
    }, [currentStepIndex, isFinished, speak]);

    const handleAnswer = (option, step) => {
        if (option === "Reveal Solution") {
            setChatHistory(prev => [...prev, { type: 'user', message: "I'm stuck. Show me.", id: Date.now() + 1 }]);
            speak("No problem. Here is the fix.");

            if (currentStep.solutionCode && editorRef.current) {
                editorRef.current.loadStep({
                    code: currentStep.solutionCode,
                    animate: true,
                    speedMs: 15,
                    label: 'AI Solution'
                });
            }

            setTimeout(() => {
                setWaitingForInteraction(false);
                setCurrentStepIndex(i => i + 1);
            }, 4000);
            return;
        }

        const isCorrect = option === step.correctAnswer;
        setChatHistory(prev => [...prev, { type: 'user', message: option, id: Date.now() + 1 }]);

        setTimeout(() => {
            const feedbackMsg = isCorrect ? (step.feedback?.success || "Correct!") : (step.feedback?.error || "Not quite.");
            speak(feedbackMsg);
            setChatHistory(prev => [...prev, { type: 'talk', message: feedbackMsg, id: Date.now() + 2 }]);

            setTimeout(() => {
                setWaitingForInteraction(false);
                setCurrentStepIndex(i => i + 1);
            }, 2000);
        }, 500);
    };

    if (!session?.enabled) return null;

    return (
        <div className="flex flex-col lg:flex-row gap-6 mb-12 h-[600px] lg:h-[500px]">
            {/* Chat Interface */}
            <div className="flex-1 flex flex-col bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 shadow-xl overflow-hidden relative">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-dark-700 flex items-center justify-between bg-gray-50/50 dark:bg-dark-900/50 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform ${isSpeaking ? 'scale-110 ring-2 ring-brand-primary ring-offset-2 dark:ring-offset-dark-800' : ''}`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-purple-600 rounded-full" />
                            {isSpeaking && (
                                <span className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-75" />
                            )}
                            <Bot size={20} className="text-white relative z-10" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm">AI Senior Engineer</h3>
                            <div className="flex items-center gap-1.5 opacity-60">
                                <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                                <span className="text-xs font-medium">{isSpeaking ? 'Speaking...' : 'Live Session'}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={toggleAudio}
                        className={`p-2 rounded-full transition-colors ${isAudioEnabled
                            ? 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'
                            : 'bg-gray-100 dark:bg-dark-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-dark-600'
                            }`}
                        title={isAudioEnabled ? "Mute Voice" : "Enable Voice (Teacher Mode)"}
                    >
                        {isAudioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    </button>
                </div>

                {/* Messages */}
                <div
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/30 dark:bg-[#0c0c0e] custom-scrollbar scroll-smooth"
                >
                    <AnimatePresence initial={false}>
                        {chatHistory.map((msg, idx) => (
                            <motion.div
                                key={msg.id || idx}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex items-end gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.type !== 'user' && (
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm shrink-0 mb-1 ${msg.type === 'challenge' ? 'bg-red-500 text-white' : 'bg-gradient-to-br from-brand-primary/80 to-purple-600/80 text-white'
                                        }`}>
                                        {msg.type === 'challenge' ? <Bug size={14} /> : <Bot size={14} />}
                                    </div>
                                )}

                                <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${msg.type === 'user'
                                    ? 'bg-brand-primary text-dark-900 font-medium rounded-br-none'
                                    : (msg.type === 'challenge'
                                        ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30'
                                        : 'bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600 dark:text-light-200 rounded-bl-none')
                                    }`}>
                                    {msg.type === 'challenge' && (
                                        <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest mb-1">Interactive Challenge</p>
                                    )}

                                    {formatMessage(msg.message)}

                                    {msg.interactive && !msg.answered && (
                                        <div className="mt-3 grid grid-cols-1 gap-2">
                                            {msg.options.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => {
                                                        msg.answered = true;
                                                        handleAnswer(opt, msg);
                                                    }}
                                                    disabled={waitingForInteraction && msg.answered}
                                                    className="w-full text-left px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors text-xs font-bold text-gray-700 dark:text-light-100 flex items-center justify-between group"
                                                >
                                                    {opt}
                                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isAiTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-end gap-3 justify-start"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary/80 to-purple-600/80 flex items-center justify-center shadow-sm shrink-0 mb-1">
                                <Bot size={14} className="text-white" />
                            </div>
                            <div className="bg-white dark:bg-dark-700 rounded-2xl rounded-bl-none p-4 border border-gray-100 dark:border-dark-600 shadow-sm flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Progress */}
                <div className="h-1 bg-gray-100 dark:bg-dark-900 w-full">
                    <motion.div
                        className="h-full bg-brand-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStepIndex) / steps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Code */}
            <div className="flex-1 bg-[#1e1e1e] rounded-2xl shadow-xl overflow-hidden border border-gray-800 flex flex-col">
                <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-[#333]">
                    <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-gray-400" />
                        <span className="text-xs font-mono text-gray-400">demo.js</span>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                </div>
                <div className="flex-1 relative">
                    <LiveCodeEditor
                        ref={editorRef}
                        onRun={handleCodeRun}
                        initialCode="// AI is analyzing..."
                        title="" // Hide internal title
                        subtitle=""
                    />
                </div>
            </div>
        </div>
    );
}

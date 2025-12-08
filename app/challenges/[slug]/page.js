"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview } from '@codesandbox/sandpack-react';
import { atomDark } from '@codesandbox/sandpack-themes';
import { CheckCircle, AlertCircle, Lightbulb, ArrowLeft, RefreshCw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Header } from '../../components/Header';

export default function ChallengePage() {
    const { slug } = useParams();
    const router = useRouter();
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSolution, setShowSolution] = useState(false);
    const [solved, setSolved] = useState(false);
    const [userCode, setUserCode] = useState("");

    useEffect(() => {
        fetch(`/api/challenges/${slug}`)
            .then(res => res.json())
            .then(data => {
                setChallenge(data);
                setUserCode(data.initialCode);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [slug]);

    const handleVerify = () => {
        // Naive verification: Normalize whitespace and compare
        // In a real app, we would run unit tests against the code.
        const normalize = (str) => str.replace(/\s+/g, ' ').trim();
        
        // Simulating success for the demo:
        setSolved(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Award XP event
        window.dispatchEvent(new CustomEvent('xp-updated', { detail: { amount: challenge.xpReward, message: 'Challenge Solved!' } }));
    };

    if (loading) return (
        <div className="min-h-screen bg-dark-950 text-white">
            <Header showNav={true} />
            <div className="flex items-center justify-center h-[calc(100vh-80px)]">Loading Challenge...</div>
        </div>
    );
    
    if (!challenge) return (
        <div className="min-h-screen bg-dark-950 text-white">
            <Header showNav={true} />
            <div className="flex items-center justify-center h-[calc(100vh-80px)]">Challenge not found</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-dark-950 text-light-100 flex flex-col pt-20">
            <Header showNav={true} />
            
            {/* Challenge Toolbar */}
            <div className="border-b border-dark-800 bg-dark-900/95 backdrop-blur p-4 flex items-center justify-between sticky top-20 z-40 shadow-md">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-1.5 bg-dark-800 hover:bg-dark-700 rounded-lg text-sm text-light-300 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                    <div className="h-6 w-px bg-dark-700 mx-2"></div>
                    <div>
                        <h1 className="font-bold text-lg flex items-center gap-3">
                            {challenge.title}
                            <span className={`text-xs px-2 py-0.5 rounded border ${
                                challenge.difficulty === 'Easy' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                                challenge.difficulty === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
                                'bg-red-500/10 border-red-500/30 text-red-400'
                            }`}>
                                {challenge.difficulty}
                            </span>
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-light-400 bg-dark-800 px-3 py-1.5 rounded-full border border-dark-700">
                        <Zap size={14} className="text-brand-primary" fill="currentColor" />
                        <span>Reward: <span className="text-brand-primary font-bold">+{challenge.xpReward} XP</span></span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Instructions Panel */}
                <div className="w-full lg:w-1/3 p-6 overflow-y-auto border-r border-dark-800 bg-dark-900/30 scrollbar-thin scrollbar-thumb-dark-700">
                    <div className="prose prose-invert max-w-none mb-8">
                        <h3 className="text-lg font-bold text-white mb-2">The Mission</h3>
                        <p className="text-light-300 leading-relaxed">{challenge.description}</p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-blue-900/10 border border-blue-500/20 p-5 rounded-xl">
                            <h4 className="flex items-center gap-2 font-bold text-blue-400 mb-3 text-sm uppercase tracking-wide">
                                <Lightbulb size={16} /> Debugging Hints
                            </h4>
                            <ul className="list-disc list-inside text-sm text-blue-200/80 space-y-2">
                                {challenge.hints.map((hint, i) => (
                                    <li key={i}>{hint}</li>
                                ))}
                            </ul>
                        </div>

                        {solved ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl text-center shadow-lg shadow-green-900/20"
                            >
                                <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">Bug Squashed!</h3>
                                <p className="text-green-400 text-sm mb-4">You earned +{challenge.xpReward} XP</p>
                                <button 
                                    onClick={() => router.push('/challenges')}
                                    className="w-full px-6 py-3 bg-white text-green-900 hover:bg-green-50 rounded-xl font-bold transition-all"
                                >
                                    Next Challenge
                                </button>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={handleVerify}
                                    className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-dark-950 font-bold rounded-xl transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={18} />
                                    I Fixed It!
                                </button>
                                <button 
                                    onClick={() => setShowSolution(!showSolution)}
                                    className="w-full py-2 border border-dark-600 hover:bg-dark-800 text-light-400 rounded-xl text-sm transition-colors"
                                >
                                    {showSolution ? 'Hide Solution' : 'Stuck? Show Solution'}
                                </button>
                            </div>
                        )}
                        
                        {showSolution && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4"
                            >
                                <h4 className="font-bold text-light-300 mb-2 text-sm">Solution Code:</h4>
                                <div className="bg-dark-950 p-4 rounded-xl border border-dark-700 overflow-x-auto shadow-inner">
                                    <pre className="text-xs font-mono text-green-300">{challenge.solutionCode}</pre>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Editor Panel */}
                <div className="w-full lg:w-2/3 h-[600px] lg:h-auto flex flex-col bg-dark-950">
                    <SandpackProvider 
                        template="react" 
                        theme={atomDark}
                        files={{
                            "/App.js": userCode,
                        }}
                        options={{
                            showNavigator: false, 
                            showTabs: false,
                        }}
                    >
                        <SandpackLayout className="h-full !border-none !rounded-none">
                            <SandpackCodeEditor 
                                className="h-full" 
                                showLineNumbers 
                                showInlineErrors 
                            />
                            <SandpackPreview 
                                className="h-full border-l border-dark-800" 
                                showOpenInCodeSandbox={false} 
                                showRefreshButton={true}
                            />
                        </SandpackLayout>
                    </SandpackProvider>
                </div>
            </div>
        </div>
    );
}
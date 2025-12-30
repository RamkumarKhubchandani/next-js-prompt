"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";
import Taskbar from './Taskbar';
import Window from './Window';
import SlackApp from './Apps/Slack';
import CodeApp from './Apps/CodeApp';
import BrowserApp from './Apps/BrowserApp';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Briefcase, ArrowRight, Power } from 'lucide-react';
import { MISSIONS } from '../../lib/careerMissions';

export default function OSDesktop() {
    const [booting, setBooting] = useState(true);
    const [openApps, setOpenApps] = useState(['slack', 'vscode', 'browser']);
    const [activeApp, setActiveApp] = useState('vscode');
    const [missionComplete, setMissionComplete] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(0);

    const mission = MISSIONS[currentLevel];

    // Simulated Boot Effect
    useEffect(() => {
        const timer = setTimeout(() => setBooting(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const toggleApp = (id) => {
        if (openApps.includes(id)) {
            if (activeApp === id) {
                // Minimize logic could go here
                setActiveApp(id);
            } else {
                setActiveApp(id);
            }
        } else {
            setOpenApps([...openApps, id]);
            setActiveApp(id);
        }
    };

    const closeApp = (id) => {
        setOpenApps(openApps.filter(app => app !== id));
    };

    const handleMissionComplete = () => {
        setMissionComplete(true);
    };

    const handleNextLevel = () => {
        setMissionComplete(false);
        if (currentLevel < MISSIONS.length - 1) {
            setCurrentLevel(prev => prev + 1);
            // Flash effect or sound could go here
        }
    };

    if (booting) {
        return (
            <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white z-50">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-8"></div>
                <h1 className="text-2xl font-bold tracking-widest animate-pulse">DEVOS <span className="text-blue-500">v2.0</span></h1>
                <p className="text-gray-500 mt-2 font-mono text-sm">Initializing Environment...</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full min-h-screen bg-gradient-to-br from-gray-900 via-[#0f1016] to-black overflow-hidden font-sans select-none">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

            {/* Ambient Glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <SandpackProvider
                key={mission.id}
                template="react"
                theme={atomDark}
                files={mission.files}
                options={{
                    externalResources: ["https://cdn.tailwindcss.com"]
                }}
                customSetup={{
                    dependencies: {
                        "lucide-react": "latest",
                        "framer-motion": "latest"
                    }
                }}
            >

                {/* Top Bar / Menu Bar */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 z-50 text-xs font-medium text-gray-300">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
                            <ArrowLeft size={12} /> Exit
                        </Link>
                        <div className="h-3 w-px bg-white/10"></div>
                        <span className="flex items-center gap-1 text-blue-400">
                            <Briefcase size={12} /> Level {currentLevel + 1}: {mission.title}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>

                {/* Windows Container */}
                <div className="absolute inset-0 pt-8 pb-20 pointer-events-none">
                    <AnimatePresence>
                        {openApps.includes('slack') && (
                            <div className="pointer-events-auto contents">
                                <Window
                                    key="slack"
                                    id="slack"
                                    title="Slack - NextCorp Team"
                                    isActive={activeApp === 'slack'}
                                    onClose={closeApp}
                                    onFocus={setActiveApp}
                                >
                                    <SlackApp messages={mission.slackMessages} />
                                </Window>
                            </div>
                        )}
                        {openApps.includes('vscode') && (
                            <div className="pointer-events-auto contents">
                                <Window
                                    key="vscode"
                                    id="vscode"
                                    title={`VS Code - ${mission.title}`}
                                    isActive={activeApp === 'vscode'}
                                    onClose={closeApp}
                                    onFocus={setActiveApp}
                                >
                                    <CodeApp mission={mission} onComplete={handleMissionComplete} />
                                </Window>
                            </div>
                        )}
                        {openApps.includes('browser') && (
                            <div className="pointer-events-auto contents">
                                <Window
                                    key="browser"
                                    id="browser"
                                    title="Chrome - localhost:3000"
                                    isActive={activeApp === 'browser'}
                                    onClose={closeApp}
                                    onFocus={setActiveApp}
                                >
                                    <BrowserApp />
                                </Window>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mission Success Overlay */}
                <AnimatePresence>
                    {missionComplete && (
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-[#18181b] p-8 rounded-2xl border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)] text-center max-w-md w-full relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600"></div>

                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/50"
                                >
                                    <CheckCircle size={40} className="text-green-500" />
                                </motion.div>

                                <h2 className="text-3xl font-bold text-white mb-2">Mission Passed!</h2>
                                <p className="text-gray-400 mb-6">Excellent work. You earned <span className="text-green-400 font-bold">+{mission.xp} XP</span></p>

                                <div className="space-y-3">
                                    {currentLevel < MISSIONS.length - 1 ? (
                                        <button
                                            onClick={handleNextLevel}
                                            className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition shadow-lg flex items-center justify-center gap-2 group"
                                        >
                                            Next Mission
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    ) : (
                                        <Link href="/dashboard" className="block w-full">
                                            <button className="w-full px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold transition shadow-lg shadow-green-600/20">
                                                Return to Menu
                                            </button>
                                        </Link>
                                    )}

                                    <button
                                        onClick={() => setMissionComplete(false)}
                                        className="text-sm text-gray-500 hover:text-gray-300 transition mt-2"
                                    >
                                        Review Code
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </SandpackProvider>

            {/* Taskbar */}
            <Taskbar openApps={openApps} activeApp={activeApp} onAppClick={toggleApp} />
        </div>
    );
}

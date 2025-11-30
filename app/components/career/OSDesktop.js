"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";
import Taskbar from './Taskbar';
import Window from './Window';
import SlackApp from './Apps/Slack';
import CodeApp from './Apps/CodeApp';
import BrowserApp from './Apps/BrowserApp';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Briefcase, ArrowRight } from 'lucide-react';
import { MISSIONS } from '../../lib/careerMissions';

export default function OSDesktop() {
    const [openApps, setOpenApps] = useState(['slack', 'vscode', 'browser']);
    const [activeApp, setActiveApp] = useState('vscode');
    const [missionComplete, setMissionComplete] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(0);

    const mission = MISSIONS[currentLevel];

    const toggleApp = (id) => {
        if (openApps.includes(id)) {
            if (activeApp === id) {
                // Minimize (remove from list) - Optional: separate minimized state
                // For now, just focus
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
            // Reset apps or just keep them open? keeping them open is smoother
        }
    };

    return (
        <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-[#1a1b26] to-black overflow-hidden font-sans">
            {/* Background Elements (Optional) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <SandpackProvider
                key={mission.id} // Force reset on level change to load new files
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
                
                <div className="absolute top-4 left-4 z-50 flex items-center gap-4">
                    <Link href="/dashboard">
                        <button className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur text-white rounded-lg hover:bg-black/70 transition border border-white/10">
                            <ArrowLeft size={16} /> Exit Simulation
                        </button>
                    </Link>
                    <div className="px-4 py-2 bg-black/50 backdrop-blur text-white rounded-lg border border-white/10 flex items-center gap-2">
                        <Briefcase size={16} className="text-blue-400" />
                        <span className="font-bold text-sm">Level {currentLevel + 1}: {mission.title}</span>
                    </div>
                </div>

                {/* Windows */}
                <AnimatePresence>
                    {openApps.includes('slack') && (
                        <Window 
                            key="slack"
                            id="slack" 
                            title="Slack - NextCorp" 
                            isActive={activeApp === 'slack'} 
                            onClose={closeApp} 
                            onFocus={setActiveApp}
                        >
                            <SlackApp messages={mission.slackMessages} />
                        </Window>
                    )}
                    {openApps.includes('vscode') && (
                        <Window 
                            key="vscode"
                            id="vscode" 
                            title="VS Code - NextCorp Repo" 
                            isActive={activeApp === 'vscode'} 
                            onClose={closeApp} 
                            onFocus={setActiveApp}
                        >
                            <CodeApp mission={mission} onComplete={handleMissionComplete} />
                        </Window>
                    )}
                    {openApps.includes('browser') && (
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
                    )}
                </AnimatePresence>
            </SandpackProvider>

            {/* Taskbar - Outside SandpackProvider context, but visually on top */}
            <Taskbar openApps={openApps} activeApp={activeApp} onAppClick={toggleApp} />

            {/* Mission Success Overlay */}
            {missionComplete && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                >
                    <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-green-500/50 shadow-2xl text-center max-w-md relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
                        
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                            <CheckCircle size={40} className="text-white" />
                        </div>
                        
                        <h2 className="text-3xl font-bold text-white mb-2">Mission Accomplished!</h2>
                        <p className="text-gray-400 mb-2">You earned <span className="text-yellow-400 font-bold">+{mission.xp} XP</span></p>
                        <p className="text-gray-500 text-sm mb-8">The team is impressed with your work.</p>
                        
                        <div className="flex flex-col gap-3 justify-center">
                            {currentLevel < MISSIONS.length - 1 ? (
                                <button 
                                    onClick={handleNextLevel}
                                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold transition shadow-lg flex items-center justify-center gap-2"
                                >
                                    Next Mission <ArrowRight size={18} />
                                </button>
                            ) : (
                                <Link href="/dashboard">
                                    <button className="w-full px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold transition shadow-lg shadow-green-600/20">
                                        Finish Internship & Claim Rewards
                                    </button>
                                </Link>
                            )}
                            
                            <button 
                                onClick={() => setMissionComplete(false)}
                                className="text-sm text-gray-500 hover:text-gray-300 transition"
                            >
                                Stay on this level
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

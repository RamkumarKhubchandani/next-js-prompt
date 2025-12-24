"use client";
import { SandpackCodeEditor, useSandpack } from "@codesandbox/sandpack-react";
import { Play, CheckCircle, AlertTriangle, Rocket, Loader2, X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function CodeApp({ mission, onComplete }) {
    const { sandpack } = useSandpack();
    const [status, setStatus] = useState('idle'); // idle, checking, success, error
    const [errorMsg, setErrorMsg] = useState('');
    
    // Deploy State
    const [showDeployModal, setShowDeployModal] = useState(false);
    const [deployStatus, setDeployStatus] = useState('idle');
    const [projectTitle, setProjectTitle] = useState('');
    
    const { data: session } = useSession();
    const router = useRouter();

    // Reset status when mission changes
    useEffect(() => {
        setStatus('idle');
        setErrorMsg('');
    }, [mission]);

    const handlePush = () => {
        setStatus('checking');
        const code = sandpack.files['/App.js'].code;
        const files = sandpack.files;
        
        // Simulate AI Review
        setTimeout(() => {
            try {
                const isValid = mission.validate(code, files);
                if (isValid) {
                    setStatus('success');
                    onComplete();
                } else {
                    setStatus('error');
                    setErrorMsg('Tests failed. Check requirements.');
                }
            } catch (e) {
                console.error(e);
                setStatus('error');
                setErrorMsg('Validation error.');
            }
        }, 1500);
    };

    const handleDeploy = async () => {
        if (!projectTitle) return;
        setDeployStatus('saving');
        const code = sandpack.files['/App.js'].code;

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: projectTitle,
                    code,
                    template: 'react'
                })
            });

            if (res.ok) {
                setDeployStatus('saved');
                setTimeout(() => {
                    setShowDeployModal(false);
                    setDeployStatus('idle');
                    router.push('/showcase');
                }, 1500);
            } else {
                setDeployStatus('error');
            }
        } catch (e) {
            setDeployStatus('error');
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] relative">
            {/* Toolbar */}
            <div className="h-10 bg-[#252526] flex items-center px-4 justify-between border-b border-black/20">
                <div className="text-xs text-gray-400 flex gap-4">
                    <span className="hover:text-white cursor-pointer">File</span>
                    <span className="hover:text-white cursor-pointer">Edit</span>
                    <span className="hover:text-white cursor-pointer">View</span>
                </div>
                <div className="flex items-center gap-4">
                    {status === 'error' && (
                        <span className="text-xs text-red-400 flex items-center gap-1">
                            <AlertTriangle size={10} /> {errorMsg}
                        </span>
                    )}
                    
                    {/* Share Button */}
                    <button 
                        onClick={() => session ? setShowDeployModal(true) : router.push('/login')}
                        className="text-gray-400 hover:text-white transition p-1"
                        title="Share Solution to Showcase"
                    >
                        <Rocket size={14} />
                    </button>

                    {/* Push Button */}
                    <button 
                        onClick={handlePush}
                        disabled={status === 'checking' || status === 'success'}
                        className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-bold transition-colors ${
                            status === 'success' ? 'bg-green-600 text-white' : 
                            status === 'error' ? 'bg-red-600 text-white' :
                            'bg-blue-600 text-white hover:bg-blue-700'
                        } ${status === 'checking' ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {status === 'checking' ? 'Running Tests...' : 
                        status === 'success' ? 'Deployed!' : 
                        status === 'error' ? 'Retry Push' : 
                        'Push to Prod'}
                        <Play size={10} fill="currentColor" />
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 overflow-hidden">
                <SandpackCodeEditor 
                    showTabs={true}
                    showLineNumbers={true}
                    showInlineErrors={true}
                    wrapContent={true}
                    closableTabs={false}
                    initMode="immediate"
                    style={{ height: '100%' }}
                />
            </div>
            
            {/* Status Bar */}
            <div className="h-6 bg-[#007acc] flex items-center px-2 text-[10px] text-white justify-between">
                <div className="flex gap-3">
                    <span>main*</span>
                    <span>0 errors</span>
                </div>
                <span>JavaScript React</span>
            </div>

            {/* Deploy Modal */}
            <AnimatePresence>
                {showDeployModal && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                         <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#252526] p-6 rounded-xl border border-black/20 w-full max-w-sm shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    <Rocket className="text-blue-400" size={18} /> Share Solution
                                </h3>
                                <button onClick={() => setShowDeployModal(false)} className="text-gray-400 hover:text-white"><X size={18} /></button>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Project Title</label>
                                    <input 
                                        autoFocus
                                        type="text" 
                                        value={projectTitle} 
                                        onChange={(e) => setProjectTitle(e.target.value)} 
                                        placeholder={`Solution for ${mission?.title || 'Mission'}`}
                                        className="w-full bg-[#1e1e1e] border border-[#3e3e3e] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition"
                                    />
                                </div>
                                
                                <button 
                                    onClick={handleDeploy}
                                    disabled={!projectTitle || deployStatus === 'saving'}
                                    className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                                >
                                    {deployStatus === 'saving' ? <Loader2 className="animate-spin" size={16} /> : 
                                     deployStatus === 'saved' ? <Check size={16} /> : 'Publish to Showcase'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

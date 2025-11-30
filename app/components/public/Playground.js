'use client';

import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";
import { Rocket, Loader2, Check, X } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const DeployButton = () => {
    const { sandpack } = useSandpack();
    const { data: session } = useSession();
    const [status, setStatus] = useState('idle'); // idle, saving, saved, error
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const router = useRouter();

    const handleDeploy = async () => {
        if (!title) return;
        setStatus('saving');
        const code = sandpack.files['/App.js'].code;

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    code,
                    template: 'react'
                })
            });

            if (res.ok) {
                setStatus('saved');
                setTimeout(() => {
                    setShowModal(false);
                    setStatus('idle');
                    router.push('/showcase');
                }, 1500);
            } else {
                setStatus('error');
            }
        } catch (e) {
            setStatus('error');
        }
    };

    const handleClick = () => {
        if (!session) {
            router.push('/login');
            return;
        }
        setShowModal(true);
    };

    return (
        <>
            <button 
                onClick={handleClick}
                className="absolute bottom-4 right-4 z-50 bg-brand-primary text-dark-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center gap-2"
                title="Deploy to Showcase"
            >
                <Rocket size={16} />
                Deploy
            </button>

            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-dark-800 p-6 rounded-2xl border border-dark-700 w-full max-w-md shadow-2xl"
                        >
                            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
                            
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Rocket className="text-brand-primary" /> Deploy Project
                            </h3>
                            <p className="text-gray-400 mb-6 text-sm">Save this code to your profile and share it with the community.</p>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Project Title</label>
                                    <input 
                                        autoFocus
                                        type="text" 
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        placeholder="e.g. My Awesome Component"
                                        className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition"
                                    />
                                </div>
                                
                                <button 
                                    onClick={handleDeploy}
                                    disabled={!title || status === 'saving'}
                                    className="w-full bg-brand-primary text-dark-900 font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {status === 'saving' ? <Loader2 className="animate-spin" /> : 
                                     status === 'saved' ? <Check /> : 'Publish to Showcase'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default function Playground({ code, template = "react" }) {
  return (
      <SandpackProvider
        template={template}
        theme={atomDark}
        files={{
          "/App.js": code,
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
        customSetup={{
            dependencies: {
                "lucide-react": "latest",
                "framer-motion": "latest"
            }
        }}
      >
        <div className="h-[500px] border border-dark-700 rounded-xl overflow-hidden flex flex-col relative group">
            <SandpackLayout style={{ height: '100%', border: 'none', borderRadius: 0 }}>
                <SandpackCodeEditor 
                    showLineNumbers 
                    showInlineErrors 
                    showTabs
                    style={{ height: '100%' }}
                />
                <SandpackPreview 
                    showNavigator 
                    showRefreshButton={false}
                    showOpenInCodeSandbox={false}
                    style={{ height: '100%' }}
                />
            </SandpackLayout>
            <DeployButton />
        </div>
      </SandpackProvider>
  );
}

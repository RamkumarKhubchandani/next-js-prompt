"use client";
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";
import { Copy, Check, Mic, Video, Save, Lock, ArrowDownCircle, Users, UserPlus, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// --- STRICT MANUAL SYNC ---
// Logic:
// 1. User types -> Nothing happens (local only).
// 2. User clicks "SAVE" -> Pushes to DB.
// 3. User clicks "REFRESH" -> Pulls from DB.
// 4. No auto-saving, no auto-polling.

function ManualSyncControls({ roomId, setExternalCode }) {
    const { sandpack } = useSandpack();
    const [isSaving, setIsSaving] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [lastAction, setLastAction] = useState(null);

    const handleSave = async () => {
        setIsSaving(true);
        const code = sandpack.files["App.js"]?.code;
        try {
            await fetch(`/api/pair/${roomId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            });
            setLastAction(`Saved at ${new Date().toLocaleTimeString()}`);
        } catch (err) {
            console.error(err);
            alert("Failed to save changes.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleFetch = async () => {
        setIsFetching(true);
        try {
            const res = await fetch(`/api/pair/${roomId}`);
            const data = await res.json();

            if (data.code) {
                const currentCode = sandpack.files["App.js"]?.code;
                if (currentCode !== data.code) {
                    setExternalCode(data.code);
                    setLastAction(`Updated at ${new Date().toLocaleTimeString()}`);
                } else {
                    setLastAction("You are already up to date.");
                }
            } else {
                setLastAction("No saved code found.");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <span className="hidden md:inline text-xs text-gray-500 mr-2">{lastAction}</span>

            <button
                onClick={handleFetch}
                disabled={isFetching}
                className="flex items-center gap-2 px-3 py-1.5 bg-dark-800 hover:bg-dark-700 text-white rounded-lg border border-dark-600 transition-colors text-xs font-medium"
            >
                <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
                Load Friend's Code
            </button>

            <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-xs font-bold shadow-lg shadow-blue-600/20"
            >
                <Save size={14} />
                {isSaving ? 'Saving...' : 'Save My Changes'}
            </button>
        </div>
    );
}

// Internal sandbox component to receive updates
function EditorController({ externalCode }) {
    const { sandpack } = useSandpack();

    useEffect(() => {
        if (externalCode !== null) {
            sandpack.updateFile("App.js", externalCode);
        }
    }, [externalCode, sandpack]);

    return null;
}

export default function RoomPage() {
    const params = useParams();
    const router = useRouter();
    const roomId = params.roomId;
    const [copied, setCopied] = useState(false);
    const [externalCode, setExternalCode] = useState(null);

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const initialCode = `import React from "react";

export default function App() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          DevRoom: ${roomId} 
        </h1>
        <p className="text-gray-400 mb-8">Manual Sync Mode Active</p>
        
        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 max-w-sm mx-auto">
           <p className="font-mono text-blue-400">1. Type Code</p>
           <p className="font-mono text-green-400 mt-2">2. Click 'Save My Changes'</p>
           <p className="font-mono text-yellow-400 mt-2">3. Friend clicks 'Load'</p>
        </div>
      </div>
    </div>
  );
}`;

    // On initial load, fetch the code ONCE so the user sees the saved state.
    useEffect(() => {
        const init = async () => {
            try {
                // console.log("Fetching initial room state...");
                const res = await fetch(`/api/pair/${roomId}`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                if (data.code) {
                    setExternalCode(data.code);
                }
            } catch (e) {
                console.error("Initial load failed:", e);
            }
        };
        init();
    }, []); // Empty dependency array = Runs once on mount only.


    return (
        <div className="h-screen flex flex-col bg-dark-900 overflow-hidden font-sans">
            {/* Header */}
            <header className="h-16 bg-dark-800 border-b border-dark-700 flex items-center justify-between px-6 shadow-sm z-50">
                <div className="flex items-center gap-6">
                    <button onClick={() => router.push('/pair')} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-medium">
                        &larr; Exit
                    </button>

                    <div className="h-8 w-px bg-dark-700"></div>

                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-sm tracking-tight leading-none mb-1">Room {roomId}</span>
                            <span className="text-xs text-gray-400 leading-none flex items-center gap-1 font-mono">
                                <Lock size={10} /> Secure & Ephemeral (24h)
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={copyLink}
                        className="flex items-center gap-2 px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-all text-xs font-bold border border-dark-600"
                    >
                        {copied ? <Check size={14} /> : <UserPlus size={14} />}
                        {copied ? 'Copied!' : 'Invite'}
                    </button>
                </div>
            </header>

            {/* Main Editor Area */}
            <div className="flex-1 flex relative">
                <SandpackProvider
                    template="react"
                    theme={atomDark}
                    options={{
                        externalResources: ["https://cdn.tailwindcss.com"]
                    }}
                    files={{
                        "App.js": initialCode,
                    }}
                >
                    <div className="absolute top-4 right-4 z-50">
                        <ManualSyncControls
                            roomId={roomId}
                            setExternalCode={setExternalCode}
                        />
                    </div>

                    <EditorController externalCode={externalCode} />

                    <SandpackLayout className="h-full w-full border-none rounded-none !bg-dark-900 grid grid-cols-1 lg:grid-cols-2">
                        <SandpackCodeEditor
                            showLineNumbers
                            showInlineErrors
                            wrapContent
                            closableTabs
                            className="h-full border-b lg:border-b-0 lg:border-r border-dark-700"
                            style={{ height: '100%' }}
                        />
                        <SandpackPreview
                            className="h-full"
                            showNavigator={true}
                            style={{ height: '100%' }}
                        />
                    </SandpackLayout>
                </SandpackProvider>
            </div>

            {/* Bottom Bar */}
            <div className="h-16 bg-dark-900 border-t border-dark-700 flex items-center justify-between px-8 text-gray-400">
                <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">
                        Collaborating? Please save your changes manually to share them.
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-3 bg-dark-800 hover:bg-dark-700 rounded-full hover:text-white transition-all"><Mic size={18} /></button>
                    <button className="p-3 bg-dark-800 hover:bg-dark-700 rounded-full hover:text-white transition-all"><Video size={18} /></button>
                </div>
            </div>
        </div>
    );
}

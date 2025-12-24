"use client";
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";
import { Copy, Check, Users, Mic, Video, Monitor, MessageSquare, Cloud, Wifi, WifiOff } from 'lucide-react';
import Link from 'next/link';
import io from 'socket.io-client';

// GLOBAL SOCKET SINGLETON
let socket;

const getSocket = () => {
    if (!socket) {
        socket = io({
            path: '/socket.io',
            transports: ['websocket'], // Force Websocket for speed
        });
    }
    return socket;
};

// Helper component to handle code syncing
function SyncManager({ roomId, onCodeChange, externalCode, isConnected }) {
    const { sandpack } = useSandpack();
    const [isTyping, setIsTyping] = useState(false);
    const timeoutRef = useRef(null);

    // 1. Listen for internal changes (User Typing)
    useEffect(() => {
        const code = sandpack.files["App.js"]?.code || sandpack.files["/App.js"]?.code;
        if (!code) return;

        // Avoid echo
        if (code === externalCode) return;

        // Debounce emission
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        setIsTyping(true);
        timeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            if (isConnected) {
                console.log('SYNC: Sending...');
                onCodeChange(code);
            }
        }, 100); // Ultra fast debounce (100ms)

    }, [sandpack.files, onCodeChange, isConnected, externalCode]);

    // 2. Listen for external changes (Socket Updates)
    useEffect(() => {
        const currentCode = sandpack.files["App.js"]?.code || sandpack.files["/App.js"]?.code;
        if (externalCode && externalCode !== currentCode) {
            console.log('SYNC: Receiving...');
            sandpack.updateFile("App.js", externalCode);
        }
    }, [externalCode, sandpack, isTyping]); // Update even if typing to force sync

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800 rounded-lg border border-dark-700 text-xs font-mono text-light-400">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            {isTyping ? 'Typing...' : (isConnected ? 'Live' : 'Disconnected')}
        </div>
    );
}

export default function RoomPage() {
    const params = useParams();
    const roomId = params.roomId;
    const [copied, setCopied] = useState(false);
    const [externalCode, setExternalCode] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    // Initial Load & Socket Connection
    useEffect(() => {
        const s = getSocket();

        const onConnect = () => {
            console.log(`Socket Connected: ${s.id}`);
            setIsConnected(true);
            s.emit('join-room', roomId);
        };

        const onDisconnect = () => {
            console.log('Socket Disconnected');
            setIsConnected(false);
        };

        const onCodeUpdate = (newCode) => {
            console.log('Received Update from Server');
            setExternalCode(newCode);
        };

        s.on('connect', onConnect);
        s.on('disconnect', onDisconnect);
        s.on('code-update', onCodeUpdate);

        // If already connected (re-render)
        if (s.connected) {
            onConnect();
        }

        return () => {
            s.off('connect', onConnect);
            s.off('disconnect', onDisconnect);
            s.off('code-update', onCodeUpdate);
        };
    }, [roomId]);

    const handleEmitCode = (newCode) => {
        const s = getSocket();
        if (s) {
            s.emit('code-change', { roomId, code: newCode });
        }
    };

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
          Hello from Room ${roomId}
        </h1>
        <p className="text-gray-400">Start typing to see real-time magic!</p>
      </div>
    </div>
  );
}`;

    return (
        <div className="h-screen flex flex-col bg-dark-900 overflow-hidden">
            {/* Header */}
            <header className="h-14 bg-dark-800 border-b border-dark-700 flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Link href="/pair" className="text-light-400 hover:text-white">
                        &larr; Leave
                    </Link>
                    <div className="h-6 w-px bg-dark-700"></div>
                    <div className="flex items-center gap-2">
                        {isConnected ? <Wifi size={16} className="text-green-500" /> : <WifiOff size={16} className="text-red-500" />}
                        <span className="text-white font-bold text-sm">Room: {roomId}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={copyLink}
                        className="flex items-center gap-2 px-3 py-1.5 bg-brand-primary/10 text-brand-primary rounded-lg hover:bg-brand-primary/20 transition-colors text-sm font-medium"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied!' : 'Invite Link'}
                    </button>
                </div>
            </header>

            {/* Main Editor Area */}
            <div className="flex-1 flex">
                <SandpackProvider
                    template="react"
                    theme={atomDark}
                    options={{
                        externalResources: ["https://cdn.tailwindcss.com"]
                    }}
                    files={{
                        "App.js": initialCode, // Initial load only
                    }}
                >
                    <SandpackLayout className="h-full w-full border-none rounded-none !bg-dark-900">
                        <SandpackCodeEditor 
                            showLineNumbers
                            showInlineErrors
                            wrapContent
                            closableTabs
                            className="h-full border-r border-dark-700"
                            style={{ height: '100%' }}
                        />
                        <SandpackPreview 
                            className="h-full"
                            showNavigator={true}
                            style={{ height: '100%' }}
                        />
                        <div className="absolute bottom-4 right-4 z-50">
                             <SyncManager 
                                roomId={roomId} 
                                onCodeChange={handleEmitCode} 
                                externalCode={externalCode}
                                isConnected={isConnected}
                             />
                        </div>
                    </SandpackLayout>
                </SandpackProvider>
            </div>

            <div className="h-12 bg-dark-900 border-t border-dark-700 flex items-center justify-center gap-6 text-light-400">
                <button className="p-2 hover:bg-dark-800 rounded-full hover:text-white transition-colors"><Mic size={20} /></button>
                <button className="p-2 hover:bg-dark-800 rounded-full hover:text-white transition-colors"><Video size={20} /></button>
                <button className="p-2 hover:bg-dark-800 rounded-full hover:text-white transition-colors"><Monitor size={20} /></button>
                <button className="p-2 hover:bg-dark-800 rounded-full hover:text-white transition-colors"><MessageSquare size={20} /></button>
            </div>
        </div>
    );
}

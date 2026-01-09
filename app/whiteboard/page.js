"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/app/components/Header';
import { Layers, Database, Globe, Server, Cloud, Cpu, Lock, CheckCircle, AlertTriangle, Play, Sparkles, Trophy, ArrowRight, ArrowLeft, MessageSquare, CreditCard, Clock, Activity, Edit3, Search, Video, MapPin, MousePointer } from 'lucide-react';
import Link from 'next/link';
import SystemDesignCanvas from '../components/SystemDesignCanvas';


const COMPONENTS = [
    { id: 'client', label: 'Client', icon: Globe, color: 'text-blue-500' },
    { id: 'lb', label: 'Load Balancer', icon: Layers, color: 'text-indigo-500' },
    { id: 'server', label: 'App Server', icon: Server, color: 'text-green-500' },
    { id: 'db', label: 'Database', icon: Database, color: 'text-orange-500' },
    { id: 'cache', label: 'Cache (Redis)', icon: Cpu, color: 'text-red-500' },
    { id: 'cdn', label: 'CDN', icon: Cloud, color: 'text-sky-500' },
    { id: 'auth', label: 'Auth Service', icon: Lock, color: 'text-yellow-500' },
];

export default function WhiteboardPage() {
    const [analyzing, setAnalyzing] = useState(false);
    const canvasRef = React.useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleComponentClick = (component) => {
        if (canvasRef.current) {
            canvasRef.current.addToScene(component.id, component.label, component.color);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-slate-900 dark:text-white font-sans selection:bg-brand-primary/30">
            <Header />

            <main className="pt-24 pb-12 px-4 min-h-screen flex flex-col">
                <div className="max-w-7xl mx-auto w-full mb-8 flex justify-between items-center">
                    <div>
                        <Link href="/system-design" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-primary transition-colors font-medium mb-2">
                            <ArrowLeft size={20} /> Back to System Design
                        </Link>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Freeform Whiteboard</h1>
                        <p className="text-gray-500">Powered by Excalidraw</p>
                    </div>
                </div>

                <div className="flex-1 flex gap-6 max-w-7xl mx-auto w-full overflow-hidden h-[80vh]">
                    {/* Toolbar */}
                    <div className="w-64 bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-4 shadow-xl overflow-y-auto">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Components</h3>
                        <div className="space-y-3">
                            {COMPONENTS.map(c => (
                                <div
                                    key={c.id}
                                    draggable
                                    onDragStart={(e) => {
                                        setIsDragging(true);
                                        e.dataTransfer.setData("type", c.id);
                                        e.dataTransfer.setData("label", c.label);
                                        e.dataTransfer.setData("color", c.color);
                                    }}
                                    onDragEnd={() => setIsDragging(false)}
                                    onClick={() => handleComponentClick(c)}
                                    className="p-3 bg-gray-50 dark:bg-dark-900 border border-gray-100 dark:border-dark-700 rounded-xl cursor-grab active:cursor-grabbing hover:border-brand-primary dark:hover:border-brand-primary transition-colors flex items-center gap-3 active:scale-95"
                                >
                                    <c.icon size={20} className={c.color} />
                                    <span className="font-bold text-sm">{c.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Canvas */}
                    <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-dark-700 relative bg-white">
                        <SystemDesignCanvas ref={canvasRef} />

                        {isDragging && (
                            <div
                                className="absolute inset-0 z-50 bg-blue-500/10 border-4 border-blue-500 rounded-2xl flex items-center justify-center pointer-events-auto"
                                onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "copy"; }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    const type = e.dataTransfer.getData("type");
                                    const label = e.dataTransfer.getData("label");
                                    const color = e.dataTransfer.getData("color");
                                    if (type && canvasRef.current) {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = e.clientY - rect.top;
                                        canvasRef.current.addToScene(type, label, color, x, y);
                                    }
                                }}
                            >
                                <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce">
                                    Drop Application Component Here
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

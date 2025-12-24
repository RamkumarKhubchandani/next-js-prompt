"use client";
import { motion } from 'framer-motion';
import { Terminal, MessageSquare, Chrome, Code2, Settings } from 'lucide-react';

export default function Taskbar({ openApps, activeApp, onAppClick }) {
    const apps = [
        { id: 'slack', icon: MessageSquare, color: 'text-purple-400', label: 'Chat' },
        { id: 'vscode', icon: Code2, color: 'text-blue-400', label: 'Code' },
        { id: 'browser', icon: Chrome, color: 'text-yellow-400', label: 'Preview' },
        { id: 'terminal', icon: Terminal, color: 'text-green-400', label: 'Terminal' },
    ];

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2 flex gap-4 shadow-2xl z-50">
            {apps.map((app) => {
                const Icon = app.icon;
                const isOpen = openApps.includes(app.id);
                const isActive = activeApp === app.id;

                return (
                    <motion.button
                        key={app.id}
                        onClick={() => onAppClick(app.id)}
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className={`relative p-3 rounded-xl transition-all ${
                            isActive ? 'bg-white/10' : 'hover:bg-white/5'
                        }`}
                    >
                        <Icon className={`w-8 h-8 ${app.color}`} />
                        {isOpen && (
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}




"use client";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { User, Bot, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CodeComparison({ juniorCode, seniorCode, language = "javascript" }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Junior Side */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-red-900/30 bg-dark-800/50 overflow-hidden"
            >
                <div className="bg-red-900/20 border-b border-red-900/30 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-200 font-bold">
                        <User size={18} />
                        <span>Junior Dev</span>
                    </div>
                    <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/30">
                        Legacy / Risky
                    </span>
                </div>
                <div className="relative group">
                    <SyntaxHighlighter 
                        language={language} 
                        style={atomDark}
                        customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            background: 'transparent',
                            fontSize: '0.85rem',
                            lineHeight: '1.5'
                        }}
                    >
                        {juniorCode}
                    </SyntaxHighlighter>
                    {/* Hover Overlay Explanation */}
                    <div className="absolute inset-0 bg-dark-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 backdrop-blur-sm pointer-events-none">
                        <div className="text-red-200 text-center">
                            <AlertCircle className="w-10 h-10 mx-auto mb-2" />
                            <p className="font-bold">Issues Detected:</p>
                            <ul className="text-sm text-left list-disc list-inside mt-2 space-y-1">
                                <li>Var Hoisting Bugs</li>
                                <li>Global Scope Pollution</li>
                                <li>Callback Hell</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Senior/AI Side */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-green-900/30 bg-dark-800/50 overflow-hidden"
            >
                <div className="bg-green-900/20 border-b border-green-900/30 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-200 font-bold">
                        <Bot size={18} />
                        <span>AI Architect</span>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded border border-green-500/30">
                        Optimized
                    </span>
                </div>
                <div className="relative">
                    <SyntaxHighlighter 
                        language={language} 
                        style={atomDark}
                        customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            background: 'transparent',
                            fontSize: '0.85rem',
                            lineHeight: '1.5'
                        }}
                    >
                        {seniorCode}
                    </SyntaxHighlighter>
                    <div className="absolute bottom-4 right-4">
                        <CheckCircle2 className="text-green-500 w-6 h-6" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

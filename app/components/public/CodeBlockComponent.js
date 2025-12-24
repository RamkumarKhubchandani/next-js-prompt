"use client";

import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { Copy, Check } from 'lucide-react';
import Playground from './Playground';

export default function CodeBlockComponent({ node }) {
    const [copied, setCopied] = useState(false);
    const language = node.attrs.language;

    // Handle Interactive Playground
    if (language === 'interactive-react') {
        return (
            <NodeViewWrapper className="my-10 not-prose">
                <div className="rounded-xl overflow-hidden border border-dark-700 shadow-2xl ring-1 ring-white/5">
                     <div className="flex items-center justify-between px-4 py-3 bg-dark-800 border-b border-dark-700">
                        <span className="text-xs font-mono text-brand-primary uppercase tracking-wider flex items-center gap-2 font-bold">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                            </span>
                            Live Playground
                        </span>
                     </div>
                    {/* Wrapper for Sandpack to ensure it fills correctly */}
                    <div className="bg-[#151515]">
                        <Playground code={node.textContent} template="react" />
                    </div>
                </div>
            </NodeViewWrapper>
        );
    }

    const handleCopy = () => {
        const code = node.textContent;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <NodeViewWrapper className="my-6 rounded-xl overflow-hidden border border-dark-700 shadow-lg not-prose bg-dark-800">
            <div className="flex justify-between items-center px-4 py-2.5 bg-dark-700/50 border-b border-dark-700">
                 <span className="text-xs text-light-300 font-mono uppercase tracking-wide">{language || 'text'}</span>
                 <button
                    onClick={handleCopy}
                    className="p-1.5 hover:bg-dark-600 rounded-md transition-all duration-200 text-light-300 hover:text-white"
                    title="Copy code"
                >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
            </div>
            <div className="relative">
                <pre className="p-4 m-0 overflow-x-auto text-sm font-mono leading-relaxed text-light-100 bg-dark-800">
                    <NodeViewContent as="code" />
                </pre>
            </div>
        </NodeViewWrapper>
    );
}

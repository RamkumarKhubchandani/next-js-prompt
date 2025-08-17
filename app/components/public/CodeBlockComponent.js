"use client";
import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlockComponent({ node }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const code = node.textContent;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <NodeViewWrapper className="relative group">
            <pre className="bg-dark-800 text-light-100 p-4 rounded-lg overflow-x-auto">
                <NodeViewContent as="code" />
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-dark-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
        </NodeViewWrapper>
    );
}

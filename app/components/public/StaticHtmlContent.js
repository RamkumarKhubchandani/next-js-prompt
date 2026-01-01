"use client";

import React, { useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * Renders static HTML and hydrates <pre> blocks with Syntax Highlighting and Copy buttons.
 */
export default function StaticHtmlContent({ content }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Find all pre tags
        const preElements = containerRef.current.querySelectorAll('pre');

        preElements.forEach((pre) => {
            // Check if already processed
            if (pre.dataset.hydrated) return;
            pre.dataset.hydrated = "true";

            // Extract code and language
            // Assuming format: <pre><code>...code...</code></pre>
            // or <pre><code class="language-js">...</code></pre>
            const codeElement = pre.querySelector('code');
            const rawCode = codeElement ? codeElement.innerText : pre.innerText;

            // Try to detect language from class (e.g., language-js) or default to javascript
            const className = codeElement?.className || '';
            const match = /language-(\w+)/.exec(className);
            const language = match ? match[1] : 'javascript';

            // Create a container strictly replacing the PRE to avoid nesting issues
            const container = document.createElement('div');
            container.className = "relative group my-8 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#282a36]"; // Dracula bg

            // Replace the pre in the DOM
            pre.parentNode.replaceChild(container, pre);

            // Mount the React component
            const root = createRoot(container);
            root.render(
                <CodeBlock
                    code={rawCode}
                    language={language}
                    originalClassName={pre.className}
                />
            );
        });

    }, [content]);

    return (
        <div
            ref={containerRef}
            className="static-content"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

function CodeBlock({ code, language, originalClassName }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative font-mono text-sm">
            {/* Header / Actions */}
            <div className="absolute right-4 top-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={handleCopy}
                    className={`
                        p-2 rounded-lg transition-all duration-200 backdrop-blur-md border shadow-sm
                        ${copied
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : 'bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white border-white/10'
                        }
                    `}
                    title="Copy code"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
            </div>

            {/* Syntax Highlighter */}
            <SyntaxHighlighter
                language={language}
                style={dracula}
                showLineNumbers={true}
                customStyle={{
                    margin: 0,
                    padding: '2rem',
                    borderRadius: '1rem',
                    background: '#282a36', // Ensure matches container
                    fontSize: '14px',
                    lineHeight: '1.6',
                }}
                lineNumberStyle={{
                    minWidth: '2.5em',
                    paddingRight: '1em',
                    color: '#6272a4',
                    textAlign: 'right'
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

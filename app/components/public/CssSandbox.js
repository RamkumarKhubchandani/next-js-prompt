"use client";
import React, { useState } from "react";
import { Code, Eye, Copy, Check, Maximize2, Minimize2 } from "lucide-react";

export default function CssSandbox({ sandbox, title = "Live CSS Sandbox" }) {
    const [activeTab, setActiveTab] = useState("preview");
    const [copied, setCopied] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    if (!sandbox || (!sandbox.html && !sandbox.css)) {
        return null;
    }

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    // Combine HTML and CSS for the iframe
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      padding: 2rem;
    }
    ${sandbox.css || ''}
  </style>
</head>
<body>
  ${sandbox.html || ''}
</body>
</html>
  `.trim();

    return (
        <div className={`mb-12 ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-dark-900 p-4 overflow-auto' : ''}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary">
                        <Code size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-dark-900 dark:text-white">
                            {title}
                        </h3>
                        <p className="text-gray-500 dark:text-light-400 text-sm">
                            Interactive example - See it in action!
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                    {isFullscreen ? (
                        <Minimize2 size={20} className="text-gray-600 dark:text-light-400" />
                    ) : (
                        <Maximize2 size={20} className="text-gray-600 dark:text-light-400" />
                    )}
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-4 border-b border-gray-200 dark:border-dark-700">
                <button
                    onClick={() => setActiveTab("preview")}
                    className={`px-6 py-3 font-bold text-sm transition-all relative ${activeTab === "preview"
                            ? "text-brand-primary"
                            : "text-gray-500 dark:text-light-400 hover:text-gray-700 dark:hover:text-light-200"
                        }`}
                >
                    <Eye size={16} className="inline mr-2" />
                    Preview
                    {activeTab === "preview" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("html")}
                    className={`px-6 py-3 font-bold text-sm transition-all relative ${activeTab === "html"
                            ? "text-brand-primary"
                            : "text-gray-500 dark:text-light-400 hover:text-gray-700 dark:hover:text-light-200"
                        }`}
                >
                    <Code size={16} className="inline mr-2" />
                    HTML
                    {activeTab === "html" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("css")}
                    className={`px-6 py-3 font-bold text-sm transition-all relative ${activeTab === "css"
                            ? "text-brand-primary"
                            : "text-gray-500 dark:text-light-400 hover:text-gray-700 dark:hover:text-light-200"
                        }`}
                >
                    <Code size={16} className="inline mr-2" />
                    CSS
                    {activeTab === "css" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />
                    )}
                </button>
            </div>

            {/* Content Area */}
            <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-2xl overflow-hidden shadow-xl">
                {activeTab === "preview" && (
                    <div className={`bg-gray-50 dark:bg-dark-900 ${isFullscreen ? 'h-[calc(100vh-250px)]' : 'min-h-[400px]'}`}>
                        <iframe
                            srcDoc={fullHtml}
                            className="w-full h-full border-0"
                            title="CSS Sandbox Preview"
                            sandbox="allow-scripts"
                        />
                    </div>
                )}

                {activeTab === "html" && sandbox.html && (
                    <div className="relative">
                        <button
                            onClick={() => handleCopy(sandbox.html)}
                            className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors z-10"
                            aria-label="Copy HTML"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                        <div className={`overflow-auto ${isFullscreen ? 'max-h-[calc(100vh-250px)]' : 'max-h-[500px]'}`}>
                            <pre className="p-8 text-sm bg-[#1e1e1e] text-gray-100 m-0">
                                <code className="language-html">{sandbox.html}</code>
                            </pre>
                        </div>
                    </div>
                )}

                {activeTab === "css" && sandbox.css && (
                    <div className="relative">
                        <button
                            onClick={() => handleCopy(sandbox.css)}
                            className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors z-10"
                            aria-label="Copy CSS"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                        <div className={`overflow-auto ${isFullscreen ? 'max-h-[calc(100vh-250px)]' : 'max-h-[500px]'}`}>
                            <pre className="p-8 text-sm bg-[#1e1e1e] text-gray-100 m-0">
                                <code className="language-css">{sandbox.css}</code>
                            </pre>
                        </div>
                    </div>
                )}
            </div>

            {/* Helper Text */}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
                <p className="text-sm text-blue-900 dark:text-blue-300">
                    <strong>💡 Pro tip:</strong> Switch between tabs to see how the HTML and CSS work together to create the visual result. Try to understand each property!
                </p>
            </div>
        </div>
    );
}

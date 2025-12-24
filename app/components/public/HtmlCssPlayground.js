"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Check, RotateCcw, Play } from "lucide-react";

function buildSrcDoc(html, css) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      /* Playground reset (safe defaults) */
      :root { color-scheme: light dark; }
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji", "Segoe UI Emoji"; }
      /* User CSS below */
${css || ""}
    </style>
  </head>
  <body>
${html || ""}
  </body>
</html>`;
}

export default function HtmlCssPlayground({
  initialHtml = "",
  initialCss = "",
  title = "HTML/CSS Lab",
  subtitle = "Edit HTML + CSS and preview instantly. This runs fully in your browser.",
}) {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("html"); // 'html' | 'css'
  const iframeRef = useRef(null);

  const srcDoc = useMemo(() => buildSrcDoc(html, css), [html, css]);

  useEffect(() => {
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className="bg-dark-800 rounded-2xl border border-dark-700 overflow-hidden shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-700">
        <div className="min-w-0">
          <p className="text-sm font-bold text-white truncate">{title}</p>
          {subtitle && <p className="text-xs text-light-400 truncate">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
              activeTab === "html"
                ? "bg-brand-primary/15 text-brand-primary border-brand-primary/30"
                : "bg-dark-700 text-light-200 border-dark-600 hover:bg-dark-600"
            }`}
            onClick={() => setActiveTab("html")}
          >
            HTML
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
              activeTab === "css"
                ? "bg-brand-primary/15 text-brand-primary border-brand-primary/30"
                : "bg-dark-700 text-light-200 border-dark-600 hover:bg-dark-600"
            }`}
            onClick={() => setActiveTab("css")}
          >
            CSS
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg bg-dark-700 border border-dark-600 hover:bg-dark-600 text-light-200"
            onClick={async () => {
              const payload = activeTab === "html" ? html : css;
              await navigator.clipboard.writeText(payload);
              setCopied(true);
            }}
            title="Copy current tab"
          >
            {copied ? <Check size={14} className="text-green-300" /> : <Copy size={14} />}
            Copy
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg bg-dark-700 border border-dark-600 hover:bg-dark-600 text-light-200"
            onClick={() => {
              setHtml(initialHtml);
              setCss(initialCss);
            }}
            title="Reset to lesson starter code"
          >
            <RotateCcw size={14} />
            Reset
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg bg-green-500 text-dark-900 hover:bg-green-400"
            onClick={() => {
              // Force refresh iframe (useful if browser cached state)
              if (iframeRef.current) iframeRef.current.srcdoc = srcDoc;
            }}
            title="Re-run preview"
          >
            <Play size={14} />
            Run
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-b lg:border-b-0 lg:border-r border-dark-700 bg-dark-900">
          <div className="px-4 py-2 text-xs font-mono text-light-300 border-b border-dark-700 flex items-center gap-2 bg-dark-800">
            <span className="text-green-400">●</span> Editor ({activeTab.toUpperCase()})
          </div>
          <textarea
            value={activeTab === "html" ? html : css}
            onChange={(e) => (activeTab === "html" ? setHtml(e.target.value) : setCss(e.target.value))}
            spellCheck={false}
            className="w-full h-[420px] p-4 bg-[#0b1220] text-light-100 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
            style={{ tabSize: 2 }}
          />
        </div>

        <div className="bg-dark-900">
          <div className="px-4 py-2 text-xs font-mono text-light-300 border-b border-dark-700 flex items-center gap-2 bg-dark-800">
            <span className="text-green-400">●</span> Preview
          </div>
          <iframe
            ref={iframeRef}
            title="HTML/CSS Preview"
            className="w-full h-[420px] bg-white"
            sandbox="allow-scripts allow-forms allow-popups"
            srcDoc={srcDoc}
          />
        </div>
      </div>
    </div>
  );
}



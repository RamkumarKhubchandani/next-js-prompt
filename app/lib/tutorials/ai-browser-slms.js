export const aiBrowserSlms = {
    title: "Small Language Models (SLMs): Running AI in the Browser",
    description: "Cloud GPUs are expensive and slow. Learn how to run Phi-3 and Gemma directly in your user's browser using WebGPU. 100% Private. 0% Cost.",
    slug: "ai-browser-slms",
    category: "AI Engineering",
    type: "static",
    author: "Edge AI Engineer",
    createdAt: new Date().toISOString(),
    readTime: "25 min read",
    difficulty: "Expert",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    tags: ["AI Engineering", "WebGPU", "SLM", "Local-First", "WebLLM"],
    keywords: ["WebGPU AI", "Browser LLM", "Phi-3 in browser", "WebLLM tutorial", "Local AI"],
    toc: [
        { id: "why-local", label: "01. Why Local?" },
        { id: "webgpu-tech", label: "02. The WebGPU Stack" },
        { id: "implementation", label: "03. Implementation" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Why Local -->
        <section id="why-local" class="scroll-mt-32">
             <div class="border-l-8 border-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Zero Latency.<br/>Zero Privacy Risk.
                </h1>
                <p class="text-xl md:text-2xl text-emerald-800 dark:text-emerald-200 font-light leading-relaxed">
                    Sending every keystroke to OpenAI is distinctely 2023. 
                    <br/><br/>
                    With <strong>WebGPU</strong> and highly optimized <strong>SLMs</strong> (Small Language Models like Phi-3 or Llama-3-8B-Quantized), you can build smart autocompletes that run entirely on the client's laptop.
                </p>
             </div>
        </section>

        <!-- 02. WebGPU Stack -->
        <section id="webgpu-tech" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-emerald-600 dark:text-emerald-500">02.</span>
                WebLLM & transformers.js
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Libraries like MLC-LLM (WebLLM) compile models to TVM (Tensor Virtual Machine) which can execute on the GPU via WGSL shaders. It's shockingly fast.
                </p>
                <div class="bg-emerald-900/10 border-l-4 border-emerald-500 p-6 my-6">
                     <h4 class="font-bold text-emerald-800 dark:text-emerald-200 mb-2">Deep Dive: Shader Compilation</h4>
                     <p class="text-gray-700 dark:text-gray-300 text-sm">
                         The very first time a user visits your site, the browser must compile the WGSL shaders for their specific GPU. This takes ~5-10 seconds.
                         <br/>
                         However, browsers cache these compiled shaders. The second visit? Instant startup.
                     </p>
                </div>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// main.ts</div>
                 <div class="text-purple-400">import</div> {'{'} MLCEngine {'}'} <div class="text-purple-400">from</div> <span class="text-green-400">"@mlc-ai/web-llm"</span>;<br/><br/>
                 
                 <div class="text-gray-500">// 1. Load Model (Cached in Browser Storage)</div>
                 <div class="text-purple-400">const</div> engine = <div class="text-purple-400">new</div> MLCEngine(); <br/>
                 <div class="text-purple-400">await</div> engine.reload(<span class="text-green-400">"Phi-3-mini-4k-instruct-q4f32_1"</span>); <br/><br/>
                 
                 <div class="text-gray-500">// 2. Inference (Fast!)</div>
                 <div class="text-purple-400">const</div> reply = <div class="text-purple-400">await</div> engine.chat.completions.create({'{'} <br/>
                 &nbsp;&nbsp;messages: [ ... ] <br/>
                 {'}'});
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-emerald-600 dark:text-emerald-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-emerald-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">The Download Tax</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    The catch? The user has to download the model weights (~2GB) first. 
                    <br/><br/>
                    <strong>Pattern:</strong> Use Cloud AI for the first interaction, while downloading the Local Model in the background. Once ready, switch to Local for pure speed.
                </p>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-6">Hybrid AI</h3>
                <p class="text-gray-700 dark:text-gray-300">
                    The best architecture isn't 100% local. Use <strong>GPT-4 (Cloud)</strong> for complex reasoning or planning, and <strong>Phi-3 (Local)</strong> for drafting e-mails, text completion, or UI generation where latency matters most.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';

// 🏎️ Inference Speed Visualizer

export default function WebGpuDemo() {
    const [mode, setMode] = useState('cloud'); // cloud | local
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [isModelReady, setIsModelReady] = useState(false);
    const [tokens, setTokens] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const downloadModel = () => {
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setDownloadProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setIsModelReady(true);
            }
        }, 100); // Simulate 2s download
    };

    const generate = () => {
        setIsGenerating(true);
        setTokens([]);
        
        let count = 0;
        const max = 20;
        // Local is fast (30ms/tok), Cloud is network bound (100ms/tok)
        const speed = mode === 'local' ? 30 : 150; 
        
        const interval = setInterval(() => {
            setTokens(prev => [...prev, { id: count, text: "word" }]);
            count++;
            if (count >= max) {
                clearInterval(interval);
                setIsGenerating(false);
            }
        }, speed);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-emerald-500">⚡</span> WebGPU Inference
                </h3>
                <div className="flex bg-slate-200 dark:bg-slate-900 p-1 rounded-xl">
                    <button 
                        onClick={() => setMode('cloud')}
                        className={\`px-6 py-2 rounded-lg font-bold text-sm transition-all \${mode === 'cloud' ? 'bg-white dark:bg-slate-800 shadow text-blue-500' : 'text-slate-500'}\`}
                    >
                        Cloud API (GPT-4)
                    </button>
                    <button 
                        onClick={() => setMode('local')}
                        className={\`px-6 py-2 rounded-lg font-bold text-sm transition-all \${mode === 'local' ? 'bg-white dark:bg-slate-800 shadow text-emerald-500' : 'text-slate-500'}\`}
                    >
                        Local SLM (Phi-3)
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Environment Status */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-gray-500 uppercase text-xs mb-4">Runtime Environment</div>
                    
                    {mode === 'cloud' ? (
                        <div className="flex flex-col items-center justify-center h-48 animate-in fade-in">
                            <span className="text-6xl text-blue-500 mb-4">☁️</span>
                            <h3 className="text-xl font-bold text-blue-600">OpenAI Server</h3>
                            <p className="text-sm text-gray-400 mt-2">Latency: ~500ms (Network)</p>
                            <p className="text-sm text-gray-400">Cost: $0.03/1k tokens</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-48 animate-in fade-in">
                            {isModelReady ? (
                                <>
                                    <div className="relative">
                                        <span className="text-6xl text-emerald-500 mb-4">💻</span>
                                        <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">WASM</div>
                                    </div>
                                    <h3 className="text-xl font-bold text-emerald-600">User's GPU</h3>
                                    <p className="text-sm text-gray-400 mt-2 flex items-center gap-2"><span>📡</span> Offline Capable</p>
                                    <p className="text-sm text-gray-400">Cost: $0.00</p>
                                </>
                            ) : (
                                <div className="w-full max-w-xs text-center">
                                    <span className="text-4xl mx-auto text-gray-400 mb-4 animate-bounce block">⬇️</span>
                                    <div className="text-sm font-bold mb-2">Downloading Weights (2GB)...</div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 transition-all duration-100" style={{ width: \`\${downloadProgress}%\` }}></div>
                                    </div>
                                    <button onClick={downloadModel} className="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded font-bold text-xs hover:bg-slate-200">Start Download</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Chat Output */}
                <div className="bg-black rounded-2xl p-6 font-mono relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
                    <div className="flex-1 overflow-hidden">
                        <span className="text-gray-500 mr-2">AI:</span>
                        {tokens.map((t) => (
                            <span key={t.id} className="text-green-400 animate-in fade-in duration-0">
                                {t.text}{' '}
                            </span>
                        ))}
                        {isGenerating && <span className="w-2 h-4 bg-green-500 inline-block animate-pulse ml-1 align-middle"></span>}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-800">
                         <button 
                            onClick={generate}
                            disabled={isGenerating || (mode === 'local' && !isModelReady)}
                            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 disabled:opacity-50 transition flex items-center justify-center gap-2"
                        >
                            <span className={isGenerating ? "text-yellow-500" : ""}>⚡</span>
                            Generate Response
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
`
};

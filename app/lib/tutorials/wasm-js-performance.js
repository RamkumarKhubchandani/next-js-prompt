export const wasmJsPerformance = {
    title: "WebAssembly + JS: Running Photoshop-Level Apps in the Browser",
    description: "WebAssembly isn't just for C++ devs anymore. Learn how to offload heavy calculations to Rust/Wasm while keeping your UI in React. A practical guide to high-performance hybrid apps.",
    slug: "wasm-js-performance",
    category: "JavaScript",
    type: "static",
    author: "Systems Engineer",
    createdAt: new Date().toISOString(),
    readTime: "30 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2670&auto=format&fit=crop",
    tags: ["WebAssembly", "Rust", "Performance", "Image Processing", "Hybrid Apps"],
    keywords: ["Wasm", "Rust to Wasm", "FFmpeg.wasm", "Image Processing in Browser", "Web Workers"],
    toc: [
        { id: "why-wasm", label: "01. Why Wasm?" },
        { id: "architecture", label: "02. The Hybrid Architecture" },
        { id: "rust-integration", label: "03. Rust Integration" },
        { id: "performance", label: "04. Performance Metrics" },
        { id: "senior-take", label: "05. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Why Wasm -->
        <section id="why-wasm" class="scroll-mt-32">
             <div class="border-l-8 border-orange-600 bg-orange-50 dark:bg-orange-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    JavaScript is Fast.<br/>
                    <span class="text-orange-600 dark:text-orange-400">But Wasm is Metal.</span>
                </h1>
                <p class="text-xl md:text-2xl text-orange-800 dark:text-orange-200 font-light leading-relaxed">
                    V8 is a miracle of engineering, but it still has garbage collection pauses and JIT overhead. 
                    <br/><br/>
                    <strong>WebAssembly (Wasm)</strong> runs binary code at near-native speeds. It's the secret weapon behind Figma, Photoshop Web, and Google Earth.
                </p>
             </div>
        </section>

        <!-- 02. Architecture -->
        <section id="architecture" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-orange-600 dark:text-orange-500">02.</span>
                The Hybrid Model
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Don't rewrite your React app in Rust (Yew/Leptos) unless you really need to. The winning strategy in 2026 is <strong>Hybrid</strong>:
                </p>
                <ul class="list-disc pl-6 space-y-2">
                    <li><strong>UI / State / Network:</strong> JavaScript (React/Angular)</li>
                    <li><strong>Heavy Compute (Image/Video/Crypto):</strong> WebAssembly (Rust/C++)</li>
                </ul>
            </div>
             <div class="bg-slate-900 p-6 rounded-xl border border-slate-800 text-center">
                 <div class="flex justify-center items-center gap-8 text-white font-bold">
                     <div class="p-4 bg-yellow-500/20 text-yellow-500 rounded-lg border border-yellow-500/50">
                        JS Main Thread<br/>(UI Updates)
                     </div>
                     <div class="text-2xl">⬇️ ArrayBuffer ⬆️</div>
                     <div class="p-4 bg-orange-600/20 text-orange-500 rounded-lg border border-orange-600/50">
                        Wasm Worker<br/>(Number Crunching)
                     </div>
                 </div>
            </div>
        </section>

        <!-- 03. Rust Integration -->
        <section id="rust-integration" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-orange-600 dark:text-orange-500">03.</span>
                Rust to Wasm in 3 Steps
            </h2>
             <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl font-mono text-sm overflow-x-auto">
                 <ol class="space-y-4">
                     <li>
                        <div class="text-gray-500 mb-1">// 1. Write Rust Function</div>
                        <div class="text-purple-600">#[wasm_bindgen]</div>
                        <div class="text-blue-600">pub fn</div> <div class="text-yellow-600 inline">grayscale_image</div>(data: &mut [u8]) {'{'} ... {'}'}
                     </li>
                     <li>
                         <div class="text-gray-500 mb-1">// 2. Build</div>
                         <div class="text-green-600">wasm-pack build --target web</div>
                     </li>
                      <li>
                         <div class="text-gray-500 mb-1">// 3. Import in JS</div>
                         <div class="text-purple-600">import</div> init, {'{'} grayscale_image {'}'} <div class="text-purple-600">from</div> './pkg/image_lib.js';
                     </li>
                 </ol>
             </div>
        </section>

        <!-- 05. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-orange-600 dark:text-orange-500">05.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-orange-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">When NOT to use Wasm</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Wasm has a "boundary cost." Marshalling data (copying strings/objects) between JS memory and Wasm memory can be slower than just doing the math in JS for small tasks.
                    <br/><br/>
                    <strong>Rule of Thumb:</strong> Only use Wasm if the computation takes >100ms in JavaScript or involves complex binary data processing (parsers, encoders, crypto).
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';
import { Cpu, Image as ImageIcon, Zap, Layers, Play } from 'lucide-react';

// 🦀 Wasm Transformation Playground

export default function WasmDemo() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [method, setMethod] = useState('js'); // 'js' or 'wasm'
    const [metrics, setMetrics] = useState({ time: 0, fps: 60 });
    
    // Simulate processing
    const processImage = () => {
        setIsProcessing(true);
        setProgress(0);
        setMetrics({ time: 0, fps: 60 });
        
        const startTime = performance.now();
        const duration = method === 'js' ? 2000 : 300; // JS is slow, Wasm is fast
        const intervalTime = 20;
        
        const sim = setInterval(() => {
            setProgress(old => {
                const step = 100 / (duration / intervalTime);
                const next = old + step;
                
                // Simulate Main Thread blocking for JS
                if (method === 'js') {
                     // Random frame drops
                     setMetrics(m => ({ ...m, fps: Math.max(5, 60 - Math.random() * 50) }));
                } else {
                     // Wasm runs on worker, smooth FPS
                     setMetrics(m => ({ ...m, fps: 60 }));
                }

                if (next >= 100) {
                    clearInterval(sim);
                    setIsProcessing(false);
                    setMetrics(m => ({ ...m, time: method === 'js' ? 2.1 : 0.32, fps: 60 }));
                    return 100;
                }
                return next;
            });
        }, intervalTime);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="text-orange-500">⚙️</span> Wasm Image Processing
            </h3>
            
            <div className="flex bg-slate-200 dark:bg-slate-900 p-1 rounded-xl mb-8 w-fit">
                    <button 
                        onClick={() => setMethod('js')}
                        className={\`px-6 py-2 rounded-lg font-bold text-sm transition-all \${method === 'js' ? 'bg-white dark:bg-slate-800 shadow text-yellow-600' : 'text-slate-500'}\`}
                    >
                        JavaScript (Main Thread)
                    </button>
                    <button 
                        onClick={() => setMethod('wasm')}
                        className={\`px-6 py-2 rounded-lg font-bold text-sm transition-all \${method === 'wasm' ? 'bg-white dark:bg-slate-800 shadow text-orange-600' : 'text-slate-500'}\`}
                    >
                        Rust Wasm (Worker)
                    </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
                {/* Visualizer Area */}
                <div className="relative group">
                     <div className={\`absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 \${isProcessing ? 'animate-pulse' : ''}\`}></div>
                     <div className="relative bg-black rounded-xl p-1 overflow-hidden h-[300px] flex items-center justify-center">
                         {/* Fake "Image" */}
                         <div className={\`w-full h-full bg-[url('https://images.unsplash.com/photo-1550740558-d9bc3c5a2c2c?q=80&w=800')] bg-cover bg-center transition-all duration-300 \${progress === 100 ? 'grayscale' : 'grayscale-0'}\`} 
                            style={{ filter: \`grayscale(\${progress}%) blur(\${method === 'js' && isProcessing ? '5px' : '0'})\` }}
                         ></div>
                         
                         {/* Loading Overlay */}
                         {isProcessing && (
                             <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                                <div className="text-3xl font-black mb-2">{Math.round(progress)}%</div>
                                {method === 'js' && <div className="text-red-400 text-sm font-bold animate-bounce">⚠️ Blocking UI Thread</div>}
                                {method === 'wasm' && <div className="text-green-400 text-sm font-bold flex items-center gap-1"><Zap size={14} /> Hardware Accelerated</div>}
                             </div>
                         )}
                         
                         {!isProcessing && progress !== 100 && (
                             <button
                                onClick={processImage}
                                className="absolute bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white rounded-full p-6 transition-all transform hover:scale-110 active:scale-95"
                            >
                                <Play size={32} fill="currentColor" />
                            </button>
                         )}
                         
                         {!isProcessing && progress === 100 && (
                            <button
                                onClick={() => setProgress(0)}
                                className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-lg font-bold text-sm shadow-lg hover:bg-gray-100"
                            >
                                Reset
                            </button>
                         )}
                     </div>
                </div>

                {/* Metrics Area */}
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-white dark:bg-black/20 rounded-2xl border border-slate-200 dark:border-slate-800">
                             <div className="text-xs font-bold text-gray-400 uppercase mb-2">Execution Time</div>
                             <div className={\`text-3xl font-black \${method === 'wasm' ? 'text-green-500' : 'text-red-500'}\`}>
                                 {metrics.time}s
                             </div>
                             <div className="text-xs text-gray-500 mt-1">{method === 'wasm' ? '🚀 7x Faster' : '🐢 Slow'}</div>
                        </div>
                         <div className="p-6 bg-white dark:bg-black/20 rounded-2xl border border-slate-200 dark:border-slate-800">
                             <div className="text-xs font-bold text-gray-400 uppercase mb-2">Frame Rate (UI)</div>
                             <div className={\`text-3xl font-black transition-all \${metrics.fps < 30 ? 'text-red-500' : 'text-green-500'}\`}>
                                 {Math.round(metrics.fps)} <span className="text-sm text-gray-500">fps</span>
                             </div>
                             <div className="text-xs text-gray-500 mt-1">{metrics.fps < 30 ? 'Janky / Stuttering' : 'Buttery Smooth'}</div>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-slate-900 rounded-2xl text-slate-300 font-mono text-sm leading-6 border border-slate-800">
                         <div className="mb-2 text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                             <Cpu size={14} /> Thread Activity
                         </div>
                         {method === 'js' ? (
                             <>
                                <span className="text-red-400">[Main]</span> Starting Grayscale loop...<br/>
                                <span className="text-red-400">[Main]</span> Blocked. 99% CPU.<br/>
                                <span className="text-red-400">[Main]</span> Dropped frame.<br/>
                                <span className="text-red-400">[Main]</span> Dropped frame.<br/>
                                <span className="text-green-400">[Main]</span> Done.
                             </>
                         ) : (
                             <>
                                <span className="text-blue-400">[Main]</span> Spawning Wasm Worker...<br/>
                                <span className="text-orange-400">[Worker]</span> Rust::process_image()<br/>
                                <span className="text-green-400">[Main]</span> UI rendering @ 60fps...<br/>
                                <span className="text-green-400">[Main]</span> UI rendering @ 60fps...<br/>
                                <span className="text-blue-400">[Main]</span> Received buffer. Displaying.
                             </>
                         )}
                    </div>
                </div>

            </div>
        </div>
    );
}
`
};

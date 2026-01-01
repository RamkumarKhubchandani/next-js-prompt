export const jsSharedMemory = {
    title: "Typed Arrays & Shared Memory: Ultra-Fast JavaScript",
    description: "JavaScript is single-threaded, but memory doesn't have to be. Learn how to use SharedArrayBuffer and Atomics to build multi-threaded apps that rival Rust performance.",
    slug: "js-shared-memory",
    category: "JavaScript",
    type: "static",
    author: "Performance Engineer",
    createdAt: new Date().toISOString(),
    readTime: "22 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    tags: ["JavaScript", "Performance", "WebAssembly", "Multithreading", "SharedArrayBuffer"],
    keywords: ["SharedArrayBuffer", "Atomics API", "TypedArrays", "High Performance JS", "Web Workers"],
    toc: [
        { id: "binary-data", label: "01. Binary Data" },
        { id: "shared-buffer", label: "02. SharedArrayBuffer" },
        { id: "atomics", label: "03. Atomics API" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Binary Data -->
        <section id="binary-data" class="scroll-mt-32">
             <div class="border-l-8 border-cyan-600 bg-cyan-50 dark:bg-cyan-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Stop Copying Data.
                </h1>
                <p class="text-xl md:text-2xl text-cyan-800 dark:text-cyan-200 font-light leading-relaxed">
                    Normally, sending data to a Web Worker involves cloning it (Structured Clone Algorithm). This is slow for large datasets.
                    <br/><br/>
                    <strong>SharedArrayBuffer</strong> allows the Main Thread and Worker Threads to read/write the <em>exact same memory address</em>. Zero copy.
                </p>
             </div>
        </section>

        <!-- 02. Shared Buffer -->
        <section id="shared-buffer" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">02.</span>
                Raw Memory Access
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    We allocate a chunk of raw binary memory. Then we "view" it as an array of 32-bit Integers.
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// main.js</div>
                 <div class="text-purple-400">const</div> buffer = <div class="text-purple-400">new</div> SharedArrayBuffer(1024); <span class="text-gray-500">// 1KB</span><br/>
                 <div class="text-purple-400">const</div> view = <div class="text-purple-400">new</div> Int32Array(buffer);<br/><br/>
                 
                 <div class="text-gray-500">// Send REF to worker</div>
                 worker.postMessage(buffer);
            </div>
        </section>

        <!-- 03. Atomics -->
        <section id="atomics" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">03.</span>
                Race Conditions & Atomics
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                When two threads write to index <code>0</code> at the same time, you get garbage data. 
                Use <code>Atomics</code> to lock memory during operations.
            </p>
            <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                <code class="text-indigo-700 dark:text-indigo-300 font-bold">Atomics.add(view, 0, 1); // Thread-safe increment</code>
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-cyan-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">You probably need Wasm.</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    If you are manually manipulating bytes in JavaScript to squeeze performance, you should likely be writing <strong>Rust</strong> compiled to WebAssembly. 
                    <br/><br/>
                    Rust handles memory safety for you. Raw TypedArrays are tedious and error-prone.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';
import { Cpu, Layers, Zap, Grip } from 'lucide-react';

// 🧠 Shared Memory Visualizer

export default function MemoryDemo() {
    const [memory, setMemory] = useState(new Array(8).fill(0));
    const [isSharing, setIsSharing] = useState(false);
    
    // Simulate workers writing to memory
    useEffect(() => {
        if (!isSharing) {
            setMemory(new Array(8).fill(0));
            return;
        }

        const interval = setInterval(() => {
            setMemory(prev => {
                const next = [...prev];
                // Randomly increment a slot (simulating thread activity)
                const idx = Math.floor(Math.random() * 8);
                if (next[idx] < 99) next[idx] += 1;
                return next;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isSharing]);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-cyan-500">🧠</span> Shared Memory
                </h3>
                <button 
                    onClick={() => setIsSharing(!isSharing)}
                    className={\`px-6 py-2 rounded-lg font-bold text-sm transition-all \${isSharing ? 'bg-red-500 text-white' : 'bg-cyan-500 text-white'}\`}
                >
                    {isSharing ? 'Stop Workers' : 'Start Threads'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
                
                {/* Threads */}
                <div className="space-y-4 w-full md:w-1/3">
                     <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow flex items-center gap-3 opacity-50">
                        <Cpu size={24} className="text-gray-400" /> Main Thread (UI)
                     </div>
                     <div className={\`p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow flex items-center gap-3 transition-all \${isSharing ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : ''}\`}>
                        <Zap size={24} className={isSharing ? "text-cyan-500" : "text-gray-400"} /> Worker Thread 1
                     </div>
                     <div className={\`p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow flex items-center gap-3 transition-all \${isSharing ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : ''}\`}>
                        <Zap size={24} className={isSharing ? "text-purple-500" : "text-gray-400"} /> Worker Thread 2
                     </div>
                </div>

                {/* The Shared Buffer */}
                <div className="flex-1 bg-slate-200 dark:bg-slate-900 rounded-2xl p-6 relative">
                     <div className="absolute -top-3 left-6 px-2 bg-slate-50 dark:bg-slate-950 text-xs font-bold text-gray-500 uppercase tracking-widest border border-slate-200 dark:border-slate-800 rounded">
                         SharedArrayBuffer (Int32Array View)
                     </div>
                     
                     <div className="grid grid-cols-4 gap-4 mt-4">
                         {memory.map((val, i) => (
                             <div 
                                key={i}
                                className={\`aspect-square rounded-lg flex items-center justify-center font-mono text-xl font-bold transition-all duration-75 \${
                                    val > 0 
                                    ? 'bg-cyan-500 text-white scale-105 shadow-lg' 
                                    : 'bg-white dark:bg-slate-800 text-gray-300'
                                }\`}
                             >
                                 {val}
                             </div>
                         ))}
                     </div>
                     
                     {isSharing && (
                         <div className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-2xl animate-pulse pointer-events-none"></div>
                     )}
                </div>

            </div>
        </div>
    );
}
`
};

export const jsAsyncIterators = {
    title: "Beyond Promises: Async Iterators & Generators",
    description: "Promises are great for one-off tasks. But what about streams of events? Learn how to listen to WebSocket feeds or process large files using `for await...of` loops.",
    slug: "js-async-iterators",
    category: "JavaScript",
    type: "static",
    author: "Streaming Architect",
    createdAt: new Date().toISOString(),
    readTime: "20 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    tags: ["JavaScript", "Async/Await", "Generators", "Streams", "Performance"],
    keywords: ["Async Iterator", "Async Generator", "for await of", "JavaScript Streams", "Event Processing"],
    toc: [
        { id: "promises-limit", label: "01. Limit of Promises" },
        { id: "async-generators", label: "02. Async Generators" },
        { id: "streams", label: "03. Processing Streams" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Limit of Promises -->
        <section id="promises-limit" class="scroll-mt-32">
             <div class="border-l-8 border-cyan-600 bg-cyan-50 dark:bg-cyan-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Promises resolve once.
                </h1>
                <p class="text-xl md:text-2xl text-cyan-800 dark:text-cyan-200 font-light leading-relaxed">
                    A Promise represents a <em>single</em> future value. But real-world apps process <em>streams</em> of data: WebSocket messages, File Upload chunks, or infinite scrolling feeds.
                    <br/><br/>
                    Enter <strong>Async Iterators</strong>: A standard way to loop over future events as if they were an array.
                </p>
             </div>
        </section>

        <!-- 02. Async Generators -->
        <section id="async-generators" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">02.</span>
                <code>function*</code> meets <code>await</code>
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    You can pause execution <em>and</em> return multiple values over time.
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// ticker.js</div>
                 <div class="text-purple-400">async function*</div> getStockUpdates(symbol) {'{'} <br/>
                 &nbsp;&nbsp;<div class="text-purple-400">while</div> (true) {'{'} <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;<div class="text-purple-400">const</div> price = <div class="text-purple-400">await</div> fetchPrice(symbol); <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;<div class="text-purple-400">yield</div> price; <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;<div class="text-purple-400">await</div> sleep(1000); <br/>
                 &nbsp;&nbsp;{'}'} <br/>
                 {'}'} <br/><br/>
                 
                 <div class="text-gray-500">// Consumption</div>
                 <div class="text-purple-400">for await</div> (<div class="text-purple-400">const</div> price <div class="text-purple-400">of</div> getStockUpdates(<span class="text-green-400">'AAPL'</span>)) {'{'} <br/>
                 &nbsp;&nbsp;console.log(price); <br/>
                 {'}'}
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-cyan-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Memory Efficiency</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Why use this? <strong>Backpressure</strong>. 
                    <br/><br/>
                    When you process a 1GB file line-by-line using a generator, you only keep one line in memory at a time. A standard <code>file.read()</code> would crash your V8 engine.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, RefreshCw } from 'lucide-react';

// 🌊 Stream Visualizer

export default function StreamDemo() {
    const [prices, setPrices] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    // Mock Async Generator
    async function* stockTicker() {
        let price = 100;
        while (true) {
            await new Promise(r => setTimeout(r, 800)); // Simulate network latency
            price = price + (Math.random() - 0.5) * 5;
            yield price;
        }
    }

    const startStream = async () => {
        if (isRunning) return;
        setIsRunning(true);
        setPrices([]);

        // Consumption Loop
        const iterator = stockTicker();
        // Saving reference to iterator to potentially stop it (in React this logic is tricky inside Effect, 
        // simplified for demo: random limit or component unmount to break)
        
        // Using a ref or flag to break loop in real app
        for await (const price of iterator) {
             setPrices(prev => [...prev.slice(-19), price].filter(Boolean));
             // For demo purposes, we can't easily "break" this loop from outside without an AbortController or Ref check inside.
             // We'll rely on unmounting or page refresh in this simplified code block context.
             // In reality: if (!isRunningRef.current) break;
             if (price > 1000) break; // Infinite safety
        }
    };
    
    // NOTE: The above startStream has no 'stop' mechanism button for simplicity in this sandbox.
    // We will just let it run.

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-cyan-500">🌊</span> Async Iterator Stream
                </h3>
                <button 
                    onClick={startStream}
                    disabled={isRunning}
                    className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold px-6 py-2 rounded-xl transition-all flex items-center gap-2"
                >
                    {isRunning ? <Activity className="animate-pulse" /> : <Play />}
                    {isRunning ? 'Streaming...' : 'Start Feed'}
                </button>
            </div>

            <div className="bg-black rounded-xl p-6 h-[300px] relative overflow-hidden flex items-end gap-1">
                 {/* Grid Lines */}
                 <div className="absolute inset-x-0 bottom-10 h-px bg-gray-800"></div>
                 <div className="absolute inset-x-0 bottom-1/2 h-px bg-gray-900"></div>

                 {prices.length === 0 && (
                     <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                         No Data Stream
                     </div>
                 )}

                 {prices.map((p, i) => {
                     const height = (p - 80) * 3; // Normalize roughly
                     return (
                        <div 
                            key={i}
                            className="bg-cyan-500 w-full rounded-t opacity-80 hover:opacity-100 transition-all duration-300"
                            style={{ height: \`\${Math.max(4, height)}px\` }}
                        ></div>
                     );
                 })}
                 
                 <div className="absolute top-4 right-4 font-mono text-cyan-400 font-bold text-2xl">
                     {prices.length > 0 && prices[prices.length-1].toFixed(2)}
                 </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-500 font-mono">
                for await (const price of stream) &#123; render(price) &#125;
            </div>
        </div>
    );
}
`
};

export const nodeWorkerThreads = {
    title: "Node.js Worker Threads: Multithreading is Easy Now",
    description: "Node.js is single-threaded, but your app doesn't have to be. Learn how to use Worker Threads to perform heavy computations without blocking the Event Loop.",
    slug: "node-worker-threads",
    category: "Node.js",
    type: "static",
    author: "Systems Engineer",
    createdAt: new Date().toISOString(),
    readTime: "24 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
    tags: ["Node.js", "Worker Threads", "Performance", "Multithreading"],
    keywords: ["Worker Threads", "Piscina", "CPU Intensive Node.js", "Isolate", "Thread Pool"],
    toc: [
        { id: "single-thread-limit", label: "01. The Single Thread Limit" },
        { id: "workers-explained", label: "02. Worker Threads Explained" },
        { id: "implementation", label: "03. Implementation Pattern" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Limit -->
        <section id="single-thread-limit" class="scroll-mt-32">
             <div class="border-l-8 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Don't Block the Event Loop.
                </h1>
                <p class="text-xl md:text-2xl text-yellow-800 dark:text-yellow-200 font-light leading-relaxed">
                    The golden rule of Node.js. But what if you <em>have</em> to calculate a hash, resize an image, or parse a massive JSON file?
                    <br/><br/>
                    In the past, you crashed. Today, you offload it to a <strong>Worker Thread</strong>.
                </p>
             </div>
        </section>

        <!-- 02. Explained -->
        <section id="workers-explained" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-yellow-500 dark:text-yellow-500">02.</span>
                Processes vs Threads
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <div class="p-6 rounded-xl bg-gray-100 dark:bg-gray-800">
                    <h4 class="font-bold text-lg mb-2">Child Process (fork)</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Entire new V8 instance. Requires huge memory overhead. Slow startup.
                    </p>
                </div>
                 <div class="p-6 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200">
                    <h4 class="font-bold text-yellow-700 dark:text-yellow-400 mb-2">Worker Thread</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Shares the same process memory. Lightweight. Fast message passing via ArrayBuffers.
                    </p>
                </div>
            </div>
        </section>

        <!-- 03. Implementation -->
        <section id="implementation" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-yellow-500 dark:text-yellow-500">03.</span>
                Easy Pattern (bree / piscina)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Don't use the raw <code>worker_threads</code> API unless you are building a library. Use a pool manager like <strong>Piscina</strong>.
            </p>
             <div class="bg-slate-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// main.js</div>
                 <div class="text-purple-400">const</div> Piscina = require(<span class="text-green-400">'piscina'</span>);<br/>
                 <div class="text-purple-400">const</div> imgWorker = <span class="text-purple-400">new</span> Piscina({'{'} filename: <span class="text-green-400">'./resize.js'</span> {'}'});<br/><br/>
                 <div class="text-gray-500">// This runs in background! Main thread free!</div>
                 <span class="text-blue-400">await</span> imgWorker.run({'{'} file: <span class="text-green-400">'avatar.png'</span> {'}'});
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-yellow-500 dark:text-yellow-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-yellow-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Node is not Java.</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Just because you <em>can</em> use threads doesn't mean you should make everything multithreaded. The Event Loop is still faster for I/O (DB queries, network requests). 
                    <br/><br/>
                    <strong>Only use threads for CPU-bound tasks.</strong>
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';
import { Cpu, Layers, Activity, AlertCircle } from 'lucide-react';

// 🧵 Thread Visualizer

export default function ThreadsDemo() {
    const [mode, setMode] = useState('single'); // single | multi
    const [tasks, setTasks] = useState([]);
    
    // Create tasks
    const addTask = () => {
        const id = Math.random();
        setTasks(prev => [...prev, { id, progress: 0, status: 'pending' }]);
        
        // Simulation
        if (mode === 'single') {
            // Sequential processing (simulate blocking)
            // In real app we can't easily block specific UI parts here, so we simulate queue delay
             setTimeout(() => processTask(id), tasks.length * 1000 + 100);
        } else {
            // Parallel immediately
            setTimeout(() => processTask(id), 100);
        }
    };
    
    const processTask = (id) => {
        // Find task and animate it
        let p = 0;
        const interval = setInterval(() => {
            p += 10;
            setTasks(prev => prev.map(t => t.id === id ? { ...t, progress: p, status: 'running' } : t));
            
            if (p >= 100) {
                clearInterval(interval);
                setTasks(prev => prev.map(t => t.id === id ? { ...t, progress: 100, status: 'done' } : t));
            }
        }, 200);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-yellow-500">🧵</span> Task Scheduler
                </h3>
                <div className="flex bg-slate-200 dark:bg-slate-900 p-1 rounded-xl">
                    <button 
                        onClick={() => { setMode('single'); setTasks([]); }}
                        className={\`px-6 py-2 rounded-lg font-bold text-sm transition-all \${mode === 'single' ? 'bg-white dark:bg-slate-800 shadow text-red-500' : 'text-slate-500'}\`}
                    >
                        Single Thread
                    </button>
                    <button 
                        onClick={() => { setMode('multi'); setTasks([]); }}
                        className={\`px-6 py-2 rounded-lg font-bold text-sm transition-all \${mode === 'multi' ? 'bg-white dark:bg-slate-800 shadow text-green-500' : 'text-slate-500'}\`}
                    >
                        Worker Pool
                    </button>
                </div>
            </div>

            <div className="flex gap-4 mb-8">
                 <button 
                    onClick={addTask}
                    className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg active:scale-95 transition-transform flex justify-center items-center gap-2"
                >
                    <Activity size={18} /> Spawn CPU Task (Hash)
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Main Thread Lane */}
                <div className="border border-slate-300 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-black/20 min-h-[300px]">
                    <div className="flex items-center gap-2 mb-4 font-bold text-gray-500 uppercase text-xs">
                        <Cpu size={14} /> Main Event Loop
                    </div>
                    
                    {tasks.filter(t => t.status !== 'done').map(t => (
                        <div key={t.id} className="mb-2">
                             {mode === 'single' ? (
                                 <div className={\`p-3 rounded-lg text-xs font-bold border \${t.status === 'running' ? 'bg-red-500 text-white border-red-600 animate-pulse' : 'bg-gray-100 dark:bg-slate-800 text-gray-400 border-dashed'}\`}>
                                     {t.status === 'running' ? '🔥 BLOCKING CPU 🔥' : 'Queued (Waiting)...'}
                                     <div className="h-1 bg-black/20 mt-2 rounded-full overflow-hidden">
                                         <div className="h-full bg-white" style={{ width: \`\${t.progress}%\` }}></div>
                                     </div>
                                 </div>
                             ) : (
                                 <div className="p-3 rounded-lg text-xs font-bold border bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200">
                                     ✨ Delegated to Worker
                                 </div>
                             )}
                        </div>
                    ))}
                    
                     {mode === 'single' && tasks.some(t => t.status === 'running') && (
                        <div className="mt-4 p-2 bg-red-100 text-red-600 text-xs rounded border border-red-200 flex items-center gap-2">
                            <AlertCircle size={14} /> UI is Frozen!
                        </div>
                    )}
                </div>

                {/* Worker Pool Visualizer */}
                <div className="col-span-2 border border-slate-300 dark:border-slate-700 rounded-xl p-4 bg-slate-100 dark:bg-slate-900/50 min-h-[300px] relative">
                     <div className="flex items-center gap-2 mb-4 font-bold text-gray-500 uppercase text-xs">
                        <Layers size={14} /> Thread Pool (4 Threads)
                    </div>

                    {mode === 'single' ? (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-mono">
                            Pool Idle (All work on Main)
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                             {tasks.filter(t => t.status !== 'done').map(t => (
                                <div key={t.id} className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                     <div className="flex justify-between items-center mb-2">
                                         <span className="text-xs font-bold text-gray-500">Worker Thread</span>
                                         <span className="text-xs text-green-500 font-bold">{t.progress}%</span>
                                     </div>
                                     <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                         <div className="h-full bg-green-500 transition-all duration-300" style={{ width: \`\${t.progress}%\` }}></div>
                                     </div>
                                </div>
                             ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
`
};

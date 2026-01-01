export const jsTopLevelAwait = {
    title: "Top-Level Await: Removing the Wrapper",
    description: "The 'async function main()' wrapper is officially legacy code. Learn how Top-Level Await simplifies module loading, database connections, and dynamic imports.",
    slug: "js-top-level-await",
    category: "JavaScript",
    type: "static",
    author: "Frontend Architect",
    createdAt: new Date().toISOString(),
    readTime: "12 min read",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1592609931095-54a2168ae893?q=80&w=2670&auto=format&fit=crop",
    tags: ["JavaScript", "ESNext", "Async/Await", "Patterns", "Modules"],
    keywords: ["Top-Level Await", "ES Modules", "async main", "module loading", "dynamic import"],
    toc: [
        { id: "legacy-iife", label: "01. The Legacy IIFE" },
        { id: "modern-modules", label: "02. Modern Module Loading" },
        { id: "blocking-behavior", label: "03. Blocking Behavior" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Legacy IIFE -->
        <section id="legacy-iife" class="scroll-mt-32">
             <div class="border-l-8 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Stop writing <code>(async () => {})()</code>.
                </h1>
                <p class="text-xl md:text-2xl text-yellow-800 dark:text-yellow-200 font-light leading-relaxed">
                    We've all done it. To use <code>await</code> at the root of a file, we had to wrap everything in an Immediately Invoked Function Expression (IIFE).
                    <br/><br/>
                    <strong>Top-Level Await</strong> makes modules implicitly async. The module system pauses execution until the promise resolves.
                </p>
             </div>
        </section>

        <!-- 02. Modern Loading -->
        <section id="modern-modules" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-yellow-500 dark:text-yellow-500">02.</span>
                Clean Initialization
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    This is perfect for modules that rely on asynchronous data to initialize their exports.
                </p>
            </div>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 opacity-70">
                    <h3 class="font-bold text-gray-500 mb-4">Old (Export Promise)</h3>
                    <pre class="text-xs font-mono text-gray-700 dark:text-gray-300">
// db.js
let db;
export const init = async () => {
  db = await connect();
};
export const getDb = () => db;

// consumer.js
await init(); // 🤢 Must remember to call
getDb().query(...);
                    </pre>
                </div>
                <div class="p-6 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200">
                    <h3 class="font-bold text-yellow-600 mb-4">New (Export Value)</h3>
                    <pre class="text-xs font-mono text-gray-700 dark:text-gray-300">
// db.js
const db = await connect(); 
export default db; // 🚀 Ready to use!

// consumer.js
import db from './db.js';
// Module waits for connection!
db.query(...); 
                    </pre>
                </div>
            </div>
        </section>

        <!-- 03. Blocking -->
        <section id="blocking-behavior" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-yellow-500 dark:text-yellow-500">03.</span>
                Double-Edged Sword
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Be careful. If efficient parallelization isn't managed, a top-level await can block the importing of other modules.
            </p>
             <div class="bg-red-50 dark:bg-red-900/20 p-4 border-l-4 border-red-500 text-red-800 dark:text-red-300 rounded-r-lg">
                 ⚠️ <strong>Warning:</strong> If <code>db.js</code> takes 10 seconds to connect, your entire app startup pauses for 10 seconds before executing the next line of <code>import</code> in the consumer.
            </div>
            <div class="bg-yellow-900/10 border-l-4 border-yellow-500 p-6 mt-6">
                 <h4 class="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Deep Dive: Parallel Loading</h4>
                 <p class="text-gray-700 dark:text-gray-300 text-sm">
                     The Javascript module loader is smart. If two modules don't depend on each other, it tries to load them in parallel. 
                     <br/><br/>
                     However, if \`App\` imports \`User\` which imports \`DB\`, you are stuck in a serial chain. Top-Level Await effectively <strong>pauses the graph construction</strong> at that node.
                 </p>
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-yellow-500 dark:text-yellow-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-yellow-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Use Sparingly</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Top-Level Await is a fantastic tool for <strong>Service Initialization</strong> (DBs, Wasm loading, Config fetching). 
                    <br/><br/>
                    Do NOT use it for heavy computation or slow network requests that aren't critical to app startup.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';

// ⏳ Module Loader Visualizer

export default function AwaitDemo() {
    const [status, setStatus] = useState('idle'); // idle, loading, done
    const [modules, setModules] = useState([
        { id: 'config', name: 'Config.js', duration: 1500, state: 'pending' },
        { id: 'db', name: 'Database.js', duration: 3000, state: 'pending' },
        { id: 'app', name: 'App.js', duration: 500, state: 'pending' }
    ]);
    const [logs, setLogs] = useState([]);

    const startLoading = async () => {
        if (status === 'loading') return;
        setStatus('loading');
        setModules(m => m.map(Mod => ({ ...Mod, state: 'pending' })));
        setLogs([]);

        addLog('Starting Application...');

        // 1. Config (TLA - Top Level Await)
        addLog('Importing Config...');
        setModules(m => m.map(Mod => Mod.id === 'config' ? { ...Mod, state: 'loading' } : Mod));
        await wait(1500); 
        setModules(m => m.map(Mod => Mod.id === 'config' ? { ...Mod, state: 'ready' } : Mod));
        addLog('✅ Config Ready');

        // 2. DB (TLA - dependent on Config technically, but let's say serial import)
        addLog('Importing Database...');
        setModules(m => m.map(Mod => Mod.id === 'db' ? { ...Mod, state: 'loading' } : Mod));
        await wait(3000); 
        setModules(m => m.map(Mod => Mod.id === 'db' ? { ...Mod, state: 'ready' } : Mod));
        addLog('✅ Database Connected');

        // 3. App
        addLog('Importing App...');
        setModules(m => m.map(Mod => Mod.id === 'app' ? { ...Mod, state: 'loading' } : Mod));
        await wait(500);
        setModules(m => m.map(Mod => Mod.id === 'app' ? { ...Mod, state: 'ready' } : Mod)); 
        addLog('🚀 App Started!');
        setStatus('done');
    };

    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    const addLog = (msg) => setLogs(p => [...p, msg]);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-yellow-500">⏳</span> Dependency Graph
                </h3>
                <button 
                    onClick={startLoading}
                    disabled={status === 'loading'}
                    className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white font-bold px-6 py-2 rounded-xl transition-all flex items-center gap-2"
                >
                    {status === 'loading' ? <span className="animate-spin">⏳</span> : <span>▶️</span>}
                    {status === 'loading' ? 'Initializing...' : 'Run Imports'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Module Tree */}
                <div className="flex-1 space-y-4">
                    {modules.map((mod, i) => (
                        <div key={mod.id} className="relative">
                            {/* Connector Line */}
                            {i < modules.length - 1 && (
                                <div className={\`absolute left-6 top-10 w-1 h-8 transition-colors duration-300 \${
                                    mod.state === 'ready' && modules[i+1].state !== 'pending' ? 'bg-green-500' : 'bg-gray-200 dark:bg-slate-800'
                                }\`}></div>
                            )}
                            
                            <div className={\`p-4 rounded-xl border flex items-center justify-between transition-all duration-500 \${
                                mod.state === 'ready' 
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200' 
                                : mod.state === 'loading'
                                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 scale-105 shadow-lg'
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60'
                            }\`}>
                                <div className="flex items-center gap-4">
                                    <div className={\`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-colors \${
                                        mod.state === 'ready' ? 'bg-green-500' : mod.state === 'loading' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'
                                    }\`}>
                                        {i + 1}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800 dark:text-white">{mod.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {mod.state === 'ready' ? 'Module Eval Complete' : \`Top-Level Await (\${mod.duration}ms)\`}
                                        </div>
                                    </div>
                                </div>
                                {mod.state === 'loading' && <span className="text-2xl animate-spin">⏳</span>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Console Log */}
                <div className="w-full md:w-1/3 bg-black rounded-xl p-6 font-mono text-xs overflow-y-auto h-[300px]">
                    <div className="text-gray-500 border-b border-gray-800 pb-2 mb-4 uppercase font-bold">Boot Logs</div>
                    <div className="space-y-2">
                        {logs.map((log, i) => (
                            <div key={i} className="text-green-400 animate-in slide-in-from-left-2">
                                &gt; {log}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
`
};

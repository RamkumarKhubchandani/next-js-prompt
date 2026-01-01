export const jsExplicitResourceManagement = {
    title: "Explicit Resource Management: The 'using' Keyword",
    description: "Memory leaks are so 2024. Learn how the new 'using' keyword automates cleanup for Database connections, File handles, and WebSockets.",
    slug: "js-explicit-resource-management",
    category: "JavaScript",
    type: "static",
    author: "Systems Engineer",
    createdAt: new Date().toISOString(),
    readTime: "15 min read",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=2574&auto=format&fit=crop",
    tags: ["JavaScript", "Resource Management", "Memory Leaks", "ES2026", "Clean Code"],
    keywords: ["JavaScript using keyword", "Symbol.dispose", "Explicit Resource Management", "Memory Leaks JS", "Database connections"],
    toc: [
        { id: "cleanup-problem", label: "01. The Cleanup Problem" },
        { id: "using-keyword", label: "02. The 'using' Keyword" },
        { id: "symbol-dispose", label: "03. Symbol.dispose" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Problem -->
        <section id="cleanup-problem" class="scroll-mt-32">
             <div class="border-l-8 border-teal-600 bg-teal-50 dark:bg-teal-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Forgot <code>db.close()</code>?<br/>
                    <span class="text-teal-600 dark:text-teal-400">Not anymore.</span>
                </h1>
                <p class="text-xl md:text-2xl text-teal-800 dark:text-teal-200 font-light leading-relaxed">
                    Handling resources in JavaScript has always been risky. <code>try/finally</code> blocks are verbose and easy to mess up.
                    <br/><br/>
                    If you forget to close a database connection or file handle, your server eventually crashes. 
                </p>
             </div>
        </section>

        <!-- 02. Using Keyword -->
        <section id="using-keyword" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-teal-600 dark:text-teal-500">02.</span>
                Enter <code>using</code>
            </h2>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="p-6 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                    <h3 class="text-xl font-bold text-red-700 dark:text-red-400 mb-4">Old Way (Try/Finally)</h3>
                    <pre class="text-xs font-mono text-gray-800 dark:text-white whitespace-pre-wrap">
const conn = await db.connect();
try {
  await conn.query(...);
} finally {
  await conn.close(); // 😫 Easy to forget
}
                    </pre>
                </div>
                <div class="p-6 rounded-xl bg-teal-50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/20">
                    <h3 class="text-xl font-bold text-teal-700 dark:text-teal-400 mb-4">New Way (Scope-Based)</h3>
                    <pre class="text-xs font-mono text-gray-800 dark:text-white whitespace-pre-wrap">
{
  using conn = await db.connect();
  await conn.query(...);
} 
// ✅ Automatically disposed when block exits!
                    </pre>
                </div>
            </div>
        </section>

        <!-- 03. Symbol.dispose -->
        <section id="symbol-dispose" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-teal-600 dark:text-teal-500">03.</span>
                Implementing It: The Internals
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    JavaScript didn't just add a keyword; it added a protocol. Objects become "disposable" by implementing a specific method keyed by a global <strong>Symbo</strong>.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                     <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                        <h4 class="font-bold mb-2">Sync Disposal</h4>
                        <code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Symbol.dispose</code>
                        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">For closing file handles, stopping timers, or releasing memory buffers immediately.</p>
                     </div>
                     <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                        <h4 class="font-bold mb-2">Async Disposal</h4>
                        <code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Symbol.asyncDispose</code>
                        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">For closing DB connections, flushing logs to disk, or network socket termination (returns a Promise).</p>
                     </div>
                </div>
                <p>
                    When you use the <code>using</code> keyword (or <code>await using</code>), the JavaScript engine does the following invisibly:
                </p>
                <ol class="list-decimal pl-6 space-y-2">
                    <li>Creates a hidden <code>try/finally</code> block around the current scope.</li>
                    <li>Inside <code>finally</code>, checks if the object has the disposal symbol.</li>
                    <li>Calls that method primarily to clean up artifacts.</li>
                </ol>
            </div>

            <div class="bg-teal-900/10 border-l-4 border-teal-500 p-6 my-8">
                 <h4 class="font-bold text-teal-800 dark:text-teal-200 mb-2">Deep Dive: Stack Unwinding</h4>
                 <p class="text-gray-700 dark:text-gray-300">
                     Just like C++ destructors, resources are disposed in <strong>Reverse Order</strong> of their creation (LIFO - Last In, First Out). 
                     <br/>
                     If you open <code>Connection A</code> then <code>Connection B</code>, <code>Connection B</code> will always close first. This is critical for preventing dependency errors during shutdown.
                 </p>
            </div>

            <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto text-blue-100 shadow-2xl">
                 <span class="text-gray-500">// Custom Class Implementation</span><br/>
                 <span class="text-purple-400">class</span> DatabaseConnection {'{'} <br/>
                 &nbsp;&nbsp;<span class="text-blue-400">constructor</span>(id) {'{'} this.id = id; {'}'} <br/>
                 <br/>
                 &nbsp;&nbsp;<span class="text-gray-500">// The magic method</span><br/>
                 &nbsp;&nbsp;[<span class="text-yellow-400">Symbol.asyncDispose</span>]() {'{'} <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-blue-400">await</span> this.disconnect(); <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;console.log(<span class="text-green-400">\`Disposed Connection \${this.id}\`</span>); <br/>
                 &nbsp;&nbsp;{'}'} <br/>
                 {'}'}
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-teal-600 dark:text-teal-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-teal-500 space-y-6">
                <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">RAII comes to JavaScript</h3>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                        This pattern is known as <strong>RAII (Resource Acquisition Is Initialization)</strong> in C++ and Rust. It is the gold standard for resource safety. 
                    </p>
                </div>
                 <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Killer Use Case: DB Transactions</h3>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Ever locked a database row because an error occurred before you could call <code>COMMIT</code> or <code>ROLLBACK</code>? 
                        With explicit management, you can create a <code>TransactionHandle</code> that automatically rolls back if the scope exits with an error. No more deadlocks.
                    </p>
                </div>
                 <div class="text-xs font-mono text-gray-500 bg-gray-200 dark:bg-black p-4 rounded-lg">
                    ⚠️ Note: Requires TypeScript 5.2+ and a polyfill for <code>Symbol.dispose</code> in older environments (e.g., core-js).
                </div>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';

// 🗑️ Garbage Collection Visualizer

export default function DisposalDemo() {
    const [connections, setConnections] = useState([]);
    const [logs, setLogs] = useState([]);

    const addLog = (msg) => setLogs(p => [...p.slice(-4), msg]);

    const openConnection = (type) => {
        const id = Math.random().toString(36).substr(2, 5);
        
        // Add connection
        setConnections(prev => [...prev, { id, type, status: 'active', createdAt: Date.now() }]);
        addLog(\`Connected: \${id} (\${type})\`);

        // If type is 'using', schedule auto-cleanup simulation
        if (type === 'using') {
            setTimeout(() => {
                setConnections(prev => prev.filter(c => c.id !== id));
                addLog(\`Auto-Disposed: \${id} (Scope Exit)\`);
            }, 3000);
        }
    };

    // Manual cleanup for 'legacy' type
    const manualClose = (id) => {
        setConnections(prev => prev.filter(c => c.id !== id));
        addLog(\`Manually Closed: \${id}\`);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-teal-500">🧹</span> Resource Monitor
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
                {/* Controls */}
                <div className="space-y-6">
                     <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <span className="mr-2">⚠️</span> Legacy (Manual)
                        </h4>
                        <button 
                            onClick={() => openConnection('manual')}
                            className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-lg border border-red-200 hover:bg-red-100 transition"
                        >
                            Open Connection (Must Close Manually)
                        </button>
                        <p className="text-xs text-gray-400 mt-2">Simulates <code>const conn = db.connect()</code>. Will leak if you forget.</p>
                     </div>

                     <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <span className="mr-2">🔄</span> Modern (Using)
                        </h4>
                        <button 
                            onClick={() => openConnection('using')}
                            className="w-full py-3 bg-teal-50 text-teal-600 font-bold rounded-lg border border-teal-200 hover:bg-teal-100 transition"
                        >
                            Open Scope (Auto-Close)
                        </button>
                         <p className="text-xs text-gray-400 mt-2">Simulates <code>using conn = db.connect()</code>. Closes after 3s.</p>
                     </div>
                </div>

                {/* Connection Pool */}
                <div className="bg-slate-900 rounded-xl p-6 relative min-h-[300px]">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-4 flex justify-between">
                        <span>Active Connections</span>
                        <span className={connections.length > 5 ? 'text-red-500' : 'text-green-500'}>{connections.length} Open</span>
                    </div>
                    
                    <div className="space-y-2">
                        {connections.length === 0 && (
                             <div className="text-center text-gray-600 mt-20">No active resources.</div>
                        )}
                        {connections.map(c => (
                            <div key={c.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700 animate-in slide-in-from-left-2">
                                <div className="flex items-center gap-3">
                                    <span className="mr-3">🗄️</span>
                                    <div>
                                        <div className="text-sm font-bold text-white">ID: {c.id}</div>
                                        <div className="text-[10px] text-gray-400 uppercase">{c.type === 'using' ? 'Auto-Managed' : 'Manual'}</div>
                                    </div>
                                </div>
                                {c.type === 'manual' && (
                                    <button 
                                        onClick={() => manualClose(c.id)}
                                        className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition"
                                    >
                                        Close
                                    </button>
                                )}
                                {c.type === 'using' && (
                                    <div className="text-xs text-teal-500 animate-pulse">Closing soon...</div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Leak Warning */}
                    {connections.filter(c => c.type === 'manual').length > 3 && (
                        <div className="absolute bottom-4 left-4 right-4 bg-red-500/20 border border-red-500 text-red-200 p-2 rounded text-xs text-center font-bold animate-pulse">
                            ⚠️ Memory Leak Detected! Too many manual connections open.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
`
};

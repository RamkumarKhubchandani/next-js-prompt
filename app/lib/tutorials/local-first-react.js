export const localFirstReact = {
    title: "Local-First React: The Death of the Loading Spinner 💀",
    description: "Your app should work in a tunnel. Discover the 'Local-First' architecture using Replicache, PGLite, and CRDTs to build instant, offline-capable applications.",
    slug: "local-first-react",
    type: "static",
    author: "Offline Systems Engineer",
    createdAt: new Date().toISOString(),
    readTime: "45 min read",
    difficulty: "Expert",
    image: "https://images.unsplash.com/photo-1544256335-af39257bbh69?q=80&w=2670&auto=format&fit=crop",
    tags: ["React 19", "Local-First", "Offline", "PGLite", "Replicache"],
    keywords: ["Local-First", "CRDTs", "Replicache", "PGLite", "Optimistic UI", "Offline Mode", "Sync Engine"],
    toc: [
        { id: "lie-of-optimistic-ui", label: "01. The Lie of Optimistic UI" },
        { id: "sync-engine-architecture", label: "02. Sync Engine Architecture" },
        { id: "crdt-explained", label: "03. Conflict Resolution (CRDTs)" },
        { id: "tooling", label: "04. Tooling: Replicache & PGLite" },
        { id: "ux-patterns", label: "05. UX Patterns for Sync" },
        { id: "interactive-sync", label: "06. Build: Sync Engine" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. The Lie -->
        <section id="lie-of-optimistic-ui" class="scroll-mt-32">
             <div class="border-l-8 border-rose-600 bg-rose-50 dark:bg-rose-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Optimistic UI is not enough.
                </h1>
                <p class="text-xl md:text-2xl text-rose-800 dark:text-rose-200 font-light leading-relaxed">
                    We've all written the code: <code>setShow(true)</code>, then <code>fetch('/api/create')</code>. If the fetch fails, we revert the UI.
                    <br/><br/>
                    But what if the user is offline for 3 days? What if they close the tab before the fetch completes? What if they make 50 edits while in a tunnel?
                    <br/><br/>
                    <strong>Local-First</strong> is not just "caching." It means <strong>the Client Database is the source of truth</strong> for the UI. The Server is just a backup.
                </p>
                <div class="bg-rose-900/10 border-l-4 border-rose-500 p-6 mt-8">
                     <h4 class="font-bold text-rose-800 dark:text-rose-200 mb-2">Deep Dive: The 100ms Threshold</h4>
                     <p class="text-gray-700 dark:text-gray-300 text-sm">
                         Jakob Nielsen's rule: < 100ms feels instantaneous. <br/>
                         Server roundtrips vary (50ms - 500ms). Local-First guarantees < 10ms for all read/write operations by hitting the local DB first. 
                     </p>
                </div>
             </div>
        </section>

        <!-- 02. Sync Engine Architecture -->
        <section id="sync-engine-architecture" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-rose-600 dark:text-rose-500">02.</span>
                Sync Engine Architecture
            </h2>
             <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    In a Local-First app, you <strong>never</strong> \`await fetch()\` in your component's event handler.
                </p>
                <div class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 font-mono text-sm my-6">
                    <div class="text-red-500 font-bold mb-2">// ❌ Traditional Flow</div>
                    Click -> Await API -> Update UI -> Error if Offline
                    <br/><br/>
                    <div class="text-green-500 font-bold mb-2">// ✅ Local-First Flow</div>
                    Click -> Write to Local DB (IndexedDB/Wasm) -> Update UI Instantly -> Background Sync Process -> Server
                </div>
            </div>
            
            <h3 class="text-2xl font-bold mb-4">The Sync Queue</h3>
            <p class="text-gray-700 dark:text-gray-300">
                Your application needs a robust queueing system.
            </p>
            <ul class="list-disc pl-6 space-y-2 mt-4 text-gray-700 dark:text-gray-300">
                <li><strong>Mutation:</strong> A user action (e.g., "Add Todo") is serializable into a JSON instruction.</li>
                <li><strong>Persist:</strong> Save this instruction to IndexedDB immediately.</li>
                <li><strong>Apply:</strong> Run the logic against the local state for instant feedback.</li>
                <li><strong>Push:</strong> A \`navigator.onLine\` listener attempts to flush the queue to the server.</li>
                <li><strong>Rebase:</strong> If the server rejects it (conflict), re-calculate the state.</li>
            </ul>
        </section>
        
        <!-- 03. CRDTs -->
        <section id="crdt-explained" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-rose-600 dark:text-rose-500">03.</span>
                Conflict-Free Replicated Data Types (CRDTs)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                When two users edit the same document offline, and then come online, who wins?
                <br/>
                CRDTs are data structures that guarantee mathematical consistency.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
                     <h4 class="font-bold text-lg mb-2">Last-Write-Wins (LWW)</h4>
                     <p className="text-sm text-gray-500 mb-4">Simple, brute force.</p>
                     <p className="text-sm">User A sets title "Hello" at 10:00.<br/>User B sets title "Hi" at 10:01.<br/>Sync -> Title is "Hi".</p>
                 </div>
                 <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
                     <h4 class="font-bold text-lg mb-2">Grow-Only Set (G-Set)</h4>
                     <p className="text-sm text-gray-500 mb-4">Perfect for Todo Lists.</p>
                     <p className="text-sm">You can only ADD items. Removing is strictly "Adding a tombstone". Merging two lists is just the union of both.</p>
                 </div>
            </div>
        </section>

        <!-- 04. Tooling -->
        <section id="tooling" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-rose-600 dark:text-rose-500">04.</span>
                The Modern Stack
            </h2>
             <div className="space-y-6">
                <div className="flex gap-4 items-start">
                    <div className="bg-rose-100 dark:bg-rose-900/20 p-2 rounded text-rose-600 font-bold">1</div>
                    <div>
                        <h4 className="font-bold">Replicache</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Commercial grade sync engine. Handles the queue, the websocket, and the optimistic UI for you. Used by linear.app style apps.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="bg-rose-100 dark:bg-rose-900/20 p-2 rounded text-rose-600 font-bold">2</div>
                    <div>
                        <h4 className="font-bold">PGLite (Postgres in Wasm)</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Run a full Postgres database inside the browser tab. Sync it to a real server-side Postgres via logical replication.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="bg-rose-100 dark:bg-rose-900/20 p-2 rounded text-rose-600 font-bold">3</div>
                    <div>
                        <h4 className="font-bold">ElectricSQL</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">An open-source layer that sits between your Postgres and your clients, managing active replication streams.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 06. Demo -->
        <section id="interactive-sync" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-rose-600 dark:text-rose-500">06.</span>
                Build: Offline-First Todo
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Try this simulation. Turn "Off" the network switch. Add items. Reload the page (simulating a crash). Then turn the network back "On" and watch the sync happen.
            </p>
        </section>
    </div>
    `,
    code: `import React, { useState, useEffect, useRef } from 'react';

// 💾 Local-First Todo Simulator
// Demonstrates the "Write Local -> Sync Background" pattern

export default function SyncEngineDemo() {
    const [online, setOnline] = useState(true);
    const [todos, setTodos] = useState([]); // Local Store
    const [serverTodos, setServerTodos] = useState([]); // Remote Store (Mock)
    const [pendingMutations, setPendingMutations] = useState(0);
    const [isSyncing, setIsSyncing] = useState(false);

    // Initial Load (Simulate hydrating from LocalStorage)
    useEffect(() => {
        const saved = localStorage.getItem('local-todos');
        if (saved) setTodos(JSON.parse(saved));
        
        // Mock initial server state
        setServerTodos([
            { id: 1, text: 'Buy Milk', synced: true },
            { id: 2, text: 'Walk Dog', synced: true }
        ]);
        
        if (!saved) {
             setTodos([
                { id: 1, text: 'Buy Milk', synced: true },
                { id: 2, text: 'Walk Dog', synced: true }
            ]);
        }
    }, []);

    // Persist to LocalStorage on every change (Persistence Layer)
    useEffect(() => {
        localStorage.setItem('local-todos', JSON.stringify(todos));
        const pending = todos.filter(t => !t.synced).length;
        setPendingMutations(pending);
    }, [todos]);

    // The Sync Loop
    useEffect(() => {
        if (!online) return;

        const interval = setInterval(() => {
            const pending = todos.filter(t => !t.synced);
            if (pending.length > 0) {
                syncData(pending);
            }
        }, 3000); // Try to sync every 3s if online

        return () => clearInterval(interval);
    }, [online, todos]);

    const syncData = async (pendingItems) => {
        setIsSyncing(true);
        // Simulate Network Latency
        await new Promise(r => setTimeout(r, 1000));

        // updating "Server"
        const newServerTodos = [...serverTodos];
        pendingItems.forEach(item => {
            if (!newServerTodos.find(i => i.id === item.id)) {
                newServerTodos.push({ ...item, synced: true });
            }
        });
        setServerTodos(newServerTodos);

        // Updating "Client" to mark as synced
        setTodos(prev => prev.map(t => ({...t, synced: true})));
        setIsSyncing(false);
    };

    const addTodo = (e) => {
        e.preventDefault();
        const text = e.target.input.value;
        if (!text) return;

        const newTodo = {
            id: Date.now(),
            text,
            synced: false // Initially false!
        };

        // 1. Optimistic Update (Instant)
        setTodos(prev => [...prev, newTodo]);
        e.target.reset();
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 min-h-[500px]">
            
            {/* CLIENT DEVICE */}
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl border-4 border-slate-200 dark:border-slate-800 p-2 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 w-full h-6 bg-slate-200 dark:bg-slate-800 rounded-t-xl flex justify-center items-center gap-2 z-10">
                    <div className="w-16 h-4 bg-black rounded-full"></div>
                </div>
                
                <div className="pt-8 px-4 pb-4 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl">My Tasks</h3>
                        <button 
                            onClick={() => setOnline(!online)}
                            className={\`p-2 rounded-full transition-colors \${online ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}\`}
                        >
                            {online ? <span>📶</span> : <span>📵</span>}
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2">
                        {todos.map(t => (
                            <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700">
                                <span>{t.text}</span>
                                {t.synced ? (
                                    <span>✅</span>
                                ) : (
                                    <span className="animate-spin inline-block">⏳</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                         <form onSubmit={addTodo} className="flex gap-2">
                             <input name="input" placeholder="New Task..." className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 ring-rose-500" />
                             <button className="bg-rose-600 text-white rounded-lg px-4 font-bold">+</button>
                         </form>
                         <div className="text-[10px] text-gray-400 mt-2 text-center">
                             Stats: {pendingMutations} Pending Sync | Status: {online ? 'Online' : 'Offline'}
                         </div>
                    </div>
                </div>
            </div>

            {/* SYNC CLOUD */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-black/20 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 relative">
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     {isSyncing && (
                         <div className="w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-[shimmer_1s_infinite]"></div>
                     )}
                 </div>

                 <div className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 z-10">
                     <span className={\`text-6xl \${isSyncing ? "animate-pulse" : ""}\`}>🗄️</span>
                 </div>

                 <h3 className="text-xl font-bold mb-4 text-slate-500">Cloud Database (Postgres)</h3>
                 
                 <div className="w-full max-w-xs bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-xs overflow-hidden">
                     <div className="text-slate-500 mb-2 border-b border-slate-800 pb-2">SELECT * FROM todos;</div>
                     {serverTodos.map(t => (
                         <div key={t.id} className="truncate text-green-400">
                             {t.id}: "{t.text}"
                         </div>
                     ))}
                     {serverTodos.length === 0 && <span className="text-slate-600">Empty...</span>}
                 </div>
            </div>
        </div>
    );
}
`
};

export const nodeNativeSqlite = {
    title: "Native SQLite in Node.js: Do You Even Need a Database Server?",
    description: "Postgres is great, but do you need that Docker container? Node.js 22+ now has a built-in SQLite driver. Learn why 'Local-First' backends are the future for microservices.",
    slug: "node-native-sqlite",
    category: "Node.js",
    type: "static",
    author: "Backend Architect",
    createdAt: new Date().toISOString(),
    readTime: "18 min read",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2521&auto=format&fit=crop",
    tags: ["Node.js", "SQLite", "Database", "Local-First", "Performance"],
    keywords: ["node:sqlite", "built-in sqlite", "bun sqlite", "libsql", "microservices database"],
    toc: [
        { id: "docker-fatigue", label: "01. Docker Fatigue" },
        { id: "native-driver", label: "02. The Native Driver" },
        { id: "wal-mode", label: "03. High Performance (WAL)" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Docker Fatigue -->
        <section id="docker-fatigue" class="scroll-mt-32">
             <div class="border-l-8 border-blue-600 bg-blue-50 dark:bg-blue-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Delete your <code>docker-compose.yml</code>.
                </h1>
                <p class="text-xl md:text-2xl text-blue-800 dark:text-blue-200 font-light leading-relaxed">
                    For years, the first step of any Node.js project was "spin up a Postgres container". 
                    <br/><br/>
                    With modern NVMe SSDs and <strong>Node.js 22.5+</strong>, a local SQLite file using the native driver often creates a simpler, faster, and zero-latency architecture for 99% of microservices.
                </p>
             </div>
        </section>

        <!-- 02. Native Driver -->
        <section id="native-driver" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">02.</span>
                Zero Dependencies
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    No <code>npm install better-sqlite3</code>. No python compilation errors. It's built right into the binary.
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// index.js</div>
                 <div class="text-purple-400">import</div> {'{'} Database {'}'} <div class="text-purple-400">from</div> <span class="text-green-400">'node:sqlite'</span>;<br/><br/>
                 
                 <div class="text-gray-500">// Synchronous (Fast!)</div>
                 <div class="text-purple-400">const</div> db = <div class="text-purple-400">new</div> Database(<span class="text-green-400">'./data.db'</span>);<br/><br/>

                 <div class="text-gray-500">// Prepared Statements</div>
                 <div class="text-purple-400">const</div> query = db.prepare(<span class="text-green-400">'SELECT * FROM users WHERE id = ?'</span>);<br/>
                 <div class="text-purple-400">const</div> user = query.get(1);
            </div>
        </section>

        <!-- 03. WAL Mode -->
        <section id="wal-mode" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">03.</span>
                It Scales (WAL Mode)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                "But SQLite doesn't handle concurrency!" <br/>
                <strong>False.</strong> In WAL (Write-Ahead Logging) mode, readers do not block writers. You can handle thousands of reads per second on a single file.
            </p>
            <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                <code class="text-indigo-700 dark:text-indigo-300 font-bold">db.exec('PRAGMA journal_mode = WAL');</code>
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-blue-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Complexity is the enemy.</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    If your service has < 100GB of data and runs on a single node (even with replicas using LiteFS), <strong>Postgres is over-engineering</strong>. 
                    <br/><br/>
                    The reliability of a simple file on disk is unmatched. Backups are just <code>cp data.db backup.db</code>.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';

// 🗄️ Database Architecture Visualizer

export default function DbDemo() {
    const [arch, setArch] = useState('postgres'); // postgres | sqlite
    const [requests, setRequests] = useState([]);
    const [latency, setLatency] = useState({ p95: 0, last: 0 });

    const simulateRequest = () => {
        const id = Math.random();
        
        // Simulating network latency vs disk latency
        // Postgres: App -> Network -> DB -> Network -> App (~5-10ms)
        // SQLite: App -> Disk -> App (~0.1ms)
        
        const tripTime = arch === 'postgres' ? 800 : 150; // Visual ms
        const realLatency = arch === 'postgres' ? 12 : 0.4; // Text ms

        setRequests(prev => [...prev, { id, status: 'sent', startTime: Date.now() }]);
        setLatency({ p95: realLatency, last: realLatency });

        setTimeout(() => {
            setRequests(prev => prev.filter(r => r.id !== id));
        }, tripTime);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-blue-500">🗄️</span> Architecture Latency
                </h3>
                <div className="flex bg-slate-200 dark:bg-slate-900 p-1 rounded-xl">
                    <button 
                        onClick={() => setArch('postgres')}
                        className={\`px-6 py-2 rounded-lg font-bold text-sm transition-all \${arch === 'postgres' ? 'bg-white dark:bg-slate-800 shadow text-blue-500' : 'text-slate-500'}\`}
                    >
                        Traditional (Postgres)
                    </button>
                    <button 
                        onClick={() => setArch('sqlite')}
                        className={\`px-6 py-2 rounded-lg font-bold text-sm transition-all \${arch === 'sqlite' ? 'bg-white dark:bg-slate-800 shadow text-green-500' : 'text-slate-500'}\`}
                    >
                        Embedded (SQLite)
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative min-h-[300px]">
                
                {/* Application Server */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 z-10 flex flex-col items-center justify-center shadow-lg">
                    <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                        <span className="text-3xl">🖥️</span>
                    </div>
                    <div className="font-bold text-gray-800 dark:text-white">Node.js API</div>
                    <button 
                        onClick={simulateRequest}
                        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md active:scale-95 transition-transform"
                    >
                        Make Query
                    </button>
                    
                    {/* SQLite Architecture: DB Inside App */}
                    {arch === 'sqlite' && (
                        <div className="mt-4 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 animate-in fade-in zoom-in">
                            <span className="text-green-600">📄</span>
                            <span className="text-xs font-bold text-green-700 dark:text-green-400">Running In-Process (data.db)</span>
                        </div>
                    )}
                </div>

                {/* Database Server / Disk */}
                <div className={\`bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 z-10 flex flex-col items-center justify-center transition-all duration-500 \${arch === 'sqlite' ? 'opacity-30 blur-sm scale-90' : 'shadow-lg'}\`}>
                     <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full mb-4">
                        <span className="text-3xl">🗄️</span>
                    </div>
                    <div className="font-bold text-gray-800 dark:text-white">Postgres Server</div>
                    <div className="text-xs text-gray-400 mt-2">Requires TCP/IP Connection</div>
                </div>

                {/* Animation Layer */}
                 <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {requests.map(r => (
                        <div 
                            key={r.id}
                            className="absolute flex items-center"
                            style={{ 
                                left: arch === 'postgres' ? '25%' : '25%', // Start at App
                            }}
                        >
                            {/* The Request Bolt */}
                            <div className={\`p-2 rounded-full shadow-xl z-50 \${arch === 'postgres' ? 'bg-blue-500 animate-network-trip' : 'bg-green-500 animate-disk-flash'}\`}>
                                <span className="text-white text-xs">⚡</span>
                            </div>
                        </div>
                    ))}
                 </div>
                 
                 {/* Metrics */}
                 <div className="absolute top-0 right-0 lg:left-1/2 lg:-translate-x-1/2 -mt-16 bg-black text-green-400 font-mono text-sm p-2 rounded border border-green-900">
                    Latency: {latency.p95}ms
                 </div>

            </div>
            
             <div className="mt-12 text-center text-sm text-gray-500">
                {arch === 'postgres' 
                    ? "Network Roundtrip: 1-10ms (Docker Network / Cloud VPC)"
                    : "Function Call Overhead: 0.05ms (Direct File I/O via C+ Binding)"}
            </div>

        </div>
    );
}
`
};

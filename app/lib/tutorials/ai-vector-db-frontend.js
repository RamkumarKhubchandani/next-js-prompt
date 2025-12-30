export const aiVectorDbFrontend = {
    title: "Vector Databases for Frontend: Building Memory",
    description: "Why call the backend for search? Learn how to run a full Vector Database (Orama, Voy) directly in the user's browser for instant, offline-capable semantic search.",
    slug: "ai-vector-db-frontend",
    category: "AI Engineering",
    type: "static",
    author: "Frontend Architect",
    createdAt: new Date().toISOString(),
    readTime: "20 min read",
    difficulty: "Expert",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2521&auto=format&fit=crop",
    tags: ["AI Engineering", "Vector Database", "Orama", "Local-First", "Search"],
    keywords: ["Client-side Vector DB", "Orama Search", "Browser Search", "Semantic Search", "Offline AI"],
    toc: [
        { id: "backend-bottleneck", label: "01. The Backend Bottleneck" },
        { id: "orama", label: "02. Meet Orama" },
        { id: "long-term-memory", label: "03. Long Term Memory" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Backend Bottleneck -->
        <section id="backend-bottleneck" class="scroll-mt-32">
             <div class="border-l-8 border-teal-600 bg-teal-50 dark:bg-teal-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Stop hitting <code>/api/search</code>.
                </h1>
                <p class="text-xl md:text-2xl text-teal-800 dark:text-teal-200 font-light leading-relaxed">
                    Latency kills UI. If I want to search my local notes or chat history, I shouldn't need a server roundtrip.
                    <br/><br/>
                    <strong>Client-Side Vector DBs</strong> allow you to index thousands of documents in the user's RAM and search them semantically in < 5ms.
                </p>
             </div>
        </section>

        <!-- 02. Orama -->
        <section id="orama" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-teal-600 dark:text-teal-500">02.</span>
                Meet Orama
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Orama (formerly Lyra) is a pure JS, immutable vector database. It supports fuzzy search, faceting, and vector embeddings out of the box.
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// search.ts</div>
                 <div class="text-purple-400">import</div> {'{'} create, insert, search {'}'} <div class="text-purple-400">from</div> <span class="text-green-400">'@orama/orama'</span>;<br/><br/>
                 
                 <div class="text-purple-400">const</div> db = <div class="text-purple-400">await</div> create({'{'} schema: {'{'} txt: <span class="text-green-400">'string'</span> {'}'} {'}'}); <br/>
                 <div class="text-purple-400">await</div> insert(db, {'{'} txt: <span class="text-green-400">"Meeting with Sarah"</span> {'}'}); <br/><br/>
                 
                 <div class="text-gray-500">// Near-instant result</div>
                 <div class="text-purple-400">const</div> result = <div class="text-purple-400">await</div> search(db, {'{'} term: <span class="text-green-400">"Sarah meeting"</span> {'}'});
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-teal-600 dark:text-teal-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-teal-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Sync is Hard</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    The challenge isn't searching; it's syncing. If the user edits a note on their phone, how do you update the local index on their laptop?
                    <br/><br/>
                    <strong>Pattern:</strong> Use CRDTs (Yjs/Automerge) for the data propagation, and re-index the Vector DB on change events.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';
import { Search, Database, HardDrive, Cpu, Clock } from 'lucide-react';

// 🔍 Local Vector Search Visualizer

export default function LocalVectorDemo() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [latency, setLatency] = useState(0);

    // Mock Data
    const docs = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        title: \`Document #\${i}\`,
        text: i % 2 === 0 ? "React Server Components are cool" : "Vector databases are fast"
    }));

    const handleSearch = (text) => {
        setQuery(text);
        if (!text) {
            setResults([]); 
            setLatency(0);
            return;
        }

        const start = performance.now();
        // Simulate "Vector" Search algorithm locally (filtering + ranking)
        const matches = docs.filter(d => d.text.toLowerCase().includes(text.toLowerCase()) || d.title.toLowerCase().includes(text.toLowerCase()));
        const end = performance.now();
        
        setLatency((end - start).toFixed(2));
        setResults(matches.slice(0, 5));
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl h-[500px] flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-teal-500">🔍</span> Client-Side Database
                </h3>
            </div>

            <div className="flex gap-8 h-full">
                
                {/* Search Area */}
                <div className="flex-1 flex flex-col gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            value={query}
                            onChange={e => handleSearch(e.target.value)}
                            placeholder="Search local index..."
                            className="w-full pl-12 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-green-500">
                             {latency > 0 && \`\${latency}ms\`}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2">
                        {results.map(r => (
                            <div key={r.id} className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm animate-in slide-in-from-bottom-2">
                                <div className="font-bold text-gray-800 dark:text-white">{r.title}</div>
                                <div className="text-sm text-gray-500">{r.text}</div>
                            </div>
                        ))}
                        {query && results.length === 0 && <div className="text-center text-gray-400 mt-10">No matches found locally.</div>}
                    </div>
                </div>

                {/* Architecture Viz */}
                <div className="w-1/3 bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center gap-6">
                    
                    <div className="text-center max-w-[150px]">
                        <div className="flex gap-1 justify-center mb-2">
                            {[1,2,3].map(i => <div key={i} className="w-2 h-8 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: \`\${i*100}ms\` }}></div>)}
                        </div>
                        <div className="font-bold text-teal-700 dark:text-teal-400">In-Memory Index</div>
                        <div className="text-xs text-gray-500">Running in Thread</div>
                    </div>

                    <div className="w-full h-px bg-gray-400 dark:bg-slate-700"></div>

                    <div className="flex items-center gap-3 opacity-50">
                        <HardDrive size={24} />
                        <div className="text-xs">IndexedDB (Persisted)</div>
                    </div>

                </div>

            </div>
        </div>
    );
}
`
};

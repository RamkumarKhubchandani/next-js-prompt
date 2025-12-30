export const nodeNativeFetchStreams = {
    title: "Node.js Native Fetch & Web Streams: Goodbye Axios",
    description: "Axios and node-fetch are obsolete. Node.js now has full Web Standards support. Learn how to build efficient, streaming data pipelines using zero external dependencies.",
    slug: "node-native-fetch-streams",
    category: "Node.js",
    type: "static",
    author: "Backend Lead",
    createdAt: new Date().toISOString(),
    readTime: "18 min read",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    tags: ["Node.js", "Fetch API", "Web Streams", "Performance", "Standards"],
    keywords: ["undici", "native fetch", "node.js streams", "web streams api", "axios alternative"],
    toc: [
        { id: "fetch-api", label: "01. Native Fetch" },
        { id: "web-streams", label: "02. Web vs Node Streams" },
        { id: "streaming-pipelines", label: "03. Streaming Pipelines" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Native Fetch -->
        <section id="fetch-api" class="scroll-mt-32">
             <div class="border-l-8 border-cyan-600 bg-cyan-50 dark:bg-cyan-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Universal I/O.
                </h1>
                <p class="text-xl md:text-2xl text-cyan-800 dark:text-cyan-200 font-light leading-relaxed">
                    For a decade, Node.js text handling and HTTP requests were proprietary (<code>http.request</code>, <code>fs.createReadStream</code>).
                    <br/><br/>
                    Now, Node.js implements the <strong>Web Standards</strong>. Code you write for the browser runs on the server.
                </p>
             </div>
        </section>

        <!-- 02. Web vs Node Streams -->
        <section id="web-streams" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">02.</span>
                ReadableStream vs Class Stream
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Node.js streams (<code>.pipe()</code>) are legendary but complex. 
                    <strong>Web Streams</strong> (<code>.pipeTo()</code>, <code>.pipeThrough()</code>) are the modern standard, used by <code>fetch</code> and supported by Edge runtimes (Cloudflare, Deno).
                </p>
            </div>
             <div class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-500 mb-2">// fetch-and-stream.js (Zero Dependencies)</div>
                 <div class="text-purple-500">const</div> response = <span class="text-blue-500">await</span> fetch(<span class="text-green-500">'https://huge.file.zip'</span>); <br/><br/>
                 
                 <span class="text-blue-500">await</span> response.body <br/>
                 &nbsp;&nbsp;.<span class="text-yellow-500">pipeThrough</span>(<span class="text-purple-500">new</span> DecompressionStream(<span class="text-green-500">'gzip'</span>)) <br/>
                 &nbsp;&nbsp;.<span class="text-yellow-500">pipeTo</span>(Writable.toWeb(fs.createWriteStream(<span class="text-green-500">'./out.txt'</span>)));
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-cyan-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Interoperability is king.</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    By adopting Web Streams, you make your code portable. The same utility function that processes CSVs on your Node.js backend can now handle file uploads in the user's browser, sharing the exact same logic.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';
import { ArrowRight, FileText, Database, HardDrive, Download, Link2 } from 'lucide-react';

// 🌊 Stream Visualizer

export default function StreamsDemo() {
    const [isStreaming, setIsStreaming] = useState(false);
    const [chunks, setChunks] = useState([]);
    
    const startStream = () => {
        setIsStreaming(true);
        setChunks([]);
        
        let count = 0;
        const interval = setInterval(() => {
            if (count > 5) {
                clearInterval(interval);
                setIsStreaming(false);
                return;
            }
            setChunks(prev => [...prev, { id: count, size: Math.floor(Math.random() * 50) + 10 + 'kb' }]);
            count++;
        }, 800);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-cyan-500">🌊</span> Web Streams
                </h3>
                <button 
                    onClick={startStream}
                    disabled={isStreaming}
                    className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold px-6 py-2 rounded-xl transition-all"
                >
                    {isStreaming ? 'Streaming...' : 'Start Pipeline'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 relative min-h-[200px] justify-between px-8 bg-slate-100 dark:bg-black/20 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                
                {/* Source */}
                <div className="flex flex-col items-center gap-2 z-10">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-200 dark:border-slate-700">
                        <Database size={24} className="text-cyan-600" />
                    </div>
                    <div className="font-bold text-xs">Response.body</div>
                </div>

                {/* The Pipe */}
                <div className="flex-1 h-3 bg-slate-300 dark:bg-slate-700 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center px-2">
                        {chunks.map((chunk) => (
                             <div 
                                key={chunk.id}
                                className="absolute bg-cyan-400 w-8 h-2 rounded-full animate-stream-move shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                style={{ animationDuration: '3s', animationDelay: \`\${chunk.id * 800}ms\` }}
                             />
                        ))}
                    </div>
                </div>

                {/* Transform */}
                 <div className="flex flex-col items-center gap-2 z-10">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-200 dark:border-slate-700">
                        <Link2 size={24} className="text-purple-500" />
                    </div>
                    <div className="font-bold text-xs text-center">Transform<br/>Stream</div>
                </div>
                
                 {/* The Pipe 2 */}
                <div className="flex-1 h-3 bg-slate-300 dark:bg-slate-700 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center px-2">
                        {chunks.length > 2 && chunks.map((chunk) => (
                             <div 
                                key={chunk.id + '_2'}
                                className="absolute bg-purple-400 w-6 h-2 rounded-full animate-stream-move shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                                style={{ animationDuration: '3s', animationDelay: \`\${(chunk.id * 800) + 1500}ms\` }}
                             />
                        ))}
                    </div>
                </div>

                {/* Sink */}
                 <div className="flex flex-col items-center gap-2 z-10">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-200 dark:border-slate-700">
                        <HardDrive size={24} className="text-green-600" />
                    </div>
                    <div className="font-bold text-xs">Writable</div>
                </div>

            </div>
            
             <div className="mt-8 bg-black p-4 rounded-xl font-mono text-xs text-green-400 min-h-[100px]">
                {chunks.length === 0 ? <span className="text-gray-500 opacity-50">Waiting for stream...</span> : (
                    chunks.map(c => (
                        <div key={c.id}>
                            [Stream] Received Chunk #{c.id} ({c.size}) -> Piping...
                        </div>
                    ))
                )}
                {chunks.length >= 6 && <div className="text-blue-400 font-bold mt-2">✨ Pipeline Closed. File saved successfully.</div>}
             </div>
        </div>
    );
}
`
};

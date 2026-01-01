export const aiMultimodalRag = {
    title: "Multimodal RAG: Searching Images with Text",
    description: "Text-only search is obsolete. Learn how Multimodal Embeddings (CLIP, GPT-4o) allow users to search your database of images, charts, and diagrams using natural language.",
    slug: "ai-multimodal-rag",
    category: "AI Engineering",
    type: "static",
    author: "AI Research Engineer",
    createdAt: new Date().toISOString(),
    readTime: "22 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=2574&auto=format&fit=crop",
    tags: ["AI Engineering", "RAG", "Multimodal", "Vector Database", "Computer Vision"],
    keywords: ["Multimodal RAG", "CLIP embeddings", "Vector Search", "Image Search", "Verba"],
    toc: [
        { id: "beyond-text", label: "01. Beyond Text Embeddings" },
        { id: "embedding-space", label: "02. The Shared Space" },
        { id: "implementation", label: "03. Implementation Code" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Beyond Text -->
        <section id="beyond-text" class="scroll-mt-32">
             <div class="border-l-8 border-orange-600 bg-orange-50 dark:bg-orange-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "Find the screenshot of the billing error."
                </h1>
                <p class="text-xl md:text-2xl text-orange-800 dark:text-orange-200 font-light leading-relaxed">
                    Standard RAG (Retrieval Augmented Generation) only sees text. If your knowledge base is full of screenshots, PDFs with charts, or architectural diagrams, it's blind.
                    <br/><br/>
                    <strong>Multimodal RAG</strong> solves this by using models like CLIP to understand that an image of a cat and the word "feline" are mathematically identical.
                </p>
             </div>
        </section>

        <!-- 02. Shared Space -->
        <section id="embedding-space" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-orange-600 dark:text-orange-500">02.</span>
                Joint Embedding Space
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    We use a multimodal embedding model. We pass images through a Vision Encoder and text through a Text Encoder. They project vectors into the same n-dimensional space.
                </p>
                <div class="bg-orange-900/10 border-l-4 border-orange-500 p-6 my-6">
                     <h4 class="font-bold text-orange-800 dark:text-orange-200 mb-2">Deep Dive: The Modal Gap</h4>
                     <p class="text-gray-700 dark:text-gray-300 text-sm">
                         You cannot use OpenAI's <code>text-embedding-3-small</code> for text and a ResNet for images. The vectors would be in completely different coordinate systems. <br/><br/>
                         You <strong>must</strong> use a model trained with Contrastive Learning (like CLIP or SigLIP) which forces "A photo of a dog" and the text "A photo of a dog" to be close in vector space.
                     </p>
                </div>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// ingestion.ts</div>
                 <div class="text-purple-400">const</div> imgVector = <div class="text-purple-400">await</div> clip.embedImage(<span class="text-green-400">'./chart.png'</span>); <br/>
                 <div class="text-purple-400">await</div> vectorDB.upsert({'{'}<br/>
                 &nbsp;&nbsp;id: <span class="text-green-400">'chart-1'</span>,<br/>
                 &nbsp;&nbsp;values: imgVector,<br/>
                 &nbsp;&nbsp;metadata: {'{'} type: <span class="text-green-400">'image'</span> {'}'} <br/>
                 {'}'}); <br/><br/>
                 
                 <div class="text-gray-500">// search.ts</div>
                 <div class="text-purple-400">const</div> queryVector = <div class="text-purple-400">await</div> clip.embedText(<span class="text-green-400">"revenue growth graph"</span>); <br/>
                 <div class="text-gray-500">// Returns the image because vectors are close!</div>
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-orange-600 dark:text-orange-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-orange-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Cost vs Value</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Multimodal embeddings are large (high dimensionality) and expensive to index. 
                    <br/><br/>
                    <strong>Pro Tip:</strong> Don't embed every frame of a video. Use keyframe extraction (every 5s) to capture the semantic meaning without blowing up your vector storage bill.
                </p>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-6">ColBERT & Late Interaction</h3>
                <p class="text-gray-700 dark:text-gray-300">
                    If standard cosine similarity isn't precise enough, look into <strong>ColBERT</strong> (Late Interaction). It keeps all token vectors rather than compressing them into one, allowing for much finer-grained matching at the cost of higher storage and compute.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';

// 👁️ Multimodal Search Visualizer

export default function MultimodalDemo() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Mock Database of "Vectors"
    const database = [
        { id: 1, type: 'image', content: 'cat_photo.jpg', vector: [0.9, 0.1], label: 'Photo of a sleeping Tabby cat' },
        { id: 2, type: 'image', content: 'dog_photo.jpg', vector: [0.1, 0.9], label: 'Golden Retriever running in park' },
        { id: 3, type: 'text', content: 'cat_care_guide.txt', vector: [0.85, 0.15], label: 'Guide: How to feed cats' },
        { id: 4, type: 'image', content: 'chart_sales.png', vector: [-0.5, -0.5], label: 'Q3 Revenue Bar Chart' },
    ];

    const performSearch = (text) => {
        setQuery(text);
        if (!text) {
            setResults([]);
            return;
        }
        
        setIsSearching(true);
        setTimeout(() => {
            // Simulated Vector Similarity (Basic Keyword match for demo, but pretend it's Math)
            const terms = text.toLowerCase().split(' ');
            const matched = database.map(item => {
                let score = 0;
                if (item.label.toLowerCase().includes(terms[0])) score += 0.9; // Strong match
                // Add noise
                score += Math.random() * 0.1;
                return { ...item, score };
            }).sort((a, b) => b.score - a.score).filter(i => i.score > 0.3);

            setResults(matched);
            setIsSearching(false);
        }, 800);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl h-[600px] flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-orange-500">👁️</span> Vector Search
                </h3>
            </div>

            {/* Input */}
            <div className="relative mb-8 z-20">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔍</span>
                </div>
                <input 
                    type="text"
                    placeholder="Search for 'chart', 'dog', or 'cat'..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-orange-500 outline-none shadow-lg text-lg"
                    value={query}
                    onChange={(e) => performSearch(e.target.value)}
                />
            </div>

            {/* Visualization Space */}
            <div className="flex-1 bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-slate-800 p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-xs font-mono text-gray-400 z-10">
                    2D Projecton of Latent Space
                </div>
                
                {/* The "Space" */}
                <div className="w-full h-full relative flex items-center justify-center">
                    
                    {/* Grid Lines */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    {/* Database Items (Distributed in Space) */}
                    {database.map((item) => {
                        // Hardcoded positions for visual demo
                        const positions = {
                            1: { top: '30%', left: '70%' }, // Cat
                            2: { top: '30%', left: '30%' }, // Dog
                            3: { top: '40%', left: '75%' }, // Cat Text (Close to cat img)
                            4: { top: '80%', left: '50%' }, // Chart
                        };
                        const pos = positions[item.id];
                        const isMatch = results.find(r => r.id === item.id);

                        return (
                            <div 
                                key={item.id}
                                className={\`absolute p-3 rounded-xl border-2 transition-all duration-500 flex flex-col items-center gap-2 cursor-pointer \${
                                    isMatch 
                                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 scale-110 z-20 shadow-xl shadow-orange-500/20' 
                                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 scale-100 opacity-60 hover:opacity-100 grayscale hover:grayscale-0'
                                }\`}
                                style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                            >
                                <div className={\`w-12 h-12 rounded-lg flex items-center justify-center \${isMatch ? 'bg-orange-100 dark:bg-orange-800' : 'bg-gray-200 dark:bg-slate-800'}\`}>
                                    {item.type === 'image' ? <span className="text-2xl">🖼️</span> : <span className="text-2xl">📄</span>}
                                </div>
                                <div className="text-[10px] font-bold max-w-[80px] text-center truncate px-1 rounded bg-white/50 dark:bg-black/50">
                                    {item.label}
                                </div>
                                {isMatch && (
                                    <div className="absolute -top-3 -right-3 bg-orange-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">
                                        {(item.score * 100).toFixed(0)}%
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Search Vector Center */}
                    {query && (
                         <div className="absolute top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-300">
                             <div className="w-24 h-24 border-4 border-dashed border-orange-500 rounded-full animate-spin-slow opacity-20 absolute"></div>
                             <div className="w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,1)] relative z-30"></div>
                             <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-[10px] px-2 py-1 rounded">Avg Query Vector</div>
                         </div>
                    )}

                </div>
            </div>
        </div>
    );
}
`
};

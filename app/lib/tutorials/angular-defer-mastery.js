export const angularDeferMastery = {
    title: "Mastering @defer: Angular's Instant Load Magic",
    description: "Lazy loading routes is old school. Learn how to lazy load *blocks of template* using the new @defer syntax. Prioritize critical UI and delay heavy components automatically.",
    slug: "angular-defer-mastery",
    category: "Angular",
    type: "static",
    author: "Angular GDE",
    createdAt: new Date().toISOString(),
    readTime: "12 min read",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop",
    tags: ["Angular", "Performance", "@defer", "Lazy Loading", "View Transitions"],
    keywords: ["Angular @defer", "Deferrable Views", "Lazy Loading Angular", "Angular Performance", "Hydration"],
    toc: [
        { id: "why-defer", label: "01. Granular Lazy Loading" },
        { id: "syntax", label: "02. The Syntax" },
        { id: "triggers", label: "03. Triggers (on viewport)" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Granular Lazy Loading -->
        <section id="why-defer" class="scroll-mt-32">
             <div class="border-l-8 border-red-600 bg-red-50 dark:bg-red-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Stop Lazy Loading Routes.
                </h1>
                <p class="text-xl md:text-2xl text-red-800 dark:text-red-200 font-light leading-relaxed">
                    Lazy loading entire pages (routes) is good, but it's not enough. 
                    <br/><br/>
                    With <strong>@defer</strong>, you can lazy load individual components <em>inside</em> a page. Does the user need to load the Heavy Chart bundle if they haven't scrolled down yet? No.
                </p>
             </div>
        </section>

        <!-- 02. Syntax -->
        <section id="syntax" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">02.</span>
                Declarative Loading
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Angular handles the code-splitting, chunk generation, and loading state management for you.
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// dashboard.component.html</div>
                 <div class="text-purple-400">@defer</div> (on viewport) {'{'} <br/>
                 &nbsp;&nbsp;&lt;heavy-chart /&gt; <br/>
                 {'}'} <div class="text-purple-400">@placeholder</div> {'{'} <br/>
                 &nbsp;&nbsp;&lt;div&gt;Loading Chart...&lt;/div&gt; <br/>
                 {'}'} <div class="text-purple-400">@loading</div> (minimum 500ms) {'{'} <br/>
                 &nbsp;&nbsp;&lt;spinner /&gt; <br/>
                 {'}'} <div class="text-purple-400">@error</div> {'{'} <br/>
                 &nbsp;&nbsp;&lt;error-msg /&gt; <br/>
                 {'}'}
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-red-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">LCP Optimization</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    <strong>Pro Tip:</strong> Wrap everything below the fold in <code>@defer (on viewport)</code>. 
                    This dramatically reduces the Initial Bundle Size and improves LCP (Largest Contentful Paint) because the browser prioritizes critical CSS/JS for the header.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState, useEffect, useRef } from 'react';
import { Download, Eye, Layout, Loader2, MousePointerClick } from 'lucide-react';

// 🚀 @defer Visualizer

export default function DeferDemo() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [loadState, setLoadState] = useState('placeholder'); // placeholder, loading, loaded
    const containerRef = useRef(null);

    // Simulate "on viewport" trigger
    const handleScroll = (e) => {
        if (containerRef.current) {
            const top = containerRef.current.getBoundingClientRect().top;
            if (top < 400 && loadState === 'placeholder' && !isHovered) { // Trigger
                startLoading();
            }
        }
    };

    // Simulate "on hover" trigger
    const handleMouseEnter = () => {
        if (loadState === 'placeholder') {
            setIsHovered(true);
            startLoading();
        }
    };

    const startLoading = () => {
        setLoadState('loading');
        setTimeout(() => {
            setLoadState('loaded');
        }, 1500); // Simulate network fetch of chunk
    };

    // In a real app we'd attach scroll listener to window, here we rely on manual interaction for demo or mock
    
    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-red-500">🚀</span> @defer Simulator
                </h3>
                <div className="text-sm bg-gray-200 dark:bg-slate-800 px-3 py-1 rounded">
                     State: <span className="font-bold">{loadState.toUpperCase()}</span>
                </div>
            </div>

            <div className="h-[300px] overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-black relative p-8 shadow-inner" onScroll={handleScroll}>
                
                <div className="space-y-6">
                    {/* Hero Content (Already Loaded) */}
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl animate-in fade-in">
                        <h1 className="text-2xl font-bold mb-2">Hero Section</h1>
                        <p className="text-gray-500">This content is critical. It loads immediately with the main bundle.</p>
                    </div>

                    <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center h-32 text-gray-400">
                        Content...
                    </div>
                    
                    {/* The DEFER Block */}
                    <div 
                        ref={containerRef}
                        onMouseEnter={handleMouseEnter}
                        className="border-4 border-red-500/20 p-2 rounded-2xl relative"
                    >
                         <div className="absolute -top-3 left-4 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-2 py-0.5 rounded text-[10px] font-bold border border-red-200 dark:border-red-800">
                             @defer (on viewport; on hover)
                         </div>

                        {loadState === 'placeholder' && (
                            <div className="h-48 bg-gray-100 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200 transition">
                                <Layout size={40} className="mb-4 opacity-50" />
                                <div className="font-bold text-sm">Heavy Chart Placeholder</div>
                                <div className="text-xs mt-2">Scroll or Hover to Load</div>
                                <MousePointerClick className="mt-4 animate-bounce opacity-50" />
                            </div>
                        )}

                        {loadState === 'loading' && (
                            <div className="h-48 bg-red-50 dark:bg-red-900/10 rounded-xl flex flex-col items-center justify-center text-red-500 animate-pulse">
                                <Loader2 size={40} className="animate-spin mb-4" />
                                <div className="font-bold text-sm">Downloading Chunk...</div>
                            </div>
                        )}

                        {loadState === 'loaded' && (
                            <div className="h-48 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex flex-col items-center justify-center text-white shadow-lg animate-in zoom-in">
                                <Download size={40} className="mb-4" />
                                <div className="font-bold text-lg">Heavy Component Loaded!</div>
                                <div className="text-xs opacity-80">This JS was fetched lazily.</div>
                            </div>
                        )}

                    </div>

                    <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center h-32 text-gray-400">
                        Footer Content...
                    </div>
                </div>

            </div>

             <div className="mt-6 text-center text-gray-400 text-xs">
                 Try hovering the placeholder box inside the scroll area!
             </div>
        </div>
    );
}
`
};

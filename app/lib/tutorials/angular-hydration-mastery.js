export const angularHydrationMastery = {
    title: "Angular Hydration: Achieving 100/100 Lighthouse Scores",
    description: "Angular was known for being 'heavy'. In 2026, it's a speed demon. Learn about Partial Hydration, Event Replay, and how to make your apps interactive instantly.",
    slug: "angular-hydration-mastery",
    category: "Angular",
    type: "static",
    author: "Performance Expert",
    createdAt: new Date().toISOString(),
    readTime: "25 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2669&auto=format&fit=crop",
    tags: ["Angular", "Hydration", "Performance", "SSR", "Signals"],
    keywords: ["Partial Hydration", "Event Replay", "Angular SSR", "Core Web Vitals", "INP"],
    toc: [
        { id: "hydration-explained", label: "01. What is Hydration?" },
        { id: "partial-hydration", label: "02. Partial Hydration" },
        { id: "event-replay", label: "03. Event Replay" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Hydration Explained -->
        <section id="hydration-explained" class="scroll-mt-32">
             <div class="border-l-8 border-red-600 bg-red-50 dark:bg-red-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Don't Rebuild. <span class="text-red-600 dark:text-red-400">Resume.</span>
                </h1>
                <p class="text-xl md:text-2xl text-red-800 dark:text-red-200 font-light leading-relaxed">
                    Prior to Angular 17, "Hydration" meant destroying the server-rendered HTML and rebuilding the entire DOM from scratch. It was flickering and slow.
                    <br/><br/>
                    Modern Angular <strong>Non-Destructive Hydration</strong> reuses existing DOM nodes and attaches event listeners surgically.
                </p>
                <div class="bg-red-900/10 border-l-4 border-red-500 p-6 mt-6">
                     <h4 class="font-bold text-red-800 dark:text-red-200 mb-2">Deep Dive: Progressive vs Partial</h4>
                     <p class="text-gray-700 dark:text-gray-300 text-sm">
                         <strong>Progressive Hydration:</strong> Hydrating the page chunk-by-chunk over time (usually priority-based). All JS eventually runs.
                         <br/>
                         <strong>Partial Hydration (\`@defer\`):</strong> Non-interactive parts (like this text block) <em>never</em> hydrate. Their JS code is never downloaded. The HTML stays static forever.
                     </p>
                </div>
             </div>
        </section>


        <!-- 02. Partial Hydration -->
        <section id="partial-hydration" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">02.</span>
                Partial Hydration (@defer)
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert mb-8">
                <p>
                    Why load the JavaScript for a footer that is off-screen? 
                    With <code>@defer</code> blocks, Angular allows you to hydrate only the critical parts of the application first, and lazy-load/hydrate the rest on interaction or visibility.
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm">
                 <div class="mb-4 text-gray-400">// main.component.html</div>
                 <div class="pl-4">
                     <span class="text-pink-500">@defer</span> (<span class="text-blue-400">on viewport</span>) {'{'} <br/>
                     &nbsp;&nbsp;&lt;heavy-chart-component /&gt; <br/>
                     {'}'} <span class="text-pink-500">@placeholder</span> {'{'} <br/>
                     &nbsp;&nbsp;&lt;div&gt;Loading...&lt;/div&gt; <br/>
                     {'}'}
                 </div>
            </div>
        </section>

        <!-- 03. Event Replay -->
        <section id="event-replay" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">03.</span>
                Event Replay
            </h2>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-xl border border-yellow-200">
                    <h4 class="font-bold text-yellow-700 dark:text-yellow-400 mb-2">The Uncanny Valley</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Between the time HTML loads and JS executes, users often click buttons. In old frameworks, these clicks were lost.
                    </p>
                </div>
                 <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200">
                    <h4 class="font-bold text-green-700 dark:text-green-400 mb-2">Angular's Solution</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Angular captures these events using a tiny inline script and <strong>replays</strong> them once the application hydrates. Zero lost interactions.
                    </p>
                </div>
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-red-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Lighthouse isn't everything.</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    While hydration improves metrics like LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift), the real winner is <strong>INP (Interaction to Next Paint)</strong>.
                    <br/><br/>
                    By keeping the main thread free from heavy DOM reconstruction, Angular ensures your app feels responsive even on low-end mobile devices.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';

// 💧 Hydration Simulator

export default function HydrationDemo() {
    // Stages: 'html' -> 'js-loading' -> 'hydrated'
    const [stage, setStage] = useState('html'); 
    const [clicks, setClicks] = useState(0);
    const [capturedClicks, setCapturedClicks] = useState(0);

    useEffect(() => {
        let timer1, timer2;
        if (stage === 'html') {
            // Simulate 2s delay for JS bundle
            timer1 = setTimeout(() => {
                setStage('js-loading');
                timer2 = setTimeout(() => {
                    setStage('hydrated');
                }, 1500); // 1.5s Execution time/Hydration
            }, 2000);
        }
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, [stage]);

    useEffect(() => {
        if (stage === 'hydrated' && capturedClicks > 0) {
            // Replay events!
            const interval = setInterval(() => {
                setCapturedClicks(prev => {
                    if (prev <= 0) {
                        clearInterval(interval);
                        return 0;
                    }
                    setClicks(c => c + 1);
                    return prev - 1;
                });
            }, 200);
            return () => clearInterval(interval);
        }
    }, [stage, capturedClicks]);

    const handleUserClick = () => {
        if (stage === 'hydrated') {
            setClicks(c => c + 1);
        } else {
            // Capture event in replay buffer
            setCapturedClicks(c => c + 1);
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-blue-500 text-3xl">💧</span> Partial Hydration
                </h3>
                <button 
                    onClick={() => { setStage('html'); setClicks(0); setCapturedClicks(0); }}
                    className="text-xs bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-lg hover:bg-slate-300 transition"
                >
                    Restart Simulation
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Visualizer */}
                <div className="relative mx-auto w-full max-w-[300px] aspect-[9/19] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden flex flex-col">
                    {/* Phone Screen */}
                    <div className="bg-white dark:bg-slate-950 flex-1 relative flex flex-col">
                        
                        {/* Status Bar */}
                        <div className="h-6 bg-black text-white text-[10px] flex justify-between px-4 items-center">
                            <span>9:41</span>
                            <div className="flex gap-1">
                                <span>📶</span>
                                <div className="w-4 h-2 bg-white rounded-sm"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4 flex flex-col items-center justify-center space-y-4">
                            
                            <div className={\`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 \${stage === 'hydrated' ? 'bg-green-500 scale-110' : 'bg-gray-200 grayscale'}\`}>
                                <span className="text-4xl text-white">⚡</span>
                            </div>

                            <h2 className="font-bold text-xl text-center text-gray-800 dark:text-white">
                                {stage === 'hydrated' ? 'Interactive!' : 'Loading...'}
                            </h2>
                            
                            <button
                                onClick={handleUserClick}
                                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold active:scale-95 transition-transform shadow-lg relative overflow-hidden"
                            >
                                Buy Now ({clicks})
                                {stage !== 'hydrated' && (
                                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                )}
                            </button>
                            
                        </div>

                        {/* Debug Overlay */}
                        <div className="absolute bottom-0 w-full bg-black/80 text-white p-3 text-xs font-mono space-y-1 backdrop-blur-md">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Stage:</span>
                                <span className={stage === 'hydrated' ? 'text-green-400' : 'text-yellow-400'}>{stage.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">JS Bundle:</span>
                                <span>{stage === 'html' ? 'Pending' : 'Loaded'}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-gray-400">Replay Buffer:</span>
                                <span className="text-orange-400">{capturedClicks} events</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Explanation */}
                <div className="space-y-6 flex flex-col justify-center">
                     <div className={\`p-6 rounded-2xl border transition-all duration-500 \${stage === 'html' ? 'bg-blue-50 border-blue-200 scale-105 shadow-md' : 'bg-white opacity-50'}\`}>
                         <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                             1. Server HTML
                         </h4>
                         <p className="text-sm text-gray-600">The browser renders the layout instantly (LCP). The button looks clickable, but JS hasn't downloaded yet.</p>
                     </div>
                     
                     <div className={\`p-6 rounded-2xl border transition-all duration-500 \${stage === 'js-loading' ? 'bg-orange-50 border-orange-200 scale-105 shadow-md' : 'bg-white opacity-50'}\`}>
                         <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                             2. Event Replay
                         </h4>
                         <p className="text-sm text-gray-600">User clicks "Buy Now". Angular captures the event in a tiny 1kb inline script instead of ignoring it.</p>
                     </div>

                     <div className={\`p-6 rounded-2xl border transition-all duration-500 \${stage === 'hydrated' ? 'bg-green-50 border-green-200 scale-105 shadow-md' : 'bg-white opacity-50'}\`}>
                         <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                             3. Hydration Complete
                         </h4>
                         <p className="text-sm text-gray-600">JS executes. Angular attaches listeners and "replays" the buffered user clicks so the state updates correctly.</p>
                     </div>
                </div>

            </div>
        </div>
    );
}
`
};

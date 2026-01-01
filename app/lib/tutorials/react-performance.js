export const reactPerformance = {
    title: "React Performance: The 60 FPS Manifesto (2026) 🏎️",
    description: "Your users judge you by your latency. Master the Fiber Architecture, Concurrency, and Frame Budgeting. Stop guessing with \`useMemo\` and start measuring with the Profiler.",
    slug: "react-performance",
    type: "static",
    author: "React Core Team Observer",
    createdAt: new Date().toISOString(),
    readTime: "40 min read",
    difficulty: "Advanced",
    tags: ["React", "Performance", "Optimization", "Virtualization", "Concurrent Mode"],
    keywords: ["React Fiber Architecture", "React Reconciliation", "React.memo Correct Usage", "useTransition vs useDeferredValue", "Interaction to Next Paint (INP)"],
    toc: [
        { id: "the-cost-of-slow", label: "01. The Cost of Slow (INP)" },
        { id: "fiber-architecture", label: "02. Fiber Architecture Deep Dive" },
        { id: "commit-vs-render", label: "03. Render vs Commit Phases" },
        { id: "virtualization", label: "04. Virtualization (Windowing)" },
        { id: "memoization-strategy", label: "05. Memoization Strategy" },
        { id: "concurrency", label: "06. Concurrent Features" },
        { id: "senior-takeaways", label: "07. Senior Takeaways" },
        { id: "interactive-demo", label: "08. Render Lab" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. The Cost of Slow -->
        <section id="the-cost-of-slow" class="scroll-mt-32">
             <div class="border-l-8 border-red-600 bg-red-50 dark:bg-red-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h2 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "Every 100ms of latency costs 1% in sales."
                </h2>
                <p class="text-xl md:text-2xl text-red-800 dark:text-red-200 font-light leading-relaxed mb-6">
                    Google's new metric, <strong>Interaction to Next Paint (INP)</strong>, punishes apps that freeze on click. 
                    If your event handler takes >200ms, you fail. Period.
                </p>
             </div>
        </section>

        <!-- 02. Fiber Architecture -->
        <section id="fiber-architecture" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">02.</span>
                Fiber Architecture Deep Dive
            </h2>
             <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                 To optimize React, you must understand <strong>Fiber</strong>. 
                 Fiber is a reimplementation of the stack, specialized for React components. 
                 It allows React to pause work (rendering) and come back to it later.
             </p>
             <div class="bg-slate-100 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                 <h3 class="font-bold text-xl mb-4">The "Work Loop"</h3>
                 <ul class="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                     <li><strong>Stack Reconciler (React 15):</strong> Recursive. Once it starts rendering, it <em>cannot stop</em> until the bottom of the tree. (Blocks main thread).</li>
                     <li><strong>Fiber Reconciler (React 16+):</strong> Iterative. It breaks rendering into "Units of Work". It checks the frame budget (5ms) after every unit. If time is up, it yields to the browser.</li>
                 </ul>
             </div>
             <div class="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border border-blue-200 dark:border-blue-900/20 mt-8">
                 <h3 class="font-bold text-xl mb-4 text-blue-900 dark:text-blue-100">Deep Dive: The React Compiler (React 19)</h3>
                 <p class="text-gray-700 dark:text-gray-300">
                     Forget manual memoization. The new <strong>React Compiler</strong> automatically memoizes components and hooks for you. It understands your code at a low level and inserts \`useMemo\` where appropriate, ensuring fine-grained updates without the headache.
                 </p>
             </div>
        </section>

        <!-- 03. Render vs Commit -->
        <section id="commit-vs-render" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-purple-600 dark:text-purple-500">03.</span>
                Render vs. Commit Phases
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <div class="p-6 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-200 dark:border-purple-900/20">
                     <h3 class="font-bold text-purple-700 dark:text-purple-400 mb-2">Phase 1: Render (Slow)</h3>
                     <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                         React calls your component functions. It compares the old Virtual DOM with the new one.
                         <br/>
                         <strong>Key:</strong> This is pure JavaScript calculation. No DOM touches. May happen multiple times.
                     </p>
                 </div>
                 <div class="p-6 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-900/20">
                     <h3 class="font-bold text-green-700 dark:text-green-400 mb-2">Phase 2: Commit (Fast)</h3>
                     <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                         React applies the changes to the real DOM (insert, update, delete).
                         <br/>
                         <strong>Key:</strong> This must happen in one go to prevent visual glitches.
                     </p>
                 </div>
            </div>
             <p class="text-lg font-bold text-gray-700 dark:text-gray-300">
                 Optimization Strategy: Prevent the "Render Phase" from running unnecessarily.
             </p>
        </section>

        <!-- 04. Virtualization -->
        <section id="virtualization" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-green-600 dark:text-green-500">04.</span>
                Virtualization (Windowing)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                If you render 10,000 items, you create 10,000 DOM nodes. The browser's Layout/Paint steps will choke.
                <strong>Virtualization</strong> renders only what is visible + a small buffer.
            </p>
            <div class="prose prose-lg text-gray-700 dark:text-gray-300">
                <blockquote>
                    "Never render a list without virtualization if it can grow > 100 items."
                </blockquote>
            </div>
        </section>

        <!-- 05. Memoization Strategy -->
        <section id="memoization-strategy" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-orange-600 dark:text-orange-500">05.</span>
                Memoization Strategy
            </h2>
             <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                 Using \`React.memo\` everywhere is an anti-pattern (it adds comparison overhead). 
                 Use it only on heavy components or huge lists.
            </p>
            
            <div class="bg-gray-900 rounded-xl p-6 overflow-hidden border border-gray-800 shadow-xl">
                 <pre class="text-sm font-mono text-gray-300">
<span class="text-gray-500">// ❌ BAD: Wrapper recreated every render</span>
&lt;HeavyComponent onClick={() => console.log('click')} /&gt;

<span class="text-gray-500">// ✅ GOOD: Stable reference</span>
const handleClick = useCallback(() => console.log('click'), []);
&lt;HeavyComponent onClick={handleClick} /&gt;</pre>
            </div>
        </section>

        <!-- 06. Concurrency -->
        <section id="concurrency" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">06.</span>
                Concurrent Features
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Sometimes you <em>must</em> do heavy work. In React 18, you can mark updates as "Transition" (Low Priority).
                This tells React: "If the user types, interrupt this heavy rendering task to update the input immediately."
            </p>
            <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 text-sm font-mono text-gray-800 dark:text-gray-200">
const [isPending, startTransition] = useTransition();

// Typing feels instant (High Priority)
setInputValue(e.target.value); 

startTransition(() => {
  // Chart re-render happens in background (Low Priority)
  setChartData(heavyCalculation(e.target.value)); 
});</pre>
        </section>

         <!-- 07. Senior Takeaways -->
        <section id="senior-takeaways" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-indigo-600 dark:text-indigo-500">07.</span>
                Senior Takeaways
            </h2>
            <div class="bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
                <ul class="space-y-4 text-gray-700 dark:text-gray-300">
                    <li><strong>1. Measure First:</strong> Never optimize without the React Profiler. You are probably optimizing the wrong thing.</li>
                    <li><strong>2. State Colocation:</strong> Move state down. If only the \`Button\` needs the state, don't put it in \`App\`. This prevents re-rendering the whole tree.</li>
                    <li><strong>3. Context Splitting:</strong> Don't put everything in one \`AppContext\`. Split it into \`UserContext\`, \`ThemeContext\`, etc., so consumers don't re-render unnecessarily.</li>
                </ul>
            </div>
        </section>

        <!-- 08. Simulator -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">08.</span>
                FPS Render Lab
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Simulate a heavy workload (blocking the main thread) and see how Virtualization and Concurrency fix the frame rate.
            </p>
        </section>
    </div>
    `,
    code: `import React, { useState, useEffect, useMemo, useTransition, useRef } from 'react';

// ==========================================
// 🏎️ REACT PERFORMANCE LAB
// ==========================================

// --- Helper: Simulate Heavy Work (Main Thread blocking) ---
const slowMath = (ms) => {
    const start = performance.now();
    while (performance.now() - start < ms) {
        // Blocks thread
    }
};

const HeavyItem = React.memo(({ index, highlight, isVirtualized }) => {
    // Artificial lag per item
    if (!isVirtualized) slowMath(0.5); // 0.5ms per item = 500ms for 1000 items

    return (
         <div className={\`p-3 border-b border-gray-100 dark:border-white/5 flex justify-between items-center h-[50px] \${highlight ? 'bg-yellow-100 dark:bg-yellow-900/20' : 'bg-white dark:bg-[#111]'}\`}>
             <span className="font-mono text-xs text-gray-400">ITEM #{index}</span>
             <div className="flex gap-2">
                 <div className="w-16 h-2 bg-gray-200 dark:bg-white/10 rounded"></div>
                 <div className="w-8 h-2 bg-gray-200 dark:bg-white/10 rounded"></div>
             </div>
         </div>
    );
});

export default function PerformanceLab() {
  const [useVirtualization, setUseVirtualization] = useState(false);
  const [useConcurrency, setUseConcurrency] = useState(false);
  const [itemCount, setItemCount] = useState(1000);
  const [inputValue, setInputValue] = useState(""); // High priority
  const [filterQuery, setFilterQuery] = useState(""); // Low priority (transition)
  const [isPending, startTransition] = useTransition();
  const [fps, setFps] = useState(60);
  
  // FPS Meter simulation
  useEffect(() => {
      let frameCount = 0;
      let startTime = performance.now();
      let animId;
      
      const loop = () => {
          frameCount++;
          const now = performance.now();
          if (now - startTime >= 1000) {
              setFps(Math.min(60, frameCount));
              frameCount = 0;
              startTime = now;
          }
          animId = requestAnimationFrame(loop);
      }
      animId = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(animId);
  }, [filterQuery]); // Dependency ensures we catch drops during render

  // Data Generation (Memoized)
  const items = useMemo(() => Array.from({ length: itemCount }, (_, i) => ({ id: i, text: \`Item \${i}\` })), [itemCount]);
  
  // Filter Logic (Heavy)
  const visibleItems = useMemo(() => {
      // If NOT utilizing concurrency (normal react), this blocks input
      return items.filter(item => {
           // Artificial slowdown for filter
           if(!useConcurrency) slowMath(0.1); 
           return item.text.includes(filterQuery)
      });
  }, [items, filterQuery, useConcurrency]);

  // Input Handler
  const handleChange = (e) => {
      const val = e.target.value;
      setInputValue(val); // Always update input immediately
      
      if (useConcurrency) {
          startTransition(() => {
              setFilterQuery(val);
          });
      } else {
          setFilterQuery(val); // Blocks immediately in standard mode
      }
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0f1115] p-6 lg:p-10 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl font-sans min-h-[850px] flex flex-col">
       
        {/* Header HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* FPS Meter */}
            <div className="bg-white dark:bg-[#1a1c20] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex items-center justify-between">
                <div>
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Frame Rate</div>
                     <div className={\`text-4xl font-black \${fps < 30 ? 'text-red-500' : fps < 55 ? 'text-yellow-500' : 'text-green-500'}\`}>
                         {fps} <span className="text-sm font-medium text-slate-500">FPS</span>
                     </div>
                </div>
                <span>⚡</span>
            </div>

            {/* Main Thread Status */}
            <div className="bg-white dark:bg-[#1a1c20] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex items-center justify-between">
                <div>
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Main Thread</div>
                     <div className={\`text-xl font-bold \${fps < 30 ? 'text-red-500' : 'text-green-500'}\`}>
                         {fps < 30 ? 'BLOCKED 🛑' : 'IDLE ✅'}
                     </div>
                </div>
                <span className={fps < 30 ? "text-red-500 animate-pulse text-4xl" : "text-slate-200 dark:text-slate-700 text-4xl"}>🖥️</span>
            </div>

             {/* Node Count */}
             <div className="bg-white dark:bg-[#1a1c20] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex items-center justify-between">
                <div>
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">DOM Nodes</div>
                     <div className="text-xl font-bold text-slate-700 dark:text-slate-200">
                         {useVirtualization ? '~20 (Virtualized)' : \`\${visibleItems.length} (Raw)\`}
                     </div>
                </div>
                <span className="text-4xl">📚</span>
            </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
            
            {/* CONTROLS */}
            <div className="space-y-6">
                
                {/* Mode Toggles */}
                 <div className="bg-white dark:bg-[#1a1c20] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Optimizations</h4>
                     <div className="space-y-4">
                         <div className="flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                 <span className={useVirtualization ? "text-green-500" : "text-gray-400"}>⚡</span>
                                 <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Virtualization</span>
                             </div>
                             <button onClick={() => setUseVirtualization(!useVirtualization)} className={\`w-12 h-6 rounded-full transition-colors relative \${useVirtualization ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}\`}>
                                 <div className={\`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform \${useVirtualization ? 'translate-x-6' : ''}\`}></div>
                             </button>
                         </div>
                         <div className="flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                 <span className={useConcurrency ? "text-blue-500" : "text-gray-400"}>📊</span>
                                 <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Concurrent Mode</span>
                                 {useConcurrency && <span className="text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 px-1 rounded font-bold">REACT 18</span>}
                             </div>
                             <button onClick={() => setUseConcurrency(!useConcurrency)} className={\`w-12 h-6 rounded-full transition-colors relative \${useConcurrency ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}\`}>
                                 <div className={\`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform \${useConcurrency ? 'translate-x-6' : ''}\`}></div>
                             </button>
                         </div>
                     </div>
                 </div>

                 {/* Input Stress Test */}
                <div className="bg-white dark:bg-[#1a1c20] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Input Stress Test</h4>
                     <p className="text-xs text-slate-500 mb-4">Typing forces a re-filter. Look for keystroke lag.</p>
                     
                     <input 
                        type="text" 
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Type quickly to test lag..."
                        className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-blue-500 transition-all font-mono"
                     />
                     <div className="mt-2 text-[10px] text-slate-400 flex justify-between">
                         <span>Status: {isPending ? <span className="text-yellow-500 font-bold">SUSPENDED (Concurrent)</span> : <span className="text-green-500 font-bold">SYNC</span>}</span>
                     </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-2xl border border-yellow-200 dark:border-yellow-900/20">
                     <div className="flex gap-2 items-start">
                         <span>⚠️</span>
                         <p className="text-xs text-yellow-800 dark:text-yellow-200 leading-relaxed">
                             <strong>Without Virtualization:</strong> Rendering 1000 items creates 1000 \`divs\`. This chokes frame rates. <br/>
                             <strong>Without Concurrency:</strong> Typing blocks the thread while filtering.
                         </p>
                     </div>
                </div>
            </div>

            {/* RENDER VIEWPORT */}
            <div className="lg:col-span-2 bg-white dark:bg-[#000] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative flex flex-col h-[500px] lg:h-auto">
                <div className="bg-gray-100 dark:bg-[#111] px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200 dark:border-white/5 flex justify-between">
                    <span>Render Output</span>
                    <span>{visibleItems.length} Results</span>
                </div>
                
                {/* THE LIST */}
                <div className="flex-1 overflow-y-auto relative">
                    {useVirtualization ? (
                       <VirtualList items={visibleItems} itemHeight={50} />
                    ) : (
                        <div className="flex flex-col">
                             {visibleItems.map((item, i) => (
                                 <HeavyItem key={item.id} index={i} highlight={false} isVirtualized={false} />
                             ))}
                        </div>
                    )}
                </div>

                {isPending && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow animate-pulse">
                        RENDERING IN BACKGROUND...
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

// ----------------------------------------------------
// 🐇 SIMPLE VIRTUAL LIST IMPLEMENTATION
// ----------------------------------------------------
const VirtualList = ({ items, itemHeight }) => {
    const [scrollTop, setScrollTop] = useState(0);
    const containerHeight = 600; 
    
    const totalHeight = items.length * itemHeight;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
        items.length - 1,
        Math.floor((scrollTop + containerHeight) / itemHeight)
    );
    
    // Create visible items
    const visibleItems = [];
    for (let i = startIndex; i <= endIndex; i++) {
        const item = items[i];
        if(!item) continue;
        visibleItems.push(
            <div 
                key={item.id}
                style={{
                    position: 'absolute',
                    top: i * itemHeight,
                    width: '100%',
                    height: itemHeight
                }}
            >
                <HeavyItem index={i} highlight={false} isVirtualized={true} />
            </div>
        );
    }

    return (
        <div 
            className="h-full overflow-y-auto relative"
            onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                {visibleItems}
            </div>
        </div>
    )
}
`};

export const reactPerformance = {
    title: "React Performance: The 60 FPS Manifesto 🏎️",
    description: "Your users judge you by your latency. This is the definitive guide to 60 FPS React apps. Master Fiber, Virtualization, and Concurrency. Stop guessing, start measuring.",
    slug: "react-performance-optimization",
    type: "static",
    author: "React Core Team",
    createdAt: new Date().toISOString(),
    readTime: "35 min read",
    difficulty: "Advanced",
    tags: ["React", "Performance", "Optimization", "Virtualization", "Concurrent Mode"],
    keywords: ["React Fiber", "Reconciliation", "React.memo", "useTransition", "INP Optimization", "Interaction to Next Paint", "Web Vitals"],
    toc: [
        { id: "the-cost-of-slow", label: "01. The Cost of Slow" },
        { id: "reconciliation-fiber", label: "02. Fiber & Reconciliation" },
        { id: "virtualization", label: "03. Virtualization (Windowing)" },
        { id: "memoization", label: "04. Memoization Mastery" },
        { id: "concurrency", label: "05. Concurrent Features" },
        { id: "virality", label: "06. Share & Takeaways" },
        { id: "interactive-demo", label: "07. Render Lab" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 1. The Hook -->
        <section id="the-cost-of-slow" class="scroll-mt-32">
             <div class="border-l-8 border-red-600 bg-red-50 dark:bg-red-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                <p class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "Amazon found that every 100ms of latency cost them 1% in sales. Your React app is leaking money."
                </p>
                <p class="text-xl md:text-md text-red-800 dark:text-red-200 font-light leading-relaxed">
                     Performance is not a "nice to have" feature. It is a bug. If your app drops frames when scrolling, or freezes when typing, your users <strong>hate</strong> using it.
                </p>
             </div>
             
             <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8">
                 <p>
                    React is fast by default, but it allows you to be slow. This guide is not about "micro-optimizations" like keeping functions out of render loops. It's about architectural decisions that define whether your app feels like a sluggish website or a native engine.
                 </p>
            </div>

            <div class="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-200 dark:border-yellow-900/30">
                <h4 class="font-bold text-lg mb-2 text-yellow-900 dark:text-yellow-200">Trending Metric: INP (Interaction to Next Paint)</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    Google has replaced FID with INP. It measures responsiveness. If you block the main thread for >200ms, you fail Core Web Vitals. React 18's Concurrency is the answer.
                </p>
            </div>
        </section>

        <!-- 2. Fiber -->
        <section id="reconciliation-fiber" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">02.</span>
                The Reconciliation Myth
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <p class="text-lg leading-relaxed">
                    Most developers think: <span class="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">setState</span> -> <span class="italic">Browser updates pixel</span>.
                    <br/>
                    <strong>WRONG.</strong>
                </p>
                <p class="text-lg leading-relaxed">
                    React separates <strong>Render Phase</strong> (Computing changes) from <strong>Commit Phase</strong> (Applying changes to DOM).
                    <br/><br/>
                    <strong>The Problem:</strong> Even if the DOM doesn't change, the "Render Code" (your function body) runs. 
                    If you have a list of 10,000 items, and you update one, React might run the function body for all 10,000 items just to check if they changed.
                    <br/>
                    That is O(n) complexity on every keystroke. That is death.
                </p>
            </div>
        </section>

        <!-- 3. Virtualization -->
        <section id="virtualization" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">03.</span>
                Virtualization: The Silver Bullet
            </h2>
            <p class="text-xl text-gray-700 dark:text-gray-300 mb-6 font-light">
                Rendering 10,000 DOM nodes is suicide for the browser (Composite Phase).
                <br/>
                <strong>Virtualization (Windowing)</strong> means only rendering the items currently visible in the viewport.
                <br/>
                Instead of 10,000 \`divs\`, you render 20. When you scroll, you recycle them.
            </p>
             <pre class="mockup-code bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm shadow-2xl"><code>// The most impactful 5 lines of code you will ever write
import { FixedSizeList } from 'react-window';

const Row = ({ index, style }) => (
  &lt;div style={style}&gt;Row {index}&lt;/div&gt;
);

const Example = () => (
  &lt;FixedSizeList
    height={500}
    width={500}
    itemSize={35}
    itemCount={1000000} // &lt;- A MILLION rows. 60 FPS.
  &gt;
    {Row}
  &lt;/FixedSizeList&gt;
);</code></pre>
        </section>

        <!-- 4. Memoization -->
        <section id="memoization" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">04.</span>
                Memoization Mastery (React.memo)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Don't wrap everything in \`memo\`. That adds overhead. Use it strategically.
                <br/>
                <strong>The Golden Rule:</strong> Only memoize components that render often with the *same props*.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                 <div class="bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl border border-red-200 dark:border-red-900/30">
                     <div class="text-sm font-bold text-red-600 uppercase mb-2">❌ New References Kill Memo</div>
                     <code class="text-base font-mono block mb-2 font-bold">&lt;BigList onItemClick={() => delete(id)} /&gt;</code>
                     <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
                        The arrow function is recreated every render. The props change. React.memo is useless here.
                     </p>
                 </div>
                 <div class="bg-green-50 dark:bg-green-900/10 p-8 rounded-2xl border border-green-200 dark:border-green-900/30">
                     <div class="text-sm font-bold text-green-600 uppercase mb-2">✅ useCallback Fixes References</div>
                     <code class="text-base font-mono block mb-2 font-bold">const handleDelete = useCallback(...)<br/>&lt;BigList onItemClick={handleDelete} /&gt;</code>
                     <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
                        Reference stays stable. React.memo works. No re-render.
                     </p>
                 </div>
             </div>
        </section>

        <!-- 5. Concurrency -->
        <section id="concurrency" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">05.</span>
                Concurrent Features (React 18)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Sometimes complex tasks take time. You can't optimize O(n) to O(1).
                But you can <strong>cheat</strong>.
                <br/><br/>
                <strong>Concurrency</strong> allows React to interrupt a slow render to handle a high-priority event (like typing).
                This keeps the UI responsive even if the CPU is churning.
            </p>
            <div class="bg-gray-900 p-8 rounded-2xl text-gray-300 border border-gray-700 shadow-xl">
<pre><code class="language-javascript">const [isPending, startTransition] = useTransition();

// "Hey React, this update is LOW priority. 
// If the user types, interrupt this and update the input first."
startTransition(() => {
  setSearchQuery(input);
});</code></pre>
            </div>
        </section>


        <!-- 6. Shares -->
        <section id="virality" class="scroll-mt-32 pt-12 border-t border-gray-200 dark:border-gray-800">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
                06. Share the Speed
            </h2>

             <!-- Did You Know -->
             <div class="bg-indigo-600 text-white p-8 rounded-2xl mb-12 shadow-xl transform hover:scale-[1.01] transition-transform">
                 <div class="flex items-start gap-4">
                     <span class="text-4xl">💡</span>
                     <div>
                         <h4 class="text-2xl font-bold mb-2 !text-white">Did You Know?</h4>
                         <p class="!text-white text-lg font-medium opacity-90">
                             React's \`key\` prop isn't just for lists. You can use it to force-reset any component's state by changing the key. \`<Component key={resetTrigger} />\`
                         </p>
                     </div>
                 </div>
             </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                     <h4 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Twitter / X Caption</h4>
                     <p class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 italic">
                        "Stop blaming React for your slow app. Learn Fiber. Learn Virtualization. Learn Concurrency. React is fast; your rendering logic is what's slowing you down. #ReactPerformance #WebDev"
                     </p>
                     <button class="text-blue-500 text-sm font-bold hover:underline">Copy Caption</button>
                </div>
                 <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                     <h4 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">LinkedIn Post</h4>
                     <p class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 italic">
                        "Just optimized our main dashboard render time by 300% using a single \`useMemo\`. Performance isn't magic, it's paying attention to referential equality. #SoftwareEngineering #ReactJS #Performance"
                     </p>
                     <button class="text-blue-500 text-sm font-bold hover:underline">Copy Caption</button>
                </div>
            </div>
             <div class="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-xl text-center">
                <h4 class="font-bold text-lg mb-2 text-red-900 dark:text-red-200">The Takeaway</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    If you can't optimize the algorithm, optimize the rendering. If you can't optimize the rendering, use Concurrency.
                </p>
                <div class="mt-4 flex flex-wrap gap-2 justify-center">
                     <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#ReactJS</span>
                     <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#Performance</span>
                     <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#Optimization</span>
                </div>
            </div>
             <button class="mt-8 w-full md:w-auto mx-auto block bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                 Subscribe for More Performance Tips
             </button>
        </section>

        <!-- Interactive Demo Section -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">07.</span>
                Render Performance Lab
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                This lab simulates a "Heavy Component" list. 
                Toggle the optimizations to see the drastic difference in FPS and render behavior.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <!-- Concept: Virtualization -->
                <div class="space-y-4">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span class="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded text-sm uppercase tracking-wide">Technique</span>
                        Virtualization
                    </h3>
                    <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Notice how the DOM node count stays flat (below ~20 nodes) in Virtualized mode, vs thousands in the unoptimized version. This keeps the browser main thread free.
                    </p>
                </div>

                 <!-- Concept: Memoization -->
                <div class="space-y-4">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                         <span class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded text-sm uppercase tracking-wide">Technique</span>
                         UseMemo / Memo
                    </h3>
                    <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Watch the "Renders" flash. With optimization on, list items don't re-render when you type in the input box because their props haven't changed.
                    </p>
                </div>
            </div>
        </section>

    </div>
    `,
    code: `import React, { useState, useEffect, useMemo, useCallback } from 'react';

// ----------------------------------------------------
// 🐢 UNOPTIMIZED COMPONENTS
// ----------------------------------------------------

const SlowItem = ({ index, text, highlight }) => {
  // Artificially slow render to simulate heavy component
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // block main thread for 1ms per item
  }

  return (
    <div className={\`p-3 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center \${highlight ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''}\`}>
        <span className="font-mono text-sm text-gray-500">#{index}</span>
        <span className="text-gray-800 dark:text-gray-200">{text}</span>
    </div>
  );
};

// ----------------------------------------------------
// 🐇 OPTIMIZED COMPONENTS
// ----------------------------------------------------

// 1. React.memo prevents re-renders if props haven't changed
const FastItem = React.memo(({ index, text, style, highlight }) => {
  return (
    <div style={style} className={\`p-3 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center h-[50px] \${highlight ? 'bg-blue-100 dark:bg-blue-900/30' : ''}\`}>
         <span className="font-mono text-sm text-gray-500">#{index}</span>
         <span className="text-gray-800 dark:text-gray-200">{text}</span>
    </div>
  );
});

// ----------------------------------------------------
// 🧪 PERFORMANCE LAB
// ----------------------------------------------------

export default function PerformanceLab() {
  const [useVirtualization, setUseVirtualization] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [itemCount, setItemCount] = useState(1000);
  const [darkMode, setDarkMode] = useState(false); // Just to force re-renders
  
  // Generating Data
  const items = useMemo(() => {
    return Array.from({ length: itemCount }, (_, i) => ({
      id: i,
      text: \`Item \${i} - Priority Level \${Math.floor(Math.random() * 5)}\`
    }));
  }, [itemCount]);

  // Filtering (Memoized calculation)
  const visibleItems = useMemo(() => {
      // Intentionally slow filter if not optimized?? No, let's keep logic fast, rendering slow.
      return items.filter(item => item.text.toLowerCase().includes(filterText.toLowerCase()));
  }, [items, filterText]);


  return (
    <div className="bg-white dark:bg-[#111] text-gray-900 dark:text-white font-sans border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[700px]">
      
      {/* HEADER & CONTROLS */}
      <div className="p-6 bg-gray-50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 flex flex-col gap-6">
          <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-2xl">🏎️</span> Render Lab
              </h2>
              <div className="flex items-center gap-2 text-xs font-mono bg-black/10 dark:bg-white/10 px-2 py-1 rounded">
                   {visibleItems.length} Items Loaded
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Controls */}
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                       <label className="text-sm font-medium">Virtualization</label>
                       <button 
                         onClick={() => setUseVirtualization(!useVirtualization)}
                         className={\`w-12 h-6 rounded-full p-1 transition-colors \${useVirtualization ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}\`}
                       >
                           <div className={\`w-4 h-4 rounded-full bg-white shadow-sm transition-transform \${useVirtualization ? 'translate-x-6' : 'translate-x-0'}\`}></div>
                       </button>
                  </div>
                  
                  <div className="space-y-1">
                      <label className="text-sm font-medium">Item Count</label>
                      <input 
                        type="range" 
                        min="100" 
                        max="5000" 
                        step="100"
                        value={itemCount}
                        onChange={(e) => setItemCount(Number(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                      <div className="flex justify-between text-[10px] text-gray-500">
                          <span>100</span>
                          <span>5000</span>
                      </div>
                  </div>
              </div>
              
              {/* Inputs */}
              <div className="space-y-4">
                   <div className="space-y-1">
                       <label className="text-sm font-medium">Filter List (Triggers Re-render)</label>
                       <input 
                         type="text" 
                         value={filterText}
                         onChange={(e) => setFilterText(e.target.value)}
                         placeholder="Type to filter..."
                         className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 ring-blue-500 outline-none"
                       />
                   </div>
                   
                   <button 
                     onClick={() => setDarkMode(!darkMode)}
                     className="text-xs text-blue-500 hover:underline"
                   >
                       Force Global Re-render included
                   </button>
              </div>
          </div>
      </div>

      {/* RENDER AREA */}
      <div className="flex-1 overflow-hidden relative">
          
          {useVirtualization ? (
              // 🐇 VIRTUALIZED RENDERING
              <VirtualList items={visibleItems} itemHeight={50} />
          ) : (
              // 🐢 STANDARD RENDERING (Slow)
              <div className="h-full overflow-y-auto p-4 content-start">
                  <div className="text-xs text-red-500 mb-2 font-bold uppercase tracking-wide sticky top-0 bg-white dark:bg-[#111] py-2 z-10 border-b border-red-100 dark:border-red-900/30">
                      Standard Rendering (Rendering {visibleItems.length} nodes)
                  </div>
                  {visibleItems.map((item, index) => (
                      <SlowItem 
                        key={item.id} 
                        index={index} 
                        text={item.text} 
                        highlight={item.text.toLowerCase().includes(filterText)} 
                      />
                  ))}
              </div>
          )}
          
          {/* Stats Overlay */}
          <div className="absolute bottom-4 right-4 bg-black/80 text-white backdrop-blur px-4 py-2 rounded-lg text-xs font-mono flex flex-col gap-1 pointer-events-none">
              <div>Mode: <span className={useVirtualization ? "text-green-400" : "text-red-400"}>{useVirtualization ? 'Virtualized' : 'Standard'}</span></div>
              <div>Est. DOM Nodes: <span className="font-bold">{useVirtualization ? '~20' : visibleItems.length}</span></div>
          </div>
      </div>
    </div>
  );
}

// Minimal Virtual List Implementation (for demo purposes)
// Usually you'd use react-window
const VirtualList = ({ items, itemHeight }) => {
    const [scrollTop, setScrollTop] = useState(0);
    const containerHeight = 450; // approximated form typical container
    
    const totalHeight = items.length * itemHeight;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
        items.length - 1,
        Math.floor((scrollTop + containerHeight) / itemHeight)
    );
    
    // Create visible items
    const visibleItems = [];
    for (let i = startIndex; i <= endIndex; i++) {
        visibleItems.push(
            <FastItem 
                key={items[i].id}
                index={i}
                text={items[i].text}
                style={{
                    position: 'absolute',
                    top: i * itemHeight,
                    width: '100%',
                    height: itemHeight
                }}
            />
        );
    }

    return (
        <div 
            className="h-full overflow-y-auto relative"
            onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        >
             <div className="text-xs text-green-500 mb-2 font-bold uppercase tracking-wide sticky top-0 bg-white/90 dark:bg-[#111]/90 py-2 z-20 px-4 border-b border-green-100 dark:border-green-900/30 backdrop-blur">
                  Virtualized Rendering (Window: #{startIndex} - #{endIndex})
             </div>
            <div style={{ height: totalHeight, position: 'relative' }}>
                {visibleItems}
            </div>
        </div>
    )
}
`
}

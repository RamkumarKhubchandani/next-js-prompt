export const masteringUseEffect = {
    slug: "mastering-useeffect",
    title: "React useEffect: The Definitive Guide for 2026 🧠",
    description: "Forget 'Lifecycles'. Thinking that way is why your app loops infinitely. Learn the Synchronization mental model, how to fix race conditions, AbortController patterns, and why you should almost never use useEffect in React 19.",
    thumbnail: "/images/tutorials/useeffect-thumb.png",
    tags: ["React", "Hooks", "Frontend", "Performance", "Deep Dive"],
    keywords: ["useEffect Guide", "React Synchronization", "Stale Closures React", "Race Conditions useEffect", "React 19 Hooks", "AbortController", "Custom Hooks"],
    difficulty: "Expert",
    readTime: "45 min read",
    author: "React Core Team Observer",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    toc: [
        { id: "cognitive-tax", label: "01. The Cognitive Tax" },
        { id: "sync-mental-model", label: "02. The Synchronization Model" },
        { id: "dependency-truth", label: "03. Dependency Integrity" },
        { id: "race-conditions", label: "04. Race Conditions & Abort" },
        { id: "fetched-then-render", label: "05. Fetch-Then-Render Anti-Pattern" },
        { id: "effects-vs-events", label: "06. Effects vs Events" },
        { id: "custom-hooks", label: "07. Custom Hooks Refactoring" },
        { id: "interactive-demo", label: "08. The Sync Visualizer" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
      
      <!-- 01. Cognitive Tax -->
      <section id="cognitive-tax" class="scroll-mt-32">
         <div class="border-l-8 border-purple-600 bg-purple-50 dark:bg-purple-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
            <h2 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                "useEffect is NOT a lifecycle hook."
            </h2>
            <p class="text-xl md:text-2xl text-purple-800 dark:text-purple-200 font-light leading-relaxed">
                If you think <code>useEffect(fn, [])</code> is <code>componentDidMount</code>, you've already lost.
                <br/><br/>
                This "Lifecycle Mental Model" (Mount, Update, Unmount) is a carryover from Class Components. It is actively harmful in Hooks. It causes stale closures, infinite loops, and data inconsistencies.
            </p>
         </div>
         
         <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300">
            <p>
                In Class Components, you wrote code based on <strong>Time</strong> ("Do this when it mounts").
                <br/>
                In Hooks, you write code based on <strong>State</strong> ("Do this when data changes").
            </p>
         </div>
      </section>

      <!-- 02. Sync Mental Model -->
      <section id="sync-mental-model" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-purple-600 dark:text-purple-500">02.</span>
            The Synchronization Mental Model
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div class="p-8 bg-slate-100 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 h-full">
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Old Thinking</h3>
                <p class="text-slate-600 dark:text-slate-400 text-lg mb-4 italic">
                    "I want to run this log only once."
                </p>
                <div class="inline-block px-3 py-1 bg-red-100 text-red-600 rounded font-bold text-xs uppercase">Imperative</div>
            </div>
            <div class="p-8 bg-purple-50 dark:bg-purple-900/10 rounded-3xl border border-purple-100 dark:border-purple-900/20 h-full">
                <h3 class="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">Correct Thinking</h3>
                <p class="text-purple-800 dark:text-purple-200 text-lg mb-4 italic">
                    "I want \`console.log\` to be synchronized with \`text\`. If \`text\` changes, log it."
                </p>
                <div class="inline-block px-3 py-1 bg-green-100 text-green-600 rounded font-bold text-xs uppercase">Declarative</div>
            </div>
        </div>

        <div class="bg-gray-900 rounded-xl p-8 shadow-2xl relative">
             <div class="font-mono text-gray-300 text-sm md:text-base space-y-4">
                <div class="flex items-center gap-4">
                    <span class="text-green-400 font-bold w-32 text-right">Render 1</span> 
                    <span>→ State is <span class="text-yellow-400">"{ id: 100 }"</span></span>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-blue-400 font-bold w-32 text-right">Effect 1</span> 
                    <span>→ Connect WebSocket to <span class="text-yellow-400">Room 100</span></span>
                </div>
                <div class="flex justify-center my-2 text-gray-600 text-xs">...User changes room...</div>
                <div class="flex items-center gap-4">
                    <span class="text-green-400 font-bold w-32 text-right">Render 2</span> 
                    <span>→ State is <span class="text-yellow-400">"{ id: 200 }"</span></span>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-red-400 font-bold w-32 text-right">Cleanup 1</span> 
                    <span>→ Disconnect WebSocket from <span class="text-yellow-400">Room 100</span></span>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-blue-400 font-bold w-32 text-right">Effect 2</span> 
                    <span>→ Connect WebSocket to <span class="text-yellow-400">Room 200</span></span>
                </div>
             </div>
        </div>
      </section>

      <!-- 03. Dependency Array -->
      <section id="dependency-truth" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-purple-600 dark:text-purple-500">03.</span>
            Dependency Integrity
        </h2>
        
        <div class="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <h4 class="font-bold text-yellow-900 dark:text-yellow-100">The Golden Rule</h4>
            <p class="text-yellow-800 dark:text-yellow-200 mt-2">
                "You do not choose your dependencies. Your code chooses them."
            </p>
        </div>

        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
            If a variable is defined inside the component and used inside the effect, it <strong>MUST</strong> be in the dependency array. No exceptions.
        </p>

        <div class="mockup-code bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto shadow-2xl">
<pre><code><span class="text-gray-500">// ❌ The "Lying" Pattern</span>
useEffect(() => {
  const next = count + step; <span class="text-red-400">// Uses 'count' and 'step'</span>
  console.log(next);
}, []); <span class="text-red-400">// ❌ BUG: 'next' will forever be initial value. Stale Closure.</span>

<span class="text-gray-500">// ✅ The Truthful Pattern</span>
useEffect(() => {
  const next = count + step;
  console.log(next);
}, [count, step]); <span class="text-green-400">// ✅ Re-runs whenever ingredients change.</span></code></pre>
        </div>
        
        <div class="mt-6 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
            <h4 class="font-bold mb-2">Deep Dive: Object Referential Equality</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                React compares dependencies using \`Object.is()\`. If you pass an object or array literal \`[]\` as a dependency, it is a *new* object every render. 
                This causes the Effect to run infinitely.
                <br/>
                <strong>Fix:</strong> Wrap objects in \`useMemo\` or primitives.
            </p>
        </div>
      </section>

      <!-- 04. Race Conditions -->
      <section id="race-conditions" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-purple-600 dark:text-purple-500">04.</span>
            Race Conditions & AbortController
        </h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Imagine a user clicks "User 1", then quickly "User 2". 
            The network request for User 1 might finish <em>after</em> User 2. 
            If you don't handle this, your UI will show "User 2" selected but "User 1" data. This is a Race Condition.
        </p>
        
        <div class="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto shadow-2xl">
<pre><code>useEffect(() => {
  let ignore = false;
  
  <span class="text-purple-400">async function</span> <span class="text-blue-400">fetchData</span>() {
      <span class="text-purple-400">const</span> res = <span class="text-purple-400">await</span> fetch(url);
      <span class="text-purple-400">const</span> data = <span class="text-purple-400">await</span> res.json();
      
      <span class="text-gray-500">// 🛡️ Safety Check</span>
      <span class="text-purple-400">if</span> (!ignore) {
        setData(data);
      }
  }

  fetchData();

  <span class="text-gray-500">// 🧹 Cleanup runs first when url changes</span>
  <span class="text-purple-400">return</span> () => { ignore = true; };
}, [url]);</code></pre>
        </div>
         <div class="mt-6">
            <h4 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">The AbortController Pattern (Professional)</h4>
             <p class="text-gray-700 dark:text-gray-300">
                 Using a boolean flag is okay, but \`AbortController\` actually cancels the network request, saving bandwidth.
             </p>
         </div>
         <div class="bg-purple-900/10 border-l-4 border-purple-500 p-6 mt-6">
                 <h4 class="font-bold text-purple-800 dark:text-purple-200 mb-2">Deep Dive: AbortSignal</h4>
                 <p class="text-gray-700 dark:text-gray-300 text-sm">
                     Modern <code>fetch()</code> accepts a <code>signal</code> option.
                     <br/><br/>
                     <code>const controller = new AbortController();</code><br/>
                     <code>fetch(url, { signal: controller.signal });</code>
                     <br/><br/>
                     In the useEffect cleanup function, calling <code>controller.abort()</code> automatically rejects the promise with an "AbortError", which you can catch and ignore.
                 </p>
         </div>
      </section>
      
      <!-- 05. Anti-Patterns -->
      <section id="fetched-then-render" class="scroll-mt-32">
           <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-purple-600 dark:text-purple-500">05.</span>
            The "Fetch-Then-Render" Anti-Pattern
        </h2>
        <div class="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-200 dark:border-red-900/30">
            <h3 class="text-red-700 dark:text-red-300 font-bold mb-4">⚠️ Don't fetch in useEffect for critical data</h3>
            <p class="text-gray-700 dark:text-gray-300">
                Fetching in \`useEffect\` causes a "Waterfall".
                <br/>
                1. Download JS Bundle -> 2. Render App -> 3. Execute Effect -> 4. Start Fetch.
                <br/><br/>
                <strong>Better:</strong> Use a library like <code>TanStack Query</code> or <code>SWR</code>.
                <br/>
                <strong>Best (In 2026):</strong> Use React Server Components (RSC) to fetch on the server.
            </p>
        </div>
      </section>

      <!-- 06. Effects vs Events -->
      <section id="effects-vs-events" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-purple-600 dark:text-purple-500">06.</span>
            Effects vs Events: The Decision Tree
        </h2>
         <div class="bg-gray-100 dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-slate-800">
             <h3 class="text-xl font-bold mb-6 text-gray-900 dark:text-white">Ask yourself: "Who triggered this?"</h3>
             
             <div class="space-y-6">
                 <div class="flex gap-4">
                     <div class="flex-none p-4 bg-green-100 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-300 font-bold w-32 text-center">User Action</div>
                     <div>
                         <h4 class="font-bold">Event Handler</h4>
                         <p class="text-sm text-gray-600 dark:text-gray-400">Did the user click, type, or submit? Put the logic in \`onClick\`, \`onSubmit\`. Do NOT use \`useEffect\`.</p>
                     </div>
                 </div>
                 
                 <div class="flex gap-4">
                     <div class="flex-none p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg text-purple-700 dark:text-purple-300 font-bold w-32 text-center">App State</div>
                     <div>
                         <h4 class="font-bold">useEffect</h4>
                         <p class="text-sm text-gray-600 dark:text-gray-400">Did the user just arrive at a page? Did a prop change that requires a 3rd party library to re-sync? Use \`useEffect\`.</p>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      <!-- 07. Custom Hooks -->
       <section id="custom-hooks" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-purple-600 dark:text-purple-500">07.</span>
            Refactoring to Custom Hooks
        </h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
            If you see a \`useEffect\` in your main component, smell code. 
            Abstracting effects into custom hooks makes your component declarative ("I want to sync window size") instead of implementation detail ("Add event listener...").
        </p>
        <pre class="bg-gray-900 text-gray-300 p-6 rounded-xl font-mono text-sm overflow-x-auto">
// ✅ useWindowListener.js
export function useWindowListener(eventType, listener) {
  useEffect(() => {
    window.addEventListener(eventType, listener);
    return () => window.removeEventListener(eventType, listener);
  }, [eventType, listener]);
}

// Component.js
function App() {
  // So clean! No useEffect visible.
  useWindowListener('resize', handleResize);
  return ...
}</pre>
      </section>

       <!-- 08. Demo -->
      <section id="interactive-demo" class="scroll-mt-32">
         <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-purple-600 dark:text-purple-500">08.</span>
            The Sync Visualizer
        </h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Below is a tool to visualize the <strong>Setup</strong> and <strong>Cleanup</strong> cycle of useEffect. 
            Change the connection speed to see how React cleans up the *previous* effect before setting up the *new* one.
        </p>
      </section>
      
    </div>
  `,
    code: `import React, { useState, useEffect, useRef } from "react";

// ==========================================
// ⏳ Synchronization Playground (Advanced)
// ==========================================

export default function EffectDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [serverId, setServerId] = useState(1);
  const [logs, setLogs] = useState([]);
  
  // Ref to track mount status for strict mode visualization
  const isMounted = useRef(false);

  const addLog = (msg, type) => {
      const timestamp = new Date().toLocaleTimeString().split(' ')[0];
      setLogs(prev => [{ id: Date.now() + Math.random(), msg, type, time: timestamp }, ...prev].slice(0, 7));
  };

  useEffect(() => {
    if (!isPlaying) {
         if (isMounted.current) addLog('Effect Skipped (isPlaying: false)', 'neutral');
         return;
    }

    // ----------------------------------------
    // 1. SETUP PHASE (Mount or Update)
    // ----------------------------------------
    const connectionId = Math.floor(Math.random() * 1000);
    addLog(\`🟢 SETUP: Connected to Server \${serverId} (ID: \${connectionId})\`, 'setup');

    const intervalId = setInterval(() => {
        addLog(\`💓 Ping Server \${serverId}...\`, 'tick');
    }, 2000);

    // ----------------------------------------
    // 2. CLEANUP PHASE (Unmount or Re-render)
    // ----------------------------------------
    return () => {
        addLog(\`🔴 CLEANUP: Disconnected Server \${serverId} (ID: \${connectionId})\`, 'cleanup');
        clearInterval(intervalId);
    };

  }, [isPlaying, serverId]); // 👈 Dependencies triggering sync

  useEffect(() => {
      isMounted.current = true;
      return () => { isMounted.current = false };
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-[#0f1115] p-6 lg:p-10 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl font-sans min-h-[700px] flex flex-col">
        
        <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                    <span className="text-purple-600">⚡</span> Sync Visualizer
                </h3>
                <p className="text-slate-500 mt-2 font-medium">Visualize the React Synchronization Cycle</p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg text-xs font-bold border border-yellow-200 dark:border-yellow-900/30">
                <span>⚠️</span>
                <span>Strict Mode: Effects run twice on mount!</span>
            </div>
        </header>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left: Controls */}
            <div className="space-y-6">
                
                {/* Connection Toggle */}
                <div className="bg-white dark:bg-[#1a1c20] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Master Switch</label>
                        <div className={\`px-2 py-1 rounded text-[10px] font-bold uppercase \${isPlaying ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}\`}>
                            {isPlaying ? 'Active' : 'Idle'}
                        </div>
                    </div>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={\`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg \${isPlaying ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' : 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20'}\`}
                    >
                        {isPlaying ? <span className="text-xl">📴</span> : <span className="text-xl">📶</span>}
                        {isPlaying ? 'Disconnect (Unmount)' : 'Connect (Mount)'}
                    </button>
                    <p className="mt-3 text-[10px] text-slate-400 leading-normal">
                        <strong>Logic:</strong> Toggling this mounts/unmounts the effect entirely.
                    </p>
                </div>

                {/* Server Switcher */}
                <div className="bg-white dark:bg-[#1a1c20] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm relative overflow-hidden">
                    <div className={\`absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-10 transition-opacity flex items-center justify-center \${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}\`}>
                        <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-lg backdrop-blur">Connect first to change servers</span>
                    </div>

                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Dependency Change</label>
                    <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3].map(id => (
                            <button
                                key={id}
                                onClick={() => setServerId(id)}
                                className={\`py-3 rounded-lg font-bold border-2 transition-all \${serverId === id ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300' : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:border-slate-300'}\`}
                            >
                                Server {id}
                            </button>
                        ))}
                    </div>
                    <p className="mt-4 text-[10px] text-slate-400 leading-normal">
                        <strong>Logic:</strong> Changing \`serverId\` forces React to: <br/> 
                        <span className="text-red-500 font-bold">1. Cleanup Old Server</span> ➝ <span className="text-green-500 font-bold">2. Setup New Server</span>
                    </p>
                </div>
            </div>

            {/* Right: Visualization Console */}
            <div className="flex flex-col bg-slate-900 rounded-2xl border border-slate-800 shadow-inner overflow-hidden relative">
                <div className="bg-slate-800 px-4 py-3 flex justify-between items-center border-b border-slate-700">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        <span>⚡</span> Lifecycle Monitor
                    </span>
                    <button onClick={() => setLogs([])} className="text-[10px] text-slate-500 hover:text-white uppercase font-bold">Clear</button>
                </div>
                
                <div className="flex-1 p-6 space-y-3 overflow-y-auto min-h-[300px] relative">
                    {/* Connection Lines simulation */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-800 z-0"></div>

                    {logs.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 opacity-50">
                            <span className="text-4xl text-gray-500">⏳</span>
                            <span className="text-xs font-bold uppercase tracking-widest">Waiting for effects...</span>
                        </div>
                    )}
                    
                    {logs.map((log) => (
                        <div key={log.id} className="relative z-10 flex items-start gap-4 animate-in slide-in-from-left-4 duration-300">
                            <div className="w-12 text-[10px] font-mono text-slate-500 pt-1 text-right shrink-0">{log.time}</div>
                            <div className={\`flex-1 p-3 rounded-lg border text-xs font-mono shadow-sm \${
                                log.type === 'setup' ? 'bg-green-500/10 border-green-500/30 text-green-300' :
                                log.type === 'cleanup' ? 'bg-red-500/10 border-red-500/30 text-red-300 line-through decoration-red-500/50' :
                                log.type === 'neutral' ? 'bg-slate-800 border-slate-700 text-slate-400 italic' :
                                'bg-blue-500/5 border-blue-500/20 text-blue-300'
                            }\`}>
                                <div className="flex items-center gap-2">
                                    {log.type === 'setup' && <span className="animate-spin-once">🔄</span>}
                                    {log.type === 'cleanup' && <span>❌</span>}
                                    {log.type === 'tick' && <span>⚡</span>}
                                    <span className="font-bold tracking-wide">{log.msg}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
  );
}
`
}

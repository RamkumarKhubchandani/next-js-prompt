export const zustandStateManagement = {
    title: "Zustand: The Bear Necessities 🐻",
    description: "Redux is boilerplate heavy. Context API triggers too many re-renders. Zustand is the Goldilocks solution: Just right. Master the art of atomic state.",
    slug: "zustand-state-management",
    type: "static",
    author: "Zustand Core Team",
    createdAt: new Date().toISOString(),
    readTime: "30 min read",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=2670&auto=format&fit=crop",
    tags: ["React", "State Management", "Zustand", "Architecture", "Scalability"],
    keywords: ["Zustand", "Redux", "Context API", "Global State", "Middlewares", "Immer", "Atomic State"],
    toc: [
        { id: "philosophy", label: "01. The No-Boilerplate Philosophy" },
        { id: "store-pattern", label: "02. The Store Pattern" },
        { id: "selectors", label: "03. Atomic Selectors" },
        { id: "async-actions", label: "04. Async Actions & Thunks" },
        { id: "slices-pattern", label: "05. The Slices Pattern" },
        { id: "middlewares", label: "06. Middlewares (Persist)" },
        { id: "virality", label: "07. Share & Takeaways" },
        { id: "interactive-demo", label: "08. Interactive Demo" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- Introduction -->
        <section class="scroll-mt-32">
             <div class="border-l-4 border-amber-500 pl-6 py-2 mb-8">
                <p class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                    "Web dev has two hard problems: Cache invalidation, and naming things. React has a third: Global State."
                </p>
             </div>
             <p class="text-xl md:text-2xl leading-relaxed font-light">
                For years, we argued about Flux, Redux, and Context. 
                Redux forced us to write switch statements. Context forced us to re-render the entire app.
                <br/><br/>
                Then a small bear (Zustand) came along and showed us that global state is actually just a variable that you can subscribe to.
                This is the definitive guide to state management without the headache.
            </p>
        </section>

        <!-- Section 1: Philosophy -->
        <section id="philosophy" class="scroll-mt-32">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-amber-600 dark:text-amber-400">01.</span>
                The "No-Boilerplate" Rule
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <p class="text-lg leading-relaxed">
                    Redux requires actions, reducers, types, and selectors. 
                    Zustand requires one hook. 
                    It treats state like a <strong>Module</strong> rather than a Context Tree.
                </p>
            </div>
            
            <!-- Comparison Table -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 my-8">
                <div class="bg-white dark:bg-black p-8 space-y-4">
                    <h3 class="text-red-600 dark:text-red-400 font-bold uppercase tracking-widest text-sm">Redux / Context</h3>
                    <ul class="text-base space-y-3 text-gray-600 dark:text-slate-400">
                         <li class="flex gap-2">❌ Wrap app in &lt;Provider&gt;</li>
                         <li class="flex gap-2">❌ Complex reducers & actions</li>
                         <li class="flex gap-2">❌ Context re-renders entire subtree</li>
                    </ul>
                </div>
                <div class="bg-white dark:bg-black p-8 space-y-4">
                    <h3 class="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-sm">Zustand</h3>
                    <ul class="text-base space-y-3 text-gray-600 dark:text-slate-400">
                         <li class="flex gap-2">✅ No Providers involved</li>
                         <li class="flex gap-2">✅ Just functions updating object</li>
                         <li class="flex gap-2">✅ Surgical re-renders via selectors</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Section 2: The Store Pattern -->
        <section id="store-pattern" class="scroll-mt-32">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-amber-600 dark:text-amber-400">02.</span>
                The Store Pattern
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                A store is just a hook! You create it once, and use it anywhere. 
                The \`set\` function merges state shallowly (like Class Component \`setState\`).
            </p>

            <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-slate-800"><code>import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  removeAll: () => set({ bears: 0 }),
}))</code></pre>
        </section>

        <!-- Section 3: Selectors & Re-renders -->
        <section id="selectors" class="scroll-mt-32">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-amber-600 dark:text-amber-400">03.</span>
                Selectors & Atomic Updates
            </h2>
            <div class="space-y-6">
                 <div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">How to NOT re-render</h3>
                    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        This is the most critical concept. When you use the hook, pass a <strong>selector function</strong>.
                        If you select the whole state, you re-render on *every* change.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg border border-red-200 dark:border-red-900/30">
                            <div class="text-sm font-bold text-red-600 uppercase mb-2">🐢 The Bad Way</div>
                            <code class="text-base font-mono block mb-2">const store = useStore()</code>
                            <p class="text-sm text-gray-600 dark:text-slate-400">Re-renders when honey changes, even if you only use bears.</p>
                        </div>
                        <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg border border-green-200 dark:border-green-900/30">
                            <div class="text-sm font-bold text-green-600 uppercase mb-2">🐰 The Good Way</div>
                            <code class="text-base font-mono block mb-2">const bears = useStore((s) => s.bears)</code>
                            <p class="text-sm text-gray-600 dark:text-slate-400"><strong>Only</strong> re-renders when \`bears\` number changes.</p>
                        </div>
                    </div>
                 </div>
            </div>
        </section>

         <!-- Section 4: Async Actions & Thunks -->
        <section id="async-actions" class="scroll-mt-32">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-amber-600 dark:text-amber-400">04.</span>
                Async Actions
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Just like in a real forest, some events take time. Fetching data from an API is like waiting for a new species to migrate into your forest. 
                Zustand handles these asynchronous actions with plain JavaScript. No middlewares. No Thunks. No Sagas.
            </p>
             <div class="bg-gray-100 dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800">
                <pre class="font-mono text-base text-gray-800 dark:text-gray-200 overflow-x-auto"><code>export const useForestStore = create((set) => ({
  fishInPond: 0,
  // Simulate fish migration!
  fetchFish: async () => {
    const response = await fetch('/api/pond-data') // Imagine an API call
    const fishCount = await response.json()
    set({ fishInPond: fishCount }) // Update the forest's fish count when done
  }
}))</code></pre>
            </div>
        </section>

         <!-- Section 5: The Slices Pattern -->
        <section id="slices-pattern" class="scroll-mt-32">
             <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-amber-600 dark:text-amber-400">05.</span>
                The Slices Pattern
            </h2>
             <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Scaling Zustand? Don't make one giant file. Split your store into <strong>Slices</strong>.
                A Slice is just a function that returns a part of the state object.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div class="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-xl border border-amber-200 dark:border-amber-900/30">
                     <h4 class="font-bold text-amber-800 dark:text-amber-200 mb-2">bearSlice.js</h4>
                     <code class="text-xs font-mono">export const createBearSlice = (set) => ({ bears: 0, ... })</code>
                 </div>
                 <div class="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-xl border border-amber-200 dark:border-amber-900/30">
                     <h4 class="font-bold text-amber-800 dark:text-amber-200 mb-2">fishSlice.js</h4>
                     <code class="text-xs font-mono">export const createFishSlice = (set) => ({ fishes: 0, ... })</code>
                 </div>
            </div>
            <p class="text-base text-gray-600 dark:text-gray-400 italic">
                Then merge them in your main store creation: \`create((...a) => ({ ...createBearSlice(...a), ...createFishSlice(...a) }))\`
            </p>
        </section>

         <!-- Section 6: Middlewares -->
        <section id="middlewares" class="scroll-mt-32">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-amber-600 dark:text-amber-400">06.</span>
                Forest Policies (Middlewares)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Sometimes you need forest-wide policies, like ensuring certain conditions persist even after a storm (page refresh). 
                Zustand's middlewares allow you to wrap your store with extra functionality, such as persisting your forest's state to local storage with a single line.
            </p>
             <div class="bg-gray-100 dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800">
                <pre class="font-mono text-base text-gray-800 dark:text-gray-200 overflow-x-auto"><code>import { persist } from 'zustand/middleware'

export const useForestStore = create(
  persist(
    (set) => ({
      bears: 0,
      honey: 100,
      addBear: () => set((state) => ({ bears: state.bears + 1, honey: state.honey - 20 })),
    }),
    { name: 'forest-ecosystem' } // 👈 Unique key for persistence
  )
)</code></pre>
            </div>
        </section>

         <!-- Section 7: Shares -->
        <section id="virality" class="scroll-mt-32 pt-12 border-t border-gray-200 dark:border-gray-800">
             <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
                07. Share the Calm
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                     <p class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
                        "Just deleted 20 files of Redux boilerplate and replaced it with one Zustand store. It feels like taking off tight shoes. #React #Zustand #WebDev"
                     </p>
                     <div class="text-xs font-bold text-blue-500 uppercase tracking-wide">Twitter / X</div>
                </div>
            </div>
             <div class="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-center">
                <h4 class="font-bold text-lg mb-2 text-amber-900 dark:text-amber-200">The Takeaway</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    State management doesn't have to be hard. Keep it simple. Keep it atomic. Let the bear handle the heavy lifting.
                </p>
            </div>
        </section>

        <!-- Interactive Demo Section -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-amber-600 dark:text-amber-400">08.</span>
                Visualize Your Living Forest
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                This isn't just a counter; it's a dynamic simulation of a forest ecosystem. Observe how different components act as rangers, biologists, or tourists, each subscribing to and interacting with specific aspects of the forest state.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <!-- Concept: Controls slice -->
                <div class="space-y-4">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded text-sm uppercase tracking-wide">Optimization</span>
                        Silent Rangers (Static Actions)
                    </h3>
                    <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        The "Controls" component below acts as a silent ranger. It issues commands (actions) to the forest manager but doesn't need to constantly observe the forest's state, thus <strong>never re-rendering</strong> itself based on state changes.
                    </p>
                </div>

                 <!-- Concept: Stats slice -->
                <div class="space-y-4">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                         <span class="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded text-sm uppercase tracking-wide">Optimization</span>
                         Focused Biologists (Atomic Selectors)
                    </h3>
                    <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        The "Bear Stats" component is like a focused biologist. It <strong>only</strong> observes the number of \`bears\`. It doesn't care about bees or honey levels, ensuring surgical rendering and optimal performance.
                    </p>
                </div>
            </div>

            <p class="text-base text-gray-500 italic mb-6">
                👇 Interact with the ecosystem below. Notice smooth updates and efficient state management in action.
            </p>
        </section>

    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';

// ----------------------------------------------------
// 🐻 ZUSTAND SIMULATOR (Mini-implementation)
// ----------------------------------------------------

// 1. Create a tiny store (observable pattern)
const createStore = (initialState) => {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,
    setState: (fn) => {
      const nextState = typeof fn === 'function' ? fn(state) : fn;
      state = { ...state, ...nextState };
      listeners.forEach(l => l());
    },
    // The real magic: Subscribing
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  }
};

// 2. The Global Store Instance
const store = createStore({
  bears: 0,
  bees: 0, // Bees make honey
  honey: 100, // Starts full
  mood: 'Neutral'
});

// 3. The Hook (useStore)
const useStore = (selector) => {
  // Initial value
  const [value, setValue] = useState(() => selector(store.getState()));

  useEffect(() => {
    // Determine if we need to update when global state changes
    const unsub = store.subscribe(() => {
      const nextValue = selector(store.getState());
      
      // Basic equality check (simplified for demo)
      setValue(current => {
          if (current !== nextValue) return nextValue;
          return current;
      });
    });
    return unsub;
  }, [selector]);

  return value;
};

// ----------------------------------------------------
// 🌲 THE INTERACTIVE FOREST
// ----------------------------------------------------

export default function ZustandForest() {
  return (
    <div className="flex flex-col h-[700px] bg-amber-50 dark:bg-[#1a1a0f] text-amber-900 dark:text-amber-50 font-sans rounded-3xl overflow-hidden border border-amber-200 dark:border-amber-900/30 shadow-xl relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none"></div>

      {/* Header */}
      <div className="p-6 border-b border-amber-200 dark:border-amber-900/30 bg-white/50 dark:bg-black/20 backdrop-blur flex justify-between items-center z-10">
          <div>
              <h2 className="text-2xl font-black text-amber-600 dark:text-amber-400 tracking-tight">The Ecosystem</h2>
              <p className="text-xs text-amber-600/50 dark:text-amber-200/50 uppercase tracking-widest mt-1">Global Store State</p>
          </div>
          <ResetButton />
      </div>

      <div className="flex-1 flex flex-col md:flex-row p-6 gap-6 relative z-10 overflow-y-auto">
          
          {/* LEFT: Controls (Actions) */}
          <div className="w-full md:w-1/3 space-y-6">
              <Controls />
              <MoodIndicator />
              <LogView />
          </div>

          {/* RIGHT: Visualization (Subscribers) */}
          <div className="flex-1 grid grid-rows-[auto_1fr] gap-6 h-full">
              
              {/* Top: Stats (Deeply Connected) */}
              <div className="bg-white/40 dark:bg-black/40 rounded-2xl p-6 border border-amber-500/10 grid grid-cols-2 gap-4">
                  <BearStats />
                  <HoneyStats />
              </div>

               {/* Bottom: Visuals */}
               <div className="bg-white/40 dark:bg-black/40 rounded-2xl p-6 border border-amber-500/10 flex items-center justify-center relative overflow-hidden min-h-[300px]">
                   <ForestVisualizer />
               </div>
          </div>
      </div>
    </div>
  );
}

// --- COMPONENTS (Independent Subscribers) ---

function Controls() {
  // Select nothing, just using actions directly from store
  // Optimization: This component NEVER re-renders based on state changes!
  const addBear = () => {
    const state = store.getState();
    if (state.honey < 20) return; // Need honey to attract bears

    store.setState(prev => ({ 
        bears: prev.bears + 1,
        honey: prev.honey - 20,
        mood: prev.bears + 1 > 5 ? 'Wild' : 'Happy'
    }));
  };

  const addBee = () => {
    store.setState(prev => ({ 
        bees: prev.bees + 1,
        honey: Math.min(prev.honey + 10, 100) // Bees make honey
    }));
  };

  return (
      <div className="bg-amber-100/50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-200 dark:border-amber-500/20">
          <h3 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase mb-4">Actions</h3>
          <div className="space-y-3">
              <button 
                onClick={addBear}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white dark:text-black font-bold py-3 rounded-xl transition-transform active:scale-95 shadow-lg shadow-amber-900/10 flex items-center justify-center gap-2"
              >
                  <span>🐻</span> Add Bear (-20 Honey)
              </button>
              <button 
                onClick={addBee}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition-transform active:scale-95 shadow-lg shadow-yellow-900/10 flex items-center justify-center gap-2"
              >
                  <span>🐝</span> Add Bee (+10 Honey)
              </button>
          </div>
          <p className="text-[10px] text-amber-700/40 dark:text-amber-200/40 mt-4 leading-tight">
              *Notice: The "Controls" component does not re-render (check console).
          </p>
      </div>
  )
}

function BearStats() {
    // Select ONLY bears
    const bears = useStore(state => state.bears);

    return (
        <div className="flex flex-col items-center justify-center bg-amber-100/50 dark:bg-amber-950/30 rounded-xl p-4 transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-2">🐻</div>
            <div className="text-3xl font-bold">{bears}</div>
            <div className="text-xs text-amber-600/60 dark:text-amber-400/60 uppercase font-bold">Population</div>
        </div>
    )
}

function HoneyStats() {
    // Select ONLY honey
    const honey = useStore(state => state.honey);

    return (
        <div className="flex flex-col items-center justify-center bg-yellow-100/50 dark:bg-yellow-950/30 rounded-xl p-4 relative overflow-hidden group transition-all duration-300 hover:scale-105">
            <div 
                className="absolute bottom-0 left-0 right-0 bg-yellow-500/20 transition-all duration-500"
                style={{ height: \`\${honey}%\` }}
            ></div>
            <div className="text-4xl mb-2 relative z-10">🍯</div>
            <div className="text-3xl font-bold relative z-10">{Math.round(honey)}%</div>
            <div className="text-xs text-yellow-600/60 dark:text-yellow-400/60 uppercase font-bold relative z-10">Reserves</div>
        </div>
    )
}

function MoodIndicator() {
     // Select ONLY mood
     const mood = useStore(state => state.mood);
     
     let color = "text-gray-400 dark:text-slate-400";
     if (mood === 'Happy') color = "text-green-500 dark:text-green-400";
     if (mood === 'Wild') color = "text-red-500 dark:text-red-400";

     return (
         <div className="bg-white/40 dark:bg-black/40 p-6 rounded-2xl border border-amber-500/10 text-center">
             <div className="text-xs text-gray-500 dark:text-slate-500 uppercase font-bold mb-2">Forest Mood</div>
             <div className={\`font-bold \${color} text-2xl transition-transform duration-300 transform group-hover:scale-110 uppercase\`}>
                 {mood}
             </div>
         </div>
     )
}

function LogView() {
    const bears = useStore(state => state.bears);
    const bees = useStore(state => state.bees);
    
    // Just a dummy log to show subscription updates
    return (
        <div className="font-mono text-[10px] text-gray-400 dark:text-gray-500 p-4 bg-black/5 dark:bg-black/20 rounded-xl">
             <div>Latest State Broadcast:</div>
             <div className="mt-1">Bears: {bears} | Bees: {bees}</div>
        </div>
    )
}

function ForestVisualizer() {
    const bears = useStore(state => state.bears);
    const bees = useStore(state => state.bees);

    return (
        <div className="w-full h-full relative">
             {/* Bears stay on ground */}
             <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center gap-[-10px]">
                 {Array.from({ length: bears }).map((_, i) => (
                     <div key={\`bear-\${i}\`} className="text-4xl animate-in fade-in slide-in-from-bottom-5 duration-500 transition-all" style={{ transform: \`translateX(\${(i%2===0 ? -1 : 1) * i * 5}px)\`, zIndex: bears-i }}>
                         🐻
                     </div>
                 ))}
             </div>

             {/* Bees fly randomly */}
             {Array.from({ length: bees }).map((_, i) => (
                 <div key={\`bee-\${i}\`} className="text-xl animate-pulse absolute transition-all duration-[2000ms] ease-in-out" 
                      style={{ 
                          top: \`\${20 + (Math.sin(i + Date.now()/1000) * 20)}%\`, 
                          left: \`\${(i * 15) % 90}%\`,
                          animationDelay: \`\${i * 0.2}s\` 
                      }}>
                     🐝
                 </div>
             ))}
             
             {bears === 0 && bees === 0 && (
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-slate-600 italic text-sm">
                     The forest is quiet...
                 </div>
             )}
        </div>
    )
}

function ResetButton() {
    const reset = () => {
        store.setState({ bears: 0, bees: 0, honey: 100, mood: 'Neutral' });
    };
    return (
        <button onClick={reset} className="text-xs text-amber-600 dark:text-amber-500 hover:text-amber-500 font-bold bg-amber-100 dark:bg-amber-900/40 px-3 py-1.5 rounded-lg transition-colors">
            Reset
        </button>
    )
}
`
}

export const zustandStateManagement = {
    title: "Zustand: The Definitive Guide to Scalable State Management (2026) 🐻",
    description: "The most comprehensive guide to Zustand on the web. From replacing Redux to building enterprise-grade store architectures with Slices, Middleware, and TypeScript.",
    slug: "zustand-state-management",
    type: "static",
    author: "Senior Frontend Architect",
    createdAt: new Date().toISOString(),
    readTime: "45 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=2670&auto=format&fit=crop",
    tags: ["React", "State Management", "Zustand", "Architecture", "Performance", "TypeScript", "Testing"],
    keywords: ["Zustand Guide", "Redux alternative", "React Context Performance", "Zustand Slices Pattern", "Testing Zustand", "Zustand Middleware"],
    toc: [
        { id: "evolution", label: "01. The Evolution of State" },
        { id: "why-zustand", label: "02. Why Zustand Wins" },
        { id: "core-concepts", label: "03. Core Concepts & Syntax" },
        { id: "atomic-selectors", label: "04. Performance & Atomic Selectors" },
        { id: "async-architecture", label: "05. Async Architecture" },
        { id: "enterprise-patterns", label: "06. Enterprise Patterns (Slices)" },
        { id: "middleware-mastery", label: "07. Middleware Mastery" },
        { id: "testing-strategy", label: "08. Testing Strategy" },
        { id: "advanced-recipes", label: "09. Advanced Recipes" },
        { id: "interactive-demo", label: "10. The Ecosystem Simulator" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. The Evolution -->
        <section id="evolution" class="scroll-mt-32">
             <div class="border-l-8 border-amber-500 bg-amber-50 dark:bg-amber-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h2 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "State management shouldn't be a full-time job."
                </h2>
                <p class="text-xl md:text-2xl text-amber-900 dark:text-amber-100 font-light leading-relaxed">
                    To understand why **Zustand** is taking over the React ecosystem, we first need to understand the pain that came before it. 
                    We spent a decade wrapping our apps in Providers, writing switch statements, and debating overly complex architectures for simple problems.
                </p>
             </div>

             <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert leading-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-12 mb-6">The Historical Context</h3>
                <p>
                    Let's rewind. <strong>2015</strong>: Redux appears. It's revolutionary. A single source of truth. Time travel debugging. But it demanded a blood sacrifice: *Boilerplate*. 
                    To change a single boolean, you needed an Action Type, an Action Creator, a Thunk, and a Reducer case.
                </p>
                <p>
                    <strong>2018</strong>: React Context API updates. Everyone says "Redux is dead!" We start shoving global state into Context. 
                    But Context has a fatal flaw: <strong>The Re-render Bomb</strong>. If you have a Context with 20 values, and *one* changes, *every* component consuming that context re-renders. 
                    Even if they don't use the changed value. Performance tanks.
                </p>
                <p>
                    <strong>2020s</strong>: Enter **Zustand** (German for 'State'). It solves the dilemma. It gives you the "Single Source of Truth" from Redux, but with the simplicity of a hook. 
                    Crucially, it solves the performance problem via <strong>Atomic Selectors</strong>.
                </p>
             </div>
        </section>

        <!-- 02. Why Zustand Wins -->
        <section id="why-zustand" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-400">02.</span>
                Why Zustand Wins
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div class="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div class="text-4xl mb-4">🤏</div>
                    <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Tiny Footprint</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                        Zustand is ~1KB gzipped. It is a thin wrapper around \`useSyncExternalStore\`. It doesn't bloat your bundle like Redux Toolkit often can.
                    </p>
                </div>
                <div class="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div class="text-4xl mb-4">⚡</div>
                    <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Rendering Precision</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                        Components only re-render if the specific *slice* of state they select changes. React Context cannot do this natively without complex memoization.
                    </p>
                </div>
                <div class="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div class="text-4xl mb-4">🔓</div>
                    <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Unopinionated</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                        Want to use Immer? Go ahead. Middleware? Sure. Async? Just use async/await. It doesn't force a strict pattern like Sagas or Observables.
                    </p>
                </div>
            </div>
        </section>

        <!-- 03. Core Concepts -->
        <section id="core-concepts" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-400">03.</span>
                Core Concepts & Syntax
            </h2>
            <p class="text-xl text-gray-700 dark:text-gray-300 mb-8">
                The mental model is simple: <strong>Your store is a hook</strong>. You don't wrap your app in a Provider. You don't dispatch actions. You just call a function.
            </p>

            <div class="bg-gray-900 text-gray-100 p-8 rounded-2xl overflow-x-auto shadow-2xl relative group">
                <div class="absolute top-0 right-0 bg-slate-800 text-gray-400 text-xs px-3 py-1 rounded-bl-lg font-mono">store.js</div>
                <pre class="text-sm md:text-base font-mono leading-relaxed">
<span class="text-purple-400">import</span> { create } <span class="text-purple-400">from</span> <span class="text-green-400">'zustand'</span>

<span class="text-gray-500">// 1. Create the store</span>
<span class="text-purple-400">export const</span> useStore = create((set) => ({
  <span class="text-gray-500">// State</span>
  bears: <span class="text-blue-400">0</span>,
  
  <span class="text-gray-500">// Actions (UPDATES ARE MERGED AUTOMATICALLY!)</span>
  increasePopulation: () => set((state) => ({ bears: state.bears + <span class="text-blue-400">1</span> })),
  
  removeAllBears: () => set({ bears: <span class="text-blue-400">0</span> }),
}))

<span class="text-gray-500">// 2. Use the hook in ANY component</span>
<span class="text-purple-400">function</span> <span class="text-yellow-400">BearCounter</span>() {
  <span class="text-purple-400">const</span> bears = useStore((state) => state.bears)
  <span class="text-purple-400">return</span> <span class="text-blue-400">&lt;h1&gt;</span>{bears} around here ...<span class="text-blue-400">&lt;/h1&gt;</span>
}</pre>
            </div>
            
            <div class="mt-8 bg-amber-50 dark:bg-amber-900/10 p-6 rounded-xl border border-amber-200 dark:border-amber-900/30">
                <h4 class="font-bold text-amber-900 dark:text-amber-100 mb-2">Deep Dive: The \`set\` function</h4>
                <p class="text-gray-700 dark:text-gray-300">
                    Unlike weird reducers, the \`set\` function is intuitive. It takes the *old* state and returns a *partial* new state. 
                    Zustand shallowly merges this returned object with the current state.
                    <br/><br/>
                    <code>set({ bears: 5 })</code> implies <code>state = { ...oldState, bears: 5 }</code>.
                </p>
            </div>
        </section>

        <!-- 04. Atomic Selectors -->
        <section id="atomic-selectors" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-400">04.</span>
                Performance & Atomic Selectors
            </h2>
             <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                This is the #1 mistake new Zustand users make. They treat the hook like \`useContext\`.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-200 dark:border-red-900/30">
                    <h3 class="text-red-700 dark:text-red-300 font-bold mb-4">❌ The Lazy Way (Bad Performance)</h3>
                    <pre class="text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
const { bears, honey, fish } = useStore();
// ⚠️ This component re-renders if 'fish' changes,
// even if it only renders 'bears'. 
// It subscribes to the WHOLE object.</pre>
                </div>
                 <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-900/30">
                    <h3 class="text-green-700 dark:text-green-300 font-bold mb-4">✅ The Atomic Way (Optimization)</h3>
                    <pre class="text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
const bears = useStore((state) => state.bears);
// 🚀 This component ONLY re-renders if 'bears' changes.
// 'fish' or 'honey' updates are ignored.</pre>
                </div>
            </div>

            <div class="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border-l-4 border-blue-500">
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">Pro Tip: Auto-Generating Selectors</h4>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                    In large apps, writing \`state => state.foo\` repeats heavily. You can write a helper to auto-generate selectors, but honestly, manual selectors are clearer and explicit.
                </p>
            </div>
        </section>

        <!-- 05. Async Architecture -->
        <section id="async-architecture" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-400">05.</span>
                Async Architecture
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                In Redux, async is hell (Thunks, Sagas). In Zustand, async actions are just... async functions.
                You can await promises and call \`set\` whenever you want.
            </p>

            <div class="bg-gray-900 text-gray-100 p-8 rounded-2xl shadow-2xl overflow-x-auto">
                <pre class="text-sm font-mono">
const useStore = create((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchData: <span class="text-purple-400">async</span> (url) => {
    <span class="text-gray-500">// 1. Start Loading & Reset Error</span>
    set({ loading: true, error: null });

    <span class="text-purple-400">try</span> {
      const response = <span class="text-purple-400">await</span> fetch(url);
      const data = <span class="text-purple-400">await</span> response.json();
      
      <span class="text-gray-500">// 2. Success Update</span>
      set({ data, loading: false });
    } <span class="text-purple-400">catch</span> (error) {
      <span class="text-gray-500">// 3. Error Update</span>
      set({ error: error.message, loading: false });
    }
  }
}))</pre>
            </div>
             <p class="mt-4 text-gray-600 dark:text-gray-400 italic">
                Note: You can use \`get()\` to read current state inside an action if you need to depend on other values (e.g., \`if (get().loading) return; \`).
            </p>
        </section>

        <!-- 06. Enterprise Patterns -->
        <section id="enterprise-patterns" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-400">06.</span>
                Enterprise Patterns (The Slice Pattern)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                You do NOT want a 5,000 line \`store.js\` file.
                As your app grows, you must split your store into small, manageable <strong>Slices</strong>.
            </p>

            <div class="space-y-8">
                <div class="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-2 font-mono">1. createAuthSlice.js</h4>
                    <pre class="text-xs font-mono text-gray-600 dark:text-gray-400 leading-relaxed">
export const createAuthSlice = (set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
});</pre>
                </div>

                <div class="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-2 font-mono">2. createCartSlice.js</h4>
                    <pre class="text-xs font-mono text-gray-600 dark:text-gray-400 leading-relaxed">
export const createCartSlice = (set, get) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  totalPrice: () => get().items.reduce((acc, item) => acc + item.price, 0),
});</pre>
                </div>

                <div class="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-2 font-mono">3. useStore.js (Root Store)</h4>
                    <pre class="text-xs font-mono text-gray-600 dark:text-gray-400 leading-relaxed">
import { create } from 'zustand';
import { createAuthSlice } from './createAuthSlice';
import { createCartSlice } from './createCartSlice';

export const useStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
}));</pre>
                </div>
            </div>
            <p class="mt-6 text-gray-700 dark:text-gray-300">
                This pattern makes your code infinitely scalable. Each slice is an isolated module, but they all share the same memory space, so \`get()\` in the Cart slice can technically read \`user\` from Audio slice if needed.
            </p>
        </section>

        <!-- 07. Middleware -->
        <section id="middleware-mastery" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-400">07.</span>
                Middleware Mastery
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Zustand has built-in middleware for common tasks.
            </p>
            
            <div class="space-y-8">
                 <div class="p-6 bg-slate-100 dark:bg-slate-900 rounded-xl">
                    <h3 class="text-xl font-bold mb-4">💾 Persistence (LocalStorage)</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">
                        Automatically save your store to \`localStorage\` (or AsyncStorage).
                    </p>
                    <pre class="text-sm font-mono bg-white dark:bg-black p-4 rounded-lg overflow-x-auto">
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({ count: 0, increase: ... }),
    { name: 'my-app-storage' } // Unique key
  )
)</pre>
                 </div>

                 <div class="p-6 bg-slate-100 dark:bg-slate-900 rounded-xl">
                    <h3 class="text-xl font-bold mb-4">🎁 Immer (Mutable Syntax)</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">
                        Prefer mutable syntax like \`state.count++\`? Wrap it in immer.
                    </p>
                    <pre class="text-sm font-mono bg-white dark:bg-black p-4 rounded-lg overflow-x-auto">
import { immer } from 'zustand/middleware/immer'

export const useStore = create(
  immer((set) => ({
    count: 0,
    increase: () => set((state) => {
      state.count += 1 // Mutation is safe here!
    })
  }))
)</pre>
                 </div>
            </div>
        </section>
        
        <!-- 08. Testing -->
        <section id="testing-strategy" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-400">08.</span>
                Testing Strategy
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Testing hooks can be tricky because state preserves between tests. You need to reset your store between tests.
            </p>
            <div class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800">
                <h4 class="font-bold mb-4">Unit Testing with Vitest/Jest</h4>
                 <pre class="text-sm font-mono text-gray-600 dark:text-gray-400 overflow-x-auto">
import { act, renderHook } from '@testing-library/react'
import { useStore } from './store'

describe('Zustand Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useStore.setState({ bears: 0 }) 
  })

  it('should increase bears', () => {
    const { result } = renderHook(() => useStore())
    
    act(() => {
      result.current.increase()
    })

    expect(result.current.bears).toBe(1)
  })
})</pre>
            </div>
        </section>

        <!-- 09. Advanced Recipes -->
        <section id="advanced-recipes" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-400">09.</span>
                Advanced Recipes
            </h2>
            
             <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Using Zustand Outside React</h3>
             <p class="text-gray-700 dark:text-gray-300 mb-6">
                 Because Zustand is strictly separated from React, you can import and use the store in plain vanilla JS files, Web Workers, or legacy code.
             </p>
             <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg mb-8">
                 <code class="text-sm font-mono block">
                     import { useStore } from './store' <br/><br/>
                     // Read state <br/>
                     const bears = useStore.getState().bears<br/><br/>
                     // Write state <br/>
                     useStore.setState({ bears: bears + 1 })<br/><br/>
                     // Subscribe <br/>
                     useStore.subscribe((state) => console.log("New state:", state))
                 </code>
             </div>

             <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Transient Updates (Performance Hack)</h3>
             <p class="text-gray-700 dark:text-gray-300 mb-6">
                 If you state updates 60fps (animation), triggering React re-renders is too slow. You can subscribe directly to the store ref without causing a React Render cycle.
             </p>
        </section>

        <!-- 10. Interactive Demo -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-400">10.</span>
                The Ecosystem Simulator
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Below is a fully functional forest ecosystem built with Zustand. 
                <br/>
                <strong>The key innovation:</strong> Notice how the "Controls" panel adds animals but <em>never re-renders</em> itself? That is the power of atomic actions.
            </p>
        </section>

    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';

// ==========================================
// 🏗️ Mini-Zustand Implementation 
// (To demonstrate how it works under the hood)
// ==========================================
const createStore = (initialState) => {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,
    setState: (partial) => {
      const nextState = typeof partial === 'function' ? partial(state) : partial;
      state = { ...state, ...nextState };
      listeners.forEach(listener => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
};

// ==========================================
// 🌲 The Store Instance
// ==========================================
const store = createStore({
  bears: 2,
  honey: 80,
  bees: 5,
  log: ['Initialized forest ecosystem...']
});

// Hook for React
const useStore = (selector) => {
  const [value, setValue] = useState(() => selector(store.getState()));

  useEffect(() => {
    const unsub = store.subscribe(() => {
      const newVal = selector(store.getState());
      setValue(prev => (prev !== newVal ? newVal : prev));
    });
    return unsub;
  }, [selector]);

  return value;
};


// ==========================================
// 🧩 Components
// ==========================================

export default function ZustandDemo() {
  return (
    <div className="bg-amber-50 dark:bg-[#1a1c19] p-6 lg:p-10 rounded-3xl border border-amber-200 dark:border-white/10 shadow-2xl font-sans min-h-[800px] flex flex-col">
       
       <header className="mb-8 flex justify-between items-center bg-white/50 dark:bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-amber-100 dark:border-white/5">
           <div>
                <h1 className="text-3xl font-black text-amber-900 dark:text-amber-100 tracking-tight flex items-center gap-3">
                    <span>🐻</span> Forest Dashboard
                </h1>
                <p className="text-amber-800/60 dark:text-amber-100/60 font-medium mt-1">
                    Zustand State Inspector
                </p>
           </div>
           <div className="hidden md:flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-800 dark:text-amber-200 text-xs font-bold uppercase tracking-wider">
                    <span>⚡</span> Live Sync
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-800 dark:text-amber-200 text-xs font-bold uppercase tracking-wider">
                    <span>🗄️</span> Atomic Updates
                </div>
           </div>
       </header>

       <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: CONTROLS & LOGS */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* 1. Control Panel (Action Slice) */}
                <div className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm border border-amber-100 dark:border-white/5">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-amber-500 text-xl">⚙️</span>
                        <h3 className="font-bold text-amber-900 dark:text-amber-100">Actions (Slice)</h3>
                    </div>
                    
                    <ControlPanel />
                    
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30 text-[10px] text-blue-700 dark:text-blue-300 leading-tight">
                        💡 <strong>Performance Tip:</strong> This panel component does NOT re-render when state changes. It only dispatches actions.
                    </div>
                </div>

                {/* 2. Action Log */}
                <div className="flex-1 bg-black/80 rounded-2xl p-6 font-mono text-xs overflow-hidden flex flex-col">
                    <div className="text-gray-400 uppercase tracking-widest font-bold mb-4 flex justify-between">
                        <span>Console Stream</span>
                        <span className="text-green-500 animate-pulse">●</span>
                    </div>
                    <LogViewer />
                </div>
            </div>

            {/* RIGHT COLUMN: VISUALIZATIONS */}
            <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* 3. Atomic Stats (Selectors) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <BearCounter />
                    <BeeCounter />
                    <HoneyLevel />
                </div>

                {/* 4. The Visual Forest */}
                <div className="flex-1 bg-gradient-to-b from-blue-100 to-amber-100 dark:from-slate-900 dark:to-[#2c3025] rounded-3xl relative overflow-hidden shadow-inner border border-amber-200 dark:border-white/5 p-8 min-h-[400px]">
                    <div className="absolute top-4 left-4 text-xs font-bold uppercase text-black/30 dark:text-white/30 tracking-widest">
                        Visual Layer (Subscriber)
                    </div>
                    <ForestCanvas />
                </div>
            </div>
       </div>

    </div>
  );
}

// -------------------------------------------------------------
// 🧠 Components (Notice granular subscriptions)
// -------------------------------------------------------------

function ControlPanel() {
  // Directly accessing state setter, no subscription!
  const addBear = () => {
    const s = store.getState();
    if (s.honey < 10) return;
    store.setState(prev => ({ 
        bears: prev.bears + 1, 
        honey: prev.honey - 10,
        log: [...prev.log, '🐻 A new bear arrived (-10 Honey)']
    }));
  }

  const addBee = () => {
    store.setState(prev => ({ 
        bees: prev.bees + 1,
        log: [...prev.log, '🐝 Creating a new Buzzer']
    }));
  }

  const makeHoney = () => {
    store.setState(prev => ({ 
        honey: Math.min(prev.honey + (prev.bees * 2), 100),
        log: [...prev.log, \`🍯 Bees made honey (+\${prev.bees*2})\`]
    }));
  }

  return (
    <div className="space-y-3">
        <button onClick={addBear} className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl active:scale-95 transition-all shadow-lg flex justify-between px-6">
            <span>Spawn Bear</span>
            <span className="opacity-70 text-xs py-1">-10 Honey</span>
        </button>
        <div className="flex gap-3">
             <button onClick={addBee} className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-xl active:scale-95 transition-all shadow-lg">
                + Bee
            </button>
            <button onClick={makeHoney} className="flex-1 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl active:scale-95 transition-all shadow-lg">
                Work Bees
            </button>
        </div>
        <button onClick={() => store.setState({ bears: 0, bees: 0, honey: 100, log: ['🔥 Forest reset!'] })} className="w-full py-2 border-2 border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold rounded-xl mt-4 text-xs uppercase tracking-widest">
            Reset Ecosystem
        </button>
    </div>
  )
}

function BearCounter() {
  const bears = useStore(s => s.bears);
  return (
    <div className="bg-amber-100 dark:bg-amber-900/20 p-6 rounded-2xl border-l-4 border-amber-600 relative overflow-hidden group">
        <div className="text-4xl font-black text-amber-900 dark:text-amber-100 relative z-10">{bears}</div>
        <div className="text-xs uppercase font-bold text-amber-700 dark:text-amber-300 mt-2 relative z-10">Bears</div>
        <div className="absolute right-[-10px] bottom-[-10px] text-8xl opacity-10 group-hover:scale-110 transition-transform select-none">🐻</div>
    </div>
  )
}

function BeeCounter() {
  const bees = useStore(s => s.bees);
  return (
    <div className="bg-yellow-100 dark:bg-yellow-900/20 p-6 rounded-2xl border-l-4 border-yellow-500 relative overflow-hidden group">
        <div className="text-4xl font-black text-yellow-900 dark:text-yellow-100 relative z-10">{bees}</div>
        <div className="text-xs uppercase font-bold text-yellow-700 dark:text-yellow-300 mt-2 relative z-10">Bees</div>
        <div className="absolute right-[-10px] bottom-[-10px] text-8xl opacity-10 group-hover:scale-110 transition-transform select-none">🐝</div>
    </div>
  )
}

function HoneyLevel() {
  const honey = useStore(s => s.honey);
  return (
    <div className="bg-orange-100 dark:bg-orange-900/20 p-6 rounded-2xl border-l-4 border-orange-500 relative overflow-hidden">
        <div className="text-4xl font-black text-orange-900 dark:text-orange-100 relative z-10">{honey}%</div>
        <div className="text-xs uppercase font-bold text-orange-700 dark:text-orange-300 mt-2 relative z-10">Honey Reserves</div>
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-orange-200 dark:bg-orange-900/40">
            <div className="absolute bottom-0 left-0 right-0 bg-orange-500 transition-all duration-500" style={{ height: \`\${honey}%\` }}></div>
        </div>
    </div>
  )
}

function LogViewer() {
    const log = useStore(s => s.log);
    return (
        <div className="flex-1 overflow-y-scroll space-y-2 pr-2 custom-scrollbar">
            {[...log].reverse().map((entry, i) => (
                <div key={i} className="text-gray-300 border-b border-white/5 pb-1 mb-1 animate-in fade-in slide-in-from-left-4">
                    <span className="text-gray-600 mr-2 opacity-50">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                    {entry}
                </div>
            ))}
        </div>
    )
}

function ForestCanvas() {
    const bears = useStore(s => s.bears);
    const bees = useStore(s => s.bees);

    // Bees positioning
    const [beePositions, setBeePositions] = useState([]);
    useEffect(() => {
        setBeePositions(Array.from({length: bees}).map(() => ({
            top: Math.random() * 60 + 10 + '%',
            left: Math.random() * 80 + 10 + '%',
            delay: Math.random() * 2 + 's'
        })));
    }, [bees]);

    return (
        <div className="w-full h-full relative">
            {/* Clouds */}
            <div className="absolute top-10 left-20 text-white/50 text-5xl animate-pulse">☁️</div>
            <div className="absolute top-20 right-40 text-white/50 text-4xl animate-pulse delay-1000">☁️</div>

            {/* Bears */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end h-32 px-10 gap-[-10px]">
                {Array.from({length: bears}).map((_, i) => (
                    <div key={i} className="text-5xl lg:text-7xl transition-all duration-500 animate-in slide-in-from-bottom-20 bounce-in" style={{ zIndex: i }}>
                        🐻
                    </div>
                ))}
            </div>

            {/* Bees */}
            {beePositions.map((pos, i) => (
                <div key={i} className="absolute text-2xl animate-bounce" style={{ top: pos.top, left: pos.left, animationDuration: '3s', animationDelay: pos.delay }}>
                    🐝
                </div>
            ))}
        </div>
    )
}
`};

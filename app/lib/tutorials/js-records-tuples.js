export const jsRecordsTuples = {
    title: "JavaScript Records & Tuples: Immutable Data is Finally Native",
    description: "Deep equality by default. No more 'reference vs value' bugs. Learn how Records and Tuples (#[], #{}) will revolutionize how we manage state in 2026.",
    slug: "js-records-tuples",
    category: "JavaScript",
    type: "static",
    author: "Core Platform Engineer",
    createdAt: new Date().toISOString(),
    readTime: "20 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2574&auto=format&fit=crop",
    tags: ["JavaScript", "Immutability", "Records & Tuples", "Performance", "ES2026"],
    keywords: ["JavaScript Records", "JavaScript Tuples", "Deep Equality", "ImmutableJS alternative", "React Performance"],
    toc: [
        { id: "identity-crisis", label: "01. The Identity Crisis" },
        { id: "syntax", label: "02. Syntax: #{} and #[]" },
        { id: "react-perf", label: "03. React Performance" },
        { id: "map-keys", label: "04. Tuples as Map Keys" },
        { id: "structural-sharing", label: "05. Structural Sharing" },
        { id: "senior-take", label: "06. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Identity Crisis -->
        <section id="identity-crisis" class="scroll-mt-32">
             <div class="border-l-8 border-purple-600 bg-purple-50 dark:bg-purple-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    <code>{} === {}</code> is finally True.
                </h1>
                <p class="text-xl md:text-2xl text-purple-800 dark:text-purple-200 font-light leading-relaxed">
                    For 30 years, JavaScript developers have struggled with object identity. Infinite loops in <code>useEffect</code>, unnecessary React re-renders, and complex memoization checks.
                    <br/><br/>
                    Enter <strong>Records & Tuples</strong>: Native, immutable data structures that compare by <em>content</em>, not reference.
                </p>
             </div>
        </section>

        <!-- 02. Syntax -->
        <section id="syntax" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-purple-600 dark:text-purple-500">02.</span>
                The Hash Syntax
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Simply put a hash <code>#</code> before your object or array literal. That's it. It is now deeply immutable and compares by value.
                </p>
            </div>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="p-6 rounded-xl bg-gray-100 dark:bg-gray-800">
                    <h3 class="font-bold text-gray-500 mb-4">Old Object (Reference)</h3>
                    <pre class="text-sm font-mono text-gray-700 dark:text-gray-300">
const a = { x: 1 };
const b = { x: 1 };

console.log(a === b); 
// ❌ False (Different memory address)
                    </pre>
                </div>
                <div class="p-6 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-200">
                    <h3 class="font-bold text-purple-600 mb-4">New Record (Value)</h3>
                    <pre class="text-sm font-mono text-gray-700 dark:text-gray-300">
const a = #{ x: 1 };
const b = #{ x: 1 };

console.log(a === b); 
// ✅ True (Same content)
                    </pre>
                </div>
            </div>
        </section>

        <!-- 03. React Perf -->
        <section id="react-perf" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-purple-600 dark:text-purple-500">03.</span>
                The React Revolution
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                This kills <code>useMemo</code> for 90% of use cases. If you pass a Record to a child component, React's shallow comparison just works. No more <code>prevProps.obj === nextProps.obj</code> failures.
            </p>
            <div class="bg-gray-900 p-6 rounded-xl text-sm font-mono text-blue-200">
                // No memo needed!<br/>
                &lt;Chart config={#{ theme: 'dark', data: #[1, 2, 3] }} /&gt;
            </div>
        </section>

        <!-- 04. Tuples as Map Keys -->
        <section id="map-keys" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-purple-600 dark:text-purple-500">04.</span>
                The Killer Feature: Composite Map Keys
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Previously, using an object as a Map key relied on its reference. You couldn't create a "fresh" object and look up a value. With Records, <strong>Value Object</strong> keys are finally possible.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="p-6 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
                     <h3 class="font-bold text-red-600 mb-2">Before (Broken)</h3>
                     <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
const cache = new Map();
cache.set({x:1, y:2}, "Hit!");

// Returns undefined because this object 
// is a DIFFERENT reference
cache.get({x:1, y:2}); // ❌ undefined
                     </pre>
                 </div>
                 <div class="p-6 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/20">
                     <h3 class="font-bold text-green-600 mb-2">After (Works)</h3>
                     <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
const cache = new Map();
cache.set(#{x:1, y:2}, "Hit!");

// Works because the Record is compared 
// by value, not reference
cache.get(#{x:1, y:2}); // ✅ "Hit!"
                     </pre>
                 </div>
            </div>
        </section>

        <!-- 05. Structural Sharing -->
        <section id="structural-sharing" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-purple-600 dark:text-purple-500">05.</span>
                How it Works: Structural Sharing
            </h2>
            <div class="bg-slate-100 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                 <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    You might think identifying two deep objects as "equal" is slow (O(N) recursion). But engine implementers use <strong>Structural Sharing</strong>. 
                </p>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                    When you modify a Record: <code>const newRec = #{ ...oldRec, b: 2 }</code><br/>
                    The engine doesn't copy the entire tree. It points <code>newRec</code> to the same memory locations as <code>oldRec</code> for all unchanged properties. 
                    Comparison is often as fast as O(1) hashing or pointer checking for shared sub-trees.
                </p>
            </div>
        </section>

        <!-- 06. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-purple-600 dark:text-purple-500">06.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-purple-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation Details Matter</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Under the hood, engines like V8 use "structural sharing" (similar to Immutable.js tries) to keep memory usage low. 
                    <br/><br/>
                    <strong>Warning:</strong> Records & Tuples are strictly immutable. You cannot mutate them. If you need mutation, you must create a new version (spread operator works: <code>#{ ...old, newProp: 1 }</code>).
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';

// ⚖️ Equality Visualizer

export default function EqualityDemo() {
    const [mode, setMode] = useState('record'); // object | record
    
    // Simulating objects created in memory
    // In React state, these would be new references on every render if defined inline
    // We simulate "checking equality" between two identical looking items
    
    const objA = { id: 1, config: { color: 'red' } };
    const objB = { id: 1, config: { color: 'red' } };
    
    // Visual representation of Memory Address
    const addrA = "0x001F"; // Fake
    const addrB = "0x00A4"; // Fake for Object, same for Record simulation logic
    
    // For Records, the engine effectively treats them as the same value
    const isRecord = mode === 'record';
    const areEqual = isRecord; 

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-purple-500">⚖️</span> Equality Check
                </h3>
                <div className="flex bg-slate-200 dark:bg-slate-900 p-1 rounded-xl">
                    <button 
                        onClick={() => setMode('object')}
                        className={\`px-6 py-2 rounded-lg font-bold text-sm transition-all \${mode === 'object' ? 'bg-white dark:bg-slate-800 shadow text-gray-600' : 'text-slate-500'}\`}
                    >
                        Regular Object {}
                    </button>
                    <button 
                        onClick={() => setMode('record')}
                        className={\`px-6 py-2 rounded-lg font-bold text-sm transition-all \${mode === 'record' ? 'bg-white dark:bg-slate-800 shadow text-purple-500' : 'text-slate-500'}\`}
                    >
                        Record #{}
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            
                {/* Item A */}
                <div className="relative p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg w-64 text-center">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-200 dark:bg-slate-700 px-2 py-1 rounded text-[10px] font-mono font-bold text-gray-500">
                        {isRecord ? 'Value: #{...}' : \`Ref: \${addrA}\`}
                    </div>
                    <div className="mx-auto mb-4 text-4xl">
                        {isRecord ? '📦' : '📦'} 
                    </div>
                    <pre className="text-left text-xs bg-slate-100 dark:bg-black p-2 rounded">
{isRecord ? '#{' : '{'}
  id: 1, 
  color: 'red' 
{isRecord ? '}' : '}'}
                    </pre>
                </div>

                {/* Operator */}
                <div className="text-2xl font-black text-gray-300">
                    ===
                </div>

                {/* Item B */}
                 <div className="relative p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg w-64 text-center">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-200 dark:bg-slate-700 px-2 py-1 rounded text-[10px] font-mono font-bold text-gray-500">
                         {isRecord ? 'Value: #{...}' : \`Ref: \${addrB}\`}
                    </div>
                    <div className="mx-auto mb-4 text-4xl">
                        {isRecord ? '📦' : '📦'}
                    </div>
                    <pre className="text-left text-xs bg-slate-100 dark:bg-black p-2 rounded">
{isRecord ? '#{' : '{'}
  id: 1, 
  color: 'red' 
{isRecord ? '}' : '}'}
                    </pre>
                </div>

            </div>
            
            {/* Result */}
            <div className={\`mt-10 p-6 rounded-2xl flex items-center justify-center gap-4 text-2xl font-black border-2 \${
                areEqual 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-600' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-600'
            }\`}>
                <span className="text-3xl">{areEqual ? '✅' : '❌'}</span>
                {areEqual ? 'TRUE' : 'FALSE'}
            </div>
            
             <p className="text-center mt-4 text-gray-500 text-sm">
                {isRecord 
                    ? "Records compare by their content. Since the content is identical, they are equal." 
                    : "Objects compare by reference (memory address). Even if content is identical, they are different instances."}
            </p>

        </div>
    );
}
`
};

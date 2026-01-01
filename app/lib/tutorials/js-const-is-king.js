export const jsConstIsKing = {
    title: "The Death of var and the Retirement of let",
    description: "Stop mutating variables. Learn why Senior Engineers default to 'const' for 99% of declarations and how Immutability leads to fewer bugs.",
    slug: "js-const-is-king",
    category: "JavaScript",
    type: "static",
    author: "Clean Code Advocate",
    createdAt: new Date().toISOString(),
    readTime: "10 min read",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2555&auto=format&fit=crop",
    tags: ["JavaScript", "Clean Code", "Best Practices", "ES6"],
    keywords: ["JavaScript const vs let", "var vs let vs const", "Immutability JavaScript", "Clean Code JS", "Functional Programming"],
    toc: [
        { id: "var-is-dead", label: "01. var is Dead" },
        { id: "let-is-retired", label: "02. let is (mostly) Retired" },
        { id: "const-mindset", label: "03. The const Mindset" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. var is Dead -->
        <section id="var-is-dead" class="scroll-mt-32">
             <div class="border-l-8 border-gray-600 bg-gray-50 dark:bg-gray-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Delete <code>var</code>.
                </h1>
                <p class="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-light leading-relaxed">
                    It hoists. It leaks scope. It's confusing. There is literally zero reason to use <code>var</code> in 2026. If you see it in a PR, reject it.
                </p>
             </div>
        </section>

        <!-- 02. let is retired -->
        <section id="let-is-retired" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-gray-600 dark:text-gray-500">02.</span>
                Avoid <code>let</code>
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    "But I need to change the value loop!" <br/>
                    Do you? Or do you need <code>map()</code> or <code>reduce()</code>?
                    <br/><br/>
                    Every time you use <code>let</code>, you introduce state mutation. Mutation is the root of complex bugs.
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-500 mb-2">// ❌ Bad (Mutation)</div>
                 <div class="text-purple-400">let</div> total = 0; <br/>
                 <div class="text-purple-400">for</div> (<div class="text-purple-400">const</div> x <div class="text-purple-400">of</div> items) {'{'} <br/>
                 &nbsp;&nbsp;total += x.price; <br/>
                 {'}'} <br/><br/>
                 
                 <div class="text-gray-500">// ✅ Good (Immutable Expression)</div>
                 <div class="text-purple-400">const</div> total = items.reduce((acc, x) => acc + x.price, 0);
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-gray-600 dark:text-gray-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-gray-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Reassignment != Mutation</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Remember: <code>const</code> prevents reassignment, not mutation of the object content. 
                    <br/><br/>
                    <code>const x = []</code> means you can't say <code>x = somethingElse</code>, but you CAN say <code>x.push(1)</code>.
                    For true immutability, use <code>Object.freeze()</code> or the new Records & Tuples.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';
import { Lock, Unlock, AlertTriangle, CheckCircle } from 'lucide-react';

// 🔒 Const Visualizer

export default function ConstDemo() {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-gray-500">🔒</span> Immutable Mindset
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-4 right-4 text-red-300 group-hover:text-red-500 transition-colors">
                        <Unlock size={32} />
                    </div>
                    <div className="font-mono text-xl font-bold text-red-600 mb-2">var</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Function scoped. Hoisted. Can be re-declared.
                    </p>
                    <div className="mt-4 text-xs font-bold text-red-500 flex items-center gap-2">
                        <AlertTriangle size={14} /> DANGER: SCOPE LEAK
                    </div>
                </div>

                <div className="p-6 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/20 rounded-xl relative overflow-hidden">
                     <div className="absolute top-4 right-4 text-yellow-300">
                        <Unlock size={32} />
                    </div>
                    <div className="font-mono text-xl font-bold text-yellow-600 mb-2">let</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Block scoped. Can be re-assigned. Use only for loop counters.
                    </p>
                     <div className="mt-4 text-xs font-bold text-yellow-600 opacity-60">
                        ACCEPTABLE: CONTROL FLOW
                    </div>
                </div>

                <div className="p-6 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/20 rounded-xl relative overflow-hidden shadow-lg scale-105 ring-2 ring-green-500 ring-opacity-50">
                     <div className="absolute top-4 right-4 text-green-500">
                        <Lock size={32} />
                    </div>
                    <div className="font-mono text-xl font-bold text-green-600 mb-2">const</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Block scoped. Cannot be re-assigned. The default choice.
                    </p>
                    <div className="mt-4 text-xs font-bold text-green-600 flex items-center gap-2">
                        <CheckCircle size={14} /> PREFERRED: 99%
                    </div>
                </div>

            </div>
        </div>
    );
}
`
};

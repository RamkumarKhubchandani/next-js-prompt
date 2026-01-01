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
                    It hoists. It leaks scope. It's confusing. There is literally zero reason to use <code>var</code> in 2026. If you see it in a PR, reject it immediately.
                </p>
             </div>

             <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert mb-8">
                 <h3 class="text-2xl font-bold">The \`var\` Disaster</h3>
                 <p>
                     <code>var</code> doesn't respect code blocks. It "hoists" itself to the top of the function or global scope, leading to variables existing before you declare them.
                 </p>
             </div>
             <pre class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto text-gray-100">
<span class="text-gray-500">// ❌ The Hoisting Nightmare</span>
console.log(x); <span class="text-gray-500">// undefined (Not ReferenceError!)</span>
<span class="text-purple-400">var</span> x = 5;

<span class="text-purple-400">if</span> (true) {
  <span class="text-purple-400">var</span> y = 10;
}
console.log(y); <span class="text-gray-500">// 10 (Leaked out of the if block!)</span></pre>
        </section>

        <!-- 02. let is retired -->
        <section id="let-is-retired" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-gray-600 dark:text-gray-500">02.</span>
                Avoid <code>let</code>
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert mb-8">
                <h3 class="text-2xl font-bold">The \`let\` Trap</h3>
                <p>
                    "But I need to change the value in a loop!" <br/>
                    Do you? Or do you actually need <code>map()</code> or <code>reduce()</code>?
                    <br/><br/>
                    Every time you use <code>let</code>, you introduce <strong>state mutation</strong>. The value changes over time. This forces your brain to track the state history of a variable as you read the code.
                </p>
            </div>
             <pre class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto text-gray-100">
<span class="text-gray-500">// ❌ Bad (Imperative Mutation)</span>
<span class="text-purple-400">let</span> total = 0;
<span class="text-purple-400">for</span> (<span class="text-purple-400">const</span> x <span class="text-purple-400">of</span> items) {
  total += x.price; <span class="text-gray-500">// State changes N times!</span>
}

<span class="text-gray-500">// ✅ Good (Declarative Expression)</span>
<span class="text-purple-400">const</span> total = items.reduce((acc, x) => acc + x.price, 0);</pre>
            <div class="bg-yellow-900/10 border-l-4 border-yellow-500 p-6 mt-6">
                 <h4 class="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Deep Dive: Temporal Dead Zone (TDZ)</h4>
                 <p class="text-gray-700 dark:text-gray-300 text-sm">
                     Unlike <code>var</code>, which hoists as <code>undefined</code>, <code>let</code> and <code>const</code> hoist but are placed in the <strong>TDZ</strong> until the execution reaches their declaration line.
                     <br/><br/>
                     Accessing them early throws a <code>ReferenceError</code>. This "fail-fast" behavior prevents subtle bugs caused by using variables before they exist.
                 </p>
            </div>
        </section>

        <!-- 03. const Mindset -->
        <section id="const-mindset" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-gray-600 dark:text-gray-500">03.</span>
                The <code>const</code> Kingdom
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert mb-8">
                <p>
                    <code>const</code> is a signal to other developers: "This reference will never change." It reduces cognitive load. You define it, assign it, and trust it forever.
                </p>
                <h3 class="text-xl font-bold mt-6 mb-4">Comparison Table</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                                <th class="p-4 font-black">Keyword</th>
                                <th class="p-4 font-black">Reassignable?</th>
                                <th class="p-4 font-black">Scope</th>
                                <th class="p-4 font-black">Verdict</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-red-50 dark:bg-red-900/10">
                                <td class="p-4 font-mono text-red-600">var</td>
                                <td class="p-4">Yes</td>
                                <td class="p-4">Function</td>
                                <td class="p-4 text-red-600 font-bold">DELETE</td>
                            </tr>
                            <tr class="bg-yellow-50 dark:bg-yellow-900/10">
                                <td class="p-4 font-mono text-yellow-600">let</td>
                                <td class="p-4">Yes</td>
                                <td class="p-4">Block</td>
                                <td class="p-4 text-yellow-600 font-bold">USE RARELY</td>
                            </tr>
                            <tr class="bg-green-50 dark:bg-green-900/10">
                                <td class="p-4 font-mono text-green-600">const</td>
                                <td class="p-4">No</td>
                                <td class="p-4">Block</td>
                                <td class="p-4 text-green-600 font-bold">DEFAULT</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
                <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert mb-4 leading-relaxed">
                    <p>
                        Remember: <code>const</code> prevents reassignment, not mutation of the object content. 
                        <br/>
                        <code>const x = []</code> means you can't say <code>x = somethingElse</code>, but you CAN say <code>x.push(1)</code>.
                    </p>
                    <p>
                        For true immutability, use <code>Object.freeze()</code> or the new Records & Tuples.
                    </p>
                </div>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';

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
                        <span className="text-3xl">🔓</span>
                    </div>
                    <div className="font-mono text-xl font-bold text-red-600 mb-2">var</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Function scoped. Hoisted. Can be re-declared.
                    </p>
                    <div className="mt-4 text-xs font-bold text-red-500 flex items-center gap-2">
                        <span>⚠️</span> DANGER: SCOPE LEAK
                    </div>
                </div>

                <div className="p-6 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/20 rounded-xl relative overflow-hidden">
                     <div className="absolute top-4 right-4 text-yellow-300">
                        <span className="text-3xl">🔓</span>
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
                        <span className="text-3xl">🔒</span>
                    </div>
                    <div className="font-mono text-xl font-bold text-green-600 mb-2">const</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Block scoped. Cannot be re-assigned. The default choice.
                    </p>
                    <div className="mt-4 text-xs font-bold text-green-600 flex items-center gap-2">
                        <span>✅</span> PREFERRED: 99%
                    </div>
                </div>

            </div>
        </div>
    );
}
`
};

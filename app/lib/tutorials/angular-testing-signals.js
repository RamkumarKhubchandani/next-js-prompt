export const angularTestingSignals = {
    title: "Testing Signals: Fast Unit Tests in 2026",
    description: "Jasmine and Karma are slow. Learn how to test Angular Signals using modern Jest/Vitest patterns. No more quirky `fixture.detectChanges()` spam.",
    slug: "angular-testing-signals",
    category: "Angular",
    type: "static",
    author: "Test Engineer",
    createdAt: new Date().toISOString(),
    readTime: "15 min read",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2574&auto=format&fit=crop",
    tags: ["Angular", "Testing", "Signals", "Jest", "Vitest"],
    keywords: ["Angular Signal Testing", "TestBed.flushEffects", "Jest Angular", "Signal Testing Patterns", "Unit Testing"],
    toc: [
        { id: "async-nightmare", label: "01. The Async Nightmare" },
        { id: "synchronous-signals", label: "02. Synchronous Signals" },
        { id: "mocks", label: "03. Mocks are Easy" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Async Nightmare -->
        <section id="async-nightmare" class="scroll-mt-32">
             <div class="border-l-8 border-green-600 bg-green-50 dark:bg-green-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Stop using <code>fakeAsync</code>.
                </h1>
                <p class="text-xl md:text-2xl text-green-800 dark:text-green-200 font-light leading-relaxed">
                    Testing Observables was painful. You needed <code>marbles</code>, <code>tick()</code>, and complex async schedulers.
                    <br/><br/>
                    <strong>Signals</strong> are synchronous by default. You set a value, and the computed updates instantly (or lazily upon access). The test code reads like a story.
                </p>
             </div>
        </section>

        <!-- 02. Synchronous Signals -->
        <section id="synchronous-signals" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-green-600 dark:text-green-500">02.</span>
                Direct Access
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    No subscription needed. Just call the signal function.
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// counter.component.spec.ts</div>
                 <div class="text-purple-400">it</div>(<span class="text-green-400">'should double the count'</span>, () => {'{'} <br/>
                 &nbsp;&nbsp;component.count.set(2); <br/>
                 &nbsp;&nbsp;TestBed.flushEffects(); <span class="text-gray-500">// Run effect() blocks</span> <br/>
                 &nbsp;&nbsp;<div class="text-purple-400">expect</div>(component.doubleCount()).toBe(4); <br/>
                 {'}'});
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-green-600 dark:text-green-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-green-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Effect Testing</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Normally, you shouldn't granularly test <code>effect()</code> logic as it's implementation detail. Focus on testing the <strong>Computed</strong> results.
                    <br/><br/>
                    If you must test an effect (e.g. it writes to localStorage), you must call <code>TestBed.flushEffects()</code> because effects schedule asynchronously.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';
import { Play, CheckCircle, Clock } from 'lucide-react';

// 🧪 Test Runner Visualizer

export default function TestDemo() {
    const [state, setState] = useState('idle'); // idle, running, passed
    
    const runTest = async () => {
        setState('running');
        await wait(600);
        setState('passed');
    };

    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-green-500">🧪</span> Test Runner (Vitest)
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Code Block */}
                <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm relative overflow-hidden text-gray-300 border border-gray-800">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex items-center px-4 text-xs text-gray-400">
                        user.store.spec.ts
                    </div>
                    <div className="mt-6 space-y-1">
                        <div className="text-purple-400">it(<span className="text-green-400">'updates computed'</span>, () => {'{'}</div>
                        <div className="pl-4">store.users.set([ 'A', 'B' ]);</div>
                        <div className="pl-4 text-gray-500">// No manual "tick()" needed!</div>
                        <div className="pl-4">expect(store.count()).toBe(2);</div>
                        <div className="text-purple-400">{'}'});</div>
                    </div>
                </div>

                {/* Status */}
                <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    {state === 'idle' && (
                         <div className="text-center">
                             <Play size={48} className="mx-auto text-gray-300 mb-4" />
                             <button onClick={runTest} className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition">
                                 Run Test
                             </button>
                         </div>
                    )}
                    {state === 'running' && (
                         <div className="text-center">
                             <Clock size={48} className="mx-auto text-yellow-500 animate-spin mb-4" />
                             <p className="font-bold text-gray-700 dark:text-white">Executing...</p>
                         </div>
                    )}
                    {state === 'passed' && (
                         <div className="text-center animate-in zoom-in">
                             <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                             <p className="font-bold text-2xl text-green-600 dark:text-green-400">PASSED</p>
                             <p className="text-sm text-gray-400 mt-2">Duration: 4ms</p>
                             <button onClick={() => setState('idle')} className="mt-6 text-xs text-gray-500 underline">Reset</button>
                         </div>
                    )}
                </div>

            </div>
        </div>
    );
}
`
};

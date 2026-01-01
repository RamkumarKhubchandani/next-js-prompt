export const patternMatchingJs = {
    title: "Pattern Matching in JS: Goodbye switch, Hello Clean Code",
    description: "Discover the most anticipated JavaScript feature that revolutionizes control flow. Learn how Pattern Matching replaces complex switch statements and nested transitions with elegant, readable logic.",
    slug: "pattern-matching-js",
    category: "JavaScript",
    type: "static",
    author: "Senior JS Architect",
    createdAt: new Date().toISOString(),
    readTime: "15 min read",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2574&auto=format&fit=crop",
    tags: ["JavaScript", "ES2026", "Clean Code", "Pattern Matching", "Functional Programming"],
    keywords: ["JS Pattern Matching", "match expression", "switch vs match", "clean code", "redux alternatives"],
    toc: [
        { id: "evolution", label: "01. The Evolution of Control Flow" },
        { id: "syntax", label: "02. The Match Operator Syntax" },
        { id: "vs-switch", label: "03. Match vs Switch" },
        { id: "redux", label: "04. Reducers Reimagined" },
        { id: "senior-perspective", label: "05. Senior Engineer's Perspective" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. The Evolution -->
        <section id="evolution" class="scroll-mt-32">
             <div class="border-l-8 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Statements are Dead.<br/>
                    <span class="text-indigo-600 dark:text-indigo-400">Long Live Expressions.</span>
                </h1>
                <p class="text-xl md:text-2xl text-indigo-800 dark:text-indigo-200 font-light leading-relaxed">
                    For 25 years, we've wrestled with <code>switch</code> case fallthroughs and nested <code>if/else</code> pyramids. 
                    <br/><br/>
                    The <strong>Pattern Matching</strong> proposal is finally here to bring structural matching to JavaScript, turning complex imperative checks into declarative, value-returning expressions.
                </p>
             </div>
        </section>

        <!-- 02. Syntax -->
        <section id="syntax" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-indigo-600 dark:text-indigo-500">02.</span>
                The Match Syntax
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert mb-8">
                <p>
                    Unlike <code>switch</code>, the <code>match</code> construct is an expression. It returns a value. It matches based on the <strong>shape</strong> and <strong>content</strong> of data, not just equality.
                </p>
            </div>
             <div class="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-xl border border-indigo-200 dark:border-indigo-900/30 mb-8">
                <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-2">The Basic Structure</h4>
                <pre class="whitespace-pre-wrap font-mono text-gray-700 dark:text-gray-300">
const result = match (response) {
  { status: 200, data } => handleSuccess(data),
  { status: 404 }       => handleError("Not Found"),
  { status: 500 }       => retryRequest(),
  _                     => handleUnknown()
};
                </pre>
            </div>
        </section>

        <!-- 03. Match vs Switch -->
        <section id="vs-switch" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-indigo-600 dark:text-indigo-500">03.</span>
                Switch vs. Match
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="p-6 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                    <h3 class="text-xl font-bold text-red-700 dark:text-red-400 mb-4">The Old Way (Switch)</h3>
                    <ul class="space-y-3 text-red-800 dark:text-red-200 list-disc pl-5">
                        <li>Verbose <code>break</code> statements needed.</li>
                        <li>Accidental fallthrough bugs.</li>
                        <li>Not an expression (cannot assign result directly).</li>
                        <li>Only matches primitive values strictly.</li>
                    </ul>
                </div>
                <div class="p-6 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20">
                    <h3 class="text-xl font-bold text-green-700 dark:text-green-400 mb-4">The New Way (Match)</h3>
                    <ul class="space-y-3 text-green-800 dark:text-green-200 list-disc pl-5">
                        <li>Concise, arrow-function syntax.</li>
                        <li>Exhaustive checking (ensures all cases covered).</li>
                        <li>Returns a value automatically.</li>
                        <li>Matches object shapes, arrays, and types.</li>
                    </ul>
                </div>
            </div>

            <div class="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Real-World Refactor: User Reducer</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Switch -->
                    <div class="bg-gray-100 dark:bg-[#1a1c1e] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                        <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Legacy (Switch)</h4>
                        <pre class="text-xs font-mono text-gray-800 dark:text-gray-300 overflow-x-auto">
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        data: action.payload 
      };
    case 'FETCH_ERROR':
      return { 
        ...state, 
        loading: false, 
        error: action.error 
      };
    default:
      return state;
  }
}</pre>
                    </div>

                    <!-- Match -->
                    <div class="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-xl border border-indigo-200 dark:border-indigo-900/20 relative group">
                        <h4 class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4">Modern (Match)</h4>
                        <pre class="text-xs font-mono text-gray-800 dark:text-gray-300 overflow-x-auto">
const reducer = (state, action) => match (action) {
  { type: 'FETCH_SUCCESS', payload } => ({ 
    ...state, 
    loading: false, 
    data: payload 
  }),
  { type: 'FETCH_ERROR', error } => ({ 
    ...state, 
    loading: false, 
    error 
  }),
  _ => state
};</pre>
                    </div>
                </div>
            </div>
        </section>

         <!-- 04. Redux Reducers -->
        <section id="redux" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-indigo-600 dark:text-indigo-500">04.</span>
                Redux Reducers Reimagined
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert mb-8">
                <p>
                   One of the best use cases for Pattern Matching is in state reducers. Gone are the days of massive switch statements with block scoping issues.
                </p>
                <p>
                    With <code>match</code>, reducers become pure data transformation pipelines that are easier to read and test.
                </p>
            </div>
        </section>

        <!-- 05. Senior Perspective -->
        <section id="senior-perspective" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-indigo-600 dark:text-indigo-500">05.</span>
                The Senior Engineer's Perspective
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-indigo-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Is it ready for production?</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    As of 2026, Pattern Matching is Stage 4 and fully supported in modern Node.js and browsers. 
                    However, for library authors, continue to transpile or offer fallbacks if you validly support legacy environments (though you shouldn't need to support IE11 anymore!).
                </p>
                <div class="mt-6 flex flex-col gap-4">
                     <div class="flex items-start gap-4">
                        <div class="p-2 bg-indigo-500 rounded-lg text-white font-bold text-xs uppercase tracking-wider">Pros</div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Drastically reduces cognitive load. Makes state machines first-class citizens.</p>
                     </div>
                     <div class="flex items-start gap-4">
                        <div class="p-2 bg-pink-500 rounded-lg text-white font-bold text-xs uppercase tracking-wider">Cons</div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">New syntax learning curve for junior devs. Debugging match failures can be tricky initially.</p>
                     </div>
                </div>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';


// 🧬 Pattern Matching Operator Playground

export default function PatternMatchingDemo() {
    const [requestState, setRequestState] = useState('idle'); // idle, loading, success, error

    // Simulation of the 'match' logic (since it's syntax, we simulate the result visually)
    const getResult = (state) => {
        // Pseudo-code for visualization:
        // match (state) {
        //    'idle' => <IdleUI />,
        //    'loading' => <LoadingUI />,
        //    'success' => <SuccessUI />,
        //    'error' => <ErrorUI />
        // }
        
        switch (state) {
            case 'idle': return { text: "System Standby", color: "text-gray-500", bg: "bg-gray-100 dark:bg-gray-800", icon: <span className="text-2xl">📦</span> };
            case 'loading': return { text: "Processing Data...", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", icon: <span className="text-2xl animate-spin">⚡</span> };
            case 'success': return { text: "Action Completed", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30", icon: <span className="text-2xl">✅</span> };
            case 'error': return { text: "Critical Failure", color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30", icon: <span className="text-2xl">🛑</span> };
            default: return { text: "Unknown", color: "text-gray-500", bg: "bg-gray-100", icon: <span className="text-2xl">❓</span> };
        }
    };

    const current = getResult(requestState);

    return (
        <div className="p-8 bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-12">
            
                {/* Input Side (The State) */}
                <div className="w-full md:w-1/3 space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="text-2xl">📦</span> Input State
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-3">
                        {['idle', 'loading', 'success', 'error'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setRequestState(s)}
                                className={\`px-4 py-3 rounded-xl border text-left font-medium transition-all \${
                                    requestState === s 
                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20' 
                                    : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                                }\`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="capitalize">{s}</span>
                                    {requestState === s && <span>→</span>}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Match Expression Visualization */}
                <div className="flex-1 space-y-6">
                     <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="text-2xl">⚡</span> Pattern Matcher
                    </h3>
                    
                    {/* Code Block Representation */}
                    <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm shadow-inner relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                        
                        <div className="text-gray-400 mb-2">// 2026 Syntax</div>
                        <div className="text-purple-400">match <span className="text-white">({'requestState'})</span> {'{'}</div>
                        
                        <div className="pl-6 space-y-2 my-2">
                            <div className={\`transition-opacity duration-300 \${requestState === 'idle' ? 'opacity-100' : 'opacity-30'}\`}>
                                <span className="text-green-400">'idle'</span> <span className="text-gray-500">=&gt;</span> <span className="text-yellow-300">standby()</span>
                            </div>
                            <div className={\`transition-opacity duration-300 \${requestState === 'loading' ? 'opacity-100' : 'opacity-30'}\`}>
                                <span className="text-green-400">'loading'</span> <span className="text-gray-500">=&gt;</span> <span className="text-yellow-300">showSpinner()</span>
                            </div>
                            <div className={\`transition-opacity duration-300 \${requestState === 'success' ? 'opacity-100' : 'opacity-30'}\`}>
                                <span className="text-green-400">'success'</span> <span className="text-gray-500">=&gt;</span> <span className="text-yellow-300">confetti()</span>
                            </div>
                            <div className={\`transition-opacity duration-300 \${requestState === 'error' ? 'opacity-100' : 'opacity-30'}\`}>
                                <span className="text-green-400">_</span> <span className="text-gray-500">=&gt;</span> <span className="text-red-400">crash()</span>
                            </div>
                        </div>
                        
                        <div className="text-purple-400">{'}'}</div>
                    </div>

                    {/* Output Result */}
                    <div className={\`p-6 rounded-2xl flex items-center gap-4 border transition-all duration-500 \${current.bg} \${current.color} border-current/20\`}>
                        <div className="p-3 bg-white dark:bg-black/20 rounded-full shadow-sm">
                            {current.icon}
                        </div>
                        <div>
                            <div className="text-xs font-bold uppercase tracking-wider opacity-70">Result</div>
                            <div className="text-2xl font-black">{current.text}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
`
};

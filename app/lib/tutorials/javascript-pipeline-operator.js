export const javascriptPipelineOperator = {
    title: "JavaScript Pipeline Operator (|>): The 2026 Deep Dive 🌊",
    description: "Nest no more. The definitive guide to the most requested JS feature of the decade. From Hack-style syntax to Async Pipelines, Error Monads, and architectural patterns.",
    slug: "javascript-pipeline-operator",
    category: "JavaScript",
    type: "static",
    author: "TC39 Observer",
    createdAt: new Date().toISOString(),
    readTime: "30 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    tags: ["JavaScript", "ES2026", "Functional Programming", "Pipeline Operator", "Software Architecture"],
    keywords: ["Pipeline Operator", "|>", "Hack Pipes", "JavaScript Async Pipeline", "Clean Code Examples", "Babel Configuration"],
    toc: [
        { id: "cognitive-tax", label: "01. The Cognitive Tax" },
        { id: "history-syntax", label: "02. History & Syntax" },
        { id: "real-world-data", label: "03. Data Transformation" },
        { id: "async-pipelines", label: "04. Async & Await Management" },
        { id: "safe-pipelines", label: "05. Safe Pipelines (Error Handling)" },
        { id: "architectural-patterns", label: "06. Architectural Patterns" },
        { id: "senior-takeaway", label: "07. Senior Engineer Takeaway" },
        { id: "pipeline-simulation", label: "08. The Pipeline Simulator" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. The Cognitive Tax -->
        <section id="cognitive-tax" class="scroll-mt-32">
             <div class="border-l-8 border-cyan-500 bg-cyan-50 dark:bg-cyan-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h2 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "We read code from Left to Right."
                </h2>
                <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-6">
                    Yet, standard JavaScript forces us to write logic inside-out. The "Nesting Hell" is not just ugly; it incurs a massive cognitive tax on every developer who reads it.
                </p>
             </div>
             
             <div class="flex flex-col md:flex-row gap-8 items-center">
                 <div class="flex-1 bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl border border-red-100 dark:border-red-900/10 w-full">
                     <h3 class="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-widest mb-4">Backward (Standard JS)</h3>
                     <code class="text-lg md:text-xl font-mono block leading-relaxed text-gray-800 dark:text-gray-200">
                         const result = <span class="text-red-500">save</span>(<br/>
                         &nbsp;&nbsp;<span class="text-orange-500">validate</span>(<br/>
                         &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-yellow-500">format</span>(<br/>
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-green-500">parse</span>(input)<br/>
                         &nbsp;&nbsp;&nbsp;&nbsp;)<br/>
                         &nbsp;&nbsp;)<br/>
                         );
                     </code>
                 </div>
                 <div class="hidden md:block text-4xl text-gray-300">➜</div>
                 <div class="flex-1 bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl border border-green-100 dark:border-green-900/10 w-full">
                     <h3 class="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-4">Forward (Pipeline JS)</h3>
                     <code class="text-lg md:text-xl font-mono block leading-relaxed text-gray-800 dark:text-gray-200">
                         const result = input<br/>
                         &nbsp;&nbsp;<span class="text-green-500">|> parse(%)</span><br/>
                         &nbsp;&nbsp;<span class="text-yellow-500">|> format(%)</span><br/>
                         &nbsp;&nbsp;<span class="text-orange-500">|> validate(%)</span><br/>
                         &nbsp;&nbsp;<span class="text-red-500">|> save(%);</span>
                     </code>
                 </div>
             </div>
        </section>

        <!-- 02. History & Syntax -->
        <section id="history-syntax" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">02.</span>
                History & The "Hack" Syntax
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                The proposal was stuck in "TC39 purgatory" for years due to a war between two syntaxes: <strong>F# Style</strong> (no placeholders) and <strong>Hack Style</strong> (using %). 
                <br/><br/>
                Hack Style won. Why? Because it supports n-ary functions, method calls, and object literals without anonymous function wrappers.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="p-6 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <h3 class="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">Method Calls</h3>
                    <pre class="text-sm font-mono text-gray-500 whitespace-pre-wrap">
const value = "hello"
  |> %.toUpperCase() // ✅ Direct access
  |> %.split('')
  |> %.join('-')</pre>
                </div>
                <div class="p-6 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <h3 class="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">Arithmetic & Objects</h3>
                    <pre class="text-sm font-mono text-gray-500 whitespace-pre-wrap">
const user = "John"
  |> { name: %, id: 1 } // ✅ Object literal
  |> %.name + " Doe"    // ✅ Arithmetic</pre>
                </div>
            </div>
        </section>

        <!-- 03. Real World Data -->
        <section id="real-world-data" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">03.</span>
                Real-World Data Processing
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                The most immediate use case is API response processing. Stop creating temporary variables like \`filteredUsers\`, \`mappedUsers\`, \`sortedUsers\`. Pipe it all in one immutable flow.
            </p>

            <div class="bg-gray-900 rounded-xl p-8 shadow-2xl relative">
                <div class="absolute top-0 right-0 p-4 opacity-50 text-xs font-mono text-gray-500">data-pipeline.js</div>
                <pre class="text-sm md:text-base font-mono text-gray-300 overflow-x-auto">
<span class="text-purple-400">const</span> <span class="text-blue-400">getLeaderboard</span> = (data) => 
  data
  <span class="text-cyan-400">|></span> Object.values(%) <span class="text-gray-500">// Convert Map to Array</span>
  <span class="text-cyan-400">|></span> %.filter(u => u.score > 0)
  <span class="text-cyan-400">|></span> %.map(u => ({ 
       ...u, 
       rank: calculateRank(u.score) 
     }))
  <span class="text-cyan-400">|></span> _.orderBy(%, ['score'], ['desc']) <span class="text-gray-500">// Lodash integration!</span>
  <span class="text-cyan-400">|></span> %.slice(0, 10);</pre>
            </div>
        </section>

        <!-- 04. Async pipelines -->
        <section id="async-pipelines" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">04.</span>
                Async Pipelines (|> await)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Handling async data usually involves messy \`.then()\` chains or disjointed \`await \` statements.
                The pipeline operator introduces \`|> await \` to handle Promises seamlessly within the chain.
            </p>

            <div class="bg-gray-900 rounded-xl p-8 shadow-2xl border-l-4 border-yellow-500 overflow-x-auto">
<pre class="text-sm md:text-base font-mono text-gray-300">
<span class="text-purple-400">const</span> <span class="text-blue-400">hydrateUser</span> = <span class="text-purple-400">async</span> (userId) => 
  userId
  <span class="text-cyan-400">|></span> db.users.findUnique(%) <span class="text-gray-500">// Returns Promise</span>
  <span class="text-cyan-400">|></span> <span class="text-purple-400">await</span> % <span class="text-gray-500">// Unwraps Promise!</span>
  <span class="text-cyan-400">|></span> enrichUserData(%)  <span class="text-gray-500">// Sync function</span>
  <span class="text-cyan-400">|></span> analytics.trackUser(%) <span class="text-gray-500">// Returns Promise</span>
  <span class="text-cyan-400">|></span> <span class="text-purple-400">await</span> %;</pre>
            </div>
        </section>

         <!-- 05. Safe Pipelines -->
        <section id="safe-pipelines" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">05.</span>
                Safe Pipelines (The Maybe Monad)
            </h2>
             <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                In a long pipeline, if one step returns \`null\` or throws, the whole thing blows up. 
                We can implement a simple **Safe Wrapper** (function composition) to handle errors gracefully without \`try/catch\` blocks everywhere.
            </p>
    <div class="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
        <h4 class="font-bold mb-4 text-cyan-600 dark:text-cyan-400">The Pattern</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
const safe = (fn) => (arg) => {
  if (arg === null || arg === undefined) return null;
            try { return fn(arg); } catch { return null; }
};

            // Usage
            input 
  |> safe(JSON.parse)(%) // If invalid JSON, returns null
  |> safe(processData)(%) // Skipped if previous was null!
  |> safe(saveToDb)(%);   // Skipped if previous was null!</pre>
    </div>
        </section>

        <!-- 06. Architectural Patterns -->
        <section id="architectural-patterns" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">06.</span>
                Architectural Patterns
            </h2>
            <div class="space-y-8">
                <div>
                     <h3 class="text-xl font-bold mb-2">The "Validation Chain" Pattern</h3>
                     <p class="text-gray-600 dark:text-gray-400">
                         Pipelines are perfect for linear validation logic. Each step accepts the object, checks a condition, and either returns the object or throws.
                     </p>
                </div>
                 <div>
                     <h3 class="text-xl font-bold mb-2">The "DOM Generator" Pattern</h3>
                     <p class="text-gray-600 dark:text-gray-400">
                         Instead of messy \`document.createElement\`, pipe the element through modifiers.
                     </p>
                      <pre class="p-4 bg-gray-100 dark:bg-slate-900 rounded-lg text-xs font-mono mt-2">
document.createElement('div')
  |> setClass(%, 'card p-4')
  |> appendText(%, 'Hello World')
  |> appendTo(%, document.body)</pre>
                </div>
            </div>
        </section>

        <!-- 07. Senior Takeaway -->
        <section id="senior-takeaway" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">07.</span>
                Senior Engineer Takeaway
            </h2>
            <div class="bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
                <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The biggest win isn't just fewer parentheses. It's <strong>Readability</strong>. 
                    Code is read 10x more than it is written. Pipelines make the *intent* of the data flow obvious instantly.
                </p>
                <div class="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20 text-blue-800 dark:text-blue-200 text-sm font-medium">
                    "Adopting the pipeline operator is a shift from 'Implementation Focus' (how the loop works) to 'Data Focus' (what happens to the data)."
                </div>
            </div>
        </section>

        <!-- 08. Simulation -->
    <section id="pipeline-simulation" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-cyan-600 dark:text-cyan-500">08.</span>
            The Pipeline Simulator
        </h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Visualize the transformation of data step-by-step. Notice how clean the flow is compared to nested function calls.
        </p>
    </section>

    </div>
`,
    code: `import React, { useState } from 'react';

// ==========================================
// ⛓️ Pipeline Architecture Visualizer
// ==========================================

export default function PipelineVisualizer() {
    const [input, setInput] = useState("  user_session_token_v2  ");
    const [activeStep, setActiveStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    // --- Simulation Functions (The Stations) ---
    const operations = {
        trim: (s) => s.trim(),
        normalize: (s) => s.toLowerCase().replace(/_/g, '-'),
        validate: (s) => s.length > 5 ?\`\${s} (Valid)\` : \`\${s} (Invalid)\`,
        encrypt: (s) => \`🔒 \${btoa(s).substring(0, 10)}...\`,
        wrap: (s) => \`{ "token": "\${s}" }\`
    };

    const steps = [
        { id: 0, fn: 'raw', name: 'Raw Input', desc: 'Data Entry', icon: <span>🗄️</span>, color: 'gray' },
        { id: 1, fn: 'trim', name: '|> trim(%)', desc: 'Remove whitespace', icon: <span>⬇️</span>, color: 'blue' },
        { id: 2, fn: 'normalize', name: '|> normalize(%)', desc: 'Snake to Kebab Case', icon: <span>🔄</span>, color: 'indigo' },
        { id: 3, fn: 'validate', name: '|> validate(%)', desc: 'Length Check', icon: <span>✅</span>, color: 'green' },
        { id: 4, fn: 'encrypt', name: '|> encrypt(%)', desc: 'Base64 Encoding', icon: <span>🛡️</span>, color: 'purple' },
        { id: 5, fn: 'wrap', name: '|> wrapDTO(%)', desc: 'JSON Structure', icon: <span>🧱</span>, color: 'cyan' },
    ];

    // --- Calculate Data at Each Step ---
    const getStepValue = (stepIndex) => {
        let val = input;
        if (stepIndex >= 1) val = operations.trim(val);
        if (stepIndex >= 2) val = operations.normalize(val);
        if (stepIndex >= 3) val = operations.validate(val);
        if (stepIndex >= 4) val = operations.encrypt(val);
        if (stepIndex >= 5) val = operations.wrap(val);
        return val;
    };

    const handleNext = () => setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
    const handleReset = () => { setActiveStep(0); setIsAutoPlaying(false); };
    
    // Auto-play effect
    React.useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveStep(prev => {
                if (prev >= steps.length - 1) {
                    setIsAutoPlaying(false);
                    return prev;
                }
                return prev + 1;
            });
        }, 800);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const currentValue = getStepValue(activeStep);

    // Color mapper
    const getColor = (color, intensity = 500) => {
        const map = {
            gray: \`text-gray-\${intensity} bg-gray-\${intensity === 500 ? 100 : 50}\`,
            blue: \`text-blue-\${intensity} bg-blue-\${intensity === 500 ? 100 : 50}\`,
            indigo: \`text-indigo-\${intensity} bg-indigo-\${intensity === 500 ? 100 : 50}\`,
            green: \`text-green-\${intensity} bg-green-\${intensity === 500 ? 100 : 50}\`,
            purple: \`text-purple-\${intensity} bg-purple-\${intensity === 500 ? 100 : 50}\`,
            cyan: \`text-cyan-\${intensity} bg-cyan-\${intensity === 500 ? 100 : 50}\`,
        };
        // Simplified for brevity in this prompt (tailwind safe-listing is complex)
        // Returning hardcoded classes for reliability in demo
        if (color === 'gray') return intensity === 500 ? 'text-gray-600 bg-gray-100 dark:bg-gray-900 border-gray-200' : 'bg-gray-50';
        if (color === 'blue') return intensity === 500 ? 'text-blue-600 bg-blue-100 dark:bg-blue-900 border-blue-200' : 'bg-blue-50';
        if (color === 'indigo') return intensity === 500 ? 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900 border-indigo-200' : 'bg-indigo-50';
        if (color === 'green') return intensity === 500 ? 'text-green-600 bg-green-100 dark:bg-green-900 border-green-200' : 'bg-green-50';
        if (color === 'purple') return intensity === 500 ? 'text-purple-600 bg-purple-100 dark:bg-purple-900 border-purple-200' : 'bg-purple-50';
        if (color === 'cyan') return intensity === 500 ? 'text-cyan-600 bg-cyan-100 dark:bg-cyan-900 border-cyan-200' : 'bg-cyan-50';
        return 'text-gray-600 bg-gray-100';
    };

    return (
        <div className="bg-slate-50 dark:bg-[#0f1115] p-6 lg:p-12 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl font-sans min-h-[800px] flex flex-col">
             
             {/* Header */}
             <div className="flex justify-between items-center mb-12">
                <div>
                     <h3 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <span className="text-cyan-500 font-mono text-4xl">|></span> Data Pipeline
                    </h3>
                    <p className="text-slate-500 mt-2 font-medium">Visualizing Functional Transformations</p>
                </div>
                <div className="hidden md:block bg-black/5 dark:bg-white/5 px-4 py-2 rounded-lg text-xs font-mono text-slate-500">
                    STATUS: <span className={isAutoPlaying ? "text-green-500 font-bold" : "text-slate-500"}>{isAutoPlaying ? "RUNNING" : "PAUSED"}</span>
                </div>
             </div>

             <div className="flex-1 flex flex-col xl:flex-row gap-12">
                 
                 {/* LEFT: The Assembly Line */}
                 <div className="flex-1 relative">
                     {/* The Conveyor Belt Line */}
                     <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 z-0 rounded-full"></div>
                     <div className="absolute left-8 top-0 bottom-0 w-1 bg-cyan-500 z-0 rounded-full transition-all duration-500 ease-out" style={{ height: \`\${(activeStep / (steps.length - 1)) * 100}%\` }}></div>

                     <div className="space-y-6 relative z-10 pb-10">
                         {steps.map((step, i) => (
                             <div 
                                key={i} 
                                onClick={() => { setActiveStep(i); setIsAutoPlaying(false); }}
                                className={\`group flex items-center gap-6 cursor-pointer transition-all duration-300 \${i > activeStep ? 'opacity-40 grayscale blur-[1px]' : 'opacity-100'}\`}
                             >
                                 {/* Node Orb */}
                                 <div className={\`w-16 h-16 rounded-2xl flex items-center justify-center border-4 shadow-xl transition-all duration-300 \${
                                     i === activeStep ? 'scale-110 border-cyan-500 bg-white dark:bg-slate-800 z-20' : 
                                     i < activeStep ? 'border-cyan-500/50 bg-cyan-500 text-white scale-90' : 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900'
                                 } \${getColor(step.color)}\`}>
                                     {step.icon}
                                 </div>

                                 {/* Card */}
                                 <div className={\`flex-1 p-5 rounded-2xl border transition-all duration-300 \${
                                     i === activeStep 
                                     ? 'bg-white dark:bg-[#1a1c20] border-cyan-500/50 shadow-2xl shadow-cyan-500/10 translate-x-2' 
                                     : 'bg-transparent border-transparent' 
                                 }\`}>
                                     <div className="flex justify-between items-center">
                                        <div>
                                            <code className={\`text-sm font-bold block mb-1 \${i==activeStep ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500'}\`}>{step.name}</code>
                                            <span className="text-xs text-slate-400 uppercase tracking-wider">{step.desc}</span>
                                        </div>
                                        {i === activeStep && <span className="text-cyan-500 animate-pulse text-xl">➡️</span>}
                                     </div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

                 {/* RIGHT: Controls & Inspector */}
                 <div className="w-full xl:w-[450px] flex flex-col gap-6 sticky top-6 self-start">
                     
                     {/* Control Deck */}
                     <div className="bg-white dark:bg-[#1a1c20] p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl">
                         <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Input Data Source</label>
                         <input 
                            type="text" 
                            value={input}
                            onChange={(e) => { setInput(e.target.value); setActiveStep(0); setIsAutoPlaying(false); }}
                            className="w-full bg-slate-100 dark:bg-black/50 border-0 rounded-xl p-4 font-mono text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500 mb-6 transition-all"
                         />

                         <div className="grid grid-cols-2 gap-3">
                             <button 
                                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                                className={\`col-span-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all \${isAutoPlaying ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/20 shadow-lg' : 'bg-green-500 text-white hover:bg-green-600 shadow-green-500/20 shadow-lg'}\`}
                             >
                                 {isAutoPlaying ? 'Pause' : 'Auto Play'}
                             </button>
                             <button 
                                onClick={handleNext} 
                                disabled={activeStep === steps.length - 1}
                                className="col-span-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold py-4 rounded-xl transition-all disabled:opacity-50"
                             >
                                 Next Step
                             </button>
                         </div>
                     </div>

                     {/* Live Inspector */}
                     <div className="flex-1 bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-inner relative overflow-hidden min-h-[300px] flex flex-col justify-center">
                         <div className="absolute top-0 right-0 left-0 h-1 bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
                         
                         <div className="text-center">
                             <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Current Value</div>
                             <div className="text-3xl md:text-4xl font-black text-white font-mono break-all animate-in zoom-in duration-300 key={activeStep}">
                                 "{getStepValue(activeStep)}"
                             </div>
                             <div className="mt-8 inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs font-mono">
                                 <span>⚡</span>
                                 Type: {typeof getStepValue(activeStep)}
                             </div>
                         </div>
                     </div>

                 </div>

             </div>
        </div>
    );
}
`};

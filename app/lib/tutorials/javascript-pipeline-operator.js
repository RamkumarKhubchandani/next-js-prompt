export const javascriptPipelineOperator = {
    title: "JavaScript Pipeline Operator (|>): Writing Code Like a Pro",
    description: "The Pipeline Operator is the missing piece for functional programming in JavaScript. Stop writing nested function calls that read backwards. Start streaming data left-to-right.",
    slug: "javascript-pipeline-operator",
    category: "JavaScript",
    type: "static",
    author: "Functional JS Enthusiast",
    createdAt: new Date().toISOString(),
    readTime: "15 min read",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    tags: ["JavaScript", "ES2026", "Functional Programming", "Pipeline Operator", "Clean Code"],
    keywords: ["Pipeline Operator", "|>", "Functional Composition", "Ramda replacement", "Clean JavaScript"],
    toc: [
        { id: "nesting-hell", label: "01. Nesting Hell" },
        { id: "pipeline-syntax", label: "02. The Pipeline Syntax" },
        { id: "real-world", label: "03. Real World Data Transformation" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Nesting Hell -->
        <section id="nesting-hell" class="scroll-mt-32">
             <div class="border-l-8 border-cyan-500 bg-cyan-50 dark:bg-cyan-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Read code the way you think.<br/>
                    <span class="text-cyan-600 dark:text-cyan-400">Left to Right.</span>
                </h1>
                <p class="text-xl md:text-2xl text-cyan-800 dark:text-cyan-200 font-light leading-relaxed">
                    Standard JavaScript forces us to read execution order from inside-out locally (nested functions) or top-to-bottom (intermediate variables).
                    <br/><br/>
                    The <strong>Pipeline Operator (|>)</strong> allows you to chain functions in a fluent manner, passing the result of the previous expression as the argument to the next.
                </p>
             </div>
        </section>

        <!-- 02. Syntax -->
        <section id="pipeline-syntax" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">02.</span>
                Visual Clarity
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="p-6 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                    <h3 class="text-xl font-bold text-red-700 dark:text-red-400 mb-4">The Old Way (Inside-Out)</h3>
                    <pre class="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
const result = 
  saveToDb(
    validate(
      normalize(
        parse(input)
      )
    )
  );

// Order: parse -> normalize -> validate -> save
// Reading direction: ⬅️ Left/Inwards
                    </pre>
                </div>
                <div class="p-6 rounded-xl bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-900/20">
                    <h3 class="text-xl font-bold text-cyan-700 dark:text-cyan-400 mb-4">The Pipeline Way (Flow)</h3>
                    <pre class="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
const result = input
  |> parse
  |> normalize
  |> validate
  |> saveToDb;

// Order: input -> parse -> ...
// Reading direction: ➡️ Right/Downwards
                    </pre>
                </div>
            </div>
        </section>

        <!-- 03. Real World -->
        <section id="real-world" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">03.</span>
                Real World Transformation
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                It really shines when doing data manipulation, like processing user input formatting strings.
            </p>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-cyan-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Why now?</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Functional programming concepts have been winning in the JS world for years (React, Redux, RxJS). The pipeline operator is the syntactical sugar that finally makes native functional composition readable for the masses.
                    <br/><br/>
                    It eliminates the need for utility libraries like <code>lodash/flow</code> or <code>ramda/pipe</code>, reducing bundle size and cognitive overhead.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';
import { ArrowDown, Database, FileText, CheckCircle, ShieldAlert, Play } from 'lucide-react';

// ⛓️ Pipeline Operator Playground

export default function PipelineDemo() {
    const [input, setInput] = useState("  user_input_string  ");
    const [step, setStep] = useState(0); 

    // Simulation functions
    const trim = (s) => s.trim();
    const capitalize = (s) => s.toUpperCase();
    const exclaim = (s) => s + "!!!";
    const encrypt = (s) => "🔒" + btoa(s);

    // Calculate steps mainly for visualization
    const steps = [
        { name: 'Input', val: input, icon: <FileText size={16} /> },
        { name: '|> trim', val: trim(input), icon: <ArrowDown size={16} /> },
        { name: '|> toUpperCase', val: capitalize(trim(input)), icon: <ArrowDown size={16} /> },
        { name: '|> addExclamation', val: exclaim(capitalize(trim(input))), icon: <ArrowDown size={16} /> },
        { name: '|> encrypt', val: encrypt(exclaim(capitalize(trim(input)))), icon: <ShieldAlert size={16} /> }
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="text-cyan-500">|></span> Pipeline Flow
            </h3>

            <div className="flex flex-col md:flex-row gap-12">
            
                {/* Code View */}
                <div className="w-full md:w-1/2">
                    <div className="bg-slate-900 rounded-xl p-6 shadow-2xl font-mono text-sm relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                         <div className="text-gray-500 mb-4">// Data Transformation Pipeline</div>
                         
                         <div className="text-blue-400">const <span className="text-white">result</span> = <span className="text-yellow-400">input</span></div>
                         
                         <div className="pl-4 space-y-3 mt-2">
                             {[1, 2, 3, 4].map((i) => (
                                 <div 
                                    key={i} 
                                    className={\`flex items-center gap-2 transition-all duration-300 \${step >= i ? 'text-cyan-400 opacity-100' : 'text-gray-600 opacity-50'}\`}
                                 >
                                     <span className="font-bold">|&gt;</span> 
                                     <span>{steps[i].name.replace('|>', '').trim()}</span>
                                     {step === i && <span className="animate-pulse text-white">⬅ processing</span>}
                                 </div>
                             ))}
                         </div>
                    </div>
                    
                    <div className="mt-8 flex gap-4">
                         <input 
                            type="text" 
                            value={input}
                            onChange={(e) => { setInput(e.target.value); setStep(0); }}
                            className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl outline-none focus:ring-2 ring-cyan-500"
                            placeholder="Type something..."
                         />
                         <button 
                            onClick={() => setStep(s => (s < 4 ? s + 1 : 0))}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all active:scale-95"
                         >
                            <Play size={18} fill="currentColor" /> {step === 4 ? 'Reset' : 'Next Step'}
                         </button>
                    </div>
                </div>

                {/* Visualization */}
                <div className="flex-1 space-y-4">
                    {steps.map((s, i) => (
                        <div 
                            key={i}
                            className={\`transition-all duration-500 transform \${
                                i <= step 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 -translate-x-8 pointer-events-none'
                            }\`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={\`w-8 h-8 rounded-full flex items-center justify-center \${i === 0 ? 'bg-gray-200 dark:bg-slate-800' : 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600'}\`}>
                                    {s.icon}
                                </div>
                                <div className="flex-1 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/20 shadow-sm">
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">{s.name}</div>
                                    <div className="text-lg font-mono font-bold text-gray-800 dark:text-white break-all">
                                        "{s.val}"
                                    </div>
                                </div>
                            </div>
                            {i < 4 && i < step && (
                                <div className="h-4 border-l-2 border-dashed border-gray-300 dark:border-slate-700 ml-4 my-1"></div>
                            )}
                        </div>
                    ))}
                    
                    {step === 4 && (
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
                            <CheckCircle className="text-green-500" />
                            <span className="font-bold text-green-700 dark:text-green-400">Pipeline Complete!</span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
`
};

export const typescriptAdvancedPatterns = {
    title: "TypeScript: The Defensive Guide (2026) 🛡️",
    description: "Move beyond `any`. Master the Turing Checklist of TypeScript: Discriminated Unions for state machines, Template Literals for DSLs, Conditional Types for utility libraries, and Branded Types for domain modeling.",
    slug: "typescript-advanced-patterns",
    type: "static",
    author: "Senior TypeScript Architect",
    createdAt: new Date().toISOString(),
    readTime: "45 min read",
    difficulty: "Expert",
    tags: ["TypeScript", "Patterns", "Generics", "Type Safety", "Domain Driven Design"],
    keywords: ["TypeScript Discriminated Unions", "Conditional Types Infer", "Template Literal Types", "Branded Types", "TypeScript Performance", "Zod Inference"],
    toc: [
        { id: "philosophy", label: "01. Type-Driven Design" },
        { id: "discriminated-unions", label: "02. Discriminated Unions (State)" },
        { id: "template-literals", label: "03. Template Literal DSLs" },
        { id: "conditional-logic", label: "04. Conditional Types & Infer" },
        { id: "branded-types", label: "05. Branded Types (Domain Safety)" },
        { id: "utility-types", label: "06. Advanced Utility Types" },
        { id: "runtime-validation", label: "07. Runtime Validation (Zod)" },
        { id: "performance-check", label: "08. Compiler Performance" },
        { id: "visualizer", label: "09. The Type Visualizer" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Philosophy -->
        <section id="philosophy" class="scroll-mt-32">
             <div class="border-l-8 border-blue-600 bg-blue-50 dark:bg-blue-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h2 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "Make Impossible States Impossible."
                </h2>
                <p class="text-xl md:text-2xl text-blue-900 dark:text-blue-100 font-light leading-relaxed mb-6">
                    TypeScript is not just a linter or a tool for auto-complete. It is a <strong>modeling language</strong>. 
                    If your types allow a state that represents a bug, your types are buggy.
                </p>
             </div>
             <p class="text-lg text-gray-700 dark:text-gray-300">
                 Most developers use "Bag of Optional Props" programming: <code>{ isLoading?: boolean, error?: string, data?: User }</code>. 
                 This allows a state where <code>isLoading: false</code>, <code>error: null</code>, and <code>data: null</code> exist simultaneously. This is a "Zombie State".
                 <br/><br/>
                 We fix this with <strong>Algebraic Data Types</strong> (Discriminated Unions).
             </p>
        </section>

        <!-- 02. Discriminated Unions -->
        <section id="discriminated-unions" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">02.</span>
                Discriminated Unions (State Machines)
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <div class="p-6 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20">
                     <h3 class="text-lg font-bold text-red-700 dark:text-red-300 mb-4">❌ The Bad Way</h3>
                     <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
interface State {
  isLoading: boolean;
  error?: string;
  data?: User;
}
// ⚠️ Impossible state allowed:
// { isLoading: false, error: undefined, data: undefined }</pre>
                 </div>
                 <div class="p-6 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/20">
                     <h3 class="text-lg font-bold text-green-700 dark:text-green-300 mb-4">✅ The Safe Way</h3>
                     <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
type State = 
 | { status: 'loading' }
 | { status: 'error', error: string }
 | { status: 'success', data: User }; // Data ONLY exists here</pre>
                 </div>
            </div>
            
            <p class="text-gray-700 dark:text-gray-300">
                TypeScript acts as a control flow analyzer. Inside a \`if(state.status === 'success')\` block, it <em>knows</em> that \`data\` exists.
            </p>
        </section>

        <!-- 03. Template Literals -->
        <section id="template-literals" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">03.</span>
                Template Literal DSLs
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                You can generate string types using template syntax. This is incredibly powerful for typed Event Emitters, CSS classes, or Internationalization keys.
            </p>
            <div class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800">
                <pre class="font-mono text-sm text-gray-800 dark:text-gray-200">
type Entity = "User" | "Post" | "Comment";
type EventType = "created" | "deleted" | "updated";

// 🪄 Generates 9 possible string combinations automatically
type AppEvent = \`\${Entity}:\${EventType}\`; 

// usage
function listen(event: AppEvent) {}

listen("User:created"); // ✅
listen("Post:archived"); // ❌ Error: "archived" is not in EventType</pre>
            </div>
        </section>

        <!-- 04. Conditional Logic -->
        <section id="conditional-logic" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">04.</span>
                Conditional Types & Infer
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Think of this as <strong>Ternary Operators for Types</strong>. 
                \`T extends U ? X : Y\` means: "Does type T look like type U? If yes, use type X, otherwise Y."
            </p>

            <div class="bg-gray-900 rounded-xl p-8 shadow-2xl relative overflow-hidden group">
                 <div class="absolute top-0 right-0 px-4 py-2 bg-slate-800 text-xs font-mono text-gray-400 rounded-bl-xl border-l border-b border-gray-700">getReturnType.ts</div>
                 <pre class="text-sm md:text-base font-mono text-gray-300">
<span class="text-gray-500">// The 'infer' keyword extracts a part of the type definition</span>
type GetReturnType&lt;T&gt; = 
  T extends (...args: any[]) => <span class="text-purple-400">infer</span> R 
  ? R 
  : never;

<span class="text-purple-400">function</span> <span class="text-blue-400">createUser</span>() {
  return { id: 1, name: "Alice", role: "admin" }
}

<span class="text-gray-500">// Magic: We extracted the return type without exporting an interface!</span>
type User = GetReturnType&lt;<span class="text-purple-400">typeof</span> createUser&gt;;
<span class="text-gray-500">// User = { id: number, name: string, role: string }</span></pre>
            </div>
        </section>

        <!-- 05. Branded Types -->
        <section id="branded-types" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">05.</span>
                Branded Types (Domain Safety)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                A number is not just a number. A \`USD\` amount should not be added to a \`EUR\` amount. A \`UserId\` should not be passable to a function expecting a \`PostId\`.
            </p>
             <div class="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 class="font-bold text-gray-900 dark:text-gray-100 mb-2">The Branding Pattern</h4>
                <pre class="font-mono text-sm text-gray-600 dark:text-gray-300">
// 1. Define the Brands
type Brand&lt;K, T&gt; = K & { __brand: T };

type USD = Brand&lt;number, 'USD'&gt;;
type EUR = Brand&lt;number, 'EUR'&gt;;

// 2. Usage
const wallet = 100 as USD;
const cost = 50 as EUR;

function pay(amount: USD) {}

pay(wallet); // ✅
pay(cost);   // ❌ Error: Type 'EUR' is not assignable to type 'USD'</pre>
            </div>
        </section>

        <!-- 06. Utility Types -->
        <section id="utility-types" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">06.</span>
                Advanced Utility Types
            </h2>
            <div class="space-y-6">
                 <div class="p-4 bg-gray-100 dark:bg-slate-900 rounded-lg">
                     <h4 class="font-bold">DeepPartial&lt;T&gt;</h4>
                     <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Recursively makes all properties optional.</p>
                     <code class="text-xs font-mono block">type DeepPartial&lt;T&gt; = { [P in keyof T]?: DeepPartial&lt;T[P]&gt; };</code>
                 </div>
                 <div class="p-4 bg-gray-100 dark:bg-slate-900 rounded-lg">
                     <h4 class="font-bold">Prettify&lt;T&gt;</h4>
                     <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Forces VS Code to show the computed type instead of the alias name.</p>
                     <code class="text-xs font-mono block">type Prettify&lt;T&gt; = { [K in keyof T]: T[K] } & {};</code>
                 </div>
            </div>
        </section>

        <!-- 07. Runtime Validation -->
        <section id="runtime-validation" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">07.</span>
                Runtime Validation (Zod)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                TypeScript handles compile time. Zod handles runtime. 
                Instead of manually writing interfaces, write a Zod schema and infer the type from it.
            </p>
             <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-slate-800">
import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().min(18)
});

// ✨ Automatic Type Inference
type User = z.infer&lt;typeof UserSchema&gt;;
// { id: string; email: string; age: number; }</pre>
        </section>
        
        <!-- 08. Performance -->
        <section id="performance-check" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">08.</span>
                Compiler Performance
            </h2>
            <div class="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <p class="text-yellow-800 dark:text-yellow-200">
                    <strong>Warning:</strong> Excessive recursion or massive unions (10k+ items) will slay your Intellisense speed. Use \`interface\` extends where possible instead of intersection types \` & \` for object shapes, as interfaces cache better.
                </p>
            </div>
        </section>

        <!-- 09. Visualizer -->
        <section id="visualizer" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">09.</span>
                The Type Visualizer
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Below is a visualization of how Discriminated Unions work in a real-world scenario (a Shape Sorter). Notice how the properties available change based on the "Kind".
            </p>
        </section>

    </div>
    `,
    code: `import React, { useState } from 'react';

// ==========================================
// 🛡️ TYPE SAFE SHAPE SORTER (Interactive)
// ==========================================

export default function TypeVisualizer() {
  const [selectedKind, setSelectedKind] = useState('circle');
  const [radius, setRadius] = useState(50);
  const [side, setSide] = useState(80);
  const [width, setWidth] = useState(120);
  const [height, setHeight] = useState(60);

  // Type Logic Simulation
  const getProperties = (kind) => {
      switch(kind) {
          case 'circle': return { radius };
          case 'square': return { side };
          case 'rectangle': return { width, height };
          default: return {};
      }
  }

  const props = getProperties(selectedKind);
  
  const calculateArea = () => {
       switch(selectedKind) {
          case 'circle': return Math.PI * radius ** 2;
          case 'square': return side ** 2;
          case 'rectangle': return width * height;
       }
  }

  return (
    <div className="bg-slate-50 dark:bg-[#0f1115] p-6 lg:p-10 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl font-sans min-h-[700px] flex flex-col">
       
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white/50 dark:bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-slate-200 dark:border-white/5">
             <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                    <span className="text-blue-600"><span className="text-3xl">🛡️</span></span> Type Guard Visualizer
                </h3>
                <p className="text-slate-500 mt-2 font-medium">Visualizing Discriminated Unions logic</p>
            </div>
            <div className="hidden md:flex gap-2">
                <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-bold rounded uppercase tracking-wider">
                    Strict Mode: ON
                </div>
            </div>
        </div>

        <div className="flex-1 flex flex-col xl:flex-row gap-8">
            
            {/* LEFT: Type Definition Code Block */}
            <div className="w-full xl:w-96 space-y-6">
                
                {/* 1. The Discriminated Union Definition */}
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 px-3 py-1 bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase rounded-bl-lg font-mono">types.ts</div>
                     <pre className="font-mono text-xs text-blue-200 leading-relaxed">
<span className="text-purple-400">type</span> Shape = 
  | {'{'} <span className="text-yellow-400">kind</span>: <span className="text-green-300">'circle'</span>; <span className={selectedKind === 'circle' ? "bg-white/20 px-1 rounded text-white font-bold" : "text-slate-500"}>radius</span>: number {'}'}
  | {'{'} <span className="text-yellow-400">kind</span>: <span className="text-green-300">'square'</span>; <span className={selectedKind === 'square' ? "bg-white/20 px-1 rounded text-white font-bold" : "text-slate-500"}>side</span>: number {'}'}
  | {'{'} <span className="text-yellow-400">kind</span>: <span className="text-green-300">'rect'</span>; <span className={selectedKind === 'rectangle' ? "bg-white/20 px-1 rounded text-white font-bold" : "text-slate-500"}>width</span>: number; <span className={selectedKind === 'rectangle' ? "bg-white/20 px-1 rounded text-white font-bold" : "text-slate-500"}>height</span>: number {'}'};
                     </pre>
                     
                     <div className="mt-4 pt-4 border-t border-slate-800">
                         <div className="text-[10px] text-slate-500 uppercase font-bold mb-2">Internal Logic</div>
                         <div className="flex gap-2">
                             <button onClick={() => setSelectedKind('circle')} className={\`flex-1 p-2 rounded border text-xs font-bold transition-all \${selectedKind === 'circle' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}\`}>Circle</button>
                             <button onClick={() => setSelectedKind('square')} className={\`flex-1 p-2 rounded border text-xs font-bold transition-all \${selectedKind === 'square' ? 'bg-green-600 border-green-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}\`}>Square</button>
                             <button onClick={() => setSelectedKind('rectangle')} className={\`flex-1 p-2 rounded border text-xs font-bold transition-all \${selectedKind === 'rectangle' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}\`}>Rect</button>
                         </div>
                     </div>
                </div>

                {/* 2. Compiler Feedback */}
                <div className="bg-white dark:bg-[#1a1c20] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span>💻</span> Available Props
                    </h4>
                    <div className="space-y-3">
                         {/* Common Prop */}
                         <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-black/20 rounded-lg border border-slate-100 dark:border-white/5">
                             <div className="font-mono text-sm text-yellow-600 dark:text-yellow-400">kind</div>
                             <div className="text-xs text-slate-500">Discriminant</div>
                         </div>
                         
                         {/* Conditional Props */}
                         {selectedKind === 'circle' && (
                             <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-500/20 animate-in slide-in-from-left-2">
                                <div className="font-mono text-sm text-blue-600 dark:text-blue-400">radius</div>
                                <input type="range" min="20" max="100" value={radius} onChange={e => setRadius(Number(e.target.value))} className="w-24 accent-blue-500" />
                             </div>
                         )}
                         {selectedKind === 'square' && (
                             <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-500/20 animate-in slide-in-from-left-2">
                                <div className="font-mono text-sm text-green-600 dark:text-green-400">side</div>
                                <input type="range" min="40" max="150" value={side} onChange={e => setSide(Number(e.target.value))} className="w-24 accent-green-500" />
                             </div>
                         )}
                         {selectedKind === 'rectangle' && (
                             <>
                                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-500/20 animate-in slide-in-from-left-2">
                                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">width</div>
                                    <input type="range" min="50" max="200" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-24 accent-purple-500" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-500/20 animate-in slide-in-from-left-2">
                                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">height</div>
                                    <input type="range" min="20" max="100" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-24 accent-purple-500" />
                                </div>
                             </>
                         )}
                    </div>
                </div>

            </div>

            {/* RIGHT: Visual Output */}
            <div className="flex-1 bg-slate-100 dark:bg-black/40 rounded-3xl border border-slate-200 dark:border-dashed dark:border-slate-800 flex flex-col items-center justify-center relative min-h-[400px]">
                
                {/* The Shape */}
                <div 
                    className="shadow-2xl transition-all duration-500 ease-out flex items-center justify-center"
                    style={{
                        width: selectedKind === 'circle' ? radius * 2 : (selectedKind === 'square' ? side : width),
                        height: selectedKind === 'circle' ? radius * 2 : (selectedKind === 'square' ? side : height),
                        borderRadius: selectedKind === 'circle' ? '50%' : '16px',
                        background: selectedKind === 'circle' ? '#2563eb' : (selectedKind === 'square' ? '#16a34a' : '#9333ea')
                    }}
                >
                    <div className="text-white font-bold text-shadow text-center">
                        <div className="uppercase tracking-widest text-xs opacity-70">{selectedKind}</div>
                        <div className="text-2xl">{Math.round(calculateArea())}</div>
                        <div className="text-[10px] opacity-70">px²</div>
                    </div>
                </div>

                {/* Floating Labels */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
                    {/* Only show safe properties */}
                    {Object.entries(props).map(([key, val]) => (
                        <div key={key} className="bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 animate-in zoom-in">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{key}:</span>
                            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">{val}</span>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    </div>
  );
}
`};

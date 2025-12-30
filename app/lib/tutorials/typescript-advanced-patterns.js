export const typescriptAdvancedPatterns = {
    title: "TypeScript: Beyond the Basics 🛡️",
    description: "You know interface and type. Now master the patterns that make TypeScript actually powerful: Discriminated Unions, Template Literals, and Conditional Types.",
    slug: "typescript-advanced-patterns",
    type: "static",
    author: "Matt Pocock (Visualization)",
    createdAt: new Date().toISOString(),
    readTime: "35 min read",
    difficulty: "Advanced",
    tags: ["TypeScript", "Patterns", "Generics", "Type Safety"],
    keywords: ["Discriminated Unions", "Type Guards", "Satisfies", "Generics", "Inference", "Template Literal Types", "Conditional Types"],
    toc: [
        { id: "discriminated-unions", label: "01. Discriminated Unions" },
        { id: "template-literals", label: "02. Template Literal Types" },
        { id: "type-guards", label: "03. Type Guards (Predicates)" },
        { id: "satisfies-operator", label: "04. The Satisfies Operator" },
        { id: "conditional-types", label: "05. Conditional Types & Infer" },
        { id: "generics-inference", label: "06. Generics & Inference" },
        { id: "virality", label: "07. Share & Takeaways" },
        { id: "interactive-demo", label: "08. Interactive Visualizer" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- Introduction -->
        <section class="scroll-mt-32">
             <div class="border-l-4 border-blue-600 pl-6 py-2 mb-8">
                <p class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                    "TypeScript isn't just a linter. It's a programming language for your types."
                </p>
             </div>
             <p class="text-xl md:text-2xl leading-relaxed font-light">
                Most developers stop at \`interface Props {}\`. 
                But TypeScript has a turing-complete type system. 
                You can write code that generates other code. You can validate API responses at compile time.
                <br/><br/>
                This guide takes you from "TypeScript User" to "TypeScript Wizard".
            </p>
        </section>

        <!-- Section 1: Discriminated Unions -->
        <section id="discriminated-unions" class="scroll-mt-32">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-blue-600 dark:text-blue-500">01.</span>
                Discriminated Unions
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <p class="text-lg leading-relaxed">
                    The single most important pattern in TypeScript. 
                    It allows you to model state transitions (Loading -> Success -> Error) safely. 
                    If you use \`isLoading?\` booleans, you are doing it wrong.
                </p>
            </div>
            
             <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-slate-800 my-6"><code>type State = 
  | { status: 'loading' } // 👈 The "Discriminant"
  | { status: 'success'; data: User }
  | { status: 'error'; error: Error };

function render(state: State) {
  if (state.status === 'loading') {
    // TS knows 'data' and 'error' don't exist here!
    return &lt;Spinner /&gt;; 
  }
  if (state.status === 'success') {
    // TS knows 'data' DOES exist here!
    return &lt;UserCard user={state.data} /&gt;;
  }
}</code></pre>
        </section>

        <!-- Section 2: Template Literals -->
        <section id="template-literals" class="scroll-mt-32">
             <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-blue-600 dark:text-blue-500">02.</span>
                Template Literal Types
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                You can combine string literals to create powerful pattern-matching types.
                Tailwind, CSS-in-JS, and Event listeners rely heavily on this.
            </p>
            <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-900/30">
                <pre class="font-mono text-sm"><code>type Color = "red" | "blue";
type Shade = "100" | "500" | "900";

// Automatically generates "red-100" | "red-500" | "blue-900" ...
type TailwindColor = \`\${Color}-\${Shade}\`; 

const bg: TailwindColor = "red-500"; // ✅
const bg2: TailwindColor = "green-500"; // ❌ Error</code></pre>
            </div>
        </section>


        <!-- Section 3: Type Guards -->
        <section id="type-guards" class="scroll-mt-32">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-blue-600 dark:text-blue-500">03.</span>
                Type Guards
            </h2>
             <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Imagine a bouncer at a club. Type Guards are those bouncers for your types. 
                They check if a value meets certain criteria, and if it does, TypeScript trusts that value to be of a more specific type. 
            </p>
             <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-slate-800"><code>function isError(err: unknown): err is Error {
   return err instanceof Error;
}

const results = [data, error, data].filter(isError); 
// results type: Error[] (Narrowed from unknown[])</code></pre>
        </section>

         <!-- Section 4: Satisfies -->
        <section id="satisfies-operator" class="scroll-mt-32">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-blue-600 dark:text-blue-500">04.</span>
                The \`satisfies\` Operator
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                New in TS 4.9. Validate a type *without* widening it. 
                Keep the specific literal types while ensuring they match a pattern.
            </p>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div class="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg border border-red-200 dark:border-red-900/30">
                     <div class="text-sm font-bold text-red-600 uppercase mb-2">Old Way (Widens)</div>
                     <code class="text-sm">const palette: Record&lt;string, string&gt; = { red: '#f00' };</code>
                     <p class="text-xs mt-2 text-gray-500">palette.red is just \`string\`</p>
                 </div>
                 <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg border border-green-200 dark:border-green-900/30">
                     <div class="text-sm font-bold text-green-600 uppercase mb-2">Satisfies (Specific)</div>
                     <code class="text-sm">const palette = { red: '#f00' } satisfies Record&lt;string, string&gt;;</code>
                     <p class="text-xs mt-2 text-gray-500">palette.red is \`'#f00'\` (Literal!)</p>
                 </div>
             </div>
        </section>

        <!-- Section 5: Conditional Types -->
        <section id="conditional-types" class="scroll-mt-32">
             <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-blue-600 dark:text-blue-500">05.</span>
                Conditional Types & Infer
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Conditionals types are distinct from conditionals in JavaScript. They work on the types themselves.
                <code class="text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">T extends U ? X : Y</code>
            </p>
             <div class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800">
                 <h4 class="font-bold text-gray-700 dark:text-gray-300 mb-2">Extracting Return Types with \`infer\`</h4>
                 <pre class="font-mono text-sm text-gray-800 dark:text-gray-200"><code>type GetReturnType&lt;T&gt; = T extends (...args: any[]) => infer R ? R : never;

function getData() { return { id: 1, name: "Alice" }; }

// Automatically gets { id: number; name: string; }
type Data = GetReturnType&lt;typeof getData&gt;;</code></pre>
             </div>
        </section>

        <!-- Section 6: Generics & Inference -->
        <section id="generics-inference" class="scroll-mt-32">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-blue-600 dark:text-blue-500">06.</span>
                Generics & Inference
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Generics allow you to write flexible, reusable components and functions that work with a variety of types, while still maintaining type safety. 
                TypeScript's inference capabilities often mean you don't even need to explicitly specify these types.
            </p>
            <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-slate-800"><code>function identity&lt;T&gt;(arg: T): T {
  return arg;
}

let output1 = identity&lt;string&gt;("myString"); // type of output1 is string
let output2 = identity(123); // type of output2 is number (inferred)

interface Box&lt;T&gt; {
  value: T;
}

const stringBox: Box&lt;string&gt; = { value: "hello" };
const numberBox: Box&lt;number&gt; = { value: 123 };</code></pre>
        </section>

        <!-- Section 7: Shares -->
        <section id="virality" class="scroll-mt-32 pt-12 border-t border-gray-200 dark:border-gray-800">
             <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
                07. Share the Wizardry
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                     <p class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
                        "Stop writing 'any'. This guide unlocked Conditional Types and Template Litearls for me. TypeScript is actually magic. #TypeScript #WebDev 🧙‍♂️"
                     </p>
                     <div class="text-xs font-bold text-blue-500 uppercase tracking-wide">Twitter / X</div>
                </div>
            </div>
             <div class="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                <h4 class="font-bold text-lg mb-2 text-blue-900 dark:text-blue-200">The Takeaway</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    TypeScript is a tool for thought. If you model your state correctly with Discriminated Unions, bugs simply become impossible.
                </p>
            </div>
        </section>

        <!-- Interactive Demo Section -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-blue-600 dark:text-blue-500">08.</span>
                Pattern Visualizer
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Explore how Discriminated Unions prevent bugs in a simple "Shape Sorter" application.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <!-- Concept -->
                <div class="space-y-4">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span class="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded text-sm uppercase tracking-wide">Pattern</span>
                        Discriminated Union
                    </h3>
                    <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        The switch statement below is exhaustive. TypeScript would throw an error if we handled \`circle\` but forgot \`square\`.
                    </p>
                </div>
            </div>
        </section>

    </div>
    `,
    code: `import React, { useState } from 'react';

// ----------------------------------------------------
// 🛡️ TYPE SAFE SHAPE SORTER
// ----------------------------------------------------

// type Shape = 
//   | { kind: 'circle'; radius: number }
//   | { kind: 'square'; side: number }
//   | { kind: 'rectangle'; width: number; height: number };

export default function ShapeSorter() {
  const [currentShape, setCurrentShape] = useState({ kind: 'circle', radius: 50 });
  const [area, setArea] = useState(0);

  // Discriminant Check Logic (simulated)
  const calculateArea = (shape) => {
    switch (shape.kind) {
      case 'circle': return Math.PI * shape.radius ** 2;
      case 'square': return shape.side ** 2;
      case 'rectangle': return shape.width * shape.height;
    }
  };

  const handleCreate = (type) => {
      if(type === 'circle') setCurrentShape({ kind: 'circle', radius: Math.floor(Math.random() * 40) + 20 });
      if(type === 'square') setCurrentShape({ kind: 'square', side: Math.floor(Math.random() * 80) + 40 });
      if(type === 'rectangle') setCurrentShape({ kind: 'rectangle', width: 100, height: 50 });
  }

  return (
    <div className="bg-white dark:bg-[#111] text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl p-8 flex flex-col md:flex-row gap-8 h-[500px]">
      
      {/* Controls */}
      <div className="w-full md:w-1/3 space-y-6">
          <div className="space-y-2">
               <h3 className="text-xl font-bold">1. Pick a Shape</h3>
               <div className="flex gap-2">
                   <button onClick={() => handleCreate('circle')} className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 transition">Circle</button>
                   <button onClick={() => handleCreate('square')} className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 transition">Square</button>
                   <button onClick={() => handleCreate('rectangle')} className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 transition">Rect</button>
               </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl font-mono text-xs">
              <div className="text-gray-500 mb-2">// Current State (Discriminated):</div>
              <pre>{JSON.stringify(currentShape, null, 2)}</pre>
          </div>

          <button 
             onClick={() => setArea(calculateArea(currentShape))}
             className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl"
          >
              Calculate Area (Safe)
          </button>
      </div>

      {/* Visualization */}
      <div className="flex-1 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-center relative">
          
           {/* Render Shape based on TYPE */}
           <div 
              className="transition-all duration-500 shadow-xl"
              style={{
                  width: currentShape.kind === 'circle' ? currentShape.radius * 2 : (currentShape.kind === 'square' ? currentShape.side : currentShape.width),
                  height: currentShape.kind === 'circle' ? currentShape.radius * 2 : (currentShape.kind === 'square' ? currentShape.side : currentShape.height),
                  borderRadius: currentShape.kind === 'circle' ? '50%' : '12px',
                  backgroundColor: currentShape.kind === 'circle' ? '#3b82f6' : (currentShape.kind === 'square' ? '#22c55e' : '#a855f7')
              }}
           />

           {area > 0 && (
               <div className="absolute bottom-4 bg-white dark:bg-black px-4 py-2 rounded-lg shadow font-mono font-bold animate-in slide-in-from-bottom-2">
                   Area: {area.toFixed(0)}px²
               </div>
           )}
      </div>

    </div>
  );
}
`
}

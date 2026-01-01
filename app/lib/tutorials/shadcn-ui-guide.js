export const shadcnGuide = {
    title: "shadcn/ui: The New Standard 🧱",
    description: "It is NOT a component library. It is a collection of re-usable components that you can copy and paste into your apps. Own your code, own your design system.",
    slug: "shadcn-ui-guide",
    type: "static",
    author: "shadcn",
    createdAt: new Date().toISOString(),
    readTime: "30 min read",
    difficulty: "Intermediate",
    tags: ["React", "UI", "Radix", "Tailwind"],
    keywords: ["Headless UI", "Radix Primitives", "Accessibility", "Theming", "Design System", "Tailwind CSS"],
    toc: [
        { id: "philosophy", label: "01. The 'Copy/Paste' Revolution" },
        { id: "headless-architecture", label: "02. Headless Architecture" },
        { id: "cva-pattern", label: "03. The CVA Pattern" },
        { id: "theming-variables", label: "04. CSS Variables & Theming" },
        { id: "cli-magic", label: "05. How the CLI Works" },
        { id: "virality", label: "06. Share & Takeaways" },
        { id: "interactive-demo", label: "07. Theme Playground" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 1. The Hook -->
        <section id="philosophy" class="scroll-mt-32">
             <div class="border-l-8 border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                <p class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "I used to wait 3 months for Material UI to fix a bug. Now I fix it in 3 minutes."
                </p>
                <p class="text-xl md:text-md text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                     <strong>shadcn/ui</strong> is not a library you install in <code>package.json</code>. It is a CLI that purely copies code into your project. You own the component. You own the styles. You own the bugs. This is the ultimate freedom for a frontend engineer.
                </p>
             </div>
             
             <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8">
                 <p>
                    We call it "The Copy/Paste Revolution". Instead of fighting with a black-box NPM package to change a border-radius, you just open the file and change the class. It builds upon <strong>Radix UI</strong> (Headless) and <strong>Tailwind CSS</strong> (Styling) to give you the best of both worlds: Accessibility and Customizability.
                 </p>
            </div>
        </section>

        <!-- 2. Headless -->
        <section id="headless-architecture" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-zinc-900 dark:text-zinc-100">02.</span>
                Headless Architecture
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Separation of Concerns re-imagined. We separate the <strong>Behavior</strong> from the <strong>Style</strong>.
            </p>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                 <div class="bg-gray-100 dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800">
                     <h3 class="font-bold mb-4 text-2xl">🧠 Radix UI (The Brain)</h3>
                     <p class="text-lg text-gray-600 dark:text-gray-400">"I handle the open/close state, the collision detection, the focus trap, and the ARIA attributes. I am invisible."</p>
                 </div>
                 <div class="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border border-blue-200 dark:border-blue-900/30">
                     <h3 class="font-bold mb-4 text-2xl text-blue-900 dark:text-blue-200">🎨 Tailwind CSS (The Skin)</h3>
                     <p class="text-lg text-blue-800 dark:text-blue-300">"I handle how it looks. I don't care if it's open or closed, I just style the \`data-state\` attribute."</p>
                 </div>
             </div>
        </section>

        <!-- 3. CVA -->
        <section id="cva-pattern" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-zinc-900 dark:text-zinc-100">03.</span>
                Class Variance Authority (CVA)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                How do we handle variants like \`primary\`, \`secondary\`, \`outline\`, or sizes like \`sm\`, \`lg\` without messy template literals?
                Enter <strong>cva</strong>. It's a schema for your CSS classes.
            </p>
            <div class="mockup-code bg-zinc-950 text-zinc-100 p-6 rounded-xl overflow-x-auto shadow-2xl border border-zinc-800">
<pre><code>const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors", 
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)</code></pre>
            </div>
        </section>

         <!-- 4. Theming -->
        <section id="theming-variables" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-zinc-900 dark:text-zinc-100">04.</span>
                CSS Variables: The Secret Sauce
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Notice in the CVA example above, we use \`bg-primary\`, not \`bg-blue-500\`.
                This is because shadcn uses <strong>Semantic Tokens</strong> mapped to CSS Variables using HSL values.
            </p>
            <div class="bg-zinc-950 p-8 rounded-xl text-zinc-100 font-mono text-sm border border-zinc-800 shadow-lg">
                <div class="mb-4 text-gray-500 font-bold uppercase tracking-widest text-xs">// globals.css</div>
                <div class="pl-4 border-l-2 border-zinc-800 space-y-2">
                    <span class="text-purple-400">:root</span> { <br/>
                    &nbsp;&nbsp;<span class="text-blue-300">--primary</span>: <span class="text-green-300">222.2 47.4% 11.2%</span>; <br/>
                    &nbsp;&nbsp;<span class="text-blue-300">--primary-foreground</span>: <span class="text-green-300">210 40% 98%</span>; <br/>
                    } <br/><br/>
                    <span class="text-purple-400">.dark</span> { <br/>
                    &nbsp;&nbsp;<span class="text-blue-300">--primary</span>: <span class="text-green-300">210 40% 98%</span>; <br/>
                    &nbsp;&nbsp;<span class="text-blue-300">--primary-foreground</span>: <span class="text-green-300">222.2 47.4% 11.2%</span>; <br/>
                    }
                </div>
            </div>
            <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 rounded-r-lg">
                 <p class="text-yellow-800 dark:text-yellow-200 text-sm">
                    <strong>Pro Tip:</strong> This allows Dark Mode to work automatically without adding \`dark:\` modifiers everywhere. We just swap the values of the variables.
                </p>
            </div>
        </section>

        <!-- 5. CLI Magic -->
        <section id="cli-magic" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-zinc-900 dark:text-zinc-100">05.</span>
                How the CLI Works
            </h2>
             <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                When you run \`npx shadcn-ui@latest add button\`, it does three simple things:
            </p>
            <div class="space-y-4">
                <div class="flex items-start gap-4 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800">
                    <span class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                    <div>
                        <h4 class="font-bold text-gray-900 dark:text-white">Fetch</h4>
                        <p class="text-gray-600 dark:text-gray-400 text-sm">Fetches the component code from the registry (GitHub raw files).</p>
                    </div>
                </div>
                 <div class="flex items-start gap-4 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800">
                    <span class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                    <div>
                        <h4 class="font-bold text-gray-900 dark:text-white">Check</h4>
                        <p class="text-gray-600 dark:text-gray-400 text-sm">Checks your \`components.json\` config to see where to put it.</p>
                    </div>
                </div>
                 <div class="flex items-start gap-4 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800">
                    <span class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">3</span>
                    <div>
                        <h4 class="font-bold text-gray-900 dark:text-white">Install</h4>
                        <p class="text-gray-600 dark:text-gray-400 text-sm">Installs any necessary dependencies (like \`@radix-ui/react-slot\`).</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 6. Shares -->
        <section id="virality" class="scroll-mt-32 pt-12 border-t border-gray-200 dark:border-gray-800">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
                06. Share the Freedom
            </h2>

             <!-- Did You Know -->
             <div class="bg-indigo-600 text-white p-8 rounded-2xl mb-12 shadow-xl transform hover:scale-[1.01] transition-transform">
                 <div class="flex items-start gap-4">
                     <span class="text-4xl">💡</span>
                     <div>
                         <h4 class="text-2xl font-bold mb-2 !text-white">Did You Know?</h4>
                         <p class="!text-white text-lg font-medium opacity-90">
                             Shadcn isn't paid work. It's an open source project that changed the entire React ecosystem. You can build your own registry too!
                         </p>
                     </div>
                 </div>
             </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                     <h4 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Twitter / X Caption</h4>
                     <p class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 italic">
                        "Stop npm installing heavy UI libraries. Copy/Paste the code and own your UI. Shadcn/ui changed how I build apps. #React #WebDev #Tailwind"
                     </p>
                     <button class="text-blue-500 text-sm font-bold hover:underline">Copy Caption</button>
                </div>
                 <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                     <h4 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">LinkedIn Post</h4>
                     <p class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 italic">
                        "I deleted 400MB of node_modules by switching to Shadcn/ui. Headless accessibility + Tailwind customization is the holy grail of UI development. #Frontend #Architecture"
                     </p>
                     <button class="text-blue-500 text-sm font-bold hover:underline">Copy Caption</button>
                </div>
            </div>
             <div class="mt-8 p-6 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-center">
                <h4 class="font-bold text-lg mb-2 text-zinc-900 dark:text-zinc-200">The Takeaway</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    Ownership > Abstraction. Your design system should live in your codebase, not in \`node_modules\`.
                </p>
                 <div class="mt-4 flex flex-wrap gap-2 justify-center">
                     <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300">#DesignSystem</span>
                     <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300">#UI</span>
                     <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300">#Radix</span>
                </div>
            </div>
             <button class="mt-8 w-full md:w-auto mx-auto block bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                 Explore the Component Registry
             </button>
        </section>

        <!-- Interactive Demo Section -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-zinc-900 dark:text-zinc-100">07.</span>
                Theme Playground
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Shadcn uses CSS variables for theming. Change the "Primary" color variable and watch the UI update globally.
            </p>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <!-- Concept -->
                  <div class="space-y-4">
                      <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <span class="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1 rounded text-sm uppercase tracking-wide">System</span>
                          Radius & Color
                      </h3>
                      <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          This entire playground is driven by 2 React state variables that inject inline styles to mimic CSS variables.
                      </p>
                  </div>
             </div>
        </section>

    </div>
    `,
    code: `import React, { useState } from 'react';

// ----------------------------------------------------
// 🧱 SHADCN THEME BUILDER
// ----------------------------------------------------

export default function ShadcnThemer() {
  const [radius, setRadius] = useState('0.5rem');
  const [color, setColor] = useState('zinc'); // orange, blue, green, zinc

  // Map simulated CSS variables
  const getColorClass = () => {
      if(color === 'orange') return 'bg-orange-500 text-white shadow-orange-500/20 hover:bg-orange-600';
      if(color === 'blue') return 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-700';
      if(color === 'green') return 'bg-emerald-600 text-white shadow-emerald-600/20 hover:bg-emerald-700';
      return 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 shadow-zinc-900/10 hover:bg-zinc-800 dark:hover:bg-zinc-200';
  }

  const getBorderClass = () => {
      // Represents 'ring'
      if(color === 'orange') return 'focus:ring-orange-500';
      if(color === 'blue') return 'focus:ring-blue-600';
      if(color === 'green') return 'focus:ring-emerald-600';
      return 'focus:ring-zinc-900 dark:focus:ring-zinc-100';
  }

  return (
    <div className="bg-white dark:bg-[#111] text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl p-8 flex flex-col md:flex-row gap-8 h-[500px]">
      
      {/* Controls */}
      <div className="w-full md:w-1/3 space-y-6">
          <div className="space-y-4">
               <h3 className="text-xl font-bold">1. Theme Variables</h3>
               
               <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-gray-500">Primary Color</label>
                   <div className="flex gap-2">
                       {['zinc', 'orange', 'blue', 'green'].map(c => (
                           <button key={c} onClick={() => setColor(c)} className={\`w-8 h-8 rounded-full \${c==='zinc' ? 'bg-zinc-900' : \`bg-\${c}-500\`} ring-offset-2 \${color === c ? 'ring-2 ring-gray-400' : ''}\`}></button>
                       ))}
                   </div>
               </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-gray-500">Radius</label>
                   <div className="flex items-center gap-4">
                       <input type="range" min="0" max="1.5" step="0.25" onChange={(e) => setRadius(\`\${e.target.value}rem\`)} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-black dark:accent-white"/>
                       <span className="font-mono text-xs w-12 text-right">{radius}</span>
                   </div>
               </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-xl font-mono text-xs text-gray-500 space-y-1">
              <div>--radius: <span className="text-black dark:text-white">{radius}</span>;</div>
              <div>--primary: <span className="text-black dark:text-white">{color}</span>;</div>
          </div>
      </div>

      {/* Visualization */}
      <div className="flex-1 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col items-center justify-center relative p-12 gap-6">
           
           {/* Card Component */}
           <div 
             className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-8 w-full max-w-sm shadow-xl"
             style={{ borderRadius: radius }}
           >
               <h3 className="font-bold text-lg mb-2">Payment Details</h3>
               <p className="text-sm text-gray-500 mb-6">Enter your credentials to continue.</p>
               
               <div className="space-y-4 mb-6">
                   <input 
                     placeholder="Card Number" 
                     className={\`w-full px-3 py-2 border border-gray-200 dark:border-gray-800 outline-none focus:ring-2 \${getBorderClass()} transition-all\`}
                     style={{ borderRadius: \`calc(\${radius} - 2px)\` }}
                   />
                   <div className="flex gap-4">
                        <input 
                            placeholder="MM/YY" 
                            className={\`w-1/2 px-3 py-2 border border-gray-200 dark:border-gray-800 outline-none focus:ring-2 \${getBorderClass()} transition-all\`}
                            style={{ borderRadius: \`calc(\${radius} - 2px)\` }}
                        />
                         <input 
                            placeholder="CVC" 
                            className={\`w-1/2 px-3 py-2 border border-gray-200 dark:border-gray-800 outline-none focus:ring-2 \${getBorderClass()} transition-all\`}
                            style={{ borderRadius: \`calc(\${radius} - 2px)\` }}
                        />
                   </div>
               </div>

               <button 
                className={\`w-full py-2.5 font-bold text-sm transition-all shadow-lg active:scale-95 \${getColorClass()}\`}
                style={{ borderRadius: \`calc(\${radius} - 2px)\` }}
               >
                   Confirm Payment
               </button>
           </div>
      </div>

    </div>
  );
}
`
}

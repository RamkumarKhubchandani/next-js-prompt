export const tailwindArchitecture = {
    title: "Tailwind CSS: Utility Architecture 🎨",
    description: "It's not just inline styles. It's a constraint-based design system engine. Master JIT, CVA, and reusable architecture.",
    slug: "tailwind-architecture",
    type: "static",
    author: "Adam Wathan",
    createdAt: new Date().toISOString(),
    readTime: "30 min read",
    difficulty: "Intermediate",
    tags: ["CSS", "Tailwind", "Design Systems"],
    keywords: ["JIT Compiler", "CVA", "Utility First", "Design Tokens", "Responsive Design", "Plugins"],
    toc: [
        { id: "utility-first", label: "01. Utility-First Mindset" },
        { id: "jit-compiler", label: "02. The JIT Compiler" },
        { id: "mobile-first", label: "03. Mobile-First Strategy" },
        { id: "customization", label: "04. Theme Extension & Config" },
        { id: "cva-pattern", label: "05. CVA (Component Variants)" },
        { id: "virality", label: "06. Share & Takeaways" },
        { id: "interactive-demo", label: "07. Utility Builder" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 1. The Hook -->
        <section id="utility-first" class="scroll-mt-32">
             <div class="border-l-4 border-sky-500 bg-sky-50 dark:bg-sky-900/10 pl-6 py-4 mb-8 rounded-r-xl">
                <p class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                    "I stopped writing CSS files three years ago. I've never moved faster."
                </p>
             </div>
             <p class="text-xl md:text-2xl leading-relaxed font-light">
                Class names like <code>.sidebar-wrapper-inner-container</code> are dead. They are semantic drift waiting to happen.
                <br/><br/>
                <strong>Tailwind CSS</strong> is not "inline styles". Inline styles don't have constraints. Inline styles don't respond to hover states. Inline styles don't handle media queries.
                <br/>
                Tailwind is an <strong>API for your Design System</strong>.
            </p>
        </section>

        <!-- 2. JIT -->
        <section id="jit-compiler" class="scroll-mt-32">
            <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-sky-500 dark:text-sky-400">02.</span>
                The JIT Compiler (Magic)
            </h3>
             <div class="bg-gray-900 text-gray-200 p-6 rounded-xl font-mono text-base shadow-xl border border-gray-800">
                 <div class="text-gray-500 mb-2">// arbitrary-values.jsx</div>
                 &lt;div class="<span class="text-sky-400">top-[117px]</span> <span class="text-purple-400">bg-[#bada55]</span> <span class="text-pink-400">grid-cols-[1fr_500px]</span>"&gt;
             </div>
             <p class="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                 In the old days (v2), Tailwind generated a 10MB CSS file and stripped unused styles later. 
                 <br/>
                 The <strong>JIT (Just-In-Time) Engine</strong> watches your files. It sees <code>top-[117px]</code> and <em>instantly</em> generates a single CSS rule: \`.top-\[117px\] { top: 117px }\`.
                 <br/><br/>
                 This means:
                 <ul class="list-disc list-inside mt-4 space-y-2 ml-4">
                     <li>⚡ <strong>Zero</strong> development lag.</li>
                     <li>📦 <strong>Tiny</strong> production CSS bundles (only what you use).</li>
                     <li>🎨 <strong>Arbitrary values</strong> for when you need pixel-perfect precision.</li>
                 </ul>
             </p>
        </section>

        <!-- 3. Mobile First -->
        <section id="mobile-first" class="scroll-mt-32">
             <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-sky-500 dark:text-sky-400">03.</span>
                Mobile-First Strategy
            </h3>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Tailwind forces you to think <strong>Mobile First</strong>. 
                Unprefixed utilities (like \`block\`) target mobile. Prefixed utilities (like \`md:flex\`) target larger screens.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                 <div class="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-200 dark:border-red-900/30">
                     <h4 class="font-bold text-red-800 dark:text-red-200 mb-2">❌ Common Mistake</h4>
                     <code class="text-sm">class="flex sm:block"</code>
                     <p class="text-sm mt-2 text-gray-600">This means "Flex on mobile, Block on tablet". Usually inverted intent.</p>
                 </div>
                 <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-900/30">
                     <h4 class="font-bold text-green-800 dark:text-green-200 mb-2">✅ Correct Thinking</h4>
                     <code class="text-sm">class="block md:flex"</code>
                     <p class="text-sm mt-2 text-gray-600">"Default is block (mobile). On medium screens and up, become flex."</p>
                 </div>
            </div>
        </section>

        <!-- 4. Customization -->
        <section id="customization" class="scroll-mt-32">
             <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-sky-500 dark:text-sky-400">04.</span>
                Theme Extension & Config
            </h3>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Never override. Always extend. 
                In your \`tailwind.config.js\`, use the <strong>extend</strong> key to preserve the default utilities while adding your own branding.
            </p>
             <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-slate-800"><code>module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0fa9e6',
          dark: '#0c87b8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  }
}</code></pre>
            <p class="mt-4 text-base text-gray-600 dark:text-gray-400 italic">
                Now you can use \`bg-brand\` and \`font-sans\` in your markup.
            </p>
        </section>

        <!-- 5. CVA -->
        <section id="cva-pattern" class="scroll-mt-32">
            <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-sky-500 dark:text-sky-400">05.</span>
                CVA: The New BEM
            </h3>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                "But my HTML is ugly!" 
                <br/>
                Soltuion: Use CVA (Class Variance Authority) to type-safe your components. It keeps your template clean and your logic centralized.
            </p>
             <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-slate-800 my-6"><code>const button = cva("rounded-xl font-bold transition items-center justify-center", {
  variants: {
    intent: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-200 text-black hover:bg-gray-300",
    },
    size: {
      sm: "px-4 py-2 text-sm",
      lg: "px-8 py-4 text-lg",
    }
  },
  defaultVariants: {
      intent: "primary",
      size: "lg"
  }
})</code></pre>
        </section>

        <!-- 6. Shares -->
        <section id="virality" class="scroll-mt-32 pt-12 border-t border-gray-200 dark:border-gray-800">
             <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
                06. Share the Speed
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                     <p class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
                        "If you think Tailwind is just inline styles, you haven't used the JIT compiler. The constraints are the feature, not the bug. #TailwindCSS #CSS"
                     </p>
                     <div class="text-xs font-bold text-blue-500 uppercase tracking-wide">Twitter / X</div>
                </div>
            </div>
             <div class="mt-8 p-6 bg-sky-50 dark:bg-sky-900/20 rounded-xl text-center">
                <h4 class="font-bold text-lg mb-2 text-sky-900 dark:text-sky-200">The Takeaway</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    Stop bike-shedding class names. Start shipping UI.
                </p>
            </div>
        </section>

        <!-- Interactive Demo Section -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-sky-500 dark:text-sky-400">07.</span>
                Utility Builder
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Compose utility classes visually and watch the button transform instantly. This simulates the JIT engine applying styles.
            </p>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <!-- Concept -->
                  <div class="space-y-4">
                      <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <span class="bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 px-3 py-1 rounded text-sm uppercase tracking-wide">Tool</span>
                          Token Composer
                      </h3>
                      <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          Mix and match Padding, Color, and Radius tokens.
                      </p>
                  </div>
             </div>
        </section>

    </div>
    `,
    code: `import React, { useState } from 'react';

// ----------------------------------------------------
// 🎨 UTILITY BUILDER
// ----------------------------------------------------

export default function TailwindBuilder() {
  const [padding, setPadding] = useState('p-4');
  const [color, setColor] = useState('bg-blue-500');
  const [rounded, setRounded] = useState('rounded-lg');
  const [shadow, setShadow] = useState('shadow-lg');

  const classString = \`\${padding} \${color} \${rounded} \${shadow} text-white font-bold transition-all duration-300 active:scale-95\`;

  return (
    <div className="bg-white dark:bg-[#111] text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl p-8 flex flex-col md:flex-row gap-8 h-[500px]">
      
      {/* Controls */}
      <div className="w-full md:w-1/3 space-y-6">
          <div className="space-y-4">
               <h3 className="text-xl font-bold">1. Select Tokens</h3>
               
               <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-gray-500">Color</label>
                   <div className="flex gap-2">
                       {['bg-blue-500', 'bg-purple-500', 'bg-rose-500', 'bg-emerald-500'].map(c => (
                           <button key={c} onClick={() => setColor(c)} className={\`w-8 h-8 rounded-full \${c.replace('bg-', 'bg-')} ring-offset-2 \${color === c ? 'ring-2 ring-gray-400' : ''}\`}></button>
                       ))}
                   </div>
               </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-gray-500">Padding</label>
                   <div className="flex gap-2">
                       {['p-2', 'p-4', 'p-8', 'px-10 py-5'].map(p => (
                           <button key={p} onClick={() => setPadding(p)} className={\`px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs \${padding === p ? 'bg-sky-100 dark:bg-sky-900 text-sky-600' : ''}\`}>{p}</button>
                       ))}
                   </div>
               </div>

               <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-gray-500">Radius</label>
                   <div className="flex gap-2">
                       {['rounded-none', 'rounded-lg', 'rounded-full'].map(r => (
                           <button key={r} onClick={() => setRounded(r)} className={\`px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs \${rounded === r ? 'bg-sky-100 dark:bg-sky-900 text-sky-600' : ''}\`}>{r}</button>
                       ))}
                   </div>
               </div>
               
               <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-gray-500">Shadow</label>
                   <div className="flex gap-2">
                       {['shadow-none', 'shadow-md', 'shadow-xl', 'shadow-2xl'].map(s => (
                           <button key={s} onClick={() => setShadow(s)} className={\`px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs \${shadow === s ? 'bg-sky-100 dark:bg-sky-900 text-sky-600' : ''}\`}>{s}</button>
                       ))}
                   </div>
               </div>
          </div>
      </div>

      {/* Visualization */}
      <div className="flex-1 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col items-center justify-center relative p-8">
           
           <button className={classString}>
               Tailwind Wrapper
           </button>

           <div className="absolute bottom-8 w-full max-w-md bg-gray-900 text-gray-200 p-4 rounded-xl font-mono text-sm break-all text-center">
               className="{classString}"
           </div>
      </div>

    </div>
  );
}
`
}

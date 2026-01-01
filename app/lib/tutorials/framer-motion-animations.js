export const framerMotionAnimations = {
    title: "Framer Motion: Physics Is The New CSS 🌀",
    description: "Stop using durations. Start using Springs. This guide shows you how to make your UI feel alive using the laws of physics.",
    slug: "framer-motion-animations",
    type: "static",
    author: "Matt Perry",
    createdAt: new Date().toISOString(),
    readTime: "25 min read",
    difficulty: "Intermediate",
    tags: ["React", "Animation", "Framer Motion", "UX"],
    keywords: ["Framer Motion Guide", "Spring Physics Animation", "React Animation Tutorial", "Layout Animations", "Gestures"],
    toc: [
        { id: "death-of-duration", label: "01. The Death of Duration" },
        { id: "layout-magic", label: "02. Layout Magic" },
        { id: "gestures-physics", label: "03. Gestures & Physics" },
        { id: "orchestration", label: "04. Orchestration (Stagger)" },
        { id: "virality", label: "05. Share & Takeaways" },
        { id: "interactive-demo", label: "06. Physics Playground" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 1. The Hook -->
        <section id="death-of-duration" class="scroll-mt-32">
             <div class="border-l-4 border-pink-500 pl-6 py-2 mb-8">
                <p class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                    "Your animations feel fake because nothing in the real world takes exactly 300ms to move."
                </p>
             </div>
             <p class="text-xl md:text-2xl leading-relaxed font-light">
                In the real world, things have mass. They have friction. They have momentum.
                <br/><br/>
                Framer Motion ignores "duration" effectively. It uses <strong>Spring Physics</strong>. 
                You don't say "move in 0.5s". You say "move with 300 stiffness and 20 damping". The result is UI that feels tangible, responsive, and alive.
            </p>
        </section>

        <!-- 2. Layout Magic -->
        <section id="layout-magic" class="scroll-mt-32">
            <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-pink-600 dark:text-pink-500">02.</span>
                Layout Magic (The "Wow" Factor)
            </h3>
             <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <p class="text-lg leading-relaxed">
                    This is Framer Motion's superpower. 
                    Add the <code>layout</code> prop, and the component will automatically animate to its new position when the DOM layout changes (e.g., list reordering, sorting, or when an element is removed).
                    <br/>
                    It effectively snapshots the start and end layout, and FLIPs (First, Last, Invert, Play) between them efficiently.
                </p>
            </div>
             <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-slate-800 my-6"><code>// ❌ The Hard Way (CSS)
// Calculate positions, use transforms, hope for the best...

// ✅ The Framer Way
&lt;motion.div layout&gt;
  {/* I will slide to my new home automatically, no matter what happens around me */}
&lt;/motion.div&gt;</code></pre>
        </section>

        <!-- 3. Gestures -->
        <section id="gestures-physics" class="scroll-mt-32">
            <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-pink-600 dark:text-pink-500">03.</span>
                Gestures & Physics
            </h3>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Drag, hover, tap, focus. 
                Framer Motion handles the physics of interaction, allowing you to "throw" elements.
                When you release a dragged element, it doesn't just stop. It carries its momentum (velocity) and decelerates naturally using physics.
            </p>
            <div class="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10 p-8 rounded-2xl border border-pink-100 dark:border-pink-800/30">
                <h4 class="font-bold text-xl mb-4 text-pink-900 dark:text-pink-100">The Power of \`whileHover\`</h4>
                <p class="mb-4 text-gray-700 dark:text-gray-300">
                    CSS <code>:hover</code> is instant and jerky. Framer's <code>whileHover</code> animates to the state using your spring physics.
                </p>
                <code class="block bg-white dark:bg-black/20 p-4 rounded-lg text-sm font-mono text-gray-600 dark:text-gray-400">
                    &lt;motion.button<br/>
                    &nbsp;&nbsp;whileHover={{ scale: 1.05 }}<br/>
                    &nbsp;&nbsp;whileTap={{ scale: 0.95 }}<br/>
                    /&gt;
                </code>
            </div>
        </section>

        <!-- 4. Orchestration -->
        <section id="orchestration" class="scroll-mt-32">
             <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-pink-600 dark:text-pink-500">04.</span>
                Orchestration (Stagger)
            </h3>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Animating lists doesn't mean adding a delay to every single item \`delay: index * 0.1\`.
                Framer Motion introduces <strong>Variants</strong> to handle this elegantly.
                Parent variants orchestrate children.
            </p>
             <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-slate-800"><code>const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // 👈 The magic line
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
}</code></pre>
        </section>

        <!-- 5. Shares -->
        <section id="virality" class="scroll-mt-32 pt-12 border-t border-gray-200 dark:border-gray-800">
             <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
                05. Share the Physics
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                     <p class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
                        "CSS transitions are dead. Long live Spring Physics. If your UI doesn't bounce, it doesn't breathe. #FramerMotion #React"
                     </p>
                     <div class="text-xs font-bold text-blue-500 uppercase tracking-wide">Twitter / X</div>
                </div>
            </div>
             <div class="mt-8 p-6 bg-pink-50 dark:bg-pink-900/20 rounded-xl text-center">
                <h4 class="font-bold text-lg mb-2 text-pink-900 dark:text-pink-200">The Takeaway</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    Your apps feel like native iOS apps. User trust increases because the interface feels physical, tangible, and responsive.
                </p>
            </div>
        </section>

        <!-- Interactive Demo Section -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-pink-600 dark:text-pink-500">06.</span>
                Physics Playground
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Tweak the spring physics and interact with the boxes below. Notice how changing Stiffness and Damping alters the "feel" of the UI completely.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <!-- Concept -->
                  <div class="space-y-4">
                      <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <span class="bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 px-3 py-1 rounded text-sm uppercase tracking-wide">Feature</span>
                          Drag Constraints
                      </h3>
                      <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          The box below is constrained to its container. Try throwing it against the wall!
                          Framer calculates the momentum and bounces it back.
                      </p>
                  </div>
             </div>
        </section>

    </div>
    `,
    code: `import React, { useState } from 'react';
import { motion } from 'framer-motion';

// ----------------------------------------------------
// 🌀 PHYSICS PLAYGROUND
// ----------------------------------------------------

export default function PhysicsPlayground() {
  const [stiffness, setStiffness] = useState(300);
  const [damping, setDamping] = useState(20);

  return (
    <div className="bg-white dark:bg-[#111] text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl p-8 flex flex-col md:flex-row gap-8 h-[600px]">
      
      {/* Controls */}
      <div className="w-full md:w-1/3 space-y-8">
          <div>
               <h3 className="text-xl font-bold mb-4">Spring Config</h3>
               
               <div className="space-y-6">
                   <div>
                       <label className="text-sm font-bold flex justify-between mb-2">
                           Stiffness <span className="text-pink-500 bg-pink-50 dark:bg-pink-900/20 px-2 rounded">{stiffness}</span>
                       </label>
                       <input 
                         type="range" min="10" max="1000" step="10" 
                         value={stiffness} 
                         onChange={(e) => setStiffness(Number(e.target.value))}
                         className="w-full accent-pink-500 h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer"
                       />
                       <p className="text-xs text-gray-500 mt-1">Energy. Higher = Snappier.</p>
                   </div>
                   
                    <div>
                       <label className="text-sm font-bold flex justify-between mb-2">
                           Damping <span className="text-pink-500 bg-pink-50 dark:bg-pink-900/20 px-2 rounded">{damping}</span>
                       </label>
                       <input 
                         type="range" min="0" max="100" step="1" 
                         value={damping} 
                         onChange={(e) => setDamping(Number(e.target.value))}
                         className="w-full accent-pink-500 h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer"
                       />
                        <p className="text-xs text-gray-500 mt-1">Friction. Lower = More Bounce.</p>
                   </div>
               </div>
          </div>

          <div className="bg-pink-50 dark:bg-pink-900/10 p-4 rounded-xl text-xs font-mono text-pink-700 dark:text-pink-300 border border-pink-100 dark:border-pink-900/30 shadow-sm">
               transition={{ "{" }} <br/>
               &nbsp;&nbsp;type: "spring",<br/>
               &nbsp;&nbsp;stiffness: {stiffness},<br/>
               &nbsp;&nbsp;damping: {damping}<br/>
               {{ "}" }}
          </div>
      </div>

      {/* Physics Area */}
      <div className="flex-1 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 rounded-2xl relative overflow-hidden flex items-center justify-center group">
          
           {/* Grid Pattern */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
           
           {/* Draggable Box */}
           <motion.div 
              drag
              dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              whileHover={{ scale: 1.1, cursor: 'grab' }}
              whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
              whileTap={{ scale: 0.95 }}
              // The Magic:
              transition={{ type: "spring", stiffness, damping }}
              className="w-32 h-32 relative z-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl shadow-2xl shadow-pink-500/30 flex items-center justify-center text-4xl select-none"
           >
               <span className="drop-shadow-md">🌀</span>
           </motion.div>

           <div className="absolute bottom-6 text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-widest pointer-events-none animate-pulse">
               Drag Me & Release
           </div>
      </div>

    </div>
  );
}
`
}

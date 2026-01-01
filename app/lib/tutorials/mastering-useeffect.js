export const masteringUseEffect = {
  slug: "mastering-useeffect",
  title: "React useEffect: The Definitive Guide (2026 Edition) 🧠",
  description: "Stop thinking in Lifecycles. Start thinking in Synchronization. This is the exhaustive, deep-dive masterclass on React's most misunderstood hook. Fixing infinite loops, race conditions, and memory leaks once and for all.",
  thumbnail: "/images/tutorials/useeffect-thumb.png",
  tags: ["React", "Hooks", "Frontend", "Performance", "Deep Dive"],
  keywords: ["useEffect", "React Synchronization", "Stale Closures", "Race Conditions", "React 19", "Cleanup Function", "Custom Hooks", "AbortController"],
  difficulty: "Advanced",
  readTime: "15 min read",
  author: "React Team",
  image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  toc: [
    { id: "the-great-misunderstanding", label: "01. The Great Misunderstanding" },
    { id: "mental-model-shift", label: "02. The Synchronization Mental Model" },
    { id: "dependency-truth", label: "03. The Dependency Array is Truth" },
    { id: "stale-closures", label: "04. The Stale Closure Trap" },
    { id: "race-conditions", label: "05. Data Fetching & Race Conditions" },
    { id: "effects-vs-events", label: "06. When NOT to use useEffect" },
    { id: "pro-tips", label: "07. Pro Tips & Pitfalls" },
    { id: "virality", label: "08. Virality & Socials" },
    { id: "interactive-demo", label: "09. The Playground" }
  ],
  content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
      
      <!-- 1. The Hook / Intro -->
      <section id="the-great-misunderstanding" class="scroll-mt-32">
         <div class="border-l-8 border-brand-primary bg-brand-50 dark:bg-brand-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                You rely on <code class="text-brand-primary">useEffect</code> for everything. And that is why your app is buggy.
            </h1>
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                If I asked you to explain <code>useEffect</code>, you'd probably say: <br/>
                <em>"It's how we handle side effects in functional components. It's like componentDidMount + componentDidUpdate + componentWillUnmount combined."</em>
            </p>
            <p class="text-xl md:text-2xl text-red-600 dark:text-red-400 font-bold mt-6 leading-relaxed">
                That answer is exactly why you have infinite loops. That answer is why you have stale closures. That answer is wrong.
            </p>
         </div>

         <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8">
            <p>
                <strong>Why this topic is trending right now:</strong> With the release of React 19 and the React Compiler, the ecosystem is shifting. We are moving away from manual memoization and towards smarter compilers. But <code>useEffect</code> remains. It remains the razor-sharp tool that can either surgicaly synchronize your app or slice your performance to ribbons.
            </p>
            <p>
                This isn't just another API reference. This is a <strong>re-education</strong>. We are going to unlearn "Lifecycles" and learn "Synchronization". By the end of this 3,500-word deep dive, you will be the person on your team who spots the race condition in the PR review before it ever hits production.
            </p>
         </div>


      </section>

      <!-- 2. Mental Model Shift -->
      <section id="mental-model-shift" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-brand-primary">02.</span>
            The Synchronization Mental Model
        </h2>
        
        <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <p>
                React components are <strong>pure functions</strong>. They take state and props, and they return UI. They are deterministic. <br/>
                <code>f(state) = UI</code>.
            </p>
            <p>
                But the world is not pure. The DOM needs to be mutated. LocalStorage needs to be updated. Sockets need to be connected. These are "Side Effects". 
                <code>useEffect</code> is not a signal that "the component rendered". It is a signal that <strong>"The component needs to synchronize with an external system"</strong>.
            </p>
            
            <h3 class="text-2xl font-bold mt-12 mb-6">The Cycle of Synchronization</h3>
            <p>
                In the old class-based mental model, you thought in time: "When does this run? At mount? At update?"
                <br/>
                In the Hooks mental model, you must think in <strong>state</strong>: "What state does this effect depend on?"
            </p>

            <div class="bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl my-8 font-mono text-sm md:text-base border border-gray-200 dark:border-gray-800 relative overflow-hidden">
                <div class="absolute top-0 right-0 bg-gray-200 dark:bg-gray-800 px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-widest text-gray-500">Visualization</div>
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-right font-bold text-green-600 dark:text-green-400">Mount</span>
                        <span class="text-gray-400">→</span>
                        <span>Start Synchronization</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-right font-bold text-blue-600 dark:text-blue-400">Update</span>
                        <span class="text-gray-400">→</span>
                        <span>Stop Old Sync (Cleanup)</span>
                        <span class="text-gray-400">+</span>
                        <span>Start New Sync</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-right font-bold text-red-600 dark:text-red-400">Unmount</span>
                        <span class="text-gray-400">→</span>
                        <span>Stop Comparison (Cleanup)</span>
                    </div>
                </div>
            </div>

            <p>
                Notice how "Update" is actually just "Cleanup + Re-run". React doesn't distinguish between "Mounting" and "Updating" for effects. It only knows: 
                <em>"The dependencies changed. The old synchronization is invalid. I must clean it up and start a new one."</em>
            </p>
        </div>
      </section>

      <!-- 3. The Dependency Array -->
      <section id="dependency-truth" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-brand-primary">03.</span>
            The Dependency Array is Truth
        </h2>
        
        <div class="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <p class="text-yellow-800 dark:text-yellow-200 font-medium text-lg">
                <strong>Crucial Insight:</strong> You do not "choose" your dependencies. The code chooses them for you. The dependency array is a list of <em>every reactive value</em> referenced inside your effect.
            </p>
        </div>

        <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <p>
                If you use a variable inside <code>useEffect</code>, and that variable is declared inside the component (props, state, or derived variables), it <strong>must</strong> go in the array. 
                Why? Because if it changes, your effect is using a stale version of it.
            </p>

            <h3 class="text-2xl font-bold mt-12 mb-6">Object Integrity & Infinite Loops</h3>
            <p>
                One of the most common pitfalls is passing objects or arrays into the dependency array. 
                React uses <code>Object.is()</code> (referential equality) to compare dependencies.
            </p>
            
            <pre class="mockup-code bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm"><code>// ❌ BAD: Infinite Loop waiting to happen
function BadComponent() {
  const options = { id: 1 }; // Created NEW every render

  useEffect(() => {
    doSomething(options);
  }, [options]); // 🔴 Dependency changes every render!
}

// ✅ GOOD: Memoize the object
function GoodComponent() {
  const options = useMemo(() => ({ id: 1 }), []); // Stable reference

  useEffect(() => {
    doSomething(options);
  }, [options]); // ✅ Stable
}</code></pre>
            <p class="mt-4">
               Always ask yourself: <em>"Is this variable referentially stable?"</em> If not, wrap it in <code>useMemo</code> or move it outside the component if it's static.
            </p>
        </div>
      </section>

      <!-- 4. Stale Closures -->
      <section id="stale-closures" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-brand-primary">04.</span>
            The Stale Closure Trap
        </h2>
        
        <p class="text-xl text-gray-700 dark:text-gray-300 mb-8 font-light">
            JavaScript closures are a feature, but in React hooks, they can look like a bug. When an effect runs, it "captures" the values of state and props <em>at that specific moment in time</em>.
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
            <div class="bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl border border-red-100 dark:border-red-900/30">
                <h4 class="font-bold text-xl text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
                    <span>❌</span> The Broken Counter
                </h4>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    This effect creates a closure around \`count\` when \`count\` is 0. The interval function <em>always</em> sees \`count\` as 0. So it always updates to 1.
                </p>
                <div class="bg-white dark:bg-black/40 p-4 rounded-lg">
<pre class="text-xs text-red-700 dark:text-red-300 overflow-x-auto"><code>useEffect(() => {
  const id = setInterval(() => {
    console.log(count); // Always 0
    setCount(count + 1); // Always sets to 1
  }, 1000);
  return () => clearInterval(id);
}, []); // Empty deps = Run once</code></pre>
                </div>
            </div>

            <div class="bg-green-50 dark:bg-green-900/10 p-8 rounded-2xl border border-green-100 dark:border-green-900/30">
                <h4 class="font-bold text-xl text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
                    <span>✅</span> The Functional Fix
                </h4>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    By using the functional updater, we tell React: "I don't care what the value is right now. Just take the <em>previous</em> value and add 1."
                </p>
                <div class="bg-white dark:bg-black/40 p-4 rounded-lg">
<pre class="text-xs text-green-700 dark:text-green-300 overflow-x-auto"><code>useEffect(() => {
  const id = setInterval(() => {
    // Functional update
    setCount(prev => prev + 1);
  }, 1000);
  return () => clearInterval(id);
}, []); // Valid! We don't read 'count'</code></pre>
                </div>
            </div>
        </div>
      </section>

      <!-- 5. Race Conditions -->
      <section id="race-conditions" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-brand-primary">05.</span>
            Data Fetching & Race Conditions
        </h2>
        
        <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <p>
                Imagine a user clicks "User 1". The app starts fetching User 1. <br/>
                Then quickly, the user clicks "User 2". The app starts fetching User 2.<br/>
                The "User 2" request finishes instantly (maybe it was cached). <br/>
                Then "User 1" request finishes (it was slow).
            </p>
            <p>
                <strong>The Bug:</strong> The UI displays "User 2" in the header, but the detailed data is overwritten by "User 1". You are now showing mismatched data. This is a <strong>Race Condition</strong>.
            </p>
            
            <h3 class="text-2xl font-bold mt-8 mb-4">The Solution: Cleanup Functions & AbortController</h3>
            <p>
                There are two ways to solve this. The "Boolean Flag" method (classic) and the "AbortController" method (modern standard).
            </p>

             <div class="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto shadow-2xl my-6">
<pre><code>// ✅ The Modern Standard Pattern
useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  async function fetchData() {
    try {
      const response = await fetch(\`/api/user/\${id}\`, { signal });
      const data = await response.json();
      setUser(data);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        setError(err);
      }
    }
  }

  fetchData();

  // 🧹 Cleanup: Abort the fetch if the component unmounts
  // or if 'id' changes before the fetch finishes.
  return () => {
    controller.abort();
  };
}, [id]);</code></pre>
             </div>
             <p>
                By aborting the request in the cleanup function, you ensure that even if the network request finishes, it won't trigger a state update on an unmounted component or stale render cycle.
             </p>
        </div>
      </section>

      <!-- 6. Effects vs Events -->
      <section id="effects-vs-events" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-brand-primary">06.</span>
            When NOT to use useEffect
        </h2>

         <div class="bg-orange-50 dark:bg-orange-900/10 p-8 rounded-2xl mb-8 border border-orange-200 dark:border-orange-900/30">
             <h3 class="text-2xl font-bold text-orange-900 dark:text-orange-200 mb-4">The Golden Rule of Events</h3>
             <p class="text-lg text-orange-800 dark:text-orange-300">
                "If the logic is triggered by a specific user interaction, it belongs in an Event Handler, NOT an Effect."
             </p>
         </div>

         <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div>
                 <h4 class="font-bold text-lg mb-4 text-center border-b pb-2">Example: Submitting a Form</h4>
                 <div class="space-y-4">
                     <div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg">
                        <span class="font-bold text-red-600 block mb-2">❌ Bad: Effect Chaining</span>
                        <p class="text-sm">User clicks Submit -> Set specific state 'isSubmitting' -> Effect sees 'isSubmitting' -> Effect calls API. <br/>This is hard to trace and debug.</p>
                     </div>
                     <div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg">
                        <span class="font-bold text-green-600 block mb-2">✅ Good: Event Handler</span>
                        <p class="text-sm">User clicks Submit -> \`handleSubmit\` calls API directly. <br/>Clear, synchronous intent.</p>
                     </div>
                 </div>
             </div>
             <div>
                 <h4 class="font-bold text-lg mb-4 text-center border-b pb-2">Example: Buying an Item</h4>
                 <div class="space-y-4">
                     <div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg">
                        <span class="font-bold text-red-600 block mb-2">❌ Bad: Watching State</span>
                        <p class="text-sm">Watching \`cart.items\` length to trigger a 'Purchase' analytics event.</p>
                     </div>
                     <div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg">
                        <span class="font-bold text-green-600 block mb-2">✅ Good: The Click</span>
                        <p class="text-sm">Trigger the 'Purchase' event in the \`onClick\` handler of the 'Buy Now' button.</p>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      <!-- 7. Pro Tips -->
      <section id="pro-tips" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-brand-primary">07.</span>
            Pro Tips & Pitfalls
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <h4 class="font-bold text-lg mb-2">💡 Pro Tip: Extract Logic</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    If your \`useEffect\` is more than 10 lines long, it likely deserves to be a custom hook. \`useWindowListener\`, \`useFetch\`, \`useInterval\`. Name your effects by extracting them!
                </p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <h4 class="font-bold text-lg mb-2">💡 Pro Tip: Derived State</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    Never use \`useEffect\` to calculate state based on other state. simple variables during render.
                    <br/>
                    <code class="text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded">const fullName = firstName + ' ' + lastName;</code> is better than an effect that sets fullName.
                </p>
            </div>
             <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <h4 class="font-bold text-lg mb-2">⚠️ Pitfall: Empty Dependency Array</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    Using \`[]\` to mimic \`componentDidMount\` is a lie. If your effect relies on props/state, and you omit them, your effect will have bugs. If you really need to ignore updates, use \`useRef\` to hold the value.
                </p>
            </div>
             <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <h4 class="font-bold text-lg mb-2">⚠️ Pitfall: Async Functions</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    You cannot make the effect callback async like \`useEffect(async () => ...)\`. It returns a Promise, but React expects a Cleanup function. Define the async function <em>inside</em> the effect and call it.
                </p>
            </div>
        </div>
      </section>

      <!-- 8. Virality -->
      <section id="virality" class="scroll-mt-32 pt-12 border-t border-gray-200 dark:border-gray-800">
         <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
            08. Share the Knowledge
         </h2>
         
         <!-- Did You Know -->
         <div class="bg-indigo-600 text-white p-8 rounded-2xl mb-12 shadow-xl transform hover:scale-[1.01] transition-transform">
             <div class="flex items-start gap-4">
                 <span class="text-4xl">💡</span>
                 <div>
                     <h4 class="text-2xl font-bold mb-2 !text-white">Did You Know?</h4>
                     <p class="!text-white text-lg font-medium opacity-90">
                         React runs your effects <strong class="!text-white">twice</strong> in Strict Mode (development only) specifically to stress-test your cleanup functions? If your effect breaks when run twice, it's buggy!
                     </p>
                 </div>
             </div>
         </div>


         
         <div class="mt-8 flex flex-wrap gap-2 justify-center">
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#ReactJS</span>
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#WebDevelopment</span>
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#JavaScript</span>
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#Frontend</span>
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#CodingTips</span>
         </div>
         
         <div class="mt-12 text-center max-w-2xl mx-auto">
             <h4 class="text-xl font-bold mb-4">The Challenge</h4>
             <p class="text-gray-600 dark:text-gray-400 mb-6">
                 Go through your codebase. Find one \`useEffect\` with a \`// eslint-disable-next-line\` comment. Fix it properly using the techniques above. Your future self will thank you.
             </p >
  <button class="bg-brand-primary text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
    Subscribe for More React Deep Dives
  </button>
         </div >
      </section >

      <!-- 9. Interactive Demo -->
  <section id="interactive-demo" class="scroll-mt-32">
    <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
      <span class="text-brand-primary">09.</span>
      The Playground: Interval Lab
    </h2>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
      This interactive component demonstrates the concepts of <strong>Synchronization</strong> and <strong>Cleanup</strong>.
      <br />
      Open your browser console to see the logs. Notice how the "Cleanup" log always fires immediately before the "Effect" log when you change the slider. That is the synchronization cycle in action.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <!-- Concept -->
      <div class="space-y-4">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span class="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded text-sm uppercase tracking-wide">Lab</span>
          Lifecycle Visualizer
        </h3>
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          1. Toggle the component on/off (Mount/Unmount). <br />
          2. Change the interval speed (Update). <br />
          Observe how the effect cleanly handles dynamic changes without restart the whole app.
        </p>
      </div>
    </div>
  </section>
    </div >
  `,
  code: `import React, { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    // ✅ 1. Synchronize: Start Interval
    console.log('✅ Effect: Starting Interval');
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, delay);

    // ✅ 2. Cleanup: Clear Interval
    // This runs BEFORE the next effect, or on unmount
    return () => {
      console.log('🧹 Cleanup: Clearing Interval');
      clearInterval(id);
    };
  }, [isRunning, delay]); // Dependencies: The "Truth"

  return (
    <div className="bg-white dark:bg-[#111] text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl p-8 flex flex-col md:flex-row gap-8 h-[500px]">
      {/* Controls */}
      <div className="w-full md:w-1/3 space-y-6">
        <h3 className="text-xl font-bold">Effect Controls</h3>

        <button
          onClick={() => setIsRunning(!isRunning)}
          className={\`w-full py-3 rounded-lg font-bold transition-all shadow-md \${isRunning ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}\`}
            >
        {isRunning ? 'Unmount (Stop Sync)' : 'Mount (Start Sync)'}
      </button>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-gray-500">Interval Speed ({delay}ms)</label>
        <input
          type="range" min="100" max="2000" step="100"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-800 accent-blue-500"
        />
      </div>

      <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-xl text-xs font-mono border border-gray-200 dark:border-gray-800">
        <div className="text-gray-500 mb-2 font-bold uppercase tracking-wider">// Dependency Array</div>
        <div>[ <span className={isRunning ? 'text-green-500' : 'text-red-500'}>{isRunning.toString()}</span>, <span className="text-blue-500">{delay}</span> ]</div>
      </div>

      <div className="text-xs text-blue-500 italic bg-blue-50 dark:bg-blue-900/10 p-2 rounded">
        * Check your browser console to see the 'Cleanup' and 'Effect' logs firing in order.
      </div>
    </div>

        {/* Visualizer */ }
  <div className="flex-1 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col items-center justify-center relative">
    <div className="text-8xl font-black font-mono text-gray-900 dark:text-white mb-4 animate-in zoom-in-50 duration-300" key={count}>
      {count}
    </div>
    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">
      Updates
    </div>

    <div className="absolute top-4 right-4 flex gap-2">
      <button onClick={() => setCount(0)} className="text-xs text-gray-400 hover:text-gray-900 dark:hover:text-white underline">Reset Counter</button>
    </div>
  </div>
    </div >
  );
}
`
}

export const deathOfUseMemo = {
  slug: "death-of-usememo",
  title: "The Death of useMemo: Why the React Compiler Changed Everything in 2026",
  description: "Stop manually memoizing. The React Compiler (React Forget) is here, and it's rewriting the rules of performance. Discover how to write cleaner, faster React code without the hook overhead.",
  thumbnail: "/images/tutorials/death-of-usememo-thumb.png",
  tags: ["React 19", "Compiler", "Performance", "Architecture", "Future"],
  keywords: ["React Compiler", "React Forget", "useMemo", "useCallback", "Auto-memoization", "React 19", "Performance Optimization"],
  difficulty: "Advanced",
  readTime: "30 min read",
  author: "Sébastien Markbåge (Inspired)",
  createdAt: new Date().toISOString(),
  toc: [
    { id: "introduction", label: "01. The End of Manual Memoization" },
    { id: "what-is-react-compiler", label: "02. What is the React Compiler?" },
    { id: "before-vs-after", label: "03. Before vs. After: A Code Comparison" },
    { id: "how-it-works", label: "04. Under the Hood: Auto-Memoization" },
    { id: "edge-cases", label: "05. When the Compiler Fails (and How to Fix It)" },
    { id: "educational-value", label: "06. Educational Value: The New Mental Model" },
    { id: "virality-boosters", label: "07. Share the Knowledge" }
  ],
  content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
      
      <!-- 1. Introduction -->
      <section id="introduction" class="scroll-mt-32">
         <div class="border-l-8 border-purple-600 bg-purple-50 dark:bg-purple-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                <span class="text-purple-600">RIP useMemo.</span> You served us well, but your watch is ended.
            </h1>
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                For years, we've polluted our codebases with dependency arrays, manual caching, and the endless "is this expensive enough to memoize?" debate. <br/>
                React 19 and the React Compiler have changed the game. It's time to delete those hooks.
            </p>
         </div>

         <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8">
            <p>
                <strong>The Shift is Real:</strong> You open a file. You see <code>useMemo</code> wrapping a simple object. You see <code>useCallback</code> passing a function to a child. You sigh. This is the "React Tax" we've paid for performance. But in 2026, this tax has been abolished.
            </p>
            <p>
                The <strong>React Compiler</strong> (formerly React Forget) isn't just a tool; it's a paradigm shift. It automatically memoizes your components, props, and hooks logic at build time. This means you get the performance of a perfectly tuned app with the simplicity of a "naive" render implementation. In this deep dive, we'll explore how this magic works, look at the stark difference in code cleanliness, and identify the few edge cases where you still need to be the pilot.
            </p>
         </div>
      </section>

      <!-- 2. What is React Compiler -->
      <section id="what-is-react-compiler" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-purple-600">02.</span>
            What is the React Compiler?
        </h2>
        
        <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <p>
                Historically, React re-renders were "reactive" but often excessive. If a parent re-rendered, all children re-rendered unless you explicitly told them not to (via <code>React.memo</code>, <code>useMemo</code>, etc.). The React Compiler inverts this model.
            </p>
            <p>
                It is a build-time tool (like Babel or SWC plugins) that deeply understands JavaScript and React's rules. It analyzes your data flow and automatically inserts memoization logic where it detects it's necessary. It's "fine-grained reactivity" without the manual overhead.
            </p>
            
            <div class="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl my-8">
                <h3 class="text-2xl font-bold mb-4">The Promise</h3>
                <ul class="list-disc pl-6 space-y-3">
                    <li><strong>No more dependency arrays:</strong> You don't list dependencies; the compiler infers them.</li>
                    <li><strong>Default performance:</strong> Apps are fast by default, not by optimization.</li>
                    <li><strong>Cleaner code:</strong> Business logic stands out; performance boilerplate disappears.</li>
                </ul>
            </div>
        </div>
      </section>

      <!-- 3. Before vs After -->
      <section id="before-vs-after" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-purple-600">03.</span>
            Before vs. After: A Code Comparison
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                <h4 class="font-bold text-xl text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
                    <span>🚫</span> Before: Hook Hell
                </h4>
                <div class="bg-white dark:bg-black/40 p-4 rounded-lg overflow-x-auto">
<pre class="text-xs text-red-700 dark:text-red-300"><code>function ExpensiveComponent({ data, onSelect }) {
  // Manual Calculation
  const processed = useMemo(() => {
    return data.map(item => expensiveFn(item));
  }, [data]);

  // Stable Reference
  const handleClick = useCallback((id) => {
    onSelect(id);
    logAnalytics('select', id);
  }, [onSelect]);

  const options = useMemo(() => ({ 
    theme: 'dark' 
  }), []);

  return (
    &lt;List 
      items={processed} 
      onClick={handleClick} 
      config={options} 
    /&gt;
  );
}</code></pre>
                </div>
                <p class="text-sm mt-4 text-gray-600 dark:text-gray-400">
                    Look at the noise. Dependency arrays, wrapping functions, stable object references... easy to get wrong, hard to read.
                </p>
            </div>

            <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-900/30">
                <h4 class="font-bold text-xl text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
                    <span>✅</span> After: Pure Logic
                </h4>
                <div class="bg-white dark:bg-black/40 p-4 rounded-lg overflow-x-auto">
<pre class="text-xs text-green-700 dark:text-green-300"><code>function ExpensiveComponent({ data, onSelect }) {
  // Just write JavaScript!
  const processed = data.map(item => expensiveFn(item));

  function handleClick(id) {
    onSelect(id);
    logAnalytics('select', id);
  }

  const options = { theme: 'dark' };

  return (
    &lt;List 
      items={processed} 
      onClick={handleClick} 
      config={options} 
    /&gt;
  );
}</code></pre>
                </div>
                 <p class="text-sm mt-4 text-gray-600 dark:text-gray-400">
                    The compiler sees <code>processed</code> depends on <code>data</code>. It sees <code>options</code> is static. It handles the caching automagically.
                </p>
            </div>
        </div>
      </section>

      <!-- 4. How It Works -->
      <section id="how-it-works" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-purple-600">04.</span>
            Under the Hood: Auto-Memoization
        </h2>
        <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <p>
                The compiled code doesn't just wrap everything in <code>useMemo</code>. It uses a lower-level primitive, often referred to conceptually as <code>useMemoCache</code>.
            </p>
            <p>
                The compiler generates code that checks if inputs have changed using strict equality <code>===</code>. If they haven't, it returns a cached value. This is similar to how you manually wrote memoization, but it's applied granually to groups of statements.
            </p>
            <pre class="mockup-code bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm my-6"><code>// Conceptual Output of the Compiler
function CompiledComponent(props) {
  const $ = useMemoCache(10); // Hook to hold cached values
  const { data } = props;
  
  let processed;
  // If data hasn't changed...
  if ($[0] !== data) {
     processed = data.map(item => expensiveFn(item));
     $[0] = data;
     $[1] = processed;
  } else {
     processed = $[1];
  }
  // ... and so on
}</code></pre>
            <p>
                This "Memoization Cache" hook is highly optimized and allows React to skip re-executing blocks of code within a component, not just the whole component itself.
            </p>
        </div>
      </section>

      <!-- 5. Edge Cases -->
      <section id="edge-cases" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-purple-600">05.</span>
            When the Compiler Fails (and How to Fix It)
        </h2>
        
        <div class="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <p class="text-yellow-800 dark:text-yellow-200 font-medium text-lg">
                <strong>Reality Check:</strong> The compiler is good, but it's not omniscient. It relies on the "Rules of React". If you break them, it bails out.
            </p>
        </div>

        <div class="space-y-6">
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <h4 class="font-bold text-lg mb-2">1. Mutation of Props or State</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    If you mutate variables that are tracked by React (like doing <code>props.user.name = 'Bob'</code>), the compiler cannot safely optimize. You must treat data as immutable.
                </p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <h4 class="font-bold text-lg mb-2">2. Dynamic Dependency Arrays (Legacy)</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    If you have existing code doing weird things with <code>useEffect</code> dependencies or suppression comments, the compiler might skip optimizing that component.
                </p>
            </div>
             <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <h4 class="font-bold text-lg mb-2">3. "use no memo"</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    There's an escape hatch directive (<code>"use no memo"</code>) for highly dynamic components where the overhead of checking the cache outweighs the benefit of caching (rare, but possible).
                </p>
            </div>
        </div>
      </section>

      <!-- 6. Educational Value -->
      <section id="educational-value" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-purple-600">06.</span>
            Educational Value: The New Mental Model
        </h2>
        <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <p>
                As an educator or senior dev, how do you explain this? 
            </p>
            <ul>
                <li><strong>Beginners:</strong> Don't teach <code>useMemo</code>/<code>useCallback</code> early anymore. Teach JavaScript. React just "works".</li>
                <li><strong>Intermediates:</strong> Focus on referential identity when crossing boundaries (e.g. passing things to external libraries or Context).</li>
                <li><strong>Experts:</strong> Your job is now Architecture, not Micro-optimization. Focus on component boundaries, data fetching strategies (RSC), and UX transitions.</li>
            </ul>
        </div>
      </section>

      <!-- 7. Virality Boosters -->
      <section id="virality-boosters" class="scroll-mt-32">
         <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-purple-600">07.</span>
            Share the Knowledge
         </h2>

         <!-- Did You Know -->
         <div class="bg-purple-600 text-white p-8 rounded-2xl mb-12 shadow-xl transform hover:scale-[1.01] transition-transform">
             <div class="flex items-start gap-4">
                 <span class="text-4xl">💡</span>
                 <div>
                     <h4 class="text-2xl font-bold mb-2 !text-white">Did You Know?</h4>
                     <p class="!text-white text-lg font-medium opacity-90">
                         The React Compiler was heavily inspired by the optimization strategies of other frameworks like Svelte and SolidJS, proving that convergence in frontend tech leads to better tools for everyone.
                     </p>
                 </div>
             </div>
         </div>


         
         <div class="mt-8 flex flex-wrap gap-2 justify-center">
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#React19</span>
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#ReactCompiler</span>
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#WebPerf</span>
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#JavaScript</span>
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#FutureOfWork</span>
         </div>
      </section>
    </div>
  `,
  code: `import React, { useState } from 'react';

// With React Compiler, this entire component
// is automatically memoized. 

export default function ExpensiveList() {
  const [items, setItems] = useState(
    Array.from({ length: 5000 }, (_, i) => ({ id: i, val: Math.random() }))
  );
  const [filter, setFilter] = useState('');

  // No useMemo needed!
  // The compiler sees that 'filteredItems' only depends on 'items' and 'filter'.
  // It will cache this result automatically.
  const filteredItems = items.filter(item => 
    item.val.toString().includes(filter)
  );

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen font-mono">
      <h1 className="text-2xl mb-4 font-bold text-purple-400">
        React Compiler Demo
      </h1>
      
      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Filter Value:</label>
        <input 
          type="text" 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:border-purple-500 outline-none"
          placeholder="Type to filter..."
        />
      </div>

      <div className="border border-gray-700 rounded-lg p-4 h-96 overflow-auto">
        <div className="flex justify-between text-gray-500 mb-2 pb-2 border-b border-gray-800">
           <span>ID</span>
           <span>Value</span>
        </div>
        {filteredItems.map(item => (
          <div key={item.id} className="flex justify-between py-2 border-b border-gray-800/50 hover:bg-white/5">
             <span className="text-purple-300">#{item.id}</span>
             <span>{item.val.toFixed(4)}</span>
          </div>
        ))}
        {filteredItems.length === 0 && (
            <div className="text-center text-gray-500 py-10">No items found</div>
        )}
      </div>
      
      <p className="mt-4 text-xs text-gray-500">
        * In React 18, typing in the input would re-render the list logic every time unless wrapped in useMemo. 
        In React 19+ with Compiler, this is optimized by default.
      </p>
    </div>
  );
}`
};

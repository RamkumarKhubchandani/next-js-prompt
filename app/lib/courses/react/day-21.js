export const day21 = {
  day: 21,
  title: "The React Compiler (React Forget)",
  intro: "The end of manual memoization. Learn how the new compiler automatically optimizes your code so you can delete useMemo and useCallback.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 21. The React Compiler handles memoization for you. `useMemo` and `useCallback` are mostly obsolete."
      },
      {
        type: "challenge",
        instruction: "This code uses manual optimization. Simplify it for the React Compiler.",
        buggyCode: `// ❌ Manual Optimization
const fn = useCallback(() => {
  console.log(count);
}, [count]);`,
        solutionCode: `// ✅ Compiler Ready
const fn = () => {
  console.log(count);
};`,
        verifyOutput: "const fn = () =>",
        successMessage: "So fresh and clean! The compiler detects dependencies automatically, so you don't need to list them manually.",
        hint: "Just write a normal function without `useCallback`."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What is the React Compiler ("React Forget")?</li>
<li>How it eliminates re-renders automatically</li>
<li>Why you can stop using <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useMemo</code> and <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useCallback</code></li>
<li>How to verify it's working with DevTools</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🧠 The Problem: Manual Memoization</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">React 18 requires you to manually cache functions and objects to prevent children from re-rendering:</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-red-800 dark:text-red-200 text-sm">// ❌ Before Compiler: Dependency Hell
const handleClick = useCallback(() => {
console.log(count);
}, [count]); // Don't forget this!

const filtered = useMemo(() => {
return items.filter(i => i > 10);
}, [items]); // Or this!</pre>
<p class="text-red-700 dark:text-red-300 text-sm mt-2">Miss a dependency? Bugs. Add too many? Performance loss.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ The Solution: Auto-Memoization</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">The React Compiler analyzes your code at build time. It understands the data flow and caches <i>everything</i> automatically.</p>

<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl mb-6">
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-green-800 dark:text-green-200 text-sm">// ✅ After Compiler: Just write JavaScript!
const handleClick = () => {
console.log(count);
};

const filtered = items.filter(i => i > 10);</pre>
<p class="text-green-300 text-sm mt-2">The compiler rewrites this into highly optimized, cached code during the build.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔍 How it Works (Conceptual)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">The compiler wraps your component code in a specialized <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useMemoCache</code> hook:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-gray-800 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
function Component(props) {
const $ = useMemoCache(2); // React Internal Hook

let t0;
if ($[0] !== props.a) {
t0 = expensiveCalc(props.a); // Re-run only if 'a' changed
$[0] = props.a;
$[1] = t0;
} else {
t0 = $[1]; // Return cached value
}

return t0;
}
</pre>
</div>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║            ⚛️ REACT COMPILER DEMO                            ║
║      See how cleaner code works without manual optimization  ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   INSTRUCTIONS:                                              ║
║   1. Notice we use NO useMemo or useCallback                 ║
║   2. We pass an object and function to Child                 ║
║   3. In React 18, this would cause re-renders                ║
║   4. With Compiler, it's automatically stable!               ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 👶 CHILD COMPONENT
// ═══════════════════════════════════════════════════════════════
// We wrap in memo() to prove props are stable.
// If props change, this WILL log "Rendered!".
// If props are stable (thanks to compiler), it won't log.
const HeavyChild = React.memo(function HeavyChild({ config, onClick }) {
const renders = React.useRef(0);
renders.current++;

return (
<div style={{
  padding: '15px',
  background: renders.current > 1 ? '#fee2e2' : '#dcfce7',
  borderRadius: '8px',
  border: '2px solid #cbd5e1',
  transition: 'background 0.3s'
}}>
  <h4 style={{ margin: 0, color: '#334155' }}>👶 Child Component</h4>
  <p style={{ margin: '5px 0 0', fontSize: '12px' }}>
    Render Count: <strong>{renders.current}</strong>
  </p>
  <p style={{ fontSize: '12px', color: '#64748b' }}>
    Config: {JSON.stringify(config)}
  </p>
  <button onClick={onClick} style={{ marginTop: '10px', padding: '5px 10px' }}>
    Call Parent
  </button>
</div>
);
});

function App() {
const [count, setCount] = React.useState(0);
const [color, setColor] = React.useState('blue');

// ═══════════════════════════════════════════════════════════
// ❌ NO useMemo needed!
// The compiler sees that 'color' dependency didn't change
// when 'count' changed, so it reuses this object!
// ═══════════════════════════════════════════════════════════
const config = { theme: color, debug: true };

// ═══════════════════════════════════════════════════════════
// ❌ NO useCallback needed!
// The compiler caches this function automatically.
// ═══════════════════════════════════════════════════════════
const handleClick = () => {
console.log('Clicked in parent');
};

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>🤖 React Compiler Simulation</h3>
  
  <div style={{ marginBottom: '20px', padding: '15px', background: '#f1f5f9', borderRadius: '12px' }}>
    <p>Parent State (Unrelated to Child): <strong>{count}</strong></p>
    <button 
      onClick={() => setCount(c => c + 1)}
      style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px' }}
    >
      Increment Parent Count
    </button>
  </div>

  <div style={{ marginBottom: '20px' }}>
    <p>Child Prop (Related): <strong>{color}</strong></p>
    <button onClick={() => setColor(c => c === 'blue' ? 'red' : 'blue')}>
      Toggle Color
    </button>
  </div>

  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '10px' }}>
    👇 If Compiler is working, Child render count stays at <strong>1</strong> when you click "Increment Parent"!
  </p>

  <HeavyChild config={config} onClick={handleClick} />
</div>
);
}`,
  comparison: {
    junior: `// ❌ React 18 (Manual)
const handleClick = useCallback(() => {
doSomething(data);
}, [data]); // Manual array management`,
    senior: `// ✅ React 19 (Compiler)
const handleClick = () => {
doSomething(data);
};
// Compiler detects 'data' dependency 
// and caches the function automatically.`
  },
  interview: {
    questions: [
      {
        q: "How does the React Compiler optimize re-renders?",
        a: "It uses a build-time optimization to cache (memoize) values and components automatically. It effectively applies `useMemo` and `useCallback` everywhere it's needed without developer intervention."
      },
      {
        q: "Can the React Compiler break existing code?",
        a: "Generally no, if the code follows React Rules. However, code that relies on accidental re-renders or side effects during render might behave differently."
      }
    ]
  }
};

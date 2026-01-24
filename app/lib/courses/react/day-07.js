export const day07 = {
  day: 7,
  title: "Memoization (useMemo & useCallback)",
  intro: "Don't optimize prematurely. But when you do, use Memoization to skip expensive calculations.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 07. React re-calculates everything on every render. `useMemo` is like a cache."
      },
      {
        type: "challenge",
        instruction: "This expensive function runs on every render. Wrap it in `useMemo` so it only runs when `data` changes.",
        buggyCode: `// ❌ Slows down every render
const sorted = data.sort((a, b) => a - b);`,
        solutionCode: `// ✅ Cached result
const sorted = useMemo(() => {
  return data.sort((a, b) => a - b);
}, [data]);`,
        verifyOutput: "useMemo",
        successMessage: "Smart! Now the sort operation only happens when the data actually changes, saving CPU cycles.",
        hint: "Wrap the calculation in `useMemo(() => ..., [data])`."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Why React re-runs calculations on every render</li>
<li>How useMemo caches expensive calculations</li>
<li>How useCallback caches function references</li>
<li>When to use (and when NOT to use) memoization</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 The Problem: Wasted Calculations</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Every time a component re-renders, ALL code inside it runs again:</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-red-800 dark:text-red-200 text-sm">function ProductList({ products }) {
// ❌ This runs on EVERY render, even if products didn't change!
const sortedProducts = products
.filter(p => p.inStock)
.sort((a, b) => b.price - a.price)
.map(p => ({ ...p, discount: calculateDiscount(p) }));

return sortedProducts.map(...);
}</pre>
<p class="text-red-700 dark:text-red-300 text-sm mt-2">If parent re-renders 100 times, this calculation runs 100 times! 🐌</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🧮 Solution 1: useMemo - Cache Calculated Values</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">useMemo remembers the result and only recalculates when dependencies change:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">const memoizedValue = useMemo(() => {
// Expensive calculation here
return expensiveCalculation(a, b);
}, <span class="text-yellow-700 dark:text-yellow-300">[a, b]</span>); // Only recalculates when a or b changes!

// ═══════════════════════════════════════════════════
// HOW IT WORKS:
// ═══════════════════════════════════════════════════
// Render 1: [a=1, b=2] → Calculates → Returns 3 → Stores 3
// Render 2: [a=1, b=2] → Same deps → Returns cached 3 ✅
// Render 3: [a=1, b=5] → Deps changed → Recalculates → 6
// ═══════════════════════════════════════════════════</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 Solution 2: useCallback - Cache Function References</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">In JavaScript, functions are objects. A new function is created on every render:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">// ❌ WITHOUT useCallback:
function Parent() {
const handleClick = () => { ... };
// handleClick is a NEW function on every render!
// Child will always re-render (even with React.memo)
return &lt;Child onClick={handleClick} /&gt;;
}

// ✅ WITH useCallback:
function Parent() {
const handleClick = <span class="text-yellow-700 dark:text-yellow-300">useCallback</span>(() => {
console.log('clicked');
}, <span class="text-yellow-700 dark:text-yellow-300">[]</span>); // Same function reference every render!

return &lt;Child onClick={handleClick} /&gt;;
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 The Referential Equality Problem</h3>
<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
<p class="text-blue-800 dark:text-blue-200 mb-2">In JavaScript, objects/arrays/functions are compared by <span class="text-yellow-600 dark:text-yellow-400 font-bold">reference</span>, not value:</p>
<pre class="text-blue-700 dark:text-blue-300 text-sm bg-gray-100 dark:bg-dark-900 p-3 rounded mt-2">
{} === {}              // false (different references!)
[] === []              // false
(() => {}) === (() => {}) // false

const obj = {};
obj === obj            // true (same reference!)
</pre>
<p class="text-blue-800 dark:text-blue-200 mt-2 text-sm">This is why passing a new object/function as a prop always triggers child re-render!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Visual: When to Use What</h3>
<div class="overflow-x-auto mb-6">
<table class="w-full text-sm text-left">
    <thead class="bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-light-200">
        <tr>
            <th class="p-3 rounded-tl-lg">Scenario</th>
            <th class="p-3">Hook</th>
            <th class="p-3 rounded-tr-lg">Example</th>
        </tr>
    </thead>
    <tbody class="text-gray-600 dark:text-light-300">
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Expensive calculation</td>
            <td class="p-3 text-green-600 dark:text-green-400 font-bold">useMemo</td>
            <td class="p-3 font-mono text-xs">Filtering 10,000 items</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Creating object for dependency</td>
            <td class="p-3 text-green-600 dark:text-green-400 font-bold">useMemo</td>
            <td class="p-3 font-mono text-xs">useEffect deps</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Callback to memoized child</td>
            <td class="p-3 text-blue-400 font-bold">useCallback</td>
            <td class="p-3 font-mono text-xs">onClick to React.memo child</td>
        </tr>
        <tr>
            <td class="p-3 rounded-bl-lg">Callback in useEffect deps</td>
            <td class="p-3 text-blue-400 font-bold">useCallback</td>
            <td class="p-3 rounded-br-lg font-mono text-xs">Preventing infinite loops</td>
        </tr>
    </tbody>
</table>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Don't Over-Optimize!</h3>
<div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-500/30 p-4 rounded-xl mb-6">
<p class="text-yellow-700 dark:text-yellow-300 font-bold mb-2">🛑 Memoization has a cost!</p>
<ul class="text-yellow-800 dark:text-yellow-200 text-sm space-y-1">
    <li>• React must store the cached value in memory</li>
    <li>• React must compare dependencies on every render</li>
    <li>• For simple calculations, this overhead is MORE than just recalculating!</li>
</ul>
<p class="text-yellow-700 dark:text-yellow-300 mt-3 font-bold">Rule: Profile first, optimize second. Don't guess!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">useMemo for values</span> - results of calculations</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">useCallback for functions</span> - actually just useMemo(() => fn, deps)</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">React.memo for components</span> - wrap child to skip re-render if props same</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Use React DevTools Profiler</span> - find what actually needs optimization</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║          🎯 MEMOIZATION: useMemo & useCallback               ║
║      Skip expensive calculations & maintain stable refs      ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   THE PROBLEM:                                               ║
║   ═══════════════                                            ║
║   React re-runs your ENTIRE component on every render.       ║
║   Without memoization:                                       ║
║     - Expensive calculations run repeatedly                  ║
║     - New function references break child optimization       ║
║                                                              ║
║   THE SOLUTION:                                              ║
║   ═══════════════                                            ║
║                                                              ║
║   useMemo(() => value, [deps])                               ║
║     → Caches the RESULT of a calculation                     ║
║     → Only recalculates when deps change                     ║
║                                                              ║
║   useCallback(() => fn, [deps])                              ║
║     → Caches the FUNCTION itself                             ║
║     → Keeps same reference between renders                   ║
║     → Essential when passing to React.memo() children        ║
║                                                              ║
║   💡 TRY: Type in input vs click button - watch the log!     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function App() {
// ═══════════════════════════════════════════════════════════
// 📦 TWO PIECES OF STATE
// ═══════════════════════════════════════════════════════════
// count: Controls the expensive calculation
// text:  Independent state that SHOULD NOT trigger calculation
// ═══════════════════════════════════════════════════════════
const [count, setCount] = React.useState(0);
const [text, setText] = React.useState('');
const [computeLog, setComputeLog] = React.useState([]);

// ═══════════════════════════════════════════════════════════
// 🧮 useMemo: CACHE EXPENSIVE CALCULATION
// ═══════════════════════════════════════════════════════════
// WITHOUT useMemo: This runs on EVERY render (even text changes)
// WITH useMemo:    Only runs when [count] changes!
//
// Perfect for:
//   - Filtering/sorting large arrays
//   - Complex calculations
//   - Object creation for useEffect dependencies
// ═══════════════════════════════════════════════════════════
const expensiveValue = React.useMemo(() => {
const timestamp = new Date().toLocaleTimeString();
setComputeLog(prev => [...prev, '🧮 Computing at ' + timestamp]);

// Simulate expensive work
let result = 0;
for (let i = 0; i < count * 1000000; i++) {
  result += 1;
}
return count * 100;
}, [count]);  // ← Only recalculates when count changes!

// ═══════════════════════════════════════════════════════════
// 🔗 useCallback: CACHE FUNCTION REFERENCE
// ═══════════════════════════════════════════════════════════
// WITHOUT useCallback: New function created every render
//   → Children using React.memo() re-render anyway!
//
// WITH useCallback: Same function reference persists
//   → Children can skip re-rendering
// ═══════════════════════════════════════════════════════════
const handleClick = React.useCallback(() => {
setCount(c => c + 1);
}, []);  // ← Empty deps = always same function

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>🧮 Memoization Demo</h3>
  
  {/* Counter with memoized value */}
  <div style={{ 
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '15px'
  }}>
    <p style={{ margin: '0 0 10px', color: '#7c2d12' }}>
      Count: <strong>{count}</strong> | Computed: <strong>{expensiveValue}</strong>
    </p>
    <button 
      onClick={handleClick}
      style={{ 
        padding: '10px 20px',
        background: '#ea580c',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      + Increment (triggers useMemo)
    </button>
  </div>
  
  {/* Text input - should NOT trigger useMemo */}
  <div style={{ marginBottom: '15px' }}>
    <input 
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="Type here (NO recomputation!)"
      style={{ 
        padding: '12px',
        borderRadius: '8px',
        border: '2px solid #e2e8f0',
        width: '100%',
        fontSize: '16px'
      }}
    />
    <p style={{ color: '#64748b', fontSize: '13px', marginTop: '5px' }}>
      ⬆️ Typing here re-renders but useMemo skips calculation!
    </p>
  </div>
  
  {/* Computation log */}
  <div style={{ 
    background: '#0f172a', 
    padding: '15px',
    borderRadius: '12px',
    border: '1px solid #334155'
  }}>
    <p style={{ color: '#94a3b8', margin: '0 0 10px', fontSize: '14px' }}>
      📋 Computation Log (should only update on button click):
    </p>
    <div style={{ color: '#22c55e', fontFamily: 'monospace', fontSize: '12px' }}>
      {computeLog.slice(-5).map((log, i) => (
        <div key={i}>→ {log}</div>
      ))}
    </div>
  </div>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Breaking Memoization
const Child = React.memo(C);

function Parent() {
// New function created EVERY render
const onClick = () => {};
return <Child onClick={onClick} />;
// Child re-renders anyway
}`,
    senior: `// ✅ Stable Reference
const Child = React.memo(C);

function Parent() {
// Stable function reference
const onClick = useCallback(() => {}, []);
return <Child onClick={onClick} />;
// Child skips render
}`
  },
  interview: {
    questions: [
      {
        q: "When should you NOT use useMemo?",
        a: "For primitive values or cheap calculations. The overhead of checking dependencies can be higher than the calculation itself."
      }
    ]
  }
};

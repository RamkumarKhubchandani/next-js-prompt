export const day05 = {
  day: 5,
  title: "Effects & Lifecycle",
  intro: "useEffect is how React talks to the outside world - APIs, timers, subscriptions. Master this hook!",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What is a "side effect"?</li>
<li>The 3 types of useEffect</li>
<li>The dependency array explained</li>
<li>Cleanup functions (prevent memory leaks!)</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 What is a Side Effect?</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">A <span class="text-yellow-600 dark:text-yellow-400 font-bold">side effect</span> is anything that happens OUTSIDE of rendering:</p>

<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl">
    <p class="text-green-700 dark:text-green-300 font-bold mb-2">✅ Rendering (Pure)</p>
    <ul class="text-green-800 dark:text-green-200 text-sm space-y-1">
        <li>• Calculating what to display</li>
        <li>• Returning JSX</li>
        <li>• Transforming data</li>
    </ul>
</div>
<div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-500/30 p-4 rounded-xl">
    <p class="text-yellow-700 dark:text-yellow-300 font-bold mb-2">⚡ Side Effects</p>
    <ul class="text-yellow-800 dark:text-yellow-200 text-sm space-y-1">
        <li>• Fetching data from API</li>
        <li>• Setting up timers</li>
        <li>• Subscribing to events</li>
        <li>• Changing the DOM directly</li>
    </ul>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚙️ The 3 Types of useEffect</h3>

<div class="space-y-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border-l-4 border-red-500">
    <p class="text-gray-900 dark:text-white font-bold">Type 1: Run on EVERY render</p>
    <pre class="bg-gray-100 dark:bg-dark-900 p-3 rounded mt-2 text-gray-800 dark:text-cyan-300 text-sm">useEffect(() => {
console.log('I run after EVERY render');
}); // ← No dependency array!</pre>
    <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">⚠️ Use rarely - can cause performance issues</p>
</div>

<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border-l-4 border-green-500">
    <p class="text-gray-900 dark:text-white font-bold">Type 2: Run ONCE on mount</p>
    <pre class="bg-gray-100 dark:bg-dark-900 p-3 rounded mt-2 text-gray-800 dark:text-cyan-300 text-sm">useEffect(() => {
console.log('I run ONCE when component mounts');
fetchData(); // Perfect for initial API calls!
}, <span class="text-yellow-800 dark:text-yellow-300">[]</span>); // ← Empty array = mount only</pre>
    <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">✅ Most common - use for initial data fetching</p>
</div>

<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border-l-4 border-blue-500">
    <p class="text-gray-900 dark:text-white font-bold">Type 3: Run when DEPENDENCIES change</p>
    <pre class="bg-gray-100 dark:bg-dark-900 p-3 rounded mt-2 text-gray-800 dark:text-cyan-300 text-sm">useEffect(() => {
console.log('userId changed to:', userId);
fetchUser(userId);
}, <span class="text-yellow-800 dark:text-yellow-300">[userId]</span>); // ← Runs when userId changes</pre>
    <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">✅ Use when effect depends on specific values</p>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🧹 Cleanup Functions (Prevent Memory Leaks!)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">The <span class="text-yellow-600 dark:text-yellow-400 font-bold">return function</span> runs BEFORE the effect re-runs or when component unmounts:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="bg-gray-100 dark:bg-dark-900 text-gray-800 dark:text-cyan-300">useEffect(() => {
// ✅ Setup: Subscribe to something
const subscription = someAPI.subscribe(data);

// 🧹 Cleanup: Unsubscribe when done
<span class="text-yellow-800 dark:text-yellow-300">return () => {
subscription.unsubscribe();
};</span>
}, []);</pre>
</div>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<p class="text-red-700 dark:text-red-300 font-bold">⚠️ Common Memory Leak:</p>
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-red-900 dark:text-red-200 text-sm mt-2">useEffect(() => {
setInterval(() => {
setCount(c => c + 1);
}, 1000);
// ❌ Interval keeps running even after unmount!
}, []);</pre>
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-green-800 dark:text-green-200 text-sm mt-2">// ✅ Fixed:
useEffect(() => {
const id = setInterval(() => setCount(c => c + 1), 1000);
return () => clearInterval(id); // 🧹 Cleanup!
}, []);</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Visual: Effect Lifecycle</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-gray-800 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Component Mounts
   │
   ▼
┌──────────────────┐
│  First Render    │
└──────────────────┘
   │
   ▼
┌──────────────────┐
│  useEffect runs  │ ← Setup (fetch, subscribe)
└──────────────────┘
   │
   ▼ (state changes)
┌──────────────────┐
│  Re-render       │
└──────────────────┘
   │
   ▼
┌──────────────────┐
│  Cleanup runs    │ ← Return function
│  Effect re-runs  │ ← If dependencies changed
└──────────────────┘
   │
   ▼ (unmount)
┌──────────────────┐
│  Final Cleanup   │ ← Prevent memory leaks!
└──────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Include ALL values</span> from component scope that the effect uses</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">ESLint will warn you</span> if you forget a dependency - listen to it!</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Avoid objects/arrays</span> in dependencies (they change every render)</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Use multiple useEffects</span> for unrelated logic (separation of concerns)</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║              🎯 useEffect LIFECYCLE DEMO                     ║
║         Understand when effects run & cleanup                ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   EFFECT TYPES & WHEN THEY RUN:                              ║
║   ══════════════════════════════                             ║
║                                                              ║
║   useEffect(() => {...})           → EVERY render           ║
║   useEffect(() => {...}, [])       → ONCE on mount          ║
║   useEffect(() => {...}, [dep])    → When dep changes       ║
║                                                              ║
║   LIFECYCLE FLOW:                                            ║
║   ════════════════                                           ║
║                                                              ║
║   Mount → Render → Effect runs                               ║
║      ↓                                                       ║
║   State Change → Re-render → Cleanup → Effect re-runs        ║
║      ↓                                                       ║
║   Unmount → Final Cleanup                                    ║
║                                                              ║
║   💡 TRY THIS: Click the button and watch the log!           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function App() {
// ═══════════════════════════════════════════════════════════
// 📦 STATE: Values that trigger re-renders when changed
// ═══════════════════════════════════════════════════════════
const [count, setCount] = React.useState(0);
const [logs, setLogs] = React.useState([]);  // Log history

// Helper function to add messages to our log
const log = (msg) => setLogs(prev => [...prev, msg]);

// ═══════════════════════════════════════════════════════════
// ⚡ EFFECT TYPE 1: NO DEPENDENCY ARRAY
// ═══════════════════════════════════════════════════════════
// This runs after EVERY render (initial + all updates)
// ⚠️ Use sparingly - can cause performance issues!
//
// Timeline:
//   Render 1 → Effect runs
//   Render 2 → Effect runs  
//   Render 3 → Effect runs... and so on
// ═══════════════════════════════════════════════════════════
React.useEffect(() => {
  // We use console.log here to avoid an infinite loop (since 'log' updates state!)
  console.log('🔄 Effect: Runs on EVERY render');
});

// ═══════════════════════════════════════════════════════════
// ⚡ EFFECT TYPE 2: EMPTY DEPENDENCY ARRAY []
// ═══════════════════════════════════════════════════════════
// This runs ONLY ONCE when component mounts.
// Perfect for: initial API calls, setting up subscriptions
//
// The RETURN function is the CLEANUP:
//   - Runs when component unmounts
//   - Prevents memory leaks
//   - Example: unsubscribe, clearTimeout, remove listeners
// ═══════════════════════════════════════════════════════════
React.useEffect(() => {
log('✅ Effect: Component MOUNTED!');

// 🧹 Cleanup function - runs on unmount
return () => log('❌ Cleanup: Component UNMOUNTING...');
}, []);  // ← Empty array = run once

// ═══════════════════════════════════════════════════════════
// ⚡ EFFECT TYPE 3: WITH DEPENDENCIES [count]
// ═══════════════════════════════════════════════════════════
// This runs:
//   1. Once on initial mount
//   2. Again whenever 'count' changes
//
// React checks: did count change? 
//   Yes → Run effect
//   No  → Skip effect
// ═══════════════════════════════════════════════════════════
React.useEffect(() => {
log('📊 Effect: count changed to ' + count);
}, [count]);  // ← Runs when count changes

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>⚡ useEffect Lifecycle Demo</h3>
  
  {/* Counter display */}
  <div style={{ 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    borderRadius: '12px',
    color: 'white',
    marginBottom: '15px'
  }}>
    <span style={{ fontSize: '32px', fontWeight: 'bold' }}>{count}</span>
    <button 
      onClick={() => setCount(c => c + 1)}
      style={{ 
        marginLeft: '15px',
        padding: '10px 20px',
        background: 'white',
        color: '#764ba2',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      + Increment
    </button>
  </div>
  
  {/* Effect log - shows exactly when each effect runs */}
  <div style={{ 
    padding: '15px', 
    background: '#0f172a', 
    borderRadius: '12px',
    border: '1px solid #334155'
  }}>
    <p style={{ color: '#94a3b8', margin: '0 0 10px', fontSize: '14px' }}>
      📋 Effect Log (watch the order!)
    </p>
    <div style={{ 
      color: '#22c55e', 
      fontFamily: 'monospace', 
      fontSize: '12px', 
      maxHeight: '120px', 
      overflow: 'auto' 
    }}>
      {logs.map((log, i) => (
        <div key={i} style={{ padding: '2px 0' }}>→ {log}</div>
      ))}
    </div>
  </div>
  
  <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
    💡 Click the button multiple times and observe which effects run!
  </p>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Missing Dependency
useEffect(() => {
console.log(count);
}, []); // Warning: count is stale!`,
    senior: `// ✅ Correct Dependency
useEffect(() => {
console.log(count);
}, [count]); // Runs when count changes`
  },
  interview: {
    questions: [
      {
        q: "What does the return function of useEffect do?",
        a: "It is the cleanup function. Runs before the component unmounts or before the effect re-runs."
      }
    ]
  }
};

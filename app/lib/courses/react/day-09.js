export const day09 = {
  day: 9,
  title: "Custom Hooks",
  intro: "Reuse logic, not UI. If you find yourself copying `useEffect`, make a hook.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What is a custom hook and why create one</li>
<li>How to extract reusable logic from components</li>
<li>The rules of hooks (and why they exist)</li>
<li>Real-world custom hook examples</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 The Problem: Duplicated Logic</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">You find yourself writing the same logic in multiple components:</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-red-800 dark:text-red-200 text-sm">// ❌ Component A - Fetch user data
function ProfilePage() {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
fetch('/api/user').then(r => r.json()).then(setUser).finally(() => setLoading(false));
}, []);
}

// ❌ Component B - Same exact logic duplicated!
function SettingsPage() {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
fetch('/api/user').then(r => r.json()).then(setUser).finally(() => setLoading(false));
}, []);
}</pre>
<p class="text-red-700 dark:text-red-300 text-sm mt-2">❌ Copy-paste = bugs, inconsistency, hard to maintain!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">✅ The Solution: Custom Hook</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Extract the logic into a reusable function that starts with "use":</p>

<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl mb-6">
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-green-800 dark:text-green-200 text-sm">// ✅ Custom Hook - Single source of truth!
function <span class="text-yellow-700 dark:text-yellow-300">useUser</span>() {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetch('/api/user')
  .then(r => r.json())
  .then(setUser)
  .finally(() => setLoading(false));
}, []);

return { user, loading };
}

// Now in ANY component:
function ProfilePage() {
const { user, loading } = <span class="text-yellow-700 dark:text-yellow-300">useUser()</span>;  // One line! ✨
}

function SettingsPage() {
const { user, loading } = <span class="text-yellow-700 dark:text-yellow-300">useUser()</span>;  // Same hook, same behavior!
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📜 Rules of Hooks</h3>
<div class="space-y-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border-l-4 border-blue-500">
    <p class="text-gray-900 dark:text-white font-bold">Rule 1: Name must start with "use"</p>
    <p class="text-gray-600 dark:text-light-300 text-sm mt-2">This tells React it's a hook and enables linting rules</p>
    <pre class="bg-gray-100 dark:bg-dark-900 p-3 rounded mt-2 text-sm">
<span class="text-green-700 dark:text-green-300">✅ useCounter, useFetch, useLocalStorage</span>
<span class="text-red-700 dark:text-red-300">❌ getCounter, fetchData, withStorage</span></pre>
</div>

<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border-l-4 border-yellow-500">
    <p class="text-gray-900 dark:text-white font-bold">Rule 2: Only call hooks at the TOP LEVEL</p>
    <p class="text-gray-600 dark:text-light-300 text-sm mt-2">Never inside loops, conditions, or nested functions</p>
    <pre class="bg-gray-100 dark:bg-dark-900 p-3 rounded mt-2 text-sm">
<span class="text-red-700 dark:text-red-300">❌ if (condition) { useState(...) }</span>
<span class="text-red-700 dark:text-red-300">❌ for (let i...) { useEffect(...) }</span>
<span class="text-green-700 dark:text-green-300">✅ const [state, setState] = useState(...);</span></pre>
</div>

<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border-l-4 border-purple-500">
    <p class="text-gray-900 dark:text-white font-bold">Rule 3: Only call hooks from React functions</p>
    <p class="text-gray-600 dark:text-light-300 text-sm mt-2">Components or other custom hooks only</p>
    <pre class="bg-gray-100 dark:bg-dark-900 p-3 rounded mt-2 text-sm">
<span class="text-red-700 dark:text-red-300">❌ Regular function: function helper() { useState(...) }</span>
<span class="text-green-700 dark:text-green-300">✅ Component: function MyComponent() { useState(...) }</span>
<span class="text-green-700 dark:text-green-300">✅ Custom Hook: function useMyHook() { useState(...) }</span></pre>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 Popular Custom Hook Patterns</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">useLocalStorage</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Sync state with localStorage</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">useFetch</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Data fetching with loading/error</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">useDebounce</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Delay value updates (search input)</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">useMediaQuery</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Respond to screen size changes</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">useOnClickOutside</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Detect clicks outside element</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">usePrevious</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Access previous value of state</p>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Custom Hook vs Regular Function</h3>
<div class="overflow-x-auto mb-6">
<table class="w-full text-sm text-left">
    <thead class="bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-light-200">
        <tr>
            <th class="p-3 rounded-tl-lg">Feature</th>
            <th class="p-3">Custom Hook</th>
            <th class="p-3 rounded-tr-lg">Regular Function</th>
        </tr>
    </thead>
    <tbody class="text-gray-600 dark:text-light-300">
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Can use useState?</td>
            <td class="p-3 text-green-600 dark:text-green-400">✅ Yes</td>
            <td class="p-3 text-red-600 dark:text-red-400">❌ No</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Can use useEffect?</td>
            <td class="p-3 text-green-600 dark:text-green-400">✅ Yes</td>
            <td class="p-3 text-red-600 dark:text-red-400">❌ No</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Has its own state?</td>
            <td class="p-3 text-green-600 dark:text-green-400">✅ Yes (per component)</td>
            <td class="p-3 text-red-600 dark:text-red-400">❌ No</td>
        </tr>
        <tr>
            <td class="p-3 rounded-bl-lg">Use case</td>
            <td class="p-3">Stateful logic reuse</td>
            <td class="p-3 rounded-br-lg">Pure calculations</td>
        </tr>
    </tbody>
</table>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Each component gets its own state</span> - hooks don't share state between components</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Return objects for flexibility</span> - { value, setValue } instead of [value, setValue]</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Keep hooks focused</span> - one responsibility per hook</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Check existing libraries first</span> - react-use, usehooks-ts have 100+ hooks</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║              🎯 CUSTOM HOOKS - Reusable Logic                ║
║         Extract and share stateful logic between             ║
║                      components!                             ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   WHAT IS A CUSTOM HOOK?                                     ║
║   ══════════════════════                                     ║
║   A function that:                                           ║
║     ✅ Starts with "use" (useCounter, useFetch, useForm)     ║
║     ✅ Can call other hooks (useState, useEffect, etc.)      ║
║     ✅ Returns anything (value, object, array)               ║
║                                                              ║
║   WHY USE CUSTOM HOOKS?                                      ║
║   ═════════════════════                                      ║
║                                                              ║
║   WITHOUT Custom Hook:         WITH Custom Hook:             ║
║   ════════════════════         ══════════════════            ║
║   ComponentA:                  ComponentA:                   ║
║     const [count, set] = ...     const counter = useCounter()║
║     const inc = () => ...                                    ║
║     const dec = () => ...      ComponentB:                   ║
║                                  const counter = useCounter()║
║   ComponentB:                                                ║
║     const [count, set] = ...   🎉 Logic is REUSED!           ║
║     const inc = () => ...                                    ║
║     const dec = () => ...                                    ║
║                                                              ║
║   RULES:                                                     ║
║   ══════                                                     ║
║   1. Name MUST start with "use"                              ║
║   2. Call hooks at TOP LEVEL only (no if/loops)              ║
║   3. Call hooks from React functions only                    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🎣 CUSTOM HOOK: useCounter
// ═══════════════════════════════════════════════════════════════
// This hook encapsulates all counter logic:
//   - State (count)
//   - Actions (increment, decrement, reset)
//
// Any component can now use this without duplicating code!
// ═══════════════════════════════════════════════════════════════
function useCounter(initialValue = 0, step = 1) {
// Internal state - each component using this hook gets its OWN state
const [count, setCount] = React.useState(initialValue);

// Action functions - encapsulated logic
const increment = () => setCount(prev => prev + step);
const decrement = () => setCount(prev => prev - step);
const reset = () => setCount(initialValue);
const setTo = (value) => setCount(value);

// Return an object with everything the consumer needs
return { 
count,       // Current value
increment,   // +step
decrement,   // -step
reset,       // Back to initial
setTo        // Set to specific value
};
}

// ═══════════════════════════════════════════════════════════════
// 🎣 BONUS: useToggle Hook
// ═══════════════════════════════════════════════════════════════
// Another common pattern - toggling boolean state
// ═══════════════════════════════════════════════════════════════
function useToggle(initialValue = false) {
const [value, setValue] = React.useState(initialValue);
const toggle = () => setValue(prev => !prev);
const setTrue = () => setValue(true);
const setFalse = () => setValue(false);
return { value, toggle, setTrue, setFalse };
}

function App() {
// 🎯 Using our custom hooks - so clean!
const counter = useCounter(10, 5);  // Start at 10, step by 5
const darkMode = useToggle(false);

return (
<div style={{ 
  fontFamily: 'system-ui', 
  padding: '20px',
  background: darkMode.value ? '#1e293b' : '#f8fafc',
  borderRadius: '12px',
  transition: 'all 0.3s ease'
}}>
  <h3 style={{ color: darkMode.value ? '#f8fafc' : '#1e293b' }}>
    🎣 Custom Hooks Demo
  </h3>
  
  {/* Counter using useCounter hook */}
  <div style={{
    background: darkMode.value ? '#0f172a' : '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '15px',
    border: darkMode.value ? '1px solid #334155' : '1px solid #e2e8f0'
  }}>
    <p style={{ 
      fontSize: '32px', 
      fontWeight: 'bold',
      color: '#3b82f6',
      margin: '0 0 15px'
    }}>
      {counter.count}
    </p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <button onClick={counter.decrement} style={btnStyle}>➖ Decrease</button>
      <button onClick={counter.increment} style={btnStyle}>➕ Increase</button>
      <button onClick={counter.reset} style={{...btnStyle, background: '#ef4444'}}>🔄 Reset</button>
    </div>
    <p style={{ color: '#64748b', marginTop: '10px', fontSize: '13px' }}>
      Step size: 5 (configured in useCounter)
    </p>
  </div>
  
  {/* Toggle using useToggle hook */}
  <button 
    onClick={darkMode.toggle}
    style={{
      padding: '10px 20px',
      background: darkMode.value ? '#f8fafc' : '#1e293b',
      color: darkMode.value ? '#1e293b' : '#f8fafc',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    }}
  >
    {darkMode.value ? '☀️ Light Mode' : '🌙 Dark Mode'}
  </button>
  
  <p style={{ 
    color: darkMode.value ? '#94a3b8' : '#64748b',
    marginTop: '15px',
    fontSize: '13px'
  }}>
    💡 Both useCounter and useToggle are custom hooks - reusable everywhere!
  </p>
</div>
);
}

// Shared button style
const btnStyle = {
padding: '10px 16px',
background: '#3b82f6',
color: 'white',
border: 'none',
borderRadius: '8px',
cursor: 'pointer',
fontWeight: '500'
};`,
  comparison: {
    junior: `// ❌ Duplicate Logic
// Component A
useEffect(() => { fetch('/a').then(...) }, []);

// Component B
useEffect(() => { fetch('/b').then(...) }, []);`,
    senior: `// ✅ Custom Hook
const useFetch = (url) => {
const [data, setData] = useState(null);
useEffect(() => { fetch(url).then(d => setData(d)) }, [url]);
return data;
}
// Component A
const data = useFetch('/a');`
  },
  interview: {
    questions: [
      {
        q: "Why must hooks be at the top level?",
        a: "React relies on the order of execution to track state. Conditional hooks break the order."
      }
    ]
  }
};

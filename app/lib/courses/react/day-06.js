export const day06 = {
  day: 6,
  title: "Refs & The DOM",
  intro: "Need to focus an input or measure a div? Use `useRef`. It persists values without re-rendering.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 06. Use `useRef` for side effects that don't involve the UI, like DOM access or timers."
      },
      {
        type: "challenge",
        instruction: "This code tries to focus an input using document.getElementById. This is bad in React. Use a Ref instead.",
        buggyCode: `// ❌ Manual DOM manipulation
function search() {
  document.getElementById('search-input').focus();
}`,
        solutionCode: `// ✅ useRef
const inputRef = useRef(null);

function search() {
  inputRef.current.focus();
}

return <input ref={inputRef} />;`,
        verifyOutput: "useRef",
        successMessage: "Excellent! `useRef` gives you safe, direct access to the DOM node without querying the document.",
        hint: "Initialize `useRef(null)` and attach it to the input."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What is useRef and when to use it</li>
<li>Accessing DOM elements directly</li>
<li>Storing values that persist without re-renders</li>
<li>Common use cases and patterns</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 The Big Question: When Do I Need useRef?</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Sometimes you need to:</p>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl">
    <p class="text-blue-700 dark:text-blue-300 font-bold mb-2">🎯 Access DOM Elements</p>
    <ul class="text-blue-800 dark:text-blue-200 text-sm space-y-1">
        <li>• Focus an input field</li>
        <li>• Scroll to a section</li>
        <li>• Measure element size</li>
        <li>• Play/pause video</li>
    </ul>
</div>
<div class="bg-purple-900/20 border border-purple-500/30 p-4 rounded-xl">
    <p class="text-purple-700 dark:text-purple-300 font-bold mb-2">💾 Store Values Silently</p>
    <ul class="text-purple-800 dark:text-purple-200 text-sm space-y-1">
        <li>• Previous state values</li>
        <li>• Timer/interval IDs</li>
        <li>• Render count (debugging)</li>
        <li>• Any value that shouldn't trigger re-render</li>
    </ul>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🧠 How useRef Works</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre class="text-gray-800 dark:text-cyan-300">
const myRef = useRef(initialValue);

// myRef is an object: { current: initialValue }
// 
// KEY DIFFERENCE FROM useState:
// ══════════════════════════════
// 
// useState:
//   setValue(newValue) → Triggers RE-RENDER → UI Updates
// 
// useRef:
//   myRef.current = newValue → NO re-render → UI stays same
//
// Think of useRef as a "box" that holds a value
// You can change what's in the box anytime
// React doesn't care - it won't re-render!
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📍 Use Case 1: Accessing DOM Elements</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Attach a ref to any JSX element to access the actual DOM node:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="bg-gray-100 dark:bg-dark-900 text-gray-800 dark:text-cyan-300">// Step 1: Create a ref
const inputRef = useRef(<span class="text-yellow-800 dark:text-yellow-300">null</span>);

// Step 2: Attach to element
&lt;input <span class="text-yellow-800 dark:text-yellow-300">ref={inputRef}</span> /&gt;

// Step 3: Access the DOM node!
inputRef.<span class="text-green-700 dark:text-green-300">current</span>.focus();  // Focus the input!
inputRef.<span class="text-green-700 dark:text-green-300">current</span>.value;   // Read the value
inputRef.<span class="text-green-700 dark:text-green-300">current</span>.style.background = 'yellow';</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💾 Use Case 2: Storing Values Without Re-renders</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Perfect for values you need to track but don't want to display:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="bg-gray-100 dark:bg-dark-900 text-gray-800 dark:text-cyan-300">function Timer() {
const intervalId = useRef(<span class="text-yellow-800 dark:text-yellow-300">null</span>);

const start = () => {
// Store the interval ID (no re-render needed!)
intervalId.<span class="text-green-700 dark:text-green-300">current</span> = setInterval(() => {
  console.log('tick');
}, 1000);
};

const stop = () => {
// Access the stored ID to clear
clearInterval(intervalId.<span class="text-green-700 dark:text-green-300">current</span>);
};
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔑 Quick Reference: useState vs useRef</h3>
<div class="overflow-x-auto mb-6">
<table class="w-full text-sm text-left">
    <thead class="bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-light-200">
        <tr>
            <th class="p-3 rounded-tl-lg">Feature</th>
            <th class="p-3">useState</th>
            <th class="p-3 rounded-tr-lg">useRef</th>
        </tr>
    </thead>
    <tbody class="text-gray-600 dark:text-light-300">
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3 font-bold">Re-renders on change?</td>
            <td class="p-3 text-green-600 dark:text-green-400">✅ Yes</td>
            <td class="p-3 text-red-600 dark:text-red-400">❌ No</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3 font-bold">Persists between renders?</td>
            <td class="p-3 text-green-600 dark:text-green-400">✅ Yes</td>
            <td class="p-3 text-green-600 dark:text-green-400">✅ Yes</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3 font-bold">Use for UI data?</td>
            <td class="p-3 text-green-600 dark:text-green-400">✅ Yes</td>
            <td class="p-3 text-red-600 dark:text-red-400">❌ No</td>
        </tr>
        <tr>
            <td class="p-3 rounded-bl-lg font-bold">Use for DOM access?</td>
            <td class="p-3 text-red-600 dark:text-red-400">❌ No</td>
            <td class="p-3 rounded-br-lg text-green-600 dark:text-green-400">✅ Yes</td>
        </tr>
    </tbody>
</table>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common Mistakes</h3>
<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<p class="text-red-700 dark:text-red-300 font-bold mb-2">❌ Don't read/write ref.current during render!</p>
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-red-800 dark:text-red-200 text-sm mt-2">function Bad() {
const ref = useRef(0);
ref.current++;  // ❌ Side effect during render!
return &lt;p&gt;{ref.current}&lt;/p&gt;; // ❌ Won't update UI anyway
}</pre>
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-green-800 dark:text-green-200 text-sm mt-2">function Good() {
const ref = useRef(0);
useEffect(() => {
ref.current++;  // ✅ Side effect in useEffect
});
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Initial value of null</span> is common for DOM refs (element doesn't exist yet)</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Refs are mutable</span> - unlike props and state, you can modify .current directly</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Refs survive re-renders</span> - value persists even when component updates</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Use for "escape hatches"</span> - when React's declarative model isn't enough</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║                    🎯 useRef DEMO                            ║
║       Access DOM elements & persist values without           ║
║              triggering re-renders!                          ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   TWO MAIN USE CASES FOR useRef:                             ║
║   ══════════════════════════════                             ║
║                                                              ║
║   1️⃣  ACCESS DOM ELEMENTS                                    ║
║       const inputRef = useRef(null);                         ║
║       <input ref={inputRef} />                               ║
║       inputRef.current.focus(); // Direct DOM access!        ║
║                                                              ║
║   2️⃣  PERSIST VALUES (without re-render)                     ║
║       const count = useRef(0);                               ║
║       count.current++;  // ← NO re-render triggered!         ║
║                                                              ║
║   STATE vs REF:                                              ║
║   ═════════════                                              ║
║       useState  → Changes trigger re-render                  ║
║       useRef    → Changes are SILENT                         ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function App() {
// ═══════════════════════════════════════════════════════════
// 🎯 USE CASE 1: DOM Element Reference
// ═══════════════════════════════════════════════════════════
// useRef(null) creates a "box" that holds a reference.
// When we attach it to an element via ref={inputRef},
// inputRef.current becomes that actual DOM element!
//
// This allows us to:
//   - Focus inputs programmatically
//   - Measure element dimensions
//   - Trigger animations
//   - Access canvas context
// ═══════════════════════════════════════════════════════════
const inputRef = React.useRef(null);

// ═══════════════════════════════════════════════════════════
// 🎯 USE CASE 2: Persist Values Across Renders
// ═══════════════════════════════════════════════════════════
// Unlike useState, changing a ref does NOT cause re-render!
// Perfect for:
//   - Counting renders (for debugging)
//   - Storing previous values
//   - Holding timer IDs
//   - Any value you need to persist but not display
// ═══════════════════════════════════════════════════════════
const renderCount = React.useRef(0);

// State DOES cause re-renders (needed for UI updates)
const [value, setValue] = React.useState('');

// This increments every render, but DOESN'T trigger new renders
renderCount.current++;

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>🎯 useRef Demo</h3>
  
  {/* Input with ref attached */}
  <div style={{ 
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '15px'
  }}>
    <input 
      ref={inputRef}  // ← Attach ref to DOM element
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Type something..."
      style={{ 
        padding: '12px', 
        marginRight: '10px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        width: '200px'
      }}
    />
    <button 
      onClick={() => inputRef.current.focus()}  // ← Direct DOM access!
      style={{ 
        padding: '12px 20px',
        background: 'white',
        color: '#f5576c',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      📍 Focus Input
    </button>
  </div>
  
  {/* Render count display */}
  <div style={{ 
    background: '#0f172a', 
    padding: '15px',
    borderRadius: '12px',
    border: '1px solid #334155'
  }}>
    <p style={{ color: '#94a3b8', margin: '0 0 5px', fontSize: '14px' }}>
      Render Count (ref mutation doesn't re-render):
    </p>
    <span style={{ 
      color: '#22c55e', 
      fontSize: '24px', 
      fontWeight: 'bold',
      fontFamily: 'monospace' 
    }}>
      {renderCount.current}
    </span>
  </div>
  
  <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
    💡 Type in the input - ref.current stays synced without extra renders!
  </p>
</div>
);
}`,
  comparison: {
    junior: `// ❌ DOM Query
function focus() {
document.getElementById('my-input').focus();
}`,
    senior: `// ✅ React Ref
const ref = useRef();
<input ref={ref} />
// ref.current.focus();`
  },
  interview: {
    questions: [
      {
        q: "Does changing a ref cause a re-render?",
        a: "No. That's the main difference between Ref and State."
      }
    ]
  }
};

export const day01 = {
  day: 1,
  title: "Virtual DOM & Reconciliation",
  intro: "Why is React so fast? Because it never touches the Real DOM directly. It uses a clever trick called the Virtual DOM.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The "Chef's Station" Mental Model</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Think of a React Component as a Chef at a station.
</p>
<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-brand-primary mb-2">Props (The Order Ticket)</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">
      Props are orders from the customer (Parent Component). "Make me a burger with cheese." The Chef <strong>cannot change the order</strong> (Props are read-only).
    </p>
  </div>
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-green-600 dark:text-green-400 mb-2">State (The Pantry)</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">
      State is the Chef's private pantry. They can chop onions, cook patties, and change the state of ingredients. The customer doesn't see this mess, they only see the final dish (UI).
    </p>
  </div>
</div>

<div class="mb-8 p-5 rounded-xl border border-purple-500/30 bg-purple-500/5">
  <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
    <span class="text-xl">🏛️</span> Architect's Note: The ROI of Reusability
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    Why do companies pay React developers so much? It's not just for "making it work." It's for <strong>velocity</strong>.
  </p>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    If you build a generic <code>&lt;Button&gt;</code> component once, your team saves 10 hours of work every week.
    <strong>Design Systems</strong> (like Material UI or a custom company library) are the ultimate expression of this.
    A Senior Engineer thinks: <em>"How can I write this code so I never have to write it again?"</em>
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What is the DOM and why is it slow?</li>
<li>What is the Virtual DOM?</li>
<li>How React's "Diffing" algorithm works</li>
<li>Why keys matter in lists</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Understanding the Problem: The Real DOM is Slow</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Imagine you have a webpage with 1000 elements. If you change just ONE element using vanilla JavaScript:</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<p class="text-red-700 dark:text-red-300 font-mono text-sm">document.getElementById('count').innerText = 5;</p>
<p class="text-red-800 dark:text-red-200 mt-2 text-sm">❌ This triggers the browser to: Recalculate styles → Reflow layout → Repaint pixels</p>
<p class="text-red-800 dark:text-red-200 text-sm">Even for ONE tiny change, this is expensive!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 The Solution: Virtual DOM</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">React keeps a <span class="text-brand-primary font-bold">lightweight copy</span> of the DOM in JavaScript memory. This is called the <span class="text-brand-primary font-bold">Virtual DOM (VDOM)</span>.</p>

<p class="mb-4 text-yellow-600 dark:text-yellow-400 font-bold">Think of it like this:</p>
<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
<p class="text-blue-800 dark:text-blue-200">🏠 <span class="text-gray-900 dark:text-white font-bold">Real DOM</span> = Actual house (expensive to rebuild)</p>
<p class="text-blue-800 dark:text-blue-200">📋 <span class="text-gray-900 dark:text-white font-bold">Virtual DOM</span> = Blueprint of the house (cheap to modify)</p>
<p class="text-blue-800 dark:text-blue-200 mt-2">When you want to change the house, you first update the blueprint, compare it to the old blueprint, and ONLY rebuild the parts that changed!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚙️ How It Works: The Diffing Algorithm</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">When state changes in React, here's what happens step-by-step:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Step 1: State Changes (e.g., setCount(5))
          │
          ▼
Step 2: React creates a NEW Virtual DOM tree
          │
          ▼
Step 3: React COMPARES new VDOM with old VDOM
    ┌─────────────────────────────────┐
    │  OLD VDOM        NEW VDOM       │
    │  ┌───────┐      ┌───────┐       │
    │  │ div   │      │ div   │       │
    │  │ ├─h1  │      │ ├─h1  │       │
    │  │ └─p:4 │  vs  │ └─p:5 │ ←Changed!
    │  └───────┘      └───────┘       │
    └─────────────────────────────────┘
          │
          ▼
Step 4: React finds the MINIMUM changes needed
    (Only the &lt;p&gt; text changed from 4 to 5)
          │
          ▼
Step 5: React updates ONLY that one element in Real DOM
    (One surgical update, not a full rebuild!)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔑 Why Keys Matter in Lists</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">When rendering lists, React needs to know which items changed. Without <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-2 py-1 rounded">key</code>, React might re-render everything!</p>

<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl">
    <p class="text-red-700 dark:text-red-300 font-bold mb-2">❌ Without Keys</p>
    <pre class="bg-white dark:bg-dark-900 p-2 rounded text-red-800 dark:text-red-200 text-xs">{items.map(item => 
&lt;li&gt;{item}&lt;/li&gt;
)}</pre>
    <p class="text-red-800 dark:text-red-200 text-xs mt-2">React: "I don't know what changed, let me re-render ALL items"</p>
</div>
<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl">
    <p class="text-green-300 font-bold mb-2">✅ With Keys</p>
    <pre class="bg-white dark:bg-dark-900 p-2 rounded text-green-800 dark:text-green-200 text-xs">{items.map(item => 
&lt;li key={item.id}&gt;{item}&lt;/li&gt;
)}</pre>
    <p class="text-green-800 dark:text-green-200 text-xs mt-2">React: "Ah, only item #3 changed, I'll update just that one!"</p>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Never use array index as key</span> if the list can reorder (causes bugs!)</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Use unique IDs</span> from your data (like database IDs)</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">React batches updates</span> - multiple setState calls = one render</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║                  🎯 VIRTUAL DOM DEMO                         ║
║  See React's efficiency - only changed elements update!      ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   CLICK BUTTON                                               ║
║        ↓                                                     ║
║   setCount(1)  →  New VDOM Created                          ║
║        ↓                                                     ║
║   React DIFFS:  Old VDOM  vs  New VDOM                      ║
║        ↓                                                     ║
║   Only <p>Count: 1</p> changes in Real DOM!                 ║
║                                                              ║
║   💡 Everything else stays untouched = FAST!                 ║
╚══════════════════════════════════════════════════════════════╝
*/

function App() {
// ═══════════════════════════════════════════════════════════
// 📦 STATE: React's memory system
// ═══════════════════════════════════════════════════════════
// useState returns an array with 2 items:
//   [0] count    = current value (starts at 0)
//   [1] setCount = function to update value
//
// When setCount is called:
//   1. React creates NEW Virtual DOM
//   2. Compares with OLD Virtual DOM (diffing)
//   3. Updates ONLY what changed in Real DOM
// ═══════════════════════════════════════════════════════════
const [count, setCount] = React.useState(0);

return (
<div style={{ padding: '20px', fontFamily: 'system-ui' }}>
  <h2 style={{ color: '#1e293b' }}>⚛️ Virtual DOM Demo</h2>
  
  {/* ════════════════════════════════════════════════════════
      🎯 THIS IS THE MAGIC PART!
      ════════════════════════════════════════════════════════
      Only this <p> element will update in the Real DOM
      when you click the button. React's diffing algorithm
      sees that ONLY the count value changed!
      
      Open DevTools → Elements tab → Watch it flash!
      ════════════════════════════════════════════════════════ */}
  <div style={{ 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '15px'
  }}>
    <p style={{ 
      fontSize: '48px', 
      color: 'white',
      margin: 0,
      fontWeight: 'bold'
    }}>
      {count}
    </p>
    <p style={{ color: 'rgba(255,255,255,0.8)', margin: '5px 0 0' }}>
      clicks counted
    </p>
  </div>
  
  {/* ════════════════════════════════════════════════════════
      🔘 BUTTON: Triggers state change
      ════════════════════════════════════════════════════════
      onClick={() => setCount(count + 1)}
      
      This arrow function:
      1. Gets current count (e.g., 0)
      2. Adds 1 (e.g., 0 + 1 = 1)
      3. Calls setCount(1) with new value
      4. React re-renders with new state!
      ════════════════════════════════════════════════════════ */}
  <button 
    onClick={() => setCount(count + 1)}
    style={{
      padding: '12px 24px',
      fontSize: '16px',
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }}
  >
    ➕ Increment Count
  </button>
  
  <button 
    onClick={() => setCount(0)}
    style={{
      padding: '12px 24px',
      fontSize: '16px',
      background: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginLeft: '10px'
    }}
  >
    🔄 Reset
  </button>
  
  {/* ════════════════════════════════════════════════════════
      📝 STATIC CONTENT: Never re-renders!
      ════════════════════════════════════════════════════════
      This paragraph has NO state dependency.
      React's diff sees: "Nothing changed here, skip!"
      This is why React is so fast.
      ════════════════════════════════════════════════════════ */}
  <p style={{ color: '#64748b', marginTop: '20px', fontSize: '14px' }}>
    💡 <strong>Try this:</strong> Open DevTools → Elements → 
    Watch only the number flash purple when you click!
  </p>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Direct DOM Manipulation
function updateCount(n) {
// Slow! Triggers repaint immediately
document.getElementById('count').innerText = n;
document.getElementById('msg').innerHTML = 'Updated';
}`,
    senior: `// ✅ Declarative State
const [count, setCount] = useState(0);

// React batches updates and touches DOM once
return (
<div>
<span id="count">{count}</span>
<span>Updated</span>
</div>
);`
  },
  interview: {
    questions: [
      {
        q: "What is the Virtual DOM?",
        a: "A lightweight JavaScript representation of the UI. React uses it to calculate the minimum number of changes needed for the real DOM."
      },
      {
        q: "What is Reconciliation?",
        a: "The process of syncing the VDOM with the Real DOM."
      },
      {
        q: "Why is `key` important in lists?",
        a: "Keys help React identify which items have changed, added, or removed. Without keys, React might re-render the entire list."
      }
    ]
  }
};

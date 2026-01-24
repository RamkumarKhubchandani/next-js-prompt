export const day20 = {
  day: 20,
  title: "The \"use\" API Deep Dive",
  intro: "The universal API for unwrapping resources. Promises, Context, and future data types.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 20. The `use()` API lets you unwrap Promises and read Context conditionally. It breaks the 'Rules of Hooks'."
      },
      {
        type: "challenge",
        instruction: "This code throws a 'Hooks must be called at the top level' error. Fix it using the new `use()` API.",
        buggyCode: `// ❌ Error: Conditional Hook
if (isDark) {
  const theme = useContext(ThemeContext);
}`,
        solutionCode: `// ✅ Working in React 19+
if (isDark) {
  const theme = use(ThemeContext);
}`,
        verifyOutput: "use(",
        successMessage: "Correct! Unlike `useContext`, `use()` can be called inside loops and if statements.",
        hint: "Replace `useContext` with `use`."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">use(Context)</code> vs <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useContext()</code></li>
<li>Unwrapping Promises in Client Components</li>
<li>Conditional Context usage</li>
</ul>

<div class="mb-8 p-5 rounded-xl border border-purple-500/30 bg-purple-500/5">
  <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
    <span class="text-xl">⚔️</span> War Story: The Infinite Loop
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    A junior dev once wrote: <code>useEffect(() => setCount(count + 1))</code> without a dependency array.
  </p>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    <strong>The Result:</strong> The component rendered, triggered the effect, updated state, triggered a re-render, triggered the effect... infinite loop.
    This crashed the user's browser tab instantly.
  </p>
  <p class="text-xs text-purple-800 dark:text-purple-200 font-bold">
    Lesson: Always check your dependency arrays. If you update state inside an effect, ensure the condition is stable.
  </p>
</div>

<div class="mb-8 p-5 rounded-xl border border-blue-500/30 bg-blue-500/5">
  <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
    <span class="text-xl">🏛️</span> Architect's Note: The Cost of a Render
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    React is fast, but not magic. Every render runs JavaScript.
    If your component takes 2ms to render and you render a list of 10,000 items, that's 20 seconds of frozen UI.
  </p>
  <p class="text-sm text-gray-700 dark:text-light-200">
    <strong>Virtualization</strong> (rendering only what's visible) is the Architect's solution to big lists.
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔮 1. use(Context)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300"><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useContext</code> must be at the top level. <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">use(Context)</code> can be inside loops and conditionals!</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">if (isDark) {
// ✅ Allowed with use()
const theme = use(ThemeContext);
return &lt;DarkButton theme={theme} /&gt;;
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⏳ 2. use(Promise)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">You can pass a Promise from a Server Component to a Client Component and unwrap it with <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">use()</code>. This triggers Suspense.</p>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║            ⚛️ REACT 19 "use" API DEMO                         ║
║      Conditional Context & Promise Unwrapping                ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   1. Conditional Context:                                    ║
║      if (cond) { const val = use(Context); }                 ║
║                                                              ║
║   2. Promise Unwrapping:                                     ║
║      const data = use(promise);                              ║
║      (Triggers Suspense automatically!)                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

const ThemeContext = React.createContext('light');

function ThemedButton({ show }) {
if (!show) return null;

// ✅ Conditional hook usage! Only possible with use()
// Note: We use React.use() if available, else simulate
const theme = React.use ? React.use(ThemeContext) : React.useContext(ThemeContext);

return (
<button style={{
  background: theme === 'dark' ? '#333' : '#eee',
  color: theme === 'dark' ? '#fff' : '#333',
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  marginTop: '10px'
}}>
  I am a {theme} button
</button>
);
}

function App() {
const [show, setShow] = React.useState(false);

return (
<ThemeContext.Provider value="dark">
  <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
    <h3 style={{ color: '#1e293b' }}>🔮 The "use" API</h3>
    
    <label>
      <input 
        type="checkbox" 
        checked={show} 
        onChange={e => setShow(e.target.checked)} 
      />
      Show Button (Triggers conditional context read)
    </label>
    
    <br />
    <ThemedButton show={show} />
  </div>
</ThemeContext.Provider>
);
}`,
  comparison: {
    junior: `// ❌ useContext (Must be top level)
const theme = useContext(ThemeContext);
if (!show) return null; // Wasted read if not shown`,
    senior: `// ✅ use (Conditional)
if (!show) return null;
const theme = use(ThemeContext); // Only reads if needed`
  },
  interview: {
    questions: [
      {
        q: "Can `use()` be called in a Server Component?",
        a: "Yes. It can be used to unwrap promises in Server Components (though async/await is preferred there) and is the standard way to read Context in Client Components conditionally."
      }
    ]
  }
};

export const day20 = {
  day: 20,
  title: "The \"use\" API Deep Dive",
  intro: "The universal API for unwrapping resources. Promises, Context, and future data types.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">use(Context)</code> vs <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useContext()</code></li>
<li>Unwrapping Promises in Client Components</li>
<li>Conditional Context usage</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔮 1. use(Context)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300"><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useContext</code> must be at the top level. <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">use(Context)</code> can be inside loops and conditionals!</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-700 dark:text-cyan-300">if (isDark) {
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

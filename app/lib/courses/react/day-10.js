export const day10 = {
  day: 10,
  title: "Patterns: HOCs vs Render Props",
  intro: "Historical patterns are still useful, but Hooks have replaced most of them.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The "Snapshot" Mental Model (State Updates)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
When you call <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">setCount(count + 1)</code>, React doesn't change the variable immediately.
</p>
<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-5 rounded-xl mb-8">
  <h4 class="font-bold text-blue-800 dark:text-blue-200 mb-2">The Camera Analogy</h4>
  <p class="text-sm text-gray-600 dark:text-light-300">
    Each render is a <strong>photograph</strong> (snapshot) of the UI at a specific moment in time.
    Your variables (<code class="bg-white dark:bg-dark-800 px-1 rounded">count</code>) are frozen in that photo.
    Calling <code class="bg-white dark:bg-dark-800 px-1 rounded">setCount</code> tells React: "For the <strong>next</strong> photo, use a different number." It does NOT change the number in the <em>current</em> photo.
  </p>
</div>

<div class="mb-8 p-5 rounded-xl border border-blue-500/30 bg-blue-500/5">
  <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
    <span class="text-xl">🏛️</span> Architect's Note: Where should state live?
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    Junior devs put state everywhere. Senior devs put state in the <strong>highest necessary common ancestor</strong> (or move it out entirely).
  </p>
  <ul class="list-disc list-inside text-sm text-gray-700 dark:text-light-200 space-y-2">
    <li><span class="font-bold">Local State (useState):</span> UI toggles, form inputs.</li>
    <li><span class="font-bold">Context (useContext):</span> Theme, User Session, Language.</li>
    <li><span class="font-bold">Server State (React Query):</span> API data (don't put this in Redux!).</li>
    <li><span class="font-bold">URL State:</span> Search filters, pagination (so users can share links).</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What is a Higher Order Component (HOC)</li>
<li>What is the Render Props pattern</li>
<li>When these patterns are still useful today</li>
<li>How Hooks have replaced most use cases</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Pattern 1: Higher Order Component (HOC)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">An HOC is a function that takes a component and returns a NEW enhanced component:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">// HOC Pattern: withSomething(Component) → EnhancedComponent

const <span class="text-yellow-700 dark:text-yellow-300">EnhancedButton</span> = <span class="text-green-700 dark:text-green-300">withLogging</span>(Button);
//                       ↑ HOC adds logging capability
//                         to the original Button

// Using it:
&lt;EnhancedButton onClick={...} /&gt;</pre>
</div>

<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
<p class="text-blue-800 dark:text-blue-200 mb-2">🎯 <span class="text-yellow-600 dark:text-yellow-400 font-bold">Think of HOCs like decorators</span> - they wrap a component and add extra features without modifying the original.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 Common HOC Examples</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">withAuth</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Redirect if not logged in</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">withLoading</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Show spinner while loading</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">withTheme</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Inject theme props</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">connect()</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Redux's famous HOC</p>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Pattern 2: Render Props</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">A component that takes a function as a prop and calls it to render UI:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">// Render Props Pattern: A prop whose value is a function

&lt;MouseTracker <span class="text-yellow-700 dark:text-yellow-300">render</span>={(position) => (
&lt;p&gt;Mouse is at {position.x}, {position.y}&lt;/p&gt;
)} /&gt;

// The component calls render(data) internally:
function MouseTracker({ render }) {
const [position, setPosition] = useState({ x: 0, y: 0 });
// ... track mouse ...
return <span class="text-yellow-700 dark:text-yellow-300">render(position)</span>;  // Call the function!
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚔️ HOC vs Render Props vs Hooks</h3>
<div class="overflow-x-auto mb-6">
<table class="w-full text-sm text-left">
    <thead class="bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-light-200">
        <tr>
            <th class="p-3 rounded-tl-lg">Pattern</th>
            <th class="p-3">Pros</th>
            <th class="p-3 rounded-tr-lg">Cons</th>
        </tr>
    </thead>
    <tbody class="text-gray-600 dark:text-light-300">
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3 font-bold">HOC</td>
            <td class="p-3 text-sm">Clean usage, props injection</td>
            <td class="p-3 text-sm text-red-700 dark:text-red-300">Wrapper hell, naming collisions</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3 font-bold">Render Props</td>
            <td class="p-3 text-sm">Explicit data flow, flexible</td>
            <td class="p-3 text-sm text-red-700 dark:text-red-300">Callback hell, harder to read</td>
        </tr>
        <tr>
            <td class="p-3 rounded-bl-lg font-bold text-green-600 dark:text-green-400">Hooks ✓</td>
            <td class="p-3 text-sm text-green-700 dark:text-green-300">Simple, composable, no wrappers</td>
            <td class="p-3 rounded-br-lg text-sm">Can't use in class components</td>
        </tr>
    </tbody>
</table>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔄 Evolution: From HOC to Hooks</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-600 dark:text-light-300">// ❌ OLD WAY: HOC Wrapper Hell
export default withRouter(
withAuth(
withTheme(
  withLogging(
    MyComponent
  )
)
)
);

// ✅ NEW WAY: Hooks Composition
function MyComponent() {
const router = useRouter();
const auth = useAuth();
const theme = useTheme();
const logger = useLogger();

// Clean, readable, no wrappers!
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ When HOCs Are Still Useful</h3>
<div class="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
<ul class="text-yellow-200 text-sm space-y-1">
    <li>• <span class="font-bold">Class components</span> - can't use hooks</li>
    <li>• <span class="font-bold">Library APIs</span> - some libraries still use HOC pattern</li>
    <li>• <span class="font-bold">Static composition</span> - when you need to wrap at definition time</li>
</ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Prefer Hooks for new code</span> - simpler and more flexible</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Understand HOCs for legacy code</span> - many older codebases use them</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">HOC naming convention</span> - withXxx (withAuth, withRouter)</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Don't mix patterns</span> - pick one approach per feature</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║         🎯 HIGHER ORDER COMPONENTS (HOCs)                    ║
║     A function that takes a component and returns            ║
║              an enhanced component!                          ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   HOC PATTERN EXPLAINED:                                     ║
║   ══════════════════════                                     ║
║                                                              ║
║   const EnhancedComp = withFeature(OriginalComp)             ║
║                                                              ║
║   ┌─────────────────────┐                                    ║
║   │   withLogger(Comp)  │  ← HOC (Higher Order Component)    ║
║   └──────────┬──────────┘                                    ║
║              │                                               ║
║              ▼                                               ║
║   ┌─────────────────────┐                                    ║
║   │  function Wrapper() │  ← Returns NEW component           ║
║   │    useEffect(log)   │  ← Adds logging                    ║
║   │    return <Comp />  │  ← Renders original                ║
║   └─────────────────────┘                                    ║
║                                                              ║
║   COMMON HOC USE CASES:                                      ║
║   ═════════════════════                                      ║
║   • withAuth     → Add authentication check                  ║
║   • withLogger   → Add logging/analytics                     ║
║   • withTheme    → Inject theme props                        ║
║   • withLoading  → Add loading state                         ║
║                                                              ║
║   ⚠️ MODERN ALTERNATIVE: Custom Hooks are simpler!           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🏭 HOC: withLogger
// ═══════════════════════════════════════════════════════════════
// This HOC wraps ANY component and adds logging capability.
// It demonstrates the "decorator" pattern - adding features
// without modifying the original component.
// ═══════════════════════════════════════════════════════════════
function withLogger(WrappedComponent) {
// Return a NEW component (the wrapper)
return function LoggedComponent(props) {
const [logs, setLogs] = React.useState([]);

// Add logging on mount
React.useEffect(() => {
  const timestamp = new Date().toLocaleTimeString();
  setLogs(prev => [...prev, \`[\${timestamp}] Mounted: \${WrappedComponent.name || 'Component'}\`]);
}, []);

// Add logging on every render
React.useEffect(() => {
  const timestamp = new Date().toLocaleTimeString();
  setLogs(prev => [...prev, \`[\${timestamp}] Rendered with props: \${JSON.stringify(props)}\`]);
});

return (
  <div>
    {/* Render the original component with all its props */}
    <WrappedComponent {...props} />
    
    {/* Display logs (added by HOC) */}
    <div style={{
      marginTop: '10px',
      padding: '10px',
      background: '#0f172a',
      borderRadius: '8px',
      maxHeight: '100px',
      overflow: 'auto'
    }}>
      <p style={{ color: '#94a3b8', margin: '0 0 5px', fontSize: '12px' }}>
        📋 HOC Logger Output:
      </p>
      {logs.slice(-3).map((log, i) => (
        <div key={i} style={{ color: '#22c55e', fontFamily: 'monospace', fontSize: '11px' }}>
          {log}
        </div>
      ))}
    </div>
  </div>
);
};
}

// ═══════════════════════════════════════════════════════════════
// 📦 ORIGINAL COMPONENT
// ═══════════════════════════════════════════════════════════════
// This is a simple component with NO logging capability.
// We'll enhance it using our HOC!
// ═══════════════════════════════════════════════════════════════
function Greeting({ name, color }) {
return (
<div style={{
  padding: '15px',
  background: \`linear-gradient(135deg, \${color}22 0%, \${color}44 100%)\`,
  borderRadius: '8px',
  borderLeft: \`4px solid \${color}\`
}}>
  <h2 style={{ margin: 0, color }}>Hello, {name}! 👋</h2>
</div>
);
}

// ═══════════════════════════════════════════════════════════════
// 🎯 ENHANCED COMPONENT (Original + HOC features)
// ═══════════════════════════════════════════════════════════════
// LoggedGreeting = Greeting + logging (from withLogger HOC)
// ═══════════════════════════════════════════════════════════════
const LoggedGreeting = withLogger(Greeting);

function App() {
const [name, setName] = React.useState('React Developer');
const [color, setColor] = React.useState('#3b82f6');

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>🏭 HOC Pattern Demo</h3>
  
  {/* Using the HOC-enhanced component */}
  <LoggedGreeting name={name} color={color} />
  
  <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    <input 
      value={name}
      onChange={e => setName(e.target.value)}
      placeholder="Enter name..."
      style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
    />
    <select 
      value={color} 
      onChange={e => setColor(e.target.value)}
      style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
    >
      <option value="#3b82f6">Blue</option>
      <option value="#22c55e">Green</option>
      <option value="#f59e0b">Orange</option>
      <option value="#ef4444">Red</option>
    </select>
  </div>
  
  <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
    💡 Change inputs and watch the HOC logger update!
  </p>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Wrapper Hell
<WithAuth>
<WithRouter>
<WithTheme>
   <Component />
</WithTheme>
</WithRouter>
</WithAuth>`,
    senior: `// ✅ Hooks Composition
const MyComponent = () => {
const auth = useAuth();
const router = useRouter();
const theme = useTheme();

if (!auth) return <Login />;
return <div />;
}`
  },
  interview: {
    questions: [
      {
        q: "What is a Render Prop?",
        a: "A prop whose value is a function that returns a React element. `<List renderItem={(item) => <Item item={item} />} />`"
      }
    ]
  }
};

export const day12 = {
  day: 12,
  title: "Suspense & Concurrent Mode",
  intro: "Tell React to 'wait' for data before showing the UI. No more `isLoading` booleans.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What is Suspense and how it works</li>
<li>Declarative loading states vs imperative</li>
<li>Code splitting with React.lazy()</li>
<li>Introduction to Concurrent Features</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 The Problem: Imperative Loading States</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Traditional approach requires manually tracking loading state:</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-red-800 dark:text-red-200 text-sm">// ❌ OLD WAY: Manual loading state everywhere
function UserProfile() {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);  // Extra state
const [error, setError] = useState(null);      // More state

useEffect(() => {
setLoading(true);               // Set loading
fetchUser()
  .then(setUser)
  .catch(setError)
  .finally(() => setLoading(false));  // Clear loading
}, []);

if (loading) return &lt;Spinner /&gt;;   // Handle loading
if (error) return &lt;Error /&gt;;        // Handle error
return &lt;Profile user={user} /&gt;;     // Finally render!
}</pre>
<p class="text-red-700 dark:text-red-300 text-sm mt-2">❌ Every component has the same boilerplate!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">✅ The Solution: Suspense</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Suspense lets you declaratively specify loading UI:</p>

<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl mb-6">
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-green-800 dark:text-green-200 text-sm">// ✅ NEW WAY: Declarative with Suspense
&lt;<span class="text-yellow-700 dark:text-yellow-300">Suspense</span> fallback={&lt;Spinner /&gt;}&gt;
&lt;UserProfile /&gt;   {/* Just renders! No loading state needed */}
&lt;/Suspense&gt;

// The component "suspends" until data is ready
// React automatically shows the fallback while waiting</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 How Suspense Works</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-gray-800 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
1. Component "suspends" (throws a Promise)
2. React catches the Promise
3. React shows the fallback UI
4. When Promise resolves, React retries render
5. Component renders with data!

Timeline:
═════════════════════════════════════════════════════════

[User clicks]
 │
 ▼
┌─────────────────────┐
│ Component suspends  │ ← Throws Promise
│ (data not ready)    │
└─────────────────────┘
 │
 ▼
┌─────────────────────┐
│ Suspense shows      │ ← &lt;Spinner /&gt;
│ fallback            │
└─────────────────────┘
 │
 ▼ (Promise resolves)
┌─────────────────────┐
│ Component renders   │ ← With data! 🎉
│ with data           │
└─────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📦 Code Splitting with React.lazy()</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Split your bundle and load components on demand:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">// ❌ Regular import: Component in main bundle
import HeavyComponent from './HeavyComponent';

// ✅ Lazy import: Separate chunk, loaded on demand
const HeavyComponent = <span class="text-yellow-700 dark:text-yellow-300">React.lazy</span>(() => import('./HeavyComponent'));

// Must wrap in Suspense!
function App() {
return (
&lt;Suspense fallback={&lt;Loading /&gt;}&gt;
  &lt;HeavyComponent /&gt;  {/* Loaded only when rendered */}
&lt;/Suspense&gt;
);
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Concurrent Features (React 18+)</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">useTransition</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Mark updates as non-urgent, keep UI responsive</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">useDeferredValue</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Defer updating a value until urgent work is done</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">Streaming SSR</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Stream HTML as components become ready</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">Selective Hydration</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Hydrate important parts first</p>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Suspense Compatible Libraries</h3>
<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
<p class="text-blue-800 dark:text-blue-200 mb-2">⚠️ Suspense for data fetching requires special libraries:</p>
<ul class="text-blue-800 dark:text-blue-200 text-sm space-y-1">
    <li>• <span class="font-bold">React Query / TanStack Query</span> - Suspense mode</li>
    <li>• <span class="font-bold">SWR</span> - Vercel's data fetching library</li>
    <li>• <span class="font-bold">Relay</span> - GraphQL client by Meta</li>
    <li>• <span class="font-bold">Next.js</span> - Built-in Suspense support</li>
</ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">React.lazy() only for default exports</span> - wrap named exports</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Place Suspense boundaries strategically</span> - not too high, not too low</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Multiple Suspense boundaries</span> - different sections load independently</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Nested Suspense</span> - inner boundary catches first, outer is backup</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║            🎯 SUSPENSE - Declarative Loading States          ║
║       Tell React to "pause" rendering while data loads       ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   BEFORE SUSPENSE (Imperative):                              ║
║   ═════════════════════════════                              ║
║                                                              ║
║   if (isLoading) return <Spinner />;                         ║
║   if (error) return <Error />;                               ║
║   return <Content data={data} />;                            ║
║                                                              ║
║   WITH SUSPENSE (Declarative):                               ║
║   ════════════════════════════                               ║
║                                                              ║
║   <Suspense fallback={<Spinner />}>                          ║
║     <Content />  ← Just renders! React handles the rest      ║
║   </Suspense>                                                ║
║                                                              ║
║   HOW IT WORKS:                                              ║
║   ══════════════                                             ║
║                                                              ║
║   1. Component "suspends" (throws a Promise)                 ║
║   2. React catches it, shows fallback                        ║
║   3. When Promise resolves, React retries render             ║
║   4. Now data is ready, component renders!                   ║
║                                                              ║
║   USE CASES:                                                 ║
║   ══════════                                                 ║
║   • React.lazy() for code splitting                          ║
║   • Data fetching with supporting libraries                  ║
║   • Image loading                                            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🎲 SIMULATED LAZY COMPONENT
// ═══════════════════════════════════════════════════════════════
// In real apps, use: const LazyComp = React.lazy(() => import('./Comp'))
// This demo simulates the loading behavior
// ═══════════════════════════════════════════════════════════════
function HeavyComponent() {
return (
<div style={{
  padding: '20px',
  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
  borderRadius: '12px',
  border: '2px solid #22c55e'
}}>
  <div style={{ fontSize: '48px', marginBottom: '10px' }}>✨</div>
  <h3 style={{ color: '#166534', margin: 0 }}>Content Loaded!</h3>
  <p style={{ color: '#15803d', margin: '10px 0 0' }}>
    This component could be a heavy chart, large list, or fetched data.
  </p>
</div>
);
}

// ═══════════════════════════════════════════════════════════════
// 🎨 LOADING FALLBACK COMPONENT
// ═══════════════════════════════════════════════════════════════
// This is shown while the main content is loading
// Make it visually appealing - users see this while waiting!
// ═══════════════════════════════════════════════════════════════
function LoadingFallback() {
return (
<div style={{
  padding: '40px',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  borderRadius: '12px',
  border: '2px dashed #94a3b8',
  textAlign: 'center'
}}>
  <div style={{ 
    fontSize: '32px', 
    animation: 'spin 1s linear infinite',
    display: 'inline-block'
  }}>
    ⏳
  </div>
  <p style={{ color: '#64748b', margin: '10px 0 0' }}>
    Loading content...
  </p>
</div>
);
}

function App() {
const [showContent, setShowContent] = React.useState(false);
const [isLoading, setIsLoading] = React.useState(false);

// Simulate async loading
const loadContent = () => {
setIsLoading(true);
setTimeout(() => {
  setShowContent(true);
  setIsLoading(false);
}, 1500); // Simulate 1.5s load time
};

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>⏳ Suspense Demo</h3>
  
  {/* Content area with loading state */}
  <div style={{ marginBottom: '15px' }}>
    {isLoading ? (
      <LoadingFallback />
    ) : showContent ? (
      <HeavyComponent />
    ) : (
      <div style={{
        padding: '40px',
        background: '#f8fafc',
        borderRadius: '12px',
        textAlign: 'center',
        border: '2px solid #e2e8f0'
      }}>
        <p style={{ color: '#64748b', margin: 0 }}>
          Click the button to load content
        </p>
      </div>
    )}
  </div>
  
  <div style={{ display: 'flex', gap: '10px' }}>
    <button 
      onClick={loadContent}
      disabled={isLoading || showContent}
      style={{
        padding: '12px 24px',
        background: isLoading || showContent ? '#94a3b8' : '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: isLoading || showContent ? 'not-allowed' : 'pointer',
        fontWeight: 'bold'
      }}
    >
      {isLoading ? '⏳ Loading...' : '📦 Load Content'}
    </button>
    
    {showContent && (
      <button 
        onClick={() => setShowContent(false)}
        style={{
          padding: '12px 24px',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        🔄 Reset
      </button>
    )}
  </div>
  
  <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
    💡 In real apps, use React.lazy() and Suspense for code splitting!
  </p>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Imperative Loading
if (loading) return <Spinner />;
if (error) return <Error />;
return <Data />;`,
    senior: `// ✅ Declarative Suspense
// Parent
<Suspense fallback={<Spinner />}>
<DataComponent />
</Suspense>

// Component just reads data. 
// If data missing, it suspends.`
  },
  interview: {
    questions: [
      {
        q: "What is Concurrent Mode?",
        a: "It allows React to interrupt rendering to handle high-priority events (like typing) and then resume the background render."
      }
    ]
  }
};

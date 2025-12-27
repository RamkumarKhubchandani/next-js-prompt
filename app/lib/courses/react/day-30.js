export const day30 = {
  day: 30,
  title: "useDeferredValue & useTransition Deep Dive",
  intro: "Master React 19's concurrent features. Keep UI responsive during heavy computations.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Master</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>useTransition: Mark updates as non-urgent</li>
<li>useDeferredValue: Defer expensive re-renders</li>
<li>When to use each</li>
<li>Real-world patterns: Search, filtering, tabs</li>
</ul>

<div class="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 p-4 rounded-xl mb-6">
<h4 class="text-cyan-400 font-bold mb-2">⚡ Key Difference</h4>
<p class="text-gray-600 dark:text-light-300"><code>useTransition</code>: Wrap setState calls to mark them as low priority.<br/>
<code>useDeferredValue</code>: Create a deferred copy of a value that "lags behind".</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔀 useTransition</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">const [isPending, startTransition] = useTransition();

// Urgent: Update input immediately
setQuery(input);

// Non-urgent: Filter can lag
startTransition(() => {
setFilteredResults(expensiveFilter(input));
});</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⏳ useDeferredValue</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">const deferredQuery = useDeferredValue(query);

// query updates immediately (typing stays responsive)
// deferredQuery lags behind (expensive render can wait)</pre>
</div>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  ⚡ useDeferredValue & useTransition                                 ║
║  Keep UI responsive during heavy operations                          ║
╠══════════════════════════════════════════════════════════════════════╣
║  DEMO 1: Search with useDeferredValue                                ║
║  DEMO 2: Tab switching with useTransition                            ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 📦 SLOW COMPONENT (Simulates expensive render)
// ═══════════════════════════════════════════════════════════════════
function SlowList({ query }) {
// Simulate slow render
const items = [];
for (let i = 0; i < 500; i++) {
items.push(
  <SlowItem key={i} text={\`Result \${i + 1} for "\${query}"\`} />
);
}
return <div>{items}</div>;
}

function SlowItem({ text }) {
// Artificial slowdown
const startTime = performance.now();
while (performance.now() - startTime < 1) {} // 1ms per item = 500ms total

return (
<div style={{ 
  padding: '8px', 
  borderBottom: '1px solid #eee',
  fontSize: '14px'
}}>
  {text}
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// 🔍 DEMO 1: useDeferredValue for Search
// ═══════════════════════════════════════════════════════════════════
function DeferredSearch() {
const [query, setQuery] = React.useState('');
const deferredQuery = React.useDeferredValue(query);

// Check if we're showing stale results
const isStale = query !== deferredQuery;

return (
<div>
  <h4>🔍 useDeferredValue Demo</h4>
  <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Type to search (try fast typing)..."
    style={{
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      marginBottom: '10px'
    }}
  />
  
  <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
    Query: "{query}" | Deferred: "{deferredQuery}" 
    {isStale && <span style={{ color: '#f59e0b' }}> (stale)</span>}
  </div>
  
  <div style={{ 
    maxHeight: '200px', 
    overflow: 'auto', 
    border: '1px solid #ddd',
    borderRadius: '8px',
    opacity: isStale ? 0.7 : 1,
    transition: 'opacity 0.2s'
  }}>
    {deferredQuery && <SlowList query={deferredQuery} />}
  </div>
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// 🔀 DEMO 2: useTransition for Tab Switching
// ═══════════════════════════════════════════════════════════════════
function TabContent({ id }) {
// Simulate expensive render
const items = [];
for (let i = 0; i < 300; i++) {
items.push(
  <div key={i} style={{ padding: '4px', borderBottom: '1px solid #f0f0f0' }}>
    Tab {id} - Item {i + 1}
  </div>
);
}
// Artificial delay
const start = performance.now();
while (performance.now() - start < 100) {}

return <div style={{ maxHeight: '200px', overflow: 'auto' }}>{items}</div>;
}

function TransitionTabs() {
const [tab, setTab] = React.useState('A');
const [isPending, startTransition] = React.useTransition();

const handleTabChange = (newTab) => {
startTransition(() => {
  setTab(newTab);
});
};

return (
<div>
  <h4>🔀 useTransition Demo</h4>
  
  <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
    {['A', 'B', 'C', 'D'].map(t => (
      <button
        key={t}
        onClick={() => handleTabChange(t)}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          background: tab === t ? '#3b82f6' : '#e2e8f0',
          color: tab === t ? 'white' : '#333',
          transition: 'all 0.2s'
        }}
      >
        Tab {t}
      </button>
    ))}
    
    {isPending && (
      <span style={{ 
        padding: '10px', 
        color: '#f59e0b',
        fontSize: '14px'
      }}>
        ⏳ Loading...
      </span>
    )}
  </div>
  
  <div style={{ 
    border: '1px solid #ddd', 
    borderRadius: '8px',
    opacity: isPending ? 0.5 : 1,
    transition: 'opacity 0.2s'
  }}>
    <TabContent id={tab} />
  </div>
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 MAIN APP
// ═══════════════════════════════════════════════════════════════════
function App() {
const [demo, setDemo] = React.useState('deferred');

return (
<div style={{ fontFamily: 'system-ui', padding: '20px', maxWidth: '600px' }}>
  <h3>⚡ Concurrent React Features</h3>
  
  <div style={{ 
    background: '#f8fafc', 
    padding: '15px', 
    borderRadius: '8px',
    marginBottom: '20px'
  }}>
    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
      <button 
        onClick={() => setDemo('deferred')}
        style={{
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          background: demo === 'deferred' ? '#6366f1' : '#e2e8f0',
          color: demo === 'deferred' ? 'white' : '#333'
        }}
      >
        useDeferredValue
      </button>
      <button 
        onClick={() => setDemo('transition')}
        style={{
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          background: demo === 'transition' ? '#6366f1' : '#e2e8f0',
          color: demo === 'transition' ? 'white' : '#333'
        }}
      >
        useTransition
      </button>
    </div>
    
    {demo === 'deferred' ? <DeferredSearch /> : <TransitionTabs />}
  </div>
  
  <div style={{ 
    background: '#1e293b', 
    padding: '15px', 
    borderRadius: '8px',
    color: '#94a3b8',
    fontSize: '13px'
  }}>
    <strong style={{ color: '#22d3ee' }}>💡 When to use which?</strong>
    <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
      <li><strong>useDeferredValue:</strong> You receive a value (prop) and want to defer re-rendering based on it</li>
      <li><strong>useTransition:</strong> You control the state update and want to mark it as low priority</li>
    </ul>
  </div>
</div>
);
}`,
  comparison: {
    junior: `// ❌ No optimization - typing lags
function Search() {
const [query, setQuery] = useState('');
const results = expensiveFilter(query); // Blocks typing!

return (
<>
  <input value={query} onChange={e => setQuery(e.target.value)} />
  <List items={results} />
</>
);
}`,
    senior: `// ✅ useDeferredValue - typing stays snappy
function Search() {
const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);
const results = expensiveFilter(deferredQuery);

return (
<>
  <input value={query} onChange={e => setQuery(e.target.value)} />
  <List items={results} style={{ opacity: query !== deferredQuery ? 0.5 : 1 }} />
</>
);
}`
  },
  interview: {
    questions: [
      {
        q: "When would you use useDeferredValue vs useTransition?",
        a: "useDeferredValue when you receive a value as prop and can't control its update. useTransition when you control the setState call. Think: useDeferredValue = defer rendering, useTransition = defer state update."
      },
      {
        q: "What happens when React is rendering a transition and a higher priority update comes in?",
        a: "React abandons the in-progress transition render and starts the higher priority update immediately. This is why typing stays responsive - each keystroke interrupts the previous deferred render."
      },
      {
        q: "Can you use useDeferredValue and useTransition together?",
        a: "Rarely needed. If you control the state, use useTransition. If receiving a prop, use useDeferredValue. Using both is redundant and could cause confusing double-deferred behavior."
      }
    ]
  }
};

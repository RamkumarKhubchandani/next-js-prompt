export const day28 = {
  day: 28,
  title: "Performance Profiling & React DevTools Mastery",
  intro: "Find and fix performance bottlenecks. Profiler, Chrome DevTools, and why-did-you-render.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 28. React is fast, but you can make it slow. Common culprit: inline objects."
      },
      {
        type: "challenge",
        instruction: "This component passes a new style object to `Child` on every render, causing re-renders. Fix it.",
        buggyCode: `// ❌ Unstable Prop
function Parent() {
  return <Child style={{ color: 'red' }} />;
}`,
        solutionCode: `// ✅ Stable Prop
const style = { color: 'red' };
function Parent() {
  return <Child style={style} />;
}`,
        verifyOutput: "const style =",
        successMessage: "Correct! Defining objects outside the component (or using `useMemo`) keeps the reference stable, allowing `React.memo` to work.",
        hint: "Move `const style = ...` outside the component function."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Master</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>React DevTools Profiler: Flame graphs & ranked charts</li>
<li>Chrome DevTools: Performance tab & memory analysis</li>
<li>why-did-you-render library setup</li>
<li>Common performance anti-patterns</li>
<li>useMemo, useCallback, memo - when to use</li>
</ul>

<div class="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 p-4 rounded-xl mb-6">
<h4 class="text-orange-400 font-bold mb-2">⚠️ Premature Optimization Warning</h4>
<p class="text-gray-600 dark:text-light-300">"Don't optimize what you haven't measured." Always profile FIRST, then optimize. Most apps don't need memo() everywhere.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Setup why-did-you-render</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300"># Install
npm install @welldone-software/why-did-you-render

# Create wdyr.js (import BEFORE React!)
import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
trackAllPureComponents: true,
});

# Import in index.js FIRST LINE
import './wdyr';</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔍 React DevTools Profiler</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Open DevTools → Profiler tab</li>
<li>Click Record → Interact with app → Stop</li>
<li>Read the flame graph: wider bars = slower</li>
<li>Gray bars = didn't re-render (good!)</li>
<li>Click component → See "Why did this render?"</li>
</ol>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔬 REACT PERFORMANCE PROFILING                                       ║
║  Find bottlenecks, fix them, verify improvement                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  This demo shows common performance anti-patterns and fixes          ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// ❌ ANTI-PATTERN 1: Inline objects cause re-renders
// ═══════════════════════════════════════════════════════════════════
function BadComponent({ items }) {
return (
<div>
  {items.map(item => (
    // ❌ New object on every render!
    <ChildComponent 
      key={item.id}
      style={{ color: 'red', padding: 10 }}  // New object each time!
      onClick={() => console.log(item)}       // New function each time!
    />
  ))}
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// ✅ FIX: Move objects outside or memoize
// ═══════════════════════════════════════════════════════════════════
const itemStyle = { color: 'red', padding: 10 }; // Stable reference

function GoodComponent({ items }) {
const handleClick = React.useCallback((item) => {
console.log(item);
}, []);

return (
<div>
  {items.map(item => (
    <ChildComponent 
      key={item.id}
      style={itemStyle}
      onClick={() => handleClick(item)}
    />
  ))}
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// ❌ ANTI-PATTERN 2: Expensive calculations on every render
// ═══════════════════════════════════════════════════════════════════
function BadFilteredList({ items, filter }) {
// ❌ Runs on EVERY render, even if items/filter didn't change
const filtered = items.filter(i => i.name.includes(filter));
const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

return <List items={sorted} />;
}

// ═══════════════════════════════════════════════════════════════════
// ✅ FIX: useMemo for expensive calculations
// ═══════════════════════════════════════════════════════════════════
function GoodFilteredList({ items, filter }) {
// ✅ Only recalculates when items or filter change
const sortedFiltered = React.useMemo(() => {
const filtered = items.filter(i => i.name.includes(filter));
return filtered.sort((a, b) => a.name.localeCompare(b.name));
}, [items, filter]);

return <List items={sortedFiltered} />;
}

// ═══════════════════════════════════════════════════════════════════
// 📦 MEMOIZED CHILD COMPONENT
// ═══════════════════════════════════════════════════════════════════
const ExpensiveChild = React.memo(function ExpensiveChild({ data, onClick }) {
console.log('ExpensiveChild rendered');

// Simulate expensive render
const result = React.useMemo(() => {
let sum = 0;
for (let i = 0; i < 1000000; i++) sum += i;
return sum;
}, []);

return (
<div 
  onClick={onClick}
  style={{ 
    padding: '10px', 
    margin: '5px', 
    background: '#e0f2fe',
    borderRadius: '4px',
    cursor: 'pointer'
  }}
>
  {data.name} (computed: {result})
</div>
);
});

// ═══════════════════════════════════════════════════════════════════
// 🎮 DEMO: Toggle between optimized and unoptimized
// ═══════════════════════════════════════════════════════════════════
function App() {
const [count, setCount] = React.useState(0);
const [isOptimized, setIsOptimized] = React.useState(true);
const [renderCount, setRenderCount] = React.useState(0);

// Track renders
React.useEffect(() => {
setRenderCount(c => c + 1);
});

// ❌ Unoptimized callback
const badHandleClick = () => console.log('clicked');

// ✅ Optimized callback
const goodHandleClick = React.useCallback(() => console.log('clicked'), []);

// Sample data
const items = React.useMemo(() => [
{ id: 1, name: 'Item A' },
{ id: 2, name: 'Item B' },
{ id: 3, name: 'Item C' }
], []);

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3>🔬 Performance Profiling Demo</h3>
  
  <div style={{ 
    background: '#fef3c7', 
    padding: '15px', 
    borderRadius: '8px',
    marginBottom: '20px'
  }}>
    <p style={{ margin: 0, fontSize: '14px' }}>
      <strong>Render Count:</strong> {renderCount} | 
      <strong> Mode:</strong> {isOptimized ? '✅ Optimized' : '❌ Unoptimized'}
    </p>
  </div>

  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
    <button 
      onClick={() => setCount(c => c + 1)}
      style={{ padding: '10px 20px', cursor: 'pointer' }}
    >
      Increment Counter ({count})
    </button>
    
    <button 
      onClick={() => setIsOptimized(!isOptimized)}
      style={{ 
        padding: '10px 20px', 
        cursor: 'pointer',
        background: isOptimized ? '#22c55e' : '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '6px'
      }}
    >
      Toggle Optimization
    </button>
  </div>

  <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
    Click "Increment Counter" and watch the console. 
    In unoptimized mode, children re-render unnecessarily.
  </p>

  <div style={{ 
    background: '#f8fafc', 
    padding: '15px', 
    borderRadius: '8px' 
  }}>
    {items.map(item => (
      <ExpensiveChild
        key={item.id}
        data={item}
        onClick={isOptimized ? goodHandleClick : badHandleClick}
      />
    ))}
  </div>

  <div style={{ 
    marginTop: '20px', 
    padding: '15px', 
    background: '#1e293b', 
    color: '#94a3b8',
    borderRadius: '8px',
    fontSize: '13px'
  }}>
    <strong style={{ color: '#22d3ee' }}>📊 Open DevTools Console</strong>
    <br />
    When optimized, children don't log "rendered" on counter change.
    <br /><br />
    <strong style={{ color: '#22d3ee' }}>🔥 Why?</strong>
    <br />
    Unoptimized: badHandleClick is a new function each render → breaks memo()
    <br />
    Optimized: goodHandleClick is stable via useCallback → memo() works!
  </div>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Memoize everything "just in case"
const MegaMemoized = React.memo(({ name }) => {
const style = useMemo(() => ({ color: 'red' }), []);
const click = useCallback(() => {}, []);
// 100 lines of useMemo and useCallback...
});`,
    senior: `// ✅ Profile first, optimize bottlenecks
// Step 1: Profile with DevTools
// Step 2: Find slow components (> 16ms)
// Step 3: Fix ONLY those
const SlowList = React.memo(({ items }) => {
// Only memoize expensive operations
const sorted = useMemo(() => expensiveSort(items), [items]);
return <VirtualizedList items={sorted} />;
});`
  },
  interview: {
    questions: [
      {
        q: "When should you NOT use React.memo?",
        a: "When the component is cheap to render, when props change frequently anyway, when the component always renders with different props, or when you haven't profiled and confirmed there's a problem. Memo has overhead too."
      },
      {
        q: "What causes 'wasted renders' in React?",
        a: "Parent re-renders (children re-render by default), new object/array/function references in props, context value changes, state updates that don't affect UI. Use Profiler's 'Why did this render?' to diagnose."
      },
      {
        q: "How do you fix a slow component that renders frequently?",
        a: "1) Profile to confirm it's slow. 2) Check for expensive calculations → useMemo. 3) Check for unnecessary re-renders → memo() + stable props. 4) Consider virtualization for long lists. 5) Code-split if it's large."
      }
    ]
  }
};

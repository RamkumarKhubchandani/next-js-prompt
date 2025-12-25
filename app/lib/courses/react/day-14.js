export const day14 = {
  day: 14,
  title: "Performance: Virtualization & Profiler",
  intro: "Render 100,000 items at 60fps.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Why large lists kill performance</li>
<li>What is virtualization (windowing)</li>
<li>How to use React DevTools Profiler</li>
<li>Common performance optimization strategies</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 The Problem: Too Many DOM Nodes</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Rendering thousands of elements destroys performance:</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<pre class="text-red-800 dark:text-red-200 text-sm">// ❌ Rendering 10,000 items directly
function ProductList({ products }) {
return (
&lt;div&gt;
  {products.map(product => (
    &lt;ProductCard key={product.id} product={product} /&gt;
  ))}
&lt;/div&gt;
);
}

// Problems:
// • 10,000 DOM nodes created at once
// • Browser freezes during initial render
// • Scrolling is janky
// • Memory usage skyrockets</pre>
<p class="text-red-300 text-sm mt-2">❌ Each DOM node costs memory and painting time!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">✅ The Solution: Virtualization (Windowing)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Only render items that are visible in the viewport:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
REGULAR LIST (10,000 items):        VIRTUALIZED LIST:
════════════════════════════        ══════════════════════════

&lt;ul&gt;                                &lt;ul style={{ height: '300px' }}&gt;
&lt;li&gt;Item 1&lt;/li&gt;    ← In DOM          {/* Spacer for items above */}
&lt;li&gt;Item 2&lt;/li&gt;    ← In DOM          &lt;div style={{height: '1500px'}} /&gt;
&lt;li&gt;Item 3&lt;/li&gt;    ← In DOM          
... 9,994 more ...  ← ALL IN DOM!     &lt;li&gt;Item 51&lt;/li&gt;   ← Only visible
&lt;li&gt;Item 9998&lt;/li&gt; ← In DOM          &lt;li&gt;Item 52&lt;/li&gt;   ← Only visible
&lt;li&gt;Item 9999&lt;/li&gt; ← In DOM          &lt;li&gt;Item 53&lt;/li&gt;   ← Only visible
&lt;li&gt;Item 10000&lt;/li&gt;← In DOM          ... 7 more ...
&lt;/ul&gt;                                   
                                    {/* Spacer for items below */}
Total DOM nodes: 10,000 🐌             &lt;div style={{height: '9700px'}} /&gt;
                                  &lt;/ul&gt;
                                  
                                  Total DOM nodes: ~15 🚀
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 Virtualization Libraries</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">react-window</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Lightweight, most popular choice</p>
    <p class="text-light-400 text-xs mt-1">~6KB gzipped</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">react-virtualized</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Feature-rich, more complex</p>
    <p class="text-light-400 text-xs mt-1">~35KB gzipped</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">@tanstack/react-virtual</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Headless, framework agnostic</p>
    <p class="text-light-400 text-xs mt-1">~3KB gzipped</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">react-virtuoso</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Auto height, grouped items</p>
    <p class="text-light-400 text-xs mt-1">~15KB gzipped</p>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔍 React DevTools Profiler</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Find performance bottlenecks without guessing:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-700 dark:text-cyan-300">How to use:
1. Open React DevTools → "Profiler" tab
2. Click "Record" 🔴
3. Interact with your app
4. Click "Stop" ⬛
5. Analyze the flamegraph!

What to look for:
───────────────────────────────
<span class="text-yellow-300">• Long bars</span> = slow components (optimize these!)
<span class="text-yellow-300">• Many re-renders</span> = missing memoization
<span class="text-yellow-300">• "Why did this render?"</span> = enable in settings
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Performance Optimization Checklist</h3>
<div class="overflow-x-auto mb-6">
<table class="w-full text-sm text-left">
    <thead class="bg-dark-700 text-gray-700 dark:text-light-200">
        <tr>
            <th class="p-3 rounded-tl-lg">Issue</th>
            <th class="p-3">Solution</th>
            <th class="p-3 rounded-tr-lg">Hook/Tool</th>
        </tr>
    </thead>
    <tbody class="text-gray-600 dark:text-light-300">
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Too many items</td>
            <td class="p-3">Virtualization</td>
            <td class="p-3 font-mono text-xs">react-window</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Expensive calculation</td>
            <td class="p-3">Memoize result</td>
            <td class="p-3 font-mono text-xs">useMemo</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Child re-renders</td>
            <td class="p-3">Stable references</td>
            <td class="p-3 font-mono text-xs">useCallback, React.memo</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Large bundle</td>
            <td class="p-3">Code splitting</td>
            <td class="p-3 font-mono text-xs">React.lazy, dynamic import</td>
        </tr>
        <tr>
            <td class="p-3 rounded-bl-lg">Slow images</td>
            <td class="p-3">Lazy loading</td>
            <td class="p-3 rounded-br-lg font-mono text-xs">loading="lazy"</td>
        </tr>
    </tbody>
</table>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Don't Optimize Prematurely!</h3>
<div class="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
<p class="text-yellow-300 font-bold mb-2">🎯 Optimization workflow:</p>
<ol class="text-yellow-200 text-sm space-y-1 list-decimal list-inside">
    <li>Notice a performance problem (sluggish UI)</li>
    <li>Profile to find the actual bottleneck</li>
    <li>Apply targeted optimization</li>
    <li>Measure improvement</li>
</ol>
<p class="text-yellow-300 mt-2 text-sm">Never add useMemo/useCallback "just in case"!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Virtualize lists over ~100 items</span></li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Use Profiler in production mode</span> - dev mode is slower</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Check "Highlight updates"</span> in DevTools to see re-renders</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Consider pagination</span> as an alternative to virtualization</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║         🎯 VIRTUALIZATION - Render 100,000 items at 60fps    ║
║            Only render what's visible on screen!             ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   THE PROBLEM:                                               ║
║   ════════════                                               ║
║                                                              ║
║   10,000 items = 10,000 DOM nodes = 🐌 SLOW                  ║
║                                                              ║
║   THE SOLUTION - WINDOWING:                                  ║
║   ══════════════════════════                                 ║
║                                                              ║
║   ┌─────────────────────────────────┐                        ║
║   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ ← Items above viewport ║
║   │ ░░░░░ (not rendered) ░░░░░░░░░░ │   (just empty space)   ║
║   ├─────────────────────────────────┤                        ║
║   │ Item 50                         │ ← VISIBLE WINDOW       ║
║   │ Item 51                         │   (only these render!) ║
║   │ Item 52                         │                        ║
║   │ Item 53                         │   ~15 DOM nodes        ║
║   │ Item 54                         │   instead of 10,000!   ║
║   ├─────────────────────────────────┤                        ║
║   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ ← Items below viewport ║
║   │ ░░░░░ (not rendered) ░░░░░░░░░░ │   (just empty space)   ║
║   └─────────────────────────────────┘                        ║
║                                                              ║
║   POPULAR LIBRARIES:                                         ║
║   ══════════════════                                         ║
║   • react-window (lightweight)                               ║
║   • react-virtualized (feature-rich)                         ║
║   • @tanstack/react-virtual                                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function App() {
// ═══════════════════════════════════════════════════════════
// 📦 GENERATE 10,000 ITEMS
// ═══════════════════════════════════════════════════════════
// Using lazy initialization to avoid creating array on every render
// ═══════════════════════════════════════════════════════════
const [items] = React.useState(() => 
Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: 'User ' + (i + 1),
  email: 'user' + (i + 1) + '@example.com'
}))
);

// Track which items are visible based on scroll position
const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 12 });
const [renderCount, setRenderCount] = React.useState(0);

const ITEM_HEIGHT = 50; // Fixed height per item
const CONTAINER_HEIGHT = 300;

// ═══════════════════════════════════════════════════════════
// 🎯 CALCULATE VISIBLE RANGE ON SCROLL
// ═══════════════════════════════════════════════════════════
// Only update state when we need to show different items
// ═══════════════════════════════════════════════════════════
const handleScroll = (e) => {
const scrollTop = e.target.scrollTop;
const start = Math.floor(scrollTop / ITEM_HEIGHT);
const end = start + Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT) + 2; // +2 for buffer

setVisibleRange(prev => {
  if (prev.start !== start || prev.end !== end) {
    setRenderCount(c => c + 1);
    return { start, end };
  }
  return prev;
});
};

// Only slice the visible items
const visibleItems = items.slice(visibleRange.start, visibleRange.end);

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>🚀 Virtualization Demo</h3>
  
  {/* Stats panel */}
  <div style={{
    display: 'flex',
    gap: '20px',
    marginBottom: '15px',
    flexWrap: 'wrap'
  }}>
    <div style={{ background: '#f0fdf4', padding: '10px 15px', borderRadius: '8px', border: '1px solid #22c55e' }}>
      <span style={{ color: '#166534', fontWeight: 'bold' }}>Total Items: </span>
      <span style={{ color: '#15803d' }}>{items.length.toLocaleString()}</span>
    </div>
    <div style={{ background: '#eff6ff', padding: '10px 15px', borderRadius: '8px', border: '1px solid #3b82f6' }}>
      <span style={{ color: '#1e40af', fontWeight: 'bold' }}>DOM Nodes: </span>
      <span style={{ color: '#2563eb' }}>~{visibleItems.length}</span>
    </div>
    <div style={{ background: '#fef3c7', padding: '10px 15px', borderRadius: '8px', border: '1px solid #f59e0b' }}>
      <span style={{ color: '#92400e', fontWeight: 'bold' }}>Scroll Events: </span>
      <span style={{ color: '#d97706' }}>{renderCount}</span>
    </div>
  </div>
  
  {/* Virtualized list */}
  <div 
    onScroll={handleScroll}
    style={{ 
      height: CONTAINER_HEIGHT, 
      overflow: 'auto', 
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      position: 'relative',
      background: '#f8fafc'
    }}
  >
    {/* Spacer div to maintain scroll height */}
    <div style={{ height: items.length * ITEM_HEIGHT, position: 'relative' }}>
      {visibleItems.map((item, i) => (
        <div 
          key={item.id}
          style={{
            position: 'absolute',
            top: (visibleRange.start + i) * ITEM_HEIGHT,
            height: ITEM_HEIGHT,
            width: '100%',
            boxSizing: 'border-box',
            padding: '10px 15px',
            borderBottom: '1px solid #e2e8f0',
            background: (visibleRange.start + i) % 2 === 0 ? 'white' : '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '12px'
          }}>
            {item.id}
          </div>
          <div>
            <div style={{ fontWeight: '500', color: '#1e293b' }}>{item.name}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{item.email}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
    💡 Scroll through 10,000 items smoothly - only ~{visibleItems.length} are actually rendered!
  </p>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Render All
<ul>
{items.map(i => <li>{i}</li>)} 
</ul>
// 10,000 DOM nodes created. Page freezes.`,
    senior: `// ✅ Virtualize
<VirtualList 
items={items} 
rowHeight={50} 
renderRow={({ index, style }) => (
<li style={style}>{items[index]}</li>
)}
/>
// Only 10 DOM nodes created.`
  },
  interview: {
    questions: [
      {
        q: "What tool do you use to debug performance?",
        a: "React DevTools Profiler tab. It shows which components rendered and why (Flamegraph)."
      }
    ]
  }
};

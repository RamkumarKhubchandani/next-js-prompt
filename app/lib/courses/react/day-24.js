export const day24 = {
  day: 24,
  title: "Machine Coding: Infinite Scroll with Virtualization",
  intro: "Render 10,000 items without killing the browser. Master Intersection Observer, windowing, and virtual lists.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 24. Infinite Scroll is tricky. Scroll event listeners are bad for performance. Use Intersection Observer."
      },
      {
        type: "challenge",
        instruction: "This code uses a scroll listener, which fires 100x per second. Switch to Intersection Observer.",
        buggyCode: `// ❌ Performance killer
useEffect(() => {
  window.addEventListener('scroll', checkPosition);
  return () => window.removeEventListener('scroll', checkPosition);
}, []);`,
        solutionCode: `// ✅ Efficient
useEffect(() => {
  const observer = new IntersectionObserver(onIntersect);
  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, []);`,
        verifyOutput: "IntersectionObserver",
        successMessage: "Perfect! Intersection Observer handles visibility checks efficiently in the browser's background thread.",
        hint: "Use `new IntersectionObserver(...)`."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Build</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Infinite scroll with Intersection Observer</li>
<li>Virtual list (only render visible items)</li>
<li>Smooth scrolling with overscan</li>
<li>Dynamic row heights (advanced)</li>
</ul>

<div class="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<h4 class="text-red-600 dark:text-red-400 font-bold mb-2">🚨 The Problem</h4>
<p class="text-gray-600 dark:text-light-300">Rendering 10,000 DOM nodes = Laggy scrolling, high memory, crashed tabs. The solution? <strong>Only render what's visible.</strong></p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Key Concepts</h3>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">1. Intersection Observer</h4>
<p class="mb-4 text-gray-600 dark:text-light-300">Detects when an element enters or leaves the viewport. No scroll event listeners needed.</p>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">2. Windowing / Virtualization</h4>
<p class="mb-4 text-gray-600 dark:text-light-300">Calculate which items are visible based on scroll position and container height, then render only those + a few extra (overscan).</p>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">3. Libraries (for production)</h4>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">@tanstack/react-virtual</code> - Modern, lightweight</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">react-window</code> - Popular, battle-tested</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">react-virtuoso</code> - Best for dynamic heights</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  📜 INFINITE SCROLL + VIRTUALIZATION                                 ║
║  Render 10,000 items without killing the browser!                    ║
╠══════════════════════════════════════════════════════════════════════╣
║  PART 1: Infinite Scroll with Intersection Observer                  ║
║  PART 2: Basic Virtualized List (DIY)                                ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 🪝 CUSTOM HOOK: useIntersectionObserver
// ═══════════════════════════════════════════════════════════════════
function useIntersectionObserver(callback, options = {}) {
const ref = React.useRef(null);

React.useEffect(() => {
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    callback();
  }
}, { threshold: 0.1, ...options });

if (ref.current) observer.observe(ref.current);

return () => observer.disconnect();
}, [callback, options]);

return ref;
}

// ═══════════════════════════════════════════════════════════════════
// 📦 MOCK API - Simulate paginated data
// ═══════════════════════════════════════════════════════════════════
const fetchPage = async (page, pageSize = 20) => {
await new Promise(r => setTimeout(r, 500)); // Simulate network
const start = page * pageSize;
return Array.from({ length: pageSize }, (_, i) => ({
id: start + i,
title: \`Item #\${start + i + 1}\`,
description: \`This is the description for item \${start + i + 1}. It contains some sample text.\`
}));
};

// ═══════════════════════════════════════════════════════════════════
// 📜 PART 1: INFINITE SCROLL (Simple)
// ═══════════════════════════════════════════════════════════════════
function InfiniteScrollList() {
const [items, setItems] = React.useState([]);
const [page, setPage] = React.useState(0);
const [isLoading, setIsLoading] = React.useState(false);
const [hasMore, setHasMore] = React.useState(true);

const loadMore = React.useCallback(async () => {
if (isLoading || !hasMore) return;

setIsLoading(true);
const newItems = await fetchPage(page);

if (newItems.length === 0) {
  setHasMore(false);
} else {
  setItems(prev => [...prev, ...newItems]);
  setPage(prev => prev + 1);
}
setIsLoading(false);
}, [page, isLoading, hasMore]);

// Load initial data
React.useEffect(() => { loadMore(); }, []);

// Intersection Observer for infinite scroll trigger
const loaderRef = useIntersectionObserver(loadMore);

return (
<div style={{ height: '300px', overflow: 'auto', border: '1px solid #ddd', borderRadius: '8px' }}>
  {items.map(item => (
    <div key={item.id} style={{ 
      padding: '15px', 
      borderBottom: '1px solid #eee',
      background: item.id % 2 === 0 ? '#f8fafc' : 'white'
    }}>
      <strong>{item.title}</strong>
      <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#666' }}>{item.description}</p>
    </div>
  ))}
  
  {/* Sentinel element - when visible, triggers loadMore */}
  <div ref={loaderRef} style={{ padding: '20px', textAlign: 'center' }}>
    {isLoading && '⏳ Loading more...'}
    {!hasMore && '✅ No more items'}
  </div>
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// 🚀 PART 2: VIRTUALIZED LIST (Advanced)
// ═══════════════════════════════════════════════════════════════════
function VirtualizedList({ items, itemHeight = 60, containerHeight = 300, overscan = 5 }) {
const [scrollTop, setScrollTop] = React.useState(0);
const containerRef = React.useRef(null);

// Calculate visible range
const totalHeight = items.length * itemHeight;
const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
const visibleCount = Math.ceil(containerHeight / itemHeight) + (2 * overscan);
const endIndex = Math.min(items.length, startIndex + visibleCount);

const visibleItems = items.slice(startIndex, endIndex);
const offsetY = startIndex * itemHeight;

const handleScroll = (e) => {
setScrollTop(e.target.scrollTop);
};

return (
<div
  ref={containerRef}
  onScroll={handleScroll}
  style={{
    height: containerHeight,
    overflow: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    position: 'relative'
  }}
>
  {/* Spacer to maintain scroll height */}
  <div style={{ height: totalHeight, position: 'relative' }}>
    {/* Rendered items positioned absolutely */}
    <div style={{ position: 'absolute', top: offsetY, left: 0, right: 0 }}>
      {visibleItems.map((item, index) => (
        <div
          key={item.id}
          style={{
            height: itemHeight,
            padding: '10px 15px',
            boxSizing: 'border-box',
            borderBottom: '1px solid #eee',
            background: (startIndex + index) % 2 === 0 ? '#f0fdf4' : 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span style={{ 
            background: '#10b981', 
            color: 'white', 
            padding: '4px 8px', 
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            #{item.id}
          </span>
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  </div>
  
  {/* Debug info */}
  <div style={{
    position: 'sticky',
    bottom: 0,
    background: '#1e293b',
    color: '#94a3b8',
    padding: '8px',
    fontSize: '11px',
    textAlign: 'center'
  }}>
    Rendering {visibleItems.length} of {items.length} items | 
    Visible: {startIndex}-{endIndex}
  </div>
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 APP: Demo Both Approaches
// ═══════════════════════════════════════════════════════════════════
function App() {
const [tab, setTab] = React.useState('infinite');

// Generate 10,000 items for virtualization demo
const bigList = React.useMemo(() => 
Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  title: \`Virtual Item #\${i + 1}\`
})), 
[]);

return (
<div style={{ fontFamily: 'system-ui', padding: '20px', maxWidth: '500px' }}>
  <h3>📜 Infinite Scroll vs Virtualization</h3>
  
  <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
    <button 
      onClick={() => setTab('infinite')}
      style={{
        padding: '8px 16px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        background: tab === 'infinite' ? '#3b82f6' : '#e2e8f0',
        color: tab === 'infinite' ? 'white' : '#333'
      }}
    >
      Infinite Scroll
    </button>
    <button 
      onClick={() => setTab('virtual')}
      style={{
        padding: '8px 16px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        background: tab === 'virtual' ? '#3b82f6' : '#e2e8f0',
        color: tab === 'virtual' ? 'white' : '#333'
      }}
    >
      Virtualized (10K items!)
    </button>
  </div>

  {tab === 'infinite' ? (
    <>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
        Scroll down to load more items automatically.
      </p>
      <InfiniteScrollList />
    </>
  ) : (
    <>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
        10,000 items rendered instantly! Only ~15 DOM nodes exist.
      </p>
      <VirtualizedList items={bigList} />
    </>
  )}
</div>
);
}`,
  comparison: {
    junior: `// ❌ Scroll event listener (bad)
window.addEventListener('scroll', () => {
if (window.innerHeight + scrollY >= document.body.offsetHeight) {
loadMore();
}
});
// Problems: Fires 100x/sec, blocks main thread`,
    senior: `// ✅ Intersection Observer
const observer = new IntersectionObserver(
([entry]) => {
if (entry.isIntersecting) loadMore();
},
{ threshold: 0.1 }
);
observer.observe(sentinelElement);
// Benefits: Browser-optimized, fires once per intersection`
  },
  interview: {
    questions: [
      {
        q: "What is the difference between infinite scroll and virtualization?",
        a: "Infinite scroll loads more data as you scroll (appends to DOM). Virtualization keeps the DOM small by only rendering visible items + overscan, regardless of total data size. Use infinite scroll for lazy loading, virtualization for huge lists."
      },
      {
        q: "Why is Intersection Observer better than scroll events?",
        a: "Scroll events fire continuously (60+ times/sec), blocking the main thread. Intersection Observer is browser-optimized, batches callbacks, and only fires when visibility changes. It's also simpler to use."
      },
      {
        q: "How do you handle dynamic row heights in virtualization?",
        a: "Measure each row after render and cache heights in a Map. Use a 'position' array that tracks cumulative heights. Libraries like react-virtuoso handle this automatically with 'estimatedItemSize' + real measurement."
      }
    ]
  }
};

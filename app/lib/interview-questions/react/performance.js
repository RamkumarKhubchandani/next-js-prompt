export const performanceQuestions = [
  {
    id: 'react-perf-1',
    category: 'Performance',
    difficulty: 'Hard',
    question: 'React.memo vs useMemo vs useCallback - Complete Guide',
    answer: `This is THE most asked performance question at Google, Meta, and Netflix.

### React.memo (Component Memoization)
Prevents re-rendering of component if props haven't changed.

**When to use:**
- Component renders often with same props
- Component is expensive to render
- Component is pure (same props = same output)

### useMemo (Value Memoization)
Caches the RESULT of expensive calculations.

**When to use:**
- Expensive calculations (filtering large arrays, complex math)
- Creating objects/arrays passed as props

### useCallback (Function Memoization)
Caches the FUNCTION REFERENCE itself.

**When to use:**
- Passing callbacks to memoized child components
- Function is a dependency of useEffect/useMemo

### Common Mistake:
Using useCallback without React.memo on child = USELESS`,
    codeExample: `// React.memo vs useMemo vs useCallback
console.log('=== React.memo - Component Memoization ===');

// Without memo: Always re-renders
function ExpensiveChild({ name }) {
  console.log('[Child] Rendered with name:', name);
  return <div>{name}</div>;
}

// With memo: Only re-renders if props change
const MemoizedChild = memo(({ name }) => {
  console.log('[MemoizedChild] Rendered with name:', name);
  return <div>{name}</div>;
});

console.log('Without memo: Child renders on EVERY parent render');
console.log('With memo: Child skipped if props unchanged');

console.log('\\n=== useMemo - Value Memoization ===');

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results] = useState(['React', 'Redux', 'Router', 'Native']);
  
  // Expensive filtering - only runs when query changes
  const filteredResults = useMemo(() => {
    console.log('Filtering results for:', query || '(empty)');
    return results.filter(r => r.toLowerCase().includes(query.toLowerCase()));
  }, [query, results]);
  
  console.log('Filtered:', filteredResults);
  
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {filteredResults.map(r => <li key={r}>{r}</li>)}
      </ul>
    </div>
  );
}

SearchResults();

console.log('\\n=== useCallback - Function Memoization ===');

function ParentWithCallback() {
  const [count, setCount] = useState(0);
  
  // Without useCallback: NEW function every render
  const badCallback = () => console.log('clicked');
  
  // With useCallback: SAME function reference
  const goodCallback = useCallback(() => {
    console.log('clicked, count:', count);
  }, [count]);
  
  console.log('Without useCallback: New function every render');
  console.log('With useCallback: Same reference until deps change');
  
  return (
    <div>
      <MemoizedChild onClick={goodCallback} name="Test" />
    </div>
  );
}

ParentWithCallback();

console.log('\\n✓ memo: Skip component re-render');
console.log('✓ useMemo: Cache computed value');
console.log('✓ useCallback: Cache function reference');`
  },
  {
    id: 'react-perf-2',
    category: 'Performance',
    difficulty: 'Hard',
    question: 'Code Splitting and Lazy Loading',
    answer: `Asked by Netflix, Airbnb, and Uber for large-scale apps.

### Why Code Splitting?
**Problem:** Shipping entire app = slow initial load
**Solution:** Split code, load on demand

### React.lazy()
Dynamically import components only when needed.

### Suspense
Shows fallback while lazy component loads.

### Best Practices:
1. **Split by route:** Each page is separate bundle
2. **Preload critical routes**
3. **Error boundaries:** Handle loading failures
4. **Loading states:** Show skeletons, not spinners

### Real Impact:
- **Before:** 2MB initial bundle
- **After:** 200KB initial + lazy load rest
- **Result:** 10x faster initial load`,
    codeExample: `// Code Splitting with React.lazy and Suspense
console.log('=== Code Splitting Demo ===');

// Simulating lazy-loaded components
const HeavyChart = lazy(() => {
  console.log('Loading HeavyChart bundle...');
  return Promise.resolve({ default: () => <div>Chart Component</div> });
});

const HeavyEditor = lazy(() => {
  console.log('Loading HeavyEditor bundle...');
  return Promise.resolve({ default: () => <div>Editor Component</div> });
});

function App() {
  const [showChart, setShowChart] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  
  console.log('App Shell loaded (small initial bundle)');
  
  return (
    <div>
      <h1>My App</h1>
      
      <button onClick={() => setShowChart(true)}>Load Chart</button>
      <button onClick={() => setShowEditor(true)}>Load Editor</button>
      
      {/* Suspense shows fallback while loading */}
      <Suspense fallback={<div>Loading chart...</div>}>
        {showChart && <HeavyChart />}
      </Suspense>
      
      <Suspense fallback={<div>Loading editor...</div>}>
        {showEditor && <HeavyEditor />}
      </Suspense>
    </div>
  );
}

App();

console.log('\\n=== Bundle Size Impact ===');
const bundles = {
  main: { size: '50KB', loaded: true },
  chartBundle: { size: '200KB', loaded: 'on-demand' },
  editorBundle: { size: '150KB', loaded: 'on-demand' }
};

console.log('Initial load:', bundles.main.size);
console.log('Chart bundle:', bundles.chartBundle.size, '(loaded when needed)');
console.log('Editor bundle:', bundles.editorBundle.size, '(loaded when needed)');
console.log('\\nWithout splitting: 400KB initial');
console.log('With splitting: 50KB initial + lazy load rest');

console.log('\\n✓ Faster initial page load');
console.log('✓ Better user experience');`
  },
  {
    id: 'react-perf-3',
    category: 'Performance',
    difficulty: 'Expert',
    question: 'Virtualization for Large Lists',
    answer: `Critical for apps with large datasets (asked by Meta, Google, Airbnb).

### The Problem:
Rendering 10,000 items = 10,000 DOM nodes = SLOW

### The Solution:
Only render visible items (virtualization/windowing).

### How It Works:
1. Calculate which items are visible
2. Only render those items
3. Add padding to maintain scroll height
4. Update on scroll

### Libraries:
- **react-window:** Lightweight, simple
- **react-virtuoso:** Feature-rich, easier API
- **TanStack Virtual:** Modern, framework-agnostic

### Performance Impact:
- **Without:** 10,000 DOM nodes, slow scroll
- **With:** ~20 DOM nodes, smooth 60fps`,
    codeExample: `// Virtualization - Only Render What's Visible
console.log('=== Virtualization Concept ===');

// Simulating a virtual list
function VirtualList({ items, containerHeight, itemHeight }) {
  const [scrollTop, setScrollTop] = useState(0);
  
  // Calculate visible range
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
  
  // Only render visible items
  const visibleItems = items.slice(startIndex, endIndex);
  
  console.log('Container height:', containerHeight + 'px');
  console.log('Item height:', itemHeight + 'px');
  console.log('Total items:', items.length);
  console.log('Visible items:', startIndex, 'to', endIndex - 1);
  console.log('DOM nodes created:', visibleItems.length);
  
  return (
    <div 
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={e => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${startIndex * itemHeight}px)\` }}>
          {visibleItems.map((item, i) => (
            <div key={startIndex + i} style={{ height: itemHeight }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Create 10,000 items
const items = Array.from({ length: 10000 }, (_, i) => 'Item ' + i);

console.log('\\n--- Virtual List Demo ---');
VirtualList({ 
  items, 
  containerHeight: 400, 
  itemHeight: 40 
});

console.log('\\n=== Performance Comparison ===');
console.log('Without virtualization:');
console.log('  • 10,000 DOM nodes');
console.log('  • Slow initial render');
console.log('  • Janky scrolling');

console.log('\\nWith virtualization:');
console.log('  • ~12 DOM nodes');
console.log('  • Fast initial render');
console.log('  • Smooth 60fps scrolling');

console.log('\\n✓ 800x fewer DOM nodes!');`
  },
  {
    id: 'react-perf-4',
    category: 'Performance',
    difficulty: 'Hard',
    question: 'Debouncing and Throttling in React',
    answer: `Essential for search, autocomplete, and scroll handlers.

### Debouncing:
Wait for user to STOP typing before executing.

**Use cases:**
- Search/autocomplete
- Form validation
- API calls on input

### Throttling:
Execute at most once per time period.

**Use cases:**
- Scroll handlers
- Window resize
- Mouse move tracking

### Common Mistake:
Creating new debounced function on every render (use useCallback).`,
    codeExample: `// Debouncing and Throttling in React
console.log('=== Debounce Hook ===');

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    console.log('Debounce timer started for:', value);
    const timer = setTimeout(() => {
      console.log('Debounce executed:', value);
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      console.log('Debounce timer cleared');
      // clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage: Search input
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  // API call only fires after user stops typing
  useEffect(() => {
    if (debouncedQuery) {
      console.log('API call with:', debouncedQuery);
    }
  }, [debouncedQuery]);
  
  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}

SearchInput();

console.log('\\n=== Throttle Hook ===');

function useThrottle(callback, delay) {
  const lastRun = useRef(Date.now());
  
  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      console.log('Throttle: Executing');
      callback(...args);
      lastRun.current = now;
    } else {
      console.log('Throttle: Skipped (too soon)');
    }
  }, [callback, delay]);
}

// Usage: Scroll handler
function ScrollTracker() {
  const handleScroll = useThrottle(() => {
    console.log('Scroll position logged');
  }, 100);
  
  useEffect(() => {
    console.log('Throttled scroll handler attached');
    // window.addEventListener('scroll', handleScroll);
    // return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  return <div>Scroll Tracker</div>;
}

ScrollTracker();

console.log('\\n=== Summary ===');
console.log('Debounce: Wait for silence (search, validation)');
console.log('Throttle: Max once per interval (scroll, resize)');`
  },
  {
    id: 'react-perf-5',
    category: 'Performance',
    difficulty: 'Expert',
    question: 'Bundle Analysis and Tree Shaking - Optimizing Production Builds',
    answer: `Critical for **production performance** at all companies.

### Bundle Analysis Tools:
1. **webpack-bundle-analyzer** - Visual bundle breakdown
2. **source-map-explorer** - Analyze source maps
3. **bundlephobia** - Check package sizes before installing

### Tree Shaking:
Removes unused code from final bundle.

**Requirements:**
- ES6 modules (import/export)
- sideEffects: false in package.json
- Production mode build

### Common Issues:
- Default imports prevent tree shaking
- CommonJS modules not tree-shakeable
- Side effects in modules

### Optimization Strategies:
- Import only what you need
- Use named imports
- Lazy load heavy dependencies
- Code split by route`,
    codeExample: `// Bundle Analysis & Tree Shaking
console.log('=== Bundle Analysis ===');

console.log('Install webpack-bundle-analyzer:');
console.log('npm install --save-dev webpack-bundle-analyzer');

console.log('\\nAdd to webpack.config.js:');
console.log('const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;');
console.log('');
console.log('module.exports = {');
console.log('  plugins: [');
console.log('    new BundleAnalyzerPlugin()');
console.log('  ]');
console.log('};');

console.log('\\nRun build:');
console.log('npm run build');
console.log('');
console.log('Opens browser with interactive treemap showing:');
console.log('  • Bundle size breakdown');
console.log('  • Largest dependencies');
console.log('  • Duplicate code');

console.log('\\n=== Tree Shaking Examples ===');

console.log('\\n❌ Bad: Default import (no tree shaking)');
console.log('import _ from "lodash"; // Imports entire library (70KB!)');
console.log('_.debounce(fn, 300);');

console.log('\\n✓ Good: Named import (tree shaking works)');
console.log('import { debounce } from "lodash-es"; // Only debounce (~2KB)');
console.log('debounce(fn, 300);');

console.log('\\n✓ Better: Individual import');
console.log('import debounce from "lodash-es/debounce"; // Explicit');

console.log('\\n=== Package.json sideEffects ===');

console.log('\\n// package.json');
console.log('{');
console.log('  "sideEffects": false');
console.log('}');
console.log('');
console.log('Tells bundler: "All files are pure, safe to tree shake"');

console.log('\\n// Or specify files with side effects:');
console.log('{');
console.log('  "sideEffects": ["*.css", "polyfills.js"]');
console.log('}');

console.log('\\n=== Analyzing Bundle Size ===');

console.log('\\nBefore optimization:');
console.log('  Total: 850KB');
console.log('  ├─ react-dom: 120KB');
console.log('  ├─ lodash: 70KB ⚠️');
console.log('  ├─ moment: 230KB ⚠️');
console.log('  └─ app code: 430KB');

console.log('\\nAfter optimization:');
console.log('  Total: 420KB (-50%)');
console.log('  ├─ react-dom: 120KB');
console.log('  ├─ lodash-es (debounce only): 2KB ✓');
console.log('  ├─ date-fns: 15KB ✓ (replaced moment)');
console.log('  └─ app code: 283KB (code split)');

console.log('\\n=== Dynamic Imports for Code Splitting ===');

console.log('\\n// Heavy library - lazy load');
console.log('const loadChart = async () => {');
console.log('  const { Chart } = await import("chart.js");');
console.log('  return Chart;');
console.log('};');

console.log('\\n✓ Bundle analysis: find and fix bloat');
console.log('✓ Tree shaking: use named imports');
console.log('✓ Code split: lazy load heavy deps');`
  },
  {
    id: 'react-perf-6',
    category: 'Performance',
    difficulty: 'Expert',
    question: 'React Profiler API - Programmatic Performance Measurement',
    answer: `Advanced performance tracking for **production monitoring**.

### Profiler Component:
Measures rendering performance programmatically.

### Syntax:
\`\`\`jsx
<Profiler id="Navigation" onRender={callback}>
  <Navigation />
</Profiler>
\`\`\`

### Callback Parameters:
- **id**: Profiler identifier
- **phase**: "mount" or "update"
- **actualDuration**: Time spent rendering
- **baseDuration**: Estimated time without memoization
- **startTime**: When render started
- **commitTime**: When React committed
- **interactions**: Set of interactions (deprecated)

### Use Cases:
- Identify slow components
- Track performance regressions
- A/B test optimizations
- Production monitoring

### Best Practices:
- Use in production (minimal overhead)
- Log to analytics service
- Compare actualDuration vs baseDuration`,
    codeExample: `// React Profiler API
console.log('=== Profiler Component ===');

console.log('import { Profiler } from "react";');
console.log('');
console.log('function onRenderCallback(');
console.log('  id,');
console.log('  phase,');
console.log('  actualDuration,');
console.log('  baseDuration,');
console.log('  startTime,');
console.log('  commitTime');
console.log(') {');
console.log('  console.log({');
console.log('    id,');
console.log('    phase,');
console.log('    actualDuration,');
console.log('    baseDuration');
console.log('  });');
console.log('}');

console.log('\\n<Profiler id="UserList" onRender={onRenderCallback}>');
console.log('  <UserList />');
console.log('</Profiler>');

console.log('\\n=== Example Output ===');

const profileData = {
  id: 'UserList',
  phase: 'update',
  actualDuration: 12.5,
  baseDuration: 45.2,
  startTime: 1000,
  commitTime: 1012.5
};

console.log('\\nCallback invoked with:');
Object.entries(profileData).forEach(([key, value]) => {
  console.log('  ' + key + ':', value);
});

console.log('\\nAnalysis:');
console.log('  actualDuration: 12.5ms (with memoization)');
console.log('  baseDuration: 45.2ms (without memoization)');
console.log('  Optimization saved: 32.7ms (72% faster!)');

console.log('\\n=== Production Monitoring ===');

console.log('\\nfunction onRenderCallback(id, phase, actualDuration) {');
console.log('  // Log to analytics');
console.log('  if (actualDuration > 16) { // Slower than 60fps');
console.log('    analytics.track("slow_render", {');
console.log('      component: id,');
console.log('      duration: actualDuration,');
console.log('      phase');
console.log('    });');
console.log('  }');
console.log('}');

console.log('\\n=== Multiple Profilers ===');

console.log('\\n<Profiler id="App" onRender={onRender}>');
console.log('  <Header />');
console.log('  <Profiler id="Main" onRender={onRender}>');
console.log('    <Dashboard />');
console.log('  </Profiler>');
console.log('  <Footer />');
console.log('</Profiler>');

console.log('\\nNested profilers measure:');
console.log('  App: Total app render time');
console.log('  Main: Just Dashboard render time');

console.log('\\n=== Performance Regression Detection ===');

console.log('\\nconst performanceBaseline = {');
console.log('  UserList: 15, // ms');
console.log('  Dashboard: 25,');
console.log('  Chart: 40');
console.log('};');
console.log('');
console.log('function onRenderCallback(id, phase, actualDuration) {');
console.log('  const baseline = performanceBaseline[id];');
console.log('  if (actualDuration > baseline * 1.5) {');
console.log('    console.warn(\`Performance regression in \${id}\`);');
console.log('    console.warn(\`Expected: \${baseline}ms, Got: \${actualDuration}ms\`);');
console.log('  }');
console.log('}');

console.log('\\n✓ Profiler: measure real performance');
console.log('✓ Use in production for monitoring');
console.log('✓ Track regressions automatically');`
  },
  {
    id: 'react-perf-7',
    category: 'Performance',
    difficulty: 'Expert',
    question: 'Web Vitals Optimization - Core Web Vitals for React',
    answer: `SEO and UX critical metrics asked at **Google, Vercel**.

### Core Web Vitals:
1. **LCP (Largest Contentful Paint)** - Loading performance
   - Target: < 2.5s
   - Measures: Largest visible element

2. **FID (First Input Delay)** - Interactivity
   - Target: < 100ms
   - Measures: Time to first interaction

3. **CLS (Cumulative Layout Shift)** - Visual stability
   - Target: < 0.1
   - Measures: Unexpected layout shifts

### React Optimizations:

**LCP:**
- Code split routes
- Lazy load images
- Preload critical resources
- SSR/SSG for initial content

**FID:**
- Minimize JavaScript
- Use useTransition for heavy updates
- Defer non-critical scripts

**CLS:**
- Reserve space for images (width/height)
- Avoid inserting content above fold
- Use CSS containment`,
    codeExample: `// Web Vitals Optimization
console.log('=== Measuring Web Vitals ===');

console.log('Install web-vitals:');
console.log('npm install web-vitals');

console.log('\\n// reportWebVitals.js');
console.log('import { getCLS, getFID, getLCP } from "web-vitals";');
console.log('');
console.log('function sendToAnalytics(metric) {');
console.log('  console.log(metric.name + ":", metric.value);');
console.log('  // Send to analytics service');
console.log('  // analytics.track(metric.name, metric.value);');
console.log('}');
console.log('');
console.log('getCLS(sendToAnalytics);');
console.log('getFID(sendToAnalytics);');
console.log('getLCP(sendToAnalytics);');

console.log('\\n=== LCP Optimization ===');

console.log('\\n❌ Bad: Large bundle blocks LCP');
console.log('// All code in one bundle');
console.log('import HeavyComponent from "./Heavy";');
console.log('');
console.log('function App() {');
console.log('  return <HeavyComponent />; // Blocks LCP');
console.log('}');

console.log('\\n✓ Good: Code split for faster LCP');
console.log('const HeavyComponent = lazy(() => import("./Heavy"));');
console.log('');
console.log('function App() {');
console.log('  return (');
console.log('    <Suspense fallback={<Skeleton />}>');
console.log('      <HeavyComponent />');
console.log('    </Suspense>');
console.log('  );');
console.log('}');

console.log('\\n✓ Preload critical resources:');
console.log('<link rel="preload" as="image" href="hero.jpg" />');

console.log('\\n=== FID Optimization ===');

console.log('\\n❌ Bad: Heavy computation blocks input');
console.log('function SearchResults({ query }) {');
console.log('  const [results, setResults] = useState([]);');
console.log('  ');
console.log('  const handleChange = (e) => {');
console.log('    const filtered = hugeList.filter(...); // Blocks!');
console.log('    setResults(filtered);');
console.log('  };');
console.log('}');

console.log('\\n✓ Good: useTransition keeps input responsive');
console.log('function SearchResults({ query }) {');
console.log('  const [results, setResults] = useState([]);');
console.log('  const [isPending, startTransition] = useTransition();');
console.log('  ');
console.log('  const handleChange = (e) => {');
console.log('    startTransition(() => {');
console.log('      const filtered = hugeList.filter(...);');
console.log('      setResults(filtered);');
console.log('    });');
console.log('  };');
console.log('}');

console.log('\\n=== CLS Optimization ===');

console.log('\\n❌ Bad: No image dimensions (causes layout shift)');
console.log('<img src="hero.jpg" />');

console.log('\\n✓ Good: Reserve space with dimensions');
console.log('<img src="hero.jpg" width={800} height={600} />');

console.log('\\n✓ Better: Aspect ratio with CSS');
console.log('<div style={{ aspectRatio: "16/9" }}>');
console.log('  <img src="hero.jpg" style={{ width: "100%" }} />');
console.log('</div>');

console.log('\\n=== Real Metrics Example ===');

const metrics = {
  'Before Optimization': {
    LCP: '4.2s ❌',
    FID: '180ms ❌',
    CLS: '0.25 ❌'
  },
  'After Optimization': {
    LCP: '1.8s ✓',
    FID: '45ms ✓',
    CLS: '0.05 ✓'
  }
};

Object.entries(metrics).forEach(([stage, values]) => {
  console.log('\\n' + stage + ':');
  Object.entries(values).forEach(([metric, value]) => {
    console.log('  ' + metric + ':', value);
  });
});

console.log('\\n✓ Measure with web-vitals library');
console.log('✓ Optimize LCP: code split, preload');
console.log('✓ Optimize FID: useTransition, defer JS');
console.log('✓ Optimize CLS: reserve space, no shifts');`
  }
];


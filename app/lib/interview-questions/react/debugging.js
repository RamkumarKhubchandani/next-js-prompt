export const debuggingQuestions = [
    {
        id: 'react-debug-1',
        category: 'Debugging',
        difficulty: 'Hard',
        question: 'React DevTools - Profiler and Component Inspector',
        answer: `Essential debugging skill asked at **all levels**.

### React DevTools Features:
1. **Components Tab** - Inspect component tree, props, state
2. **Profiler Tab** - Record and analyze performance
3. **Highlight Updates** - See what re-renders
4. **Hooks Inspector** - View all hook values

### Profiler Metrics:
- **Render duration** - How long component took
- **Commit phase** - DOM updates time
- **Interactions** - Track user actions
- **Ranked chart** - Slowest components first

### Common Issues Found:
- Unnecessary re-renders
- Expensive renders
- Missing memoization
- Props changing unexpectedly`,
        codeExample: `// React DevTools Usage
console.log('=== React DevTools - Components Tab ===');

console.log('Inspecting component:');
console.log('  Component: UserProfile');
console.log('  Props: { userId: 123, name: "John" }');
console.log('  State: { loading: false, data: {...} }');
console.log('  Hooks:');
console.log('    useState[0]: false');
console.log('    useState[1]: {...}');
console.log('    useEffect[0]: [userId]');

console.log('\\n=== Profiler Tab ===');

console.log('Recording session:');
console.log('1. Click "Record" button');
console.log('2. Interact with app');
console.log('3. Stop recording');
console.log('');
console.log('Results:');

const profileResults = {
  'UserList': { renders: 5, duration: '12.3ms' },
  'UserCard': { renders: 20, duration: '45.1ms' },
  'Avatar': { renders: 20, duration: '8.2ms' },
  'Button': { renders: 15, duration: '2.1ms' }
};

Object.entries(profileResults).forEach(([component, metrics]) => {
  console.log(component + ':');
  console.log('  Renders:', metrics.renders);
  console.log('  Total time:', metrics.duration);
});

console.log('\\n⚠️ UserCard rendered 20 times - investigate!');

console.log('\\n=== Highlight Updates ===');

console.log('Enable "Highlight updates when components render"');
console.log('');
console.log('Visual feedback:');
console.log('  Green flash: Normal render');
console.log('  Yellow flash: Slow render');
console.log('  Red flash: Very slow render');
console.log('');
console.log('Use to identify:');
console.log('  • Components rendering too often');
console.log('  • Cascading re-renders');
console.log('  • Performance bottlenecks');

console.log('\\n=== Finding Re-render Causes ===');

console.log('Component re-rendered. Check:');
console.log('1. Props changed?');
console.log('   → Compare prev/next in DevTools');
console.log('2. State changed?');
console.log('   → Check useState values');
console.log('3. Parent re-rendered?');
console.log('   → Check parent component');
console.log('4. Context changed?');
console.log('   → Check context provider value');

console.log('\\n=== Profiler API (Programmatic) ===');

console.log('import { Profiler } from "react";');
console.log('');
console.log('<Profiler id="UserList" onRender={onRenderCallback}>');
console.log('  <UserList />');
console.log('</Profiler>');
console.log('');
console.log('function onRenderCallback(');
console.log('  id, phase, actualDuration, baseDuration');
console.log(') {');
console.log('  console.log({');
console.log('    id,');
console.log('    phase, // "mount" or "update"');
console.log('    actualDuration, // Time spent rendering');
console.log('    baseDuration // Estimated time without memoization');
console.log('  });');
console.log('}');

console.log('\\n✓ Use DevTools to find performance issues');
console.log('✓ Profiler shows exact render times');
console.log('✓ Highlight updates reveals re-render patterns');`
    },
    {
        id: 'react-debug-2',
        category: 'Debugging',
        difficulty: 'Hard',
        question: 'Common React Errors and How to Fix Them',
        answer: `Practical debugging asked in **all interviews**.

### Top React Errors:

1. **"Cannot read property of undefined"**
   - Cause: Accessing nested property before data loads
   - Fix: Optional chaining, default values

2. **"Maximum update depth exceeded"**
   - Cause: setState in render or useEffect without deps
   - Fix: Move setState to event handler or add deps

3. **"Objects are not valid as React child"**
   - Cause: Rendering object instead of primitive
   - Fix: Render object.property or JSON.stringify

4. **"Rendered more hooks than previous render"**
   - Cause: Conditional hooks
   - Fix: Always call hooks in same order

5. **"Can't perform React state update on unmounted component"**
   - Cause: Async operation after unmount
   - Fix: Cleanup with AbortController or flag`,
        codeExample: `// Common React Errors & Fixes
console.log('=== Error 1: Cannot Read Property ===');

console.log('❌ Problem:');
console.log('function UserProfile({ user }) {');
console.log('  return <div>{user.name}</div>; // Error if user is null');
console.log('}');

console.log('\\n✓ Fix 1: Optional Chaining');
console.log('return <div>{user?.name}</div>;');

console.log('\\n✓ Fix 2: Default Value');
console.log('return <div>{user?.name || "Guest"}</div>;');

console.log('\\n✓ Fix 3: Early Return');
console.log('if (!user) return <Loading />;');
console.log('return <div>{user.name}</div>;');

console.log('\\n=== Error 2: Maximum Update Depth ===');

console.log('\\n❌ Problem: setState in render');
console.log('function BadComponent() {');
console.log('  const [count, setCount] = useState(0);');
console.log('  setCount(count + 1); // Infinite loop!');
console.log('  return <div>{count}</div>;');
console.log('}');

console.log('\\n✓ Fix: Move to event handler');
console.log('function GoodComponent() {');
console.log('  const [count, setCount] = useState(0);');
console.log('  return (');
console.log('    <button onClick={() => setCount(count + 1)}>');
console.log('      {count}');
console.log('    </button>');
console.log('  );');
console.log('}');

console.log('\\n=== Error 3: Objects Not Valid as Child ===');

console.log('\\n❌ Problem:');
console.log('const user = { name: "John", age: 30 };');
console.log('return <div>{user}</div>; // Error!');

console.log('\\n✓ Fix: Render properties');
console.log('return <div>{user.name}</div>;');

console.log('\\n✓ Fix: JSON.stringify for debugging');
console.log('return <div>{JSON.stringify(user)}</div>;');

console.log('\\n=== Error 4: Hooks Order Changed ===');

console.log('\\n❌ Problem: Conditional hook');
console.log('function BadComponent({ showExtra }) {');
console.log('  const [name, setName] = useState("");');
console.log('  if (showExtra) {');
console.log('    const [extra, setExtra] = useState(""); // Wrong!');
console.log('  }');
console.log('}');

console.log('\\n✓ Fix: Always call hooks');
console.log('function GoodComponent({ showExtra }) {');
console.log('  const [name, setName] = useState("");');
console.log('  const [extra, setExtra] = useState("");');
console.log('  // Use showExtra to conditionally RENDER, not call hooks');
console.log('}');

console.log('\\n=== Error 5: Update on Unmounted Component ===');

console.log('\\n❌ Problem:');
console.log('useEffect(() => {');
console.log('  fetchData().then(data => setState(data));');
console.log('  // Component unmounts before fetch completes');
console.log('}, []);');

console.log('\\n✓ Fix: Cleanup with flag');
console.log('useEffect(() => {');
console.log('  let isMounted = true;');
console.log('  fetchData().then(data => {');
console.log('    if (isMounted) setState(data);');
console.log('  });');
console.log('  return () => { isMounted = false; };');
console.log('}, []);');

console.log('\\n✓ Fix: AbortController');
console.log('useEffect(() => {');
console.log('  const controller = new AbortController();');
console.log('  fetch(url, { signal: controller.signal })');
console.log('    .then(res => res.json())');
console.log('    .then(setState);');
console.log('  return () => controller.abort();');
console.log('}, []);');

console.log('\\n✓ Know common errors and fixes');`
    },
    {
        id: 'react-debug-3',
        category: 'Debugging',
        difficulty: 'Expert',
        question: 'Performance Debugging - Finding Bottlenecks',
        answer: `Critical for **production applications**.

### Performance Investigation Steps:
1. **Identify slow pages** - User reports, analytics
2. **Profile with React DevTools** - Find slow components
3. **Check re-renders** - Highlight updates
4. **Analyze bundle** - webpack-bundle-analyzer
5. **Measure real metrics** - Web Vitals

### Common Bottlenecks:
- Large lists without virtualization
- Heavy computations in render
- Missing memoization
- Large bundle size
- Unoptimized images

### Tools:
- React DevTools Profiler
- Chrome Performance tab
- Lighthouse
- webpack-bundle-analyzer
- why-did-you-render`,
        codeExample: `// Performance Debugging Workflow
console.log('=== Step 1: Identify the Problem ===');

console.log('User reports: "Product page is slow"');
console.log('');
console.log('Measure with Web Vitals:');
const metrics = {
  LCP: '4.2s (should be < 2.5s)',
  FID: '180ms (should be < 100ms)',
  CLS: '0.05 (good)'
};

Object.entries(metrics).forEach(([metric, value]) => {
  console.log('  ' + metric + ':', value);
});

console.log('\\n⚠️ LCP and FID are slow!');

console.log('\\n=== Step 2: Profile with React DevTools ===');

console.log('Recording Profiler...');
console.log('');
console.log('Flamegraph results:');
console.log('  ProductPage: 850ms');
console.log('    ├─ ProductImages: 420ms ⚠️');
console.log('    ├─ ProductDetails: 45ms');
console.log('    ├─ ReviewsList: 320ms ⚠️');
console.log('    └─ RelatedProducts: 65ms');

console.log('\\n🔍 ProductImages and ReviewsList are slow');

console.log('\\n=== Step 3: Investigate ProductImages ===');

console.log('\\nComponent code:');
console.log('function ProductImages({ images }) {');
console.log('  // Problem: Processing all images on every render');
console.log('  const processed = images.map(img => ({');
console.log('    ...img,');
console.log('    thumbnail: generateThumbnail(img) // Expensive!');
console.log('  }));');
console.log('  return processed.map(img => <img src={img.thumbnail} />);');
console.log('}');

console.log('\\n✓ Fix: useMemo');
console.log('const processed = useMemo(() =>');
console.log('  images.map(img => ({');
console.log('    ...img,');
console.log('    thumbnail: generateThumbnail(img)');
console.log('  })),');
console.log('  [images]');
console.log(');');

console.log('\\nResult: 420ms → 15ms ✓');

console.log('\\n=== Step 4: Investigate ReviewsList ===');

console.log('\\nComponent code:');
console.log('function ReviewsList({ reviews }) {');
console.log('  // Problem: Rendering 500 reviews');
console.log('  return reviews.map(review => <Review key={review.id} />);');
console.log('}');

console.log('\\n✓ Fix: Virtualization');
console.log('import { FixedSizeList } from "react-window";');
console.log('');
console.log('<FixedSizeList');
console.log('  height={600}');
console.log('  itemCount={reviews.length}');
console.log('  itemSize={100}');
console.log('>');
console.log('  {({ index }) => <Review review={reviews[index]} />}');
console.log('</FixedSizeList>');

console.log('\\nResult: 320ms → 25ms ✓');

console.log('\\n=== Step 5: Bundle Analysis ===');

console.log('\\nRunning: npx webpack-bundle-analyzer');
console.log('');
console.log('Bundle breakdown:');
console.log('  Total: 850KB');
console.log('  ├─ react-dom: 120KB');
console.log('  ├─ lodash: 70KB ⚠️ (using entire library)');
console.log('  ├─ moment: 230KB ⚠️ (use date-fns instead)');
console.log('  └─ app code: 430KB');

console.log('\\n✓ Fix: Replace moment with date-fns');
console.log('✓ Fix: Import lodash functions individually');
console.log('');
console.log('New bundle: 850KB → 520KB');

console.log('\\n=== Final Results ===');
console.log('Before:');
console.log('  LCP: 4.2s');
console.log('  FID: 180ms');
console.log('');
console.log('After:');
console.log('  LCP: 1.8s ✓');
console.log('  FID: 45ms ✓');

console.log('\\n✓ Profile → Identify → Fix → Measure');`
    },
    {
        id: 'react-debug-4',
        category: 'Debugging',
        difficulty: 'Hard',
        question: 'Debugging React Hooks - useEffect Dependencies',
        answer: `Common source of bugs in **modern React**.

### Dependency Array Rules:
1. **Include all values used** from component scope
2. **Primitives** - Compare by value
3. **Objects/Arrays** - Compare by reference
4. **Functions** - Wrap in useCallback

### Common Mistakes:
- Missing dependencies (stale closures)
- Object/array in deps (infinite loops)
- Functions in deps without useCallback

### ESLint Rule:
\`eslint-plugin-react-hooks\` catches most issues

### Debugging Tools:
- React DevTools shows deps
- Console.log in useEffect
- why-did-you-render library`,
        codeExample: `// Debugging useEffect Dependencies
console.log('=== Problem: Missing Dependency ===');

console.log('❌ Bug: Stale closure');
console.log('function Counter() {');
console.log('  const [count, setCount] = useState(0);');
console.log('  ');
console.log('  useEffect(() => {');
console.log('    const interval = setInterval(() => {');
console.log('      console.log(count); // Always logs 0!');
console.log('    }, 1000);');
console.log('    return () => clearInterval(interval);');
console.log('  }, []); // Missing count dependency');
console.log('}');

console.log('\\n✓ Fix 1: Add dependency');
console.log('useEffect(() => {');
console.log('  const interval = setInterval(() => {');
console.log('    console.log(count); // Now logs current value');
console.log('  }, 1000);');
console.log('  return () => clearInterval(interval);');
console.log('}, [count]); // Added count');

console.log('\\n✓ Fix 2: Functional update');
console.log('useEffect(() => {');
console.log('  const interval = setInterval(() => {');
console.log('    setCount(c => c + 1); // No dependency needed');
console.log('  }, 1000);');
console.log('  return () => clearInterval(interval);');
console.log('}, []); // Empty deps OK now');

console.log('\\n=== Problem: Object in Dependencies ===');

console.log('\\n❌ Bug: Infinite loop');
console.log('function UserProfile({ userId }) {');
console.log('  const [user, setUser] = useState(null);');
console.log('  const options = { userId }; // New object every render');
console.log('  ');
console.log('  useEffect(() => {');
console.log('    fetchUser(options).then(setUser);');
console.log('  }, [options]); // Infinite loop!');
console.log('}');

console.log('\\n✓ Fix 1: Use primitive');
console.log('useEffect(() => {');
console.log('  fetchUser({ userId }).then(setUser);');
console.log('}, [userId]); // Use userId directly');

console.log('\\n✓ Fix 2: useMemo');
console.log('const options = useMemo(() => ({ userId }), [userId]);');
console.log('useEffect(() => {');
console.log('  fetchUser(options).then(setUser);');
console.log('}, [options]);');

console.log('\\n=== Problem: Function in Dependencies ===');

console.log('\\n❌ Bug: Re-runs unnecessarily');
console.log('function SearchResults({ query }) {');
console.log('  const handleSearch = () => { // New function every render');
console.log('    search(query);');
console.log('  };');
console.log('  ');
console.log('  useEffect(() => {');
console.log('    handleSearch();');
console.log('  }, [handleSearch]); // Re-runs every render');
console.log('}');

console.log('\\n✓ Fix 1: useCallback');
console.log('const handleSearch = useCallback(() => {');
console.log('  search(query);');
console.log('}, [query]);');
console.log('');
console.log('useEffect(() => {');
console.log('  handleSearch();');
console.log('}, [handleSearch]);');

console.log('\\n✓ Fix 2: Inline');
console.log('useEffect(() => {');
console.log('  search(query);');
console.log('}, [query]);');

console.log('\\n=== Debugging Tips ===');

console.log('\\n1. Log dependencies:');
console.log('useEffect(() => {');
console.log('  console.log("Effect ran", { count, user });');
console.log('}, [count, user]);');

console.log('\\n2. Use ESLint:');
console.log('// .eslintrc.js');
console.log('rules: {');
console.log('  "react-hooks/exhaustive-deps": "error"');
console.log('}');

console.log('\\n3. React DevTools:');
console.log('Shows all hook values and dependencies');

console.log('\\n✓ Include all dependencies');
console.log('✓ Memoize objects/functions in deps');
console.log('✓ Use ESLint rule');`
    }
];

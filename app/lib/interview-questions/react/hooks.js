export const hooksQuestions = [
  {
    id: 'react-h1',
    category: 'Hooks',
    difficulty: 'Easy',
    question: 'What is useState and how does it work?',
    answer: `useState is a Hook that lets you add **state** to functional components.

### Key Points:
1. **Returns Array:** [currentState, updaterFunction]
2. **Lazy Initialization:** useState(() => expensiveComputation())
3. **Functional Updates:** setState(prev => prev + 1) for correct updates
4. **Batching:** Multiple setState calls are batched in event handlers

### Common Mistakes:
- Wrong: setState(state + 1) in rapid succession (uses stale state)
- Correct: setState(prev => prev + 1) (always uses latest state)`,
    codeExample: `// useState Hook - Complete Guide
console.log('=== useState Hook ===');

function Counter() {
  // Basic useState
  const [count, setCount] = useState(0);
  console.log('Initial count:', count);
  
  // Simulating setState calls
  console.log('\\n--- Updating State ---');
  
  // Direct update
  setCount(5);
  
  // Functional update (safer for async)
  setCount(prev => prev + 1);
  
  return <div>Count: {count}</div>;
}

Counter();

// Lazy initialization - expensive computation only runs once
console.log('\\n=== Lazy Initialization ===');

function ExpensiveComponent() {
  const [data, setData] = useState(() => {
    console.log('Expensive computation running...');
    return Array(5).fill(0).map((_, i) => i * 10);
  });
  
  console.log('Data initialized:', data);
  return <div>Data loaded</div>;
}

ExpensiveComponent();

// Common mistake demonstration
console.log('\\n=== Common Mistake: Stale State ===');

function BrokenCounter() {
  const [count, setCount] = useState(0);
  
  // ❌ Wrong: Both use same stale value
  console.log('❌ Direct updates (stale state problem):');
  console.log('setCount(count + 1) // count is', count);
  console.log('setCount(count + 1) // count is still', count);
  
  // ✅ Correct: Uses latest value
  console.log('\\n✅ Functional updates (always correct):');
  console.log('setCount(prev => prev + 1) // prev is current');
  console.log('setCount(prev => prev + 1) // prev is updated');
  
  return <div>{count}</div>;
}

BrokenCounter();

console.log('\\n✓ Always use functional updates for reliability');`
  },
  {
    id: 'react-h2',
    category: 'Hooks',
    difficulty: 'Medium',
    question: 'Explain useEffect and its dependency array',
    answer: `useEffect lets you perform **side effects** in functional components.

### Dependency Array Patterns:
1. **No Array:** Runs after every render
2. **Empty Array []:** Runs once on mount
3. **With Dependencies:** Runs when dependencies change

### Common Use Cases:
- Fetching data
- Subscriptions (WebSocket, event listeners)
- Timers (setTimeout, setInterval)
- DOM manipulation

### Cleanup:
Return a function to clean up subscriptions, timers, etc.`,
    codeExample: `// useEffect Hook - Complete Guide
console.log('=== useEffect Patterns ===');

function DataFetcher() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  
  // Pattern 1: Mount only (empty deps)
  useEffect(() => {
    console.log('1. Component MOUNTED');
    
    // Cleanup on unmount
    return () => console.log('   Component UNMOUNTED');
  }, []);
  
  // Pattern 2: Run when dependency changes
  useEffect(() => {
    console.log('2. Count changed to:', count);
  }, [count]);
  
  // Pattern 3: Timer with cleanup
  useEffect(() => {
    console.log('3. Timer started');
    
    return () => {
      console.log('   Timer cleaned up');
    };
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

console.log('--- Simulating component lifecycle ---');
DataFetcher();

console.log('\\n=== Dependency Array Rules ===');
console.log('useEffect(() => {}, [])     → Runs ONCE on mount');
console.log('useEffect(() => {}, [x])    → Runs when x changes');
console.log('useEffect(() => {})         → Runs EVERY render (avoid!)');

console.log('\\n=== Common Use Cases ===');

function FetchExample() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    console.log('Fetching user data...');
    // Simulated API call
    setTimeout(() => {
      console.log('User data received!');
    }, 100);
    
    // Cleanup: Cancel request if component unmounts
    return () => console.log('Cleanup: Cancelled pending request');
  }, []);
  
  return <div>User Profile</div>;
}

FetchExample();

console.log('\\n✓ Always include cleanup for subscriptions/timers');`
  },
  {
    id: 'react-h3',
    category: 'Hooks',
    difficulty: 'Hard',
    question: 'useMemo vs useCallback - when to use each?',
    answer: `Both are **optimization hooks** to prevent unnecessary re-computations.

### useMemo:
- **Memoizes VALUES** (result of computation)
- Returns cached value until dependencies change
- Use for expensive calculations

### useCallback:
- **Memoizes FUNCTIONS** (function reference)
- Returns same function reference until dependencies change
- Use to prevent child re-renders when passing callbacks

### When to Use:
**useMemo:** Expensive calculations, preventing object recreation
**useCallback:** Passing callbacks to React.memo components

### Rule of Thumb:
Don't optimize prematurely! Only use when you measure performance issues.`,
    codeExample: `// useMemo vs useCallback
console.log('=== useMemo - Memoize VALUES ===');

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // useMemo: Only recompute when 'count' changes
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...');
    let result = 0;
    for (let i = 0; i < 1000; i++) {
      result += count;
    }
    return result;
  }, [count]);
  
  console.log('Expensive value:', expensiveValue);
  
  return <div>{expensiveValue}</div>;
}

ExpensiveComponent();

console.log('\\n=== useCallback - Memoize FUNCTIONS ===');

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // useCallback: Same function reference until 'count' changes
  const handleClick = useCallback(() => {
    console.log('Button clicked, count:', count);
  }, [count]);
  
  console.log('Callback memoized');
  
  // Child with React.memo won't re-render if handleClick is stable
  const MemoizedChild = memo(({ onClick }) => {
    console.log('Child rendered');
    return <button onClick={onClick}>Click</button>;
  });
  
  return (
    <div>
      <MemoizedChild onClick={handleClick} />
    </div>
  );
}

ParentComponent();

console.log('\\n=== When to Use Each ===');
console.log('useMemo:');
console.log('  ✓ Expensive calculations');
console.log('  ✓ Creating objects passed as props');
console.log('  ✓ Filtering large arrays');

console.log('\\nuseCallback:');
console.log('  ✓ Passing callbacks to React.memo children');
console.log('  ✓ Callbacks used in useEffect dependencies');

console.log('\\n⚠️ Don\\'t overuse - measure first!');`
  },
  {
    id: 'react-h4',
    category: 'Hooks',
    difficulty: 'Medium',
    question: 'What is useRef and its use cases?',
    answer: `useRef creates a **mutable ref object** that persists across renders.

### Key Characteristics:
1. **Doesn't Trigger Re-render:** Changing .current doesn't cause re-render
2. **Persists:** Value survives across renders
3. **Mutable:** Can directly mutate .current

### Use Cases:
1. **DOM Access:** Get reference to DOM elements
2. **Store Mutable Values:** Previous state, timers, any value that shouldn't trigger re-render
3. **Instance Variables:** Like class instance variables

### useRef vs useState:
- **useRef:** Mutable, no re-render
- **useState:** Immutable, triggers re-render`,
    codeExample: `// useRef Hook - Complete Guide
console.log('=== useRef for DOM Access ===');

function TextInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    console.log('Focusing input via ref');
    // inputRef.current.focus()
  };
  
  console.log('Input ref created:', inputRef);
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}

TextInput();

console.log('\\n=== useRef for Mutable Values ===');

function RenderCounter() {
  const renderCount = useRef(0);
  const previousValue = useRef(null);
  const [value, setValue] = useState('Hello');
  
  // This runs every render but doesn't cause re-render
  renderCount.current += 1;
  
  // Store previous value
  useEffect(() => {
    previousValue.current = value;
  }, [value]);
  
  console.log('Render count:', renderCount.current);
  console.log('Current value:', value);
  console.log('Previous value:', previousValue.current);
  
  return <div>{value}</div>;
}

RenderCounter();

console.log('\\n=== useRef for Timers ===');

function Timer() {
  const timerRef = useRef(null);
  
  const startTimer = () => {
    console.log('Starting timer');
    timerRef.current = 12345; // Store timer ID
  };
  
  const stopTimer = () => {
    console.log('Stopping timer:', timerRef.current);
    // clearInterval(timerRef.current);
    timerRef.current = null;
  };
  
  startTimer();
  stopTimer();
  
  return <div>Timer Component</div>;
}

Timer();

console.log('\\n✓ useRef: mutable, persists, no re-renders');`
  },
  {
    id: 'react-h5',
    category: 'Hooks',
    difficulty: 'Hard',
    question: 'How to create a custom hook?',
    answer: `Custom hooks are **reusable functions** that use React hooks internally.

### Rules:
1. **Name:** Must start with use (e.g., useLocalStorage)
2. **Composition:** Can use other hooks inside
3. **Reusability:** Extract common logic across components

### Benefits:
- **DRY:** Don't repeat yourself
- **Separation of Concerns:** Logic separate from UI
- **Testability:** Test logic independently

### Common Patterns:
- Data fetching (useFetch)
- Form handling (useForm)
- Local storage (useLocalStorage)
- Window size (useWindowSize)`,
    codeExample: `// Custom Hooks - Reusable Logic
console.log('=== Custom Hook: useToggle ===');

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return { value, toggle, setTrue, setFalse };
}

// Usage
function Modal() {
  const { value: isOpen, toggle, setFalse } = useToggle(false);
  
  console.log('Modal open:', isOpen);
  toggle();
  console.log('After toggle:', isOpen);
  
  return (
    <div>
      {isOpen && <div className="modal">Modal Content</div>}
      <button onClick={toggle}>Toggle Modal</button>
    </div>
  );
}

Modal();

console.log('\\n=== Custom Hook: useCounter ===');

function useCounter(initialValue = 0, { min = -Infinity, max = Infinity } = {}) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => Math.min(prev + 1, max));
  const decrement = () => setCount(prev => Math.max(prev - 1, min));
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Usage
function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(5, { min: 0, max: 10 });
  
  console.log('Count:', count);
  increment();
  console.log('After increment');
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

CounterComponent();

console.log('\\n=== Custom Hook: useFetch ===');

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    console.log('Fetching:', url);
    // Simulated fetch
    setTimeout(() => {
      console.log('Data received!');
    }, 100);
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserProfile() {
  const { data, loading, error } = useFetch('/api/user/1');
  
  console.log('Loading:', loading);
  
  return <div>{loading ? 'Loading...' : 'User data'}</div>;
}

UserProfile();

console.log('\\n✓ Custom hooks = reusable, testable logic');`
  },
  {
    id: 'react-h6',
    category: 'Hooks',
    difficulty: 'Expert',
    question: 'useTransition - Non-Blocking State Updates',
    answer: `React 18 feature asked at **Meta, Vercel, and modern companies**.

### What is useTransition?
Marks state updates as **non-urgent** (transitions) to keep UI responsive.

### Syntax:
\`\`\`jsx
const [isPending, startTransition] = useTransition();
\`\`\`

### Key Concepts:
- **isPending**: Boolean indicating if transition is in progress
- **startTransition**: Function to wrap non-urgent updates
- **Concurrent Rendering**: React can interrupt transitions
- **User Input Priority**: Keeps typing, clicking responsive

### Use Cases:
1. **Search filtering** - Don't block typing
2. **Tab switching** - Smooth transitions
3. **Large list updates** - Keep UI responsive
4. **Route navigation** - Non-blocking page changes

### vs setTimeout:
- useTransition: React-aware, can be interrupted
- setTimeout: Arbitrary delay, not interruptible`,
    codeExample: `// useTransition - Non-Blocking Updates
console.log('=== Problem: Blocking Updates ===');

console.log('❌ Without useTransition:');
console.log('function SearchResults() {');
console.log('  const [query, setQuery] = useState("");');
console.log('  const [results, setResults] = useState([]);');
console.log('  ');
console.log('  const handleChange = (e) => {');
console.log('    setQuery(e.target.value);');
console.log('    // Expensive filtering - BLOCKS typing!');
console.log('    const filtered = hugeList.filter(item =>');
console.log('      item.includes(e.target.value)');
console.log('    );');
console.log('    setResults(filtered);');
console.log('  };');
console.log('}');
console.log('');
console.log('Result: Typing feels laggy because filtering blocks UI');

console.log('\\n=== Solution: useTransition ===');

console.log('\\n✓ With useTransition:');
console.log('function SearchResults() {');
console.log('  const [query, setQuery] = useState("");');
console.log('  const [results, setResults] = useState([]);');
console.log('  const [isPending, startTransition] = useTransition();');
console.log('  ');
console.log('  const handleChange = (e) => {');
console.log('    // Urgent: Update input immediately');
console.log('    setQuery(e.target.value);');
console.log('    ');
console.log('    // Non-urgent: Mark as transition');
console.log('    startTransition(() => {');
console.log('      const filtered = hugeList.filter(item =>');
console.log('        item.includes(e.target.value)');
console.log('      );');
console.log('      setResults(filtered);');
console.log('    });');
console.log('  };');
console.log('  ');
console.log('  return (');
console.log('    <div>');
console.log('      <input value={query} onChange={handleChange} />');
console.log('      {isPending && <Spinner />}');
console.log('      <Results data={results} />');
console.log('    </div>');
console.log('  );');
console.log('}');

console.log('\\nResult: Typing is smooth, filtering happens in background');

console.log('\\n=== Tab Switching Example ===');

console.log('\\nfunction TabContainer() {');
console.log('  const [tab, setTab] = useState("about");');
console.log('  const [isPending, startTransition] = useTransition();');
console.log('  ');
console.log('  const selectTab = (nextTab) => {');
console.log('    startTransition(() => {');
console.log('      setTab(nextTab); // Non-urgent update');
console.log('    });');
console.log('  };');
console.log('  ');
console.log('  return (');
console.log('    <>');
console.log('      <TabButton');
console.log('        isActive={tab === "about"}');
console.log('        onClick={() => selectTab("about")}');
console.log('      >');
console.log('        About');
console.log('      </TabButton>');
console.log('      {isPending ? <Spinner /> : <TabContent tab={tab} />}');
console.log('    </>');
console.log('  );');
console.log('}');

console.log('\\n=== How It Works ===');

console.log('\\n1. User types in input');
console.log('2. setQuery updates immediately (urgent)');
console.log('3. startTransition marks filtering as low priority');
console.log('4. React keeps UI responsive');
console.log('5. Filtering happens when browser is idle');
console.log('6. isPending shows loading state');

console.log('\\n=== Best Practices ===');

console.log('\\n✓ Use for expensive, non-urgent updates');
console.log('✓ Show isPending indicator');
console.log('✓ Keep user input responsive');
console.log('✗ Don\\'t use for urgent updates (form submission)');

console.log('\\n✓ useTransition: smooth UI, happy users');`
  },
  {
    id: 'react-h7',
    category: 'Hooks',
    difficulty: 'Expert',
    question: 'useDeferredValue - Debouncing Without Timers',
    answer: `React 18 optimization asked at **performance-focused companies**.

### What is useDeferredValue?
Returns a **deferred version** of a value that lags behind.

### Syntax:
\`\`\`jsx
const deferredValue = useDeferredValue(value);
\`\`\`

### How It Works:
1. Initial render: deferredValue === value
2. Value changes: deferredValue keeps old value
3. React re-renders with new value when idle
4. UI stays responsive during updates

### vs useTransition:
- **useDeferredValue**: Defer a value (props, state)
- **useTransition**: Defer a state update

### Use Cases:
- Search input debouncing
- Expensive list rendering
- Real-time filtering
- Chart/graph updates

### Performance:
Works with React.memo to skip expensive re-renders`,
    codeExample: `// useDeferredValue - Smart Debouncing
console.log('=== Problem: Expensive Re-renders ===');

console.log('❌ Without useDeferredValue:');
console.log('function SearchPage({ query }) {');
console.log('  return (');
console.log('    <>');
console.log('      <SearchInput />');
console.log('      <ExpensiveList query={query} /> {/* Re-renders on every keystroke */}');
console.log('    </>');
console.log('  );');
console.log('}');
console.log('');
console.log('Problem: ExpensiveList re-renders block typing');

console.log('\\n=== Solution: useDeferredValue ===');

console.log('\\nfunction SearchPage() {');
console.log('  const [query, setQuery] = useState("");');
console.log('  const deferredQuery = useDeferredValue(query);');
console.log('  ');
console.log('  return (');
console.log('    <>');
console.log('      <input');
console.log('        value={query}');
console.log('        onChange={e => setQuery(e.target.value)}');
console.log('      />');
console.log('      <ExpensiveList query={deferredQuery} />');
console.log('    </>');
console.log('  );');
console.log('}');

console.log('\\nHow it works:');
console.log('1. User types "a" → query = "a", deferredQuery = ""');
console.log('2. Input updates immediately (responsive)');
console.log('3. ExpensiveList still shows old results');
console.log('4. When idle, deferredQuery = "a"');
console.log('5. ExpensiveList updates in background');

console.log('\\n=== With React.memo Optimization ===');

console.log('\\nconst ExpensiveList = memo(({ query }) => {');
console.log('  const items = useMemo(() => {');
console.log('    console.log("Filtering...");');
console.log('    return hugeList.filter(item => item.includes(query));');
console.log('  }, [query]);');
console.log('  ');
console.log('  return items.map(item => <Item key={item.id} {...item} />);');
console.log('});');
console.log('');
console.log('// With useDeferredValue:');
console.log('// - Input responsive');
console.log('// - Filtering deferred');
console.log('// - memo skips re-renders when query unchanged');

console.log('\\n=== Visual Indicator ===');

console.log('\\nfunction SearchPage() {');
console.log('  const [query, setQuery] = useState("");');
console.log('  const deferredQuery = useDeferredValue(query);');
console.log('  const isStale = query !== deferredQuery;');
console.log('  ');
console.log('  return (');
console.log('    <>');
console.log('      <input value={query} onChange={e => setQuery(e.target.value)} />');
console.log('      <div style={{ opacity: isStale ? 0.5 : 1 }}>');
console.log('        <ExpensiveList query={deferredQuery} />');
console.log('      </div>');
console.log('    </>');
console.log('  );');
console.log('}');
console.log('');
console.log('Shows dimmed results while updating');

console.log('\\n=== useDeferredValue vs setTimeout ===');

console.log('\\nsetTimeout approach:');
console.log('  • Fixed delay (e.g., 300ms)');
console.log('  • Delays even when not needed');
console.log('  • Not React-aware');

console.log('\\nuseDeferredValue:');
console.log('  • Adaptive delay based on device speed');
console.log('  • No delay if device is fast');
console.log('  • React-aware, interruptible');
console.log('  • Works with Concurrent Rendering');

console.log('\\n✓ useDeferredValue: smart, adaptive debouncing');`
  },
  {
    id: 'react-h8',
    category: 'Hooks',
    difficulty: 'Medium',
    question: 'useId - Unique IDs for Accessibility',
    answer: `React 18 hook for **accessible components**.

### What is useId?
Generates **unique, stable IDs** for accessibility attributes.

### Why Not Math.random()?
- Not stable across server/client (hydration mismatch)
- Changes on every render
- Not deterministic

### Syntax:
\`\`\`jsx
const id = useId();
\`\`\`

### Use Cases:
1. **Form labels** - htmlFor/id connection
2. **ARIA attributes** - aria-describedby, aria-labelledby
3. **Multiple instances** - Same component rendered multiple times
4. **SSR** - Server and client IDs match

### Key Features:
- Stable across renders
- Unique across component tree
- SSR-safe (hydration-safe)
- No prop drilling needed`,
    codeExample: `// useId - Accessible Form Components
console.log('=== Problem: ID Collisions ===');

console.log('❌ Without useId:');
console.log('function TextField({ label }) {');
console.log('  return (');
console.log('    <>');
console.log('      <label htmlFor="input">');
console.log('        {label}');
console.log('      </label>');
console.log('      <input id="input" />');
console.log('    </>');
console.log('  );');
console.log('}');
console.log('');
console.log('// Render twice:');
console.log('<TextField label="Name" />');
console.log('<TextField label="Email" />');
console.log('');
console.log('Problem: Both inputs have id="input" - collision!');

console.log('\\n=== Solution: useId ===');

console.log('\\nfunction TextField({ label }) {');
console.log('  const id = useId();');
console.log('  ');
console.log('  return (');
console.log('    <>');
console.log('      <label htmlFor={id}>');
console.log('        {label}');
console.log('      </label>');
console.log('      <input id={id} />');
console.log('    </>');
console.log('  );');
console.log('}');

console.log('\\nResult:');
console.log('<TextField label="Name" />   → id=":r1:"');
console.log('<TextField label="Email" />  → id=":r2:"');
console.log('✓ Unique IDs, no collisions!');

console.log('\\n=== Multiple IDs from One useId ===');

console.log('\\nfunction FormField({ label, hint }) {');
console.log('  const id = useId();');
console.log('  ');
console.log('  return (');
console.log('    <>');
console.log('      <label htmlFor={id}>');
console.log('        {label}');
console.log('      </label>');
console.log('      <input');
console.log('        id={id}');
console.log('        aria-describedby={id + "-hint"}');
console.log('      />');
console.log('      <p id={id + "-hint"}>{hint}</p>');
console.log('    </>');
console.log('  );');
console.log('}');

console.log('\\nGenerated IDs:');
console.log('  input id: ":r1:"');
console.log('  hint id: ":r1:-hint"');

console.log('\\n=== SSR-Safe IDs ===');

console.log('\\n// Server renders:');
console.log('const id = useId(); // ":r1:"');
console.log('<input id=":r1:" />');

console.log('\\n// Client hydrates:');
console.log('const id = useId(); // ":r1:" (same!)');
console.log('<input id=":r1:" />');

console.log('\\n✓ No hydration mismatch!');

console.log('\\n=== ARIA Attributes ===');

console.log('\\nfunction Tooltip({ children, content }) {');
console.log('  const id = useId();');
console.log('  ');
console.log('  return (');
console.log('    <>');
console.log('      <button aria-describedby={id}>');
console.log('        {children}');
console.log('      </button>');
console.log('      <div role="tooltip" id={id}>');
console.log('        {content}');
console.log('      </div>');
console.log('    </>');
console.log('  );');
console.log('}');

console.log('\\n=== Best Practices ===');

console.log('\\n✓ Use for accessibility attributes');
console.log('✓ Append suffixes for multiple IDs');
console.log('✓ SSR-safe, no hydration issues');
console.log('✗ Don\\'t use for keys in lists');
console.log('✗ Don\\'t use for CSS selectors');

console.log('\\n✓ useId: accessible, SSR-safe IDs');`
  }
];


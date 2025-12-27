export const eliteQuestions = [
  {
    id: 'react-e1',
    category: 'Elite',
    difficulty: 'Elite',
    question: 'Explain React Server Components (RSC)',
    answer: `React Server Components are a **new paradigm** that lets components render on the server.

### Key Concepts:
1. **Server Components:** Render on server, send HTML to client (no JS bundle)
2. **Client Components:** Traditional React components ('use client')
3. **Zero Bundle Size:** Server components don't ship to client
4. **Direct Backend Access:** Can directly query databases, read files

### Benefits:
- **Performance:** Smaller JS bundles, faster initial load
- **SEO:** Server-rendered HTML
- **Security:** API keys, database queries stay on server

### Rules:
- Server components cannot use hooks (useState, useEffect)
- Cannot use browser APIs (window, localStorage)
- Can import and render client components`,
    codeExample: `// React Server Components
console.log('=== React Server Components ===');

// Server Component (no 'use client' directive)
async function ServerComponent() {
  console.log('[Server] Running on server...');
  
  // Can directly access database!
  const users = await fetchFromDB();
  console.log('[Server] Fetched from DB:', users);
  
  return (
    <div>
      <h1>Users (Server Rendered)</h1>
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
      {/* Can render client components */}
      <ClientCounter />
    </div>
  );
}

// Simulated DB fetch
async function fetchFromDB() {
  console.log('[DB] Query: SELECT * FROM users');
  return [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
}

// Client Component ('use client' directive)
function ClientCounter() {
  const [count, setCount] = useState(0);
  
  console.log('[Client] Interactive component');
  console.log('[Client] Can use hooks:', 'useState, useEffect');
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

console.log('\\n--- Component Comparison ---');
ServerComponent();
ClientCounter();

console.log('\\n=== Bundle Size Impact ===');
console.log('Server Components:');
console.log('  • UserList: 0 KB (server only)');
console.log('  • Header: 0 KB (server only)');
console.log('  • Footer: 0 KB (server only)');

console.log('\\nClient Components:');
console.log('  • Counter: 2 KB (needs JS)');
console.log('  • Modal: 5 KB (needs JS)');

console.log('\\nTotal client bundle: 7 KB');
console.log('Without RSC: 50+ KB');

console.log('\\n✓ Server Components = zero JS for static parts');`
  },
  {
    id: 'react-e2',
    category: 'Elite',
    difficulty: 'Elite',
    question: 'What is Concurrent React and useTransition?',
    answer: `Concurrent React allows React to **interrupt rendering** to handle high-priority updates.

### Key Features:
1. **Interruptible Rendering:** React can pause and resume work
2. **Priority-Based:** Urgent updates (typing) interrupt non-urgent (data fetch)
3. **Automatic Batching:** All state updates are batched (even in async)

### useTransition:
Marks state updates as **non-urgent** (transitions).

- **isPending:** True while transition is in progress
- **startTransition:** Wrap non-urgent updates

### Use Cases:
- Slow renders (large lists, complex components)
- Keeping UI responsive during expensive updates
- Debouncing without debounce`,
    codeExample: `// Concurrent React and useTransition
console.log('=== Concurrent React ===');

function SearchApp() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useState(false);
  
  // Large dataset
  const data = Array.from({ length: 10000 }, (_, i) => 'Item ' + i);
  
  const handleSearch = (value) => {
    // URGENT: Update input immediately
    setQuery(value);
    console.log('[Urgent] Input updated to:', value);
    
    // NON-URGENT: Filter in transition
    startTransition(() => {
      console.log('[Transition] Starting filter...');
      const filtered = data.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      console.log('[Transition] Found', filtered.length, 'results');
      setResults(filtered.slice(0, 10));
    });
  };
  
  console.log('isPending:', isPending);
  
  return (
    <div>
      <input 
        value={query}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      {isPending && <span>Filtering...</span>}
      <ul>
        {results.map(r => <li key={r}>{r}</li>)}
      </ul>
    </div>
  );
}

console.log('\\n--- Demo: Search with Transition ---');
SearchApp();

// Simulate search
console.log('\\n--- User types "999" ---');
const mockHandleSearch = (value) => {
  console.log('[Urgent] Input: "' + value + '"');
  console.log('[Transition] Filtering 10,000 items...');
  console.log('[Transition] Found matches, updating list');
};
mockHandleSearch('999');

console.log('\\n=== Without vs With Concurrent ===');
console.log('WITHOUT Concurrent:');
console.log('  User types → UI freezes → Filter → UI updates');
console.log('  Result: Janky typing');

console.log('\\nWITH Concurrent (useTransition):');
console.log('  User types → Input updates → Filter in background');
console.log('  Result: Smooth typing!');

console.log('\\n✓ useTransition keeps UI responsive');`
  },
  {
    id: 'react-e3',
    category: 'Elite',
    difficulty: 'Elite',
    question: 'Explain Suspense and Streaming SSR',
    answer: `Suspense lets components **"wait" for something** before rendering.

### Traditional SSR Problem:
1. Server waits for ALL data
2. Sends complete HTML
3. Client hydrates entire app
**Result:** Slow time-to-interactive

### Streaming SSR with Suspense:
1. Server sends HTML **as it's ready**
2. Suspense boundaries show fallback
3. Components stream in when data arrives
4. Selective hydration (interactive parts first)

### Benefits:
- **Faster FCP:** First Contentful Paint happens sooner
- **Progressive Hydration:** Critical parts become interactive first
- **Better UX:** Users see content faster

### Use Cases:
- Code splitting (React.lazy)
- Data fetching (with frameworks like Next.js)
- Async components`,
    codeExample: `// Suspense and Streaming SSR
console.log('=== Suspense for Code Splitting ===');

// Lazy load heavy component
const HeavyChart = lazy(() => {
  console.log('[Lazy] Loading chart bundle...');
  return Promise.resolve({ 
    default: () => <div>📊 Heavy Chart Component</div> 
  });
});

function Dashboard() {
  return (
    <div>
      <h1>Dashboard (loads immediately)</h1>
      
      {/* Suspense shows fallback while loading */}
      <Suspense fallback={<div>⏳ Loading chart...</div>}>
        <HeavyChart />
      </Suspense>
    </div>
  );
}

Dashboard();

console.log('\\n=== Streaming SSR Demo ===');

function simulateStreaming() {
  console.log('--- Server Response Stream ---');
  console.log('0ms:   Shell HTML sent');
  console.log('       <html><body><header>...</header>');
  
  console.log('\\n50ms:  Main content streamed');
  console.log('       <main>Content here</main>');
  
  console.log('\\n100ms: Comments still loading...');
  console.log('       <div id="comments"><p>Loading...</p></div>');
  
  console.log('\\n200ms: Comments data ready, streamed');
  console.log('       <script>inject comments HTML</script>');
  
  console.log('\\n250ms: Footer sent, stream complete');
  console.log('       </body></html>');
}

simulateStreaming();

console.log('\\n=== Traditional vs Streaming ===');
console.log('TRADITIONAL SSR:');
console.log('  Wait 200ms for all data');
console.log('  Send everything at once');
console.log('  User sees: blank → everything');

console.log('\\nSTREAMING SSR:');
console.log('  0ms: Header visible');
console.log('  50ms: Content visible');
console.log('  200ms: Comments appear');
console.log('  User sees content progressively!');

console.log('\\n✓ Suspense + Streaming = faster perceived load');`
  },
  {
    id: 'react-e4',
    category: 'Elite',
    difficulty: 'Elite',
    question: 'What is the React Compiler (React Forget)?',
    answer: `React Compiler (formerly "React Forget") **automatically memoizes** components and values.

### The Problem:
Manual memoization is:
- **Error-Prone:** Easy to miss dependencies
- **Verbose:** useMemo, useCallback, React.memo everywhere
- **Maintenance:** Hard to maintain as code changes

### The Solution:
Compiler automatically:
1. **Analyzes Code:** Understands data flow
2. **Inserts Memoization:** Adds useMemo/useCallback where needed
3. **Optimizes Re-renders:** Prevents unnecessary renders

### Benefits:
- **No Manual Optimization:** Write simple code, get performance
- **Correct by Default:** Compiler doesn't miss dependencies
- **Smaller Bundles:** Less manual memoization code

### Status:
- Experimental (as of 2024)
- Used in production at Meta (Instagram, Facebook)`,
    codeExample: `// React Compiler (React Forget)
console.log('=== WITHOUT React Compiler ===');
console.log('Manual memoization required:\\n');

function ManualOptimization() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Must manually memoize expensive computation
  const expensiveValue = useMemo(() => {
    console.log('[Manual] useMemo for expensive calc');
    return count * 2;
  }, [count]);
  
  // Must manually memoize callbacks
  const handleClick = useCallback(() => {
    console.log('[Manual] useCallback for stable ref');
  }, []);
  
  // Must wrap child in React.memo
  const MemoChild = memo(({ onClick }) => {
    console.log('[Manual] React.memo wrapper');
    return <button onClick={onClick}>Click</button>;
  });
  
  return (
    <div>
      <p>{expensiveValue}</p>
      <MemoChild onClick={handleClick} />
    </div>
  );
}

ManualOptimization();

console.log('\\n=== WITH React Compiler ===');
console.log('Just write simple code:\\n');

function AutomaticOptimization() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Compiler auto-memoizes!
  const expensiveValue = count * 2;
  console.log('[Auto] Compiler adds useMemo');
  
  // Compiler auto-memoizes!
  const handleClick = () => console.log('clicked');
  console.log('[Auto] Compiler adds useCallback');
  
  // Compiler auto-optimizes!
  function Child({ onClick }) {
    console.log('[Auto] Compiler adds React.memo');
    return <button onClick={onClick}>Click</button>;
  }
  
  return (
    <div>
      <p>{expensiveValue}</p>
      <Child onClick={handleClick} />
    </div>
  );
}

AutomaticOptimization();

console.log('\\n=== Comparison Table ===');
console.log('                 | Manual    | Compiler');
console.log('-----------------+-----------+----------');
console.log('useMemo needed   | Yes       | No');
console.log('useCallback      | Yes       | No');
console.log('React.memo       | Yes       | No');
console.log('Dependency bugs  | Common    | None');
console.log('Bundle size      | Larger    | Smaller');

console.log('\\n✓ React Compiler = automatic optimization!');`
  },
  {
    id: 'react-e5',
    category: 'Elite',
    difficulty: 'Elite',
    question: 'Explain React Reconciliation Algorithm (Fiber)',
    answer: `React Fiber is the **reconciliation engine** that powers React 16+.

### What is Reconciliation?
The process of comparing old and new Virtual DOM trees to determine minimal DOM updates.

### Fiber Architecture:
1. **Fiber Node:** Each element is a "fiber" (unit of work)
2. **Linked List:** Fibers form a tree using pointers (child, sibling, return)
3. **Incremental:** Work can be split into chunks
4. **Priority-Based:** High-priority work interrupts low-priority

### Two Phases:
1. **Render Phase:** Build new fiber tree (can be interrupted)
2. **Commit Phase:** Apply changes to DOM (synchronous, cannot interrupt)

### Why Fiber?
- **Concurrent Rendering:** Can pause/resume work
- **Priority Scheduling:** Urgent updates first
- **Better Performance:** Smoother animations, responsive UI`,
    codeExample: `// React Fiber Architecture
console.log('=== Fiber Node Structure ===');

// Each React element becomes a Fiber
const fiber = {
  type: 'div',
  props: { className: 'container' },
  child: null,        // First child
  sibling: null,      // Next sibling  
  return: null,       // Parent
  alternate: null,    // Previous version
  effectTag: 'UPDATE' // What to do
};

console.log('Fiber node:', JSON.stringify(fiber, null, 2));

console.log('\\n=== Building Fiber Tree ===');

function buildTree() {
  const root = { type: 'div', id: 'root' };
  const header = { type: 'header', parent: 'root' };
  const main = { type: 'main', parent: 'root' };
  const footer = { type: 'footer', parent: 'root' };
  
  // Link as: root -> header -> main -> footer (siblings)
  console.log('Tree structure:');
  console.log('root');
  console.log('  ├─ header');
  console.log('  ├─ main');
  console.log('  └─ footer');
  
  return root;
}

buildTree();

console.log('\\n=== Reconciliation (Diffing) ===');

function reconcile(oldFiber, newElement) {
  console.log('Comparing:', oldFiber.type, 'vs', newElement.type);
  
  if (oldFiber.type === newElement.type) {
    // Same type: UPDATE props only
    console.log('→ Same type: UPDATE');
    return { ...oldFiber, props: newElement.props, effectTag: 'UPDATE' };
  } else {
    // Different type: DELETE old, CREATE new
    console.log('→ Different type: REPLACE');
    return { type: newElement.type, props: newElement.props, effectTag: 'PLACEMENT' };
  }
}

const oldFiber = { type: 'div', props: { text: 'old' } };
const newElement1 = { type: 'div', props: { text: 'new' } };
const newElement2 = { type: 'span', props: { text: 'new' } };

console.log('\\nCase 1: Same type');
reconcile(oldFiber, newElement1);

console.log('\\nCase 2: Different type');
reconcile(oldFiber, newElement2);

console.log('\\n=== Two Phases ===');
console.log('1. RENDER Phase (interruptible):');
console.log('   • Build fiber tree');
console.log('   • Calculate diffs');
console.log('   • Can be paused for urgent updates');

console.log('\\n2. COMMIT Phase (synchronous):');
console.log('   • Apply all DOM changes');
console.log('   • Cannot be interrupted');
console.log('   • Must complete in one go');

console.log('\\n✓ Fiber enables concurrent, interruptible rendering');`
  },
  {
    id: 'react-elite-6',
    category: 'Elite',
    difficulty: 'Elite',
    question: 'React 19 New Features - use Hook and Actions',
    answer: `Cutting-edge React 19 features asked at **Vercel, Meta**.

### use Hook:
New primitive for reading resources (Promises, Context).

**Key Features:**
- Can be called conditionally
- Can be called in loops
- Suspends component until Promise resolves
- Works with Server Components

### Actions:
Functions that handle async transitions automatically.

**Benefits:**
- Automatic pending states
- Automatic error handling
- Optimistic updates built-in
- Form integration

### useOptimistic:
New hook for optimistic UI updates.

### useFormStatus:
Access form submission status.

### use() vs useEffect:
- use: Suspends, can be conditional
- useEffect: Doesn't suspend, must be top-level`,
    codeExample: `// React 19 - use Hook and Actions
console.log('=== use Hook ===');

console.log('// Read Promise with use');
console.log('function UserProfile({ userPromise }) {');
console.log('  const user = use(userPromise); // Suspends until resolved');
console.log('  return <div>{user.name}</div>;');
console.log('}');
console.log('');
console.log('// Parent with Suspense');
console.log('<Suspense fallback={<Loading />}>');
console.log('  <UserProfile userPromise={fetchUser()} />');
console.log('</Suspense>');

console.log('\\n// Conditional use (allowed!)');
console.log('function Component({ shouldFetch, promise }) {');
console.log('  if (shouldFetch) {');
console.log('    const data = use(promise); // OK in React 19!');
console.log('    return <div>{data}</div>;');
console.log('  }');
console.log('  return <div>Not fetching</div>;');
console.log('}');

console.log('\\n=== Actions ===');

console.log('\\nfunction UpdateName({ userId }) {');
console.log('  const [name, setName] = useState("");');
console.log('  const [error, setError] = useState(null);');
console.log('  const [isPending, startTransition] = useTransition();');
console.log('  ');
console.log('  // Action function');
console.log('  async function updateName(formData) {');
console.log('    const newName = formData.get("name");');
console.log('    ');
console.log('    try {');
console.log('      await updateUserName(userId, newName);');
console.log('      setName(newName);');
console.log('    } catch (err) {');
console.log('      setError(err.message);');
console.log('    }');
console.log('  }');
console.log('  ');
console.log('  return (');
console.log('    <form action={updateName}>');
console.log('      <input name="name" />');
console.log('      <button type="submit" disabled={isPending}>');
console.log('        {isPending ? "Updating..." : "Update"}');
console.log('      </button>');
console.log('      {error && <p>{error}</p>}');
console.log('    </form>');
console.log('  );');
console.log('}');

console.log('\\n=== useOptimistic ===');

console.log('\\nfunction TodoList({ todos }) {');
console.log('  const [optimisticTodos, addOptimisticTodo] = useOptimistic(');
console.log('    todos,');
console.log('    (state, newTodo) => [...state, newTodo]');
console.log('  );');
console.log('  ');
console.log('  async function addTodo(formData) {');
console.log('    const title = formData.get("title");');
console.log('    ');
console.log('    // Optimistically add');
console.log('    addOptimisticTodo({ id: "temp", title, done: false });');
console.log('    ');
console.log('    // Actually add');
console.log('    await createTodo(title);');
console.log('  }');
console.log('  ');
console.log('  return (');
console.log('    <>');
console.log('      {optimisticTodos.map(todo => <Todo key={todo.id} {...todo} />)}');
console.log('      <form action={addTodo}>');
console.log('        <input name="title" />');
console.log('        <button>Add</button>');
console.log('      </form>');
console.log('    </>');
console.log('  );');
console.log('}');

console.log('\\n=== useFormStatus ===');

console.log('\\nfunction SubmitButton() {');
console.log('  const { pending, data, method } = useFormStatus();');
console.log('  ');
console.log('  return (');
console.log('    <button type="submit" disabled={pending}>');
console.log('      {pending ? "Submitting..." : "Submit"}');
console.log('    </button>');
console.log('  );');
console.log('}');

console.log('\\n✓ use: read Promises/Context, can be conditional');
console.log('✓ Actions: async transitions with automatic states');
console.log('✓ useOptimistic: built-in optimistic updates');`
  },
  {
    id: 'react-elite-7',
    category: 'Elite',
    difficulty: 'Elite',
    question: 'Streaming SSR - Progressive Rendering',
    answer: `Advanced SSR pattern asked at **Vercel, Netflix**.

### What is Streaming SSR?
Send HTML to browser progressively as it's generated.

**Traditional SSR:**
1. Fetch all data
2. Render entire page
3. Send complete HTML
4. Hydrate on client

**Streaming SSR:**
1. Send shell immediately
2. Stream components as ready
3. Progressive hydration
4. Faster Time to First Byte (TTFB)

### Key APIs:
- \`renderToPipeableStream\` (Node.js)
- \`renderToReadableStream\` (Edge/Deno)
- \`<Suspense>\` boundaries

### Benefits:
- Faster initial page load
- Better perceived performance
- Reduced TTFB
- Progressive enhancement`,
    codeExample: `// Streaming SSR
console.log('=== Traditional SSR Flow ===');

console.log('1. Server waits for ALL data');
console.log('   fetchUser() - 500ms');
console.log('   fetchPosts() - 1000ms');
console.log('   fetchComments() - 800ms');
console.log('   Total wait: 2300ms');
console.log('');
console.log('2. Render complete HTML');
console.log('3. Send to browser (TTFB: 2300ms)');
console.log('4. Hydrate on client');

console.log('\\n=== Streaming SSR Flow ===');

console.log('1. Send shell immediately (TTFB: 50ms)');
console.log('   <html><body><div id="root">');
console.log('     <Header />');
console.log('     <Suspense fallback={<Skeleton />}>');
console.log('       <!-- User data streams here -->');
console.log('     </Suspense>');
console.log('   </div></body></html>');
console.log('');
console.log('2. Stream components as data arrives');
console.log('   User ready (500ms) → stream User component');
console.log('   Comments ready (800ms) → stream Comments');
console.log('   Posts ready (1000ms) → stream Posts');

console.log('\\n=== Server Code (Next.js) ===');

console.log('\\n// app/page.js');
console.log('export default function Page() {');
console.log('  return (');
console.log('    <>');
console.log('      <Header /> {/* Renders immediately */}');
console.log('      ');
console.log('      <Suspense fallback={<UserSkeleton />}>');
console.log('        <UserProfile /> {/* Streams when ready */}');
console.log('      </Suspense>');
console.log('      ');
console.log('      <Suspense fallback={<PostsSkeleton />}>');
console.log('        <Posts /> {/* Streams when ready */}');
console.log('      </Suspense>');
console.log('    </>');
console.log('  );');
console.log('}');

console.log('\\n// Server Component with async data');
console.log('async function UserProfile() {');
console.log('  const user = await fetchUser(); // Suspends');
console.log('  return <div>{user.name}</div>;');
console.log('}');

console.log('\\n=== renderToPipeableStream (Node.js) ===');

console.log('\\nimport { renderToPipeableStream } from "react-dom/server";');
console.log('');
console.log('const { pipe } = renderToPipeableStream(<App />, {');
console.log('  onShellReady() {');
console.log('    // Send initial HTML');
console.log('    response.setHeader("Content-Type", "text/html");');
console.log('    pipe(response);');
console.log('  },');
console.log('  onAllReady() {');
console.log('    // All Suspense boundaries resolved');
console.log('  }');
console.log('});');

console.log('\\n=== Performance Comparison ===');

const metrics = {
  'Traditional SSR': {
    TTFB: '2300ms',
    FCP: '2400ms',
    LCP: '2500ms'
  },
  'Streaming SSR': {
    TTFB: '50ms ✓',
    FCP: '100ms ✓',
    LCP: '1000ms ✓'
  }
};

Object.entries(metrics).forEach(([approach, values]) => {
  console.log('\\n' + approach + ':');
  Object.entries(values).forEach(([metric, value]) => {
    console.log('  ' + metric + ':', value);
  });
});

console.log('\\n✓ Streaming SSR: faster TTFB, better UX');
console.log('✓ Use Suspense boundaries strategically');
console.log('✓ Progressive enhancement');`
  },
  {
    id: 'react-elite-8',
    category: 'Elite',
    difficulty: 'Elite',
    question: 'React Compiler - Automatic Optimization',
    answer: `Future of React optimization asked at **Meta, Vercel**.

### What is React Compiler?
Automatically optimizes React code at build time.

**What it does:**
- Auto-memoizes components
- Auto-memoizes values
- Auto-memoizes callbacks
- Eliminates manual useMemo/useCallback

### How it works:
1. Analyzes component code
2. Identifies pure computations
3. Automatically memoizes
4. Generates optimized code

### Benefits:
- No manual optimization needed
- Fewer bugs (no missing deps)
- Better performance by default
- Smaller bundle (less hook code)

### Current Status:
- Experimental (as of 2024)
- Used in production at Meta
- Coming to React 19+

### Migration:
Gradual - works alongside manual optimization`,
    codeExample: `// React Compiler
console.log('=== Manual Optimization (Current) ===');

console.log('❌ Without optimization:');
console.log('function TodoList({ todos, filter }) {');
console.log('  // Re-filters on every render');
console.log('  const filtered = todos.filter(t => t.status === filter);');
console.log('  ');
console.log('  // New function on every render');
console.log('  const handleToggle = (id) => toggleTodo(id);');
console.log('  ');
console.log('  return filtered.map(todo =>');
console.log('    <Todo key={todo.id} onToggle={handleToggle} />');
console.log('  );');
console.log('}');

console.log('\\n✓ With manual optimization:');
console.log('function TodoList({ todos, filter }) {');
console.log('  // Manually memoize filtered list');
console.log('  const filtered = useMemo(');
console.log('    () => todos.filter(t => t.status === filter),');
console.log('    [todos, filter]');
console.log('  );');
console.log('  ');
console.log('  // Manually memoize callback');
console.log('  const handleToggle = useCallback(');
console.log('    (id) => toggleTodo(id),');
console.log('    []');
console.log('  );');
console.log('  ');
console.log('  return filtered.map(todo =>');
console.log('    <Todo key={todo.id} onToggle={handleToggle} />');
console.log('  );');
console.log('}');

console.log('\\n=== React Compiler (Future) ===');

console.log('\\n✓ Compiler auto-optimizes:');
console.log('function TodoList({ todos, filter }) {');
console.log('  // Compiler automatically memoizes this!');
console.log('  const filtered = todos.filter(t => t.status === filter);');
console.log('  ');
console.log('  // Compiler automatically memoizes this!');
console.log('  const handleToggle = (id) => toggleTodo(id);');
console.log('  ');
console.log('  return filtered.map(todo =>');
console.log('    <Todo key={todo.id} onToggle={handleToggle} />');
console.log('  );');
console.log('}');
console.log('');
console.log('// Compiler generates optimized code automatically');

console.log('\\n=== What Compiler Optimizes ===');

console.log('\\n1. Pure computations:');
console.log('   const total = items.reduce((sum, item) => sum + item.price, 0);');
console.log('   → Auto-memoized');

console.log('\\n2. Object/Array literals:');
console.log('   const style = { color: "red", fontSize: 16 };');
console.log('   → Auto-memoized');

console.log('\\n3. Function definitions:');
console.log('   const handleClick = () => doSomething();');
console.log('   → Auto-memoized');

console.log('\\n4. Component renders:');
console.log('   return <ExpensiveChild data={data} />;');
console.log('   → Auto-memoized if data unchanged');

console.log('\\n=== Enabling React Compiler ===');

console.log('\\n// babel.config.js');
console.log('module.exports = {');
console.log('  plugins: [');
console.log('    ["babel-plugin-react-compiler", {');
console.log('      compilationMode: "annotation" // or "all"');
console.log('    }]');
console.log('  ]');
console.log('};');

console.log('\\n// Opt-in per component');
console.log('"use memo"; // Directive for compiler');
console.log('');
console.log('function MyComponent() {');
console.log('  // Compiler optimizes this component');
console.log('}');

console.log('\\n=== Benefits ===');

console.log('\\n✓ No manual useMemo/useCallback');
console.log('✓ No dependency arrays to maintain');
console.log('✓ Fewer bugs (no missing deps)');
console.log('✓ Better performance by default');
console.log('✓ Smaller bundle size');

console.log('\\n=== Current Status ===');

console.log('\\n• Experimental in React 19');
console.log('• Used in production at Meta (Instagram, Facebook)');
console.log('• Gradual rollout planned');
console.log('• Works alongside manual optimization');

console.log('\\n✓ React Compiler: automatic optimization');
console.log('✓ Write simple code, get performance for free');`
  }
];


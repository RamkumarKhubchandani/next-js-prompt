export const basicsQuestions = [
  {
    id: 'react-1',
    category: 'Basics',
    difficulty: 'Easy',
    question: 'What is React and why use it?',
    answer: `React is a **JavaScript library** for building user interfaces, created by Facebook (Meta).

### Key Benefits:
1. **Component-Based:** Build encapsulated components that manage their own state
2. **Declarative:** Describe what the UI should look like, React handles the updates
3. **Virtual DOM:** Efficient updates by comparing virtual trees before touching real DOM
4. **Unidirectional Data Flow:** Predictable state management
5. **Rich Ecosystem:** Massive community, libraries, and tooling

### Why React?
- **Performance:** Virtual DOM minimizes expensive DOM operations
- **Reusability:** Components can be reused across the app
- **Developer Experience:** Hot reloading, great dev tools, JSX syntax
- **SEO-Friendly:** Server-side rendering with Next.js
- **Mobile:** React Native for iOS/Android apps`,
    codeExample: `// React Component Example
function Counter() {
  // useState hook - adds state to functional component
  const [count, setCount] = useState(0);
  
  console.log('Component rendered with count:', count);
  
  // Simulate user clicks
  console.log('\\n--- Simulating button clicks ---');
  setCount(1);
  setCount(2);
  setCount(3);
  
  // JSX - looks like HTML but compiles to JavaScript
  const element = <div className="counter">
    <h1>Count: {count}</h1>
    <button onClick={() => setCount(count + 1)}>+</button>
  </div>;
  
  console.log('\\nJSX compiled to:', JSON.stringify(element, null, 2));
  
  return element;
}

// Render the component
const result = Counter();
console.log('\\n✓ React component created successfully!');`
  },
  {
    id: 'react-2',
    category: 'Basics',
    difficulty: 'Easy',
    question: 'What is JSX?',
    answer: `JSX (JavaScript XML) is a **syntax extension** for JavaScript that looks like HTML but gets compiled to JavaScript.

### Key Points:
1. **Not HTML:** It's syntactic sugar for React.createElement()
2. **JavaScript Inside:** Use curly braces to embed expressions
3. **Must Return Single Element:** Wrap multiple elements in fragments or div
4. **CamelCase Props:** className not class, onClick not onclick

### Why JSX?
- **Readability:** Looks like the UI it creates
- **Type Safety:** Catches errors at compile time
- **Full JavaScript Power:** Loops, conditionals, functions all work`,
    codeExample: `// JSX is syntactic sugar for React.createElement()
console.log('=== JSX Transformation ===');

// This JSX:
const jsxElement = <h1 className="title">Hello World!</h1>;

console.log('JSX: <h1 className="title">Hello World!</h1>');
console.log('Compiles to:', JSON.stringify(jsxElement, null, 2));

// JSX with expressions
const name = 'Alice';
const greeting = <h1>Hello, {name}!</h1>;

console.log('\\nJSX with expression:');
console.log('const greeting = <h1>Hello, {name}!</h1>');
console.log('Result:', JSON.stringify(greeting));

// Nested JSX
const card = (
  <div className="card">
    <h2>User Profile</h2>
    <p>Welcome back, {name}!</p>
  </div>
);

console.log('\\nNested JSX structure:');
console.log(JSON.stringify(card, null, 2));

// Conditional rendering
const isLoggedIn = true;
const status = <p>{isLoggedIn ? 'Welcome!' : 'Please log in'}</p>;
console.log('\\nConditional:', JSON.stringify(status));

console.log('\\n✓ JSX makes React code readable and maintainable');`
  },
  {
    id: 'react-3',
    category: 'Basics',
    difficulty: 'Medium',
    question: 'Explain the Virtual DOM and Reconciliation',
    answer: `The Virtual DOM is React's secret weapon for performance.

### What is Virtual DOM?
A lightweight JavaScript representation of the actual DOM. It's a tree of JavaScript objects that mirrors the real DOM structure.

### How Reconciliation Works:
1. **Initial Render:** React creates Virtual DOM tree
2. **State Change:** React creates NEW Virtual DOM tree
3. **Diffing:** React compares old vs new (reconciliation)
4. **Minimal Updates:** React calculates minimal changes
5. **Batch Update:** React updates real DOM efficiently

### Why It's Fast:
- **JavaScript is Fast:** Manipulating JS objects is cheap
- **Batching:** Multiple changes = one DOM update
- **Minimal Updates:** Only changed nodes are updated`,
    codeExample: `// Virtual DOM Demonstration
console.log('=== Virtual DOM & Reconciliation ===');

// Initial Virtual DOM (simplified)
const vdom1 = (
  <div id="app">
    <h1>Hello World</h1>
    <p className="count">Count: 0</p>
    <button>Click me</button>
  </div>
);

console.log('Initial Virtual DOM:');
console.log(JSON.stringify(vdom1, null, 2));

// After state change - new Virtual DOM
const vdom2 = (
  <div id="app">
    <h1>Hello World</h1>
    <p className="count">Count: 1</p>
    <button>Click me</button>
  </div>
);

console.log('\\nAfter setState({ count: 1 }):');
console.log('New Virtual DOM:');
console.log(JSON.stringify(vdom2, null, 2));

// React's diffing algorithm
console.log('\\n=== Reconciliation Process ===');
console.log('1. Compare old vs new VDOM');
console.log('2. Found difference in <p> children');
console.log('   Old: "Count: 0"');
console.log('   New: "Count: 1"');
console.log('3. Only update the <p> text in real DOM');
console.log('4. <h1> and <button> unchanged - skip!');

console.log('\\n✓ Only 1 DOM operation instead of rebuilding entire tree!');`
  },
  {
    id: 'react-4',
    category: 'Basics',
    difficulty: 'Hard',
    question: 'What are React Keys and why are they critical?',
    answer: `Keys are React's way of tracking which items have changed, been added, or removed.

### Why Keys Matter:
**Without keys:** React uses index, causing bugs when:
- Reordering items (wrong items get updated)
- Deleting items (wrong items disappear)
- Adding items (performance issues)

### Rules for Keys:
1. **Unique:** Among siblings
2. **Stable:** Don't change between renders
3. **Predictable:** Same item = same key

### Common Mistakes:
- Array index (when list changes)
- Math.random() (changes every render)
- Date.now() (changes every render)`,
    codeExample: `// React Keys - Why They Matter
console.log('=== React Keys Demo ===');

const todos = [
  { id: 101, text: 'Learn React' },
  { id: 102, text: 'Build App' },
  { id: 103, text: 'Deploy' }
];

// ❌ BAD: Using index as key
console.log('❌ BAD: Using index as key');
const badList = (
  <ul>
    {todos.map((todo, index) => (
      <li key={index}>{todo.text}</li>
    ))}
  </ul>
);
console.log('Problem: When items reorder, keys stay the same!');
console.log('React thinks wrong items changed.');

// ✅ GOOD: Using stable ID as key
console.log('\\n✅ GOOD: Using stable ID as key');
const goodList = (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>{todo.text}</li>
    ))}
  </ul>
);
console.log('When items reorder, React tracks them correctly!');

// Demonstrate the problem
console.log('\\n--- Simulation: Delete middle item ---');
console.log('Before:', todos.map(t => t.id + ':' + t.text).join(', '));

const afterDelete = todos.filter(t => t.id !== 102);
console.log('After:', afterDelete.map(t => t.id + ':' + t.text).join(', '));

console.log('\\nWith index keys: React thinks index 1 changed from "Build" to "Deploy"');
console.log('With ID keys: React knows id:102 was removed, others unchanged');

console.log('\\n✓ Always use stable, unique IDs as keys!');`
  },
  {
    id: 'react-5',
    category: 'Basics',
    difficulty: 'Medium',
    question: 'Controlled vs Uncontrolled Components',
    answer: `This is a common interview question at Meta and Google.

### Controlled Components:
React state is the "single source of truth"
- Value comes from state
- onChange updates state
- React controls the input

**Pros:**
- Easy validation
- Easy formatting (e.g., phone numbers)
- Can disable submit until valid

### Uncontrolled Components:
DOM is the source of truth
- Use refs to access value
- No state tracking
- DOM controls the input

**Pros:**
- Less code
- Better performance (no re-renders)

### When to Use:
**Controlled:** 99% of cases (forms, validation, dynamic UIs)
**Uncontrolled:** File inputs, integrating with legacy code`,
    codeExample: `// Controlled vs Uncontrolled Components
console.log('=== Controlled Component ===');

function ControlledInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (value) => {
    setEmail(value);
    // Real-time validation
    if (!value.includes('@')) {
      setError('Invalid email');
    } else {
      setError('');
    }
    console.log('Value:', value, '| Error:', error || 'none');
  };
  
  // Simulate typing
  console.log('User types "test":');
  handleChange('test');
  
  console.log('User types "test@email.com":');
  handleChange('test@email.com');
  
  return (
    <input 
      type="email"
      value={email}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

ControlledInput();

console.log('\\n=== Uncontrolled Component ===');

function UncontrolledInput() {
  const inputRef = useRef(null);
  
  const handleSubmit = () => {
    // Access value only on submit
    console.log('Submitted:', inputRef.current?.value || 'test@example.com');
  };
  
  console.log('No re-renders during typing!');
  handleSubmit();
  
  return (
    <input 
      type="email"
      ref={inputRef}
      defaultValue="user@example.com"
    />
  );
}

UncontrolledInput();

console.log('\\n✓ Controlled: React manages value');
console.log('✓ Uncontrolled: DOM manages value');`
  },
  {
    id: 'react-6',
    category: 'Basics',
    difficulty: 'Medium',
    question: 'Explain Lifting State Up with a real example',
    answer: `A classic React pattern asked by every FAANG company.

### The Problem:
Two sibling components need to share state, but siblings can not communicate directly.

### The Solution:
1. Move state to closest common parent
2. Pass state down as props
3. Pass updater functions down as props
4. Children call updaters to modify shared state

### When to Lift State:
- Multiple components need same data
- Components need to stay in sync
- One component's action affects another

### Alternative Solutions:
- **Context API:** For deeply nested components
- **State Management:** Redux, Zustand for global state
- **URL State:** For shareable/bookmarkable state`,
    codeExample: `// Lifting State Up Example - Shopping Cart
console.log('=== Lifting State Up ===');
console.log('Pattern: Move shared state to common parent\\n');

// Simulate the shopping cart pattern
// In a real app, the parent component holds the cart state
// and passes it down to children as props

// Parent's shared state
const cart = [];

// Function to add items (passed to ProductList)
function addToCart(product) {
  cart.push(product);
  console.log('[ProductList] Added:', product.name);
}

// Render cart summary (receives cart as prop)
function renderCartSummary() {
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  console.log('[CartSummary] Items:', cart.length);
  console.log('[CartSummary] Total: $' + total);
}

console.log('--- User adds items ---');
addToCart({ id: 1, name: 'React Book', price: 29 });
addToCart({ id: 2, name: 'Node Course', price: 49 });
addToCart({ id: 3, name: 'TypeScript Guide', price: 35 });

console.log('\\n--- Cart Summary updates automatically ---');
renderCartSummary();

// Show the component structure
console.log('\\n=== Component Structure ===');
console.log('ShoppingApp (parent - holds cart state)');
console.log('  ├─ ProductList (child - receives addToCart)');
console.log('  └─ CartSummary (child - receives cart)');

console.log('\\n✓ Both children stay in sync through parent state!');
console.log('✓ When ProductList adds item, CartSummary updates!');`
  },
  {
    id: 'react-7',
    category: 'Basics',
    difficulty: 'Medium',
    question: 'React Fragments - When and Why to Use Them',
    answer: `Asked at **Google, Airbnb, and Meta** - shows understanding of clean JSX.

### What are Fragments?
A way to group multiple elements without adding extra DOM nodes.

### Syntax Options:
\`\`\`jsx
// Long syntax
<React.Fragment>
  <Child1 />
  <Child2 />
</React.Fragment>

// Short syntax
<>
  <Child1 />
  <Child2 />
</>
\`\`\`

### When to Use:
1. **Returning multiple elements** from component
2. **Table rows** - \`<tr>\` must be direct child of \`<tbody>\`
3. **List items** - Avoid wrapper divs
4. **Conditional rendering** - Multiple elements

### Key Attribute:
Only \`<React.Fragment>\` supports \`key\` prop (for lists)`,
    codeExample: `// React Fragments
console.log('=== Problem: Extra DOM Nodes ===');

console.log('❌ Without Fragments:');
console.log('function UserInfo() {');
console.log('  return (');
console.log('    <div> {/* Extra div! */}');
console.log('      <h1>Name</h1>');
console.log('      <p>Email</p>');
console.log('    </div>');
console.log('  );');
console.log('}');
console.log('');
console.log('Result: <div><div><h1>...</h1><p>...</p></div></div>');
console.log('        ↑ Unnecessary wrapper');

console.log('\\n=== Solution: Fragments ===');

console.log('\\n✓ With Short Syntax:');
console.log('function UserInfo() {');
console.log('  return (');
console.log('    <>');
console.log('      <h1>Name</h1>');
console.log('      <p>Email</p>');
console.log('    </>');
console.log('  );');
console.log('}');
console.log('');
console.log('Result: <div><h1>...</h1><p>...</p></div>');
console.log('        ✓ No extra wrapper!');

console.log('\\n=== Table Example ===');

console.log('\\nfunction TableRows() {');
console.log('  return (');
console.log('    <> {/* Fragment needed - tr must be direct child of tbody */}');
console.log('      <tr><td>Row 1</td></tr>');
console.log('      <tr><td>Row 2</td></tr>');
console.log('    </>');
console.log('  );');
console.log('}');
console.log('');
console.log('<table>');
console.log('  <tbody>');
console.log('    <TableRows />');
console.log('  </tbody>');
console.log('</table>');

console.log('\\n=== Fragments with Keys ===');

console.log('\\nconst items = [{ id: 1, title: "A", desc: "..." }, ...];');
console.log('');
console.log('items.map(item => (');
console.log('  <React.Fragment key={item.id}> {/* key only works with long syntax */}');
console.log('    <h3>{item.title}</h3>');
console.log('    <p>{item.desc}</p>');
console.log('  </React.Fragment>');
console.log('));');

console.log('\\n✓ Use <> for simple grouping');
console.log('✓ Use <React.Fragment key={...}> for lists');
console.log('✓ Keeps DOM clean and semantic');`
  },
  {
    id: 'react-8',
    category: 'Basics',
    difficulty: 'Hard',
    question: 'React Portals - Rendering Outside Parent DOM',
    answer: `Advanced pattern asked at **Meta, Netflix, and Stripe**.

### What are Portals?
Render children into a DOM node outside the parent component's hierarchy.

### Syntax:
\`\`\`jsx
ReactDOM.createPortal(child, container)
\`\`\`

### Use Cases:
1. **Modals/Dialogs** - Render at document root
2. **Tooltips** - Avoid z-index/overflow issues
3. **Notifications** - Global toast messages
4. **Dropdowns** - Escape parent overflow

### Key Behavior:
- **Event bubbling still works** through React tree
- **Context still works** from parent
- **Physically rendered elsewhere** in DOM`,
    codeExample: `// React Portals
console.log('=== Portal Concept ===');

console.log('Component Tree:');
console.log('<App>');
console.log('  <Header />');
console.log('  <Main>');
console.log('    <Button onClick={openModal} />');
console.log('    <Modal /> {/* Portal renders outside Main */}');
console.log('  </Main>');
console.log('</App>');

console.log('\\nDOM Structure:');
console.log('<div id="root">');
console.log('  <div class="app">');
console.log('    <header>...</header>');
console.log('    <main>');
console.log('      <button>...</button>');
console.log('      {/* Modal NOT here */}');
console.log('    </main>');
console.log('  </div>');
console.log('</div>');
console.log('<div id="modal-root">');
console.log('  {/* Modal rendered HERE via portal */}');
console.log('  <div class="modal">...</div>');
console.log('</div>');

console.log('\\n=== Modal with Portal ===');

console.log('\\nfunction Modal({ children, onClose }) {');
console.log('  const modalRoot = document.getElementById("modal-root");');
console.log('  ');
console.log('  return ReactDOM.createPortal(');
console.log('    <div className="modal-overlay" onClick={onClose}>');
console.log('      <div className="modal-content" onClick={e => e.stopPropagation()}>');
console.log('        {children}');
console.log('      </div>');
console.log('    </div>,');
console.log('    modalRoot');
console.log('  );');
console.log('}');

console.log('\\n=== Event Bubbling Through Portal ===');

console.log('\\nfunction App() {');
console.log('  const handleClick = () => console.log("App clicked!");');
console.log('  ');
console.log('  return (');
console.log('    <div onClick={handleClick}>');
console.log('      <Modal>');
console.log('        <button>Click me</button>');
console.log('      </Modal>');
console.log('    </div>');
console.log('  );');
console.log('}');
console.log('');
console.log('// Clicking button triggers App handleClick!');
console.log('// Even though Modal is rendered outside div');

console.log('\\n=== Why Use Portals? ===');

console.log('\\n1. Avoid z-index stacking issues');
console.log('2. Escape parent overflow: hidden');
console.log('3. Render at document root for modals');
console.log('4. Keep React tree structure intact');

console.log('\\n✓ Portals: render elsewhere, behave normally');
console.log('✓ Events bubble through React tree');
console.log('✓ Context works from parent');`
  },
  {
    id: 'react-9',
    category: 'Basics',
    difficulty: 'Hard',
    question: 'Error Boundaries - Catching React Errors',
    answer: `Production requirement asked at **every company**.

### What are Error Boundaries?
Class components that catch JavaScript errors in child component tree.

### What They Catch:
- Rendering errors
- Lifecycle method errors
- Constructor errors in child tree

### What They DON'T Catch:
- Event handlers (use try/catch)
- Async code (setTimeout, promises)
- Server-side rendering
- Errors in error boundary itself

### Implementation:
Must implement \`componentDidCatch\` or \`static getDerivedStateFromError\`

### Best Practices:
- Place at strategic levels (route, feature)
- Log errors to service (Sentry, LogRocket)
- Show fallback UI
- Don't catch everything at root`,
    codeExample: `// Error Boundaries
console.log('=== Error Boundary Class Component ===');

console.log('class ErrorBoundary extends React.Component {');
console.log('  constructor(props) {');
console.log('    super(props);');
console.log('    this.state = { hasError: false, error: null };');
console.log('  }');
console.log('  ');
console.log('  static getDerivedStateFromError(error) {');
console.log('    // Update state so next render shows fallback');
console.log('    return { hasError: true, error };');
console.log('  }');
console.log('  ');
console.log('  componentDidCatch(error, errorInfo) {');
console.log('    // Log to error reporting service');
console.log('    console.error("Error caught:", error, errorInfo);');
console.log('    // logErrorToService(error, errorInfo);');
console.log('  }');
console.log('  ');
console.log('  render() {');
console.log('    if (this.state.hasError) {');
console.log('      return <h1>Something went wrong.</h1>;');
console.log('    }');
console.log('    return this.props.children;');
console.log('  }');
console.log('}');

console.log('\\n=== Usage ===');

console.log('\\nfunction App() {');
console.log('  return (');
console.log('    <ErrorBoundary>');
console.log('      <UserProfile /> {/* If this crashes, boundary catches it */}');
console.log('    </ErrorBoundary>');
console.log('  );');
console.log('}');

console.log('\\n=== Strategic Placement ===');

console.log('\\n<App>');
console.log('  <ErrorBoundary> {/* Top-level */}');
console.log('    <Header />');
console.log('    <ErrorBoundary> {/* Feature-level */}');
console.log('      <Dashboard />');
console.log('    </ErrorBoundary>');
console.log('    <ErrorBoundary>');
console.log('      <Settings />');
console.log('    </ErrorBoundary>');
console.log('  </ErrorBoundary>');
console.log('</App>');
console.log('');
console.log('If Dashboard crashes, Settings still works!');

console.log('\\n=== What Error Boundaries DON\\'T Catch ===');

console.log('\\n❌ Event Handlers:');
console.log('function Button() {');
console.log('  const handleClick = () => {');
console.log('    throw new Error("Oops!"); // Not caught by boundary!');
console.log('  };');
console.log('  return <button onClick={handleClick}>Click</button>;');
console.log('}');
console.log('');
console.log('✓ Solution: Use try/catch in event handler');

console.log('\\n❌ Async Code:');
console.log('useEffect(() => {');
console.log('  setTimeout(() => {');
console.log('    throw new Error("Async error"); // Not caught!');
console.log('  }, 1000);');
console.log('}, []);');

console.log('\\n✓ Error boundaries: production safety net');
console.log('✓ Place at strategic levels');
console.log('✓ Log errors to monitoring service');`
  },
  {
    id: 'react-10',
    category: 'Basics',
    difficulty: 'Medium',
    question: 'React.StrictMode - Development Tool',
    answer: `Important development practice asked at **senior interviews**.

### What is StrictMode?
A development-only tool that highlights potential problems.

### What It Does:
1. **Detects unsafe lifecycles** (legacy methods)
2. **Warns about deprecated APIs** (string refs, findDOMNode)
3. **Detects unexpected side effects** (double-invokes functions)
4. **Warns about legacy context API**

### Double Invocation:
In development, StrictMode intentionally double-invokes:
- Function component bodies
- useState/useReducer/useMemo initializers
- Class constructor, render, shouldComponentUpdate

### Why Double Invoke?
Helps find bugs caused by impure functions or missing cleanup.

### Production:
StrictMode has **zero impact** in production builds.`,
    codeExample: `// React.StrictMode
console.log('=== StrictMode Usage ===');

console.log('<React.StrictMode>');
console.log('  <App />');
console.log('</React.StrictMode>');
console.log('');
console.log('Or wrap specific parts:');
console.log('<App>');
console.log('  <Header />');
console.log('  <React.StrictMode>');
console.log('    <Dashboard /> {/* Only this is strict */}');
console.log('  </React.StrictMode>');
console.log('</App>');

console.log('\\n=== Double Invocation Demo ===');

let renderCount = 0;

function Counter() {
  renderCount++;
  console.log('[StrictMode] Render count:', renderCount);
  console.log('[StrictMode] In dev: renders twice');
  console.log('[StrictMode] In prod: renders once');
  
  const [count, setCount] = useState(() => {
    console.log('[StrictMode] useState initializer called');
    return 0;
  });
  
  useEffect(() => {
    console.log('[StrictMode] Effect runs');
    return () => console.log('[StrictMode] Cleanup runs');
  });
  
  return count;
}

Counter();

console.log('\\n=== Why Double Invoke? ===');

console.log('\\n❌ Impure Function (Bug):');
console.log('let globalCount = 0;');
console.log('');
console.log('function BadComponent() {');
console.log('  globalCount++; // Side effect in render!');
console.log('  return <div>{globalCount}</div>;');
console.log('}');
console.log('');
console.log('StrictMode renders twice → globalCount increments twice');
console.log('Helps you find the bug!');

console.log('\\n✓ Pure Function:');
console.log('function GoodComponent({ count }) {');
console.log('  return <div>{count}</div>; // No side effects');
console.log('}');
console.log('');
console.log('StrictMode renders twice → no issues');

console.log('\\n=== What StrictMode Detects ===');

console.log('\\n1. Unsafe Lifecycles:');
console.log('   • componentWillMount');
console.log('   • componentWillReceiveProps');
console.log('   • componentWillUpdate');

console.log('\\n2. Deprecated APIs:');
console.log('   • String refs: ref="myRef"');
console.log('   • findDOMNode()');
console.log('   • Legacy context');

console.log('\\n3. Unexpected Side Effects:');
console.log('   • Mutations during render');
console.log('   • Missing effect cleanup');

console.log('\\n✓ Always use StrictMode in development');
console.log('✓ Zero impact in production');
console.log('✓ Catches bugs early');`
  }
];


    react: {
        id: 'react',
        title: 'React Internals: Under the Hood',
        description: 'Move beyond "How to use Hooks". Learn how React Fiber works, concurrent rendering, and Server Components.',
        totalDays: 15,
        days: [
            // --- WEEK 1: CORE INTERNALS ---
            {
                day: 1,
                title: 'The Virtual DOM & Reconciliation',
                intro: "React is not just a UI library; it's a state-to-view engine. The core algorithm is 'Reconciliation'.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Diffing Algorithm</h3>
<p class="mb-4">React compares the new VDOM tree with the old one.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-blue-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ Old Tree ]        [ New Tree ]
    div                 div
     │                   │
     ├── h1              ├── h1 (Same? Keep.)
     │                   │
     └── ul              └── p  (Different Type?)
         │                      (DESTROY UL, BUILD P)
       li, li
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. The "Key" Prop</h3>
<p>Without keys, React can't tell if an item moved or was replaced. It destroys performance.</p>
                `,
                code: `// Example 1: The VDOM Object
const element = React.createElement('div', { id: 'foo' }, 'Hello');
// Returns:
// {
//   type: 'div',
//   props: { id: 'foo', children: 'Hello' },
//   key: null,
//   $$typeof: Symbol.for('react.element')
// }`,
                interview: {
                    questions: [
                        { q: "What is Reconciliation?", a: "The process of comparing the current tree with the new tree to determine the minimum number of operations to apply to the real DOM." },
                        { q: "Why is direct DOM manipulation bad in React?", a: "Because React's VDOM will be out of sync with the real DOM. The next render might overwrite your manual changes." },
                        { q: "What is the `key` prop used for?", a: "To identify which items in a list have changed, are added, or are removed. It helps React preserve state (like input values) of moving elements." }
                    ]
                }
            },
            {
                day: 2,
                title: 'React Fiber Architecture',
                intro: "Before React 16, rendering was synchronous (Stack Reconciler). Fiber made it asynchronous and interruptible.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Stack vs Fiber</h3>
<div class="grid grid-cols-2 gap-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-lg">
        <h4 class="text-red-400 font-bold mb-2">Stack (Old)</h4>
        <p class="text-sm text-light-400">Recursive. Blocks main thread until done. Like a generic function call.</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-lg">
        <h4 class="text-green-400 font-bold mb-2">Fiber (New)</h4>
        <p class="text-sm text-light-400">Linked List. Can pause, abort, and prioritize work. Like a Virtual CPU.</p>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. The Fiber Node</h3>
<p>Each component becomes a "Fiber" node (a unit of work).</p>
                `,
                code: `// Example 1: Fiber Structure (Simplified)
// {
//   type: 'div',
//   stateNode: [DOM Element],
//   child: [FiberNode],
//   sibling: [FiberNode],
//   return: [FiberNode], (Parent)
// }`,
                interview: {
                    questions: [
                        { q: "What is the main goal of React Fiber?", a: "To enable incremental rendering. To split rendering work into chunks and spread it out over multiple frames to avoid blocking the main thread." },
                        { q: "What is 'Time Slicing'?", a: "The ability to execute React updates in small time slots (5ms) and yield back to the browser to handle events." },
                        { q: "Does Fiber make React faster?", a: "Not necessarily faster in total CPU time, but *perceived* performance is better because it stays responsive to user input." }
                    ]
                }
            },
            {
                day: 3,
                title: 'Render Phase vs Commit Phase',
                intro: "React updates happen in two distinct phases. Understanding this explains why `useEffect` runs when it does.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Two Phases</h3>
<div class="space-y-4 mb-6">
    <div class="bg-dark-900 p-4 rounded-lg border-l-4 border-blue-500">
        <h4 class="font-bold text-blue-300">Phase 1: Render (Calculation)</h4>
        <p class="text-sm text-light-400">React calls your component. Compares children. <strong class="text-white">Interruptible.</strong> No Side Effects allowed!</p>
    </div>
    <div class="bg-dark-900 p-4 rounded-lg border-l-4 border-green-500">
        <h4 class="font-bold text-green-300">Phase 2: Commit (Action)</h4>
        <p class="text-sm text-light-400">React touches the DOM. Runs <code>useEffect</code>. <strong class="text-white">Synchronous.</strong></p>
    </div>
</div>
                `,
                code: `// Example 1: Where Side Effects Go
function Component() {
    // Render Phase: Runs multiple times!
    console.log("Rendering..."); 
    // BAD: Don't do API calls here.

    useEffect(() => {
        // Commit Phase (After Paint):
        console.log("Mounted / Updated");
        // GOOD: Side effects here.
    });
}`,
                interview: {
                    questions: [
                        { q: "Can Render Phase run without Commit Phase?", a: "Yes. In Concurrent Mode, React might start rendering, be interrupted by high-priority work, and throw away the partial work without ever committing to the DOM." },
                        { q: "Why shouldn't you mutate variables in the Render Phase?", a: "Because the Render Phase can run multiple times or be restarted. Mutations would lead to unpredictable state." },
                        { q: "Difference between useEffect and useLayoutEffect?", a: "`useLayoutEffect` blocks the browser paint. `useEffect` runs after the paint. Use Layout for measurements to prevent visual flickering." }
                    ]
                }
            },
            {
                day: 4,
                title: 'State Batching & Automatic Batching',
                intro: "React doesn't re-render every time you call `setState`. It groups them for performance.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Automatic Batching (React 18)</h3>
<p class="mb-4">React groups multiple state updates into a <strong>single re-render</strong>.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-yellow-300 mb-6 overflow-x-auto shadow-inner">
<pre>
Click Handler
  │
  ├── setCount(1)  (Pending)
  ├── setFlag(true) (Pending)
  │
  ▼
[ End of Event Loop ] ──▶ Re-render ONCE!
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Opting Out</h3>
<p>Use <code>flushSync</code> if you need the DOM to update <strong>immediately</strong> (rare).</p>
                `,
                code: `// Example 1: Automatic Batching
function handleClick() {
    setCount(c => c + 1);
    setFlag(f => !f);
    // React 18: ONE re-render only.
    // Even inside setTimeout or fetch!
}`,
                interview: {
                    questions: [
                        { q: "What is Batching?", a: "Grouping multiple state updates into a single re-render to avoid unnecessary layout thrashing." },
                        { q: "Does `setState` always trigger a re-render?", a: "No. If you set the state to the exact same value (referential equality), React bails out." },
                        { q: "Why is `setState` asynchronous?", a: "It's not truly 'async' like a Promise, but it is 'scheduled'. React waits to see if other updates are coming before processing." }
                    ]
                }
            },
            {
                day: 5,
                title: 'Synthetic Events',
                intro: "React doesn't attach listeners to every button. It uses one global listener. This is Event Delegation.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Event Delegation</h3>
<p class="mb-4">Instead of 1000 listeners on 1000 buttons, React puts <strong>ONE listener</strong> on the <code>#root</code> div.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-teal-300 mb-6 overflow-x-auto shadow-inner">
<pre>
   [ #root ]  <-- One Listener here
      ▲
      │ (Bubbles Up)
   [ div ]
      ▲
      │
   [ button ] (User clicks here)
</pre>
</div>
                `,
                code: `// Example 1: Stop Propagation
function handleClick(e) {
    e.stopPropagation(); // Stops React event bubbling
    // Does NOT stop native event bubbling up to document!
}`,
                interview: {
                    questions: [
                        { q: "Why does React use Synthetic Events?", a: "1. Cross-browser consistency. 2. Performance (fewer event listeners on the DOM via delegation)." },
                        { q: "Where does React attach the event listener?", a: "React 16: `document`. React 17+: The root DOM container (`#root`). This helps with Micro-frontends." }
                    ]
                }
            },
            {
                day: 6,
                title: 'Advanced Hooks: useRef & useImperativeHandle',
                intro: "`useRef` is not just for DOM elements. It's a mutable container that doesn't trigger re-renders.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The "Box" Metaphor</h3>
<p class="mb-4"><code>useRef</code> is like a box you can put things in. Changing the contents of the box doesn't alert React.</p>

<h3 class="text-xl font-bold text-white mb-4">2. useImperativeHandle</h3>
<p>Normally, data flows Down. This hook lets parents reach "In" and call methods on children.</p>
                `,
                code: `// Example 1: Previous Value Hook
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}`,
                interview: {
                    questions: [
                        { q: "When does useRef update trigger a re-render?", a: "Never. Changing `ref.current` is a side effect and does not notify React's render cycle." },
                        { q: "Why use `forwardRef`?", a: "Functional components don't accept a `ref` prop by default. `forwardRef` allows you to pass a ref down to a child DOM element." }
                    ]
                }
            },
            {
                day: 7,
                title: 'Memoization: useMemo & useCallback',
                intro: "Don't optimize prematurely. But when you do, know Referential Equality.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Referential Equality</h3>
<p class="mb-4"><code>{} === {}</code> is <strong>FALSE</strong>.</p>
<p class="mb-4">Every render, function components create <strong>new</strong> function instances. This breaks <code>React.memo</code> unless you use <code>useCallback</code>.</p>

<h3 class="text-xl font-bold text-white mb-4">2. When to Memoize?</h3>
<ul class="list-disc list-inside space-y-2 bg-dark-800 p-4 rounded-lg">
    <li>Passing props to a <code>React.memo</code> child.</li>
    <li>Expensive calculations (filtering 10k items).</li>
    <li>Dependency for <code>useEffect</code>.</li>
</ul>
                `,
                code: `// Example 1: Breaking Memo
const Child = React.memo(({ onClick }) => {
    console.log("Child Render");
    return <button onClick={onClick}>Click</button>;
});

function Parent() {
    // This creates a NEW function every render
    // causing Child to re-render despite React.memo
    const handleClick = () => console.log("Hi"); 
    
    // Fix:
    const memoClick = useCallback(() => console.log("Hi"), []);

    return <Child onClick={memoClick} />;
}`,
                interview: {
                    questions: [
                        { q: "Should you wrap everything in useCallback?", a: "No. It has a cost (memory allocation + dependency checking). Only use it when passing props to memoized children or as dependencies to useEffect." },
                        { q: "What is `React.memo`?", a: "A Higher Order Component that shallowly compares props. If props haven't changed, it skips re-rendering the component." },
                        { q: "Difference between useMemo and React.memo?", a: "`useMemo` caches a value *inside* a component. `React.memo` caches the *entire component* based on props." }
                    ]
                }
            },
            // --- WEEK 2: PATTERNS & ARCHITECTURE ---
            {
                day: 8,
                title: 'Context API: Performance Pitfalls',
                intro: "Context is great for global state, but it triggers re-renders for ALL consumers. Learn how to optimize it.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Blast Radius</h3>
<p class="mb-4">If the Context Value changes (even a new object reference), <strong>EVERY</strong> component using <code>useContext</code> re-renders.</p>

<h3 class="text-xl font-bold text-white mb-4">2. The Solution: Split Context</h3>
<p>Don't put everything in one God Context. Split "User" from "Theme" from "Settings".</p>
                `,
                code: `// Example 1: The Fix
const StateCtx = createContext();
const DispatchCtx = createContext();

function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, init);
    
    return (
        <DispatchCtx.Provider value={dispatch}>
            <StateCtx.Provider value={state}>
                {children}
            </StateCtx.Provider>
        </DispatchCtx.Provider>
    );
}`,
                interview: {
                    questions: [
                        { q: "Why does Context cause re-renders?", a: "Because when the Provider's `value` prop changes (referentially), React forces an update on every component consuming that context." },
                        { q: "Is Context a replacement for Redux?", a: "Context is a Dependency Injection mechanism. Redux is a State Management library (with middleware, devtools, etc.). Context + useReducer is *like* Redux, but lacks the performance optimizations of Redux selectors." }
                    ]
                }
            },
            {
                day: 9,
                title: 'Custom Hooks: The Power of Composition',
                intro: "Custom hooks are just functions that can use other hooks. They allow logic reuse without component hierarchy nesting.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Logic Extraction</h3>
<p class="mb-4">UI belongs in Components. Logic belongs in Hooks.</p>

<h3 class="text-xl font-bold text-white mb-4">2. The Rules</h3>
<ul class="list-disc list-inside space-y-2 bg-dark-800 p-4 rounded-lg">
    <li>Must start with "use" (e.g., <code>useWindowSize</code>).</li>
    <li>Must be called at top level (no loops/ifs).</li>
</ul>
                `,
                code: `// Example 1: useWindowSize
function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 });
    
    useEffect(() => {
        const handle = () => setSize({ 
            width: window.innerWidth, 
            height: window.innerHeight 
        });
        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, []);
    
    return size;
}`,
                interview: {
                    questions: [
                        { q: "Do two components using the same custom hook share state?", a: "No. Each time you call a hook, it creates a fully isolated state for *that* component instance. To share state, use Context." },
                        { q: "Why must hooks be at the top level?", a: "React relies on the *order* of hook calls to track state. If you put a hook in an `if`, the order changes, and React loses track of which state belongs to which hook." }
                    ]
                }
            },
            {
                day: 10,
                title: 'HOCs vs Render Props vs Hooks',
                intro: "React has evolved. Understand the history to maintain legacy code and appreciate Hooks.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Evolution of Reuse</h3>
<div class="space-y-4 mb-6">
    <div class="bg-dark-800 p-3 rounded">
        <strong>2015: Mixins</strong> (Dead).
    </div>
    <div class="bg-dark-800 p-3 rounded">
        <strong>2016: HOCs</strong> (Wrapper Hell).
    </div>
    <div class="bg-dark-800 p-3 rounded">
        <strong>2017: Render Props</strong> (Callback Hell).
    </div>
    <div class="bg-brand-primary/20 border border-brand-primary p-3 rounded">
        <strong>2019: Hooks</strong> (The Solution).
    </div>
</div>
                `,
                code: `// Example 1: HOC
function withAuth(Component) {
    return function Wrapped(props) {
        if (!props.isLoggedIn) return <Login />;
        return <Component {...props} />;
    }
}

// Example 2: Hooks (Better)
function Profile() {
    const { isLoggedIn } = useAuth(); // Clean!
    if (!isLoggedIn) return <Login />;
    return <Dashboard />;
}`,
                interview: {
                    questions: [
                        { q: "What problem do Hooks solve that HOCs couldn't?", a: "Hooks solve 'Wrapper Hell' (deeply nested component trees just to share logic) and allow splitting unrelated logic in lifecycle methods." },
                        { q: "Are Class Components deprecated?", a: "Not officially, but new features (Server Components, Concurrent features) work best with functional components." }
                    ]
                }
            },
            {
                day: 11,
                title: 'Error Boundaries & Portals',
                intro: "Handling errors gracefully and rendering outside the DOM hierarchy.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Error Boundaries</h3>
<p class="mb-4">The "Catch Block" for components. Must be a Class Component.</p>

<h3 class="text-xl font-bold text-white mb-4">2. Portals</h3>
<p>Teleporting a child to <code>body</code> (for Modals) while keeping the React event bubble chain intact.</p>
                `,
                code: `// Example 1: Error Boundary
class ErrorBoundary extends React.Component {
    state = { hasError: false };
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) return <h1>Something went wrong.</h1>;
        return this.props.children;
    }
}`,
                interview: {
                    questions: [
                        { q: "Can `try/catch` handle React rendering errors?", a: "No. `try/catch` only works for imperative code. React rendering is declarative. You must use Error Boundaries." },
                        { q: "Does Event Bubbling work through Portals?", a: "Yes! Even if the portal is rendered in `<body>`, a click inside it will bubble up to the React parent component, because the React Tree persists." }
                    ]
                }
            },
            // --- WEEK 3: THE FUTURE ---
            {
                day: 12,
                title: 'Concurrent Mode & Suspense',
                intro: "The biggest architectural shift. Rendering is no longer blocking. React can 'pause' to load data.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Suspense</h3>
<p class="mb-4">Declarative loading states. "Show this skeleton while this component is loading."</p>

<h3 class="text-xl font-bold text-white mb-4">2. Transitions</h3>
<p>Marking an update as "Non-Urgent". Keeps the UI responsive.</p>
                `,
                code: `// Example 1: Suspense
<Suspense fallback={<Spinner />}>
    <LazyComponent />
</Suspense>

// Example 2: Transitions
const [isPending, startTransition] = useTransition();

function handleChange(e) {
    setQuery(e.target.value); // Urgent
    startTransition(() => {
        setList(filter(e.target.value)); // Low Priority
    });
}`,
                interview: {
                    questions: [
                        { q: "What does 'Interruptible Rendering' mean?", a: "React can start rendering a large tree, pause after 5ms to handle a button click, and then resume (or restart) the render." },
                        { q: "How does Suspense know a component is loading?", a: "The component 'throws' a Promise (like an Error). React catches it, sees it's a Promise, and renders the Fallback until the Promise resolves." }
                    ]
                }
            },
            {
                day: 13,
                title: 'React Server Components (RSC)',
                intro: "The paradigm shift. Components that run ONLY on the server and send zero JS to the client.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Zero Bundle Size</h3>
<p class="mb-4">RSC code <strong>never</strong> goes to the browser. You can import huge libraries (markdown, heavy date parsers) freely.</p>

<h3 class="text-xl font-bold text-white mb-4">2. The Boundary</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-green-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ Server ]
   │
   ├── Page.jsx (Fetch DB)
   │
   └── [ Client Boundary ]
           │
           ▼
       [ Browser ]
           InteractiveButton.jsx (onClick)
</pre>
</div>
                `,
                code: `// Example 1: Server Component (app/page.js)
import db from 'db';

async function Page() {
    // Direct DB access!
    const data = await db.query('SELECT * FROM posts');
    
    return (
        <div>
            {data.map(post => <Post key={post.id} data={post} />)}
            <ClientButton />
        </div>
    );
}`,
                interview: {
                    questions: [
                        { q: "Can Server Components import Client Components?", a: "Yes. This is the main pattern." },
                        { q: "Can Client Components import Server Components?", a: "No. Because Client components run in the browser, they cannot execute server code." },
                        { q: "How does RSC differ from SSR?", a: "SSR returns HTML (string) for the initial load. RSC returns a data format (stream) that React merges into the existing tree *without destroying state*." }
                    ]
                }
            },
            {
                day: 14,
                title: 'Hydration & SSR',
                intro: "SSR sends HTML. Hydration makes it interactive. It's the most fragile part of React.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Hydration Mismatch</h3>
<p class="mb-4">If the Server HTML !== Client HTML, React gets confused and may bail out, causing a full re-render.</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
    <span class="text-red-400 font-bold">Classic Bug:</span> Rendering <code>new Date()</code> or <code>Math.random()</code> directly in the JSX.
</div>
                `,
                code: `// Example 1: The Date Problem
function Clock() {
    // BAD: Server says 10:00, Client says 10:01 -> Mismatch
    // return <div>{new Date().time}</div>;
    
    // GOOD: Use Effect
    const [time, setTime] = useState(null);
    useEffect(() => setTime(new Date().time), []);
    return <div>{time}</div>;
}`,
                interview: {
                    questions: [
                        { q: "What is 'Streaming SSR'?", a: "Instead of waiting for the *entire* HTML to generate, the server sends chunks as they are ready. React hydrates parts of the page progressively." },
                        { q: "What is 'Islands Architecture'?", a: "Keeping most of the page static HTML and only 'hydrating' small interactive islands. React Server Components is moving towards this." }
                    ]
                }
            },
            {
                day: 15,
                title: 'Testing React Applications',
                intro: "Stop testing implementation details (state, class names). Test behavior.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Testing Library Philosophy</h3>
<p class="mb-4">"The more your tests resemble the way your software is used, the more confidence they can give you."</p>

<ul class="list-disc list-inside space-y-2 bg-dark-800 p-4 rounded-lg">
    <li>Use <code>getByRole</code>, <code>getByText</code>.</li>
    <li>Avoid <code>container.querySelector('.my-class')</code>.</li>
</ul>
                `,
                code: `// Example 1: Good Test
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('login flow', async () => {
    render(<Login />);
    
    const input = screen.getByLabelText(/username/i);
    await userEvent.type(input, 'admin');
    
    const btn = screen.getByRole('button', { name: /login/i });
    await userEvent.click(btn);
    
    expect(await screen.findByText(/welcome/i)).toBeInTheDocument();
});`,
                interview: {
                    questions: [
                        { q: "Why is `shallow` rendering considered bad practice now?", a: "Shallow rendering mocks child components. This makes tests brittle and doesn't test integration. RTL encourages full rendering." },
                        { q: "How to test Custom Hooks?", a: "Use `renderHook` from `@testing-library/react-hooks`." }
                    ]
                }
            }
        ]
    },

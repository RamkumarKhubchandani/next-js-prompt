export const architectureQuestions = [
  {
    id: 'js-51',
    category: 'Architect',
    difficulty: 'Expert',
    question: 'Microtasks vs Macrotasks: Why does it matter?',
    answer: `The Event Loop has **two** queues, and understanding the priority difference is critical for performance tuning.

### 1. Microtask Queue (Starvation Risk)
- **Priority:** **HIGHEST**. The Event Loop *must* empty this queue completely before moving on.
- **Contents:** \`Promise.then\`, \`queueMicrotask\`, \`MutationObserver\`.
- **Trap:** If you recursively queue microtasks (e.g., \`Promise.resolve().then(loop)\`), you will block the UI indefinitely. The browser will freeze because it never gets a chance to render.

### 2. Macrotask Queue (Task Queue)
- **Priority:** Normal.
- **Contents:** \`setTimeout\`, \`setInterval\`, I/O, UI Rendering, User Events (click).
- **Behavior:** The loop picks **ONE** task, executes it, then checks the Microtask queue again. This interaction allows the browser to "breathe" (calculate layout/paint) between tasks.

### Architect Note:
When designing heavy computation (e.g., processing 10k items):
- **Don't** use Promises for dividing work (Microtasks block rendering).
- **Do** use \`setTimeout(..., 0)\` or \`requestIdleCallback\` to split work into Macrotasks, keeping the UI responsive.`,
    codeExample: `console.log('1. Script Start');

// Macrotask
setTimeout(() => console.log('4. setTimeout'), 0);

// Microtask
Promise.resolve().then(() => console.log('3. Promise'));

console.log('2. Script End');

// Order of execution:
// 1. Script Start
// 2. Script End
// 3. Promise (Always runs before next strict Macrotask)
// 4. setTimeout`
  },
  {
    id: 'js-52',
    category: 'Architect',
    difficulty: 'Expert',
    question: 'Explain V8 "Hidden Classes" and Inline Caching.',
    answer: `This is a low-level optimization used by V8 (Chrome/Node) to make dynamic JavaScript run almost as fast as static C++.

### 1. Hidden Classes (Shapes)
JavaScript objects are dynamic dictionaries (hash maps). Searching a hash map is slow ($O(1)$ but with overhead).
V8 creates internal C++ classes ("Shapes") for objects that share the same structure.
- **Scenario:** If you create two objects \`objA\` and \`objB\` and add properties \`x\` then \`y\` to both, they share the **same** Hidden Class.
- **De-opt:** If you add \`x\` then \`y\` to A, but \`y\` then \`x\` to B, they get **different** Hidden Classes.

### 2. Inline Caching (IC)
When you access \`obj.x\`, V8 "caches" the memory offset of \`x\` in the machine code.
- **Monomorphic IC (Fast):** The function always sees objects of the *same* Hidden Class. Direct memory access.
- **Megamorphic IC (Slow):** The function sees many different object shapes. V8 gives up and uses slow hash lookup.

### Best Practices
1. **Initialize properties in Constructor:** Don't add properties lazily.
2. **Same Order:** Always set properties in the same order.
3. **Avoid \`delete\`:** Setting to \`null\` is preferred. Deleting changes the Hidden Class.`,
    codeExample: `// Fast (Same Hidden Class)
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const p1 = new Point(1, 2);
const p2 = new Point(3, 4);

// Slow (Different Hidden Classes)
const o1 = { x: 1 };
o1.y = 2; // Shape A -> B

const o2 = { y: 2 }; 
o2.x = 1; // Shape C -> D (Different path!)`
  },
  {
    id: 'js-53',
    category: 'Architect',
    difficulty: 'Expert',
    question: 'Service Workers vs Web Workers?',
    answer: `While both run on background threads, they solve fundamentally different problems.

### Web Workers (Multithreading)
- **Purpose:** Offload heavy CPU computations from the Main Thread to prevent UI freezing.
- **Lifespan:** Tied to the lifecycle of the tab/page. Dies when tab is closed.
- **Capabilities:** No DOM access. Pure computation.
- **Use Case:** Parsing 50MB JSON, Image filtering, Complex Math.

### Service Workers (Network Proxy)
- **Purpose:** Act as a proxy server between your web app and the internet.
- **Lifespan:** Independent! Installed on the browser. Can run even if the user has closed the tab (e.g., Push Notifications).
- **Capabilities:** Intercept network requests (\`fetch\`), Cache resources.
- **Use Case:** **PWA (Offline Mode)**, Background Sync, Push Notifications.

### Visual Mental Model
- **Web Worker:** A generic background employee processing data for you.
- **Service Worker:** A security guard at the door checking every packet that comes in and out.`,
    codeExample: `// Service Worker: Caching Logic
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      // Return cached version OR fetch network
      return cached || fetch(event.request);
    })
  );
});

// Web Worker: CPU Task
// worker.js
self.onmessage = (e) => {
  const result = heavyCalculation(e.data);
  postMessage(result);
};`
  },
  {
    id: 'js-56',
    category: 'Architect',
    difficulty: 'Expert',
    question: 'Why avoid `delete` keyword in performance-critical code?',
    answer: `The \`delete\` keyword is semantic poison for V8's optimization engines.

### The Problem: Dictionary Mode
V8 relies on **Hidden Classes** (fixed memory offsets) to access properties quickly.
When you use \`delete object.property\`:
1. You alter the structure of the object dynamically.
2. V8 typically gives up on optimizing this specific object.
3. It switches the object storage to **Dictionary Mode** (Hash Table).
4. **Impact:** Property access becomes 10x-20x slower for that object.

### The Solution
Instead of removing the key, set its value to a "empty" indicator.
- **Use:** \`obj.prop = null\` or \`obj.prop = undefined\`.
- **Benefit:** The "shape" of the object remains stable (it still has the key), so the Hidden Class is preserved.`,
    codeExample: `const fast = { a: 1, b: 2 };
fast.a = null; // Fast. Shape preserved.

const slow = { a: 1, b: 2 };
delete slow.a; // Slow. Terminated to Dictionary Mode.`
  },
  {
    id: 'js-57',
    category: 'Architect',
    difficulty: 'Expert',
    question: 'CommonJS vs ES Modules: The technical deep dive.',
    answer: `This is the biggest split in the JS ecosystem.

### CommonJS (CJS) - \`require()\`
- **Native to:** Node.js (Legacy).
- **Behavior:** **Synchronous** & **Dynamic**. You can put \`require\` inside an \`if\` statement.
- **Export:** It exports a **copy** of the object.
- **Problem:** Because it's dynamic, tools (Webpack) cannot perform "Tree Shaking" efficiently because they can't predict what will be used at runtime.

### ES Modules (ESM) - \`import\`
- **Native to:** Browsers & Modern Node.js.
- **Behavior:** **Statical** & **Asynchronous**. Imports must be at the top level.
- **Export:** It exports a **live binding** (reference). If the exporting module updates the value, the importer sees the change immediately!
- **Benefit:** Allows **Tree Shaking** (Dead code elimination) because usage is predictable at build time.

### Mutable Bindings Example
In CJS, if you import \`count\`, it's just a number variable.
In ESM, if you import \`count\`, it's a pointer to the original memory. If the module increments it, your import updates.`,
    codeExample: `// --- CJS ---
// lib.js
let count = 1;
module.exports = { count, inc: () => count++ };

// main.js
const { count, inc } = require('./lib');
inc();
console.log(count); // 1 (Copy! Does not update)


// --- ESM ---
// lib.mjs
export let count = 1;
export const inc = () => count++;

// main.mjs
import { count, inc } from './lib.mjs';
inc();
console.log(count); // 2 (Live Binding!)`
  },
  {
    id: 'js-60',
    category: 'Architect',
    difficulty: 'Expert',
    question: 'How does Garbage Collection (Mark and Sweep) work in V8?',
    answer: `JavaScript is garbage collected, meaning you don't manually free memory (like malloc/free in C). V8 uses a **Graph-based** algorithm called "Mark and Sweep".

### The Algorithm:
1. **Roots:** The GC assumes certain objects are always "alive" (Global Window, currently executing function stack, DOM roots).
2. **Mark Phase:** It traverses the graph from the Roots. Every object it can "reach" (follow a reference to) is marked as **active**.
   - It handles circular references (\`A -> B -> A\`) naturally. Since neither is reachable from Root, both are marked dead.
3. **Sweep Phase:** It scans the entire memory heap. Any object that was **NOT** marked is considered garbage. Its memory is released.

### Generations (The "Nursery"):
V8 has two heaps: **New Space** and **Old Space**.
- New objects are born in New Space.
- If they survive 2 GC cycles (Minor GC), they are moved to Old Space (Major GC).
- This optimization means short-lived variables (loop counters) are cleaned up extremely fast.`,
    codeExample: null
  },
  {
    id: 'js-63',
    category: 'Architect',
    difficulty: 'Expert',
    question: 'Deep Copy: JSON.parse vs Recursive vs StructuredClone?',
    answer: `Cloning an object is surprisingly complex in JS.

### 1. The Hack: \`JSON.parse(JSON.stringify(x))\`
- **Pros:** Fast, native text parsing.
- **Cons:** **Data Loss**.
  - \`Date\` -> String.
  - \`Set/Map\` -> Empty Object.
  - \`undefined/Function\` -> Removed completely.
  - Circular refs -> Throw Error.

### 2. The Standard: \`structuredClone(x)\`
- **Status:** Modern Browsers & Node 17+.
- **Behavior:** Uses the "Structured Clone Algorithm" (same as Web Workers).
- **Pros:** Handles \`Date\`, \`Set\`, \`Map\`, \`RegExp\`, Circular Refs.
- **Cons:** Cannot clone \`Function\` or \`DOM Element\` (throws DataCloneError).

### 3. The Manual: Recursive Copy
Required if you need to handle special cases like cloning functions or preserving Prototype chains.`,
    codeExample: `const complex = {
  set: new Set([1]),
  date: new Date(),
  fn: () => {},
  circ: null
};
complex.circ = complex;

// 1. JSON
// JSON.parse(JSON.stringify(complex)); // Error (Circular)

// 2. structuredClone
const clone = structuredClone(complex);
console.log(clone.set.has(1)); // true (Kept Set)
console.log(clone.date.getFullYear()); // Works
// clone.fn will be missing! (Cannot clone functions)`
  },
  {
    id: 'js-66',
    category: 'Architect',
    difficulty: 'Expert',
    question: 'What is the "Virtual DOM" really? (vs Signals)',
    answer: `The Virtual DOM (VDOM) is a performance mitigation strategy for the actual DOM, which is slow.

### Virtual DOM (React Pattern)
The DOM is expensive to write to.
1. **Render Phase:** React calls your component functions. It doesn't touch the DOM. It creates a lightweight JavaScript object tree representation.
2. **Diffing:** It compares this New Tree with the Old Tree from the previous render.
3. **Commit Phase:** It calculates the *minimal* set of DOM operations (e.g., "Change text of Node #3") and applies them to the real DOM.
- **Bottleneck:** computation. React must re-run your function and diffuse the tree on *every* state change to find differences.

### Signals (Solid, Vue, Preact)
These frameworks accept a fundamentally different architecture.
- Instead of "re-run everything and diff", they use fine-grained subscriptions.
- A "Signal" is a value that knows who is listening to it.
- **Update:** When a signal changes, it notifies **only** the precise text node or attribute that depends on it. Ideally, **zero** components re-render. Only the DOM node updates.`,
    codeExample: `// React (Pull / Top-Down)
function App() {
  // Runs entirely on every setCounter
  const [count, setCounter] = useState(0); 
  return <div>{count}</div>;
}

// Signals (Push / Fine-Grained)
// The function runs ONCE.
function App() {
  const count = createSignal(0);
  // The setup code runs once. 
  // The framework binds the DOM node update directly to the signal.
  return <div>{count()}</div>;
}`
  },
  {
    id: 'js-68',
    category: 'Architect',
    difficulty: 'Expert',
    question: 'Server-Sent Events (SSE) vs WebSockets?',
    answer: `Choosing the right real-time protocol.

### WebSockets (WS)
- **Nature:** Full Duplex (2-way).
- **Protocol:** Special TCP upgrade (\`ws://\`). Not HTTP.
- **Pros:** Client can send messages to Server efficiently. Low latency.
- **Cons:** Harder to load balance (stateful connections), firewall issues, no built-in reconnection logic.
- **Best For:** Multiplayer Games, Chat Apps, Collaborative Doc Editing.

### Server-Sent Events (SSE)
- **Nature:** One-Way (Server -> Client).
- **Protocol:** Standard HTTP (\`text/event-stream\`).
- **Pros:**
  - **Auto-Reconnect** built-in by the browser.
  - Passes through corporate firewalls/proxies easily.
  - Simple API (\`EventSource\`).
- **Cons:** Client cannot send data (must use separate fetch).
- **Best For:** Stock Tickers, Crypto Prices, News Feeds, Notification Badges.`,
    codeExample: `// SSE Usage
const sse = new EventSource('/api/stream');
sse.onmessage = (msg) => {
  console.log("New Update:", JSON.parse(msg.data));
};
// Browser automatically attempts reconnects if dropped!`
  },
  {
    id: 'js-70',
    category: 'System Design',
    difficulty: 'Expert',
    question: 'How would you design a "Google Search" auto-complete?',
    answer: `This is a classic frontend system design question focusing on Performance and UX.

### 1. Throttling/Debouncing (Network)
- **Problem:** Typing "React" fires 5 requests (r, re, rea...).
- **Solution:** **Debounce** the input by 300ms. Only request when user *stops* typing.

### 2. Caching (Memory)
- **Structure:** Hash Map / LRU Cache.
- **Logic:** \`cache = { "rea": ["react", "reading"] }\`.
- Before fetching, check \`cache[input]\`. If exists, show immediately (0 latency).

### 3. Race Conditions (Async)
- **Scenario:** Request A ("Reac") takes 2s. Request B ("React") takes 0.1s.
- **Bug:** User sees results for "React", then suddenly results for "Reac" overwrite them because the old request finished late.
- **Fix:** Use \`AbortController\` to cancel previous pending requests, or track a \`reqId\` and ignore stale responses.

### 4. Accessibility
- Use \`aria-activedescendant\` for keyboard navigation (Arrow Down).`,
    codeExample: `let currentController = null;

async function onSearch(query) {
  // 1. Check Cache
  if (cache.has(query)) return render(cache.get(query));

  // 2. Abort Stale Request
  if (currentController) currentController.abort();
  currentController = new AbortController();

  try {
    const res = await fetch(\`/api?q=\${query}\`, { signal: currentController.signal });
    const data = await res.json();
    cache.set(query, data); // 3. Set Cache
    render(data);
  } catch (err) {
    if (err.name === 'AbortError') return; // Ignore cancelled
  }
}`
  },
  {
    id: 'js-71',
    category: 'System Design',
    difficulty: 'Expert',
    question: 'How to handle "Infinite Scroll" performantly?',
    answer: `The naive solution (listen to scroll event + append divs) crashes the browser after 500 items.

### 1. Detection: IntersectionObserver
- **Avoid:** \`window.addEventListener('scroll')\`. It fires wildly on every pixel.
- **Use:** \`IntersectionObserver\`. Place a invisible \`<div id="sentinel">\` at the end of the list. When it becomes visible, fetch next page.

### 2. Rendering: Virtualization (Windowing)
- **Problem:** DOM size. 5,000 \`<div>\` elements consume massive RAM and slow down style recalculations.
- **Solution:** **Virtualization**. Only render the items currently visible in the "Window" (plus a small buffer).
- When user scrolls down, UNMOUNT top items and MOUNT bottom items.
- Use absolute positioning or padding to fake the scrollbar height so it feels like a large list.

### 3. Image Optimization
- \`loading="lazy"\` on images.
- Decode images asynchronously (\`img.decode()\`).`,
    codeExample: `// Observer Pattern
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreItems();
  }
});

observer.observe(document.querySelector('#sentinel'));`
  },
  {
    id: 'js-72',
    category: 'System Design',
    difficulty: 'Expert',
    question: 'Explain the CAP Theorem.',
    answer: `In a distributed system, you can only have 2 of the following 3 guarantees:

### 1. Consistency (C)
Every read receives the most recent write or an error. (All nodes see same data).

### 2. Availability (A)
Every request receives a (non-error) response, without the guarantee that it contains the most recent write.

### 3. Partition Tolerance (P)
The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network between nodes.

### The Trade-off
Since network partitions (P) are inevitable in distributed systems, you must choose between **CP** (Consistency) or **AP** (Availability) when a partition occurs.`,
    codeExample: null
  },
  {
    id: 'js-99',
    category: 'Architect',
    difficulty: 'Expert',
    question: 'Why is `class` in JS different from `class` in Java?',
    answer: `Despite the syntax looking identical, the mental model is opposite.

### Java (Class-Based)
- **Blueprints:** A Class is a static blueprint. An Object is a copy.
- **Hard Link:** Once created, an instance is generally rigid. You cannot easily "add" methods to a specific instance or the class at runtime.
- **Taxonomy:** Rigid ancestry.

### JavaScript (Prototype-Based)
- **Deligation:** A Class is just a function. An Object does **not** contain its methods.
- **The Chain:** It contains a reference (\`__proto__\`) to another object (the prototype).
- **Dynamic:** If I add \`Array.prototype.shout = () => ...\`, **every array in existence** instantly gains that method. It's live delegation, not a static copy.`,
    codeExample: `class Animal {}
const dog = new Animal();

// In JS, I can monkey-patch the blueprint at runtime
Animal.prototype.speak = () => "Woof";

// The 'dog' created BEFORE the change can still see it!
console.log(dog.speak()); // "Woof"`
  },
  {
    id: 'js-100',
    category: 'Architect',
    difficulty: 'Expert',
    question: 'Explain "Dependency Injection" in the context of JS modules.',
    answer: `DI is often associated with Angular/Java, but it's a vital pattern for testable JS.

### The Anti-Pattern: Hardcoded Dependencies
Ideally, your functions should not "reach out" and grab global dependencies. It makes them hard to test because you can't easily swap the database for a fake one.

### The Pattern: Injection
Pass the dependency **as an argument** (or via a higher-order function).

### Why?
1. **Testing:** You can inject a Mock Object implementation of the DB to test your business logic without a real database.
2. **Decoupling:** Your logic doesn't care *which* database is used, only that it matches the interface.`,
    codeExample: `// 1. Tightly Coupled (Hard to Test)
import db from './postgres-db';

export const getUser = (id) => {
  return db.query(\`SELECT * FROM users WHERE id = \${id}\`);
};

// 2. Injected (Easy to Test)
export const makeGetUser = (db) => (id) => {
  return db.query(\`SELECT * FROM users WHERE id = \${id}\`);
};

// Test
const mockDb = { query: () => "Fake User" };
const testGetUser = makeGetUser(mockDb);`
  },
];

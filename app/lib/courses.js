export const COURSES = {
    javascript: {
        id: 'javascript',
        title: 'JavaScript Mastery: From Zero to Architect',
        description: 'The complete 20-day roadmap to mastering the JavaScript runtime, modern patterns, and system design. Updated for 2025.',
        totalDays: 20,
        days: [
            // --- WEEK 1: THE ENGINE ---
            {
                day: 1,
                title: 'The V8 Architecture & Hoisting',
                intro: "Stop thinking of code as text. Think of it as memory allocation. We start by dissecting how the V8 Engine parses your file.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Compilation Process (JIT)</h3>
<p class="mb-4">JavaScript is <strong>Just-In-Time</strong> compiled. It is not interpreted line-by-line like in 1995. V8 (Chrome's Engine) uses a complex pipeline to optimize your code.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-blue-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ Source Code ] 
      │
      ▼
[ Parser ] ──▶ [ AST (Abstract Syntax Tree) ]
                      │
                      ▼
              [ Ignition (Interpreter) ]
              (Generates Bytecode)
                      │
      ┌───────────────┴───────────────┐
      ▼                               ▼
[ Execution ]                   [ TurboFan ]
(Run Bytecode)              (Optimizing Compiler)
                                      │
                                      ▼
                              [ Machine Code ]
                              (0101010101...)
</pre>
</div>

<p class="mb-6"><strong>Why this matters:</strong> If you change the "shape" of an object (e.g., adding properties dynamically), TurboFan has to "De-optimize" and go back to Bytecode, slowing down your app.</p>

<h3 class="text-xl font-bold text-white mb-4">2. Execution Context: The Two Phases</h3>
<p class="mb-4">When you run a function, the engine doesn't just "run" it. It makes two passes.</p>

<div class="grid md:grid-cols-2 gap-6 mb-6">
    <div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
        <h4 class="font-bold text-brand-primary mb-2">Phase 1: Memory Creation</h4>
        <p class="text-sm text-light-400">The engine scans for declarations.</p>
        <ul class="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Allocates memory for <code class="bg-dark-900 px-1 rounded">var</code> (sets to undefined).</li>
            <li>Allocates memory for <code class="bg-dark-900 px-1 rounded">function</code> (stores code).</li>
            <li><strong>Code is NOT executed yet.</strong></li>
        </ul>
    </div>
    <div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
        <h4 class="font-bold text-green-400 mb-2">Phase 2: Execution</h4>
        <p class="text-sm text-light-400">The engine runs line-by-line.</p>
        <ul class="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Assigns values (<code class="bg-dark-900 px-1 rounded">a = 10</code>).</li>
            <li>Executes function calls.</li>
            <li>This is where "Reference Errors" happen.</li>
        </ul>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">3. Visualizing The Call Stack</h3>
<p class="mb-4">JS is single-threaded. It uses a Stack to track where it is.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto shadow-inner">
<pre>
   │                        │
   │   [ Execution: fn() ]  │  <-- Active
   │ ---------------------- │
   │   [ Execution: main ]  │  <-- Paused
   │ ---------------------- │
   │   [ Global Context  ]  │  <-- Bottom
   └────────────────────────┘
        THE CALL STACK
</pre>
</div>
                `,
                code: `// Example 1: Function Declaration vs Expression
console.log(funcDec()); // Works (Hoisted)
// console.log(funcExp()); // Crash (TDZ or undefined)

function funcDec() { return "I am hoisted"; }
const funcExp = () => "I am not";

// Example 2: The TDZ Trap
let x = 10;
function trap() {
    // console.log(x); // ReferenceError!
    // Why? Because the local 'let x' below creates a new TDZ scope
    // shadowing the global one.
    let x = 20;
}
trap();`,
                interview: {
                    questions: [
                        { q: "Explain the difference between Ignition and TurboFan in V8.", a: "Ignition is the interpreter that turns AST into Bytecode quickly. TurboFan is the optimizing compiler that takes hot code (run often) and converts it to highly optimized machine code based on assumptions (like types)." },
                        { q: "Why is `const` preferred over `let` for performance?", a: "It signals immutability to the engine and developer, making data flow easier to trace. However, in terms of raw V8 performance, the difference is negligible unless inside hot loops." },
                        { q: "What is the Global Execution Context?", a: "The default context created when the script loads. It creates the `window` (or `global`) object and sets `this` equal to it." }
                    ]
                }
            },
            {
                day: 2,
                title: 'Scopes, Block vs Function, and Modules',
                intro: "Scope is the set of rules for where variables live. ES6 introduced Block Scope, changing the game forever.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Lexical Scope (Static Scope)</h3>
<p class="mb-4">Scope is determined at <strong>compile time</strong>. The JS engine knows exactly where variables live before running a single line.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-green-300 mb-6 overflow-x-auto shadow-inner">
<pre>
Global Scope
│  const hero = "Batman";
│
└──▶ Function outer()
     │  const sidekick = "Robin";
     │
     └──▶ Function inner()
          │  // Can access 'hero' and 'sidekick'
          │  console.log(hero, sidekick);
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. The Scope Chain</h3>
<p class="mb-4">When you ask for a variable, JS looks "up" the elevator. It never looks "down".</p>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6 bg-dark-800 p-4 rounded-lg">
    <li><strong>Level 1:</strong> Local Scope (Found it? Stop.)</li>
    <li><strong>Level 2:</strong> Outer Function Scope</li>
    <li><strong>Level 3:</strong> Global Scope</li>
    <li><strong>Roof:</strong> <code class="text-red-400">ReferenceError</code></li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3. Module Scope (ES Modules)</h3>
<p class="mb-4">In 2025, we use Modules. Files are no longer Global by default.</p>
<div class="grid grid-cols-2 gap-4 mb-4 text-sm text-center">
    <div class="bg-red-900/20 border border-red-500/30 p-3 rounded">
        <span class="block font-bold text-red-400 mb-1">Script (Old)</span>
        Shared Global Namespace
    </div>
    <div class="bg-green-900/20 border border-green-500/30 p-3 rounded">
        <span class="block font-bold text-green-400 mb-1">Module (New)</span>
        Own Top-Level Scope
    </div>
</div>
                `,
                code: `// Example 1: Lexical Scope
const secret = "12345";

function getSecret() {
    return secret;
}

function hacker() {
    const secret = "HACKED";
    // Does getSecret() use the local 'secret' or the one where it was defined?
    console.log(getSecret()); 
}
hacker(); // Prints "12345" (Lexical!)`,
                interview: {
                    questions: [
                        { q: "What is Lexical Scoping?", a: "It means variable access is determined by the physical nesting of functions in the source code. Inner functions can access outer variables." },
                        { q: "Does `import` hoist?", a: "Yes. ES Module `import` statements are hoisted to the top. They are static bindings, evaluated before any code runs." },
                        { q: "How do you create a private variable in JS without a Class?", a: "Using a Closure or a Block Scope (IIFE pattern)." }
                    ]
                }
            },
            {
                day: 3,
                title: 'Closures & The Module Pattern',
                intro: "Closures allow functions to have 'memory'. They are the foundation of React Hooks and Functional Programming.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Closure "Backpack"</h3>
<p class="mb-4">When a function returns another function, it doesn't just return the code. It returns a hidden "Backpack" of variables.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-yellow-300 mb-6 overflow-x-auto shadow-inner">
<pre>
function outer() {
  let data = "Secret";
  
  return function inner() {
     console.log(data);
  } ──┐
}     │
      ▼
   [ inner() ] 
   ┌───────────────┐
   │ [[Scopes]]    │  <-- The Backpack
   │ ───────────── │
   │  data: "Secret" │
   └───────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Memory Implications</h3>
<p class="mb-4">Closures prevent Garbage Collection. As long as <code>inner()</code> exists, <code>data</code> stays in RAM.</p>
<div class="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r mb-6">
    <p class="text-red-200 text-sm"><strong>Warning:</strong> If you accidentally close over a huge DOM node or Array, it creates a Memory Leak.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">3. The React Connection</h3>
<p><code>useState</code> relies entirely on closures. It "remembers" the state from the previous render using a closure created outside your component.</p>
                `,
                code: `// Example 1: Memoization (Caching)
function memoize(fn) {
    const cache = {};
    return function(arg) {
        if (arg in cache) return cache[arg];
        console.log("Calculating...");
        const result = fn(arg);
        cache[arg] = result;
        return result;
    }
}
const heavy = (x) => x * 2;
const memoHeavy = memoize(heavy);
memoHeavy(10); // Calculating... 20
memoHeavy(10); // 20 (Instant)`,
                interview: {
                    questions: [
                        { q: "Can a closure modify the outer variable?", a: "Yes. Closures hold a *reference* to the variable, not a copy. So if the outer variable changes, the closure sees the change." },
                        { q: "How to implement a Singleton using Closures?", a: "Use an IIFE that returns an object, ensuring the initialization code runs only once." },
                        { q: "What is the difference between Closure and Class?", a: "Classes store state in `this` (objects). Closures store state in the Lexical Scope (functions). Classes are more memory efficient for many instances (shared prototype), Closures give better privacy." }
                    ]
                }
            },
            {
                day: 4,
                title: 'The "this" Keyword & Call/Apply/Bind',
                intro: "'this' is the most misunderstood concept in JS. It depends on *how* a function is called, not where it is defined.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The 4 Rules of 'this'</h3>
<p class="mb-4">Forget the magic. 'this' is determined by the call site.</p>

<div class="overflow-hidden rounded-xl border border-dark-600 mb-6">
    <table class="w-full text-sm text-left">
        <thead class="bg-dark-800 text-light-300">
            <tr>
                <th class="p-3">Priority</th>
                <th class="p-3">Rule</th>
                <th class="p-3">Code Example</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-dark-700 bg-dark-900">
            <tr>
                <td class="p-3 text-brand-primary">1 (Highest)</td>
                <td class="p-3"><strong>New Binding</strong></td>
                <td class="p-3 font-mono text-xs">new Person()</td>
            </tr>
            <tr>
                <td class="p-3">2</td>
                <td class="p-3"><strong>Explicit</strong></td>
                <td class="p-3 font-mono text-xs">fn.call(obj)</td>
            </tr>
            <tr>
                <td class="p-3">3</td>
                <td class="p-3"><strong>Implicit</strong></td>
                <td class="p-3 font-mono text-xs">obj.fn()</td>
            </tr>
            <tr>
                <td class="p-3 text-light-500">4 (Lowest)</td>
                <td class="p-3"><strong>Default</strong></td>
                <td class="p-3 font-mono text-xs">fn()</td>
            </tr>
        </tbody>
    </table>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Arrow Functions</h3>
<p class="mb-4">Arrow functions <strong>do not</strong> have their own <code>this</code>. They bypass the 4 rules and look up to the lexical scope.</p>
<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
    <code class="text-blue-300">const arrow = () => this;</code>
    <p class="text-sm text-blue-200 mt-2">"I will just use whatever 'this' my parent uses."</p>
</div>
                `,
                code: `// Example 1: Implicit vs Explicit
const person = {
    name: "Alice",
    say: function() { console.log(this.name); }
};
const other = { name: "Bob" };

person.say(); // Alice (Implicit)
person.say.call(other); // Bob (Explicit)`,
                interview: {
                    questions: [
                        { q: "What is the difference between `call` and `apply`?", a: "`call` takes arguments separately (`fn.call(ctx, 1, 2)`). `apply` takes arguments as an array (`fn.apply(ctx, [1, 2])`)." },
                        { q: "What does `bind` return?", a: "`bind` returns a **new function** with `this` permanently locked to the first argument. It does not execute the function immediately." },
                        { q: "Can you override the `this` of an Arrow Function?", a: "No. `call`, `apply`, and `bind` have no effect on arrow functions. Their `this` is hardcoded to the lexical scope." }
                    ]
                }
            },
            {
                day: 5,
                title: 'Prototypes & Prototypal Inheritance',
                intro: "JavaScript does not have classes (not really). It has objects linking to other objects. This is the Prototype Chain.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Prototype Chain</h3>
<p class="mb-4">When you access <code>dog.eats</code>, JS walks up the chain until it finds it or hits null.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-pink-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ dog Object ]
│  name: "Rex"
│  __proto__ ──┐
               ▼
        [ animal Object ]
        │  eats: true
        │  __proto__ ──┐
                       ▼
                [ Object.prototype ]
                │  toString: fn
                │  __proto__: null
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. __proto__ vs prototype</h3>
<ul class="list-disc list-inside space-y-3 text-light-300 bg-dark-800 p-4 rounded-lg">
    <li><code>__proto__</code>: The actual link on an <strong>instance</strong>.</li>
    <li><code>prototype</code>: A property on a <strong>Function</strong> that acts as a blueprint for <code>new</code> instances.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3. ES6 Classes</h3>
<p>Classes are just "Syntactic Sugar". <code>class Dog extends Animal</code> creates the exact same prototype chain as above.</p>
                `,
                code: `// Example 1: Manual Inheritance
const animal = { eats: true };
const dog = Object.create(animal);
dog.barks = true;

console.log(dog.eats); // true (found in parent)`,
                interview: {
                    questions: [
                        { q: "What is the Prototype Chain?", a: "It is the mechanism of inheritance. Objects delegate failed property lookups to their prototype." },
                        { q: "Why is modifying `Object.prototype` bad?", a: "It breaks encapsulation, can collide with future library updates, and de-optimizes the V8 engine's property access speed." },
                        { q: "What is `Object.create(null)`?", a: "It creates a 'dictionary' object with NO prototype (no `toString`, no `hasOwnProperty`). Useful for clean maps." }
                    ]
                }
            },
            // --- WEEK 2: ASYNC & PERFORMANCE ---
            {
                day: 6,
                title: 'The Event Loop: Microtasks vs Macrotasks',
                intro: "Understanding the loop prevents UI freezes. Promises have VIP access; Timeouts execute when the VIPs are done.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Visual Event Loop</h3>
<p class="mb-4">The Loop follows a strict priority order. It never multitasks.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto shadow-inner">
<pre>
┌─────────────────┐      ┌─────────────────┐
│   Call Stack    │      │  Web APIs       │
│ (Run Sync Code) │ ───▶ │ (Timer, Fetch)  │
└────────┬────────┘      └────────┬────────┘
         │                        │
         │ (Empty?)               ▼
┌────────▼────────┐      ┌─────────────────┐
│ Event Loop      │ ◀─── │ Callback Queues │
└────────┬────────┘      └─────────────────┘
         │
         ├──▶ 1. Microtasks (Promise.then) [VIP]
         └──▶ 2. Macrotasks (setTimeout)   [Normal]
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. The Priority Rules</h3>
<ol class="list-decimal list-inside space-y-3 text-light-300 bg-dark-800 p-4 rounded-lg mb-6">
    <li><strong>Run Synchronous Code</strong> until Stack is empty.</li>
    <li><strong>Run ALL Microtasks</strong> until queue is empty. (Can starve the loop!)</li>
    <li><strong>Render UI</strong> (Browser Repaint).</li>
    <li><strong>Run ONE Macrotask</strong>.</li>
    <li>Repeat.</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">3. Starvation</h3>
<p>If you recursively create Microtasks (e.g., <code>Promise.resolve().then(loop)</code>), the loop never reaches the Macrotask queue or UI Paint. The page freezes.</p>
                `,
                code: `// Example 1: Order of Operations
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
// Output: 1, 4, 3, 2`,
                interview: {
                    questions: [
                        { q: "Difference between Task and Microtask?", a: "Tasks (Macro) are IO/Timers. Microtasks are Promises/MutationObservers. Microtasks run immediately after the current stack, before rendering." },
                        { q: "Does JS run in parallel?", a: "No. JS is single-threaded. However, the Browser (Web APIs) handles network/timers in parallel threads." },
                        { q: "Why is `requestAnimationFrame` better for animations?", a: "It runs exactly before the browser repaints, ensuring smooth 60fps visuals, unlike setTimeout which is imprecise." }
                    ]
                }
            },
            {
                day: 7,
                title: 'Promises: Under the Hood',
                intro: "Stop seeing Promises as magic boxes. A Promise is just an object with a `state` (pending, fulfilled, rejected) and a list of callbacks.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Promise State Machine</h3>
<p class="mb-4">A Promise is a state machine that can only move forward. It starts as Pending.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-orange-300 mb-6 overflow-x-auto shadow-inner">
<pre>
      [ Pending ]
      (undefined)
       │      │
       │      │ resolve(value)
       │      ▼
       │    [ Fulfilled ] ──▶ .then(onSuccess)
       │    (value)
       │
       │ reject(error)
       ▼
    [ Rejected ] ──▶ .catch(onError)
    (error)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. The "Then" Chain</h3>
<p class="mb-4"><code>.then()</code> always returns a <strong>NEW Promise</strong>. This is why you can chain them.</p>
<ul class="list-disc list-inside space-y-2 text-light-300 bg-dark-800 p-4 rounded-lg">
    <li>Return a value? ➞ Next Promise <strong>Fulfilled</strong>.</li>
    <li>Return a Promise? ➞ Next Promise <strong>waits</strong> for it.</li>
    <li>Throw Error? ➞ Next Promise <strong>Rejected</strong>.</li>
</ul>
                `,
                code: `// Example 1: Building a Simple Promise
const p = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Done!"), 1000);
});

// Example 2: Promise.all vs Promise.race
const p1 = new Promise(r => setTimeout(r, 100, 'Fast'));
const p2 = new Promise(r => setTimeout(r, 500, 'Slow'));

Promise.all([p1, p2]).then(console.log); // ['Fast', 'Slow'] after 500ms`,
                interview: {
                    questions: [
                        { q: "What happens if you don't catch a Promise error?", a: "It causes an 'Unhandled Promise Rejection', which typically logs a warning but doesn't crash the main thread (Node.js might exit)." },
                        { q: "Does `finally` receive arguments?", a: "No. `finally()` receives nothing. It is for cleanup code that runs regardless of success/failure." },
                        { q: "How to run promises sequentially?", a: "Use `await` in a for-loop, or `.reduce()` with a Promise chain." }
                    ]
                }
            },
            {
                day: 8,
                title: 'Async/Await & Generators',
                intro: "Async/Await is just Generators + Promises wrapped in a nice syntax. It allows async code to look synchronous.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The 'Pausing' Power</h3>
<p class="mb-4">Normal functions run to completion. <strong>Generators</strong> (<code>function*</code>) can pause (<code>yield</code>) and resume.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-teal-300 mb-6 overflow-x-auto shadow-inner">
<pre>
async function() {
   const user = await fetchUser();  <-- PAUSE HERE
   console.log(user);               <-- RESUME LATER
}

// Under the Hood:
function* generator() {
   const user = yield fetchUser();
   console.log(user);
}
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Error Handling</h3>
<p>Unlike <code>.catch()</code>, we use standard <code>try/catch</code> blocks.</p>
                `,
                code: `// Example 1: Async/Await
async function fetchData() {
    try {
        const data = await fetch('/api');
        return data.json();
    } catch (e) {
        console.log("Network Error");
    }
}`,
                interview: {
                    questions: [
                        { q: "Is `await` blocking?", a: "No. It suspends the *async function*, but yields control back to the event loop, allowing other events to process." },
                        { q: "What does an async function return?", a: "Always a Promise. Even if you return a primitive `return 1`, it wraps it `Promise.resolve(1)`." },
                        { q: "Can you use `await` in `forEach`?", a: "No. `forEach` expects a synchronous callback. The promises will be created but `forEach` won't wait for them. Use `for...of` instead." }
                    ]
                }
            },
            {
                day: 9,
                title: 'Memory Leaks & Garbage Collection',
                intro: "V8 uses 'Mark and Sweep'. If an object is reachable from the Root (Window), it stays. If not, it dies. Leaks happen when you accidentally keep roots.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Mark and Sweep Algorithm</h3>
<p class="mb-4">The Garbage Collector (GC) starts at the Root.</p>
<ul class="list-disc list-inside space-y-2 text-light-300 bg-dark-800 p-4 rounded-lg mb-6">
    <li><strong>Mark:</strong> "I can reach this object!" (Paint it white).</li>
    <li><strong>Sweep:</strong> "I cannot reach that object!" (Delete it).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">2. Common Leaks</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
        <span class="text-red-400 font-bold block mb-2">Global Variables</span>
        Accidental <code>window.x = largeData</code> stays forever.
    </div>
    <div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
        <span class="text-red-400 font-bold block mb-2">Detached DOM</span>
        Removing an element from DOM but keeping a JS reference to it.
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">3. WeakMap / WeakSet</h3>
<p>These data structures do NOT prevent garbage collection. Great for caching.</p>
                `,
                code: `// Example 1: Event Listener Leak
function setup() {
    const hugeString = new Array(1000000).join('x');
    
    // This handler keeps 'hugeString' alive forever!
    document.body.addEventListener('click', () => {
        console.log(hugeString.length);
    });
}`,
                interview: {
                    questions: [
                        { q: "How does Garbage Collection work in JS?", a: "Mark and Sweep algorithm. It starts from roots (Global/Stack) and marks all reachable objects. Anything not marked is swept (deleted)." },
                        { q: "Why use a WeakMap?", a: "To associate data with an object without preventing that object from being garbage collected (e.g., private data in libraries)." },
                        { q: "How to detect memory leaks?", a: "Chrome DevTools -> Memory Tab -> Heap Snapshot. Compare snapshots before/after an action." }
                    ]
                }
            },
            {
                day: 10,
                title: 'Web Workers & Multithreading',
                intro: "JS is single-threaded, but the Platform isn't. Web Workers allow you to run heavy code in a separate CPU thread.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Main Thread vs Worker Thread</h3>
<p class="mb-4">Workers run in parallel. They do NOT share memory.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-green-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ Main Thread (UI) ]        [ Worker Thread ]
       │                           │
       │  postMessage(data) ───▶   │
       │                           │
       │                    (Heavy Calc)
       │                           │
       │  ◀─── postMessage(res)    │
       ▼                           ▼
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Serialization Cost</h3>
<p class="mb-4">Data sent between threads is <strong>Cloned</strong>. Sending a 100MB JSON is slow.</p>
<p><strong>Solution:</strong> <code class="text-brand-primary">SharedArrayBuffer</code> or <code class="text-brand-primary">Transferable Objects</code>.</p>
                `,
                code: `// Example 1: Basic Worker Logic
// main.js
const worker = new Worker('worker.js');
worker.postMessage(10);
worker.onmessage = (e) => console.log("Result:", e.data);

// worker.js
self.onmessage = (e) => {
    const result = fibonacci(e.data);
    self.postMessage(result);
};`,
                interview: {
                    questions: [
                        { q: "Can Web Workers modify the DOM?", a: "No. They run in a separate thread without `window` or `document` access. They must message the main thread to update UI." },
                        { q: "What is the cost of postMessage?", a: "Serialization. Sending huge objects takes time to copy. Use SharedArrayBuffer or Transferable Objects for performance." },
                        { q: "Difference between Web Worker and Service Worker?", a: "Web Workers are for computation. Service Workers are for network interception (caching/offline) and act as a proxy." }
                    ]
                }
            },
            // --- WEEK 3: FUNCTIONAL & MODERN PATTERNS ---
            {
                day: 11,
                title: 'Functional Programming: Currying & Composition',
                intro: "FP isn't just for Haskell. It makes JS code cleaner and more testable. We learn to treat functions as LEGO blocks.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Currying Pipeline</h3>
<p class="mb-4">Transforming <code>f(a, b, c)</code> into <code>f(a)(b)(c)</code> allows you to bake in arguments early.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ add(5) ] ──▶ (Returns Function waiting for 'b')
    │
    └──▶ [ Call with 10 ] ──▶ 15
    │
    └──▶ [ Call with 20 ] ──▶ 25
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Composition</h3>
<p class="mb-4">Piping data through multiple functions: <code>f(g(x))</code>.</p>
<div class="bg-dark-800 p-4 rounded-lg border-l-4 border-brand-primary">
    <code>const enhance = compose(trim, lowercase, bold);</code>
</div>
                `,
                code: `// Example 1: Currying
const add = (a) => (b) => a + b;
const add5 = add(5); // Partial Application
console.log(add5(10)); // 15

// Example 2: Composition (Right to Left)
const compose = (...fns) => (x) => fns.reduceRight((y, f) => f(y), x);`,
                interview: {
                    questions: [
                        { q: "What is a Higher-Order Function?", a: "A function that takes another function as an argument OR returns a function." },
                        { q: "Why use Composition over Inheritance?", a: "Composition is more flexible. You combine small behaviors to make complex objects, avoiding the 'Gorilla/Banana' problem of rigid class hierarchies." },
                        { q: "What makes a function 'Pure'?", a: "1. Deterministic (Same input always gives same output). 2. No Side Effects (Does not modify external state or DOM)." }
                    ]
                }
            },
            {
                day: 12,
                title: 'Meta-Programming: Proxy & Reflect',
                intro: "This is 2025 magic. Proxies allow you to intercept fundamental language operations (read, write, delete). This is how Vue 3 reactivity works.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Interceptor</h3>
<p class="mb-4">A Proxy wraps an object and 'traps' actions.</p>

<div class="overflow-hidden rounded-xl border border-dark-600 mb-6">
    <table class="w-full text-sm text-left">
        <thead class="bg-dark-800 text-light-300">
            <tr><th class="p-3">Trap</th><th class="p-3">Intercepts</th></tr>
        </thead>
        <tbody class="divide-y divide-dark-700 bg-dark-900">
            <tr><td class="p-3 text-blue-300">get</td><td class="p-3">Reading a property (<code>obj.prop</code>)</td></tr>
            <tr><td class="p-3 text-green-300">set</td><td class="p-3">Writing a property (<code>obj.prop = val</code>)</td></tr>
            <tr><td class="p-3 text-red-300">deleteProperty</td><td class="p-3">The <code>delete</code> operator</td></tr>
        </tbody>
    </table>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Reflect API</h3>
<p>Standard way to perform the original behavior inside a trap. Instead of <code>target[prop] = val</code>, use <code>Reflect.set(...)</code>.</p>
                `,
                code: `// Example 1: Validation Proxy
const user = { age: 10 };

const validator = new Proxy(user, {
    set(target, prop, value) {
        if (prop === 'age' && value < 0) {
            throw new Error("Age cannot be negative");
        }
        target[prop] = value;
        return true;
    }
});`,
                interview: {
                    questions: [
                        { q: "What is the difference between Proxy and Object.defineProperty?", a: "Object.defineProperty intercepts property access on *existing* properties. Proxy intercepts *everything*, even properties that don't exist yet, and array modifications." },
                        { q: "Can you revoke a Proxy?", a: "Yes, if created with `Proxy.revocable()`. This is useful for security (giving temporary access to an object)." },
                        { q: "What is the Reflect API for?", a: "It provides a standardized way to call the default behavior. Instead of `delete obj[prop]`, you use `Reflect.deleteProperty(obj, prop)`." }
                    ]
                }
            },
            {
                day: 13,
                title: 'Iterators & Symbols',
                intro: "How does `for...of` work? It looks for a specific Symbol method `[Symbol.iterator]`. You can make your own objects iterable.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Iterator Protocol</h3>
<p class="mb-4">An object is iterable if it implements the <code>@@iterator</code> method.</p>

<div class="bg-dark-900 p-4 rounded-lg border border-dark-600 font-mono text-xs mb-6">
{
  [Symbol.iterator]() {
    return {
      next() {
        return { value: 1, done: false };
      }
    }
  }
}
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Well-Known Symbols</h3>
<p>Symbols are unique identifiers. They are used for "hidden" language hooks.</p>
                `,
                code: `// Example 1: Unique Keys
const id = Symbol('id');
const user = { [id]: 123 };
console.log(user[id]); // 123`,
                interview: {
                    questions: [
                        { q: "Are Symbols private?", a: "Not truly. You can access them with `Object.getOwnPropertySymbols()`. But they don't show up in `for...in` loops or `JSON.stringify`." },
                        { q: "What is a Well-Known Symbol?", a: "Built-in symbols like `Symbol.iterator`, `Symbol.toStringTag` that allow you to hook into native language behaviors." },
                        { q: "How to make an object work with `for...of`?", a: "Implement the `[Symbol.iterator]` method." }
                    ]
                }
            },
            {
                day: 14,
                title: 'Modules: ESM vs CommonJS',
                intro: "Node.js uses CommonJS (`require`). Browsers use ESM (`import`). The world is moving to ESM. Know the difference.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Static vs Dynamic</h3>
<div class="grid grid-cols-2 gap-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-lg">
        <h4 class="text-green-400 font-bold mb-2">ES Modules</h4>
        <ul class="text-sm text-light-400 list-disc list-inside">
            <li>Static (Compile Time)</li>
            <li>Async Loading</li>
            <li>Tree Shaking ✅</li>
        </ul>
    </div>
    <div class="bg-dark-800 p-4 rounded-lg">
        <h4 class="text-yellow-400 font-bold mb-2">CommonJS</h4>
        <ul class="text-sm text-light-400 list-disc list-inside">
            <li>Dynamic (Runtime)</li>
            <li>Sync Loading</li>
            <li>Tree Shaking ❌</li>
        </ul>
    </div>
</div>
                `,
                code: `// Example 1: CommonJS (Node.js legacy)
// lib.js
// module.exports = { add: (a,b) => a+b };
// main.js
// const { add } = require('./lib');

// Example 2: ESM (Modern)
// lib.js
export const add = (a,b) => a+b;
// main.js
import { add } from './lib.js';`,
                interview: {
                    questions: [
                        { q: "Why is ESM better for Tree Shaking?", a: "Because `import` statements are static (at top level), bundlers like Webpack can determine *at compile time* exactly which functions are used and remove the rest." },
                        { q: "Can you mix require and import?", a: "In modern Node.js, yes, but it's messy. Avoid it. `import` works in `.mjs` files or if `package.json` has `type: module`." },
                        { q: "What is a Circular Dependency?", a: "Module A imports B, B imports A. ESM handles this better than CJS by using references, but it's still a bad architectural pattern." }
                    ]
                }
            },
            {
                day: 15,
                title: 'Sets & Maps: High Performance Data Structures',
                intro: "Stop using Objects for everything. Maps allow any key type. Sets enforce uniqueness. They are optimized for frequent additions/removals.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Map vs Object</h3>
<div class="bg-dark-900 p-4 rounded-lg border border-dark-600 mb-6 overflow-x-auto">
    <table class="w-full text-sm">
        <thead><tr><th class="text-left p-2 text-light-300">Feature</th><th class="text-left p-2 text-light-300">Map</th><th class="text-left p-2 text-light-300">Object</th></tr></thead>
        <tbody class="text-light-400">
            <tr><td class="p-2 border-t border-dark-700">Keys</td><td class="p-2 border-t border-dark-700 text-green-400">Any Type</td><td class="p-2 border-t border-dark-700 text-yellow-400">String/Symbol</td></tr>
            <tr><td class="p-2 border-t border-dark-700">Order</td><td class="p-2 border-t border-dark-700 text-green-400">Insertion</td><td class="p-2 border-t border-dark-700 text-yellow-400">Unreliable</td></tr>
            <tr><td class="p-2 border-t border-dark-700">Performance</td><td class="p-2 border-t border-dark-700 text-green-400">Fast (Hash)</td><td class="p-2 border-t border-dark-700 text-yellow-400">Slow (Proto)</td></tr>
        </tbody>
    </table>
</div>
                `,
                code: `// Example 1: Unique Array
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]`,
                interview: {
                    questions: [
                        { q: "Difference between Map and Object?", a: "Map keys can be anything. Object keys are always Strings/Symbols. Map tracks size (`.size`). Map preserves order." },
                        { q: "When to use a Set?", a: "When you need to ensure uniqueness or need fast `has()` checks." },
                        { q: "How to iterate a Map?", a: "`for (const [key, val] of map)`. It is iterable by default." }
                    ]
                }
            },
            // --- WEEK 4: ARCHITECTURE & SECURITY ---
            {
                day: 16,
                title: 'Design Patterns: Singleton & Factory',
                intro: "Patterns are proven solutions to common problems. Don't reinvent the wheel.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Singleton Pattern</h3>
<p class="mb-4">Ensures only ONE instance exists. (e.g., Database Connection).</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-blue-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ Client A ] ──┐
               │
               ▼
        [ DB Instance ]
               ▲
               │
[ Client B ] ──┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Factory Pattern</h3>
<p>Create objects without specifying the exact class. "I need a User", not "new AdminUser()".</p>
                `,
                code: `// Example 1: Singleton (ES6 Module is naturally a singleton)
// db.js
class Database {
    constructor() {
        if (Database.instance) return Database.instance;
        this.conn = "Connected";
        Database.instance = this;
    }
}
export const db = new Database();`,
                interview: {
                    questions: [
                        { q: "Are Singletons bad?", a: "They can be. They introduce global state, making testing difficult. Dependency Injection is often preferred." },
                        { q: "What is the Observer Pattern?", a: "A subscription mechanism. One object (Subject) notifies multiple Observers about events (like `addEventListener` or Redux)." },
                        { q: "What is the Module Pattern?", a: "Using closures (IIFE) to create private scope and expose a public API. Superseded by ES Modules." }
                    ]
                }
            },
            {
                day: 17,
                title: 'SOLID Principles in JavaScript',
                intro: "Write code that is easy to maintain and extend.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Five Principles</h3>
<ul class="space-y-3">
    <li class="bg-dark-800 p-3 rounded border-l-4 border-brand-primary">
        <strong>S - Single Responsibility:</strong> Do one thing.
    </li>
    <li class="bg-dark-800 p-3 rounded border-l-4 border-blue-500">
        <strong>O - Open/Closed:</strong> Open for extension, closed for modification.
    </li>
    <li class="bg-dark-800 p-3 rounded border-l-4 border-green-500">
        <strong>L - Liskov Substitution:</strong> Subtypes must be swappable.
    </li>
    <li class="bg-dark-800 p-3 rounded border-l-4 border-yellow-500">
        <strong>I - Interface Segregation:</strong> Small, specific interfaces.
    </li>
    <li class="bg-dark-800 p-3 rounded border-l-4 border-purple-500">
        <strong>D - Dependency Inversion:</strong> Depend on abstractions.
    </li>
</ul>
                `,
                code: `// Example 1: Bad (Violates SRP)
function saveUser(user) {
    // Validates AND Saves
    if (user.name.length < 3) throw Error;
    db.save(user);
}

// Example 2: Good (SRP)
function validate(user) {
    if (user.name.length < 3) throw Error;
}
function save(user) {
    db.save(user);
}`,
                interview: {
                    questions: [
                        { q: "Explain the Liskov Substitution Principle.", a: "Subtypes must be substitutable for their base types. If Class B extends Class A, B should not break A's behavior." },
                        { q: "How does Dependency Injection help testing?", a: "It allows you to inject 'Mock' dependencies (like a fake database) instead of real ones, making unit tests fast and isolated." },
                        { q: "Why is 'Clean Code' important?", a: "Code is read 10x more than it is written. Clean code reduces technical debt." }
                    ]
                }
            },
            {
                day: 18,
                title: 'Testing: Unit vs Integration',
                intro: "If it's not tested, it's broken. Learn the pyramid: Unit > Integration > E2E.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Testing Pyramid</h3>
<div class="flex flex-col items-center font-mono text-sm mb-6 space-y-1">
    <div class="w-24 bg-red-500/20 text-red-200 py-1 text-center border border-red-500/50">E2E (Slow)</div>
    <div class="w-48 bg-yellow-500/20 text-yellow-200 py-1 text-center border border-yellow-500/50">Integration</div>
    <div class="w-64 bg-green-500/20 text-green-200 py-1 text-center border border-green-500/50">Unit (Fast)</div>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. TDD (Test Driven Development)</h3>
<p><strong>Red</strong> (Fail) ➞ <strong>Green</strong> (Pass) ➞ <strong>Refactor</strong> (Clean).</p>
                `,
                code: `// Example 1: Simple Unit Test (Jest-style)
function add(a, b) { return a + b; }

// test('adds 1 + 2 to equal 3', () => {
//   expect(add(1, 2)).toBe(3);
// });`,
                interview: {
                    questions: [
                        { q: "What is TDD?", a: "Test Driven Development. 1. Write a failing test. 2. Write code to pass it. 3. Refactor. (Red-Green-Refactor)." },
                        { q: "What is a Flaky Test?", a: "A test that sometimes passes and sometimes fails (e.g., depends on network or timing). They destroy trust in CI/CD." },
                        { q: "What is Code Coverage?", a: "The percentage of code lines executed during tests. 100% coverage doesn't mean bug-free, but low coverage is risky." }
                    ]
                }
            },
            {
                day: 19,
                title: 'Security: XSS, CSRF, & Storage',
                intro: "The most important topic for a Senior Dev. How to not get hacked.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. XSS (Cross Site Scripting)</h3>
<div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30 mb-6">
    <p class="text-red-200 mb-2"><strong>Attack:</strong> Injecting Malicious Scripts.</p>
    <code class="block bg-dark-900 p-2 rounded text-xs">&lt;img src=x onerror=alert(1)&gt;</code>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Secure Storage</h3>
<p class="mb-4">Where do you store the JWT?</p>
<ul class="list-disc list-inside space-y-2 bg-dark-800 p-4 rounded-lg">
    <li><span class="text-red-400 font-bold">LocalStorage:</span> BAD. Accessible by JS (XSS).</li>
    <li><span class="text-green-400 font-bold">HttpOnly Cookie:</span> GOOD. Inaccessible by JS.</li>
</ul>
                `,
                code: `// Example 1: XSS Vulnerability
// const name = "<img src=x onerror=alert(1)>";
// document.body.innerHTML = name; // BAD! Executes script.

// Fix:
// document.body.innerText = name; // Safe.`,
                interview: {
                    questions: [
                        { q: "Why is LocalStorage bad for JWTs?", a: "Any JS code on your page (including 3rd party ads/analytics) can read LocalStorage. If you have an XSS vuln, your token is stolen. HttpOnly cookies cannot be read by JS." },
                        { q: "What is CORS?", a: "Cross-Origin Resource Sharing. A browser security feature that blocks API calls to a different domain unless the server explicitly allows it." },
                        { q: "What is SQL Injection?", a: "Inserting SQL commands into input fields. In JS/Node, use ORMs or Parameterized Queries to prevent it." }
                    ]
                }
            },
            {
                day: 20,
                title: 'Architecture & Scalability',
                intro: "The Final Frontier. How to design systems that handle millions of users.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Scaling Pyramid</h3>
<div class="space-y-4">
    <div class="bg-dark-800 p-4 rounded-lg border-l-4 border-blue-500">
        <h4 class="font-bold">1. Vertical (Scale Up)</h4>
        <p class="text-sm text-light-400">Buy a bigger server. Easiest, but has a limit.</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-lg border-l-4 border-purple-500">
        <h4 class="font-bold">2. Horizontal (Scale Out)</h4>
        <p class="text-sm text-light-400">Buy more servers. Requires Load Balancer.</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-lg border-l-4 border-green-500">
        <h4 class="font-bold">3. Caching</h4>
        <p class="text-sm text-light-400">Redis / CDN. Don't hit the DB.</p>
    </div>
</div>
                `,
                code: `// Example 1: Simple Caching Pattern
const cache = new Map();

async function getData(id) {
    if (cache.has(id)) return cache.get(id);
    
    const result = await fetch('/api/' + id);
    cache.set(id, result);
    return result;
}`,
                interview: {
                    questions: [
                        { q: "How do you handle a sudden spike in traffic?", a: "Auto-scaling groups (spin up more servers), CDN for static assets, rate limiting APIs, and aggressive caching." },
                        { q: "What is Sharding?", a: "Splitting a database into smaller chunks (shards) across multiple machines to handle massive data." },
                        { q: "Explain Event Sourcing.", a: "Storing the *sequence of events* (changes) rather than just the current state. Allows time-travel debugging and audit logs." }
                    ]
                }
            }
        ]
    },
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
    fullstack: {
        id: 'fullstack',
        title: 'Full Stack Architect: Node.js & Cloud',
        description: 'From Backend Internals to Microservices. Master the complete stack.',
        totalDays: 20,
        days: [
            // --- WEEK 1: NODE.JS & DATABASE ---
            {
                day: 1,
                title: 'Node.js Internals: Beyond Express',
                intro: "Node is not just 'server-side JS'. It's a C++ runtime with Libuv. Understand the Event Loop on the server.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Server Event Loop</h3>
<p class="mb-4">It has phases, unlike the browser loop.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-blue-300 mb-6 overflow-x-auto shadow-inner">
<pre>
   ┌───────────────────────────┐
   │         TIMERS            │ (setTimeout)
   └─────────────┬─────────────┘
                 ▼
   ┌───────────────────────────┐
   │    PENDING CALLBACKS      │ (OS Ops)
   └─────────────┬─────────────┘
                 ▼
   ┌───────────────────────────┐
   │      POLL (I/O)           │ (Incoming Request)
   └─────────────┬─────────────┘
                 ▼
   ┌───────────────────────────┐
   │         CHECK             │ (setImmediate)
   └───────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. The Worker Pool</h3>
<p>Heavy tasks (Crypto, Compression, FS) are offloaded to Libuv's C++ Thread Pool. This keeps the Main Thread free.</p>
                `,
                code: `// Example 1: Blocking vs Non-Blocking
const crypto = require('crypto');

// BAD: Sync version blocks all other requests
// crypto.pbkdf2Sync(...) 

// GOOD: Async version uses the Thread Pool
crypto.pbkdf2(..., () => console.log('Done'));

// Example 2: setImmediate vs process.nextTick
// nextTick runs IMMEDIATELY after current operation, before any I/O.
// setImmediate runs on the next 'Check' phase of the loop.`,
                interview: {
                    questions: [
                        { q: "Is Node.js single threaded?", a: "Yes, the JS execution is single-threaded. But I/O operations (file, network) and CPU-heavy tasks (crypto, zlib) run in C++ threads via Libuv." },
                        { q: "What is `process.nextTick` used for?", a: "To schedule a callback to run *immediately* after the current operation completes, but before the event loop continues. Use with caution (can starve I/O)." },
                        { q: "Difference between `cluster` module and Worker Threads?", a: "Cluster forks processes (separate memory). Workers share memory/process. Cluster is for scaling across cores; Workers are for CPU tasks." }
                    ]
                }
            },
            {
                day: 2,
                title: 'Streams & Buffers',
                intro: "How to handle 10GB files with 1GB RAM? Streams. This is the difference between a Junior and a Senior dev.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Piping Data</h3>
<p class="mb-4">Instead of loading the whole file into RAM, we stream it chunk by chunk.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-green-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ File System ] ──Chunk1──▶ [ Gzip ] ──Chunk1──▶ [ Response ]
       │                       │                     │
      ...                     ...                   ...
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Buffer</h3>
<p>Raw binary data (octets). Node's way of handling binary before <code>ArrayBuffer</code> existed.</p>
                `,
                code: `// Example 1: Stream vs ReadFile
const fs = require('fs');

// BAD: Loads entire file into RAM. Crashes on large files.
// fs.readFile('big.mp4', (err, data) => res.send(data));

// GOOD: Stream chunks to response. Memory usage constant.
const stream = fs.createReadStream('big.mp4');
stream.pipe(res);`,
                interview: {
                    questions: [
                        { q: "What is Backpressure?", a: "When the Readable stream is faster than the Writable stream (e.g., reading disk fast, writing to slow network). Node handles this by pausing the readable stream so memory doesn't overflow." },
                        { q: "Difference between Buffer and ArrayBuffer?", a: "Buffer is Node's implementation (pre-ES6). ArrayBuffer is the standard JS implementation. Node Buffers are a subclass of Uint8Array now." }
                    ]
                }
            },
            {
                day: 3,
                title: 'Database Design: SQL vs NoSQL',
                intro: "The most important architectural decision. Relational (Postgres) vs Document (Mongo).",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Relational (SQL)</h3>
<p class="mb-4">Strict schema. Data is normalized (spread across tables).</p>

<h3 class="text-xl font-bold text-white mb-4">2. Document (NoSQL)</h3>
<p class="mb-4">Flexible schema. Data is denormalized (embedded in one document).</p>

<div class="grid grid-cols-2 gap-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-lg text-sm">
        <strong class="text-blue-400">SQL User</strong><br/>
        ID: 1<br/>
        Name: Alice
    </div>
    <div class="bg-dark-800 p-4 rounded-lg text-sm">
        <strong class="text-green-400">Mongo User</strong><br/>
        _id: 1<br/>
        Name: Alice<br/>
        Address: { city: "NY" }
    </div>
</div>
                `,
                code: `// Example 1: SQL Relationship (One-to-Many)
// Users Table: | id | name |
// Posts Table: | id | user_id (FK) | content |

// Example 2: NoSQL Embedding (One-to-Few)
// User Document
// {
//   _id: 1,
//   name: "Alice",
//   addresses: [ // Embedded array
//     { street: "Main St", city: "NY" }
//   ]
// }`,
                interview: {
                    questions: [
                        { q: "What is Normalization?", a: "Organizing data to minimize redundancy (e.g., storing a user's address in a separate table, not repeating it in every order). Improves integrity, hurts read performance (requires Joins)." },
                        { q: "When should you use NoSQL?", a: "When data is unstructured, when you need high write throughput, or when you need to shard data across many servers easily." },
                        { q: "Explain ACID.", a: "Atomicity (All or nothing), Consistency (Valid state), Isolation (Concurrent transactions don't interfere), Durability (Saved forever)." }
                    ]
                }
            },
            {
                day: 4,
                title: 'Authentication & Security',
                intro: "Never roll your own crypto. Sessions vs JWTs. OAuth.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. JWT Anatomy</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm mb-6 overflow-x-auto shadow-inner">
<pre>
<span class="text-red-400">eyJhbGciOiJIUzI1NiJ9</span>.<span class="text-purple-400">eyJzdWIiOiIxMjM0NTY3ODkwIn0</span>.<span class="text-blue-400">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
   (Header)         (Payload)           (Signature)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. The Refresh Pattern</h3>
<p>Access tokens are short-lived (15m). Refresh tokens are long-lived (7d) and kept securely in HttpOnly cookies.</p>
                `,
                code: `// Example 1: JWT Verification
// Server receives token from Header
const token = req.headers.authorization.split(' ')[1];
try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
} catch (e) {
    res.status(401).send("Invalid Token");
}`,
                interview: {
                    questions: [
                        { q: "Where should you store a JWT?", a: "Ideally HttpOnly Cookie (prevents XSS). If in LocalStorage, it's vulnerable to XSS." },
                        { q: "What is Salt in hashing?", a: "Random data added to a password before hashing. Prevents Rainbow Table attacks (pre-computed hash lookups)." }
                    ]
                }
            },
            {
                day: 5,
                title: 'API Architecture: REST vs GraphQL',
                intro: "How do clients talk to servers? Designing scalable interfaces.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. REST vs GraphQL</h3>
<div class="grid grid-cols-2 gap-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-lg">
        <h4 class="text-blue-400 font-bold mb-2">REST</h4>
        <p class="text-sm text-light-400">Multiple endpoints (/users, /posts). Over-fetching is common.</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-lg">
        <h4 class="text-pink-400 font-bold mb-2">GraphQL</h4>
        <p class="text-sm text-light-400">One endpoint (/graphql). Ask for exactly what you need.</p>
    </div>
</div>
                `,
                code: `// Example 1: GraphQL Query
query {
  user(id: 1) {
    name
    posts {
      title
    }
  }
}
// Response: No "friends", no "address", just what I asked for.`,
                interview: {
                    questions: [
                        { q: "What is the N+1 problem in GraphQL?", a: "Fetching a list of authors, then for each author fetching their books. This results in 1 query for authors + N queries for books. Solved with DataLoaders (batching)." },
                        { q: "When to use gRPC?", a: "For internal Microservices communication. It uses Protobuf (binary) and HTTP/2, making it much faster than JSON REST." },
                        { q: "What is Idempotency?", a: "Making multiple identical requests has the same effect as making a single request. (e.g., retrying a Payment API shouldn't charge twice)." }
                    ]
                }
            },
            // --- WEEK 2: SCALE & DEPLOYMENT ---
            {
                day: 6,
                title: 'Caching Strategies: Redis',
                intro: "The fastest request is the one you don't serve from the DB. Redis is key.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Cache-Aside Pattern</h3>
<p class="mb-4">1. Check Cache. 2. Miss? Check DB. 3. Update Cache. 4. Return.</p>

<h3 class="text-xl font-bold text-white mb-4">2. Eviction Policies</h3>
<p><strong>LRU (Least Recently Used):</strong> "I haven't used this key in a while, delete it to make space."</p>
                `,
                code: `// Example 1: Redis Cache Middleware
async function getPost(id) {
    const cached = await redis.get(\`post:\${id}\`);
    if (cached) return JSON.parse(cached);
    
    const data = await db.findPost(id);
    await redis.set(\`post:\${id}\`, JSON.stringify(data), 'EX', 3600); // 1h TTL
    return data;
}`,
                interview: {
                    questions: [
                        { q: "What is Cache Stampede?", a: "When a popular cache key expires, thousands of requests hit the DB simultaneously. Solved by Locking or Probabilistic Early Expiration." },
                        { q: "Redis vs Memcached?", a: "Redis supports complex data types (Lists, Sets, Sorted Sets) and persistence. Memcached is simpler, pure Key-Value string store." }
                    ]
                }
            },
            {
                day: 7,
                title: 'Message Queues & Background Jobs',
                intro: "Don't send emails or process video in the request handler. Offload it.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Decoupling</h3>
<p class="mb-4">The Web Server should only accept the request. The Worker Server does the heavy lifting.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-yellow-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ User ] ──▶ [ API ] ──▶ [ Redis Queue ] ──▶ [ Worker ]
           (Fast Resp)                       (Sends Email)
</pre>
</div>
                `,
                code: `// Example 1: Adding a Job (Producer)
await emailQueue.add('send-welcome', { email: 'user@example.com' });
res.send('Email queued');

// Example 2: Processing (Worker)
emailQueue.process(async (job) => {
    await sendEmail(job.data.email);
});`,
                interview: {
                    questions: [
                        { q: "Why use a Queue instead of just `await sendEmail()`?", a: "To decouple the response time from the processing time. The user gets a fast response, and the server can process the heavy task at its own pace (smoothing traffic spikes)." },
                        { q: "What is a Dead Letter Queue?", a: "A queue where messages go after they fail to process X times. Allows developers to debug failed jobs without blocking the main queue." }
                    ]
                }
            },
            {
                day: 8,
                title: 'Docker & Containerization',
                intro: "Works on my machine? Docker makes it work everywhere.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Layer Cake</h3>
<p class="mb-4">Docker images are built in layers. Layers are cached.</p>
<ul class="list-disc list-inside space-y-2 bg-dark-800 p-4 rounded-lg">
    <li>Layer 1: OS (Alpine Linux)</li>
    <li>Layer 2: Node.js Runtime</li>
    <li>Layer 3: <code>node_modules</code> (Cached if package.json unchanged)</li>
    <li>Layer 4: App Code (Changed frequently)</li>
</ul>
                `,
                code: `// Example 1: Simple Dockerfile
// FROM node:18-alpine
// WORKDIR /app
// COPY package*.json ./
// RUN npm ci --only=production
// COPY . .
// EXPOSE 3000
// CMD ["node", "server.js"]`,
                interview: {
                    questions: [
                        { q: "Difference between VM and Container?", a: "VMs virtualize hardware (heavy OS). Containers virtualize the OS kernel (lightweight, shared kernel)." },
                        { q: "What is Kubernetes?", a: "An orchestrator for containers. Handles scaling, self-healing, and networking of thousands of containers." }
                    ]
                }
            },
            {
                day: 9,
                title: 'CI/CD Pipelines',
                intro: "Continuous Integration / Continuous Deployment. Automate the pain.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Pipeline</h3>
<div class="flex items-center space-x-2 text-xs md:text-sm mb-6">
    <div class="bg-blue-900/40 p-2 rounded border border-blue-500">Code Push</div>
    <span>➞</span>
    <div class="bg-yellow-900/40 p-2 rounded border border-yellow-500">Test (CI)</div>
    <span>➞</span>
    <div class="bg-green-900/40 p-2 rounded border border-green-500">Deploy (CD)</div>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Deployment Strategies</h3>
<ul class="list-disc list-inside space-y-2 bg-dark-800 p-4 rounded-lg">
    <li><strong>Blue/Green:</strong> Zero downtime. Instant rollback.</li>
    <li><strong>Canary:</strong> Roll out to 10% of users first.</li>
</ul>
                `,
                code: `// Example 1: GitHub Actions Workflow
// name: CI
// on: [push]
// jobs:
//   test:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v2
//       - run: npm install
//       - run: npm test`,
                interview: {
                    questions: [
                        { q: "What is Blue-Green Deployment?", a: "Running two identical environments. Blue is live. Deploy to Green. Switch router to Green. Zero downtime. Instant rollback." },
                        { q: "Why immutable infrastructure?", a: "Never patch a running server. Replace it with a new one. Eliminates configuration drift." }
                    ]
                }
            },
            {
                day: 10,
                title: 'System Design: Scalability',
                intro: "Horizontal vs Vertical Scaling. Load Balancers.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Architecture of Scale</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto shadow-inner">
<pre>
      [ Load Balancer ]
      /       |       \
[ App 1 ] [ App 2 ] [ App 3 ]
      \       |       /
      [ Shared Redis ]
              |
         [ Database ]
</pre>
</div>
                `,
                code: `// Example 1: Nginx Config (Simplified)
// upstream backend {
//    server 10.0.0.1;
//    server 10.0.0.2;
// }
// server {
//    location / {
//       proxy_pass http://backend;
//    }
// }`,
                interview: {
                    questions: [
                        { q: "What is CAP Theorem?", a: "Consistency, Availability, Partition Tolerance. In a distributed system, you can only pick 2. (Usually AP or CP)." },
                        { q: "Stateful vs Stateless Architecture?", a: "Stateless (REST) allows easy scaling (any server can handle any request). Stateful (Sticky Sessions) is harder to scale." }
                    ]
                }
            },
            // --- WEEK 3: ADVANCED ARCHITECTURE ---
            {
                day: 11,
                title: 'Microservices & Communication',
                intro: "Breaking the monolith. Service Discovery, API Gateway.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The API Gateway</h3>
<p class="mb-4">The single entry point for all clients. Handles Auth, Rate Limiting, and Routing.</p>

<h3 class="text-xl font-bold text-white mb-4">2. Async Communication</h3>
<p>Services shouldn't talk directly (tight coupling). They should emit events.</p>
                `,
                code: `// Example 1: Event Driven Architecture
// Service A (Order) emits 'OrderCreated'
// Service B (Inventory) listens and subtracts stock
// Service C (Shipping) listens and prints label`,
                interview: {
                    questions: [
                        { q: "What is the Saga Pattern?", a: "Managing distributed transactions. Instead of a global lock, use a sequence of local transactions. If one fails, execute compensating transactions to undo." },
                        { q: "What is Circuit Breaker?", a: "If a service is failing, stop calling it immediately to prevent cascading failure. Retry after a timeout." }
                    ]
                }
            },
            {
                day: 12,
                title: 'WebSockets & Real-time',
                intro: "HTTP is request-response. Sockets are full-duplex. Chat, Gaming, Live Updates.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Upgrade Header</h3>
<p class="mb-4">WebSockets start as a standard HTTP GET request with <code>Connection: Upgrade</code>.</p>

<h3 class="text-xl font-bold text-white mb-4">2. Scaling Sockets</h3>
<p>Socket connections are stateful. You need a <strong>Redis Adapter</strong> to broadcast messages across multiple server instances.</p>
                `,
                code: `// Example 1: Socket.io
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    socket.on('chat', (msg) => {
        io.emit('chat', msg); // Broadcast
    });
});`,
                interview: {
                    questions: [
                        { q: "Polling vs Long Polling vs WebSockets?", a: "Polling: 'Are we there yet?' every 1s. Long Polling: Server holds request until data ready. Sockets: Permanent open channel." },
                        { q: "How many concurrent socket connections can a server handle?", a: "Depends on RAM and File Descriptors (ulimit). A single Node process can handle 10k-100k idle connections easily." }
                    ]
                }
            },
            {
                day: 13,
                title: 'Testing: Integration & Load',
                intro: "Unit tests aren't enough. Does the API actually work? Can it handle 10k users?",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Integration Tests</h3>
<p class="mb-4">Spin up a real DB. Hit real endpoints. Ensure the system works as a whole.</p>

<h3 class="text-xl font-bold text-white mb-4">2. Load Testing</h3>
<p>Simulating 10,000 users hitting your login route at once.</p>
                `,
                code: `// Example 1: Supertest (Integration)
const request = require('supertest');
const app = require('./app');

it('GET /user responds with json', (done) => {
  request(app)
    .get('/user')
    .expect(200, done);
});`,
                interview: {
                    questions: [
                        { q: "What is Chaos Engineering?", a: "Intentionally breaking things (killing servers, adding latency) in production to test resilience (Netflix Simian Army)." },
                        { q: "What metrics to watch during load test?", a: "Latency (p95, p99), Error Rate, CPU/RAM saturation, Throughput (RPS)." }
                    ]
                }
            },
            {
                day: 14,
                title: 'Serverless & Edge Functions',
                intro: "No servers to manage. Pay per execution. AWS Lambda, Cloudflare Workers.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Cold Starts</h3>
<p class="mb-4">The container needs to "wake up" for the first request. This adds latency.</p>

<h3 class="text-xl font-bold text-white mb-4">2. The Edge</h3>
<p>Running code on CDN nodes physically closer to the user. Near-zero latency.</p>
                `,
                code: `// Example 1: AWS Lambda Handler
exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};`,
                interview: {
                    questions: [
                        { q: "Pros and Cons of Serverless?", a: "Pros: Infinite scale, zero ops, cost effective for spiky traffic. Cons: Cold starts, vendor lock-in, hard to debug, stateless." },
                        { q: "How to handle DB connections in Serverless?", a: "Reuse the connection outside the handler function. Or use a connection pool proxy (like AWS RDS Proxy/Prisma Accelerate)." }
                    ]
                }
            },
            {
                day: 15,
                title: 'Capstone: Designing Twitter',
                intro: "Putting it all together. A classic System Design interview question.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Fan-Out Problem</h3>
<p class="mb-4">When Justin Bieber tweets, 100M people need to see it.</p>
<ul class="list-disc list-inside space-y-2 bg-dark-800 p-4 rounded-lg">
    <li><strong>Pull Model:</strong> Users query DB on load. (Slow reads).</li>
    <li><strong>Push Model:</strong> Pre-compute feeds into Redis Lists. (Fast reads, slow writes).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">2. Architecture</h3>
<p>LB ➞ API ➞ Fan-out Service ➞ Redis Cluster ➞ User Feed.</p>
                `,
                code: `// No code, just architecture diagrams in your head.
// 1. LB -> Web Server -> Redis (Feed) -> User
// 2. Async Worker -> Fan out tweets to Redis Lists`,
                interview: {
                    questions: [
                        { q: "How to store Images?", a: "S3 (Object Storage). Store the URL in the DB. Use a CDN to serve them." },
                        { q: "How to generate unique IDs?", a: "Twitter Snowflake (Timestamp + Machine ID + Sequence). UUIDs are too big and not sortable." },
                        { q: "How to search tweets?", a: "Elasticsearch (Inverted Index). A separate service that indexes tweets asynchronously." }
                    ]
                }
            }
        ]
    }
};

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
                comparison: {
                    junior: `// ❌ The "Old Way" (Hoisting Bugs)
console.log(name); // undefined (Confusing!)
var name = "John";

function loop() {
  // var leaks out of the for loop!
  for(var i=0; i<5; i++) {
    setTimeout(function() {
      // By the time this runs, i is 5
      console.log(i); // 5, 5, 5, 5, 5
    }, 100);
  }
}
loop();`,
                    senior: `// ✅ The "Architect Way" (Safe)
// 1. const/let prevent usage before declaration
const name = "John";

const loop = () => {
  // 2. let creates a new binding for each iteration
  for(let i=0; i<5; i++) {
    setTimeout(() => {
      // Closure captures the correct block-scoped i
      console.log(i); // 0, 1, 2, 3, 4
    }, 100);
  }
};
loop();`
                },
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
                comparison: {
                    junior: `// ❌ Global Pollution
// script.js
var config = { theme: 'dark' }; // Attached to window.config

function init() {
  // Might accidentally overwrite window.config
  config = { theme: 'light' }; 
}`,
                    senior: `// ✅ Module Scope
// config.js
export const config = { theme: 'dark' }; 
// Not on window. Encapsulated.

// main.js
import { config } from './config.js';
// We know exactly where it came from.`
                },
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
                comparison: {
                    junior: `// ❌ Dirty Global State
let count = 0; // Anyone can mess this up

function increment() {
  count++;
  return count;
}

count = 100; // Bug caused by another script`,
                    senior: `// ✅ Encapsulated Closure
const createCounter = () => {
  let count = 0; // Private
  return {
    increment: () => ++count,
    get: () => count
  };
};

const counter = createCounter();
counter.increment(); // 1
// counter.count is undefined (Safe)`
                },
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
                comparison: {
                    junior: `// ❌ The "Self" Hack
function Timer() {
  this.seconds = 0;
  var self = this; // Caching 'this' manually
  
  setInterval(function() {
    self.seconds++; // Uses closure
    console.log(self.seconds);
  }, 1000);
}`,
                    senior: `// ✅ Arrow Functions
function Timer() {
  this.seconds = 0;
  
  // Arrow function inherits 'this' from Timer
  setInterval(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}`
                },
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
                comparison: {
                    junior: `// ❌ Direct Mutation (Slow & Dangerous)
const cat = {};
cat.__proto__ = { meow: true };

// Or worse, modifying built-ins
Array.prototype.last = function() {
  return this[this.length - 1];
};`,
                    senior: `// ✅ Proper Inheritance
class Animal {
  constructor(name) { this.name = name; }
}

class Cat extends Animal {
  meow() { return true; }
}

// Optimized by engine. Safer.`
                },
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
                comparison: {
                    junior: `// ❌ Blocking the Thread
function processHugeList(list) {
  // Freezes UI for 5 seconds
  for (let item of list) {
    heavyCalc(item);
  }
}`,
                    senior: `// ✅ Chunking (Yielding to Loop)
function processHugeList(list) {
  if (list.length === 0) return;

  // Process 100 items, then yield
  const chunk = list.splice(0, 100);
  chunk.forEach(heavyCalc);

  // Schedule next chunk after paint
  setTimeout(() => {
    processHugeList(list);
  }, 0);
}`
                },
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
                comparison: {
                    junior: `// ❌ Callback Hell
getUser(id, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0], function(comments) {
      console.log(comments);
    });
  });
});`,
                    senior: `// ✅ Promise Chaining
getUser(id)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0]))
  .then(comments => console.log(comments))
  .catch(handleError); // One catch for all`
                },
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
                comparison: {
                    junior: `// ❌ Mixing Styles
function getData() {
  // Returns a promise but doesn't await it properly
  return fetch('/api')
    .then(r => r.json())
    .then(data => {
       // Logic buried inside .then
       return process(data);
    });
}`,
                    senior: `// ✅ Flat Async/Await
async function getData() {
  const res = await fetch('/api');
  const data = await res.json();
  // Linear logic, easy to read
  return process(data);
}`
                },
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
                comparison: {
                    junior: `// ❌ Dangling Listeners
useEffect(() => {
  // Attaches a NEW listener every render
  window.addEventListener('resize', handleResize);
  // Forget to clean up! Leak!
});`,
                    senior: `// ✅ Cleanup Function
useEffect(() => {
  window.addEventListener('resize', handleResize);
  
  // React runs this when component unmounts
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);`
                },
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
                comparison: {
                    junior: `// ❌ Freezing the UI
button.onclick = () => {
  // This blocks the UI for 3 seconds
  const result = calculatePrimes(10000000);
  show(result);
};`,
                    senior: `// ✅ Offloading to Worker
button.onclick = () => {
  // UI stays responsive immediately
  showLoading();
  worker.postMessage({ action: 'primes', num: 10000000 });
};

worker.onmessage = (e) => {
  hideLoading();
  show(e.data);
};`
                },
                interview: {
                    questions: [
                        { q: "Can Web Workers modify the DOM?", a: "No. They run in a separate thread without `window` or `document` access. They must message the main thread to update UI." },
                        { q: "What is the cost of postMessage?", a: "Serialization. Sending huge objects takes time to copy. Use SharedArrayBuffer or Transferable Objects for performance." },
                        { q: "Difference between Web Worker and Service Worker?", a: "Web Workers are for computation. Service Workers are for network interception (caching/offline) and act as a proxy." }
                    ]
                }
            },
            // --- WEEK 3: ADVANCED PATTERNS ---
            {
                day: 11,
                title: 'Functional Programming: Composition & Purity',
                intro: "OOP is about Objects. FP is about Actions (Verbs). Learning FP makes your code predictable and testable.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Pure Functions</h3>
<p class="mb-4">A pure function always returns the same output for the same input and has <strong>No Side Effects</strong>.</p>

<div class="grid grid-cols-2 gap-4 mb-6">
    <div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
        <span class="text-red-400 font-bold block mb-2">Impure</span>
        Modifies global variables, DOM, or API calls.
    </div>
    <div class="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
        <span class="text-green-400 font-bold block mb-2">Pure</span>
        Input ➔ Output. No surprises.
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Composition</h3>
<p>Building complex logic by gluing simple functions together. <code class="text-brand-primary">f(g(x))</code>.</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre>
const toUpper = str => str.toUpperCase();
const exclaim = str => str + "!";
const shout = compose(exclaim, toUpper);

shout("hello"); // "HELLO!"
</pre>
</div>
                `,
                code: `// Example 1: Immutability
const user = { name: "John", score: 10 };

// Bad (Mutation)
// user.score = 20; 

// Good (Copy)
const updatedUser = { ...user, score: 20 };`,
                comparison: {
                    junior: `// ❌ Side Effects (Hard to Test)
let total = 0;
function addToTotal(amount) {
  total += amount; // Modifies external state
  updateUI(total); // Modifies DOM
}`,
                    senior: `// ✅ Pure Function (Predictable)
const add = (a, b) => a + b;

// Logic is separated from Side Effects
const newTotal = add(total, amount);
updateUI(newTotal);`
                },
                interview: {
                    questions: [
                        { q: "What is a Higher Order Function?", a: "A function that takes a function as an argument OR returns a function. Example: `.map()`, `.filter()`." },
                        { q: "Why is Immutability important in React?", a: "React uses shallow comparison to detect changes. If you mutate an object, the reference stays the same, so React won't re-render." },
                        { q: "What is Currying?", a: "Transforming a function with multiple args `f(a,b)` into a sequence of functions `f(a)(b)`." }
                    ]
                }
            },
            {
                day: 12,
                title: 'Currying & Partial Application',
                intro: "Currying sounds academic, but it's practical. It lets you create specialized functions from generic ones.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Concept</h3>
<p class="mb-4">Instead of <code class="bg-dark-800 px-1 rounded">add(1, 2)</code>, we write <code class="bg-dark-800 px-1 rounded">add(1)(2)</code>.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto shadow-inner">
<pre>
   [ Generic ]         [ Specific ]
   add(x) ────▶  add(10)  ────▶  add10(y)
    │
    └────▶ Returns a Function waiting for 'y'
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Real World Use Case</h3>
<p>Event Handlers and Configuration.</p>
                `,
                code: `// Example 1: Simple Curry
const multiply = (a) => (b) => a * b;
const double = multiply(2);
console.log(double(10)); // 20

// Example 2: React Handler
const handleChange = (field) => (e) => {
   setState({ [field]: e.target.value });
};
// usage: onChange={handleChange('email')}`,
                comparison: {
                    junior: `// ❌ Repetitive Code
const filterDogs = (items) => items.filter(i => i.type === 'dog');
const filterCats = (items) => items.filter(i => i.type === 'cat');
const filterBirds = (items) => items.filter(i => i.type === 'bird');`,
                    senior: `// ✅ Curried Factory
const filterBy = (type) => (items) => 
  items.filter(i => i.type === type);

const dogs = filterBy('dog')(items);
const cats = filterBy('cat')(items);`
                },
                interview: {
                    questions: [
                        { q: "Difference between Currying and Partial Application?", a: "Currying breaks a function into N unary functions (1 arg each). Partial application fixes some arguments and produces a function with smaller arity." },
                        { q: "Why use Currying in functional composition?", a: "It makes functions unary (single argument), which makes them easily chainable in a pipeline `compose(f, g, h)`." },
                        { q: "Write a `sum(2)(3)` function.", a: "`const sum = a => b => a + b;`" }
                    ]
                }
            },
            {
                day: 13,
                title: 'The Proxy & Reflect API',
                intro: "Proxies allow you to intercept fundamental operations (reading/writing properties). It's meta-programming.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Middleman</h3>
<p class="mb-4">A Proxy sits between you and the Object. It can lie, validate, or log every interaction.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-blue-300 mb-6 overflow-x-auto shadow-inner">
<pre>
       [ User ] ──▶ [ Proxy ] ──▶ [ Target Object ]
                       │
                  [ Trap: get ]
                  "You accessed property 'x'"
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Use Cases</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 bg-dark-800 p-4 rounded-lg mb-6">
    <li><strong>Validation:</strong> Reject invalid types on assignment.</li>
    <li><strong>Data Binding:</strong> Vue 3 uses Proxies for reactivity.</li>
    <li><strong>Logging:</strong> Debug property access.</li>
</ul>
                `,
                code: `// Example 1: Validation Proxy
const validator = {
  set: (obj, prop, value) => {
    if (prop === 'age' && value < 0) {
      throw new Error("Age must be positive");
    }
    obj[prop] = value;
    return true;
  }
};

const person = new Proxy({}, validator);
person.age = 25; // OK
// person.age = -5; // Error`,
                comparison: {
                    junior: `// ❌ Manual Getters/Setters everywhere
class User {
  setAge(age) {
    if (age < 0) throw new Error();
    this.age = age;
  }
  setName(name) {
    if (!name) throw new Error();
    this.name = name;
  }
}`,
                    senior: `// ✅ Generic Proxy Validator
const safeObj = new Proxy({}, {
  set(target, prop, val) {
    if (prop === 'age' && val < 0) throw 'Invalid';
    target[prop] = val;
    return true;
  }
});
// Works for any property dynamically`
                },
                interview: {
                    questions: [
                        { q: "What is the `Reflect` API?", a: "It provides methods corresponding to Proxy traps (e.g., `Reflect.set`). It allows you to forward operations to the original object cleanly." },
                        { q: "Can you proxy a function?", a: "Yes. You can use the `apply` trap to intercept function calls." },
                        { q: "Why use Proxy over `Object.defineProperty`?", a: "Proxy can intercept dynamic properties that don't exist yet. `defineProperty` only works on specific, known keys." }
                    ]
                }
            },
            {
                day: 14,
                title: 'Iterators & Generators',
                intro: "Make your own objects compatible with `for...of`. Iterators provide a standard way to produce a sequence of values.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Symbol.iterator</h3>
<p class="mb-4">Any object with this symbol can be looped over.</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre>
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() { ... }
};

for(let num of range) { ... }
</pre>
</div>
                `,
                code: `// Example 1: Custom Iterator
const myCollection = {
  items: [10, 20, 30],
  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }
};

console.log([...myCollection]); // [10, 20, 30]`,
                comparison: {
                    junior: `// ❌ Exposed Internal Array
class Deck {
  constructor() { this.cards = [/*...*/]; }
}

const deck = new Deck();
// Client has to know 'cards' exists
for(let card of deck.cards) {}`,
                    senior: `// ✅ Iterator Protocol
class Deck {
  constructor() { this.cards = [/*...*/]; }
  
  // Make the Deck itself iterable
  *[Symbol.iterator]() {
     for(let c of this.cards) yield c;
  }
}

// Cleaner API
for(let card of new Deck()) {}`
                },
                interview: {
                    questions: [
                        { q: "What is a Generator function?", a: "A function declared with `function*` that returns a Generator object. It can pause execution with `yield`." },
                        { q: "Difference between `for...in` and `for...of`?", a: "`for...in` iterates keys (enumerable properties). `for...of` iterates values (using the iterator protocol)." },
                        { q: "How does `async` await relate to generators?", a: "Async/await is syntactic sugar for a Generator that yields Promises, driven by a runner function." }
                    ]
                }
            },
            {
                day: 15,
                title: 'ES Modules vs CommonJS',
                intro: "The battle of `require` vs `import`. Understanding the difference is crucial for configuring Node.js and Bundlers.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. CommonJS (Node.js Legacy)</h3>
<p class="mb-4">Dynamic. Synchronous. Object-based.</p>
<code class="block bg-dark-900 p-2 rounded mb-4">const fs = require('fs');</code>

<h3 class="text-xl font-bold text-white mb-4">2. ES Modules (Standard)</h3>
<p class="mb-4">Static. Asynchronous. Keyword-based.</p>
<code class="block bg-dark-900 p-2 rounded mb-6">import fs from 'node:fs';</code>

<h3 class="text-xl font-bold text-white mb-4">3. Tree Shaking</h3>
<p>Only ESM supports Tree Shaking because imports are static (analyzable at compile time).</p>
                `,
                code: `// Example: Named vs Default Exports
// lib.js
export const add = (a, b) => a + b;
export default function log() { ... }

// main.js
import log, { add } from './lib.js';`,
                comparison: {
                    junior: `// ❌ Loading Everything (CommonJS)
// Creates a huge bundle
const _ = require('lodash');
_.map([1,2], n => n*2);`,
                    senior: `// ✅ Tree Shaking (ESM)
// Bundler can remove unused code
import { map } from 'lodash-es';
map([1,2], n => n*2);`
                },
                interview: {
                    questions: [
                        { q: "Why is ESM better for bundlers?", a: "Because the import structure is static, bundlers can build a dependency graph without running the code, enabling Tree Shaking (dead code elimination)." },
                        { q: "Can you use `require` and `import` in the same file?", a: "Usually no. Node.js treats files as either CJS or ESM based on extension (.mjs vs .cjs) or package.json type." },
                        { q: "How to use Top-Level Await?", a: "It is only available in ES Modules. It allows `await` outside of async functions at the root of the module." }
                    ]
                }
            },
            {
                day: 16,
                title: 'Sets, Maps vs Objects, Arrays',
                intro: "Stop using Objects for everything. Maps are faster for frequent additions/removals and allow keys of any type.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Map vs Object</h3>
<div class="overflow-hidden rounded-xl border border-dark-600 mb-6">
    <table class="w-full text-sm text-left">
        <thead class="bg-dark-800 text-light-300">
            <tr>
                <th class="p-3">Feature</th>
                <th class="p-3">Object</th>
                <th class="p-3">Map</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-dark-700 bg-dark-900">
            <tr>
                <td class="p-3">Key Types</td>
                <td class="p-3">Strings/Symbols</td>
                <td class="p-3">Any (Objects, Funcs)</td>
            </tr>
            <tr>
                <td class="p-3">Order</td>
                <td class="p-3">Unreliable</td>
                <td class="p-3">Insertion Order</td>
            </tr>
             <tr>
                <td class="p-3">Size</td>
                <td class="p-3">Manual Count</td>
                <td class="p-3">.size</td>
            </tr>
        </tbody>
    </table>
</div>
                `,
                code: `// Example 1: Set (Unique Values)
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]

// Example 2: Map (Object Keys)
const userMap = new Map();
const user1 = { id: 1 };
userMap.set(user1, "Metadata"); // Key is object reference`,
                comparison: {
                    junior: `// ❌ Object as Map
const cache = {};
// Keys are converted to strings!
cache[1] = "A"; 
cache["1"] = "B"; 
// cache[1] is now "B" (Collision)`,
                    senior: `// ✅ Real Map
const cache = new Map();
cache.set(1, "A");
cache.set("1", "B");
// cache.get(1) is "A" (Preserves Type)`
                },
                interview: {
                    questions: [
                        { q: "When to use Set?", a: "When you need a list of unique values or need fast lookup `has()` (O(1)) compared to Array `includes()` (O(n))." },
                        { q: "Are Map keys garbage collected?", a: "Standard Maps hold strong references. Use `WeakMap` if you want keys to be garbage collected when no longer used elsewhere." },
                        { q: "How to iterate a Map?", a: "`for (let [key, val] of map) { ... }`" }
                    ]
                }
            },
            {
                day: 17,
                title: 'Design Patterns: Singleton, Factory, Observer',
                intro: "Patterns are proven solutions to common problems. Don't reinvent the wheel.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Singleton</h3>
<p class="mb-4">Ensure a class has only one instance (e.g., Database Connection).</p>

<h3 class="text-xl font-bold text-white mb-4">2. Observer (Pub/Sub)</h3>
<p class="mb-4">One object changes state, notifies all subscribers. (Redux, Event Listeners).</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-yellow-300 mb-6 overflow-x-auto shadow-inner">
<pre>
   [ Subject ] 
       │
    Notify() ──┬──▶ [ Observer A ]
               ├──▶ [ Observer B ]
               └──▶ [ Observer C ]
</pre>
</div>
                `,
                code: `// Example: Singleton
class Database {
  constructor() {
    if (Database.instance) return Database.instance;
    Database.instance = this;
    this.conn = "Connected";
  }
}
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true`,
                comparison: {
                    junior: `// ❌ Tight Coupling
class Button {
  click() {
    // Button knows too much about other classes
    header.update();
    analytics.track();
    sound.play();
  }
}`,
                    senior: `// ✅ Observer Pattern
class Button {
  constructor() { this.observers = []; }
  subscribe(fn) { this.observers.push(fn); }
  click() {
    this.observers.forEach(fn => fn());
  }
}
// Decoupled
btn.subscribe(header.update);
btn.subscribe(analytics.track);`
                },
                interview: {
                    questions: [
                        { q: "What is the Module Pattern?", a: "Using Closures/IIFE to create private scope and return a public API." },
                        { q: "Explain the Factory Pattern.", a: "A function that creates objects without calling `new`. Useful for complex creation logic." },
                        { q: "What pattern does React use?", a: "Observer (State changes -> UI updates) and Composition (Components)." }
                    ]
                }
            },
            // --- WEEK 4: ARCHITECTURE & SECURITY ---
            {
                day: 18,
                title: 'SOLID Principles in JavaScript',
                intro: "Code that is easy to maintain follows SOLID. S: Single Responsibility is the most important.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Single Responsibility (SRP)</h3>
<p class="mb-4">A function/class should have <strong>one reason to change</strong>.</p>

<h3 class="text-xl font-bold text-white mb-4">2. Open/Closed (OCP)</h3>
<p class="mb-4">Open for extension, closed for modification. Use configuration/plugins instead of changing code.</p>

<div class="overflow-hidden rounded-xl border border-dark-600 mb-6">
    <table class="w-full text-sm text-left">
        <thead class="bg-dark-800 text-light-300">
            <tr>
                <th class="p-3">Principle</th>
                <th class="p-3">Meaning</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-dark-700 bg-dark-900">
            <tr><td class="p-3">S</td><td class="p-3">Single Responsibility</td></tr>
            <tr><td class="p-3">O</td><td class="p-3">Open/Closed</td></tr>
            <tr><td class="p-3">L</td><td class="p-3">Liskov Substitution</td></tr>
            <tr><td class="p-3">I</td><td class="p-3">Interface Segregation</td></tr>
            <tr><td class="p-3">D</td><td class="p-3">Dependency Inversion</td></tr>
        </tbody>
    </table>
</div>
                `,
                code: `// Example: OCP (Open/Closed)
class Validator {
    constructor() {
        this.rules = [];
    }
    addRule(rule) { this.rules.push(rule); }
    validate(val) { return this.rules.every(r => r(val)); }
}

// We extend functionality without changing the class
const v = new Validator();
v.addRule(x => x > 0);
v.addRule(x => x < 100);`,
                comparison: {
                    junior: `// ❌ God Function (Violates SRP)
function registerUser(user) {
  // 1. Validate
  if (!user.email) throw Error();
  // 2. Save DB
  db.save(user);
  // 3. Send Email
  email.send(user.email);
  // 4. Update UI
  dom.render(user);
}`,
                    senior: `// ✅ SRP
function registerUser(user) {
  validate(user);
  repo.save(user);
  notifier.notify(user);
}
// Each function does ONE thing.`
                },
                interview: {
                    questions: [
                        { q: "Why is Dependency Inversion important?", a: "It decouples high-level logic from low-level details. Instead of 'App depends on SQL', 'App depends on Database Interface', and SQL implements that." },
                        { q: "What is Liskov Substitution?", a: "Subclasses should be substitutable for their base classes without breaking the app." },
                        { q: "How to apply SRP to React Components?", a: "Split components: One for Logic (Container/Hook) and one for UI (Presentational)." }
                    ]
                }
            },
            {
                day: 19,
                title: 'Testing Strategies (Unit vs Integration)',
                intro: "If it's not tested, it's broken. Learn the Pyramid of Testing.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Testing Pyramid</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 bg-dark-800 p-4 rounded-lg mb-6">
    <li><strong>E2E (Top 10%):</strong> Click buttons in browser (Cypress). Slow.</li>
    <li><strong>Integration (Middle 30%):</strong> Test module interactions.</li>
    <li><strong>Unit (Bottom 60%):</strong> Test single functions (Jest/Vitest). Fast.</li>
</ul>
                `,
                code: `// Example: Jest Unit Test
// math.js
export const add = (a, b) => a + b;

// math.test.js
test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});`,
                comparison: {
                    junior: `// ❌ Console Log Testing
function add(a, b) { return a + b; }

console.log(add(1, 2)); // Look at terminal
console.log(add(-1, 5)); // Hope it's right`,
                    senior: `// ✅ Automated Tests
describe('add', () => {
  it('handles negative numbers', () => {
    expect(add(-1, 5)).toBe(4);
  });
  
  it('throws on string input', () => {
    expect(() => add("1", 2)).toThrow();
  });
});`
                },
                interview: {
                    questions: [
                        { q: "What is TDD?", a: "Test Driven Development. 1. Write fail test. 2. Write code to pass. 3. Refactor." },
                        { q: "Mock vs Stub?", a: "Stub provides canned answers. Mock verifies behavior (was this function called?)." },
                        { q: "What is Code Coverage?", a: "The percentage of lines of code executed during tests." }
                    ]
                }
            },
            {
                day: 20,
                title: 'Security: XSS, CSRF & Architecture',
                intro: "The final boss. You can't be an architect if your app gets hacked on day 1.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. XSS (Cross Site Scripting)</h3>
<p class="mb-4">Injecting malicious scripts into your site.</p>
<div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30 mb-6">
    <code class="text-red-400">INPUT: &lt;img src=x onerror=stealCookies()&gt;</code>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. CSRF (Cross Site Request Forgery)</h3>
<p class="mb-4">Tricking a logged-in user to click a link that performs an action (e.g., delete account).</p>
                `,
                code: `// Example: Sanitization
import DOMPurify from 'dompurify';

const userContent = "<script>alert('Hack')</script>Hello";
const clean = DOMPurify.sanitize(userContent);
// Result: "Hello"`,
                comparison: {
                    junior: `// ❌ Vulnerable to XSS
div.innerHTML = userComment; 
// If comment has <script>, it runs!`,
                    senior: `// ✅ Safe Rendering
div.textContent = userComment;
// Browsers treats it as text, not code.

// Or in React:
// {userComment} (Auto-escaped)`
                },
                interview: {
                    questions: [
                        { q: "How to prevent XSS?", a: "Never use `innerHTML` with user input. Use libraries like DOMPurify. Use Content Security Policy (CSP) headers." },
                        { q: "What is an HttpOnly cookie?", a: "A cookie that cannot be accessed by JavaScript (document.cookie). It prevents XSS attacks from stealing session tokens." },
                        { q: "What is CORS?", a: "Cross-Origin Resource Sharing. Browser mechanism to allow/block requests from different domains." }
                    ]
                }
            }
        ]
    },
    react: {
        id: 'react',
        title: 'React: The Professional Guide',
        description: 'Master the internals of React 19. Fiber, Concurrent Mode, Suspense, and Server Components.',
        totalDays: 15,
        days: [
            {
                day: 0,
                title: 'Day 0: The Professional Setup',
                intro: "Stop using Create-React-App. Learn the professional toolchain: Vite, ESLint, Prettier, and VS Code extensions.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Why Not Create-React-App?</h3>
<p class="mb-4 text-light-300">CRA is great for beginners, but it's slow and opinionated. Modern development uses faster bundlers like Vite.</p>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
    <pre><code>
┌───────────────────────────┐     ┌───────────────────────────┐
│       Webpack (CRA)       │     │         Vite (ESBuild)    │
│───────────────────────────│     │───────────────────────────│
│ 1. Bundles ALL JS/CSS     │     │ 1. Serves NATIVE ESM      │
│    into a single file.    │     │    (no bundling in dev).  │
│ 2. Slow Dev Server Start  │     │ 2. Instant Dev Server     │
│    (Bundles everything).  │     │    (Browser handles imports).
│ 3. HMR is slower.         │     │ 3. HMR is lightning fast. │
│ 4. Complex config.        │     │ 4. Simple config.         │
└───────────────────────────┘     └───────────────────────────┘
    </code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Setup with Vite</h3>
<p class="mb-4 text-light-300">Let's create a new React project with Vite.</p>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
    <pre><code>
# Create a new Vite + React project
npm create vite@latest my-react-app -- --template react-ts

# Navigate into your project
cd my-react-app

# Install dependencies
npm install

# Start the development server
npm run dev
    </code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3. Essential VS Code Extensions</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>**ESLint:** For code quality and catching errors early.</li>
    <li>**Prettier:** For consistent code formatting.</li>
    <li>**Tailwind CSS IntelliSense:** For auto-completion and linting Tailwind classes.</li>
    <li>**GitLens:** For powerful Git insights.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">4. Code Formatting & Linting</h3>
<p class="mb-4 text-light-300">Configure ESLint and Prettier for a professional workflow.</p>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
    <pre><code>
# Install ESLint and Prettier packages
npm install -D eslint prettier eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier

# Create .eslintrc.cjs (example config)
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier' // Must be last
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}

# Create .prettierrc.json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
    </code></pre>
</div>
                    `,
                code: `function App() {
  const tools = [
    { name: 'Vite', desc: 'Lightning fast bundler', status: '✅' },
    { name: 'ESLint', desc: 'Code quality checker', status: '✅' },
    { name: 'Prettier', desc: 'Code formatter', status: '✅' },
    { name: 'TypeScript', desc: 'Type safety', status: '✅' },
  ];
  
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
      <h3>🛠️ Professional React Setup</h3>
      <p style={{ color: '#666', marginBottom: '15px' }}>
        Modern tools for modern development
      </p>
      <div style={{ display: 'grid', gap: '8px' }}>
        {tools.map(tool => (
          <div key={tool.name} style={{ 
            padding: '12px', 
            background: '#f0fdf4', 
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              <strong>{tool.name}</strong>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{tool.desc}</p>
            </div>
            <span style={{ fontSize: '20px' }}>{tool.status}</span>
          </div>
        ))}
      </div>
      <p style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        Run: npm create vite@latest my-app -- --template react-ts
      </p>
    </div>
  );
}`,
                video: 'SqcY0GlETPk', 
                comparison: {
                    junior: `// ❌ Manual Setup (CRA)
// npx create-react-app my-app
// Wait 5 minutes...
// Eject config to customize...
// Regret life choices...`,
                    senior: `// ✅ Vite + TS
// npm create vite@latest
// Instant start.
// Built-in TypeScript support.
// Optimized Build.`
                },
                interview: {
                    questions: [
                        { q: "Why choose Vite over Webpack for a new React project?", a: "Vite offers significantly faster development server startup and HMR (Hot Module Replacement) due to its use of native ES Modules and ESBuild for bundling, leading to a much smoother developer experience compared to Webpack's traditional bundling approach." },
                        { q: "What is the role of ESLint and Prettier in a professional React workflow?", a: "ESLint enforces code quality and catches potential errors or anti-patterns, while Prettier ensures consistent code formatting across the entire team. Together, they reduce cognitive load, improve readability, and prevent debates over style." },
                        { q: "How do you manage Node.js versions in a professional environment?", a: "Tools like `nvm` (Node Version Manager) are essential. They allow developers to easily switch between different Node.js versions required by various projects, preventing compatibility issues and ensuring a consistent development environment." }
                    ]
                }
            },
            {
                day: 1,
                title: 'Virtual DOM & Reconciliation',
                intro: "React is fast because it doesn't touch the DOM. It touches the Virtual DOM.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Diffing Algorithm</h3>
<p class="mb-4">When state changes, React creates a new VDOM tree and compares it to the old one.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ New VDOM ]      [ Old VDOM ]
     │                 │
     ▼                 ▼
  Compare (Diff) ──▶ [ Updates ]
                         │
                         ▼
                    [ Real DOM ]
                    (Minimal Paints)
</pre>
</div>
                `,
                code: `function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Virtual DOM Demo</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <p style={{ color: '#666', marginTop: '10px' }}>
        React only updates what changed!
      </p>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Direct DOM Manipulation
function updateCount(n) {
  // Slow! Triggers repaint immediately
  document.getElementById('count').innerText = n;
  document.getElementById('msg').innerHTML = 'Updated';
}`,
                    senior: `// ✅ Declarative State
const [count, setCount] = useState(0);

// React batches updates and touches DOM once
return (
  <div>
    <span id="count">{count}</span>
    <span>Updated</span>
  </div>
);`
                },
                interview: {
                    questions: [
                        { q: "What is the Virtual DOM?", a: "A lightweight JavaScript representation of the UI. React uses it to calculate the minimum number of changes needed for the real DOM." },
                        { q: "What is Reconciliation?", a: "The process of syncing the VDOM with the Real DOM." },
                        { q: "Why is `key` important in lists?", a: "Keys help React identify which items have changed, added, or removed. Without keys, React might re-render the entire list." }
                    ]
                }
            },
            {
                day: 2,
                title: 'JSX & React.createElement',
                intro: "JSX is not HTML. It's JavaScript XML. It compiles down to function calls.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Babel's Job</h3>
<p>Babel transpiles JSX into <code>React.createElement()</code>.</p>
                `,
                code: `function App() {
  const name = "React Developer";
  const styles = { color: 'blue', padding: '10px' };
  
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2 style={styles}>Hello, {name}!</h2>
      <p>JSX allows JavaScript expressions in curly braces</p>
      <p>2 + 2 = {2 + 2}</p>
      <ul>
        {['React', 'Vue', 'Angular'].map(fw => (
          <li key={fw}>{fw}</li>
        ))}
      </ul>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Confusing Logic in JSX
return (
  <div>
    {user ? (
       admin ? <Admin /> : <User />
    ) : <Login />}
  </div>
); // Nested ternaries are hard to read`,
                    senior: `// ✅ Early Returns
if (!user) return <Login />;
if (admin) return <Admin />;
return <User />;`
                },
                interview: {
                    questions: [
                         { q: "Can browsers read JSX?", a: "No. It must be transpiled by Babel/SWC into standard JavaScript." },
                         { q: "Why is `class` becomes `className`?", a: "`class` is a reserved keyword in JavaScript." }
                    ]
                }
            },
            {
                day: 3,
                title: 'Props vs State',
                intro: "Props are arguments passed to functions. State is memory inside the function.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. One-Way Data Flow</h3>
<p>Data flows DOWN. Actions flow UP.</p>
                `,
                code: `function Child({ name, onUpdate }) {
  return (
    <div style={{ padding: '10px', background: '#f0f0f0', margin: '5px' }}>
      <p>Child received: <strong>{name}</strong></p>
      <button onClick={() => onUpdate('Updated from Child!')}>
        Update Parent
      </button>
    </div>
  );
}

function App() {
  const [message, setMessage] = React.useState('Hello from Parent');
  
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
      <h3>Props vs State Demo</h3>
      <p>Parent state: {message}</p>
      <Child name={message} onUpdate={setMessage} />
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Mutating Props
const Child = (props) => {
  props.name = "Bob"; // ERROR: Read-only
  return <div>{props.name}</div>;
};`,
                    senior: `// ✅ Local State
const Child = ({ name }) => {
  const [localName, setLocalName] = useState(name);
  return <div onClick={() => setLocalName("Bob")}>{localName}</div>;
};`
                },
                interview: {
                    questions: [
                        { q: "Can a child modify parent state?", a: "Not directly. The parent must pass a callback function (updater) to the child." }
                    ]
                }
            },
            {
                day: 4,
                title: 'State Management & Batching',
                intro: "React 18 batches state updates automatically to prevent unnecessary renders.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Automatic Batching</h3>
<p>Multiple <code>setState</code> calls are grouped into one render.</p>
                `,
                code: `function App() {
  const [count, setCount] = React.useState(0);
  const [flag, setFlag] = React.useState(false);
  const [renders, setRenders] = React.useState(0);
  
  React.useEffect(() => {
    setRenders(r => r + 1);
  });
  
  const handleClick = () => {
    // React 18 batches these into ONE render!
    setCount(c => c + 1);
    setFlag(f => !f);
  };
  
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
      <h3>State Batching Demo</h3>
      <p>Count: {count}</p>
      <p>Flag: {flag ? 'ON' : 'OFF'}</p>
      <p style={{ color: '#666' }}>Render count: {renders}</p>
      <button onClick={handleClick}>
        Update Both (Batched!)
      </button>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Stale State
const inc = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};
// Result: count + 1 (Not +3)`,
                    senior: `// ✅ Functional Updates
const inc = () => {
  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);
};
// Result: count + 3`
                },
                interview: {
                    questions: [
                        { q: "Is setState synchronous?", a: "No. It is asynchronous to allow batching." }
                    ]
                }
            },
            {
                day: 5,
                title: 'Effects & Lifecycle',
                intro: "`useEffect` allows you to sync your component with external systems (API, DOM, Subscriptions).",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Dependency Array</h3>
<p>Controls when the effect runs.</p>
                `,
                code: `function App() {
  const [count, setCount] = React.useState(0);
  const [logs, setLogs] = React.useState([]);
  
  const log = (msg) => setLogs(prev => [...prev, msg]);
  
  // Runs on EVERY render
  React.useEffect(() => {
    log('Effect: Runs on every render');
  });
  
  // Runs ONLY on mount
  React.useEffect(() => {
    log('Effect: Mounted!');
    return () => log('Cleanup: Unmounting...');
  }, []);
  
  // Runs when count changes
  React.useEffect(() => {
    log('Effect: Count changed to ' + count);
  }, [count]);
  
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
      <h3>useEffect Demo</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <div style={{ marginTop: '10px', padding: '10px', background: '#1a1a2e', color: '#22c55e', fontFamily: 'monospace', fontSize: '12px', maxHeight: '150px', overflow: 'auto' }}>
        {logs.map((log, i) => <div key={i}>→ {log}</div>)}
      </div>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Missing Dependency
useEffect(() => {
  console.log(count);
}, []); // Warning: count is stale!`,
                    senior: `// ✅ Correct Dependency
useEffect(() => {
  console.log(count);
}, [count]); // Runs when count changes`
                },
                interview: {
                    questions: [
                        { q: "What does the return function of useEffect do?", a: "It is the cleanup function. Runs before the component unmounts or before the effect re-runs." }
                    ]
                }
            },
            {
                day: 6,
                title: 'Refs & The DOM',
                intro: "Need to focus an input or measure a div? Use `useRef`. It persists values without re-rendering.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Persistent Storage</h3>
<p>Like a class instance variable.</p>
                `,
                code: `function App() {
  const inputRef = React.useRef(null);
  const renderCount = React.useRef(0);
  const [value, setValue] = React.useState('');
  
  renderCount.current++;
  
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
      <h3>useRef Demo</h3>
      <input 
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Type something..."
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>
      <p style={{ color: '#666', marginTop: '10px' }}>
        Render count (ref doesn't cause re-render): {renderCount.current}
      </p>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ DOM Query
function focus() {
  document.getElementById('my-input').focus();
}`,
                    senior: `// ✅ React Ref
const ref = useRef();
<input ref={ref} />
// ref.current.focus();`
                },
                interview: {
                    questions: [
                        { q: "Does changing a ref cause a re-render?", a: "No. That's the main difference between Ref and State." }
                    ]
                }
            },
            {
                day: 7,
                title: 'Memoization (useMemo & useCallback)',
                intro: "Don't optimize prematurely. But when you do, use Memoization to skip expensive calculations.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Referential Equality</h3>
<p><code>{'{} === {}'}</code> is false. Objects are compared by reference.</p>
                `,
                code: `function App() {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState('');
  
  // Expensive calculation - only recalculates when count changes
  const expensiveValue = React.useMemo(() => {
    console.log('Computing...');
    return count * 100;
  }, [count]);
  
  // Stable callback reference
  const handleClick = React.useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
      <h3>useMemo & useCallback Demo</h3>
      <p>Count: {count} | Computed: {expensiveValue}</p>
      <button onClick={handleClick}>Increment</button>
      <div style={{ marginTop: '10px' }}>
        <input 
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type here (won't recompute)"
          style={{ padding: '8px' }}
        />
        <p style={{ color: '#666' }}>Typing doesn't trigger useMemo!</p>
      </div>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Breaking Memoization
const Child = React.memo(C);

function Parent() {
  // New function created EVERY render
  const onClick = () => {};
  return <Child onClick={onClick} />;
  // Child re-renders anyway
}`,
                    senior: `// ✅ Stable Reference
const Child = React.memo(C);

function Parent() {
  // Stable function reference
  const onClick = useCallback(() => {}, []);
  return <Child onClick={onClick} />;
  // Child skips render
}`
                },
                interview: {
                    questions: [
                        { q: "When should you NOT use useMemo?", a: "For primitive values or cheap calculations. The overhead of checking dependencies can be higher than the calculation itself." }
                    ]
                }
            },
            {
                day: 8,
                title: 'Context API',
                intro: "Avoid Prop Drilling. Share global data like User Auth or Theme.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Provider Pattern</h3>
<p>Wrap your app in a Provider.</p>
                `,
                code: `const ThemeContext = React.createContext('light');

function ThemeButton() {
  const theme = React.useContext(ThemeContext);
  return (
    <button style={{
      background: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333',
      padding: '10px 20px',
      border: '1px solid #ccc'
    }}>
      Current Theme: {theme}
    </button>
  );
}

function App() {
  const [theme, setTheme] = React.useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
        <h3>Context API Demo</h3>
        <ThemeButton />
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
            Toggle Theme
          </button>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}`,
                comparison: {
                    junior: `// ❌ Prop Drilling
<GrandParent theme={theme} />
// ... inside GrandParent
<Parent theme={theme} />
// ... inside Parent
<Child theme={theme} />`,
                    senior: `// ✅ Context Consumer
// In Child:
const theme = useContext(ThemeContext);
// No intermediate props needed`
                },
                interview: {
                    questions: [
                        { q: "Does Context replace Redux?", a: "For simple global state (Theme, User), yes. For complex high-frequency updates, Redux/Zustand is better due to selectors and preventing unnecessary re-renders." }
                    ]
                }
            },
            {
                day: 9,
                title: 'Custom Hooks',
                intro: "Reuse logic, not UI. If you find yourself copying `useEffect`, make a hook.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Rules of Hooks</h3>
<p>Must start with <code>use</code>. Must call at top level.</p>
                `,
                code: `// Custom Hook
function useCounter(initial = 0) {
  const [count, setCount] = React.useState(initial);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initial);
  return { count, increment, decrement, reset };
}

function App() {
  const { count, increment, decrement, reset } = useCounter(10);
  
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
      <h3>Custom Hook Demo</h3>
      <p style={{ fontSize: '24px' }}>Count: {count}</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
        <button onClick={reset}>Reset</button>
      </div>
      <p style={{ color: '#666', marginTop: '10px' }}>
        useCounter is a reusable custom hook!
      </p>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Duplicate Logic
// Component A
useEffect(() => { fetch('/a').then(...) }, []);

// Component B
useEffect(() => { fetch('/b').then(...) }, []);`,
                    senior: `// ✅ Custom Hook
const useFetch = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => { fetch(url).then(d => setData(d)) }, [url]);
  return data;
}
// Component A
const data = useFetch('/a');`
                },
                interview: {
                    questions: [
                         { q: "Why must hooks be at the top level?", a: "React relies on the order of execution to track state. Conditional hooks break the order." }
                    ]
                }
            },
            {
                day: 10,
                title: 'Patterns: HOCs vs Render Props',
                intro: "Historical patterns are still useful, but Hooks have replaced most of them.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. HOC (Higher Order Component)</h3>
<p>A function that takes a component and returns a new component.</p>
                `,
                code: `// Higher Order Component Pattern
function withLogger(WrappedComponent) {
  return function LoggedComponent(props) {
    React.useEffect(() => {
      console.log('Component mounted:', WrappedComponent.name);
    }, []);
    return <WrappedComponent {...props} />;
  };
}

function Greeting({ name }) {
  return <h2>Hello, {name}!</h2>;
}

const LoggedGreeting = withLogger(Greeting);

function App() {
  const [name, setName] = React.useState('React Developer');
  
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
      <h3>HOC Pattern Demo</h3>
      <LoggedGreeting name={name} />
      <input 
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ padding: '8px', marginTop: '10px' }}
      />
      <p style={{ color: '#666', marginTop: '10px' }}>
        withLogger HOC logs when component mounts
      </p>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Wrapper Hell
<WithAuth>
  <WithRouter>
    <WithTheme>
       <Component />
    </WithTheme>
  </WithRouter>
</WithAuth>`,
                    senior: `// ✅ Hooks Composition
const MyComponent = () => {
  const auth = useAuth();
  const router = useRouter();
  const theme = useTheme();
  
  if (!auth) return <Login />;
  return <div />;
}`
                },
                interview: {
                    questions: [
                        { q: "What is a Render Prop?", a: "A prop whose value is a function that returns a React element. `<List renderItem={(item) => <Item item={item} />} />`" }
                    ]
                }
            },
            {
                day: 11,
                title: 'Portals & Error Boundaries',
                intro: "Render outside the parent hierarchy (Modals) and catch crashes gracefully.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Portals</h3>
<p>Teleport a child into <code>document.body</code>.</p>
                `,
                code: `// Error Boundary Demo (Class Component)
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#fee', border: '1px solid #f00', borderRadius: '8px' }}>
          <h3 style={{ color: '#c00' }}>Something went wrong!</h3>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function BuggyComponent({ shouldCrash }) {
  if (shouldCrash) throw new Error('Oops! Component crashed.');
  return <p style={{ color: 'green' }}>✓ Component is working fine!</p>;
}

function App() {
  const [crash, setCrash] = React.useState(false);
  
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
      <h3>Error Boundary Demo</h3>
      <ErrorBoundary>
        <BuggyComponent shouldCrash={crash} />
      </ErrorBoundary>
      <button 
        onClick={() => setCrash(true)} 
        style={{ marginTop: '10px', padding: '8px 16px' }}
      >
        Trigger Error
      </button>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Z-Index Wars
<div style={{ zIndex: 9999, position: 'fixed' }}>
  Modal (Might be clipped by parent overflow: hidden)
</div>`,
                    senior: `// ✅ Portal
createPortal(
  <div className="modal">Modal (True Top Layer)</div>,
  document.body
);`
                },
                interview: {
                    questions: [
                        { q: "Can Error Boundaries catch errors in Event Handlers?", a: "No. They only catch errors during rendering, lifecycle methods, and constructors. Use `try/catch` for handlers." }
                    ]
                }
            },
            {
                day: 12,
                title: 'Suspense & Concurrent Mode',
                intro: "Tell React to 'wait' for data before showing the UI. No more `isLoading` booleans.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Suspense</h3>
<p>Declarative loading states.</p>
                `,
                code: `function SlowComponent() {
  // Simulate slow render
  const start = Date.now();
  while (Date.now() - start < 100) {}
  return <p>✓ Loaded!</p>;
}

function App() {
  const [show, setShow] = React.useState(false);
  
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
      <h3>Suspense Demo</h3>
      <button onClick={() => setShow(true)}>Load Component</button>
      
      {show && (
        <React.Suspense fallback={<p style={{ color: '#666' }}>Loading...</p>}>
          <SlowComponent />
        </React.Suspense>
      )}
      
      <p style={{ color: '#666', marginTop: '10px', fontSize: '12px' }}>
        Note: Real Suspense works with lazy() and data fetching libraries
      </p>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Imperative Loading
if (loading) return <Spinner />;
if (error) return <Error />;
return <Data />;`,
                    senior: `// ✅ Declarative Suspense
// Parent
<Suspense fallback={<Spinner />}>
  <DataComponent />
</Suspense>

// Component just reads data. 
// If data missing, it suspends.`
                },
                interview: {
                    questions: [
                        { q: "What is Concurrent Mode?", a: "It allows React to interrupt rendering to handle high-priority events (like typing) and then resume the background render." }
                    ]
                }
            },
            {
                day: 13,
                title: 'Compound Components',
                intro: "Build flexible UI libraries. `Select.Option` instead of `options={[]}`.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Context for Communication</h3>
<p>Parent communicates with children via hidden context.</p>
                `,
                code: `const TabsContext = React.createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = React.useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.Tab = function Tab({ id, children }) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  return (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        padding: '8px 16px',
        background: activeTab === id ? '#3b82f6' : '#e5e7eb',
        color: activeTab === id ? '#fff' : '#000',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function Panel({ id, children }) {
  const { activeTab } = React.useContext(TabsContext);
  if (activeTab !== id) return null;
  return <div style={{ padding: '16px', border: '1px solid #e5e7eb' }}>{children}</div>;
};

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
      <h3>Compound Components Demo</h3>
      <Tabs defaultTab="home">
        <div style={{ display: 'flex', gap: '4px', marginBottom: '-1px' }}>
          <Tabs.Tab id="home">Home</Tabs.Tab>
          <Tabs.Tab id="profile">Profile</Tabs.Tab>
          <Tabs.Tab id="settings">Settings</Tabs.Tab>
        </div>
        <Tabs.Panel id="home">Welcome Home!</Tabs.Panel>
        <Tabs.Panel id="profile">Your Profile</Tabs.Panel>
        <Tabs.Panel id="settings">Settings Page</Tabs.Panel>
      </Tabs>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Giant Configuration Prop
<Menu items={[
  { label: 'Home', icon: 'home' },
  { label: 'Settings', icon: 'cog' }
]} />
// Hard to customize individual items`,
                    senior: `// ✅ Compound Component
<Menu>
  <Menu.Item icon="home">Home</Menu.Item>
  <Menu.Divider />
  <Menu.Item icon="cog" style={{ color: 'red' }}>
     Settings
  </Menu.Item>
</Menu>`
                },
                interview: {
                    questions: [
                        { q: "What is a Compound Component?", a: "A pattern where components work together to form a complete UI, usually sharing state via Context (e.g., `<select>` and `<option>`)." }
                    ]
                }
            },
            {
                day: 14,
                title: 'Performance: Virtualization & Profiler',
                intro: "Render 100,000 items at 60fps.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Windowing</h3>
<p>Only render what is visible on screen.</p>
                `,
                code: `function App() {
  const [items] = React.useState(() => 
    Array.from({ length: 10000 }, (_, i) => 'Item ' + (i + 1))
  );
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 10 });
  
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const start = Math.floor(scrollTop / 30);
    setVisibleRange({ start, end: start + 10 });
  };
  
  const visibleItems = items.slice(visibleRange.start, visibleRange.end + 5);
  
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
      <h3>Virtualization Demo</h3>
      <p style={{ color: '#666' }}>10,000 items, only ~15 rendered:</p>
      <div 
        onScroll={handleScroll}
        style={{ 
          height: '200px', 
          overflow: 'auto', 
          border: '1px solid #ccc',
          position: 'relative'
        }}
      >
        <div style={{ height: items.length * 30 }}>
          {visibleItems.map((item, i) => (
            <div 
              key={visibleRange.start + i}
              style={{
                position: 'absolute',
                top: (visibleRange.start + i) * 30,
                height: 30,
                padding: '5px',
                borderBottom: '1px solid #eee',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <p style={{ color: '#22c55e', marginTop: '8px' }}>
        DOM Nodes: ~{visibleItems.length} (not 10,000!)
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
                        { q: "What tool do you use to debug performance?", a: "React DevTools Profiler tab. It shows which components rendered and why (Flamegraph)." }
                    ]
                }
            },
            {
                day: 15,
                title: 'React Server Components (RSC)',
                intro: "The future. Server Components run on the server, send zero JS to the client, and can access DB directly.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Waterline</h3>
<p>Server components can import Client components. Client components CANNOT import Server components.</p>
                `,
                code: `function App() {
  // This demonstrates the CONCEPT of Server vs Client Components
  // Real RSCs run in Next.js App Router
  
  const serverData = ['Post 1', 'Post 2', 'Post 3']; // Simulated DB data
  
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
      <h3>RSC Concept Demo</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Server Component Simulation */}
        <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: '8px' }}>
          <h4 style={{ color: '#16a34a' }}>🖥️ Server Component</h4>
          <ul>
            {serverData.map((post, i) => <li key={i}>{post}</li>)}
          </ul>
          <p style={{ fontSize: '11px', color: '#666' }}>
            ✓ No JS sent to client<br/>
            ✓ Direct DB access<br/>
            ✓ No useState/useEffect
          </p>
        </div>
        
        {/* Client Component Simulation */}
        <div style={{ padding: '12px', background: '#fef3c7', borderRadius: '8px' }}>
          <h4 style={{ color: '#d97706' }}>💻 Client Component</h4>
          <ClientCounter />
        </div>
      </div>
    </div>
  );
}

function ClientCounter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <p style={{ fontSize: '11px', color: '#666', marginTop: '8px' }}>
        ✓ Needs "use client"<br/>
        ✓ Has interactivity<br/>
        ✓ JS sent to browser
      </p>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Client Fetch (Waterfall)
function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/data').then(setData);
  }, []);
  
  if (!data) return <Spinner />;
  return <div>{data}</div>;
}`,
                    senior: `// ✅ Async Server Component
async function Page() {
  // Direct DB access. No API. No useEffect.
  const data = await db.post.findMany();
  
  return <div>{data.map(...)}</div>;
}`
                },
                interview: {
                    questions: [
                         { q: "Can you use hooks in Server Components?", a: "No. `useState` and `useEffect` are client-only concepts. RSCs run once on the server." }
                    ]
                }
            }
        ]
    },
    fullstack: {
        id: 'fullstack',
        title: 'Full Stack Architecture: Node.js & System Design',
        description: 'Scale from localhost to production. Microservices, Docker, Kubernetes, and High-Level System Design.',
        totalDays: 20,
        days: [
            {
                day: 0,
                title: 'Day 0: The Server Environment',
                intro: "Node.js versions matter. Database containers matter. Set up your machine like a Senior Engineer.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Node Version Manager (nvm)</h3>
<p class="mb-4 text-light-300">Avoid permission issues and manage multiple Node.js versions easily.</p>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
    <pre><code>
# Install nvm (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install nvm (Windows - use nvm-windows)
# https://github.com/coreybutler/nvm-windows

# Install latest LTS Node.js
nvm install --lts

# Use the LTS version
nvm use --lts

# Set LTS as default
nvm alias default lts/*

# Verify installation
node -v
npm -v
    </code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Docker for Local Databases</h3>
<p class="mb-4 text-light-300">Run databases (MongoDB, PostgreSQL) in isolated containers. Clean, consistent, and easy to reset.</p>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
    <pre><code>
# Install Docker Desktop: https://www.docker.com/products/docker-desktop/

# Run a MongoDB container
docker run --name my-mongo -p 27017:27017 -d mongo:latest

# Run a PostgreSQL container
docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres:latest

# Stop and remove containers
docker stop my-mongo
docker rm my-mongo
    </code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3. API Testing Tools: Postman / Insomnia</h3>
<p class="mb-4 text-light-300">Essential for testing your backend APIs.</p>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>**Postman:** Feature-rich, collaborative API platform.</li>
    <li>**Insomnia:** Lightweight, developer-focused API client.</li>
</ul>
                    `,
                code: `// No interactive code for setup, focus on terminal commands.
// Try running 'docker ps' in your terminal after starting a container!`,
                video: 'tlB8487q', 
                comparison: {
                    junior: `// ❌ Installing DB on Machine
// - Brew install mongodb
// - "It works on my machine"
// - Versions conflict with other projects`,
                    senior: `// ✅ Docker Container
// - docker run mongo
// - Isolated environment
// - Exact same version as production`
                },
                interview: {
                    questions: [
                        { q: "Why is `nvm` crucial for Node.js development?", a: "`nvm` allows developers to easily install, manage, and switch between multiple Node.js versions. This is vital for working on different projects that might require specific Node.js environments, preventing conflicts and ensuring compatibility." },
                        { q: "What are the benefits of using Docker for local database development?", a: "Docker provides isolated, consistent, and reproducible database environments. It prevents 'it works on my machine' issues, makes it easy to spin up and tear down databases, and ensures your local setup mirrors production more closely without polluting your host machine." },
                        { q: "How do API testing tools like Postman or Insomnia enhance backend development?", a: "These tools allow developers to send HTTP requests to their APIs, inspect responses, and test different endpoints and authentication flows without needing a frontend. They are crucial for debugging, validating API contracts, and ensuring backend functionality." }
                    ]
                }
            },
            {
                day: 1,
                title: 'Node.js Architecture & Event Loop',
                intro: "Node is Single-Threaded but Non-Blocking. Understand libuv and the thread pool.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Reactor Pattern</h3>
<p>Node offloads I/O to the OS kernel.</p>
                `,
                code: `const fs = require('fs');
fs.readFile('file.txt', (err, data) => {
  console.log(data);
});`,
                comparison: {
                    junior: `// ❌ Blocking I/O (PHP Style)
const data = fs.readFileSync('large-file.txt');
// Entire server freezes until file is read
console.log(data);`,
                    senior: `// ✅ Non-Blocking I/O
fs.readFile('large-file.txt', (err, data) => {
  // Callback runs when data is ready
  console.log(data);
});
// Server continues serving other requests`
                },
                interview: {
                    questions: [
                        { q: "What is Libuv?", a: "The C library that provides the Event Loop and asynchronous I/O support to Node.js." }
                    ]
                }
            },
            {
                day: 2,
                title: 'Express.js & Middleware',
                intro: "Express is a chain of middleware functions. `(req, res, next) => ...`",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Middleware Onion</h3>
<p>Request goes through layers, response comes back out.</p>
                `,
                code: `app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});`,
                comparison: {
                    junior: `// ❌ Giant Route Handler
app.post('/login', (req, res) => {
  // Parsing logic
  // Validation logic
  // DB logic
  // Response logic
});`,
                    senior: `// ✅ Middleware Chain
app.post('/login', 
  bodyParser, 
  validateInput, 
  findUser, 
  sendResponse
);`
                },
                interview: {
                    questions: [
                         { q: "What happens if you don't call `next()`?", a: "The request hangs indefinitely." }
                    ]
                }
            },
            {
                day: 3,
                title: 'REST API Design',
                intro: "Resources, Verbs, and Status Codes. Don't return 200 OK for an error.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Resource Naming</h3>
<p>Nouns, not verbs.</p>
                `,
                code: `GET /users/123
POST /users
DELETE /users/123`,
                comparison: {
                    junior: `// ❌ RPC Style URLs
POST /createNewUser
POST /deleteUserById
GET /getAllUsers`,
                    senior: `// ✅ RESTful Standard
POST /users
DELETE /users/:id
GET /users`
                },
                interview: {
                    questions: [
                         { q: "Difference between PUT and PATCH?", a: "PUT replaces the entire resource. PATCH updates only specified fields." }
                    ]
                }
            },
            {
                day: 4,
                title: 'Databases: SQL vs NoSQL',
                intro: "ACID transactions vs Flexible Schema. Choose the right tool.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Relational (Postgres)</h3>
<p>Strict tables. Joins.</p>
                `,
                code: `SELECT * FROM users JOIN posts ON users.id = posts.user_id;`,
                comparison: {
                    junior: `// ❌ N+1 Problem
const users = await User.find();
for (let user of users) {
  // Query for every single user loop!
  user.posts = await Post.find({ userId: user.id });
}`,
                    senior: `// ✅ Eager Loading / Aggregation
// One single optimized query
const users = await User.aggregate([
  { $lookup: { from: 'posts', ... } }
]);`
                },
                interview: {
                    questions: [
                         { q: "What is Normalization?", a: "Structuring a database to reduce redundancy and improve data integrity." }
                    ]
                }
            },
            {
                day: 5,
                title: 'Authentication (JWT vs Session)',
                intro: "Stateless vs Stateful auth.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. JWT</h3>
<p>Self-contained token. Scalable.</p>
                `,
                code: `const token = jwt.sign({ id: 1 }, 'secret');`,
                comparison: {
                    junior: `// ❌ Storing Token in LocalStorage
localStorage.setItem('token', jwt);
// Vulnerable to XSS!`,
                    senior: `// ✅ HttpOnly Cookie
res.cookie('token', jwt, { 
  httpOnly: true, // No JS access
  secure: true 
});`
                },
                interview: {
                    questions: [
                        { q: "How do you invalidate a JWT?", a: "You can't (it's stateless). You must use a blacklist database or short expiration times." }
                    ]
                }
            },
            {
                day: 6,
                title: 'WebSockets & Real-time',
                intro: "Socket.io allows bidirectional communication.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Handshake</h3>
<p>Starts as HTTP, upgrades to TCP socket.</p>
                `,
                code: `io.on('connection', (socket) => {
  socket.emit('hello', 'world');
});`,
                comparison: {
                    junior: `// ❌ Polling
setInterval(() => {
  fetch('/api/messages');
}, 1000); 
// Spamming the server`,
                    senior: `// ✅ WebSocket
socket.on('message', (msg) => {
  // Server pushes data when ready
  display(msg);
});`
                },
                interview: {
                    questions: [
                        { q: "What is the limitation of WebSockets?", a: "Scalability. Keeping thousands of open TCP connections requires significant server resources (RAM)." }
                    ]
                }
            },
            {
                day: 7,
                title: 'Microservices Architecture',
                intro: "Breaking the monolith into small, independent services.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Decoupling</h3>
<p>Each service has its own DB.</p>
                `,
                code: `// Order Service -> User Service via HTTP/gRPC`,
                comparison: {
                    junior: `// ❌ Distributed Monolith
// Services share the same Database
// If one schema changes, everything breaks`,
                    senior: `// ✅ Database per Service
// OrderDB is separate from UserDB
// Communicate via Events/API`
                },
                interview: {
                    questions: [
                        { q: "What is eventual consistency?", a: "Data is not immediately synced across all nodes, but will be eventually." }
                    ]
                }
            },
            {
                day: 8,
                title: 'Docker & Containerization',
                intro: "Package your code with its environment.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Dockerfile</h3>
<p>Recipe for your image.</p>
                `,
                code: `FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]`,
                comparison: {
                    junior: `// ❌ Manual Deployment
// SSH into server
// git pull
// npm install (Fail because node version diff)
// pm2 restart`,
                    senior: `// ✅ CI/CD + Docker
// git push
// CI builds Docker Image
// K8s pulls image and updates pods`
                },
                interview: {
                    questions: [
                        { q: "Container vs VM?", a: "Containers share the host OS kernel (lightweight). VMs have their own full OS (heavy)." }
                    ]
                }
            },
            {
                day: 9,
                title: 'CI/CD Pipelines',
                intro: "Automate testing and deployment.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Pipeline</h3>
<p>Build -> Test -> Deploy.</p>
                `,
                code: `// .github/workflows/main.yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm test`,
                comparison: {
                    junior: `// ❌ Deploying from Local
// "Hey, I'm deploying, don't touch dev!"
// *Uploads uncommitted code*`,
                    senior: `// ✅ Automated Pipeline
// Code must pass tests in CI
// Main branch automatically deploys to Staging`
                },
                interview: {
                    questions: [
                        { q: "What is Blue/Green Deployment?", a: "Running two identical production environments. You switch the router from Blue (Old) to Green (New) instantly." }
                    ]
                }
            },
            {
                day: 10,
                title: 'GraphQL',
                intro: "Ask for exactly what you need.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. One Endpoint</h3>
<p>No more versioned routes.</p>
                `,
                code: `query {
  user(id: 1) {
    name
    posts { title }
  }
}`,
                comparison: {
                    junior: `// ❌ Over-fetching
GET /api/users/1
// Returns object with 50 fields
// We only needed the name`,
                    senior: `// ✅ GraphQL Query
query { user(id: 1) { name } }
// Returns JSON with JUST name`
                },
                interview: {
                    questions: [
                        { q: "What is the N+1 problem in GraphQL?", a: "Resolvers executing a database query for every item in a list. Solved with DataLoaders." }
                    ]
                }
            },
            {
                day: 11,
                title: 'Serverless Functions (Lambda)',
                intro: "Pay only for compute time.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Event Driven</h3>
<p>Triggered by HTTP, S3 upload, etc.</p>
                `,
                code: `exports.handler = async (event) => {
  return { statusCode: 200, body: 'Hello' };
};`,
                comparison: {
                    junior: `// ❌ Idle Server
// Paying $50/mo for a VPS 
// Traffic is low 90% of the time`,
                    senior: `// ✅ Serverless
// 0 cost when idle
// Auto-scales to 1000s of requests
// Pay $5/mo`
                },
                interview: {
                    questions: [
                        { q: "What is a Cold Start?", a: "The latency when a Lambda function starts up for the first time after being idle." }
                    ]
                }
            },
            {
                day: 12,
                title: 'Caching Strategies (Redis)',
                intro: "The fastest query is the one you don't make.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Key-Value Store</h3>
<p>In-memory speed.</p>
                `,
                code: `const cached = await redis.get('user:1');
if (cached) return JSON.parse(cached);
const user = await db.find(1);
await redis.set('user:1', JSON.stringify(user));`,
                comparison: {
                    junior: `// ❌ Hitting DB Every Request
// /getProfile -> SQL Query
// /getProfile -> SQL Query
// /getProfile -> SQL Query`,
                    senior: `// ✅ Redis Cache
// /getProfile -> Cache Hit (1ms)
// /getProfile -> Cache Hit (1ms)
// DB sleeps`
                },
                interview: {
                    questions: [
                        { q: "Cache Invalidation strategies?", a: "TTL (Time To Live), Write-Through (Update cache on write), LRU (Least Recently Used)." }
                    ]
                }
            },
            {
                day: 13,
                title: 'Load Balancing & NGINX',
                intro: "Distribute traffic across multiple servers.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Reverse Proxy</h3>
<p>Shields your servers.</p>
                `,
                code: `upstream app_servers {
  server 10.0.0.1;
  server 10.0.0.2;
}`,
                comparison: {
                    junior: `// ❌ Single Point of Failure
// One server crashes
// Website is Down`,
                    senior: `// ✅ Load Balancer
// Detects server crash
// Routes traffic to healthy servers`
                },
                interview: {
                    questions: [
                        { q: "Round Robin vs Least Connections?", a: "Round Robin rotates sequentially. Least Connections sends traffic to the server with fewest active users." }
                    ]
                }
            },
            {
                day: 14,
                title: 'Security: Hashing & Salting',
                intro: "Protecting user passwords.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Bcrypt</h3>
<p>Slow hashing algorithm.</p>
                `,
                code: `const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);`,
                comparison: {
                    junior: `// ❌ Plain Text / MD5
db.save({ password: "password123" });
// One hack = Everyone exposed`,
                    senior: `// ✅ Salted Hash
// Saved as: $2b$10$nOUIs5...
// Even if DB leaks, passwords are safe`
                },
                interview: {
                    questions: [
                        { q: "Why use a Salt?", a: "To prevent Rainbow Table attacks. Identical passwords will have different hashes." }
                    ]
                }
            },
            {
                day: 15,
                title: 'System Design: Scaling',
                intro: "Vertical vs Horizontal Scaling.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Cube</h3>
<p>X, Y, Z axis scaling.</p>
                `,
                code: `// Conceptual`,
                comparison: {
                    junior: `// ❌ Buy Bigger Server
// Vertical Scaling
// Limited by hardware`,
                    senior: `// ✅ Buy More Servers
// Horizontal Scaling
// Unlimited theoretical limit`
                },
                interview: {
                    questions: [
                        { q: "CAP Theorem?", a: "Consistency, Availability, Partition Tolerance. You can only pick 2." }
                    ]
                }
            }
        ]
    }
};

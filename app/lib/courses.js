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
<p class="mb-4">JavaScript is <span class="text-yellow-400 font-bold">Just-In-Time</span> compiled. It is not interpreted line-by-line like in 1995. V8 (Chrome's Engine) uses a complex pipeline to optimize your code.</p>

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

<p class="mb-6"><span class="text-yellow-400 font-bold">Why this matters:</span> If you change the "shape" of an object (e.g., adding properties dynamically), TurboFan has to "De-optimize" and go back to Bytecode, slowing down your app.</p>

<h3 class="text-xl font-bold text-white mb-4">2. Execution Context: The Two Phases</h3>
<p class="mb-4">When you run a function, the engine doesn't just "run" it. It makes two passes.</p>

<div class="grid md:grid-cols-2 gap-6 mb-6">
    <div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
        <h4 class="font-bold text-brand-primary mb-2">Phase 1: Memory Creation</h4>
        <p class="text-sm text-light-400">The engine scans for declarations.</p>
        <ul class="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Allocates memory for <code class="bg-dark-900 px-1 rounded">var</code> (sets to undefined).</li>
            <li>Allocates memory for <code class="bg-dark-900 px-1 rounded">function</code> (stores code).</li>
            <li><span class="text-yellow-400 font-bold">Code is NOT executed yet.</span></li>
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
<p class="mb-4">Scope is determined at <span class="text-yellow-400 font-bold">compile time</span>. The JS engine knows exactly where variables live before running a single line.</p>

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
    <li><span class="text-yellow-400 font-bold">Level 1:</span> Local Scope (Found it? Stop.)</li>
    <li><span class="text-yellow-400 font-bold">Level 2:</span> Outer Function Scope</li>
    <li><span class="text-yellow-400 font-bold">Level 3:</span> Global Scope</li>
    <li><span class="text-yellow-400 font-bold">Roof:</span> <code class="text-red-400">ReferenceError</code></li>
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
<p class="mb-4">Closures prevent Garbage Collection. As long as <code class="bg-dark-700 text-brand-primary px-1 rounded">inner()</code> exists, <code class="bg-dark-700 text-brand-primary px-1 rounded">data</code> stays in RAM.</p>
<div class="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r mb-6">
    <p class="text-red-200 text-sm"><span class="text-yellow-400 font-bold">Warning:</span> If you accidentally close over a huge DOM node or Array, it creates a Memory Leak.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">3. The React Connection</h3>
<p><code class="bg-dark-700 text-brand-primary px-1 rounded">useState</code> relies entirely on closures. It "remembers" the state from the previous render using a closure created outside your component.</p>
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
                <td class="p-3"><span class="text-yellow-400 font-bold">New Binding</span></td>
                <td class="p-3 font-mono text-xs">new Person()</td>
            </tr>
            <tr>
                <td class="p-3">2</td>
                <td class="p-3"><span class="text-yellow-400 font-bold">Explicit</span></td>
                <td class="p-3 font-mono text-xs">fn.call(obj)</td>
            </tr>
            <tr>
                <td class="p-3">3</td>
                <td class="p-3"><span class="text-yellow-400 font-bold">Implicit</span></td>
                <td class="p-3 font-mono text-xs">obj.fn()</td>
            </tr>
            <tr>
                <td class="p-3 text-light-500">4 (Lowest)</td>
                <td class="p-3"><span class="text-yellow-400 font-bold">Default</span></td>
                <td class="p-3 font-mono text-xs">fn()</td>
            </tr>
        </tbody>
    </table>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Arrow Functions</h3>
<p class="mb-4">Arrow functions <span class="text-yellow-400 font-bold">do not</span> have their own <code class="bg-dark-700 text-brand-primary px-1 rounded">this</code>. They bypass the 4 rules and look up to the lexical scope.</p>
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
<p class="mb-4">When you access <code class="bg-dark-700 text-brand-primary px-1 rounded">dog.eats</code>, JS walks up the chain until it finds it or hits null.</p>

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
    <li><code class="bg-dark-700 text-brand-primary px-1 rounded">__proto__</code>: The actual link on an <span class="text-yellow-400 font-bold">instance</span>.</li>
    <li><code class="bg-dark-700 text-brand-primary px-1 rounded">prototype</code>: A property on a <span class="text-yellow-400 font-bold">Function</span> that acts as a blueprint for <code class="bg-dark-700 text-brand-primary px-1 rounded">new</code> instances.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3. ES6 Classes</h3>
<p>Classes are just "Syntactic Sugar". <code class="bg-dark-700 text-brand-primary px-1 rounded">class Dog extends Animal</code> creates the exact same prototype chain as above.</p>
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
    <li><span class="text-yellow-400 font-bold">Run Synchronous Code</span> until Stack is empty.</li>
    <li><span class="text-yellow-400 font-bold">Run ALL Microtasks</span> until queue is empty. (Can starve the loop!)</li>
    <li><span class="text-yellow-400 font-bold">Render UI</span> (Browser Repaint).</li>
    <li><span class="text-yellow-400 font-bold">Run ONE Macrotask</span>.</li>
    <li>Repeat.</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">3. Starvation</h3>
<p>If you recursively create Microtasks (e.g., <code class="bg-dark-700 text-brand-primary px-1 rounded">Promise.resolve().then(loop)</code>), the loop never reaches the Macrotask queue or UI Paint. The page freezes.</p>
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
<p class="mb-4"><code class="bg-dark-700 text-brand-primary px-1 rounded">.then()</code> always returns a <span class="text-yellow-400 font-bold">NEW Promise</span>. This is why you can chain them.</p>
<ul class="list-disc list-inside space-y-2 text-light-300 bg-dark-800 p-4 rounded-lg">
    <li>Return a value? ➞ Next Promise <span class="text-yellow-400 font-bold">Fulfilled</span>.</li>
    <li>Return a Promise? ➞ Next Promise <span class="text-yellow-400 font-bold">waits</span> for it.</li>
    <li>Throw Error? ➞ Next Promise <span class="text-yellow-400 font-bold">Rejected</span>.</li>
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
<p class="mb-4">Normal functions run to completion. <span class="text-yellow-400 font-bold">Generators</span> (<code class="bg-dark-700 text-brand-primary px-1 rounded">function*</code>) can pause (<code class="bg-dark-700 text-brand-primary px-1 rounded">yield</code>) and resume.</p>

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
<p>Unlike <code class="bg-dark-700 text-brand-primary px-1 rounded">.catch()</code>, we use standard <code class="bg-dark-700 text-brand-primary px-1 rounded">try/catch</code> blocks.</p>
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
    <li><span class="text-yellow-400 font-bold">Mark:</span> "I can reach this object!" (Paint it white).</li>
    <li><span class="text-yellow-400 font-bold">Sweep:</span> "I cannot reach that object!" (Delete it).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">2. Common Leaks</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
        <span class="text-red-400 font-bold block mb-2">Global Variables</span>
        Accidental <code class="bg-dark-700 text-brand-primary px-1 rounded">window.x = largeData</code> stays forever.
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
<p class="mb-4">Data sent between threads is <span class="text-yellow-400 font-bold">Cloned</span>. Sending a 100MB JSON is slow.</p>
<p><span class="text-yellow-400 font-bold">Solution:</span> <code class="text-brand-primary">SharedArrayBuffer</code> or <code class="text-brand-primary">Transferable Objects</code>.</p>
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
<p class="mb-4">A pure function always returns the same output for the same input and has <span class="text-yellow-400 font-bold">No Side Effects</span>.</p>

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
    <li><span class="text-yellow-400 font-bold">Validation:</span> Reject invalid types on assignment.</li>
    <li><span class="text-yellow-400 font-bold">Data Binding:</span> Vue 3 uses Proxies for reactivity.</li>
    <li><span class="text-yellow-400 font-bold">Logging:</span> Debug property access.</li>
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
<p class="mb-4">A function/class should have <span class="text-yellow-400 font-bold">one reason to change</span>.</p>

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
    <li><span class="text-yellow-400 font-bold">E2E (Top 10%):</span> Click buttons in browser (Cypress). Slow.</li>
    <li><span class="text-yellow-400 font-bold">Integration (Middle 30%):</span> Test module interactions.</li>
    <li><span class="text-yellow-400 font-bold">Unit (Bottom 60%):</span> Test single functions (Jest/Vitest). Fast.</li>
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
                intro: "Why is React so fast? Because it never touches the Real DOM directly. It uses a clever trick called the Virtual DOM.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What is the DOM and why is it slow?</li>
    <li>What is the Virtual DOM?</li>
    <li>How React's "Diffing" algorithm works</li>
    <li>Why keys matter in lists</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📚 Understanding the Problem: The Real DOM is Slow</h3>
<p class="mb-4 text-light-300">Imagine you have a webpage with 1000 elements. If you change just ONE element using vanilla JavaScript:</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
    <p class="text-red-300 font-mono text-sm">document.getElementById('count').innerText = 5;</p>
    <p class="text-red-200 mt-2 text-sm">❌ This triggers the browser to: Recalculate styles → Reflow layout → Repaint pixels</p>
    <p class="text-red-200 text-sm">Even for ONE tiny change, this is expensive!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 The Solution: Virtual DOM</h3>
<p class="mb-4 text-light-300">React keeps a <span class="text-brand-primary font-bold">lightweight copy</span> of the DOM in JavaScript memory. This is called the <span class="text-brand-primary font-bold">Virtual DOM (VDOM)</span>.</p>

<p class="mb-4 text-yellow-400 font-bold">Think of it like this:</p>
<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
    <p class="text-blue-200">🏠 <span class="text-white font-bold">Real DOM</span> = Actual house (expensive to rebuild)</p>
    <p class="text-blue-200">📋 <span class="text-white font-bold">Virtual DOM</span> = Blueprint of the house (cheap to modify)</p>
    <p class="text-blue-200 mt-2">When you want to change the house, you first update the blueprint, compare it to the old blueprint, and ONLY rebuild the parts that changed!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚙️ How It Works: The Diffing Algorithm</h3>
<p class="mb-4 text-light-300">When state changes in React, here's what happens step-by-step:</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Step 1: State Changes (e.g., setCount(5))
              │
              ▼
Step 2: React creates a NEW Virtual DOM tree
              │
              ▼
Step 3: React COMPARES new VDOM with old VDOM
        ┌─────────────────────────────────┐
        │  OLD VDOM        NEW VDOM       │
        │  ┌───────┐      ┌───────┐       │
        │  │ div   │      │ div   │       │
        │  │ ├─h1  │      │ ├─h1  │       │
        │  │ └─p:4 │  vs  │ └─p:5 │ ←Changed!
        │  └───────┘      └───────┘       │
        └─────────────────────────────────┘
              │
              ▼
Step 4: React finds the MINIMUM changes needed
        (Only the &lt;p&gt; text changed from 4 to 5)
              │
              ▼
Step 5: React updates ONLY that one element in Real DOM
        (One surgical update, not a full rebuild!)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Why Keys Matter in Lists</h3>
<p class="mb-4 text-light-300">When rendering lists, React needs to know which items changed. Without <code class="bg-dark-700 px-2 py-1 rounded">key</code>, React might re-render everything!</p>

<div class="grid md:grid-cols-2 gap-4 mb-6">
    <div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl">
        <p class="text-red-300 font-bold mb-2">❌ Without Keys</p>
        <pre class="text-red-200 text-xs">{items.map(item => 
  &lt;li&gt;{item}&lt;/li&gt;
)}</pre>
        <p class="text-red-200 text-xs mt-2">React: "I don't know what changed, let me re-render ALL items"</p>
    </div>
    <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl">
        <p class="text-green-300 font-bold mb-2">✅ With Keys</p>
        <pre class="text-green-200 text-xs">{items.map(item => 
  &lt;li key={item.id}&gt;{item}&lt;/li&gt;
)}</pre>
        <p class="text-green-200 text-xs mt-2">React: "Ah, only item #3 changed, I'll update just that one!"</p>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">Never use array index as key</span> if the list can reorder (causes bugs!)</li>
    <li><span class="text-yellow-400 font-bold">Use unique IDs</span> from your data (like database IDs)</li>
    <li><span class="text-yellow-400 font-bold">React batches updates</span> - multiple setState calls = one render</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║                  🎯 VIRTUAL DOM DEMO                         ║
║  See React's efficiency - only changed elements update!      ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   CLICK BUTTON                                               ║
║        ↓                                                     ║
║   setCount(1)  →  New VDOM Created                          ║
║        ↓                                                     ║
║   React DIFFS:  Old VDOM  vs  New VDOM                      ║
║        ↓                                                     ║
║   Only <p>Count: 1</p> changes in Real DOM!                 ║
║                                                              ║
║   💡 Everything else stays untouched = FAST!                 ║
╚══════════════════════════════════════════════════════════════╝
*/

function App() {
  // ═══════════════════════════════════════════════════════════
  // 📦 STATE: React's memory system
  // ═══════════════════════════════════════════════════════════
  // useState returns an array with 2 items:
  //   [0] count    = current value (starts at 0)
  //   [1] setCount = function to update value
  //
  // When setCount is called:
  //   1. React creates NEW Virtual DOM
  //   2. Compares with OLD Virtual DOM (diffing)
  //   3. Updates ONLY what changed in Real DOM
  // ═══════════════════════════════════════════════════════════
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h2 style={{ color: '#1e293b' }}>⚛️ Virtual DOM Demo</h2>
      
      {/* ════════════════════════════════════════════════════════
          🎯 THIS IS THE MAGIC PART!
          ════════════════════════════════════════════════════════
          Only this <p> element will update in the Real DOM
          when you click the button. React's diffing algorithm
          sees that ONLY the count value changed!
          
          Open DevTools → Elements tab → Watch it flash!
          ════════════════════════════════════════════════════════ */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '15px'
      }}>
        <p style={{ 
          fontSize: '48px', 
          color: 'white',
          margin: 0,
          fontWeight: 'bold'
        }}>
          {count}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.8)', margin: '5px 0 0' }}>
          clicks counted
        </p>
      </div>
      
      {/* ════════════════════════════════════════════════════════
          🔘 BUTTON: Triggers state change
          ════════════════════════════════════════════════════════
          onClick={() => setCount(count + 1)}
          
          This arrow function:
          1. Gets current count (e.g., 0)
          2. Adds 1 (e.g., 0 + 1 = 1)
          3. Calls setCount(1) with new value
          4. React re-renders with new state!
          ════════════════════════════════════════════════════════ */}
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ➕ Increment Count
      </button>
      
      <button 
        onClick={() => setCount(0)}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginLeft: '10px'
        }}
      >
        🔄 Reset
      </button>
      
      {/* ════════════════════════════════════════════════════════
          📝 STATIC CONTENT: Never re-renders!
          ════════════════════════════════════════════════════════
          This paragraph has NO state dependency.
          React's diff sees: "Nothing changed here, skip!"
          This is why React is so fast.
          ════════════════════════════════════════════════════════ */}
      <p style={{ color: '#64748b', marginTop: '20px', fontSize: '14px' }}>
        💡 <strong>Try this:</strong> Open DevTools → Elements → 
        Watch only the number flash purple when you click!
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
                intro: "JSX looks like HTML but it's actually JavaScript in disguise. Understanding this is key to mastering React.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What JSX really is (hint: it's not HTML!)</li>
    <li>How Babel transforms JSX into JavaScript</li>
    <li>JSX rules you must follow</li>
    <li>How to use JavaScript inside JSX</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📚 The Big Secret: JSX = JavaScript</h3>
<p class="mb-4 text-light-300">When you write this:</p>
<div class="bg-dark-900 p-4 rounded-xl mb-4 font-mono text-sm text-cyan-300">
    <pre>&lt;h1 className="title"&gt;Hello&lt;/h1&gt;</pre>
</div>

<p class="mb-4 text-light-300">Babel (a compiler) transforms it into this:</p>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-yellow-300">
    <pre>React.createElement('h1', { className: 'title' }, 'Hello')</pre>
</div>

<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
    <p class="text-blue-200">💡 <span class="text-yellow-400 font-bold">Key Insight:</span> JSX is just syntactic sugar! It makes writing React.createElement() calls easier and more readable.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚙️ The Transformation Process</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
YOUR CODE (JSX)                    AFTER BABEL (JavaScript)
─────────────────                  ────────────────────────
&lt;div&gt;                              React.createElement(
  &lt;h1&gt;Title&lt;/h1&gt;          →         'div',
  &lt;p&gt;Text&lt;/p&gt;                        null,
&lt;/div&gt;                               React.createElement('h1', null, 'Title'),
                                     React.createElement('p', null, 'Text')
                                   )
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">📜 JSX Rules You MUST Follow</h3>

<div class="space-y-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-xl border-l-4 border-red-500">
        <p class="text-white font-bold">Rule 1: Return ONE parent element</p>
        <div class="grid md:grid-cols-2 gap-4 mt-2">
            <div class="text-red-300 text-sm">
                <p>❌ Wrong:</p>
                <pre class="bg-dark-900 p-2 rounded mt-1">return (
  &lt;h1&gt;Title&lt;/h1&gt;
  &lt;p&gt;Text&lt;/p&gt;
)</pre>
            </div>
            <div class="text-green-300 text-sm">
                <p>✅ Correct:</p>
                <pre class="bg-dark-900 p-2 rounded mt-1">return (
  &lt;div&gt;
    &lt;h1&gt;Title&lt;/h1&gt;
    &lt;p&gt;Text&lt;/p&gt;
  &lt;/div&gt;
)</pre>
            </div>
        </div>
    </div>
    
    <div class="bg-dark-800 p-4 rounded-xl border-l-4 border-yellow-500">
        <p class="text-white font-bold">Rule 2: Use className, not class</p>
        <p class="text-light-300 text-sm mt-2"><code class="bg-dark-700 text-brand-primary px-1 rounded">class</code> is a reserved word in JavaScript, so JSX uses <code class="bg-dark-700 text-brand-primary px-1 rounded">className</code></p>
        <pre class="bg-dark-900 p-2 rounded mt-2 text-green-300 text-sm">&lt;div className="container"&gt;...&lt;/div&gt;</pre>
    </div>
    
    <div class="bg-dark-800 p-4 rounded-xl border-l-4 border-blue-500">
        <p class="text-white font-bold">Rule 3: Close ALL tags</p>
        <p class="text-light-300 text-sm mt-2">Even self-closing tags need a slash:</p>
        <pre class="bg-dark-900 p-2 rounded mt-2 text-green-300 text-sm">&lt;img src="pic.jpg" /&gt;
&lt;input type="text" /&gt;
&lt;br /&gt;</pre>
    </div>
    
    <div class="bg-dark-800 p-4 rounded-xl border-l-4 border-purple-500">
        <p class="text-white font-bold">Rule 4: camelCase for attributes</p>
        <p class="text-light-300 text-sm mt-2">HTML: onclick → JSX: onClick</p>
        <pre class="bg-dark-900 p-2 rounded mt-2 text-green-300 text-sm">&lt;button onClick={handleClick}&gt;Click&lt;/button&gt;
&lt;label htmlFor="name"&gt;Name&lt;/label&gt;</pre>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔧 Using JavaScript in JSX</h3>
<p class="mb-4 text-light-300">Use <span class="text-yellow-400 font-bold">curly braces { }</span> to embed any JavaScript expression:</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
    <pre class="text-cyan-300">const name = "John";
const age = 25;

return (
  &lt;div&gt;
    &lt;p&gt;Name: <span class="text-yellow-300">{name}</span>&lt;/p&gt;           {/* Variable */}
    &lt;p&gt;Age: <span class="text-yellow-300">{age}</span>&lt;/p&gt;             {/* Variable */}
    &lt;p&gt;Next year: <span class="text-yellow-300">{age + 1}</span>&lt;/p&gt;   {/* Expression */}
    &lt;p&gt;Adult: <span class="text-yellow-300">{age >= 18 ? 'Yes' : 'No'}</span>&lt;/p&gt;  {/* Ternary */}
  &lt;/div&gt;
);</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Use <code class="bg-dark-700 text-brand-primary px-1 rounded">&lt;&gt;...&lt;/&gt;</code> (Fragment) instead of div when you don't need a wrapper</li>
    <li>Inline styles use double curly braces: <code class="bg-dark-700 text-brand-primary px-1 rounded">style={{ color: 'red' }}</code></li>
    <li>Comments in JSX: <code class="bg-dark-700 text-brand-primary px-1 rounded">{/* comment */}</code></li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║              🎯 JSX = JavaScript + XML                       ║
║      JSX is NOT HTML! It compiles to JavaScript.             ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   JSX (What you write)      JavaScript (What browser sees)   ║
║   ════════════════════      ══════════════════════════════   ║
║   <h1>Hello</h1>      →     React.createElement(             ║
║                               'h1',                          ║
║                               null,                          ║
║                               'Hello'                        ║
║                             )                                ║
║                                                              ║
║   {name}              →     Variable value inserted          ║
║   {2 + 2}             →     Expression evaluated (= 4)       ║
║   {isTrue ? 'A':'B'}  →     Ternary evaluated                ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function App() {
  // ═══════════════════════════════════════════════════════════
  // 📦 JAVASCRIPT VARIABLES
  // ═══════════════════════════════════════════════════════════
  // These are regular JS variables. We can use them in JSX
  // by wrapping them in curly braces: {variableName}
  // ═══════════════════════════════════════════════════════════
  const name = "React Developer";
  const skills = ['React', 'JavaScript', 'CSS', 'Node.js'];
  const isExpert = true;
  const yearsExp = 3;
  
  // ═══════════════════════════════════════════════════════════
  // 🎨 INLINE STYLES IN JSX
  // ═══════════════════════════════════════════════════════════
  // Unlike HTML (style="color: blue"), JSX uses objects:
  //   HTML:  style="font-size: 24px"  
  //   JSX:   style={{ fontSize: '24px' }}  (camelCase!)
  //
  // Double curly braces because:
  //   Outer {} = "this is JavaScript"
  //   Inner {} = "this is an object"
  // ═══════════════════════════════════════════════════════════
  const cardStyle = { 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    borderRadius: '12px',
    color: 'white',
    marginBottom: '15px'
  };
  
  return (
    // ════════════════════════════════════════════════════════
    // 🔴 RULE 1: ONE PARENT ELEMENT
    // ════════════════════════════════════════════════════════
    // JSX must return ONE parent. Use <div> or <> (Fragment)
    // ════════════════════════════════════════════════════════
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      
      {/* ════════════════════════════════════════════════════════
          📝 EMBEDDING VARIABLES
          ════════════════════════════════════════════════════════
          Use {variableName} to insert JavaScript values.
          The curly braces tell React: "evaluate this JavaScript"
          ════════════════════════════════════════════════════════ */}
      <div style={cardStyle}>
        <h2 style={{ margin: 0 }}>👋 Hello, {name}!</h2>
        <p style={{ margin: '5px 0 0', opacity: 0.9 }}>
          {yearsExp} years of experience
        </p>
      </div>
      
      {/* ════════════════════════════════════════════════════════
          ➕ EXPRESSIONS
          ════════════════════════════════════════════════════════
          Any valid JS expression works inside {}
          ════════════════════════════════════════════════════════ */}
      <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
        <p style={{ margin: '5px 0' }}>🧮 Math: 2 + 2 = <strong>{2 + 2}</strong></p>
        <p style={{ margin: '5px 0' }}>📅 Year: <strong>{new Date().getFullYear()}</strong></p>
        <p style={{ margin: '5px 0' }}>📏 Skills count: <strong>{skills.length}</strong></p>
      </div>
      
      {/* ════════════════════════════════════════════════════════
          ❓ CONDITIONAL RENDERING (Ternary)
          ════════════════════════════════════════════════════════
          condition ? showIfTrue : showIfFalse
          ════════════════════════════════════════════════════════ */}
      <p style={{ 
        padding: '10px 15px', 
        background: isExpert ? '#dcfce7' : '#fef3c7',
        borderRadius: '8px',
        marginBottom: '15px'
      }}>
        Status: {isExpert ? '🏆 Expert Developer' : '📚 Still Learning'}
      </p>
      
      {/* ════════════════════════════════════════════════════════
          🔄 RENDERING LISTS WITH .map()
          ════════════════════════════════════════════════════════
          Array.map() transforms each item into JSX.
          ALWAYS add a unique "key" prop for React's diffing!
          ════════════════════════════════════════════════════════ */}
      <div>
        <h3 style={{ marginBottom: '10px' }}>💼 Skills:</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {skills.map((skill, index) => (
            <span 
              key={skill}  // ← KEY IS REQUIRED!
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '14px'
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <p style={{ color: '#64748b', marginTop: '20px', fontSize: '14px' }}>
        💡 Try editing the skills array or changing isExpert to false!
      </p>
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
                intro: "This is the MOST important concept in React. Master this, and everything else becomes easy.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What are Props? (Data passed IN)</li>
    <li>What is State? (Data managed INSIDE)</li>
    <li>The one-way data flow rule</li>
    <li>How children talk to parents</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📚 The Simple Analogy</h3>
<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
    <p class="text-blue-200 mb-2">Think of a component like a <span class="text-yellow-400 font-bold">vending machine</span>:</p>
    <p class="text-blue-200">📥 <span class="text-yellow-400 font-bold">Props</span> = The money you put IN (external input, read-only)</p>
    <p class="text-blue-200">🧠 <span class="text-yellow-400 font-bold">State</span> = The machine's inventory (internal memory, can change)</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📦 Props: Data from Parent</h3>
<p class="mb-4 text-light-300">Props are <span class="text-yellow-400 font-bold">read-only</span> values passed from parent to child:</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">// Parent passes data DOWN via props
&lt;UserCard <span class="text-yellow-300">name="John"</span> <span class="text-yellow-300">age={25}</span> /&gt;

// Child RECEIVES props (read-only!)
function UserCard(<span class="text-yellow-300">{ name, age }</span>) {
  return &lt;p&gt;{name} is {age} years old&lt;/p&gt;;
}</pre>
</div>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
    <p class="text-red-300 font-bold">⚠️ NEVER modify props!</p>
    <pre class="text-red-200 text-sm mt-2">function Child({ name }) {
  name = "Bob";  // ❌ WRONG! Props are read-only!
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🧠 State: Component's Memory</h3>
<p class="mb-4 text-light-300">State is data that the component <span class="text-yellow-400 font-bold">owns and can change</span>:</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">function Counter() {
  // 👇 State: internal memory that can change
  const [<span class="text-yellow-300">count</span>, <span class="text-green-300">setCount</span>] = React.useState(0);
  
  return (
    &lt;button onClick={() => <span class="text-green-300">setCount</span>(count + 1)}&gt;
      Clicked {<span class="text-yellow-300">count</span>} times
    &lt;/button&gt;
  );
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔄 One-Way Data Flow</h3>
<p class="mb-4 text-light-300">Data flows DOWN. Events flow UP. This is React's golden rule!</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
┌─────────────────────────────────────┐
│           PARENT                    │
│   ┌─────────────────────────────┐   │
│   │  state = { name: "John" }   │   │
│   └─────────────────────────────┘   │
│              │                      │
│              │ Props (data DOWN)    │
│              ▼                      │
│   ┌─────────────────────────────┐   │
│   │         CHILD               │   │
│   │   props.name = "John"       │   │
│   │                             │   │
│   │   onClick → calls           │   │
│   │   props.onUpdate("Bob")     │───┼──→ Event (action UP)
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
                                      │
                                      ▼
                            Parent's setState runs
                            Child gets new props!
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Quick Reference</h3>
<div class="overflow-x-auto mb-6">
    <table class="w-full text-sm text-left">
        <thead class="bg-dark-700 text-light-200">
            <tr>
                <th class="p-3 rounded-tl-lg">Feature</th>
                <th class="p-3">Props</th>
                <th class="p-3 rounded-tr-lg">State</th>
            </tr>
        </thead>
        <tbody class="text-light-300">
            <tr class="border-b border-dark-600">
                <td class="p-3">Owned by</td>
                <td class="p-3">Parent</td>
                <td class="p-3">Component itself</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">Mutable?</td>
                <td class="p-3">❌ Read-only</td>
                <td class="p-3">✅ Can change</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">Purpose</td>
                <td class="p-3">Configure component</td>
                <td class="p-3">Track changing data</td>
            </tr>
            <tr>
                <td class="p-3 rounded-bl-lg">Changes cause</td>
                <td class="p-3">Re-render</td>
                <td class="p-3 rounded-br-lg">Re-render</td>
            </tr>
        </tbody>
    </table>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">Lift state up</span>: If two siblings need the same data, move state to their parent</li>
    <li><span class="text-yellow-400 font-bold">Keep state minimal</span>: Don't store what you can calculate from other state</li>
    <li><span class="text-yellow-400 font-bold">Use props for configuration</span>: Color, size, labels, callbacks</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║            🎯 PROPS vs STATE - The Core Concept              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   ┌─────────────────────────────────────────────────┐        ║
║   │                   PARENT                        │        ║
║   │  ┌───────────────────────────────────────────┐  │        ║
║   │  │  STATE = { message: "Hello!" }            │  │        ║
║   │  │         ↑                                 │  │        ║
║   │  │         │ setState()                      │  │        ║
║   │  └─────────│─────────────────────────────────┘  │        ║
║   │            │                                    │        ║
║   │    ┌───────┴───────┐                            │        ║
║   │    ↓ PROPS (down)  ↑ EVENTS (up)               │        ║
║   │    │               │                            │        ║
║   │  ┌─┴───────────────┴─────────────────────────┐  │        ║
║   │  │              CHILD                        │  │        ║
║   │  │  props.message = "Hello!"  (READ-ONLY)   │  │        ║
║   │  │  props.onUpdate → calls parent setState  │  │        ║
║   │  └───────────────────────────────────────────┘  │        ║
║   └─────────────────────────────────────────────────┘        ║
║                                                              ║
║   💡 REMEMBER:                                               ║
║      • Props = EXTERNAL input (from parent)                  ║
║      • State = INTERNAL memory (owned by component)          ║
║      • Data flows DOWN, Events flow UP                       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 👶 CHILD COMPONENT
// ═══════════════════════════════════════════════════════════════
// This component RECEIVES data via props.
// It cannot change props directly - they are READ-ONLY!
// To communicate back to parent, it calls callback functions.
// ═══════════════════════════════════════════════════════════════
function ChildComponent({ 
  message,      // 📥 Data from parent (read-only)
  onSendReply   // 📤 Callback to send data UP to parent
}) {
  return (
    <div style={{ 
      padding: '20px', 
      background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
      borderRadius: '12px',
      margin: '15px 0',
      border: '3px solid #22c55e'
    }}>
      <h4 style={{ margin: '0 0 10px', color: '#166534' }}>
        👶 Child Component
      </h4>
      
      {/* ════════════════════════════════════════════════════════
          📥 DISPLAYING PROPS
          ════════════════════════════════════════════════════════
          Props are the "configuration" passed from parent.
          We can READ them but NEVER modify them directly!
          ════════════════════════════════════════════════════════ */}
      <div style={{ 
        background: 'white', 
        padding: '10px 15px', 
        borderRadius: '8px',
        marginBottom: '15px'
      }}>
        <strong>Received from parent:</strong>
        <p style={{ 
          margin: '5px 0 0', 
          color: '#3b82f6',
          fontSize: '18px'
        }}>
          "{message}"
        </p>
      </div>
      
      {/* ════════════════════════════════════════════════════════
          📤 SENDING DATA BACK UP
          ════════════════════════════════════════════════════════
          Child can't modify parent's state directly.
          Instead, it CALLS A FUNCTION that parent provided.
          This function (onSendReply) triggers parent's setState!
          ════════════════════════════════════════════════════════ */}
      <button 
        onClick={() => onSendReply('Reply from Child! 👋')}
        style={{ 
          padding: '10px 20px', 
          background: '#22c55e',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        📤 Send Reply to Parent
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 👨 PARENT COMPONENT (App)
// ═══════════════════════════════════════════════════════════════
// This component OWNS the state.
// It passes data DOWN to children via props.
// It passes callback functions so children can send data UP.
// ═══════════════════════════════════════════════════════════════
function App() {
  // ═══════════════════════════════════════════════════════════
  // 🧠 STATE: Component's Internal Memory
  // ═══════════════════════════════════════════════════════════
  // useState returns: [currentValue, setterFunction]
  // When setMessage is called, React re-renders this component
  // AND all children that depend on this state!
  // ═══════════════════════════════════════════════════════════
  const [message, setMessage] = React.useState('Hello from Parent! 👨');
  const [replyCount, setReplyCount] = React.useState(0);
  
  // ═══════════════════════════════════════════════════════════
  // 📮 HANDLER: Called when child sends a reply
  // ═══════════════════════════════════════════════════════════
  const handleChildReply = (childMessage) => {
    setMessage(childMessage);
    setReplyCount(prev => prev + 1);
  };
  
  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>🔄 Props & State Demo</h3>
      
      {/* Parent's own state display */}
      <div style={{ 
        padding: '20px', 
        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
        borderRadius: '12px',
        border: '3px solid #3b82f6'
      }}>
        <h4 style={{ margin: '0 0 10px', color: '#1e40af' }}>
          👨 Parent Component (owns state)
        </h4>
        <div style={{ background: 'white', padding: '10px 15px', borderRadius: '8px' }}>
          <strong>Current State:</strong>
          <p style={{ margin: '5px 0 0', color: '#22c55e', fontSize: '18px' }}>
            "{message}"
          </p>
          <p style={{ margin: '5px 0 0', color: '#666', fontSize: '14px' }}>
            Replies received: {replyCount}
          </p>
        </div>
        
        <button 
          onClick={() => setMessage('Fresh message from Parent! 📬')}
          style={{ 
            marginTop: '15px',
            padding: '10px 20px', 
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          📬 Update Message
        </button>
      </div>
      
      {/* Pass state DOWN and callback function */}
      <ChildComponent 
        message={message}           
        onSendReply={handleChildReply}    
      />
      
      <div style={{ 
        marginTop: '15px', 
        padding: '15px', 
        background: '#fef3c7', 
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <strong>💡 What's happening:</strong>
        <ul style={{ margin: '10px 0 0', paddingLeft: '20px' }}>
          <li>Parent owns <code>message</code> state</li>
          <li>Parent passes <code>message</code> to Child as prop</li>
          <li>Child displays prop but <strong>cannot modify it</strong></li>
          <li>Child calls <code>onSendReply()</code> to send data UP</li>
          <li>Parent receives it and updates state</li>
        </ul>
      </div>
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
<p>Multiple <code class="bg-dark-700 text-brand-primary px-1 rounded">setState</code> calls are grouped into one render.</p>
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
                intro: "useEffect is how React talks to the outside world - APIs, timers, subscriptions. Master this hook!",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What is a "side effect"?</li>
    <li>The 3 types of useEffect</li>
    <li>The dependency array explained</li>
    <li>Cleanup functions (prevent memory leaks!)</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📚 What is a Side Effect?</h3>
<p class="mb-4 text-light-300">A <span class="text-yellow-400 font-bold">side effect</span> is anything that happens OUTSIDE of rendering:</p>

<div class="grid md:grid-cols-2 gap-4 mb-6">
    <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl">
        <p class="text-green-300 font-bold mb-2">✅ Rendering (Pure)</p>
        <ul class="text-green-200 text-sm space-y-1">
            <li>• Calculating what to display</li>
            <li>• Returning JSX</li>
            <li>• Transforming data</li>
        </ul>
    </div>
    <div class="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl">
        <p class="text-yellow-300 font-bold mb-2">⚡ Side Effects</p>
        <ul class="text-yellow-200 text-sm space-y-1">
            <li>• Fetching data from API</li>
            <li>• Setting up timers</li>
            <li>• Subscribing to events</li>
            <li>• Changing the DOM directly</li>
        </ul>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚙️ The 3 Types of useEffect</h3>

<div class="space-y-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-xl border-l-4 border-red-500">
        <p class="text-white font-bold">Type 1: Run on EVERY render</p>
        <pre class="bg-dark-900 p-3 rounded mt-2 text-cyan-300 text-sm">useEffect(() => {
  console.log('I run after EVERY render');
}); // ← No dependency array!</pre>
        <p class="text-light-400 text-sm mt-2">⚠️ Use rarely - can cause performance issues</p>
    </div>
    
    <div class="bg-dark-800 p-4 rounded-xl border-l-4 border-green-500">
        <p class="text-white font-bold">Type 2: Run ONCE on mount</p>
        <pre class="bg-dark-900 p-3 rounded mt-2 text-cyan-300 text-sm">useEffect(() => {
  console.log('I run ONCE when component mounts');
  fetchData(); // Perfect for initial API calls!
}, <span class="text-yellow-300">[]</span>); // ← Empty array = mount only</pre>
        <p class="text-light-400 text-sm mt-2">✅ Most common - use for initial data fetching</p>
    </div>
    
    <div class="bg-dark-800 p-4 rounded-xl border-l-4 border-blue-500">
        <p class="text-white font-bold">Type 3: Run when DEPENDENCIES change</p>
        <pre class="bg-dark-900 p-3 rounded mt-2 text-cyan-300 text-sm">useEffect(() => {
  console.log('userId changed to:', userId);
  fetchUser(userId);
}, <span class="text-yellow-300">[userId]</span>); // ← Runs when userId changes</pre>
        <p class="text-light-400 text-sm mt-2">✅ Use when effect depends on specific values</p>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">🧹 Cleanup Functions (Prevent Memory Leaks!)</h3>
<p class="mb-4 text-light-300">The <span class="text-yellow-400 font-bold">return function</span> runs BEFORE the effect re-runs or when component unmounts:</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">useEffect(() => {
  // ✅ Setup: Subscribe to something
  const subscription = someAPI.subscribe(data);
  
  // 🧹 Cleanup: Unsubscribe when done
  <span class="text-yellow-300">return () => {
    subscription.unsubscribe();
  };</span>
}, []);</pre>
</div>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
    <p class="text-red-300 font-bold">⚠️ Common Memory Leak:</p>
    <pre class="text-red-200 text-sm mt-2">useEffect(() => {
  setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  // ❌ Interval keeps running even after unmount!
}, []);</pre>
    <pre class="text-green-200 text-sm mt-2">// ✅ Fixed:
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000);
  return () => clearInterval(id); // 🧹 Cleanup!
}, []);</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">📊 Visual: Effect Lifecycle</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Component Mounts
       │
       ▼
┌──────────────────┐
│  First Render    │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  useEffect runs  │ ← Setup (fetch, subscribe)
└──────────────────┘
       │
       ▼ (state changes)
┌──────────────────┐
│  Re-render       │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  Cleanup runs    │ ← Return function
│  Effect re-runs  │ ← If dependencies changed
└──────────────────┘
       │
       ▼ (unmount)
┌──────────────────┐
│  Final Cleanup   │ ← Prevent memory leaks!
└──────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">Include ALL values</span> from component scope that the effect uses</li>
    <li><span class="text-yellow-400 font-bold">ESLint will warn you</span> if you forget a dependency - listen to it!</li>
    <li><span class="text-yellow-400 font-bold">Avoid objects/arrays</span> in dependencies (they change every render)</li>
    <li><span class="text-yellow-400 font-bold">Use multiple useEffects</span> for unrelated logic (separation of concerns)</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║              🎯 useEffect LIFECYCLE DEMO                     ║
║         Understand when effects run & cleanup                ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   EFFECT TYPES & WHEN THEY RUN:                              ║
║   ══════════════════════════════                             ║
║                                                              ║
║   useEffect(() => {...})           → EVERY render           ║
║   useEffect(() => {...}, [])       → ONCE on mount          ║
║   useEffect(() => {...}, [dep])    → When dep changes       ║
║                                                              ║
║   LIFECYCLE FLOW:                                            ║
║   ════════════════                                           ║
║                                                              ║
║   Mount → Render → Effect runs                               ║
║      ↓                                                       ║
║   State Change → Re-render → Cleanup → Effect re-runs        ║
║      ↓                                                       ║
║   Unmount → Final Cleanup                                    ║
║                                                              ║
║   💡 TRY THIS: Click the button and watch the log!           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function App() {
  // ═══════════════════════════════════════════════════════════
  // 📦 STATE: Values that trigger re-renders when changed
  // ═══════════════════════════════════════════════════════════
  const [count, setCount] = React.useState(0);
  const [logs, setLogs] = React.useState([]);  // Log history
  
  // Helper function to add messages to our log
  const log = (msg) => setLogs(prev => [...prev, msg]);
  
  // ═══════════════════════════════════════════════════════════
  // ⚡ EFFECT TYPE 1: NO DEPENDENCY ARRAY
  // ═══════════════════════════════════════════════════════════
  // This runs after EVERY render (initial + all updates)
  // ⚠️ Use sparingly - can cause performance issues!
  //
  // Timeline:
  //   Render 1 → Effect runs
  //   Render 2 → Effect runs  
  //   Render 3 → Effect runs... and so on
  // ═══════════════════════════════════════════════════════════
  React.useEffect(() => {
    log('🔄 Effect: Runs on EVERY render');
  });
  
  // ═══════════════════════════════════════════════════════════
  // ⚡ EFFECT TYPE 2: EMPTY DEPENDENCY ARRAY []
  // ═══════════════════════════════════════════════════════════
  // This runs ONLY ONCE when component mounts.
  // Perfect for: initial API calls, setting up subscriptions
  //
  // The RETURN function is the CLEANUP:
  //   - Runs when component unmounts
  //   - Prevents memory leaks
  //   - Example: unsubscribe, clearTimeout, remove listeners
  // ═══════════════════════════════════════════════════════════
  React.useEffect(() => {
    log('✅ Effect: Component MOUNTED!');
    
    // 🧹 Cleanup function - runs on unmount
    return () => log('❌ Cleanup: Component UNMOUNTING...');
  }, []);  // ← Empty array = run once
  
  // ═══════════════════════════════════════════════════════════
  // ⚡ EFFECT TYPE 3: WITH DEPENDENCIES [count]
  // ═══════════════════════════════════════════════════════════
  // This runs:
  //   1. Once on initial mount
  //   2. Again whenever 'count' changes
  //
  // React checks: did count change? 
  //   Yes → Run effect
  //   No  → Skip effect
  // ═══════════════════════════════════════════════════════════
  React.useEffect(() => {
    log('📊 Effect: count changed to ' + count);
  }, [count]);  // ← Runs when count changes
  
  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>⚡ useEffect Lifecycle Demo</h3>
      
      {/* Counter display */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        borderRadius: '12px',
        color: 'white',
        marginBottom: '15px'
      }}>
        <span style={{ fontSize: '32px', fontWeight: 'bold' }}>{count}</span>
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{ 
            marginLeft: '15px',
            padding: '10px 20px',
            background: 'white',
            color: '#764ba2',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          + Increment
        </button>
      </div>
      
      {/* Effect log - shows exactly when each effect runs */}
      <div style={{ 
        padding: '15px', 
        background: '#0f172a', 
        borderRadius: '12px',
        border: '1px solid #334155'
      }}>
        <p style={{ color: '#94a3b8', margin: '0 0 10px', fontSize: '14px' }}>
          📋 Effect Log (watch the order!)
        </p>
        <div style={{ 
          color: '#22c55e', 
          fontFamily: 'monospace', 
          fontSize: '12px', 
          maxHeight: '120px', 
          overflow: 'auto' 
        }}>
          {logs.map((log, i) => (
            <div key={i} style={{ padding: '2px 0' }}>→ {log}</div>
          ))}
        </div>
      </div>
      
      <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
        💡 Click the button multiple times and observe which effects run!
      </p>
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
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What is useRef and when to use it</li>
    <li>Accessing DOM elements directly</li>
    <li>Storing values that persist without re-renders</li>
    <li>Common use cases and patterns</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📚 The Big Question: When Do I Need useRef?</h3>
<p class="mb-4 text-light-300">Sometimes you need to:</p>
<div class="grid md:grid-cols-2 gap-4 mb-6">
    <div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl">
        <p class="text-blue-300 font-bold mb-2">🎯 Access DOM Elements</p>
        <ul class="text-blue-200 text-sm space-y-1">
            <li>• Focus an input field</li>
            <li>• Scroll to a section</li>
            <li>• Measure element size</li>
            <li>• Play/pause video</li>
        </ul>
    </div>
    <div class="bg-purple-900/20 border border-purple-500/30 p-4 rounded-xl">
        <p class="text-purple-300 font-bold mb-2">💾 Store Values Silently</p>
        <ul class="text-purple-200 text-sm space-y-1">
            <li>• Previous state values</li>
            <li>• Timer/interval IDs</li>
            <li>• Render count (debugging)</li>
            <li>• Any value that shouldn't trigger re-render</li>
        </ul>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">🧠 How useRef Works</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
const myRef = useRef(initialValue);

// myRef is an object: { current: initialValue }
// 
// KEY DIFFERENCE FROM useState:
// ══════════════════════════════
// 
// useState:
//   setValue(newValue) → Triggers RE-RENDER → UI Updates
// 
// useRef:
//   myRef.current = newValue → NO re-render → UI stays same
//
// Think of useRef as a "box" that holds a value
// You can change what's in the box anytime
// React doesn't care - it won't re-render!
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">📍 Use Case 1: Accessing DOM Elements</h3>
<p class="mb-4 text-light-300">Attach a ref to any JSX element to access the actual DOM node:</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">// Step 1: Create a ref
const inputRef = useRef(<span class="text-yellow-300">null</span>);

// Step 2: Attach to element
&lt;input <span class="text-yellow-300">ref={inputRef}</span> /&gt;

// Step 3: Access the DOM node!
inputRef.<span class="text-green-300">current</span>.focus();  // Focus the input!
inputRef.<span class="text-green-300">current</span>.value;   // Read the value
inputRef.<span class="text-green-300">current</span>.style.background = 'yellow';</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">💾 Use Case 2: Storing Values Without Re-renders</h3>
<p class="mb-4 text-light-300">Perfect for values you need to track but don't want to display:</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">function Timer() {
  const intervalId = useRef(<span class="text-yellow-300">null</span>);
  
  const start = () => {
    // Store the interval ID (no re-render needed!)
    intervalId.<span class="text-green-300">current</span> = setInterval(() => {
      console.log('tick');
    }, 1000);
  };
  
  const stop = () => {
    // Access the stored ID to clear
    clearInterval(intervalId.<span class="text-green-300">current</span>);
  };
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Quick Reference: useState vs useRef</h3>
<div class="overflow-x-auto mb-6">
    <table class="w-full text-sm text-left">
        <thead class="bg-dark-700 text-light-200">
            <tr>
                <th class="p-3 rounded-tl-lg">Feature</th>
                <th class="p-3">useState</th>
                <th class="p-3 rounded-tr-lg">useRef</th>
            </tr>
        </thead>
        <tbody class="text-light-300">
            <tr class="border-b border-dark-600">
                <td class="p-3 font-bold">Re-renders on change?</td>
                <td class="p-3 text-green-400">✅ Yes</td>
                <td class="p-3 text-red-400">❌ No</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3 font-bold">Persists between renders?</td>
                <td class="p-3 text-green-400">✅ Yes</td>
                <td class="p-3 text-green-400">✅ Yes</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3 font-bold">Use for UI data?</td>
                <td class="p-3 text-green-400">✅ Yes</td>
                <td class="p-3 text-red-400">❌ No</td>
            </tr>
            <tr>
                <td class="p-3 rounded-bl-lg font-bold">Use for DOM access?</td>
                <td class="p-3 text-red-400">❌ No</td>
                <td class="p-3 rounded-br-lg text-green-400">✅ Yes</td>
            </tr>
        </tbody>
    </table>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚠️ Common Mistakes</h3>
<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
    <p class="text-red-300 font-bold mb-2">❌ Don't read/write ref.current during render!</p>
    <pre class="text-red-200 text-sm mt-2">function Bad() {
  const ref = useRef(0);
  ref.current++;  // ❌ Side effect during render!
  return &lt;p&gt;{ref.current}&lt;/p&gt;; // ❌ Won't update UI anyway
}</pre>
    <pre class="text-green-200 text-sm mt-2">function Good() {
  const ref = useRef(0);
  useEffect(() => {
    ref.current++;  // ✅ Side effect in useEffect
  });
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">Initial value of null</span> is common for DOM refs (element doesn't exist yet)</li>
    <li><span class="text-yellow-400 font-bold">Refs are mutable</span> - unlike props and state, you can modify .current directly</li>
    <li><span class="text-yellow-400 font-bold">Refs survive re-renders</span> - value persists even when component updates</li>
    <li><span class="text-yellow-400 font-bold">Use for "escape hatches"</span> - when React's declarative model isn't enough</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║                    🎯 useRef DEMO                            ║
║       Access DOM elements & persist values without           ║
║              triggering re-renders!                          ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   TWO MAIN USE CASES FOR useRef:                             ║
║   ══════════════════════════════                             ║
║                                                              ║
║   1️⃣  ACCESS DOM ELEMENTS                                    ║
║       const inputRef = useRef(null);                         ║
║       <input ref={inputRef} />                               ║
║       inputRef.current.focus(); // Direct DOM access!        ║
║                                                              ║
║   2️⃣  PERSIST VALUES (without re-render)                     ║
║       const count = useRef(0);                               ║
║       count.current++;  // ← NO re-render triggered!         ║
║                                                              ║
║   STATE vs REF:                                              ║
║   ═════════════                                              ║
║       useState  → Changes trigger re-render                  ║
║       useRef    → Changes are SILENT                         ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function App() {
  // ═══════════════════════════════════════════════════════════
  // 🎯 USE CASE 1: DOM Element Reference
  // ═══════════════════════════════════════════════════════════
  // useRef(null) creates a "box" that holds a reference.
  // When we attach it to an element via ref={inputRef},
  // inputRef.current becomes that actual DOM element!
  //
  // This allows us to:
  //   - Focus inputs programmatically
  //   - Measure element dimensions
  //   - Trigger animations
  //   - Access canvas context
  // ═══════════════════════════════════════════════════════════
  const inputRef = React.useRef(null);
  
  // ═══════════════════════════════════════════════════════════
  // 🎯 USE CASE 2: Persist Values Across Renders
  // ═══════════════════════════════════════════════════════════
  // Unlike useState, changing a ref does NOT cause re-render!
  // Perfect for:
  //   - Counting renders (for debugging)
  //   - Storing previous values
  //   - Holding timer IDs
  //   - Any value you need to persist but not display
  // ═══════════════════════════════════════════════════════════
  const renderCount = React.useRef(0);
  
  // State DOES cause re-renders (needed for UI updates)
  const [value, setValue] = React.useState('');
  
  // This increments every render, but DOESN'T trigger new renders
  renderCount.current++;
  
  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>🎯 useRef Demo</h3>
      
      {/* Input with ref attached */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '15px'
      }}>
        <input 
          ref={inputRef}  // ← Attach ref to DOM element
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Type something..."
          style={{ 
            padding: '12px', 
            marginRight: '10px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            width: '200px'
          }}
        />
        <button 
          onClick={() => inputRef.current.focus()}  // ← Direct DOM access!
          style={{ 
            padding: '12px 20px',
            background: 'white',
            color: '#f5576c',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          📍 Focus Input
        </button>
      </div>
      
      {/* Render count display */}
      <div style={{ 
        background: '#0f172a', 
        padding: '15px',
        borderRadius: '12px',
        border: '1px solid #334155'
      }}>
        <p style={{ color: '#94a3b8', margin: '0 0 5px', fontSize: '14px' }}>
          Render Count (ref mutation doesn't re-render):
        </p>
        <span style={{ 
          color: '#22c55e', 
          fontSize: '24px', 
          fontWeight: 'bold',
          fontFamily: 'monospace' 
        }}>
          {renderCount.current}
        </span>
      </div>
      
      <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
        💡 Type in the input - ref.current stays synced without extra renders!
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
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Why React re-runs calculations on every render</li>
    <li>How useMemo caches expensive calculations</li>
    <li>How useCallback caches function references</li>
    <li>When to use (and when NOT to use) memoization</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📚 The Problem: Wasted Calculations</h3>
<p class="mb-4 text-light-300">Every time a component re-renders, ALL code inside it runs again:</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
<pre class="text-red-200 text-sm">function ProductList({ products }) {
  // ❌ This runs on EVERY render, even if products didn't change!
  const sortedProducts = products
    .filter(p => p.inStock)
    .sort((a, b) => b.price - a.price)
    .map(p => ({ ...p, discount: calculateDiscount(p) }));
  
  return sortedProducts.map(...);
}</pre>
    <p class="text-red-300 text-sm mt-2">If parent re-renders 100 times, this calculation runs 100 times! 🐌</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">🧮 Solution 1: useMemo - Cache Calculated Values</h3>
<p class="mb-4 text-light-300">useMemo remembers the result and only recalculates when dependencies change:</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">const memoizedValue = useMemo(() => {
  // Expensive calculation here
  return expensiveCalculation(a, b);
}, <span class="text-yellow-300">[a, b]</span>); // Only recalculates when a or b changes!

// ═══════════════════════════════════════════════════
// HOW IT WORKS:
// ═══════════════════════════════════════════════════
// Render 1: [a=1, b=2] → Calculates → Returns 3 → Stores 3
// Render 2: [a=1, b=2] → Same deps → Returns cached 3 ✅
// Render 3: [a=1, b=5] → Deps changed → Recalculates → 6
// ═══════════════════════════════════════════════════</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔗 Solution 2: useCallback - Cache Function References</h3>
<p class="mb-4 text-light-300">In JavaScript, functions are objects. A new function is created on every render:</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">// ❌ WITHOUT useCallback:
function Parent() {
  const handleClick = () => { ... };
  // handleClick is a NEW function on every render!
  // Child will always re-render (even with React.memo)
  return &lt;Child onClick={handleClick} /&gt;;
}

// ✅ WITH useCallback:
function Parent() {
  const handleClick = <span class="text-yellow-300">useCallback</span>(() => {
    console.log('clicked');
  }, <span class="text-yellow-300">[]</span>); // Same function reference every render!
  
  return &lt;Child onClick={handleClick} /&gt;;
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🎯 The Referential Equality Problem</h3>
<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
    <p class="text-blue-200 mb-2">In JavaScript, objects/arrays/functions are compared by <span class="text-yellow-400 font-bold">reference</span>, not value:</p>
    <pre class="text-blue-300 text-sm bg-dark-900 p-3 rounded mt-2">
{} === {}              // false (different references!)
[] === []              // false
(() => {}) === (() => {}) // false

const obj = {};
obj === obj            // true (same reference!)
    </pre>
    <p class="text-blue-200 mt-2 text-sm">This is why passing a new object/function as a prop always triggers child re-render!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📊 Visual: When to Use What</h3>
<div class="overflow-x-auto mb-6">
    <table class="w-full text-sm text-left">
        <thead class="bg-dark-700 text-light-200">
            <tr>
                <th class="p-3 rounded-tl-lg">Scenario</th>
                <th class="p-3">Hook</th>
                <th class="p-3 rounded-tr-lg">Example</th>
            </tr>
        </thead>
        <tbody class="text-light-300">
            <tr class="border-b border-dark-600">
                <td class="p-3">Expensive calculation</td>
                <td class="p-3 text-green-400 font-bold">useMemo</td>
                <td class="p-3 font-mono text-xs">Filtering 10,000 items</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">Creating object for dependency</td>
                <td class="p-3 text-green-400 font-bold">useMemo</td>
                <td class="p-3 font-mono text-xs">useEffect deps</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">Callback to memoized child</td>
                <td class="p-3 text-blue-400 font-bold">useCallback</td>
                <td class="p-3 font-mono text-xs">onClick to React.memo child</td>
            </tr>
            <tr>
                <td class="p-3 rounded-bl-lg">Callback in useEffect deps</td>
                <td class="p-3 text-blue-400 font-bold">useCallback</td>
                <td class="p-3 rounded-br-lg font-mono text-xs">Preventing infinite loops</td>
            </tr>
        </tbody>
    </table>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚠️ Don't Over-Optimize!</h3>
<div class="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
    <p class="text-yellow-300 font-bold mb-2">🛑 Memoization has a cost!</p>
    <ul class="text-yellow-200 text-sm space-y-1">
        <li>• React must store the cached value in memory</li>
        <li>• React must compare dependencies on every render</li>
        <li>• For simple calculations, this overhead is MORE than just recalculating!</li>
    </ul>
    <p class="text-yellow-300 mt-3 font-bold">Rule: Profile first, optimize second. Don't guess!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">useMemo for values</span> - results of calculations</li>
    <li><span class="text-yellow-400 font-bold">useCallback for functions</span> - actually just useMemo(() => fn, deps)</li>
    <li><span class="text-yellow-400 font-bold">React.memo for components</span> - wrap child to skip re-render if props same</li>
    <li><span class="text-yellow-400 font-bold">Use React DevTools Profiler</span> - find what actually needs optimization</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║          🎯 MEMOIZATION: useMemo & useCallback               ║
║      Skip expensive calculations & maintain stable refs      ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   THE PROBLEM:                                               ║
║   ═══════════════                                            ║
║   React re-runs your ENTIRE component on every render.       ║
║   Without memoization:                                       ║
║     - Expensive calculations run repeatedly                  ║
║     - New function references break child optimization       ║
║                                                              ║
║   THE SOLUTION:                                              ║
║   ═══════════════                                            ║
║                                                              ║
║   useMemo(() => value, [deps])                               ║
║     → Caches the RESULT of a calculation                     ║
║     → Only recalculates when deps change                     ║
║                                                              ║
║   useCallback(() => fn, [deps])                              ║
║     → Caches the FUNCTION itself                             ║
║     → Keeps same reference between renders                   ║
║     → Essential when passing to React.memo() children        ║
║                                                              ║
║   💡 TRY: Type in input vs click button - watch the log!     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function App() {
  // ═══════════════════════════════════════════════════════════
  // 📦 TWO PIECES OF STATE
  // ═══════════════════════════════════════════════════════════
  // count: Controls the expensive calculation
  // text:  Independent state that SHOULD NOT trigger calculation
  // ═══════════════════════════════════════════════════════════
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState('');
  const [computeLog, setComputeLog] = React.useState([]);
  
  // ═══════════════════════════════════════════════════════════
  // 🧮 useMemo: CACHE EXPENSIVE CALCULATION
  // ═══════════════════════════════════════════════════════════
  // WITHOUT useMemo: This runs on EVERY render (even text changes)
  // WITH useMemo:    Only runs when [count] changes!
  //
  // Perfect for:
  //   - Filtering/sorting large arrays
  //   - Complex calculations
  //   - Object creation for useEffect dependencies
  // ═══════════════════════════════════════════════════════════
  const expensiveValue = React.useMemo(() => {
    const timestamp = new Date().toLocaleTimeString();
    setComputeLog(prev => [...prev, '🧮 Computing at ' + timestamp]);
    
    // Simulate expensive work
    let result = 0;
    for (let i = 0; i < count * 1000000; i++) {
      result += 1;
    }
    return count * 100;
  }, [count]);  // ← Only recalculates when count changes!
  
  // ═══════════════════════════════════════════════════════════
  // 🔗 useCallback: CACHE FUNCTION REFERENCE
  // ═══════════════════════════════════════════════════════════
  // WITHOUT useCallback: New function created every render
  //   → Children using React.memo() re-render anyway!
  //
  // WITH useCallback: Same function reference persists
  //   → Children can skip re-rendering
  // ═══════════════════════════════════════════════════════════
  const handleClick = React.useCallback(() => {
    setCount(c => c + 1);
  }, []);  // ← Empty deps = always same function
  
  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>🧮 Memoization Demo</h3>
      
      {/* Counter with memoized value */}
      <div style={{ 
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '15px'
      }}>
        <p style={{ margin: '0 0 10px', color: '#7c2d12' }}>
          Count: <strong>{count}</strong> | Computed: <strong>{expensiveValue}</strong>
        </p>
        <button 
          onClick={handleClick}
          style={{ 
            padding: '10px 20px',
            background: '#ea580c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          + Increment (triggers useMemo)
        </button>
      </div>
      
      {/* Text input - should NOT trigger useMemo */}
      <div style={{ marginBottom: '15px' }}>
        <input 
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type here (NO recomputation!)"
          style={{ 
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #e2e8f0',
            width: '100%',
            fontSize: '16px'
          }}
        />
        <p style={{ color: '#64748b', fontSize: '13px', marginTop: '5px' }}>
          ⬆️ Typing here re-renders but useMemo skips calculation!
        </p>
      </div>
      
      {/* Computation log */}
      <div style={{ 
        background: '#0f172a', 
        padding: '15px',
        borderRadius: '12px',
        border: '1px solid #334155'
      }}>
        <p style={{ color: '#94a3b8', margin: '0 0 10px', fontSize: '14px' }}>
          📋 Computation Log (should only update on button click):
        </p>
        <div style={{ color: '#22c55e', fontFamily: 'monospace', fontSize: '12px' }}>
          {computeLog.slice(-5).map((log, i) => (
            <div key={i}>→ {log}</div>
          ))}
        </div>
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
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What is "prop drilling" and why it's a problem</li>
    <li>How Context provides a solution</li>
    <li>Creating, providing, and consuming context</li>
    <li>When to use Context vs other state management</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📚 The Problem: Prop Drilling</h3>
<p class="mb-4 text-light-300">Imagine you need to pass user data from App to a deeply nested component:</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
<pre class="text-red-200 text-sm">// ❌ PROP DRILLING - Passing through every level!

&lt;App user={user}&gt;                    // Level 0: Has the data
  &lt;Layout user={user}&gt;               // Level 1: Just passes it
    &lt;Sidebar user={user}&gt;            // Level 2: Just passes it
      &lt;Navigation user={user}&gt;       // Level 3: Just passes it
        &lt;UserMenu user={user} /&gt;     // Level 4: Finally uses it!
      &lt;/Navigation&gt;
    &lt;/Sidebar&gt;
  &lt;/Layout&gt;
&lt;/App&gt;</pre>
    <p class="text-red-300 text-sm mt-2">❌ Layout, Sidebar, Navigation don't even USE user - they just pass it through!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">✅ The Solution: Context API</h3>
<p class="mb-4 text-light-300">Context creates a "portal" - data teleports directly to where it's needed:</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
┌──────────────────────────────────────────────────────┐
│  &lt;UserContext.Provider value={user}&gt;                 │  ← PROVIDE once
│                                                      │
│    &lt;App&gt;                                             │
│      &lt;Layout&gt;            ← No props needed!          │
│        &lt;Sidebar&gt;         ← No props needed!          │
│          &lt;Navigation&gt;    ← No props needed!          │
│            &lt;UserMenu /&gt;  ← useContext(UserContext)   │  ← CONSUME anywhere!
│                                                      │
└──────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔧 Three Steps to Use Context</h3>

<div class="space-y-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-xl border-l-4 border-blue-500">
        <p class="text-white font-bold">Step 1: CREATE the Context</p>
        <pre class="bg-dark-900 p-3 rounded mt-2 text-cyan-300 text-sm">const UserContext = React.createContext(null);
// The argument is the DEFAULT value (used when no Provider above)</pre>
    </div>
    
    <div class="bg-dark-800 p-4 rounded-xl border-l-4 border-green-500">
        <p class="text-white font-bold">Step 2: PROVIDE the value</p>
        <pre class="bg-dark-900 p-3 rounded mt-2 text-cyan-300 text-sm">&lt;UserContext.Provider value={currentUser}&gt;
  &lt;App /&gt;   {/* Everything inside can access currentUser */}
&lt;/UserContext.Provider&gt;</pre>
    </div>
    
    <div class="bg-dark-800 p-4 rounded-xl border-l-4 border-purple-500">
        <p class="text-white font-bold">Step 3: CONSUME anywhere below</p>
        <pre class="bg-dark-900 p-3 rounded mt-2 text-cyan-300 text-sm">function UserMenu() {
  const user = React.useContext(UserContext);
  return &lt;span&gt;Hello, {user.name}!&lt;/span&gt;;
}</pre>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">📊 Common Use Cases for Context</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
    <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl">
        <p class="text-green-300 font-bold mb-2">✅ GOOD Use Cases</p>
        <ul class="text-green-200 text-sm space-y-1">
            <li>• Theme (dark/light mode)</li>
            <li>• Current user / Auth state</li>
            <li>• Language / Locale</li>
            <li>• UI state (sidebar open/closed)</li>
        </ul>
    </div>
    <div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl">
        <p class="text-red-300 font-bold mb-2">❌ BAD Use Cases</p>
        <ul class="text-red-200 text-sm space-y-1">
            <li>• Frequently changing data</li>
            <li>• Large objects (causes many re-renders)</li>
            <li>• Data only used by 1-2 components</li>
            <li>• Complex state with many actions</li>
        </ul>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚠️ Context Re-render Trap</h3>
<div class="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
    <p class="text-yellow-300 font-bold mb-2">🚨 When Provider value changes, ALL consumers re-render!</p>
    <pre class="text-yellow-200 text-sm mt-2">// ❌ BAD: New object every render!
&lt;UserContext.Provider value={{ user, theme }}&gt;

// ✅ GOOD: Memoize or split contexts
const value = useMemo(() => ({ user, theme }), [user, theme]);
&lt;UserContext.Provider value={value}&gt;</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Context vs Redux vs Other State Management</h3>
<div class="overflow-x-auto mb-6">
    <table class="w-full text-sm text-left">
        <thead class="bg-dark-700 text-light-200">
            <tr>
                <th class="p-3 rounded-tl-lg">Feature</th>
                <th class="p-3">Context</th>
                <th class="p-3 rounded-tr-lg">Redux/Zustand</th>
            </tr>
        </thead>
        <tbody class="text-light-300">
            <tr class="border-b border-dark-600">
                <td class="p-3">Setup complexity</td>
                <td class="p-3 text-green-400">Simple</td>
                <td class="p-3 text-yellow-400">Medium</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">Re-render optimization</td>
                <td class="p-3 text-red-400">Poor (all consumers)</td>
                <td class="p-3 text-green-400">Great (selectors)</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">DevTools</td>
                <td class="p-3 text-yellow-400">Limited</td>
                <td class="p-3 text-green-400">Excellent</td>
            </tr>
            <tr>
                <td class="p-3 rounded-bl-lg">Best for</td>
                <td class="p-3">Low-frequency updates</td>
                <td class="p-3 rounded-br-lg">Complex app state</td>
            </tr>
        </tbody>
    </table>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">Split contexts by update frequency</span> - separate theme from user data</li>
    <li><span class="text-yellow-400 font-bold">Create custom hooks</span> - useUser() instead of useContext(UserContext)</li>
    <li><span class="text-yellow-400 font-bold">Colocate Provider near consumers</span> - don't always put at app root</li>
    <li><span class="text-yellow-400 font-bold">Consider Zustand/Jotai</span> - for complex state with better performance</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║              🎯 CONTEXT API - Global State                   ║
║         Share data without passing props through every       ║
║                    level of the tree!                        ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   THE PROBLEM: PROP DRILLING                                 ║
║   ═══════════════════════════                                ║
║                                                              ║
║   <App theme={theme}>                                        ║
║     <Header theme={theme}>         ← Pass through            ║
║       <Nav theme={theme}>          ← Pass through            ║
║         <Button theme={theme} />   ← Finally uses it!        ║
║                                                              ║
║   THE SOLUTION: CONTEXT                                      ║
║   ══════════════════════                                     ║
║                                                              ║
║   <ThemeContext.Provider value={theme}>                      ║
║     <Header>                                                 ║
║       <Nav>                                                  ║
║         <Button />  ← useContext(ThemeContext) 🎉            ║
║                                                              ║
║   HOW IT WORKS:                                              ║
║   ══════════════                                             ║
║   1. createContext() - Create the context                    ║
║   2. <Provider value={...}> - Provide the value              ║
║   3. useContext() - Consume anywhere below                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 📦 STEP 1: CREATE CONTEXT
// ═══════════════════════════════════════════════════════════════
// createContext takes a default value (used when no Provider above)
// This creates a "channel" for passing data down the tree
// ═══════════════════════════════════════════════════════════════
const ThemeContext = React.createContext('light');

// ═══════════════════════════════════════════════════════════════
// 🎨 CONSUMER COMPONENT (Deep in the tree)
// ═══════════════════════════════════════════════════════════════
// This component is nested deep, but it can access theme
// directly via useContext - NO prop drilling needed!
// ═══════════════════════════════════════════════════════════════
function ThemeButton() {
  // 🎯 STEP 3: CONSUME CONTEXT
  // React finds the nearest ThemeContext.Provider above
  // and returns its current value
  const theme = React.useContext(ThemeContext);
  
  return (
    <button style={{
      background: theme === 'dark' ? '#1e293b' : '#ffffff',
      color: theme === 'dark' ? '#f8fafc' : '#1e293b',
      padding: '12px 24px',
      border: theme === 'dark' ? '2px solid #3b82f6' : '2px solid #e2e8f0',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }}>
      🎨 Theme: {theme.toUpperCase()}
    </button>
  );
}

// Another consumer - shows context can be used by multiple components
function ThemeStatus() {
  const theme = React.useContext(ThemeContext);
  return (
    <p style={{ 
      color: theme === 'dark' ? '#94a3b8' : '#64748b',
      fontSize: '14px' 
    }}>
      Current mode: {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </p>
  );
}

function App() {
  const [theme, setTheme] = React.useState('light');
  
  // ═══════════════════════════════════════════════════════════
  // 📦 STEP 2: PROVIDE CONTEXT
  // ═══════════════════════════════════════════════════════════
  // Wrap your app (or part of it) in Provider
  // Any component below can access the value!
  // When value changes, all consumers re-render
  // ═══════════════════════════════════════════════════════════
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ 
        fontFamily: 'system-ui', 
        padding: '20px',
        background: theme === 'dark' ? '#0f172a' : '#f8fafc',
        minHeight: '200px',
        borderRadius: '12px',
        transition: 'all 0.3s ease'
      }}>
        <h3 style={{ color: theme === 'dark' ? '#f8fafc' : '#1e293b' }}>
          🔗 Context API Demo
        </h3>
        
        {/* These components access theme via context, not props! */}
        <ThemeButton />
        <ThemeStatus />
        
        <div style={{ marginTop: '15px' }}>
          <button 
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            style={{
              padding: '10px 20px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            🔄 Toggle Theme
          </button>
        </div>
        
        <p style={{ 
          color: theme === 'dark' ? '#64748b' : '#94a3b8',
          marginTop: '15px',
          fontSize: '13px'
        }}>
          💡 ThemeButton and ThemeStatus use useContext - no props passed!
        </p>
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
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What is a custom hook and why create one</li>
    <li>How to extract reusable logic from components</li>
    <li>The rules of hooks (and why they exist)</li>
    <li>Real-world custom hook examples</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📚 The Problem: Duplicated Logic</h3>
<p class="mb-4 text-light-300">You find yourself writing the same logic in multiple components:</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
<pre class="text-red-200 text-sm">// ❌ Component A - Fetch user data
function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setUser).finally(() => setLoading(false));
  }, []);
}

// ❌ Component B - Same exact logic duplicated!
function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setUser).finally(() => setLoading(false));
  }, []);
}</pre>
    <p class="text-red-300 text-sm mt-2">❌ Copy-paste = bugs, inconsistency, hard to maintain!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">✅ The Solution: Custom Hook</h3>
<p class="mb-4 text-light-300">Extract the logic into a reusable function that starts with "use":</p>

<div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mb-6">
<pre class="text-green-200 text-sm">// ✅ Custom Hook - Single source of truth!
function <span class="text-yellow-300">useUser</span>() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/user')
      .then(r => r.json())
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);
  
  return { user, loading };
}

// Now in ANY component:
function ProfilePage() {
  const { user, loading } = <span class="text-yellow-300">useUser()</span>;  // One line! ✨
}

function SettingsPage() {
  const { user, loading } = <span class="text-yellow-300">useUser()</span>;  // Same hook, same behavior!
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">📜 Rules of Hooks</h3>
<div class="space-y-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-xl border-l-4 border-blue-500">
        <p class="text-white font-bold">Rule 1: Name must start with "use"</p>
        <p class="text-light-300 text-sm mt-2">This tells React it's a hook and enables linting rules</p>
        <pre class="bg-dark-900 p-3 rounded mt-2 text-sm">
<span class="text-green-300">✅ useCounter, useFetch, useLocalStorage</span>
<span class="text-red-300">❌ getCounter, fetchData, withStorage</span></pre>
    </div>
    
    <div class="bg-dark-800 p-4 rounded-xl border-l-4 border-yellow-500">
        <p class="text-white font-bold">Rule 2: Only call hooks at the TOP LEVEL</p>
        <p class="text-light-300 text-sm mt-2">Never inside loops, conditions, or nested functions</p>
        <pre class="bg-dark-900 p-3 rounded mt-2 text-sm">
<span class="text-red-300">❌ if (condition) { useState(...) }</span>
<span class="text-red-300">❌ for (let i...) { useEffect(...) }</span>
<span class="text-green-300">✅ const [state, setState] = useState(...);</span></pre>
    </div>
    
    <div class="bg-dark-800 p-4 rounded-xl border-l-4 border-purple-500">
        <p class="text-white font-bold">Rule 3: Only call hooks from React functions</p>
        <p class="text-light-300 text-sm mt-2">Components or other custom hooks only</p>
        <pre class="bg-dark-900 p-3 rounded mt-2 text-sm">
<span class="text-red-300">❌ Regular function: function helper() { useState(...) }</span>
<span class="text-green-300">✅ Component: function MyComponent() { useState(...) }</span>
<span class="text-green-300">✅ Custom Hook: function useMyHook() { useState(...) }</span></pre>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔧 Popular Custom Hook Patterns</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">useLocalStorage</p>
        <p class="text-light-300 text-sm">Sync state with localStorage</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">useFetch</p>
        <p class="text-light-300 text-sm">Data fetching with loading/error</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">useDebounce</p>
        <p class="text-light-300 text-sm">Delay value updates (search input)</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">useMediaQuery</p>
        <p class="text-light-300 text-sm">Respond to screen size changes</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">useOnClickOutside</p>
        <p class="text-light-300 text-sm">Detect clicks outside element</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">usePrevious</p>
        <p class="text-light-300 text-sm">Access previous value of state</p>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">📊 Custom Hook vs Regular Function</h3>
<div class="overflow-x-auto mb-6">
    <table class="w-full text-sm text-left">
        <thead class="bg-dark-700 text-light-200">
            <tr>
                <th class="p-3 rounded-tl-lg">Feature</th>
                <th class="p-3">Custom Hook</th>
                <th class="p-3 rounded-tr-lg">Regular Function</th>
            </tr>
        </thead>
        <tbody class="text-light-300">
            <tr class="border-b border-dark-600">
                <td class="p-3">Can use useState?</td>
                <td class="p-3 text-green-400">✅ Yes</td>
                <td class="p-3 text-red-400">❌ No</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">Can use useEffect?</td>
                <td class="p-3 text-green-400">✅ Yes</td>
                <td class="p-3 text-red-400">❌ No</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">Has its own state?</td>
                <td class="p-3 text-green-400">✅ Yes (per component)</td>
                <td class="p-3 text-red-400">❌ No</td>
            </tr>
            <tr>
                <td class="p-3 rounded-bl-lg">Use case</td>
                <td class="p-3">Stateful logic reuse</td>
                <td class="p-3 rounded-br-lg">Pure calculations</td>
            </tr>
        </tbody>
    </table>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">Each component gets its own state</span> - hooks don't share state between components</li>
    <li><span class="text-yellow-400 font-bold">Return objects for flexibility</span> - { value, setValue } instead of [value, setValue]</li>
    <li><span class="text-yellow-400 font-bold">Keep hooks focused</span> - one responsibility per hook</li>
    <li><span class="text-yellow-400 font-bold">Check existing libraries first</span> - react-use, usehooks-ts have 100+ hooks</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║              🎯 CUSTOM HOOKS - Reusable Logic                ║
║         Extract and share stateful logic between             ║
║                      components!                             ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   WHAT IS A CUSTOM HOOK?                                     ║
║   ══════════════════════                                     ║
║   A function that:                                           ║
║     ✅ Starts with "use" (useCounter, useFetch, useForm)     ║
║     ✅ Can call other hooks (useState, useEffect, etc.)      ║
║     ✅ Returns anything (value, object, array)               ║
║                                                              ║
║   WHY USE CUSTOM HOOKS?                                      ║
║   ═════════════════════                                      ║
║                                                              ║
║   WITHOUT Custom Hook:         WITH Custom Hook:             ║
║   ════════════════════         ══════════════════            ║
║   ComponentA:                  ComponentA:                   ║
║     const [count, set] = ...     const counter = useCounter()║
║     const inc = () => ...                                    ║
║     const dec = () => ...      ComponentB:                   ║
║                                  const counter = useCounter()║
║   ComponentB:                                                ║
║     const [count, set] = ...   🎉 Logic is REUSED!           ║
║     const inc = () => ...                                    ║
║     const dec = () => ...                                    ║
║                                                              ║
║   RULES:                                                     ║
║   ══════                                                     ║
║   1. Name MUST start with "use"                              ║
║   2. Call hooks at TOP LEVEL only (no if/loops)              ║
║   3. Call hooks from React functions only                    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🎣 CUSTOM HOOK: useCounter
// ═══════════════════════════════════════════════════════════════
// This hook encapsulates all counter logic:
//   - State (count)
//   - Actions (increment, decrement, reset)
//
// Any component can now use this without duplicating code!
// ═══════════════════════════════════════════════════════════════
function useCounter(initialValue = 0, step = 1) {
  // Internal state - each component using this hook gets its OWN state
  const [count, setCount] = React.useState(initialValue);
  
  // Action functions - encapsulated logic
  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);
  const setTo = (value) => setCount(value);
  
  // Return an object with everything the consumer needs
  return { 
    count,       // Current value
    increment,   // +step
    decrement,   // -step
    reset,       // Back to initial
    setTo        // Set to specific value
  };
}

// ═══════════════════════════════════════════════════════════════
// 🎣 BONUS: useToggle Hook
// ═══════════════════════════════════════════════════════════════
// Another common pattern - toggling boolean state
// ═══════════════════════════════════════════════════════════════
function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  return { value, toggle, setTrue, setFalse };
}

function App() {
  // 🎯 Using our custom hooks - so clean!
  const counter = useCounter(10, 5);  // Start at 10, step by 5
  const darkMode = useToggle(false);
  
  return (
    <div style={{ 
      fontFamily: 'system-ui', 
      padding: '20px',
      background: darkMode.value ? '#1e293b' : '#f8fafc',
      borderRadius: '12px',
      transition: 'all 0.3s ease'
    }}>
      <h3 style={{ color: darkMode.value ? '#f8fafc' : '#1e293b' }}>
        🎣 Custom Hooks Demo
      </h3>
      
      {/* Counter using useCounter hook */}
      <div style={{
        background: darkMode.value ? '#0f172a' : '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '15px',
        border: darkMode.value ? '1px solid #334155' : '1px solid #e2e8f0'
      }}>
        <p style={{ 
          fontSize: '32px', 
          fontWeight: 'bold',
          color: '#3b82f6',
          margin: '0 0 15px'
        }}>
          {counter.count}
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={counter.decrement} style={btnStyle}>➖ Decrease</button>
          <button onClick={counter.increment} style={btnStyle}>➕ Increase</button>
          <button onClick={counter.reset} style={{...btnStyle, background: '#ef4444'}}>🔄 Reset</button>
        </div>
        <p style={{ color: '#64748b', marginTop: '10px', fontSize: '13px' }}>
          Step size: 5 (configured in useCounter)
        </p>
      </div>
      
      {/* Toggle using useToggle hook */}
      <button 
        onClick={darkMode.toggle}
        style={{
          padding: '10px 20px',
          background: darkMode.value ? '#f8fafc' : '#1e293b',
          color: darkMode.value ? '#1e293b' : '#f8fafc',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        {darkMode.value ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      
      <p style={{ 
        color: darkMode.value ? '#94a3b8' : '#64748b',
        marginTop: '15px',
        fontSize: '13px'
      }}>
        💡 Both useCounter and useToggle are custom hooks - reusable everywhere!
      </p>
    </div>
  );
}

// Shared button style
const btnStyle = {
  padding: '10px 16px',
  background: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '500'
};`,
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
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What is a Higher Order Component (HOC)</li>
    <li>What is the Render Props pattern</li>
    <li>When these patterns are still useful today</li>
    <li>How Hooks have replaced most use cases</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📚 Pattern 1: Higher Order Component (HOC)</h3>
<p class="mb-4 text-light-300">An HOC is a function that takes a component and returns a NEW enhanced component:</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">// HOC Pattern: withSomething(Component) → EnhancedComponent

const <span class="text-yellow-300">EnhancedButton</span> = <span class="text-green-300">withLogging</span>(Button);
//                       ↑ HOC adds logging capability
//                         to the original Button

// Using it:
&lt;EnhancedButton onClick={...} /&gt;</pre>
</div>

<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
    <p class="text-blue-200 mb-2">🎯 <span class="text-yellow-400 font-bold">Think of HOCs like decorators</span> - they wrap a component and add extra features without modifying the original.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔧 Common HOC Examples</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">withAuth</p>
        <p class="text-light-300 text-sm">Redirect if not logged in</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">withLoading</p>
        <p class="text-light-300 text-sm">Show spinner while loading</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">withTheme</p>
        <p class="text-light-300 text-sm">Inject theme props</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">connect()</p>
        <p class="text-light-300 text-sm">Redux's famous HOC</p>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">📚 Pattern 2: Render Props</h3>
<p class="mb-4 text-light-300">A component that takes a function as a prop and calls it to render UI:</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">// Render Props Pattern: A prop whose value is a function

&lt;MouseTracker <span class="text-yellow-300">render</span>={(position) => (
  &lt;p&gt;Mouse is at {position.x}, {position.y}&lt;/p&gt;
)} /&gt;

// The component calls render(data) internally:
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // ... track mouse ...
  return <span class="text-yellow-300">render(position)</span>;  // Call the function!
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚔️ HOC vs Render Props vs Hooks</h3>
<div class="overflow-x-auto mb-6">
    <table class="w-full text-sm text-left">
        <thead class="bg-dark-700 text-light-200">
            <tr>
                <th class="p-3 rounded-tl-lg">Pattern</th>
                <th class="p-3">Pros</th>
                <th class="p-3 rounded-tr-lg">Cons</th>
            </tr>
        </thead>
        <tbody class="text-light-300">
            <tr class="border-b border-dark-600">
                <td class="p-3 font-bold">HOC</td>
                <td class="p-3 text-sm">Clean usage, props injection</td>
                <td class="p-3 text-sm text-red-300">Wrapper hell, naming collisions</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3 font-bold">Render Props</td>
                <td class="p-3 text-sm">Explicit data flow, flexible</td>
                <td class="p-3 text-sm text-red-300">Callback hell, harder to read</td>
            </tr>
            <tr>
                <td class="p-3 rounded-bl-lg font-bold text-green-400">Hooks ✓</td>
                <td class="p-3 text-sm text-green-300">Simple, composable, no wrappers</td>
                <td class="p-3 rounded-br-lg text-sm">Can't use in class components</td>
            </tr>
        </tbody>
    </table>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔄 Evolution: From HOC to Hooks</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-light-300">// ❌ OLD WAY: HOC Wrapper Hell
export default withRouter(
  withAuth(
    withTheme(
      withLogging(
        MyComponent
      )
    )
  )
);

// ✅ NEW WAY: Hooks Composition
function MyComponent() {
  const router = useRouter();
  const auth = useAuth();
  const theme = useTheme();
  const logger = useLogger();
  
  // Clean, readable, no wrappers!
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚠️ When HOCs Are Still Useful</h3>
<div class="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
    <ul class="text-yellow-200 text-sm space-y-1">
        <li>• <span class="font-bold">Class components</span> - can't use hooks</li>
        <li>• <span class="font-bold">Library APIs</span> - some libraries still use HOC pattern</li>
        <li>• <span class="font-bold">Static composition</span> - when you need to wrap at definition time</li>
    </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">Prefer Hooks for new code</span> - simpler and more flexible</li>
    <li><span class="text-yellow-400 font-bold">Understand HOCs for legacy code</span> - many older codebases use them</li>
    <li><span class="text-yellow-400 font-bold">HOC naming convention</span> - withXxx (withAuth, withRouter)</li>
    <li><span class="text-yellow-400 font-bold">Don't mix patterns</span> - pick one approach per feature</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║         🎯 HIGHER ORDER COMPONENTS (HOCs)                    ║
║     A function that takes a component and returns            ║
║              an enhanced component!                          ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   HOC PATTERN EXPLAINED:                                     ║
║   ══════════════════════                                     ║
║                                                              ║
║   const EnhancedComp = withFeature(OriginalComp)             ║
║                                                              ║
║   ┌─────────────────────┐                                    ║
║   │   withLogger(Comp)  │  ← HOC (Higher Order Component)    ║
║   └──────────┬──────────┘                                    ║
║              │                                               ║
║              ▼                                               ║
║   ┌─────────────────────┐                                    ║
║   │  function Wrapper() │  ← Returns NEW component           ║
║   │    useEffect(log)   │  ← Adds logging                    ║
║   │    return <Comp />  │  ← Renders original                ║
║   └─────────────────────┘                                    ║
║                                                              ║
║   COMMON HOC USE CASES:                                      ║
║   ═════════════════════                                      ║
║   • withAuth     → Add authentication check                  ║
║   • withLogger   → Add logging/analytics                     ║
║   • withTheme    → Inject theme props                        ║
║   • withLoading  → Add loading state                         ║
║                                                              ║
║   ⚠️ MODERN ALTERNATIVE: Custom Hooks are simpler!           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🏭 HOC: withLogger
// ═══════════════════════════════════════════════════════════════
// This HOC wraps ANY component and adds logging capability.
// It demonstrates the "decorator" pattern - adding features
// without modifying the original component.
// ═══════════════════════════════════════════════════════════════
function withLogger(WrappedComponent) {
  // Return a NEW component (the wrapper)
  return function LoggedComponent(props) {
    const [logs, setLogs] = React.useState([]);
    
    // Add logging on mount
    React.useEffect(() => {
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev, \`[\${timestamp}] Mounted: \${WrappedComponent.name || 'Component'}\`]);
    }, []);
    
    // Add logging on every render
    React.useEffect(() => {
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev, \`[\${timestamp}] Rendered with props: \${JSON.stringify(props)}\`]);
    });
    
    return (
      <div>
        {/* Render the original component with all its props */}
        <WrappedComponent {...props} />
        
        {/* Display logs (added by HOC) */}
        <div style={{
          marginTop: '10px',
          padding: '10px',
          background: '#0f172a',
          borderRadius: '8px',
          maxHeight: '100px',
          overflow: 'auto'
        }}>
          <p style={{ color: '#94a3b8', margin: '0 0 5px', fontSize: '12px' }}>
            📋 HOC Logger Output:
          </p>
          {logs.slice(-3).map((log, i) => (
            <div key={i} style={{ color: '#22c55e', fontFamily: 'monospace', fontSize: '11px' }}>
              {log}
            </div>
          ))}
        </div>
      </div>
    );
  };
}

// ═══════════════════════════════════════════════════════════════
// 📦 ORIGINAL COMPONENT
// ═══════════════════════════════════════════════════════════════
// This is a simple component with NO logging capability.
// We'll enhance it using our HOC!
// ═══════════════════════════════════════════════════════════════
function Greeting({ name, color }) {
  return (
    <div style={{
      padding: '15px',
      background: \`linear-gradient(135deg, \${color}22 0%, \${color}44 100%)\`,
      borderRadius: '8px',
      borderLeft: \`4px solid \${color}\`
    }}>
      <h2 style={{ margin: 0, color }}>Hello, {name}! 👋</h2>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🎯 ENHANCED COMPONENT (Original + HOC features)
// ═══════════════════════════════════════════════════════════════
// LoggedGreeting = Greeting + logging (from withLogger HOC)
// ═══════════════════════════════════════════════════════════════
const LoggedGreeting = withLogger(Greeting);

function App() {
  const [name, setName] = React.useState('React Developer');
  const [color, setColor] = React.useState('#3b82f6');
  
  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>🏭 HOC Pattern Demo</h3>
      
      {/* Using the HOC-enhanced component */}
      <LoggedGreeting name={name} color={color} />
      
      <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input 
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter name..."
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
        />
        <select 
          value={color} 
          onChange={e => setColor(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
        >
          <option value="#3b82f6">Blue</option>
          <option value="#22c55e">Green</option>
          <option value="#f59e0b">Orange</option>
          <option value="#ef4444">Red</option>
        </select>
      </div>
      
      <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
        💡 Change inputs and watch the HOC logger update!
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
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What are Portals and why you need them</li>
    <li>How to render modals, tooltips outside parent</li>
    <li>What are Error Boundaries</li>
    <li>How to catch and handle component crashes gracefully</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">🚪 Portals: Escape the DOM Hierarchy</h3>
<p class="mb-4 text-light-300">Normally, a child renders inside its parent's DOM node. But sometimes you need to break free:</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
    <p class="text-red-300 font-bold mb-2">❌ The Problem: CSS Inheritance & Overflow</p>
    <pre class="text-red-200 text-sm mt-2">&lt;div style={{ overflow: 'hidden' }}&gt;
  &lt;Modal /&gt;  {/* Modal gets clipped! Can't escape parent's overflow */}
&lt;/div&gt;

&lt;div style={{ zIndex: 1 }}&gt;
  &lt;Tooltip /&gt;  {/* z-index wars! Can't go above other elements */}
&lt;/div&gt;</pre>
</div>

<div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mb-6">
    <p class="text-green-300 font-bold mb-2">✅ The Solution: Portal</p>
    <pre class="text-green-200 text-sm mt-2">import { createPortal } from 'react-dom';

function Modal({ children }) {
  // Render directly into document.body, not parent!
  return <span class="text-yellow-300">createPortal</span>(
    &lt;div className="modal"&gt;{children}&lt;/div&gt;,
    <span class="text-yellow-300">document.body</span>  // Target DOM node
  );
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">📊 Portal Behavior</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
DOM Tree (Visual):              React Tree (Logical):
═══════════════════════         ═════════════════════════

document.body                   &lt;App&gt;
├── #root                         └── &lt;Parent&gt;
│   └── &lt;App&gt;                          └── &lt;Modal&gt;  ← Events still bubble up!
│       └── &lt;Parent&gt;                   
│                               
└── &lt;Modal /&gt; ← Portal renders here!

🎯 KEY INSIGHT: 
Events bubble through the REACT tree, not the DOM tree!
A click in the Modal still bubbles to Parent in React.
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔧 Common Portal Use Cases</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">🗔 Modals/Dialogs</p>
        <p class="text-light-300 text-sm">Render above everything</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">💬 Tooltips</p>
        <p class="text-light-300 text-sm">Escape overflow: hidden</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">📋 Dropdown menus</p>
        <p class="text-light-300 text-sm">Position anywhere on screen</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">🔔 Notifications</p>
        <p class="text-light-300 text-sm">Toast messages at screen edge</p>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">🛡️ Error Boundaries: Catch Component Crashes</h3>
<p class="mb-4 text-light-300">Without Error Boundaries, one component crash = entire app white screen!</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Without Error Boundary:         With Error Boundary:
════════════════════════        ═══════════════════════════

&lt;App&gt;                           &lt;App&gt;
  └── &lt;Dashboard&gt;                 └── &lt;Dashboard&gt;
        └── &lt;Widget&gt; 💥 ERROR           └── &lt;ErrorBoundary&gt;
                                              └── &lt;Widget&gt; 💥 ERROR
        ↓                                     ↓
┌─────────────────────┐         ┌─────────────────────────┐
│                     │         │   Widget crashed!       │
│   WHITE SCREEN      │         │   [Retry] [Report Bug]  │
│   💀 App is dead    │         │                         │
│                     │         │   Rest of app works! ✅ │
└─────────────────────┘         └─────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚙️ Error Boundary Implementation</h3>
<div class="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
    <p class="text-yellow-300 font-bold mb-2">⚠️ Error Boundaries MUST be class components!</p>
    <p class="text-yellow-200 text-sm">There's no hook equivalent for getDerivedStateFromError or componentDidCatch (yet).</p>
</div>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  // Called when child throws - update state to show fallback
  static <span class="text-yellow-300">getDerivedStateFromError</span>(error) {
    return { hasError: true, error };
  }
  
  // Called after error - log to error service
  <span class="text-yellow-300">componentDidCatch</span>(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return &lt;FallbackUI error={this.state.error} /&gt;;
    }
    return this.props.children;
  }
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🚫 What Error Boundaries DON'T Catch</h3>
<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
    <ul class="text-red-200 text-sm space-y-1">
        <li>• <span class="font-bold">Event handlers</span> - use try/catch inside handlers</li>
        <li>• <span class="font-bold">Async code</span> - setTimeout, Promises need their own handling</li>
        <li>• <span class="font-bold">Server-side rendering</span> - only works on client</li>
        <li>• <span class="font-bold">Errors in the boundary itself</span> - boundaries can't catch their own errors</li>
    </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">Portal target should exist</span> - create a div in index.html for modals</li>
    <li><span class="text-yellow-400 font-bold">Multiple error boundaries</span> - wrap different sections independently</li>
    <li><span class="text-yellow-400 font-bold">Error boundaries for routes</span> - each page can have its own boundary</li>
    <li><span class="text-yellow-400 font-bold">Libraries like react-error-boundary</span> - adds hooks and more features</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║          🎯 ERROR BOUNDARIES - Graceful Crash Handling       ║
║      Catch JavaScript errors anywhere in child component     ║
║                tree and display a fallback UI!               ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   WITHOUT ERROR BOUNDARY:                                    ║
║   ══════════════════════                                     ║
║                                                              ║
║   Component throws error → Entire app crashes → White screen ║
║                                                              ║
║   WITH ERROR BOUNDARY:                                       ║
║   ════════════════════                                       ║
║                                                              ║
║   Component throws error → Boundary catches → Fallback UI    ║
║                                                              ║
║   LIFECYCLE METHODS:                                         ║
║   ══════════════════                                         ║
║                                                              ║
║   static getDerivedStateFromError(error)                     ║
║     → Called during "render" phase                           ║
║     → Returns new state to trigger fallback UI               ║
║                                                              ║
║   componentDidCatch(error, errorInfo)                        ║
║     → Called during "commit" phase                           ║
║     → Perfect for logging errors to a service                ║
║                                                              ║
║   ⚠️ NOTE: Error Boundaries MUST be class components!        ║
║            (There's no hook equivalent yet)                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🛡️ ERROR BOUNDARY (Class Component - Required!)
// ═══════════════════════════════════════════════════════════════
// Error Boundaries MUST be class components because they need:
//   - getDerivedStateFromError (no hook equivalent)
//   - componentDidCatch (no hook equivalent)
//
// Wrap risky components in an ErrorBoundary to prevent crashes!
// ═══════════════════════════════════════════════════════════════
class ErrorBoundary extends React.Component {
  // State to track if an error occurred
  state = { hasError: false, error: null, errorInfo: null };
  
  // Called when a child throws an error
  // Returns object to update state (triggers re-render with fallback)
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  // Called after error is caught - perfect for logging!
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    // In production: Send to error tracking service
    // logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      // 🎨 FALLBACK UI - Show this instead of white screen
      return (
        <div style={{ 
          padding: '20px', 
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          border: '2px solid #ef4444',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>💥</div>
          <h3 style={{ color: '#dc2626', margin: '0 0 10px' }}>Oops! Something Crashed</h3>
          <p style={{ color: '#7f1d1d', margin: '0 0 15px' }}>
            {this.state.error?.message || 'Unknown error'}
          </p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '10px 20px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            🔄 Try Again
          </button>
        </div>
      );
    }
    
    // No error - render children normally
    return this.props.children;
  }
}

// ═══════════════════════════════════════════════════════════════
// 💣 BUGGY COMPONENT (Will crash on purpose!)
// ═══════════════════════════════════════════════════════════════
function BuggyComponent({ shouldCrash }) {
  // This simulates a runtime error (like undefined.map())
  if (shouldCrash) {
    throw new Error('Component crashed! (Simulated error)');
  }
  
  return (
    <div style={{
      padding: '20px',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      border: '2px solid #22c55e',
      borderRadius: '12px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>
      <p style={{ color: '#166534', margin: 0, fontWeight: 'bold' }}>
        Component is working perfectly!
      </p>
    </div>
  );
}

function App() {
  const [crash, setCrash] = React.useState(false);
  
  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>🛡️ Error Boundary Demo</h3>
      
      {/* Wrap potentially buggy components */}
      <ErrorBoundary>
        <BuggyComponent shouldCrash={crash} />
      </ErrorBoundary>
      
      <div style={{ marginTop: '15px' }}>
        <button 
          onClick={() => setCrash(true)}
          style={{
            padding: '12px 24px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          💥 Trigger Error
        </button>
      </div>
      
      <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
        💡 Click the button - the boundary catches the crash!
      </p>
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
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What is Suspense and how it works</li>
    <li>Declarative loading states vs imperative</li>
    <li>Code splitting with React.lazy()</li>
    <li>Introduction to Concurrent Features</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📚 The Problem: Imperative Loading States</h3>
<p class="mb-4 text-light-300">Traditional approach requires manually tracking loading state:</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
<pre class="text-red-200 text-sm">// ❌ OLD WAY: Manual loading state everywhere
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Extra state
  const [error, setError] = useState(null);      // More state
  
  useEffect(() => {
    setLoading(true);               // Set loading
    fetchUser()
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));  // Clear loading
  }, []);
  
  if (loading) return &lt;Spinner /&gt;;   // Handle loading
  if (error) return &lt;Error /&gt;;        // Handle error
  return &lt;Profile user={user} /&gt;;     // Finally render!
}</pre>
    <p class="text-red-300 text-sm mt-2">❌ Every component has the same boilerplate!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">✅ The Solution: Suspense</h3>
<p class="mb-4 text-light-300">Suspense lets you declaratively specify loading UI:</p>

<div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mb-6">
<pre class="text-green-200 text-sm">// ✅ NEW WAY: Declarative with Suspense
&lt;<span class="text-yellow-300">Suspense</span> fallback={&lt;Spinner /&gt;}&gt;
  &lt;UserProfile /&gt;   {/* Just renders! No loading state needed */}
&lt;/Suspense&gt;

// The component "suspends" until data is ready
// React automatically shows the fallback while waiting</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔧 How Suspense Works</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
1. Component "suspends" (throws a Promise)
2. React catches the Promise
3. React shows the fallback UI
4. When Promise resolves, React retries render
5. Component renders with data!

Timeline:
═════════════════════════════════════════════════════════

[User clicks]
     │
     ▼
┌─────────────────────┐
│ Component suspends  │ ← Throws Promise
│ (data not ready)    │
└─────────────────────┘
     │
     ▼
┌─────────────────────┐
│ Suspense shows      │ ← &lt;Spinner /&gt;
│ fallback            │
└─────────────────────┘
     │
     ▼ (Promise resolves)
┌─────────────────────┐
│ Component renders   │ ← With data! 🎉
│ with data           │
└─────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">📦 Code Splitting with React.lazy()</h3>
<p class="mb-4 text-light-300">Split your bundle and load components on demand:</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">// ❌ Regular import: Component in main bundle
import HeavyComponent from './HeavyComponent';

// ✅ Lazy import: Separate chunk, loaded on demand
const HeavyComponent = <span class="text-yellow-300">React.lazy</span>(() => import('./HeavyComponent'));

// Must wrap in Suspense!
function App() {
  return (
    &lt;Suspense fallback={&lt;Loading /&gt;}&gt;
      &lt;HeavyComponent /&gt;  {/* Loaded only when rendered */}
    &lt;/Suspense&gt;
  );
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ Concurrent Features (React 18+)</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">useTransition</p>
        <p class="text-light-300 text-sm">Mark updates as non-urgent, keep UI responsive</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">useDeferredValue</p>
        <p class="text-light-300 text-sm">Defer updating a value until urgent work is done</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">Streaming SSR</p>
        <p class="text-light-300 text-sm">Stream HTML as components become ready</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">Selective Hydration</p>
        <p class="text-light-300 text-sm">Hydrate important parts first</p>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">📊 Suspense Compatible Libraries</h3>
<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
    <p class="text-blue-200 mb-2">⚠️ Suspense for data fetching requires special libraries:</p>
    <ul class="text-blue-200 text-sm space-y-1">
        <li>• <span class="font-bold">React Query / TanStack Query</span> - Suspense mode</li>
        <li>• <span class="font-bold">SWR</span> - Vercel's data fetching library</li>
        <li>• <span class="font-bold">Relay</span> - GraphQL client by Meta</li>
        <li>• <span class="font-bold">Next.js</span> - Built-in Suspense support</li>
    </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">React.lazy() only for default exports</span> - wrap named exports</li>
    <li><span class="text-yellow-400 font-bold">Place Suspense boundaries strategically</span> - not too high, not too low</li>
    <li><span class="text-yellow-400 font-bold">Multiple Suspense boundaries</span> - different sections load independently</li>
    <li><span class="text-yellow-400 font-bold">Nested Suspense</span> - inner boundary catches first, outer is backup</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║            🎯 SUSPENSE - Declarative Loading States          ║
║       Tell React to "pause" rendering while data loads       ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   BEFORE SUSPENSE (Imperative):                              ║
║   ═════════════════════════════                              ║
║                                                              ║
║   if (isLoading) return <Spinner />;                         ║
║   if (error) return <Error />;                               ║
║   return <Content data={data} />;                            ║
║                                                              ║
║   WITH SUSPENSE (Declarative):                               ║
║   ════════════════════════════                               ║
║                                                              ║
║   <Suspense fallback={<Spinner />}>                          ║
║     <Content />  ← Just renders! React handles the rest      ║
║   </Suspense>                                                ║
║                                                              ║
║   HOW IT WORKS:                                              ║
║   ══════════════                                             ║
║                                                              ║
║   1. Component "suspends" (throws a Promise)                 ║
║   2. React catches it, shows fallback                        ║
║   3. When Promise resolves, React retries render             ║
║   4. Now data is ready, component renders!                   ║
║                                                              ║
║   USE CASES:                                                 ║
║   ══════════                                                 ║
║   • React.lazy() for code splitting                          ║
║   • Data fetching with supporting libraries                  ║
║   • Image loading                                            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🎲 SIMULATED LAZY COMPONENT
// ═══════════════════════════════════════════════════════════════
// In real apps, use: const LazyComp = React.lazy(() => import('./Comp'))
// This demo simulates the loading behavior
// ═══════════════════════════════════════════════════════════════
function HeavyComponent() {
  return (
    <div style={{
      padding: '20px',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      borderRadius: '12px',
      border: '2px solid #22c55e'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '10px' }}>✨</div>
      <h3 style={{ color: '#166534', margin: 0 }}>Content Loaded!</h3>
      <p style={{ color: '#15803d', margin: '10px 0 0' }}>
        This component could be a heavy chart, large list, or fetched data.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🎨 LOADING FALLBACK COMPONENT
// ═══════════════════════════════════════════════════════════════
// This is shown while the main content is loading
// Make it visually appealing - users see this while waiting!
// ═══════════════════════════════════════════════════════════════
function LoadingFallback() {
  return (
    <div style={{
      padding: '40px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      borderRadius: '12px',
      border: '2px dashed #94a3b8',
      textAlign: 'center'
    }}>
      <div style={{ 
        fontSize: '32px', 
        animation: 'spin 1s linear infinite',
        display: 'inline-block'
      }}>
        ⏳
      </div>
      <p style={{ color: '#64748b', margin: '10px 0 0' }}>
        Loading content...
      </p>
    </div>
  );
}

function App() {
  const [showContent, setShowContent] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Simulate async loading
  const loadContent = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowContent(true);
      setIsLoading(false);
    }, 1500); // Simulate 1.5s load time
  };
  
  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>⏳ Suspense Demo</h3>
      
      {/* Content area with loading state */}
      <div style={{ marginBottom: '15px' }}>
        {isLoading ? (
          <LoadingFallback />
        ) : showContent ? (
          <HeavyComponent />
        ) : (
          <div style={{
            padding: '40px',
            background: '#f8fafc',
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #e2e8f0'
          }}>
            <p style={{ color: '#64748b', margin: 0 }}>
              Click the button to load content
            </p>
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={loadContent}
          disabled={isLoading || showContent}
          style={{
            padding: '12px 24px',
            background: isLoading || showContent ? '#94a3b8' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading || showContent ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isLoading ? '⏳ Loading...' : '📦 Load Content'}
        </button>
        
        {showContent && (
          <button 
            onClick={() => setShowContent(false)}
            style={{
              padding: '12px 24px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            🔄 Reset
          </button>
        )}
      </div>
      
      <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
        💡 In real apps, use React.lazy() and Suspense for code splitting!
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
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What is the Compound Component pattern</li>
    <li>How parent and children share state implicitly</li>
    <li>Building flexible, declarative APIs</li>
    <li>Real-world examples (Tabs, Accordion, Select)</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📚 The Problem: Inflexible Component APIs</h3>
<p class="mb-4 text-light-300">Config-based components are hard to customize:</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
<pre class="text-red-200 text-sm">// ❌ Configuration Prop Approach
&lt;Select 
  options={[
    { value: 'a', label: 'Option A', icon: '🍎', disabled: false },
    { value: 'b', label: 'Option B', icon: '🍊', disabled: true },
  ]}
  renderOption={(opt) => ...}  // Need custom renderer
  optionClassName="..."        // What if I need different styles per option?
/&gt;

// Problems:
// • Hard to add custom behavior to individual items
// • Complex prop types to maintain
// • Every customization = another prop</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">✅ The Solution: Compound Components</h3>
<p class="mb-4 text-light-300">Let users compose UI naturally, like HTML's &lt;select&gt; and &lt;option&gt;:</p>

<div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mb-6">
<pre class="text-green-200 text-sm">// ✅ Compound Component Approach (Like HTML!)
&lt;Select&gt;
  &lt;Select.Option value="a"&gt;🍎 Option A&lt;/Select.Option&gt;
  &lt;Select.Option value="b" disabled&gt;🍊 Option B&lt;/Select.Option&gt;
  &lt;Select.Divider /&gt;
  &lt;Select.Option value="c" className="special"&gt;
    &lt;CustomIcon /&gt; Option C with anything!
  &lt;/Select.Option&gt;
&lt;/Select&gt;

// Benefits:
// • Full control over each item
// • Natural JSX composition
// • Easy to add custom elements</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔧 How It Works: Implicit State Sharing</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Parent Component (Tabs)              Child Components (Tab, Panel)
════════════════════════             ════════════════════════════

┌──────────────────────────┐         
│  const TabsContext =     │         
│    createContext();      │         
│                          │         
│  function Tabs() {       │         
│    const [active, set]   │   ───────► Child reads from context:
│      = useState(0);      │         │
│                          │         │  function Tab({ id }) {
│    return (              │         │    const { active, setActive }
│      &lt;TabsContext.Provider│         │      = useContext(TabsContext);
│        value={{          │         │    return (
│          active,         │         │      &lt;button
│          setActive       │         │        onClick={() => setActive(id)}
│        }}                │         │        className={active === id ? ... }
│      &gt;                   │         │      &gt;
│        {children}        │         │    );
│      &lt;/TabsContext.Provider&gt;│      │  }
│    );                    │         │
│  }                       │         │
└──────────────────────────┘         
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">📊 Real-World Compound Components</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">Tabs</p>
        <p class="text-light-300 text-sm font-mono">&lt;Tabs&gt;&lt;Tabs.Tab&gt;&lt;Tabs.Panel&gt;</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">Accordion</p>
        <p class="text-light-300 text-sm font-mono">&lt;Accordion&gt;&lt;Accordion.Item&gt;</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">Menu</p>
        <p class="text-light-300 text-sm font-mono">&lt;Menu&gt;&lt;Menu.Item&gt;&lt;Menu.Divider&gt;</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">Form</p>
        <p class="text-light-300 text-sm font-mono">&lt;Form&gt;&lt;Form.Field&gt;&lt;Form.Error&gt;</p>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Two Implementation Approaches</h3>
<div class="overflow-x-auto mb-6">
    <table class="w-full text-sm text-left">
        <thead class="bg-dark-700 text-light-200">
            <tr>
                <th class="p-3 rounded-tl-lg">Approach</th>
                <th class="p-3">How</th>
                <th class="p-3 rounded-tr-lg">Best For</th>
            </tr>
        </thead>
        <tbody class="text-light-300">
            <tr class="border-b border-dark-600">
                <td class="p-3 font-bold">Static Properties</td>
                <td class="p-3 font-mono text-xs">Tabs.Tab = TabComponent</td>
                <td class="p-3 text-sm">Simple grouping</td>
            </tr>
            <tr>
                <td class="p-3 rounded-bl-lg font-bold">Context</td>
                <td class="p-3 font-mono text-xs">useContext(TabsContext)</td>
                <td class="p-3 rounded-br-lg text-sm">Shared state between children</td>
            </tr>
        </tbody>
    </table>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚠️ Common Pitfalls</h3>
<div class="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
    <ul class="text-yellow-200 text-sm space-y-1">
        <li>• <span class="font-bold">Context value stability</span> - memoize to prevent re-renders</li>
        <li>• <span class="font-bold">Missing Provider</span> - handle gracefully when used outside</li>
        <li>• <span class="font-bold">Deeply nested children</span> - context only works for descendants</li>
    </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">Throw helpful errors</span> if child used outside parent</li>
    <li><span class="text-yellow-400 font-bold">Export a custom hook</span> - useTabs() instead of useContext(TabsContext)</li>
    <li><span class="text-yellow-400 font-bold">TypeScript</span> - children can be typed for better DX</li>
    <li><span class="text-yellow-400 font-bold">Libraries like Radix UI</span> - use this pattern extensively</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║         🎯 COMPOUND COMPONENTS - Flexible UI Patterns        ║
║      Components that work together to form a complete UI     ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   THE PROBLEM:                                               ║
║   ════════════                                               ║
║                                                              ║
║   // Giant config object - hard to customize                 ║
║   <Tabs tabs={[                                              ║
║     { id: 'a', label: 'Tab A', content: '...' },             ║
║     { id: 'b', label: 'Tab B', content: '...' }              ║
║   ]} />                                                      ║
║                                                              ║
║   THE SOLUTION - Compound Components:                        ║
║   ════════════════════════════════════                       ║
║                                                              ║
║   // Like HTML <select> + <option> - natural & flexible!     ║
║   <Tabs>                                                     ║
║     <Tabs.Tab>Tab A</Tabs.Tab>                               ║
║     <Tabs.Tab>Tab B</Tabs.Tab>                               ║
║     <Tabs.Panel>Content A</Tabs.Panel>                       ║
║     <Tabs.Panel>Content B</Tabs.Panel>                       ║
║   </Tabs>                                                    ║
║                                                              ║
║   HOW IT WORKS:                                              ║
║   ══════════════                                             ║
║                                                              ║
║   1. Parent creates Context to share state                   ║
║   2. Child components consume Context                        ║
║   3. Children are attached as static properties (Tabs.Tab)   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 📦 STEP 1: CREATE CONTEXT
// ═══════════════════════════════════════════════════════════════
// Context allows parent and children to communicate
// without passing props through every level
// ═══════════════════════════════════════════════════════════════
const TabsContext = React.createContext();

// ═══════════════════════════════════════════════════════════════
// 🏠 PARENT COMPONENT: Tabs
// ═══════════════════════════════════════════════════════════════
// - Holds the shared state (activeTab)
// - Provides context to all children
// - Children can be placed anywhere inside!
// ═══════════════════════════════════════════════════════════════
function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = React.useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div style={{
        background: '#f8fafc',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
      }}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🔘 CHILD COMPONENT: Tabs.Tab
// ═══════════════════════════════════════════════════════════════
// - Reads activeTab from context
// - Calls setActiveTab when clicked
// - Attached as static property: Tabs.Tab
// ═══════════════════════════════════════════════════════════════
Tabs.Tab = function Tab({ id, children, icon }) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === id;
  
  return (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        padding: '12px 20px',
        background: isActive ? '#3b82f6' : 'transparent',
        color: isActive ? 'white' : '#64748b',
        border: 'none',
        borderBottom: isActive ? '3px solid #1d4ed8' : '3px solid transparent',
        cursor: 'pointer',
        fontWeight: isActive ? 'bold' : 'normal',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

// ═══════════════════════════════════════════════════════════════
// 📄 CHILD COMPONENT: Tabs.Panel
// ═══════════════════════════════════════════════════════════════
// - Only renders if its id matches activeTab
// - Content is completely flexible!
// ═══════════════════════════════════════════════════════════════
Tabs.Panel = function Panel({ id, children }) {
  const { activeTab } = React.useContext(TabsContext);
  
  // Don't render if not active
  if (activeTab !== id) return null;
  
  return (
    <div style={{ 
      padding: '20px',
      background: 'white',
      animation: 'fadeIn 0.3s ease'
    }}>
      {children}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 🎯 USAGE EXAMPLE
// ═══════════════════════════════════════════════════════════════
function App() {
  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>🧩 Compound Components Demo</h3>
      
      <Tabs defaultTab="home">
        {/* Tab List */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid #e2e8f0',
          background: '#f1f5f9'
        }}>
          <Tabs.Tab id="home" icon="🏠">Home</Tabs.Tab>
          <Tabs.Tab id="profile" icon="👤">Profile</Tabs.Tab>
          <Tabs.Tab id="settings" icon="⚙️">Settings</Tabs.Tab>
        </div>
        
        {/* Panels - can have ANY content! */}
        <Tabs.Panel id="home">
          <h4 style={{ margin: '0 0 10px', color: '#1e293b' }}>Welcome Home! 🎉</h4>
          <p style={{ color: '#64748b', margin: 0 }}>
            This is the home panel with custom content.
          </p>
        </Tabs.Panel>
        
        <Tabs.Panel id="profile">
          <h4 style={{ margin: '0 0 10px', color: '#1e293b' }}>Your Profile 👤</h4>
          <p style={{ color: '#64748b', margin: 0 }}>
            Edit your profile settings here.
          </p>
        </Tabs.Panel>
        
        <Tabs.Panel id="settings">
          <h4 style={{ margin: '0 0 10px', color: '#1e293b' }}>Settings ⚙️</h4>
          <p style={{ color: '#64748b', margin: 0 }}>
            Configure your preferences.
          </p>
        </Tabs.Panel>
      </Tabs>
      
      <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
        💡 Click tabs - components communicate via Context!
      </p>
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
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Why large lists kill performance</li>
    <li>What is virtualization (windowing)</li>
    <li>How to use React DevTools Profiler</li>
    <li>Common performance optimization strategies</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📚 The Problem: Too Many DOM Nodes</h3>
<p class="mb-4 text-light-300">Rendering thousands of elements destroys performance:</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
<pre class="text-red-200 text-sm">// ❌ Rendering 10,000 items directly
function ProductList({ products }) {
  return (
    &lt;div&gt;
      {products.map(product => (
        &lt;ProductCard key={product.id} product={product} /&gt;
      ))}
    &lt;/div&gt;
  );
}

// Problems:
// • 10,000 DOM nodes created at once
// • Browser freezes during initial render
// • Scrolling is janky
// • Memory usage skyrockets</pre>
    <p class="text-red-300 text-sm mt-2">❌ Each DOM node costs memory and painting time!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">✅ The Solution: Virtualization (Windowing)</h3>
<p class="mb-4 text-light-300">Only render items that are visible in the viewport:</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
REGULAR LIST (10,000 items):        VIRTUALIZED LIST:
════════════════════════════        ══════════════════════════

&lt;ul&gt;                                &lt;ul style={{ height: '300px' }}&gt;
  &lt;li&gt;Item 1&lt;/li&gt;    ← In DOM          {/* Spacer for items above */}
  &lt;li&gt;Item 2&lt;/li&gt;    ← In DOM          &lt;div style={{height: '1500px'}} /&gt;
  &lt;li&gt;Item 3&lt;/li&gt;    ← In DOM          
  ... 9,994 more ...  ← ALL IN DOM!     &lt;li&gt;Item 51&lt;/li&gt;   ← Only visible
  &lt;li&gt;Item 9998&lt;/li&gt; ← In DOM          &lt;li&gt;Item 52&lt;/li&gt;   ← Only visible
  &lt;li&gt;Item 9999&lt;/li&gt; ← In DOM          &lt;li&gt;Item 53&lt;/li&gt;   ← Only visible
  &lt;li&gt;Item 10000&lt;/li&gt;← In DOM          ... 7 more ...
&lt;/ul&gt;                                   
                                        {/* Spacer for items below */}
Total DOM nodes: 10,000 🐌             &lt;div style={{height: '9700px'}} /&gt;
                                      &lt;/ul&gt;
                                      
                                      Total DOM nodes: ~15 🚀
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔧 Virtualization Libraries</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">react-window</p>
        <p class="text-light-300 text-sm">Lightweight, most popular choice</p>
        <p class="text-light-400 text-xs mt-1">~6KB gzipped</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">react-virtualized</p>
        <p class="text-light-300 text-sm">Feature-rich, more complex</p>
        <p class="text-light-400 text-xs mt-1">~35KB gzipped</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">@tanstack/react-virtual</p>
        <p class="text-light-300 text-sm">Headless, framework agnostic</p>
        <p class="text-light-400 text-xs mt-1">~3KB gzipped</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-xl">
        <p class="text-brand-primary font-bold mb-2">react-virtuoso</p>
        <p class="text-light-300 text-sm">Auto height, grouped items</p>
        <p class="text-light-400 text-xs mt-1">~15KB gzipped</p>
    </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔍 React DevTools Profiler</h3>
<p class="mb-4 text-light-300">Find performance bottlenecks without guessing:</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">How to use:
1. Open React DevTools → "Profiler" tab
2. Click "Record" 🔴
3. Interact with your app
4. Click "Stop" ⬛
5. Analyze the flamegraph!

What to look for:
───────────────────────────────
<span class="text-yellow-300">• Long bars</span> = slow components (optimize these!)
<span class="text-yellow-300">• Many re-renders</span> = missing memoization
<span class="text-yellow-300">• "Why did this render?"</span> = enable in settings
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">📊 Performance Optimization Checklist</h3>
<div class="overflow-x-auto mb-6">
    <table class="w-full text-sm text-left">
        <thead class="bg-dark-700 text-light-200">
            <tr>
                <th class="p-3 rounded-tl-lg">Issue</th>
                <th class="p-3">Solution</th>
                <th class="p-3 rounded-tr-lg">Hook/Tool</th>
            </tr>
        </thead>
        <tbody class="text-light-300">
            <tr class="border-b border-dark-600">
                <td class="p-3">Too many items</td>
                <td class="p-3">Virtualization</td>
                <td class="p-3 font-mono text-xs">react-window</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">Expensive calculation</td>
                <td class="p-3">Memoize result</td>
                <td class="p-3 font-mono text-xs">useMemo</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">Child re-renders</td>
                <td class="p-3">Stable references</td>
                <td class="p-3 font-mono text-xs">useCallback, React.memo</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">Large bundle</td>
                <td class="p-3">Code splitting</td>
                <td class="p-3 font-mono text-xs">React.lazy, dynamic import</td>
            </tr>
            <tr>
                <td class="p-3 rounded-bl-lg">Slow images</td>
                <td class="p-3">Lazy loading</td>
                <td class="p-3 rounded-br-lg font-mono text-xs">loading="lazy"</td>
            </tr>
        </tbody>
    </table>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚠️ Don't Optimize Prematurely!</h3>
<div class="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
    <p class="text-yellow-300 font-bold mb-2">🎯 Optimization workflow:</p>
    <ol class="text-yellow-200 text-sm space-y-1 list-decimal list-inside">
        <li>Notice a performance problem (sluggish UI)</li>
        <li>Profile to find the actual bottleneck</li>
        <li>Apply targeted optimization</li>
        <li>Measure improvement</li>
    </ol>
    <p class="text-yellow-300 mt-2 text-sm">Never add useMemo/useCallback "just in case"!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">Virtualize lists over ~100 items</span></li>
    <li><span class="text-yellow-400 font-bold">Use Profiler in production mode</span> - dev mode is slower</li>
    <li><span class="text-yellow-400 font-bold">Check "Highlight updates"</span> in DevTools to see re-renders</li>
    <li><span class="text-yellow-400 font-bold">Consider pagination</span> as an alternative to virtualization</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║         🎯 VIRTUALIZATION - Render 100,000 items at 60fps    ║
║            Only render what's visible on screen!             ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   THE PROBLEM:                                               ║
║   ════════════                                               ║
║                                                              ║
║   10,000 items = 10,000 DOM nodes = 🐌 SLOW                  ║
║                                                              ║
║   THE SOLUTION - WINDOWING:                                  ║
║   ══════════════════════════                                 ║
║                                                              ║
║   ┌─────────────────────────────────┐                        ║
║   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ ← Items above viewport ║
║   │ ░░░░░ (not rendered) ░░░░░░░░░░ │   (just empty space)   ║
║   ├─────────────────────────────────┤                        ║
║   │ Item 50                         │ ← VISIBLE WINDOW       ║
║   │ Item 51                         │   (only these render!) ║
║   │ Item 52                         │                        ║
║   │ Item 53                         │   ~15 DOM nodes        ║
║   │ Item 54                         │   instead of 10,000!   ║
║   ├─────────────────────────────────┤                        ║
║   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ ← Items below viewport ║
║   │ ░░░░░ (not rendered) ░░░░░░░░░░ │   (just empty space)   ║
║   └─────────────────────────────────┘                        ║
║                                                              ║
║   POPULAR LIBRARIES:                                         ║
║   ══════════════════                                         ║
║   • react-window (lightweight)                               ║
║   • react-virtualized (feature-rich)                         ║
║   • @tanstack/react-virtual                                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function App() {
  // ═══════════════════════════════════════════════════════════
  // 📦 GENERATE 10,000 ITEMS
  // ═══════════════════════════════════════════════════════════
  // Using lazy initialization to avoid creating array on every render
  // ═══════════════════════════════════════════════════════════
  const [items] = React.useState(() => 
    Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      name: 'User ' + (i + 1),
      email: 'user' + (i + 1) + '@example.com'
    }))
  );
  
  // Track which items are visible based on scroll position
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 12 });
  const [renderCount, setRenderCount] = React.useState(0);
  
  const ITEM_HEIGHT = 50; // Fixed height per item
  const CONTAINER_HEIGHT = 300;
  
  // ═══════════════════════════════════════════════════════════
  // 🎯 CALCULATE VISIBLE RANGE ON SCROLL
  // ═══════════════════════════════════════════════════════════
  // Only update state when we need to show different items
  // ═══════════════════════════════════════════════════════════
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const start = Math.floor(scrollTop / ITEM_HEIGHT);
    const end = start + Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT) + 2; // +2 for buffer
    
    setVisibleRange(prev => {
      if (prev.start !== start || prev.end !== end) {
        setRenderCount(c => c + 1);
        return { start, end };
      }
      return prev;
    });
  };
  
  // Only slice the visible items
  const visibleItems = items.slice(visibleRange.start, visibleRange.end);
  
  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>🚀 Virtualization Demo</h3>
      
      {/* Stats panel */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '15px',
        flexWrap: 'wrap'
      }}>
        <div style={{ background: '#f0fdf4', padding: '10px 15px', borderRadius: '8px', border: '1px solid #22c55e' }}>
          <span style={{ color: '#166534', fontWeight: 'bold' }}>Total Items: </span>
          <span style={{ color: '#15803d' }}>{items.length.toLocaleString()}</span>
        </div>
        <div style={{ background: '#eff6ff', padding: '10px 15px', borderRadius: '8px', border: '1px solid #3b82f6' }}>
          <span style={{ color: '#1e40af', fontWeight: 'bold' }}>DOM Nodes: </span>
          <span style={{ color: '#2563eb' }}>~{visibleItems.length}</span>
        </div>
        <div style={{ background: '#fef3c7', padding: '10px 15px', borderRadius: '8px', border: '1px solid #f59e0b' }}>
          <span style={{ color: '#92400e', fontWeight: 'bold' }}>Scroll Events: </span>
          <span style={{ color: '#d97706' }}>{renderCount}</span>
        </div>
      </div>
      
      {/* Virtualized list */}
      <div 
        onScroll={handleScroll}
        style={{ 
          height: CONTAINER_HEIGHT, 
          overflow: 'auto', 
          border: '2px solid #e2e8f0',
          borderRadius: '12px',
          position: 'relative',
          background: '#f8fafc'
        }}
      >
        {/* Spacer div to maintain scroll height */}
        <div style={{ height: items.length * ITEM_HEIGHT, position: 'relative' }}>
          {visibleItems.map((item, i) => (
            <div 
              key={item.id}
              style={{
                position: 'absolute',
                top: (visibleRange.start + i) * ITEM_HEIGHT,
                height: ITEM_HEIGHT,
                width: '100%',
                boxSizing: 'border-box',
                padding: '10px 15px',
                borderBottom: '1px solid #e2e8f0',
                background: (visibleRange.start + i) % 2 === 0 ? 'white' : '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '12px'
              }}>
                {item.id}
              </div>
              <div>
                <div style={{ fontWeight: '500', color: '#1e293b' }}>{item.name}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{item.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
        💡 Scroll through 10,000 items smoothly - only ~{visibleItems.length} are actually rendered!
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
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What are React Server Components (RSC)</li>
    <li>The difference between Server and Client Components</li>
    <li>The "use client" directive</li>
    <li>When to use each type of component</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📚 The Problem: JavaScript Bloat</h3>
<p class="mb-4 text-light-300">Traditional React apps send ALL component JS to the browser:</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
<pre class="text-red-200 text-sm">// ❌ TRADITIONAL CLIENT COMPONENTS
// Every component = More JS to download

function BlogPost({ id }) {
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    fetch('/api/posts/' + id)    // 1. Browser loads page
      .then(r => r.json())       // 2. JS downloads
      .then(setPost);            // 3. JS fetches data
  }, [id]);                      // 4. Finally renders!
  
  return &lt;article&gt;{post?.content}&lt;/article&gt;;
}

// Problems:
// • User waits for JS to download
// • Then waits for API request
// • Component code shipped even if it never changes
// • Large bundle sizes</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">✅ The Solution: Server Components</h3>
<p class="mb-4 text-light-300">Components that run on the server and send ONLY HTML to the client:</p>

<div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mb-6">
<pre class="text-green-200 text-sm">// ✅ SERVER COMPONENT (Default in Next.js App Router)
// Zero JavaScript sent to client!

async function BlogPost({ id }) {
  // Direct database access - no API needed!
  const post = await db.post.findUnique({ where: { id } });
  
  return &lt;article&gt;{post.content}&lt;/article&gt;;
}

// Benefits:
// • No JS bundle for this component
// • Data fetched on server (fast!)
// • SEO friendly (HTML sent immediately)
// • Can access backend resources directly</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🌊 The Waterline: Server vs Client</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
┌─────────────────────────────────────────────────────────┐
│                    🖥️ SERVER                           │
│  ───────────────────────────────────────────────────   │
│                                                         │
│   // Server Components (Default)                        │
│   • Run on server only                                 │
│   • Can be async                                       │
│   • Can access DB, file system, env secrets            │
│   • Send 0 KB JavaScript                               │
│   • ❌ No useState, useEffect, onClick                  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│            ↑ "use client" ↑  (The Waterline)           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    💻 CLIENT                           │
│  ───────────────────────────────────────────────────   │
│                                                         │
│   // Client Components ("use client")                   │
│   • Run on both server (SSR) and client                │
│   • JavaScript sent to browser                         │
│   • Can use hooks: useState, useEffect                 │
│   • Can have onClick, onChange, etc.                   │
│   • ❌ Cannot be async, no direct DB access             │
│                                                         │
└─────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">📜 The "use client" Directive</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300"><span class="text-yellow-300">"use client"</span>  // This MUST be the first line!

import { useState } from 'react';

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  
  return (
    &lt;button onClick={() => setLiked(!liked)}&gt;
      {liked ? '❤️' : '🤍'}
    &lt;/button&gt;
  );
}
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">📊 When to Use Server vs Client</h3>
<div class="overflow-x-auto mb-6">
    <table class="w-full text-sm text-left">
        <thead class="bg-dark-700 text-light-200">
            <tr>
                <th class="p-3 rounded-tl-lg">Feature</th>
                <th class="p-3">Server Component</th>
                <th class="p-3 rounded-tr-lg">Client Component</th>
            </tr>
        </thead>
        <tbody class="text-light-300">
            <tr class="border-b border-dark-600">
                <td class="p-3">Fetch data</td>
                <td class="p-3 text-green-400">✅ Direct DB/API</td>
                <td class="p-3 text-yellow-400">useEffect + fetch</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">useState/useEffect</td>
                <td class="p-3 text-red-400">❌ Not allowed</td>
                <td class="p-3 text-green-400">✅ Yes</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">onClick/onChange</td>
                <td class="p-3 text-red-400">❌ Not allowed</td>
                <td class="p-3 text-green-400">✅ Yes</td>
            </tr>
            <tr class="border-b border-dark-600">
                <td class="p-3">Access secrets</td>
                <td class="p-3 text-green-400">✅ Safe</td>
                <td class="p-3 text-red-400">❌ Never expose!</td>
            </tr>
            <tr>
                <td class="p-3 rounded-bl-lg">Bundle size impact</td>
                <td class="p-3 text-green-400">0 KB</td>
                <td class="p-3 rounded-br-lg text-yellow-400">Adds to bundle</td>
            </tr>
        </tbody>
    </table>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 The Import Rules</h3>
<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
    <ul class="text-blue-200 space-y-2">
        <li>✅ <span class="font-bold">Server → Client:</span> Server Components CAN import Client Components</li>
        <li>❌ <span class="font-bold">Client → Server:</span> Client Components CANNOT import Server Components</li>
        <li>✅ <span class="font-bold">Workaround:</span> Pass Server Component as children prop to Client Component</li>
    </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚠️ Common Mistakes</h3>
<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
    <ul class="text-red-200 text-sm space-y-1">
        <li>• <span class="font-bold">Adding "use client" everywhere</span> - defeats the purpose!</li>
        <li>• <span class="font-bold">Using hooks in Server Components</span> - will error</li>
        <li>• <span class="font-bold">Passing functions as props</span> from Server to Client - not serializable</li>
    </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">Start with Server Components</span> - only add "use client" when needed</li>
    <li><span class="text-yellow-400 font-bold">Keep Client Components small</span> - extract interactive parts only</li>
    <li><span class="text-yellow-400 font-bold">Use composition</span> - pass Server Components as children to Client</li>
    <li><span class="text-yellow-400 font-bold">Next.js App Router</span> - built for Server Components from the ground up</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║       🎯 REACT SERVER COMPONENTS (RSC) - The Future          ║
║   Components that run on the server, send ZERO JS to client! ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   THE REVOLUTION:                                            ║
║   ═══════════════                                            ║
║                                                              ║
║   BEFORE RSC:                                                ║
║   ───────────                                                ║
║   Browser downloads JS → JS fetches data → Renders UI        ║
║   (Slow! Multiple round trips)                               ║
║                                                              ║
║   WITH RSC:                                                  ║
║   ─────────                                                  ║
║   Server renders HTML → Sends to browser → Done!             ║
║   (Fast! Data fetched on server)                             ║
║                                                              ║
║   THE WATERLINE:                                             ║
║   ══════════════                                             ║
║                                                              ║
║   ┌────────────────────────────────────┐                     ║
║   │         🖥️ SERVER                  │                     ║
║   │  ┌─────────────────────────────┐   │                     ║
║   │  │ Server Component            │   │  • Direct DB access ║
║   │  │ async function Posts() {    │   │  • No JS to client  ║
║   │  │   const data = await db()   │   │  • No hooks         ║
║   │  │   return <List data={data}> │   │                     ║
║   │  └─────────────────────────────┘   │                     ║
║   ├────────────────────────────────────┤ ← "use client"      ║
║   │         💻 CLIENT                  │                     ║
║   │  ┌─────────────────────────────┐   │                     ║
║   │  │ "use client"                │   │  • useState/Effect  ║
║   │  │ function Like() {           │   │  • onClick handlers ║
║   │  │   const [liked, setLiked]   │   │  • JS sent to       ║
║   │  │   return <button>Like       │   │    browser          ║
║   │  └─────────────────────────────┘   │                     ║
║   └────────────────────────────────────┘                     ║
║                                                              ║
║   RULES:                                                     ║
║   ══════                                                     ║
║   • Server can import Client ✅                              ║
║   • Client CANNOT import Server ❌                           ║
║   • "use client" at top marks boundary                       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🖥️ SIMULATED SERVER COMPONENT
// ═══════════════════════════════════════════════════════════════
// In Next.js App Router, this would be a real async server component
// that fetches data directly from the database - NO API needed!
// ═══════════════════════════════════════════════════════════════
function ServerPostList() {
  // Simulated server-side data (in real RSC: const posts = await db.post.findMany())
  const posts = [
    { id: 1, title: 'Understanding RSC', author: 'React Team' },
    { id: 2, title: 'Zero JavaScript', author: 'Dan Abramov' },
    { id: 3, title: 'The Future of React', author: 'Vercel' }
  ];
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      borderRadius: '12px',
      padding: '20px',
      border: '2px solid #22c55e'
    }}>
      <h4 style={{ color: '#166534', margin: '0 0 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        🖥️ Server Component
        <span style={{ fontSize: '12px', background: '#22c55e', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>
          0 KB JS
        </span>
      </h4>
      
      {posts.map(post => (
        <div key={post.id} style={{
          background: 'white',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '8px',
          borderLeft: '3px solid #22c55e'
        }}>
          <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{post.title}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>by {post.author}</div>
        </div>
      ))}
      
      <div style={{ fontSize: '11px', color: '#166534', marginTop: '10px' }}>
        ✅ Direct DB access • ✅ No JS bundle • ✅ SEO friendly
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 💻 CLIENT COMPONENT (needs "use client" in Next.js)
// ═══════════════════════════════════════════════════════════════
// This component has interactivity (useState, onClick)
// It MUST be marked with "use client" in Next.js
// Its JS code is sent to the browser
// ═══════════════════════════════════════════════════════════════
function ClientLikeButton() {
  const [liked, setLiked] = React.useState(false);
  const [count, setCount] = React.useState(42);
  
  const handleLike = () => {
    setLiked(!liked);
    setCount(c => liked ? c - 1 : c + 1);
  };
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      borderRadius: '12px',
      padding: '20px',
      border: '2px solid #f59e0b'
    }}>
      <h4 style={{ color: '#92400e', margin: '0 0 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        💻 Client Component
        <span style={{ fontSize: '12px', background: '#f59e0b', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>
          ~2 KB JS
        </span>
      </h4>
      
      <button 
        onClick={handleLike}
        style={{
          padding: '12px 24px',
          background: liked ? '#ef4444' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s'
        }}
      >
        {liked ? '❤️' : '🤍'} {liked ? 'Liked' : 'Like'} ({count})
      </button>
      
      <div style={{ fontSize: '11px', color: '#92400e', marginTop: '10px' }}>
        ✅ useState • ✅ onClick • ✅ Interactive
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>⚛️ React Server Components Demo</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {/* Server Component - No JS sent */}
        <ServerPostList />
        
        {/* Client Component - JS required for interactivity */}
        <ClientLikeButton />
      </div>
      
      <div style={{
        marginTop: '15px',
        padding: '15px',
        background: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <p style={{ color: '#64748b', margin: 0, fontSize: '13px' }}>
          💡 <strong>In Next.js App Router:</strong> Components are Server by default. 
          Add <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>"use client"</code> only 
          when you need hooks or event handlers!
        </p>
      </div>
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

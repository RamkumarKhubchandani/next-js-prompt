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
        totalDays: 32,
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
            },
            {
                day: 16,
                title: 'React 19: Actions & Optimistic UI',
                intro: "React 19 brings the biggest changes in years. Built-in Actions, useOptimistic, and useActionState simplify forms and mutations.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>How React 19 simplifies data mutations with "Actions"</li>
    <li>Using <code>useActionState</code> for form handling</li>
    <li>Optimistic updates with <code>useOptimistic</code></li>
    <li>The new <code>use</code> API for promises and context</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚡ 1. Actions: Forms without the Hassle</h3>
<p class="mb-4 text-light-300">Forget <code>onSubmit</code>, <code>e.preventDefault()</code>, and manual loading states.</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">// ❌ React 18: Manual Everything
function Form() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateName(e.target.name.value);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return &lt;form onSubmit={handleSubmit}&gt;...&lt;/form&gt;;
}

// ✅ React 19: Actions
function Form() {
  // "action" automatically handles pending states!
  const [state, action, isPending] = useActionState(updateName, null);
  
  return (
    &lt;form action={action}&gt;
      &lt;input name="name" /&gt;
      &lt;button disabled={isPending}&gt;Update&lt;/button&gt;
      {state?.error && &lt;p&gt;{state.error}&lt;/p&gt;}
    &lt;/form&gt;
  );
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🚀 2. Optimistic UI Updates</h3>
<p class="mb-4 text-light-300">Show the new value <i>instantly</i>, before the server responds.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
const [optimisticName, setOptimisticName] = useOptimistic(currentName);

function action(formData) {
  const newName = formData.get("name");
  
  // 1. Update UI immediately!
  setOptimisticName(newName);
  
  // 2. Send to server (background)
  await updateNameOnServer(newName);
}
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔮 3. The "use" API</h3>
<p class="mb-4 text-light-300">Read Promises and Context directly in render.</p>
<div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mb-6">
    <pre class="text-green-200 text-sm">// Read a Promise (suspends automatically!)
const comments = use(commentsPromise);

// Read Context (conditional!)
if (showTheme) {
  const theme = use(ThemeContext);
}</pre>
</div>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║            ⚛️ REACT 19 ACTIONS DEMO                          ║
║      Built-in mutation handling with automatic pending states║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   NEW HOOKS:                                                 ║
║   ══════════                                                 ║
║   1. useActionState(fn, initial)                             ║
║      → Manages form state (data, errors, pending)            ║
║                                                              ║
║   2. useOptimistic(state, reducer)                           ║
║      → Show updates INSTANTLY while server processes         ║
║                                                              ║
║   3. useFormStatus()                                         ║
║      → Read pending state in child components                ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🛠️ SIMULATED SERVER ACTION
// ═══════════════════════════════════════════════════════════════
async function updateProfile(prevState, formData) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const name = formData.get("name");
  
  if (name.toLowerCase() === "error") {
    return { error: "Invalid name! Try something else." };
  }
  
  return { message: "Updated to " + name + "!" };
}

// ═══════════════════════════════════════════════════════════════
// 🧩 CHILD COMPONENT (Accessing Status)
// ═══════════════════════════════════════════════════════════════
// useFormStatus lets us read the parent form's pending state
// without passing props!
function SubmitButton() {
  const { pending } = React.useFormStatus ? React.useFormStatus() : { pending: false };
  // Fallback for demo environment if React 19 not fully active
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      style={{
        padding: '10px 20px',
        background: pending ? '#94a3b8' : '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: pending ? 'not-allowed' : 'pointer'
      }}
    >
      {pending ? '⏳ Saving...' : '💾 Save Profile'}
    </button>
  );
}

function App() {
  // ═══════════════════════════════════════════════════════════
  // 🎣 useActionState (New in React 19)
  // ═══════════════════════════════════════════════════════════
  // Automatically handles:
  // 1. Pending state (isPending)
  // 2. Return value from action (state)
  // 3. Form resetting
  // ═══════════════════════════════════════════════════════════
  
  // NOTE: In this live demo, we might be on React 18.
  // We'll simulate React 19 behavior if hooks aren't available.
  const [state, formAction] = React.useActionState 
    ? React.useActionState(updateProfile, null)
    : [null, (formData) => alert("React 19 Action would run here!")];

  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>⚛️ React 19 Actions Demo</h3>
      
      <div style={{ 
        padding: '20px', 
        background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
        borderRadius: '16px',
        border: '1px solid #818cf8'
      }}>
        <form action={formAction}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#3730a3', fontWeight: 'bold' }}>
              Update Username
            </label>
            <input 
              name="name" 
              placeholder="Enter new name..." 
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #a5b4fc',
                fontSize: '16px'
              }}
            />
          </div>
          
          <SubmitButton />
          
          {/* Success/Error Message */}
          {state?.error && (
            <p style={{ marginTop: '15px', color: '#ef4444', fontWeight: 'bold' }}>
              ❌ {state.error}
            </p>
          )}
          {state?.message && (
            <p style={{ marginTop: '15px', color: '#16a34a', fontWeight: 'bold' }}>
              ✅ {state.message}
            </p>
          )}
        </form>
      </div>
      
      <p style={{ color: '#64748b', marginTop: '20px', fontSize: '13px' }}>
        💡 Try typing "error" to see error handling!
      </p>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ React 18 Boilerplate
const [loading, setLoading] = useState(false);
const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  await saveData();
  setLoading(false);
};`,
                    senior: `// ✅ React 19 Action
const [state, action, isPending] = useActionState(saveData, null);

return <form action={action}>
  <button disabled={isPending}>Save</button>
</form>;`
                },
                interview: {
                    questions: [
                        { q: "What is the difference between useActionState and useFormStatus?", a: "useActionState is used at the top level to manage the form's state and action. useFormStatus is used in child components (like buttons) to read the pending state without passing props." }
                    ]
                }
            },
            {
                day: 17,
                title: 'React 19: Ref Improvements & Cleanup',
                intro: "The end of `forwardRef`. React 19 simplifies refs significantly and adds cleanup functions to ref callbacks.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Why <code>forwardRef</code> is deprecated</li>
    <li>Passing <code>ref</code> as a standard prop</li>
    <li>Returning cleanup functions from ref callbacks</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">🗑️ 1. The Death of forwardRef</h3>
<p class="mb-4 text-light-300">In React 18, if you wanted to pass a ref to a child component, you had to wrap it in <code>forwardRef</code>. It was boilerplate-heavy and messed up type inference.</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
<pre class="text-red-200 text-sm">// ❌ React 18: The Old Way
const MyInput = forwardRef((props, ref) => {
  return &lt;input ref={ref} {...props} /&gt;;
});</pre>
</div>

<div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mb-6">
<pre class="text-green-200 text-sm">// ✅ React 19: Just use props!
function MyInput({ ref, ...props }) {
  return &lt;input ref={ref} {...props} /&gt;;
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🧹 2. Ref Callback Cleanup</h3>
<p class="mb-4 text-light-300">Ref callbacks can now return a cleanup function, just like <code>useEffect</code>. This is huge for managing DOM listeners or third-party libraries attached to nodes.</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">&lt;div ref={(node) => {
  // Mount logic
  const observer = new ResizeObserver(...);
  observer.observe(node);

  // Unmount logic (Cleanup)
  return () => {
    observer.disconnect();
  };
}} /&gt;</pre>
</div>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║            ⚛️ REACT 19 REF DEMO                              ║
║      No more forwardRef! Cleanup in callbacks!               ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   NEW FEATURES:                                              ║
║   ═════════════                                              ║
║   1. ref as a prop: <Child ref={myRef} /> works natively     ║
║                                                              ║
║   2. Callback Cleanup:                                       ║
║      ref={node => {                                          ║
║         // init                                              ║
║         return () => { // cleanup }                          ║
║      }}                                                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 👶 CHILD COMPONENT (No forwardRef!)
// ═══════════════════════════════════════════════════════════════
function CustomInput({ ref, placeholder }) {
  return (
    <input 
      ref={ref}
      placeholder={placeholder}
      style={{
        padding: '10px',
        borderRadius: '8px',
        border: '2px solid #6366f1',
        width: '100%',
        marginBottom: '15px'
      }}
    />
  );
}

function App() {
  const inputRef = React.useRef(null);
  const [width, setWidth] = React.useState(0);

  // ═══════════════════════════════════════════════════════════
  // 🧹 REF CALLBACK WITH CLEANUP
  // ═══════════════════════════════════════════════════════════
  // Instead of useEffect, we can manage the ResizeObserver
  // directly on the element's ref callback!
  const measureRef = (node) => {
    if (!node) return;
    
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    
    observer.observe(node);
    
    // Cleanup function (New in React 19)
    return () => observer.disconnect();
  };

  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>⚛️ React 19 Ref Demo</h3>
      
      <div 
        ref={measureRef} 
        style={{ 
          background: '#e0e7ff', 
          padding: '20px', 
          borderRadius: '12px',
          resize: 'horizontal', 
          overflow: 'auto',
          border: '1px dashed #4338ca'
        }}
      >
        <p style={{ margin: '0 0 10px', color: '#3730a3' }}>
          <strong>Resize me!</strong> Width: {Math.round(width)}px
        </p>
        
        {/* Passing ref as a regular prop! */}
        <CustomInput ref={inputRef} placeholder="I accept refs natively..." />
        
        <button 
          onClick={() => inputRef.current.focus()}
          style={{
            background: '#4f46e5',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Focus Input
        </button>
      </div>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ React 18: Boilerplate
const Input = forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));`,
                    senior: `// ✅ React 19: Clean
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}`
                },
                interview: {
                    questions: [
                        { q: "Why is returning a cleanup function from a ref callback useful?", a: "It ensures that side effects attached to DOM nodes (like Event Listeners or Observers) are properly cleaned up when the element is removed from the DOM, preventing memory leaks without needing a separate `useEffect`." }
                    ]
                }
            },
            {
                day: 18,
                title: 'React 19: Metadata & Asset Loading',
                intro: "No more `react-helmet`. React 19 handles `<title>`, `<meta>`, and asset preloading natively.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Hoisting metadata with native tags</li>
    <li>Preloading styles and scripts</li>
    <li>Resource loading priorities</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">🏷️ 1. Native Metadata Support</h3>
<p class="mb-4 text-light-300">You can now render <code>&lt;title&gt;</code> and <code>&lt;meta&gt;</code> tags <i>anywhere</i> in your component tree. React will automatically hoist them to the <code>&lt;head&gt;</code>.</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">function BlogPost({ title }) {
  return (
    &lt;article&gt;
      {/* Automatically moved to &lt;head&gt;! */}
      &lt;title&gt;{title} | My Blog&lt;/title&gt;
      &lt;meta name="description" content="Great post" /&gt;
      
      &lt;h1&gt;{title}&lt;/h1&gt;
    &lt;/article&gt;
  );
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ 2. Asset Preloading</h3>
<p class="mb-4 text-light-300">React 19 introduces new APIs to hint the browser about resources.</p>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><code>preload('url', { as: 'style' })</code></li>
    <li><code>preinit('url', { as: 'script' })</code></li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║            ⚛️ REACT 19 METADATA DEMO                         ║
║      Native <title> and <meta> support + Preloading          ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   NEW CAPABILITIES:                                          ║
║   ═════════════════                                          ║
║   1. Hoisting: <title> inside a component <div> works!       ║
║      React moves it to <head>.                               ║
║                                                              ║
║   2. Deduplication: React avoids duplicate tags.             ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function PageSEO({ title, description }) {
  return (
    // These tags effectively render in the <head>
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
    </>
  );
}

function App() {
  const [page, setPage] = React.useState('home');

  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>⚛️ Metadata Hoisting</h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('about')}>About</button>
      </div>

      <div style={{ 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '8px',
        background: '#f8fafc'
      }}>
        {page === 'home' ? (
          <>
            <PageSEO title="Home Page" description="Welcome to the home page" />
            <h1>🏠 Home</h1>
            <p>Check the document title!</p>
          </>
        ) : (
          <>
            <PageSEO title="About Us" description="Learn more about us" />
            <h1>ℹ️ About</h1>
            <p>Title changed automatically.</p>
          </>
        )}
      </div>
      
      <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        Note: In this sandbox, you might not see the browser tab title change due to iframe restrictions, but in a real app, it works natively!
      </p>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Third-party Library
import { Helmet } from "react-helmet";

<Helmet>
  <title>My Page</title>
</Helmet>`,
                    senior: `// ✅ Native React 19
<title>My Page</title>
<meta name="description" content="..." />
// React handles hoisting & deduplication`
                },
                interview: {
                    questions: [
                        { q: "How does React 19 handle metadata tags differently?", a: "It natively recognizes tags like `<title>`, `<meta>`, and `<link>` anywhere in the component tree and hoists them to the `<head>`, automatically handling deduplication." }
                    ]
                }
            },
            {
                day: 19,
                title: 'React 19: Web Components & Error Reporting',
                intro: "First-class support for Custom Elements and better error handling hooks.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Using Web Components (Custom Elements) in React</li>
    <li>Handling properties vs attributes</li>
    <li>New Error Reporting hooks: <code>onCaughtError</code></li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">🧩 1. Web Components Finally Work</h3>
<p class="mb-4 text-light-300">React 19 passes data to custom elements as properties if they exist, and attributes if they don't. It also handles events correctly.</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">// React 19 passes complex data correctly!
&lt;my-calendar
  date={new Date()}
  events={eventList} 
/&gt;</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🚨 2. Better Error Reporting</h3>
<p class="mb-4 text-light-300">New options for <code>createRoot</code> and <code>hydrateRoot</code> to handle errors globally.</p>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><code>onCaughtError</code>: Triggered when an Error Boundary catches an error.</li>
    <li><code>onUncaughtError</code>: Triggered when an error bubbles to the top.</li>
</ul>
                `,
                code: `// Conceptual Demo for Web Components
// Assuming <fancy-button> is defined in the browser

function App() {
  return (
    <div>
      <h3>🧩 Web Component Support</h3>
      <p>React 19 allows passing objects and functions to Custom Elements.</p>
      
      {/* 
        In React 18, 'user' would be stringified to "[object Object]"
        In React 19, it is passed as a DOM property!
      */}
      {/* <user-card user={{ name: 'John', id: 1 }} /> */}
      
      <div style={{ padding: '10px', background: '#eee' }}>
        <em>(Requires a Custom Element registry to demonstrate visually)</em>
      </div>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ React 18 Hack
const ref = useRef();
useEffect(() => {
  ref.current.data = complexData; // Manual assignment
}, [complexData]);

return <my-element ref={ref} />;`,
                    senior: `// ✅ React 19 Native
<my-element data={complexData} />;`
                },
                interview: {
                    questions: [
                        { q: "What changed regarding Custom Elements in React 19?", a: "React 19 checks if a prop exists as a property on the DOM instance. If so, it assigns it as a property (allowing objects/arrays). If not, it sets it as an attribute (string)." }
                    ]
                }
            },
            {
                day: 20,
                title: 'The "use" API Deep Dive',
                intro: "The universal API for unwrapping resources. Promises, Context, and future data types.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><code>use(Context)</code> vs <code>useContext()</code></li>
    <li>Unwrapping Promises in Client Components</li>
    <li>Conditional Context usage</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">🔮 1. use(Context)</h3>
<p class="mb-4 text-light-300"><code>useContext</code> must be at the top level. <code>use(Context)</code> can be inside loops and conditionals!</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">if (isDark) {
  // ✅ Allowed with use()
  const theme = use(ThemeContext);
  return &lt;DarkButton theme={theme} /&gt;;
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">⏳ 2. use(Promise)</h3>
<p class="mb-4 text-light-300">You can pass a Promise from a Server Component to a Client Component and unwrap it with <code>use()</code>. This triggers Suspense.</p>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║            ⚛️ REACT 19 "use" API DEMO                         ║
║      Conditional Context & Promise Unwrapping                ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   1. Conditional Context:                                    ║
║      if (cond) { const val = use(Context); }                 ║
║                                                              ║
║   2. Promise Unwrapping:                                     ║
║      const data = use(promise);                              ║
║      (Triggers Suspense automatically!)                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

const ThemeContext = React.createContext('light');

function ThemedButton({ show }) {
  if (!show) return null;
  
  // ✅ Conditional hook usage! Only possible with use()
  // Note: We use React.use() if available, else simulate
  const theme = React.use ? React.use(ThemeContext) : React.useContext(ThemeContext);
  
  return (
    <button style={{
      background: theme === 'dark' ? '#333' : '#eee',
      color: theme === 'dark' ? '#fff' : '#333',
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      marginTop: '10px'
    }}>
      I am a {theme} button
    </button>
  );
}

function App() {
  const [show, setShow] = React.useState(false);
  
  return (
    <ThemeContext.Provider value="dark">
      <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
        <h3 style={{ color: '#1e293b' }}>🔮 The "use" API</h3>
        
        <label>
          <input 
            type="checkbox" 
            checked={show} 
            onChange={e => setShow(e.target.checked)} 
          />
          Show Button (Triggers conditional context read)
        </label>
        
        <br />
        <ThemedButton show={show} />
      </div>
    </ThemeContext.Provider>
  );
}`,
                comparison: {
                    junior: `// ❌ useContext (Must be top level)
const theme = useContext(ThemeContext);
if (!show) return null; // Wasted read if not shown`,
                    senior: `// ✅ use (Conditional)
if (!show) return null;
const theme = use(ThemeContext); // Only reads if needed`
                },
                interview: {
                    questions: [
                        { q: "Can `use()` be called in a Server Component?", a: "Yes. It can be used to unwrap promises in Server Components (though async/await is preferred there) and is the standard way to read Context in Client Components conditionally." }
                    ]
                }
            },
            {
                day: 21,
                title: 'The React Compiler (React Forget)',
                intro: "The end of manual memoization. Learn how the new compiler automatically optimizes your code so you can delete useMemo and useCallback.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What is the React Compiler ("React Forget")?</li>
    <li>How it eliminates re-renders automatically</li>
    <li>Why you can stop using <code>useMemo</code> and <code>useCallback</code></li>
    <li>How to verify it's working with DevTools</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">🧠 The Problem: Manual Memoization</h3>
<p class="mb-4 text-light-300">React 18 requires you to manually cache functions and objects to prevent children from re-rendering:</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
<pre class="text-red-200 text-sm">// ❌ Before Compiler: Dependency Hell
const handleClick = useCallback(() => {
  console.log(count);
}, [count]); // Don't forget this!

const filtered = useMemo(() => {
  return items.filter(i => i > 10);
}, [items]); // Or this!</pre>
<p class="text-red-300 text-sm mt-2">Miss a dependency? Bugs. Add too many? Performance loss.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ The Solution: Auto-Memoization</h3>
<p class="mb-4 text-light-300">The React Compiler analyzes your code at build time. It understands the data flow and caches <i>everything</i> automatically.</p>

<div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mb-6">
<pre class="text-green-200 text-sm">// ✅ After Compiler: Just write JavaScript!
const handleClick = () => {
  console.log(count);
};

const filtered = items.filter(i => i > 10);</pre>
<p class="text-green-300 text-sm mt-2">The compiler rewrites this into highly optimized, cached code during the build.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔍 How it Works (Conceptual)</h3>
<p class="mb-4 text-light-300">The compiler wraps your component code in a specialized <code>useMemoCache</code> hook:</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
function Component(props) {
  const $ = useMemoCache(2); // React Internal Hook
  
  let t0;
  if ($[0] !== props.a) {
    t0 = expensiveCalc(props.a); // Re-run only if 'a' changed
    $[0] = props.a;
    $[1] = t0;
  } else {
    t0 = $[1]; // Return cached value
  }
  
  return t0;
}
</pre>
</div>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║            ⚛️ REACT COMPILER DEMO                            ║
║      See how cleaner code works without manual optimization  ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   INSTRUCTIONS:                                              ║
║   1. Notice we use NO useMemo or useCallback                 ║
║   2. We pass an object and function to Child                 ║
║   3. In React 18, this would cause re-renders                ║
║   4. With Compiler, it's automatically stable!               ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 👶 CHILD COMPONENT
// ═══════════════════════════════════════════════════════════════
// We wrap in memo() to prove props are stable.
// If props change, this WILL log "Rendered!".
// If props are stable (thanks to compiler), it won't log.
const HeavyChild = React.memo(function HeavyChild({ config, onClick }) {
  const renders = React.useRef(0);
  renders.current++;
  
  return (
    <div style={{
      padding: '15px',
      background: renders.current > 1 ? '#fee2e2' : '#dcfce7',
      borderRadius: '8px',
      border: '2px solid #cbd5e1',
      transition: 'background 0.3s'
    }}>
      <h4 style={{ margin: 0, color: '#334155' }}>👶 Child Component</h4>
      <p style={{ margin: '5px 0 0', fontSize: '12px' }}>
        Render Count: <strong>{renders.current}</strong>
      </p>
      <p style={{ fontSize: '12px', color: '#64748b' }}>
        Config: {JSON.stringify(config)}
      </p>
      <button onClick={onClick} style={{ marginTop: '10px', padding: '5px 10px' }}>
        Call Parent
      </button>
    </div>
  );
});

function App() {
  const [count, setCount] = React.useState(0);
  const [color, setColor] = React.useState('blue');

  // ═══════════════════════════════════════════════════════════
  // ❌ NO useMemo needed!
  // The compiler sees that 'color' dependency didn't change
  // when 'count' changed, so it reuses this object!
  // ═══════════════════════════════════════════════════════════
  const config = { theme: color, debug: true };

  // ═══════════════════════════════════════════════════════════
  // ❌ NO useCallback needed!
  // The compiler caches this function automatically.
  // ═══════════════════════════════════════════════════════════
  const handleClick = () => {
    console.log('Clicked in parent');
  };

  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>🤖 React Compiler Simulation</h3>
      
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f1f5f9', borderRadius: '12px' }}>
        <p>Parent State (Unrelated to Child): <strong>{count}</strong></p>
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px' }}
        >
          Increment Parent Count
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p>Child Prop (Related): <strong>{color}</strong></p>
        <button onClick={() => setColor(c => c === 'blue' ? 'red' : 'blue')}>
          Toggle Color
        </button>
      </div>

      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '10px' }}>
        👇 If Compiler is working, Child render count stays at <strong>1</strong> when you click "Increment Parent"!
      </p>

      <HeavyChild config={config} onClick={handleClick} />
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ React 18 (Manual)
const handleClick = useCallback(() => {
  doSomething(data);
}, [data]); // Manual array management`,
                    senior: `// ✅ React 19 (Compiler)
const handleClick = () => {
  doSomething(data);
};
// Compiler detects 'data' dependency 
// and caches the function automatically.`
                },
                interview: {
                    questions: [
                        { q: "How does the React Compiler optimize re-renders?", a: "It uses a build-time optimization to cache (memoize) values and components automatically. It effectively applies `useMemo` and `useCallback` everywhere it's needed without developer intervention." },
                        { q: "Can the React Compiler break existing code?", a: "Generally no, if the code follows React Rules. However, code that relies on accidental re-renders or side effects during render might behave differently." }
                    ]
                }
            },
            {
                day: 22,
                title: 'Advanced Patterns: Headless UI & Slots',
                intro: "Build reusable, accessible component libraries. Separate logic from UI using Headless Hooks and Composition.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What is "Headless UI"?</li>
    <li>Building a <code>useToggle</code> hook with accessibility props</li>
    <li>The "Slots" pattern for flexible layouts</li>
    <li>Inversion of Control</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">💀 1. Headless UI Concept</h3>
<p class="mb-4 text-light-300">A "Headless" component provides <strong>logic and accessibility</strong> but <strong>no styles</strong>. It gives you full control over the look and feel.</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">// 1. Headless Hook (Logic + A11y)
function useSwitch() {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  
  return {
    isOn: on,
    switchProps: {
      role: 'switch',
      'aria-checked': on,
      onClick: toggle,
    }
  };
}

// 2. UI Component (Styles)
function MySwitch() {
  const { isOn, switchProps } = useSwitch();
  return <button className={isOn ? 'bg-green' : 'bg-gray'} {...switchProps} />;
}</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🎰 2. The Slots Pattern</h3>
<p class="mb-4 text-light-300">Instead of <code>children</code>, allow users to inject content into specific "slots" of your layout.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
// Flexible Layout
function PageLayout({ header, sidebar, content }) {
  return (
    &lt;div className="grid"&gt;
      &lt;div className="head"&gt;{header}&lt;/div&gt;
      &lt;div className="side"&gt;{sidebar}&lt;/div&gt;
      &lt;div className="main"&gt;{content}&lt;/div&gt;
    &lt;/div&gt;
  );
}

// Usage
&lt;PageLayout 
  header={&lt;Nav /&gt;} 
  sidebar={&lt;Menu /&gt;} 
  content={&lt;Feed /&gt;} 
/&gt;
</pre>
</div>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║            ⚛️ HEADLESS UI PATTERN DEMO                        ║
║      Separate Logic (Hook) from UI (Component)               ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   GOAL: Build a "Toggle" logic that can power ANY UI.        ║
║                                                              ║
║   1. useToggle() -> Returns state + accessibility props      ║
║   2. IOSSwitch   -> Looks like iOS                           ║
║   3. ButtonSwitch -> Looks like a button                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🧠 HEADLESS LOGIC HOOK
// ═══════════════════════════════════════════════════════════════
function useToggle({ initial = false } = {}) {
  const [on, setOn] = React.useState(initial);
  
  const toggle = () => setOn(!on);
  
  // Return "Prop Getters" or plain props object
  return {
    on,
    toggle,
    // Accessibility props pre-wired!
    getTogglerProps: ({ onClick, ...props } = {}) => ({
      'aria-pressed': on,
      onClick: (e) => {
        toggle();
        if (onClick) onClick(e);
      },
      ...props
    })
  };
}

// ═══════════════════════════════════════════════════════════════
// 🎨 UI 1: iOS STYLE SWITCH
// ═══════════════════════════════════════════════════════════════
function IOSSwitch() {
  const { on, getTogglerProps } = useToggle();
  
  return (
    <div style={{ marginBottom: '20px' }}>
      <p>iOS Style:</p>
      <button 
        {...getTogglerProps()}
        style={{
          width: '50px',
          height: '30px',
          borderRadius: '30px',
          background: on ? '#34c759' : '#e2e8f0',
          border: 'none',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background 0.3s'
        }}
      >
        <div style={{
          width: '26px',
          height: '26px',
          background: 'white',
          borderRadius: '50%',
          position: 'absolute',
          top: '2px',
          left: on ? '22px' : '2px',
          transition: 'left 0.3s',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }} />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🎨 UI 2: SIMPLE BUTTON
// ═══════════════════════════════════════════════════════════════
function ButtonSwitch() {
  // We reuse the EXACT same logic!
  const { on, getTogglerProps } = useToggle({ initial: true });
  
  return (
    <div>
      <p>Button Style:</p>
      <button
        {...getTogglerProps()}
        style={{
          padding: '10px 20px',
          background: on ? '#3b82f6' : '#cbd5e1',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        {on ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}

function App() {
  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3 style={{ color: '#1e293b' }}>💀 Headless UI Demo</h3>
      <p style={{ color: '#64748b', fontSize: '14px' }}>
        Two very different UIs powered by the same <code>useToggle</code> hook.
      </p>
      
      <div style={{ 
        padding: '20px', 
        border: '1px solid #e2e8f0', 
        borderRadius: '12px',
        background: '#f8fafc'
      }}>
        <IOSSwitch />
        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />
        <ButtonSwitch />
      </div>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Hardcoded UI Logic
function Switch({ on, setOn }) {
  return <div className={on ? 'on' : 'off'} onClick={() => setOn(!on)} />;
}
// Hard to reuse for a Button or Checkbox`,
                    senior: `// ✅ Headless Hook
const { props } = useSwitch();
// Apply to ANY element:
<div {...props} /> 
<button {...props} />
<CustomElement {...props} />`
                },
                interview: {
                    questions: [
                        { q: "What is Inversion of Control in React?", a: "Giving the user of your component control over rendering. Examples include Render Props, Compound Components, and Headless UI hooks." },
                        { q: "Why return 'prop getters' from a hook?", a: "Prop getters (like `getTogglerProps`) allow the user to compose their own event handlers with the hook's internal handlers safely." }
                    ]
                }
            },
            {
                day: 23,
                title: 'System Design: Infinite Feed (Instagram)',
                intro: "A classic interview challenge. Design a high-performance infinite scroll feed with virtualization, caching, and optimistic fetching.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 The Challenge</h3>
<p class="mb-4 text-light-300">Design a feed that handles:</p>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Thousands of posts with images/videos</li>
    <li>Scroll position memory (back button support)</li>
    <li>Zero layout shift during loading</li>
    <li>Network efficiency (no over-fetching)</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">🏗️ Architecture</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
[ UI Layer ]
    │
    ▼
[ Virtualizer (react-window) ]  <- Renders only 5 items
    │
    ▼
[ Data Layer (TanStack Query) ] <- Caches pages
    │
    ▼
[ Intersection Observer ]       <- Triggers "Fetch Next"
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Key Technologies</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><span class="text-yellow-400 font-bold">TanStack Query (useInfiniteQuery):</span> Handles pagination logic, caching, and background refetching.</li>
    <li><span class="text-yellow-400 font-bold">Virtualization:</span> Only renders items in viewport. Mandatory for performance.</li>
    <li><span class="text-yellow-400 font-bold">BlurHash:</span> Show a blurry placeholder while image loads to prevent layout shift.</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║            📱 INFINITE SCROLL SYSTEM DESIGN                  ║
║      Simulating a social feed with Virtualization & Fetching ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   ARCHITECTURE:                                              ║
║   1. useInfiniteQuery: Manages pages of data                 ║
║   2. IntersectionObserver: Detects bottom of list            ║
║   3. Virtualization: Renders only visible DOM nodes          ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function App() {
  // ═══════════════════════════════════════════════════════════
  // 📦 STATE MOCK (Replacing TanStack Query for demo)
  // ═══════════════════════════════════════════════════════════
  const [posts, setPosts] = React.useState(
    Array.from({ length: 5 }).map((_, i) => ({ id: i, text: \`Post #\${i}\` }))
  );
  const [loading, setLoading] = React.useState(false);
  const loaderRef = React.useRef(null);

  // ═══════════════════════════════════════════════════════════
  // 🔭 INTERSECTION OBSERVER (The Trigger)
  // ═══════════════════════════════════════════════════════════
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        loadMore();
      }
    }, { rootMargin: '100px' }); // Load 100px before reaching bottom

    if (loaderRef.current) observer.observe(loaderRef.current);
    
    return () => observer.disconnect();
  }, [loading, posts.length]);

  // ═══════════════════════════════════════════════════════════
  // 📡 FETCH SIMULATION
  // ═══════════════════════════════════════════════════════════
  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const newPosts = Array.from({ length: 5 }).map((_, i) => ({
        id: posts.length + i,
        text: \`Post #\${posts.length + i}\`
      }));
      setPosts(prev => [...prev, ...newPosts]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px', height: '400px', overflow: 'auto', border: '2px solid #ccc', borderRadius: '12px' }}>
      <h3 style={{ position: 'sticky', top: 0, background: 'white', margin: 0, padding: '10px', borderBottom: '1px solid #eee' }}>
        📱 Infinite Feed
      </h3>
      
      <div style={{ padding: '10px' }}>
        {posts.map(post => (
          <div key={post.id} style={{
            height: '150px',
            background: '#f1f5f9',
            marginBottom: '15px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            color: '#64748b'
          }}>
            {post.text}
          </div>
        ))}
        
        {/* Sentinel Element */}
        <div ref={loaderRef} style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
          {loading ? '⏳ Loading more...' : 'End of feed'}
        </div>
      </div>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Scroll Event Listener
window.addEventListener('scroll', () => {
  if (window.scrollY > 1000) fetch();
});
// Fires 100s of times per second. Laggy.`,
                    senior: `// ✅ Intersection Observer
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) fetch();
});
observer.observe(target);
// Fires ONCE when element appears. Efficient.`
                },
                interview: {
                    questions: [
                        { q: "How do you handle scroll position restoration?", a: "Store the scroll offset (or virtualization state) in `sessionStorage` or a global store before navigating away. On mount, restore it." },
                        { q: "What is Cumulative Layout Shift (CLS)?", a: "A metric that measures how much the page content shifts unexpectedly. Prevent it by setting fixed aspect ratios for images (`aspect-ratio: 16/9`) before they load." }
                    ]
                }
            },
            {
                day: 24,
                title: 'System Design: Real-time Chat (WhatsApp)',
                intro: "Handling optimistic updates, message queues, and offline synchronization in a chat application.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 The Challenge</h3>
<p class="mb-4 text-light-300">A chat app needs to feel <i>instant</i>, even on slow networks.</p>

<h3 class="text-xl font-bold text-white mb-4">🚀 1. Optimistic UI</h3>
<p class="mb-4 text-light-300">When user sends a message:</p>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
    <li>Generate a temporary ID (e.g., <code>Date.now()</code>)</li>
    <li>Add message to UI immediately with status "Sending..."</li>
    <li>Send API request</li>
    <li>On success, replace temp ID with server ID and status "Sent"</li>
    <li>On fail, show "Retry" button</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">📬 2. Message Queue</h3>
<p class="mb-4 text-light-300">If offline, messages shouldn't fail. They should go into a <strong>Persistent Queue</strong> (LocalStorage / IndexedDB). The app retries sending them when connection returns.</p>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════╗
║            💬 OPTIMISTIC CHAT DEMO                           ║
║      Local ID generation + Status tracking                   ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   STATES:                                                    ║
║   1. pending: Shown locally, not sent yet                    ║
║   2. sent: Confirmed by server                               ║
║   3. error: Failed to send                                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function ChatApp() {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Optimistic Update
    const tempId = Date.now();
    const newMsg = { 
      id: tempId, 
      text: input, 
      status: 'pending' // ⏳
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // 2. Network Request Simulation
    try {
      await new Promise((resolve, reject) => {
        // Randomly fail to demonstrate error state
        setTimeout(() => Math.random() > 0.3 ? resolve() : reject(), 1000);
      });

      // 3. Success: Update status to 'sent'
      setMessages(prev => prev.map(m => 
        m.id === tempId ? { ...m, status: 'sent' } : m
      ));
    } catch (err) {
      // 4. Error: Update status to 'error'
      setMessages(prev => prev.map(m => 
        m.id === tempId ? { ...m, status: 'error' } : m
      ));
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ 
        height: '300px', 
        border: '1px solid #e2e8f0', 
        borderRadius: '12px',
        padding: '15px',
        overflowY: 'auto',
        background: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {messages.length === 0 && <p style={{ textAlign: 'center', color: '#ccc' }}>No messages yet</p>}
        
        {messages.map(msg => (
          <div key={msg.id} style={{ 
            alignSelf: 'flex-end', 
            background: msg.status === 'error' ? '#fee2e2' : '#3b82f6',
            color: msg.status === 'error' ? '#ef4444' : 'white',
            padding: '8px 12px',
            borderRadius: '12px 12px 0 12px',
            opacity: msg.status === 'pending' ? 0.7 : 1,
            position: 'relative',
            border: msg.status === 'error' ? '1px solid #ef4444' : 'none'
          }}>
            {msg.text}
            <span style={{ fontSize: '10px', display: 'block', textAlign: 'right', marginTop: '4px', opacity: 0.8 }}>
              {msg.status === 'pending' && '⏳'}
              {msg.status === 'sent' && '✅'}
              {msg.status === 'error' && '❌ Failed'}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
        />
        <button style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0 20px', borderRadius: '8px', cursor: 'pointer' }}>
          Send
        </button>
      </form>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Wait for Server
async function send() {
  setLoading(true);
  await api.send(msg); // UI freezes or does nothing
  setLoading(false);
  setMessages(prev => [...prev, msg]); // Message appears 1s later
}`,
                    senior: `// ✅ Optimistic UI
setMessages(prev => [...prev, optimisticMsg]); // Instant!
api.send(msg).catch(() => showError()); // Handle failure later`
                },
                interview: {
                    questions: [
                        { q: "How to ensure message ordering?", a: "The server assigns a timestamp or incremental ID. The client sorts by this ID. For optimistic messages, place them at the bottom until confirmed." },
                        { q: "How to handle offline mode?", a: "Use `navigator.onLine` to detect status. Store requests in IndexedDB. Use a 'Sync Manager' (Service Worker) to flush the queue when back online." }
                    ]
                }
            },
            {
                day: 23,
                title: 'Machine Coding: Build Autocomplete from Scratch',
                intro: "The #1 frontend interview problem. Build a production-grade typeahead with debouncing, keyboard navigation, and caching.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Build</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Full autocomplete/typeahead component</li>
    <li>Debounced API calls (no API spam)</li>
    <li>Keyboard navigation (Arrow keys + Enter)</li>
    <li>Click-outside-to-close behavior</li>
    <li>Results caching for performance</li>
    <li>Loading and error states</li>
</ul>

<div class="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
    <h4 class="text-yellow-400 font-bold mb-2">⚠️ Interview Reality Check</h4>
    <p class="text-light-300">This exact problem is asked at Google, Meta, Amazon, and every top startup. You MUST be able to build this in 45 minutes.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ Key Concepts</h3>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">1. Debouncing: Don't Spam the API</h4>
<p class="mb-4 text-light-300">Wait for the user to stop typing before making a request.</p>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}</pre>
</div>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">2. Keyboard Navigation: A11y Matters</h4>
<p class="mb-4 text-light-300">Track the highlighted index and respond to key events.</p>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">3. Caching: Don't Re-fetch</h4>
<p class="mb-4 text-light-300">Store previous results in a Map or object to avoid duplicate requests.</p>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔍 PRODUCTION AUTOCOMPLETE / TYPEAHEAD                              ║
║  The #1 Frontend Interview Question - Build it in 45 minutes!        ║
╠══════════════════════════════════════════════════════════════════════╣
║  FEATURES:                                                           ║
║  ✅ Debounced API calls (300ms)                                      ║
║  ✅ Keyboard navigation (↑↓ + Enter)                                 ║
║  ✅ Click outside to close                                           ║
║  ✅ Results caching                                                  ║
║  ✅ Loading & error states                                           ║
║  ✅ Highlight matching text                                          ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 🪝 CUSTOM HOOK: useDebounce
// ═══════════════════════════════════════════════════════════════════
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ═══════════════════════════════════════════════════════════════════
// 🪝 CUSTOM HOOK: useClickOutside
// ═══════════════════════════════════════════════════════════════════
function useClickOutside(ref, handler) {
  React.useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

// ═══════════════════════════════════════════════════════════════════
// 📦 MOCK API (Replace with real API in production)
// ═══════════════════════════════════════════════════════════════════
const MOCK_DATA = [
  'JavaScript', 'Java', 'Python', 'TypeScript', 'PHP', 
  'C++', 'C#', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
  'React', 'Redux', 'Angular', 'Vue', 'Svelte', 'Next.js'
];

const searchAPI = async (query) => {
  await new Promise(r => setTimeout(r, 200 + Math.random() * 300)); // Simulate latency
  if (Math.random() < 0.05) throw new Error('API Error'); // 5% chance of error
  return MOCK_DATA.filter(item => 
    item.toLowerCase().includes(query.toLowerCase())
  );
};

// ═══════════════════════════════════════════════════════════════════
// 🧩 HIGHLIGHT COMPONENT
// ═══════════════════════════════════════════════════════════════════
function HighlightMatch({ text, query }) {
  if (!query) return <span>{text}</span>;
  
  const regex = new RegExp(\`(\${query})\`, 'gi');
  const parts = text.split(regex);
  
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) 
          ? <mark key={i} style={{ background: '#fef08a', padding: '0 2px' }}>{part}</mark>
          : part
      )}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 🔍 MAIN AUTOCOMPLETE COMPONENT
// ═══════════════════════════════════════════════════════════════════
function Autocomplete() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  
  const containerRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const cache = React.useRef(new Map());
  
  const debouncedQuery = useDebounce(query, 300);
  
  useClickOutside(containerRef, () => setIsOpen(false));

  // ═══════════════════════════════════════════════════════════════
  // 🔄 FETCH RESULTS (with caching)
  // ═══════════════════════════════════════════════════════════════
  React.useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      // Check cache first!
      if (cache.current.has(debouncedQuery)) {
        setResults(cache.current.get(debouncedQuery));
        setIsOpen(true);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const data = await searchAPI(debouncedQuery);
        cache.current.set(debouncedQuery, data); // Cache it!
        setResults(data);
        setIsOpen(true);
      } catch (err) {
        setError('Failed to fetch results. Try again.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  // ═══════════════════════════════════════════════════════════════
  // ⌨️ KEYBOARD NAVIGATION
  // ═══════════════════════════════════════════════════════════════
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && results[highlightedIndex]) {
          selectItem(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const selectItem = (item) => {
    setQuery(item);
    setIsOpen(false);
    setHighlightedIndex(-1);
    console.log('Selected:', item); // In real app, call onSelect prop
  };

  // ═══════════════════════════════════════════════════════════════
  // 🎨 RENDER
  // ═══════════════════════════════════════════════════════════════
  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px', maxWidth: '400px' }}>
      <h3 style={{ marginBottom: '15px' }}>🔍 Autocomplete Demo</h3>
      
      <div ref={containerRef} style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightedIndex(-1);
          }}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search programming languages..."
          style={{
            width: '100%',
            padding: '12px 40px 12px 16px',
            fontSize: '16px',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
          aria-expanded={isOpen}
        />
        
        {isLoading && (
          <span style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94a3b8'
          }}>⏳</span>
        )}

        {/* Dropdown */}
        {isOpen && (
          <ul
            id="autocomplete-list"
            role="listbox"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              margin: '4px 0 0 0',
              padding: 0,
              listStyle: 'none',
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              maxHeight: '250px',
              overflowY: 'auto',
              zIndex: 1000
            }}
          >
            {error && (
              <li style={{ padding: '12px', color: '#ef4444' }}>⚠️ {error}</li>
            )}
            
            {!error && results.length === 0 && (
              <li style={{ padding: '12px', color: '#94a3b8' }}>No results found</li>
            )}
            
            {results.map((item, index) => (
              <li
                key={item}
                role="option"
                aria-selected={index === highlightedIndex}
                onClick={() => selectItem(item)}
                onMouseEnter={() => setHighlightedIndex(index)}
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  background: index === highlightedIndex ? '#f1f5f9' : 'transparent',
                  borderBottom: index < results.length - 1 ? '1px solid #f1f5f9' : 'none'
                }}
              >
                <HighlightMatch text={item} query={query} />
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <p style={{ fontSize: '12px', color: '#64748b', marginTop: '10px' }}>
        Try: "java", "react", "python" | Use ↑↓ keys + Enter
      </p>
    </div>
  );
}

function App() {
  return <Autocomplete />;
}`,
                comparison: {
                    junior: `// ❌ No debouncing, laggy
const [query, setQuery] = useState('');

useEffect(() => {
  fetch('/api/search?q=' + query) // Called on EVERY keystroke!
    .then(r => r.json())
    .then(setResults);
}, [query]);`,
                    senior: `// ✅ Debounced + Cached
const debouncedQuery = useDebounce(query, 300);
const cache = useRef(new Map());

useEffect(() => {
  if (cache.current.has(debouncedQuery)) {
    return setResults(cache.current.get(debouncedQuery));
  }
  fetch('/api/search?q=' + debouncedQuery)
    .then(r => r.json())
    .then(data => {
      cache.current.set(debouncedQuery, data);
      setResults(data);
    });
}, [debouncedQuery]);`
                },
                interview: {
                    questions: [
                        { q: "Why debounce instead of throttle for autocomplete?", a: "Debounce waits until the user STOPS typing for X ms, then fires once. Throttle fires every X ms while typing. For search, we want the final query, not intermediate ones. Debounce = better UX and fewer API calls." },
                        { q: "How would you handle race conditions with async search?", a: "Use an AbortController to cancel previous requests, or track request IDs. Only update state if the response matches the current query. Libraries like TanStack Query handle this automatically." },
                        { q: "How do you make autocomplete accessible?", a: "Use ARIA attributes: aria-autocomplete, aria-expanded, aria-controls, aria-selected, role='listbox' and role='option'. Ensure keyboard navigation works (↑↓ Enter Escape). Announce changes to screen readers." }
                    ]
                }
            },
            {
                day: 24,
                title: 'Machine Coding: Infinite Scroll with Virtualization',
                intro: "Render 10,000 items without killing the browser. Master Intersection Observer, windowing, and virtual lists.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Build</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Infinite scroll with Intersection Observer</li>
    <li>Virtual list (only render visible items)</li>
    <li>Smooth scrolling with overscan</li>
    <li>Dynamic row heights (advanced)</li>
</ul>

<div class="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 p-4 rounded-xl mb-6">
    <h4 class="text-red-400 font-bold mb-2">🚨 The Problem</h4>
    <p class="text-light-300">Rendering 10,000 DOM nodes = Laggy scrolling, high memory, crashed tabs. The solution? <strong>Only render what's visible.</strong></p>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ Key Concepts</h3>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">1. Intersection Observer</h4>
<p class="mb-4 text-light-300">Detects when an element enters or leaves the viewport. No scroll event listeners needed.</p>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">2. Windowing / Virtualization</h4>
<p class="mb-4 text-light-300">Calculate which items are visible based on scroll position and container height, then render only those + a few extra (overscan).</p>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">3. Libraries (for production)</h4>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><code>@tanstack/react-virtual</code> - Modern, lightweight</li>
    <li><code>react-window</code> - Popular, battle-tested</li>
    <li><code>react-virtuoso</code> - Best for dynamic heights</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  📜 INFINITE SCROLL + VIRTUALIZATION                                 ║
║  Render 10,000 items without killing the browser!                    ║
╠══════════════════════════════════════════════════════════════════════╣
║  PART 1: Infinite Scroll with Intersection Observer                  ║
║  PART 2: Basic Virtualized List (DIY)                                ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 🪝 CUSTOM HOOK: useIntersectionObserver
// ═══════════════════════════════════════════════════════════════════
function useIntersectionObserver(callback, options = {}) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback, options]);

  return ref;
}

// ═══════════════════════════════════════════════════════════════════
// 📦 MOCK API - Simulate paginated data
// ═══════════════════════════════════════════════════════════════════
const fetchPage = async (page, pageSize = 20) => {
  await new Promise(r => setTimeout(r, 500)); // Simulate network
  const start = page * pageSize;
  return Array.from({ length: pageSize }, (_, i) => ({
    id: start + i,
    title: \`Item #\${start + i + 1}\`,
    description: \`This is the description for item \${start + i + 1}. It contains some sample text.\`
  }));
};

// ═══════════════════════════════════════════════════════════════════
// 📜 PART 1: INFINITE SCROLL (Simple)
// ═══════════════════════════════════════════════════════════════════
function InfiniteScrollList() {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const loadMore = React.useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    const newItems = await fetchPage(page);
    
    if (newItems.length === 0) {
      setHasMore(false);
    } else {
      setItems(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
    }
    setIsLoading(false);
  }, [page, isLoading, hasMore]);

  // Load initial data
  React.useEffect(() => { loadMore(); }, []);

  // Intersection Observer for infinite scroll trigger
  const loaderRef = useIntersectionObserver(loadMore);

  return (
    <div style={{ height: '300px', overflow: 'auto', border: '1px solid #ddd', borderRadius: '8px' }}>
      {items.map(item => (
        <div key={item.id} style={{ 
          padding: '15px', 
          borderBottom: '1px solid #eee',
          background: item.id % 2 === 0 ? '#f8fafc' : 'white'
        }}>
          <strong>{item.title}</strong>
          <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#666' }}>{item.description}</p>
        </div>
      ))}
      
      {/* Sentinel element - when visible, triggers loadMore */}
      <div ref={loaderRef} style={{ padding: '20px', textAlign: 'center' }}>
        {isLoading && '⏳ Loading more...'}
        {!hasMore && '✅ No more items'}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 🚀 PART 2: VIRTUALIZED LIST (Advanced)
// ═══════════════════════════════════════════════════════════════════
function VirtualizedList({ items, itemHeight = 60, containerHeight = 300, overscan = 5 }) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const containerRef = React.useRef(null);

  // Calculate visible range
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleCount = Math.ceil(containerHeight / itemHeight) + (2 * overscan);
  const endIndex = Math.min(items.length, startIndex + visibleCount);
  
  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: containerHeight,
        overflow: 'auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        position: 'relative'
      }}
    >
      {/* Spacer to maintain scroll height */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {/* Rendered items positioned absolutely */}
        <div style={{ position: 'absolute', top: offsetY, left: 0, right: 0 }}>
          {visibleItems.map((item, index) => (
            <div
              key={item.id}
              style={{
                height: itemHeight,
                padding: '10px 15px',
                boxSizing: 'border-box',
                borderBottom: '1px solid #eee',
                background: (startIndex + index) % 2 === 0 ? '#f0fdf4' : 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span style={{ 
                background: '#10b981', 
                color: 'white', 
                padding: '4px 8px', 
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                #{item.id}
              </span>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Debug info */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        background: '#1e293b',
        color: '#94a3b8',
        padding: '8px',
        fontSize: '11px',
        textAlign: 'center'
      }}>
        Rendering {visibleItems.length} of {items.length} items | 
        Visible: {startIndex}-{endIndex}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 APP: Demo Both Approaches
// ═══════════════════════════════════════════════════════════════════
function App() {
  const [tab, setTab] = React.useState('infinite');
  
  // Generate 10,000 items for virtualization demo
  const bigList = React.useMemo(() => 
    Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      title: \`Virtual Item #\${i + 1}\`
    })), 
  []);

  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px', maxWidth: '500px' }}>
      <h3>📜 Infinite Scroll vs Virtualization</h3>
      
      <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
        <button 
          onClick={() => setTab('infinite')}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            background: tab === 'infinite' ? '#3b82f6' : '#e2e8f0',
            color: tab === 'infinite' ? 'white' : '#333'
          }}
        >
          Infinite Scroll
        </button>
        <button 
          onClick={() => setTab('virtual')}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            background: tab === 'virtual' ? '#3b82f6' : '#e2e8f0',
            color: tab === 'virtual' ? 'white' : '#333'
          }}
        >
          Virtualized (10K items!)
        </button>
      </div>

      {tab === 'infinite' ? (
        <>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
            Scroll down to load more items automatically.
          </p>
          <InfiniteScrollList />
        </>
      ) : (
        <>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
            10,000 items rendered instantly! Only ~15 DOM nodes exist.
          </p>
          <VirtualizedList items={bigList} />
        </>
      )}
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Scroll event listener (bad)
window.addEventListener('scroll', () => {
  if (window.innerHeight + scrollY >= document.body.offsetHeight) {
    loadMore();
  }
});
// Problems: Fires 100x/sec, blocks main thread`,
                    senior: `// ✅ Intersection Observer
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) loadMore();
  },
  { threshold: 0.1 }
);
observer.observe(sentinelElement);
// Benefits: Browser-optimized, fires once per intersection`
                },
                interview: {
                    questions: [
                        { q: "What is the difference between infinite scroll and virtualization?", a: "Infinite scroll loads more data as you scroll (appends to DOM). Virtualization keeps the DOM small by only rendering visible items + overscan, regardless of total data size. Use infinite scroll for lazy loading, virtualization for huge lists." },
                        { q: "Why is Intersection Observer better than scroll events?", a: "Scroll events fire continuously (60+ times/sec), blocking the main thread. Intersection Observer is browser-optimized, batches callbacks, and only fires when visibility changes. It's also simpler to use." },
                        { q: "How do you handle dynamic row heights in virtualization?", a: "Measure each row after render and cache heights in a Map. Use a 'position' array that tracks cumulative heights. Libraries like react-virtuoso handle this automatically with 'estimatedItemSize' + real measurement." }
                    ]
                }
            },
            {
                day: 25,
                title: 'Machine Coding: Drag & Drop from Scratch',
                intro: "Build a Kanban board drag-and-drop system using native HTML5 APIs. No libraries.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Build</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Draggable items with visual feedback</li>
    <li>Drop zones with hover indicators</li>
    <li>Cross-container drag and drop (Kanban style)</li>
    <li>Reorder items within a list</li>
    <li>Touch device support (bonus)</li>
</ul>

<div class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-4 rounded-xl mb-6">
    <h4 class="text-purple-400 font-bold mb-2">💡 Interview Context</h4>
    <p class="text-light-300">Companies like Trello, Notion, Asana, and Jira all need drag-and-drop. This is a HIGH-VALUE skill.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ HTML5 Drag & Drop API</h3>
<table class="w-full text-left mb-6">
    <tr class="border-b border-dark-600">
        <td class="py-2 text-cyan-400 font-mono">draggable="true"</td>
        <td class="py-2 text-light-300">Makes element draggable</td>
    </tr>
    <tr class="border-b border-dark-600">
        <td class="py-2 text-cyan-400 font-mono">onDragStart</td>
        <td class="py-2 text-light-300">Fires when drag begins (set data here)</td>
    </tr>
    <tr class="border-b border-dark-600">
        <td class="py-2 text-cyan-400 font-mono">onDragOver</td>
        <td class="py-2 text-light-300">Fires while dragging over a zone (must preventDefault!)</td>
    </tr>
    <tr class="border-b border-dark-600">
        <td class="py-2 text-cyan-400 font-mono">onDrop</td>
        <td class="py-2 text-light-300">Fires when item is dropped</td>
    </tr>
    <tr>
        <td class="py-2 text-cyan-400 font-mono">onDragEnd</td>
        <td class="py-2 text-light-300">Fires when drag ends (cleanup)</td>
    </tr>
</table>

<h3 class="text-xl font-bold text-white mb-4">🔑 Critical: e.preventDefault()</h3>
<p class="mb-4 text-light-300">The browser's default behavior is to reject drops. You MUST call <code>e.preventDefault()</code> in <code>onDragOver</code> to allow dropping.</p>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🎯 DRAG & DROP KANBAN BOARD                                         ║
║  Built with native HTML5 APIs - No libraries!                        ║
╠══════════════════════════════════════════════════════════════════════╣
║  FEATURES:                                                           ║
║  ✅ Drag items between columns                                       ║
║  ✅ Visual feedback (drag ghost, drop indicators)                    ║
║  ✅ State updates on drop                                            ║
║  ✅ Reorder within same column                                       ║
╚══════════════════════════════════════════════════════════════════════╝
*/

const INITIAL_DATA = {
  columns: {
    todo: {
      id: 'todo',
      title: '📋 To Do',
      items: [
        { id: '1', content: 'Learn React DnD' },
        { id: '2', content: 'Build Kanban Board' },
        { id: '3', content: 'Add animations' }
      ]
    },
    progress: {
      id: 'progress',
      title: '🔄 In Progress',
      items: [
        { id: '4', content: 'Review drag events' }
      ]
    },
    done: {
      id: 'done',
      title: '✅ Done',
      items: [
        { id: '5', content: 'Setup project' }
      ]
    }
  },
  columnOrder: ['todo', 'progress', 'done']
};

// ═══════════════════════════════════════════════════════════════════
// 🧩 DRAGGABLE ITEM COMPONENT
// ═══════════════════════════════════════════════════════════════════
function DraggableItem({ item, columnId, index, onDragStart, onDragEnd }) {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    // Store the item data for the drop handler
    e.dataTransfer.setData('application/json', JSON.stringify({
      itemId: item.id,
      sourceColumnId: columnId,
      sourceIndex: index
    }));
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd?.();
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        padding: '12px',
        marginBottom: '8px',
        background: isDragging ? '#dbeafe' : 'white',
        borderRadius: '8px',
        boxShadow: isDragging 
          ? '0 8px 16px rgba(59, 130, 246, 0.3)' 
          : '0 1px 3px rgba(0,0,0,0.1)',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        border: '1px solid #e2e8f0',
        transition: 'box-shadow 0.2s, opacity 0.2s'
      }}
    >
      {item.content}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 📦 DROPPABLE COLUMN COMPONENT
// ═══════════════════════════════════════════════════════════════════
function DroppableColumn({ column, onDrop }) {
  const [isOver, setIsOver] = React.useState(false);

  // ⚠️ CRITICAL: Must preventDefault to allow drop!
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    onDrop(data.itemId, data.sourceColumnId, column.id);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        flex: 1,
        minWidth: '200px',
        padding: '12px',
        background: isOver ? '#dbeafe' : '#f1f5f9',
        borderRadius: '12px',
        border: isOver ? '2px dashed #3b82f6' : '2px solid transparent',
        transition: 'background 0.2s, border 0.2s',
        minHeight: '300px'
      }}
    >
      <h3 style={{ 
        marginTop: 0, 
        marginBottom: '15px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#334155'
      }}>
        {column.title}
        <span style={{ 
          marginLeft: '8px',
          background: '#cbd5e1',
          padding: '2px 8px',
          borderRadius: '10px',
          fontSize: '12px'
        }}>
          {column.items.length}
        </span>
      </h3>
      
      {column.items.map((item, index) => (
        <DraggableItem 
          key={item.id} 
          item={item} 
          columnId={column.id}
          index={index}
        />
      ))}
      
      {column.items.length === 0 && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          color: '#94a3b8',
          fontSize: '14px'
        }}>
          Drop items here
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 MAIN KANBAN BOARD
// ═══════════════════════════════════════════════════════════════════
function KanbanBoard() {
  const [data, setData] = React.useState(INITIAL_DATA);

  const handleDrop = (itemId, sourceColumnId, targetColumnId) => {
    if (sourceColumnId === targetColumnId) return; // Same column, no change
    
    setData(prev => {
      const newColumns = { ...prev.columns };
      
      // Find and remove item from source
      const sourceColumn = { ...newColumns[sourceColumnId] };
      const itemIndex = sourceColumn.items.findIndex(i => i.id === itemId);
      const [movedItem] = sourceColumn.items.splice(itemIndex, 1);
      newColumns[sourceColumnId] = { ...sourceColumn, items: [...sourceColumn.items] };
      
      // Add item to target
      const targetColumn = { ...newColumns[targetColumnId] };
      newColumns[targetColumnId] = { 
        ...targetColumn, 
        items: [...targetColumn.items, movedItem] 
      };
      
      return { ...prev, columns: newColumns };
    });
  };

  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>🎯 Kanban Drag & Drop</h2>
      
      <div style={{ 
        display: 'flex', 
        gap: '16px',
        overflowX: 'auto',
        paddingBottom: '10px'
      }}>
        {data.columnOrder.map(columnId => (
          <DroppableColumn
            key={columnId}
            column={data.columns[columnId]}
            onDrop={handleDrop}
          />
        ))}
      </div>
      
      <p style={{ marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
        💡 Drag items between columns. Uses native HTML5 Drag & Drop API.
      </p>
    </div>
  );
}

function App() {
  return <KanbanBoard />;
}`,
                comparison: {
                    junior: `// ❌ Forgetting preventDefault
onDragOver={(e) => {
  // Nothing here - drops won't work!
}}`,
                    senior: `// ✅ Allow drops + visual feedback
onDragOver={(e) => {
  e.preventDefault(); // REQUIRED!
  e.dataTransfer.dropEffect = 'move';
  setIsOver(true);
}}`
                },
                interview: {
                    questions: [
                        { q: "Why must you call e.preventDefault() in onDragOver?", a: "The browser's default behavior is to reject all drops. Without preventDefault(), the onDrop event will never fire. This is the #1 mistake developers make with drag-and-drop." },
                        { q: "How do you pass data during drag operations?", a: "Use e.dataTransfer.setData('type', data) in onDragStart, and e.dataTransfer.getData('type') in onDrop. For complex data, stringify JSON. The dataTransfer object is the bridge between drag and drop." },
                        { q: "When would you use a library like dnd-kit or react-beautiful-dnd instead of native APIs?", a: "Use libraries when you need: sortable lists with reorder animations, touch/mobile support, complex nested drop zones, accessibility (ARIA), or keyboard drag support. Native API is fine for simple cross-container moves." }
                    ]
                }
            },
            {
                day: 26,
                title: 'Custom Hooks Mastery: 10 Production Hooks',
                intro: "Build your own hook library. useDebounce, useThrottle, useLocalStorage, usePrevious, and more.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 Hooks You'll Build</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
    <li><code>useDebounce</code> - Delay value updates</li>
    <li><code>useThrottle</code> - Limit update frequency</li>
    <li><code>useLocalStorage</code> - Persist state to localStorage</li>
    <li><code>usePrevious</code> - Access previous render's value</li>
    <li><code>useToggle</code> - Boolean state with toggle function</li>
    <li><code>useClickOutside</code> - Detect clicks outside element</li>
    <li><code>useWindowSize</code> - Track window dimensions</li>
    <li><code>useMediaQuery</code> - CSS media query as state</li>
    <li><code>useFetch</code> - Data fetching with loading/error</li>
    <li><code>useKeyPress</code> - Detect keyboard shortcuts</li>
</ol>

<div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 p-4 rounded-xl mb-6">
    <h4 class="text-green-400 font-bold mb-2">🏆 Why Build Custom Hooks?</h4>
    <p class="text-light-300">Custom hooks show senior-level React understanding. They demonstrate ability to abstract complexity, follow DRY principles, and create reusable code.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ Hook Rules Reminder</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Only call hooks at the top level (no conditions/loops)</li>
    <li>Only call hooks from React functions</li>
    <li>Name must start with <code>use</code></li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🪝 CUSTOM HOOKS LIBRARY                                              ║
║  10 Production-Ready Hooks Every Senior Dev Should Know              ║
╠══════════════════════════════════════════════════════════════════════╣
║  1. useDebounce      6. useClickOutside                              ║
║  2. useThrottle      7. useWindowSize                                ║
║  3. useLocalStorage  8. useMediaQuery                                ║
║  4. usePrevious      9. useFetch                                     ║
║  5. useToggle       10. useKeyPress                                  ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ useDebounce - Delay value updates
// ═══════════════════════════════════════════════════════════════════
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ useThrottle - Limit update frequency
// ═══════════════════════════════════════════════════════════════════
function useThrottle(value, limit = 300) {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastRan = React.useRef(Date.now());

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ useLocalStorage - Persist state
// ═══════════════════════════════════════════════════════════════════
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// ═══════════════════════════════════════════════════════════════════
// 4️⃣ usePrevious - Access previous value
// ═══════════════════════════════════════════════════════════════════
function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// ═══════════════════════════════════════════════════════════════════
// 5️⃣ useToggle - Boolean with toggle
// ═══════════════════════════════════════════════════════════════════
function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// ═══════════════════════════════════════════════════════════════════
// 6️⃣ useClickOutside - Detect outside clicks
// ═══════════════════════════════════════════════════════════════════
function useClickOutside(ref, handler) {
  React.useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// ═══════════════════════════════════════════════════════════════════
// 7️⃣ useWindowSize - Track dimensions
// ═══════════════════════════════════════════════════════════════════
function useWindowSize() {
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  React.useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// ═══════════════════════════════════════════════════════════════════
// 8️⃣ useMediaQuery - CSS media query as state
// ═══════════════════════════════════════════════════════════════════
function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(
    () => window.matchMedia(query).matches
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// ═══════════════════════════════════════════════════════════════════
// 9️⃣ useFetch - Data fetching
// ═══════════════════════════════════════════════════════════════════
function useFetch(url) {
  const [state, setState] = React.useState({
    data: null,
    isLoading: true,
    error: null
  });

  React.useEffect(() => {
    const controller = new AbortController();
    
    setState({ data: null, isLoading: true, error: null });
    
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(data => setState({ data, isLoading: false, error: null }))
      .catch(error => {
        if (error.name !== 'AbortError') {
          setState({ data: null, isLoading: false, error });
        }
      });

    return () => controller.abort();
  }, [url]);

  return state;
}

// ═══════════════════════════════════════════════════════════════════
// 🔟 useKeyPress - Detect key press
// ═══════════════════════════════════════════════════════════════════
function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = React.useState(false);

  React.useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) setKeyPressed(true);
    };
    const upHandler = ({ key }) => {
      if (key === targetKey) setKeyPressed(false);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 DEMO APP
// ═══════════════════════════════════════════════════════════════════
function App() {
  // Demo: useDebounce
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  // Demo: useLocalStorage
  const [name, setName] = useLocalStorage('user-name', 'Guest');
  
  // Demo: useToggle
  const [isDark, toggleDark] = useToggle(false);
  
  // Demo: usePrevious
  const [count, setCount] = React.useState(0);
  const prevCount = usePrevious(count);
  
  // Demo: useWindowSize
  const { width, height } = useWindowSize();
  
  // Demo: useMediaQuery
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Demo: useKeyPress
  const escPressed = useKeyPress('Escape');

  return (
    <div style={{ 
      fontFamily: 'system-ui', 
      padding: '20px',
      background: isDark ? '#1e293b' : 'white',
      color: isDark ? 'white' : '#1e293b',
      minHeight: '100vh',
      transition: 'all 0.3s'
    }}>
      <h2>🪝 Custom Hooks Demo</h2>
      
      <div style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
        {/* useDebounce */}
        <section style={{ padding: '15px', background: isDark ? '#334155' : '#f1f5f9', borderRadius: '8px' }}>
          <h4>1. useDebounce</h4>
          <input 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
          <p style={{ fontSize: '14px', margin: '8px 0 0' }}>
            Typed: "{searchTerm}" | Debounced (500ms): "{debouncedSearch}"
          </p>
        </section>

        {/* useLocalStorage */}
        <section style={{ padding: '15px', background: isDark ? '#334155' : '#f1f5f9', borderRadius: '8px' }}>
          <h4>3. useLocalStorage</h4>
          <input 
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name..."
            style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
          <p style={{ fontSize: '14px', margin: '8px 0 0' }}>
            Refresh the page - your name persists! 💾
          </p>
        </section>

        {/* useToggle */}
        <section style={{ padding: '15px', background: isDark ? '#334155' : '#f1f5f9', borderRadius: '8px' }}>
          <h4>5. useToggle</h4>
          <button onClick={toggleDark} style={{ padding: '8px 16px' }}>
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </section>

        {/* usePrevious */}
        <section style={{ padding: '15px', background: isDark ? '#334155' : '#f1f5f9', borderRadius: '8px' }}>
          <h4>4. usePrevious</h4>
          <button onClick={() => setCount(c => c + 1)} style={{ padding: '8px 16px' }}>
            Increment ({count})
          </button>
          <p style={{ fontSize: '14px', margin: '8px 0 0' }}>
            Current: {count} | Previous: {prevCount ?? 'N/A'}
          </p>
        </section>

        {/* useWindowSize & useMediaQuery */}
        <section style={{ padding: '15px', background: isDark ? '#334155' : '#f1f5f9', borderRadius: '8px' }}>
          <h4>7 & 8. useWindowSize + useMediaQuery</h4>
          <p style={{ fontSize: '14px', margin: 0 }}>
            Window: {width} x {height} | 
            Device: {isMobile ? '📱 Mobile' : '💻 Desktop'}
          </p>
        </section>

        {/* useKeyPress */}
        <section style={{ padding: '15px', background: isDark ? '#334155' : '#f1f5f9', borderRadius: '8px' }}>
          <h4>10. useKeyPress</h4>
          <p style={{ fontSize: '14px', margin: 0 }}>
            Press <kbd style={{ background: '#ddd', padding: '2px 6px', borderRadius: '4px' }}>Escape</kbd>: 
            {escPressed ? ' ✅ Pressed!' : ' ⏳ Not pressed'}
          </p>
        </section>
      </div>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Inline debounce (broken)
useEffect(() => {
  setTimeout(() => {
    fetchResults(query); // No cleanup! Multiple timers!
  }, 300);
}, [query]);`,
                    senior: `// ✅ Proper debounce hook
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // Cleanup!
  }, [value, delay]);
  return debounced;
}`
                },
                interview: {
                    questions: [
                        { q: "What's the difference between debounce and throttle?", a: "Debounce waits until input STOPS for X ms, then fires once (good for search). Throttle fires at most once every X ms while input is active (good for scroll/resize). Debounce = final value, Throttle = regular updates." },
                        { q: "Why use useCallback in useToggle?", a: "The toggle function's identity never needs to change. useCallback with empty deps ensures the same function reference across renders, preventing unnecessary re-renders of children that receive toggle as a prop." },
                        { q: "How does useFetch handle race conditions?", a: "Using AbortController. When the URL changes, the cleanup function aborts the previous request before starting a new one. We also check for AbortError in the catch block to avoid setting error state for intentional aborts." }
                    ]
                }
            },
            {
                day: 27,
                title: 'React Testing: RTL & Vitest Mastery',
                intro: "Write tests that give confidence without testing implementation details. React Testing Library philosophy.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Testing philosophy: Test behavior, not implementation</li>
    <li>Setting up Vitest + React Testing Library</li>
    <li>Queries: getBy, findBy, queryBy</li>
    <li>User interactions with userEvent</li>
    <li>Mocking API calls</li>
    <li>Testing async components</li>
</ul>

<div class="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 p-4 rounded-xl mb-6">
    <h4 class="text-green-400 font-bold mb-2">🏆 Testing Library Philosophy</h4>
    <p class="text-light-300">"The more your tests resemble the way your software is used, the more confidence they can give you." - Kent C. Dodds</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ Setup Steps</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300"># Install dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Add to vite.config.js
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js'
  }
})

# Create setup.js
import '@testing-library/jest-dom';</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔍 Query Priority (Use in Order)</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
    <li><code>getByRole</code> - Accessible (best!)</li>
    <li><code>getByLabelText</code> - Form fields</li>
    <li><code>getByPlaceholderText</code> - Inputs</li>
    <li><code>getByText</code> - Non-interactive content</li>
    <li><code>getByTestId</code> - Last resort</li>
</ol>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🧪 REACT TESTING LIBRARY - COMPLETE GUIDE                           ║
║  Test behavior, not implementation!                                  ║
╠══════════════════════════════════════════════════════════════════════╣
║  Note: These tests would run in Vitest/Jest environment.             ║
║  This code demonstrates patterns and best practices.                 ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 📦 COMPONENT TO TEST: LoginForm
// ═══════════════════════════════════════════════════════════════════
function LoginForm({ onSubmit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    try {
      await onSubmit({ email, password });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Login form">
      <h2>Login</h2>
      
      {error && <div role="alert" style={{ color: 'red' }}>{error}</div>}
      
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>
      
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 🧪 TEST EXAMPLES (would go in LoginForm.test.jsx)
// ═══════════════════════════════════════════════════════════════════
/*
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  // ═══════════════════════════════════════════════════════════════
  // TEST 1: Renders correctly
  // ═══════════════════════════════════════════════════════════════
  it('renders email and password fields', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    
    // ✅ Best: Query by role (accessible)
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    
    // ✅ Good: Query by label
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    
    // ✅ Good: Query by role for button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  // ═══════════════════════════════════════════════════════════════
  // TEST 2: Shows validation error
  // ═══════════════════════════════════════════════════════════════
  it('shows error when fields are empty', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);
    
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    // ✅ Use getByRole('alert') for error messages
    expect(screen.getByRole('alert')).toHaveTextContent(/fill in all fields/i);
  });

  // ═══════════════════════════════════════════════════════════════
  // TEST 3: Submits with valid data
  // ═══════════════════════════════════════════════════════════════
  it('calls onSubmit with email and password', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<LoginForm onSubmit={mockSubmit} />);
    
    // Type in fields
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    
    // Submit
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    // Assert
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TEST 4: Shows loading state
  // ═══════════════════════════════════════════════════════════════
  it('disables button while loading', async () => {
    const user = userEvent.setup();
    // Mock that takes time to resolve
    const mockSubmit = vi.fn(() => new Promise(r => setTimeout(r, 100)));
    render(<LoginForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    // Button should show loading
    expect(screen.getByRole('button')).toHaveTextContent(/logging in/i);
    expect(screen.getByRole('button')).toBeDisabled();
    
    // Wait for completion
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent(/login/i);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TEST 5: Shows API error
  // ═══════════════════════════════════════════════════════════════
  it('displays error from failed submission', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn().mockRejectedValue(new Error('Invalid credentials'));
    render(<LoginForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrong');
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/invalid credentials/i);
    });
  });
});
*/

// ═══════════════════════════════════════════════════════════════════
// 🎮 INTERACTIVE DEMO
// ═══════════════════════════════════════════════════════════════════
function App() {
  const [result, setResult] = React.useState(null);
  
  const handleSubmit = async (data) => {
    // Simulate API
    await new Promise(r => setTimeout(r, 1000));
    if (data.password === 'wrong') {
      throw new Error('Invalid credentials');
    }
    setResult(\`✅ Logged in as \${data.email}\`);
  };

  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px', maxWidth: '400px' }}>
      <h3>🧪 React Testing Library Demo</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        This component demonstrates patterns for testable React components.
      </p>
      
      <div style={{ background: '#f1f5f9', padding: '20px', borderRadius: '8px' }}>
        <LoginForm onSubmit={handleSubmit} />
      </div>
      
      {result && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          background: '#dcfce7', 
          borderRadius: '8px' 
        }}>
          {result}
        </div>
      )}
      
      <div style={{ marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
        <strong>Test Tips:</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>Try empty fields → Shows validation error</li>
          <li>Try password "wrong" → Shows API error</li>
          <li>Valid email + password → Shows success</li>
        </ul>
      </div>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Testing implementation details
expect(component.state.isLoading).toBe(true);
expect(wrapper.find('.btn-loading')).toHaveLength(1);
// Breaks when you refactor CSS classes or state names`,
                    senior: `// ✅ Testing behavior
expect(screen.getByRole('button')).toBeDisabled();
expect(screen.getByRole('button')).toHaveTextContent(/loading/i);
// Works regardless of implementation`
                },
                interview: {
                    questions: [
                        { q: "What's the difference between getBy, findBy, and queryBy?", a: "getBy throws if not found (use when element should exist). queryBy returns null if not found (use to assert absence). findBy is async and waits (use for elements that appear after async operations)." },
                        { q: "Why prefer getByRole over getByTestId?", a: "getByRole tests accessibility - if the test passes, screen readers can find the element. getByTestId is implementation detail that doesn't verify accessibility. Only use testId as last resort." },
                        { q: "How do you test components that fetch data?", a: "Mock the fetch/axios at module level with vi.mock(). Use waitFor or findBy queries to wait for loading to complete. Assert on the final rendered state, not intermediate loading states." }
                    ]
                }
            },
            {
                day: 28,
                title: 'Performance Profiling & React DevTools Mastery',
                intro: "Find and fix performance bottlenecks. Profiler, Chrome DevTools, and why-did-you-render.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Master</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>React DevTools Profiler: Flame graphs & ranked charts</li>
    <li>Chrome DevTools: Performance tab & memory analysis</li>
    <li>why-did-you-render library setup</li>
    <li>Common performance anti-patterns</li>
    <li>useMemo, useCallback, memo - when to use</li>
</ul>

<div class="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 p-4 rounded-xl mb-6">
    <h4 class="text-orange-400 font-bold mb-2">⚠️ Premature Optimization Warning</h4>
    <p class="text-light-300">"Don't optimize what you haven't measured." Always profile FIRST, then optimize. Most apps don't need memo() everywhere.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ Setup why-did-you-render</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300"># Install
npm install @welldone-software/why-did-you-render

# Create wdyr.js (import BEFORE React!)
import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
  trackAllPureComponents: true,
});

# Import in index.js FIRST LINE
import './wdyr';</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔍 React DevTools Profiler</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
    <li>Open DevTools → Profiler tab</li>
    <li>Click Record → Interact with app → Stop</li>
    <li>Read the flame graph: wider bars = slower</li>
    <li>Gray bars = didn't re-render (good!)</li>
    <li>Click component → See "Why did this render?"</li>
</ol>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔬 REACT PERFORMANCE PROFILING                                       ║
║  Find bottlenecks, fix them, verify improvement                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  This demo shows common performance anti-patterns and fixes          ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// ❌ ANTI-PATTERN 1: Inline objects cause re-renders
// ═══════════════════════════════════════════════════════════════════
function BadComponent({ items }) {
  return (
    <div>
      {items.map(item => (
        // ❌ New object on every render!
        <ChildComponent 
          key={item.id}
          style={{ color: 'red', padding: 10 }}  // New object each time!
          onClick={() => console.log(item)}       // New function each time!
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ✅ FIX: Move objects outside or memoize
// ═══════════════════════════════════════════════════════════════════
const itemStyle = { color: 'red', padding: 10 }; // Stable reference

function GoodComponent({ items }) {
  const handleClick = React.useCallback((item) => {
    console.log(item);
  }, []);

  return (
    <div>
      {items.map(item => (
        <ChildComponent 
          key={item.id}
          style={itemStyle}
          onClick={() => handleClick(item)}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ❌ ANTI-PATTERN 2: Expensive calculations on every render
// ═══════════════════════════════════════════════════════════════════
function BadFilteredList({ items, filter }) {
  // ❌ Runs on EVERY render, even if items/filter didn't change
  const filtered = items.filter(i => i.name.includes(filter));
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
  
  return <List items={sorted} />;
}

// ═══════════════════════════════════════════════════════════════════
// ✅ FIX: useMemo for expensive calculations
// ═══════════════════════════════════════════════════════════════════
function GoodFilteredList({ items, filter }) {
  // ✅ Only recalculates when items or filter change
  const sortedFiltered = React.useMemo(() => {
    const filtered = items.filter(i => i.name.includes(filter));
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [items, filter]);
  
  return <List items={sortedFiltered} />;
}

// ═══════════════════════════════════════════════════════════════════
// 📦 MEMOIZED CHILD COMPONENT
// ═══════════════════════════════════════════════════════════════════
const ExpensiveChild = React.memo(function ExpensiveChild({ data, onClick }) {
  console.log('ExpensiveChild rendered');
  
  // Simulate expensive render
  const result = React.useMemo(() => {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) sum += i;
    return sum;
  }, []);

  return (
    <div 
      onClick={onClick}
      style={{ 
        padding: '10px', 
        margin: '5px', 
        background: '#e0f2fe',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      {data.name} (computed: {result})
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// 🎮 DEMO: Toggle between optimized and unoptimized
// ═══════════════════════════════════════════════════════════════════
function App() {
  const [count, setCount] = React.useState(0);
  const [isOptimized, setIsOptimized] = React.useState(true);
  const [renderCount, setRenderCount] = React.useState(0);

  // Track renders
  React.useEffect(() => {
    setRenderCount(c => c + 1);
  });

  // ❌ Unoptimized callback
  const badHandleClick = () => console.log('clicked');
  
  // ✅ Optimized callback
  const goodHandleClick = React.useCallback(() => console.log('clicked'), []);

  // Sample data
  const items = React.useMemo(() => [
    { id: 1, name: 'Item A' },
    { id: 2, name: 'Item B' },
    { id: 3, name: 'Item C' }
  ], []);

  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px' }}>
      <h3>🔬 Performance Profiling Demo</h3>
      
      <div style={{ 
        background: '#fef3c7', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          <strong>Render Count:</strong> {renderCount} | 
          <strong> Mode:</strong> {isOptimized ? '✅ Optimized' : '❌ Unoptimized'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Increment Counter ({count})
        </button>
        
        <button 
          onClick={() => setIsOptimized(!isOptimized)}
          style={{ 
            padding: '10px 20px', 
            cursor: 'pointer',
            background: isOptimized ? '#22c55e' : '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px'
          }}
        >
          Toggle Optimization
        </button>
      </div>

      <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
        Click "Increment Counter" and watch the console. 
        In unoptimized mode, children re-render unnecessarily.
      </p>

      <div style={{ 
        background: '#f8fafc', 
        padding: '15px', 
        borderRadius: '8px' 
      }}>
        {items.map(item => (
          <ExpensiveChild
            key={item.id}
            data={item}
            onClick={isOptimized ? goodHandleClick : badHandleClick}
          />
        ))}
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        background: '#1e293b', 
        color: '#94a3b8',
        borderRadius: '8px',
        fontSize: '13px'
      }}>
        <strong style={{ color: '#22d3ee' }}>📊 Open DevTools Console</strong>
        <br />
        When optimized, children don't log "rendered" on counter change.
        <br /><br />
        <strong style={{ color: '#22d3ee' }}>🔥 Why?</strong>
        <br />
        Unoptimized: badHandleClick is a new function each render → breaks memo()
        <br />
        Optimized: goodHandleClick is stable via useCallback → memo() works!
      </div>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ Memoize everything "just in case"
const MegaMemoized = React.memo(({ name }) => {
  const style = useMemo(() => ({ color: 'red' }), []);
  const click = useCallback(() => {}, []);
  // 100 lines of useMemo and useCallback...
});`,
                    senior: `// ✅ Profile first, optimize bottlenecks
// Step 1: Profile with DevTools
// Step 2: Find slow components (> 16ms)
// Step 3: Fix ONLY those
const SlowList = React.memo(({ items }) => {
  // Only memoize expensive operations
  const sorted = useMemo(() => expensiveSort(items), [items]);
  return <VirtualizedList items={sorted} />;
});`
                },
                interview: {
                    questions: [
                        { q: "When should you NOT use React.memo?", a: "When the component is cheap to render, when props change frequently anyway, when the component always renders with different props, or when you haven't profiled and confirmed there's a problem. Memo has overhead too." },
                        { q: "What causes 'wasted renders' in React?", a: "Parent re-renders (children re-render by default), new object/array/function references in props, context value changes, state updates that don't affect UI. Use Profiler's 'Why did this render?' to diagnose." },
                        { q: "How do you fix a slow component that renders frequently?", a: "1) Profile to confirm it's slow. 2) Check for expensive calculations → useMemo. 3) Check for unnecessary re-renders → memo() + stable props. 4) Consider virtualization for long lists. 5) Code-split if it's large." }
                    ]
                }
            },
            {
                day: 29,
                title: 'Machine Coding: Modal & Toast System',
                intro: "Build a professional modal and toast notification system with portals, animations, and accessibility.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Build</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Modal component with React Portal</li>
    <li>Focus trap for accessibility</li>
    <li>Toast notification system with queue</li>
    <li>Auto-dismiss with progress bar</li>
    <li>Multiple toast types (success, error, warning)</li>
    <li>Smooth enter/exit animations</li>
</ul>

<div class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 p-4 rounded-xl mb-6">
    <h4 class="text-blue-400 font-bold mb-2">💡 Why Portals?</h4>
    <p class="text-light-300">Modals need to render at the top of the DOM (to escape overflow:hidden, z-index issues). React Portals let you render children into a different DOM node while keeping React's event bubbling.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ Key Concepts</h3>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">1. React Portal</h4>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">ReactDOM.createPortal(
  children,
  document.getElementById('modal-root')
)</pre>
</div>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">2. Focus Trap</h4>
<p class="mb-4 text-light-300">Keep focus inside the modal. When Tab reaches the last element, loop back to the first. Close on Escape key.</p>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">3. Toast Queue Pattern</h4>
<p class="mb-4 text-light-300">Use Context + Reducer to manage a queue of toasts. New toasts push to array, auto-dismiss removes after timeout.</p>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔔 MODAL & TOAST NOTIFICATION SYSTEM                                ║
║  Production-ready with accessibility & animations                    ║
╠══════════════════════════════════════════════════════════════════════╣
║  PART 1: Modal with Portal & Focus Trap                              ║
║  PART 2: Toast Notification System                                   ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 📦 PART 1: MODAL COMPONENT
// ═══════════════════════════════════════════════════════════════════
function Modal({ isOpen, onClose, title, children }) {
  const modalRef = React.useRef(null);
  const previousActiveElement = React.useRef(null);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      // Focus the modal
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      // Restore focus
      previousActiveElement.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // In real app: ReactDOM.createPortal(content, document.body)
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          animation: 'slideUp 0.3s ease-out',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h2 id="modal-title" style={{ margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 🔔 PART 2: TOAST SYSTEM
// ═══════════════════════════════════════════════════════════════════
const ToastContext = React.createContext(null);

const TOAST_TYPES = {
  success: { bg: '#22c55e', icon: '✅' },
  error: { bg: '#ef4444', icon: '❌' },
  warning: { bg: '#f59e0b', icon: '⚠️' },
  info: { bg: '#3b82f6', icon: 'ℹ️' }
};

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    
    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
    
    return id;
  }, []);

  const removeToast = React.useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 1001
    }}>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function Toast({ toast, onClose }) {
  const config = TOAST_TYPES[toast.type] || TOAST_TYPES.info;
  
  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        background: config.bg,
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        animation: 'slideIn 0.3s ease-out',
        minWidth: '250px'
      }}
    >
      <span style={{ fontSize: '18px' }}>{config.icon}</span>
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: 'white',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer'
        }}
      >
        ×
      </button>
      
      {/* Progress bar */}
      {toast.duration > 0 && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '0 0 8px 8px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'rgba(255,255,255,0.7)',
            animation: \`shrink \${toast.duration}ms linear forwards\`
          }} />
        </div>
      )}
    </div>
  );
}

function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 DEMO APP
// ═══════════════════════════════════════════════════════════════════
function DemoContent() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { addToast } = useToast();

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <style>{\`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes shrink { from { width: 100%; } to { width: 0%; } }
      \`}</style>
      
      <h3>🔔 Modal & Toast Demo</h3>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '10px 20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Open Modal
        </button>
        
        <button 
          onClick={() => addToast('Operation successful!', 'success')}
          style={{ padding: '10px 20px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Success Toast
        </button>
        
        <button 
          onClick={() => addToast('Something went wrong', 'error')}
          style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Error Toast
        </button>
        
        <button 
          onClick={() => addToast('Please check this', 'warning')}
          style={{ padding: '10px 20px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Warning Toast
        </button>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="🎉 Welcome!"
      >
        <p>This modal uses React Portal (conceptually) and includes:</p>
        <ul style={{ marginLeft: '20px' }}>
          <li>Body scroll lock</li>
          <li>Escape key to close</li>
          <li>Click outside to close</li>
          <li>Focus management</li>
          <li>ARIA attributes</li>
        </ul>
        <button 
          onClick={() => {
            setIsModalOpen(false);
            addToast('Modal closed!', 'info');
          }}
          style={{ marginTop: '15px', padding: '10px 20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Close Modal
        </button>
      </Modal>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <DemoContent />
    </ToastProvider>
  );
}`,
                comparison: {
                    junior: `// ❌ Modal without portal
function Modal({ isOpen }) {
  // Rendered inside parent div
  // z-index wars, overflow:hidden breaks it
  return isOpen ? <div className="modal">...</div> : null;
}`,
                    senior: `// ✅ Modal with portal
function Modal({ isOpen }) {
  return isOpen 
    ? ReactDOM.createPortal(
        <div className="modal">...</div>,
        document.body  // Renders at top level!
      ) 
    : null;
}`
                },
                interview: {
                    questions: [
                        { q: "Why use React Portal for modals?", a: "Portals render children outside the parent DOM hierarchy while maintaining React context and event bubbling. This avoids z-index issues, overflow:hidden clipping, and stacking context problems. The modal is at document.body level but still a React child." },
                        { q: "How do you implement focus trap in a modal?", a: "Query all focusable elements inside modal. On Tab, check if focus is on last element → move to first. On Shift+Tab at first → move to last. Store previous activeElement, restore on close. Use tabIndex={-1} on container for initial focus." },
                        { q: "How would you implement toast queue with max limit?", a: "In addToast: check if toasts.length >= MAX_TOASTS, if so remove oldest. Use a reducer for complex state. For animations, use a 'leaving' state before removing from array so exit animation can play." }
                    ]
                }
            },
            {
                day: 30,
                title: 'useDeferredValue & useTransition Deep Dive',
                intro: "Master React 19's concurrent features. Keep UI responsive during heavy computations.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Master</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>useTransition: Mark updates as non-urgent</li>
    <li>useDeferredValue: Defer expensive re-renders</li>
    <li>When to use each</li>
    <li>Real-world patterns: Search, filtering, tabs</li>
</ul>

<div class="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 p-4 rounded-xl mb-6">
    <h4 class="text-cyan-400 font-bold mb-2">⚡ Key Difference</h4>
    <p class="text-light-300"><code>useTransition</code>: Wrap setState calls to mark them as low priority.<br/>
    <code>useDeferredValue</code>: Create a deferred copy of a value that "lags behind".</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔀 useTransition</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">const [isPending, startTransition] = useTransition();

// Urgent: Update input immediately
setQuery(input);

// Non-urgent: Filter can lag
startTransition(() => {
  setFilteredResults(expensiveFilter(input));
});</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">⏳ useDeferredValue</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">const deferredQuery = useDeferredValue(query);

// query updates immediately (typing stays responsive)
// deferredQuery lags behind (expensive render can wait)</pre>
</div>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  ⚡ useDeferredValue & useTransition                                 ║
║  Keep UI responsive during heavy operations                          ║
╠══════════════════════════════════════════════════════════════════════╣
║  DEMO 1: Search with useDeferredValue                                ║
║  DEMO 2: Tab switching with useTransition                            ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 📦 SLOW COMPONENT (Simulates expensive render)
// ═══════════════════════════════════════════════════════════════════
function SlowList({ query }) {
  // Simulate slow render
  const items = [];
  for (let i = 0; i < 500; i++) {
    items.push(
      <SlowItem key={i} text={\`Result \${i + 1} for "\${query}"\`} />
    );
  }
  return <div>{items}</div>;
}

function SlowItem({ text }) {
  // Artificial slowdown
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {} // 1ms per item = 500ms total
  
  return (
    <div style={{ 
      padding: '8px', 
      borderBottom: '1px solid #eee',
      fontSize: '14px'
    }}>
      {text}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 🔍 DEMO 1: useDeferredValue for Search
// ═══════════════════════════════════════════════════════════════════
function DeferredSearch() {
  const [query, setQuery] = React.useState('');
  const deferredQuery = React.useDeferredValue(query);
  
  // Check if we're showing stale results
  const isStale = query !== deferredQuery;

  return (
    <div>
      <h4>🔍 useDeferredValue Demo</h4>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search (try fast typing)..."
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: '2px solid #e2e8f0',
          borderRadius: '8px',
          marginBottom: '10px'
        }}
      />
      
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
        Query: "{query}" | Deferred: "{deferredQuery}" 
        {isStale && <span style={{ color: '#f59e0b' }}> (stale)</span>}
      </div>
      
      <div style={{ 
        maxHeight: '200px', 
        overflow: 'auto', 
        border: '1px solid #ddd',
        borderRadius: '8px',
        opacity: isStale ? 0.7 : 1,
        transition: 'opacity 0.2s'
      }}>
        {deferredQuery && <SlowList query={deferredQuery} />}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 🔀 DEMO 2: useTransition for Tab Switching
// ═══════════════════════════════════════════════════════════════════
function TabContent({ id }) {
  // Simulate expensive render
  const items = [];
  for (let i = 0; i < 300; i++) {
    items.push(
      <div key={i} style={{ padding: '4px', borderBottom: '1px solid #f0f0f0' }}>
        Tab {id} - Item {i + 1}
      </div>
    );
  }
  // Artificial delay
  const start = performance.now();
  while (performance.now() - start < 100) {}
  
  return <div style={{ maxHeight: '200px', overflow: 'auto' }}>{items}</div>;
}

function TransitionTabs() {
  const [tab, setTab] = React.useState('A');
  const [isPending, startTransition] = React.useTransition();

  const handleTabChange = (newTab) => {
    startTransition(() => {
      setTab(newTab);
    });
  };

  return (
    <div>
      <h4>🔀 useTransition Demo</h4>
      
      <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
        {['A', 'B', 'C', 'D'].map(t => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              background: tab === t ? '#3b82f6' : '#e2e8f0',
              color: tab === t ? 'white' : '#333',
              transition: 'all 0.2s'
            }}
          >
            Tab {t}
          </button>
        ))}
        
        {isPending && (
          <span style={{ 
            padding: '10px', 
            color: '#f59e0b',
            fontSize: '14px'
          }}>
            ⏳ Loading...
          </span>
        )}
      </div>
      
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        opacity: isPending ? 0.5 : 1,
        transition: 'opacity 0.2s'
      }}>
        <TabContent id={tab} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 MAIN APP
// ═══════════════════════════════════════════════════════════════════
function App() {
  const [demo, setDemo] = React.useState('deferred');

  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px', maxWidth: '600px' }}>
      <h3>⚡ Concurrent React Features</h3>
      
      <div style={{ 
        background: '#f8fafc', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button 
            onClick={() => setDemo('deferred')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              background: demo === 'deferred' ? '#6366f1' : '#e2e8f0',
              color: demo === 'deferred' ? 'white' : '#333'
            }}
          >
            useDeferredValue
          </button>
          <button 
            onClick={() => setDemo('transition')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              background: demo === 'transition' ? '#6366f1' : '#e2e8f0',
              color: demo === 'transition' ? 'white' : '#333'
            }}
          >
            useTransition
          </button>
        </div>
        
        {demo === 'deferred' ? <DeferredSearch /> : <TransitionTabs />}
      </div>
      
      <div style={{ 
        background: '#1e293b', 
        padding: '15px', 
        borderRadius: '8px',
        color: '#94a3b8',
        fontSize: '13px'
      }}>
        <strong style={{ color: '#22d3ee' }}>💡 When to use which?</strong>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li><strong>useDeferredValue:</strong> You receive a value (prop) and want to defer re-rendering based on it</li>
          <li><strong>useTransition:</strong> You control the state update and want to mark it as low priority</li>
        </ul>
      </div>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ No optimization - typing lags
function Search() {
  const [query, setQuery] = useState('');
  const results = expensiveFilter(query); // Blocks typing!
  
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <List items={results} />
    </>
  );
}`,
                    senior: `// ✅ useDeferredValue - typing stays snappy
function Search() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const results = expensiveFilter(deferredQuery);
  
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <List items={results} style={{ opacity: query !== deferredQuery ? 0.5 : 1 }} />
    </>
  );
}`
                },
                interview: {
                    questions: [
                        { q: "When would you use useDeferredValue vs useTransition?", a: "useDeferredValue when you receive a value as prop and can't control its update. useTransition when you control the setState call. Think: useDeferredValue = defer rendering, useTransition = defer state update." },
                        { q: "What happens when React is rendering a transition and a higher priority update comes in?", a: "React abandons the in-progress transition render and starts the higher priority update immediately. This is why typing stays responsive - each keystroke interrupts the previous deferred render." },
                        { q: "Can you use useDeferredValue and useTransition together?", a: "Rarely needed. If you control the state, use useTransition. If receiving a prop, use useDeferredValue. Using both is redundant and could cause confusing double-deferred behavior." }
                    ]
                }
            },
            {
                day: 31,
                title: 'Streaming SSR & Asset Preloading',
                intro: "React 19's streaming server rendering and resource preloading APIs for instant page loads.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>renderToPipeableStream vs renderToString</li>
    <li>Streaming HTML with Suspense boundaries</li>
    <li>Asset preloading: preload(), preinit(), prefetchDNS()</li>
    <li>Resource hints and priorities</li>
</ul>

<div class="bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 p-4 rounded-xl mb-6">
    <h4 class="text-indigo-400 font-bold mb-2">🚀 Why Streaming SSR?</h4>
    <p class="text-light-300">Traditional SSR: Server renders entire page → User sees nothing until complete.<br/>
    Streaming SSR: Server sends shell immediately → Streams content as ready → Instant interactivity!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ Streaming with renderToPipeableStream</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-300">import { renderToPipeableStream } from 'react-dom/server';

app.get('/', (req, res) => {
  const { pipe } = renderToPipeableStream(&lt;App /&gt;, {
    bootstrapScripts: ['/main.js'],
    onShellReady() {
      res.setHeader('Content-Type', 'text/html');
      pipe(res); // Start streaming immediately!
    }
  });
});</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">📦 Asset Preloading APIs</h3>
<table class="w-full text-left mb-6">
    <tr class="border-b border-dark-600">
        <td class="py-2 text-cyan-400 font-mono">preload(href, options)</td>
        <td class="py-2 text-light-300">Preload a resource (font, image, script)</td>
    </tr>
    <tr class="border-b border-dark-600">
        <td class="py-2 text-cyan-400 font-mono">preinit(href, options)</td>
        <td class="py-2 text-light-300">Preload AND execute (for scripts/styles)</td>
    </tr>
    <tr class="border-b border-dark-600">
        <td class="py-2 text-cyan-400 font-mono">prefetchDNS(href)</td>
        <td class="py-2 text-light-300">Pre-resolve DNS for external domain</td>
    </tr>
    <tr>
        <td class="py-2 text-cyan-400 font-mono">preconnect(href)</td>
        <td class="py-2 text-light-300">Pre-establish connection (DNS + TCP + TLS)</td>
    </tr>
</table>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🌊 STREAMING SSR & ASSET PRELOADING                                 ║
║  React 19's server rendering capabilities                            ║
╠══════════════════════════════════════════════════════════════════════╣
║  NOTE: This code demonstrates patterns for server environments.      ║
║  In this sandbox, we show the client-side preloading APIs.           ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 📚 SERVER-SIDE CODE REFERENCE (Node.js/Express)
// ═══════════════════════════════════════════════════════════════════
/*
// server.js - Express example with streaming SSR

import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';

const app = express();

app.get('/', (req, res) => {
  let didError = false;
  
  const { pipe, abort } = renderToPipeableStream(
    <App />,
    {
      // Scripts to load for hydration
      bootstrapScripts: ['/static/js/main.js'],
      
      // ✅ onShellReady: Shell (non-Suspense content) is ready
      // Start streaming immediately for fast TTFB
      onShellReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-Type', 'text/html');
        pipe(res);
      },
      
      // ⚠️ onShellError: Fatal error before shell
      onShellError(error) {
        res.statusCode = 500;
        res.send('<h1>Something went wrong</h1>');
      },
      
      // 📊 onAllReady: Everything including Suspense content
      // Use for crawlers/bots that need complete HTML
      onAllReady() {
        // Called when all content has been generated
      },
      
      // ❌ onError: Non-fatal errors during streaming
      onError(error) {
        didError = true;
        console.error(error);
      }
    }
  );
  
  // Abort after timeout
  setTimeout(() => abort(), 10000);
});
*/

// ═══════════════════════════════════════════════════════════════════
// 🎯 CLIENT-SIDE: Asset Preloading Demo
// ═══════════════════════════════════════════════════════════════════
function PreloadDemo() {
  const [logs, setLogs] = React.useState([]);
  
  const addLog = (message) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
  };

  const handlePreload = () => {
    addLog('Calling preload() for image...');
    
    // React 19's preload API
    if (typeof React.preload === 'function') {
      React.preload('https://picsum.photos/800/600', { as: 'image' });
      addLog('✅ Image preload initiated');
    } else {
      // Fallback for demo
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = 'https://picsum.photos/800/600';
      document.head.appendChild(link);
      addLog('✅ Image preload initiated (fallback)');
    }
  };

  const handlePreconnect = () => {
    addLog('Calling preconnect() for API domain...');
    
    if (typeof React.preconnect === 'function') {
      React.preconnect('https://api.example.com');
      addLog('✅ Preconnect initiated');
    } else {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = 'https://api.example.com';
      document.head.appendChild(link);
      addLog('✅ Preconnect initiated (fallback)');
    }
  };

  const handlePrefetchDNS = () => {
    addLog('Calling prefetchDNS() for CDN...');
    
    if (typeof React.prefetchDNS === 'function') {
      React.prefetchDNS('https://cdn.example.com');
      addLog('✅ DNS prefetch initiated');
    } else {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = 'https://cdn.example.com';
      document.head.appendChild(link);
      addLog('✅ DNS prefetch initiated (fallback)');
    }
  };

  return (
    <div>
      <h4>📦 Asset Preloading APIs</h4>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
        <button onClick={handlePreload} style={btnStyle}>
          preload() Image
        </button>
        <button onClick={handlePreconnect} style={btnStyle}>
          preconnect() API
        </button>
        <button onClick={handlePrefetchDNS} style={btnStyle}>
          prefetchDNS() CDN
        </button>
      </div>
      
      <div style={{
        background: '#1e293b',
        padding: '15px',
        borderRadius: '8px',
        maxHeight: '150px',
        overflow: 'auto',
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>
        {logs.length === 0 && (
          <span style={{ color: '#64748b' }}>Click buttons to see preload actions...</span>
        )}
        {logs.map((log, i) => (
          <div key={i} style={{ color: '#94a3b8', marginBottom: '4px' }}>
            <span style={{ color: '#64748b' }}>[{log.time}]</span> {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}

const btnStyle = {
  padding: '8px 16px',
  background: '#6366f1',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

// ═══════════════════════════════════════════════════════════════════
// 🌊 STREAMING SSR VISUALIZATION
// ═══════════════════════════════════════════════════════════════════
function StreamingVisualization() {
  const [stage, setStage] = React.useState(0);
  
  const stages = [
    { label: 'Initial Request', shell: false, content1: false, content2: false },
    { label: 'Shell Ready (TTFB)', shell: true, content1: false, content2: false },
    { label: 'Content 1 Streams', shell: true, content1: true, content2: false },
    { label: 'Content 2 Streams', shell: true, content1: true, content2: true }
  ];
  
  const current = stages[stage];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStage(s => (s + 1) % stages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h4>🌊 Streaming SSR Timeline</h4>
      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>
        Stage: <strong>{current.label}</strong>
      </p>
      
      <div style={{
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {/* Header/Shell */}
        <div style={{
          padding: '15px',
          background: current.shell ? '#dbeafe' : '#f1f5f9',
          borderBottom: '1px solid #e2e8f0',
          transition: 'background 0.5s'
        }}>
          {current.shell ? '🏠 Header & Navigation (Shell)' : '⏳ Waiting...'}
        </div>
        
        {/* Content Area 1 */}
        <div style={{
          padding: '15px',
          background: current.content1 ? '#dcfce7' : '#f1f5f9',
          borderBottom: '1px solid #e2e8f0',
          transition: 'background 0.5s'
        }}>
          {current.content1 ? '📄 Main Content (Suspense Resolved)' : 
           current.shell ? '⏳ Loading main content...' : '⏳ Waiting...'}
        </div>
        
        {/* Content Area 2 */}
        <div style={{
          padding: '15px',
          background: current.content2 ? '#fef9c3' : '#f1f5f9',
          transition: 'background 0.5s'
        }}>
          {current.content2 ? '📊 Data Section (Suspense Resolved)' : 
           current.shell ? '⏳ Loading data section...' : '⏳ Waiting...'}
        </div>
      </div>
      
      <p style={{ fontSize: '12px', color: '#64748b', marginTop: '10px' }}>
        💡 User sees shell immediately, content streams in as ready
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 MAIN APP
// ═══════════════════════════════════════════════════════════════════
function App() {
  return (
    <div style={{ fontFamily: 'system-ui', padding: '20px', maxWidth: '600px' }}>
      <h3>🌊 Streaming SSR & Asset Preloading</h3>
      
      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
          <StreamingVisualization />
        </div>
        
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
          <PreloadDemo />
        </div>
      </div>
      
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#1e293b',
        borderRadius: '8px',
        color: '#94a3b8',
        fontSize: '13px'
      }}>
        <strong style={{ color: '#22d3ee' }}>📚 Key Takeaways:</strong>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li><code>renderToPipeableStream</code>: Starts sending HTML immediately</li>
          <li><code>onShellReady</code>: Shell (non-Suspense content) is ready to stream</li>
          <li><code>onAllReady</code>: Use for crawlers that need complete HTML</li>
          <li><code>preload()</code>: Preload fonts, images, scripts</li>
          <li><code>preinit()</code>: Preload AND execute scripts/styles</li>
        </ul>
      </div>
    </div>
  );
}`,
                comparison: {
                    junior: `// ❌ renderToString - Blocks until complete
const html = renderToString(<App />);
res.send(html); // User waits for entire page`,
                    senior: `// ✅ renderToPipeableStream - Stream immediately
const { pipe } = renderToPipeableStream(<App />, {
  onShellReady() {
    pipe(res); // Start streaming shell NOW
  }
});
// Content inside Suspense streams as ready`
                },
                interview: {
                    questions: [
                        { q: "What's the difference between onShellReady and onAllReady?", a: "onShellReady fires when non-Suspense content is ready - use for humans (fast TTFB). onAllReady fires when ALL content including Suspense is ready - use for crawlers/bots that need complete HTML." },
                        { q: "When would you use preload() vs preinit()?", a: "preload() fetches the resource and stores in cache. preinit() fetches AND executes immediately (for scripts) or applies immediately (for styles). Use preinit() for critical resources needed before hydration." },
                        { q: "How does streaming SSR work with Suspense?", a: "React sends the shell (non-Suspense content) immediately. For Suspense boundaries, it sends a placeholder. When the suspended content resolves, React streams an inline script that replaces the placeholder with real content." }
                    ]
                }
            },
            {
                day: 32,
                title: 'System Design for React: Interview Mastery',
                intro: "The ultimate interview prep. Design complex React applications like a senior architect.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You'll Master</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Frontend system design methodology</li>
    <li>Designing Twitter/Feed, E-commerce, Real-time Chat</li>
    <li>State management architecture decisions</li>
    <li>Performance budgets & optimization strategies</li>
    <li>Error boundaries & graceful degradation</li>
</ul>

<div class="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
    <h4 class="text-yellow-400 font-bold mb-2">🏆 The RADIO Framework</h4>
    <p class="text-light-300 font-mono">
    <strong>R</strong>equirements → <strong>A</strong>rchitecture → <strong>D</strong>ata Model → <strong>I</strong>nterface (API) → <strong>O</strong>ptimizations
    </p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📋 Step 1: Requirements (2-3 min)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li><strong>Functional:</strong> What can users do?</li>
    <li><strong>Non-functional:</strong> Performance, accessibility, offline?</li>
    <li><strong>Scale:</strong> How many users? Data volume?</li>
    <li><strong>Scope:</strong> What's in/out for this interview?</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">🏗️ Step 2: Architecture (5-7 min)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>Component hierarchy (draw boxes)</li>
    <li>State management strategy</li>
    <li>Data flow (props, context, global state)</li>
    <li>Third-party integrations</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">📊 Step 3: Data Model (3-5 min)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
    <li>What data entities exist?</li>
    <li>Client state vs server state</li>
    <li>Normalization strategy</li>
</ul>
                `,
                code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🏗️ SYSTEM DESIGN: TWITTER-LIKE FEED                                ║
║  Comprehensive example using RADIO framework                         ║
╠══════════════════════════════════════════════════════════════════════╣
║  This is a simplified implementation showing key architecture        ║
║  decisions for a social media feed.                                  ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 📋 REQUIREMENTS GATHERED:
// ═══════════════════════════════════════════════════════════════════
/*
FUNCTIONAL:
- View feed of tweets
- Like/unlike tweets
- Compose new tweet
- Infinite scroll
- Real-time updates for likes

NON-FUNCTIONAL:
- Initial load < 2s
- Smooth scrolling (60fps)
- Optimistic updates for likes
- Offline: show cached tweets
- Accessible

SCALE:
- 10K concurrent users
- 1M+ tweets in system
- 50 tweets per page
*/

// ═══════════════════════════════════════════════════════════════════
// 📊 DATA MODEL
// ═══════════════════════════════════════════════════════════════════
/*
Tweet {
  id: string
  content: string
  author: { id, name, avatar }
  createdAt: timestamp
  likeCount: number
  isLikedByMe: boolean
  replyCount: number
}

FeedState {
  tweets: Map<id, Tweet>  // Normalized!
  feedOrder: string[]     // Just IDs for ordering
  isLoading: boolean
  hasMore: boolean
  cursor: string | null
}
*/

// ═══════════════════════════════════════════════════════════════════
// 🏗️ ARCHITECTURE IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════

// Normalized store (like Redux/Zustand would have)
const useFeedStore = () => {
  const [state, setState] = React.useState({
    tweetsById: {},
    feedOrder: [],
    isLoading: false,
    hasMore: true,
    cursor: null
  });

  const loadMore = async () => {
    if (state.isLoading || !state.hasMore) return;
    
    setState(s => ({ ...s, isLoading: true }));
    
    // Simulate API
    await new Promise(r => setTimeout(r, 500));
    const newTweets = generateMockTweets(state.cursor, 10);
    
    setState(s => ({
      ...s,
      isLoading: false,
      cursor: newTweets.nextCursor,
      hasMore: newTweets.hasMore,
      // Normalize into map
      tweetsById: {
        ...s.tweetsById,
        ...Object.fromEntries(newTweets.items.map(t => [t.id, t]))
      },
      // Append IDs to order
      feedOrder: [...s.feedOrder, ...newTweets.items.map(t => t.id)]
    }));
  };

  const toggleLike = (tweetId) => {
    // Optimistic update!
    setState(s => ({
      ...s,
      tweetsById: {
        ...s.tweetsById,
        [tweetId]: {
          ...s.tweetsById[tweetId],
          isLikedByMe: !s.tweetsById[tweetId].isLikedByMe,
          likeCount: s.tweetsById[tweetId].likeCount + 
            (s.tweetsById[tweetId].isLikedByMe ? -1 : 1)
        }
      }
    }));
    
    // Fire and forget API call (would handle errors in production)
    // api.toggleLike(tweetId).catch(rollback);
  };

  return { ...state, loadMore, toggleLike };
};

// Mock data generator
const generateMockTweets = (cursor, count) => {
  const start = cursor ? parseInt(cursor) : 0;
  const items = Array.from({ length: count }, (_, i) => ({
    id: String(start + i),
    content: \`Tweet #\${start + i + 1}: This is some interesting content about React, JavaScript, and web development. #coding #react\`,
    author: {
      id: \`user-\${(start + i) % 5}\`,
      name: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'][(start + i) % 5],
      avatar: \`https://i.pravatar.cc/40?img=\${(start + i) % 70}\`
    },
    createdAt: Date.now() - (start + i) * 60000,
    likeCount: Math.floor(Math.random() * 100),
    isLikedByMe: Math.random() > 0.7,
    replyCount: Math.floor(Math.random() * 20)
  }));
  
  return {
    items,
    nextCursor: String(start + count),
    hasMore: start + count < 50 // Limit for demo
  };
};

// ═══════════════════════════════════════════════════════════════════
// 🧩 COMPONENT: Tweet Card (Memoized for perf)
// ═══════════════════════════════════════════════════════════════════
const TweetCard = React.memo(function TweetCard({ tweet, onLike }) {
  const timeAgo = React.useMemo(() => {
    const mins = Math.floor((Date.now() - tweet.createdAt) / 60000);
    if (mins < 60) return \`\${mins}m\`;
    if (mins < 1440) return \`\${Math.floor(mins/60)}h\`;
    return \`\${Math.floor(mins/1440)}d\`;
  }, [tweet.createdAt]);

  return (
    <article style={{
      padding: '15px',
      borderBottom: '1px solid #e5e7eb',
      background: 'white'
    }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <img 
          src={tweet.author.avatar} 
          alt=""
          style={{ width: 48, height: 48, borderRadius: '50%' }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <strong>{tweet.author.name}</strong>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>· {timeAgo}</span>
          </div>
          <p style={{ margin: '8px 0', lineHeight: 1.5 }}>{tweet.content}</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={() => onLike(tweet.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: tweet.isLikedByMe ? '#f43f5e' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {tweet.isLikedByMe ? '❤️' : '🤍'} {tweet.likeCount}
            </button>
            <button style={{ background: 'none', border: 'none', color: '#6b7280' }}>
              💬 {tweet.replyCount}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
});

// ═══════════════════════════════════════════════════════════════════
// 🔍 COMPONENT: Feed with Infinite Scroll
// ═══════════════════════════════════════════════════════════════════
function Feed() {
  const { tweetsById, feedOrder, isLoading, hasMore, loadMore, toggleLike } = useFeedStore();
  const loaderRef = React.useRef(null);

  // Intersection Observer for infinite scroll
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  // Load initial
  React.useEffect(() => { loadMore(); }, []);

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto',
      background: '#f3f4f6',
      minHeight: '100vh'
    }}>
      <header style={{
        padding: '15px',
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>Home</h1>
      </header>

      {feedOrder.map(id => (
        <TweetCard 
          key={id} 
          tweet={tweetsById[id]} 
          onLike={toggleLike}
        />
      ))}

      <div ref={loaderRef} style={{ padding: '20px', textAlign: 'center' }}>
        {isLoading && '⏳ Loading...'}
        {!hasMore && '✅ You\\'ve seen all tweets'}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 APP WITH ERROR BOUNDARY
// ═══════════════════════════════════════════════════════════════════
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Something went wrong 😢</h2>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Feed />
    </ErrorBoundary>
  );
}`,
                comparison: {
                    junior: `// ❌ No structure, starts coding immediately
function App() {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    fetch('/tweets').then(r => r.json()).then(setTweets);
  }, []);
  return tweets.map(t => <div>{t.text}</div>);
}`,
                    senior: `// ✅ RADIO Framework
// 1. Requirements: clarify scope, scale, constraints
// 2. Architecture: draw component hierarchy
// 3. Data Model: normalize entities, client/server split
// 4. Interface: API contract, optimistic updates
// 5. Optimizations: virtualization, caching, code split`
                },
                interview: {
                    questions: [
                        { q: "How would you handle real-time updates in a feed?", a: "WebSocket connection for live updates. When a new tweet arrives, prepend to feedOrder array. For likes, use WebSocket or polling for live count. Consider optimistic updates with rollback on failure." },
                        { q: "How would you implement offline support?", a: "1) Service Worker to cache the app shell. 2) IndexedDB to cache tweets locally. 3) Background Sync API to queue actions (likes, posts) when offline. 4) Show cached content with 'offline' indicator." },
                        { q: "How do you decide between Context, Redux, and React Query?", a: "Context: Simple shared state (theme, auth). Redux/Zustand: Complex client state with many updaters. React Query/TanStack: Server state (caching, refetching, sync). Often combine: Context for UI state, React Query for server data." }
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

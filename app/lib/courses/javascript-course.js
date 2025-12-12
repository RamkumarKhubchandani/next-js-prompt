export const jsContent = {javascript: {
    id: 'javascript',
    title: 'JavaScript Mastery: From Zero to Architect',
    description: 'The complete 32-day roadmap to mastering the JavaScript runtime, modern patterns, polyfills, and system design. Updated for 2025.',
    totalDays: 32,
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
        },
        // === WEEK 5: TOP INTERVIEW PATTERNS ===
        {
            day: 21,
            title: '🔥 Polyfills Mastery: Write Your Own JS Methods',
            intro: "The #1 interview topic. If you can't write Promise.all from scratch, you're not ready for FAANG.",
            content: `
<div class="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 p-4 rounded-xl mb-6">
<h4 class="text-red-400 font-bold mb-2">🎯 Why Polyfills Matter</h4>
<p class="text-light-300">Every top company (Google, Amazon, Meta) asks polyfill questions. They test your understanding of JavaScript internals, not just API usage.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📋 Polyfills You MUST Know</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Promise.all</code> - Wait for all promises</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Promise.race</code> - First to resolve wins</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Promise.allSettled</code> - Wait for all, success or fail</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Promise.any</code> - First success wins</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Array.prototype.map</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Array.prototype.filter</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Array.prototype.reduce</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Function.prototype.bind</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Function.prototype.call</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Function.prototype.apply</code></li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">⚡ The Interview Strategy</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-green-400 mb-2">✅ Do This</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Ask clarifying questions first</li>
        <li>Handle edge cases (empty arrays, no args)</li>
        <li>Explain your thought process</li>
        <li>Use proper error handling</li>
    </ul>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-red-400 mb-2">❌ Avoid This</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Jumping straight to code</li>
        <li>Ignoring edge cases</li>
        <li>Not testing your solution</li>
        <li>Forgetting 'this' context</li>
    </ul>
</div>
</div>
            `,
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔥 POLYFILLS MASTERY - TOP INTERVIEW QUESTIONS                      ║
║  Write these from memory in under 5 minutes each!                    ║
╠══════════════════════════════════════════════════════════════════════╣
║  1. Promise.all       5. Array.map       9. Function.bind            ║
║  2. Promise.race      6. Array.filter   10. Function.call            ║
║  3. Promise.allSettled 7. Array.reduce  11. Function.apply           ║
║  4. Promise.any       8. Array.flat     12. Object.create            ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ Promise.all Polyfill
// ═══════════════════════════════════════════════════════════════════
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    // Edge case: empty array
    if (!promises.length) return resolve([]);
    
    const results = [];
    let completed = 0;
    
    promises.forEach((promise, index) => {
      // Wrap in Promise.resolve to handle non-promise values
      Promise.resolve(promise)
        .then(value => {
          results[index] = value; // Maintain order!
          completed++;
          
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // First rejection rejects all
    });
  });
};

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ Promise.race Polyfill
// ═══════════════════════════════════════════════════════════════════
Promise.myRace = function(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      Promise.resolve(promise)
        .then(resolve)  // First to resolve wins
        .catch(reject); // First to reject wins
    });
  });
};

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ Promise.allSettled Polyfill
// ═══════════════════════════════════════════════════════════════════
Promise.myAllSettled = function(promises) {
  return new Promise(resolve => {
    if (!promises.length) return resolve([]);
    
    const results = [];
    let completed = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = { status: 'fulfilled', value };
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    });
  });
};

// ═══════════════════════════════════════════════════════════════════
// 4️⃣ Array.prototype.map Polyfill
// ═══════════════════════════════════════════════════════════════════
Array.prototype.myMap = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const result = [];
  for (let i = 0; i < this.length; i++) {
    // Check if index exists (sparse arrays)
    if (i in this) {
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return result;
};

// ═══════════════════════════════════════════════════════════════════
// 5️⃣ Array.prototype.filter Polyfill
// ═══════════════════════════════════════════════════════════════════
Array.prototype.myFilter = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// ═══════════════════════════════════════════════════════════════════
// 6️⃣ Array.prototype.reduce Polyfill
// ═══════════════════════════════════════════════════════════════════
Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  let accumulator;
  let startIndex = 0;
  
  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    // No initial value - use first element
    if (this.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = this[0];
    startIndex = 1;
  }
  
  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  
  return accumulator;
};

// ═══════════════════════════════════════════════════════════════════
// 7️⃣ Function.prototype.bind Polyfill
// ═══════════════════════════════════════════════════════════════════
Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }
  
  const fn = this;
  
  return function bound(...newArgs) {
    // Handle 'new' keyword
    if (new.target) {
      return new fn(...args, ...newArgs);
    }
    return fn.apply(context, [...args, ...newArgs]);
  };
};

// ═══════════════════════════════════════════════════════════════════
// 8️⃣ Function.prototype.call Polyfill
// ═══════════════════════════════════════════════════════════════════
Function.prototype.myCall = function(context, ...args) {
  context = context || globalThis;
  
  // Create unique property to avoid collision
  const fnKey = Symbol('fn');
  context[fnKey] = this;
  
  const result = context[fnKey](...args);
  delete context[fnKey];
  
  return result;
};

// ═══════════════════════════════════════════════════════════════════
// 9️⃣ Function.prototype.apply Polyfill
// ═══════════════════════════════════════════════════════════════════
Function.prototype.myApply = function(context, argsArray = []) {
  context = context || globalThis;
  
  const fnKey = Symbol('fn');
  context[fnKey] = this;
  
  const result = context[fnKey](...argsArray);
  delete context[fnKey];
  
  return result;
};

// ═══════════════════════════════════════════════════════════════════
// 🧪 TEST ALL POLYFILLS
// ═══════════════════════════════════════════════════════════════════
const PolyfillDemo = () => {
  const [results, setResults] = React.useState([]);
  
  const runTests = async () => {
    const logs = [];
    
    // Test Promise.myAll
    const p1 = Promise.resolve(1);
    const p2 = Promise.resolve(2);
    const p3 = Promise.resolve(3);
    const allResult = await Promise.myAll([p1, p2, p3]);
    logs.push('Promise.myAll([1,2,3]): ' + JSON.stringify(allResult));
    
    // Test Promise.myRace
    const fast = new Promise(r => setTimeout(() => r('fast'), 50));
    const slow = new Promise(r => setTimeout(() => r('slow'), 100));
    const raceResult = await Promise.myRace([slow, fast]);
    logs.push('Promise.myRace: ' + raceResult);
    
    // Test Array.myMap
    const mapResult = [1, 2, 3].myMap(x => x * 2);
    logs.push('Array.myMap([1,2,3], x=>x*2): ' + JSON.stringify(mapResult));
    
    // Test Array.myFilter
    const filterResult = [1, 2, 3, 4, 5].myFilter(x => x % 2 === 0);
    logs.push('Array.myFilter(even): ' + JSON.stringify(filterResult));
    
    // Test Array.myReduce
    const reduceResult = [1, 2, 3, 4].myReduce((acc, x) => acc + x, 0);
    logs.push('Array.myReduce(sum): ' + reduceResult);
    
    // Test Function.myBind
    const obj = { name: 'Test' };
    function greet(greeting) { return greeting + ' ' + this.name; }
    const boundFn = greet.myBind(obj, 'Hello');
    logs.push('Function.myBind: ' + boundFn());
    
    setResults(logs);
  };
  
  return (
    <div style={{ padding: '20px', background: '#1a1a2e', borderRadius: '12px' }}>
      <h3 style={{ color: '#fff', marginBottom: '15px' }}>🔥 Polyfill Test Suite</h3>
      <button 
        onClick={runTests}
        style={{
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '15px'
        }}
      >
        ▶ Run All Tests
      </button>
      
      <div style={{ background: '#0f0f1a', padding: '15px', borderRadius: '8px' }}>
        {results.length === 0 ? (
          <p style={{ color: '#666' }}>Click button to run polyfill tests...</p>
        ) : (
          results.map((log, i) => (
            <div key={i} style={{ 
              color: '#22c55e', 
              fontFamily: 'monospace', 
              fontSize: '13px',
              padding: '5px 0',
              borderBottom: '1px solid #333'
            }}>
              ✅ {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

render(<PolyfillDemo />);`,
            comparison: {
                junior: `// ❌ Just using built-in methods
const doubled = [1, 2, 3].map(x => x * 2);
// Works, but can't explain HOW it works

Promise.all([p1, p2, p3])
  .then(results => console.log(results));
// Uses it but doesn't understand internals`,
                senior: `// ✅ Understands implementation
Array.prototype.myMap = function(cb) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) { // Handle sparse arrays!
      result[i] = cb(this[i], i, this);
    }
  }
  return result;
};
// Can explain: callback context, sparse arrays,
// return value, and edge cases`
            },
            interview: {
                questions: [
                    { q: "Why use Promise.resolve() inside Promise.all polyfill?", a: "To handle non-promise values. If someone passes [1, 2, Promise.resolve(3)], we need to wrap 1 and 2 in promises." },
                    { q: "What's the difference between Promise.all and Promise.allSettled?", a: "Promise.all rejects immediately if ANY promise rejects. Promise.allSettled waits for ALL promises and returns status of each (fulfilled/rejected)." },
                    { q: "Why check 'i in this' in array polyfills?", a: "To handle sparse arrays. [1,,3] has length 3 but index 1 doesn't exist. We shouldn't call callback for missing indices." },
                    { q: "How does bind handle the 'new' keyword?", a: "If bound function is called with 'new', it ignores the bound 'this' and creates a new instance. Check with new.target." }
                ]
            }
        },
        {
            day: 22,
            title: '🔥 Build a Promise from Scratch',
            intro: "The ultimate JS interview question. If you understand Promises at this level, you understand JavaScript.",
            content: `
<div class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-4 rounded-xl mb-6">
<h4 class="text-purple-400 font-bold mb-2">🏆 The Holy Grail of JS Interviews</h4>
<p class="text-light-300">Building a Promise from scratch tests: closures, callbacks, async understanding, state machines, and error handling. It's asked at Google, Meta, and Amazon.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📐 Promise State Machine</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────┐
│                    PROMISE STATES                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│     ┌──────────┐                                        │
│     │ PENDING  │ ◄── Initial state                      │
│     └────┬─────┘                                        │
│          │                                              │
│    ┌─────┴─────┐                                        │
│    ▼           ▼                                        │
│ ┌──────────┐ ┌──────────┐                               │
│ │FULFILLED │ │ REJECTED │ ◄── Final states (immutable)  │
│ └──────────┘ └──────────┘                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Key Concepts to Implement</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">State</code> - pending, fulfilled, rejected</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Value</code> - resolved value or rejection reason</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">then()</code> - Register success/error handlers</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">catch()</code> - Register error handler</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">finally()</code> - Run regardless of outcome</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Chaining</code> - then() returns new Promise</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">⚠️ Tricky Parts</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><span class="text-yellow-400 font-bold">Microtask Queue:</span> Handlers must run asynchronously (use queueMicrotask or setTimeout)</li>
<li><span class="text-yellow-400 font-bold">Handler Queueing:</span> If then() called before resolve(), store handlers and run later</li>
<li><span class="text-yellow-400 font-bold">Chaining:</span> then() must return a NEW promise that resolves with handler's return value</li>
<li><span class="text-yellow-400 font-bold">Thenable Unwrapping:</span> If handler returns a promise, wait for it</li>
</ul>
            `,
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔥 BUILD A PROMISE FROM SCRATCH                                     ║
║  The Ultimate JavaScript Interview Question                          ║
╠══════════════════════════════════════════════════════════════════════╣
║  This implementation follows the Promises/A+ specification.          ║
║  Features: then chaining, catch, finally, thenable unwrapping        ║
╚══════════════════════════════════════════════════════════════════════╝
*/

class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.handlers = []; // Queue of {onFulfilled, onRejected, resolve, reject}
    
    const resolve = (value) => {
      // Handle thenable (promise-like) values
      if (value && typeof value.then === 'function') {
        return value.then(resolve, reject);
      }
      
      if (this.state !== 'pending') return; // Can't change state twice
      
      this.state = 'fulfilled';
      this.value = value;
      this.executeHandlers();
    };
    
    const reject = (reason) => {
      if (this.state !== 'pending') return;
      
      this.state = 'rejected';
      this.value = reason;
      this.executeHandlers();
    };
    
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  executeHandlers() {
    // Handlers must run asynchronously (microtask)
    queueMicrotask(() => {
      this.handlers.forEach(handler => {
        const { onFulfilled, onRejected, resolve, reject } = handler;
        
        try {
          if (this.state === 'fulfilled') {
            if (typeof onFulfilled === 'function') {
              resolve(onFulfilled(this.value));
            } else {
              resolve(this.value); // Pass through if no handler
            }
          } else if (this.state === 'rejected') {
            if (typeof onRejected === 'function') {
              resolve(onRejected(this.value)); // Note: resolve, not reject!
            } else {
              reject(this.value); // Pass through if no handler
            }
          }
        } catch (error) {
          reject(error);
        }
      });
      
      this.handlers = []; // Clear handlers
    });
  }
  
  then(onFulfilled, onRejected) {
    // then() ALWAYS returns a new promise for chaining
    return new MyPromise((resolve, reject) => {
      this.handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject
      });
      
      // If already settled, execute immediately
      if (this.state !== 'pending') {
        this.executeHandlers();
      }
    });
  }
  
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  
  finally(onFinally) {
    return this.then(
      value => {
        onFinally();
        return value;
      },
      reason => {
        onFinally();
        throw reason;
      }
    );
  }
  
  // Static methods
  static resolve(value) {
    return new MyPromise(resolve => resolve(value));
  }
  
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
  
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (!promises.length) return resolve([]);
      
      const results = [];
      let completed = 0;
      
      promises.forEach((p, i) => {
        MyPromise.resolve(p).then(value => {
          results[i] = value;
          if (++completed === promises.length) resolve(results);
        }).catch(reject);
      });
    });
  }
  
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(p => {
        MyPromise.resolve(p).then(resolve).catch(reject);
      });
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// 🧪 INTERACTIVE TEST DEMO
// ═══════════════════════════════════════════════════════════════════
const PromiseDemo = () => {
  const [logs, setLogs] = React.useState([]);
  
  const addLog = (msg) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg }]);
  };
  
  const testBasic = () => {
    setLogs([]);
    addLog('Creating MyPromise...');
    
    const p = new MyPromise((resolve) => {
      setTimeout(() => resolve('Hello from MyPromise!'), 1000);
    });
    
    p.then(value => {
      addLog('Resolved: ' + value);
    });
    
    addLog('then() registered (before resolve)');
  };
  
  const testChaining = () => {
    setLogs([]);
    addLog('Testing promise chaining...');
    
    new MyPromise(resolve => resolve(1))
      .then(x => {
        addLog('Step 1: ' + x);
        return x + 1;
      })
      .then(x => {
        addLog('Step 2: ' + x);
        return x * 2;
      })
      .then(x => {
        addLog('Final: ' + x);
      });
  };
  
  const testError = () => {
    setLogs([]);
    addLog('Testing error handling...');
    
    new MyPromise((_, reject) => {
      reject(new Error('Something went wrong!'));
    })
    .catch(err => {
      addLog('Caught: ' + err.message);
      return 'recovered';
    })
    .then(value => {
      addLog('After catch: ' + value);
    });
  };
  
  return (
    <div style={{ padding: '20px', background: '#1a1a2e', borderRadius: '12px' }}>
      <h3 style={{ color: '#fff', marginBottom: '15px' }}>🔧 MyPromise Test Suite</h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
        <button onClick={testBasic} style={btnStyle}>Basic Resolve</button>
        <button onClick={testChaining} style={btnStyle}>Test Chaining</button>
        <button onClick={testError} style={btnStyle}>Test Error</button>
      </div>
      
      <div style={{ background: '#0f0f1a', padding: '15px', borderRadius: '8px', minHeight: '120px' }}>
        {logs.length === 0 ? (
          <p style={{ color: '#666' }}>Click a button to test MyPromise...</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} style={{ 
              color: log.msg.includes('Error') || log.msg.includes('Caught') ? '#f43f5e' : '#22c55e',
              fontFamily: 'monospace',
              fontSize: '12px',
              padding: '3px 0'
            }}>
              [{log.time}] {log.msg}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const btnStyle = {
  padding: '8px 16px',
  background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '12px'
};

render(<PromiseDemo />);`,
            comparison: {
                junior: `// ❌ Uses Promises but doesn't understand
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// "I use Promises every day"
// But can't explain: microtasks, chaining,
// state machine, or handler queueing`,
                senior: `// ✅ Understands Promise internals
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.handlers = [];
    
    const resolve = (value) => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = value;
      // Run handlers in microtask queue
      queueMicrotask(() => this.runHandlers());
    };
    // ...complete implementation
  }
}`
            },
            interview: {
                questions: [
                    { q: "Why must handlers run asynchronously (microtask)?", a: "Promises/A+ spec requires it. It ensures consistent behavior - handlers always run after the current execution context, whether the promise is already resolved or pending." },
                    { q: "What happens if you call resolve() twice?", a: "The second call is ignored. A promise can only transition from pending to fulfilled/rejected ONCE. We check state !== 'pending' before changing state." },
                    { q: "Why does then() return a new Promise?", a: "For chaining. Each then() creates a new promise that resolves with the return value of its handler. This enables .then().then().then() chains." },
                    { q: "How do you handle when handler returns a Promise?", a: "Thenable unwrapping. If handler returns a promise-like object (has .then method), we wait for it to settle and use its value. This is why you can return fetch() from then()." }
                ]
            }
        },
        {
            day: 23,
            title: '🔥 Event Emitter & Pub-Sub Pattern',
            intro: "Build Node.js EventEmitter from scratch. Used in React, Redux, Socket.io, and every event-driven system.",
            content: `
<div class="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 p-4 rounded-xl mb-6">
<h4 class="text-blue-400 font-bold mb-2">🎯 Where It's Used</h4>
<p class="text-light-300">Redux (subscribe), React (synthetic events), Node.js (EventEmitter), DOM (addEventListener), Socket.io, RxJS - they all use this pattern!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📐 The Pub-Sub Architecture</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────┐
│                 EVENT EMITTER PATTERN                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Publisher ──emit('event', data)──▶ Event Emitter      │
│                                          │              │
│                                          ▼              │
│   ┌──────────────────────────────────────────────────┐  │
│   │  events = {                                      │  │
│   │    'click': [handler1, handler2],                │  │
│   │    'submit': [handler3],                         │  │
│   │    'error': [handler4, handler5, handler6]       │  │
│   │  }                                               │  │
│   └──────────────────────────────────────────────────┘  │
│                          │                              │
│          ┌───────────────┼───────────────┐              │
│          ▼               ▼               ▼              │
│     Subscriber1     Subscriber2     Subscriber3         │
│                                                         │
└─────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Methods to Implement</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">on(event, handler)</code> - Subscribe to event</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">off(event, handler)</code> - Unsubscribe</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">emit(event, ...args)</code> - Trigger event</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">once(event, handler)</code> - Subscribe once</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">removeAllListeners(event)</code> - Clear all</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚡ Advanced Features</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-yellow-400 mb-2">Wildcard Events</h4>
    <p class="text-sm text-light-300">Subscribe to '*' to receive ALL events</p>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-yellow-400 mb-2">Max Listeners</h4>
    <p class="text-sm text-light-300">Warn if too many listeners (memory leak detection)</p>
</div>
</div>
            `,
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  📡 EVENT EMITTER - COMPLETE IMPLEMENTATION                          ║
║  The backbone of event-driven JavaScript!                            ║
╠══════════════════════════════════════════════════════════════════════╣
║  Features: on, off, emit, once, wildcard, max listeners              ║
╚══════════════════════════════════════════════════════════════════════╝
*/

class EventEmitter {
  constructor() {
    this.events = {};
    this.maxListeners = 10;
  }
  
  // Subscribe to an event
  on(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }
    
    if (!this.events[event]) {
      this.events[event] = [];
    }
    
    // Memory leak warning
    if (this.events[event].length >= this.maxListeners) {
      console.warn(\`MaxListenersExceeded: \${event} has \${this.events[event].length} listeners\`);
    }
    
    this.events[event].push(listener);
    return this; // For chaining
  }
  
  // Subscribe once (auto-unsubscribe after first emit)
  once(event, listener) {
    const wrapper = (...args) => {
      listener.apply(this, args);
      this.off(event, wrapper);
    };
    wrapper.originalListener = listener; // For off() to find it
    return this.on(event, wrapper);
  }
  
  // Unsubscribe from an event
  off(event, listener) {
    if (!this.events[event]) return this;
    
    this.events[event] = this.events[event].filter(l => 
      l !== listener && l.originalListener !== listener
    );
    
    return this;
  }
  
  // Emit an event
  emit(event, ...args) {
    // Wildcard listeners get all events
    const wildcardListeners = this.events['*'] || [];
    wildcardListeners.forEach(listener => {
      listener.call(this, event, ...args);
    });
    
    if (!this.events[event]) return false;
    
    // Clone array in case listeners modify it during emit
    const listeners = [...this.events[event]];
    listeners.forEach(listener => {
      listener.apply(this, args);
    });
    
    return true;
  }
  
  // Remove all listeners for an event (or all events)
  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
    return this;
  }
  
  // Get listener count
  listenerCount(event) {
    return this.events[event]?.length || 0;
  }
  
  // Get all event names
  eventNames() {
    return Object.keys(this.events);
  }
  
  setMaxListeners(n) {
    this.maxListeners = n;
    return this;
  }
}

// ═══════════════════════════════════════════════════════════════════
// 🧪 INTERACTIVE DEMO
// ═══════════════════════════════════════════════════════════════════
const EventEmitterDemo = () => {
  const [logs, setLogs] = React.useState([]);
  const emitterRef = React.useRef(new EventEmitter());
  
  const log = (msg, type = 'info') => {
    setLogs(prev => [...prev.slice(-8), { msg, type, time: Date.now() }]);
  };
  
  React.useEffect(() => {
    const emitter = emitterRef.current;
    
    // Set up listeners
    emitter.on('message', (data) => {
      log(\`📨 Message received: \${data}\`, 'success');
    });
    
    emitter.on('error', (err) => {
      log(\`❌ Error: \${err}\`, 'error');
    });
    
    emitter.once('init', () => {
      log('🚀 Init event (fires only once)', 'success');
    });
    
    // Wildcard listener
    emitter.on('*', (event, data) => {
      log(\`👁️ [Wildcard] \${event}: \${JSON.stringify(data)}\`, 'info');
    });
    
    return () => emitter.removeAllListeners();
  }, []);
  
  return (
    <div style={{ padding: '20px', background: '#1a1a2e', borderRadius: '12px' }}>
      <h3 style={{ color: '#fff', marginBottom: '15px' }}>📡 Event Emitter Demo</h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => emitterRef.current.emit('message', 'Hello World!')}
          style={{ ...btnStyle, background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
        >
          Emit Message
        </button>
        <button 
          onClick={() => emitterRef.current.emit('error', 'Something broke!')}
          style={{ ...btnStyle, background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
        >
          Emit Error
        </button>
        <button 
          onClick={() => emitterRef.current.emit('init')}
          style={{ ...btnStyle, background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
        >
          Emit Init (once)
        </button>
        <button 
          onClick={() => emitterRef.current.emit('custom', { foo: 'bar' })}
          style={{ ...btnStyle, background: 'linear-gradient(135deg, #a855f7, #9333ea)' }}
        >
          Emit Custom
        </button>
      </div>
      
      <div style={{ 
        background: '#0f0f1a', 
        padding: '15px', 
        borderRadius: '8px', 
        minHeight: '150px',
        maxHeight: '250px',
        overflowY: 'auto'
      }}>
        {logs.length === 0 ? (
          <p style={{ color: '#666' }}>Click buttons to emit events...</p>
        ) : (
          logs.map((log, i) => (
            <div key={log.time + i} style={{ 
              color: log.type === 'error' ? '#f43f5e' : log.type === 'success' ? '#22c55e' : '#60a5fa',
              fontFamily: 'monospace',
              fontSize: '12px',
              padding: '4px 0',
              borderBottom: '1px solid #1e1e3f'
            }}>
              {log.msg}
            </div>
          ))
        )}
      </div>
      
      <div style={{ marginTop: '10px', color: '#666', fontSize: '11px' }}>
        💡 Tip: Click "Init" multiple times - it only fires once!
      </div>
    </div>
  );
};

const btnStyle = {
  padding: '8px 16px',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '12px'
};

render(<EventEmitterDemo />);`,
            comparison: {
                junior: `// ❌ Basic callback pattern
function onMessage(callback) {
  // Direct callback - no flexibility
  someSource.ondata = callback;
}

// Can't: multiple listeners, remove, once`,
                senior: `// ✅ Full EventEmitter pattern
class EventEmitter {
  on(event, fn) {
    (this.events[event] ??= []).push(fn);
    return this;
  }
  
  emit(event, ...args) {
    this.events[event]?.forEach(fn => fn(...args));
  }
  
  off(event, fn) {
    this.events[event] = 
      this.events[event]?.filter(f => f !== fn);
  }
}`
            },
            interview: {
                questions: [
                    { q: "How do you implement once()?", a: "Create a wrapper function that calls the original listener, then immediately calls off() to remove itself. Store reference to original for off() matching." },
                    { q: "Why clone the listeners array before emitting?", a: "A listener might call off() or on() during execution, modifying the array while iterating. Cloning prevents bugs from mid-iteration mutation." },
                    { q: "How would you implement async emit?", a: "Return a Promise that resolves when all listeners complete. Use Promise.all() with listeners that may return promises. Useful for middleware patterns." },
                    { q: "What's a memory leak concern with EventEmitter?", a: "Forgetting to call off() for listeners, especially in React useEffect without cleanup. Node.js warns at 10+ listeners. Always unsubscribe in cleanup." }
                ]
            }
        },
        {
            day: 24,
            title: '🔥 Debounce & Throttle with Cancel',
            intro: "The most asked utility functions. Build production-grade versions with cancel, immediate, and trailing options.",
            content: `
<div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 p-4 rounded-xl mb-6">
<h4 class="text-green-400 font-bold mb-2">🎯 Interview Frequency: VERY HIGH</h4>
<p class="text-light-300">Asked at almost every frontend interview. You need to know the difference, implementation, AND use cases.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ Debounce vs Throttle</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│  User Actions:  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                 ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲                 ▲ ▲ ▲ ▲ ▲    │
│                 (rapid clicks/keystrokes)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  DEBOUNCE:      ─────────────────────────────────▶ ● (ONE call) │
│                 "Wait until user STOPS, then fire"              │
│                 Use: Search input, resize, auto-save            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  THROTTLE:      ───●───────●───────●───────●───────●────        │
│                 "Fire at most once per X ms"                    │
│                 Use: Scroll, mouse move, game loops             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Production Features</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">cancel()</code> - Cancel pending execution</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">flush()</code> - Execute immediately</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">leading</code> - Fire on first call</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">trailing</code> - Fire after delay</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">maxWait</code> - Max time to wait (throttle hybrid)</li>
</ul>
            `,
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  ⏱️ DEBOUNCE & THROTTLE - PRODUCTION GRADE                           ║
║  With cancel, flush, leading/trailing options                        ║
╠══════════════════════════════════════════════════════════════════════╣
║  These are EXACTLY how lodash implements them!                       ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ DEBOUNCE - Full Implementation
// ═══════════════════════════════════════════════════════════════════
function debounce(func, wait, options = {}) {
  let timeoutId = null;
  let lastArgs = null;
  let lastThis = null;
  let result = null;
  let lastCallTime = null;
  let lastInvokeTime = 0;
  
  const { leading = false, trailing = true, maxWait } = options;
  const maxing = maxWait !== undefined;
  const maxDelay = maxing ? Math.max(maxWait, wait) : wait;
  
  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;
    lastArgs = lastThis = null;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    
    return (
      lastCallTime === null ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxDelay)
    );
  }
  
  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timeoutId = setTimeout(timerExpired, remainingWait(time));
  }
  
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    
    return maxing
      ? Math.min(timeWaiting, maxDelay - timeSinceLastInvoke)
      : timeWaiting;
  }
  
  function leadingEdge(time) {
    lastInvokeTime = time;
    timeoutId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  
  function trailingEdge(time) {
    timeoutId = null;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = null;
    return result;
  }
  
  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    
    if (isInvoking) {
      if (timeoutId === null) {
        return leadingEdge(time);
      }
      if (maxing) {
        timeoutId = setTimeout(timerExpired, wait);
        return invokeFunc(time);
      }
    }
    if (timeoutId === null) {
      timeoutId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  
  debounced.cancel = function() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timeoutId = null;
  };
  
  debounced.flush = function() {
    return timeoutId === null ? result : trailingEdge(Date.now());
  };
  
  debounced.pending = function() {
    return timeoutId !== null;
  };
  
  return debounced;
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ THROTTLE - Using Debounce (lodash style)
// ═══════════════════════════════════════════════════════════════════
function throttle(func, wait, options = {}) {
  const { leading = true, trailing = true } = options;
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait
  });
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ SIMPLE VERSIONS (for quick interviews)
// ═══════════════════════════════════════════════════════════════════
function simpleDebounce(fn, delay) {
  let timeoutId;
  
  function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  }
  
  debounced.cancel = () => clearTimeout(timeoutId);
  return debounced;
}

function simpleThrottle(fn, limit) {
  let inThrottle = false;
  
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ═══════════════════════════════════════════════════════════════════
// 🧪 INTERACTIVE DEMO
// ═══════════════════════════════════════════════════════════════════
const DebounceThrottleDemo = () => {
  const [normalCount, setNormalCount] = React.useState(0);
  const [debounceCount, setDebounceCount] = React.useState(0);
  const [throttleCount, setThrottleCount] = React.useState(0);
  const [clicks, setClicks] = React.useState(0);
  
  const debouncedFn = React.useMemo(() => 
    simpleDebounce(() => setDebounceCount(c => c + 1), 500)
  , []);
  
  const throttledFn = React.useMemo(() => 
    simpleThrottle(() => setThrottleCount(c => c + 1), 500)
  , []);
  
  const handleClick = () => {
    setClicks(c => c + 1);
    setNormalCount(c => c + 1);
    debouncedFn();
    throttledFn();
  };
  
  return (
    <div style={{ padding: '20px', background: '#1a1a2e', borderRadius: '12px' }}>
      <h3 style={{ color: '#fff', marginBottom: '15px' }}>⏱️ Debounce vs Throttle Demo</h3>
      <p style={{ color: '#888', marginBottom: '15px', fontSize: '13px' }}>
        Click rapidly to see the difference! (500ms delay)
      </p>
      
      <button 
        onClick={handleClick}
        style={{
          padding: '15px 30px',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '16px',
          marginBottom: '20px'
        }}
      >
        🖱️ Click Me Rapidly! ({clicks} clicks)
      </button>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        <div style={{ background: '#dc2626', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff' }}>{normalCount}</div>
          <div style={{ color: '#fca5a5', fontSize: '12px' }}>Normal (every click)</div>
        </div>
        <div style={{ background: '#2563eb', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff' }}>{debounceCount}</div>
          <div style={{ color: '#93c5fd', fontSize: '12px' }}>Debounced (after pause)</div>
        </div>
        <div style={{ background: '#7c3aed', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff' }}>{throttleCount}</div>
          <div style={{ color: '#c4b5fd', fontSize: '12px' }}>Throttled (max 1/500ms)</div>
        </div>
      </div>
      
      <div style={{ marginTop: '15px', padding: '10px', background: '#0f0f1a', borderRadius: '8px' }}>
        <div style={{ color: '#22c55e', fontSize: '12px' }}>
          ✅ Debounce: Waits for you to STOP clicking, then fires once
        </div>
        <div style={{ color: '#3b82f6', fontSize: '12px', marginTop: '5px' }}>
          ✅ Throttle: Fires immediately, then at most once per 500ms
        </div>
      </div>
    </div>
  );
};

render(<DebounceThrottleDemo />);`,
            comparison: {
                junior: `// ❌ Basic debounce without cancel
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
// Missing: cancel, flush, leading option, 'this' context`,
                senior: `// ✅ Production debounce
function debounce(fn, delay, { leading, trailing } = {}) {
  let timer, lastArgs;
  
  const debounced = function(...args) {
    lastArgs = args;
    
    if (leading && !timer) {
      fn.apply(this, args);
    }
    
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (trailing) fn.apply(this, lastArgs);
      timer = null;
    }, delay);
  };
  
  debounced.cancel = () => clearTimeout(timer);
  debounced.flush = () => timer && fn(...lastArgs);
  return debounced;
}`
            },
            interview: {
                questions: [
                    { q: "When to use debounce vs throttle?", a: "Debounce: search input, resize, auto-save (wait for user to stop). Throttle: scroll handler, mouse move, game loop (limit rate of execution)." },
                    { q: "What is the 'leading' option?", a: "Fire immediately on first call, then wait. Useful for button clicks where you want instant feedback but prevent double-click." },
                    { q: "Why is cancel() important?", a: "Memory leak prevention. If component unmounts while timer pending, callback might fire on unmounted component. Always cancel in cleanup." },
                    { q: "How does lodash throttle work internally?", a: "It's actually debounce with maxWait equal to wait time! maxWait ensures function fires at least once per interval even if continuously called." }
                ]
            }
        },
        {
            day: 25,
            title: '🔥 Deep Clone, Deep Equal & Flatten',
            intro: "Core utility functions every senior dev must master. Handle circular refs, symbols, and edge cases.",
            content: `
<div class="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 p-4 rounded-xl mb-6">
<h4 class="text-amber-400 font-bold mb-2">🎯 Why These Matter</h4>
<p class="text-light-300">JSON.parse(JSON.stringify()) fails for: functions, undefined, symbols, dates, circular refs, maps, sets. Real apps need proper solutions.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📋 Three Must-Know Utilities</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">deepClone</code> - Copy object with all nested values</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">deepEqual</code> - Compare objects deeply</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">flatten</code> - Flatten nested object/array</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">⚠️ Edge Cases to Handle</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-red-400 mb-2">Deep Clone Edge Cases</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Circular references</li>
        <li>Date, RegExp, Map, Set</li>
        <li>Functions (can't clone)</li>
        <li>Symbols as keys</li>
        <li>Prototype chain</li>
    </ul>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-red-400 mb-2">Deep Equal Edge Cases</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>NaN === NaN should be true</li>
        <li>+0 vs -0 difference</li>
        <li>Object vs Array distinction</li>
        <li>Null vs undefined</li>
        <li>Property order matters?</li>
    </ul>
</div>
</div>
            `,
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔧 DEEP CLONE, DEEP EQUAL & FLATTEN                                 ║
║  Production-grade utility functions                                  ║
╠══════════════════════════════════════════════════════════════════════╣
║  Handle: circular refs, Date, RegExp, Map, Set, Symbols              ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ DEEP CLONE - Handle all edge cases
// ═══════════════════════════════════════════════════════════════════
function deepClone(obj, hash = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle circular references
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  
  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  
  // Handle Map
  if (obj instanceof Map) {
    const clonedMap = new Map();
    hash.set(obj, clonedMap);
    obj.forEach((value, key) => {
      clonedMap.set(deepClone(key, hash), deepClone(value, hash));
    });
    return clonedMap;
  }
  
  // Handle Set
  if (obj instanceof Set) {
    const clonedSet = new Set();
    hash.set(obj, clonedSet);
    obj.forEach(value => {
      clonedSet.add(deepClone(value, hash));
    });
    return clonedSet;
  }
  
  // Handle Array
  if (Array.isArray(obj)) {
    const clonedArr = [];
    hash.set(obj, clonedArr);
    obj.forEach((item, index) => {
      clonedArr[index] = deepClone(item, hash);
    });
    return clonedArr;
  }
  
  // Handle Object
  const clonedObj = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, clonedObj);
  
  // Clone all properties including symbols
  Reflect.ownKeys(obj).forEach(key => {
    clonedObj[key] = deepClone(obj[key], hash);
  });
  
  return clonedObj;
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ DEEP EQUAL - Compare objects deeply
// ═══════════════════════════════════════════════════════════════════
function deepEqual(a, b, seen = new WeakMap()) {
  // Identical references
  if (a === b) return true;
  
  // Handle NaN (NaN !== NaN, but we want true)
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  
  // If not both objects, they're not equal
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a === null || b === null) return false;
  
  // Handle circular references
  if (seen.has(a)) return seen.get(a) === b;
  seen.set(a, b);
  
  // Different constructors = not equal
  if (a.constructor !== b.constructor) return false;
  
  // Handle Date
  if (a instanceof Date) {
    return a.getTime() === b.getTime();
  }
  
  // Handle RegExp
  if (a instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }
  
  // Handle Map
  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, val] of a) {
      if (!b.has(key) || !deepEqual(val, b.get(key), seen)) return false;
    }
    return true;
  }
  
  // Handle Set
  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    for (const val of a) {
      if (!b.has(val)) return false;
    }
    return true;
  }
  
  // Handle Arrays and Objects
  const keysA = Reflect.ownKeys(a);
  const keysB = Reflect.ownKeys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  return keysA.every(key => 
    keysB.includes(key) && deepEqual(a[key], b[key], seen)
  );
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ FLATTEN OBJECT - Nested to dot notation
// ═══════════════════════════════════════════════════════════════════
function flattenObject(obj, prefix = '', result = {}) {
  for (const key of Object.keys(obj)) {
    const newKey = prefix ? \`\${prefix}.\${key}\` : key;
    
    if (
      typeof obj[key] === 'object' && 
      obj[key] !== null && 
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

// Unflatten back to nested
function unflattenObject(obj) {
  const result = {};
  
  for (const key of Object.keys(obj)) {
    const keys = key.split('.');
    let current = result;
    
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        current[k] = obj[key];
      } else {
        current[k] = current[k] || {};
        current = current[k];
      }
    }
  }
  
  return result;
}

// ═══════════════════════════════════════════════════════════════════
// 4️⃣ FLATTEN ARRAY - Any depth
// ═══════════════════════════════════════════════════════════════════
function flattenArray(arr, depth = Infinity) {
  if (depth < 1) return arr.slice();
  
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flattenArray(val, depth - 1));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

// ═══════════════════════════════════════════════════════════════════
// 🧪 INTERACTIVE DEMO
// ═══════════════════════════════════════════════════════════════════
const UtilityDemo = () => {
  const [results, setResults] = React.useState([]);
  
  const runTests = () => {
    const logs = [];
    
    // Test Deep Clone
    const original = {
      name: 'John',
      date: new Date(),
      nested: { deep: { value: 42 } },
      arr: [1, [2, 3]],
      map: new Map([['key', 'value']])
    };
    original.circular = original; // Circular ref!
    
    const cloned = deepClone(original);
    logs.push('✅ Deep Clone: Circular ref handled');
    logs.push('   Clone date: ' + (cloned.date instanceof Date));
    logs.push('   Clone map: ' + (cloned.map instanceof Map));
    
    // Test Deep Equal
    const a = { x: 1, y: { z: [1, 2, 3] } };
    const b = { x: 1, y: { z: [1, 2, 3] } };
    const c = { x: 1, y: { z: [1, 2, 4] } };
    logs.push('✅ Deep Equal: ' + deepEqual(a, b) + ' (should be true)');
    logs.push('   Not Equal: ' + deepEqual(a, c) + ' (should be false)');
    logs.push('   NaN === NaN: ' + deepEqual(NaN, NaN) + ' (should be true)');
    
    // Test Flatten
    const nested = { a: { b: { c: 1 } }, d: 2 };
    const flat = flattenObject(nested);
    logs.push('✅ Flatten: ' + JSON.stringify(flat));
    logs.push('   Unflatten: ' + JSON.stringify(unflattenObject(flat)));
    
    // Test Array Flatten
    const deepArr = [1, [2, [3, [4, [5]]]]];
    logs.push('✅ Flatten Array: ' + JSON.stringify(flattenArray(deepArr)));
    logs.push('   Depth 2: ' + JSON.stringify(flattenArray(deepArr, 2)));
    
    setResults(logs);
  };
  
  return (
    <div style={{ padding: '20px', background: '#1a1a2e', borderRadius: '12px' }}>
      <h3 style={{ color: '#fff', marginBottom: '15px' }}>🔧 Utility Functions Demo</h3>
      
      <button 
        onClick={runTests}
        style={{
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '15px'
        }}
      >
        ▶ Run All Tests
      </button>
      
      <div style={{ background: '#0f0f1a', padding: '15px', borderRadius: '8px' }}>
        {results.length === 0 ? (
          <p style={{ color: '#666' }}>Click to test utilities...</p>
        ) : (
          results.map((log, i) => (
            <div key={i} style={{ 
              color: log.startsWith('✅') ? '#22c55e' : '#60a5fa',
              fontFamily: 'monospace',
              fontSize: '12px',
              padding: '2px 0'
            }}>
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

render(<UtilityDemo />);`,
            comparison: {
                junior: `// ❌ Using JSON for deep clone
const clone = JSON.parse(JSON.stringify(obj));
// Fails for: Date, RegExp, Map, Set, 
// undefined, functions, circular refs, symbols`,
                senior: `// ✅ Proper deep clone with WeakMap
function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return seen.get(obj); // Circular!
  
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Map) {
    const clone = new Map();
    seen.set(obj, clone);
    obj.forEach((v, k) => clone.set(k, deepClone(v, seen)));
    return clone;
  }
  // ... handle all types
}`
            },
            interview: {
                questions: [
                    { q: "Why use WeakMap for circular reference tracking?", a: "WeakMap allows garbage collection of objects when no longer referenced elsewhere. Regular Map would prevent GC and cause memory leaks in long-running operations." },
                    { q: "Why does JSON.stringify fail for circular refs?", a: "JSON.stringify traverses the object tree recursively. With circular refs, it enters infinite recursion and throws 'Converting circular structure to JSON'." },
                    { q: "How do you handle NaN in deepEqual?", a: "NaN !== NaN in JavaScript. Use Number.isNaN() to detect NaN values and return true when comparing two NaNs for deep equality." },
                    { q: "What's Reflect.ownKeys() vs Object.keys()?", a: "Object.keys() returns only enumerable string keys. Reflect.ownKeys() returns ALL own keys including symbols and non-enumerable properties." }
                ]
            }
        },
        {
            day: 26,
            title: '🔥 LRU Cache Implementation',
            intro: "A classic data structures interview question. Used in browser caching, memoization, and database query caching.",
            content: `
<div class="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 p-4 rounded-xl mb-6">
<h4 class="text-indigo-400 font-bold mb-2">🎯 LeetCode #146 - Medium</h4>
<p class="text-light-300">LRU Cache is asked at Google, Amazon, Facebook, and Microsoft. Master it!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📐 LRU Cache Concept</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│                    LRU CACHE (capacity: 3)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Most Recent ◄────────────────────────────► Least Recent       │
│                                                                 │
│   ┌───────┐     ┌───────┐     ┌───────┐                         │
│   │ Key:C │ ←→  │ Key:A │ ←→  │ Key:B │                         │
│   │ Val:3 │     │ Val:1 │     │ Val:2 │                         │
│   └───────┘     └───────┘     └───────┘                         │
│       ▲                           ▲                             │
│       │                           │                             │
│   HEAD (MRU)                  TAIL (LRU)                        │
│                                                                 │
│   On get(A): Move A to HEAD                                     │
│   On put(D): Remove TAIL (B), add D at HEAD                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Requirements</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">get(key)</code> - O(1) lookup, moves to front</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">put(key, value)</code> - O(1) insert/update</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">capacity</code> - Max items, evict LRU when full</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚡ Data Structure Choice</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-green-400 mb-2">Hash Map</h4>
    <p class="text-sm text-light-300">O(1) key lookup to find node</p>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-green-400 mb-2">Doubly Linked List</h4>
    <p class="text-sm text-light-300">O(1) move to front, O(1) remove from end</p>
</div>
</div>
            `,
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  📦 LRU CACHE - O(1) GET AND PUT                                     ║
║  LeetCode #146 - Asked at FAANG                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  Uses: HashMap + Doubly Linked List                                  ║
╚══════════════════════════════════════════════════════════════════════╝
*/

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // key -> node
    
    // Dummy head and tail for easier edge case handling
    this.head = { key: null, value: null, prev: null, next: null };
    this.tail = { key: null, value: null, prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  // Add node right after head (most recently used)
  _addToFront(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }
  
  // Remove node from its current position
  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  
  // Move existing node to front
  _moveToFront(node) {
    this._removeNode(node);
    this._addToFront(node);
  }
  
  // Remove and return the least recently used (before tail)
  _removeLRU() {
    const lru = this.tail.prev;
    this._removeNode(lru);
    return lru;
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    
    const node = this.cache.get(key);
    this._moveToFront(node); // Mark as recently used
    return node.value;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      // Update existing
      const node = this.cache.get(key);
      node.value = value;
      this._moveToFront(node);
    } else {
      // Add new
      const newNode = { key, value, prev: null, next: null };
      this.cache.set(key, newNode);
      this._addToFront(newNode);
      
      // Evict if over capacity
      if (this.cache.size > this.capacity) {
        const lru = this._removeLRU();
        this.cache.delete(lru.key);
      }
    }
  }
  
  // Helper: Get current cache state for visualization
  getState() {
    const items = [];
    let current = this.head.next;
    while (current !== this.tail) {
      items.push({ key: current.key, value: current.value });
      current = current.next;
    }
    return items;
  }
}

// ═══════════════════════════════════════════════════════════════════
// 🧪 INTERACTIVE DEMO
// ═══════════════════════════════════════════════════════════════════
const LRUDemo = () => {
  const [cache] = React.useState(() => new LRUCache(3));
  const [state, setState] = React.useState([]);
  const [logs, setLogs] = React.useState([]);
  const [key, setKey] = React.useState('');
  const [value, setValue] = React.useState('');
  
  const log = (msg) => setLogs(prev => [...prev.slice(-5), msg]);
  
  const updateState = () => setState(cache.getState());
  
  const handlePut = () => {
    if (!key) return;
    cache.put(key, value || key);
    log(\`PUT(\${key}, \${value || key})\`);
    updateState();
    setKey('');
    setValue('');
  };
  
  const handleGet = (k) => {
    const result = cache.get(k);
    log(\`GET(\${k}) → \${result}\`);
    updateState();
  };
  
  return (
    <div style={{ padding: '20px', background: '#1a1a2e', borderRadius: '12px' }}>
      <h3 style={{ color: '#fff', marginBottom: '15px' }}>📦 LRU Cache (Capacity: 3)</h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder="Key"
          style={{ padding: '8px', borderRadius: '4px', border: 'none', width: '80px' }}
        />
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Value"
          style={{ padding: '8px', borderRadius: '4px', border: 'none', width: '80px' }}
        />
        <button onClick={handlePut} style={btnStyle}>PUT</button>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '15px',
        padding: '15px',
        background: '#0f0f1a',
        borderRadius: '8px',
        minHeight: '60px',
        alignItems: 'center'
      }}>
        <span style={{ color: '#22c55e', fontSize: '12px' }}>MRU →</span>
        {state.map((item, i) => (
          <div 
            key={item.key}
            onClick={() => handleGet(item.key)}
            style={{
              padding: '10px 15px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#fff',
              fontSize: '13px'
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{item.key}</div>
            <div style={{ fontSize: '11px', opacity: 0.8 }}>{item.value}</div>
          </div>
        ))}
        {state.length === 0 && <span style={{ color: '#666' }}>Cache is empty</span>}
        <span style={{ color: '#ef4444', fontSize: '12px', marginLeft: 'auto' }}>← LRU</span>
      </div>
      
      <div style={{ background: '#0f0f1a', padding: '10px', borderRadius: '8px', maxHeight: '100px', overflowY: 'auto' }}>
        {logs.map((log, i) => (
          <div key={i} style={{ color: '#60a5fa', fontFamily: 'monospace', fontSize: '12px' }}>
            {log}
          </div>
        ))}
      </div>
      
      <p style={{ color: '#888', fontSize: '11px', marginTop: '10px' }}>
        💡 Click items to GET them (moves to front). Add 4th item to see eviction!
      </p>
    </div>
  );
};

const btnStyle = {
  padding: '8px 16px',
  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

render(<LRUDemo />);`,
            comparison: {
                junior: `// ❌ O(n) implementation
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = [];
  }
  
  get(key) {
    const idx = this.cache.findIndex(x => x.key === key); // O(n)
    if (idx === -1) return -1;
    const item = this.cache.splice(idx, 1)[0]; // O(n)
    this.cache.unshift(item); // O(n)
    return item.value;
  }
}`,
                senior: `// ✅ O(1) with HashMap + Doubly Linked List
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // O(1) lookup
    // Doubly linked list for O(1) reorder
    this.head = {};
    this.tail = {};
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    const node = this.cache.get(key);
    this._moveToFront(node); // O(1)
    return node.value;
  }
}`
            },
            interview: {
                questions: [
                    { q: "Why use dummy head and tail nodes?", a: "Simplifies edge cases. Without them, you'd need special handling for empty list, single item, adding to empty, etc. Dummy nodes mean head.next is always the real first item." },
                    { q: "Time complexity of all operations?", a: "Both get() and put() are O(1). HashMap gives O(1) lookup. Doubly linked list gives O(1) insert/remove since we have direct node reference." },
                    { q: "Why not use a singly linked list?", a: "To remove a node in O(1), we need access to its previous node. With singly linked, we'd need O(n) traversal. Doubly linked stores prev pointer for O(1) removal." },
                    { q: "Real-world uses of LRU Cache?", a: "Browser cache, Redis, database query caching, React.memo-like memoization, CDN edge caching, DNS lookup caching." }
                ]
            }
        },
        {
            day: 27,
            title: '🔥 Retry with Exponential Backoff',
            intro: "Production-grade API retry logic. Handle network failures gracefully with smart retry strategies.",
            content: `
<div class="bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30 p-4 rounded-xl mb-6">
<h4 class="text-rose-400 font-bold mb-2">🎯 Real-World Essential</h4>
<p class="text-light-300">Every production app needs retry logic. AWS SDKs, Stripe, and all major APIs use exponential backoff. Master it!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📐 Exponential Backoff Concept</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│                EXPONENTIAL BACKOFF TIMELINE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Attempt 1: ──X (fail)                                          │
│             └── Wait 1s ──┐                                     │
│                           │                                     │
│  Attempt 2: ──────────────X (fail)                              │
│                           └── Wait 2s ──┐                       │
│                                         │                       │
│  Attempt 3: ────────────────────────────X (fail)                │
│                                         └── Wait 4s ──┐         │
│                                                       │         │
│  Attempt 4: ──────────────────────────────────────────✓ SUCCESS │
│                                                                 │
│  Formula: delay = baseDelay * (2 ^ attemptNumber) + jitter      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Key Features</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">maxRetries</code> - Maximum retry attempts</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">baseDelay</code> - Initial delay in ms</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">maxDelay</code> - Cap the maximum delay</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">jitter</code> - Random variance to prevent thundering herd</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">retryOn</code> - Condition function for retry</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚡ Why Jitter?</h3>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600 mb-6">
<p class="text-light-300 text-sm">Without jitter, if 1000 clients fail at the same time, they ALL retry at exactly 1s, 2s, 4s... This "thundering herd" can crash your server. Jitter adds randomness so retries spread out.</p>
</div>
            `,
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔄 RETRY WITH EXPONENTIAL BACKOFF                                   ║
║  Production-grade retry logic for API calls                          ║
╠══════════════════════════════════════════════════════════════════════╣
║  Features: Exponential delay, jitter, max delay, abort signal        ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ FULL-FEATURED RETRY FUNCTION
// ═══════════════════════════════════════════════════════════════════
async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    jitter = true,
    retryOn = () => true, // Retry on any error by default
    onRetry = () => {},   // Callback before each retry
    signal = null         // AbortSignal support
  } = options;
  
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Check if aborted
      if (signal?.aborted) {
        throw new Error('Retry aborted');
      }
      
      return await fn(attempt);
      
    } catch (error) {
      lastError = error;
      
      // Check if we should retry
      if (attempt >= maxRetries || !retryOn(error, attempt)) {
        throw error;
      }
      
      // Calculate delay with exponential backoff
      let delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      
      // Add jitter (±25% randomness)
      if (jitter) {
        const jitterAmount = delay * 0.25;
        delay += Math.random() * jitterAmount * 2 - jitterAmount;
      }
      
      // Notify before retry
      onRetry({ attempt, delay, error });
      
      // Wait before retry
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, delay);
        
        // Handle abort during wait
        if (signal) {
          signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Retry aborted'));
          }, { once: true });
        }
      });
    }
  }
  
  throw lastError;
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ SIMPLE VERSION (for interviews)
// ═══════════════════════════════════════════════════════════════════
async function simpleRetry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries) throw error;
      await new Promise(r => setTimeout(r, delay * Math.pow(2, i)));
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ FETCH WITH RETRY WRAPPER
// ═══════════════════════════════════════════════════════════════════
async function fetchWithRetry(url, options = {}, retryOptions = {}) {
  return retryWithBackoff(
    async () => {
      const response = await fetch(url, options);
      
      // Retry on server errors (5xx) but not client errors (4xx)
      if (response.status >= 500) {
        throw new Error(\`Server error: \${response.status}\`);
      }
      
      if (!response.ok) {
        throw new Error(\`HTTP error: \${response.status}\`);
      }
      
      return response;
    },
    {
      ...retryOptions,
      retryOn: (error) => {
        // Retry on network errors and 5xx
        return error.message.includes('Server error') || 
               error.message.includes('fetch');
      }
    }
  );
}

// ═══════════════════════════════════════════════════════════════════
// 🧪 INTERACTIVE DEMO
// ═══════════════════════════════════════════════════════════════════
const RetryDemo = () => {
  const [logs, setLogs] = React.useState([]);
  const [isRunning, setIsRunning] = React.useState(false);
  const [failRate, setFailRate] = React.useState(70);
  const abortControllerRef = React.useRef(null);
  
  const log = (msg, type = 'info') => {
    setLogs(prev => [...prev, { msg, type, time: Date.now() }]);
  };
  
  const simulateAPI = async (attempt) => {
    log(\`📡 Attempt \${attempt + 1}: Calling API...\`, 'info');
    await new Promise(r => setTimeout(r, 500)); // Simulate network
    
    if (Math.random() * 100 < failRate) {
      throw new Error('Server error: 503');
    }
    
    return { success: true, data: 'Hello from API!' };
  };
  
  const runRetry = async () => {
    setLogs([]);
    setIsRunning(true);
    abortControllerRef.current = new AbortController();
    
    log('🚀 Starting retry sequence...', 'info');
    
    try {
      const result = await retryWithBackoff(simulateAPI, {
        maxRetries: 4,
        baseDelay: 1000,
        signal: abortControllerRef.current.signal,
        onRetry: ({ attempt, delay, error }) => {
          log(\`❌ Failed: \${error.message}\`, 'error');
          log(\`⏳ Waiting \${Math.round(delay)}ms before retry...\`, 'warning');
        }
      });
      
      log(\`✅ Success: \${JSON.stringify(result)}\`, 'success');
    } catch (error) {
      log(\`💥 All retries failed: \${error.message}\`, 'error');
    }
    
    setIsRunning(false);
  };
  
  const abort = () => {
    abortControllerRef.current?.abort();
    log('🛑 Aborted!', 'error');
  };
  
  return (
    <div style={{ padding: '20px', background: '#1a1a2e', borderRadius: '12px' }}>
      <h3 style={{ color: '#fff', marginBottom: '15px' }}>🔄 Retry with Exponential Backoff</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ color: '#888', fontSize: '12px' }}>
          Failure Rate: {failRate}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={failRate}
          onChange={e => setFailRate(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button 
          onClick={runRetry}
          disabled={isRunning}
          style={{
            padding: '10px 20px',
            background: isRunning ? '#666' : 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isRunning ? '⏳ Running...' : '▶ Start Retry'}
        </button>
        
        {isRunning && (
          <button 
            onClick={abort}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🛑 Abort
          </button>
        )}
      </div>
      
      <div style={{ 
        background: '#0f0f1a', 
        padding: '15px', 
        borderRadius: '8px',
        maxHeight: '200px',
        overflowY: 'auto'
      }}>
        {logs.map((log, i) => (
          <div key={log.time + i} style={{ 
            color: log.type === 'error' ? '#f43f5e' : 
                   log.type === 'success' ? '#22c55e' : 
                   log.type === 'warning' ? '#f59e0b' : '#60a5fa',
            fontFamily: 'monospace',
            fontSize: '12px',
            padding: '3px 0'
          }}>
            {log.msg}
          </div>
        ))}
      </div>
    </div>
  );
};

render(<RetryDemo />);`,
            comparison: {
                junior: `// ❌ No retry logic
async function fetchData() {
  const res = await fetch('/api/data');
  return res.json();
}
// Network blip = user sees error`,
                senior: `// ✅ Production retry with backoff
async function fetchData() {
  return retryWithBackoff(
    () => fetch('/api/data').then(r => r.json()),
    {
      maxRetries: 3,
      baseDelay: 1000,
      retryOn: (err) => err.name !== 'AbortError',
      onRetry: ({ attempt, delay }) => {
        console.log(\`Retry \${attempt} in \${delay}ms\`);
      }
    }
  );
}`
            },
            interview: {
                questions: [
                    { q: "Why exponential backoff instead of fixed delay?", a: "Gives the server time to recover. If server is overloaded, hammering it every 1s makes it worse. Exponential delay (1s, 2s, 4s, 8s) reduces load progressively." },
                    { q: "What is jitter and why use it?", a: "Random variance in delay timing. Prevents 'thundering herd' where many clients retry at exact same moment after a failure, potentially crashing the recovering server." },
                    { q: "When should you NOT retry?", a: "Client errors (4xx) - request is invalid, retrying won't help. Idempotency issues - don't retry POST that might duplicate data. Auth errors - token is invalid." },
                    { q: "How to handle abort during retry?", a: "Use AbortController. Pass signal to options, check signal.aborted before each attempt, and listen for abort event during delay to cancel the timeout." }
                ]
            }
        },
        {
            day: 28,
            title: '🔥 Top 20 JS Output Questions',
            intro: "The most common tricky output questions asked in interviews. Master these and you'll never be surprised.",
            content: `
<div class="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
<h4 class="text-yellow-400 font-bold mb-2">🎯 Most Asked in Interviews</h4>
<p class="text-light-300">These exact questions appear in 90% of JavaScript interviews. Know them cold!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📋 Categories Covered</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Hoisting</code> - var, let, const, functions</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Closures</code> - Loop closures, setTimeout</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">this keyword</code> - Arrow vs regular functions</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Event Loop</code> - Promise, setTimeout order</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Coercion</code> - Type conversion gotchas</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Scope</code> - Block vs function scope</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚡ Pro Tips</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-green-400 mb-2">During Interview</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Think out loud</li>
        <li>Explain WHY, not just WHAT</li>
        <li>Mention edge cases</li>
    </ul>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-yellow-400 mb-2">Common Traps</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>setTimeout(..., 0) isn't immediate</li>
        <li>Promise.then is microtask</li>
        <li>Arrow functions don't have 'this'</li>
    </ul>
</div>
</div>
            `,
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🎯 TOP 20 JAVASCRIPT OUTPUT QUESTIONS                               ║
║  Master these and ace any JS interview!                              ║
╠══════════════════════════════════════════════════════════════════════╣
║  Run each example and understand WHY before moving to next!          ║
╚══════════════════════════════════════════════════════════════════════╝
*/

const OutputQuestions = () => {
  const [currentQ, setCurrentQ] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);
  
  const questions = [
    // 1. Hoisting
    {
      title: "1. Hoisting with var",
      code: \`console.log(a);
var a = 5;
console.log(a);\`,
      answer: "undefined, 5",
      explanation: "var is hoisted with value undefined. Only declaration is hoisted, not initialization."
    },
    // 2. let TDZ
    {
      title: "2. Temporal Dead Zone",
      code: \`console.log(x);
let x = 10;\`,
      answer: "ReferenceError",
      explanation: "let/const are hoisted but not initialized. Accessing before declaration throws ReferenceError (TDZ)."
    },
    // 3. Closure in loop
    {
      title: "3. Classic Closure Trap",
      code: \`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}\`,
      answer: "3, 3, 3",
      explanation: "var is function-scoped. All callbacks share same 'i'. By the time they run, i is 3."
    },
    // 4. let in loop
    {
      title: "4. let Fixes Closure",
      code: \`for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}\`,
      answer: "0, 1, 2",
      explanation: "let is block-scoped. Each iteration gets its own 'i'. Closures capture different values."
    },
    // 5. Event Loop
    {
      title: "5. Event Loop Order",
      code: \`console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');\`,
      answer: "1, 4, 3, 2",
      explanation: "Sync first (1,4), then microtasks/Promises (3), then macrotasks/setTimeout (2)."
    },
    // 6. this in object
    {
      title: "6. 'this' in Object Method",
      code: \`const obj = {
  name: 'John',
  greet: function() {
    return this.name;
  }
};
console.log(obj.greet());\`,
      answer: "John",
      explanation: "When called as obj.greet(), 'this' refers to obj (implicit binding)."
    },
    // 7. this lost
    {
      title: "7. 'this' Gets Lost",
      code: \`const obj = {
  name: 'John',
  greet: function() { return this.name; }
};
const fn = obj.greet;
console.log(fn());\`,
      answer: "undefined",
      explanation: "Assigning method to variable loses 'this' binding. In non-strict mode, this is window."
    },
    // 8. Arrow this
    {
      title: "8. Arrow Function 'this'",
      code: \`const obj = {
  name: 'John',
  greet: () => this.name
};
console.log(obj.greet());\`,
      answer: "undefined",
      explanation: "Arrow functions don't have own 'this'. They use lexical scope (window/global here)."
    },
    // 9. Type coercion
    {
      title: "9. Type Coercion",
      code: \`console.log(1 + '2');
console.log('3' - 1);
console.log(true + true);\`,
      answer: "'12', 2, 2",
      explanation: "+ with string concatenates. - converts to number. true becomes 1."
    },
    // 10. == vs ===
    {
      title: "10. Equality Gotchas",
      code: \`console.log([] == false);
console.log([] === false);
console.log(null == undefined);\`,
      answer: "true, false, true",
      explanation: "== does type coercion ([] → '' → 0 → false). === checks type first. null == undefined is special case."
    },
    // 11. Object reference
    {
      title: "11. Object Reference",
      code: \`const a = { x: 1 };
const b = a;
b.x = 2;
console.log(a.x);\`,
      answer: "2",
      explanation: "Objects are passed by reference. b and a point to same object in memory."
    },
    // 12. const mutation
    {
      title: "12. const Doesn't Mean Immutable",
      code: \`const arr = [1, 2];
arr.push(3);
console.log(arr);\`,
      answer: "[1, 2, 3]",
      explanation: "const prevents reassignment, not mutation. The array itself can be modified."
    },
    // 13. NaN comparison
    {
      title: "13. NaN Weirdness",
      code: \`console.log(NaN === NaN);
console.log(typeof NaN);
console.log(Number.isNaN(NaN));\`,
      answer: "false, 'number', true",
      explanation: "NaN is the only value not equal to itself! Use Number.isNaN() to check."
    },
    // 14. Array methods
    {
      title: "14. map vs forEach Return",
      code: \`const a = [1, 2].map(x => x * 2);
const b = [1, 2].forEach(x => x * 2);
console.log(a, b);\`,
      answer: "[2, 4], undefined",
      explanation: "map returns new array with results. forEach returns undefined (side effects only)."
    },
    // 15. Spread vs Reference
    {
      title: "15. Shallow Copy",
      code: \`const orig = { a: 1, b: { c: 2 } };
const copy = { ...orig };
copy.b.c = 99;
console.log(orig.b.c);\`,
      answer: "99",
      explanation: "Spread is shallow copy. Nested objects are still references to original."
    },
    // 16. Function hoisting
    {
      title: "16. Function Declaration Hoisting",
      code: \`console.log(foo());
function foo() { return 'hello'; }\`,
      answer: "'hello'",
      explanation: "Function declarations are fully hoisted (both name and body). Can call before definition."
    },
    // 17. Function expression
    {
      title: "17. Function Expression Not Hoisted",
      code: \`console.log(foo());
var foo = function() { return 'hello'; };\`,
      answer: "TypeError",
      explanation: "Variable is hoisted as undefined. Calling undefined() throws TypeError."
    },
    // 18. Promise chain
    {
      title: "18. Promise Chain Values",
      code: \`Promise.resolve(1)
  .then(x => x + 1)
  .then(x => { x + 1 })
  .then(x => console.log(x));\`,
      answer: "undefined",
      explanation: "Middle then has no return (implicit undefined). {} is function body, not object."
    },
    // 19. delete
    {
      title: "19. delete Operator",
      code: \`const obj = { a: 1 };
delete obj.a;
console.log(obj.a);\`,
      answer: "undefined",
      explanation: "delete removes property from object. Accessing deleted property returns undefined."
    },
    // 20. arguments
    {
      title: "20. Arguments in Arrow",
      code: \`const fn = () => arguments;
fn(1, 2, 3);\`,
      answer: "ReferenceError",
      explanation: "Arrow functions don't have 'arguments'. Use rest params (...args) instead."
    }
  ];
  
  const q = questions[currentQ];
  
  return (
    <div style={{ padding: '20px', background: '#1a1a2e', borderRadius: '12px' }}>
      <h3 style={{ color: '#fff', marginBottom: '10px' }}>{q.title}</h3>
      
      <div style={{ 
        background: '#0f0f1a', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '15px',
        fontFamily: 'monospace'
      }}>
        <pre style={{ color: '#60a5fa', fontSize: '13px', margin: 0, whiteSpace: 'pre-wrap' }}>
          {q.code}
        </pre>
      </div>
      
      <button 
        onClick={() => setShowAnswer(!showAnswer)}
        style={{
          padding: '10px 20px',
          background: showAnswer ? '#666' : 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '15px'
        }}
      >
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>
      
      {showAnswer && (
        <div style={{ background: '#1e3a5f', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
          <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '10px' }}>
            Output: {q.answer}
          </div>
          <div style={{ color: '#93c5fd', fontSize: '13px' }}>
            {q.explanation}
          </div>
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
        <button 
          onClick={() => { setCurrentQ(Math.max(0, currentQ - 1)); setShowAnswer(false); }}
          disabled={currentQ === 0}
          style={{ ...navBtn, opacity: currentQ === 0 ? 0.5 : 1 }}
        >
          ← Previous
        </button>
        <span style={{ color: '#888' }}>{currentQ + 1} / {questions.length}</span>
        <button 
          onClick={() => { setCurrentQ(Math.min(questions.length - 1, currentQ + 1)); setShowAnswer(false); }}
          disabled={currentQ === questions.length - 1}
          style={{ ...navBtn, opacity: currentQ === questions.length - 1 ? 0.5 : 1 }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

const navBtn = {
  padding: '8px 16px',
  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

render(<OutputQuestions />);`,
            comparison: {
                junior: `// ❌ Guesses output randomly
console.log([] + {}); // ???
// "I think it's... an error?"`,
                senior: `// ✅ Understands the mechanics
console.log([] + {}); 
// [] → "" (empty string)
// {} → "[object Object]"
// "" + "[object Object]" = "[object Object]"

// Explains: ToPrimitive, valueOf, toString
// coercion rules for each type`
            },
            interview: {
                questions: [
                    { q: "What is the Temporal Dead Zone?", a: "The period between entering a scope and the let/const declaration being reached. Accessing the variable in this zone throws ReferenceError." },
                    { q: "Why does setTimeout with 0ms not run immediately?", a: "setTimeout schedules a macrotask. Even with 0ms, it waits for current call stack to clear AND all microtasks (Promises) to complete first." },
                    { q: "How does == type coercion work?", a: "Complex rules: null == undefined is true. For other types, converts to number. [] → 0, {} → NaN, '5' → 5, true → 1." },
                    { q: "Why is NaN !== NaN?", a: "By IEEE 754 spec, NaN represents 'not a valid number' - could be different invalid operations. Use Number.isNaN() or Object.is() to check." }
                ]
            }
        },
        {
            day: 29,
            title: '🔥 Currying & Composition',
            intro: "Functional programming fundamentals. Build curry, compose, pipe, and partial application from scratch.",
            content: `
<div class="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 p-4 rounded-xl mb-6">
<h4 class="text-teal-400 font-bold mb-2">🎯 Functional Programming Interview Questions</h4>
<p class="text-light-300">These concepts power Redux, React hooks, lodash/fp, and Ramda. Essential for senior roles!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📋 Concepts to Master</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">curry</code> - Transform f(a,b,c) to f(a)(b)(c)</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">compose</code> - Right-to-left function composition</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">pipe</code> - Left-to-right function composition</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">partial</code> - Fix some arguments upfront</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">memoize</code> - Cache function results</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚡ Why Currying?</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│                         CURRYING                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Regular:     add(1, 2, 3)      → 6                            │
│   Curried:     add(1)(2)(3)     → 6                            │
│                add(1, 2)(3)     → 6  (flexible!)               │
│                add(1)(2, 3)     → 6                            │
│                                                                 │
│   Why?                                                          │
│   • Create specialized functions: const add10 = add(10)         │
│   • Point-free style: users.map(add(1))                        │
│   • Composition: compose(add(1), multiply(2))                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>
            `,
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🧮 FUNCTIONAL PROGRAMMING UTILITIES                                 ║
║  curry, compose, pipe, partial, memoize                              ║
╠══════════════════════════════════════════════════════════════════════╣
║  Essential for FP interviews and real-world code!                    ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ CURRY - Transform multi-arg to single-arg chain
// ═══════════════════════════════════════════════════════════════════
function curry(fn) {
  return function curried(...args) {
    // If enough args, call the function
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // Otherwise, return function that collects more args
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ COMPOSE - Right-to-left function composition
// ═══════════════════════════════════════════════════════════════════
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ PIPE - Left-to-right function composition (more readable)
// ═══════════════════════════════════════════════════════════════════
function pipe(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

// ═══════════════════════════════════════════════════════════════════
// 4️⃣ PARTIAL - Fix some arguments
// ═══════════════════════════════════════════════════════════════════
function partial(fn, ...fixedArgs) {
  return function(...remainingArgs) {
    return fn.apply(this, [...fixedArgs, ...remainingArgs]);
  };
}

// ═══════════════════════════════════════════════════════════════════
// 5️⃣ MEMOIZE - Cache results
// ═══════════════════════════════════════════════════════════════════
function memoize(fn, keyResolver) {
  const cache = new Map();
  
  return function(...args) {
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// ═══════════════════════════════════════════════════════════════════
// 🧪 INTERACTIVE DEMO
// ═══════════════════════════════════════════════════════════════════
const FPDemo = () => {
  const [logs, setLogs] = React.useState([]);
  
  const log = (msg) => setLogs(prev => [...prev.slice(-8), msg]);
  
  const demoCurry = () => {
    setLogs([]);
    log('--- CURRY DEMO ---');
    
    const add = (a, b, c) => a + b + c;
    const curriedAdd = curry(add);
    
    log('add(1, 2, 3) = ' + add(1, 2, 3));
    log('curriedAdd(1)(2)(3) = ' + curriedAdd(1)(2)(3));
    log('curriedAdd(1, 2)(3) = ' + curriedAdd(1, 2)(3));
    log('curriedAdd(1)(2, 3) = ' + curriedAdd(1)(2, 3));
    
    // Practical use
    const add10 = curriedAdd(10);
    log('add10 = curriedAdd(10)');
    log('add10(5)(5) = ' + add10(5)(5));
  };
  
  const demoCompose = () => {
    setLogs([]);
    log('--- COMPOSE/PIPE DEMO ---');
    
    const double = x => x * 2;
    const addOne = x => x + 1;
    const square = x => x * x;
    
    // compose: right to left (square → addOne → double)
    const composed = compose(double, addOne, square);
    log('compose(double, addOne, square)(3)');
    log('= double(addOne(square(3)))');
    log('= double(addOne(9))');
    log('= double(10)');
    log('= ' + composed(3));
    
    // pipe: left to right (same result, different order)
    const piped = pipe(square, addOne, double);
    log('pipe(square, addOne, double)(3) = ' + piped(3));
  };
  
  const demoMemoize = () => {
    setLogs([]);
    log('--- MEMOIZE DEMO ---');
    
    let callCount = 0;
    const expensive = (n) => {
      callCount++;
      log('Computing fibonacci(' + n + ')...');
      const fib = (n) => n <= 1 ? n : fib(n - 1) + fib(n - 2);
      return fib(n);
    };
    
    const memoFib = memoize(expensive);
    
    log('First call: memoFib(10) = ' + memoFib(10));
    log('Second call: memoFib(10) = ' + memoFib(10) + ' (cached!)');
    log('Actual computations: ' + callCount);
  };
  
  return (
    <div style={{ padding: '20px', background: '#1a1a2e', borderRadius: '12px' }}>
      <h3 style={{ color: '#fff', marginBottom: '15px' }}>🧮 Functional Programming Demo</h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
        <button onClick={demoCurry} style={btnStyle}>Curry</button>
        <button onClick={demoCompose} style={{...btnStyle, background: 'linear-gradient(135deg, #8b5cf6, #a855f7)'}}>
          Compose/Pipe
        </button>
        <button onClick={demoMemoize} style={{...btnStyle, background: 'linear-gradient(135deg, #ec4899, #f43f5e)'}}>
          Memoize
        </button>
      </div>
      
      <div style={{ background: '#0f0f1a', padding: '15px', borderRadius: '8px', minHeight: '150px' }}>
        {logs.length === 0 ? (
          <p style={{ color: '#666' }}>Click a button to see demo...</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} style={{ 
              color: log.includes('---') ? '#f59e0b' : log.includes('=') ? '#22c55e' : '#60a5fa',
              fontFamily: 'monospace',
              fontSize: '12px',
              padding: '2px 0'
            }}>
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const btnStyle = {
  padding: '10px 20px',
  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

render(<FPDemo />);`,
            comparison: {
                junior: `// ❌ Imperative, hard to reuse
function processUser(user) {
  const upper = user.name.toUpperCase();
  const trimmed = upper.trim();
  const formatted = 'User: ' + trimmed;
  return formatted;
}`,
                senior: `// ✅ Composable, reusable
const toUpper = s => s.toUpperCase();
const trim = s => s.trim();
const prefix = p => s => p + s;

const processUser = pipe(
  u => u.name,
  toUpper,
  trim,
  prefix('User: ')
);

// Each function is testable, reusable`
            },
            interview: {
                questions: [
                    { q: "What's the difference between curry and partial?", a: "Curry transforms f(a,b,c) to f(a)(b)(c) - fully curried. Partial fixes some args: partial(f, 1) gives f(1, ?, ?). Curry is about arity transformation, partial is about pre-filling." },
                    { q: "Why compose right-to-left?", a: "Matches mathematical notation: f(g(x)) means apply g first, then f. compose(f, g)(x) = f(g(x)). pipe() is left-to-right for readability." },
                    { q: "How does memoize cache key work?", a: "By default, JSON.stringify(args) creates the key. Custom keyResolver for complex args (objects) or when you want to ignore some params." },
                    { q: "What is point-free style?", a: "Writing functions without mentioning arguments: const double = map(x => x * 2) vs const double = arr => arr.map(x => x * 2). Currying enables point-free." }
                ]
            }
        },
        {
            day: 30,
            title: '🔥 JavaScript Performance & Memory',
            intro: "Profile like a pro. Identify memory leaks, optimize render cycles, and write performant code.",
            content: `
<div class="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 p-4 rounded-xl mb-6">
<h4 class="text-emerald-400 font-bold mb-2">🎯 Senior-Level Skill</h4>
<p class="text-light-300">Performance optimization separates mid from senior devs. Know these tools and techniques!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔧 Chrome DevTools Essentials</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Performance Tab</code> - Record runtime, find bottlenecks</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Memory Tab</code> - Heap snapshots, allocation timeline</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Lighthouse</code> - Automated audits</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Coverage Tab</code> - Find unused code</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚠️ Common Performance Killers</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
    <h4 class="font-bold text-red-400 mb-2">Memory Leaks</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Dangling event listeners</li>
        <li>Forgotten timers/intervals</li>
        <li>Closure references</li>
        <li>Detached DOM nodes</li>
    </ul>
</div>
<div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
    <h4 class="font-bold text-red-400 mb-2">CPU Bottlenecks</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Excessive DOM manipulation</li>
        <li>Synchronous operations</li>
        <li>Unnecessary re-renders</li>
        <li>Large bundle size</li>
    </ul>
</div>
</div>
            `,
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  ⚡ JAVASCRIPT PERFORMANCE & MEMORY OPTIMIZATION                     ║
║  Tools, techniques, and best practices                               ║
╠══════════════════════════════════════════════════════════════════════╣
║  Become a performance expert!                                        ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ MEASURING PERFORMANCE
// ═══════════════════════════════════════════════════════════════════
function measurePerformance(fn, label = 'Operation') {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(\`\${label}: \${(end - start).toFixed(2)}ms\`);
  return result;
}

// Using Performance API
function detailedMeasure(fn, name) {
  performance.mark(\`\${name}-start\`);
  const result = fn();
  performance.mark(\`\${name}-end\`);
  performance.measure(name, \`\${name}-start\`, \`\${name}-end\`);
  
  const measure = performance.getEntriesByName(name)[0];
  console.log(\`\${name}: \${measure.duration.toFixed(2)}ms\`);
  return result;
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ MEMORY LEAK PATTERNS & FIXES
// ═══════════════════════════════════════════════════════════════════

// ❌ LEAK: Event listener not cleaned up
class LeakyComponent {
  constructor() {
    window.addEventListener('resize', this.handleResize);
  }
  handleResize = () => { /* uses 'this' */ };
  // Missing: removeEventListener on cleanup!
}

// ✅ FIX: Proper cleanup
class SafeComponent {
  constructor() {
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }
  handleResize() { /* ... */ }
  destroy() {
    window.removeEventListener('resize', this.handleResize);
  }
}

// ❌ LEAK: Forgotten timer
function startPolling() {
  setInterval(() => {
    fetch('/api/data'); // Runs forever!
  }, 1000);
}

// ✅ FIX: Store and clear interval
function startPolling() {
  const intervalId = setInterval(() => {
    fetch('/api/data');
  }, 1000);
  
  return () => clearInterval(intervalId);
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ DOM OPTIMIZATION TECHNIQUES
// ═══════════════════════════════════════════════════════════════════

// ❌ SLOW: Multiple DOM updates
function addItemsSlow(items) {
  items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    document.body.appendChild(div); // Triggers reflow each time!
  });
}

// ✅ FAST: Batch DOM updates
function addItemsFast(items) {
  const fragment = document.createDocumentFragment();
  items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    fragment.appendChild(div);
  });
  document.body.appendChild(fragment); // Single reflow!
}

// ═══════════════════════════════════════════════════════════════════
// 4️⃣ ARRAY OPTIMIZATION
// ═══════════════════════════════════════════════════════════════════

// ❌ SLOW: Multiple iterations
const result1 = data
  .filter(x => x.active)
  .map(x => x.value)
  .reduce((sum, x) => sum + x, 0);

// ✅ FAST: Single iteration
const result2 = data.reduce((sum, x) => {
  return x.active ? sum + x.value : sum;
}, 0);

// ═══════════════════════════════════════════════════════════════════
// 🧪 INTERACTIVE DEMO
// ═══════════════════════════════════════════════════════════════════
const PerformanceDemo = () => {
  const [results, setResults] = React.useState([]);
  
  const runBenchmark = () => {
    const logs = [];
    const iterations = 100000;
    
    // Test 1: Array creation
    let start = performance.now();
    const arr1 = [];
    for (let i = 0; i < iterations; i++) arr1.push(i);
    logs.push(\`push() × \${iterations}: \${(performance.now() - start).toFixed(2)}ms\`);
    
    start = performance.now();
    const arr2 = new Array(iterations);
    for (let i = 0; i < iterations; i++) arr2[i] = i;
    logs.push(\`Pre-sized array: \${(performance.now() - start).toFixed(2)}ms\`);
    
    // Test 2: Object access
    const obj = {};
    const map = new Map();
    for (let i = 0; i < 10000; i++) {
      obj['key' + i] = i;
      map.set('key' + i, i);
    }
    
    start = performance.now();
    for (let i = 0; i < 10000; i++) obj['key' + i];
    logs.push(\`Object lookup × 10k: \${(performance.now() - start).toFixed(2)}ms\`);
    
    start = performance.now();
    for (let i = 0; i < 10000; i++) map.get('key' + i);
    logs.push(\`Map lookup × 10k: \${(performance.now() - start).toFixed(2)}ms\`);
    
    // Test 3: String concatenation
    start = performance.now();
    let str1 = '';
    for (let i = 0; i < 10000; i++) str1 += 'a';
    logs.push(\`String += × 10k: \${(performance.now() - start).toFixed(2)}ms\`);
    
    start = performance.now();
    const parts = [];
    for (let i = 0; i < 10000; i++) parts.push('a');
    const str2 = parts.join('');
    logs.push(\`Array.join(): \${(performance.now() - start).toFixed(2)}ms\`);
    
    setResults(logs);
  };
  
  return (
    <div style={{ padding: '20px', background: '#1a1a2e', borderRadius: '12px' }}>
      <h3 style={{ color: '#fff', marginBottom: '15px' }}>⚡ Performance Benchmark</h3>
      
      <button 
        onClick={runBenchmark}
        style={{
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '15px'
        }}
      >
        ▶ Run Benchmark
      </button>
      
      <div style={{ background: '#0f0f1a', padding: '15px', borderRadius: '8px' }}>
        {results.length === 0 ? (
          <p style={{ color: '#666' }}>Click to run performance tests...</p>
        ) : (
          results.map((log, i) => (
            <div key={i} style={{ 
              color: '#22c55e',
              fontFamily: 'monospace',
              fontSize: '13px',
              padding: '4px 0',
              borderBottom: '1px solid #1e3a5f'
            }}>
              {log}
            </div>
          ))
        )}
      </div>
      
      <div style={{ marginTop: '15px', color: '#888', fontSize: '11px' }}>
        💡 Results may vary. Run multiple times for accuracy.
      </div>
    </div>
  );
};

render(<PerformanceDemo />);`,
            comparison: {
                junior: `// ❌ No performance awareness
data.filter(x => x.active)
    .map(x => transform(x))
    .filter(x => x.value > 0)
    .map(x => format(x));
// 4 iterations over data!`,
                senior: `// ✅ Single pass, early termination
data.reduce((acc, x) => {
  if (!x.active) return acc;
  const t = transform(x);
  if (t.value <= 0) return acc;
  acc.push(format(t));
  return acc;
}, []);
// 1 iteration, skips unnecessary work`
            },
            interview: {
                questions: [
                    { q: "How do you identify memory leaks?", a: "Chrome DevTools Memory tab: Take heap snapshot before/after action, compare retained objects. Look for growing detached DOM trees, increasing object counts." },
                    { q: "What causes layout thrashing?", a: "Reading layout property (offsetHeight) then writing (style.height) in a loop. Browser must recalculate layout each iteration. Batch reads, then batch writes." },
                    { q: "When to use Web Workers?", a: "CPU-intensive tasks that would block main thread: image processing, data parsing, complex calculations. Keep UI responsive by offloading work." },
                    { q: "How to optimize large lists?", a: "Virtualization/windowing - only render visible items. Libraries: react-window, react-virtuoso. Also pagination and infinite scroll." }
                ]
            }
        },
        {
            day: 31,
            title: '🔥 TypeScript Essentials for JS Devs',
            intro: "TypeScript is now essential. Learn the core concepts every JS developer needs in 2025.",
            content: `
<div class="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 p-4 rounded-xl mb-6">
<h4 class="text-blue-400 font-bold mb-2">🎯 Required Skill in 2025</h4>
<p class="text-light-300">90%+ of new projects use TypeScript. You need this for any senior role!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📋 Core Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">interface vs type</code> - When to use each</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Generics</code> - Reusable type-safe code</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Union & Intersection</code> - Combine types</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Type Guards</code> - Runtime type checking</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Utility Types</code> - Partial, Required, Pick, Omit</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚡ Quick Decision Guide</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-blue-400 mb-2">Use interface</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Object shapes (most common)</li>
        <li>Class implementations</li>
        <li>Declaration merging needed</li>
    </ul>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-purple-400 mb-2">Use type</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Unions and intersections</li>
        <li>Mapped types</li>
        <li>Tuple types</li>
    </ul>
</div>
</div>
            `,
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  📘 TYPESCRIPT ESSENTIALS                                            ║
║  Everything a JS developer needs to know                             ║
╠══════════════════════════════════════════════════════════════════════╣
║  Note: This is educational code showing TS concepts in JS comments   ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ BASIC TYPES
// ═══════════════════════════════════════════════════════════════════
/*
// Primitives
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["a", "b"];

// Objects
interface User {
  id: number;
  name: string;
  email?: string; // Optional
  readonly createdAt: Date; // Can't modify
}

// Functions
function greet(name: string): string {
  return "Hello " + name;
}

const add = (a: number, b: number): number => a + b;
*/

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ GENERICS - Reusable type-safe code
// ═══════════════════════════════════════════════════════════════════
/*
// Generic function
function identity<T>(arg: T): T {
  return arg;
}
identity<string>("hello"); // Type is string
identity(42); // Type inferred as number

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "John" },
  status: 200
};

// Generic constraints
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
getLength("hello"); // Works
getLength([1, 2, 3]); // Works
// getLength(123); // Error: number has no length
*/

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ UNION & INTERSECTION TYPES
// ═══════════════════════════════════════════════════════════════════
/*
// Union: A OR B
type Status = "pending" | "success" | "error";
type ID = string | number;

function print(id: ID) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // TypeScript knows it's string
  } else {
    console.log(id.toFixed(2)); // TypeScript knows it's number
  }
}

// Intersection: A AND B
interface Printable { print(): void; }
interface Loggable { log(): void; }

type PrintableLoggable = Printable & Loggable;

const obj: PrintableLoggable = {
  print() { console.log("printing"); },
  log() { console.log("logging"); }
};
*/

// ═══════════════════════════════════════════════════════════════════
// 4️⃣ TYPE GUARDS
// ═══════════════════════════════════════════════════════════════════
/*
interface Cat { meow(): void; }
interface Dog { bark(): void; }

// Type guard function
function isCat(animal: Cat | Dog): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow(); // TypeScript knows it's Cat
  } else {
    animal.bark(); // TypeScript knows it's Dog
  }
}

// in operator guard
function move(animal: { fly?: () => void; swim?: () => void }) {
  if ("fly" in animal) {
    animal.fly();
  } else if ("swim" in animal) {
    animal.swim();
  }
}
*/

// ═══════════════════════════════════════════════════════════════════
// 5️⃣ UTILITY TYPES
// ═══════════════════════════════════════════════════════════════════
/*
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - All properties optional
type PartialUser = Partial<User>;
const update: PartialUser = { name: "New Name" };

// Required - All properties required
type RequiredUser = Required<User>;

// Pick - Select specific properties
type UserPreview = Pick<User, "id" | "name">;

// Omit - Exclude properties
type UserWithoutEmail = Omit<User, "email">;

// Record - Object with specific key/value types
type UserMap = Record<string, User>;

// ReturnType - Get function's return type
function getUser() { return { id: 1, name: "John" }; }
type UserReturn = ReturnType<typeof getUser>;
*/

// ═══════════════════════════════════════════════════════════════════
// 🧪 INTERACTIVE QUIZ
// ═══════════════════════════════════════════════════════════════════
const TypeScriptQuiz = () => {
  const [currentQ, setCurrentQ] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);
  
  const questions = [
    {
      q: "What's the difference between interface and type?",
      a: "interface is extendable (declaration merging), better for objects. type is for unions, intersections, and computed types. In practice, both work for objects."
    },
    {
      q: "What is a Generic in TypeScript?",
      a: "A way to create reusable code that works with multiple types while maintaining type safety. Like function parameters, but for types. Example: Array<T> works with any type T."
    },
    {
      q: "What does 'as const' do?",
      a: "Makes the value readonly and narrows the type to literal. {x: 1} as const becomes {readonly x: 1} instead of {x: number}."
    },
    {
      q: "What is a Type Guard?",
      a: "A runtime check that narrows a type. Can be typeof, instanceof, 'in' operator, or custom function with 'is' keyword. Helps TypeScript know specific type in branches."
    },
    {
      q: "Explain Partial<T> utility type",
      a: "Makes all properties of T optional. Useful for update functions where you only provide fields to change. Partial<User> = { id?: number; name?: string; ... }"
    }
  ];
  
  const q = questions[currentQ];
  
  return (
    <div style={{ padding: '20px', background: '#1a1a2e', borderRadius: '12px' }}>
      <h3 style={{ color: '#fff', marginBottom: '15px' }}>📘 TypeScript Quiz</h3>
      
      <div style={{ background: '#0f0f1a', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
        <p style={{ color: '#60a5fa', fontSize: '14px' }}>{q.q}</p>
      </div>
      
      <button 
        onClick={() => setShowAnswer(!showAnswer)}
        style={{
          padding: '8px 16px',
          background: showAnswer ? '#666' : 'linear-gradient(135deg, #3b82f6, #6366f1)',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '15px'
        }}
      >
        {showAnswer ? 'Hide' : 'Show Answer'}
      </button>
      
      {showAnswer && (
        <div style={{ background: '#1e3a5f', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
          <p style={{ color: '#22c55e', fontSize: '13px' }}>{q.a}</p>
        </div>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
        <button 
          onClick={() => { setCurrentQ(Math.max(0, currentQ - 1)); setShowAnswer(false); }}
          disabled={currentQ === 0}
          style={{ opacity: currentQ === 0 ? 0.5 : 1, padding: '8px 16px', background: '#374151', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          ← Prev
        </button>
        <span style={{ color: '#888' }}>{currentQ + 1}/{questions.length}</span>
        <button 
          onClick={() => { setCurrentQ(Math.min(questions.length - 1, currentQ + 1)); setShowAnswer(false); }}
          disabled={currentQ === questions.length - 1}
          style={{ opacity: currentQ === questions.length - 1 ? 0.5 : 1, padding: '8px 16px', background: '#374151', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

render(<TypeScriptQuiz />);`,
            comparison: {
                junior: `// ❌ No types, runtime errors
function getUser(id) {
  return fetch('/api/users/' + id)
    .then(r => r.json());
}

const user = await getUser("abc");
console.log(user.nmae); // Typo! No error until runtime`,
                senior: `// ✅ Full type safety
interface User {
  id: number;
  name: string;
}

async function getUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}

const user = await getUser(1);
console.log(user.nmae); // ❌ Error caught at compile time!`
            },
            interview: {
                questions: [
                    { q: "When would you use 'unknown' vs 'any'?", a: "unknown is type-safe any. You must narrow it before use. any disables type checking entirely. Prefer unknown for values from external sources." },
                    { q: "What is declaration merging?", a: "When two interfaces with same name combine their properties. Useful for extending library types. Only works with interface, not type." },
                    { q: "Explain the 'infer' keyword", a: "Used in conditional types to extract a type. Example: type ReturnType<T> = T extends (...args: any) => infer R ? R : never. Infers the return type R." },
                    { q: "What are Mapped Types?", a: "Create new types by transforming properties of existing type. Example: type Readonly<T> = { readonly [K in keyof T]: T[K] }. Loops over keys." }
                ]
            }
        },
        {
            day: 32,
            title: '🔥 System Design for Frontend',
            intro: "The final boss. Design scalable frontend architectures like a senior engineer.",
            content: `
<div class="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 p-4 rounded-xl mb-6">
<h4 class="text-violet-400 font-bold mb-2">🎯 Staff/Principal Level</h4>
<p class="text-light-300">Frontend system design is now asked at senior+ levels. Master these concepts to land top roles!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📋 Common Interview Topics</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Twitter Feed</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Google Docs</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Autocomplete</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Image Gallery</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Chat Application</code></li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">🏗️ The Framework (RADIO)</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│                     RADIO FRAMEWORK                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  R - Requirements    What exactly are we building?              │
│  A - Architecture    Component hierarchy, data flow             │
│  D - Data Model      State shape, API contracts                 │
│  I - Interface       API design, component props                │
│  O - Optimizations   Performance, caching, edge cases           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ Key Considerations</h3>
<div class="grid md:grid-cols-3 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-blue-400 mb-2">State Management</h4>
    <p class="text-sm text-light-300">Local vs global, server state, cache invalidation</p>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-green-400 mb-2">Performance</h4>
    <p class="text-sm text-light-300">Virtualization, lazy loading, code splitting</p>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-purple-400 mb-2">Real-time</h4>
    <p class="text-sm text-light-300">WebSocket vs polling, optimistic updates</p>
</div>
</div>
            `,
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🏗️ FRONTEND SYSTEM DESIGN                                          ║
║  Example: Design a Twitter-like Feed                                 ║
╠══════════════════════════════════════════════════════════════════════╣
║  This shows the thinking process for system design interviews        ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 📋 REQUIREMENTS (Always clarify first!)
// ═══════════════════════════════════════════════════════════════════
/*
Functional:
- Display feed of tweets (text, images)
- Infinite scroll
- Like/retweet/reply
- Real-time updates for new tweets
- Compose new tweet

Non-functional:
- Handle 100k+ tweets (virtualization needed)
- Works offline (service worker)
- Mobile responsive
- Accessible
*/

// ═══════════════════════════════════════════════════════════════════
// 🏗️ ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════
/*
┌─────────────────────────────────────────────────────────┐
│                         App                             │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   Header    │  │  Compose    │  │  Sidebar    │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │                  FeedContainer                   │    │
│  │  ┌────────────────────────────────────────────┐ │    │
│  │  │            VirtualizedList                 │ │    │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐    │ │    │
│  │  │  │ TweetCard│ │ TweetCard│ │ TweetCard│    │ │    │
│  │  │  └──────────┘ └──────────┘ └──────────┘    │ │    │
│  │  └────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
*/

// ═══════════════════════════════════════════════════════════════════
// 📊 DATA MODEL
// ═══════════════════════════════════════════════════════════════════
/*
// State shape
{
  tweets: {
    byId: { [id]: Tweet },
    allIds: string[],
    loading: boolean,
    error: string | null,
    hasMore: boolean,
    cursor: string | null
  },
  user: {
    current: User | null,
    loading: boolean
  },
  ui: {
    composerOpen: boolean,
    theme: 'light' | 'dark'
  }
}

// API Contract
GET /api/feed?cursor=xxx&limit=20
POST /api/tweets { content, media }
POST /api/tweets/:id/like
WS /realtime { type: 'NEW_TWEET' | 'LIKE' | 'RETWEET' }
*/

// ═══════════════════════════════════════════════════════════════════
// 🔧 KEY COMPONENT IMPLEMENTATIONS
// ═══════════════════════════════════════════════════════════════════

// Virtualized Feed for performance
const VirtualizedFeed = ({ tweets }) => {
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 20 });
  const containerRef = React.useRef(null);
  const ITEM_HEIGHT = 150;
  
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const start = Math.floor(scrollTop / ITEM_HEIGHT);
      const visible = Math.ceil(container.clientHeight / ITEM_HEIGHT);
      setVisibleRange({
        start: Math.max(0, start - 5), // Overscan
        end: Math.min(tweets.length, start + visible + 5)
      });
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [tweets.length]);
  
  const totalHeight = tweets.length * ITEM_HEIGHT;
  const offsetY = visibleRange.start * ITEM_HEIGHT;
  
  return (
    <div ref={containerRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {tweets.slice(visibleRange.start, visibleRange.end).map((tweet, i) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Optimistic Like with Rollback
const useLikeTweet = () => {
  const [optimisticLikes, setOptimisticLikes] = React.useState({});
  
  const likeTweet = async (tweetId, currentlyLiked) => {
    // Optimistic update
    setOptimisticLikes(prev => ({
      ...prev,
      [tweetId]: !currentlyLiked
    }));
    
    try {
      await fetch(\`/api/tweets/\${tweetId}/like\`, { method: 'POST' });
    } catch (error) {
      // Rollback on failure
      setOptimisticLikes(prev => ({
        ...prev,
        [tweetId]: currentlyLiked
      }));
    }
  };
  
  return { optimisticLikes, likeTweet };
};

// Real-time updates
const useRealtimeFeed = () => {
  const [newTweets, setNewTweets] = React.useState([]);
  
  React.useEffect(() => {
    const ws = new WebSocket('wss://api.example.com/realtime');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'NEW_TWEET') {
        setNewTweets(prev => [data.tweet, ...prev]);
      }
    };
    
    return () => ws.close();
  }, []);
  
  const showNewTweets = () => {
    // Merge new tweets into feed
    setNewTweets([]);
  };
  
  return { newTweets, showNewTweets };
};

// ═══════════════════════════════════════════════════════════════════
// 🧪 INTERACTIVE DEMO
// ═══════════════════════════════════════════════════════════════════
const TweetCard = ({ tweet }) => (
  <div style={{
    padding: '15px',
    borderBottom: '1px solid #333',
    background: '#1a1a2e'
  }}>
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
      }} />
      <div style={{ flex: 1 }}>
        <div style={{ color: '#fff', fontWeight: 'bold' }}>{tweet.author}</div>
        <div style={{ color: '#888', fontSize: '12px' }}>{tweet.time}</div>
        <div style={{ color: '#ccc', marginTop: '8px' }}>{tweet.content}</div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
          <span style={{ color: '#888', fontSize: '12px' }}>❤️ {tweet.likes}</span>
          <span style={{ color: '#888', fontSize: '12px' }}>🔁 {tweet.retweets}</span>
          <span style={{ color: '#888', fontSize: '12px' }}>💬 {tweet.replies}</span>
        </div>
      </div>
    </div>
  </div>
);

const SystemDesignDemo = () => {
  const mockTweets = [
    { id: 1, author: 'Dan Abramov', time: '2h', content: 'Just shipped a new feature! 🚀', likes: 234, retweets: 45, replies: 12 },
    { id: 2, author: 'Kent C. Dodds', time: '4h', content: 'Testing is not optional. Write tests first!', likes: 567, retweets: 89, replies: 34 },
    { id: 3, author: 'Sarah Drasner', time: '6h', content: 'CSS is awesome when you understand it 💅', likes: 890, retweets: 123, replies: 56 },
  ];
  
  return (
    <div style={{ padding: '20px', background: '#0f0f1a', borderRadius: '12px' }}>
      <h3 style={{ color: '#fff', marginBottom: '15px' }}>🐦 Twitter Feed Design</h3>
      
      <div style={{ background: '#1a1a2e', borderRadius: '8px', overflow: 'hidden' }}>
        {mockTweets.map(tweet => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
      
      <div style={{ marginTop: '15px', padding: '10px', background: '#1e3a5f', borderRadius: '8px' }}>
        <p style={{ color: '#93c5fd', fontSize: '12px' }}>
          💡 Key considerations: Virtualization for 100k+ tweets, WebSocket for real-time, 
          optimistic updates for likes, infinite scroll with cursor pagination.
        </p>
      </div>
    </div>
  );
};

render(<SystemDesignDemo />);`,
            comparison: {
                junior: `// ❌ No architecture thinking
function Feed() {
  const [tweets, setTweets] = useState([]);
  
  useEffect(() => {
    fetch('/api/tweets').then(r => r.json())
      .then(setTweets);
  }, []);
  
  return tweets.map(t => <div>{t.text}</div>);
}
// No pagination, no optimization, no real-time`,
                senior: `// ✅ Architectural thinking
/*
1. Requirements: Scale, real-time, offline?
2. Architecture: Container/Presentational split
3. Data: Normalized state, cursor pagination
4. Interface: Props, API contracts
5. Optimizations: Virtualization, code-split
*/

// Uses: React Query (caching), WebSocket 
// (real-time), react-window (virtualization),
// service worker (offline), optimistic updates`
            },
            interview: {
                questions: [
                    { q: "How would you handle real-time updates for 1M users?", a: "WebSocket with room-based subscriptions. Only subscribe to visible/relevant data. Use a message queue (Redis) to fan out. Consider Server-Sent Events for simpler one-way updates." },
                    { q: "How do you design for offline-first?", a: "Service Worker to cache app shell and API responses. IndexedDB for local data storage. Background Sync API to queue writes. Show stale data with freshness indicator." },
                    { q: "How would you implement infinite scroll efficiently?", a: "Cursor-based pagination (not offset). Virtualization to render only visible items. Intersection Observer for scroll detection. Debounce scroll events." },
                    { q: "How do you handle optimistic updates with rollback?", a: "Update UI immediately with temporary ID. Track pending operations. On success, replace temp ID with real. On failure, remove from state and show error. Consider using React Query's optimistic update helpers." }
                ]
            }
        }
    ]
}
}
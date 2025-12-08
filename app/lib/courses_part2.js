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

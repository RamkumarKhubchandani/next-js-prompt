export const day03 = {
  day: 3,
  title: "Day 3: Closures (Memory, Power, and Footguns)",
  intro: "Closures are how JavaScript gives functions memory. Today you’ll learn to *see* the hidden environment, use it for clean APIs, and avoid accidental memory leaks.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The Human-Tutor Explanation (What a Closure Really Is)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
A closure is not “a function inside a function”. That’s the shape of the code, not the concept.
A closure is: <span class="text-yellow-600 dark:text-yellow-400 font-bold">a function + the lexical environment it was created in</span>.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Closure “Backpack” (Environment)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
When you create an inner function, JS stores a hidden link to the variables it needs.
This is why the inner function can still access variables after the outer function returned.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-yellow-700 dark:text-yellow-300 mb-6 overflow-x-auto shadow-inner">
<pre>
function outer() {
  let data = "Secret";
  return function inner() {
    console.log(data);
  };
}

const fn = outer();
// fn still "remembers" data
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Closures Hold References (Not Copies)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Closures capture a <span class="text-yellow-600 dark:text-yellow-400 font-bold">reference</span> to the variable, so if the variable changes, the closure sees the new value.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto mb-8">
<pre><code>
function make() {
  let x = 0;
  return () => ++x;
}
const inc = make();
console.log(inc()); // 1
console.log(inc()); // 2
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Closures = The Best Privacy Primitive in JS</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
If you want private state without classes, closures are the cleanest approach.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto mb-8">
<pre><code>
function createCounter() {
  let count = 0; // private
  return {
    inc() { return ++count; },
    get() { return count; }
  };
}
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) Memoization (Cache) — Closures Doing Real Work</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Memoization means caching results so repeated calls are fast. The cache lives in a closure.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">5) The Footgun: Memory Leaks</h3>
<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Warning:</span> If a closure keeps a reference to something huge (large arrays, big objects),
    it stays in memory as long as the closure is reachable.
  </p>
</div>

<details class="mb-6 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-gray-800 dark:text-light-100">Real-world example: event handler leak</summary>
  <div class="mt-3 text-gray-600 dark:text-light-300 space-y-3">
    <p>
      If you add an event listener that closes over a huge object and never remove it, the huge object can’t be garbage collected.
      (In the browser, this is a common leak pattern.)
    </p>
  </div>
</details>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">6) The React Connection (Why Hooks Work)</h3>
<p class="text-gray-600 dark:text-light-300">
Hooks rely on closures and stable call order. Your component function re-runs, but React holds state outside and gives you access through closures and bookkeeping.
</p>
            `,
  predictions: [
    {
      prompt: "Predict: What does this print? `const inc = make(); inc(); inc();`",
      options: [
        "1 then 1",
        "1 then 2",
        "0 then 1",
        "2 then 3"
      ],
      correctIndex: 1,
      explanation: "The closure holds a reference to `x` inside `make()`. Each call increments the same `x`."
    },
    {
      prompt: "Predict: In a memoize function, where does the cache live?",
      options: [
        "On the global object",
        "Inside the returned function’s closure",
        "On the function prototype",
        "In V8 bytecode"
      ],
      correctIndex: 1,
      explanation: "The cache is a variable in the outer function, referenced by the inner returned function."
    },
    {
      prompt: "A closure can keep memory alive because it stores…",
      options: [
        "a copy of values",
        "a reference to variables/objects",
        "only primitive values",
        "only function code"
      ],
      correctIndex: 1,
      explanation: "Closures keep references. If the referenced object is large, it stays alive while the closure is reachable."
    }
  ],
  checkpoints: [
    {
      prompt: "Which is the best definition of a closure?",
      options: [
        "A function inside another function",
        "A function plus the lexical environment it was created in",
        "A function that returns a function",
        "A JavaScript class feature"
      ],
      correctIndex: 1,
      explanation: "Closures are about captured lexical environment, not just nested syntax."
    },
    {
      prompt: "Why does a closure sometimes create a memory leak?",
      options: [
        "Closures are always leaks",
        "Because the engine can’t optimize closures",
        "Because the closure keeps references alive longer than intended",
        "Because closures disable garbage collection"
      ],
      correctIndex: 2,
      explanation: "GC still works, but it can’t collect referenced data while the closure remains reachable."
    }
  ],
  labSteps: [
    {
      id: "d3-step-1",
      title: "The classic closure bug (loop + setTimeout)",
      subtitle: "Why you see 5,5,5…",
      teacherNote: "Predict first: do you see 0..4 or 5..5? Then explain what the closure captured.",
      bugCode: `console.clear();

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("i =", i);
  }, 10);
}`,
      bugFocus: {
        fromLine: 3,
        toLine: 7
      },
      fixCode: `console.clear();

// FIX: let creates a new binding per iteration
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log("i =", i);
  }, 10);
}`,
      fixFocus: {
        fromLine: 4,
        toLine: 8
      },
      whatToNotice: [
        "The callback runs after the loop completes.",
        "With var there’s one shared binding; with let there are per-iteration bindings."
      ]
    },
    {
      id: "d3-step-2",
      title: "Memoization (cache) in a closure",
      subtitle: "Speed up repeated work",
      teacherNote: "Watch when it prints 'Calculating…' and when it doesn’t. That’s the cache doing its job.",
      bugCode: `console.clear();

// BUG: no cache, repeats work
function heavy(x) {
  console.log("Calculating...");
  return x * 2;
}

console.log(heavy(10));
console.log(heavy(10));`,
      bugFocus: {
        fromLine: 3,
        toLine: 7
      },
      fixCode: `console.clear();

function memoize(fn) {
  const cache = new Map();
  return function (arg) {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

function heavy(x) {
  console.log("Calculating...");
  return x * 2;
}

const memoHeavy = memoize(heavy);
console.log(memoHeavy(10));
console.log(memoHeavy(10)); // instant`,
      fixFocus: {
        fromLine: 3,
        toLine: 23
      },
      whatToNotice: [
        "The Map lives in the closure, private to memoHeavy.",
        "Repeated calls reuse cached results."
      ]
    }
  ],
  code: `// Day 3 Live Lab: Closures (Predict first!)
console.clear();

function createCounter() {
  let count = 0;
  return {
    inc() { return ++count; },
    get() { return count; }
  };
}

const c = createCounter();
console.log(c.inc()); // 1
console.log(c.inc()); // 2
console.log(c.get()); // 2

function memoize(fn) {
  const cache = new Map();
  return (arg) => {
    if (cache.has(arg)) return cache.get(arg);
    console.log("Calculating...");
    const res = fn(arg);
    cache.set(arg, res);
    return res;
  };
}
const heavy = (x) => x * 2;
const memoHeavy = memoize(heavy);
console.log(memoHeavy(10));
console.log(memoHeavy(10));`,
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
      {
        q: "Can a closure modify the outer variable?",
        a: "Yes. Closures hold a *reference* to the variable, not a copy. So if the outer variable changes, the closure sees the change."
      },
      {
        q: "How to implement a Singleton using Closures?",
        a: "Use an IIFE that returns an object, ensuring the initialization code runs only once."
      },
      {
        q: "What is the difference between Closure and Class?",
        a: "Classes store state in `this` (objects). Closures store state in the Lexical Scope (functions). Classes are more memory efficient for many instances (shared prototype), Closures give better privacy."
      }
    ]
  },
  recap: {
    takeaways: [
      "A closure is a function + its captured lexical environment.",
      "Closures capture references, not copies (state can evolve).",
      "Closures enable privacy (private variables) and memoization (caches).",
      "Leaks happen when closures keep large references alive longer than intended."
    ],
    commonMistakes: [
      "Thinking closures only happen when returning a function (they happen whenever inner functions use outer vars).",
      "Using var in loops with async callbacks (classic closure bug).",
      "Accidentally closing over huge objects and never releasing listeners/intervals.",
      "Confusing class state with closure state (different memory tradeoffs)."
    ],
    nextActions: [
      "Run the closure loop bug and fix it 2 ways (let, or IIFE).",
      "Build a memoize(fn) and test that it avoids repeated “Calculating…” logs."
    ]
  }
};

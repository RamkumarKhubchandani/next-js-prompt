export const day29 = {
  day: 29,
  title: "🔥 Currying & Composition",
  intro: "Functional programming fundamentals. Build curry, compose, pipe, and partial application from scratch.",
  content: `
<div class="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 p-4 rounded-xl mb-6">
<h4 class="text-teal-400 font-bold mb-2">🎯 Functional Programming Interview Questions</h4>
<p class="text-gray-600 dark:text-light-300">These concepts power Redux, React hooks, lodash/fp, and Ramda. Essential for senior roles!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Concepts to Master</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">curry</code> - Transform f(a,b,c) to f(a)(b)(c)</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">compose</code> - Right-to-left function composition</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">pipe</code> - Left-to-right function composition</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">partial</code> - Fix some arguments upfront</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">memoize</code> - Cache function results</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Why Currying?</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-700 dark:text-cyan-300">
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
  masteryChecklist: [
    {
      id: "d29-c1",
      text: "I can implement curry that supports partial application with any grouping (f(1)(2,3), f(1,2)(3), etc.)."
    },
    {
      id: "d29-c2",
      text: "I can explain compose vs pipe and when each is clearer."
    },
    {
      id: "d29-c3",
      text: "I can use currying to create specialized functions (prefix('User: '), add(10), etc.)."
    },
    {
      id: "d29-c4",
      text: "I can explain partial application vs currying in one sentence."
    },
    {
      id: "d29-c5",
      text: "I can build memoize with an explicit keyResolver and describe tradeoffs."
    }
  ],
  predictions: [
    {
      prompt: "If `const add3 = curry(add)(1);` where add(a,b,c)=a+b+c, what is add3(2)(3)?",
      options: [
        "6",
        "5",
        "TypeError",
        "undefined"
      ],
      correctIndex: 0,
      explanation: "Currying collects arguments until arity is satisfied."
    },
    {
      prompt: "If `pipe(square, inc, double)(3)` with square(x)=x*x, inc(x)=x+1, double(x)=x*2, what is the result?",
      options: [
        "20",
        "18",
        "16",
        "14"
      ],
      correctIndex: 0,
      explanation: "square(3)=9, inc=10, double=20."
    },
    {
      prompt: "What is the key difference between curry and partial?",
      options: [
        "They are identical",
        "Curry changes function arity/shape; partial pre-fills some args without changing the overall calling shape requirement",
        "Partial works only for 2 args",
        "Curry works only for arrow functions"
      ],
      correctIndex: 1,
      explanation: "Currying transforms how you call it; partial only pre-fills."
    }
  ],
  checkpoints: [
    {
      prompt: "compose(f, g)(x) equals…",
      options: [
        "f(g(x))",
        "g(f(x))",
        "f(x) + g(x)",
        "It depends on runtime"
      ],
      correctIndex: 0,
      explanation: "Compose is right-to-left: first g, then f."
    },
    {
      prompt: "Why is pipe often preferred in UI code?",
      options: [
        "It is faster",
        "It reads left-to-right like data flows",
        "It supports async automatically",
        "It avoids closures"
      ],
      correctIndex: 1,
      explanation: "pipe matches how you narrate transformations."
    },
    {
      prompt: "A common pitfall of memoize using JSON.stringify(args) is…",
      options: [
        "It breaks for numbers",
        "It can be slow and unstable for objects (order/cycles) and cannot key by functions",
        "It always leaks memory",
        "It cannot cache more than 10 items"
      ],
      correctIndex: 1,
      explanation: "Use a keyResolver or structured keying when args are non-primitive."
    }
  ],
  labSteps: [
    {
      id: "d29-step-1",
      title: "Curry bug: loses this and can't group args flexibly",
      subtitle: "Fix curry to preserve this and accept any grouping",
      teacherNote: "A good curry collects args until enough, then calls the original function with the same this.",
      bugCode: `console.clear();

function curryBug(fn) {
  return function curried(a) {
    if (arguments.length >= fn.length) return fn(a);
    return function (b) {
      return fn(a, b); // ❌ only supports 2 args and drops extra args and this
    };
  };
}

function add(a, b, c) { return a + b + c; }
var curriedAdd = curryBug(add);
console.log("Expect 6:", curriedAdd(1)(2)(3));`,
      bugFocus: {
        fromLine: 2,
        toLine: 14
      },
      fixCode: `console.clear();

function curry(fn) {
  return function curried() {
    var args = Array.prototype.slice.call(arguments);
    if (args.length >= fn.length) return fn.apply(this, args);
    return function () {
      var more = Array.prototype.slice.call(arguments);
      return curried.apply(this, args.concat(more));
    };
  };
}

function add(a, b, c) { return a + b + c; }
var curriedAdd = curry(add);
console.log("1)(2)(3) =", curriedAdd(1)(2)(3));
console.log("1,2)(3) =", curriedAdd(1, 2)(3));
console.log("1)(2,3) =", curriedAdd(1)(2, 3));`,
      fixFocus: {
        fromLine: 2,
        toLine: 16
      },
      whatToNotice: [
        "Use apply to preserve this.",
        "Collect args in an array; allow more than one arg per call."
      ]
    },
    {
      id: "d29-step-2",
      title: "Memoize pitfall: unstable keys for objects",
      subtitle: "Add keyResolver so callers decide the cache key",
      teacherNote: "Memoization is an optimization—make it explicit and predictable.",
      bugCode: `console.clear();

function memoizeBug(fn) {
  var cache = new Map();
  return function () {
    var key = JSON.stringify(arguments); // ❌ arguments is not a real array; also keying objects is fragile
    if (cache.has(key)) return cache.get(key);
    var out = fn.apply(this, arguments);
    cache.set(key, out);
    return out;
  };
}

function computeUserScore(user) { return user.points * 2; }
var memoScore = memoizeBug(computeUserScore);
console.log(memoScore({ points: 10 }));
console.log(memoScore({ points: 10 }));`,
      bugFocus: {
        fromLine: 2,
        toLine: 17
      },
      fixCode: `console.clear();

function memoize(fn, keyResolver) {
  var cache = new Map();
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var key = keyResolver ? keyResolver.apply(this, args) : JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    var out = fn.apply(this, args);
    cache.set(key, out);
    return out;
  };
}

function computeUserScore(user) { return user.points * 2; }
var memoScore = memoize(computeUserScore, function (user) { return "points:" + user.points; });
console.log(memoScore({ points: 10 }));
console.log(memoScore({ points: 10 })); // cached by points`,
      fixFocus: {
        fromLine: 2,
        toLine: 16
      },
      whatToNotice: [
        "A keyResolver makes caching predictable for non-primitive args.",
        "Default JSON.stringify(args) is okay for simple primitive-only args."
      ]
    }
  ],
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
// 🧪 CONSOLE DEMO (no React)
// ═══════════════════════════════════════════════════════════════════
function runFPDemo() {
  console.clear();
  console.log("=== Day 29: Currying & Composition (demo) ===");

  // Curry
  console.log("--- CURRY ---");
  var add = function (a, b, c) { return a + b + c; };
  var curriedAdd = curry(add);
  console.log("add(1,2,3) =", add(1, 2, 3));
  console.log("curriedAdd(1)(2)(3) =", curriedAdd(1)(2)(3));
  console.log("curriedAdd(1,2)(3) =", curriedAdd(1, 2)(3));
  console.log("curriedAdd(1)(2,3) =", curriedAdd(1)(2, 3));

  // Compose vs Pipe
  console.log("--- COMPOSE / PIPE ---");
  var square = function (x) { return x * x; };
  var inc = function (x) { return x + 1; };
  var double = function (x) { return x * 2; };
  var c = compose(double, inc, square); // double(inc(square(x)))
  var p = pipe(square, inc, double);   // double(inc(square(x)))
  console.log("compose(double, inc, square)(3) =", c(3));
  console.log("pipe(square, inc, double)(3)    =", p(3));

  // Partial
  console.log("--- PARTIAL ---");
  var greet = function (prefix, name) { return prefix + name; };
  var sayHiTo = partial(greet, "Hi ");
  console.log("sayHiTo('Asha') =", sayHiTo("Asha"));

  // Memoize
  console.log("--- MEMOIZE ---");
  var calls = 0;
  var slow = function (n) { calls++; for (var i = 0; i < 200000; i++) {} return n * 2; };
  var fast = memoize(slow, function (n) { return "n:" + n; });
  console.log("fast(10) =", fast(10), "| calls:", calls);
  console.log("fast(10) =", fast(10), "| calls:", calls, "(cached)");
}

runFPDemo();`,
  recap: {
    takeaways: [
      "Currying changes a function's calling shape so you can supply arguments over time.",
      "compose is right-to-left; pipe is left-to-right (often easier to read).",
      "memoize needs a stable key strategy; keyResolver keeps caching predictable."
    ],
    commonMistakes: [
      "Confusing partial application with currying.",
      "Writing curry that only supports one argument per call.",
      "Using JSON.stringify on complex objects without thinking about stability/cycles."
    ],
    nextActions: [
      "Write a curried prefix function: prefix('User: ')('Asha') -> 'User: Asha'.",
      "Convert one imperative transform into pipe() with 3–4 small functions.",
      "Memoize an expensive function and add a keyResolver."
    ]
  },
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
      {
        q: "What's the difference between curry and partial?",
        a: "Curry transforms f(a,b,c) to f(a)(b)(c) - fully curried. Partial fixes some args: partial(f, 1) gives f(1, ?, ?). Curry is about arity transformation, partial is about pre-filling."
      },
      {
        q: "Why compose right-to-left?",
        a: "Matches mathematical notation: f(g(x)) means apply g first, then f. compose(f, g)(x) = f(g(x)). pipe() is left-to-right for readability."
      },
      {
        q: "How does memoize cache key work?",
        a: "By default, JSON.stringify(args) creates the key. Custom keyResolver for complex args (objects) or when you want to ignore some params."
      },
      {
        q: "What is point-free style?",
        a: "Writing functions without mentioning arguments: const double = map(x => x * 2) vs const double = arr => arr.map(x => x * 2). Currying enables point-free."
      }
    ]
  }
};

export const day21 = {
  day: 21,
  title: "🔥 Polyfills Mastery: Write Your Own JS Methods",
  intro: "The #1 interview topic. If you can't write Promise.all from scratch, you're not ready for FAANG.",
  content: `
<div class="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<h4 class="text-red-600 dark:text-red-400 font-bold mb-2">🎯 Why Polyfills Matter</h4>
<p class="text-gray-600 dark:text-light-300">Every top company (Google, Amazon, Meta) asks polyfill questions. They test your understanding of JavaScript internals, not just API usage.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Polyfills You MUST Know</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Promise.all</code> - Wait for all promises</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Promise.race</code> - First to resolve wins</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Promise.allSettled</code> - Wait for all, success or fail</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Promise.any</code> - First success wins</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Array.prototype.map</code></li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Array.prototype.filter</code></li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Array.prototype.reduce</code></li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Function.prototype.bind</code></li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Function.prototype.call</code></li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Function.prototype.apply</code></li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ The Interview Strategy</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-green-600 dark:text-green-400 mb-2">✅ Do This</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-light-300">
        <li>Ask clarifying questions first</li>
        <li>Handle edge cases (empty arrays, no args)</li>
        <li>Explain your thought process</li>
        <li>Use proper error handling</li>
    </ul>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-red-600 dark:text-red-400 mb-2">❌ Avoid This</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-light-300">
        <li>Jumping straight to code</li>
        <li>Ignoring edge cases</li>
        <li>Not testing your solution</li>
        <li>Forgetting 'this' context</li>
    </ul>
</div>
</div>
            `,
  masteryChecklist: [
    {
      id: "d21-c1",
      text: "I can explain why Promise.all must preserve input order even when promises resolve out of order."
    },
    {
      id: "d21-c2",
      text: "I can write a Promise.all polyfill that handles non-promises via Promise.resolve."
    },
    {
      id: "d21-c3",
      text: "I can implement Array.prototype.map respecting sparse arrays (holes) and optional thisArg."
    },
    {
      id: "d21-c4",
      text: "I can implement bind and explain what changes when the bound function is called with new."
    },
    {
      id: "d21-c5",
      text: "I can test my polyfills with edge cases (empty input, rejection, holes, context)."
    }
  ],
  predictions: [
    {
      prompt: "Promise.all([slow(2), fast(1)]) resolves to…",
      options: [
        "[1, 2] (input order)",
        "[2, 1] (resolve order)",
        "It depends on CPU timing",
        "It throws unless all are already resolved"
      ],
      correctIndex: 0,
      explanation: "Promise.all preserves the order of the input iterable. Resolution timing doesn’t change the output index positions."
    },
    {
      prompt: "What happens with sparse arrays? `[1, , 3].map(x => x * 2)`",
      options: [
        "[2, NaN, 6]",
        "[2, undefined, 6]",
        "Callback is NOT called for the hole; the result keeps a hole at index 1",
        "It throws because the array is invalid"
      ],
      correctIndex: 2,
      explanation: "map skips missing indices. The output array has the same length and preserves holes."
    },
    {
      prompt: "In a correct bind polyfill, if you do `const C = Fn.bind(obj); new C()` then `this` inside Fn should be…",
      options: [
        "obj (always)",
        "the new instance created by new",
        "globalThis",
        "undefined"
      ],
      correctIndex: 1,
      explanation: "When called with `new`, the bound function must behave like a constructor: `this` becomes the new instance (bound context is ignored)."
    }
  ],
  checkpoints: [
    {
      prompt: "Why do we wrap each entry with Promise.resolve in a Promise.all polyfill?",
      options: [
        "To make promises resolve faster",
        "To handle non-promise values (like numbers) uniformly",
        "To turn rejections into fulfillments",
        "To preserve input order automatically"
      ],
      correctIndex: 1,
      explanation: "Promise.all accepts any values. Promise.resolve(x) converts non-promises into fulfilled promises so we can use a single async path."
    },
    {
      prompt: "What bug happens if your Promise.all polyfill does `results.push(value)`?",
      options: [
        "It mutates the input array",
        "It loses order (results come in resolve order, not input order)",
        "It rejects too early",
        "It creates memory leaks"
      ],
      correctIndex: 1,
      explanation: "push collects in completion order. Correct implementations assign `results[index] = value`."
    },
    {
      prompt: "Which check makes an Array.map polyfill match real behavior on sparse arrays?",
      options: [
        "`if (this[i] !== undefined)`",
        "`if (i < this.length)`",
        "`if (i in this)`",
        "`if (typeof this[i] === 'number')`"
      ],
      correctIndex: 2,
      explanation: "`i in this` checks whether the index exists (not whether its value is undefined). It’s the key to matching spec behavior."
    }
  ],
  labSteps: [
    {
      id: "d21-step-1",
      title: "Promise.all polyfill: preserve order (the #1 gotcha)",
      subtitle: "Fix the classic 'push results' bug",
      teacherNote: "Predict first: will the output come out as [1,2] or [2,1]? Then run and explain why.",
      bugCode: `console.clear();

// BUGGY Promise.all polyfill (order bug)
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let done = 0;
    if (!promises.length) return resolve([]);

    promises.forEach((p) => {
      Promise.resolve(p).then((value) => {
        results.push(value); // ❌ wrong: resolve order, not input order
        done++;
        if (done === promises.length) resolve(results);
      }, reject);
    });
  });
};

const slow = new Promise(r => setTimeout(() => r(2), 60));
const fast = new Promise(r => setTimeout(() => r(1), 10));

Promise.myAll([slow, fast]).then(res => console.log("myAll:", res));`,
      bugFocus: {
        fromLine: 10,
        toLine: 10
      },
      fixCode: `console.clear();

// FIXED Promise.all polyfill (preserve input order)
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([]);
    const results = new Array(promises.length);
    let done = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p).then((value) => {
        results[index] = value; // ✅ store at index
        done++;
        if (done === promises.length) resolve(results);
      }, reject);
    });
  });
};

const slow = new Promise(r => setTimeout(() => r(2), 60));
const fast = new Promise(r => setTimeout(() => r(1), 10));

Promise.myAll([slow, fast]).then(res => console.log("myAll:", res));`,
      fixFocus: {
        fromLine: 11,
        toLine: 11
      },
      whatToNotice: [
        "Promise.all is about 'all completed' but order is tied to the input positions.",
        "Using results[index] keeps output stable regardless of timing."
      ]
    },
    {
      id: "d21-step-2",
      title: "Array.map polyfill: respect holes (sparse arrays)",
      subtitle: "Match spec behavior using `i in this`",
      teacherNote: "A real map does NOT call your callback for missing indices. That’s a subtle but important spec detail.",
      bugCode: `console.clear();

Array.prototype.myMap = function(cb, thisArg) {
  const out = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    // BUG: calls cb even for holes
    out[i] = cb.call(thisArg, this[i], i, this);
  }
  return out;
};

const arr = [1, , 3]; // hole at index 1
const res = arr.myMap(x => x * 2);
console.log("res:", res, "1 in res?", 1 in res);`,
      bugFocus: {
        fromLine: 6,
        toLine: 7
      },
      fixCode: `console.clear();

Array.prototype.myMap = function(cb, thisArg) {
  if (typeof cb !== "function") throw new TypeError("cb must be a function");
  const out = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) { // ✅ only map existing indices
      out[i] = cb.call(thisArg, this[i], i, this);
    }
  }
  return out;
};

const arr = [1, , 3];
const res = arr.myMap(x => x * 2);
console.log("res:", res, "1 in res?", 1 in res);`,
      fixFocus: {
        fromLine: 7,
        toLine: 9
      },
      whatToNotice: [
        "A hole is different from an explicit undefined value.",
        "`i in this` checks existence, not the value."
      ]
    }
  ],
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  Day 21 Live Lab: Polyfills you can explain                          ║
║  Goal: make the built-ins feel "obvious"                             ║
╚══════════════════════════════════════════════════════════════════════╝
*/

console.clear();

// ─────────────────────────────────────────────────────────────
// Promise.myAll (Promise.all polyfill)
// ─────────────────────────────────────────────────────────────
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) return reject(new TypeError("myAll expects an array"));
    if (promises.length === 0) return resolve([]);

    const results = new Array(promises.length);
    let done = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        (value) => {
          results[index] = value;
          done++;
          if (done === promises.length) resolve(results);
        },
        (err) => reject(err)
      );
    });
  });
};

// ─────────────────────────────────────────────────────────────
// Array.prototype.myMap (Array.map polyfill)
// ─────────────────────────────────────────────────────────────
Array.prototype.myMap = function(cb, thisArg) {
  if (typeof cb !== "function") throw new TypeError("cb must be a function");
  const out = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) out[i] = cb.call(thisArg, this[i], i, this);
  }
  return out;
};

// ─────────────────────────────────────────────────────────────
// Function.prototype.myBind (bind polyfill, including "new")
// ─────────────────────────────────────────────────────────────
Function.prototype.myBind = function(context, ...boundArgs) {
  if (typeof this !== "function") throw new TypeError("myBind must be called on a function");
  const targetFn = this;

  function boundFn(...callArgs) {
    // If called with "new", ignore bound context and use the new instance.
    const isNew = new.target != null;
    const thisArg = isNew ? this : context;
    return targetFn.apply(thisArg, [...boundArgs, ...callArgs]);
  }

  // Preserve prototype chain for "new boundFn()"
  boundFn.prototype = Object.create(targetFn.prototype);
  return boundFn;
};

// ─────────────────────────────────────────────────────────────
// Tests (read the logs like a teacher: predict → run → explain)
// ─────────────────────────────────────────────────────────────
console.log("=== Promise.myAll preserves input order ===");
const slow = new Promise(r => setTimeout(() => r("slow"), 60));
const fast = new Promise(r => setTimeout(() => r("fast"), 10));
Promise.myAll([slow, fast, 42]).then(
  (res) => console.log("myAll result:", res),
  (err) => console.error("myAll error:", err)
);

console.log("=== myMap respects holes (sparse arrays) ===");
const sparse = [1, , 3];
const mapped = sparse.myMap((x) => x * 2);
console.log("mapped:", mapped, "| 1 in mapped?", 1 in mapped);

console.log("=== myBind and new behavior ===");
function Person(name) { this.name = name; }
Person.prototype.say = function() { return "Hi " + this.name; };
const BoundPerson = Person.myBind({ ignored: true }, "Asha");
const p = new BoundPerson(); // should behave like constructor
console.log("new BoundPerson().name:", p.name);
console.log("new BoundPerson().say():", p.say());`,
  recap: {
    takeaways: [
      "A polyfill is a mental model translated into code: edge cases are the interview.",
      "Promise.all must preserve input order; never collect results with push().",
      "Array.map skips holes; `i in this` is the key to matching spec behavior.",
      "bind must handle constructor calls: `new` changes what `this` means.",
      "Write a tiny test harness for every polyfill: empty input, rejection, sparse arrays, and `new`."
    ],
    commonMistakes: [
      "Using results.push() in Promise.all (breaks order).",
      "Forgetting Promise.resolve() (breaks non-promise inputs).",
      "Treating holes like undefined (wrong for map/filter).",
      "Ignoring `new` in bind polyfill (breaks constructors)."
    ],
    nextActions: [
      "Rewrite Promise.myAll from memory and test with slow/fast promises.",
      "Write myFilter and myReduce using the same 'spec mindset' (holes + thisArg).",
      "Explain bind + new with one sentence: 'constructor call wins over bound context'."
    ]
  },
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
      {
        q: "Why use Promise.resolve() inside Promise.all polyfill?",
        a: "To handle non-promise values. If someone passes [1, 2, Promise.resolve(3)], we need to wrap 1 and 2 in promises."
      },
      {
        q: "What's the difference between Promise.all and Promise.allSettled?",
        a: "Promise.all rejects immediately if ANY promise rejects. Promise.allSettled waits for ALL promises and returns status of each (fulfilled/rejected)."
      },
      {
        q: "Why check 'i in this' in array polyfills?",
        a: "To handle sparse arrays. [1,,3] has length 3 but index 1 doesn't exist. We shouldn't call callback for missing indices."
      },
      {
        q: "How does bind handle the 'new' keyword?",
        a: "If bound function is called with 'new', it ignores the bound 'this' and creates a new instance. Check with new.target."
      }
    ]
  }
};

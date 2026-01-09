export const day22 = {
  day: 22,
  title: "🔥 Build a Promise from Scratch",
  intro: "The ultimate JS interview question. If you understand Promises at this level, you understand JavaScript.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 22: Building a Promise. The hardest part isn't the state machine, it's the timing."
      },
      {
        type: "talk",
        message: "Promises must NEVER release Zalgo. They must always resolve asynchronously, even if the value is ready instantly."
      },
      {
        type: "challenge",
        instruction: "Fix the Sync Execution. This Promise implementation violates the spec because `.then()` runs immediately if the promise is already resolved. This changes the execution order of the program. Use `queueMicrotask` (or `setTimeout`) to force the callback to run later.",
        buggyCode: `class MyPromise {
  constructor(executor) {
    this.value = null;
    this.state = "pending";
    const resolve = (val) => {
      this.state = "fulfilled";
      this.value = val;
    };
    executor(resolve);
  }
  then(fn) {
    if (this.state === "fulfilled") {
      // ❌ BUG: Runs synchronously!
      fn(this.value);
    }
  }
}

console.log("1");
new MyPromise(r => r("2")).then(console.log);
console.log("3");

// Current Output: 1, 2, 3
// Correct Output: 1, 3, 2`,
        solutionCode: `class MyPromise {
  constructor(executor) {
    this.value = null;
    this.state = "pending";
    const resolve = (val) => {
      this.state = "fulfilled";
      this.value = val;
    };
    executor(resolve);
  }
  then(fn) {
    if (this.state === "fulfilled") {
      // ✅ Async execution
      queueMicrotask(() => fn(this.value));
    }
  }
}

console.log("1");
new MyPromise(r => r("2")).then(console.log);
console.log("3");`,
        verifyOutput: "1, 3, 2", // Logic check based, mainly checks code here
        verifyCode: "queueMicrotask",
        successMessage: "Correct. By wrapping the callback in `queueMicrotask`, you ensure the Promise callback runs after the current synchronous code finishes, preserving predictable execution order.",
        hint: "Wrap the `fn(this.value)` call inside `queueMicrotask(() => { ... })`."
      }
    ]
  },
  content: `
<div class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-4 rounded-xl mb-6">
<h4 class="text-purple-400 font-bold mb-2">🏆 The Holy Grail of JS Interviews</h4>
<p class="text-gray-600 dark:text-light-300">Building a Promise from scratch tests: closures, callbacks, async understanding, state machines, and error handling. It's asked at Google, Meta, and Amazon.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📐 Promise State Machine</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-700 dark:text-cyan-300">
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

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔑 Key Concepts to Implement</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">State</code> - pending, fulfilled, rejected</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Value</code> - resolved value or rejection reason</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">then()</code> - Register success/error handlers</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">catch()</code> - Register error handler</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">finally()</code> - Run regardless of outcome</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Chaining</code> - then() returns new Promise</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Tricky Parts</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Microtask Queue:</span> Handlers must run asynchronously (use queueMicrotask or setTimeout)</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Handler Queueing:</span> If then() called before resolve(), store handlers and run later</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Chaining:</span> then() must return a NEW promise that resolves with handler's return value</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Thenable Unwrapping:</span> If handler returns a promise, wait for it</li>
</ul>
            `,
  masteryChecklist: [
    {
      id: "d22-c1",
      text: "I can explain the Promise state machine (pending → fulfilled/rejected) and why it is one-way."
    },
    {
      id: "d22-c2",
      text: "I can implement then() so handlers run asynchronously (microtask-ish), even if already resolved."
    },
    {
      id: "d22-c3",
      text: "I can implement chaining: then() returns a NEW promise resolved with the handler return value."
    },
    {
      id: "d22-c4",
      text: "I can explain thenable unwrapping (if a handler returns a promise, you wait for it)."
    },
    {
      id: "d22-c5",
      text: "I can test my promise implementation with timing + error cases (throw inside handler, reject path)."
    }
  ],
  predictions: [
    {
      prompt: "If you attach a .then() after a promise is already resolved, when should the handler run?",
      options: [
        "Immediately in the same call stack",
        "Asynchronously after current call stack (microtask-like)",
        "Only on the next setTimeout",
        "Never (too late)"
      ],
      correctIndex: 1,
      explanation: "Real Promises always call then handlers asynchronously. This makes behavior consistent whether the promise is already settled or not."
    },
    {
      prompt: "If a then handler returns another promise, the next then in the chain receives…",
      options: [
        "The promise object itself",
        "The final resolved value of that returned promise",
        "undefined (return values are ignored)",
        "It throws because promises can't be nested"
      ],
      correctIndex: 1,
      explanation: "Chaining unwraps thenables: returning a promise delays the chain until it settles, and the next then receives its settled value."
    },
    {
      prompt: "What happens if a then handler throws an error?",
      options: [
        "It is ignored",
        "The original promise becomes rejected",
        "The NEW promise returned by then becomes rejected",
        "JavaScript crashes"
      ],
      correctIndex: 2,
      explanation: "then returns a new promise. If the handler throws, that returned promise must reject with the thrown error."
    }
  ],
  checkpoints: [
    {
      prompt: "Why must then handlers run asynchronously?",
      options: [
        "To be faster than sync code",
        "To match Promises/A+ and guarantee consistent ordering",
        "Because JavaScript cannot call functions synchronously",
        "Because setTimeout is required for promises"
      ],
      correctIndex: 1,
      explanation: "Async handler execution avoids 'sometimes sync, sometimes async' behavior and matches the Promise spec expectations."
    },
    {
      prompt: "A promise can change state…",
      options: [
        "Many times (pending ↔ fulfilled ↔ rejected)",
        "Only once (pending → fulfilled OR pending → rejected)",
        "Twice (pending → fulfilled → rejected)",
        "Only if you call resolve() twice"
      ],
      correctIndex: 1,
      explanation: "Promises are immutable after settlement. This makes async reasoning stable and prevents racey state flips."
    },
    {
      prompt: "Why does then() return a new promise instead of returning the same one?",
      options: [
        "So you can store more handlers",
        "So chaining can transform values and propagate errors independently",
        "Because JavaScript forbids returning this",
        "To reduce memory usage"
      ],
      correctIndex: 1,
      explanation: "The returned promise represents the outcome of the handler. That’s what enables mapping (value transforms) and error propagation."
    }
  ],
  labSteps: [
    {
      id: "d22-step-1",
      title: "Bug: handlers run synchronously when already resolved",
      subtitle: "Fix by scheduling handler execution asynchronously",
      teacherNote: "Predict the output order before you run. If B runs before C, your promise is wrong.",
      bugCode: `console.clear();

function asap(fn) { setTimeout(fn, 0); } // BUG: also too slow, but good enough for demo

class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];

    const resolve = (v) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = v;
      this.handlers.forEach(h => h.onFulfilled && h.onFulfilled(v)); // ❌ sync
    };
    const reject = (e) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.value = e;
      this.handlers.forEach(h => h.onRejected && h.onRejected(e)); // ❌ sync
    };

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    if (this.state === "fulfilled" && typeof onFulfilled === "function") {
      onFulfilled(this.value); // ❌ sync when already fulfilled
    } else if (this.state === "rejected" && typeof onRejected === "function") {
      onRejected(this.value); // ❌ sync when already rejected
    } else {
      this.handlers.push({ onFulfilled, onRejected });
    }
  }
}

const p = new MyPromise((res) => res("OK"));
console.log("A");
p.then(() => console.log("B"));
console.log("C");`,
      bugFocus: {
        fromLine: 26,
        toLine: 31
      },
      fixCode: `console.clear();

const asap = (fn) => (typeof queueMicrotask === "function" ? queueMicrotask(fn) : Promise.resolve().then(fn));

class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];

    const flush = () => {
      const handlers = this.handlers.slice();
      this.handlers = [];
      asap(() => {
        handlers.forEach(h => {
          if (this.state === "fulfilled" && typeof h.onFulfilled === "function") h.onFulfilled(this.value);
          if (this.state === "rejected" && typeof h.onRejected === "function") h.onRejected(this.value);
        });
      });
    };

    const resolve = (v) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = v;
      flush();
    };
    const reject = (e) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.value = e;
      flush();
    };

    try { executor(resolve, reject); } catch (e) { reject(e); }
  }

  then(onFulfilled, onRejected) {
    this.handlers.push({ onFulfilled, onRejected });
    // If already settled, flush (still async)
    if (this.state !== "pending") {
      const flushNow = this.handlers.slice();
      this.handlers = [];
      asap(() => {
        flushNow.forEach(h => {
          if (this.state === "fulfilled" && typeof h.onFulfilled === "function") h.onFulfilled(this.value);
          if (this.state === "rejected" && typeof h.onRejected === "function") h.onRejected(this.value);
        });
      });
    }
  }
}

const p = new MyPromise((res) => res("OK"));
console.log("A");
p.then(() => console.log("B"));
console.log("C");`,
      fixFocus: {
        fromLine: 35,
        toLine: 46
      },
      whatToNotice: [
        "Correct behavior is A, C, B (then is async).",
        "We schedule handler execution using queueMicrotask or Promise.resolve().then()."
      ]
    },
    {
      id: "d22-step-2",
      title: "Chaining: then() must return a NEW promise",
      subtitle: "Fix by returning a new promise and resolving with handler result",
      teacherNote: "The chain should transform values: 1 → 2 → 4.",
      bugCode: `console.clear();

class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];
    const resolve = (v) => { this.state = "fulfilled"; this.value = v; this.handlers.forEach(h => h(v)); };
    executor(resolve, () => {});
  }
  then(onFulfilled) {
    if (this.state === "fulfilled") onFulfilled(this.value);
    else this.handlers.push(onFulfilled);
    return this; // ❌ wrong: returns same promise
  }
}

new MyPromise((res) => res(1))
  .then(x => x + 1)
  .then(x => x * 2)
  .then(x => console.log("result should be 4, got:", x));`,
      bugFocus: {
        fromLine: 12,
        toLine: 13
      },
      fixCode: `console.clear();

const asap = (fn) => (typeof queueMicrotask === "function" ? queueMicrotask(fn) : Promise.resolve().then(fn));

function isThenable(x) { return x != null && (typeof x === "object" || typeof x === "function") && typeof x.then === "function"; }

class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];

    const settle = (state, v) => {
      if (this.state !== "pending") return;
      this.state = state;
      this.value = v;
      const hs = this.handlers.slice();
      this.handlers = [];
      asap(() => hs.forEach(h => h()));
    };

    const resolve = (v) => {
      if (isThenable(v)) return v.then(resolve, reject);
      settle("fulfilled", v);
    };
    const reject = (e) => settle("rejected", e);

    try { executor(resolve, reject); } catch (e) { reject(e); }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const run = () => {
        try {
          if (this.state === "fulfilled") {
            if (typeof onFulfilled !== "function") return resolve(this.value);
            const out = onFulfilled(this.value);
            return resolve(out);
          }
          if (this.state === "rejected") {
            if (typeof onRejected !== "function") return reject(this.value);
            const out = onRejected(this.value);
            return resolve(out);
          }
          // pending should not call run yet
        } catch (e) {
          reject(e);
        }
      };

      if (this.state === "pending") this.handlers.push(run);
      else asap(run);
    });
  }

  catch(onRejected) { return this.then(null, onRejected); }
  static resolve(v) { return new MyPromise((res) => res(v)); }
}

new MyPromise((res) => res(1))
  .then(x => x + 1)
  .then(x => x * 2)
  .then(x => console.log("result:", x));`,
      fixFocus: {
        fromLine: 29,
        toLine: 62
      },
      whatToNotice: [
        "then returns a NEW promise whose value is the handler output.",
        "If the handler throws, the returned promise rejects."
      ]
    }
  ],
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  Day 22 Live Lab: A minimal promise you can reason about             ║
║  Focus: async handlers + chaining + error propagation                ║
╚══════════════════════════════════════════════════════════════════════╝
*/

console.clear();

const asap = (fn) => (typeof queueMicrotask === "function" ? queueMicrotask(fn) : Promise.resolve().then(fn));
const isThenable = (x) => x != null && (typeof x === "object" || typeof x === "function") && typeof x.then === "function";

class MyPromise {
  constructor(executor) {
    this._state = "pending"; // pending | fulfilled | rejected
    this._value = undefined;
    this._queue = [];

    const flush = () => {
      const jobs = this._queue.slice();
      this._queue = [];
      asap(() => jobs.forEach((j) => j()));
    };

    const resolve = (v) => {
      if (this._state !== "pending") return;
      if (isThenable(v)) return v.then(resolve, reject);
      this._state = "fulfilled";
      this._value = v;
      flush();
    };
    const reject = (e) => {
      if (this._state !== "pending") return;
      this._state = "rejected";
      this._value = e;
      flush();
    };

    try { executor(resolve, reject); } catch (e) { reject(e); }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const run = () => {
        try {
          if (this._state === "fulfilled") {
            if (typeof onFulfilled !== "function") return resolve(this._value);
            return resolve(onFulfilled(this._value));
          }
          if (this._state === "rejected") {
            if (typeof onRejected !== "function") return reject(this._value);
            return resolve(onRejected(this._value));
          }
        } catch (e) {
          reject(e);
        }
      };

      if (this._state === "pending") this._queue.push(run);
      else asap(run);
    });
  }

  catch(onRejected) { return this.then(null, onRejected); }
  finally(onFinally) {
    const f = typeof onFinally === "function" ? onFinally : () => {};
    return this.then(
      (v) => MyPromise.resolve(f()).then(() => v),
      (e) => MyPromise.resolve(f()).then(() => { throw e; })
    );
  }

  static resolve(v) { return new MyPromise((res) => res(v)); }
  static reject(e) { return new MyPromise((_, rej) => rej(e)); }
}

console.log("Test 1: then is async");
const p1 = new MyPromise((res) => res("OK"));
console.log("A");
p1.then(() => console.log("B"));
console.log("C");

console.log("Test 2: chaining transforms values");
MyPromise.resolve(1)
  .then((x) => x + 1)
  .then((x) => x * 2)
  .then((x) => console.log("chain result:", x));

console.log("Test 3: errors propagate to returned promise");
MyPromise.resolve("start")
  .then(() => { throw new Error("boom"); })
  .then(() => console.log("should not run"))
  .catch((e) => console.log("caught:", e.message));`,
  recap: {
    takeaways: [
      "Promises are a state machine: pending becomes fulfilled OR rejected exactly once.",
      "then handlers must run asynchronously to avoid inconsistent ordering bugs.",
      "then returns a new promise representing the handler outcome (value mapping + error propagation).",
      "If a handler returns a thenable, the chain waits (thenable unwrapping)."
    ],
    commonMistakes: [
      "Calling then handlers synchronously when already settled.",
      "Returning the same promise from then (breaks chaining semantics).",
      "Not handling thrown errors inside handlers (should reject the returned promise).",
      "Not unwrapping thenables (nested promises appear instead of values)."
    ],
    nextActions: [
      "Add MyPromise.all and MyPromise.race on top of this base.",
      "Write tests for: multiple then calls, reject path, throwing inside executor, and returning a native Promise from a handler."
    ]
  },
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
      {
        q: "Why must handlers run asynchronously (microtask)?",
        a: "Promises/A+ spec requires it. It ensures consistent behavior - handlers always run after the current execution context, whether the promise is already resolved or pending."
      },
      {
        q: "What happens if you call resolve() twice?",
        a: "The second call is ignored. A promise can only transition from pending to fulfilled/rejected ONCE. We check state !== 'pending' before changing state."
      },
      {
        q: "Why does then() return a new Promise?",
        a: "For chaining. Each then() creates a new promise that resolves with the return value of its handler. This enables .then().then().then() chains."
      },
      {
        q: "How do you handle when handler returns a Promise?",
        a: "Thenable unwrapping. If handler returns a promise-like object (has .then method), we wait for it to settle and use its value. This is why you can return fetch() from then()."
      }
    ]
  }
};

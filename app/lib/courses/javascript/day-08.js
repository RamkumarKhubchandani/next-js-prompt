export const day08 = {
  day: 8,
  title: "Day 8: Async/Await (Readable Async) + Concurrency Patterns",
  intro: "Async/await makes async code readable, but it also hides performance traps. Today you’ll learn sequential vs parallel, proper error handling, and the forEach pitfall.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) Key Truth</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
<span class="text-yellow-600 dark:text-yellow-400 font-bold">await does not block the whole program</span>.
It pauses only the current async function and yields control back to the event loop.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The “Pausing” Power</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Normal functions run to completion. Generators can pause with yield and resume.
Async/await gives you a “pause here and continue later” feel.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-teal-300 mb-6 overflow-x-auto shadow-inner">
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

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Error Handling (The Professional Way)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
With async/await, use try/catch around awaits. Treat network + JSON parsing + validation as separate failure points.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Sequential vs Parallel (Huge Performance Difference)</h3>
<div class="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4 mb-6 text-gray-600 dark:text-light-300">
  <ul class="list-disc list-inside space-y-2">
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Sequential</span>: await inside a loop → slower but controlled.</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Parallel</span>: Promise.all with multiple tasks → fast but needs error strategy.</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) The forEach Pitfall (Very Common Bug)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Array.forEach does not await your async callback. It does not pause. Use for...of or Promise.all.
</p>
            `,
  predictions: [
    {
      prompt: "Predict: does Array.forEach wait for awaits inside its callback?",
      options: [
        "Yes",
        "No",
        "Only in strict mode",
        "Only in Node.js"
      ],
      correctIndex: 1,
      explanation: "forEach is synchronous and does not await. It fires callbacks and returns immediately."
    },
    {
      prompt: "Which is fastest for 5 independent requests?",
      options: [
        "await each request in a for loop (sequential)",
        "Promise.all (parallel)",
        "setTimeout around each request",
        "try/catch around each request"
      ],
      correctIndex: 1,
      explanation: "Promise.all runs them in parallel, minimizing total wall time (assuming no dependencies)."
    }
  ],
  checkpoints: [
    {
      prompt: "An async function always returns…",
      options: [
        "a value",
        "a Promise",
        "undefined",
        "a generator"
      ],
      correctIndex: 1,
      explanation: "async always returns a Promise. Returning a value becomes Promise.resolve(value)."
    },
    {
      prompt: "Best replacement for `arr.forEach(async x => ...)` is…",
      options: [
        "arr.map(async x => ...) without awaiting",
        "for...of with await, or Promise.all(arr.map(async ...))",
        "while loop only",
        "bind(this)"
      ],
      correctIndex: 1,
      explanation: "Use for...of for sequential, or Promise.all(map()) for parallel."
    }
  ],
  labSteps: [
    {
      id: "d8-step-1",
      title: "forEach + await bug",
      subtitle: "Why order is wrong / why it finishes early",
      teacherNote: "Predict: does 'done' print last? Then fix with for...of.",
      bugCode: `console.clear();

const wait = (ms) => new Promise(r => setTimeout(r, ms));

["A", "B", "C"].forEach(async (x) => {
  await wait(50);
  console.log("item:", x);
});

console.log("done");`,
      bugFocus: {
        fromLine: 5,
        toLine: 9
      },
      fixCode: `console.clear();

const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  for (const x of ["A", "B", "C"]) {
    await wait(50);
    console.log("item:", x);
  }
  console.log("done");
})();`,
      fixFocus: {
        fromLine: 5,
        toLine: 12
      },
      whatToNotice: [
        "forEach does not await the callback.",
        "for...of awaits sequentially and preserves predictable order."
      ]
    },
    {
      id: "d8-step-2",
      title: "Parallelize safely with Promise.all",
      subtitle: "Fast and clean",
      teacherNote: "Same work, much faster. Notice we await once at the end.",
      bugCode: `console.clear();

const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  // BUG: sequential (slow)
  const out = [];
  for (const ms of [120, 80, 50]) {
    await wait(ms);
    out.push(ms);
  }
  console.log("out:", out);
})();`,
      bugFocus: {
        fromLine: 6,
        toLine: 11
      },
      fixCode: `console.clear();

const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  // FIX: parallel
  const out = await Promise.all([120, 80, 50].map(async (ms) => {
    await wait(ms);
    return ms;
  }));
  console.log("out:", out);
})();`,
      fixFocus: {
        fromLine: 6,
        toLine: 12
      },
      whatToNotice: [
        "Promise.all runs tasks concurrently.",
        "Total time becomes roughly the slowest task, not the sum."
      ]
    }
  ],
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
      {
        q: "Is `await` blocking?",
        a: "No. It suspends the *async function*, but yields control back to the event loop, allowing other events to process."
      },
      {
        q: "What does an async function return?",
        a: "Always a Promise. Even if you return a primitive `return 1`, it wraps it `Promise.resolve(1)`."
      },
      {
        q: "Can you use `await` in `forEach`?",
        a: "No. `forEach` expects a synchronous callback. The promises will be created but `forEach` won't wait for them. Use `for...of` instead."
      }
    ]
  },
  recap: {
    takeaways: [
      "await pauses the async function, not the whole program.",
      "Sequential awaits are easier but slower; Promise.all enables parallelism.",
      "forEach does not await async callbacks; use for...of or Promise.all(map()).",
      "Error handling is simplest with try/catch around awaits."
    ],
    commonMistakes: [
      "Using await inside forEach and expecting it to wait.",
      "Accidentally making independent requests sequential (slow).",
      "Not handling partial failures when doing parallel work.",
      "Catching errors without rethrowing when the caller should handle them."
    ],
    nextActions: [
      "Rewrite a sequential loop into Promise.all and measure time difference.",
      "Practice: make a helper that runs tasks in parallel but returns successes + errors separately."
    ]
  }
};

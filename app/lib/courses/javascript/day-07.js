export const day07 = {
  day: 7,
  title: "Day 7: Promises (State, Chaining, Error Propagation)",
  intro: "Promises are not magic—they are a state machine plus queued callbacks. Today you’ll learn chaining, error propagation, and the real difference between all/allSettled/race/any.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 7! Promises. They replaced Callback Hell, but they brought a new devil: The 'Silent Undefined'."
      },
      {
        type: "code",
        code: `Promise.resolve(5)
  .then(n => { n * 2; }) // ❌ Forgot 'return'
  .then(n => console.log(n)); // undefined!`,
        caption: "The broken chain.",
        speed: "fast"
      },
      {
        type: "talk",
        message: "In a Promise chain, if you don't return a value, the next step gets `undefined`. It happens to everyone."
      },
      {
        type: "challenge",
        instruction: "This code prints `undefined` for the user data. Fix it so the data flows from the first `.then` to the second.",
        buggyCode: `Promise.resolve({ id: 1, name: "Alice" })
  .then(user => {
    // BUG: Missing return
    user.isAdmin = true;
    user; 
  })
  .then(user => console.log("User:", user));`,
        solutionCode: `Promise.resolve({ id: 1, name: "Alice" })
  .then(user => {
    user.isAdmin = true;
    return user; // ✅ Pass it down
  })
  .then(user => console.log("User:", user));`,
        verifyCode: "return",
        verifyOutput: "User: [object Object]",
        successMessage: "Data flow restored! Always check your returns in a chain.",
        hint: "Add the `return` keyword before `user` inside the first `.then` block."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) Mental Model</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
A Promise is an object with:
<span class="text-yellow-600 dark:text-yellow-400 font-bold">state</span> (pending → fulfilled/rejected),
<span class="text-yellow-600 dark:text-yellow-400 font-bold">value</span> (result or error),
and <span class="text-yellow-600 dark:text-yellow-400 font-bold">queues of callbacks</span> to run later (microtasks).
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Promise State Machine</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">A Promise can only move forward. It starts as pending.</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-orange-300 mb-6 overflow-x-auto shadow-inner">
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

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The Chain Rule (The Most Important Rule)</h3>
<p class="mb-4"><code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">.then()</code> always returns a <span class="text-yellow-600 dark:text-yellow-400 font-bold">NEW Promise</span>. This is why you can chain them.</p>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 bg-white dark:bg-dark-800 p-4 rounded-lg">
<li>Return a value? ➞ Next Promise <span class="text-yellow-600 dark:text-yellow-400 font-bold">Fulfilled</span>.</li>
<li>Return a Promise? ➞ Next Promise <span class="text-yellow-600 dark:text-yellow-400 font-bold">waits</span> for it.</li>
<li>Throw Error? ➞ Next Promise <span class="text-yellow-600 dark:text-yellow-400 font-bold">Rejected</span>.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Error Propagation (Why One catch can handle everything)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
If a promise in the chain rejects (or you throw in a then), the chain becomes rejected until a catch handles it.
This is why promise chains are cleaner than callback pyramids.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) all vs allSettled vs race vs any</h3>
<div class="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4 mb-6 text-gray-600 dark:text-light-300">
  <ul class="list-disc list-inside space-y-2">
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Promise.all</span>: wait for all; rejects fast if any rejects.</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Promise.allSettled</span>: wait for all; never rejects; gives statuses.</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Promise.race</span>: first settled wins (resolve or reject).</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Promise.any</span>: first fulfilled wins; rejects only if all reject.</li>
  </ul>
</div>
            `,
  predictions: [
    {
      prompt: "Predict: In a chain, if you forget to return inside a .then, what value does the next .then receive?",
      options: [
        "The previous value",
        "undefined",
        "The promise object",
        "It throws automatically"
      ],
      correctIndex: 1,
      explanation: "A .then callback that returns nothing returns undefined, so the next .then receives undefined."
    },
    {
      prompt: "Promise.all rejects when…",
      options: [
        "any promise rejects",
        "the slowest promise resolves",
        "all promises resolve",
        "the first promise resolves"
      ],
      correctIndex: 0,
      explanation: "Promise.all is fail-fast. One rejection rejects the whole aggregate."
    }
  ],
  checkpoints: [
    {
      prompt: "What does .then always return?",
      options: [
        "A value",
        "A new Promise",
        "The same Promise",
        "A callback"
      ],
      correctIndex: 1,
      explanation: ".then returns a new Promise so chaining works."
    },
    {
      prompt: "Which combinator is best when you need results even if some requests fail?",
      options: [
        "Promise.all",
        "Promise.allSettled",
        "Promise.race",
        "Promise.any"
      ],
      correctIndex: 1,
      explanation: "allSettled gives you success/failure per promise without failing the whole thing."
    }
  ],
  labSteps: [
    {
      id: "d7-step-1",
      title: "Missing return in .then",
      subtitle: "The silent undefined bug",
      teacherNote: "Predict what the second then receives. Then fix by returning the value.",
      bugCode: `console.clear();

Promise.resolve(2)
  .then(x => {
    x * 10; // BUG: forgot return
  })
  .then(x => console.log("x is:", x));`,
      bugFocus: {
        fromLine: 4,
        toLine: 6
      },
      fixCode: `console.clear();

Promise.resolve(2)
  .then(x => {
    return x * 10;
  })
  .then(x => console.log("x is:", x));`,
      fixFocus: {
        fromLine: 4,
        toLine: 6
      },
      whatToNotice: [
        "Returning a value fulfills the next promise with that value.",
        "Forgetting return is a very common real bug."
      ]
    },
    {
      id: "d7-step-2",
      title: "Promise.all fail-fast vs allSettled",
      subtitle: "When one failure kills everything",
      teacherNote: "Watch the behavior difference. This is how you design resilient flows.",
      bugCode: `console.clear();

const ok = Promise.resolve("OK");
const bad = Promise.reject(new Error("Boom"));

Promise.all([ok, bad])
  .then(res => console.log("all:", res))
  .catch(err => console.log("all error:", err.message));`,
      bugFocus: {
        fromLine: 6,
        toLine: 8
      },
      fixCode: `console.clear();

const ok = Promise.resolve("OK");
const bad = Promise.reject(new Error("Boom"));

Promise.allSettled([ok, bad])
  .then(res => console.log("allSettled:", res));`,
      fixFocus: {
        fromLine: 6,
        toLine: 7
      },
      whatToNotice: [
        "all rejects on first rejection.",
        "allSettled returns an array of {status, value|reason} for each promise."
      ]
    }
  ],
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
      {
        q: "What happens if you don't catch a Promise error?",
        a: "It causes an 'Unhandled Promise Rejection', which typically logs a warning but doesn't crash the main thread (Node.js might exit)."
      },
      {
        q: "Does `finally` receive arguments?",
        a: "No. `finally()` receives nothing. It is for cleanup code that runs regardless of success/failure."
      },
      {
        q: "How to run promises sequentially?",
        a: "Use `await` in a for-loop, or `.reduce()` with a Promise chain."
      }
    ]
  },
  recap: {
    takeaways: [
      "Promises are a state machine: pending → fulfilled/rejected.",
      ".then always returns a new Promise (chaining rule).",
      "Errors propagate down the chain until caught.",
      "Use all/allSettled/race/any depending on failure strategy."
    ],
    commonMistakes: [
      "Forgetting to return inside .then (leads to undefined).",
      "Catching too early and hiding failures (swallowing errors).",
      "Using Promise.all when you actually need partial success (use allSettled).",
      "Mixing callback style and promise style in the same flow."
    ],
    nextActions: [
      "Do the missing return lab and confirm the fix.",
      "Write a function that fetches 3 things with allSettled and reports successes/failures separately."
    ]
  }
};

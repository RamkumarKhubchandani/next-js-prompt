export const day06 = {
  day: 6,
  title: "Day 6: The Event Loop (Microtasks vs Macrotasks) + UI Smoothness",
  intro: "This is where JavaScript becomes predictable. You’ll learn the event loop like a timeline: what runs now, what runs next, and how to avoid freezing the UI.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The Promise of Today</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
After this lesson, “async bugs” stop feeling random. You will be able to read code and predict execution order.
That skill is the difference between a beginner and someone who can debug production issues.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Visual Event Loop</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
JavaScript runs synchronous code on the Call Stack. The platform (browser/Node) does timers/network in the background,
then schedules callbacks back onto queues. The loop pulls work from those queues when the stack is empty.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto shadow-inner">
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

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Priority Rules (The Exact Order)</h3>
<ol class="list-decimal list-inside space-y-3 text-gray-600 dark:text-light-300 bg-white dark:bg-dark-800 p-4 rounded-lg mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Run Synchronous Code</span> until Stack is empty.</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Run ALL Microtasks</span> until queue is empty. (Can starve the loop!)</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Render UI</span> (Browser Repaint).</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Run ONE Macrotask</span>.</li>
<li>Repeat.</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Microtask Starvation (How Pages Freeze)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Microtasks have “VIP priority”. If you keep enqueueing microtasks forever, the browser never gets a chance to paint or handle timers.
This can freeze UI even though you never wrote a while(true) loop.
</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Teacher warning:</span> never create an unbounded chain of <span class="text-yellow-600 dark:text-yellow-400 font-bold">Promise.then</span> or <span class="text-yellow-600 dark:text-yellow-400 font-bold">queueMicrotask</span> callbacks.
    Always yield occasionally.
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) The Most Useful Debug Trick</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
When you’re confused, add logs labeled “sync”, “microtask”, “task” and re-run. Make the timeline visible.
</p>

<details class="mb-6 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-gray-800 dark:text-light-100">Browser vs Node note</summary>
  <div class="mt-3 text-gray-600 dark:text-light-300 space-y-3">
    <p>
      The high-level idea is the same, but details differ between runtimes. Browsers have rendering frames; Node has phases
      (timers, poll, check, etc.). Today we focus on the transferable mental model: stack → microtasks → tasks.
    </p>
  </div>
</details>
            `,
  predictions: [
    {
      prompt: "Predict output order: sync logs, then Promise.then, then setTimeout?",
      options: [
        "1, 2, 3, 4",
        "1, 4, 2, 3",
        "1, 4, 3, 2",
        "3, 1, 4, 2"
      ],
      correctIndex: 2,
      explanation: "Sync runs first (1 then 4). Microtasks (Promise.then) flush before tasks (setTimeout), so 3 prints before 2."
    },
    {
      prompt: "What can cause UI freezing without a while loop?",
      options: [
        "A long chain of microtasks that never ends",
        "Using setTimeout(…, 0)",
        "Using console.log too much",
        "Using async/await"
      ],
      correctIndex: 0,
      explanation: "Unbounded microtasks can starve rendering and tasks. The page can freeze even if you never block with sync loops."
    }
  ],
  checkpoints: [
    {
      prompt: "Microtasks run…",
      options: [
        "after every setTimeout",
        "before the next macrotask and before rendering opportunities",
        "only in Node.js",
        "only when you use async/await"
      ],
      correctIndex: 1,
      explanation: "Microtasks flush after the current stack and before macrotasks; in browsers they also run before paint opportunities."
    },
    {
      prompt: "Best fix for heavy CPU work on the main thread is…",
      options: [
        "more Promises",
        "chunking (yielding) or moving to a worker",
        "setTimeout(…, 0) everywhere",
        "try/catch"
      ],
      correctIndex: 1,
      explanation: "Chunk work so the event loop can breathe, or offload CPU work to a worker to keep UI responsive."
    }
  ],
  labSteps: [
    {
      id: "d6-step-1",
      title: "Ordering bug: why did Promise run before timeout?",
      subtitle: "Make the timeline visible",
      teacherNote: "Predict the order, then run. If you guessed wrong, explain using: 'microtasks flush before tasks'.",
      bugCode: `console.clear();

console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
      bugFocus: {
        fromLine: 3,
        toLine: 4
      },
      fixCode: `console.clear();

console.log("[sync] 1");
setTimeout(() => console.log("[task] 2"), 0);
Promise.resolve().then(() => console.log("[microtask] 3"));
console.log("[sync] 4");

// Explain: stack finishes -> microtasks flush -> tasks run.`,
      fixFocus: {
        fromLine: 3,
        toLine: 8
      },
      whatToNotice: [
        "Labeling logs turns confusion into a timeline.",
        "Microtasks always run before timers once the stack is empty."
      ]
    },
    {
      id: "d6-step-2",
      title: "Microtask starvation (safe demo)",
      subtitle: "Too many microtasks can block timers",
      teacherNote: "This demo is bounded (safe). Notice how the timer waits until microtasks finish.",
      bugCode: `console.clear();

setTimeout(() => console.log("timer fired"), 0);

let n = 0;
function loop() {
  queueMicrotask(() => {
    n++;
    if (n < 5000) loop();
  });
}
loop();

console.log("scheduled");`,
      bugFocus: {
        fromLine: 4,
        toLine: 11
      },
      fixCode: `console.clear();

setTimeout(() => console.log("timer fired"), 0);

let n = 0;
function loop() {
  // FIX: occasionally yield to the task queue
  if (n % 500 === 0) {
    setTimeout(loop, 0);
    return;
  }
  queueMicrotask(() => {
    n++;
    if (n < 5000) loop();
  });
}
loop();

console.log("scheduled");`,
      fixFocus: {
        fromLine: 6,
        toLine: 16
      },
      whatToNotice: [
        "Unbounded microtasks can delay timers and rendering.",
        "Yielding gives the event loop room to process other work."
      ]
    }
  ],
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
      {
        q: "Difference between Task and Microtask?",
        a: "Tasks (Macro) are IO/Timers. Microtasks are Promises/MutationObservers. Microtasks run immediately after the current stack, before rendering."
      },
      {
        q: "Does JS run in parallel?",
        a: "No. JS is single-threaded. However, the Browser (Web APIs) handles network/timers in parallel threads."
      },
      {
        q: "Why is `requestAnimationFrame` better for animations?",
        a: "It runs exactly before the browser repaints, ensuring smooth 60fps visuals, unlike setTimeout which is imprecise."
      }
    ]
  },
  recap: {
    takeaways: [
      "Event loop order: run sync → flush microtasks → (browser paint) → run a macrotask.",
      "Promise.then/queueMicrotask are microtasks (VIP), setTimeout is a task.",
      "Microtask starvation can delay timers and rendering.",
      "Labeling logs (sync/microtask/task) turns async confusion into a timeline."
    ],
    commonMistakes: [
      "Believing setTimeout(…, 0) runs immediately.",
      "Assuming Promises and timers have equal priority.",
      "Creating unbounded microtask loops (starving the event loop).",
      "Doing heavy CPU work on main thread without yielding."
    ],
    nextActions: [
      "Re-run the ordering lab and narrate why 3 comes before 2.",
      "Try chunking a loop by yielding with setTimeout(…, 0) every N iterations."
    ]
  }
};

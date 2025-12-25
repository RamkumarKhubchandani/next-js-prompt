export const day10 = {
  day: 10,
  title: "Day 10: Web Workers (Real Multithreading for JS)",
  intro: "The main thread is for UI. Heavy CPU work belongs in a worker. Today you’ll learn message passing, structured cloning cost, and a practical pattern using a Blob worker.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) Why Workers Matter</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
If you do heavy computation on the main thread, the UI freezes: clicks lag, animations stutter, inputs feel broken.
Workers let you move CPU work off the main thread while keeping the UI responsive.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Main Thread vs Worker Thread</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Workers run in parallel. They do not share memory with the main thread by default.</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-green-300 mb-6 overflow-x-auto shadow-inner">
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

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The Hidden Cost: Structured Cloning</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
postMessage copies data using structured cloning. Huge objects can be expensive to copy.
</p>
<p class="mb-6 text-gray-600 dark:text-light-300">
For high-performance scenarios, use Transferable objects (like ArrayBuffer) or SharedArrayBuffer (advanced).
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Practical Pattern: Blob Workers</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
In many apps you don’t want to maintain a separate worker.js file. You can create a worker from a Blob string at runtime.
We’ll do that in the Guided Lab.
</p>
            `,
  predictions: [
    {
      prompt: "Can a Web Worker directly access the DOM?",
      options: [
        "Yes",
        "No",
        "Only with strict mode",
        "Only in Chrome"
      ],
      correctIndex: 1,
      explanation: "Workers don’t have window/document. They must communicate with the main thread to update UI."
    },
    {
      prompt: "Why can postMessage be slow with big objects?",
      options: [
        "Because it blocks the GPU",
        "Because data is cloned (copied) by default",
        "Because workers run on the same thread",
        "Because JSON parsing is slow"
      ],
      correctIndex: 1,
      explanation: "Structured cloning copies data. Large payloads cost time and memory."
    }
  ],
  checkpoints: [
    {
      prompt: "Web Workers are best used for…",
      options: [
        "DOM updates",
        "CPU-heavy computations",
        "CSS animations",
        "React rendering"
      ],
      correctIndex: 1,
      explanation: "Workers are for compute. UI stays on main thread."
    },
    {
      prompt: "How do workers communicate with the main thread?",
      options: [
        "Shared global variables",
        "Direct function calls",
        "Message passing (postMessage/onmessage)",
        "Importing window"
      ],
      correctIndex: 2,
      explanation: "Workers use message passing. No direct shared DOM or call stack."
    }
  ],
  labSteps: [
    {
      id: "d10-step-1",
      title: "UI freeze vs worker offload (conceptual demo)",
      subtitle: "Same work, different place",
      teacherNote: "In a real UI, the first version causes visible lag. We’ll still show the pattern clearly here.",
      bugCode: `console.clear();

function heavy(n) {
  let x = 0;
  for (let i = 0; i < n; i++) x += i % 10;
  return x;
}

console.time("main-thread heavy");
console.log("result:", heavy(30_000_000));
console.timeEnd("main-thread heavy");`,
      bugFocus: {
        fromLine: 3,
        toLine: 11
      },
      fixCode: `console.clear();

// FIX: move heavy computation into a worker (Blob worker)
const workerCode = \`
self.onmessage = (e) => {
  const n = e.data;
  let x = 0;
  for (let i = 0; i < n; i++) x += i % 10;
  self.postMessage(x);
};
\`;

const blob = new Blob([workerCode], { type: "text/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

console.time("worker heavy");
worker.onmessage = (e) => {
  console.log("result:", e.data);
  console.timeEnd("worker heavy");
  worker.terminate();
};
worker.postMessage(30_000_000);`,
      fixFocus: {
        fromLine: 3,
        toLine: 22
      },
      whatToNotice: [
        "Main thread stays free while worker computes.",
        "Communication is via postMessage."
      ]
    },
    {
      id: "d10-step-2",
      title: "Message payload size (structured clone cost)",
      subtitle: "Don’t send huge JSON if you don’t need to",
      teacherNote: "We’ll simulate the cost by sending a big array. Keep messages small or use transferables.",
      bugCode: `console.clear();

const workerCode = \`
self.onmessage = (e) => {
  // echo back size
  self.postMessage(e.data.length);
};
\`;
const blob = new Blob([workerCode], { type: "text/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

const big = new Array(500000).fill(1);
console.time("postMessage big");
worker.onmessage = (e) => {
  console.timeEnd("postMessage big");
  console.log("worker saw length:", e.data);
  worker.terminate();
};
worker.postMessage(big);`,
      bugFocus: {
        fromLine: 11,
        toLine: 18
      },
      fixCode: `console.clear();

const workerCode = \`
self.onmessage = (e) => {
  // do something tiny
  self.postMessage({ ok: true });
};
\`;
const blob = new Blob([workerCode], { type: "text/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

// FIX: send minimal data needed
console.time("postMessage small");
worker.onmessage = (e) => {
  console.timeEnd("postMessage small");
  console.log("worker replied:", e.data);
  worker.terminate();
};
worker.postMessage({ action: "ping" });`,
      fixFocus: {
        fromLine: 13,
        toLine: 18
      },
      whatToNotice: [
        "Bigger payloads cost more to copy.",
        "Prefer small messages, or use transferables for performance-critical paths."
      ]
    }
  ],
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
      {
        q: "Can Web Workers modify the DOM?",
        a: "No. They run in a separate thread without `window` or `document` access. They must message the main thread to update UI."
      },
      {
        q: "What is the cost of postMessage?",
        a: "Serialization. Sending huge objects takes time to copy. Use SharedArrayBuffer or Transferable Objects for performance."
      },
      {
        q: "Difference between Web Worker and Service Worker?",
        a: "Web Workers are for computation. Service Workers are for network interception (caching/offline) and act as a proxy."
      }
    ]
  },
  recap: {
    takeaways: [
      "Workers run on a separate thread and cannot touch the DOM.",
      "Main thread should stay responsive; move CPU-heavy work to workers.",
      "postMessage copies data by default (structured clone), which can be costly.",
      "Blob workers are a practical pattern to avoid separate worker files."
    ],
    commonMistakes: [
      "Trying to access window/document inside a worker.",
      "Sending huge objects over postMessage instead of small messages/transferables.",
      "Forgetting to terminate workers when they’re no longer needed.",
      "Using workers for tiny tasks (overhead can outweigh benefit)."
    ],
    nextActions: [
      "Try the Blob worker guided lab and observe the pattern (postMessage/onmessage).",
      "Refactor one heavy loop into a worker and keep UI work on main thread."
    ]
  }
};

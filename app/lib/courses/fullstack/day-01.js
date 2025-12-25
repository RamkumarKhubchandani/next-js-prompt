export const day01 = {
  day: 1,
  title: "Node.js Architecture & Event Loop",
  intro: "Node is Single-Threaded but Non-Blocking. Understand libuv and the thread pool.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>What “single-threaded” <span class="text-yellow-600 dark:text-yellow-400 font-bold">really</span> means in Node.</li>
  <li>How Node is built: <span class="text-brand-primary font-bold">V8 + libuv</span> (and why that matters).</li>
  <li>Event Loop phases (timers, poll, check) + <span class="text-yellow-600 dark:text-yellow-400 font-bold">microtasks</span>.</li>
  <li>Threadpool: which APIs use it (and how you accidentally DDoS yourself).</li>
  <li>Why “async” code can still be <span class="text-red-300 font-bold">blocking</span>.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Node Runtime: V8 + libuv</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Node is not “JavaScript”. Node is a <span class="text-yellow-600 dark:text-yellow-400 font-bold">runtime</span> built from multiple parts:
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
┌─────────────────────────────────────────────────────────────┐
│                         Your JS Code                         │
└─────────────────────────────────────────────────────────────┘
                │
                ▼
┌───────────────────────────┐   ┌─────────────────────────────┐
│            V8             │   │            libuv             │
│  - JS engine (JIT)        │   │  - Event loop                │
│  - Heap + GC              │   │  - Threadpool (fs/crypto/...) │
│  - Executes JS on 1 thread│   │  - OS I/O abstraction         │
└───────────────────────────┘   └─────────────────────────────┘
                │                          │
                ▼                          ▼
        JS Call Stack                 Kernel / OS APIs
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) “Single Threaded” vs “Non‑Blocking” (The Big Clarification)</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
  <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl">
    <p class="text-red-800 dark:text-red-200 font-bold mb-2">Single Threaded (JS execution)</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Your JS runs on one main thread. If you block it, everything stops: requests queue, timers delay, sockets stall.</p>
  </div>
  <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl">
    <p class="text-green-800 dark:text-green-200 font-bold mb-2">Non‑Blocking (I/O model)</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Node offloads I/O (network, files, DNS, crypto) to the OS and/or libuv threadpool, then resumes JS when results are ready.</p>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Event Loop Phases (The Mental Model)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Think of the event loop as a <span class="text-yellow-600 dark:text-yellow-400 font-bold">scheduler</span>. It pulls callbacks from different queues, in a predictable order.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
┌─────────────────────────────────────────────────────────────┐
│ timers  → pending callbacks → idle/prepare → poll → check → close │
└─────────────────────────────────────────────────────────────┘
  ↑setTimeout/setInterval             ↑I/O callbacks   ↑setImmediate

Microtasks (run between phases):
  - process.nextTick queue (Node-specific, highest priority)
  - Promise microtask queue
</pre>
</div>

<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
  <p class="text-blue-800 dark:text-blue-200 text-sm">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Important:</span> <code class="bg-dark-700 px-1 rounded">process.nextTick</code> can starve the loop if abused (it runs before Promises and before moving to the next phase).
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) Threadpool: The Hidden Bottleneck</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Some “async” APIs don’t use the kernel directly; they use libuv’s <span class="text-yellow-600 dark:text-yellow-400 font-bold">threadpool</span> (default size is small).
</p>

<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-light-300 mb-6">
  <p class="mb-2 font-bold text-gray-900 dark:text-white">Common threadpool users</p>
  <ul class="list-disc list-inside space-y-1 text-sm">
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">fs</span> (many file operations)</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">crypto</span> (pbkdf2, scrypt, some hashing work)</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">zlib</span> (compression)</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">dns.lookup</span> (not <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">dns.resolve*</code>)</li>
  </ul>
</div>

<p class="mb-6 text-gray-600 dark:text-light-300">
If you launch many concurrent crypto/file tasks, you can saturate the threadpool and increase latency for unrelated requests. This is why “it’s async” is not the same as “it scales”.
</p>
            `,
  code: `/**
 * Day 1: Event Loop Ordering Demo (Node)
 * Run: node event-loop-demo.js
 *
 * Goal:
 * - Observe sync vs microtasks vs timers vs immediates vs I/O callbacks
 * - Build an intuition for "why did my log order change?"
 */

const fs = require('node:fs');

console.log('1) sync: start');

setTimeout(() => console.log('6) macrotask: setTimeout(0)'), 0);

setImmediate(() => console.log('7) macrotask: setImmediate'));

process.nextTick(() => console.log('3) microtask: nextTick'));

Promise.resolve().then(() => console.log('4) microtask: promise.then'));

fs.readFile(__filename, () => {
  console.log('8) I/O: fs.readFile callback');

  // Inside an I/O callback, setImmediate usually runs before setTimeout(0)
  setTimeout(() => console.log('10) I/O->timers: setTimeout(0)'), 0);
  setImmediate(() => console.log('9) I/O->check: setImmediate'));
});

console.log('2) sync: end');

/**
 * Typical output (can vary by OS/load):
 * 1) sync: start
 * 2) sync: end
 * 3) microtask: nextTick
 * 4) microtask: promise.then
 * 6) macrotask: setTimeout(0)
 * 7) macrotask: setImmediate
 * 8) I/O: fs.readFile callback
 * 9) I/O->check: setImmediate
 * 10) I/O->timers: setTimeout(0)
 */`,
  comparison: {
    junior: `// ❌ “It’s async so it’s fine” (common mistake)
app.get('/report', async (req, res) => {
  // Heavy CPU loop blocks the event loop (even inside async function)
  let sum = 0;
  for (let i = 0; i < 2e9; i++) sum += i;
  res.json({ sum });
});

// Result: server becomes unresponsive under load.`,
    senior: `// ✅ Separate concerns: I/O vs CPU
app.get('/report', async (req, res) => {
  // I/O is fine on the event loop (DB, HTTP, cache)
  const user = await db.user.findById(req.user.id);

  // CPU-heavy work goes to Worker Threads / separate service
  const report = await reportWorker.compute(user.id);
  res.json({ report });
});

// Result: event loop stays responsive, latency predictable.`
  },
  interview: {
    questions: [
      {
        q: "If Node runs JS on one thread, how can it handle thousands of connections?",
        a: "Because most work is I/O. Node delegates socket I/O to the OS (epoll/kqueue/IOCP) via libuv, then schedules small JS callbacks when data is ready. Concurrency comes from the evented I/O model, not from running JS in parallel."
      },
      {
        q: "What’s the difference between microtasks and macrotasks in Node?",
        a: "Microtasks run before the event loop proceeds to the next phase. In Node: process.nextTick has the highest priority, then Promise microtasks. Macrotasks are phase queues like timers (setTimeout/setInterval) and check (setImmediate)."
      },
      {
        q: "Name a few Node APIs that use the libuv threadpool and why it matters.",
        a: "Many fs operations, crypto (pbkdf2/scrypt), zlib, and dns.lookup use the threadpool. It’s limited in size, so heavy concurrent usage can cause queueing and latency spikes for unrelated requests."
      }
    ]
  }
};

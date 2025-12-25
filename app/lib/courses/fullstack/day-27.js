export const day27 = {
  day: 27,
  title: "Node Performance (Profiling, Memory Leaks, Worker Threads)",
  intro: "At scale, performance issues are usually your event loop, your DB, or your memory. Today you’ll learn how to diagnose and fix them.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>How to detect event loop blocking and slow endpoints.</li>
  <li>Memory leaks in Node (closures, caches, global maps).</li>
  <li>When to use Worker Threads vs separate services.</li>
  <li>Connection pooling basics for DBs and why it matters.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Three Big Bottlenecks</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
1) Event loop blocked (CPU-heavy JS)
2) DB slow / missing indexes / too many queries
3) Memory leak (heap growth, GC thrash)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Fix CPU Work</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Move CPU-heavy work to <span class="text-yellow-600 dark:text-yellow-400 font-bold">Worker Threads</span>.</li>
  <li>Or move it to a separate service (best for heavy workloads).</li>
  <li>Don’t increase Node instances to “fix” CPU in one request path; you’re just spreading the pain.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Fix DB Work</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Measure query counts and durations.</li>
  <li>Add indexes aligned to top queries.</li>
  <li>Batch requests and avoid N+1.</li>
</ul>
            `,
  code: `/**
 * Day 27: Basic event loop lag monitor (production-friendly idea)
 */

function startEventLoopLagMonitor({ intervalMs = 500, warnMs = 100 } = {}) {
  let last = Date.now();
  setInterval(() => {
    const now = Date.now();
    const lag = now - last - intervalMs;
    if (lag > warnMs) {
      console.warn('event_loop_lag', { lagMs: Math.round(lag) });
    }
    last = now;
  }, intervalMs).unref();
}

startEventLoopLagMonitor({ intervalMs: 500, warnMs: 150 });`,
  comparison: {
    junior: `// ❌ Guessing performance
// "Node is slow" / "DB is slow" with no measurement`,
    senior: `// ✅ Measure then fix
// - p95 latency, event loop lag, heap growth
// - DB query plan + indexes
// - workers for CPU tasks`
  },
  interview: {
    questions: [
      {
        q: "What is event loop lag and why does it matter?",
        a: "It’s the delay between when timers should run and when they actually run. High lag indicates the main thread is blocked, which increases latency for all requests."
      },
      {
        q: "What causes memory leaks in Node?",
        a: "Long-lived references preventing GC: global maps, caches without eviction, closures holding large objects, event listeners not removed."
      },
      {
        q: "Worker Threads vs Cluster?",
        a: "Worker Threads run JS in parallel threads within a process (good for CPU tasks). Cluster runs multiple Node processes (scale-out). Worker threads share memory more easily but add complexity."
      }
    ]
  }
};

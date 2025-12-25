export const day15 = {
  day: 15,
  title: "System Design: Scaling",
  intro: "Vertical vs Horizontal Scaling.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>How to think like a system designer: bottlenecks, constraints, and tradeoffs.</li>
  <li>Vertical vs horizontal scaling, and when each wins.</li>
  <li>Latency budgeting (where time actually goes).</li>
  <li>CAP theorem basics + how real systems choose tradeoffs.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The First Question: What’s the Bottleneck?</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Scaling is not magic. Identify what’s limiting you:
CPU, memory, DB connections, disk I/O, network bandwidth, or external dependencies.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Vertical vs Horizontal Scaling</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6 text-sm">
  <div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-700 dark:text-light-200">
    <p class="font-bold text-gray-900 dark:text-white mb-2">Vertical (Scale Up)</p>
    <ul class="list-disc list-inside space-y-1">
      <li>simpler ops</li>
      <li>fast to execute</li>
      <li>hard upper limit + downtime risk</li>
    </ul>
  </div>
  <div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-700 dark:text-light-200">
    <p class="font-bold text-gray-900 dark:text-white mb-2">Horizontal (Scale Out)</p>
    <ul class="list-disc list-inside space-y-1">
      <li>resilience + capacity</li>
      <li>requires stateless services + load balancing</li>
      <li>adds distributed systems complexity</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) A Simple Latency Budget</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Client → Edge (TLS) → App → Cache → DB → App → Client
   30ms     10ms     15ms   1ms   40ms   5ms    30ms
Total ~131ms
</pre>
</div>
            `,
  code: "// Conceptual",
  comparison: {
    junior: `// ❌ Buy Bigger Server
// Vertical Scaling
// Limited by hardware`,
    senior: `// ✅ Buy More Servers
// Horizontal Scaling
// Unlimited theoretical limit`
  },
  interview: {
    questions: [
      {
        q: "What is CAP theorem in one sentence?",
        a: "In the presence of a network partition, you must choose between Consistency and Availability; Partition Tolerance is required in distributed systems."
      },
      {
        q: "What’s the first thing you do when an API is slow in production?",
        a: "Measure. Add tracing/metrics, identify where latency is spent (DB, cache, external calls, CPU). Then fix the dominant bottleneck (index, caching, batching, async IO, etc.)."
      },
      {
        q: "Why do stateless services scale better horizontally?",
        a: "Any instance can handle any request, so load balancing is simple and failures don’t lose session state (which can live in shared stores like Redis or cookies)."
      }
    ]
  }
};

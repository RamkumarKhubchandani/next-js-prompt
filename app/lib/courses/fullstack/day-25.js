export const day25 = {
  day: 25,
  title: "Resilience Patterns (Timeouts, Retries, Circuit Breakers)",
  intro: "Reliability is built into code paths: timeouts everywhere, retries with backoff, and preventing cascading failures.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Why missing timeouts create outages.</li>
  <li>Retries: when they help vs when they amplify failures.</li>
  <li>Circuit breakers and bulkheads (contain blast radius).</li>
  <li>Backpressure: protect your DB and downstream APIs.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Timeouts Are a Contract</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Every network call must have a timeout. Without it, stuck connections slowly consume your resources.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Retry Only Idempotent Operations</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Retrying non-idempotent actions (like charging a card) can cause duplicates. Use idempotency keys.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Circuit Breaker</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
If a downstream dependency is failing, stop hammering it. Fail fast and recover gradually.
</p>
            `,
  code: `/**
 * Day 25: fetch with timeout (AbortController)
 */

async function fetchWithTimeout(url, { timeoutMs = 3000, ...opts } = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(t);
  }
}

// Retry rule of thumb:
// - retry GET safely (idempotent)
// - for POST, require idempotency keys and careful design`,
  comparison: {
    junior: `// ❌ No timeouts, infinite waiting
await fetch('https://dependency/api');
// when dependency hangs, your app threads pile up`,
    senior: `// ✅ Resilience built-in
// - timeouts + retries (with backoff)
// - circuit breaker for failing deps
// - bulkheads / concurrency limits
// - queue async work where possible`
  },
  interview: {
    questions: [
      {
        q: "Why are timeouts critical in distributed systems?",
        a: "Because networks fail in partial ways. Without timeouts, calls can hang indefinitely and exhaust threads/connections/memory, causing cascading failure."
      },
      {
        q: "When can retries be harmful?",
        a: "During outages, retries can amplify load and make recovery slower (retry storms). Use exponential backoff, jitter, and circuit breakers."
      },
      {
        q: "What is a circuit breaker?",
        a: "A pattern that stops calling a failing dependency after a threshold, then periodically probes for recovery. It protects your system from cascading failures."
      }
    ]
  }
};

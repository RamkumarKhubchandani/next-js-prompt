export const day11 = {
  day: 11,
  title: "Serverless Functions (Lambda)",
  intro: "Pay only for compute time.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>What “serverless” actually means (and what you still manage).</li>
  <li>Cold starts, concurrency, timeouts, and cost model.</li>
  <li>Best practice architecture: API Gateway → Lambda → DB.</li>
  <li>Observability: logs, metrics, traces, correlation IDs.</li>
  <li>How to keep serverless <span class="text-yellow-600 dark:text-yellow-400 font-bold">safe</span>: least privilege IAM + input validation.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Serverless = “No Servers to Manage” (Not “No Ops”)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
With serverless you don’t patch VMs or run autoscaling groups. But you still manage:
<span class="text-yellow-600 dark:text-yellow-400 font-bold">architecture, performance, security, observability, and cost</span>.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The Cost Model (Why It’s Great for Spiky Traffic)</h3>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-2 text-sm">
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Pay per request</span> + compute time.</li>
    <li>When idle: cost is near zero.</li>
    <li>At steady high traffic: containers/servers can be cheaper.</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Cold Starts (The Latency Spike)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
If your function is idle, the platform may need to start a new runtime (“cold start”).
Keep bundles small, avoid heavy initialization, and reuse connections when possible.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) The #1 Production Rule: Make Handlers Stateless</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Never rely on in-memory state between invocations. You can cache safely only as an optimization (best-effort),
but correctness must not depend on it.
</p>
            `,
  code: `/**
 * Day 11: Serverless handler pattern (AWS Lambda style)
 * Key ideas:
 * - validate input
 * - return structured responses
 * - correlation id in logs
 * - keep init small, reuse clients
 */

// "global" init is reused on warm invocations
// (but never depend on it for correctness)
const crypto = require('node:crypto');

function json(statusCode, body, headers = {}) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  const requestId = event.requestContext?.requestId || crypto.randomUUID();
  console.log('request', { requestId, path: event.rawPath, method: event.requestContext?.http?.method });

  try {
    const name = (event.queryStringParameters?.name || 'world').trim();
    if (name.length > 50) return json(400, { error: 'VALIDATION_ERROR', message: 'name too long', requestId });

    // do work (DB/API) here
    return json(200, { message: 'hello ' + name, requestId });
  } catch (err) {
    console.error('error', { requestId, message: err.message });
    return json(500, { error: 'INTERNAL_ERROR', requestId });
  }
};`,
  comparison: {
    junior: `// ❌ Idle Server
// Paying $50/mo for a VPS 
// Traffic is low 90% of the time`,
    senior: `// ✅ Serverless (when it fits)
// - 0-ish cost when idle
// - scales quickly for spiky traffic
// - tradeoffs: cold starts, vendor details, observability`
  },
  interview: {
    questions: [
      {
        q: "What is a cold start and how do you reduce it?",
        a: "A latency spike when a new runtime/container must start. Reduce by keeping bundles small, minimizing init work, using provisioned concurrency (if available), and avoiding heavy dependencies."
      },
      {
        q: "Why must serverless handlers be stateless?",
        a: "Because instances can be recycled anytime and can run concurrently. In-memory state is not durable and leads to correctness bugs."
      },
      {
        q: "When is serverless a bad fit?",
        a: "Sustained high-throughput workloads where containers are cheaper, ultra-low-latency systems sensitive to cold starts, and long-running jobs that exceed timeout limits (unless you use step functions/queues)."
      }
    ]
  }
};

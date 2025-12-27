export const day23 = {
  day: 23,
  title: "Background Jobs & Queues (BullMQ/Redis)",
  intro: "If it doesn’t need to happen in the request, don’t do it in the request. Queues turn latency into throughput.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>When to use queues (emails, reports, video processing, webhooks).</li>
  <li>Retries, backoff, dead-letter queues, and idempotency.</li>
  <li>Job concurrency and rate control.</li>
  <li>Exactly-once is hard; build <span class="text-yellow-600 dark:text-yellow-400 font-bold">at-least-once</span> + idempotent handlers.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Architecture</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
API (enqueue) → Redis Queue → Worker (process) → DB/Email/S3
                     │
                     └→ retries/backoff → DLQ
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Idempotency (Required)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Workers can run a job twice (crash after side-effect). Use a unique jobId and store processed keys.
</p>
            `,
  code: `/**
 * Day 23: BullMQ queue + worker (conceptual)
 * Install: npm i bullmq ioredis
 */

const { Queue, Worker } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis('redis://127.0.0.1:6379');
const emailQueue = new Queue('email', { connection });

// Producer (API)
async function enqueueWelcomeEmail(userId) {
  // jobId makes it idempotent at the queue level
  await emailQueue.add('welcome', { userId }, { jobId: 'welcome:' + userId, attempts: 5, backoff: { type: 'exponential', delay: 1000 } });
}

// Consumer (worker)
const worker = new Worker('email', async (job) => {
  // do side-effect here (send email)
  // ensure your email provider call is idempotent too if possible
  return { ok: true, userId: job.data.userId };
}, { connection, concurrency: 10 });

worker.on('failed', (job, err) => {
  console.error('job failed', job && job.id, err.message);
});`,
  comparison: {
    junior: `// ❌ Do everything in the request
app.post('/signup', async (req, res) => {
  await db.insertUser(...);
  await sendEmail(...); // slow + flaky
  res.json({ ok: true });
});`,
    senior: `// ✅ Request is fast, work is async
app.post('/signup', async (req, res) => {
  const user = await db.insertUser(...);
  await enqueueWelcomeEmail(user.id);
  res.status(201).json({ data: user });
});`
  },
  interview: {
    questions: [
      {
        q: "Why are background jobs usually at-least-once?",
        a: "Because crashes/timeouts happen. Systems prefer re-processing over losing work. Therefore handlers must be idempotent."
      },
      {
        q: "What is a DLQ and why use it?",
        a: "Dead-letter queue stores jobs that failed after retries. It prevents infinite retry loops and enables manual inspection/replay."
      },
      {
        q: "What is exponential backoff?",
        a: "A retry strategy where delays grow after each failure (1s, 2s, 4s...). It reduces load on downstream dependencies during outages."
      }
    ]
  }
};

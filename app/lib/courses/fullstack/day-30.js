export const day30 = {
  day: 30,
  title: "System Design Case Study (Design a Real API)",
  intro: "Today you’ll practice the system design interview style: define requirements, choose data model, and scale safely.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>How to run a system design conversation: requirements → APIs → data → scaling.</li>
  <li>How to identify bottlenecks and pick pragmatic solutions.</li>
  <li>How to layer cache, queues, and DB indexes in the right order.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Case: “Design a Notifications Service”</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Users receive notifications (email/push/in-app). Requirements: high throughput, retries, dedupe, and auditability.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
API: POST /notifications (enqueue)
DB: notifications table (audit) + outbox
Queue: notification jobs
Worker: sends email/push, retries, DLQ
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Design Decisions</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Idempotency</span>: client-supplied key to dedupe retries.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Reliability</span>: outbox pattern + worker retries + DLQ.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Observability</span>: requestId + jobId + delivery status tracking.</li>
</ul>
            `,
  code: `/**
 * Day 30: API contract sketch (notifications)
 */

// POST /notifications
// Headers:
//   Idempotency-Key: <uuid>
// Body:
// {
//   "userId": "123",
//   "channel": "email",
//   "template": "welcome",
//   "payload": { "name": "Ada" }
// }
//
// Response: 202 Accepted
// { "data": { "notificationId": "n1", "status": "queued" } }
//
// Worker updates delivery status:
// queued -> sending -> delivered | failed (with reason)`,
  comparison: {
    junior: `// ❌ Synchronous sending
// API sends email/push inline → slow and unreliable`,
    senior: `// ✅ Async design
// enqueue → worker → retries/DLQ → audit trail`
  },
  interview: {
    questions: [
      {
        q: "Why return 202 Accepted for async operations?",
        a: "Because the request is accepted for processing but not completed yet. It accurately communicates asynchronous processing."
      },
      {
        q: "How do you prevent duplicate notifications?",
        a: "Use idempotency keys and store a unique constraint on (idempotencyKey, userId) or a processed-key store; make worker idempotent too."
      },
      {
        q: "What would you measure for this system?",
        a: "Queue depth, delivery latency, success/failure rates by provider, retry counts, and p95 API enqueue latency."
      }
    ]
  }
};

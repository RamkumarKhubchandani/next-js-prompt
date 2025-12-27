export const day22 = {
  day: 22,
  title: "Production Error Handling, Logging & Observability",
  intro: "If you can’t debug production in minutes, you don’t own the system. Today you’ll build real observability habits.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Structured logging vs console logs.</li>
  <li>Correlation IDs (requestId) and log redaction.</li>
  <li>Metrics basics (latency, error rate, saturation) and SLO mindset.</li>
  <li>Tracing: why distributed systems need spans.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Logs: Make Them Queryable</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Logs should be structured JSON so you can filter by <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">requestId</code>,
<code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">userId</code>, <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">route</code>,
and <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">errorCode</code>.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The Golden Signals</h3>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-1 text-sm">
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Latency</span></li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Traffic</span></li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Errors</span></li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Saturation</span> (CPU, memory, DB pool, queue depth)</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Errors Must Have Codes</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Error messages are for humans, codes are for systems. Codes let you alert on specific failures.
</p>
            `,
  code: `/**
 * Day 22: Minimal structured logger + requestId in Express
 * Install: npm i pino pino-http
 */

const express = require('express');
const pinoHttp = require('pino-http');
const crypto = require('node:crypto');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.id = req.headers['x-request-id'] || crypto.randomUUID();
  res.setHeader('x-request-id', req.id);
  next();
});

app.use(pinoHttp({
  customProps: (req) => ({ requestId: req.id }),
  redact: ['req.headers.authorization', 'req.headers.cookie'],
}));

app.get('/users/:id', async (req, res) => {
  req.log.info({ userId: req.params.id }, 'get user');
  res.json({ data: { id: req.params.id } });
});

app.use((err, req, res, next) => {
  req.log.error({ err, code: err.code || 'INTERNAL_ERROR' }, 'request failed');
  res.status(err.status || 500).json({ error: { code: err.code || 'INTERNAL_ERROR' }, requestId: req.id });
});

app.listen(3000);`,
  comparison: {
    junior: `// ❌ console.log everywhere
console.log('error', err);
// no requestId, secrets leak into logs`,
    senior: `// ✅ structured logs + correlation
logger.info({ requestId, userId, route }, 'msg');
logger.error({ requestId, code, err }, 'failed');
// redact secrets by default`
  },
  interview: {
    questions: [
      {
        q: "What are the golden signals?",
        a: "Latency, traffic, errors, saturation. They give a compact view of system health and user impact."
      },
      {
        q: "Why structured logging?",
        a: "It makes logs machine-queryable (filter, group, alert). Plain text logs are hard to search reliably and hard to correlate across services."
      },
      {
        q: "What is a correlation/request ID and why use it?",
        a: "A unique id attached to each request and propagated across services. It lets you trace a single request through logs and spans."
      }
    ]
  }
};

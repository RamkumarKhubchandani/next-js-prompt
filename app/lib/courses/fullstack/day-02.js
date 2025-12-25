export const day02 = {
  day: 2,
  title: "Express.js & Middleware",
  intro: "Express is a chain of middleware functions. `(req, res, next) => ...`",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>The real Express mental model: <span class="text-yellow-600 dark:text-yellow-400 font-bold">a middleware pipeline</span>.</li>
  <li>How to structure a production API: routes → controllers → services → repositories.</li>
  <li>How to avoid common footguns: double responses, async errors, and leaky abstractions.</li>
  <li>Security & reliability basics: request IDs, timeouts, and centralized error handling.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Express is a Pipeline (Not “Routes”)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Express processes requests by passing them through a chain of functions. Each middleware can:
<span class="text-yellow-600 dark:text-yellow-400 font-bold">read</span> the request, <span class="text-yellow-600 dark:text-yellow-400 font-bold">write</span> the response, or <span class="text-yellow-600 dark:text-yellow-400 font-bold">delegate</span> via <code class="bg-dark-700 px-1 rounded">next()</code>.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Request
  │
  ▼
 [ reqId ] → [ auth ] → [ validate ] → [ controller ] → [ errorHandler ]
  │                                                  ▲
  └───────────────────── if error: next(err) ─────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The “One Response” Rule</h3>
<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200 text-sm">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Rule:</span> for each request, send exactly one response.
    The most common production bug is “Can't set headers after they are sent.”
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Production Structure (Thin Controllers)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Routes</span>: map HTTP to controller functions.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Controllers</span>: translate request → service call → response.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Services</span>: business rules (pure-ish, testable).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Repositories</span>: DB access (Prisma/SQL/Mongo).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) Error Handling (The Correct Shape)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Express has a special middleware signature for errors:
<code class="bg-dark-700 px-1 rounded">(err, req, res, next)</code>. This is where you map domain errors to HTTP status codes.
</p>
            `,
  code: `/**
 * Day 2: Express "Production Skeleton"
 * (single file demo; in real apps split into /routes /controllers /services /middlewares)
 *
 * Run:
 *   npm i express zod
 *   node server.js
 */

const express = require('express');
const { z } = require('zod');
const crypto = require('node:crypto');

const app = express();
app.use(express.json());

// 1) Request ID middleware (observability)
app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  res.setHeader('x-request-id', req.id);
  next();
});

// 2) Tiny async wrapper so thrown errors reach errorHandler
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// 3) Validation middleware factory
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({ body: req.body, params: req.params, query: req.query });
  if (!result.success) {
    return res.status(400).json({ error: 'VALIDATION_ERROR', issues: result.error.issues });
  }
  req.validated = result.data;
  next();
};

// 4) “Service” (business logic)
async function createUserService({ email }) {
  // pretend DB insert; enforce a business rule
  if (email.endsWith('@example.com')) {
    const err = new Error('Disposable email not allowed');
    err.code = 'BAD_EMAIL_DOMAIN';
    err.status = 422;
    throw err;
  }

  return { id: crypto.randomUUID(), email };
}

const createUserSchema = z.object({
  body: z.object({ email: z.string().email() }),
  params: z.object({}),
  query: z.object({}),
});

// 5) Route → controller (thin) → service
app.post(
  '/users',
  validate(createUserSchema),
  asyncHandler(async (req, res) => {
    const { email } = req.validated.body;
    const user = await createUserService({ email });
    res.status(201).json({ user });
  }),
);

// 6) Central error handler (one place)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const code = err.code || 'INTERNAL_ERROR';
  console.error('error', { requestId: req.id, code, message: err.message });
  res.status(status).json({ error: code, message: err.message, requestId: req.id });
});

app.listen(3000, () => console.log('API listening on http://localhost:3000'));`,
  comparison: {
    junior: `// ❌ Everything inside the route (un-testable)
app.post('/users', async (req, res) => {
  // validate
  // business rules
  // db calls
  // error mapping
  // logging
  res.json({ ok: true });
});`,
    senior: `// ✅ Layers + middleware pipeline (testable)
router.post(
  '/users',
  reqId(),
  auth(),
  validate(createUserSchema),
  asyncHandler(createUserController),
);

// errorHandler maps domain errors → HTTP once, globally.`
  },
  interview: {
    questions: [
      {
        q: "Why is middleware order important in Express?",
        a: "Because requests flow top-to-bottom through the chain. If you register auth after routes, routes can be accessed without auth. If you register errorHandler before routes, it won't catch route errors."
      },
      {
        q: "How do you handle errors from async route handlers in Express?",
        a: "Either wrap handlers with an asyncHandler that catches and calls next(err), or use a framework/Express version pattern that supports promise-returning handlers. The goal is: all errors reach the central error middleware."
      },
      {
        q: "What does 'Can't set headers after they are sent' mean?",
        a: "You tried to send more than one response for a request (e.g., res.json then later res.send, or an error path sends after the success path). Fix by returning after sending, or by structuring a single response path."
      }
    ]
  }
};

export const fullStackContet = {fullstack: {
    id: 'fullstack',
    title: 'Full Stack JavaScript: Backend, Databases, DevOps & System Design',
    description: 'A 33-day, job-ready roadmap: Node.js internals, APIs, databases, auth, caching, queues, Docker, CI/CD, Kubernetes, and system design. Updated for 2025.',
    totalDays: 33,
    days: [
        {
            day: 0,
            title: 'Day 0: Professional Full‑Stack Setup (Zero to Production Parity)',
            intro: "The fastest way to become senior is to stop “winging” setup. Today you’ll build a repeatable environment: correct Node version, clean package manager, Docker databases, secrets, and a professional workflow.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Achieve Today</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">One Node version</span> per project (no “works on my machine”).</li>
  <li><span class="text-yellow-400 font-bold">One package manager</span> with deterministic installs (lockfiles you can trust).</li>
  <li><span class="text-yellow-400 font-bold">Databases in Docker</span> (wipe/reset in seconds, same version as prod).</li>
  <li><span class="text-yellow-400 font-bold">Secrets done right</span> (dotenv locally, secret manager in prod).</li>
  <li><span class="text-yellow-400 font-bold">Professional workflow</span>: lint/format scripts, git hygiene, and API tooling.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Node.js Version Discipline (nvm)</h3>
<p class="mb-4 text-light-300">
Senior teams don’t “install Node” once. They <span class="text-brand-primary font-bold">pin versions</span> so every machine and CI runs the same runtime.
</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre><code>
# macOS/Linux: install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Windows: install nvm-windows (recommended)
# https://github.com/coreybutler/nvm-windows

# Install the latest LTS Node.js
nvm install --lts
nvm use --lts

# Verify
node -v
npm -v
</code></pre>
</div>

<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
  <p class="text-blue-200">
    <span class="text-yellow-400 font-bold">Pro move:</span> add a <code class="bg-dark-700 px-2 py-1 rounded">.nvmrc</code> file to every repo (example: <code class="bg-dark-700 px-2 py-1 rounded">lts/*</code> or <code class="bg-dark-700 px-2 py-1 rounded">20.11.1</code>).
  </p>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Package Manager Hygiene (Corepack + pnpm)</h3>
<p class="mb-4 text-light-300">
The “bug” is often your dependency tree. Use a lockfile + pinned toolchain so installs are identical across machines.
</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre><code>
# Corepack ships with modern Node and lets you pin package managers per project.
corepack enable

# Example: use pnpm (fast + space efficient)
corepack prepare pnpm@9.15.0 --activate
pnpm -v

# Deterministic install
pnpm install --frozen-lockfile
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Local Databases via Docker Compose (Production Parity)</h3>
<p class="mb-4 text-light-300">
Installing databases directly on your laptop creates version drift. Containers give you <span class="text-brand-primary font-bold">resettable, consistent</span> environments.
</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre><code>
# docker-compose.yml (example)
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DB: app
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"

volumes:
  postgres_data:
</code></pre>
</div>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre><code>
# Start services
docker compose up -d

# Inspect
docker compose ps
docker logs -f &lt;container_name&gt;

# Reset ONLY data (nuclear option)
docker compose down -v
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">4) Environment Variables & Secrets (No Leaks)</h3>
<p class="mb-4 text-light-300">
Use <code class="bg-dark-700 px-2 py-1 rounded">.env</code> locally, but <span class="text-yellow-400 font-bold">never commit secrets</span>. In production, use a secret manager (AWS SSM/Secrets Manager, GCP Secret Manager, etc.).
</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200 text-sm">
    <span class="text-yellow-400 font-bold">Rule:</span> if a value can damage you when leaked (DB password, JWT secret, API key), it must not be in Git history.
  </p>
</div>

<h3 class="text-xl font-bold text-white mb-4">5) API Testing Tools (Professional Debugging)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Postman</span>: best for teams, environments, collections, pre-request scripts.</li>
  <li><span class="text-yellow-400 font-bold">Insomnia</span>: lightweight and fast, great for developers.</li>
  <li><span class="text-yellow-400 font-bold">curl</span>: the universal tool (works in CI, servers, and minimal environments).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">✅ Day 0 Checklist</h3>
<div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-300">
  <ul class="list-disc list-inside space-y-2">
    <li>Node pinned via nvm (and <code class="bg-dark-900 px-1 rounded">.nvmrc</code> present).</li>
    <li>Package manager pinned via Corepack (lockfile committed).</li>
    <li>Docker Compose running Postgres + Redis locally.</li>
    <li><code class="bg-dark-900 px-1 rounded">.env</code> used locally, secrets never committed.</li>
    <li>API client installed + can hit a health endpoint.</li>
  </ul>
</div>
                `,
            code: `/**
 * Day 0: Setup Validator (Node script)
 * Run: node setup-check.js
 *
 * What it teaches:
 * - Validate required environment variables
 * - Print toolchain versions (debugging in CI)
 * - Fail fast with actionable errors
 */

const required = [
  'NODE_ENV',
  'DATABASE_URL',
  'REDIS_URL',
  'JWT_ACCESS_SECRET',
];

const missing = required.filter((k) => !process.env[k] || String(process.env[k]).trim() === '');

console.log('✅ Node:', process.version);
console.log('✅ Platform:', process.platform, process.arch);
console.log('✅ NODE_ENV:', process.env.NODE_ENV);

if (missing.length) {
  console.error('\\n❌ Missing required env vars:');
  for (const k of missing) console.error(' -', k);
  console.error('\\nTip: create a .env (local) and load it with dotenv in dev.');
  process.exit(1);
}

console.log('\\n✅ Environment looks good. Ready for Day 1 (Event Loop).');`,
            video: 'tlB8487q', 
            comparison: {
                junior: `// ❌ “Local setup” (fragile)
// 1) Install Node once, never check version
// 2) npm install (no frozen lockfile)
// 3) Install Postgres locally (unknown version)
// 4) Store secrets in code or commit .env
// 5) Debug issues by guessing`,
                senior: `// ✅ “Production parity” (repeatable)
// 1) Pin Node with nvm + .nvmrc
// 2) Pin package manager with Corepack
// 3) Run Postgres/Redis via docker compose
// 4) Use dotenv locally, secret manager in prod
// 5) Validate env + fail fast (setup-check.js)`
            },
            interview: {
                questions: [
                    {
                        q: "Why do senior teams pin Node.js versions per repo?",
                        a: "Because Node versions change runtime behavior (ESM, TLS defaults, OpenSSL, fetch, V8 optimizations). Pinning makes local, CI, and production consistent and prevents heisenbugs caused by version drift."
                    },
                    {
                        q: "Why use Docker Compose for databases instead of installing Postgres/Mongo locally?",
                        a: "Compose provides isolated, reproducible environments with explicit versions. You can reset state quickly, onboard teammates faster, and match production more closely (same major versions + config patterns)."
                    },
                    {
                        q: "What’s the difference between config and secrets?",
                        a: "Config is safe to commit (ports, feature flags, non-sensitive defaults). Secrets can cause damage if leaked (passwords, API keys, JWT signing keys) and must be stored outside Git (dotenv locally, secret manager in production)."
                    }
                ]
            }
        },
        {
            day: 1,
            title: 'Node.js Architecture & Event Loop',
            intro: "Node is Single-Threaded but Non-Blocking. Understand libuv and the thread pool.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>What “single-threaded” <span class="text-yellow-400 font-bold">really</span> means in Node.</li>
  <li>How Node is built: <span class="text-brand-primary font-bold">V8 + libuv</span> (and why that matters).</li>
  <li>Event Loop phases (timers, poll, check) + <span class="text-yellow-400 font-bold">microtasks</span>.</li>
  <li>Threadpool: which APIs use it (and how you accidentally DDoS yourself).</li>
  <li>Why “async” code can still be <span class="text-red-300 font-bold">blocking</span>.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Node Runtime: V8 + libuv</h3>
<p class="mb-4 text-light-300">
Node is not “JavaScript”. Node is a <span class="text-yellow-400 font-bold">runtime</span> built from multiple parts:
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
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

<h3 class="text-xl font-bold text-white mb-4">2) “Single Threaded” vs “Non‑Blocking” (The Big Clarification)</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
  <div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl">
    <p class="text-red-200 font-bold mb-2">Single Threaded (JS execution)</p>
    <p class="text-light-300 text-sm">Your JS runs on one main thread. If you block it, everything stops: requests queue, timers delay, sockets stall.</p>
  </div>
  <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl">
    <p class="text-green-200 font-bold mb-2">Non‑Blocking (I/O model)</p>
    <p class="text-light-300 text-sm">Node offloads I/O (network, files, DNS, crypto) to the OS and/or libuv threadpool, then resumes JS when results are ready.</p>
  </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Event Loop Phases (The Mental Model)</h3>
<p class="mb-4 text-light-300">
Think of the event loop as a <span class="text-yellow-400 font-bold">scheduler</span>. It pulls callbacks from different queues, in a predictable order.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
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

<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
  <p class="text-blue-200 text-sm">
    <span class="text-yellow-400 font-bold">Important:</span> <code class="bg-dark-700 px-1 rounded">process.nextTick</code> can starve the loop if abused (it runs before Promises and before moving to the next phase).
  </p>
</div>

<h3 class="text-xl font-bold text-white mb-4">4) Threadpool: The Hidden Bottleneck</h3>
<p class="mb-4 text-light-300">
Some “async” APIs don’t use the kernel directly; they use libuv’s <span class="text-yellow-400 font-bold">threadpool</span> (default size is small).
</p>

<div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-300 mb-6">
  <p class="mb-2 font-bold text-white">Common threadpool users</p>
  <ul class="list-disc list-inside space-y-1 text-sm">
    <li><span class="text-yellow-400 font-bold">fs</span> (many file operations)</li>
    <li><span class="text-yellow-400 font-bold">crypto</span> (pbkdf2, scrypt, some hashing work)</li>
    <li><span class="text-yellow-400 font-bold">zlib</span> (compression)</li>
    <li><span class="text-yellow-400 font-bold">dns.lookup</span> (not <code class="bg-dark-900 px-1 rounded">dns.resolve*</code>)</li>
  </ul>
</div>

<p class="mb-6 text-light-300">
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
        },
        {
            day: 2,
            title: 'Express.js & Middleware',
            intro: "Express is a chain of middleware functions. `(req, res, next) => ...`",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>The real Express mental model: <span class="text-yellow-400 font-bold">a middleware pipeline</span>.</li>
  <li>How to structure a production API: routes → controllers → services → repositories.</li>
  <li>How to avoid common footguns: double responses, async errors, and leaky abstractions.</li>
  <li>Security & reliability basics: request IDs, timeouts, and centralized error handling.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Express is a Pipeline (Not “Routes”)</h3>
<p class="mb-4 text-light-300">
Express processes requests by passing them through a chain of functions. Each middleware can:
<span class="text-yellow-400 font-bold">read</span> the request, <span class="text-yellow-400 font-bold">write</span> the response, or <span class="text-yellow-400 font-bold">delegate</span> via <code class="bg-dark-700 px-1 rounded">next()</code>.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Request
  │
  ▼
 [ reqId ] → [ auth ] → [ validate ] → [ controller ] → [ errorHandler ]
  │                                                  ▲
  └───────────────────── if error: next(err) ─────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) The “One Response” Rule</h3>
<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200 text-sm">
    <span class="text-yellow-400 font-bold">Rule:</span> for each request, send exactly one response.
    The most common production bug is “Can't set headers after they are sent.”
  </p>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Production Structure (Thin Controllers)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Routes</span>: map HTTP to controller functions.</li>
  <li><span class="text-yellow-400 font-bold">Controllers</span>: translate request → service call → response.</li>
  <li><span class="text-yellow-400 font-bold">Services</span>: business rules (pure-ish, testable).</li>
  <li><span class="text-yellow-400 font-bold">Repositories</span>: DB access (Prisma/SQL/Mongo).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">4) Error Handling (The Correct Shape)</h3>
<p class="mb-4 text-light-300">
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
                    { q: "Why is middleware order important in Express?", a: "Because requests flow top-to-bottom through the chain. If you register auth after routes, routes can be accessed without auth. If you register errorHandler before routes, it won't catch route errors." },
                    { q: "How do you handle errors from async route handlers in Express?", a: "Either wrap handlers with an asyncHandler that catches and calls next(err), or use a framework/Express version pattern that supports promise-returning handlers. The goal is: all errors reach the central error middleware." },
                    { q: "What does 'Can't set headers after they are sent' mean?", a: "You tried to send more than one response for a request (e.g., res.json then later res.send, or an error path sends after the success path). Fix by returning after sending, or by structuring a single response path." }
                ]
            }
        },
        {
            day: 3,
            title: 'REST API Design',
            intro: "Resources, Verbs, and Status Codes. Don't return 200 OK for an error.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>How to design REST resources that survive growth (and teams).</li>
  <li>Status codes that communicate correctly to clients + observability.</li>
  <li>Pagination, filtering, sorting, and idempotency.</li>
  <li>Common anti-patterns: RPC URLs, inconsistent errors, and “200 for failure”.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Resource Modeling (Nouns + Hierarchy)</h3>
<p class="mb-4 text-light-300">Your URL should represent <span class="text-yellow-400 font-bold">resources</span>, not actions.</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre><code>
# ✅ Resources
GET    /users
POST   /users
GET    /users/:id
PATCH  /users/:id
DELETE /users/:id

# ✅ Nested relationship (only when it matters)
GET /users/:id/orders
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Status Codes as a Contract</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6 text-sm">
  <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl text-light-200">
    <p class="font-bold text-green-300 mb-2">Success</p>
    <ul class="list-disc list-inside space-y-1">
      <li><code class="bg-dark-900 px-1 rounded">200</code> OK (read/update)</li>
      <li><code class="bg-dark-900 px-1 rounded">201</code> Created (+ Location header)</li>
      <li><code class="bg-dark-900 px-1 rounded">204</code> No Content (delete)</li>
    </ul>
  </div>
  <div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl text-light-200">
    <p class="font-bold text-red-300 mb-2">Client Errors</p>
    <ul class="list-disc list-inside space-y-1">
      <li><code class="bg-dark-900 px-1 rounded">400</code> bad request / validation</li>
      <li><code class="bg-dark-900 px-1 rounded">401</code> unauthenticated</li>
      <li><code class="bg-dark-900 px-1 rounded">403</code> forbidden</li>
      <li><code class="bg-dark-900 px-1 rounded">404</code> not found</li>
      <li><code class="bg-dark-900 px-1 rounded">409</code> conflict (unique/email)</li>
      <li><code class="bg-dark-900 px-1 rounded">422</code> semantic rule failure</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Pagination (Cursor > Offset at Scale)</h3>
<p class="mb-4 text-light-300">
Offset pagination gets slow on large tables and can duplicate/miss items when data changes.
Cursor pagination is stable and performant.
</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre><code>
GET /users?limit=20&cursor=eyJpZCI6IjEwMDAifQ==

Response:
{
  "data": [...],
  "nextCursor": "eyJpZCI6IjEwMjAifQ=="
}
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">4) Idempotency (Payments & Retries)</h3>
<p class="mb-4 text-light-300">
If clients retry (mobile networks, timeouts), your API must not create duplicates.
Use an <span class="text-yellow-400 font-bold">Idempotency-Key</span> for dangerous creates.
</p>
            `,
            code: `/**
 * Day 3: REST Contracts Example (errors + idempotency + pagination)
 */

// Example: error shape (consistent)
// Never: { message: "bad" } sometimes and { error: "bad" } other times.

// ✅ Recommended response shapes
// Success:
// 200 { data: {...} }
// 201 { data: {...} }
//
// Error:
// 4xx/5xx { error: { code, message, details? }, requestId }

// Idempotency example (conceptual):
// POST /payments
// Headers:
//   Idempotency-Key: 7e74b0f7-3a43-4be8-9b7f-0d7f1c3ef111
//
// Server stores (key -> result) for 24h:
// - first request creates payment and stores response
// - retry returns the same response, no duplicate charge`,
            comparison: {
                junior: `// ❌ Random URL/actions + inconsistent status codes
POST /createNewUser  (returns 200)
POST /deleteUserById (returns 200 even if not found)
GET  /getAllUsers`,
                senior: `// ✅ Stable REST contract
POST   /users          -> 201
GET    /users/:id      -> 200 / 404
PATCH  /users/:id      -> 200 / 404
DELETE /users/:id      -> 204 / 404
GET    /users?cursor=  -> 200 + nextCursor`
            },
            interview: {
                questions: [
                    { q: "PUT vs PATCH — what’s the real difference?", a: "PUT is a full replacement of the resource (client sends the full representation). PATCH is a partial update. In practice, PATCH is preferred for APIs because it avoids overwriting fields unintentionally." },
                    { q: "When would you use 409 vs 422?", a: "409 Conflict is for state conflicts (unique constraints, version conflicts, concurrent edits). 422 Unprocessable Entity is for valid syntax but failed business rules (e.g., email domain not allowed, user cannot transition state)." },
                    { q: "Why cursor pagination is better than offset for large datasets?", a: "Offset becomes slower as offset grows and can duplicate/miss records when new rows are inserted. Cursor pagination uses a stable sort key (id/createdAt) and scales better." }
                ]
            }
        },
        {
            day: 4,
            title: 'Databases: SQL vs NoSQL',
            intro: "ACID transactions vs Flexible Schema. Choose the right tool.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>How to choose SQL vs NoSQL for real products (not blog wars).</li>
  <li>ACID, transactions, and why they matter in payments/order flows.</li>
  <li>Indexes, query shapes, and the #1 scalability killer: <span class="text-yellow-400 font-bold">N+1</span>.</li>
  <li>Practical modeling: 1‑N, N‑N, and “event log” patterns.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) SQL vs NoSQL (Decision Table)</h3>
<div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-2 text-sm">
    <li><span class="text-yellow-400 font-bold">SQL (Postgres)</span>: strong consistency, joins, constraints, transactions, reporting.</li>
    <li><span class="text-yellow-400 font-bold">NoSQL (Mongo)</span>: flexible documents, fast iteration, denormalized reads, schema evolution.</li>
    <li><span class="text-yellow-400 font-bold">Reality</span>: many companies use both (Postgres for core, Redis for cache, Kafka for events, etc.).</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) The Query You Run is the Schema You Need</h3>
<p class="mb-4 text-light-300">
Database design is not about “normalization vs denormalization”. It’s about your access patterns:
What do you read most? What do you write most? What must be consistent?
</p>

<h3 class="text-xl font-bold text-white mb-4">3) Indexes (The Difference Between 20ms and 2s)</h3>
<p class="mb-4 text-light-300">
Indexes speed reads but slow writes. Add indexes for columns used in WHERE, JOIN, ORDER BY.
</p>
            `,
            code: `/**
 * Day 4: SQL vs NoSQL examples
 */

// ✅ Postgres: transactional purchase (ACID)
// BEGIN;
//   INSERT INTO orders(user_id, total) VALUES ($1, $2) RETURNING id;
//   INSERT INTO order_items(order_id, sku, qty, price) VALUES (...);
//   UPDATE inventory SET qty = qty - $1 WHERE sku = $2 AND qty >= $1;
// COMMIT;
// If anything fails → ROLLBACK. No partial state.

// ✅ Mongo: denormalized read model (fast read)
// users collection:
// {
//   _id,
//   email,
//   profile: { ... },
//   lastOrders: [{ id, total, createdAt }] // embedded summary for UI speed
// }`,
            comparison: {
                junior: `// ❌ N+1 query (kills performance)
const users = await db.user.findMany();
for (const u of users) {
  u.posts = await db.post.findMany({ where: { userId: u.id } });
}`,
                senior: `// ✅ One query (join/eager load)
// Postgres: JOIN
// Prisma: include
const users = await db.user.findMany({
  include: { posts: true },
});`
            },
            interview: {
                questions: [
                    { q: "What does ACID mean and where do you need it?", a: "Atomicity, Consistency, Isolation, Durability. You need it in money/order/inventory flows and any place where partial updates cause real-world damage." },
                    { q: "What is an index and what’s the tradeoff?", a: "An index is a data structure (often B-Tree) that speeds lookups/sorts by avoiding full scans. Tradeoff: extra storage and slower writes (index maintenance)." },
                    { q: "Explain the N+1 problem.", a: "You run 1 query to get a list, then N queries to fetch children for each item. Fix with JOINs/eager loading/aggregation or batching (DataLoader pattern)." }
                ]
            }
        },
        {
            day: 5,
            title: 'Authentication (JWT vs Session)',
            intro: "Stateless vs Stateful auth.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Sessions vs JWT: what’s actually “stateful” and why.</li>
  <li>Secure token storage: <span class="text-yellow-400 font-bold">HttpOnly cookies</span>, not localStorage.</li>
  <li>Access token vs refresh token patterns (and rotation).</li>
  <li>Threat model basics: XSS, CSRF, token theft, and logout/invalidation.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Sessions (Stateful)</h3>
<p class="mb-4 text-light-300">
Server stores session data (in memory/Redis/DB). Client holds an opaque session id cookie.
Great for revocation and “log out everywhere”.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) JWT (Stateless-ish)</h3>
<p class="mb-4 text-light-300">
JWT contains claims signed by the server. Server can validate without DB lookups (fast),
but revocation is harder (you need short expiry + refresh flow, or a blacklist).
</p>

<h3 class="text-xl font-bold text-white mb-4">3) Recommended Modern Pattern</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Browser
  │
  ├─ HttpOnly Cookie: refresh_token (long)
  └─ Memory (JS variable): access_token (short) OR HttpOnly cookie (depends)

Server
  - access token expires quickly (5-15 min)
  - refresh token rotates (store hash in DB/Redis)
</pre>
</div>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200 text-sm">
    <span class="text-yellow-400 font-bold">Never store tokens in localStorage</span> if you can avoid it.
    XSS = instant account takeover.
  </p>
</div>
            `,
            code: `/**
 * Day 5: Auth pattern (Access + Refresh with HttpOnly cookie)
 * (conceptual Express-style code)
 */

// Login:
// 1) verify password
// 2) issue short access token
// 3) issue refresh token (store hash server-side for rotation)

// res.cookie('refresh_token', refreshToken, {
//   httpOnly: true,
//   secure: true,
//   sameSite: 'lax',
//   path: '/auth/refresh',
// });
//
// res.json({ accessToken });

// Refresh:
// 1) read refresh_token from HttpOnly cookie
// 2) validate + rotate (invalidate old, store new hash)
// 3) return new accessToken (and new refresh cookie)

// Logout:
// 1) delete refresh token record server-side
// 2) clear cookie`,
            comparison: {
                junior: `// ❌ Insecure token storage
localStorage.setItem('jwt', token); // XSS steals it
// and no refresh rotation, long-lived token`,
                senior: `// ✅ Secure + maintainable
// - Refresh token in HttpOnly cookie
// - Access token short-lived
// - Rotate refresh tokens (store hash server-side)
// - Rate limit /auth endpoints`
            },
            interview: {
                questions: [
                    { q: "Why is localStorage risky for auth tokens?", a: "Because any XSS vulnerability can read localStorage and exfiltrate tokens. HttpOnly cookies are not accessible to JS, reducing the blast radius of XSS." },
                    { q: "How do you invalidate sessions vs JWTs?", a: "Sessions are easy: delete the session server-side (Redis/DB). JWTs are harder: use short expirations + refresh tokens, and optionally maintain a token blacklist or per-user token versioning." },
                    { q: "What is refresh token rotation and why do it?", a: "On each refresh, issue a new refresh token and invalidate the old one. If an old token is reused, you can detect theft and revoke the session." }
                ]
            }
        },
        {
            day: 6,
            title: 'WebSockets & Real-time',
            intro: "Socket.io allows bidirectional communication.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>What a WebSocket is (and what it is not).</li>
  <li>Socket.IO vs native WebSockets: when to use which.</li>
  <li>Rooms, events, acknowledgements, and reconnect strategy.</li>
  <li>Scaling real-time systems: sticky sessions, Redis adapter, and backpressure.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Handshake: HTTP → Upgrade → Persistent Connection</h3>
<p class="mb-4 text-light-300">
WebSockets begin as an HTTP request, then the protocol upgrades to a persistent bi-directional channel.
This is why proxies/load balancers must support <code class="bg-dark-700 px-1 rounded">Upgrade</code> headers.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Client                 Server
  │   GET /socket.io     │
  │  Upgrade: websocket  │
  ├─────────────────────▶│
  │  101 Switching Proto │
  │◀─────────────────────┤
  │  (persistent channel)│
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) “Real-time” Patterns</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Chat</span>: room per conversation.</li>
  <li><span class="text-yellow-400 font-bold">Presence</span>: track online users (be careful with reconnects).</li>
  <li><span class="text-yellow-400 font-bold">Notifications</span>: reliable delivery needs ack + retry.</li>
  <li><span class="text-yellow-400 font-bold">Live dashboards</span>: throttle/aggregate to avoid flooding clients.</li>
</ul>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200 text-sm">
    <span class="text-yellow-400 font-bold">Scalability reality:</span> every connected socket consumes RAM.
    At scale, you also need cross-instance pub/sub (Redis, NATS, Kafka) so messages reach the right server.
  </p>
</div>
            `,
            code: `/**
 * Day 6: Socket.IO mini demo (server-side)
 * Install: npm i express socket.io
 * Run: node realtime-server.js
 */

const express = require('express');
const http = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: true, credentials: true },
});

io.on('connection', (socket) => {
  // join a room (e.g., a chatId)
  socket.on('join', ({ roomId }) => {
    socket.join(roomId);
    socket.emit('system', { message: 'joined ' + roomId });
  });

  // event with acknowledgement (reliability)
  socket.on('chat:send', async ({ roomId, text }, ack) => {
    // validate/sanitize in real app
    io.to(roomId).emit('chat:message', { id: Date.now(), text });
    if (typeof ack === 'function') ack({ ok: true });
  });

  socket.on('disconnect', (reason) => {
    // cleanup presence, etc.
    // console.log('disconnect', socket.id, reason);
  });
});

server.listen(3000, () => console.log('realtime on http://localhost:3000'));`,
            comparison: {
                junior: `// ❌ Polling (wasteful)
setInterval(async () => {
  const res = await fetch('/api/messages');
  render(await res.json());
}, 1000);`,
                senior: `// ✅ Push-based real-time (efficient)
socket.emit('join', { roomId: 'chat:123' });
socket.on('chat:message', render);
socket.emit('chat:send', { roomId: 'chat:123', text: 'hi' }, (ack) => {
  if (!ack.ok) console.error('send failed');
});`
            },
            interview: {
                questions: [
                    { q: "Why do WebSockets complicate horizontal scaling?", a: "Because connections are stateful. Requests/events must reach the same instance that holds the socket, or you need a shared pub/sub layer (e.g., Redis adapter) to broadcast across instances." },
                    { q: "Socket.IO vs native WebSocket — difference?", a: "Socket.IO adds features on top (reconnects, fallbacks, rooms, acks) and is not the same protocol as raw WebSocket. Native WS is lower-level and lighter when you only need the protocol." },
                    { q: "What are sticky sessions and when do you need them?", a: "Load balancer affinity that routes the same client to the same server. Helpful for stateful connections like WebSockets unless you have a shared adapter that removes the requirement." }
                ]
            }
        },
        {
            day: 7,
            title: 'Microservices Architecture',
            intro: "Breaking the monolith into small, independent services.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>When microservices are a good idea (and when they are a disaster).</li>
  <li>Database-per-service + why shared DBs create “distributed monoliths”.</li>
  <li>Sync vs async communication: HTTP/gRPC vs events.</li>
  <li>Operational realities: observability, retries, idempotency, and versioning.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Core Rule: Own Your Data</h3>
<p class="mb-4 text-light-300">
If two services share one database schema, you have tight coupling. One migration can break multiple services.
Microservices work when each service owns its persistence and exposes a stable API/event contract.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
<pre>
           (sync) HTTP/gRPC
[ API Gateway ] ───────────────▶ [ User Service ] ──▶ UserDB
      │
      ├─────────────────────────▶ [ Order Service ] ─▶ OrderDB
      │
      └────── (async) events ───▶ [ Billing Service ] ▶ BillingDB
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Communication Patterns</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Synchronous</span>: request/response (easy, but chains can cascade failures).</li>
  <li><span class="text-yellow-400 font-bold">Asynchronous</span>: event-driven (more resilient, but eventual consistency).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3) Idempotency + Retries (Production Mandatory)</h3>
<p class="mb-4 text-light-300">
In distributed systems, retries happen (timeouts, network blips). Handlers must be idempotent, and events should have unique IDs.
</p>
            `,
            code: `/**
 * Day 7: Event-driven integration (conceptual)
 * Pattern: Outbox table + publisher for reliable events
 */

// Order Service (writes order + outbox in same DB transaction)
// BEGIN;
//   INSERT INTO orders ...
//   INSERT INTO outbox (event_id, type, payload_json) VALUES (...)
// COMMIT;
//
// Publisher loop reads outbox rows and publishes to broker (Kafka/NATS/RabbitMQ),
// then marks them as published.

// Consumer (Billing Service):
// onMessage(event) {
//   if (alreadyProcessed(event.event_id)) return; // idempotency
//   chargeCustomer(...)
//   markProcessed(event.event_id)
// }`,
            comparison: {
                junior: `// ❌ Distributed Monolith
// Services share the same Database
// If one schema changes, everything breaks`,
                senior: `// ✅ Service boundaries (real microservices)
// - Database per service
// - API contracts or event contracts
// - Outbox + idempotency
// - Observability (trace IDs) + SLOs`
            },
            interview: {
                questions: [
                    { q: "What is a distributed monolith?", a: "Multiple deployable services that are still tightly coupled (shared DB/schema, synchronous chains everywhere). You get microservice complexity without the benefits." },
                    { q: "What is eventual consistency and where is it acceptable?", a: "State converges over time (not immediately). It’s acceptable for analytics, emails/notifications, some inventory views—usually not for money transfer invariants." },
                    { q: "What is the Outbox pattern?", a: "A way to reliably publish events by writing domain changes + an outbox event record in the same DB transaction, then publishing from outbox to the message broker." }
                ]
            }
        },
        {
            day: 8,
            title: 'Docker & Containerization',
            intro: "Package your code with its environment.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>What a container actually is (and what it isn’t).</li>
  <li>How to write a production Dockerfile (small, secure, cache-friendly).</li>
  <li>docker-compose for local dev parity.</li>
  <li>Common production issues: env vars, ports, health checks, and logging.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Key Idea</h3>
<p class="mb-4 text-light-300">
Docker packages your app + its dependencies into an image. The image runs the same on your laptop, CI, and production.
This eliminates “works on my machine” at deployment time.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Multi‑Stage Builds (Smaller + Safer)</h3>
<p class="mb-4 text-light-300">
Use one stage to build, another to run. Final image contains only what’s needed to execute.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Stage 1 (deps/build)                 Stage 2 (runtime)
┌───────────────────────┐           ┌───────────────────────┐
│ node:xx + dev deps    │  ─────▶   │ node:xx-slim          │
│ install, build        │           │ copy dist + prod deps │
└───────────────────────┘           └───────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Cache Like a Senior</h3>
<p class="mb-4 text-light-300">
Docker caching is layer-based. Copy dependency manifests first (<code class="bg-dark-700 px-1 rounded">package.json</code>, lockfile),
install, then copy the rest. This makes rebuilds fast.
</p>

<h3 class="text-xl font-bold text-white mb-4">4) Security Basics</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Run as <span class="text-yellow-400 font-bold">non-root</span> where possible.</li>
  <li>Prefer <span class="text-yellow-400 font-bold">slim</span> base images for smaller attack surface.</li>
  <li>Don’t bake secrets into images. Use env vars / secret managers.</li>
  <li>Add a health endpoint and (optionally) a container <span class="text-yellow-400 font-bold">HEALTHCHECK</span>.</li>
</ul>
            `,
            code: `# Day 8: Production-friendly Dockerfile (multi-stage)
# NOTE: adjust build/start commands to your project.

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# If you have TypeScript:
# RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy only what's needed
COPY --from=builder /app .
USER app

EXPOSE 3000
CMD ["node", "index.js"]

# .dockerignore (recommended)
# node_modules
# .git
# .env
# dist

# docker-compose.yml (local parity example)
# services:
#   api:
#     build: .
#     ports: ["3000:3000"]
#     environment:
#       - DATABASE_URL=postgres://postgres:postgres@postgres:5432/app
#   postgres:
#     image: postgres:16
#     environment:
#       POSTGRES_PASSWORD=postgres
#       POSTGRES_DB=app
#     ports: ["5432:5432"]`,
            comparison: {
                junior: `// ❌ “Ship from laptop”
// - SSH into server
// - git pull
// - npm install
// - pm2 restart
// - hope nothing breaks`,
                senior: `// ✅ Image-based deploy
// - Build once (CI): Docker image
// - Promote same artifact: dev → staging → prod
// - Rollback = deploy previous image tag`
            },
            interview: {
                questions: [
                    { q: "Container vs VM?", a: "Containers share the host OS kernel (lightweight, fast start). VMs run a full OS (heavier, stronger isolation). Containers are great for packaging + deployment; VMs are still common under the hood." },
                    { q: "Why use multi-stage Docker builds?", a: "To keep the final image small and secure by excluding build tools/dev dependencies. It also improves caching and reduces attack surface." },
                    { q: "What should go into .dockerignore and why?", a: "Anything that should not be in the build context (node_modules, .git, local logs, .env). Smaller context = faster builds and fewer accidental leaks." }
                ]
            }
        },
        {
            day: 9,
            title: 'CI/CD Pipelines',
            intro: "Automate testing and deployment.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>How CI/CD prevents “hero deployments”.</li>
  <li>Pipeline stages: lint → test → build → security scan → deploy.</li>
  <li>Blue/Green & canary deployments (risk reduction).</li>
  <li>Secrets in CI and environment promotion (dev → staging → prod).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Pipeline is the Product</h3>
<p class="mb-4 text-light-300">
If your pipeline is weak, production reliability is weak. Mature teams treat CI/CD as a first-class system.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) A Practical CI/CD Flow</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
<pre>
Commit / PR
  │
  ├─ Lint + Typecheck
  ├─ Unit tests
  ├─ Build (artifact / Docker image)
  ├─ Security scan (deps / image)
  └─ Deploy (staging) → approval → deploy (prod)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Promotion > Rebuild</h3>
<p class="mb-6 text-light-300">
Senior teams build once and promote the same artifact. If you rebuild for prod, you’re deploying something untested.
</p>
            `,
            code: `# Day 9: GitHub Actions (example)
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
  push:
    branches: [ "main" ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint --if-present
      - run: npm test --if-present

  build_docker:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t myapp:\${{ github.sha }} .
      # push to registry here (GHCR/ECR/DockerHub) in real pipeline`,
            comparison: {
                junior: `// ❌ Deploying from Local
// "Hey, I'm deploying, don't touch dev!"
// *Uploads uncommitted code*`,
                senior: `// ✅ Automated pipeline
// PR -> tests + build
// main -> deploy staging
// prod deploy uses the same tested artifact`
            },
            interview: {
                questions: [
                    { q: "What is Blue/Green Deployment?", a: "Two identical environments. Deploy to Green, validate, then switch traffic from Blue to Green instantly. Rollback = switch back." },
                    { q: "What’s the difference between CI and CD?", a: "CI validates changes automatically (tests/build). CD automates delivery/deployment to environments with gates/approvals as needed." },
                    { q: "Why 'build once, promote many'?", a: "It ensures production runs the exact artifact that passed tests in CI. Rebuilding in prod can introduce untested differences (dependencies, build flags, etc.)." }
                ]
            }
        },
        {
            day: 10,
            title: 'GraphQL',
            intro: "Ask for exactly what you need.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>GraphQL’s value: typed schema + client-driven queries.</li>
  <li>Resolvers, context, auth, and error handling.</li>
  <li>N+1 problem and how DataLoader batching fixes it.</li>
  <li>When GraphQL is a great fit (and when REST is simpler).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) GraphQL = Schema as a Contract</h3>
<p class="mb-4 text-light-300">
REST is a set of endpoints. GraphQL is a single endpoint with a typed schema that clients query.
It shines when many clients (web/mobile) need different shapes of the same data.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Resolvers + Context</h3>
<p class="mb-4 text-light-300">
Resolvers are functions that fetch data for schema fields. <code class="bg-dark-700 px-1 rounded">context</code> carries auth/session,
DB clients, and request-scoped utilities (like DataLoader).
</p>

<h3 class="text-xl font-bold text-white mb-4">3) The N+1 Trap (and the Fix)</h3>
<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200 text-sm">
    If your resolver does a DB call per item in a list, performance collapses.
    Fix it with batching/caching (DataLoader) or joins/aggregation.
  </p>
</div>
            `,
            code: `/**
 * Day 10: Minimal GraphQL server (Apollo) + DataLoader idea
 * Install: npm i @apollo/server graphql dataloader
 */

const { ApolloServer } = require('@apollo/server');
const DataLoader = require('dataloader');

const typeDefs = \`
  type User { id: ID!, name: String! }
  type Post { id: ID!, title: String!, authorId: ID! }
  type Query {
    user(id: ID!): User
    postsByAuthor(authorId: ID!): [Post!]!
  }
\`;

// pretend DB
const db = {
  users: [{ id: '1', name: 'Ada' }],
  posts: [
    { id: 'p1', title: 'Hello', authorId: '1' },
    { id: 'p2', title: 'World', authorId: '1' },
  ],
};

const resolvers = {
  Query: {
    user: (_, { id }, ctx) => ctx.loaders.userById.load(id),
    postsByAuthor: (_, { authorId }) => db.posts.filter((p) => p.authorId === authorId),
  },
};

function createLoaders() {
  return {
    userById: new DataLoader(async (ids) => {
      // batch fetch in one go (simulate)
      const map = new Map(db.users.map((u) => [u.id, u]));
      return ids.map((id) => map.get(String(id)) || null);
    }),
  };
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// In a real HTTP integration, you'd create context per request:
// context: async ({ req }) => ({ user: req.user, loaders: createLoaders() })`,
            comparison: {
                junior: `// ❌ Over-fetching
GET /api/users/1
// Returns object with 50 fields
// We only needed the name`,
                senior: `// ✅ Contract + flexible queries
# Client asks only what it needs:
query { user(id: "1") { name } }

# But you must still design resolvers to avoid N+1.`
            },
            interview: {
                questions: [
                    { q: "What is the N+1 problem in GraphQL?", a: "When resolvers run one query per item (N) after an initial list query (1). Fix with batching (DataLoader), joins/aggregation, or preloading in parent resolvers." },
                    { q: "What belongs in GraphQL context?", a: "Request-scoped data like the authenticated user/session, DB clients, requestId/logger, and DataLoaders. Avoid global mutable state." },
                    { q: "When would you choose REST over GraphQL?", a: "Simple CRUD with stable shapes, caching via HTTP/CDNs, and when you want lower operational complexity. GraphQL adds power but also schema/resolver maintenance and performance pitfalls." }
                ]
            }
        },
        {
            day: 11,
            title: 'Serverless Functions (Lambda)',
            intro: "Pay only for compute time.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>What “serverless” actually means (and what you still manage).</li>
  <li>Cold starts, concurrency, timeouts, and cost model.</li>
  <li>Best practice architecture: API Gateway → Lambda → DB.</li>
  <li>Observability: logs, metrics, traces, correlation IDs.</li>
  <li>How to keep serverless <span class="text-yellow-400 font-bold">safe</span>: least privilege IAM + input validation.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Serverless = “No Servers to Manage” (Not “No Ops”)</h3>
<p class="mb-4 text-light-300">
With serverless you don’t patch VMs or run autoscaling groups. But you still manage:
<span class="text-yellow-400 font-bold">architecture, performance, security, observability, and cost</span>.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) The Cost Model (Why It’s Great for Spiky Traffic)</h3>
<div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-2 text-sm">
    <li><span class="text-yellow-400 font-bold">Pay per request</span> + compute time.</li>
    <li>When idle: cost is near zero.</li>
    <li>At steady high traffic: containers/servers can be cheaper.</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Cold Starts (The Latency Spike)</h3>
<p class="mb-4 text-light-300">
If your function is idle, the platform may need to start a new runtime (“cold start”).
Keep bundles small, avoid heavy initialization, and reuse connections when possible.
</p>

<h3 class="text-xl font-bold text-white mb-4">4) The #1 Production Rule: Make Handlers Stateless</h3>
<p class="mb-6 text-light-300">
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
                    { q: "What is a cold start and how do you reduce it?", a: "A latency spike when a new runtime/container must start. Reduce by keeping bundles small, minimizing init work, using provisioned concurrency (if available), and avoiding heavy dependencies." },
                    { q: "Why must serverless handlers be stateless?", a: "Because instances can be recycled anytime and can run concurrently. In-memory state is not durable and leads to correctness bugs." },
                    { q: "When is serverless a bad fit?", a: "Sustained high-throughput workloads where containers are cheaper, ultra-low-latency systems sensitive to cold starts, and long-running jobs that exceed timeout limits (unless you use step functions/queues)." }
                ]
            }
        },
        {
            day: 12,
            title: 'Caching Strategies (Redis)',
            intro: "The fastest query is the one you don't make.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>When caching helps (and when it hurts).</li>
  <li>Cache-aside pattern (the default) and its pitfalls.</li>
  <li>Invalidation strategies: TTL, versioning, write-through, and event-based invalidation.</li>
  <li>Stampede protection and “thundering herd”.</li>
  <li>How to choose cache keys and TTLs like a senior.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Cache-Aside (Most Common)</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Request → check cache
   │
   ├─ hit  → return cached value
   └─ miss → query DB → set cache (TTL) → return
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Cache Invalidation: The Hard Part</h3>
<p class="mb-4 text-light-300">
Three classic strategies:
<span class="text-yellow-400 font-bold">TTL</span>, <span class="text-yellow-400 font-bold">explicit delete</span> on writes,
or <span class="text-yellow-400 font-bold">versioned keys</span>.
</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200 text-sm">
    <span class="text-yellow-400 font-bold">Stampede warning:</span> when cache expires, many requests hit DB at once.
    Fix with locks (single flight) or probabilistic early refresh.
  </p>
</div>
            `,
            code: `/**
 * Day 12: Cache-aside + stampede protection (single-flight)
 * Requires: npm i redis
 */

// Pseudocode-ish: adapt to your redis client
async function getUserProfile({ redis, db, userId }) {
  const key = 'user:profile:' + userId;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  // naive approach: every concurrent request now hits DB (stampede)
  // fix: use a short lock
  const lockKey = key + ':lock';
  const lockAcquired = await redis.set(lockKey, '1', { NX: true, PX: 3000 });

  if (!lockAcquired) {
    // Someone else is rebuilding cache. Wait briefly and retry.
    await new Promise((r) => setTimeout(r, 80));
    const retry = await redis.get(key);
    if (retry) return JSON.parse(retry);
    // fall through to DB if still missing
  }

  const user = await db.user.findById(userId);
  await redis.set(key, JSON.stringify(user), { EX: 60 }); // TTL = 60 seconds
  await redis.del(lockKey);
  return user;
}`,
            comparison: {
                junior: `// ❌ Hitting DB Every Request
// /getProfile -> SQL Query
// /getProfile -> SQL Query
// /getProfile -> SQL Query`,
                senior: `// ✅ Redis Cache
// /getProfile -> Cache Hit (1ms)
// /getProfile -> Cache Hit (1ms)
// DB sleeps`
            },
            interview: {
                questions: [
                    { q: "What is cache-aside and why is it popular?", a: "App reads from cache first; on miss it reads from DB and writes to cache. It’s simple, works with any DB, and keeps cache optional (cache failures degrade gracefully)." },
                    { q: "What is a cache stampede and how do you prevent it?", a: "Many requests miss simultaneously (often after TTL expires) causing DB overload. Prevent with locking/single-flight, request coalescing, early refresh, or jittered TTLs." },
                    { q: "How do you choose a cache key and TTL?", a: "Key should reflect identity and version (e.g., user:profile:v2:123). TTL depends on freshness needs and write frequency. Add jitter to avoid synchronized expirations." }
                ]
            }
        },
        {
            day: 13,
            title: 'Load Balancing & NGINX',
            intro: "Distribute traffic across multiple servers.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Load balancer vs reverse proxy (and where NGINX fits).</li>
  <li>Health checks, timeouts, and retries (the “stability knobs”).</li>
  <li>Sticky sessions (when needed) vs stateless services (ideal).</li>
  <li>Rate limiting and basic edge security.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) NGINX as Reverse Proxy</h3>
<p class="mb-4 text-light-300">
NGINX can terminate TLS, compress responses, cache, rate limit, and distribute traffic across upstream servers.
It becomes the “edge” in front of your Node instances.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
<pre>
Internet → NGINX (TLS, rate limit) → Node A
                            └────→ Node B
                            └────→ Node C
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Timeouts (Prevent Hanging Requests)</h3>
<p class="mb-6 text-light-300">
In production, “infinite” timeouts create resource leaks. Always set sensible timeouts at the proxy and the app.
</p>
            `,
            code: `# Day 13: NGINX reverse proxy + load balancing (example)

upstream app_servers {
  least_conn;
  server 10.0.0.1:3000 max_fails=3 fail_timeout=10s;
  server 10.0.0.2:3000 max_fails=3 fail_timeout=10s;
}

server {
  listen 80;
  server_name example.com;

  # Basic rate limit (protect your app)
  limit_req_zone $binary_remote_addr zone=perip:10m rate=10r/s;

  location / {
    limit_req zone=perip burst=20 nodelay;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Request-Id $request_id;

    proxy_connect_timeout 3s;
    proxy_send_timeout 30s;
    proxy_read_timeout 30s;

    proxy_pass http://app_servers;
  }
}`,
            comparison: {
                junior: `// ❌ Single Point of Failure
// One server crashes
// Website is Down`,
                senior: `// ✅ Load Balancer
// Detects server crash
// Routes traffic to healthy servers`
            },
            interview: {
                questions: [
                    { q: "Round Robin vs Least Connections?", a: "Round robin distributes evenly in order. Least connections is better when requests have variable duration because it sends traffic to the least-busy server." },
                    { q: "Why add timeouts at the reverse proxy?", a: "To prevent hung upstream connections from consuming resources indefinitely. Timeouts protect the system and improve failure behavior under load." },
                    { q: "What headers should a proxy add for apps behind it?", a: "X-Forwarded-For / X-Real-IP for client IP, X-Request-Id for tracing, and Host for correct routing; plus TLS termination implies forwarding scheme (X-Forwarded-Proto)." }
                ]
            }
        },
        {
            day: 14,
            title: 'Security: Hashing & Salting',
            intro: "Protecting user passwords.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Hashing vs encryption (and why passwords must be hashed, not encrypted).</li>
  <li>Salts, work factors, and why slow hashes defeat brute force.</li>
  <li>Modern choices: bcrypt vs scrypt vs argon2.</li>
  <li>Safe auth storage: pepper, timing-safe compares, and upgrade strategy.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Hashing vs Encryption</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6 text-sm">
  <div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl text-light-200">
    <p class="font-bold text-red-300 mb-2">Encryption (reversible)</p>
    <p>If you can decrypt it, attackers can too if keys leak.</p>
  </div>
  <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl text-light-200">
    <p class="font-bold text-green-300 mb-2">Hashing (one-way)</p>
    <p>Store only a derived value. Validate by recomputing and comparing.</p>
  </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Why “Slow” is Good</h3>
<p class="mb-4 text-light-300">
Attackers do billions of hashes per second with GPUs. You want a hashing scheme that is slow and expensive per guess.
</p>
            `,
            code: `/**
 * Day 14: Password hashing (bcrypt) + upgrade strategy
 * Install: npm i bcrypt
 */

const bcrypt = require('bcrypt');

async function hashPassword(password) {
  // cost factor: higher = slower (more secure but more CPU)
  const cost = 12;
  return bcrypt.hash(password, cost);
}

async function verifyPassword(password, storedHash) {
  // bcrypt.compare is timing-safe internally
  return bcrypt.compare(password, storedHash);
}

// Upgrade strategy:
// If user logs in and storedHash has lower cost factor, rehash with higher cost.
async function verifyAndUpgrade(password, storedHash, persistNewHash) {
  const ok = await verifyPassword(password, storedHash);
  if (!ok) return false;

  const currentCost = bcrypt.getRounds(storedHash);
  const targetCost = 12;
  if (currentCost < targetCost) {
    const newHash = await bcrypt.hash(password, targetCost);
    await persistNewHash(newHash);
  }
  return true;
}`,
            comparison: {
                junior: `// ❌ Plain Text / MD5
db.save({ password: "password123" });
// One hack = Everyone exposed`,
                senior: `// ✅ Salted Hash
// Saved as: $2b$10$nOUIs5...
// Even if DB leaks, passwords are safe`
            },
            interview: {
                questions: [
                    { q: "Why use a salt?", a: "To make identical passwords produce different hashes and to defeat precomputed rainbow tables. Salts are stored with the hash and are not secret." },
                    { q: "Why not use SHA-256 for passwords?", a: "Fast hashes are bad for passwords because attackers can brute force quickly. Password hashing needs slow, adaptive algorithms like bcrypt/scrypt/argon2." },
                    { q: "How do you increase password hashing strength over time?", a: "Use an upgrade strategy: store the cost factor; on successful login, if cost is lower than desired, rehash with a higher cost and store the new hash." }
                ]
            }
        },
        {
            day: 15,
            title: 'System Design: Scaling',
            intro: "Vertical vs Horizontal Scaling.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>How to think like a system designer: bottlenecks, constraints, and tradeoffs.</li>
  <li>Vertical vs horizontal scaling, and when each wins.</li>
  <li>Latency budgeting (where time actually goes).</li>
  <li>CAP theorem basics + how real systems choose tradeoffs.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The First Question: What’s the Bottleneck?</h3>
<p class="mb-4 text-light-300">
Scaling is not magic. Identify what’s limiting you:
CPU, memory, DB connections, disk I/O, network bandwidth, or external dependencies.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Vertical vs Horizontal Scaling</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6 text-sm">
  <div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-200">
    <p class="font-bold text-white mb-2">Vertical (Scale Up)</p>
    <ul class="list-disc list-inside space-y-1">
      <li>simpler ops</li>
      <li>fast to execute</li>
      <li>hard upper limit + downtime risk</li>
    </ul>
  </div>
  <div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-200">
    <p class="font-bold text-white mb-2">Horizontal (Scale Out)</p>
    <ul class="list-disc list-inside space-y-1">
      <li>resilience + capacity</li>
      <li>requires stateless services + load balancing</li>
      <li>adds distributed systems complexity</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) A Simple Latency Budget</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Client → Edge (TLS) → App → Cache → DB → App → Client
   30ms     10ms     15ms   1ms   40ms   5ms    30ms
Total ~131ms
</pre>
</div>
            `,
            code: `// Conceptual`,
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
                    { q: "What is CAP theorem in one sentence?", a: "In the presence of a network partition, you must choose between Consistency and Availability; Partition Tolerance is required in distributed systems." },
                    { q: "What’s the first thing you do when an API is slow in production?", a: "Measure. Add tracing/metrics, identify where latency is spent (DB, cache, external calls, CPU). Then fix the dominant bottleneck (index, caching, batching, async IO, etc.)." },
                    { q: "Why do stateless services scale better horizontally?", a: "Any instance can handle any request, so load balancing is simple and failures don’t lose session state (which can live in shared stores like Redis or cookies)." }
                ]
            }
        },
        {
            day: 16,
            title: 'Database Design Patterns (Real-World Modeling)',
            intro: "Schema design is product design. We’ll model for correctness first, then performance.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>How to model <span class="text-yellow-400 font-bold">entities</span> and <span class="text-yellow-400 font-bold">relationships</span> (1‑N, N‑N).</li>
  <li>Normalization vs denormalization (and how to choose).</li>
  <li>Soft deletes, audit trails, and “history tables”.</li>
  <li>Indexing by query shape (not by “guessing”).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Start with Invariants</h3>
<p class="mb-4 text-light-300">
Before tables, define invariants:
<span class="text-yellow-400 font-bold">uniqueness</span>, <span class="text-yellow-400 font-bold">ownership</span>,
and what must be consistent (payments, inventory, permissions).
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Relationship Modeling</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
1-N:   user → posts
N-N:   users ↔ roles (join table user_roles)

Soft delete:
  deleted_at timestamp NULL
Audit:
  created_at, updated_at, created_by, updated_by
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Indexes Follow Queries</h3>
<p class="mb-4 text-light-300">
Add indexes for your most frequent queries (WHERE/JOIN/ORDER). Don’t index everything; it slows writes.
</p>

<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
  <p class="text-blue-200 text-sm">
    <span class="text-yellow-400 font-bold">Rule of thumb:</span> write down your top 5 queries, then design indexes.
  </p>
</div>
            `,
            code: `/**
 * Day 16: Schema snippet (Postgres SQL)
 * - Unique email
 * - Many-to-many user_roles
 * - Soft deletes
 */

-- users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ NULL
);

-- roles
CREATE TABLE roles (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- join table (N-N)
CREATE TABLE user_roles (
  user_id UUID NOT NULL REFERENCES users(id),
  role_id UUID NOT NULL REFERENCES roles(id),
  PRIMARY KEY (user_id, role_id)
);

-- index for common query: active users by created_at
CREATE INDEX users_active_created_at_idx ON users(created_at)
WHERE deleted_at IS NULL;`,
            comparison: {
                junior: `// ❌ “Just store JSON” everywhere
// user = { id, email, roles: ['admin','user'], ... }
// No constraints, no joins, data drifts over time.`,
                senior: `// ✅ Model invariants + evolution
// - unique constraints (email)
// - join tables for N-N
// - soft delete & audit columns
// - indexes aligned to query patterns`
            },
            interview: {
                questions: [
                    { q: "When would you use soft delete?", a: "When you need recovery/auditing or to preserve referential integrity for historical records. You must ensure queries filter deleted rows (e.g., deleted_at IS NULL) and add partial indexes for performance." },
                    { q: "What’s the downside of indexing everything?", a: "Indexes speed reads but slow writes and increase storage. Too many indexes make inserts/updates expensive and can harm overall performance." },
                    { q: "How do you model many-to-many relationships in SQL?", a: "With a join table containing the two foreign keys and a composite primary key (or unique constraint) to prevent duplicates." }
                ]
            }
        },
        {
            day: 17,
            title: 'Migrations & ORMs (Prisma-Style Discipline)',
            intro: "Your database is code. Migrations are the source of truth, not manual clicks.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Why migrations are required for teams and CI/CD.</li>
  <li>How to ship schema changes safely (expand → migrate → contract).</li>
  <li>ORM vs SQL: where ORMs help and where they hide performance.</li>
  <li>Migration gotchas: long locks, backfills, and large tables.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Expand → Migrate → Contract (Zero Downtime)</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
<pre>
Phase 1 (expand): add nullable column / new table
Phase 2 (migrate): backfill data + dual-write if needed
Phase 3 (contract): enforce NOT NULL / drop old column
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) ORMs: Use Them, But Don’t Be Blind</h3>
<p class="mb-6 text-light-300">
ORMs speed development and enforce consistency. But you must still understand SQL, indexes, and query plans.
</p>
            `,
            code: `/**
 * Day 17: Migration-safe pattern (Prisma-style)
 * Commands (example):
 *   npx prisma migrate dev -n add_user_status
 *   npx prisma migrate deploy   # in CI/prod
 */

// Example: adding a new field safely
// 1) Expand: add nullable column "status"
// 2) Backfill: update existing rows
// 3) Contract: enforce NOT NULL + default (in a later migration)

// Backfill SQL example:
// UPDATE users SET status = 'active' WHERE status IS NULL;`,
            comparison: {
                junior: `// ❌ Manual DB changes
// - click in DB UI
// - no migration history
// - staging/prod drift forever`,
                senior: `// ✅ Migration discipline
// - migrations in Git
// - apply in CI (migrate deploy)
// - expand/migrate/contract for safe releases`
            },
            interview: {
                questions: [
                    { q: "Why are migrations important in a team?", a: "They provide a versioned history of schema changes, enable reproducible environments, and prevent drift between developers, CI, staging, and production." },
                    { q: "What is expand/contract and why do it?", a: "A safe rollout technique for schema changes that avoids breaking older app versions during deploys. You introduce additive changes first, migrate data, then remove/lock down old structures later." },
                    { q: "What’s a dangerous migration on large tables?", a: "Anything that locks the table for a long time (e.g., adding NOT NULL without a default/backfill strategy, rebuilding big indexes). It can block writes and cause outages." }
                ]
            }
        },
        {
            day: 18,
            title: 'Transactions, Isolation Levels & Concurrency',
            intro: "Most production bugs are race conditions. Transactions are your correctness tool.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>What a transaction guarantees (ACID) and what it doesn’t.</li>
  <li>Isolation levels: Read Committed vs Repeatable Read vs Serializable.</li>
  <li>Optimistic vs pessimistic concurrency control.</li>
  <li>Idempotency keys for safe retries (payments/orders).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Classic Race Condition</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Two requests buy the last item at the same time:
  req A reads qty = 1
  req B reads qty = 1
  req A writes qty = 0
  req B writes qty = 0  (oops, oversold)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Fix Options</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Atomic update</span>: update with a condition (qty &gt;= 1).</li>
  <li><span class="text-yellow-400 font-bold">Row locks</span>: SELECT ... FOR UPDATE (pessimistic).</li>
  <li><span class="text-yellow-400 font-bold">Version column</span>: optimistic concurrency (CAS).</li>
</ul>
            `,
            code: `/**
 * Day 18: Atomic update (Postgres) to avoid overselling
 */

-- inventory(sku, qty)
-- Attempt to decrement qty only if enough stock
UPDATE inventory
SET qty = qty - 1
WHERE sku = 'SKU123' AND qty >= 1
RETURNING qty;

-- If 0 rows returned => out of stock (no race bug).`,
            comparison: {
                junior: `// ❌ Read then write (race condition)
const inv = await db.inventory.findBySku('SKU123');
if (inv.qty < 1) throw new Error('out of stock');
await db.inventory.update('SKU123', { qty: inv.qty - 1 });`,
                senior: `// ✅ One atomic statement (safe)
// UPDATE ... WHERE qty >= 1 RETURNING ...
// or transaction + SELECT FOR UPDATE for complex flows`
            },
            interview: {
                questions: [
                    { q: "What does an isolation level control?", a: "It controls what each transaction can see of other transactions' changes, preventing anomalies like dirty reads, non-repeatable reads, and phantom reads depending on the level." },
                    { q: "Optimistic vs pessimistic locking?", a: "Optimistic assumes low contention and uses version checks (fail on conflict). Pessimistic locks rows to prevent concurrent modifications (safe under contention but can reduce throughput)." },
                    { q: "Why do payments APIs need idempotency keys?", a: "Because clients retry due to timeouts. Idempotency keys ensure retried requests return the same result without double-charging or creating duplicates." }
                ]
            }
        },
        {
            day: 19,
            title: 'Authorization: RBAC, ABAC & Policy Design',
            intro: "Authentication says who you are. Authorization says what you can do — and it’s where most apps get hacked.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>RBAC (roles) vs ABAC (attributes) vs ACLs (per-resource permissions).</li>
  <li>How to avoid the #1 bug: <span class="text-red-300 font-bold">IDOR</span> (Insecure Direct Object Reference).</li>
  <li>Where to enforce authz: route middleware + service layer.</li>
  <li>How to model permissions and keep them maintainable.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The IDOR Problem</h3>
<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200 text-sm">
    If a user can access <code class="bg-dark-900 px-1 rounded">/orders/123</code> just by guessing the ID,
    and you don’t check ownership, you have an IDOR vulnerability.
  </p>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) RBAC vs ABAC</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">RBAC</span>: roles like admin/support/user (simple, coarse).</li>
  <li><span class="text-yellow-400 font-bold">ABAC</span>: rules based on attributes (ownerId match, orgId, region, plan).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3) Enforcement Strategy</h3>
<p class="mb-6 text-light-300">
Enforce authorization in the service layer (business logic) even if you also have route middleware.
This prevents bypass via reused services or internal calls.
</p>
            `,
            code: `/**
 * Day 19: Authorization guard (service-layer)
 * Pattern: fetch resource, check policy, then act.
 */

function canReadOrder({ actor, order }) {
  if (!actor) return false;
  if (actor.roles && actor.roles.includes('admin')) return true;
  return order.userId === actor.id; // ABAC: ownership
}

async function getOrderService({ db, actor, orderId }) {
  const order = await db.order.findById(orderId);
  if (!order) {
    const err = new Error('not found');
    err.status = 404;
    throw err;
  }
  if (!canReadOrder({ actor, order })) {
    const err = new Error('forbidden');
    err.status = 403;
    throw err;
  }
  return order;
}`,
            comparison: {
                junior: `// ❌ Only checks "is logged in"
app.get('/orders/:id', auth, async (req, res) => {
  const order = await db.order.findById(req.params.id);
  res.json(order); // IDOR risk
});`,
                senior: `// ✅ Checks ownership/policy (authz)
app.get('/orders/:id', auth, asyncHandler(async (req, res) => {
  const order = await getOrderService({ db, actor: req.user, orderId: req.params.id });
  res.json({ data: order });
}));`
            },
            interview: {
                questions: [
                    { q: "RBAC vs ABAC?", a: "RBAC grants permissions based on role membership. ABAC grants based on attributes (ownerId, orgId, resource state). Many real systems combine both." },
                    { q: "What is IDOR and how do you prevent it?", a: "Insecure Direct Object Reference: accessing resources by guessing IDs without authorization checks. Prevent by enforcing ownership/permission checks server-side for every resource access." },
                    { q: "Where should authorization logic live?", a: "In the service/domain layer so it can’t be bypassed, with optional route-level middleware for early rejection. Keep policies centralized and testable." }
                ]
            }
        },
        {
            day: 20,
            title: 'OAuth 2.0 + OpenID Connect (SSO in Real Apps)',
            intro: "Most real products use Google/GitHub login. Today you’ll understand the flow, tokens, and security pitfalls.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>OAuth 2.0 roles: client, resource owner, authorization server, resource server.</li>
  <li>Authorization Code flow (with PKCE) — the modern default.</li>
  <li>OIDC adds identity: ID token (who) vs access token (what).</li>
  <li>Security pitfalls: redirect URI attacks, token storage, and CSRF state parameter.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Flow (High Level)</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
App (client) → redirects user to Provider (Google/GitHub)
Provider → redirects back to your callback with "code"
App → exchanges code for tokens (server-to-server)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) State + PKCE (Non-Negotiable)</h3>
<p class="mb-6 text-light-300">
Use <span class="text-yellow-400 font-bold">state</span> to defend against CSRF and <span class="text-yellow-400 font-bold">PKCE</span> to defend against code interception.
</p>
            `,
            code: `/**
 * Day 20: OAuth callback (conceptual)
 * Key ideas:
 * - validate "state"
 * - exchange "code" on backend
 * - create local session / user record
 */

async function oauthCallbackController(req, res) {
  const code = req.query.code;
  const state = req.query.state;

  // 1) Validate state (stored in cookie/session when login started)
  if (!state || state !== req.cookies.oauth_state) {
    return res.status(400).json({ error: 'OAUTH_STATE_MISMATCH' });
  }

  // 2) Exchange code for tokens (server-to-server)
  // const tokenRes = await fetch(providerTokenEndpoint, { ... })
  // const { access_token, id_token } = await tokenRes.json()

  // 3) Validate id_token (OIDC) signature + claims (issuer, audience, exp)
  // const profile = verifyIdToken(id_token)

  // 4) Upsert user in your DB, then create your own session/refresh cookie
  // res.cookie('refresh_token', ... httpOnly ...)
  return res.redirect('/app');
}`,
            comparison: {
                junior: `// ❌ Insecure OAuth
// - no state validation
// - stores provider access token in localStorage
// - trusts any redirect URL`,
                senior: `// ✅ Secure OAuth/OIDC
// - Authorization Code + PKCE
// - validate state + redirect URIs
// - validate id_token claims/signature
// - store sessions/refresh in HttpOnly cookies`
            },
            interview: {
                questions: [
                    { q: "OAuth vs OpenID Connect?", a: "OAuth is authorization (access to resources). OIDC is authentication on top of OAuth (identity) via the ID token and standardized userinfo." },
                    { q: "Why is the 'state' parameter important?", a: "It prevents CSRF and login injection by binding the callback to the original login request initiated by the user." },
                    { q: "What is PKCE and why do we use it?", a: "Proof Key for Code Exchange: binds the authorization code to a client-generated secret (code verifier). It prevents interception of the auth code from being exchanged by an attacker." }
                ]
            }
        },
        {
            day: 21,
            title: 'API Security Fundamentals (CORS, CSRF, XSS, SSRF)',
            intro: "Most breaches are not fancy crypto—they’re broken defaults. Today you’ll learn a practical security checklist for Node APIs.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>CORS vs CSRF vs XSS (and how people confuse them).</li>
  <li>How to harden Express APIs with Helmet, rate limiting, and validation.</li>
  <li>SSRF: the “backend makes requests” vulnerability.</li>
  <li>Secure cookies: httpOnly, secure, sameSite, and why defaults matter.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) CORS (Browser Policy, Not a Server Security Boundary)</h3>
<p class="mb-4 text-light-300">
CORS controls which <span class="text-yellow-400 font-bold">browsers</span> can read responses from your API.
It does not stop curl, Postman, or backend attackers. Treat it as a browser interoperability policy.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) CSRF (When Cookies Authenticate)</h3>
<p class="mb-4 text-light-300">
If your auth uses cookies, the browser automatically attaches them. A malicious site can trigger requests.
Use <span class="text-yellow-400 font-bold">sameSite</span>, CSRF tokens, and strict CORS for state-changing endpoints.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) XSS (Steal Tokens, Modify UI, Exfiltrate Data)</h3>
<p class="mb-4 text-light-300">
XSS is mostly a frontend issue, but backend APIs must:
<span class="text-yellow-400 font-bold">sanitize user content</span>, validate input, and avoid reflecting untrusted data.
</p>

<h3 class="text-xl font-bold text-white mb-4">4) SSRF (Server Requests as an Attack Primitive)</h3>
<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200 text-sm">
    If your API fetches a user-provided URL, attackers can target internal services/metadata endpoints.
    SSRF is a common path to cloud credential theft.
  </p>
</div>
            `,
            code: `/**
 * Day 21: Express security baseline
 * Install: npm i helmet cors express-rate-limit
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json({ limit: '1mb' }));

// Security headers
app.use(helmet());

// CORS: allow only your UI origin in production (example)
app.use(cors({
  origin: ['https://app.example.com'],
  credentials: true,
}));

// Rate limiting: protect login / OTP / password reset endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/auth', authLimiter);

app.get('/health', (req, res) => res.json({ ok: true }));

// SSRF tip (concept): never fetch arbitrary URLs.
// If you must, allowlist hostnames and block private IP ranges.

app.listen(3000);`,
            comparison: {
                junior: `// ❌ “We have CORS so we are secure”
// - allow origin: '*'
// - store tokens in localStorage
// - no rate limiting
// - no input limits`,
                senior: `// ✅ Practical security baseline
// - Helmet + strict CORS
// - SameSite cookies for session auth
// - rate limit auth endpoints
// - request size limits + validation
// - SSRF allowlists for outbound fetch`
            },
            interview: {
                questions: [
                    { q: "CORS vs CSRF — explain the difference.", a: "CORS is a browser policy controlling cross-origin reads. CSRF is an attack where a browser sends authenticated requests using cookies without the user's intent. CSRF is mitigated with SameSite cookies, CSRF tokens, and strict origin checks." },
                    { q: "What is SSRF and why is it dangerous?", a: "Server-Side Request Forgery: attacker tricks your server into fetching internal URLs or cloud metadata endpoints. It can expose secrets, internal services, and lead to privilege escalation." },
                    { q: "Why rate limit authentication endpoints?", a: "To slow brute force, credential stuffing, OTP guessing, and to protect downstream systems like email/SMS providers and your DB." }
                ]
            }
        },
        {
            day: 22,
            title: 'Production Error Handling, Logging & Observability',
            intro: "If you can’t debug production in minutes, you don’t own the system. Today you’ll build real observability habits.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Structured logging vs console logs.</li>
  <li>Correlation IDs (requestId) and log redaction.</li>
  <li>Metrics basics (latency, error rate, saturation) and SLO mindset.</li>
  <li>Tracing: why distributed systems need spans.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Logs: Make Them Queryable</h3>
<p class="mb-4 text-light-300">
Logs should be structured JSON so you can filter by <code class="bg-dark-700 px-1 rounded">requestId</code>,
<code class="bg-dark-700 px-1 rounded">userId</code>, <code class="bg-dark-700 px-1 rounded">route</code>,
and <code class="bg-dark-700 px-1 rounded">errorCode</code>.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) The Golden Signals</h3>
<div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-1 text-sm">
    <li><span class="text-yellow-400 font-bold">Latency</span></li>
    <li><span class="text-yellow-400 font-bold">Traffic</span></li>
    <li><span class="text-yellow-400 font-bold">Errors</span></li>
    <li><span class="text-yellow-400 font-bold">Saturation</span> (CPU, memory, DB pool, queue depth)</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Errors Must Have Codes</h3>
<p class="mb-6 text-light-300">
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
                    { q: "What are the golden signals?", a: "Latency, traffic, errors, saturation. They give a compact view of system health and user impact." },
                    { q: "Why structured logging?", a: "It makes logs machine-queryable (filter, group, alert). Plain text logs are hard to search reliably and hard to correlate across services." },
                    { q: "What is a correlation/request ID and why use it?", a: "A unique id attached to each request and propagated across services. It lets you trace a single request through logs and spans." }
                ]
            }
        },
        {
            day: 23,
            title: 'Background Jobs & Queues (BullMQ/Redis)',
            intro: "If it doesn’t need to happen in the request, don’t do it in the request. Queues turn latency into throughput.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>When to use queues (emails, reports, video processing, webhooks).</li>
  <li>Retries, backoff, dead-letter queues, and idempotency.</li>
  <li>Job concurrency and rate control.</li>
  <li>Exactly-once is hard; build <span class="text-yellow-400 font-bold">at-least-once</span> + idempotent handlers.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Architecture</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
API (enqueue) → Redis Queue → Worker (process) → DB/Email/S3
                     │
                     └→ retries/backoff → DLQ
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Idempotency (Required)</h3>
<p class="mb-6 text-light-300">
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
                    { q: "Why are background jobs usually at-least-once?", a: "Because crashes/timeouts happen. Systems prefer re-processing over losing work. Therefore handlers must be idempotent." },
                    { q: "What is a DLQ and why use it?", a: "Dead-letter queue stores jobs that failed after retries. It prevents infinite retry loops and enables manual inspection/replay." },
                    { q: "What is exponential backoff?", a: "A retry strategy where delays grow after each failure (1s, 2s, 4s...). It reduces load on downstream dependencies during outages." }
                ]
            }
        },
        {
            day: 24,
            title: 'File Uploads (Streaming + S3 Presigned URLs)',
            intro: "File uploads are a security and performance minefield. Do them like a senior: stream, validate, and never trust content-type.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Why streaming uploads prevent memory blowups.</li>
  <li>Presigned URLs: client uploads directly to S3 (API stays fast).</li>
  <li>Security basics: size limits, content-type validation, and malware scanning pipeline.</li>
  <li>Public vs private files, and signed download URLs.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Best Pattern: Direct-to-Object-Storage</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
<pre>
Client → (GET presign) → API
Client → (PUT file) → S3
Client → (notify) → API (store metadata)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Security Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Limit size and enforce MIME allowlist (and verify content signatures if needed).</li>
  <li>Store uploads in a private bucket. Serve via signed URLs or CDN with auth.</li>
  <li>Scan in background (queue) for malware before making public.</li>
</ul>
            `,
            code: `/**
 * Day 24: Presigned upload URL idea (AWS SDK v3 - conceptual)
 * Install (if using AWS): npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
 */

// PSEUDOCODE (outline only):
// const s3 = new S3Client({ region: '...' })
// const command = new PutObjectCommand({
//   Bucket: process.env.UPLOAD_BUCKET,
//   Key: 'uploads/' + userId + '/' + fileId,
//   ContentType: mimeType,
// })
// const url = await getSignedUrl(s3, command, { expiresIn: 60 })
// return { uploadUrl: url, key: command.input.Key }`,
            comparison: {
                junior: `// ❌ Upload through API into memory
app.post('/upload', async (req, res) => {
  const buf = await readEntireRequestIntoBuffer(req); // memory risk
  await s3.putObject({ Body: buf });
  res.json({ ok: true });
});`,
                senior: `// ✅ Direct-to-S3 + background scan
// 1) API returns presigned URL
// 2) client uploads directly to storage
// 3) worker scans + marks file safe`
            },
            interview: {
                questions: [
                    { q: "Why prefer streaming uploads?", a: "It avoids loading entire files into memory, reducing OOM risk and improving throughput under concurrent uploads." },
                    { q: "What is a presigned URL and why use it?", a: "A time-limited URL granting permission to upload/download an object. It keeps your API fast and reduces server bandwidth costs." },
                    { q: "Name 3 upload security concerns.", a: "Malware, oversized files (DoS), and content-type spoofing. Mitigate with size limits, allowlists, scanning, and storing privately by default." }
                ]
            }
        },
        {
            day: 25,
            title: 'Resilience Patterns (Timeouts, Retries, Circuit Breakers)',
            intro: "Reliability is built into code paths: timeouts everywhere, retries with backoff, and preventing cascading failures.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Why missing timeouts create outages.</li>
  <li>Retries: when they help vs when they amplify failures.</li>
  <li>Circuit breakers and bulkheads (contain blast radius).</li>
  <li>Backpressure: protect your DB and downstream APIs.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Timeouts Are a Contract</h3>
<p class="mb-4 text-light-300">
Every network call must have a timeout. Without it, stuck connections slowly consume your resources.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Retry Only Idempotent Operations</h3>
<p class="mb-4 text-light-300">
Retrying non-idempotent actions (like charging a card) can cause duplicates. Use idempotency keys.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) Circuit Breaker</h3>
<p class="mb-6 text-light-300">
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
                    { q: "Why are timeouts critical in distributed systems?", a: "Because networks fail in partial ways. Without timeouts, calls can hang indefinitely and exhaust threads/connections/memory, causing cascading failure." },
                    { q: "When can retries be harmful?", a: "During outages, retries can amplify load and make recovery slower (retry storms). Use exponential backoff, jitter, and circuit breakers." },
                    { q: "What is a circuit breaker?", a: "A pattern that stops calling a failing dependency after a threshold, then periodically probes for recovery. It protects your system from cascading failures." }
                ]
            }
        },
        {
            day: 26,
            title: 'Testing Strategy (Unit, Integration, Contract, E2E)',
            intro: "Tests are not a checkbox. They’re how you ship quickly without breaking production.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Unit vs integration vs E2E: what each actually proves.</li>
  <li>How to test APIs: supertest-style, DB in Docker, and deterministic fixtures.</li>
  <li>Contract testing and why it matters across teams/services.</li>
  <li>How to avoid flaky tests (time, randomness, shared state).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Test Pyramid (Practical Version)</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Many:   Unit tests (fast, pure, cheap)
Some:   Integration tests (DB, cache, external mocks)
Few:    E2E tests (browser / full system)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) What to Test in Backend APIs</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Validation</span>: rejects bad input with correct codes.</li>
  <li><span class="text-yellow-400 font-bold">Authorization</span>: prevents IDOR and role bypass.</li>
  <li><span class="text-yellow-400 font-bold">Side effects</span>: DB writes, queue jobs, emails.</li>
  <li><span class="text-yellow-400 font-bold">Idempotency</span>: retries don’t duplicate work.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3) Flake Killers</h3>
<div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-1 text-sm">
    <li>Freeze time (fake timers) for time-based logic.</li>
    <li>Isolate state (new DB schema/transaction per test or per file).</li>
    <li>Don’t rely on test order.</li>
  </ul>
</div>
            `,
            code: `/**
 * Day 26: API integration test (conceptual)
 * Install: npm i -D jest supertest
 */

const request = require('supertest');

// In real apps:
// - start app with test config (in-memory or test DB)
// - seed fixtures
// - teardown cleanly

describe('POST /users', () => {
  it('creates a user', async () => {
    const app = require('./app'); // your express app export
    const res = await request(app)
      .post('/users')
      .send({ email: 'user@domain.com' })
      .expect(201);

    expect(res.body.user.email).toBe('user@domain.com');
  });

  it('rejects invalid email', async () => {
    const app = require('./app');
    await request(app)
      .post('/users')
      .send({ email: 'not-an-email' })
      .expect(400);
  });
});`,
            comparison: {
                junior: `// ❌ Only manual testing
// "Works on my machine"
// Bugs found by customers in production`,
                senior: `// ✅ Layered test strategy
// - unit tests for business logic
// - integration tests for routes + DB
// - few E2E tests for critical flows`
            },
            interview: {
                questions: [
                    { q: "Unit vs integration test — difference?", a: "Unit tests isolate a small piece of logic with no external dependencies. Integration tests exercise interactions (DB, cache, HTTP) and validate system behavior." },
                    { q: "Why do E2E tests tend to be flaky?", a: "They depend on many moving parts: timing, network, environments, and shared state. Keep them few and focus on critical flows." },
                    { q: "What is contract testing?", a: "Testing that two services agree on request/response formats. It prevents breaking changes across teams by validating contracts automatically." }
                ]
            }
        },
        {
            day: 27,
            title: 'Node Performance (Profiling, Memory Leaks, Worker Threads)',
            intro: "At scale, performance issues are usually your event loop, your DB, or your memory. Today you’ll learn how to diagnose and fix them.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>How to detect event loop blocking and slow endpoints.</li>
  <li>Memory leaks in Node (closures, caches, global maps).</li>
  <li>When to use Worker Threads vs separate services.</li>
  <li>Connection pooling basics for DBs and why it matters.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Three Big Bottlenecks</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
<pre>
1) Event loop blocked (CPU-heavy JS)
2) DB slow / missing indexes / too many queries
3) Memory leak (heap growth, GC thrash)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Fix CPU Work</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Move CPU-heavy work to <span class="text-yellow-400 font-bold">Worker Threads</span>.</li>
  <li>Or move it to a separate service (best for heavy workloads).</li>
  <li>Don’t increase Node instances to “fix” CPU in one request path; you’re just spreading the pain.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3) Fix DB Work</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
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
                    { q: "What is event loop lag and why does it matter?", a: "It’s the delay between when timers should run and when they actually run. High lag indicates the main thread is blocked, which increases latency for all requests." },
                    { q: "What causes memory leaks in Node?", a: "Long-lived references preventing GC: global maps, caches without eviction, closures holding large objects, event listeners not removed." },
                    { q: "Worker Threads vs Cluster?", a: "Worker Threads run JS in parallel threads within a process (good for CPU tasks). Cluster runs multiple Node processes (scale-out). Worker threads share memory more easily but add complexity." }
                ]
            }
        },
        {
            day: 28,
            title: 'Deployment Architecture (Configs, Secrets, Environments)',
            intro: "Most deployment failures are config failures. Today you’ll build discipline around environments, secrets, and rollout safety.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Environment strategy: dev → staging → prod.</li>
  <li>Config vs secrets and how to manage both safely.</li>
  <li>Rollout safety: feature flags, migrations, and rollbacks.</li>
  <li>Health checks and readiness: what “healthy” actually means.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Config vs Secrets (Repeat)</h3>
<p class="mb-4 text-light-300">
Config can be public; secrets must not be in Git. Use secret managers and inject at runtime.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Health Checks (Liveness vs Readiness)</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
/healthz (liveness): process is alive
/readyz  (readiness): can serve traffic (DB connected, migrations done)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Feature Flags (Deploy ≠ Release)</h3>
<p class="mb-6 text-light-300">
Ship code behind a flag. Turn it on gradually. Roll back by flipping a switch, not redeploying at 2AM.
</p>
            `,
            code: `/**
 * Day 28: Minimal readiness check pattern
 */

let ready = false;

async function boot({ db }) {
  // connect DB, warm caches, run migrations checks, etc.
  await db.connect();
  ready = true;
}

app.get('/healthz', (req, res) => res.json({ ok: true }));
app.get('/readyz', (req, res) => {
  if (!ready) return res.status(503).json({ ok: false });
  res.json({ ok: true });
});`,
            comparison: {
                junior: `// ❌ One environment, many surprises
// dev and prod are different
// secrets in code
// no readiness checks`,
                senior: `// ✅ Environment discipline
// - dev/staging/prod separation
// - secrets injected at runtime
// - readiness gating + rollbacks`
            },
            interview: {
                questions: [
                    { q: "What’s the difference between liveness and readiness?", a: "Liveness: process is alive (restart if dead). Readiness: safe to receive traffic (don’t send traffic until dependencies are ready)." },
                    { q: "Why separate staging from production?", a: "To validate deploys in a production-like environment (infra, configs, migrations) without risking customer impact." },
                    { q: "Why feature flags?", a: "They decouple deployment from release, enabling gradual rollout, A/B tests, and safe rollback without redeploy." }
                ]
            }
        },
        {
            day: 29,
            title: 'Cloud Deployment (Containers, Registries, Runtime)',
            intro: "Deploying is just shipping a tested artifact to a runtime. Today we focus on practical, repeatable deployment.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Artifact flow: build image → push registry → deploy runtime.</li>
  <li>Why “build once, promote many” is critical.</li>
  <li>Runtime options: managed containers, PaaS, or Kubernetes.</li>
  <li>Operational basics: logs, metrics, alerting, and rollback.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Artifact Pipeline</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
<pre>
CI builds image (myapp:sha)
  │
  ├─ push to registry
  └─ deploy same image tag to staging/prod
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Rollback = Deploy Previous Image</h3>
<p class="mb-6 text-light-300">
If you deploy immutable artifacts, rollback is instant: choose the previous tag.
</p>
            `,
            code: `# Day 29: Container deployment flow (generic)

# Build locally (CI usually does this)
docker build -t myapp:dev .

# Tag + push to a registry (example names)
docker tag myapp:dev registry.example.com/myapp:abc123
docker push registry.example.com/myapp:abc123

# Deploy that tag in your runtime (PaaS/K8s/ECS/etc.)
# - update service to use image: registry.example.com/myapp:abc123
# - rollout
# - verify health/readiness
# - rollback by deploying the previous tag`,
            comparison: {
                junior: `// ❌ Mutable deployments
// build on server
// no artifact tracking
// rollback is painful`,
                senior: `// ✅ Immutable artifacts
// image tag = commit sha
// deploy exact tested artifact
// rollback = previous tag`
            },
            interview: {
                questions: [
                    { q: "Why is deploying from a registry better than building on the server?", a: "It guarantees you deploy the tested artifact. Building on the server introduces untested differences and makes rollbacks and audits harder." },
                    { q: "What is an immutable artifact?", a: "A build output that never changes once produced (e.g., Docker image tagged by commit SHA). It improves reproducibility and rollback." },
                    { q: "What do you check after a production deploy?", a: "Health/readiness, error rate, p95 latency, key business metrics, and logs/traces for anomalies. Also confirm rollback path." }
                ]
            }
        },
        {
            day: 30,
            title: 'System Design Case Study (Design a Real API)',
            intro: "Today you’ll practice the system design interview style: define requirements, choose data model, and scale safely.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>How to run a system design conversation: requirements → APIs → data → scaling.</li>
  <li>How to identify bottlenecks and pick pragmatic solutions.</li>
  <li>How to layer cache, queues, and DB indexes in the right order.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Case: “Design a Notifications Service”</h3>
<p class="mb-4 text-light-300">
Users receive notifications (email/push/in-app). Requirements: high throughput, retries, dedupe, and auditability.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
API: POST /notifications (enqueue)
DB: notifications table (audit) + outbox
Queue: notification jobs
Worker: sends email/push, retries, DLQ
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">Key Design Decisions</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Idempotency</span>: client-supplied key to dedupe retries.</li>
  <li><span class="text-yellow-400 font-bold">Reliability</span>: outbox pattern + worker retries + DLQ.</li>
  <li><span class="text-yellow-400 font-bold">Observability</span>: requestId + jobId + delivery status tracking.</li>
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
                    { q: "Why return 202 Accepted for async operations?", a: "Because the request is accepted for processing but not completed yet. It accurately communicates asynchronous processing." },
                    { q: "How do you prevent duplicate notifications?", a: "Use idempotency keys and store a unique constraint on (idempotencyKey, userId) or a processed-key store; make worker idempotent too." },
                    { q: "What would you measure for this system?", a: "Queue depth, delivery latency, success/failure rates by provider, retry counts, and p95 API enqueue latency." }
                ]
            }
        },
        {
            day: 31,
            title: 'Kubernetes Essentials (Deploy a Node API Properly)',
            intro: "You don’t need to be a platform engineer, but you must understand how your app runs in a cluster: deployments, services, ingress, and probes.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Pods, Deployments, Services, and Ingress (the core building blocks).</li>
  <li>ConfigMaps vs Secrets (and how apps consume both).</li>
  <li>Health probes: liveness vs readiness (and why they prevent outages).</li>
  <li>Horizontal scaling: replicas + HPA basics.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Mental Model</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Deployment → creates ReplicaSet → creates Pods
Service    → stable virtual IP → routes to Pods
Ingress    → HTTP routing + TLS at the edge
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Probes Prevent Bad Rollouts</h3>
<p class="mb-6 text-light-300">
If your app boots but can’t talk to the DB yet, readiness should fail so traffic doesn’t hit it.
If your app is stuck/hung, liveness restarts it.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) Config & Secrets</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">ConfigMap</span>: non-sensitive config (feature flags, public settings).</li>
  <li><span class="text-yellow-400 font-bold">Secret</span>: credentials/keys (still be careful—treat as sensitive).</li>
</ul>
            `,
            code: `# Day 31: Minimal Kubernetes manifests (conceptual)

apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: registry.example.com/myapp:abc123
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: "production"
          readinessProbe:
            httpGet:
              path: /readyz
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /healthz
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 10

---
apiVersion: v1
kind: Service
metadata:
  name: api-svc
spec:
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 3000`,
            comparison: {
                junior: `// ❌ "It runs locally" deploy
// - no readiness probes
// - no rolling updates configured
// - secrets in image or repo
// - manual restarts`,
                senior: `// ✅ Production Kubernetes basics
// - readiness + liveness endpoints
// - immutable images (tagged by SHA)
// - config/secrets injected at runtime
// - replicas + safe rollouts`
            },
            interview: {
                questions: [
                    { q: "Deployment vs Service in Kubernetes?", a: "Deployment manages the desired number of Pods (replicas) and rolling updates. Service provides a stable virtual IP/DNS name and load-balances traffic to matching Pods." },
                    { q: "Readiness vs liveness probes?", a: "Readiness gates traffic (is the app ready to serve?). Liveness restarts the container if it’s stuck/unhealthy. Mixing them up can cause outages or restart loops." },
                    { q: "Why use an Ingress?", a: "Ingress provides HTTP routing and TLS termination at the edge, mapping external traffic to internal Services using host/path rules." }
                ]
            }
        },
        {
            day: 32,
            title: 'Capstone System Design (URL Shortener + Analytics)',
            intro: "This is the classic full-stack system design: tiny API, huge scale. We’ll design for correctness, performance, and observability.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>How to turn requirements into an API contract.</li>
  <li>Data model: short code → long URL, TTL/expiry, ownership, and analytics.</li>
  <li>Scaling reads (cache/CDN) and writing analytics (queues).</li>
  <li>Hot keys, abuse prevention, and rate limiting.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Requirements</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Create short link</li>
  <li>Redirect fast (p95 &lt; 50ms at the edge if possible)</li>
  <li>Optional expiry, custom aliases</li>
  <li>Analytics: clicks over time, referrer, country (best-effort)</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">2) High-Level Architecture</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Create:
Client → API → DB (insert) → Cache set

Redirect:
Client → Edge/CDN → Cache hit → redirect
                  └→ Cache miss → API → DB → cache → redirect

Analytics:
Redirect → enqueue event → worker aggregates → analytics store
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Key Decisions</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Short code generation</span>: base62(random) with collision checks or Snowflake-style IDs.</li>
  <li><span class="text-yellow-400 font-bold">Cache</span>: Redis for hot mappings (short→long), TTL aligned with expiry.</li>
  <li><span class="text-yellow-400 font-bold">Abuse prevention</span>: rate limit create endpoint; detect spam domains.</li>
  <li><span class="text-yellow-400 font-bold">Analytics</span>: async pipeline (don’t block redirects).</li>
</ul>
            `,
            code: `/**
 * Day 32: API sketch (URL shortener)
 */

// POST /links
// Body: { "url": "https://example.com/very/long", "expiresAt": "..."? }
// Response: 201 { data: { code: "aZ31Q", shortUrl: "https://sho.rt/aZ31Q" } }

// GET /:code  (redirect)
// 302 Location: https://example.com/very/long

// Analytics event (async):
// { code, ts, ipHash, userAgent, referer, country? }`,
            comparison: {
                junior: `// ❌ Redirect handler does everything
// - DB lookup + analytics insert synchronously
// - no cache
// - slow redirects under load`,
                senior: `// ✅ Fast path + async analytics
// - cache hot mappings
// - redirect immediately
// - enqueue analytics events
// - worker aggregates + stores`
            },
            interview: {
                questions: [
                    { q: "How do you generate unique short codes at scale?", a: "Use base62 encoding of unique IDs (Snowflake/sequence) or random codes with collision checks. Prefer deterministic IDs for predictability and lower collision handling." },
                    { q: "Where do you put caching and why?", a: "Cache the short→long mapping in Redis and/or at the CDN edge to make redirects extremely fast and reduce DB load." },
                    { q: "How do you track analytics without slowing redirects?", a: "Emit analytics events asynchronously (queue/log stream). Process/aggregate in workers and store results separately from the hot redirect path." }
                ]
            }
        }
    ]
}
}
export const day26 = {
  day: 26,
  title: "Testing Strategy (Unit, Integration, Contract, E2E)",
  intro: "Tests are not a checkbox. They’re how you ship quickly without breaking production.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Unit vs integration vs E2E: what each actually proves.</li>
  <li>How to test APIs: supertest-style, DB in Docker, and deterministic fixtures.</li>
  <li>Contract testing and why it matters across teams/services.</li>
  <li>How to avoid flaky tests (time, randomness, shared state).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Test Pyramid (Practical Version)</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Many:   Unit tests (fast, pure, cheap)
Some:   Integration tests (DB, cache, external mocks)
Few:    E2E tests (browser / full system)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) What to Test in Backend APIs</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Validation</span>: rejects bad input with correct codes.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Authorization</span>: prevents IDOR and role bypass.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Side effects</span>: DB writes, queue jobs, emails.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Idempotency</span>: retries don’t duplicate work.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Flake Killers</h3>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-light-300 mb-6">
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
      {
        q: "Unit vs integration test — difference?",
        a: "Unit tests isolate a small piece of logic with no external dependencies. Integration tests exercise interactions (DB, cache, HTTP) and validate system behavior."
      },
      {
        q: "Why do E2E tests tend to be flaky?",
        a: "They depend on many moving parts: timing, network, environments, and shared state. Keep them few and focus on critical flows."
      },
      {
        q: "What is contract testing?",
        a: "Testing that two services agree on request/response formats. It prevents breaking changes across teams by validating contracts automatically."
      }
    ]
  }
};

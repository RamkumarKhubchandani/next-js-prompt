export const day03 = {
  day: 3,
  title: "REST API Design",
  intro: "Resources, Verbs, and Status Codes. Don't return 200 OK for an error.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>How to design REST resources that survive growth (and teams).</li>
  <li>Status codes that communicate correctly to clients + observability.</li>
  <li>Pagination, filtering, sorting, and idempotency.</li>
  <li>Common anti-patterns: RPC URLs, inconsistent errors, and “200 for failure”.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Resource Modeling (Nouns + Hierarchy)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Your URL should represent <span class="text-yellow-600 dark:text-yellow-400 font-bold">resources</span>, not actions.</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
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

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Status Codes as a Contract</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6 text-sm">
  <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl text-gray-700 dark:text-light-200">
    <p class="font-bold text-green-300 mb-2">Success</p>
    <ul class="list-disc list-inside space-y-1">
      <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">200</code> OK (read/update)</li>
      <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">201</code> Created (+ Location header)</li>
      <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">204</code> No Content (delete)</li>
    </ul>
  </div>
  <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl text-gray-700 dark:text-light-200">
    <p class="font-bold text-red-300 mb-2">Client Errors</p>
    <ul class="list-disc list-inside space-y-1">
      <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">400</code> bad request / validation</li>
      <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">401</code> unauthenticated</li>
      <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">403</code> forbidden</li>
      <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">404</code> not found</li>
      <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">409</code> conflict (unique/email)</li>
      <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">422</code> semantic rule failure</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Pagination (Cursor > Offset at Scale)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Offset pagination gets slow on large tables and can duplicate/miss items when data changes.
Cursor pagination is stable and performant.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
GET /users?limit=20&cursor=eyJpZCI6IjEwMDAifQ==

Response:
{
  "data": [...],
  "nextCursor": "eyJpZCI6IjEwMjAifQ=="
}
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) Idempotency (Payments & Retries)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
If clients retry (mobile networks, timeouts), your API must not create duplicates.
Use an <span class="text-yellow-600 dark:text-yellow-400 font-bold">Idempotency-Key</span> for dangerous creates.
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
      {
        q: "PUT vs PATCH — what’s the real difference?",
        a: "PUT is a full replacement of the resource (client sends the full representation). PATCH is a partial update. In practice, PATCH is preferred for APIs because it avoids overwriting fields unintentionally."
      },
      {
        q: "When would you use 409 vs 422?",
        a: "409 Conflict is for state conflicts (unique constraints, version conflicts, concurrent edits). 422 Unprocessable Entity is for valid syntax but failed business rules (e.g., email domain not allowed, user cannot transition state)."
      },
      {
        q: "Why cursor pagination is better than offset for large datasets?",
        a: "Offset becomes slower as offset grows and can duplicate/miss records when new rows are inserted. Cursor pagination uses a stable sort key (id/createdAt) and scales better."
      }
    ]
  }
};

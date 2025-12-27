export const day32 = {
  day: 32,
  title: "Capstone System Design (URL Shortener + Analytics)",
  intro: "This is the classic full-stack system design: tiny API, huge scale. We’ll design for correctness, performance, and observability.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>How to turn requirements into an API contract.</li>
  <li>Data model: short code → long URL, TTL/expiry, ownership, and analytics.</li>
  <li>Scaling reads (cache/CDN) and writing analytics (queues).</li>
  <li>Hot keys, abuse prevention, and rate limiting.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Requirements</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Create short link</li>
  <li>Redirect fast (p95 &lt; 50ms at the edge if possible)</li>
  <li>Optional expiry, custom aliases</li>
  <li>Analytics: clicks over time, referrer, country (best-effort)</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) High-Level Architecture</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
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

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Key Decisions</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Short code generation</span>: base62(random) with collision checks or Snowflake-style IDs.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Cache</span>: Redis for hot mappings (short→long), TTL aligned with expiry.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Abuse prevention</span>: rate limit create endpoint; detect spam domains.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Analytics</span>: async pipeline (don’t block redirects).</li>
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
      {
        q: "How do you generate unique short codes at scale?",
        a: "Use base62 encoding of unique IDs (Snowflake/sequence) or random codes with collision checks. Prefer deterministic IDs for predictability and lower collision handling."
      },
      {
        q: "Where do you put caching and why?",
        a: "Cache the short→long mapping in Redis and/or at the CDN edge to make redirects extremely fast and reduce DB load."
      },
      {
        q: "How do you track analytics without slowing redirects?",
        a: "Emit analytics events asynchronously (queue/log stream). Process/aggregate in workers and store results separately from the hot redirect path."
      }
    ]
  }
};

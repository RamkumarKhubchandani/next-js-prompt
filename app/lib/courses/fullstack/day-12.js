export const day12 = {
  day: 12,
  title: "Caching Strategies (Redis)",
  intro: "The fastest query is the one you don't make.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>When caching helps (and when it hurts).</li>
  <li>Cache-aside pattern (the default) and its pitfalls.</li>
  <li>Invalidation strategies: TTL, versioning, write-through, and event-based invalidation.</li>
  <li>Stampede protection and “thundering herd”.</li>
  <li>How to choose cache keys and TTLs like a senior.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Cache-Aside (Most Common)</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Request → check cache
   │
   ├─ hit  → return cached value
   └─ miss → query DB → set cache (TTL) → return
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Cache Invalidation: The Hard Part</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Three classic strategies:
<span class="text-yellow-600 dark:text-yellow-400 font-bold">TTL</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">explicit delete</span> on writes,
or <span class="text-yellow-600 dark:text-yellow-400 font-bold">versioned keys</span>.
</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200 text-sm">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Stampede warning:</span> when cache expires, many requests hit DB at once.
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
      {
        q: "What is cache-aside and why is it popular?",
        a: "App reads from cache first; on miss it reads from DB and writes to cache. It’s simple, works with any DB, and keeps cache optional (cache failures degrade gracefully)."
      },
      {
        q: "What is a cache stampede and how do you prevent it?",
        a: "Many requests miss simultaneously (often after TTL expires) causing DB overload. Prevent with locking/single-flight, request coalescing, early refresh, or jittered TTLs."
      },
      {
        q: "How do you choose a cache key and TTL?",
        a: "Key should reflect identity and version (e.g., user:profile:v2:123). TTL depends on freshness needs and write frequency. Add jitter to avoid synchronized expirations."
      }
    ]
  }
};

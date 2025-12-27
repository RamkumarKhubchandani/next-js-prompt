export const day04 = {
  day: 4,
  title: "Databases: SQL vs NoSQL",
  intro: "ACID transactions vs Flexible Schema. Choose the right tool.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>How to choose SQL vs NoSQL for real products (not blog wars).</li>
  <li>ACID, transactions, and why they matter in payments/order flows.</li>
  <li>Indexes, query shapes, and the #1 scalability killer: <span class="text-yellow-600 dark:text-yellow-400 font-bold">N+1</span>.</li>
  <li>Practical modeling: 1‑N, N‑N, and “event log” patterns.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) SQL vs NoSQL (Decision Table)</h3>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-2 text-sm">
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">SQL (Postgres)</span>: strong consistency, joins, constraints, transactions, reporting.</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">NoSQL (Mongo)</span>: flexible documents, fast iteration, denormalized reads, schema evolution.</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Reality</span>: many companies use both (Postgres for core, Redis for cache, Kafka for events, etc.).</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The Query You Run is the Schema You Need</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Database design is not about “normalization vs denormalization”. It’s about your access patterns:
What do you read most? What do you write most? What must be consistent?
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Indexes (The Difference Between 20ms and 2s)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
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
      {
        q: "What does ACID mean and where do you need it?",
        a: "Atomicity, Consistency, Isolation, Durability. You need it in money/order/inventory flows and any place where partial updates cause real-world damage."
      },
      {
        q: "What is an index and what’s the tradeoff?",
        a: "An index is a data structure (often B-Tree) that speeds lookups/sorts by avoiding full scans. Tradeoff: extra storage and slower writes (index maintenance)."
      },
      {
        q: "Explain the N+1 problem.",
        a: "You run 1 query to get a list, then N queries to fetch children for each item. Fix with JOINs/eager loading/aggregation or batching (DataLoader pattern)."
      }
    ]
  }
};

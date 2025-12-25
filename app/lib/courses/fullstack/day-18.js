export const day18 = {
  day: 18,
  title: "Transactions, Isolation Levels & Concurrency",
  intro: "Most production bugs are race conditions. Transactions are your correctness tool.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>What a transaction guarantees (ACID) and what it doesn’t.</li>
  <li>Isolation levels: Read Committed vs Repeatable Read vs Serializable.</li>
  <li>Optimistic vs pessimistic concurrency control.</li>
  <li>Idempotency keys for safe retries (payments/orders).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Classic Race Condition</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Two requests buy the last item at the same time:
  req A reads qty = 1
  req B reads qty = 1
  req A writes qty = 0
  req B writes qty = 0  (oops, oversold)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Fix Options</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Atomic update</span>: update with a condition (qty &gt;= 1).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Row locks</span>: SELECT ... FOR UPDATE (pessimistic).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Version column</span>: optimistic concurrency (CAS).</li>
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
      {
        q: "What does an isolation level control?",
        a: "It controls what each transaction can see of other transactions' changes, preventing anomalies like dirty reads, non-repeatable reads, and phantom reads depending on the level."
      },
      {
        q: "Optimistic vs pessimistic locking?",
        a: "Optimistic assumes low contention and uses version checks (fail on conflict). Pessimistic locks rows to prevent concurrent modifications (safe under contention but can reduce throughput)."
      },
      {
        q: "Why do payments APIs need idempotency keys?",
        a: "Because clients retry due to timeouts. Idempotency keys ensure retried requests return the same result without double-charging or creating duplicates."
      }
    ]
  }
};

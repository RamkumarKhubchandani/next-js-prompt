export const day17 = {
  day: 17,
  title: "Migrations & ORMs (Prisma-Style Discipline)",
  intro: "Your database is code. Migrations are the source of truth, not manual clicks.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Why migrations are required for teams and CI/CD.</li>
  <li>How to ship schema changes safely (expand → migrate → contract).</li>
  <li>ORM vs SQL: where ORMs help and where they hide performance.</li>
  <li>Migration gotchas: long locks, backfills, and large tables.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Expand → Migrate → Contract (Zero Downtime)</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
Phase 1 (expand): add nullable column / new table
Phase 2 (migrate): backfill data + dual-write if needed
Phase 3 (contract): enforce NOT NULL / drop old column
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) ORMs: Use Them, But Don’t Be Blind</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
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
      {
        q: "Why are migrations important in a team?",
        a: "They provide a versioned history of schema changes, enable reproducible environments, and prevent drift between developers, CI, staging, and production."
      },
      {
        q: "What is expand/contract and why do it?",
        a: "A safe rollout technique for schema changes that avoids breaking older app versions during deploys. You introduce additive changes first, migrate data, then remove/lock down old structures later."
      },
      {
        q: "What’s a dangerous migration on large tables?",
        a: "Anything that locks the table for a long time (e.g., adding NOT NULL without a default/backfill strategy, rebuilding big indexes). It can block writes and cause outages."
      }
    ]
  }
};

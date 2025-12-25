export const day16 = {
  day: 16,
  title: "Database Design Patterns (Real-World Modeling)",
  intro: "Schema design is product design. We’ll model for correctness first, then performance.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>How to model <span class="text-yellow-600 dark:text-yellow-400 font-bold">entities</span> and <span class="text-yellow-600 dark:text-yellow-400 font-bold">relationships</span> (1‑N, N‑N).</li>
  <li>Normalization vs denormalization (and how to choose).</li>
  <li>Soft deletes, audit trails, and “history tables”.</li>
  <li>Indexing by query shape (not by “guessing”).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Start with Invariants</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Before tables, define invariants:
<span class="text-yellow-600 dark:text-yellow-400 font-bold">uniqueness</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">ownership</span>,
and what must be consistent (payments, inventory, permissions).
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Relationship Modeling</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
1-N:   user → posts
N-N:   users ↔ roles (join table user_roles)

Soft delete:
  deleted_at timestamp NULL
Audit:
  created_at, updated_at, created_by, updated_by
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Indexes Follow Queries</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Add indexes for your most frequent queries (WHERE/JOIN/ORDER). Don’t index everything; it slows writes.
</p>

<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
  <p class="text-blue-800 dark:text-blue-200 text-sm">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Rule of thumb:</span> write down your top 5 queries, then design indexes.
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
      {
        q: "When would you use soft delete?",
        a: "When you need recovery/auditing or to preserve referential integrity for historical records. You must ensure queries filter deleted rows (e.g., deleted_at IS NULL) and add partial indexes for performance."
      },
      {
        q: "What’s the downside of indexing everything?",
        a: "Indexes speed reads but slow writes and increase storage. Too many indexes make inserts/updates expensive and can harm overall performance."
      },
      {
        q: "How do you model many-to-many relationships in SQL?",
        a: "With a join table containing the two foreign keys and a composite primary key (or unique constraint) to prevent duplicates."
      }
    ]
  }
};

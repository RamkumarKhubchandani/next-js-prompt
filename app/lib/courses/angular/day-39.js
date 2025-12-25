export const day39 = {
  day: 39,
  title: "Interview Package 4: Frontend System Design (Angular App Architecture)",
  intro: "You’ll answer the system design interview for frontend: requirements, routing, state, API layer, caching, and deployment strategy.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Case: Design an Admin Dashboard</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Role-based access (admin/support)</li>
  <li>Large tables + filters</li>
  <li>Audit-friendly actions</li>
  <li>Fast initial load</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Architecture Blueprint</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Shell (layout)
  ├─ /auth (login)
  ├─ /admin (lazy)
  │    ├─ users (table + filters)
  │    └─ billing (forms)
  └─ shared (ui + util)

Data access:
  - typed services
  - interceptors (auth + requestId)
State:
  - feature stores per route
</pre>
</div>
            `,
  code: `/**
 * Day 39: System design answer skeleton
 */

// 1) Requirements
// 2) Route map + lazy loading
// 3) Auth model (guard + backend enforcement)
// 4) Data access layer (typed + interceptors)
// 5) State boundaries (feature stores)
// 6) Performance (OnPush, trackBy, virtual scroll)
// 7) Deploy + caching headers + rollback`,
  comparison: {
    junior: `// ❌ "Just build pages"
// no boundaries, no performance plan`,
    senior: `// ✅ architecture with constraints
// bundles, state, tables, caching, deploy strategy`
  },
  interview: {
    questions: [
      {
        q: "How would you keep initial load fast in a big Angular app?",
        a: "Lazy load features, keep app shell small, enforce bundle budgets, reduce heavy dependencies, and avoid blocking resolvers. Use preloading strategically for next-likely routes."
      },
      {
        q: "Where do you put state in a dashboard app?",
        a: "Local UI state in components; feature state in route-scoped stores; global state only for shared concerns like auth user and feature flags."
      },
      {
        q: "How do you secure the admin dashboard?",
        a: "Guards for UX, but server-side authorization for all data/actions. Use least privilege, audit logs, and safe token storage."
      }
    ]
  }
};

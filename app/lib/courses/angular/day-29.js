export const day29 = {
  day: 29,
  title: "Architecture Patterns (Core/Shared/Feature + Clean Boundaries)",
  intro: "Angular at scale requires boundaries. Learn folder structure patterns that keep teams productive.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">A Practical Pattern</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
/core        (singleton services, auth, config)
/shared      (reusable UI, pipes, directives)
/features    (vertical slices: routes + components + data-access)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Dependency Direction (Non‑Negotiable)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
If everything imports everything, refactors become impossible. Enforce a single direction:
features → shared/core, never the reverse.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) “Feature = Vertical Slice”</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Put route + UI + state + data-access together. This keeps ownership clear and reduces cross-folder jumping.
</p>
            `,
  code: "// Rule: features should depend on shared/core; shared should not depend on features.",
  comparison: {
    junior: "// ❌ spaghetti imports",
    senior: "// ✅ strict dependency direction"
  },
  interview: {
    questions: [
      {
        q: "Why are boundaries important?",
        a: "They prevent accidental coupling, reduce refactor cost, and allow multiple teams to work without collisions."
      },
      {
        q: "What belongs in core?",
        a: "Singleton services (auth, config), interceptors, app shell pieces, and providers that should exist once."
      },
      {
        q: "What’s a feature slice?",
        a: "A vertical unit: route + UI + data access + state for a specific business domain."
      }
    ]
  }
};

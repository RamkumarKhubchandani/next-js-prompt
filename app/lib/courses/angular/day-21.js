export const day21 = {
  day: 21,
  title: "Build System (esbuild/Vite-style speed, budgets, optimization)",
  intro: "Learn what makes builds fast and bundles small: budgets, code splitting, and dependency hygiene.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Bundle Discipline</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Audit dependencies (biggest wins).</li>
  <li>Lazy load features.</li>
  <li>Track bundle budgets.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) What Actually Makes Bundles Big</h3>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-1 text-sm">
    <li>Huge dependencies (chart libs, date libs, utility megabundles)</li>
    <li>Accidental eager imports (importing whole feature from root)</li>
    <li>Duplicate dependencies in monorepos</li>
    <li>Shipping large JSON/data in the bundle</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Code Splitting Strategy</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Split by user intent: pages/features. Example: Admin, Billing, Reports should not be in the initial bundle.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Build Budgets (Guardrails)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Budgets are how teams prevent slow regressions. If a PR adds 400KB, it should fail CI and force an explicit decision.
</p>
            `,
  code: `/**
 * Day 21: Practical build checklist (conceptual)
 */

// 1) Budget rule:
// - set bundle budgets in angular.json
// - fail CI if exceeded
//
// 2) Dependency rule:
// - audit dependencies quarterly
// - prefer smaller alternatives
//
// 3) Split rule:
// - lazy load feature routes
// - avoid importing feature modules/components in root`,
  comparison: {
    junior: "// ❌ ship massive bundles",
    senior: "// ✅ budgets + audits + lazy loading"
  },
  interview: {
    questions: [
      {
        q: "What is tree-shaking?",
        a: "Removing unused code during bundling (works best with ESM and side-effect-free modules)."
      },
      {
        q: "How do you keep bundle size under control?",
        a: "Budgets, dependency audits, code splitting, and avoiding giant utility libraries when small alternatives exist."
      },
      {
        q: "Why are source maps sensitive?",
        a: "They can expose source code and internal structure. Serve them carefully (or restrict) in production."
      }
    ]
  }
};

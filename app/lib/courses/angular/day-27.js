export const day27 = {
  day: 27,
  title: "Micro Frontends (Module Federation Concepts)",
  intro: "For very large orgs, micro frontends split ownership. Learn the tradeoffs and safe boundaries.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Tradeoffs</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Micro frontends add deployment independence but increase complexity (shared deps, UX consistency, runtime integration).
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Only Good Reason: Org Scale</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
If you can’t explain the team boundary, release independence, and integration strategy, you don’t need micro frontends.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The Hard Parts (Be Honest)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Shared dependencies and version drift</li>
  <li>Consistent UX (design system governance)</li>
  <li>Runtime failures across remote apps</li>
  <li>Observability (who broke prod?)</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Safe Boundaries</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Micro frontend boundaries should match business domains, not technical layers. Don’t split by “header team” vs “footer team”.
</p>
            `,
  code: "// Rule: only adopt micro frontends with a real org/team boundary reason.",
  comparison: {
    junior: "// ❌ micro frontends for fun",
    senior: "// ✅ adopt only for org-scale needs"
  },
  interview: {
    questions: [
      {
        q: "When do micro frontends make sense?",
        a: "When multiple teams must deploy independently and the org structure demands separation."
      },
      {
        q: "What is the biggest risk?",
        a: "Inconsistent UX and dependency duplication leading to performance problems."
      },
      {
        q: "How do you share design system across micro frontends?",
        a: "Shared libraries, strict versioning, and governance for UI consistency."
      }
    ]
  }
};

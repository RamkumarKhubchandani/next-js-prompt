export const day35 = {
  day: 35,
  title: "Final Capstone: Architecture Review + Hardening Checklist",
  intro: "You now know Angular like a professional. Today we stitch it together into a production hardening checklist you can apply to any Angular app.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 Capstone Outcomes</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>A reusable <span class="text-yellow-600 dark:text-yellow-400 font-bold">architecture checklist</span> for any Angular project.</li>
  <li>A performance hardening checklist.</li>
  <li>A security hardening checklist.</li>
  <li>A deploy readiness checklist.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Architecture Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Feature slices with clear ownership</li>
  <li>Typed API layer + interceptors</li>
  <li>State boundaries (local → feature → global)</li>
  <li>OnPush + trackBy as defaults</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Security Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>No token in localStorage (when avoidable)</li>
  <li>No unsafe bypass of sanitization</li>
  <li>CSP where possible</li>
  <li>Strict CORS and safe redirects</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Performance Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Lazy load big routes</li>
  <li>Virtualize big lists</li>
  <li>Budgets for bundle size</li>
  <li>Measure p95 navigation + long tasks</li>
</ul>
            `,
  code: `/**
 * Day 35: PR review checklist (copy/paste)
 *
 * - Does this add bundle size? If yes, justify.
 * - Any new subscriptions? Ensure teardown/async pipe.
 * - Any list rendering changes? Ensure trackBy/virtualization.
 * - Any new HTML rendering? Ensure sanitization and no bypass.
 * - Any new routes? Ensure lazy loading and guards.
 */`,
  comparison: {
    junior: "// ❌ Ship features without guardrails",
    senior: "// ✅ Ship features with checklists + budgets + tests"
  },
  interview: {
    questions: [
      {
        q: "What would you look for in a PR for a large Angular codebase?",
        a: "Boundaries, typing, subscription teardown, performance impact (lists/bundle size), security (sanitization/auth), and test coverage for critical paths."
      },
      {
        q: "How do you reduce risk in deployments?",
        a: "Build once/promote, staging validation, smoke tests, correct caching headers, and feature flags for risky changes."
      },
      {
        q: "What’s your production readiness checklist?",
        a: "Observability, safe error handling, performance budgets, security basics, and a rollback plan."
      }
    ]
  }
};

export const day41 = {
  day: 41,
  title: "Interview Package 6: Take‑Home Assignment (Rubric + Perfect Submission)",
  intro: "A take-home is scored on architecture, correctness, and clarity. This day gives a complete rubric and a model submission checklist.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">What Interviewers Grade</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Architecture</span>: clear boundaries, small components, typed API layer</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Correctness</span>: errors handled, edge cases, loading states</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Performance</span>: OnPush, trackBy, avoids unnecessary work</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Security</span>: safe rendering, safe token strategy</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">DX</span>: README, scripts, clean commits</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Model Submission Checklist</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>README with setup + assumptions + tradeoffs</li>
  <li>Feature slices + route lazy loading</li>
  <li>Typed HttpClient services + interceptor for requestId</li>
  <li>Explicit UI state (loading/error/data)</li>
  <li>Tests for key services + one integration flow</li>
  <li>Performance guardrails (trackBy, budgets)</li>
</ol>
            `,
  code: `/**
 * Day 41: README structure (copy/paste)
 *
 * ## Setup
 * - node version
 * - npm ci
 * - ng serve
 *
 * ## Architecture
 * - feature slices
 * - data access
 * - state boundaries
 *
 * ## Tradeoffs
 * - why OnPush
 * - why signals vs store
 *
 * ## Testing
 * - what is covered
 */`,
  comparison: {
    junior: `// ❌ "It works" submission
// no README, no boundaries, no error handling`,
    senior: `// ✅ professional submission
// clear architecture, tests, tradeoffs, and polish`
  },
  interview: {
    questions: [
      {
        q: "What are the top 3 things you must show in a take-home?",
        a: "Architecture boundaries, correctness (loading/error/edge cases), and clarity (README + tradeoffs). Bonus: performance discipline."
      },
      {
        q: "How do you communicate tradeoffs?",
        a: "Document them: what you chose, why, and what you’d improve with more time (auth, caching, tests, perf)."
      },
      {
        q: "What is the fastest way to lose points?",
        a: "No error handling, no loading states, messy architecture, and unclear setup instructions."
      }
    ]
  }
};

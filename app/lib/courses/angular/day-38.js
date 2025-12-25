export const day38 = {
  day: 38,
  title: "Interview Package 3: Performance Case Studies (Solved)",
  intro: "You’ll solve classic performance scenarios: slow list, slow navigation, and memory leak — with a senior debugging plan.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Case Study 1: Slow List Page</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Symptoms: scroll jank, typing lag, CPU spikes.</li>
  <li>Fixes: OnPush, trackBy, virtualization, reduce template work.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Case Study 2: Slow Navigation</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Symptoms: blank screen after route click.</li>
  <li>Fixes: lazy load, avoid heavy resolvers, split bundles.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Case Study 3: Memory Leak</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Symptoms: memory grows with navigation.</li>
  <li>Fixes: teardown subscriptions, avoid global maps, async pipe.</li>
</ul>
            `,
  code: `/**
 * Day 38: High-signal answers (checklists)
 */

// Slow list:
// - trackBy
// - OnPush row components
// - virtual scroll for big datasets
// - avoid pipes/formatting work inside hot loops
//
// Slow navigation:
// - lazy load routes
// - avoid blocking resolvers
// - reduce initial bundle
//
// Memory leak:
// - async pipe or takeUntil
// - remove event listeners
// - avoid shareReplay without refCount/invalidation`,
  comparison: {
    junior: `// ❌ "Angular is slow"
// no measurements, random fixes`,
    senior: `// ✅ measure → isolate → fix
// bundle size + CD hot spots + DOM churn + leaks`
  },
  interview: {
    questions: [
      {
        q: "What is the first step in performance debugging?",
        a: "Measure and isolate: identify whether it’s bundle size, CD hot spots, DOM churn, network waterfall, or memory growth. Then fix the dominant bottleneck."
      },
      {
        q: "Why do large lists slow UIs?",
        a: "Large DOM + frequent re-renders cause layout/reflow and main-thread work. Virtualization limits DOM and reduces work."
      },
      {
        q: "How do you detect memory leaks?",
        a: "Observe heap growth across navigation, inspect retained objects, and find long-lived references (subscriptions, global caches, event listeners)."
      }
    ]
  }
};

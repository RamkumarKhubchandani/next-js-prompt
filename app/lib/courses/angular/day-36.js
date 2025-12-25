export const day36 = {
  day: 36,
  title: "Interview Package 1: Angular Core (Top Questions + Solved Answers)",
  intro: "This is the high-signal Angular interview pack: change detection, DI, template typing, routing, and common traps — with senior-grade answers.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 How to Use This Day</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Read the question, pause, answer out loud.</li>
  <li>Compare with the solution and improve your mental model.</li>
  <li>Repeat until you can explain tradeoffs clearly.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Change Detection (The High-Signal Answer)</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Question:
  "What triggers change detection, and why OnPush?"

Answer shape:
  - triggers (events/async/input changes)
  - problem (too much checking)
  - solution (OnPush + immutable refs + signals/async pipe)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) DI Scopes (Root vs Route vs Component)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Senior insight: DI scope is how you control <span class="text-yellow-600 dark:text-yellow-400 font-bold">state lifecycle</span>.
Route-scoped stores reset on navigation; root stores persist.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Routing (Lazy Loading + Guards)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Interviewers love practical routing: lazy loading for bundle control, guards for UX, and backend auth for real security.
</p>
            `,
  code: `/**
 * Day 36: Common interview "trap" snippets (conceptual)
 */

// TRAP 1: Mutating arrays under OnPush
// items.push(x)    // reference unchanged → UI may not update
// items = [...items, x]  // reference changes → safe

// TRAP 2: Child injects parent services (hidden coupling)
// Better: @Input/@Output or feature store owned by container

// TRAP 3: Resolver blocks navigation
// Use resolvers only when necessary; prefer loading UI + fetch in component/store`,
  comparison: {
    junior: `// ❌ "Angular runs change detection all the time" (vague)
// ❌ "DI is magic" (no scoping understanding)`,
    senior: `// ✅ Clear and precise
// - list triggers
// - explain OnPush + immutability
// - explain DI scopes + lifecycle
// - routing: lazy + guards + backend auth`
  },
  interview: {
    questions: [
      {
        q: "Explain OnPush in one minute.",
        a: "OnPush limits when Angular checks a component: primarily when input references change, events occur, or reactive sources emit. It reduces unnecessary checks and makes performance predictable, especially with immutable updates and signals/async pipe."
      },
      {
        q: "Root vs component provider — when do you use component providers?",
        a: "When you need a fresh instance per component instance (e.g., local store/state per page widget) or to override behavior locally for tests/features."
      },
      {
        q: "Guards vs backend authorization?",
        a: "Guards improve UX by preventing navigation, but they do not secure data. Real authorization must be enforced server-side for every protected resource."
      }
    ]
  }
};

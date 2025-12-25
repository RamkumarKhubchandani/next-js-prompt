export const day19 = {
  day: 19,
  title: "Advanced RxJS (Subjects, Multicasting, Error Strategy)",
  intro: "Learn the parts of RxJS that separate juniors from seniors: subjects, sharing, and error boundaries.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Subject vs BehaviorSubject vs ReplaySubject.</li>
  <li>Cold vs hot observables.</li>
  <li>Error handling: catchError boundaries and retry strategy.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Cold vs Hot (The Interview Classic)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Cold observables start producing values per subscriber (like HTTP). Hot observables share a single producer (like events).
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Subject Types (When to Use What)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Subject</span>: no initial value, pure multicast.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">BehaviorSubject</span>: has a current value (state).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">ReplaySubject</span>: replays N previous values.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Error Strategy: Boundaries</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Don’t let one error kill a long-lived stream. Catch errors at boundaries and map to domain state.
</p>
            `,
  code: "// BehaviorSubject holds latest value; ReplaySubject can replay N values to new subscribers.",
  comparison: {
    junior: "// ❌ subjects everywhere",
    senior: "// ✅ prefer pure streams; subjects only at boundaries"
  },
  interview: {
    questions: [
      {
        q: "When should you use a Subject?",
        a: "At event boundaries (bridging non-Rx sources) or for imperative event emission. Prefer composing cold observables for data flows."
      },
      {
        q: "Why can shareReplay be risky?",
        a: "It can cache forever and leak memory or keep stale data if not configured/invalidated."
      },
      {
        q: "How do you handle errors in RxJS?",
        a: "Use catchError at boundaries, map to domain errors, and avoid killing long-lived streams unintentionally."
      }
    ]
  }
};

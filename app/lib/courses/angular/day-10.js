export const day10 = {
  day: 10,
  title: "Component Communication Patterns (Inputs/Outputs vs Services)",
  intro: "Learn when to use Inputs/Outputs, when to lift state, and when a shared service/store is the right move.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Decision Guide</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Parent-child: Inputs/Outputs</li>
  <li>Siblings: lift state up or use a feature store</li>
  <li>Cross-feature: global store (rare)</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Presentational vs Container Components</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Presentational</span>: receives data via inputs, emits events, no API calls.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Container</span>: fetches data, holds feature state, orchestrates children.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Avoid “Service in Every Child”</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
If every child injects the same service, dependencies become implicit and tests become harder.
Prefer explicit inputs/outputs, or a feature store that the container owns.
</p>
            `,
  code: `/**
 * Day 10: Container + presentational pattern (conceptual)
 */

// Container:
// - injects UsersApi / store
// - passes users to list component
// - handles events like delete
//
// <app-user-list [users]="users()" (delete)="deleteUser($event)"></app-user-list>
//
// Presentational list:
// - no HttpClient, no global knowledge
// - only emits events`,
  comparison: {
    junior: "// ❌ event spaghetti",
    senior: "// ✅ clear boundaries + store"
  },
  interview: {
    questions: [
      {
        q: "Why is a global event bus a bad idea?",
        a: "It hides dependencies and creates implicit coupling. Debugging becomes difficult and changes cause surprising side effects."
      },
      {
        q: "When is a shared service appropriate?",
        a: "When multiple components within a feature need shared logic/state and share a lifecycle boundary."
      },
      {
        q: "What’s the cleanest parent-child communication?",
        a: "Inputs for data down, Outputs for events up. Keep child components dumb/presentational when possible."
      }
    ]
  }
};

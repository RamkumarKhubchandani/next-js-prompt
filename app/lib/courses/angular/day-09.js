export const day09 = {
  day: 9,
  title: "State Management (Signals Store, Component Stores, NgRx Basics)",
  intro: "State is where apps rot. Learn patterns that scale: local state, feature state, and global state—without chaos.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">State Layers</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
Local UI state: component signals
Feature state: route-scoped store/service
Global state: app-level store (when needed)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The First Rule: Don’t Start with Global State</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Start local. If multiple components in one feature need shared state, create a feature store.
Only introduce global state when multiple independent features depend on the same data.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) A Practical Feature Store Shape</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
state:
  - loading
  - data
  - error
actions:
  - load()
  - refresh()
  - setFilter()
</pre>
</div>
            `,
  code: `/**
 * Day 9: Feature store pattern with signals (conceptual)
 */

// const users = signal<User[]>([]);
// const loading = signal(false);
// const error = signal<string | null>(null);
//
// const load = async () => {
//   loading.set(true);
//   error.set(null);
//   try {
//     const data = await firstValueFrom(usersApi.list());
//     users.set(data);
//   } catch (e) {
//     error.set('Failed to load users');
//   } finally {
//     loading.set(false);
//   }
// };`,
  comparison: {
    junior: "// ❌ everything global",
    senior: "// ✅ layered state boundaries"
  },
  interview: {
    questions: [
      {
        q: "When do you need a global store?",
        a: "When multiple unrelated features need the same state and you need centralized consistency (auth user, permissions, feature flags)."
      },
      {
        q: "What makes a good state boundary?",
        a: "Ownership, lifecycle, and dependency. If it should reset on navigation, keep it route-scoped."
      },
      {
        q: "What is the cost of NgRx?",
        a: "More boilerplate and mental overhead, but strong predictability, tooling, and scalability for complex apps."
      }
    ]
  }
};

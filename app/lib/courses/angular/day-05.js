export const day05 = {
  day: 5,
  title: "Change Detection + Signals (Performance Without Guessing)",
  intro: "To build fast Angular apps, you must understand change detection. We’ll connect classic OnPush with modern Signals.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Two Worlds</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
  <div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-light-300">
    <p class="text-gray-900 dark:text-white font-bold mb-2">Classic (Zone + CD)</p>
    <p class="text-sm">Angular runs change detection on events and async tasks.</p>
  </div>
  <div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-light-300">
    <p class="text-gray-900 dark:text-white font-bold mb-2">Modern (Signals)</p>
    <p class="text-sm">Reactive primitives that update only where needed.</p>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">OnPush</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
OnPush components update when inputs change by reference, events fire, or observables/signals emit.
This reduces unnecessary work and makes UI performance predictable.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The “Reference Change” Rule</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
OnPush is simple: if you mutate arrays/objects in place, you keep the same reference and updates may not propagate.
Prefer immutable updates: create a new array/object.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
// ✅ immutable update
items = [...items, newItem];

// ❌ mutation (same reference)
items.push(newItem);
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Signals: Fine-Grained Reactivity</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Signals let Angular re-render only what depends on a value. Think “computed values” and “effects” with clear dependencies.
</p>
            `,
  code: `// Signal idea (conceptual):
// const count = signal(0);
// const doubled = computed(() => count() * 2);
// effect(() => console.log('count', count()));
// count.set(count() + 1);`,
  comparison: {
    junior: `// ❌ random performance fixes
// "add setTimeout and hope"`,
    senior: `// ✅ deliberate CD strategy
// OnPush + signals + trackBy + smaller components`
  },
  interview: {
    questions: [
      {
        q: "What triggers change detection in Angular?",
        a: "User events, async tasks (timers, XHR), input changes, and explicit triggers. With OnPush, it’s more limited and predictable."
      },
      {
        q: "Why can mutable objects hurt OnPush?",
        a: "If you mutate an object/array in place, the reference doesn’t change, so OnPush may not detect changes. Prefer immutable updates."
      },
      {
        q: "Why are signals useful?",
        a: "They provide fine-grained reactivity, reducing unnecessary template checks and simplifying state propagation compared to manual subscription management."
      }
    ]
  }
};

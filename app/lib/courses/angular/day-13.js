export const day13 = {
  day: 13,
  title: "Performance (OnPush, trackBy, defer/lazy, profiling)",
  intro: "Performance is architecture. Today you’ll learn the repeatable checklist to keep Angular apps fast.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Performance Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>OnPush by default for presentational components.</li>
  <li>trackBy for lists.</li>
  <li>Lazy load large routes/components.</li>
  <li>Measure: don’t guess.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Performance is Usually One of These</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
1) Too much JS shipped (bundle size)
2) Too much DOM work (big lists, re-renders)
3) Too many HTTP calls (waterfall)
4) Change detection hot spots
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The “Big List” Strategy</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Use trackBy</li>
  <li>Paginate or virtualize</li>
  <li>Split row components + OnPush</li>
</ul>
            `,
  code: `// trackBy example:
// trackById = (_: number, item: { id: string }) => item.id;`,
  comparison: {
    junior: "// ❌ re-render everything",
    senior: "// ✅ stable identity + smaller checks"
  },
  interview: {
    questions: [
      {
        q: "Why does trackBy help performance?",
        a: "It reduces DOM churn by keeping element identity stable across renders."
      },
      {
        q: "How do you find performance bottlenecks?",
        a: "Use profiling tools and measure change detection hot spots, large bundles, and expensive templates."
      },
      {
        q: "When would you use OnPush?",
        a: "For components whose inputs are immutable or driven by observables/signals; it makes CD predictable and faster."
      }
    ]
  }
};

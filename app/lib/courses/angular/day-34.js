export const day34 = {
  day: 34,
  title: "Enterprise Data Tables (Virtual Scroll, Sorting, Filtering, Performance)",
  intro: "Tables are where apps become slow. Learn virtualization, stable identity, and server-driven filtering the right way.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Why big tables melt the DOM and how to fix it.</li>
  <li>Virtualization (CDK virtual scroll) and trackBy discipline.</li>
  <li>Server-driven pagination/sorting to keep UI fast.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Big Table Problem</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Rendering 10,000 rows is a performance disaster. You must paginate or virtualize.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Virtual Scroll Mental Model</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Viewport shows 30 rows
DOM renders ~40-60 rows (buffer)
As you scroll, rows are recycled
</pre>
</div>
            `,
  code: `/**
 * Day 34: Virtual scroll idea (conceptual)
 */

// <cdk-virtual-scroll-viewport itemSize="48" class="viewport">
//   <div *cdkVirtualFor="let row of rows; trackBy: trackById">
//     {{ row.name }}
//   </div>
// </cdk-virtual-scroll-viewport>
//
// trackById = (_: number, r: { id: string }) => r.id;`,
  comparison: {
    junior: `// ❌ render everything
// *ngFor over 10k rows`,
    senior: `// ✅ virtualize + server-driven filtering
// stable identity + minimal DOM work`
  },
  interview: {
    questions: [
      {
        q: "Why does virtualization help?",
        a: "It limits DOM size by rendering only what's visible, reducing layout/reflow costs and memory usage."
      },
      {
        q: "Client vs server pagination — when to choose server?",
        a: "Server pagination for large datasets or when filtering/sorting must be authoritative and fast; client pagination only for small datasets."
      },
      {
        q: "Why is stable identity important in lists?",
        a: "It prevents DOM recreation and preserves component state, improving performance and correctness."
      }
    ]
  }
};

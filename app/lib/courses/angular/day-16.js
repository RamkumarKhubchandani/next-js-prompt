export const day16 = {
  day: 16,
  title: "Angular CDK + Material (Design Systems Done Right)",
  intro: "Learn to build consistent UI at scale: CDK primitives and Material components (or your own design system).",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Why CDK Matters</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
CDK provides primitives (overlay, a11y, drag-drop) so you can build reusable components without reinventing hard problems.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) CDK vs Material</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6 text-sm">
  <div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-700 dark:text-light-200">
    <p class="font-bold text-gray-900 dark:text-white mb-1">CDK</p>
    <p>Behavior primitives (no styling).</p>
    <p class="text-gray-600 dark:text-gray-400">Overlay, portals, a11y, virtual scroll.</p>
  </div>
  <div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-700 dark:text-light-200">
    <p class="font-bold text-gray-900 dark:text-white mb-1">Material</p>
    <p>Pre-built components + theming.</p>
    <p class="text-gray-600 dark:text-gray-400">Buttons, dialogs, tables, menus.</p>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) A Real Design System Strategy</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Use Material/CDK as foundation.</li>
  <li>Create a <span class="text-yellow-600 dark:text-yellow-400 font-bold">thin wrapper</span> library (your own components) for consistent API.</li>
  <li>Enforce A11y and UX defaults once, reuse everywhere.</li>
</ul>
            `,
  code: "// Use CDK overlay for popovers, menus, tooltips (conceptual).",
  comparison: {
    junior: "// ❌ copy-paste UI",
    senior: "// ✅ design system + primitives"
  },
  interview: {
    questions: [
      {
        q: "What is the Angular CDK?",
        a: "A set of behavior primitives (not styled) to build components: overlays, portals, accessibility, drag-drop, virtual scrolling."
      },
      {
        q: "Why prefer a design system?",
        a: "Consistency, speed, accessibility, and reduced maintenance across teams."
      },
      {
        q: "What’s an overlay?",
        a: "A floating UI layer rendered above the app (menus/dialogs/tooltips) with proper positioning and focus management."
      }
    ]
  }
};

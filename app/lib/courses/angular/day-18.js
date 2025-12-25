export const day18 = {
  day: 18,
  title: "Animations (UX Without Jank)",
  intro: "Use animations sparingly and correctly. Learn Angular animations and performance pitfalls.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Animation Rule</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">Prefer transform/opacity animations. Avoid layout thrashing (top/left/height) when possible.</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Micro-interactions & Perceived Quality</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Great animations are small: hover feedback, expand/collapse, dialog open/close.
Avoid “busy” motion that distracts from content.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Performance Rules</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Prefer <span class="text-yellow-600 dark:text-yellow-400 font-bold">transform</span> and <span class="text-yellow-600 dark:text-yellow-400 font-bold">opacity</span>.</li>
  <li>Avoid animating layout properties that trigger reflow.</li>
  <li>Keep animations out of critical rendering paths.</li>
</ul>
            `,
  code: "// Trigger animations on state changes; keep animation logic out of business logic.",
  comparison: {
    junior: "// ❌ animate layout-heavy properties",
    senior: "// ✅ transform/opacity + micro-interactions"
  },
  interview: {
    questions: [
      {
        q: "Why prefer transform/opacity?",
        a: "They can be GPU-accelerated and avoid layout recalculation, producing smoother animations."
      },
      {
        q: "Where do animations go in Angular?",
        a: "In component metadata (animations array) and template triggers bound to state."
      },
      {
        q: "What makes animations feel slow?",
        a: "Excessive duration, easing mismatch, and triggering layout recalculations during animation."
      }
    ]
  }
};

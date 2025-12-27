export const day23 = {
  day: 23,
  title: "Accessibility (A11y) (Keyboard, Focus, ARIA)",
  intro: "A11y is not optional. Learn keyboard navigation, focus management, and ARIA the correct way.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">A11y Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Keyboard navigation always works.</li>
  <li>Focus is visible and correct.</li>
  <li>Semantic HTML first, ARIA second.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Keyboard First</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
If your app can be used with only a keyboard, you’ve solved a large chunk of accessibility.
Tab order, Enter/Space activation, and visible focus are mandatory.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) ARIA: Use Only When Needed</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Prefer semantic elements (<code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">&lt;button&gt;</code>, <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">&lt;label&gt;</code>).
ARIA is for filling gaps, not for replacing HTML.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Modals Need Focus Management</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Trap focus inside dialogs and return focus to the trigger on close. CDK helps you do this correctly.
</p>
            `,
  code: "// Use CDK a11y utilities for focus trapping in dialogs/menus.",
  comparison: {
    junior: "// ❌ div buttons",
    senior: "// ✅ semantic elements + correct focus"
  },
  interview: {
    questions: [
      {
        q: "Why is semantic HTML important for accessibility?",
        a: "It provides built-in keyboard and screen reader behavior. ARIA cannot fully replace correct semantics."
      },
      {
        q: "What is focus trapping?",
        a: "Keeping keyboard focus inside a modal/dialog until it is closed, preventing users from tabbing behind it."
      },
      {
        q: "What’s a common a11y mistake?",
        a: "Clickable divs without role/keyboard handlers, missing labels, and poor focus states."
      }
    ]
  }
};

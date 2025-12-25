export const day26 = {
  day: 26,
  title: "Library Engineering (Packaging, Public API, Versioning)",
  intro: "Enterprise Angular means libraries. Learn packaging, semantic versioning, and backwards compatibility.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Library Rules</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Expose a stable public API.</li>
  <li>Document inputs/outputs clearly.</li>
  <li>Version changes with SemVer.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Public API is a Contract</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Your library consumers should import from one place. Never force consumers to import deep paths (it breaks refactors).
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Backwards Compatibility Strategy</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Add features in a backwards-compatible way (new inputs, optional behavior).</li>
  <li>Deprecate before remove (document timeline).</li>
  <li>Use SemVer and changelogs.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Library Quality Checklist</h3>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-1 text-sm">
    <li>A11y defaults</li>
    <li>Stable theming tokens</li>
    <li>Tests for critical behavior</li>
    <li>Clear examples in docs</li>
  </ul>
</div>
            `,
  code: `/**
 * Day 26: Public API pattern (conceptual)
 */

// projects/my-ui-lib/src/public-api.ts
// export * from './lib/button/button.component';
// export * from './lib/input/input.component';
// export * from './lib/dialog/dialog.service';
//
// Consumer:
// import { UiButtonComponent } from 'my-ui-lib';`,
  comparison: {
    junior: "// ❌ import deep paths",
    senior: "// ✅ stable public API surface"
  },
  interview: {
    questions: [
      {
        q: "What is SemVer?",
        a: "Semantic versioning: MAJOR for breaking changes, MINOR for backwards-compatible features, PATCH for bug fixes."
      },
      {
        q: "Why avoid deep imports?",
        a: "They couple consumers to internal structure. A refactor breaks downstream apps."
      },
      {
        q: "What belongs in a UI library?",
        a: "Reusable components, design tokens, accessibility utilities, and documented patterns—kept stable and versioned."
      }
    ]
  }
};

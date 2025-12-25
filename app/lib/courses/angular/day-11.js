export const day11 = {
  day: 11,
  title: "Directives & Pipes (Reusable View Logic)",
  intro: "Directives and pipes are Angular’s way to reuse UI behavior and transformations cleanly.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Directive vs Pipe</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Directive</span>: changes DOM behavior/structure.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Pipe</span>: transforms data for display.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Directives: Behavior on Existing DOM</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Directives shine when you want to attach behavior to existing HTML without creating new component wrappers:
autofocus, permissions, tooltips, input formatting.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Pipes: Keep Templates Declarative</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Pipes transform display values (formatting, mapping). Keep them <span class="text-yellow-600 dark:text-yellow-400 font-bold">pure</span> for performance.
</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200 text-sm">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Avoid impure pipes</span> unless you fully understand the performance cost.
    Impure pipes run often and can become hidden hot spots.
  </p>
</div>
            `,
  code: `/**
 * Day 11: Custom directive + custom pipe (conceptual)
 */

// Directive idea: autofocus
// @Directive({ selector: '[appAutofocus]', standalone: true })
// export class AutofocusDirective {
//   constructor(private el: ElementRef<HTMLInputElement>) {}
//   ngAfterViewInit() { this.el.nativeElement.focus(); }
// }
//
// Pipe idea: initials
// @Pipe({ name: 'initials', standalone: true })
// export class InitialsPipe implements PipeTransform {
//   transform(value: string) {
//     return value
//       .split(' ')
//       .filter(Boolean)
//       .slice(0, 2)
//       .map(w => w[0].toUpperCase())
//       .join('');
//   }
// }`,
  comparison: {
    junior: "// ❌ formatting logic in templates",
    senior: "// ✅ pipes + reusable directives"
  },
  interview: {
    questions: [
      {
        q: "Pure vs impure pipes?",
        a: "Pure pipes run only when inputs change by reference. Impure pipes run frequently and can hurt performance; use sparingly."
      },
      {
        q: "When write a directive instead of a component?",
        a: "When you need to attach behavior to existing elements without changing structure too much (e.g., tooltip, auto-focus)."
      },
      {
        q: "Why are pipes good for UI?",
        a: "They keep templates clean and centralize formatting/transformations."
      }
    ]
  }
};

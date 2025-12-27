export const day01 = {
  day: 1,
  title: "Components & Templates (Bindings, Inputs/Outputs, Control Flow)",
  intro: "Angular is a component framework. Learn the template syntax, bindings, and the modern control flow style.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The "Blueprint" Mental Model</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Think of an Angular Component as a building.
</p>
<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-brand-primary mb-2">The Class (The Logic)</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">
      The TypeScript class is the "smart" part. It holds the data (residents) and methods (rules). But a class alone is just a script.
    </p>
  </div>
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-red-600 dark:text-red-400 mb-2">The Decorator (The Permit)</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">
      The <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">@Component</code> decorator is the building permit. It tells Angular: "This isn't just a script; it's a UI Component with a template (HTML) and styles (CSS)."
    </p>
  </div>
</div>

<div class="mb-8 p-5 rounded-xl border border-blue-500/30 bg-blue-500/5">
  <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
    <span class="text-xl">🏛️</span> Architect's Note: Why Enterprise Loves Angular
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    React is flexible; Angular is strict. In a team of 100 developers, flexibility is chaos.
  </p>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    Angular forces everyone to write code the same way (Modules, Services, Dependency Injection).
    This <strong>opinionated structure</strong> is why banks and large corps choose it. It scales socially, not just technically.
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Property binding vs event binding vs two-way binding.</li>
  <li><code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">@Input</code> and <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">@Output</code> communication.</li>
  <li>Template control flow (<span class="text-yellow-600 dark:text-yellow-400 font-bold">if/for</span> style) + trackBy mindset.</li>
</ul>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Parent Component
  ├─ passes data via @Input  ─────▶ Child Component
  └─ listens via @Output    ◀───── emits events
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Bindings (The 4 You Use Daily)</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
{{ title }}                 # interpolation (text)
[disabled]="isSaving"       # property binding
(click)="save()"            # event binding
[(ngModel)]="name"          # two-way binding (forms)
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Inputs/Outputs (The Clean Data Flow)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Use <span class="text-yellow-600 dark:text-yellow-400 font-bold">Inputs</span> for data down and <span class="text-yellow-600 dark:text-yellow-400 font-bold">Outputs</span> for events up.
Avoid a child calling parent services directly; it creates hidden coupling.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) List Rendering (Identity Matters)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
When lists change, Angular must understand item identity. If identity changes, DOM churn increases.
Always prefer stable IDs and a trackBy mindset.
</p>
            `,
  code: `/**
 * Day 1: Minimal parent-child example (standalone-style)
 */

// parent.component.html
// <app-user-card
//   [user]="user"
//   (deleted)="onDeleted($event)">
// </app-user-card>

// user-card.component.ts
// export class UserCardComponent {
//   @Input({ required: true }) user!: User;
//   @Output() deleted = new EventEmitter<string>();
//
//   delete() {
//     this.deleted.emit(this.user.id);
//   }
// }`,
  comparison: {
    junior: `// ❌ Tight coupling
// child imports parent services directly`,
    senior: `// ✅ Clear contracts
// data down via @Input, events up via @Output`
  },
  interview: {
    questions: [
      {
        q: "Difference between property binding and interpolation?",
        a: "Interpolation sets text in templates. Property binding binds to DOM properties/inputs. Property binding is required for non-string values and dynamic attributes."
      },
      {
        q: "Why avoid two-way binding everywhere?",
        a: "It can hide data flow and complicate debugging. Prefer unidirectional flow: inputs + events, and use two-way where it truly helps (forms)."
      },
      {
        q: "Why is trackBy important in lists?",
        a: "It prevents unnecessary DOM destruction/recreation by giving Angular stable identity for items, improving performance."
      }
    ]
  }
};

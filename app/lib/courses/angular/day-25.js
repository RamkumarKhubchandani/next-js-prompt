export const day25 = {
  day: 25,
  title: "Template-Driven Forms: Quick Forms",
  intro: "Need a form in 5 minutes? <strong>Template-Driven Forms</strong> are your friend. They are simple, powerful, and now strictly typed in Angular 15+.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 25. People say \"Always use Reactive Forms\". They are wrong. For simple login forms, Template-Driven is faster and less code."
      },
      {
        type: "talk",
        message: "The key is `[(ngModel)]`. It syncs your JS object with the input box automatically."
      },
      {
        type: "challenge",
        instruction: "Wire up this input using Template-Driven syntax (`ngModel`) so it updates the `user.name` property.",
        buggyCode: `// ❌ No binding
<input name="username">
<p>Hello, {{ user.name }}!</p>`,
        solutionCode: `// ✅ Banana in a Box
<input [(ngModel)]="user.name" name="username">
<p>Hello, {{ user.name }}!</p>`,
        verifyOutput: "ngModel",
        successMessage: "It works! As you type, the paragraph updates instantly. No `FormGroup` boilerplate required.",
        hint: "Use `[(ngModel)]=\"user.name\"`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🍌 1. Banana in a Box</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
The syntax <code>[(ngModel)]="user.name"</code> is iconic. It means "Two-Way Binding".
</p>
<ul class="list-disc pl-5 mb-6 text-gray-600 dark:text-light-300 space-y-2">
    <li><strong>[ ]</strong> = Input (Data goes in)</li>
    <li><strong>( )</strong> = Output (Events come out)</li>
    <li><strong>[( )]</strong> = Both (Sync!)</li>
</ul>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 2. When to use it?</h3>
<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-900/30">
        <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-3">Template-Driven</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
            • Login forms<br>
            • Search bars<br>
            • Simple settings<br>
            • <strong>Logic is simple.</strong>
        </p>
    </div>
    <div class="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl border border-green-200 dark:border-green-900/30">
        <h4 class="font-bold text-green-800 dark:text-green-300 mb-3">Reactive Forms</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
            • Dynamic fields (Arrays)<br>
            • Complex validation (Cross-field)<br>
            • Unit testing required<br>
            • <strong>Logic is complex.</strong>
        </p>
    </div>
</div>
`,
  code: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simple-form',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <form #form="ngForm" (ngSubmit)="onSubmit()">
      <input name="name" [(ngModel)]="user.name" required />
      <button [disabled]="form.invalid">Submit</button>
    </form>
  \`
})
export class SimpleFormComponent {
  user = { name: '' };
  
  onSubmit() {
    console.log('Submitted:', this.user);
  }
}`,
  comparison: {
    junior: `// Template-driven (simple)
<input [(ngModel)]="name" />`,
    senior: `// Reactive (scalable)
<input [formControl]="nameControl" />`
  },
  interview: {
    questions: [
      {
        q: "Template-Driven vs Reactive Forms?",
        a: "Template-Driven: simpler, less code, logic in template. Reactive: testable, scalable, logic in TypeScript."
      }
    ]
  }
};

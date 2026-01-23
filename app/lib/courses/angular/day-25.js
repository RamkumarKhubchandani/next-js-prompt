export const day25 = {
  day: 25,
  title: "Template-Driven Forms: Quick Forms",
  intro: "Build simple forms quickly with template-driven approach. Perfect for basic forms and rapid prototyping.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📝 Template-Driven Forms</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Simpler than Reactive Forms. Logic lives in the template. Good for basic forms.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <input 
    name="email"
    [(ngModel)]="user.email"
    required
    email
  />
  
  <button [disabled]="form.invalid">Submit</button>
</form>
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ When to Use Each</h3>
<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
    <h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Template-Driven</h4>
    <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
      <li>• Simple forms</li>
      <li>• Rapid prototyping</li>
      <li>• Less code</li>
    </ul>
  </div>
  <div class="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl">
    <h4 class="font-bold text-green-700 dark:text-green-400 mb-2">Reactive Forms</h4>
    <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
      <li>• Complex forms</li>
      <li>• Dynamic fields</li>
      <li>• Unit testable</li>
    </ul>
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

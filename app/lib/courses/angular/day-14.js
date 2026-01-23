export const day14 = {
  day: 14,
  title: "Pipes: Transform Data in Templates",
  intro: "Pipes transform data for display. Learn built-in pipes and create custom ones for formatting, filtering, and more.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 14. **Pipes** are pure functions that transform data in templates. Think of them as template-level utilities."
      },
      {
        type: "challenge",
        instruction: "Create a custom pipe that truncates text to a specified length.",
        buggyCode: `// ❌ Logic in component
export class ArticleComponent {
  getTruncated(text: string) {
    return text.length > 50 ? text.slice(0, 50) + '...' : text;
  }
}
// Template: {{ getTruncated(article.body) }}`,
        solutionCode: `// ✅ Reusable pipe
@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number = 50): string {
    return value.length > length 
      ? value.slice(0, length) + '...' 
      : value;
  }
}
// Template: {{ article.body | truncate:100 }}`,
        verifyOutput: "PipeTransform",
        successMessage: "Perfect! Pipes are reusable, testable, and keep logic out of templates.",
        hint: "Implement PipeTransform interface with a transform method."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 1. Built-in Pipes</h3>
<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm">
<pre class="text-gray-800 dark:text-gray-100">
{{ value | uppercase }}
{{ price | currency:'USD' }}
{{ date | date:'short' }}
{{ items | json }}
{{ promise | async }}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 2. Custom Pipes</h3>
<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
@Pipe({ name: 'fileSize', standalone: true })
export class FileSizePipe implements PipeTransform {
  transform(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Pure vs Impure Pipes</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Pure pipes (default) only run when input reference changes. Impure pipes run on every change detection. Use pure when possible for performance.
</p>
`,
  code: `import { Pipe, PipeTransform, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number = 50): string {
    if (!value) return '';
    return value.length > length ? value.slice(0, length) + '...' : value;
  }
}

@Component({
  selector: 'app-pipe-demo',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">🔧 Pipes Demo</h2>
      
      <div class="space-y-4">
        <div class="p-4 bg-gray-800 rounded-xl">
          <p class="text-sm text-gray-400 mb-2">Original:</p>
          <p class="text-gray-300">{{ longText }}</p>
        </div>

        <div class="p-4 bg-gray-800 rounded-xl border border-green-500/30">
          <p class="text-sm text-gray-400 mb-2">Truncated (50 chars):</p>
          <p class="text-green-400">{{ longText | truncate:50 }}</p>
        </div>

        <div class="p-4 bg-gray-800 rounded-xl border border-blue-500/30">
          <p class="text-sm text-gray-400 mb-2">Built-in Pipes:</p>
          <p>{{ price | currency:'USD' }}</p>
          <p>{{ today | date:'fullDate' }}</p>
        </div>
      </div>
    </div>
  \`
})
export class PipeDemoComponent {
  longText = 'This is a very long text that will be truncated by our custom pipe to make it more readable in the UI.';
  price = 99.99;
  today = new Date();
}`,
  comparison: {
    junior: `// ❌ Method in template (runs every CD)
{{ formatDate(date) }}`,
    senior: `// ✅ Pure pipe (cached)
{{ date | date:'short' }}`
  },
  interview: {
    questions: [
      {
        q: "What's the difference between pure and impure pipes?",
        a: "Pure pipes only run when input reference changes (default, performant). Impure pipes run on every change detection (use sparingly)."
      }
    ]
  }
};

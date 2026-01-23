export const day17 = {
  day: 17,
  title: "ViewChild & ContentChild: Component Queries",
  intro: "Access child components and DOM elements programmatically using ViewChild, ViewChildren, ContentChild, and ContentChildren.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔍 Component Queries</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Access child components or DOM elements in your TypeScript code.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
@ViewChild('myInput') inputEl!: ElementRef;
@ViewChild(ChildComponent) child!: ChildComponent;

ngAfterViewInit() {
  this.inputEl.nativeElement.focus();
  this.child.someMethod();
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 ViewChild vs ContentChild</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">ViewChild:</strong> Query elements in component's own template</li>
  <li><strong class="text-brand-primary">ContentChild:</strong> Query projected content (ng-content)</li>
</ul>
`,
  code: `import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-query-demo',
  standalone: true,
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <input #myInput class="p-2 rounded bg-gray-800" />
      <button (click)="focusInput()" class="ml-2 px-4 py-2 bg-blue-600 rounded">
        Focus Input
      </button>
    </div>
  \`
})
export class QueryDemoComponent implements AfterViewInit {
  @ViewChild('myInput') inputEl!: ElementRef;

  ngAfterViewInit() {
    console.log('Input element:', this.inputEl.nativeElement);
  }

  focusInput() {
    this.inputEl.nativeElement.focus();
  }
}`,
  comparison: {
    junior: `// ❌ Direct DOM access
document.querySelector('#myInput').focus();`,
    senior: `// ✅ Angular way
@ViewChild('myInput') input!: ElementRef;
this.input.nativeElement.focus();`
  },
  interview: {
    questions: [
      {
        q: "When is ViewChild available?",
        a: "After ngAfterViewInit lifecycle hook. Before that, it's undefined."
      }
    ]
  }
};

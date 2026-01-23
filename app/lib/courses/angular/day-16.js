export const day16 = {
  day: 16,
  title: "Content Projection: ng-content & Templates",
  intro: "Build reusable components that accept custom content. Master ng-content, ng-template, and advanced projection patterns.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 16. **Content Projection** lets you create flexible components that accept custom HTML from parents."
      },
      {
        type: "challenge",
        instruction: "Create a Card component that accepts custom header and body content.",
        buggyCode: `// ❌ Hardcoded content
@Component({
  template: \`
    <div class="card">
      <h3>Title</h3>
      <p>Content</p>
    </div>
  \`
})`,
        solutionCode: `// ✅ Flexible with ng-content
@Component({
  template: \`
    <div class="card">
      <div class="header">
        <ng-content select="[header]"></ng-content>
      </div>
      <div class="body">
        <ng-content select="[body]"></ng-content>
      </div>
    </div>
  \`
})
// Usage: <app-card>
//   <h3 header>Custom Title</h3>
//   <p body>Custom content</p>
// </app-card>`,
        verifyOutput: "ng-content",
        successMessage: "Perfect! Now your Card component is reusable with any content.",
        hint: "Use <ng-content select=\"[selector]\"> for multi-slot projection."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📦 1. Single Slot Projection</h3>
<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm">
<pre class="text-gray-800 dark:text-gray-100">
// Component
@Component({
  template: \`<div class="wrapper"><ng-content></ng-content></div>\`
})

// Usage
<app-wrapper>
  <p>This content is projected!</p>
</app-wrapper>
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 2. Multi-Slot Projection</h3>
<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-purple-500">
<pre class="text-gray-800 dark:text-gray-100">
@Component({
  template: \`
    <header><ng-content select="[header]"></ng-content></header>
    <main><ng-content select="[body]"></ng-content></main>
    <footer><ng-content select="[footer]"></ng-content></footer>
  \`
})
</pre>
</div>
`,
  code: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  template: \`
    <div class="border border-gray-700 rounded-xl overflow-hidden bg-gray-800">
      <div class="p-4 border-b border-gray-700 bg-gray-750">
        <ng-content select="[header]"></ng-content>
      </div>
      <div class="p-4">
        <ng-content select="[body]"></ng-content>
      </div>
      <div class="p-4 border-t border-gray-700 bg-gray-750">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  \`
})
export class CardComponent {}

@Component({
  selector: 'app-projection-demo',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">📦 Content Projection</h2>
      
      <app-card>
        <h3 header class="text-xl font-bold">Custom Header</h3>
        <p body>This is projected body content!</p>
        <button footer class="px-4 py-2 bg-blue-600 rounded">Action</button>
      </app-card>
    </div>
  \`
})
export class ProjectionDemoComponent {}`,
  comparison: {
    junior: `// ❌ Hardcoded
<div class="card">
  <h3>{{ title }}</h3>
</div>`,
    senior: `// ✅ Flexible
<div class="card">
  <ng-content></ng-content>
</div>`
  },
  interview: {
    questions: [
      {
        q: "What's the difference between @Input and ng-content?",
        a: "@Input passes data. ng-content projects entire DOM nodes/components. Use ng-content for flexible layouts."
      }
    ]
  }
};

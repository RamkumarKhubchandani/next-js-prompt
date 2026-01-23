export const day13 = {
  day: 13,
  title: "Directives: Structural & Attribute Directives",
  intro: "Directives are Angular's way to manipulate the DOM. Learn to create custom structural and attribute directives.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 13. **Directives** are instructions for the DOM. Structural directives change the structure (@if, @for). Attribute directives change appearance or behavior."
      },
      {
        type: "talk",
        message: "You've been using built-in directives. Now you'll create your own custom ones."
      },
      {
        type: "challenge",
        instruction: "Create a custom attribute directive that highlights an element on hover.",
        buggyCode: `// ❌ Inline styles (not reusable)
<div (mouseenter)="highlight()" (mouseleave)="unhighlight()">
  Hover me
</div>`,
        solutionCode: `// ✅ Reusable directive
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  el = inject(ElementRef);
  
  @HostListener('mouseenter')
  onEnter() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
  
  @HostListener('mouseleave')
  onLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}

// Usage: <div appHighlight>Hover me</div>`,
        verifyOutput: "@HostListener",
        successMessage: "Perfect! Now you can apply this behavior to any element with appHighlight.",
        hint: "Use @HostListener to listen to DOM events on the host element."
      },
      {
        type: "ask",
        question: "What's the difference between a structural and attribute directive?",
        options: [
          "They're the same",
          "Structural directives change DOM structure (add/remove elements). Attribute directives change appearance/behavior.",
          "Attribute directives are faster",
          "Structural directives are deprecated"
        ],
        correctAnswer: "Structural directives change DOM structure (add/remove elements). Attribute directives change appearance/behavior.",
        feedback: {
          success: "Exactly! Structural = structure (@if, @for). Attribute = styling/behavior (ngClass, custom directives).",
          error: "Think about what they do. Structural adds/removes DOM nodes. Attribute modifies existing ones."
        }
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 1. Two Types of Directives</h3>

<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
    <h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Structural Directives</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
      Change the DOM structure by adding or removing elements.
    </p>
    <code class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block">
      @if, @for, @switch, @defer
    </code>
  </div>

  <div class="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl">
    <h4 class="font-bold text-green-700 dark:text-green-400 mb-2">Attribute Directives</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
      Change the appearance or behavior of existing elements.
    </p>
    <code class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block">
      ngClass, ngStyle, custom directives
    </code>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 2. Creating Attribute Directives</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Attribute directives use <code>@Directive</code> decorator and can access the host element via <code>ElementRef</code>.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input() appTooltip = '';
  el = inject(ElementRef);
  
  @HostListener('mouseenter')
  show() {
    // Show tooltip
  }
  
  @HostListener('mouseleave')
  hide() {
    // Hide tooltip
  }
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔥 3. Host Bindings & Listeners</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Directives can bind to host element properties and listen to events.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-purple-500">
<pre class="text-gray-800 dark:text-gray-100">
@Directive({ selector: '[appClickTracker]' })
export class ClickTrackerDirective {
  @HostBinding('class.clicked') isClicked = false;
  
  @HostListener('click')
  onClick() {
    this.isClicked = true;
    console.log('Element clicked!');
  }
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 4. Common Use Cases</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Validation:</strong> Custom form validators</li>
  <li><strong class="text-brand-primary">Accessibility:</strong> Auto-focus, ARIA attributes</li>
  <li><strong class="text-brand-primary">Behavior:</strong> Click outside, lazy load images</li>
  <li><strong class="text-brand-primary">Styling:</strong> Conditional classes, themes</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common Mistakes</h3>
<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Direct DOM Manipulation</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Use Renderer2 instead of directly accessing nativeElement for SSR safety.</p>
  </div>
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Overusing Directives</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">If it's complex logic, use a component instead.</p>
  </div>
</div>
`,
  code: `import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom Highlight Directive
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';
  private el = inject(ElementRef);

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight(this.appHighlight);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    if (color) {
      console.log(\`✨ Highlighted with color: \${color}\`);
    }
  }
}

// Custom Click Counter Directive
@Directive({
  selector: '[appClickCounter]',
  standalone: true
})
export class ClickCounterDirective {
  private clicks = 0;

  @HostListener('click')
  onClick() {
    this.clicks++;
    console.log(\`🖱️ Element clicked \${this.clicks} times\`);
  }
}

@Component({
  selector: 'app-directive-demo',
  standalone: true,
  imports: [CommonModule, HighlightDirective, ClickCounterDirective],
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">🎯 Custom Directives Demo</h2>
      
      <div class="space-y-4 mb-6">
        <div
          appHighlight="lightblue"
          class="p-4 bg-gray-800 rounded-xl border border-gray-700 cursor-pointer transition"
        >
          <p class="font-bold mb-2">Hover Highlight (Blue)</p>
          <p class="text-sm text-gray-400">
            Uses <code class="text-yellow-400">appHighlight</code> directive
          </p>
        </div>

        <div
          appHighlight="lightgreen"
          class="p-4 bg-gray-800 rounded-xl border border-gray-700 cursor-pointer transition"
        >
          <p class="font-bold mb-2">Hover Highlight (Green)</p>
          <p class="text-sm text-gray-400">
            Same directive, different color input
          </p>
        </div>

        <div
          appClickCounter
          class="p-4 bg-gray-800 rounded-xl border border-gray-700 cursor-pointer transition hover:border-purple-500"
        >
          <p class="font-bold mb-2">Click Counter</p>
          <p class="text-sm text-gray-400">
            Click me and check the console! Uses <code class="text-yellow-400">appClickCounter</code>
          </p>
        </div>

        <div
          appHighlight="pink"
          appClickCounter
          class="p-4 bg-gray-800 rounded-xl border border-gray-700 cursor-pointer transition"
        >
          <p class="font-bold mb-2">Combined Directives</p>
          <p class="text-sm text-gray-400">
            Both directives applied to the same element!
          </p>
        </div>
      </div>

      <div class="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <p class="text-xs text-blue-400 mb-2">💡 Directive Benefits</p>
        <ul class="text-sm text-gray-300 space-y-1">
          <li>• Reusable across components</li>
          <li>• Composable (multiple directives per element)</li>
          <li>• Clean separation of concerns</li>
        </ul>
      </div>
    </div>
  \`
})
export class DirectiveDemoComponent {
  constructor() {
    console.log('--- 🎯 Custom Directives Demo ---');
    console.log('Hover over elements to see highlight directive');
    console.log('Click elements to see click counter directive');
  }
}`,
  comparison: {
    junior: `// ❌ Inline event handlers everywhere
<div (mouseenter)="highlight()" (mouseleave)="unhighlight()">
  Item 1
</div>
<div (mouseenter)="highlight()" (mouseleave)="unhighlight()">
  Item 2
</div>`,
    senior: `// ✅ Reusable directive
@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  @HostListener('mouseenter') onEnter() { ... }
  @HostListener('mouseleave') onLeave() { ... }
}

// Usage: <div appHighlight>Item</div>`
  },
  interview: {
    questions: [
      {
        q: "When should you use a directive vs a component?",
        a: "Use directives for behavior/styling without a template. Use components when you need a template/view. If it has HTML structure, it's a component."
      },
      {
        q: "Why use Renderer2 instead of direct DOM access?",
        a: "Renderer2 is platform-agnostic and works with SSR, Web Workers, and native mobile. Direct DOM access (nativeElement) only works in browsers."
      },
      {
        q: "Can you apply multiple directives to one element?",
        a: "Yes! Directives are composable. You can apply as many as you need to a single element."
      }
    ]
  }
};

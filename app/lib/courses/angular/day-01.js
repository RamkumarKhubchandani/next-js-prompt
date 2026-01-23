export const day01 = {
  day: 1,
  title: "Mental Model: Standalone & Signals",
  intro: "Welcome to Modern Angular. Forget modules. Forget Zone.js. Today, we build with Standalone Components and Signals—the reactive glue of the future.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Welcome to Angular! I'm your AI Architect. We aren't learning 'Old Angular'. We are doing **Modern Angular** (v18+)."
      },
      {
        type: "talk",
        message: "First rule: **Everything is a Component**. And every Component should be **Standalone**. No more `NgModule` boilerplate."
      },
      {
        type: "challenge",
        instruction: "This component is stuck in the past. It references `AppModule`. Make it **standalone**.",
        buggyCode: `// ❌ Legacy Style
@Component({
  selector: 'app-root',
  template: '<h1>Hello {{ name }}</h1>',
})
export class AppComponent {
  name = 'Angular';
}`,
        solutionCode: `// ✅ Modern Standalone
@Component({
  selector: 'app-root',
  standalone: true,
  template: '<h1>Hello {{ name }}</h1>',
  imports: [] // Add other components here directly!
})
export class AppComponent {
  name = 'Angular';
}`,
        verifyOutput: "standalone: true",
        successMessage: "Perfect. `standalone: true` is the default now. You import what you need, right where you need it.",
        hint: "Add `standalone: true` and an empty `imports: []` array to the component decorator."
      },
      {
        type: "talk",
        message: "Second rule: **Reactivity is explicit**. In the past, Angular guessed when to update (Zone.js). Now, we use **Signals**."
      },
      {
        type: "challenge",
        instruction: "Change this standard variable into a **Signal**. Signals tell Angular exactly when to update the DOM.",
        buggyCode: `import { Component } from '@angular/core';

@Component({ ... })
export class Counter {
  // ❌ Tries to rely on magic change detection
  count = 0;

  increment() {
    this.count++;
  }
}`,
        solutionCode: `import { Component, signal } from '@angular/core';

@Component({ ... })
export class Counter {
  // ✅ Precise, fine-grained reactivity
  count = signal(0);

  increment() {
    this.count.update(c => c + 1);
  }
}`,
        verifyOutput: "signal(0)",
        successMessage: "Boom. ⚡ Signals are atomic units of state. Changing one updates ONLY the DOM node that uses it.",
        hint: "Use `signal(0)` and update it with `.update(val => val + 1)`."
      },
      {
        type: "ask",
        question: "Why do we prefer Signals over standard variables in modern Angular?",
        options: [
          "They are faster to type",
          "They define a dependency graph, allowing fine-grained updates without checking the whole tree",
          "They look like React Hooks",
          "They are required for all templates"
        ],
        correctAnswer: "They define a dependency graph, allowing fine-grained updates without checking the whole tree",
        feedback: {
          success: "Exactly. Signals let Angular know PRECISELY what changed. No guessing.",
          error: "It's about the Dependency Graph. We want surgical updates, not full-tree checks."
        }
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🚀 1. The "Standalone" Mental Model</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
In the past, Angular required "Modules" (NgModules) to group code. It was confusing boilerplate. 
</p>
<p class="mb-6 text-gray-600 dark:text-gray-300">
<strong>Modern Angular</strong> (v15+) is <strong>Standalone</strong>. 
A component is self-contained. It imports exactly what it needs (CommonModule, other components, etc.) in its own <code>imports</code> array.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-brand-primary">
<pre class="text-gray-800 dark:text-white">
@Component({
  standalone: true, // <--- The Golden Ticket
  imports: [CommonModule, UserProfileComponent], 
  // ...
})
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 2. Signals: The Heart of Reactivity</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Standard variables (<code>count = 0</code>) are dumb. They don't notify anyone when they change. Angular used to rely on "Zone.js" to monkey-patch the browser and guess when to check for changes.
</p>
<p class="mb-6 text-gray-600 dark:text-gray-300">
<strong>Signals</strong> are smart boxes. 📦
When you change the value inside, the box notifies everyone watching it.
</p>

<ul class="list-disc list-inside space-y-3 text-gray-600 dark:text-light-300 mb-8">
  <li><strong class="text-brand-primary">Write:</strong> <code>count.set(5)</code> or <code>count.update(n => n + 1)</code></li>
  <li><strong class="text-brand-primary">Read:</strong> <code>count()</code> (Always call it like a function!)</li>
  <li><strong class="text-brand-primary">Compute:</strong> <code>double = computed(() => count() * 2)</code></li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common "Junior" Mistakes</h3>
<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">The "Zone" Trap</h4>
    <p class="text-sm">Relying on standard variables and hoping the UI updates. If you change a variable in a <code>setTimeout</code> or 3rd party lib, Angular might miss it.</p>
  </div>
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Module Spaghetti</h4>
    <p class="text-sm">Still creating <code>SharedModule</code> or <code>FeatureModule</code>. Stop it. Use Standalone Components.</p>
  </div>
</div>
`,
  code: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-playground',
  standalone: true,
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-4">🚦 Signal Traffic</h2>
      
      <div class="flex items-center gap-4 mb-6">
        <button (click)="decrement()" class="px-4 py-2 bg-red-500 rounded hover:bg-red-600">-</button>
        <span class="text-4xl font-mono">{{ count() }}</span>
        <button (click)="increment()" class="px-4 py-2 bg-green-500 rounded hover:bg-green-600">+</button>
      </div>

      <div class="p-4 bg-gray-800 rounded-lg">
        <p class="text-gray-400 text-sm">Computed Values (Update Automatically!)</p>
        <p>Double: <strong class="text-brand-primary">{{ double() }}</strong></p>
        <p>Status: <strong [class.text-green-400]="isPositive()" [class.text-red-400]="!isPositive()">
          {{ isPositive() ? 'Positive' : 'Non-Positive' }}
        </strong></p>
      </div>
    </div>
  \`
})
export class PlaygroundComponent {
  // 1. Define State (The Source of Truth)
  count = signal(0);

  // 2. Define Derived State (The Consequence)
  // Computed signals update ONLY when their dependencies (count) change.
  double = computed(() => this.count() * 2);
  isPositive = computed(() => this.count() > 0);

  constructor() {
    // 📢 For this Playground Demo:
    // We'll simulate clicks automatically so you see the console light up!
    effect(() => {
        console.log('[Effect] Count is: ' + this.count() + ' | Double: ' + this.double());
    });

    console.log("--- 🏁 Auto-Driving Component ---");
    setTimeout(() => {
        console.log("▶️ Incrementing...");
        this.increment();
    }, 1000);
    
    setTimeout(() => {
        console.log("▶️ Incrementing again...");
        this.increment();
    }, 2000);

    setTimeout(() => {
        console.log("◀️ Decrementing...");
        this.decrement();
    }, 3000);
  }

  increment() {
    this.count.update(v => v + 1);
  }

  decrement() {
    this.count.update(v => v - 1);
  }
}`,
  comparison: {
    junior: `// ❌ Implicit & Magic
count = 0;
get double() { 
  // re-runs on EVERY change detection cycle 😱
  console.log('Calculating...');
  return this.count * 2; 
}`,
    senior: `// ✅ Explicit & Reactive
count = signal(0);
// Cached! Only re-runs when count changes. ⚡
double = computed(() => this.count() * 2);`
  },
  interview: {
    questions: [
      {
        q: "What is the difference between a Signal and an Observable (RxJS)?",
        a: "Signals are for synchronous state (holding a value). Observables are for asynchronous streams (events over time). Angular uses Signals for the View and RxJS for complex events/http."
      }
    ]
  }
};

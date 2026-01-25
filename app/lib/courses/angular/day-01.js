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
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🚀 1. The "Standalone" Mental Model</h3>

<div class="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8">
  <h4 class="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">Why Standalone?</h4>
  <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
    For years, Angular forced you to wrap every component in an <code>NgModule</code>. It was "boilerplate hell" — you couldn't just use a component; you had to declare it, export it, and import its module elsewhere.
    <br><br>
    <strong>Standalone components fix this.</strong> They are self-sufficient. They carry their own dependencies. This enables:
  </p>
  <ul class="list-disc list-inside mt-3 space-y-1 text-gray-700 dark:text-gray-300">
    <li><strong>Tree-shaking:</strong> Unused code is easier to remove.</li>
    <li><strong>Laziness:</strong> Easier to lazy-load single components.</li>
    <li><strong>Simplicity:</strong> No more "SharedModule" spaghetti.</li>
  </ul>
</div>

<p class="mb-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
  Think of a Standalone Component as a backpacker. It carries exactly what it needs (imports) in its own backpack. It doesn't rely on a "tour bus" (Module) to bring its supplies.
</p>

<div class="bg-gray-100 dark:bg-[#1e1e1e] p-6 rounded-xl border border-gray-200 dark:border-gray-800 mb-10 shadow-lg">
  <div class="flex justify-between items-center mb-4">
    <span class="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">The Modern Standard</span>
    <span class="px-2 py-1 text-xs font-bold bg-green-100 text-green-700 rounded full">Angular 15+</span>
  </div>
<pre class="font-mono text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
@Component({
  <span class="text-purple-600 dark:text-purple-400">standalone: true,</span> <span class="text-gray-500">// 1. The Flag</span>
  selector: 'app-user',
  <span class="text-purple-600 dark:text-purple-400">imports: [CommonModule, ButtonComponent],</span> <span class="text-gray-500">// 2. Its Dependencies</span>
  template: \`...\`
})
export class UserComponent {}
</pre>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 2. Signals: The Heart of Reactivity</h3>

<p class="mb-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
  This is the biggest shift in Angular's history. Before Signals, Angular used <strong>Zone.js</strong>. Zone.js was like a paranoid security guard—every time <em>anything</em> happened (click, timeout, fetch), it checked <em>every single component</em> in the app to see if it changed.
</p>

<p class="mb-8 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
  <strong>Signals change the game.</strong> Instead of check-everything, we move to a "Push" model. A Signal is a reactive value producer. When it changes, it notifies <em>only</em> the specific listeners (like a specific text node in the DOM) that care about it.
</p>

<div class="grid md:grid-cols-3 gap-6 mb-10">
    <div class="p-6 bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm hover:shadow-md transition-shadow">
        <h4 class="text-xl font-bold text-brand-primary mb-3">1. Write</h4>
        <div class="bg-gray-100 dark:bg-black/30 p-3 rounded-lg font-mono text-xs mb-3 text-gray-800 dark:text-gray-300">
            count.set(5)<br>
            count.update(n => n + 1)
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Use <code>.set()</code> for direct values or <code>.update()</code> to modify based on current value.</p>
    </div>

    <div class="p-6 bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm hover:shadow-md transition-shadow">
        <h4 class="text-xl font-bold text-green-500 mb-3">2. Read</h4>
        <div class="bg-gray-100 dark:bg-black/30 p-3 rounded-lg font-mono text-xs mb-3 text-gray-800 dark:text-gray-300">
            {{ count() }}<br>
            const v = this.count()
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Signals are getters. <strong>Always call them like a function!</strong> Accessing <code>count</code> (without parens) just gives you the signal object, not the value.</p>
    </div>

    <div class="p-6 bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm hover:shadow-md transition-shadow">
        <h4 class="text-xl font-bold text-purple-500 mb-3">3. Compute</h4>
        <div class="bg-gray-100 dark:bg-black/30 p-3 rounded-lg font-mono text-xs mb-3 text-gray-800 dark:text-gray-300">
            double = computed(() => count() * 2)
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400"><strong>The Magic.</strong> Derived state that is cached and auto-updates only when dependency changes. Never manually update derived state again.</p>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚠️ Common "Junior" Mistakes</h3>
<div class="grid md:grid-cols-2 gap-6 mb-12">
  <div class="p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl">
    <div class="flex items-center gap-3 mb-3">
        <div class="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>
        </div>
        <h4 class="font-bold text-red-800 dark:text-red-300">The "Zone" Trap</h4>
    </div>
    <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        Still thinking in "variables". <br>
        <code>count = 0</code> is just a number. Angular doesn't know when it changes unless Zone.js catches it. <br>
        <strong>Fix:</strong> Use <code>count = signal(0)</code>. Be explicit.
    </p>
  </div>
  
  <div class="p-6 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-xl">
    <div class="flex items-center gap-3 mb-3">
        <div class="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 2v7.31"/><path d="M4 2v7.31"/><path d="M20 2v7.31"/><path d="M12 22v-8.31"/><path d="m7 22 5-5 5 5"/></svg>
        </div>
        <h4 class="font-bold text-yellow-800 dark:text-yellow-300">Module Spaghetti</h4>
    </div>
    <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        Creating <code>SharedModule</code> or <code>FeatureModule</code> out of habit. <br>
        <strong>Fix:</strong> Stop. Delete them. Import components directly where you use them. It's cleaner and faster.
    </p>
  </div>
</div>
`,
  code: `import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-playground',
  standalone: true,
  template: \`
    <div class="p-8 bg-gray-950 text-white rounded-2xl border border-gray-800 shadow-2xl space-y-8">
      
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-gray-800 pb-6">
        <div>
           <h2 class="text-3xl font-black bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">🚦 Signal Power</h2>
           <p class="text-gray-400 mt-1">Reactive State Management</p>
        </div>
        <div class="text-xs font-mono px-3 py-1 bg-gray-900 rounded-full border border-gray-800 text-gray-500">
            Runtime: Angular 18
        </div>
      </div>
      
      <!-- Interactive Area -->
      <div class="flex items-center justify-center gap-8 py-4">
        <button (click)="decrement()" 
            class="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 border border-red-500/20 text-2xl font-bold">
            −
        </button>
        
        <div class="relative group">
            <div class="absolute -inset-2 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div class="relative px-8 py-4 bg-gray-900 rounded-lg border border-gray-800 text-center min-w-[140px]">
                <span class="block text-5xl font-black tracking-tighter">{{ count() }}</span>
                <span class="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Current Value</span>
            </div>
        </div>

        <button (click)="increment()" 
            class="w-12 h-12 flex items-center justify-center rounded-full bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all active:scale-95 border border-green-500/20 text-2xl font-bold">
            +
        </button>
      </div>

      <!-- Computed Values Panel -->
      <div class="grid grid-cols-2 gap-4">
        <div class="p-5 bg-gray-900/50 rounded-xl border border-gray-800">
            <p class="text-gray-500 text-xs uppercase font-bold tracking-widest mb-2">Computed: Double</p>
            <p class="text-2xl font-bold text-purple-400">{{ double() }}</p>
            <p class="text-xs text-gray-600 mt-2">Updates automatically when count changes</p>
        </div>
        
        <div class="p-5 bg-gray-900/50 rounded-xl border border-gray-800">
            <p class="text-gray-500 text-xs uppercase font-bold tracking-widest mb-2">Computed: Is Positive?</p>
            <div class="flex items-center gap-2 mt-1">
                <span class="w-3 h-3 rounded-full" 
                    [class.bg-green-500]="isPositive()" 
                    [class.bg-red-500]="!isPositive()"
                    [class.shadow-[0_0_10px_rgba(34,197,94,0.5)]]="isPositive()"
                    [class.shadow-[0_0_10px_rgba(239,68,68,0.5)]]="!isPositive()">
                </span>
                <span class="text-xl font-bold" 
                    [class.text-green-400]="isPositive()" 
                    [class.text-red-400]="!isPositive()">
                    {{ isPositive() ? 'Yes' : 'No' }}
                </span>
            </div>
             <p class="text-xs text-gray-600 mt-2">Derived boolean logic</p>
        </div>
      </div>
    </div>
  \`
})
export class PlaygroundComponent {
  // 1. The Source of Truth (Signal)
  count = signal(0);

  // 2. Computed Values (Reactive Dependencies)
  // These update ONLY when 'count' updates.
  double = computed(() => this.count() * 2);
  isPositive = computed(() => this.count() >= 0);

  constructor() {
    // 3. Effect (Side Effects)
    // Runs whenever any signal read inside it changes.
    // Useful for logging, syncing to localStorage, etc.
    effect(() => {
        console.log(\`[Effect] State changed! Count: \${this.count()}, Double: \${this.double()}\`);
    });
  }

  increment() {
    // Best Practice: Use .update() when using the previous value
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

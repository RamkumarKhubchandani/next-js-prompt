export const day02 = {
  day: 2,
  title: "Modern Inputs & Outputs (Signal Inputs)",
  intro: "The `@Input` decorator is history. Today you learn **Signal Inputs**—cleaner, safer, and faster component communication.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 2. Let's talk about **Data Flow**. In the past, we used decorators like `@Input()`. They were clunky."
      },
      {
        type: "talk",
        message: "Angular v17.1 introduced **Signal Inputs**. They are functions, not decorators. They automatically give you a signal."
      },
      {
        type: "challenge",
        instruction: "This component uses the old `@Input` syntax. Refactor it to use the new `input.required()` function.",
        buggyCode: `import { Component, Input } from '@angular/core';

@Component({ ... })
export class UserCard {
  // ❌ Old School
  @Input() name: string = '';
  @Input() age: number | undefined;
}`,
        solutionCode: `import { Component, input } from '@angular/core';

@Component({ ... })
export class UserCard {
  // ✅ Modern Signal Inputs
  name = input.required<string>(); // No initial value needed!
  age = input<number>(0);          // Optional with default
}`,
        verifyOutput: "input.required",
        successMessage: "Yes! `name()` is now a signal. If the parent changes the name, your signal updates instantly.",
        hint: "Use `name = input.required<string>();` instead of the decorator."
      },
      {
        type: "ask",
        question: "What is the major benefit of input signals like `userId = input.required()`?",
        options: [
          "They look cooler",
          "They integrate perfectly with computed signals (e.g. `computed(() => fetch(userId()))`)",
          "They allow you to use var instead of let",
          "They remove type safety"
        ],
        correctAnswer: "They integrate perfectly with computed signals (e.g. `computed(() => fetch(userId()))`)",
        feedback: {
          success: "Exactly. Because inputs are now signals, you can derive state from them effortlessly using `computed()`.",
          error: "Think about reactivity. Inputs are now sources of truth in your dependency graph."
        }
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🚀 1. The Death of @Input</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
The old <code>@Input()</code> decorator had issues. It didn't handle updates well (you needed <code>ngOnChanges</code>), and it wasn't reactive by default.
</p>
<p class="mb-6 text-gray-600 dark:text-light-300">
<strong>Signal Inputs</strong> solve this. They are reactive signals that hold the value passed from the parent.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-purple-500">
<pre class="text-gray-800 dark:text-gray-100">
// ❌ Old
@Input() userId: string;

// ✅ New
userId = input.required&lt;string&gt;();
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 2. Why Signal Inputs Win</h3>
<ul class="list-disc list-inside space-y-3 text-gray-600 dark:text-light-300 mb-8">
  <li><strong class="text-brand-primary">Derived State:</strong> Easily create <code>computed</code> values based on inputs.</li>
  <li><strong class="text-brand-primary">Typesafety:</strong> <code>input.required()</code> ensures you never forget to pass a prop.</li>
  <li><strong class="text-brand-primary">No more ngOnChanges:</strong> You don't need lifecycle hooks to react to changes. Just use <code>computed</code> or <code>effect</code>.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📢 3. Modern Outputs</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Outputs have also been modernized. Instead of <code>@Output() event = new EventEmitter()</code>, we use the <code>output()</code> function.
</p>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-8 font-mono text-sm">
<pre class="text-gray-800 dark:text-gray-100">
// ✅ Modern Output
onDelete = output&lt;string&gt;();

// Emit
this.onDelete.emit("id-123");
</pre>
</div>
`,
  code: `import { Component, input, computed, output } from '@angular/core';

@Component({
  selector: 'app-user-badge',
  standalone: true,
  template: \`
    <div class="border border-gray-700 p-4 rounded-xl bg-gray-900 text-white">
      <!-- Read signal by calling it -->
      <h3 class="text-xl font-bold">{{ fullName() }}</h3>
      
      <p class="text-gray-400">Role: {{ role() }}</p>
      
      <button (click)="promote()" class="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">
        Promote (Emit Event)
      </button>
    </div>
  \`
})
export class UserBadgeComponent {
  // 1. Inputs (Sources)
  firstName = input.required<string>();
  lastName = input.required<string>();
  role = input<string>('Guest'); // Default value

  // 2. Output (Event)
  roleChange = output<string>();

  // 3. Computed (Derived)
  fullName = computed(() => this.firstName() + ' ' + this.lastName());

  constructor() {
     // 📢 Simulation for Playground
     // In a real app, the parent sets these. Here we simulate it.
     
     // Hack: Cast to 'any' to write to inputs in this playground
     // Normally inputs are read-only!
     setTimeout(() => {
         console.log('--- 👨‍👩‍👧 Parent simulates passing inputs ---');
         this.firstName['set']('John');
         this.lastName['set']('Doe');
         console.log('Inputs Set: John Doe');
     }, 500);

     setTimeout(() => {
         console.log('--- 🔄 User clicks Promot ---');
         this.promote();
     }, 2000);
  }

  promote() {
    // Emit event to parent
    console.log('📢 Emitting roleChange: Admin');
    this.roleChange.emit('Admin');
  }
}`,
  comparison: {
    junior: `// ❌ Lifecycle Hell
@Input() firstName: string;
@Input() lastName: string;
fullName: string;

ngOnChanges() {
  this.fullName = this.firstName + ' ' + this.lastName;
}`,
    senior: `// ✅ Reactive Simplicity
firstName = input.required<string>();
lastName = input.required<string>();
// Updates automatically! 
fullName = computed(() => this.firstName() + ' ' + this.lastName());`
  },
  interview: {
    questions: [
      {
        q: "How do you make an Input required in modern Angular?",
        a: "Use `input.required<Type>()`. This enforces at build-time that the parent must pass the property."
      }
    ]
  }
};

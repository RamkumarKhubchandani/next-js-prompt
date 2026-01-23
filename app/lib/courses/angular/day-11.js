export const day11 = {
  day: 11,
  title: "Performance: Change Detection & OnPush",
  intro: "Performance isn't optional. Learn how Angular's change detection works and how to make it blazing fast with OnPush strategy.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 11. **Performance** starts with understanding Change Detection. Angular checks if your data changed and updates the DOM."
      },
      {
        type: "talk",
        message: "By default, Angular checks EVERY component on EVERY event. OnPush strategy makes it check only when inputs change or events fire."
      },
      {
        type: "challenge",
        instruction: "This component re-renders on every change detection cycle. Add OnPush strategy to optimize it.",
        buggyCode: `// ❌ Default strategy (checks on every CD cycle)
@Component({
  selector: 'app-user-card',
  template: \`
    <div>{{ user.name }}</div>
    <div>{{ expensiveCalculation() }}</div>
  \`
})
export class UserCard {
  @Input() user: User;
  
  expensiveCalculation() {
    console.log('💸 Expensive calculation running!');
    return this.user.name.toUpperCase();
  }
}`,
        solutionCode: `// ✅ OnPush strategy (checks only when inputs change)
@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div>{{ user.name }}</div>
    <div>{{ displayName }}</div>
  \`
})
export class UserCard {
  @Input() user: User;
  
  // Computed once when input changes
  displayName = computed(() => this.user.name.toUpperCase());
}`,
        verifyOutput: "OnPush",
        successMessage: "Perfect! Now this component only checks when @Input changes. Massive performance win.",
        hint: "Add changeDetection: ChangeDetectionStrategy.OnPush to the @Component decorator."
      },
      {
        type: "ask",
        question: "What triggers change detection in an OnPush component?",
        options: [
          "Every setTimeout in the app",
          "Input reference changes, events from the template, or manual markForCheck()",
          "Only when you call detectChanges()",
          "Never, it's static"
        ],
        correctAnswer: "Input reference changes, events from the template, or manual markForCheck()",
        feedback: {
          success: "Exactly! OnPush components are smart: they check when inputs change (by reference), when template events fire, or when you manually trigger it.",
          error: "Think about immutability. OnPush checks when input REFERENCES change, not when properties inside mutate."
        }
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 1. How Change Detection Works</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Angular checks your component tree for changes. By default, it checks EVERY component on EVERY async event (click, setTimeout, HTTP response).
</p>

<div class="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 p-4 rounded-xl mb-8">
  <p class="text-sm text-yellow-800 dark:text-yellow-300">
    <strong>Default Strategy:</strong> Check all components, always. Simple but slow for large apps.
  </p>
</div>

<div class="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 p-4 rounded-xl mb-8">
  <p class="text-sm text-green-800 dark:text-green-300">
    <strong>OnPush Strategy:</strong> Check only when inputs change (by reference) or events fire in the template. Fast!
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🚀 2. OnPush Requirements</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
To use OnPush safely, follow these rules:
</p>

<ul class="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Immutable Inputs:</strong> Always pass new references, don't mutate objects.</li>
  <li><strong class="text-brand-primary">Use Signals:</strong> Signals trigger updates automatically.</li>
  <li><strong class="text-brand-primary">Async Pipe:</strong> Automatically marks component for check when Observable emits.</li>
</ul>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
// ❌ Mutation (OnPush won't detect)
this.user.name = 'New Name';

// ✅ New reference (OnPush detects)
this.user = { ...this.user, name: 'New Name' };
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔥 3. Signals + OnPush = Perfect Match</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Signals automatically trigger change detection. Combined with OnPush, you get surgical updates.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Counter {
  count = signal(0);
  
  increment() {
    this.count.update(v => v + 1); // Triggers CD automatically!
  }
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 4. Performance Checklist</h3>
<div class="space-y-3 mb-8">
  <div class="flex items-start gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
    <span class="text-green-500 text-xl">✓</span>
    <div>
      <p class="font-bold text-gray-900 dark:text-white">Use OnPush everywhere possible</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Especially for list items and presentational components</p>
    </div>
  </div>
  <div class="flex items-start gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
    <span class="text-green-500 text-xl">✓</span>
    <div>
      <p class="font-bold text-gray-900 dark:text-white">Track by in @for loops</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Prevents unnecessary DOM recreation</p>
    </div>
  </div>
  <div class="flex items-start gap-3 p-3 bg-gray-100 dark:text-gray-800 rounded-xl">
    <span class="text-green-500 text-xl">✓</span>
    <div>
      <p class="font-bold text-gray-900 dark:text-white">Lazy load routes</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Smaller initial bundle = faster load</p>
    </div>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common Mistakes</h3>
<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Mutating Objects</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">OnPush checks references. Mutating properties won't trigger updates.</p>
  </div>
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Heavy Computations in Templates</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Use computed() or pipes instead of calling functions in templates.</p>
  </div>
</div>
`,
  code: `import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-perf-demo',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush, // 🚀 OnPush!
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">⚡ Performance Demo (OnPush)</h2>
      
      <div class="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <p class="text-xs text-blue-400 mb-2">🎯 Change Detection Strategy</p>
        <p class="text-sm text-gray-300">
          This component uses <code class="text-yellow-400">OnPush</code>.
          It only checks when signals update or events fire.
        </p>
      </div>

      <div class="mb-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold">Tasks</h3>
          <div class="flex gap-2 text-sm">
            <span class="px-2 py-1 bg-green-500/20 text-green-400 rounded">
              {{ completedCount() }} done
            </span>
            <span class="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
              {{ tasks().length }} total
            </span>
          </div>
        </div>

        <div class="space-y-2">
          @for (task of tasks(); track task.id) {
            <div 
              class="flex items-center gap-3 p-3 rounded-xl transition"
              [class]="task.done 
                ? 'bg-green-500/10 border border-green-500/30' 
                : 'bg-gray-700 border border-gray-600'"
            >
              <input
                type="checkbox"
                [checked]="task.done"
                (change)="toggleTask(task.id)"
                class="w-5 h-5 rounded"
              />
              <span [class.line-through]="task.done" [class.text-gray-500]="task.done">
                {{ task.title }}
              </span>
            </div>
          }
        </div>

        <button
          (click)="addTask()"
          class="mt-4 w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Add Random Task
        </button>
      </div>

      <div class="p-4 bg-gray-800 rounded-xl border border-gray-700">
        <p class="text-sm text-gray-400 mb-2">Check Detection Count:</p>
        <p class="text-3xl font-bold text-green-400">{{ cdCount() }}</p>
        <p class="text-xs text-gray-500 mt-2">
          With OnPush, this only increments when signals update or events fire.
        </p>
      </div>
    </div>
  \`
})
export class PerfDemoComponent {
  tasks = signal<Task[]>([
    { id: 1, title: 'Learn OnPush', done: true },
    { id: 2, title: 'Use Signals', done: false },
    { id: 3, title: 'Optimize Performance', done: false }
  ]);

  cdCount = signal(0);
  
  completedCount = computed(() => 
    this.tasks().filter(t => t.done).length
  );

  constructor() {
    console.log('--- ⚡ Performance Demo (OnPush) ---');
    console.log('Change detection only runs when needed!');
    
    // Track CD cycles
    this.cdCount.update(v => v + 1);
    
    setTimeout(() => {
      console.log('▶️ Auto-toggling first task...');
      this.toggleTask(1);
    }, 1500);
  }

  toggleTask(id: number) {
    // ✅ Create new array (immutable update)
    this.tasks.update(tasks =>
      tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
    this.cdCount.update(v => v + 1);
    console.log(\`✓ Task \${id} toggled (CD triggered)\`);
  }

  addTask() {
    const newTask: Task = {
      id: Date.now(),
      title: \`Task \${this.tasks().length + 1}\`,
      done: false
    };
    
    this.tasks.update(tasks => [...tasks, newTask]);
    this.cdCount.update(v => v + 1);
    console.log('✓ Task added (CD triggered)');
  }
}`,
  comparison: {
    junior: `// ❌ Default CD + mutation
export class TaskList {
  tasks: Task[] = [];
  
  toggle(id: number) {
    const task = this.tasks.find(t => t.id === id);
    task.done = !task.done; // Mutation!
  }
}`,
    senior: `// ✅ OnPush + immutable updates
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
export class TaskList {
  tasks = signal<Task[]>([]);
  
  toggle(id: number) {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  }
}`
  },
  interview: {
    questions: [
      {
        q: "What's the difference between Default and OnPush change detection?",
        a: "Default checks all components on every async event. OnPush only checks when @Input references change, template events fire, or async pipe emits."
      },
      {
        q: "How do Signals work with OnPush?",
        a: "Signals automatically mark components for check when they update. This makes OnPush + Signals the perfect combination for performance."
      },
      {
        q: "When should you NOT use OnPush?",
        a: "When you have complex third-party integrations that mutate data, or when the immutability discipline is too hard for your team. Start with OnPush, fall back if needed."
      }
    ]
  }
};

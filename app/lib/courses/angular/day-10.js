export const day10 = {
  day: 10,
  title: "Advanced State Management",
  intro: "Stop prop-drilling. Start managing state like a pro using the <strong>SignalStore Pattern</strong>. Architect your app for scale.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 10. State is the heart of your app. Managing it with just services is good, but managing it with a <strong>Store Pattern</strong> is better."
      },
      {
        type: "talk",
        message: "We're going to build a 'Mini-SignalStore' - a Service that holds state privately and exposes <strong>signals</strong> for reading and <strong>methods</strong> for writing."
      },
      {
        type: "challenge",
        instruction: "This service exposes a writable signal directly. This is dangerous! Refactor it to expose a `readonly` signal and an action method.",
        buggyCode: `export class TaskService {
  // ❌ Dangerous! Anyone can set() this from anywhere.
  tasks = signal<Task[]>([]);
}`,
        solutionCode: `export class TaskService {
  // 🔒 Private Writable
  private _tasks = signal<Task[]>([]);
  
  // 📢 Public Read-only
  tasks = this._tasks.asReadonly();
  
  // ⚡ Explicit Action
  addTask(t: Task) {
    this._tasks.update(tasks => [...tasks, t]);
  }
}`,
        verifyOutput: "asReadonly",
        successMessage: "Secure! Now your components can only READ state, not break it. All logic stays inside the service.",
        hint: "Use `private _signal` and `public readonly = _signal.asReadonly()`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🏛️ 1. The SignalStore Pattern</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
You don't always need NgRx. You can build a robust store using just a Service class. Follow the <strong>Read-Only / Action</strong> contract.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-gray-50 dark:bg-dark-900/40 p-5 rounded-xl border border-gray-200 dark:border-dark-700">
        <h4 class="font-bold text-gray-800 dark:text-white mb-3">The Contract</h4>
        <ul class="text-sm space-y-2 text-gray-600 dark:text-gray-400">
            <li>🔒 <strong>State:</strong> Private writable signal</li>
            <li>📢 <strong>Selectors:</strong> Public computed/readonly signals</li>
            <li>⚡ <strong>Actions:</strong> Public methods that update state</li>
        </ul>
    </div>
    <div class="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-900/30">
        <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-3">Implementation</h4>
        <pre class="text-xs font-mono text-blue-900 dark:text-blue-200">
// Selectors (derived state)
count = computed(() => this.tasks().length);
done = computed(() => 
  this.tasks().filter(t => t.completed)
);
        </pre>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔄 2. Unidirectional Data Flow</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Data flows DOWN (Signals). Events flow UP (Actions). This loop makes your app predictable and easy to debug.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10 text-center font-mono text-sm text-gray-800 dark:text-gray-200">
Action() ➔ Service.update() ➔ Signal Changes ➔ UI Re-renders
</div>
`,
  code: `import { Component, Injectable, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- MODELS ---
type TaskStatus = 'TODO' | 'DOING' | 'DONE';

interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}

// --- STORE (Service) ---
@Injectable({ providedIn: 'root' })
export class BoardStore {
    // 1. STATE (Private)
    private _tasks = signal<Task[]>([
        { id: 1, title: 'Learn Angular Signals', status: 'DONE' },
        { id: 2, title: 'Master RxJS', status: 'DOING' },
        { id: 3, title: 'Build a Kanban Board', status: 'TODO' },
        { id: 4, title: 'Deploy to Production', status: 'TODO' }
    ]);

    // 2. SELECTORS (Public Read-only)
    // We derive 3 columns from 1 list!
    todo = computed(() => this._tasks().filter(t => t.status === 'TODO'));
    doing = computed(() => this._tasks().filter(t => t.status === 'DOING'));
    done = computed(() => this._tasks().filter(t => t.status === 'DONE'));

    // 3. ACTIONS (Methods)
    moveTask(id: number, newStatus: TaskStatus) {
        this._tasks.update(tasks => 
            tasks.map(t => t.id === id ? { ...t, status: newStatus } : t)
        );
    }

    addTask(title: string) {
        const newTask: Task = { 
            id: Date.now(), 
            title, 
            status: 'TODO' 
        };
        this._tasks.update(t => [...t, newTask]);
    }
}

// --- COMPONENTS ---

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="max-w-4xl mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <h2 class="text-2xl font-bold text-white mb-2">📋 Kanban Board</h2>
        <p class="text-gray-400 mb-8 text-sm">One State Signal -> Three Derived Columns</p>

        <div class="grid grid-cols-3 gap-4 h-[400px]">
            
            <!-- TODO COLUMN -->
            <div class="bg-gray-900 rounded-xl p-4 border border-gray-800 flex flex-col">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-gray-400 uppercase tracking-wider text-xs">Todo</h3>
                    <span class="bg-gray-800 text-gray-500 text-[10px] px-2 py-1 rounded-full">{{ store.todo().length }}</span>
                </div>
                
                <div class="space-y-2 overflow-y-auto flex-1">
                    @for (task of store.todo(); track task.id) {
                        <div class="p-3 bg-gray-800 rounded-lg border border-gray-700 group hover:border-gray-500 transition-colors cursor-default">
                            <p class="font-medium text-sm">{{ task.title }}</p>
                            <div class="mt-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                <button (click)="store.moveTask(task.id, 'DOING')" class="text-[10px] bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded text-white">
                                    Start →
                                </button>
                            </div>
                        </div>
                    }
                    <button (click)="store.addTask('New Task ' + (store.todo().length + 1))" class="w-full py-2 border border-dashed border-gray-700 text-gray-500 rounded-lg text-xs hover:bg-gray-800 transition-colors">
                        + Add Task
                    </button>
                </div>
            </div>

            <!-- DOING COLUMN -->
            <div class="bg-blue-900/10 rounded-xl p-4 border border-blue-900/30 flex flex-col">
                 <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-blue-400 uppercase tracking-wider text-xs">In Progress</h3>
                    <span class="bg-blue-900/30 text-blue-300 text-[10px] px-2 py-1 rounded-full">{{ store.doing().length }}</span>
                </div>
                 <div class="space-y-2 overflow-y-auto flex-1">
                     @for (task of store.doing(); track task.id) {
                        <div class="p-3 bg-blue-900/20 rounded-lg border border-blue-800 group hover:border-blue-600 transition-colors">
                            <p class="font-medium text-sm">{{ task.title }}</p>
                            <div class="mt-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                <button (click)="store.moveTask(task.id, 'TODO')" class="text-[10px] text-gray-400 hover:text-white">← Back</button>
                                <button (click)="store.moveTask(task.id, 'DONE')" class="text-[10px] bg-green-600 hover:bg-green-500 px-2 py-1 rounded text-white">Done →</button>
                            </div>
                        </div>
                    }
                 </div>
            </div>

            <!-- DONE COLUMN -->
            <div class="bg-green-900/10 rounded-xl p-4 border border-green-900/30 flex flex-col">
                 <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-green-400 uppercase tracking-wider text-xs">Done</h3>
                     <span class="bg-green-900/30 text-green-300 text-[10px] px-2 py-1 rounded-full">{{ store.done().length }}</span>
                </div>
                 <div class="space-y-2 overflow-y-auto flex-1">
                      @for (task of store.done(); track task.id) {
                        <div class="p-3 bg-green-900/20 rounded-lg border border-green-800 opacity-60 hover:opacity-100 transition-opacity">
                            <p class="font-medium text-sm line-through text-gray-400">{{ task.title }}</p>
                             <div class="mt-2 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                                <button (click)="store.moveTask(task.id, 'DOING')" class="text-[10px] text-gray-500 hover:text-white">← Undo</button>
                            </div>
                        </div>
                    }
                 </div>
            </div>

        </div>
    </div>
  \`
})
export class KanbanBoard {
    store = inject(BoardStore);
}`,
  comparison: {
    junior: `// ❌ Prop Drilling
<app-list [tasks]="tasks" (update)="onUpdate($event)"></app-list>
// And then passing it down 3 more levels...`,
    senior: `// ✅ Signal Store
// Child component access state directly:
store = inject(BoardStore);
// UI updates automatically via Signals.`
  },
  interview: {
    questions: [
      {
        q: "Why use computed() signals?",
        a: "They automatically update when their dependencies change AND they are memoized (cached). They are perfect for filtering derived state like 'tasks.filter(...)' without re-running on every CD cycle."
      },
      {
        q: "What is the Container/Presenter pattern?",
        a: "A pattern where 'Smart' components manage state (inject stores) and 'Dumb' components just take inputs and emit outputs."
      }
    ]
  }
};

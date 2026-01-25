export const day10 = {
    day: 10,
    title: "Advanced State Management",
    intro: "State management is the #1 source of complexity in frontend apps. Today, we master the <strong>SignalStore Pattern</strong>—a simple, scalable way to manage data without the massive boilerplate of Redux or NgRx.",
    aiSession: {
        enabled: true,
        steps: [
            {
                type: "talk",
                message: "Day 10. Redux is overkill for 95% of Angular apps. NgRx is great but boilerplate-heavy."
            },
            {
                type: "talk",
                message: "The **SignalStore** pattern is lighter. It uses a Service with private signals (`_state`) and public computed signals (`state`)."
            },
            {
                type: "challenge",
                instruction: "This store exposes the raw signal, allowing any component to modify it. Fix it by making the signal private and exposing a readonly version.",
                buggyCode: `// ❌ Unsafe Store
@Injectable()
export class UserStore {
  // Anyone can set() this!
  users = signal<User[]>([]); 
}`,
                solutionCode: `// ✅ Safe Store
@Injectable()
export class UserStore {
  // 1. Private State
  private _users = signal<User[]>([]);

  // 2. Read-only Public API
  users = this._users.asReadonly();

  // 3. Controlled Actions
  addUser(user: User) {
    this._users.update(u => [...u, user]);
  }
}`,
                verifyOutput: "asReadonly",
                successMessage: "Secure! Now components can read `users()` but must use `addUser()` to change them. This is true Encapsulation.",
                hint: "Use `private _name` and `name = this._name.asReadonly()`."
            }
        ]
    },
    content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🏛️ 1. Why do we need a "Store"?</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
When you pass data between components using only <code>@Input</code> (down) and <code>@Output</code> (up), you create "Prop Drilling Hell". If a Deeply Nested Component needs to update the Main Header, you have to pass an event up 5 layers.
</p>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
A <strong>Store</strong> is a dedicated Service that acts as the "Single Source of Truth". Think of it as a Database running in the user's browser.
</p>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔒 2. The SignalStore Contract</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
We don't need external libraries for most apps. We can build a perfect store using Angular Signals. We just need to follow one rule: <strong>The Service owns the State.</strong>
</p>

<div class="grid md:grid-cols-3 gap-6 mb-10">
    <div class="bg-gray-50 dark:bg-dark-900/40 p-5 rounded-xl border border-gray-200 dark:border-dark-700">
        <h4 class="font-bold text-gray-800 dark:text-white mb-3">1. State (Private)</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">The raw data.</p>
        <code class="text-xs bg-black/10 dark:bg-black/30 px-2 py-1 rounded">private _users = signal([]);</code>
        <p class="text-xs text-red-500 mt-2">Never expose this directly!</p>
    </div>
    <div class="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-900/30">
        <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-3">2. Selectors (Public)</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Read-only views or computed values.</p>
        <code class="text-xs bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">users = this._users.asReadonly();</code>
    </div>
    <div class="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-xl border border-purple-200 dark:border-purple-900/30">
        <h4 class="font-bold text-purple-800 dark:text-purple-300 mb-3">3. Actions (Public)</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Methods to modify state.</p>
        <code class="text-xs bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded">addUser(u) { ... }</code>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔄 3. Unidirectional Data Flow</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
This pattern enforces a strict loop. Components can NEVER change data directly. They must ask the Store to do it.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10 text-center font-mono text-sm text-gray-800 dark:text-gray-200 shadow-inner">
Component calls Action() ➔ Store Updates Signal ➔ View Re-renders Automatically
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

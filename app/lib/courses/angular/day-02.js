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
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🚀 1. The "Signal" Revolution</h3>
<div class="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8">
  <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
    <strong>Component Communication has evolved.</strong> <br>
    For 7+ years, we used <code>@Input()</code>. It wasn't reactive. To react to changes, you had to use <code>ngOnChanges</code> (complex) or <code>setters</code> (verbose).
    <br><br>
    <strong>Signal Inputs</strong> change inputs from <em>static values</em> to <em>live streams of values</em>.
  </p>
</div>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="p-5 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl relative overflow-hidden">
        <div class="absolute top-0 right-0 p-2 bg-red-100 dark:bg-red-900/50 rounded-bl-xl text-xs font-bold text-red-600 dark:text-red-400">THE OLD WAY</div>
        <h4 class="font-bold text-gray-900 dark:text-white mb-3">Decorator Based</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
@Input() userId: string;

// To react to changes:
ngOnChanges(changes) {
  if (changes.userId) {
    this.loadUser(this.userId);
  }
}
        </pre>
        <p class="mt-3 text-sm text-red-600 dark:text-red-400 font-medium">❌ Verbose & Imperative</p>
    </div>

    <div class="p-5 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl relative overflow-hidden">
        <div class="absolute top-0 right-0 p-2 bg-green-100 dark:bg-green-900/50 rounded-bl-xl text-xs font-bold text-green-600 dark:text-green-400">THE NEW WAY</div>
        <h4 class="font-bold text-gray-900 dark:text-white mb-3">Signal Based</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
userId = input.required&lt;string&gt;();

// To react to changes:
user = computed(() => 
  this.loadUser(this.userId())
);
        </pre>
        <p class="mt-3 text-sm text-green-600 dark:text-green-400 font-medium">✅ Declarative & Reactive</p>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 2. Why Signal Inputs Win</h3>
<div class="space-y-4 mb-10">
    <div class="flex gap-4">
        <div class="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold shrink-0">1</div>
        <div>
            <h5 class="font-bold text-gray-900 dark:text-white">Derived State</h5>
            <p class="text-sm text-gray-600 dark:text-gray-400">Because inputs are signals, you can use <code>computed()</code> to create new values derived immediately from inputs. No manual updates.</p>
        </div>
    </div>
    <div class="flex gap-4">
        <div class="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold shrink-0">2</div>
        <div>
            <h5 class="font-bold text-gray-900 dark:text-white">Type Safety</h5>
            <p class="text-sm text-gray-600 dark:text-gray-400"><code>input.required()</code> forces the parent to pass the property. If they don't, the app won't build.</p>
        </div>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📢 3. Modern Outputs</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Outputs have also been modernized. Instead of the class-based <code>@Output()</code> decorator, we now use the <code>output()</code> function. It's conceptually cleaner and aligns with the "functional" direction of Angular.
</p>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-purple-500">
<pre class="text-gray-800 dark:text-gray-100">
// ✅ Modern Output
onDelete = output&lt;string&gt;();

// Emit
this.onDelete.emit("id-123");
</pre>
</div>
`,
  code: `import { Component, input, computed, output, signal, effect } from '@angular/core';

// -------------------------------------------------------------------------
// 💡 CONFIGURATION FOR RUNNER (Ignore this line)
// selector: 'app-root'
// -------------------------------------------------------------------------

/**
 * 1️⃣ CHILD COMPONENT (The Lesson Focus)
 * This component receives data via Signal Inputs.
 * It is "Pure" and relies on the parent for data.
 */
@Component({
  selector: 'app-user-badge',
  standalone: true,
  template: \`
    <div class="relative p-6 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:border-gray-600">
      
      <!-- Role Badge -->
      <div class="absolute top-0 right-0 px-3 py-1 bg-gray-800 text-[10px] font-bold uppercase tracking-widest text-gray-400 rounded-bl-xl border-l border-b border-gray-700">
        {{ role() }}
      </div>

      <div class="flex items-center gap-4">
        <!-- Initials Avatar -->
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[2px] shadow-lg shadow-purple-900/20">
            <div class="w-full h-full bg-gray-950 rounded-full flex items-center justify-center text-xl font-bold text-white">
                {{ initials() }}
            </div>
        </div>

        <div>
            <h3 class="text-xl font-bold text-white mb-1">{{ fullName() }}</h3>
            <p class="text-xs text-gray-500 font-mono bg-gray-800 px-2 py-0.5 rounded inline-block">ID: {{ userId() }}</p>
        </div>
      </div>

      <!-- Action Area -->
      <div class="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
        <span class="text-xs text-green-500 font-bold flex items-center gap-1" [class.opacity-0]="!isActive()">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Active
        </span>

        <button (click)="onPromote()" 
            class="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10">
            Promote to Admin
        </button>
      </div>
    </div>
  \`
})
class UserBadgeComponent {
  // ✅ Signal Inputs (Read-Only from logic perspective, set by Parent)
  userId = input.required<string>();
  firstName = input.required<string>();
  lastName = input.required<string>();
  role = input<string>('Guest');

  // ✅ Signal Output (Event Emitter)
  promote = output<void>();

  // ✅ Computed Signals (Derived State)
  fullName = computed(() => \`\${this.firstName()} \${this.lastName()}\`);
  
  initials = computed(() => 
    (this.firstName()[0] + this.lastName()[0]).toUpperCase()
  );

  // Just a visual helper
  isActive = signal(true);

  onPromote() {
    // Emit event to parent
    this.promote.emit();
  }
}

/**
 * 2️⃣ PARENT COMPONENT (The Driver)
 * This component acts as the "App". It holds the actual state 
 * and passes it down to the child via [inputs].
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserBadgeComponent],
  template: \`
    <div class="p-8 bg-gray-950 min-h-screen font-sans text-gray-300">
      
      <div class="max-w-md mx-auto space-y-8">
        <header class="text-center space-y-2">
            <h1 class="text-2xl font-bold text-white tracking-tight">Parent-Child Data Flow</h1>
            <p class="text-xs text-gray-500">The parent controls the state. The child reacts.</p>
        </header>

        <!-- CHILD INSTANCE -->
        <app-user-badge 
            [userId]="currentUser().id" 
            [firstName]="currentUser().first" 
            [lastName]="currentUser().last" 
            [role]="currentRole()"
            (promote)="handlePromote()" 
        />

        <!-- PARENT CONTROLS -->
        <div class="p-5 bg-gray-900/50 border border-gray-800 rounded-xl space-y-4">
            <p class="text-[10px] uppercase font-bold text-gray-600 tracking-widest">Parent Controls</p>
            
            <div class="grid grid-cols-2 gap-3">
                <button (click)="nextUser()" 
                    class="py-2.5 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs font-bold text-white border border-gray-700 transition-colors">
                    🔄 Swap User
                </button>
                <button (click)="resetRole()" 
                    class="py-2.5 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs font-bold text-red-400 border border-gray-700 transition-colors">
                    Reset Role
                </button>
            </div>

            <!-- Log Console -->
            <div class="bg-black/50 p-3 rounded-lg border border-gray-800 font-mono text-[10px] h-20 overflow-y-auto custom-scrollbar">
                <div *ngFor="let log of logs()" class="mb-1">
                    <span class="text-gray-500">[{{ log.time }}]</span> 
                    <span [class.text-green-400]="log.type === 'action'" [class.text-blue-400]="log.type === 'event'"> {{ log.msg }}</span>
                </div>
                <div *ngIf="logs().length === 0" class="text-gray-700 italic">Waiting for events...</div>
            </div>
        </div>

      </div>
    </div>
  \`
})
export class PlaygroundComponent {
  // State
  users = [
    { id: 'u-1', first: 'Sarah', last: 'Connor' },
    { id: 'u-2', first: 'John', last: 'Wick' },
    { id: 'u-3', first: 'Tony', last: 'Stark' }
  ];
  
  currentUser = signal(this.users[0]);
  currentRole = signal('Guest');
  logs = signal<{time: string, msg: string, type: string}[]>([]);

  nextUser() {
    const idx = this.users.indexOf(this.currentUser());
    const next = this.users[(idx + 1) % this.users.length];
    this.currentUser.set(next);
    this.addLog('Parent changed user to ' + next.first, 'action');
  }

  resetRole() {
    this.currentRole.set('Guest');
    this.addLog('Parent reset role to Guest', 'action');
  }

  handlePromote() {
    this.addLog('📢 Child emitted (promote) event!', 'event');
    
    // Parent decides whether to approve the change
    setTimeout(() => {
        this.currentRole.set('Admin');
        this.addLog('✅ Parent approved: Role updated to Admin', 'action');
    }, 500);
  }

  addLog(msg: string, type: 'action' | 'event') {
    const time = new Date().toLocaleTimeString().split(' ')[0];
    this.logs.update(l => [{time, msg, type}, ...l].slice(0, 50));
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


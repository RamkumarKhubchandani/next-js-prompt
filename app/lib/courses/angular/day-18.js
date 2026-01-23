export const day18 = {
  day: 18,
  title: "Lifecycle Hooks: Component Lifecycle Management",
  intro: "Master Angular's lifecycle hooks to run code at specific moments in a component's life.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 18. **Lifecycle Hooks** are Angular's way of letting you run code at specific moments: creation, update, destruction."
      },
      {
        type: "challenge",
        instruction: "Add proper cleanup in ngOnDestroy to prevent memory leaks.",
        buggyCode: `// ❌ Subscription leak
ngOnInit() {
  this.http.get('/api/data').subscribe(data => {
    this.data = data;
  }); // Never unsubscribed!
}`,
        solutionCode: `// ✅ Proper cleanup
private subscription?: Subscription;

ngOnInit() {
  this.subscription = this.http.get('/api/data').subscribe(data => {
    this.data = data;
  });
}

ngOnDestroy() {
  this.subscription?.unsubscribe();
}`,
        verifyOutput: "ngOnDestroy",
        successMessage: "Perfect! Always clean up subscriptions to prevent memory leaks.",
        hint: "Store the subscription and unsubscribe in ngOnDestroy."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔄 Lifecycle Hooks</h3>
<div class="space-y-3 mb-8">
  <div class="p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
    <code class="font-bold text-blue-700 dark:text-blue-400">ngOnInit</code>
    <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">Initialize component, fetch data</p>
  </div>
  <div class="p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl">
    <code class="font-bold text-green-700 dark:text-green-400">ngOnChanges</code>
    <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">React to @Input changes</p>
  </div>
  <div class="p-3 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-xl">
    <code class="font-bold text-purple-700 dark:text-purple-400">ngOnDestroy</code>
    <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">Cleanup subscriptions, timers</p>
  </div>
  <div class="p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl">
    <code class="font-bold text-yellow-700 dark:text-yellow-400">ngAfterViewInit</code>
    <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">Access ViewChild elements</p>
  </div>
</div>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-red-500">
<pre class="text-gray-800 dark:text-gray-100">
export class MyComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.service.data$.subscribe(...);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Modern Alternative: takeUntilDestroyed</h3>
<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export class MyComponent {
  constructor() {
    this.service.data$.pipe(
      takeUntilDestroyed() // Auto-unsubscribes on destroy!
    ).subscribe(...);
  }
}
</pre>
</div>
`,
  code: `import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">🔄 Lifecycle Hooks Demo</h2>
      
      <div class="space-y-4">
        <div class="p-4 bg-gray-800 rounded-xl border border-gray-700">
          <p class="text-sm text-gray-400 mb-2">Component Status:</p>
          <p class="text-lg font-bold text-green-400">{{ status() }}</p>
        </div>

        <div class="p-4 bg-gray-800 rounded-xl border border-gray-700">
          <p class="text-sm text-gray-400 mb-2">Lifecycle Events:</p>
          <div class="space-y-1 max-h-40 overflow-y-auto">
            @for (event of events(); track $index) {
              <p class="text-xs text-gray-300">{{ event }}</p>
            }
          </div>
        </div>
      </div>

      <div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <p class="text-xs text-blue-400 mb-2">💡 Check Console</p>
        <p class="text-sm text-gray-300">
          All lifecycle hooks are logged to the console with timestamps.
        </p>
      </div>
    </div>
  \`
})
export class LifecycleComponent implements OnInit, OnDestroy {
  status = signal('Initializing...');
  events = signal<string[]>([]);
  private timer?: any;

  constructor() {
    this.logEvent('Constructor called');
    console.log('🏗️ Constructor: Component instance created');
  }

  ngOnInit() {
    this.logEvent('ngOnInit called');
    console.log('✅ ngOnInit: Component initialized');
    this.status.set('Running');
    
    // Simulate periodic updates
    this.timer = setInterval(() => {
      this.logEvent('Timer tick');
    }, 2000);
  }

  ngOnDestroy() {
    this.logEvent('ngOnDestroy called');
    console.log('🗑️ ngOnDestroy: Cleaning up...');
    
    if (this.timer) {
      clearInterval(this.timer);
      console.log('✓ Timer cleared');
    }
    
    this.status.set('Destroyed');
  }

  private logEvent(event: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.events.update(events => [...events, \`[\${timestamp}] \${event}\`]);
  }
}`,
  comparison: {
    junior: `// ❌ Constructor for initialization
constructor() {
  this.fetchData(); // Too early!
}`,
    senior: `// ✅ ngOnInit for initialization
ngOnInit() {
  this.fetchData(); // Perfect timing
}`
  },
  interview: {
    questions: [
      {
        q: "Why use ngOnInit instead of constructor?",
        a: "Constructor is for DI only. ngOnInit runs after inputs are set and component is fully initialized."
      },
      {
        q: "What's the order of lifecycle hooks?",
        a: "constructor → ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit → ngAfterContentChecked → ngAfterViewInit → ngAfterViewChecked → ngOnDestroy"
      },
      {
        q: "When should you use ngOnDestroy?",
        a: "To clean up subscriptions, clear timers, detach event listeners - anything that could cause memory leaks."
      }
    ]
  }
};

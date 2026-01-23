export const day08 = {
  day: 8,
  title: "Dependency Injection: The Modern Way",
  intro: "DI is Angular's superpower. Inject services, configure providers, and understand hierarchical injection like a pro.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 8. **Dependency Injection** (DI) is how Angular gives your components what they need. No more manual `new Service()`."
      },
      {
        type: "talk",
        message: "Modern Angular uses the `inject()` function. It's cleaner than constructor injection and works in more places."
      },
      {
        type: "challenge",
        instruction: "Refactor this constructor-based injection to use the modern `inject()` function.",
        buggyCode: `import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({ ... })
export class UserList {
  // ❌ Old: Constructor injection
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.userService.loadUsers();
  }
}`,
        solutionCode: `import { Component, inject } from '@angular/core';
import { UserService } from './user.service';

@Component({ ... })
export class UserList {
  // ✅ Modern: inject() function
  private userService = inject(UserService);
  
  constructor() {
    this.userService.loadUsers();
  }
}`,
        verifyOutput: "inject(UserService)",
        successMessage: "Perfect! `inject()` is more flexible and works in initializers, not just constructors.",
        hint: "Use `private userService = inject(UserService);` at the class level."
      },
      {
        type: "ask",
        question: "What is the benefit of providedIn: 'root' for services?",
        options: [
          "It makes the service faster",
          "It creates a single instance shared across the entire app (singleton)",
          "It prevents the service from being injected",
          "It makes the service tree-shakeable if unused"
        ],
        correctAnswer: "It makes the service tree-shakeable if unused",
        feedback: {
          success: "Correct! providedIn: 'root' makes services tree-shakeable AND creates a singleton. Angular removes unused services from the bundle.",
          error: "Think about bundle size. providedIn: 'root' enables tree-shaking AND creates a singleton."
        }
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💉 1. The inject() Function</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
The <code>inject()</code> function is the modern way to get dependencies. It's cleaner and more flexible than constructor injection.
</p>
<ul class="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Works Everywhere:</strong> Use in class fields, functions, and even outside constructors.</li>
  <li><strong class="text-brand-primary">Type-Safe:</strong> Full TypeScript support without manual type annotations.</li>
  <li><strong class="text-brand-primary">Composable:</strong> Easy to create custom injection functions.</li>
</ul>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
// Modern DI
export class MyComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  // Can even use in computed!
  user = toSignal(this.http.get('/api/user'));
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🌳 2. Hierarchical Injection</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Angular has multiple injector levels. Understanding this is crucial for state management.
</p>

<div class="bg-gray-100 dark:text-gray-300 dark:bg-gray-800 p-4 rounded-xl mb-8">
  <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
    <li><strong>Root:</strong> App-wide singleton (providedIn: 'root')</li>
    <li><strong>Route:</strong> Scoped to a route and its children</li>
    <li><strong>Component:</strong> New instance per component</li>
  </ul>
</div>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
// Root-level service (singleton)
@Injectable({ providedIn: 'root' })
export class AuthService {}

// Component-level service (new instance per component)
@Component({
  providers: [CartService] // Fresh instance!
})
export class CheckoutComponent {
  cart = inject(CartService);
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 3. Custom Injection Tokens</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Use <code>InjectionToken</code> for configuration or non-class dependencies.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm">
<pre class="text-gray-800 dark:text-gray-100">
// Define token
export const API_URL = new InjectionToken&lt;string&gt;('API_URL');

// Provide value
bootstrapApplication(App, {
  providers: [
    { provide: API_URL, useValue: 'https://api.example.com' }
  ]
});

// Inject
apiUrl = inject(API_URL);
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common Mistakes</h3>
<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Providing Everywhere</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Don't provide the same service in multiple places unless you want multiple instances.</p>
  </div>
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Circular Dependencies</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Service A injects Service B which injects Service A. Use forwardRef or redesign.</p>
  </div>
</div>
`,
  code: `import { Component, Injectable, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Service with providedIn: 'root' (singleton)
@Injectable({ providedIn: 'root' })
export class CounterService {
  count = signal(0);
  
  increment() {
    this.count.update(v => v + 1);
    console.log(\`📊 Global counter: \${this.count()}\`);
  }
}

@Component({
  selector: 'app-di-demo',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">💉 Dependency Injection Demo</h2>
      
      <div class="space-y-4">
        <div class="p-4 bg-gray-800 rounded-xl border border-gray-700">
          <p class="text-sm text-gray-400 mb-2">Global Counter (Singleton Service)</p>
          <p class="text-3xl font-bold text-green-400">{{ counter.count() }}</p>
          <button 
            (click)="counter.increment()" 
            class="mt-3 px-4 py-2 bg-green-600 rounded hover:bg-green-500"
          >
            Increment Global
          </button>
        </div>

        <div class="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <p class="text-xs text-blue-400 mb-2">💡 Tip</p>
          <p class="text-sm text-gray-300">
            This service is injected using <code class="text-yellow-400">inject(CounterService)</code>.
            It's a singleton shared across the entire app.
          </p>
        </div>

        <div class="p-4 bg-gray-800 rounded-xl border border-gray-700">
          <p class="text-sm text-gray-400 mb-2">Injection Method</p>
          <pre class="text-xs text-green-400 font-mono">counter = inject(CounterService);</pre>
        </div>
      </div>
    </div>
  \`
})
export class DIDemo {
  // Modern injection using inject()
  counter = inject(CounterService);
  
  constructor() {
    console.log('--- 💉 Dependency Injection Demo ---');
    console.log('Service injected using inject() function');
    
    setTimeout(() => {
      console.log('▶️ Auto-incrementing...');
      this.counter.increment();
    }, 1000);
    
    setTimeout(() => {
      console.log('▶️ Incrementing again...');
      this.counter.increment();
    }, 2000);
  }
}`,
  comparison: {
    junior: `// ❌ Manual instantiation (breaks DI)
export class MyComponent {
  service = new MyService(); // Don't do this!
}`,
    senior: `// ✅ Proper injection
export class MyComponent {
  service = inject(MyService);
}`
  },
  interview: {
    questions: [
      {
        q: "What's the difference between providedIn: 'root' and providing in a component?",
        a: "providedIn: 'root' creates a singleton shared app-wide and is tree-shakeable. Component providers create a new instance per component."
      },
      {
        q: "Can you use inject() outside of a component?",
        a: "Yes! inject() works in services, directives, pipes, and even in factory functions, as long as it's called within an injection context."
      },
      {
        q: "How do you inject an optional dependency?",
        a: "Use inject(Service, { optional: true }). It returns null if the service isn't provided."
      }
    ]
  }
};

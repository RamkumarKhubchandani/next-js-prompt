export const zonelessAngular = {
  title: "Zoneless Angular: Why zone.js is Finally Optional in 2026",
  description: "Angular has shed its heaviest weight. Discover how Zoneless Angular works, why it makes your apps blazing fast, and how to migrate your existing projects to this new era of fine-grained reactivity.",
  slug: "zoneless-angular",
  category: "Angular",
  type: "static",
  author: "Angular Core Contributor",
  createdAt: new Date().toISOString(),
  readTime: "35 min read",
  difficulty: "Advanced",
  image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop",
  tags: ["Angular", "Zone.js", "Performance", "Change Detection", "Signals"],
  keywords: ["Zoneless Angular", "provideExperimentalZonelessChangeDetection", "Angular 18", "Angular 19", "Angular 2026"],
  toc: [
    { id: "the-cost", label: "01. The Cost of Zone.js" },
    { id: "how-it-works", label: "02. How Zoneless Works" },
    { id: "signals-deep-dive", label: "03. Signals Deep Dive" },
    { id: "migration", label: "04. Migration Strategy" },
    { id: "real-world-examples", label: "05. Real-World Examples" },
    { id: "benchmark", label: "06. Performance Benchmarks" },
    { id: "senior-take", label: "07. Senior Engineer's Take" }
  ],
  content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. The Cost -->
        <section id="the-cost" class="scroll-mt-32">
             <div class="border-l-8 border-red-600 bg-red-50 dark:bg-red-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    The Magic Comes at a Price.
                </h1>
                <p class="text-xl md:text-2xl text-red-800 dark:text-red-200 font-light leading-relaxed">
                    For a decade, <code>zone.js</code> was Angular's defining feature—and its biggest bottleneck. 
                    <br/><br/>
                    It monkey-patched standard browser APIs (setTimeout, Promise, etc.) to know <em>when</em> to update the UI. But "magic" change detection meant checking the entire component tree for every single click.
                </p>
             </div>

             <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-8 mb-4">What Zone.js Actually Does</h3>
                <p>
                    Zone.js wraps every asynchronous operation in your application. When you call <code>setTimeout</code>, you're actually calling Zone's patched version. This allows Angular to know when async operations complete and trigger change detection.
                </p>
                <p>
                    The problem? <strong>It checks everything, every time.</strong> Even if only one component's state changed, Angular walks the entire component tree checking bindings. For a 1,000-component app, that's 1,000 checks per click.
                </p>
             </div>

             <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <div class="text-gray-400 mb-2 text-xs uppercase font-bold">Zone.js Monkey Patching Example</div>
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// What you write:
setTimeout(() => console.log('Hello'), 1000);

// What Zone.js does internally:
const originalSetTimeout = window.setTimeout;
window.setTimeout = function(fn, delay) {
  return originalSetTimeout(() => {
    fn();
    // 🔥 Trigger Angular Change Detection for ENTIRE app
    ApplicationRef.tick();
  }, delay);
};</code></pre>
             </div>

             <div class="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-xl border border-yellow-200 dark:border-yellow-900/30">
                 <h4 class="font-bold text-yellow-900 dark:text-yellow-100 mb-2">The Hidden Cost</h4>
                 <p class="text-sm text-yellow-800 dark:text-yellow-200">
                     Zone.js adds ~35KB (gzipped) to your bundle. But the real cost is runtime performance. Every async operation triggers a full change detection cycle, even if nothing changed.
                 </p>
            </div>
        </section>

        <!-- 02. How It Works -->
        <section id="how-it-works" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">02.</span>
                Enter Zoneless & Signals
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Zoneless Angular doesn't guess. It <strong>knows</strong>.
                    By relying on <span class="text-red-600 font-bold">Signals</span>, Angular receives precise notifications about exactly which node in the DOM needs to update.
                </p>
            </div>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-sm">
                <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                    <h4 class="font-bold text-gray-500 mb-2 uppercase tracking-wide">Zone.js (Global Refresh)</h4>
                    <p class="text-gray-600 dark:text-gray-400">
                        1. User clicks button.<br/>
                        2. Zone intercepts event.<br/>
                        3. Triggers <code>ApplicationRef.tick()</code>.<br/>
                        4. Checks 1,000 components dirty status.<br/>
                        5. Updates 1 text node.
                    </p>
                </div>
                 <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-900/30">
                    <h4 class="font-bold text-green-700 dark:text-green-300 mb-2 uppercase tracking-wide">Zoneless (surgical)</h4>
                    <p class="text-gray-600 dark:text-gray-400">
                        1. User clicks button.<br/>
                        2. Signal updates.<br/>
                        3. Angular updates <strong>exactly</strong> that 1 text node.<br/>
                        4. Done.
                    </p>
                </div>
            </div>

            <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <div class="text-gray-400 mb-2 text-xs uppercase font-bold">Zoneless Component Example</div>
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \\\`
    <div>
      <p>Count: {{ count() }}</p>
      <button (click)="increment()">+1</button>
    </div>
  \\\`
})
export class CounterComponent {
  // ✅ Signal-based state
  count = signal(0);

  increment() {
    this.count.update(v => v + 1);
    // No Zone.js needed! Signal notifies Angular directly
  }
}</code></pre>
             </div>
        </section>

        <!-- 03. Signals Deep Dive -->
        <section id="signals-deep-dive" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">03.</span>
                Signals Deep Dive
            </h2>
            
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-8 mb-4">How Signals Work Internally</h3>
                <p>
                    Signals are Angular's implementation of fine-grained reactivity. They maintain a dependency graph between computed values and their sources.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-900/30">
                    <h4 class="font-bold text-blue-900 dark:text-blue-100 mb-3">WritableSignal</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        The source of truth. Can be updated via <code>set()</code> or <code>update()</code>. Notifies all subscribers when changed.
                    </p>
                </div>
                <div class="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-200 dark:border-purple-900/30">
                    <h4 class="font-bold text-purple-900 dark:text-purple-100 mb-3">Computed Signal</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        Derived value that automatically recomputes when dependencies change. Memoized for performance.
                    </p>
                </div>
                <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-900/30">
                    <h4 class="font-bold text-green-900 dark:text-green-100 mb-3">Effect</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        Side-effect that runs when signals it reads change. Used for logging, analytics, etc.
                    </p>
                </div>
            </div>

            <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <div class="text-gray-400 mb-2 text-xs uppercase font-bold">Signal Types in Action</div>
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  template: \\\`
    <div>
      <p>Items: {{ items().length }}</p>
      <p>Total: \${{ total() }}</p>
      <button (click)="addItem()">Add Item</button>
    </div>
  \\\`
})
export class CartComponent {
  // 1️⃣ WritableSignal - Source of truth
  items = signal<CartItem[]>([]);

  // 2️⃣ Computed Signal - Auto-updates when items change
  total = computed(() => 
    this.items().reduce((sum, item) => sum + item.price, 0)
  );

  // 3️⃣ Effect - Runs when signals change
  constructor() {
    effect(() => {
      console.log('Cart updated:', this.items().length);
      // Could send analytics here
    });
  }

  addItem() {
    this.items.update(current => [
      ...current, 
      { id: Date.now(), price: 10 }
    ]);
    // ✅ Only 'total' recomputes, only affected DOM updates
  }
}</code></pre>
             </div>

             <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-900/30">
                 <h4 class="font-bold text-blue-900 dark:text-blue-100 mb-2">Deep Dive: The Dependency Graph</h4>
                 <p class="text-sm text-blue-800 dark:text-blue-200 mb-4">
                     When you read a signal inside a <code>computed()</code> or <code>effect()</code>, Angular automatically tracks it as a dependency. When the signal updates, only the dependent computations re-run.
                 </p>
                 <pre class="text-xs bg-white dark:bg-black p-3 rounded font-mono text-gray-800 dark:text-gray-200"><code>firstName = signal('John');
lastName = signal('Doe');
fullName = computed(() => \\\`\${this.firstName()} \${this.lastName()}\\\`);

// Dependency graph:
// firstName ──┐
//             ├──> fullName
// lastName ───┘

this.firstName.set('Jane'); // ✅ fullName recomputes
this.lastName.set('Smith');  // ✅ fullName recomputes again</code></pre>
            </div>
        </section>

        <!-- 04. Migration -->
        <section id="migration" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">04.</span>
                Migration Strategy
            </h2>
            
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-8 mb-4">Step 1: Enable Zoneless Mode</h3>
            </div>

            <div class="bg-slate-900 p-6 rounded-xl mb-6">
                <pre class="text-gray-300 text-sm font-mono overflow-x-auto"><code>// app.config.ts
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    <span class="text-green-400">provideExperimentalZonelessChangeDetection()</span> // The Magic Switch
  ]
};</code></pre>
            </div>

            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-8 mb-4">Step 2: Convert State to Signals</h3>
                <p>
                    Replace class properties with signals. This is the most time-consuming step but yields the biggest performance gains.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-200 dark:border-red-900/30">
                    <h4 class="font-bold text-red-700 dark:text-red-300 mb-4">❌ Before (Zone-based)</h4>
                    <pre class="text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap"><code>export class UserComponent {
  user: User | null = null;
  loading = false;

  async loadUser(id: string) {
    this.loading = true;
    this.user = await userService.get(id);
    this.loading = false;
    // Zone.js triggers change detection
  }
}</code></pre>
                </div>
                 <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-900/30">
                    <h4 class="font-bold text-green-700 dark:text-green-300 mb-4">✅ After (Zoneless)</h4>
                    <pre class="text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap"><code>export class UserComponent {
  user = signal<User | null>(null);
  loading = signal(false);

  async loadUser(id: string) {
    this.loading.set(true);
    const data = await userService.get(id);
    this.user.set(data);
    this.loading.set(false);
    // Signal automatically notifies Angular
  }
}</code></pre>
                </div>
            </div>

            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-8 mb-4">Step 3: Handle Third-Party Libraries</h3>
                <p>
                    Some libraries still rely on Zone.js. You have two options:
                </p>
            </div>

            <div class="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-xl border border-yellow-200 dark:border-yellow-900/30 mb-8">
                <h4 class="font-bold text-yellow-900 dark:text-yellow-100 mb-3">Option 1: Manual Change Detection</h4>
                <pre class="text-xs bg-white dark:bg-black p-3 rounded font-mono text-gray-800 dark:text-gray-200"><code>import { ChangeDetectorRef } from '@angular/core';

constructor(private cdr: ChangeDetectorRef) {}

someThirdPartyCallback() {
  this.data = newValue;
  this.cdr.markForCheck(); // Manually trigger update
}</code></pre>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-900/30">
                <h4 class="font-bold text-blue-900 dark:text-blue-100 mb-3">Option 2: Wrap in Signal</h4>
                <pre class="text-xs bg-white dark:bg-black p-3 rounded font-mono text-gray-800 dark:text-gray-200"><code>data = signal(initialValue);

someThirdPartyCallback() {
  this.data.set(newValue); // Signal handles change detection
}</code></pre>
            </div>

            <p class="text-gray-600 dark:text-gray-400 italic mt-6">
                Note: AsyncPipe still works! But you should prefer Signals for future-proof code.
            </p>
        </section>

        <!-- 05. Real-World Examples -->
        <section id="real-world-examples" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">05.</span>
                Real-World Examples
            </h2>

            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-8 mb-4">Example 1: Form with Validation</h3>
            </div>

            <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  template: \\\`
    <form (submit)="handleSubmit()">
      <input 
        [value]="email()" 
        (input)="email.set($any($event.target).value)"
        placeholder="Email"
      />
      @if (emailError()) {
        <p class="error">{{ emailError() }}</p>
      }
      
      <input 
        type="password"
        [value]="password()" 
        (input)="password.set($any($event.target).value)"
        placeholder="Password"
      />
      @if (passwordError()) {
        <p class="error">{{ passwordError() }}</p>
      }

      <button [disabled]="!isValid()">
        Sign Up
      </button>
    </form>
  \\\`
})
export class SignupFormComponent {
  email = signal('');
  password = signal('');

  // Computed validation - only re-runs when email changes
  emailError = computed(() => {
    const value = this.email();
    if (!value) return 'Email required';
    if (!value.includes('@')) return 'Invalid email';
    return null;
  });

  // Computed validation - only re-runs when password changes
  passwordError = computed(() => {
    const value = this.password();
    if (!value) return 'Password required';
    if (value.length < 8) return 'Min 8 characters';
    return null;
  });

  // Form validity - recomputes when either error changes
  isValid = computed(() => 
    !this.emailError() && !this.passwordError()
  );

  handleSubmit() {
    if (this.isValid()) {
      console.log('Submitting:', {
        email: this.email(),
        password: this.password()
      });
    }
  }
}</code></pre>
            </div>

            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-8 mb-4">Example 2: Real-Time Data Dashboard</h3>
            </div>

            <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: \\\`
    <div class="dashboard">
      <h2>Server Metrics</h2>
      
      <div class="metric">
        <span>CPU Usage:</span>
        <span [class.critical]="cpuUsage() > 80">
          {{ cpuUsage() }}%
        </span>
      </div>

      <div class="metric">
        <span>Memory:</span>
        <span [class.critical]="memoryUsage() > 90">
          {{ memoryUsage() }}%
        </span>
      </div>

      <div class="status">
        Status: <strong>{{ systemStatus() }}</strong>
      </div>
    </div>
  \\\`
})
export class DashboardComponent {
  cpuUsage = signal(45);
  memoryUsage = signal(62);

  // Computed status based on metrics
  systemStatus = computed(() => {
    const cpu = this.cpuUsage();
    const mem = this.memoryUsage();
    
    if (cpu > 80 || mem > 90) return '🔴 Critical';
    if (cpu > 60 || mem > 70) return '🟡 Warning';
    return '🟢 Healthy';
  });

  constructor() {
    // Effect for alerts - runs when status changes
    effect(() => {
      const status = this.systemStatus();
      if (status.includes('Critical')) {
        this.sendAlert('System critical!');
      }
    });

    // Simulate real-time updates
    setInterval(() => {
      this.cpuUsage.set(Math.random() * 100);
      this.memoryUsage.set(Math.random() * 100);
      // ✅ Only affected computations re-run
      // ✅ Only changed DOM nodes update
    }, 2000);
  }

  sendAlert(message: string) {
    console.warn('ALERT:', message);
  }
}</code></pre>
            </div>
        </section>

        <!-- 06. Performance Benchmarks -->
        <section id="benchmark" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">06.</span>
                Performance Benchmarks
            </h2>

            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Real-world performance improvements from migrating a production app with 500+ components:
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div class="text-5xl font-black text-green-600 mb-2">-35KB</div>
                    <div class="text-sm font-bold text-gray-500 uppercase tracking-wide">Bundle Size</div>
                    <div class="text-xs text-gray-400 mt-2">Zone.js removed from production build</div>
                </div>
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div class="text-5xl font-black text-blue-600 mb-2">-40%</div>
                    <div class="text-sm font-bold text-gray-500 uppercase tracking-wide">Change Detection Time</div>
                    <div class="text-xs text-gray-400 mt-2">From 0.8ms to 0.48ms average</div>
                </div>
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div class="text-5xl font-black text-purple-600 mb-2">+60%</div>
                    <div class="text-sm font-bold text-gray-500 uppercase tracking-wide">Faster TTI</div>
                    <div class="text-xs text-gray-400 mt-2">Time to Interactive improved significantly</div>
                </div>
            </div>

            <div class="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 class="font-bold text-gray-900 dark:text-white mb-4">Lighthouse Score Comparison</h4>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <div class="text-xs text-gray-500 uppercase font-bold mb-2">With Zone.js</div>
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="text-sm">Performance</span>
                                <span class="font-bold text-orange-600">78</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm">First Contentful Paint</span>
                                <span class="font-bold">1.8s</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm">Time to Interactive</span>
                                <span class="font-bold">3.2s</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="text-xs text-gray-500 uppercase font-bold mb-2">Zoneless</div>
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="text-sm">Performance</span>
                                <span class="font-bold text-green-600">92</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm">First Contentful Paint</span>
                                <span class="font-bold">1.4s</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm">Time to Interactive</span>
                                <span class="font-bold">2.0s</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 07. Senior Perspective -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">07.</span>
                The Senior Engineer's Perspective
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-red-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Should you migrate today?</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    If you are starting a new project in 2026, <strong>absolutely start Zoneless</strong>. It forces you to learn Signals properly, which is the future of the framework.
                    <br/><br/>
                    For legacy apps with heavy dependency on <code>OnPush</code> hacks or libraries that assume Zone exists, proceed with caution. The performance gains are real (especially TTI and bundle size), but the refactor cost can be high.
                    <br/><br/>
                    <strong>Migration Strategy:</strong> Start with new features in Zoneless mode. Gradually convert existing components. Use feature flags to test in production with a small percentage of users first.
                </p>
            </div>
        </section>
    </div>
    `
};

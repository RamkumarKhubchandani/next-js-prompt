export const day07 = {
  day: 7,
  title: "Advanced Routing Patterns",
  intro: "Routing is more than navigation. It's state management. Master <strong>Route Inputs</strong>, <strong>Functional Guards</strong>, and the powerful <strong>CanMatch</strong>.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 7. Let's modernize your routing. Stop subscribing to `ActivatedRoute.params` manually."
      },
      {
        type: "talk",
        message: "Did you know you can bind route parameters directly to component `@Input()` signals? It's cleaner and reactive."
      },
      {
        type: "challenge",
        instruction: "Refactor this component to use **Route Inputs**. Remove the `ActivatedRoute` dependency.",
        buggyCode: `export class ProductDetail {
  id = '';
  constructor(private route: ActivatedRoute) {
    // ❌ Messy Manual Subscription
    this.route.params.subscribe(p => this.id = p['id']);
  }
}`,
        solutionCode: `export class ProductDetail {
  // ✅ Clean: Param automatically bound to Input
  id = input.required<string>();
}`,
        verifyOutput: "input.required",
        successMessage: "So much cleaner! Enable `withComponentInputBinding()` in your app config to make this work.",
        hint: "Use `id = input.required<string>()`. The router matches the input name to the path parameter."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔌 1. Route Component Inputs</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Stop polluting your components with <code>ActivatedRoute</code>. Angular can unwrap parameters, query params, and data directly into inputs.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-gray-50 dark:bg-dark-900/40 p-5 rounded-xl border border-gray-200 dark:border-dark-700">
        <h4 class="font-bold text-gray-800 dark:text-white mb-3">The Old Way</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
// 🤢 Boilerplate
constructor(route: ActivatedRoute) {
  route.params.pipe(
    map(p => p['id'])
  ).subscribe(id => ...);
}
        </pre>
    </div>
    <div class="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-900/30">
        <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-3">The New Way</h4>
        <pre class="text-xs font-mono text-blue-900 dark:text-blue-200">
// 😍 Clean & Reactive
// Matches path: 'product/:productId'
productId = input.required&lt;string&gt;();
        </pre>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">👻 2. The Ghost Guard (CanMatch)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
<code>CanActivate</code> decides if you can <strong>enter</strong> a route. <code>CanMatch</code> decides if the route <strong>exists</strong> for you.
<br>
This allows "Overloading": 2 routes with the SAME path, but different guards.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
export const routes = [
  // 👑 Admin sees this
  { path: 'dashboard', canMatch: [isAdmin], loadComponent: ...AdminDash },
  
  // 👤 User sees this (same URL!)
  { path: 'dashboard', loadComponent: ...UserDash }
];
</pre>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 3. View Transitions</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Angular 17+ integrates with the browser View Transitions API. Enable it in one line for native-like animations.
</p>
<div class="bg-gray-100 dark:bg-dark-800 p-4 rounded-xl mb-8 font-mono text-sm">
<code>provideRouter(routes, withViewTransitions())</code>
</div>
`,
  code: `import { Component, signal, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- MOCK ROUTER ARCHITECTURE ---
// In a real app, this is in app.routes.ts
type RouteConfig = {
    path: string;
    component: string;
    roleRequired?: 'admin' | 'user';
    label: string;
};

@Component({
  selector: 'app-router-demo',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="max-w-xl mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <div class="flex justify-between items-start mb-8">
            <div>
                <h2 class="text-2xl font-bold text-white mb-2">🚦 Smart Routing</h2>
                <p class="text-xs text-gray-400">CanMatch & Dynamic Layouts</p>
            </div>
            
            <!-- User Role Switcher -->
            <div class="flex bg-gray-900 p-1 rounded-lg border border-gray-800">
                <button (click)="currentUserRole.set('user')" 
                    [class.bg-blue-600]="currentUserRole() === 'user'"
                    class="px-3 py-1 text-xs rounded-md transition-all text-gray-300">User</button>
                <button (click)="currentUserRole.set('admin')"
                    [class.bg-purple-600]="currentUserRole() === 'admin'"
                    class="px-3 py-1 text-xs rounded-md transition-all text-gray-300">Admin</button>
            </div>
        </div>

        <!-- Navigation Bar -->
        <nav class="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-gray-800">
            @for (route of filteredRoutes(); track route.path) {
                <button 
                    (click)="navigate(route.path)"
                    [class.text-blue-400]="currentPath() === route.path"
                    [class.border-b-2]="currentPath() === route.path"
                    [class.border-blue-500]="currentPath() === route.path"
                    class="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all whitespace-nowrap"
                >
                    {{ route.label }}
                </button>
            }
        </nav>

        <!-- Dynamic Router Outlet Simulation -->
        <div class="bg-gray-900 rounded-xl border border-gray-800 p-1 overflow-hidden relative min-h-[300px]">
             <!-- Top Bar simulation -->
             <div class="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                <div class="flex gap-1.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div class="mx-auto text-[10px] text-gray-400 font-mono bg-gray-950 px-3 py-0.5 rounded-full flex items-center gap-2">
                    🔒 localhost:4200{{ currentPath() }}
                </div>
             </div>

             <!-- Page Content -->
             <div class="p-6">
                @if (currentPath() === '/dashboard') {
                    @if (currentUserRole() === 'admin') {
                        <!-- ADMIN DASHBOARD -->
                        <div class="animate-in zoom-in-95 duration-300">
                            <h1 class="text-3xl font-bold text-purple-400 mb-2">👑 Admin Command</h1>
                            <p class="text-gray-400 mb-6">Privileged access granted. System integrity: 100%.</p>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="bg-purple-900/20 border border-purple-500/30 p-4 rounded-xl">
                                    <div class="text-2xl font-bold text-white">9,240</div>
                                    <div class="text-xs text-purple-300">Total Users</div>
                                </div>
                                <div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl">
                                    <div class="text-2xl font-bold text-white">3</div>
                                    <div class="text-xs text-red-300">Critical Alerts</div>
                                </div>
                            </div>
                        </div>
                    } @else {
                        <!-- USER DASHBOARD -->
                        <div class="animate-in slide-in-from-right-4 duration-300">
                            <h1 class="text-3xl font-bold text-blue-400 mb-2">👋 Welcome Back</h1>
                            <p class="text-gray-400 mb-6">Here is your daily activity summary.</p>
                            <div class="p-4 bg-gray-800 rounded-xl border border-gray-700 mb-4">
                                <div class="h-2 bg-gray-700 rounded-full w-full mb-2">
                                    <div class="h-full bg-blue-500 rounded-full" style="width: 75%"></div>
                                </div>
                                <div class="flex justify-between text-xs text-gray-400">
                                    <span>Weekly Goal</span>
                                    <span>75%</span>
                                </div>
                            </div>
                        </div>
                    }
                } @else if (currentPath() === '/settings') {
                    <div class="animate-in fade-in duration-500">
                        <h1 class="text-2xl font-bold text-white mb-4">⚙️ Settings</h1>
                        <div class="space-y-3">
                            <div class="h-10 bg-gray-800 rounded-lg w-full animate-pulse"></div>
                            <div class="h-10 bg-gray-800 rounded-lg w-full animate-pulse" style="animation-delay: 100ms"></div>
                            <div class="h-10 bg-gray-800 rounded-lg w-full animate-pulse" style="animation-delay: 200ms"></div>
                        </div>
                    </div>
                } @else {
                     <div class="text-center py-20 text-gray-500">
                        <p class="text-4xl mb-4">🏠</p>
                        <h1 class="text-xl text-white font-bold">Home Page</h1>
                        <p>Select a route from the nav.</p>
                    </div>
                }
             </div>
        </div>
        
        <div class="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs">
            <strong class="text-blue-400 block mb-1">ℹ️ What's happening?</strong>
            <p class="text-gray-400">
                Both roles visit <code>/dashboard</code>, but <strong>CanMatch</strong> loads a completely different component (and layout!) based on the role. 
                <span class="text-white">Admin gets stats, User gets progress bars.</span>
            </p>
        </div>
    </div>
  \`
})
export class RouterDemo {
  currentUserRole = signal<'admin' | 'user'>('user');
  currentPath = signal('/');

  // Simulate Router Config
  allRoutes: RouteConfig[] = [
      { path: '/', component: 'Home', label: 'Home' },
      { path: '/dashboard', component: 'Dashboard', label: 'Dashboard' },
      { path: '/settings', component: 'Settings', label: 'Settings' }
  ];

  // In real Router, CanMatch would filter this internally.
  // Here we assume the same nav links exist, but the *content* changes.
  filteredRoutes = computed(() => this.allRoutes);

  navigate(path: string) {
      this.currentPath.set(path);
  }
}`,
  comparison: {
    junior: `// ❌ Route Params Hell
ngOnInit() {
  this.route.params.subscribe(params => {
    this.productId = params['id'];
    this.fetchProduct(this.productId);
  });
}`,
    senior: `// ✅ Component Inputs
// In component:
productId = input.required<string>();

// In app.config.ts:
providers: [
  provideRouter(routes, withComponentInputBinding())
]`
  },
  interview: {
    questions: [
      {
        q: "What is CanMatch used for?",
        a: "It controls whether a Route definition matches the URL. Unlike CanActivate, if CanMatch returns false, the Router keeps looking for *other* routes that match the same path. Perfect for A/B testing or Role-based routes."
      },
      {
        q: "How do you bind query params to inputs?",
        a: "Enable `withComponentInputBinding()`. Then query params match inputs with the same name. e.g. `?q=hello` binds to `@Input() q: string`."
      }
    ]
  }
};

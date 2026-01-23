export const day07 = {
  day: 7,
  title: "Routing Fundamentals: Navigation Architecture",
  intro: "Routing is the skeleton of your app. Learn lazy loading, guards, and how to structure features for scale.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 7. **Routing** is not just navigation. It's how you architect your entire application. Features = Routes."
      },
      {
        type: "talk",
        message: "Modern Angular routing uses **functional guards** and **loadComponent** for lazy loading. No more NgModules!"
      },
      {
        type: "challenge",
        instruction: "Convert this eager-loaded route to a lazy-loaded route using `loadComponent`.",
        buggyCode: `// ❌ Eager loading (loads everything upfront)
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: 'admin', component: AdminComponent }
];`,
        solutionCode: `// ✅ Lazy loading (loads only when needed)
export const routes: Routes = [
  { 
    path: 'admin', 
    loadComponent: () => import('./admin/admin.component')
      .then(m => m.AdminComponent)
  }
];`,
        verifyOutput: "loadComponent",
        successMessage: "Perfect! Now the admin feature is only downloaded when the user navigates to /admin. Faster initial load!",
        hint: "Use `loadComponent: () => import('./path').then(m => m.Component)`"
      },
      {
        type: "ask",
        question: "What is the purpose of a route guard?",
        options: [
          "To protect routes from unauthorized access",
          "To cache route data",
          "To lazy load components faster",
          "To style the navigation menu"
        ],
        correctAnswer: "To protect routes from unauthorized access",
        feedback: {
          success: "Correct! Guards control whether a route can be activated, deactivated, or loaded.",
          error: "Think about security. Guards are gatekeepers that decide if navigation is allowed."
        }
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🗺️ 1. Routes as Architecture</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Your route tree IS your app structure. Each major feature should be a lazy-loaded route.
</p>
<ul class="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Lazy Loading:</strong> Only download code when the user navigates to it.</li>
  <li><strong class="text-brand-primary">Guards:</strong> Protect routes based on auth, roles, or custom logic.</li>
  <li><strong class="text-brand-primary">Resolvers:</strong> Pre-fetch data before activating a route (use sparingly).</li>
</ul>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-purple-500">
<pre class="text-gray-800 dark:text-gray-100">
// Modern route configuration
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'dashboard', 
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard').then(m => m.DashboardComponent)
  },
  { 
    path: 'admin', 
    canActivate: [adminGuard],
    loadChildren: () => import('./admin/routes').then(m => m.ADMIN_ROUTES)
  }
];
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔒 2. Functional Guards (Modern)</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Guards are now simple functions, not classes. They return <code>boolean</code>, <code>UrlTree</code>, or an Observable/Promise of those.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-yellow-500">
<pre class="text-gray-800 dark:text-gray-100">
// Auth guard example
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  
  if (authService.isLoggedIn()) {
    return true;
  }
  
  return inject(Router).createUrlTree(['/login']);
};
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 3. Navigation Patterns</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Navigate programmatically using the Router service:
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm">
<pre class="text-gray-800 dark:text-gray-100">
constructor(private router: Router) {}

// Navigate to a route
this.router.navigate(['/users', userId]);

// Navigate with query params
this.router.navigate(['/search'], { 
  queryParams: { q: 'angular' } 
});

// Navigate relative to current route
this.router.navigate(['../sibling'], { relativeTo: this.route });
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common Mistakes</h3>
<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Eager Loading Everything</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Loading all features upfront kills performance. Lazy load by default.</p>
  </div>
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Client-Side Auth Only</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Guards are UX, not security. Always enforce auth on the backend.</p>
  </div>
</div>
`,
  code: `import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Route {
  path: string;
  label: string;
  protected: boolean;
}

@Component({
  selector: 'app-nav-demo',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">🗺️ Routing Demo</h2>
      
      <div class="mb-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <p class="text-sm text-gray-400 mb-2">Current Route:</p>
        <p class="text-lg font-mono text-green-400">{{ currentRoute() }}</p>
      </div>

      <div class="space-y-3">
        <p class="text-sm text-gray-400 mb-3">Available Routes:</p>
        @for (route of routes(); track route.path) {
          <button
            (click)="navigate(route.path)"
            [disabled]="route.protected && !isAuthenticated()"
            class="w-full text-left p-4 rounded-xl border transition"
            [class]="route.protected && !isAuthenticated() 
              ? 'border-red-500/30 bg-red-500/10 text-red-400 cursor-not-allowed' 
              : 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-white'"
          >
            <div class="flex items-center justify-between">
              <span class="font-mono">{{ route.path }}</span>
              <div class="flex items-center gap-2">
                @if (route.protected) {
                  <span class="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                    🔒 Protected
                  </span>
                }
                @if (currentRoute() === route.path) {
                  <span class="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                    Active
                  </span>
                }
              </div>
            </div>
          </button>
        }
      </div>

      <div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <button
          (click)="toggleAuth()"
          class="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          {{ isAuthenticated() ? '🔓 Logout' : '🔐 Login' }}
        </button>
        <p class="text-xs text-gray-400 mt-2">
          Auth Status: {{ isAuthenticated() ? 'Logged In' : 'Guest' }}
        </p>
      </div>
    </div>
  \`
})
export class NavDemoComponent {
  currentRoute = signal('/');
  isAuthenticated = signal(false);
  
  routes = signal<Route[]>([
    { path: '/', label: 'Home', protected: false },
    { path: '/dashboard', label: 'Dashboard', protected: true },
    { path: '/admin', label: 'Admin', protected: true },
    { path: '/about', label: 'About', protected: false }
  ]);

  constructor() {
    console.log('--- 🗺️ Routing Demo ---');
    console.log('Try navigating to protected routes without logging in!');
    
    setTimeout(() => {
      console.log('▶️ Auto-navigating to /about...');
      this.navigate('/about');
    }, 1500);
  }

  navigate(path: string) {
    const route = this.routes().find(r => r.path === path);
    
    if (route?.protected && !this.isAuthenticated()) {
      console.log('🚫 Access denied! Route is protected.');
      console.log('Redirecting to login...');
      this.currentRoute.set('/login');
      return;
    }
    
    console.log(\`✅ Navigating to \${path}\`);
    this.currentRoute.set(path);
  }

  toggleAuth() {
    this.isAuthenticated.update(v => !v);
    console.log(\`🔐 Auth toggled: \${this.isAuthenticated() ? 'Logged In' : 'Logged Out'}\`);
  }
}`,
  comparison: {
    junior: `// ❌ Eager loading everything
import { AdminComponent } from './admin';
import { DashboardComponent } from './dashboard';

routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'dashboard', component: DashboardComponent }
];`,
    senior: `// ✅ Lazy loading by feature
routes = [
  { 
    path: 'admin', 
    canActivate: [adminGuard],
    loadComponent: () => import('./admin').then(m => m.AdminComponent)
  }
];`
  },
  interview: {
    questions: [
      {
        q: "What's the difference between canActivate and canLoad guards?",
        a: "canActivate runs before route activation. canLoad prevents lazy-loaded modules from being downloaded at all. In modern Angular with standalone components, canActivate is preferred."
      },
      {
        q: "How do you pass data to a route?",
        a: "Use route parameters (/users/:id), query parameters (?page=2), or the route's data property for static configuration."
      },
      {
        q: "When should you use a resolver?",
        a: "When you need to pre-fetch critical data before showing a route. Use sparingly as it blocks navigation. Consider showing a loading state instead."
      }
    ]
  }
};

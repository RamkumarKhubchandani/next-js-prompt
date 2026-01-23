export const day23 = {
  day: 23,
  title: "Guards: Route Protection & Authorization",
  intro: "Protect routes with functional guards. Implement authentication, authorization, and data validation before navigation.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔒 Route Guards</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Guards control whether navigation is allowed. Modern Angular uses functional guards (not class-based).
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-yellow-500">
<pre class="text-gray-800 dark:text-gray-100">
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  
  if (authService.isLoggedIn()) {
    return true;
  }
  
  return inject(Router).createUrlTree(['/login']);
};

// Usage
{
  path: 'dashboard',
  canActivate: [authGuard],
  component: DashboardComponent
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Guard Types</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">canActivate:</strong> Can route be activated?</li>
  <li><strong class="text-brand-primary">canDeactivate:</strong> Can user leave route? (unsaved changes)</li>
  <li><strong class="text-brand-primary">canMatch:</strong> Should route be matched at all?</li>
  <li><strong class="text-brand-primary">resolve:</strong> Pre-fetch data before activation</li>
</ul>
`,
  code: `// Auth guard example
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const isLoggedIn = true; // Check auth state
  
  if (isLoggedIn) {
    return true;
  }
  
  return inject(Router).createUrlTree(['/login']);
};`,
  comparison: {
    junior: `// ❌ No protection
{ path: 'admin', component: AdminComponent }`,
    senior: `// ✅ Protected with guard
{ 
  path: 'admin',
  canActivate: [authGuard, adminGuard],
  component: AdminComponent
}`
  },
  interview: {
    questions: [
      {
        q: "What's the difference between canActivate and canMatch?",
        a: "canActivate runs after route is matched. canMatch prevents route from matching at all (better for lazy loading)."
      }
    ]
  }
};

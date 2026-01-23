export const day22 = {
  day: 22,
  title: "Lazy Loading & Code Splitting",
  intro: "Optimize bundle size and improve initial load time with lazy loading strategies and code splitting techniques.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📦 Lazy Loading</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Load features only when needed. Reduces initial bundle size dramatically.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
// Lazy load a component
{
  path: 'admin',
  loadComponent: () => import('./admin/admin.component')
    .then(m => m.AdminComponent)
}

// Lazy load child routes
{
  path: 'dashboard',
  loadChildren: () => import('./dashboard/routes')
    .then(m => m.DASHBOARD_ROUTES)
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Preloading Strategies</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">NoPreloading:</strong> Load only when navigated (default)</li>
  <li><strong class="text-brand-primary">PreloadAllModules:</strong> Load all lazy routes after initial load</li>
  <li><strong class="text-brand-primary">Custom:</strong> Preload based on user behavior/priority</li>
</ul>
`,
  code: `// Preloading configuration
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';

export const appConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules))
  ]
};`,
  comparison: {
    junior: `// ❌ Everything eager loaded
import { AdminComponent } from './admin';
{ path: 'admin', component: AdminComponent }`,
    senior: `// ✅ Lazy loaded
{ 
  path: 'admin',
  loadComponent: () => import('./admin').then(m => m.AdminComponent)
}`
  },
  interview: {
    questions: [
      {
        q: "What's the benefit of lazy loading?",
        a: "Smaller initial bundle, faster first paint, better performance. Users only download what they need."
      }
    ]
  }
};

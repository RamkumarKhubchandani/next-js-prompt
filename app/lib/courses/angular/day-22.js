export const day22 = {
  day: 22,
  title: "Lazy Loading & Code Splitting",
  intro: "Don't send the Admin Dashboard code to a user who just landed on the Home Page. Use <strong>Lazy Loading</strong> to split your app into small chunks.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 22. The fastest code is the code you never load. **Lazy Loading** splits your bundle so users only download what they see."
      },
      {
        type: "talk",
        message: "In modern Angular, we use `loadComponent` or `loadChildren` in the router config to define lazy boundaries."
      },
      {
        type: "challenge",
        instruction: "This route configuration eagerly loads the Admin Component. Refactor it to lazy load.",
        buggyCode: `// ❌ Eagerly imported
import { AdminComponent } from './admin.component';

export const routes = [
  { path: 'admin', component: AdminComponent }
];`,
        solutionCode: `// ✅ Lazy loaded
export const routes = [
  { 
    path: 'admin', 
    loadComponent: () => import('./admin.component').then(m => m.AdminComponent) 
  }
];`,
        verifyOutput: "loadComponent",
        successMessage: "Great! Now the `AdminComponent` code won't be downloaded until the user visits `/admin`.",
        hint: "Use `loadComponent: () => import(...)`."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📦 Code Splitting</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
By default, all your code is in one big file (<code>main.js</code>). This is bad.
Lazy loading creates separate "chunks" (<code>chunk-1.js</code>, <code>chunk-2.js</code>) that are only downloaded when needed.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
// 1. Lazy Component (Single File)
{
  path: 'admin',
  loadComponent: () => import('./admin/admin.component')
    .then(m => m.AdminComponent)
}

// 2. Lazy Feature (Multiple Routes)
{
  path: 'dashboard',
  loadChildren: () => import('./dashboard/routes')
    .then(m => m.DASHBOARD_ROUTES)
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Preloading</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Lazy loading makes the *initial* load fast, but the *navigation* slow (network delay).
<strong>Preloading</strong> fixes this by downloading the lazy chunks in the background while the user is reading the current page.
</p>
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

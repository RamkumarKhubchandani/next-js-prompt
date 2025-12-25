export const day06 = {
  day: 6,
  title: "Routing (Lazy Loading, Guards, Resolvers, Standalone APIs)",
  intro: "Routing is architecture. Learn how to structure features, protect routes, and keep bundles small.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Routing Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Lazy load big features.</li>
  <li>Guard access (auth + role).</li>
  <li>Preload intentionally (not accidentally).</li>
  <li>Keep route trees simple.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Lazy Loading: The Default for Features</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Bundle size is UX. Lazy loading keeps first load fast, especially for admin/settings features.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Guards: Auth vs Authz</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Auth guard</span>: user must be signed in.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Role guard</span>: user must have permission.</li>
</ul>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200 text-sm">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Important:</span> route guards are UX and client-side safety.
    Real authorization must still be enforced on the backend.
  </p>
</div>
            `,
  code: `// Standalone route example (conceptual):
// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'admin', canActivate: [adminGuard], loadComponent: () => import('./admin').then(m => m.AdminComponent) },
// ];`,
  comparison: {
    junior: `// ❌ one giant app bundle
// all features loaded on first paint`,
    senior: `// ✅ lazy loading by feature
// faster TTI + less JS shipped`
  },
  interview: {
    questions: [
      {
        q: "Guard vs Resolver?",
        a: "Guards decide whether navigation is allowed. Resolvers fetch data before route activation (use carefully to avoid blocking UX)."
      },
      {
        q: "Why lazy load?",
        a: "To reduce initial bundle size and speed up first load; users only download features when needed."
      },
      {
        q: "What is route-level provider scope good for?",
        a: "Feature-scoped services/state that should reset when leaving the feature route."
      }
    ]
  }
};

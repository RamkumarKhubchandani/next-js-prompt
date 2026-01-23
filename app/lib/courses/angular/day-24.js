export const day24 = {
  day: 24,
  title: "Resolvers: Pre-fetching Route Data",
  intro: "Load data before activating a route using resolvers. Ensure components always have the data they need.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Route Resolvers</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Resolvers fetch data BEFORE the route activates. Component receives data immediately.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
export const userResolver: ResolveFn<User> = (route) => {
  const userId = route.paramMap.get('id')!;
  return inject(UserService).getUser(userId);
};

// Route config
{
  path: 'user/:id',
  component: UserComponent,
  resolve: { user: userResolver }
}

// Component receives data
export class UserComponent {
  user = input.required<User>(); // From resolver!
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ When to Use Resolvers</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li>✅ Critical data needed before showing component</li>
  <li>✅ Prevent "flash of empty content"</li>
  <li>❌ Don't use for slow APIs (blocks navigation)</li>
  <li>❌ Consider loading states instead</li>
</ul>
`,
  code: `// User resolver example
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const userResolver: ResolveFn<any> = (route) => {
  const userId = route.paramMap.get('id');
  // Simulate API call
  return of({ id: userId, name: 'John Doe' });
};`,
  comparison: {
    junior: `// ❌ Fetch in component (flash of loading)
ngOnInit() {
  this.http.get('/api/user').subscribe(...);
}`,
    senior: `// ✅ Resolver (data ready on arrival)
resolve: { user: userResolver }
// Component: user = input.required<User>();`
  },
  interview: {
    questions: [
      {
        q: "When should you NOT use a resolver?",
        a: "For slow APIs or non-critical data. Resolvers block navigation, which hurts UX. Show loading states instead."
      }
    ]
  }
};

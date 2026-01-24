export const day24 = {
  day: 24,
  title: "Resolvers: Pre-fetching Route Data",
  intro: "Avoid the 'Content Flash'. Resolvers ensure your component has data <strong>BEFORE</strong> it renders, so you don't need 10 different <code>*ngIf=\"loading\"</code> checks.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 24. \"Loading...\" spinners are annoying if they flash for 0.1s. Resolvers fix this by fetching data *during* the navigation transition."
      },
      {
        type: "talk",
        message: "The component is only created once the data is ready. This means your component inputs are never null."
      },
      {
        type: "challenge",
        instruction: "Use a resolver to ensure `User` data is present before the component loads.",
        buggyCode: `// ❌ Component fetches data (Loading flash!)
@Component({ ... })
class UserPage {
  user: User | null = null;
  ngOnInit() {
    this.api.getUser().subscribe(u => this.user = u);
  }
}`,
        solutionCode: `// ✅ Resolver fetches data (Instant render!)
const userResolver: ResolveFn<User> = () => inject(Api).getUser();

@Component({ ... })
class UserPage {
  // Guaranteed to be present!
  user = input.required<User>();
}`,
        verifyOutput: "ResolveFn",
        successMessage: "See? No `*ngIf` needed! The component code is much simpler because it *assumes* data exists.",
        hint: "Define a `ResolveFn` and map it in the router."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Data Before View</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Normally, a component loads, then fetches data. Resolvers fetch data, then load the component.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
export const userResolver: ResolveFn&lt;User&gt; = (route) => {
  const id = route.paramMap.get('id')!;
  return inject(UserService).getUser(id);
};

// Route
{
  path: 'user/:id',
  component: UserComponent,
  resolve: { user: userResolver }
}

// Component (Data is ready!)
user = input.required&lt;User&gt;();
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ When to Use Resolvers</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li>✅ Critical data (User details, Config)</li>
  <li>✅ Preventing "Layout Shift"</li>
  <li>❌ Slow dashboards (Blocks navigation = frustrated user)</li>
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

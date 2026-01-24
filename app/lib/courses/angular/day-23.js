export const day23 = {
  day: 23,
  title: "Guards: Route Protection & Authorization",
  intro: "Guards aren't just for Auth. Use guard functions to validate parameters, check permissions, or prevent users from losing unsaved work (`CanDeactivate`).",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 23. We covered the basics of `CanActivate`. Now let's handle the tricky stuff: Unsaved Changes."
      },
      {
        type: "talk",
        message: "A `CanDeactivate` guard can ask the component \"Is it safe to leave?\" before allowing navigation."
      },
      {
        type: "challenge",
        instruction: "Implement a `canDeactivate` guard that checks if the component's form is dirty.",
        buggyCode: `// ❌ No checks (User loses data!)
export const unsavedChangesGuard = () => true;`,
        solutionCode: `// ✅ Check component state
export const unsavedChangesGuard: CanDeactivateFn<any> = (component) => {
  if (component.form.dirty) {
    return confirm('Discard unsaved changes?');
  }
  return true;
};`,
        verifyOutput: "CanDeactivateFn",
        successMessage: "Disaster averted! The user will now be prompted before accidentally navigating away from a half-filled form.",
        hint: "Use `CanDeactivateFn<Type>` and access component properties."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔒 The Gatekeepers</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Guards return <code>true</code> (allow), <code>false</code> (block), or a <code>UrlTree</code> (redirect).
Modern Angular guards are just functional: <code>(route, state) => boolean</code>.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-yellow-500">
<pre class="text-gray-800 dark:text-gray-100">
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService).isLoggedIn() 
    ? true 
    : router.createUrlTree(['/login']);
};
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Know Your Guards</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">canActivate:</strong> "Do you have the key to this room?"</li>
  <li><strong class="text-brand-primary">canMatch:</strong> "Does this room even exist for you?" (Lazy Loading)</li>
  <li><strong class="text-brand-primary">canDeactivate:</strong> "Are you sure you want to leave?" (Unsaved changes)</li>
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

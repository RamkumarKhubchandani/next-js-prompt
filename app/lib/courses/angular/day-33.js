export const day33 = {
  day: 33,
  title: "Enterprise Auth (OIDC, Silent Refresh, Route Protection)",
  intro: "Real enterprises use SSO. Learn OIDC concepts, secure storage, refresh strategies, and route protection patterns.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>OIDC concepts: ID token vs access token.</li>
  <li>Secure storage tradeoffs: cookies vs memory vs localStorage.</li>
  <li>Token refresh strategies (and why they fail in prod).</li>
  <li>Guards and UX: protect routes without broken navigation loops.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Safe Default</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
If you can: keep refresh in <span class="text-yellow-600 dark:text-yellow-400 font-bold">HttpOnly cookies</span> and keep access tokens short-lived.
This reduces XSS blast radius.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Avoid the Auth Loop Bug</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
If a guard redirects to /login on a transient refresh failure, users can get stuck in loops.
Use backoff + a clear “session expired” state.
</p>
            `,
  code: `/**
 * Day 33: Auth guard shape (conceptual)
 */

// export const authGuard: CanActivateFn = () => {
//   const auth = inject(AuthStore);
//   const router = inject(Router);
//
//   if (auth.isAuthenticated()) return true;
//   router.navigate(['/login'], { queryParams: { returnUrl: router.url } });
//   return false;
// };`,
  comparison: {
    junior: "// ❌ Token in localStorage + long-lived access token",
    senior: "// ✅ Short access token + refresh cookie + clear session state"
  },
  interview: {
    questions: [
      {
        q: "Why is localStorage risky for tokens?",
        a: "XSS can read localStorage and steal tokens. HttpOnly cookies are not accessible to JS and reduce XSS impact."
      },
      {
        q: "What is OIDC vs OAuth?",
        a: "OIDC adds authentication (identity) on top of OAuth authorization, standardizing ID tokens and user info."
      },
      {
        q: "How do you prevent redirect loops in auth guards?",
        a: "Use clear auth state transitions, retry/backoff for refresh, and redirect only when you definitively know the session is invalid."
      }
    ]
  }
};

export const day05 = {
  day: 5,
  title: "Authentication (JWT vs Session)",
  intro: "Stateless vs Stateful auth.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Sessions vs JWT: what’s actually “stateful” and why.</li>
  <li>Secure token storage: <span class="text-yellow-600 dark:text-yellow-400 font-bold">HttpOnly cookies</span>, not localStorage.</li>
  <li>Access token vs refresh token patterns (and rotation).</li>
  <li>Threat model basics: XSS, CSRF, token theft, and logout/invalidation.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Sessions (Stateful)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Server stores session data (in memory/Redis/DB). Client holds an opaque session id cookie.
Great for revocation and “log out everywhere”.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) JWT (Stateless-ish)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
JWT contains claims signed by the server. Server can validate without DB lookups (fast),
but revocation is harder (you need short expiry + refresh flow, or a blacklist).
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Recommended Modern Pattern</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Browser
  │
  ├─ HttpOnly Cookie: refresh_token (long)
  └─ Memory (JS variable): access_token (short) OR HttpOnly cookie (depends)

Server
  - access token expires quickly (5-15 min)
  - refresh token rotates (store hash in DB/Redis)
</pre>
</div>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200 text-sm">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Never store tokens in localStorage</span> if you can avoid it.
    XSS = instant account takeover.
  </p>
</div>
            `,
  code: `/**
 * Day 5: Auth pattern (Access + Refresh with HttpOnly cookie)
 * (conceptual Express-style code)
 */

// Login:
// 1) verify password
// 2) issue short access token
// 3) issue refresh token (store hash server-side for rotation)

// res.cookie('refresh_token', refreshToken, {
//   httpOnly: true,
//   secure: true,
//   sameSite: 'lax',
//   path: '/auth/refresh',
// });
//
// res.json({ accessToken });

// Refresh:
// 1) read refresh_token from HttpOnly cookie
// 2) validate + rotate (invalidate old, store new hash)
// 3) return new accessToken (and new refresh cookie)

// Logout:
// 1) delete refresh token record server-side
// 2) clear cookie`,
  comparison: {
    junior: `// ❌ Insecure token storage
localStorage.setItem('jwt', token); // XSS steals it
// and no refresh rotation, long-lived token`,
    senior: `// ✅ Secure + maintainable
// - Refresh token in HttpOnly cookie
// - Access token short-lived
// - Rotate refresh tokens (store hash server-side)
// - Rate limit /auth endpoints`
  },
  interview: {
    questions: [
      {
        q: "Why is localStorage risky for auth tokens?",
        a: "Because any XSS vulnerability can read localStorage and exfiltrate tokens. HttpOnly cookies are not accessible to JS, reducing the blast radius of XSS."
      },
      {
        q: "How do you invalidate sessions vs JWTs?",
        a: "Sessions are easy: delete the session server-side (Redis/DB). JWTs are harder: use short expirations + refresh tokens, and optionally maintain a token blacklist or per-user token versioning."
      },
      {
        q: "What is refresh token rotation and why do it?",
        a: "On each refresh, issue a new refresh token and invalidate the old one. If an old token is reused, you can detect theft and revoke the session."
      }
    ]
  }
};

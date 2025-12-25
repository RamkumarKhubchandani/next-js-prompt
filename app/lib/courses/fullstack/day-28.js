export const day28 = {
  day: 28,
  title: "Deployment Architecture (Configs, Secrets, Environments)",
  intro: "Most deployment failures are config failures. Today you’ll build discipline around environments, secrets, and rollout safety.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Environment strategy: dev → staging → prod.</li>
  <li>Config vs secrets and how to manage both safely.</li>
  <li>Rollout safety: feature flags, migrations, and rollbacks.</li>
  <li>Health checks and readiness: what “healthy” actually means.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Config vs Secrets (Repeat)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Config can be public; secrets must not be in Git. Use secret managers and inject at runtime.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Health Checks (Liveness vs Readiness)</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
/healthz (liveness): process is alive
/readyz  (readiness): can serve traffic (DB connected, migrations done)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Feature Flags (Deploy ≠ Release)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Ship code behind a flag. Turn it on gradually. Roll back by flipping a switch, not redeploying at 2AM.
</p>
            `,
  code: `/**
 * Day 28: Minimal readiness check pattern
 */

let ready = false;

async function boot({ db }) {
  // connect DB, warm caches, run migrations checks, etc.
  await db.connect();
  ready = true;
}

app.get('/healthz', (req, res) => res.json({ ok: true }));
app.get('/readyz', (req, res) => {
  if (!ready) return res.status(503).json({ ok: false });
  res.json({ ok: true });
});`,
  comparison: {
    junior: `// ❌ One environment, many surprises
// dev and prod are different
// secrets in code
// no readiness checks`,
    senior: `// ✅ Environment discipline
// - dev/staging/prod separation
// - secrets injected at runtime
// - readiness gating + rollbacks`
  },
  interview: {
    questions: [
      {
        q: "What’s the difference between liveness and readiness?",
        a: "Liveness: process is alive (restart if dead). Readiness: safe to receive traffic (don’t send traffic until dependencies are ready)."
      },
      {
        q: "Why separate staging from production?",
        a: "To validate deploys in a production-like environment (infra, configs, migrations) without risking customer impact."
      },
      {
        q: "Why feature flags?",
        a: "They decouple deployment from release, enabling gradual rollout, A/B tests, and safe rollback without redeploy."
      }
    ]
  }
};

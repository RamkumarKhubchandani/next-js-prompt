export const day28 = {
  day: 28,
  title: "CI/CD for Frontend (Build Once, Promote, Smoke Test)",
  intro: "Frontends need CI/CD just like backends. Learn artifact promotion, environment configs, and smoke tests.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Pipeline Stages</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>lint + test</li>
  <li>build (artifact)</li>
  <li>deploy staging</li>
  <li>smoke tests</li>
  <li>promote to prod</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Environment Config Strategy</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Avoid baking secrets into builds. Prefer runtime config injection (or environment-specific deployment config) for API base URLs and feature flags.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Cache/CDN Correctness</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
The #1 frontend deployment failure is stale assets. Use content-hashed filenames and correct cache headers:
immutable assets can be cached long; HTML should be short-lived.
</p>
            `,
  code: `// Smoke test idea:
// - load homepage
// - verify API base URL is correct
// - verify auth redirect works`,
  comparison: {
    junior: "// ❌ deploy from laptop",
    senior: "// ✅ CI artifact promotion + smoke tests"
  },
  interview: {
    questions: [
      {
        q: "Why 'build once, promote many' for frontend too?",
        a: "It ensures prod runs the exact build tested in staging; rebuilding can introduce differences (env, deps, flags)."
      },
      {
        q: "What are smoke tests?",
        a: "Small, fast checks that ensure the deployed app is alive and critical paths work."
      },
      {
        q: "What’s the biggest frontend deploy risk?",
        a: "Caching/CDN + stale assets. Use cache-busting filenames and correct cache headers."
      }
    ]
  }
};

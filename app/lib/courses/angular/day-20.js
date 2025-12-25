export const day20 = {
  day: 20,
  title: "Monorepos & Nx (Scaling Teams and Apps)",
  intro: "Enterprise Angular commonly lives in monorepos. Learn boundaries, shared libs, and CI acceleration.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Monorepos</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Shared libraries with explicit boundaries.</li>
  <li>Consistent tooling and lint rules.</li>
  <li>Faster CI via caching and affected builds.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Library Taxonomy (So It Doesn’t Become Chaos)</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
libs/
  ui/            (pure UI components)
  data-access/   (API + data fetching)
  feature/       (route-level features)
  util/          (pure utilities)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Enforce Boundaries</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Monorepos only work if dependencies are controlled. Enforce rules like:
feature → data-access → util, and ui should not import feature.
</p>
            `,
  code: "// Nx ideas: libs for ui/data-access/feature; enforce boundaries with lint rules.",
  comparison: {
    junior: "// ❌ copy code between apps",
    senior: "// ✅ shared libs + boundaries"
  },
  interview: {
    questions: [
      {
        q: "What problem does Nx solve?",
        a: "Scaling a codebase with multiple apps/libs using caching, dependency graphs, affected builds, and enforceable boundaries."
      },
      {
        q: "How do you prevent a monorepo from becoming a mess?",
        a: "Clear library taxonomy, strict dependency rules, and review discipline."
      },
      {
        q: "What’s an 'affected' build?",
        a: "A build/test run limited to only projects impacted by a change, speeding up CI."
      }
    ]
  }
};

export const day00 = {
  day: 0,
  title: "Day 0: Professional Setup (Angular CLI, Tooling, Standards)",
  intro: "Stop fighting your tools. Set up Angular 21 like a team: deterministic installs, strict TypeScript, formatting, linting, and a clean repo structure.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 Day 0 Outcomes</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Repeatable environment</span> (Node + package manager + lockfile discipline).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Professional CLI workflow</span>: generate → test → build → analyze.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Strict TypeScript</span> + predictable formatting/linting.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Clean repo conventions</span>: where code lives and why.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Install & Create (Angular CLI)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Angular CLI is not optional in real teams. It encodes the “Angular way” for builds, tests, and code generation.
</p>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
# Create a new Angular app
npx @angular/cli@latest new my-angular-app
cd my-angular-app

# Run dev server
ng serve

# Generate a standalone component
ng generate component features/home --standalone
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Understand the Project Structure (So You Can Debug It)</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
my-angular-app/
  src/
    main.ts          → app bootstrap (entry)
    index.html       → shell HTML
    styles.*         → global styles
    app/             → your feature code
  angular.json       → build/test configuration
  tsconfig*.json     → TypeScript configuration
  package.json       → scripts + deps
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Deterministic Installs (Lockfile Discipline)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Frontend builds fail in production because dependency graphs drift. Your goal: <span class="text-yellow-600 dark:text-yellow-400 font-bold">same inputs → same outputs</span>.
</p>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
# Always install from lockfile in CI
npm ci

# Avoid "works on my machine"
# - commit package-lock.json
# - don't hand-edit lockfiles
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) Strict TypeScript (Template Safety)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Angular templates are code. Strict template type-checking catches UI bugs before users do.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">5) The Professional Baseline: Lint + Format + Test</h3>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-2 text-sm">
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Prettier</span>: formatting consistency across team.</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">ESLint</span>: correctness rules and architecture constraints.</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Unit tests</span>: protect core logic and services.</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">✅ Day 0 Checklist</h3>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-light-300">
  <ul class="list-disc list-inside space-y-2">
    <li>You can run: <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">ng serve</code>, <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">ng test</code>, <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">ng build</code>.</li>
    <li>Lockfile is committed and CI uses <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">npm ci</code>.</li>
    <li>Strict TS is enabled (no silent any).</li>
  </ul>
</div>
            `,
  code: `/**
 * Day 0: Setup guardrails (conceptual)
 * - fail fast in CI when tools drift
 * - keep scripts predictable across developers
 */

// Recommended scripts:
// "start": "ng serve"
// "build": "ng build"
// "test": "ng test"
// "lint": "ng lint"
// "format": "prettier . --write"

// CI rule of thumb:
// - npm ci
// - npm run lint
// - npm test
// - npm run build`,
  comparison: {
    junior: `// ❌ Random setup
// - different Node versions
// - inconsistent formatting
// - no linting
// - unstable builds`,
    senior: `// ✅ Team-grade setup
// - deterministic installs
// - strict TS
// - lint + format
// - consistent scripts for CI`
  },
  interview: {
    questions: [
      {
        q: "Why do we pin Node and dependency versions in frontend repos?",
        a: "To avoid environment drift. Angular builds depend on Node, TypeScript, and bundler behavior. Pinning prevents 'works on my machine' failures and stabilizes CI."
      },
      {
        q: "Why strict TypeScript in Angular projects?",
        a: "Because templates + DI + refactors get safer. Strictness turns runtime bugs into compile-time errors and makes large codebases maintainable."
      },
      {
        q: "What should every project expose as scripts?",
        a: "start, build, test, lint (and format). CI should be able to run them without custom tribal knowledge."
      }
    ]
  }
};

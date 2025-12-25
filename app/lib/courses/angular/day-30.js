export const day30 = {
  day: 30,
  title: "Capstone Project (Build a Real App Step-by-Step)",
  intro: "We’ll design a production-style Angular app: auth, routing, API layer, state, forms, and performance.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Blueprint</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
App Shell
  ├─ Auth feature (login, refresh, guards)
  ├─ Dashboard feature (charts, tables)
  ├─ Settings feature (profile, password)
  └─ Shared UI library (buttons, inputs, dialogs)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Step-by-Step Build Plan</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">App shell</span>: layout, navigation, lazy routes.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Auth</span>: login form + token storage strategy + guard.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">API layer</span>: typed services + interceptors + error mapping.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">State</span>: feature stores for dashboard/settings.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Performance</span>: OnPush, trackBy, split big features.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Testing</span>: service tests + a few integration flows.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Deployment</span>: CI build + staging smoke test + promote.</li>
</ol>
            `,
  code: `// Deliverables checklist:
// - route lazy loading
// - typed HttpClient services + interceptors
// - reactive forms with validators
// - OnPush + trackBy performance`,
  comparison: {
    junior: "// ❌ build without architecture",
    senior: "// ✅ build as slices + contracts"
  },
  interview: {
    questions: [
      {
        q: "How do you keep a large Angular app maintainable?",
        a: "Feature slices, strict boundaries, typed contracts, consistent state patterns, and performance discipline (OnPush, lazy loading)."
      },
      {
        q: "What do you prioritize first in a new app?",
        a: "Architecture boundaries, auth model, API contracts, and tooling (lint/test/build) so the app scales without rewrites."
      },
      {
        q: "Where do most Angular apps fail?",
        a: "Unbounded state, mixed responsibilities in components, and ignoring performance until it’s too late."
      }
    ]
  }
};

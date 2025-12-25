export const day14 = {
  day: 14,
  title: "SSR + Hydration (Angular Universal Modern Approach)",
  intro: "SSR improves initial load and SEO, but requires discipline. Learn hydration, caching, and server constraints.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">SSR Flow</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Request → Server renders HTML → Browser hydrates → App becomes interactive
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) What SSR Solves (and What it Doesn’t)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">First paint</span> and perceived performance.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">SEO</span> for content-heavy pages.</li>
  <li>It does <span class="text-red-300 font-bold">not</span> remove JS cost; hydration still runs.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) SSR Safety Rules</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Never assume <code class="bg-dark-700 px-1 rounded">window</code>/<code class="bg-dark-700 px-1 rounded">document</code> exist.</li>
  <li>Prefer platform checks (<code class="bg-dark-700 px-1 rounded">isPlatformBrowser</code>).</li>
  <li>Keep server rendering deterministic (no random IDs without seeding).</li>
</ul>
            `,
  code: `// SSR tips:
// - avoid direct window/document usage (guard with isPlatformBrowser)
// - cache server responses where safe
// - keep initial payload small`,
  comparison: {
    junior: "// ❌ SSR breaks due to window usage",
    senior: "// ✅ platform checks + hydration-safe code"
  },
  interview: {
    questions: [
      {
        q: "Why SSR?",
        a: "Faster first paint/SEO and better perceived performance. It can also improve performance on slow devices."
      },
      {
        q: "What breaks SSR most often?",
        a: "Direct browser API usage (window, document), non-deterministic rendering, and relying on client-only side effects."
      },
      {
        q: "What is hydration?",
        a: "Reusing server-rendered HTML and attaching event listeners/state on the client without rerendering the entire DOM."
      }
    ]
  }
};

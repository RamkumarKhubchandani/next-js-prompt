export const day32 = {
  day: 32,
  title: "Production Debugging Playbook (Angular in the Wild)",
  intro: "This day is about being effective under pressure: how to debug production issues fast, safely, and with confidence.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>A repeatable debugging workflow (measure → isolate → fix → verify).</li>
  <li>Common production failures: cache staleness, API mismatch, memory leaks, and slow change detection.</li>
  <li>How to think in <span class="text-yellow-600 dark:text-yellow-400 font-bold">symptoms → root causes</span>.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Golden Signals (Frontend Edition)</h3>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-1 text-sm">
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Errors</span>: JS exceptions, failed requests, auth failures</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Latency</span>: route navigation time, API p95, rendering time</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Saturation</span>: long tasks, memory growth, event loop stalls (browser)</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The 10-Minute Triage Checklist</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Is it all users or a segment (browser/version/region)?</li>
  <li>Is it a deploy regression (new build) or external dependency?</li>
  <li>Any spike in 401/403 (auth cookie / token refresh)?</li>
  <li>Any CDN/cache staleness (index.html served old vs new assets)?</li>
  <li>Any route-specific slowdowns (bundle size / resolver / API waterfall)?</li>
  <li>Any memory growth (leak) or long tasks (render loop)?</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) The “Stale Assets” Incident Pattern</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Most frontend outages are caching bugs: HTML cached too long while JS filenames changed.
Fix with <span class="text-yellow-600 dark:text-yellow-400 font-bold">immutable hashed assets</span> and short-lived HTML.
</p>
            `,
  code: `/**
 * Day 32: Practical logging pattern (conceptual)
 * - attach requestId to outgoing requests
 * - log route + version + requestId to correlate issues
 */

// const APP_VERSION = '1.2.3'; // inject at build time
//
// export const requestIdInterceptor: HttpInterceptorFn = (req, next) => {
//   const requestId = crypto.randomUUID();
//   const r = req.clone({ setHeaders: { 'x-request-id': requestId, 'x-app-version': APP_VERSION } });
//   return next(r).pipe(
//     tap({
//       error: (err) => console.error('http_error', { requestId, url: req.url, status: err.status }),
//     }),
//   );
// };`,
  comparison: {
    junior: `// ❌ Debug by guessing
// - no metrics
// - no versioning
// - no correlation IDs`,
    senior: `// ✅ Debug by measurement
// - version stamped
// - correlation IDs
// - reproduce + isolate + verify fix`
  },
  interview: {
    questions: [
      {
        q: "How do you debug a production issue you can’t reproduce locally?",
        a: "Start with logs/metrics by segment (browser/region), correlate with deploy versions, inspect network waterfall, and build a minimal reproduction by isolating the failing path. Add targeted logging if needed, then fix and validate with canary/staging."
      },
      {
        q: "Why do frontend outages often come from caching?",
        a: "Because HTML can be cached while JS assets change; the browser loads mismatched bundles. Correct cache headers and hashed filenames prevent this."
      },
      {
        q: "What’s a 'long task' and why do you care?",
        a: "A long task blocks the main thread, causing jank and slow UI. It indicates heavy JS execution or rendering work that needs optimization."
      }
    ]
  }
};

export const day37 = {
  day: 37,
  title: "Interview Package 2: RxJS Problem Set (Solved)",
  intro: "This day turns RxJS into a superpower: you’ll solve the most common interview problems with switchMap/mergeMap/concatMap, retry, and caching.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Problem Set</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Typeahead search with cancellation</li>
  <li>Queue requests (preserve order)</li>
  <li>Parallel requests with limited concurrency</li>
  <li>Cache HTTP results (shareReplay safely)</li>
  <li>Error strategy: keep stream alive</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Operator Cheatsheet</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
switchMap: cancel previous (search)
concatMap: queue (save actions)
mergeMap: parallel (fan-out), can add concurrency
shareReplay: cache last value (careful with invalidation)
</pre>
</div>
            `,
  code: `/**
 * Day 37: Solved RxJS problems (conceptual)
 */

// 1) Typeahead (cancel previous)
// query$.pipe(
//   debounceTime(250),
//   distinctUntilChanged(),
//   switchMap(q => api.search(q).pipe(catchError(() => of([])))),
// )

// 2) Queue writes (preserve order)
// saveClicks$.pipe(
//   concatMap(payload => api.save(payload).pipe(retry({ count: 2 }))),
// )

// 3) Parallel with concurrency limit
// ids$.pipe(
//   mergeMap(id => api.get(id), 5), // concurrency=5
// )

// 4) Cache results (request-level)
// users$ = api.listUsers().pipe(
//   shareReplay({ bufferSize: 1, refCount: true })
// )`,
  comparison: {
    junior: `// ❌ nested subscriptions
// subscribe inside subscribe`,
    senior: `// ✅ one pipeline
// flattening operators + error boundaries + controlled concurrency`
  },
  interview: {
    questions: [
      {
        q: "Why switchMap for search?",
        a: "Search should show the latest query. switchMap cancels older requests so stale responses don’t overwrite newer results."
      },
      {
        q: "How do you do retries safely?",
        a: "Retry idempotent operations (GET). For writes, use idempotency keys or queue with careful design; add exponential backoff and stop conditions."
      },
      {
        q: "What’s the danger of shareReplay?",
        a: "It can cache forever (stale data) or leak memory. Use refCount where appropriate and implement invalidation (e.g., refresh trigger) when needed."
      }
    ]
  }
};

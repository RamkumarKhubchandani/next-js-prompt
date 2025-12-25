export const day04 = {
  day: 4,
  title: "RxJS Fundamentals (Observables, Operators, Streams)",
  intro: "Angular’s async model is RxJS. Learn observables, subscriptions, and the operators that power real apps.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Observables vs Promises</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Promise: one value, eager (starts immediately)
Observable: many values, lazy (starts on subscribe), cancellable
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Operators You Must Know</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">map</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">filter</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">tap</span></li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">switchMap</span> (cancel previous), <span class="text-yellow-600 dark:text-yellow-400 font-bold">mergeMap</span> (parallel), <span class="text-yellow-600 dark:text-yellow-400 font-bold">concatMap</span> (queue)</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">catchError</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">retry</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">shareReplay</span></li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The “Pipe” Mental Model</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
RxJS is a pipeline. You take an input stream and transform it step-by-step. This replaces nested callbacks and nested subscriptions.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
User types → debounce → distinct → switchMap(API) → render result
   (events)    (reduce noise)      (cancel old requests)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The Big 3 Flattening Operators</h3>
<div class="grid md:grid-cols-3 gap-4 mb-6 text-sm">
  <div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-700 dark:text-light-200">
    <p class="font-bold text-gray-900 dark:text-white mb-1">switchMap</p>
    <p>Latest wins. Cancels previous.</p>
    <p class="text-light-400">Search, typeahead, route changes.</p>
  </div>
  <div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-700 dark:text-light-200">
    <p class="font-bold text-gray-900 dark:text-white mb-1">mergeMap</p>
    <p>Parallel. Order not guaranteed.</p>
    <p class="text-light-400">Fire-and-forget tasks.</p>
  </div>
  <div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-700 dark:text-light-200">
    <p class="font-bold text-gray-900 dark:text-white mb-1">concatMap</p>
    <p>Queues. Preserves order.</p>
    <p class="text-light-400">Sequential workflows.</p>
  </div>
</div>
            `,
  code: `// Search box stream pattern:
// this.query.valueChanges.pipe(
//   debounceTime(300),
//   distinctUntilChanged(),
//   switchMap(q => this.api.search(q)),
// ).subscribe();`,
  comparison: {
    junior: `// ❌ nested subscriptions
// api.get().subscribe(x => api.get2(x).subscribe(...))`,
    senior: `// ✅ flatten with switchMap/mergeMap
// one pipeline, easy cancellation`
  },
  interview: {
    questions: [
      {
        q: "switchMap vs mergeMap vs concatMap?",
        a: "switchMap cancels previous inner streams (ideal for search). mergeMap runs in parallel (careful with ordering). concatMap queues sequentially (preserves order)."
      },
      {
        q: "What is shareReplay used for?",
        a: "To share one upstream execution and replay the last value to new subscribers (useful for caching HTTP streams). Must be used carefully to avoid stale caches/memory leaks."
      },
      {
        q: "Why do async pipes help?",
        a: "They manage subscriptions automatically and prevent memory leaks by unsubscribing when the view is destroyed."
      }
    ]
  }
};

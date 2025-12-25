export const day40 = {
  day: 40,
  title: "Interview Package 5: Coding Round (Angular Tasks + Solutions)",
  intro: "Hands-on coding tasks interviewers use — with clean, production-style solutions.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Task 1: Debounced Search Component</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Build a search box that queries API with cancellation and shows loading/error states.</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Task 2: Reusable Table Component</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Build a table that supports sort/filter with stable identity and minimal re-renders.</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Task 3: Typed Form With Validation</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">Build a signup form with cross-field validator and clean UX (markAllAsTouched on submit).</p>
            `,
  code: `/**
 * Day 40: Debounced search solution (conceptual)
 */

// state signals:
// const loading = signal(false);
// const error = signal<string | null>(null);
// const results = signal<Item[]>([]);
//
// queryControl.valueChanges.pipe(
//   debounceTime(250),
//   distinctUntilChanged(),
//   tap(() => { loading.set(true); error.set(null); }),
//   switchMap(q => api.search(q).pipe(
//     catchError(() => { error.set('Search failed'); return of([]); }),
//   )),
// ).subscribe((items) => { results.set(items); loading.set(false); });`,
  comparison: {
    junior: `// ❌ no loading state, no cancellation
// results flicker and stale responses win`,
    senior: `// ✅ cancellation + explicit UI state
// switchMap + loading/error/results model`
  },
  interview: {
    questions: [
      {
        q: "How do you prevent stale search results from winning?",
        a: "Use switchMap so previous request is canceled and only the latest response updates state."
      },
      {
        q: "How do you model UI state cleanly?",
        a: "Use explicit state: loading/error/results (or a discriminated union). It prevents invalid UI states."
      },
      {
        q: "How do you keep components testable?",
        a: "Push logic into services/stores, keep components thin, and mock boundaries (HTTP/time) in tests."
      }
    ]
  }
};

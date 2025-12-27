export const day02 = {
  day: 2,
  title: "TypeScript for Angular (Types as Architecture)",
  intro: "Angular at scale is TypeScript engineering. Today you’ll learn how to design types that make components safer and refactors cheap.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Core Ideas</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Interfaces vs types, unions, discriminated unions.</li>
  <li>Typed forms and typed HTTP responses.</li>
  <li>Never lie to the compiler: avoid <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">any</code>.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Model UI State Explicitly</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Most UI bugs happen because state is implicit (null, undefined, partial objects).
Make state explicit with a union so the template knows what’s safe to render.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Type the Boundaries</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">API boundary</span>: type your HttpClient results.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Form boundary</span>: typed reactive forms reduce runtime errors.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Component boundary</span>: Inputs should be typed and required.</li>
</ul>
            `,
  code: `/**
 * Day 2: Discriminated union for safe UIs
 */

// type LoadState<T> =
//   | { status: 'idle' }
//   | { status: 'loading' }
//   | { status: 'success'; data: T }
//   | { status: 'error'; message: string };

// Example use:
// let state: LoadState<User[]> = { status: 'idle' };
// state = { status: 'loading' };
// state = { status: 'success', data: [{ id: '1', name: 'Ada' }] };
//
// Template logic becomes obvious:
// if loading -> show spinner
// if success -> render data
// if error -> render message`,
  comparison: {
    junior: `// ❌ any everywhere
let state: any = {};`,
    senior: `// ✅ typed states
// LoadState<User[]> makes UI safe and predictable`
  },
  interview: {
    questions: [
      {
        q: "What is a discriminated union and why is it useful?",
        a: "It models state transitions safely. The compiler narrows types based on a shared discriminator (like status) which reduces null checks and prevents invalid states."
      },
      {
        q: "Why prefer unknown over any?",
        a: "unknown forces validation before usage, preventing unsafe operations. any disables type checking and spreads bugs."
      },
      {
        q: "How do types improve Angular templates?",
        a: "Template type checking catches property mistakes at build time and makes refactors safer."
      }
    ]
  }
};

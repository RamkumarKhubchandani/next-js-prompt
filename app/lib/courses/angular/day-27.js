export const day27 = {
  day: 27,
  title: "Micro Frontends (Module Federation Concepts)",
  intro: "SSR (Day 26) gave us HTML fast. But the page is dead until it <strong>Hydrates</strong>. Today, we optimize the 'Uncanny Valley' between First Paint and First Interaction.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 27. SSR gives you fast HTML, but if the browser fetches the same data AGAIN, it defeats the purpose."
      },
      {
        type: "talk",
        message: "We use `TransferState` to pass the JSON data from the Server to the Client, serialized in the HTML."
      },
      {
        type: "challenge",
        instruction: "Use `TransferState` to prevent a duplicate API call on the browser side.",
        buggyCode: `// ❌ Calls API on Server AND Browser
getData() {
  return this.http.get('/api/data');
}`,
        solutionCode: `// ✅ Checks TransferState first
getData() {
  const key = makeStateKey('DATA');
  if (this.ts.hasKey(key)) {
    return of(this.ts.get(key, null));
  }
  return this.http.get('/api/data').pipe(
    tap(data => this.ts.set(key, data))
  );
}`,
        verifyOutput: "makeStateKey",
        successMessage: "Optimization unlocked! The server fetches once, and the client reuses that data instantly.",
        hint: "Use `makeStateKey` and check `this.transferState.hasKey(key)`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">💧 1. What is Hydration?</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
When the browser receives SSR HTML, it displays it instantly. But clicking buttons does nothing.
The browser must download JS, run Angular, and "attach" event listeners to the existing DOM. This is <strong>Hydration</strong>.
</p>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
If Hydration is slow, users Rage Click. 😡
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<p class="text-xs font-bold text-purple-500 uppercase mb-2">Enable Hydration (Angular 16+)</p>
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
// app.config.ts
export const appConfig = {
  providers: [
    provideClientHydration() // Reuses DOM instead of destroying/recreating!
  ]
};
</pre>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 2. TransferState (The Bridge)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
<strong>Scenario:</strong> Server calls API for "User Data" to generate HTML.
Browser loads HTML. Hydration starts.
Browser calls API for "User Data" *again*. 🤦‍♂️
</p>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
<strong>Fix:</strong> Use <code>TransferState</code>. The Server puts the JSON data into the HTML (<code>&lt;script id="state"&gt;</code>). The Browser reads it instantly. Zero HTTP calls on client.
</p>
`,
  code: "// Rule: only adopt micro frontends with a real org/team boundary reason.",
  comparison: {
    junior: "// ❌ micro frontends for fun",
    senior: "// ✅ adopt only for org-scale needs"
  },
  interview: {
    questions: [
      {
        q: "When do micro frontends make sense?",
        a: "When multiple teams must deploy independently and the org structure demands separation."
      },
      {
        q: "What is the biggest risk?",
        a: "Inconsistent UX and dependency duplication leading to performance problems."
      },
      {
        q: "How do you share design system across micro frontends?",
        a: "Shared libraries, strict versioning, and governance for UI consistency."
      }
    ]
  }
};

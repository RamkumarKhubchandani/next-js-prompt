export const day15 = {
  day: 15,
  title: "Security (Sanitization, Trusted Types, CSP, Safe DOM)",
  intro: "Security is not optional. Learn Angular’s sanitization model and how to avoid XSS and unsafe DOM patterns.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Golden Rule</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Never trust user input. Prefer data binding. Avoid injecting raw HTML unless you fully control it.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The "Plumbing" Mental Model (RxJS)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Think of data in your app as water.
</p>
<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-brand-primary mb-2">Promises (The Bucket)</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">
      A Promise is like a bucket of water. You get it <strong>once</strong>. If you want more water, you need another bucket (another request).
    </p>
  </div>
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-purple-600 dark:text-purple-400 mb-2">Observables (The Pipe)</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">
      An Observable is a water pipe. You open the tap (subscribe), and water (data) flows continuously over time. You can attach filters (operators) to the pipe to clean the water before it reaches the glass (component).
    </p>
  </div>
</div>

<div class="mb-8 p-5 rounded-xl border border-purple-500/30 bg-purple-500/5">
  <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
    <span class="text-xl">⚔️</span> War Story: The Memory Leak
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    A bank dashboard was crashing every 4 hours. Why?
    A developer subscribed to a data stream in <code>ngOnInit</code> but forgot to unsubscribe in <code>ngOnDestroy</code>.
  </p>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    Every time the user navigated away and back, a NEW subscription was created. 100 navigations = 100 open pipes leaking memory.
  </p>
  <p class="text-xs text-purple-800 dark:text-purple-200 font-bold">
    Fix: Always use the <code>async</code> pipe (which handles unsubscription automatically) or the <code>takeUntilDestroyed</code> operator.
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>How Angular sanitization works (what it blocks and why).</li>
  <li>The difference between <span class="text-yellow-600 dark:text-yellow-400 font-bold">XSS</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">CSRF</span>, and <span class="text-yellow-600 dark:text-yellow-400 font-bold">CSP</span>.</li>
  <li>How to safely render rich content (allowlists).</li>
  <li>Why <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">bypassSecurityTrust*</code> is almost always wrong.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Angular’s Default is Safe</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Angular escapes template bindings by default. The dangerous cases usually appear when you:
<span class="text-yellow-600 dark:text-yellow-400 font-bold">inject HTML</span>, build URLs unsafely, or add inline scripts.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Common Unsafe Patterns</h3>
<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <ul class="list-disc list-inside space-y-2 text-red-800 dark:text-red-200 text-sm">
    <li>Rendering user HTML via <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">[innerHTML]</code> without sanitizing/allowlisting</li>
    <li>Using <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">bypassSecurityTrustHtml</code> on attacker-controlled content</li>
    <li>Building URLs from untrusted input and binding into <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">href</code>/<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">src</code></li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) CSP (Defense in Depth)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Content Security Policy reduces XSS impact by blocking inline scripts and restricting allowed sources.
Even with Angular, CSP is a strong extra safety belt.
</p>
            `,
  code: `// If you must render HTML:
// use Angular sanitization; never bypass unless you understand the risk.
// DomSanitizer.bypassSecurityTrustHtml(...) is a last resort.`,
  comparison: {
    junior: "// ❌ bypassSecurityTrustHtml everywhere",
    senior: "// ✅ sanitize + allowlist"
  },
  interview: {
    questions: [
      {
        q: "What is XSS and how does Angular help?",
        a: "XSS is injecting malicious scripts into pages. Angular sanitizes dangerous bindings and escapes values by default in templates."
      },
      {
        q: "Why is bypassSecurityTrustHtml dangerous?",
        a: "It disables sanitization. If content is attacker-controlled, it can execute scripts and compromise users."
      },
      {
        q: "What is CSP?",
        a: "Content Security Policy limits what scripts/resources can load, reducing XSS impact. It’s a strong defense-in-depth layer."
      }
    ]
  }
};

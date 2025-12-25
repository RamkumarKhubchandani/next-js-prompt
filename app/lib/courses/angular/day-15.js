export const day15 = {
  day: 15,
  title: "Security (Sanitization, Trusted Types, CSP, Safe DOM)",
  intro: "Security is not optional. Learn Angular’s sanitization model and how to avoid XSS and unsafe DOM patterns.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Golden Rule</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Never trust user input. Prefer data binding. Avoid injecting raw HTML unless you fully control it.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>How Angular sanitization works (what it blocks and why).</li>
  <li>The difference between <span class="text-yellow-600 dark:text-yellow-400 font-bold">XSS</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">CSRF</span>, and <span class="text-yellow-600 dark:text-yellow-400 font-bold">CSP</span>.</li>
  <li>How to safely render rich content (allowlists).</li>
  <li>Why <code class="bg-dark-700 px-1 rounded">bypassSecurityTrust*</code> is almost always wrong.</li>
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

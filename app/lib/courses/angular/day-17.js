export const day17 = {
  day: 17,
  title: "i18n (Internationalization) and Localization Strategy",
  intro: "Real products ship globally. Learn translation workflows, formatting, and runtime constraints.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">i18n Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Text extraction + translation pipeline.</li>
  <li>Date/number formatting by locale.</li>
  <li>RTL layout considerations.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Don’t Concatenate Strings</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Concatenation breaks grammar and word order in many languages. Use full sentences and ICU message formats.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Plurals & Gender (ICU Messages)</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
{count, plural,
  =0 {No messages}
  =1 {One message}
  other {{count} messages}
}
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Localization Includes Formatting</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Dates, numbers, currency, and even sort order differ by locale. Treat formatting as part of i18n.
</p>
            `,
  code: "// Use built-in i18n for templates or a runtime translation library depending on needs.",
  comparison: {
    junior: "// ❌ hard-coded strings",
    senior: "// ✅ translation pipeline + locale formatting"
  },
  interview: {
    questions: [
      {
        q: "Why is i18n more than translating strings?",
        a: "Locales affect dates, numbers, currency, pluralization, and layout (RTL). It impacts routing and SEO too."
      },
      {
        q: "Compile-time vs runtime translations?",
        a: "Compile-time is fast and optimized but rebuild per locale. Runtime is flexible but adds runtime cost and complexity."
      },
      {
        q: "What’s a common i18n bug?",
        a: "Concatenating strings in code (breaks translation/grammar). Use full sentences and ICU message formats."
      }
    ]
  }
};

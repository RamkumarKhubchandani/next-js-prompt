export const day22 = {
  day: 22,
  title: "Day 22: Debugging CSS (DevTools, Computed, Box Model, Layers)",
  intro:
    "You’ll debug CSS like an engineer: computed styles, box model inspection, and identifying which layer/selector is winning.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Debug playbook</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Inspect element → check <span class="text-yellow-600 dark:text-yellow-400 font-bold">Computed</span>.</li>
  <li>Find winning selector → fix specificity/order, not with !important.</li>
  <li>Check box model + overflow.</li>
</ol>
`,
  sandbox: {
    html: `<main class="page"><div class="panel"><h1 class="title">Why is this blue?</h1><p class="muted">Fix by editing the right selector.</p></div></main>`,
    css: `:root{--bg:#0b1220;--surface:#111a2c;--text:#e6f0ff;--muted:rgba(230,240,255,.72);--border:rgba(230,240,255,.14)}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{min-height:70vh;display:grid;place-items:center;padding:18px}
.panel{max-width:70ch;border:1px solid var(--border);background:var(--surface);border-radius:16px;padding:18px}
.title{margin:0 0 6px;color:#60a5fa} /* BUG: not token */
.muted{margin:0;color:var(--muted)}`
  }
};



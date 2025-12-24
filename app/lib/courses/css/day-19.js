export const day19 = {
  day: 19,
  title: "Day 19: Critical CSS + Font Loading (Production Concepts)",
  intro:
    "You’ll learn the production concepts behind ‘fast CSS’: critical CSS, font loading strategies, and why `font-display: swap` matters.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">What to know</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Critical CSS</span>: inline the minimum required for above-the-fold content.</li>
  <li><span class="text-yellow-400 font-bold">Fonts</span>: load responsibly; prefer system fonts unless brand requires otherwise.</li>
  <li><code class="bg-dark-900 px-1 rounded">font-display: swap</code> prevents invisible text while fonts load.</li>
</ul>
`,
  sandbox: {
    html: `<main class="page"><section class="panel"><h1>Critical CSS concept</h1><p class="muted">In real apps, critical CSS is the minimum needed to render this panel immediately.</p></section></main>`,
    css: `:root{--bg:#0b1220;--surface:#111a2c;--text:#e6f0ff;--muted:rgba(230,240,255,.72);--border:rgba(230,240,255,.14);--r:16px}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{min-height:70vh;display:grid;place-items:center;padding:18px}
.panel{max-width:70ch;border:1px solid var(--border);background:var(--surface);border-radius:var(--r);padding:18px}
.muted{color:var(--muted)}`
  }
};



export const day14 = {
  day: 14,
  title: "Day 14: ITCSS Layering (Architecture That Scales)",
  intro:
    "You’ll organize CSS like a system: ITCSS layers (settings → tools → generic → elements → objects → components → utilities).",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Core idea</h3>
<p class="text-light-300 mb-6">ITCSS reduces specificity wars by controlling what’s allowed in each layer.</p>
<h3 class="text-xl font-bold text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Identify which rules are tokens (settings) vs components.</li>
  <li>Keep utilities single-purpose and last.</li>
</ul>
`,
  sandbox: {
    html: `<main class="page">
  <article class="c-card">
    <h1 class="c-card__title">ITCSS Card</h1>
    <p class="c-card__body">This file demonstrates layered CSS in one place (for learning).</p>
    <button class="c-btn u-mt-2" type="button">Action</button>
  </article>
</main>`,
    css: `/* SETTINGS (tokens) */
:root{--bg:#0b1220;--surface:#111a2c;--text:#e6f0ff;--muted:rgba(230,240,255,.72);--border:rgba(230,240,255,.14);--brand:#00ff96;--r:16px}
/* GENERIC (reset) */
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
/* OBJECTS (layout primitives) */
.page{max-width:900px;margin:0 auto;padding:26px 16px 48px}
/* COMPONENTS (named UI) */
.c-card{border:1px solid var(--border);background:var(--surface);border-radius:var(--r);padding:18px}
.c-card__title{margin:0 0 8px}
.c-card__body{margin:0 0 12px;color:var(--muted)}
.c-btn{border:0;border-radius:12px;padding:10px 14px;font-weight:900;background:var(--brand);color:#00120b}
.c-btn:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}
/* UTILITIES (single-purpose overrides, last) */
.u-mt-2{margin-top:8px}
`
  }
};



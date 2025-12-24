export const day05 = {
  day: 5,
  title: "Day 5: Color + Contrast (WCAG AA Practical)",
  intro:
    "You’ll build a color system that actually works: tokens, readable contrast, and UI states that remain accessible in dark mode.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Problem framing</h3>
<p class="text-light-300 mb-6">Beautiful UI that fails contrast is unusable UI. Contrast is a product requirement.</p>

<h3 class="text-xl font-bold text-white mb-4">Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Use <span class="text-yellow-400 font-bold">tokens</span> (bg/surface/text/muted/border/brand).</li>
  <li>Prefer <span class="text-yellow-400 font-bold">solid text colors</span> over low opacity on dark backgrounds.</li>
  <li>Design states: hover/focus/disabled with readable contrast.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Adjust token values and ensure button text remains readable.</li>
  <li>Create a secondary button style with accessible contrast.</li>
  <li>Add a high-contrast mode token set (optional).</li>
</ul>
`,
  sandbox: {
    html: `<!-- Day 5: contrast UI -->
<main class="page">
  <section class="panel">
    <h1 class="title">Color & Contrast</h1>
    <p class="subtitle">Tokens make color consistent. Contrast makes it usable.</p>
    <div class="row">
      <button class="btn" type="button">Primary</button>
      <button class="btn btn--secondary" type="button">Secondary</button>
      <button class="btn btn--disabled" type="button" disabled>Disabled</button>
    </div>
    <p class="note">Goal: all text is readable without squinting.</p>
  </section>
</main>`,
    css: `:root{
  --bg:#0b1220;
  --surface:#111a2c;
  --text:#e6f0ff;
  --muted:rgba(230,240,255,.72);
  --border:rgba(230,240,255,.14);
  --brand:#00ff96;
  --brandText:#00120b;
  --r:16px;
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:900px;margin:0 auto;padding:26px 16px 48px}
.panel{border:1px solid var(--border);background:var(--surface);border-radius:var(--r);padding:18px}
.title{margin:0 0 6px}
.subtitle{margin:0 0 14px;color:var(--muted)}
.row{display:flex;gap:12px;flex-wrap:wrap}
.btn{border:0;border-radius:12px;padding:10px 14px;font-weight:900;background:var(--brand);color:var(--brandText)}
.btn--secondary{background:rgba(255,255,255,.08);color:var(--text);border:1px solid var(--border)}
.btn--disabled{background:rgba(255,255,255,.05);color:rgba(230,240,255,.45);border:1px solid rgba(230,240,255,.12)}
.btn:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}
.note{margin:14px 0 0;color:var(--muted)}
`,
  },
};



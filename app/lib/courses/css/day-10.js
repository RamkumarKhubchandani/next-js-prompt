export const day10 = {
  day: 10,
  title: "Day 10: Container Queries (Component-Driven Responsiveness)",
  intro:
    "You’ll make components responsive to their container, not the viewport—so they work in sidebars, modals, and grids without extra breakpoints.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Core idea</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">Viewport breakpoints are page-level. Container queries are component-level.</p>
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Make the card switch layout when its container grows.</li>
  <li>Do not use media queries for the component behavior.</li>
</ul>
`,
  sandbox: {
    html: `<main class="page">
  <div class="grid">
    <section class="slot">
      <article class="card">
        <h2 class="card__title">Container Query Card</h2>
        <p class="card__body">This card changes layout based on the container width.</p>
      </article>
    </section>
    <section class="slot slot--wide">
      <article class="card">
        <h2 class="card__title">Same component</h2>
        <p class="card__body">But a wider container triggers a different layout.</p>
      </article>
    </section>
  </div>
</main>`,
    css: `:root{--bg:#0b1220;--panel:#111a2c;--text:#e6f0ff;--muted:rgba(230,240,255,.72);--border:rgba(230,240,255,.14);--r:16px;--brand:#00ff96}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:1100px;margin:0 auto;padding:26px 16px 48px}
.grid{display:grid;grid-template-columns:1fr;gap:14px}
.slot{container-type:inline-size;border:1px solid var(--border);border-radius:var(--r);padding:14px;background:rgba(0,0,0,.18)}
.slot--wide{max-width:900px}
.card{border:1px solid rgba(230,240,255,.12);border-radius:14px;padding:14px;background:rgba(0,0,0,.18)}
.card__title{margin:0 0 6px}
.card__body{margin:0;color:var(--muted)}
@container (min-width: 520px){
  .card{display:grid;grid-template-columns: 1fr 1fr;gap:12px;align-items:start}
  .card__title{grid-column:1 / -1}
}`
  }
};



export const day13 = {
  day: 13,
  title: "Day 13: BEM Naming (Predictable, Scalable CSS)",
  intro:
    "You’ll learn BEM as a practical convention that prevents collisions and makes components understandable in large codebases.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Core idea</h3>
<p class="text-light-300 mb-6">BEM is naming as architecture: Block → Element → Modifier. It’s boring on purpose.</p>
<h3 class="text-xl font-bold text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Add a new modifier (e.g. <code class="bg-dark-900 px-1 rounded">card--featured</code>) without changing base styles.</li>
  <li>Add a new element class (e.g. <code class="bg-dark-900 px-1 rounded">card__meta</code>).</li>
</ul>
`,
  sandbox: {
    html: `<main class="page">
  <article class="card card--featured">
    <p class="card__eyebrow">Featured</p>
    <h1 class="card__title">BEM Card</h1>
    <p class="card__body">Block: card • Elements: __title, __body • Modifier: --featured</p>
    <a class="card__link" href="#more">Read more →</a>
  </article>
</main>`,
    css: `:root{--bg:#0b1220;--surface:#111a2c;--text:#e6f0ff;--muted:rgba(230,240,255,.72);--border:rgba(230,240,255,.14);--brand:#00ff96;--r:16px}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:900px;margin:0 auto;padding:26px 16px 48px}
.card{border:1px solid var(--border);background:var(--surface);border-radius:var(--r);padding:18px}
.card__eyebrow{margin:0 0 10px;color:var(--brand);font-weight:900;letter-spacing:.14em;text-transform:uppercase;font-size:12px}
.card__title{margin:0 0 8px}
.card__body{margin:0 0 12px;color:var(--muted)}
.card__link{color:var(--brand);text-decoration:none;font-weight:900}
.card__link:hover{text-decoration:underline}
.card--featured{box-shadow:0 0 0 4px rgba(0,255,150,.08), 0 20px 60px rgba(0,0,0,.35);border-color:rgba(0,255,150,.35)}
`
  }
};



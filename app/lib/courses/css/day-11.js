export const day11 = {
  day: 11,
  title: "Day 11: CSS Custom Properties (Design Tokens + Component Variants)",
  intro:
    "You’ll use CSS variables to build a token system and component variants without duplicating styles.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Core idea</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">Tokens are the API of your design system. Components read tokens; themes swap tokens.</p>
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Add a danger button variant by overriding component variables.</li>
  <li>Add a light theme section by swapping tokens in a wrapper.</li>
</ul>
`,
  sandbox: {
    html: `<main class="page">
  <section class="panel">
    <h1>Tokens + Variants</h1>
    <div class="row">
      <button class="btn" type="button">Primary</button>
      <button class="btn btn--danger" type="button">Danger</button>
    </div>
  </section>
  <section class="panel theme--light">
    <h2>Light theme container</h2>
    <div class="row">
      <button class="btn" type="button">Primary</button>
      <button class="btn btn--danger" type="button">Danger</button>
    </div>
  </section>
</main>`,
    css: `:root{
  --bg:#0b1220;--surface:#111a2c;--text:#e6f0ff;--muted:rgba(230,240,255,.72);
  --border:rgba(230,240,255,.14);--brand:#00ff96;--brandText:#00120b;--r:16px;
  --danger:#ff5d5d;
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:900px;margin:0 auto;padding:26px 16px 48px;display:grid;gap:14px}
.panel{border:1px solid var(--border);background:var(--surface);border-radius:var(--r);padding:18px}
.row{display:flex;gap:12px;flex-wrap:wrap;margin-top:10px}

.btn{
  --btn-bg: var(--brand);
  --btn-fg: var(--brandText);
  --btn-border: rgba(0,255,150,.35);
  border:1px solid var(--btn-border);
  border-radius:12px;
  padding:10px 14px;
  font-weight:900;
  background:var(--btn-bg);
  color:var(--btn-fg);
}
.btn--danger{
  --btn-bg: rgba(255,93,93,.18);
  --btn-fg: var(--text);
  --btn-border: rgba(255,93,93,.35);
}
.btn:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}

.theme--light{
  --bg:#f6f7fb;
  --surface:#ffffff;
  --text:#0b1220;
  --muted:rgba(11,18,32,.72);
  --border:rgba(11,18,32,.14);
  --brand:#0ea5e9;
  --brandText:#061018;
}
`
  }
};



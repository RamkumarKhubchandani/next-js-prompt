export const day12 = {
  day: 12,
  title: "Day 12: Light/Dark + High Contrast (prefers-color-scheme)",
  intro:
    "You’ll implement theming correctly: default tokens, light/dark variants, and a high-contrast mode that keeps UI readable.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Core idea</h3>
<p class="text-light-300 mb-6">Don’t restyle every component. Swap tokens at the root and let components inherit.</p>
<h3 class="text-xl font-bold text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Add a high-contrast mode wrapper that increases border/foreground contrast.</li>
  <li>Respect <code class="bg-dark-900 px-1 rounded">prefers-color-scheme</code> for defaults.</li>
</ul>
`,
  sandbox: {
    html: `<main class="page">
  <section class="panel">
    <h1>Theming</h1>
    <p class="muted">Switch OS theme to see default changes.</p>
    <button class="btn" type="button">Action</button>
  </section>
  <section class="panel hc">
    <h2>High contrast container</h2>
    <p class="muted">Tokens are stronger here.</p>
    <button class="btn" type="button">Action</button>
  </section>
</main>`,
    css: `:root{
  color-scheme: dark light;
  --bg:#0b1220;--surface:#111a2c;--text:#e6f0ff;--muted:rgba(230,240,255,.72);
  --border:rgba(230,240,255,.14);--brand:#00ff96;--brandText:#00120b;--r:16px;
}
@media (prefers-color-scheme: light){
  :root{
    --bg:#f6f7fb;--surface:#ffffff;--text:#0b1220;--muted:rgba(11,18,32,.72);
    --border:rgba(11,18,32,.14);--brand:#0ea5e9;--brandText:#061018;
  }
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:900px;margin:0 auto;padding:26px 16px 48px;display:grid;gap:14px}
.panel{border:1px solid var(--border);background:var(--surface);border-radius:var(--r);padding:18px}
.muted{color:var(--muted)}
.btn{border:1px solid rgba(0,255,150,.35);border-radius:12px;padding:10px 14px;font-weight:900;background:var(--brand);color:var(--brandText)}
.btn:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}
.hc{
  --border: rgba(255,255,255,.32);
  --muted: rgba(255,255,255,.86);
  --brand: #ffffff;
  --brandText:#000;
}
`
  }
};



export const day06 = {
  day: 6,
  title: "Day 6: Positioning + Stacking Context (z-index Without Guessing)",
  intro:
    "You’ll learn the real reasons overlays break: positioning, stacking context, and how to build a modal/tooltip layer predictably.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Problem framing</h3>
<p class="text-light-300 mb-6">If you “increase z-index until it works,” you don’t understand stacking contexts yet. Today you will.</p>

<h3 class="text-xl font-bold text-white mb-4">Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><code class="bg-dark-900 px-1 rounded">position</code>: static/relative/absolute/fixed.</li>
  <li><span class="text-yellow-400 font-bold">Stacking context</span> can be created by transforms/opacity/position+z-index.</li>
  <li>Use a dedicated overlay layer (one place for z-index tokens).</li>
</ul>
`,
  sandbox: {
    html: `<!-- Day 6: stacking context demo -->
<main class="page">
  <section class="panel">
    <h1 class="title">Stacking Context</h1>
    <p class="subtitle">Goal: make the toast appear above everything reliably.</p>

    <div class="canvas">
      <div class="card">
        <p class="card__title">Card</p>
        <p class="card__body">This card creates a stacking context (transform).</p>
        <button class="btn" type="button">Button</button>
      </div>

      <div class="toast" role="status" aria-live="polite">
        Saved successfully
      </div>
    </div>
  </section>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
  --z-base: 0;
  --z-overlay: 50;
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:980px;margin:0 auto;padding:26px 16px 48px}
.panel{border:1px solid var(--border);background:var(--panel);border-radius:var(--r);padding:18px}
.title{margin:0 0 6px}
.subtitle{margin:0 0 14px;color:var(--muted)}
.canvas{position:relative;min-height:320px;border:1px dashed rgba(230,240,255,.18);border-radius:14px;padding:14px;background:rgba(0,0,0,.14)}
.card{
  width:min(420px, 100%);
  border:1px solid rgba(230,240,255,.12);
  border-radius:14px;
  padding:14px;
  background:rgba(0,0,0,.18);
  transform: translateZ(0); /* creates stacking context */
  position:relative;
  z-index: var(--z-base);
}
.card__title{margin:0 0 6px;font-weight:900}
.card__body{margin:0 0 10px;color:var(--muted)}
.btn{border:0;border-radius:12px;padding:10px 14px;font-weight:900;background:var(--brand);color:#00120b}
.toast{
  position:absolute;
  right:14px; bottom:14px;
  border-radius:12px;
  padding:10px 12px;
  background:rgba(0,255,150,.12);
  border:1px solid rgba(0,255,150,.35);
  color:var(--text);
  z-index: var(--z-overlay);
}
`,
  },
};



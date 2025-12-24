export const day02 = {
  day: 2,
  title: "Day 2: Box Model + Sizing (Reliable Spacing, No Surprises)",
  intro:
    "Today you’ll make spacing predictable: the box model, margin vs padding, border sizing, and why `box-sizing: border-box` is non-negotiable.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Problem framing</h3>
<p class="text-light-300 mb-6">
If your layout “doesn’t fit” and you keep adding random margins, you’re fighting the box model. Professionals reason in boxes.
</p>

<h3 class="text-xl font-bold text-white mb-4">Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Content → Padding → Border → Margin</span> (in that order).</li>
  <li><span class="text-yellow-400 font-bold">Sizing</span>: with <code class="bg-dark-900 px-1 rounded">border-box</code>, width includes padding/border.</li>
  <li><span class="text-yellow-400 font-bold">Margin collapse</span>: vertical margins can collapse between blocks.</li>
  <li><span class="text-yellow-400 font-bold">Modern spacing</span>: use <code class="bg-dark-900 px-1 rounded">gap</code> for flex/grid spacing.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Make both cards exactly equal width without overflow.</li>
  <li>Replace margins between inline elements with <code class="bg-dark-900 px-1 rounded">gap</code>.</li>
  <li>Observe margin collapse by toggling the wrapper padding.</li>
</ul>
`,
  sandbox: {
    html: `<!-- Day 2: box model lab -->
<main class="page">
  <h1 class="title">Box Model Lab</h1>
  <p class="subtitle">Your goal: no overflow, consistent spacing, predictable sizing.</p>

  <section class="wrap">
    <article class="card">
      <h2 class="card__title">Card A</h2>
      <p class="card__body">Padding should not cause overflow when width is set.</p>
      <div class="pill-row">
        <span class="pill">Spacing</span>
        <span class="pill">Should</span>
        <span class="pill">Be</span>
        <span class="pill">Gap</span>
      </div>
    </article>

    <article class="card">
      <h2 class="card__title">Card B</h2>
      <p class="card__body">Try resizing the window: layout must remain stable.</p>
      <div class="pill-row">
        <span class="pill">No</span>
        <span class="pill">Random</span>
        <span class="pill">Margins</span>
      </div>
    </article>
  </section>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
}
/* Non-negotiable: border-box for predictable sizing */
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:1100px;margin:0 auto;padding:26px 16px}
.title{margin:0 0 6px}
.subtitle{margin:0 0 16px;color:var(--muted)}

.wrap{
  display:grid;
  grid-template-columns:1fr;
  gap:16px;
  /* Try removing this padding to observe margin collapse effects in other layouts */
  padding:0;
}
.card{
  border:1px solid var(--border);
  background:rgba(0,0,0,.18);
  border-radius:var(--r);
  padding:16px; /* included in width because of border-box */
}
.card__title{margin:0 0 8px}
.card__body{margin:0 0 12px;color:var(--muted)}
.pill-row{
  display:flex;
  flex-wrap:wrap;
  gap:8px; /* correct spacing mechanism */
}
.pill{
  padding:6px 10px;
  border-radius:999px;
  border:1px solid rgba(0,255,150,.35);
  background:rgba(0,255,150,.12);
  color:var(--brand);
  font-weight:900;
  font-size:12px;
}
@media (min-width: 900px){
  .wrap{grid-template-columns:repeat(2, minmax(0, 1fr))}
}`,
  },
};



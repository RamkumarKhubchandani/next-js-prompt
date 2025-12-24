export const day07 = {
  day: 7,
  title: "Day 7: CSS Grid Layout (Dashboards and Real Page Layouts)",
  intro:
    "Grid is your 2D layout tool. Today you’ll build a dashboard layout that stays stable across breakpoints without hacks.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Problem framing</h3>
<p class="text-light-300 mb-6">Flexbox is great for rows. Grid is for pages. If you’re building layouts with nested divs, Grid is your upgrade.</p>

<h3 class="text-xl font-bold text-white mb-4">Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><code class="bg-dark-900 px-1 rounded">grid-template-columns</code> + <code class="bg-dark-900 px-1 rounded">gap</code></li>
  <li><code class="bg-dark-900 px-1 rounded">minmax(0, 1fr)</code> to prevent overflow</li>
  <li>Named areas for readability (optional)</li>
</ul>
`,
  sandbox: {
    html: `<!-- Day 7: grid page -->
<main class="page">
  <header class="topbar">Dashboard</header>
  <aside class="sidebar">Sidebar</aside>
  <section class="content">
    <div class="cards">
      <div class="card">Card</div>
      <div class="card">Card</div>
      <div class="card">Card</div>
      <div class="card">Card</div>
    </div>
  </section>
  <footer class="footer">Footer</footer>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{
  min-height:100vh;
  display:grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
  gap:12px;
  padding:12px;
}
.topbar,.sidebar,.content,.footer{
  border:1px solid var(--border);
  background:rgba(0,0,0,.18);
  border-radius:14px;
  padding:14px;
}
.cards{display:grid;grid-template-columns:1fr;gap:12px}
.card{border:1px solid rgba(230,240,255,.12);border-radius:14px;padding:14px;background:rgba(255,255,255,.04);color:var(--muted)}
@media (min-width: 980px){
  .page{
    grid-template-columns: 280px minmax(0, 1fr);
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "topbar topbar"
      "sidebar content"
      "footer footer";
  }
  .topbar{grid-area:topbar}
  .sidebar{grid-area:sidebar;position:sticky;top:12px;height:fit-content}
  .content{grid-area:content}
  .footer{grid-area:footer}
  .cards{grid-template-columns:repeat(2, minmax(0, 1fr))}
}
`,
  },
};



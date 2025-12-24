export const day08 = {
  day: 8,
  title: "Day 8: Responsive Design (Mobile-First + Breakpoints That Don’t Rot)",
  intro:
    "You’ll build a mobile-first layout that scales cleanly: sensible breakpoints, fluid containers, and zero magic numbers.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Core idea</h3>
<p class="text-light-300 mb-6">Start with the smallest layout that works, then enhance. Don’t “undo” desktop assumptions on mobile.</p>
<h3 class="text-xl font-bold text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Make the sidebar collapse to top on small screens.</li>
  <li>Ensure cards wrap without overflow using <code class="bg-dark-900 px-1 rounded">minmax(0,1fr)</code> or flex-basis.</li>
  <li>Use fluid spacing (clamp) for padding.</li>
</ul>
`,
  sandbox: {
    html: `<main class="page"><aside class="aside">Filters</aside><section class="main"><h1>Responsive</h1><div class="cards"><div class="card">A</div><div class="card">B</div><div class="card">C</div></div></section></main>`,
    css: `:root{--bg:#0b1220;--panel:#111a2c;--text:#e6f0ff;--muted:rgba(230,240,255,.72);--border:rgba(230,240,255,.14);--r:16px}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:1100px;margin:0 auto;padding:clamp(12px,2vw,18px);display:grid;grid-template-columns:1fr;gap:12px}
.aside,.main{border:1px solid var(--border);background:var(--panel);border-radius:var(--r);padding:14px}
.cards{display:grid;grid-template-columns:1fr;gap:12px;margin-top:12px}
.card{border:1px solid rgba(230,240,255,.12);background:rgba(0,0,0,.18);border-radius:14px;padding:14px;color:var(--muted)}
@media (min-width: 980px){
  .page{grid-template-columns:280px minmax(0,1fr);align-items:start}
  .cards{grid-template-columns:repeat(3, minmax(0,1fr))}
}`
  }
};



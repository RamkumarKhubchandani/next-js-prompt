export const day18 = {
  day: 18,
  title: "Day 18: Performance CSS (Avoid Layout Thrash, Use Transform)",
  intro:
    "You’ll learn how CSS can cause jank, and how to keep interactions fast by avoiding layout-triggering animations.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Rule of thumb</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">If you animate width/height/top/left, you’re likely triggering layout. Prefer transform.</p>
`,
  sandbox: {
    html: `<main class="page"><div class="tile">Hover</div></main>`,
    css: `:root{--bg:#0b1220;--surface:#111a2c;--text:#e6f0ff;--border:rgba(230,240,255,.14);--brand:#00ff96}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{min-height:70vh;display:grid;place-items:center}
.tile{
  width:220px;height:120px;border-radius:16px;
  border:1px solid var(--border);background:var(--surface);
  display:grid;place-items:center;font-weight:900;color:var(--brand);
  transition: transform .18s ease, box-shadow .18s ease;
  will-change: transform;
}
.tile:hover{transform: translateY(-4px) scale(1.02);box-shadow:0 18px 50px rgba(0,0,0,.35)}
@media (prefers-reduced-motion: reduce){.tile{transition:none}}`
  }
};



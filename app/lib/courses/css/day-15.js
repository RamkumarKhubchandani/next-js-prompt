export const day15 = {
  day: 15,
  title: "Day 15: Transitions (Micro-Interactions Without Jank)",
  intro:
    "You’ll add motion that feels premium: transitions, hover states, and focus states using GPU-friendly properties.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Core idea</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">Prefer <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">transform</code> and <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">opacity</code>. Avoid animating layout properties.</p>
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Add a hover lift using transform.</li>
  <li>Respect <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">prefers-reduced-motion</code>.</li>
</ul>
`,
  sandbox: {
    html: `<main class="page">
  <article class="card">
    <h1 class="card__title">Hover me</h1>
    <p class="card__body">This should feel smooth, not jumpy.</p>
    <button class="btn" type="button">Action</button>
  </article>
</main>`,
    css: `:root{--bg:#0b1220;--surface:#111a2c;--text:#e6f0ff;--muted:rgba(230,240,255,.72);--border:rgba(230,240,255,.14);--brand:#00ff96;--r:16px}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:900px;margin:0 auto;padding:26px 16px 48px}
.card{
  border:1px solid var(--border);background:var(--surface);border-radius:var(--r);padding:18px;
  transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
}
.card__title{margin:0 0 8px}
.card__body{margin:0 0 12px;color:var(--muted)}
.btn{border:0;border-radius:12px;padding:10px 14px;font-weight:900;background:var(--brand);color:#00120b}
.btn:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}
.card:hover{
  transform: translateY(-3px);
  border-color: rgba(0,255,150,.35);
  box-shadow: 0 20px 60px rgba(0,0,0,.35);
}
@media (prefers-reduced-motion: reduce){
  *{transition:none!important;animation:none!important}
}`
  }
};



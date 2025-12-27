export const day16 = {
  day: 16,
  title: "Day 16: Keyframes (Animations That Respect Performance)",
  intro:
    "You’ll create a tiny loading indicator using keyframes, and learn what not to animate for performance.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Rule</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">Animate <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">transform</code>/<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">opacity</code>, not layout properties.</p>
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Practice</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Make the dots animation smooth.</li>
  <li>Disable it for <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">prefers-reduced-motion</code>.</li>
</ul>
`,
  sandbox: {
    html: `<main class="page"><div class="loader" aria-label="Loading" role="status"><span></span><span></span><span></span></div></main>`,
    css: `:root{--bg:#0b1220;--text:#e6f0ff;--brand:#00ff96}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{min-height:70vh;display:grid;place-items:center}
.loader{display:flex;gap:10px}
.loader span{width:12px;height:12px;border-radius:999px;background:rgba(0,255,150,.35);animation:bounce .6s ease-in-out infinite alternate}
.loader span:nth-child(2){animation-delay:.15s}
.loader span:nth-child(3){animation-delay:.3s}
@keyframes bounce{to{transform:translateY(-10px);opacity:1}}
@media (prefers-reduced-motion: reduce){.loader span{animation:none}}`
  }
};



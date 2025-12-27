export const day21 = {
  day: 21,
  title: "Day 21: RTL Support in CSS (Logical Properties Everywhere)",
  intro:
    "You’ll ensure layouts work in RTL with minimal changes by using logical properties and avoiding left/right assumptions.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Practice</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Use margin-inline/padding-inline instead of left/right.</li>
  <li>Center nav with margin-inline:auto (works in RTL).</li>
</ul>
`,
  sandbox: {
    html: `<main class="page" dir="rtl"><header class="bar"><span class="brand">ASIO</span><nav class="nav"><a href="#a">A</a><a href="#b">B</a><a href="#c">C</a></nav><button class="btn" type="button">Start</button></header></main>`,
    css: `:root{--bg:#0b1220;--surface:#111a2c;--text:#e6f0ff;--border:rgba(230,240,255,.14);--brand:#00ff96}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:1100px;margin:0 auto;padding:26px 16px}
.bar{display:flex;align-items:center;gap:12px;flex-wrap:wrap;border:1px solid var(--border);background:var(--surface);border-radius:16px;padding:14px}
.brand{color:var(--brand);font-weight:900;letter-spacing:.08em}
.nav{display:flex;gap:8px;flex-wrap:wrap;margin-inline:auto}
.nav a{text-decoration:none;color:rgba(230,240,255,.72);padding:8px 10px;border-radius:10px}
.nav a:hover{background:rgba(255,255,255,.06);color:var(--text)}
.btn{border:0;border-radius:12px;padding:10px 14px;font-weight:900;background:var(--brand);color:#00120b}`
  }
};



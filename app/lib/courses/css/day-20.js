export const day20 = {
  day: 20,
  title: "Day 20: Print Styles (Export-Friendly Pages)",
  intro:
    "You’ll add print CSS so pages export cleanly: remove nav, expand content, and improve readability on paper/PDF.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Practice</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Hide non-essential UI for print.</li>
  <li>Ensure links show their URL in print.</li>
</ul>
`,
  sandbox: {
    html: `<header class="nav">Navbar</header><main class="page"><h1>Printable Article</h1><p>Try printing in your browser: nav should disappear.</p><a href="https://example.com">Reference link</a></main>`,
    css: `:root{--bg:#0b1220;--text:#e6f0ff}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.nav{padding:14px;border-bottom:1px solid rgba(255,255,255,.14)}
.page{max-width:70ch;margin:0 auto;padding:22px 16px 48px}
@media print{
  body{background:#fff;color:#000}
  .nav{display:none}
  a::after{content:" (" attr(href) ")";font-size:11px;color:#333}
}`
  }
};



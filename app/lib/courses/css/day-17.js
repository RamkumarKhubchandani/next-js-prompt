export const day17 = {
  day: 17,
  title: "Day 17: Accessibility in CSS (Focus, Reduced Motion, Color Scheme)",
  intro:
    "You’ll implement the CSS pieces of accessibility: visible focus, reduced motion, and theming hints to the browser.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><code class="bg-dark-900 px-1 rounded">:focus-visible</code> styled for all controls</li>
  <li><code class="bg-dark-900 px-1 rounded">prefers-reduced-motion</code> respected</li>
  <li><code class="bg-dark-900 px-1 rounded">color-scheme</code> set to support form controls</li>
</ul>
`,
  sandbox: {
    html: `<main class="page"><a class="link" href="#x">Focusable link</a> <button class="btn" type="button">Button</button></main>`,
    css: `:root{color-scheme:dark light;--bg:#0b1220;--text:#e6f0ff;--brand:#00ff96}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{min-height:70vh;display:grid;place-items:center;gap:12px}
.btn{border:0;border-radius:12px;padding:10px 14px;font-weight:900;background:var(--brand);color:#00120b}
.link{color:var(--brand);font-weight:900;text-decoration:none}
.link:hover{text-decoration:underline}
.btn:focus-visible,.link:focus-visible{outline:3px solid rgba(0,255,150,.55);outline-offset:3px}
@media (prefers-reduced-motion: reduce){*{transition:none!important;animation:none!important}}`
  }
};



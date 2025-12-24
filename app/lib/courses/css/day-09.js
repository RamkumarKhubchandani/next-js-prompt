export const day09 = {
  day: 9,
  title: "Day 9: Modern Units (rem, clamp, min/max, svh) + Fluid Spacing",
  intro:
    "You’ll stop hardcoding px. Today you’ll build a fluid spacing + sizing system that adapts to devices (including mobile browser UI).",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Why this matters</h3>
<p class="text-light-300 mb-6">Fluid systems reduce breakpoints and create consistency across device sizes and zoom levels.</p>
<h3 class="text-xl font-bold text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Make padding fluid with <code class="bg-dark-900 px-1 rounded">clamp()</code>.</li>
  <li>Use <code class="bg-dark-900 px-1 rounded">svh</code> for stable viewport sections.</li>
  <li>Use rem for typography and spacing tokens.</li>
</ul>
`,
  sandbox: {
    html: `<main class="shell"><section class="hero"><h1>Fluid UI</h1><p>Resize the viewport: spacing and font size adapt.</p></section></main>`,
    css: `:root{
  --bg:#0b1220;--text:#e6f0ff;--muted:rgba(230,240,255,.72);--panel:#111a2c;--border:rgba(230,240,255,.14);
  --pad: clamp(1rem, 2vw, 1.5rem);
  --h1: clamp(1.8rem, 1.2rem + 2.5vw, 3rem);
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.shell{min-height:100svh;display:grid;place-items:center;padding:var(--pad)}
.hero{max-width:70ch;border:1px solid var(--border);background:var(--panel);border-radius:16px;padding:var(--pad)}
h1{margin:0 0 .5rem;font-size:var(--h1);line-height:1.1}
p{margin:0;color:var(--muted)}`
  }
};



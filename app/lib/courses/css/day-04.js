export const day04 = {
  day: 4,
  title: "Typography Systems",
  subtitle: "Professional Text Styling",
  intro: "Master typography - the foundation of great design. Learn font properties, sizing systems, and fluid typography with clamp().",
  duration: "30 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Use **rem for font sizes**, not px. 1rem = root font size (usually 16px). This respects user preferences and makes scaling easy."
      },
      {
        type: "challenge",
        task: "Make this heading responsive using clamp() for fluid typography.",
        buggyCode: `.heading {
  font-size: 48px; /* Fixed size */
}`,
        solutionCode: `.heading {
  font-size: clamp(2rem, 5vw, 4rem);
  /* min: 2rem, preferred: 5vw, max: 4rem */
}`,
        verifyOutput: (code) => code.includes("clamp"),
        successMessage: "Perfect! clamp() creates fluid typography that scales smoothly between min and max values.",
        hint: "Use clamp(2rem, 5vw, 4rem) for responsive sizing."
      }
    ]
  },

  content: `
<h2>Typography Hierarchy</h2>
<p>Good typography creates visual hierarchy and improves readability. Use a consistent type scale.</p>

<h3>Font Size Units</h3>
<ul>
  <li><strong>rem</strong>: Relative to root font size (recommended)</li>
  <li><strong>em</strong>: Relative to parent font size</li>
  <li><strong>px</strong>: Fixed pixels (avoid for font sizes)</li>
  <li><strong>%</strong>: Percentage of parent</li>
</ul>

<h2>Type Scale</h2>
<p>Use a consistent scale (e.g., 1.25, 1.5, 2, 3, 4) for font sizes:</p>
<pre><code>--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.25rem;   /* 20px */
--text-xl: 1.5rem;    /* 24px */
--text-2xl: 2rem;     /* 32px */</code></pre>

<h2>Line Height Rules</h2>
<ul>
  <li>Body text: 1.5-1.8</li>
  <li>Headings: 1.1-1.3</li>
  <li>Use unitless values (1.5, not 1.5rem)</li>
</ul>
  `,

  checkpoints: [
    {
      question: "Which unit should you use for font sizes?",
      options: [
        "rem (relative to root)",
        "px (pixels)",
        "em (relative to parent)",
        "pt (points)"
      ],
      correct: 0,
      explanation: "Use rem for font sizes. It respects user preferences, makes scaling easy, and is more accessible than px."
    },
    {
      question: "What's a good line-height for body text?",
      options: [
        "1.0",
        "1.5-1.8",
        "2.5",
        "0.5"
      ],
      correct: 1,
      explanation: "Body text should have line-height between 1.5-1.8 for optimal readability. Headings can be tighter (1.1-1.3)."
    }
  ],

  recap: {
    takeaways: [
      "Use rem for font sizes, not px.",
      "Create a consistent type scale (1.25, 1.5, 2, etc.).",
      "Line-height: 1.5-1.8 for body, 1.1-1.3 for headings.",
      "Use clamp() for fluid, responsive typography.",
      "letter-spacing: negative for headings, positive for uppercase."
    ],
    commonMistakes: [
      "Using px instead of rem.",
      "Inconsistent font sizes (no scale).",
      "Wrong line-height values.",
      "Not using web fonts properly."
    ],
    nextActions: [
      "Create a type scale system.",
      "Implement fluid typography with clamp().",
      "Day 5: Advanced Flexbox."
    ]
  },

  propertyExamples: [
    {
      property: "font-family",
      description: "Defines the typeface. Use a font stack with fallbacks. System fonts are fast and look native.",
      html: `<div class="font-demo">
  <p class="serif">Serif Font (Georgia)</p>
  <p class="sans">Sans-serif (System UI)</p>
  <p class="mono">Monospace (Courier)</p>
</div>`,
      css: `.font-demo {
  background: #0f0f23;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.serif {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.5rem;
  color: #667eea;
  padding: 20px;
  background: #1a1a2e;
  border-radius: 10px;
}

.sans {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.5rem;
  color: #48bb78;
  padding: 20px;
  background: #1a1a2e;
  border-radius: 10px;
}

.mono {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.3rem;
  color: #e94560;
  padding: 20px;
  background: #1a1a2e;
  border-radius: 10px;
}`
    },
    {
      property: "font-size (rem vs em vs px)",
      description: "rem = relative to root (16px default). em = relative to parent. px = fixed pixels. Use rem for consistency!",
      html: `<div class="size-demo">
  <div class="px-size">24px (fixed)</div>
  <div class="rem-size">1.5rem (24px if root is 16px)</div>
  <div class="em-size">1.5em (relative to parent)</div>
</div>`,
      css: `.size-demo {
  background: #1a1a2e;
  padding: 30px;
  font-size: 16px; /* Parent size */
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.px-size {
  font-size: 24px; /* Fixed - doesn't scale */
  background: #667eea;
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-weight: bold;
}

.rem-size {
  font-size: 1.5rem; /* 24px (1.5 × 16px root) */
  background: #48bb78;
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-weight: bold;
}

.em-size {
  font-size: 1.5em; /* 24px (1.5 × 16px parent) */
  background: #e94560;
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-weight: bold;
}`
    },
    {
      property: "font-weight",
      description: "Controls text thickness. Values: 100-900 or keywords (normal=400, bold=700). Use variable fonts for all weights.",
      html: `<div class="weight-demo">
  <p class="w300">Light (300)</p>
  <p class="w400">Normal (400)</p>
  <p class="w600">Semibold (600)</p>
  <p class="w700">Bold (700)</p>
  <p class="w900">Black (900)</p>
</div>`,
      css: `.weight-demo {
  background: #0f0f23;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.weight-demo p {
  font-size: 1.5rem;
  color: white;
  padding: 15px;
  background: #1a1a2e;
  border-radius: 8px;
  margin: 0;
}

.w300 { font-weight: 300; }
.w400 { font-weight: 400; } /* normal */
.w600 { font-weight: 600; }
.w700 { font-weight: 700; } /* bold */
.w900 { font-weight: 900; }`
    },
    {
      property: "line-height",
      description: "Space between lines. Use unitless values (1.5, not 1.5rem). Body: 1.5-1.8, Headings: 1.1-1.3.",
      html: `<div class="lh-demo">
  <div class="lh-tight">
    <h3>Tight (1.2)</h3>
    <p>This paragraph has tight line spacing. Good for headings but hard to read for body text.</p>
  </div>
  <div class="lh-normal">
    <h3>Normal (1.6)</h3>
    <p>This paragraph has comfortable line spacing. Perfect for body text and long-form content.</p>
  </div>
</div>`,
      css: `.lh-demo {
  background: #1a1a2e;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.lh-tight {
  line-height: 1.2; /* Tight */
  background: #667eea;
  color: white;
  padding: 20px;
  border-radius: 10px;
}

.lh-normal {
  line-height: 1.6; /* Comfortable */
  background: #48bb78;
  color: white;
  padding: 20px;
  border-radius: 10px;
}

.lh-demo h3 {
  margin: 0 0 10px 0;
  font-size: 1.3rem;
}

.lh-demo p {
  margin: 0;
}`
    },
    {
      property: "letter-spacing",
      description: "Space between characters. Negative for headings, positive for uppercase text. Use em units for scalability.",
      html: `<div class="ls-demo">
  <h2 class="tight">Tight Heading</h2>
  <p class="normal">Normal body text spacing</p>
  <p class="wide">WIDE UPPERCASE TEXT</p>
</div>`,
      css: `.ls-demo {
  background: #0f0f23;
  padding: 30px;
}

.tight {
  letter-spacing: -0.02em; /* Tighter for large text */
  font-size: 2.5rem;
  color: #667eea;
  margin: 0 0 20px 0;
}

.normal {
  letter-spacing: 0; /* Default */
  font-size: 1.1rem;
  color: white;
  margin: 0 0 20px 0;
  line-height: 1.6;
}

.wide {
  letter-spacing: 0.1em; /* Wider for uppercase */
  font-size: 0.9rem;
  color: #48bb78;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
}`
    },
    {
      property: "text-align",
      description: "Horizontal text alignment. Values: left, right, center, justify. Use left for body text (better readability).",
      html: `<div class="align-demo">
  <p class="left">Left aligned (default, best for body text)</p>
  <p class="center">Center aligned (good for headings)</p>
  <p class="right">Right aligned (use sparingly)</p>
</div>`,
      css: `.align-demo {
  background: #1a1a2e;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.align-demo p {
  background: #0f0f23;
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin: 0;
  border-left: 4px solid;
}

.left {
  text-align: left;
  border-color: #667eea;
}

.center {
  text-align: center;
  border-color: #48bb78;
}

.right {
  text-align: right;
  border-color: #e94560;
}`
    },
    {
      property: "text-transform",
      description: "Changes text case. Values: uppercase, lowercase, capitalize, none. Use for design, not content changes.",
      html: `<div class="transform-demo">
  <p class="upper">uppercase text</p>
  <p class="lower">LOWERCASE TEXT</p>
  <p class="cap">capitalize each word</p>
</div>`,
      css: `.transform-demo {
  background: #0f0f23;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.transform-demo p {
  background: #1a1a2e;
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin: 0;
  font-size: 1.3rem;
  font-weight: bold;
}

.upper {
  text-transform: uppercase;
  color: #667eea;
  letter-spacing: 0.05em;
}

.lower {
  text-transform: lowercase;
  color: #48bb78;
}

.cap {
  text-transform: capitalize;
  color: #e94560;
}`
    },
    {
      property: "clamp() - Fluid Typography",
      description: "Creates responsive font sizes that scale smoothly. Syntax: clamp(min, preferred, max). No media queries needed!",
      html: `<div class="clamp-demo">
  <h1 class="fluid-heading">Fluid Heading</h1>
  <p class="fluid-text">This text scales smoothly between minimum and maximum sizes based on viewport width. Resize your browser to see it in action!</p>
</div>`,
      css: `.clamp-demo {
  background: #1a1a2e;
  padding: 40px;
  border-radius: 12px;
}

.fluid-heading {
  /* min: 2rem (32px), preferred: 5vw, max: 4rem (64px) */
  font-size: clamp(2rem, 5vw, 4rem);
  color: #667eea;
  margin: 0 0 20px 0;
  line-height: 1.2;
  font-weight: bold;
}

.fluid-text {
  /* min: 1rem (16px), preferred: 2vw, max: 1.5rem (24px) */
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: white;
  line-height: 1.6;
  margin: 0;
}

/* Resize browser to see smooth scaling! */`
    }
  ],

  sandbox: {
    html: `<article class="typography-demo">
  <header>
    <h1>Typography Hierarchy</h1>
    <p class="subtitle">A well-designed type system</p>
  </header>
  
  <section class="content">
    <h2>Heading Level 2</h2>
    <p class="lead">This is a lead paragraph with larger text to introduce the content. It uses a comfortable line-height for readability.</p>
    
    <h3>Heading Level 3</h3>
    <p>Regular body text should be easy to read with proper line-height (1.6-1.8) and comfortable font size (1rem or 16px minimum). This paragraph demonstrates good typography practices.</p>
    
    <p>Multiple paragraphs should have consistent spacing. The type scale creates visual hierarchy without being overwhelming.</p>
    
    <blockquote>
      "Good typography is invisible. Great typography is felt."
    </blockquote>
    
    <h4>Heading Level 4</h4>
    <ul>
      <li>Use rem for font sizes</li>
      <li>Maintain consistent line-height</li>
      <li>Create a type scale</li>
      <li>Use clamp() for fluid typography</li>
    </ul>
  </section>
</article>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0f0f23;
  color: white;
  line-height: 1.6;
}

.typography-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
}

header {
  text-align: center;
  margin-bottom: 60px;
}

h1 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 16px;
  background: linear-gradient(to right, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

h2 {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 40px 0 20px 0;
  color: #00d4ff;
  letter-spacing: -0.01em;
}

h3 {
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  font-weight: 600;
  line-height: 1.3;
  margin: 32px 0 16px 0;
  color: #667eea;
}

h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 24px 0 12px 0;
  color: #48bb78;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.9rem;
}

p {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.8;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.9);
}

.lead {
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-bottom: 32px;
}

blockquote {
  font-size: 1.3rem;
  font-style: italic;
  color: #667eea;
  border-left: 4px solid #667eea;
  padding-left: 24px;
  margin: 32px 0;
  line-height: 1.6;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding-left: 28px;
  margin-bottom: 12px;
  position: relative;
  font-size: 1.05rem;
}

li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #48bb78;
  font-weight: bold;
}`
  }
};

export default day04;

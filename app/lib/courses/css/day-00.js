export const day00 = {
  day: 0,
  title: "Pro CSS Setup + The Layering Mindset",
  subtitle: "CSS Variables & Design Tokens",
  intro: "Learn to build maintainable CSS with custom properties (CSS variables) and design tokens.",
  duration: "25 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "CSS Variables (Custom Properties) are **runtime values**. They cascade, inherit, and can be changed with JavaScript. Sass variables are compile-time only."
      },
      {
        type: "challenge",
        task: "Create a CSS variable for the brand color and use it.",
        buggyCode: `.button {
  background: #00ff96; /* Hardcoded */
}`,
        solutionCode: `:root {
  --brand: #00ff96;
}
.button {
  background: var(--brand);
}`,
        verifyOutput: (code) => code.includes("--brand") && code.includes("var(--brand)"),
        successMessage: "Perfect! Now you can change the brand color in one place and it updates everywhere.",
        hint: "Define `--brand` in `:root` and use `var(--brand)` in the button."
      }
    ]
  },

  content: `
<h2>Why CSS Variables?</h2>
<p>CSS Variables (Custom Properties) let you define reusable values that can be updated at runtime, cascade through the DOM, and even be changed with JavaScript. They're essential for theming, dark mode, and maintainable CSS.</p>

<h3>CSS Variables vs Sass Variables</h3>
<ul>
  <li><strong>CSS Variables</strong>: Runtime, cascade, can be changed with JS, work in browser</li>
  <li><strong>Sass Variables</strong>: Compile-time only, don't cascade, can't be changed after compilation</li>
</ul>

<h2>Core Concepts</h2>
<h3>1. Defining Variables</h3>
<pre><code>:root {
  --brand-primary: #00ff96;
  --spacing-md: 1rem;
}
/* Scope to a component */
.card {
  --card-bg: #1a1a2e;
}</code></pre>

<h3>2. Using Variables</h3>
<pre><code>.button {
  background: var(--brand-primary);
  padding: var(--spacing-md);
}
/* With fallback */
color: var(--text-color, #333);</code></pre>

<h2>Design Tokens Pattern</h2>
<p>Organize variables into layers: primitives → semantic → component-specific.</p>
  `,

  checkpoints: [
    {
      question: "What's the difference between CSS variables and Sass variables?",
      options: [
        "CSS variables work at runtime and cascade, Sass variables are compile-time only",
        "They're the same thing",
        "Sass variables are faster",
        "CSS variables don't work in browsers"
      ],
      correct: 0,
      explanation: "CSS variables are live in the browser, cascade through the DOM, and can be changed with JavaScript. Sass variables are replaced during compilation."
    },
    {
      question: "Where should you define global CSS variables?",
      options: [
        "In every component",
        "In :root selector",
        "In body selector",
        "In * selector"
      ],
      correct: 1,
      explanation: ":root is the highest-level selector (same as <html>). Variables defined here are available globally."
    }
  ],

  recap: {
    takeaways: [
      "CSS variables cascade and can be changed at runtime.",
      "Use `:root` for global variables.",
      "Organize into layers: primitives → semantic → component.",
      "Always provide fallback values: `var(--color, #333)`.",
      "Perfect for theming and dark mode."
    ],
    commonMistakes: [
      "Not using `:root` for global variables.",
      "Hardcoding values instead of using variables.",
      "Not providing fallback values.",
      "Mixing primitive and semantic tokens."
    ],
    nextActions: [
      "Create a complete design token system.",
      "Implement dark mode with CSS variables.",
      "Day 1: Cascade, Specificity, and Inheritance."
    ]
  },

  propertyExamples: [
    {
      property: "--custom-property (defining)",
      description: "Define a custom property (CSS variable) with -- prefix. Scope it to :root for global access or to any selector for local scope.",
      html: `<div class="demo">
  <div class="box">Using CSS Variable</div>
</div>`,
      css: `:root {
  /* Global variable */
  --primary-color: #667eea;
  --spacing: 20px;
}

.demo {
  background: #0f0f23;
  padding: var(--spacing);
}

.box {
  background: var(--primary-color);
  color: white;
  padding: var(--spacing);
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
}`
    },
    {
      property: "var() function",
      description: "Use var() to access CSS variable values. Syntax: var(--variable-name, fallback). The fallback is optional but recommended.",
      html: `<div class="var-demo">
  <div class="item">With Variable</div>
  <div class="item fallback">With Fallback</div>
</div>`,
      css: `:root {
  --brand: #00ff96;
}

.var-demo {
  display: flex;
  gap: 15px;
  background: #1a1a2e;
  padding: 20px;
}

.item {
  background: var(--brand);
  color: #0f0f23;
  padding: 25px;
  border-radius: 10px;
  font-weight: bold;
  flex: 1;
  text-align: center;
}

.fallback {
  /* --undefined doesn't exist, uses fallback */
  background: var(--undefined, #e94560);
  color: white;
}`
    },
    {
      property: "Scoped Variables",
      description: "Variables can be scoped to specific elements. Child elements inherit parent variables and can override them.",
      html: `<div class="parent">
  <div class="child">Child 1</div>
  <div class="child special">Child 2 (Override)</div>
</div>`,
      css: `.parent {
  --bg-color: #16213e;
  --text-color: #00d4ff;
  background: #0f0f23;
  padding: 20px;
  display: flex;
  gap: 15px;
}

.child {
  background: var(--bg-color);
  color: var(--text-color);
  padding: 30px;
  border-radius: 10px;
  font-weight: bold;
  flex: 1;
  text-align: center;
}

.special {
  /* Override parent variable */
  --bg-color: #e94560;
  --text-color: white;
}`
    },
    {
      property: "Color Variables",
      description: "Store colors as variables for consistent theming. Use semantic names like --primary, --danger instead of --blue, --red.",
      html: `<div class="colors">
  <div class="color-box primary">Primary</div>
  <div class="color-box success">Success</div>
  <div class="color-box danger">Danger</div>
  <div class="color-box warning">Warning</div>
</div>`,
      css: `:root {
  --primary: #667eea;
  --success: #48bb78;
  --danger: #e94560;
  --warning: #ed8936;
}

.colors {
  display: flex;
  gap: 15px;
  background: #0f0f23;
  padding: 20px;
  flex-wrap: wrap;
}

.color-box {
  padding: 30px;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  text-align: center;
  min-width: 120px;
}

.primary { background: var(--primary); }
.success { background: var(--success); }
.danger { background: var(--danger); }
.warning { background: var(--warning); }`
    },
    {
      property: "Spacing Variables",
      description: "Create a spacing scale for consistent margins and padding. Use a multiplier system (--space-1, --space-2, etc.).",
      html: `<div class="spacing">
  <div class="space-box s1">--space-1</div>
  <div class="space-box s2">--space-2</div>
  <div class="space-box s3">--space-3</div>
  <div class="space-box s4">--space-4</div>
</div>`,
      css: `:root {
  --space-1: 0.5rem;  /* 8px */
  --space-2: 1rem;    /* 16px */
  --space-3: 1.5rem;  /* 24px */
  --space-4: 2rem;    /* 32px */
}

.spacing {
  background: #1a1a2e;
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.space-box {
  background: #16213e;
  color: #00d4ff;
  border: 2px solid #0f3460;
  border-radius: 8px;
  font-weight: bold;
}

.s1 { padding: var(--space-1); }
.s2 { padding: var(--space-2); }
.s3 { padding: var(--space-3); }
.s4 { padding: var(--space-4); }`
    },
    {
      property: "Typography Variables",
      description: "Define font sizes, weights, and line heights as variables for a consistent type scale.",
      html: `<div class="typo">
  <h1 class="heading-1">Heading 1</h1>
  <h2 class="heading-2">Heading 2</h2>
  <p class="body">Body text with consistent typography.</p>
  <p class="small">Small text for captions.</p>
</div>`,
      css: `:root {
  --font-size-xl: 2rem;
  --font-size-lg: 1.5rem;
  --font-size-md: 1rem;
  --font-size-sm: 0.875rem;
  --font-weight-bold: 700;
  --font-weight-normal: 400;
  --line-height-tight: 1.2;
  --line-height-normal: 1.6;
}

.typo {
  background: #0f0f23;
  padding: 30px;
  color: white;
}

.heading-1 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: 1rem;
  color: #00d4ff;
}

.heading-2 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: 0.75rem;
  color: #667eea;
}

.body {
  font-size: var(--font-size-md);
  line-height: var(--line-height-normal);
  margin-bottom: 0.5rem;
}

.small {
  font-size: var(--font-size-sm);
  color: rgba(255,255,255,0.7);
}`
    },
    {
      property: "Calc() with Variables",
      description: "Combine calc() with CSS variables for dynamic calculations. Perfect for responsive spacing and sizing.",
      html: `<div class="calc-demo">
  <div class="calc-box">Dynamic Size</div>
</div>`,
      css: `:root {
  --base-size: 20px;
  --multiplier: 2;
}

.calc-demo {
  background: #1a1a2e;
  padding: 30px;
}

.calc-box {
  /* Calculated padding: 20px * 2 = 40px */
  padding: calc(var(--base-size) * var(--multiplier));
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
  /* Calculated font size */
  font-size: calc(var(--base-size) * 0.8);
}`
    },
    {
      property: "Theme Switching",
      description: "Use CSS variables to create switchable themes. Change the :root variables to switch themes instantly.",
      html: `<div class="theme-demo light">
  <h3>Light Theme</h3>
  <p>Background and text colors from CSS variables.</p>
  <button class="theme-btn">Button</button>
</div>

<div class="theme-demo dark">
  <h3>Dark Theme</h3>
  <p>Same HTML, different variable values!</p>
  <button class="theme-btn">Button</button>
</div>`,
      css: `.theme-demo {
  --bg: white;
  --text: #1a1a2e;
  --accent: #667eea;
  
  background: var(--bg);
  color: var(--text);
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 15px;
}

.dark {
  --bg: #1a1a2e;
  --text: white;
  --accent: #00ff96;
}

.theme-demo h3 {
  color: var(--accent);
  margin-bottom: 10px;
}

.theme-btn {
  background: var(--accent);
  color: var(--bg);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 15px;
  cursor: pointer;
}`
    }
  ],

  sandbox: {
    html: `<div class="design-system">
  <h1>Design System with CSS Variables</h1>
  
  <section class="colors-section">
    <h2>Color Palette</h2>
    <div class="color-grid">
      <div class="swatch primary">Primary</div>
      <div class="swatch secondary">Secondary</div>
      <div class="swatch success">Success</div>
      <div class="swatch danger">Danger</div>
    </div>
  </section>
  
  <section class="spacing-section">
    <h2>Spacing Scale</h2>
    <div class="spacing-demo">
      <div class="space-item s1">XS</div>
      <div class="space-item s2">SM</div>
      <div class="space-item s3">MD</div>
      <div class="space-item s4">LG</div>
    </div>
  </section>
</div>`,
    css: `:root {
  /* Color Tokens */
  --color-primary: #667eea;
  --color-secondary: #764ba2;
  --color-success: #48bb78;
  --color-danger: #e94560;
  
  /* Spacing Tokens */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  
  /* Typography Tokens */
  --font-size-h1: 2.5rem;
  --font-size-h2: 2rem;
  --font-weight-bold: 700;
  
  /* Background */
  --bg-dark: #0f0f23;
  --bg-card: #1a1a2e;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg-dark);
  color: white;
}

.design-system {
  padding: var(--space-lg);
}

h1 {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-lg);
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

h2 {
  font-size: var(--font-size-h2);
  margin-bottom: var(--space-md);
  color: var(--color-primary);
}

section {
  background: var(--bg-card);
  padding: var(--space-lg);
  border-radius: 12px;
  margin-bottom: var(--space-md);
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-sm);
}

.swatch {
  padding: var(--space-lg);
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  color: white;
}

.primary { background: var(--color-primary); }
.secondary { background: var(--color-secondary); }
.success { background: var(--color-success); }
.danger { background: var(--color-danger); }

.spacing-demo {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.space-item {
  background: var(--color-primary);
  color: white;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.s1 { padding: var(--space-xs); }
.s2 { padding: var(--space-sm); }
.s3 { padding: var(--space-md); }
.s4 { padding: var(--space-lg); }`
  }
};

export default day00;

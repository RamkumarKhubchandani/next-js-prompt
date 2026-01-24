export const day12 = {
  day: 12,
  title: "CSS Variables + Theming (Dark Mode)",
  subtitle: "Dynamic Theming with CSS Variables",
  intro: "Master theming with CSS variables. Build dark mode, create theme switchers, and organize design tokens.",
  duration: "30 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "**CSS variables cascade and can be changed at runtime**. Perfect for theming! Change one variable, update entire theme instantly."
      },
      {
        type: "challenge",
        task: "Create a dark mode using CSS variables and prefers-color-scheme.",
        buggyCode: `:root {
  --bg: white;
  --text: black;
}`,
        solutionCode: `:root {
  --bg: white;
  --text: black;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f0f23;
    --text: white;
  }
}`,
        verifyOutput: (code) => code.includes("prefers-color-scheme"),
        successMessage: "Perfect! prefers-color-scheme detects user's system preference. Variables update automatically!",
        hint: "Use @media (prefers-color-scheme: dark) to override variables."
      }
    ]
  },

  content: `
<h2>Why CSS Variables for Theming?</h2>
<ul>
  <li>Change entire theme by updating a few variables</li>
  <li>Can be changed with JavaScript</li>
  <li>Cascade through the DOM</li>
  <li>No build step required</li>
</ul>

<h3>Design Token Layers</h3>
<ol>
  <li><strong>Primitives</strong>: --color-blue-500</li>
  <li><strong>Semantic</strong>: --color-primary (references primitive)</li>
  <li><strong>Component</strong>: --button-bg (references semantic)</li>
</ol>

<h2>Dark Mode Strategies</h2>
<ul>
  <li><code>prefers-color-scheme</code>: Detect system preference</li>
  <li>Class toggle: .dark-mode on root</li>
  <li>Data attribute: [data-theme="dark"]</li>
</ul>
  `,

  checkpoints: [
    {
      question: "What does prefers-color-scheme do?",
      options: [
        "Detects user's system dark/light mode preference",
        "Forces dark mode",
        "Changes colors randomly",
        "Doesn't work"
      ],
      correct: 0,
      explanation: "prefers-color-scheme is a media query that detects if the user has dark or light mode enabled in their OS."
    },
    {
      question: "What's the benefit of semantic tokens over primitive tokens?",
      options: [
        "Easier to change theme (change meaning, not every usage)",
        "Faster performance",
        "Better browser support",
        "No benefit"
      ],
      correct: 0,
      explanation: "Semantic tokens (--color-primary) reference primitives (--blue-500). Change the meaning once, not every usage."
    }
  ],

  recap: {
    takeaways: [
      "Use CSS variables for all theme values.",
      "Organize into primitive → semantic → component layers.",
      "prefers-color-scheme detects system preference.",
      "Class toggle (.dark-mode) gives user control.",
      "Can change variables with JavaScript for dynamic themes."
    ],
    commonMistakes: [
      "Not using semantic tokens.",
      "Hardcoding colors instead of variables.",
      "Not providing fallback values.",
      "Forgetting to test both themes."
    ],
    nextActions: [
      "Implement dark mode in your project.",
      "Create a theme switcher.",
      "Day 13: Layout Patterns."
    ]
  },

  propertyExamples: [
    {
      property: "Basic Theme Variables",
      description: "Define theme colors as CSS variables in :root. Use var() to apply them throughout your CSS.",
      html: `<div class="theme-demo">
  <div class="box">Using Theme Variables</div>
</div>`,
      css: `:root {
  --bg-primary: #0f0f23;
  --bg-secondary: #1a1a2e;
  --text-primary: white;
  --text-secondary: rgba(255,255,255,0.8);
  --accent: #667eea;
}

.theme-demo {
  background: var(--bg-primary);
  padding: 30px;
}

.box {
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 30px;
  border-radius: 12px;
  border: 2px solid var(--accent);
  font-weight: bold;
  text-align: center;
}`
    },
    {
      property: "prefers-color-scheme (Auto Dark Mode)",
      description: "Automatically detect and apply dark mode based on user's system preference. No JavaScript needed!",
      html: `<div class="auto-theme">
  <h3>Auto Theme</h3>
  <p>This adapts to your system's dark/light mode preference!</p>
</div>`,
      css: `:root {
  /* Light mode (default) */
  --bg: white;
  --text: #1a1a2e;
  --accent: #667eea;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode */
    --bg: #0f0f23;
    --text: white;
    --accent: #00d4ff;
  }
}

.auto-theme {
  background: var(--bg);
  color: var(--text);
  padding: 30px;
  border-radius: 12px;
  border: 2px solid var(--accent);
}

.auto-theme h3 {
  color: var(--accent);
  margin: 0 0 12px 0;
}

.auto-theme p {
  margin: 0;
  line-height: 1.6;
}`
    },
    {
      property: "Class-Based Theme Toggle",
      description: "Use a class (.dark-mode) to toggle themes. Gives users manual control via JavaScript.",
      html: `<div class="toggle-demo">
  <div class="content">
    <h3>Manual Toggle</h3>
    <p>Add .dark-mode class to toggle theme</p>
  </div>
</div>`,
      css: `:root {
  --bg: white;
  --text: #1a1a2e;
  --accent: #667eea;
}

.dark-mode {
  --bg: #0f0f23;
  --text: white;
  --accent: #00d4ff;
}

.toggle-demo {
  background: var(--bg);
  padding: 30px;
  border-radius: 12px;
}

.content {
  background: rgba(0,0,0,0.05);
  color: var(--text);
  padding: 30px;
  border-radius: 12px;
  border: 2px solid var(--accent);
}

.dark-mode .content {
  background: rgba(255,255,255,0.05);
}

.content h3 {
  color: var(--accent);
  margin: 0 0 12px 0;
}

.content p {
  margin: 0;
}`
    },
    {
      property: "Semantic Color Tokens",
      description: "Use semantic names (--color-primary) that reference primitive colors (--blue-500). Easier to maintain!",
      html: `<div class="semantic-demo">
  <div class="primary">Primary Color</div>
  <div class="success">Success Color</div>
  <div class="danger">Danger Color</div>
</div>`,
      css: `:root {
  /* Primitive tokens */
  --blue-500: #667eea;
  --green-500: #48bb78;
  --red-500: #e94560;
  
  /* Semantic tokens (reference primitives) */
  --color-primary: var(--blue-500);
  --color-success: var(--green-500);
  --color-danger: var(--red-500);
}

.semantic-demo {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #0f0f23;
  padding: 20px;
}

.semantic-demo > div {
  padding: 25px;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  text-align: center;
}

.primary { background: var(--color-primary); }
.success { background: var(--color-success); }
.danger { background: var(--color-danger); }`
    },
    {
      property: "Component-Specific Variables",
      description: "Scope variables to components. Override them for variations without duplicating CSS.",
      html: `<button class="btn">Default Button</button>
<button class="btn btn--primary">Primary Button</button>
<button class="btn btn--large">Large Button</button>`,
      css: `.btn {
  /* Component variables with defaults */
  --btn-bg: #1a1a2e;
  --btn-color: white;
  --btn-padding: 12px 24px;
  
  background: var(--btn-bg);
  color: var(--btn-color);
  padding: var(--btn-padding);
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin: 5px;
  transition: transform 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn--primary {
  /* Override component variables */
  --btn-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn--large {
  --btn-padding: 16px 32px;
  font-size: 1.1rem;
}`
    },
    {
      property: "Theme Layers (Primitive → Semantic → Component)",
      description: "Organize tokens in layers. Primitives define colors, semantics define meaning, components use semantics.",
      html: `<div class="layered-theme">
  <div class="card">
    <h3>Layered Tokens</h3>
    <p>Primitive → Semantic → Component</p>
  </div>
</div>`,
      css: `:root {
  /* Layer 1: Primitives (raw values) */
  --gray-900: #0f0f23;
  --gray-800: #1a1a2e;
  --blue-500: #667eea;
  --white: white;
  
  /* Layer 2: Semantic (meaning) */
  --color-bg-primary: var(--gray-900);
  --color-bg-secondary: var(--gray-800);
  --color-text: var(--white);
  --color-accent: var(--blue-500);
  
  /* Layer 3: Component (usage) */
  --card-bg: var(--color-bg-secondary);
  --card-text: var(--color-text);
  --card-border: var(--color-accent);
}

.layered-theme {
  background: var(--color-bg-primary);
  padding: 30px;
}

.card {
  background: var(--card-bg);
  color: var(--card-text);
  border: 2px solid var(--card-border);
  padding: 30px;
  border-radius: 12px;
}

.card h3 {
  color: var(--color-accent);
  margin: 0 0 12px 0;
}

.card p {
  margin: 0;
}`
    }
  ],

  sandbox: {
    html: `<div class="theming-demo">
  <header class="header">
    <h1>Theme System</h1>
    <p>Built with CSS Variables</p>
  </header>
  
  <div class="theme-showcase">
    <section class="card">
      <h2>Primary Card</h2>
      <p>This card uses semantic color tokens that adapt to the theme.</p>
      <button class="button button--primary">Primary Action</button>
    </section>
    
    <section class="card card--accent">
      <h2>Accent Card</h2>
      <p>Component variables make variations easy without duplicating CSS.</p>
      <button class="button">Secondary Action</button>
    </section>
    
    <section class="card">
      <h2>Token Layers</h2>
      <ul class="token-list">
        <li><span class="token-primitive">Primitive</span> → Raw values</li>
        <li><span class="token-semantic">Semantic</span> → Meaning</li>
        <li><span class="token-component">Component</span> → Usage</li>
      </ul>
    </section>
  </div>
</div>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Primitive Tokens */
  --gray-900: #0f0f23;
  --gray-800: #1a1a2e;
  --gray-700: #0f3460;
  --blue-500: #667eea;
  --purple-500: #764ba2;
  --cyan-500: #00d4ff;
  --white: white;
  
  /* Semantic Tokens */
  --color-bg-primary: var(--gray-900);
  --color-bg-secondary: var(--gray-800);
  --color-border: var(--gray-700);
  --color-text-primary: var(--white);
  --color-text-secondary: rgba(255,255,255,0.8);
  --color-accent: var(--blue-500);
  --color-accent-alt: var(--cyan-500);
  
  /* Component Tokens */
  --card-bg: var(--color-bg-secondary);
  --card-border: var(--color-border);
  --button-bg: var(--color-accent);
}

/* Auto dark mode support */
@media (prefers-color-scheme: light) {
  :root {
    --gray-900: white;
    --gray-800: #f5f5f5;
    --gray-700: #e0e0e0;
    --white: #1a1a2e;
  }
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
}

.theming-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.header {
  text-align: center;
  padding: 60px 20px;
  margin-bottom: 40px;
}

.header h1 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 16px;
  background: linear-gradient(to right, var(--color-accent), var(--purple-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header p {
  font-size: 1.3rem;
  color: var(--color-text-secondary);
}

.theme-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.card {
  background: var(--card-bg);
  border: 2px solid var(--card-border);
  border-radius: 16px;
  padding: 32px;
  transition: transform 0.2s, border-color 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  border-color: var(--color-accent);
}

.card--accent {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), transparent);
  border-color: var(--color-accent);
}

.card h2 {
  color: var(--color-accent-alt);
  margin-bottom: 16px;
  font-size: 1.5rem;
}

.card p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
}

.button {
  background: rgba(255,255,255,0.1);
  color: var(--color-text-primary);
  border: 2px solid rgba(255,255,255,0.2);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.button:hover {
  background: rgba(255,255,255,0.15);
}

.button--primary {
  background: var(--button-bg);
  border-color: var(--button-bg);
}

.button--primary:hover {
  background: var(--purple-500);
  border-color: var(--purple-500);
}

.token-list {
  list-style: none;
  padding: 0;
}

.token-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--card-border);
}

.token-list li:last-child {
  border-bottom: none;
}

.token-primitive { color: var(--blue-500); font-weight: bold; }
.token-semantic { color: var(--cyan-500); font-weight: bold; }
.token-component { color: var(--purple-500); font-weight: bold; }`
  }
};

export default day12;

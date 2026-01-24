export const day11 = {
  day: 11,
  title: "Architecture (BEM, Utility, & Organization)",
  subtitle: "Scalable CSS Patterns",
  intro: "Learn CSS architecture patterns: BEM naming, utility-first approach, and how to organize CSS for maintainability.",
  duration: "25 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "**BEM (Block Element Modifier)** keeps specificity flat and makes relationships clear. .card__title--large is self-documenting!"
      },
      {
        type: "challenge",
        task: "Convert this to BEM naming convention.",
        buggyCode: `.card .title.large {
  font-size: 2rem;
}`,
        solutionCode: `.card__title--large {
  font-size: 2rem;
}`,
        verifyOutput: (code) => code.includes("__") && code.includes("--"),
        successMessage: "Perfect! BEM uses __ for elements and -- for modifiers. Flat specificity, clear relationships!",
        hint: "Use .card__title--large (block__element--modifier)"
      }
    ]
  },

  content: `
<h2>CSS Architecture Patterns</h2>
<p>As projects grow, you need a system to keep CSS maintainable.</p>

<h3>BEM (Block Element Modifier)</h3>
<p>Naming convention that makes relationships clear:</p>
<ul>
  <li><strong>Block</strong>: .card (standalone component)</li>
  <li><strong>Element</strong>: .card__title (part of block)</li>
  <li><strong>Modifier</strong>: .card--featured (variation)</li>
</ul>

<h3>Utility-First</h3>
<p>Small, single-purpose classes:</p>
<pre><code>.flex { display: flex; }
.gap-4 { gap: 1rem; }
.text-center { text-align: center; }</code></pre>

<h2>Organization Strategies</h2>
<ul>
  <li>Group by component, not type</li>
  <li>Use CSS variables for theming</li>
  <li>Keep specificity flat (avoid nesting)</li>
  <li>Document your patterns</li>
</ul>
  `,

  checkpoints: [
    {
      question: "What does BEM stand for?",
      options: [
        "Block Element Modifier",
        "Best Efficient Method",
        "Browser Element Model",
        "Base Element Markup"
      ],
      correct: 0,
      explanation: "BEM = Block Element Modifier. A naming convention for maintainable CSS."
    },
    {
      question: "In BEM, what does __ (double underscore) represent?",
      options: [
        "Modifier",
        "Element (part of a block)",
        "Block",
        "Nothing special"
      ],
      correct: 1,
      explanation: "__ separates block from element (.card__title). -- separates element from modifier (.card__title--large)."
    }
  ],

  recap: {
    takeaways: [
      "BEM keeps specificity flat and relationships clear.",
      "Utility classes are reusable and composable.",
      "Organize CSS by component, not by type.",
      "Use CSS variables for theming.",
      "Document your naming conventions."
    ],
    commonMistakes: [
      "Deep nesting (specificity wars).",
      "Inconsistent naming.",
      "Not using a system.",
      "Mixing methodologies."
    ],
    nextActions: [
      "Refactor a component to BEM.",
      "Create utility classes for your project.",
      "Day 12: CSS Variables + Theming."
    ]
  },

  propertyExamples: [
    {
      property: "BEM - Block",
      description: "Block is a standalone component. Use a simple class name. Example: .card, .button, .navbar",
      html: `<div class="card">
  <h3>Card Block</h3>
  <p>This is a standalone component</p>
</div>`,
      css: `.card {
  /* Block: standalone component */
  background: #1a1a2e;
  border: 2px solid #0f3460;
  border-radius: 12px;
  padding: 24px;
  color: white;
}

.card h3 {
  color: #00d4ff;
  margin: 0 0 12px 0;
  font-size: 1.3rem;
}

.card p {
  margin: 0;
  line-height: 1.6;
  color: rgba(255,255,255,0.8);
}`
    },
    {
      property: "BEM - Element",
      description: "Element is a part of a block. Use block__element naming. Example: .card__title, .card__image",
      html: `<div class="card">
  <h3 class="card__title">Card Title</h3>
  <p class="card__description">Card description text</p>
  <button class="card__button">Action</button>
</div>`,
      css: `.card {
  background: #1a1a2e;
  border: 2px solid #0f3460;
  border-radius: 12px;
  padding: 24px;
}

.card__title {
  /* Element: part of card */
  color: #00d4ff;
  margin: 0 0 12px 0;
  font-size: 1.3rem;
}

.card__description {
  color: rgba(255,255,255,0.8);
  margin: 0 0 16px 0;
  line-height: 1.6;
}

.card__button {
  background: #667eea;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}`
    },
    {
      property: "BEM - Modifier",
      description: "Modifier is a variation of block or element. Use block--modifier or block__element--modifier.",
      html: `<div class="card">
  <h3 class="card__title">Normal Card</h3>
</div>

<div class="card card--featured">
  <h3 class="card__title card__title--large">Featured Card</h3>
</div>`,
      css: `.card {
  background: #1a1a2e;
  border: 2px solid #0f3460;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
}

.card--featured {
  /* Modifier: variation of card */
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), transparent);
  border-color: #667eea;
}

.card__title {
  color: #00d4ff;
  margin: 0;
  font-size: 1.3rem;
}

.card__title--large {
  /* Modifier: variation of title */
  font-size: 1.8rem;
  color: #667eea;
}`
    },
    {
      property: "Utility Classes",
      description: "Small, single-purpose classes that do one thing well. Reusable and composable.",
      html: `<div class="flex gap-4 items-center p-6 bg-dark rounded">
  <div class="text-primary font-bold">Utility</div>
  <div class="text-white">Classes</div>
</div>`,
      css: `/* Utility classes */
.flex { display: flex; }
.gap-4 { gap: 1rem; }
.items-center { align-items: center; }
.p-6 { padding: 1.5rem; }
.bg-dark { background: #1a1a2e; }
.rounded { border-radius: 12px; }
.text-primary { color: #00d4ff; }
.text-white { color: white; }
.font-bold { font-weight: bold; }

/* Compose utilities to build components */`
    },
    {
      property: "Component Organization",
      description: "Group related styles together. Keep components self-contained and reusable.",
      html: `<button class="button">Default</button>
<button class="button button--primary">Primary</button>
<button class="button button--large">Large</button>`,
      css: `/* Button Component */
.button {
  /* Base button styles */
  display: inline-block;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
  background: #1a1a2e;
  color: white;
  margin: 5px;
}

.button:hover {
  transform: translateY(-2px);
}

/* Button Modifiers */
.button--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.button--large {
  padding: 16px 32px;
  font-size: 1.1rem;
}`
    },
    {
      property: "Naming Conventions",
      description: "Consistent naming makes code readable. Choose a convention (BEM, SMACSS, etc.) and stick to it.",
      html: `<nav class="navbar">
  <div class="navbar__logo">Logo</div>
  <ul class="navbar__menu">
    <li class="navbar__item">
      <a class="navbar__link navbar__link--active">Home</a>
    </li>
  </ul>
</nav>`,
      css: `.navbar {
  background: #1a1a2e;
  padding: 20px;
  border-radius: 12px;
}

.navbar__logo {
  color: #00d4ff;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.navbar__menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar__item {
  margin-bottom: 10px;
}

.navbar__link {
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  display: block;
  border-radius: 6px;
  transition: background 0.2s;
}

.navbar__link--active {
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
}`
    }
  ],

  sandbox: {
    html: `<div class="architecture-demo">
  <h1 class="heading heading--primary">CSS Architecture</h1>
  
  <!-- BEM Example -->
  <section class="section">
    <h2 class="section__title">BEM Pattern</h2>
    <div class="card-grid">
      <article class="card">
        <h3 class="card__title">Normal Card</h3>
        <p class="card__text">Standard card component</p>
        <button class="card__button">Read More</button>
      </article>
      
      <article class="card card--featured">
        <h3 class="card__title card__title--large">Featured</h3>
        <p class="card__text">Featured card with modifier</p>
        <button class="card__button card__button--primary">Learn More</button>
      </article>
    </div>
  </section>
  
  <!-- Utility Classes Example -->
  <section class="section">
    <h2 class="section__title">Utility Classes</h2>
    <div class="flex gap-4 wrap">
      <div class="badge bg-primary">Primary</div>
      <div class="badge bg-success">Success</div>
      <div class="badge bg-danger">Danger</div>
    </div>
  </section>
</div>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0f0f23;
  color: white;
}

.architecture-demo {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Headings */
.heading {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
}

.heading--primary {
  background: linear-gradient(to right, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Section Component */
.section {
  margin-bottom: 50px;
}

.section__title {
  color: #00d4ff;
  font-size: 1.8rem;
  margin-bottom: 24px;
}

/* Card Component (BEM) */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.card {
  background: #1a1a2e;
  border: 2px solid #0f3460;
  border-radius: 12px;
  padding: 24px;
  transition: transform 0.2s, border-color 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  border-color: #667eea;
}

.card--featured {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), transparent);
  border-color: #667eea;
}

.card__title {
  color: #00d4ff;
  font-size: 1.3rem;
  margin-bottom: 12px;
}

.card__title--large {
  font-size: 1.6rem;
  color: #667eea;
}

.card__text {
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
  margin-bottom: 16px;
}

.card__button {
  background: rgba(255,255,255,0.1);
  color: white;
  border: 2px solid rgba(255,255,255,0.2);
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.card__button:hover {
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.3);
}

.card__button--primary {
  background: #667eea;
  border-color: #667eea;
}

.card__button--primary:hover {
  background: #764ba2;
  border-color: #764ba2;
}

/* Utility Classes */
.flex { display: flex; }
.gap-4 { gap: 1rem; }
.wrap { flex-wrap: wrap; }

.badge {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
}

.bg-primary { background: #667eea; }
.bg-success { background: #48bb78; }
.bg-danger { background: #e94560; }`
  }
};

export default day11;

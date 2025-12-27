export const stylingQuestions = [
    {
        id: 'css-style-1',
        category: 'Architecture & Tooling',
        difficulty: 'Medium',
        question: 'What is BEM and why is it useful?',
        answer: `**Block Element Modifier (BEM) is a naming convention.**

**Structure:**
- **Block:** Standalone entity (\`.card\`).
- **Element:** Part of a block (\`.card__title\`).
- **Modifier:** Variation (\`.card--featured\`).

**Benefits:**
- **Avoids Specificity Wars:** Uses low specificity classes (0,0,1,0).
- **Self-documenting:** You know exactly what \`.menu__item--active\` does just by reading the name.`,
        codeExample: `<style>
  /* Block */
  .button {
    padding: 10px 20px;
    border: 1px solid #ccc;
    background: #f8f9fa;
  }
  
  /* Element (Not .button span) */
  .button__icon {
    margin-right: 5px;
  }
  
  /* Modifier (Not .button.primary) */
  .button--primary {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }
</style>

<button class="button">Default</button>
<button class="button button--primary">
  <span class="button__icon">★</span>
  Featured
</button>`
    },
    {
        id: 'css-style-2',
        category: 'Architecture & Tooling',
        difficulty: 'Easy',
        question: 'Difference between CSS Variables and Preprocessor Variables (Sass)?',
        answer: `**CSS Custom Properties (Variables) are dynamic and live in the DOM.**

**CSS Variables (\`--color\`):**
- **Dynamic:** Can be changed by JavaScript or Media Queries at runtime.
- **Scoped:** Follows CSS inheritance/cascade.

**Sass Variables (\`$color\`):**
- **Static:** Compiled away to hex codes at build time.
- **Global (usually):** No DOM scoping.`,
        codeExample: `<style>
  :root {
    --theme-color: blue;
  }
  
  .box {
    background: var(--theme-color);
    width: 50px; height: 50px;
  }
  
  @media (max-width: 600px) {
    :root {
      /* This works! Sass variables cannot do this at runtime. */
      --theme-color: red; 
    }
  }
</style>

<div class="box"></div>
<p>Resize browser to see color change (Simulated runtime)</p>`
    },
    {
        id: 'css-style-3',
        category: 'Architecture & Tooling',
        difficulty: 'Medium',
        question: 'What is the standard "CSS Reset" vs "Normalize"?',
        answer: `**Strategies to handle browser inconsistencies.**

1. **Reset (e.g., Eric Meyer's):**
   - **Nuclear options:** Removes ALL default styling.
   - \`h1 { margin: 0; font-size: 100%; }\`
   - You must rebuild everything from scratch.

2. **Normalize (e.g., normalize.css):**
   - **Gentle:** Preserves useful defaults.
   - Fixes bugs (e.g., button usage in iOS).
   - Makes browsers render elements *consistently*.

**Best Practice:**
- Use a modern reset (like Andy Bell's) or Normalize.`,
        codeExample: `<style>
  /* 1. Typical Reset Snippet */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* The most important reset */
  }
  
  /* 2. Opinionated Defaults */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  
  body {
    line-height: 1.5;
  }
</style>

<h1>Resetted H1 (No Top Margin)</h1>
<p>Clean start for custom styling.</p>`
    },
    {
        id: 'css-style-4',
        category: 'Architecture & Tooling',
        difficulty: 'Hard',
        question: 'Explain the concept of "Utility-First" CSS (Tailwind).',
        answer: `**Composing designs using small, single-purpose classes.**

**Vs Semantic CSS:**
- **Semantic:** \`.profile-card { padding: 20px; background: white; }\`
- **Utility:** \`<div class="p-5 bg-white shadow-lg"></div>\`

**Pros:**
- **No naming fatigue:** Don't need to invent names like \`inner-wrapper-bottom\`.
- **Consistency:** Uses a predefined design system (spacing scale, color palette).
- **Smaller Bundles:** You reuse existing classes instead of writing new CSS.`,
        codeExample: `<!-- Standard HTML/CSS -->
<div class="alert alert-error">
  Error!
</div>

<!-- Utility First (Conceptual) -->
<div style="background-color: #fee2e2; color: #991b1b; padding: 16px; border-radius: 6px;">
  Error! (Utility approach using inline styles for demo)
</div>

<p>Note: Real utility frameworks utilize classes like "bg-red-100 p-4 rounded".</p>`
    },
    {
        id: 'css-style-5',
        category: 'Architecture & Tooling',
        difficulty: 'Medium',
        question: 'What are Pseudo-elements (::before, ::after)?',
        answer: `**Virtual elements created by CSS, not HTML.**

**Usage:**
- Decoration (icons, shapes).
- Cleaning up floats (clearfix).
- Tooltips.

**Requirement:**
- Must have \`content: ""\` property to render.`,
        codeExample: `<style>
  .quote {
    position: relative;
    padding: 20px;
    background: #eee;
    margin: 20px;
  }
  
  /* Decoration without HTML spam */
  .quote::before {
    content: "“";
    font-size: 80px;
    position: absolute;
    top: -20px;
    left: 10px;
    color: #ccc;
    font-family: serif;
  }
</style>

<div class="quote">
  This quote uses a pseudo-element for the giant quotation mark.
</div>`
    }
];

export const accessibilityQuestions = [
    {
        id: 'css-a11y-1',
        category: 'Accessibility',
        difficulty: 'Medium',
        question: 'How do you hide content visually but keep it available for screen readers?',
        answer: `**Do NOT use \`display: none\` or \`visibility: hidden\` (removes from accessibility tree).**

**Correct Technique: The "sr-only" class.**
- Moves content out of the visual viewport.
- Reduces size to 1px.
- Clips overflow.

**Why?**
- Allows sighted users to see a cleaner UI (e.g., icon-only buttons).
- Screen reader users still hear the label.`,
        codeExample: `<style>
  /* Standard sr-only class */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  .icon-btn { padding: 10px; font-size: 20px; cursor: pointer; }
</style>

<!-- Sighted: Sees "🔍" -->
<!-- Blind: Hears "Search the site" -->
<button class="icon-btn">
  🔍
  <span class="sr-only">Search the site</span>
</button>`
    },
    {
        id: 'css-a11y-2',
        category: 'Accessibility',
        difficulty: 'Hard',
        question: 'What is the "skip to main content" link and why is it important?',
        answer: `**A "Skip Link" allows keyboard users to bypass repetitive navigation menus.**

**Mechanism:**
1. A hidden link at the very top of \`<body>\`.
2. Becomes visible on **focus** (Tab key).
3. \`href\` points to \`#main-content\`.

**Importance:**
- Without it, keyboard users must tab through 50+ nav links on *every page* to read the content.`,
        codeExample: `<style>
  .skip-link {
    position: absolute;
    top: -40px; /* Hidden off-screen */
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    z-index: 100;
  }
  
  .skip-link:focus {
    top: 0; /* Visible when focused */
  }
</style>

<body>
  <!-- Tab here first to skip nav -->
  <a href="#main" class="skip-link">Skip to main content</a>

  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
    <!-- ... imagine 20 more links -->
  </nav>

  <main id="main">
    <h1>Main Content</h1>
    <p>keyboard users jumped straight here!</p>
  </main>
</body>`
    },
    {
        id: 'css-a11y-3',
        category: 'Accessibility',
        difficulty: 'Easy',
        question: 'How does color contrast affect accessibility?',
        answer: `**Text must have sufficient contrast against its background to be readable.**

**WCAG 2.1 Standards:**
- **AA Level:** 4.5:1 ratio for normal text, 3:1 for large text.
- **AAA Level:** 7:1 ratio.

**Tools:**
- Chrome DevTools "CSS Overview".
- Color Contrast Analyzers.

**Bad Example:** Light gray text on white background.`,
        codeExample: `<style>
  .good-contrast {
    background: white;
    color: #333; /* Dark gray (High contrast) */
    padding: 10px;
  }
  
  .bad-contrast {
    background: white;
    color: #ccc; /* Light gray (Unreadable) */
    padding: 10px;
  }
</style>

<div class="good-contrast">
  Readable Text (Safe)
</div>

<div class="bad-contrast">
  Hard to read (Fails WCAG)
</div>`
    },
    {
        id: 'css-a11y-4',
        category: 'Accessibility',
        difficulty: 'Medium',
        question: 'Why is :focus styling important? Can you remove the outline?',
        answer: `**You should NEVER remove the focus outline unless you replace it.**

**Purpose:**
- Tells keyboard/switch device users **where they are** on the page.

**Common Mistake:**
- \`* { outline: none; }\` (Disaster for accessibility).

**Best Practice:**
- Use \`:focus-visible\` to show outline only for keyboard users, not mouse clicks.`,
        codeExample: `<style>
  button { margin: 10px; padding: 10px; cursor: pointer; }

  /* 1. Dangerous (Don't do this) */
  .no-outline:focus {
    outline: none;
  }

  /* 2. Custom Focus (Good) */
  .custom-focus:focus {
    outline: 2px dashed red;
    outline-offset: 4px;
  }

  /* 3. Focus Visible (Best modern approach) */
  .modern-focus:focus { outline: none; }
  .modern-focus:focus-visible {
    outline: 3px solid blue;
  }
</style>

<button class="no-outline">Bad (Try Tabbing)</button>
<button class="custom-focus">Custom Focus</button>
<button class="modern-focus">Focus Visible (Mouse click hides it)</button>`
    },
    {
        id: 'css-a11y-5',
        category: 'Accessibility',
        difficulty: 'Medium',
        question: 'What is semantic HTML regarding lists and navigation?',
        answer: `**Screen readers rely on list structures to inform users about content length.**

**Patterns:**
- **Navigation:** Use \`<nav>\` with \`<ul>\`. (Screen reader: "Navigation list, 5 items").
- **Steps:** Use \`<ol>\`.

**Flattening Lists:**
- Using \`<div>\`\s for lists deprives users of knowing "Item 1 of 5".`,
        codeExample: `<style>
  nav ul { list-style: none; padding: 0; display: flex; gap: 10px; }
  nav a { text-decoration: none; color: blue; }
</style>

<!-- Good Semantic Nav -->
<nav aria-label="Main">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Shop</a></li>
    <li><a href="#">Cart</a></li>
  </ul>
</nav>

<!-- Bad (Div soup) -->
<div class="nav">
  <div class="link">Home</div> <!-- Screen reader treats as plain text -->
</div>`
    }
];

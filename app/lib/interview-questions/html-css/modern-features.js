export const modernFeaturesQuestions = [
    {
        id: 'css-modern-1',
        category: 'Modern Features',
        difficulty: 'Medium',
        question: 'How do you use native CSS Nesting?',
        answer: `**Native CSS Nesting allows writing nested rules without a preprocessor (Sass).**

**Syntax:**
- Use \`&\` to refer to the parent selector (optional for element selectors, but good practice).
- Keeps related styles co-located.

**Support:**
- Supported in all modern browsers (Chrome 112+, Safari 16.5+, Firefox 117+).`,
        codeExample: `<style>
  /* Standard CSS Nesting */
  .card {
    background: white;
    padding: 20px;
    
    /* Nested Class */
    .title {
      font-size: 2rem;
      color: blue;
    }
    
    /* Nested Pseudo-class with & */
    &:hover {
      background: #f0f0f0;
    }
    
    /* Nested Media Query */
    @media (max-width: 500px) {
      padding: 10px;
    }
  }
</style>

<div class="card">
  <div class="title">I am nested</div>
  Hover over card to see change.
</div>`
    },
    {
        id: 'css-modern-2',
        category: 'Modern Features',
        difficulty: 'Hard',
        question: 'What is the :has() pseudo-class (The Parent Selector)?',
        answer: `**Selects an element *if* it contains a certain child.**

**Concept:**
- It's essentially a "Parent Selector" or "Previous Sibling Selector".
- \`a:has(> img)\`: Selects anchors that contain an image.
- \`form:has(:invalid)\`: Selects a form if any input inside is invalid.

**Power:**
- Solves decades of "JavaScript required" styling problems.`,
        codeExample: `<style>
  /* 
    Select .card IF it contains an image.
    If no image, this style doesn't apply.
  */
  .card:has(img) {
    background: black;
    color: white;
  }
  
  .card {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  /* Select label if the checkbox NEXT to it is checked */
  label:has(+ input:checked) {
    color: green;
    font-weight: bold;
  }
</style>

<div class="card">
  <h3>Text only card</h3>
</div>

<div class="card">
  <img src="https://via.placeholder.com/50" alt="icon">
  <h3>Image card (Dark Mode)</h3>
</div>

<label>Success Mode?</label>
<input type="checkbox">`
    },
    {
        id: 'css-modern-3',
        category: 'Modern Features',
        difficulty: 'Expert',
        question: 'Explain Cascade Layers (@layer).',
        answer: `**A way to manage Specificity explicitly.**

**Problem:**
- A simple class \`.btn\` (0,0,1,0) is overridden by a library's \`#main .content a\` (0,1,1,1).
- You used to fight back with \`!important\`.

**Solution:**
- Define layers: \`@layer base, theme, utilities;\`.
- Styles in later layers WIN, regardless of selector specificity.
- \`utilities\` layer beats \`base\` layer.`,
        codeExample: `<style>
  /* Order matters: 'override' wins over 'framework' */
  @layer framework, override;
  
  @layer override {
    p { color: green; } /* Specificity: 0,0,0,1 */
  }
  
  @layer framework {
    #id.class p { color: red; } /* Specificity: 1,1,0,1 (High) */
  }
  
  /* 
    Result: Green wins! 
    Because 'override' layer is last, its rules take precedence 
    despite having lower specificity.
  */
</style>

<div id="id" class="class">
  <p>I am Green (Layer power)</p>
</div>`
    },
    {
        id: 'css-modern-4',
        category: 'Modern Features',
        difficulty: 'Hard',
        question: 'What is CSS Scope (@scope)?',
        answer: `**Native style isolation (like scoped CSS in frameworks).**

**Syntax:**
- \`@scope (.component) to (.content) { ... }\`
- Styles apply *inside* the .component, but *stop* at .content.
- Prevents styles from bleeding deep into children (donut scope).

**Benefit:**
- No need for BEM naming conventions like \`.card__title\` to avoid collision. Just use \`.title\` inside specific scope.`,
        codeExample: `<style>
  /* Global title */
  .title { color: grey; }
  
  @scope (.card) {
    /* Only affects .title inside .card */
    .title { color: blue; font-weight: bold; }
  }
</style>

<h1 class="title">Global Title (Grey)</h1>

<div class="card">
  <h1 class="title">Scoped Title (Blue)</h1>
  <div class="nested">
     <!-- Still Blue, unless a 'to' limit was set -->
     <h2 class="title" style="font-size: 1rem">Nested</h2>
  </div>
</div>`
    },
    {
        id: 'css-modern-5',
        category: 'Modern Features',
        difficulty: 'Medium',
        question: 'What is the "is()" and "where()" pseudo-class?',
        answer: `**Grouping selectors effectively.**

**1. :is(a, b, c)**
- Takes the specificity of the *most specific* argument.
- \`:is(#id, p)\` has score of ID.

**2. :where(a, b, c)**
- **Specificity is always 0.**
- Incredible for creating "default" styles that are easy to override.

**Comparison:**
- \`.nav :is(a:hover, button:focus)\`
- \`.reset :where(h1, h2, h3) { margin: 0; }\``,
        codeExample: `<style>
  /* Specificity: 0 (Easy to override) */
  :where(.box) {
    background: #ccc;
    padding: 20px;
    color: black;
  }
  
  /* Simple class override works easily */
  .red {
    background: red;
  }
</style>

<div class="box red">
  I am Red. Because :where() has 0 specificity, .red wins easily.
</div>`
    },
    {
        id: 'css-modern-6',
        category: 'Modern Features',
        difficulty: 'Medium',
        question: 'How to use "aspect-ratio"?',
        answer: `**Sets the preferred aspect ratio for the box.**

**Problem:**
- Creating responsive squares/videos used to require the "padding-top hack".

**Solution:**
- \`aspect-ratio: 16 / 9;\`
- The height is automatically calculated based on the width.`,
        codeExample: `<style>
  .video-container {
    width: 50%; /* Flexible width */
    aspect-ratio: 16 / 9;
    background: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .square {
    width: 100px;
    aspect-ratio: 1 / 1;
    background: coral;
  }
</style>

<div class="video-container">16:9 Video</div>
<br>
<div class="square">1:1 Square</div>`
    },
    {
        id: 'css-modern-7',
        category: 'Modern Features',
        difficulty: 'Medium',
        question: 'What is "scroll-behavior: smooth"?',
        answer: `**Enables smooth scrolling for anchor links.**

**Usage:**
- \`html { scroll-behavior: smooth; }\`
- When clicking \`<a href="#section">\`, the page glides instead of jumps.

**Accessibility:**
- Should be disabled if user prefers reduced motion (\`prefers-reduced-motion\`).`,
        codeExample: `<style>
  .scroll-box {
    height: 150px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    border: 1px solid white;
  }
  
  section { height: 150px; padding: 20px; }
  #a { background: #333; }
  #b { background: #555; }
</style>

<a href="#a" style="color: cyan">Go to A</a> | 
<a href="#b" style="color: cyan">Go to B</a>

<div class="scroll-box">
  <section id="a">Section A</section>
  <section id="b">Section B</section>
</div>`
    },
    {
        id: 'css-modern-8',
        category: 'Modern Features',
        difficulty: 'Hard',
        question: 'What is the "dialog" element and the ::backdrop pseudo-element?',
        answer: `**The native logical Modal element.**

**Features:**
- JS API: \`.showModal()\` (puts it on top layer).
- Focus management built-in (traps focus usually).
- Close with ESC key built-in.
- **::backdrop**: Styles the dimmed background behind the modal.`,
        codeExample: `<style>
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.8);
  }
  dialog {
    border: none;
    border-radius: 8px;
    padding: 20px;
  }
</style>

<button onclick="document.getElementById('modal').showModal()">Open Native Component</button>

<dialog id="modal">
  <h2>Native Dialog</h2>
  <p>Esc key works automatically.</p>
  <button onclick="this.closest('dialog').close()">Close</button>
</dialog>`
    },
    {
        id: 'css-modern-9',
        category: 'Modern Features',
        difficulty: 'Expert',
        question: 'What is View Transitions API?',
        answer: `**Native page transition animations (Shared Element Transitions).**

**Function:**
- Snapshots the old state and new state.
- Morphs one to the other (cross-fade or custom morph).
- Works for Single Page Apps (SPA) and now Multi Page Apps (MPA).

**Usage:**
- \`document.startViewTransition(() => updateDOM())\``,
        codeExample: `<style>
  /* Customizing the animation */
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.5s;
  }
</style>

<script>
  function toggleMode() {
    // If supported
    if (!document.startViewTransition) {
      document.body.classList.toggle('dark');
      return;
    }
    
    document.startViewTransition(() => {
      document.body.classList.toggle('dark');
    });
  }
</script>

<style>
  .dark { background: #333; color: white; }
  body { padding: 20px; transition: background 0.2s; /* standard fallback */ }
</style>

<button onclick="toggleMode()">Toggle Dark Mode (Morph)</button>`
    },
    {
        id: 'css-modern-10',
        category: 'Modern Features',
        difficulty: 'Medium',
        question: 'What is "accent-color"?',
        answer: `**One-line theming for native form controls.**

**Effect:**
- Changes the active color of checkboxes, radio buttons, range sliders, and progress bars.
- Browser handles contrast automatically.`,
        codeExample: `<style>
  .branding {
    accent-color: magenta;
  }
</style>

<div class="branding">
  <label><input type="checkbox" checked> Checkbox</label>
  <br>
  <label><input type="radio" checked> Radio</label>
  <br>
  <input type="range">
</div>`
    }
];

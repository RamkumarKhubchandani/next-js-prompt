export const realWorldQuestions = [
    {
        id: 'css-real-1',
        category: 'Real Interview Questions',
        difficulty: 'Medium',
        question: 'How would you build a "Sticky Footer" (Footer stays at bottom even with little content)?',
        answer: `**Flexbox Solution (Standard):**

1. \`min-height: 100vh\` on wrapper.
2. \`display: flex; flex-direction: column\`.
3. \`flex-grow: 1\` on the main content area.

**Grid Solution:**
- \`display: grid; grid-template-rows: auto 1fr auto; min-height: 100vh;\`.`,
        codeExample: `<style>
  body { margin: 0; }
  
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 200px; /* Using 200px for demo, normally 100vh */
    border: 1px solid black;
  }
  
  header, footer { background: #333; color: white; padding: 10px; }
  
  main {
    background: #eee;
    padding: 10px;
    /* The Magic: Grows to fill empty space */
    flex-grow: 1; 
  }
</style>

<div class="layout">
  <header>Header</header>
  <main>
    <p>Short content.</p>
  </main>
  <footer>I am always at the bottom.</footer>
</div>`
    },
    {
        id: 'css-real-2',
        category: 'Real Interview Questions',
        difficulty: 'Hard',
        question: 'Build a Tooltip ONLY using CSS (No JavaScript).',
        answer: `**Technique:**
1. Parent has \`position: relative\`.
2. Tooltip (pseudo-element or child) has \`position: absolute\`, \`opacity: 0\`, \`pointer-events: none\`.
3. On \`parent:hover\`: set \`opacity: 1\`.`,
        codeExample: `<style>
  .tooltip-container {
    position: relative;
    display: inline-block;
    cursor: help;
    border-bottom: 1px dashed black;
  }
  
  .tooltip-text {
    position: absolute;
    bottom: 125%; /* Move above text */
    left: 50%;
    transform: translateX(-50%);
    background: black;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    
    /* Reveal Logic */
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none; /* Prevent flickering */
    white-space: nowrap;
  }
  
  .tooltip-container:hover .tooltip-text {
    opacity: 1;
  }
</style>

<p>
  Here is a <span class="tooltip-container">
    Tech Term
    <span class="tooltip-text">Explanation of term</span>
  </span> in a sentence.
</p>`
    },
    {
        id: 'css-real-3',
        category: 'Real Interview Questions',
        difficulty: 'Medium',
        question: 'How do you create a custom Checkbox/Radio button?',
        answer: `**The "Input Hacking" Pattern:**

1. Hide the native input visually (\`sr-only\` or \`opacity: 0\`).
2. Style a separate \`<span>\` or \`::before\` pseudo-element.
3. Use \`input:checked + span\` selector to change the styled element.`,
        codeExample: `<style>
  .custom-check {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  /* 1. Hide Input */
  .custom-check input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  
  /* 2. Create Box */
  .checkmark {
    height: 20px;
    width: 20px;
    background-color: #eee;
    border: 1px solid #ccc;
    margin-right: 10px;
    display: grid;
    place-items: center;
  }
  
  /* 3. Checked State */
  .custom-check input:checked + .checkmark {
    background-color: #2196F3;
    color: white;
  }
  
  /* Checkmark Icon (Hidden by default) */
  .checkmark::after {
    content: "✓";
    display: none;
  }
  
  .custom-check input:checked + .checkmark::after {
    display: block;
  }
</style>

<label class="custom-check">
  <input type="checkbox">
  <span class="checkmark"></span>
  Custom Checkbox
</label>`
    },
    {
        id: 'css-real-4',
        category: 'Real Interview Questions',
        difficulty: 'Hard',
        question: 'Create a "Truncate Text" (ellipsis) effect for single and multi-line.',
        answer: `**Single Line:**
- \`white-space: nowrap; overflow: hidden; text-overflow: ellipsis;\`

**Multi Line (Line Clamping):**
- \`display: -webkit-box;\`
- \`-webkit-line-clamp: 3;\`
- \`-webkit-box-orient: vertical; overflow: hidden;\``,
        codeExample: `<style>
  .box { width: 150px; border: 1px solid #ccc; margin-bottom: 10px; padding: 5px; }
  
  /* Single Line */
  .single {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  /* Multi Line (3 lines max) */
  .multi {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>

<div class="box single">
  This is a very long title that should cut off.
</div>

<div class="box multi">
  This is a long description text. It wraps to multiple lines but should eventually cut off with dots when it exceeds three lines of text. It just keeps going and going.
</div>`
    },
    {
        id: 'css-real-5',
        category: 'Real Interview Questions',
        difficulty: 'Medium',
        question: 'How do you style a Scrollbar?',
        answer: `**Using \`::-webkit-scrollbar\` pseudo-elements.**

**Parts:**
- \`::-webkit-scrollbar\`: Width/Height.
- \`::-webkit-scrollbar-track\`: Background.
- \`::-webkit-scrollbar-thumb\`: The handle.

**Note:** Firefox uses \`scrollbar-width\` and \`scrollbar-color\`.`,
        codeExample: `<style>
  .scroller {
    width: 200px;
    height: 100px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    
    /* Firefox */
    scrollbar-width: thin;
    scrollbar-color: red orange;
  }
  
  /* Webkit (Chrome, Safari, Edge) */
  .scroller::-webkit-scrollbar {
    width: 10px;
  }
  
  .scroller::-webkit-scrollbar-track {
    background: orange;
  }
  
  .scroller::-webkit-scrollbar-thumb {
    background: red;
    border-radius: 5px;
  }
</style>

<div class="scroller">
  <p>Scroll me!</p>
  <p>Content...</p>
  <p>Content...</p>
  <p>Content...</p>
  <p>Content...</p>
</div>`
    },
    {
        id: 'css-real-6',
        category: 'Real Interview Questions',
        difficulty: 'Expert',
        question: 'How to make a 16:9 Aspect Ratio Video player that is responsive?',
        answer: `**Old Way (Padding Hack):**
- \`padding-top: 56.25%\` (9/16).
- \`position: absolute\` on child.

**New Way (Modern):**
- \`aspect-ratio: 16 / 9; width: 100%;\``,
        codeExample: `<style>
  .container { width: 50%; border: 1px solid red; }
  
  /* 1. Modern */
  .video-modern {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: black;
    color: white;
    display: grid; place-items: center;
  }
</style>

<div class="container">
  <div class="video-modern">Play Video</div>
</div>`
    },
    {
        id: 'css-real-7',
        category: 'Real Interview Questions',
        difficulty: 'Hard',
        question: 'Explain how to implement "Dark Mode" properly.',
        answer: `**Using CSS Variables and \`prefers-color-scheme\`.**

**Strategy:**
1. Define colors as variables (\`--bg\`, \`--text\`) in \`:root\`.
2. Override them in \`@media (prefers-color-scheme: dark)\`.
3. Use variables everywhere.`,
        codeExample: `<style>
  :root {
    --bg: white;
    --text: black;
  }
  
  /* User System Preference: Dark */
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #333;
      --text: white;
    }
  }
  
  body {
    background: var(--bg);
    color: var(--text);
    transition: background 0.3s;
  }
</style>

<!-- 
  Simulating Force Dark Class for Demo 
  (Since iframe might not match OS preference)
-->
<style>
  .dark-theme { --bg: #222; --text: #eee; }
</style>

<div class="dark-theme" style="background: var(--bg); color: var(--text); padding: 20px;">
  <h1>Dark Mode Content</h1>
  <p>This mimics what happens if OS is dark.</p>
</div>`
    },
    {
        id: 'css-real-8',
        category: 'Real Interview Questions',
        difficulty: 'Medium',
        question: 'How do you create a Triangle using CSS?',
        answer: `**The "Border Hack".**

**Logic:**
- 0x0 width/height.
- Thick transparent borders.
- One colored border determines direction.`,
        codeExample: `<style>
  .triangle-up {
    width: 0;
    height: 0;
    
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 50px solid red;
  }
  
  .triangle-right {
    width: 0;
    height: 0;
    margin-top: 20px;
    border-top: 25px solid transparent;
    border-bottom: 25px solid transparent;
    border-left: 50px solid blue;
  }
</style>

<div class="triangle-up"></div>
<div class="triangle-right"></div>`
    },
    {
        id: 'css-real-9',
        category: 'Real Interview Questions',
        difficulty: 'Medium',
        question: 'What is the "Lobotomized Owl" selector (* + *)?',
        answer: `**A clever way to manage spacing between elements.**

**Selector:** \`.stack > * + *\`
- Selects any element that has a previous sibling.
- Essentially: "Add margin-top to everything *except* the first item".

**Benefit:**
- No need for \`:last-child { margin-bottom: 0 }\`.`,
        codeExample: `<style>
  .stack > * + * {
    margin-top: 20px; /* The gap */
    border-top: 1px dotted #ccc;
  }
  
  .stack { background: #f9f9f9; padding: 20px; }
  .item { background: white; padding: 10px; }
</style>

<div class="stack">
  <div class="item">Item 1 (No top margin)</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>`
    },
    {
        id: 'css-real-10',
        category: 'Real Interview Questions',
        difficulty: 'Hard',
        question: 'How do you fix "z-index hell" (z-index not working)?',
        answer: `**Understanding Stacking Contexts.**

**Common Issue:**
- Element A is z-index 100.
- Element B is z-index 10.
- B is appearing on TOP of A. Why?

**Cause:**
- A's parent has \`z-index: 1\` (or opacity/transform).
- B's parent has \`z-index: 2\`.
- A is trapped in a lower context.

**Fix:**
- Move A out of its parent to the root (React Portals).
- Or remove stacking context triggers from the parent.`,
        codeExample: `<style>
  .low-context {
    position: relative;
    z-index: 1; /* TRAP */
    background: #eee; height: 100px;
  }
  
  .high-context {
    position: relative;
    z-index: 2; /* WINNER */
    background: #ddd; height: 100px; margin-top: -50px;
  }
  
  .trapped-child {
    position: absolute;
    z-index: 999999; /* Doesn't matter, trapped in z-index:1 parent */
    top: 20px; left: 20px;
    background: red; color: white; padding: 10px;
  }
</style>

<div class="low-context">
  Parent (z: 1)
  <div class="trapped-child">Child (z: 9999)</div>
</div>

<div class="high-context">
  Parent (z: 2) - I cover the red child.
</div>`
    },
    {
        id: 'css-real-11',
        category: 'Real Interview Questions',
        difficulty: 'Medium',
        question: 'How to create a "Frosted Glass" effect (Glassmorphism)?',
        answer: `**Using \`backdrop-filter\`.**

**Recipe:**
1. Semi-transparent background (\`rgba(255,255,255, 0.2)\`).
2. \`backdrop-filter: blur(10px)\`.
3. Border opacity.`,
        codeExample: `<style>
  .bg {
    background: linear-gradient(45deg, red, blue);
    height: 200px;
    display:flex; align-items: center; justify-content: center;
  }
  
  .glass {
    width: 200px; height: 100px;
    
    /* The Magic */
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    color: white;
    padding: 20px;
  }
</style>

<div class="bg">
  <div class="glass">
    Glass Effect
  </div>
</div>`
    },
    {
        id: 'css-real-12',
        category: 'Real Interview Questions',
        difficulty: 'Easy',
        question: 'How to disable text selection for UI elements?',
        answer: `**\`user-select: none;\`**

**Use Cases:**
- Buttons.
- Custom drag-and-drop handles.
- App-like headers.`,
        codeExample: `<style>
  .no-select {
    user-select: none; /* Standard */
    -webkit-user-select: none; /* Safari */
    cursor: pointer;
    background: #eee; padding: 10px;
  }
</style>

<div class="no-select">
  Try to select this text. You can't. (Good for buttons)
</div>
<div>
  Select me freely.
</div>`
    },
    {
        id: 'css-real-13',
        category: 'Real Interview Questions',
        difficulty: 'Medium',
        question: 'How to replace an image with CSS if it fails to load?',
        answer: `**Using the \`img::after\` pseudo-element trick.**

**Fact:**
- \`::before\` and \`::after\` usually don't work on replaced elements like \`<img>\`.
- **EXCEPTION:** If the image FAILS to load, the pseudo-elements *do* appear in some browsers, or you can use a fallback background on the img tag itself.`,
        codeExample: `<style>
  .broken-img {
    width: 200px; height: 100px;
    background: #f0f0f0; /* Fallback color */
    position: relative;
    /* Hide the 'broken image' icon */
    color: transparent; 
  }

  /* Reliable fallback text styling */
  .broken-img::after {
    content: "Image Unavailable";
    display: block;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    color: red;
    font-weight: bold;
  }
</style>

<img src="invalid_url.jpg" alt="Broken" class="broken-img">`
    },
    {
        id: 'css-real-14',
        category: 'Real Interview Questions',
        difficulty: 'Hard',
        question: 'Implement a "Masonry" Layout (Pinterest style) with CSS.',
        answer: `**Approaches:**

1. **Columns (CSS Columns):**
   - \`column-count: 3;\`
   - Easy, but order is Top-Bottom, Left-Right (bad for chronology).
   
2. **Grid + JavaScript:** (Hard).

3. **CSS Grid (New Standard - Proposed):**
   - \`grid-template-rows: masonry;\` (Firefox only currently).`,
        codeExample: `<style>
  .masonry {
    /* Easy CSS-only way */
    column-count: 3;
    column-gap: 1em;
  }
  
  .item {
    background: #eee;
    margin-bottom: 1em;
    break-inside: avoid; /* Prevent split across columns */
    padding: 10px;
    border-radius: 8px;
  }
  
  .h1 { height: 100px; background: pink; }
  .h2 { height: 50px; background: cyan; }
  .h3 { height: 150px; background: lime; }
</style>

<div class="masonry">
  <div class="item h1">1</div>
  <div class="item h2">2</div>
  <div class="item h3">3</div>
  <div class="item h2">4</div>
  <div class="item h1">5</div>
  <div class="item h3">6</div>
  <div class="item h1">7</div>
</div>`
    },
    {
        id: 'css-real-15',
        category: 'Real Interview Questions',
        difficulty: 'Medium',
        question: 'How to animate `height: auto` (Accordion effect)?',
        answer: `**The classic CSS problem: You can't transition to \`auto\`.**

**Old Hack:** Transition \`max-height\` (e.g., 0 to 1000px).

**Modern Solution:** \`grid-template-rows\` transition.
- 0fr to 1fr.`,
        codeExample: `<style>
  .accordion {
    border: 1px solid black;
    width: 200px;
  }
  
  .content-wrapper {
    display: grid;
    /* Start closed (0 height) */
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease-out;
  }
  
  /* Open State */
  .accordion:hover .content-wrapper {
    grid-template-rows: 1fr;
  }
  
  .content-inner {
    overflow: hidden; /* Necessary */
    background: #eee;
  }
</style>

<div class="accordion">
  <div style="padding:10px; background:#ddd">Hover Me</div>
  <div class="content-wrapper">
    <div class="content-inner">
      <div style="padding: 10px">
        Unexpectedly long content that fits naturally into the 1fr space.
      </div>
    </div>
  </div>
</div>`
    }
];

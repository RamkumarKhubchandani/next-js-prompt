export const browserInternalsQuestions = [
    {
        id: 'browser-perf-1',
        category: 'Browser Internals',
        difficulty: 'Expert',
        question: 'Explain the "Critical Rendering Path" from HTML to pixels.',
        answer: `**The sequence of steps the browser takes to convert HTML, CSS, and JS into actual pixels.**

1. **DOM Tree:** Parse HTML bytes into characters -> tokens -> nodes -> DOM.
2. **CSSOM Tree:** Parse CSS into CSS Object Model.
3. **Render Tree:** Combine DOM + CSSOM. Excludes \`display: none\` elements.
4. **Layout (Reflow):** Calculate geometry (position/size) of each node.
5. **Paint:** Fill in pixels (color, text, borders).
6. **Composite:** Assemble layers together (GPU handling).

**Optimization:**
- Minimize critical resources (CSS/JS) to unblock the first paint.`,
        codeExample: `<style>
  /* 
    Optimization Demo: 
    Using 'transform' skips Layout & Paint, going straight to Composite.
  */
  .fast-animation {
    /* Only triggers Composite step */
    transform: translateX(100px);
    transition: transform 0.3s;
  }
  
  .slow-animation {
    /* Triggers Layout -> Paint -> Composite */
    margin-left: 100px;
    transition: margin-left 0.3s;
  }
</style>

<div class="fast-animation">Fast (GPU)</div>
<div class="slow-animation">Slow (CPU Layout)</div>`
    },
    {
        id: 'browser-perf-2',
        category: 'Browser Internals',
        difficulty: 'Hard',
        question: 'What triggers a Reflow (Layout) vs Repaint?',
        answer: `**Reflow is expensive; Repaint is cheaper.**

**Reflow (Layout):**
- Happens when **geometry** changes (width, height, margin, font-size).
- The browser must recalculate positions of *all* affected elements (often the whole page).
- **Triggers:** Resizing window, changing \`width\`, reading \`offsetWidth\` (forced synchronous layout).

**Repaint:**
- Happens when **visibility** changes but geometry doesn't (color, visibility, background).
- Browser just re-draws pixels.

**Compositon (Cheapest):**
- \`transform\`, \`opacity\`. No layout or paint, just layer manipulation.`,
        codeExample: `<script>
  function forceReflow() {
    const box = document.getElementById('box');
    
    // Writing style (Invalidates Layout)
    box.style.width = '200px';
    
    // Reading computed property (Forces Immediate Reflow)
    // Browser must calculate layout 'right now' to give you the number.
    console.log(box.offsetWidth); 
    
    box.style.height = '200px';
  }
</script>

<div id="box" style="width: 100px; height: 100px; background: red;"></div>
<button onclick="forceReflow()">Trigger Forced Reflow</button>`
    },
    {
        id: 'browser-perf-3',
        category: 'Browser Internals',
        difficulty: 'Expert',
        question: 'What is "Layer Promotion" (will-change)?',
        answer: `**Promoting an element to its own GPU layer.**

**Mechanism:**
- The browser paints the element into a separate texture (bitmap) and uploads it to the GPU.
- Transformations are then just matrix math on that texture (super fast).

**How to trigger:**
- \`will-change: transform;\` (Modern, semantic).
- \`transform: translateZ(0);\` (Old hack).

**Warning:**
- Layers consume memory (VRAM). Don't promote everything.`,
        codeExample: `<style>
  .gpu-layer {
    /* Tells browser to optimize for transform changes */
    will-change: transform; 
    
    /* The element is now on its own compositor layer */
    background: linear-gradient(45deg, blue, red);
    width: 100px; height: 100px;
    animation: spin 3s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>

<div class="gpu-layer">GPU Mode</div>`
    },
    {
        id: 'browser-perf-4',
        category: 'Browser Internals',
        difficulty: 'Medium',
        question: 'How does CSS parsing block rendering?',
        answer: `**CSS is "Render Blocking".**

**Why?**
- The browser cannot render the page until it builds the CSSOM.
- If it rendered mostly-HTML first and then applied CSS, you'd get a "Flash of Unstyled Content" (FOUC).

**Performance Impact:**
- Large CSS files delay the "First Contentful Paint".
- **Solution:** Inline critical CSS, defer non-critical CSS.`,
        codeExample: `<!-- Browsers wait for this to download & parse before showing ANYTHING -->
<link rel="stylesheet" href="huge-bootstrap-bundle.css">

<!-- Better Strategy for Critical Path -->
<style>
  /* Inline Critical styles (Header, Hero) */
  body { margin: 0; font-family: sans-serif; }
  .hero { background: blue; color: white; }
</style>

<!-- Load rest asynchronously (simplified pattern) -->
<link rel="stylesheet" href="rest.css" media="print" onload="this.media='all'">`
    },
    {
        id: 'browser-perf-5',
        category: 'Browser Internals',
        difficulty: 'Hard',
        question: 'What is the "Composite" step?',
        answer: `**The final step where layers are drawn onto the screen.**

**Process:**
- The browser splits the page into "Layers" (Document, Fixed elements, Videos, 3D transforms).
- Each layer is painted independently (rasterized).
- The Compositor Thread (GPU) draws these textures onto the screen grid.

**Benefit:**
- Scrolling is fast because the browser just moves the existing distinct layers without repainting their content.`,
        codeExample: `<style>
  .fixed-header {
    position: fixed; /* Promotes to layer automatically mostly */
    top: 0; width: 100%;
    background: rgba(255,255,255,0.9);
    height: 50px;
  }
  
  .content {
    margin-top: 60px;
    height: 200vh; /* Long scroll */
    background: linear-gradient(to bottom, #eee, #333);
  }
</style>

<div class="fixed-header">Layer 1 (Fixed)</div>
<div class="content">Layer 2 (Scrollable content)</div>

<!-- 
 When scrolling, browser doesn't repaint the header.
 It just recomposites the 'fixed header' layer on top of the 'content' layer.
-->`
    },
    {
        id: 'browser-perf-6',
        category: 'Browser Internals',
        difficulty: 'High',
        question: 'How do you debug Layout Thrashing?',
        answer: `**Layout Thrashing (Forced Synchronous Layout) occurs when you read/write DOM properties in a loop.**

**Problem Loop:**
1. Write style (Invalidate Layout).
2. Read style (Force Layout to answer).
3. Repeat.

**Fix:**
- **Read** all values first.
- **Write** all values second.
- Or use \`requestAnimationFrame\`.`,
        codeExample: `<script>
  function thrash() {
    const items = document.querySelectorAll('.item');
    
    // BAD
    for(let i=0; i<items.length; i++) {
        let width = items[i].offsetWidth; // READ
        items[i].style.width = (width + 10) + 'px'; // WRITE (Invalidate)
        // Next loop iteration: Read offsetWidth causes FORCED LAYOUT because of previous write
    }
    
    // GOOD (Batching)
    const widths = [];
    // 1. READ ALL
    for(let i=0; i<items.length; i++) {
        widths.push(items[i].offsetWidth);
    }
    // 2. WRITE ALL
    for(let i=0; i<items.length; i++) {
        items[i].style.width = (widths[i] + 10) + 'px';
    }
  }
</script>`
    },
    {
        id: 'browser-perf-7',
        category: 'Browser Internals',
        difficulty: 'Expert',
        question: 'What is "contain" property (CSS Containment)?',
        answer: `**Tells the browser that a subtree is independent of the rest of the page.**

**Values:**
- \`contain: layout\`: Changes inside don't affect outer layout.
- \`contain: paint\`: Nothing inside paints outside bounds (clips).
- \`content-visibility: auto\`: Skips rendering entirely if off-screen (like virtual scrolling but native).

**Benefit:**
- Massive performance gains for large apps with many widgets.`,
        codeExample: `<style>
  .widget {
    /* 
      Browser knows: Layout changes in here 
      WILL NOT affect the width/height of the body.
      It stops Reflow propagation.
    */
    contain: strict; 
    width: 300px;
    height: 200px;
    border: 1px solid black;
    overflow: auto;
  }
</style>

<div class="widget">
  <h3>Independent Widget</h3>
  <p>If I change content size here, browser recalculates layout ONLY for this div, not the whole page.</p>
</div>`
    },
    {
        id: 'browser-perf-8',
        category: 'Browser Internals',
        difficulty: 'Medium',
        question: 'What is BFC (Block Formatting Context)?',
        answer: `**A mini-layout engine inside a container.**

**Triggers:**
- \`overflow: hidden / auto\`
- \`display: flex / grid / inline-block\`
- \`float: left/right\`
- \`position: absolute / fixed\`

**Features:**
- Floats don't escape it (Self-clearing).
- Margins don't collapse *into* it from outside.
- Doesn't overlap with outside floats.`,
        codeExample: `<style>
  .parent {
    background: #ccc;
    /* overflow: hidden creates a BFC */
    overflow: hidden; 
  }
  
  .floated-child {
    float: left;
    width: 50px; height: 50px;
    background: red;
  }
</style>

<div class="parent">
  <div class="floated-child"></div>
  <p>Without BFC (overflow:hidden), the parent height would collapse to 0 (ignoring float). With BFC, parent wraps the float.</p>
</div>`
    },
    {
        id: 'browser-perf-9',
        category: 'Browser Internals',
        difficulty: 'Medium',
        question: 'How do fonts load/render (FOIT vs FOUT)?',
        answer: `**Browsers handle web font loading differently.**

**FOIT (Flash of Invisible Text):**
- Browser waits for font download. Text is invisible (opacity:0).
- Users see empty space.

**FOUT (Flash of Unstyled Text):**
- Browser shows fallback font immediately.
- Swaps to custom font when loaded.

**Control:**
- \`font-display: swap;\` (Forces FOUT - better UX).
- \`font-display: block;\` (Forces FOIT).`,
        codeExample: `<style>
  @font-face {
    font-family: 'MyFont';
    src: url('myfont.woff2') format('woff2');
    /* Recommended: Show fallback immediately, swap when ready */
    font-display: swap; 
  }
  
  h1 {
    font-family: 'MyFont', sans-serif;
  }
</style>

<h1>Hello World</h1>
<p>If font takes 3s to load, I will be visible in Arial instantly, then snap to MyFont.</p>`
    },
    {
        id: 'browser-perf-10',
        category: 'Browser Internals',
        difficulty: 'Expert',
        question: 'Explain "Shadow DOM" mechanics.',
        answer: `**Shadow DOM provides Encapsulation.**

**Features:**
- **Isolated Styles:** CSS inside doesn't leak out. CSS outside doesn't bleed in.
- **Isolated DOM:** \`document.querySelector\` can't find nodes inside shadow root effortlessly.
- **Slots:** Composition API for injecting content.

**Used by:** Web Components, \`<video>\` controls, \`<input type="date">\` internals.`,
        codeExample: `< div id="host" ></div>

<script>
  const host = document.getElementById('host');
  // Create open shadow root
  const shadow = host.attachShadow({ mode: 'open' });
  
  shadow.innerHTML = \`
    <style>
      p { color: red; font-weight: bold; }
    </style>
    <p>I am in Shadow DOM. I am Red.</p>
    <slot></slot>
  \`;
</script>

<p>I am Global DOM. I am NOT Red (Styles don't leak).</p>`
    }
];

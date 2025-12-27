export const responsiveQuestions = [
    {
        id: 'css-resp-1',
        category: 'Responsive Design',
        difficulty: 'Easy',
        question: 'What is "Mobile First" design?',
        answer: `**Styling for mobile devices *befoe* tablet/desktop.**

**Why?**
- Mobile code is simpler (less layout code).
- Progressive Enhancement (add complexity as screen grows).
- Performance (mobile browsers don't parse unused desktop CSS overrides).

**In Code:**
- Use \`min-width\` media queries.
- Default styles = Mobile styles.`,
        codeExample: `<style>
  /* 1. Default (Mobile) */
  .container {
    display: block;
    background: #f0f0f0;
    padding: 10px;
    border: 1px solid black;
  }

  /* 2. Tablet (Add columns) */
  @media (min-width: 600px) {
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      background: #e0e0e0;
    }
  }

  /* 3. Desktop (Add spacing) */
  @media (min-width: 1000px) {
    .container {
      gap: 20px;
      padding: 40px;
      background: #d0d0d0;
    }
  }
</style>

<div class="container">
  <div>Item 1 (Resize me)</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
<p>Note: Resize the Preview pane width.</p>`
    },
    {
        id: 'css-resp-2',
        category: 'Responsive Design',
        difficulty: 'Medium',
        question: 'Explain key units: px, em, rem, vh, vw.',
        answer: `**Units determine scalability.**

1. **px (Absolute):** Fixed size. Good for borders. Bad for font-size (accessibility).
2. **rem (Relative to Root):** Scalable. Good for font-size, padding, margins.
   - 1rem = 16px (usually).
3. **em (Relative to Parent):** Compounding. Good for component-internal scaling (padding relative to font).
4. **vh/vw (Viewport):** % of screen height/width. Good for hero sections.`,
        codeExample: `<style>
  html { font-size: 16px; }
  
  .container { font-size: 20px; border: 1px solid black; margin: 10px; }
  
  .box-px  { font-size: 20px; } /* Fixed */
  .box-rem { font-size: 2rem; } /* 2 * 16 (Root) = 32px */
  .box-em  { font-size: 2em; }  /* 2 * 20 (Parent) = 40px */
  .box-vw  { font-size: 5vw; }  /* 5% of viewport width */
</style>

<div class="container">
  <div class="box-px">px (20px)</div>
  <div class="box-rem">rem (32px - based on HTML)</div>
  <div class="box-em">em (40px - based on Parent)</div>
  <div class="box-vw">vw (Resizes with window)</div>
</div>`
    },
    {
        id: 'css-resp-3',
        category: 'Responsive Design',
        difficulty: 'Expert',
        question: 'What are Container Queries (@container)?',
        answer: `**Styling based on the *parent element's* size, not the viewport.**

**Problem with Media Queries:**
- A "Card Component" looks different in a sidebar (narrow) vs main content (wide), but media queries only know viewport width.

**Solution:**
1. Define container: \`container-type: inline-size;\`
2. Query container: \`@container (min-width: 400px) { ... }\``,
        codeExample: `<style>
  .wrapper {
    display: flex;
    gap: 20px;
  }
  
  /* The Container */
  .card-container {
    container-type: inline-size;
    border: 1px dashed grey;
    padding: 5px;
  }
  
  /* Narrow container */
  .narrow { width: 150px; }
  /* Wide container */
  .wide { width: 400px; }
  
  .card {
    background: coral;
    padding: 10px;
    color: white;
  }
  
  /* The Logic */
  @container (min-width: 300px) {
    .card {
      background: blue; /* Change color if container > 300px */
      font-size: 1.5rem;
    }
  }
</style>

<div class="wrapper">
  <div class="card-container narrow">
    <div class="card">Small</div>
  </div>
  
  <div class="card-container wide">
    <div class="card">Large</div>
  </div>
</div>
<p>Note: Modern Browsers only (Chrome 105+).</p>`
    },
    {
        id: 'css-resp-4',
        category: 'Responsive Design',
        difficulty: 'Medium',
        question: 'How do you handle responsive images (srcset)?',
        answer: `**Serve different image sizes/resolutions to different devices.**

**Attributes:**
- **srcset:** List of images and their widths/densities.
- **sizes:** Tells the browser how wide the image *will be* in the layout.

**Result:**
- Mobile downloads \`small.jpg\` (10kb).
- Desktop downloads \`large.jpg\` (100kb).
- Retina downloads \`large.jpg\` (for pixel density).`,
        codeExample: `<!-- Browser chooses best image automatically -->
<img 
  src="fallback.jpg"
  srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Responsive Demo"
  style="width: 100%;"
>

<p>Logic:</p>
<ul>
  <li>If screen < 600px, image takes 100vw. Browser picks best fit from srcset.</li>
  <li>Otherwise, image takes 50vw. Browser picks best fit.</li>
</ul>`
    },
    {
        id: 'css-resp-5',
        category: 'Responsive Design',
        difficulty: 'Hard',
        question: 'How do you create a fluid typography system (clamp)?',
        answer: `**Using \`clamp()\` to scale text smoothly between min and max sizes.**

**Syntax:** \`clamp(MIN, PREFERRED, MAX)\`

**Example:**
- \`font-size: clamp(1rem, 5vw, 2rem);\`
- Never smaller than 1rem.
- Ideally 5vw (scales).
- Never larger than 2rem.

**Benefit:** No need for dozens of media query breakpoints for font sizes.`,
        codeExample: `<style>
  .fluid-text {
    /* Scales between 16px and 48px */
    font-size: clamp(16px, 5vw, 48px);
    font-weight: bold;
    text-align: center;
    border: 1px solid #ccc;
    padding: 20px;
  }
</style>

<div class="fluid-text">
  Resize me! I grow and shrink but have limits.
</div>`
    }
];

export const semanticsQuestions = [
    {
        id: 'html-semantics-1',
        category: 'HTML5 Semantics',
        difficulty: 'Easy',
        question: 'What is the difference between <article>, <section>, and <div>?',
        answer: `**Each tag serves a specific semantic purpose:**

1. **<article>**: Self-contained content that makes sense on its own (e.g., blog post, news item, tweet).
2. **<section>**: A thematic grouping of content, typically with a heading (e.g., "About Us", "Contact").
3. **<div>**: A non-semantic generic container used for layout or styling only.

**Best Practice:**
- Use **<article>** for syndicatable content.
- Use **<section>** to divide a page into logical chapters.
- Use **<div>** only when no semantic tag fits.`,
        codeExample: `<style>
  article { border: 2px solid #3b82f6; padding: 10px; margin-bottom: 10px; }
  section { border: 2px solid #10b981; padding: 10px; margin-bottom: 10px; }
  div.wrapper { border: 1px dashed #64748b; padding: 10px; }
  h2 { margin-top: 0; }
</style>

<!-- Correct Usage -->
<article>
  <h2>Blog Post Title</h2>
  <p>This is a self-contained post.</p>
  
  <section>
    <h3>Comments</h3>
    <p>User comments go here.</p>
  </section>
</article>

<div class="wrapper">
  <p>Just a generic wrapper for styling (e.g. Flexbox).</p>
</div>`
    },
    {
        id: 'html-semantics-2',
        category: 'HTML5 Semantics',
        difficulty: 'Easy',
        question: 'When should you use <button> vs <a> (anchor)?',
        answer: `**The choice depends on the action:**

1. **<a> (Anchor):**
   - Use for **navigation** (URL change).
   - "Go to specific place"
   - Should almost always have an \`href\`.

2. **<button>:**
   - Use for **actions** (Submit form, Open modal, Toggle menu).
   - "Do something on this page"
   - Default \`type\` is "submit" inside forms (always specify \`type="button"\` if not submitting).

**Accessibility:**
- Screen readers announce them differently ("Link to..." vs "Button...").
- Buttons can be triggered by Space/Enter keys by default.`,
        codeExample: `<style>
  .btn { 
    display: inline-block; 
    padding: 8px 16px; 
    background: #eee; 
    border: 1px solid #ccc; 
    margin: 5px; 
    cursor: pointer;
    text-decoration: none; 
    color: black;
    font-family: sans-serif;
  }
</style>

<!-- 1. Navigation (Link) -->
<a href="#" class="btn">Go to Profile (Link)</a>

<!-- 2. Action (Button) -->
<button class="btn" type="button" onclick="alert('Clicked!')">
  Open Modal (Button)
</button>

<!-- 3. Correct: Link that looks like button -->
<!-- 4. Incorrect: Button wrapping a link (Invalid HTML) -->`
    },
    {
        id: 'html-semantics-3',
        category: 'Accessibility',
        difficulty: 'Medium',
        question: 'What is the "alt" attribute and how do you write good alt text?',
        answer: `**The \`alt\` attribute provides a text alternative for images.**

**Purpose:**
1. **Accessibility:** Screen readers read this to blind users.
2. **SEO:** Search engines index this text.
3. **Fallback:** Displayed if image fails to load.

**Rules for Good Alt Text:**
- **Be Descriptive:** Describe the content and function.
- **Don't use:** "Image of...", "Picture of..." (Screen readers say "Image" automatically).
- **Decorative Images:** Use \`alt=""\` (empty string) so screen readers skip them.
- **Functional Images:** Describe the *destination* (e.g., "Search", not "Magnifying glass").`,
        codeExample: `<style>
  img { max-width: 100px; display: block; margin: 10px 0; }
</style>

<!-- 1. Descriptive (Informational) -->
<img src="broken-chart.png" alt="Bar chart showing 20% growth in Q3 sales">

<!-- 2. Functional (Link/Button) -->
<a href="/search">
  <img src="broken-search.png" alt="Search Website">
</a>

<!-- 3. Decorative (Ignored) -->
<img src="broken-divider.png" alt="">

<p>Note: Images above are broken to show the alt text.</p>`
    },
    {
        id: 'html-semantics-4',
        category: 'SEO & Performance',
        difficulty: 'Medium',
        question: 'What is the difference between <script>, <script async>, and <script defer>?',
        answer: `**It controls when the script is downloaded and executed during HTML parsing.**

1. **<script> (Default):**
   - Pauses HTML parsing.
   - Downloads script.
   - Executes script.
   - Resumes parsing.
   - **Bad for performance** (render blocking).

2. **<script async>:**
   - Downloads in **parallel** with parsing.
   - Pauses parsing to **execute** immediately when downloaded.
   - **Order not guaranteed**. Use for independent analytics scripts.

3. **<script defer> (Best Practice):**
   - Downloads in **parallel**.
   - **Executes only after HTML parsing is complete** (before DOMContentLoaded).
   - **Order guaranteed**. Use for main app bundles.`,
        codeExample: `<!-- Simulation of Loading Behavior -->
<div style="font-family: monospace;">
  
  Parses HTML: [||||||||||||||||||||]
  
  1. Default:
     [|||] -> STOP -> [Download/Exec] -> [|||||]
  
  2. Async:
     [||||||||]
     [Download] -> STOP -> [Exec] -> [|||]
  
  3. Defer (Best):
     [||||||||||||||||||||]
     [Download...........] -> [Exec]

</div>`
    },
    {
        id: 'html-semantics-5',
        category: 'HTML5 Semantics',
        difficulty: 'Medium',
        question: 'Explain the purpose of the data-* attribute.',
        answer: `**\`data-*\` attributes constitute a way to store custom data private to the page or application.**

**Usage:**
- Storing state in the DOM (e.g., ID, index, config).
- Styling hook (rare but possible).
- JavaScript access via \`dataset\`.

**Best Practice:**
- Do not use for visible content (use proper elements).
- Do not store sensitive data.
- Useful for communication between HTML and JS without relying on classes.`,
        codeExample: `<style>
  /* Accessing in CSS */
  .product::before {
    content: "ID: " attr(data-id);
    display: block;
    font-size: 0.8em;
    color: #888;
  }
</style>

<div class="product" data-id="123" data-category="electronics" data-price="99.99">
  <h3>Headphones</h3>
  <button onclick="showData(this.parentElement)">Log Data</button>
</div>

<script>
  function showData(el) {
    // Accessing via dataset API (camelCase)
    console.log(el.dataset); 
    // Output: { id: "123", category: "electronics", price: "99.99" }
    alert('Category: ' + el.dataset.category);
  }
</script>`
    },
    {
        id: 'html-semantics-6',
        category: 'Accessibility',
        difficulty: 'Hard',
        question: 'What are ARIA roles and when should you use them?',
        answer: `**ARIA (Accessible Rich Internet Applications) roles define semantic meaning for elements that lack it.**

**Key Rule: The First Rule of ARIA is "Don't use ARIA."**
- Use native HTML5 elements first (\`<button>\`, \`<nav>\`, \`<label>\`).
- Use ARIA only when native elements functionality is impossible to use (e.g., custom complex widgets).

**Common Roles:**
- \`role="button"\`: Use on a div acting as a button (Must also add tabindex and key handlers!).
- \`role="alert"\`: For error messages (read immediately).
- \`role="dialog"\`: For modals.
- \`aria-label\`: Hidden label for screen readers.`,
        codeExample: `<style>
  .custom-btn {
    display: inline-block;
    padding: 5px 10px;
    background: #007bff;
    color: white;
    cursor: pointer;
  }
</style>

<!-- 1. Native (Preferred) -->
<button>Native Button</button>

<!-- 2. ARIA (If you really must use div) -->
<!-- Requires role, tabindex (focus), and JS for Enter/Space keys -->
<div 
  role="button" 
  tabindex="0" 
  class="custom-btn"
  aria-label="Submit Form"
  onclick="alert('ARIA Button')"
  onkeydown="if(event.key === 'Enter') alert('ARIA Button Key')">
  ARIA Div Button
</div>`
    },
    {
        id: 'html-semantics-7',
        category: 'SEO & Performance',
        difficulty: 'Easy',
        question: 'Why is the <!DOCTYPE html> declaration necessary?',
        answer: `**It tells the browser to render the page in "Standards Mode".**

**Without it:**
- Browsers switch to **"Quirks Mode"**.
- Emulates behavior of old browsers (IE5/Netscape 4).
- Causes unpredictable layout behavior (Box model parsing changes).

**HTML5:**
- The simple \`<!DOCTYPE html>\` is the standard for HTML5 and ensures consistent rendering across modern browsers.`,
        codeExample: `<!-- Always the first line of code -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Standards Mode</title>
</head>
<body>
  <div style="width: 100px; padding: 20px; border: 10px solid black; background: gold;">
    Default Box Model
  </div>
  <p>If DOCTYPE is missing, box width/height calculation might differ in old browsers (Quirks Mode).</p>
</body>
</html>`
    },
    {
        id: 'html-semantics-8',
        category: 'SEO & Performance',
        difficulty: 'Medium',
        question: 'What is the meta viewport tag and why is it critical?',
        answer: `**The viewport meta tag controls the layout on mobile browsers.**

\`<meta name="viewport" content="width=device-width, initial-scale=1">\`

**Parts:**
- \`width=device-width\`: Sets the width of the page to follow the screen-width of the device (preventing it from rendering like a 980px desktop site).
- \`initial-scale=1\`: Sets the initial zoom level.

**Consequences of missing it:**
- Mobile phones will render the page as if on a desktop and scale it down to fit.
- Text will be tiny and unreadable.
- Responsiveness (media queries) won't work correctly.`,
        codeExample: `<!-- HEAD Section -->
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .box {
      background: coral;
      width: 100%; /* Will actually be 100% of device width */
      padding: 20px;
      font-size: 1.2rem;
    }
  </style>
</head>

<div class="box">
  I am responsive! 
  Resize the window or view on mobile.
</div>`
    },
    {
        id: 'html-semantics-9',
        category: 'HTML5 Semantics',
        difficulty: 'Medium',
        question: 'What is the difference between <script>, <style> and <link>?',
        answer: `**They handle different resource types:**

1. **<link>:**
   - External resources (mostly CSS, but also icons, preloads).
   - Empty element (void).
   - \`<link rel="stylesheet" href="style.css">\`

2. **<style>:**
   - Internal CSS written directly in HTML.
   - Inside \`<head>\` or \`<body>\`.
   - \`<style>.red { color: red; }</style>\`

3. **<script>:**
   - Executable code (JavaScript).
   - Can be internal (inline code) or external (\`src\`).`,
        codeExample: `<head>
  <!-- External CSS -->
  <!-- <link rel="stylesheet" href="styles.css"> -->
  
  <!-- Internal CSS -->
  <style>
    .demo-text {
      color: purple;
      font-weight: bold;
    }
  </style>
</head>

<body>
  <div class="demo-text">Styled text</div>

  <!-- JavaScript -->
  <script>
    console.log('Script executing...');
  </script>
</body>`
    },
    {
        id: 'html-semantics-10',
        category: 'HTML5 Semantics',
        difficulty: 'Hard',
        question: 'What are Semantic Headings and why is hierarchy important?',
        answer: `**Heading tags (<h1>-<h6>) create a document outline.**

**Rules:**
1. **One <h1> per page:** Represents the main topic (best for SEO).
2. **Don't skip levels:** \`<h1>\` should be followed by \`<h2>\`, not \`<h4>\`.
3. **Use for structure, not style:** Don't use \`<h3>\` just because you want "medium sized text". Use CSS for sizing.

**Importance:**
- **Navigation:** Screen reader users jump from heading to heading.
- **SEO:** Search engines use headings to understand content structure.`,
        codeExample: `<style>
  /* Use CSS to decouple style from semantics */
  .large-text { font-size: 2rem; font-weight: bold; }
  .small-text { font-size: 0.8rem; color: gray; }
</style>

<!-- Semantic Hierarchy -->
<h1>Main Page Title (H1)</h1>

  <section>
    <h2>Section Title (H2)</h2>
    <p>Content intro...</p>
    
    <h3>Subsection (H3)</h3>
    <p>Details...</p>
  </section>

<!-- Don't do this (Using generic text for heading) -->
<div class="large-text">Fake Heading</div>

<!-- Don't do this (Using heading for style only) -->
<h4 class="small-text">Copyright info (Should be small or footer)</h4>`
    }
];

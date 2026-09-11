export const cssCss3StepByStepGuide = {
    title: "CSS & CSS3: The Complete Step-by-Step Guide for Frontend Developers (Beginner to Advanced)",
    description: "A structured, complete guide to CSS and modern CSS3. Master selectors, the box model, Flexbox, CSS Grid, 3D transforms, keyframe animations, responsive design, custom properties, modern layout helpers (clamp, calc, :has), and real-world coding challenges.",
    slug: "css-css3-complete-step-by-step-guide-beginners-to-advanced",
    category: "CSS",
    type: "static",
    author: "Ramkumar Khubchandani",
    createdAt: new Date().toISOString(),
    readTime: "28 min read",
    difficulty: "Beginner-to-Advanced",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200",
    tags: ["CSS", "CSS3", "Frontend Development", "Web Design", "Responsive Design", "Flexbox", "CSS Grid", "Animations"],
    keywords: [
        "CSS and CSS3 complete step by step guide",
        "CSS tutorial for beginners to advanced",
        "CSS selectors cheat sheet",
        "CSS box model border-box",
        "CSS flexbox vs grid guide",
        "CSS keyframe animations transitions",
        "modern css clamp calc custom properties",
        "css-css3-complete-step-by-step-guide-beginners-to-advanced"
    ],
    toc: [
        { id: "step1-css-fundamentals", label: "01. What CSS Is & How to Add It" },
        { id: "step2-selectors-deep-dive", label: "02. Selectors: Targeting Any Element" },
        { id: "step3-the-box-model", label: "03. The Box Model & box-sizing" },
        { id: "step4-colors-units-values", label: "04. Colors, Units (px, rem, em, vw, vh) & Values" },
        { id: "step5-modern-typography", label: "05. Typography & Custom Web Fonts" },
        { id: "step6-backgrounds-borders-gradients", label: "06. Backgrounds, Gradients & Rounded Borders" },
        { id: "step7-display-and-positioning", label: "07. Display & Positioning (Absolute, Fixed, Sticky)" },
        { id: "step8-flexbox-mastery", label: "08. Flexbox: 1D Layout System" },
        { id: "step9-css-grid-mastery", label: "09. CSS Grid: 2D Multi-Column Layouts" },
        { id: "step10-transitions-smooth-ui", label: "10. CSS3 Transitions for Fluid Hover States" },
        { id: "step11-transforms-3d-effects", label: "11. 2D & 3D Transforms (translate, rotate, scale)" },
        { id: "step12-keyframes-animations", label: "12. Keyframe Animations (@keyframes)" },
        { id: "step13-responsive-media-queries", label: "13. Responsive Design & Mobile-First Media Queries" },
        { id: "step14-css-custom-properties", label: "14. CSS Custom Properties (Variables) & Dark Mode" },
        { id: "step15-modern-css3-helpers", label: "15. Modern Helpers: clamp(), calc(), :has(), container queries" },
        { id: "step16-complete-project", label: "16. Putting It Together: Production Card & Hero Layout" },
        { id: "step17-practice-challenges", label: "17. Interactive Coding Challenges & Homework" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- Hero Intro Banner -->
        <section class="border-l-8 border-blue-600 bg-blue-50 dark:bg-blue-950/30 pl-8 py-8 rounded-r-3xl shadow-sm">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4">
                CSS &amp; CSS3: The Complete Step-by-Step Guide
            </h1>
            <p class="text-xl md:text-2xl text-blue-900 dark:text-blue-200 font-light leading-relaxed">
                From the foundations of selectors and the Box Model to modern Flexbox, CSS Grid, 3D transforms, keyframe animations, CSS variables, and cutting-edge features like <code>clamp()</code> and <code>:has()</code> — with runnable, production-ready code for every step.
            </p>
        </section>

        <!-- STEP 1: What CSS Is and How to Add It -->
        <section id="step1-css-fundamentals" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">01.</span>
                What CSS Is and How to Add It
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    <strong>CSS (Cascading Style Sheets)</strong> controls the <em>visual presentation</em> of HTML documents. While HTML provides semantic meaning and content structure (headings, paragraphs, buttons, forms), CSS handles typography, colors, responsive layouts, spacing, and micro-interactions.
                </p>

                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1.1 The Three Ways to Add CSS</h3>
                <p>
                    There are three primary methods to inject CSS into an HTML webpage:
                </p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                    <div class="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
                        <span class="px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-bold rounded-full uppercase tracking-wider">Method 1</span>
                        <h4 class="text-lg font-bold text-gray-900 dark:text-white mt-3 mb-2">Inline Styles</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Applied directly on individual HTML elements via the <code>style</code> attribute. Avoid in production due to lack of reusability.</p>
                        <pre class="bg-gray-950 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto"><code>&lt;p style="color: red; font-size: 20px;"&gt;Hello&lt;/p&gt;</code></pre>
                    </div>

                    <div class="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
                        <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 text-xs font-bold rounded-full uppercase tracking-wider">Method 2</span>
                        <h4 class="text-lg font-bold text-gray-900 dark:text-white mt-3 mb-2">Internal Stylesheet</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Defined inside a <code>&lt;style&gt;</code> block inside the document <code>&lt;head&gt;</code>. Useful for single-page standalone documents.</p>
                        <pre class="bg-gray-950 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto"><code>&lt;head&gt;
  &lt;style&gt;
    p { color: red; }
  &lt;/style&gt;
&lt;/head&gt;</code></pre>
                    </div>

                    <div class="p-6 bg-white dark:bg-gray-900 border-2 border-blue-500/40 dark:border-blue-500/30 rounded-2xl shadow-md bg-blue-50/20 dark:bg-blue-900/10">
                        <span class="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-bold rounded-full uppercase tracking-wider">Method 3 ★ Best Practice</span>
                        <h4 class="text-lg font-bold text-gray-900 dark:text-white mt-3 mb-2">External Stylesheet</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Linked via a <code>&lt;link&gt;</code> tag pointing to a dedicated <code>.css</code> file. Enables browser caching, modularity, and clean separation of concerns.</p>
                        <pre class="bg-gray-950 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto"><code>&lt;head&gt;
  &lt;link rel="stylesheet" href="styles.css"&gt;
&lt;/head&gt;</code></pre>
                    </div>
                </div>

                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1.2 Basic CSS Syntax &amp; Rule Anatomy</h3>
                <p>
                    Every CSS rule consists of a <strong>selector</strong> and a <strong>declaration block</strong> enclosed in curly braces:
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>/* Anatomy of a CSS Rule */
selector {
  property: value;      /* Declaration 1 */
  property-two: value;  /* Declaration 2 */
}

/* Real-world example */
h1 {
  color: #1e3a8a;       /* Deep navy blue */
  font-size: 32px;
  line-height: 1.25;
}</code></pre>
            </div>
        </section>

        <!-- STEP 2: Selectors -->
        <section id="step2-selectors-deep-dive" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">02.</span>
                Selectors: How You Target Elements
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Selectors determine which HTML elements your styling rules apply to. Mastering combinators, pseudo-classes, and pseudo-elements allows you to write clean, maintainable styles without cluttering HTML with unnecessary helper classes.
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>/* 1. Element Selector: Targets all matching tag names */
p { color: #1f2937; }

/* 2. Class Selector: Targets elements with class="highlight" (reusable) */
.highlight { background-color: #fef08a; }

/* 3. ID Selector: Targets a single unique element with id="header" */
#header { background-color: #1e40af; }

/* 4. Universal Selector: Targets every element on the page */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* 5. Group Selector: Shares rules across multiple selectors */
h1, h2, h3 { font-family: 'Inter', system-ui, sans-serif; }

/* 6. Descendant Selector (space): Any &lt;p&gt; anywhere inside a &lt;div&gt; */
div p { color: #4b5563; }

/* 7. Child Selector (&gt;): Only DIRECT child &lt;p&gt; elements */
div &gt; p { color: #15803d; }

/* 8. Adjacent Sibling (+): The &lt;p&gt; immediately following an &lt;h1&gt; */
h1 + p { font-weight: 600; font-size: 1.125rem; }

/* 9. General Sibling (~): All &lt;p&gt; siblings following an &lt;h1&gt; */
h1 ~ p { color: #6b21a8; }

/* 10. Attribute Selectors: Match based on HTML attributes */
input[type="text"] { border: 1px solid #d1d5db; border-radius: 6px; }
a[target="_blank"] { color: #dc2626; }

/* 11. Pseudo-classes: Match dynamic UI states */
a:hover { color: #ea580c; text-decoration: underline; }
input:focus { outline: 2px solid #2563eb; }
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(2) { background-color: #f3f4f6; }
li:nth-child(odd) { background-color: #fafafa; }

/* 12. Pseudo-elements: Target sub-parts of an element or inject visual accents */
p::first-line { font-weight: bold; font-size: 1.1rem; }
p::before { content: "→ "; color: #3b82f6; }
p::after { content: " ★"; color: #eab308; }</code></pre>

                <div class="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Example — Combining Selectors for Clean UI:</h4>
                    <pre class="bg-gray-950 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto mb-3"><code>&lt;div class="card"&gt;
  &lt;h2&gt;Product Title&lt;/h2&gt;
  &lt;p&gt;First paragraph — acts as a lead summary.&lt;/p&gt;
  &lt;p&gt;Second paragraph — detailed description.&lt;/p&gt;
&lt;/div&gt;</code></pre>
                    <pre class="bg-gray-950 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto"><code>.card h2 { color: #0f766e; }
.card p:first-of-type { font-style: italic; font-size: 1.05rem; }</code></pre>
                </div>
            </div>
        </section>

        <!-- STEP 3: The Box Model -->
        <section id="step3-the-box-model" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">03.</span>
                The Box Model &amp; box-sizing: border-box
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    In CSS, every visible HTML element is rendered as a rectangular box. The box model is composed of four distinct concentric layers:
                </p>

                <div class="my-6 p-8 bg-gradient-to-br from-amber-500/10 via-blue-500/10 to-purple-500/10 border border-gray-300 dark:border-gray-700 rounded-3xl text-center">
                    <div class="inline-block p-6 bg-amber-200/50 dark:bg-amber-900/30 border-2 border-dashed border-amber-600 rounded-2xl">
                        <span class="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">Margin (Space outside border)</span>
                        <div class="p-6 mt-2 bg-yellow-200/50 dark:bg-yellow-900/30 border-2 border-solid border-yellow-600 rounded-xl">
                            <span class="text-xs font-bold uppercase tracking-wider text-yellow-900 dark:text-yellow-200">Border (Border line)</span>
                            <div class="p-6 mt-2 bg-green-200/50 dark:bg-green-900/30 border-2 border-dotted border-green-600 rounded-lg">
                                <span class="text-xs font-bold uppercase tracking-wider text-green-900 dark:text-green-200">Padding (Space inside border around text)</span>
                                <div class="p-6 mt-2 bg-blue-500 text-white font-bold rounded shadow">
                                    Content (Text, Images, Video)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>.box {
  width: 200px;
  height: 100px;
  padding: 20px;          /* Inner space around content */
  border: 5px solid #111; /* Surrounding stroke */
  margin: 30px;           /* External distance pushing away siblings */
}

/* The Essential Modern CSS Reset:
   By default (content-box), width = content only.
   Adding 20px padding + 5px border makes total width = 200 + 40 + 10 = 250px!
   'border-box' locks total computed width to 200px. */
*, *::before, *::after {
  box-sizing: border-box;
}</code></pre>

                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Clockwise Shorthand Notation</h3>
                <p>
                    Margin and padding share the clockwise direction order: <strong>Top → Right → Bottom → Left</strong> (TRBL).
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>/* 4 Values: top | right | bottom | left */
margin: 10px 20px 15px 5px;

/* 2 Values: top/bottom | left/right */
margin: 10px 20px;

/* 1 Value: all 4 sides */
margin: 10px;

/* Individual side overrides */
padding-top: 5px;
padding-right: 15px;</code></pre>
            </div>
        </section>

        <!-- STEP 4: Colors, Units, and Values -->
        <section id="step4-colors-units-values" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">04.</span>
                Colors, Units, and Values
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    CSS offers multiple ways to define color values and responsive length units.
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>.colors {
  color: red;                       /* Named Keyword */
  color: #ff0000;                   /* 6-digit Hexadecimal */
  color: #f00;                      /* 3-digit Shorthand Hex */
  color: rgb(255, 0, 0);            /* RGB (Red, Green, Blue) */
  color: rgba(255, 0, 0, 0.5);      /* RGB + Alpha (50% opacity) */
  color: hsl(0, 100%, 50%);         /* Hue (0-360), Saturation (%), Lightness (%) */
  color: hsla(0, 100%, 50%, 0.5);   /* HSL + Alpha */
}</code></pre>

                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">CSS Length Units Comparison</h3>
                <div class="overflow-x-auto my-6">
                    <table class="w-full text-left border-collapse border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                        <thead class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                            <tr>
                                <th class="p-4 border-b border-gray-200 dark:border-gray-700">Unit</th>
                                <th class="p-4 border-b border-gray-200 dark:border-gray-700">Type</th>
                                <th class="p-4 border-b border-gray-200 dark:border-gray-700">Relative To</th>
                                <th class="p-4 border-b border-gray-200 dark:border-gray-700">Practical Example</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                            <tr>
                                <td class="p-4 font-mono font-bold text-blue-600 dark:text-blue-400">px</td>
                                <td class="p-4">Absolute</td>
                                <td class="p-4">Screen pixels</td>
                                <td class="p-4 font-mono">border: 1px solid #ccc;</td>
                            </tr>
                            <tr>
                                <td class="p-4 font-mono font-bold text-blue-600 dark:text-blue-400">%</td>
                                <td class="p-4">Relative</td>
                                <td class="p-4">Parent container's dimensions</td>
                                <td class="p-4 font-mono">width: 50%;</td>
                            </tr>
                            <tr>
                                <td class="p-4 font-mono font-bold text-blue-600 dark:text-blue-400">em</td>
                                <td class="p-4">Relative</td>
                                <td class="p-4">Direct parent font size (compounds!)</td>
                                <td class="p-4 font-mono">padding: 1.5em;</td>
                            </tr>
                            <tr>
                                <td class="p-4 font-mono font-bold text-blue-600 dark:text-blue-400">rem</td>
                                <td class="p-4">Relative</td>
                                <td class="p-4">Root (&lt;html&gt;) font size (Usually 16px)</td>
                                <td class="p-4 font-mono">font-size: 1.25rem; (20px)</td>
                            </tr>
                            <tr>
                                <td class="p-4 font-mono font-bold text-blue-600 dark:text-blue-400">vw / vh</td>
                                <td class="p-4">Viewport</td>
                                <td class="p-4">1% of browser viewport width / height</td>
                                <td class="p-4 font-mono">min-height: 100vh;</td>
                            </tr>
                            <tr>
                                <td class="p-4 font-mono font-bold text-blue-600 dark:text-blue-400">vmin / vmax</td>
                                <td class="p-4">Viewport</td>
                                <td class="p-4">Smaller / larger of viewport width or height</td>
                                <td class="p-4 font-mono">font-size: 4vmin;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- STEP 5: Typography -->
        <section id="step5-modern-typography" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">05.</span>
                Typography &amp; Custom Web Fonts
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Clean typography forms 90% of web design. CSS gives you complete control over font weights, line rhythm, letter spacing, and text casing.
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1rem;            /* 16px base */
  font-weight: 400;           /* 100 (Thin) to 900 (Black) */
  line-height: 1.6;           /* Relative line height for readable paragraphs */
  letter-spacing: -0.01em;    /* Tighten headings, relax body */
  text-align: left;           /* left | right | center | justify */
  text-transform: capitalize; /* uppercase | lowercase | capitalize */
  text-decoration: none;      /* underline | line-through | none */
}

/* Loading Custom Self-Hosted Web Fonts with @font-face */
@font-face {
  font-family: 'CustomSans';
  src: url('/fonts/custom-sans.woff2') format('woff2'),
       url('/fonts/custom-sans.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap; /* Avoid Flash of Invisible Text (FOIT) */
}

h1 {
  font-family: 'CustomSans', sans-serif;
  font-size: 2.5rem;
  letter-spacing: -0.03em;
}</code></pre>
            </div>
        </section>

        <!-- STEP 6: Backgrounds & Borders -->
        <section id="step6-backgrounds-borders-gradients" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">06.</span>
                Backgrounds, Gradients &amp; Rounded Borders (CSS3)
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    CSS3 introduced high-performance background styling, linear/radial gradients, border radiuses, and depth shadows.
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>.card {
  background-color: #ffffff;
  background-image: url('/assets/pattern.svg');
  background-size: cover;          /* cover | contain | auto | 100% 100% */
  background-position: center;     /* x y coordinate positioning */
  background-repeat: no-repeat;

  border: 1px solid #e5e7eb;
  border-radius: 1rem;             /* 16px rounded corners */
  
  /* box-shadow: x-offset | y-offset | blur-radius | spread-radius | color */
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
              0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* Gradients in CSS3 */
.linear-gradient {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
}

.radial-gradient {
  background: radial-gradient(circle at center, #60a5fa, #1e3a8a);
}

/* Image Overlay with Multi-Background Stacking */
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
              url('/assets/hero.jpg') center/cover no-repeat;
}</code></pre>
            </div>
        </section>

        <!-- STEP 7: Display & Positioning -->
        <section id="step7-display-and-positioning" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">07.</span>
                Display &amp; Positioning (Absolute, Fixed, Sticky)
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Understanding how elements flow into the document and how to position modals, floating buttons, and sticky headers is crucial for every UI engineer.
                </p>

                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">Display Types:</h3>
                <ul class="list-disc pl-6 space-y-2 text-base text-gray-600 dark:text-gray-400">
                    <li><code>display: block;</code> — Starts on a new line and takes 100% available container width (e.g. <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>).</li>
                    <li><code>display: inline;</code> — Flows horizontally with text. Ignores width, height, top/bottom margins (e.g. <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>).</li>
                    <li><code>display: inline-block;</code> — Flows inline with text, but respects custom width, height, padding, and margins.</li>
                    <li><code>display: none;</code> — Completely removes element from DOM rendering and accessibility tree without taking space.</li>
                </ul>

                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-2">CSS Positioning Paradigms:</h3>
                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>/* 1. static (Default): Follows normal page document flow */
.normal { position: static; }

/* 2. relative: Offset from its normal position; creates positioning context for children */
.parent {
  position: relative;
  top: 10px;
  left: 5px;
}

/* 3. absolute: Removed from flow; positioned relative to nearest ancestor with position != static */
.badge {
  position: absolute;
  top: -8px;
  right: -8px;
}

/* 4. fixed: Locked to viewport window; stays permanently visible during scroll */
.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

/* 5. sticky: Scrolls normally until reaching threshold (e.g., top: 0), then sticks! */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 50;
}</code></pre>
            </div>
        </section>

        <!-- STEP 8: Flexbox -->
        <section id="step8-flexbox-mastery" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">08.</span>
                Flexbox: The 1D Layout System
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    <strong>Flexbox (Flexible Box Layout)</strong> is designed for 1-dimensional layouts (either a single row or a single column). It excels at aligning items, distributing available space, and handling dynamic content sizes.
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>.flex-container {
  display: flex;
  flex-direction: row;        /* row | column | row-reverse | column-reverse */
  justify-content: center;    /* Main Axis: flex-start | center | flex-end | space-between | space-around | space-evenly */
  align-items: center;        /* Cross Axis: flex-start | center | flex-end | stretch | baseline */
  flex-wrap: wrap;            /* nowrap | wrap | wrap-reverse */
  gap: 1.5rem;                /* Gap between flex items */
}

/* Child item controls */
.flex-item {
  /* flex: [flex-grow] [flex-shrink] [flex-basis] */
  flex: 1 1 200px;
  align-self: flex-start;     /* Individual item cross-axis alignment override */
}</code></pre>

                <div class="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Real-World Responsive Navbar Example:</h4>
                    <pre class="bg-gray-950 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto"><code>&lt;nav class="navbar"&gt;
  &lt;div class="brand"&gt;OutlineDev&lt;/div&gt;
  &lt;ul class="nav-links"&gt;
    &lt;li&gt;&lt;a href="#courses"&gt;Courses&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#mentors"&gt;Mentors&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#pricing"&gt;Pricing&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
  &lt;button class="btn-primary"&gt;Get Started&lt;/button&gt;
&lt;/nav&gt;</code></pre>
                    <pre class="bg-gray-950 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto mt-2"><code>.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}</code></pre>
                </div>
            </div>
        </section>

        <!-- STEP 9: CSS Grid -->
        <section id="step9-css-grid-mastery" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">09.</span>
                CSS Grid: The 2D Multi-Column Layout Master
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    While Flexbox is 1D (rows or columns), <strong>CSS Grid</strong> is a true 2D layout engine that arranges elements in both rows and columns simultaneously.
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>/* 1. Basic 3-Column Grid using Fractional Units (fr) */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Middle column twice as wide */
  grid-template-rows: auto 1fr auto;
  gap: 24px;
}

/* 2. Responsive Auto-Fitting Gallery (Zero Media Queries!) */
.responsive-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

/* 3. Named Grid Areas — Highly Readable Layouts */
.dashboard-layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  grid-template-columns: 260px 1fr;
  grid-template-rows: 70px 1fr 50px;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }</code></pre>
            </div>
        </section>

        <!-- STEP 10: CSS3 Transitions -->
        <section id="step10-transitions-smooth-ui" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">10.</span>
                CSS3 Transitions for Fluid Hover States
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Transitions let you smoothly interpolate property changes over time rather than jumping abruptly between states.
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>/* Transition Shorthand: property duration timing-function delay */
.button {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  
  /* Smoothly transition background and transform on hover */
  transition: background-color 0.25s ease, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.button:active {
  transform: translateY(0);
}</code></pre>
            </div>
        </section>

        <!-- STEP 11: CSS3 Transforms -->
        <section id="step11-transforms-3d-effects" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">11.</span>
                2D &amp; 3D Transforms (translate, rotate, scale, skew)
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Transforms modify the coordinate space of CSS elements using hardware acceleration without triggering expensive document reflows.
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>.box {
  transform: translate(20px, 10px);  /* Move along X and Y */
  transform: rotate(15deg);          /* Rotate clockwise */
  transform: scale(1.1);             /* Zoom in by 10% */
  transform: skew(10deg, 5deg);      /* Slant */

  /* Chaining multiple transforms */
  transform: translate(10px, -5px) rotate(4deg) scale(1.05);
}

/* 3D Perspective Card Flip Effect */
.card-3d-wrapper {
  perspective: 1000px; /* Establishes 3D depth context */
}

.card-3d {
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.card-3d-wrapper:hover .card-3d {
  transform: rotateY(180deg);
}</code></pre>
            </div>
        </section>

        <!-- STEP 12: CSS3 Keyframe Animations -->
        <section id="step12-keyframes-animations" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">12.</span>
                CSS3 Keyframe Animations (@keyframes)
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    While transitions interpolate between two states on user trigger, <strong>@keyframes</strong> enable continuous, multi-step standalone animations.
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>/* 1. Define Keyframes */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-18px);
  }
}

@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

/* 2. Apply to Element */
/* Shorthand: name duration timing-function delay iteration-count direction fill-mode */
.notification-badge {
  animation: pulseGlow 2s infinite ease-out;
}

.jumping-icon {
  animation: bounce 1s ease-in-out infinite;
}

/* Page load fadeIn */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-banner {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}</code></pre>
            </div>
        </section>

        <!-- STEP 13: Responsive Design & Media Queries -->
        <section id="step13-responsive-media-queries" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">13.</span>
                Responsive Design &amp; Mobile-First Media Queries
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    <strong>Mobile-First Architecture:</strong> Write default CSS for smartphones (0px+), then add <code>@media (min-width: ...)</code> queries to progressively enhance layouts for tablets and wide screens.
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>/* 1. Base Mobile Styles (0px - 767px) */
.container {
  width: 100%;
  padding: 1rem;
}

.nav-links {
  display: none; /* Collapsed mobile drawer */
}

/* 2. Tablet &amp; Small Laptop (min-width: 768px) */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
  .nav-links {
    display: flex;
  }
}

/* 3. Desktop &amp; Wide Monitors (min-width: 1024px) */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem;
  }
}</code></pre>
            </div>
        </section>

        <!-- STEP 14: CSS Custom Properties -->
        <section id="step14-css-custom-properties" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">14.</span>
                CSS Custom Properties (Variables) &amp; Dark Mode
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    CSS Variables (Custom Properties) are dynamic, cascade down the DOM, and can be modified on the fly with JavaScript or media queries.
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>/* 1. Declare Global Design Tokens on :root */
:root {
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --bg-color: #ffffff;
  --text-color: #111827;
  --border-radius: 0.75rem;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* 2. Dark Mode Override using @media (prefers-color-scheme) or class */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #0f172a;
    --text-color: #f8fafc;
    --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
  }
}

/* 3. Usage throughout CSS */
body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

.btn {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
  color: white;
}

.btn:hover {
  background-color: var(--primary-hover);
}</code></pre>
            </div>
        </section>

        <!-- STEP 15: Modern CSS3 Layout Helpers -->
        <section id="step15-modern-css3-helpers" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">15.</span>
                Modern Helpers: clamp(), calc(), :has(), object-fit
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Modern CSS engines offer mathematical functions and parent-aware selectors that eliminate lines of boilerplate JavaScript.
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>/* 1. Fluid Typography with clamp(min, preferred, max) */
/* Scales smoothly between 24px and 48px depending on viewport width */
h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}

/* 2. calc() for Mixed Units */
.sidebar-layout {
  width: calc(100% - 280px);
}

/* 3. min() and max() Boundary Clamping */
.responsive-modal {
  width: min(90vw, 640px);
}

/* 4. aspect-ratio — Lock Video &amp; Image Proportions */
.video-player {
  aspect-ratio: 16 / 9;
  width: 100%;
}

/* 5. object-fit &amp; object-position for Clean Image Cropping */
.avatar {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
}

/* 6. The :has() Parent Selector (CSS Game-Changer!) */
/* Style the card container if it contains an image */
.card:has(img) {
  padding-top: 0;
}

/* Change navbar background if active modal exists */
body:has(.modal-open) {
  overflow: hidden;
}</code></pre>
            </div>
        </section>

        <!-- STEP 16: Complete Project Example -->
        <section id="step16-complete-project" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">16.</span>
                Putting It Together: Full Responsive Layout
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Here is a complete, runnable HTML &amp; CSS blueprint combining custom variables, Flexbox navbars, Grid cards, and keyframe animations into a unified architecture.
                </p>

                <pre class="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;CSS3 Modern Architecture Demo&lt;/title&gt;
  &lt;style&gt;
    :root {
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --bg-surface: #ffffff;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --radius: 12px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f8fafc;
      color: var(--text-main);
      line-height: 1.5;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: var(--bg-surface);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 5rem 1.5rem;
      background: linear-gradient(135deg, var(--primary), #a855f7);
      color: white;
    }

    .hero h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      margin-bottom: 1rem;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.5rem;
      max-width: 1200px;
      margin: -2rem auto 4rem auto;
      padding: 0 1.5rem;
    }

    .card {
      background: var(--bg-surface);
      border-radius: var(--radius);
      padding: 1.75rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.07);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.12);
    }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;nav class="navbar"&gt;
    &lt;strong&gt;OutlineDev&lt;/strong&gt;
    &lt;span&gt;CSS3 Masterclass&lt;/span&gt;
  &lt;/nav&gt;
  &lt;header class="hero"&gt;
    &lt;h1&gt;Modern CSS3 Architecture&lt;/h1&gt;
    &lt;p&gt;Built with CSS Variables, Flexbox, and CSS Grid.&lt;/p&gt;
  &lt;/header&gt;
  &lt;main class="cards-grid"&gt;
    &lt;div class="card"&gt;&lt;h3&gt;01. Flexbox 1D&lt;/h3&gt;&lt;p&gt;Perfect alignment along single row or column axes.&lt;/p&gt;&lt;/div&gt;
    &lt;div class="card"&gt;&lt;h3&gt;02. CSS Grid 2D&lt;/h3&gt;&lt;p&gt;Responsive multi-column galleries with auto-fit.&lt;/p&gt;&lt;/div&gt;
    &lt;div class="card"&gt;&lt;h3&gt;03. Custom Tokens&lt;/h3&gt;&lt;p&gt;Dynamic variables powering dark mode theming.&lt;/p&gt;&lt;/div&gt;
  &lt;/main&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            </div>
        </section>

        <!-- STEP 17: Practice Homework & Coding Challenges -->
        <section id="step17-practice-challenges" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-400">17.</span>
                Interactive Homework &amp; Coding Challenges
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-8">
                <p>
                    Test your understanding with these three real-world frontend challenges.
                </p>

                <!-- Challenge 1 -->
                <div class="p-8 bg-white dark:bg-gray-900 border-2 border-blue-500/30 rounded-3xl shadow-lg">
                    <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">Challenge 1</span>
                    <h3 class="text-2xl font-black text-gray-900 dark:text-white mt-3 mb-2">Build a Centered Modal with Pure CSS</h3>
                    <p class="text-base text-gray-600 dark:text-gray-400 mb-4">
                        <strong>Task:</strong> Center a <code>400px</code> wide modal card horizontally and vertically on screen using both (A) Flexbox and (B) Absolute positioning with transforms.
                    </p>
                    <details class="group mt-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl cursor-pointer">
                        <summary class="font-bold text-blue-600 dark:text-blue-400 select-none">View Solution &amp; Explanation</summary>
                        <div class="mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-3">
                            <pre class="bg-gray-950 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto"><code>/* Approach A: Modern Flexbox Wrapper */
.modal-overlay {
  position: fixed;
  inset: 0; /* top: 0; right: 0; bottom: 0; left: 0; */
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-card { width: min(90vw, 400px); background: white; border-radius: 12px; }

/* Approach B: Absolute + 50% Translate */
.modal-card-standalone {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(90vw, 400px);
}</code></pre>
                        </div>
                    </details>
                </div>

                <!-- Challenge 2 -->
                <div class="p-8 bg-white dark:bg-gray-900 border-2 border-purple-500/30 rounded-3xl shadow-lg">
                    <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider">Challenge 2</span>
                    <h3 class="text-2xl font-black text-gray-900 dark:text-white mt-3 mb-2">Responsive Image Gallery without Media Queries</h3>
                    <p class="text-base text-gray-600 dark:text-gray-400 mb-4">
                        <strong>Task:</strong> Create a gallery where cards shrink/expand smoothly. On mobile they stack 1 per row, on tablet 2 per row, and on wide screens 4 per row — without using a single <code>@media</code> breakpoint.
                    </p>
                    <details class="group mt-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl cursor-pointer">
                        <summary class="font-bold text-purple-600 dark:text-purple-400 select-none">View Solution &amp; Explanation</summary>
                        <div class="mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-3">
                            <pre class="bg-gray-950 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto"><code>.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
.gallery-item img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 8px;
}</code></pre>
                        </div>
                    </details>
                </div>

                <!-- Challenge 3 -->
                <div class="p-8 bg-white dark:bg-gray-900 border-2 border-green-500/30 rounded-3xl shadow-lg">
                    <span class="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-bold rounded-full uppercase tracking-wider">Challenge 3</span>
                    <h3 class="text-2xl font-black text-gray-900 dark:text-white mt-3 mb-2">Pulsing Call-To-Action (CTA) Button</h3>
                    <p class="text-base text-gray-600 dark:text-gray-400 mb-4">
                        <strong>Task:</strong> Create a primary button that radiates an infinite, expanding glow ring using CSS <code>@keyframes</code> and <code>::after</code> pseudo-element.
                    </p>
                    <details class="group mt-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl cursor-pointer">
                        <summary class="font-bold text-green-600 dark:text-green-400 select-none">View Solution &amp; Explanation</summary>
                        <div class="mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-3">
                            <pre class="bg-gray-950 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto"><code>.btn-pulse {
  position: relative;
  background: #10b981;
  color: white;
  padding: 0.875rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.btn-pulse::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 2px solid #10b981;
  animation: pulseRing 1.8s cubic-bezier(0.24, 0, 0.38, 1) infinite;
}

@keyframes pulseRing {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}</code></pre>
                        </div>
                    </details>
                </div>

            </div>
        </section>

    </div>
    `
};

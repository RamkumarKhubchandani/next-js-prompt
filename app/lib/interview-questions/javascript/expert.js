export const expertQuestions = [
  {
    id: 'js-54',
    category: 'Security',
    difficulty: 'Expert',
    question: 'XSS vs CSRF: The JS Perspective.',
    answer: `The two most common web attacks.

### 1. Cross-Site Scripting (XSS)
- **Goal:** Run unauthorized JS on your page.
- **Vector:** User inputs, URL params, API responses.
- **Damage:** Steal cookies, localStorage, keylogging.
- **Prevention:**
  - **Sanitization:** Strip \`<script>\` tags (DOMPurify).
  - **CSP:** \`Content-Security-Policy\` headers.
  - **React:** Auto-escapes \`{variable}\`. Never use \`dangerouslySetInnerHTML\`.

### 2. Cross-Site Request Forgery (CSRF)
- **Goal:** Trick user's browser into sending a request to your API (e.g., "Transfer Money").
- **Vector:** Hidden forms on malicious sites. Browser auto-sends cookies.
- **Prevention:**
  - **SameSite Cookies:** \`Set-Cookie: SameSite=Strict\`.
  - **CSRF Tokens:** Hidden value in form that 3rd party sites can't guess.`,
    codeExample: `// XSS Vulnerability
document.body.innerHTML = urlParam; // Atacker sends "?q=<script>steal()</script>"

// XSS Defense (React)
<div>{urlParam}</div> // React renders "<script>..." as text literal.`
  },
  {
    id: 'js-55',
    category: 'Performance',
    difficulty: 'Expert',
    question: 'What is Layout Thrashing?',
    answer: `**The "Read-Write" Violation.**
Browsers are lazy. They want to batch layout calculations.
Thrashing happens when you force the browser to calculate layout *synchronously* repeatedly.

### The Problem Pattern:
1. **Write:** You change a style (\`width = '10px'\`) -> Invalidate Layout.
2. **Read:** You ask for geometry (\`clientWidth\`) -> Force Layout Calc immediately.
3. **Loop:** Doing this inside a \`forEach\` loop causes N layout calculations per frame.

### The Fix: Batching
1. Read all values first.
2. Write all values second.
Or use \`FastDom\` library / \`requestAnimationFrame\`.`,
    codeExample: `// --- BAD (Thrashing) ---
divs.forEach(div => {
  const width = div.offsetWidth; // Read (Forces Calc)
  div.style.width = (width * 2) + 'px'; // Write (Invalidates)
});

// --- GOOD (Batching) ---
const widths = divs.map(div => div.offsetWidth); // Phase 1: All Reads
divs.forEach((div, i) => {
  div.style.width = (widths[i] * 2) + 'px'; // Phase 2: All Writes
});`
  },
  {
    id: 'js-64',
    category: 'Security',
    difficulty: 'Expert',
    question: 'What is Prototype Pollution?',
    answer: `A vulnerability where an attacker modifies the base \`Object.prototype\`.

### Mechanism
If you blindly merge JSON input into an object using a recursive merge function:
\`merge(target, source)\`

An attacker sends: \`{ "__proto__": { "isAdmin": true } }\`.
The merge function does: \`target["__proto__"]["isAdmin"] = true\`.
Suddenly, **every object in your system** has \`obj.isAdmin === true\`.

### Defense
1. **Validation:** Ban keys like \`__proto__\`, \`constructor\`, \`prototype\`.
2. **Safe Objects:** Use \`Object.create(null)\` (No prototype).
3. **Freeze:** \`Object.freeze(Object.prototype)\` (Draconian but effective).`,
    codeExample: `// Vulnerable Merge
function merge(target, source) {
  for (let key in source) {
    if (typeof source[key] === 'object') {
      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}
// Malicious Payload
const payload = JSON.parse('{"__proto__": {"hacked": true}}');
merge({}, payload);
console.log({}.hacked); // true!`
  },
  {
    id: 'js-65',
    category: 'Performance',
    difficulty: 'Expert',
    question: 'How to detect Memory Leaks?',
    answer: `Memory Leaks happen when you hold references to objects you no longer need, preventing Garbage Collection.

### Top Causes
1. **Detached DOM Elements:** Removing a \`<div>\` from document, but keeping a JS variable pointing to it.
2. **Global Variables:** Accidental assignment to \`window\`.
3. **Closures:** Holding huge scopes in event listeners.
4. **Timers:** \`setInterval\` that never stops.

### Debugging (Chrome DevTools)
1. **Heap Snapshot:** Take a snapshot. Do the action. Take another. Filter by "Objects allocated between snapshots".
2. **Allocation Timeline:** Look for "Blue bars" (allocations) that don't become "Grey bars" (freed).`,
    codeExample: `// Detached DOM Leak
let detachedNodes = [];

function createLeak() {
  // Create massive list
  const ul = document.createElement('ul');
  for (let i = 0; i < 10000; i++) {
    const li = document.createElement('li');
    ul.appendChild(li);
  }
  // Store reference in global array
  detachedNodes.push(ul); 
  // Even if we don't append ul to body, it lives in RAM forever!
}`
  },
  {
    id: 'js-69',
    category: 'Performance',
    difficulty: 'Hard',
    question: 'Why is `requestIdleCallback` useful?',
    answer: `**"Do this only if you aren't busy."**
Most user analytics/logging code reduces FPS (Frames Per Second).
\`requestIdleCallback\` schedules work for the browser's **Idle Periods** (time between frames), ensuring you never block the main interaction.

It provides a \`deadline.timeRemaining()\` API so you can pause your work if the browser needs to draw a new frame suddenly.`,
    codeExample: `requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    process(tasks.pop());
  }
  
  if (tasks.length > 0) {
    // Schedule rest for next idle frame
    requestIdleCallback(processTasks);
  }
}, { timeout: 2000 }); // Run anyway after 2s`
  },
  {
    id: 'js-73',
    category: 'Internals',
    difficulty: 'Expert',
    question: 'What is JIT (Just-In-Time) Compilation?',
    answer: `V8's secret sauce. JS is not just Interpreted.

### 1. Ignition (Interpreter)
Runs your code immediately (bytecode). It's fast to start but slow to execute.

### 2. TurboFan (Optimizing Compiler)
It watches your code run.
- "This function \`add(a,b)\` is always called with Integers."
- "I will compile it to **Machine Code** for Integers (super fast)."

### De-Optimization (The Bailout)
If you suddenly call \`add("hello", 2)\` (String + Number), TurboFan says "My assumption was wrong!", throws away the machine code, and goes back to slow Bytecode interpretation.
**Lesson:** Keep types consistent!`,
    codeExample: null
  },
  {
    id: 'js-74',
    category: 'Internals',
    difficulty: 'Expert',
    question: 'Explain "Boxing" and "Unboxing".',
    answer: `Primitives (\`"hello"\`, \`2\`) are lightweight. They don't have methods.

**Boxing:**
When you call \`"hello".toUpperCase()\`, JS momentarily creates a \`String\` **Object** wrapper around the primitive so it can access the method.

**Unboxing:**
The result is returned and the object is garbage collected immediately.

**Perf Tip:**
Excessive boxing (in tight loops) generates tons of garbage.`,
    codeExample: null
  },
  {
    id: 'js-78',
    category: 'Security',
    difficulty: 'Expert',
    question: 'What is CSP (Content Security Policy)?',
    answer: `**The "Firewall" for your Browser.**
An HTTP Header that whitelists valid sources of executable code/data.

### Scenarios
1. **Prevent XSS:** "Only allow scripts from \`self\` (my domain). Block all inline scripts (\`<script>...\</script>\`)."
2. **Prevent Clickjacking:** "Only allow my site to be embedded in an iframe on my own domain (\`frame-ancestors\`)."

**Header Example:**
\`Content-Security-Policy: output-src 'self'; script-src 'self' https://stats.google.com;\``,
    codeExample: null
  },
  {
    id: 'js-79',
    category: 'Security',
    difficulty: 'Expert',
    question: 'How to securely store JWT tokens?',
    answer: `Where do you put the Access Token?

### 1. LocalStorage (Easy but Unsafe)
- XSS Warning. Any script can read \`localStorage.getItem('token')\`.

### 2. HttpOnly Cookie (Best Practice)
- **HttpOnly:** JS cannot read it. XSS is mitigated (attacker can't steal the token).
- **Secure:** Only sent over HTTPS.
- **SameSite:** Mitigates CSRF.

**Refreshes:**
Store logic: "Access Token in Memory (Variable)" -> "Refresh Token in HttpOnly Cookie".
When Access Token expires, call \`/refresh\` endpoint (cookie sent auto) to get new Access Token.`,
    codeExample: null
  },
  {
    id: 'js-80',
    category: 'Advanced',
    difficulty: 'Expert',
    question: 'What is a Service Worker?',
    answer: `A script that runs in the background, separate from a web page.

### Key Features
1. **Interceptor:** It sits between your App and the Network. It can intercept requests and serve cached assets (Offline Mode).
2. **Push Notifications:** Handles push events even if the tab is closed.
3. **Background Sync:** Delays actions until the user has connectivity.

**Lifecycle:** unregistered -> installing -> activated -> redundant.`,
    codeExample: `self.addEventListener('fetch', event => {
  // If offline, serve from cache
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});`
  },
  {
    id: 'js-81',
    category: 'Advanced',
    difficulty: 'Hard',
    question: 'Service Worker vs Web Worker?',
    answer: `**Both run in separate threads, but have different jobs.**

### Web Worker
- **Purpose:** Heavy computation (Number crunching, Image processing).
- **Lifespan:** Tied to the Tab. If you close the tab, it dies.
- **Access:** No DOM access.

### Service Worker
- **Purpose:** Network Proxy & Caching (PWA).
- **Lifespan:** Persistent. Lives even after the tab is closed.
- **Access:** No DOM access. Can access Cache Storage & IndexedDB.`,
    codeExample: null
  },
  {
    id: 'js-82',
    category: 'Advanced',
    difficulty: 'Medium',
    question: 'What constitutes a PWA (Progressive Web App)?',
    answer: `A website that behaves like a native app.

### The 3 Pillars
1. **HTTPS:** Security is non-negotiable.
2. **Manifest File (manifest.json):** Defines App Name, Icons, and "Standalone" display mode (removes browser URL bar).
3. **Service Worker:** Enables Offline capabilities and Caching strategy.

**Result:** Installable on Home Screen, works offline, feels native.`,
    codeExample: null
  },
  {
    id: 'js-83',
    category: 'Performance',
    difficulty: 'Expert',
    question: 'Explain the RAIL Model.',
    answer: `Google's user-centric performance model.

1. ** Response(< 50ms):** Acknowledge user input immediately(click state).
2. ** Animation(< 16ms):** Produce a frame every 16ms(60fps).Dragging, scrolling.
3. ** Idle(> 50ms):** Use idle time to load non - critical work.
4. ** Load(< 5s):** Get the page interactive on 3G networks reasonably fast.`,
    codeExample: null
  },
  {
    id: 'js-84',
    category: 'Performance',
    difficulty: 'Expert',
    question: 'What is LCP (Largest Contentful Paint)?',
    answer: `** Core Web Vital.**
  It measures loading performance based on ** user perception **.
"When did the biggest thing on the screen (Hero Image or H1 Title) appear?"

### Optimization Targets
  - ** Good:** < 2.5s
  - ** Poor:** > 4.0s

### Fixes
1. ** Preload:** \`<link rel="preload" href="hero.jpg">\`.
2. **No Lazy Load:** Do NOT lazy load images visible above the fold.
3. **Server Timing:** Improve backend TTFB (Time to First Byte).`,
  codeExample: null
  },
{
  id: 'js-85',
    category: 'Performance',
      difficulty: 'Expert',
        question: 'What is "Hydration"?',
          answer: `**SSR (Server Side Rendering) hand-off.**

1. **SSR:** Server sends full HTML. User sees content fast.
2. **Hydration:** Client JS loads, executes, and "attaches" event listeners to that existing HTML.

### The "Uncanny Valley"
Between Step 1 and 2, the button is on the screen, but it **doesn't click**.
This period is the **Hydration Gap**.

**Modern Fixes:**
- **Partial Hydration (Islands):** Only hydrate the interactive parts (Header, Buy Button), leave the Blog Text as static HTML.
- **Resumability (Qwik):** No hydration at all. Serialize event listeners.`,
            codeExample: null
},
];

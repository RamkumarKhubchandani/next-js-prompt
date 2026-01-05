export const day20 = {
  day: 20,
  title: "Day 20: Web Security (XSS, CSRF, Cookies, and Safe Rendering)",
  intro: "Security is architecture. Today you’ll learn the two biggest web attack classes (XSS + CSRF), how cookies really work, and the practical defenses senior engineers use.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 20: Security. The web is hostile. If you use `innerHTML` with user input, you are inviting attackers."
      },
      {
        type: "talk",
        message: "This is called XSS (Cross Site Scripting). Let's fix a vulnerability right now."
      },
      {
        type: "challenge",
        instruction: "Defend against XSS. The code below takes a user comment and puts it into the DOM. Because it uses `.innerHTML`, the malicious image tag executes code. Change it to use `.textContent` or `.innerText` so the browser treats it as plain text.",
        buggyCode: `const userInput = "<img src='x' onerror='console.log(\"Stole your cookies!\")'>";
const div = document.createElement('div');

// ❌ DANGER: Interprets as HTML
div.innerHTML = userInput;

console.log("DOM updated.");
// In a real browser, the console would now show the stolen message.`,
        solutionCode: `const userInput = "<img src='x' onerror='console.log(\"Stole your cookies!\")'>";
const div = document.createElement('div');

// ✅ SAFE: Interprets as Text
div.textContent = userInput;

console.log("DOM updated safely.");`,
        verifyOutput: "DOM updated safely.",
        verifyCode: ".textContent",
        successMessage: "Secure! `textContent` automatically escapes HTML characters. Never use `innerHTML` unless you absolutely trust the source (or use a sanitizer library).",
        hint: "Replace `div.innerHTML = userInput` with `div.textContent = userInput`."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The Rule</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
If you accept user input, you must decide how it is treated: as <span class="text-yellow-600 dark:text-yellow-400 font-bold">text</span> or as <span class="text-yellow-600 dark:text-yellow-400 font-bold">HTML</span>.
Most security incidents happen when code treats untrusted input as HTML/JS.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The Hacker's Mindset</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Security isn't about "patching bugs". It's about thinking like a thief.
A hacker looks at your input field and thinks: <em>"Can I make this execute code instead of just displaying text?"</em>
</p>
<div class="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-200 dark:border-red-500/30 mb-8">
  <h4 class="font-bold text-red-700 dark:text-red-300 mb-2">The Golden Rule of Web Security</h4>
  <p class="text-sm text-red-800 dark:text-red-200">
    <strong>Never trust user input.</strong> Treat every input as if it contains a bomb (malicious script) until you have disarmed it (sanitization/escaping).
  </p>
</div>

<div class="mb-8 p-5 rounded-xl border border-purple-500/30 bg-purple-500/5">
  <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
    <span class="text-xl">⚔️</span> War Story: The Samy Worm (2005)
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    Samy Kamkar found that MySpace allowed HTML in profile bios but blocked <code>&lt;script&gt;</code> tags. He bypassed it by putting JS inside CSS tags (<code>background: java\nscript...</code>).
  </p>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    <strong>The Payload:</strong> Anyone who viewed Samy's profile automatically added Samy as a friend and updated <em>their own</em> profile to say "but most of all, Samy is my hero."
  </p>
  <p class="text-xs text-purple-800 dark:text-purple-200 font-bold">
    Result: 1 million infections in 20 hours. MySpace went offline. This is why we sanitize *everything*.
  </p>
</div>

<div class="mb-8 p-5 rounded-xl border border-blue-500/30 bg-blue-500/5">
  <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
    <span class="text-xl">🏛️</span> Architect's Note: Liability & Compliance
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200">
    Security isn't just about code; it's about money. A single XSS vulnerability can violate GDPR/CCPA if it leaks user data.
    <strong>The fine? Up to 4% of global revenue.</strong>
    Sanitizing inputs is the cheapest insurance policy you will ever buy.
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) XSS (Cross-Site Scripting)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">XSS happens when attacker-controlled content becomes executable code in your page.</p>
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600 mb-6 font-mono text-sm">
  <div class="mb-2 text-gray-500">What you expect:</div>
  <div class="text-green-600 dark:text-green-400 mb-4">"Hello World"</div>
  
  <div class="mb-2 text-gray-500">What the hacker sends:</div>
  <div class="text-red-600 dark:text-red-400">&lt;img src=x onerror=stealCookies()&gt;</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) CSRF (Cross-Site Request Forgery)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
CSRF happens when the browser automatically includes cookies on a request and an attacker tricks a user into sending that request.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Practical Defenses</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6 bg-white dark:bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">XSS</span>: escape output, avoid innerHTML, sanitize HTML if needed, use CSP.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">CSRF</span>: SameSite cookies, CSRF tokens, verify Origin/Referer on state-changing requests.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Cookies</span>: use HttpOnly + Secure + SameSite where possible.</li>
</ul>
            `,
  predictions: [
    {
      prompt: "Which is safest for displaying user text in the DOM?",
      options: [
        "innerHTML",
        "textContent",
        "document.write",
        "eval"
      ],
      correctIndex: 1,
      explanation: "textContent treats input as text, not executable HTML/JS."
    },
    {
      prompt: "CSRF works mainly because…",
      options: [
        "the attacker can read your cookies",
        "the browser automatically sends cookies with requests",
        "CORS is disabled",
        "Promises are async"
      ],
      correctIndex: 1,
      explanation: "CSRF relies on automatic credential inclusion (cookies) on cross-site requests."
    }
  ],
  checkpoints: [
    {
      prompt: "What does HttpOnly do?",
      options: [
        "Encrypts cookies",
        "Prevents JavaScript from reading cookies",
        "Prevents CSRF completely",
        "Makes cookies permanent"
      ],
      correctIndex: 1,
      explanation: "HttpOnly prevents access via document.cookie, reducing the impact of XSS stealing session tokens."
    },
    {
      prompt: "Which is a strong CSRF mitigation for cookie-based auth?",
      options: [
        "SameSite cookies + CSRF token",
        "localStorage tokens",
        "console.log",
        "minify JS"
      ],
      correctIndex: 0,
      explanation: "SameSite reduces cross-site cookie sending; CSRF tokens add server-side verification."
    }
  ],
  labSteps: [
    {
      id: "d20-step-1",
      title: "Unsafe rendering (innerHTML) vs safe rendering (textContent)",
      subtitle: "Treat user input as text",
      teacherNote: "We will not execute anything harmful. The point is to learn which APIs treat input as code.",
      bugCode: `console.clear();

const userComment = "<b>Hello</b> <img src=x onerror=\"console.log('xss')\">";

const el = document.createElement("div");
// BUG: this treats user input as HTML
el.innerHTML = userComment;
document.body.appendChild(el);

console.log("rendered with innerHTML");`,
      bugFocus: {
        fromLine: 6,
        toLine: 8
      },
      fixCode: `console.clear();

const userComment = "<b>Hello</b> <img src=x onerror=\"console.log('xss')\">";

const el = document.createElement("div");
// FIX: treat it as text
el.textContent = userComment;
document.body.appendChild(el);

console.log("rendered with textContent");`,
      fixFocus: {
        fromLine: 6,
        toLine: 8
      },
      whatToNotice: [
        "innerHTML interprets input as HTML (dangerous with untrusted input).",
        "textContent renders raw text safely."
      ]
    },
    {
      id: "d20-step-2",
      title: "Sanitization concept (why it exists)",
      subtitle: "If you must render HTML, sanitize it",
      teacherNote: "We’ll simulate sanitization by stripping tags (real apps should use a real sanitizer).",
      bugCode: `console.clear();

const userContent = "<script>alert('hack')</script><b>Hi</b>";
// BUG: blindly rendering HTML
const el = document.createElement("div");
el.innerHTML = userContent;
document.body.appendChild(el);`,
      bugFocus: {
        fromLine: 4,
        toLine: 7
      },
      fixCode: `console.clear();

const userContent = "<script>alert('hack')</script><b>Hi</b>";

// FIX (demo): strip tags (real apps: DOMPurify or server-side sanitizer)
const stripTags = (html) => html.replace(/<[^>]*>/g, "");

const el = document.createElement("div");
el.textContent = stripTags(userContent);
document.body.appendChild(el);
console.log("sanitized text:", el.textContent);`,
      fixFocus: {
        fromLine: 5,
        toLine: 10
      },
      whatToNotice: [
        "Sanitization is required only when you intentionally allow some HTML.",
        "The safest default is escaping (text), not HTML rendering."
      ]
    }
  ],
  code: `// Example: Sanitization
import DOMPurify from 'dompurify';

const userContent = "<script>alert('Hack')</script>Hello";
const clean = DOMPurify.sanitize(userContent);
// Result: "Hello"`,
  comparison: {
    junior: `// ❌ Vulnerable to XSS
div.innerHTML = userComment; 
// If comment has <script>, it runs!`,
    senior: `// ✅ Safe Rendering
div.textContent = userComment;
// Browsers treats it as text, not code.

// Or in React:
// {userComment} (Auto-escaped)`
  },
  interview: {
    questions: [
      {
        q: "How to prevent XSS?",
        a: "Never use `innerHTML` with user input. Use libraries like DOMPurify. Use Content Security Policy (CSP) headers."
      },
      {
        q: "What is an HttpOnly cookie?",
        a: "A cookie that cannot be accessed by JavaScript (document.cookie). It prevents XSS attacks from stealing session tokens."
      },
      {
        q: "What is CORS?",
        a: "Cross-Origin Resource Sharing. Browser mechanism to allow/block requests from different domains."
      }
    ]
  },
  recap: {
    takeaways: [
      "XSS happens when untrusted input becomes executable code in the browser.",
      "CSRF happens when cookies are automatically sent and requests aren’t verified.",
      "Use textContent/escaping by default; sanitize only when you intentionally render HTML.",
      "Use HttpOnly/Secure/SameSite cookies and CSRF tokens for robust defenses."
    ],
    commonMistakes: [
      "Using innerHTML with user-controlled input.",
      "Storing session tokens in places accessible to JS without understanding XSS risk.",
      "Skipping CSRF protection for cookie-based auth.",
      "Thinking CORS is a security boundary for your server (it’s a browser policy)."
    ],
    nextActions: [
      "Search your codebase for innerHTML/dangerouslySetInnerHTML and audit each usage.",
      "Add a CSRF strategy (SameSite + token) for state-changing endpoints.",
      "Add CSP headers (even a basic policy) to reduce XSS impact."
    ]
  }
};

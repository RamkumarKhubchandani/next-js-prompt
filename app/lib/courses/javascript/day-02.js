export const day02 = {
  day: 2,
  title: "Day 2: Scope Mastery (Lexical, Block, Function) + Modules",
  intro: "Scope is where names live. Today you’ll learn to *predict* where every variable is resolved, why some code prints undefined, why some code crashes (TDZ), and how modules eliminate global pollution.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) What You’re Building Today</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
You are building a “scope radar”. A senior dev can read code and instantly predict:
<span class="text-yellow-600 dark:text-yellow-400 font-bold">which binding is used</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">when it becomes usable</span>, and <span class="text-yellow-600 dark:text-yellow-400 font-bold">why a ReferenceError happens</span>.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-5 rounded-xl border border-gray-200 dark:border-dark-600 mb-8">
  <p class="text-gray-700 dark:text-light-200">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Rule of the day:</span> JavaScript is <span class="text-yellow-600 dark:text-yellow-400 font-bold">lexically scoped</span>.
    The engine decides scope based on where code is written (structure), not where it’s called from (time).
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Lexical Scope (Static Scope)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Lexical means: “defined by the code’s nesting.” The engine can figure out where names resolve before executing a single line.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-green-300 mb-6 overflow-x-auto shadow-inner">
<pre>
Global Scope
│  const hero = "Batman";
│
└──▶ Function outer()
 │  const sidekick = "Robin";
 │
 └──▶ Function inner()
      │  // Can access 'hero' and 'sidekick'
      │  console.log(hero, sidekick);
</pre>
</div>

<details class="mb-8 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-gray-800 dark:text-light-100">Teacher checkpoint: “Where does it look?”</summary>
  <div class="mt-3 text-gray-600 dark:text-light-300 space-y-3">
    <p>
      When a name is referenced, JS searches <span class="text-yellow-600 dark:text-yellow-400 font-bold">local → outer → global</span>.
      It never searches “down” into inner scopes.
    </p>
  </div>
</details>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Shadowing (The Silent Bug Factory)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Shadowing is when an inner scope declares the same name as an outer one. This is normal… until it hides the value you expected.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto mb-8">
<pre><code>
const level = "global";

function demo() {
  const level = "local"; // shadows global
  return level;
}

console.log(demo()); // "local"
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Block Scope vs Function Scope</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Blocks are anything wrapped in <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">{ }</code> (if/for/while/try blocks).
<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">let</code>/<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">const</code> are block-scoped.
<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">var</code> is function-scoped (legacy).
</p>

<div class="grid md:grid-cols-3 gap-4 mb-8 text-sm">
  <div class="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4">
    <p class="font-bold text-gray-900 dark:text-white mb-2">const</p>
    <ul class="list-disc list-inside text-gray-600 dark:text-light-300 space-y-1">
      <li>Block-scoped</li>
      <li>Must initialize</li>
      <li>No reassignment</li>
    </ul>
  </div>
  <div class="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4">
    <p class="font-bold text-gray-900 dark:text-white mb-2">let</p>
    <ul class="list-disc list-inside text-gray-600 dark:text-light-300 space-y-1">
      <li>Block-scoped</li>
      <li>May initialize later</li>
      <li>Reassignment allowed</li>
    </ul>
  </div>
  <div class="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4">
    <p class="font-bold text-gray-900 dark:text-white mb-2">var</p>
    <ul class="list-disc list-inside text-gray-600 dark:text-light-300 space-y-1">
      <li>Function-scoped</li>
      <li>Hoisted to undefined</li>
      <li>Easy to leak bugs</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) TDZ (Temporal Dead Zone) in Real Life</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
TDZ is how JS protects you from reading an uninitialized binding.
The painful part is: TDZ can happen via <span class="text-yellow-600 dark:text-yellow-400 font-bold">shadowing</span>.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto mb-8">
<pre><code>
let x = 10;
function trap() {
  // console.log(x); // ReferenceError (TDZ) because of the local 'let x' below
  let x = 20;
  return x;
}
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">5) Module Scope (ES Modules) = No More Global Pollution</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Modern JS uses modules. A module has its own top-level scope: variables don’t auto-attach to <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">window</code>.
This prevents “two files accidentally overwrite each other” bugs.
</p>

<div class="grid grid-cols-2 gap-4 mb-6 text-sm text-center">
  <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-3 rounded">
      <span class="block font-bold text-red-600 dark:text-red-400 mb-1">Script (Old)</span>
      Shared Global Namespace
  </div>
  <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-3 rounded">
      <span class="block font-bold text-green-600 dark:text-green-400 mb-1">Module (Modern)</span>
      File‑level scope + explicit imports
  </div>
</div>

<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
  <p class="text-blue-800 dark:text-blue-200">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Pro mental model:</span> a module is a “closure around a file”. Its top-level variables are private unless exported.
  </p>
</div>
            `,
  predictions: [
    {
      prompt: "Predict: What does this print? (Lexical scope test)",
      options: [
        "HACKED",
        "12345",
        "ReferenceError",
        "undefined"
      ],
      correctIndex: 1,
      explanation: "Functions read variables from where they are defined (lexical scope). `getSecret()` closes over the outer `secret`, not the inner one."
    },
    {
      prompt: "Predict: In an `if { ... }` block, which keyword creates a new binding that does NOT leak outside the block?",
      options: [
        "var",
        "let",
        "function",
        "import"
      ],
      correctIndex: 1,
      explanation: "`let` (and `const`) are block-scoped, so the binding exists only inside the block."
    },
    {
      prompt: "Predict: Accessing a `let` before its declaration usually throws… why?",
      options: [
        "Because JS moves `let` declarations to the bottom",
        "Because of TDZ (binding exists but is uninitialized)",
        "Because `let` is slower than `var`",
        "Because strict mode forbids it"
      ],
      correctIndex: 1,
      explanation: "The binding exists for the scope but is uninitialized until the declaration runs. Access during that window throws (TDZ)."
    }
  ],
  checkpoints: [
    {
      prompt: "Scope chain lookup order is…",
      options: [
        "global → local → inner",
        "local → outer → global",
        "outer → local → global",
        "random depending on V8"
      ],
      correctIndex: 1,
      explanation: "JS resolves identifiers by searching the current scope first, then parent scopes up to global. It never searches down."
    },
    {
      prompt: "Which statement about modules is true?",
      options: [
        "Modules share one global namespace like scripts",
        "Modules automatically attach variables to `window`",
        "Modules have their own top-level scope and export/import explicitly",
        "Modules disable closures"
      ],
      correctIndex: 2,
      explanation: "Modules create file-level scope and require explicit exports/imports. This reduces accidental collisions."
    }
  ],
  labSteps: [
    {
      id: "d2-step-1",
      title: "TDZ via shadowing (the 'why did this crash?' moment)",
      subtitle: "Local let shadows outer let",
      teacherNote: "Say the rule first: bindings are created for the whole scope. Then predict: does it log 10 or crash?",
      bugCode: `console.clear();

let x = 10;
function trap() {
  console.log("x is:", x); // Predict: 10 or crash?
  let x = 20;
  return x;
}

trap();`,
      bugFocus: {
        fromLine: 5,
        toLine: 6
      },
      fixCode: `console.clear();

let x = 10;
function trap() {
  // FIX: don't shadow (or move access after init)
  let localX = 20;
  console.log("x is:", x);
  console.log("localX is:", localX);
  return localX;
}

trap();`,
      fixFocus: {
        fromLine: 5,
        toLine: 8
      },
      whatToNotice: [
        "The local `let x` creates a new binding for the entire function body.",
        "Before it’s initialized, that local binding is in TDZ, so `x` access throws."
      ]
    },
    {
      id: "d2-step-2",
      title: "var leakage: when a loop variable becomes a bug",
      subtitle: "var is function-scoped (not block-scoped)",
      teacherNote: "Predict the output. Then explain using: 'one binding vs per-iteration binding'.",
      bugCode: `console.clear();

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("i =", i), 10);
}`,
      bugFocus: {
        fromLine: 3,
        toLine: 5
      },
      fixCode: `console.clear();

// FIX: let creates a fresh binding each iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log("i =", i), 10);
}`,
      fixFocus: {
        fromLine: 4,
        toLine: 6
      },
      whatToNotice: [
        "With var there is one shared `i` for the whole function.",
        "With let, each loop iteration creates a new `i` binding, so closures capture different values."
      ]
    }
  ],
  code: `// Day 2 Live Lab: Scope Radar (Predict first!)
console.clear();

// 1) Lexical scope
const secret = "12345";
function getSecret() { return secret; }
function hacker() {
  const secret = "HACKED";
  console.log("getSecret():", getSecret()); // Predict
}
hacker();

// 2) Block vs function scope
if (true) {
  let blockOnly = "I live in this block";
  // console.log(blockOnly);
}
// console.log(blockOnly); // Predict the error type

// 3) Shadowing + TDZ (uncomment to observe)
// let x = 10;
// function trap() {
//   console.log(x); // TDZ because of local let x
//   let x = 20;
// }
// trap();`,
  comparison: {
    junior: `// ❌ Global Pollution
// script.js
var config = { theme: 'dark' }; // Attached to window.config

function init() {
// Might accidentally overwrite window.config
config = { theme: 'light' }; 
}`,
    senior: `// ✅ Module Scope
// config.js
export const config = { theme: 'dark' }; 
// Not on window. Encapsulated.

// main.js
import { config } from './config.js';
// We know exactly where it came from.`
  },
  interview: {
    questions: [
      {
        q: "What is Lexical Scoping?",
        a: "It means variable access is determined by the physical nesting of functions in the source code. Inner functions can access outer variables."
      },
      {
        q: "Does `import` hoist?",
        a: "Yes. ES Module `import` statements are hoisted to the top. They are static bindings, evaluated before any code runs."
      },
      {
        q: "How do you create a private variable in JS without a Class?",
        a: "Using a Closure or a Block Scope (IIFE pattern)."
      }
    ]
  },
  recap: {
    takeaways: [
      "JavaScript is lexically scoped: resolution depends on where code is written.",
      "Scope chain lookup is local → outer → global (never down).",
      "Shadowing is normal but can hide values and cause TDZ bugs.",
      "Modules create file-level scope and prevent global collisions."
    ],
    commonMistakes: [
      "Assuming a function reads variables from where it’s called (dynamic scope).",
      "Using var in loops and expecting block behavior.",
      "Triggering TDZ by shadowing and accessing before initialization.",
      "Global pollution by attaching things to window."
    ],
    nextActions: [
      "Do the Day 2 Guided Lab and explain why the TDZ version crashes.",
      "Refactor one snippet to avoid shadowing by renaming locals.",
      "Practice: convert a “global config” into a module export/import mental model."
    ]
  }
};

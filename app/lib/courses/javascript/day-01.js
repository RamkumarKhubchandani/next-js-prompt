export const day01 = {
  day: 1,
  title: "Day 1: V8 Architecture, Execution Contexts & Hoisting (For Real)",
  intro: "Today we build the mental model that unlocks JavaScript: compilation, memory creation, execution contexts, and why hoisting feels like magic until you can *see* it.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The Promise of Day 1</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
If you understand execution contexts + hoisting, you stop “guess debugging”.
You’ll be able to look at code and predict: <span class="text-yellow-600 dark:text-yellow-400 font-bold">what exists in memory</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">when it exists</span>, and <span class="text-yellow-600 dark:text-yellow-400 font-bold">why an error happens</span>.
</p>

<details class="mb-8 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-gray-800 dark:text-light-100">Warm‑up Prediction (don’t run yet)</summary>
  <div class="mt-3 text-gray-600 dark:text-light-300 space-y-3">
    <p>What prints, and where does it crash?</p>
    <div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-lg border border-gray-200 dark:border-dark-600 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto"><pre><code>
console.log(a);
sayHi();

var a = 10;
function sayHi() { console.log("hi"); }
    </code></pre></div>
    <p class="text-light-400">Answer: you’ll confirm in the Live Lab below.</p>
  </div>
</details>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Compilation Process (JIT)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
JavaScript is <span class="text-yellow-600 dark:text-yellow-400 font-bold">Just‑In‑Time compiled</span>.
V8 doesn’t naively “read a line and execute it.” It parses, builds an AST, and executes bytecode, then optimizes hot paths.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-blue-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ Source Code ] 
  │
  ▼
[ Parser ] ──▶ [ AST (Abstract Syntax Tree) ]
                  │
                  ▼
          [ Ignition (Interpreter) ]
          (Generates Bytecode)
                  │
  ┌───────────────┴───────────────┐
  ▼                               ▼
[ Execution ]                   [ TurboFan ]
(Run Bytecode)              (Optimizing Compiler)
                                  │
                                  ▼
                          [ Machine Code ]
                          (0101010101...)
</pre>
</div>

<div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600 mb-8">
  <p class="text-gray-700 dark:text-light-200">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Why this matters:</span>
    V8 makes assumptions to go fast. When you violate assumptions, it <span class="text-red-600 dark:text-red-400 font-bold">de-optimizes</span>.
  </p>
  <ul class="list-disc list-inside mt-3 text-sm text-gray-600 dark:text-light-300 space-y-2">
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Stable object shapes</span> are good. Adding random properties later is often bad in hot code.</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Predictable types</span> are good. Flipping from number → string in tight loops forces slower paths.</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Execution Contexts: Two Phases (Memory → Execution)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
When a script (or a function) runs, JS creates an <span class="text-yellow-600 dark:text-yellow-400 font-bold">execution context</span>.
Each context is created in two phases:
</p>

<div class="grid md:grid-cols-2 gap-6 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-brand-primary mb-2">Phase 1: Memory Creation</h4>
    <p class="text-sm text-light-400">The engine scans for declarations.</p>
    <ul class="list-disc list-inside text-sm mt-2 space-y-1">
        <li>Allocates memory for <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">var</code> (sets to undefined).</li>
        <li>Allocates memory for <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">function</code> (stores code).</li>
        <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Code is NOT executed yet.</span></li>
    </ul>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-green-600 dark:text-green-400 mb-2">Phase 2: Execution</h4>
    <p class="text-sm text-light-400">The engine runs line-by-line.</p>
    <ul class="list-disc list-inside text-sm mt-2 space-y-1">
        <li>Assigns values (<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">a = 10</code>).</li>
        <li>Executes function calls.</li>
        <li>This is where "Reference Errors" happen.</li>
    </ul>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) “Hoisting” Is Just Memory Creation</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Hoisting is not a feature. It’s a <span class="text-yellow-600 dark:text-yellow-400 font-bold">side-effect</span> of phase 1.
Different declaration types allocate memory differently:
</p>
<div class="bg-gray-100 dark:bg-dark-900 p-5 rounded-xl border border-gray-200 dark:border-dark-600 mb-6">
  <ul class="list-disc list-inside text-gray-700 dark:text-light-200 space-y-2">
    <li><code class="bg-white dark:bg-dark-800 px-1 rounded">function f(){}</code> → memory holds the whole function (callable).</li>
    <li><code class="bg-white dark:bg-dark-800 px-1 rounded">var x</code> → memory holds <code class="bg-white dark:bg-dark-800 px-1 rounded">undefined</code> (usable but wrong).</li>
    <li><code class="bg-white dark:bg-dark-800 px-1 rounded">let/const</code> → memory is reserved but uninitialized: <span class="text-red-600 dark:text-red-400 font-bold">TDZ</span> (access crashes).</li>
  </ul>
</div>

<details class="mb-8 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-gray-800 dark:text-light-100">TDZ: Why does it exist?</summary>
  <div class="mt-3 text-gray-600 dark:text-light-300 space-y-3">
    <p>
      TDZ exists to prevent you from reading a variable before it’s initialized.
      That sounds strict—but it saves you from subtle bugs where code “works” with <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">undefined</code>.
    </p>
    <p class="text-light-400">
      In other words: TDZ turns “silent wrong output” into a loud error at the exact line.
    </p>
  </div>
</details>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) Visualizing The Call Stack</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">JavaScript is single‑threaded. It uses a stack to track execution.</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto shadow-inner">
<pre>
│                        │
│   [ Execution: fn() ]  │  <-- Active
│ ---------------------- │
│   [ Execution: main ]  │  <-- Paused
│ ---------------------- │
│   [ Global Context  ]  │  <-- Bottom
└────────────────────────┘
    THE CALL STACK
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">5) Engineer’s Drill: Explain These Errors</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Don’t memorize. Explain using “memory phase vs execution phase”.
</p>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto mb-8">
<pre><code>
// A) Why does this print undefined?
console.log(a);
var a = 1;

// B) Why does this crash?
// console.log(b);
let b = 2;

// C) Why does this work?
sayHi();
function sayHi(){ console.log("hi"); }
</code></pre>
</div>

<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
  <p class="text-blue-800 dark:text-blue-200">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Pro tip:</span> if you can narrate what exists in memory at each line, hoisting stops being confusing.
  </p>
</div>
            `,
  predictions: [
    {
      prompt: "Before running the Day 1 lab: What does `console.log(a)` print before `var a = 10`?",
      options: [
        "10",
        "undefined",
        "ReferenceError",
        "null"
      ],
      correctIndex: 1,
      explanation: "`var` is hoisted and initialized to `undefined` during the memory creation phase."
    },
    {
      prompt: "If you uncomment `console.log(funcExpConst)` before `const funcExpConst = ...`, what happens?",
      options: [
        "It prints `undefined`",
        "It prints the function",
        "ReferenceError (TDZ)",
        "TypeError"
      ],
      correctIndex: 2,
      explanation: "`const/let` bindings exist in the scope but are uninitialized until the declaration runs, so accessing them early throws (TDZ)."
    },
    {
      prompt: "Why does calling a `var` function expression early often throw a TypeError (not ReferenceError)?",
      options: [
        "Because `var` does not exist at all before assignment",
        "Because `var` is hoisted to `undefined`, so you call `undefined()`",
        "Because functions can’t be stored in variables",
        "Because V8 blocks it for security reasons"
      ],
      correctIndex: 1,
      explanation: "`var fn` becomes `undefined` in phase 1. Calling it is like `undefined()` which produces `TypeError: fn is not a function`."
    },
    {
      prompt: "In the TDZ shadowing example, why would `console.log(x)` inside `trap()` crash (if uncommented)?",
      options: [
        "Because the outer `x` is deleted",
        "Because the inner `let x` shadows and is in TDZ until initialized",
        "Because functions can’t access globals",
        "Because strict mode forbids it"
      ],
      correctIndex: 1,
      explanation: "The local `let x` creates a new binding for the whole function scope. Before the declaration executes, that local binding is in TDZ, so access throws—even though an outer `x` exists."
    }
  ],
  checkpoints: [
    {
      prompt: "What is hoisting, correctly explained?",
      options: [
        "JavaScript moves your code to the top of the file",
        "Variables become global automatically",
        "Declarations are processed during memory creation, so some bindings exist before execution",
        "It’s a V8-only feature"
      ],
      correctIndex: 2,
      explanation: "The engine doesn’t move text. It creates bindings in memory in phase 1, which makes some identifiers usable earlier (or crash in TDZ)."
    },
    {
      prompt: "Which one is fully callable before its line appears in code?",
      options: [
        "`const f = () => {}`",
        "`let f = function(){}`",
        "`function f(){}`",
        "`var f = () => {}`"
      ],
      correctIndex: 2,
      explanation: "Function declarations allocate the function object during the memory phase. The others depend on assignment happening in the execution phase."
    },
    {
      prompt: "What’s the best mental model for debugging hoisting bugs?",
      options: [
        "Guess and add console.logs everywhere",
        "Track two phases: what’s in memory vs what line is executing",
        "Assume `var` and `let` behave the same",
        "Disable strict mode"
      ],
      correctIndex: 1,
      explanation: "If you can narrate what exists in memory before a line runs, you can predict undefined/TDZ/TypeError instantly."
    }
  ],
  labSteps: [
    {
      id: "d1-step-1",
      title: "Hoisting trap: var looks 'declared' but isn’t 'ready'",
      subtitle: "undefined vs ReferenceError",
      teacherNote: "Your job is to explain the output using the two phases: memory creation vs execution.",
      bugCode: `console.clear();

console.log("a before:", a); // ?
var a = 10;
console.log("a after:", a);`,
      bugFocus: {
        fromLine: 3,
        toLine: 4
      },
      fixCode: `console.clear();

// FIX: don’t rely on hoisting behavior. Initialize before use.
const a = 10;
console.log("a:", a);`,
      fixFocus: {
        fromLine: 4,
        toLine: 5
      },
      whatToNotice: [
        "`var a` creates a binding initialized to undefined during memory phase.",
        "`const/let` create a TDZ—so you must write safer code (initialize before use)."
      ]
    },
    {
      id: "d1-step-2",
      title: "TypeError trap: calling a var function expression too early",
      subtitle: "Why 'fn is not a function' happens",
      teacherNote: "This is a classic interview moment. Say why it’s TypeError, not ReferenceError.",
      bugCode: `console.clear();

// Predict the error type (and why)
fn(); 

var fn = function () {
  console.log("hello");
};`,
      bugFocus: {
        fromLine: 4,
        toLine: 4
      },
      fixCode: `console.clear();

// FIX A: function declaration (callable during memory phase)
sayHi();
function sayHi() {
  console.log("hello");
}

// FIX B: if you use expressions, call after assignment
const fn = () => console.log("hello again");
fn();`,
      fixFocus: {
        fromLine: 3,
        toLine: 12
      },
      whatToNotice: [
        "`var fn` becomes undefined first, so `fn()` is really `undefined()` → TypeError.",
        "Function declarations allocate the function object in the memory phase."
      ]
    },
    {
      id: "d1-step-3",
      title: "Closures + var loop bug (the famous 5,5,5,5,5)",
      subtitle: "Block scope fixes your mental model",
      teacherNote: "Explain what the closure captures in each version.",
      bugCode: `console.clear();

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("i =", i);
  }, 10);
}`,
      bugFocus: {
        fromLine: 3,
        toLine: 7
      },
      fixCode: `console.clear();

// FIX: let creates a new binding per iteration
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log("i =", i);
  }, 10);
}`,
      fixFocus: {
        fromLine: 4,
        toLine: 8
      },
      whatToNotice: [
        "With var, there is one shared i binding; the callbacks run after the loop finishes.",
        "With let, each iteration gets its own i binding, so closures capture the correct value."
      ]
    }
  ],
  code: `// Day 1 Live Lab: Execution Contexts + Hoisting (Predict first!)
console.clear();

// 1) var vs let/const
console.log("1) var hoisting:", a); // undefined
var a = 10;
console.log("a after init:", a); // 10

// 2) function declarations are fully hoisted
sayHi(); // works
function sayHi() { console.log("2) hi from function declaration"); }

// 3) function expressions depend on the variable kind
// console.log(funcExpVar); // undefined (var)
// funcExpVar();            // TypeError: funcExpVar is not a function
var funcExpVar = function () { console.log("3) funcExpVar"); };
funcExpVar();

// console.log(funcExpConst); // ReferenceError (TDZ)
const funcExpConst = () => console.log("4) funcExpConst");
funcExpConst();

// 4) TDZ trap via shadowing
let x = 10;
function trap() {
  // Predict: does this log 10, or crash?
  // console.log(x); // ReferenceError (TDZ) because of the local 'let x' below
  let x = 20;
  return x;
}
console.log("5) trap() returns:", trap());

// 5) Bonus: global this differs (browser vs module)
// In browsers (non-module scripts), top-level 'this' is window.
// In modules, top-level 'this' is undefined.
console.log("6) top-level this:", this);`,
  comparison: {
    junior: `// ❌ The "Old Way" (Hoisting Bugs)
console.log(name); // undefined (Confusing!)
var name = "John";

function loop() {
// var leaks out of the for loop!
for(var i=0; i<5; i++) {
setTimeout(function() {
  // By the time this runs, i is 5
  console.log(i); // 5, 5, 5, 5, 5
}, 100);
}
}
loop();`,
    senior: `// ✅ The "Architect Way" (Safe)
// 1. const/let prevent usage before declaration
const name = "John";

const loop = () => {
// 2. let creates a new binding for each iteration
for(let i=0; i<5; i++) {
setTimeout(() => {
  // Closure captures the correct block-scoped i
  console.log(i); // 0, 1, 2, 3, 4
}, 100);
}
};
loop();`
  },
  interview: {
    questions: [
      {
        q: "Explain the difference between Ignition and TurboFan in V8.",
        a: "Ignition is the interpreter that turns AST into Bytecode quickly. TurboFan is the optimizing compiler that takes hot code (run often) and converts it to highly optimized machine code based on assumptions (like types)."
      },
      {
        q: "What is an execution context, and what are its phases?",
        a: "An execution context is the runtime environment for code execution (global or function). It’s created in a memory-creation phase (hoisting/allocations) and then an execution phase (runs line-by-line)."
      },
      {
        q: "Why does `var` log `undefined` instead of throwing?",
        a: "`var` is hoisted and initialized to `undefined` during memory creation. Accessing it before assignment is legal but often a bug."
      },
      {
        q: "What is the Temporal Dead Zone (TDZ)?",
        a: "The period between entering a scope and the `let/const` declaration being initialized. Accessing the binding in that window throws a ReferenceError."
      },
      {
        q: "What is the Global Execution Context?",
        a: "The default context created when the script loads. In browsers it creates `window` and sets `this` (non-module scripts). In modules, top-level `this` is `undefined`."
      },
      {
        q: "Name 2 common causes of V8 de-optimization.",
        a: "Changing object shapes (adding/removing properties dynamically in hot code) and type instability (same variable frequently switching types) are common triggers."
      }
    ]
  },
  recap: {
    takeaways: [
      "Execution contexts are created in two phases: memory creation → execution.",
      "Hoisting is a side-effect of memory creation (not code moving).",
      "var initializes to undefined; let/const exist but are uninitialized (TDZ).",
      "TypeError vs ReferenceError often tells you what existed in memory."
    ],
    commonMistakes: [
      "Relying on var hoisting (undefined) instead of writing safe initialization order.",
      "Confusing function declarations with function expressions.",
      "Forgetting that shadowing can trigger TDZ crashes.",
      "Debugging output without narrating what exists in memory at each line."
    ],
    nextActions: [
      "Re-run the Day 1 Guided Lab and explain each bug using memory phase vs execution phase.",
      "Rewrite one var-based snippet using const/let and confirm behavior becomes predictable."
    ]
  }
};

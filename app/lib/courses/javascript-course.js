export const jsContent = {javascript: {
    id: 'javascript',
    title: 'JavaScript Mastery: From Zero to Architect',
    description: 'The complete 40-day roadmap to mastering the JavaScript runtime, modern patterns, polyfills, concurrency, real-world utilities, and frontend system design. Updated for 2025.',
    totalDays: 40,
    days: [
        // --- DAY 0: THE PROFESSIONAL BASELINE ---
        {
            day: 0,
            title: 'Day 0: Pro Setup + How to Learn JavaScript Like an Engineer',
            intro: "You don’t need a human teacher—you need a system. Today we set up a pro environment, learn the “predict → run → explain” loop, and build the debugging instincts that make the rest of this roadmap feel unfairly easy.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 Your Day 0 Outcomes (What “Done” Looks Like)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">One reliable JS playground</span>: Browser DevTools + Node.js, so you can test ideas in 5 seconds.</li>
  <li><span class="text-yellow-400 font-bold">A learning loop</span>: <code class="bg-dark-900 px-1 rounded">Predict → Run → Explain → Repeat</code> (this is how humans teach).</li>
  <li><span class="text-yellow-400 font-bold">Debugging fundamentals</span>: breakpoints, stack traces, stepping, and “why is this undefined?” triage.</li>
  <li><span class="text-yellow-400 font-bold">Doc-reading skill</span>: you’ll know how to use MDN + console experiments to confirm what you read.</li>
</ul>

<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-8">
  <p class="text-blue-200">
    <span class="text-yellow-400 font-bold">Mindset shift:</span> You’re not learning “syntax”. You’re learning a runtime. Syntax is just how you talk to the runtime.
  </p>
</div>

<h3 class="text-xl font-bold text-white mb-4">1) Your Two Superpowers: DevTools + Node</h3>
<p class="mb-4 text-light-300">
If you have these two, you can learn anything in JavaScript without waiting for a person to explain it.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-6">
  <div class="bg-dark-800 p-5 rounded-xl border border-dark-600">
    <h4 class="font-bold text-brand-primary mb-2">Browser DevTools (Real World)</h4>
    <ul class="list-disc list-inside text-sm text-light-300 space-y-2">
      <li><span class="text-yellow-400 font-bold">Console</span>: try ideas instantly.</li>
      <li><span class="text-yellow-400 font-bold">Sources</span>: breakpoints + step-through execution.</li>
      <li><span class="text-yellow-400 font-bold">Network</span>: async + caching truth.</li>
      <li><span class="text-yellow-400 font-bold">Performance</span>: where “fast” becomes measurable.</li>
    </ul>
  </div>
  <div class="bg-dark-800 p-5 rounded-xl border border-dark-600">
    <h4 class="font-bold text-green-400 mb-2">Node.js (Pure JS Lab)</h4>
    <ul class="list-disc list-inside text-sm text-light-300 space-y-2">
      <li><span class="text-yellow-400 font-bold">Script execution</span>: run JS without UI noise.</li>
      <li><span class="text-yellow-400 font-bold">Modules</span>: ESM/CommonJS practice.</li>
      <li><span class="text-yellow-400 font-bold">Debugging</span>: Node inspect + stack traces.</li>
      <li><span class="text-yellow-400 font-bold">Repeatability</span>: same code, same output.</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) The “Human Teacher” Loop (Predict → Run → Explain)</h3>
<p class="mb-4 text-light-300">
Here’s the trick: human teachers don’t just show answers—they force you to form a hypothesis.
We’ll simulate that. Every time you see a code snippet:
</p>
<div class="bg-dark-900 p-5 rounded-xl border border-dark-600 mb-6">
  <ol class="list-decimal list-inside space-y-2 text-light-200">
    <li><span class="text-yellow-400 font-bold">Predict</span> what the code prints (don’t run yet).</li>
    <li><span class="text-yellow-400 font-bold">Run</span> it (in the live lab).</li>
    <li><span class="text-yellow-400 font-bold">Explain</span> the result using a runtime concept (scope, hoisting, coercion, event loop, etc.).</li>
    <li><span class="text-yellow-400 font-bold">Mutate</span> one detail and predict again.</li>
  </ol>
</div>

<details class="mb-6 bg-dark-800 border border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-light-100">Checkpoint: How do you know you “understand” something?</summary>
  <div class="mt-3 text-light-300 space-y-3">
    <p>
      You understand it when you can <span class="text-yellow-400 font-bold">predict the output</span> and you can
      <span class="text-yellow-400 font-bold">explain why</span> without saying “because I memorized it”.
    </p>
    <p>
      Memorization fails when code changes. Understanding survives change.
    </p>
  </div>
</details>

<h3 class="text-xl font-bold text-white mb-4">3) Debugging Like a Pro (The 60‑Second Triage)</h3>
<p class="mb-4 text-light-300">
Most JS “bugs” are 4 categories. Use this checklist before panic:
</p>
<div class="grid md:grid-cols-2 gap-6 mb-6">
  <div class="bg-dark-800 p-5 rounded-xl border border-dark-600">
    <h4 class="font-bold text-yellow-400 mb-2">A) Wrong value</h4>
    <ul class="list-disc list-inside text-sm text-light-300 space-y-2">
      <li>Log the variable right before it’s used.</li>
      <li>Check types: <code class="bg-dark-900 px-1 rounded">typeof</code>, <code class="bg-dark-900 px-1 rounded">Array.isArray</code>.</li>
      <li>Print structure: <code class="bg-dark-900 px-1 rounded">console.table</code>, <code class="bg-dark-900 px-1 rounded">console.dir</code>.</li>
    </ul>
  </div>
  <div class="bg-dark-800 p-5 rounded-xl border border-dark-600">
    <h4 class="font-bold text-yellow-400 mb-2">B) Wrong timing</h4>
    <ul class="list-disc list-inside text-sm text-light-300 space-y-2">
      <li>Async code executed later than you think.</li>
      <li>Add logs with timestamps, or log “before/after”.</li>
      <li>Event loop understanding is a multiplier (we’ll master it later).</li>
    </ul>
  </div>
  <div class="bg-dark-800 p-5 rounded-xl border border-dark-600">
    <h4 class="font-bold text-yellow-400 mb-2">C) Wrong scope / undefined</h4>
    <ul class="list-disc list-inside text-sm text-light-300 space-y-2">
      <li>Is this variable declared where you think it is?</li>
      <li>Is it shadowed by an inner <code class="bg-dark-900 px-1 rounded">let</code>/<code class="bg-dark-900 px-1 rounded">const</code>?</li>
      <li>Is it a <span class="text-red-400 font-bold">TDZ</span> issue?</li>
    </ul>
  </div>
  <div class="bg-dark-800 p-5 rounded-xl border border-dark-600">
    <h4 class="font-bold text-yellow-400 mb-2">D) Wrong assumptions</h4>
    <ul class="list-disc list-inside text-sm text-light-300 space-y-2">
      <li>You assumed “this” means something it doesn’t.</li>
      <li>You assumed coercion would be “nice”.</li>
      <li>You assumed objects are “just dictionaries” (they’re not, in V8).</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">4) How to Read JavaScript Docs (MDN Skill)</h3>
<p class="mb-4 text-light-300">
Docs become powerful when you treat them like hypotheses and verify them with experiments.
When you read about a method:
</p>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Copy the example</span> into Console → confirm output.</li>
  <li><span class="text-yellow-400 font-bold">Break it</span> (wrong input types) → see errors and edge cases.</li>
  <li><span class="text-yellow-400 font-bold">Generalize</span> (try similar inputs) → build intuition.</li>
</ul>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 mb-6 font-mono text-xs md:text-sm text-cyan-300 overflow-x-auto shadow-inner">
<pre>
Your learning loop:
Docs → Hypothesis → Experiment → Surprise → Mental Model → Repeat
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">5) Tiny Day‑0 Mission (10 minutes)</h3>
<p class="mb-4 text-light-300">
Run the Live Lab code below, then change <span class="text-yellow-400 font-bold">one</span> thing at a time:
rename a variable, swap <code class="bg-dark-900 px-1 rounded">var</code> for <code class="bg-dark-900 px-1 rounded">let</code>, add a nested block, etc.
Your goal is to practice the loop: predict → run → explain.
</p>
            `,
            predictions: [
                {
                    prompt: "Before you run: What is the output order for the Day 0 timing snippet?",
                    options: [
                        "A → B → C",
                        "A → C → B",
                        "B → A → C",
                        "It’s random / depends on CPU"
                    ],
                    correctIndex: 1,
                    explanation: "Synchronous code runs first: it logs A, schedules the timeout, then logs C. The timeout callback runs later (task queue), so B comes last."
                },
                {
                    prompt: "What does `typeof null` return in JavaScript?",
                    options: ["'null'", "'object'", "'undefined'", "'number'"],
                    correctIndex: 1,
                    explanation: "`typeof null === 'object'` is a historic bug kept for backwards compatibility. The real null-check is `value === null`."
                },
                {
                    prompt: "If you see `Cannot read properties of undefined`, which is the fastest first move?",
                    options: [
                        "Rewrite the function from scratch",
                        "Add `try/catch` around everything",
                        "Log the variable right before access and confirm its shape/type",
                        "Restart the dev server"
                    ],
                    correctIndex: 2,
                    explanation: "Treat it like a forensic moment: log the value before the failing line, confirm whether it’s undefined, and trace where it was supposed to be assigned. Most bugs are wrong value or wrong timing."
                }
            ],
            checkpoints: [
                {
                    prompt: "You want to learn JS fastest without a tutor. Which loop creates real intuition?",
                    options: [
                        "Read → memorize → repeat",
                        "Watch videos at 2× speed",
                        "Predict → run → explain → mutate",
                        "Copy-paste solutions until they work"
                    ],
                    correctIndex: 2,
                    explanation: "Prediction forces active recall. Explanation forces a mental model. Mutation tests whether your model generalizes."
                },
                {
                    prompt: "You have a value that might be an array. What’s the most reliable check?",
                    options: [
                        "`typeof value === 'array'`",
                        "`value instanceof Array` (always reliable across realms)",
                        "`Array.isArray(value)`",
                        "`value.constructor.name === 'Array'`"
                    ],
                    correctIndex: 2,
                    explanation: "`Array.isArray` is the standard, reliable way. `typeof` can’t detect arrays. `instanceof` can fail across iframes/realms."
                },
                {
                    prompt: "Which DevTools feature is the closest to a teacher pointing at the exact line of truth?",
                    options: ["Network tab", "Breakpoints + stepping in Sources", "Application tab", "Lighthouse"],
                    correctIndex: 1,
                    explanation: "Breakpoints let you pause time and inspect reality (scope, call stack, values) line-by-line—exactly how a good teacher debugs live."
                }
            ],
            labSteps: [
                {
                    id: "d0-step-1",
                    title: "Timing: Why does B come last?",
                    subtitle: "Synchronous vs setTimeout(…, 0)",
                    teacherNote: "Before you run, say the output order out loud. Then run. Then explain using: 'sync first, timeout later'.",
                    bugCode: `// BUGGY (your intuition might say B happens immediately)
console.clear();

console.log("A");
setTimeout(() => console.log("B (timeout)"), 0);
console.log("C");`,
                    bugFocus: { fromLine: 4, toLine: 4 },
                    fixCode: `// FIX (mental model): sync runs now, timeout runs later
console.clear();

console.log("A");
setTimeout(() => console.log("B (timeout)"), 0);
console.log("C");

// Explain: the callback is queued as a task. It cannot run until the current call stack is empty.`,
                    fixFocus: { fromLine: 7, toLine: 7 },
                    whatToNotice: [
                        "The '0ms' timeout is not 'instant'—it means 'run later'.",
                        "The call stack must empty before the callback runs."
                    ]
                },
                {
                    id: "d0-step-2",
                    title: "Debugging shape: why is this undefined?",
                    subtitle: "You expected user.meta.plan but it crashes",
                    teacherNote: "This is 80% of real JS bugs. The fix is not magic—it's verifying the shape at the exact line.",
                    bugCode: `console.clear();

const user = { id: 7, name: "Riya", roles: ["student"] };

// Predict: what happens?
console.log("plan:", user.meta.plan);`,
                    bugFocus: { fromLine: 6, toLine: 6 },
                    fixCode: `console.clear();

const user = { id: 7, name: "Riya", roles: ["student"] };

// FIX: verify shape + use safe access
console.log("user:", user);
console.log("plan:", user.meta?.plan ?? "(no plan set)");

// Then decide: should meta exist, or is this optional?`,
                    fixFocus: { fromLine: 6, toLine: 7 },
                    whatToNotice: [
                        "The fix starts with observing reality (log the object).",
                        "Optional chaining + nullish coalescing prevents crashes while you design correct data flow."
                    ]
                }
            ],
            code: `// Day 0 Live Lab: Debugging + "Predict → Run → Explain"
console.clear();

console.log("1) typeof basics:");
console.log(typeof 42, typeof "42", typeof true, typeof undefined, typeof null); // null is a famous JS quirk

console.log("\\n2) console tools:");
const user = { id: 7, name: "Riya", roles: ["student", "builder"], meta: { plan: "JS Mastery" } };
console.table([user]);
console.dir(user, { depth: 5 });

console.log("\\n3) scope surprise:");
let points = 10;
{
  let points = 99; // shadowing
  console.log("Inside block:", points);
}
console.log("Outside block:", points);

console.log("\\n4) timing surprise:");
console.log("A");
setTimeout(() => console.log("B (timeout)"), 0);
console.log("C");

// Mission: Predict the output order, then change the delay and predict again.`,
            comparison: {
                junior: `// ❌ Junior habits (hard to debug, easy to break)
// - random logs
// - unclear data shape
// - mixed responsibilities

var data = {a:1,b:2};
console.log(data);
function run(){
  setTimeout(function(){ console.log("done") }, 0);
  console.log("start");
}
run();`,
                senior: `// ✅ Pro habits (debuggable, explainable)
// - structured logs
// - stable shapes
// - predictable flow

const data = { a: 1, b: 2 };

console.group("run()");
console.table([data]);
console.time("task");

setTimeout(() => {
  console.timeEnd("task");
  console.log("done");
  console.groupEnd();
}, 0);

console.log("start");`
            },
            interview: {
                questions: [
                    { q: "What’s the difference between JavaScript (the language) and the runtime (browser/Node)?", a: "The language is the spec (ECMAScript). The runtime is the environment that executes it and provides extra APIs (DOM/Web APIs in browsers, fs/net in Node), plus an engine like V8." },
                    { q: "What does strict mode do and why does it exist?", a: "It makes JavaScript safer by disabling some silent failures and legacy behaviors (e.g., accidental globals). It helps catch bugs early and makes code more optimizable/predictable." },
                    { q: "What are source maps?", a: "Metadata that maps transformed code (bundled/minified/transpiled) back to original sources, enabling readable debugging in DevTools." },
                    { q: "What’s the difference between ESM and CommonJS?", a: "ESM uses static `import/export` and supports tree-shaking; CommonJS uses dynamic `require/module.exports`. Node supports both with different rules/resolution." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "Learning without a human works when you use a loop: predict → run → explain → mutate.",
                    "DevTools + Node are your two core learning environments.",
                    "Most bugs reduce to wrong value, wrong timing, wrong scope, or wrong assumptions.",
                    "Use structured logging (group/table/time) to debug faster."
                ],
                commonMistakes: [
                    "Running code before predicting the output (kills intuition).",
                    "Using random console.logs instead of verifying data shape at the failing line.",
                    "Assuming setTimeout(…, 0) means “instant”.",
                    "Treating docs as truth without confirming via small experiments."
                ],
                nextActions: [
                    "Run the Day 0 Live Lab and change ONE thing at a time (variable name, let/var, block).",
                    "Open DevTools → Sources → set a breakpoint and step through execution.",
                    "Practice reading stack traces: identify file/line and the call chain."
                ]
            }
        },

        // --- WEEK 1: THE ENGINE ---
        {
            day: 1,
            title: 'Day 1: V8 Architecture, Execution Contexts & Hoisting (For Real)',
            intro: "Today we build the mental model that unlocks JavaScript: compilation, memory creation, execution contexts, and why hoisting feels like magic until you can *see* it.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The Promise of Day 1</h3>
<p class="mb-6 text-light-300">
If you understand execution contexts + hoisting, you stop “guess debugging”.
You’ll be able to look at code and predict: <span class="text-yellow-400 font-bold">what exists in memory</span>, <span class="text-yellow-400 font-bold">when it exists</span>, and <span class="text-yellow-400 font-bold">why an error happens</span>.
</p>

<details class="mb-8 bg-dark-800 border border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-light-100">Warm‑up Prediction (don’t run yet)</summary>
  <div class="mt-3 text-light-300 space-y-3">
    <p>What prints, and where does it crash?</p>
    <div class="bg-dark-900 p-4 rounded-lg border border-dark-600 font-mono text-sm text-light-200 overflow-x-auto"><pre><code>
console.log(a);
sayHi();

var a = 10;
function sayHi() { console.log("hi"); }
    </code></pre></div>
    <p class="text-light-400">Answer: you’ll confirm in the Live Lab below.</p>
  </div>
</details>

<h3 class="text-xl font-bold text-white mb-4">1) The Compilation Process (JIT)</h3>
<p class="mb-4 text-light-300">
JavaScript is <span class="text-yellow-400 font-bold">Just‑In‑Time compiled</span>.
V8 doesn’t naively “read a line and execute it.” It parses, builds an AST, and executes bytecode, then optimizes hot paths.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-blue-300 mb-6 overflow-x-auto shadow-inner">
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

<div class="bg-dark-800 p-5 rounded-xl border border-dark-600 mb-8">
  <p class="text-light-200">
    <span class="text-yellow-400 font-bold">Why this matters:</span>
    V8 makes assumptions to go fast. When you violate assumptions, it <span class="text-red-400 font-bold">de-optimizes</span>.
  </p>
  <ul class="list-disc list-inside mt-3 text-sm text-light-300 space-y-2">
    <li><span class="text-yellow-400 font-bold">Stable object shapes</span> are good. Adding random properties later is often bad in hot code.</li>
    <li><span class="text-yellow-400 font-bold">Predictable types</span> are good. Flipping from number → string in tight loops forces slower paths.</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Execution Contexts: Two Phases (Memory → Execution)</h3>
<p class="mb-4 text-light-300">
When a script (or a function) runs, JS creates an <span class="text-yellow-400 font-bold">execution context</span>.
Each context is created in two phases:
</p>

<div class="grid md:grid-cols-2 gap-6 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-brand-primary mb-2">Phase 1: Memory Creation</h4>
    <p class="text-sm text-light-400">The engine scans for declarations.</p>
    <ul class="list-disc list-inside text-sm mt-2 space-y-1">
        <li>Allocates memory for <code class="bg-dark-900 px-1 rounded">var</code> (sets to undefined).</li>
        <li>Allocates memory for <code class="bg-dark-900 px-1 rounded">function</code> (stores code).</li>
        <li><span class="text-yellow-400 font-bold">Code is NOT executed yet.</span></li>
    </ul>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-green-400 mb-2">Phase 2: Execution</h4>
    <p class="text-sm text-light-400">The engine runs line-by-line.</p>
    <ul class="list-disc list-inside text-sm mt-2 space-y-1">
        <li>Assigns values (<code class="bg-dark-900 px-1 rounded">a = 10</code>).</li>
        <li>Executes function calls.</li>
        <li>This is where "Reference Errors" happen.</li>
    </ul>
</div>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) “Hoisting” Is Just Memory Creation</h3>
<p class="mb-4 text-light-300">
Hoisting is not a feature. It’s a <span class="text-yellow-400 font-bold">side-effect</span> of phase 1.
Different declaration types allocate memory differently:
</p>
<div class="bg-dark-900 p-5 rounded-xl border border-dark-600 mb-6">
  <ul class="list-disc list-inside text-light-200 space-y-2">
    <li><code class="bg-dark-800 px-1 rounded">function f(){}</code> → memory holds the whole function (callable).</li>
    <li><code class="bg-dark-800 px-1 rounded">var x</code> → memory holds <code class="bg-dark-800 px-1 rounded">undefined</code> (usable but wrong).</li>
    <li><code class="bg-dark-800 px-1 rounded">let/const</code> → memory is reserved but uninitialized: <span class="text-red-400 font-bold">TDZ</span> (access crashes).</li>
  </ul>
</div>

<details class="mb-8 bg-dark-800 border border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-light-100">TDZ: Why does it exist?</summary>
  <div class="mt-3 text-light-300 space-y-3">
    <p>
      TDZ exists to prevent you from reading a variable before it’s initialized.
      That sounds strict—but it saves you from subtle bugs where code “works” with <code class="bg-dark-900 px-1 rounded">undefined</code>.
    </p>
    <p class="text-light-400">
      In other words: TDZ turns “silent wrong output” into a loud error at the exact line.
    </p>
  </div>
</details>

<h3 class="text-xl font-bold text-white mb-4">4) Visualizing The Call Stack</h3>
<p class="mb-4 text-light-300">JavaScript is single‑threaded. It uses a stack to track execution.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto shadow-inner">
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

<h3 class="text-xl font-bold text-white mb-4">5) Engineer’s Drill: Explain These Errors</h3>
<p class="mb-4 text-light-300">
Don’t memorize. Explain using “memory phase vs execution phase”.
</p>
<div class="bg-dark-900 p-4 rounded-xl border border-dark-600 font-mono text-sm text-light-200 overflow-x-auto mb-8">
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

<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
  <p class="text-blue-200">
    <span class="text-yellow-400 font-bold">Pro tip:</span> if you can narrate what exists in memory at each line, hoisting stops being confusing.
  </p>
</div>
            `,
            predictions: [
                {
                    prompt: "Before running the Day 1 lab: What does `console.log(a)` print before `var a = 10`?",
                    options: ["10", "undefined", "ReferenceError", "null"],
                    correctIndex: 1,
                    explanation: "`var` is hoisted and initialized to `undefined` during the memory creation phase."
                },
                {
                    prompt: "If you uncomment `console.log(funcExpConst)` before `const funcExpConst = ...`, what happens?",
                    options: ["It prints `undefined`", "It prints the function", "ReferenceError (TDZ)", "TypeError"],
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
                    bugFocus: { fromLine: 3, toLine: 4 },
                    fixCode: `console.clear();

// FIX: don’t rely on hoisting behavior. Initialize before use.
const a = 10;
console.log("a:", a);`,
                    fixFocus: { fromLine: 4, toLine: 5 },
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
                    bugFocus: { fromLine: 4, toLine: 4 },
                    fixCode: `console.clear();

// FIX A: function declaration (callable during memory phase)
sayHi();
function sayHi() {
  console.log("hello");
}

// FIX B: if you use expressions, call after assignment
const fn = () => console.log("hello again");
fn();`,
                    fixFocus: { fromLine: 3, toLine: 12 },
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
                    bugFocus: { fromLine: 3, toLine: 7 },
                    fixCode: `console.clear();

// FIX: let creates a new binding per iteration
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log("i =", i);
  }, 10);
}`,
                    fixFocus: { fromLine: 4, toLine: 8 },
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
                    { q: "Explain the difference between Ignition and TurboFan in V8.", a: "Ignition is the interpreter that turns AST into Bytecode quickly. TurboFan is the optimizing compiler that takes hot code (run often) and converts it to highly optimized machine code based on assumptions (like types)." },
                    { q: "What is an execution context, and what are its phases?", a: "An execution context is the runtime environment for code execution (global or function). It’s created in a memory-creation phase (hoisting/allocations) and then an execution phase (runs line-by-line)." },
                    { q: "Why does `var` log `undefined` instead of throwing?", a: "`var` is hoisted and initialized to `undefined` during memory creation. Accessing it before assignment is legal but often a bug." },
                    { q: "What is the Temporal Dead Zone (TDZ)?", a: "The period between entering a scope and the `let/const` declaration being initialized. Accessing the binding in that window throws a ReferenceError." },
                    { q: "What is the Global Execution Context?", a: "The default context created when the script loads. In browsers it creates `window` and sets `this` (non-module scripts). In modules, top-level `this` is `undefined`." },
                    { q: "Name 2 common causes of V8 de-optimization.", a: "Changing object shapes (adding/removing properties dynamically in hot code) and type instability (same variable frequently switching types) are common triggers." }
                ]
            }
            ,
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
        },
        {
            day: 2,
            title: 'Day 2: Scope Mastery (Lexical, Block, Function) + Modules',
            intro: "Scope is where names live. Today you’ll learn to *predict* where every variable is resolved, why some code prints undefined, why some code crashes (TDZ), and how modules eliminate global pollution.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) What You’re Building Today</h3>
<p class="mb-6 text-light-300">
You are building a “scope radar”. A senior dev can read code and instantly predict:
<span class="text-yellow-400 font-bold">which binding is used</span>, <span class="text-yellow-400 font-bold">when it becomes usable</span>, and <span class="text-yellow-400 font-bold">why a ReferenceError happens</span>.
</p>

<div class="bg-dark-900 p-5 rounded-xl border border-dark-600 mb-8">
  <p class="text-light-200">
    <span class="text-yellow-400 font-bold">Rule of the day:</span> JavaScript is <span class="text-yellow-400 font-bold">lexically scoped</span>.
    The engine decides scope based on where code is written (structure), not where it’s called from (time).
  </p>
</div>

<h3 class="text-xl font-bold text-white mb-4">1) Lexical Scope (Static Scope)</h3>
<p class="mb-4 text-light-300">
Lexical means: “defined by the code’s nesting.” The engine can figure out where names resolve before executing a single line.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-green-300 mb-6 overflow-x-auto shadow-inner">
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

<details class="mb-8 bg-dark-800 border border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-light-100">Teacher checkpoint: “Where does it look?”</summary>
  <div class="mt-3 text-light-300 space-y-3">
    <p>
      When a name is referenced, JS searches <span class="text-yellow-400 font-bold">local → outer → global</span>.
      It never searches “down” into inner scopes.
    </p>
  </div>
</details>

<h3 class="text-xl font-bold text-white mb-4">2) Shadowing (The Silent Bug Factory)</h3>
<p class="mb-4 text-light-300">
Shadowing is when an inner scope declares the same name as an outer one. This is normal… until it hides the value you expected.
</p>

<div class="bg-dark-900 p-4 rounded-xl border border-dark-600 font-mono text-sm text-light-200 overflow-x-auto mb-8">
<pre><code>
const level = "global";

function demo() {
  const level = "local"; // shadows global
  return level;
}

console.log(demo()); // "local"
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Block Scope vs Function Scope</h3>
<p class="mb-4 text-light-300">
Blocks are anything wrapped in <code class="bg-dark-900 px-1 rounded">{ }</code> (if/for/while/try blocks).
<code class="bg-dark-900 px-1 rounded">let</code>/<code class="bg-dark-900 px-1 rounded">const</code> are block-scoped.
<code class="bg-dark-900 px-1 rounded">var</code> is function-scoped (legacy).
</p>

<div class="grid md:grid-cols-3 gap-4 mb-8 text-sm">
  <div class="bg-dark-800 border border-dark-600 rounded-xl p-4">
    <p class="font-bold text-white mb-2">const</p>
    <ul class="list-disc list-inside text-light-300 space-y-1">
      <li>Block-scoped</li>
      <li>Must initialize</li>
      <li>No reassignment</li>
    </ul>
  </div>
  <div class="bg-dark-800 border border-dark-600 rounded-xl p-4">
    <p class="font-bold text-white mb-2">let</p>
    <ul class="list-disc list-inside text-light-300 space-y-1">
      <li>Block-scoped</li>
      <li>May initialize later</li>
      <li>Reassignment allowed</li>
    </ul>
  </div>
  <div class="bg-dark-800 border border-dark-600 rounded-xl p-4">
    <p class="font-bold text-white mb-2">var</p>
    <ul class="list-disc list-inside text-light-300 space-y-1">
      <li>Function-scoped</li>
      <li>Hoisted to undefined</li>
      <li>Easy to leak bugs</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">4) TDZ (Temporal Dead Zone) in Real Life</h3>
<p class="mb-4 text-light-300">
TDZ is how JS protects you from reading an uninitialized binding.
The painful part is: TDZ can happen via <span class="text-yellow-400 font-bold">shadowing</span>.
</p>

<div class="bg-dark-900 p-4 rounded-xl border border-dark-600 font-mono text-sm text-light-200 overflow-x-auto mb-8">
<pre><code>
let x = 10;
function trap() {
  // console.log(x); // ReferenceError (TDZ) because of the local 'let x' below
  let x = 20;
  return x;
}
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">5) Module Scope (ES Modules) = No More Global Pollution</h3>
<p class="mb-4 text-light-300">
Modern JS uses modules. A module has its own top-level scope: variables don’t auto-attach to <code class="bg-dark-900 px-1 rounded">window</code>.
This prevents “two files accidentally overwrite each other” bugs.
</p>

<div class="grid grid-cols-2 gap-4 mb-6 text-sm text-center">
  <div class="bg-red-900/20 border border-red-500/30 p-3 rounded">
      <span class="block font-bold text-red-400 mb-1">Script (Old)</span>
      Shared Global Namespace
  </div>
  <div class="bg-green-900/20 border border-green-500/30 p-3 rounded">
      <span class="block font-bold text-green-400 mb-1">Module (Modern)</span>
      File‑level scope + explicit imports
  </div>
</div>

<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
  <p class="text-blue-200">
    <span class="text-yellow-400 font-bold">Pro mental model:</span> a module is a “closure around a file”. Its top-level variables are private unless exported.
  </p>
</div>
            `,
            predictions: [
                {
                    prompt: "Predict: What does this print? (Lexical scope test)",
                    options: ["HACKED", "12345", "ReferenceError", "undefined"],
                    correctIndex: 1,
                    explanation: "Functions read variables from where they are defined (lexical scope). `getSecret()` closes over the outer `secret`, not the inner one."
                },
                {
                    prompt: "Predict: In an `if { ... }` block, which keyword creates a new binding that does NOT leak outside the block?",
                    options: ["var", "let", "function", "import"],
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
                    bugFocus: { fromLine: 5, toLine: 6 },
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
                    fixFocus: { fromLine: 5, toLine: 8 },
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
                    bugFocus: { fromLine: 3, toLine: 5 },
                    fixCode: `console.clear();

// FIX: let creates a fresh binding each iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log("i =", i), 10);
}`,
                    fixFocus: { fromLine: 4, toLine: 6 },
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
                    { q: "What is Lexical Scoping?", a: "It means variable access is determined by the physical nesting of functions in the source code. Inner functions can access outer variables." },
                    { q: "Does `import` hoist?", a: "Yes. ES Module `import` statements are hoisted to the top. They are static bindings, evaluated before any code runs." },
                    { q: "How do you create a private variable in JS without a Class?", a: "Using a Closure or a Block Scope (IIFE pattern)." }
                ]
            }
            ,
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
        },
        {
            day: 3,
            title: 'Day 3: Closures (Memory, Power, and Footguns)',
            intro: "Closures are how JavaScript gives functions memory. Today you’ll learn to *see* the hidden environment, use it for clean APIs, and avoid accidental memory leaks.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The Human-Tutor Explanation (What a Closure Really Is)</h3>
<p class="mb-6 text-light-300">
A closure is not “a function inside a function”. That’s the shape of the code, not the concept.
A closure is: <span class="text-yellow-400 font-bold">a function + the lexical environment it was created in</span>.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) The Closure “Backpack” (Environment)</h3>
<p class="mb-4 text-light-300">
When you create an inner function, JS stores a hidden link to the variables it needs.
This is why the inner function can still access variables after the outer function returned.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-yellow-300 mb-6 overflow-x-auto shadow-inner">
<pre>
function outer() {
  let data = "Secret";
  return function inner() {
    console.log(data);
  };
}

const fn = outer();
// fn still "remembers" data
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Closures Hold References (Not Copies)</h3>
<p class="mb-4 text-light-300">
Closures capture a <span class="text-yellow-400 font-bold">reference</span> to the variable, so if the variable changes, the closure sees the new value.
</p>

<div class="bg-dark-900 p-4 rounded-xl border border-dark-600 font-mono text-sm text-light-200 overflow-x-auto mb-8">
<pre><code>
function make() {
  let x = 0;
  return () => ++x;
}
const inc = make();
console.log(inc()); // 1
console.log(inc()); // 2
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Closures = The Best Privacy Primitive in JS</h3>
<p class="mb-4 text-light-300">
If you want private state without classes, closures are the cleanest approach.
</p>

<div class="bg-dark-900 p-4 rounded-xl border border-dark-600 font-mono text-sm text-light-200 overflow-x-auto mb-8">
<pre><code>
function createCounter() {
  let count = 0; // private
  return {
    inc() { return ++count; },
    get() { return count; }
  };
}
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">4) Memoization (Cache) — Closures Doing Real Work</h3>
<p class="mb-4 text-light-300">
Memoization means caching results so repeated calls are fast. The cache lives in a closure.
</p>

<h3 class="text-xl font-bold text-white mb-4">5) The Footgun: Memory Leaks</h3>
<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200">
    <span class="text-yellow-400 font-bold">Warning:</span> If a closure keeps a reference to something huge (large arrays, big objects),
    it stays in memory as long as the closure is reachable.
  </p>
</div>

<details class="mb-6 bg-dark-800 border border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-light-100">Real-world example: event handler leak</summary>
  <div class="mt-3 text-light-300 space-y-3">
    <p>
      If you add an event listener that closes over a huge object and never remove it, the huge object can’t be garbage collected.
      (In the browser, this is a common leak pattern.)
    </p>
  </div>
</details>

<h3 class="text-xl font-bold text-white mb-4">6) The React Connection (Why Hooks Work)</h3>
<p class="text-light-300">
Hooks rely on closures and stable call order. Your component function re-runs, but React holds state outside and gives you access through closures and bookkeeping.
</p>
            `,
            predictions: [
                {
                    prompt: "Predict: What does this print? `const inc = make(); inc(); inc();`",
                    options: ["1 then 1", "1 then 2", "0 then 1", "2 then 3"],
                    correctIndex: 1,
                    explanation: "The closure holds a reference to `x` inside `make()`. Each call increments the same `x`."
                },
                {
                    prompt: "Predict: In a memoize function, where does the cache live?",
                    options: ["On the global object", "Inside the returned function’s closure", "On the function prototype", "In V8 bytecode"],
                    correctIndex: 1,
                    explanation: "The cache is a variable in the outer function, referenced by the inner returned function."
                },
                {
                    prompt: "A closure can keep memory alive because it stores…",
                    options: ["a copy of values", "a reference to variables/objects", "only primitive values", "only function code"],
                    correctIndex: 1,
                    explanation: "Closures keep references. If the referenced object is large, it stays alive while the closure is reachable."
                }
            ],
            checkpoints: [
                {
                    prompt: "Which is the best definition of a closure?",
                    options: [
                        "A function inside another function",
                        "A function plus the lexical environment it was created in",
                        "A function that returns a function",
                        "A JavaScript class feature"
                    ],
                    correctIndex: 1,
                    explanation: "Closures are about captured lexical environment, not just nested syntax."
                },
                {
                    prompt: "Why does a closure sometimes create a memory leak?",
                    options: [
                        "Closures are always leaks",
                        "Because the engine can’t optimize closures",
                        "Because the closure keeps references alive longer than intended",
                        "Because closures disable garbage collection"
                    ],
                    correctIndex: 2,
                    explanation: "GC still works, but it can’t collect referenced data while the closure remains reachable."
                }
            ],
            labSteps: [
                {
                    id: "d3-step-1",
                    title: "The classic closure bug (loop + setTimeout)",
                    subtitle: "Why you see 5,5,5…",
                    teacherNote: "Predict first: do you see 0..4 or 5..5? Then explain what the closure captured.",
                    bugCode: `console.clear();

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("i =", i);
  }, 10);
}`,
                    bugFocus: { fromLine: 3, toLine: 7 },
                    fixCode: `console.clear();

// FIX: let creates a new binding per iteration
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log("i =", i);
  }, 10);
}`,
                    fixFocus: { fromLine: 4, toLine: 8 },
                    whatToNotice: [
                        "The callback runs after the loop completes.",
                        "With var there’s one shared binding; with let there are per-iteration bindings."
                    ]
                },
                {
                    id: "d3-step-2",
                    title: "Memoization (cache) in a closure",
                    subtitle: "Speed up repeated work",
                    teacherNote: "Watch when it prints 'Calculating…' and when it doesn’t. That’s the cache doing its job.",
                    bugCode: `console.clear();

// BUG: no cache, repeats work
function heavy(x) {
  console.log("Calculating...");
  return x * 2;
}

console.log(heavy(10));
console.log(heavy(10));`,
                    bugFocus: { fromLine: 3, toLine: 7 },
                    fixCode: `console.clear();

function memoize(fn) {
  const cache = new Map();
  return function (arg) {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

function heavy(x) {
  console.log("Calculating...");
  return x * 2;
}

const memoHeavy = memoize(heavy);
console.log(memoHeavy(10));
console.log(memoHeavy(10)); // instant`,
                    fixFocus: { fromLine: 3, toLine: 23 },
                    whatToNotice: [
                        "The Map lives in the closure, private to memoHeavy.",
                        "Repeated calls reuse cached results."
                    ]
                }
            ],
            code: `// Day 3 Live Lab: Closures (Predict first!)
console.clear();

function createCounter() {
  let count = 0;
  return {
    inc() { return ++count; },
    get() { return count; }
  };
}

const c = createCounter();
console.log(c.inc()); // 1
console.log(c.inc()); // 2
console.log(c.get()); // 2

function memoize(fn) {
  const cache = new Map();
  return (arg) => {
    if (cache.has(arg)) return cache.get(arg);
    console.log("Calculating...");
    const res = fn(arg);
    cache.set(arg, res);
    return res;
  };
}
const heavy = (x) => x * 2;
const memoHeavy = memoize(heavy);
console.log(memoHeavy(10));
console.log(memoHeavy(10));`,
            comparison: {
                junior: `// ❌ Dirty Global State
let count = 0; // Anyone can mess this up

function increment() {
count++;
return count;
}

count = 100; // Bug caused by another script`,
                senior: `// ✅ Encapsulated Closure
const createCounter = () => {
let count = 0; // Private
return {
increment: () => ++count,
get: () => count
};
};

const counter = createCounter();
counter.increment(); // 1
// counter.count is undefined (Safe)`
            },
            interview: {
                questions: [
                    { q: "Can a closure modify the outer variable?", a: "Yes. Closures hold a *reference* to the variable, not a copy. So if the outer variable changes, the closure sees the change." },
                    { q: "How to implement a Singleton using Closures?", a: "Use an IIFE that returns an object, ensuring the initialization code runs only once." },
                    { q: "What is the difference between Closure and Class?", a: "Classes store state in `this` (objects). Closures store state in the Lexical Scope (functions). Classes are more memory efficient for many instances (shared prototype), Closures give better privacy." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "A closure is a function + its captured lexical environment.",
                    "Closures capture references, not copies (state can evolve).",
                    "Closures enable privacy (private variables) and memoization (caches).",
                    "Leaks happen when closures keep large references alive longer than intended."
                ],
                commonMistakes: [
                    "Thinking closures only happen when returning a function (they happen whenever inner functions use outer vars).",
                    "Using var in loops with async callbacks (classic closure bug).",
                    "Accidentally closing over huge objects and never releasing listeners/intervals.",
                    "Confusing class state with closure state (different memory tradeoffs)."
                ],
                nextActions: [
                    "Run the closure loop bug and fix it 2 ways (let, or IIFE).",
                    "Build a memoize(fn) and test that it avoids repeated “Calculating…” logs."
                ]
            }
        },
        {
            day: 4,
            title: 'Day 4: `this` Mastery + call/apply/bind (No More Guessing)',
            intro: "If `this` feels random, you’re missing one skill: reading the call-site. Today you’ll build the “call-site scanner” that makes `this` predictable.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The One Sentence Truth</h3>
<p class="mb-6 text-light-300">
<code class="bg-dark-900 px-1 rounded">this</code> is not about where a function is defined.
It is about <span class="text-yellow-400 font-bold">how the function is called</span>.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) The 4 Call-Site Rules (Priority Order)</h3>
<p class="mb-4 text-light-300">
When multiple rules could apply, higher priority wins.
</p>

<div class="overflow-hidden rounded-xl border border-dark-600 mb-8">
<table class="w-full text-sm text-left">
  <thead class="bg-dark-800 text-light-300">
    <tr>
      <th class="p-3">Priority</th>
      <th class="p-3">Rule</th>
      <th class="p-3">Meaning</th>
      <th class="p-3">Example</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-dark-700 bg-dark-900">
    <tr>
      <td class="p-3 text-brand-primary font-bold">1</td>
      <td class="p-3"><span class="text-yellow-400 font-bold">new binding</span></td>
      <td class="p-3 text-light-300">Constructor call creates a fresh object and binds this to it</td>
      <td class="p-3 font-mono text-xs">new Person()</td>
    </tr>
    <tr>
      <td class="p-3 font-bold">2</td>
      <td class="p-3"><span class="text-yellow-400 font-bold">explicit binding</span></td>
      <td class="p-3 text-light-300">You force this via call/apply/bind</td>
      <td class="p-3 font-mono text-xs">fn.call(obj)</td>
    </tr>
    <tr>
      <td class="p-3 font-bold">3</td>
      <td class="p-3"><span class="text-yellow-400 font-bold">implicit binding</span></td>
      <td class="p-3 text-light-300">Method call binds this to the object left of the dot</td>
      <td class="p-3 font-mono text-xs">obj.fn()</td>
    </tr>
    <tr>
      <td class="p-3 text-light-500 font-bold">4</td>
      <td class="p-3"><span class="text-yellow-400 font-bold">default binding</span></td>
      <td class="p-3 text-light-300">Plain function call: this is global (sloppy) or undefined (strict)</td>
      <td class="p-3 font-mono text-xs">fn()</td>
    </tr>
  </tbody>
</table>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) The Most Common Bug: Method Extraction</h3>
<p class="mb-4 text-light-300">
When you do <code class="bg-dark-900 px-1 rounded">const f = obj.method</code>, you lost the call-site.
Calling <code class="bg-dark-900 px-1 rounded">f()</code> is now a plain function call, so default binding applies.
</p>

<div class="bg-dark-900 p-4 rounded-xl border border-dark-600 font-mono text-sm text-light-200 overflow-x-auto mb-8">
<pre><code>
const user = {
  name: "Asha",
  say() { console.log(this.name); }
};

user.say(); // ok
const f = user.say;
f(); // default binding (often undefined)
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) call vs apply vs bind</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-8 bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-400 font-bold">call</span>: invoke immediately, args listed</li>
  <li><span class="text-yellow-400 font-bold">apply</span>: invoke immediately, args array</li>
  <li><span class="text-yellow-400 font-bold">bind</span>: returns a new function with this locked</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">4) Arrow Functions: “this” from the Parent</h3>
<p class="mb-4 text-light-300">
Arrow functions don’t have their own this. They capture this from the surrounding lexical scope.
This makes them perfect for callbacks where you want to “keep the this”.
</p>

<div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-8">
  <p class="text-blue-200">
    <span class="text-yellow-400 font-bold">Teacher trick:</span> If you see an arrow, stop applying the 4 rules to that arrow.
    The arrow inherits this from where it was created.
  </p>
</div>

<h3 class="text-xl font-bold text-white mb-4">5) Strict Mode Note</h3>
<p class="text-light-300">
In strict mode, default binding sets <code class="bg-dark-900 px-1 rounded">this</code> to <code class="bg-dark-900 px-1 rounded">undefined</code>, which is safer than silently using the global object.
</p>
            `,
            predictions: [
                {
                    prompt: "Predict: What does `f()` print after `const f = user.say`?",
                    options: ["Asha", "undefined", "ReferenceError", "It depends but usually undefined / error"],
                    correctIndex: 3,
                    explanation: "The method lost its call-site. Default binding applies. In strict contexts it’s undefined; in sloppy it can be global. In our lab, you’ll observe what happens."
                },
                {
                    prompt: "Which has the highest priority in `this` binding?",
                    options: ["implicit binding", "explicit binding", "new binding", "default binding"],
                    correctIndex: 2,
                    explanation: "`new` binding wins. If you call a bound function with `new`, the `new` binding takes priority."
                },
                {
                    prompt: "Arrow functions decide `this` based on…",
                    options: ["call-site", "where they are defined (lexical)", "the object left of the dot", "bind() arguments"],
                    correctIndex: 1,
                    explanation: "Arrows capture `this` lexically (from the parent scope). call/apply/bind don’t change arrow `this`."
                }
            ],
            checkpoints: [
                {
                    prompt: "What does `bind` return?",
                    options: ["The result of the function", "A new function with this fixed", "A Promise", "A copy of the object"],
                    correctIndex: 1,
                    explanation: "`bind` returns a new function. It doesn’t execute immediately."
                },
                {
                    prompt: "The easiest way to predict `this` is to…",
                    options: ["look at the function definition", "look at the call-site", "search the file for 'this'", "avoid this entirely"],
                    correctIndex: 1,
                    explanation: "`this` is call-site driven. Scan the line where the function is called."
                }
            ],
            labSteps: [
                {
                    id: "d4-step-1",
                    title: "Method extraction bug",
                    subtitle: "You lost the call-site",
                    teacherNote: "Predict what `f()` prints. Then fix it with bind or by calling with the object.",
                    bugCode: `console.clear();

const user = {
  name: "Asha",
  say() { console.log("say:", this.name); }
};

const f = user.say;
f();`,
                    bugFocus: { fromLine: 8, toLine: 9 },
                    fixCode: `console.clear();

const user = {
  name: "Asha",
  say() { console.log("say:", this.name); }
};

// FIX A: keep call-site
user.say();

// FIX B: bind the function
const f = user.say.bind(user);
f();`,
                    fixFocus: { fromLine: 9, toLine: 13 },
                    whatToNotice: [
                        "Without the object left of the dot, default binding applies.",
                        "bind creates a new function with `this` locked to user."
                    ]
                },
                {
                    id: "d4-step-2",
                    title: "setTimeout + this (classic pitfall)",
                    subtitle: "Callback loses implicit binding",
                    teacherNote: "Predict: will it print seconds or NaN? Then fix with arrow or bind.",
                    bugCode: `console.clear();

function Timer() {
  this.seconds = 0;
  setInterval(function () {
    this.seconds++;
    console.log("seconds:", this.seconds);
  }, 200);
}

new Timer();`,
                    bugFocus: { fromLine: 5, toLine: 8 },
                    fixCode: `console.clear();

function Timer() {
  this.seconds = 0;

  // FIX: arrow inherits 'this' from Timer()
  setInterval(() => {
    this.seconds++;
    console.log("seconds:", this.seconds);
  }, 200);
}

new Timer();`,
                    fixFocus: { fromLine: 6, toLine: 10 },
                    whatToNotice: [
                        "The callback is a plain function call (default binding).",
                        "Arrows capture lexical this, which is the Timer instance here."
                    ]
                }
            ],
            code: `// Day 4 Live Lab: \`this\` (Predict first!)
console.clear();

const person = {
  name: "Alice",
  say() { console.log("implicit:", this.name); }
};
const other = { name: "Bob" };

person.say();               // Alice
person.say.call(other);     // Bob

const f = person.say;
try { f(); } catch (e) { console.log("extracted call error:", e.message); }

const bound = person.say.bind(person);
bound();`,
            comparison: {
                junior: `// ❌ The "Self" Hack
function Timer() {
this.seconds = 0;
var self = this; // Caching 'this' manually

setInterval(function() {
self.seconds++; // Uses closure
console.log(self.seconds);
}, 1000);
}`,
                senior: `// ✅ Arrow Functions
function Timer() {
this.seconds = 0;

// Arrow function inherits 'this' from Timer
setInterval(() => {
this.seconds++;
console.log(this.seconds);
}, 1000);
}`
            },
            interview: {
                questions: [
                    { q: "What is the difference between `call` and `apply`?", a: "`call` takes arguments separately (`fn.call(ctx, 1, 2)`). `apply` takes arguments as an array (`fn.apply(ctx, [1, 2])`)." },
                    { q: "What does `bind` return?", a: "`bind` returns a **new function** with `this` permanently locked to the first argument. It does not execute the function immediately." },
                    { q: "Can you override the `this` of an Arrow Function?", a: "No. `call`, `apply`, and `bind` have no effect on arrow functions. Their `this` is hardcoded to the lexical scope." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "`this` is determined by the call-site, not the definition.",
                    "Priority: new binding → explicit (call/apply/bind) → implicit (obj.fn) → default.",
                    "Method extraction loses implicit binding and often breaks `this`.",
                    "Arrow functions capture `this` lexically (call/apply/bind don’t change it)."
                ],
                commonMistakes: [
                    "Reading `this` like a normal variable (it’s call-site driven).",
                    "Passing methods as callbacks without binding.",
                    "Assuming arrow functions have their own `this` (they don’t).",
                    "Using 'self = this' everywhere instead of understanding binding rules."
                ],
                nextActions: [
                    "Do the method extraction lab and fix using bind.",
                    "Rewrite a setInterval callback with an arrow to keep lexical `this`."
                ]
            }
        },
        {
            day: 5,
            title: 'Day 5: Prototypes (How JS “Inheritance” Actually Works)',
            intro: "JavaScript inheritance is delegation: objects link to objects. Today you’ll learn property lookup, prototype chains, classes as sugar, and the safe patterns pros use.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The Mental Model</h3>
<p class="mb-6 text-light-300">
When you read <code class="bg-dark-900 px-1 rounded">obj.prop</code>, JavaScript does <span class="text-yellow-400 font-bold">property lookup</span>:
<span class="text-yellow-400 font-bold">own properties</span> first, then climbs <span class="text-yellow-400 font-bold">obj’s prototype chain</span> until it finds it or hits null.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) Prototype Chain (Property Lookup)</h3>
<p class="mb-4 text-light-300">
When you access <code class="bg-dark-900 px-1 rounded">dog.eats</code>, JS walks up the chain until it finds it.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-pink-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ dog Object ]
│  name: "Rex"
│  __proto__ ──┐
           ▼
    [ animal Object ]
    │  eats: true
    │  __proto__ ──┐
                   ▼
            [ Object.prototype ]
            │  toString: fn
            │  __proto__: null
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) <code class="bg-dark-900 px-1 rounded">__proto__</code> vs <code class="bg-dark-900 px-1 rounded">prototype</code> (Don’t Mix Them)</h3>
<ul class="list-disc list-inside space-y-3 text-light-300 bg-dark-800 p-4 rounded-lg mb-8">
  <li><code class="bg-dark-900 px-1 rounded">__proto__</code> (aka <code class="bg-dark-900 px-1 rounded">[[Prototype]]</code>): the actual link on an <span class="text-yellow-400 font-bold">instance</span>.</li>
  <li><code class="bg-dark-900 px-1 rounded">prototype</code>: a property on a <span class="text-yellow-400 font-bold">constructor function</span> used for instances created via <code class="bg-dark-900 px-1 rounded">new</code>.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3) “Classes” Are Sugar Over Prototypes</h3>
<p class="mb-4 text-light-300">
<code class="bg-dark-900 px-1 rounded">class</code> feels like classical OOP, but under the hood it still uses prototype chains.
Methods live on <code class="bg-dark-900 px-1 rounded">Constructor.prototype</code>.
</p>

<h3 class="text-xl font-bold text-white mb-4">4) Performance & Safety Notes (Real Engineering)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-8 bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-400 font-bold">Avoid</span> mutating <code class="bg-dark-900 px-1 rounded">Object.prototype</code> or built-ins (prototype pollution + de-opts).</li>
  <li>Use <code class="bg-dark-900 px-1 rounded">Object.create(null)</code> for “pure dictionaries” (no inherited keys).</li>
  <li>Prefer <code class="bg-dark-900 px-1 rounded">Object.create</code> / classes over setting <code class="bg-dark-900 px-1 rounded">__proto__</code> directly.</li>
</ul>

<details class="mb-6 bg-dark-800 border border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-light-100">Why is prototype pollution dangerous?</summary>
  <div class="mt-3 text-light-300 space-y-3">
    <p>
      If attacker-controlled input can set <code class="bg-dark-900 px-1 rounded">__proto__</code> or <code class="bg-dark-900 px-1 rounded">constructor.prototype</code>,
      they can inject properties into many objects. This can cause security issues and logic corruption.
    </p>
  </div>
</details>
            `,
            predictions: [
                {
                    prompt: "Predict: If `dog` is created with `Object.create(animal)`, where does `dog.eats` come from?",
                    options: ["dog own property", "animal prototype", "Object.prototype", "it’s undefined"],
                    correctIndex: 1,
                    explanation: "`Object.create(animal)` sets animal as dog’s prototype. Missing lookups delegate to animal."
                },
                {
                    prompt: "Predict: Methods defined in a JS `class` live on…",
                    options: ["each instance", "the class constructor’s prototype", "window", "Object.prototype"],
                    correctIndex: 1,
                    explanation: "Class methods are placed on `Constructor.prototype`, so instances share them."
                }
            ],
            checkpoints: [
                {
                    prompt: "Property lookup order is…",
                    options: [
                        "prototype first, then own",
                        "own first, then prototype chain",
                        "random",
                        "depends on TypeScript"
                    ],
                    correctIndex: 1,
                    explanation: "JS checks own properties first, then walks the prototype chain."
                },
                {
                    prompt: "What is `Object.create(null)` best for?",
                    options: [
                        "Creating arrays without prototypes",
                        "Creating a dictionary object without inherited keys",
                        "Creating classes",
                        "Faster JSON parsing"
                    ],
                    correctIndex: 1,
                    explanation: "It creates an object with no prototype—useful for clean maps where inherited keys would be a bug."
                }
            ],
            labSteps: [
                {
                    id: "d5-step-1",
                    title: "Property lookup: own vs prototype",
                    subtitle: "Where does the value come from?",
                    teacherNote: "Predict first: does it find the property on the object, or does it climb the chain?",
                    bugCode: `console.clear();

const animal = { eats: true };
const dog = Object.create(animal);
dog.name = "Rex";

console.log("dog.eats:", dog.eats);
console.log("dog.hasOwnProperty('eats'):", dog.hasOwnProperty("eats"));`,
                    bugFocus: { fromLine: 7, toLine: 8 },
                    fixCode: `console.clear();

const animal = { eats: true };
const dog = Object.create(animal);
dog.name = "Rex";

// FIX: if you want it as own prop, define it on the instance
dog.eats = false;

console.log("dog.eats:", dog.eats);
console.log("dog.hasOwnProperty('eats'):", dog.hasOwnProperty("eats"));`,
                    fixFocus: { fromLine: 8, toLine: 10 },
                    whatToNotice: [
                        "Before assignment, `eats` is found on the prototype (animal).",
                        "After assignment, `eats` becomes an own property that shadows the prototype property."
                    ]
                },
                {
                    id: "d5-step-2",
                    title: "Don’t mutate built-in prototypes",
                    subtitle: "Why it’s dangerous",
                    teacherNote: "This isn’t about style—this breaks other code and can create security issues.",
                    bugCode: `console.clear();

// BUG: modifying built-ins is a global side-effect
Array.prototype.last = function () {
  return this[this.length - 1];
};

console.log([1, 2, 3].last());`,
                    bugFocus: { fromLine: 3, toLine: 6 },
                    fixCode: `console.clear();

// FIX: write a utility instead (no global mutation)
function last(arr) {
  return arr[arr.length - 1];
}

console.log(last([1, 2, 3]));`,
                    fixFocus: { fromLine: 3, toLine: 7 },
                    whatToNotice: [
                        "Prototype mutation changes behavior for every array in the whole app.",
                        "Utility functions keep behavior local and predictable."
                    ]
                }
            ],
            code: `// Day 5 Live Lab: Prototypes (Predict first!)
console.clear();

const animal = { eats: true };
const dog = Object.create(animal);
dog.barks = true;

console.log("dog.eats:", dog.eats); // from prototype
console.log("dog.hasOwnProperty('eats'):", dog.hasOwnProperty("eats"));

dog.eats = false; // shadow prototype property
console.log("dog.eats after shadow:", dog.eats);

class Animal {
  constructor(name) { this.name = name; }
  describe() { return "Animal:" + this.name; }
}
class Cat extends Animal {
  meow() { return true; }
}
const c = new Cat("Milo");
console.log(c.describe(), c.meow());`,
            comparison: {
                junior: `// ❌ Direct Mutation (Slow & Dangerous)
const cat = {};
cat.__proto__ = { meow: true };

// Or worse, modifying built-ins
Array.prototype.last = function() {
return this[this.length - 1];
};`,
                senior: `// ✅ Proper Inheritance
class Animal {
constructor(name) { this.name = name; }
}

class Cat extends Animal {
meow() { return true; }
}

// Optimized by engine. Safer.`
            },
            interview: {
                questions: [
                    { q: "What is the Prototype Chain?", a: "It is the mechanism of inheritance. Objects delegate failed property lookups to their prototype." },
                    { q: "Why is modifying `Object.prototype` bad?", a: "It breaks encapsulation, can collide with future library updates, and de-optimizes the V8 engine's property access speed." },
                    { q: "What is `Object.create(null)`?", a: "It creates a 'dictionary' object with NO prototype (no `toString`, no `hasOwnProperty`). Useful for clean maps." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "Property lookup is: own properties first, then prototype chain.",
                    "`__proto__` is the instance link; `prototype` is on constructor functions.",
                    "Classes are syntax sugar over prototypes (methods live on Constructor.prototype).",
                    "Avoid mutating built-in prototypes; prefer utilities or local extensions."
                ],
                commonMistakes: [
                    "Confusing `__proto__` and `prototype`.",
                    "Assuming inheritance copies properties (it delegates lookup).",
                    "Mutating Object.prototype/Array.prototype (risk + deopts + security).",
                    "Using objects as dictionaries without considering inherited keys."
                ],
                nextActions: [
                    "Run the lookup lab and verify hasOwnProperty before/after shadowing.",
                    "Create an Object.create(null) map and notice missing toString/hasOwnProperty."
                ]
            }
        },
        // --- WEEK 2: ASYNC & PERFORMANCE ---
        {
            day: 6,
            title: 'Day 6: The Event Loop (Microtasks vs Macrotasks) + UI Smoothness',
            intro: "This is where JavaScript becomes predictable. You’ll learn the event loop like a timeline: what runs now, what runs next, and how to avoid freezing the UI.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The Promise of Today</h3>
<p class="mb-6 text-light-300">
After this lesson, “async bugs” stop feeling random. You will be able to read code and predict execution order.
That skill is the difference between a beginner and someone who can debug production issues.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) The Visual Event Loop</h3>
<p class="mb-4 text-light-300">
JavaScript runs synchronous code on the Call Stack. The platform (browser/Node) does timers/network in the background,
then schedules callbacks back onto queues. The loop pulls work from those queues when the stack is empty.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto shadow-inner">
<pre>
┌─────────────────┐      ┌─────────────────┐
│   Call Stack    │      │  Web APIs       │
│ (Run Sync Code) │ ───▶ │ (Timer, Fetch)  │
└────────┬────────┘      └────────┬────────┘
     │                        │
     │ (Empty?)               ▼
┌────────▼────────┐      ┌─────────────────┐
│ Event Loop      │ ◀─── │ Callback Queues │
└────────┬────────┘      └─────────────────┘
     │
     ├──▶ 1. Microtasks (Promise.then) [VIP]
     └──▶ 2. Macrotasks (setTimeout)   [Normal]
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Priority Rules (The Exact Order)</h3>
<ol class="list-decimal list-inside space-y-3 text-light-300 bg-dark-800 p-4 rounded-lg mb-6">
<li><span class="text-yellow-400 font-bold">Run Synchronous Code</span> until Stack is empty.</li>
<li><span class="text-yellow-400 font-bold">Run ALL Microtasks</span> until queue is empty. (Can starve the loop!)</li>
<li><span class="text-yellow-400 font-bold">Render UI</span> (Browser Repaint).</li>
<li><span class="text-yellow-400 font-bold">Run ONE Macrotask</span>.</li>
<li>Repeat.</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">3) Microtask Starvation (How Pages Freeze)</h3>
<p class="mb-4 text-light-300">
Microtasks have “VIP priority”. If you keep enqueueing microtasks forever, the browser never gets a chance to paint or handle timers.
This can freeze UI even though you never wrote a while(true) loop.
</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200">
    <span class="text-yellow-400 font-bold">Teacher warning:</span> never create an unbounded chain of <span class="text-yellow-400 font-bold">Promise.then</span> or <span class="text-yellow-400 font-bold">queueMicrotask</span> callbacks.
    Always yield occasionally.
  </p>
</div>

<h3 class="text-xl font-bold text-white mb-4">4) The Most Useful Debug Trick</h3>
<p class="mb-6 text-light-300">
When you’re confused, add logs labeled “sync”, “microtask”, “task” and re-run. Make the timeline visible.
</p>

<details class="mb-6 bg-dark-800 border border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-light-100">Browser vs Node note</summary>
  <div class="mt-3 text-light-300 space-y-3">
    <p>
      The high-level idea is the same, but details differ between runtimes. Browsers have rendering frames; Node has phases
      (timers, poll, check, etc.). Today we focus on the transferable mental model: stack → microtasks → tasks.
    </p>
  </div>
</details>
            `,
            predictions: [
                {
                    prompt: "Predict output order: sync logs, then Promise.then, then setTimeout?",
                    options: [
                        "1, 2, 3, 4",
                        "1, 4, 2, 3",
                        "1, 4, 3, 2",
                        "3, 1, 4, 2"
                    ],
                    correctIndex: 2,
                    explanation: "Sync runs first (1 then 4). Microtasks (Promise.then) flush before tasks (setTimeout), so 3 prints before 2."
                },
                {
                    prompt: "What can cause UI freezing without a while loop?",
                    options: [
                        "A long chain of microtasks that never ends",
                        "Using setTimeout(…, 0)",
                        "Using console.log too much",
                        "Using async/await"
                    ],
                    correctIndex: 0,
                    explanation: "Unbounded microtasks can starve rendering and tasks. The page can freeze even if you never block with sync loops."
                }
            ],
            checkpoints: [
                {
                    prompt: "Microtasks run…",
                    options: [
                        "after every setTimeout",
                        "before the next macrotask and before rendering opportunities",
                        "only in Node.js",
                        "only when you use async/await"
                    ],
                    correctIndex: 1,
                    explanation: "Microtasks flush after the current stack and before macrotasks; in browsers they also run before paint opportunities."
                },
                {
                    prompt: "Best fix for heavy CPU work on the main thread is…",
                    options: [
                        "more Promises",
                        "chunking (yielding) or moving to a worker",
                        "setTimeout(…, 0) everywhere",
                        "try/catch"
                    ],
                    correctIndex: 1,
                    explanation: "Chunk work so the event loop can breathe, or offload CPU work to a worker to keep UI responsive."
                }
            ],
            labSteps: [
                {
                    id: "d6-step-1",
                    title: "Ordering bug: why did Promise run before timeout?",
                    subtitle: "Make the timeline visible",
                    teacherNote: "Predict the order, then run. If you guessed wrong, explain using: 'microtasks flush before tasks'.",
                    bugCode: `console.clear();

console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
                    bugFocus: { fromLine: 3, toLine: 4 },
                    fixCode: `console.clear();

console.log("[sync] 1");
setTimeout(() => console.log("[task] 2"), 0);
Promise.resolve().then(() => console.log("[microtask] 3"));
console.log("[sync] 4");

// Explain: stack finishes -> microtasks flush -> tasks run.`,
                    fixFocus: { fromLine: 3, toLine: 8 },
                    whatToNotice: [
                        "Labeling logs turns confusion into a timeline.",
                        "Microtasks always run before timers once the stack is empty."
                    ]
                },
                {
                    id: "d6-step-2",
                    title: "Microtask starvation (safe demo)",
                    subtitle: "Too many microtasks can block timers",
                    teacherNote: "This demo is bounded (safe). Notice how the timer waits until microtasks finish.",
                    bugCode: `console.clear();

setTimeout(() => console.log("timer fired"), 0);

let n = 0;
function loop() {
  queueMicrotask(() => {
    n++;
    if (n < 5000) loop();
  });
}
loop();

console.log("scheduled");`,
                    bugFocus: { fromLine: 4, toLine: 11 },
                    fixCode: `console.clear();

setTimeout(() => console.log("timer fired"), 0);

let n = 0;
function loop() {
  // FIX: occasionally yield to the task queue
  if (n % 500 === 0) {
    setTimeout(loop, 0);
    return;
  }
  queueMicrotask(() => {
    n++;
    if (n < 5000) loop();
  });
}
loop();

console.log("scheduled");`,
                    fixFocus: { fromLine: 6, toLine: 16 },
                    whatToNotice: [
                        "Unbounded microtasks can delay timers and rendering.",
                        "Yielding gives the event loop room to process other work."
                    ]
                }
            ],
            code: `// Example 1: Order of Operations
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
// Output: 1, 4, 3, 2`,
            comparison: {
                junior: `// ❌ Blocking the Thread
function processHugeList(list) {
// Freezes UI for 5 seconds
for (let item of list) {
heavyCalc(item);
}
}`,
                senior: `// ✅ Chunking (Yielding to Loop)
function processHugeList(list) {
if (list.length === 0) return;

// Process 100 items, then yield
const chunk = list.splice(0, 100);
chunk.forEach(heavyCalc);

// Schedule next chunk after paint
setTimeout(() => {
processHugeList(list);
}, 0);
}`
            },
            interview: {
                questions: [
                    { q: "Difference between Task and Microtask?", a: "Tasks (Macro) are IO/Timers. Microtasks are Promises/MutationObservers. Microtasks run immediately after the current stack, before rendering." },
                    { q: "Does JS run in parallel?", a: "No. JS is single-threaded. However, the Browser (Web APIs) handles network/timers in parallel threads." },
                    { q: "Why is `requestAnimationFrame` better for animations?", a: "It runs exactly before the browser repaints, ensuring smooth 60fps visuals, unlike setTimeout which is imprecise." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "Event loop order: run sync → flush microtasks → (browser paint) → run a macrotask.",
                    "Promise.then/queueMicrotask are microtasks (VIP), setTimeout is a task.",
                    "Microtask starvation can delay timers and rendering.",
                    "Labeling logs (sync/microtask/task) turns async confusion into a timeline."
                ],
                commonMistakes: [
                    "Believing setTimeout(…, 0) runs immediately.",
                    "Assuming Promises and timers have equal priority.",
                    "Creating unbounded microtask loops (starving the event loop).",
                    "Doing heavy CPU work on main thread without yielding."
                ],
                nextActions: [
                    "Re-run the ordering lab and narrate why 3 comes before 2.",
                    "Try chunking a loop by yielding with setTimeout(…, 0) every N iterations."
                ]
            }
        },
        {
            day: 7,
            title: 'Day 7: Promises (State, Chaining, Error Propagation)',
            intro: "Promises are not magic—they are a state machine plus queued callbacks. Today you’ll learn chaining, error propagation, and the real difference between all/allSettled/race/any.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) Mental Model</h3>
<p class="mb-6 text-light-300">
A Promise is an object with:
<span class="text-yellow-400 font-bold">state</span> (pending → fulfilled/rejected),
<span class="text-yellow-400 font-bold">value</span> (result or error),
and <span class="text-yellow-400 font-bold">queues of callbacks</span> to run later (microtasks).
</p>

<h3 class="text-xl font-bold text-white mb-4">1) The Promise State Machine</h3>
<p class="mb-4 text-light-300">A Promise can only move forward. It starts as pending.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-orange-300 mb-6 overflow-x-auto shadow-inner">
<pre>
  [ Pending ]
  (undefined)
   │      │
   │      │ resolve(value)
   │      ▼
   │    [ Fulfilled ] ──▶ .then(onSuccess)
   │    (value)
   │
   │ reject(error)
   ▼
[ Rejected ] ──▶ .catch(onError)
(error)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) The Chain Rule (The Most Important Rule)</h3>
<p class="mb-4"><code class="bg-dark-700 text-brand-primary px-1 rounded">.then()</code> always returns a <span class="text-yellow-400 font-bold">NEW Promise</span>. This is why you can chain them.</p>
<ul class="list-disc list-inside space-y-2 text-light-300 bg-dark-800 p-4 rounded-lg">
<li>Return a value? ➞ Next Promise <span class="text-yellow-400 font-bold">Fulfilled</span>.</li>
<li>Return a Promise? ➞ Next Promise <span class="text-yellow-400 font-bold">waits</span> for it.</li>
<li>Throw Error? ➞ Next Promise <span class="text-yellow-400 font-bold">Rejected</span>.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3) Error Propagation (Why One catch can handle everything)</h3>
<p class="mb-6 text-light-300">
If a promise in the chain rejects (or you throw in a then), the chain becomes rejected until a catch handles it.
This is why promise chains are cleaner than callback pyramids.
</p>

<h3 class="text-xl font-bold text-white mb-4">4) all vs allSettled vs race vs any</h3>
<div class="bg-dark-800 border border-dark-600 rounded-xl p-4 mb-6 text-light-300">
  <ul class="list-disc list-inside space-y-2">
    <li><span class="text-yellow-400 font-bold">Promise.all</span>: wait for all; rejects fast if any rejects.</li>
    <li><span class="text-yellow-400 font-bold">Promise.allSettled</span>: wait for all; never rejects; gives statuses.</li>
    <li><span class="text-yellow-400 font-bold">Promise.race</span>: first settled wins (resolve or reject).</li>
    <li><span class="text-yellow-400 font-bold">Promise.any</span>: first fulfilled wins; rejects only if all reject.</li>
  </ul>
</div>
            `,
            predictions: [
                {
                    prompt: "Predict: In a chain, if you forget to return inside a .then, what value does the next .then receive?",
                    options: ["The previous value", "undefined", "The promise object", "It throws automatically"],
                    correctIndex: 1,
                    explanation: "A .then callback that returns nothing returns undefined, so the next .then receives undefined."
                },
                {
                    prompt: "Promise.all rejects when…",
                    options: [
                        "any promise rejects",
                        "the slowest promise resolves",
                        "all promises resolve",
                        "the first promise resolves"
                    ],
                    correctIndex: 0,
                    explanation: "Promise.all is fail-fast. One rejection rejects the whole aggregate."
                }
            ],
            checkpoints: [
                {
                    prompt: "What does .then always return?",
                    options: ["A value", "A new Promise", "The same Promise", "A callback"],
                    correctIndex: 1,
                    explanation: ".then returns a new Promise so chaining works."
                },
                {
                    prompt: "Which combinator is best when you need results even if some requests fail?",
                    options: ["Promise.all", "Promise.allSettled", "Promise.race", "Promise.any"],
                    correctIndex: 1,
                    explanation: "allSettled gives you success/failure per promise without failing the whole thing."
                }
            ],
            labSteps: [
                {
                    id: "d7-step-1",
                    title: "Missing return in .then",
                    subtitle: "The silent undefined bug",
                    teacherNote: "Predict what the second then receives. Then fix by returning the value.",
                    bugCode: `console.clear();

Promise.resolve(2)
  .then(x => {
    x * 10; // BUG: forgot return
  })
  .then(x => console.log("x is:", x));`,
                    bugFocus: { fromLine: 4, toLine: 6 },
                    fixCode: `console.clear();

Promise.resolve(2)
  .then(x => {
    return x * 10;
  })
  .then(x => console.log("x is:", x));`,
                    fixFocus: { fromLine: 4, toLine: 6 },
                    whatToNotice: [
                        "Returning a value fulfills the next promise with that value.",
                        "Forgetting return is a very common real bug."
                    ]
                },
                {
                    id: "d7-step-2",
                    title: "Promise.all fail-fast vs allSettled",
                    subtitle: "When one failure kills everything",
                    teacherNote: "Watch the behavior difference. This is how you design resilient flows.",
                    bugCode: `console.clear();

const ok = Promise.resolve("OK");
const bad = Promise.reject(new Error("Boom"));

Promise.all([ok, bad])
  .then(res => console.log("all:", res))
  .catch(err => console.log("all error:", err.message));`,
                    bugFocus: { fromLine: 6, toLine: 8 },
                    fixCode: `console.clear();

const ok = Promise.resolve("OK");
const bad = Promise.reject(new Error("Boom"));

Promise.allSettled([ok, bad])
  .then(res => console.log("allSettled:", res));`,
                    fixFocus: { fromLine: 6, toLine: 7 },
                    whatToNotice: [
                        "all rejects on first rejection.",
                        "allSettled returns an array of {status, value|reason} for each promise."
                    ]
                }
            ],
            code: `// Example 1: Building a Simple Promise
const p = new Promise((resolve, reject) => {
setTimeout(() => resolve("Done!"), 1000);
});

// Example 2: Promise.all vs Promise.race
const p1 = new Promise(r => setTimeout(r, 100, 'Fast'));
const p2 = new Promise(r => setTimeout(r, 500, 'Slow'));

Promise.all([p1, p2]).then(console.log); // ['Fast', 'Slow'] after 500ms`,
            comparison: {
                junior: `// ❌ Callback Hell
getUser(id, function(user) {
getPosts(user.id, function(posts) {
getComments(posts[0], function(comments) {
  console.log(comments);
});
});
});`,
                senior: `// ✅ Promise Chaining
getUser(id)
.then(user => getPosts(user.id))
.then(posts => getComments(posts[0]))
.then(comments => console.log(comments))
.catch(handleError); // One catch for all`
            },
            interview: {
                questions: [
                    { q: "What happens if you don't catch a Promise error?", a: "It causes an 'Unhandled Promise Rejection', which typically logs a warning but doesn't crash the main thread (Node.js might exit)." },
                    { q: "Does `finally` receive arguments?", a: "No. `finally()` receives nothing. It is for cleanup code that runs regardless of success/failure." },
                    { q: "How to run promises sequentially?", a: "Use `await` in a for-loop, or `.reduce()` with a Promise chain." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "Promises are a state machine: pending → fulfilled/rejected.",
                    ".then always returns a new Promise (chaining rule).",
                    "Errors propagate down the chain until caught.",
                    "Use all/allSettled/race/any depending on failure strategy."
                ],
                commonMistakes: [
                    "Forgetting to return inside .then (leads to undefined).",
                    "Catching too early and hiding failures (swallowing errors).",
                    "Using Promise.all when you actually need partial success (use allSettled).",
                    "Mixing callback style and promise style in the same flow."
                ],
                nextActions: [
                    "Do the missing return lab and confirm the fix.",
                    "Write a function that fetches 3 things with allSettled and reports successes/failures separately."
                ]
            }
        },
        {
            day: 8,
            title: 'Day 8: Async/Await (Readable Async) + Concurrency Patterns',
            intro: "Async/await makes async code readable, but it also hides performance traps. Today you’ll learn sequential vs parallel, proper error handling, and the forEach pitfall.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) Key Truth</h3>
<p class="mb-6 text-light-300">
<span class="text-yellow-400 font-bold">await does not block the whole program</span>.
It pauses only the current async function and yields control back to the event loop.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) The “Pausing” Power</h3>
<p class="mb-4 text-light-300">
Normal functions run to completion. Generators can pause with yield and resume.
Async/await gives you a “pause here and continue later” feel.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-teal-300 mb-6 overflow-x-auto shadow-inner">
<pre>
async function() {
const user = await fetchUser();  <-- PAUSE HERE
console.log(user);               <-- RESUME LATER
}

// Under the Hood:
function* generator() {
const user = yield fetchUser();
console.log(user);
}
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Error Handling (The Professional Way)</h3>
<p class="mb-6 text-light-300">
With async/await, use try/catch around awaits. Treat network + JSON parsing + validation as separate failure points.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) Sequential vs Parallel (Huge Performance Difference)</h3>
<div class="bg-dark-800 border border-dark-600 rounded-xl p-4 mb-6 text-light-300">
  <ul class="list-disc list-inside space-y-2">
    <li><span class="text-yellow-400 font-bold">Sequential</span>: await inside a loop → slower but controlled.</li>
    <li><span class="text-yellow-400 font-bold">Parallel</span>: Promise.all with multiple tasks → fast but needs error strategy.</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">4) The forEach Pitfall (Very Common Bug)</h3>
<p class="mb-6 text-light-300">
Array.forEach does not await your async callback. It does not pause. Use for...of or Promise.all.
</p>
            `,
            predictions: [
                {
                    prompt: "Predict: does Array.forEach wait for awaits inside its callback?",
                    options: ["Yes", "No", "Only in strict mode", "Only in Node.js"],
                    correctIndex: 1,
                    explanation: "forEach is synchronous and does not await. It fires callbacks and returns immediately."
                },
                {
                    prompt: "Which is fastest for 5 independent requests?",
                    options: [
                        "await each request in a for loop (sequential)",
                        "Promise.all (parallel)",
                        "setTimeout around each request",
                        "try/catch around each request"
                    ],
                    correctIndex: 1,
                    explanation: "Promise.all runs them in parallel, minimizing total wall time (assuming no dependencies)."
                }
            ],
            checkpoints: [
                {
                    prompt: "An async function always returns…",
                    options: ["a value", "a Promise", "undefined", "a generator"],
                    correctIndex: 1,
                    explanation: "async always returns a Promise. Returning a value becomes Promise.resolve(value)."
                },
                {
                    prompt: "Best replacement for `arr.forEach(async x => ...)` is…",
                    options: [
                        "arr.map(async x => ...) without awaiting",
                        "for...of with await, or Promise.all(arr.map(async ...))",
                        "while loop only",
                        "bind(this)"
                    ],
                    correctIndex: 1,
                    explanation: "Use for...of for sequential, or Promise.all(map()) for parallel."
                }
            ],
            labSteps: [
                {
                    id: "d8-step-1",
                    title: "forEach + await bug",
                    subtitle: "Why order is wrong / why it finishes early",
                    teacherNote: "Predict: does 'done' print last? Then fix with for...of.",
                    bugCode: `console.clear();

const wait = (ms) => new Promise(r => setTimeout(r, ms));

["A", "B", "C"].forEach(async (x) => {
  await wait(50);
  console.log("item:", x);
});

console.log("done");`,
                    bugFocus: { fromLine: 5, toLine: 9 },
                    fixCode: `console.clear();

const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  for (const x of ["A", "B", "C"]) {
    await wait(50);
    console.log("item:", x);
  }
  console.log("done");
})();`,
                    fixFocus: { fromLine: 5, toLine: 12 },
                    whatToNotice: [
                        "forEach does not await the callback.",
                        "for...of awaits sequentially and preserves predictable order."
                    ]
                },
                {
                    id: "d8-step-2",
                    title: "Parallelize safely with Promise.all",
                    subtitle: "Fast and clean",
                    teacherNote: "Same work, much faster. Notice we await once at the end.",
                    bugCode: `console.clear();

const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  // BUG: sequential (slow)
  const out = [];
  for (const ms of [120, 80, 50]) {
    await wait(ms);
    out.push(ms);
  }
  console.log("out:", out);
})();`,
                    bugFocus: { fromLine: 6, toLine: 11 },
                    fixCode: `console.clear();

const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  // FIX: parallel
  const out = await Promise.all([120, 80, 50].map(async (ms) => {
    await wait(ms);
    return ms;
  }));
  console.log("out:", out);
})();`,
                    fixFocus: { fromLine: 6, toLine: 12 },
                    whatToNotice: [
                        "Promise.all runs tasks concurrently.",
                        "Total time becomes roughly the slowest task, not the sum."
                    ]
                }
            ],
            code: `// Example 1: Async/Await
async function fetchData() {
try {
    const data = await fetch('/api');
    return data.json();
} catch (e) {
    console.log("Network Error");
}
}`,
            comparison: {
                junior: `// ❌ Mixing Styles
function getData() {
// Returns a promise but doesn't await it properly
return fetch('/api')
.then(r => r.json())
.then(data => {
   // Logic buried inside .then
   return process(data);
});
}`,
                senior: `// ✅ Flat Async/Await
async function getData() {
const res = await fetch('/api');
const data = await res.json();
// Linear logic, easy to read
return process(data);
}`
            },
            interview: {
                questions: [
                    { q: "Is `await` blocking?", a: "No. It suspends the *async function*, but yields control back to the event loop, allowing other events to process." },
                    { q: "What does an async function return?", a: "Always a Promise. Even if you return a primitive `return 1`, it wraps it `Promise.resolve(1)`." },
                    { q: "Can you use `await` in `forEach`?", a: "No. `forEach` expects a synchronous callback. The promises will be created but `forEach` won't wait for them. Use `for...of` instead." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "await pauses the async function, not the whole program.",
                    "Sequential awaits are easier but slower; Promise.all enables parallelism.",
                    "forEach does not await async callbacks; use for...of or Promise.all(map()).",
                    "Error handling is simplest with try/catch around awaits."
                ],
                commonMistakes: [
                    "Using await inside forEach and expecting it to wait.",
                    "Accidentally making independent requests sequential (slow).",
                    "Not handling partial failures when doing parallel work.",
                    "Catching errors without rethrowing when the caller should handle them."
                ],
                nextActions: [
                    "Rewrite a sequential loop into Promise.all and measure time difference.",
                    "Practice: make a helper that runs tasks in parallel but returns successes + errors separately."
                ]
            }
        },
        {
            day: 9,
            title: 'Day 9: Memory Leaks + Garbage Collection (Debug Like a Pro)',
            intro: "Most performance problems are memory problems. Today you’ll learn how GC thinks (reachability), the most common leak patterns, and how to prevent them with clean lifecycles.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The GC Mental Model (Reachability)</h3>
<p class="mb-6 text-light-300">
Garbage collection is not “freeing what you don’t use”. It’s freeing what is <span class="text-yellow-400 font-bold">unreachable</span>.
If something is reachable from a root (global objects, active stack frames), it stays alive.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) Mark and Sweep</h3>
<p class="mb-4 text-light-300">GC starts at roots and marks everything reachable.</p>
<ul class="list-disc list-inside space-y-2 text-light-300 bg-dark-800 p-4 rounded-lg mb-6">
<li><span class="text-yellow-400 font-bold">Mark:</span> "I can reach this object!" (Paint it white).</li>
<li><span class="text-yellow-400 font-bold">Sweep:</span> "I cannot reach that object!" (Delete it).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">2) Common Leak Patterns (Real World)</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
<div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
    <span class="text-red-400 font-bold block mb-2">Global Variables</span>
    Accidental <code class="bg-dark-700 text-brand-primary px-1 rounded">window.x = largeData</code> stays forever.
</div>
<div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
    <span class="text-red-400 font-bold block mb-2">Detached DOM</span>
    Removing an element from DOM but keeping a JS reference to it.
</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
  <div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
      <span class="text-red-400 font-bold block mb-2">Dangling listeners / intervals</span>
      Event listeners and setInterval callbacks can keep closures alive forever if not cleaned up.
  </div>
  <div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
      <span class="text-red-400 font-bold block mb-2">Caches that never evict</span>
      Maps used as caches can grow without bound if you never delete old keys.
  </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) WeakMap / WeakSet (Cache Without Keeping Things Alive)</h3>
<p class="mb-6 text-light-300">
WeakMap keys are weakly held: if the key object becomes unreachable elsewhere, GC can collect it and remove the entry.
This is great for associating metadata with objects without leaks.
</p>
            `,
            predictions: [
                {
                    prompt: "GC frees an object when…",
                    options: [
                        "it hasn’t been used in 5 seconds",
                        "it is unreachable from roots",
                        "you call delete(obj)",
                        "you call console.clear()"
                    ],
                    correctIndex: 1,
                    explanation: "GC is based on reachability. Unreachable objects are collected."
                },
                {
                    prompt: "Which data structure is best for attaching metadata to objects without preventing GC?",
                    options: ["Map", "WeakMap", "Array", "Set"],
                    correctIndex: 1,
                    explanation: "WeakMap keys do not prevent garbage collection of the key objects."
                }
            ],
            checkpoints: [
                {
                    prompt: "A common leak in UI apps is…",
                    options: [
                        "too many console.log calls",
                        "event listeners / intervals that aren’t cleaned up",
                        "using const instead of let",
                        "using async/await"
                    ],
                    correctIndex: 1,
                    explanation: "Dangling listeners/intervals keep closures and referenced objects alive."
                },
                {
                    prompt: "Why can a normal Map-based cache leak memory?",
                    options: [
                        "Maps are slow",
                        "Map keys are always strings",
                        "Entries stay until you delete them; caches can grow forever",
                        "GC can’t see Maps"
                    ],
                    correctIndex: 2,
                    explanation: "A Map strongly references keys/values. If you never evict, memory grows unbounded."
                }
            ],
            labSteps: [
                {
                    id: "d9-step-1",
                    title: "Event listener leak pattern",
                    subtitle: "Closure keeps big data alive",
                    teacherNote: "You can’t see GC here, but you can learn the pattern: what keeps what alive?",
                    bugCode: `console.clear();

function setup() {
  const huge = new Array(200000).fill("x").join("");
  document.body.addEventListener("click", () => {
    console.log("huge length:", huge.length);
  });
  console.log("listener added");
}
setup();`,
                    bugFocus: { fromLine: 3, toLine: 8 },
                    fixCode: `console.clear();

function setup() {
  const huge = new Array(200000).fill("x").join("");
  const handler = () => console.log("huge length:", huge.length);

  document.body.addEventListener("click", handler);
  console.log("listener added");

  // FIX: cleanup when done
  return () => document.body.removeEventListener("click", handler);
}

const cleanup = setup();
// cleanup(); // call this when feature/component unmounts`,
                    fixFocus: { fromLine: 5, toLine: 15 },
                    whatToNotice: [
                        "The handler closes over huge, keeping it reachable while the listener exists.",
                        "Cleanup breaks reachability so GC can collect later."
                    ]
                },
                {
                    id: "d9-step-2",
                    title: "Cache that grows forever",
                    subtitle: "Map without eviction",
                    teacherNote: "Caches need eviction. This demo shows unbounded growth.",
                    bugCode: `console.clear();

const cache = new Map();
for (let i = 0; i < 5000; i++) {
  cache.set({ id: i }, new Array(200).fill(i));
}
console.log("cache size:", cache.size);`,
                    bugFocus: { fromLine: 3, toLine: 6 },
                    fixCode: `console.clear();

// FIX: if you only need metadata keyed by object, prefer WeakMap
const cache = new WeakMap();
let lastKey = null;

for (let i = 0; i < 5000; i++) {
  const key = { id: i };
  cache.set(key, { payload: i });
  lastKey = key; // keep only one key strongly referenced
}
console.log("weakmap set done (cannot read size)");`,
                    fixFocus: { fromLine: 3, toLine: 12 },
                    whatToNotice: [
                        "Map keeps strong references; WeakMap does not prevent GC of keys.",
                        "WeakMap is not iterable and has no size—by design."
                    ]
                }
            ],
            code: `// Example 1: Event Listener Leak
function setup() {
const hugeString = new Array(1000000).join('x');

// This handler keeps 'hugeString' alive forever!
document.body.addEventListener('click', () => {
    console.log(hugeString.length);
});
}`,
            comparison: {
                junior: `// ❌ Dangling Listeners
useEffect(() => {
// Attaches a NEW listener every render
window.addEventListener('resize', handleResize);
// Forget to clean up! Leak!
});`,
                senior: `// ✅ Cleanup Function
useEffect(() => {
window.addEventListener('resize', handleResize);

// React runs this when component unmounts
return () => {
window.removeEventListener('resize', handleResize);
};
}, []);`
            },
            interview: {
                questions: [
                    { q: "How does Garbage Collection work in JS?", a: "Mark and Sweep algorithm. It starts from roots (Global/Stack) and marks all reachable objects. Anything not marked is swept (deleted)." },
                    { q: "Why use a WeakMap?", a: "To associate data with an object without preventing that object from being garbage collected (e.g., private data in libraries)." },
                    { q: "How to detect memory leaks?", a: "Chrome DevTools -> Memory Tab -> Heap Snapshot. Compare snapshots before/after an action." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "GC is about reachability: unreachable objects get collected.",
                    "Closures + listeners/intervals often keep data alive unintentionally.",
                    "Map caches can leak if they never evict; WeakMap avoids keeping keys alive.",
                    "Debug leaks using heap snapshots and comparing before/after."
                ],
                commonMistakes: [
                    "Attaching large objects to globals (roots).",
                    "Adding listeners/intervals without cleanup.",
                    "Building caches without eviction strategy.",
                    "Assuming WeakMap behaves like Map (it’s not iterable, no size)."
                ],
                nextActions: [
                    "Scan your own app for addEventListener/setInterval and confirm every one has a cleanup path.",
                    "In DevTools Memory tab, take two heap snapshots around a repeated action and compare."
                ]
            }
        },
        {
            day: 10,
            title: 'Day 10: Web Workers (Real Multithreading for JS)',
            intro: "The main thread is for UI. Heavy CPU work belongs in a worker. Today you’ll learn message passing, structured cloning cost, and a practical pattern using a Blob worker.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) Why Workers Matter</h3>
<p class="mb-6 text-light-300">
If you do heavy computation on the main thread, the UI freezes: clicks lag, animations stutter, inputs feel broken.
Workers let you move CPU work off the main thread while keeping the UI responsive.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) Main Thread vs Worker Thread</h3>
<p class="mb-4 text-light-300">Workers run in parallel. They do not share memory with the main thread by default.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-green-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ Main Thread (UI) ]        [ Worker Thread ]
   │                           │
   │  postMessage(data) ───▶   │
   │                           │
   │                    (Heavy Calc)
   │                           │
   │  ◀─── postMessage(res)    │
   ▼                           ▼
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) The Hidden Cost: Structured Cloning</h3>
<p class="mb-4 text-light-300">
postMessage copies data using structured cloning. Huge objects can be expensive to copy.
</p>
<p class="mb-6 text-light-300">
For high-performance scenarios, use Transferable objects (like ArrayBuffer) or SharedArrayBuffer (advanced).
</p>

<h3 class="text-xl font-bold text-white mb-4">3) Practical Pattern: Blob Workers</h3>
<p class="mb-6 text-light-300">
In many apps you don’t want to maintain a separate worker.js file. You can create a worker from a Blob string at runtime.
We’ll do that in the Guided Lab.
</p>
            `,
            predictions: [
                {
                    prompt: "Can a Web Worker directly access the DOM?",
                    options: ["Yes", "No", "Only with strict mode", "Only in Chrome"],
                    correctIndex: 1,
                    explanation: "Workers don’t have window/document. They must communicate with the main thread to update UI."
                },
                {
                    prompt: "Why can postMessage be slow with big objects?",
                    options: [
                        "Because it blocks the GPU",
                        "Because data is cloned (copied) by default",
                        "Because workers run on the same thread",
                        "Because JSON parsing is slow"
                    ],
                    correctIndex: 1,
                    explanation: "Structured cloning copies data. Large payloads cost time and memory."
                }
            ],
            checkpoints: [
                {
                    prompt: "Web Workers are best used for…",
                    options: [
                        "DOM updates",
                        "CPU-heavy computations",
                        "CSS animations",
                        "React rendering"
                    ],
                    correctIndex: 1,
                    explanation: "Workers are for compute. UI stays on main thread."
                },
                {
                    prompt: "How do workers communicate with the main thread?",
                    options: [
                        "Shared global variables",
                        "Direct function calls",
                        "Message passing (postMessage/onmessage)",
                        "Importing window"
                    ],
                    correctIndex: 2,
                    explanation: "Workers use message passing. No direct shared DOM or call stack."
                }
            ],
            labSteps: [
                {
                    id: "d10-step-1",
                    title: "UI freeze vs worker offload (conceptual demo)",
                    subtitle: "Same work, different place",
                    teacherNote: "In a real UI, the first version causes visible lag. We’ll still show the pattern clearly here.",
                    bugCode: `console.clear();

function heavy(n) {
  let x = 0;
  for (let i = 0; i < n; i++) x += i % 10;
  return x;
}

console.time("main-thread heavy");
console.log("result:", heavy(30_000_000));
console.timeEnd("main-thread heavy");`,
                    bugFocus: { fromLine: 3, toLine: 11 },
                    fixCode: `console.clear();

// FIX: move heavy computation into a worker (Blob worker)
const workerCode = \`
self.onmessage = (e) => {
  const n = e.data;
  let x = 0;
  for (let i = 0; i < n; i++) x += i % 10;
  self.postMessage(x);
};
\`;

const blob = new Blob([workerCode], { type: "text/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

console.time("worker heavy");
worker.onmessage = (e) => {
  console.log("result:", e.data);
  console.timeEnd("worker heavy");
  worker.terminate();
};
worker.postMessage(30_000_000);`,
                    fixFocus: { fromLine: 3, toLine: 22 },
                    whatToNotice: [
                        "Main thread stays free while worker computes.",
                        "Communication is via postMessage."
                    ]
                },
                {
                    id: "d10-step-2",
                    title: "Message payload size (structured clone cost)",
                    subtitle: "Don’t send huge JSON if you don’t need to",
                    teacherNote: "We’ll simulate the cost by sending a big array. Keep messages small or use transferables.",
                    bugCode: `console.clear();

const workerCode = \`
self.onmessage = (e) => {
  // echo back size
  self.postMessage(e.data.length);
};
\`;
const blob = new Blob([workerCode], { type: "text/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

const big = new Array(500000).fill(1);
console.time("postMessage big");
worker.onmessage = (e) => {
  console.timeEnd("postMessage big");
  console.log("worker saw length:", e.data);
  worker.terminate();
};
worker.postMessage(big);`,
                    bugFocus: { fromLine: 11, toLine: 18 },
                    fixCode: `console.clear();

const workerCode = \`
self.onmessage = (e) => {
  // do something tiny
  self.postMessage({ ok: true });
};
\`;
const blob = new Blob([workerCode], { type: "text/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

// FIX: send minimal data needed
console.time("postMessage small");
worker.onmessage = (e) => {
  console.timeEnd("postMessage small");
  console.log("worker replied:", e.data);
  worker.terminate();
};
worker.postMessage({ action: "ping" });`,
                    fixFocus: { fromLine: 13, toLine: 18 },
                    whatToNotice: [
                        "Bigger payloads cost more to copy.",
                        "Prefer small messages, or use transferables for performance-critical paths."
                    ]
                }
            ],
            code: `// Example 1: Basic Worker Logic
// main.js
const worker = new Worker('worker.js');
worker.postMessage(10);
worker.onmessage = (e) => console.log("Result:", e.data);

// worker.js
self.onmessage = (e) => {
const result = fibonacci(e.data);
self.postMessage(result);
};`,
            comparison: {
                junior: `// ❌ Freezing the UI
button.onclick = () => {
// This blocks the UI for 3 seconds
const result = calculatePrimes(10000000);
show(result);
};`,
                senior: `// ✅ Offloading to Worker
button.onclick = () => {
// UI stays responsive immediately
showLoading();
worker.postMessage({ action: 'primes', num: 10000000 });
};

worker.onmessage = (e) => {
hideLoading();
show(e.data);
};`
            },
            interview: {
                questions: [
                    { q: "Can Web Workers modify the DOM?", a: "No. They run in a separate thread without `window` or `document` access. They must message the main thread to update UI." },
                    { q: "What is the cost of postMessage?", a: "Serialization. Sending huge objects takes time to copy. Use SharedArrayBuffer or Transferable Objects for performance." },
                    { q: "Difference between Web Worker and Service Worker?", a: "Web Workers are for computation. Service Workers are for network interception (caching/offline) and act as a proxy." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "Workers run on a separate thread and cannot touch the DOM.",
                    "Main thread should stay responsive; move CPU-heavy work to workers.",
                    "postMessage copies data by default (structured clone), which can be costly.",
                    "Blob workers are a practical pattern to avoid separate worker files."
                ],
                commonMistakes: [
                    "Trying to access window/document inside a worker.",
                    "Sending huge objects over postMessage instead of small messages/transferables.",
                    "Forgetting to terminate workers when they’re no longer needed.",
                    "Using workers for tiny tasks (overhead can outweigh benefit)."
                ],
                nextActions: [
                    "Try the Blob worker guided lab and observe the pattern (postMessage/onmessage).",
                    "Refactor one heavy loop into a worker and keep UI work on main thread."
                ]
            }
        },
        // --- WEEK 3: ADVANCED PATTERNS ---
        {
            day: 11,
            title: 'Day 11: Functional Programming (Purity, Immutability, Composition)',
            intro: "FP is how you make code predictable. Today you’ll learn purity, immutability, composition, and how to build logic that is easy to test and hard to break.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) What You’re Building</h3>
<p class="mb-6 text-light-300">
You are building a “predictability engine”. The goal is not to write fancy code — the goal is to make bugs expensive to create.
FP does that by separating <span class="text-yellow-400 font-bold">logic</span> from <span class="text-yellow-400 font-bold">side effects</span>.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) Pure Functions (No Surprises)</h3>
<p class="mb-4 text-light-300">
A function is <span class="text-yellow-400 font-bold">pure</span> if:
</p>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6 bg-dark-800 p-4 rounded-lg">
  <li>Same input → same output (deterministic)</li>
  <li>No side effects (doesn’t mutate outer state, DOM, network)</li>
</ul>

<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
      <span class="text-red-400 font-bold block mb-2">Impure</span>
      Reads/writes global state, mutates input, updates UI, calls APIs.
  </div>
  <div class="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
      <span class="text-green-400 font-bold block mb-2">Pure</span>
      Input → output. No hidden reads/writes. Easy to test.
  </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Immutability (So Change Is Visible)</h3>
<p class="mb-4 text-light-300">
Immutability means you don’t mutate existing objects/arrays — you create new ones.
This makes changes obvious and enables cheap comparisons (important in React and state systems).
</p>

<div class="bg-dark-900 p-4 rounded-xl mb-8 font-mono text-sm text-light-200 overflow-x-auto border border-dark-600">
<pre><code>
// Good: copy update
const user = { name: "John", score: 10 };
const updated = { ...user, score: 20 };
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Composition (Small Functions → Big Power)</h3>
<p class="mb-4 text-light-300">
Composition is building complex behavior by chaining small functions.
If each function is pure, the pipeline becomes easy to reason about.
</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto border border-dark-600">
<pre><code>
const toUpper = (s) => s.toUpperCase();
const exclaim = (s) => s + "!";
// compose(exclaim, toUpper)("hi") -> "HI!"
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">4) The Practical FP Trio: map / filter / reduce</h3>
<p class="mb-4 text-light-300">
These let you build transformations without mutating arrays.
The “teacher trick” is to read them as sentences:
</p>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6 bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-400 font-bold">filter</span>: keep only items that match</li>
  <li><span class="text-yellow-400 font-bold">map</span>: transform each item</li>
  <li><span class="text-yellow-400 font-bold">reduce</span>: fold into a single value</li>
</ul>

<details class="mb-6 bg-dark-800 border border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-light-100">Why FP matters in real teams</summary>
  <div class="mt-3 text-light-300 space-y-3">
    <p>Pure logic is easy to test. Side effects are isolated. This reduces regressions and makes refactoring safe.</p>
  </div>
</details>
            `,
            predictions: [
                {
                    prompt: "Which is a pure function?",
                    options: [
                        "function add(a,b){ return a+b }",
                        "function add(a,b){ total += a+b; return total }",
                        "function add(a,b){ document.title = a+b; return a+b }",
                        "function add(a,b){ return Math.random() + a + b }"
                    ],
                    correctIndex: 0,
                    explanation: "A pure function is deterministic and has no side effects. Only the first option satisfies both."
                },
                {
                    prompt: "In compose(f, g), which runs first for compose(f, g)(x)?",
                    options: ["f then g", "g then f", "both at the same time", "random"],
                    correctIndex: 1,
                    explanation: "compose(f, g)(x) means f(g(x)) so g runs first."
                }
            ],
            checkpoints: [
                {
                    prompt: "Immutability helps because…",
                    options: [
                        "it makes code run faster always",
                        "it makes changes explicit and prevents hidden side effects",
                        "it prevents garbage collection",
                        "it replaces unit tests"
                    ],
                    correctIndex: 1,
                    explanation: "Immutability reduces surprise by preventing in-place mutation and makes data flow easier to reason about."
                },
                {
                    prompt: "Which is the best way to update an object in React state?",
                    options: [
                        "mutate the object then setState(object)",
                        "delete and re-add properties",
                        "create a new object with spread and setState(newObj)",
                        "store everything in global variables"
                    ],
                    correctIndex: 2,
                    explanation: "React relies on reference changes. Immutable updates create new references."
                }
            ],
            labSteps: [
                {
                    id: "d11-step-1",
                    title: "Mutation bug: function silently changes inputs",
                    subtitle: "Why your data changes 'by itself'",
                    teacherNote: "Predict what happens to the original array after calling the function. Then fix by copying.",
                    bugCode: `console.clear();

function addItem(arr, item) {
  // BUG: mutates input
  arr.push(item);
  return arr;
}

const original = [1, 2, 3];
const out = addItem(original, 99);
console.log("out:", out);
console.log("original:", original);`,
                    bugFocus: { fromLine: 3, toLine: 6 },
                    fixCode: `console.clear();

function addItem(arr, item) {
  // FIX: return a new array
  return [...arr, item];
}

const original = [1, 2, 3];
const out = addItem(original, 99);
console.log("out:", out);
console.log("original:", original);`,
                    fixFocus: { fromLine: 3, toLine: 6 },
                    whatToNotice: [
                        "Mutating inputs creates hidden side effects.",
                        "Copy-on-write makes behavior predictable."
                    ]
                },
                {
                    id: "d11-step-2",
                    title: "Composition order bug",
                    subtitle: "compose vs pipe confusion",
                    teacherNote: "Predict the output. Then fix by using the correct order.",
                    bugCode: `console.clear();

const toUpper = (s) => s.toUpperCase();
const exclaim = (s) => s + "!";

const compose = (f, g) => (x) => g(f(x)); // BUG: wrong order
const shout = compose(exclaim, toUpper);
console.log(shout("hello"));`,
                    bugFocus: { fromLine: 6, toLine: 7 },
                    fixCode: `console.clear();

const toUpper = (s) => s.toUpperCase();
const exclaim = (s) => s + "!";

// FIX: compose(f, g)(x) = f(g(x))
const compose = (f, g) => (x) => f(g(x));
const shout = compose(exclaim, toUpper);
console.log(shout("hello"));`,
                    fixFocus: { fromLine: 7, toLine: 9 },
                    whatToNotice: [
                        "compose reads right-to-left: f(g(x)).",
                        "If you prefer left-to-right, implement pipe."
                    ]
                }
            ],
            code: `// Example 1: Immutability
const user = { name: "John", score: 10 };

// Bad (Mutation)
// user.score = 20; 

// Good (Copy)
const updatedUser = { ...user, score: 20 };`,
            comparison: {
                junior: `// ❌ Side Effects (Hard to Test)
let total = 0;
function addToTotal(amount) {
total += amount; // Modifies external state
updateUI(total); // Modifies DOM
}`,
                senior: `// ✅ Pure Function (Predictable)
const add = (a, b) => a + b;

// Logic is separated from Side Effects
const newTotal = add(total, amount);
updateUI(newTotal);`
            },
            interview: {
                questions: [
                    { q: "What is a Higher Order Function?", a: "A function that takes a function as an argument OR returns a function. Example: `.map()`, `.filter()`." },
                    { q: "Why is Immutability important in React?", a: "React uses shallow comparison to detect changes. If you mutate an object, the reference stays the same, so React won't re-render." },
                    { q: "What is Currying?", a: "Transforming a function with multiple args `f(a,b)` into a sequence of functions `f(a)(b)`." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "Pure functions are deterministic and have no side effects.",
                    "Immutability makes changes explicit and prevents hidden mutation bugs.",
                    "Composition turns small functions into powerful pipelines.",
                    "map/filter/reduce let you transform data without mutating it."
                ],
                commonMistakes: [
                    "Mutating function arguments (arrays/objects) inside helpers.",
                    "Mixing side effects into core logic (hard to test).",
                    "Implementing compose/pipe in the wrong direction.",
                    "Overusing FP style where readability suffers — keep it practical."
                ],
                nextActions: [
                    "Pick one function in your project and refactor it to be pure.",
                    "Practice composing 3 small functions into one pipeline.",
                    "Write 3 transformations using filter → map → reduce."
                ]
            }
        },
        {
            day: 12,
            title: 'Day 12: Currying & Partial Application (Make APIs Cleaner)',
            intro: "Currying is not a trick — it’s a tool for building reusable, configurable functions. Today you’ll learn currying vs partial application and build tiny factories you’ll actually use.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The Intuition</h3>
<p class="mb-6 text-light-300">
Currying converts a function that takes many arguments into a chain of functions that take one argument.
The benefit is: you can create <span class="text-yellow-400 font-bold">specialized functions</span> from generic ones.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) The Concept</h3>
<p class="mb-4 text-light-300">
Instead of <code class="bg-dark-800 px-1 rounded">add(1, 2)</code>, we write <code class="bg-dark-800 px-1 rounded">add(1)(2)</code>.
You can think of it as: “lock in the first argument now, supply the rest later.”
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ Generic ]         [ Specific ]
add(x) ────▶  add(10)  ────▶  add10(y)
│
└────▶ Returns a Function waiting for 'y'
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Currying vs Partial Application</h3>
<div class="bg-dark-800 border border-dark-600 rounded-xl p-4 mb-6 text-light-300">
  <ul class="list-disc list-inside space-y-2">
    <li><span class="text-yellow-400 font-bold">Currying</span>: transforms a function into nested unary functions.</li>
    <li><span class="text-yellow-400 font-bold">Partial application</span>: fixes some arguments and returns a function expecting the rest (arity reduced).</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Real Use Cases</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6 bg-dark-800 p-4 rounded-lg">
  <li>Event handlers: build handlers like <code class="bg-dark-900 px-1 rounded">onChange("email")</code></li>
  <li>Configuration: build validators, loggers, formatters with fixed config</li>
  <li>Composition: unary functions are easier to pipe/compose</li>
</ul>
            `,
            predictions: [
                {
                    prompt: "Predict: What does sum(2)(3) return if sum = a => b => a + b ?",
                    options: ["5", "23", "undefined", "a function"],
                    correctIndex: 0,
                    explanation: "sum(2) returns a function that adds 2; then calling with 3 returns 5."
                },
                {
                    prompt: "Which describes partial application?",
                    options: [
                        "Turning a 2-arg function into a chain of unary functions",
                        "Fixing some arguments and returning a new function expecting the rest",
                        "Executing functions in parallel",
                        "Replacing classes"
                    ],
                    correctIndex: 1,
                    explanation: "Partial application fixes some parameters and returns a function with fewer remaining parameters."
                }
            ],
            checkpoints: [
                {
                    prompt: "Why does currying help composition?",
                    options: [
                        "Because it makes every function unary, which pipelines handle cleanly",
                        "Because it prevents GC",
                        "Because it makes JS faster",
                        "Because it removes async"
                    ],
                    correctIndex: 0,
                    explanation: "Unary functions fit compose/pipe patterns well; you can build predictable pipelines."
                },
                {
                    prompt: "Which is a common practical use of currying in UI code?",
                    options: [
                        "Creating event handlers with a fixed field name",
                        "Replacing React",
                        "Avoiding modules",
                        "Making DOM faster"
                    ],
                    correctIndex: 0,
                    explanation: "Curried handlers help avoid repetitive boilerplate for each field."
                }
            ],
            labSteps: [
                {
                    id: "d12-step-1",
                    title: "Curry bug: forgetting to return the inner function",
                    subtitle: "Why it becomes undefined",
                    teacherNote: "Predict what double(10) prints. Then fix by returning the inner function.",
                    bugCode: `console.clear();

const multiply = (a) => {
  (b) => a * b; // BUG: forgot return
};
const double = multiply(2);
console.log(double);`,
                    bugFocus: { fromLine: 3, toLine: 6 },
                    fixCode: `console.clear();

const multiply = (a) => (b) => a * b;
const double = multiply(2);
console.log("double(10):", double(10));`,
                    fixFocus: { fromLine: 3, toLine: 4 },
                    whatToNotice: [
                        "Currying relies on returning functions.",
                        "Console logging the function is a quick sanity check."
                    ]
                },
                {
                    id: "d12-step-2",
                    title: "Partial application helper",
                    subtitle: "Fix the first argument cleanly",
                    teacherNote: "Build a simple partial(fn, a) that fixes the first arg.",
                    bugCode: `console.clear();

function partial(fn, fixed) {
  // TODO: implement
}

const add = (a, b) => a + b;
const add10 = partial(add, 10);
console.log("add10(5):", add10(5));`,
                    bugFocus: { fromLine: 3, toLine: 5 },
                    fixCode: `console.clear();

function partial(fn, fixed) {
  return function (...rest) {
    return fn(fixed, ...rest);
  };
}

const add = (a, b) => a + b;
const add10 = partial(add, 10);
console.log("add10(5):", add10(5));`,
                    fixFocus: { fromLine: 3, toLine: 8 },
                    whatToNotice: [
                        "Partial application reduces boilerplate and clarifies intent.",
                        "Rest parameters make it flexible."
                    ]
                }
            ],
            code: `// Example 1: Simple Curry
const multiply = (a) => (b) => a * b;
const double = multiply(2);
console.log(double(10)); // 20

// Example 2: React Handler
const handleChange = (field) => (e) => {
setState({ [field]: e.target.value });
};
// usage: onChange={handleChange('email')}`,
            comparison: {
                junior: `// ❌ Repetitive Code
const filterDogs = (items) => items.filter(i => i.type === 'dog');
const filterCats = (items) => items.filter(i => i.type === 'cat');
const filterBirds = (items) => items.filter(i => i.type === 'bird');`,
                senior: `// ✅ Curried Factory
const filterBy = (type) => (items) => 
items.filter(i => i.type === type);

const dogs = filterBy('dog')(items);
const cats = filterBy('cat')(items);`
            },
            interview: {
                questions: [
                    { q: "Difference between Currying and Partial Application?", a: "Currying breaks a function into N unary functions (1 arg each). Partial application fixes some arguments and produces a function with smaller arity." },
                    { q: "Why use Currying in functional composition?", a: "It makes functions unary (single argument), which makes them easily chainable in a pipeline `compose(f, g, h)`." },
                    { q: "Write a `sum(2)(3)` function.", a: "`const sum = a => b => a + b;`" }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "Currying creates specialized functions by returning functions step-by-step.",
                    "Partial application fixes some arguments and returns a smaller-arity function.",
                    "Unary functions are easier to compose/pipe.",
                    "In UI code, curried handlers reduce repetitive boilerplate."
                ],
                commonMistakes: [
                    "Forgetting to return the inner function.",
                    "Over-currying everything (hurts readability).",
                    "Confusing currying with partial application.",
                    "Capturing mutable outer state unintentionally."
                ],
                nextActions: [
                    "Create 3 specialized functions from one generic factory (filterBy/type, formatCurrency/locale, etc.).",
                    "Use partial() to build a configured logger or validator."
                ]
            }
        },
        {
            day: 13,
            title: 'Day 13: Proxy + Reflect (Powerful Meta‑Programming)',
            intro: "Proxies let you intercept reads/writes/calls like a runtime firewall. Today you’ll learn the traps, how Reflect forwards correctly, and how frameworks use Proxies for reactivity.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The Mental Model</h3>
<p class="mb-6 text-light-300">
A Proxy is a programmable layer between you and a target object. It can validate, log, provide defaults, enforce invariants, and even virtualize properties.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) The Middleman</h3>
<p class="mb-4 text-light-300">
A Proxy sits between you and the target. Every operation can be intercepted by a trap (get/set/has/ownKeys/apply/construct…).
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-blue-300 mb-6 overflow-x-auto shadow-inner">
<pre>
   [ User ] ──▶ [ Proxy ] ──▶ [ Target Object ]
                   │
              [ Trap: get ]
              "You accessed property 'x'"
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Real Use Cases</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 bg-dark-800 p-4 rounded-lg mb-6">
<li><span class="text-yellow-400 font-bold">Validation:</span> Reject invalid types on assignment.</li>
<li><span class="text-yellow-400 font-bold">Data Binding:</span> Vue 3 uses Proxies for reactivity.</li>
<li><span class="text-yellow-400 font-bold">Logging:</span> Debug property access.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3) Reflect (The Correct Way to Forward)</h3>
<p class="mb-6 text-light-300">
Reflect provides functions that correspond to traps. Using Reflect keeps behavior consistent with default JS semantics.
Example: use <code class="bg-dark-900 px-1 rounded">Reflect.get</code> and <code class="bg-dark-900 px-1 rounded">Reflect.set</code> inside get/set traps.
</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200">
    <span class="text-yellow-400 font-bold">Teacher warning:</span> Many Proxy bugs come from forgetting to return true in set traps or breaking invariants (like non-configurable properties).
  </p>
</div>
            `,
            predictions: [
                {
                    prompt: "In a Proxy set trap, what must you return to indicate success?",
                    options: ["the value", "true", "false", "nothing (undefined)"],
                    correctIndex: 1,
                    explanation: "The set trap should return true when the assignment succeeded. Returning false can throw in strict mode."
                },
                {
                    prompt: "Why use Reflect inside traps?",
                    options: [
                        "It makes code shorter only",
                        "It forwards operations with correct default semantics",
                        "It disables traps",
                        "It makes Promises faster"
                    ],
                    correctIndex: 1,
                    explanation: "Reflect mirrors internal JS operations so your proxy stays consistent with standard behavior."
                }
            ],
            checkpoints: [
                {
                    prompt: "A Proxy is best described as…",
                    options: [
                        "a copy of an object",
                        "a wrapper that intercepts operations on a target",
                        "a JSON parser",
                        "a garbage collector tool"
                    ],
                    correctIndex: 1,
                    explanation: "Proxy traps let you intercept fundamental operations like get/set/call."
                },
                {
                    prompt: "Which is a common real-world Proxy use case?",
                    options: ["GPU rendering", "reactivity/validation/logging", "database transactions", "CSS layout"],
                    correctIndex: 1,
                    explanation: "Frameworks use proxies for reactivity; apps use them for validation and observability."
                }
            ],
            labSteps: [
                {
                    id: "d13-step-1",
                    title: "set trap bug: missing return true",
                    subtitle: "Silent failure / strict-mode errors",
                    teacherNote: "Predict what happens when you assign. Then fix by returning Reflect.set (boolean).",
                    bugCode: `console.clear();

const target = {};
const p = new Proxy(target, {
  set(obj, prop, value) {
    obj[prop] = value;
    // BUG: forgot return true
  }
});

try {
  p.age = 10;
  console.log("age:", p.age);
} catch (e) {
  console.log("error:", e.message);
}`,
                    bugFocus: { fromLine: 4, toLine: 8 },
                    fixCode: `console.clear();

const target = {};
const p = new Proxy(target, {
  set(obj, prop, value) {
    // FIX: forward with Reflect (returns boolean)
    return Reflect.set(obj, prop, value);
  }
});

p.age = 10;
console.log("age:", p.age);`,
                    fixFocus: { fromLine: 4, toLine: 7 },
                    whatToNotice: [
                        "set trap must return a boolean.",
                        "Reflect.set preserves standard semantics."
                    ]
                },
                {
                    id: "d13-step-2",
                    title: "Default values via get trap",
                    subtitle: "Make missing keys predictable",
                    teacherNote: "This pattern is powerful, but don’t hide real bugs—use it intentionally.",
                    bugCode: `console.clear();

const config = new Proxy({}, {
  get(obj, prop) {
    return obj[prop]; // returns undefined often
  }
});

console.log("mode:", config.mode);
console.log("timeout:", config.timeout);`,
                    bugFocus: { fromLine: 3, toLine: 6 },
                    fixCode: `console.clear();

const defaults = { mode: "prod", timeout: 5000 };
const config = new Proxy({}, {
  get(obj, prop) {
    if (prop in obj) return obj[prop];
    if (prop in defaults) return defaults[prop];
    return undefined;
  }
});

console.log("mode:", config.mode);
console.log("timeout:", config.timeout);`,
                    fixFocus: { fromLine: 3, toLine: 10 },
                    whatToNotice: [
                        "Proxies can provide defaults and enforce policy centrally.",
                        "Use with care: defaulting can hide typos if you’re not strict."
                    ]
                }
            ],
            code: `// Example 1: Validation Proxy
const validator = {
set: (obj, prop, value) => {
if (prop === 'age' && value < 0) {
  throw new Error("Age must be positive");
}
obj[prop] = value;
return true;
}
};

const person = new Proxy({}, validator);
person.age = 25; // OK
// person.age = -5; // Error`,
            comparison: {
                junior: `// ❌ Manual Getters/Setters everywhere
class User {
setAge(age) {
if (age < 0) throw new Error();
this.age = age;
}
setName(name) {
if (!name) throw new Error();
this.name = name;
}
}`,
                senior: `// ✅ Generic Proxy Validator
const safeObj = new Proxy({}, {
set(target, prop, val) {
if (prop === 'age' && val < 0) throw 'Invalid';
target[prop] = val;
return true;
}
});
// Works for any property dynamically`
            },
            interview: {
                questions: [
                    { q: "What is the `Reflect` API?", a: "It provides methods corresponding to Proxy traps (e.g., `Reflect.set`). It allows you to forward operations to the original object cleanly." },
                    { q: "Can you proxy a function?", a: "Yes. You can use the `apply` trap to intercept function calls." },
                    { q: "Why use Proxy over `Object.defineProperty`?", a: "Proxy can intercept dynamic properties that don't exist yet. `defineProperty` only works on specific, known keys." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "Proxy intercepts fundamental operations (get/set/call/etc.) using traps.",
                    "Reflect forwards operations using standard JS semantics (recommended in traps).",
                    "Proxies are powerful for validation, logging, defaults, and reactivity.",
                    "Breaking Proxy invariants or returning wrong values creates hard-to-debug bugs."
                ],
                commonMistakes: [
                    "Forgetting to return true/boolean from set traps.",
                    "Implementing get/set without Reflect and accidentally changing semantics.",
                    "Using proxies to hide typos (silent bugs).",
                    "Violating invariants (e.g., non-configurable property rules)."
                ],
                nextActions: [
                    "Build a validation proxy that enforces types for a config object.",
                    "Create a logging proxy that records all get/set operations for debugging."
                ]
            }
        },
        {
            day: 14,
            title: 'Day 14: Iterators & Generators (Lazy Sequences)',
            intro: "Iterators power for...of, spread, and many built-ins. Generators make iterators readable and enable lazy sequences that don’t allocate big arrays.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The Big Idea</h3>
<p class="mb-6 text-light-300">
An iterator is an object with a <code class="bg-dark-900 px-1 rounded">next()</code> method that returns
<code class="bg-dark-900 px-1 rounded">{ value, done }</code>.
If an object has <code class="bg-dark-900 px-1 rounded">Symbol.iterator</code>, it can be used by for...of and spread.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) Symbol.iterator</h3>
<p class="mb-4 text-light-300">Any object that implements this symbol can be iterated.</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre>
const range = {
from: 1,
to: 5,
[Symbol.iterator]() { ... }
};

for(let num of range) { ... }
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Generators (Readable Iterators)</h3>
<p class="mb-6 text-light-300">
Generators (<code class="bg-dark-900 px-1 rounded">function*</code>) let you write iterators using <code class="bg-dark-900 px-1 rounded">yield</code>.
Each yield produces the next value lazily.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) Why This Matters</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6 bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-400 font-bold">Lazy</span>: don’t allocate big arrays; generate values on demand.</li>
  <li><span class="text-yellow-400 font-bold">Composable</span>: you can build pipelines (filter/map) over generators.</li>
  <li><span class="text-yellow-400 font-bold">Protocol</span>: works with for...of, spread, destructuring patterns.</li>
</ul>
            `,
            predictions: [
                {
                    prompt: "What must an iterator return from next()?",
                    options: [
                        "{ val, end }",
                        "{ value, done }",
                        "an array of values",
                        "a Promise"
                    ],
                    correctIndex: 1,
                    explanation: "Iterator protocol requires next() to return an object with {value, done}."
                },
                {
                    prompt: "Generators are useful because they…",
                    options: [
                        "make code multithreaded",
                        "create lazy sequences with yield",
                        "remove the need for functions",
                        "replace promises"
                    ],
                    correctIndex: 1,
                    explanation: "Generators let you yield values lazily, producing sequences on demand."
                }
            ],
            checkpoints: [
                {
                    prompt: "for...of iterates over…",
                    options: [
                        "object keys only",
                        "values produced by Symbol.iterator",
                        "only arrays",
                        "only strings"
                    ],
                    correctIndex: 1,
                    explanation: "for...of uses the iterator protocol (Symbol.iterator) to get values."
                },
                {
                    prompt: "Spread operator on an object works when…",
                    options: [
                        "object has Symbol.iterator",
                        "object is frozen",
                        "object has toString",
                        "object is a Proxy"
                    ],
                    correctIndex: 0,
                    explanation: "Spread for iteration (`[...obj]`) requires an iterator via Symbol.iterator."
                }
            ],
            labSteps: [
                {
                    id: "d14-step-1",
                    title: "Broken iterator (done never becomes true)",
                    subtitle: "Infinite loop hazard",
                    teacherNote: "Predict what happens. Then fix by setting done true at the end.",
                    bugCode: `console.clear();

const badRange = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let cur = this.from;
    return {
      next() {
        return { value: cur++, done: false }; // BUG: never done
      }
    };
  }
};

// Don't actually spread this (would be infinite)
let count = 0;
for (const x of badRange) {
  console.log(x);
  count++;
  if (count >= 5) break; // safety
}`,
                    bugFocus: { fromLine: 9, toLine: 10 },
                    fixCode: `console.clear();

const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let cur = this.from;
    const to = this.to;
    return {
      next() {
        if (cur <= to) return { value: cur++, done: false };
        return { value: undefined, done: true };
      }
    };
  }
};

console.log([...range]);`,
                    fixFocus: { fromLine: 10, toLine: 14 },
                    whatToNotice: [
                        "done must become true to end iteration.",
                        "Iterators control flow; mistakes can create infinite loops."
                    ]
                },
                {
                    id: "d14-step-2",
                    title: "Generator range (clean iterator)",
                    subtitle: "yield makes it readable",
                    teacherNote: "Same behavior, far less code. This is why generators exist.",
                    bugCode: `console.clear();

function* range(from, to) {
  // TODO: implement
}

console.log([...range(1, 5)]);`,
                    bugFocus: { fromLine: 3, toLine: 4 },
                    fixCode: `console.clear();

function* range(from, to) {
  for (let x = from; x <= to; x++) {
    yield x;
  }
}

console.log([...range(1, 5)]);`,
                    fixFocus: { fromLine: 3, toLine: 7 },
                    whatToNotice: [
                        "yield produces values lazily.",
                        "Generators implement the iterator protocol automatically."
                    ]
                }
            ],
            code: `// Example 1: Custom Iterator
const myCollection = {
items: [10, 20, 30],
*[Symbol.iterator]() {
for (let item of this.items) {
  yield item;
}
}
};

console.log([...myCollection]); // [10, 20, 30]`,
            comparison: {
                junior: `// ❌ Exposed Internal Array
class Deck {
constructor() { this.cards = [/*...*/]; }
}

const deck = new Deck();
// Client has to know 'cards' exists
for(let card of deck.cards) {}`,
                senior: `// ✅ Iterator Protocol
class Deck {
constructor() { this.cards = [/*...*/]; }

// Make the Deck itself iterable
*[Symbol.iterator]() {
 for(let c of this.cards) yield c;
}
}

// Cleaner API
for(let card of new Deck()) {}`
            },
            interview: {
                questions: [
                    { q: "What is a Generator function?", a: "A function declared with `function*` that returns a Generator object. It can pause execution with `yield`." },
                    { q: "Difference between `for...in` and `for...of`?", a: "`for...in` iterates keys (enumerable properties). `for...of` iterates values (using the iterator protocol)." },
                    { q: "How does `async` await relate to generators?", a: "Async/await is syntactic sugar for a Generator that yields Promises, driven by a runner function." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "Iterator protocol is next() returning {value, done}.",
                    "Symbol.iterator makes an object usable by for...of and spread.",
                    "Generators provide a readable way to create iterators using yield.",
                    "Lazy sequences reduce memory usage and enable clean pipelines."
                ],
                commonMistakes: [
                    "Never returning done: true (infinite iteration).",
                    "Confusing for...in (keys) with for...of (values).",
                    "Returning wrong shape from next() (missing value/done).",
                    "Trying to iterate non-iterables with spread."
                ],
                nextActions: [
                    "Implement a custom iterable range and spread it.",
                    "Write a generator that yields filtered values from another iterable."
                ]
            }
        },
        {
            day: 15,
            title: 'Day 15: ES Modules vs CommonJS (Practical Mental Models)',
            intro: "This is where real-world JS apps break: module boundaries, import/export behavior, and runtime differences. Today you’ll build the mental model that prevents bundler and Node confusion.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The Simplest Truth</h3>
<p class="mb-6 text-light-300">
CommonJS is dynamic and runtime-based. ES Modules are static and analyzable.
That single difference explains tree-shaking, top-level await, and why bundlers prefer ESM.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) CommonJS (Node.js Legacy)</h3>
<p class="mb-4 text-light-300">Dynamic. Synchronous. Uses require/module.exports.</p>
<code class="block bg-dark-900 p-2 rounded mb-4">const fs = require('node:fs');</code>

<h3 class="text-xl font-bold text-white mb-4">2) ES Modules (Standard)</h3>
<p class="mb-4 text-light-300">Static. Keyword-based. Enables tooling and tree-shaking.</p>
<code class="block bg-dark-900 p-2 rounded mb-6">import fs from 'node:fs';</code>

<h3 class="text-xl font-bold text-white mb-4">3) Tree Shaking (Why Bundlers Love ESM)</h3>
<p class="mb-6 text-light-300">
Tree shaking removes unused exports. It works when imports are static (ESM).
With CommonJS, require can be conditional, so tooling cannot safely know what’s needed without running code.
</p>

<h3 class="text-xl font-bold text-white mb-4">4) Export Types (Default vs Named)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6 bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-400 font-bold">Named exports</span>: stable API, easier refactors</li>
  <li><span class="text-yellow-400 font-bold">Default exports</span>: convenient but easier to rename accidentally</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">5) “Live bindings” (Why ESM feels different)</h3>
<p class="mb-6 text-light-300">
ESM exports are live bindings (they reflect updates), not copied values. That is why some patterns behave differently than people expect.
We’ll simulate the concept in the Guided Lab (without real modules).
</p>
            `,
            predictions: [
                {
                    prompt: "Why can bundlers tree-shake ES Modules better than CommonJS?",
                    options: [
                        "Because ESM runs faster",
                        "Because ESM imports are static and analyzable",
                        "Because CJS is async",
                        "Because ESM avoids Promises"
                    ],
                    correctIndex: 1,
                    explanation: "Static imports let tools build a dependency graph without executing code, enabling dead-code elimination."
                },
                {
                    prompt: "In Node.js, a file is treated as ESM usually when…",
                    options: [
                        "it uses console.log",
                        "package.json has type: module or file ends with .mjs",
                        "it imports React",
                        "it uses strict mode"
                    ],
                    correctIndex: 1,
                    explanation: "Node decides module system via extension and package.json type. Mixed usage causes runtime errors."
                }
            ],
            checkpoints: [
                {
                    prompt: "Which statement about CommonJS is true?",
                    options: [
                        "Imports are always static",
                        "require can be conditional/dynamic at runtime",
                        "It supports top-level await by default",
                        "It has live bindings"
                    ],
                    correctIndex: 1,
                    explanation: "CommonJS require can be dynamic, which is why tooling has less compile-time certainty."
                },
                {
                    prompt: "Which export style is generally better for large codebases?",
                    options: ["default exports everywhere", "named exports for most modules", "no exports", "globals"],
                    correctIndex: 1,
                    explanation: "Named exports reduce ambiguity and improve refactoring safety."
                }
            ],
            labSteps: [
                {
                    id: "d15-step-1",
                    title: "Default vs named confusion (simulated)",
                    subtitle: "Why you get 'is not a function'",
                    teacherNote: "We simulate import mistakes by destructuring wrong shapes. The mental model transfers to modules.",
                    bugCode: `console.clear();

// Imagine this is what your module exports:
const moduleExports = { add: (a, b) => a + b, default: () => "log" };

// BUG: you thought add was default
const log = moduleExports.add;
console.log(log(1, 2)); // works, but wrong intent

// BUG: you thought default was named
const { logFn } = moduleExports;
console.log(logFn());`,
                    bugFocus: { fromLine: 10, toLine: 12 },
                    fixCode: `console.clear();

const moduleExports = { add: (a, b) => a + b, default: () => "log" };

// FIX: default vs named are different slots
const log = moduleExports.default;
const { add } = moduleExports;

console.log("log():", log());
console.log("add(1,2):", add(1, 2));`,
                    fixFocus: { fromLine: 6, toLine: 11 },
                    whatToNotice: [
                        "Default and named exports are different shapes.",
                        "Many module bugs are simply importing the wrong shape."
                    ]
                },
                {
                    id: "d15-step-2",
                    title: "Live binding concept (simulated)",
                    subtitle: "Reference vs copy intuition",
                    teacherNote: "This simulation builds the intuition: some imports behave like live views, not copies.",
                    bugCode: `console.clear();

// Simulate 'copied value' behavior
let counter = 0;
const exportedValue = counter; // copy now

counter++;
console.log("counter:", counter);
console.log("exportedValue:", exportedValue);`,
                    bugFocus: { fromLine: 5, toLine: 6 },
                    fixCode: `console.clear();

// Simulate 'live binding' behavior using a getter
let counter = 0;
const exports = {
  get counter() { return counter; }
};

counter++;
console.log("counter:", counter);
console.log("exports.counter:", exports.counter);`,
                    fixFocus: { fromLine: 4, toLine: 9 },
                    whatToNotice: [
                        "A copied value doesn’t update.",
                        "A live view (getter) reflects the latest value — similar intuition to ESM live bindings."
                    ]
                }
            ],
            code: `// Example: Named vs Default Exports
// lib.js
export const add = (a, b) => a + b;
export default function log() { ... }

// main.js
import log, { add } from './lib.js';`,
            comparison: {
                junior: `// ❌ Loading Everything (CommonJS)
// Creates a huge bundle
const _ = require('lodash');
_.map([1,2], n => n*2);`,
                senior: `// ✅ Tree Shaking (ESM)
// Bundler can remove unused code
import { map } from 'lodash-es';
map([1,2], n => n*2);`
            },
            interview: {
                questions: [
                    { q: "Why is ESM better for bundlers?", a: "Because the import structure is static, bundlers can build a dependency graph without running the code, enabling Tree Shaking (dead code elimination)." },
                    { q: "Can you use `require` and `import` in the same file?", a: "Usually no. Node.js treats files as either CJS or ESM based on extension (.mjs vs .cjs) or package.json type." },
                    { q: "How to use Top-Level Await?", a: "It is only available in ES Modules. It allows `await` outside of async functions at the root of the module." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "CommonJS is dynamic (runtime require). ESM is static (import/export).",
                    "Static imports enable tree shaking and better tooling.",
                    "Default exports and named exports have different shapes — many bugs are import-shape bugs.",
                    "ESM exports behave like live bindings (intuition: live view, not copy)."
                ],
                commonMistakes: [
                    "Mixing require and import without understanding Node module mode.",
                    "Assuming default export is the same as a named export.",
                    "Using CommonJS in codebases where bundling/tree-shaking is important.",
                    "Expecting imported values to behave like snapshots in every case."
                ],
                nextActions: [
                    "Pick one module in your codebase and convert it to named exports.",
                    "Confirm your Node module mode (package.json type) and standardize it across the repo."
                ]
            }
        },
        {
            day: 16,
            title: 'Day 16: Sets & Maps (Choose the Right Data Structure)',
            intro: "Stop using objects for everything. Today you’ll learn when to use Set, Map, Object, and Array — with real bug patterns and performance intuition.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">1. Map vs Object</h3>
<div class="overflow-hidden rounded-xl border border-dark-600 mb-6">
<table class="w-full text-sm text-left">
    <thead class="bg-dark-800 text-light-300">
        <tr>
            <th class="p-3">Feature</th>
            <th class="p-3">Object</th>
            <th class="p-3">Map</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-dark-700 bg-dark-900">
        <tr>
            <td class="p-3">Key Types</td>
            <td class="p-3">Strings/Symbols</td>
            <td class="p-3">Any (Objects, Funcs)</td>
        </tr>
        <tr>
            <td class="p-3">Order</td>
            <td class="p-3">Unreliable</td>
            <td class="p-3">Insertion Order</td>
        </tr>
         <tr>
            <td class="p-3">Size</td>
            <td class="p-3">Manual Count</td>
            <td class="p-3">.size</td>
        </tr>
    </tbody>
</table>
</div>
<h3 class="text-xl font-bold text-white mb-4">2) Set vs Array</h3>
<p class="mb-6 text-light-300">
Use a Set when you need uniqueness or fast membership checks. Array includes is linear; Set has is constant-time on average.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) WeakMap / WeakSet (When You Don’t Want to Prevent GC)</h3>
<p class="mb-6 text-light-300">
WeakMap is for metadata keyed by objects without preventing garbage collection. Perfect for caches tied to object lifetimes.
</p>
            `,
            predictions: [
                {
                    prompt: "In an Object used as a map, what happens to numeric keys like 1 and string keys like '1'?",
                    options: [
                        "They stay separate keys",
                        "They collide because keys are coerced to strings",
                        "Objects convert them to Symbols",
                        "It throws an error"
                    ],
                    correctIndex: 1,
                    explanation: "Object keys are strings/symbols; 1 becomes '1', which can collide with an existing string key."
                },
                {
                    prompt: "Fast membership check for many lookups is best with…",
                    options: ["Array.includes", "Set.has", "Object.toString", "JSON.stringify"],
                    correctIndex: 1,
                    explanation: "Set.has is O(1) average and is designed for membership checks."
                }
            ],
            checkpoints: [
                {
                    prompt: "When should you prefer Map over Object?",
                    options: [
                        "When keys must be objects or you need insertion-order iteration reliably",
                        "When you only have 2 keys",
                        "When you need JSON serialization automatically",
                        "Never"
                    ],
                    correctIndex: 0,
                    explanation: "Map supports any key type and has predictable iteration order with useful APIs like size."
                },
                {
                    prompt: "WeakMap differs from Map because…",
                    options: [
                        "it is faster always",
                        "its keys are weakly held and it is not iterable",
                        "it supports string keys only",
                        "it replaces arrays"
                    ],
                    correctIndex: 1,
                    explanation: "WeakMap does not prevent GC of keys and intentionally has no iteration/size."
                }
            ],
            labSteps: [
                {
                    id: "d16-step-1",
                    title: "Object key collision bug",
                    subtitle: "1 and '1' collide",
                    teacherNote: "Predict what cache[1] becomes after setting cache['1']. Then fix using Map.",
                    bugCode: `console.clear();

const cache = {};
cache[1] = "A";
cache["1"] = "B";
console.log("cache[1]:", cache[1]);
console.log("keys:", Object.keys(cache));`,
                    bugFocus: { fromLine: 3, toLine: 6 },
                    fixCode: `console.clear();

const cache = new Map();
cache.set(1, "A");
cache.set("1", "B");
console.log("get 1:", cache.get(1));
console.log("get '1':", cache.get("1"));
console.log("size:", cache.size);`,
                    fixFocus: { fromLine: 3, toLine: 8 },
                    whatToNotice: [
                        "Map preserves key types; Object coerces keys to strings.",
                        "Map gives correct size and predictable iteration."
                    ]
                },
                {
                    id: "d16-step-2",
                    title: "Deduplicate with Set",
                    subtitle: "Unique values cleanly",
                    teacherNote: "This is a classic high-signal use of Set.",
                    bugCode: `console.clear();

const arr = [1, 2, 2, 3, 3, 3];
// BUG: dedupe by hand is noisy
const unique = arr.filter((x, i) => arr.indexOf(x) === i);
console.log(unique);`,
                    bugFocus: { fromLine: 4, toLine: 5 },
                    fixCode: `console.clear();

const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)];
console.log(unique);`,
                    fixFocus: { fromLine: 3, toLine: 4 },
                    whatToNotice: [
                        "Set naturally enforces uniqueness.",
                        "The code becomes more readable and typically more efficient."
                    ]
                }
            ],
            code: `// Example 1: Set (Unique Values)
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]

// Example 2: Map (Object Keys)
const userMap = new Map();
const user1 = { id: 1 };
userMap.set(user1, "Metadata"); // Key is object reference`,
            comparison: {
                junior: `// ❌ Object as Map
const cache = {};
// Keys are converted to strings!
cache[1] = "A"; 
cache["1"] = "B"; 
// cache[1] is now "B" (Collision)`,
                senior: `// ✅ Real Map
const cache = new Map();
cache.set(1, "A");
cache.set("1", "B");
// cache.get(1) is "A" (Preserves Type)`
            },
            interview: {
                questions: [
                    { q: "When to use Set?", a: "When you need a list of unique values or need fast lookup `has()` (O(1)) compared to Array `includes()` (O(n))." },
                    { q: "Are Map keys garbage collected?", a: "Standard Maps hold strong references. Use `WeakMap` if you want keys to be garbage collected when no longer used elsewhere." },
                    { q: "How to iterate a Map?", a: "`for (let [key, val] of map) { ... }`" }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "Use Set for uniqueness and fast membership checks.",
                    "Use Map when keys aren’t just strings/symbols or you need reliable iteration order/size.",
                    "Objects coerce keys to strings — this causes collisions and subtle bugs.",
                    "WeakMap is for object-key metadata without preventing GC."
                ],
                commonMistakes: [
                    "Using plain objects as maps with mixed key types (collisions).",
                    "Using arrays for membership checks at scale (O(n) includes).",
                    "Expecting WeakMap to be iterable or to have size.",
                    "Storing unbounded data in Maps without eviction strategy."
                ],
                nextActions: [
                    "Replace one object-cache in your code with Map and verify key collisions disappear.",
                    "Use Set for dedupe/unique logic instead of manual filtering."
                ]
            }
        },
        {
            day: 17,
            title: 'Day 17: Design Patterns (Singleton, Factory, Observer) — Practical Use',
            intro: "Patterns are tools, not trophies. Today you’ll learn when to use them, how to implement them safely in JS, and how to avoid the common anti-patterns.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The Rule for Patterns</h3>
<p class="mb-6 text-light-300">
Use patterns to reduce coupling and clarify responsibility. If a pattern makes code harder to read, you applied it too early.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) Singleton (One Instance, Controlled Access)</h3>
<p class="mb-4 text-light-300">
Singleton is useful for truly global resources (config, logger, DB client), but it’s often abused.
In JS, module scope already behaves like a singleton.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Factory (Create Objects Without new)</h3>
<p class="mb-4 text-light-300">
Factories centralize creation logic. This is useful when object creation depends on config, environment, or feature flags.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) Observer / Pub-Sub (Decoupling)</h3>
<p class="mb-4 text-light-300">
Observers subscribe to events instead of tightly coupling modules. This powers UI event systems and state libraries.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-yellow-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ Subject ] 
   │
Notify() ──┬──▶ [ Observer A ]
           ├──▶ [ Observer B ]
           └──▶ [ Observer C ]
</pre>
</div>
            `,
            predictions: [
                {
                    prompt: "In JavaScript, what already behaves like a singleton by default?",
                    options: ["a class", "a module", "an array", "a promise"],
                    correctIndex: 1,
                    explanation: "Module scope is evaluated once and cached. Imports reuse the same module instance."
                },
                {
                    prompt: "Observer pattern reduces…",
                    options: ["coupling", "typing speed", "garbage collection", "network latency"],
                    correctIndex: 0,
                    explanation: "Observer decouples publishers from subscribers."
                }
            ],
            checkpoints: [
                {
                    prompt: "Factory pattern is best when…",
                    options: [
                        "you want to avoid all functions",
                        "creation logic is complex or depends on configuration",
                        "you need faster loops",
                        "you want global variables"
                    ],
                    correctIndex: 1,
                    explanation: "Factories centralize object creation and hide conditional complexity."
                },
                {
                    prompt: "A common bug with Observer systems is…",
                    options: ["missing semicolons", "memory leaks from never unsubscribing", "slow JSON", "CSS specificity"],
                    correctIndex: 1,
                    explanation: "If you subscribe and never unsubscribe, listeners accumulate and leak memory."
                }
            ],
            labSteps: [
                {
                    id: "d17-step-1",
                    title: "Singleton anti-pattern: hidden global state",
                    subtitle: "Hard to test, hard to reset",
                    teacherNote: "Observe how state sticks around. Then refactor to explicit dependency injection.",
                    bugCode: `console.clear();

// BUG: hidden global singleton state
const Settings = (() => {
  let value = { theme: "dark" };
  return {
    get: () => value,
    set: (v) => (value = v)
  };
})();

Settings.set({ theme: "light" });
console.log(Settings.get());`,
                    bugFocus: { fromLine: 3, toLine: 11 },
                    fixCode: `console.clear();

// FIX: inject dependencies instead of hiding them
function createSettings(initial) {
  let value = initial;
  return {
    get: () => value,
    set: (v) => (value = v)
  };
}

const settings = createSettings({ theme: "dark" });
settings.set({ theme: "light" });
console.log(settings.get());`,
                    fixFocus: { fromLine: 3, toLine: 14 },
                    whatToNotice: [
                        "Singletons hide dependencies; tests become harder.",
                        "Factories create explicit instances you can control/reset."
                    ]
                },
                {
                    id: "d17-step-2",
                    title: "Observer leak: never unsubscribing",
                    subtitle: "Listeners accumulate",
                    teacherNote: "Watch subscriber count grow. Then fix by returning an unsubscribe function.",
                    bugCode: `console.clear();

class Bus {
  constructor() { this.subs = []; }
  on(fn) { this.subs.push(fn); } // BUG: no unsubscribe
  emit(x) { this.subs.forEach(fn => fn(x)); }
}

const bus = new Bus();
for (let i = 0; i < 5; i++) bus.on(() => {});
console.log("subs:", bus.subs.length);`,
                    bugFocus: { fromLine: 4, toLine: 6 },
                    fixCode: `console.clear();

class Bus {
  constructor() { this.subs = new Set(); }
  on(fn) {
    this.subs.add(fn);
    return () => this.subs.delete(fn); // FIX: unsubscribe
  }
  emit(x) { this.subs.forEach(fn => fn(x)); }
}

const bus = new Bus();
const off = bus.on(() => console.log("hi"));
console.log("subs:", bus.subs.size);
off();
console.log("subs after off:", bus.subs.size);`,
                    fixFocus: { fromLine: 4, toLine: 10 },
                    whatToNotice: [
                        "Always provide unsubscribe in observer systems.",
                        "Set makes add/remove easier and prevents duplicates."
                    ]
                }
            ],
            code: `// Example: Singleton
class Database {
constructor() {
if (Database.instance) return Database.instance;
Database.instance = this;
this.conn = "Connected";
}
}
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true`,
            comparison: {
                junior: `// ❌ Tight Coupling
class Button {
click() {
// Button knows too much about other classes
header.update();
analytics.track();
sound.play();
}
}`,
                senior: `// ✅ Observer Pattern
class Button {
constructor() { this.observers = []; }
subscribe(fn) { this.observers.push(fn); }
click() {
this.observers.forEach(fn => fn());
}
}
// Decoupled
btn.subscribe(header.update);
btn.subscribe(analytics.track);`
            },
            interview: {
                questions: [
                    { q: "What is the Module Pattern?", a: "Using Closures/IIFE to create private scope and return a public API." },
                    { q: "Explain the Factory Pattern.", a: "A function that creates objects without calling `new`. Useful for complex creation logic." },
                    { q: "What pattern does React use?", a: "Observer (State changes -> UI updates) and Composition (Components)." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "Patterns should reduce coupling and clarify intent, not add ceremony.",
                    "JS module scope already behaves like a singleton.",
                    "Factories centralize creation logic and improve testability.",
                    "Observer/pub-sub decouples modules but requires unsubscribe to avoid leaks."
                ],
                commonMistakes: [
                    "Using Singleton everywhere (hidden globals, hard tests).",
                    "Observer systems without unsubscribe (memory leaks).",
                    "Factories that just wrap new (no real benefit).",
                    "Applying patterns before the problem exists (over-engineering)."
                ],
                nextActions: [
                    "Refactor one hidden global into an injected dependency.",
                    "Add unsubscribe support to any pub-sub/event-bus code you have."
                ]
            }
        },
        // --- WEEK 4: ARCHITECTURE & SECURITY ---
        {
            day: 18,
            title: 'Day 18: SOLID in JavaScript (Maintainable Architecture)',
            intro: "SOLID is about change: your code should be easy to extend without breaking. Today you’ll learn each principle with concrete JS examples and refactor a “god function” into maintainable pieces.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The Teaching Lens</h3>
<p class="mb-6 text-light-300">
SOLID is not about classes only. It’s about dependency boundaries and change management.
Ask: “If requirements change, where do I edit code?”
</p>

<h3 class="text-xl font-bold text-white mb-4">1) SRP — Single Responsibility</h3>
<p class="mb-4 text-light-300">
A function/module should have one reason to change. If one function validates, writes DB, sends email, and updates UI — it will break constantly.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) OCP — Open/Closed</h3>
<p class="mb-4 text-light-300">
Design code so behavior can be extended via configuration/plugins without modifying core logic.
</p>

<div class="overflow-hidden rounded-xl border border-dark-600 mb-6">
<table class="w-full text-sm text-left">
    <thead class="bg-dark-800 text-light-300">
        <tr>
            <th class="p-3">Principle</th>
            <th class="p-3">Meaning</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-dark-700 bg-dark-900">
        <tr><td class="p-3">S</td><td class="p-3">Single Responsibility</td></tr>
        <tr><td class="p-3">O</td><td class="p-3">Open/Closed</td></tr>
        <tr><td class="p-3">L</td><td class="p-3">Liskov Substitution</td></tr>
        <tr><td class="p-3">I</td><td class="p-3">Interface Segregation</td></tr>
        <tr><td class="p-3">D</td><td class="p-3">Dependency Inversion</td></tr>
    </tbody>
</table>
</div>
<h3 class="text-xl font-bold text-white mb-4">3) DIP — Dependency Inversion (Most Useful)</h3>
<p class="mb-6 text-light-300">
High-level logic should not depend on low-level details. Depend on abstractions (interfaces/contracts).
In JS, this often means passing dependencies as arguments instead of importing concrete implementations everywhere.
</p>
            `,
            predictions: [
                {
                    prompt: "Which is a sign SRP is violated?",
                    options: [
                        "a function has one responsibility",
                        "a function validates, saves, emails, and renders UI",
                        "a function returns a value",
                        "a function is pure"
                    ],
                    correctIndex: 1,
                    explanation: "Multiple responsibilities create multiple reasons to change and increase breakage."
                },
                {
                    prompt: "Dependency Inversion is mainly about…",
                    options: [
                        "writing more classes",
                        "making high-level logic depend on contracts rather than concrete details",
                        "using more globals",
                        "avoiding tests"
                    ],
                    correctIndex: 1,
                    explanation: "DIP decouples your domain logic from implementation details, improving testability and maintainability."
                }
            ],
            checkpoints: [
                {
                    prompt: "OCP means…",
                    options: [
                        "open for extension, closed for modification",
                        "open source only",
                        "optimize CPU always",
                        "only classes matter"
                    ],
                    correctIndex: 0,
                    explanation: "You can extend behavior without editing stable core code."
                },
                {
                    prompt: "A practical DIP technique in JS is…",
                    options: [
                        "importing database client everywhere",
                        "passing dependencies (repo/logger/http) into functions",
                        "mutating Object.prototype",
                        "using eval"
                    ],
                    correctIndex: 1,
                    explanation: "Injecting dependencies makes code testable and reduces coupling."
                }
            ],
            labSteps: [
                {
                    id: "d18-step-1",
                    title: "SRP refactor: god function",
                    subtitle: "One function doing everything",
                    teacherNote: "Identify responsibilities, then split into focused functions.",
                    bugCode: `console.clear();

function registerUser(user) {
  if (!user.email) throw new Error("missing email"); // validate
  // save (simulated)
  console.log("saving to db:", user.email);
  // notify (simulated)
  console.log("sending welcome email:", user.email);
  // render (simulated)
  console.log("rendering UI");
}

registerUser({ email: "a@b.com" });`,
                    bugFocus: { fromLine: 3, toLine: 10 },
                    fixCode: `console.clear();

function validateUser(user) {
  if (!user.email) throw new Error("missing email");
}
function saveUser(repo, user) { repo.save(user); }
function notify(notifier, user) { notifier.send(user.email); }

function registerUser({ repo, notifier }, user) {
  validateUser(user);
  saveUser(repo, user);
  notify(notifier, user);
}

const repo = { save: (u) => console.log("saving:", u.email) };
const notifier = { send: (email) => console.log("email:", email) };
registerUser({ repo, notifier }, { email: "a@b.com" });`,
                    fixFocus: { fromLine: 3, toLine: 17 },
                    whatToNotice: [
                        "Each function has one job.",
                        "Dependencies are injected, making it easy to test."
                    ]
                },
                {
                    id: "d18-step-2",
                    title: "OCP with rules/plugins",
                    subtitle: "Extend without changing core",
                    teacherNote: "Notice we add new rules without editing validate().",
                    bugCode: `console.clear();

class Validator {
  constructor() { this.rules = []; }
  addRule(rule) { this.rules.push(rule); }
  validate(val) { return this.rules.every(r => r(val)); }
}

const v = new Validator();
v.addRule(x => x > 0);
console.log(v.validate(10));`,
                    bugFocus: { fromLine: 3, toLine: 7 },
                    fixCode: `console.clear();

class Validator {
  constructor() { this.rules = []; }
  addRule(rule) { this.rules.push(rule); }
  validate(val) { return this.rules.every(r => r(val)); }
}

const v = new Validator();
v.addRule(x => x > 0);
v.addRule(x => x < 100); // extension
console.log("validate 10:", v.validate(10));
console.log("validate 1000:", v.validate(1000));`,
                    fixFocus: { fromLine: 10, toLine: 14 },
                    whatToNotice: [
                        "Extension happens by adding rules, not changing Validator internals.",
                        "This prevents risky edits to stable code."
                    ]
                }
            ],
            code: `// Example: OCP (Open/Closed)
class Validator {
constructor() {
    this.rules = [];
}
addRule(rule) { this.rules.push(rule); }
validate(val) { return this.rules.every(r => r(val)); }
}

// We extend functionality without changing the class
const v = new Validator();
v.addRule(x => x > 0);
v.addRule(x => x < 100);`,
            comparison: {
                junior: `// ❌ God Function (Violates SRP)
function registerUser(user) {
// 1. Validate
if (!user.email) throw Error();
// 2. Save DB
db.save(user);
// 3. Send Email
email.send(user.email);
// 4. Update UI
dom.render(user);
}`,
                senior: `// ✅ SRP
function registerUser(user) {
validate(user);
repo.save(user);
notifier.notify(user);
}
// Each function does ONE thing.`
            },
            interview: {
                questions: [
                    { q: "Why is Dependency Inversion important?", a: "It decouples high-level logic from low-level details. Instead of 'App depends on SQL', 'App depends on Database Interface', and SQL implements that." },
                    { q: "What is Liskov Substitution?", a: "Subclasses should be substitutable for their base classes without breaking the app." },
                    { q: "How to apply SRP to React Components?", a: "Split components: One for Logic (Container/Hook) and one for UI (Presentational)." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "SRP reduces breakage by limiting each module to one reason to change.",
                    "OCP enables extending behavior without modifying stable core code.",
                    "DIP improves testability by injecting dependencies rather than importing concrete details everywhere.",
                    "SOLID is about managing change and boundaries, not just classes."
                ],
                commonMistakes: [
                    "God functions that validate/save/notify/render in one place.",
                    "Editing core logic for every new case instead of adding plugins/rules.",
                    "Hard-coding dependencies (db/email/http) inside domain logic.",
                    "Using SOLID as dogma instead of a tool for change management."
                ],
                nextActions: [
                    "Pick one messy function and split it into validate/save/notify responsibilities.",
                    "Refactor a module to accept dependencies as parameters (repo/logger)."
                ]
            }
        },
        {
            day: 19,
            title: 'Day 19: Testing Strategy (Unit, Integration) + Writing Great Tests',
            intro: "Tests are how you ship changes without fear. Today you’ll learn the testing pyramid, how to write good unit tests, and how to design code that is naturally testable.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The Goal</h3>
<p class="mb-6 text-light-300">
The goal is not “100% coverage”. The goal is confidence. A good test suite catches regressions and helps you refactor safely.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) The Testing Pyramid</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 bg-dark-800 p-4 rounded-lg mb-6">
<li><span class="text-yellow-400 font-bold">E2E (Top 10%):</span> Click buttons in browser (Cypress). Slow.</li>
<li><span class="text-yellow-400 font-bold">Integration (Middle 30%):</span> Test module interactions.</li>
<li><span class="text-yellow-400 font-bold">Unit (Bottom 60%):</span> Test single functions (Jest/Vitest). Fast.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">2) What Makes a Test “Good”?</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6 bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-400 font-bold">Deterministic</span>: same result every run</li>
  <li><span class="text-yellow-400 font-bold">Small</span>: tests one behavior</li>
  <li><span class="text-yellow-400 font-bold">Readable</span>: intention is obvious</li>
  <li><span class="text-yellow-400 font-bold">Fast</span>: runs in milliseconds for unit tests</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3) AAA Pattern</h3>
<p class="mb-6 text-light-300">
Arrange → Act → Assert. This keeps tests structured and readable.
</p>
            `,
            predictions: [
                {
                    prompt: "Which layer should you have the most of in the testing pyramid?",
                    options: ["E2E", "Integration", "Unit", "None"],
                    correctIndex: 2,
                    explanation: "Unit tests are fast and stable, so you can have many. E2E are slow and flaky, so keep fewer."
                },
                {
                    prompt: "A good unit test should be…",
                    options: ["slow but thorough", "randomized to find surprises", "deterministic and fast", "dependent on network"],
                    correctIndex: 2,
                    explanation: "Deterministic + fast is the foundation. You can add deeper tests separately."
                }
            ],
            checkpoints: [
                {
                    prompt: "Mock vs stub: which verifies behavior (calls) rather than only providing canned values?",
                    options: ["stub", "mock", "promise", "proxy"],
                    correctIndex: 1,
                    explanation: "Mocks verify interactions; stubs provide predetermined responses."
                },
                {
                    prompt: "Best practice for testing a pure function is…",
                    options: ["log output manually", "assert output for inputs, include edge cases", "only snapshot test", "skip tests"],
                    correctIndex: 1,
                    explanation: "Pure functions are easy: assert expected outputs for representative and edge inputs."
                }
            ],
            labSteps: [
                {
                    id: "d19-step-1",
                    title: "Write a tiny test harness (no Jest needed)",
                    subtitle: "Arrange → Act → Assert",
                    teacherNote: "We’ll simulate unit testing in plain JS so the habit transfers to Jest/Vitest.",
                    bugCode: `console.clear();

function add(a, b) { return a + b; }

// BUG: manual testing is unreliable
console.log(add(1, 2));
console.log(add(-1, 5));`,
                    bugFocus: { fromLine: 3, toLine: 7 },
                    fixCode: `console.clear();

function assertEqual(name, actual, expected) {
  const ok = Object.is(actual, expected);
  console.log(ok ? "PASS" : "FAIL", "-", name, "=>", actual);
  if (!ok) throw new Error("Expected " + expected + " but got " + actual);
}

function add(a, b) { return a + b; }

// Arrange/Act/Assert
assertEqual("1+2", add(1, 2), 3);
assertEqual("-1+5", add(-1, 5), 4);`,
                    fixFocus: { fromLine: 3, toLine: 14 },
                    whatToNotice: [
                        "Automated assertions replace guessing.",
                        "Small tests become a safety net for refactors."
                    ]
                },
                {
                    id: "d19-step-2",
                    title: "Make code testable via dependency injection",
                    subtitle: "No network in unit tests",
                    teacherNote: "We simulate an API dependency by injecting a fetch function.",
                    bugCode: `console.clear();

async function loadUser() {
  // BUG: hard dependency (would hit network in real life)
  return { id: 1, name: "Asha" };
}

loadUser().then(console.log);`,
                    bugFocus: { fromLine: 3, toLine: 6 },
                    fixCode: `console.clear();

async function loadUser({ fetchUser }) {
  return fetchUser();
}

// Unit test: inject fake dependency
const fakeFetch = async () => ({ id: 1, name: "Asha" });
loadUser({ fetchUser: fakeFetch }).then(console.log);`,
                    fixFocus: { fromLine: 3, toLine: 9 },
                    whatToNotice: [
                        "Injecting dependencies makes units testable without the network.",
                        "Your architecture becomes cleaner and more maintainable."
                    ]
                }
            ],
            code: `// Example: Jest Unit Test
// math.js
export const add = (a, b) => a + b;

// math.test.js
test('adds 1 + 2 to equal 3', () => {
expect(add(1, 2)).toBe(3);
});`,
            comparison: {
                junior: `// ❌ Console Log Testing
function add(a, b) { return a + b; }

console.log(add(1, 2)); // Look at terminal
console.log(add(-1, 5)); // Hope it's right`,
                senior: `// ✅ Automated Tests
describe('add', () => {
it('handles negative numbers', () => {
expect(add(-1, 5)).toBe(4);
});

it('throws on string input', () => {
expect(() => add("1", 2)).toThrow();
});
});`
            },
            interview: {
                questions: [
                    { q: "What is TDD?", a: "Test Driven Development. 1. Write fail test. 2. Write code to pass. 3. Refactor." },
                    { q: "Mock vs Stub?", a: "Stub provides canned answers. Mock verifies behavior (was this function called?)." },
                    { q: "What is Code Coverage?", a: "The percentage of lines of code executed during tests." }
                ]
            }
            ,
            recap: {
                takeaways: [
                    "Most tests should be unit tests (fast, stable); fewer integration; fewest E2E.",
                    "Good tests are deterministic, readable, and focused.",
                    "AAA pattern (Arrange, Act, Assert) keeps tests clean.",
                    "Dependency injection makes code testable without real networks/DBs."
                ],
                commonMistakes: [
                    "Relying on manual console logging as 'testing'.",
                    "Writing flaky tests that depend on time/network/randomness.",
                    "Testing implementation details instead of behavior.",
                    "Overusing E2E tests and making the suite slow and unreliable."
                ],
                nextActions: [
                    "Write 5 unit tests for a pure function with edge cases.",
                    "Refactor one module to accept dependencies as arguments and test with fakes."
                ]
            }
        },
        {
            day: 20,
            title: 'Day 20: Web Security (XSS, CSRF, Cookies, and Safe Rendering)',
            intro: "Security is architecture. Today you’ll learn the two biggest web attack classes (XSS + CSRF), how cookies really work, and the practical defenses senior engineers use.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">0) The Rule</h3>
<p class="mb-6 text-light-300">
If you accept user input, you must decide how it is treated: as <span class="text-yellow-400 font-bold">text</span> or as <span class="text-yellow-400 font-bold">HTML</span>.
Most security incidents happen when code treats untrusted input as HTML/JS.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) XSS (Cross-Site Scripting)</h3>
<p class="mb-4 text-light-300">XSS happens when attacker-controlled content becomes executable code in your page.</p>
<div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30 mb-6">
<code class="text-red-400">INPUT: &lt;img src=x onerror=stealCookies()&gt;</code>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) CSRF (Cross-Site Request Forgery)</h3>
<p class="mb-6 text-light-300">
CSRF happens when the browser automatically includes cookies on a request and an attacker tricks a user into sending that request.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) Practical Defenses</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6 bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-400 font-bold">XSS</span>: escape output, avoid innerHTML, sanitize HTML if needed, use CSP.</li>
  <li><span class="text-yellow-400 font-bold">CSRF</span>: SameSite cookies, CSRF tokens, verify Origin/Referer on state-changing requests.</li>
  <li><span class="text-yellow-400 font-bold">Cookies</span>: use HttpOnly + Secure + SameSite where possible.</li>
</ul>
            `,
            predictions: [
                {
                    prompt: "Which is safest for displaying user text in the DOM?",
                    options: ["innerHTML", "textContent", "document.write", "eval"],
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
                    options: ["SameSite cookies + CSRF token", "localStorage tokens", "console.log", "minify JS"],
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

const userComment = "<b>Hello</b> <img src=x onerror=\\"console.log('xss')\\">";

const el = document.createElement("div");
// BUG: this treats user input as HTML
el.innerHTML = userComment;
document.body.appendChild(el);

console.log("rendered with innerHTML");`,
                    bugFocus: { fromLine: 6, toLine: 8 },
                    fixCode: `console.clear();

const userComment = "<b>Hello</b> <img src=x onerror=\\"console.log('xss')\\">";

const el = document.createElement("div");
// FIX: treat it as text
el.textContent = userComment;
document.body.appendChild(el);

console.log("rendered with textContent");`,
                    fixFocus: { fromLine: 6, toLine: 8 },
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
                    bugFocus: { fromLine: 4, toLine: 7 },
                    fixCode: `console.clear();

const userContent = "<script>alert('hack')</script><b>Hi</b>";

// FIX (demo): strip tags (real apps: DOMPurify or server-side sanitizer)
const stripTags = (html) => html.replace(/<[^>]*>/g, "");

const el = document.createElement("div");
el.textContent = stripTags(userContent);
document.body.appendChild(el);
console.log("sanitized text:", el.textContent);`,
                    fixFocus: { fromLine: 5, toLine: 10 },
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
                    { q: "How to prevent XSS?", a: "Never use `innerHTML` with user input. Use libraries like DOMPurify. Use Content Security Policy (CSP) headers." },
                    { q: "What is an HttpOnly cookie?", a: "A cookie that cannot be accessed by JavaScript (document.cookie). It prevents XSS attacks from stealing session tokens." },
                    { q: "What is CORS?", a: "Cross-Origin Resource Sharing. Browser mechanism to allow/block requests from different domains." }
                ]
            }
            ,
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
        },
        // === WEEK 5: TOP INTERVIEW PATTERNS ===
        {
            day: 21,
            title: '🔥 Polyfills Mastery: Write Your Own JS Methods',
            intro: "The #1 interview topic. If you can't write Promise.all from scratch, you're not ready for FAANG.",
            content: `
<div class="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 p-4 rounded-xl mb-6">
<h4 class="text-red-400 font-bold mb-2">🎯 Why Polyfills Matter</h4>
<p class="text-light-300">Every top company (Google, Amazon, Meta) asks polyfill questions. They test your understanding of JavaScript internals, not just API usage.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📋 Polyfills You MUST Know</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Promise.all</code> - Wait for all promises</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Promise.race</code> - First to resolve wins</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Promise.allSettled</code> - Wait for all, success or fail</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Promise.any</code> - First success wins</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Array.prototype.map</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Array.prototype.filter</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Array.prototype.reduce</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Function.prototype.bind</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Function.prototype.call</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Function.prototype.apply</code></li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">⚡ The Interview Strategy</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-green-400 mb-2">✅ Do This</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Ask clarifying questions first</li>
        <li>Handle edge cases (empty arrays, no args)</li>
        <li>Explain your thought process</li>
        <li>Use proper error handling</li>
    </ul>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-red-400 mb-2">❌ Avoid This</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Jumping straight to code</li>
        <li>Ignoring edge cases</li>
        <li>Not testing your solution</li>
        <li>Forgetting 'this' context</li>
    </ul>
</div>
</div>
            `,
            masteryChecklist: [
                { id: "d21-c1", text: "I can explain why Promise.all must preserve input order even when promises resolve out of order." },
                { id: "d21-c2", text: "I can write a Promise.all polyfill that handles non-promises via Promise.resolve." },
                { id: "d21-c3", text: "I can implement Array.prototype.map respecting sparse arrays (holes) and optional thisArg." },
                { id: "d21-c4", text: "I can implement bind and explain what changes when the bound function is called with new." },
                { id: "d21-c5", text: "I can test my polyfills with edge cases (empty input, rejection, holes, context)." }
            ],
            predictions: [
                {
                    prompt: "Promise.all([slow(2), fast(1)]) resolves to…",
                    options: [
                        "[1, 2] (input order)",
                        "[2, 1] (resolve order)",
                        "It depends on CPU timing",
                        "It throws unless all are already resolved"
                    ],
                    correctIndex: 0,
                    explanation: "Promise.all preserves the order of the input iterable. Resolution timing doesn’t change the output index positions."
                },
                {
                    prompt: "What happens with sparse arrays? `[1, , 3].map(x => x * 2)`",
                    options: [
                        "[2, NaN, 6]",
                        "[2, undefined, 6]",
                        "Callback is NOT called for the hole; the result keeps a hole at index 1",
                        "It throws because the array is invalid"
                    ],
                    correctIndex: 2,
                    explanation: "map skips missing indices. The output array has the same length and preserves holes."
                },
                {
                    prompt: "In a correct bind polyfill, if you do `const C = Fn.bind(obj); new C()` then `this` inside Fn should be…",
                    options: [
                        "obj (always)",
                        "the new instance created by new",
                        "globalThis",
                        "undefined"
                    ],
                    correctIndex: 1,
                    explanation: "When called with `new`, the bound function must behave like a constructor: `this` becomes the new instance (bound context is ignored)."
                }
            ],
            checkpoints: [
                {
                    prompt: "Why do we wrap each entry with Promise.resolve in a Promise.all polyfill?",
                    options: [
                        "To make promises resolve faster",
                        "To handle non-promise values (like numbers) uniformly",
                        "To turn rejections into fulfillments",
                        "To preserve input order automatically"
                    ],
                    correctIndex: 1,
                    explanation: "Promise.all accepts any values. Promise.resolve(x) converts non-promises into fulfilled promises so we can use a single async path."
                },
                {
                    prompt: "What bug happens if your Promise.all polyfill does `results.push(value)`?",
                    options: [
                        "It mutates the input array",
                        "It loses order (results come in resolve order, not input order)",
                        "It rejects too early",
                        "It creates memory leaks"
                    ],
                    correctIndex: 1,
                    explanation: "push collects in completion order. Correct implementations assign `results[index] = value`."
                },
                {
                    prompt: "Which check makes an Array.map polyfill match real behavior on sparse arrays?",
                    options: [
                        "`if (this[i] !== undefined)`",
                        "`if (i < this.length)`",
                        "`if (i in this)`",
                        "`if (typeof this[i] === 'number')`"
                    ],
                    correctIndex: 2,
                    explanation: "`i in this` checks whether the index exists (not whether its value is undefined). It’s the key to matching spec behavior."
                }
            ],
            labSteps: [
                {
                    id: "d21-step-1",
                    title: "Promise.all polyfill: preserve order (the #1 gotcha)",
                    subtitle: "Fix the classic 'push results' bug",
                    teacherNote: "Predict first: will the output come out as [1,2] or [2,1]? Then run and explain why.",
                    bugCode: `console.clear();

// BUGGY Promise.all polyfill (order bug)
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let done = 0;
    if (!promises.length) return resolve([]);

    promises.forEach((p) => {
      Promise.resolve(p).then((value) => {
        results.push(value); // ❌ wrong: resolve order, not input order
        done++;
        if (done === promises.length) resolve(results);
      }, reject);
    });
  });
};

const slow = new Promise(r => setTimeout(() => r(2), 60));
const fast = new Promise(r => setTimeout(() => r(1), 10));

Promise.myAll([slow, fast]).then(res => console.log("myAll:", res));`,
                    bugFocus: { fromLine: 10, toLine: 10 },
                    fixCode: `console.clear();

// FIXED Promise.all polyfill (preserve input order)
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([]);
    const results = new Array(promises.length);
    let done = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p).then((value) => {
        results[index] = value; // ✅ store at index
        done++;
        if (done === promises.length) resolve(results);
      }, reject);
    });
  });
};

const slow = new Promise(r => setTimeout(() => r(2), 60));
const fast = new Promise(r => setTimeout(() => r(1), 10));

Promise.myAll([slow, fast]).then(res => console.log("myAll:", res));`,
                    fixFocus: { fromLine: 11, toLine: 11 },
                    whatToNotice: [
                        "Promise.all is about 'all completed' but order is tied to the input positions.",
                        "Using results[index] keeps output stable regardless of timing."
                    ]
                },
                {
                    id: "d21-step-2",
                    title: "Array.map polyfill: respect holes (sparse arrays)",
                    subtitle: "Match spec behavior using `i in this`",
                    teacherNote: "A real map does NOT call your callback for missing indices. That’s a subtle but important spec detail.",
                    bugCode: `console.clear();

Array.prototype.myMap = function(cb, thisArg) {
  const out = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    // BUG: calls cb even for holes
    out[i] = cb.call(thisArg, this[i], i, this);
  }
  return out;
};

const arr = [1, , 3]; // hole at index 1
const res = arr.myMap(x => x * 2);
console.log("res:", res, "1 in res?", 1 in res);`,
                    bugFocus: { fromLine: 6, toLine: 7 },
                    fixCode: `console.clear();

Array.prototype.myMap = function(cb, thisArg) {
  if (typeof cb !== "function") throw new TypeError("cb must be a function");
  const out = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) { // ✅ only map existing indices
      out[i] = cb.call(thisArg, this[i], i, this);
    }
  }
  return out;
};

const arr = [1, , 3];
const res = arr.myMap(x => x * 2);
console.log("res:", res, "1 in res?", 1 in res);`,
                    fixFocus: { fromLine: 7, toLine: 9 },
                    whatToNotice: [
                        "A hole is different from an explicit undefined value.",
                        "`i in this` checks existence, not the value."
                    ]
                }
            ],
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  Day 21 Live Lab: Polyfills you can explain                          ║
║  Goal: make the built-ins feel "obvious"                             ║
╚══════════════════════════════════════════════════════════════════════╝
*/

console.clear();

// ─────────────────────────────────────────────────────────────
// Promise.myAll (Promise.all polyfill)
// ─────────────────────────────────────────────────────────────
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) return reject(new TypeError("myAll expects an array"));
    if (promises.length === 0) return resolve([]);

    const results = new Array(promises.length);
    let done = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        (value) => {
          results[index] = value;
          done++;
          if (done === promises.length) resolve(results);
        },
        (err) => reject(err)
      );
    });
  });
};

// ─────────────────────────────────────────────────────────────
// Array.prototype.myMap (Array.map polyfill)
// ─────────────────────────────────────────────────────────────
Array.prototype.myMap = function(cb, thisArg) {
  if (typeof cb !== "function") throw new TypeError("cb must be a function");
  const out = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) out[i] = cb.call(thisArg, this[i], i, this);
  }
  return out;
};

// ─────────────────────────────────────────────────────────────
// Function.prototype.myBind (bind polyfill, including "new")
// ─────────────────────────────────────────────────────────────
Function.prototype.myBind = function(context, ...boundArgs) {
  if (typeof this !== "function") throw new TypeError("myBind must be called on a function");
  const targetFn = this;

  function boundFn(...callArgs) {
    // If called with "new", ignore bound context and use the new instance.
    const isNew = new.target != null;
    const thisArg = isNew ? this : context;
    return targetFn.apply(thisArg, [...boundArgs, ...callArgs]);
  }

  // Preserve prototype chain for "new boundFn()"
  boundFn.prototype = Object.create(targetFn.prototype);
  return boundFn;
};

// ─────────────────────────────────────────────────────────────
// Tests (read the logs like a teacher: predict → run → explain)
// ─────────────────────────────────────────────────────────────
console.log("=== Promise.myAll preserves input order ===");
const slow = new Promise(r => setTimeout(() => r("slow"), 60));
const fast = new Promise(r => setTimeout(() => r("fast"), 10));
Promise.myAll([slow, fast, 42]).then(
  (res) => console.log("myAll result:", res),
  (err) => console.error("myAll error:", err)
);

console.log("=== myMap respects holes (sparse arrays) ===");
const sparse = [1, , 3];
const mapped = sparse.myMap((x) => x * 2);
console.log("mapped:", mapped, "| 1 in mapped?", 1 in mapped);

console.log("=== myBind and new behavior ===");
function Person(name) { this.name = name; }
Person.prototype.say = function() { return "Hi " + this.name; };
const BoundPerson = Person.myBind({ ignored: true }, "Asha");
const p = new BoundPerson(); // should behave like constructor
console.log("new BoundPerson().name:", p.name);
console.log("new BoundPerson().say():", p.say());`,
            recap: {
                takeaways: [
                    "A polyfill is a mental model translated into code: edge cases are the interview.",
                    "Promise.all must preserve input order; never collect results with push().",
                    "Array.map skips holes; `i in this` is the key to matching spec behavior.",
                    "bind must handle constructor calls: `new` changes what `this` means.",
                    "Write a tiny test harness for every polyfill: empty input, rejection, sparse arrays, and `new`."
                ],
                commonMistakes: [
                    "Using results.push() in Promise.all (breaks order).",
                    "Forgetting Promise.resolve() (breaks non-promise inputs).",
                    "Treating holes like undefined (wrong for map/filter).",
                    "Ignoring `new` in bind polyfill (breaks constructors)."
                ],
                nextActions: [
                    "Rewrite Promise.myAll from memory and test with slow/fast promises.",
                    "Write myFilter and myReduce using the same 'spec mindset' (holes + thisArg).",
                    "Explain bind + new with one sentence: 'constructor call wins over bound context'."
                ]
            },
            comparison: {
                junior: `// ❌ Just using built-in methods
const doubled = [1, 2, 3].map(x => x * 2);
// Works, but can't explain HOW it works

Promise.all([p1, p2, p3])
  .then(results => console.log(results));
// Uses it but doesn't understand internals`,
                senior: `// ✅ Understands implementation
Array.prototype.myMap = function(cb) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) { // Handle sparse arrays!
      result[i] = cb(this[i], i, this);
    }
  }
  return result;
};
// Can explain: callback context, sparse arrays,
// return value, and edge cases`
            },
            interview: {
                questions: [
                    { q: "Why use Promise.resolve() inside Promise.all polyfill?", a: "To handle non-promise values. If someone passes [1, 2, Promise.resolve(3)], we need to wrap 1 and 2 in promises." },
                    { q: "What's the difference between Promise.all and Promise.allSettled?", a: "Promise.all rejects immediately if ANY promise rejects. Promise.allSettled waits for ALL promises and returns status of each (fulfilled/rejected)." },
                    { q: "Why check 'i in this' in array polyfills?", a: "To handle sparse arrays. [1,,3] has length 3 but index 1 doesn't exist. We shouldn't call callback for missing indices." },
                    { q: "How does bind handle the 'new' keyword?", a: "If bound function is called with 'new', it ignores the bound 'this' and creates a new instance. Check with new.target." }
                ]
            }
        },
        {
            day: 22,
            title: '🔥 Build a Promise from Scratch',
            intro: "The ultimate JS interview question. If you understand Promises at this level, you understand JavaScript.",
            content: `
<div class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-4 rounded-xl mb-6">
<h4 class="text-purple-400 font-bold mb-2">🏆 The Holy Grail of JS Interviews</h4>
<p class="text-light-300">Building a Promise from scratch tests: closures, callbacks, async understanding, state machines, and error handling. It's asked at Google, Meta, and Amazon.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📐 Promise State Machine</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────┐
│                    PROMISE STATES                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│     ┌──────────┐                                        │
│     │ PENDING  │ ◄── Initial state                      │
│     └────┬─────┘                                        │
│          │                                              │
│    ┌─────┴─────┐                                        │
│    ▼           ▼                                        │
│ ┌──────────┐ ┌──────────┐                               │
│ │FULFILLED │ │ REJECTED │ ◄── Final states (immutable)  │
│ └──────────┘ └──────────┘                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Key Concepts to Implement</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">State</code> - pending, fulfilled, rejected</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Value</code> - resolved value or rejection reason</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">then()</code> - Register success/error handlers</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">catch()</code> - Register error handler</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">finally()</code> - Run regardless of outcome</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Chaining</code> - then() returns new Promise</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">⚠️ Tricky Parts</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><span class="text-yellow-400 font-bold">Microtask Queue:</span> Handlers must run asynchronously (use queueMicrotask or setTimeout)</li>
<li><span class="text-yellow-400 font-bold">Handler Queueing:</span> If then() called before resolve(), store handlers and run later</li>
<li><span class="text-yellow-400 font-bold">Chaining:</span> then() must return a NEW promise that resolves with handler's return value</li>
<li><span class="text-yellow-400 font-bold">Thenable Unwrapping:</span> If handler returns a promise, wait for it</li>
</ul>
            `,
            masteryChecklist: [
                { id: "d22-c1", text: "I can explain the Promise state machine (pending → fulfilled/rejected) and why it is one-way." },
                { id: "d22-c2", text: "I can implement then() so handlers run asynchronously (microtask-ish), even if already resolved." },
                { id: "d22-c3", text: "I can implement chaining: then() returns a NEW promise resolved with the handler return value." },
                { id: "d22-c4", text: "I can explain thenable unwrapping (if a handler returns a promise, you wait for it)." },
                { id: "d22-c5", text: "I can test my promise implementation with timing + error cases (throw inside handler, reject path)." }
            ],
            predictions: [
                {
                    prompt: "If you attach a .then() after a promise is already resolved, when should the handler run?",
                    options: [
                        "Immediately in the same call stack",
                        "Asynchronously after current call stack (microtask-like)",
                        "Only on the next setTimeout",
                        "Never (too late)"
                    ],
                    correctIndex: 1,
                    explanation: "Real Promises always call then handlers asynchronously. This makes behavior consistent whether the promise is already settled or not."
                },
                {
                    prompt: "If a then handler returns another promise, the next then in the chain receives…",
                    options: [
                        "The promise object itself",
                        "The final resolved value of that returned promise",
                        "undefined (return values are ignored)",
                        "It throws because promises can't be nested"
                    ],
                    correctIndex: 1,
                    explanation: "Chaining unwraps thenables: returning a promise delays the chain until it settles, and the next then receives its settled value."
                },
                {
                    prompt: "What happens if a then handler throws an error?",
                    options: [
                        "It is ignored",
                        "The original promise becomes rejected",
                        "The NEW promise returned by then becomes rejected",
                        "JavaScript crashes"
                    ],
                    correctIndex: 2,
                    explanation: "then returns a new promise. If the handler throws, that returned promise must reject with the thrown error."
                }
            ],
            checkpoints: [
                {
                    prompt: "Why must then handlers run asynchronously?",
                    options: [
                        "To be faster than sync code",
                        "To match Promises/A+ and guarantee consistent ordering",
                        "Because JavaScript cannot call functions synchronously",
                        "Because setTimeout is required for promises"
                    ],
                    correctIndex: 1,
                    explanation: "Async handler execution avoids 'sometimes sync, sometimes async' behavior and matches the Promise spec expectations."
                },
                {
                    prompt: "A promise can change state…",
                    options: [
                        "Many times (pending ↔ fulfilled ↔ rejected)",
                        "Only once (pending → fulfilled OR pending → rejected)",
                        "Twice (pending → fulfilled → rejected)",
                        "Only if you call resolve() twice"
                    ],
                    correctIndex: 1,
                    explanation: "Promises are immutable after settlement. This makes async reasoning stable and prevents racey state flips."
                },
                {
                    prompt: "Why does then() return a new promise instead of returning the same one?",
                    options: [
                        "So you can store more handlers",
                        "So chaining can transform values and propagate errors independently",
                        "Because JavaScript forbids returning this",
                        "To reduce memory usage"
                    ],
                    correctIndex: 1,
                    explanation: "The returned promise represents the outcome of the handler. That’s what enables mapping (value transforms) and error propagation."
                }
            ],
            labSteps: [
                {
                    id: "d22-step-1",
                    title: "Bug: handlers run synchronously when already resolved",
                    subtitle: "Fix by scheduling handler execution asynchronously",
                    teacherNote: "Predict the output order before you run. If B runs before C, your promise is wrong.",
                    bugCode: `console.clear();

function asap(fn) { setTimeout(fn, 0); } // BUG: also too slow, but good enough for demo

class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];

    const resolve = (v) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = v;
      this.handlers.forEach(h => h.onFulfilled && h.onFulfilled(v)); // ❌ sync
    };
    const reject = (e) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.value = e;
      this.handlers.forEach(h => h.onRejected && h.onRejected(e)); // ❌ sync
    };

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    if (this.state === "fulfilled" && typeof onFulfilled === "function") {
      onFulfilled(this.value); // ❌ sync when already fulfilled
    } else if (this.state === "rejected" && typeof onRejected === "function") {
      onRejected(this.value); // ❌ sync when already rejected
    } else {
      this.handlers.push({ onFulfilled, onRejected });
    }
  }
}

const p = new MyPromise((res) => res("OK"));
console.log("A");
p.then(() => console.log("B"));
console.log("C");`,
                    bugFocus: { fromLine: 26, toLine: 31 },
                    fixCode: `console.clear();

const asap = (fn) => (typeof queueMicrotask === "function" ? queueMicrotask(fn) : Promise.resolve().then(fn));

class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];

    const flush = () => {
      const handlers = this.handlers.slice();
      this.handlers = [];
      asap(() => {
        handlers.forEach(h => {
          if (this.state === "fulfilled" && typeof h.onFulfilled === "function") h.onFulfilled(this.value);
          if (this.state === "rejected" && typeof h.onRejected === "function") h.onRejected(this.value);
        });
      });
    };

    const resolve = (v) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = v;
      flush();
    };
    const reject = (e) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.value = e;
      flush();
    };

    try { executor(resolve, reject); } catch (e) { reject(e); }
  }

  then(onFulfilled, onRejected) {
    this.handlers.push({ onFulfilled, onRejected });
    // If already settled, flush (still async)
    if (this.state !== "pending") {
      const flushNow = this.handlers.slice();
      this.handlers = [];
      asap(() => {
        flushNow.forEach(h => {
          if (this.state === "fulfilled" && typeof h.onFulfilled === "function") h.onFulfilled(this.value);
          if (this.state === "rejected" && typeof h.onRejected === "function") h.onRejected(this.value);
        });
      });
    }
  }
}

const p = new MyPromise((res) => res("OK"));
console.log("A");
p.then(() => console.log("B"));
console.log("C");`,
                    fixFocus: { fromLine: 35, toLine: 46 },
                    whatToNotice: [
                        "Correct behavior is A, C, B (then is async).",
                        "We schedule handler execution using queueMicrotask or Promise.resolve().then()."
                    ]
                },
                {
                    id: "d22-step-2",
                    title: "Chaining: then() must return a NEW promise",
                    subtitle: "Fix by returning a new promise and resolving with handler result",
                    teacherNote: "The chain should transform values: 1 → 2 → 4.",
                    bugCode: `console.clear();

class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];
    const resolve = (v) => { this.state = "fulfilled"; this.value = v; this.handlers.forEach(h => h(v)); };
    executor(resolve, () => {});
  }
  then(onFulfilled) {
    if (this.state === "fulfilled") onFulfilled(this.value);
    else this.handlers.push(onFulfilled);
    return this; // ❌ wrong: returns same promise
  }
}

new MyPromise((res) => res(1))
  .then(x => x + 1)
  .then(x => x * 2)
  .then(x => console.log("result should be 4, got:", x));`,
                    bugFocus: { fromLine: 12, toLine: 13 },
                    fixCode: `console.clear();

const asap = (fn) => (typeof queueMicrotask === "function" ? queueMicrotask(fn) : Promise.resolve().then(fn));

function isThenable(x) { return x != null && (typeof x === "object" || typeof x === "function") && typeof x.then === "function"; }

class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];

    const settle = (state, v) => {
      if (this.state !== "pending") return;
      this.state = state;
      this.value = v;
      const hs = this.handlers.slice();
      this.handlers = [];
      asap(() => hs.forEach(h => h()));
    };

    const resolve = (v) => {
      if (isThenable(v)) return v.then(resolve, reject);
      settle("fulfilled", v);
    };
    const reject = (e) => settle("rejected", e);

    try { executor(resolve, reject); } catch (e) { reject(e); }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const run = () => {
        try {
          if (this.state === "fulfilled") {
            if (typeof onFulfilled !== "function") return resolve(this.value);
            const out = onFulfilled(this.value);
            return resolve(out);
          }
          if (this.state === "rejected") {
            if (typeof onRejected !== "function") return reject(this.value);
            const out = onRejected(this.value);
            return resolve(out);
          }
          // pending should not call run yet
        } catch (e) {
          reject(e);
        }
      };

      if (this.state === "pending") this.handlers.push(run);
      else asap(run);
    });
  }

  catch(onRejected) { return this.then(null, onRejected); }
  static resolve(v) { return new MyPromise((res) => res(v)); }
}

new MyPromise((res) => res(1))
  .then(x => x + 1)
  .then(x => x * 2)
  .then(x => console.log("result:", x));`,
                    fixFocus: { fromLine: 29, toLine: 62 },
                    whatToNotice: [
                        "then returns a NEW promise whose value is the handler output.",
                        "If the handler throws, the returned promise rejects."
                    ]
                }
            ],
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  Day 22 Live Lab: A minimal promise you can reason about             ║
║  Focus: async handlers + chaining + error propagation                ║
╚══════════════════════════════════════════════════════════════════════╝
*/

console.clear();

const asap = (fn) => (typeof queueMicrotask === "function" ? queueMicrotask(fn) : Promise.resolve().then(fn));
const isThenable = (x) => x != null && (typeof x === "object" || typeof x === "function") && typeof x.then === "function";

class MyPromise {
  constructor(executor) {
    this._state = "pending"; // pending | fulfilled | rejected
    this._value = undefined;
    this._queue = [];

    const flush = () => {
      const jobs = this._queue.slice();
      this._queue = [];
      asap(() => jobs.forEach((j) => j()));
    };

    const resolve = (v) => {
      if (this._state !== "pending") return;
      if (isThenable(v)) return v.then(resolve, reject);
      this._state = "fulfilled";
      this._value = v;
      flush();
    };
    const reject = (e) => {
      if (this._state !== "pending") return;
      this._state = "rejected";
      this._value = e;
      flush();
    };

    try { executor(resolve, reject); } catch (e) { reject(e); }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const run = () => {
        try {
          if (this._state === "fulfilled") {
            if (typeof onFulfilled !== "function") return resolve(this._value);
            return resolve(onFulfilled(this._value));
          }
          if (this._state === "rejected") {
            if (typeof onRejected !== "function") return reject(this._value);
            return resolve(onRejected(this._value));
          }
        } catch (e) {
          reject(e);
        }
      };

      if (this._state === "pending") this._queue.push(run);
      else asap(run);
    });
  }

  catch(onRejected) { return this.then(null, onRejected); }
  finally(onFinally) {
    const f = typeof onFinally === "function" ? onFinally : () => {};
    return this.then(
      (v) => MyPromise.resolve(f()).then(() => v),
      (e) => MyPromise.resolve(f()).then(() => { throw e; })
    );
  }

  static resolve(v) { return new MyPromise((res) => res(v)); }
  static reject(e) { return new MyPromise((_, rej) => rej(e)); }
}

console.log("Test 1: then is async");
const p1 = new MyPromise((res) => res("OK"));
console.log("A");
p1.then(() => console.log("B"));
console.log("C");

console.log("Test 2: chaining transforms values");
MyPromise.resolve(1)
  .then((x) => x + 1)
  .then((x) => x * 2)
  .then((x) => console.log("chain result:", x));

console.log("Test 3: errors propagate to returned promise");
MyPromise.resolve("start")
  .then(() => { throw new Error("boom"); })
  .then(() => console.log("should not run"))
  .catch((e) => console.log("caught:", e.message));`,
            recap: {
                takeaways: [
                    "Promises are a state machine: pending becomes fulfilled OR rejected exactly once.",
                    "then handlers must run asynchronously to avoid inconsistent ordering bugs.",
                    "then returns a new promise representing the handler outcome (value mapping + error propagation).",
                    "If a handler returns a thenable, the chain waits (thenable unwrapping)."
                ],
                commonMistakes: [
                    "Calling then handlers synchronously when already settled.",
                    "Returning the same promise from then (breaks chaining semantics).",
                    "Not handling thrown errors inside handlers (should reject the returned promise).",
                    "Not unwrapping thenables (nested promises appear instead of values)."
                ],
                nextActions: [
                    "Add MyPromise.all and MyPromise.race on top of this base.",
                    "Write tests for: multiple then calls, reject path, throwing inside executor, and returning a native Promise from a handler."
                ]
            },
            comparison: {
                junior: `// ❌ Uses Promises but doesn't understand
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// "I use Promises every day"
// But can't explain: microtasks, chaining,
// state machine, or handler queueing`,
                senior: `// ✅ Understands Promise internals
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.handlers = [];
    
    const resolve = (value) => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = value;
      // Run handlers in microtask queue
      queueMicrotask(() => this.runHandlers());
    };
    // ...complete implementation
  }
}`
            },
            interview: {
                questions: [
                    { q: "Why must handlers run asynchronously (microtask)?", a: "Promises/A+ spec requires it. It ensures consistent behavior - handlers always run after the current execution context, whether the promise is already resolved or pending." },
                    { q: "What happens if you call resolve() twice?", a: "The second call is ignored. A promise can only transition from pending to fulfilled/rejected ONCE. We check state !== 'pending' before changing state." },
                    { q: "Why does then() return a new Promise?", a: "For chaining. Each then() creates a new promise that resolves with the return value of its handler. This enables .then().then().then() chains." },
                    { q: "How do you handle when handler returns a Promise?", a: "Thenable unwrapping. If handler returns a promise-like object (has .then method), we wait for it to settle and use its value. This is why you can return fetch() from then()." }
                ]
            }
        },
        {
            day: 23,
            title: '🔥 Event Emitter & Pub-Sub Pattern',
            intro: "Build Node.js EventEmitter from scratch. Used in React, Redux, Socket.io, and every event-driven system.",
            content: `
<div class="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 p-4 rounded-xl mb-6">
<h4 class="text-blue-400 font-bold mb-2">🎯 Where It's Used</h4>
<p class="text-light-300">Redux (subscribe), React (synthetic events), Node.js (EventEmitter), DOM (addEventListener), Socket.io, RxJS - they all use this pattern!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📐 The Pub-Sub Architecture</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────┐
│                 EVENT EMITTER PATTERN                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Publisher ──emit('event', data)──▶ Event Emitter      │
│                                          │              │
│                                          ▼              │
│   ┌──────────────────────────────────────────────────┐  │
│   │  events = {                                      │  │
│   │    'click': [handler1, handler2],                │  │
│   │    'submit': [handler3],                         │  │
│   │    'error': [handler4, handler5, handler6]       │  │
│   │  }                                               │  │
│   └──────────────────────────────────────────────────┘  │
│                          │                              │
│          ┌───────────────┼───────────────┐              │
│          ▼               ▼               ▼              │
│     Subscriber1     Subscriber2     Subscriber3         │
│                                                         │
└─────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Methods to Implement</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">on(event, handler)</code> - Subscribe to event</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">off(event, handler)</code> - Unsubscribe</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">emit(event, ...args)</code> - Trigger event</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">once(event, handler)</code> - Subscribe once</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">removeAllListeners(event)</code> - Clear all</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚡ Advanced Features</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-yellow-400 mb-2">Wildcard Events</h4>
    <p class="text-sm text-light-300">Subscribe to '*' to receive ALL events</p>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-yellow-400 mb-2">Max Listeners</h4>
    <p class="text-sm text-light-300">Warn if too many listeners (memory leak detection)</p>
</div>
</div>
            `,
            masteryChecklist: [
                { id: "d23-c1", text: "I can explain pub-sub vs direct callbacks and why decoupling helps." },
                { id: "d23-c2", text: "I can implement on, off, emit, and once correctly (including correct removal)." },
                { id: "d23-c3", text: "I can prevent emit() iteration bugs by snapshotting listeners." },
                { id: "d23-c4", text: "I can explain how event listeners can cause memory leaks and how to clean up." },
                { id: "d23-c5", text: "I can design an async emit that awaits all listeners if needed." }
            ],
            predictions: [
                {
                    prompt: "If a listener removes itself during emit, a robust emitter should…",
                    options: [
                        "Crash (modifying arrays is illegal)",
                        "Skip some listeners unpredictably (normal behavior)",
                        "Still call all listeners that existed at emit start (by cloning/snapshotting)",
                        "Restart emit from the beginning"
                    ],
                    correctIndex: 2,
                    explanation: "Snapshotting the listener list at emit time avoids mid-iteration mutation bugs."
                },
                {
                    prompt: "What is the core purpose of an EventEmitter?",
                    options: [
                        "Make code shorter",
                        "Decouple producer from consumers (one-to-many notifications)",
                        "Replace async/await",
                        "Avoid using objects"
                    ],
                    correctIndex: 1,
                    explanation: "Producers emit events without knowing who listens; subscribers can come and go independently."
                },
                {
                    prompt: "once(event, handler) is best implemented by…",
                    options: [
                        "Setting a global flag",
                        "Calling handler twice to confirm it runs",
                        "Wrapping handler and removing wrapper after first call",
                        "Throwing after first call"
                    ],
                    correctIndex: 2,
                    explanation: "A wrapper calls the handler and immediately unsubscribes itself."
                }
            ],
            checkpoints: [
                {
                    prompt: "Why clone/snapshot listeners inside emit()?",
                    options: [
                        "It makes emit faster",
                        "It prevents bugs when listeners add/remove listeners during emit",
                        "It allows wildcard events",
                        "It prevents exceptions"
                    ],
                    correctIndex: 1,
                    explanation: "Iterating a live array that changes can skip or duplicate calls."
                },
                {
                    prompt: "A classic EventEmitter memory leak happens when…",
                    options: [
                        "You use too many console.logs",
                        "You keep adding listeners but never remove them",
                        "You emit too often",
                        "You use arrow functions"
                    ],
                    correctIndex: 1,
                    explanation: "The emitter retains references to listeners, so forgotten cleanups grow memory usage over time."
                },
                {
                    prompt: "Which method is most useful when you only need the first event occurrence?",
                    options: ["emit", "on", "once", "eventNames"],
                    correctIndex: 2,
                    explanation: "once auto-unsubscribes after the first emit."
                }
            ],
            labSteps: [
                {
                    id: "d23-step-1",
                    title: "Bug: once() fires forever",
                    subtitle: "Fix by removing the wrapper after first call",
                    teacherNote: "Predict: After two emits, how many times should the once handler run?",
                    bugCode: `console.clear();

class Emitter {
  constructor() { this.events = Object.create(null); }
  on(evt, fn) { (this.events[evt] ||= []).push(fn); return () => this.off(evt, fn); }
  off(evt, fn) { this.events[evt] = (this.events[evt] || []).filter(f => f !== fn); }
  once(evt, fn) {
    // BUG: doesn't remove, so it behaves like on()
    this.on(evt, fn);
  }
  emit(evt, ...args) { (this.events[evt] || []).forEach(f => f(...args)); }
}

const e = new Emitter();
e.once("ready", (x) => console.log("once ready:", x));
e.emit("ready", 1);
e.emit("ready", 2);`,
                    bugFocus: { fromLine: 6, toLine: 9 },
                    fixCode: `console.clear();

class Emitter {
  constructor() { this.events = Object.create(null); }
  on(evt, fn) { (this.events[evt] ||= []).push(fn); return () => this.off(evt, fn); }
  off(evt, fn) { this.events[evt] = (this.events[evt] || []).filter(f => f !== fn); }
  once(evt, fn) {
    const off = this.on(evt, (...args) => {
      off(); // remove wrapper immediately
      fn(...args);
    });
    return off;
  }
  emit(evt, ...args) { (this.events[evt] || []).forEach(f => f(...args)); }
}

const e = new Emitter();
e.once("ready", (x) => console.log("once ready:", x));
e.emit("ready", 1);
e.emit("ready", 2);`,
                    fixFocus: { fromLine: 6, toLine: 14 },
                    whatToNotice: [
                        "once is just on + self-removal.",
                        "Returning an unsubscribe function makes cleanup easy."
                    ]
                },
                {
                    id: "d23-step-2",
                    title: "Bug: emit can be non-deterministic",
                    subtitle: "Fix by snapshotting listeners before iterating",
                    teacherNote: "If listeners add/remove listeners while emitting, you can skip or double-call without a snapshot.",
                    bugCode: `console.clear();

class Emitter {
  constructor() { this.events = Object.create(null); }
  on(evt, fn) { (this.events[evt] ||= []).push(fn); return () => this.off(evt, fn); }
  off(evt, fn) { this.events[evt] = (this.events[evt] || []).filter(f => f !== fn); }
  emit(evt, ...args) {
    // BUG: iterating over live array that can change during emit
    (this.events[evt] || []).forEach(f => f(...args));
  }
}

const e = new Emitter();
const offA = e.on("tick", () => { console.log("A"); offA(); });
e.on("tick", () => console.log("B"));
e.on("tick", () => console.log("C"));
e.emit("tick");`,
                    bugFocus: { fromLine: 6, toLine: 9 },
                    fixCode: `console.clear();

class Emitter {
  constructor() { this.events = Object.create(null); }
  on(evt, fn) { (this.events[evt] ||= []).push(fn); return () => this.off(evt, fn); }
  off(evt, fn) { this.events[evt] = (this.events[evt] || []).filter(f => f !== fn); }
  emit(evt, ...args) {
    const snapshot = (this.events[evt] || []).slice();
    snapshot.forEach(f => f(...args));
  }
}

const e = new Emitter();
const offA = e.on("tick", () => { console.log("A"); offA(); });
e.on("tick", () => console.log("B"));
e.on("tick", () => console.log("C"));
e.emit("tick");`,
                    fixFocus: { fromLine: 6, toLine: 10 },
                    whatToNotice: [
                        "Snapshotting makes emit deterministic.",
                        "This is how mature emitters avoid mid-emit mutation bugs."
                    ]
                }
            ],
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  Day 23 Live Lab: Build an EventEmitter you can trust                ║
║  Focus: on/off/once + deterministic emit                             ║
╚══════════════════════════════════════════════════════════════════════╝
*/

console.clear();

class EventEmitter {
  constructor() {
    this.events = Object.create(null);
  }

  on(event, listener) {
    if (typeof listener !== "function") throw new TypeError("listener must be a function");
    (this.events[event] ||= []).push(listener);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    const list = this.events[event];
    if (!list) return;
    this.events[event] = list.filter((fn) => fn !== listener && fn._original !== listener);
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };
    wrapper._original = listener;
    return this.on(event, wrapper);
  }

  emit(event, ...args) {
    const list = this.events[event];
    if (!list || list.length === 0) return false;
    const snapshot = list.slice();
    snapshot.forEach((fn) => fn(...args));
    return true;
  }
}

const bus = new EventEmitter();
bus.on("message", (txt) => console.log("message:", txt));
bus.once("ready", () => console.log("ready (once)"));

console.log("Emit ready twice:");
bus.emit("ready");
bus.emit("ready");

console.log("Emit message twice:");
bus.emit("message", "Hello");
bus.emit("message", "World");

console.log("Test: mutation during emit does not skip listeners");
const unsubA = bus.on("tick", () => { console.log("A"); unsubA(); });
bus.on("tick", () => console.log("B"));
bus.on("tick", () => console.log("C"));
bus.emit("tick");`,
            recap: {
                takeaways: [
                    "EventEmitter is pub-sub: producers emit events without knowing consumers.",
                    "once is implemented by wrapping the handler and removing it after first run.",
                    "emit must be deterministic; snapshot listeners to avoid mid-emit mutation bugs.",
                    "Always unsubscribe in cleanup to avoid memory leaks (emitters keep references)."
                ],
                commonMistakes: [
                    "Implementing once without removal (it becomes on).",
                    "Iterating a live listeners array during emit (can skip/double-call).",
                    "Forgetting cleanup in long-lived apps."
                ],
                nextActions: [
                    "Add emitAsync(event, ...args) that awaits Promise.all of listener results.",
                    "Add wildcard or namespaced events if your product needs them."
                ]
            },
            comparison: {
                junior: `// ❌ Basic callback pattern
function onMessage(callback) {
  // Direct callback - no flexibility
  someSource.ondata = callback;
}

// Can't: multiple listeners, remove, once`,
                senior: `// ✅ Full EventEmitter pattern
class EventEmitter {
  on(event, fn) {
    (this.events[event] ??= []).push(fn);
    return this;
  }
  
  emit(event, ...args) {
    this.events[event]?.forEach(fn => fn(...args));
  }
  
  off(event, fn) {
    this.events[event] = 
      this.events[event]?.filter(f => f !== fn);
  }
}`
            },
            interview: {
                questions: [
                    { q: "How do you implement once()?", a: "Create a wrapper function that calls the original listener, then immediately calls off() to remove itself. Store reference to original for off() matching." },
                    { q: "Why clone the listeners array before emitting?", a: "A listener might call off() or on() during execution, modifying the array while iterating. Cloning prevents bugs from mid-iteration mutation." },
                    { q: "How would you implement async emit?", a: "Return a Promise that resolves when all listeners complete. Use Promise.all() with listeners that may return promises. Useful for middleware patterns." },
                    { q: "What's a memory leak concern with EventEmitter?", a: "Forgetting to call off() for listeners, especially in React useEffect without cleanup. Node.js warns at 10+ listeners. Always unsubscribe in cleanup." }
                ]
            }
        },
        {
            day: 24,
            title: '🔥 Debounce & Throttle with Cancel',
            intro: "The most asked utility functions. Build production-grade versions with cancel, immediate, and trailing options.",
            content: `
<div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 p-4 rounded-xl mb-6">
<h4 class="text-green-400 font-bold mb-2">🎯 Interview Frequency: VERY HIGH</h4>
<p class="text-light-300">Asked at almost every frontend interview. You need to know the difference, implementation, AND use cases.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ Debounce vs Throttle</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│  User Actions:  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                 ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲                 ▲ ▲ ▲ ▲ ▲    │
│                 (rapid clicks/keystrokes)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  DEBOUNCE:      ─────────────────────────────────▶ ● (ONE call) │
│                 "Wait until user STOPS, then fire"              │
│                 Use: Search input, resize, auto-save            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  THROTTLE:      ───●───────●───────●───────●───────●────        │
│                 "Fire at most once per X ms"                    │
│                 Use: Scroll, mouse move, game loops             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Production Features</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">cancel()</code> - Cancel pending execution</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">flush()</code> - Execute immediately</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">leading</code> - Fire on first call</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">trailing</code> - Fire after delay</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">maxWait</code> - Max time to wait (throttle hybrid)</li>
</ul>
            `,
            masteryChecklist: [
                { id: "d24-c1", text: "I can explain debounce vs throttle in one sentence each, with a real use case." },
                { id: "d24-c2", text: "I can implement debounce with correct args + this binding, plus cancel() and flush()." },
                { id: "d24-c3", text: "I can implement throttle with leading/trailing options (or as debounce + maxWait)." },
                { id: "d24-c4", text: "I can explain why cancel() matters for UI cleanup (avoid running after unmount)." },
                { id: "d24-c5", text: "I can test timing behavior using deterministic logs (counts + timestamps)." }
            ],
            predictions: [
                {
                    prompt: "Debounce is best for…",
                    options: [
                        "Scroll handlers (continuous stream)",
                        "Search input (wait until user stops typing)",
                        "Animation loops",
                        "A function that must run exactly 60 times/sec"
                    ],
                    correctIndex: 1,
                    explanation: "Debounce waits for inactivity, so it’s ideal for expensive work triggered by bursts (typing, resize)."
                },
                {
                    prompt: "Throttle guarantees…",
                    options: [
                        "The function runs only once total",
                        "The function runs at most once per interval (plus optional trailing)",
                        "The function runs exactly every interval",
                        "The function runs after the user stops"
                    ],
                    correctIndex: 1,
                    explanation: "Throttle limits rate. It does not guarantee exact periodic execution; it guarantees a maximum frequency."
                },
                {
                    prompt: "Why is cancel() important for debounce/throttle in UI components?",
                    options: [
                        "To make the function faster",
                        "To avoid a pending timer firing after the component unmounts",
                        "To prevent Promises from resolving",
                        "To improve CSS rendering"
                    ],
                    correctIndex: 1,
                    explanation: "If a timer fires after unmount, it can update stale state or leak memory. cancel() is cleanup."
                }
            ],
            checkpoints: [
                {
                    prompt: "Debounce means…",
                    options: [
                        "Run immediately, then ignore calls for N ms",
                        "Run after N ms of no calls",
                        "Run on every call but slower",
                        "Run only on the server"
                    ],
                    correctIndex: 1,
                    explanation: "Debounce delays execution until the burst stops (inactivity window)."
                },
                {
                    prompt: "In a correct debounce implementation, which must be preserved?",
                    options: ["Only the last timestamp", "The last args and this value", "Only the first args", "Nothing"],
                    correctIndex: 1,
                    explanation: "When the delayed call finally runs, it should run with the last arguments and the right this context."
                },
                {
                    prompt: "A common way lodash implements throttle is…",
                    options: [
                        "Using recursion",
                        "Using debounce with maxWait equal to wait",
                        "Using eval",
                        "Using requestIdleCallback only"
                    ],
                    correctIndex: 1,
                    explanation: "Throttle can be expressed as debounce with a maximum wait so it must fire at least once per interval."
                }
            ],
            labSteps: [
                {
                    id: "d24-step-1",
                    title: "Bug: debounce loses arguments and this",
                    subtitle: "Fix by capturing lastArgs/lastThis",
                    teacherNote: "Predict: should the final log print 'TYPING: 4' or something else?",
                    bugCode: `console.clear();

function debounce(fn, wait) {
  let t = null;
  return function() {
    clearTimeout(t);
    // BUG: ignores args + this
    t = setTimeout(fn, wait);
  };
}

const tracker = {
  prefix: "TYPING",
  log(n) { console.log(this.prefix + ":", n); }
};

const d = debounce(tracker.log, 80);

for (let i = 0; i < 5; i++) {
  d.call(tracker, i);
}`,
                    bugFocus: { fromLine: 3, toLine: 8 },
                    fixCode: `console.clear();

function debounce(fn, wait) {
  let t = null;
  let lastArgs = null;
  let lastThis = null;

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;
    clearTimeout(t);
    t = setTimeout(() => {
      t = null;
      fn.apply(lastThis, lastArgs);
    }, wait);
  }

  debounced.cancel = () => { if (t) clearTimeout(t); t = null; };
  debounced.flush = () => {
    if (!t) return;
    clearTimeout(t);
    t = null;
    fn.apply(lastThis, lastArgs);
  };

  return debounced;
}

const tracker = {
  prefix: "TYPING",
  log(n) { console.log(this.prefix + ":", n); }
};

const d = debounce(tracker.log, 80);
for (let i = 0; i < 5; i++) d.call(tracker, i);`,
                    fixFocus: { fromLine: 3, toLine: 25 },
                    whatToNotice: [
                        "The final call should use the last args (4) and correct this (tracker).",
                        "cancel() and flush() are part of production-grade APIs."
                    ]
                },
                {
                    id: "d24-step-2",
                    title: "Throttle: limit rate while keeping trailing call",
                    subtitle: "Fix a naive throttle that drops the last call",
                    teacherNote: "A good throttle usually runs at most once per interval, but still runs the final call (trailing) if there was activity.",
                    bugCode: `console.clear();

function throttle(fn, wait) {
  let inFlight = false;
  return function(...args) {
    if (inFlight) return; // BUG: drops trailing call completely
    inFlight = true;
    fn.apply(this, args);
    setTimeout(() => { inFlight = false; }, wait);
  };
}

const t = throttle((x) => console.log("throttled:", x), 60);
let i = 0;
const timer = setInterval(() => {
  t(i++);
  if (i > 8) clearInterval(timer);
}, 10);`,
                    bugFocus: { fromLine: 3, toLine: 10 },
                    fixCode: `console.clear();

function throttle(fn, wait, options = {}) {
  const leading = options.leading !== false;
  const trailing = options.trailing !== false;

  let lastCallTime = 0;
  let t = null;
  let lastArgs = null;
  let lastThis = null;

  function invoke(time) {
    lastCallTime = time;
    const args = lastArgs;
    const ctx = lastThis;
    lastArgs = lastThis = null;
    fn.apply(ctx, args);
  }

  function throttled(...args) {
    const now = Date.now();
    if (!lastCallTime && !leading) lastCallTime = now;

    const remaining = wait - (now - lastCallTime);
    lastArgs = args;
    lastThis = this;

    if (remaining <= 0) {
      if (t) { clearTimeout(t); t = null; }
      invoke(now);
    } else if (trailing && !t) {
      t = setTimeout(() => {
        t = null;
        invoke(Date.now());
      }, remaining);
    }
  }

  throttled.cancel = () => { if (t) clearTimeout(t); t = null; lastArgs = lastThis = null; lastCallTime = 0; };
  throttled.flush = () => { if (t) { clearTimeout(t); t = null; invoke(Date.now()); } };
  return throttled;
}

const t = throttle((x) => console.log("throttled:", x), 60, { leading: true, trailing: true });
let i = 0;
const timer = setInterval(() => {
  t(i++);
  if (i > 8) clearInterval(timer);
}, 10);`,
                    fixFocus: { fromLine: 3, toLine: 44 },
                    whatToNotice: [
                        "Naive throttle drops the final intent (last call).",
                        "Trailing behavior preserves the most recent args to run after the wait."
                    ]
                }
            ],
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  Day 24 Live Lab: Debounce vs Throttle (console simulation)          ║
║  Watch call counts + timestamps                                      ║
╚══════════════════════════════════════════════════════════════════════╝
*/

console.clear();

function debounce(fn, wait) {
  let t = null;
  let lastArgs = null;
  let lastThis = null;

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;
    if (t) clearTimeout(t);
    t = setTimeout(() => {
      t = null;
      fn.apply(lastThis, lastArgs);
    }, wait);
  }

  debounced.cancel = () => { if (t) clearTimeout(t); t = null; lastArgs = lastThis = null; };
  debounced.flush = () => { if (!t) return; clearTimeout(t); t = null; fn.apply(lastThis, lastArgs); };
  return debounced;
}

function throttle(fn, wait, options = {}) {
  const leading = options.leading !== false;
  const trailing = options.trailing !== false;

  let lastCallTime = 0;
  let t = null;
  let lastArgs = null;
  let lastThis = null;

  function invoke(time) {
    lastCallTime = time;
    const args = lastArgs;
    const ctx = lastThis;
    lastArgs = lastThis = null;
    fn.apply(ctx, args);
  }

  function throttled(...args) {
    const now = Date.now();
    if (!lastCallTime && !leading) lastCallTime = now;

    const remaining = wait - (now - lastCallTime);
    lastArgs = args;
    lastThis = this;

    if (remaining <= 0) {
      if (t) { clearTimeout(t); t = null; }
      invoke(now);
    } else if (trailing && !t) {
      t = setTimeout(() => {
        t = null;
        invoke(Date.now());
      }, remaining);
    }
  }

  throttled.cancel = () => { if (t) clearTimeout(t); t = null; lastArgs = lastThis = null; lastCallTime = 0; };
  throttled.flush = () => { if (t) { clearTimeout(t); t = null; invoke(Date.now()); } };
  return throttled;
}

let debouncedCount = 0;
let throttledCount = 0;

const debounced = debounce((x) => {
  debouncedCount++;
  console.log("DEBOUNCED:", x, "count:", debouncedCount, "t:", Date.now() % 100000);
}, 80);

const throttled = throttle((x) => {
  throttledCount++;
  console.log("THROTTLED:", x, "count:", throttledCount, "t:", Date.now() % 100000);
}, 80, { leading: true, trailing: true });

console.log("Simulating 12 rapid calls (every 10ms)...");
let i = 0;
const timer = setInterval(() => {
  debounced(i);
  throttled(i);
  i++;
  if (i >= 12) {
    clearInterval(timer);
    setTimeout(() => {
      console.log("Final counts -> debounced:", debouncedCount, "throttled:", throttledCount);
    }, 140);
  }
}, 10);`,
            recap: {
                takeaways: [
                    "Debounce waits for silence; throttle limits rate.",
                    "Correct implementations preserve args + this, and expose cancel/flush for cleanup and control.",
                    "Trailing calls often matter because they preserve the user's final intent."
                ],
                commonMistakes: [
                    "Dropping the last call unintentionally (throttle without trailing).",
                    "Losing this/args in debounce (calling fn without apply).",
                    "Forgetting cancel() on cleanup (timers firing after unmount)."
                ],
                nextActions: [
                    "Try throttle with trailing:false and see how it changes behavior.",
                    "Add maxWait to debounce to build a lodash-style throttle."
                ]
            },
            comparison: {
                junior: `// ❌ Basic debounce without cancel
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
// Missing: cancel, flush, leading option, 'this' context`,
                senior: `// ✅ Production debounce
function debounce(fn, delay, { leading, trailing } = {}) {
  let timer, lastArgs;
  
  const debounced = function(...args) {
    lastArgs = args;
    
    if (leading && !timer) {
      fn.apply(this, args);
    }
    
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (trailing) fn.apply(this, lastArgs);
      timer = null;
    }, delay);
  };
  
  debounced.cancel = () => clearTimeout(timer);
  debounced.flush = () => timer && fn(...lastArgs);
  return debounced;
}`
            },
            interview: {
                questions: [
                    { q: "When to use debounce vs throttle?", a: "Debounce: search input, resize, auto-save (wait for user to stop). Throttle: scroll handler, mouse move, game loop (limit rate of execution)." },
                    { q: "What is the 'leading' option?", a: "Fire immediately on first call, then wait. Useful for button clicks where you want instant feedback but prevent double-click." },
                    { q: "Why is cancel() important?", a: "Memory leak prevention. If component unmounts while timer pending, callback might fire on unmounted component. Always cancel in cleanup." },
                    { q: "How does lodash throttle work internally?", a: "It's actually debounce with maxWait equal to wait time! maxWait ensures function fires at least once per interval even if continuously called." }
                ]
            }
        },
        {
            day: 25,
            title: '🔥 Deep Clone, Deep Equal & Flatten',
            intro: "Core utility functions every senior dev must master. Handle circular refs, symbols, and edge cases.",
            content: `
<div class="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 p-4 rounded-xl mb-6">
<h4 class="text-amber-400 font-bold mb-2">🎯 Why These Matter</h4>
<p class="text-light-300">JSON.parse(JSON.stringify()) fails for: functions, undefined, symbols, dates, circular refs, maps, sets. Real apps need proper solutions.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📋 Three Must-Know Utilities</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">deepClone</code> - Copy object with all nested values</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">deepEqual</code> - Compare objects deeply</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">flatten</code> - Flatten nested object/array</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">⚠️ Edge Cases to Handle</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-red-400 mb-2">Deep Clone Edge Cases</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Circular references</li>
        <li>Date, RegExp, Map, Set</li>
        <li>Functions (can't clone)</li>
        <li>Symbols as keys</li>
        <li>Prototype chain</li>
    </ul>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-red-400 mb-2">Deep Equal Edge Cases</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>NaN === NaN should be true</li>
        <li>+0 vs -0 difference</li>
        <li>Object vs Array distinction</li>
        <li>Null vs undefined</li>
        <li>Property order matters?</li>
    </ul>
</div>
</div>
            `,
            masteryChecklist: [
                { id: "d25-c1", text: "I can explain why JSON.parse(JSON.stringify(x)) is not a real deep clone." },
                { id: "d25-c2", text: "I can deep-clone objects with circular references using WeakMap." },
                { id: "d25-c3", text: "I can write a deepEqual that handles NaN and distinguishes +0 vs -0 (Object.is)." },
                { id: "d25-c4", text: "I can flatten and unflatten objects without losing keys and understand dot-notation tradeoffs." },
                { id: "d25-c5", text: "I can explain what cannot/should not be cloned (functions, DOM nodes, class instances) without a policy." }
            ],
            predictions: [
                {
                    prompt: "What happens if you run JSON.stringify on a circular object?",
                    options: [
                        "It returns null",
                        "It silently drops the circular reference",
                        "It throws 'Converting circular structure to JSON'",
                        "It converts it into [Circular]"
                    ],
                    correctIndex: 2,
                    explanation: "JSON.stringify cannot represent cycles. It throws to prevent infinite recursion."
                },
                {
                    prompt: "Which comparison treats NaN as equal to NaN?",
                    options: ["NaN === NaN", "Object.is(NaN, NaN)", "NaN == NaN", "Number(NaN) === Number(NaN)"],
                    correctIndex: 1,
                    explanation: "Object.is handles NaN correctly. In JS, NaN is not equal to itself with == or ===."
                },
                {
                    prompt: "Which statement about +0 and -0 is true?",
                    options: [
                        "+0 === -0 is false",
                        "+0 === -0 is true but Object.is(+0, -0) is false",
                        "+0 === -0 is false but Object.is(+0, -0) is true",
                        "They are always different in all comparisons"
                    ],
                    correctIndex: 1,
                    explanation: "+0 and -0 compare equal with ===, but Object.is distinguishes them."
                }
            ],
            checkpoints: [
                {
                    prompt: "Why use WeakMap for deepClone cycle tracking?",
                    options: [
                        "WeakMap is faster than Map in all cases",
                        "WeakMap keys must be strings",
                        "WeakMap does not prevent garbage collection of keys",
                        "WeakMap automatically serializes objects"
                    ],
                    correctIndex: 2,
                    explanation: "WeakMap avoids memory leaks because it doesn’t keep objects alive just because you used them as keys."
                },
                {
                    prompt: "A good deepEqual should…",
                    options: [
                        "Compare only JSON strings",
                        "Treat arrays and objects the same",
                        "Handle special cases like Date/RegExp/Map/Set (or define a policy)",
                        "Ignore symbol keys"
                    ],
                    correctIndex: 2,
                    explanation: "Real-world structures include more than plain objects. Either handle them or clearly define what you support."
                },
                {
                    prompt: "When flattening objects into 'a.b.c' keys, the biggest risk is…",
                    options: [
                        "It becomes too fast",
                        "Key collisions and ambiguity when keys themselves contain dots",
                        "It stops working in Node.js",
                        "It breaks numbers"
                    ],
                    correctIndex: 1,
                    explanation: "Dot-notation is a convention; if original keys contain dots, you need an escaping scheme or a different encoding."
                }
            ],
            labSteps: [
                {
                    id: "d25-step-1",
                    title: "Bug: 'deep clone' via JSON breaks Date + cycles",
                    subtitle: "Fix with WeakMap + type handling",
                    teacherNote: "Predict: does it clone the Date? And what happens with the circular ref?",
                    bugCode: `console.clear();

const original = { createdAt: new Date("2025-01-01"), nested: { x: 1 } };
original.self = original; // circular

// BUG: JSON deep clone
const clone = JSON.parse(JSON.stringify(original));
console.log("clone:", clone);
console.log("clone.createdAt instanceof Date:", clone.createdAt instanceof Date);`,
                    bugFocus: { fromLine: 6, toLine: 6 },
                    fixCode: `console.clear();

function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value);

  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  if (value instanceof Map) {
    const m = new Map();
    seen.set(value, m);
    value.forEach((v, k) => m.set(deepClone(k, seen), deepClone(v, seen)));
    return m;
  }
  if (value instanceof Set) {
    const s = new Set();
    seen.set(value, s);
    value.forEach((v) => s.add(deepClone(v, seen)));
    return s;
  }
  if (Array.isArray(value)) {
    const arr = [];
    seen.set(value, arr);
    for (let i = 0; i < value.length; i++) arr[i] = deepClone(value[i], seen);
    return arr;
  }

  const out = Object.create(Object.getPrototypeOf(value));
  seen.set(value, out);
  Reflect.ownKeys(value).forEach((k) => { out[k] = deepClone(value[k], seen); });
  return out;
}

const original = { createdAt: new Date("2025-01-01"), nested: { x: 1 } };
original.self = original;
const clone = deepClone(original);
console.log("clone.createdAt instanceof Date:", clone.createdAt instanceof Date);
console.log("cycle preserved:", clone.self === clone);`,
                    fixFocus: { fromLine: 3, toLine: 28 },
                    whatToNotice: [
                        "WeakMap breaks cycles safely.",
                        "Type-specific cloning preserves Date/RegExp/Map/Set semantics."
                    ]
                },
                {
                    id: "d25-step-2",
                    title: "Bug: deepEqual via JSON misses NaN and special cases",
                    subtitle: "Fix with recursion + Object.is",
                    teacherNote: "Predict: should these be equal?",
                    bugCode: `console.clear();

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

console.log("NaN equal?", deepEqual({ x: NaN }, { x: NaN }));
console.log("Dates equal?", deepEqual({ d: new Date(0) }, { d: new Date(0) }));`,
                    bugFocus: { fromLine: 3, toLine: 4 },
                    fixCode: `console.clear();

function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true; // handles NaN and +/-0
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (seen.has(a)) return seen.get(a) === b;
  seen.set(a, b);

  if (a.constructor !== b.constructor) return false;
  if (a instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof RegExp) return a.source === b.source && a.flags === b.flags;

  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [k, v] of a) {
      if (!b.has(k) || !deepEqual(v, b.get(k), seen)) return false;
    }
    return true;
  }

  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    for (const v of a) if (!b.has(v)) return false;
    return true;
  }

  const keysA = Reflect.ownKeys(a);
  const keysB = Reflect.ownKeys(b);
  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) {
    if (!keysB.includes(k)) return false;
    if (!deepEqual(a[k], b[k], seen)) return false;
  }
  return true;
}

console.log("NaN equal?", deepEqual({ x: NaN }, { x: NaN }));
console.log("Dates equal?", deepEqual({ d: new Date(0) }, { d: new Date(0) }));`,
                    fixFocus: { fromLine: 3, toLine: 35 },
                    whatToNotice: [
                        "Object.is is the right primitive equality for deepEqual.",
                        "You either support special objects or define strict limits."
                    ]
                }
            ],
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔧 DEEP CLONE, DEEP EQUAL & FLATTEN                                 ║
║  Production-grade utility functions                                  ║
╠══════════════════════════════════════════════════════════════════════╣
║  Handle: circular refs, Date, RegExp, Map, Set, Symbols              ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ DEEP CLONE - Handle all edge cases
// ═══════════════════════════════════════════════════════════════════
function deepClone(obj, hash = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle circular references
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  
  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  
  // Handle Map
  if (obj instanceof Map) {
    const clonedMap = new Map();
    hash.set(obj, clonedMap);
    obj.forEach((value, key) => {
      clonedMap.set(deepClone(key, hash), deepClone(value, hash));
    });
    return clonedMap;
  }
  
  // Handle Set
  if (obj instanceof Set) {
    const clonedSet = new Set();
    hash.set(obj, clonedSet);
    obj.forEach(value => {
      clonedSet.add(deepClone(value, hash));
    });
    return clonedSet;
  }
  
  // Handle Array
  if (Array.isArray(obj)) {
    const clonedArr = [];
    hash.set(obj, clonedArr);
    obj.forEach((item, index) => {
      clonedArr[index] = deepClone(item, hash);
    });
    return clonedArr;
  }
  
  // Handle Object
  const clonedObj = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, clonedObj);
  
  // Clone all properties including symbols
  Reflect.ownKeys(obj).forEach(key => {
    clonedObj[key] = deepClone(obj[key], hash);
  });
  
  return clonedObj;
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ DEEP EQUAL - Compare objects deeply
// ═══════════════════════════════════════════════════════════════════
function deepEqual(a, b, seen = new WeakMap()) {
  // Identical references
  if (a === b) return true;
  
  // Handle NaN (NaN !== NaN, but we want true)
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  
  // If not both objects, they're not equal
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a === null || b === null) return false;
  
  // Handle circular references
  if (seen.has(a)) return seen.get(a) === b;
  seen.set(a, b);
  
  // Different constructors = not equal
  if (a.constructor !== b.constructor) return false;
  
  // Handle Date
  if (a instanceof Date) {
    return a.getTime() === b.getTime();
  }
  
  // Handle RegExp
  if (a instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }
  
  // Handle Map
  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, val] of a) {
      if (!b.has(key) || !deepEqual(val, b.get(key), seen)) return false;
    }
    return true;
  }
  
  // Handle Set
  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    for (const val of a) {
      if (!b.has(val)) return false;
    }
    return true;
  }
  
  // Handle Arrays and Objects
  const keysA = Reflect.ownKeys(a);
  const keysB = Reflect.ownKeys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  return keysA.every(key => 
    keysB.includes(key) && deepEqual(a[key], b[key], seen)
  );
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ FLATTEN OBJECT - Nested to dot notation
// ═══════════════════════════════════════════════════════════════════
function flattenObject(obj, prefix = '', result = {}) {
  for (const key of Object.keys(obj)) {
    const newKey = prefix ? \`\${prefix}.\${key}\` : key;
    
    if (
      typeof obj[key] === 'object' && 
      obj[key] !== null && 
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

// Unflatten back to nested
function unflattenObject(obj) {
  const result = {};
  
  for (const key of Object.keys(obj)) {
    const keys = key.split('.');
    let current = result;
    
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        current[k] = obj[key];
      } else {
        current[k] = current[k] || {};
        current = current[k];
      }
    }
  }
  
  return result;
}

// ═══════════════════════════════════════════════════════════════════
// 4️⃣ FLATTEN ARRAY - Any depth
// ═══════════════════════════════════════════════════════════════════
function flattenArray(arr, depth = Infinity) {
  if (depth < 1) return arr.slice();
  
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flattenArray(val, depth - 1));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

// ═══════════════════════════════════════════════════════════════════
// ✅ CONSOLE TESTS (iframe-friendly: no React/JSX)
// ═══════════════════════════════════════════════════════════════════
console.clear();

// Deep clone test (circular + Date + Map)
const original = {
  name: "John",
  date: new Date("2025-01-01"),
  nested: { deep: { value: 42 } },
  arr: [1, [2, 3]],
  map: new Map([["key", "value"]])
};
original.circular = original;

const cloned = deepClone(original);
console.log("deepClone: date ok?", cloned.date instanceof Date);
console.log("deepClone: map ok?", cloned.map instanceof Map);
console.log("deepClone: circular ok?", cloned.circular === cloned);

// Deep equal tests
const a = { x: 1, y: { z: [1, 2, 3] } };
const b = { x: 1, y: { z: [1, 2, 3] } };
const c = { x: 1, y: { z: [1, 2, 4] } };
console.log("deepEqual(a,b) should be true:", deepEqual(a, b));
console.log("deepEqual(a,c) should be false:", deepEqual(a, c));
console.log("deepEqual(NaN,NaN) should be true:", deepEqual(NaN, NaN));

// Flatten/unflatten tests
const nested = { a: { b: { c: 1 } }, d: 2 };
const flat = flattenObject(nested);
console.log("flattenObject:", flat);
console.log("unflattenObject:", unflattenObject(flat));

// Flatten array tests
const deepArr = [1, [2, [3, [4, [5]]]]];
console.log("flattenArray Infinity:", flattenArray(deepArr));
console.log("flattenArray depth 2:", flattenArray(deepArr, 2));`,
            recap: {
                takeaways: [
                    "JSON cloning is not a deep clone: it breaks Dates, Maps/Sets, undefined, symbols, and cycles.",
                    "WeakMap is the standard tool to preserve cycles safely without memory leaks.",
                    "Object.is is the best primitive comparator inside deepEqual (handles NaN and +/-0).",
                    "Flattening is an encoding choice: define how you handle dots/arrays/collisions."
                ],
                commonMistakes: [
                    "Using JSON for cloning production data structures.",
                    "Forgetting symbol keys (use Reflect.ownKeys).",
                    "Not defining a cloning policy for functions/class instances/DOM nodes."
                ],
                nextActions: [
                    "Add an option to deepClone to 'keep prototypes' vs 'plain object only'.",
                    "Add a flatten escape scheme for keys that contain dots."
                ]
            },
            comparison: {
                junior: `// ❌ Using JSON for deep clone
const clone = JSON.parse(JSON.stringify(obj));
// Fails for: Date, RegExp, Map, Set, 
// undefined, functions, circular refs, symbols`,
                senior: `// ✅ Proper deep clone with WeakMap
function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return seen.get(obj); // Circular!
  
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Map) {
    const clone = new Map();
    seen.set(obj, clone);
    obj.forEach((v, k) => clone.set(k, deepClone(v, seen)));
    return clone;
  }
  // ... handle all types
}`
            },
            interview: {
                questions: [
                    { q: "Why use WeakMap for circular reference tracking?", a: "WeakMap allows garbage collection of objects when no longer referenced elsewhere. Regular Map would prevent GC and cause memory leaks in long-running operations." },
                    { q: "Why does JSON.stringify fail for circular refs?", a: "JSON.stringify traverses the object tree recursively. With circular refs, it enters infinite recursion and throws 'Converting circular structure to JSON'." },
                    { q: "How do you handle NaN in deepEqual?", a: "NaN !== NaN in JavaScript. Use Number.isNaN() to detect NaN values and return true when comparing two NaNs for deep equality." },
                    { q: "What's Reflect.ownKeys() vs Object.keys()?", a: "Object.keys() returns only enumerable string keys. Reflect.ownKeys() returns ALL own keys including symbols and non-enumerable properties." }
                ]
            }
        },
        {
            day: 26,
            title: '🔥 LRU Cache Implementation',
            intro: "A classic data structures interview question. Used in browser caching, memoization, and database query caching.",
            content: `
<div class="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 p-4 rounded-xl mb-6">
<h4 class="text-indigo-400 font-bold mb-2">🎯 LeetCode #146 - Medium</h4>
<p class="text-light-300">LRU Cache is asked at Google, Amazon, Facebook, and Microsoft. Master it!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📐 LRU Cache Concept</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│                    LRU CACHE (capacity: 3)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Most Recent ◄────────────────────────────► Least Recent       │
│                                                                 │
│   ┌───────┐     ┌───────┐     ┌───────┐                         │
│   │ Key:C │ ←→  │ Key:A │ ←→  │ Key:B │                         │
│   │ Val:3 │     │ Val:1 │     │ Val:2 │                         │
│   └───────┘     └───────┘     └───────┘                         │
│       ▲                           ▲                             │
│       │                           │                             │
│   HEAD (MRU)                  TAIL (LRU)                        │
│                                                                 │
│   On get(A): Move A to HEAD                                     │
│   On put(D): Remove TAIL (B), add D at HEAD                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Requirements</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">get(key)</code> - O(1) lookup, moves to front</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">put(key, value)</code> - O(1) insert/update</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">capacity</code> - Max items, evict LRU when full</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚡ Data Structure Choice</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-green-400 mb-2">Hash Map</h4>
    <p class="text-sm text-light-300">O(1) key lookup to find node</p>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-green-400 mb-2">Doubly Linked List</h4>
    <p class="text-sm text-light-300">O(1) move to front, O(1) remove from end</p>
</div>
</div>
            `,
            masteryChecklist: [
                { id: "d26-c1", text: "I can explain why Map alone is not a full LRU (you need recency ordering operations)." },
                { id: "d26-c2", text: "I can implement get/put in O(1) using Map + doubly linked list." },
                { id: "d26-c3", text: "I can explain dummy head/tail nodes and how they simplify edge cases." },
                { id: "d26-c4", text: "I can walk through an example sequence and show which key gets evicted." },
                { id: "d26-c5", text: "I can reason about memory usage and what happens with large values." }
            ],
            predictions: [
                {
                    prompt: "Which combination gives O(1) get and O(1) eviction reorder for an LRU cache?",
                    options: [
                        "Array + for-loop search",
                        "Object only",
                        "Map/HashMap + Doubly Linked List",
                        "Set only"
                    ],
                    correctIndex: 2,
                    explanation: "Map gives O(1) lookup to find node; doubly linked list gives O(1) move-to-front and remove-from-tail."
                },
                {
                    prompt: "In an LRU cache, calling get(key) should…",
                    options: [
                        "Not change recency",
                        "Delete the key",
                        "Mark the key as most recently used",
                        "Evict the key immediately"
                    ],
                    correctIndex: 2,
                    explanation: "Reads update recency: recently accessed entries should stay longer."
                },
                {
                    prompt: "Why use dummy head/tail nodes?",
                    options: [
                        "They make it faster than O(1)",
                        "They remove special-case logic for empty/single-node lists",
                        "They store all data",
                        "They prevent memory leaks automatically"
                    ],
                    correctIndex: 1,
                    explanation: "Sentinels simplify pointer updates: head.next and tail.prev always exist."
                }
            ],
            checkpoints: [
                {
                    prompt: "When capacity is exceeded, which item is evicted?",
                    options: ["Most recently used", "Least recently used", "Random", "Smallest value"],
                    correctIndex: 1,
                    explanation: "LRU evicts the least recently used item (tail of the recency list)."
                },
                {
                    prompt: "Time complexity of get and put in a correct LRU implementation is…",
                    options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
                    correctIndex: 2,
                    explanation: "Map lookup is O(1) average; list updates are constant pointer changes."
                },
                {
                    prompt: "Why is a singly linked list insufficient for O(1) removal of an arbitrary node?",
                    options: [
                        "Because JS forbids it",
                        "You cannot find the previous node without traversal",
                        "It uses too much memory",
                        "It doesn’t support keys"
                    ],
                    correctIndex: 1,
                    explanation: "To remove a node in O(1), you need its prev pointer; otherwise you must scan to find prev."
                }
            ],
            labSteps: [
                {
                    id: "d26-step-1",
                    title: "Bug: get() doesn't update recency",
                    subtitle: "Fix by moving the node to the front on every get",
                    teacherNote: "If get() doesn't update order, your cache isn't LRU—it's just a bounded map.",
                    bugCode: `console.clear();

class LRUCache {
  constructor(capacity) { this.capacity = capacity; this.map = new Map(); }
  get(k) { return this.map.has(k) ? this.map.get(k) : -1; } // BUG: no recency update
  put(k, v) {
    if (this.map.has(k)) this.map.delete(k);
    this.map.set(k, v);
    if (this.map.size > this.capacity) {
      const firstKey = this.map.keys().next().value; // oldest insertion
      this.map.delete(firstKey);
    }
  }
}

const c = new LRUCache(2);
c.put("A", 1); c.put("B", 2);
c.get("A");         // should make A most recent
c.put("C", 3);      // should evict B if LRU is correct
console.log("A:", c.get("A"), "B:", c.get("B"), "C:", c.get("C"));`,
                    bugFocus: { fromLine: 4, toLine: 4 },
                    fixCode: `console.clear();

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(k) {
    if (!this.map.has(k)) return -1;
    const v = this.map.get(k);
    // Fix: refresh recency by reinserting
    this.map.delete(k);
    this.map.set(k, v);
    return v;
  }
  put(k, v) {
    if (this.map.has(k)) this.map.delete(k);
    this.map.set(k, v);
    if (this.map.size > this.capacity) {
      const lruKey = this.map.keys().next().value;
      this.map.delete(lruKey);
    }
  }
}

const c = new LRUCache(2);
c.put("A", 1); c.put("B", 2);
c.get("A");
c.put("C", 3);
console.log("A:", c.get("A"), "B:", c.get("B"), "C:", c.get("C"));`,
                    fixFocus: { fromLine: 6, toLine: 12 },
                    whatToNotice: [
                        "This Map-only approach works in JS because Map preserves insertion order.",
                        "Interview implementations often require explicit doubly linked list (language-agnostic)."
                    ]
                },
                {
                    id: "d26-step-2",
                    title: "Doubly linked list: remove LRU in O(1)",
                    subtitle: "Understand the pointer operations",
                    teacherNote: "The key is constant pointer changes—no scanning.",
                    bugCode: `console.clear();

// BUG: forgetting to update both pointers breaks the list
const head = { next: null };
const a = { key: "A" };
const b = { key: "B" };
head.next = a;
a.next = b;

// remove a (incorrect)
head.next = a.next; // missing: a.next.prev update (in a real DLL)
console.log("head.next.key should be B:", head.next.key);`,
                    bugFocus: { fromLine: 10, toLine: 10 },
                    fixCode: `console.clear();

// Minimal doubly-linked remove (concept demo)
const head = { next: null };
const a = { key: "A", prev: head, next: null };
const b = { key: "B", prev: a, next: null };
head.next = a;
a.next = b;

// remove a (correct)
a.prev.next = a.next;
a.next.prev = a.prev;

console.log("head.next.key:", head.next.key, "(should be B)");
console.log("b.prev === head:", b.prev === head);`,
                    fixFocus: { fromLine: 10, toLine: 13 },
                    whatToNotice: [
                        "Removal in a DLL updates prev.next and next.prev.",
                        "Dummy nodes guarantee prev/next exist, simplifying edge cases."
                    ]
                }
            ],
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  📦 LRU CACHE - O(1) GET AND PUT                                     ║
║  LeetCode #146 - Asked at FAANG                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  Uses: HashMap + Doubly Linked List                                  ║
╚══════════════════════════════════════════════════════════════════════╝
*/

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // key -> node
    
    // Dummy head and tail for easier edge case handling
    this.head = { key: null, value: null, prev: null, next: null };
    this.tail = { key: null, value: null, prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  // Add node right after head (most recently used)
  _addToFront(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }
  
  // Remove node from its current position
  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  
  // Move existing node to front
  _moveToFront(node) {
    this._removeNode(node);
    this._addToFront(node);
  }
  
  // Remove and return the least recently used (before tail)
  _removeLRU() {
    const lru = this.tail.prev;
    this._removeNode(lru);
    return lru;
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    
    const node = this.cache.get(key);
    this._moveToFront(node); // Mark as recently used
    return node.value;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      // Update existing
      const node = this.cache.get(key);
      node.value = value;
      this._moveToFront(node);
    } else {
      // Add new
      const newNode = { key, value, prev: null, next: null };
      this.cache.set(key, newNode);
      this._addToFront(newNode);
      
      // Evict if over capacity
      if (this.cache.size > this.capacity) {
        const lru = this._removeLRU();
        this.cache.delete(lru.key);
      }
    }
  }
  
  // Helper: Get current cache state for visualization
  getState() {
    const items = [];
    let current = this.head.next;
    while (current !== this.tail) {
      items.push({ key: current.key, value: current.value });
      current = current.next;
    }
    return items;
  }
}

// ═══════════════════════════════════════════════════════════════════
// ✅ CONSOLE TESTS (iframe-friendly: no React/JSX)
// ═══════════════════════════════════════════════════════════════════
console.clear();

const cache = new LRUCache(3);
cache.put("A", 1);
cache.put("B", 2);
cache.put("C", 3);
console.log("state after A,B,C (MRU first):", cache.getState());

console.log("get(A):", cache.get("A"));
console.log("state after get(A):", cache.getState());

cache.put("D", 4); // should evict B
console.log("state after put(D):", cache.getState());
console.log("get(B) should be -1:", cache.get("B"));
console.log("get(C) should be 3:", cache.get("C"));`,
            recap: {
                takeaways: [
                    "LRU = 'evict the least recently used' which requires tracking recency on reads and writes.",
                    "Map gives O(1) lookup; a doubly linked list gives O(1) move-to-front and remove-from-tail.",
                    "Dummy head/tail nodes simplify edge cases and keep pointer ops constant."
                ],
                commonMistakes: [
                    "Not updating recency on get().",
                    "Using an array/list causing O(n) updates.",
                    "Forgetting to delete the evicted key from the map."
                ],
                nextActions: [
                    "Add a peek(key) that does not update recency (useful in some caches).",
                    "Add a size() and keys() for debugging/telemetry."
                ]
            },
            comparison: {
                junior: `// ❌ O(n) implementation
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = [];
  }
  
  get(key) {
    const idx = this.cache.findIndex(x => x.key === key); // O(n)
    if (idx === -1) return -1;
    const item = this.cache.splice(idx, 1)[0]; // O(n)
    this.cache.unshift(item); // O(n)
    return item.value;
  }
}`,
                senior: `// ✅ O(1) with HashMap + Doubly Linked List
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // O(1) lookup
    // Doubly linked list for O(1) reorder
    this.head = {};
    this.tail = {};
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    const node = this.cache.get(key);
    this._moveToFront(node); // O(1)
    return node.value;
  }
}`
            },
            interview: {
                questions: [
                    { q: "Why use dummy head and tail nodes?", a: "Simplifies edge cases. Without them, you'd need special handling for empty list, single item, adding to empty, etc. Dummy nodes mean head.next is always the real first item." },
                    { q: "Time complexity of all operations?", a: "Both get() and put() are O(1). HashMap gives O(1) lookup. Doubly linked list gives O(1) insert/remove since we have direct node reference." },
                    { q: "Why not use a singly linked list?", a: "To remove a node in O(1), we need access to its previous node. With singly linked, we'd need O(n) traversal. Doubly linked stores prev pointer for O(1) removal." },
                    { q: "Real-world uses of LRU Cache?", a: "Browser cache, Redis, database query caching, React.memo-like memoization, CDN edge caching, DNS lookup caching." }
                ]
            }
        },
        {
            day: 27,
            title: '🔥 Retry with Exponential Backoff',
            intro: "Production-grade API retry logic. Handle network failures gracefully with smart retry strategies.",
            content: `
<div class="bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30 p-4 rounded-xl mb-6">
<h4 class="text-rose-400 font-bold mb-2">🎯 Real-World Essential</h4>
<p class="text-light-300">Every production app needs retry logic. AWS SDKs, Stripe, and all major APIs use exponential backoff. Master it!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📐 Exponential Backoff Concept</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│                EXPONENTIAL BACKOFF TIMELINE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Attempt 1: ──X (fail)                                          │
│             └── Wait 1s ──┐                                     │
│                           │                                     │
│  Attempt 2: ──────────────X (fail)                              │
│                           └── Wait 2s ──┐                       │
│                                         │                       │
│  Attempt 3: ────────────────────────────X (fail)                │
│                                         └── Wait 4s ──┐         │
│                                                       │         │
│  Attempt 4: ──────────────────────────────────────────✓ SUCCESS │
│                                                                 │
│  Formula: delay = baseDelay * (2 ^ attemptNumber) + jitter      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔑 Key Features</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">maxRetries</code> - Maximum retry attempts</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">baseDelay</code> - Initial delay in ms</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">maxDelay</code> - Cap the maximum delay</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">jitter</code> - Random variance to prevent thundering herd</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">retryOn</code> - Condition function for retry</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚡ Why Jitter?</h3>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600 mb-6">
<p class="text-light-300 text-sm">Without jitter, if 1000 clients fail at the same time, they ALL retry at exactly 1s, 2s, 4s... This "thundering herd" can crash your server. Jitter adds randomness so retries spread out.</p>
</div>
            `,
            masteryChecklist: [
                { id: "d27-c1", text: "I can explain exponential backoff and why fixed retry intervals can overload a recovering service." },
                { id: "d27-c2", text: "I can explain jitter and the thundering herd problem." },
                { id: "d27-c3", text: "I can implement retry with maxRetries and a retryOn predicate (don’t retry 4xx)." },
                { id: "d27-c4", text: "I can handle abort/cancel so retries stop immediately when the user navigates away." },
                { id: "d27-c5", text: "I can reason about idempotency and when retries are dangerous (e.g., POST without idempotency key)." }
            ],
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔄 RETRY WITH EXPONENTIAL BACKOFF                                   ║
║  Production-grade retry logic for API calls                          ║
╠══════════════════════════════════════════════════════════════════════╣
║  Features: Exponential delay, jitter, max delay, abort signal        ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ FULL-FEATURED RETRY FUNCTION
// ═══════════════════════════════════════════════════════════════════
async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    jitter = true,
    retryOn = () => true, // Retry on any error by default
    onRetry = () => {},   // Callback before each retry
    signal = null         // AbortSignal support
  } = options;
  
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Check if aborted
      if (signal?.aborted) {
        throw new Error('Retry aborted');
      }
      
      return await fn(attempt);
      
    } catch (error) {
      lastError = error;
      
      // Check if we should retry
      if (attempt >= maxRetries || !retryOn(error, attempt)) {
        throw error;
      }
      
      // Calculate delay with exponential backoff
      let delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      
      // Add jitter (±25% randomness)
      if (jitter) {
        const jitterAmount = delay * 0.25;
        delay += Math.random() * jitterAmount * 2 - jitterAmount;
      }
      
      // Notify before retry
      onRetry({ attempt, delay, error });
      
      // Wait before retry
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, delay);
        
        // Handle abort during wait
        if (signal) {
          signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Retry aborted'));
          }, { once: true });
        }
      });
    }
  }
  
  throw lastError;
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ SIMPLE VERSION (for interviews)
// ═══════════════════════════════════════════════════════════════════
async function simpleRetry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries) throw error;
      await new Promise(r => setTimeout(r, delay * Math.pow(2, i)));
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ FETCH WITH RETRY WRAPPER
// ═══════════════════════════════════════════════════════════════════
async function fetchWithRetry(url, options = {}, retryOptions = {}) {
  return retryWithBackoff(
    async () => {
      const response = await fetch(url, options);
      
      // Retry on server errors (5xx) but not client errors (4xx)
      if (response.status >= 500) {
        throw new Error(\`Server error: \${response.status}\`);
      }
      
      if (!response.ok) {
        throw new Error(\`HTTP error: \${response.status}\`);
      }
      
      return response;
    },
    {
      ...retryOptions,
      retryOn: (error) => {
        // Retry on network errors and 5xx
        return error.message.includes('Server error') || 
               error.message.includes('fetch');
      }
    }
  );
}

// ═══════════════════════════════════════════════════════════════════
// ✅ CONSOLE DEMO (iframe-friendly: no React/JSX)
// ═══════════════════════════════════════════════════════════════════
console.clear();

let attempt = 0;
async function flaky() {
  attempt++;
  // Fail first 2 attempts, succeed on 3rd
  if (attempt <= 2) throw new Error("Server error: 503");
  return { ok: true, attempt };
}

retryWithBackoff(flaky, {
  maxRetries: 4,
  baseDelay: 200,
  maxDelay: 2000,
  jitter: true,
  retryOn: (err) => String(err && err.message || "").includes("503"),
  onRetry: ({ attempt, delay, error }) => {
    console.log("retry", attempt, "delay(ms)", Math.round(delay), "error:", error.message);
  }
}).then(
  (res) => console.log("success:", res),
  (err) => console.log("failed:", err.message)
);`,
            recap: {
                takeaways: [
                    "Exponential backoff reduces load while a service is recovering.",
                    "Jitter prevents synchronized retries (thundering herd).",
                    "Never retry everything: check status codes, idempotency, and abort signals.",
                    "Design retry as a reusable utility: retryOn + onRetry hooks."
                ],
                commonMistakes: [
                    "Retrying 4xx client errors (won't help).",
                    "Retrying non-idempotent writes without idempotency keys.",
                    "No jitter, causing burst retries that keep the system down."
                ],
                nextActions: [
                    "Add an AbortController and cancel during the delay loop.",
                    "Add per-error-type policies (network errors vs rate limits vs 5xx)."
                ]
            },
            comparison: {
                junior: `// ❌ No retry logic
async function fetchData() {
  const res = await fetch('/api/data');
  return res.json();
}
// Network blip = user sees error`,
                senior: `// ✅ Production retry with backoff
async function fetchData() {
  return retryWithBackoff(
    () => fetch('/api/data').then(r => r.json()),
    {
      maxRetries: 3,
      baseDelay: 1000,
      retryOn: (err) => err.name !== 'AbortError',
      onRetry: ({ attempt, delay }) => {
        console.log(\`Retry \${attempt} in \${delay}ms\`);
      }
    }
  );
}`
            },
            interview: {
                questions: [
                    { q: "Why exponential backoff instead of fixed delay?", a: "Gives the server time to recover. If server is overloaded, hammering it every 1s makes it worse. Exponential delay (1s, 2s, 4s, 8s) reduces load progressively." },
                    { q: "What is jitter and why use it?", a: "Random variance in delay timing. Prevents 'thundering herd' where many clients retry at exact same moment after a failure, potentially crashing the recovering server." },
                    { q: "When should you NOT retry?", a: "Client errors (4xx) - request is invalid, retrying won't help. Idempotency issues - don't retry POST that might duplicate data. Auth errors - token is invalid." },
                    { q: "How to handle abort during retry?", a: "Use AbortController. Pass signal to options, check signal.aborted before each attempt, and listen for abort event during delay to cancel the timeout." }
                ]
            }
        },
        {
            day: 28,
            title: '🔥 Top 20 JS Output Questions',
            intro: "The most common tricky output questions asked in interviews. Master these and you'll never be surprised.",
            content: `
<div class="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
<h4 class="text-yellow-400 font-bold mb-2">🎯 Most Asked in Interviews</h4>
<p class="text-light-300">These exact questions appear in 90% of JavaScript interviews. Know them cold!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📋 Categories Covered</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Hoisting</code> - var, let, const, functions</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Closures</code> - Loop closures, setTimeout</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">this keyword</code> - Arrow vs regular functions</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Event Loop</code> - Promise, setTimeout order</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Coercion</code> - Type conversion gotchas</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Scope</code> - Block vs function scope</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚡ Pro Tips</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-green-400 mb-2">During Interview</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Think out loud</li>
        <li>Explain WHY, not just WHAT</li>
        <li>Mention edge cases</li>
    </ul>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-yellow-400 mb-2">Common Traps</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>setTimeout(..., 0) isn't immediate</li>
        <li>Promise.then is microtask</li>
        <li>Arrow functions don't have 'this'</li>
    </ul>
</div>
</div>
            `,
            masteryChecklist: [
                { id: "d28-c1", text: "I can predict output and explain using a rule (hoisting, TDZ, closure, this binding, event loop, coercion)." },
                { id: "d28-c2", text: "I can explain microtask vs macrotask ordering and why it matters in real apps." },
                { id: "d28-c3", text: "I can fix the classic var-in-loop setTimeout closure bug from memory." },
                { id: "d28-c4", text: "I can explain why arrow functions do not have their own this." },
                { id: "d28-c5", text: "I can explain one tricky coercion case using ToPrimitive/toString/valueOf." }
            ],
            predictions: [
                {
                    prompt: "Output order: console.log('A'); Promise.resolve().then(()=>console.log('B')); setTimeout(()=>console.log('C'),0); console.log('D');",
                    options: ["A, D, B, C", "A, B, D, C", "A, D, C, B", "B, A, D, C"],
                    correctIndex: 0,
                    explanation: "Synchronous logs first (A, D), then microtasks (B), then macrotasks (C)."
                },
                {
                    prompt: "What does [1,,3].map(x => x) produce at index 1?",
                    options: ["undefined value at index 1", "A hole remains (index 1 does not exist)", "Throws TypeError", "It depends on engine"],
                    correctIndex: 1,
                    explanation: "map skips holes; it preserves array length but does not create a value for missing indices."
                },
                {
                    prompt: "What is true about this in arrow functions?",
                    options: [
                        "Arrow functions bind this to the object they're stored on",
                        "Arrow functions capture this from the surrounding scope (lexical this)",
                        "Arrow functions always have this = globalThis",
                        "Arrow functions change this depending on call-site like normal functions"
                    ],
                    correctIndex: 1,
                    explanation: "Arrow functions do not have their own this. They use lexical this from where they were defined."
                }
            ],
            checkpoints: [
                {
                    prompt: "Why does console.log(x); let x = 1; throw ReferenceError instead of printing undefined?",
                    options: [
                        "let is not hoisted",
                        "let is hoisted but uninitialized until declaration (TDZ)",
                        "Because console.log cannot print variables",
                        "Because let variables live on the heap"
                    ],
                    correctIndex: 1,
                    explanation: "let/const are hoisted but uninitialized in the TDZ until the declaration is executed."
                },
                {
                    prompt: "Why does [] + {} result in a string like [object Object]?",
                    options: [
                        "Because arrays are always numbers",
                        "Because + always does numeric addition",
                        "Because ToPrimitive converts [] to '' and {} to '[object Object]' then concatenates",
                        "Because {} becomes null"
                    ],
                    correctIndex: 2,
                    explanation: "When + sees a string operand, it concatenates. Objects are converted via ToPrimitive (valueOf/toString)."
                },
                {
                    prompt: "The safest way to reason about interview output questions is…",
                    options: [
                        "Guess and move on",
                        "Memorize outputs",
                        "Apply the rule: sync → microtasks → macrotasks, plus scope/this/coercion rules",
                        "Assume browsers are random"
                    ],
                    correctIndex: 2,
                    explanation: "The point is the rule and mental model, not memorizing 100 outputs."
                }
            ],
            labSteps: [
                {
                    id: "d28-step-1",
                    title: "Closure trap: var in loop with setTimeout",
                    subtitle: "Fix by using let or an IIFE",
                    teacherNote: "Predict first, then fix it. You are training the exact interview muscle.",
                    bugCode: `console.clear();

for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("i:", i);
  }, 0);
}`,
                    bugFocus: { fromLine: 2, toLine: 6 },
                    fixCode: `console.clear();

for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("i:", i);
  }, 0);
}

// Alternative: IIFE (works even with var)
for (var j = 0; j < 3; j++) {
  (function (jCopy) {
    setTimeout(function () { console.log("j:", jCopy); }, 0);
  })(j);
}`,
                    fixFocus: { fromLine: 2, toLine: 15 },
                    whatToNotice: [
                        "var creates one shared binding; the callbacks run after the loop ends.",
                        "let creates a new binding per iteration (or capture the value via IIFE)."
                    ]
                },
                {
                    id: "d28-step-2",
                    title: "Event loop ordering: sync vs microtask vs macrotask",
                    subtitle: "Make the order predictable",
                    teacherNote: "Say the order out loud: sync first, then microtasks, then macrotasks.",
                    bugCode: `console.clear();

console.log("A");
setTimeout(function () { console.log("C"); }, 0);
Promise.resolve().then(function () { console.log("B"); });
console.log("D");`,
                    bugFocus: { fromLine: 2, toLine: 5 },
                    fixCode: `console.clear();

console.log("A");
setTimeout(function () { console.log("C (macrotask)"); }, 0);
Promise.resolve().then(function () { console.log("B (microtask)"); });
console.log("D");

// Expected: A, D, B, C`,
                    fixFocus: { fromLine: 2, toLine: 7 },
                    whatToNotice: [
                        "Promises schedule microtasks (run after current stack, before timeouts).",
                        "setTimeout schedules a macrotask (runs after microtasks)."
                    ]
                }
            ],
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  Day 28 Live Lab: Top output questions (console edition)             ║
║  How to use: call show(0, false), predict, then show(0, true)        ║
╚══════════════════════════════════════════════════════════════════════╝
*/

console.clear();

function makeQuestion(title, codeLines, expected, explanation) {
  return { title: title, code: codeLines.join("\\n"), expected: expected, explanation: explanation };
}

var QUESTIONS = [
  makeQuestion("1) Hoisting with var", ["console.log(a);", "var a = 5;", "console.log(a);"], "undefined then 5", "var declarations hoist and initialize to undefined; assignment happens later."),
  makeQuestion("2) Temporal Dead Zone (let)", ["console.log(x);", "let x = 10;"], "ReferenceError", "let is hoisted but uninitialized until the declaration line (TDZ)."),
  makeQuestion("3) Closure trap (var loop)", ["for (var i = 0; i < 3; i++) {", "  setTimeout(function () { console.log(i); }, 0);", "}"], "3, 3, 3", "All callbacks share one var binding; the loop finishes with i = 3."),
  makeQuestion("4) let fixes closure", ["for (let i = 0; i < 3; i++) {", "  setTimeout(function () { console.log(i); }, 0);", "}"], "0, 1, 2", "let creates a new binding per iteration."),
  makeQuestion("5) Event loop order", ["console.log('1');", "setTimeout(function () { console.log('2'); }, 0);", "Promise.resolve().then(function () { console.log('3'); });", "console.log('4');"], "1, 4, 3, 2", "Sync first, then microtasks (Promise), then macrotasks (setTimeout)."),
  makeQuestion("6) this in method call", ["var obj = { name: 'John', greet: function () { return this.name; } };", "console.log(obj.greet());"], "John", "Call-site obj.greet() sets this to obj."),
  makeQuestion("7) this gets lost", ["var obj = { name: 'John', greet: function () { return this.name; } };", "var fn = obj.greet;", "console.log(fn());"], "undefined (or global name in sloppy mode)", "Extracted function call loses implicit binding. In strict mode this is undefined."),
  makeQuestion("8) Arrow function this", ["var obj = { name: 'John', greet: () => this && this.name };", "console.log(obj.greet());"], "undefined", "Arrow functions capture lexical this from definition scope, not call-site."),
  makeQuestion("9) Coercion basics", ["console.log(1 + '2');", "console.log('3' - 1);", "console.log(true + true);"], "12 then 2 then 2", "+ concatenates if a string is involved; - forces numeric; true becomes 1."),
  makeQuestion("10) Equality gotchas", ["console.log([] == false);", "console.log([] === false);", "console.log(null == undefined);"], "true then false then true", "== coerces; === does not; null == undefined is a special rule."),
  makeQuestion("11) Object reference", ["var a = { x: 1 };", "var b = a;", "b.x = 2;", "console.log(a.x);"], "2", "Objects are references; a and b point to the same object."),
  makeQuestion("12) const is not immutable", ["const arr = [1, 2];", "arr.push(3);", "console.log(arr);"], "[1,2,3]", "const prevents reassignment of the binding, not mutation of the value."),
  makeQuestion("13) NaN weirdness", ["console.log(NaN === NaN);", "console.log(typeof NaN);", "console.log(Number.isNaN(NaN));"], "false then 'number' then true", "NaN is not equal to itself. Use Number.isNaN."),
  makeQuestion("14) map vs forEach", ["var a = [1, 2].map(function (x) { return x * 2; });", "var b = [1, 2].forEach(function (x) { return x * 2; });", "console.log(a, b);"], "[2,4] then undefined", "map returns a new array; forEach returns undefined."),
  makeQuestion("15) Shallow copy", ["var a = { x: { y: 1 } };", "var b = Object.assign({}, a);", "b.x.y = 2;", "console.log(a.x.y);"], "2", "Object.assign is shallow; nested objects are shared."),
  makeQuestion("16) Function declaration hoists", ["console.log(foo());", "function foo() { return 'hi'; }"], "hi", "Function declarations hoist with their body."),
  makeQuestion("17) Function expression with var", ["console.log(foo);", "var foo = function () { return 'hi'; };"], "undefined", "var foo hoists as undefined; assignment happens later."),
  makeQuestion("18) Promise chain values", ["Promise.resolve(1)", "  .then(function (x) { return x + 1; })", "  .then(function (x) { x + 1; })", "  .then(function (x) { console.log(x); });"], "undefined", "If you do not return a value in then, the next then receives undefined."),
  makeQuestion("19) delete property", ["var obj = { a: 1 };", "delete obj.a;", "console.log(obj.a);"], "undefined", "Missing properties read as undefined."),
  makeQuestion("20) arguments in arrow", ["var fn = () => arguments;", "fn(1, 2, 3);"], "ReferenceError", "Arrow functions do not have arguments. Use rest params instead.")
];

function show(index, reveal) {
  var q = QUESTIONS[index];
  if (!q) return console.log("No question at index:", index);
  console.log("=== " + q.title + " ===");
  console.log(q.code);
  if (reveal) {
    console.log("-> Expected:", q.expected);
    console.log("-> Why:", q.explanation);
  } else {
    console.log("Predict the output, then call show(" + index + ", true).");
  }
}

function showAll(reveal) {
  for (var i = 0; i < QUESTIONS.length; i++) show(i, reveal);
}

// Start here:
show(0, false);`,
            recap: {
                takeaways: [
                    "Train prediction first, not memorization: rules beat recall.",
                    "Output questions reduce to a few systems: scope/TDZ, closure, this binding, coercion, event loop.",
                    "Microtasks (Promise) run before macrotasks (setTimeout)."
                ],
                commonMistakes: [
                    "Confusing hoisting (declaration) with initialization (assignment).",
                    "Assuming setTimeout 0 runs immediately.",
                    "Thinking arrow functions behave like methods for this (they do not)."
                ],
                nextActions: [
                    "Run show(0,false), predict, then show(0,true). Repeat for 1–20.",
                    "Pick 3 questions you missed and write the rule in one sentence each.",
                    "Explain one coercion case using ToPrimitive ([], {}, + operator)."
                ]
            },
            comparison: {
                junior: `// ❌ Guesses output randomly
console.log([] + {}); // ???
// "I think it's... an error?"`,
                senior: `// ✅ Understands the mechanics
console.log([] + {}); 
// [] → "" (empty string)
// {} → "[object Object]"
// "" + "[object Object]" = "[object Object]"

// Explains: ToPrimitive, valueOf, toString
// coercion rules for each type`
            },
            interview: {
                questions: [
                    { q: "What is the Temporal Dead Zone?", a: "The period between entering a scope and the let/const declaration being reached. Accessing the variable in this zone throws ReferenceError." },
                    { q: "Why does setTimeout with 0ms not run immediately?", a: "setTimeout schedules a macrotask. Even with 0ms, it waits for current call stack to clear AND all microtasks (Promises) to complete first." },
                    { q: "How does == type coercion work?", a: "Complex rules: null == undefined is true. For other types, converts to number. [] → 0, {} → NaN, '5' → 5, true → 1." },
                    { q: "Why is NaN !== NaN?", a: "By IEEE 754 spec, NaN represents 'not a valid number' - could be different invalid operations. Use Number.isNaN() or Object.is() to check." }
                ]
            }
        },
        {
            day: 29,
            title: '🔥 Currying & Composition',
            intro: "Functional programming fundamentals. Build curry, compose, pipe, and partial application from scratch.",
            content: `
<div class="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 p-4 rounded-xl mb-6">
<h4 class="text-teal-400 font-bold mb-2">🎯 Functional Programming Interview Questions</h4>
<p class="text-light-300">These concepts power Redux, React hooks, lodash/fp, and Ramda. Essential for senior roles!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📋 Concepts to Master</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">curry</code> - Transform f(a,b,c) to f(a)(b)(c)</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">compose</code> - Right-to-left function composition</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">pipe</code> - Left-to-right function composition</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">partial</code> - Fix some arguments upfront</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">memoize</code> - Cache function results</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚡ Why Currying?</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│                         CURRYING                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Regular:     add(1, 2, 3)      → 6                            │
│   Curried:     add(1)(2)(3)     → 6                            │
│                add(1, 2)(3)     → 6  (flexible!)               │
│                add(1)(2, 3)     → 6                            │
│                                                                 │
│   Why?                                                          │
│   • Create specialized functions: const add10 = add(10)         │
│   • Point-free style: users.map(add(1))                        │
│   • Composition: compose(add(1), multiply(2))                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>
            `,
            masteryChecklist: [
                { id: "d29-c1", text: "I can implement curry that supports partial application with any grouping (f(1)(2,3), f(1,2)(3), etc.)." },
                { id: "d29-c2", text: "I can explain compose vs pipe and when each is clearer." },
                { id: "d29-c3", text: "I can use currying to create specialized functions (prefix('User: '), add(10), etc.)." },
                { id: "d29-c4", text: "I can explain partial application vs currying in one sentence." },
                { id: "d29-c5", text: "I can build memoize with an explicit keyResolver and describe tradeoffs." }
            ],
            predictions: [
                {
                    prompt: "If `const add3 = curry(add)(1);` where add(a,b,c)=a+b+c, what is add3(2)(3)?",
                    options: ["6", "5", "TypeError", "undefined"],
                    correctIndex: 0,
                    explanation: "Currying collects arguments until arity is satisfied."
                },
                {
                    prompt: "If `pipe(square, inc, double)(3)` with square(x)=x*x, inc(x)=x+1, double(x)=x*2, what is the result?",
                    options: ["20", "18", "16", "14"],
                    correctIndex: 0,
                    explanation: "square(3)=9, inc=10, double=20."
                },
                {
                    prompt: "What is the key difference between curry and partial?",
                    options: [
                        "They are identical",
                        "Curry changes function arity/shape; partial pre-fills some args without changing the overall calling shape requirement",
                        "Partial works only for 2 args",
                        "Curry works only for arrow functions"
                    ],
                    correctIndex: 1,
                    explanation: "Currying transforms how you call it; partial only pre-fills."
                }
            ],
            checkpoints: [
                {
                    prompt: "compose(f, g)(x) equals…",
                    options: ["f(g(x))", "g(f(x))", "f(x) + g(x)", "It depends on runtime"],
                    correctIndex: 0,
                    explanation: "Compose is right-to-left: first g, then f."
                },
                {
                    prompt: "Why is pipe often preferred in UI code?",
                    options: ["It is faster", "It reads left-to-right like data flows", "It supports async automatically", "It avoids closures"],
                    correctIndex: 1,
                    explanation: "pipe matches how you narrate transformations."
                },
                {
                    prompt: "A common pitfall of memoize using JSON.stringify(args) is…",
                    options: [
                        "It breaks for numbers",
                        "It can be slow and unstable for objects (order/cycles) and cannot key by functions",
                        "It always leaks memory",
                        "It cannot cache more than 10 items"
                    ],
                    correctIndex: 1,
                    explanation: "Use a keyResolver or structured keying when args are non-primitive."
                }
            ],
            labSteps: [
                {
                    id: "d29-step-1",
                    title: "Curry bug: loses this and can't group args flexibly",
                    subtitle: "Fix curry to preserve this and accept any grouping",
                    teacherNote: "A good curry collects args until enough, then calls the original function with the same this.",
                    bugCode: `console.clear();

function curryBug(fn) {
  return function curried(a) {
    if (arguments.length >= fn.length) return fn(a);
    return function (b) {
      return fn(a, b); // ❌ only supports 2 args and drops extra args and this
    };
  };
}

function add(a, b, c) { return a + b + c; }
var curriedAdd = curryBug(add);
console.log("Expect 6:", curriedAdd(1)(2)(3));`,
                    bugFocus: { fromLine: 2, toLine: 14 },
                    fixCode: `console.clear();

function curry(fn) {
  return function curried() {
    var args = Array.prototype.slice.call(arguments);
    if (args.length >= fn.length) return fn.apply(this, args);
    return function () {
      var more = Array.prototype.slice.call(arguments);
      return curried.apply(this, args.concat(more));
    };
  };
}

function add(a, b, c) { return a + b + c; }
var curriedAdd = curry(add);
console.log("1)(2)(3) =", curriedAdd(1)(2)(3));
console.log("1,2)(3) =", curriedAdd(1, 2)(3));
console.log("1)(2,3) =", curriedAdd(1)(2, 3));`,
                    fixFocus: { fromLine: 2, toLine: 16 },
                    whatToNotice: [
                        "Use apply to preserve this.",
                        "Collect args in an array; allow more than one arg per call."
                    ]
                },
                {
                    id: "d29-step-2",
                    title: "Memoize pitfall: unstable keys for objects",
                    subtitle: "Add keyResolver so callers decide the cache key",
                    teacherNote: "Memoization is an optimization—make it explicit and predictable.",
                    bugCode: `console.clear();

function memoizeBug(fn) {
  var cache = new Map();
  return function () {
    var key = JSON.stringify(arguments); // ❌ arguments is not a real array; also keying objects is fragile
    if (cache.has(key)) return cache.get(key);
    var out = fn.apply(this, arguments);
    cache.set(key, out);
    return out;
  };
}

function computeUserScore(user) { return user.points * 2; }
var memoScore = memoizeBug(computeUserScore);
console.log(memoScore({ points: 10 }));
console.log(memoScore({ points: 10 }));`,
                    bugFocus: { fromLine: 2, toLine: 17 },
                    fixCode: `console.clear();

function memoize(fn, keyResolver) {
  var cache = new Map();
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var key = keyResolver ? keyResolver.apply(this, args) : JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    var out = fn.apply(this, args);
    cache.set(key, out);
    return out;
  };
}

function computeUserScore(user) { return user.points * 2; }
var memoScore = memoize(computeUserScore, function (user) { return "points:" + user.points; });
console.log(memoScore({ points: 10 }));
console.log(memoScore({ points: 10 })); // cached by points`,
                    fixFocus: { fromLine: 2, toLine: 16 },
                    whatToNotice: [
                        "A keyResolver makes caching predictable for non-primitive args.",
                        "Default JSON.stringify(args) is okay for simple primitive-only args."
                    ]
                }
            ],
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🧮 FUNCTIONAL PROGRAMMING UTILITIES                                 ║
║  curry, compose, pipe, partial, memoize                              ║
╠══════════════════════════════════════════════════════════════════════╣
║  Essential for FP interviews and real-world code!                    ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ CURRY - Transform multi-arg to single-arg chain
// ═══════════════════════════════════════════════════════════════════
function curry(fn) {
  return function curried(...args) {
    // If enough args, call the function
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // Otherwise, return function that collects more args
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ COMPOSE - Right-to-left function composition
// ═══════════════════════════════════════════════════════════════════
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ PIPE - Left-to-right function composition (more readable)
// ═══════════════════════════════════════════════════════════════════
function pipe(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

// ═══════════════════════════════════════════════════════════════════
// 4️⃣ PARTIAL - Fix some arguments
// ═══════════════════════════════════════════════════════════════════
function partial(fn, ...fixedArgs) {
  return function(...remainingArgs) {
    return fn.apply(this, [...fixedArgs, ...remainingArgs]);
  };
}

// ═══════════════════════════════════════════════════════════════════
// 5️⃣ MEMOIZE - Cache results
// ═══════════════════════════════════════════════════════════════════
function memoize(fn, keyResolver) {
  const cache = new Map();
  
  return function(...args) {
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// ═══════════════════════════════════════════════════════════════════
// 🧪 CONSOLE DEMO (no React)
// ═══════════════════════════════════════════════════════════════════
function runFPDemo() {
  console.clear();
  console.log("=== Day 29: Currying & Composition (demo) ===");

  // Curry
  console.log("--- CURRY ---");
  var add = function (a, b, c) { return a + b + c; };
  var curriedAdd = curry(add);
  console.log("add(1,2,3) =", add(1, 2, 3));
  console.log("curriedAdd(1)(2)(3) =", curriedAdd(1)(2)(3));
  console.log("curriedAdd(1,2)(3) =", curriedAdd(1, 2)(3));
  console.log("curriedAdd(1)(2,3) =", curriedAdd(1)(2, 3));

  // Compose vs Pipe
  console.log("--- COMPOSE / PIPE ---");
  var square = function (x) { return x * x; };
  var inc = function (x) { return x + 1; };
  var double = function (x) { return x * 2; };
  var c = compose(double, inc, square); // double(inc(square(x)))
  var p = pipe(square, inc, double);   // double(inc(square(x)))
  console.log("compose(double, inc, square)(3) =", c(3));
  console.log("pipe(square, inc, double)(3)    =", p(3));

  // Partial
  console.log("--- PARTIAL ---");
  var greet = function (prefix, name) { return prefix + name; };
  var sayHiTo = partial(greet, "Hi ");
  console.log("sayHiTo('Asha') =", sayHiTo("Asha"));

  // Memoize
  console.log("--- MEMOIZE ---");
  var calls = 0;
  var slow = function (n) { calls++; for (var i = 0; i < 200000; i++) {} return n * 2; };
  var fast = memoize(slow, function (n) { return "n:" + n; });
  console.log("fast(10) =", fast(10), "| calls:", calls);
  console.log("fast(10) =", fast(10), "| calls:", calls, "(cached)");
}

runFPDemo();`,
            recap: {
                takeaways: [
                    "Currying changes a function's calling shape so you can supply arguments over time.",
                    "compose is right-to-left; pipe is left-to-right (often easier to read).",
                    "memoize needs a stable key strategy; keyResolver keeps caching predictable."
                ],
                commonMistakes: [
                    "Confusing partial application with currying.",
                    "Writing curry that only supports one argument per call.",
                    "Using JSON.stringify on complex objects without thinking about stability/cycles."
                ],
                nextActions: [
                    "Write a curried prefix function: prefix('User: ')('Asha') -> 'User: Asha'.",
                    "Convert one imperative transform into pipe() with 3–4 small functions.",
                    "Memoize an expensive function and add a keyResolver."
                ]
            },
            comparison: {
                junior: `// ❌ Imperative, hard to reuse
function processUser(user) {
  const upper = user.name.toUpperCase();
  const trimmed = upper.trim();
  const formatted = 'User: ' + trimmed;
  return formatted;
}`,
                senior: `// ✅ Composable, reusable
const toUpper = s => s.toUpperCase();
const trim = s => s.trim();
const prefix = p => s => p + s;

const processUser = pipe(
  u => u.name,
  toUpper,
  trim,
  prefix('User: ')
);

// Each function is testable, reusable`
            },
            interview: {
                questions: [
                    { q: "What's the difference between curry and partial?", a: "Curry transforms f(a,b,c) to f(a)(b)(c) - fully curried. Partial fixes some args: partial(f, 1) gives f(1, ?, ?). Curry is about arity transformation, partial is about pre-filling." },
                    { q: "Why compose right-to-left?", a: "Matches mathematical notation: f(g(x)) means apply g first, then f. compose(f, g)(x) = f(g(x)). pipe() is left-to-right for readability." },
                    { q: "How does memoize cache key work?", a: "By default, JSON.stringify(args) creates the key. Custom keyResolver for complex args (objects) or when you want to ignore some params." },
                    { q: "What is point-free style?", a: "Writing functions without mentioning arguments: const double = map(x => x * 2) vs const double = arr => arr.map(x => x * 2). Currying enables point-free." }
                ]
            }
        },
        {
            day: 30,
            title: '🔥 JavaScript Performance & Memory',
            intro: "Profile like a pro. Identify memory leaks, optimize render cycles, and write performant code.",
            content: `
<div class="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 p-4 rounded-xl mb-6">
<h4 class="text-emerald-400 font-bold mb-2">🎯 Senior-Level Skill</h4>
<p class="text-light-300">Performance optimization separates mid from senior devs. Know these tools and techniques!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">🔧 Chrome DevTools Essentials</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Performance Tab</code> - Record runtime, find bottlenecks</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Memory Tab</code> - Heap snapshots, allocation timeline</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Lighthouse</code> - Automated audits</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Coverage Tab</code> - Find unused code</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚠️ Common Performance Killers</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
    <h4 class="font-bold text-red-400 mb-2">Memory Leaks</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Dangling event listeners</li>
        <li>Forgotten timers/intervals</li>
        <li>Closure references</li>
        <li>Detached DOM nodes</li>
    </ul>
</div>
<div class="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
    <h4 class="font-bold text-red-400 mb-2">CPU Bottlenecks</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Excessive DOM manipulation</li>
        <li>Synchronous operations</li>
        <li>Unnecessary re-renders</li>
        <li>Large bundle size</li>
    </ul>
</div>
</div>
            `,
            masteryChecklist: [
                { id: "d30-c1", text: "I can explain and measure micro-optimizations (and know when not to)." },
                { id: "d30-c2", text: "I can identify common memory leak sources (listeners, intervals, detached DOM, closures)." },
                { id: "d30-c3", text: "I can use Chrome DevTools Performance + Memory tabs to isolate a bottleneck." },
                { id: "d30-c4", text: "I can explain layout thrashing and how batching reads/writes avoids it." },
                { id: "d30-c5", text: "I can describe strategies for large lists (virtualization, pagination, memoization)." }
            ],
            predictions: [
                {
                    prompt: "Which is usually faster for building a long string in a loop?",
                    options: ["Repeated += concatenation", "Push to array then join", "They are always identical", "It depends only on CPU brand"],
                    correctIndex: 1,
                    explanation: "Array + join often performs better for many concatenations, though engines vary."
                },
                {
                    prompt: "What is the biggest risk of optimizing code without measuring first?",
                    options: ["You might break TypeScript", "You might waste time and optimize the wrong thing", "You might reduce code coverage", "You might force garbage collection"],
                    correctIndex: 1,
                    explanation: "Measure first to avoid premature optimization and misdiagnosis."
                },
                {
                    prompt: "A typical sign of a memory leak in a SPA is…",
                    options: ["CPU is high during idle", "Heap size grows after repeated navigation and never returns", "Network requests are slow", "CSS is unminified"],
                    correctIndex: 1,
                    explanation: "Leaky references keep objects alive; the heap keeps growing across actions."
                }
            ],
            checkpoints: [
                {
                    prompt: "Layout thrashing happens when you…",
                    options: [
                        "Use too many CSS classes",
                        "Alternate reading layout and writing styles repeatedly in a loop",
                        "Use async/await",
                        "Call JSON.stringify"
                    ],
                    correctIndex: 1,
                    explanation: "Mixing layout reads and writes forces repeated reflow."
                },
                {
                    prompt: "The most common cause of memory leaks in frontends is…",
                    options: ["Too many imports", "Dangling references (listeners/timers/caches) preventing GC", "Slow internet", "Large images"],
                    correctIndex: 1,
                    explanation: "GC cannot free objects that are still referenced."
                },
                {
                    prompt: "A reliable performance workflow is…",
                    options: ["Optimize first, then measure", "Measure → hypothesize → change one thing → re-measure", "Only use Lighthouse", "Only use console.time"],
                    correctIndex: 1,
                    explanation: "Change one variable at a time and validate impact."
                }
            ],
            labSteps: [
                {
                    id: "d30-step-1",
                    title: "Fix a memory leak: forgotten interval",
                    subtitle: "Return a cleanup function and call it",
                    teacherNote: "Leaks happen when something keeps running or keeps a reference after you think you're done.",
                    bugCode: `console.clear();

function startPolling() {
  setInterval(function () {
    // Imagine: fetch('/api/data')
    console.log("poll");
  }, 1000);
}

startPolling();
// ❌ No way to stop it`,
                    bugFocus: { fromLine: 2, toLine: 10 },
                    fixCode: `console.clear();

function startPolling() {
  var id = setInterval(function () {
    console.log("poll");
  }, 1000);

  return function stop() {
    clearInterval(id);
  };
}

var stop = startPolling();
setTimeout(function () {
  stop();
  console.log("stopped");
}, 2500);`,
                    fixFocus: { fromLine: 2, toLine: 16 },
                    whatToNotice: [
                        "If you cannot stop it, it will keep your app busy and can keep references alive.",
                        "Returning cleanup mirrors React useEffect cleanup and many API designs."
                    ]
                },
                {
                    id: "d30-step-2",
                    title: "Benchmark safely: avoid noisy results",
                    subtitle: "Warm up + run multiple iterations",
                    teacherNote: "One timing can lie. Run multiple times and compare medians.",
                    bugCode: `console.clear();

function work() {
  var s = 0;
  for (var i = 0; i < 500000; i++) s += i;
  return s;
}

var start = performance.now();
work();
console.log("time:", performance.now() - start);`,
                    bugFocus: { fromLine: 2, toLine: 12 },
                    fixCode: `console.clear();

function work() {
  var s = 0;
  for (var i = 0; i < 500000; i++) s += i;
  return s;
}

// warm up
for (var w = 0; w < 3; w++) work();

var times = [];
for (var t = 0; t < 10; t++) {
  var start = performance.now();
  work();
  times.push(performance.now() - start);
}
times.sort(function (a, b) { return a - b; });
console.log("median(ms):", times[Math.floor(times.length / 2)].toFixed(2));`,
                    fixFocus: { fromLine: 2, toLine: 20 },
                    whatToNotice: [
                        "Warm-up reduces JIT compilation noise.",
                        "Median is more stable than a single run."
                    ]
                }
            ],
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  ⚡ JAVASCRIPT PERFORMANCE & MEMORY OPTIMIZATION                     ║
║  Tools, techniques, and best practices                               ║
╠══════════════════════════════════════════════════════════════════════╣
║  Become a performance expert!                                        ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ MEASURING PERFORMANCE
// ═══════════════════════════════════════════════════════════════════
function measurePerformance(fn, label = 'Operation') {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(label + ": " + (end - start).toFixed(2) + "ms");
  return result;
}

// Using Performance API
function detailedMeasure(fn, name) {
  performance.mark(name + "-start");
  const result = fn();
  performance.mark(name + "-end");
  performance.measure(name, name + "-start", name + "-end");
  
  const measure = performance.getEntriesByName(name)[0];
  console.log(name + ": " + measure.duration.toFixed(2) + "ms");
  return result;
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ MEMORY LEAK PATTERNS & FIXES
// ═══════════════════════════════════════════════════════════════════

// ❌ LEAK: Event listener not cleaned up
class LeakyComponent {
  constructor() {
    window.addEventListener('resize', this.handleResize);
  }
  handleResize = () => { /* uses 'this' */ };
  // Missing: removeEventListener on cleanup!
}

// ✅ FIX: Proper cleanup
class SafeComponent {
  constructor() {
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }
  handleResize() { /* ... */ }
  destroy() {
    window.removeEventListener('resize', this.handleResize);
  }
}

// ❌ LEAK: Forgotten timer
function startPolling() {
  setInterval(() => {
    fetch('/api/data'); // Runs forever!
  }, 1000);
}

// ✅ FIX: Store and clear interval
function startPolling() {
  const intervalId = setInterval(() => {
    fetch('/api/data');
  }, 1000);
  
  return () => clearInterval(intervalId);
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ DOM OPTIMIZATION TECHNIQUES
// ═══════════════════════════════════════════════════════════════════

// ❌ SLOW: Multiple DOM updates
function addItemsSlow(items) {
  items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    document.body.appendChild(div); // Triggers reflow each time!
  });
}

// ✅ FAST: Batch DOM updates
function addItemsFast(items) {
  const fragment = document.createDocumentFragment();
  items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    fragment.appendChild(div);
  });
  document.body.appendChild(fragment); // Single reflow!
}

// ═══════════════════════════════════════════════════════════════════
// 4️⃣ ARRAY OPTIMIZATION
// ═══════════════════════════════════════════════════════════════════

// ❌ SLOW: Multiple iterations
const result1 = data
  .filter(x => x.active)
  .map(x => x.value)
  .reduce((sum, x) => sum + x, 0);

// ✅ FAST: Single iteration
const result2 = data.reduce((sum, x) => {
  return x.active ? sum + x.value : sum;
}, 0);

// ═══════════════════════════════════════════════════════════════════
// 🧪 CONSOLE BENCHMARK (no React)
// ═══════════════════════════════════════════════════════════════════
function runBenchmarks() {
  console.clear();
  console.log("=== Day 30: Performance Benchmarks (rough) ===");
  console.log("Tip: run multiple times; results vary across engines.");

  function time(label, fn) {
    var start = performance.now();
    fn();
    var end = performance.now();
    console.log(label + ": " + (end - start).toFixed(2) + "ms");
  }

  var iterations = 100000;

  time("Array push() x " + iterations, function () {
    var arr = [];
    for (var i = 0; i < iterations; i++) arr.push(i);
  });

  time("Pre-sized array write x " + iterations, function () {
    var arr = new Array(iterations);
    for (var i = 0; i < iterations; i++) arr[i] = i;
  });

  // Object vs Map lookup
  var obj = {};
  var map = new Map();
  for (var k = 0; k < 10000; k++) {
    obj["key" + k] = k;
    map.set("key" + k, k);
  }

  time("Object lookup x 10k", function () {
    for (var i = 0; i < 10000; i++) obj["key" + i];
  });

  time("Map lookup x 10k", function () {
    for (var i = 0; i < 10000; i++) map.get("key" + i);
  });

  // String concatenation strategies
  time("String += x 10k", function () {
    var s = "";
    for (var i = 0; i < 10000; i++) s += "a";
  });

  time("Array join x 10k", function () {
    var parts = [];
    for (var i = 0; i < 10000; i++) parts.push("a");
    parts.join("");
  });
}

runBenchmarks();`,
            recap: {
                takeaways: [
                    "Measure first: the biggest wins come from algorithm/data flow changes, not micro-tweaks.",
                    "Memory leaks are usually dangling references (listeners, timers, caches, detached DOM).",
                    "Avoid layout thrashing by batching reads and writes."
                ],
                commonMistakes: [
                    "Benchmarking once and trusting the number.",
                    "Optimizing before understanding the bottleneck (CPU vs layout vs GC vs network).",
                    "Leaking intervals/listeners on route changes."
                ],
                nextActions: [
                    "Record a Performance trace around a slow interaction; find the longest task.",
                    "Take two heap snapshots before/after a repeated action; compare retained objects.",
                    "Apply one optimization and re-measure."
                ]
            },
            comparison: {
                junior: `// ❌ No performance awareness
data.filter(x => x.active)
    .map(x => transform(x))
    .filter(x => x.value > 0)
    .map(x => format(x));
// 4 iterations over data!`,
                senior: `// ✅ Single pass, early termination
data.reduce((acc, x) => {
  if (!x.active) return acc;
  const t = transform(x);
  if (t.value <= 0) return acc;
  acc.push(format(t));
  return acc;
}, []);
// 1 iteration, skips unnecessary work`
            },
            interview: {
                questions: [
                    { q: "How do you identify memory leaks?", a: "Chrome DevTools Memory tab: Take heap snapshot before/after action, compare retained objects. Look for growing detached DOM trees, increasing object counts." },
                    { q: "What causes layout thrashing?", a: "Reading layout property (offsetHeight) then writing (style.height) in a loop. Browser must recalculate layout each iteration. Batch reads, then batch writes." },
                    { q: "When to use Web Workers?", a: "CPU-intensive tasks that would block main thread: image processing, data parsing, complex calculations. Keep UI responsive by offloading work." },
                    { q: "How to optimize large lists?", a: "Virtualization/windowing - only render visible items. Libraries: react-window, react-virtuoso. Also pagination and infinite scroll." }
                ]
            }
        },
        {
            day: 31,
            title: '🔥 TypeScript Essentials for JS Devs',
            intro: "TypeScript is now essential. Learn the core concepts every JS developer needs in 2025.",
            content: `
<div class="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 p-4 rounded-xl mb-6">
<h4 class="text-blue-400 font-bold mb-2">🎯 Required Skill in 2025</h4>
<p class="text-light-300">90%+ of new projects use TypeScript. You need this for any senior role!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📋 Core Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">interface vs type</code> - When to use each</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Generics</code> - Reusable type-safe code</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Union & Intersection</code> - Combine types</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Type Guards</code> - Runtime type checking</li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Utility Types</code> - Partial, Required, Pick, Omit</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">⚡ Quick Decision Guide</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-blue-400 mb-2">Use interface</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Object shapes (most common)</li>
        <li>Class implementations</li>
        <li>Declaration merging needed</li>
    </ul>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-purple-400 mb-2">Use type</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-light-300">
        <li>Unions and intersections</li>
        <li>Mapped types</li>
        <li>Tuple types</li>
    </ul>
</div>
</div>
            `,
            masteryChecklist: [
                { id: "d31-c1", text: "I can explain interface vs type and pick one with a clear reason." },
                { id: "d31-c2", text: "I can use generics to make reusable, type-safe helpers." },
                { id: "d31-c3", text: "I can narrow unknown using type guards (typeof, in, instanceof, custom is)." },
                { id: "d31-c4", text: "I can use 3 utility types (Partial, Pick/Omit, Record) correctly." },
                { id: "d31-c5", text: "I can explain unknown vs any and why unknown is safer." }
            ],
            predictions: [
                {
                    prompt: "You have `value: unknown`. What's the safest first step before using it?",
                    options: ["Cast to any", "Use typeof/guards to narrow", "Assume it's an object", "Call value.toString()"],
                    correctIndex: 1,
                    explanation: "unknown requires narrowing before use."
                },
                {
                    prompt: "Which is a unique advantage of interface over type?",
                    options: ["Better performance at runtime", "Declaration merging", "Can represent unions", "Can represent tuples"],
                    correctIndex: 1,
                    explanation: "Interfaces can merge; types cannot."
                },
                {
                    prompt: "What does Partial<User> do?",
                    options: ["Makes User nullable", "Makes all User properties optional", "Removes readonly", "Makes User a class"],
                    correctIndex: 1,
                    explanation: "Partial turns every property into optional."
                }
            ],
            checkpoints: [
                {
                    prompt: "unknown differs from any because…",
                    options: ["unknown is slower", "unknown forces you to narrow before use", "any is only for APIs", "unknown cannot be assigned"],
                    correctIndex: 1,
                    explanation: "unknown is type-safe any; you must check before using."
                },
                {
                    prompt: "A type guard function signature looks like…",
                    options: ["function isCat(x): boolean", "function isCat(x): x is Cat", "function isCat<Cat>(x)", "function isCat(x): Cat"],
                    correctIndex: 1,
                    explanation: "The `x is Cat` return type tells TS how to narrow."
                },
                {
                    prompt: "Pick<User, 'id'|'name'> produces…",
                    options: ["A user without id and name", "A user with only id and name", "A user with all fields required", "A runtime validator"],
                    correctIndex: 1,
                    explanation: "Pick selects a subset of properties."
                }
            ],
            labSteps: [
                {
                    id: "d31-step-1",
                    title: "Bug: treating unknown like any",
                    subtitle: "Narrow before use",
                    teacherNote: "This is the most common real-world TS bug when integrating external data.",
                    bugCode: `console.clear();

// Imagine: data from API
var value = /** @type {unknown} */ ("hello");

// ❌ Bug: using unknown without narrowing
// In TypeScript this should be an error:
// console.log(value.toUpperCase());`,
                    bugFocus: { fromLine: 2, toLine: 8 },
                    fixCode: `console.clear();

// Imagine: data from API
var value = /** @type {unknown} */ ("hello");

// ✅ Narrow first (TypeScript idea shown in JS)
if (typeof value === "string") {
  console.log(value.toUpperCase());
} else {
  console.log("not a string");
}`,
                    fixFocus: { fromLine: 2, toLine: 12 },
                    whatToNotice: [
                        "unknown forces you to check before use; any skips safety.",
                        "Type guards mirror runtime checks."
                    ]
                },
                {
                    id: "d31-step-2",
                    title: "Generics mindset: write once, type-safe everywhere",
                    subtitle: "Identity and API response shapes",
                    teacherNote: "Generics are the backbone of reusable libraries and hooks.",
                    bugCode: `console.clear();

// ❌ Pseudo-code: without generics you repeat for every type
// function identityString(x: string): string { return x; }
// function identityNumber(x: number): number { return x; }`,
                    bugFocus: { fromLine: 2, toLine: 4 },
                    fixCode: `console.clear();

// ✅ Pseudo-code: with generics you write once
// function identity<T>(x: T): T { return x; }
// identity<string>("hi")
// identity(123) // inferred`,
                    fixFocus: { fromLine: 2, toLine: 6 },
                    whatToNotice: [
                        "T is a placeholder for a type the caller supplies or TS infers.",
                        "Generics preserve information (no casting needed)."
                    ]
                }
            ],
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  📘 TYPESCRIPT ESSENTIALS                                            ║
║  Everything a JS developer needs to know                             ║
╠══════════════════════════════════════════════════════════════════════╣
║  Note: This is educational code showing TS concepts in JS comments   ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ BASIC TYPES
// ═══════════════════════════════════════════════════════════════════
/*
// Primitives
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["a", "b"];

// Objects
interface User {
  id: number;
  name: string;
  email?: string; // Optional
  readonly createdAt: Date; // Can't modify
}

// Functions
function greet(name: string): string {
  return "Hello " + name;
}

const add = (a: number, b: number): number => a + b;
*/

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ GENERICS - Reusable type-safe code
// ═══════════════════════════════════════════════════════════════════
/*
// Generic function
function identity<T>(arg: T): T {
  return arg;
}
identity<string>("hello"); // Type is string
identity(42); // Type inferred as number

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "John" },
  status: 200
};

// Generic constraints
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
getLength("hello"); // Works
getLength([1, 2, 3]); // Works
// getLength(123); // Error: number has no length
*/

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ UNION & INTERSECTION TYPES
// ═══════════════════════════════════════════════════════════════════
/*
// Union: A OR B
type Status = "pending" | "success" | "error";
type ID = string | number;

function print(id: ID) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // TypeScript knows it's string
  } else {
    console.log(id.toFixed(2)); // TypeScript knows it's number
  }
}

// Intersection: A AND B
interface Printable { print(): void; }
interface Loggable { log(): void; }

type PrintableLoggable = Printable & Loggable;

const obj: PrintableLoggable = {
  print() { console.log("printing"); },
  log() { console.log("logging"); }
};
*/

// ═══════════════════════════════════════════════════════════════════
// 4️⃣ TYPE GUARDS
// ═══════════════════════════════════════════════════════════════════
/*
interface Cat { meow(): void; }
interface Dog { bark(): void; }

// Type guard function
function isCat(animal: Cat | Dog): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow(); // TypeScript knows it's Cat
  } else {
    animal.bark(); // TypeScript knows it's Dog
  }
}

// in operator guard
function move(animal: { fly?: () => void; swim?: () => void }) {
  if ("fly" in animal) {
    animal.fly();
  } else if ("swim" in animal) {
    animal.swim();
  }
}
*/

// ═══════════════════════════════════════════════════════════════════
// 5️⃣ UTILITY TYPES
// ═══════════════════════════════════════════════════════════════════
/*
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - All properties optional
type PartialUser = Partial<User>;
const update: PartialUser = { name: "New Name" };

// Required - All properties required
type RequiredUser = Required<User>;

// Pick - Select specific properties
type UserPreview = Pick<User, "id" | "name">;

// Omit - Exclude properties
type UserWithoutEmail = Omit<User, "email">;

// Record - Object with specific key/value types
type UserMap = Record<string, User>;

// ReturnType - Get function's return type
function getUser() { return { id: 1, name: "John" }; }
type UserReturn = ReturnType<typeof getUser>;
*/

// ═══════════════════════════════════════════════════════════════════
// 🧪 CONSOLE QUIZ (no React)
// ═══════════════════════════════════════════════════════════════════
var TS_QUIZ = [
  {
    q: "What's the difference between interface and type?",
    a: "interface is great for object shapes and supports declaration merging. type is great for unions/intersections and computed types. Both can model objects; pick based on needs."
  },
  {
    q: "What is a generic in TypeScript?",
    a: "A type parameter (like T) that makes code reusable while preserving type information. Example: identity<T>(x: T): T."
  },
  {
    q: "What does 'as const' do?",
    a: "Narrow values to literals and make them readonly (great for configuration objects and discriminated unions)."
  },
  {
    q: "What is a type guard?",
    a: "A runtime check that narrows a union. Built-ins: typeof, instanceof, in. Custom: function isCat(x): x is Cat."
  },
  {
    q: "Explain Partial<T>",
    a: "Makes all properties optional. Useful for updates: updateUser(id, patch: Partial<User>)."
  }
];

function showTSQuestion(index, reveal) {
  var item = TS_QUIZ[index];
  if (!item) return console.log("No question at index:", index);
  console.log("Q" + (index + 1) + ":", item.q);
  if (reveal) console.log("A:", item.a);
  else console.log("Predict your answer, then call showTSQuestion(" + index + ", true).");
}

function showAllTS(reveal) {
  for (var i = 0; i < TS_QUIZ.length; i++) showTSQuestion(i, reveal);
}

console.clear();
showTSQuestion(0, false);`,
            recap: {
                takeaways: [
                    "TypeScript adds a compile-time safety net; your runtime is still JavaScript.",
                    "Prefer unknown over any for external data; narrow with guards.",
                    "Generics preserve information and prevent casting everywhere."
                ],
                commonMistakes: [
                    "Using any as an escape hatch and losing the benefits.",
                    "Over-typing everything instead of letting inference work.",
                    "Forgetting that types do not exist at runtime."
                ],
                nextActions: [
                    "Convert one JS module to TS and replace any with unknown + guards.",
                    "Write a generic helper (identity, first, groupBy) and let inference do the work.",
                    "Use Partial/Pick/Omit in one real function signature."
                ]
            },
            comparison: {
                junior: `// ❌ No types, runtime errors
function getUser(id) {
  return fetch('/api/users/' + id)
    .then(r => r.json());
}

const user = await getUser("abc");
console.log(user.nmae); // Typo! No error until runtime`,
                senior: `// ✅ Full type safety
interface User {
  id: number;
  name: string;
}

async function getUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}

const user = await getUser(1);
console.log(user.nmae); // ❌ Error caught at compile time!`
            },
            interview: {
                questions: [
                    { q: "When would you use 'unknown' vs 'any'?", a: "unknown is type-safe any. You must narrow it before use. any disables type checking entirely. Prefer unknown for values from external sources." },
                    { q: "What is declaration merging?", a: "When two interfaces with same name combine their properties. Useful for extending library types. Only works with interface, not type." },
                    { q: "Explain the 'infer' keyword", a: "Used in conditional types to extract a type. Example: type ReturnType<T> = T extends (...args: any) => infer R ? R : never. Infers the return type R." },
                    { q: "What are Mapped Types?", a: "Create new types by transforming properties of existing type. Example: type Readonly<T> = { readonly [K in keyof T]: T[K] }. Loops over keys." }
                ]
            }
        },
        {
            day: 32,
            title: '🔥 System Design for Frontend',
            intro: "The final boss. Design scalable frontend architectures like a senior engineer.",
            content: `
<div class="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 p-4 rounded-xl mb-6">
<h4 class="text-violet-400 font-bold mb-2">🎯 Staff/Principal Level</h4>
<p class="text-light-300">Frontend system design is now asked at senior+ levels. Master these concepts to land top roles!</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">📋 Common Interview Topics</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Twitter Feed</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Google Docs</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Autocomplete</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Image Gallery</code></li>
<li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Chat Application</code></li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">🏗️ The Framework (RADIO)</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│                     RADIO FRAMEWORK                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  R - Requirements    What exactly are we building?              │
│  A - Architecture    Component hierarchy, data flow             │
│  D - Data Model      State shape, API contracts                 │
│  I - Interface       API design, component props                │
│  O - Optimizations   Performance, caching, edge cases           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">⚡ Key Considerations</h3>
<div class="grid md:grid-cols-3 gap-4 mb-6">
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-blue-400 mb-2">State Management</h4>
    <p class="text-sm text-light-300">Local vs global, server state, cache invalidation</p>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-green-400 mb-2">Performance</h4>
    <p class="text-sm text-light-300">Virtualization, lazy loading, code splitting</p>
</div>
<div class="bg-dark-800 p-4 rounded-lg border border-dark-600">
    <h4 class="font-bold text-purple-400 mb-2">Real-time</h4>
    <p class="text-sm text-light-300">WebSocket vs polling, optimistic updates</p>
</div>
</div>
            `,
            masteryChecklist: [
                { id: "d32-c1", text: "I can use RADIO (Requirements, Architecture, Data, Interface, Optimizations) to structure answers." },
                { id: "d32-c2", text: "I can ask clarifying questions and separate functional vs non-functional requirements." },
                { id: "d32-c3", text: "I can propose a state model and API contract (pagination, normalization, caching)." },
                { id: "d32-c4", text: "I can discuss performance strategies (virtualization, code-splitting, caching, memoization)." },
                { id: "d32-c5", text: "I can explain real-time and offline tradeoffs (WS/SSE/polling, service worker, IndexedDB)." }
            ],
            predictions: [
                {
                    prompt: "For infinite scroll feeds, which pagination is usually best at scale?",
                    options: ["Offset-based pagination", "Cursor-based pagination", "No pagination", "Random sampling"],
                    correctIndex: 1,
                    explanation: "Cursor-based avoids duplicates/holes when data changes and performs better at scale."
                },
                {
                    prompt: "To render 100k feed items efficiently in the UI, the key technique is…",
                    options: ["Bigger server", "Virtualization/windowing", "More CSS", "Avoid JSON"],
                    correctIndex: 1,
                    explanation: "Virtualization renders only what is visible."
                },
                {
                    prompt: "For real-time new items, a common UX pattern is…",
                    options: ["Always prepend immediately", "Show a 'new items' toast and merge on click", "Disable real-time", "Reload page every 2s"],
                    correctIndex: 1,
                    explanation: "Prepending can jump the scroll; batching improves UX."
                }
            ],
            checkpoints: [
                {
                    prompt: "RADIO 'D' stands for…",
                    options: ["Deployment", "Data model", "Design tokens", "Debugging"],
                    correctIndex: 1,
                    explanation: "Data model includes state shape, normalization, and API contracts."
                },
                {
                    prompt: "Why is cursor pagination preferred over offset for feeds?",
                    options: ["It is required by React", "Offsets break when inserts/deletes happen; cursors are stable", "Offsets are slower in JavaScript", "Offsets cannot be cached"],
                    correctIndex: 1,
                    explanation: "Offsets can skip/duplicate items when the dataset changes."
                },
                {
                    prompt: "A normalized state shape for items usually means…",
                    options: ["Storing only arrays", "Storing byId map + allIds array", "Storing everything in localStorage", "Storing raw HTML"],
                    correctIndex: 1,
                    explanation: "Normalization makes updates and lookups predictable and efficient."
                }
            ],
            labSteps: [
                {
                    id: "d32-step-1",
                    title: "Requirements drill: clarify before designing",
                    subtitle: "Split functional and non-functional requirements",
                    teacherNote: "Senior signal: you ask the right questions before drawing boxes.",
                    bugCode: `console.clear();

// ❌ Vague requirement statement:
// "Design a Twitter feed"`,
                    bugFocus: { fromLine: 2, toLine: 4 },
                    fixCode: `console.clear();

// ✅ Clarify:
var requirements = {
  functional: [
    "View feed items (text, media)",
    "Infinite scroll",
    "Like/retweet/reply",
    "Compose new item",
    "Real-time new items"
  ],
  nonFunctional: [
    "Handles large lists (virtualization)",
    "Fast cold start (code-splitting, caching)",
    "Accessible + mobile responsive",
    "Offline read support (optional)"
  ]
};

console.log(requirements);`,
                    fixFocus: { fromLine: 2, toLine: 22 },
                    whatToNotice: [
                        "Non-functional requirements drive architecture choices.",
                        "You can now reason about tradeoffs (WS vs polling, cache, offline)."
                    ]
                },
                {
                    id: "d32-step-2",
                    title: "Data model + pagination plan",
                    subtitle: "Design the state shape and API contract",
                    teacherNote: "If you can define the data model, the UI becomes straightforward.",
                    bugCode: `console.clear();

// ❌ Fragile: offset pagination and denormalized arrays
var state = { tweets: [] };`,
                    bugFocus: { fromLine: 2, toLine: 4 },
                    fixCode: `console.clear();

// ✅ Normalized + cursor pagination
var state = {
  tweets: {
    byId: {},
    allIds: [],
    loading: false,
    error: null,
    cursor: null,
    hasMore: true
  }
};

var api = {
  getFeed: "GET /api/feed?cursor=CURSOR&limit=20",
  postTweet: "POST /api/tweets { content, media }",
  likeTweet: "POST /api/tweets/:id/like"
};

console.log(state);
console.log(api);`,
                    fixFocus: { fromLine: 2, toLine: 26 },
                    whatToNotice: [
                        "byId allows O(1) updates (likes, edits).",
                        "cursor avoids duplicates/holes when new items arrive."
                    ]
                }
            ],
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🏗️ FRONTEND SYSTEM DESIGN                                          ║
║  Example: Design a Twitter-like Feed                                 ║
╠══════════════════════════════════════════════════════════════════════╣
║  This shows the thinking process for system design interviews        ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 📋 REQUIREMENTS (Always clarify first!)
// ═══════════════════════════════════════════════════════════════════
/*
Functional:
- Display feed of tweets (text, images)
- Infinite scroll
- Like/retweet/reply
- Real-time updates for new tweets
- Compose new tweet

Non-functional:
- Handle 100k+ tweets (virtualization needed)
- Works offline (service worker)
- Mobile responsive
- Accessible
*/

// ═══════════════════════════════════════════════════════════════════
// 🏗️ ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════
/*
┌─────────────────────────────────────────────────────────┐
│                         App                             │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   Header    │  │  Compose    │  │  Sidebar    │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │                  FeedContainer                   │    │
│  │  ┌────────────────────────────────────────────┐ │    │
│  │  │            VirtualizedList                 │ │    │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐    │ │    │
│  │  │  │ TweetCard│ │ TweetCard│ │ TweetCard│    │ │    │
│  │  │  └──────────┘ └──────────┘ └──────────┘    │ │    │
│  │  └────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
*/

// ═══════════════════════════════════════════════════════════════════
// 📊 DATA MODEL
// ═══════════════════════════════════════════════════════════════════
/*
// State shape
{
  tweets: {
    byId: { [id]: Tweet },
    allIds: string[],
    loading: boolean,
    error: string | null,
    hasMore: boolean,
    cursor: string | null
  },
  user: {
    current: User | null,
    loading: boolean
  },
  ui: {
    composerOpen: boolean,
    theme: 'light' | 'dark'
  }
}

// API Contract
GET /api/feed?cursor=xxx&limit=20
POST /api/tweets { content, media }
POST /api/tweets/:id/like
WS /realtime { type: 'NEW_TWEET' | 'LIKE' | 'RETWEET' }
*/

// ═══════════════════════════════════════════════════════════════════
// 🔧 KEY IMPLEMENTATIONS (console walkthrough; no React/JSX)
// ═══════════════════════════════════════════════════════════════════

function radioTemplate() {
  return {
    requirements: {
      functional: [
        "View feed items (text/media)",
        "Infinite scroll",
        "Like/retweet/reply",
        "Compose new item",
        "Real-time new items"
      ],
      nonFunctional: [
        "Large list performance (virtualization/windowing)",
        "Fast startup (code-splitting, caching)",
        "Accessible + mobile responsive",
        "Offline read support (optional)"
      ]
    },
    architecture: {
      components: ["FeedPage", "FeedContainer", "VirtualizedList", "ItemCard", "Composer", "NewItemsToast"],
      dataFlow: ["Server state cache (React Query/SWR)", "Local UI state (composer, filters)", "WebSocket/SSE stream for realtime"]
    },
    dataModel: {
      stateShape: {
        items: { byId: {}, allIds: [], cursor: null, hasMore: true, loading: false, error: null },
        user: { current: null },
        ui: { composerOpen: false, theme: "dark" }
      },
      api: {
        list: "GET /api/feed?cursor=CURSOR&limit=20",
        create: "POST /api/items { content, media }",
        like: "POST /api/items/:id/like",
        realtime: "WS /realtime (NEW_ITEM, LIKE, RETWEET)"
      }
    },
    interface: {
      componentProps: ["items: Item[]", "onLike(id)", "onLoadMore(cursor)", "newItemsCount"],
      errorStates: ["loading skeleton", "empty state", "offline banner", "retry button"]
    },
    optimizations: {
      perf: ["virtualize list", "memoize item rows", "lazy load images", "avoid layout thrash"],
      caching: ["stale-while-revalidate", "prefetch next page", "dedupe requests"],
      reliability: ["retry with backoff", "optimistic updates with rollback", "idempotency for writes"]
    }
  };
}

function printRadio(plan) {
  console.clear();
  console.log("=== Day 32: Frontend System Design (RADIO) ===");
  console.log("R:", plan.requirements);
  console.log("A:", plan.architecture);
  console.log("D:", plan.dataModel);
  console.log("I:", plan.interface);
  console.log("O:", plan.optimizations);
}

var plan = radioTemplate();
printRadio(plan);`,
            recap: {
                takeaways: [
                    "Lead with clarification: requirements drive architecture.",
                    "RADIO keeps answers structured and complete under time pressure.",
                    "State + API design (pagination, normalization, caching) is the backbone of the UI."
                ],
                commonMistakes: [
                    "Jumping into components before clarifying requirements and scale.",
                    "Using offset pagination for feeds where items are constantly inserted.",
                    "Ignoring performance (virtualization) and reliability (retry, rollback)."
                ],
                nextActions: [
                    "Practice 2 prompts: autocomplete and chat. Use RADIO headings out loud.",
                    "Write a normalized state shape + API contract for each prompt.",
                    "List 5 optimizations and when you'd apply them."
                ]
            },
            comparison: {
                junior: `// ❌ No architecture thinking
function Feed() {
  const [tweets, setTweets] = useState([]);
  
  useEffect(() => {
    fetch('/api/tweets').then(r => r.json())
      .then(setTweets);
  }, []);
  
  return tweets.map(t => <div>{t.text}</div>);
}
// No pagination, no optimization, no real-time`,
                senior: `// ✅ Architectural thinking
/*
1. Requirements: Scale, real-time, offline?
2. Architecture: Container/Presentational split
3. Data: Normalized state, cursor pagination
4. Interface: Props, API contracts
5. Optimizations: Virtualization, code-split
*/

// Uses: React Query (caching), WebSocket 
// (real-time), react-window (virtualization),
// service worker (offline), optimistic updates`
            },
            interview: {
                questions: [
                    { q: "How would you handle real-time updates for 1M users?", a: "WebSocket with room-based subscriptions. Only subscribe to visible/relevant data. Use a message queue (Redis) to fan out. Consider Server-Sent Events for simpler one-way updates." },
                    { q: "How do you design for offline-first?", a: "Service Worker to cache app shell and API responses. IndexedDB for local data storage. Background Sync API to queue writes. Show stale data with freshness indicator." },
                    { q: "How would you implement infinite scroll efficiently?", a: "Cursor-based pagination (not offset). Virtualization to render only visible items. Intersection Observer for scroll detection. Debounce scroll events." },
                    { q: "How do you handle optimistic updates with rollback?", a: "Update UI immediately with temporary ID. Track pending operations. On success, replace temp ID with real. On failure, remove from state and show error. Consider using React Query's optimistic update helpers." }
                ]
            }
        },
        {
            day: 33,
            title: '🏁 Capstone: Build a Resilient Autocomplete (Debounce + Abort + Cache + Retry)',
            intro: "Today you build a mini system you will actually use in real apps: an autocomplete/search controller that stays fast, cancels stale requests, avoids duplicate calls, and retries safely. We build it step-by-step so even a beginner can follow.",
            content: `
<div class="bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 border border-fuchsia-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-fuchsia-300 font-bold mb-2">🎯 Capstone Goal</h4>
  <p class="text-light-300">
    You will build an <span class="text-yellow-300 font-bold">Autocomplete Controller</span> that:
    debounces user input, aborts stale requests, caches results, and retries with backoff.
  </p>
</div>

<h3 class="text-xl font-bold text-white mb-4">✅ What You Are Building</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><code class="bg-dark-900 text-cyan-400 px-2 py-1 rounded">createAutocompleteController</code> that exposes <span class="text-yellow-300 font-bold">search(query)</span></li>
  <li>Debounce to avoid calling the server on every keystroke</li>
  <li>Abort previous in-flight request when the user types again</li>
  <li>Cache (LRU) so repeated queries are instant</li>
  <li>Retry with exponential backoff for flaky networks</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">🧠 Why This Matters</h3>
<div class="bg-dark-900 border border-dark-700 p-4 rounded-xl mb-6 text-light-300">
  <p class="mb-2"><span class="text-green-400 font-bold">Beginner win:</span> You stop guessing how "real apps" behave and you build a real one.</p>
  <p class="mb-2"><span class="text-blue-400 font-bold">Interview win:</span> You can explain debouncing, cancellation, caching, and backoff as a coherent system.</p>
  <p><span class="text-purple-400 font-bold">Senior win:</span> You can reason about tradeoffs: UX vs network cost vs consistency.</p>
</div>
            `,
            masteryChecklist: [
                { id: "d33-c1", text: "I can explain why debouncing is needed for autocomplete and choose a delay intentionally." },
                { id: "d33-c2", text: "I can cancel stale requests (AbortController) so older responses do not overwrite newer UI." },
                { id: "d33-c3", text: "I can add caching for repeated queries and explain cache invalidation basics." },
                { id: "d33-c4", text: "I can implement retry with exponential backoff (with a max) and explain when NOT to retry." },
                { id: "d33-c5", text: "I can describe the whole flow: input -> debounce -> request -> abort -> cache -> render." }
            ],
            predictions: [
                {
                    prompt: "User types 'r', then 're', then 'rea' within 200ms. With a debounce of 300ms, how many network requests should happen?",
                    options: ["3", "2", "1", "0"],
                    correctIndex: 2,
                    explanation: "Debounce waits for a pause. Only the final value after the pause triggers the call."
                },
                {
                    prompt: "Why abort an in-flight request during autocomplete?",
                    options: [
                        "Because it makes JavaScript faster",
                        "To prevent stale results arriving later and replacing newer results",
                        "To avoid having to use async/await",
                        "Because fetch requires it"
                    ],
                    correctIndex: 1,
                    explanation: "Without cancellation, slow older requests can arrive last and show the wrong results."
                },
                {
                    prompt: "When should you NOT retry a request?",
                    options: ["Network timeout", "HTTP 429 or 503 (sometimes)", "HTTP 400 (bad request)", "Temporary DNS failure"],
                    correctIndex: 2,
                    explanation: "4xx client errors usually mean the request is invalid; retrying won't help."
                }
            ],
            checkpoints: [
                {
                    prompt: "The main purpose of LRU in autocomplete caching is…",
                    options: ["To store infinite results", "To keep memory bounded while caching the most useful recent queries", "To compress network payloads", "To make typing faster in the keyboard"],
                    correctIndex: 1,
                    explanation: "LRU keeps cache size bounded and prioritizes recently-used queries."
                },
                {
                    prompt: "If you do not abort and you accept responses in any order, the bug is called…",
                    options: ["Hoisting", "Race condition", "Dead code elimination", "Lexical scoping"],
                    correctIndex: 1,
                    explanation: "Two async operations can resolve out of order and corrupt state."
                },
                {
                    prompt: "A safe retry strategy always includes…",
                    options: ["Infinite retries", "No delays", "A maximum attempts cap and increasing delays", "Randomly throwing errors"],
                    correctIndex: 2,
                    explanation: "Backoff + max attempts prevents hammering and infinite loops."
                }
            ],
            labSteps: [
                {
                    id: "d33-step-1",
                    title: "Step 1: Debounce user input (avoid 1 request per keystroke)",
                    subtitle: "Build a tiny debouncer and watch the call count drop",
                    teacherNote: "We start simple. First make the number of calls correct. Then we add cancellation.",
                    bugCode: `console.clear();

// Fake API call (pretend network)
function apiSearch(query) {
  console.log("API CALL for:", query);
  return Promise.resolve(["result:" + query]);
}

// ❌ Bug: calling API on every keystroke
function onType(query) {
  apiSearch(query).then(function (r) { console.log("results:", r); });
}

onType("r");
onType("re");
onType("rea");`,
                    bugFocus: { fromLine: 2, toLine: 15 },
                    fixCode: `console.clear();

function apiSearch(query) {
  console.log("API CALL for:", query);
  return Promise.resolve(["result:" + query]);
}

function debounce(fn, waitMs) {
  var t = null;
  return function () {
    var args = arguments;
    clearTimeout(t);
    t = setTimeout(function () { fn.apply(null, args); }, waitMs);
  };
}

var onType = debounce(function (query) {
  apiSearch(query).then(function (r) { console.log("results:", r); });
}, 300);

onType("r");
onType("re");
onType("rea");
// After ~300ms, only ONE API call should happen (for "rea")`,
                    fixFocus: { fromLine: 2, toLine: 22 },
                    whatToNotice: [
                        "Debounce waits for typing to pause before calling the API.",
                        "This immediately reduces server load and improves UX."
                    ]
                },
                {
                    id: "d33-step-2",
                    title: "Step 2: Abort stale requests (prevent race conditions)",
                    subtitle: "Cancel the previous fetch when a new query starts",
                    teacherNote: "Now we fix the classic bug: older slow responses overwriting newer results.",
                    bugCode: `console.clear();

// Fake fetch: random delay simulates network unpredictability
function apiSearch(query, signal) {
  return new Promise(function (resolve, reject) {
    var delay = Math.floor(Math.random() * 500) + 50;
    var id = setTimeout(function () {
      resolve(["result:" + query, "delay:" + delay]);
    }, delay);

    // ❌ Bug: ignoring signal means stale requests keep running
  });
}

function run() {
  apiSearch("re").then(function (r) { console.log("render:", r); });
  apiSearch("rea").then(function (r) { console.log("render:", r); });
}

run();
// Sometimes "re" renders AFTER "rea" (wrong UI).`,
                    bugFocus: { fromLine: 2, toLine: 22 },
                    fixCode: `console.clear();

function apiSearch(query, signal) {
  return new Promise(function (resolve, reject) {
    var delay = Math.floor(Math.random() * 500) + 50;
    var id = setTimeout(function () {
      resolve(["result:" + query, "delay:" + delay]);
    }, delay);

    if (signal) {
      if (signal.aborted) {
        clearTimeout(id);
        return reject(new Error("aborted"));
      }
      signal.addEventListener("abort", function () {
        clearTimeout(id);
        reject(new Error("aborted"));
      }, { once: true });
    }
  });
}

function createAbortableSearch() {
  var controller = null;
  return function search(query) {
    if (controller) controller.abort();
    controller = new AbortController();
    return apiSearch(query, controller.signal);
  };
}

var search = createAbortableSearch();
search("re").then(function (r) { console.log("render:", r); }).catch(function (e) { console.log("re:", e.message); });
search("rea").then(function (r) { console.log("render:", r); }).catch(function (e) { console.log("rea:", e.message); });`,
                    fixFocus: { fromLine: 2, toLine: 34 },
                    whatToNotice: [
                        "Aborting ensures only the newest query can render.",
                        "This prevents race-condition UI bugs."
                    ]
                },
                {
                    id: "d33-step-3",
                    title: "Step 3: Add cache + retry (finish the mini system)",
                    subtitle: "Cache repeated queries and retry flaky requests with backoff",
                    teacherNote: "We keep this step small: first cache, then retry. You now have a production-grade pattern.",
                    bugCode: `console.clear();

// ❌ Bug: no cache and no retry strategy
function createController(apiSearch) {
  return {
    search: function (query) {
      return apiSearch(query);
    }
  };
}

function flakyApi(query) {
  return new Promise(function (resolve, reject) {
    if (Math.random() < 0.5) return reject(new Error("temporary network"));
    resolve(["result:" + query]);
  });
}

var c = createController(flakyApi);
c.search("react").then(console.log).catch(function (e) { console.log("fail:", e.message); });
c.search("react").then(console.log).catch(function (e) { console.log("fail:", e.message); });`,
                    bugFocus: { fromLine: 2, toLine: 22 },
                    fixCode: `console.clear();

function sleep(ms) {
  return new Promise(function (r) { setTimeout(r, ms); });
}

function retry(fn, maxAttempts, baseDelayMs) {
  return fn().catch(function (err) {
    if (maxAttempts <= 1) throw err;
    var delay = baseDelayMs;
    return sleep(delay).then(function () {
      return retry(fn, maxAttempts - 1, Math.min(baseDelayMs * 2, 2000));
    });
  });
}

function createLRU(limit) {
  var map = new Map();
  return {
    get: function (k) {
      if (!map.has(k)) return undefined;
      var v = map.get(k);
      map.delete(k);
      map.set(k, v);
      return v;
    },
    set: function (k, v) {
      if (map.has(k)) map.delete(k);
      map.set(k, v);
      if (map.size > limit) {
        var firstKey = map.keys().next().value;
        map.delete(firstKey);
      }
    }
  };
}

function createController(apiSearch) {
  var cache = createLRU(20);
  return {
    search: function (query) {
      var cached = cache.get(query);
      if (cached) return Promise.resolve(cached);
      return retry(function () { return apiSearch(query); }, 3, 200).then(function (res) {
        cache.set(query, res);
        return res;
      });
    }
  };
}

function flakyApi(query) {
  return new Promise(function (resolve, reject) {
    if (Math.random() < 0.5) return reject(new Error("temporary network"));
    resolve(["result:" + query]);
  });
}

var c = createController(flakyApi);
c.search("react").then(function (r) { console.log("ok:", r); }).catch(function (e) { console.log("fail:", e.message); });
setTimeout(function () {
  c.search("react").then(function (r) { console.log("cached:", r); }).catch(function (e) { console.log("fail:", e.message); });
}, 500);`,
                    fixFocus: { fromLine: 2, toLine: 63 },
                    whatToNotice: [
                        "Cache makes repeated queries instant.",
                        "Retry with backoff handles flaky networks without hammering the server."
                    ]
                }
            ],
            code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  Day 33 Starter (Read this first)                                   ║
║  You will build the full controller step-by-step via the lab steps.  ║
╚══════════════════════════════════════════════════════════════════════╝
*/

console.clear();

console.log("Day 33: Capstone - Resilient Autocomplete");
console.log("Do the labs in order: Step 1 (debounce) -> Step 2 (abort) -> Step 3 (cache+retry).");

// Small mental model:
// input -> debounce -> start request -> abort previous -> retry (if needed) -> cache -> return -> render

// Tip: After you finish, combine the ideas into ONE createAutocompleteController:
// - debounce search()
// - abort previous in-flight request
// - cache results for repeated queries
// - retry only for temporary errors (with backoff)
`,
            recap: {
                takeaways: [
                    "You built a real mini-system, not just isolated utilities.",
                    "Correctness first (no stale results), then performance (debounce, cache), then reliability (retry).",
                    "This pattern shows up everywhere: search, filters, autosave, typeahead, live validation."
                ],
                commonMistakes: [
                    "Not aborting and letting older results overwrite newer UI.",
                    "Caching without bounds (memory leak) or without considering invalidation.",
                    "Retrying forever or retrying invalid requests (4xx)."
                ],
                nextActions: [
                    "Implement createAutocompleteController in your own file using the three lab steps.",
                    "Add a max cache size and log cache hits/misses to verify behavior.",
                    "Try one more feature: ignore queries shorter than 2 chars."
                ]
            },
            comparison: {
                junior: `// ❌ Naive
function onType(q) {
  fetch("/api/search?q=" + q).then(r => r.json()).then(render);
}
// Calls server on every keypress, can show stale results`,
                senior: `// ✅ Resilient system
// 1) debounce input
// 2) abort stale requests
// 3) cache repeated queries (bounded)
// 4) retry temporary failures (backoff + max)
// Result: correct + fast + reliable`
            },
            interview: {
                questions: [
                    { q: "Explain debouncing vs throttling in one sentence", a: "Debounce waits for inactivity then runs once; throttle runs at most once per interval while events continue." },
                    { q: "What problem does AbortController solve?", a: "Cancels stale in-flight requests so older responses cannot overwrite newer UI (prevents race conditions) and saves resources." },
                    { q: "Why use LRU for caching?", a: "To bound memory while keeping the most recently useful entries for fast repeated queries." },
                    { q: "When should you not retry?", a: "On 4xx client errors, non-idempotent writes, or when the user cancelled the action." }
                ]
            }
        },
        {
            day: 34,
            title: '⚡ Event Loop Deep Dive: Microtasks, Macrotasks, Starvation',
            intro: "You already know the basics. Today you build a rock-solid mental model of the event loop that explains 95% of async bugs: ordering, microtasks vs macrotasks, and starvation.",
            content: `
<div class="bg-gradient-to-r from-sky-500/20 to-indigo-500/20 border border-sky-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-sky-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-light-300">You will be able to <span class="text-yellow-300 font-bold">predict</span> and <span class="text-yellow-300 font-bold">explain</span> async ordering and prevent race-condition UI bugs.</p>
</div>

<h3 class="text-xl font-bold text-white mb-4">🧠 The Rule (Say It Out Loud)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-green-400 font-bold">Sync code</span> runs first (current call stack).</li>
  <li><span class="text-blue-400 font-bold">Microtasks</span> run next (Promise.then, queueMicrotask) until the queue is empty.</li>
  <li><span class="text-purple-400 font-bold">Macrotasks</span> run after that (setTimeout, setInterval, I/O callbacks).</li>
</ul>

<div class="bg-dark-900 border border-dark-700 p-4 rounded-xl text-light-300">
  <p class="mb-2"><span class="text-yellow-300 font-bold">Beginner tip:</span> When you're confused, write the queue order down on paper.</p>
  <p><span class="text-yellow-300 font-bold">Interview tip:</span> Always mention microtasks before timeouts.</p>
</div>
            `,
            masteryChecklist: [
                { id: "d34-c1", text: "I can predict output ordering for sync + Promise.then + setTimeout." },
                { id: "d34-c2", text: "I can explain microtasks vs macrotasks using one clear sentence." },
                { id: "d34-c3", text: "I can demonstrate starvation and explain why it happens." },
                { id: "d34-c4", text: "I can safely schedule 'run after current stack' using queueMicrotask (or Promise.then fallback)." },
                { id: "d34-c5", text: "I can explain how race conditions happen when async responses arrive out of order." }
            ],
            predictions: [
                {
                    prompt: "What prints first: Promise.then or setTimeout(0)?",
                    options: ["setTimeout(0)", "Promise.then", "Random", "Depends on browser only"],
                    correctIndex: 1,
                    explanation: "Promise.then queues a microtask which runs before macrotasks like setTimeout."
                },
                {
                    prompt: "If you schedule 1000 microtasks recursively, what might happen to timers?",
                    options: ["Timers run immediately anyway", "Timers may be delayed (starvation)", "Timers are cancelled", "Microtasks become macrotasks"],
                    correctIndex: 1,
                    explanation: "Microtasks run to completion before the event loop moves to timers."
                },
                {
                    prompt: "queueMicrotask is closest to…",
                    options: ["setTimeout(fn, 0)", "Promise.resolve().then(fn)", "requestAnimationFrame(fn)", "setInterval(fn, 0)"],
                    correctIndex: 1,
                    explanation: "Both queue work into the microtask queue."
                }
            ],
            checkpoints: [
                {
                    prompt: "Correct execution order is…",
                    options: ["microtasks -> sync -> macrotasks", "sync -> microtasks -> macrotasks", "macrotasks -> microtasks -> sync", "sync -> macrotasks -> microtasks"],
                    correctIndex: 1,
                    explanation: "Sync first, then microtasks, then macrotasks."
                },
                {
                    prompt: "A classic async bug in UIs is…",
                    options: ["Hoisting", "Out-of-order responses overwriting newer state", "Shadowing", "Call stack overflow from recursion only"],
                    correctIndex: 1,
                    explanation: "If request A finishes after request B, stale A can overwrite B unless you guard/abort."
                },
                {
                    prompt: "Microtasks run…",
                    options: ["One per tick", "Until the microtask queue is empty", "Only on user input", "Only in Node.js"],
                    correctIndex: 1,
                    explanation: "The runtime drains microtasks before moving to the next macrotask."
                }
            ],
            labSteps: [
                {
                    id: "d34-step-1",
                    title: "Predict the order (then confirm)",
                    subtitle: "Sync vs microtask vs macrotask",
                    teacherNote: "Do not run first. Predict first. Then run. Then explain.",
                    bugCode: `console.clear();

console.log("A");
setTimeout(function () { console.log("D"); }, 0);
Promise.resolve().then(function () { console.log("C"); });
console.log("B");`,
                    bugFocus: { fromLine: 2, toLine: 5 },
                    fixCode: `console.clear();

console.log("A");
setTimeout(function () { console.log("D (macrotask)"); }, 0);
Promise.resolve().then(function () { console.log("C (microtask)"); });
console.log("B");

// Expected: A, B, C, D`,
                    fixFocus: { fromLine: 2, toLine: 9 },
                    whatToNotice: [
                        "Promise.then runs before setTimeout.",
                        "Labeling helps your brain build the model."
                    ]
                },
                {
                    id: "d34-step-2",
                    title: "Build a microtask helper (queueMicrotask fallback)",
                    subtitle: "Schedule work after the current stack, before timers",
                    teacherNote: "We implement a tiny helper used in many libraries.",
                    bugCode: `console.clear();

function enqueueMicrotaskBug(fn) {
  setTimeout(fn, 0); // ❌ wrong queue (macrotask)
}

console.log("sync-1");
enqueueMicrotaskBug(function () { console.log("micro?"); });
console.log("sync-2");`,
                    bugFocus: { fromLine: 2, toLine: 10 },
                    fixCode: `console.clear();

function enqueueMicrotask(fn) {
  if (typeof queueMicrotask === "function") return queueMicrotask(fn);
  Promise.resolve().then(fn);
}

console.log("sync-1");
enqueueMicrotask(function () { console.log("micro"); });
console.log("sync-2");

// Expected: sync-1, sync-2, micro`,
                    fixFocus: { fromLine: 2, toLine: 14 },
                    whatToNotice: [
                        "Microtasks run after sync but before timeouts.",
                        "This is the key to correct Promise-like behavior."
                    ]
                },
                {
                    id: "d34-step-3",
                    title: "Starvation demo (and how to yield)",
                    subtitle: "Stop microtasks from blocking timers forever",
                    teacherNote: "This is a real production issue: microtasks can starve rendering/timers.",
                    bugCode: `console.clear();

var count = 0;
setTimeout(function () { console.log("timer fired"); }, 0);

function loopMicrotasks() {
  Promise.resolve().then(function () {
    count++;
    if (count < 5000) loopMicrotasks();
  });
}

loopMicrotasks();
console.log("started");`,
                    bugFocus: { fromLine: 2, toLine: 14 },
                    fixCode: `console.clear();

var count = 0;
setTimeout(function () { console.log("timer fired"); }, 0);

function loopWithYields() {
  Promise.resolve().then(function () {
    count++;
    if (count % 500 === 0) {
      // yield to macrotask queue so timers/rendering can proceed
      return setTimeout(loopWithYields, 0);
    }
    if (count < 5000) loopWithYields();
  });
}

loopWithYields();
console.log("started (with yields)");`,
                    fixFocus: { fromLine: 2, toLine: 20 },
                    whatToNotice: [
                        "Microtasks drain before timers, so endless microtasks can delay timers.",
                        "Occasional yielding gives the event loop a chance to run other work."
                    ]
                }
            ],
            code: `/*
Day 34: Event Loop Deep Dive
Run the labs in order. Keep notes:
1) predict output
2) run
3) explain the rule you used
*/`,
            recap: {
                takeaways: [
                    "Sync -> microtasks -> macrotasks is the foundation.",
                    "Microtasks can starve timers if you schedule too many without yielding.",
                    "Race-condition bugs come from out-of-order async completions."
                ],
                commonMistakes: [
                    "Assuming setTimeout(0) is immediate.",
                    "Assuming Promise.then runs later than timers.",
                    "Not guarding against out-of-order results."
                ],
                nextActions: [
                    "Write 3 more ordering examples and test yourself.",
                    "Use AbortController or request IDs to prevent stale UI updates.",
                    "Practice explaining microtasks in 15 seconds."
                ]
            }
        },
        {
            day: 35,
            title: '🧵 Concurrency Patterns: Limiters, Pools, Cancellation',
            intro: "Real apps must control concurrency. Today you build a limiter and a pool so you can safely run many async tasks without melting the network or UI.",
            content: `
<div class="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-emerald-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-light-300">You will build <span class="text-yellow-300 font-bold">pLimit</span> and <span class="text-yellow-300 font-bold">pMap</span> (concurrency-limited mapping), and add cancellation.</p>
</div>
            `,
            masteryChecklist: [
                { id: "d35-c1", text: "I can explain the difference between parallelism and controlled concurrency." },
                { id: "d35-c2", text: "I can implement a concurrency limiter (pLimit)." },
                { id: "d35-c3", text: "I can implement pMap(items, mapper, { concurrency })." },
                { id: "d35-c4", text: "I can cancel queued work with AbortSignal." },
                { id: "d35-c5", text: "I can explain why Promise.all is dangerous for large task arrays." }
            ],
            predictions: [
                {
                    prompt: "If concurrency is 2 and you have 5 tasks, what is the max number running at once?",
                    options: ["5", "3", "2", "1"],
                    correctIndex: 2,
                    explanation: "Concurrency=2 means at most 2 active tasks."
                },
                {
                    prompt: "Promise.all on 10k requests is risky because…",
                    options: ["It turns async into sync", "It can overwhelm network/server and memory", "It disables caching", "It prevents retries"],
                    correctIndex: 1,
                    explanation: "Unbounded concurrency can overload both client and server."
                },
                {
                    prompt: "If AbortSignal is aborted, queued tasks should…",
                    options: ["Still run", "Throw/cancel and never start", "Restart automatically", "Convert to microtasks"],
                    correctIndex: 1,
                    explanation: "Cancellation should stop queued work and prevent new starts."
                }
            ],
            checkpoints: [
                {
                    prompt: "A limiter usually tracks…",
                    options: ["active count + queue", "only a Set of promises", "only timeouts", "only cache keys"],
                    correctIndex: 0,
                    explanation: "You need to know how many are active and which are waiting."
                },
                {
                    prompt: "The main value of cancellation is…",
                    options: ["Speed", "Correctness + resource savings", "More console logs", "Better minification"],
                    correctIndex: 1,
                    explanation: "It prevents wasted work and stale results."
                },
                {
                    prompt: "pMap differs from Promise.all(mapper(items)) because…",
                    options: ["pMap is synchronous", "pMap limits concurrency", "pMap cannot preserve order", "pMap only works in Node"],
                    correctIndex: 1,
                    explanation: "pMap controls how many mapper calls run at once."
                }
            ],
            labSteps: [
                {
                    id: "d35-step-1",
                    title: "Problem: Unbounded concurrency",
                    subtitle: "Too many tasks start at once",
                    teacherNote: "We simulate tasks with timeouts so you can see active counts.",
                    bugCode: `console.clear();

function task(id, ms) {
  return new Promise(function (resolve) {
    console.log("start", id);
    setTimeout(function () {
      console.log("done", id);
      resolve(id);
    }, ms);
  });
}

var tasks = [];
for (var i = 1; i <= 6; i++) tasks.push(function () { return task(i, 200); });

// ❌ Bug: starts everything immediately
Promise.all(tasks.map(function (fn) { return fn(); })).then(function (r) {
  console.log("all done", r);
});`,
                    bugFocus: { fromLine: 2, toLine: 20 },
                    fixCode: `console.clear();

function createLimiter(concurrency) {
  var active = 0;
  var queue = [];

  function next() {
    if (active >= concurrency) return;
    var item = queue.shift();
    if (!item) return;
    active++;
    item()
      .then(function (v) { active--; next(); return v; })
      .catch(function (e) { active--; next(); throw e; });
  }

  return function limit(fn) {
    return new Promise(function (resolve, reject) {
      queue.push(function () {
        return fn().then(resolve, reject);
      });
      next();
    });
  };
}

function task(id, ms) {
  return new Promise(function (resolve) {
    console.log("start", id);
    setTimeout(function () { console.log("done", id); resolve(id); }, ms);
  });
}

var limit = createLimiter(2);
var fns = [];
for (var i = 1; i <= 6; i++) {
  (function (iCopy) {
    fns.push(function () { return limit(function () { return task(iCopy, 200); }); });
  })(i);
}

Promise.all(fns.map(function (run) { return run(); })).then(function (r) {
  console.log("all done", r);
});`,
                    fixFocus: { fromLine: 2, toLine: 42 },
                    whatToNotice: [
                        "Only 2 tasks run at a time.",
                        "Queue + active count is the core pattern."
                    ]
                },
                {
                    id: "d35-step-2",
                    title: "Build pMap with concurrency",
                    subtitle: "Map items with a limiter and preserve output order",
                    teacherNote: "This is one of the most useful utilities you can write.",
                    bugCode: `console.clear();

function pMapBug(items, mapper) {
  return Promise.all(items.map(mapper)); // ❌ unbounded
}`,
                    bugFocus: { fromLine: 2, toLine: 4 },
                    fixCode: `console.clear();

function createLimiter(concurrency) {
  var active = 0;
  var queue = [];
  function next() {
    if (active >= concurrency) return;
    var item = queue.shift();
    if (!item) return;
    active++;
    item().finally(function () { active--; next(); });
  }
  return function limit(fn) {
    return new Promise(function (resolve, reject) {
      queue.push(function () { return fn().then(resolve, reject); });
      next();
    });
  };
}

function pMap(items, mapper, opts) {
  var concurrency = (opts && opts.concurrency) || 2;
  var limit = createLimiter(concurrency);
  var results = new Array(items.length);
  var runs = items.map(function (item, idx) {
    return limit(function () {
      return Promise.resolve().then(function () { return mapper(item, idx); }).then(function (v) {
        results[idx] = v;
      });
    });
  });
  return Promise.all(runs).then(function () { return results; });
}

function task(id) {
  return new Promise(function (resolve) {
    var ms = 50 + Math.floor(Math.random() * 200);
    setTimeout(function () { resolve("done:" + id + ":" + ms); }, ms);
  });
}

pMap([1, 2, 3, 4, 5], task, { concurrency: 2 }).then(function (r) {
  console.log("results (ordered):", r);
});`,
                    fixFocus: { fromLine: 2, toLine: 43 },
                    whatToNotice: [
                        "Results stay in input order even though tasks finish randomly.",
                        "Limiter protects your app from spikes."
                    ]
                },
                {
                    id: "d35-step-3",
                    title: "Add cancellation for queued tasks",
                    subtitle: "Stop starting new work after abort",
                    teacherNote: "Cancellation is a correctness tool, not just a perf trick.",
                    bugCode: `console.clear();

// ❌ Bug: ignores signal, queued work still starts
function pMapNoCancel(items, mapper, opts) {
  return Promise.all(items.map(mapper));
}`,
                    bugFocus: { fromLine: 2, toLine: 6 },
                    fixCode: `console.clear();

function createLimiter(concurrency) {
  var active = 0;
  var queue = [];
  function next() {
    if (active >= concurrency) return;
    var item = queue.shift();
    if (!item) return;
    active++;
    item().finally(function () { active--; next(); });
  }
  return {
    schedule: function (fn) {
      return new Promise(function (resolve, reject) {
        queue.push(function () { return fn().then(resolve, reject); });
        next();
      });
    },
    clearQueue: function () { queue = []; }
  };
}

function pMap(items, mapper, opts) {
  var concurrency = (opts && opts.concurrency) || 2;
  var signal = opts && opts.signal;
  var lim = createLimiter(concurrency);
  var results = new Array(items.length);

  function guard() {
    if (signal && signal.aborted) throw new Error("aborted");
  }

  var runs = items.map(function (item, idx) {
    return lim.schedule(function () {
      guard();
      return Promise.resolve().then(function () { return mapper(item, idx); }).then(function (v) {
        results[idx] = v;
      });
    });
  });

  if (signal) {
    signal.addEventListener("abort", function () {
      lim.clearQueue();
    }, { once: true });
  }

  return Promise.all(runs).then(function () { return results; });
}

function slowTask(id) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve("ok:" + id); }, 200);
  });
}

var controller = new AbortController();
pMap([1, 2, 3, 4, 5], slowTask, { concurrency: 2, signal: controller.signal })
  .then(function (r) { console.log("done:", r); })
  .catch(function (e) { console.log("error:", e.message); });

setTimeout(function () { controller.abort(); }, 250);`,
                    fixFocus: { fromLine: 2, toLine: 58 },
                    whatToNotice: [
                        "Already-running tasks may finish; queued tasks should not start after abort.",
                        "This matches real UX: user navigates away, work stops."
                    ]
                }
            ],
            code: `/*
Day 35: Concurrency Patterns
Goal: build pLimit and pMap, then add cancellation.
Do the lab steps in order.
*/`,
            recap: {
                takeaways: [
                    "Limiters control how many async tasks run at once.",
                    "pMap is just mapping + limiter + ordered results.",
                    "Cancellation prevents wasted work and stale state."
                ],
                commonMistakes: [
                    "Starting too much work at once (Promise.all on huge arrays).",
                    "Not preserving output order when needed.",
                    "Ignoring AbortSignal and continuing to run queued work."
                ],
                nextActions: [
                    "Use pMap for image uploads or API fan-out calls.",
                    "Add timeouts to tasks and treat them as failures.",
                    "Decide: should abort cancel running work or only queued work?"
                ]
            }
        },
        {
            day: 36,
            title: '🌊 Async Iterators & Streams: for-await, async generators, pipelines',
            intro: "Async iterators let you consume data over time (pages, events, streams) with clean code. Today you build small async generators and utilities to process them.",
            content: `
<div class="bg-gradient-to-r from-cyan-500/20 to-sky-500/20 border border-cyan-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-cyan-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-light-300">You will write an <span class="text-yellow-300 font-bold">async generator</span>, process it with <span class="text-yellow-300 font-bold">for-await</span>, and build an <span class="text-yellow-300 font-bold">asyncMap</span> pipeline.</p>
</div>
            `,
            masteryChecklist: [
                { id: "d36-c1", text: "I can explain what an async iterator produces over time (values + promises)." },
                { id: "d36-c2", text: "I can write an async generator that yields values with delays." },
                { id: "d36-c3", text: "I can consume an async iterator using for-await." },
                { id: "d36-c4", text: "I can build asyncMap(asyncIterable, mapper)." },
                { id: "d36-c5", text: "I can use async generators for pagination (yield pages)." }
            ],
            predictions: [
                {
                    prompt: "for-await-of is used for…",
                    options: ["Arrays only", "Async iterables that yield values over time", "Objects only", "Promises only"],
                    correctIndex: 1,
                    explanation: "It consumes async iterables (including async generators)."
                },
                {
                    prompt: "An async generator function is declared with…",
                    options: ["function*()", "async function()", "async function*()", "function async*()"],
                    correctIndex: 2,
                    explanation: "async function* creates an async generator."
                },
                {
                    prompt: "Why are async iterators useful for pagination?",
                    options: ["They remove the need for HTTP", "They let you model pages as a stream you consume sequentially", "They make queries synchronous", "They replace caching"],
                    correctIndex: 1,
                    explanation: "You can yield each page and process it as it arrives."
                }
            ],
            checkpoints: [
                {
                    prompt: "An async iterator must implement…",
                    options: ["toString", "Symbol.asyncIterator", "Symbol.iterator only", "valueOf"],
                    correctIndex: 1,
                    explanation: "Async iterables expose Symbol.asyncIterator."
                },
                {
                    prompt: "A generator yields values via…",
                    options: ["return", "yield", "await", "throw"],
                    correctIndex: 1,
                    explanation: "yield produces values one at a time."
                },
                {
                    prompt: "In a streaming pipeline, you often prefer…",
                    options: ["Loading everything then processing", "Processing items as they arrive", "Blocking the main thread", "Infinite recursion"],
                    correctIndex: 1,
                    explanation: "Streaming reduces memory and improves responsiveness."
                }
            ],
            labSteps: [
                {
                    id: "d36-step-1",
                    title: "Write your first async generator",
                    subtitle: "Yield values over time",
                    teacherNote: "We start tiny: yield 3 values with delays.",
                    bugCode: `console.clear();

// ❌ Bug: this returns once, it does not stream values
async function numbersBug() {
  return [1, 2, 3];
}

(async function () {
  var out = await numbersBug();
  console.log("got:", out);
})();`,
                    bugFocus: { fromLine: 2, toLine: 12 },
                    fixCode: `console.clear();

function sleep(ms) {
  return new Promise(function (r) { setTimeout(r, ms); });
}

async function* numbers() {
  yield 1;
  await sleep(100);
  yield 2;
  await sleep(100);
  yield 3;
}

(async function () {
  for await (var n of numbers()) {
    console.log("stream:", n);
  }
})();`,
                    fixFocus: { fromLine: 2, toLine: 22 },
                    whatToNotice: [
                        "You can produce values over time with yield + await.",
                        "for-await consumes the stream sequentially."
                    ]
                },
                {
                    id: "d36-step-2",
                    title: "Build asyncMap for async iterables",
                    subtitle: "Transform stream items one by one",
                    teacherNote: "This is the async version of Array.map, but streaming.",
                    bugCode: `console.clear();

// ❌ Bug: map expects arrays; async iterables are different
function asyncMapBug(iterable, mapper) {
  return iterable.map(mapper);
}`,
                    bugFocus: { fromLine: 2, toLine: 6 },
                    fixCode: `console.clear();

async function* asyncMap(iterable, mapper) {
  var idx = 0;
  for await (var item of iterable) {
    yield mapper(item, idx++);
  }
}

async function* numbers() {
  yield 1; yield 2; yield 3;
}

(async function () {
  for await (var x of asyncMap(numbers(), function (n) { return n * 10; })) {
    console.log("mapped:", x);
  }
})();`,
                    fixFocus: { fromLine: 2, toLine: 20 },
                    whatToNotice: [
                        "asyncMap yields transformed values as they come.",
                        "No need to buffer the whole list."
                    ]
                },
                {
                    id: "d36-step-3",
                    title: "Pagination as a stream",
                    subtitle: "Yield pages, then yield items",
                    teacherNote: "This is a powerful pattern for data fetching layers.",
                    bugCode: `console.clear();

// ❌ Bug: loads all pages first, then processes
function fetchAllPagesBug() {
  return Promise.resolve([[1, 2], [3, 4]]);
}`,
                    bugFocus: { fromLine: 2, toLine: 6 },
                    fixCode: `console.clear();

function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

async function* pages() {
  // fake pages arriving over time
  await sleep(50);
  yield [1, 2];
  await sleep(50);
  yield [3, 4];
}

async function* itemsFromPages(pageStream) {
  for await (var page of pageStream) {
    for (var i = 0; i < page.length; i++) yield page[i];
  }
}

(async function () {
  for await (var x of itemsFromPages(pages())) {
    console.log("item:", x);
  }
})();`,
                    fixFocus: { fromLine: 2, toLine: 28 },
                    whatToNotice: [
                        "You can process as data arrives (lower memory, better responsiveness).",
                        "This is a clean mental model for pagination and streams."
                    ]
                }
            ],
            code: `/*
Day 36: Async Iterators & Streams
Do labs in order. Focus on the mental model: values over time.
*/`,
            recap: {
                takeaways: [
                    "Async generators let you produce values over time.",
                    "for-await makes consuming streams readable.",
                    "Streaming pipelines avoid buffering everything."
                ],
                commonMistakes: [
                    "Treating async iterables like arrays.",
                    "Forgetting to wrap for-await in an async function.",
                    "Buffering everything when streaming would be simpler."
                ],
                nextActions: [
                    "Build asyncFilter similar to asyncMap.",
                    "Stream paginated results into a UI list.",
                    "Combine pMap (Day 35) with streams carefully (backpressure)."
                ]
            }
        },
        {
            day: 37,
            title: '⏱️ Cooperative Scheduler: Priority Queue + Time Slicing',
            intro: "Big tasks can freeze UIs. Today you build a tiny scheduler: tasks have priorities, can be cancelled, and yield so the app stays responsive.",
            content: `
<div class="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-violet-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-light-300">You will build a <span class="text-yellow-300 font-bold">priority queue</span> and a <span class="text-yellow-300 font-bold">scheduler</span> that runs work in small chunks.</p>
</div>
            `,
            masteryChecklist: [
                { id: "d37-c1", text: "I can explain why long tasks freeze the UI (main thread blocking)." },
                { id: "d37-c2", text: "I can implement a simple priority queue (min-heap)." },
                { id: "d37-c3", text: "I can schedule work with priorities (higher priority runs first)." },
                { id: "d37-c4", text: "I can time-slice work and yield with setTimeout to avoid blocking." },
                { id: "d37-c5", text: "I can cancel scheduled tasks." }
            ],
            predictions: [
                {
                    prompt: "If a task runs 200ms on the main thread, what happens to clicks/scroll during that time?",
                    options: ["They run normally", "They are delayed until the task finishes", "They run in parallel", "They are cancelled"],
                    correctIndex: 1,
                    explanation: "The main thread is blocked; input and rendering wait."
                },
                {
                    prompt: "A priority queue helps by…",
                    options: ["Making code synchronous", "Choosing which task runs next efficiently", "Eliminating bugs", "Avoiding garbage collection"],
                    correctIndex: 1,
                    explanation: "A heap gives fast insert + pop of highest/lowest priority."
                },
                {
                    prompt: "Time slicing is…",
                    options: ["Running all tasks at once", "Breaking work into chunks and yielding between them", "A CSS technique", "A Node-only concept"],
                    correctIndex: 1,
                    explanation: "Chunking prevents long blocks and keeps UI responsive."
                }
            ],
            checkpoints: [
                {
                    prompt: "A min-heap pop returns…",
                    options: ["largest priority", "smallest priority", "random element", "last inserted element"],
                    correctIndex: 1,
                    explanation: "Min-heap returns smallest key first."
                },
                {
                    prompt: "Yielding with setTimeout(0) does what?",
                    options: ["Queues a microtask", "Queues a macrotask, letting other work run", "Blocks the thread", "Cancels tasks"],
                    correctIndex: 1,
                    explanation: "It schedules work later as a macrotask."
                },
                {
                    prompt: "Cancellation should…",
                    options: ["Only log", "Prevent execution of a task if it hasn't run yet", "Restart tasks", "Increase priority"],
                    correctIndex: 1,
                    explanation: "A cancelled task should not run."
                }
            ],
            labSteps: [
                {
                    id: "d37-step-1",
                    title: "Build a tiny min-heap",
                    subtitle: "push + pop",
                    teacherNote: "We keep it minimal: only what the scheduler needs.",
                    bugCode: `console.clear();

// ❌ Bug: using array sort every time is slow for many tasks
var q = [];
function pushBug(item) { q.push(item); q.sort(function (a, b) { return a.p - b.p; }); }
function popBug() { return q.shift(); }`,
                    bugFocus: { fromLine: 2, toLine: 6 },
                    fixCode: `console.clear();

function MinHeap() { this.a = []; }
MinHeap.prototype.push = function (x) {
  var a = this.a;
  a.push(x);
  var i = a.length - 1;
  while (i > 0) {
    var p = Math.floor((i - 1) / 2);
    if (a[p].p <= a[i].p) break;
    var tmp = a[p]; a[p] = a[i]; a[i] = tmp;
    i = p;
  }
};
MinHeap.prototype.pop = function () {
  var a = this.a;
  if (a.length === 0) return null;
  var root = a[0];
  var last = a.pop();
  if (a.length > 0) {
    a[0] = last;
    var i = 0;
    while (true) {
      var l = i * 2 + 1, r = i * 2 + 2, s = i;
      if (l < a.length && a[l].p < a[s].p) s = l;
      if (r < a.length && a[r].p < a[s].p) s = r;
      if (s === i) break;
      var tmp = a[s]; a[s] = a[i]; a[i] = tmp;
      i = s;
    }
  }
  return root;
};

var h = new MinHeap();
h.push({ p: 3, name: "low" });
h.push({ p: 1, name: "high" });
h.push({ p: 2, name: "mid" });
console.log(h.pop().name, h.pop().name, h.pop().name);`,
                    fixFocus: { fromLine: 2, toLine: 44 },
                    whatToNotice: [
                        "Heap gives fast push/pop without sorting the whole list each time.",
                        "We use p as the priority key (smaller = higher priority)."
                    ]
                },
                {
                    id: "d37-step-2",
                    title: "Build a cooperative scheduler",
                    subtitle: "Run tasks in slices and yield",
                    teacherNote: "We simulate heavy work with loops, and yield to keep the event loop alive.",
                    bugCode: `console.clear();

// ❌ Bug: one long task blocks everything
function heavy(ms) {
  var end = performance.now() + ms;
  while (performance.now() < end) {}
}

console.log("start");
heavy(150);
setTimeout(function () { console.log("timer"); }, 0);
console.log("end");`,
                    bugFocus: { fromLine: 2, toLine: 11 },
                    fixCode: `console.clear();

function heavyChunk(ms) {
  var end = performance.now() + ms;
  while (performance.now() < end) {}
}

function runInChunks(totalMs, chunkMs, done) {
  var remaining = totalMs;
  function step() {
    var ms = Math.min(chunkMs, remaining);
    heavyChunk(ms);
    remaining -= ms;
    if (remaining <= 0) return done();
    setTimeout(step, 0); // yield
  }
  step();
}

console.log("start");
setTimeout(function () { console.log("timer"); }, 0);
runInChunks(150, 15, function () { console.log("end"); });`,
                    fixFocus: { fromLine: 2, toLine: 26 },
                    whatToNotice: [
                        "Yielding lets timers/input run between chunks.",
                        "This is the simplest form of cooperative scheduling."
                    ]
                },
                {
                    id: "d37-step-3",
                    title: "Add priorities + cancellation",
                    subtitle: "Schedule tasks, cancel by id",
                    teacherNote: "Now we combine heap + cooperative chunks into a mini scheduler.",
                    bugCode: `console.clear();

// ❌ Bug: no priorities, no cancellation
function scheduleBug(fn) { setTimeout(fn, 0); }`,
                    bugFocus: { fromLine: 2, toLine: 4 },
                    fixCode: `console.clear();

function MinHeap() { this.a = []; }
MinHeap.prototype.push = function (x) {
  var a = this.a; a.push(x);
  var i = a.length - 1;
  while (i > 0) {
    var p = Math.floor((i - 1) / 2);
    if (a[p].p <= a[i].p) break;
    var t = a[p]; a[p] = a[i]; a[i] = t; i = p;
  }
};
MinHeap.prototype.pop = function () {
  var a = this.a; if (!a.length) return null;
  var root = a[0]; var last = a.pop();
  if (a.length) {
    a[0] = last; var i = 0;
    while (true) {
      var l = i * 2 + 1, r = i * 2 + 2, s = i;
      if (l < a.length && a[l].p < a[s].p) s = l;
      if (r < a.length && a[r].p < a[s].p) s = r;
      if (s === i) break;
      var t = a[s]; a[s] = a[i]; a[i] = t; i = s;
    }
  }
  return root;
};

function createScheduler() {
  var heap = new MinHeap();
  var cancelled = new Set();
  var running = false;
  var idSeq = 1;

  function pump() {
    if (running) return;
    running = true;
    (function loop() {
      var job = heap.pop();
      if (!job) { running = false; return; }
      if (cancelled.has(job.id)) return setTimeout(loop, 0);
      job.fn();
      setTimeout(loop, 0); // yield between tasks
    })();
  }

  return {
    schedule: function (fn, priority) {
      var id = idSeq++;
      heap.push({ id: id, fn: fn, p: priority || 10 });
      pump();
      return id;
    },
    cancel: function (id) { cancelled.add(id); }
  };
}

var s = createScheduler();
s.schedule(function () { console.log("low"); }, 5);
var id = s.schedule(function () { console.log("cancel-me"); }, 1);
s.cancel(id);
s.schedule(function () { console.log("high"); }, 0);`,
                    fixFocus: { fromLine: 2, toLine: 62 },
                    whatToNotice: [
                        "Priorities decide what runs next.",
                        "Cancellation prevents execution of a queued task."
                    ]
                }
            ],
            code: `/*
Day 37: Cooperative Scheduler
Do labs in order: heap -> chunking -> priorities+cancellation.
*/`,
            recap: {
                takeaways: [
                    "Heaps are a practical tool for prioritization.",
                    "Chunking + yielding prevents UI freezes.",
                    "Schedulers are mini systems: queue, policy, cancellation, yielding."
                ],
                commonMistakes: [
                    "Running long loops without yielding.",
                    "Using array sort in hot paths.",
                    "Forgetting to handle cancellation."
                ],
                nextActions: [
                    "Add a max tasks per tick to pump().",
                    "Add a deadline/timeSliceMs parameter.",
                    "Try integrating scheduler with a fake render loop."
                ]
            }
        },
        {
            day: 38,
            title: '🧠 Data Fetching Layer: Cache, Deduping, Stale-While-Revalidate',
            intro: "Now you build a tiny data fetching layer like React Query/SWR at a beginner-friendly scale: cache + in-flight dedupe + SWR. Step-by-step.",
            content: `
<div class="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-amber-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-light-300">You will build <span class="text-yellow-300 font-bold">createQueryClient</span> with TTL cache, in-flight dedupe, and SWR-style refresh.</p>
</div>
            `,
            masteryChecklist: [
                { id: "d38-c1", text: "I can explain why caching improves UX (speed) and cost (fewer requests)." },
                { id: "d38-c2", text: "I can implement a TTL cache for query results." },
                { id: "d38-c3", text: "I can dedupe in-flight requests so only one network call happens per key." },
                { id: "d38-c4", text: "I can implement stale-while-revalidate: serve cached then refresh in background." },
                { id: "d38-c5", text: "I can explain the tradeoff between freshness and speed." }
            ],
            predictions: [
                {
                    prompt: "In-flight deduping means…",
                    options: ["Never fetch again", "Multiple callers share the same promise for the same key", "Requests become synchronous", "Requests are cancelled"],
                    correctIndex: 1,
                    explanation: "If two callers ask for the same key, they should share a single in-flight request."
                },
                {
                    prompt: "SWR returns cached data immediately and then…",
                    options: ["Stops", "Revalidates in the background", "Deletes the cache", "Blocks UI until server returns"],
                    correctIndex: 1,
                    explanation: "It refreshes data in the background."
                },
                {
                    prompt: "TTL cache entry expires when…",
                    options: ["User refreshes", "The time since write exceeds TTL", "Server changes", "Promise resolves"],
                    correctIndex: 1,
                    explanation: "TTL is a time-based expiry policy."
                }
            ],
            checkpoints: [
                {
                    prompt: "The main benefit of deduping is…",
                    options: ["Better CSS", "Less duplicated network work and consistent results", "Faster garbage collection", "More CPU usage"],
                    correctIndex: 1,
                    explanation: "One request instead of many reduces load and avoids inconsistent data races."
                },
                {
                    prompt: "SWR is best when…",
                    options: ["You need perfect freshness always", "You want fast UI but can tolerate slightly stale data briefly", "You never cache anything", "You only do writes"],
                    correctIndex: 1,
                    explanation: "SWR is a speed-first strategy with background freshness."
                },
                {
                    prompt: "A query key should be…",
                    options: ["Random", "Stable and deterministic for the request", "A DOM node", "A function"],
                    correctIndex: 1,
                    explanation: "Cache correctness depends on stable keys."
                }
            ],
            labSteps: [
                {
                    id: "d38-step-1",
                    title: "TTL cache (the simplest useful cache)",
                    subtitle: "Store value + timestamp; return if fresh",
                    teacherNote: "We start small: cache.get(key) returns data if not expired.",
                    bugCode: `console.clear();

// ❌ Bug: no cache, always calls API
function fakeApi(key) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve("data:" + key + ":" + Date.now()); }, 50);
  });
}

fakeApi("user:1").then(console.log);
setTimeout(function () { fakeApi("user:1").then(console.log); }, 80);`,
                    bugFocus: { fromLine: 2, toLine: 12 },
                    fixCode: `console.clear();

function fakeApi(key) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve("data:" + key + ":" + Date.now()); }, 50);
  });
}

function createTTLCache(ttlMs) {
  var map = new Map();
  return {
    get: function (key) {
      var entry = map.get(key);
      if (!entry) return undefined;
      if (Date.now() - entry.t > ttlMs) { map.delete(key); return undefined; }
      return entry.v;
    },
    set: function (key, value) { map.set(key, { v: value, t: Date.now() }); }
  };
}

var cache = createTTLCache(200);
function query(key) {
  var cached = cache.get(key);
  if (cached) return Promise.resolve(cached);
  return fakeApi(key).then(function (v) { cache.set(key, v); return v; });
}

query("user:1").then(function (v) { console.log("first", v); });
setTimeout(function () { query("user:1").then(function (v) { console.log("cached", v); }); }, 80);`,
                    fixFocus: { fromLine: 2, toLine: 33 },
                    whatToNotice: [
                        "Second call returns cached value quickly.",
                        "TTL bounds staleness."
                    ]
                },
                {
                    id: "d38-step-2",
                    title: "Deduplicate in-flight requests",
                    subtitle: "Two callers should share the same promise",
                    teacherNote: "This prevents request storms when multiple components mount.",
                    bugCode: `console.clear();

function fakeApi(key) {
  return new Promise(function (resolve) {
    console.log("NETWORK for", key);
    setTimeout(function () { resolve("data:" + key); }, 80);
  });
}

// ❌ Bug: two calls trigger two networks
fakeApi("user:1").then(console.log);
fakeApi("user:1").then(console.log);`,
                    bugFocus: { fromLine: 2, toLine: 12 },
                    fixCode: `console.clear();

function fakeApi(key) {
  return new Promise(function (resolve) {
    console.log("NETWORK for", key);
    setTimeout(function () { resolve("data:" + key); }, 80);
  });
}

function createClient() {
  var inflight = new Map();
  return {
    fetch: function (key, fn) {
      if (inflight.has(key)) return inflight.get(key);
      var p = fn().finally(function () { inflight.delete(key); });
      inflight.set(key, p);
      return p;
    }
  };
}

var client = createClient();
client.fetch("user:1", function () { return fakeApi("user:1"); }).then(function (v) { console.log("a", v); });
client.fetch("user:1", function () { return fakeApi("user:1"); }).then(function (v) { console.log("b", v); });`,
                    fixFocus: { fromLine: 2, toLine: 26 },
                    whatToNotice: [
                        "Only one NETWORK log happens.",
                        "Both callers get the same resolved value."
                    ]
                },
                {
                    id: "d38-step-3",
                    title: "Stale-while-revalidate (SWR) mini-version",
                    subtitle: "Serve cache now, refresh in background",
                    teacherNote: "This is the core UX trick behind many modern apps.",
                    bugCode: `console.clear();

// ❌ Bug: always blocks on network
function fakeApi(key) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve("fresh:" + key + ":" + Date.now()); }, 120);
  });
}`,
                    bugFocus: { fromLine: 2, toLine: 7 },
                    fixCode: `console.clear();

function fakeApi(key) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve("fresh:" + key + ":" + Date.now()); }, 120);
  });
}

function createQueryClient(ttlMs) {
  var cache = new Map();
  var inflight = new Map();

  function getCached(key) {
    var e = cache.get(key);
    if (!e) return undefined;
    if (Date.now() - e.t > ttlMs) return undefined;
    return e.v;
  }

  function setCached(key, v) { cache.set(key, { v: v, t: Date.now() }); }

  function deduped(key, fn) {
    if (inflight.has(key)) return inflight.get(key);
    var p = fn().then(function (v) { setCached(key, v); return v; }).finally(function () { inflight.delete(key); });
    inflight.set(key, p);
    return p;
  }

  return {
    querySWR: function (key, fn, onUpdate) {
      var cached = getCached(key);
      if (cached !== undefined) {
        // fire and forget refresh
        deduped(key, fn).then(function (fresh) { onUpdate && onUpdate(fresh); });
        return Promise.resolve({ data: cached, fromCache: true });
      }
      return deduped(key, fn).then(function (fresh) { return { data: fresh, fromCache: false }; });
    }
  };
}

var qc = createQueryClient(5000);
qc.querySWR("k1", function () { return fakeApi("k1"); }, function (fresh) {
  console.log("updated in background:", fresh);
}).then(function (res) { console.log("first:", res); });

setTimeout(function () {
  qc.querySWR("k1", function () { return fakeApi("k1"); }, function (fresh) {
    console.log("updated in background:", fresh);
  }).then(function (res) { console.log("second:", res); });
}, 300);`,
                    fixFocus: { fromLine: 2, toLine: 62 },
                    whatToNotice: [
                        "Second call returns cached data immediately.",
                        "Then you get a background update."
                    ]
                }
            ],
            code: `/*
Day 38: Data Fetching Layer
Do labs in order: TTL cache -> inflight dedupe -> SWR.
*/`,
            recap: {
                takeaways: [
                    "TTL cache improves speed and reduces cost.",
                    "In-flight dedupe prevents request storms.",
                    "SWR makes UIs feel instant while staying fresh."
                ],
                commonMistakes: [
                    "Using unstable keys (cache misses or wrong hits).",
                    "Not clearing inflight map on errors (stuck promises).",
                    "Serving stale forever without revalidation."
                ],
                nextActions: [
                    "Add retry with backoff to deduped().",
                    "Add an invalidate(key) method.",
                    "Add a max cache size (LRU) like Day 26."
                ]
            }
        },
        {
            day: 39,
            title: '📦 State Store + Pub-Sub: Redux-lite with Selectors',
            intro: "You will build a tiny state store: subscribe, setState, and selectors. This teaches the core patterns behind Redux, Zustand, and many pub-sub architectures.",
            content: `
<div class="bg-gradient-to-r from-lime-500/20 to-emerald-500/20 border border-lime-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-lime-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-light-300">You will build <span class="text-yellow-300 font-bold">createStore</span> with subscribe/unsubscribe and selector subscriptions (only re-run when selected state changes).</p>
</div>
            `,
            masteryChecklist: [
                { id: "d39-c1", text: "I can explain pub-sub in plain language." },
                { id: "d39-c2", text: "I can implement subscribe/unsubscribe safely." },
                { id: "d39-c3", text: "I can build createStore(getState, setState, subscribe)." },
                { id: "d39-c4", text: "I can add selectors with shallow equality to prevent unnecessary updates." },
                { id: "d39-c5", text: "I can explain why state normalization and immutability help." }
            ],
            predictions: [
                {
                    prompt: "In pub-sub, emit/notify should usually…",
                    options: ["Iterate the live listeners array directly", "Snapshot listeners before iterating", "Delete listeners while iterating", "Require React"],
                    correctIndex: 1,
                    explanation: "Snapshot avoids issues when listeners unsubscribe during emit."
                },
                {
                    prompt: "A selector subscription helps by…",
                    options: ["Making state mutable", "Notifying only when the selected slice changes", "Making all updates global", "Disabling renders"],
                    correctIndex: 1,
                    explanation: "It reduces unnecessary work."
                },
                {
                    prompt: "Immutable updates are helpful because…",
                    options: ["They are always faster", "They make change detection simple (reference equality)", "They prevent network requests", "They remove async bugs"],
                    correctIndex: 1,
                    explanation: "If references change only when data changes, comparing is easy."
                }
            ],
            checkpoints: [
                {
                    prompt: "The minimal store API is…",
                    options: ["dispatch only", "getState + setState + subscribe", "render + useEffect", "HTTP + WebSocket"],
                    correctIndex: 1,
                    explanation: "Those three form the core."
                },
                {
                    prompt: "Why snapshot listeners?",
                    options: ["For aesthetics", "So subscribe/unsubscribe during emit does not break iteration", "To reduce memory", "To improve CSS"],
                    correctIndex: 1,
                    explanation: "It makes emit deterministic."
                },
                {
                    prompt: "shallowEqual compares…",
                    options: ["Nested deep structures", "Top-level keys/values only", "Only arrays", "Only functions"],
                    correctIndex: 1,
                    explanation: "Shallow equality is cheap and often good enough for selectors."
                }
            ],
            labSteps: [
                {
                    id: "d39-step-1",
                    title: "Build a safe pub-sub (snapshot listeners)",
                    subtitle: "on/off/emit minimal",
                    teacherNote: "We keep it tiny and correct before adding the store.",
                    bugCode: `console.clear();

function createEmitterBug() {
  var listeners = [];
  return {
    on: function (fn) { listeners.push(fn); },
    off: function (fn) { listeners = listeners.filter(function (x) { return x !== fn; }); },
    emit: function (v) { listeners.forEach(function (fn) { fn(v); }); } // ❌ iterating live array
  };
}`,
                    bugFocus: { fromLine: 2, toLine: 9 },
                    fixCode: `console.clear();

function createEmitter() {
  var listeners = [];
  return {
    on: function (fn) { listeners.push(fn); return function () { this.off(fn); }.bind(this); },
    off: function (fn) { listeners = listeners.filter(function (x) { return x !== fn; }); },
    emit: function (v) {
      var snap = listeners.slice();
      for (var i = 0; i < snap.length; i++) snap[i](v);
    }
  };
}

var e = createEmitter();
var unsub = e.on(function (v) { console.log("a", v); unsub(); });
e.on(function (v) { console.log("b", v); });
e.emit(1);
e.emit(2);`,
                    fixFocus: { fromLine: 2, toLine: 22 },
                    whatToNotice: [
                        "Unsubscribing during emit does not break other listeners.",
                        "Returning unsubscribe is convenient."
                    ]
                },
                {
                    id: "d39-step-2",
                    title: "Create a store on top of pub-sub",
                    subtitle: "getState / setState / subscribe",
                    teacherNote: "This is the core architecture used by many state libraries.",
                    bugCode: `console.clear();

// ❌ Bug: updates do not notify subscribers
function createStoreBug(initial) {
  var state = initial;
  return {
    getState: function () { return state; },
    setState: function (patch) { state = Object.assign({}, state, patch); },
    subscribe: function () { return function () {}; }
  };
}`,
                    bugFocus: { fromLine: 2, toLine: 10 },
                    fixCode: `console.clear();

function createEmitter() {
  var listeners = [];
  return {
    on: function (fn) { listeners.push(fn); return function () { this.off(fn); }.bind(this); },
    off: function (fn) { listeners = listeners.filter(function (x) { return x !== fn; }); },
    emit: function () { var snap = listeners.slice(); for (var i = 0; i < snap.length; i++) snap[i](); }
  };
}

function createStore(initial) {
  var state = initial;
  var e = createEmitter();
  return {
    getState: function () { return state; },
    setState: function (patch) {
      state = Object.assign({}, state, patch);
      e.emit();
    },
    subscribe: function (fn) { return e.on(fn); }
  };
}

var store = createStore({ count: 0, name: "Asha" });
store.subscribe(function () { console.log("changed:", store.getState()); });
store.setState({ count: 1 });
store.setState({ name: "Ravi" });`,
                    fixFocus: { fromLine: 2, toLine: 32 },
                    whatToNotice: [
                        "setState emits after updating state.",
                        "Subscribers can read the new state via getState."
                    ]
                },
                {
                    id: "d39-step-3",
                    title: "Selectors: subscribe only to what you need",
                    subtitle: "Avoid unnecessary updates",
                    teacherNote: "This pattern is how you keep apps fast at scale.",
                    bugCode: `console.clear();

// ❌ Bug: every subscriber runs on every change
// We'll fix by adding subscribeSelector.`,
                    bugFocus: { fromLine: 1, toLine: 3 },
                    fixCode: `console.clear();

function shallowEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (!a || !b) return false;
  var aKeys = Object.keys(a), bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (var i = 0; i < aKeys.length; i++) {
    var k = aKeys[i];
    if (!Object.prototype.hasOwnProperty.call(b, k) || !Object.is(a[k], b[k])) return false;
  }
  return true;
}

function createEmitter() {
  var listeners = [];
  return {
    on: function (fn) { listeners.push(fn); return function () { this.off(fn); }.bind(this); },
    off: function (fn) { listeners = listeners.filter(function (x) { return x !== fn; }); },
    emit: function () { var snap = listeners.slice(); for (var i = 0; i < snap.length; i++) snap[i](); }
  };
}

function createStore(initial) {
  var state = initial;
  var e = createEmitter();
  return {
    getState: function () { return state; },
    setState: function (patch) { state = Object.assign({}, state, patch); e.emit(); },
    subscribe: function (fn) { return e.on(fn); },
    subscribeSelector: function (selector, onChange, eq) {
      var equal = eq || Object.is;
      var prev = selector(state);
      return e.on(function () {
        var next = selector(state);
        if (!equal(prev, next)) { prev = next; onChange(next); }
      });
    }
  };
}

var store = createStore({ user: { name: "Asha", role: "dev" }, count: 0 });
store.subscribeSelector(function (s) { return s.count; }, function (v) { console.log("count changed:", v); });
store.subscribeSelector(function (s) { return s.user; }, function (u) { console.log("user changed:", u); }, shallowEqual);

store.setState({ count: 1 });
store.setState({ user: { name: "Asha", role: "dev" } }); // shallowEqual prevents log
store.setState({ user: { name: "Asha", role: "lead" } });`,
                    fixFocus: { fromLine: 2, toLine: 55 },
                    whatToNotice: [
                        "Selector subscriptions reduce unnecessary updates.",
                        "Equality choice matters (Object.is vs shallowEqual)."
                    ]
                }
            ],
            code: `/*
Day 39: State Store + Pub-Sub
Do labs in order: emitter -> store -> selectors.
*/`,
            recap: {
                takeaways: [
                    "Pub-sub is the backbone of many architectures.",
                    "A store is state + pub-sub + update API.",
                    "Selectors prevent unnecessary work and keep apps responsive."
                ],
                commonMistakes: [
                    "Iterating live listener arrays during emit.",
                    "Mutating nested state and making change detection hard.",
                    "Subscribing to the entire state when you only need a slice."
                ],
                nextActions: [
                    "Add batching: group multiple setState calls into one emit.",
                    "Add middleware: log changes or validate updates.",
                    "Add immutable helpers for nested updates."
                ]
            }
        },
        {
            day: 40,
            title: '🏆 Patterns Toolkit: Middleware Pipeline + Plugins (Final Boss, Step-by-Step)',
            intro: "You now have the building blocks. Today you combine patterns into a tiny framework: middleware pipeline + plugin hooks + safe error handling. This is both interview-worthy and production-relevant.",
            content: `
<div class="bg-gradient-to-r from-rose-500/20 to-red-500/20 border border-rose-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-rose-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-light-300">You will build a <span class="text-yellow-300 font-bold">middleware pipeline</span> (like Koa/Express style) and a <span class="text-yellow-300 font-bold">plugin system</span> (hooks).</p>
</div>
            `,
            masteryChecklist: [
                { id: "d40-c1", text: "I can explain middleware as 'a chain where each step can run before/after next()'." },
                { id: "d40-c2", text: "I can build compose(middlewares) to run them in order." },
                { id: "d40-c3", text: "I can implement a plugin hook system (on(event), emit(event))." },
                { id: "d40-c4", text: "I can handle errors in the pipeline and still produce a safe result." },
                { id: "d40-c5", text: "I can describe how these patterns power routers, loggers, auth, metrics, and caching." }
            ],
            predictions: [
                {
                    prompt: "In middleware, if a middleware calls next() twice, what should happen?",
                    options: ["It should work fine", "It should throw an error", "It should run faster", "It should skip other middleware"],
                    correctIndex: 1,
                    explanation: "Calling next twice usually indicates a bug; good compose() guards against it."
                },
                {
                    prompt: "A plugin system is basically…",
                    options: ["A database", "Pub-sub with named hooks/events", "A CSS framework", "A garbage collector"],
                    correctIndex: 1,
                    explanation: "Plugins attach to hooks/events and run when triggered."
                },
                {
                    prompt: "A good error strategy in pipelines is…",
                    options: ["Ignore errors", "Catch at the top and return a safe error response/object", "Always crash", "Convert errors to strings everywhere"],
                    correctIndex: 1,
                    explanation: "Centralized error handling is predictable and safe."
                }
            ],
            checkpoints: [
                {
                    prompt: "compose(middlewares) returns…",
                    options: ["A number", "A function that runs the chain", "An array", "A Map"],
                    correctIndex: 1,
                    explanation: "compose returns a runner function."
                },
                {
                    prompt: "Plugins help by…",
                    options: ["Reducing modularity", "Extending behavior without editing core logic", "Preventing async", "Removing tests"],
                    correctIndex: 1,
                    explanation: "Hooks let you add features without modifying core."
                },
                {
                    prompt: "The most common middleware use-cases are…",
                    options: ["Sorting arrays", "Logging/auth/metrics/caching", "DOM painting", "Binary encoding"],
                    correctIndex: 1,
                    explanation: "Middleware is ideal for cross-cutting concerns."
                }
            ],
            labSteps: [
                {
                    id: "d40-step-1",
                    title: "Compose middleware (with next() guard)",
                    subtitle: "Build the runner correctly",
                    teacherNote: "We implement compose in a small, readable way.",
                    bugCode: `console.clear();

// ❌ Bug: no guard, next can be called multiple times
function composeBug(middlewares) {
  return function (ctx) {
    var i = 0;
    function next() {
      var fn = middlewares[i++];
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn(ctx, next));
    }
    return next();
  };
}`,
                    bugFocus: { fromLine: 2, toLine: 13 },
                    fixCode: `console.clear();

function compose(middlewares) {
  return function (ctx) {
    var index = -1;
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error("next called multiple times"));
      index = i;
      var fn = middlewares[i];
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn(ctx, function next() { return dispatch(i + 1); }));
    }
    return dispatch(0);
  };
}

var logMw = function (ctx, next) {
  ctx.logs.push("before");
  return next().then(function () { ctx.logs.push("after"); });
};
var addMw = function (ctx, next) {
  ctx.value += 1;
  return next();
};

var run = compose([logMw, addMw]);
var ctx = { value: 0, logs: [] };
run(ctx).then(function () { console.log(ctx); });`,
                    fixFocus: { fromLine: 2, toLine: 34 },
                    whatToNotice: [
                        "Middleware can do work before and after next().",
                        "The guard prevents subtle double-next bugs."
                    ]
                },
                {
                    id: "d40-step-2",
                    title: "Add plugins (hook system)",
                    subtitle: "on(event) and emit(event)",
                    teacherNote: "Plugins let you extend behavior without modifying core.",
                    bugCode: `console.clear();

// ❌ Bug: only supports one listener per event
function createHooksBug() {
  var map = {};
  return {
    on: function (name, fn) { map[name] = fn; },
    emit: function (name, payload) { if (map[name]) map[name](payload); }
  };
}`,
                    bugFocus: { fromLine: 2, toLine: 10 },
                    fixCode: `console.clear();

function createHooks() {
  var map = new Map();
  return {
    on: function (name, fn) {
      var arr = map.get(name) || [];
      arr.push(fn);
      map.set(name, arr);
      return function () {
        var cur = map.get(name) || [];
        map.set(name, cur.filter(function (x) { return x !== fn; }));
      };
    },
    emit: function (name, payload) {
      var arr = map.get(name) || [];
      var snap = arr.slice();
      for (var i = 0; i < snap.length; i++) snap[i](payload);
    }
  };
}

var hooks = createHooks();
hooks.on("request:start", function (p) { console.log("start", p); });
hooks.on("request:start", function (p) { console.log("metrics", p.id); });
hooks.emit("request:start", { id: 1 });`,
                    fixFocus: { fromLine: 2, toLine: 31 },
                    whatToNotice: [
                        "Multiple listeners per hook are supported.",
                        "Snapshot keeps emit deterministic."
                    ]
                },
                {
                    id: "d40-step-3",
                    title: "Combine: app runner with middleware + hooks + error handling",
                    subtitle: "A tiny framework",
                    teacherNote: "This is the final integration: modular, testable, extensible.",
                    bugCode: `console.clear();

// ❌ Bug: no error handling and no extension points
function createAppBug() {
  return { run: function () { throw new Error("boom"); } };
}`,
                    bugFocus: { fromLine: 2, toLine: 6 },
                    fixCode: `console.clear();

function createHooks() {
  var map = new Map();
  return {
    on: function (name, fn) {
      var arr = map.get(name) || [];
      arr.push(fn);
      map.set(name, arr);
      return function () { map.set(name, (map.get(name) || []).filter(function (x) { return x !== fn; })); };
    },
    emit: function (name, payload) {
      var arr = map.get(name) || [];
      var snap = arr.slice();
      for (var i = 0; i < snap.length; i++) snap[i](payload);
    }
  };
}

function compose(middlewares) {
  return function (ctx) {
    var index = -1;
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error("next called multiple times"));
      index = i;
      var fn = middlewares[i];
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn(ctx, function () { return dispatch(i + 1); }));
    }
    return dispatch(0);
  };
}

function createApp() {
  var hooks = createHooks();
  var mws = [];
  return {
    use: function (mw) { mws.push(mw); },
    on: hooks.on,
    run: function (ctx) {
      var runner = compose(mws);
      hooks.emit("run:start", ctx);
      return runner(ctx)
        .then(function () { hooks.emit("run:success", ctx); return ctx; })
        .catch(function (err) {
          hooks.emit("run:error", { err: err, ctx: ctx });
          return { ok: false, error: err.message };
        });
    }
  };
}

var app = createApp();
app.on("run:start", function (ctx) { console.log("start", ctx.id); });
app.on("run:error", function (p) { console.log("error", p.err.message); });

app.use(function (ctx, next) {
  ctx.logs.push("mw1");
  return next();
});
app.use(function () { throw new Error("boom"); });

app.run({ id: 1, logs: [] }).then(function (res) { console.log("result:", res); });`,
                    fixFocus: { fromLine: 2, toLine: 74 },
                    whatToNotice: [
                        "Errors are caught and returned as a safe result.",
                        "Hooks allow logging/metrics without editing core runner."
                    ]
                }
            ],
            code: `/*
Day 40: Patterns Toolkit
Do labs in order: compose -> hooks -> combine into createApp().
*/`,
            recap: {
                takeaways: [
                    "Middleware pipelines model cross-cutting concerns cleanly.",
                    "Plugins/hooks enable extension without modifying core code.",
                    "Guardrails (next guard, error boundary) turn patterns into reliable systems."
                ],
                commonMistakes: [
                    "Calling next multiple times.",
                    "Mutating listeners while emitting (no snapshot).",
                    "Letting errors crash without a top-level boundary."
                ],
                nextActions: [
                    "Add a timing middleware and emit duration metrics via hooks.",
                    "Add a caching middleware in front of a fake handler.",
                    "Write one unit test for compose() next-guard behavior."
                ]
            }
        }
    ]
}
}
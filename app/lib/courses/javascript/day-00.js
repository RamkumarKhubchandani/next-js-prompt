export const day00 = {
  day: 0,
  title: "Day 0: Pro Setup + How to Learn JavaScript Like an Engineer",
  intro: "You don’t need a human teacher—you need a system. Today we set up a pro environment, learn the “predict → run → explain” loop, and build the debugging instincts that make the rest of this roadmap feel unfairly easy.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Welcome to Day 0! 🎓 I'm your AI Senior Engineer. Today isn't about code syntax; it's about *how to learn* fast.",
        avatar: "gpt-4-turbo"
      },
      {
        type: "talk",
        message: "The biggest mistake juniors make: they stare at code. Seniors *predict* code. Let's test your intuition right now.",
        delay: 1000
      },
      {
        type: "code",
        code: `console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");`,
        speed: "normal",
        caption: "A classic interview question..."
      },
      {
        type: "ask",
        question: "Which letter prints LAST?",
        options: ["A", "B", "C"],
        correctAnswer: "B",
        feedback: {
          success: "Spot on! Even with 0ms, 'B' goes to the Task Queue and waits for the Stack to empty.",
          error: "Actually, it's 'B'. Even with 0ms, it waits in a queue until the main Sync code (A and C) finishes."
        }
      },
      {
        type: "talk",
        message: "This is the **Event Loop** in action. We'll master this later, but remember: logic always beats memorization."
      },
      {
        type: "talk",
        message: "One more pro tip before you drive. Old JS (`var`) was like the Wild West—you could use variables before you defined them, and they'd just be `undefined`."
      },
      {
        type: "code",
        code: `console.log(myVar); // undefined (No error!)
var myVar = "Ghost";`,
        caption: "Var 'hoisting' allows this. It causes silent bugs.",
        speed: "fast"
      },
      {
        type: "talk",
        message: "Modern JS (`let` and `const`) fixes this with the **Temporal Dead Zone**. If you touch them too early, the app *crashes* to protect you."
      },
      {
        type: "talk",
        message: "Now it's your turn. I've deliberately written a TDZ crash. Use your new knowledge to fix it."
      },
      {
        type: "challenge",
        instruction: "This code crashes because of the Temporal Dead Zone (TDZ). Fix it so it prints 'Dev' without changing 'let' to 'var'.",
        buggyCode: `console.log("User:", name);
let name = "Dev";`,
        solutionCode: `let name = "Dev";
console.log("User:", name); // ✅ Declaration first`,
        verifyOutput: "User: Dev",
        successMessage: "Boom! You nailed it. You cannot access a 'let' variable before it's declared. Scope secured.",
        hint: "Look at the order. The variable 'name' is being used before it exists in memory. Can you move the declaration?"
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 Your Day 0 Outcomes (What “Done” Looks Like)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">One reliable JS playground</span>: Browser DevTools + Node.js, so you can test ideas in 5 seconds.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">A learning loop</span>: <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">Predict → Run → Explain → Repeat</code> (this is how humans teach).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Debugging fundamentals</span>: breakpoints, stack traces, stepping, and “why is this undefined?” triage.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Doc-reading skill</span>: you’ll know how to use MDN + console experiments to confirm what you read.</li>
</ul>

<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-8">
  <p class="text-blue-800 dark:text-blue-200">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Mindset shift:</span> You’re not learning “syntax”. You’re learning a runtime. Syntax is just how you talk to the runtime.
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Your Two Superpowers: DevTools + Node</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
If you have these two, you can learn anything in JavaScript without waiting for a person to explain it.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-6">
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-brand-primary mb-2">Browser DevTools (Real World)</h4>
    <ul class="list-disc list-inside text-sm text-gray-600 dark:text-light-300 space-y-2">
      <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Console</span>: try ideas instantly.</li>
      <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Sources</span>: breakpoints + step-through execution.</li>
      <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Network</span>: async + caching truth.</li>
      <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Performance</span>: where “fast” becomes measurable.</li>
    </ul>
  </div>
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-green-600 dark:text-green-400 mb-2">Node.js (Pure JS Lab)</h4>
    <ul class="list-disc list-inside text-sm text-gray-600 dark:text-light-300 space-y-2">
      <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Script execution</span>: run JS without UI noise.</li>
      <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Modules</span>: ESM/CommonJS practice.</li>
      <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Debugging</span>: Node inspect + stack traces.</li>
      <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Repeatability</span>: same code, same output.</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The “Human Teacher” Loop (Predict → Run → Explain)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Here’s the trick: human teachers don’t just show answers—they force you to form a hypothesis.
We’ll simulate that. Every time you see a code snippet:
</p>
<div class="bg-gray-100 dark:bg-dark-900 p-5 rounded-xl border border-gray-200 dark:border-dark-600 mb-6">
  <ol class="list-decimal list-inside space-y-2 text-gray-700 dark:text-light-200">
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Predict</span> what the code prints (don’t run yet).</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Run</span> it (in the live lab).</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Explain</span> the result using a runtime concept (scope, hoisting, coercion, event loop, etc.).</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mutate</span> one detail and predict again.</li>
  </ol>
</div>

<details class="mb-6 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-gray-800 dark:text-light-100">Checkpoint: How do you know you “understand” something?</summary>
  <div class="mt-3 text-gray-600 dark:text-light-300 space-y-3">
    <p>
      You understand it when you can <span class="text-yellow-600 dark:text-yellow-400 font-bold">predict the output</span> and you can
      <span class="text-yellow-600 dark:text-yellow-400 font-bold">explain why</span> without saying “because I memorized it”.
    </p>
    <p>
      Memorization fails when code changes. Understanding survives change.
    </p>
  </div>
</details>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Debugging Like a Pro (The 60‑Second Triage)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Most JS “bugs” are 4 categories. Use this checklist before panic:
</p>
<div class="grid md:grid-cols-2 gap-6 mb-6">
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-yellow-600 dark:text-yellow-400 mb-2">A) Wrong value</h4>
    <ul class="list-disc list-inside text-sm text-gray-600 dark:text-light-300 space-y-2">
      <li>Log the variable right before it’s used.</li>
      <li>Check types: <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">typeof</code>, <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">Array.isArray</code>.</li>
      <li>Print structure: <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">console.table</code>, <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">console.dir</code>.</li>
    </ul>
  </div>
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-yellow-600 dark:text-yellow-400 mb-2">B) Wrong timing</h4>
    <ul class="list-disc list-inside text-sm text-gray-600 dark:text-light-300 space-y-2">
      <li>Async code executed later than you think.</li>
      <li>Add logs with timestamps, or log “before/after”.</li>
      <li>Event loop understanding is a multiplier (we’ll master it later).</li>
    </ul>
  </div>
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-yellow-600 dark:text-yellow-400 mb-2">C) Wrong scope / undefined</h4>
    <ul class="list-disc list-inside text-sm text-gray-600 dark:text-light-300 space-y-2">
      <li>Is this variable declared where you think it is?</li>
      <li>Is it shadowed by an inner <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">let</code>/<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">const</code>?</li>
      <li>Is it a <span class="text-red-600 dark:text-red-400 font-bold">TDZ</span> issue?</li>
    </ul>
  </div>
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-yellow-600 dark:text-yellow-400 mb-2">D) Wrong assumptions</h4>
    <ul class="list-disc list-inside text-sm text-gray-600 dark:text-light-300 space-y-2">
      <li>You assumed “this” means something it doesn’t.</li>
      <li>You assumed coercion would be “nice”.</li>
      <li>You assumed objects are “just dictionaries” (they’re not, in V8).</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) How to Read JavaScript Docs (MDN Skill)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Docs become powerful when you treat them like hypotheses and verify them with experiments.
When you read about a method:
</p>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Copy the example</span> into Console → confirm output.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Break it</span> (wrong input types) → see errors and edge cases.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Generalize</span> (try similar inputs) → build intuition.</li>
</ul>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 mb-6 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 overflow-x-auto shadow-inner">
<pre>
Your learning loop:
Docs → Hypothesis → Experiment → Surprise → Mental Model → Repeat
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">5) Tiny Day‑0 Mission (10 minutes)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Run the Live Lab code below, then change <span class="text-yellow-600 dark:text-yellow-400 font-bold">one</span> thing at a time:
rename a variable, swap <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">var</code> for <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">let</code>, add a nested block, etc.
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
      options: [
        "'null'",
        "'object'",
        "'undefined'",
        "'number'"
      ],
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
      options: [
        "Network tab",
        "Breakpoints + stepping in Sources",
        "Application tab",
        "Lighthouse"
      ],
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
      bugFocus: {
        fromLine: 4,
        toLine: 4
      },
      fixCode: `// FIX (mental model): sync runs now, timeout runs later
console.clear();

console.log("A");
setTimeout(() => console.log("B (timeout)"), 0);
console.log("C");

// Explain: the callback is queued as a task. It cannot run until the current call stack is empty.`,
      fixFocus: {
        fromLine: 7,
        toLine: 7
      },
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
      bugFocus: {
        fromLine: 6,
        toLine: 6
      },
      fixCode: `console.clear();

const user = { id: 7, name: "Riya", roles: ["student"] };

// FIX: verify shape + use safe access
console.log("user:", user);
console.log("plan:", user.meta?.plan ?? "(no plan set)");

// Then decide: should meta exist, or is this optional?`,
      fixFocus: {
        fromLine: 6,
        toLine: 7
      },
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

console.log("\n2) console tools:");
const user = { id: 7, name: "Riya", roles: ["student", "builder"], meta: { plan: "JS Mastery" } };
console.table([user]);
console.dir(user, { depth: 5 });

console.log("\n3) scope surprise:");
let points = 10;
{
  let points = 99; // shadowing
  console.log("Inside block:", points);
}
console.log("Outside block:", points);

console.log("\n4) timing surprise:");
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
      {
        q: "What’s the difference between JavaScript (the language) and the runtime (browser/Node)?",
        a: "The language is the spec (ECMAScript). The runtime is the environment that executes it and provides extra APIs (DOM/Web APIs in browsers, fs/net in Node), plus an engine like V8."
      },
      {
        q: "What does strict mode do and why does it exist?",
        a: "It makes JavaScript safer by disabling some silent failures and legacy behaviors (e.g., accidental globals). It helps catch bugs early and makes code more optimizable/predictable."
      },
      {
        q: "What are source maps?",
        a: "Metadata that maps transformed code (bundled/minified/transpiled) back to original sources, enabling readable debugging in DevTools."
      },
      {
        q: "What’s the difference between ESM and CommonJS?",
        a: "ESM uses static `import/export` and supports tree-shaking; CommonJS uses dynamic `require/module.exports`. Node supports both with different rules/resolution."
      }
    ]
  },
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
};

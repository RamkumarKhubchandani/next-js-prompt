export const day28 = {
  day: 28,
  title: "🔥 Top 20 JS Output Questions",
  intro: "The most common tricky output questions asked in interviews. Master these and you'll never be surprised.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 28: Output Questions. These test your knowledge of JS internals: Hoisting, Coercion, and Event Loop."
      },
      {
        type: "talk",
        message: "The most famous one involves `var` hoisting and shadowing. It trips up 50% of candidates."
      },
      {
        type: "challenge",
        instruction: "Fix the Shadowing Bug. This code prints `undefined` because the local `var value` declaration is 'hoisted' to the top of the function, creating a local variable that shadows the global one but isn't initialized yet. Rename the local variable to `localValue` to fix the shadowing.",
        buggyCode: `var value = "Global";

function printValue() {
  // ❌ Output: undefined (Because of line 6!)
  console.log(value);
  var value = "Local"; 
}

printValue();`,
        solutionCode: `var value = "Global";

function printValue() {
  // ✅ Output: Global
  console.log(value);
  var localValue = "Local"; 
}

printValue();`,
        verifyOutput: "Global",
        verifyCode: "var localValue",
        successMessage: "Correct. `var` declarations are hoisted to the top of their scope. By renaming the local variable, you removed the shadowing, allowing `console.log` to see the global `value`.",
        hint: "Change `var value = 'Local'` to `var localValue = 'Local'` so it doesn't conflict with the global `value`."
      }
    ]
  },
  content: `
<div class="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
<h4 class="text-yellow-600 dark:text-yellow-400 font-bold mb-2">🎯 Most Asked in Interviews</h4>
<p class="text-gray-600 dark:text-light-300">These exact questions appear in 90% of JavaScript interviews. Know them cold!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Categories Covered</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Hoisting</code> - var, let, const, functions</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Closures</code> - Loop closures, setTimeout</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">this keyword</code> - Arrow vs regular functions</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Event Loop</code> - Promise, setTimeout order</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Coercion</code> - Type conversion gotchas</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Scope</code> - Block vs function scope</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Pro Tips</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-green-600 dark:text-green-400 mb-2">During Interview</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-light-300">
        <li>Think out loud</li>
        <li>Explain WHY, not just WHAT</li>
        <li>Mention edge cases</li>
    </ul>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-yellow-600 dark:text-yellow-400 mb-2">Common Traps</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-light-300">
        <li>setTimeout(..., 0) isn't immediate</li>
        <li>Promise.then is microtask</li>
        <li>Arrow functions don't have 'this'</li>
    </ul>
</div>
</div>
            `,
  masteryChecklist: [
    {
      id: "d28-c1",
      text: "I can predict output and explain using a rule (hoisting, TDZ, closure, this binding, event loop, coercion)."
    },
    {
      id: "d28-c2",
      text: "I can explain microtask vs macrotask ordering and why it matters in real apps."
    },
    {
      id: "d28-c3",
      text: "I can fix the classic var-in-loop setTimeout closure bug from memory."
    },
    {
      id: "d28-c4",
      text: "I can explain why arrow functions do not have their own this."
    },
    {
      id: "d28-c5",
      text: "I can explain one tricky coercion case using ToPrimitive/toString/valueOf."
    }
  ],
  predictions: [
    {
      prompt: "Output order: console.log('A'); Promise.resolve().then(()=>console.log('B')); setTimeout(()=>console.log('C'),0); console.log('D');",
      options: [
        "A, D, B, C",
        "A, B, D, C",
        "A, D, C, B",
        "B, A, D, C"
      ],
      correctIndex: 0,
      explanation: "Synchronous logs first (A, D), then microtasks (B), then macrotasks (C)."
    },
    {
      prompt: "What does [1,,3].map(x => x) produce at index 1?",
      options: [
        "undefined value at index 1",
        "A hole remains (index 1 does not exist)",
        "Throws TypeError",
        "It depends on engine"
      ],
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
      bugFocus: {
        fromLine: 2,
        toLine: 6
      },
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
      fixFocus: {
        fromLine: 2,
        toLine: 15
      },
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
      bugFocus: {
        fromLine: 2,
        toLine: 5
      },
      fixCode: `console.clear();

console.log("A");
setTimeout(function () { console.log("C (macrotask)"); }, 0);
Promise.resolve().then(function () { console.log("B (microtask)"); });
console.log("D");

// Expected: A, D, B, C`,
      fixFocus: {
        fromLine: 2,
        toLine: 7
      },
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
  return { title: title, code: codeLines.join("\n"), expected: expected, explanation: explanation };
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
      {
        q: "What is the Temporal Dead Zone?",
        a: "The period between entering a scope and the let/const declaration being reached. Accessing the variable in this zone throws ReferenceError."
      },
      {
        q: "Why does setTimeout with 0ms not run immediately?",
        a: "setTimeout schedules a macrotask. Even with 0ms, it waits for current call stack to clear AND all microtasks (Promises) to complete first."
      },
      {
        q: "How does == type coercion work?",
        a: "Complex rules: null == undefined is true. For other types, converts to number. [] → 0, {} → NaN, '5' → 5, true → 1."
      },
      {
        q: "Why is NaN !== NaN?",
        a: "By IEEE 754 spec, NaN represents 'not a valid number' - could be different invalid operations. Use Number.isNaN() or Object.is() to check."
      }
    ]
  }
};

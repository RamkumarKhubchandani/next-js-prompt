export const day11 = {
  day: 11,
  title: "Day 11: Functional Programming (Purity, Immutability, Composition)",
  intro: "FP is how you make code predictable. Today you’ll learn purity, immutability, composition, and how to build logic that is easy to test and hard to break.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) What You’re Building</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
You are building a “predictability engine”. The goal is not to write fancy code — the goal is to make bugs expensive to create.
FP does that by separating <span class="text-yellow-600 dark:text-yellow-400 font-bold">logic</span> from <span class="text-yellow-600 dark:text-yellow-400 font-bold">side effects</span>.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Pure Functions (No Surprises)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
A function is <span class="text-yellow-600 dark:text-yellow-400 font-bold">pure</span> if:
</p>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6 bg-white dark:bg-dark-800 p-4 rounded-lg">
  <li>Same input → same output (deterministic)</li>
  <li>No side effects (doesn’t mutate outer state, DOM, network)</li>
</ul>

<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-500/30">
      <span class="text-red-600 dark:text-red-400 font-bold block mb-2">Impure</span>
      Reads/writes global state, mutates input, updates UI, calls APIs.
  </div>
  <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-500/30">
      <span class="text-green-600 dark:text-green-400 font-bold block mb-2">Pure</span>
      Input → output. No hidden reads/writes. Easy to test.
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Immutability (So Change Is Visible)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Immutability means you don’t mutate existing objects/arrays — you create new ones.
This makes changes obvious and enables cheap comparisons (important in React and state systems).
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-8 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto border border-gray-200 dark:border-dark-600">
<pre><code>
// Good: copy update
const user = { name: "John", score: 10 };
const updated = { ...user, score: 20 };
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Composition (Small Functions → Big Power)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Composition is building complex behavior by chaining small functions.
If each function is pure, the pipeline becomes easy to reason about.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto border border-gray-200 dark:border-dark-600">
<pre><code>
const toUpper = (s) => s.toUpperCase();
const exclaim = (s) => s + "!";
// compose(exclaim, toUpper)("hi") -> "HI!"
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) The Practical FP Trio: map / filter / reduce</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
These let you build transformations without mutating arrays.
The “teacher trick” is to read them as sentences:
</p>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6 bg-white dark:bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">filter</span>: keep only items that match</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">map</span>: transform each item</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">reduce</span>: fold into a single value</li>
</ul>

<details class="mb-6 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-gray-800 dark:text-light-100">Why FP matters in real teams</summary>
  <div class="mt-3 text-gray-600 dark:text-light-300 space-y-3">
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
      options: [
        "f then g",
        "g then f",
        "both at the same time",
        "random"
      ],
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
      bugFocus: {
        fromLine: 3,
        toLine: 6
      },
      fixCode: `console.clear();

function addItem(arr, item) {
  // FIX: return a new array
  return [...arr, item];
}

const original = [1, 2, 3];
const out = addItem(original, 99);
console.log("out:", out);
console.log("original:", original);`,
      fixFocus: {
        fromLine: 3,
        toLine: 6
      },
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
      bugFocus: {
        fromLine: 6,
        toLine: 7
      },
      fixCode: `console.clear();

const toUpper = (s) => s.toUpperCase();
const exclaim = (s) => s + "!";

// FIX: compose(f, g)(x) = f(g(x))
const compose = (f, g) => (x) => f(g(x));
const shout = compose(exclaim, toUpper);
console.log(shout("hello"));`,
      fixFocus: {
        fromLine: 7,
        toLine: 9
      },
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
      {
        q: "What is a Higher Order Function?",
        a: "A function that takes a function as an argument OR returns a function. Example: `.map()`, `.filter()`."
      },
      {
        q: "Why is Immutability important in React?",
        a: "React uses shallow comparison to detect changes. If you mutate an object, the reference stays the same, so React won't re-render."
      },
      {
        q: "What is Currying?",
        a: "Transforming a function with multiple args `f(a,b)` into a sequence of functions `f(a)(b)`."
      }
    ]
  },
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
};

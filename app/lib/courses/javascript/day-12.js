export const day12 = {
  day: 12,
  title: "Day 12: Currying & Partial Application (Make APIs Cleaner)",
  intro: "Currying is not a trick — it’s a tool for building reusable, configurable functions. Today you’ll learn currying vs partial application and build tiny factories you’ll actually use.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 12! Currying. It sounds spicy, but it just means 'locking in args'. It lets you create specialized tools from generic ones."
      },
      {
        type: "code",
        code: `const add = (a) => (b) => a + b;
const add10 = add(10); // Locking in 10
console.log(add10(5)); // 15
console.log(add10(20)); // 30`,
        caption: "A function factory.",
        speed: "fast"
      },
      {
        type: "talk",
        message: "Most bugs here happen when you forget that the first call *returns a function*, not the result."
      },
      {
        type: "challenge",
        instruction: "This code crashes because `greet` returns a function, but we aren't calling the second part. Fix line 8 to make it print 'Hello World'.",
        buggyCode: `const greet = (greeting) => (name) => {
  console.log(greeting + " " + name);
};

const hello = greet("Hello");
hello; // ❌ Does nothing (it's just a function)`,
        solutionCode: `const greet = (greeting) => (name) => {
  console.log(greeting + " " + name);
};

const hello = greet("Hello");
hello("World"); // ✅ Call the inner function`,
        verifyOutput: "Hello World",
        successMessage: "You got it. `greet('Hello')` creates the tool; `hello('World')` uses it.",
        hint: "You need to call `hello` with a string argument like `hello('World')`."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The Intuition</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Currying converts a function that takes many arguments into a chain of functions that take one argument.
The benefit is: you can create <span class="text-yellow-600 dark:text-yellow-400 font-bold">specialized functions</span> from generic ones.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Concept</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Instead of <code class="bg-white dark:bg-dark-800 px-1 rounded">add(1, 2)</code>, we write <code class="bg-white dark:bg-dark-800 px-1 rounded">add(1)(2)</code>.
You can think of it as: “lock in the first argument now, supply the rest later.”
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ Generic ]         [ Specific ]
add(x) ────▶  add(10)  ────▶  add10(y)
│
└────▶ Returns a Function waiting for 'y'
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Currying vs Partial Application</h3>
<div class="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4 mb-6 text-gray-600 dark:text-light-300">
  <ul class="list-disc list-inside space-y-2">
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Currying</span>: transforms a function into nested unary functions.</li>
    <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Partial application</span>: fixes some arguments and returns a function expecting the rest (arity reduced).</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Real Use Cases</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6 bg-white dark:bg-dark-800 p-4 rounded-lg">
  <li>Event handlers: build handlers like <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">onChange("email")</code></li>
  <li>Configuration: build validators, loggers, formatters with fixed config</li>
  <li>Composition: unary functions are easier to pipe/compose</li>
</ul>
            `,
  predictions: [
    {
      prompt: "Predict: What does sum(2)(3) return if sum = a => b => a + b ?",
      options: [
        "5",
        "23",
        "undefined",
        "a function"
      ],
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
      bugFocus: {
        fromLine: 3,
        toLine: 6
      },
      fixCode: `console.clear();

const multiply = (a) => (b) => a * b;
const double = multiply(2);
console.log("double(10):", double(10));`,
      fixFocus: {
        fromLine: 3,
        toLine: 4
      },
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
      bugFocus: {
        fromLine: 3,
        toLine: 5
      },
      fixCode: `console.clear();

function partial(fn, fixed) {
  return function (...rest) {
    return fn(fixed, ...rest);
  };
}

const add = (a, b) => a + b;
const add10 = partial(add, 10);
console.log("add10(5):", add10(5));`,
      fixFocus: {
        fromLine: 3,
        toLine: 8
      },
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
      {
        q: "Difference between Currying and Partial Application?",
        a: "Currying breaks a function into N unary functions (1 arg each). Partial application fixes some arguments and produces a function with smaller arity."
      },
      {
        q: "Why use Currying in functional composition?",
        a: "It makes functions unary (single argument), which makes them easily chainable in a pipeline `compose(f, g, h)`."
      },
      {
        q: "Write a `sum(2)(3)` function.",
        a: "`const sum = a => b => a + b;`"
      }
    ]
  },
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
};

export const day15 = {
  day: 15,
  title: "Day 15: ES Modules vs CommonJS (Practical Mental Models)",
  intro: "This is where real-world JS apps break: module boundaries, import/export behavior, and runtime differences. Today you’ll build the mental model that prevents bundler and Node confusion.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The Simplest Truth</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
CommonJS is dynamic and runtime-based. ES Modules are static and analyzable.
That single difference explains tree-shaking, top-level await, and why bundlers prefer ESM.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) CommonJS (Node.js Legacy)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Dynamic. Synchronous. Uses require/module.exports.</p>
<code class="block bg-gray-100 dark:bg-dark-900 p-2 rounded mb-4">const fs = require('node:fs');</code>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) ES Modules (Standard)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Static. Keyword-based. Enables tooling and tree-shaking.</p>
<code class="block bg-gray-100 dark:bg-dark-900 p-2 rounded mb-6">import fs from 'node:fs';</code>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Tree Shaking (Why Bundlers Love ESM)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Tree shaking removes unused exports. It works when imports are static (ESM).
With CommonJS, require can be conditional, so tooling cannot safely know what’s needed without running code.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) Export Types (Default vs Named)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6 bg-white dark:bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Named exports</span>: stable API, easier refactors</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Default exports</span>: convenient but easier to rename accidentally</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">5) “Live bindings” (Why ESM feels different)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
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
      options: [
        "default exports everywhere",
        "named exports for most modules",
        "no exports",
        "globals"
      ],
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
      bugFocus: {
        fromLine: 10,
        toLine: 12
      },
      fixCode: `console.clear();

const moduleExports = { add: (a, b) => a + b, default: () => "log" };

// FIX: default vs named are different slots
const log = moduleExports.default;
const { add } = moduleExports;

console.log("log():", log());
console.log("add(1,2):", add(1, 2));`,
      fixFocus: {
        fromLine: 6,
        toLine: 11
      },
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
      bugFocus: {
        fromLine: 5,
        toLine: 6
      },
      fixCode: `console.clear();

// Simulate 'live binding' behavior using a getter
let counter = 0;
const exports = {
  get counter() { return counter; }
};

counter++;
console.log("counter:", counter);
console.log("exports.counter:", exports.counter);`,
      fixFocus: {
        fromLine: 4,
        toLine: 9
      },
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
      {
        q: "Why is ESM better for bundlers?",
        a: "Because the import structure is static, bundlers can build a dependency graph without running the code, enabling Tree Shaking (dead code elimination)."
      },
      {
        q: "Can you use `require` and `import` in the same file?",
        a: "Usually no. Node.js treats files as either CJS or ESM based on extension (.mjs vs .cjs) or package.json type."
      },
      {
        q: "How to use Top-Level Await?",
        a: "It is only available in ES Modules. It allows `await` outside of async functions at the root of the module."
      }
    ]
  },
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
};

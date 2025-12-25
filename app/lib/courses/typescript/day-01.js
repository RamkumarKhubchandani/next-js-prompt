export const day01 = {
  day: 1,
  title: "The TypeScript Mental Model & Compiler",
  intro: "TypeScript is not just 'Java for JavaScript'. It's a powerful static analysis tool that erases itself at runtime. Today we build the correct mental model: Structural Typing and Erasure.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The "Erasure" Mental Model</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    The most important thing to understand: <strong>TypeScript types do not exist at runtime.</strong>
    They are purely for the compiler. When you run your code, it's just JavaScript.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-brand-primary mb-2">TypeScript (Development)</h4>
    <pre class="text-xs text-gray-600 dark:text-light-300">
function add(a: number, b: number) {
  return a + b;
}
    </pre>
  </div>
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-brand-primary mb-2">JavaScript (Runtime)</h4>
    <pre class="text-xs text-gray-600 dark:text-light-300">
function add(a, b) {
  return a + b;
}
    </pre>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Structural Typing (Duck Typing)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
    In Java/C#, types are "Nominal" (based on names). In TypeScript, types are "Structural" (based on shape).
    If it looks like a duck and quacks like a duck, it IS a duck.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-5 rounded-xl border border-gray-200 dark:border-dark-600 mb-8">
  <p class="text-sm text-gray-700 dark:text-light-200 mb-2">
    This is valid in TS, but invalid in Java:
  </p>
  <pre class="text-sm text-blue-600 dark:text-blue-400">
interface Point { x: number; y: number; }
interface Vector { x: number; y: number; }

const p: Point = { x: 1, y: 2 };
const v: Vector = p; // ✅ OK! Same shape.
  </pre>
</div>

<div class="mb-8 p-5 rounded-xl border border-purple-500/30 bg-purple-500/5">
  <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
    <span class="text-xl">🏛️</span> Architect's Note
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200">
    <strong>Strictness is a dial, not a switch.</strong>
    Always enable \`"strict": true\` in your \`tsconfig.json\`. 
    Without it, \`null\` and \`undefined\` are ignored, which defeats 50% of the purpose of using TS.
  </p>
</div>
`,
  predictions: [
    {
      prompt: "What happens to interfaces when you compile TS to JS?",
      options: ["They become classes", "They become JSON objects", "They disappear completely", "They become runtime checks"],
      correctIndex: 2,
      explanation: "Interfaces are erased. They leave zero runtime footprint."
    }
  ],
  checkpoints: [
    {
      prompt: "True or False: TypeScript adds runtime validation for API responses.",
      options: ["True", "False"],
      correctIndex: 1,
      explanation: "False! You still need Zod or Yup to validate data at runtime. TS only checks code at compile time."
    }
  ],
  labSteps: [
    {
      id: "ts-d1-lab",
      title: "The 'any' Trap",
      subtitle: "Why 'noImplicitAny' matters",
      teacherNote: "Try removing the type annotation.",
      bugCode: "function fn(s) { console.log(s.substr(3)); } fn(42);",
      bugFocus: { fromLine: 1, toLine: 1 },
      fixCode: "function fn(s: string) { console.log(s.substr(3)); } // Error caught!",
      fixFocus: { fromLine: 1, toLine: 1 },
      whatToNotice: ["Without types, this crashes at runtime.", "With types, it fails at compile time."]
    }
  ],
  code: `// Day 1: The Mental Model
// 1. Structural Typing
interface Dog {
  breed: string;
}
interface Cat {
  breed: string;
}

let myDog: Dog = { breed: "Labrador" };
let myCat: Cat = { breed: "Persian" };

// This works because they have the same SHAPE
myDog = myCat; 
console.log("TS is Structural:", myDog);

// 2. Erasure
// The interface below will vanish in the output
interface Config {
  apiKey: string;
}
const config: Config = { apiKey: "123" };
console.log("Config:", config);`,
  interview: {
    questions: [
      {
        q: "What is Type Erasure?",
        a: "The process where all type annotations, interfaces, and type aliases are removed during compilation, leaving only standard JavaScript."
      },
      {
        q: "Explain Structural vs Nominal typing.",
        a: "Nominal typing relies on the name of the class/interface (Java). Structural typing relies on the shape/properties of the object (TypeScript)."
      }
    ]
  },
  recap: {
    takeaways: [
      "TS types disappear at runtime.",
      "TS uses Structural Typing (Duck Typing).",
      "Always use strict mode."
    ]
  }
};

export const day31 = {
  day: 31,
  title: "🔥 TypeScript Essentials for JS Devs",
  intro: "TypeScript is now essential. Learn the core concepts every JS developer needs in 2025.",
  content: `
<div class="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
<h4 class="text-blue-400 font-bold mb-2">🎯 Required Skill in 2025</h4>
<p class="text-gray-600 dark:text-light-300">90%+ of new projects use TypeScript. You need this for any senior role!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Core Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">interface vs type</code> - When to use each</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Generics</code> - Reusable type-safe code</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Union & Intersection</code> - Combine types</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Type Guards</code> - Runtime type checking</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Utility Types</code> - Partial, Required, Pick, Omit</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Quick Decision Guide</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-blue-400 mb-2">Use interface</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-light-300">
        <li>Object shapes (most common)</li>
        <li>Class implementations</li>
        <li>Declaration merging needed</li>
    </ul>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-purple-400 mb-2">Use type</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-light-300">
        <li>Unions and intersections</li>
        <li>Mapped types</li>
        <li>Tuple types</li>
    </ul>
</div>
</div>
            `,
  masteryChecklist: [
    {
      id: "d31-c1",
      text: "I can explain interface vs type and pick one with a clear reason."
    },
    {
      id: "d31-c2",
      text: "I can use generics to make reusable, type-safe helpers."
    },
    {
      id: "d31-c3",
      text: "I can narrow unknown using type guards (typeof, in, instanceof, custom is)."
    },
    {
      id: "d31-c4",
      text: "I can use 3 utility types (Partial, Pick/Omit, Record) correctly."
    },
    {
      id: "d31-c5",
      text: "I can explain unknown vs any and why unknown is safer."
    }
  ],
  predictions: [
    {
      prompt: "You have `value: unknown`. What's the safest first step before using it?",
      options: [
        "Cast to any",
        "Use typeof/guards to narrow",
        "Assume it's an object",
        "Call value.toString()"
      ],
      correctIndex: 1,
      explanation: "unknown requires narrowing before use."
    },
    {
      prompt: "Which is a unique advantage of interface over type?",
      options: [
        "Better performance at runtime",
        "Declaration merging",
        "Can represent unions",
        "Can represent tuples"
      ],
      correctIndex: 1,
      explanation: "Interfaces can merge; types cannot."
    },
    {
      prompt: "What does Partial<User> do?",
      options: [
        "Makes User nullable",
        "Makes all User properties optional",
        "Removes readonly",
        "Makes User a class"
      ],
      correctIndex: 1,
      explanation: "Partial turns every property into optional."
    }
  ],
  checkpoints: [
    {
      prompt: "unknown differs from any because…",
      options: [
        "unknown is slower",
        "unknown forces you to narrow before use",
        "any is only for APIs",
        "unknown cannot be assigned"
      ],
      correctIndex: 1,
      explanation: "unknown is type-safe any; you must check before using."
    },
    {
      prompt: "A type guard function signature looks like…",
      options: [
        "function isCat(x): boolean",
        "function isCat(x): x is Cat",
        "function isCat<Cat>(x)",
        "function isCat(x): Cat"
      ],
      correctIndex: 1,
      explanation: "The `x is Cat` return type tells TS how to narrow."
    },
    {
      prompt: "Pick<User, 'id'|'name'> produces…",
      options: [
        "A user without id and name",
        "A user with only id and name",
        "A user with all fields required",
        "A runtime validator"
      ],
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
      bugFocus: {
        fromLine: 2,
        toLine: 8
      },
      fixCode: `console.clear();

// Imagine: data from API
var value = /** @type {unknown} */ ("hello");

// ✅ Narrow first (TypeScript idea shown in JS)
if (typeof value === "string") {
  console.log(value.toUpperCase());
} else {
  console.log("not a string");
}`,
      fixFocus: {
        fromLine: 2,
        toLine: 12
      },
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
      bugFocus: {
        fromLine: 2,
        toLine: 4
      },
      fixCode: `console.clear();

// ✅ Pseudo-code: with generics you write once
// function identity<T>(x: T): T { return x; }
// identity<string>("hi")
// identity(123) // inferred`,
      fixFocus: {
        fromLine: 2,
        toLine: 6
      },
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
      {
        q: "When would you use 'unknown' vs 'any'?",
        a: "unknown is type-safe any. You must narrow it before use. any disables type checking entirely. Prefer unknown for values from external sources."
      },
      {
        q: "What is declaration merging?",
        a: "When two interfaces with same name combine their properties. Useful for extending library types. Only works with interface, not type."
      },
      {
        q: "Explain the 'infer' keyword",
        a: "Used in conditional types to extract a type. Example: type ReturnType<T> = T extends (...args: any) => infer R ? R : never. Infers the return type R."
      },
      {
        q: "What are Mapped Types?",
        a: "Create new types by transforming properties of existing type. Example: type Readonly<T> = { readonly [K in keyof T]: T[K] }. Loops over keys."
      }
    ]
  }
};

export const genericsQuestions = [
    {
        id: 'ts-generics-1',
        category: 'Generics',
        difficulty: 'Medium',
        question: 'How do you constrain a Generic Type?',
        answer: `**Using the \`extends\` keyword.**

**Purpose:**
- To ensure the generic type T has specific properties (e.g., \`.length\`).
- Without constraints, T could be anything (number, null, object), so you can't access any properties safely.

**Syntax:** \`<T extends SomeType>\` (T must be assignable to SomeType).`,
        codeExample: `// Constraint: T must have a .length property
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("Hello"); // OK (String has .length)
logLength([1, 2, 3]); // OK (Array has .length)
logLength({ length: 10, value: 3 }); // OK
// logLength(3); // Error: Number has no .length`
    },
    {
        id: 'ts-generics-2',
        category: 'Generics',
        difficulty: 'Medium',
        question: 'How do Generic Defaults work?',
        answer: `**Providing a fallback type if none is specified.**

**Syntax:** \`<T = DefaultType>\`

**Behavior:**
- If user provides type: \`<string>\` -> T is string.
- If user omits type: T is inferred (if possible) OR falls back to DefaultType.`,
        codeExample: `interface ApiResponse<T = any> {
  data: T;
  status: number;
}

// 1. Explicit Type
const userRes: ApiResponse<{ name: string }> = {
  data: { name: 'Alice' },
  status: 200
};

// 2. Default Type (any)
const genericRes: ApiResponse = {
  data: 'Could be anything', 
  status: 404
};`
    },
    {
        id: 'ts-generics-3',
        category: 'Generics',
        difficulty: 'Hard',
        question: 'What is "keyof" and how does it relate to Generics?',
        answer: `**\`keyof T\` produces a union of string literal types of T's keys.**

**Common Pattern: \`getProperty\`**
- Ensure the key being accessed actually exists on the object.
- \`K extends keyof T\`: K must be one of the keys of T.`,
        codeExample: `function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Return type is T[K]
}

const x = { a: 1, b: 2, c: 3 };

const val1 = getProperty(x, "a"); // OK, type is number
// const val2 = getProperty(x, "d"); // Error: "d" is not keyof x`
    },
    {
        id: 'ts-generics-4',
        category: 'Generics',
        difficulty: 'Medium',
        question: 'Can you have Generic Classes?',
        answer: `**Yes, classes can have type parameters just like interfaces.**

**Usage:**
- Data structures (Queue, Stack, Map).
- Wrappers.

**Note:** Static members cannot use the class's generic type parameter.`,
        codeExample: `class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
  
  constructor(zero: T, addFn: (x: T, y: T) => T) {
    this.zeroValue = zero;
    this.add = addFn;
  }
}

const myGenericNumber = new GenericNumber<number>(
  0, 
  (x, y) => x + y
);
console.log(myGenericNumber.add(5, 10)); // 15`
    },
    {
        id: 'ts-generics-5',
        category: 'Generics',
        difficulty: 'Hard',
        question: 'Explain the "NoInfer" utility (TS 5.4+ or manual implementation).',
        answer: `**Prevents TypeScript from inferring T from a specific argument.**

**Problem:**
- function \`create(a: T, b: T)\`
- \`create("string", 123)\` -> TS infers T as \`string | number\`.
- Sometimes you want 'a' to set T, and 'b' to FAIL if it doesn't match T exactly.

**Solution:** \`b: NoInfer<T>\`.`,
        codeExample: `// TS 5.4+ Feature
// Use 'NoInfer' to block inference from the second argument
function createConfig<T>(defaultConfig: T, userConfig: NoInfer<T>) {
  return { ...defaultConfig, ...userConfig };
}

const defaults = { color: 'red', size: 10 };

// Valid
createConfig(defaults, { color: 'blue', size: 20 });

// Error: 'green' is acceptable string, but extra prop 'foo' is not in inferred T
// createConfig(defaults, { color: 'green', foo: 5 });`
    },
    {
        id: 'ts-generics-6',
        category: 'Generics',
        difficulty: 'Medium',
        question: 'What is a Generic Interface for Functions?',
        answer: `**Defining call signatures with generics.**

**Pattern:**
- \`interface GenericIdentityFn { <T>(arg: T): T; }\`
- Allows the caller to decide T.`,
        codeExample: `interface GenericFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericFn = identity;

// Caller decides T
myIdentity<string>("Hello");
myIdentity<number>(100);`
    },
    {
        id: 'ts-generics-7',
        category: 'Generics',
        difficulty: 'Hard',
        question: 'How do you type a React Component with Generics (Props)?',
        answer: `**Useful for components like Lists or Tables that handle dynamic data types.**

**Syntax:**
- \`const List = <T extends object>(props: ListProps<T>) => ...\`
- Note: In \`.tsx\` files, \`<T>\` can be confused with JSX tag. Use \`<T,>\` (trailing comma) to hint it's a generic.`,
        codeExample: `// React Pattern (Simulated)
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => string;
}

// Function Component with Generic
function List<T>(props: ListProps<T>) {
  return props.items.map(props.renderItem);
}

// Usage
const users = [{ id: 1, name: 'Alice' }];
List({
  items: users,
  renderItem: (u) => u.name // TS knows 'u' is {id, name}
}); 
console.log('List rendered');`
    },
    {
        id: 'ts-generics-8',
        category: 'Generics',
        difficulty: 'Medium',
        question: 'Using "infer" inside Generics (ReturnType)?',
        answer: `**Extracting types from other types (Pattern Matching).**

**Syntax:** \`T extends (...args: any) => infer R ? R : never\`
- Checks if T is a function.
- If yes, captures the return type into variable R.
- Returns R.`,
        codeExample: `type MyReturnType<T> = T extends (...args: any) => infer R ? R : any;

function getData() {
  return { name: 'Alice', age: 30 };
}

// Extract the return type of getData
type Data = MyReturnType<typeof getData>;
// Data is { name: string; age: number; }

const d: Data = { name: 'Bob', age: 40 };
console.log(d);`
    },
    {
        id: 'ts-generics-9',
        category: 'Generics',
        difficulty: 'Hard',
        question: 'Can generics trigger "Infinite Recursion"?',
        answer: `**Yes, especially with Recursive Type Aliases.**

**Example:**
- \`type JSONValue = string | number | boolean | JSONObject | JSONArray;\`
- \`interface JSONObject { [x: string]: JSONValue; }\`
- TypeScript sets a depth limit (usually around 50) to prevent crashing compiler.`,
        codeExample: `type Recursive<T> = { value: T, next?: Recursive<T> };

const node: Recursive<number> = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3
    }
  }
};
console.log(node);`
    },
    {
        id: 'ts-generics-10',
        category: 'Generics',
        difficulty: 'Easy',
        question: 'What is Array<T> vs T[]?',
        answer: `**They are identical.**

- \`number[]\` is shorthand for \`Array<number>\`.
- **Preference:** \`T[]\` is cleaner for simple arrays. \`Array<T>\` is sometimes preferred for complex types (\`Array<string | number>\`).`,
        codeExample: `const arr1: number[] = [1, 2, 3];
const arr2: Array<number> = [1, 2, 3];

// Identical behavior
function len(a: Array<any>) {
  return a.length;
}
console.log(len(arr1));`
    }
];

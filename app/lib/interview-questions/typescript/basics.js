export const basicsQuestions = [
    {
        id: 'ts-basics-1',
        category: 'Basics & Primitives',
        difficulty: 'Easy',
        question: 'Difference between "interface" and "type" alias?',
        answer: `**Both define shapes, but with key differences:**

1. **Interfaces:**
   - Can be **merged** (declaration merging).
   - Better for defining object shapes/classes.
   - Syntax: \`interface User { name: string }\`

2. **Types:**
   - Can define **unions**, **primitives**, **tuples**, and **intersections**.
   - Cannot be merged.
   - Syntax: \`type User = { name: string }\` or \`type Status = "active" | "inactive"\`

**Recommendation:** Use \`interface\` for public API definitions (extensibility), \`type\` for everything else (unions, transformations).`,
        codeExample: `// 1. Interface Merging (Works)
interface User {
  name: string;
}
interface User {
  age: number;
}
const user: User = { name: 'Alice', age: 30 }; // Valid: Merged

// 2. Type Unions (Only possible with 'type')
type ID = string | number;
type Status = 'open' | 'closed';

// 3. Implements
class Admin implements User {
  name = 'Bob';
  age = 40;
}

console.log(user);`
    },
    {
        id: 'ts-basics-2',
        category: 'Basics & Primitives',
        difficulty: 'Easy',
        question: 'What are Enums? const enum vs enum?',
        answer: `**Enums allow defining a set of named constants.**

1. **Standard Enum:**
   - Compiles to a real JavaScript object (IIFE).
   - Can be used at runtime (e.g. iterating keys).

2. **Const Enum (\`const enum\`):**
   - Completely removed during compilation.
   - Values are inlined at usage sites.
   - Better performance/bundle size, but cannot be used dynamically at runtime.`,
        codeExample: `// 1. Standard Enum (Compiles to object)
enum Direction {
  Up,
  Down
}
console.log(Direction.Up); // 0
console.log(Direction[0]); // "Up" (Reverse mapping)

// 2. Const Enum (Erased)
const enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}
const currentStatus = Status.Active;
// Transpiles to: const currentStatus = "ACTIVE";

console.log(currentStatus);`
    },
    {
        id: 'ts-basics-3',
        category: 'Basics & Primitives',
        difficulty: 'Medium',
        question: 'Explain "any" vs "unknown" vs "never".',
        answer: `**They represent different levels of type safety:**

1. **any:** Disables type checking. You can do anything with it. "I don't care."
2. **unknown:** Safer parent type. You cannot do anything with it until you **narrow** the type (check what it is).
3. **never:** Represents unreachable code (e.g., function that throws or infinite loop). Used in exhaustive checks.`,
        codeExample: `// 1. Any (Unsafe)
let a: any = 10;
a.toUpperCase(); // Runtime Error, but TS is fine with it.

// 2. Unknown (Safe)
let u: unknown = 10;
// u.toUpperCase(); // Error: Object is of type 'unknown'.

if (typeof u === 'string') {
  console.log(u.toUpperCase()); // Valid (Narrowed)
}

// 3. Never
function error(msg: string): never {
  throw new Error(msg);
}

type Direction = 'UP' | 'DOWN';
function move(d: Direction) {
  switch (d) {
    case 'UP': return 1;
    case 'DOWN': return -1;
    default: 
      // This line enforces that all cases are handled
      const _exhaustiveCheck: never = d; 
      return _exhaustiveCheck;
  }
}`
    },
    {
        id: 'ts-basics-4',
        category: 'Basics & Primitives',
        difficulty: 'Easy',
        question: 'What are Tuples?',
        answer: `**Arrays with fixed length and types at specific positions.**

**Usage:**
- \`useState\`: \`[value, setter]\`
- Coordinates: \`[x, y]\`
- CSV Row: \`[id, name, active]\`

**Features:**
- Can have optional elements (\`[string, number?]\`).
- Can have rest elements (\`[string, ...number[]]\`).`,
        codeExample: `// Fixed Tuples
type Coord = [number, number];
const point: Coord = [10, 20];

// Named Tuples (Typescript 4.0+)
type UserResponse = [success: boolean, data: object, code: number];

function getResponse(): UserResponse {
  return [true, { id: 1 }, 200];
}

const [success, data] = getResponse();
console.log(success, data);`
    },
    {
        id: 'ts-basics-5',
        category: 'Functions & Classes',
        difficulty: 'Medium',
        question: 'How do Function Overloads work?',
        answer: `**Allows defining multiple function signatures for a single implementation.**

**Structure:**
1. **Overload Signatures:** Define *what* allows to be called (Types only, no body).
2. **Implementation Signature:** Defines *how* it handles inputs (One body, must allow all overloads).
3. **Usage:** External code only sees overload signatures.`,
        codeExample: `// Overload Signatures
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;

// Implementation (Hidden from public API)
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

const d1 = makeDate(12345678); // Valid
const d2 = makeDate(5, 5, 2025); // Valid
// const d3 = makeDate(1, 2); // Error: No overload matches 2 args`
    },
    {
        id: 'ts-basics-6',
        category: 'Functions & Classes',
        difficulty: 'Medium',
        question: 'Explain "readonly" and "const" assertion ("as const").',
        answer: `**Immutability features.**

1. **readonly:** Property modifier. Cannot be reassigned.
2. **as const:** Infers the *narrowest* possible type (literal types) and makes everything readonly deeply.

**"as const" is powerful for Redux actions or config objects.**`,
        codeExample: `// 1. Readonly Interface
interface Point {
  readonly x: number;
}
const p: Point = { x: 10 };
// p.x = 20; // Error

// 2. as const
const config = {
  endpoint: 'https://api.com',
  timeout: 5000
} as const;

// Type is roughly:
// {
//    readonly endpoint: "https://api.com";
//    readonly timeout: 5000;
// }

// config.timeout = 1000; // Error
console.log(config);`
    },
    {
        id: 'ts-basics-7',
        category: 'Functions & Classes',
        difficulty: 'Medium',
        question: 'Abstract Classes vs Interfaces?',
        answer: `**Key difference: Implementation.**

1. **Interface:** Pure type contract. No runtime code. "What it looks like."
2. **Abstract Class:** Can have *implementation details* (methods with bodies) AND abstract methods. "What it is + some default behavior."
   - Cannot be instantiated directly.
   - Using \`private/protected\` modifiers works.`,
        codeExample: `abstract class Animal {
  constructor(public name: string) {}
  
  // Method with Implementation
  move(): void {
    console.log(this.name + ' is moving.');
  }
  
  // Contract to be implemented
  abstract makeSound(): void;
}

class Dog extends Animal {
  makeSound() {
    console.log('Woof!');
  }
}

const dog = new Dog('Rex');
dog.move(); // Inherited
dog.makeSound(); // Implemented`
    },
    {
        id: 'ts-basics-8',
        category: 'Basics & Primitives',
        difficulty: 'Easy',
        question: 'What is strictNullChecks?',
        answer: `**Configuration that prevents \`null\` and \`undefined\` from being assigned to every type.**

**Without strictNullChecks:**
- \`let name: string = null;\` (Valid) -> Major source of runtime crashes.

**With strictNullChecks (Core part of --strict):**
- \`let name: string = null;\` (Error).
- Must explicitly state union: \`string | null\`.
- Forces you to handle nulls before using the variable (\`if (obj)\`).`,
        codeExample: `// Assuming strict: true

function printLength(str: string | null) {
  // console.log(str.length); // Error: Object is possibly 'null'
  
  if (str) {
    console.log(str.length); // OK (Narrowed to string)
  }
  
  // Optional chaining also useful
  console.log(str?.length);
}`
    },
    {
        id: 'ts-basics-9',
        category: 'Functions & Classes',
        difficulty: 'Easy',
        question: 'Public, Private, Protected, and #private?',
        answer: `**Access Modifiers control visibility.**

1. **public (Default):** Accessible everywhere.
2. **protected:** Accessible in class and *subclasses*.
3. **private:** Accessible *only* in the class. (TypeScript time only).
4. **#private (ES Private Fields):** Real runtime privacy (cannot assume access even with \`(any)\`).`,
        codeExample: `class Base {
  public a = 1;
  protected b = 2;
  private c = 3;
  #d = 4; // Native JS private field
}

class Child extends Base {
  test() {
    console.log(this.a); // OK
    console.log(this.b); // OK
    // console.log(this.c); // Error
    // console.log(this.#d); // Error
  }
}

const instance = new Base();
// instance.b; // Error`
    },
    {
        id: 'ts-basics-10',
        category: 'Functions & Classes',
        difficulty: 'Medium',
        question: 'What are Definite Assignment Assertions (!)?',
        answer: `**Using \`!\` to tell TypeScript "I know this variable is assigned, trust me".**

**Usage:**
- Class properties initialized indirectly (e.g. in \`init()\` method, not constructor).
- Removing \`null/undefined\` from a type manually.

**Safe Alternative:** Optional chaining \`?.\` or Non-null assertion \`!\`.`,
        codeExample: `class Component {
  // '!' tells TS not to worry about initialization in constructor
  layout!: object; 
  
  constructor() {
    this.init();
  }
  
  init() {
    this.layout = { width: 100 };
  }
}

const el = document.getElementById('app');
// Non-null assertion: "I know 'app' exists in HTML"
const text = el!.innerText; 

console.log('Done');`
    }
];

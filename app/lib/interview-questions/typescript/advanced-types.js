export const advancedTypesQuestions = [
    {
        id: 'ts-adv-1',
        category: 'Advanced Types',
        difficulty: 'Expert',
        question: 'How do Conditional Types work (T extends U ? X : Y)?',
        answer: `**The "Ternary Operator" of Types.**

**Syntax:** \`SomeType extends OtherType ? TrueType : FalseType\`
- Checks writability/assignability.
- Used heavily in utility types.

**Common Use:**
- "If T is a function, get its return type, else return T."`,
        codeExample: `type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Distributive Conditional Types
// If T is a union (A | B), it splits:
// (A extends U ? ...) | (B extends U ? ...)`
    },
    {
        id: 'ts-adv-2',
        category: 'Advanced Types',
        difficulty: 'Expert',
        question: 'What are Mapped Types (`[P in K]`)?',
        answer: `**Iterating over keys to create new types.**

**Syntax:** \`{ [Key in Union]: ValueType }\`
- Similar to \`array.map()\` but for object shapes.
- Can add/remove modifiers (\`readonly\`, \`?\`).`,
        codeExample: `// 1. Basic Mapping
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

// Transform all methods to booleans
type FeatureConfig = {
  [K in keyof FeatureFlags]: boolean;
};
// { darkMode: boolean; newUserProfile: boolean; }

// 2. Modifiers (-readonly removes it)
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};`
    },
    {
        id: 'ts-adv-3',
        category: 'Advanced Types',
        difficulty: 'Hard',
        question: 'How do you create Template Literal Types?',
        answer: `**Building types using string interpolation.**

**Power:**
- Can construct precise string patterns.
- Validates formats (e.g., Hex colors, Event names).`,
        codeExample: `type Color = "red" | "blue";
type Quantity = "300" | "600";

// Combinatorial explosion!
type TailwindClass = \`bg-\${Color}-\${Quantity}\`;
// "bg-red-300" | "bg-red-600" | "bg-blue-300" ...

function setStyle(cls: TailwindClass) {
  // ...
}

setStyle("bg-red-300"); // OK
// setStyle("bg-green-500"); // Error`
    },
    {
        id: 'ts-adv-4',
        category: 'Advanced Types',
        difficulty: 'Hard',
        question: 'What is Discriminated Union (Tagged Union)?',
        answer: `**The "Golden Hammer" of TypeScript state management.**

**Concept:**
- A union of objects (\`A | B\`).
- Each object has a shared literal property (the "discriminant"), e.g., \`kind: 'success'\`.
- TypeScript narrows the type automatically inside \`switch/if\` blocks based on that property.`,
        codeExample: `interface Success {
  status: 'success';
  data: string;
}
interface Error {
  status: 'error';
  message: string;
}
type Response = Success | Error;

function handle(res: Response) {
  if (res.status === 'success') {
    console.log(res.data); // OK: TS knows it's Success
  } else {
    console.log(res.message); // OK: TS knows it's Error
  }
}

handle({ status: 'success', data: 'Loaded' });`
    },
    {
        id: 'ts-adv-5',
        category: 'Advanced Types',
        difficulty: 'Expert',
        question: 'Explain "typeof" vs "keyof" operators.',
        answer: `**They serve different purposes.**

1. **typeof (Type Context):** Extracts the Type from a Value (variable/function).
   - \`type T = typeof myConst;\`
2. **keyof:** Extracts the keys (as a union) from a Type.
   - \`type Keys = keyof User;\``,
        codeExample: `const CONFIG = {
  endpoint: 'api.com',
  timeout: 3000
};

// 1. Get the type of the object
type ConfigType = typeof CONFIG;
// { endpoint: string; timeout: number; }

// 2. Get the keys of that type
type ConfigKeys = keyof ConfigType;
// "endpoint" | "timeout"

function update(key: ConfigKeys) { 
  // ...
}`
    },
    {
        id: 'ts-adv-6',
        category: 'Advanced Types',
        difficulty: 'Medium',
        question: 'What is "Indexed Access Type" (T[K])?',
        answer: `**Look up a specific property's type.**

**Syntax:** \`Type['Key']\`
- Useful for extracting sub-types without exporting them manually.`,
        codeExample: `interface User {
  id: number;
  profile: {
    avatar: {
      url: string;
      size: number;
    }
  }
}

// Extract 'url' type deeply
type AvatarUrl = User['profile']['avatar']['url']; // string

const url: AvatarUrl = "https://...";`
    },
    {
        id: 'ts-adv-7',
        category: 'Advanced Types',
        difficulty: 'Expert',
        question: 'How to implement a "DeepPartial" type?',
        answer: `**Recursively making every property optional.**

**Logic:**
- Mapped type over keys.
- If property is object -> recurse.
- Else -> return type.`,
        codeExample: `type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Config {
  db: {
    host: string;
    port: number;
  }
}

// Standard Partial<Config> leaves 'db' as required (or fully optional), but not merged.
const p: DeepPartial<Config> = {
  db: {
    // I can omit 'host' here because it recursed.
    port: 3000 
  }
};`
    },
    {
        id: 'ts-adv-8',
        category: 'Advanced Types',
        difficulty: 'Medium',
        question: 'Explain "satisfies" operator (TS 4.9+).',
        answer: `**Validates a value against a type *without* widening the type.**

**Problem with \`const c: Type = ...\`**: It effectively casts the variable to \`Type\`, losing literal details.
**Solution with \`satisfies Type\`**: Checks compatibility but keeps the inferred literal type.`,
        codeExample: `type Colors = Record<string, string | number[]>;

// 1. Standard Annotation (Bad here)
const palette: Colors = {
  red: 'red',
  green: [0, 255, 0]
};
// palette.red.toUpperCase(); // Error: 'red' is string | number[]

// 2. satisfies (Good)
const safePalette = {
  red: 'red',
  green: [0, 255, 0]
} satisfies Colors;

// TS knows safePalette.red is definitely a STRING
safePalette.red.toUpperCase(); // OK`
    },
    {
        id: 'ts-adv-9',
        category: 'Advanced Types',
        difficulty: 'Hard',
        question: 'What is a "Type Guard" (User-defined)?',
        answer: `**A function that returns a type predicate (\`arg is Type\`).**

**Syntax:** \`function isFish(pet: Fish | Bird): pet is Fish\`
- Returns boolean at runtime.
- Tells compiler to narrow type in scope.`,
        codeExample: `interface Fish { swim: () => void; }
interface Bird { fly: () => void; }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

const pet = { swim: () => {} } as Fish | Bird;

if (isFish(pet)) {
  pet.swim(); // OK: narrowed to Fish
} else {
  pet.fly(); // OK: narrowed to Bird
}`
    },
    {
        id: 'ts-adv-10',
        category: 'Advanced Types',
        difficulty: 'Expert',
        question: 'How to use "asserts" for validation functions?',
        answer: `**Assertion Functions that throw if false.**

**Syntax:** \`function assert(cond: any): asserts cond\`
- Similar to type guards, but for functions that don't return.`,
        codeExample: `function assertIsString(val: any): asserts val is string {
  if (typeof val !== 'string') {
    throw new Error('Not a string!');
  }
}

const val: any = "Hello";
// val.toUpperCase(); // Unsafe

assertIsString(val);
// After this line, TS knows 'val' MUST be a string
console.log(val.toUpperCase());`
    }
];

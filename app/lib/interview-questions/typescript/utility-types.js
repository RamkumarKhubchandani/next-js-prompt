export const utilityTypesQuestions = [
    {
        id: 'ts-util-1',
        category: 'Utility Types',
        difficulty: 'Easy',
        question: 'How does "Partial<T>" work?',
        answer: `**Makes all properties of T optional.**

**Under the hood:**
\`type Partial<T> = { [P in keyof T]?: T[P] };\`

**Use Case:**
- Updating state (patching).
- Initializing forms where fields are filled one by one.`,
        codeExample: `interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(id: number, fields: Partial<User>) {
  // ...
}

updateUser(1, { email: 'new@email.com' }); // Valid
// updateUser(1, { foo: 'bar' }); // Error: 'foo' not in User`
    },
    {
        id: 'ts-util-2',
        category: 'Utility Types',
        difficulty: 'Medium',
        question: 'Difference between "Pick<T, K>" and "Omit<T, K>"?',
        answer: `**Selecting vs Excluding keys.**

1. **Pick<T, K>:** "I want ONLY these keys."
   - \`Pick<User, 'id' | 'name'>\`
2. **Omit<T, K>:** "I want everything EXCEPT these keys."
   - \`Omit<User, 'password'>\`

**Implementation Note:**
- \`Omit\` is implemented using \`Pick\` + \`Exclude\`.`,
        codeExample: `interface Todo {
  title: string;
  desc: string;
  completed: boolean;
  createdAt: number;
}

// Preview: only title and status
type TodoPreview = Pick<Todo, 'title' | 'completed'>;

// Form input: everything except system fields
type TodoInput = Omit<Todo, 'completed' | 'createdAt'>;`
    },
    {
        id: 'ts-util-3',
        category: 'Utility Types',
        difficulty: 'Easy',
        question: 'What is "Record<K, T>"?',
        answer: `**Constructs an object type with property keys K and values T.**

**Syntax:** \`Record<Keys, Value>\`

**Use Case:**
- Mapping IDs to Objects (Dictionary/Hash Map pattern).
- Enforcing specific keys exist.`,
        codeExample: `type Role = 'admin' | 'user' | 'guest';

// A map where keys MUST be Roles, and values are numbers (permissions)
const permissions: Record<Role, number> = {
  admin: 999,
  user: 10,
  guest: 1
  // 'manager': 50 // Error: Not in Role
};`
    },
    {
        id: 'ts-util-4',
        category: 'Utility Types',
        difficulty: 'Hard',
        question: 'How do you implement "ReturnType<T>" manually?',
        answer: `**Using Conditional Types + infer.**

**Code:**
\`type MyReturnType<T> = T extends (...args: any) => infer R ? R : never;\`

- Takes type T.
- Checks if T is a function.
- Infers the return type as R.
- Returns R.`,
        codeExample: `function create() {
  return { id: 1, type: 'demo' };
}

// Extract inferred return type
type CreatedObj = ReturnType<typeof create>;
// { id: number; type: string; }`
    },
    {
        id: 'ts-util-5',
        category: 'Utility Types',
        difficulty: 'Medium',
        question: 'What is "Exclude<T, U>" vs "Extract<T, U>"?',
        answer: `**Set operations on Unions.**

1. **Exclude<T, U>:** Remove types in U from T. (Difference).
   - "T minus U"
2. **Extract<T, U>:** Keep types in U found in T. (Intersection).
   - "Items in T that are ALSO in U"`,
        codeExample: `type Scope = 'users' | 'posts' | 'admin';
type PublicScope = 'users' | 'posts';

// 1. Exclude 'users' | 'posts' from 'admin' ... result: 'admin'
type Restricted = Exclude<Scope, PublicScope>;

// 2. Extract public items from potentially mixed bag
type Allowed = Extract<Scope, PublicScope>; // 'users' | 'posts'`
    },
    {
        id: 'ts-util-6',
        category: 'Utility Types',
        difficulty: 'Hard',
        question: 'Explain "Parameters<T>" and "ConstructorParameters<T>".',
        answer: `**utilities to extract argument types as Tuples.**

1. **Parameters<T>:** Arguments of a function type.
2. **ConstructorParameters<T>:** Arguments of a class constructor.`,
        codeExample: `function save(id: number, data: object, force: boolean) { ... }

// Args is [number, object, boolean]
type Args = Parameters<typeof save>;

// Spread args safely
const myArgs: Args = [1, { a: 1 }, true];
save(...myArgs);`
    },
    {
        id: 'ts-util-7',
        category: 'Utility Types',
        difficulty: 'Expert',
        question: 'How to make a "Required<T>" utility?',
        answer: `**Opposite of Partial. Removes optionality.**

**Implementation:**
\`type Required<T> = { [P in keyof T]-?: T[P] };\`
- The \`-?\` modifier subtracts the \`?\` token.`,
        codeExample: `interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 }; // OK

const strictObj: Required<Props> = { 
  a: 5, 
  b: 'hello' 
  // missing 'b' would error
};`
    },
    {
        id: 'ts-util-8',
        category: 'Utility Types',
        difficulty: 'Medium',
        question: 'What is "NonNullable<T>"?',
        answer: `**Strips null and undefined from a union type.**

**Use Case:**
- Cleaning up maybe-null arrays.
- Strengthening types after checks.`,
        codeExample: `type StringOrNull = string | null | undefined;

// Just 'string'
type SafeString = NonNullable<StringOrNull>;

function process(s: SafeString) {
  console.log(s.toUpperCase()); 
}`
    },
    {
        id: 'ts-util-9',
        category: 'Utility Types',
        difficulty: 'Hard',
        question: 'Implement "Awaitable<T>" or "Awaited<T>"?',
        answer: `**Handling types that might be Promises.**

**Awaited<T> (Native TS 4.5+):**
- Recursively unwraps Promises.
- \`Promise<Promise<string>>\` -> \`string\`.`,
        codeExample: `type P = Promise<string>;
type S = Awaited<P>; // string

async function getData() {
  return "result";
}

// Get the resolved value type of an async function
type Data = Awaited<ReturnType<typeof getData>>; 
// string (not Promise<string>)`
    },
    {
        id: 'ts-util-10',
        category: 'Utility Types',
        difficulty: 'Medium',
        question: 'What is "Readonly<T>"?',
        answer: `**Makes all properties readonly (shallow).**

**Note:** Nested objects are NOT made readonly unless you use a \`DeepReadonly\` custom type.`,
        codeExample: `interface Config {
  host: string;
}

const c: Readonly<Config> = { host: 'localhost' };
// c.host = 'remote'; // Error: cannot assign to 'host' because it is read-only.`
    }
];

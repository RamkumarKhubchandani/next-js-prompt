export const realWorldQuestions = [
    {
        id: 'ts-real-1',
        category: 'Real World Scenarios',
        difficulty: 'Medium',
        question: 'How to type React Props with "children"?',
        answer: `**Explicitly typing 'children' is preferred over \`FC\`.**

**React 18+:** \`FC\` no longer includes children implicitly.

**Pattern:**
- \`interface Props { children: React.ReactNode }\`
- \`ReactNode\` covers everything (JSX, strings, numbers, null).`,
        codeExample: `import React from 'react';

// 1. Explicit Definition (Best)
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="card">
      <h1>{title}</h1>
      {children}
    </div>
  );
};`
    },
    {
        id: 'ts-real-2',
        category: 'Real World Scenarios',
        difficulty: 'Hard',
        question: 'How to handle "Mixins" in TypeScript?',
        answer: `**Using Class Expression + Generics.**

**Concept:**
- A function that accepts a base class Constructor.
- Returns a new class extending that base.
- Generics preserve the type of the base class.`,
        codeExample: `// Constructor Type
type Constructor<T = {}> = new (...args: any[]) => T;

// Mixin Function
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

class User {
  name = 'Alice';
}

// Create mixed class
const TimestampedUser = Timestamped(User);

// Usage
const user = new TimestampedUser();
console.log(user.name);      // Alice
console.log(user.timestamp); // 123456...`
    },
    {
        id: 'ts-real-3',
        category: 'Real World Scenarios',
        difficulty: 'Expert',
        question: 'How do decorators work (experimental vs Stage 3)?',
        answer: `**Decorators allow metaprogramming (annotating/modifying classes).**

**Legacy (Experimental):**
- \`@decorator class A {}\`
- Requires \`experimentalDecorators: true\`.
- Widely used in Angular / NestJS.

**Stage 3 (Standard):**
- New syntax and API. Still stabilizing in ecosystem.`,
        codeExample: `function LogCalls(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    return original.apply(this, args);
  };
  
  return descriptor;
}

class Calculator {
  @LogCalls
  add(x: number, y: number) {
    return x + y;
  }
}

new Calculator().add(5, 10);
// Logs: "Calling add with [5, 10]"`
    },
    {
        id: 'ts-real-4',
        category: 'Real World Scenarios',
        difficulty: 'Medium',
        question: 'How to add custom properties to the global "window" object?',
        answer: `**Using Declaration Merging (\`declare global\`).**

**Problem:** \`window.myConfig\` errors because \`Window\` interface doesn't have it.
**Solution:** Extend the \`Window\` interface explicitly.`,
        codeExample: `// global.d.ts or inside a module
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    myConfig: {
      apiUrl: string;
    };
  }
}

// Now valid
window.myConfig = { apiUrl: 'https://api.com' };

export {}; // Ensure this is treated as a module`
    },
    {
        id: 'ts-real-5',
        category: 'Real World Scenarios',
        difficulty: 'Hard',
        question: 'What are "Ambient Declarations" (.d.ts)?',
        answer: `**Files that describe types for JS code without implementation.**

**Use Cases:**
- Using a JS library that lacks types (\`declare module 'library'\`).
- Global variables (\`declare var process: any\`).

**Note:** TS Compiler skips emitting code for \`.d.ts\` files.`,
        codeExample: `// jquery.d.ts
declare module 'jquery' {
  export function ajax(url: string, settings?: any): void;
}

// main.ts
import * as $ from 'jquery';
$.ajax('/api'); // Typescript knows this signature now`
    },
    {
        id: 'ts-real-6',
        category: 'Real World Scenarios',
        difficulty: 'Medium',
        question: 'How to type an Event Handler in React?',
        answer: `**Using \`React.ChangeEvent\` or \`React.FormEvent\`.**

**Pro Tip:** Pass the generic element type: \`ChangeEvent<HTMLInputElement>\`.`,
        codeExample: `import React, { useState } from 'react';

const Input = () => {
  const [val, setVal] = useState('');

  // Explicit Handler Type
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value); // TS knows 'value' exists on Input
  };

  return <input onChange={handleChange} />;
};`
    },
    {
        id: 'ts-real-7',
        category: 'Real World Scenarios',
        difficulty: 'Medium',
        question: 'Difference between "module" and "script" in TypeScript?',
        answer: `**Top-level import/export defines a Module.**

**Module:**
- Has its own scope. Variables are not global.
- Files with \`import/export\` are modules.

**Script:**
- Global scope.
- Files without \`import/export\`.
- Danger: Variables can collide with other scripts.`,
        codeExample: `// fileA.ts
const x = 1; // Error if 'x' exists in fileB.ts (Global collision)

// fileB.ts
export {}; // Now it's a module
const x = 1; // OK (Private to module)`
    },
    {
        id: 'ts-real-8',
        category: 'Real World Scenarios',
        difficulty: 'Hard',
        question: 'How to create a Branded Type (Nominal Typing)?',
        answer: `**Simulating nominal typing in a structural system.**

**Technique:**
- Add a fake property (\`__brand\`) to a primitive type.
- Prevents accidentally mixing up types (USD vs EUR).`,
        codeExample: `type USD = number & { __brand: 'USD' };
type EUR = number & { __brand: 'EUR' };

function dollars(val: number): USD {
  return val as USD;
}

function euros(val: number): EUR {
  return val as EUR;
}

const d = dollars(10);
const e = euros(10);

// function pay(amount: USD) { ... }
// pay(e); // Error: Type 'EUR' is not assignable to 'USD'`
    },
    {
        id: 'ts-real-9',
        category: 'Real World Scenarios',
        difficulty: 'Medium',
        question: 'What is the "Opaque Type" pattern?',
        answer: `**Same as Branded Types.**
    
It hides internal implementation details and prevents structural compatibility. Used often in Domain Driven Design (DDD) for IDs (\`UserId\`, \`OrderId\`).`,
        codeExample: `declare const OpaqueSym: unique symbol;

type UserId = string & { [OpaqueSym]: 'UserId' };

function createUserId(id: string): UserId {
  return id as UserId;
}

// You can use UserId as string (sometimes), but you can't pass random string as UserId.`
    },
    {
        id: 'ts-real-10',
        category: 'Real World Scenarios',
        difficulty: 'Easy',
        question: 'How to ignore typescript errors (ts-ignore vs ts-expect-error)?',
        answer: `**Suppressing errors.**

1. **@ts-ignore:** "Silence this error forever."
   - Dangerous if code changes and error is fixed (you won't know).
2. **@ts-expect-error:** "I expect an error here."
   - **Better:** If the line *stops* having an error, TS will complain ("Unused @ts-expect-error"). This forces you to clean up hacks.`,
        codeExample: `// Best Practice
// @ts-expect-error: External library has wrong types here
library.doSomethingIllegal();

// If library updates and fixes types, TS will tell me to remove the comment.`
    }
];

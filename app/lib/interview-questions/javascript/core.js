export const coreQuestions = [
        {
                id: 'js-3',
                category: 'Scope & Closures',
                difficulty: 'Medium',
                question: 'What is a Closure?',
                answer: `A Closure is a function paired with its lexical environment.

### The Mental Model: "The Backpack"
When a function is created, it gets a hidden "backpack" containing precise links to all variables that were in scope at that moment.
Even if you export the function to a completely different part of your codebase, it carries this backpack with it.

### Why is this efficient?
It does **not** copy the values. It keeps a live **reference**. 
If the outer scope updates the variable, the closure sees the new value.

### Use Cases
1. **Data Privacy (Encapsulation):** Hiding \`count\` so user can't do \`count = 999\`.
2. **Partial Application:** \`add(5)\` returns a function that remembers \`5\`.
3. **React Hooks:** \`useEffect\` captures the initial state of props.`,
                codeExample: `function createAccount(initialBalance) {
  let _balance = initialBalance; // Private variable
  
  return {
    deposit: (amount) => {
      _balance += amount;
      return _balance;
    },
    // We don't expose _balance directly!
  };
}

const myAcc = createAccount(100);
myAcc.deposit(50); // 150
// myAcc._balance is undefined. Totally safe.`
        },
        {
                id: 'js-4',
                category: 'Async JS',
                difficulty: 'Medium',
                question: 'Explain the Event Loop.',
                answer: `The engine's way of juggling tasks.

JavaScript is Single-Threaded. It has **one** Call Stack.
**Problem:** If you run \`while(true)\`, the browser freezes.
**Solution:** The Event Loop.

### The 3 Players:
1. **Call Stack:** The main stage. Executes your JS.
2. **Web APIs:** Backstage crew (Browser). Sets timers, makes network requests (C++ threads).
3. **Queue:** The waiting line. When Web API is done, it puts the callback here.

### The Algorithm:
1. Is the **Stack** empty? 
2. No? Keep executing.
3. Yes? Take the first item from the **Queue** and push it onto the **Stack**.

**Crucial:** Use \`setTimeout\`, \`fetch\`, and DOM events to offload work to the Web APIs.`,
                codeExample: `console.log('1. Start');

// Offloaded to Web API.
// 0ms doesn't mean "now". It means "Queue this ASAP".
setTimeout(() => {
  console.log('3. Timeout');
}, 0);

console.log('2. End');

// Result: 1, 2, 3. 
// Even with 0ms, it MUST go to the Queue and wait for Stack to clear.`
        },
        {
                id: 'js-5',
                category: 'Objects',
                difficulty: 'Medium',
                question: 'What is `this` keyword?',
                answer: `**The "Who Called Me?" Rule.**
\`this\` is not determined by where the function is written, but by how it is **invoked**.

### 1. Implicit Binding (Left of the Dot)
\`user.greet()\` -> \`this\` is \`user\`.

### 2. Explicit Binding (Force it)
\`greet.call(admin)\` -> \`this\` is \`admin\`.

### 3. New Binding (Constructor)
\`new User()\` -> \`this\` is the brand new object.

### 4. Default Binding (Standalone)
\`greet()\` -> \`this\` is \`window\` (or \`undefined\` in strict mode).

### The Arrow Exception
Arrow functions **ignore all rules**. They don't have a \`this\`. They treat \`this\` like a variable \`x\` and look it up in the outer scope (Lexical Scoping).`,
                codeExample: `const obj = {
  name: "Alice",
  regular() {
    console.log(this.name); // "Alice" (obj calling)
  },
  arrow: () => {
    console.log(this.name); // undefined (Window calling)
  }
};

const loose = obj.regular;
loose(); // Error/undefined! (Called without dot)`
        },
        { id: 'js-6', category: 'ES6+', difficulty: 'Medium', question: 'What is the difference between `null` and `undefined`?', answer: '`undefined` means a variable has been declared but not yet assigned a value. It is the default state. `null` is an assignment value. It can be assigned to a variable as a representation of no value. `null` is an object (bug in JS), `undefined` is a type itself.', codeExample: null },
        { id: 'js-7', category: 'ES6+', difficulty: 'Medium', question: 'What is destructuring assignment?', answer: 'A syntax that allows you to unpack values from arrays, or properties from objects, into distinct variables. It makes code cleaner and reduces reliance on temporary variables.', codeExample: `const { name, age } = user; \nconst [first, second] = colors;` },
        { id: 'js-8', category: 'Async', difficulty: 'Medium', question: 'What are Promises?', answer: 'A Promise is an object representing the eventual completion or failure of an asynchronous operation. It avoids "callback hell". It has 3 states: Pending, Fulfilled (Resolved), or Rejected.', codeExample: null },
        { id: 'js-9', category: 'ES6+', difficulty: 'Easy', question: 'What are Template Literals?', answer: 'String literals allowing embedded expressions. You can use multi-line strings and string interpolation features with them.', codeExample: 'const greeting = `Hello ${name}!`;' },
        { id: 'js-11', category: 'ES6+', difficulty: 'Medium', question: 'Explain `map` vs `forEach`.', answer: '`forEach` iterates over an array and executes a function for each item but returns `undefined`. It is for side effects. `map` iterates and returns a NEW array with the transformed elements. It is for data transformation.', codeExample: null },
        { id: 'js-12', category: 'Objects', difficulty: 'Medium', question: 'What is Prototypal Inheritance?', answer: 'In JS, objects inherit directly from other objects. Every object has a hidden property `[[Prototype]]` (exposed as `__proto__`) linking to another object. When you access a property, JS looks up this chain until it finds it or hits null.', codeExample: null },
        { id: 'js-13', category: 'Async', difficulty: 'Medium', question: 'What is `async` / `await`?', answer: 'Syntactic sugar built on top of Promises. It makes asynchronous code look and behave like synchronous code, making it much easier to read and debug.', codeExample: `async function fetchUser() { \n  const res = await fetch('/api/user'); \n  return res.json(); \n}` },
        { id: 'js-14', category: 'ES6+', difficulty: 'Easy', question: 'What is the Spread Operator (...) ?', answer: 'It expands an iterable (like an array or string) into individual elements. Used for merging arrays/objects or passing arguments.', codeExample: `const merged = [...arr1, ...arr2];` },
        { id: 'js-18', category: 'ES6+', difficulty: 'Medium', question: 'What is a Set?', answer: 'A collection of unique values. Values can be primitive or object references. Useful for removing duplicates from an array.', codeExample: `const unique = [...new Set([1, 1, 2])]; // [1, 2]` },
        {
                id: 'js-23',
                category: 'ES6+',
                difficulty: 'Medium',
                question: 'WeakMap vs Map?',
                answer: `**Memory Management is the key.**

### Map (Strong Reference)
- Keys can be anything (objects, primitives).
- It holds the key typically. If you lose all other references to the key, the Map *still* holds it, preventing Garbage Collection.

### WeakMap (Weak Reference)
- Keys **must** be Objects.
- The reference is "weak". If the key object is deleted everywhere else in your app, the Garbage Collector **removes it from the WeakMap automatically**.

### Use Case: DOM Metadata
You want to track if a button was clicked.
\`const clicks = new WeakMap();\`
\`clicks.set(buttonDOM, 5);\`
If the button is removed from the DOM, the entry in \`clicks\` vanishes. No memory leak.`,
    codeExample: `let user = { name: "Alice" };
const map = new Map();
const weakMap = new WeakMap();

map.set(user, "metadata");
weakMap.set(user, "metadata");

user = null; // Remove reference

// Map: Keeps { name: "Alice" } in memory forever.
// WeakMap: The object is Garbage Collected. Entry removed.`
  },
        {
                id: 'js-24',
                category: 'Advanced',
                difficulty: 'Hard',
                question: 'What are Generators?',
                answer: `Generators(\`function*\`) allow you to write functions that can be **paused** and **resumed**.

### Behavior
- They don't run immediately. They return an **Iterator**.
- Calling \`next()\` runs code until the next \`yield\`.
- \`yield\` is like a "soft return". It spits out a value but stays in memory.

### Use Cases
1. **Infinite Streams:** \`while(true) { yield id++ }\`. Efficient, lazy evaluation.
2. **State Machines:** Managing complex state flows (like Redux-Saga).
3. **Async Control:** Before \`async/await\`, generators + promises (like the \`co\` library) were the only way to write flat async code.`,
                codeExample: `function* idGenerator() {
  let id = 1;
  while(true) {
    yield id++; 
  }
}

const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
// It pauses at the 'yield' line forever waiting for you.`
        },
        {
                id: 'js-25',
                category: 'Advanced',
                difficulty: 'Hard',
                question: 'Explain Currying.',
                answer: `Currying is transforming a function \`f(a, b, c)\` into \`f(a)(b)(c)\`.

### Why bother?
It enables **Partial Application**. You can "fix" some arguments now and get a specialized function for later use.

### Example
Imagine a generic \`hasPermission(role, user)\`.
You can Curry it to create \`const checkAdmin = hasPermission('admin')\`.
Now you can pass \`checkAdmin\` around your app. The 'admin' argument is baked in.`,
                codeExample: `const add = (a) => (b) => a + b;

const add10 = add(10); // "Remembers" 10
console.log(add10(5));  // 15
console.log(add10(20)); // 30`
        },
        { id: 'js-28', category: 'Async', difficulty: 'Medium', question: 'What is callback hell?', answer: 'The situation where callbacks are nested within other callbacks several levels deep, making code hard to read and maintain. Also known as the "Pyramid of Doom". Solutions include Promises and Async/Await.', codeExample: null },
        { id: 'js-30', category: 'ES6+', difficulty: 'Medium', question: 'What is the Symbol type?', answer: 'Symbol is a unique and immutable primitive introduced in ES6. It is often used to identify object properties that you don\'t want to collide with other properties, effectively creating "hidden" properties.', codeExample: `const sym = Symbol('desc');` },
        {
                id: 'js-33',
                category: 'Advanced',
                difficulty: 'Medium',
                question: 'What is Memoization?',
                answer: `Optimization technique. "Don't calculate the same thing twice."

### Logic
1. Check if we have seen these inputs before (\`cache[inputs]\`).
2. Yes? Return saved result.
3. No? Run Function. Save result. Return result.

### Cost
It trades **Space** (Memory for cache) for **Time** (CPU cycles).`,
                codeExample: null
        },
        {
                id: 'js-35',
                category: 'Advanced',
                difficulty: 'Medium',
                question: 'Stack vs Heap Memory: Where does data go?',
                answer: `**Primitives (Stack)** vs **References (Heap)**.

### Stack (Orderly, Fast)
- Stores Primitives (\`10, "hi", true\`).
- Stores *References* (pointers) to Objects.
- Local variables live here.
- Cleans up automatically when function exits.

### Heap (Messy, Slow)
- Stores **Objects** (\`{...}, [...]\`).
- Memory is unstructured.
- Managed by the Garbage Collector (GC).

### The "Assignment" Trap
\`let b = a\`.
- If 'a' is Primitive: **Copy** value.
- If 'a' is Object: **Copy** pointer (Reference). Both point to the same Heap address.`,
                codeExample: null
        },
        { id: 'js-36', category: 'Async', difficulty: 'Hard', question: 'What is a Race Condition?', answer: 'A race condition occurs when two or more asynchronous operations execute in an unexpected order, leading to unpredictable results. e.g., Older XHR returning after New XHR.', codeExample: null },
        { id: 'js-37', category: 'ES6+', difficulty: 'Medium', question: 'What are Template Literals?', answer: 'String literals allowing embedded expressions. They use backticks instead of quotes and allow multi-line strings and interpolation with `\${variable}`.', codeExample: null },
        { id: 'js-39', category: 'Advanced', difficulty: 'Hard', question: 'What is "Tree Shaking"?', answer: 'Dead Code Elimination. It requires **ES Modules** (\`import/export\`) because they are static. The bundler sees `export const a\`, notices `a` is never imported, and deletes it from the final file.', codeExample: null },
        { id: 'js-40', category: 'Objects', difficulty: 'Medium', question: 'Why are arrays objects?', answer: 'In JS, almost everything is an object. Arrays are simply specialized objects where keys are numbers (indices) and they have a magic `length` property and prototype methods like `push`/`pop`.', codeExample: null },
        {
                id: 'js-41',
                category: 'Advanced',
                difficulty: 'Tricky',
                question: 'Pass-by-Value vs Pass-by-Reference in JS?',
                answer: `JS is technically **Pass-by-Value**.

When you pass an object to a function:
It passes the **Value of the Reference** (the memory address).
It does **NOT** pass the object itself.

**Proof:**
You can modify the *contents* of the house (mutate object).
But you cannot switch the *house itself* (reassign variable) for the outside world.`,
                codeExample: `function tryReassign(obj) {
  obj = { x: 99 }; // Reference overwritten locallly
}
const myObj = { x: 1 };
tryReassign(myObj);
console.log(myObj.x); // still 1. Reassignment failed.`
        },
        { id: 'js-42', category: 'ES6+', difficulty: 'Medium', question: 'What are arrow functions good for?', answer: '1. Scoping `this` (they don\'t bind their own). 2. Concise syntax (implicit return). They are NOT good for object methods or constructors.', codeExample: null },
        { id: 'js-44', category: 'Async', difficulty: 'Medium', question: 'Can you cancel a Promise?', answer: 'Natively, no. A Promise cannot be cancelled once created. However, usage patterns like `AbortController` (for fetch) can cancel the underlying operation.', codeExample: null },
        { id: 'js-45', category: 'Advanced', difficulty: 'Hard', question: 'Function Declaration vs Expression: Why does it matter?', answer: '**Hoisting.** Declarations (\`function f()\`) float to the top. Expressions (\`const f = () =>\`) stay where they are (dead zone).', codeExample: null },
        {
                id: 'js-47',
                category: 'Advanced',
                difficulty: 'Medium',
                question: 'Explain \`requestAnimationFrame\` vs \`setInterval\`.',
                answer: `Why is your animation stuttering?

### setInterval(fn, 16)
- Tries to run every 16ms.
- **Blind:** It attempts to run even if the browser is minimized, lagging, or repainting.
- Result: Dropped frames, battery drain, "Jank".

### requestAnimationFrame(fn)
- **Browser Controlled:** Asks the browser "Call me when you are ready to paint the next frame".
- **Synced:** Matches screen refresh rate (60Hz, 144Hz).
- **Efficient:** Pauses completely when tab is inactive.
- **Smooth:** Browser optimizes all DOM changes into a single Main Thread cycle.

### Rule of Thumb
Game Loops / Animation -> \`requestAnimationFrame\`.
Clock / Polling -> \`setInterval\`. `,
    codeExample: `function animate() {
  box.style.left = (parseInt(box.style.left) + 1) + 'px';
  requestAnimationFrame(animate); // Recursion
}
requestAnimationFrame(animate);`
  },
        {
                id: 'js-49',
                category: 'Advanced',
                difficulty: 'Hard',
                question: 'What is a "Thunk"?',
                answer: `A delayed unit of work.
In Redux, a "Thunk" is a function that wraps an expression to delay its evaluation.
It allows you to perform async logic * before * dispatching a Redux action.`,
                codeExample: null
        },
        {
                id: 'js-58',
                category: 'Advanced',
                difficulty: 'Hard',
                question: 'What is a Proxy?',
                answer: `A "Trap" for objects.
You can intercept basic operations like \`get\`, \`set\`, \`has\`, \`delete\`.

**Use Cases:**
1. **Validation:** Throw error if setting \`age < 0\`.
2. **Magic APIs:** Return "default" values for missing keys.
3. **Observability:** Log every time a specific property is accessed.`,
        codeExample: `const validator = {
  set(obj, prop, value) {
    if (prop === 'age' && value < 0) {
      throw new Error('Age must be positive');
    }
    obj[prop] = value;
    return true;
  }
};`
},
{
        id: 'js-59',
                category: 'Advanced',
                        difficulty: 'Hard',
                                question: 'What is the "Temporal Dead Zone" really?',
                                        answer: `The gap between the start of the block scope and the line where declaring \`let/const\` occurs.
Any access in this gap creates a \`ReferenceError\`.
This prevents "tried to use before defined" bugs.`,
                                                codeExample: null
},
{ id: 'js-89', category: 'ES6+', difficulty: 'Medium', question: 'What is `BigInt`?', answer: 'A primitive for integers larger than `2^53 - 1`. `10n + 10n` works. `10n + 10` throws error (no implicit type conversion).', codeExample: null },
{ id: 'js-90', category: 'ES6+', difficulty: 'Medium', question: 'What is `Intl` API?', answer: 'Built-in formatter for Dates, Currencies, and Numbers. Never use a 200kb library just to format a date again.', codeExample: null },
{ id: 'js-91', category: 'Advanced', difficulty: 'Hard', question: 'WeakRef and FinalizationRegistry?', answer: '**Expert RAM Management.**\n\n**WeakRef:** "I want to hold this object, but if the GC wants to delete it, let it."\n**FinalizationRegistry:** "Call this function when this object gets deleted from memory."', codeExample: null },
{
        id: 'js-92',
                category: 'Advanced',
                        difficulty: 'Hard',
                                question: 'What is "Tail Call Optimization" (TCO)?',
                                        answer: `A feature where the engine reuses the Stack Frame for recursive functions if the *last* action is a function call.
    
**Status:** Only Safari supports this reliable. In Chrome/Node, you still get Stack Overflow for deep recursion unless you manually unroll the loop.`,
                                                codeExample: null
},
];

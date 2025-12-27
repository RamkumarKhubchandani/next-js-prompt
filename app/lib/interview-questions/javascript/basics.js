export const basicsQuestions = [
    {
        id: 'js-1',
        category: 'Basics',
        difficulty: 'Easy',
        question: 'What are the differences between `var`, `let`, and `const`?',
        answer: `This is the classic starting question, but the devil is in the details.

**1. Scope:**
\`var\` is **function-scoped**. This means if you declare it inside a loop or an \`if\` block, it 'leaks' out to the entire function. This was a major source of bugs in older JS applications.
\`let\` and \`const\` are **block-scoped**. They only exist within the nearest set of curly braces \`{}\`. This makes them predictable and safe, matching how variables work in most other languages (Java, C++, etc.).

**2. Hoisting & The Temporal Dead Zone (TDZ):**
All three are technically hoisted (lifted to the top of their scope). However, \`var\` is initialized with \`undefined\`, so you can access it before the line where you wrote it (though it will be undefined).
\`let\` and \`const\` are hoisted but **uninitialized**. Accessing them before their declaration line throws a \`ReferenceError\`. This period of "unreachability" is called the **Temporal Dead Zone**.

**3. Reassignment:**
\`var\` and \`let\` can be updated. \`const\` cannot be reassigned. However, **important note**: \`const\` does not make objects immutable. You can still modify properties of an object or push to an array declared with \`const\`.`,
        codeExample: `// The "var" trap
if (true) {
  var leaky = "I exist outside!";
}
console.log('Var leaks:', leaky); // "I exist outside!"

// Block-scoped let
if (true) {
  let blocked = "I'm trapped!";
}
// console.log(blocked); // ReferenceError!

// The "const" misconception
const user = { name: "Alice" };
user.name = "Bob"; // Totally fine!
console.log('Mutated const object:', user.name); // "Bob"
// user = {}; // Error: Assignment to constant variable.`
    },
    {
        id: 'js-2',
        category: 'Basics',
        difficulty: 'Easy',
        question: 'What is the difference between `==` and `===`?',
        answer: `**== (Abstract Equality):**
Performs **type coercion** before comparing. If the types are different, JS tries to convert them to a common type.
e.g., \`5 == "5"\` is \`true\` because the string "5" is converted to the number 5.

**=== (Strict Equality):**
Checks both **value** AND **type**. No conversion happens.
e.g., \`5 === "5"\` is \`false\`.

**Pro Advice:**
Always use \`===\` unless you have a very specific reason not to (like checking for null/undefined simultaneously with \`x == null\`). \`==\` leads to confusing bugs like \`[] == ![]\` being true.`,
        codeExample: `console.log('5 == "5":', 5 == "5"); // true (coercion)
console.log('5 === "5":', 5 === "5"); // false (strict)
console.log('null == undefined:', null == undefined); // true
console.log('null === undefined:', null === undefined); // false
console.log('[] == ![]:', [] == ![]); // true (weird!)`
    },
    {
        id: 'js-10', category: 'DOM', difficulty: 'Easy', question: 'What is the DOM?', answer: 'The Document Object Model. It is an interface that treats an HTML document as a tree structure where each node is an object representing a part of the document (element, text, comment).', codeExample: `// DOM manipulation examples
console.log('Document title:', document.title);
console.log('Body element:', document.body.tagName);
console.log('All paragraphs:', document.querySelectorAll('p').length);` },
    {
        id: 'js-15', category: 'Basics', difficulty: 'Tricky', question: 'What is Hoisting?', answer: 'The behavior where variable and function declarations are moved to the top of their containing scope during the compilation phase. Only declarations are hoisted, not initializations.', codeExample: `console.log('x before:', x); // undefined (hoisted)
var x = 5;
console.log('x after:', x); // 5

// Function hoisting
greet(); // Works! Function declarations are hoisted
function greet() { console.log('Hello!'); }` },
    {
        id: 'js-16', category: 'DOM', difficulty: 'Medium', question: 'What is Event Bubbling?', answer: 'When an event triggers on a DOM element, it first runs the handlers on that element, then on its parent, then on its ancestors, all the way up to the window. You can stop it with `e.stopPropagation()`.', codeExample: `// Event bubbling simulation
const parent = { name: 'parent', click: () => console.log('Parent clicked') };
const child = { name: 'child', click: () => console.log('Child clicked') };

// Simulating bubbling
child.click(); // Child clicked
parent.click(); // Then parent clicked (bubbles up)` },
    {
        id: 'js-17', category: 'Basics', difficulty: 'Medium', question: 'Higher-Order Function?', answer: 'A function that either takes another function as an argument or returns a function. Examples: `map`, `filter`, `setTimeout`, event listeners.', codeExample: `// Higher-order function examples
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled); // [2, 4, 6, 8]

// Function returning function
const multiplier = (factor) => (n) => n * factor;
const triple = multiplier(3);
console.log('Triple 5:', triple(5)); // 15` },
    {
        id: 'js-19', category: 'Basics', difficulty: 'Easy', question: 'Does JS have Classes?', answer: 'Yes (since ES6), but they are syntactic sugar over the existing prototypal inheritance model. They do not work like classes in Java or C++.', codeExample: `class Person {
  constructor(name) { this.name = name; }
  greet() { console.log('Hello, I am ' + this.name); }
}

const alice = new Person('Alice');
alice.greet(); // "Hello, I am Alice"
console.log('Is function?', typeof Person); // "function" (not a true class!)` },
    {
        id: 'js-20', category: 'DOM', difficulty: 'Medium', question: 'Difference between `defer` and `async` scripts?', answer: 'Both download asynchronously without blocking HTML parsing. `async` executes immediately when downloaded (blocks rendering then). `defer` ensures execution waits until the HTML parsing is fully complete. `defer` is usually safer.', codeExample: `// Script loading behavior
console.log('Script execution order matters!');

// defer: Waits for HTML parsing
// async: Executes immediately when downloaded
// normal: Blocks HTML parsing

console.log('Use defer for scripts that need DOM');` },
    {
        id: 'js-21',
        category: 'Basics',
        difficulty: 'Easy',
        question: 'Can you explain the module pattern?',
        answer: `Before ES6 modules, the Module Pattern was used to create private scopes. It typically uses an IIFE that returns an object exposing only the public methods, keeping variables private inside the closure scope.

**Why it matters:**
It was the de-facto way to bundle code and prevent global scope pollution before \`import/export\` became standard. You'll still see this in legacy codebases and libraries (UMD builds).`,
        codeExample: `const heavyModule = (function() {
  const privateValue = "secret";
  return {
    publicValue: "visible",
    publicMethod: () => console.log("Hello from " + privateValue + "!")
  };
})();

// DEMO
console.log('Public value:', heavyModule.publicValue); // "visible"
heavyModule.publicMethod(); // "Hello from secret!"
console.log('Private value:', heavyModule.privateValue); // undefined`
    },
    {
        id: 'js-22',
        category: 'DOM',
        difficulty: 'Medium',
        question: 'What is the Critical Rendering Path?',
        answer: `The Critical Rendering Path is the sequence of steps the browser goes through to convert HTML, CSS, and JS into pixels on the screen. 
1. DOM Construction (HTML)
2. CSSOM Construction (CSS)
3. Render Tree (DOM + CSSOM)
4. Layout (Geometry)
5. Paint (Pixels)

**Optimization:**
Minimizing blocking resources (like large synchronous JS scripts in \`<head>\`) is key to improving the "First Contentful Paint" (FCP).`,
        codeExample: null
    },
    {
        id: 'js-26', category: 'Basics', difficulty: 'Easy', question: 'What is strict mode?', answer: 'Strict mode (`"use strict"`) catches common coding bloopers, throwing exceptions. It prevents using undeclared global variables, duplicate parameter names, and usage of future reserved keywords. It makes code more robust.', codeExample: `"use strict";

// This would throw error in strict mode:
// x = 10; // ReferenceError: x is not defined

// Must declare variables
let y = 10;
console.log('Strict mode enabled, y =', y);

// Prevents duplicate params
// function bad(a, a) {} // SyntaxError in strict mode` },
    {
        id: 'js-29', category: 'DOM', difficulty: 'Medium', question: 'SessionStorage vs LocalStorage?', answer: 'Both store data on the client. `localStorage` persists until explicitly deleted. `sessionStorage` performs mostly the same, but data persists only as long as the window or tab is open. Both have a limit around 5MB.', codeExample: `// localStorage persists forever
localStorage.setItem('user', 'Alice');
console.log('localStorage:', localStorage.getItem('user'));

// sessionStorage clears on tab close
sessionStorage.setItem('temp', 'data');
console.log('sessionStorage:', sessionStorage.getItem('temp'));` },
    {
        id: 'js-31', category: 'DOM', difficulty: 'Easy', question: 'What is the difference between specific document methods?', answer: '`getElementById` returns one element. `querySelector` returns the first match. `querySelectorAll` returns a NodeList of all matches. `getElementsByClassName` returns a live HTMLCollection.', codeExample: `// Different query methods
console.log('By ID:', document.getElementById('root'));
console.log('Query selector:', document.querySelector('.class'));
console.log('Query all:', document.querySelectorAll('p').length);
console.log('By class:', document.getElementsByClassName('class').length);` },
    {
        id: 'js-34', category: 'Basics', difficulty: 'Easy', question: 'What is a Polyfill?', answer: 'A piece of code (usually JS) used to provide modern functionality on older browsers that do not natively support it. e.g., Adding `Array.prototype.includes` to IE11.', codeExample: `// Polyfill example for Array.includes
if (!Array.prototype.includes) {
  Array.prototype.includes = function(search) {
    return this.indexOf(search) !== -1;
  };
}

const arr = [1, 2, 3];
console.log('Includes 2:', arr.includes(2)); // true` },
    { id: 'js-38', category: 'DOM', difficulty: 'Easy', question: 'Attribute vs Property?', answer: 'Attributes are defined in the HTML (initial state). Properties are in the DOM tree (current state). Changing the `value` property of an input changes the current text, but `getAttribute("value")` will typically return the initial value.', codeExample: null },
    {
        id: 'js-43', category: 'Basics', difficulty: 'Easy', question: 'What is JSON?', answer: 'JavaScript Object Notation. It is a text format for storing and transporting data. It is language independent but derived from JS object syntax. Keys must be quoted strings.', codeExample: `const obj = { name: 'Alice', age: 25 };
const json = JSON.stringify(obj);
console.log('JSON string:', json);

const parsed = JSON.parse(json);
console.log('Parsed back:', parsed.name); // "Alice"` },
    {
        id: 'js-46', category: 'DOM', difficulty: 'Easy', question: 'What is the BOM?', answer: 'Browser Object Model. It represents the browser window rather than the document content. Examples: `navigator`, `history`, `screen`, `location`, `localStorage`.', codeExample: `// BOM examples
console.log('User Agent:', navigator.userAgent);
console.log('Current URL:', location.href);
console.log('Screen width:', screen.width);
console.log('History length:', history.length);` },
    { id: 'js-50', category: 'Basics', difficulty: 'Easy', question: 'What is the "use client" directive?', answer: 'Specific to React Server Components (Next.js). It marks a file as a "Client Component", allowing it to use hooks (`useState`) and browser APIs, at the cost of being bundled to the client.', codeExample: null },

    // Web API
    {
        id: 'js-93',
        category: 'Web API',
        difficulty: 'Medium',
        question: 'What is \`IntersectionObserver\`?',
        answer: `Asynchronously observes changes in the intersection of a target element with an ancestor or viewport. Perfect for Infinite Scroll and Lazy Loading images.`,
        codeExample: null
    },
    {
        id: 'js-94',
        category: 'Web API',
        difficulty: 'Medium',
        question: 'What is \`MutationObserver\`?',
        answer: `Watches for changes to the DOM tree (attributes, child nodes, text).
**Use Case:** Reacting to DOM changes made by 3rd party scripts.`,
        codeExample: null
    },
    {
        id: 'js-95',
        category: 'Web API',
        difficulty: 'Medium',
        question: 'What is \`ResizeObserver\`?',
        answer: `Notifies you when an element's dimensions change. More performant than listening to window 'resize' event because it targets specific elements.`,
        codeExample: null
    },
];

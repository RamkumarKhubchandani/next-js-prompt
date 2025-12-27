export const javascriptAssessment = {
    id: "javascript-certification",
    title: "JavaScript Certification",
    description: "Prove your mastery of the weird parts: Prototypes, Closures, Event Loop, and Asynchronous JS.",
    questions: [
        {
            id: "js-1",
            question: "What is the output of `console.log(typeof null)`?",
            options: ["'null'", "'undefined'", "'object'", "'number'"],
            correctAnswer: 2,
            explanation: "This is a famous bug in JavaScript. `null` is an object type, but it is a primitive value."
        },
        {
            id: "js-2",
            question: "Which phase of the Event Loop handles `setTimeout` callbacks?",
            options: ["Poll phase", "Check phase", "Timers phase", "Microtask queue"],
            correctAnswer: 2,
            explanation: "The Timers phase executes callbacks scheduled by `setTimeout()` and `setInterval()`."
        },
        {
            id: "js-3",
            question: "What is a Closure?",
            options: [
                "A function that has access to its outer function scope even after the outer function has returned",
                "A function that is immediately invoked",
                "A block of code that runs asynchronously",
                "A method to close a database connection"
            ],
            correctAnswer: 0,
            explanation: "A closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created."
        },
        {
            id: "js-4",
            question: "What is the difference between `==` and `===`?",
            options: [
                "`==` checks value, `===` checks value and type",
                "`==` checks type, `===` checks value",
                "They are identical",
                "`===` is deprecated"
            ],
            correctAnswer: 0,
            explanation: "`==` performs type coercion before comparison, while `===` (strict equality) does not."
        },
        {
            id: "js-5",
            question: "What is the Prototype Chain?",
            options: [
                "A linked list of DOM elements",
                "The mechanism by which objects inherit features from one another",
                "A chain of promises",
                "The order in which scripts are loaded"
            ],
            correctAnswer: 1,
            explanation: "When you access a property on an object, if it's not found, the engine looks at the object's prototype, and so on, until it reaches null."
        },
        {
            id: "js-6",
            question: "Which of the following creates a Microtask?",
            options: ["setTimeout", "setImmediate", "Promise.resolve().then()", "I/O callback"],
            correctAnswer: 2,
            explanation: "Promises use the Microtask queue, which has higher priority than the Macrotask queue (timers, I/O)."
        },
        {
            id: "js-7",
            question: "What is the purpose of `use strict`?",
            options: [
                "To enable experimental features",
                "To enforce stricter parsing and error handling in your code",
                "To allow using undeclared variables",
                "To make the code run faster"
            ],
            correctAnswer: 1,
            explanation: "Strict mode eliminates some JavaScript silent errors by changing them to throw errors and prohibits some syntax likely to be defined in future versions."
        },
        {
            id: "js-8",
            question: "How does `this` work in an Arrow Function?",
            options: [
                "It refers to the object that called the function",
                "It is undefined",
                "It captures the `this` value of the enclosing context (lexical scoping)",
                "It always refers to the global object"
            ],
            correctAnswer: 2,
            explanation: "Arrow functions do not have their own `this`. They inherit `this` from the parent scope at the time they are defined."
        },
        {
            id: "js-9",
            question: "What is Hoisting?",
            options: [
                "Moving element to the top of the DOM",
                "Moving variable and function declarations to the top of their scope",
                "Lifting state up in React",
                "Increasing the priority of a thread"
            ],
            correctAnswer: 1,
            explanation: "Hoisting is JavaScript's default behavior of moving declarations to the top. Note that `let` and `const` are hoisted but not initialized (Temporal Dead Zone)."
        },
        {
            id: "js-10",
            question: "What is the difference between `null` and `undefined`?",
            options: [
                "`undefined` means a variable has been declared but not defined; `null` is an assignment value",
                "`null` is an error; `undefined` is a value",
                "They are the same",
                "`undefined` is an object; `null` is a string"
            ],
            correctAnswer: 0,
            explanation: "`undefined` is the default value of uninitialized variables. `null` is a value that represents no value, usually assigned intentionally."
        },
        {
            id: "js-11",
            question: "What is the purpose of `bind()`?",
            options: [
                "To link two variables together",
                "To create a new function that, when called, has its `this` keyword set to the provided value",
                "To bind an event listener",
                "To join strings"
            ],
            correctAnswer: 1,
            explanation: "The `bind()` method creates a new function that, when called, has its `this` keyword set to the provided value."
        },
        {
            id: "js-12",
            question: "What is Event Bubbling?",
            options: [
                "When an event triggers on the deepest element and then triggers on parents in nesting order",
                "When an event triggers on the outermost element and goes down",
                "When events are cancelled",
                "When too many events crash the browser"
            ],
            correctAnswer: 0,
            explanation: "Event bubbling is a type of event propagation where the event first triggers on the innermost target element, and then successively triggers on the ancestors (parents) of the target element."
        },
        {
            id: "js-13",
            question: "Which method is used to prevent the default action of an event?",
            options: ["event.stopPropagation()", "event.preventDefault()", "event.stopImmediatePropagation()", "return false"],
            correctAnswer: 1,
            explanation: "`preventDefault()` tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be."
        },
        {
            id: "js-14",
            question: "What is a Promise?",
            options: [
                "A guarantee that the code will not fail",
                "An object representing the eventual completion or failure of an asynchronous operation",
                "A function that runs immediately",
                "A strict mode feature"
            ],
            correctAnswer: 1,
            explanation: "A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason."
        },
        {
            id: "js-15",
            question: "What is the difference between `let` and `var`?",
            options: [
                "`let` is block-scoped, `var` is function-scoped",
                "`var` is block-scoped, `let` is function-scoped",
                "`let` allows redeclaration, `var` does not",
                "There is no difference"
            ],
            correctAnswer: 0,
            explanation: "`let` (and `const`) are block-scoped statements. `var` is function-scoped and is hoisted with initialization to `undefined`."
        },
        {
            id: "js-16",
            question: "What is the purpose of `Object.freeze()`?",
            options: [
                "To stop the garbage collector",
                "To make an object immutable (cannot add, delete, or change properties)",
                "To pause code execution",
                "To create a deep copy"
            ],
            correctAnswer: 1,
            explanation: "`Object.freeze()` freezes an object. A frozen object can no longer be changed; freezing an object prevents new properties from being added to it, existing properties from being removed, etc."
        },
        {
            id: "js-17",
            question: "What is a Higher-Order Function?",
            options: [
                "A function that runs before all others",
                "A function that takes a function as an argument or returns a function",
                "A function with high complexity",
                "A class method"
            ],
            correctAnswer: 1,
            explanation: "A higher-order function is a function that does at least one of the following: takes one or more functions as arguments, or returns a function as its result."
        },
        {
            id: "js-18",
            question: "What is the 'Temporal Dead Zone'?",
            options: [
                "The time between a variable declaration (let/const) and its initialization",
                "The time a server takes to respond",
                "A deprecated JavaScript feature",
                "The period when the DOM is loading"
            ],
            correctAnswer: 0,
            explanation: "The TDZ is the specific period of time during which the `let` and `const` variables cannot be accessed because they are hoisted but not initialized."
        },
        {
            id: "js-19",
            question: "What is the purpose of `JSON.stringify()`?",
            options: [
                "To parse a JSON string into an object",
                "To convert a JavaScript object or value to a JSON string",
                "To encrypt data",
                "To format code"
            ],
            correctAnswer: 1,
            explanation: "`JSON.stringify()` converts a JavaScript object or value to a JSON string."
        },
        {
            id: "js-20",
            question: "What is the spread operator (...) used for?",
            options: [
                "To comment out code",
                "To expand an iterable (like an array) into individual elements",
                "To define a class",
                "To catch errors"
            ],
            correctAnswer: 1,
            explanation: "The spread syntax allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected."
        }
    ]
};

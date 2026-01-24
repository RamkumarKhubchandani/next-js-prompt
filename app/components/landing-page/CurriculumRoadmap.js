'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Lock, Calendar, Video, CheckCircle2, Target, BookOpen, Zap, X, FileText, Code, Lightbulb, Award, Rocket } from 'lucide-react';
import Link from 'next/link';

import { allDayDetails } from '../../lib/curriculumData/allCurriculum';

// DETAILED DAY CURRICULUM - Complete information for each day
const javascriptData = {
    1: {
        overview: "Master the foundation of JavaScript by understanding how to store and manipulate data using variables and different data types.",
        objectives: [
            "Understand the difference between let, const, and var",
            "Learn about primitive data types (string, number, boolean, null, undefined, symbol)",
            "Master reference types (objects, arrays)",
            "Understand type coercion and conversion"
        ],
        whatYouWillLearn: [
            { topic: "Variable Declarations", detail: "Learn when to use let, const, and var. Understand block scope vs function scope and why const is preferred." },
            { topic: "Primitive Types", detail: "Deep dive into strings, numbers, booleans, null, undefined, and symbols. Learn how they're stored in memory." },
            { topic: "Reference Types", detail: "Understand how objects and arrays differ from primitives. Learn about pass-by-reference vs pass-by-value." },
            { topic: "Type Coercion", detail: "Master implicit and explicit type conversion. Understand truthy/falsy values and common pitfalls." }
        ],
        project: "Build a type converter tool that demonstrates all data types and type coercion rules",
        prerequisites: "None - perfect for absolute beginners!",
        resources: ["MDN Variables Guide", "JavaScript.info Data Types", "Interactive Type Coercion Tool", "Video Tutorial Series"]
    },
    2: {
        overview: "Learn how to perform operations on data using arithmetic, comparison, and logical operators to build dynamic applications.",
        objectives: [
            "Master all arithmetic operators (+, -, *, /, %, **)",
            "Understand comparison operators and equality",
            "Use logical operators to combine conditions",
            "Apply the ternary operator for concise conditional expressions"
        ],
        whatYouWillLearn: [
            { topic: "Arithmetic Operations", detail: "Perform mathematical calculations with +, -, *, /, % (modulo), and ** (exponentiation)." },
            { topic: "Comparison & Equality", detail: "Compare values with ==, ===, !=, !==. Understand strict vs loose equality and when to use each." },
            { topic: "Logical Operators", detail: "Combine conditions with && (AND), || (OR), and ! (NOT). Learn short-circuit evaluation." },
            { topic: "Ternary Operator", detail: "Write concise conditional expressions with condition ? trueValue : falseValue syntax." }
        ],
        project: "Create a grade calculator that uses all operator types to calculate final grades and determine pass/fail",
        prerequisites: "Day 1: Variables & Data Types",
        resources: ["Operator Precedence Chart", "Practice Exercises", "Common Operator Mistakes Guide"]
    },
    3: {
        overview: "Control the flow of your program with conditional statements and loops to create dynamic, interactive applications.",
        objectives: [
            "Master if/else statements for decision making",
            "Use switch statements for multiple conditions",
            "Understand for, while, and do-while loops",
            "Learn break and continue keywords for loop control"
        ],
        whatYouWillLearn: [
            { topic: "Conditional Statements", detail: "Make decisions in your code with if, else if, and else. Learn nested conditionals and best practices." },
            { topic: "Switch Statements", detail: "Handle multiple conditions elegantly with switch/case. Understand when to use switch vs if/else." },
            { topic: "For Loops", detail: "Iterate with for loops. Learn the classic for loop, for...of, and for...in variations." },
            { topic: "While Loops", detail: "Use while and do-while loops. Understand when to use each and how to avoid infinite loops." }
        ],
        project: "Build a number guessing game with loops, conditionals, and user input validation",
        prerequisites: "Day 2: Operators & Expressions",
        resources: ["Control Flow Cheat Sheet", "Loop Practice Problems", "Game Development Tutorial"]
    },
    4: {
        overview: "Organize your code into reusable blocks with functions. Learn parameters, return values, and function best practices.",
        objectives: [
            "Create functions with function declarations and expressions",
            "Understand parameters, arguments, and return values",
            "Learn default parameters and rest parameters",
            "Master function scope and hoisting"
        ],
        whatYouWillLearn: [
            { topic: "Function Declarations", detail: "Create named functions with function keyword. Understand hoisting and when to use declarations." },
            { topic: "Function Expressions", detail: "Assign functions to variables. Learn anonymous functions and when expressions are preferred." },
            { topic: "Parameters & Arguments", detail: "Pass data to functions. Learn default parameters, rest parameters (...args), and argument destructuring." },
            { topic: "Return Values", detail: "Return data from functions. Understand implicit returns, multiple returns, and early returns." }
        ],
        project: "Create a utility library with reusable functions for common tasks (validation, formatting, calculations)",
        prerequisites: "Day 3: Control Flow",
        resources: ["Function Best Practices", "Code Organization Guide", "Refactoring Tutorial"]
    },
    5: {
        overview: "Master modern function syntax with arrow functions and understand lexical scope, closures, and the this keyword.",
        objectives: [
            "Write concise code with arrow function syntax",
            "Understand lexical scope and scope chain",
            "Learn how closures work and when to use them",
            "Master the difference between arrow functions and regular functions"
        ],
        whatYouWillLearn: [
            { topic: "Arrow Function Syntax", detail: "Write functions with => syntax. Learn implicit returns, parentheses rules, and when to use arrow functions." },
            { topic: "Lexical Scope", detail: "Understand how JavaScript resolves variables. Learn block scope, function scope, and the scope chain." },
            { topic: "Closures Introduction", detail: "Learn how functions remember their outer scope. Understand practical use cases for closures." },
            { topic: "this in Arrow Functions", detail: "Understand how arrow functions handle 'this' differently. Learn when to use arrow vs regular functions." }
        ],
        project: "Build a counter application demonstrating closures and private variables",
        prerequisites: "Day 4: Functions Basics",
        resources: ["Arrow Functions Guide", "Scope Visualizer", "Closure Examples", "this Keyword Deep Dive"]
    },
    6: {
        overview: "Master arrays - one of JavaScript's most powerful data structures. Learn essential array methods and iteration techniques.",
        objectives: [
            "Create and manipulate arrays effectively",
            "Use array methods for common operations",
            "Iterate through arrays with different techniques",
            "Work with multi-dimensional arrays"
        ],
        whatYouWillLearn: [
            { topic: "Array Creation & Access", detail: "Create arrays with literals and constructors. Access elements with bracket notation and destructuring." },
            { topic: "Array Methods", detail: "Use push, pop, shift, unshift, splice, slice. Understand mutating vs non-mutating methods." },
            { topic: "Array Iteration", detail: "Loop through arrays with for, forEach, for...of. Understand when to use each method." },
            { topic: "Multi-dimensional Arrays", detail: "Work with nested arrays. Access and manipulate 2D and 3D arrays." }
        ],
        project: "Create a todo list application with array manipulation (add, remove, filter, sort tasks)",
        prerequisites: "Day 5: Arrow Functions & Scope",
        resources: ["Array Methods Cheat Sheet", "Array Visualization Tool", "Practice Exercises"]
    },
    7: {
        overview: "Deep dive into powerful array methods that transform how you work with data: map, filter, reduce, and more.",
        objectives: [
            "Transform arrays with map()",
            "Filter data with filter()",
            "Aggregate data with reduce()",
            "Search arrays with find() and findIndex()"
        ],
        whatYouWillLearn: [
            { topic: "map() Method", detail: "Transform each element in an array. Return a new array with modified values. Perfect for data transformation." },
            { topic: "filter() Method", detail: "Create new arrays with elements that pass a test. Essential for data filtering and search functionality." },
            { topic: "reduce() Method", detail: "Reduce an array to a single value. Sum numbers, count occurrences, group data, and more." },
            { topic: "find() & findIndex()", detail: "Search for specific elements. Return the first match or its index. Understand some() and every() too." }
        ],
        project: "Build a data dashboard that filters, transforms, and aggregates user data",
        prerequisites: "Day 6: Arrays Fundamentals",
        resources: ["Array Methods Interactive Guide", "Real-world Examples", "Performance Comparison"]
    },
    8: {
        overview: "Master JavaScript objects - the foundation of everything in JavaScript. Learn properties, methods, and the 'this' keyword.",
        objectives: [
            "Create and manipulate objects",
            "Add and access object properties",
            "Define object methods",
            "Understand the 'this' keyword in objects"
        ],
        whatYouWillLearn: [
            { topic: "Object Literals", detail: "Create objects with {} syntax. Define properties and methods. Use shorthand property syntax." },
            { topic: "Property Access", detail: "Access properties with dot notation and bracket notation. Understand when to use each." },
            { topic: "Object Methods", detail: "Define functions as object properties. Use 'this' to access object properties within methods." },
            { topic: "this Keyword", detail: "Understand how 'this' works in different contexts. Learn common 'this' pitfalls and solutions." }
        ],
        project: "Create a user profile system with objects representing users and their methods",
        prerequisites: "Day 7: Array Methods Deep Dive",
        resources: ["Object-Oriented JavaScript", "this Keyword Guide", "Object Patterns"]
    },
    9: {
        overview: "Learn modern JavaScript syntax for working with objects and arrays: destructuring, spread operator, and rest parameters.",
        objectives: [
            "Destructure objects and arrays",
            "Use the spread operator (...) effectively",
            "Understand rest parameters",
            "Combine destructuring with function parameters"
        ],
        whatYouWillLearn: [
            { topic: "Object Destructuring", detail: "Extract properties from objects into variables. Use aliases, default values, and nested destructuring." },
            { topic: "Array Destructuring", detail: "Extract array elements into variables. Skip elements, use rest syntax, and swap variables." },
            { topic: "Spread Operator", detail: "Spread arrays and objects. Clone data, merge objects, pass array elements as arguments." },
            { topic: "Rest Parameters", detail: "Collect multiple arguments into an array. Build flexible functions that accept any number of arguments." }
        ],
        project: "Build a settings manager that uses destructuring and spread for configuration management",
        prerequisites: "Day 8: Objects & Properties",
        resources: ["Destructuring Guide", "Spread vs Rest", "Modern JavaScript Patterns"]
    },
    10: {
        overview: "Work with JSON (JavaScript Object Notation) - the standard format for data exchange in web applications.",
        objectives: [
            "Understand JSON format and syntax",
            "Convert between JSON and JavaScript objects",
            "Handle JSON parsing errors",
            "Work with API data in JSON format"
        ],
        whatYouWillLearn: [
            { topic: "JSON Syntax", detail: "Understand JSON format rules. Learn valid data types and structure. Identify common JSON errors." },
            { topic: "JSON.parse()", detail: "Convert JSON strings to JavaScript objects. Handle parsing errors with try/catch." },
            { topic: "JSON.stringify()", detail: "Convert JavaScript objects to JSON strings. Use replacer and space parameters for formatting." },
            { topic: "Working with APIs", detail: "Fetch data from APIs. Parse JSON responses. Transform and display API data." }
        ],
        project: "Create a weather app that fetches and displays JSON data from a weather API",
        prerequisites: "Day 9: Destructuring & Spread",
        resources: ["JSON Validator", "API Testing Tool", "Fetch API Guide", "Error Handling Best Practices"]
    },
    11: {
        overview: "Master higher-order functions - functions that take other functions as arguments or return functions. Essential for modern JavaScript.",
        objectives: [
            "Understand higher-order functions concept",
            "Use callbacks effectively",
            "Create function composition patterns",
            "Build reusable utility functions"
        ],
        whatYouWillLearn: [
            { topic: "Higher-Order Functions", detail: "Functions that accept functions as arguments or return functions. Essential for array methods and async code." },
            { topic: "Callbacks", detail: "Pass functions as arguments to other functions. Understand callback patterns and common use cases." },
            { topic: "Function Composition", detail: "Combine multiple functions to create new functionality. Build pipelines and data transformations." },
            { topic: "Returning Functions", detail: "Create functions that return other functions. Build function factories and currying patterns." }
        ],
        project: "Build a data processing pipeline using higher-order functions for filtering, mapping, and reducing data",
        prerequisites: "Day 10: JSON & Data",
        resources: ["Functional Programming Guide", "Higher-Order Functions Examples", "Callback Patterns"]
    },
    12: {
        overview: "Deep dive into closures - one of JavaScript's most powerful features. Learn how functions remember their outer scope.",
        objectives: [
            "Understand how closures work",
            "Create private variables with closures",
            "Implement the module pattern",
            "Avoid common closure pitfalls"
        ],
        whatYouWillLearn: [
            { topic: "Closure Concept", detail: "Functions that remember variables from their outer scope even after the outer function has returned." },
            { topic: "Private Variables", detail: "Use closures to create truly private data that can't be accessed from outside." },
            { topic: "Module Pattern", detail: "Organize code into modules with public and private members using closures." },
            { topic: "Closure Gotchas", detail: "Understand common closure mistakes like loop closures and memory leaks." }
        ],
        project: "Create a counter module with private state and public methods using closures",
        prerequisites: "Day 11: Higher-Order Functions",
        resources: ["Closure Visualizer", "Module Pattern Guide", "Memory Management Tips"]
    },
    13: {
        overview: "Master the 'this' keyword - understand how context works in JavaScript and how to control it with call, apply, and bind.",
        objectives: [
            "Understand how 'this' is determined",
            "Use call, apply, and bind methods",
            "Handle 'this' in different contexts",
            "Avoid common 'this' pitfalls"
        ],
        whatYouWillLearn: [
            { topic: "this Binding Rules", detail: "Learn the 4 rules that determine what 'this' refers to: default, implicit, explicit, and new binding." },
            { topic: "call() & apply()", detail: "Invoke functions with a specific 'this' value. Understand the difference between call and apply." },
            { topic: "bind() Method", detail: "Create new functions with a permanently bound 'this' value. Essential for event handlers and callbacks." },
            { topic: "Arrow Functions & this", detail: "Understand how arrow functions inherit 'this' from their enclosing scope (lexical this)." }
        ],
        project: "Build an object-oriented calculator where methods correctly reference 'this'",
        prerequisites: "Day 12: Closures Mastery",
        resources: ["this Keyword Guide", "Context Examples", "Common this Mistakes"]
    },
    14: {
        overview: "Understand JavaScript's prototype-based inheritance system. Learn how objects inherit from other objects.",
        objectives: [
            "Understand the prototype chain",
            "Create objects with Object.create()",
            "Use constructor functions",
            "Implement inheritance patterns"
        ],
        whatYouWillLearn: [
            { topic: "Prototype Chain", detail: "Every object has a prototype. Learn how JavaScript looks up properties through the prototype chain." },
            { topic: "Object.create()", detail: "Create objects with a specific prototype. Understand prototypal inheritance." },
            { topic: "Constructor Functions", detail: "Create objects with the 'new' keyword. Understand how constructors and prototypes work together." },
            { topic: "Inheritance Patterns", detail: "Implement classical inheritance patterns using prototypes. Understand prototype delegation." }
        ],
        project: "Create an inheritance hierarchy for a game with characters, enemies, and power-ups",
        prerequisites: "Day 13: this & Context",
        resources: ["Prototype Visualizer", "Inheritance Patterns", "OOP in JavaScript"]
    },
    15: {
        overview: "Learn ES6 classes - syntactic sugar over prototypes that makes object-oriented programming more intuitive.",
        objectives: [
            "Create classes with class syntax",
            "Use constructors and methods",
            "Implement inheritance with extends",
            "Understand static methods and properties"
        ],
        whatYouWillLearn: [
            { topic: "Class Syntax", detail: "Define classes with the class keyword. Cleaner syntax than constructor functions." },
            { topic: "Constructor Method", detail: "Initialize new instances with the constructor method. Set up initial state." },
            { topic: "Class Methods", detail: "Define methods that all instances share. Understand method syntax and 'this' binding." },
            { topic: "Inheritance with extends", detail: "Create subclasses that inherit from parent classes. Use super() to call parent methods." }
        ],
        project: "Build a task management system with Task, Project, and User classes using inheritance",
        prerequisites: "Day 14: Prototypes",
        resources: ["ES6 Classes Guide", "OOP Best Practices", "Class vs Prototype"]
    },
    16: {
        overview: "Understand JavaScript's asynchronous nature. Learn the event loop, call stack, and how callbacks enable async code.",
        objectives: [
            "Understand the event loop mechanism",
            "Learn how the call stack works",
            "Master callback patterns",
            "Avoid callback hell"
        ],
        whatYouWillLearn: [
            { topic: "Call Stack", detail: "How JavaScript executes code synchronously. Understand stack frames and execution context." },
            { topic: "Event Loop", detail: "How JavaScript handles asynchronous operations. Learn about the task queue and microtask queue." },
            { topic: "Callbacks", detail: "Pass functions to be called later. Essential for async operations like setTimeout and API calls." },
            { topic: "Callback Hell", detail: "Understand the pyramid of doom and why deeply nested callbacks are problematic." }
        ],
        project: "Create a timer application demonstrating the event loop with setTimeout and setInterval",
        prerequisites: "Day 15: ES6 Classes",
        resources: ["Event Loop Visualizer", "Async JavaScript Guide", "Call Stack Tutorial"]
    },
    17: {
        overview: "Master Promises - the modern way to handle asynchronous operations. Learn to chain promises and handle errors.",
        objectives: [
            "Create and use Promises",
            "Chain promises with then()",
            "Handle errors with catch()",
            "Use Promise.all() and Promise.race()"
        ],
        whatYouWillLearn: [
            { topic: "Promise Creation", detail: "Create promises with new Promise(). Understand resolve and reject." },
            { topic: "then() & catch()", detail: "Handle successful results with then() and errors with catch(). Chain multiple operations." },
            { topic: "Promise Chaining", detail: "Chain multiple async operations. Return promises from then() to create sequences." },
            { topic: "Promise Combinators", detail: "Use Promise.all() for parallel operations, Promise.race() for the fastest, Promise.allSettled() for all results." }
        ],
        project: "Build a multi-step form that validates each step asynchronously using promises",
        prerequisites: "Day 16: Event Loop",
        resources: ["Promise Guide", "Async Patterns", "Error Handling Strategies"]
    },
    18: {
        overview: "Learn async/await - syntactic sugar over promises that makes asynchronous code look synchronous and easier to read.",
        objectives: [
            "Write async functions",
            "Use await keyword correctly",
            "Handle errors with try/catch",
            "Understand async/await best practices"
        ],
        whatYouWillLearn: [
            { topic: "async Functions", detail: "Functions declared with async keyword always return a promise. Enable use of await inside." },
            { topic: "await Keyword", detail: "Pause execution until a promise resolves. Makes async code look synchronous." },
            { topic: "Error Handling", detail: "Use try/catch blocks to handle promise rejections in async functions." },
            { topic: "Parallel Execution", detail: "Use Promise.all() with await for parallel async operations. Avoid sequential when parallel is possible." }
        ],
        project: "Create a data fetching application that loads multiple resources in parallel using async/await",
        prerequisites: "Day 17: Promises",
        resources: ["Async/Await Guide", "Error Handling Patterns", "Performance Tips"]
    },
    19: {
        overview: "Master the Fetch API - the modern way to make HTTP requests in JavaScript. Learn to fetch data from APIs.",
        objectives: [
            "Make HTTP requests with fetch()",
            "Handle responses and parse JSON",
            "Set request headers and options",
            "Handle network errors properly"
        ],
        whatYouWillLearn: [
            { topic: "fetch() Basics", detail: "Make GET requests to APIs. Understand the fetch() function and Response object." },
            { topic: "Request Options", detail: "Configure requests with method, headers, body. Make POST, PUT, DELETE requests." },
            { topic: "Response Handling", detail: "Check response.ok, parse JSON with response.json(), handle different status codes." },
            { topic: "Error Handling", detail: "Catch network errors, handle HTTP errors, implement retry logic." }
        ],
        project: "Build a GitHub user search app that fetches and displays user data from the GitHub API",
        prerequisites: "Day 18: Async/Await",
        resources: ["Fetch API Docs", "HTTP Methods Guide", "API Testing Tools"]
    },
    20: {
        overview: "Learn to work with real-world REST APIs. Understand CRUD operations, authentication, and best practices.",
        objectives: [
            "Understand REST API principles",
            "Implement CRUD operations",
            "Handle authentication tokens",
            "Build a complete API client"
        ],
        whatYouWillLearn: [
            { topic: "REST Principles", detail: "Understand resources, HTTP methods (GET, POST, PUT, DELETE), and status codes." },
            { topic: "CRUD Operations", detail: "Create, Read, Update, Delete data through API endpoints. Map to HTTP methods." },
            { topic: "Authentication", detail: "Send auth tokens in headers, handle JWT tokens, refresh tokens when expired." },
            { topic: "Error Handling", detail: "Handle rate limiting, network errors, validation errors, and server errors gracefully." }
        ],
        project: "Create a full-featured blog application with CRUD operations using a REST API",
        prerequisites: "Day 19: Fetch API",
        resources: ["REST API Guide", "Authentication Patterns", "API Best Practices"]
    },
    21: {
        overview: "Master modern ES6+ features that make JavaScript more powerful and expressive: template literals, optional chaining, and more.",
        objectives: [
            "Use template literals for strings",
            "Apply optional chaining safely",
            "Use nullish coalescing operator",
            "Understand default parameters"
        ],
        whatYouWillLearn: [
            { topic: "Template Literals", detail: "Create strings with backticks. Embed expressions with ${}. Multi-line strings without escape characters." },
            { topic: "Optional Chaining", detail: "Safely access nested properties with ?. operator. Avoid 'cannot read property of undefined' errors." },
            { topic: "Nullish Coalescing", detail: "Use ?? operator to provide default values only for null/undefined (not falsy values like 0 or '')." },
            { topic: "Default Parameters", detail: "Set default values for function parameters. Cleaner than manual checks." }
        ],
        project: "Build a configuration system using modern ES6+ features for clean, safe code",
        prerequisites: "Day 20: Working with APIs",
        resources: ["ES6+ Features Guide", "Modern JavaScript Patterns", "Browser Compatibility"]
    },
    22: {
        overview: "Learn JavaScript modules - organize code into reusable, maintainable pieces with import/export syntax.",
        objectives: [
            "Export functions and variables",
            "Import from other modules",
            "Use default and named exports",
            "Understand dynamic imports"
        ],
        whatYouWillLearn: [
            { topic: "Export Syntax", detail: "Export functions, classes, variables with export keyword. Use named exports and default exports." },
            { topic: "Import Syntax", detail: "Import from other files with import keyword. Import specific exports or everything." },
            { topic: "Module Patterns", detail: "Organize code into modules. One module per file, clear dependencies, avoid circular imports." },
            { topic: "Dynamic Imports", detail: "Load modules on-demand with import(). Code splitting and lazy loading for better performance." }
        ],
        project: "Refactor a large application into modules with clear separation of concerns",
        prerequisites: "Day 21: ES6+ Features",
        resources: ["Module System Guide", "Code Organization Patterns", "Build Tools Tutorial"]
    },
    23: {
        overview: "Understand generators - special functions that can pause and resume execution. Essential for advanced async patterns.",
        objectives: [
            "Create generator functions",
            "Use yield keyword",
            "Iterate with generators",
            "Understand generator use cases"
        ],
        whatYouWillLearn: [
            { topic: "Generator Functions", detail: "Define with function* syntax. Can pause execution and resume later." },
            { topic: "yield Keyword", detail: "Pause function execution and return a value. Resume from where it left off." },
            { topic: "Generator Iteration", detail: "Use for...of to iterate through generator values. Call next() manually for control." },
            { topic: "Practical Use Cases", detail: "Implement custom iterators, lazy evaluation, infinite sequences, and async flow control." }
        ],
        project: "Create a pagination system using generators for efficient data loading",
        prerequisites: "Day 22: Modules",
        resources: ["Generator Guide", "Iterator Protocol", "Advanced Patterns"]
    },
    24: {
        overview: "Learn Proxy and Reflect - powerful metaprogramming features for intercepting and customizing object operations.",
        objectives: [
            "Create proxies to intercept operations",
            "Use proxy traps effectively",
            "Understand Reflect API",
            "Build reactive systems"
        ],
        whatYouWillLearn: [
            { topic: "Proxy Object", detail: "Wrap objects to intercept operations like property access, assignment, deletion." },
            { topic: "Proxy Traps", detail: "Define handlers for get, set, has, deleteProperty, and more. Customize object behavior." },
            { topic: "Reflect API", detail: "Perform default object operations. Use with Proxy for cleaner code." },
            { topic: "Use Cases", detail: "Validation, logging, reactive data binding, virtual properties, access control." }
        ],
        project: "Build a validation system using Proxy to automatically validate object properties",
        prerequisites: "Day 23: Generators",
        resources: ["Proxy Guide", "Reflect API Docs", "Metaprogramming Patterns"]
    },
    25: {
        overview: "Understand WeakMap and WeakSet - special collections that don't prevent garbage collection of their keys.",
        objectives: [
            "Use WeakMap for private data",
            "Understand garbage collection",
            "Use WeakSet for object tracking",
            "Know when to use weak collections"
        ],
        whatYouWillLearn: [
            { topic: "WeakMap", detail: "Map with object keys that can be garbage collected. Perfect for private data and metadata." },
            { topic: "WeakSet", detail: "Set of objects that can be garbage collected. Track objects without preventing cleanup." },
            { topic: "Memory Management", detail: "Understand how weak references prevent memory leaks. Know when objects can be collected." },
            { topic: "Use Cases", detail: "Private class data, caching, DOM node metadata, object tracking without memory leaks." }
        ],
        project: "Implement a caching system using WeakMap that automatically cleans up unused data",
        prerequisites: "Day 24: Proxy & Reflect",
        resources: ["WeakMap Guide", "Memory Management", "Garbage Collection Explained"]
    },
    26: {
        overview: "Master essential design patterns in JavaScript: Module, Singleton, Factory, Observer, and more.",
        objectives: [
            "Implement Module pattern",
            "Create Singleton instances",
            "Use Factory pattern",
            "Build Observer pattern"
        ],
        whatYouWillLearn: [
            { topic: "Module Pattern", detail: "Encapsulate code with private and public members. Organize code into self-contained units." },
            { topic: "Singleton Pattern", detail: "Ensure only one instance of a class exists. Useful for configuration, logging, caching." },
            { topic: "Factory Pattern", detail: "Create objects without specifying exact class. Flexible object creation." },
            { topic: "Observer Pattern", detail: "Subscribe to events and get notified of changes. Foundation of event-driven programming." }
        ],
        project: "Build an event system using Observer pattern for component communication",
        prerequisites: "Day 25: WeakMap & WeakSet",
        resources: ["Design Patterns Guide", "JavaScript Patterns", "Real-world Examples"]
    },
    27: {
        overview: "Master error handling and debugging techniques. Write robust code that handles failures gracefully.",
        objectives: [
            "Use try/catch effectively",
            "Create custom error classes",
            "Debug with browser tools",
            "Implement error logging"
        ],
        whatYouWillLearn: [
            { topic: "try/catch/finally", detail: "Handle errors gracefully. Use finally for cleanup. Understand error propagation." },
            { topic: "Custom Errors", detail: "Extend Error class to create custom error types. Add context and metadata to errors." },
            { topic: "Debugging Tools", detail: "Use console methods, breakpoints, debugger statement. Chrome DevTools mastery." },
            { topic: "Error Logging", detail: "Log errors to services. Track errors in production. Implement error boundaries." }
        ],
        project: "Build an error tracking system with custom errors and detailed logging",
        prerequisites: "Day 26: Design Patterns",
        resources: ["Error Handling Guide", "Debugging Tutorial", "DevTools Mastery"]
    },
    28: {
        overview: "Learn performance optimization techniques: debouncing, throttling, memoization, and lazy loading.",
        objectives: [
            "Implement debouncing",
            "Use throttling effectively",
            "Apply memoization",
            "Optimize rendering performance"
        ],
        whatYouWillLearn: [
            { topic: "Debouncing", detail: "Delay function execution until user stops triggering. Perfect for search inputs and resize handlers." },
            { topic: "Throttling", detail: "Limit function execution rate. Useful for scroll handlers and API calls." },
            { topic: "Memoization", detail: "Cache function results for expensive calculations. Avoid redundant computations." },
            { topic: "Lazy Loading", detail: "Load resources on-demand. Improve initial page load time and reduce bandwidth." }
        ],
        project: "Optimize a slow application using debouncing, throttling, and memoization",
        prerequisites: "Day 27: Error Handling",
        resources: ["Performance Guide", "Optimization Patterns", "Profiling Tools"]
    },
    29: {
        overview: "Learn testing fundamentals with Jest. Write unit tests, integration tests, and practice test-driven development.",
        objectives: [
            "Write unit tests with Jest",
            "Test async code",
            "Mock dependencies",
            "Practice TDD workflow"
        ],
        whatYouWillLearn: [
            { topic: "Jest Basics", detail: "Write tests with describe, it, expect. Understand matchers and assertions." },
            { topic: "Testing Async Code", detail: "Test promises and async/await. Handle async assertions correctly." },
            { topic: "Mocking", detail: "Mock functions, modules, and API calls. Isolate code under test." },
            { topic: "TDD Workflow", detail: "Write tests first, then implementation. Red-Green-Refactor cycle." }
        ],
        project: "Write comprehensive tests for a utility library using TDD approach",
        prerequisites: "Day 28: Performance",
        resources: ["Jest Documentation", "Testing Best Practices", "TDD Guide"]
    },
    30: {
        overview: "Apply everything you've learned in a comprehensive final project. Build, test, and deploy a real-world application.",
        objectives: [
            "Plan and architect an application",
            "Implement all JavaScript concepts",
            "Write tests and handle errors",
            "Deploy to production"
        ],
        whatYouWillLearn: [
            { topic: "Project Planning", detail: "Break down requirements, design architecture, plan features and milestones." },
            { topic: "Code Organization", detail: "Structure code with modules, separate concerns, follow best practices." },
            { topic: "Testing & Quality", detail: "Write comprehensive tests, handle errors gracefully, optimize performance." },
            { topic: "Deployment", detail: "Build for production, deploy to hosting platform, set up CI/CD pipeline." }
        ],
        project: "Build a full-featured task management application with authentication, real-time updates, and offline support",
        prerequisites: "Day 29: Testing",
        resources: ["Project Ideas", "Deployment Guides", "Best Practices Checklist", "Portfolio Tips"]
    }
};

const dayDetailsData = {
    ...allDayDetails,
    javascript: javascriptData
};

// Modal Component for Day Details
function DayDetailsModal({ day, dayNum, onClose, techName }) {
    const details = dayDetailsData[techName]?.[dayNum];
    if (!details) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-brand-primary via-purple-600 to-pink-600 p-8 text-white z-10">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-bold">
                                    Day {dayNum}
                                </div>
                                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-bold">
                                    {day.duration}
                                </div>
                            </div>
                            <h3 className="text-4xl font-black mb-3">{day.title}</h3>
                            <p className="text-xl opacity-90 leading-relaxed">{details.overview}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="ml-4 p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                        >
                            <X size={28} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {/* Learning Objectives */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-brand-primary/10 rounded-xl">
                                <Target className="text-brand-primary" size={28} />
                            </div>
                            <h4 className="text-2xl font-bold text-dark-900 dark:text-white">Learning Objectives</h4>
                        </div>
                        <div className="grid gap-3">
                            {details.objectives.map((obj, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border-2 border-green-200 dark:border-green-900/30">
                                    <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={24} />
                                    <span className="text-gray-800 dark:text-light-200 font-medium">{obj}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What You'll Learn */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-yellow-500/10 rounded-xl">
                                <Lightbulb className="text-yellow-600" size={28} />
                            </div>
                            <h4 className="text-2xl font-bold text-dark-900 dark:text-white">What You'll Learn</h4>
                        </div>
                        <div className="grid gap-4">
                            {details.whatYouWillLearn.map((item, idx) => (
                                <div key={idx} className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl border-2 border-blue-200 dark:border-blue-900/30">
                                    <h5 className="font-bold text-lg text-brand-primary mb-2 flex items-center gap-2">
                                        <Code size={20} />
                                        {item.topic}
                                    </h5>
                                    <p className="text-gray-700 dark:text-light-300 leading-relaxed">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hands-on Project */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-purple-500/10 rounded-xl">
                                <Rocket className="text-purple-600" size={28} />
                            </div>
                            <h4 className="text-2xl font-bold text-dark-900 dark:text-white">Hands-on Project</h4>
                        </div>
                        <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-300 dark:border-purple-800">
                            <p className="text-gray-800 dark:text-light-200 text-lg font-medium leading-relaxed">{details.project}</p>
                        </div>
                    </div>

                    {/* Prerequisites & Resources */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-gray-50 dark:bg-dark-700 rounded-xl border-2 border-gray-200 dark:border-dark-600">
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="text-blue-500" size={24} />
                                <h5 className="font-bold text-lg text-dark-900 dark:text-white">Prerequisites</h5>
                            </div>
                            <p className="text-gray-700 dark:text-light-300 leading-relaxed">{details.prerequisites}</p>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-dark-700 rounded-xl border-2 border-gray-200 dark:border-dark-600">
                            <div className="flex items-center gap-3 mb-4">
                                <Award className="text-green-500" size={24} />
                                <h5 className="font-bold text-lg text-dark-900 dark:text-white">Resources</h5>
                            </div>
                            <ul className="space-y-2">
                                {details.resources?.map((resource, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-green-500" />
                                        <span className="text-brand-primary hover:underline cursor-pointer font-medium">{resource}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-4 pt-8 border-t-2 border-gray-200 dark:border-dark-700">
                        <Link
                            href={`/path/${techName}?day=${dayNum - 1}`}
                            className="flex-1 px-8 py-5 bg-gradient-to-r from-brand-primary to-purple-600 text-white rounded-xl font-bold text-lg text-center hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <Play size={24} />
                            <span>{day.free ? "Start This Lesson Free" : "Unlock with Pro"}</span>
                        </Link>
                        <Link
                            href={`/contact?type=1on1&day=${dayNum}&course=${techName}`}
                            className="flex-1 px-8 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg text-center hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <Video size={24} />
                            <span>Book 1-on-1 for This Day</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// COMPLETE CURRICULUM DATA
const completeCurriculumData = {
    javascript: {
        title: "JavaScript Masterclass",
        subtitle: "From Zero to Hero in 30 Days",
        icon: "🟨",
        color: "yellow",
        gradient: "from-yellow-400 via-yellow-500 to-orange-500",
        totalDays: 30,
        description: "Master modern JavaScript from fundamentals to advanced concepts",
        weeks: [
            {
                week: 1,
                title: "Fundamentals & Core Concepts",
                color: "blue",
                days: [
                    { day: 1, title: "Variables & Data Types", topics: ["let, const, var", "Primitives vs Objects", "Type Coercion"], duration: "2h", free: true },
                    { day: 2, title: "Operators & Expressions", topics: ["Arithmetic", "Comparison", "Logical operators"], duration: "2h", free: true },
                    { day: 3, title: "Control Flow", topics: ["if/else", "switch", "Loops"], duration: "2h", free: true },
                    { day: 4, title: "Functions Basics", topics: ["Declarations", "Expressions", "Parameters"], duration: "2h", free: false },
                    { day: 5, title: "Arrow Functions & Scope", topics: ["Arrow syntax", "Lexical scope", "Closures intro"], duration: "2h", free: false },
                ]
            },
            {
                week: 2,
                title: "Arrays & Objects Mastery",
                color: "purple",
                days: [
                    { day: 6, title: "Arrays Fundamentals", topics: ["Array methods", "Iteration", "Multi-dimensional"], duration: "2h", free: false },
                    { day: 7, title: "Array Methods Deep Dive", topics: ["map, filter, reduce", "find, some, every"], duration: "2h", free: false },
                    { day: 8, title: "Objects & Properties", topics: ["Object literals", "Methods", "this keyword"], duration: "2h", free: false },
                    { day: 9, title: "Destructuring & Spread", topics: ["Object destructuring", "Spread operator", "Rest parameters"], duration: "2h", free: false },
                    { day: 10, title: "JSON & Data", topics: ["JSON.parse/stringify", "API data", "Transformation"], duration: "2h", free: false },
                ]
            },
            {
                week: 3,
                title: "Advanced Functions",
                color: "green",
                days: [
                    { day: 11, title: "Higher-Order Functions", topics: ["Callbacks", "Function composition", "Returning functions"], duration: "2h", free: false },
                    { day: 12, title: "Closures Mastery", topics: ["Closure concept", "Private variables", "Module pattern"], duration: "2h", free: false },
                    { day: 13, title: "this & Context", topics: ["this binding", "call, apply, bind", "Arrow functions"], duration: "2h", free: false },
                    { day: 14, title: "Prototypes", topics: ["Prototype chain", "Inheritance", "Object.create"], duration: "2h", free: false },
                    { day: 15, title: "ES6 Classes", topics: ["Class syntax", "Constructor", "Inheritance"], duration: "2h", free: false },
                ]
            },
            {
                week: 4,
                title: "Async JavaScript",
                color: "red",
                days: [
                    { day: 16, title: "Event Loop", topics: ["Call stack", "Event loop", "Callbacks"], duration: "2h", free: false },
                    { day: 17, title: "Promises", topics: ["Promise creation", "then/catch", "Chaining"], duration: "2h", free: false },
                    { day: 18, title: "Async/Await", topics: ["async functions", "await keyword", "Error handling"], duration: "2h", free: false },
                    { day: 19, title: "Fetch API", topics: ["fetch basics", "Headers", "Error handling"], duration: "2h", free: false },
                    { day: 20, title: "Working with APIs", topics: ["REST APIs", "CRUD", "Authentication"], duration: "2h", free: false },
                ]
            },
            {
                week: 5,
                title: "Modern JavaScript",
                color: "indigo",
                days: [
                    { day: 21, title: "ES6+ Features", topics: ["Template literals", "Optional chaining", "Nullish coalescing"], duration: "2h", free: false },
                    { day: 22, title: "Modules", topics: ["import/export", "Dynamic imports", "Module patterns"], duration: "2h", free: false },
                    { day: 23, title: "Generators", topics: ["Generator functions", "yield", "Iterators"], duration: "2h", free: false },
                    { day: 24, title: "Proxy & Reflect", topics: ["Proxy object", "Traps", "Use cases"], duration: "2h", free: false },
                    { day: 25, title: "WeakMap & WeakSet", topics: ["WeakMap", "WeakSet", "Memory management"], duration: "2h", free: false },
                ]
            },
            {
                week: 6,
                title: "Best Practices & Projects",
                color: "pink",
                days: [
                    { day: 26, title: "Design Patterns", topics: ["Module", "Singleton", "Factory", "Observer"], duration: "2h", free: false },
                    { day: 27, title: "Error Handling", topics: ["try/catch", "Custom errors", "Debugging"], duration: "2h", free: false },
                    { day: 28, title: "Performance", topics: ["Debouncing", "Throttling", "Optimization"], duration: "2h", free: false },
                    { day: 29, title: "Testing", topics: ["Unit testing", "Jest", "TDD"], duration: "2h", free: false },
                    { day: 30, title: "Final Project", topics: ["Real-world app", "Best practices", "Deployment"], duration: "4h", free: false },
                ]
            }
        ]
    },
    react: {
        title: "React Masterclass",
        subtitle: "Build Modern User Interfaces",
        icon: "⚛️",
        color: "blue",
        gradient: "from-cyan-400 via-blue-500 to-indigo-500",
        totalDays: 25,
        description: "Master React.js workflow, hooks, and patterns",
        weeks: [
            {
                week: 1, title: "React Fundamentals", color: "blue",
                days: [
                    { day: 1, title: "React Basics & JSX", topics: ["Components", "JSX", "Virtual DOM"], duration: "2h", free: true },
                    { day: 2, title: "Components & Props", topics: ["Props", "PropTypes", "Composition"], duration: "2h", free: true },
                    { day: 3, title: "State & useState", topics: ["State", "useState Hook", "Updates"], duration: "2h", free: true },
                    { day: 4, title: "Event Handling", topics: ["Events", "Synthetic Events", "Handlers"], duration: "2h", free: false },
                    { day: 5, title: "Conditional Rendering", topics: ["Ternary", "Lists", "Keys"], duration: "2h", free: false }
                ]
            },
            {
                week: 2, title: "Forms & Side Effects", color: "indigo",
                days: [
                    { day: 6, title: "Forms & Controls", topics: ["Controlled Components", "Validation"], duration: "2h", free: false },
                    { day: 7, title: "useEffect Hook", topics: ["Side Effects", "Dependencies", "Cleanup"], duration: "2h", free: false },
                    { day: 8, title: "Data Fetching", topics: ["API Calls", "Loading States", "Errors"], duration: "2h", free: false },
                    { day: 9, title: "useRef Hook", topics: ["DOM Access", "Mutable Values"], duration: "2h", free: false },
                    { day: 10, title: "Context API", topics: ["Provider", "Consumer", "Global State"], duration: "2h", free: false }
                ]
            },
            {
                week: 3, title: "Advanced Hooks", color: "purple",
                days: [
                    { day: 11, title: "useReducer", topics: ["Reducers", "Complex State", "Dispatch"], duration: "2h", free: false },
                    { day: 12, title: "Memoization", topics: ["useMemo", "useCallback", "React.memo"], duration: "2h", free: false },
                    { day: 13, title: "Custom Hooks", topics: ["Logic Reuse", "Hook Rules", "Composition"], duration: "2h", free: false },
                    { day: 14, title: "React Router", topics: ["Navigation", "Routes", "Links"], duration: "2h", free: false },
                    { day: 15, title: "Protected Routes", topics: ["Guards", "Outlets", "Layouts"], duration: "2h", free: false }
                ]
            },
            {
                week: 4, title: "Advanced Patterns", color: "pink",
                days: [
                    { day: 16, title: "State Patterns", topics: ["Lifting State", "Composition", "Slots"], duration: "2h", free: false },
                    { day: 17, title: "Styling React", topics: ["CSS Modules", "Styled Components", "Tailwind"], duration: "2h", free: false },
                    { day: 18, title: "Performance", topics: ["Code Splitting", "Lazy", "Suspense"], duration: "2h", free: false },
                    { day: 19, title: "Error Boundaries", topics: ["Error Handling", "Fallbacks"], duration: "2h", free: false },
                    { day: 20, title: "Portals & Refs", topics: ["Portals", "Modals", "ForwardRef"], duration: "2h", free: false }
                ]
            },
            {
                week: 5, title: "Real World React", color: "red",
                days: [
                    { day: 21, title: "React Query", topics: ["Server State", "Caching", "Mutations"], duration: "2h", free: false },
                    { day: 22, title: "Form Libraries", topics: ["React Hook Form", "Zod", "Validation"], duration: "2h", free: false },
                    { day: 23, title: "Testing", topics: ["Jest", "RTL", "Integration Tests"], duration: "2h", free: false },
                    { day: 24, title: "TypeScript + React", topics: ["Types", "Interfaces", "Generics"], duration: "2h", free: false },
                    { day: 25, title: "Deployment", topics: ["Build", "Vercel", "Optimization"], duration: "2h", free: false }
                ]
            }
        ]
    },
    html: {
        title: "HTML5 Masterclass",
        subtitle: "The Web's Foundation",
        icon: "🌐",
        color: "orange",
        gradient: "from-orange-400 via-red-500 to-red-600",
        totalDays: 10,
        description: "Master the building blocks of the web",
        weeks: [
            {
                week: 1, title: "Core Fundamentals", color: "orange",
                days: [
                    { day: 1, title: "HTML Basics", topics: ["Tags", "Structure", "Attributes"], duration: "1.5h", free: true },
                    { day: 2, title: "Text & Typography", topics: ["Headings", "Paragraphs", "Lists"], duration: "1.5h", free: true },
                    { day: 3, title: "Links & Navigation", topics: ["Anchors", "Paths", "Nav"], duration: "1.5h", free: true },
                    { day: 4, title: "Images & Media", topics: ["Img", "Audio", "Video"], duration: "1.5h", free: false },
                    { day: 5, title: "Tables", topics: ["Rows", "Cells", "Headers"], duration: "1.5h", free: false }
                ]
            },
            {
                week: 2, title: "Advanced Semantic HTML", color: "red",
                days: [
                    { day: 6, title: "Forms & Inputs", topics: ["Input types", "Validation", "Labels"], duration: "2h", free: false },
                    { day: 7, title: "Semantic Tags", topics: ["Header", "Footer", "Article"], duration: "2h", free: false },
                    { day: 8, title: "SEO & Meta", topics: ["Meta tags", "Open Graph", "SEO"], duration: "2h", free: false },
                    { day: 9, title: "Accessibility (a11y)", topics: ["ARIA", "Roles", "Structure"], duration: "2h", free: false },
                    { day: 10, title: "HTML5 APIs", topics: ["Geo", "Storage", "Canvas"], duration: "2h", free: false }
                ]
            }
        ]
    },
    css: {
        title: "CSS3 Masterclass",
        subtitle: "Style and Layout Mastery",
        icon: "🎨",
        color: "blue",
        gradient: "from-blue-400 via-blue-600 to-indigo-600",
        totalDays: 15,
        description: "Create beautiful, responsive layouts",
        weeks: [
            {
                week: 1, title: "CSS Fundamentals", color: "blue",
                days: [
                    { day: 1, title: "CSS Basics", topics: ["Selectors", "Colors", "Fonts"], duration: "2h", free: true },
                    { day: 2, title: "Box Model", topics: ["Margin", "Padding", "Border"], duration: "2h", free: true },
                    { day: 3, title: "Typography", topics: ["Fonts", "Line-height", "Weights"], duration: "2h", free: true },
                    { day: 4, title: "Backgrounds", topics: ["Images", "Gradients", "Blend"], duration: "2h", free: false },
                    { day: 5, title: "Flexbox", topics: ["Flex", "Justify", "Align"], duration: "2h", free: false }
                ]
            },
            {
                week: 2, title: "Layout & Responsive", color: "indigo",
                days: [
                    { day: 6, title: "Grid Layout", topics: ["Grid Template", "Areas", "Gaps"], duration: "2h", free: false },
                    { day: 7, title: "Positioning", topics: ["Absolute", "Relative", "Fixed"], duration: "2h", free: false },
                    { day: 8, title: "Responsive Design", topics: ["Media Queries", "Breakpoints"], duration: "2h", free: false },
                    { day: 9, title: "Units & Sizing", topics: ["rem", "em", "vh/vw", "clamp"], duration: "2h", free: false },
                    { day: 10, title: "Transforms", topics: ["Scale", "Rotate", "Translate"], duration: "2h", free: false }
                ]
            },
            {
                week: 3, title: "Advanced Visuals", color: "purple",
                days: [
                    { day: 11, title: "Transitions", topics: ["Timing", "Properties", "Delay"], duration: "2h", free: false },
                    { day: 12, title: "Animations", topics: ["Keyframes", "Animation Props"], duration: "2h", free: false },
                    { day: 13, title: "pseudo-classes", topics: ["Hover", "Focus", "Before/After"], duration: "2h", free: false },
                    { day: 14, title: "CSS Variables", topics: ["Custom Props", "Theming"], duration: "2h", free: false },
                    { day: 15, title: "Architecture", topics: ["BEM", "Organization", "Best Practices"], duration: "2h", free: false }
                ]
            }
        ]
    },
    typescript: {
        title: "TypeScript Masterclass",
        subtitle: "Type-Safe JavaScript",
        icon: "🔷",
        color: "blue",
        gradient: "from-blue-600 via-blue-700 to-indigo-800",
        totalDays: 15,
        description: "Master static typing for large scale apps",
        weeks: [
            {
                week: 1, title: "TypeScript Basics", color: "blue",
                days: [
                    { day: 1, title: "Intro to TypeScript", topics: ["Types", "Compilation", "Config"], duration: "2h", free: true },
                    { day: 2, title: "Basic Types", topics: ["Primitives", "Any", "Unknown"], duration: "2h", free: true },
                    { day: 3, title: "Interfaces & Types", topics: ["Interfaces", "Type Aliases", "Union"], duration: "2h", free: true },
                    { day: 4, title: "Functions", topics: ["Signatures", "Overloads", "Optional"], duration: "2h", free: false },
                    { day: 5, title: "Classes", topics: ["Modifiers", "Abstract", "Implements"], duration: "2h", free: false }
                ]
            },
            {
                week: 2, title: "Advanced Types", color: "indigo",
                days: [
                    { day: 6, title: "Generics", topics: ["Generic Functions", "Constraints", "Classes"], duration: "2h", free: false },
                    { day: 7, title: "Utility Types", topics: ["Partial", "Pick", "Omit"], duration: "2h", free: false },
                    { day: 8, title: "Advanced Types", topics: ["Mapped", "Conditional", "Infer"], duration: "2h", free: false },
                    { day: 9, title: "Decorators", topics: ["Class", "Method", "Property"], duration: "2h", free: false },
                    { day: 10, title: "Modules & Namespaces", topics: ["Import/Export", "Declaration Merging"], duration: "2h", free: false }
                ]
            },
            {
                week: 3, title: "Real World TS", color: "purple",
                days: [
                    { day: 11, title: "TS with React", topics: ["Props", "Hooks", "Events"], duration: "2h", free: false },
                    { day: 12, title: "TS with Node", topics: ["Express", "Type Definitions", "Setup"], duration: "2h", free: false },
                    { day: 13, title: "Design Patterns", topics: ["Factory", "Observer", "Singleton"], duration: "2h", free: false },
                    { day: 14, title: "Testing types", topics: ["Type Testing", "dts-jest", "Expect"], duration: "2h", free: false },
                    { day: 15, title: "Migration", topics: ["JS to TS", "Strict Mode", "Best Practices"], duration: "2h", free: false }
                ]
            }
        ]
    },
    angular: {
        title: "Angular Masterclass",
        subtitle: "Enterprise Grade Framework",
        icon: "🅰️",
        color: "red",
        gradient: "from-red-500 via-red-600 to-pink-700",
        totalDays: 28,
        description: "Build scalable applications with Angular",
        weeks: [
            {
                week: 1, title: "Angular Fundamentals", color: "red",
                days: [
                    { day: 1, title: "Angular Intro", topics: ["Architecture", "CLI", "Files"], duration: "2h", free: true },
                    { day: 2, title: "Components", topics: ["Decorator", "Template", "Style"], duration: "2h", free: true },
                    { day: 3, title: "Data Binding", topics: ["Interpolation", "Property", "Event"], duration: "2h", free: true },
                    { day: 4, title: "Directives", topics: ["*ngIf", "*ngFor", "ngClass"], duration: "2h", free: false },
                    { day: 5, title: "Pipes", topics: ["Date", "Currency", "Custom"], duration: "2h", free: false },
                    { day: 6, title: "Component Comm", topics: ["@Input", "@Output", "Events"], duration: "2h", free: false },
                    { day: 7, title: "Lifecycle", topics: ["ngOnInit", "ngOnDestroy", "Changes"], duration: "2h", free: false }
                ]
            },
            {
                week: 2, title: "Forms & Logic", color: "purple",
                days: [
                    { day: 8, title: "Template Forms", topics: ["ngModel", "Validation", "Form"], duration: "2h", free: false },
                    { day: 9, title: "Reactive Forms", topics: ["FormGroup", "FormControl", "Validators"], duration: "2h", free: false },
                    { day: 10, title: "Services", topics: ["Injectable", "Dependency Injection"], duration: "2h", free: false },
                    { day: 11, title: "HTTP Client", topics: ["GET/POST", "Observables", "RxJS"], duration: "2h", free: false },
                    { day: 12, title: "RxJS Basics", topics: ["Map", "Filter", "Subscribe"], duration: "2h", free: false },
                    { day: 13, title: "Routing", topics: ["Router", "Routes", "Navigation"], duration: "2h", free: false },
                    { day: 14, title: "Child Routes", topics: ["Children", "Params", "Activity"], duration: "2h", free: false }
                ]
            },
            {
                week: 3, title: "Advanced Angular", color: "indigo",
                days: [
                    { day: 15, title: "Advanced Routing", topics: ["Guards", "Resolvers", "Lazy Load"], duration: "2h", free: false },
                    { day: 16, title: "Interceptors", topics: ["HttpInterceptor", "Auth", "Error"], duration: "2h", free: false },
                    { day: 17, title: "Directives Deep Dive", topics: ["Attribute", "Structural", "Custom"], duration: "2h", free: false },
                    { day: 18, title: "Content Projection", topics: ["ng-content", "Selectors", "Slots"], duration: "2h", free: false },
                    { day: 19, title: "Dynamic Components", topics: ["ViewContainer", "Factory", "Refs"], duration: "2h", free: false },
                    { day: 20, title: "Change Detection", topics: ["Zone.js", "OnPush", "Strategy"], duration: "2h", free: false },
                    { day: 21, title: "State Management", topics: ["NgRx", "Store", "Actions"], duration: "2h", free: false }
                ]
            },
            {
                week: 4, title: "Mastery & Testing", color: "pink",
                days: [
                    { day: 22, title: "NgRx Effects", topics: ["Side Effects", "Selectors", "Entity"], duration: "2h", free: false },
                    { day: 23, title: "Signals", topics: ["Writable", "Computed", "Effects"], duration: "2h", free: false },
                    { day: 24, title: "Testing", topics: ["Jasmine", "Karma", "TestBed"], duration: "2h", free: false },
                    { day: 25, title: "E2E Testing", topics: ["Cypress", "Protractor", "Page Objects"], duration: "2h", free: false },
                    { day: 26, title: "Performance", topics: ["Lazy Loading", "Preloading", "Optimization"], duration: "2h", free: false },
                    { day: 27, title: "PWA", topics: ["Service Worker", "Manifest", "Offline"], duration: "2h", free: false },
                    { day: 28, title: "Deployment", topics: ["Build", "Prod", "Docker"], duration: "2h", free: false }
                ]
            }
        ]
    },
    zustand: {
        title: "Zustand Masterclass",
        subtitle: "Simple State Management",
        icon: "🐻",
        color: "yellow",
        gradient: "from-yellow-400 via-orange-500 to-red-500",
        totalDays: 8,
        description: "Lightweight state management for React",
        weeks: [
            {
                week: 1, title: "Zustand Core", color: "yellow",
                days: [
                    { day: 1, title: "Intro to Zustand", topics: ["Store", "Hooks", "Setup"], duration: "1h", free: true },
                    { day: 2, title: "State & Actions", topics: ["Updating State", "Async Actions"], duration: "1h", free: true },
                    { day: 3, title: "Selectors", topics: ["Selecting State", "Rerenders"], duration: "1h", free: true },
                    { day: 4, title: "Middleware", topics: ["Persist", "Devtools", "Immer"], duration: "1h", free: false },
                    { day: 5, title: "Async Data", topics: ["Fetching", "Loading", "Errors"], duration: "1h", free: false },
                    { day: 6, title: "Slices Pattern", topics: ["Splitting Store", "Combined"], duration: "1h", free: false },
                    { day: 7, title: "TypeScript", topics: ["Typing Store", "Actions"], duration: "1h", free: false },
                    { day: 8, title: "Best Practices", topics: ["Structure", "Testing", "Tips"], duration: "1h", free: false }
                ]
            }
        ]
    }
};

const colorMap = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500', light: 'bg-blue-50 dark:bg-blue-900/10' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-500', border: 'border-purple-500', light: 'bg-purple-50 dark:bg-purple-900/10' },
    green: { bg: 'bg-green-500', text: 'text-green-500', border: 'border-green-500', light: 'bg-green-50 dark:bg-green-900/10' },
    red: { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500', light: 'bg-red-50 dark:bg-red-900/10' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-500', border: 'border-indigo-500', light: 'bg-indigo-50 dark:bg-indigo-900/10' },
    pink: { bg: 'bg-pink-500', text: 'text-pink-500', border: 'border-pink-500', light: 'bg-pink-50 dark:bg-pink-900/10' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500', light: 'bg-yellow-50 dark:bg-yellow-900/10' },
};

function DayNode({ day, weekColor, techName, isLast }) {
    const colors = colorMap[weekColor] || colorMap.blue;
    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
            <div className="relative flex items-start gap-4 group">
                {/* Vertical Line */}
                {!isLast && (
                    <div className={`absolute left-6 top-12 w-0.5 h-full ${colors.bg} opacity-30`} />
                )}

                {/* Day Circle Node */}
                <div className="relative z-10 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform`}>
                        {day.day}
                    </div>
                    {day.free && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Play size={10} className="text-white" />
                        </div>
                    )}
                    {!day.free && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                            <Lock size={10} className="text-white" />
                        </div>
                    )}
                </div>

                {/* Day Content Card */}
                <div className={`flex-1 p-5 rounded-xl border-2 ${colors.border} ${colors.light} hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]`}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h5 className="font-bold text-lg text-dark-900 dark:text-white">
                                    {day.title}
                                </h5>
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-dark-700 text-gray-600 dark:text-light-300">
                                    {day.duration}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {day.topics.map((topic, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-3 py-1 rounded-full bg-white dark:bg-dark-800 text-gray-700 dark:text-light-300 border border-gray-200 dark:border-dark-600"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3 flex-wrap">
                        {day.free && (
                            <Link
                                href={`/path/${techName}?day=${day.day - 1}`}
                                className={`flex items-center gap-2 px-4 py-2 ${colors.bg} text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105`}
                            >
                                <Play size={16} />
                                <span>Start Free</span>
                            </Link>
                        )}
                        <Link
                            href={`/contact?type=1on1&day=${day.day}&course=${techName}`}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                        >
                            <Video size={16} />
                            <span>Book 1-on-1</span>
                        </Link>
                        <button
                            onClick={() => setShowDetails(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-light-300 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                        >
                            <FileText size={16} />
                            <span>View Details</span>
                        </button>
                        {!day.free && (
                            <Link
                                href="/pricing"
                                className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                            >
                                <Lock size={16} />
                                <span>Unlock Pro</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            {showDetails && (
                <DayDetailsModal
                    day={day}
                    dayNum={day.day}
                    techName={techName}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </>
    );
}

function WeekBranch({ week, techName, isExpanded, onToggle }) {
    const colors = colorMap[week.color] || colorMap.blue;

    return (
        <div className="relative">
            {/* Week Header */}
            <button
                onClick={onToggle}
                className={`w-full p-6 rounded-2xl border-3 ${colors.border} ${colors.light} hover:shadow-2xl transition-all duration-300 flex items-center justify-between group`}
            >
                <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl ${colors.bg} flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                        W{week.week}
                    </div>
                    <div className="text-left">
                        <div className="flex items-center gap-3 mb-1">
                            <span className={`text-sm font-bold ${colors.text}`}>
                                Week {week.week}
                            </span>
                            <span className="text-xs px-3 py-1 rounded-full bg-white dark:bg-dark-800 text-gray-700 dark:text-light-300">
                                {week.days.length} Days
                            </span>
                        </div>
                        <h4 className="font-bold text-xl text-dark-900 dark:text-white">
                            {week.title}
                        </h4>
                    </div>
                </div>
                <div className={`${colors.text} transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown size={32} />
                </div>
            </button>

            {/* Days Tree */}
            {isExpanded && (
                <div className="mt-6 ml-12 space-y-6 relative">
                    {/* Horizontal connecting line */}
                    <div className={`absolute left-0 top-6 w-6 h-0.5 ${colors.bg} opacity-30`} />

                    {week.days.map((day, idx) => (
                        <DayNode
                            key={day.day}
                            day={day}
                            weekColor={week.color}
                            techName={techName}
                            isLast={idx === week.days.length - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function TechnologyTree({ tech, data }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedWeeks, setExpandedWeeks] = useState(new Set());

    const toggleWeek = (weekNum) => {
        const newExpanded = new Set(expandedWeeks);
        if (newExpanded.has(weekNum)) {
            newExpanded.delete(weekNum);
        } else {
            newExpanded.add(weekNum);
        }
        setExpandedWeeks(newExpanded);
    };

    const expandAll = () => {
        setExpandedWeeks(new Set(data.weeks.map(w => w.week)));
    };

    const collapseAll = () => {
        setExpandedWeeks(new Set());
    };

    return (
        <div className="bg-white dark:bg-dark-800 rounded-3xl border-4 border-gray-200 dark:border-dark-700 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
            {/* Technology Root Node */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-full p-8 bg-gradient-to-r ${data.gradient} hover:opacity-90 transition-all`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="text-8xl drop-shadow-2xl">{data.icon}</div>
                        <div className="text-left text-white">
                            <h3 className="text-4xl font-black mb-2 drop-shadow-lg">
                                {data.title}
                            </h3>
                            <p className="text-xl font-semibold mb-3 opacity-90">
                                {data.subtitle}
                            </p>
                            <div className="flex items-center gap-4">
                                <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full font-bold text-sm">
                                    {data.totalDays} Days
                                </span>
                                <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full font-bold text-sm">
                                    {data.weeks.length} Weeks
                                </span>
                                <span className="px-4 py-2 bg-green-500 rounded-full font-bold text-sm flex items-center gap-1">
                                    <CheckCircle2 size={16} />
                                    3 Days Free
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-white">
                        {isExpanded ? <ChevronDown size={48} /> : <ChevronRight size={48} />}
                    </div>
                </div>
            </button>

            {/* Week Branches */}
            {isExpanded && (
                <div className="p-8 bg-gray-50 dark:bg-dark-900/50">
                    {/* Controls */}
                    <div className="flex items-center justify-between mb-8 p-4 bg-white dark:bg-dark-800 rounded-xl border-2 border-gray-200 dark:border-dark-700">
                        <div className="flex items-center gap-3">
                            <BookOpen className="text-brand-primary" size={24} />
                            <span className="font-bold text-dark-900 dark:text-white">
                                Complete {data.totalDays}-Day Roadmap
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={expandAll}
                                className="px-4 py-2 bg-brand-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                            >
                                Expand All
                            </button>
                            <button
                                onClick={collapseAll}
                                className="px-4 py-2 bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-light-300 rounded-lg font-semibold hover:shadow-lg transition-all"
                            >
                                Collapse All
                            </button>
                        </div>
                    </div>

                    {/* Week Tree */}
                    <div className="space-y-6">
                        {data.weeks.map((week) => (
                            <WeekBranch
                                key={week.week}
                                week={week}
                                techName={tech}
                                isExpanded={expandedWeeks.has(week.week)}
                                onToggle={() => toggleWeek(week.week)}
                            />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className={`mt-12 p-8 bg-gradient-to-r ${data.gradient} rounded-2xl text-white`}>
                        <div className="flex items-center gap-4 mb-4">
                            <Zap size={40} />
                            <div>
                                <h4 className="text-3xl font-bold mb-2">
                                    Ready to Master {data.title.split(' ')[0]}?
                                </h4>
                                <p className="text-lg opacity-90">
                                    Book a free consultation to discuss your learning goals
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                            <Link
                                href={`/contact?type=1on1&course=${tech}`}
                                className="px-8 py-4 bg-white text-brand-primary rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2"
                            >
                                <Calendar size={20} />
                                <span>Book Free 1-on-1 Consultation</span>
                            </Link>
                            <Link
                                href={`/path/${tech}`}
                                className="px-8 py-4 bg-white/20 backdrop-blur border-2 border-white text-white rounded-xl font-bold hover:bg-white/30 transition-all flex items-center gap-2"
                            >
                                <Play size={20} />
                                <span>Start Learning Free</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export function CompleteCurriculumRoadmap() {
    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-800 dark:to-dark-900">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-block mb-6">
                        <span className="px-6 py-3 bg-gradient-to-r from-brand-primary/20 to-purple-500/20 text-brand-primary rounded-full text-sm font-bold border-2 border-brand-primary/30">
                            🌳 Complete Learning Tree
                        </span>
                    </div>
                    <h2 className="text-6xl md:text-7xl font-black text-dark-900 dark:text-white mb-6">
                        Your <span className="bg-gradient-to-r from-brand-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">Learning Journey</span>
                    </h2>
                    <p className="text-2xl text-gray-600 dark:text-light-300 max-w-4xl mx-auto leading-relaxed">
                        Explore our complete day-by-day roadmaps. <strong>Book 1-on-1 sessions</strong> for any day to get personalized mentorship.
                    </p>
                </div>

                {/* Technology Trees */}
                <div className="space-y-12">
                    {Object.entries(completeCurriculumData).map(([tech, data]) => (
                        <TechnologyTree key={tech} tech={tech} data={data} />
                    ))}
                </div>
            </div>

            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
        </section>
    );
}

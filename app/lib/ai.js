const questions = {
    JavaScript: [
        {
            question: "What is the output of `0.1 + 0.2 === 0.3` and why?",
            options: ["true", "false", "undefined", "NaN"],
            answer: 1,
            explanation: "It returns `false` due to floating-point precision issues in IEEE 754 standard used by JavaScript (result is 0.30000000000000004)."
        },
        {
            question: "Explain the difference between `microtasks` and `macrotasks` in the Event Loop.",
            options: ["They are the same", "Macrotasks run before microtasks", "Microtasks (Promises) run immediately after the current script, before the next macrotask (setTimeout)", "Microtasks run after render"],
            answer: 2,
            explanation: "The event loop processes the microtask queue to completion after the current stack empties and before the next macrotask or render."
        },
        {
            question: "What memory leak is caused by a `WeakMap`?",
            options: ["It holds strong references to keys", "It holds strong references to values", "It cannot cause memory leaks on keys", "It prevents garbage collection of values"],
            answer: 2,
            explanation: "`WeakMap` holds 'weak' references to keys, allowing them to be garbage collected if no other references exist. It does NOT prevent GC."
        },
        {
            question: "What does the `Proxy` object enable in JavaScript?",
            options: ["Creating API proxies", "Intercepting and defining custom behavior for fundamental operations", "Creating strict types", "Optimizing V8 garbage collection"],
            answer: 1,
            explanation: "`Proxy` allows you to wrap an object and trap operations like property lookup, assignment, enumeration, function invocation, etc."
        },
        {
            question: "What is the 'Temporal Dead Zone' (TDZ)?",
            options: ["Time between function call and execution", "The period between entering scope and variable declaration via `let`/`const`", "Offline state of a Service Worker", "Time before garbage collection"],
            answer: 1,
            explanation: "Variables declared with `let` or `const` exist in the TDZ from the start of the block until the declaration is processed."
        },
        {
            question: "How do Generators (`function*`) differ from normal functions?",
            options: ["They are faster", "They can be paused and resumed using `yield`", "They cannot return values", "They are always async"],
            answer: 1,
            explanation: "Generators can exit and later re-enter their context. Their variable bindings are saved across re-entrances."
        },
        {
            question: "What is the difference between `Object.seal()` and `Object.freeze()`?",
            options: ["Freeze allows editing existing properties", "Seal allows adding new properties", "Seal allows modifying existing property values, Freeze does not", "They are identical"],
            answer: 2,
            explanation: "`Object.seal()` prevents adding/deleting properties but allows modifying values. `Object.freeze()` makes the object truly immutable."
        },
        {
            question: "What happens if you use `await` inside a `forEach` loop?",
            options: ["It waits for each item sequentially", "It throws a syntax error", "The loop finishes immediately without waiting for promises to resolve", "It runs in parallel threads"],
            answer: 2,
            explanation: "`forEach` does not await the callback. It fires off the async callbacks and returns immediately. Use `for...of` for sequential waiting."
        },
        {
            question: "What is the purpose of `Reflect` API?",
            options: ["To mirror DOM elements", "To simplify proxy creation and forward default operations", "To reflect UI changes", "To debug memory leaks"],
            answer: 1,
            explanation: "`Reflect` methods correspond to Proxy traps, allowing you to easily forward default behavior inside a Proxy trap."
        },
        {
            question: "Which of the following is NOT a primitive type in JavaScript?",
            options: ["Symbol", "BigInt", "null", "Date"],
            answer: 3,
            explanation: "`Date` is an Object. Primitives are: string, number, bigint, boolean, undefined, symbol, and null."
        }
    ],

    TypeScript: [
        {
            question: "What does the `infer` keyword do in Conditional Types?",
            options: ["Infers the type of a variable at runtime", "Declares a type variable within a conditional type to be inferred from the type being checked", "Automatically types 'any'", "Compiles TS to JS faster"],
            answer: 1,
            explanation: "`infer` allows you to extract and name a type from within a type relationship (e.g., pulling the return type of a function)."
        },
        {
            question: "What is the difference between `interface` and `type` regarding declaration merging?",
            options: ["There is no difference", "Interfaces can represent primitives", "Interfaces support declaration merging; Types do not", "Types are open for extension"],
            answer: 2,
            explanation: "Multiple declarations of the same `interface` name merge together. `type` aliases must be unique and cannot merge."
        },
        {
            question: "Typescript is structurally typed. What does this mean?",
            options: ["Types are checked by name (nominal)", "Types are compatible if their members are compatible", "Types must inherit from the same class", "It uses Java-like typing"],
            answer: 1,
            explanation: "TypeScript uses 'duck typing' or structural typing. `Type A` is assignable to `Type B` if `A` has all properties required by `B`."
        },
        {
            question: "What is the purpose of `never` type?",
            options: ["To represent a value that never occurs (e.g., throwing functions)", "To represent undefined", "To represent null", "To disable type checking"],
            answer: 0,
            explanation: "`never` represents the type of values that never occur, such as a function that always throws an error or an infinite loop."
        },
        {
            question: "How do you make a type property immutable?",
            options: ["Using the `const` keyword", "Using the `readonly` modifier", "Using `static`", "Using `private`"],
            answer: 1,
            explanation: "`readonly` prevents assignment to a property after initialization."
        },
        {
            question: "What is the difference between `unknown` and `any`?",
            options: ["They are identical", "`unknown` is safer; you must check the type before using it", "`any` is safer", "`unknown` cannot key objects"],
            answer: 1,
            explanation: "`unknown` is the type-safe counterpart of `any`. You cannot perform operations on `unknown` without narrowing it first."
        },
        {
            question: "What does `keyof` operator do?",
            options: ["Returns the keys of an object at runtime", "Returns a union type of known, public property names of a type", "Returns values of an object", " iterates over keys"],
            answer: 1,
            explanation: "`keyof T` produces a string or numeric literal union of the keys of `T`."
        },
        {
            question: "What is a 'Discriminated Union'?",
            options: ["A union of types that all share a common singleton property (discriminant)", "A union of primitive types", "A type intersection", "A generic class"],
            answer: 0,
            explanation: "Discriminated unions use a common literal property (like `kind` or `type`) to allow TS to narrow the type in a switch/if block."
        },
        {
            question: "What does the `satisfies` operator (TS 4.9+) do?",
            options: ["Checks type compatibility without widening/losing literal types", "Casts a variable to a type", "Forces a compiler error", "Checks runtime validity"],
            answer: 0,
            explanation: "`satisfies` validates that an expression matches a type but retains the most specific type of the expression (unlike generic annotation)."
        },
        {
            question: "What is Covariance in TypeScript?",
            options: ["Accepting a wider type", "Accepting a narrower type", "Types varying together", "Arrays are covariant in TS"],
            answer: 3,
            explanation: "In TS, arrays and object properties are generally covariant (you can pass `Dog[]` to `Animal[]`), though this can sometimes be unsafe."
        }
    ],

    React: [
        {
            question: "Why should you NOT define a component inside another component?",
            options: ["It is forbidden by JSX", "The inner component re-mounts on every render of the parent", "It breaks styling", "It causes memory leaks"],
            answer: 1,
            explanation: "Defining it inside creates a new function reference every render, forcing React to unmount and remount it (losing state/focus)."
        },
        {
            question: " What allows React to handle concurrent rendering (React 18)?",
            options: ["The Fiber architecture", "Virtual DOM", "JQuery integration", "Web Workers"],
            answer: 0,
            explanation: "Fiber allows React to pause, resume, and prioritize work chunks, enabling features like Suspense and `useTransition`."
        },
        {
            question: "What is the difference between `useLayoutEffect` and `useEffect`?",
            options: ["They are identical", "useLayoutEffect runs synchronously after DOM mutations but before paint", "useEffect runs before render", "useLayoutEffect is for server-side only"],
            answer: 1,
            explanation: "`useLayoutEffect` blocks the browser paint. Use it for measuring DOM layout to avoid visual flickering."
        },
        {
            question: "How does React detect changes in the Dependency Array?",
            options: ["Deep equality check", "Shallow equality check (Object.is)", "JSON.stringify", "Reference counting"],
            answer: 1,
            explanation: "React compares dependencies using `Object.is` (shallow comparison). New object references trigger re-runs."
        },
        {
            question: "What is the 'Rule of Hooks' regarding conditionality?",
            options: ["Hooks can cover if-else blocks", "Hooks must be called in the exact same order every render", "Hooks work in loops", "Hooks can be nested"],
            answer: 1,
            explanation: "React relies on the call order to map hooks to internal state. Standard hooks cannot be called conditionally or in loops."
        },
        {
            question: "What is the purpose of `useImperativeHandle`?",
            options: ["To optimize rendering", "To customize the instance value exposed to parent via ref", "To handle errors", "To manage global state"],
            answer: 1,
            explanation: "It lets you customize what a parent component receives when using a ref on your child component (mostly used with `forwardRef`)."
        },
        {
            question: "What is 'Prop Drilling' and how do you avoid it?",
            options: ["Passing props deeply; avoid generally", "Passing props via Context or Composition", "Drilling holes in DOM", "A styling technique"],
            answer: 1,
            explanation: "Prop drilling is passing data through many layers. Context API or Component Composition (passing children) solves it."
        },
        {
            question: "What is a Higher-Order Component (HOC)?",
            options: ["A component that renders high in the tree", "A function that takes a component and returns a new component", "A component connected to Redux", "A parent component"],
            answer: 1,
            explanation: "HOC is a pattern for reusing component logic. `const Enhanced = withLogic(WrappedComponent)`."
        },
        {
            question: "When would you use `flushSync`?",
            options: ["To clear cache", "To force a synchronous updates inside an event handler", "To flush logs", "To sync with backend"],
            answer: 1,
            explanation: "`flushSync` forces React to flush updates synchronously. Use sparingly (e.g., ensuring DOM is updated before focusing)."
        },
        {
            question: "What is Automatic Batching in React 18?",
            options: ["Batches only event handlers", "Batches state updates inside promises, timeouts, and native handlers", "Disables batching", "Batches API calls"],
            answer: 1,
            explanation: "Prior to 18, only React events were batched. Now updates inside `setTimeout` or `fetch` are also batched to reduce renders."
        }
    ],

    Angular: [
        {
            question: "Explain the difference between `mergeMap` and `switchMap` in RxJS.",
            options: ["They are identical", "`mergeMap` handles all, `switchMap` cancels previous inner observables", "`switchMap` runs in parallel", "`mergeMap` cancels previous"],
            answer: 1,
            explanation: "`switchMap` unsubscribes from the previous inner observable when a new value arrives (good for search). `mergeMap` runs all concurrently."
        },
        {
            question: "What is the 'Zone.js' library responsible for?",
            options: ["Styling", "Monkey-patching async APIs to trigger Change Detection", "Routing", "HTTP requests"],
            answer: 1,
            explanation: "Zone.js patches global async tasks (setTimeout, promises, DOM events) to notify Angular when to check for changes."
        },
        {
            question: "What does the `@Self()` decorator do in Dependency Injection?",
            options: ["Looks for dependency in parent", "Restricts dependency resolution to the local injector only", "Injects the component itself", "Skips the current injector"],
            answer: 1,
            explanation: "`@Self()` tells DI to look for the provider only in the element's local injector, not walking up the tree."
        },
        {
            question: "What is the difference between `Pure` and `Impure` pipes?",
            options: ["Pure pipes run on every change detection", "Impure pipes run only when input reference changes", "Pure pipes output strings", "Pure pipes run only when input arguments change (reference check)"],
            answer: 3,
            explanation: "Pure pipes are optimized to run only when inputs change. Impure pipes run on every CD cycle (e.g., for arrays mutated in place)."
        },
        {
            question: "What is the `APP_INITIALIZER` token used for?",
            options: ["Styling app on load", "Running code during app startup before the app renders", "Initializing the router", "Defining global constants"],
            answer: 1,
            explanation: "It allows you to provide a function that runs during startup. Angular will wait for any Promises to resolve before bootstrapping."
        },
        {
            question: "How do you optimize an `OnPush` component that relies on an Observable?",
            options: ["Use `ChangeDetectorRef.detectChanges()` within `subscribe`", "Use the `AsyncPipe` in the template", "Convert to Default strategy", "Use `setTimeout`"],
            answer: 1,
            explanation: "`AsyncPipe` automatically subscribes and calls `markForCheck()` when new values arrive, working perfectly with OnPush."
        },
        {
            question: "What is ViewEncapsulation.ShadowDom?",
            options: ["Simulates scoped CSS", "Uses native browser Shadow DOM for style isolation", "Global styles", "None of the above"],
            answer: 1,
            explanation: "`ShadowDom` uses the browser's native Shadow DOM api. `Emulated` (default) simulates scoping via attributes."
        },
        {
            question: "What is a 'Resolver' in Angular Router?",
            options: ["It resolves DNS", "It pre-fetches data before a route is activated", "It resolves compilation errors", "It maps URLs"],
            answer: 1,
            explanation: "Resolvers ensure critical data is loaded before the component renders. If the resolver fails, navigation is cancelled."
        },
        {
            question: "What is 'Tree Shaking' in the context of Angular?",
            options: ["DOM manipulation", "Removing unused code during build", "Animation style", "Service hierarchy"],
            answer: 1,
            explanation: "The build process removes code that is never imported/used. `providedIn: 'root'` aids this for services."
        },
        {
            question: "What feature allows you to render multiple templates into a named outlet?",
            options: ["`<ng-content>`", "Named `RouterOutlet` (auxiliary routes)", "`<ng-container>`", "Directives"],
            answer: 1,
            explanation: "Secondary/Auxiliary routes allow rendering other component trees in distinct `<router-outlet name='x'>` locations."
        }
    ],

    Vue: [
        {
            question: "What is the fundamental difference between Vue 2 and Vue 3 reactivity?",
            options: ["Vue 3 uses `Object.defineProperty`", "Vue 3 uses ES6 `Proxy`", "Vue 3 has no reactivity", "Vue 2 uses Proxy"],
            answer: 1,
            explanation: "Vue 3 uses `Proxy`, allowing detection of property addition/deletion and array index mutations, which Vue 2 couldn't detect."
        },
        {
            question: "What is the `teleport` component used for?",
            options: ["Moving code between files", "Rendering DOM nodes outside the component's DOM hierarchy", "Virtual scrolling", "Routing"],
            answer: 1,
            explanation: "`<Teleport>` moves content to another part of the DOM (e.g., `body`) while keeping the component hierarchy logical."
        },
        {
            question: "What is the Composition API?",
            options: ["A styling library", "A purely functional way to organize code using `setup()`", "A CSS processor", "A plugin system"],
            answer: 1,
            explanation: "Composition API organizes code by logical concern (feature) rather than by component option (data, methods, mounted)."
        },
        {
            question: "Why should `v-if` and `v-for` NOT be used on the same element?",
            options: ["It is a syntax error", "Performance/Precedence ambiguity (v-if has higher priority in Vue 3)", "The loop will verify", "Styling breaks"],
            answer: 1,
            explanation: "In Vue 3, `v-if` has precendence. It won't have access to the `v-for` scope variable. Wrap the loop or the condition."
        },
        {
            question: "What is the purpose of `nextTick()`?",
            options: ["To tick the clock", "To execute code after the next DOM update cycle", "To force a re-render", "To delay 1 second"],
            answer: 1,
            explanation: "Vue updates the DOM asynchronously. `nextTick` waits until the DOM has actually updated."
        },
        {
            question: "How does `provide`/`inject` work in Vue?",
            options: ["Global state management", "Dependency injection down the component tree (props alternative)", "Server interactions", "Event handling"],
            answer: 1,
            explanation: "It allows ancestors to provide data to all descendants without prop drilling."
        },
        {
            question: "What is a 'computed' property's caching behavior?",
            options: ["Never cached", "Cached based on reactive dependencies", "Cached for 1 second", "Cached until page reload"],
            answer: 1,
            explanation: "Computed properties are memoized. They only re-evaluate if their reactive dependencies change."
        },
        {
            question: "What lifecycle hook corresponds to `setup()` in Composition API?",
            options: ["created", "mounted", "beforeCreate / created", "beforeMount"],
            answer: 2,
            explanation: "`setup()` runs before component instance creation. It replaces `beforeCreate` and `created`."
        },
        {
            question: "What is the `Suspense` component?",
            options: ["Error boundary", "Orchestrates async dependencies (async setup/components)", "Lazy loading routes", "Data prefetching"],
            answer: 1,
            explanation: "`Suspense` (experimental) renders a fallback state while nested async components resolve."
        },
        {
            question: "How do you define a custom directive in `<script setup>`?",
            options: ["Register globally", "Variable starting with `v` (e.g. `const vFocus = ...`)", "Use `defineDirective`", "Not possible"],
            answer: 1,
            explanation: "In `<script setup>`, any camelCase variable starting with `v` is automatically available as a custom directive."
        }
    ],

    "Node.js": [
        {
            question: "Which phase of the event loop executes `setTimeout` callbacks?",
            options: ["Poll phase", "Check phase", "Timers phase", "Close callbacks"],
            answer: 2,
            explanation: "The 'Timers' phase executes callbacks scheduled by `setTimeout()` and `setInterval()`."
        },
        {
            question: "What is the difference between `process.nextTick()` and `setImmediate()`?",
            options: ["They are identical", "`nextTick` runs immediately after current operation (microtask-like), `setImmediate` runs in Check phase", "`setImmediate` is faster", "`nextTick` is for browsers"],
            answer: 1,
            explanation: "`nextTick` fires on the same loop tick (before IO/timers). `setImmediate` fires on the next loop iteration (Check phase)."
        },
        {
            question: "How does Node.js handle concurrency if it's single-threaded?",
            options: ["It isn't concurrent", "It uses the Worker Pool (libuv) for I/O and the Event Loop", "It creates a thread per request", "It uses Java threads"],
            answer: 1,
            explanation: "Heavy I/O is offloaded to the C++ Worker Pool (libuv threads), while JS executes on the main thread via Event Loop."
        },
        {
            question: "What is a 'Stream' in Node.js?",
            options: ["A collection of data", "An interface for handling streaming data (chunks)", "A continuous loop", "A river"],
            answer: 1,
            explanation: "Streams process data piece-by-piece (chunks) without loading the entire file into memory (efficient for large files)."
        },
        {
            question: "What is the default size of the variable heap in V8 (Node) roughly?",
            options: ["Unlimited", "~1.5 GB (64-bit)", "100 MB", "8 GB"],
            answer: 1,
            explanation: "Historically around 1.4GB-2GB on 64-bit systems, though configurable via `--max-old-space-size`."
        },
        {
            question: "What is the Cluster module used for?",
            options: ["Grouping files", "Spawning multiple child processes to utilize multi-core CPUs", "Database clustering", "Memory management"],
            answer: 1,
            explanation: "It spawns worker processes (copies of the app) to share the server port and utilize all CPU cores."
        },
        {
            question: "What is a major downside of 'Uncaught Exceptions' in Node?",
            options: ["They are ignored", "They can leave the process in an undefined state", "They slow down the loop", "They print nice logs"],
            answer: 1,
            explanation: "An uncaught exception bubbles up and can crash the process. Even if caught globally, state might be corrupt."
        },
        {
            question: "What is `Buffer`?",
            options: ["A temporary storage for raw binary data", "A loading bar", "A string manipulator", "A browser feature"],
            answer: 0,
            explanation: "Buffers handle binary data (TCP streams, file system ops, etc.) outside the V8 heap."
        },
        {
            question: "What is 'Backpressure' in streams?",
            options: ["High CPU usage", "Data accumulating faster than the consumer can process", "Network lag", "Disk full"],
            answer: 1,
            explanation: "Backpressure occurs when the write buffer fills up; the Readable stream should pause until the Writable is ready."
        },
        {
            question: "Does Node.js support multi-threading directly in JS code?",
            options: ["Yes, via `Worker Threads` module", "No, never", "Yes, using `async/await`", "Yes, using `child_process`"],
            answer: 0,
            explanation: "Since Node 10.5+, the `worker_threads` module allows running JS in parallel threads sharing memory (SharedArrayBuffer)."
        }
    ],

    MongoDB: [
        {
            question: "What differentiates a Cap Diagram / ACID regarding MongoDB?",
            options: ["Mongo is CP (Consistency/Partition)", "Mongo is AP", "Mongo supports multi-document ACID transactions (v4.0+), shifting from purely BASE", "Mongo has no transactions"],
            answer: 2,
            explanation: "Since v4.0, MongoDB supports multi-document ACID transactions, similar to SQL, though with performance costs."
        },
        {
            question: "What is the Aggregation Framework?",
            options: ["A backup tool", "A pipeline to process/analyze data records (filtering, grouping, reshaping)", "A collection joiner", "A GUI"],
            answer: 1,
            explanation: "It uses a pipeline of stages (`$match`, `$group`, `$project`) to perform complex analytics on the server side."
        },
        {
            question: "What is Sharding?",
            options: ["Data replication", "Splitting data across multiple machines (horizontal scaling)", "Indexing", "Backup strategy"],
            answer: 1,
            explanation: "Sharding distributes a collection's data across multiple servers (shards) based on a shard key."
        },
        {
            question: "Which index type expires documents automatically?",
            options: ["Text Index", "TTL (Time-To-Live) Index", "Sparse Index", "Compound Index"],
            answer: 1,
            explanation: "TTL indexes delete documents after a specified amount of time or at a specific clock time."
        },
        {
            question: "What is `$lookup` used for?",
            options: ["Searching text", "Left outer join with another collection", "Checking server status", "Updating fields"],
            answer: 1,
            explanation: "`$lookup` performs a left outer join to another collection in the same database to filter in documents from the 'joined' collection."
        },
        {
            question: "What is correct about MongoDB Schemas?",
            options: ["It enforces SQL schemas", "It is schema-less implies no validation", "It has flexible schema but supports Schema Validation rules", "Schema is required"],
            answer: 2,
            explanation: "While flexible (documents can vary), you can enforce structure using JSON Schema Validation."
        },
        {
            question: "What is a Replica Set?",
            options: ["A set of shards", "A group of mongod instances maintaining the same data set (Redundancy/High Availability)", "A backup file", "A query cache"],
            answer: 1,
            explanation: "Replica sets provide redundancy and failover. One primary node receives writes; secondary nodes replicate the data."
        },
        {
            question: "When should you use Embedded Documents vs References?",
            options: ["Always embed", "Embed when data is accessed together (1-to-few), Reference for large/unbounded growth (1-to-many)", "Always reference", "Embed for arrays only"],
            answer: 1,
            explanation: "Embedding improves read performance (single seek). Referencing prevents document size limit (16MB) issues."
        },
        {
            question: "What is the BSON format?",
            options: ["Binary JSON", "Basic JSON", "Browser JSON", "Backend JSON"],
            answer: 0,
            explanation: "Binary JSON. It extends JSON with types like Date and Binary, and is optimized for efficient scanning/traversal."
        },
        {
            question: "What is the WiredTiger storage engine's primary concurrency model?",
            options: ["Database-level locking", "Collection-level locking", "Document-level concurrency", "Global locking"],
            answer: 2,
            explanation: "WiredTiger uses optimistic concurrency control at the document level, allowing high write throughput."
        }
    ],

    Python: [
        {
            question: "What is the GIL (Global Interpreter Lock)?",
            options: ["A security feature", "A mutex that allows only one thread to hold control of the Python interpreter", "A garbage collector", "A module loader"],
            answer: 1,
            explanation: "The GIL prevents multiple native threads from executing Python bytecodes at once, impacting CPU-bound multi-threading."
        },
        {
            question: "What is a 'decorator' in Python?",
            options: ["A design pattern only", "A function that takes another function and extends its behavior", "A CSS style", "A variable type"],
            answer: 1,
            explanation: "Decorators (`@wrapper`) modify functions or classes. Syntactic sugar for `func = decorator(func)`."
        },
        {
            question: "Difference between `__str__` and `__repr__`?",
            options: ["No difference", "`__str__` is for end-users, `__repr__` is unambiguous for developers", "`__str__` is for debugging", "`__repr__` is deprecated"],
            answer: 1,
            explanation: "`__str__` aims for readability. `__repr__` aims to be unambiguous (often valid code to recreate the object)."
        },
        {
            question: "What does `yield` keyword do?",
            options: ["Stops the program", "Turns a function into a generator", "Returns a value and exits", "Declares a variable"],
            answer: 1,
            explanation: "It pauses the function saving its state, and yields a value. Calling `next()` resumes execution."
        },
        {
            question: "How is memory managed in Python?",
            options: ["Manual allocation", "Reference counting + Garbage Collection for cycles", "Only Garbage Collection", "Stack only"],
            answer: 1,
            explanation: "Primary mechanism is reference counting. A cyclic GC runs periodically to clean up reference cycles."
        },
        {
            question: "What are `*args` and `**kwargs`?",
            options: ["Syntax errors", "Variable length positional and keyword arguments", "Multiplication and exponentiation", "Pointers"],
            answer: 1,
            explanation: "`*args` passes variable number of non-keyword arguments (tuple). `**kwargs` passes variable keyword arguments (dict)."
        },
        {
            question: "What is a 'Context Manager' (`with` statement)?",
            options: ["Manages threads", "Handles resource setup/teardown automatically (files, locks)", "A variable scope", "A database connection"],
            answer: 1,
            explanation: "Ensures resources are cleaned up (like closing a file) even if errors occur. Implements `__enter__` and `__exit__`."
        },
        {
            question: "What is MRO (Method Resolution Order)?",
            options: ["Order of function execution", "Order in which base classes are searched for a method", "Alphabetical order", "Random"],
            answer: 1,
            explanation: "Python uses C3 linearization to determine the class search path for inherited methods (important in multiple inheritance)."
        },
        {
            question: "Types in Python are...",
            options: ["Static", "Strongly typed but Dynamic", "Weakly typed", "Compiled"],
            answer: 1,
            explanation: "Python is dynamically typed (checked at runtime) but strongly typed (no implicit type coercion like JS)."
        },
        {
            question: "What is `asyncio`?",
            options: ["A threading library", "A library to write concurrent code using async/await syntax", "A database driver", "A web framework"],
            answer: 1,
            explanation: "It handles I/O-bound tasks cooperatively on a single thread using an event loop."
        }
    ],

    Redux: [
        {
            question: "What are the three core principles of Redux?",
            options: ["State is distributed, Mutations allowed, Async reducers", "Single Source of Truth, State is Read-Only, Changes via Pure Functions", "MVC Architecture", "Services and Components"],
            answer: 1,
            explanation: "1. The global store. 2. Actions describe changes. 3. Reducers are pure functions."
        },
        {
            question: "Why must reducers be pure functions?",
            options: ["For performance", "To prevent side effects and enable time-travel debugging", "It is optional", "To save memory"],
            answer: 1,
            explanation: "Impure reducers (mutating args, API calls) break state predictability, hot reloading, and time travel."
        },
        {
            question: "What is the purpose of 'Thunk' middleware?",
            options: ["To logs actions", "To allow action creators to return a function (for async logic)", "To compress state", "To route pages"],
            answer: 1,
            explanation: "Thunks delay the dispatch of an action, allowing async logic (like API calls) before dispatching the final action."
        },
        {
            question: "What does `connect` (or `useSelector`) do?",
            options: ["Updates the database", "Subscribes the component to the Redux store updates", "Creates a new store", "Dispatches actions"],
            answer: 1,
            explanation: "It connects the React component to the Redux store, re-rendering when selected state changes."
        },
        {
            question: "What problem does 'Normalization' solve in Redux?",
            options: ["Making IDs incremental", "Avoiding deeply nested data duplication/updates", "Formating text", "Sorting arrays"],
            answer: 1,
            explanation: "Storing data like a database (flat objects by ID) prevents duplication and makes updates easier content-wise."
        },
        {
            question: "What is the Selector pattern used for?",
            options: ["CSS styling", "Encapsulating state lookup and computing derived data", "selecting DOM elements", "Switch cases"],
            answer: 1,
            explanation: "Selectors extract data from the store. Memoized selectors (Reselect) prevent recalculation unless inputs change."
        },
        {
            question: "How does Redux Toolkit's `createSlice` handle immutability?",
            options: ["It enforces manual copying", "It uses Immer internally to allow 'mutating' logic that drafts safe immutable updates", "It disables immutability checks", "It uses `Object.freeze`"],
            answer: 1,
            explanation: "Immer lets you write mutable code (`state.value = 123`) which it converts to safe immutable updates under the hood."
        },
        {
            question: "What is the difference between Redux and Context API?",
            options: ["No difference", "Redux is built for complex state management (middleware, devtools, performance), Context is for dependency injection", "Context is faster", "Redux is dead"],
            answer: 1,
            explanation: "Context is great for low-velocity global data (theme, user). Redux excels at high-frequency updates and complex logic."
        },
        {
            question: "What is 'Action Creator'?",
            options: ["The store itself", "A function that returns an action object", "A reducer", "A middleware"],
            answer: 1,
            explanation: "A helper function that creates the action object, encapsulating logic/structure."
        },
        {
            question: "What is the typical flow of data in Redux?",
            options: ["Bi-directional", "Strict Unidirectional (One-way)", "Random", "Parent-Child only"],
            answer: 1,
            explanation: "Action -> Dispatch -> Middleware -> Reducer -> Store -> View."
        }
    ]
};

function shuffle(arr) {
    return [...arr].sort(() => 0.5 - Math.random());
}

export const getQuestionsForTech = (techs) => {
    const list = Array.isArray(techs) ? techs : [];
    const perTech = 10;
    const cap = Math.max(perTech, Math.min(30, list.length * perTech));

    let selected = [];
    list.forEach((tech) => {
        if (questions[tech]?.length) {
            selected = selected.concat(
                shuffle(questions[tech])
                    .slice(0, perTech)
                    .map((q) => ({ ...q, technology: tech }))
            );
        }
    });

    // Fallback if user selects techs with no questions
    if (selected.length === 0) {
        selected = shuffle(questions.JavaScript).slice(0, perTech).map((q) => ({ ...q, technology: 'JavaScript' }));
    }

    return shuffle(selected).slice(0, cap);
};

const questions = {
    JavaScript: [
        {
            question: "What is the difference between `let`, `const`, and `var`?",
            options: ["They are identical", "`var` is block-scoped like `let`", "Scope + redeclaration/reassignment rules differ", "`const` makes objects immutable"],
            answer: 2,
            explanation: "`let/const` are block-scoped; `var` is function-scoped. `var` allows redeclaration. `const` prevents reassignment (but object properties can still change)."
        },
        {
            question: "What does 'hoisting' mean in JavaScript?",
            options: ["Variables are moved to a new file", "Declarations are processed before code runs", "Only functions hoist, variables never do", "Promises run before synchronous code"],
            answer: 1,
            explanation: "JS processes declarations first. `var` is hoisted as `undefined`; `let/const` are hoisted but in the TDZ until initialized."
        },
        {
            question: "Which statement about the event loop is correct?",
            options: ["Microtasks run after the next macrotask", "Macrotasks always run before any microtasks", "Microtasks are drained before rendering/next macrotask", "Promises are macrotasks"],
            answer: 2,
            explanation: "Promise callbacks (`then/catch/finally`) are microtasks and run before the next macrotask (like `setTimeout`)."
        },
        {
            question: "What is a closure?",
            options: ["A way to close the browser tab", "A function bundled with its lexical environment", "A class method that returns `this`", "A JSON serialization technique"],
            answer: 1,
            explanation: "Closures let a function access variables from its outer scope even after the outer function has finished."
        },
        {
            question: "What does `this` refer to in an arrow function?",
            options: ["The object calling the function", "It is dynamically bound at runtime", "It is lexically inherited from the surrounding scope", "`this` is always `window`"],
            answer: 2,
            explanation: "Arrow functions don't have their own `this`; they capture `this` from the surrounding scope."
        },
        {
            question: "What is the output of `Object.is(NaN, NaN)`?",
            options: ["false", "true", "throws error", "undefined"],
            answer: 1,
            explanation: "`Object.is` is like strict equality but treats `NaN` as equal to `NaN` and distinguishes `+0` and `-0`."
        },
        {
            question: "Which is true about `==` vs `===`?",
            options: ["They behave the same for all types", "`==` coerces types, `===` does not", "`===` coerces, `==` does not", "`==` is faster and safer"],
            answer: 1,
            explanation: "`==` performs type coercion which can cause surprises. `===` compares without coercion."
        },
        {
            question: "How can you create a shallow copy of an object?",
            options: ["`JSON.parse(JSON.stringify(obj))`", "`{...obj}` or `Object.assign({}, obj)`", "`Object.freeze(obj)`", "`obj.clone()`"],
            answer: 1,
            explanation: "Spread/Object.assign copy only the first level. Nested objects are still shared references."
        },
        {
            question: "What does `Array.prototype.map` return?",
            options: ["The original array mutated", "A new array of the same length", "A filtered array", "A single reduced value"],
            answer: 1,
            explanation: "`map` returns a new array with each element transformed, same length as the original."
        },
        {
            question: "Which pattern avoids race conditions when using async state updates?",
            options: ["Rely on stale closures", "Use the functional updater form", "Call setState twice quickly", "Disable Strict Mode"],
            answer: 1,
            explanation: "Using the functional updater (`setX(prev => ...)`) ensures you base updates on the latest state."
        },
    ],

    React: [
        {
            question: "What is the Virtual DOM?",
            options: ["A copy of the real DOM in memory", "A browser feature", "A CSS framework", "A database for React"],
            answer: 0,
            explanation: "React creates a lightweight in-memory representation of the UI and diffs it to update the real DOM efficiently."
        },
        {
            question: "What is the purpose of `useEffect`?",
            options: ["To create state", "To handle side effects after render", "To memoize values", "To replace props"],
            answer: 1,
            explanation: "`useEffect` runs after render to sync with external systems (fetching, subscriptions, DOM APIs)."
        },
        {
            question: "When does `useEffect(() => {}, [])` run?",
            options: ["On every render", "Only on mount (and cleanup on unmount)", "Before the first render", "Only when props change"],
            answer: 1,
            explanation: "Empty deps means it runs once after mount, and cleanup runs on unmount."
        },
        {
            question: "What is the key purpose of a `key` in lists?",
            options: ["Styling", "Security", "Helps React reconcile items correctly", "Improves network requests"],
            answer: 2,
            explanation: "Stable keys help React match elements across renders, preventing bugs and unnecessary remounts."
        },
        {
            question: "What causes unnecessary re-renders commonly?",
            options: ["Using `useMemo` too much", "Passing new object/function props each render", "Using JSX", "Using CSS modules"],
            answer: 1,
            explanation: "New references cause child props to change; use memoization (`useCallback`, `useMemo`) where it matters."
        },
        {
            question: "What does React Strict Mode do in development?",
            options: ["Disables hooks", "Double-invokes some lifecycle/effects to find issues", "Optimizes for production automatically", "Prevents re-renders"],
            answer: 1,
            explanation: "Strict Mode intentionally re-runs certain code paths to surface side-effect bugs (dev-only)."
        },
        {
            question: "What is the best way to derive state from props?",
            options: ["Copy props into state always", "Derive during render when possible", "Use a global variable", "Use `useEffect` for everything"],
            answer: 1,
            explanation: "Prefer deriving during render. Copying props to state often causes bugs unless you truly need local editing state."
        },
        {
            question: "What is a controlled component?",
            options: ["A component with no props", "Form input whose value is driven by React state", "A component that cannot re-render", "A class component only"],
            answer: 1,
            explanation: "Controlled inputs use `value` + `onChange` so React state is the source of truth."
        },
        {
            question: "What does `React.memo` do?",
            options: ["Memoizes a value", "Skips re-render if props are shallowly equal", "Makes component async", "Caches network requests"],
            answer: 1,
            explanation: "`React.memo` prevents re-rendering if props haven't changed (shallow compare)."
        },
        {
            question: "Which is true about state updates?",
            options: ["State updates are always synchronous", "State updates may be batched", "State updates mutate the same object", "State updates only happen on click"],
            answer: 1,
            explanation: "React batches state updates for performance; you should treat state as immutable."
        },
    ],

    Angular: [
        {
            question: "What is Angular's primary architectural pattern?",
            options: ["Only functions", "Component-based architecture", "File-based routing only", "No dependency injection"],
            answer: 1,
            explanation: "Angular apps are built from components; DI, modules/standalone components, and RxJS are key parts of the ecosystem."
        },
        {
            question: "What is Dependency Injection (DI) in Angular?",
            options: ["A way to load CSS", "A pattern to provide dependencies to classes/components", "A router feature", "A build optimization"],
            answer: 1,
            explanation: "DI lets Angular create and supply services to components, improving testability and structure."
        },
        {
            question: "What does an `Observable` represent?",
            options: ["A single future value", "A stream of values over time", "A synchronous value only", "A DOM element"],
            answer: 1,
            explanation: "Observables can emit many values over time; Angular uses them heavily for HTTP, forms, and events."
        },
        {
            question: "Which operator is commonly used to transform observable values?",
            options: ["map", "split", "join", "reduceRight"],
            answer: 0,
            explanation: "`map` transforms each emitted value. Other operators include `switchMap`, `mergeMap`, `filter`, etc."
        },
        {
            question: "What is `async` pipe used for?",
            options: ["To create promises", "To subscribe/unsubscribe Observables in templates automatically", "To run code faster", "To compile templates"],
            answer: 1,
            explanation: "`async` pipe handles subscription lifecycle and renders the latest value in templates."
        },
        {
            question: "What is the purpose of Angular Router?",
            options: ["State management", "Client-side navigation between views", "Database access", "Testing utilities"],
            answer: 1,
            explanation: "Angular Router maps URLs to components and supports guards, lazy loading, params, etc."
        },
        {
            question: "What is change detection?",
            options: ["Server-side rendering", "How Angular updates the view when data changes", "A CSS feature", "Only for unit tests"],
            answer: 1,
            explanation: "Change detection checks bindings and updates the DOM. Strategies like `OnPush` can optimize performance."
        },
        {
            question: "What does `OnPush` change detection strategy do?",
            options: ["Renders only once", "Runs CD only on certain triggers (inputs/events/async)", "Disables CD completely", "Makes app SSR-only"],
            answer: 1,
            explanation: "`OnPush` reduces checks by requiring explicit triggers, improving performance for large apps."
        },
        {
            question: "How do you share logic/data across components in Angular?",
            options: ["Global variables", "Services (DI)", "Only Inputs", "Only Outputs"],
            answer: 1,
            explanation: "Services injected via DI are the standard way to share logic/state."
        },
        {
            question: "What are Angular Guards used for?",
            options: ["Styling", "Protecting/controlling navigation routes", "HTTP caching", "Template compilation"],
            answer: 1,
            explanation: "Guards can allow/deny navigation, fetch data, and handle auth/role checks."
        },
    ],
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

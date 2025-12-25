export const reactAssessment = {
    id: "react-certification",
    title: "React Certification",
    description: "Validate your expertise in Hooks, Context, Server Components, and Performance Optimization.",
    questions: [
        {
            id: "react-1",
            question: "What is the Virtual DOM?",
            options: [
                "A direct copy of the browser's DOM",
                "A lightweight JavaScript representation of the UI used to optimize updates",
                "A new HTML standard",
                "A database for React apps"
            ],
            correctAnswer: 1,
            explanation: "The Virtual DOM is a programming concept where a virtual representation of a UI is kept in memory and synced with the 'real' DOM by a library such as ReactDOM. This process is called reconciliation."
        },
        {
            id: "react-2",
            question: "What is the purpose of the `useEffect` hook?",
            options: [
                "To manage state",
                "To handle side effects (data fetching, subscriptions, DOM manipulation)",
                "To create context",
                "To optimize performance"
            ],
            correctAnswer: 1,
            explanation: "`useEffect` lets you perform side effects in function components. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React classes."
        },
        {
            id: "react-3",
            question: "Why is the `key` prop important in lists?",
            options: [
                "It styles the list items",
                "It helps React identify which items have changed, added, or removed",
                "It is required for accessibility",
                "It sorts the list"
            ],
            correctAnswer: 1,
            explanation: "Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity."
        },
        {
            id: "react-4",
            question: "What is the difference between `useMemo` and `useCallback`?",
            options: [
                "`useMemo` memoizes a value, `useCallback` memoizes a function",
                "`useMemo` memoizes a function, `useCallback` memoizes a value",
                "They are the same",
                "`useCallback` is deprecated"
            ],
            correctAnswer: 0,
            explanation: "`useMemo` returns a memoized value. `useCallback` returns a memoized callback function. Both are used for performance optimization."
        },
        {
            id: "react-5",
            question: "What is Prop Drilling?",
            options: [
                "A tool for drilling holes in components",
                "Passing data through multiple layers of components to reach a deeply nested child",
                "A way to validate props",
                "A new React feature"
            ],
            correctAnswer: 1,
            explanation: "Prop drilling refers to the process of passing data from a parent component down to a deep child component through several intermediate components that don't need the data themselves."
        },
        {
            id: "react-6",
            question: "What is the Context API used for?",
            options: [
                "To replace Redux completely",
                "To share data that can be considered 'global' for a tree of React components",
                "To make API calls",
                "To style components"
            ],
            correctAnswer: 1,
            explanation: "Context provides a way to pass data through the component tree without having to pass props down manually at every level."
        },
        {
            id: "react-7",
            question: "What is a React Server Component (RSC)?",
            options: [
                "A component that runs only on the server and sends zero JS to the client",
                "A component that runs on the server and client",
                "A component that fetches data",
                "A component that uses Node.js"
            ],
            correctAnswer: 0,
            explanation: "RSCs run exclusively on the server. They render to a special data format, not HTML strings, and allow the server to pass data to the client without sending the component's JavaScript code."
        },
        {
            id: "react-8",
            question: "What is the rule of hooks?",
            options: [
                "Hooks can be called inside loops and conditions",
                "Hooks must be called at the top level of a React function",
                "Hooks can be called in class components",
                "Hooks must return a value"
            ],
            correctAnswer: 1,
            explanation: "Don't call Hooks inside loops, conditions, or nested functions. Always use Hooks at the top level of your React function. This ensures that Hooks are called in the same order each time a component renders."
        },
        {
            id: "react-9",
            question: "What does `useRef` do?",
            options: [
                "Triggers a re-render when changed",
                "Persists a value across renders without causing a re-render",
                "Creates a reference to a DOM element",
                "Both B and C"
            ],
            correctAnswer: 3,
            explanation: "`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument. It persists for the full lifetime of the component and doesn't trigger re-renders."
        },
        {
            id: "react-10",
            question: "What is the purpose of `React.memo`?",
            options: [
                "To memoize a value inside a component",
                "To memoize a functional component (prevent re-renders if props haven't changed)",
                "To memoize a class component",
                "To cache API responses"
            ],
            correctAnswer: 1,
            explanation: "`React.memo` is a higher order component. If your component renders the same result given the same props, you can wrap it in a call to `React.memo` for a performance boost."
        },
        {
            id: "react-11",
            question: "How do you prevent XSS in React?",
            options: [
                "React does it automatically by escaping values in JSX",
                "Use `dangerouslySetInnerHTML` everywhere",
                "Use `eval()`",
                "Disable JavaScript"
            ],
            correctAnswer: 0,
            explanation: "React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that's not explicitly written in your application."
        },
        {
            id: "react-12",
            question: "What is the difference between State and Props?",
            options: [
                "Props are mutable, State is immutable",
                "State is internal and controlled by the component, Props are external and passed to the component",
                "State is global, Props are local",
                "There is no difference"
            ],
            correctAnswer: 1,
            explanation: "Props (short for properties) are passed to the component (like function arguments), whereas state is managed within the component (like variables declared within a function)."
        },
        {
            id: "react-13",
            question: "What is a Custom Hook?",
            options: [
                "A built-in React hook",
                "A JavaScript function whose name starts with 'use' and may call other Hooks",
                "A class component",
                "A Redux reducer"
            ],
            correctAnswer: 1,
            explanation: "A custom Hook is a JavaScript function whose name starts with 'use' and that may call other Hooks. It allows you to extract component logic into reusable functions."
        },
        {
            id: "react-14",
            question: "What is the 'use client' directive?",
            options: [
                "It marks a file as a Client Component in the Next.js App Router",
                "It imports a client library",
                "It is a comment",
                "It enables strict mode"
            ],
            correctAnswer: 0,
            explanation: "The 'use client' directive sits at the top of a file and declares a boundary between the Server and Client Component modules graph."
        },
        {
            id: "react-15",
            question: "What is Reconciliation?",
            options: [
                "The process of syncing the VDOM with the Real DOM",
                "The process of fetching data",
                "The process of compiling JSX",
                "The process of debugging"
            ],
            correctAnswer: 0,
            explanation: "Reconciliation is the algorithm React uses to diff one tree with another to determine which parts need to be changed."
        },
        {
            id: "react-16",
            question: "What is the dependency array in `useEffect`?",
            options: [
                "A list of plugins",
                "A list of values that the effect depends on; if they change, the effect re-runs",
                "A list of components to render",
                "A list of errors"
            ],
            correctAnswer: 1,
            explanation: "The dependency array tells React when to re-run the effect. If the array is empty `[]`, it runs once on mount. If omitted, it runs on every render."
        },
        {
            id: "react-17",
            question: "What is `useReducer`?",
            options: [
                "A hook for managing complex state logic (alternative to useState)",
                "A hook for reducing array size",
                "A hook for Redux only",
                "A deprecated hook"
            ],
            correctAnswer: 0,
            explanation: "`useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one."
        },
        {
            id: "react-18",
            question: "What is the 'children' prop?",
            options: [
                "A prop that passes data to child components",
                "A special prop that contains the content between the opening and closing tags of a component",
                "A prop for defining an array of children",
                "A prop for styling"
            ],
            correctAnswer: 1,
            explanation: "`children` is a special prop, automatically passed to every component, that can be used to render the content included between the component's opening and closing tags."
        },
        {
            id: "react-19",
            question: "What is Lazy Loading in React?",
            options: [
                "Loading images slowly",
                "A technique to load components only when they are needed (using `React.lazy` and `Suspense`)",
                "A bug where the app loads slowly",
                "A server-side feature"
            ],
            correctAnswer: 1,
            explanation: "Lazy loading helps reduce the initial bundle size by loading components only when they are required, improving the initial load time."
        },
        {
            id: "react-20",
            question: "What is the purpose of `Suspense`?",
            options: [
                "To handle errors",
                "To display a fallback UI (like a spinner) while a component is lazy loading or fetching data",
                "To suspend the server",
                "To stop rendering"
            ],
            correctAnswer: 1,
            explanation: "`Suspense` lets you display a fallback until its children have finished loading."
        }
    ]
};

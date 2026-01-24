// ALL CURRICULUM DATA
// This file contains detailed curriculum for all technologies.

const react = {
    1: {
        overview: "Start your React journey by understanding what React is, why it's popular, and how JSX makes building UIs intuitive and declarative.",
        objectives: ["Understand what React is and its core benefits", "Learn JSX syntax and transformation rules", "Create your first functional component", "Understand the Virtual DOM and reconciliation"],
        whatYouWillLearn: [
            { topic: "What is React?", detail: "A JavaScript library for building user interfaces. Learn component-based architecture." },
            { topic: "JSX Syntax", detail: "Write HTML-like code in JavaScript. Understand JSX rules and compilation." },
            { topic: "Components", detail: "Building blocks of React apps. Create functional components." },
            { topic: "Virtual DOM", detail: "How React efficiently updates the UI through reconciliation." }
        ],
        project: "Build a greeting card component with dynamic content using JSX and props",
        prerequisites: "JavaScript ES6+ (arrow functions, destructuring, modules)",
        resources: ["React Official Docs", "JSX In Depth Guide", "Create React App", "Component Basics Tutorial"]
    },
    2: {
        overview: "Master components and props - the foundation of React. Learn how to pass data between components and build reusable pieces.",
        objectives: ["Create reusable functional components", "Pass and receive props effectively", "Understand the children prop pattern", "Validate props with PropTypes"],
        whatYouWillLearn: [
            { topic: "Functional Components", detail: "Write components as JavaScript functions. Understand naming conventions." },
            { topic: "Props", detail: "Pass data from parent to child. Understand one-way data flow." },
            { topic: "Children Prop", detail: "Render content between component tags. Build wrapper components." },
            { topic: "PropTypes", detail: "Type-check props for better debugging. Define required props." }
        ],
        project: "Create a user profile card component system with nested components and prop validation",
        prerequisites: "Day 1: React Basics & JSX",
        resources: ["Components and Props Guide", "PropTypes Documentation", "Component Composition Patterns", "Thinking in React"]
    },
    3: {
        overview: "Learn state management with useState hook. Make your components interactive, dynamic, and responsive to user actions.",
        objectives: ["Understand the concept of component state", "Use useState hook to add state", "Update state correctly and immutably", "Manage multiple independent states"],
        whatYouWillLearn: [
            { topic: "State Concept", detail: "Data that changes over time. Understand state vs props." },
            { topic: "useState Hook", detail: "Add state to functional components. Understand destructuring." },
            { topic: "State Updates", detail: "Update state immutably. Understand functional updates." },
            { topic: "Multiple States", detail: "Manage multiple state variables. Know when to split state." }
        ],
        project: "Build an interactive counter with increment, decrement, reset, and step controls",
        prerequisites: "Day 2: Components & Props",
        resources: ["useState Hook Guide", "State Management Basics", "Rules of Hooks", "Interactive State Examples"]
    },
    4: {
        overview: "Learn how to handle events in React. Respond to user interactions like clicks, form inputs, and keyboard events.",
        objectives: ["Handle DOM events in React", "Pass event handlers as props", "Understand synthetic events", "Prevent default behaviors"],
        whatYouWillLearn: [
            { topic: "Event Handling", detail: "Add event listeners like onClick, onChange. Differences from HTML events." },
            { topic: "Event Object", detail: "Access the synthetic event object. Get target values and coordinates." },
            { topic: "Passing Handlers", detail: "Pass functions as props to child components to handle events." },
            { topic: "Prevent Default", detail: "Use e.preventDefault() and e.stopPropagation() in React." }
        ],
        project: "Create a color picker that updates the background color on user interaction",
        prerequisites: "Day 3: State & useState",
        resources: ["Handling Events", "SyntheticEvent API", "Forms in React", "Event Pooling"]
    },
    5: {
        overview: "Master conditional rendering and lists. Display different content based on state and render lists of data efficiently.",
        objectives: ["Render content conditionally", "Use ternary operators and &&", "Render lists with map()", "Understand the 'key' prop"],
        whatYouWillLearn: [
            { topic: "Conditional Rendering", detail: "Use if/else, ternary operators, and logical && to show/hide elements." },
            { topic: "Rendering Lists", detail: "Transform arrays of data into arrays of elements using map()." },
            { topic: "Keys", detail: "Understand why keys are important for performance and identity." },
            { topic: "Filtering Lists", detail: "Filter data before rendering to show basic search results." }
        ],
        project: "Build a todo list where you can add items, toggle completion, and filter active/completed",
        prerequisites: "Day 4: Event Handling",
        resources: ["Conditional Rendering", "Lists and Keys", "JavaScript map/filter", "React reconcile"]
    },
    6: {
        overview: "Learn how to work with forms in React. Build controlled components and handle complex form state.",
        objectives: ["Create controlled form inputs", "Handle form submission", "Manage multiple input states", "Validate form inputs"],
        whatYouWillLearn: [
            { topic: "Controlled Components", detail: "Bind input value to state. Single source of truth." },
            { topic: "Handling Inputs", detail: "Handle changes for text, checkboxes, radio buttons, and selects." },
            { topic: "Form Submission", detail: "Handle onSubmit, prevent default reload, and gather form data." },
            { topic: "Validation", detail: "Basic client-side validation logic and error state." }
        ],
        project: "Create a registration form with validation for email, password strength, and matching passwords",
        prerequisites: "Day 5: Conditional Rendering & Lists",
        resources: ["Forms Guide", "Controlled vs Uncontrolled", "React Hook Form Intro", "Form Validation"]
    },
    7: {
        overview: "Master the useEffect hook. specific side effects like data fetching, subscriptions, and manual DOM manipulation.",
        objectives: ["Understand side effects", "Use useEffect correctly", "Manage dependency arrays", "Implement cleanup functions"],
        whatYouWillLearn: [
            { topic: "Effect Basics", detail: "Run interaction code after render. Replacment for lifecycle methods." },
            { topic: "Dependencies", detail: "Control when effects run. Understand empty dependency array vs specific props." },
            { topic: "Cleanup", detail: "Return a cleanup function to unsubscribe or clear timers." },
            { topic: "Common Use Cases", detail: "Data fetching, document title updates, event listeners." }
        ],
        project: "Build a digital clock that updates every second using useEffect and setInterval",
        prerequisites: "Day 6: Forms",
        resources: ["useEffect Hook Guide", "A Complete Guide to useEffect", "Lifecycle vs Hooks", "Cleanup Effects"]
    },
    8: {
        overview: "Learn patterns for data fetching in React. Load data from APIs and handle loading and error states.",
        objectives: ["Fetch data in useEffect", "Handle loading states", "Handle error states", "Display fetched data"],
        whatYouWillLearn: [
            { topic: "Fetch in Effect", detail: "Call async functions inside useEffect. Avoid race conditions." },
            { topic: "Loading UI", detail: "Tracking loading state to show spinners or skeletons." },
            { topic: "Error Handling", detail: "Catch errors and display user-friendly error messages." },
            { topic: "Async/Await", detail: "Using async/await syntax inside effect callbacks neatly." }
        ],
        project: "Build a movie search app that fetches data from a public API based on user input",
        prerequisites: "Day 7: useEffect Hook",
        resources: ["Data Fetching Patterns", "React Query Intro", "Handling Async Errors", "Skeletons"]
    },
    9: {
        overview: "Understand useRef hook. Access DOM elements directly and persist values without causing re-renders.",
        objectives: ["Access DOM elements with refs", "Store mutable values", "Understand useRef vs useState", "Avoid overuse of refs"],
        whatYouWillLearn: [
            { topic: "Accessing DOM", detail: "Focus inputs, scroll to elements, measure dimensions using refs." },
            { topic: "Mutable Variables", detail: "Store data that persists across renders but doesn't trigger updates." },
            { topic: "Ref Lifecycle", detail: "Refs availability during render vs commit phase." },
            { topic: "ForwardRef", detail: "Passing refs to child components using React.forwardRef." }
        ],
        project: "Create a customized video player with custom controls using refs to control the video element",
        prerequisites: "Day 8: Data Fetching",
        resources: ["useRef Hook Guide", "Forwarding Refs", "ImperativeHandle", "Focus Management"]
    },
    10: {
        overview: "Master the Context API for global state management. Share data without prop drilling.",
        objectives: ["Create and provide context", "Consume context with useContext", "Understand Context pitfalls", "Modularize Context"],
        whatYouWillLearn: [
            { topic: "Context API", detail: "createContext, Provider, and Consumer components." },
            { topic: "useContext Hook", detail: "Access context values in functional components cleanly." },
            { topic: "Prop Drilling", detail: "Solve the problem of passing props through many layers." },
            { topic: "Performance", detail: "Understand when Context triggers re-renders for consumers." }
        ],
        project: "Build a theme switcher (Light/Dark mode) that applies styles across the entire application",
        prerequisites: "Day 9: useRef Hook",
        resources: ["Context API Guide", "useContext Documentation", "State Management", "Kent C Dodds on Context"]
    },
    11: {
        overview: "Learn useReducer for complex state logic. A powerful alternative to useState for state transitions.",
        objectives: ["Understand reducer pattern", "Implement useReducer", "Manage complex state objects", "Combine with Context"],
        whatYouWillLearn: [
            { topic: "Reducer Function", detail: "Pure function taking state and action, returning new state." },
            { topic: "useReducer Hook", detail: "Initialize state, dispatch actions. Similar to Redux." },
            { topic: "Actions", detail: "Define action types and payloads for state updates." },
            { topic: "When to use", detail: "Complex state logic, dependent state updates, or next state depends on previous." }
        ],
        project: "Build a shopping cart with complex actions (add, remove, update quantity, clear) using reducer",
        prerequisites: "Day 10: useContext Hook",
        resources: ["useReducer Guide", "Reducer Pattern", "Redux vs useReducer", "Complex State"]
    },
    12: {
        overview: "Optimize performance with useMemo and useCallback. Memoize values and functions to prevent unnecessary re-renders.",
        objectives: ["Memoize expensive calculations", "Memoize callback functions", "Understand referential equality", "Profile React performance"],
        whatYouWillLearn: [
            { topic: "useMemo", detail: "Cache results of expensive functions. Recalculate only when dependencies change." },
            { topic: "useCallback", detail: "Cache function definitions to preserve referential identity for child props." },
            { topic: "React.memo", detail: "prevent re-rendering of child components if props haven't changed." },
            { topic: "Optimization Risks", detail: "Don't optimize prematurely. Overhead of memoization." }
        ],
        project: "Optimize a large list filtering application to run smoothly without lag",
        prerequisites: "Day 11: useReducer Hook",
        resources: ["Memoization Guide", "useMemo vs useCallback", "React Profiler", "Performance Optimization"]
    },
    13: {
        overview: "Create custom hooks to extract and reuse component logic. Build your own library of hooks.",
        objectives: ["Extract component logic", "Create custom hooks", "Return values from hooks", "Compose multiple hooks"],
        whatYouWillLearn: [
            { topic: "Custom Hooks Rule", detail: "Naming convention (usePrefix) and rules (call other hooks)." },
            { topic: "Reusability", detail: "Share logic (fetching, form handling, listeners) across components." },
            { topic: "Encapsulation", detail: "Hide complex implementation details behind a simple hook API." },
            { topic: "Composition", detail: "Build complex hooks by combining smaller primitive hooks." }
        ],
        project: "Create a useFetch custom hook that handles loading, error, and data states for any API call",
        prerequisites: "Day 12: useMemo & useCallback",
        resources: ["Building Custom Hooks", "useHooks Library", "Hook Patterns", "Reusing Logic"]
    },
    14: {
        overview: "Add navigation to your apps with React Router. Build Single Page Applications (SPAs).",
        objectives: ["Set up React Router", "Define Routes", "Handle navigation with Link", "Use URL parameters"],
        whatYouWillLearn: [
            { topic: "React Router Setup", detail: "BrowserRouter, Routes, and Route components." },
            { topic: "Navigation", detail: "Using Link and NavLink for client-side navigation without reload." },
            { topic: "Dynamic Routes", detail: "Route parameters (:id) and accessing them with useParams." },
            { topic: "Programmatic Nav", detail: "Using useNavigate to redirect users after actions." }
        ],
        project: "Build a multi-page portfolio site with Home, About, Projects, and Contact pages",
        prerequisites: "Day 13: Custom Hooks",
        resources: ["React Router Docs", "Client Side Routing", "SPA Basics", "URL Params"]
    },
    15: {
        overview: "Advanced Routing patterns. Nested routes, protected routes, and layouts.",
        objectives: ["Implement nested routes", "Create protected/private routes", "Use Outlet for layouts", "Handle 404 pages"],
        whatYouWillLearn: [
            { topic: "Nested Routes", detail: "Render child routes inside parent layouts using Outlet." },
            { topic: "Route Guards", detail: "Protect routes that require authentication (redirect logic)." },
            { topic: "Layouts", detail: "Shared UI (Sidebar, Navbar) persisting across route changes." },
            { topic: "404 Handling", detail: "Catch-all routes for handling 'Not Found' scenarios." }
        ],
        project: "Build a dashboard with authentication protection and nested setting pages",
        prerequisites: "Day 14: React Router",
        resources: ["React Router Nested", "Protected Routes Pattern", "Layout Route", "Authentication Flow"]
    },
    16: {
        overview: "Learn advanced state management patterns. Lifting state, composition, and component slots.",
        objectives: ["Lift state up effectively", "Avoid prop drilling via composition", "Use render props", "Understand slots pattern"],
        whatYouWillLearn: [
            { topic: "Lifting State", detail: "Sharing state between siblings by moving it to common ancestor." },
            { topic: "Composition", detail: "Passing components as props (slots) to avoid passing data props deep." },
            { topic: "Render Props", detail: "Sharing code between components using a prop whose value is a function." },
            { topic: "Inversion of Control", detail: "Giving control back to the user of your component." }
        ],
        project: "Refactor a deep-prop-drilling app to use composition and slots",
        prerequisites: "Day 15: Protected Routes",
        resources: ["Composition vs Inheritance", "Render Props Guide", "Advanced Patterns", "Michael Jackson regarding Render Props"]
    },
    17: {
        overview: "Master styling in React. CSS Modules, Styled Components, and Tailwind CSS integration.",
        objectives: ["Use CSS Modules", "Understand CSS-in-JS", "Integrate Tailwind CSS", "Manage dynamic styles"],
        whatYouWillLearn: [
            { topic: "CSS Modules", detail: "Scoped CSS classes to avoid name collisions. name.module.css." },
            { topic: "Styled Components", detail: "Writing actual CSS in your JavaScript files (CSS-in-JS)." },
            { topic: "Utility First", detail: "Using Tailwind CSS with React for rapid UI development." },
            { topic: "Dynamic classes", detail: "Conditionally applying classes with libraries like clsx or classnames." }
        ],
        project: "Build a UI component library (Button, Card, Input) with theme support using your preferred styling method",
        prerequisites: "Day 16: State Patterns",
        resources: ["Styling React", "CSS Modules", "Styled Components", "Tailwind with React"]
    },
    18: {
        overview: "Code Splitting and Suspense. Optimize bundle size and load components lazily.",
        objectives: ["Implement React.lazy", "Use Suspense", "Lazy load routes", "Display fallback UI"],
        whatYouWillLearn: [
            { topic: "Code Splitting", detail: "Split code into smaller bundles loaded on demand." },
            { topic: "React.lazy", detail: "Import components dynamically." },
            { topic: "Suspense", detail: "Show loading states while waiting for lazy components." },
            { topic: "Route Splitting", detail: "Load pages only when the user navigates to them." }
        ],
        project: "Optimize a heavy dashboard app by lazy loading charts and heavy widgets",
        prerequisites: "Day 17: Styling",
        resources: ["Code Splitting Guide", "React Suspense", "Lazy Loading", "Performance Patterns"]
    },
    19: {
        overview: "Handling errors gracefully with Error Boundaries. Prevent the white screen of death.",
        objectives: ["Create Error Boundaries", "Catch component errors", "Display fallback UI", "Reset error state"],
        whatYouWillLearn: [
            { topic: "Error Boundary", detail: "Class components that catch JS errors anywhere in child tree." },
            { topic: "componentDidCatch", detail: "Lifecycle method to log errors." },
            { topic: "Fallback UI", detail: "Displaying a 'Something went wrong' message instead of crushing app." },
            { topic: "react-error-boundary", detail: "Using modern libraries for functional component error handling." }
        ],
        project: "Implement global and component-level error handling in a complex app",
        prerequisites: "Day 18: Code Splitting",
        resources: ["Error Boundaries", "React Error Boundary Library", "Exception Handling", "Robust UI"]
    },
    20: {
        overview: "Portals and Refs for advanced DOM manipulation. Modals, tooltips, and overlay UI.",
        objectives: ["Use React Portals", "Build accessible modals", "Forward refs", "Manage focus"],
        whatYouWillLearn: [
            { topic: "Portals", detail: "Render children into a DOM node outside the parent hierarchy (e.g. document.body)." },
            { topic: "Modals & Overlays", detail: "Using portals to avoid z-index and overflow issues." },
            { topic: "Accessibility", detail: "Managing focus trap within modals." },
            { topic: "Imperative Interaction", detail: "Using useImperativeHandle to expose functions to parents." }
        ],
        project: "Build a reusable Modal and Tooltip system using Portals",
        prerequisites: "Day 19: Error Boundaries",
        resources: ["Portals Guide", "Accessibility in React", "Focus Management", "Advanced Refs"]
    },
    21: {
        overview: "Introduction to React Query / TanStack Query. Professional data synchronization.",
        objectives: ["Reason about server state", "Setup React Query", "Cache and invalidate data", "Handle background updates"],
        whatYouWillLearn: [
            { topic: "Server State", detail: "Why server state (async, shared) is different from client state." },
            { topic: "caching", detail: "Automatic caching, deduplication, and background refetching." },
            { topic: "Mutations", detail: "Updating data on the server and invalidating queries." },
            { topic: "DevTools", detail: "Debugging queries and cache state." }
        ],
        project: "Refactor the movie app to use React Query for caching and instant feedback",
        prerequisites: "Day 20: Portals",
        resources: ["TanStack Query Docs", "Server State vs Client State", "Data Fetching Best Practices", "Query Invalidation"]
    },
    22: {
        overview: "Form management with libraries. Handling complex forms efficiently with React Hook Form.",
        objectives: ["Use React Hook Form", "Validate complex rules", "Handle form arrays", "Improve performance"],
        whatYouWillLearn: [
            { topic: "React Hook Form", detail: "Uncontrolled components for performance. register() and handleSubmit()." },
            { topic: "Schema Validation", detail: "Using Zod or Yup for schema-based validation." },
            { topic: "Form State", detail: "IsDirty, IsSubmitting, Touched fields tracking." },
            { topic: "Dynamic Forms", detail: "Handling arrays of fields (add/remove inputs)." }
        ],
        project: "Build a multi-step checkout form with complex validation using React Hook Form",
        prerequisites: "Day 21: React Query",
        resources: ["React Hook Form", "Zod Validation", "Formik Comparison", "Performance Forms"]
    },
    23: {
        overview: "Testing React Applications. Unit and Integration testing with Jest and React Testing Library.",
        objectives: ["Set up testing environment", "Write unit tests", "Test components and hooks", "Mock dependencies"],
        whatYouWillLearn: [
            { topic: "Testing Philosophy", detail: "Test behavior, not implementation (React Testing Library)." },
            { topic: "Querying Elements", detail: "getByText, getByRole, queryBy... best practices." },
            { topic: "User Events", detail: "Simulating clicks and typing with user-event library." },
            { topic: "Mocking", detail: "Mocking API calls (MSW) and modules." }
        ],
        project: "Write a comprehensive test suite for the Todo app including integration tests",
        prerequisites: "Day 22: Forms",
        resources: ["React Testing Library", "Jest Docs", "Testing Best Practices", "Kent C Dodds Testing"]
    },
    24: {
        overview: "React with TypeScript. Adding type safety to your React application components and hooks.",
        objectives: ["Type Props and State", "Type Events", "Type Hooks", "Type Context"],
        whatYouWillLearn: [
            { topic: "Typing Components", detail: "React.FC vs function components. Typing props interfaces." },
            { topic: "Typing Hooks", detail: "Generics in useState, useRef, and custom hooks." },
            { topic: "Event Types", detail: "React.ChangeEvent, React.FormEvent, and specific element types." },
            { topic: "Context Types", detail: "Typing Context Provider value and consumer return types." }
        ],
        project: "Convert the User Profile system to use strict TypeScript types",
        prerequisites: "Day 23: Testing",
        resources: ["React TypeScript Cheatsheet", "TypeScript Docs", "Typing React Patterns", "Strict Mode"]
    },
    25: {
        overview: "Production Best Practices and Deployment. Preparing your React app for the world.",
        objectives: ["Optimize for production", "Organize project structure", "Setup CI/CD", "Deploy to Vercel/Netlify"],
        whatYouWillLearn: [
            { topic: "Project Structure", detail: "Directory organization (fractal, feature-based) for scale." },
            { topic: "Performance Audit", detail: "Lighthouse scores, bundle analysis, and final optimizations." },
            { topic: "Environment Vars", detail: "Managing secrets and config for different environments (.env)." },
            { topic: "Deployment", detail: "Building static assets and deploying to edge networks." }
        ],
        project: "Audit, build, and deploy your Portfolio project to a public URL",
        prerequisites: "Day 24: React with TypeScript",
        resources: ["React Deployment", "Vercel Docs", "Netlify Deployment", "Web Vitals"]
    }
};

const html = {
    1: {
        overview: "HTML Fundamentals. Structure of the web.",
        objectives: ["Understand DOM", "Basic tags", "Attributes", "Metadata"],
        whatYouWillLearn: [
            { topic: "Elements", detail: "Block vs Inline elements. Parent/Child relationships." },
            { topic: "Structure", detail: "html, head, body tags. The doctype declaration." },
            { topic: "Attributes", detail: "id, class, src, href, and global attributes." },
            { topic: "Meta", detail: "SEO basics with meta tags and title." }
        ],
        project: "Create a simple resume page.",
        prerequisites: "None",
        resources: ["MDN HTML", "W3Schools HTML"]
    },
    2: {
        overview: "Text & Typography. Formatting content for readability.",
        objectives: ["Use Headings", "Format Text", "Create Lists", "Special Characters"],
        whatYouWillLearn: [
            { topic: "Headings", detail: "h1-h6 hierarchy and SEO importance." },
            { topic: "Lists", detail: "Unordered (ul), Ordered (ol), and Definition (dl) lists." },
            { topic: "Formatting", detail: "Strong, em, mark, sub, sup, and other inline types." },
            { topic: "Entities", detail: "Displaying special characters like &copy; and &nbsp;." }
        ],
        project: "Create a blog post with rich text formatting",
        prerequisites: "Day 1: Basics",
        resources: ["MDN Text Formatting", "HTML Entities"]
    },
    3: {
        overview: "Links and Navigation. Connecting the web.",
        objectives: ["Create Links", "Relative vs Absolute", "Page Anchors", "Email Links"],
        whatYouWillLearn: [
            { topic: "Anchor Tag", detail: "The <a> tag attributes: href, target, download." },
            { topic: "Paths", detail: "Understanding directory structures and relative paths." },
            { topic: "Internal Links", detail: "Linking to element IDs on the same page." },
            { topic: "Protocols", detail: "mailto:, tel:, and other URL schemes." }
        ],
        project: "Build a navigation menu and table of contents",
        prerequisites: "Day 2: Text",
        resources: ["MDN Hyperlinks", "Path Navigation"]
    },
    4: {
        overview: "Images and Media. Making the web visual.",
        objectives: ["Embed Images", "Audio & Video", "Figures", "File Formats"],
        whatYouWillLearn: [
            { topic: "Images", detail: "img tag, src, alt text, and sizing/aspect ratio." },
            { topic: "Modern Formats", detail: "WebP, SVG, and responsive images with picture tag." },
            { topic: "Multimedia", detail: "Using <audio> and <video> tags with controls." },
            { topic: "Figure", detail: "Semantic figure and figcaption for media." }
        ],
        project: "Create a photo gallery with captions",
        prerequisites: "Day 3: Links",
        resources: ["MDN Images", "Responsive Images"]
    },
    5: {
        overview: "Tables. Displaying tabular data.",
        objectives: ["Create Tables", "Table Headers", "Merge Cells", "Structuring"],
        whatYouWillLearn: [
            { topic: "Table Basics", detail: "table, tr, td tags structure." },
            { topic: "Headers", detail: "Using th for scope and accessibility." },
            { topic: "Structure", detail: "thead, tbody, tfoot for semantic tables." },
            { topic: "Span", detail: "rowspan and colspan for complex layouts." }
        ],
        project: "Design a class schedule or pricing table",
        prerequisites: "Day 4: Images",
        resources: ["MDN Tables", "Table Design"]
    },
    6: {
        overview: "Forms Deep Dive. Collecting user input.",
        objectives: ["Input Types", "Labels & Accessibility", "Form Submission", "Attributes"],
        whatYouWillLearn: [
            { topic: "Inputs", detail: "text, password, email, number, checkbox, radio." },
            { topic: "Labels", detail: "Connecting labels to inputs for a11y (for/id)." },
            { topic: "Controls", detail: "select, textarea, button types." },
            { topic: "Attributes", detail: "required, placeholder, readonly, disabled." }
        ],
        project: "Build a contact form and a survey",
        prerequisites: "Day 5: Tables",
        resources: ["MDN Forms", "Form Validation"]
    },
    7: {
        overview: "Semantic HTML. Meaningful structure.",
        objectives: ["Semantic Tags", "Document Outline", "Non-semantic usage", "Article vs Section"],
        whatYouWillLearn: [
            { topic: "Layout Tags", detail: "header, nav, main, footer, aside." },
            { topic: "Content Tags", detail: "article, section, time, address." },
            { topic: "Why Semantic", detail: "SEO benefits and screen reader compatibility." },
            { topic: "Div/Span", detail: "When to use generic containers vs semantic ones." }
        ],
        project: "Refactor a div-heavy layout to semantic HTML",
        prerequisites: "Day 6: Forms",
        resources: ["MDN Semantics", "HTML5 Doctor"]
    },
    8: {
        overview: "SEO & Meta Data. How search engines see your site.",
        objectives: ["Meta Tags", "Open Graph", "Twitter Cards", "Favicons"],
        whatYouWillLearn: [
            { topic: "Meta Basics", detail: "charset, viewport, description, keywords." },
            { topic: "Social Sharing", detail: "og:title, og:image for Facebook/Twitter." },
            { topic: "Index/Follow", detail: "Controlling crawler behavior." },
            { topic: "Favicons", detail: "Adding site icons for tabs and bookmarks." }
        ],
        project: "Optimize a landing page for social media sharing",
        prerequisites: "Day 7: Semantics",
        resources: ["Google SEO Guide", "Open Graph"]
    },
    9: {
        overview: "Accessibility (A11y). Web for everyone.",
        objectives: ["ARIA Basics", "Keyboard Nav", "Alt Text", "Contrast"],
        whatYouWillLearn: [
            { topic: "ARIA Roles", detail: "Using role attributes when semantics fail." },
            { topic: "ARIA States", detail: "aria-expanded, aria-hidden, aria-label." },
            { topic: "Navigation", detail: "Skip links and tab index management." },
            { topic: "Tools", detail: "Testing with Lighthouse and screen readers." }
        ],
        project: "Audit and fix accessibility issues on a webpage",
        prerequisites: "Day 8: SEO",
        resources: ["WAI-ARIA", "A11y Project"]
    },
    10: {
        overview: "HTML5 APIs. Power of the platform.",
        objectives: ["Geolocation", "Local Storage", "Drag & Drop", "Canvas"],
        whatYouWillLearn: [
            { topic: "Storage", detail: "localStorage vs sessionStorage for data." },
            { topic: "Geolocation", detail: "Getting user coordinates (with permission)." },
            { topic: "Canvas", detail: "Drawing graphics with the <canvas> element." },
            { topic: "Media API", detail: "Controlling video playback programmatically." }
        ],
        project: "Build a location-aware note taking app using Storage like a pro",
        prerequisites: "Day 9: Accessibility",
        resources: ["MDN Web APIs", "HTML5 Demo"]
    }
};

const css = {
    1: {
        overview: "CSS Basics. Styling the web.",
        objectives: ["Syntax", "Selectors", "Colors", "Fonts"],
        whatYouWillLearn: [
            { topic: "Syntax", detail: "Properties, values, and declarations block." },
            { topic: "Selectors", detail: "Element, Class, ID, and grouping selectors." },
            { topic: "Colors", detail: "Hex, RGB, HSL, and named colors." },
            { topic: "Text Basics", detail: "Font-family, size, weight, and style." }
        ],
        project: "Style your resume page with custom fonts and colors.",
        prerequisites: "HTML Basics",
        resources: ["MDN CSS", "CSS Tricks"]
    },
    2: {
        overview: "The Box Model. Understanding spacing and sizing.",
        objectives: ["Margin & Padding", "Borders", "Box Sizing", "Content Box"],
        whatYouWillLearn: [
            { topic: "Box Model", detail: "Content, padding, border, and margin layers." },
            { topic: "Box Sizing", detail: "border-box vs content-box (crucial concept)." },
            { topic: "Width/Height", detail: "Block vs inline behaviors for sizing." },
            { topic: "Borders", detail: "Style, width, color, and border-radius." }
        ],
        project: "Create a card component layout using the box model",
        prerequisites: "Day 1: CSS Basics",
        resources: ["The Box Model", "Box Sizing Guide"]
    },
    3: {
        overview: "Typography. Making text beautiful and readable.",
        objectives: ["Web Fonts", "Line Height", "Spacing", "Text Effects"],
        whatYouWillLearn: [
            { topic: "Web Fonts", detail: "Using Google Fonts and @font-face." },
            { topic: "Readability", detail: "Line-height, letter-spacing, and word-spacing." },
            { topic: "Alignment", detail: "Text-align, text-transform, and decoration." },
            { topic: "Decoration", detail: "Text-shadow and styling lists." }
        ],
        project: "Design a typography-heavy magazine layout",
        prerequisites: "Day 2: Box Model",
        resources: ["Google Fonts", "Variable Fonts"]
    },
    4: {
        overview: "Backgrounds and Gradients. Visual richness.",
        objectives: ["Images", "Gradients", "Blend Modes", "Clipping"],
        whatYouWillLearn: [
            { topic: "Background Image", detail: "url(), repeat, position, and size (cover/contain)." },
            { topic: "Gradients", detail: "Linear, radial, and conic gradients." },
            { topic: "Multiple Backgrounds", detail: "Layering background images." },
            { topic: "Transparency", detail: "Opacity and alpha channels (rgba)." }
        ],
        project: "Create a hero section with a gradient overlay",
        prerequisites: "Day 3: Typography",
        resources: ["CSS Gradients", "Background Shorthand"]
    },
    5: {
        overview: "Flexbox. One-dimensional layouts.",
        objectives: ["Flex Container", "Axes", "Alignment", "Ordering"],
        whatYouWillLearn: [
            { topic: "Display Flex", detail: "Enabling flex context. Row vs Column." },
            { topic: "Alignment", detail: "Justify-content and align-items." },
            { topic: "Flex Items", detail: "Flex-grow, flex-shrink, and flex-basis." },
            { topic: "Wrap", detail: "Handling overflow with flex-wrap." }
        ],
        project: "Build a responsive navigation bar and a photo grid",
        prerequisites: "Day 4: Backgrounds",
        resources: ["Flexbox Froggy", "CSS Tricks Flexbox"]
    },
    6: {
        overview: "CSS Grid. Two-dimensional layouts.",
        objectives: ["Grid Container", "Tracks", "Grid Areas", "Nesting"],
        whatYouWillLearn: [
            { topic: "Grid Template", detail: "Defining rows and columns with fr units." },
            { topic: "Placement", detail: "Grid-column and grid-row positioning." },
            { topic: "Areas", detail: "Named grid areas for semantic layouts." },
            { topic: "Gap", detail: "Managing spacing between tracks." }
        ],
        project: "Build a complex dashboard layout (Holy Grail layout)",
        prerequisites: "Day 5: Flexbox",
        resources: ["Grid Garden", "CSS Tricks Grid"]
    },
    7: {
        overview: "Positioning. Controlling element placement.",
        objectives: ["Static", "Relative", "Absolute", "Fixed", "Sticky"],
        whatYouWillLearn: [
            { topic: "Flow", detail: "Normal document flow vs positioned elements." },
            { topic: "Context", detail: "Positioning relative to nearest positioned ancestor." },
            { topic: "Fixed/Sticky", detail: "Viewport-based and scroll-based positioning." },
            { topic: "Z-Index", detail: "Stacking contexts and layers." }
        ],
        project: "Create a sticky header and floating action button (FAB)",
        prerequisites: "Day 6: Grid",
        resources: ["MDN Positioning", "Z-Index War"]
    },
    8: {
        overview: "Responsive Design. Adapting to devices.",
        objectives: ["Media Queries", "Breakpoints", "Mobile First", "Fluidity"],
        whatYouWillLearn: [
            { topic: "Media Queries", detail: "@media rules based on min-width/max-width." },
            { topic: "Mobile First", detail: "Designing for small screens first, extracting for larger." },
            { topic: "Fluid Types", detail: "Percent based widths and scalable layouts." },
            { topic: "Viewport", detail: "Meta viewport settings." }
        ],
        project: "Make your previous dashboard fully responsive",
        prerequisites: "Day 7: Positioning",
        resources: ["Responsive Design", "Media Queries"]
    },
    9: {
        overview: "Units & Sizing. Modern CSS units.",
        objectives: ["rem/em", "vh/vw", "clamp()", "min/max/fit"],
        whatYouWillLearn: [
            { topic: "Relative Units", detail: "Difference between rem (root) and em (parent)." },
            { topic: "Viewport Units", detail: "vh, vw, vmin, vmax for screen-relative sizing." },
            { topic: "Functions", detail: "Using calc(), clamp(), min(), and max()." },
            { topic: "Content Sizing", detail: "min-content, max-content, fit-content." }
        ],
        project: "Implement fluid typography that scales with viewport",
        prerequisites: "Day 8: Responsive",
        resources: ["Modern CSS Units", "Fluid Typography"]
    },
    10: {
        overview: "Transforms. Moving and shaping.",
        objectives: ["2D Transforms", "3D Transforms", "Origin", "Perspective"],
        whatYouWillLearn: [
            { topic: "Translate", detail: "Moving elements (performant way)." },
            { topic: "Scale/Rotate", detail: "Resizing and spinning elements." },
            { topic: "Skew", detail: "Distorting shapes." },
            { topic: "3D Space", detail: "Perspective and preserve-3d." }
        ],
        project: "Create a 3D card flip effect",
        prerequisites: "Day 9: Units",
        resources: ["MDN Transforms", "3D Transforms"]
    },
    11: {
        overview: "Transitions. Smoothing state changes.",
        objectives: ["Properties", "Duration", "Timing Function", "Delay"],
        whatYouWillLearn: [
            { topic: "Transition", detail: "Animating properties on state change (hover/focus)." },
            { topic: "Easings", detail: "Linear, ease-in, ease-out, cubic-bezier." },
            { topic: "Performance", detail: "Animating transform/opacity vs layout properties." },
            { topic: "Shorthand", detail: "Writing efficient transition rules." }
        ],
        project: "Build an interactive button library with hover effects",
        prerequisites: "Day 10: Transforms",
        resources: ["Better Transitions", "Easing Functions"]
    },
    12: {
        overview: "Animations. Keyframe magic.",
        objectives: ["Keyframes", "Animation properties", "Fill Mode", "Iteration"],
        whatYouWillLearn: [
            { topic: "@keyframes", detail: "Defining animation steps and percentages." },
            { topic: "Control", detail: "Direction, play-state (pause/play)." },
            { topic: "Fill Mode", detail: "Forwards, backwards, both (state after animation)." },
            { topic: "Chaining", detail: "Running multiple animations." }
        ],
        project: "Create a pure CSS loading spinner and entrance animations",
        prerequisites: "Day 11: Transitions",
        resources: ["MDN Animations", "Animista"]
    },
    13: {
        overview: "Pseudo-classes & Elements. Selecting the unselectable.",
        objectives: ["Component States", "Structural Selectors", "::before/::after", "Styling Parts"],
        whatYouWillLearn: [
            { topic: "User Action", detail: ":hover, :focus, :active, :focus-visible." },
            { topic: "Structure", detail: ":nth-child, :first-of-type, :not()." },
            { topic: "Pseudo-elements", detail: "::before and ::after for decorative content." },
            { topic: "Form States", detail: ":checked, :disabled, :valid, :invalid." }
        ],
        project: "Create custom checkboxes and stylized tooltips",
        prerequisites: "Day 12: Animations",
        resources: ["Pseudo-classes", "A Whole Bunch of Pseudo"]
    },
    14: {
        overview: "CSS Variables (Custom Properties). Dynamic styling.",
        objectives: ["Defining Vars", "Scoping", "Using calc()", "Theming"],
        whatYouWillLearn: [
            { topic: "Declaration", detail: "--variable-name: value on :root or elements." },
            { topic: "Usage", detail: "var(--variable-name, fallback)." },
            { topic: "Scoping", detail: "Cascade and inheritance of variables." },
            { topic: "JS Interaction", detail: "Updating variables via JavaScript." }
        ],
        project: "Implement a dark mode toggle using CSS variables",
        prerequisites: "Day 13: Pseudo-classes",
        resources: ["CSS Custom Properties", "Dark Mode Guide"]
    },
    15: {
        overview: "CSS Architecture. organizing for scale.",
        objectives: ["BEM", "Specificity Management", "Utility Classes", "Preprocessors"],
        whatYouWillLearn: [
            { topic: "BEM", detail: "Block Element Modifier naming convention." },
            { topic: "Organization", detail: "ITCSS (Inverted Triangle) or 7-1 pattern." },
            { topic: "Reset/Normalize", detail: "Standardizing browser defaults." },
            { topic: "Modern CSS", detail: "Nesting, :is(), :where(), layers." }
        ],
        project: "Refactor previous projects into a clean BEM architecture",
        prerequisites: "Day 14: Variables",
        resources: ["BEM Methodology", "Clean CSS"]
    }
};

const typescript = {
    1: {
        overview: "Introduction to TypeScript. Why types matter.",
        objectives: ["Understand TypeScript", "Setup Environment", "TS Config", "Compilation"],
        whatYouWillLearn: [
            { topic: "What is TS?", detail: "A superset of JavaScript adding static typing." },
            { topic: "Installation", detail: "npm install -g typescript and tsc command." },
            { topic: "tsconfig.json", detail: "Configuration options like target, module, strict." },
            { topic: "Compiling", detail: "Transpiling .ts files to .js for the browser/node." }
        ],
        project: "Setup a TS project structure and compile 'Hello World'",
        prerequisites: "JavaScript Fundamentals",
        resources: ["TypeScript Handbook", "TS Playground"]
    },
    2: {
        overview: "Basic Types. The building blocks.",
        objectives: ["Primitives", "Type Annotations", "Inference", "Any vs Unknown"],
        whatYouWillLearn: [
            { topic: "Primitives", detail: "string, number, boolean, null, undefined." },
            { topic: "Arrays & Tuples", detail: "Typed arrays and fixed-length array tuples." },
            { topic: "Type Inference", detail: "Letting TS guess the type automatically." },
            { topic: "Any/Unknown", detail: "The escape hatch (any) vs the safe alternative (unknown)." }
        ],
        project: "Build a basic calculator with type-safe inputs",
        prerequisites: "Day 1: Intro",
        resources: ["Everyday Types", "Type Inference"]
    },
    3: {
        overview: "Interfaces & Type Aliases. Defining shapes.",
        objectives: ["Interfaces", "Type Aliases", "Union Types", "Intersection"],
        whatYouWillLearn: [
            { topic: "Interfaces", detail: "Describing object shapes and contracts." },
            { topic: "Types vs Interfaces", detail: "When to use which (extensibility vs logic)." },
            { topic: "Unions", detail: "Allowing a value to be one of multiple types (|)." },
            { topic: "Intersections", detail: "Combining multiple types into one (&)." }
        ],
        project: "Model a User system with Admin, User, and Guest types",
        prerequisites: "Day 2: Basic Types",
        resources: ["Object Types", "Unions and Intersections"]
    },
    4: {
        overview: "Functions in TypeScript. Typing arguments and returns.",
        objectives: ["Function Types", "Optional Params", "Default Params", "Overloads"],
        whatYouWillLearn: [
            { topic: "Signatures", detail: "Typing parameters and return values." },
            { topic: "Optional/Default", detail: "Handling missing arguments safely." },
            { topic: "Rest Params", detail: "Typing ...args for variadic functions." },
            { topic: "Overloading", detail: "Defining multiple signatures for one function." }
        ],
        project: "Create a versatile utility library for string manipulation",
        prerequisites: "Day 3: Interfaces",
        resources: ["More on Functions", "Function Overloads"]
    },
    5: {
        overview: "Classes. Object-Oriented TypeScript.",
        objectives: ["Class Fields", "Access Modifiers", "Abstract Classes", "Interfaces"],
        whatYouWillLearn: [
            { topic: "Modifiers", detail: "public, private, protected, and readonly." },
            { topic: "Implements", detail: "Enforcing interfaces on classes." },
            { topic: "Abstract", detail: "Base classes that cannot be instantiated." },
            { topic: "Parameter Props", detail: "Shorthand for declaring and assigning properties." }
        ],
        project: "Build an RPG character system with classes and inheritance",
        prerequisites: "Day 4: Functions",
        resources: ["Classes Guide", "OOP in TS"]
    },
    6: {
        overview: "Generics. Reusable code components.",
        objectives: ["Generic Functions", "Generic Interfaces", "Constraints", "Default Types"],
        whatYouWillLearn: [
            { topic: "Concept", detail: "Writing code that works with a variety of types." },
            { topic: "Syntax", detail: "Using <T> to act as a type variable." },
            { topic: "Constraints", detail: "Restricting generics with 'extends'." },
            { topic: "Use Cases", detail: "Function wrappers, data containers, API responses." }
        ],
        project: "Create a type-safe 'Box' storage and retrieval system",
        prerequisites: "Day 5: Classes",
        resources: ["Generics Documentation", "Generic Constraints"]
    },
    7: {
        overview: "Utility Types. Built-in helpers.",
        objectives: ["Partial/Required", "Pick/Omit", "Readonly", "Record"],
        whatYouWillLearn: [
            { topic: "Transformation", detail: "Modifying existing types without rewriting." },
            { topic: "Partial & Required", detail: "Making all props optional or non-optional." },
            { topic: "Pick & Omit", detail: "Selecting or excluding specific keys." },
            { topic: "Record", detail: "Defining object types with specific keys and values." }
        ],
        project: "Refactor previous interfaces using Utility types",
        prerequisites: "Day 6: Generics",
        resources: ["Utility Types", "Mapped Types"]
    },
    8: {
        overview: "Advanced Types. Powerful type manipulation.",
        objectives: ["keyof & typeof", "Indexed Access", "Conditional Types", "Infer"],
        whatYouWillLearn: [
            { topic: "Type Queries", detail: "Getting types from values (typeof) and keys (keyof)." },
            { topic: "Indexed Access", detail: "Accessing a property type: User['id']." },
            { topic: "Conditional", detail: "Types based on conditions (T extends U ? X : Y)." },
            { topic: "Infer", detail: "Inferring types within conditionals (e.g. ReturnType)." }
        ],
        project: "Build a type-safe event emitter",
        prerequisites: "Day 7: Utility Types",
        resources: ["Keyof Type Operator", "Conditional Types"]
    },
    9: {
        overview: "Decorators. Meta-programming in TS.",
        objectives: ["Class Decorators", "Method Decorators", "Property Decorators", "Metadata"],
        whatYouWillLearn: [
            { topic: "Concept", detail: "Annotating and modifying classes/members." },
            { topic: "Usage", detail: "@decorator syntax and configuration." },
            { topic: "Factories", detail: "Passing arguments to decorators." },
            { topic: "Reflection", detail: "Using reflect-metadata (experimental)." }
        ],
        project: "Create a simple validation decorator for class properties",
        prerequisites: "Day 8: Advanced Types",
        resources: ["Decorators", "Experimental Options"]
    },
    10: {
        overview: "Modules and Namespaces. Organizing code.",
        objectives: ["ES Modules", "Namespaces", "Ambient Modules", "Module Resolution"],
        whatYouWillLearn: [
            { topic: "Import/Export", detail: "Modern ES6 module syntax." },
            { topic: "Namespaces", detail: "Internal modules (legacy organizing)." },
            { topic: "Declaration Files", detail: "Understanding .d.ts files." },
            { topic: "Augmentation", detail: "Extending existing modules." }
        ],
        project: "Organize the RPG project into strict modules",
        prerequisites: "Day 9: Decorators",
        resources: ["Modules", "Namespaces"]
    },
    11: {
        overview: "TypeScript with React. Typing the UI.",
        objectives: ["Typing Props", "Typing Hooks", "Event Types", "Context"],
        whatYouWillLearn: [
            { topic: "Components", detail: "FunctionComponent vs React.FC types." },
            { topic: "Hooks", detail: "Typing useState<User | null> and reducers." },
            { topic: "Events", detail: "React.ChangeEvent and specific elements." },
            { topic: "Children", detail: "React.ReactNode vs React.ReactElement." }
        ],
        project: "Build a strongly typed React Form component",
        prerequisites: "Day 10: Modules",
        resources: ["React TypeScript Cheatsheet", "Typing React"]
    },
    12: {
        overview: "TypeScript with Node.js. Backend typing.",
        objectives: ["Setup Node+TS", "Type Definitions", "Express Typing", "Environment"],
        whatYouWillLearn: [
            { topic: "Setup", detail: "ts-node and nodemon configuration." },
            { topic: "@types", detail: "Installing types for libraries (e.g. @types/express)." },
            { topic: "Request/Response", detail: "Extending Express Request types." },
            { topic: "Process Env", detail: "Typing environment variables." }
        ],
        project: "Build a typed REST API endpoint with Express",
        prerequisites: "Day 11: TS with React",
        resources: ["Node with TypeScript", "DefinitelyTyped"]
    },
    13: {
        overview: "Design Patterns in TS. Structural code.",
        objectives: ["Singleton", "Factory", "Observer", "Builder"],
        whatYouWillLearn: [
            { topic: "Singleton", detail: "Ensuring a class has only one instance." },
            { topic: "Factory", detail: "Creating objects without specifying exact class." },
            { topic: "Observer", detail: "Subscription mechanism to notify multiple objects." },
            { topic: "Implementation", detail: "Leveraging interfaces for patterns." }
        ],
        project: "Implement the Observer pattern for a notification system",
        prerequisites: "Day 12: TS with Node",
        resources: ["Refactoring Guru TS Patterns", "Design Patterns"]
    },
    14: {
        overview: "Testing Types. Verifying your contracts.",
        objectives: ["Type Testing", "Expect Type", "Jest with TS", "Snapshot"],
        whatYouWillLearn: [
            { topic: "ts-jest", detail: "Running tests directly with TS support." },
            { topic: "Type Assertions", detail: "Testing if a type matches expectation (dts-jest)." },
            { topic: "Expectations", detail: "Asserting function return types." },
            { topic: "Mocking", detail: "Typed mocks for dependencies." }
        ],
        project: "Write unit tests for the Utility Library from Day 4",
        prerequisites: "Day 13: Patterns",
        resources: ["ts-jest Docs", "Testing Types"]
    },
    15: {
        overview: "Migration & Strict Mode. Production ready.",
        objectives: ["JS to TS", "Strict Flags", "Linting", "Best Practices"],
        whatYouWillLearn: [
            { topic: "Migration Strategy", detail: "Allowing implicit any, then tightening." },
            { topic: "Strict Mode", detail: "strictNullChecks, noImplicitAny, etc." },
            { topic: "ESLint", detail: "Linting TypeScript code." },
            { topic: "Branding", detail: "Creating nominal types (Branded types)." }
        ],
        project: "Migrate a small JS project to strict TS",
        prerequisites: "Day 14: Testing",
        resources: ["Migrating to TypeScript", "Total TypeScript Tips"]
    }
};

const angular = {
    1: {
        overview: "Introduction to Angular. The Framework.",
        objectives: ["Angular CLI", "Project Structure", "First Component", "Modules"],
        whatYouWillLearn: [
            { topic: "CLI Power", detail: "Generate components, services, and modules instantly." },
            { topic: "Architecture", detail: "Modules (NgModule) vs Standalone components." },
            { topic: "Files", detail: ".ts logic, .html template, .css styles encapsulation." },
            { topic: "Bootstrapping", detail: "How Angular starts and loads the root component." }
        ],
        project: "Create and serve your first Angular 'Hello World' app",
        prerequisites: "TypeScript Basics",
        resources: ["Angular Docs", "Angular CLI"]
    },
    2: {
        overview: "Components Essentials. Building blocks.",
        objectives: ["@Component", "Templates", "Styles", "Selectors"],
        whatYouWillLearn: [
            { topic: "Decorator", detail: "Configuring metadata for classes." },
            { topic: "Templates", detail: "Inline vs external HTML files." },
            { topic: "Styling", detail: "ViewEncapsulation modes (Emulated vs ShadowDom)." },
            { topic: "Nesting", detail: "Using components inside other components." }
        ],
        project: "Build a header and footer component layout",
        prerequisites: "Day 1: Intro",
        resources: ["Component Fundamentals", "View Encapsulation"]
    },
    3: {
        overview: "Data Binding. Communication flow.",
        objectives: ["Interpolation", "Property Binding", "Event Binding", "Two-way Binding"],
        whatYouWillLearn: [
            { topic: "Interpolation", detail: "Displaying dynamic data {{ value }}." },
            { topic: "Properties", detail: "[property] binding for HTML attributes." },
            { topic: "Events", detail: "(event) binding for user interaction." },
            { topic: "Box of Bananas", detail: "[(ngModel)] for two-way data sync." }
        ],
        project: "Create an interactive profile card editor",
        prerequisites: "Day 2: Components",
        resources: ["Binding Syntax", "Template Syntax"]
    },
    4: {
        overview: "Directives. Dynamic templates.",
        objectives: ["Structural Directives", "Attribute Directives", "*ngIf & *ngFor", "ngClass & ngStyle"],
        whatYouWillLearn: [
            { topic: "*ngIf", detail: "Conditionally adding/removing elements from DOM." },
            { topic: "*ngFor", detail: "Iterating over lists and tracking items." },
            { topic: "ngClass", detail: "Dynamically adding/removing CSS classes." },
            { topic: "ngSwitch", detail: "Handling multiple conditional cases." }
        ],
        project: "Build a dynamic task list with completion styling",
        prerequisites: "Day 3: Binding",
        resources: ["Built-in Directives", "Structural Directives"]
    },
    5: {
        overview: "Pipes. Transforming data.",
        objectives: ["Built-in Pipes", "Chaining Pipes", "Custom Pipes", "Pure vs Impure"],
        whatYouWillLearn: [
            { topic: "Formatting", detail: "Date, Currency, UpperCase, LowerCase pipes." },
            { topic: "Parameters", detail: "Passing arguments to pipes (e.g., date:'short')." },
            { topic: "Custom Pipe", detail: "Creating a pipe to transform custom data." },
            { topic: "JsonPipe", detail: "Debugging objects in the template." }
        ],
        project: "Create a product list with price formatting and search filter pipe",
        prerequisites: "Day 4: Directives",
        resources: ["Transforming Data", "Pipe API"]
    },
    6: {
        overview: "Component Communication. Data flow.",
        objectives: ["@Input", "@Output", "EventEmitter", "ViewChild"],
        whatYouWillLearn: [
            { topic: "Input", detail: "Passing data down to child components." },
            { topic: "Output", detail: "Emitting events up to parent components." },
            { topic: "Aliasing", detail: "Renaming inputs/outputs for public API." },
            { topic: "Local Refs", detail: "Accessing elements with template variables (#var)." }
        ],
        project: "Build a parent-child dashboard with widget configuration",
        prerequisites: "Day 5: Pipes",
        resources: ["Component Interaction", "Input/Output"]
    },
    7: {
        overview: "Lifecycle Hooks. Timing is everything.",
        objectives: ["ngOnInit", "ngOnDestroy", "ngOnChanges", "ngAfterViewInit"],
        whatYouWillLearn: [
            { topic: "Initialization", detail: "ngOnInit vs constructor usage." },
            { topic: "Cleanup", detail: "Unsubscribing and cleanup in ngOnDestroy." },
            { topic: "Changes", detail: "Reacting to input changes with ngOnChanges." },
            { topic: "View Init", detail: "Accessing DOM elements after view initialization." }
        ],
        project: "Implement a timer component with proper setup and teardown",
        prerequisites: "Day 6: Comm",
        resources: ["Lifecycle Hooks", "OnChanges"]
    },
    8: {
        overview: "Template Driven Forms. Simple approach.",
        objectives: ["FormsModule", "ngModel", "Validation", "Form State"],
        whatYouWillLearn: [
            { topic: "Setup", detail: "Importing FormsModule." },
            { topic: "Two-way", detail: "Using ngModel for form inputs." },
            { topic: "Validation", detail: "HTML5 attributes imports (required, minlength)." },
            { topic: "State", detail: "Tracking touched, dirty, valid states." }
        ],
        project: "Create a login form with basic validation",
        prerequisites: "Day 7: Lifecycle",
        resources: ["Template-driven Forms", "Form Validation"]
    },
    9: {
        overview: "Reactive Forms. Controlled approach.",
        objectives: ["ReactiveFormsModule", "FormControl", "FormGroup", "FormBuilder"],
        whatYouWillLearn: [
            { topic: "Model", detail: "Creating form model in TypeScript class." },
            { topic: "Sync", detail: "Binding formGroup to the template." },
            { topic: "Validators", detail: "Using built-in validators functions." },
            { topic: "Testing", detail: "Easier unit testing of form logic." }
        ],
        project: "Build a complex registration form with nested groups",
        prerequisites: "Day 8: Template Forms",
        resources: ["Reactive Forms", "Form Builder"]
    },
    10: {
        overview: "Services & Dependency Injection. Shared logic.",
        objectives: ["@Injectable", "Providers", "Singleton Pattern", "Hierarchical DI"],
        whatYouWillLearn: [
            { topic: "Service", detail: "Creating a class for business logic/data." },
            { topic: "Injection", detail: "Injecting services into components via constructor." },
            { topic: "Scope", detail: "Root vs Component level providers." },
            { topic: "Sharing", detail: "Sharing state between unrelated components." }
        ],
        project: "Create a DataService to share data across the app",
        prerequisites: "Day 9: Reactive Forms",
        resources: ["Dependency Injection", "Services"]
    },
    11: {
        overview: "HTTP Client. Talking to servers.",
        objectives: ["HttpClientModule", "GET/POST/PUT", "Type Safety", "Headers"],
        whatYouWillLearn: [
            { topic: "Setup", detail: "Importing HttpClientModule (or provideHttpClient)." },
            { topic: "Requests", detail: "Making async calls to APIs." },
            { topic: "Typing", detail: "Generics <T> for typed responses." },
            { topic: "Options", detail: "Setting headers and query params." }
        ],
        project: "Fetch and display a list of users from a placeholder API",
        prerequisites: "Day 10: Services",
        resources: ["HttpClient", "Consuming APIs"]
    },
    12: {
        overview: "RxJS Basics. Reactive programming.",
        objectives: ["Observables", "Subscribers", "Operators", "Async Pipe"],
        whatYouWillLearn: [
            { topic: "Stream", detail: "Understanding data streams over time." },
            { topic: "Map/Filter", detail: "Transforming data in the pipe." },
            { topic: "Subscribe", detail: "Manually subscribing vs Async Pipe." },
            { topic: "Memory", detail: "Avoiding memory leaks with unsubscribe." }
        ],
        project: "Implement a live search feature with debounce and switchMap",
        prerequisites: "Day 11: HTTP",
        resources: ["RxJS Primer", "Async Pipe"]
    },
    13: {
        overview: "Routing. Navigation basics.",
        objectives: ["RouterModule", "Routes Config", "RouterLink", "RouterOutlet"],
        whatYouWillLearn: [
            { topic: "Configuration", detail: "Defining path and component mapping." },
            { topic: "Links", detail: "Navigating declaratively with routerLink." },
            { topic: "Outlet", detail: "Placeholder for routed views." },
            { topic: "Active", detail: "Styling active routes with routerLinkActive." }
        ],
        project: "Add navigation to the User/Product app",
        prerequisites: "Day 12: RxJS",
        resources: ["Routing & Navigation", "Router Class"]
    },
    14: {
        overview: "Child Routes & Params. Nested views.",
        objectives: ["ActivatedRoute", "Route Params", "Child Routes", "Nav Programmatically"],
        whatYouWillLearn: [
            { topic: "Params", detail: "Reading :id from the URL." },
            { topic: "Children", detail: "Defining nested routes array." },
            { topic: "Navigate", detail: "Using router.navigate(['path']). " },
            { topic: "Query Params", detail: "Handling ?filter=value." }
        ],
        project: "Build a Master-Detail view for Products",
        prerequisites: "Day 13: Routing",
        resources: ["Route Parameters", "Nested Routes"]
    },
    15: {
        overview: "Advanced Routing. Guards & Loading.",
        objectives: ["CanActivate", "Resolvers", "Lazy Loading", "Preloading"],
        whatYouWillLearn: [
            { topic: "Guards", detail: "Protecting routes (Auth Guard)." },
            { topic: "Resolvers", detail: "Fetching data before route activation." },
            { topic: "Lazy Loading", detail: "Loading modules only when requested." },
            { topic: "Strategy", detail: "Preloading strategies for performance." }
        ],
        project: "Implement a protected Admin area with lazy loading",
        prerequisites: "Day 14: Child Routes",
        resources: ["Route Guards", "Lazy Loading"]
    },
    16: {
        overview: "Interceptors. HTTP Middleware.",
        objectives: ["HttpInterceptor", "Modifying Requests", "Handling Errors", "Auth Tokens"],
        whatYouWillLearn: [
            { topic: "Interceptor", detail: "Intercepting all HTTP traffic globally." },
            { topic: "Auth", detail: "Attaching Bearer tokens to headers automatically." },
            { topic: "Errors", detail: "Global error handling and logging." },
            { topic: "Loading", detail: "Implementing a global loading spinner." }
        ],
        project: "Create an AuthInterceptor and ErrorHandler",
        prerequisites: "Day 15: Adv Routing",
        resources: ["HTTP Interceptors", "Security"]
    },
    17: {
        overview: "Deep Dive Directives. Custom behaviors.",
        objectives: ["Custom Directives", "HostListener", "HostBinding", "ElementRef"],
        whatYouWillLearn: [
            { topic: "Attribute", detail: "Creating custom behavior (e.g., appHighlight)." },
            { topic: "Events", detail: "Listening to host events with HostListener." },
            { topic: "Properties", detail: "Binding to host properties with HostBinding." },
            { topic: "DOM Access", detail: "Safe DOM manipulation." }
        ],
        project: "Build a 'click-outside' and 'tooltip' directive",
        prerequisites: "Day 16: Interceptors",
        resources: ["Attribute Directives", "HostListener"]
    },
    18: {
        overview: "Content Projection. Flexible components.",
        objectives: ["ng-content", "Select Attribute", "Multi-slot", "ContentChild"],
        whatYouWillLearn: [
            { topic: "Projection", detail: "Inserting content into component slots (Transclusion)." },
            { topic: "Multi-slot", detail: "Using select='.class' to target specific content." },
            { topic: "Access", detail: "Accessing projected content with ContentChild." },
            { topic: "Reusability", detail: "Creating flexible UI wrappers (Cards, Modals)." }
        ],
        project: "Create a flexible Card component with header, body, and footer slots",
        prerequisites: "Day 17: Directives",
        resources: ["Content Projection", "ng-content"]
    },
    19: {
        overview: "Dynamic Components. Runtime creation.",
        objectives: ["ViewContainerRef", "ComponentFactory", "ngComponentOutlet", "Dynamic content"],
        whatYouWillLearn: [
            { topic: "Dynamic", detail: "Loading components not defined in template." },
            { topic: "Container", detail: "Using ViewContainerRef only where needed." },
            { topic: "Outlet", detail: "Simple dynamic loading with *ngComponentOutlet." },
            { topic: "Data", detail: "Passing data to dynamic components." }
        ],
        project: "Build a dynamic popup/modal manager service",
        prerequisites: "Day 18: Projection",
        resources: ["Dynamic Components", "Dynamic Loading"]
    },
    20: {
        overview: "Change Detection. Optimization.",
        objectives: ["Zone.js", "Default vs OnPush", "ChangeDetectorRef", "Immutability"],
        whatYouWillLearn: [
            { topic: "Zones", detail: "How Angular detects changes automagically." },
            { topic: "OnPush", detail: "Optimizing performace by checking only on input change." },
            { topic: "Manual", detail: "Using markForCheck() and detectChanges()." },
            { topic: "Pitfalls", detail: "Why mutation breaks OnPush." }
        ],
        project: "Optimize a heavy list component using OnPush strategy",
        prerequisites: "Day 19: Dynamic Components",
        resources: ["Change Detection", "OnPush Strategy"]
    },
    21: {
        overview: "State Management. NgRx Intro.",
        objectives: ["Redux Pattern", "Store", "Actions", "Reducers"],
        whatYouWillLearn: [
            { topic: "Pattern", detail: "Single source of truth and unidirectional flow." },
            { topic: "Store", detail: "The immutable state container." },
            { topic: "Actions", detail: "Events that describe what happened." },
            { topic: "Reducers", detail: "Pure functions to handle state transitions." }
        ],
        project: "Setup NgRx and implement a simple counter store",
        prerequisites: "Day 20: Change Detection",
        resources: ["NgRx Docs", "Redux Pattern"]
    },
    22: {
        overview: "NgRx Effects & Selectors. Async state.",
        objectives: ["Effects", "Selectors", "Feature State", "Entity Adapter"],
        whatYouWillLearn: [
            { topic: "Effects", detail: "Handling side effects (API calls) outside components." },
            { topic: "Selectors", detail: "Memoized functions to slice state." },
            { topic: "Entity", detail: "Managing collections of data efficiently." },
            { topic: "DevTools", detail: "Time-travel debugging with Redux DevTools." }
        ],
        project: "Refactor the Users app to use NgRx for data fetching",
        prerequisites: "Day 21: State Mgmt",
        resources: ["NgRx Effects", "NgRx Entity"]
    },
    23: {
        overview: "Angular Signals. The future of reactivity.",
        objectives: ["Writable Signals", "Computed", "Effects", "Signal Inputs"],
        whatYouWillLearn: [
            { topic: "Signals", detail: "Fine-grained reactivity wrapper for values." },
            { topic: "Computed", detail: "Derived values that update automatically." },
            { topic: "Effects", detail: "Side effects that run when signals change." },
            { topic: "Interop", detail: "Using signals with RxJS (toSignal, toObservable)." }
        ],
        project: "Refactor the Counter and Profile apps to use Signals",
        prerequisites: "Day 22: NgRx",
        resources: ["Angular Signals", "Fine-Grained Reactivity"]
    },
    24: {
        overview: "Unit Testing. Jasmine & Karma.",
        objectives: ["TestBed", "Component Testing", "Service Testing", "Mocks/Spies"],
        whatYouWillLearn: [
            { topic: "TestBed", detail: "Configuring the Angular test module." },
            { topic: "Expectations", detail: "Writing assertions with Jasmine." },
            { topic: "Spies", detail: "Mocking dependencies and methods." },
            { topic: "Async", detail: "Testing async operations (fakeAsync, tick)." }
        ],
        project: "Write comprehensive unit tests for Services and Components",
        prerequisites: "Day 23: Signals",
        resources: ["Angular Testing", "Jasmine Docs"]
    },
    25: {
        overview: "E2E Testing. Cypress.",
        objectives: ["E2E Config", "Cypress Basics", "Selecting Elements", "User Flows"],
        whatYouWillLearn: [
            { topic: "E2E", detail: "Testing the application as a user from the browser." },
            { topic: "Cypress", detail: "Modern, fast E2E testing framework." },
            { topic: "Selectors", detail: "Best practices for finding elements (data-cy)." },
            { topic: "Flows", detail: "Simulating login and navigation." }
        ],
        project: "Write an E2E test for the critical user journey (Login -> Dashboard)",
        prerequisites: "Day 24: Unit Testing",
        resources: ["Cypress Angular", "E2E Best Practices"]
    },
    26: {
        overview: "Performance Optimization. Speed it up.",
        objectives: ["Bundle Analysis", "Lazy Loading", "Preloading", "Web Workers"],
        whatYouWillLearn: [
            { topic: "Bundle Size", detail: "Analyzing and reducing main.js size." },
            { topic: "Lazy Load", detail: "Deferring non-critical modules/images." },
            { topic: "SSR", detail: "Intro to Angular Universal (Server Side Rendering)." },
            { topic: "Workers", detail: "Offloading heavy computation to background threads." }
        ],
        project: "Audit and optimize the application performance",
        prerequisites: "Day 25: E2E Testing",
        resources: ["Performance Guide", "Angular Universal"]
    },
    27: {
        overview: "PWA. Progressive Web Apps.",
        objectives: ["Service Worker", "Manifest", "Offline Mode", "Installable"],
        whatYouWillLearn: [
            { topic: "Update", detail: "Handling app updates (SWUpdate service)." },
            { topic: "Cache", detail: "Caching strategies for assets and API calls." },
            { topic: "Manifest", detail: "Making the app installable on home screen." },
            { topic: "Offline", detail: "Handling offline network state." }
        ],
        project: "Convert the app into a PWA with offline support",
        prerequisites: "Day 26: Performance",
        resources: ["Angular PWA", "Service Worker Guide"]
    },
    28: {
        overview: "Deployment. Going Production.",
        objectives: ["Production Build", "Environments", "Firebase/Netlify", "Docker"],
        whatYouWillLearn: [
            { topic: "Build", detail: "Optimized production build instructions." },
            { topic: "Env Vars", detail: "Managing environment.prod.ts." },
            { topic: "Hosting", detail: "Deploying to Firebase Hosting or Netlify." },
            { topic: "CI/CD", detail: "Basic automation for deployment." }
        ],
        project: "Deploy the optimized Angular app to a public URL",
        prerequisites: "Day 27: PWA",
        resources: ["Deployment Guide", "Firebase Hosting"]
    }
};

const zustand = {
    1: {
        overview: "Introduction to Zustand. Simple State Management.",
        objectives: ["Installation", "Creating a Store", "Using the Store", "Comparison"],
        whatYouWillLearn: [
            { topic: "Why Zustand?", detail: "Minimal API, no boilerplate, unopinionated." },
            { topic: "create()", detail: "Creating the hook-based store." },
            { topic: "Usage", detail: "Reading state in components via the hook." },
            { topic: "vs Context", detail: "Solving the re-render issue of Context API." }
        ],
        project: "Create a simple counter app with Zustand",
        prerequisites: "React Basics",
        resources: ["Zustand GitHub", "State Management Comparison"]
    },
    2: {
        overview: "State and Actions. The Basics.",
        objectives: ["Defining State", "Writing Actions", "Updating State", "Immutability"],
        whatYouWillLearn: [
            { topic: "State Shape", detail: "Modeling your data effectively." },
            { topic: "Actions", detail: "Functions inside the store to modify state." },
            { topic: "set()", detail: "The setter function: set(state => ({ count: state.count + 1 }))." },
            { topic: "Immutability", detail: "Merging updates automatically." }
        ],
        project: "Build a Todo list with add/remove actions",
        prerequisites: "Day 1: Intro",
        resources: ["Updating State", "Store Actions"]
    },
    3: {
        overview: "Selectors. Optimizing Performance.",
        objectives: ["Selecting State", "Shallow Comparison", "Re-renders", "Multiple Selectors"],
        whatYouWillLearn: [
            { topic: "Selector Pattern", detail: "const bears = useStore(state => state.bears)." },
            { topic: "Optimization", detail: "Rendering only when the selected slice changes." },
            { topic: "Shallow", detail: "Using useShallow or shallow comparison for objects." },
            { topic: "Pick", detail: "Selecting multiple values efficiently." }
        ],
        project: "Optimize a large list app to prevent unnecessary re-renders",
        prerequisites: "Day 2: Actions",
        resources: ["Auto Generating Selectors", "Performance"]
    },
    4: {
        overview: "Middleware. Extending functionality.",
        objectives: ["Persist", "Devtools", "Immer", "Custom Middleware"],
        whatYouWillLearn: [
            { topic: "persist", detail: "Saving state to localStorage automatically." },
            { topic: "devtools", detail: "Connecting to Redux DevTools extension." },
            { topic: "immer", detail: "Writing mutable logic in reducers." },
            { topic: "Chaining", detail: "Combining multiple middlewares." }
        ],
        project: "Add persistence and debugging to the Todo app",
        prerequisites: "Day 3: Selectors",
        resources: ["Middleware Guide", "Persist Middleware"]
    },
    5: {
        overview: "Async Data. Managing side effects.",
        objectives: ["Async Actions", "Loading States", "Error Handling", "Fetching"],
        whatYouWillLearn: [
            { topic: "Async/Await", detail: "Making API calls directly in actions." },
            { topic: "State Updates", detail: "Updating state before and after fetch." },
            { topic: "Pattern", detail: "{ data, loading, error } state shape." },
            { topic: "Cancellation", detail: "Handling race conditions." }
        ],
        project: "Build a User Fetcher with loading and error states",
        prerequisites: "Day 4: Middleware",
        resources: ["Async Actions", "Data Fetching"]
    },
    6: {
        overview: "Slices Pattern. Scaling up.",
        objectives: ["Slice Pattern", "Creating Slices", "Combining Slices", "Bound Store"],
        whatYouWillLearn: [
            { topic: "Concept", detail: "Splitting a large store into smaller files." },
            { topic: "Syntax", detail: "createSlice = (set) => ({ ... })." },
            { topic: "Merge", detail: "Spreading slices into the main store creation." },
            { topic: "Shared", detail: "Accessing state across slices." }
        ],
        project: "Refactor a monolithic store into AuthSlice and TodoSlice",
        prerequisites: "Day 5: Async",
        resources: ["Slices Pattern", "Splitting the Store"]
    },
    7: {
        overview: "TypeScript Integration. Type safety.",
        objectives: ["Typing State", "Typing Actions", "Combined Types", "Middleware Types"],
        whatYouWillLearn: [
            { topic: "Interface", detail: "Defining the Store interface." },
            { topic: "Implementation", detail: "create<StoreType>((set) => ...)." },
            { topic: "Slices", detail: "Typing slices and the combined store." },
            { topic: "Combine", detail: "Using combine from zustand/middleware." }
        ],
        project: "Convert the Slices project to strict TypeScript",
        prerequisites: "Day 6: Slices",
        resources: ["TypeScript Guide", "Typing Slices"]
    },
    8: {
        overview: "Best Practices & Recipes. Mastery.",
        objectives: ["Store Structure", "Testing", "React Context", "Gotchas"],
        whatYouWillLearn: [
            { topic: "Testing", detail: "Mocking zustand for unit tests." },
            { topic: "Context", detail: "Initializing store with props via Context." },
            { topic: "Reset", detail: "Implementing a reset implementation." },
            { topic: "Outside React", detail: "Using the store outside of components." }
        ],
        project: "Build a final comprehensive dashboard using all patterns",
        prerequisites: "Day 7: TypeScript",
        resources: ["Testing Zustand", "Recipes"]
    }
};

export const allDayDetails = {
    react,
    html,
    css,
    typescript,
    angular,
    zustand
};

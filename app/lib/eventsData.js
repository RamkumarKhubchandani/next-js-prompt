export const eventsData = [
    {
        id: "js-react-workshop",
        title: "JavaScript + React + Zustand Masterclass",
        slug: "js-react-workshop",
        price: "FREE",
        reviewCount: "840+",
        rating: 4.9,
        shortDescription: "A high-intensity, zero-cost cohort for mastering the modern web stack. From closures to custom hooks.",
        fullDescription: "Propel your career with this exclusive, high-impact workshop. We strip away the fluff and focus purely on the hard parts of JavaScript and the architectural patterns of React. Ideally suited for developers who know the basics but want to reach a defined 'Senior' level of understanding.",
        highlights: [
            "Advanced Hooks & Composition",
            "Performance Tuning (React 19)",
            "Design Patterns (HOC, Render Props)",
            "State Architecture (Zustand/Redux)"
        ],
        reviews: [
            { id: 1, name: "Rohan Patel", role: "Frontend Lead @ Infosys", avatar: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5, text: "The reconciliation algorithm deep dive changed how I write components. Zustand day was pure gold." },
            { id: 2, name: "Sarah Jenkins", role: "React Dev @ London FinTech", avatar: "https://randomuser.me/api/portraits/women/44.jpg", rating: 5, text: "Finally a course that goes beyond 'todo apps'. The 5-person squad project was intense but prepared me." },
            { id: 3, name: "Mike Ross", role: "Senior Eng @ NY Startups", avatar: "https://randomuser.me/api/portraits/men/86.jpg", rating: 5, text: "The AI integration module is cutting edge. I'm using those prompting patterns daily now." },
            { id: 4, name: "Anita Desai", role: "SDE II @ Swiggy", avatar: "https://randomuser.me/api/portraits/women/29.jpg", rating: 5, text: "The capstone project gave me real system design experience. My interviewers were impressed." },
            { id: 5, name: "Tom Holland", role: "Junior Dev @ BBC", avatar: "https://randomuser.me/api/portraits/men/11.jpg", rating: 4, text: "Hard but worth it. The closures and event loop days cleared up years of confusion." },
            { id: 6, name: "Lisa Chen", role: "Frontend Eng @ Uber", avatar: "https://randomuser.me/api/portraits/women/68.jpg", rating: 5, text: "The career support is no joke. They helped me negotiate my salary and optimize my LinkedIn." },
            { id: 7, name: "Karthik R", role: "Tech Lead @ Zoho", avatar: "https://randomuser.me/api/portraits/men/45.jpg", rating: 5, text: "Highly technical. If you want to understand how React really works under the hood, this is it." }
        ],
        curriculum: [
            // PHASE 1: JAVASCRIPT DEEP DIVE (Days 1-7)
            {
                day: "Day 1",
                title: "JS Engines & Runtime",
                topics: [
                    "V8 Engine Architecture: Call Stack, Heap",
                    "Event Loop Visualization: Microtasks vs Macrotasks",
                    "Hoisting & Temporal Dead Zone (TDZ)",
                    "Garbage Collection Algorithms"
                ]
            },
            {
                day: "Day 2",
                title: "Scope & Closures",
                topics: [
                    "Lexical Environment vs Dynamic Scope",
                    "Closure Memory Leak Pitfalls",
                    "Module Pattern & IIFE",
                    "Currying & Partial Application"
                ]
            },
            {
                day: "Day 3",
                title: "Advanced Objects & Prototypes",
                topics: [
                    "Prototypal Inheritance Chain",
                    "Object.create() vs new Keyword",
                    "this Keyword: 4 binding rules",
                    "Getters, Setters & Property Descriptors"
                ]
            },
            {
                day: "Day 4",
                title: "Asynchronous Mastery",
                topics: [
                    "Callback Hell & Inversion of Control",
                    "Promises Internal State Machine",
                    "Async/Await: Error Handling Patterns",
                    "Parallel execution: Promise.all vs allSettled"
                ]
            },
            {
                day: "Day 5",
                title: "ES6+ & Modern Syntax",
                topics: [
                    "Destructuring & Spread/Rest Operators",
                    "Template Literals & Tagged Templates",
                    "Maps, Sets, WeakMaps, WeakSets",
                    "Iterators & Generators"
                ]
            },
            {
                day: "Day 6",
                title: "Functional Programming in JS",
                topics: [
                    "Pure Functions & Side Effects",
                    "Immutability Best Practices",
                    "Higher Order Functions (map, filter, reduce)",
                    "Function Composition & Piping"
                ]
            },
            {
                day: "Day 7",
                title: "DOM & Browser APIs",
                topics: [
                    "DOM Tree Traversal & Manipulation",
                    "Event Bubbling, Capturing & Delegation",
                    "Intersection Observer API",
                    "Local Storage, Session Storage, Cookies"
                ]
            },

            // PHASE 2: REACT CORE (Days 8-15)
            {
                day: "Day 8",
                title: "React Fundamentals & JSX",
                topics: [
                    "Virtual DOM & Reconciliation Algorithm",
                    "JSX compilation (React.createElement)",
                    "Components: Functional vs Class",
                    "Props: Read-only Data Flow"
                ]
            },
            {
                day: "Day 9",
                title: "State & Lifecycle",
                topics: [
                    "useState Hook: Batching & Updates",
                    "Controlled vs Uncontrolled Components",
                    "useEffect: Dependency Array Mysteries",
                    "Cleanup Functions & Memory Leaks"
                ]
            },
            {
                day: "Day 10",
                title: "Props & Data Flow",
                topics: [
                    "Prop Drilling issues",
                    "Composition: Children Prop & Slots",
                    "Lifting State Up",
                    "One-way Data Flow architecture"
                ]
            },
            {
                day: "Day 11",
                title: "Advanced Hooks",
                topics: [
                    "useReducer: Complex State Logic",
                    "useContext: Avoiding Prop Drilling",
                    "useRef: Imperative Handles",
                    "Writing Custom Hooks"
                ]
            },
            {
                day: "Day 12",
                title: "Performance Optimization",
                topics: [
                    "React.memo & Pure Components",
                    "useMemo & useCallback",
                    "Code Splitting & Lazy Loading (Suspense)",
                    "Profiler API & DevTools"
                ]
            },
            {
                day: "Day 13",
                title: "Forms & Validation",
                topics: [
                    "React Hook Form Library",
                    "Schema Validation (Zod/Yup)",
                    "Handling File Uploads",
                    "Debouncing User Input"
                ]
            },
            {
                day: "Day 14",
                title: "Styling React",
                topics: [
                    "CSS Modules & Scoping",
                    "CSS-in-JS (Styled Components)",
                    "Tailwind CSS Utility First",
                    "Dynamic Theming"
                ]
            },
            {
                day: "Day 15",
                title: "Error Boundaries & Portals",
                topics: [
                    "Catching Rendering Errors",
                    "React Portals for Modals",
                    "Accessibility (A11y) in React",
                    "Fragment & Strict Mode"
                ]
            },

            // PHASE 3: STATE & ECOSYSTEM (Days 16-22)
            {
                day: "Day 16",
                title: "Global State: Redux Toolkit",
                topics: [
                    "Flux Architecture",
                    "Redux Store, Slices & Reducers",
                    "Thunks for Async Logic",
                    "Redux DevTools"
                ]
            },
            {
                day: "Day 17",
                title: "Zustand Deep Dive",
                topics: [
                    "Minimalist Store Setup",
                    "Zustand vs Redux vs Context",
                    "Persisting State (Middleware)",
                    "Selectors & Performance Tuning"
                ]
            },
            {
                day: "Day 18",
                title: "Data Fetching & Caching",
                topics: [
                    "TanStack Query (React Query)",
                    "SWR Strategies",
                    "Optimistic UI Updates",
                    "Prefetching & Caching policies"
                ]
            },
            {
                day: "Day 19",
                title: "Routing (SPA)",
                topics: [
                    "React Router v6+",
                    "Nested Routes & Outlets",
                    "Loaders & Actions",
                    "Protected Routes (Auth Guards)"
                ]
            },
            {
                day: "Day 20",
                title: "Next.js Intro (SSR/SSG)",
                topics: [
                    "Server Components (RSC)",
                    "App Router Structure",
                    "Server Side Rendering vs Static Gen",
                    "API Routes in Next.js"
                ]
            },
            {
                day: "Day 21",
                title: "Testing React",
                topics: [
                    "Jest & React Testing Library",
                    "Unit Testing Components",
                    "Mocking API calls",
                    "Integration Tests"
                ]
            },
            {
                day: "Day 22",
                title: "Authentication",
                topics: [
                    "JWT vs Session Auth",
                    "Implementing Auth0 / Firebase",
                    "Role Based Access Control",
                    "Securing Routes"
                ]
            },

            // PHASE 4: AI & CAREER (Days 23-30)
            {
                day: "Day 23",
                title: "Learn with AI (LLM)",
                topics: [
                    "Prompt Engineering for React",
                    "Effective LLM Usage Strategies",
                    "Generating Unit Tests with AI",
                    "Refactoring Legacy Code with AI"
                ]
            },
            {
                day: "Day 24",
                title: "Deployment & Scale",
                topics: [
                    "Vercel/Netlify Deployment",
                    "Environment Variables",
                    "Performance Monitoring (Lighthouse)",
                    "Security Headers & Best Practices"
                ]
            },
            {
                day: "Day 25",
                title: "System Design for UI",
                topics: [
                    "Atomic Design Methodology",
                    "Building a Component Library",
                    "Storybook Integration",
                    "Documentation Standards"
                ]
            },
            {
                day: "Day 26",
                title: "Project Planning (Agile)",
                topics: [
                    "Jira/Linear Setup",
                    "Sprint Planning & Estimation",
                    "Git Branching Strategies",
                    "Code Review Etiquette"
                ]
            },
            {
                day: "Day 27",
                title: "Capstone: 5-Person Squad",
                topics: [
                    "Role Assignment (Lead, UI, Logic)",
                    "Repo Setup & CI Pipeline",
                    "Building the MVP Core",
                    "Daily Standups Simulation"
                ]
            },
            {
                day: "Day 28",
                title: "Capstone: Development",
                topics: [
                    "Feature Implementation",
                    "Integrating Backend APIs",
                    "Resolving Merge Conflicts",
                    "Pair Programming Sessions"
                ]
            },
            {
                day: "Day 29",
                title: "Capstone: Polish & QA",
                topics: [
                    "Bug Fixing Sprint",
                    "UI Polish & Animations",
                    "Cross-browser Testing",
                    "Final Code Freeze"
                ]
            },
            {
                day: "Day 30",
                title: "Demo Day & Career",
                topics: [
                    "Presenting to Stakeholders",
                    "Resume Review & Optimization",
                    "Mock Technical Interview",
                    "Job Application Strategy"
                ]
            }
        ],
        dates: [
            { id: 1, date: "Feb 15, 2026", time: "10:00 AM - 12:00 PM EST", spotsLeft: 3 },
            { id: 2, date: "Feb 22, 2026", time: "10:00 AM - 12:00 PM EST", spotsLeft: 7 }
        ],
        isComingSoon: false,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "js-ts-angular-workshop",
        title: "Enterprise Stack: JS + TS + Angular 21",
        slug: "js-ts-angular-workshop",
        price: "FREE",
        reviewCount: "620+",
        rating: 4.8,
        shortDescription: "Build scalable enterprise applications. Strict types. Signals. Performance.",
        fullDescription: "Angular is the backbone of enterprise web apps. This workshop bridges the gap between 'getting it working' and 'architecting for scale'. We cover the bleeding edge features of Angular 21 including Signals, Standalone Components, and the new control flow syntax.",
        highlights: [
            "Strict Type Safety Mastery",
            "Angular 21 Signals & SSR",
            "Enterprise Monorepo (Nx)",
            "Real-world Deployment Strategies"
        ],
        reviews: [
            { id: 1, name: "Priya Sharma", role: "Angular Dev @ TCS", avatar: "https://randomuser.me/api/portraits/women/65.jpg", rating: 5, text: "Angular 21 Signals changed everything. This workshop explained it better than the official docs. Highly recommend." },
            { id: 2, name: "James Wilson", role: "Architect @ Barclays UK", avatar: "https://randomuser.me/api/portraits/men/74.jpg", rating: 5, text: "The Nx Monorepo day was exactly what our team needed. We migrated our enterprise app thanks to this curriculum." },
            { id: 3, name: "Elena Rodriguez", role: "Frontend Eng @ Austin Tech", avatar: "https://randomuser.me/api/portraits/women/24.jpg", rating: 4, text: "Intense but worth it. The transformation from RxJS to Signals was handled beautifully." },
            { id: 4, name: "Rahul Verma", role: "Tech Lead @ HDFC", avatar: "https://randomuser.me/api/portraits/men/52.jpg", rating: 5, text: "The Strict Typing patterns for templates caught so many potential bugs in our code." },
            { id: 5, name: "Sophie Clark", role: "Senior Dev @ NHS", avatar: "https://randomuser.me/api/portraits/women/89.jpg", rating: 5, text: "Finally understood Dependency Injection at a deep level. The instructor is world-class." },
            { id: 6, name: "Kenji Tanaka", role: "Frontend Dev @ Sony", avatar: "https://randomuser.me/api/portraits/men/15.jpg", rating: 5, text: "Zone.js vs Signals performance comparison was eye-opening. Best Angular resource." },
            { id: 7, name: "Maria Garcia", role: "UI Lead @ Madrid", avatar: "https://randomuser.me/api/portraits/women/35.jpg", rating: 5, text: "I landed a Senior Angular role after the 5-person squad project. The portfolio value is huge." }
        ],
        curriculum: [
            // PHASE 1: TYPESCRIPT MASTERY (Days 1-7)
            {
                day: "Day 1",
                title: "TypeScript Foundations",
                topics: [
                    "Static vs Dynamic Typing",
                    "Type Inference & Annotations",
                    "Interfaces vs Types",
                    "Enums & Tuples"
                ]
            },
            {
                day: "Day 2",
                title: "Advanced Types",
                topics: [
                    "Union & Intersection Types",
                    "Type Narrowing & Guards",
                    "Discriminated Unions",
                    "Nullish Coalescing"
                ]
            },
            {
                day: "Day 3",
                title: "Generics Deep Dive",
                topics: [
                    "Generic Functions & Interfaces",
                    "Generic Constraints (extends)",
                    "Default Generic Types",
                    "Utility Types (Partial, Pick, Omit)"
                ]
            },
            {
                day: "Day 4",
                title: "Classes & OOP",
                topics: [
                    "Access Modifiers (public, private, protected)",
                    "Abstract Classes & Inheritance",
                    "Implements vs Extends",
                    "Static Members"
                ]
            },
            {
                day: "Day 5",
                title: "Decorators & Metadata",
                topics: [
                    "Class Decorators",
                    "Method & Property Decorators",
                    "Reflection Metadata API",
                    "Use Cases in Frameworks"
                ]
            },
            {
                day: "Day 6",
                title: "TypeScript Configuration",
                topics: [
                    "tsconfig.json Deep Dive",
                    "Strict Mode Settings",
                    "Path Mapping & Aliases",
                    "Compiling to different ES versions"
                ]
            },
            {
                day: "Day 7",
                title: "TS Design Patterns",
                topics: [
                    "Factory Pattern in TS",
                    "Singleton & Observer",
                    "Dependency Injection Principle",
                    "Adapter Pattern"
                ]
            },

            // PHASE 2: ANGULAR CORE & SIGNALS (Days 8-15)
            {
                day: "Day 8",
                title: "Angular Architecture",
                topics: [
                    "Modules vs Standalone Components",
                    "Bootstrapping an Application",
                    "Angular CLI Power Tools",
                    "Project Folder Structure Best Practices"
                ]
            },
            {
                day: "Day 9",
                title: "Components & Templating",
                topics: [
                    "Component Lifecycle Hooks",
                    "Data Binding (Interpolation, Property, Event)",
                    "Two-way Binding ([ngModel])",
                    "ViewEncapsulation (Emulated vs ShadowDom)"
                ]
            },
            {
                day: "Day 10",
                title: "Directives & Pipes",
                topics: [
                    "Built-in Directives (@if, @for)",
                    "Attribute vs Structural Directives",
                    "Creating Custom Directives",
                    "Pure vs Impure Pipes"
                ]
            },
            {
                day: "Day 11",
                title: "Dependency Injection",
                topics: [
                    "Hierarchical Injectors",
                    "Resolution Modifiers (@Optional, @Self)",
                    "Provider Scopes (root vs platform)",
                    "Injection Tokens"
                ]
            },
            {
                day: "Day 12",
                title: "Signals Revolution",
                topics: [
                    "Writable Signals",
                    "Computed Signals",
                    "Effects & Cleanup",
                    "Signals vs Zone.js Change Detection"
                ]
            },
            {
                day: "Day 13",
                title: "Component Communication",
                topics: [
                    "Input() & Output() Signals",
                    "ViewChild & ContentChild",
                    "Service-based Communication",
                    "Event Bus Pattern"
                ]
            },
            {
                day: "Day 14",
                title: "Navigation & Routing",
                topics: [
                    "Router Configuration",
                    "Lazy Loading Modules/Components",
                    "Route Guards (CanActivateFn)",
                    "Route Parameters & Resolvers"
                ]
            },
            {
                day: "Day 15",
                title: "Forms Management",
                topics: [
                    "Template-driven Forms",
                    "Reactive Forms in-depth",
                    "Typed Forms",
                    "Custom Form Validators"
                ]
            },

            // PHASE 3: STATE & ENTERPRISE PATTERNS (Days 16-30)
            {
                day: "Day 16",
                title: "RxJS Fundamentals",
                topics: [
                    "Observables vs Promises",
                    "Subjects vs BehaviorSubjects",
                    "Creation Operators (of, from, interval)",
                    "Subscription Management"
                ]
            },
            {
                day: "Day 17",
                title: "RxJS Transformation",
                topics: [
                    "Map vs MergeMap vs SwitchMap",
                    "DebounceTime & DistinctUntilChanged",
                    "CatchError & Retry Strategies",
                    "ForkJoin & CombineLatest"
                ]
            },
            {
                day: "Day 18",
                title: "HTTP Client & Interceptors",
                topics: [
                    "Making Typed HTTP Requests",
                    "Functional Interceptors",
                    "Error Handling Globally",
                    "Caching Requests"
                ]
            },
            {
                day: "Day 19",
                title: "NgRx State Management",
                topics: [
                    "Redux Pattern in Angular",
                    "Actions, Reducers, Selectors",
                    "Effects for Side Effects",
                    "Feature State Slices"
                ]
            },
            {
                day: "Day 20",
                title: "NgRx Signal Store",
                topics: [
                    "Lightweight State Management",
                    "Defining State, Computed, Methods",
                    "Custom Store Features",
                    "Connecting to RxJS"
                ]
            },
            {
                day: "Day 21",
                title: "Unit Testing",
                topics: [
                    "Jasmine & Karma/Jest",
                    "TestBed Configuration",
                    "Testing Components & Services",
                    "Mocking Dependencies"
                ]
            },
            {
                day: "Day 22",
                title: "E2E Testing",
                topics: [
                    "Cypress/Playwright Integration",
                    "Writing Robust E2E Specs",
                    "Intercepting Network Requests",
                    "CI Pipeline Integration"
                ]
            },
            {
                day: "Day 23",
                title: "PWA & Service Workers",
                topics: [
                    "Angular PWA Schematic",
                    "Service Worker Configuration",
                    "Offline Caching Strategies",
                    "App Shell Model"
                ]
            },
            {
                day: "Day 24",
                title: "Angular Universal (SSR)",
                topics: [
                    "Server-Side Rendering Basics",
                    "Hydration Concepts",
                    "TransferState API",
                    "SEO Optimization"
                ]
            },
            {
                day: "Day 25",
                title: "Security Best Practices",
                topics: [
                    "XSS Prevention (Sanitization)",
                    "CSRF Protection",
                    "Route Guards for Auth",
                    "CSP Headers"
                ]
            },
            {
                day: "Day 26",
                title: "Clean Architecture",
                topics: [
                    "Smart vs Dumb Components",
                    "Facade Pattern",
                    "Nx Monorepo Basics",
                    "Shared Libraries"
                ]
            },
            {
                day: "Day 27",
                title: "Performance Tuning",
                topics: [
                    "Change Detection Strategies",
                    "Bundle Analysis",
                    "Deferrable Views (@defer)",
                    "Image Optimization"
                ]
            },
            {
                day: "Day 28",
                title: "Animation & UX",
                topics: [
                    "Angular Animations API",
                    "Complex Transitions",
                    "List Animations",
                    "Material Design Principles"
                ]
            },
            {
                day: "Day 29",
                title: "AI-Assisted Angular",
                topics: [
                    "Prompting for Angular Templates",
                    "Generating Unit Tests with GenAI",
                    "Refactoring RxJS with AI",
                    "Building AI-powered Components"
                ]
            },
            {
                day: "Day 30",
                title: "Capstone: 5-Person Squad",
                topics: [
                    "Agile Role Assignment (Lead, Dev, QA)",
                    "Building an Enterprise Dashboard",
                    "Merge Conflict Simulations",
                    "Final Demo Day Presentation"
                ]
            }
        ],
        dates: [],
        isComingSoon: true,
        image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "js-node-mongo-workshop",
        title: "Full Stack: JS + Node.js + MongoDB",
        slug: "js-node-mongo-workshop",
        price: "FREE",
        reviewCount: "750+",
        rating: 4.9,
        shortDescription: "Own the backend. High performance APIs, schema design, and security.",
        fullDescription: "Move beyond the frontend. This workshop empowers you to build robust, scalable backends. We focus on Node.js internals, advanced MongoDB patterns, and securing your APIs against common threats.",
        highlights: [
            "Event Loop Deep Dive",
            "Microservices Architecture",
            "Advanced Aggregations",
            "Scalable Microservices Intro"
        ],
        reviews: [
            { id: 1, name: "Arjun Singh", role: "Backend Lead @ Swiggy", avatar: "https://randomuser.me/api/portraits/men/88.jpg", rating: 5, text: "I thought I knew Node.js until I took this. The Event Loop internals day blew my mind. Essential for seniors." },
            { id: 2, name: "Oliver Smith", role: "DevOps @ BBC", avatar: "https://randomuser.me/api/portraits/men/29.jpg", rating: 5, text: "The transition from Monolith to Microservices was explained so clearly. The Deployment module is top notch." },
            { id: 3, name: "Jenny Kim", role: "Full Stack @ SF Valley", avatar: "https://randomuser.me/api/portraits/women/63.jpg", rating: 5, text: "MongoDB Aggregations are powerful. I optimized our company's queries by 50% after Day 18." },
            { id: 4, name: "Mohammed Ali", role: "Senior Dev @ Careem", avatar: "https://randomuser.me/api/portraits/men/44.jpg", rating: 5, text: "Scaling via clustering and worker threads was the missing piece in my knowledge. Thanks!" },
            { id: 5, name: "Lucas Silva", role: "Backend Eng @ Brazil FinTech", avatar: "https://randomuser.me/api/portraits/men/31.jpg", rating: 5, text: "The Redis caching strategies allowed our app to handle Black Friday traffic easily." },
            { id: 6, name: "Wei Zhang", role: "Architect @ Tencent", avatar: "https://randomuser.me/api/portraits/women/12.jpg", rating: 5, text: "Very deep dive into streams and buffers. Not for beginners, but gold for performance engineers." },
            { id: 7, name: "Chloe Martin", role: "Node Dev @ Paris Tech", avatar: "https://randomuser.me/api/portraits/women/55.jpg", rating: 4, text: "Intense workload but the 5-person squad project was super realistic." }
        ],
        curriculum: [
            // PHASE 1: NODE.JS INTERNALS & CORE (Days 1-7)
            {
                day: "Day 1",
                title: "Node.js Architecture",
                topics: [
                    "V8 Engine & Libuv",
                    "The Event Loop (Phases detailed)",
                    "Blocking vs Non-Blocking I/O",
                    "The Global Object & Modules"
                ]
            },
            {
                day: "Day 2",
                title: "Module Systems",
                topics: [
                    "CommonJS (require/module.exports)",
                    "ES Modules (import/export)",
                    "Circular Dependencies",
                    "Creating npm Packages"
                ]
            },
            {
                day: "Day 3",
                title: "File System & Path",
                topics: [
                    "Reading/Writing Files Asynchronously",
                    "Streams vs Buffers",
                    "Path Normalization",
                    "File Watching"
                ]
            },
            {
                day: "Day 4",
                title: "Events & Streams",
                topics: [
                    "EventEmitter Implementation",
                    "Readable, Writable, Transform Streams",
                    "Backpressure Handling",
                    "Piping Streams"
                ]
            },
            {
                day: "Day 5",
                title: "Networking Basics",
                topics: [
                    "TCP/IP vs UDP",
                    "Building a raw HTTP Server",
                    "DNS Lookup in Node",
                    "OS Module & System Info"
                ]
            },
            {
                day: "Day 6",
                title: "Multithreading & Processes",
                topics: [
                    "Child Processes (spawn, exec, fork)",
                    "Worker Threads API",
                    "Cluster Module",
                    "Process Management (PM2)"
                ]
            },
            {
                day: "Day 7",
                title: "Debugging & Tooling",
                topics: [
                    "Node Inspector & Chrome DevTools",
                    "Performance Hooks",
                    "Memory Leaks & Heap Dumps",
                    "Nodemon & Development Workflow"
                ]
            },

            // PHASE 2: API DEVELOPMENT (Days 8-14)
            {
                day: "Day 8",
                title: "Express Framework",
                topics: [
                    "Routing Pattern Matchers",
                    "Middleware Architecture",
                    "Request/Response Objects",
                    "Template Engines (EJS/Pug)"
                ]
            },
            {
                day: "Day 9",
                title: "REST API Design",
                topics: [
                    "Richardson Maturity Model",
                    "HTTP Verbs & Status Codes",
                    "Resource Naming Conventions",
                    "Content Negotiation"
                ]
            },
            {
                day: "Day 10",
                title: "Authentication",
                topics: [
                    "Session vs Token-based Auth",
                    "JWT Implementation",
                    "Password Hashing (Bcrypt/Argon2)",
                    "Implementing Refresh Tokens"
                ]
            },
            {
                day: "Day 11",
                title: "Authorization",
                topics: [
                    "Role Based Access Control (RBAC)",
                    "Attribute Based Access Control",
                    "Middleware Guards",
                    "OAuth 2.0 & Passport.js"
                ]
            },
            {
                day: "Day 12",
                title: "Input Validation",
                topics: [
                    "Joi / Zod Validation Schemas",
                    "Sanitizing User Input",
                    "Custom Validators",
                    "Error Handling Middleware"
                ]
            },
            {
                day: "Day 13",
                title: "GraphQL APIs",
                topics: [
                    "GraphQL vs REST",
                    "Schemas Types & Resolvers",
                    "Apollo Server Setup",
                    "Querying & Mutations"
                ]
            },
            {
                day: "Day 14",
                title: "Real-time Communication",
                topics: [
                    "WebSockets Protocol",
                    "Socket.io Library",
                    "Broadcasting & Rooms",
                    "Handling Disconnections"
                ]
            },

            // PHASE 3: DATABASE MASTERY (Days 15-22)
            {
                day: "Day 15",
                title: "MongoDB Basics",
                topics: [
                    "NoSQL vs SQL Concepts",
                    "Documents & Collections",
                    "CRUD Operations",
                    "BSON Data Types"
                ]
            },
            {
                day: "Day 16",
                title: "Mongoose ODM",
                topics: [
                    "Schema Definitions",
                    "Models & Instance Methods",
                    "Validation & Hooks (Middleware)",
                    "Virtual Functions"
                ]
            },
            {
                day: "Day 17",
                title: "Advanced MongoDB",
                topics: [
                    "Indexing Strategies",
                    "Compound & Text Indexes",
                    "Aggregation Framework",
                    "MapReduce (Legacy vs Modern)"
                ]
            },
            {
                day: "Day 18",
                title: "Relationships (NoSQL)",
                topics: [
                    "Embedding vs Referencing",
                    "Population (Mongoose)",
                    "$lookup Aggregation Stage",
                    "Tree Structures in Mongo"
                ]
            },
            {
                day: "Day 19",
                title: "Caching with Redis",
                topics: [
                    "Redis Data Structures",
                    "In-memory Caching Strategies",
                    "Rate Limiting with Redis",
                    "Pub/Sub with Redis"
                ]
            },
            {
                day: "Day 20",
                title: "SQL Integration",
                topics: [
                    "PostgreSQL Connection (pg)",
                    "Sequelize or Prisma ORM",
                    "Migrations & Seeds",
                    "Complex Joins"
                ]
            },
            {
                day: "Day 21",
                title: "Testing Node Apps",
                topics: [
                    "Jest Setup for Node",
                    "Supertest for API Testing",
                    "Mocking Database Calls",
                    "Integration vs Unit Tests"
                ]
            },

            // PHASE 4: DEVOPS & SCALE (Days 22-30)
            {
                day: "Day 22",
                title: "Dockerizing Node",
                topics: [
                    "Dockerfile Best Practices",
                    "Docker Compose for Dev",
                    "Multi-stage Builds",
                    "Network & Volumes"
                ]
            },
            {
                day: "Day 23",
                title: "CI/CD Pipelines",
                topics: [
                    "GitHub Actions Workflow",
                    "Automated Testing Pipeline",
                    "Linting & Formatting Checks",
                    "Semantic Versioning"
                ]
            },
            {
                day: "Day 24",
                title: "Security Hardening",
                topics: [
                    "Helmet.js Headers",
                    "CORS Configuration",
                    "Rate Limiting & Throttling",
                    "Preventing Injection Attacks"
                ]
            },
            {
                day: "Day 25",
                title: "Microservices Intro",
                topics: [
                    "Monolith vs Microservices",
                    "API Gateway Pattern",
                    "Message Queues (RabbitMQ/Kafka)",
                    "Service Discovery"
                ]
            },
            {
                day: "Day 26",
                title: "Serverless Node",
                topics: [
                    "AWS Lambda Functions",
                    "Serverless Framework",
                    "Cold Starts",
                    "Event Triggers (S3, API Gateway)"
                ]
            },
            {
                day: "Day 27",
                title: "Performance Optimization",
                topics: [
                    "Profiling Node Apps",
                    "Memory Leak Detection",
                    "Optimizing SQL/Mongo Queries",
                    "Compression (Gzip/Brotli)"
                ]
            },
            {
                day: "Day 28",
                title: "Logging & Monitoring",
                topics: [
                    "Structured Logging (Winston/Pino)",
                    "Error Tracking (Sentry)",
                    "APM Tools (New Relic/Datadog)",
                    "Health Checks"
                ]
            },
            {
                day: "Day 29",
                title: "AI & System Design",
                topics: [
                    "Designing AI-Native Architectures",
                    "LLM Integration Patterns",
                    "Load Balancing Strategies",
                    "Database Sharding at Scale"
                ]
            },
            {
                day: "Day 30",
                title: "Capstone: 5-Person Squad",
                topics: [
                    "Building a Real-time Collab Tool",
                    "Microservices Deployment by Squad",
                    "Handling Distributed Transactions",
                    "Simulated Production Incident"
                ]
            }
        ],
        dates: [],
        isComingSoon: true,
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2574&auto=format&fit=crop"
    },
    {
        id: "js-playwright-workshop",
        title: "Automation Architect: JS + Playwright",
        slug: "js-playwright-workshop",
        price: "FREE",
        reviewCount: "430+",
        rating: 4.9,
        shortDescription: "Build next-gen test automation frameworks. Speed, reliability, and full CI/CD integration.",
        fullDescription: "Forget flaky Selenium scripts. Playwright is the future of web automation. This workshop transforms manual testers and QA engineers into true Automation Architects. We cover everything from the Playwright internals to building a scalable, enterprise-grade framework with reporting, API testing, and GitHub Actions integration.",
        highlights: [
            "Modern End-to-End Testing",
            "API Testing & Mocking",
            "Visual Regression Testing",
            "CI/CD Implementation"
        ],
        reviews: [
            { id: 1, name: "Vikram Malhotra", role: "SDET II @ Flipkart", avatar: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5, text: "Moving from Selenium to Playwright was seamless with this guide. The CI/CD integration day is a lifesaver." },
            { id: 2, name: "Emily Brown", role: "QA Lead @ Lloyds Bank", avatar: "https://randomuser.me/api/portraits/women/65.jpg", rating: 5, text: "Visual Regression testing with AI is the future. This workshop is ahead of the curve." },
            { id: 3, name: "David Lee", role: "Automation Eng @ Google", avatar: "https://randomuser.me/api/portraits/men/12.jpg", rating: 5, text: "Solid curriculum. The robust handling of flaky tests with auto-retries was explained perfectly." },
            { id: 4, name: "Pooja Reddy", role: "QA Manager @ Myntra", avatar: "https://randomuser.me/api/portraits/women/45.jpg", rating: 5, text: "The reporting dashboard we built in the capstone is now used by my entire org." },
            { id: 5, name: "Mark Stevens", role: "Tester @ AT&T", avatar: "https://randomuser.me/api/portraits/men/76.jpg", rating: 4, text: "Great content on API mocking. I finally understand how to isolate frontend tests." },
            { id: 6, name: "Sarah Connor", role: "SDET @ Cyberdyne", avatar: "https://randomuser.me/api/portraits/women/22.jpg", rating: 5, text: "The 'Self-healing locators with AI' concept is revolutionary. My maintenance time dropped 80%." },
            { id: 7, name: "Ahmed Khan", role: "QA Lead @ Dubai Tech", avatar: "https://randomuser.me/api/portraits/men/41.jpg", rating: 5, text: "Best resource for Playwright. Clear, concise, and focused on enterprise problems." }
        ],
        curriculum: [
            // PHASE 1: JAVASCRIPT FOR SDET (Days 1-7)
            {
                day: "Day 1",
                title: "Modern JS for Automation",
                topics: [
                    "Let/Const & Scope",
                    "Arrow Functions & callbacks",
                    "Destructuring Objects/Arrays",
                    "Template Literals"
                ]
            },
            {
                day: "Day 2",
                title: "Async Patterns in Testing",
                topics: [
                    "Promises Deep Dive",
                    "Async/Await Mastery",
                    "Handling Race Conditions",
                    "Error Handling (try/catch)"
                ]
            },
            {
                day: "Day 3",
                title: "Data Handling",
                topics: [
                    "Arrays Methods (map/filter/reduce)",
                    "Object Manipulation",
                    "JSON parsing/stringifying",
                    "Reading Data from Files"
                ]
            },
            {
                day: "Day 4",
                title: "Modules & Tooling",
                topics: [
                    "ES Modules vs CommonJS",
                    "NPM & Package.json",
                    "Prettier & ESLint for QA",
                    "TypeScript Basics for Playwright"
                ]
            },
            {
                day: "Day 5",
                title: "DOM Structure",
                topics: [
                    "Understanding DOM Tree",
                    "Shadow DOM concepts",
                    "CSS Selectors Mastery",
                    "XPath Strategies"
                ]
            },
            {
                day: "Day 6",
                title: "Test Architecture",
                topics: [
                    "Page Object Model (POM) Theory",
                    "AAA Pattern (Arrange-Act-Assert)",
                    "Clean Code Principles",
                    "DRY in Tests"
                ]
            },
            {
                day: "Day 7",
                title: "Environment Setup",
                topics: [
                    "VS Code Configuration",
                    "Installing Playwright",
                    "Browsers & Drivers internals",
                    "Running first script"
                ]
            },

            // PHASE 2: PLAYWRIGHT CORE (Days 8-15)
            {
                day: "Day 8",
                title: "Core Concepts",
                topics: [
                    "Browser vs Context vs Page",
                    "Auto-waiting Mechanism",
                    "Strict Mode Selectors",
                    "Trace Viewer"
                ]
            },
            {
                day: "Day 9",
                title: "Locators Strategy",
                topics: [
                    "getByRole & getByText",
                    "Filtering Locators",
                    "Chaining Locators",
                    "Best Practices"
                ]
            },
            {
                day: "Day 10",
                title: "Actions & Assertion",
                topics: [
                    "Click, Fill, Check interaction",
                    "Drag and Drop",
                    "Web-first Assertions (expect)",
                    "Soft Assertions"
                ]
            },
            {
                day: "Day 11",
                title: "Handling Inputs",
                topics: [
                    "Dropdowns (Select/Multi)",
                    "Iframes & Nested Frames",
                    "Alerts & Dialogs",
                    "File Uploads/Downloads"
                ]
            },
            {
                day: "Day 12",
                title: "Codegen & Recording",
                topics: [
                    "Using Code Generator",
                    "Preserving Auth State",
                    "Refactoring Recorded Code",
                    "Debugging Tools"
                ]
            },
            {
                day: "Day 13",
                title: "Authentication",
                topics: [
                    "Login Patterns",
                    "Storage State (Cookies/Local)",
                    "Bypassing 2FA logic",
                    "Session Reuse"
                ]
            },
            {
                day: "Day 14",
                title: "API Testing Intro",
                topics: [
                    "API Request Context",
                    "GET/POST/PUT/DELETE",
                    "Validating JSON Responses",
                    "Hybrid Testing (UI + API)"
                ]
            },
            {
                day: "Day 15",
                title: "Mocking & Routing",
                topics: [
                    "Network Interception",
                    "Mocking API Responses",
                    "Modifying Requests",
                    "Testing Offline Mode"
                ]
            },

            // PHASE 3: ADVANCED FRAMEWORK (Days 16-22)
            {
                day: "Day 16",
                title: "Framework Structure",
                topics: [
                    "Implementing POM",
                    "Base Test Class",
                    "Fixtures Mastery",
                    "Global Setup/Teardown"
                ]
            },
            {
                day: "Day 17",
                title: "Configuration",
                topics: [
                    "playwright.config.ts",
                    "Projects & Browsers",
                    "Base URL & Timeouts",
                    "Parallel Execution"
                ]
            },
            {
                day: "Day 18",
                title: "Data Driven Testing",
                topics: [
                    "Reading from CSV/JSON",
                    "Parameterized Tests",
                    "Dynamic Test Generation",
                    "Env Variables (.env)"
                ]
            },
            {
                day: "Day 19",
                title: "Reporting",
                topics: [
                    "Built-in Reporters (HTML, List)",
                    "Allure Report Integration",
                    "Attaching Screenshots/Videos",
                    "Custom Reporters"
                ]
            },
            {
                day: "Day 20",
                title: "Visual Testing",
                topics: [
                    "Snapshot Testing",
                    "Visual Comparisons",
                    "Handling Dynamic Content",
                    "Masking Elements"
                ]
            },
            {
                day: "Day 21",
                title: "Tagging & Annotation",
                topics: [
                    "Skipping/Failing Tests",
                    "Organizing with Tags (@smoke)",
                    "Fixme & Slow annotations",
                    "Conditional Execution"
                ]
            },
            {
                day: "Day 22",
                title: "Parallelism & Sharding",
                topics: [
                    "Worker Processes",
                    "Fully Parallel Mode",
                    "Shard Tests across machines",
                    "Optimizing Execution Time"
                ]
            },

            // PHASE 4: CI/CD & BEYOND (Days 23-30)
            {
                day: "Day 23",
                title: "GitHub Actions",
                topics: [
                    "Workflow YAML Syntax",
                    "Running Tests on Push/PR",
                    "Publishing Reports",
                    "Handling Secrets"
                ]
            },
            {
                day: "Day 24",
                title: "Docker Integration",
                topics: [
                    "Playwright Docker Image",
                    "Running Tests in Container",
                    "Docker Compose",
                    "Consistent Environments"
                ]
            },
            {
                day: "Day 25",
                title: "Cross-Browser Testing",
                topics: [
                    "Testing on Mobile Viewports",
                    "Device Emulation",
                    "Safar (WebKit) Specifics",
                    "Firefox Quirks"
                ]
            },
            {
                day: "Day 26",
                title: "Accessibility Testing",
                topics: [
                    "Axe-core Integration",
                    "Scanning for A11y Issues",
                    "WCAG Compliance Checks",
                    "Automated Audit Reports"
                ]
            },
            {
                day: "Day 27",
                title: "Performance Testing",
                topics: [
                    "Lighthouse Integration",
                    "Network Waterfall Analysis",
                    "Basic Load Testing",
                    "Measuring Core Vitals"
                ]
            },
            {
                day: "Day 28",
                title: "Debugging Masterclass",
                topics: [
                    "Advanced Trace Analysis",
                    "Console Logs in CI",
                    "Remote Debugging",
                    "Flaky Test Resolution"
                ]
            },
            {
                day: "Day 29",
                title: "AI for QA Engineers",
                topics: [
                    "Generating Test Cases from User Stories",
                    "Self-healing Locators with AI",
                    "Automated Visual Analysis",
                    "Refactoring Flaky Tests with LLMs"
                ]
            },
            {
                day: "Day 30",
                title: "Capstone: 5-Person Squad",
                topics: [
                    "Building a Framework from Scratch",
                    "CI/CD Pipeline Integration",
                    "Parallel Execution Strategy",
                    "Final Automation Strategy Presentation"
                ]
            }
        ],
        dates: [
            { id: 1, date: "Mar 10, 2026", time: "09:00 AM - 11:00 AM EST", spotsLeft: 8 }
        ],
        isComingSoon: false,
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "js-react-nextjs-workshop",
        title: "Full Stack Architecture: JS + React + Next.js 15",
        slug: "js-react-nextjs-workshop",
        price: "FREE",
        reviewCount: "150+",
        rating: 5.0,
        shortDescription: "Master the App Router. Server Components (RSC), Server Actions, Prisma, and Vercel AI SDK.",
        fullDescription: "The definitive guide to shipping modern full-stack applications. We go beyond the docs to build production-ready systems using the Next.js App Router. You will master Server Components, stream generative AI responses, manage database transactions with Prisma, and secure your app with Auth.js.",
        highlights: [
            "Next.js 15 App Router Mastery",
            "Server Actions & RSC",
            "Database Modeling (Prisma)",
            "AI Integration (Vercel SDK)"
        ],
        reviews: [
            { id: 1, name: "Sneha Gupta", role: "Product Eng @ Zomato", avatar: "https://randomuser.me/api/portraits/women/42.jpg", rating: 5, text: "Server Components finally make sense. Building the AI SaaS capstone gave me confidence to launch my own startup." },
            { id: 2, name: "George Thompson", role: "Founder @ UK Agency", avatar: "https://randomuser.me/api/portraits/men/22.jpg", rating: 5, text: "Next.js 15 is tricky, but this course simplifies Server Actions beautifully. Best investment for our team." },
            { id: 3, name: "Michael Chen", role: "Senior Dev @ Vercel Community", avatar: "https://randomuser.me/api/portraits/men/54.jpg", rating: 5, text: "The Vercel AI SDK deep dive is unique. You won't find this material anywhere else." },
            { id: 4, name: "Emma Wilson", role: "Frontend Lead @ Shopify", avatar: "https://randomuser.me/api/portraits/women/33.jpg", rating: 5, text: "The migration guide from Pages to App Router was a lifesaver. Saved us weeks of refactoring." },
            { id: 5, name: "Rajesh Kumar", role: "Tech Lead @ Ola", avatar: "https://randomuser.me/api/portraits/men/67.jpg", rating: 4, text: "Intense pace. The prisma database modeling day is a must-watch for frontend devs." },
            { id: 6, name: "Sofia Rodriguez", role: "Full Stack @ Brazil Tech", avatar: "https://randomuser.me/api/portraits/women/91.jpg", rating: 5, text: "Generative UI is the future. I built a chatbot that renders React components thanks to Day 23." },
            { id: 7, name: "David Kim", role: "Software Eng @ Samsung", avatar: "https://randomuser.me/api/portraits/men/18.jpg", rating: 5, text: "Top tier production patterns. The caching strategy section alone is worth the time." }
        ],
        curriculum: [
            // PHASE 1: REACT FOUNDATIONS REVISITED (Days 1-7)
            {
                day: "Day 1",
                title: "React Ecosystem 2026",
                topics: [
                    "Vite vs Next.js comparison",
                    "React 19 Features (use, Actions)",
                    "Thinking in Server Components",
                    "Project Setup & directory structure"
                ]
            },
            {
                day: "Day 2",
                title: "Advanced Hooks Pattern",
                topics: [
                    "Custom Hooks for Data Fetching",
                    "useOptimistic & useFormStatus",
                    "useTransition for UX",
                    "Composition Patterns"
                ]
            },
            {
                day: "Day 3",
                title: "State Management Strategies",
                topics: [
                    "Zustand for Client State",
                    "URL State with Nuqs",
                    "Server State (React Query)",
                    "Context API Performance"
                ]
            },
            {
                day: "Day 4",
                title: "Styling at Scale",
                topics: [
                    "Tailwind CSS v4 Features",
                    "Shadcn/UI Architecture",
                    "CSS Modules vs Utility classes",
                    "Dark Mode Implementation"
                ]
            },
            {
                day: "Day 5",
                title: "TypeScript for React",
                topics: [
                    "Typing Props & State",
                    "Generic Components",
                    "Polymorphic Components",
                    "Zod Schema Validation"
                ]
            },
            {
                day: "Day 6",
                title: "Performance Metrics",
                topics: [
                    "Core Web Vitals (LCP, CLS, FID)",
                    "React Profiler",
                    "Bundle Analysis",
                    "Code Splitting Strategies"
                ]
            },
            {
                day: "Day 7",
                title: "Testing Fundamentals",
                topics: [
                    "Vitest Configuration",
                    "Testing Hooks",
                    "Component Testing",
                    "Mocking Modules"
                ]
            },

            // PHASE 2: NEXT.JS APP ROUTER CORE (Days 8-15)
            {
                day: "Day 8",
                title: "Routing & Layouts",
                topics: [
                    "File-system Routing",
                    "Nested Layouts & Templates",
                    "Route Groups & Private Folders",
                    "Dynamic Routes [slug]"
                ]
            },
            {
                day: "Day 9",
                title: "Server Components Deep Dive",
                topics: [
                    "RSC vs Client Components",
                    "The 'use client' Directive",
                    "Importing Server code in Client",
                    "Serialization Boundaries"
                ]
            },
            {
                day: "Day 10",
                title: "Data Fetching",
                topics: [
                    "Fetch API in RSC",
                    "Caching & Revalidation",
                    "Parallel Data Fetching",
                    "Sequential Fetching (Waterfalls)"
                ]
            },
            {
                day: "Day 11",
                title: "Server Actions",
                topics: [
                    "Form Handling without API Routes",
                    "Mutations & Revalidating Path",
                    "Progressive Enhancement",
                    "Error Handling in Actions"
                ]
            },
            {
                day: "Day 12",
                title: "Streaming & Suspense",
                topics: [
                    "Loading UI (loading.js)",
                    "Streaming HTML",
                    "Suspense Boundaries",
                    "Skeleton Screens"
                ]
            },
            {
                day: "Day 13",
                title: "Navigation Patterns",
                topics: [
                    "Link Component",
                    "useRouter & usePathname",
                    "Programmatic Navigation",
                    "Scroll Restoration"
                ]
            },
            {
                day: "Day 14",
                title: "Metadata & SEO",
                topics: [
                    "Dynamic Metadata API",
                    "Open Graph Images (ImageResponse)",
                    "Sitemap & Robots.txt",
                    "Structured Data (JSON-LD)"
                ]
            },
            {
                day: "Day 15",
                title: "Middleware",
                topics: [
                    "Request Interception",
                    "Redirects & Rewrites",
                    "Cookie Management",
                    "Geolocation Routing"
                ]
            },

            // PHASE 3: FULL STACK FEATURES (Days 16-22)
            {
                day: "Day 16",
                title: "Database Setup",
                topics: [
                    "PostgreSQL (Neon/Supabase)",
                    "Prisma ORM Setup",
                    "Schema Modeling",
                    "Migrations Workflow"
                ]
            },
            {
                day: "Day 17",
                title: "Auth.js (NextAuth)",
                topics: [
                    "OAuth Providers (GitHub/Google)",
                    "Credentials Provider",
                    "Session Management",
                    "Protecting Routes & Actions"
                ]
            },
            {
                day: "Day 18",
                title: "Data Mutations",
                topics: [
                    "Optimistic UI Updates",
                    "Transactions in Prisma",
                    "Deleting & Updating Records",
                    "Soft Deletes"
                ]
            },
            {
                day: "Day 19",
                title: "File Uploads",
                topics: [
                    "UploadThing / AWS S3",
                    "Server-side Validation",
                    "Image Optimization",
                    "Processing Uploads"
                ]
            },
            {
                day: "Day 20",
                title: "Email & Communication",
                topics: [
                    "Resend / React Email",
                    "Transactional Emails",
                    "Background Jobs (Inngest)",
                    "Webhooks Handling"
                ]
            },
            {
                day: "Day 21",
                title: "Caching Strategies",
                topics: [
                    "Request Memoization",
                    "Data Cache",
                    "Full Route Cache",
                    "On-demand Revalidation Tags"
                ]
            },
            {
                day: "Day 22",
                title: "Advanced Patterns",
                topics: [
                    "Parallel Routes (@slot)",
                    "Intercepting Routes (.)",
                    "Internationalization (i18n)",
                    "Multi-tenancy Architecture"
                ]
            },

            // PHASE 4: AI & PRODUCTION (Days 23-30)
            {
                day: "Day 23",
                title: "Vercel AI SDK",
                topics: [
                    "Streaming Text Responses",
                    "Generative UI (RSC)",
                    "useChat & useCompletion",
                    "Tool Calling (Function Calling)"
                ]
            },
            {
                day: "Day 24",
                title: "Vector Databases",
                topics: [
                    "Embeddings Concepts",
                    "Pinecone / pgvector",
                    "RAG (Retrieval Augmented Gen)",
                    "Semantic Search"
                ]
            },
            {
                day: "Day 25",
                title: "Monitoring & Logging",
                topics: [
                    "Vercel Analytics",
                    "Sentry Integration",
                    "OpenTelemetry Tracing",
                    "Error Boundaries"
                ]
            },
            {
                day: "Day 26",
                title: "Security Hardening",
                topics: [
                    "CSP Headers",
                    "Rate Limiting (Upstash)",
                    "Input Sanitization",
                    "Secret Management"
                ]
            },
            {
                day: "Day 27",
                title: "Turborepo & Monorepos",
                topics: [
                    "Workspace Configuration",
                    "Sharing UI Packages",
                    "Remote Caching",
                    "Micro-frontends concept"
                ]
            },
            {
                day: "Day 28",
                title: "Accessibility & A11y",
                topics: [
                    "Role & Aria Attributes",
                    "Keyboard Navigation",
                    "Screen Reader Testing",
                    "Radix UI Primitives"
                ]
            },
            {
                day: "Day 29",
                title: "AI-Native Development",
                topics: [
                    "Building Generative UI with React",
                    "Prompt Engineering for RSC",
                    "Vector Embeddings with Databases",
                    "Streaming AI Responses"
                ]
            },
            {
                day: "Day 30",
                title: "Capstone: 5-Person Squad",
                topics: [
                    "Building an AI SaaS Platform",
                    "Stripe Subscription Integration",
                    "Agile Squad Workflow (Jira/Linear)",
                    "Launch & Marketing Strategy"
                ]
            }
        ],
        dates: [
            { id: 1, date: "Mar 15, 2026", time: "10:00 AM - 12:00 PM EST", spotsLeft: 5 }
        ],
        isComingSoon: false,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop"
    }
];

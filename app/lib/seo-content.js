export const SKILL_CONTENT = {
    javascript: {
        description: "Master JavaScript (ES6+), scopes, closures, asynchronous programming, promises, event loop execution, and DOM manipulation to write high-performance client-side code.",
        modules: [
            { title: "JS Scope & Closures", desc: "Understand execution contexts, variable hoisting, lexical scope, closures, and memory management in modern engines." },
            { title: "Asynchronous JS & Events", desc: "Master callbacks, Promises, Async/Await syntax, the event loop, macro-tasks, micro-tasks, and event delegation." },
            { title: "Functional & OOP Patterns", desc: "Learn prototypal inheritance, ES6 classes, functional programming principles, array methods, and design patterns." }
        ],
        faq: {
            question: "What is the event loop in JavaScript?",
            answer: "The event loop is a mechanism that allows JavaScript to perform non-blocking, asynchronous operations. Since JS is single-threaded, it delegates heavy tasks (like I/O, fetching, timers) to the browser APIs or libuv. When those tasks finish, their callbacks are placed in the callback queue (or microtask queue for promises). The event loop constantly monitors the call stack; when the stack is empty, it pushes the next callback in the queue onto the stack for execution."
        }
    },
    typescript: {
        description: "Scale your JavaScript applications with robust typing, custom interfaces, advanced generics, strict type safety checks, and seamless tsconfig configuration.",
        modules: [
            { title: "Type System & Interfaces", desc: "Learn structural typing, interfaces vs type aliases, union & intersection types, and strict null checking." },
            { title: "Generics & Advanced Types", desc: "Master generic functions/classes, keyof, mapped types, conditional types, and utility types." },
            { title: "TS Compiler & Tooling", desc: "Optimize your tsconfig.json configurations, build pipelines, declaration files, and eslint integrations." }
        ],
        faq: {
            question: "What is the difference between an Interface and a Type Alias in TypeScript?",
            answer: "While interfaces and type aliases are very similar, key differences exist: 1) Interfaces are always open for extension, meaning you can redeclare them multiple times to merge declarations (declaration merging), whereas type aliases cannot be changed once created. 2) Type aliases can describe primitives, unions, and tuples, which interfaces cannot. 3) Interfaces are preferred for declaring object structures, as they compile to cleaner error messages and support standard class implementation (implements)."
        }
    },
    react: {
        description: "Build robust, modern web interfaces using React's declarative component architecture, hooks, virtual DOM reconciler, and state management solutions.",
        modules: [
            { title: "Hooks & Custom State Hooks", desc: "Understand useState, useEffect, useRef, useMemo, and how to write reusable custom hooks." },
            { title: "Reconciliation & Virtual DOM", desc: "Master fiber nodes, keys, component rendering phases, and avoiding unnecessary re-renders." },
            { title: "State Architectures", desc: "Integrate Context API, Redux Toolkit, or lightweight alternatives like Zustand for global states." }
        ],
        faq: {
            question: "What is the difference between useMemo and useCallback?",
            answer: "Both are React hooks used for performance optimization through memoization. useMemo is used to cache the computed result of an expensive calculation between renders, while useCallback is used to cache the function definition itself. useCallback(fn, deps) is mathematically equivalent to useMemo(() => fn, deps). You use useMemo to avoid recalculating values, and useCallback to prevent passing newly created function references to optimized child components."
        }
    },
    nextjs: {
        description: "Master React Server Components (RSC), static and dynamic routing, server actions, and incremental static regeneration with the industry-standard framework Next.js.",
        modules: [
            { title: "App Router & Rendering", desc: "Navigate layouts, pages, loading states, error boundaries, Server vs Client components." },
            { title: "Data Caching & Revalidation", desc: "Implement static data fetching, dynamic rendering, request memoization, and ISR setups." },
            { title: "Server Actions & Security", desc: "Execute secure mutations directly on the server without creating explicit API route controllers." }
        ],
        faq: {
            question: "What are React Server Components (RSC) and how do they differ from Client Components?",
            answer: "React Server Components are rendered entirely on the server, which means their code stays on the server and is never sent to the browser, significantly reducing client bundle sizes. Client components (marked with 'use client') are sent to the client and can use interactivity, state (useState), and browser-only APIs. SSR in Next.js pre-renders both server and client components on the server to HTML, but server components are never hydrated on the client."
        }
    },
    angular: {
        description: "Learn complete enterprise frontend architecture with Angular components, reactive RxJS observables, structural directives, dependency injection, and signal APIs.",
        modules: [
            { title: "RxJS & Reactive Angular", desc: "Compose complex async workflows using observables, subjects, mapping operators, and async pipes." },
            { title: "DI & Modular Design", desc: "Master Angular's hierarchical dependency injection, standalone components, modules, and guards." },
            { title: "Angular Signals & State", desc: "Learn modern Angular reactivity using Signals to trigger granular rendering updates." }
        ],
        faq: {
            question: "What is the difference between a Promise and an Observable in Angular?",
            answer: "1) Promises emit a single value and then complete, while Observables are streams that can emit multiple values over time. 2) Promises execute immediately upon creation, whereas Observables are lazy and only execute when subscribed to. 3) Observables are cancelable (you can unsubscribe), whereas Promises are not. 4) Observables provide powerful operators like map, filter, debounceTime, and switchMap from the RxJS library, enabling complex asynchronous flows."
        }
    },
    vue: {
        description: "Develop lightweight, performant single-page applications using Vue.js composition API, reactive systems, Pinia stores, and Vue router mechanics.",
        modules: [
            { title: "Composition API & Refs", desc: "Organize logic by logical concern using setup(), ref(), reactive(), and computed()." },
            { title: "State Management with Pinia", desc: "Configure modular, devtool-friendly global state stores without boilerplate." },
            { title: "Dynamic Routing & Nuxt", desc: "Handle dynamic sub-routes, middleware page transitions, and server-side rendering." }
        ],
        faq: {
            question: "How does Vue 3's reactivity system work compared to Vue 2?",
            answer: "Vue 3 uses ES6 Proxies to power its reactivity system, replacing the Object.defineProperty approach used in Vue 2. Proxies allow Vue to intercept operations on objects directly, meaning Vue 3 can automatically detect property additions, deletions, and array index changes without needing helper methods like Vue.set. This makes the reactive engine much faster, more memory-efficient, and free from past reactivity limitations."
        }
    },
    node: {
        description: "Build robust, scalable servers, Express APIs, real-time WebSockets, and asynchronous pipelines using Node.js event-driven runtime architecture.",
        modules: [
            { title: "Express REST API Design", desc: "Design clean routing, middlewares, controller patterns, global error handlers, and cors validation." },
            { title: "Node.js Core & Streams", desc: "Understand buffer manipulation, streams for memory-efficient I/O, events, and file system tasks." },
            { title: "Auth & Security best practices", desc: "Implement bcrypt hashing, JWT authentication, cookies session handling, and helmet protection." }
        ],
        faq: {
            question: "Why is Node.js called single-threaded if it uses multiple threads internally?",
            answer: "Node.js runs your JavaScript code (the Event Loop) in a single thread. However, for blocking operations like file system access, cryptography, and network requests, Node.js delegates the work to its internal C++ worker pool (provided by libuv). Once the background thread finishes the heavy work, the result is queued back into the single-threaded event loop callback queue. This keeps the main thread free to handle thousands of incoming client requests without locking up."
        }
    },
    mongodb: {
        description: "Design scale-optimized database schemas, complex aggregation pipelines, dynamic query indexes, and mongoose models for your applications.",
        modules: [
            { title: "NoSQL Schema Modeling", desc: "Choose between embedding vs referencing documents, handling 1:N relations, and optimizing read ratios." },
            { title: "Aggregation Pipelines", desc: "Master data transformations, filters, grouping, lookups, projects, and bucketing pipelines." },
            { title: "Indexing & Query Tuning", desc: "Understand compound indexes, single field indexes, explain plans, and avoiding COLLSCAN queries." }
        ],
        faq: {
            question: "When should you embed documents vs referencing them in MongoDB?",
            answer: "You should **embed** documents (denormalization) when there is a 'contains' relationship (e.g., street address inside a user profile), when the data is queried together, and when the data does not grow unboundedly (fitting within the 16MB document limit). You should **reference** documents (normalization) when the data grows unboundedly (e.g., a post with millions of comments), when the referenced data is frequently updated, or when data is modeled in a many-to-many relationship."
        }
    },
    playwright: {
        description: "Implement fast, modern end-to-end testing, browser automation scripts, codegen capture, flaky test mitigation, and parallel test runners.",
        modules: [
            { title: "Playwright Core Selector engine", desc: "Write resilient tests using locators, automatic waiting, assertions, and layout snapshots." },
            { title: "Multi-page & Auth State caching", desc: "Learn how to share browser authentication states across test scripts to save auth overhead." },
            { title: "CI/CD & Report Dashboarding", desc: "Configure playwight config for parallel execution, headless tests, HTML reports, and trace logs." }
        ],
        faq: {
            question: "Why is Playwright considered superior to Selenium for modern testing?",
            answer: "Playwright is built for modern web architectures: 1) It runs out-of-process and communicates over a single WebSocket connection (using Chrome DevTools Protocol), making it much faster than Selenium's HTTP-based WebDriver. 2) It has built-in auto-waiting, which waits for elements to be actionable, resolving flaky selectors. 3) It supports multi-page tab context isolated execution natively without opening a fresh browser instance, saving massive memory and startup time."
        }
    },
    python: {
        description: "Master Python programming, object-oriented design, dynamic scripting, automated testing, data structures, and integrations with standard libraries and frameworks like Django or Flask.",
        modules: [
            { title: "Python Core & Scripting", desc: "Understand namespaces, decorators, generators, list comprehensions, context managers, and memory reference counts." },
            { title: "OOP & Design Patterns", desc: "Implement classes, multiple inheritance, metaclasses, abstract base classes, and clean SOLID principles." },
            { title: "Pipelines & Web Frameworks", desc: "Build RESTful APIs with Django/FastAPI and manage dependency isolation using poetry/pipenv." }
        ],
        faq: {
            question: "What is the GIL (Global Interpreter Lock) in Python and how do you bypass it?",
            answer: "The GIL is a mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at once in CPython. This makes single-threaded code fast but limits multi-threaded CPU-bound code from utilizing multiple cores. To bypass it, you can: 1) Use the `multiprocessing` module to run tasks on separate processes (each having its own interpreter and memory space). 2) Offload heavy computational work to C-extensions (like NumPy) which release the GIL during execution. 3) Use asyncio for I/O-bound concurrency."
        }
    },
    html: {
        description: "Master HTML5 semantic structures, accessible document outlines, forms validation, SEO best practices, and DOM node hierarchies.",
        modules: [
            { title: "Semantic HTML5 & Accessibility", desc: "Learn to write accessible layouts using semantic elements (main, article, section) and ARIA attributes." },
            { title: "Forms & Validation API", desc: "Create secure forms, handle inputs, custom validations, and file transfer setups." },
            { title: "SEO & Metadata Integration", desc: "Implement rich microdata, OpenGraph cards, search engine directives, and viewport settings." }
        ],
        faq: {
            question: "What is semantic HTML and why is it important for SEO?",
            answer: "Semantic HTML uses tags that describe the meaning of the content (like `<nav>`, `<article>`, `<header>`, `<footer>`) rather than just its visual style (`<div>`, `<span>`). It is critical for SEO because it helps search engines understand the structure and hierarchy of your page, allowing them to index your content more accurately. It also improves accessibility for screen readers and assistive technologies."
        }
    },
    css: {
        description: "Write advanced CSS, custom layouts using Flexbox and Grid, CSS custom properties, responsive design, animations, and TailwindCSS configuration.",
        modules: [
            { title: "Layouts: Grid & Flexbox", desc: "Master responsive, multidimensional layouts, alignment properties, and flexbox distribution patterns." },
            { title: "Variables & Themes", desc: "Configure CSS custom properties to build robust light/dark mode engines and dynamic style tokens." },
            { title: "Transitions & Keyframe Animations", desc: "Create smooth, performant hardware-accelerated animations and interactive hover micro-states." }
        ],
        faq: {
            question: "What is the CSS Box Model and how does box-sizing: border-box affect it?",
            answer: "The CSS Box Model represents the space occupied by HTML elements, consisting of: Content, Padding, Border, and Margin. By default (`box-sizing: content-box`), when you set a width or height, it only applies to the Content. Adding padding or borders increases the element's actual rendered size. Using `box-sizing: border-box` forces the width and height to include padding and borders, preventing layout breaking and making size calculations highly intuitive."
        }
    },
    redux: {
        description: "Master global state management with Redux Toolkit (RTK), slice generation, async middleware with Thunks, and RTK Query data fetching.",
        modules: [
            { title: "Slices & Actions", desc: "Design clean state stores using Redux Toolkit slices, reducers, and immutable state updates." },
            { title: "Redux Thunks & Middleware", desc: "Manage asynchronous actions, API side effects, logs, and custom middleware flows." },
            { title: "RTK Query (RTKQ)", desc: "Implement automated caching, query pooling, optimistic updates, and client-side database synchronization." }
        ],
        faq: {
            question: "What is Redux Toolkit and how does it differ from legacy Redux?",
            answer: "Redux Toolkit (RTK) is the official, recommended way to write Redux code. It eliminates the boilerplate of legacy Redux by: 1) Providing `configureStore` which sets up DevTools and middleware automatically. 2) Utilizing `createSlice` to generate actions and reducers together. 3) Integrating Immer under the hood to allow you to write 'mutating' logic that updates state immutably. 4) Shipping with RTK Query for efficient data fetching."
        }
    },
    mfe: {
        description: "Architect scalable, decentralized frontend applications using Webpack Module Federation, custom shell micro-routing, and shared dependency profiles.",
        modules: [
            { title: "Webpack Module Federation", desc: "Configure hosts and remote containers to share dynamic runtime builds and dependencies." },
            { title: "Shell Shell & Routing orchestration", desc: "Design main application shells that handle lazy-loaded sub-applications and shared routing states." },
            { title: "State & Communication hubs", desc: "Implement decoupled cross-app communication using custom events, state stores, or pub-sub channels." }
        ],
        faq: {
            question: "What is Webpack Module Federation and how does it help in Micro Frontend architectures?",
            answer: "Webpack Module Federation is a feature that allows a Webpack compilation to import code from another Webpack compilation at runtime. This enables Micro Frontends by allowing team repositories to deploy sub-applications independently, while the parent 'shell' application dynamically pulls in the latest hosted bundle at runtime without needing to rebuild or redeploy the main container."
        }
    },
    aifrontend: {
        description: "Integrate LLM API endpoints, streaming responses, real-time audio streams, token-usage monitoring, and vector database queries into your React applications.",
        modules: [
            { title: "Streaming API Integrations", desc: "Handle stream chunks from OpenAI/Anthropic/Gemini directly into React state variables using reader loops." },
            { title: "AI SDK & Tool Calling", desc: "Leverage Vercel AI SDK to build interactive agents, prompt structures, and functional tool pipelines." },
            { title: "Real-time voice & Canvas UI", desc: "Implement WebRTC voice channels, vector search result cards, and dynamic workspace canvas interfaces." }
        ],
        faq: {
            question: "How do you stream LLM responses in a React UI without freezing the page?",
            answer: "To stream LLM responses, you use the browser's `Fetch API` with `ReadableStream` (often wrapped by utilities like Vercel AI SDK's `useCompletion` or `useChat`). You read chunks of text asynchronously from the response reader loop and append them to a state variable. By executing this inside an asynchronous loop or web worker, React renders each text token as it arrives, creating a fast, typewriter-like typing effect without blocking the main browser thread."
        }
    },
    frontendengineering: {
        description: "Master modern Frontend Engineering (FE IT), high-scale client architectures, Core Web Vitals optimization, state synchronization, and scalable Design Systems.",
        modules: [
            { title: "Core Web Vitals & Performance", desc: "Optimize LCP, INP, and CLS metrics with bundle chunking, asset prefetching, and render path reduction." },
            { title: "Enterprise Design Systems & UI", desc: "Build reusable, accessible component libraries conforming to WCAG 2.1 AA with Tailwind and Radix primitives." },
            { title: "Frontend State & Cache Sync", desc: "Design optimistic state engines, client-side offline storage, WebSocket synchronizations, and query caches." }
        ],
        faq: {
            question: "What is the difference between a Junior Frontend Developer and a Senior Frontend Engineer?",
            answer: "A junior frontend developer focuses primarily on implementing UI designs into HTML/CSS/React components. A senior frontend engineer designs the overall client architecture, manages build pipelines, ensures web accessibility (a11y), optimizes Core Web Vitals (LCP, INP, CLS), establishes design systems, manages complex state synchronization, and mentors the development team."
        }
    },
    websitedesign: {
        description: "Design and build stunning, high-converting responsive websites, landing pages, modern typography systems, micro-animations, and UX wireframes.",
        modules: [
            { title: "High-Converting Landing Page Design", desc: "Craft conversion-focused hero layouts, visual hierarchies, CTA placements, and mobile-first design systems." },
            { title: "Responsive Layouts & Micro-Interactions", desc: "Implement seamless Flexbox/Grid layouts, Framer Motion transitions, and fluid CSS clamp typography." },
            { title: "SEO-Optimized Web Development", desc: "Combine clean semantic HTML, fast loading speeds, structured schema markup, and responsive graphics." }
        ],
        faq: {
            question: "What are the core principles of high-converting website design?",
            answer: "High-converting web design relies on: 1) A crystal-clear value proposition above the fold. 2) Clean visual hierarchy that guides the user's eye directly to primary Call-To-Action (CTA) buttons. 3) Fast page load times (under 1.5s) to prevent bounce rates. 4) Mobile responsiveness. 5) Social proof (testimonials, metrics, certifications) placed strategically near conversion points."
        }
    },
    jobsupport: {
        description: "Get real-time on-the-job IT support, daily standup guidance, production debugging assistance, sprint task delivery, and senior architectural code reviews.",
        modules: [
            { title: "Daily Sprint & Task Delivery Support", desc: "Receive live 1-on-1 pair programming support to unblock challenging Jira tickets and feature deliveries." },
            { title: "Production Debugging & Bug Resolution", desc: "Debug complex production errors, performance bottlenecks, race conditions, and test suite failures." },
            { title: "Standup Preparation & Code Reviews", desc: "Review your PRs and code architecture before team submission to ensure adherence to company coding standards." }
        ],
        faq: {
            question: "How does 1-on-1 IT Job Support work?",
            answer: "IT Job Support connects you with a dedicated senior engineer in your tech stack (React, TypeScript, Node.js, Playwright, MongoDB). Whenever you encounter a difficult sprint task, production bug, or architectural requirement at work, you can schedule live 1-on-1 screen-sharing sessions to analyze requirements, debug issues, write clean code, and prepare for daily standups with full confidence."
        }
    },
    fullstack: {
        description: "Master end-to-end Full Stack Development with React, Next.js, Node.js, Express, TypeScript, MongoDB, and modern cloud deployment architectures.",
        modules: [
            { title: "Frontend to Backend Integration", desc: "Connect React/Next.js client applications to Node.js/Express REST and GraphQL microservices." },
            { title: "Database Modeling & Aggregations", desc: "Design high-performance MongoDB/PostgreSQL schemas, indexing strategies, and transactional queries." },
            { title: "Authentication, DevOps & CI/CD", desc: "Deploy containerized applications with Docker, AWS/Vercel hosting, OAuth security, and GitHub Actions." }
        ],
        faq: {
            question: "Why is the MERN / Next.js stack so popular for modern full stack engineering?",
            answer: "The MERN (MongoDB, Express, React, Node.js) and Next.js full stack enables end-to-end JavaScript/TypeScript development. This allows developers to share data types, utility libraries, and validation schemas seamlessly across client and server, dramatically speeding up feature development and simplifying CI/CD deployment pipelines."
        }
    }
};

export const LOCATION_CONTENT = {
    pune: {
        techHubDescription: "Pune is one of India's leading IT hubs. The city features massive technology corridors, including Hinjewadi IT Park (Phases 1, 2, and 3), Magarpatta Cybercity, and Yerwada business zones. Companies here look for skilled React and Node.js professionals.",
        referralNetwork: "Get connected with lead developers in top MNCs in Hinjewadi Phase 3 and Magarpatta."
    },
    bangalore: {
        techHubDescription: "Bangalore, the Silicon Valley of India, is the epicenter of global software development and startups. With massive tech hubs in Whitefield, Electronic City, and Outer Ring Road, it provides endless opportunities for front-end and full-stack engineers.",
        referralNetwork: "Access active referral circles for top product companies in Outer Ring Road and HSR Layout."
    },
    mumbai: {
        techHubDescription: "Mumbai has a rapidly growing software startup scene centered around Bandra-Kurla Complex (BKC), Powai (IIT area), and Andheri. The financial tech (FinTech) boom here has created a massive demand for full-stack JavaScript and Java engineers.",
        referralNetwork: "We refer our students to top Fintech startups and media companies in Powai and BKC."
    },
    hyderabad: {
        techHubDescription: "Hyderabad boasts an impressive IT infrastructure centered around HITEC City, Gachibowli, and Madhapur. It houses global development centers for tech giants like Microsoft, Amazon, and Google, driving a competitive ecosystem.",
        referralNetwork: "Connect with developers working at Gachibowli-based product centers."
    },
    noida: {
        techHubDescription: "Noida, the technology gateway of NCR, is home to major IT parks in Sector 62, Sector 125, and Sector 135. It serves as a hub for both service companies and product engineering units looking for MERN engineers.",
        referralNetwork: "Leverage NCR developer networks to secure interviews in Noida Sector 62 IT companies."
    },
    delhi: {
        techHubDescription: "Delhi features a thriving startup culture with tech hubs in Okhla, Nehru Place, and Connaught Place. Tutors and job support candidates are highly sought after by local software agencies and early-stage ventures.",
        referralNetwork: "Unlock networking access with Delhi's startup incubators and development agencies."
    },
    gurgaon: {
        techHubDescription: "Gurgaon is NCR's commercial powerhouse. Cyber City, Sector 48, and Golf Course Road house multinational tech consulting firms and rapid-growth unicorn startups seeking top React, Next.js, and Java talent.",
        referralNetwork: "Get direct referrals to top tech startups located in Cyber City."
    },
    chennai: {
        techHubDescription: "Chennai is India's Software-as-a-Service (SaaS) capital. With major centers along Old Mahabalipuram Road (OMR), Tidel Park, and Siruseri IT Park, developers in Chennai build world-class products.",
        referralNetwork: "Connect with engineering leads at SaaS firms in OMR and Tidel Park."
    },
    london: {
        techHubDescription: "London is the tech capital of Europe, centered around Silicon Roundabout in Shoreditch and the financial centers of Canary Wharf and the City. Startup accelerators here drive high demand for Next.js, React, and AWS engineers.",
        referralNetwork: "Access Shoreditch and Canary Wharf fintech networking opportunities."
    },
    "san-francisco": {
        techHubDescription: "San Francisco and the wider Silicon Valley (Mountain View, Sunnyvale, San Jose) stand as the global epicenter of tech. The boom in generative AI and full-stack systems drives strong competition for engineering talent.",
        referralNetwork: "We connect you with mentors working directly in SoMa and South Bay startups."
    },
    "new-york": {
        techHubDescription: "New York City's 'Silicon Alley' houses thousands of tech firms, combining Wall Street's fintech operations with modern web design and e-commerce companies in Manhattan and Brooklyn.",
        referralNetwork: "Tap into New York's elite developer networks in Manhattan."
    },
    berlin: {
        techHubDescription: "Berlin is Europe's most vibrant startup capital, known for its digital agency networks, SaaS startups, and creative technologies centered around Kreuzberg and Mitte.",
        referralNetwork: "Join our Berlin-Mitte developer Slack channels and job support circles."
    },
    toronto: {
        techHubDescription: "Toronto is North America's fastest-growing tech hub, centered around the downtown financial core and the tech corridor of Waterloo, housing thousands of SaaS and developer agencies.",
        referralNetwork: "Get referred to top product teams in Toronto's Downtown tech core."
    },
    vancouver: {
        techHubDescription: "Vancouver has a strong technology presence, hosting major development centers for cloud, web, and gaming organizations in Yaletown and the downtown area.",
        referralNetwork: "Tap into Vancouver's software engineering referral networks."
    },
    sydney: {
        techHubDescription: "Sydney is Australia's largest tech hub, home to headquarters of product giants like Atlassian and Canva, with high demand for modern React and serverless cloud developers.",
        referralNetwork: "Connect with mentors from Sydney's leading SaaS businesses."
    },
    singapore: {
        techHubDescription: "Singapore serves as the technology gateway to Southeast Asia. Its modern business parks, like One-North and Mapletree, house top tech hubs and R&D centers.",
        referralNetwork: "Tap into Singapore's One-North developer groups."
    },
    dubai: {
        techHubDescription: "Dubai is the digital center of the Middle East, with dedicated business zones like Dubai Internet City and Dubai Silicon Oasis hosting top web developers and startups.",
        referralNetwork: "Tap into Dubai Internet City product development teams."
    },
    chicago: {
        techHubDescription: "Chicago boasts a diverse technology landscape, blending traditional finance, logistics, and trading firms in the Loop with growing healthcare and tech start-up corridors in River North and Fulton Market.",
        referralNetwork: "Get connected with lead developers in Loop financial hubs and Fulton Market startups."
    },
    seattle: {
        techHubDescription: "Seattle is a global cloud computing and enterprise titan. Home to AWS and Microsoft, as well as massive hubs for Google and Meta, the Puget Sound region has a deep demand for cloud-native systems engineers.",
        referralNetwork: "Access active referral channels for top cloud and enterprise teams across Seattle and Bellevue."
    },
    austin: {
        techHubDescription: "Austin ('Silicon Hills') is a rapidly growing technology hub. With major operations for Tesla, Apple, and Oracle, and a massive start-up community, it draws developers looking to work in dynamic, fast-paced teams.",
        referralNetwork: "Unlock direct referrals to Silicon Hills startups and Austin-based hardware/software firms."
    },
    boston: {
        techHubDescription: "Boston is a leading hub for biotechnology, robotics, and academic R&D, centered around Kendall Square in Cambridge and the Seaport District, housing elite research labs and enterprise software firms.",
        referralNetwork: "Leverage Cambridge and Seaport developer networks to connect with advanced tech leaders."
    },
    dublin: {
        techHubDescription: "Dublin is the Silicon Valley of Europe. Silicon Docks hosts the European headquarters of Google, Meta, Stripe, and LinkedIn, creating an incredibly dense and active developer ecosystem.",
        referralNetwork: "Connect with engineering leads and mentors at major multinational campuses in Silicon Docks."
    },
    tokyo: {
        techHubDescription: "Tokyo is Asia's advanced technology capital. From massive robotics developers to high-growth mobile, web, and e-commerce startups in Shibuya and Roppongi, the city demands skilled programmers.",
        referralNetwork: "Tap into Shibuya and Roppongi developer channels and global networking circles."
    },
    remote: {
        techHubDescription: "Global remote engineering has changed how software is built. Working across distributed teams requires strong asynchronous communication and deep technical expertise.",
        referralNetwork: "Leverage global remote networks to unlock freelance and full-time contracts."
    },
    online: {
        techHubDescription: "Online mentorship removes all boundaries. Learn directly from seniors from top tech hubs in Silicon Valley, London, and Bangalore from the comfort of your desk.",
        referralNetwork: "Join our global student community and network with peers worldwide."
    },
    india: {
        techHubDescription: "India is a global powerhouse for software development, IT services, and startup innovation. From Bangalore and Pune to Hyderabad and NCR, the country drives digital transformation globally.",
        referralNetwork: "Get referrals to top-tier MNCs, Indian tech unicorns, and international remote operations."
    },
    usa: {
        techHubDescription: "The United States is the birthplace of modern software giants and venture-backed startups, setting global trends in Web development, AI, Cloud infrastructure, and software engineering standards.",
        referralNetwork: "Tap into elite networks across Silicon Valley, Silicon Hills, Silicon Alley, and remote US firms."
    },
    uk: {
        techHubDescription: "The United Kingdom has a massive technology market, combining London's world-leading FinTech ecosystem with tech corridors in Manchester, Edinburgh, and Bristol.",
        referralNetwork: "Connect with mentors and lead developers at top tech hubs in London, Manchester, and Leeds."
    },
    amsterdam: {
        techHubDescription: "Amsterdam is a premier European tech hub, housing global headquarters like Booking.com, Uber EMEA, and Adyen, with high demand for React, TypeScript, and Node.js engineers.",
        referralNetwork: "Access referral networks across Amsterdam's Zuidas and Silicon Canals tech ecosystems."
    },
    paris: {
        techHubDescription: "Paris has become one of Europe's top AI and startup capitals, centered around Station F and the Silicon Sentier, seeking skilled full-stack and frontend architects.",
        referralNetwork: "Connect with engineering mentors and tech leads at Station F and Paris tech startups."
    },
    stockholm: {
        techHubDescription: "Stockholm is the Nordic unicorn capital, known for global successes like Spotify and Klarna, with massive demand for frontend engineering and automated testing.",
        referralNetwork: "Tap into Stockholm developer circles and Nordic engineering channels."
    },
    zurich: {
        techHubDescription: "Zurich is a powerhouse for enterprise engineering, housing Google's largest European engineering campus and leading Swiss financial tech innovators.",
        referralNetwork: "Connect with lead software engineers and tutors across Zurich's technology corridor."
    },
    melbourne: {
        techHubDescription: "Melbourne is a thriving Australian digital hub, boasting high-growth SaaS companies, digital agencies, and rapid demand for modern JavaScript, React, and Playwright talent.",
        referralNetwork: "Access active developer referral channels across Melbourne's CBD and tech precincts."
    },
    dallas: {
        techHubDescription: "Dallas-Fort Worth ('Silicon Prairie') is a massive corporate technology hub with telecom, enterprise SaaS, and IT consulting firms seeking full-stack engineers.",
        referralNetwork: "Get connected with engineering leads in DFW's Silicon Prairie corporate tech hubs."
    },
    atlanta: {
        techHubDescription: "Atlanta is the FinTech and enterprise software capital of the American Southeast, centered around Midtown and Tech Square with deep demand for Node.js and React developers.",
        referralNetwork: "Tap into Atlanta Tech Square networks and enterprise software referral groups."
    },
    "los-angeles": {
        techHubDescription: "Los Angeles ('Silicon Beach') blends entertainment, e-commerce, and tech startups across Santa Monica, Venice, and Culver City with heavy demand for website design and React.",
        referralNetwork: "Connect with Silicon Beach tech leads and web design agencies in Los Angeles."
    },
    montreal: {
        techHubDescription: "Montreal is a global AI and software innovation center, featuring cutting-edge development studios, video game tech giants, and modern web startups.",
        referralNetwork: "Access developer networks across Montreal's Mile End and downtown tech hubs."
    }
};

export function getSkillContent(skillId) {
    const normId = (skillId || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Map alternate names to primary keys
    let key = 'javascript';
    if (normId.includes('react') && !normId.includes('native')) key = 'react';
    else if (normId.includes('typescript') || normId === 'ts') key = 'typescript';
    else if (normId.includes('frontend') || normId.includes('feit') || normId === 'fe') key = 'frontendengineering';
    else if (normId.includes('design') || normId.includes('webdesign') || normId.includes('uiux')) key = 'websitedesign';
    else if (normId.includes('jobsupport') || normId.includes('sprintsupport') || normId.includes('projectsupport')) key = 'jobsupport';
    else if (normId.includes('fullstack') || normId.includes('mern') || normId.includes('mean')) key = 'fullstack';
    else if (normId.includes('next')) key = 'nextjs';
    else if (normId.includes('angular')) key = 'angular';
    else if (normId.includes('vue')) key = 'vue';
    else if (normId.includes('node')) key = 'node';
    else if (normId.includes('mongo')) key = 'mongodb';
    else if (normId.includes('playwright')) key = 'playwright';
    else if (normId.includes('python') || normId === 'py') key = 'python';
    else if (normId.includes('html')) key = 'html';
    else if (normId.includes('css') || normId.includes('tailwind')) key = 'css';
    else if (normId.includes('redux') || normId.includes('rtk')) key = 'redux';
    else if (normId.includes('mfe') || normId.includes('microfrontend') || normId.includes('federation')) key = 'mfe';
    else if (normId.includes('aifrontend') || normId.includes('aife') || normId.includes('aifront')) key = 'aifrontend';
    else {
        // Fallback generator for other stacks
        const prettyName = skillId.charAt(0).toUpperCase() + skillId.slice(1);
        return {
            description: `Master ${prettyName} with personalized 1-on-1 coaching, architectural code reviews, hands-on projects, and real-world implementation tips.`,
            modules: [
                { title: `${prettyName} Fundamentals`, desc: `Understand syntax, setup, core paradigms, and operational runtime of ${prettyName}.` },
                { title: `Intermediate ${prettyName}`, desc: `Design complex architectures, handle errors, optimize speeds, and configure modules.` },
                { title: `Advanced Workflows`, desc: `Implement testing, deployment setups, and clean code paradigms for ${prettyName} projects.` }
            ],
            faq: {
                question: `Why is it important to learn ${prettyName} from a mentor?`,
                answer: `Learning ${prettyName} with a mentor saves hours of struggle. Instead of getting stuck on documentation or tutorial-hell, you receive direct answers to questions, live pair-programming support, code reviews to align with senior developer standards, and job-oriented training.`
            }
        };
    }

    return SKILL_CONTENT[key];
}

export function getLocationContent(locationId, locationName) {
    const key = (locationId || '').toLowerCase();
    
    if (LOCATION_CONTENT[key]) {
        return LOCATION_CONTENT[key];
    }

    // Auto-generate for dynamic cities (Infinite Locations Feature)
    const name = locationName || locationId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
        techHubDescription: `${name} has a thriving ecosystem of developers and tech companies. Tutors and consultants here support students and juniors to master modern coding standards.`,
        referralNetwork: `Access referral channels and local developer groups in ${name}.`
    };
}

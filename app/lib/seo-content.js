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
    remote: {
        techHubDescription: "Global remote engineering has changed how software is built. Working across distributed teams requires strong asynchronous communication and deep technical expertise.",
        referralNetwork: "Leverage global remote networks to unlock freelance and full-time contracts."
    },
    online: {
        techHubDescription: "Online mentorship removes all boundaries. Learn directly from seniors from top tech hubs in Silicon Valley, London, and Bangalore from the comfort of your desk.",
        referralNetwork: "Join our global student community and network with peers worldwide."
    }
};

export function getSkillContent(skillId) {
    const normId = (skillId || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Map alternate names to primary keys
    let key = 'javascript';
    if (normId.includes('react') && !normId.includes('native')) key = 'react';
    else if (normId.includes('typescript') || normId === 'ts') key = 'typescript';
    else if (normId.includes('next')) key = 'nextjs';
    else if (normId.includes('angular')) key = 'angular';
    else if (normId.includes('vue')) key = 'vue';
    else if (normId.includes('node')) key = 'node';
    else if (normId.includes('mongo')) key = 'mongodb';
    else if (normId.includes('playwright')) key = 'playwright';
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

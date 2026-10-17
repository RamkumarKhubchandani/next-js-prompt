export const HIRE_SHARED = {
  name: "Ramkumar Khubchandani",
  experience: "12+ years of industry experience",
  rate: "Starting from $30/hr. Fixed-price quotes available for clearly defined projects after an intro call.",
  testimonial: {
    quote: "He completed the project on time and delivered excellent work. He is a brilliant professional with outstanding knowledge of React, TypeScript, Next.js, and MongoDB. I would strongly recommend hiring him.",
    author: "Soraya",
    role: "Owner, Soraya's Hair Braiding & Beauty, Manhattan, NY"
  },
  soraya: {
    name: "Soraya's Hair Braiding & Beauty (Manhattan, NY)",
    type: "Client project",
    stack: ["React", "Next.js", "Node.js", "MongoDB"],
    description: "I built the complete website for a hair braiding studio in Manhattan — a styles menu, an online booking flow where clients choose a style and time and submit a deposit reference for the owner to verify, a portfolio gallery, and a client review page."
  },
  accessible: {
    name: "Accessible tool for blind users",
    type: "Personal project",
    stack: ["React"],
    description: "A personal project built for blind and low-vision users, with voice interaction and screen-reader support. // TODO: add screenshots or a short screen recording once available."
  },
  kids: {
    name: "Drawing and play app for children aged 6 to 10",
    type: "Personal project",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
    description: "A personal project where children aged 6 to 10 can play and draw. // TODO: add real feature list and screenshots once provided."
  },
  process: [
    "Book a 20-minute intro call or send the inquiry form.",
    "I review your goals and send a clear scope, timeline and quote.",
    "I build in short stages and share progress along the way.",
    "We review together, fix issues, and launch."
  ]
};

export const HIRE_PAGES = {
  "react-developer": {
    skill: "React",
    title: "Hire a React Developer (India, Remote) | 12+ Years Experience",
    description: "Hire an experienced React developer for booking sites, dashboards and accessible web apps. 12+ years in the industry. Start with a 20-minute call.",
    h1: "Hire an Experienced React Developer",
    intro: "I'm Ramkumar Khubchandani, a software engineer with 12+ years of industry experience. I build React interfaces for small businesses and product teams who need something clear, fast and easy to use, from booking flows to accessible tools.",
    whatIBuild: ["Booking and scheduling interfaces for service businesses", "Component-based UIs that are easy to maintain and extend", "Interfaces built with accessibility in mind, including screen-reader and voice support"],
    projects: ["soraya", "accessible"],
    sections: [
      {
        heading: "Typical React Engagements I Take On",
        paragraphs: [
          "With over 12 years of web engineering experience, I collaborate with founders, small business owners, and agency teams to build and improve React user interfaces. My engagements usually fall into distinct project scopes: building interactive customer-facing web apps from scratch, developing custom booking and scheduling workflows, creating internal dashboards, auditing existing interfaces for usability and performance bottlenecks, and providing dedicated part-time front-end support for teams without a senior React specialist.",
          "For service businesses, I build booking interfaces where customers can select appointment types, browse service menus, view available calendar slots, and submit confirmation details. For product teams, I translate Figma designs into modular, clean React components that are easy for other developers to understand and maintain. I focus on practical business value rather than over-engineered abstractions.",
          "When teams face a sudden deadline or lose their front-end developer mid-project, I step in to review the codebase, untangle blocking issues, and bring the work across the finish line with clear commits and documentation."
        ]
      },
      {
        heading: "Component Architecture & State Management",
        paragraphs: [
          "A healthy React application starts with disciplined component boundaries. I organize components by feature and purpose, separating visual presentation from data fetching and business logic. I favor standard React hooks such as useState, useReducer, and useContext for local and contextual state, reaching for external state libraries like Redux Toolkit or Zustand only when application complexity genuinely warrants a global store.",
          "Over-complicated state trees are one of the most common causes of bugs and sluggish user interfaces in growing codebases. By keeping state close to where it is consumed and establishing clean prop contracts, components remain reusable and straightforward to test. I also design clean custom hooks to encapsulate repetitive asynchronous logic, browser API interactions, and form handling, ensuring that page components remain clean and focused on layout."
        ]
      },
      {
        heading: "Accessibility & Performance in React Interfaces",
        paragraphs: [
          "A great user interface must be fast to load and accessible to everyone who visits it. I build React components using semantic HTML markup, appropriate ARIA roles, and strict keyboard navigation patterns so that users relying on screen readers or non-mouse navigation have an intuitive experience. I have built dedicated accessibility tools for users with vision impairments, where voice feedback and keyboard accessibility are foundational requirements rather than afterthoughts.",
          "For performance, I focus on eliminating unnecessary re-renders through thoughtful component composition, memoization where measured and necessary, and code-splitting with dynamic imports and React.lazy. I keep external npm dependency trees lean, avoiding bloated UI packages when clean CSS or Tailwind utility styling can achieve the same visual outcome with zero runtime overhead."
        ]
      },
      {
        heading: "Working with an Existing React Codebase",
        paragraphs: [
          "Many of my projects involve stepping into an existing React codebase rather than starting from a blank editor. I begin by conducting a structured code review: analyzing package versions, folder organization, state patterns, console warnings, and recurring error traces. I identify quick wins that improve immediate stability alongside structural issues that should be addressed before adding major new features.",
          "I work incrementally, respecting your existing conventions while applying modern best practices. If parts of your application still use legacy class components or deprecated lifecycle methods, I can gradually refactor them into modern functional components without requiring a risky, expensive full-rewrite. Throughout the engagement, every pull request includes clear explanations so your in-house team learns from each improvement."
        ]
      }
    ],
    faq: [
      { q: "What kinds of React projects do you take on?", a: "Booking sites, dashboards, marketing sites with interactive parts, and accessibility-focused tools. If you're unsure your project fits, book an intro call." },
      { q: "Can you work with an existing React codebase?", a: "Yes. I can review it, fix problems, and add features. I'll tell you honestly if a part needs restructuring first." },
      { q: "How do we start?", a: "Book a 20-minute call or send the inquiry form with your goals, timeline and budget range." },
      { q: "Which styling approaches and UI libraries do you work with?", a: "I work primarily with Tailwind CSS, standard CSS Modules, and clean utility styling. I also have experience integrating component systems like Radix UI, Headless UI, and Material UI depending on what your existing project uses." },
      { q: "Do you handle API integration and data fetching in React?", a: "Yes. I frequently integrate REST and GraphQL endpoints, handle loading and error states, implement optimistic updates, and configure client caching with tools like TanStack Query (React Query) or RTK Query." },
      { q: "Can you help set up automated testing for our React app?", a: "Yes. I write unit and integration tests using Vitest or Jest along with React Testing Library, focusing on testing real user interactions and form submissions rather than brittle implementation details." }
    ]
  },
  "nextjs-developer": {
    skill: "Next.js",
    title: "Hire a Next.js Developer (India, Remote) | SEO-Ready Websites",
    description: "Hire a Next.js developer to build fast, search-friendly websites and web apps. 12+ years of industry experience. Start with a 20-minute call.",
    h1: "Hire a Next.js Developer for Fast, Findable Websites",
    intro: "If people need to find your business on Google, Next.js gives you fast pages and full control over titles, descriptions and social-sharing previews. I'm Ramkumar Khubchandani, with 12+ years of industry experience, and I build Next.js sites that are set up properly from day one.",
    whatIBuild: ["Business and service websites with page-specific titles, descriptions and sharing tags", "Web apps that combine server-rendered pages with interactive features", "Sites that connect to a Node.js and MongoDB backend when you need one"],
    projects: ["soraya", "kids"],
    sections: [
      {
        heading: "Typical Next.js Engagements I Take On",
        paragraphs: [
          "With 12+ years of software development experience, I help companies build, optimize, and modernize web applications using Next.js. My freelance engagements include building greenfield business websites, developing customer portals that combine server rendering with interactive dashboards, auditing Next.js architectures for performance and caching defects, optimizing Core Web Vitals, and migrating older React single-page apps or WordPress sites to Next.js.",
          "For small businesses and service providers, I deliver Next.js sites that load near-instantly and provide clear, crawlable content for search engines. In client work such as Soraya's Hair Braiding & Beauty in Manhattan, I used React and Next.js to build a complete customer-facing platform featuring service menus, online booking flows, deposit verification, and review showcases. Every page was designed to present clear information to customers and search engines alike.",
          "For early-stage startups and product teams, I assist in building MVP applications with Next.js App Router, combining Server Components for fast initial data loads with interactive Client Components for user workflows, authentication, and payment integrations."
        ]
      },
      {
        heading: "App Router, ISR/SSR & Caching Decisions",
        paragraphs: [
          "Next.js offers a powerful spectrum of rendering modes: Static Site Generation (SSG), Incremental Static Regeneration (ISR), Server-Side Rendering (SSR), and Client-Side Rendering (CSR). Choosing the wrong rendering model can lead to unnecessary server load, sluggish response times, or stale data. I evaluate each route individually to select the optimal strategy based on how frequently your data changes and whether content is public or user-specific.",
          "With the Next.js App Router, React Server Components (RSC) allow us to keep heavy data-fetching logic and third-party libraries on the server, sending zero unnecessary JavaScript to the user's browser. I carefully organize the boundary between Server and Client Components, configure revalidation cadences with ISR where content updates periodically, and implement sensible caching headers so your hosting costs remain low while page delivery stays fast."
        ]
      },
      {
        heading: "SEO Foundations Done Properly",
        paragraphs: [
          "Search engine optimization begins with solid technical foundations. I ensure that every public page has clean semantic markup, unique and descriptive title tags, meta descriptions within recommended character counts, canonical link tags, Open Graph tags for social preview cards, and automated XML sitemaps. I also configure structured data using JSON-LD (such as LocalBusiness, Service, FAQPage, and BreadcrumbList schemas) so search engine crawlers can understand the exact nature of your offerings.",
          "I believe in being completely honest about SEO: I cannot and will not promise specific Google keyword rankings, traffic volumes, or overnight revenue gains, because search algorithms involve dozens of factors outside an engineer's control (such as domain authority, backlink profile, competition, and search engine policy changes). What I do promise is that your site's technical architecture, markup, crawlability, and loading performance will be executed according to industry standards, giving your content the best possible opportunity to be discovered."
        ]
      },
      {
        heading: "Migrating Existing Sites to Next.js",
        paragraphs: [
          "If you have an existing single-page React app (built with Create React App or Vite) that suffers from poor search visibility or slow initial load times, migrating to Next.js is often a practical step. I specialize in planned, low-risk migrations where routes, metadata, and backend API connections are ported systematically without disrupting your ongoing business.",
          "Before recommending a migration, I conduct a thorough evaluation of your current architecture to verify whether Next.js is genuinely the right solution for your needs. If a migration makes sense, I set up URL redirects, preserve existing search-engine equity, verify all form submissions and external integrations, and provide a clear deployment plan on Vercel, AWS, or your preferred hosting infrastructure."
        ]
      }
    ],
    faq: [
      { q: "Why choose Next.js for a business website?", a: "It lets pages load quickly and lets each page carry its own search and sharing details, which helps people find and trust your site. I can't promise a ranking, but I'll set the technical foundations correctly." },
      { q: "Can you migrate my existing site to Next.js?", a: "Often yes. I'll review your current site first and tell you whether migration makes sense." },
      { q: "How do we start?", a: "Book a 20-minute call or send the inquiry form." },
      { q: "Do you work with the Next.js App Router or Pages Router?", a: "I work with both. For new projects, I recommend the App Router with React Server Components for superior performance and caching control. For established codebases on the Pages Router, I can maintain them or manage a gradual route-by-route migration." },
      { q: "Where do you typically deploy Next.js applications?", a: "Vercel is the most seamless platform for Next.js, but I also deploy to AWS (Amplify, ECS, or Lambda via SST/OpenNext), DigitalOcean, Node.js VPS servers, and Docker containers depending on your infrastructure preferences." },
      { q: "Can Next.js connect to my existing backend or database?", a: "Yes. Next.js can connect directly to MongoDB, PostgreSQL, or Redis via Server Components and Server Actions, or communicate with an external REST or GraphQL backend running on Node.js, Python, or another service." }
    ]
  },
  "full-stack-developer": {
    skill: "Full Stack",
    title: "Hire a Full Stack Developer | React, Node.js, MongoDB",
    description: "Hire a full stack developer for end-to-end web projects: interface, server and database. React, Next.js, Node.js, MongoDB. 12+ years of experience.",
    h1: "Hire a Full Stack Developer: Interface, Server and Database",
    intro: "Many small projects need one person who can handle everything. I'm Ramkumar Khubchandani, with 12+ years of industry experience, and I build complete web products with React and Next.js on the front end and Node.js and MongoDB behind them.",
    whatIBuild: ["Complete websites and web apps from design to launch", "Booking, scheduling and client-management workflows", "Database design and server logic that fit your business process"],
    projects: ["soraya", "kids"],
    sections: [
      {
        heading: "Typical Full-Stack Engagements I Take On",
        paragraphs: [
          "With over 12 years in the software industry, I provide end-to-end full-stack development for startups, small businesses, and agencies. Many projects do not have the budget or management capacity to coordinate separate frontend, backend, and database developers. As a solo full-stack engineer, I take ownership of the complete architecture: designing the user interface in React or Next.js, writing the server logic and APIs in Node.js, and structuring data in MongoDB.",
          "My engagements include building complete minimum viable products (MVPs) from initial wireframes to launch, developing internal business portals and management dashboards, adding full-stack features (such as authentication, payment collection, or automated email notifications) to existing systems, and conducting end-to-end code reviews to fix cross-layer bugs.",
          "A concrete example of my full-stack work is Soraya's Hair Braiding & Beauty in Manhattan, NY. I built the complete website with a React/Next.js frontend and a Node.js and MongoDB backend, including a booking flow where the client submits a deposit reference for the owner to verify, a portfolio gallery, and a review page."
        ]
      },
      {
        heading: "How I Structure a Build from Idea to Launch",
        paragraphs: [
          "A successful full-stack build begins with thorough planning rather than jumping straight into code. During discovery, we clarify your core business requirements, user journeys, data entities, and third-party dependencies. I draft a written technical scope outlining the milestones, deliverables, and estimated schedule so everyone is aligned before development starts.",
          "I build in short, verifiable increments. First, I establish the foundational database models and API endpoints. Next, I construct the user interface components and wire them up with real data flows. Throughout the build, I share staging links and progress demos regularly, giving you full visibility and the opportunity to provide feedback early. This iterative method prevents misunderstandings and ensures the delivered software matches your expectations."
        ]
      },
      {
        heading: "Data Modelling & APIs (Node.js + MongoDB)",
        paragraphs: [
          "The backend and data layer form the backbone of any reliable web product. I design schema models with Mongoose and MongoDB that balance data normalization with query performance. I establish compound indexes to ensure fast query execution, validate incoming data with schema constraints, and write clean middleware for authentication, input sanitization, and structured error handling.",
          "On the API layer, I build RESTful endpoints that adhere to consistent HTTP conventions and predictable JSON response structures. I implement token-based authentication (such as JWT or session tokens with secure HTTP-only cookies), role-based permissions, and rate limiting to protect endpoints against abuse. When integrating external services — such as payment gateways, SMS alerts, or transactional email providers — I implement retry logic and error logging so unexpected outages do not corrupt database records."
        ]
      },
      {
        heading: "Deployment, Monitoring & Developer Handover",
        paragraphs: [
          "A project is only complete when it is securely deployed, monitored, and thoroughly documented for handoff. I help you set up production hosting environments on platforms such as Vercel, Render, DigitalOcean, or AWS, configuring SSL certificates, environment variables, and automated build pipelines from your GitHub repository.",
          "At the end of an engagement, you own 100% of the code, repositories, and deployment configurations. I provide clean documentation covering how to run the project locally, deploy updates, run database migrations or backups, and configure third-party services. If your in-house team needs a walkthrough or ongoing technical support, I am available on a flexible retainer basis."
        ]
      }
    ],
    faq: [
      { q: "Do I need to hire separate frontend and backend developers?", a: "For most small and medium projects, one full stack developer is enough and keeps communication simple." },
      { q: "Can you handle hosting and deployment?", a: "Yes, I can help set up and deploy your project. Tell me what you already use and I'll work with it." },
      { q: "How do we start?", a: "Book a 20-minute call or send the inquiry form." },
      { q: "Which tech stack do you recommend for a new web project?", a: "For most web applications, I recommend Next.js or React on the frontend, Node.js on the backend, and MongoDB or PostgreSQL for the database. This stack offers fast development velocity, excellent developer tooling, and flexible hosting options." },
      { q: "How do you handle user authentication and security?", a: "I implement secure authentication using NextAuth, Auth0, or custom JWT/session cookies with HTTP-only and SameSite flags, password hashing with bcrypt, input sanitization, and role-based access control." },
      { q: "Can you work with my existing database or third-party APIs?", a: "Yes. I frequently connect to existing MongoDB or SQL databases, integrate third-party APIs (Stripe, Twilio, SendGrid, Resend), and build custom middleware to bridge new interfaces with legacy backend systems." }
    ]
  },
  "typescript-developer": {
    skill: "TypeScript",
    title: "Hire a TypeScript Developer | React, Next.js, Node",
    description: "Hire a TypeScript developer for maintainable React, Next.js and Node.js projects. 12+ years of industry experience. Start with a 20-minute call.",
    h1: "Hire a TypeScript Developer for Maintainable Web Apps",
    intro: "TypeScript catches many bugs before your users see them and makes a codebase easier to hand over and grow. I'm Ramkumar Khubchandani, with 12+ years of industry experience, and I use TypeScript with React, Next.js and Node.js.",
    whatIBuild: ["Typed React and Next.js applications", "Node.js backends with clear, typed data models", "Gradual migration of JavaScript projects to TypeScript"],
    projects: ["kids", "soraya"],
    sections: [
      {
        heading: "Typical TypeScript Engagements I Take On",
        paragraphs: [
          "With over 12 years of software engineering experience, I help product teams and business owners build, refactor, and maintain web applications using TypeScript. My freelance TypeScript engagements generally center on four key scenarios: building new React, Next.js, and Node.js codebases with strict type safety from day one; conducting gradual, non-breaking migrations of legacy JavaScript applications to TypeScript; establishing shared type definitions between front-end and back-end systems; and auditing existing TypeScript projects to eliminate unsafe 'any' types and runtime type errors.",
          "TypeScript is particularly valuable for applications with complex data models, multi-step forms, or collaborative engineering teams. By catching type mismatches and missing properties during development, it prevents entire categories of production bugs before code ever reaches your end users. Whether you are building a new application or strengthening an established codebase, I bring clean typing practices that enhance developer velocity without over-complicating everyday code.",
          "For startups seeking clean engineering foundations, I set up TypeScript configurations, tsconfig presets, strict linting rules, and typed API contracts so that future developers can contribute quickly and confidently."
        ]
      },
      {
        heading: "Migrating a JavaScript Codebase Safely",
        paragraphs: [
          "Migrating an established JavaScript codebase to TypeScript can feel daunting, but it does not require a disruptive, all-or-nothing rewrite. I employ an incremental migration strategy that allows your team to continue shipping features while progressively increasing type safety. We configure tsconfig with allowJs enabled, begin by typing shared data models and utility functions, and systematically migrate files from .js/.jsx to .ts/.tsx in prioritized batches.",
          "Throughout the migration, I focus on typing high-risk areas first — such as API request and response boundaries, state management stores, and critical business calculations. We resolve syntax ambiguities and runtime assumptions without relying on permissive 'any' shortcuts, ensuring that each migrated module provides real compile-time guarantees."
        ]
      },
      {
        heading: "Typing React, Next.js & Node.js Systems",
        paragraphs: [
          "Effective TypeScript development requires deep familiarity with the frameworks in use. In React and Next.js, I type component props, custom hook return values, polymorphic UI elements, and server action payloads. I ensure that Server Component async data fetching is typed end-to-end, so that UI components receive strictly verified props that mirror database queries.",
          "On the backend with Node.js and Express or NestJS, I write typed data transfer objects (DTOs), request handlers, and database schema interfaces with Mongoose or Prisma. Where full-stack repositories or monorepos are utilized, I structure shared type packages so that any schema change on the backend immediately alerts the frontend team at compile time, eliminating silent breaking changes across service boundaries."
        ]
      },
      {
        heading: "Code Quality, Strictness & Developer Handoff",
        paragraphs: [
          "TypeScript should make development smoother and more predictable, not slower or filled with frustrating type gymnastics. I advocate for pragmatic type systems: writing clear interfaces and union types that accurately reflect your domain model, while avoiding deeply nested generic gymnastics that obscure code readability for other engineers on your team.",
          "I configure ESLint, Prettier, and automated pre-commit type checking (with Husky or GitHub Actions) to maintain consistent code quality across your repository. When handing over the codebase, I provide clear documentation explaining type conventions, build configurations, and guidelines for adding new models, ensuring that your team can maintain and expand the project with confidence."
        ]
      }
    ],
    faq: [
      { q: "Should my project use TypeScript?", a: "For anything you expect to grow or hand to other developers, usually yes. For a very small one-off page it may not matter. I'll give you an honest recommendation." },
      { q: "Can you convert my JavaScript project to TypeScript?", a: "Yes, usually step by step so nothing breaks. I'll review the code first." },
      { q: "How do we start?", a: "Book a 20-minute call or send the inquiry form." },
      { q: "Do you use strict TypeScript compiler settings?", a: "Yes. For new projects, I recommend strict mode with noImplicitAny and strictNullChecks enabled. For migrations, we start with pragmatic settings and increase strictness step-by-step as coverage expands." },
      { q: "Can you share TypeScript types between frontend and backend?", a: "Yes. In full-stack or monorepo setups, we can define shared type packages or DTO interfaces so both the Next.js frontend and Node.js backend consume identical type definitions, preventing drift." },
      { q: "How do you handle runtime validation alongside TypeScript?", a: "TypeScript only validates at compile time. For runtime boundaries (such as user input and external API responses), I pair TypeScript with validation libraries like Zod or Yup to guarantee runtime data integrity." }
    ]
  },
  "nodejs-developer": {
    skill: "Node.js",
    title: "Hire Node.js Developer | Freelance, India & Remote",
    description: "Hire a freelance Node.js developer for API development, consulting, and dedicated support. 12+ years experience. Available for India & remote teams.",
    h1: "Hire a Freelance Node.js Developer & Backend Consultant",
    intro: "I'm Ramkumar Khubchandani, a backend and full-stack software engineer with 12+ years of industry experience. I build high-throughput Node.js backends, secure REST and GraphQL APIs, and scalable database integrations for startups, digital agencies, and engineering teams across India and globally.",
    whatIBuild: [
      "RESTful and GraphQL APIs built with clean MVC or modular layered architectures",
      "Event-driven microservices, background job queues, and webhook processing pipelines",
      "High-performance database layers with MongoDB, Mongoose, PostgreSQL, and Redis caching",
      "Role-based authentication systems using JWT, OAuth2, and secure session management",
      "Automated unit and integration test suites using Jest, Mocha, and Supertest"
    ],
    projects: ["soraya"],
    showTestimonial: true,
    sections: [
      {
        heading: "Typical Node.js Engagements I Take On",
        paragraphs: [
          "As a freelance Node.js developer with over 12 years of hands-on experience, I partner with companies at various stages of their product lifecycle. My engagements generally fall into six core categories: end-to-end greenfield backend builds, architecture audits, targeted performance tuning, framework migrations, project turnarounds, and ongoing part-time engineering support.",
          "For new product builds, I architect clean, scalable server-side systems from day one. I establish folder conventions, request validation, environment configuration, error-handling middleware, and structured logging. For existing applications experiencing performance bottlenecks, I conduct deep profiling to uncover event-loop blocking, memory leaks, unindexed database queries, and redundant network calls.",
          "When an existing backend has stalled due to team transitions or technical debt, I step in to audit the codebase, document the architecture, resolve blocking bugs, and establish steady delivery cadences. Furthermore, I offer ongoing part-time retainer support for teams that require high-caliber backend expertise without the financial commitment of a full-time senior hire."
        ]
      },
      {
        heading: "Technical Scope: Express, NestJS, APIs & Databases",
        paragraphs: [
          "My Node.js consulting spans modern backend technologies and enterprise engineering patterns. I primarily develop with Express.js and NestJS, selecting the framework that best aligns with project scale and architectural requirements. Express provides a lightweight, highly flexible foundation suitable for focused microservices and rapid API prototypes, while NestJS offers opinionated TypeScript architecture, dependency injection, and enterprise-grade maintainability.",
          "In the data layer, I have extensive experience with MongoDB and Mongoose, designing schema models with proper compound indexes, data validation, and complex aggregation pipelines. When caching and session acceleration are required, I integrate Redis for distributed locking and sub-millisecond data retrieval. On the API design front, I implement both RESTful contracts following OpenAPI/Swagger specifications and GraphQL APIs with schema-first stitching.",
          "Security and testing are embedded into every deliverable. I configure rate limiting with express-rate-limit, input sanitization, Helmet headers, CORS policies, and token rotation. Automated test suites written in Jest and Supertest ensure regression-free releases and smooth CI/CD pipeline runs."
        ]
      },
      {
        heading: "Production Reliability, Event-Loop Hygiene & Database Optimization",
        paragraphs: [
          "Building with Node.js requires an acute understanding of its single-threaded asynchronous runtime. Heavy CPU-bound computations, unhandled promise rejections, or unindexed database queries can easily freeze the event loop and degrade latency for all concurrent users. In every engagement, I audit asynchronous patterns to ensure promises are chained correctly, streams are utilized for large data transfers, and memory consumption remains stable under load.",
          "For databases, I analyze slow query logs and apply targeted indexing strategies in MongoDB to prevent costly full collection scans. When integrating third-party APIs or payment webhooks, I build fault-tolerant worker queues using Redis and BullMQ, implementing exponential backoff retries and dead-letter queues so transient external failures never result in lost customer transactions."
        ]
      },
      {
        heading: "How Engagement & Collaboration Works",
        paragraphs: [
          "Every freelance collaboration begins with an introductory discovery call or a detailed written inquiry where we examine your project requirements, target milestones, and current architectural challenges. I believe in complete transparency: if your requirements fall outside my primary technical strengths, I will tell you candidly during our initial conversation.",
          "Following our initial discussion, I provide a clear, written proposal outlining the precise scope of work, technical approach, milestone deliverables, and estimated timeline. Engagements can be structured either on an hourly consulting basis or as milestone-based fixed-price contracts for clearly specified scopes.",
          "All invoicing and payments are arranged directly with me via direct bank transfer or international wire after agreed milestones or timesheets are approved. There are no payments or platform commissions processed through this website. Throughout the engagement, I provide regular progress demos, pull requests with clear documentation, and prompt communication over Slack, Discord, or WhatsApp."
        ]
      },
      {
        heading: "Who This Consulting Service Suits",
        paragraphs: [
          "My freelance Node.js development and consulting services are tailored for three primary client groups: early-stage tech startups, digital agencies, and small-to-medium businesses with established web applications.",
          "For seed and Series-A startups, I act as an experienced backend architect who can quickly turn product specifications into stable, production-ready APIs that support web and mobile frontends. I help founders avoid costly technical debt early on while keeping development velocity high.",
          "For digital design and marketing agencies, I provide senior engineering firepower to execute custom backend features, third-party webhook integrations, and client CMS architectures that exceed internal capacity. For small businesses, I provide dependable modernization and maintenance for critical web portals, eliminating downtime and improving server responsiveness."
        ]
      }
    ],
    faq: [
      {
        q: "Do you build backend APIs with Express or NestJS?",
        a: "I work with both Express and NestJS. Express is ideal for lightweight services, serverless endpoints, and custom architectures. NestJS is my preference for larger enterprise applications requiring TypeScript strictness, dependency injection, and standardized modular structure."
      },
      {
        q: "How do you optimize MongoDB performance in Node.js applications?",
        a: "I inspect execution stats with explain plans, eliminate unindexed collection scans, create compound and partial indexes, optimize schema design to avoid deep population overhead, and leverage Redis caching for frequently queried read operations."
      },
      {
        q: "Can you rescue or refactor a legacy or poorly performing Node.js codebase?",
        a: "Yes. I frequently step into legacy codebases to untangle callback pyramids, resolve memory leaks, implement centralized error handling, and upgrade outdated npm dependencies step-by-step with zero customer downtime."
      },
      {
        q: "How do you approach automated testing and code quality?",
        a: "I write automated integration and unit tests using Jest, Mocha, and Supertest. Every critical business path, authorization rule, and API endpoint is validated with tests to ensure long-term stability and regression resistance."
      },
      {
        q: "Can you integrate third-party payment gateways and webhooks?",
        a: "Yes. I have implemented integrations with Stripe, PayPal, Razorpay, and custom webhook listeners with cryptographic signature verification, idempotency keys, and retry queues."
      },
      {
        q: "What are your rates and how do payments work?",
        a: "Rates start from $30/hr as noted in the shared rate section, with fixed-scope quotes available for well-defined deliverables. Payment is arranged directly via bank transfer or wire; no payments are processed through this website."
      }
    ]
  },
  "vuejs-developer": {
    skill: "Vue.js",
    title: "Hire Vue.js Developer | Freelance, India & Remote",
    description: "Hire a freelance Vue.js developer and consultant for Vue 3, Pinia, and Nuxt apps. 12+ years industry experience. Available for India & remote clients.",
    h1: "Hire a Senior Freelance Vue.js Developer & Consultant",
    intro: "I'm Ramkumar Khubchandani, a front-end and full-stack software engineer with 12+ years of industry experience. I build elegant, reactive web interfaces, enterprise dashboards, and search-friendly Nuxt applications using Vue 3, the Composition API, and TypeScript for businesses worldwide.",
    whatIBuild: [
      "Modern single-page applications engineered with Vue 3, Composition API, and script setup",
      "Search-engine-optimized, fast-loading web portals and marketing sites with Nuxt 3",
      "Scalable client state management and data caching architectures utilizing Pinia",
      "Reusable, accessible UI component libraries and design systems styled with Tailwind CSS",
      "Methodical codebase upgrades from legacy Vue 2 Options API to modern Vue 3 syntax"
    ],
    projects: [],
    showTestimonial: false,
    sections: [
      {
        heading: "Typical Vue.js Engagements & Project Scopes",
        paragraphs: [
          "With over 12 years of web development experience, I assist product teams and digital businesses through every phase of Vue.js development. Typical engagements include building new front-end applications from scratch, modernizing existing Vue applications, conducting architectural code reviews, optimizing runtime reactivity, and stepping in to rescue stalled projects.",
          "When companies need to upgrade from deprecated Vue 2 codebases to Vue 3, I provide structured migration roadmaps. I audit outdated dependencies, replace Vuex with Pinia, refactor Options API components into the Composition API, and ensure that test coverage remains solid throughout the transition.",
          "For digital agencies and product companies experiencing sudden capacity crunches, I provide ongoing part-time consulting. Whether you need an experienced engineer to build complex interactive features, integrate backend REST or GraphQL endpoints, or optimize user interface responsiveness, I deliver production-ready code with clear handoff documentation."
        ]
      },
      {
        heading: "Technical Scope: Vue 3, Nuxt 3 & Modern Tooling",
        paragraphs: [
          "My technical scope is built around current Vue ecosystem best practices. I prioritize Vue 3 with TypeScript, leveraging `<script setup>` syntax and custom composables to encapsulate stateful logic cleanly. This modular architecture makes front-end codebases significantly easier to test, maintain, and scale across multi-developer teams.",
          "For projects requiring server-side rendering (SSR), static site generation (SSG), or strict technical SEO compliance, I build with Nuxt 3. Nuxt enables automatic routing, optimized bundle splitting, server-side data fetching via `useAsyncData`, and universal state handling that ensures pages load instantly for search engines and real users alike.",
          "State management is handled via Pinia, the official lightweight store for Vue, eliminating the verbose mutations and boilerplates of legacy Vuex. I style interfaces with Tailwind CSS and headless UI primitives to create accessible, responsive, and cross-browser compatible layouts that adhere to modern WCAG accessibility guidelines."
        ]
      },
      {
        heading: "Front-End Performance, Reactivity Hygiene & Clean Architecture",
        paragraphs: [
          "Modern front-end applications frequently suffer from excessive re-rendering and bloated JavaScript bundles if reactivity is mismanaged. In Vue 3, using `ref` and `reactive` inappropriately with large nested datasets can introduce subtle memory leaks or sluggish component updates. I implement `shallowRef` and computed memoization to ensure that table renders and dynamic dashboards remain smooth at 60fps.",
          "I also optimize the build and delivery pipeline using Vite. By configuring dynamic component imports, vendor chunk splitting, and tree-shaking unused icon sets or third-party libraries, I keep initial bundle sizes minimal. This ensures fast Core Web Vitals, improved Google Lighthouse scores, and a snappy user experience even on slower mobile data connections."
        ]
      },
      {
        heading: "How Engagement & Collaboration Works",
        paragraphs: [
          "The engagement begins with a brief discovery call or written message where we discuss your application goals, target user experience, design assets (such as Figma or Adobe XD), and technical timeline. I provide candid feedback on technical feasibility and help identify the most efficient implementation strategy.",
          "Once requirements are clear, I provide a written scope document detailing milestones, architecture choices, deliverable timelines, and transparent pricing. You can engage me on an hourly consulting basis for exploratory tasks or on a fixed-price milestone basis for well-scoped applications.",
          "Financial arrangements are settled directly with me via direct bank transfer or international wire upon completion of agreed milestones. There are no billing systems or payments processed on this website. Throughout our sprint, you receive regular Git commits, deployable staging previews, and open communication via your preferred collaboration channels."
        ]
      },
      {
        heading: "Who Benefits From My Vue.js Consulting",
        paragraphs: [
          "My freelance Vue.js services are designed for founders, engineering leads, and creative agencies looking for senior-level execution without administrative friction. Startups benefit from my ability to take an idea from wireframes to an interactive, deployable MVP with high performance and zero architectural shortcuts.",
          "Digital agencies hire me when they need reliable technical execution on client deadlines, knowing that I deliver responsive, cross-browser tested interfaces that require minimal internal supervision. Small-to-medium businesses hire me to modernize outdated internal portals and dashboards, making them faster, mobile-friendly, and enjoyable for employees to use daily."
        ]
      }
    ],
    faq: [
      {
        q: "Can you help migrate our legacy Vue 2 application to Vue 3?",
        a: "Yes. I plan and execute gradual migrations from Vue 2 to Vue 3, replacing deprecated syntax, converting Options API components to the Composition API, transitioning Vuex stores to Pinia, and updating build configurations from Webpack to Vite."
      },
      {
        q: "Do you build with Nuxt 3 for SEO and SSR requirements?",
        a: "Yes. Nuxt 3 is my preferred framework when applications require server-side rendering, hybrid pre-rendering, search engine discoverability, and rapid initial page loads with automatic code splitting."
      },
      {
        q: "Why should we choose Pinia over Vuex for global state?",
        a: "Pinia is the official Vue state management solution. It is extremely lightweight, offers complete TypeScript auto-completion without boilerplate, removes mutations in favor of direct state actions, and supports modular store slicing out of the box."
      },
      {
        q: "Can you work from Figma designs to pixel-perfect Vue components?",
        a: "Yes. I convert Figma, Sketch, and Adobe XD designs into responsive, accessible Vue components styled with Tailwind CSS, ensuring layout fidelity across desktop, tablet, and mobile breakpoints."
      },
      {
        q: "How do you optimize runtime performance in large Vue applications?",
        a: "I utilize component lazy-loading, shallowRef for large immutable datasets, computed property memoization, debounced reactive inputs, and bundle analysis via Vite to maintain lightweight JavaScript bundles."
      },
      {
        q: "What is your hourly rate and payment process?",
        a: "My standard consulting rate starts from $30/hr as noted in the shared terms, with fixed-scope milestone quotes available after an introductory review. Invoices are paid directly via bank transfer; no transactions occur on this site."
      }
    ]
  },
  "react-native-developer": {
    skill: "React Native",
    title: "Hire React Native Developer | Freelance, India & Remote",
    description: "Hire a freelance React Native developer for iOS & Android apps, Expo, and consulting. 12+ years industry experience. Available for India & remote teams.",
    h1: "Hire a Freelance React Native Developer for Cross-Platform Apps",
    intro: "I'm Ramkumar Khubchandani, a cross-platform mobile developer with 12+ years of industry experience. I build fast, native-feeling iOS and Android applications using React Native and Expo, helping startups, agencies, and businesses launch high-quality mobile products from a single unified codebase.",
    whatIBuild: [
      "Cross-platform iOS and Android applications built with Expo and React Native CLI",
      "Seamless mobile navigation flows with React Navigation, deep linking, and tab bars",
      "Offline-first mobile data architectures with local caching, MMKV, and sync reconciliation",
      "Native device hardware integration including camera, push notifications, and biometrics",
      "End-to-end App Store and Google Play submission, EAS build configuration, and release automation"
    ],
    projects: [],
    showTestimonial: false,
    sections: [
      {
        heading: "Typical React Native Engagements & Project Scopes",
        paragraphs: [
          "With over 12 years in professional software development, I help businesses plan, build, and support mobile applications using React Native. Typical engagements include building new cross-platform apps from the ground up, modernizing legacy mobile apps, troubleshooting sluggish scroll performance, resolving native build errors, and offering ongoing mobile maintenance.",
          "For early-stage startups, I build full-featured MVPs that launch simultaneously on both the Apple App Store and Google Play Store. Sharing business logic, state stores, and UI design across platforms cuts development time and operational costs substantially compared to separate native teams.",
          "For established companies with existing React Native codebases, I diagnose memory bloat, optimize list rendering speeds, resolve native bridging incompatibilities, and manage dependency upgrades. I also provide flexible part-time support for ongoing sprint tasks, crash triage, and complex third-party library updates, allowing your core team to stay focused on high-priority product initiatives."
        ]
      },
      {
        heading: "Technical Scope: Expo, React Native CLI & Mobile Architecture",
        paragraphs: [
          "My mobile development scope centers on modern React Native practices. I work comfortably with both managed Expo workflows and bare React Native CLI setups. Expo with EAS (Expo Application Services) has become the gold standard for rapid builds, continuous integration, over-the-air updates, and simplified native dependency management.",
          "When deep native customization is required, I configure native modules in Swift, Objective-C, Kotlin, and Java, ensuring seamless bridging between native SDKs and the JavaScript runtime. Navigation is structured with React Navigation, supporting complex nested stack navigators, authentication switch flows, and universal deep linking.",
          "Performance is essential on mobile devices. I employ React Native Reanimated and Gesture Handler to run gestures and fluid animations at 60 frames per second on the native thread. For data storage, I implement high-performance local databases such as MMKV and WatermelonDB to guarantee snappy offline access and instant user feedback."
        ]
      },
      {
        heading: "Mobile Performance Tuning, Offline Storage & Native Thread Ergonomics",
        paragraphs: [
          "Delivering a truly native experience in React Native requires avoiding JS-thread bottlenecks. When heavy JavaScript logic runs during screen transitions or list scrolling, frame drops occur. I utilize React Native Reanimated worklets to compute gestures and layout animations directly on the UI thread without crossing the bridge.",
          "For list rendering with hundreds or thousands of records, I replace standard ScrollViews with FlashList or meticulously configured FlatLists, tuning `windowSize`, `getItemLayout`, and element memoization. For offline resilience, I architect sync pipelines that store drafts and credentials securely in MMKV or encrypted keychain storage. This ensures zero data loss during network dropouts and provides a fluid, resilient user experience even in low-connectivity mobile environments."
        ]
      },
      {
        heading: "How Engagement & Collaboration Works",
        paragraphs: [
          "Collaboration begins with an intro conversation where we review your mobile app concept, target user flows, wireframes or Figma prototypes, and required native capabilities (such as background location, Bluetooth, camera, or payment processing). I provide practical technical recommendations on platform constraints and realistic release targets.",
          "Following our call, I outline a clear scope document containing feature milestones, testing checkpoints, store submission schedules, and pricing. You can hire me on an hourly consulting arrangement or with a fixed-scope milestone agreement tailored to your delivery schedule.",
          "Payment is managed directly between us via direct bank transfer or international wire upon completion and verification of agreed milestones. There are no on-platform payments or intermediate fees. During development, you receive continuous test builds via Expo Go, TestFlight, and Google Play Internal Testing for hands-on verification."
        ]
      },
      {
        heading: "Who It Suits: Startups, Agencies & Product Teams",
        paragraphs: [
          "My freelance React Native services are ideal for tech startups looking to reach both iOS and Android audiences on an efficient budget without sacrificing native responsiveness. Founders get an experienced mobile engineer who understands both user experience subtleties and the strict review guidelines of Apple and Google.",
          "Digital agencies hire me to fulfill client mobile contracts without having to maintain full-time mobile developers on payroll. Small businesses already running React on the web hire me to translate their existing business logic into dedicated mobile applications that increase client engagement and retention."
        ]
      }
    ],
    faq: [
      {
        q: "Should we build our mobile application with Expo or React Native CLI?",
        a: "For most new projects, Expo with EAS Build is the recommended choice due to seamless updates, simple native library config plugins, and streamlined App Store releases. If your app requires custom proprietary C++ or low-level native SDKs, bare React Native CLI is also fully supported."
      },
      {
        q: "Do you handle App Store and Google Play Store submissions?",
        a: "Yes. I configure app certificates, provisioning profiles, privacy manifests, store assets, metadata, and guide your application through Apple App Review and Google Play Console publishing."
      },
      {
        q: "How do you achieve smooth 60fps animations in React Native?",
        a: "I use React Native Reanimated and Gesture Handler to execute animations directly on the UI thread without crossing the asynchronous React Native bridge. I also optimize FlatList and FlashList components with windowSize tuning and memoization."
      },
      {
        q: "How much code can genuinely be shared between iOS and Android?",
        a: "Typically 85% to 95% of business logic, state management, API hooks, and UI presentation is shared between iOS and Android. Platform-specific styling adjustments and native permissions are handled cleanly through platform extensions."
      },
      {
        q: "Can you fix build failures or upgrade an outdated React Native project?",
        a: "Yes. I frequently resolve CocoaPods dependency conflicts, Gradle build failures, and upgrade older React Native versions to current stable releases with updated Android target SDKs."
      },
      {
        q: "What are your consulting rates and how do we start?",
        a: "Rates start from $30/hr as detailed in the shared rate information, with fixed milestone quotes available after scoping. Payments are handled directly via bank transfer or wire; this website does not process payments."
      }
    ]
  },
  "redux-developer": {
    skill: "Redux",
    title: "Hire Redux Developer | Freelance, India & Remote",
    description: "Hire a freelance Redux developer for Redux Toolkit, RTK Query, and state architecture. 12+ years industry experience. Available for India & remote teams.",
    h1: "Hire a Senior Freelance Redux & Redux Toolkit Developer",
    intro: "I'm Ramkumar Khubchandani, a front-end architecture specialist with 12+ years of industry experience. I architect predictable, performant state management systems for complex React applications, eliminating re-render bottlenecks, untangling legacy boilerplate, and modernizing stores with Redux Toolkit and RTK Query.",
    whatIBuild: [
      "Predictable global application state architectures built with modern Redux Toolkit (RTK)",
      "Automated server data caching, polling, and optimistic UI updates using RTK Query",
      "Complex asynchronous workflows, side effects, and transaction pipelines using Redux Thunk and Redux Saga",
      "Systematic migrations from legacy boilerplate Redux (action creators and switch reducers) to clean RTK slices",
      "Fine-grained selector architectures with Reselect to eliminate unnecessary component re-renders"
    ],
    projects: ["soraya"],
    showTestimonial: true,
    sections: [
      {
        heading: "Typical Redux Engagements & Architecture Scopes",
        paragraphs: [
          "With over 12 years of specialized JavaScript and React engineering experience, I assist teams dealing with complex, high-scale application state. Typical engagements include conducting state architecture audits, modernizing legacy Redux codebases, migrating from manual API fetching to RTK Query, decoupling UI state from server cache, and tuning component render performance.",
          "Many mature React applications suffer from sprawling Redux stores written years ago with verbose action constants, boilerplate creators, and deeply nested immutable reducers. I refactor these systems into maintainable Redux Toolkit slices, dramatically reducing code volume while maintaining backward compatibility and zero disruption to users.",
          "For enterprise dashboards and SaaS platforms experiencing sluggish input response or laggy table updates, I perform profiling using the React DevTools Profiler and Redux DevTools. I pinpoint re-render cascades, implement memoized Reselect selectors, and normalize deeply nested entity states, eliminating unnecessary DOM updates and restoring silky 60fps responsiveness across the entire application interface."
        ]
      },
      {
        heading: "Technical Scope: Redux Toolkit, RTK Query, Thunk & Saga",
        paragraphs: [
          "My technical scope covers the entire evolution of the Redux ecosystem with a strong focus on modern Redux Toolkit (RTK). I configure stores using `configureStore` with pre-configured Redux DevTools and immutability checks via Immer. By organizing state into domain slices using `createSlice`, boilerplate is virtually eliminated.",
          "For server communication, I implement RTK Query. RTK Query eliminates hundreds of lines of manual `useEffect` fetching code by managing caching, deduplication, cache invalidation tags, and optimistic updates automatically. This creates a clean boundary between transient server data and genuine global client UI state.",
          "When applications require complex, event-driven asynchronous orchestration—such as financial trading interfaces, multi-step booking wizards, or concurrent upload managers—I architect robust side-effect layers using Redux Thunk or Redux Saga with generator functions. All stores and selectors are strictly typed in TypeScript to catch state anomalies at compile time."
        ]
      },
      {
        heading: "Eliminating Re-Render Cascades, Normalization & Store Hygiene",
        paragraphs: [
          "A common performance pitfall in large React codebases is component over-rendering caused by non-memoized selectors returning new object or array references on every dispatch. When dozens of components listen to root state updates, user typing or table filtering can become noticeably laggy. I audit selectors using Reselect, ensuring that computations only re-execute when their exact dependencies change.",
          "Furthermore, I normalize deeply nested relational entities using `createEntityAdapter` from Redux Toolkit. Storing data by unique IDs rather than complex nested arrays enables fast O(1) lookups, simplifies update reducers, and prevents massive re-renders across the component tree when a single item changes."
        ]
      },
      {
        heading: "How Engagement & Collaboration Works",
        paragraphs: [
          "We begin with a discovery conversation or an initial code audit where we inspect your existing store structure, component coupling, and state management challenges. I provide an honest assessment of whether your application requires full Redux Toolkit modernization or targeted selector optimization.",
          "Following the review, I deliver a written plan with defined milestones, implementation phases, estimated hours, and pricing. You can engage me on an hourly consulting basis for targeted architectural reviews or on a milestone basis for store migrations and feature rollouts.",
          "Invoicing and payments are settled directly between us via direct bank transfer or wire transfer upon milestone approval. There are no payments or transactions processed on this website. Throughout the contract, you receive detailed pull requests with thorough test coverage and architectural explanation notes."
        ]
      },
      {
        heading: "Who Benefits From Dedicated Redux Consulting",
        paragraphs: [
          "My freelance Redux services are tailored for engineering teams building data-intensive web applications. SaaS companies, fintech portals, and health-tech applications with extensive tables, forms, and multi-user permissions benefit tremendously from normalized, reliable state management.",
          "Agencies and development teams who have inherited bloated React applications hire me to clean up state architecture so their in-house developers can ship features faster without fearing regression bugs. Startups building rich dashboards hire me to establish sound state patterns from day one, preventing unmanageable spaghetti code and ensuring that newly hired engineers can contribute quickly with confidence."
        ]
      }
    ],
    faq: [
      {
        q: "Why should our team migrate from legacy Redux to Redux Toolkit?",
        a: "Redux Toolkit is the official, modern way to write Redux. It reduces boilerplate by over 70%, includes Immer out of the box for safe mutable-style updates, simplifies store configuration, and integrates first-class TypeScript support without manual action type definitions."
      },
      {
        q: "When is Redux Saga needed instead of Redux Thunk or RTK Query?",
        a: "RTK Query and Redux Thunk satisfy 95% of application needs for data fetching and async logic. Redux Saga is recommended when you have complex concurrent side-effects, such as debounced search cancellation, complex retry loops, or event-driven background polling."
      },
      {
        q: "How does RTK Query eliminate data-fetching boilerplate?",
        a: "RTK Query generates custom React hooks automatically from endpoint definitions. It manages loading states, response caching, request deduplication, and cache invalidation tags without requiring manual reducers or dispatch actions."
      },
      {
        q: "How do you diagnose and eliminate unnecessary component re-renders?",
        a: "I use the React DevTools Profiler to trace re-render triggers, verify selector reference stability, implement memoized selectors with createSelector from Reselect, and normalize nested relational data with createEntityAdapter."
      },
      {
        q: "Can you migrate our codebase to Redux Toolkit incrementally without breaking existing features?",
        a: "Yes. Redux Toolkit is 100% interoperable with existing Redux code. We can introduce modern slices and RTK Query endpoints alongside legacy reducers without needing a risky full rewrite."
      },
      {
        q: "What are your rates and how are payments handled?",
        a: "Rates start from $30/hr as noted in the shared terms, with fixed quotes provided for well-defined refactoring scopes. Payments are handled directly via bank transfer or wire; this website does not process payments."
      }
    ]
  }
};


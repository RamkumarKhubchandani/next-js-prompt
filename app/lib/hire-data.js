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
    title: "Hire React Developer | Freelance, India & Remote",
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
    title: "Hire Next.js Developer | Freelance, India & Remote",
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
          "Throughout the migration, I focus on typing high-risk areas first — such as API request and response boundaries, state management stores, and critical business calculations. We resolve syntax ambiguities and runtime assumptions without relying on permissive 'any' shortcuts, ensuring that each migrated module provides real compile-time type safety."
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
      { q: "How do you handle runtime validation alongside TypeScript?", a: "TypeScript only validates at compile time. For runtime boundaries (such as user input and external API responses), I pair TypeScript with validation libraries like Zod or Yup to validate runtime data integrity." }
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
          "Performance is essential on mobile devices. I employ React Native Reanimated and Gesture Handler to run gestures and fluid animations at 60 frames per second on the native thread. For data storage, I implement high-performance local databases such as MMKV and WatermelonDB to support snappy offline access and instant user feedback."
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
        a: "Most of the business logic, state management, API hooks, and UI presentation is shared between iOS and Android. Platform-specific styling adjustments and native permissions are handled cleanly through platform extensions."
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
        a: "Redux Toolkit is the official, modern way to write Redux. It greatly reduces boilerplate, includes Immer out of the box for safe mutable-style updates, simplifies store configuration, and integrates first-class TypeScript support without manual action type definitions."
      },
      {
        q: "When is Redux Saga needed instead of Redux Thunk or RTK Query?",
        a: "RTK Query and Redux Thunk cover most application needs for data fetching and async logic. Redux Saga is recommended when you have complex concurrent side-effects, such as debounced search cancellation, complex retry loops, or event-driven background polling."
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
  },
  "angular-developer": {
    skill: "Angular",
    title: "Hire Angular Developer | Freelance, India & Remote",
    description: "Hire a freelance Angular developer for standalone components, signals, RxJS state, and performance tuning. 12+ years experience. Remote & India.",
    h1: "Hire an Experienced Freelance Angular Developer",
    intro: "I'm Ramkumar Khubchandani, a software engineer with 12+ years of industry experience. I help companies build, modernize, and stabilize Angular web applications, focusing on scalable dashboard state with RxJS, modern standalone architectures with signals, and clean performance optimization.",
    whatIBuild: [
      "Enterprise web applications and operational dashboards with complex RxJS data streams",
      "Gradual migrations from legacy NgModule architectures to modern standalone components and signals",
      "Change detection audits and performance tuning using ChangeDetectionStrategy.OnPush",
      "Automated test suites for services, components, and data pipelines using Jest and TypeScript",
      "Clean integration with Node.js, REST APIs, and third-party backend services"
    ],
    projects: [],
    showTestimonial: false,
    sections: [
      {
        heading: "When Angular is the Right Choice Over React",
        paragraphs: [
          "Choosing between Angular and React comes down to architectural philosophy and team organizational needs. React is a flexible UI library that requires teams to select and assemble their own routing, form handling, state management, and build tools. For many organizations, this flexibility eventually leads to fragmentation, where different internal teams build incompatible architectures that become difficult to maintain over several years.",
          "Angular provides an opinionated, batteries-included engineering platform out of the box. It includes a mature router, typed reactive forms, dependency injection, an HTTP client with interceptor support, and first-class TypeScript integration by default. When building large enterprise applications or unified corporate dashboards where dozens of developers collaborate, Angular eliminates endless debates over foundational tooling. Every Angular engineer understands where services live, how routing is declared, and how data flows through components, dramatically reducing onboarding overhead and long-term maintenance friction.",
          "React remains a superior choice when building lightweight embeddable widgets, highly experimental user interfaces, or decoupled micro-frontends with customized rendering pipelines. Angular is the right choice when you need a cohesive, enterprise-grade architecture where standardized conventions, rigorous typing, and built-in tooling are prioritized over ad-hoc customization."
        ]
      },
      {
        heading: "RxJS and State Management in Large Dashboards",
        paragraphs: [
          "Data-intensive enterprise dashboards frequently struggle with state synchronization, laggy UI updates, and subtle memory leaks caused by unmanaged reactive subscriptions. In Angular, RxJS observables provide a powerful stream-based foundation for handling asynchronous events, user inputs, and live server updates, but they require strict architectural hygiene.",
          "I structure dashboard state using declarative RxJS pipelines rather than imperative subscription callbacks. By leveraging higher-order mapping operators like switchMap, mergeMap, and concatMap alongside combination operators like combineLatest and forkJoin, complex asynchronous workflows are expressed as predictable, traceable data streams. Shared data streams are cached cleanly using shareReplay to avoid redundant HTTP requests when multiple dashboard widgets display the same underlying metrics.",
          "Crucially, I avoid manual .subscribe() calls inside Angular component classes. Instead, components expose read-only observable streams consumed directly in templates via the async pipe, or converted into signals. This pattern ensures that subscriptions are automatically cleaned up when components are destroyed, eliminating one of the most common sources of memory leaks in production Angular dashboards."
        ]
      },
      {
        heading: "Migrating NgModules to Standalone Components and Signals",
        paragraphs: [
          "Modern Angular development has shifted decisively toward standalone components, directives, and pipes, leaving behind the cumbersome ceremony of NgModules. Legacy NgModule architectures often suffer from monolithic SharedModules that import hundreds of unrelated dependencies, obscuring component boundaries and bloating initial JavaScript bundle sizes.",
          "I plan and execute phased migrations from NgModule-based projects to standalone architectures. The migration begins by converting leaf components, utility pipes, and shared directives to standalone: true, decoupling them from sprawling modules. Once components are standalone, feature modules can be eliminated entirely, and route definitions can be converted to functional lazy-loading routes using loadComponent and loadChildren.",
          "Alongside standalone components, I introduce Angular signals for synchronous reactivity. Signals provide fine-grained, dependency-tracked reactive primitives that eliminate the need to create complex RxJS Subject pipelines for simple local component state. Using signal(), computed(), and toSignal(), state transformations become immediately readable, eliminating boilerplate while maintaining flawless interoperability with existing RxJS streams."
        ]
      },
      {
        heading: "OnPush Change Detection and Runtime Performance",
        paragraphs: [
          "By default, Angular relies on change detection cycles to intercept asynchronous browser events and check template expressions across the entire component tree. In large dashboards with dense data tables, interactive charts, and frequent timer updates, checking every component on every tick causes noticeable frame drops, sluggish scrolling, and delayed user input response.",
          "I audit and optimize Angular applications by converting component hierarchies to ChangeDetectionStrategy.OnPush. Under OnPush, Angular only evaluates a component template when an input reference changes, an event originated within that component, or an bound signal updates. This drastically reduces the number of change detection checks per second.",
          "To maximize OnPush performance, I enforce immutable data patterns across services and components, preventing in-place object mutations that fail to trigger template updates. I also implement trackBy functions in loop directives to prevent unnecessary DOM node recreation during list reordering, remove expensive function invocations from template interpolations, and run high-frequency event listeners outside the Angular zone when appropriate."
        ]
      },
      {
        heading: "Testing Angular Services, Components, and Pipes",
        paragraphs: [
          "A reliable Angular application requires automated test suites that verify business logic and user flows without becoming brittle implementation tests. I write fast, maintainable unit and integration tests using Jest and Vitest, pairing them with TypeScript to ensure comprehensive coverage across critical paths.",
          "For Angular services, I test isolated business logic, data normalization, and HTTP interceptors using mock providers. Reactive streams and complex RxJS operator sequences are tested synchronously using marble testing or TestScheduler, verifying debounce timing, error retry sequences, and caching behaviors without unreliable setTimeout delays.",
          "For UI components, tests focus on user-observable behavior: verifying form validation feedback, confirming accessibility attributes, checking emitted custom events, and ensuring that view templates reflect updated state. Mocking is kept minimal and focused on network boundaries, ensuring that test suites remain fast, reliable, and easy to run in automated CI/CD pipelines."
        ]
      },
      {
        heading: "Typical Failure Modes of Angular Projects",
        paragraphs: [
          "Over years of reviewing Angular applications, several recurring anti-patterns consistently undermine maintainability and performance. The most widespread is the kitchen-sink SharedModule, where utility pipes, third-party libraries, and disparate UI widgets are dumped into a single module imported everywhere, resulting in poor tree-shaking and inflated initial load times.",
          "A second critical failure mode is unmanaged RxJS subscriptions. Developers frequently subscribe to observables in ngOnInit without storing references or unsubscribing in ngOnDestroy, leaving zombie listeners that leak memory and trigger duplicate HTTP calls long after the user has navigated away.",
          "Other frequent failures include abusing two-way data binding with ngModel for complex forms instead of structured Reactive Forms, calling computationally heavy component methods directly inside template bindings, and neglecting to configure trackBy on dynamic lists. Addressing these anti-patterns transforms sluggish, fragile Angular projects into fast, maintainable applications."
        ]
      },
      {
        heading: "When You Should NOT Hire Me",
        paragraphs: [
          "Do not hire me if your project requires legacy AngularJS 1.x maintenance or complex hybrid ngUpgrade architectures; I work exclusively with modern Angular (versions 14 through current stable releases).",
          "Do not hire me if you require an in-person, on-site developer in an external office; I deliver all consulting, development, and code reviews remotely.",
          "Do not hire me if you are looking for a multi-developer agency or an offshore body-shop; I work directly and independently as a senior engineer on your codebase."
        ]
      },
      {
        heading: "How We'd Start",
        paragraphs: [
          "We begin with a focused 20-minute discovery conversation or a written message outlining your application requirements, current pain points, or migration goals.",
          "I conduct an initial assessment of your repository structure, dependency versions, and change detection setup, delivering a written proposal detailing scope, milestone deliverables, and estimated timelines.",
          "Upon agreement, development proceeds in clear, test-driven iterations with frequent staging deployments, structured pull requests, and transparent communication throughout."
        ]
      }
    ],
    faq: [
      {
        q: "What versions of Angular do you work with?",
        a: "I work with modern Angular versions from Angular 14 through current releases, with particular focus on standalone components, signals, and typed reactive forms."
      },
      {
        q: "Can you help migrate our application from NgModules to standalone components?",
        a: "Yes. I plan and execute step-by-step migrations from legacy NgModule architectures to standalone components, eliminating bloated shared modules and modernizing routing."
      },
      {
        q: "How do you prevent RxJS memory leaks in Angular dashboards?",
        a: "I prioritize declarative streams using the async pipe and Angular signals, avoiding manual subscriptions in components and utilizing lifecycle teardown hooks where explicit subscriptions are required."
      },
      {
        q: "Can you optimize performance for slow Angular applications?",
        a: "Yes. I audit change detection cycles, convert components to ChangeDetectionStrategy.OnPush, implement trackBy optimizations, and eliminate template method evaluations."
      },
      {
        q: "Do you handle full-stack integration with Node.js backends?",
        a: "Yes. I regularly integrate Angular frontends with Node.js, Express, and NestJS backends, designing typed REST API contracts and secure authentication flows."
      },
      {
        q: "What are your consulting rates and how are payments structured?",
        a: "Rates start from $30/hr as noted in the shared rate information, with fixed-price milestone quotes available after scoping. Invoicing is settled directly via bank transfer; no payments are processed on this site."
      }
    ]
  },
  "javascript-developer": {
    skill: "JavaScript",
    title: "Hire JavaScript Developer | Freelance, India & Remote",
    description: "Hire a freelance JavaScript developer for event-loop debugging, async race conditions, and bundle optimization. 12+ years experience. Remote & India.",
    h1: "Hire an Experienced Freelance JavaScript Developer",
    intro: "I'm Ramkumar Khubchandani, a software engineer with 12+ years of industry experience. I diagnose and resolve complex JavaScript issues, untangle asynchronous concurrency bugs, optimize client bundle sizes, and write clean, resilient code across both browser and Node.js environments.",
    whatIBuild: [
      "Root-cause diagnosis and resolution for asynchronous race conditions, memory leaks, and event-loop lag",
      "Frontend and backend JavaScript architecture built with modern ECMAScript standards and clean patterns",
      "Bundle size reduction, tree-shaking optimization, and code-splitting across Webpack and Vite builds",
      "Vanilla JavaScript utility engines, DOM widgets, and framework-independent micro-libraries",
      "Automated unit and integration test suites using Jest and Vitest"
    ],
    projects: ["soraya","accessible"],
    showTestimonial: false,
    sections: [
      {
        heading: "Async Bugs: Race Conditions, Promises, and the Event Loop",
        paragraphs: [
          "Asynchronous execution lies at the heart of JavaScript, yet it remains one of the most persistent sources of production defects. Because JavaScript runs on a single-threaded event loop, developers often assume code executes deterministically, overlooking the complex interactions between the call stack, microtask queue (Promise callbacks and queueMicrotask), and macrotask queue (setTimeout, setInterval, and I/O events).",
          "A common production failure is the asynchronous race condition in user interfaces. For instance, in a search-as-you-type input or dynamic tab navigation, a user triggers multiple consecutive network requests. If an earlier request takes longer to resolve than a later request, its delayed response can overwrite fresher data, displaying stale or incorrect information on screen. I eliminate these race conditions by implementing modern AbortController signals to cancel in-flight HTTP requests, or by maintaining request sequence counters that discard outdated responses.",
          "I also resolve promise handling anti-patterns, such as accidental sequential loops using await inside array iterations that should be executed concurrently with Promise.all or Promise.allSettled. Furthermore, I identify and fix unhandled promise rejections and silent failure traps where try/catch blocks fail to catch errors thrown inside asynchronous callbacks or event handlers, restoring clean asynchronous flow."
        ]
      },
      {
        heading: "Debugging Real Production Issues",
        paragraphs: [
          "Production environments expose subtle edge cases that automated local unit tests rarely uncover: network packet drops, erratic user input sequences, memory bloat on low-memory mobile hardware, and timezone boundary bugs. Diagnosing these issues requires systematic forensic debugging rather than guesswork.",
          "I specialize in tracking down elusive client-side and server-side memory leaks. In the browser, detached DOM tree nodes, lingering global event listeners, and uncleared timer intervals prevent the garbage collector from reclaiming memory, eventually causing client tabs to crash. Using browser memory heap snapshots and allocation timelines, I pinpoint retained object paths and decouple orphaned references.",
          "On the backend with Node.js, I analyze heap dumps and CPU profiles to identify event-loop starvation caused by accidental synchronous blocking operations, JSON parsing of massive payloads, or regular expression catastrophic backtracking. I configure source maps and structured error monitoring to ensure minified production stack traces translate directly into actionable file locations and line numbers, preventing recurring outages."
        ]
      },
      {
        heading: "Performance and Bundle Size Optimization",
        paragraphs: [
          "JavaScript performance is not merely about execution speed; it is heavily governed by download, parse, and compile times on real-world mobile devices. Every additional 100 KB of third-party JavaScript degrades Largest Contentful Paint (LCP) and Interaction to Next Paint (INP) scores, directly hurting search rankings and conversion rates.",
          "I conduct thorough bundle audits using Webpack and Vite bundle analyzers to uncover bloated dependencies, duplicate package versions, and dead code. I replace monolithic libraries with lightweight native alternatives, such as replacing bloated date-parsing packages with native Intl methods, and eliminating utility chains in favor of modern ECMAScript array methods.",
          "Beyond tree-shaking, I implement strategic route-level and component-level code-splitting with dynamic import() statements. Non-critical scripts, such as modal dialogs, rich-text editors, and third-party analytics, are deferred until user interaction. This keeps initial entry chunks lean, accelerates main-thread execution, and ensures snappy 60fps interface interactions across low-power mobile devices."
        ]
      },
      {
        heading: "Vanilla JS vs Framework: Choosing the Right Tool",
        paragraphs: [
          "The modern web ecosystem often defaults to heavy single-page frameworks even for simple business applications where a lightweight vanilla JavaScript implementation would load ten times faster and require zero dependency maintenance. While frameworks like React, Vue, and Angular provide indispensable abstractions for complex dynamic dashboards, they introduce substantial runtime overhead and ongoing upgrade debt.",
          "I help teams evaluate the pragmatic trade-offs between vanilla JavaScript and framework ecosystems. For landing pages, content marketing sites, customer checkout widgets, and embedded third-party scripts, vanilla JavaScript written with modern ES modules, Web Components, and native CSS styling delivers unmatched load speed and zero-framework longevity.",
          "When writing vanilla JavaScript, I enforce disciplined software design patterns. I organize code into cohesive modules with clear encapsulation, utilize CustomEvent dispatching for decoupled component communication, and leverage native browser primitives like the HTML dialog element to deliver rich interactivity without external dependencies. This ensures that features remain resilient, performant, and future-proof."
        ]
      },
      {
        heading: "Typical Interview and Take-Home Traps",
        paragraphs: [
          "Technical interviews and take-home assignments frequently test core JavaScript fundamentals that trip up even developers with years of framework experience. These traps typically probe deeper understanding of the runtime: closure scope variables within asynchronous loops, lexical scoping rules of arrow functions versus regular function context binding, and the nuances of prototypal inheritance versus class syntax.",
          "Other common evaluation pitfalls include loose equality type coercion quirks (such as differences between ==, ===, and Object.is), shallow versus deep object cloning edge cases with structuredClone, and event delegation mechanics. Candidates often struggle with event bubbling, event capturing phases, and knowing when event.stopPropagation() is harmful versus necessary.",
          "When advising teams or structuring coding standards, I emphasize writing robust, production-grade code that handles edge cases cleanly: validating inputs, accounting for empty collections, gracefully handling network timeout exceptions, and writing clear, deterministic tests with Jest or Vitest rather than relying on brittle mock assumptions."
        ]
      },
      {
        heading: "When You Should NOT Hire Me",
        paragraphs: [
          "Do not hire me if your project centers on low-level WebAssembly compiler development, 3D WebGL shader programming, or browser engine internals; my focus is application-level full-stack web engineering.",
          "Do not hire me if you require a full-time, in-office employee; I work exclusively as an independent remote contractor and technical consultant.",
          "Do not hire me if you are seeking a rapid prototype built with copy-pasted snippets without regard for code quality, security validation, or automated testing."
        ]
      },
      {
        heading: "How We'd Start",
        paragraphs: [
          "We start with a concise 20-minute discussion or a written message detailing your technical challenges, production bug logs, or project goals.",
          "I examine your code repository or minimal reproducible test case, providing a written assessment with clear diagnosis, remediation milestones, and transparent pricing.",
          "Once approved, I implement solutions in small, documented pull requests accompanied by regression tests and clear technical explanations."
        ]
      }
    ],
    faq: [
      {
        q: "What environments and runtimes of JavaScript do you work with?",
        a: "I work across all modern JavaScript runtimes, including modern browser environments and Node.js backend servers, using contemporary ECMAScript standards."
      },
      {
        q: "How do you track down memory leaks and event-loop bottlenecks?",
        a: "I use browser DevTools heap snapshots, allocation instrumentation, and Node.js CPU profilers to locate detached DOM nodes, uncleared listeners, and synchronous blocking loops."
      },
      {
        q: "Can you help us reduce our JavaScript bundle size and improve page load speed?",
        a: "Yes. I analyze bundle dependency graphs with Vite and Webpack visualizers, eliminate un-treeshaken libraries, configure dynamic code splitting, and replace heavy dependencies with native APIs."
      },
      {
        q: "How do you fix asynchronous race conditions in user interfaces?",
        a: "I implement AbortController to cancel obsolete in-flight fetch requests, introduce request sequence tokens, and ensure that asynchronous UI state mutations remain deterministic."
      },
      {
        q: "Can you build features in vanilla JavaScript without external frameworks?",
        a: "Yes. For landing pages, embeddable widgets, and performance-critical flows, I build zero-dependency vanilla JavaScript solutions using modern ES modules and native browser APIs."
      },
      {
        q: "What are your freelance rates and payment terms?",
        a: "My rate starts from $30/hr as detailed in the shared rate section, with fixed quotes provided for defined debugging or refactoring deliverables. Invoices are paid directly via bank wire; no payments are processed on this site."
      }
    ]
  },
  "mongodb-developer": {
    skill: "MongoDB",
    title: "Hire MongoDB Developer | Freelance, India & Remote",
    description: "Hire a freelance MongoDB developer for schema design, aggregation pipelines, Atlas setups, and index tuning. 12+ years experience. Remote & India.",
    h1: "Hire an Experienced Freelance MongoDB Developer",
    intro: "I'm Ramkumar Khubchandani, a backend software engineer with 12+ years of industry experience. I design resilient MongoDB schemas, optimize slow aggregation pipelines, configure production clusters on MongoDB Atlas, and tune database performance for Node.js web applications.",
    whatIBuild: [
      "Production MongoDB schema architectures balancing embedding versus referencing for high-throughput workloads",
      "Multi-stage aggregation pipelines for analytical reporting, faceted search, and complex data transformations",
      "Query optimization, compound index creation, and execution plan profiling using explain('executionStats')",
      "Serverless connection pooling, caching, and lifecycle management for Next.js and Node.js applications",
      "Cluster configuration, automated backups, and role-based security policies on MongoDB Atlas"
    ],
    projects: ["soraya","kids"],
    showTestimonial: false,
    sections: [
      {
        heading: "Schema Design: Embed vs Reference",
        paragraphs: [
          "In document databases like MongoDB, schema design determines both runtime performance and operational scalability. Unlike relational databases that encourage strict normalization across separate tables, MongoDB requires modeling data around real-world application access patterns. The central architectural decision is choosing when to embed documents versus when to reference them across collections.",
          "Embedding data inside a parent document delivers superior read performance because related entities are retrieved in a single disk I/O operation without application-level joins. Embedding is ideal for 1-to-1 relationships and bounded 1-to-few collections, such as user addresses or order line items that are updated atomically. However, embedding unbounded data sets—such as an open-ended comment thread or perpetual activity log—introduces the catastrophic 16 MB BSON document size limit trap, eventually causing write failures in production.",
          "Referencing documents via ObjectIds is required for 1-to-many, 1-to-squillions, and many-to-many relationships, or when related records are frequently queried independently. I design schemas using Mongoose that balance both approaches, applying denormalized snapshots for frequently read immutable fields while maintaining clean references for evolving relationships. This hybrid approach keeps document sizes strictly bounded while optimizing everyday read throughput."
        ]
      },
      {
        heading: "Indexing and Reading explain() Execution Plans",
        paragraphs: [
          "An unindexed MongoDB collection is one of the quickest ways to bring down a production Node.js backend under high traffic. When queries lack appropriate indexes, MongoDB falls back to a full collection scan (COLLSCAN), inspecting every single document on disk, consuming excessive CPU, and saturating memory cache.",
          "I diagnose query performance by running explain('executionStats') on slow operations. By analyzing the execution plan metrics, I examine the crucial ratio between totalKeysExamined, totalDocsExamined, and nReturned. In an optimal query, totalKeysExamined equals nReturned, and totalDocsExamined matches the returned count with zero extraneous documents read from storage.",
          "I build compound indexes adhering to the Equality, Sort, Range (ESR) rule. Fields filtered by exact equality are placed first in the index key definition, followed by fields used for sorting, and concluding with range filters. I also implement partial indexes and TTL indexes to conserve RAM by indexing only active document subsets and automating background record expiration without cron overhead."
        ]
      },
      {
        heading: "Aggregation Pipelines for Data Transformation and Reporting",
        paragraphs: [
          "When business requirements demand complex data transformations, multi-collection lookups, or statistical reporting, standard CRUD find operations fall short. MongoDB aggregation pipelines process documents through a sequence of declarative stages, performing high-performance computation directly inside the database engine.",
          "I construct efficient aggregation pipelines using stages such as $match, $project, $group, $lookup, $unwind, and $facet. Pipeline stage ordering is critical for performance: by placing selective $match and $sort stages at the very front of the pipeline, MongoDB utilizes collection indexes and dramatically reduces the document volume passed to memory-intensive downstream stages.",
          "For e-commerce catalogs and analytical dashboards, I utilize $facet to calculate multi-category counts, price distributions, and paginated records in a single database round-trip. I replace chatty, multi-query application logic with atomic pipelines, reducing network latency between your Node.js server and database cluster while ensuring deterministic result sets and sub-second query responses."
        ]
      },
      {
        heading: "Atlas Basics: Clusters, Backups, and Monitoring",
        paragraphs: [
          "MongoDB Atlas is the industry-standard managed cloud database platform, but running it reliably in production requires careful configuration and continuous oversight. Proper tier selection, automated storage scaling, and regional cluster placement ensure that your database scales smoothly without unexpected budget overruns or sudden storage exhaustion.",
          "I configure production Atlas clusters with replica set redundancy across multiple availability zones, ensuring automatic failover with zero manual intervention during hardware outages. I establish automated snapshot backup policies with point-in-time recovery (PITR) to protect critical business records against accidental data corruption or catastrophic operational mistakes.",
          "Security and monitoring are configured systematically. I enforce strict IP access lists, VPC network peering where required, encrypted TLS connections, and database user accounts restricted by least-privilege role-based access control. In addition, I set up Atlas performance alerts for high CPU utilization, memory pressure, disk IOPS saturation, and slow query execution, ensuring complete visibility into database health."
        ]
      },
      {
        heading: "Connection Handling in Serverless Environments",
        paragraphs: [
          "Serverless hosting architectures such as Vercel and AWS Lambda pose unique challenges for MongoDB connection management. Traditional long-running Node.js servers maintain a single, persistent MongoClient connection pool throughout the lifetime of the process. In contrast, stateless serverless functions spin up and spin down dynamically in response to incoming HTTP traffic.",
          "If a serverless endpoint opens a new database connection on every request without caching the client instance, high traffic spikes will quickly exhaust MongoDB's connection pool limits, causing subsequent requests to fail with connection timeout errors. In fact, outlinedev.com itself runs on MongoDB Atlas, utilizing cached global connection promises in Next.js Server Components and API routes to ensure connections are reused across warm function invocations.",
          "I configure connection pool settings (such as maxPoolSize, minPoolSize, and serverSelectionTimeoutMS) specifically tailored for serverless environments. I implement retry logic for transient network disconnects and ensure that connections close gracefully during process termination, supporting high reliability and consistent uptime under volatile request loads."
        ]
      },
      {
        heading: "When You Should NOT Hire Me",
        paragraphs: [
          "Do not hire me if you are looking for an on-premise hardware DBA to configure physical bare-metal sharded clusters across private data centers; my focus is cloud-managed MongoDB Atlas and application-level schema engineering.",
          "Do not hire me if you need an in-office full-time employee; I provide all consulting, database optimization, and development remotely as an independent contractor.",
          "Do not hire me if you require a relational SQL specialist to build complex multi-table ACID transactions across legacy financial enterprise ERP systems."
        ]
      },
      {
        heading: "How We'd Start",
        paragraphs: [
          "We begin with a 20-minute discovery conversation or a written message detailing your current database architecture, slow query logs, or Atlas cluster setup.",
          "I conduct an initial audit of your schema definitions and analyze slow queries using explain() plans, providing a written proposal with concrete milestones and transparent pricing.",
          "Once approved, I apply index adjustments, schema refinements, or aggregation optimizations in documented stages, verifying query speed improvements with benchmark tests."
        ]
      }
    ],
    faq: [
      {
        q: "When should data be embedded versus referenced in MongoDB?",
        a: "Embed data for 1-to-1 and bounded 1-to-few relationships where records are read and updated together. Reference data for 1-to-many, unbounded lists, or entities queried independently to avoid the 16 MB BSON document limit."
      },
      {
        q: "How do you identify and fix slow MongoDB queries?",
        a: "I analyze query execution with explain('executionStats') to identify unindexed collection scans, examine totalKeysExamined versus nReturned, and create compound indexes following the Equality, Sort, Range (ESR) rule."
      },
      {
        q: "How do you handle MongoDB connections in serverless frameworks like Next.js?",
        a: "I implement cached global connection promises to reuse established MongoClient pools across warm serverless invocations, tune pool sizes, and configure connection timeouts to prevent connection exhaustion."
      },
      {
        q: "Can you help migrate our database to MongoDB Atlas or optimize an existing cluster?",
        a: "Yes. I configure Atlas clusters, set up automated snapshot backups, configure IP access lists and role-based permissions, and optimize cluster tier resource allocation."
      },
      {
        q: "Do you write MongoDB aggregations with Mongoose in Node.js?",
        a: "Yes. I construct multi-stage aggregation pipelines using Mongoose and native drivers for analytical reporting, faceted searches, and complex data transformations."
      },
      {
        q: "What are your freelance rates and payment terms?",
        a: "Rates start from $30/hr as noted in the shared rate information, with fixed quotes provided for defined schema audit or optimization milestones. Invoices are settled via bank transfer; this site does not process payments."
      }
    ]
  },
  "html-css-developer": {
    skill: "HTML/CSS",
    title: "Hire HTML/CSS Developer | Freelance, India & Remote",
    description: "Hire a freelance HTML/CSS developer for semantic accessible markup, responsive layouts, Core Web Vitals, and emails. 12+ years experience. Remote.",
    h1: "Hire an Experienced Freelance HTML/CSS Developer",
    intro: "I'm Ramkumar Khubchandani, a front-end software engineer with 12+ years of industry experience. I build clean, semantic, and accessible HTML/CSS interfaces that render flawlessly across devices, eliminate Core Web Vitals layout shifts, and provide exceptional user experiences.",
    whatIBuild: [
      "Semantic, accessible HTML markup compliant with WCAG guidelines and screen-reader standards",
      "Responsive CSS layouts engineered with Flexbox, CSS Grid, and fluid typography without brittle hacks",
      "Modular CSS architectures using Tailwind CSS, CSS Modules, and clean utility conventions",
      "Core Web Vitals performance remediation targeting Cumulative Layout Shift (CLS) and rendering delays",
      "Cross-client HTML email templates and high-converting marketing landing pages"
    ],
    projects: ["soraya","accessible"],
    showTestimonial: false,
    sections: [
      {
        heading: "Semantic and Accessible Markup",
        paragraphs: [
          "Semantic HTML forms the structural backbone of accessible, performant, and search-friendly web interfaces. Yet modern web development frequently suffers from excessive div-soup, where generic non-semantic elements are styled to mimic buttons, links, and modal dialogs. This practice strips away native keyboard accessibility, disrupts browser reading modes, and renders interfaces unusable for people relying on screen readers.",
          "I build user interfaces using meaningful HTML elements such as main, header, nav, section, article, and aside. Interactive triggers are constructed with native button and anchor tags, which inherently support keyboard focus, sequential tab indexing, and Space and Enter key activation without brittle custom event listeners. Forms are built with explicit label associations, clear input types, and structured fieldsets.",
          "Accessibility (a11y) is integrated directly into the markup rather than patched on later. I apply ARIA roles, states, and live regions judiciously only when native HTML semantics cannot convey complex state transitions. Every component is audited for screen-reader clarity, high-contrast readability, and strict keyboard navigation, ensuring full compliance with WCAG standards across all user journeys."
        ]
      },
      {
        heading: "Responsive Layout Without Hacks",
        paragraphs: [
          "Creating responsive web interfaces across thousands of screen dimensions requires fluid, modern CSS layout techniques rather than brittle pixel breakpoints and arbitrary JavaScript resize listeners. Early responsive design often relied on negative margins, float clears, and dozens of rigid media queries that broke as soon as content lengths shifted.",
          "I engineer resilient responsive layouts using modern CSS Flexbox and CSS Grid. Using intrinsic layout techniques like repeat(auto-fit, minmax(...)) and clamp() for fluid typography, layouts adapt smoothly and proportionally to any viewport width from mobile screens to ultra-wide desktop monitors without horizontal scrollbars or clipped text.",
          "Furthermore, I leverage modern CSS container queries to style components based on their immediate parent container width rather than the global viewport. This modular layout strategy ensures that cards, forms, and widgets can be placed anywhere across your application without breaking their internal layout integrity. Viewport adaptation remains clean, predictable, and maintainable across future design iterations."
        ]
      },
      {
        heading: "CSS Architecture: Maintainability and Organization",
        paragraphs: [
          "As web applications grow, unorganized stylesheets quickly devolve into specificity wars, where developers fight cascading overrides by stacking nested selectors and resorting to dangerous !important tags. This technical debt slows down development velocity, bloats file sizes, and makes styling changes unpredictable.",
          "I establish scalable CSS architectures tailored to project requirements. When working with utility-first systems like Tailwind CSS, I ensure consistent spacing scales, typography hierarchies, and color tokens defined in central theme configurations. When working with CSS Modules, styles are strictly scoped to individual components, completely eliminating global namespace collisions and accidental visual regressions.",
          "I structure design tokens using native CSS custom properties (variables) for theme management, making dark mode transitions seamless and performant. In addition, I configure build tooling to purge unused utility classes, eliminate dead CSS rules, and minimize stylesheet payload sizes delivered to the browser, ensuring rapid rendering across both desktop and mobile networks."
        ]
      },
      {
        heading: "Core Web Vitals Fixes: CLS and Rendering Performance",
        paragraphs: [
          "Google's Core Web Vitals directly impact organic search rankings and user satisfaction. Cumulative Layout Shift (CLS) is one of the most frustrating performance issues, occurring when elements unexpectedly shift on the screen while a page is loading, causing users to misclick buttons or lose their reading position.",
          "I audit and resolve layout shifts by ensuring every image, video, and embedded iframe has explicit width and height attributes or CSS aspect-ratio properties defined. This allows the browser to reserve the exact layout space before visual media downloads finish. For late-loading web fonts, I configure font-display: swap along with font fallback metric adjustments, eliminating font layout shifts during font swap.",
          "For rendering performance, I eliminate render-blocking stylesheets and inline critical styles required for above-the-fold content. When implementing animations, I restrict transitions strictly to GPU-accelerated CSS properties like transform and opacity, avoiding property changes like top, left, width, or margin that trigger expensive layout reflows and repaints. This work ensures green performance scores across Google Lighthouse audits."
        ]
      },
      {
        heading: "Email Templates and Landing-Page Work",
        paragraphs: [
          "HTML email development remains one of the most demanding sub-disciplines in front-end engineering due to obsolete, fractured rendering engines. Desktop versions of Microsoft Outlook still rely on the Microsoft Word rendering engine, while web clients like Gmail and Apple Mail impose strict inline styling limitations.",
          "I build robust, cross-client HTML email templates using hybrid table-based structures, conditional MSO comments, and carefully inlined CSS styles. Every template is tested to render reliably across dark and light modes on mobile and desktop email clients without broken layouts, font fallbacks, or unreadable text. This helps ensure that marketing announcements, transactional receipts, and customer notifications display consistently.",
          "For marketing landing pages, I translate Figma designs into pixel-perfect, high-converting web pages. I focus on clear visual hierarchy, accessible call-to-action buttons, responsive hero sections, and subtle interactive hover states that engage prospective customers while maintaining near-instant load speeds."
        ]
      },
      {
        heading: "When You Should NOT Hire Me",
        paragraphs: [
          "Do not hire me if you are seeking a creative graphic designer to design logos, illustrations, or marketing artwork from scratch; I write engineering-grade HTML and CSS based on provided designs or wireframes.",
          "Do not hire me if you need an in-office employee for full-time on-site work; I provide all development and consulting services remotely.",
          "Do not hire me if you want cheap automated page builders that output bloated, unmaintainable markup full of arbitrary inline hacks."
        ]
      },
      {
        heading: "How We'd Start",
        paragraphs: [
          "We start with a quick 20-minute introductory call or a written message with links to your Figma designs, current website URL, or email template specifications.",
          "I review the assets, outline responsive layout considerations and accessibility criteria, and provide a clear written scope with milestones and pricing.",
          "Once approved, I build the markup and styles iteratively, sharing responsive staging links for verification and delivering clean, well-documented code."
        ]
      }
    ],
    faq: [
      {
        q: "What CSS frameworks and styling tools do you work with?",
        a: "I work primarily with Tailwind CSS, standard CSS Modules, modern native CSS with custom properties, and utility-first conventions, tailoring the approach to your codebase."
      },
      {
        q: "How do you ensure web pages are accessible to screen readers?",
        a: "I write semantic HTML elements, ensure complete keyboard navigation support, structure forms with explicit labels, and implement ARIA roles and attributes in compliance with WCAG standards."
      },
      {
        q: "How do you diagnose and fix Cumulative Layout Shift (CLS)?",
        a: "I set explicit dimensions or aspect-ratio on images and embeds, reserve layout space for dynamic content, and match font metrics using font-display and font fallback overrides to eliminate shifts."
      },
      {
        q: "Can you build responsive HTML email templates that work in Outlook and Gmail?",
        a: "Yes. I build hybrid table-based email templates with conditional MSO code and inline CSS, ensuring layouts render cleanly across Outlook, Gmail, Apple Mail, and mobile clients."
      },
      {
        q: "Can you convert Figma designs into pixel-perfect responsive HTML and CSS?",
        a: "Yes. I translate Figma and design files into fluid, responsive HTML and CSS layouts using Flexbox, CSS Grid, and container queries across mobile, tablet, and desktop viewports."
      },
      {
        q: "What are your hourly rates and how does billing work?",
        a: "Rates start from $30/hr as outlined in the shared terms, with fixed-price quotes provided for landing page or email deliverables. Payments are made directly via bank wire; no payments occur on this site."
      }
    ]
  }
};

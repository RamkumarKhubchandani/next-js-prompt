/**
 * Single source of truth configuration for the India Full Stack Live Coding Course.
 * 
 * RULE: Mark every unknown value TODO_FROM_OWNER.
 * Any section or UI element referencing a field whose value is still TODO must be hidden.
 */

export const TODO_FROM_OWNER = 'TODO_FROM_OWNER';

export function isTodo(val) {
  if (!val) return true;
  return typeof val === 'string' && val.includes('TODO');
}

export const COURSE_INDIA = {
  slug: 'full-stack-live-course',
  title: 'Full Stack Live Coding Course',
  metaTitle: 'Full Stack Live Coding Course | OutlineDev',
  metaDescription: 'Live 40-hour full stack coding course covering HTML, CSS, JavaScript, React, Node.js, Express & SQLite. 20 practical sessions with 1-on-1 code reviews.',
  canonical: 'https://www.outlinedev.com/full-stack-live-course',
  locale: 'en-IN',
  hours: 40,
  sessions: '20 x 2h',
  sessionCount: 20,
  sessionDurationHours: 2,
  fee: 10000,
  currency: 'INR',
  feeFormatted: '₹10,000',
  feeNote: 'No GST charged',
  refund: 'Full refund',
  refundWindow: TODO_FROM_OWNER,
  languageOfTeaching: TODO_FROM_OWNER,
  sessionTimings: TODO_FROM_OWNER,
  seatsPerBatch: TODO_FROM_OWNER,
  recordings: TODO_FROM_OWNER,
  certificate: 'Certificate of completion from OutlineDev',
  whatsappNumber: TODO_FROM_OWNER,
  youtubeChannelUrl: TODO_FROM_OWNER,
  lastUpdated: '2026-11-16',

  instructor: {
    name: 'Ramkumar Khubchandani',
    title: 'Principal Engineer',
    experience: '12+ years of industry experience',
    bio: '12+ years of industry experience building, architecting, and shipping high-performance web applications. Former Lead Architect and experienced mentor helping engineers transition from fundamentals to production-grade engineering.',
    links: {
      github: 'https://github.com/ramkumarkhub',
      linkedin: 'https://www.linkedin.com/in/ramkumar-khubchandani-b7097a81/',
    },
    aboutUrl: '/about',
  },

  // Raw batch start dates (YYYY-MM-DD)
  batches: [
    '2026-11-28',
    '2026-12-13',
    '2026-12-28',
    '2027-01-12',
    '2027-01-27',
    '2027-02-11',
    '2027-02-26',
    '2027-03-13',
  ],

  notCovered: [
    {
      name: 'TypeScript',
      reason: 'Adding static type compilation adds unnecessary syntax friction when first grasping asynchronous JavaScript, object prototypes, and core React component lifecycles. We master vanilla ES2024 first.',
    },
    {
      name: 'Next.js & Server Components',
      reason: 'Meta-frameworks abstract away the client-server boundary. You need a firm grip on raw HTTP requests, CORS, Express middleware, and client-side single-page applications with React Router before learning full-stack frameworks.',
    },
    {
      name: 'Automated Testing (Jest / Cypress / Playwright)',
      reason: 'While testing is vital for senior engineers, during a 40-hour foundational course your time is strictly prioritized on writing working software, manual debugging in Chrome DevTools, and shipping features.',
    },
    {
      name: 'Docker & Containerization',
      reason: 'Local container virtualization complicates developer setup for beginners. Node.js with SQLite runs natively across Windows, macOS, and Linux with zero container configuration or Docker daemon overhead.',
    },
    {
      name: 'Cloud Infrastructure & DevOps (AWS / Kubernetes)',
      reason: 'Cloud infrastructure provisioning (VPCs, IAM roles, container orchestrators) is a specialized DevOps discipline. We focus on straightforward single-server deployments with persistent file storage.',
    },
  ],

  tools: [
    {
      name: 'VS Code',
      category: 'Code Editor',
      description: 'The industry-standard code editor with powerful IntelliSense, keyboard shortcuts, integrated terminal, and Git source control tools.',
    },
    {
      name: 'Git & GitHub',
      category: 'Version Control',
      description: 'Track changes locally, create feature branches, commit code with meaningful messages, and push repositories to build a public proof-of-work portfolio.',
    },
    {
      name: 'Vite',
      category: 'Frontend Bundler',
      description: 'Lightning-fast ES-module development server with instant Hot Module Replacement (HMR) and optimized production builds without webpack configuration complexity.',
    },
    {
      name: 'React 18+',
      category: 'Frontend UI Library',
      description: 'The most popular frontend library worldwide. Master functional components, hooks (useState, useEffect), custom hooks, Context API, and React Router.',
    },
    {
      name: 'Node.js & Express.js',
      category: 'Backend Runtime & REST API',
      description: 'Write server-side code in JavaScript. Understand the event loop, npm ecosystem, HTTP request-response pipeline, custom middleware, and REST architecture.',
    },
    {
      name: 'SQLite (better-sqlite3)',
      category: 'Relational Database',
      description: 'A genuine SQL database stored as a single file on disk. No background database service daemon to run, no network latency, zero cloud costs, and full ACID compliance. Learn real SQL queries (SELECT, INSERT, UPDATE, DELETE, JOIN) without database server administration overhead.',
      limits: 'SQLite is single-writer file-based. It is ideal for small to medium websites, internal tools, and desktop applications, but is not designed for distributed multi-server clusters where PostgreSQL or MySQL would be used.',
    },
  ],

  syllabus: [
    {
      moduleNumber: 1,
      moduleTitle: 'HTML and CSS Foundations',
      hours: 8,
      description: 'Master the fundamental building blocks of the web: semantic markup, the CSS box model, responsive layouts with Flexbox and CSS Grid, and web accessibility.',
      days: [
        {
          day: 1,
          title: 'How the Web Works & Semantic HTML5',
          topics: [
            'Client-server architecture, DNS lookups, IP addresses, and HTTP request-response cycle',
            'Setting up your development environment: VS Code, essential extensions, and integrated terminal',
            'Git fundamentals: git init, git add, git commit, and pushing your first repo to GitHub',
            'HTML document structure, doctype, head metadata, and character encoding',
            'Semantic markup: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>',
            'Accessible form controls: inputs, labels, fieldsets, textareas, buttons, and native validation attributes',
          ],
          exercise: 'Build a semantic, multi-section developer profile page with an interactive contact form.',
          outcome: 'Understand browser-server networking, execute core Git commands, and write accessible HTML5 markup without generic div soup.',
        },
        {
          day: 2,
          title: 'CSS Architecture, Box Model & Modern Flexbox',
          topics: [
            'CSS selector anatomy, element/class/id specificity calculation, and the cascade rules',
            'The CSS Box Model: content, padding, border, margin, and box-sizing: border-box',
            'Typography fundamentals: font-family, system font stacks, line-height, and rem vs em units',
            'Colour systems: hex, rgb, rgba, hsl, and accessible foreground-background contrast',
            'Flexbox layout model: flex container vs flex items, main axis vs cross axis',
            'Flex properties: justify-content, align-items, flex-direction, flex-wrap, gap, and flex-grow/shrink',
          ],
          exercise: 'Style the profile page and create a responsive pricing card grid with modern Flexbox alignment.',
          outcome: 'Eliminate layout guesswork by mastering box calculations and building flexible UI components.',
        },
        {
          day: 3,
          title: 'CSS Grid, Mobile-First Design & CSS Custom Properties',
          topics: [
            'CSS Grid fundamentals: grid-template-columns, grid-template-rows, fr fractional units, and gap',
            'Advanced Grid techniques: repeat(), minmax(), auto-fill, and auto-fit for intrinsic responsiveness',
            'Mobile-first responsive design philosophy: why starting with small screens results in cleaner CSS',
            'Media queries: min-width breakpoints for phone, tablet, laptop, and desktop viewports',
            'CSS Custom Properties (variables) for consistent design tokens, spacing scales, and theme management',
            'Fluid typography with clamp() and responsive layout patterns',
          ],
          exercise: 'Build a mobile-first, multi-column agency landing page layout that adapts seamlessly across all screen widths.',
          outcome: 'Create fluid, responsive layouts using CSS Grid and CSS variables without relying on external CSS frameworks.',
        },
        {
          day: 4,
          title: 'Accessibility (a11y), Polish & Deploying to GitHub Pages',
          topics: [
            'Web Content Accessibility Guidelines (WCAG) core principles: perceivable, operable, understandable',
            'Keyboard accessibility: focus outlines, tabindex rules, and screen reader-friendly button markup',
            'Colour contrast ratios and accessible interactive states (:hover, :focus-visible, :active)',
            'Responsive image formatting with <picture> and srcset for performance optimization',
            'Preparing a clean repository README with project screenshots and documentation',
            'Publishing Project 1 live to GitHub Pages with custom repository settings',
          ],
          exercise: 'Project 1: Polish and deploy your complete responsive portfolio website live to GitHub Pages.',
          outcome: 'Deploy your first public website to the internet with accessible, validated HTML and CSS.',
        },
      ],
    },
    {
      moduleNumber: 2,
      moduleTitle: 'Core JavaScript & Asynchronous Programming',
      hours: 10,
      description: 'Build algorithmic confidence and master real JavaScript: primitive types, data structures, DOM manipulation, asynchronous event loop, and Chrome DevTools debugging.',
      days: [
        {
          day: 5,
          title: 'JavaScript Types, Control Flow & Functions',
          topics: [
            'Variables and scoping: var vs let vs const, hoisting, and the temporal dead zone',
            'Primitive types (string, number, boolean, null, undefined, symbol, bigint) vs reference types',
            'Operators, type coercion pitfalls, strict equality (===) vs loose equality (==)',
            'Control flow: if/else conditionals, switch statements, ternary operators, and logical operators (&&, ||, ??)',
            'Loop constructs: for, while, for...of, and break/continue statements',
            'Functions: function declarations, function expressions, arrow functions, default parameters, and return values',
          ],
          exercise: 'Write 10 algorithmic utility functions (string manipulation, math helpers, and input sanitizers).',
          outcome: 'Think like a programmer by breaking down logic into pure, reusable functions.',
        },
        {
          day: 6,
          title: 'Arrays, Objects, Modern ES6+ & Data Manipulation',
          topics: [
            'Array manipulation: push, pop, shift, unshift, slice, and splice',
            'Higher-order array methods: map, filter, reduce, find, some, and every',
            'Object literals, property access, computed property names, Object.keys(), Object.values(), and Object.entries()',
            'Destructuring assignments for arrays and objects with default values',
            'Spread and rest operators (...) for copying and combining data structures immutably',
            'JavaScript modules: import, export, named exports, and default exports',
          ],
          exercise: 'Filter, transform, and aggregate an e-commerce catalog dataset using chained array methods.',
          outcome: 'Manipulate complex nested JSON datasets fluently without mutable side-effects.',
        },
        {
          day: 7,
          title: 'DOM Manipulation, Events & Browser Storage',
          topics: [
            'The Document Object Model (DOM) tree: querySelector, querySelectorAll, getElementById',
            'Creating, appending, updating, and removing DOM elements dynamically with JavaScript',
            'Event handling: addEventListener, event object, event bubbling, capturing, and event delegation',
            'Handling form submit events and preventing default browser submissions (e.preventDefault())',
            'Client-side storage with localStorage and sessionStorage: JSON.stringify and JSON.parse',
            'Building accessible modal dialogs and dynamic interactive toggles',
          ],
          exercise: 'Build an interactive To-Do and Task Tracker with persistent state stored in localStorage.',
          outcome: 'Connect user clicks and inputs to dynamic webpage updates that survive page refreshes.',
        },
        {
          day: 8,
          title: 'Asynchronous JavaScript, Promises & Fetch API',
          topics: [
            'Synchronous vs asynchronous execution: call stack, web APIs, callback queue, and event loop',
            'Promises: pending, fulfilled, rejected states, .then(), .catch(), and .finally() chaining',
            'Async/Await syntax: writing asynchronous code that reads synchronously',
            'The Fetch API: GET requests, parsing JSON response bodies, and HTTP status verification',
            'Robust error handling with try/catch blocks and user-facing error UI states',
            'Handling loading spinners and empty states during network latency',
          ],
          exercise: 'Fetch real-time data from a public weather/crypto API and display formatted live cards.',
          outcome: 'Handle network latency, parse remote JSON, and manage API failures gracefully.',
        },
        {
          day: 9,
          title: 'Closures, "this", DevTools Debugging & Project 2',
          topics: [
            'Lexical scope and closures: practical use cases (encapsulation, factory functions, event handlers)',
            'The "this" keyword in global scope, object methods, regular functions, and arrow functions',
            'Chrome DevTools deep dive: setting breakpoints, step-in/step-out, watching variables, inspecting network calls',
            'Common runtime errors: TypeError, ReferenceError, and how to read stack traces calmly',
            'Project 2 integration: GitHub User Search & Repository Explorer application',
          ],
          exercise: 'Project 2: Build a GitHub repository search app with live search filtering, pagination, and error handling.',
          outcome: 'Diagnose and fix JavaScript bugs independently using Chrome DevTools without guessing.',
        },
      ],
    },
    {
      moduleNumber: 3,
      moduleTitle: 'React Frontend Development',
      hours: 10,
      description: 'Master component-driven architecture: JSX syntax, reactive state, side effects, controlled forms, multi-page client routing, and custom hooks.',
      days: [
        {
          day: 10,
          title: 'React Fundamentals, Vite & JSX',
          topics: [
            'Why React? Declarative UI rendering vs imperative manual DOM manipulation',
            'Scaffolding a modern project with Vite and understanding npm scripts and project structure',
            'JSX syntax rules: JavaScript expressions inside JSX, fragments, className, and self-closing tags',
            'Components: functional components, single responsibility principle, and component composition',
            'Props: passing data from parent to child, children prop, destructuring props, and default values',
          ],
          exercise: 'Set up a Vite React project and build a modular component hierarchy for a dashboard UI.',
          outcome: 'Understand the React mental model and decompose interfaces into clean component trees.',
        },
        {
          day: 11,
          title: 'State with useState, Event Handling & Lists',
          topics: [
            'Managing component memory with the useState hook',
            'State updates: why state is treated as immutable, updating state based on previous state',
            'Handling user events in React (onClick, onChange, onSubmit)',
            'Rendering lists with .map() and the critical importance of unique, stable key props',
            'Conditional rendering techniques: ternary operators, logical AND (&&), and early returns',
          ],
          exercise: 'Build an interactive multi-step product configurator with dynamic price calculations.',
          outcome: 'Manage interactive UI state cleanly without violating React rendering rules.',
        },
        {
          day: 12,
          title: 'The useEffect Hook, Lifecycle & Data Fetching',
          topics: [
            'The component lifecycle: mounting, updating, and unmounting phases',
            'The useEffect hook: synchronization with external systems, dependency array rules',
            'Data fetching inside useEffect: managing loading, error, and success states',
            'Cleanup functions: preventing memory leaks with AbortController and clearing timers',
            'Avoiding infinite re-render loops and common useEffect anti-patterns',
          ],
          exercise: 'Build a live crypto/stock ticker component that fetches data on mount and refreshes on interval.',
          outcome: 'Synchronize React components with remote servers safely without memory leaks.',
        },
        {
          day: 13,
          title: 'Forms, Lifting State, React Router & Context API',
          topics: [
            'Controlled components: binding form inputs (text, select, radio) to React state',
            'Form validation strategies and inline error feedback',
            'Lifting state up: sharing state between sibling components via common parent',
            'Client-side routing with React Router: BrowserRouter, Routes, Route, Link, and useParams',
            'Global state with React Context API: createContext, Provider, and useContext hook',
          ],
          exercise: 'Create a multi-page e-commerce or booking prototype with a shared global cart/selection context.',
          outcome: 'Build multi-page client-side applications with navigation and shared global state.',
        },
        {
          day: 14,
          title: 'Custom Hooks, Project Architecture & Capstone Kickoff',
          topics: [
            'Extracting reusable logic into Custom Hooks (e.g., useFetch, useLocalStorage, useDebounce)',
            'Folder structure best practices for medium-to-large React applications',
            'Performance optimization basics: React.memo, useCallback, and useMemo when appropriate',
            'Structuring the capstone project frontend: layout components, pages, services, and hooks',
            'Planning the capstone project architecture: Task & Booking Management Portal',
          ],
          exercise: 'Write custom hooks (useLocalStorage and useFetch) and wire up the capstone frontend structure.',
          outcome: 'Write modular, production-ready React code with custom hooks and organized architecture.',
        },
      ],
    },
    {
      moduleNumber: 4,
      moduleTitle: 'Backend Development with Node.js, Express & SQLite',
      hours: 8,
      description: 'Build robust REST APIs with Node.js, Express, and SQLite: HTTP request-response lifecycle, relational schema design, input validation, and password authentication.',
      days: [
        {
          day: 15,
          title: 'Node.js Fundamentals, Express Server & Routing',
          topics: [
            'The Node.js runtime: V8 engine, libuv, modules (CommonJS vs ES modules)',
            'Initializing a backend package.json, installing dependencies, and configuring start scripts',
            'Setting up an Express.js application and listening on a local port',
            'REST API principles: resources, HTTP methods (GET, POST, PUT, DELETE), and status codes (200, 201, 400, 404, 500)',
            'Express routing, route parameters (req.params), and query strings (req.query)',
            'Understanding middleware: built-in express.json(), third-party logger (morgan), custom middleware',
          ],
          exercise: 'Build a standalone Express REST server that manages an in-memory inventory with CRUD routes.',
          outcome: 'Construct a structured backend API server that receives and responds to HTTP requests.',
        },
        {
          day: 16,
          title: 'Relational Database Basics with SQLite & better-sqlite3',
          topics: [
            'Relational database concepts: tables, rows, columns, data types, constraints',
            'Why SQLite? Single-file serverless storage, zero network latency, zero config, ACID compliance',
            'Core SQL syntax: CREATE TABLE, INSERT INTO, SELECT ... WHERE, UPDATE, DELETE',
            'Primary keys, foreign keys, and relational JOIN operations between tables',
            'Database schema migrations and connecting Express to SQLite via better-sqlite3',
            'Prepared statements in SQLite to prevent SQL injection vulnerabilities',
          ],
          exercise: 'Design and create a normalized relational database schema (users, tasks, categories) in SQLite.',
          outcome: 'Write raw SQL queries safely and manage persistent data in an SQLite database file.',
        },
        {
          day: 17,
          title: 'Full REST API CRUD, Input Validation & Error Handling',
          topics: [
            'Building complete CRUD endpoints backed by SQLite tables',
            'Input validation and sanitization: verifying required fields, data types, and string lengths',
            'Centralized error handling middleware in Express to catch synchronous and async errors',
            'Managing configuration with environment variables (.env and dotenv)',
            'Testing API endpoints and inspecting JSON responses with Postman / Thunder Client',
          ],
          exercise: 'Implement and test full CRUD operations for tasks and bookings with robust input validation.',
          outcome: 'Ship resilient REST endpoints with proper HTTP status codes, error messages, and validation.',
        },
        {
          day: 18,
          title: 'Authentication Basics, JWT / Sessions & Connecting React to Express',
          topics: [
            'Authentication fundamentals: password hashing with bcrypt (salting and hashing rounds)',
            'Token-based authentication with JSON Web Tokens (JWT): signing, expiring, and verifying',
            'Creating an authentication middleware to protect private API routes',
            'Cross-Origin Resource Sharing (CORS): why browsers block cross-origin requests and configuring cors in Express',
            'Connecting the React frontend to the Express backend via fetch API with auth headers',
          ],
          exercise: 'Build user signup and login endpoints, protect private routes with JWT, and call them from React.',
          outcome: 'Secure API endpoints with hashed passwords and connect a React frontend to an authenticated backend.',
        },
      ],
    },
    {
      moduleNumber: 5,
      moduleTitle: 'Capstone Integration, Deployment & Career Fundamentals',
      hours: 4,
      description: 'Integrate your full-stack capstone, deploy production builds with persistent data, craft a professional GitHub portfolio, and prepare for technical interviews.',
      days: [
        {
          day: 19,
          title: 'Capstone Full-Stack Integration & Polish',
          topics: [
            'Integrating the complete Capstone Application: Task & Booking Management Portal',
            'Connecting React UI state with Express REST API and persistent SQLite database',
            'Handling optimistic UI updates vs server re-fetching',
            'Edge-case handling: expired tokens, database errors, loading skeletons, and form error feedback',
            'Code cleanup, removing console logs, and formatting with Prettier/ESLint',
          ],
          exercise: 'Complete end-to-end user flows in the capstone project (signup -> login -> create -> update -> delete).',
          outcome: 'Deliver a fully integrated, working full-stack web application with persistent relational storage.',
        },
        {
          day: 20,
          title: 'Deployment, GitHub Portfolio & Technical Interview Basics',
          topics: [
            'Production deployment: hosting frontend on Vercel/Netlify, backend on a host with persistent disk storage for SQLite (e.g. Render/Railway/VPS)',
            'Setting up production environment variables and CORS headers for live domains',
            'Writing a professional README: architecture diagram, features, tech stack decisions, and setup instructions',
            'Curating your GitHub profile to showcase real code commits, branches, and PR reviews',
            'Technical interview fundamentals: how to explain your architecture decisions, trade-offs (e.g. why SQLite over MongoDB), and live coding tips',
            'Next steps: self-directed learning roadmap (TypeScript, testing, performance, databases)',
          ],
          exercise: 'Deploy both frontend and backend to production, push final clean code to GitHub, and record a live demo walkthrough.',
          outcome: 'Have a live, deployed full-stack application on the internet, a public GitHub portfolio project, and confidence explaining your code.',
        },
      ],
    },
  ],
};

/**
 * Returns batches whose date is today or later, sorted ascending.
 * Labels the very first upcoming batch as "Pilot batch (small group)".
 * Never shows "seats left" or countdowns.
 */
export function getUpcomingBatches(referenceDateStr) {
  const today = referenceDateStr || new Date().toISOString().split('T')[0];
  const upcoming = (COURSE_INDIA.batches || [])
    .filter((dateStr) => dateStr >= today)
    .sort();

  return upcoming.map((startDate, index) => ({
    startDate,
    formattedDate: formatBatchDate(startDate),
    label: index === 0 ? 'Pilot batch (small group)' : 'Regular batch',
    isPilot: index === 0,
    status: 'Upcoming',
  }));
}

function formatBatchDate(isoDateStr) {
  try {
    const [year, month, day] = isoDateStr.split('-');
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
  } catch {
    return isoDateStr;
  }
}

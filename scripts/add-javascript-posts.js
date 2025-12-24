require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const javascriptPosts = [
    // 1. Temporal API
    {
        title: "The Temporal API: A Modern Approach to Dates and Times in JavaScript",
        isPremium: false,
        seo: {
            metaTitle: "JavaScript Temporal API: The Ultimate Guide (2025) | JSPrompt",
            metaDescription: "Say goodbye to Moment.js. Learn the new, immutable, and powerful Temporal API for modern date and time manipulation in JavaScript. A complete tutorial for 2025.",
            keywords: "javascript, temporal api, date, time, es2025, immutable js, moment.js alternative"
        }
    },
    // 2. Decorators
    {
        title: "JavaScript Decorators: A Practical Guide to the New Standard",
        isPremium: true,
        seo: {
            metaTitle: "JavaScript Decorators Explained: The Official Guide (2025) | JSPrompt",
            metaDescription: "Explore the official Stage 3 JavaScript Decorators proposal. A practical guide with real-world examples for metaprogramming in classes and methods.",
            keywords: "javascript, decorators, es2025, metaprogramming, stage 3, classes"
        }
    },
    // 3. Web Animations API
    {
        title: "Mastering the Web Animations API (WAAPI) for Performant UIs",
        isPremium: false,
        seo: {
            metaTitle: "Web Animations API (WAAPI) Tutorial for High-Performance UIs (2025) | JSPrompt",
            metaDescription: "Move beyond CSS transitions. Learn to create complex, high-performance, and interruptible animations in JavaScript with the Web Animations API (WAAPI).",
            keywords: "javascript, waapi, web animations api, animation, performance, frontend"
        }
    },
    // 4. Signals
    {
        title: "Signals: The Future of Reactive State Management in JavaScript",
        isPremium: true,
        seo: {
            metaTitle: "JavaScript Signals: The Future of Reactivity Explained (2025) | JSPrompt",
            metaDescription: "Discover Signals, the new paradigm for fine-grained, glitch-free reactivity that's taking over JavaScript frameworks. A deep dive into the concept and its benefits.",
            keywords: "javascript, signals, reactivity, state management, solidjs, angular, qwik"
        }
    },
    // 5. Explicit Resource Management
    {
        title: "Understanding `using` and `await using`: The New Resource Management Syntax",
        isPremium: true,
        seo: {
            metaTitle: "JavaScript's `using` and `await using` Keywords Explained (2025) | JSPrompt",
            metaDescription: "Learn about the new explicit resource management syntax in JavaScript with `using` and `await using` for safer file handles, database connections, and more.",
            keywords: "javascript, using, await using, resource management, es2025, memory management"
        }
    },
    // 6. Iterators & Generators
    {
        title: "A Deep Dive into the JavaScript Iterator and Generator Protocols",
        isPremium: false,
        seo: {
            metaTitle: "JavaScript Iterators and Generators: A Deep Dive (2025) | JSPrompt",
            metaDescription: "Go beyond arrays. Master the iterator and generator protocols to create custom iterable data structures and handle lazy data streams in modern JavaScript.",
            keywords: "javascript, iterators, generators, iteration protocol, async generators, es6"
        }
    },
    // 7. WebGPU
    {
        title: "WebGPU: High-Performance Graphics and Computation in the Browser",
        isPremium: true,
        seo: {
            metaTitle: "Introduction to WebGPU in JavaScript for 2025 | JSPrompt",
            metaDescription: "The successor to WebGL is here. Learn the basics of the WebGPU API for high-performance, next-generation graphics and parallel computation on the web.",
            keywords: "javascript, webgpu, graphics, performance, webgl, gpu programming"
        }
    },
    // 8. Type Annotations
    {
        title: "Type Annotations in JavaScript: The Future of JS without a Build Step?",
        isPremium: false,
        seo: {
            metaTitle: "Type Annotations in JavaScript: A Look at the Stage 1 Proposal (2025) | JSPrompt",
            metaDescription: "Explore the TC39 proposal to bring optional, comment-based type annotations to standard JavaScript. Is this the future of typed JS?",
            keywords: "javascript, type annotations, typescript, tc39, jsdoc, static typing"
        }
    },
    // 9. Prioritized Task Scheduling
    {
        title: "Building Resilient Applications with the Prioritized Task Scheduling API",
        isPremium: true,
        seo: {
            metaTitle: "Prioritized Task Scheduling API Guide for Responsive UIs (2025) | JSPrompt",
            metaDescription: "Learn how to use the browser's new Prioritized Task Scheduling API to prevent blocking the main thread and build incredibly responsive web applications.",
            keywords: "javascript, performance, scheduling api, main thread, responsive ui, web performance"
        }
    },
    // 10. HTMX
    {
        title: "The Rise of HTMX: Is it the Future of the Frontend?",
        isPremium: false,
        seo: {
            metaTitle: "HTMX Explained: A Viral Guide for JavaScript Developers (2025) | JSPrompt",
            metaDescription: "HTMX is the viral library challenging the SPA paradigm. Understand its philosophy, how it works, and where it fits in the modern JavaScript ecosystem.",
            keywords: "javascript, htmx, frontend, spa, hypermedia, web development"
        }
    },
    // 11. Functional Programming
    {
        title: "Functional Programming Patterns in Modern JavaScript",
        isPremium: true,
        seo: {
            metaTitle: "Functional Programming in JavaScript: A Practical Guide for 2025 | JSPrompt",
            metaDescription: "Learn modern functional programming patterns in JS, including composition, immutability, pure functions, and a look at the upcoming Pipe Operator (`|>`).",
            keywords: "javascript, functional programming, fp, pipe operator, immutability, pure functions"
        }
    },
    // 12. Memory Management
    {
        title: "Optimizing Memory Usage: A Guide to Garbage Collection and WeakRefs",
        isPremium: true,
        seo: {
            metaTitle: "JavaScript Memory Management and Optimization Guide (2025) | JSPrompt",
            metaDescription: "A deep dive into JavaScript memory management, the garbage collection process, and how to use `WeakRef` and `FinalizationRegistry` to prevent memory leaks.",
            keywords: "javascript, memory management, garbage collection, weakref, performance, optimization"
        }
    },
    // 13. WebTransport
    {
        title: "WebSockets vs. WebTransport: Real-Time Communication in 2025",
        isPremium: false,
        seo: {
            metaTitle: "WebTransport API vs. WebSockets: The Future of Real-Time Web (2025) | JSPrompt",
            metaDescription: "WebSockets have a successor. Learn about the new WebTransport API and its benefits for low-latency, bidirectional, and unreliable communication for games and streaming.",
            keywords: "javascript, webtransport, websockets, real-time, networking, http3"
        }
    },
    // 14. Intl Segmenter
    {
        title: "Intl.Segmenter API: Advanced Internationalization and Text Processing",
        isPremium: false,
        seo: {
            metaTitle: "JavaScript Intl.Segmenter API: A Practical Guide (2025) | JSPrompt",
            metaDescription: "Learn how to accurately split strings by graphemes, words, or sentences for any language with the powerful and modern Intl.Segmenter API.",
            keywords: "javascript, internationalization, i18n, intl api, text processing, localization"
        }
    },
    // 15. View Transitions
    {
        title: "A Practical Guide to the View Transitions API for Seamless SPAs",
        isPremium: false,
        seo: {
            metaTitle: "View Transitions API: The Ultimate Guide for SPAs (2025) | JSPrompt",
            metaDescription: "Create stunning, seamless page transitions in your Single-Page Applications with the new View Transitions API. A step-by-step tutorial.",
            keywords: "javascript, view transitions api, spa, animation, user experience, frontend"
        }
    },
    // 16. Pattern Matching
    {
        title: "Pattern Matching in JavaScript: A Look at the Upcoming Proposal",
        isPremium: true,
        seo: {
            metaTitle: "JavaScript Pattern Matching: A Guide to the TC39 Proposal (2025) | JSPrompt",
            metaDescription: "One of the most anticipated features in JavaScript. Explore the new pattern matching proposal and how it will revolutionize conditional logic in your code.",
            keywords: "javascript, pattern matching, tc39, es2025, syntax, functional programming"
        }
    },
    // 17. Million.js
    {
        title: "Million.js: Supercharging React Performance with a Block VDOM",
        isPremium: false,
        seo: {
            metaTitle: "Million.js: 70% Faster React Apps? A Viral Guide (2025) | JSPrompt",
            metaDescription: "Learn how Million.js uses a block-based virtual DOM to dramatically speed up React components. A practical guide to this trending performance library.",
            keywords: "javascript, react, million.js, performance, virtual dom, optimization"
        }
    },
    // 18. Concurrency
    {
        title: "Mastering Concurrency: Web Workers, Atomics, and SharedArrayBuffer",
        isPremium: true,
        seo: {
            metaTitle: "JavaScript Concurrency Masterclass for 2025 | JSPrompt",
            metaDescription: "Unlock true parallelism in JavaScript. A deep dive into Web Workers for multi-threading, and `SharedArrayBuffer` with `Atomics` for high-performance state sharing.",
            keywords: "javascript, concurrency, web workers, sharedarraybuffer, atomics, multi-threading"
        }
    },
    // 19. WebAuthn
    {
        title: "Secure Authentication with WebAuthn and Passkeys",
        isPremium: false,
        seo: {
            metaTitle: "The Future of Authentication: WebAuthn & Passkeys Guide (2025) | JSPrompt",
            metaDescription: "Passwords are dead. Learn how to implement secure, passwordless authentication in your web apps using the WebAuthn API and the new Passkeys standard.",
            keywords: "javascript, webauthn, passkeys, authentication, security, passwordless"
        }
    },
    // 20. ShadowRealm API
    {
        title: "The ShadowRealm API: True Sandboxing for Secure Code Execution",
        isPremium: true,
        seo: {
            metaTitle: "JavaScript ShadowRealm API: A Security Deep Dive (2025) | JSPrompt",
            metaDescription: "Explore the new ShadowRealm API for creating fully isolated JavaScript environments. The ultimate guide to sandboxing for plugin systems and third-party code.",
            keywords: "javascript, shadowrealm, security, sandbox, isolation, tc39"
        }
    },
    // 21. Astro
    {
        title: "Astro: Building Content-Rich, Performant Websites in 2025",
        isPremium: false,
        seo: {
            metaTitle: "Astro Framework: The Definitive Guide for 2025 | JSPrompt",
            metaDescription: "Learn Astro, the web framework for building content-driven websites with a focus on performance and minimal client-side JavaScript. A complete tutorial.",
            keywords: "javascript, astro, web development, performance, islands architecture, static site generator"
        }
    },
    // 22. Result Types
    {
        title: "Advanced Error Handling: `try/catch` vs. Result Types",
        isPremium: true,
        seo: {
            metaTitle: "JavaScript Error Handling with Result Types (2025) | JSPrompt",
            metaDescription: "Stop throwing errors. Learn the powerful pattern of using Result types (Success/Failure) for predictable, type-safe, and robust error handling in JavaScript.",
            keywords: "javascript, error handling, result type, functional programming, robust code"
        }
    },
    // 23. Proxy & Reflect
    {
        title: "Proxy and Reflect APIs: The Ultimate Metaprogramming Tools",
        isPremium: true,
        seo: {
            metaTitle: "JavaScript Proxy and Reflect: The Ultimate Guide (2025) | JSPrompt",
            metaDescription: "A deep dive into JavaScript's Proxy and Reflect APIs. Learn to intercept and customize object operations for powerful metaprogramming, state management, and more.",
            keywords: "javascript, proxy, reflect, metaprogramming, es6, advanced js"
        }
    },
    // 24. IndexedDB
    {
        title: "Efficient Data Handling with IndexedDB and the Storage Buckets API",
        isPremium: false,
        seo: {
            metaTitle: "Modern IndexedDB Guide with Storage Buckets API (2025) | JSPrompt",
            metaDescription: "Go beyond localStorage. Learn to use the powerful IndexedDB API for client-side storage, and the new Storage Buckets API for optimized, persistent data.",
            keywords: "javascript, indexeddb, storage buckets api, client-side storage, offline first, pwa"
        }
    },
    // 25. Pipe Operator
    {
        title: "The Pipe Operator (`|>`): A New Era for Functional JavaScript",
        isPremium: true,
        seo: {
            metaTitle: "The JavaScript Pipe Operator (`|>`) is Coming: A 2025 Guide | JSPrompt",
            metaDescription: "Explore the Stage 2 Pipe Operator proposal. Learn how it will simplify function composition and make your functional JavaScript code more readable and elegant.",
            keywords: "javascript, pipe operator, functional programming, tc39, es2025, syntax"
        }
    },
    // 26. TanStack Router
    {
        title: "TanStack Router: Type-Safe Routing for Modern Web Apps",
        isPremium: false,
        seo: {
            metaTitle: "TanStack Router: The Ultimate Type-Safe Routing Guide (2025) | JSPrompt",
            metaDescription: "The creator of React Query reinvents routing. A complete guide to TanStack Router for building fully type-safe, framework-agnostic single-page applications.",
            keywords: "javascript, tanstack router, routing, type-safe, react, solid, vue"
        }
    },
    // 27. Event Loop
    {
        title: "Understanding the JavaScript Event Loop: A Visual Guide for 2025",
        isPremium: false,
        seo: {
            metaTitle: "The JavaScript Event Loop: A Visual Guide (2025) | JSPrompt",
            metaDescription: "The most important and misunderstood concept in JavaScript. A definitive, visual guide to the event loop, callback queue, microtasks, and macrotasks.",
            keywords: "javascript, event loop, async, concurrency, node.js, performance"
        }
    },
    // 28. Svelte 5
    {
        title: "Svelte 5 and Runes: The Future of Reactivity",
        isPremium: false,
        seo: {
            metaTitle: "Svelte 5 and Runes: Everything You Need to Know (2025) | JSPrompt",
            metaDescription: "Svelte 5 is a paradigm shift. A deep dive into Runes, the new reactivity model that brings fine-grained control and Signals-like power to Svelte.",
            keywords: "javascript, svelte, svelte 5, runes, reactivity, frontend"
        }
    },
    // 29. Qwik
    {
        title: "Qwik: The Resumable Framework for Instant-Loading Web Apps",
        isPremium: true,
        seo: {
            metaTitle: "Qwik Framework: A Guide to Resumability for 2025 | JSPrompt",
            metaDescription: "Learn about Qwik, the revolutionary framework that achieves instant-on performance through resumability and fine-grained lazy-loading. Is it the future?",
            keywords: "javascript, qwik, resumability, performance, web development, core web vitals"
        }
    },
    // 30. Runtimes
    {
        title: "Bun vs. Node.js vs. Deno: The State of JavaScript Runtimes in 2025",
        isPremium: false,
        seo: {
            metaTitle: "Bun vs. Node.js vs. Deno: The Ultimate Comparison (2025) | JSPrompt",
            metaDescription: "A deep, performance-based comparison of the top JavaScript runtimes. Which is fastest? Which is best for your next project? The definitive 2025 guide.",
            keywords: "javascript, bun, node.js, deno, runtime, performance, benchmark"
        }
    }
];


const generateSlug = (title) => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

async function addJavaScriptPosts() {
  if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    const adminUser = await User.findOne({ email: ADMIN_EMAIL });
    if (!adminUser) {
        console.error(`Error: Admin user with email ${ADMIN_EMAIL} not found.`);
        process.exit(1);
    }
    
    for (const post of javascriptPosts) {
        let slug = generateSlug(post.title);
        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
            console.log(`Skipping existing post: ${post.title}`);
            continue;
        }

        const newPostData = {
            postID: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            title: post.title,
            content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: `Content for "${post.title}" will be generated here.` }] }] },
            category: 'JavaScript',
            slug,
            author: adminUser._id,
            isPremium: post.isPremium,
            metaTitle: post.seo.metaTitle,
            metaDescription: post.seo.metaDescription,
            keywords: post.seo.keywords,
        };
        
        await Post.create(newPostData);
        console.log(`Successfully created post stub: ${post.title}`);
    }

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

addJavaScriptPosts();

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const typescriptPosts = [
    // 1. Decorators
    {
        title: "A Deep Dive into TypeScript 5.0 Decorators",
        isPremium: true,
        seo: {
            metaTitle: "TypeScript 5.0 Decorators: The Complete Guide (2024) | JSPrompt",
            metaDescription: "Explore the new ECMAScript decorators in TypeScript 5.0. Learn how to use class, method, and field decorators with practical, real-world examples for metaprogramming.",
            keywords: "typescript, decorators, typescript 5, metaprogramming, ecmascript decorators, class decorators, method decorators"
        }
    },
    // 2. Conditional Types
    {
        title: "Mastering Advanced Conditional Types in TypeScript",
        isPremium: true,
        seo: {
            metaTitle: "Advanced Conditional Types in TypeScript: A Practical Guide | JSPrompt",
            metaDescription: "Go beyond basic types with advanced conditional types in TypeScript. Learn about the `infer` keyword, distributive conditional types, and create powerful, dynamic types.",
            keywords: "typescript, conditional types, advanced types, infer, mapped types, generic types"
        }
    },
    // 3. Zod
    {
        title: "End-to-End Type Safety with Zod: The Ultimate Validation Guide",
        isPremium: false,
        seo: {
            metaTitle: "The Ultimate Guide to Zod for TypeScript Validation | JSPrompt",
            metaDescription: "Learn how to use Zod to create schemas, parse and validate data, and achieve end-to-end type safety in your TypeScript applications. Includes practical examples.",
            keywords: "typescript, zod, validation, schema validation, type safety, data parsing"
        }
    },
    // 4. tRPC
    {
        title: "Building Fully Type-Safe APIs with tRPC and Next.js",
        isPremium: true,
        seo: {
            metaTitle: "Type-Safe APIs with tRPC and Next.js: A Step-by-Step Tutorial | JSPrompt",
            metaDescription: "Stop guessing your API's types. Learn to build fully type-safe, end-to-end APIs using tRPC in a Next.js application for ultimate developer experience and safety.",
            keywords: "typescript, trpc, next.js, type-safe api, full-stack, api development"
        }
    },
    // 5. Generics
    {
        title: "TypeScript Generics Explained: From Basics to Advanced Patterns",
        isPremium: false,
        seo: {
            metaTitle: "TypeScript Generics Explained: From Basics to Advanced | JSPrompt",
            metaDescription: "A complete guide to TypeScript generics. Learn how to write reusable, type-safe components, functions, and classes with constraints, mapped types, and more.",
            keywords: "typescript, generics, generic constraints, mapped types, utility types"
        }
    },
    // 6. Namespaces vs Modules
    {
        title: "TypeScript Namespaces vs. ES Modules: A Definitive Guide",
        isPremium: false,
        seo: {
            metaTitle: "TypeScript Namespaces vs. ES Modules: When and How to Use Them | JSPrompt",
            metaDescription: "Clear up the confusion between TypeScript namespaces and modern ES modules. Understand the history, use cases, and best practices for organizing your code.",
            keywords: "typescript, namespaces, es modules, code organization, import, export"
        }
    },
    // 7. Nominal Typing
    {
        title: "Simulating Nominal Typing in TypeScript for Stronger Type Safety",
        isPremium: true,
        seo: {
            metaTitle: "Nominal Typing in TypeScript: Simulating Stronger Types | JSPrompt",
            metaDescription: "TypeScript uses structural typing. Learn why and how to simulate nominal typing (branded types) to prevent logical errors and create more robust, type-safe code.",
            keywords: "typescript, nominal typing, structural typing, branded types, type safety, advanced types"
        }
    },
    // 8. 'satisfies' keyword
    {
        title: "The `satisfies` Operator: A Game Changer for TypeScript Type Safety",
        isPremium: false,
        seo: {
            metaTitle: "TypeScript's `satisfies` Operator: A Practical Guide | JSPrompt",
            metaDescription: "Discover TypeScript's powerful `satisfies` operator. Learn how it improves type inference and safety without widening types, with practical, easy-to-understand examples.",
            keywords: "typescript, satisfies, type safety, type inference, typescript 4.9"
        }
    },
    // 9. State Machines
    {
        title: "Building a Type-Safe State Machine in TypeScript",
        isPremium: true,
        seo: {
            metaTitle: "How to Build a Type-Safe State Machine in TypeScript | JSPrompt",
            metaDescription: "Model complex, bug-free stateful logic using TypeScript's advanced features. Learn to build a fully type-safe state machine with discriminated unions and state functions.",
            keywords: "typescript, state machine, finite state machine, fsm, design patterns, advanced types"
        }
    },
    // 10. Discriminated Unions
    {
        title: "Advanced Error Handling with Discriminated Unions",
        isPremium: false,
        seo: {
            metaTitle: "Advanced TypeScript Error Handling with Discriminated Unions | JSPrompt",
            metaDescription: "Stop using generic Error objects. Learn the powerful pattern of using discriminated unions to create predictable, type-safe, and exhaustive error handling in TypeScript.",
            keywords: "typescript, error handling, discriminated unions, tagged unions, pattern matching, robust code"
        }
    },
    // 11. Type-Level Programming
    {
        title: "Introduction to Type-Level Programming in TypeScript",
        isPremium: true,
        seo: {
            metaTitle: "An Introduction to Type-Level Programming in TypeScript | JSPrompt",
            metaDescription: "Push TypeScript to its limits. Learn the basics of type-level programming to perform computations and logic within the TypeScript type system itself for ultimate safety.",
            keywords: "typescript, type-level programming, advanced types, type manipulation, metaprogramming"
        }
    },
    // 12. Build Performance
    {
        title: "Optimizing Your TypeScript Build Performance: A Practical Guide",
        isPremium: false,
        seo: {
            metaTitle: "How to Optimize TypeScript Build Performance | JSPrompt",
            metaDescription: "Is your TypeScript build slow? This practical guide covers project references, incremental builds, build caching, and other essential techniques to speed up `tsc`.",
            keywords: "typescript, performance, build tools, tsc, compilation speed, optimization"
        }
    },
    // 13. WebAssembly
    {
        title: "TypeScript and WebAssembly (Wasm): The Future of Web Performance",
        isPremium: true,
        seo: {
            metaTitle: "Using TypeScript with WebAssembly (Wasm) in 2024 | JSPrompt",
            metaDescription: "Unlock near-native performance in your web apps. This guide explores how to compile, instantiate, and interact with WebAssembly modules safely from TypeScript.",
            keywords: "typescript, webassembly, wasm, performance, assemblyscript, rust"
        }
    },
    // 14. Custom Transformer
    {
        title: "Creating a Custom TypeScript Transformer from Scratch",
        isPremium: true,
        seo: {
            metaTitle: "How to Create a Custom TypeScript Transformer | JSPrompt",
            metaDescription: "A deep-dive tutorial for advanced developers on writing a custom TypeScript transformer to modify the AST during compilation for powerful, custom language features.",
            keywords: "typescript, transformer, compiler api, ast, abstract syntax tree, metaprogramming"
        }
    },
    // 15. Type-Safe CSS Modules
    {
        title: "Achieving True Type-Safe CSS Modules in Next.js",
        isPremium: false,
        seo: {
            metaTitle: "Type-Safe CSS Modules in Next.js & TypeScript | JSPrompt",
            metaDescription: "Prevent runtime errors and typos in your styling. Learn how to configure your Next.js and TypeScript project for fully type-safe CSS Modules.",
            keywords: "typescript, css modules, next.js, type safety, frontend, styling"
        }
    }
];

const generateSlug = (title) => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

async function addTypeScriptPosts() {
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
    
    for (const post of typescriptPosts) {
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
            category: 'TypeScript',
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

  } catch (error)
 {
    console.error('An error occurred:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

addTypeScriptPosts();

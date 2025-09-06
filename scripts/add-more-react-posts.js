require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const newReactPosts = [
    {
        title: "React State Management: A Guide to useContext and useReducer",
        category: 'React',
        isPremium: false,
        seo: {
            metaTitle: "React useContext & useReducer Guide | Simple State Management | JSPrompt",
            metaDescription: "Go beyond useState. Learn how to manage complex state in React applications with the useContext and useReducer hooks for clean, scalable code.",
            keywords: "react, state management, useContext, useReducer, react hooks, tutorial",
        },
    },
    {
        title: "Client vs. Server Components in Next.js 14: A Practical Guide",
        category: 'React',
        isPremium: false,
        seo: {
            metaTitle: "Next.js 14 Client vs Server Components Explained | JSPrompt",
            metaDescription: "Understand the key difference between Client and Server Components in Next.js 14 and the React Server Components paradigm. A practical guide with examples.",
            keywords: "react, nextjs 14, server components, client components, rsc, tutorial, trending",
        },
    },
    {
        title: "Mastering React Router: A Guide to Dynamic Routing",
        category: 'React',
        isPremium: false,
        seo: {
            metaTitle: "React Router Tutorial: A Guide to Dynamic Routing | JSPrompt",
            metaDescription: "Learn how to handle dynamic routes, nested routes, and route parameters in your React application with the React Router library. A complete guide.",
            keywords: "react, react router, routing, dynamic routes, nested routes, tutorial",
        },
    },
    {
        title: "Optimizing Performance in React with useMemo and useCallback",
        category: 'React',
        isPremium: false,
        seo: {
            metaTitle: "React Performance Optimization with useMemo & useCallback | JSPrompt",
            metaDescription: "Speed up your React applications. Learn how and when to use the useMemo and useCallback hooks to prevent unnecessary re-renders and optimize performance.",
            keywords: "react, performance, optimization, useMemo, useCallback, react hooks, tutorial",
        },
    },
    {
        title: "Building Forms in React: Controlled vs. Uncontrolled Components",
        category: 'React',
        isPremium: false,
        seo: {
            metaTitle: "React Forms: Controlled vs. Uncontrolled Components | JSPrompt",
            metaDescription: "A complete guide to handling forms in React. Understand the difference between controlled and uncontrolled components and which approach is right for you.",
            keywords: "react, forms, controlled components, uncontrolled components, form handling, tutorial",
        },
    },
    {
        title: "Styling in React: From CSS Modules to Tailwind CSS",
        category: 'React',
        isPremium: false,
        seo: {
            metaTitle: "Styling React Components: A Complete Guide | JSPrompt",
            metaDescription: "Explore the best ways to style your React components, from traditional CSS and CSS Modules to modern solutions like Styled-Components and Tailwind CSS.",
            keywords: "react, styling, css, css modules, styled-components, tailwind css, tutorial",
        },
    },
    {
        title: "Introduction to Zustand: Simple State Management for React",
        category: 'React',
        isPremium: false,
        seo: {
            metaTitle: "Zustand: Simple React State Management Tutorial | JSPrompt",
            metaDescription: "Tired of complex state management? Learn how to use Zustand, a small, fast, and scalable state management solution for React. A beginner-friendly tutorial.",
            keywords: "react, state management, zustand, redux alternative, trending, tutorial",
        },
    },
    {
        title: "React Server Actions in Next.js 14: The Future of Mutations",
        category: 'React',
        isPremium: true,
        seo: {
            metaTitle: "Next.js 14 Server Actions: A Complete Guide | JSPrompt",
            metaDescription: "A deep dive into React Server Actions in Next.js 14. Learn how to simplify data mutations and build full-stack logic directly in your components.",
            keywords: "react, nextjs 14, server actions, data mutation, full-stack, trending, premium",
        },
    },
    {
        title: "Testing React Components with Jest and React Testing Library",
        category: 'React',
        isPremium: false,
        seo: {
            metaTitle: "Testing React Components with Jest & React Testing Library | JSPrompt",
            metaDescription: "Learn how to write effective tests for your React components using Jest and React Testing Library. A practical guide to building reliable applications.",
            keywords: "react, testing, jest, react testing library, unit testing, integration testing, tutorial",
        },
    },
    {
        title: "Understanding the React Virtual DOM",
        category: 'React',
        isPremium: false,
        seo: {
            metaTitle: "React's Virtual DOM Explained for Beginners | JSPrompt",
            metaDescription: "What is the Virtual DOM? This guide explains how React's Virtual DOM works, why it's so fast, and how it improves performance through diffing and reconciliation.",
            keywords: "react, virtual dom, vdom, reconciliation, diffing, performance, tutorial",
        },
    },
];

const generateSlug = (title) => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

async function addMoreReactPosts() {
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
    
    for (const post of newReactPosts) {
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
            category: post.category,
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

addMoreReactPosts();

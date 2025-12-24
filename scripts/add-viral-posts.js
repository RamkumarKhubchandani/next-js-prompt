require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const viralPosts = [
    {
        title: "JavaScript's New Era: A Deep Dive into Bun and Deno",
        category: 'JavaScript',
        isPremium: true,
        seo: {
            metaTitle: "Bun vs Deno: The Future of JavaScript Runtimes (2024) | JSPrompt",
            metaDescription: "A deep dive into the next-generation JavaScript runtimes. Explore Bun and Deno's performance, features, and how they challenge Node.js's dominance.",
            keywords: "javascript, bun, deno, nodejs, runtime, performance, trending, 2024, premium",
        },
    },
    {
        title: "Building Streaming UIs in Next.js with Suspense and Server Components",
        category: 'React',
        isPremium: true,
        seo: {
            metaTitle: "Streaming UI with React Suspense & Next.js 14 Tutorial | JSPrompt",
            metaDescription: "Create lightning-fast user experiences with streaming UIs. A practical guide to using Suspense and React Server Components in Next.js for instant page loads.",
            keywords: "react, nextjs, suspense, streaming, server components, performance, trending, 2024, premium",
        },
    },
    {
        title: "Advanced Lazy Loading Strategies in Angular for Peak Performance",
        category: 'Angular',
        isPremium: true,
        seo: {
            metaTitle: "Advanced Angular Lazy Loading Strategies (2024) | JSPrompt",
            metaDescription: "Master advanced lazy loading in Angular to achieve sub-second load times. This guide covers preloading strategies, custom preloading, and component-level lazy loading.",
            keywords: "angular, lazy loading, performance, core web vitals, preloading, optimization, trending, 2024, premium",
        },
    },
    {
        title: "Creating Advanced Reusable Components with Vue 3's Composition API",
        category: 'Vue',
        isPremium: true,
        seo: {
            metaTitle: "Advanced Reusable Vue Components with Composition API | JSPrompt",
            metaDescription: "Go beyond basic components. Learn to create highly reusable, flexible, and type-safe components in Vue 3 using advanced Composition API patterns.",
            keywords: "vue, composition api, reusable components, typescript, advanced, trending, 2024, premium",
        },
    },
    {
        title: "Securing Your Node.js & Express API: A Production Checklist",
        category: 'Node.js',
        isPremium: true,
        seo: {
            metaTitle: "Node.js & Express API Security: Production Checklist (2024) | JSPrompt",
            metaDescription: "A comprehensive guide to securing your Node.js API. Covers rate limiting, Helmet for headers, data validation, authentication, and other essential best practices.",
            keywords: "nodejs, express, security, api, helmet, rate limiting, authentication, production, checklist, premium",
        },
    },
    {
        title: "Implementing Vector Search in MongoDB for AI Applications",
        category: 'MongoDB',
        isPremium: true,
        seo: {
            metaTitle: "MongoDB Vector Search Tutorial for AI & RAG Apps (2024) | JSPrompt",
            metaDescription: "Unlock the power of AI with MongoDB Atlas Vector Search. A practical guide to implementing semantic search and building Retrieval-Augmented Generation (RAG) apps.",
            keywords: "mongodb, vector search, ai, artificial intelligence, rag, semantic search, atlas, trending, 2024, premium",
        },
    },
];

const generateSlug = (title) => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

async function addViralPosts() {
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
    
    for (const post of viralPosts) {
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

addViralPosts();

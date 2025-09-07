require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const trendingPosts = [
    {
        title: "Advanced State Management in React with Zustand",
        category: 'React',
        isPremium: true,
        seo: {
            metaTitle: "Advanced Zustand Tutorial for React State Management (2024) | JSPrompt",
            metaDescription: "A deep dive into advanced Zustand patterns for React. Learn about middleware, selectors for performance, and persisting state to make your app world-famous.",
            keywords: "react, zustand, state management, advanced, middleware, selectors, persist, trending, 2024, premium",
        },
    },
    {
        title: "The Power of Angular Signals: A Modern Approach to Reactivity",
        category: 'Angular',
        isPremium: true,
        seo: {
            metaTitle: "Angular Signals Tutorial: The Future of Reactivity (2024) | JSPrompt",
            metaDescription: "Master Angular Signals, the new fine-grained reactivity model. A complete guide to signals, computed, and effects for high-performance Angular apps.",
            keywords: "angular, signals, reactivity, performance, computed, effect, trending, 2024, premium",
        },
    },
    {
        title: "Building Full-Stack Apps with Nuxt.js: An Introduction",
        category: 'Vue',
        isPremium: true,
        seo: {
            metaTitle: "Nuxt.js Tutorial for Full-Stack Vue Apps (2024) | JSPrompt",
            metaDescription: "Learn Nuxt.js, the full-stack framework for Vue. This guide covers server-side rendering (SSR), file-based routing, and data fetching for viral web apps.",
            keywords: "vue, nuxtjs, full-stack, server-side rendering, ssr, framework, trending, 2024, premium",
        },
    },
    {
        title: "Building a GraphQL API with Node.js and Apollo Server",
        category: 'Node.js',
        isPremium: true,
        seo: {
            metaTitle: "Node.js GraphQL API Tutorial with Apollo Server (2024) | JSPrompt",
            metaDescription: "Move beyond REST. Learn to build a powerful, flexible GraphQL API with Node.js and Apollo Server. Define schemas, write resolvers, and master modern API design.",
            keywords: "nodejs, graphql, api, apollo server, resolvers, schema, trending, 2024, premium",
        },
    },
    {
        title: "Real-time Data with MongoDB Change Streams",
        category: 'MongoDB',
        isPremium: true,
        seo: {
            metaTitle: "MongoDB Change Streams for Real-time Apps (2024) | JSPrompt",
            metaDescription: "Build real-time features with MongoDB Change Streams. Learn how to listen for database changes in real-time to power live notifications, dashboards, and more.",
            keywords: "mongodb, change streams, real-time, database, triggers, websockets, trending, 2024, premium",
        },
    },
];

const generateSlug = (title) => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

async function addTrendingPosts() {
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
    
    for (const post of trendingPosts) {
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

addTrendingPosts();

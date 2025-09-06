require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const angularPosts = [
    {
        title: "Dependency Injection in Angular: A Core Concept",
        category: 'Angular',
        isPremium: false,
        seo: {
            metaTitle: "Angular Dependency Injection (DI) Explained | JSPrompt",
            metaDescription: "Understand one of Angular's most powerful features: Dependency Injection (DI). Learn how DI makes your application more modular, testable, and maintainable.",
            keywords: "angular, dependency injection, di, services, providers, tutorial",
        },
    },
    {
        title: "Angular Routing: A Guide to the Router Module",
        category: 'Angular',
        isPremium: false,
        seo: {
            metaTitle: "Angular Routing Tutorial: A Complete Guide | JSPrompt",
            metaDescription: "Learn how to create single-page applications with Angular's Router. This guide covers basic routes, route parameters, and navigating between views.",
            keywords: "angular, routing, routermodule, routerlink, single page application, spa, tutorial",
        },
    },
    {
        title: "Introduction to Angular Services and HTTPClient",
        category: 'Angular',
        isPremium: false,
        seo: {
            metaTitle: "Angular Services & HTTPClient for API Requests | JSPrompt",
            metaDescription: "Learn how to use Angular Services to share logic and data. This guide covers creating services and using the HTTPClient module to fetch data from APIs.",
            keywords: "angular, services, httpclient, api, data fetching, tutorial",
        },
    },
    {
        title: "Reactive Forms in Angular: A Practical Guide",
        category: 'Angular',
        isPremium: true,
        seo: {
            metaTitle: "Angular Reactive Forms: A Practical Guide with Validation | JSPrompt",
            metaDescription: "A deep dive into Angular's powerful Reactive Forms. Learn how to build scalable, predictable forms with complex validation rules and dynamic fields.",
            keywords: "angular, reactive forms, formgroup, formcontrol, validation, premium, tutorial",
        },
    },
    {
        title: "Understanding Angular Modules (@NgModule)",
        category: 'Angular',
        isPremium: false,
        seo: {
            metaTitle: "Angular Modules (NgModule) Explained for Beginners | JSPrompt",
            metaDescription: "What is an NgModule? This guide explains how Angular uses modules to organize your application, manage dependencies, and improve performance.",
            keywords: "angular, modules, ngmodule, lazy loading, organization, tutorial",
        },
    },
];

const generateSlug = (title) => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

async function addAngularPosts() {
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
    
    for (const post of angularPosts) {
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

addAngularPosts();

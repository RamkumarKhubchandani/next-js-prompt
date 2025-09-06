require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const vuePosts = [
    {
        title: "Vue's Reactivity System Explained: ref and reactive",
        category: 'Vue',
        isPremium: false,
        seo: {
            metaTitle: "Vue Reactivity Explained: ref() vs reactive() | JSPrompt",
            metaDescription: "A deep dive into Vue's powerful reactivity system. Learn the difference between ref() and reactive() and when to use each for managing your component state.",
            keywords: "vue, reactivity, ref, reactive, composition api, state management, tutorial",
        },
    },
    {
        title: "Vue Components: Props, Events, and Slots",
        category: 'Vue',
        isPremium: false,
        seo: {
            metaTitle: "Vue Components Tutorial: Props, Events, and Slots | JSPrompt",
            metaDescription: "Learn how to build reusable and flexible Vue components. This guide covers passing data with props, emitting events with `emit`, and content distribution with slots.",
            keywords: "vue, components, props, events, emit, slots, tutorial",
        },
    },
    {
        title: "Conditional Rendering and List Rendering in Vue (v-if, v-for)",
        category: 'Vue',
        isPremium: false,
        seo: {
            metaTitle: "Vue v-if and v-for Directives Explained | JSPrompt",
            metaDescription: "Master two of Vue's most essential directives. Learn how to conditionally render elements with v-if and v-show, and how to render lists of items with v-for.",
            keywords: "vue, v-if, v-for, conditional rendering, list rendering, directives, tutorial",
        },
    },
    {
        title: "Introduction to Vue Router for SPA Navigation",
        category: 'Vue',
        isPremium: false,
        seo: {
            metaTitle: "Vue Router Tutorial: A Beginner's Guide to SPA Navigation | JSPrompt",
            metaDescription: "Learn how to build a Single-Page Application (SPA) with Vue Router. This guide covers setting up routes, navigating with `router-link`, and dynamic route matching.",
            keywords: "vue, vue router, routing, single page application, spa, tutorial",
        },
    },
    {
        title: "State Management with Pinia: The Official Vue Store",
        category: 'Vue',
        isPremium: true,
        seo: {
            metaTitle: "Vue State Management with Pinia: A Complete Guide | JSPrompt",
            metaDescription: "A deep dive into Pinia, the official state management library for Vue. Learn how to create stores, manage state, and access your data across components.",
            keywords: "vue, state management, pinia, vuex, store, trending, premium, tutorial",
        },
    },
];

const generateSlug = (title) => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

async function addVuePosts() {
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
    
    for (const post of vuePosts) {
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

addVuePosts();

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const nodePosts = [
    {
        title: "Creating a Simple Express.js Server",
        category: 'Node.js',
        isPremium: false,
        seo: {
            metaTitle: "How to Create a Simple Express.js Server | Node.js Tutorial | JSPrompt",
            metaDescription: "Learn how to create your first web server using Node.js and Express.js. This beginner-friendly tutorial covers basic setup, routing, and listening for requests.",
            keywords: "nodejs, expressjs, server, web server, http, tutorial",
        },
    },
    {
        title: "Asynchronous JavaScript in Node.js: Callbacks, Promises, and Async/Await",
        category: 'Node.js',
        isPremium: false,
        seo: {
            metaTitle: "Asynchronous Node.js Explained: Callbacks, Promises, Async/Await | JSPrompt",
            metaDescription: "Master asynchronous programming in Node.js. This guide clearly explains the evolution from callbacks to Promises and the modern async/await syntax.",
            keywords: "nodejs, asynchronous, javascript, callbacks, promises, async, await, tutorial",
        },
    },
    {
        title: "Working with File System (`fs`) Module in Node.js",
        category: 'Node.js',
        isPremium: false,
        seo: {
            metaTitle: "Node.js File System (fs) Module Tutorial | JSPrompt",
            metaDescription: "Learn how to read, write, and manipulate files in Node.js using the built-in `fs` module. This guide covers both synchronous and asynchronous file operations.",
            keywords: "nodejs, file system, fs, read file, write file, tutorial",
        },
    },
    {
        title: "Building a RESTful API with Node.js and Express",
        category: 'Node.js',
        isPremium: true,
        seo: {
            metaTitle: "Build a RESTful API with Node.js & Express | Premium Tutorial | JSPrompt",
            metaDescription: "A complete guide to building a production-ready RESTful API using Node.js, Express, and MongoDB. Learn about routing, controllers, models, and best practices.",
            keywords: "nodejs, expressjs, rest api, mongodb, backend, premium, tutorial",
        },
    },
    {
        title: "Introduction to WebSockets in Node.js with `ws`",
        category: 'Node.js',
        isPremium: true,
        seo: {
            metaTitle: "Real-time Apps with Node.js & WebSockets (`ws`) | JSPrompt",
            metaDescription: "Learn how to build real-time applications like chat apps with Node.js and the popular `ws` library for WebSockets. A practical, hands-on guide.",
            keywords: "nodejs, websockets, ws, real-time, chat, trending, premium, tutorial",
        },
    },
];

const generateSlug = (title) => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

async function addNodePosts() {
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
    
    for (const post of nodePosts) {
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

addNodePosts();

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const mongoPosts = [
    {
        title: "Introduction to NoSQL and MongoDB: The Basics",
        category: 'MongoDB',
        isPremium: false,
        seo: {
            metaTitle: "What is NoSQL & MongoDB? A Beginner's Guide | JSPrompt",
            metaDescription: "Learn the fundamentals of NoSQL databases and get introduced to MongoDB, the leading document-oriented database. Understand the key differences from SQL.",
            keywords: "mongodb, nosql, database, introduction, basics, tutorial",
        },
    },
    {
        title: "CRUD Operations in MongoDB: A Practical Guide",
        category: 'MongoDB',
        isPremium: false,
        seo: {
            metaTitle: "MongoDB CRUD Operations (Create, Read, Update, Delete) | JSPrompt",
            metaDescription: "A hands-on guide to performing the four basic database operations in MongoDB: Create, Read, Update, and Delete documents using the Mongo Shell.",
            keywords: "mongodb, crud, create, read, update, delete, tutorial",
        },
    },
    {
        title: "Data Modeling in MongoDB: Documents, Collections, and Relationships",
        category: 'MongoDB',
        isPremium: false,
        seo: {
            metaTitle: "MongoDB Data Modeling Tutorial | JSPrompt",
            metaDescription: "Learn how to model your data effectively in MongoDB. This guide covers the concepts of documents, collections, and how to handle relationships between data.",
            keywords: "mongodb, data modeling, schema design, documents, collections, relationships, tutorial",
        },
    },
    {
        title: "MongoDB Aggregation Framework: An Introduction",
        category: 'MongoDB',
        isPremium: true,
        seo: {
            metaTitle: "Introduction to the MongoDB Aggregation Framework | JSPrompt",
            metaDescription: "Go beyond simple queries with the MongoDB Aggregation Framework. Learn how to process data records and return computed results in this premium tutorial.",
            keywords: "mongodb, aggregation, data processing, pipeline, premium, tutorial",
        },
    },
    {
        title: "Indexing and Performance in MongoDB",
        category: 'MongoDB',
        isPremium: true,
        seo: {
            metaTitle: "MongoDB Indexing and Performance Optimization | JSPrompt",
            metaDescription: "Learn how to dramatically speed up your queries in MongoDB by using indexes. This premium guide covers different index types and performance best practices.",
            keywords: "mongodb, indexing, performance, optimization, query, premium, tutorial",
        },
    },
];

const generateSlug = (title) => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

async function addMongoPosts() {
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
    
    for (const post of mongoPosts) {
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

addMongoPosts();

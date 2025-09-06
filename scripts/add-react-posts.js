require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const reactPosts = [
    {
        title: "Understanding the useEffect Hook for Data Fetching in React",
        category: 'React',
        isPremium: false,
        seo: {
            metaTitle: "React useEffect Hook for Data Fetching: A Complete Guide | JSPrompt",
            metaDescription: "Learn how to fetch data in your React components using the useEffect hook. This guide covers loading states, error handling, and the dependency array.",
            keywords: "react, useEffect, data fetching, api, hooks, tutorial, guide, async, await",
        },
        content: { /* Tiptap JSON content for useEffect */ }
    },
    {
        title: "Passing Data Between Components with Props in React",
        category: 'React',
        isPremium: false,
        seo: {
            metaTitle: "React Props Explained: Passing Data Between Components | JSPrompt",
            metaDescription: "Master how to pass data from parent to child components in React using props. A fundamental concept for building dynamic React applications.",
            keywords: "react, props, components, parent-child, data flow, tutorial, beginners",
        },
        content: { /* Tiptap JSON content for Props */ }
    },
    {
        title: "Conditional Rendering in React: A Deep Dive",
        category: 'React',
        isPremium: false,
        seo: {
            metaTitle: "Conditional Rendering in React: if, &&, and Ternaries | JSPrompt",
            metaDescription: "Learn the best techniques for conditional rendering in React. This guide covers using if statements, logical && operators, and ternary operators to show or hide components.",
            keywords: "react, conditional rendering, if-else, ternary operator, logical and, tutorial",
        },
        content: { /* Tiptap JSON content for Conditional Rendering */ }
    },
    {
        title: "Handling User Events in React",
        category: 'React',
        isPremium: false,
        seo: {
            metaTitle: "React Event Handling: A Practical Guide (onClick, onChange) | JSPrompt",
            metaDescription: "Learn how to handle user events like clicks, form submissions, and input changes in React. This practical guide covers event handlers and synthetic events.",
            keywords: "react, event handling, onClick, onChange, onSubmit, synthetic events, tutorial",
        },
        content: { /* Tiptap JSON content for Event Handling */ }
    },
    {
        title: "Building Reusable Custom Hooks in React",
        category: 'React',
        isPremium: true,
        seo: {
            metaTitle: "Creating Custom Hooks in React for Reusable Logic | JSPrompt",
            metaDescription: "Level up your React skills by learning how to create your own custom hooks. This guide shows you how to extract and reuse component logic for cleaner, more maintainable code.",
            keywords: "react, custom hooks, reusable logic, advanced react, tutorial, useFetch, hooks",
        },
        content: { /* Tiptap JSON content for Custom Hooks */ }
    }
];

// Helper to generate a unique slug
const generateSlug = (title) => {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

async function addReactPosts() {
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
    
    for (const post of reactPosts) {
        let slug = generateSlug(post.title);
        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
            slug = `${slug}-${Date.now()}`;
        }

        const newPostData = {
            postID: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            title: post.title,
            content: post.content, // Placeholder
            category: post.category,
            slug,
            author: adminUser._id,
            isPremium: post.isPremium,
            metaTitle: post.seo.metaTitle,
            metaDescription: post.seo.metaDescription,
            keywords: post.seo.keywords,
        };
        
        // In a real implementation, the Tiptap JSON content would be fully fleshed out here.
        // For this script, I'm focusing on the structure and SEO.
        // I will add the real content in the next step.
        newPostData.content = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: `Content for "${post.title}" will be generated here.` }] }] };

        await Post.create(newPostData);
        console.log(`Successfully created post: ${post.title}`);
    }

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

addReactPosts();

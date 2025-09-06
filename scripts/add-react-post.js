require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const reactPost = {
    title: "Understanding the useState Hook in React: A Simple Guide",
    category: 'React',
    isPremium: false,
    seo: {
        metaTitle: "React useState Hook Explained: A Simple Guide for Beginners | JSPrompt",
        metaDescription: "Learn how to manage state in your React components with the useState hook. Our simple guide includes clear examples of counters and forms.",
        keywords: "react, react hooks, useState, state management, react tutorial, beginners, guide, code example, functional components",
    },
    content: {
        type: 'doc',
        content: [
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is State in a React Component?" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "State is any data that describes the \"state\" of your application at a given time. Think of it as a component's memory. It's data that can change over time, and whenever it changes, React will automatically re-render the component to reflect those changes. For example, the text in an input field, whether a checkbox is ticked, or the list of items in a shopping cart are all pieces of state." }] },
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Introducing the `useState` Hook" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "In modern React, we use \"Hooks\" to manage state and other features in functional components. The most fundamental hook is `useState`. It provides a simple way to add a state variable to your component." }] },
            { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "How to Use `useState`" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "When you call `useState`, you pass the initial value of the state as an argument. It returns an array containing two elements:" }] },
            { type: 'bulletList', content: [
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "The current state value." }] }] },
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "A function to update that value (the \"setter\" function)." }] }] }
            ]},
            { type: 'paragraph', content: [{ type: 'text', text: "We typically use array destructuring to get these two values." }] },
            { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import React, { useState } from 'react';\n\nfunction Counter() {\n  // Destructuring the array returned by useState\n  const [count, setCount] = useState(0); // 0 is the initial state\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}` }] },
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Working with Different Data Types" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "State isn't just for numbers. You can store strings, booleans, arrays, or objects. Here's an example of using `useState` to handle a text input:" }] },
            { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import React, { useState } from 'react';\n\nfunction NameForm() {\n  const [name, setName] = useState('');\n\n  const handleChange = (event) => {\n    setName(event.target.value);\n  };\n\n  return (\n    <form>\n      <label>\n        Name:\n        <input type="text" value={name} onChange={handleChange} />\n      </label>\n      <p>Hello, {name || 'stranger'}!</p>\n    </form>\n  );\n}` }] },
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Rules of Hooks" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "It's important to remember that Hooks have rules. The two most important are:" }] },
            { type: 'orderedList', content: [
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Only call Hooks at the top level of your React function." }] }] },
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Only call Hooks from React function components (not regular JavaScript functions)." }] }] }
            ]},
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "The `useState` hook is the cornerstone of state management in modern React. It's a simple yet powerful tool that allows your components to be dynamic and interactive. By understanding how to use it, you've taken a massive step forward in your React journey." }] }
        ]
    }
};

const generateSlug = (title) => {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

async function addReactPost() {
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
    
    let slug = generateSlug(reactPost.title);
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
        slug = `${slug}-${Date.now()}`;
    }

    const newPostData = {
        postID: `post-${Date.now()}`,
        title: reactPost.title,
        content: reactPost.content,
        category: reactPost.category,
        slug,
        author: adminUser._id,
        isPremium: reactPost.isPremium,
        metaTitle: reactPost.seo.metaTitle,
        metaDescription: reactPost.seo.metaDescription,
        keywords: reactPost.seo.keywords,
    };

    await Post.create(newPostData);
    console.log('Successfully created React post:');
    console.log(`Title: ${reactPost.title}`);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

addReactPost();

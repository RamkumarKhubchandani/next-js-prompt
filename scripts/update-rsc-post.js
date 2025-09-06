require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Client vs. Server Components in Next.js 14: A Practical Guide";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Biggest Shift in Modern React" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Next.js 14, built on the latest features of React, introduces a new paradigm: React Server Components (RSCs). This fundamentally changes how we build applications. By default, all components in the Next.js App Router are Server Components. This is a major shift from the 'everything is a client-side component' model of the past." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Server Components: The New Default" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Server Components run exclusively on the server. This has several major advantages:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Direct Data Access:", bold: true }, { type: 'text', text: " They can directly access your database or file system without needing an API layer." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Improved Performance:", bold: true }, { type: 'text', text: " They send no JavaScript to the client, reducing your bundle size and improving initial page load times." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Enhanced Security:", bold: true }, { type: 'text', text: " Sensitive data and logic, like API keys, never leave the server." }] }] }
        ]},
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// app/page.js - This is a Server Component by default\nimport db from './lib/db'; // A server-side database client\n\nasync function HomePage() {\n  const posts = await db.posts.findMany(); // Fetches data directly on the server\n\n  return (\n    <main>\n      <h1>Blog Posts</h1>\n      <ul>\n        {posts.map(post => <li key={post.id}>{post.title}</li>)}\n      </ul>\n    </main>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Client Components: Opting in for Interactivity" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When do you need a Client Component? Whenever your component requires interactivity. This includes using hooks like `useState` and `useEffect`, or handling browser events like `onClick`. To turn a component into a Client Component, you simply add the `'use client'` directive at the very top of the file." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `'use client';\n\nimport React, { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>Click Me</button>\n    </div>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Golden Rule: When to Use Which" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Use Server Components for:", bold: true }, { type: 'text', text: " fetching data, accessing backend resources, and for any component that doesn't need to be interactive." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Use Client Components for:", bold: true }, { type: 'text', text: " anything that uses state, lifecycle effects, or browser-only APIs. Think buttons, forms, and interactive UI." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The shift to Server Components is a powerful evolution in the React ecosystem. By keeping as much of your application on the server as possible and only sending JavaScript to the client when needed for interactivity, you can build faster, more efficient, and more secure web applications. Understanding this distinction is key to mastering modern Next.js development." }] }
    ]
};

async function updatePostContent() {
  if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    const result = await Post.findOneAndUpdate(
        { title: POST_TITLE },
        { $set: { content: updatedContent } },
        { new: true }
    );

    if (result) {
        console.log(`Successfully updated post: ${result.title}`);
    } else {
        console.log(`Could not find a post with the title: "${POST_TITLE}"`);
    }

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

updatePostContent();

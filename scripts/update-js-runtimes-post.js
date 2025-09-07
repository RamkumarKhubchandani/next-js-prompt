require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Bun vs. Node.js vs. Deno: The State of JavaScript Runtimes in 2025";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Long Reign of Node.js" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For over a decade, Node.js has been the undisputed king of server-side JavaScript. Its massive ecosystem (npm) and battle-tested stability have made it the default choice for millions of projects. However, the landscape is changing, with two major contenders—Deno and Bun—challenging its throne with modern approaches to security, tooling, and performance." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Deno: The Secure Successor" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Created by the original author of Node.js, Ryan Dahl, Deno aims to fix many of Node's original design flaws. Its core principles are:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Secure by Default:" }, { type: 'text', text: " Deno scripts run in a sandbox. They cannot access the file system, network, or environment variables without explicit permission flags (`--allow-net`, `--allow-read`)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "First-Class TypeScript:" }, { type: 'text', text: " Deno can execute TypeScript and TSX files out of the box, with no configuration needed." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Modern Web APIs:" }, { type: 'text', text: " It uses standard browser APIs like `fetch` wherever possible, reducing the need for platform-specific knowledge." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Built-in Toolchain:" }, { type: 'text', text: " It ships with a linter, formatter, tester, and bundler, providing a cohesive developer experience." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "Deno's focus is on creating a more secure, modern, and productive development environment." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Bun: The Performance King" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Bun is the newest player, and its primary focus is raw speed. It's an all-in-one toolkit that aims to be a drop-in replacement for Node.js, but significantly faster. Its key features are:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Speed:" }, { type: 'text', text: " Bun is built on Zig and uses the JavaScriptCore engine (from WebKit), which is often faster than Node's V8 engine for startup and many operations." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "All-in-One:" }, { type: 'text', text: " Like Deno, it's a complete toolchain, including a package manager, bundler, and test runner. Its package manager is npm-compatible but dramatically faster." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Node.js Compatibility:" }, { type: 'text', text: " Bun aims for near-perfect Node.js compatibility, making it easier to migrate existing projects than it would be for Deno." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Comparison Summary for 2025" }] },
        { type: 'table', content: [
            { type: 'tableRow', content: [{ type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Feature" }] }] }, { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Node.js" }] }] }, { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Deno" }] }] }, { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Bun" }] }] }] },
            { type: 'tableRow', content: [{ type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Stability" }] }] }, { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Excellent" }] }] }, { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Very Good" }] }] }, { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Good (Rapidly Maturing)" }] }] }] },
            { type: 'tableRow', content: [{ type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Performance" }] }] }, { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Good" }] }] }, { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Very Good" }] }] }, { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Exceptional" }] }] }] },
            { type: 'tableRow', content: [{ type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Security" }] }] }, { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Opt-in" }] }] }, { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Secure by Default" }] }] }, { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Opt-in" }] }] }] },
            { type: 'tableRow', content: [{ type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Tooling" }] }] }, { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Decentralized (npm)" }] }] }, { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Built-in" }] }] }, { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Built-in" }] }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "Node.js remains the safe, stable choice with an unparalleled ecosystem. Deno is the choice for security-first, modern applications with an integrated toolchain. Bun is the choice for performance-critical applications where speed is the top priority." }] },
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
        { $set: { content: content } },
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

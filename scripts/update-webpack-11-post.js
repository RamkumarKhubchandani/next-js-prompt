require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Webpack vs. Vite vs. Turbopack: The State of Bundlers in 2025";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Bundler Landscape in 2025" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For years, Webpack was the undisputed king of JavaScript bundlers. Today, the landscape is much more competitive, with new, next-generation tools like Vite and Turbopack offering incredible speed and a streamlined developer experience. Let's compare the three titans." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Webpack: The Battle-Tested Incumbent" }] },
        { type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Strengths:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Ecosystem & Flexibility:" }, { type: 'text', text: " Webpack's greatest strength is its massive ecosystem of loaders and plugins. It is infinitely configurable and can be tailored to any project's needs, no matter how complex." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Maturity:" }, { type: 'text', text: " It's incredibly stable, battle-tested, and has a solution for almost every edge case imaginable." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Module Federation:" }, { type: 'text', text: " It offers a revolutionary, built-in solution for micro-frontends that the others have yet to match." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Weaknesses:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Performance:" }, { type: 'text', text: " Its JavaScript-based architecture is significantly slower, especially in development, compared to newer tools written in native languages." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Configuration Complexity:" }, { type: 'text', text: " Getting started can be complex, often requiring a deep understanding of its configuration options." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Vite: The Developer Experience Champion" }] },
        { type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Strengths:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Dev Server Speed:" }, { type: 'text', text: " Vite's dev server is lightning-fast. It uses native ES Modules (ESM) in the browser, so it doesn't need to bundle your entire app before starting. It serves files on demand, leading to near-instant server start and Hot Module Replacement (HMR)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Simplicity:" }, { type: 'text', text: " It offers a zero-config experience for most common setups, making it incredibly easy to get started." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Build Performance:" }, { type: 'text', text: " For production builds, it uses Rollup under the hood, which is highly optimized for creating efficient bundles." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Weaknesses:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Plugin Ecosystem:" }, { type: 'text', text: " While growing rapidly, its plugin ecosystem is not as vast or mature as Webpack's." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Turbopack (Alpha): The Rust-Powered Successor" }] },
        { type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Strengths:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Incremental Architecture:" }, { type: 'text', text: " Built in Rust by the creator of Webpack, Turbopack is designed for maximum speed. It never performs the same work twice, caching aggressively at the function level. This results in build and update times that are orders of magnitude faster than Webpack." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Out-of-the-Box Support:" }, { type: 'text', text: " It supports JS, TS, CSS, and more with no configuration." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Weaknesses:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Immaturity:" }, { type: 'text', text: " As of 2025, Turbopack is still in its early stages. It's integrated into the Next.js dev server but is not yet a standalone, general-purpose replacement for Webpack." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Which One to Choose?" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "For new projects, especially with standard frameworks like React or Vue:" }, { type: 'text', text: " Vite is the clear winner. Its developer experience and speed are unmatched." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "For complex, existing projects with specific needs or micro-frontends:" }, { type: 'text', text: " Webpack's maturity and flexibility remain invaluable." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "For the future (and Next.js users):" }, { type: 'text', text: " Keep a close eye on Turbopack. It represents the next leap in build tooling performance." }] }] },
        ]},
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

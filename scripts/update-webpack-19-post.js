require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Blazing Fast Builds with esbuild-loader and swc-loader";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Bottleneck: JavaScript Transpilation" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "One of the slowest parts of any Webpack build is transpiling modern JavaScript and TypeScript into a format that older browsers can understand. Traditionally, this job is handled by `babel-loader`. While Babel is incredibly powerful and versatile, it's also written in JavaScript, which means it can be a significant performance bottleneck, especially in large projects." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Solution: Next-Generation Transpilers" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A new generation of transpilers written in high-performance, compiled languages like Go (esbuild) and Rust (SWC) has emerged. These tools can perform the same transformations as Babel but are often an order of magnitude faster. By swapping `babel-loader` for a loader that uses one of these tools, you can dramatically speed up your Webpack builds." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Option 1: `esbuild-loader`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "esbuild is a JavaScript bundler and minifier written in Go, known for its incredible speed. `esbuild-loader` allows you to use esbuild's transpiler within your Webpack build." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Installation:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm install --save-dev esbuild-loader" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Configuration (`webpack.config.js`):" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Simply replace `babel-loader` in your JavaScript/TypeScript rule." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "module.exports = {\n  // ...\n  module: {\n    rules: [\n      {\n        test: /\\.[jt]sx?$/,\n        loader: 'esbuild-loader',\n        options: {\n          target: 'es2015', // Transpile to ES2015\n          jsx: 'react-jsx', // Or 'react' depending on your React version\n        },\n      },\n    ],\n  },\n};" }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Option 2: `swc-loader`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "SWC (Speedy Web Compiler) is a super-fast TypeScript/JavaScript compiler written in Rust. It's the compiler used by Next.js. `swc-loader` integrates it with Webpack." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Installation:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm install --save-dev swc-loader @swc/core" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Configuration (`webpack.config.js`):" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "module.exports = {\n  // ...\n  module: {\n    rules: [\n      {\n        test: /\\.[jt]sx?$/,\n        loader: 'swc-loader',\n        // Options can be configured here or in a separate .swcrc file\n      },\n    ],\n  },\n};" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Trade-Off: Features vs. Speed" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While esbuild and SWC are much faster, they are not 1:1 replacements for Babel. Babel has a massive ecosystem of plugins for advanced and experimental code transformations that the newer tools may not support. For most standard React/TypeScript projects, `esbuild-loader` or `swc-loader` are excellent choices for a major performance boost. For projects that rely heavily on specific Babel plugins, you may need to stick with `babel-loader`." }] },
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

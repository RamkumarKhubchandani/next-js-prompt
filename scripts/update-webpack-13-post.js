require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Building a Custom Webpack Loader from Scratch";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why Build a Custom Loader?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While Webpack's ecosystem of loaders is vast, you might occasionally encounter a specific need that isn't covered. Maybe you want to transform a custom file type, remove comments, or replace certain strings in your code before it's bundled. Building your own loader gives you the power to create a custom transformation pipeline tailored to your exact needs." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Anatomy of a Loader" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "At its core, a Webpack loader is surprisingly simple: it's a JavaScript function that takes the source code of a file as its first argument and must return the transformed source code (as a string or Buffer). That's it." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: A Simple `replace-loader`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's build a loader that replaces all occurrences of the string `[DUMMY_TEXT]` with `Hello, World!`. " }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Create the Loader File" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "First, create a new folder, `webpack-loaders`, and a file inside it called `replace-loader.js`." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// webpack-loaders/replace-loader.js\n\n// The 'source' argument is the content of the file being processed.\nmodule.exports = function(source) {\n  // Perform a simple string replacement.\n  const result = source.replace(/\\\[DUMMY_TEXT\\\]/g, 'Hello, World!');\n  \n  // Return the transformed source code.\n  return result;\n};" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Use the Loader in `webpack.config.js`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, you need to tell Webpack about your custom loader. First, you need to configure `resolveLoader` so Webpack knows where to find your local loaders. Then, you can add it to your module rules." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const path = require('path');\n\nmodule.exports = {\n  // ...\n  resolveLoader: {\n    modules: ['node_modules', path.resolve(__dirname, 'webpack-loaders')],\n  },\n  module: {\n    rules: [\n      {\n        test: /\\.js$/,\n        exclude: /node_modules/,\n        use: ['babel-loader', 'replace-loader'], // Chaining loaders!\n      },\n    ],\n  },\n};" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 3: Test It" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Create a JavaScript file that uses the placeholder text:" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// src/index.js\n\nconst message = '[DUMMY_TEXT]';\nconsole.log(message);" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When you run your Webpack build and view the output, you will see `Hello, World!` in the console. Your custom loader has successfully transformed the source code before it was bundled." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Advanced Loaders" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is a simple example, but loaders can be much more complex. They can be asynchronous, receive options from the `webpack.config.js`, and access more of Webpack's API via the `this` context. Building custom loaders is a powerful skill for any advanced Webpack user." }] },
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Advanced Configuration with webpack-merge for Dev vs. Prod";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem: One Big Config File" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "As your project grows, your `webpack.config.js` can become a messy, monolithic file full of conditional logic (`if (isProduction) { ... } else { ... }`) to handle the differences between your development and production builds. This is hard to read and maintain. A much cleaner approach is to split your configuration into multiple files and merge them as needed." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Solution: `webpack-merge`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "`webpack-merge` is a small utility that provides a `merge` function for intelligently combining Webpack configuration objects. It can smartly concatenate arrays (like plugins) and merge objects, giving you fine-grained control over the final configuration." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Installation:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm install --save-dev webpack-merge" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Step 1: Create a Common Configuration" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Create a `webpack.common.js` file. This file will contain all the configuration that is shared between your development and production builds, such as your entry point, output path, and loaders for JavaScript, CSS, and assets." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// webpack.common.js\nmodule.exports = {\n  entry: './src/index.js',\n  module: {\n    rules: [\n      { test: /\\.js$/, use: 'babel-loader' },\n      { test: /\\.css$/, use: ['style-loader', 'css-loader'] },\n    ],\n  },\n};" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Step 2: Create Environment-Specific Configurations" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Next, create `webpack.dev.js` and `webpack.prod.js`. These files will import the common config, merge it with their specific settings, and export the result." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// webpack.dev.js\nconst { merge } = require('webpack-merge');\nconst common = require('./webpack.common.js');\n\nmodule.exports = merge(common, {\n  mode: 'development',\n  devtool: 'inline-source-map',\n  devServer: {\n    static: './dist',\n  },\n});" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// webpack.prod.js\nconst { merge } = require('webpack-merge');\nconst common = require('./webpack.common.js');\n\nmodule.exports = merge(common, {\n  mode: 'production',\n  output: {\n    filename: '[name].[contenthash].js',\n    clean: true,\n  },\n  // ... other production plugins like MiniCssExtractPlugin\n});" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Step 3: Update Your `package.json` Scripts" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Finally, update your npm scripts to tell Webpack which configuration file to use for each command." }] },
        { type: 'codeBlock', attrs: { language: 'json' }, content: [{ type: 'text', text: `"scripts": {\n  "start": "webpack serve --config webpack.dev.js",\n  "build": "webpack --config webpack.prod.js"\n}` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "By splitting your Webpack configuration into common, development, and production files, you create a system that is far more organized, readable, and scalable. This pattern is a best practice for any non-trivial Webpack project and is essential for maintaining a clean and professional codebase." }] },
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

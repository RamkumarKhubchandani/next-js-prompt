require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Unlocking Webpack Plugins: HtmlWebpackPlugin, MiniCssExtractPlugin, and More";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Loaders vs. Plugins: What's the Difference?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Loaders operate on individual files as they are being processed. Plugins, on the other hand, are much more powerful. They can hook into the entire Webpack compilation lifecycle, allowing them to perform complex tasks like optimizing the final bundle, managing assets, or injecting environment variables. This guide covers the essential plugins every developer should know." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "1. `HtmlWebpackPlugin`: Automating HTML Creation" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Manually adding a `<script>` tag to your `index.html` is tedious and error-prone, especially when your output filenames change with hashes. `HtmlWebpackPlugin` automates this process. It generates an HTML file, automatically injects your bundled scripts, and places it in your output directory." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Installation:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm install --save-dev html-webpack-plugin" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Configuration (`webpack.config.js`):" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const HtmlWebpackPlugin = require('html-webpack-plugin');\n\nmodule.exports = {\n  // ...\n  plugins: [\n    new HtmlWebpackPlugin({\n      title: 'My Webpack App',\n      template: './src/template.html', // Optional: use a template file\n    }),\n  ],\n};" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "2. `MiniCssExtractPlugin`: Extracting CSS into Files" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "By default, `style-loader` injects CSS into the DOM via `<style>` tags. This is fine for development, but for production, it's better to have separate CSS files that the browser can cache. `MiniCssExtractPlugin` extracts your CSS into `.css` files." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Installation:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm install --save-dev mini-css-extract-plugin" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Configuration (`webpack.config.js`):" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const MiniCssExtractPlugin = require('mini-css-extract-plugin');\n\nmodule.exports = {\n  // ...\n  plugins: [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })],\n  module: {\n    rules: [\n      {\n        test: /\\.css$/,\n        use: [\n          MiniCssExtractPlugin.loader, // Replaces style-loader for production\n          'css-loader',\n        ],\n      },\n    ],\n  },\n};" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "3. `TerserWebpackPlugin`: Minifying JavaScript" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When you set Webpack's `mode` to `'production'`, it automatically enables JavaScript minification using the `TerserWebpackPlugin` under the hood. You don't usually need to install or configure it yourself, but it's important to know it's there, working to shrink your bundle size by removing whitespace, shortening variable names, and eliminating dead code." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "4. `CssMinimizerWebpackPlugin`: Minifying CSS" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Similar to Terser for JS, this plugin optimizes and minifies your CSS files. To use it, you add it to the `optimization` configuration object." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Installation:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm install --save-dev css-minimizer-webpack-plugin" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Configuration (`webpack.config.js`):" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');\n\nmodule.exports = {\n  // ...\n  optimization: {\n    minimizer: [\n      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)\n      `...`,\n      new CssMinimizerPlugin(),\n    ],\n  },\n};" }] },
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

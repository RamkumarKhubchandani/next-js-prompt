require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "The Ultimate Guide to Loaders: Babel, CSS, and Asset Handling";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What Are Loaders?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Webpack's superpower is its ability to build a dependency graph out of not just JavaScript, but any type of file. The magic that makes this possible is loaders. Loaders are small programs that 'transform' files from one format into another that Webpack can understand—a JavaScript module. This guide covers the most essential loaders you'll use in modern web development." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "1. Transpiling Modern JavaScript with `babel-loader`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "`babel-loader` uses Babel to transpile modern JavaScript (ES2015+) into backwards-compatible ES5 that can run in older browsers. It's the most common and important loader." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Installation:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm install --save-dev babel-loader @babel/core @babel/preset-env" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Configuration (`webpack.config.js`):" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "module.exports = {\n  // ...\n  module: {\n    rules: [\n      {\n        test: /\\.js$/,\n        exclude: /node_modules/,\n        use: {\n          loader: 'babel-loader',\n          options: {\n            presets: ['@babel/preset-env'],\n          },\n        },\n      },\n    ],\n  },\n};" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "2. Handling CSS with `style-loader` and `css-loader`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To bundle CSS, you typically need two loaders that work together. Remember: loaders are executed from right to left." }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "`css-loader`:" }, { type: 'text', text: " Reads the CSS file and resolves `@import` and `url()` paths." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "`style-loader`:" }, { type: 'text', text: " Takes the CSS processed by `css-loader` and injects it into the DOM via a `<style>` tag." }] }] },
        ]},
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Installation:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm install --save-dev style-loader css-loader" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Configuration (`webpack.config.js`):" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "{\n  test: /\\.css$/,\n  use: ['style-loader', 'css-loader'], // style-loader is second, but executed first\n}" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "3. Using Pre-processors like Sass with `sass-loader`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To use a pre-processor like Sass, you simply add another loader to the chain." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Installation:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm install --save-dev sass-loader sass" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Configuration (`webpack.config.js`):" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "{\n  test: /\\.scss$/,\n  use: [\n    'style-loader', // 3. Inject styles into DOM\n    'css-loader',   // 2. Turns css into commonjs\n    'sass-loader',  // 1. Turns sass into css\n  ],\n}" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "4. Modern Asset Handling with Asset Modules" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In Webpack 5, you no longer need `file-loader` or `url-loader` for images, fonts, etc. Webpack's built-in Asset Modules handle this automatically." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "{\n  test: /\\.(png|svg|jpg|jpeg|gif)$/i,\n  type: 'asset/resource',\n}" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This rule tells Webpack that whenever it finds an import for one of these image types, it should treat it as a static asset, copy it to the output directory, and return the public URL." }] },
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

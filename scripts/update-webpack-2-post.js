require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Mastering webpack.config.js: A Comprehensive Deep Dive";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Beyond the Basics" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You've created a basic `webpack.config.js`, but its true power lies in its rich configuration options. This guide will take you on a deep dive into the most important properties, transforming you from a beginner to a Webpack configuration expert." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "1. Advanced `entry` Configurations" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `entry` property can be more than just a single string. For more complex applications, you can use an object to define multiple entry points. This is a common way to split code for a multi-page application." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "module.exports = {\n  // ...\n  entry: {\n    main: './src/index.js',\n    admin: './src/admin.js',\n  },\n  // ...\n};" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "2. Dynamic `output` Filenames" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When you have multiple entry points, you can't have a static output filename. Webpack provides placeholders to generate dynamic names." }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'code'}], text: "[name]" }, { type: 'text', text: ": Replaced by the name of the chunk (e.g., 'main' or 'admin' from the entry object)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'code'}], text: "[contenthash]" }, { type: 'text', text: ": A unique hash generated based on the content of the file. This is crucial for long-term caching." }] }] },
        ]},
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "module.exports = {\n  // ...\n  output: {\n    filename: '[name].[contenthash].js',\n    path: path.resolve(__dirname, 'dist'),\n    clean: true, // Cleans the dist folder before each build\n  },\n  // ...\n};" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "3. Configuring `module.rules` for Loaders" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is where you define how Webpack should handle different file types. Each rule is an object that typically has two properties:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'code'}], text: "test" }, { type: 'text', text: ": A regular expression that identifies which files the rule should apply to." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'code'}], text: "use" }, { type: 'text', text: ": The loader(s) to use for those files. Loaders are evaluated from right to left (or bottom to top)." }] }] },
        ]},
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "module.exports = {\n  // ...\n  module: {\n    rules: [\n      // Rule for JavaScript files\n      {\n        test: /\\.js$/,\n        exclude: /node_modules/,\n        use: 'babel-loader',\n      },\n      // Rule for CSS files\n      {\n        test: /\\.css$/,\n        use: ['style-loader', 'css-loader'], // style-loader comes after css-loader\n      },\n    ],\n  },\n  // ...\n};" }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "4. Powerful `resolve.alias`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Tired of writing long, fragile relative paths like `import MyComponent from '../../../components/MyComponent'`? An `alias` lets you create shortcuts." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "module.exports = {\n  // ...\n  resolve: {\n    alias: {\n      '@components': path.resolve(__dirname, 'src/components/'),\n      '@utils': path.resolve(__dirname, 'src/utils/'),\n    },\n    extensions: ['.js', '.jsx', '.json'], // Automatically resolve these extensions\n  },\n  // ...\n};\n\n// Now you can import like this from anywhere:\n// import MyComponent from '@components/MyComponent';" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Mastering these core configuration options is the key to unlocking Webpack's full potential. With them, you can create a build process that is efficient, optimized, and perfectly tailored to your project's specific needs." }] },
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

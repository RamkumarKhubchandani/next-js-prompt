require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Webpack 101: From Zero to Hero in a Single Guide";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is Webpack and Why Do I Need It?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "At its core, Webpack is a static module bundler for modern JavaScript applications. But what does that mean? Imagine you have a project with dozens of JavaScript files, CSS files, images, and fonts. The browser can't just 'run' all of those. Webpack takes all these files (your 'modules'), figures out their dependencies, and intelligently bundles them into a few static files that the browser can understand and load efficiently." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Core Concepts of Webpack" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To understand Webpack, you need to know five core concepts:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "1. Entry:" }, { type: 'text', text: " The starting point of your application. Webpack starts from this file and builds a 'dependency graph' of all the modules your application needs." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "2. Output:" }, { type: 'text', text: " Where to save the final bundled file(s). Typically, this is a `dist` or `build` folder." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "3. Loaders:" }, { type: 'text', text: " Out of the box, Webpack only understands JavaScript and JSON. Loaders allow Webpack to process other types of files (like CSS, images, or TypeScript) and convert them into valid modules that can be added to the dependency graph." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "4. Plugins:" }, { type: 'text', text: " Loaders work on a per-file basis, but plugins are more powerful. They can hook into the entire build process to perform a wide range of tasks, like bundle optimization, asset management, and environment variable injection." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "5. Mode:" }, { type: 'text', text: " Can be set to `'development'`, `'production'`, or `'none'`. Setting the mode automatically enables various built-in optimizations appropriate for that environment." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Your First Webpack Project" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Setup" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "mkdir webpack-101\ncd webpack-101\nnpm init -y\nnpm install webpack webpack-cli --save-dev" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Project Structure" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Create a `src` folder with an `index.js` file and a `dist` folder with an `index.html` file." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// src/index.js\nconsole.log('Hello, Webpack!');" }] },
        { type: 'codeBlock', attrs: { language: 'html' }, content: [{ type: 'text', text: `<!-- dist/index.html -->\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Webpack 101</title>\n  </head>\n  <body>\n    <script src="main.js"></script>\n  </body>\n</html>` }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 3: Create `webpack.config.js`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is the heart of your Webpack setup." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const path = require('path');\n\nmodule.exports = {\n  mode: 'development',\n  entry: './src/index.js',\n  output: {\n    filename: 'main.js',\n    path: path.resolve(__dirname, 'dist'),\n  },\n};" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 4: Run the Build" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Add a build script to your `package.json`:" }] },
        { type: 'codeBlock', attrs: { language: 'json' }, content: [{ type: 'text', text: `"scripts": {\n  "build": "webpack"\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now run `npm run build`. Webpack will create `dist/main.js`. If you open `dist/index.html` in your browser, you'll see 'Hello, Webpack!' in the console. You've successfully bundled your first project! This is the foundation upon which all other Webpack configurations are built." }] },
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Understanding Webpack's Resolver and Module Resolution";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Magic Behind `import`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When you write `import MyComponent from './components/MyComponent'`, how does Webpack actually find that file? This process is called module resolution, and the part of Webpack responsible for it is called the resolver. Understanding how the resolver works is key to debugging tricky import errors and advanced configuration." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How Webpack Resolves Modules" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When Webpack encounters an `import` statement, it tries to find the corresponding file by following a set of rules. For a path like `import 'react'`, it will first look for a core Node.js module (which it won't find). Then, it will search for `'react'` inside all the directories listed in `resolve.modules`, which defaults to `['node_modules']`. For a relative path like `import './utils'`, it resolves it relative to the current file's location." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Configuring the Resolver" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You can customize the resolver's behavior using the `resolve` object in your `webpack.config.js`. Let's look at the most important properties." }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "1. `resolve.extensions`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This property tells Webpack which file extensions to try if an import doesn't have one. For example, `import App from './App'` will make Webpack look for `./App.js`, `./App.jsx`, and `./App.json` in that order." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "module.exports = {\n  // ...\n  resolve: {\n    extensions: ['.js', '.jsx', '.json'],\n  },\n};" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "2. `resolve.alias`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "An alias allows you to create a shortcut for a common path, preventing long and fragile relative imports. It's one of the most useful resolver configurations." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const path = require('path');\n\nmodule.exports = {\n  // ...\n  resolve: {\n    alias: {\n      '@components': path.resolve(__dirname, 'src/components/'),\n      '@utils': path.resolve(__dirname, 'src/utils/'),\n    },\n  },\n};\n\n// Now you can write:\n// import MyComponent from '@components/MyComponent';" }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "3. `resolve.modules`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This tells Webpack where to look for modules. By default, it's `['node_modules']`. You could add other directories, like `src`, which would allow you to write absolute imports from your source root (e.g., `import MyComponent from 'components/MyComponent'`). However, this is less explicit than using an alias and can sometimes lead to confusion." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "module.exports = {\n  // ...\n  resolve: {\n    modules: ['node_modules', path.resolve(__dirname, 'src')],\n  },\n};" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While Webpack's default resolver configuration works well for most projects, understanding how to customize it is a powerful skill. Using `resolve.extensions` and especially `resolve.alias` can dramatically improve the developer experience by simplifying imports and making your codebase cleaner and more maintainable." }] },
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

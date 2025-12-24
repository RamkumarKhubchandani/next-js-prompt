require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Code Splitting for Maximum Performance: The Definitive Guide";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem of Monolithic Bundles" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "By default, Webpack bundles all your application's code into a single, large file (e.g., `main.js`). This is inefficient because the user has to download all the code for your entire site, even the parts they might never visit. Code splitting is the technique of breaking this monolithic bundle into smaller, on-demand chunks, dramatically improving initial load times." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Method 1: Multiple Entry Points" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The simplest way to split code is to define multiple entry points in your `webpack.config.js`. This is best suited for traditional multi-page applications where, for example, the admin section has completely different code from the main site." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "module.exports = {\n  entry: {\n    main: './src/index.js',\n    admin: './src/admin/index.js',\n  },\n  output: {\n    filename: '[name].bundle.js',\n  },\n};" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Webpack will produce two separate bundles: `main.bundle.js` and `admin.bundle.js`. The drawback is that if both entry points share common dependencies (like React or Lodash), that code will be duplicated in both bundles." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Method 2: `SplitChunksPlugin` for Vendor Code" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To solve the duplication problem, Webpack provides the `SplitChunksPlugin`. By configuring it, you can tell Webpack to automatically find shared modules (especially large 'vendor' libraries from `node_modules`) and extract them into a separate `vendors` chunk. This is a massive performance win because vendor code changes infrequently, so the browser can cache it for long periods." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "module.exports = {\n  // ...\n  optimization: {\n    splitChunks: {\n      chunks: 'all',\n    },\n  },\n};" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "With this simple configuration, Webpack will intelligently create a `vendors` file containing your dependencies, preventing code duplication across your entry points." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Method 3: Dynamic `import()` for On-Demand Loading" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is the most powerful and common form of code splitting for Single-Page Applications (SPAs). It uses a dynamic `import()` syntax that conforms to the ECMAScript standard. When Webpack sees this syntax, it automatically creates a separate, lazy-loaded chunk for that module." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// Before: A static import loads the code immediately\nimport MyHeavyComponent from './MyHeavyComponent';\n\n// After: A dynamic import creates a separate chunk\n// that is only fetched when the code is executed.\n\nconst getComponent = () => import('./MyHeavyComponent');\n\n// You can then use it, for example, on a button click:\nbutton.addEventListener('click', () => {\n  getComponent().then(module => {\n    const MyHeavyComponent = module.default;\n    // ...use the component\n  });\n});" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Frameworks like React (with `React.lazy`) and Vue (with async components) provide elegant wrappers around this functionality, making it easy to code-split at the component or route level. This is the key to building large, performant SPAs." }] },
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

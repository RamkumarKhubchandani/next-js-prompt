require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Tree Shaking Explained: How to Eliminate Dead Code in 2025";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is Dead Code?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Dead code is code that is included in your source files but is never actually used. For example, you might import a large library like Lodash but only use one or two functions from it. Without a way to detect this, the entire library gets added to your final bundle, making it unnecessarily large. Tree shaking is Webpack's term for dead code elimination." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How Tree Shaking Works: ES Modules are Key" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Tree shaking is only possible because of the static structure of ES Modules (`import` and `export`). Unlike CommonJS (`require`), you can't dynamically import a module based on a variable. Because the dependency graph is static, Webpack can analyze it at build time, determine exactly which exports are being used, and 'shake off' the unused ones." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How to Enable Tree Shaking in Webpack" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Enabling tree shaking in Webpack requires a few key steps:" }] },
        { type: 'orderedList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "1. Use ES Modules:" }, { type: 'text', text: " Ensure your entire project uses `import` and `export` syntax." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "2. Set `mode: 'production'`:" }, { type: 'text', text: " In production mode, Webpack automatically enables optimizations, including `usedExports: true` and minification (which is the step that actually removes the dead code)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "3. Mark Side Effects in `package.json`:" }, { type: 'text', text: " This is a crucial step. You need to tell Webpack which of your files are 'pure' and have no side effects (like modifying the global `window` object or including CSS). This allows Webpack to safely remove them if none of their exports are used." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Example: Marking Side Effects" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In your `package.json`, add a `sideEffects` property. If all your code is pure, you can set it to `false`. More commonly, you'll provide an array of files that DO have side effects (like CSS files)." }] },
        { type: 'codeBlock', attrs: { language: 'json' }, content: [{ type: 'text', text: `{\n  "name": "my-project",\n  "sideEffects": [\n    "**/*.css",\n    "**/*.scss"\n  ]\n}` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Practical Example" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// src/math.js\nexport function square(x) {\n  return x * x;\n}\n\nexport function cube(x) {\n  return x * x * x;\n}\n\n// src/index.js\nimport { square } from './math.js';\n\nconsole.log(square(5));" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In this example, the `cube` function is never imported or used. When you build this in production mode with the correct `sideEffects` configuration, Webpack will see that `cube` is unused and the minifier (Terser) will completely remove it from the final bundle, resulting in smaller, faster code." }] },
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

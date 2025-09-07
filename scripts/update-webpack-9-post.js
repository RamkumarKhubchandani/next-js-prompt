require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Webpack 5 Asset Modules: The Modern Way to Handle Images and Fonts";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Old Way: `file-loader` and `url-loader`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Before Webpack 5, handling assets like images and fonts required installing and configuring separate loaders, most commonly `file-loader` and `url-loader`. This added extra dependencies and configuration boilerplate to projects. Webpack 5 introduced a native, zero-dependency solution called Asset Modules, making these older loaders obsolete." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Introducing Asset Modules" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Asset Modules provide a built-in way to handle asset files. You configure them by setting the `type` property in a module rule. There are four types of asset modules:" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "1. `asset/resource`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This type is the direct replacement for `file-loader`. It emits a separate file into the output directory and exports the URL to that file." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// webpack.config.js\n{\n  test: /\\.(png|jpg|gif|svg)$/i,\n  type: 'asset/resource',\n}\n\n// src/index.js\nimport logo from './assets/logo.png';\n\nconst img = new Image();\nimg.src = logo; // `logo` is the URL to the emitted file, e.g., /dist/123abc.png\ndocument.body.appendChild(img);" }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "2. `asset/inline`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is the replacement for `url-loader`. It exports a Base64 data URI of the asset. This is useful for very small files, as it avoids an extra HTTP request." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// webpack.config.js\n{\n  test: /\\.svg$/i,\n  type: 'asset/inline',\n}\n\n// src/index.js\nimport smallIcon from './assets/icon.svg';\n\n// `smallIcon` is a string like 'data:image/svg+xml;base64,...'\nconsole.log(smallIcon);" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "3. `asset/source`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This type, which has no direct predecessor, exports the raw source code of the asset as a string. This can be useful for importing the content of a `.txt` or `.html` file directly into your JavaScript." }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "4. `asset` (The Automatic Choice)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is the most powerful and common type. It automatically decides whether to use `asset/resource` or `asset/inline` based on the file size. By default, files smaller than 8kb will be inlined. This is the perfect middle ground and the behavior that `url-loader`'s `limit` option provided." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// webpack.config.js\n{\n  test: /\\.(png|jpg|gif)$/i,\n  type: 'asset',\n  parser: {\n    dataUrlCondition: {\n      maxSize: 4 * 1024, // Change the limit to 4kb\n    }\n  }\n}" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Webpack 5's Asset Modules are a significant improvement, streamlining a previously complex part of the configuration. By using the flexible `asset` type, you can implement a powerful optimization strategy for your images and other resources with minimal, clean, and dependency-free code." }] },
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

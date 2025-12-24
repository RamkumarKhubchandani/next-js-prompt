require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Mastering Caching: Long-Term Caching for Instant Page Loads";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why is Caching So Important?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Caching is one of the most effective performance optimizations. When a user visits your site for the first time, they download all the necessary assets. When they return, you want the browser to use the cached versions of those assets instead of re-downloading them. This makes subsequent page loads feel instant. The challenge is telling the browser when it *should* re-download a file because it has changed. This is called 'cache busting'." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Key: Filenames Based on Content" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The strategy for perfect caching is simple: as long as a file's content hasn't changed, its filename should stay the same. The moment the content changes, the filename must also change. This forces the browser to download the new version. Webpack makes this easy with 'content hashing'." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Step 1: Use `[contenthash]` in Output Filenames" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In your production Webpack config, add the `[contenthash]` placeholder to your output filenames for both JavaScript and CSS. Webpack will generate a unique hash based on the content of each file." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// webpack.prod.js\n\nconst MiniCssExtractPlugin = require('mini-css-extract-plugin');\n\nmodule.exports = {\n  // ...\n  output: {\n    filename: 'js/[name].[contenthash].js',\n    path: path.resolve(__dirname, 'dist'),\n  },\n  plugins: [\n    new MiniCssExtractPlugin({\n      filename: 'css/[name].[contenthash].css',\n    }),\n  ],\n};" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: "text", text: "Step 2: Splitting Vendor and Runtime Code" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "There's a problem with the setup above. If you change your application code (e.g., `index.js`), the content hash for your main bundle will change. But often, the hash for your vendor bundle (containing libraries like React) will *also* change, even though React's code hasn't been modified. This is because Webpack includes 'runtime' code in the last generated chunk, which contains references to all your modules." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To fix this, you need to extract this small runtime code into its own file. This ensures your vendor hash only changes when you actually update a vendor library." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// webpack.prod.js\n\nmodule.exports = {\n  // ...\n  optimization: {\n    splitChunks: {\n      chunks: 'all',\n    },\n    // Extract the runtime into a single, separate chunk\n    runtimeChunk: 'single',\n  },\n};" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Step 3: Ensure Consistent Module IDs" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "By default, Webpack uses incrementing numbers as module IDs. This means that adding a new module can change the IDs of all subsequent modules, potentially changing the content of the vendor bundle unnecessarily. To prevent this, you can tell Webpack to use deterministic module IDs based on their path." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// webpack.prod.js\n\nmodule.exports = {\n  // ...\n  optimization: {\n    // ...\n    moduleIds: 'deterministic',\n  },\n};" }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "By combining `[contenthash]`, splitting the runtime chunk, and using deterministic module IDs, you can achieve a near-perfect caching strategy. Your users will only ever download new code when it actually changes, leading to the fastest possible experience on repeat visits." }] },
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

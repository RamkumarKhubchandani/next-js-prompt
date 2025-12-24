require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Optimizing for Production: The Ultimate Webpack Build Checklist";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "From Development to Production" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A development Webpack build prioritizes fast rebuilds and debugging. A production build prioritizes performance: small bundle sizes, efficient loading, and browser caching. This checklist covers the essential steps to create a highly optimized production build." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Production Checklist" }] },
        { type: 'orderedList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "1. Set `mode: 'production'`:" }, { type: 'text', text: " This is the most important step. It automatically enables a host of optimizations, including minification, tree shaking (`usedExports`), and setting `process.env.NODE_ENV` to 'production'." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "2. Use `webpack-merge`:" }, { type: 'text', text: " Keep your development and production configurations in separate files (`webpack.dev.js`, `webpack.prod.js`) and share common settings in a `webpack.common.js`. This keeps your configs clean and maintainable." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "3. Minify Everything:" }, { type: 'text', text: " Production mode handles JavaScript minification with Terser automatically. Ensure you also minify your CSS using `CssMinimizerWebpackPlugin`." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "4. Extract CSS:" }, { type: 'text', text: " Use `MiniCssExtractPlugin` to extract CSS into separate files. This allows the browser to load your CSS and JavaScript in parallel and enables better caching." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "5. Implement Code Splitting:" }, { type: 'text', text: " Use `optimization.splitChunks` to extract vendor code into a separate chunk. Use dynamic `import()` for route-based and component-based lazy loading." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "6. Configure Long-Term Caching:" }, { type: 'text', text: " Use the `[contenthash]` placeholder in your output filenames (`[name].[contenthash].js`). This ensures that the filename only changes when the content of the file changes, allowing browsers to cache your assets aggressively." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "7. Clean the Output Directory:" }, { type: 'text', text: " Use `output.clean: true` in your config to ensure that old, unused files from previous builds are removed from your output directory." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "8. Analyze Your Bundle:" }, { type: 'text', text: " Use `webpack-bundle-analyzer` to generate a visual map of your bundle. This helps you identify large or unnecessary dependencies that you can optimize or remove." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example Production Config Snippet" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const MiniCssExtractPlugin = require('mini-css-extract-plugin');\nconst CssMinimizerPlugin = require('css-minimizer-webpack-plugin');\n\nmodule.exports = {\n  mode: 'production',\n  output: {\n    filename: '[name].[contenthash].js',\n    path: path.resolve(__dirname, 'dist'),\n    clean: true,\n  },\n  plugins: [\n    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })\n  ],\n  optimization: {\n    minimizer: [\n      `...`, // Use default Terser config\n      new CssMinimizerPlugin(),\n    ],\n    splitChunks: {\n      chunks: 'all',\n    },\n  },\n  module: {\n    rules: [\n      {\n        test: /\\.css$/,\n        use: [MiniCssExtractPlugin.loader, 'css-loader'],\n      },\n    ],\n  },\n};" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "By following this checklist, you can be confident that your Webpack build is lean, efficient, and ready to provide the best possible performance for your users." }] },
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

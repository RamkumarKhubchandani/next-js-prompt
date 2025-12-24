require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Optimizing a React Application with Webpack";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Beyond Create React App" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While Create React App provides a fantastic zero-config setup, ejecting or building your own Webpack configuration gives you ultimate control over your build process. This guide covers the key Webpack optimizations specifically for a production React application, combining many of the concepts from previous tutorials." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Essential Production Config for React" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Here is a complete, well-commented `webpack.prod.js` that showcases a best-practice configuration for a React project." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'static/js/[name].[contenthash].js', // Output JS with content hash
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean the dist folder before each build
  },
  module: {
    rules: [
      {
        test: /\\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Or swc-loader for speed
      },
      {
        test: /\\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Extract CSS
      },
      {
        test: /\\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // Handle images
        generator: {
          filename: 'static/media/[name].[hash][ext]'
        }
      },
    ],
  },
  plugins: [
    // Generates index.html and injects the bundles
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
    }),
  ],
  optimization: {
    minimizer: [
      \`...\`, // Use default Terser for JS minification
      new CssMinimizerPlugin(), // Minify CSS
    ],
    // Key for long-term caching
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Key Optimizations Explained" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Fast Refresh (Development):" }, { type: 'text', text: " While not in the production config, for development, you should use `@pmmmwh/react-refresh-webpack-plugin` to enable React Fast Refresh, which is a more advanced form of HMR that preserves component state." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Code Splitting with `React.lazy`:" }, { type: 'text', text: " The config above sets up the foundation for code splitting. In your application, use `React.lazy` and `Suspense` to split your application by routes. This is the single most important performance optimization for a large React app." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Long-Term Caching:" }, { type: 'text', text: " The combination of `[contenthash]`, `splitChunks`, `runtimeChunk`, and `moduleIds: 'deterministic'` ensures your vendor code (React, etc.) is cached by the browser until you actually update it." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Bundle Analysis:" }, { type: 'text', text: " Remember to use `webpack-bundle-analyzer` to periodically check your bundle for large or unwanted dependencies. For React, look out for large libraries like Moment.js, and consider lighter alternatives like `date-fns`." }] }] },
        ]},
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

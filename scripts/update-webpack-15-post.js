require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Webpack Bundle Analysis: Visualizing and Shrinking Your App";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "You Can't Optimize What You Can't See" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You've minified your code, split your chunks, and set up caching. But is your bundle as small as it could be? Often, large or unnecessary dependencies can creep into your project, bloating your bundle size without you realizing it. A bundle analyzer is an essential tool that creates an interactive treemap visualization of your Webpack output, allowing you to see exactly what's inside your bundles." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Using `webpack-bundle-analyzer`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The most popular tool for this job is `webpack-bundle-analyzer`." }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Installation" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm install --save-dev webpack-bundle-analyzer" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Configuration" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Add the plugin to your `webpack.prod.js` file. It's best to only run this during your production build." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;\n\nmodule.exports = {\n  // ...\n  plugins: [\n    // other plugins...\n    new BundleAnalyzerPlugin(),\n  ],\n};" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "By default, this will open a new tab in your browser with the interactive analysis every time you run a production build." }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Alternative: Generate a Static Report" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To prevent the server from starting every time, you can configure the plugin to generate a static HTML report instead. This is great for CI/CD environments." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "new BundleAnalyzerPlugin({\n  analyzerMode: 'static', // Generates a static HTML file\n  openAnalyzer: false, // Prevents opening the report in the browser automatically\n  reportFilename: 'bundle-report.html', // Name of the report file\n})" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How to Read the Report" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The bundle analyzer report shows each of your output chunks. Inside each chunk, you can see all the modules that it contains, represented as boxes. The size of the box corresponds to the size of the module. This makes it incredibly easy to spot problems:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Large Dependencies:" }, { type: 'text', text: " Is a single library like Moment.js or Lodash taking up a huge amount of space? Consider finding a smaller alternative (like `date-fns`) or importing only the specific functions you need." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Code Duplication:" }, { type: 'text', text: " Are you seeing the same module appear in multiple chunks? This might indicate a problem with your `splitChunks` configuration." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Unnecessary Code:" }, { type: 'text', text: " Are there modules included that you don't recognize or no longer need? It might be time to refactor or remove old dependencies." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "Regularly analyzing your bundle is a critical part of maintaining a high-performance web application. It provides the insights you need to make informed decisions about your dependencies and keep your application lean and fast." }] },
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

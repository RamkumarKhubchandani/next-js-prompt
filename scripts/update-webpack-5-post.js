require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Webpack Dev Server and Hot Module Replacement (HMR) Explained";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Slow Development Cycle" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In a basic setup, you have to manually run `npm run build` after every single code change to see the results in the browser. This is slow and tedious. `webpack-dev-server` is a tool that dramatically improves the development experience by providing live reloading and, more importantly, Hot Module Replacement (HMR)." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Setting Up `webpack-dev-server`" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Installation:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm install --save-dev webpack-dev-server" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Configuration (`webpack.config.js`):" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The dev server is configured under the `devServer` property. A basic setup looks like this:" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "module.exports = {\n  // ...\n  devServer: {\n    static: './dist', // Where to serve content from\n    hot: true, // Enable HMR\n    open: true, // Open the browser after server started\n  },\n};" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Update `package.json`:" }] },
        { type: 'codeBlock', attrs: { language: 'json' }, content: [{ type: 'text', text: `"scripts": {\n  "build": "webpack",\n  "start": "webpack serve"\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, when you run `npm start`, Webpack will start a server, open your browser, and automatically re-bundle and reload the page when you save a file." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Magic of Hot Module Replacement (HMR)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Live reloading is good, but HMR is revolutionary. Instead of reloading the entire page on a change, HMR intelligently swaps out, adds, or removes only the modules that have changed, without losing the current application state. This is a game-changer for productivity." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For example, if you are working on a React component and change some CSS, HMR will inject the new styles without unmounting the component or losing its internal state (like the value in an input field). For many frameworks like React (with Fast Refresh) and Vue, HMR is configured to work automatically." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How HMR Works Under the Hood" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "1. The `webpack-dev-server` sets up a WebSocket connection between the server and the browser." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "2. When you save a file, Webpack recompiles only the changed module(s)." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "3. The server sends a message to the browser via the WebSocket, telling it which modules have been updated." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "4. The HMR runtime in the browser receives this message and makes a request for the new code." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "5. The runtime then intelligently 'hot swaps' the old code with the new code without a full page refresh." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Mastering `webpack-dev-server` and HMR is non-negotiable for modern web development. It creates a fast, seamless feedback loop that allows you to iterate on your code more quickly and efficiently than ever before." }] },
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

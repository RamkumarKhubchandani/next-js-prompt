require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Server-Side Rendering (SSR) with Webpack and Express";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why SSR?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In a standard Single-Page Application (SPA), the browser receives a nearly empty HTML file and a large JavaScript bundle. The browser must then execute the JavaScript to render the page content. This can be slow, leading to a poor user experience and bad SEO. Server-Side Rendering (SSR) solves this by rendering the initial HTML of the page on the server and sending it to the browser, which can display it immediately. The JavaScript 'hydrates' this HTML, making it interactive." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Dual Build Challenge" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To implement SSR, you need two separate Webpack builds:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Client Build:" }, { type: 'text', text: " This is the standard build that produces a bundle to be run in the browser." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Server Build:" }, { type: 'text', text: " This build produces a bundle designed to be run in a Node.js environment on the server. It cannot handle browser-specific APIs (like `document`) or CSS files in the same way." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: SSR with React and Express" }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Webpack Config for the Server" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The server config has a few key differences from the client config:" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// webpack.server.js\nconst path = require('path');\n\nmodule.exports = {\n  target: 'node', // Crucial: tells Webpack to build for Node.js\n  entry: './server/index.js', // Entry point for the server\n  output: {\n    filename: 'server.js',\n    path: path.resolve(__dirname, 'build'),\n  },\n  // ... loaders for JS/TS\n  // For CSS, you can use a loader that ignores them on the server, like 'ignore-loader'\n};" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: The Express Server" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Your Express server will import your React app's root component and use React's `renderToString` method to generate the initial HTML." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// server/index.js\nimport express from 'express';\nimport React from 'react';\nimport ReactDOMServer from 'react-dom/server';\nimport App from '../src/App'; // Your main React component\n\nconst app = express();\n\napp.get('/', (req, res) => {\n  // 1. Render the React app to an HTML string\n  const appString = ReactDOMServer.renderToString(<App />);\n\n  // 2. Inject the rendered HTML and the client-side script into a template\n  const html = `\n    <!DOCTYPE html>\n    <html>\n      <head><title>My SSR App</title></head>\n      <body>\n        <div id=\"root\">${appString}</div>\n        <script src=\"/client.js\"></script> {/* The client bundle */}\n      </body>\n    </html>\n  `;\n\n  res.send(html);\n});\n\napp.listen(3000);" }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 3: The Client-Side Entry Point" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The client-side JavaScript needs to 'hydrate' the server-rendered HTML. Instead of `ReactDOM.render`, you use `ReactDOM.hydrate`." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// src/client.js\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\n\n// Re-attach the React event listeners to the existing HTML\nReactDOM.hydrate(<App />, document.getElementById('root'));" }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Setting up SSR from scratch with Webpack is a complex process involving multiple build targets, server-side logic, and client-side hydration. While it offers significant performance and SEO benefits, it's often easier to use a framework like Next.js or Remix, which provide a robust, production-ready SSR implementation out of the box. However, understanding the underlying mechanics is a valuable skill for any senior web developer." }] },
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

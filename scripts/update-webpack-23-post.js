require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Building a Progressive Web App (PWA) with Webpack's Workbox Plugin";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is a PWA?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A Progressive Web App (PWA) is a web application that uses modern web capabilities to deliver an app-like experience to users. A key feature of PWAs is the ability to work offline, which is made possible by a browser technology called a Service Worker. A service worker is a script that your browser runs in the background, separate from a web page, that can intercept network requests and manage a cache of assets." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Challenge: Writing a Service Worker" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Writing a service worker from scratch can be complex and error-prone. You need to manage caching strategies, handle updates, and deal with many low-level details. Workbox is a set of libraries from Google that abstracts away this complexity, making it much easier to build a robust service worker." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Using `workbox-webpack-plugin`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `workbox-webpack-plugin` integrates Workbox directly into your Webpack build process, automatically generating a service worker file for you and pre-caching all the assets that Webpack produces." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Installation:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm install --save-dev workbox-webpack-plugin" }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Configuration (`webpack.prod.js`):" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You should only generate a service worker for your production build." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const { GenerateSW } = require('workbox-webpack-plugin');\n\nmodule.exports = {\n  // ...\n  plugins: [\n    // other plugins...\n    new GenerateSW({\n      // These options help the service worker work faster and more reliably.\n      clientsClaim: true,\n      skipWaiting: true,\n    }),\n  ],\n};" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Step 2: Register the Service Worker" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The final step is to add a small piece of code to your client-side application to 'register' the service worker that Workbox generated." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// src/index.js\n\nif ('serviceWorker' in navigator) {\n  window.addEventListener('load', () => {\n    navigator.serviceWorker.register('/service-worker.js')\n      .then(registration => {\n        console.log('SW registered: ', registration);\n      })\n      .catch(registrationError => {\n        console.log('SW registration failed: ', registrationError);\n      });\n  });\n}" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How It Works" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When you run your production build, `workbox-webpack-plugin` will:" }] },
        { type: 'orderedList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Look at all the assets being emitted by Webpack (your JS, CSS, images, etc.)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Generate a `service-worker.js` file in your output directory." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Write code inside that service worker to pre-cache all of your application's assets." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "Now, when a user visits your site, the service worker will be installed. On subsequent visits, the service worker will intercept network requests and serve the cached assets directly, allowing your application to load instantly, even if the user is offline." }] },
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Lazy Loading Components and Routes for Lightning-Fast Apps";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is Lazy Loading?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Lazy loading is a performance optimization technique where you delay the loading of a resource until it's actually needed. In the context of a web app, this means not downloading the JavaScript for a component or a page until the user is about to see it. This is the most effective way to reduce your application's initial bundle size and improve its Time To Interactive (TTI)." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Tool: Dynamic `import()`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The core technology that enables lazy loading in Webpack is the dynamic `import()` syntax. Unlike a static `import`, which bundles the code at build time, a dynamic `import()` is treated as a 'split point' by Webpack. It creates a separate, smaller bundle (a 'chunk') for the imported module, which is then loaded over the network on demand. The `import()` function returns a Promise that resolves with the module." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example 1: Lazy Loading a Component on Interaction" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Imagine you have a button that opens a complex modal with a heavy library like a date picker. There's no need to load that code until the user clicks the button." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const openModalBtn = document.getElementById('open-modal-btn');\n\nopenModalBtn.addEventListener('click', () => {\n  // Webpack fetches 'heavy-modal.js' only when the button is clicked\n  import('./components/HeavyModal.js').then(module => {\n    const HeavyModal = module.default;\n    const modal = new HeavyModal();\n    modal.open();\n  }).catch(err => {\n    console.error('Failed to load the modal component:', err);\n  });\n});" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example 2: Route-Based Splitting with React" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The most common use case for lazy loading is splitting your app by routes. Modern frameworks provide convenient abstractions over dynamic `import()` for this." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "React's `React.lazy` and `Suspense` make this incredibly simple:" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "import React, { Suspense, lazy } from 'react';\nimport { BrowserRouter as Router, Route, Switch } from 'react-router-dom';\n\n// Use React.lazy to wrap a dynamic import\nconst HomePage = lazy(() => import('./routes/HomePage'));\nconst AdminPage = lazy(() => import('./routes/AdminPage'));\n\nconst App = () => (\n  <Router>\n    {/* Wrap your routes in Suspense to show a loading fallback */}\n    <Suspense fallback={<div>Loading...</div>}>\n      <Switch>\n        <Route exact path=\"/\" component={HomePage} />\n        <Route path=\"/admin\" component={AdminPage} />\n      </Switch>\n    </Suspense>\n  </Router>\n);" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In this example, the code for `AdminPage` will not be downloaded by the user's browser until they navigate to the `/admin` route. This is a fundamental pattern for building scalable and performant single-page applications." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Magic Comments for Chunks" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You can give your lazy-loaded chunks meaningful names using a 'magic comment'. This is great for debugging and analyzing your bundles." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const AdminPage = lazy(() => \n  import(/* webpackChunkName: \"admin-route\" */ './routes/AdminPage')\n);" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, instead of a generic name like `1.bundle.js`, Webpack will produce `admin-route.bundle.js`." }] },
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

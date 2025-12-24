require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Advanced Module Federation: Sharing Dependencies and State";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Beyond Simple Components" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Sharing a simple, self-contained component is a great start. But in a real-world micro-frontend architecture, you'll face two major challenges: efficiently sharing common dependencies (like React) and managing shared application state across different remotes. Module Federation provides elegant solutions for both." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "1. Sharing Vendor Dependencies" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "If both your host and remote applications use React, you don't want to download it twice. Module Federation allows you to define shared dependencies. When the host loads a remote, they will negotiate and use the highest compatible version of the shared library that satisfies both of their requirements. This is a massive performance optimization." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You configure this using the `shared` property in the `ModuleFederationPlugin`." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// In BOTH the host and remote webpack.config.js\n\nconst deps = require('./package.json').dependencies;\n\nnew ModuleFederationPlugin({\n  // ... other config\n  shared: {\n    ...deps, // Share all dependencies from package.json\n    react: { singleton: true, requiredVersion: deps.react },\n    'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },\n  },\n})" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `singleton: true` option is crucial for libraries like React. It ensures that only one instance of the library is ever loaded in the application, preventing strange bugs caused by multiple React instances trying to manage the same DOM." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "2. Sharing Application State" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Sharing state is more of an architectural challenge than a Webpack one, but Module Federation enables the patterns to solve it. One common and effective pattern is to use a shared 'state bus' module." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Create a Shared State Module in the Host" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In your host application, create a simple state management module. This could use Zustand, Redux, or even a simple vanilla JS class with a pub/sub model." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// AppShell/src/state.js\nimport { create } from 'zustand';\n\n// Create a simple Zustand store\nexport const useStore = create(set => ({\n  user: null,\n  login: (user) => set({ user }),\n  logout: () => set({ user: null }),\n}));" }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Expose the State Module from the Host" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Just as a remote can expose a component, a host can expose a module for remotes to consume." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// AppShell/webpack.config.js\nnew ModuleFederationPlugin({\n  name: 'AppShell',\n  exposes: {\n    './state': './src/state',\n  },\n  // ... other config\n})" }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 3: Consume the State in a Remote" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, a remote application can import and use the shared state hook from the host, allowing for seamless, bi-directional state communication between your micro-frontends." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// MyComponentApp/src/UserInfo.js\nimport React from 'react';\n// Import the shared state hook from the host application\nimport { useStore } from 'AppShell/state';\n\nconst UserInfo = () => {\n  const { user, logout } = useStore();\n\n  if (!user) return <div>Not logged in.</div>;\n\n  return (\n    <div>\n      Welcome, {user.name}! <button onClick={logout}>Logout</button>\n    </div>\n  );\n};\n\nexport default UserInfo;" }] },
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

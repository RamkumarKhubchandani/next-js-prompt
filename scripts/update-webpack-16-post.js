require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Introduction to Micro-Frontends with Module Federation";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem with Monolithic Frontends" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "As frontend applications grow, they can become large, monolithic codebases that are difficult to scale, maintain, and deploy. A small change in one part of the app requires the entire application to be rebuilt and redeployed. Micro-frontends are an architectural pattern that solves this problem by breaking down a large frontend app into a collection of smaller, independently deployable applications." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is Module Federation?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Module Federation is a game-changing feature introduced in Webpack 5. It allows a JavaScript application to dynamically load code from another, completely separate application at runtime. This is the key technology that makes building true micro-frontends with Webpack possible, without the complexities of older methods like iframes." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Core Concepts" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Host:" }, { type: 'text', text: " The 'container' application that consumes components from other applications. In our example, this will be `AppShell`." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Remote:" }, { type: 'text', text: " An application that 'exposes' some of its components to be used by hosts. In our example, this will be `MyComponentApp`." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Exposed Modules:" }, { type: 'text', text: " The specific components or modules that a remote application makes available for hosts to consume." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: A Simple Micro-Frontend" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Configuration for the `Remote` App (`MyComponentApp`)" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// MyComponentApp/webpack.config.js\nconst { ModuleFederationPlugin } = require('webpack').container;\n\nmodule.exports = {\n  // ...\n  plugins: [\n    new ModuleFederationPlugin({\n      name: 'MyComponentApp', // A unique name for this app\n      filename: 'remoteEntry.js', // The file hosts will use to find exposed modules\n      exposes: {\n        // Maps a public name to a local file path\n        './MyButton': './src/MyButton',\n      },\n    }),\n  ],\n};" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Configuration for the `Host` App (`AppShell`)" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// AppShell/webpack.config.js\nconst { ModuleFederationPlugin } = require('webpack').container;\n\nmodule.exports = {\n  // ...\n  plugins: [\n    new ModuleFederationPlugin({\n      name: 'AppShell',\n      remotes: {\n        // Maps a remote app's name to its location\n        MyComponentApp: 'MyComponentApp@http://localhost:3001/remoteEntry.js',\n      },\n    }),\n  ],\n};" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Using the Remote Component in the `Host`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, in the `AppShell` application, you can dynamically import and use `MyButton` as if it were a local component. Webpack handles the runtime fetching behind the scenes." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// AppShell/src/index.js\n\n// Dynamically import the button from the remote app\nimport('MyComponentApp/MyButton').then(({ default: MyButton }) => {\n  const button = MyButton();\n  document.body.appendChild(button);\n});" }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Module Federation is a powerful and elegant solution to the challenges of building large-scale frontend applications. It enables true code sharing between independent teams and deployments, paving the way for a more scalable and maintainable micro-frontend architecture." }] },
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Managing Environment Variables: .env and DefinePlugin";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why You Need Environment Variables" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Your application will often need different configurations for development and production. For example, your local API endpoint might be `http://localhost:8080/api`, while your production endpoint is `https://api.myapp.com`. Hardcoding these values is a bad practice. Environment variables allow you to inject these configuration details into your application at build time." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Method 1: The `dotenv` Package" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The most common way to manage environment variables is with `.env` files and the `dotenv` package. This allows you to store your variables in a file that is typically not committed to source control." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Installation" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm install --save-dev dotenv" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Create a `.env` file" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "# .env\nAPI_URL=https://api.myapp.com\n" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 3: Use Webpack's `DefinePlugin`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, you can read this `.env` file in your `webpack.config.js` and use the built-in `DefinePlugin` to make those variables available to your client-side code. `DefinePlugin` performs a direct text replacement." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// webpack.config.js\nconst webpack = require('webpack');\nrequire('dotenv').config(); // This loads the .env file into process.env\n\nmodule.exports = {\n  // ...\n  plugins: [\n    new webpack.DefinePlugin({\n      'process.env.API_URL': JSON.stringify(process.env.API_URL),\n    }),\n  ],\n};" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Note the `JSON.stringify`. This is crucial because, as mentioned, the plugin does a direct text replacement. `JSON.stringify('https://api.myapp.com')` becomes `'\"https://api.myapp.com\"'`, which is a valid JavaScript string." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Accessing the Variable in Your Code" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You can now access `API_URL` anywhere in your client-side application code as if it were a global variable." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// src/api.js\n\nconst apiUrl = process.env.API_URL;\n\nexport function fetchData() {\n  return fetch(`${apiUrl}/data`);\n}" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "During the build, Webpack will replace `process.env.API_URL` with the actual string from your `.env` file. If the variable is not defined, the replacement won't happen, so it's good practice to have default values or checks in your code." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Security Note" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "It's extremely important to remember that any variables you expose with `DefinePlugin` will be embedded in your client-side JavaScript bundle. NEVER store secrets like private API keys, database passwords, or secret tokens in your `.env` file to be used this way. This method is only for non-sensitive, public configuration." }] },
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

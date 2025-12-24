require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Implementing a Strict Content Security Policy (CSP) with Webpack";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is CSP and Why Is It Hard with Webpack?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A Content Security Policy (CSP) is a security feature, delivered via an HTTP header, that helps prevent cross-site scripting (XSS) and other injection attacks. A strict CSP often forbids inline scripts (`<script>...</script>`) and dynamic code evaluation (`eval()`). This creates a direct conflict with Webpack's default behavior, which uses inline scripts for its runtime and chunk loading logic. Implementing a strict CSP with Webpack requires some specific configuration." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Solution: Nonces" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A 'nonce' (number used once) is a randomly generated string that you create on the server for each request. You include this nonce in your CSP header and also add it as an attribute to your script tags. The browser will then only execute scripts that have the correct nonce attribute, allowing you to use inline scripts in a secure way." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Step 1: Generate a Nonce on the Server" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In your Express server, you need to generate a unique, random string for every request. You'll then pass this nonce to your HTML template and use it in the CSP header." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// server.js\nimport crypto from 'crypto';\n\napp.use((req, res, next) => {\n  res.locals.nonce = crypto.randomBytes(16).toString('hex');\n  next();\n});\n\napp.get('/', (req, res) => {\n  const nonce = res.locals.nonce;\n  // Set the CSP Header\n  res.setHeader(\n    'Content-Security-Policy',\n    `script-src 'self' 'nonce-${nonce}';` // Allow scripts from our own origin and those with the correct nonce\n  );\n\n  // Pass the nonce to your HTML rendering logic...\n});" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Step 2: Tell Webpack About the Nonce" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Webpack needs to know what the nonce is so it can add the `nonce` attribute to the script tags it generates. You can do this by setting a special variable, `__webpack_nonce__`, at the very top of your application's entry point." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// src/index.js (Client Entry Point)\n\n// Get the nonce from a meta tag or data attribute in the HTML\n// This assumes your server-side template renders it somewhere.\nconst nonce = document.querySelector('meta[name=\"csp-nonce\"]').content;\n\n// Set the magic variable\n__webpack_nonce__ = nonce;\n\n// The rest of your application code...\nimport('./App');" }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Step 3: Configure `HtmlWebpackPlugin`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Finally, your `HtmlWebpackPlugin` needs to be configured to render the nonce into the HTML so the client-side code can read it." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// webpack.config.js\n\nnew HtmlWebpackPlugin({\n  //...\n  meta: {\n    'csp-nonce': '<%= nonce %>', // This uses EJS-style templating\n  },\n})" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Your server-side rendering logic would then use a templating engine to replace `<%= nonce %>` with the actual nonce generated for that request. With these pieces in place, Webpack's dynamically loaded chunks and runtime scripts will all have the correct `nonce` attribute, satisfying your strict Content Security Policy." }] },
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

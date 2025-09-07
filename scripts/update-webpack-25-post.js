require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Integrating WebAssembly (Wasm) into Your JavaScript Build";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is WebAssembly?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "WebAssembly (Wasm) is a binary instruction format for a stack-based virtual machine. It's designed as a portable compilation target for high-level languages like C, C++, and Rust, enabling deployment on the web for client and server applications. For JavaScript developers, Wasm is exciting because it allows you to run computationally intensive tasks (like image/video processing, encryption, or physics simulations) at near-native speed in the browser, offloading the work from the main JavaScript thread." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Using Wasm in Webpack 5" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Webpack 5 introduced first-class support for WebAssembly, making it much easier to integrate. You no longer need custom loaders like you did in previous versions. Webpack can now understand and bundle `.wasm` files out of the box." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: Using a Simple Wasm Module" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's assume we have a simple C++ function that adds two numbers, and we've compiled it to a `math.wasm` file." }] },
        { type: 'codeBlock', attrs: { language: 'cpp' }, content: [{ type: 'text', text: "// C++ source (for context)\n\nextern \"C\" {\n  int add(int a, int b) {\n    return a + b;\n  }\n}" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Enable Wasm Experiments in Webpack" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In your `webpack.config.js`, you need to enable the `asyncWebAssembly` experiment. This tells Webpack to treat Wasm files as asynchronous modules, which is the modern and recommended approach." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "module.exports = {\n  // ...\n  experiments: {\n    asyncWebAssembly: true,\n  },\n};" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Import and Use the Wasm Module" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now you can use a dynamic `import()` to load your `.wasm` file. The `import` will return a promise that resolves to an object containing the exported functions from your Wasm module." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// src/index.js\n\nasync function run() {\n  // Import the Wasm module\n  const wasm = await import('../wasm/math.wasm');\n\n  // Call the exported 'add' function\n  const result = wasm.add(10, 22);\n\n  console.log('The result from Wasm is:', result); // Output: 32\n}\n\nrun();" }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How It Works" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When Webpack sees the `import()` of a `.wasm` file and the `asyncWebAssembly` experiment is enabled, it automatically handles the fetching and instantiation of the WebAssembly module. It emits the `.wasm` file as a separate asset and injects the necessary JavaScript 'glue' code to load and execute it in the browser. This seamless integration allows you to leverage the power of high-performance languages on the web without complex manual setup." }] },
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

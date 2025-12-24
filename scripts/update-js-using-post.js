require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Understanding `using` and `await using`: The New Resource Management Syntax";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem: Leaky Resources" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In programming, we often work with resources that need to be explicitly closed, like file handles, database connections, or network sockets. Forgetting to close them can lead to memory leaks and other bugs. The classic JavaScript pattern for this is `try...finally`, but it's verbose and error-prone." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// The old, verbose way\nconst resource = getResource();\ntry {\n  // ... use the resource ...\n} finally {\n  resource.close();\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The upcoming 'Explicit Resource Management' proposal (Stage 3) introduces the `using` and `await using` keywords to make this process declarative, safer, and much cleaner." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How It Works: The `Symbol.dispose` Protocol" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The new syntax relies on a well-known Symbol, `Symbol.dispose` (for synchronous disposal) and `Symbol.asyncDispose` (for asynchronous disposal). When an object declared with `using` goes out of scope, the JavaScript engine will automatically call the method associated with this symbol." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// A class that implements the disposal protocol\nclass MyResource {\n  constructor() {\n    console.log('Resource created');\n  }\n\n  // This method will be called automatically\n  [Symbol.dispose]() {\n    console.log('Resource disposed!');\n  }\n}\n\nfunction doWork() {\n  using resource = new MyResource();\n  console.log('Using resource...');\n} // <-- resource goes out of scope here\n\ndoWork();\n// Logs:\n// Resource created\n// Using resource...\n// Resource disposed!` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `using` keyword automatically handles the `try...finally` logic for us. The resource is disposed of whether the block finishes normally or if an error is thrown." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Asynchronous Disposal with `await using`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Many resources, like database connections, require an asynchronous cleanup operation. For this, we can use `Symbol.asyncDispose` and the `await using` keyword." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `class AsyncResource {\n  async [Symbol.asyncDispose]() {\n    console.log('Disposing asynchronously...');\n    await new Promise(resolve => setTimeout(resolve, 100));\n    console.log('Async disposal complete.');\n  }\n}\n\nasync function doAsyncWork() {\n  await using resource = new AsyncResource();\n  // ... use the resource ...\n} // <-- awaits the disposal before continuing\n\nawait doAsyncWork();` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Practical Use Cases" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Database Connections: Ensure a connection is always returned to the pool." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "File Handles: Automatically close file streams to prevent leaks." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Mutexes/Locks: Guarantee that a lock is released, even if an error occurs." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Logging/Tracing: Automatically log the start and end of a timed operation." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: A Major Step for Robustness" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `using` and `await using` keywords are a fantastic addition to the JavaScript language, inspired by similar features in languages like C# and Java. They provide a declarative, reliable, and much less verbose way to handle resource management. As this feature becomes widely available in runtimes and browsers in 2025, it will become the standard best practice for writing safer, more robust, and leak-free JavaScript code." }] },
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

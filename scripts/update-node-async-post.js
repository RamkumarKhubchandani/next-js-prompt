require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Asynchronous JavaScript in Node.js: Callbacks, Promises, and Async/Await";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Challenge of Asynchronous Operations" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Node.js is single-threaded, which means it can only do one thing at a time. To handle operations that take time (like reading a file or making a database request) without blocking the entire application, Node.js relies heavily on asynchronous programming. This concept has evolved over time, leading to three main patterns: Callbacks, Promises, and Async/Await." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "1. The Old Way: Callbacks" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The original way to handle async operations was with callback functions. You would pass a function (the callback) as an argument to another function. This callback would then be executed once the asynchronous operation was complete. The common convention was 'error-first', where the first argument to the callback is the error, if any." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const fs = require('fs');\n\nfs.readFile('/path/to/file', 'utf8', (err, data) => {\n  if (err) {\n    console.error('Error reading file:', err);\n    return;\n  }\n  console.log('File content:', data);\n});` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While functional, nesting many callbacks can lead to 'Callback Hell', making code hard to read and maintain." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "2. A Better Way: Promises" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Promises were introduced to simplify asynchronous code. A `Promise` is an object that represents the eventual completion (or failure) of an asynchronous operation. It can be in one of three states: pending, fulfilled, or rejected. You can chain `.then()` to handle a successful result and `.catch()` to handle errors." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const fs = require('fs').promises; // Use the promise-based version\n\nfs.readFile('/path/to/file', 'utf8')\n  .then(data => {\n    console.log('File content:', data);\n  })\n  .catch(err => {\n    console.error('Error reading file:', err);\n  });` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "3. The Modern Way: Async/Await" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Async/Await is modern syntactic sugar built on top of Promises. It makes your asynchronous code look and behave more like synchronous code, making it much easier to read and reason about. You use the `async` keyword to declare a function as asynchronous, and the `await` keyword to pause the function's execution until a Promise is resolved." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const fs = require('fs').promises;\n\nasync function readFileContent() {\n  try {\n    const data = await fs.readFile('/path/to/file', 'utf8');\n    console.log('File content:', data);\n  } catch (err) {\n    console.error('Error reading file:', err);\n  }\n}\n\nreadFileContent();` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Understanding the progression from callbacks to Promises to Async/Await is crucial for any Node.js developer. While you'll still encounter callbacks in older libraries, modern Node.js development almost exclusively uses Promises and the much cleaner Async/Await syntax. Mastering Async/Await will allow you to write clean, readable, and efficient non-blocking code." }] }
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
        { $set: { content: updatedContent } },
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

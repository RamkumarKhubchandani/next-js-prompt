require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Working with File System (`fs`) Module in Node.js";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is the `fs` Module?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `fs` (File System) module is a built-in Node.js module that allows your application to interact with the file system. It's a fundamental part of Node.js and is used for a wide range of tasks, such as reading configuration files, writing logs, or serving static assets. The `fs` module provides both synchronous and asynchronous methods for file operations." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Asynchronous vs. Synchronous" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Because Node.js is single-threaded, it's highly recommended to use the asynchronous methods whenever possible. Asynchronous methods are non-blocking; they take a callback function that gets executed once the operation is complete. Synchronous methods, which have `Sync` in their names (e.g., `readFileSync`), are blocking and will halt the execution of your entire program until they are finished. They should generally be avoided in a server environment." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Reading a File (Asynchronously)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's read the content of a file using the modern promise-based API with async/await." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const fs = require('fs').promises;\n\nasync function readFile() {\n  try {\n    const data = await fs.readFile('example.txt', 'utf8');\n    console.log('File content:', data);\n  } catch (err) {\n    console.error('Error reading file:', err);\n  }\n}\n\nreadFile();` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Writing to a File (Asynchronously)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Writing to a file is just as straightforward. If the file doesn't exist, `writeFile` will create it. If it does exist, it will be overwritten." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const fs = require('fs').promises;\n\nasync function writeFile() {\n  try {\n    const content = 'Hello, Node.js File System!';\n    await fs.writeFile('newfile.txt', content, 'utf8');\n    console.log('File written successfully!');\n  } catch (err) {\n    console.error('Error writing file:', err);\n  }\n}\n\nwriteFile();` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Other Common `fs` Operations" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`fs.appendFile()`:", bold: true }, { type: 'text', text: " Appends data to an existing file." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`fs.readdir()`:", bold: true }, { type: 'text', text: " Reads the contents of a directory." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`fs.mkdir()`:", bold: true }, { type: 'text', text: " Creates a new directory." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`fs.unlink()`:", bold: true }, { type: 'text', text: " Deletes a file." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `fs` module is an essential tool for any Node.js developer. It provides a simple yet powerful API for all file system interactions. By favoring the asynchronous, promise-based methods, you can perform complex file operations without blocking Node's event loop, ensuring your application remains fast and responsive." }] }
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

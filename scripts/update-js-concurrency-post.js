require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Mastering Concurrency: Web Workers, Atomics, and SharedArrayBuffer";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "JavaScript's Single-Threaded Nature" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "JavaScript is fundamentally single-threaded. This simplicity is a strength, preventing many complex race conditions found in multi-threaded languages. However, it means that long-running, CPU-intensive tasks (like complex calculations, data processing, or parsing large files) can block the main thread, freezing the UI and creating a terrible user experience. Web Workers solve this by bringing true, multi-threaded concurrency to the browser." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Web Workers: Offloading Heavy Tasks" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A Web Worker is a script that runs in a background thread, separate from the main UI thread. They cannot directly access the DOM, but they can communicate with the main thread using a messaging system. This is perfect for offloading heavy computations without freezing the page." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// main.js - Main thread code\nconst myWorker = new Worker('worker.js');\n\nmyWorker.postMessage({ command: 'start', number: 1000000 });\n\nmyWorker.onmessage = (e) => {\n  console.log('Result from worker:', e.data);\n};\n\n// worker.js - Background thread code\nself.onmessage = (e) => {\n  if (e.data.command === 'start') {\n    // Perform a heavy calculation\n    let result = 0;\n    for (let i = 0; i < e.data.number; i++) {\n      result += i;\n    }\n    self.postMessage(result);\n  }\n};` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Communication Bottleneck: `SharedArrayBuffer`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "`postMessage` is great, but it has a limitation: it copies the data. When sending large data sets between threads, this copying can be slow. `SharedArrayBuffer` is a fixed-length raw binary data buffer that can be shared between threads. Instead of copying, both the main thread and the worker get a reference to the same block of memory, allowing for near-instantaneous data sharing." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Preventing Race Conditions: `Atomics`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Sharing memory is powerful but dangerous. If two threads try to write to the same memory location at the same time, you can get a 'race condition', leading to corrupted data. The `Atomics` object provides a set of static methods to perform atomic operations on `SharedArrayBuffer` objects. These operations are guaranteed to finish before any other operation starts, preventing race conditions." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Assume 'sharedBuffer' is a SharedArrayBuffer shared between threads\nconst int32Array = new Int32Array(sharedBuffer);\n\n// Atomically add 5 to the value at index 0\n// This operation is safe from race conditions\nAtomics.add(int32Array, 0, 5);\n\n// Atomically load the value at index 0\nconst value = Atomics.load(int32Array, 0);\nconsole.log(value);` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Mastering Web Workers, `SharedArrayBuffer`, and `Atomics` is key to building high-performance web applications that can handle complex, CPU-intensive tasks. By moving work off the main thread, you ensure your UI remains smooth and responsive, delivering a superior user experience." }] },
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Efficient Data Handling with IndexedDB and the Storage Buckets API";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Beyond `localStorage`: The Need for IndexedDB" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "`localStorage` is simple, but it's a synchronous, string-only key-value store with a small storage limit (around 5MB). For serious client-side storage, we need something better. IndexedDB is a low-level, transactional, object-oriented database built into the browser. It allows you to store large amounts of structured data (including files and blobs) and query it efficiently with indexes." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Asynchronous Nature of IndexedDB" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The IndexedDB API is asynchronous and event-based, which can be complex. Modern wrapper libraries like `idb` by Jake Archibald are highly recommended as they provide a much cleaner, Promise-based API." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "import { openDB } from 'idb';\n\n// 1. Define the database schema\nconst dbPromise = openDB('my-database', 1, {\n  upgrade(db) {\n    // Create an 'object store' (like a table)\n    const store = db.createObjectStore('products', { keyPath: 'id' });\n    // Create an 'index' to query by name\n    store.createIndex('name', 'name');\n  },\n});\n\n// 2. Add data in a transaction\nasync function addProduct(product) {\n  const db = await dbPromise;\n  await db.add('products', product);\n}\n\n// 3. Get data by key\nasync function getProduct(id) {\n  const db = await dbPromise;\n  return db.get('products', id);\n}\n\n// 4. Get data using an index\nasync function findProductByName(name) {\n  const db = await dbPromise;\n  return db.getFromIndex('products', 'name', name);\n}" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Eviction Problem: Storage Buckets API" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A major challenge with all client-side storage is that the browser can evict your data under storage pressure. If the user is running low on disk space, the browser might delete your entire IndexedDB database without warning. The Storage Buckets API is a new standard that aims to solve this." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "It allows a site to create multiple 'buckets' for its data. You can then mark a bucket as 'persistent', signaling to the browser that the data inside is critical and should not be cleared automatically. The user will be prompted to grant this permission." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "async function requestPersistentStorage() {\n  if (navigator.storage && navigator.storage.persist) {\n    const isPersisted = await navigator.storage.persisted();\n    if (!isPersisted) {\n      // Request persistent storage\n      const granted = await navigator.storage.persist();\n      if (granted) {\n        console.log('Persistent storage granted!');\n      } else {\n        console.log('Persistent storage denied.');\n      }\n    }\n  }\n}" }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For building powerful offline-first applications, IndexedDB is the undisputed champion of client-side storage. When combined with the Storage Buckets API to ensure data durability, it provides a robust foundation for storing and efficiently querying large amounts of structured data, enabling rich, data-driven experiences that work even without a network connection." }] },
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

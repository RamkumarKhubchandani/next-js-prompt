require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Optimizing Memory Usage: A Guide to Garbage Collection and WeakRefs";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "JavaScript's Automatic Memory Management" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "JavaScript is a 'garbage-collected' language, which means developers don't need to manually allocate and deallocate memory. The JavaScript engine's garbage collector (GC) periodically looks for objects that are no longer 'reachable' from the root of the application (like the `window` object) and frees that memory. While this is convenient, it's not foolproof. 'Memory leaks' can still happen when we unintentionally keep references to objects we no longer need." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem: Lingering References" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The most common cause of memory leaks is holding a reference to an object in a long-lived data structure, like a global cache. If you add an object to a cache (like a `Map` or `Array`) and forget to remove it when it's no longer needed, the garbage collector can never reclaim its memory, because it's still reachable from the cache." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const globalCache = new Map();\n\nfunction processBigObject(obj) {\n  // Cache the object by its ID\n  globalCache.set(obj.id, obj);\n  // ... do work ...\n}\n\n// Even if we lose all other references to 'bigObject',\n// it will never be garbage collected because it's still in the globalCache.` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Solution: Weak References" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Modern JavaScript provides tools to hold 'weak' references to objects. A weak reference does not prevent the garbage collector from reclaiming an object. This is perfect for caching." }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`WeakMap`: A map where the keys are weakly held. If an object used as a key is garbage collected, the entry is automatically removed from the map." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`WeakRef`: Allows you to create a direct weak reference to an object. To access the object, you must call the `.deref()` method. If the object has been collected, `.deref()` will return `undefined`." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: Building a Leak-Free Cache with `WeakMap`" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// The keys of this map are held weakly.\nconst metadataCache = new WeakMap();\n\nfunction getMetadataFor(obj) {\n  if (metadataCache.has(obj)) {\n    return metadataCache.get(obj);\n  }\n\n  const metadata = computeMetadata(obj);\n  metadataCache.set(obj, metadata);\n  return metadata;\n}\n\n// When 'myBigObject' goes out of scope and is garbage collected,\n// its entry in the metadataCache will be automatically removed.\nlet myBigObject = { id: 1, data: '...' };\ngetMetadataFor(myBigObject);\n\nmyBigObject = null; // Remove the strong reference` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Running Cleanup Logic with `FinalizationRegistry`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Sometimes, you need to run a specific cleanup task when an object is garbage collected. A `FinalizationRegistry` allows you to register a callback that will be invoked *after* an object has been collected." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const registry = new FinalizationRegistry((heldValue) => {\n  // This callback runs after the object is garbage collected.\n  console.log(\`An object with held value '\${heldValue}' has been collected.\`);\n});\n\nfunction trackObject(obj, info) {\n  registry.register(obj, info);\n}\n\nlet myTrackedObject = { name: 'leaky' };\ntrackObject(myTrackedObject, 'my-object-id');\n\nmyTrackedObject = null; // When this object is eventually GC'd, the callback will fire.` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is useful for managing resources that exist outside of JavaScript's memory, like file handles or memory allocated in a WebAssembly module." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Taking Control of Memory" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While JavaScript's garbage collector is powerful, understanding how it works and how to avoid common pitfalls is essential for building high-performance, long-running applications. By leveraging modern APIs like `WeakMap`, `WeakRef`, and `FinalizationRegistry`, you can build sophisticated caching strategies and prevent memory leaks, ensuring your applications remain fast and reliable." }] },
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

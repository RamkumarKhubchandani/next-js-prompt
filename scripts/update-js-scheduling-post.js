require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Building Resilient Applications with the Prioritized Task Scheduling API";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem: The Blocked Main Thread" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The biggest cause of unresponsive web pages is a blocked main thread. When a long-running JavaScript task (like rendering a complex chart or processing a large dataset) is running, the browser cannot respond to user input like clicks or typing. The Prioritized Task Scheduling API (`scheduler.postTask`) is a new browser API designed to solve this by giving developers fine-grained control over when and how tasks are executed." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Core Concept: Priorities and Abortable Tasks" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Instead of just running a function, `scheduler.postTask` allows you to schedule a task with a specific priority. The browser's scheduler can then decide the best time to run the task to avoid blocking more important work, like rendering UI updates." }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`priority`: Can be 'user-blocking' (highest, for UI updates), 'user-visible' (medium, for rendering data), or 'background' (lowest, for logging or non-critical work)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`signal`: Can be passed an `AbortSignal` to cancel the task if it's no longer needed (e.g., the user navigates away)." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Practical Example: A Responsive Search Input" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Imagine a search input that filters a very large list. Without careful handling, typing into the input can feel slow and janky. Let's fix it with `postTask`." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const searchInput = document.querySelector('#search');\nconst list = document.querySelector('#list');\nlet abortController = new AbortController();\n\nsearchInput.addEventListener('input', () => {\n  // Cancel the previous, now-outdated search task\n  abortController.abort();\n  abortController = new AbortController();\n\n  const query = searchInput.value;\n\n  // Schedule the filtering task with a lower priority\n  scheduler.postTask(() => {\n    const items = filterList(query); // A potentially slow function\n    renderList(items);\n  }, {\n    priority: 'user-visible', // Important, but can be deferred slightly\n    signal: abortController.signal // Make it cancellable\n  });\n});\n\n// A high-priority task like a button click would be able to interrupt the search task!` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Yielding to the Main Thread with `scheduler.yield`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For extremely long-running tasks, even `postTask` might not be enough. The new `scheduler.yield()` API allows a task to voluntarily pause itself, give control back to the main thread to handle user input, and then resume its work. This is a powerful tool for cooperative multitasking within the browser." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `async function processHugeArray(array) {\n  for (let i = 0; i < array.length; i++) {\n    processItem(array[i]);\n\n    // After every 100 items, check if we should yield\n    if (i % 100 === 0 && await scheduler.yield()) {\n      // The browser was busy, so we paused. Now we can continue.\n    }\n  }\n}` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: The Key to a Perceptibly Performant Future" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The Prioritized Task Scheduling API and `scheduler.yield` are game-changers for web performance. They provide the low-level controls needed to build complex, data-intensive applications that *feel* fast and responsive, no matter what's happening in the background. Mastering these APIs is a key skill for any developer serious about building top-tier, resilient, and user-friendly web experiences in 2025." }] },
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

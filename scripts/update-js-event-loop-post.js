require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Understanding the JavaScript Event Loop: A Visual Guide for 2025";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The 'Non-Blocking' Illusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "JavaScript is a single-threaded language, meaning it can only do one thing at a time. Yet, it can handle thousands of operations concurrently (like network requests or timers) without freezing. This is not magic; it's the Event Loop. Understanding this model is the single most important step to becoming an advanced JavaScript developer." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Core Components" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Imagine four distinct areas:" }] },
        { type: 'orderedList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "1. The Call Stack:" }, { type: 'text', text: " This is where your functions are executed. When you call a function, it's pushed onto the stack. When it returns, it's popped off. It's a 'last-in, first-out' system." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "2. Web APIs (or C++ APIs in Node.js):" }, { type: 'text', text: " These are part of the browser/Node environment, not the JS engine. When you call an asynchronous function like `setTimeout`, `fetch`, or an event listener, the JavaScript engine hands it off to the Web API to handle. The call is then removed from the stack, allowing JavaScript to continue running other code." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "3. The Callback Queue (or Task Queue):" }, { type: 'text', text: " When a Web API finishes its task (e.g., the timer in `setTimeout` expires), the callback function you provided is not executed immediately. Instead, it's placed in the Callback Queue, waiting its turn." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "4. The Event Loop:" }, { type: 'text', text: " This is the star of the show. It's a simple process that constantly checks one thing: 'Is the Call Stack empty?' If it is, it takes the first item from the Callback Queue and pushes it onto the Call Stack to be executed." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Visual Example in Code" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "console.log('Start'); // 1. Pushed to stack, executed, popped.\n\nsetTimeout(() => {\n  console.log('Timeout!'); // 5. Pushed to stack, executed, popped.\n}, 0); // 2. Handed to Web API. Timer starts.\n\nPromise.resolve().then(() => {\n  console.log('Promise!'); // 4. Pushed to stack, executed, popped.\n});\n\nconsole.log('End'); // 3. Pushed to stack, executed, popped." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Order of Execution:" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "1. `Start`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "2. `End`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "3. `Promise!`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "4. `Timeout!`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Why? Because Promises use a separate, higher-priority 'Microtask Queue'. The Event Loop will always clear the entire Microtask Queue before processing the next item from the regular Callback (or 'Macrotask') Queue." }] },

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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Proxy and Reflect APIs: The Ultimate Metaprogramming Tools";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is Metaprogramming?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Metaprogramming is the concept of writing code that operates on other code. JavaScript's dynamic nature has always allowed for some metaprogramming, but the `Proxy` and `Reflect` APIs, introduced in ES6, provide a powerful, standardized way to intercept and customize fundamental language operations." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The `Proxy` Object: Intercepting Operations" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A `Proxy` object wraps another object (the 'target') and allows you to intercept operations performed on it, such as getting a property, setting a property, or calling a function. You define this interception logic in a 'handler' object." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const target = {\n  message: 'hello',\n  secret: 123\n};\n\nconst handler = {\n  // The 'get' trap intercepts property access\n  get(target, prop, receiver) {\n    if (prop === 'secret') {\n      return 'ACCESS DENIED';\n    }\n    return target[prop];\n  }\n};\n\nconst proxy = new Proxy(target, handler);\n\nconsole.log(proxy.message); // 'hello'\nconsole.log(proxy.secret);  // 'ACCESS DENIED'` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The `Reflect` Object: The Default Behavior" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "`Reflect` is a built-in object that provides methods for the same operations that `Proxy` can intercept. The key idea is that each `Proxy` trap has a corresponding `Reflect` method that performs the default behavior for that operation. This is incredibly useful inside your proxy handlers." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const handler = {\\n  // A 'set' trap intercepts property assignment\\n  set(target, prop, value, receiver) {\\n    console.log(`Setting '${prop}' to '${value}'`);\\n    \\n    // Use Reflect.set to perform the default set operation\\n    // This is more reliable than target[prop] = value\\n    return Reflect.set(target, prop, value, receiver);\\n  }\\n};\\n\\nconst proxy = new Proxy({}, handler);\\n\\nproxy.name = 'John'; // Logs: \\\"Setting 'name' to 'John'\\\"" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why Use `Reflect`?" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "It guarantees the default behavior. Manually replicating the default behavior in a trap can be complex and error-prone." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "It provides a consistent return value indicating if the operation was successful, which is essential for certain traps like `set`." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Powerful Use Cases" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "`Proxy` and `Reflect` are the foundation for many advanced JavaScript libraries and patterns:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Reactivity Systems: Frameworks like Vue use Proxies to detect when properties on a state object are accessed or modified, allowing them to automatically update the UI." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Validation: Creating objects that validate any new value being set on a property." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "API Mocking: Intercepting function calls or property access to return mock data during testing." }] }] },
        ]},
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

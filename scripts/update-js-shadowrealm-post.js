require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "The ShadowRealm API: True Sandboxing for Secure Code Execution";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Need for a Better Sandbox" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "JavaScript has long needed a way to securely execute third-party code without risking interference with the main application. `eval()` is dangerous, Web Workers have a high communication overhead, and `iframes` are heavy and complex. The ShadowRealm API is a TC39 proposal that provides a new, lightweight, and secure way to create a sandboxed execution environment." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is a ShadowRealm?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A `ShadowRealm` is a new global environment, completely separate from the main window's global environment. It has its own set of global objects (`Object`, `Array`, etc.) and intrinsics. Code executed inside a ShadowRealm cannot access or modify objects in the outer realm, and vice versa. This strong isolation is the key to its security." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Core Functionality: `evaluate` and `importValue`" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// 1. Create a new realm\nconst realm = new ShadowRealm();\n\n// 2. Execute code inside the realm using evaluate()\n// Note: The code is a string. It has no access to the outer scope.\nconst result = realm.evaluate(\`(\n  () => {\n    // This code runs in a totally separate global environment\n    const privateVar = [1, 2, 3];\n    return privateVar.map(x => x * 2);\n  }\n)()\`);\n\nconsole.log(result); // [2, 4, 6]\n\n// 3. Import a function from a module into the realm\n// Assume 'my-module.js' exports a function called 'myFunction'\nconst myFunctionInRealm = await realm.importValue('./my-module.js', 'myFunction');\n\n// Now you can call the function, and it will execute within the realm's sandbox\nconst moduleResult = myFunctionInRealm();` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Key Characteristics" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Isolation: A ShadowRealm has a separate global object and prototype chain. An `Array` from the realm is not `instanceof` the outer realm's `Array`." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "No DOM Access: By default, ShadowRealms do not have access to the `document` or `window` objects, making them safe for running code that shouldn't manipulate the UI." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Synchronous Communication: Unlike Web Workers, communication can be synchronous. `evaluate` returns a value directly. However, only primitive values (strings, numbers, etc.) can be passed between realms. Complex objects are passed by value (copied)." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Use Cases" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The ShadowRealm API is perfect for:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Plugin systems where you need to run third-party code securely." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Online code editors and playgrounds." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Running complex, untrusted logic in a serverless environment." }] }] },
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

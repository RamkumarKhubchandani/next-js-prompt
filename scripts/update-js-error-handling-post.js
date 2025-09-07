require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Advanced Error Handling: `try/catch` vs. Result Types";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Traditional Approach: `try/catch`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For decades, `try/catch` has been the standard for handling errors in JavaScript. It's built into the language and works well for handling unexpected, exceptional events. You 'try' a block of code, and if an error is 'thrown', you 'catch' it and handle it. This is effective for runtime errors, but can be verbose and encourages treating all errors as exceptions that interrupt the normal program flow." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `function parseJson(jsonString) {\n  try {\n    const data = JSON.parse(jsonString);\n    return data;\n  } catch (error) {\n    console.error('Failed to parse JSON:', error);\n    return null; // Or re-throw, or handle otherwise\n  }\n}` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Functional Approach: Result Types" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Inspired by functional languages like Rust and Haskell, the 'Result Type' pattern is gaining popularity in the TypeScript/JavaScript world. Instead of throwing an error, a function always returns a specific object—a 'Result'—that explicitly represents either success or failure. This makes potential failures a part of the function's signature, forcing the developer to handle them." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A common implementation is a wrapper object with a `status` and either a `value` or an `error`." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `type Result<T, E> = { status: 'ok', value: T } | { status: 'error', error: E };\n\nfunction parseJsonResult(jsonString: string): Result<any, Error> {\n  try {\n    const data = JSON.parse(jsonString);\n    return { status: 'ok', value: data };\n  } catch (error) {\n    return { status: 'error', error: error as Error };\n  }\n}\n\n// Usage\nconst result = parseJsonResult('{ "name": "John" }');\n\nif (result.status === 'ok') {\n  console.log('Success:', result.value);\n} else {\n  console.error('Failure:', result.error.message);\n}` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "When to Use Which?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The choice depends on the type of error:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Use `try/catch` for Exceptional Errors: These are unexpected bugs or system failures that you can't reasonably predict, like a network connection suddenly dropping, running out of memory, or a stack overflow. These are true 'exceptions' to normal operation." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Use Result Types for Expected Failures: These are predictable errors that are a normal part of your application's logic. Examples include user input validation failing, a file not being found at a path, or an API request returning a 404. These aren't bugs; they are expected outcomes that your code must handle." }] }] },
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Modern JavaScript development benefits from using both patterns. By embracing Result Types for predictable failures, you create more robust, readable, and self-documenting APIs. By reserving `try/catch` for truly exceptional circumstances, you keep your core logic cleaner and make your code's intent clearer. This hybrid approach leads to more resilient and maintainable applications." }] },
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

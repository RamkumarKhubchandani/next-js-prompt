require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Pattern Matching in JavaScript: A Look at the Upcoming Proposal";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Beyond `switch` and `if-else`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "JavaScript developers have long relied on `switch` statements and long `if-else` chains for conditional logic. While functional, these can become verbose and hard to read, especially with complex data structures. The upcoming Pattern Matching proposal aims to introduce a more powerful, declarative, and expressive way to handle this." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Note: As of late 2024, this is a Stage 1 TC39 proposal. The syntax is subject to change, but the core concepts are powerful to explore." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Core Idea: `match` expressions" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Pattern matching allows you to test a value against a series of 'patterns'. If a pattern matches, an associated expression is executed. This is far more powerful than a `switch` statement, which only checks for simple equality." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Proposed Syntax\nconst getHttpStatusMessage = (status) => match (status) {\n  when (100..199) { 'Informational' }\n  when (200..299) { 'Success' }\n  when (300..399) { 'Redirection' }\n  when (400..499) { 'Client Error' }\n  when (500..599) { 'Server Error' }\n  default { 'Unknown Status' }\n}` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Destructuring and Matching on Object Shape" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is where pattern matching truly outshines `switch`. You can match based on the 'shape' of an object, destructuring values in the process." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Proposed Syntax\nconst handleApiResponse = (response) => match (response) {\n  when ({ status: 'success', data }) { \n    console.log('Received data:', data);\n  }\n  when ({ status: 'error', error: { code, message } }) {\n    console.error(\`Error \${code}: \${message}\`);\n  }\n  default {\n    console.warn('Unknown response format');\n  }\n}\n\nhandleApiResponse({ status: 'success', data: { id: 1, name: 'John Doe' } });\nhandleApiResponse({ status: 'error', error: { code: 404, message: 'Not Found' } });` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Benefits of Pattern Matching" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Readability: It makes complex conditional logic much cleaner and easier to understand at a glance." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Expressiveness: You can match on data types, ranges, object structures, and more." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Conciseness: It significantly reduces the boilerplate of `if-else` and `switch` statements." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "While still in development, the Pattern Matching proposal represents a significant evolution for JavaScript. It promises to bring a level of expressiveness and clarity to conditional logic that is common in other modern languages, making our code safer, more readable, and more robust." }] },
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

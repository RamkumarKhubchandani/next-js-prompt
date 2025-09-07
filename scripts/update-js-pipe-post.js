require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "The Pipe Operator (`|>`): A New Era for Functional JavaScript";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem: Deeply Nested Function Calls" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Functional programming often involves chaining functions together, where the output of one function becomes the input of the next. In JavaScript, this leads to deeply nested and hard-to-read code." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const result = capitalize(trim(doubleSay('  hello  ')));" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To understand the order of operations, you have to read from the inside out, which is counterintuitive. The Pipe Operator is a TC39 proposal that aims to solve this readability problem." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Note: As of late 2024, this is a Stage 2 proposal. The syntax and placeholder token (`%`) are subject to change." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Introducing the Pipe Operator (`|>`)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The pipe operator allows you to 'pipe' a value forward into a function, making the code read from left to right, just like a unix pipe." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// Using the Pipe Operator\nconst result = '  hello  ' \n  |> doubleSay(%)\n  |> trim(%)\n  |> capitalize(%);" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The value on the left-hand side is passed as an argument to the function on the right-hand side, replacing the placeholder token (currently `%`, but could become `^` or another character)." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A More Complex Example" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The pipe operator shines when dealing with more complex data transformations, especially with arrays." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "const users = [\n  { name: 'Alice', age: 30, active: true },\n  { name: 'Bob', age: 25, active: false },\n  { name: 'Charlie', age: 35, active: true },\n];\n\nconst getActiveUserNames = (users) => users\n  .filter(user => user.active)\n  .map(user => user.name)\n  .sort();\n\n// Traditional way\nconst names = getActiveUserNames(users);\n\n// Using the Pipe Operator\nconst namesPipe = users |> getActiveUserNames(%);" }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Benefits of the Pipe Operator" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Readability: Code reads naturally from left to right, describing a sequence of transformations." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Reduces Nesting: Eliminates the 'pyramid of doom' from nested function calls." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Improves Debugging: It's easier to comment out one step in the pipeline to see intermediate results." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "The Pipe Operator is a much-anticipated feature that promises to make functional-style programming in JavaScript cleaner, more intuitive, and more readable. By simplifying function composition, it will be a valuable tool for writing elegant and maintainable code." }] },
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

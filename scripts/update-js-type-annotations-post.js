require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Type Annotations in JavaScript: The Future of JS without a Build Step?";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Great Divide: Types vs. No Types" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For years, the JavaScript world has been split. Developers love the safety of TypeScript but often dislike the need for a build step—the compilation process that strips out types to produce standard JavaScript. A revolutionary Stage 1 proposal at TC39 aims to bridge this gap by introducing a formal syntax for type annotations that JavaScript engines would simply ignore." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How Would It Work?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The proposal suggests that the JavaScript language itself should recognize TypeScript-like syntax for types. However, unlike in TypeScript, the engine would not perform any type-checking. The types would be treated like comments, having no effect on how the code runs. This would allow developers to write typed code directly in a `.js` file and run it in a browser or Node.js without any transpilation." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// This could be a valid .js file in the future!\n// A browser would run this code without any errors.\nfunction greet(name: string) {\n  console.log('Hello, ' + name.toUpperCase());\n}\n\ngreet('world');` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Benefits: The Best of Both Worlds?" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Zero Build Step for Development: Run your typed code directly in the browser for faster development cycles." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Clearer Intent: Code becomes more self-documenting, just like with TypeScript or JSDoc." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Optional Type Checking: You could still run the TypeScript compiler (`tsc`) over your `.js` files to get the full benefits of static analysis, but it would no longer be required just to run the code." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Controversy and Challenges" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This proposal is not without debate. Critics argue that it adds syntactical weight to the language for a feature that has no runtime behavior, which goes against JavaScript's design principles. There are also significant challenges to solve, such as what to do about advanced TypeScript features like enums, namespaces, or decorators which do have a runtime footprint." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: A Glimpse into the Future" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The Type Annotations proposal is a fascinating and ambitious attempt to unify the typed and untyped JavaScript worlds. While it is still in the early stages and its future is uncertain, it represents a powerful idea: what if we could have the safety and documentation of types without the mandatory friction of a build step? For 2025 and beyond, this is one of the most important conversations happening in the JavaScript community, and it could fundamentally change how we write JavaScript for years to come." }] },
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

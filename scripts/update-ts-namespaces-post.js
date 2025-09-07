require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "TypeScript Namespaces vs. ES Modules: A Definitive Guide";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Tale of Two Modalities" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In the world of TypeScript, there are two primary ways to organize code across different files: Namespaces and ES Modules. Understanding the difference is crucial, as one is a legacy feature and the other is the modern standard. This guide will clarify the history, purpose, and best practices for both." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Namespaces: The 'Old Way' for Global Scripts" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Before ES6 standardized modules in JavaScript, TypeScript needed a way to prevent code from polluting the global scope, especially when using multiple `<script>` tags in a browser. This is what namespaces were invented for. A namespace is a TypeScript-specific feature that wraps your code in an object to avoid naming collisions." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// validation.ts\nnamespace Validation {\n  export interface StringValidator {\n    isAcceptable(s: string): boolean;\n  }\n  const lettersRegexp = /^[A-Za-z]+$/;\n  export class LettersOnlyValidator implements StringValidator {\n    isAcceptable(s: string) {\n      return lettersRegexp.test(s);\n    }\n  }\n}\n\n// To use it, you need to reference it with a special triple-slash directive if in a different file.\n/// <reference path="validation.ts" />\nconst validator = new Validation.LettersOnlyValidator();` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Key characteristics of namespaces:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "They are a TypeScript-specific feature; they don't exist in standard JavaScript." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "They create a single global object for your application (`Validation` in this case)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Dependencies between files must be managed manually with `<script>` tags or `/// <reference>` directives." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "Verdict: Avoid using namespaces for new projects. They are a legacy feature from a time before JavaScript had a proper module system." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "ES Modules: The Modern Standard" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Since the ES6/ES2015 specification, JavaScript has had a standard, file-based module system. TypeScript fully embraces this standard. In the ES module system, each file is its own module. Variables, functions, and classes are private to the file unless they are explicitly exported." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// validation.ts\nexport interface StringValidator {\n  isAcceptable(s: string): boolean;\n}\nconst lettersRegexp = /^[A-Za-z]+$/;\nexport class LettersOnlyValidator implements StringValidator {\n  isAcceptable(s: string) {\n    return lettersRegexp.test(s);\n  }\n}\n\n// main.ts\nimport { LettersOnlyValidator } from './validation';\nconst validator = new LettersOnlyValidator();` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Key characteristics of ES Modules:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "They are the official, standardized module system for JavaScript and are supported by all modern browsers and Node.js." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Each file has its own scope; nothing is global by default." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Dependencies are explicit and clear using `import` and `export` statements." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Module loaders (like the one in Next.js, Vite, or Node.js) handle loading files in the correct order." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The One Rule to Follow" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "TypeScript's documentation is very clear: ", marks: [{ type: 'bold' }] }, { type: 'text', text: "Use ES Modules. Do not use namespaces.", marks: [{ type: 'bold' }, { type: 'italic' }] }] },
        { type: 'paragraph', content: [{ type: 'text', text: "If a file contains a top-level `import` or `export` statement, it is treated as a module. If it doesn't, it's treated as a global script, and its contents are available in the global scope (which can lead to bugs). For all modern application development, every TypeScript file you write should be a module." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Embrace the Standard" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While namespaces played an important historical role in the development of TypeScript, their use case has been almost entirely superseded by the standardized, robust, and explicit nature of ES Modules. For any new project, you should exclusively use ES Modules to organize your code. This ensures your codebase is aligned with the broader JavaScript ecosystem, is easier to reason about, and is more maintainable in the long run." }] },
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "A Deep Dive into TypeScript 5.0 Decorators";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The New Era of Metaprogramming: ECMAScript Decorators" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "TypeScript 5.0 marked a major milestone by aligning its decorator implementation with the official ECMAScript (JavaScript) proposal. This is a huge deal. It means the decorators we write today are future-proof and standardized. Decorators are a powerful feature for metaprogramming, allowing us to observe, modify, or even replace class definitions, methods, and properties at design time." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To enable this modern feature, you MUST set the `experimentalDecorators` option to `false` (or remove it) and ensure your `target` is `ES2022` or newer in your `tsconfig.json`." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What Can Be Decorated?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Standard decorators can be applied to:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Class declarations" }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Methods (including static and instance)" }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Properties / Fields (including static and instance)" }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Accessors (getters/setters)" }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "Crucially, they cannot be used on parameters or local variables." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example 1: The Class Decorator" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A class decorator receives two arguments: the class constructor itself and a context object. This allows us to add new functionality to a class. Let's create a decorator that adds a `createdAt` timestamp." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// Decorator Definition\nfunction Timestamped<T extends { new (...args: any[]): {} }>(constructor: T, context: ClassDecoratorContext) {\n  return class extends constructor {\n    createdAt = new Date();\n  };\n}\n\n// Usage\n@Timestamped\nclass User {\n  name: string;\n  constructor(name: string) {\n    this.name = name;\n  }\n}\n\nconst user = new User("Alice");\nconsole.log(user);\n// console.log(user.createdAt); // Error: Property 'createdAt' does not exist on type 'User'.\n\n// We can cast to access it, showing the decorator worked:\nconsole.log((user as any).createdAt);` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Note the TypeScript error. The original type `User` is not aware of the new property. This is a key aspect of standard decorators: they don't change the type signature in TypeScript's static analysis." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example 2: The Method Decorator (Logging)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Method decorators are perfect for cross-cutting concerns like logging, validation, or timing. A method decorator wraps the original method." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// Decorator Definition\nfunction Log(originalMethod: any, context: ClassMethodDecoratorContext) {\n  const methodName = String(context.name);\n\n  function replacementMethod(this: any, ...args: any[]) {\n    console.log(\`LOG: Entering method '\${methodName}'.\`);\n    const result = originalMethod.call(this, ...args);\n    console.log(\`LOG: Exiting method '\${methodName}'.\`);\n    return result;\n  }\n\n  return replacementMethod;\n}\n\n// Usage\nclass Calculator {\n  @Log\n  add(a: number, b: number) {\n    return a + b;\n  }\n}\n\nconst calc = new Calculator();\ncalc.add(2, 3);` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This decorator intercepts the call to `add`, logs the entry and exit, and then calls the original method, preserving its behavior. This is incredibly useful for debugging and tracing." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Decorator Context Object" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `context` object is the second argument to every decorator and it's full of useful metadata. Its shape depends on what is being decorated, but it always contains:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`kind`: The type of decorated member (e.g., 'class', 'method', 'field')." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`name`: The name of the member (as a string or symbol)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`static`: A boolean indicating if the member is static." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`private`: A boolean indicating if the member is private." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`addInitializer`: A function to hook into the class initialization logic." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: A Powerful, Standardized Tool" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The alignment of TypeScript decorators with the ECMAScript standard is a massive step forward for the ecosystem. While they require a deeper understanding of JavaScript's prototypical nature and don't alter static types, they provide a clean, declarative, and powerful way to add reusable behaviors and conduct metaprogramming. They are an essential tool for any advanced TypeScript developer building frameworks, libraries, or complex applications." }] },
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

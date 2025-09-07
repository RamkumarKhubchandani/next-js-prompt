require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "JavaScript Decorators: A Practical Guide to the New Standard";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A New Era of Metaprogramming" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Decorators are a long-awaited feature that bring a powerful metaprogramming capability directly into the JavaScript language. Currently a Stage 3 proposal in TC39, they are stable and available in tools like Babel and TypeScript. Decorators provide a clean, declarative syntax for wrapping and modifying classes, methods, and fields, enabling reusable logic for logging, dependency injection, validation, and much more." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is a Decorator?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A decorator is just a function. It receives the thing it's decorating (like a class method) and a context object as arguments, and can optionally return a new value to replace the original. The `@` syntax is just syntactic sugar for applying this function." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example 1: The Method Decorator" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Method decorators are one of the most common use cases. Let's create a decorator that measures and logs the execution time of a method." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Decorator function\nfunction measure(originalMethod, context) {\n  const methodName = String(context.name);\n\n  // Return a new function that wraps the original\n  return function(...args) {\n    const start = performance.now();\n    const result = originalMethod.apply(this, args);\n    const end = performance.now();\n    console.log(\`Execution time for \${methodName}: \${end - start}ms\`);\n    return result;\n  };\n}\n\n// Applying the decorator\nclass MyClass {\n  @measure\n  longRunningTask() {\n    // Simulate a slow task\n    for (let i = 0; i < 1e7; i++) {}\n  }\n}\n\nconst instance = new MyClass();\ninstance.longRunningTask(); // Logs "Execution time for longRunningTask: ..." to the console` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example 2: The Class Decorator" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Class decorators can be used to modify a class constructor or even replace it entirely. Let's create a decorator that adds a new property to any class it's applied to." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Decorator function\nfunction withVersion(originalClass, context) {\n  // Return a new class that extends the original\n  return class extends originalClass {\n    version = '1.0.0';\n  };\n}\n\n// Applying the decorator\n@withVersion\nclass MyAppComponent {}\n\nconst app = new MyAppComponent();\nconsole.log(app.version); // '1.0.0'` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Decorator `context` Object" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The second argument to every decorator is a `context` object, which provides useful metadata about the thing being decorated. Key properties include:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`kind`: The type of decorated member (e.g., 'class', 'method', 'field')." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`name`: The name of the member." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`static`: A boolean indicating if the member is static." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`addInitializer`: A function to hook into the class instantiation logic for complex setups." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: A Powerful Future Standard" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Standardized JavaScript decorators provide a clean, powerful, and reusable way to add cross-cutting concerns and behavior to your classes. They are already a cornerstone of modern frameworks like Angular and NestJS (via TypeScript's original implementation). As the standard solidifies and gains native browser support, decorators will become an essential tool for all JavaScript developers, enabling cleaner, more declarative, and more maintainable code." }] },
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

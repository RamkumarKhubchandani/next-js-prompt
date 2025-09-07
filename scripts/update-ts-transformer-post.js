require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Creating a Custom TypeScript Transformer from Scratch";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Final Frontier: Modifying the Compiler" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A TypeScript Transformer is a function that can 'visit' and modify the Abstract Syntax Tree (AST) of your code during the compilation process. This is the most powerful form of metaprogramming available in TypeScript, allowing you to create custom language features, perform compile-time optimizations, or even build your own domain-specific language (DSL) that compiles to standard TypeScript. This is an expert-level topic that requires a deep understanding of the TypeScript compiler API." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is an Abstract Syntax Tree (AST)?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When `tsc` compiles your code, it first parses the text into a tree-like data structure called an AST. Each part of your code—a function declaration, a variable, a string literal—becomes a 'node' in this tree. A transformer is essentially a function that walks this tree and can add, remove, or replace nodes before TypeScript generates the final JavaScript output." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: A 'Hello World' Transformer" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's create a simple transformer that finds every string literal in our code and replaces it with the string 'Hello from transformer!'." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// transformer.ts\nimport * as ts from 'typescript';\n\nexport default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {\n  return (context: ts.TransformationContext) => {\n    const visitor: ts.Visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {\n      // Check if the current node is a string literal\n      if (ts.isStringLiteral(node)) {\n        // If it is, create and return a new string literal node\n        return ts.factory.createStringLiteral('Hello from transformer!');\n      }\n      // For all other nodes, continue visiting their children\n      return ts.visitEachChild(node, visitor, context);\n    };\n    return (sourceFile: ts.SourceFile) => ts.visitNode(sourceFile, visitor);\n  };\n}` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How to Use a Transformer" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Using a transformer is not as simple as a `tsconfig.json` flag. The official `tsc` compiler does not expose a public API for plugins. Therefore, you need a custom compilation script or a third-party tool that does." }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Custom Script with `ts.transpileModule`: You can use the TypeScript compiler API directly in a Node.js script to read a file, apply your transformer, and write the output." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`ttypescript`: A popular wrapper around the TypeScript compiler that allows you to add transformers via your `tsconfig.json`." }] }] },
        ]},
        { type: 'codeBlock', attrs: { language: 'json' }, content: [{ type: 'text', text: `// Example using ttypescript in tsconfig.json\n{\n  "compilerOptions": {\n    "plugins": [\n      { "transform": "./path/to/your/transformer.ts" }\n    ]\n  }\n}` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Real-World Use Cases" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While our example was simple, transformers power some of the most popular TypeScript libraries:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Styled-components / Emotion: Use transformers to extract CSS from tagged template literals into separate CSS files at compile time." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "NestJS: Uses transformers to analyze decorators and perform dependency injection." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "MobX: Can use a transformer to automatically wrap component properties for observability." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: The Ultimate Power Tool" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Writing a custom TypeScript transformer is a deeply advanced technique that gives you unparalleled control over the compilation process. It's the key to creating powerful, framework-level features and DSLs. While complex, understanding the AST and the transformer API unlocks the full metaprogramming potential of TypeScript and allows you to build truly innovative developer tools." }] },
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

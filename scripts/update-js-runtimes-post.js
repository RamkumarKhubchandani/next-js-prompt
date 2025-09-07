require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "JavaScript's New Era: A Deep Dive into Bun and Deno";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Undisputed King: Node.js" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For over a decade, Node.js has been the undisputed king of server-side JavaScript. However, a new generation of JavaScript runtimes has emerged, built from the ground up to address some of Node's perceived shortcomings. Two of the most exciting contenders are Deno and Bun. They promise better performance, improved security, and a more modern developer experience. This article dives deep into what makes them compelling alternatives." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Deno: Security and Modern Standards First" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Created by the original author of Node.js, Ryan Dahl, Deno aims to fix many of Node's early design decisions. Its core principles are:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Secure by Default:", bold: true }, { type: 'text', text: " Scripts run in a sandbox without access to the file system, network, or environment unless explicitly granted." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "First-Class TypeScript Support:", bold: true }, { type: 'text', text: " Deno can execute TypeScript code out of the box, with no configuration needed." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Web Standard APIs:", bold: true }, { type: 'text', text: " Deno uses browser-standard APIs like `fetch` and the `window` object, making it easier to share code between the front-end and back-end." }] }] }
        ]},
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// A simple Deno web server\nimport { serve } from "https://deno.land/std@0.140.0/http/server.ts";\n\nserve((_req) => new Response("Hello, Deno World!"), { port: 8000 });\n\n// To run: deno run --allow-net your-file.ts` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Bun: All-in-One and Blazing Fast" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Bun is the newer challenger, and its primary focus is speed. It's not just a runtime; it's an all-in-one toolkit that includes a bundler, a test runner, and a package manager that is significantly faster than npm. Bun is built on JavaScriptCore, the engine from WebKit, which contributes to its incredible performance." }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Performance:", bold: true }, { type: 'text', text: " Aims to be a faster drop-in replacement for Node.js, with a focus on startup time and execution speed." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "All-in-One:", bold: true }, { type: 'text', text: " Provides a complete toolchain, reducing the need for other dependencies like Jest, Webpack, or Babel." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Node.js Compatibility:", bold: true }, { type: 'text', text: " Aims for near-complete compatibility with Node's module resolution, making it easier to migrate existing projects." }] }] }
        ]},
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// A simple Bun web server\nexport default {\n  port: 3000,\n  fetch(request) {\n    return new Response("Welcome to Bun!");\n  },\n};\n\n// To run: bun run your-file.ts` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: A New Golden Age for JavaScript" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The emergence of Deno and Bun is incredibly exciting for the JavaScript ecosystem. While Node.js remains the dominant and most mature platform, Deno's focus on security and standards, and Bun's relentless pursuit of speed, are pushing the boundaries of what's possible with server-side JavaScript. Understanding the strengths of these new runtimes is essential for any developer looking to stay on the cutting edge and build truly viral, high-performance applications." }] }
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
        { $set: { content: updatedContent } },
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

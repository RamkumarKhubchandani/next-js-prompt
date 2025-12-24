require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Optimizing Your TypeScript Build Performance: A Practical Guide";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Pain of Slow Builds" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "As TypeScript projects grow, compile times can become a significant bottleneck, slowing down development cycles and CI/CD pipelines. A slow `tsc` command can kill productivity. Fortunately, the TypeScript compiler and the broader ecosystem provide several powerful strategies to dramatically speed up your builds." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Strategy 1: The `incremental` Flag" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is the easiest and most impactful change you can make. By enabling the `incremental` flag in your `tsconfig.json`, TypeScript will save information about the project graph from the last compilation into a `.tsbuildinfo` file. On subsequent runs, it will use this file to detect which files have changed and only recompile the necessary parts of your project." }] },
        { type: 'codeBlock', attrs: { language: 'json' }, content: [{ type: 'text', text: `// tsconfig.json\n{\n  "compilerOptions": {\n    "incremental": true,\n    // ... other options\n  }\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For most projects, this single flag can cut build times by 50-80% on subsequent runs." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Strategy 2: Project References for Monorepos" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "If you have a monorepo with multiple packages (e.g., a `server` and `client`), project references are essential. They allow you to split a large codebase into smaller, independent parts. TypeScript can then build these parts in parallel and use the `.tsbuildinfo` files to understand which dependent projects need to be rebuilt." }] },
        { type: 'codeBlock', attrs: { language: 'json' }, content: [{ type: 'text', text: `// tsconfig.json (root)\n{\n  "files": [],\n  "references": [\n    { "path": "./packages/client" },\n    { "path": "./packages/server" }\n  ]\n}\n\n// packages/client/tsconfig.json\n{\n  "extends": "../../tsconfig.base.json",\n  "compilerOptions": {\n    "outDir": "./dist",\n    "composite": true // Required for referenced projects\n  },\n  "references": [\n    { "path": "../shared" } // Client depends on a shared package\n  ]\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To build all projects, you run `tsc -b` (or `tsc --build`) in the root directory. This will intelligently build the dependency graph in the correct order." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Strategy 3: `skipLibCheck`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When you compile, TypeScript also type-checks all the `.d.ts` files in your `node_modules` directory. This can be surprisingly slow. If you trust that your dependencies are correctly typed (which is generally a safe assumption), you can tell TypeScript to skip this check." }] },
        { type: 'codeBlock', attrs: { language: 'json' }, content: [{ type: 'text', text: `// tsconfig.json\n{\n  "compilerOptions": {\n    "skipLibCheck": true,\n    // ... other options\n  }\n}` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Strategy 4: Use Faster Compilers" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While `tsc` is the official compiler, it's not the fastest. For projects that use a bundler like Vite or Next.js, you are likely already benefiting from a faster alternative during development. These tools often use compilers written in native languages (like Go or Rust) that are significantly faster at transpilation (the process of converting TS to JS)." }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "SWC: A Rust-based compiler used by Next.js. It's an order of magnitude faster than `tsc`." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "esbuild: A Go-based bundler and compiler used by Vite. Also incredibly fast." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "It's important to note that these tools often only perform transpilation and do not perform type checking. The standard practice is to use the fast tool for development and builds, but still run `tsc --noEmit` in your CI pipeline to ensure type safety." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: A Faster Feedback Loop" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Optimizing your TypeScript build process is a high-leverage activity that pays dividends every time you compile. By enabling `incremental` builds, using project references in monorepos, skipping library checks, and leveraging modern, faster compilers, you can dramatically reduce wait times and maintain a fast, productive development feedback loop, even in the largest of codebases." }] },
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

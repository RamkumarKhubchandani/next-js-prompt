require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "TypeScript and WebAssembly (Wasm): The Future of Web Performance";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Breaking the JavaScript Speed Barrier" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For decades, web performance has been bound by the limits of JavaScript. WebAssembly (Wasm) shatters that barrier. It's a low-level, binary instruction format—a compilation target for languages like C++, Rust, and Go—that runs in the browser at near-native speed. When you have a computationally intensive task like video editing, 3D rendering, or complex data analysis, Wasm is the answer. And TypeScript is the perfect language to safely interact with it." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How It Works: The Bridge Between Worlds" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You don't write Wasm directly. Instead, you write code in a language like Rust, compile it to a `.wasm` file, and then load that module into your JavaScript/TypeScript application. TypeScript acts as the 'glue' code, orchestrating the high-level application logic and calling into the high-performance Wasm module when it needs to do heavy lifting." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A popular and easy way to get started is using a high-level language that compiles to Wasm, like AssemblyScript (which uses TypeScript-like syntax) or by using a toolchain like `wasm-pack` for Rust." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: A High-Performance Rust Function in TypeScript" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's imagine we have a complex calculation written in Rust that we want to use in our web app. First, we'd write the Rust code:" }] },
        { type: 'codeBlock', attrs: { language: 'rust' }, content: [{ type: 'text', text: `// lib.rs (Rust)\nuse wasm_bindgen::prelude::*;\n\n// This attribute exposes the function to JavaScript.\n#[wasm_bindgen]\npub fn add(a: u32, b: u32) -> u32 {\n    a + b\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "We would then use a tool like `wasm-pack` to compile this into a `.wasm` module and generate the necessary JavaScript bindings." }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Loading and Using the Wasm Module" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Once compiled, we can import and use it in TypeScript. The generated bindings make it look just like a regular JavaScript module." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app.ts (TypeScript)\nimport init, { add } from './pkg/my_wasm_module';\n\nasync function main() {\n  // Wasm modules are asynchronous, so we must initialize them.\n  await init();\n\n  const result = add(2, 3);\n\n  console.log('Result from Wasm:', result); // 5\n}\n\nmain();` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The magic here is that the `add` function is executing the compiled Rust code directly in the browser's Wasm runtime, which is much faster than the JavaScript equivalent for complex operations. The TypeScript compiler still type-checks the interaction, ensuring that we pass the correct types (`u32` in Rust becomes `number` in TypeScript)." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Memory and Data Sharing" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A key concept is that Wasm has its own linear memory, separate from JavaScript's memory. Passing complex data like strings or objects between the two requires serialization and copying, which has a performance cost. The tools (`wasm-pack`, `wasm-bindgen`) handle this automatically, but for performance-critical applications, it's important to minimize data transfer across the JS-Wasm boundary." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: The Next Performance Frontier" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "WebAssembly is a game-changing technology that brings native-level performance to the web platform. While it won't replace JavaScript for general UI and application logic, it provides a powerful escape hatch for performance-critical tasks. TypeScript, with its strong type system, is the ideal partner for Wasm, providing a safe and productive environment to build the next generation of high-performance, browser-based applications." }] },
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

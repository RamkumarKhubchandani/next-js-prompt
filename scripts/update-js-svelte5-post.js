require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Svelte 5 and Runes: The Future of Reactivity";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Svelte's Compiler-Based Magic" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Svelte has always been different. Instead of using a Virtual DOM, it's a compiler that processes your components at build time, converting them into highly efficient, imperative JavaScript that surgically updates the DOM. Historically, this reactivity was implicit, triggered by the `let` keyword and assignments (`=`). While magical, this had limitations, especially for sharing reactive logic outside of `.svelte` files." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Introducing Runes: Explicit, Fine-Grained Reactivity" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Svelte 5 introduces 'Runes'—a new, fully opt-in system that makes reactivity explicit and more powerful. Runes are special functions, prefixed with `$`, that provide fine-grained control over your application's reactive graph. They are inspired by Signals but deeply integrated into the Svelte compiler." }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Core Runes" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: "// In a .svelte or .js file (opt-in)\n\n// `$state` creates a reactive signal.\nlet count = $state(0);\n\n// `$derived` creates a computed value that updates when its dependencies change.\nlet double = $derived(count * 2);\n\n// `$effect` runs a side effect whenever its dependencies change.\n$effect(() => {\n  console.log(`The count is ${count}, and double is ${double}`);\n});\n\nfunction increment() {\n  count += 1; // This triggers the derived value and the effect to re-run.\n}" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why is this a Big Deal?" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Reactivity Anywhere: You can now define reactive primitives in your `.js` or `.ts` files (stores), not just inside `.svelte` components. This makes sharing and organizing complex state management vastly simpler." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Fine-Grained Performance: The compiler understands the exact relationships between your state, derived values, and effects. This allows for even more surgical DOM updates than before, leading to potentially huge performance gains." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Clearer Code: Reactivity is no longer 'magic'. It's explicitly declared, making the code's data flow easier to understand and reason about." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Future of Svelte" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Runes are a major evolution for Svelte. While the classic, simple assignment-based reactivity isn't going away, Runes provide a powerful new tool for building complex, scalable, and incredibly performant applications. They combine the explicitness of Signals with the unparalleled performance of the Svelte compiler, setting a new standard for web framework reactivity." }] },
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

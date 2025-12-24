require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Signals: The Future of Reactive State Management in JavaScript";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem with Virtual DOM Diffing" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For over a decade, frameworks like React have used a Virtual DOM (VDOM) to manage UI updates. When state changes, the framework creates a new VDOM, compares it to the old one, and applies the differences to the real DOM. While revolutionary, this 'diffing' process can be inefficient for complex applications. Signals are a new paradigm that challenges this model by providing a way to update the DOM with surgical precision, without a VDOM." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What are Signals? The Core Idea" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A signal is a reactive primitive. It's an object that holds a value and keeps track of who is interested in that value. When the signal's value is updated, it automatically notifies only the specific parts of the UI that depend on it. This is 'fine-grained' reactivity." }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`createSignal()`: Creates a new signal with an initial value." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`createEffect()`: Creates a computation that re-runs whenever a signal it reads is updated." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`createMemo()`: Creates a derived, cached value from other signals." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "This is different from React's `useState`, where updating a state value causes the entire component to re-render." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Simple Example (using Solid.js syntax)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Solid.js is a pioneer of the signals-based approach. Let's look at a simple counter." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import { createSignal, createEffect } from 'solid-js';\n\nfunction Counter() {\n  // Create a signal for the count\n  const [count, setCount] = createSignal(0);\n\n  // This effect will re-run ONLY when 'count' changes\n  createEffect(() => {\n    console.log('The count is now:', count());\n  });\n\n  // When this button is clicked, only the text node for the count is updated.\n  // The console.log in the effect runs, but the component function itself does not re-run.\n  return <button onClick={() => setCount(count() + 1)}>{count()}</button>;\n}` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Rise of Signals Across the Ecosystem" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The power and performance of signals have not gone unnoticed. This pattern is rapidly being adopted across the entire JavaScript ecosystem, becoming the most significant trend in frontend development for 2025." }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Solid.js: The original pioneer of the modern signals implementation." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Angular: Introduced signals as a core reactive primitive, moving away from RxJS for component state." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Qwik: Built from the ground up on a signals-based architecture for its 'resumability' feature." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Svelte 5: The upcoming version is completely rewriting its reactivity model around 'Runes,' which are based on signals." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Preact: Has an official `@preact/signals` package that brings the pattern to the Preact and React ecosystems." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why are Signals a Game Changer?" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Performance: By avoiding VDOM diffing and making precise DOM updates, signals are often significantly faster." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Predictability: State changes are 'glitch-free.' You know exactly what will update and in what order." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Simplicity: The mental model can be simpler, as you no longer need to worry about dependency arrays (`useEffect`) or memoization (`useMemo`, `useCallback`)." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: The Next Evolution of Reactivity" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Signals represent the next major evolution in how we think about state management and reactivity in the browser. Their superior performance and ergonomic design are leading to their widespread adoption across all major frameworks. Understanding the core principles of signals is no longer optional—it's essential knowledge for any frontend developer looking to stay on the cutting edge in 2025 and beyond." }] },
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

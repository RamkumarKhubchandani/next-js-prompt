require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Advanced State Management in React with Zustand";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Unlocking Peak Performance: Beyond the Basics of Zustand" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You've learned the basics of Zustand, but to build world-famous, high-performance React applications, you need to master its advanced features. This guide dives deep into Zustand's middleware, selectors for preventing unnecessary re-renders, and persisting state to local storage. These are the techniques that separate professional React developers from the rest." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "1. Supercharging Your Store with Middleware" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Middleware in Zustand allows you to wrap your store's `set` function to add extra functionality. Let's create a logger middleware to see every state change as it happens—invaluable for debugging." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `import { create } from 'zustand';\n\nconst logMiddleware = (config) => (set, get, api) => config(\n  (...args) => {\n    console.log('  applying', args);\n    set(...args);\n    console.log('  new state', get());\n  },\n  get,\n  api\n);\n\nexport const useBoundStore = create(logMiddleware((set) => ({\n  fishes: 0,\n  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),\n})));` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "2. Precision Re-renders with Selectors" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "By default, a component re-renders whenever *any* part of the state in a store changes. For complex stores, this is inefficient. To solve this, you can provide a 'selector' function to the hook. This tells React to only re-render the component if the specific value returned by the selector has changed. This is a critical optimization technique." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import { useBearStore } from './stores/bearStore';\n\nfunction BearCounter() {\n  // This component will ONLY re-render when the 'bears' value changes.\n  const bears = useBearStore((state) => state.bears);\n  return <h1>{bears} around here ...</h1>;\n}\n\nfunction Controls() {\n  // This component will NOT re-render when 'bears' changes.\n  const increasePopulation = useBearStore((state) => state.increasePopulation);\n  return <button onClick={increasePopulation}>one up</button>;\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "3. Persisting State with `persist` Middleware" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "What if you want to save the user's data so it's there when they reopen the browser? Zustand has a powerful built-in `persist` middleware that makes this incredibly simple. It automatically saves your store's data to `localStorage`." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `import { create } from 'zustand';\nimport { persist } from 'zustand/middleware';\n\nexport const useFishStore = create(\n  persist(\n    (set) => ({\n      fishes: 0,\n      addFish: () => set((state) => ({ fishes: state.fishes + 1 })),\n    }),\n    {\n      name: 'fish-storage', // name of the item in the storage (must be unique)\n    }\n  )\n);` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Build World-Class Apps" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Mastering these advanced Zustand patterns is a superpower for React developers. By leveraging middleware for custom logic, using selectors for surgical-precision re-renders, and effortlessly persisting state, you can build applications that are not only powerful and complex but also incredibly fast and resilient. These are the techniques that will get your website noticed and drive the user engagement required to become world-famous." }] }
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

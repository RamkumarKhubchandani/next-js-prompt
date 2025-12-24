require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Introduction to Zustand: Simple State Management for React";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why Another State Management Library?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While React's built-in `useState` and `useContext` are powerful, global state management can become complex in large applications. Libraries like Redux are robust but often come with a lot of boilerplate code. Zustand is a popular, modern alternative that offers a simple, unopinionated, and scalable solution for managing your application's state with minimal boilerplate." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Setting Up Your First 'Store'" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In Zustand, you create 'stores' to hold your state. A store is a hook that you can subscribe to from any component. Let's create a simple store to manage a counter." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import { create } from 'zustand';\n\nconst useCounterStore = create((set) => ({\n  count: 0,\n  increment: () => set((state) => ({ count: state.count + 1 })),\n  decrement: () => set((state) => ({ count: state.count - 1 })),\n  reset: () => set({ count: 0 }),\n}));\n\nexport default useCounterStore;` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Using the Store in a Component" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Using the store in your components is incredibly simple. You just call the hook you created, and it returns the entire state object. You can then access the state values and the action functions directly." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import React from 'react';\nimport useCounterStore from './useCounterStore';\n\nfunction CounterComponent() {\n  const { count, increment, decrement, reset } = useCounterStore();\n\n  return (\n    <div>\n      <h1>Count: {count}</h1>\n      <button onClick={increment}>Increment</button>\n      <button onClick={decrement}>Decrement</button>\n      <button onClick={reset}>Reset</button>\n    </div>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Key Features of Zustand" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Minimal Boilerplate:", bold: true }, { type: 'text', text: " As you can see, the setup is incredibly concise." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Unopinionated:", bold: true }, { type: 'text', text: " Zustand doesn't force a specific structure on your application." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Renders Components Only on State Changes:", bold: true }, { type: 'text', text: " It's highly optimized for performance." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Zustand provides a delightful and pragmatic approach to global state management in React. Its simplicity and power make it an excellent choice for projects of all sizes, allowing you to manage complex state without the overhead of more traditional libraries. It's a trending tool that's worth adding to your skillset." }] }
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

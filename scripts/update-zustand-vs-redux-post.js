require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Zustand vs. Redux Toolkit: A Performance-Based Deep Dive (2024)";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The State of State Management: A 2024 Showdown" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Choosing a state management library is one of the most critical decisions in a React project. For years, Redux has been the heavyweight champion, but modern challengers have emerged. Redux Toolkit (RTK) modernized Redux, but Zustand offers a fundamentally simpler and more 'React-ish' approach. This deep dive will compare them on key metrics—boilerplate, API design, and performance—to help you decide which is right for your next world-famous application." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Round 1: Boilerplate and Setup" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's compare the setup for a simple store with one state variable (`count`) and one action (`increment`)." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Redux Toolkit: The `createSlice` Pattern" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// store/counterSlice.js\nimport { createSlice } from '@reduxjs/toolkit';\n\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment: (state) => { state.value += 1; },\n  },\n});\n\n// store/index.js\nimport { configureStore } from '@reduxjs/toolkit';\nimport counterReducer from './counterSlice';\n\nexport const store = configureStore({ reducer: { counter: counterReducer } });` }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Zustand: The Hook-based Model" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// store/counterStore.js\nimport { create } from 'zustand';\n\nexport const useCounterStore = create((set) => ({\n  count: 0,\n  increment: () => set((state) => ({ count: state.count + 1 })),\n}));` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Winner: Zustand. The setup is dramatically simpler, with less code and fewer files. Zustand feels more like a natural extension of React hooks, whereas RTK still requires more configuration.", bold: true }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Round 2: API Design & Component Usage" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Using Redux Toolkit in a Component" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import { useSelector, useDispatch } from 'react-redux';\n\nfunction Counter() {\n  const count = useSelector((state) => state.counter.value);\n  const dispatch = useDispatch();\n\n  return <button onClick={() => dispatch(increment())}>{count}</button>;\n}` }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Using Zustand in a Component" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import { useCounterStore } from './store/counterStore';\n\nfunction Counter() {\n  const { count, increment } = useCounterStore();\n\n  return <button onClick={increment}>{count}</button>;\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Winner: Zustand. Accessing state and actions is more direct. You don't need a separate `useDispatch` hook, and you can destructure what you need from a single hook call.", bold: true }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Round 3: Performance & Re-renders" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is the most critical comparison. Both libraries are highly performant, but they achieve it differently. RTK's `useSelector` re-runs on every state change, and you rely on memoization to prevent re-renders. Zustand's hook can take a selector function that, by default, only triggers a re-render if the *result* of the selector changes. This is a subtle but powerful difference that makes Zustand's default behavior more optimized for preventing unnecessary re-renders." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Zustand also has a smaller bundle size, which contributes to a faster initial page load—a key metric for SEO and user retention.", bold: true }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Winner: Zustand. Its selector model is arguably more efficient out of the box for complex state, and its smaller bundle size is a clear advantage.", bold: true }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Final Verdict" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For new projects in 2024, Zustand is an incredible choice. It offers better performance, less boilerplate, and a more intuitive API than Redux Toolkit. While RTK is a mature and powerful library, Zustand's modern, hook-based approach is a better fit for the current React ecosystem. To build a viral application that is both scalable and lightning-fast, Zustand provides a clear and compelling advantage." }] }
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

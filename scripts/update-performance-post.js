require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Optimizing Performance in React with useMemo and useCallback";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why is Performance Optimization Important?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "By default, React components re-render whenever their parent re-renders, even if their props haven't changed. For small applications, this is usually fine. But in large applications with complex state, these unnecessary re-renders can lead to significant performance issues. `useMemo` and `useCallback` are two hooks that help you prevent these unnecessary computations and re-renders." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Memoizing Values with `useMemo`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `useMemo` hook is used to memoize a value. 'Memoization' is a fancy word for caching a value so that it doesn't need to be recalculated. `useMemo` will only recompute the memoized value when one of the dependencies in its dependency array has changed. This is perfect for expensive calculations." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import React, { useState, useMemo } from 'react';\n\nfunction ExpensiveCalculationComponent({ number }) {\n  // This expensive calculation will only run when 'number' changes.\n  const calculatedValue = useMemo(() => {\n    console.log('Performing expensive calculation...');\n    let result = 0;\n    for (let i = 0; i < number * 1000000; i++) {\n      result += i;\n    }\n    return result;\n  }, [number]);\n\n  return (\n    <div>\n      <p>Calculated Value: {calculatedValue}</p>\n    </div>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Memoizing Functions with `useCallback`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `useCallback` hook is similar, but it's specifically for memoizing functions. Why would you need to memoize a function? Because in JavaScript, functions are objects. Every time a component re-renders, any functions defined inside it are recreated. If you pass these functions as props to child components, those child components will see them as new props and re-render unnecessarily." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "`useCallback` gives you the same function instance back between renders, as long as its dependencies haven't changed." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import React, { useState, useCallback } from 'react';\nimport ChildComponent from './ChildComponent'; // Assume ChildComponent is memoized\n\nfunction ParentComponent() {\n  const [count, setCount] = useState(0);\n\n  // This function will be the same instance unless 'count' changes.\n  const handleClick = useCallback(() => {\n    console.log('Button clicked! Count is', count);\n  }, [count]);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n      <ChildComponent onClick={handleClick} />\n    </div>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Danger of Premature Optimization" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While powerful, these hooks should be used wisely. Wrapping everything in `useMemo` and `useCallback` can actually make your application slower due to the overhead of memoization. Always measure your application's performance first (using tools like the React DevTools Profiler) and only apply these optimizations where they are truly needed." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "`useMemo` and `useCallback` are essential tools in your React performance toolkit. Use `useMemo` to avoid re-calculating expensive values and `useCallback` to prevent unnecessary re-renders of child components by providing stable function props. When used correctly, they can significantly speed up your application." }] }
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

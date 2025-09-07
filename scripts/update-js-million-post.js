require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Million.js: Supercharging React Performance with a Block VDOM";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "React's Reconciliation Problem" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "React's Virtual DOM (VDOM) is a brilliant abstraction, but its reconciliation process can be a bottleneck. On every state change, React creates a new tree, diffs it with the old one, and applies the changes. For large, frequently updating applications, this diffing can be computationally expensive. Million.js is a library that aims to solve this by introducing a 'block' VDOM." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Block VDOM: Surgical DOM Updates" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Instead of diffing the entire component tree, Million.js analyzes your components at build time. It identifies the truly dynamic parts—the variables and expressions that change—and treats them as 'blocks'. When state updates, Million doesn't re-render the whole component. It surgically updates only the specific DOM nodes that correspond to the changed blocks. This bypasses the expensive VDOM diffing for static content, leading to massive performance gains." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How to Use It: The `block()` HOC" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Using Million.js is incredibly simple. You wrap your performance-critical React components in the `block()` Higher-Order Component (HOC)." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import { block } from 'million/react';\n\n// Your original, potentially slow, React component\nfunction MyComponent({ items }) {\n  return (\n    <ul>\n      {items.map(item => (\n        <li key={item.id}>{item.text}</li>\n      ))}\n    </ul>\n  );\n}\n\n// Wrap it with block() to optimize it\nconst MyOptimizedComponent = block(MyComponent);\n\n// That's it! Render MyOptimizedComponent as you normally would.` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "When Should You Use Million.js?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Million.js is not for every component. It shines in components that have a lot of static content but small, frequent dynamic updates. Think of:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Large lists or tables where only a few values in the cells change." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Real-time dashboards with ticking numbers or status indicators." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Components that are known to be re-rendering bottlenecks in your application." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Million.js is a powerful tool for surgical performance optimization in React. By moving away from a full VDOM diff to a fine-grained, block-based update system, it can make slow components up to 70% faster with minimal code changes. While `React.memo` and other hooks are still valuable, Million.js offers a compelling, almost-automatic way to get near-native performance in targeted areas of your React applications." }] },
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

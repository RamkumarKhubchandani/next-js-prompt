require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Understanding the React Virtual DOM";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is the DOM?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "First, let's quickly recap the regular DOM (Document Object Model). The DOM is a tree-like structure that represents the HTML of a web page. When you want to change something on the page, you have to manipulate this DOM tree. However, direct DOM manipulation is slow and can be a major performance bottleneck." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Enter the Virtual DOM (VDOM)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "React uses a clever abstraction called the Virtual DOM to improve performance. The VDOM is a lightweight copy of the real DOM, kept in memory. It's a JavaScript object that represents the UI. When you update the state of a component, React doesn't immediately touch the real DOM. Instead, it creates a new VDOM tree." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Magic of Reconciliation and Diffing" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is where the performance gain happens. React now has two versions of the VDOM: the one from before the state change, and the new one. It then runs a highly efficient 'diffing' algorithm to compare these two trees and find the exact differences." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Once React knows what has changed, it moves to the 'reconciliation' step. It calculates the most efficient way to update the real DOM to match the new VDOM, and then it performs these updates in a single batch. By minimizing and batching the updates to the slow, real DOM, React makes your application feel incredibly fast and responsive." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Simple Analogy" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Imagine you have a large blueprint of a house (the real DOM). Instead of erasing and redrawing parts of the main blueprint every time you want to make a change, you first sketch your changes on a separate piece of tracing paper (the VDOM). Then, you compare your sketch to the main blueprint to see exactly what's different. Finally, you make only those specific changes to the main blueprint. This is much faster than redoing the entire blueprint for every small change." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The Virtual DOM is one of React's most important and powerful concepts. It's the secret sauce that makes React so performant. By abstracting away direct DOM manipulation, it allows you, the developer, to focus on describing your UI in a declarative way, while React handles the complex and expensive job of updating the browser's DOM efficiently." }] }
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

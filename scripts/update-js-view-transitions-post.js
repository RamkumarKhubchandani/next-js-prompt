require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "A Practical Guide to the View Transitions API for Seamless SPAs";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Jarring UX of Single-Page Apps" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Single-Page Applications (SPAs) are fast, but the instantaneous DOM updates can be jarring. Content pops in and out of existence, giving the user no spatial sense of how pages or states relate to each other. The View Transitions API is a new browser standard designed to solve this by making it trivial to animate the transition between two DOM states, creating a seamless, app-like experience." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How It Works: A Simple Transition" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The core of the API is the `document.startViewTransition` function. You wrap your DOM update logic inside it, and the browser handles the rest:" }] },
        { type: 'orderedList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "The browser takes a screenshot of the current state (the 'old' view)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "You then make your DOM changes (e.g., show a new component, hide an old one)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "The browser takes a screenshot of the new state (the 'new' view)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "It then creates a default cross-fade animation between the old and new views." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Code Example: A Basic Fade" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Assume we have a button that triggers a content change\ndocument.getElementById('myButton').addEventListener('click', () => {\n  // 1. Check for browser support\n  if (!document.startViewTransition) {\n    updateTheDOM();\n    return;\n  }\n\n  // 2. Start the transition\n  document.startViewTransition(() => {\n    // 3. Update the DOM inside the callback\n    updateTheDOM(); \n  });\n});\n\nfunction updateTheDOM() {\n  document.querySelector('.content').textContent = 'This is the new content!';\n}` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Advanced: Morphing Elements with `view-transition-name`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The real magic happens when you assign a unique `view-transition-name` CSS property to an element that exists in both the old and new DOM states. The browser will then seamlessly 'morph' that element from its old position and size to its new one, instead of cross-fading it. This is perfect for creating slick thumbnail-to-hero image transitions." }] },
        { type: 'codeBlock', attrs: { language: 'css' }, content: [{ type: 'text', text: `/* In your CSS */\n.thumbnail-image, .hero-image {\n  view-transition-name: product-image;\n  contain: layout;\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, when you transition between a view with `.thumbnail-image` and a view with `.hero-image`, the browser will automatically create a smooth animation between them as long as they share the same `view-transition-name`." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The View Transitions API is a game-changer for SPA user experience. It brings the polished feel of native applications to the web with a remarkably simple and powerful API. As it becomes standard across all browsers, it will be an essential tool for any frontend developer looking to build high-quality, modern user interfaces." }] },
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

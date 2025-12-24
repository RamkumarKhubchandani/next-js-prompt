require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Astro: Building Content-Rich, Performant Websites in 2025";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem with JavaScript-Heavy Frameworks" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Modern frontend frameworks like React, Vue, and Svelte have enabled incredible interactivity, but often at a cost. They can send large amounts of JavaScript to the browser, which must be downloaded, parsed, and executed before the page becomes interactive. For content-focused websites like blogs, marketing sites, and portfolios, this is often overkill and harms performance. Astro is a web framework built to solve this problem." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Astro's Core Philosophy: Islands Architecture" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Astro's key innovation is 'Islands Architecture.' By default, Astro renders your entire site to static HTML, shipping zero client-side JavaScript. This makes sites incredibly fast to load. Interactivity is added back in opt-in 'islands'—small, isolated components that are hydrated on the client. This gives you the best of both worlds: the performance of a static site generator and the dynamic capabilities of a modern SPA." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Bring Your Own Framework (BYOF)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Astro isn't a new UI framework. Instead, it allows you to use your favorite components from React, Vue, Svelte, and more, all within the same project. You write your interactive components as you always have, and Astro handles turning them into islands." }] },
        { type: 'codeBlock', attrs: { language: 'html' }, content: [{ type: 'text', text: `--- \n// src/pages/index.astro\n// Astro components use a 'code fence' for server-side JavaScript\nimport MyReactComponent from '../components/MyReactComponent.jsx';\nimport MySvelteComponent from '../components/MySvelteComponent.svelte';\n---\n<html lang="en">\n<head>\n  <title>My Astro Site</title>\n</head>\n<body>\n  <h1>Welcome!</h1>\n  <p>This is a static paragraph rendered on the server.</p>\n\n  {/* This interactive React component will be hydrated on the client */}\n  <MyReactComponent client:load />\n\n  {/* This Svelte component will only become interactive when it's visible */}\n  <MySvelteComponent client:visible />\n</body>\n</html>` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Client Directives: Fine-Grained Hydration" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `client:*` directives give you precise control over when and how your components become interactive:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`client:load`: Hydrates the component as soon as the page loads." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`client:idle`: Waits for the main thread to be free before hydrating." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`client:visible`: Hydrates the component only when it enters the viewport. Perfect for components further down the page." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`client:media` Hydrates based on a CSS media query." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`client:only` Renders the component only on the client, skipping SSR." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "Astro is a game-changer for content-driven websites in 2025. By defaulting to zero JavaScript and providing powerful tools for adding interactivity precisely where it's needed, it delivers unbeatable performance without sacrificing the developer experience of modern component-based frameworks." }] },
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

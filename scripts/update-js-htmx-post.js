require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "The Rise of HTMX: Is it the Future of the Frontend?";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Backlash Against Complexity" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For the last decade, the frontend world has been dominated by complex Single-Page Application (SPA) frameworks like React, Angular, and Vue. These frameworks require large JavaScript bundles, complex state management, and often blur the lines between client and server. HTMX is a small, viral library that represents a powerful counter-movement. It asks a simple question: what if we could get modern, dynamic user experiences without writing complex JavaScript, by embracing the original architecture of the web—hypermedia?" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Core Philosophy: HTML Over the Wire" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "HTMX allows any HTML element to make an HTTP request, and then swap the response (which is just HTML) into the DOM. That's it. There's no JSON, no VDOM, no client-side routing, and no complex state management. You write your logic on the server using any backend language (Node.js, Python, Go, etc.), and your server responds with snippets of HTML. This dramatically simplifies the frontend, making it faster to build and easier to maintain." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Simple Example: Click to Load" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's see how simple it is to load data from the server when a button is clicked." }] },
        { type: 'codeBlock', attrs: { language: 'html' }, content: [{ type: 'text', text: `<!-- index.html -->\n<div id="target-div"></div>\n<button \n  hx-get="/api/data" \n  hx-target="#target-div" \n  hx-swap="outerHTML"\n>\n  Load Data\n</button>` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When the button is clicked:" }] },
        { type: 'orderedList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`hx-get`: It makes a GET request to `/api/data`." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`hx-target`: It targets the element with the ID `target-div`." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`hx-swap`: It replaces the entire target element (`outerHTML`) with the HTML response from the server." }] }] },
        ]},
        { type: 'codeBlock', attrs: { language: 'html' }, content: [{ type: 'text', text: `<!-- Server response from /api/data -->\n<div id="target-div">\n  <p>Here is your server-rendered data!</p>\n</div>` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The result is a dynamic update to the page, achieved with zero lines of custom JavaScript." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Where Does HTMX Fit in 2025?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "HTMX is not a replacement for everything. For highly stateful, offline-first applications with complex client-side interactions (like Figma or Google Docs), a full SPA framework is still the right choice. However, a huge percentage of web applications are content-driven sites, dashboards, and forms. For these use cases, HTMX offers a compelling alternative that can lead to:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Faster development cycles." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Smaller JavaScript bundles and faster initial page loads." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Simpler codebases that are easier for backend developers to understand." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: A Breath of Fresh Air" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The viral popularity of HTMX is a clear sign that the JavaScript community is re-evaluating the costs of client-side complexity. By embracing the simplicity and power of hypermedia, HTMX provides a powerful, productive, and genuinely fun way to build modern web applications. While it may not be the future for every project, it's a vital and growing part of the 2025 frontend ecosystem that every developer should understand." }] },
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

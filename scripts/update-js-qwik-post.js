require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Qwik: The Resumable Framework for Instant-Loading Web Apps";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem of Hydration" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Server-Side Rendered (SSR) applications send HTML to the browser for a fast initial paint, but this HTML is not interactive. The framework's JavaScript must then download and execute to make the page interactive—a process called 'hydration'. On slow devices or networks, this can lead to a long 'uncanny valley' where the page looks ready but doesn't respond to user input. Qwik is a groundbreaking framework designed to eliminate hydration entirely." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Qwik's Solution: Resumability" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Instead of re-executing all the application logic on the client to recreate the component tree, Qwik pauses execution on the server and resumes it on the client only when necessary. It does this by serializing the entire application state, including component relationships and event listeners, into the HTML itself. The browser downloads tiny, granular chunks of JavaScript only when the user interacts with a specific part of the page." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Dollar Sign `$`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `$` is the key to Qwik's magic. It's a marker for the Qwik optimizer to extract a chunk of code into its own lazy-loadable file. This is most commonly seen with event handlers." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: "import { component$, useSignal } from '@builder.io/qwik';\n\nexport const Counter = component$(() => {\n  const count = useSignal(0);\n\n  return (\n    <div>\n      <p>Count: {count.value}</p>\n      {/* \n        The `$` tells Qwik to extract this onClick handler \n        into its own tiny JS file. That file will only be\n        downloaded when the user actually clicks the button.\n      */}\n      <button onClick$={() => count.value++}>Increment</button>\n    </div>\n  );\n});" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Benefits of Resumability" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Instant Interactivity: Qwik apps are interactive almost instantly, regardless of their size or complexity, achieving a perfect Lighthouse score by default." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Scalability: The amount of JavaScript that needs to be downloaded on startup is constant—it's O(1). It doesn't grow as your application adds more features." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Progressive Loading: Code is only downloaded as the user explores the application, ensuring the most efficient use of network resources." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "Qwik challenges the fundamental assumptions of how web frameworks should work. By replacing the costly process of hydration with the elegant concept of resumability, it offers a path to building complex, large-scale web applications that are incredibly fast by default. For performance-critical projects, Qwik is a technology to watch closely in 2025." }] },
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

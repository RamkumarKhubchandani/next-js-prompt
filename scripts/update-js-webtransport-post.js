require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "WebSockets vs. WebTransport: Real-Time Communication in 2025";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Limitations of WebSockets" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "WebSockets have been the king of real-time web communication for years. They provide a persistent, bidirectional connection over a single TCP connection. However, WebSockets are built on HTTP/1.1 and have a key limitation: they are ordered and reliable. If one message is lost, all subsequent messages are blocked until it's retransmitted (head-of-line blocking). This is great for a chat app, but terrible for real-time games or live video streaming where receiving the latest data is more important than receiving every single piece of old data." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Enter WebTransport: The Modern Successor" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "WebTransport is a new, modern API built on top of the HTTP/3 protocol. It's designed to be the true successor to WebSockets, offering multiple communication patterns to fit different use cases." }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Multiple Streams: WebTransport can open multiple independent streams over a single connection. Head-of-line blocking on one stream does not affect the others." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Unreliable Datagrams: It supports `Datagrams`, which are 'fire-and-forget' messages. They are not guaranteed to arrive and can arrive out of order. This is perfect for sending frequent state updates in a game, where the latest packet is the only one that matters." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Reliable Streams: It also supports reliable, ordered streams, just like WebSockets, for when you need to guarantee delivery (like a chat message)." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Simple Example: Connecting to a WebTransport Server" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `async function connect() {\n  try {\n    // The URL must be an HTTP/3 server endpoint\n    const transport = new WebTransport('https://my-server.com/transport');\n    await transport.ready;\n    console.log('WebTransport connection established!');\n\n    // Example: Writing to an unreliable datagram stream\n    const writer = transport.datagrams.writable.getWriter();\n    const data = new Uint8Array([65, 66, 67]); // 'ABC'\n    writer.write(data);\n\n    // Example: Reading from a reliable bidirectional stream\n    const stream = await transport.createBidirectionalStream();\n    const streamWriter = stream.writable.getWriter();\n    const streamReader = stream.readable.getReader();\n\n  } catch (e) {\n    console.error('Failed to connect to WebTransport server:', e);\n  }\n}` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "When to Use WebTransport in 2025" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While WebSockets will still be fine for many simple applications, WebTransport is the clear choice for:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Real-time multiplayer games." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Live video and audio streaming." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Collaborative applications with multiple streams of data (e.g., cursors, chat, and document updates)." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: The Next Generation of Real-Time" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "WebTransport is a significant leap forward for real-time communication on the web. By providing a flexible, multi-stream, and multi-paradigm API over the modern HTTP/3 protocol, it solves the core limitations of WebSockets. As browser and server support continues to solidify in 2025, WebTransport will become the go-to standard for building the next generation of low-latency, high-performance, real-time web applications." }] },
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Introduction to WebSockets in Node.js with `ws`";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Beyond Request-Response: Real-Time Communication" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Traditional HTTP is a request-response protocol. The client sends a request, and the server sends a response. This is great for many things, but it's not efficient for real-time applications like chat apps, live notifications, or online gaming. WebSockets solve this by creating a persistent, two-way communication channel between the client and server. Either the client or the server can send a message at any time, allowing for true real-time data transfer." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Setting Up a WebSocket Server with `ws`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `ws` library is a popular, easy-to-use WebSocket implementation for Node.js. Let's build a simple server that broadcasts any message it receives to all connected clients." }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: `# Install the ws library\nnpm install ws` }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// server.js\nconst { WebSocketServer } = require('ws');\n\nconst wss = new WebSocketServer({ port: 8080 });\n\nconsole.log('WebSocket server started on port 8080');\n\nwss.on('connection', ws => {\n  console.log('New client connected!');\n\n  ws.on('message', data => {\n    console.log(\`Client has sent us: \${data}\`);\n    // Broadcast the message to all clients\n    wss.clients.forEach(client => {\n      if (client.readyState === ws.OPEN) {\n        client.send(String(data));\n      }\n    });\n  });\n\n  ws.on('close', () => {\n    console.log('Client has disconnected!');\n  });\n});` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Creating a Simple Client" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You can create a simple client in a browser's developer console to test your server." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Run this in your browser's console\nconst ws = new WebSocket('ws://localhost:8080');\n\nws.onopen = () => {\n  console.log('Connected to the server!');\n  ws.send('Hello Server!');\n};\n\nws.onmessage = event => {\n  console.log(\`Received from server: \${event.data}\`);\n};` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "If you open two browser tabs and run this code, you'll see that a message sent from one client is immediately received by the other. You've built a simple chat application!" }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "WebSockets open up a new world of possibilities for building interactive, real-time web applications. The `ws` library in Node.js provides a straightforward and powerful way to create WebSocket servers, enabling you to build everything from live dashboards and notifications to multi-user collaboration tools and online games. Understanding this technology is a key skill for any developer looking to build modern, dynamic web experiences." }] }
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

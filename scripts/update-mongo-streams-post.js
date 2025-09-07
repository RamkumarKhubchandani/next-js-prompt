require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Real-time Data with MongoDB Change Streams";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Powering Real-Time Experiences" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "How do you build an application that reflects database changes instantly, without the user needing to refresh the page? The answer is MongoDB Change Streams. A Change Stream is a powerful feature that allows your application to listen for data changes in real time on a collection, a database, or an entire deployment. This opens the door to building highly reactive applications like live dashboards, collaborative tools, and instant notification systems." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How Do Change Streams Work?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Change Streams work by tapping into the MongoDB 'oplog' (operations log), which is a special collection that keeps a rolling record of all data-modifying operations. By watching this log, your application can receive a stream of events for every insert, update, and delete that occurs. (Note: To use Change Streams, you must be using a MongoDB replica set or a sharded cluster)." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: Watching a Collection for Changes" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's set up a simple Node.js script to watch an `inventory` collection for any changes. We'll use the official MongoDB Node.js driver." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const { MongoClient } = require('mongodb');\n\nasync function run() {\n  const uri = process.env.MONGODB_URI;\n  const client = new MongoClient(uri);\n\n  try {\n    await client.connect();\n    const database = client.db('test');\n    const collection = database.collection('inventory');\n\n    // Define the change stream\n    const changeStream = collection.watch();\n\n    console.log('Watching for changes on the inventory collection...');\n\n    // Start listening for changes\n    for await (const change of changeStream) {\n      console.log('Change detected:', change);\n      // Here you could, for example, push this update to clients via a WebSocket\n    }\n  } finally {\n    await client.close();\n  }\n}\nrun().catch(console.dir);` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Integrating with WebSockets for a Live App" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The real power of Change Streams is realized when you combine them with a technology like WebSockets. In the `for await` loop of our example, instead of just logging the change, you would broadcast that change event over a WebSocket connection to all connected front-end clients. This allows you to update your UI in real time, reflecting the database changes as they happen." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Build Truly Reactive Systems" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "MongoDB Change Streams are a premium feature for building sophisticated, event-driven architectures. They provide a scalable and efficient way to react to data changes in real time, directly from the database layer. By mastering Change Streams, you can build the kind of dynamic, live-updating applications that will capture user attention and help your website become world-famous." }] }
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

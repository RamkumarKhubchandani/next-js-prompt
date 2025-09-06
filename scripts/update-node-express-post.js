require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Creating a Simple Express.js Server";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is Node.js and Express?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Node.js is a JavaScript runtime that allows you to run JavaScript on the server. Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's the most popular framework for building backends with Node.js, making it an essential skill for any JavaScript developer." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Setting Up Your Project" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "First, you'll need to initialize a new Node.js project and install Express." }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: `# Create a new directory and navigate into it\nmkdir my-express-server\ncd my-express-server\n\n# Initialize a new Node.js project\nnpm init -y\n\n# Install Express\nnpm install express` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Writing Your First Server" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Creating a basic server in Express is incredibly simple. You need to require the `express` module, create an `app` instance, define a route, and tell the app to listen on a specific port." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// server.js\nconst express = require('express');\nconst app = express();\nconst port = 3000;\n\n// Define a simple route\n// app.get(PATH, HANDLER)\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\n// Start the server and listen for connections\napp.listen(port, () => {\n  console.log(\`Example app listening at http://localhost:\${port}\`);\n});` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Running Your Server" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To run your server, simply execute the file using Node from your terminal:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: `node server.js` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, if you open your web browser and navigate to `http://localhost:3000`, you will see the message 'Hello World!'." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Understanding the Code" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`require('express')`:", bold: true }, { type: 'text', text: " Imports the Express library." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`app = express()`:", bold: true }, { type: 'text', text: " Creates an instance of an Express application." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`app.get(...)`:", bold: true }, { type: 'text', text: " Defines a route handler for GET requests to the root URL (`/`)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`req` and `res`:", bold: true }, { type: 'text', text: " These are the request and response objects. `req` contains information about the incoming request, and `res` is used to send a response back to the client." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`app.listen(...)`:", bold: true }, { type: 'text', text: " Binds and listens for connections on the specified host and port." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You've just created a fully functional web server in just a few lines of code! This is the foundation of building any backend application with Node.js and Express. From here, you can expand your server to handle different routes, connect to a database, and build powerful RESTful APIs." }] }
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

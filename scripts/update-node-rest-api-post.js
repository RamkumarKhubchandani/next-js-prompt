require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Building a RESTful API with Node.js and Express";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is a RESTful API?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A RESTful API (Representational State Transfer) is an architectural style for designing networked applications. It's the most common way to build APIs for web services. A RESTful API uses standard HTTP methods (GET, POST, PUT, DELETE) to perform CRUD (Create, Read, Update, Delete) operations on resources, which are identified by URLs. This premium tutorial will guide you through building a simple but complete RESTful API for managing a collection of 'tasks'." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Project Structure" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A good project structure is key for a maintainable API. We'll use a simple structure:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: `/api\n  /routes\n    - tasks.js    # Route definitions for tasks\n  /controllers\n    - taskController.js # Logic for handling requests\n  - server.js       # Main server file` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Step 1: The Controller (Logic)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The controller contains the core logic for each route. It handles the request, interacts with the database (we'll simulate this with an in-memory array for simplicity), and sends the response." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// controllers/taskController.js\nlet tasks = [{ id: 1, title: 'Learn Node.js' }];\n\nexports.getAllTasks = (req, res) => res.json(tasks);\nexports.createTask = (req, res) => { /* ...logic to add task */ };\nexports.getTaskById = (req, res) => { /* ...logic to get a single task */ };\nexports.updateTask = (req, res) => { /* ...logic to update a task */ };\nexports.deleteTask = (req, res) => { /* ...logic to delete a task */ };` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Step 2: The Router (Routes)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The router maps the incoming URLs and HTTP methods to the correct controller functions. Using `express.Router` helps keep our routes modular." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// routes/tasks.js\nconst express = require('express');\nconst router = express.Router();\nconst taskController = require('../controllers/taskController');\n\nrouter.get('/', taskController.getAllTasks);\nrouter.post('/', taskController.createTask);\nrouter.get('/:id', taskController.getTaskById);\nrouter.put('/:id', taskController.updateTask);\nrouter.delete('/:id', taskController.deleteTask);\n\nmodule.exports = router;` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Step 3: The Main Server File" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Finally, the main `server.js` file ties everything together. It initializes Express, sets up middleware (like `express.json()` to parse request bodies), and mounts our task router." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// server.js\nconst express = require('express');\nconst app = express();\nconst taskRoutes = require('./routes/tasks');\n\n// Middleware\napp.use(express.json());\n\n// Mount the router\napp.use('/tasks', taskRoutes);\n\nconst PORT = 3000;\napp.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Testing Your API" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You can now test your API using a tool like Postman or `curl`:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`GET /tasks`:", bold: true }, { type: 'text', text: " Fetches all tasks." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`POST /tasks`:", bold: true }, { type: 'text', text: " Creates a new task." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`PUT /tasks/1`:", bold: true }, { type: 'text', text: " Updates the task with ID 1." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`DELETE /tasks/1`:", bold: true }, { type: 'text', text: " Deletes the task with ID 1." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Building a RESTful API is a core skill for any backend developer. By using Express.js and separating your concerns into routes and controllers, you can create a clean, modular, and scalable API architecture. This example provides a solid foundation that you can expand upon by adding a real database, user authentication, and more complex business logic." }] }
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

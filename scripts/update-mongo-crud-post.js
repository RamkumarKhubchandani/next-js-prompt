require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "CRUD Operations in MongoDB: A Practical Guide";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Four Fundamental Operations" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "CRUD stands for Create, Read, Update, and Delete. These are the four basic operations that you will perform when working with any database. This guide will walk you through how to perform each of these operations on a `users` collection using the MongoDB Shell (`mongosh`)." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "1. Create: Inserting Documents" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To add new documents to a collection, you can use the `insertOne()` or `insertMany()` methods." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Insert a single document\ndb.users.insertOne({\n  name: "Alice",\n  age: 28,\n  email: "alice@example.com"\n});\n\n// Insert multiple documents\ndb.users.insertMany([\n  { name: "Bob", age: 35, email: "bob@example.com" },\n  { name: "Charlie", age: 22, email: "charlie@example.com" }\n]);` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "2. Read: Querying for Documents" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To find documents in a collection, you use the `find()` and `findOne()` methods. You can pass a query object to filter the results." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Find all documents in the collection\ndb.users.find();\n\n// Find a single document that matches a filter\ndb.users.findOne({ name: "Alice" });\n\n// Find all documents where the age is greater than 25\ndb.users.find({ age: { $gt: 25 } });` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `{ $gt: 25 }` is an example of a query operator, which gives you powerful ways to filter your data." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "3. Update: Modifying Documents" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To modify existing documents, you use the `updateOne()` or `updateMany()` methods. These methods take a filter to select the documents to update and an update document that specifies the changes." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Update a single document\ndb.users.updateOne(\n  { name: "Alice" }, // Filter\n  { $set: { age: 29 } } // Update operator\n);\n\n// Update multiple documents (e.g., add a new field)\ndb.users.updateMany(\n  { age: { $gt: 20 } }, // Filter\n  { $set: { status: "active" } } // Update operator\n);` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "4. Delete: Removing Documents" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To remove documents from a collection, you use the `deleteOne()` or `deleteMany()` methods, which also take a filter object." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Delete a single document\ndb.users.deleteOne({ name: "Charlie" });\n\n// Delete all documents where the age is greater than 30\ndb.users.deleteMany({ age: { $gt: 30 } });` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Mastering these four CRUD operations is the foundation of working with MongoDB. With `insert`, `find`, `update`, and `delete`, you have all the tools you need to build and manage the data for your applications. The real power of MongoDB is unlocked when you combine these basic operations with its rich query language and operators." }] }
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

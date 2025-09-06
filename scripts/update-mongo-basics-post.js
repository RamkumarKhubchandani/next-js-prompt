require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Introduction to NoSQL and MongoDB: The Basics";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "From SQL to NoSQL: A Paradigm Shift" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For decades, relational databases (like MySQL and PostgreSQL), which store data in structured tables with rows and columns, were the standard. This is the SQL world. NoSQL ('Not Only SQL') represents a different approach. NoSQL databases are non-tabular and store data in various flexible formats. They are known for their scalability, performance, and flexibility, making them a popular choice for modern, large-scale applications." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is MongoDB?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "MongoDB is the most popular NoSQL database. It's a 'document-oriented' database, which means it stores data in flexible, JSON-like documents. This format maps directly to objects in your application code, making it incredibly intuitive and fast to work with." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Core Concepts in MongoDB" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Database:", bold: true }, { type: 'text', text: " The top-level container for your data." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Collection:", bold: true }, { type: 'text', text: " A group of MongoDB documents. A collection is the equivalent of a table in a relational database." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Document:", bold: true }, { type: 'text', text: " A set of key-value pairs, stored in a format called BSON (Binary JSON). Documents are the basic unit of data in MongoDB and are equivalent to a row in a relational database." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "An Example Document" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Here's what a document for a user might look like in a `users` collection:" }] },
        { type: 'codeBlock', attrs: { language: 'json' }, content: [{ type: 'text', text: `{\n  "_id": "60c72b2f5f1b2c001f6e4d2a",\n  "name": "John Doe",\n  "email": "john.doe@example.com",\n  "age": 30,\n  "address": {\n    "street": "123 Main St",\n    "city": "Anytown"\n  },\n  "hobbies": ["reading", "hiking", "coding"]\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Key Advantages of MongoDB" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Flexible Schema:", bold: true }, { type: 'text', text: " Documents in the same collection don't need to have the same set of fields. This makes it easy to evolve your data model over time." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Scalability:", bold: true }, { type: 'text', text: " MongoDB is designed to scale out horizontally using a technique called 'sharding'." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Rich Query Language:", bold: true }, { type: 'text', text: " MongoDB provides a powerful query language for filtering and analyzing your data." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "MongoDB offers a flexible, scalable, and powerful alternative to traditional relational databases. Its document-based model is a natural fit for many modern applications, especially those built with JavaScript. Understanding these basic concepts is the first step towards leveraging the full power of MongoDB in your own projects." }] }
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

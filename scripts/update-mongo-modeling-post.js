require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Data Modeling in MongoDB: Documents, Collections, and Relationships";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Thinking in Documents" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Data modeling in MongoDB is different from relational databases. Instead of normalizing data into multiple tables, MongoDB's document model encourages you to embed related data within a single document. This 'denormalized' approach can lead to faster queries, as you often don't need to perform complex joins to retrieve your data. The key is to structure your data based on how your application will actually use it." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Method 1: Embedding (One-to-One and One-to-Few)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Embedding is the practice of nesting related documents inside another document. This is the ideal approach for 'one-to-one' relationships (like a user and their profile) or 'one-to-few' relationships (like a blog post and its comments)." }] },
        { type: 'codeBlock', attrs: { language: 'json' }, content: [{ type: 'text', text: `// A blog post document with embedded comments\n{\n  "_id": "post1",\n  "title": "My First Post",\n  "content": "...",\n  "comments": [\n    { "author": "Alice", "text": "Great post!" },\n    { "author": "Bob", "text": "Thanks for sharing." }\n  ]\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Benefit: You can retrieve a post and all its comments in a single database query." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Method 2: Referencing (One-to-Many and Many-to-Many)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When embedding would lead to very large or constantly growing documents, or for 'one-to-many' relationships (like a product and all its orders), it's better to use referencing. With referencing (or linking), you store the `_id` of one document inside another. This is similar to a foreign key in a relational database." }] },
        { type: 'codeBlock', attrs: { language: 'json' }, content: [{ type: 'text', text: `// Product document\n{\n  "_id": "product123",\n  "name": "Laptop"\n}\n\n// Order documents referencing the product\n{\n  "_id": "order1",\n  "productId": "product123", // Reference to the product\n  "quantity": 1\n}\n{\n  "_id": "order2",\n  "productId": "product123", // Reference to the product\n  "quantity": 2\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Benefit: Keeps individual documents smaller and avoids duplication of data." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Choosing the Right Approach" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The golden rule is to prioritize the structure that best suits your application's query patterns." }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Favor Embedding", bold: true }, { type: 'text', text: " unless there is a compelling reason not to. It generally provides better performance for read operations." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Favor Referencing", bold: true }, { type: 'text', text: " when the relationship is 'one-to-many' or 'many-to-many', when the referenced data is large, or when the data needs to be accessed independently." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Effective data modeling in MongoDB is about finding the right balance between embedding and referencing. Unlike the rigid schemas of SQL databases, MongoDB's flexible model allows you to design a schema that is highly optimized for your specific application's needs. By understanding these two primary techniques, you can build data models that are both performant and scalable." }] }
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Indexing and Performance in MongoDB";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Need for Speed: Why Indexes Matter" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When your MongoDB collection is small, queries are fast. But as it grows to thousands or millions of documents, finding the data you need can become slow. Without an index, MongoDB has to perform a 'collection scan', meaning it looks at every single document to find the ones that match your query. An index is a special data structure that stores a small portion of the collection's data in an easy-to-traverse form. This allows MongoDB to find documents much more efficiently, dramatically improving query performance." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Creating a Single-Field Index" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The most common type of index is on a single field. Let's say you frequently query your `users` collection by email. You can create an index on the `email` field." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Creates an ascending index on the 'email' field\ndb.users.createIndex({ email: 1 });` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `1` specifies that the index should be sorted in ascending order. For a single-field index, the sort order doesn't matter as much, but it's crucial for compound indexes." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Compound Indexes" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You can also create indexes on multiple fields. These are called compound indexes. The order of fields in a compound index is very important. For example, if you often query for users by `age` and then sort by `name`, you would create the index in that order." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Creates a compound index on 'age' (ascending) and 'name' (ascending)\ndb.users.createIndex({ age: 1, name: 1 });` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This index can support queries that filter on `age` and also queries that filter on both `age` and `name`." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How to Analyze Query Performance with `explain()`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "How do you know if your query is using an index? MongoDB provides the powerful `explain()` method. You can append it to any `find()` query to see detailed information about how MongoDB executed the query." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `db.users.find({ email: "user@example.com" }).explain("executionStats");` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In the output, you can look for the `winningPlan.stage`. If it's `IXSCAN` (Index Scan), your query used an index. If it's `COLLSCAN` (Collection Scan), it did not, and you may need to add an index to improve performance." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Trade-Offs of Indexing" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While indexes speed up read operations, they are not free. Each index you add consumes storage space and adds a small amount of overhead to write operations (inserts, updates, deletes), as the index also needs to be updated. Therefore, you should only create indexes for the queries your application actually runs." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Indexing is arguably the most important topic for ensuring high performance in MongoDB. By analyzing your application's query patterns and creating the right indexes, you can ensure that your database remains fast and responsive, even as your data grows to a massive scale. Using the `explain()` method is a critical skill for identifying slow queries and verifying that your indexes are being used effectively." }] }
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

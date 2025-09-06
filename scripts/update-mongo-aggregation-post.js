require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "MongoDB Aggregation Framework: An Introduction";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Going Beyond Simple Queries" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While `find()` queries are great for retrieving documents, you often need to perform more complex analysis. The MongoDB Aggregation Framework is a powerful tool for processing data. It works like a pipeline, where documents pass through a series of 'stages'. Each stage transforms the documents in some way (e.g., filtering, grouping, calculating values), and the output of one stage becomes the input for the next." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Core Concepts: Stages and Operators" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "An aggregation pipeline is an array of stages. Here are some of the most common stages:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`$match`:", bold: true }, { type: 'text', text: " Filters the documents, similar to a `find()` query." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`$group`:", bold: true }, { type: 'text', text: " Groups documents by a specified key and allows you to perform calculations on the grouped data (like sum, average, etc.)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`$sort`:", bold: true }, { type: 'text', text: " Sorts the documents." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`$project`:", bold: true }, { type: 'text', text: " Reshapes the documents, allowing you to include, exclude, or add new fields." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Practical Example: Calculating Total Sales" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Imagine you have an `orders` collection with documents that look like this:" }] },
        { type: 'codeBlock', attrs: { language: 'json' }, content: [{ type: 'text', text: `{\n  "customer_id": "cust1",\n  "product": "Laptop",\n  "price": 1200,\n  "quantity": 1\n},\n{\n  "customer_id": "cust2",\n  "product": "Mouse",\n  "price": 25,\n  "quantity": 2\n},\n{\n  "customer_id": "cust1",\n  "product": "Keyboard",\n  "price": 75,\n  "quantity": 1\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's use an aggregation pipeline to find the total amount spent by each customer." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `db.orders.aggregate([\n  // Stage 1: Group documents by customer_id\n  {\n    $group: {\n      _id: "$customer_id",\n      // Calculate the total amount for each group\n      totalAmount: { $sum: { $multiply: ["$price", "$quantity"] } }\n    }\n  },\n  // Stage 2: Sort the results by totalAmount in descending order\n  {\n    $sort: { totalAmount: -1 }\n  }\n])` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why is This So Powerful?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The Aggregation Framework allows you to perform complex data analysis directly within the database. This is far more efficient than fetching large amounts of data into your application and processing it there. It reduces network latency and leverages the power of the database engine to perform calculations quickly." }] },
        { type:- 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The Aggregation Framework is an essential, premium skill for any serious MongoDB developer. It unlocks the full data processing power of the database, enabling you to build sophisticated reports, dashboards, and analytics features. By understanding how to chain together stages like `$match`, `$group`, and `$sort`, you can transform raw data into valuable insights with impressive efficiency." }] }
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

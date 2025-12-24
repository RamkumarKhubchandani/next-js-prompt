require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Building a GraphQL API with Node.js and Apollo Server";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Next Evolution in APIs: Why GraphQL?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While REST has been the standard for years, it can lead to problems like over-fetching (getting more data than you need) or under-fetching (having to make multiple requests to get all the data you need). GraphQL solves this. It's a query language for your API that allows clients to ask for exactly the data they need and nothing more. Apollo Server is the leading library for building a production-ready GraphQL layer over your existing backend services." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Three Pillars of a GraphQL API" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Schema:", bold: true }, { type: 'text', text: " A strongly-typed definition of all the data that clients can query. This acts as a contract between the client and the server." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Resolvers:", bold: true }, { type: 'text', text: " A collection of functions that are responsible for fetching the data for each field in the schema." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Queries:", bold: true }, { type: 'text', text: " The requests that clients send to the server to ask for specific data." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: Building a Simple Book API" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Define the Schema" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The schema, written in Schema Definition Language (SDL), defines our data types and the queries we can make." }] },
        { type: 'codeBlock', attrs: { language: 'graphql' }, content: [{ type: 'text', text: `const typeDefs = \`#graphql\n  type Book {\n    title: String\n    author: String\n  }\n\n  type Query {\n    books: [Book]\n  }\n\`;` }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Create the Resolvers" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The resolver functions tell the server how to fetch the data for the `books` query." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const books = [\n  { title: 'The Awakening', author: 'Kate Chopin' },\n  { title: 'City of Glass', author: 'Paul Auster' },\n];\n\nconst resolvers = {\n  Query: {\n    books: () => books,\n  },\n};` }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 3: Set Up Apollo Server" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Finally, we combine the schema and resolvers and start our Apollo Server." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import { ApolloServer } from '@apollo/server';\nimport { startStandaloneServer } from '@apollo/server/standalone';\n\n// ... typeDefs and resolvers from above\n\nconst server = new ApolloServer({ typeDefs, resolvers });\n\nconst { url } = await startStandaloneServer(server, { listen: { port: 4000 } });\n\nconsole.log(\`🚀 Server ready at: \${url}\`);` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: The Future of API Design" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "GraphQL represents a fundamental shift in how we think about APIs. It empowers front-end developers to fetch data efficiently and gives backend developers powerful tools for defining their data services. Learning to build GraphQL APIs with Node.js and Apollo Server is a premium skill that will put you at the forefront of modern web development, enabling you to build the kind of fast, flexible applications that attract a massive audience." }] }
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Implementing Vector Search in MongoDB for AI Applications";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The AI Revolution in Your Database" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The world is buzzing about AI, and a key part of it is 'Vector Search'. Vector search allows you to find data based on its semantic meaning, not just by matching keywords. This is the technology behind recommendation engines and modern AI applications that 'understand' language. MongoDB Atlas now has a powerful, integrated Vector Search feature, and learning it is essential for any developer looking to build the next viral AI-powered application." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How Does Vector Search Work?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "1.  **Embeddings:** You first use a machine learning model (like one from OpenAI or Hugging Face) to convert your text data (e.g., a movie plot) into a numerical representation called a 'vector embedding'. This vector captures the semantic meaning of the text." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "2.  **Indexing:** You store these vector embeddings in your MongoDB collection and create a special 'Vector Search Index'." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "3.  **Querying:** When a user searches, you convert their query into a vector as well. Then, you use a special aggregation pipeline stage, `$vectorSearch`, to find the documents whose vectors are most similar to the query vector." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: Semantic Movie Search" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Imagine a collection of movies with plot summaries. A user doesn't search for 'car chase', they search for 'high-octane action thriller'. Vector search can find movies that are semantically similar." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Create a Vector Search Index in Atlas UI" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In your MongoDB Atlas dashboard, you would create a new Atlas Search Index with a 'Vector' type on the field that stores your embeddings (e.g., `plot_embedding`)." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: The Aggregation Pipeline" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Your Node.js application would first convert the user's query ('high-octane action thriller') into a vector using an AI model. Then, it would run an aggregation query like this:" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const queryVector = [0.012, 0.234, ...]; // Vector from the AI model\n\nconst pipeline = [\n  {\n    $vectorSearch: {\n      index: 'your_vector_index_name',\n      path: 'plot_embedding',\n      queryVector: queryVector,\n      numCandidates: 100,\n      limit: 10\n    }\n  },\n  {\n    $project: {\n      _id: 0,\n      title: 1,\n      plot: 1,\n      score: { $meta: 'vectorSearchScore' }\n    }\n  }\n];\n\nconst results = await db.collection('movies').aggregate(pipeline).toArray();` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Build the Future" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Vector Search is a game-changing technology that bridges the gap between your data and the world of AI. By integrating it directly into the database with MongoDB Atlas, developers can now build sophisticated semantic search, recommendation engines, and Retrieval-Augmented Generation (RAG) applications more easily than ever before. Mastering this premium skill is a direct path to creating the intelligent, viral applications of the future." }] }
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

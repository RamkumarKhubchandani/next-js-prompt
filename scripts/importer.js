require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;

async function importContent() {
  const postTitle = process.argv[2];
  if (!postTitle) {
    console.error('Error: Please provide a post title as an argument.');
    process.exit(1);
  }

  if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  try {
    const contentFilePath = path.join(__dirname, 'temp-content.json');
    const contentFile = fs.readFileSync(contentFilePath, 'utf8');
    const newContent = JSON.parse(contentFile);

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    const result = await Post.findOneAndUpdate(
      { title: postTitle },
      { $set: { content: newContent } },
      { new: true, upsert: true }
    );

    if (result) {
      console.log(`Successfully updated or created post: ${result.title}`);
    } else {
      console.log(`Could not find or create post: "${postTitle}"`);
    }

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB.');
    }
  }
}

importContent();

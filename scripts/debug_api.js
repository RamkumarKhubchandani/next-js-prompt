require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');

// Helper to handle potential ES Module imports in a CommonJS script if Node allows it,
// or if the file is actually CommonJS.
// Since previous scripts worked, I assume this works.
let Post;
try {
    const PostModule = require('../app/models/Post');
    Post = PostModule.default || PostModule;
} catch (e) {
    console.error("Failed to require Post model:", e.message);
}

const MONGODB_URI = process.env.MONGODB_URI;

async function testQuery() {
  if (!Post) {
      console.error("Post model not loaded. Exiting.");
      return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    console.log('Running query...');
    const posts = await Post.find({})
        .select('-content')
        .populate('author', 'name')
        .sort({ createdAt: -1 });
    
    console.log(`Found ${posts.length} posts`);
    if (posts.length > 0) {
        console.log('Sample post title:', posts[0].title);
        // content should be undefined or not present
        console.log('Has content?', posts[0].content !== undefined);
        console.log('Author:', posts[0].author);
    }

    // Test JSON serialization
    try {
        JSON.stringify(posts);
        console.log("JSON serialization successful");
    } catch (jsonError) {
        console.error("JSON serialization failed:", jsonError);
    }

  } catch (error) {
    console.error('Query failed:', error);
  } finally {
    if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
    }
  }
}

testQuery();




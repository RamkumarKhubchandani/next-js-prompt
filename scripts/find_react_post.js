require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI;

async function findReactPost() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    // Need to define schemas if not importing models directly to avoid "MissingSchemaError" if we used populate
    // But here we won't populate.
    
    // Dynamic import for Post model might fail if it relies on other imports, 
    // so let's just define a temporary schema or try to read raw.
    // Actually, let's try to import the model file, it should register the model.
    
    // We need to register User first just in case Post model requires it (refs).
    // But usually model registration is side-effect of import.
    
    // Just use the collection directly to be safe and see raw data.
    const db = mongoose.connection.db;
    const collection = db.collection('posts');

    const post = await collection.findOne({ title: { $regex: 'React', $options: 'i' } });

    if (post) {
      console.log('Found Post:', post.title);
      console.log('Slug:', post.slug);
      console.log('Content Sample:', JSON.stringify(post.content).substring(0, 500));
      
      // Check for code blocks
      const contentStr = JSON.stringify(post.content);
      if (contentStr.includes('codeBlock')) {
          console.log('✅ Contains code blocks!');
          // Find first code block content
          const match = contentStr.match(/"type":"codeBlock".*?"text":"(.*?)"/);
          if (match) {
              console.log('First Code Block Snippet:', match[1].substring(0, 100));
          }
      } else {
          console.log('❌ No code blocks found.');
      }
    } else {
      console.log('No React post found.');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  }
}

findReactPost();




require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI;

// Simple model definitions to avoid schema errors
const postSchema = new mongoose.Schema({}, { strict: false });
const Post = mongoose.model('Post', postSchema);
const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model('User', userSchema);

async function makeInteractive() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    const slug = 'understanding-the-usestate-hook-in-react-a-simple-guide';
    const post = await Post.findOne({ slug });

    if (!post) {
        console.log('Post not found:', slug);
        return;
    }

    console.log('Found Post:', post.title);

    // Traverse the content to find the code block
    // content is a JSON object (Tiptap doc)
    let updated = false;
    
    const content = post.content;
    
    if (content && content.content) {
        content.content.forEach(node => {
            if (node.type === 'codeBlock') {
                // Check if it looks like the Counter example
                // The snippet we saw started with "import React"
                if (node.content && node.content[0] && node.content[0].text.includes('function Counter()')) {
                    console.log('Found the target code block!');
                    // Update language to interactive-react
                    // Ensure attrs exists
                    if (!node.attrs) node.attrs = {};
                    node.attrs.language = 'interactive-react';
                    
                    // Clean up the code if needed (Sandpack expects export default)
                    // The snippet has "function Counter()". We should add "export default" if missing.
                    let code = node.content[0].text;
                    if (!code.includes('export default')) {
                        console.log('Adding "export default" to code...');
                        // Regex to replace "function Counter" with "export default function Counter"
                        code = code.replace('function Counter', 'export default function Counter');
                        node.content[0].text = code;
                    }
                    updated = true;
                }
            }
        });
    }

    if (updated) {
        // We need to mark the path as modified because 'content' is Mixed type
        post.markModified('content');
        await post.save();
        console.log('✅ Post updated! The code block is now interactive.');
    } else {
        console.log('❌ Target code block not found or already updated.');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  }
}

makeInteractive();




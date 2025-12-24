require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Building Reusable Custom Hooks in React";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why Create Custom Hooks?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "As you build larger React applications, you'll often find yourself writing the same logic in multiple components. For example, you might need to fetch data, access local storage, or track the window size in several different places. Custom Hooks allow you to extract this component logic into reusable functions. This helps you avoid duplicating code, makes your components cleaner, and simplifies complex logic." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Rules of Custom Hooks" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A custom Hook is simply a JavaScript function whose name starts with 'use' and that calls other Hooks. The 'use' prefix is a crucial convention that allows React's linter to check for violations of the rules of Hooks automatically." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: Creating a `useFetch` Hook" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Data fetching is a perfect use case for a custom Hook. Let's create a `useFetch` hook that handles the logic for fetching data, including loading and error states." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import { useState, useEffect } from 'react';\n\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const fetchData = async () => {\n      try {\n        const response = await fetch(url);\n        if (!response.ok) {\n          throw new Error('Network response was not ok');\n        }\n        const result = await response.json();\n        setData(result);\n      } catch (error) {\n        setError(error.message);\n      } finally {\n        setLoading(false);\n      }\n    };\n\n    fetchData();\n  }, [url]); // Re-fetch if the URL changes\n\n  return { data, loading, error };\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Using Our Custom Hook" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, any component that needs to fetch data can use our `useFetch` hook, making the component's code much cleaner and more focused on rendering the UI." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import React from 'react';\nimport useFetch from './useFetch'; // Assuming the hook is in a separate file\n\nfunction UserComponent({ userId }) {\n  const { data: user, loading, error } = useFetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`);\n\n  if (loading) return <p>Loading...</p>;\n  if (error) return <p>Error: {error}</p>;\n\n  return (\n    <div>\n      <h2>{user.name}</h2>\n      <p>Email: {user.email}</p>\n    </div>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Custom Hooks are a powerful feature in React that enable true logic reusability. By abstracting complex logic into simple, easy-to-use hooks, you can build cleaner, more maintainable, and more scalable applications. It's a key skill for any intermediate or advanced React developer." }] }
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

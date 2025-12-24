require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Understanding the useEffect Hook for Data Fetching in React";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Core of Side Effects: `useEffect`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In React, components are primarily for rendering UI. But what happens when you need to perform a \"side effect\"—an operation that reaches outside of your component? This includes things like setting up a subscription, manually changing the DOM, or, most commonly, fetching data from an API. The `useEffect` hook is React's primary tool for managing all of these side effects." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Fetching Data with `useEffect`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's build a simple component that fetches user data from a public API. We'll need to manage three key pieces of state: the data itself, a loading indicator, and any potential errors." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import React, { useState, useEffect } from 'react';\n\nfunction UserProfile() {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const fetchUser = async () => {\n      try {\n        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');\n        if (!response.ok) {\n          throw new Error('Network response was not ok');\n        }\n        const data = await response.json();\n        setUser(data);\n      } catch (error) {\n        setError(error.message);\n      } finally {\n        setLoading(false);\n      }\n    };\n\n    fetchUser();\n  }, []); // The empty dependency array is crucial!\n\n  if (loading) return <p>Loading...</p>;\n  if (error) return <p>Error: {error}</p>;\n\n  return (\n    <div>\n      <h1>{user.name}</h1>\n      <p>Email: {user.email}</p>\n      <p>Website: {user.website}</p>\n    </div>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Understanding the Dependency Array" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The second argument to `useEffect` is the dependency array. This array tells React when to re-run your effect. " }, { type: 'text', text: "If you provide an empty array `[]`, the effect will run only once, after the component's initial render. This is exactly what we want for a simple data fetch.", bold: true }] },
        { type: 'paragraph', content: [{ type: 'text', text: "If you omit the array, the effect will run after every single render, leading to an infinite loop of data fetching. If you put a variable in the array (e.g., `[userId]`), the effect will re-run whenever that variable's value changes." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `useEffect` hook is an essential tool for data fetching in React. By combining it with `useState` to manage loading and error states, and by correctly using the dependency array, you can build robust, dynamic components that interact seamlessly with external APIs." }] }
    ]
};

async function updateReactPost() {
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

updateReactPost();

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Passing Data Between Components with Props in React";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "React's One-Way Data Flow" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "React is designed with a concept called \"one-way data flow.\" This means that data has a single source of truth and flows downwards from parent components to child components. You can't pass data directly from a child back up to a parent. This makes your application more predictable and easier to debug. The mechanism for passing this data is called 'props'." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What are Props?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "`Props` (short for properties) are read-only objects that contain the data you want to pass to a component. Think of them as arguments to a function or attributes on an HTML tag. They allow you to make your components reusable and dynamic." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Passing and Receiving Props: A Simple Example" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's create a simple `Welcome` component that receives a `name` prop from its parent component, `App`." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import React from 'react';\n\n// Child Component\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n\n// Parent Component\nfunction App() {\n  return (\n    <div>\n      <Welcome name="Sara" />\n      <Welcome name="Cahal" />\n      <Welcome name="Edite" />\n    </div>\n  );\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In this example, the `App` component renders the `Welcome` component three times, passing a different `name` prop to each. The `Welcome` component receives these props as an object and uses dot notation (`props.name`) to access the value." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Destructuring Props" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To make your code even cleaner, you can use modern JavaScript destructuring to pull properties directly out of the props object." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Child Component with destructured props\nfunction Welcome({ name }) {\n  return <h1>Hello, {name}</h1>;\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Passing Different Data Types" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You can pass any JavaScript data type as a prop, including strings, numbers, booleans, arrays, and even other components. When passing anything other than a string, you must use curly braces `{}`." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `function UserProfile({ name, age, hobbies, isAdmin }) {\n  return (\n    <div>\n      <h2>{name}</h2>\n      <p>Age: {age}</p>\n      <p>Admin: {isAdmin ? 'Yes' : 'No'}</p>\n      <ul>\n        {hobbies.map(hobby => <li key={hobby}>{hobby}</li>)}\n      </ul>\n    </div>\n  );\n}\n\nfunction App() {\n  return <UserProfile name="Alex" age={30} hobbies={['Reading', 'Coding']} isAdmin={true} />;\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Props are the fundamental way to pass data in React. By mastering how to send and receive props, you unlock the ability to build complex, hierarchical component trees where data flows predictably, making your applications robust and easy to maintain." }] }
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

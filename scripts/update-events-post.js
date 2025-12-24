require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Handling User Events in React";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What Are Events in React?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Events are the actions that a user performs on your web page, such as clicking a button, typing in a field, or submitting a form. Handling these events is a core part of creating interactive user interfaces. React's event handling system is very similar to handling events on DOM elements, but with a few important syntax differences." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Key Differences from HTML" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "React events are named using camelCase, so `onclick` becomes `onClick`." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "With JSX, you pass a function as the event handler, rather than a string." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Handling a Button Click" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The most common event is a button click. Here's how you attach an event handler to the `onClick` event." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import React from 'react';\n\nfunction AlertButton() {\n  const handleClick = () => {\n    alert('You clicked the button!');\n  };\n\n  return (\n    <button onClick={handleClick}>\n      Click Me\n    </button>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Working with Form Inputs (`onChange`)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To create interactive forms, you'll often need to handle the `onChange` event on an input field. This event fires every time the value of the input changes. We typically use this in combination with the `useState` hook to keep track of the input's value." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import React, { useState } from 'react';\n\nfunction NameInput() {\n  const [name, setName] = useState('');\n\n  const handleChange = (event) => {\n    // The event object has a 'target' property, which is the input element\n    setName(event.target.value);\n  };\n\n  return (\n    <div>\n      <input type="text" value={name} onChange={handleChange} />\n      <p>Your name is: {name}</p>\n    </div>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Handling Form Submissions (`onSubmit`)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When a user submits a form, the browser's default behavior is to refresh the page. In a React application, we almost always want to prevent this and handle the submission with JavaScript. We can do this by calling `event.preventDefault()` on the event object." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import React, { useState } from 'react';\n\nfunction SimpleForm() {\n  const [inputValue, setInputValue] = useState('');\n\n  const handleSubmit = (event) => {\n    event.preventDefault(); // Prevents the page from reloading\n    alert(\`You submitted: \${inputValue}\`);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input \n        type="text"\n        value={inputValue}\n        onChange={e => setInputValue(e.target.value)}\n      />\n      <button type="submit">Submit</button>\n    </form>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Event handling is what breathes life into your React applications. By understanding how to use `onClick`, `onChange`, `onSubmit`, and other event handlers, you can create rich, interactive experiences that respond instantly to user input. This is a fundamental skill for any React developer." }] }
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

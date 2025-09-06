require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Building Forms in React: Controlled vs. Uncontrolled Components";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Handling Forms in React" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Forms are a fundamental part of web applications, used for everything from login pages to complex data entry. In React, there are two primary approaches to managing form data: Controlled Components and Uncontrolled Components. Understanding the difference is key to building efficient and predictable forms." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Controlled Components" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In a controlled component, the form data is handled by a React component's state. The React state is the 'single source of truth'. When the user types into an input field, an `onChange` event handler updates the state, and the component re-renders, passing the new value back to the input field via its `value` prop." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is the recommended approach for most use cases in React as it gives you more control over the form data." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import React, { useState } from 'react';\n\nfunction ControlledForm() {\n  const [name, setName] = useState('');\n\n  const handleSubmit = (event) => {\n    event.preventDefault();\n    alert('A name was submitted: ' + name);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <label>\n        Name:\n        <input \n          type="text" \n          value={name} // The input's value is controlled by React state\n          onChange={e => setName(e.target.value)} \n        />\n      </label>\n      <input type="submit" value="Submit" />\n    </form>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Uncontrolled Components" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In an uncontrolled component, the form data is handled by the DOM itself. Instead of using state, you use a `ref` to get the form values from the DOM when you need them, typically when the form is submitted. This approach is often simpler for basic forms but offers less control." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import React, { useRef } from 'react';\n\nfunction UncontrolledForm() {\n  const inputRef = useRef(null);\n\n  const handleSubmit = (event) => {\n    event.preventDefault();\n    alert('A name was submitted: ' + inputRef.current.value);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <label>\n        Name:\n        <input \n          type="text" \n          ref={inputRef} // The DOM manages the input's value\n        />\n      </label>\n      <input type="submit" value="Submit" />\n    </form>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "When to Use Each" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Use Controlled Components when:", bold: true }, { type: 'text', text: " you need to validate form fields in real-time, conditionally disable the submit button, or have dynamic inputs." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Use Uncontrolled Components for:", bold: true }, { type: 'text', text: " very simple forms where you don't need instant feedback or validation, or when integrating React with non-React code." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While both approaches are valid, controlled components are generally preferred in React for their predictability and the level of control they provide over form data and validation. Understanding both patterns allows you to choose the best tool for the job." }] }
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Testing React Components with Jest and React Testing Library";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why Test Your React Components?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Writing tests for your components is a crucial part of building robust, maintainable, and bug-free applications. Tests act as a safety net, allowing you to refactor your code with confidence. They verify that your components behave as expected from a user's perspective, ensuring a high-quality user experience." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Tools: Jest and React Testing Library" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Jest:", bold: true }, { type: 'text', text: " A popular JavaScript testing framework that provides a test runner, an assertion library, and mocking capabilities." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "React Testing Library (RTL):", bold: true }, { type: 'text', text: " A library that provides tools for testing React components in a way that resembles how a user interacts with them. It encourages you to test behavior, not implementation details." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Writing Your First Test" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's test a simple `<Button>` component that calls a function when clicked." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Button.js\nimport React from 'react';\n\nfunction Button({ onClick, children }) {\n  return <button onClick={onClick}>{children}</button>;\n}\n\n// Button.test.js\nimport React from 'react';\nimport { render, screen, fireEvent } from '@testing-library/react';\nimport '@testing-library/jest-dom';\nimport Button from './Button';\n\ntest('renders button and handles click', () => {\n  const handleClick = jest.fn(); // Create a mock function\n\n  // 1. Render the component\n  render(<Button onClick={handleClick}>Click Me</Button>);\n\n  // 2. Find the element\n  const buttonElement = screen.getByText(/click me/i);\n  expect(buttonElement).toBeInTheDocument();\n\n  // 3. Simulate a user event\n  fireEvent.click(buttonElement);\n\n  // 4. Assert the result\n  expect(handleClick).toHaveBeenCalledTimes(1);\n});` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The AAA Pattern: Arrange, Act, Assert" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The test above follows a common pattern in testing:" }] },
        { type: 'orderedList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Arrange:", bold: true }, { type: 'text', text: " Set up the test, including rendering the component and creating any mock functions." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Act:", bold: true }, { type: 'text', text: " Interact with the component, just like a user would (e.g., clicking a button)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Assert:", bold: true }, { type: 'text', text: " Check if the component behaved as expected after the interaction." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Testing your React components doesn't have to be difficult. By using Jest and React Testing Library, you can write tests that are easy to understand and maintain. Focusing on user behavior rather than implementation details ensures that your tests are resilient to code changes and provide real value by guaranteeing your application works as intended for your users." }] }
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

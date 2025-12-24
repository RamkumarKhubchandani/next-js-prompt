require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Conditional Rendering in React: A Deep Dive";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is Conditional Rendering?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Conditional rendering in React is the process of displaying different content or components based on certain conditions. It's what makes your application dynamic and responsive to user state. For example, you might show a 'Log In' button for a logged-out user and a 'Log Out' button for a logged-in user. React doesn't have a special syntax for this; instead, it relies on standard JavaScript logic." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Method 1: Using `if/else` Statements" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The most straightforward way to conditionally render content is with a JavaScript `if` statement. You can use a variable to store the element you want to render and then return that variable from your component. This is very readable and great for complex logic." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `function LoginStatus({ isLoggedIn }) {\n  let message;\n  if (isLoggedIn) {\n    message = <p>Welcome back!</p>;\n  } else {\n    message = <p>Please log in.</p>;\n  }\n\n  return <div>{message}</div>;\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Method 2: The Ternary Operator" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For simpler `if/else` logic, the conditional (ternary) operator (`condition ? trueExpression : falseExpression`) is a clean, inline solution. It's perfect for switching between two components or pieces of text." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `function LoginButton({ isLoggedIn }) {\n  return (\n    <div>\n      {isLoggedIn\n        ? <button>Log Out</button>\n        : <button>Log In</button>\n      }\n    </div>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Method 3: Logical `&&` Operator" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Sometimes you want to render a component only if a condition is true, and render nothing otherwise. The logical `&&` operator is perfect for this. In JavaScript, `true && expression` always evaluates to `expression`, and `false && expression` always evaluates to `false`. React treats `false` as a valid but non-renderable output." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `function Mailbox({ unreadMessages }) {\n  return (\n    <div>\n      <h1>Hello!</h1>\n      {unreadMessages.length > 0 &&\n        <h2>\n          You have {unreadMessages.length} unread messages.\n        </h2>\n      }\n    </div>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Choosing the Right Method" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Choosing the right method for conditional rendering depends on your needs. For complex logic, use `if/else`. For a simple choice between two options, the ternary operator is clean and concise. And for rendering something or nothing, the logical `&&` operator is the most efficient. Mastering these techniques is fundamental to building dynamic and interactive React applications." }] }
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

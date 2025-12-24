require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Styling in React: From CSS Modules to Tailwind CSS";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Challenge of Styling in Component-Based Apps" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Styling in a component-based framework like React presents a unique challenge: how do you style a component without those styles accidentally affecting other components? Global CSS files can quickly become hard to manage. React's ecosystem offers several excellent solutions to this problem." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Method 1: CSS Modules" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "CSS Modules are a built-in feature in frameworks like Next.js. A CSS Module is a regular CSS file where all class names are scoped locally by default. This means a class name you write in one file won't conflict with the same class name in another. You simply name your file `[name].module.css` and import it into your component." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `/* Button.module.css */\n.button {\n  background-color: #0070f3;\n  color: white;\n  padding: 10px 20px;\n  border-radius: 5px;\n}\n\n// Button.js\nimport styles from './Button.module.css';\n\nfunction Button() {\n  return <button className={styles.button}>Click Me</button>;\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Method 2: CSS-in-JS (Styled-Components)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "CSS-in-JS libraries allow you to write CSS directly in your JavaScript files. The most popular is `styled-components`. It uses tagged template literals to style your components. This approach co-locates your styles with your component logic, making components truly self-contained." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `import styled from 'styled-components';\n\nconst StyledButton = styled.button\`\n  background-color: #0070f3;\n  color: white;\n  padding: 10px 20px;\n  border-radius: 5px;\n\`;\n\nfunction Button() {\n  return <StyledButton>Click Me</StyledButton>;\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Method 3: Utility-First CSS (Tailwind CSS)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Tailwind CSS is a utility-first CSS framework. Instead of writing custom CSS classes, you build your design directly in your HTML by applying pre-existing utility classes. This is an incredibly fast and efficient way to build modern user interfaces, and it's the approach we use for this website!" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// A button styled with Tailwind CSS utility classes\nfunction Button() {\n  return (\n    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">\n      Click Me\n    </button>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Which Should You Choose?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "There's no single 'best' way to style in React; it often comes down to project requirements and team preference. CSS Modules offer a simple, familiar approach. Styled-Components provide excellent component encapsulation. Tailwind CSS offers unparalleled speed and efficiency for building custom designs. Understanding all three gives you the flexibility to choose the right tool for any project." }] }
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

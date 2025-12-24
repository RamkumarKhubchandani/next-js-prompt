require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "React Server Actions in Next.js 14: The Future of Mutations";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A New Paradigm: Full-Stack Components" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Traditionally, if you wanted to mutate data from a form (like creating a new user), you would need to create a client-side function to gather the form data, an API endpoint on a server to receive that data, and logic to handle the request and response. Server Actions, a new feature in Next.js 14 built on React Server Components, completely revolutionizes this workflow. They allow you to define data mutations on the server and call them directly from your components, effectively allowing you to write full-stack logic in one place." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Creating a Simple Server Action" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A Server Action is simply an `async` function that you define on the server. You must mark the function with the `'use server'` directive. This tells Next.js that this function should only ever be executed on the server, never on the client. Let's create a simple action to add an item to a database." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// app/actions.js\n'use server';\n\nimport { revalidatePath } from 'next/cache';\nimport db from './lib/db'; // Your database client\n\nexport async function addItem(formData) {\n  const itemName = formData.get('itemName');\n  \n  try {\n    await db.items.create({ name: itemName });\n    revalidatePath('/'); // Invalidate cache for the homepage to show the new item\n  } catch (error) {\n    // Handle errors\n  }\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Invoking a Server Action from a Form" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You can now import and use this server action directly in your component's `form` element. Next.js handles the progressive enhancement, meaning the form will work even if JavaScript is disabled." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// app/page.js\nimport { addItem } from './actions';\n\nexport default function Home() {\n  return (\n    <main>\n      <h1>My Items</h1>\n      {/* ... list of items ... */}\n\n      <form action={addItem}>\n        <input type="text" name="itemName" />\n        <button type="submit">Add Item</button>\n      </form>\n    </main>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Handling Loading and Error States" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For a better user experience, you can use the `useFormStatus` hook (in a child component) to show a pending state while the action is executing. Server actions can also return data, allowing you to handle success or error states directly in your component." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Server Actions are a game-changer for building full-stack applications with Next.js. They drastically simplify data mutations by co-locating your server logic with your components, reducing boilerplate and eliminating the need for separate API routes for many common tasks. Mastering Server Actions is essential for any developer looking to stay on the cutting edge of the React and Next.js ecosystem." }] }
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

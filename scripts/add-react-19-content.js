require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const POST_TITLE = "What's New in React 19: A Comprehensive Guide";
const POST_SLUG = "whats-new-in-react-19";

const detailedContent = {
    type: 'doc',
    content: [
        {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: "React 19: The Next Evolution" }]
        },
        {
            type: 'paragraph',
            content: [{ type: 'text', text: "React 19 introduces a wave of improvements focusing on actions, server capabilities, and simplified APIs. This update makes handling data mutations, async operations, and refs significantly easier. Let's dive into the key features that every Pro developer needs to know." }]
        },
        {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: "1. Actions: Built-in Support for Mutations" }]
        },
        {
            type: 'paragraph',
            content: [{ type: 'text', text: "React 19 adds first-class support for functions that handle data mutations, called \"Actions\". You can now pass a function directly to the `action` prop of a `<form>` element. React will automatically manage the lifecycle of the data submission." }]
        },
        {
            type: 'codeBlock',
            attrs: { language: 'javascript' },
            content: [{ type: 'text', text: `function UpdateName() {\n  async function updateName(formData) {\n    'use server';\n    await db.updateName(formData.get("name"));\n  }\n\n  return (\n    <form action={updateName}>\n      <input name="name" />\n      <button type="submit">Update</button>\n    </form>\n  );\n}` }]
        },
        {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: "2. New Hook: useActionState" }]
        },
        {
            type: 'paragraph',
            content: [{ type: 'text', text: "Formerly known as `useFormState`, this hook allows you to update state based on the result of a form action. It's perfect for handling validation errors or success messages returned from the server." }]
        },
        {
            type: 'codeBlock',
            attrs: { language: 'javascript' },
            content: [{ type: 'text', text: `const [state, formAction] = useActionState(updateName, null);\n\nreturn (\n  <form action={formAction}>\n    <input name="name" />\n    <button type="submit">Update</button>\n    {state?.error && <p>{state.error}</p>}\n  </form>\n);` }]
        },
        {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: "3. New Hook: useOptimistic" }]
        },
        {
            type: 'paragraph',
            content: [{ type: 'text', text: "Optimistic updates are now built-in. `useOptimistic` lets you show the final state of an operation while the async action is still pending. If the action fails, React automatically reverts the state." }]
        },
        {
            type: 'codeBlock',
            attrs: { language: 'javascript' },
            content: [{ type: 'text', text: `function OptimisticComponent({ currentMessages }) {\n  const [messages, addOptimisticMessage] = useOptimistic(\n    currentMessages,\n    (state, newMessage) => [...state, newMessage]\n  );\n\n  async function formAction(formData) {\n    const message = formData.get("message");\n    addOptimisticMessage(message);\n    await sendMessage(message);\n  }\n\n  // Render messages...\n}` }]
        },
        {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: "4. The 'use' API" }]
        },
        {
            type: 'paragraph',
            content: [{ type: 'text', text: "The new `use` API allows you to read the value of a resource (like a Promise or Context) directly in render. Unlike hooks, `use` can be called conditionally (e.g., inside an `if` statement)." }]
        },
        {
            type: 'codeBlock',
            attrs: { language: 'javascript' },
            content: [{ type: 'text', text: `import { use } from 'react';\n\nfunction Comments({ commentsPromise }) {\n  // Suspends until the promise resolves\n  const comments = use(commentsPromise);\n  \n  return comments.map(c => <p key={c.id}>{c.text}</p>);\n}` }]
        },
        {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: "5. Simplified Ref Handling" }]
        },
        {
            type: 'paragraph',
            content: [{ type: 'text', text: "React 19 removes the need for `forwardRef`. You can now pass `ref` as a regular prop to function components." }]
        },
        {
            type: 'codeBlock',
            attrs: { language: 'javascript' },
            content: [{ type: 'text', text: `// Before (React 18)\nconst Input = forwardRef((props, ref) => <input ref={ref} {...props} />);\n\n// Now (React 19)\nfunction Input({ ref, ...props }) {\n  return <input ref={ref} {...props} />;\n}` }]
        },
        {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: "Conclusion" }]
        },
        {
            type: 'paragraph',
            content: [{ type: 'text', text: "React 19 is a major step forward, simplifying the mental model for side effects and data mutations. By adopting these new primitives, you can write cleaner, more performant code with less boilerplate." }]
        }
    ]
};

async function addReact19Content() {
    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI is not defined in .env.local');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB.');

        const adminUser = await User.findOne({ email: ADMIN_EMAIL });
        if (!adminUser) {
            console.error(`Error: Admin user with email ${ADMIN_EMAIL} not found.`);
            process.exit(1);
        }

        const postData = {
            title: POST_TITLE,
            slug: POST_SLUG,
            content: detailedContent,
            category: 'React',
            author: adminUser._id,
            isPremium: true,
            metaTitle: "React 19 Features Guide: Actions, useOptimistic, and More | JSPrompt",
            metaDescription: "A comprehensive guide to React 19's new features including Server Actions, useOptimistic, useActionState, and the new use API. Detailed examples for pro developers.",
            keywords: ["react 19", "react actions", "useOptimistic", "useActionState", "react hooks", "server components"]
        };

        const result = await Post.findOneAndUpdate(
            { slug: POST_SLUG },
            { 
                $set: postData,
                $setOnInsert: { 
                    postID: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
                }
            },
            { new: true, upsert: true }
        );

        console.log(`Successfully updated/created post: ${result.title}`);

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

addReact19Content();








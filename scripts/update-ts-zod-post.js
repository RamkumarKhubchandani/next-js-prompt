require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "End-to-End Type Safety with Zod: The Ultimate Validation Guide";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem: The 'Any' Invasion at Your Borders" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Even in the most well-typed TypeScript application, a threat lurks at the boundaries. Any data coming from the outside world—API responses, user form inputs, data from `localStorage`—is implicitly of type `any`. We might cast it to a TypeScript type, but we're just making an unsafe assumption. This is where Zod comes in. Zod is a TypeScript-first schema declaration and validation library that allows us to replace blind trust with verifiable proof." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Core Concept: Define a Schema, Infer the Type" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "With Zod, you don't write your types and then a separate validation function. You define a single Zod 'schema' that serves as the single source of truth for both." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `import { z } from 'zod';\n\n// 1. Define the schema\nconst UserSchema = z.object({\n  id: z.string().uuid(),\n  username: z.string().min(3, { message: "Username must be at least 3 characters" }),\n  email: z.string().email(),\n  isAdmin: z.boolean().default(false),\n});\n\n// 2. Infer the TypeScript type directly from the schema\ntype User = z.infer<typeof UserSchema>;\n\n// Now you have a 'User' type that is GUARANTEED to match your validation logic.\n// No more manual synchronization between types and validators!` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Parsing: Validating Unknown Data" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The primary job of a schema is to parse and validate incoming data. Zod provides two main methods: `.parse()` and `.safeParse()`." }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`.parse(data)`: This will throw a detailed error if validation fails, which is great for server-side code where you want to halt execution." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`.safeParse(data)`: This will never throw. Instead, it returns an object containing either the validated `data` or an `error` object. This is perfect for UI forms where you want to display validation messages to the user." }] }] },
        ]},
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `const unknownUserData = {\n  id: '123-abc',\n  username: 'Al',\n  email: 'alice@example.com',\n};\n\n// Using safeParse for UI logic\nconst result = UserSchema.safeParse(unknownUserData);\n\nif (!result.success) {\n  // result.error.errors contains a detailed list of validation issues\n  console.log(result.error.flatten().fieldErrors);\n  /*\n  {\n    id: [ 'Invalid uuid' ],\n    username: [ 'Username must be at least 3 characters' ]\n  }\n  */\n} else {\n  // result.data is fully typed as 'User' and has default values applied\n  console.log(result.data);\n  /*\n  {\n    id: '123-abc',\n    username: 'Al',\n    email: 'alice@example.com',\n    isAdmin: false // The default was applied!\n  }\n  */\n}` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Practical Example: Validating a Next.js API Route" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's apply Zod to a common use case: validating the body of a POST request in a Next.js API route to ensure true end-to-end type safety." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app/api/users/route.ts\nimport { z } from 'zod';\nimport { NextResponse } from 'next/server';\n\nconst UserSchema = z.object({ /* ... as defined above ... */ });\n\nexport async function POST(request: Request) {\n  const requestBody = await request.json();\n\n  const validationResult = UserSchema.safeParse(requestBody);\n\n  if (!validationResult.success) {\n    return NextResponse.json(\n      { error: 'Invalid input', details: validationResult.error.flatten() }, \n      { status: 400 }\n    );\n  }\n\n  // At this point, validationResult.data is a fully typed User object.\n  // We can now safely use it in our application logic.\n  const newUser: User = validationResult.data;\n  // ... save newUser to the database ...\n\n  return NextResponse.json({ user: newUser }, { status: 201 });\n}\n\n// This is just a placeholder for the type, we infer it on the client.\ntype User = z.infer<typeof UserSchema>;` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: The Bedrock of Type-Safe Applications" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Zod is more than just a validation library; it's a fundamental tool for building truly robust and type-safe TypeScript applications. By creating a single source of truth for your data structures, you eliminate an entire class of bugs, improve developer experience, and gain confidence that your data is exactly what you expect it to be, from your database all the way to your UI. It's an essential library for any serious TypeScript project." }] },
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
        { $set: { content: content } },
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

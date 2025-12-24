require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "TanStack Router: Type-Safe Routing for Modern Web Apps";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem with Traditional SPA Routers" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Most routers for Single-Page Applications (SPAs) are not type-safe. Route paths are just strings, and URL parameters are parsed as strings. This leads to common runtime errors, like typos in route paths or incorrect handling of search parameters. TanStack Router is a modern, framework-agnostic router designed from the ground up to solve these problems with first-class TypeScript support." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Core Features: Type-Safety and Search Params" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "TanStack Router's main innovation is making search parameters a core, type-safe feature. You define the validation logic for your search params, and the router handles the parsing, validation, and serialization automatically." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: "import { Route } from '@tanstack/react-router';\nimport { z } from 'zod';\n\n// Define a validation schema for search params using Zod\nconst productSearchSchema = z.object({\n  page: z.number().int().optional().default(1),\n  sortBy: z.enum(['price', 'name']).optional().default('name'),\n});\n\n// Create a route and attach the schema\nconst productsRoute = new Route({\n  getParentRoute: () => rootRoute,\n  path: '/products',\n  validateSearch: productSearchSchema,\n  component: function Products() {\n    // The `useSearch` hook returns fully typed and validated params!\n    const { page, sortBy } = productsRoute.useSearch();\n    // `page` is a number, `sortBy` is 'price' | 'name'\n    return <div>...</div>;\n  },\n});" }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "File-Based Routing (and more)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The router supports both traditional object-based route definitions and a file-based routing system similar to Next.js or Remix, where your file structure automatically defines your routes. This is a powerful convention that simplifies route management." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Key Benefits" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "100% Type-Safe: Eliminates an entire class of common routing bugs." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "First-Class Search Param APIs: Makes working with search params declarative and safe." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Built-in Data Fetching: Co-locates data fetching logic with your routes." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Framework Agnostic: Works with React, Solid, Vue, and Svelte." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "TanStack Router represents a new generation of routing libraries. By prioritizing type-safety and providing powerful, declarative APIs for common tasks like search param management and data fetching, it helps developers build more robust, maintainable, and bug-free web applications." }] },
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

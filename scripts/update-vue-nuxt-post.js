require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Building Full-Stack Apps with Nuxt.js: An Introduction";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Vue on Steroids: What is Nuxt.js?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Nuxt.js is a powerful, open-source framework built on top of Vue.js. While Vue is excellent for building client-side Single-Page Applications (SPAs), Nuxt extends it to enable full-stack development. It provides the structure and tooling needed to build server-side rendered (SSR), static-site generated (SSG), and highly optimized Vue applications with ease. For developers looking to build famous, SEO-friendly, and high-performance Vue apps, Nuxt.js is the ultimate tool." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Key Features That Will Make Your App Famous" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "File-based Routing:", bold: true }, { type: 'text', text: " No more manual router configuration. Simply create `.vue` files in your `pages/` directory, and Nuxt automatically creates the routes for you." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Server-Side Rendering (SSR):", bold: true }, { type: 'text', text: " Nuxt pre-renders your pages on the server, sending fully-formed HTML to the browser. This is a massive boost for SEO and perceived performance." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Data Fetching:", bold: true }, { type: 'text', text: " Nuxt provides powerful composables like `useFetch` that work on both the server and client, simplifying data fetching logic." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Server Routes:", bold: true }, { type: 'text', text: " Create your own API endpoints directly within your Nuxt project in the `server/api/` directory. True full-stack development in one place." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: Creating an API and Fetching Data" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Create a Server API Route" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Any file in `server/api/` becomes an API endpoint. Let's create one to return a list of products." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// server/api/products.js\nexport default defineEventHandler(async (event) => {\n  return [\n    { id: 1, name: 'Viral T-Shirt' },\n    { id: 2, name: 'Famous Mug' },\n  ];\n});` }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Fetch and Display Data in a Page" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, create a page component and use the `useFetch` composable to get the data from your new API endpoint." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `<template>\n  <div>\n    <h1>Our Famous Products</h1>\n    <div v-if="pending">Loading...</div>\n    <ul v-else>\n      <li v-for="product in products" :key="product.id">\n        {{ product.name }}\n      </li>\n    </ul>\n  </div>\n</template>\n\n<script setup>\nconst { pending, data: products } = await useFetch('/api/products');\n</script>` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Because Nuxt is server-rendering this page, the data will be fetched on the server, and the final HTML sent to the browser will already contain the product list. This is perfect for SEO and a fast initial load." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: The Full-Stack Vue Solution" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Nuxt.js takes Vue to the next level, transforming it from a client-side library into a powerful full-stack framework. Its conventions and powerful features like file-based routing and universal data fetching streamline the development of complex, SEO-friendly, and high-performance applications. For any serious Vue developer aiming to build a viral web presence, mastering Nuxt.js is not just an option—it's a necessity." }] }
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

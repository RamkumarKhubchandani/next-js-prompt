require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Introduction to Vue Router for SPA Navigation";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Building a Single-Page Application (SPA) with Vue" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Modern web applications often behave like desktop applications, where navigating between different sections doesn't require a full page reload. This is the core idea of a Single-Page Application (SPA), and Vue Router is the official, powerful library that makes it possible in Vue. It allows you to map your components to different URL 'routes' and seamlessly transition between them." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Basic Setup" }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Define Your Route Components" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "First, you need the components that will be rendered for each route." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// components/Home.vue\n<template><h1>Home Page</h1></template>\n\n// components/About.vue\n<template><h1>About Page</h1></template>` }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Create the Router Instance" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Next, you create a router instance and define your route mappings." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// router/index.js\nimport { createRouter, createWebHistory } from 'vue-router';\nimport Home from '../components/Home.vue';\nimport About from '../components/About.vue';\n\nconst routes = [\n  { path: '/', component: Home },\n  { path: '/about', component: About },\n];\n\nconst router = createRouter({\n  history: createWebHistory(),\n  routes,\n});\n\nexport default router;` }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 3: Plug the Router into Your App" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Finally, you tell your main Vue app to use the router instance." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// main.js\nimport { createApp } from 'vue';\nimport App from './App.vue';\nimport router from './router';\n\ncreateApp(App).use(router).mount('#app');` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Using `<router-link>` and `<router-view>`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now that the router is set up, you use two special components in your main `App.vue` template:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`<router-link>`:", bold: true }, { type: 'text', text: " This is the component for creating navigation links. It renders an `<a>` tag but prevents the default browser refresh." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`<router-view>`:", bold: true }, { type: 'text', text: " This is a placeholder that renders the component for the current route." }] }] }
        ]},
        { type: 'codeBlock', attrs: { language: 'html' }, content: [{ type: 'text', text: `<!-- App.vue -->\n<template>\n  <div id="app">\n    <nav>\n      <router-link to="/">Home</router-link> |\n      <router-link to="/about">About</router-link>\n    </nav>\n    <router-view></router-view>\n  </div>\n</template>` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Vue Router provides a complete and powerful solution for client-side routing. By defining your routes and using the `<router-link>` and `<router-view>` components, you can effortlessly create a fast, fluid, and professional Single-Page Application experience for your users." }] }
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

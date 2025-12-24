require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "State Management with Pinia: The Official Vue Store";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Evolution of Vue State Management" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For a long time, Vuex was the standard for state management in Vue. However, with the rise of the Composition API, a new, simpler, and more intuitive solution was needed. Pinia is the new official state management library for Vue. It's incredibly lightweight, fully supports TypeScript, and its API is much easier to learn and use than Vuex, making it the recommended choice for all new Vue applications." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Core Concepts of a Pinia Store" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A Pinia 'store' is a container that holds your global application state. It's built around three key concepts:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`state`:", bold: true }, { type: 'text', text: " A function that returns the initial state of your store (similar to `data` in a component)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`getters`:", bold: true }, { type: 'text', text: " Computed properties for your store. They are perfect for calculating derived state." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`actions`:", bold: true }, { type: 'text', text: " Methods that can mutate the state. They can be synchronous or asynchronous." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Creating and Using a Store" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's create a simple counter store." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// stores/counter.js\nimport { defineStore } from 'pinia';\n\nexport const useCounterStore = defineStore('counter', {\n  state: () => ({\n    count: 0,\n  }),\n  getters: {\n    doubleCount: (state) => state.count * 2,\n  },\n  actions: {\n    increment() {\n      this.count++;\n    },\n  },\n});` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Using this store in any component is incredibly simple. Just import the store and call it like a hook." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `<template>\n  <div>\n    <p>Count: {{ counter.count }}</p>\n    <p>Double Count: {{ counter.doubleCount }}</p>\n    <button @click="counter.increment">Increment</button>\n  </div>\n</template>\n\n<script setup>\nimport { useCounterStore } from '../stores/counter';\n\nconst counter = useCounterStore();\n</script>` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why Pinia is a Game Changer" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Simplicity:", bold: true }, { type: 'text', text: " The API is intuitive and requires very little boilerplate." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Type Safety:", bold: true }, { type: 'text', text: " Pinia has excellent TypeScript support out of the box." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "DevTools Support:", bold: true }, { type: 'text', text: " It integrates perfectly with the Vue DevTools for an amazing debugging experience." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Pinia represents the future of state management in Vue. Its simple, intuitive design, coupled with powerful features and excellent TypeScript support, makes managing global state a pleasant and straightforward experience. For any developer starting a new Vue project, Pinia is the clear and recommended choice for state management." }] }
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

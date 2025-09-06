require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Vue's Reactivity System Explained: ref and reactive";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Magic of Vue: Reactivity" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Vue's core feature is its powerful and intuitive reactivity system. When you declare a piece of data as 'reactive', Vue watches it for changes. When the data changes, any part of your application that uses this data automatically updates. This is what makes building dynamic interfaces so effortless. In the Vue 3 Composition API, there are two main ways to create reactive state: `ref()` and `reactive()`." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Creating Reactive Primitives with `ref()`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `ref()` function is used to create a reactive variable for any primitive value, like a string, number, or boolean. It wraps the value in an object, and to access or change the value, you need to use the `.value` property." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `<template>\n  <button @click="increment">Count is: {{ count }}</button>\n</template>\n\n<script setup>\nimport { ref } from 'vue';\n\nconst count = ref(0); // Create a reactive reference\n\nfunction increment() {\n  count.value++; // Access the value with .value\n}\n</script>` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Note: In the template (`<template>`), Vue automatically 'unwraps' the ref for you, so you can just write `{{ count }}` instead of `{{ count.value }}`." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Creating Reactive Objects with `reactive()`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `reactive()` function is used to create a reactive proxy for an object or array. Unlike `ref()`, you don't need to use `.value` to access its properties. The object itself becomes reactive." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `<template>\n  <div>\n    <p>{{ user.name }} is {{ user.age }}</p>\n    <button @click="celebrateBirthday">Celebrate Birthday</button>\n  </div>\n</template>\n\n<script setup>\nimport { reactive } from 'vue';\n\nconst user = reactive({\n  name: 'John Doe',\n  age: 30,\n});\n\nfunction celebrateBirthday() {\n  user.age++; // Directly mutate the property\n}\n</script>` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "`ref` vs. `reactive`: When to Use Which?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is a common question for newcomers. Here's a simple guideline:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Use `ref()` for:", bold: true }, { type: 'text', text: " primitive values (String, Number, Boolean) and when you might need to reassign the entire variable." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Use `reactive()` for:", bold: true }, { type: 'text', text: " complex objects or arrays where you'll be mutating their properties." }] }] }
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "Many developers prefer to use `ref()` for everything for consistency, which is also a perfectly valid approach." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Vue's reactivity system, powered by `ref` and `reactive`, is what makes it so enjoyable to work with. It abstracts away the complexity of keeping your UI in sync with your data. By understanding how to use these two functions, you have mastered the fundamental concept of state management in the Vue 3 Composition API." }] }
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

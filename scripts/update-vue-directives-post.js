require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Conditional Rendering and List Rendering in Vue (v-if, v-for)";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Dynamically Controlling Your Template" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A core task in web development is showing or hiding elements and displaying lists of data. Vue provides a set of powerful and intuitive directives to handle these tasks directly in your template. The most common and essential of these are `v-if` for conditional rendering and `v-for` for list rendering." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conditional Rendering with `v-if`, `v-else-if`, and `v-else`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `v-if` directive is used to conditionally render a block of HTML. The block will only be rendered if the directive's expression returns a truthy value. You can also chain `v-else-if` and `v-else` to create more complex conditional logic." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `<template>\n  <div v-if="type === 'A'">Type A</div>\n  <div v-else-if="type === 'B'">Type B</div>\n  <div v-else>Not A or B</div>\n</template>\n\n<script setup>\nimport { ref } from 'vue';\n\nconst type = ref('A');\n</script>` }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "`v-if` vs. `v-show`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "There is also a `v-show` directive. The key difference is that `v-if` is 'real' conditional rendering because it ensures that the element is not in the DOM at all if the condition is false. `v-show` always renders the element and simply toggles its CSS `display` property. Use `v-if` if you need to toggle something infrequently, and `v-show` if you need to toggle it very often." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "List Rendering with `v-for`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `v-for` directive is used to render a list of items based on an array. It uses a special syntax in the form of `item in items`, where `items` is the source data array and `item` is an alias for the element being iterated on." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `<template>\n  <ul>\n    <li v-for="todo in todos" :key="todo.id">\n      {{ todo.text }}\n    </li>\n  </ul>\n</template>\n\n<script setup>\nimport { ref } from 'vue';\n\nconst todos = ref([\n  { id: 1, text: 'Learn Vue' },\n  { id: 2, text: 'Build a project' },\n  { id: 3, text: 'Deploy to production' },\n]);\n</script>` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `:key` attribute is crucial. It gives Vue a way to track each node's identity, and thus to reuse and reorder existing elements. This is essential for performance and predictable behavior, especially when manipulating the list." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Using `v-for` with an Object" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You can also use `v-for` to iterate over the properties of an object." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `<ul>\n  <li v-for="(value, key, index) in myObject" :key="key">\n    {{ index }}. {{ key }}: {{ value }}\n  </li>\n</ul>` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "`v-if` and `v-for` are two of the most fundamental directives in Vue. They provide a declarative and highly readable way to manipulate the DOM based on your application's state. Mastering their usage, including understanding the importance of the `:key` attribute and the difference between `v-if` and `v-show`, is a key step to becoming a proficient Vue developer." }] }
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

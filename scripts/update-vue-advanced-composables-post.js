require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Creating Advanced Reusable Components with Vue 3's Composition API";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "From Components to Component Libraries" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Building a viral application means building a consistent, high-quality user interface. The key to this is creating truly reusable components. The Vue 3 Composition API gives us the power to build components that are more flexible, scalable, and easier to maintain than ever before. This guide explores advanced patterns for creating components that can form the foundation of a world-class component library." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Pattern 1: Headless Components with `v-slot`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A headless component contains all the logic but none of its own styling or markup for the final output. It uses scoped slots (`v-slot`) to give the parent component complete control over rendering. This is the ultimate pattern for reusability." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's build a `SearchSelect` component that handles the logic of fetching and filtering a list, but lets the parent decide how to display it." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `<!-- SearchSelect.vue (Headless Component) -->\n<script setup>\nimport { ref, computed } from 'vue';\n\nconst props = defineProps({ items: Array });\nconst searchTerm = ref('');\n\nconst filteredItems = computed(() => \n  props.items.filter(item => item.toLowerCase().includes(searchTerm.value.toLowerCase()))\n);\n</script>\n\n<template>\n  <div>\n    <input type="text" v-model="searchTerm" placeholder="Search..." />\n    <!-- The parent component will provide the template for the slot -->\n    <slot :filteredItems="filteredItems" :searchTerm="searchTerm"></slot>\n  </div>\n</template>` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now a parent can use this logic with completely custom markup:" }] },
        { type: 'codeBlock', attrs: { language: 'html' }, content: [{ type: 'text', text: `<template>\n  <SearchSelect :items="['Apple', 'Banana', 'Cherry']" v-slot="{ filteredItems, searchTerm }">\n    <p v-if="searchTerm">Searching for: {{ searchTerm }}</p>\n    <ul>\n      <li v-for="item in filteredItems" :key="item">{{ item }}</li>\n    </ul>\n  </SearchSelect>\n</template>` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Pattern 2: Composable Functions (Custom Hooks)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For pure logic that doesn't need a template, we can extract it into a 'composable' function. This is Vue's equivalent of a React hook. Let's create a composable to track mouse position." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// composables/useMousePosition.js\nimport { ref, onMounted, onUnmounted } from 'vue';\n\nexport function useMousePosition() {\n  const x = ref(0);\n  const y = ref(0);\n\n  function update(event) {\n    x.value = event.pageX;\n    y.value = event.pageY;\n  }\n\n  onMounted(() => window.addEventListener('mousemove', update));\n  onUnmounted(() => window.removeEventListener('mousemove', update));\n\n  return { x, y };\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, any component can easily use this reactive logic:" }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `<template>\n  Mouse position is at: {{ x }}, {{ y }}\n</template>\n\n<script setup>\nimport { useMousePosition } from './composables/useMousePosition';\n\nconst { x, y } = useMousePosition();\n</script>` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Build a Design System" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "By mastering advanced patterns like headless components and composable functions, you move beyond building individual pages and start creating a robust, reusable design system. This is the secret to scaling large applications, maintaining a consistent brand, and building the kind of polished, high-quality user interfaces that make an application famous. These techniques are essential for any serious Vue developer." }] }
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Vue Components: Props, Events, and Slots";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Building Blocks of Vue Applications" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Components are the heart of any Vue application. They are reusable, self-contained instances that can have their own state, markup, and logic. A complex UI can be broken down into a tree of nested components. Understanding how these components communicate is essential for building scalable applications. The three primary methods of communication are Props, Events, and Slots." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "1. Passing Data Down with Props" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Props (short for properties) are how you pass data from a parent component down to a child component. This is a one-way data flow. The child component should never mutate a prop directly." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `<!-- ChildComponent.vue -->\n<template>\n  <p>{{ message }}</p>\n</template>\n\n<script setup>\n// Define the props the component accepts\ndefineProps({\n  message: String,\n});\n</script>\n\n<!-- ParentComponent.vue -->\n<template>\n  <ChildComponent message="Hello from the parent!" />\n</template>\n\n<script setup>\nimport ChildComponent from './ChildComponent.vue';\n</script>` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "2. Sending Data Up with Events (`$emit`)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To send data or communicate from a child component back up to its parent, the child emits a custom event. The parent component can then listen for this event and react accordingly." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `<!-- ChildComponent.vue -->\n<template>\n  <button @click="notifyParent">Notify Parent</button>\n</template>\n\n<script setup>\n// Define the events the component can emit\nconst emit = defineEmits(['child-event']);\n\nfunction notifyParent() {\n  emit('child-event', 'Some data from the child');\n}\n</script>\n\n<!-- ParentComponent.vue -->\n<template>\n  <ChildComponent @child-event="handleChildEvent" />\n  <p>Message from child: {{ childMessage }}</p>\n</template>\n\n<script setup>\nimport { ref } from 'vue';\nimport ChildComponent from './ChildComponent.vue';\n\nconst childMessage = ref('');\n\nfunction handleChildEvent(message) {\n  childMessage.value = message;\n}\n</script>` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "3. Flexible Content with Slots" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Slots are a powerful mechanism for content distribution. They allow a parent component to pass template fragments into a child component. This is incredibly useful for creating generic, reusable components like modals or cards." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `<!-- BaseCard.vue (Child) -->\n<template>\n  <div class="card">\n    <div class="card-header">\n      <slot name="header"></slot> <!-- Named slot -->\n    </div>\n    <div class="card-body">\n      <slot></slot> <!-- Default slot -->\n    </div>\n  </div>\n</template>\n\n<!-- ParentComponent.vue -->\n<template>\n  <BaseCard>\n    <template #header>\n      <h2>Card Title</h2>\n    </template>\n    <template #default>\n      <p>This is the main content of the card.</p>\n    </template>\n  </BaseCard>\n</template>\n\n<script setup>\nimport BaseCard from './BaseCard.vue';\n</script>` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Mastering the flow of data between components is a fundamental Vue skill. Remember this simple rule: 'Props down, events up'. Use props to pass data to children, and use events to communicate back to parents. For maximum flexibility in your component's structure and content, use slots. Together, these three concepts provide everything you need to build complex and well-structured Vue applications." }] }
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

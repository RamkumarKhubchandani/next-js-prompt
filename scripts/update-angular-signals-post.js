require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "The Power of Angular Signals: A Modern Approach to Reactivity";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Future of Angular is Signal-Based" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Angular Signals are the biggest evolution in the framework's reactivity model in years. They offer a new way to manage state that is more efficient and intuitive than the traditional zone.js-based approach. Signals allow Angular to know exactly what has changed in your application, enabling fine-grained, ultra-performant updates to the DOM. Mastering Signals is the key to building the next generation of world-class Angular applications." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Core Primitives of Angular Signals" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`signal()`:", bold: true }, { type: 'text', text: " Creates a new signal, which is a wrapper around a value that can notify interested consumers when it changes." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`computed()`:", bold: true }, { type: 'text', text: " Creates a new signal that derives its value from other signals. The computed signal automatically updates when its dependencies change." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`effect()`:", bold: true }, { type: 'text', text: " Schedules a side effect to run whenever one or more signal values change. Perfect for logging, network requests, or updating third-party libraries." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Practical Example: A Dynamic Shopping Cart" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `import { Component, signal, computed, effect } from '@angular/core';\n\n@Component({\n  selector: 'app-cart',\n  standalone: true,\n  template: \`\n    <h2>My Cart</h2>\n    <p>Quantity: {{ quantity() }}</p>\n    <p>Price: $\{{ price() }}</p>\n    <p>Total: $\{{ total() }}</p>\n    <button (click)="addToCart()">Add Item</button>\n  \`\n})\nexport class CartComponent {\n  // 1. Create writable signals for the core state\n  quantity = signal(1);\n  price = signal(10);\n\n  // 2. Create a computed signal for the total\n  total = computed(() => this.quantity() * this.price());\n\n  constructor() {\n    // 3. Create an effect to log changes\n    effect(() => console.log(\`New total is: \${this.total()}\`));\n  }\n\n  addToCart() {\n    // To change the value, use the .set() or .update() method\n    this.quantity.update(q => q + 1);\n  }\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why is this a Game-Changer for Performance?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In this example, when `addToCart()` is called, only the `quantity` signal changes. The `computed` signal for `total` sees this and recalculates. The `effect` sees that `total` has changed and re-runs. Most importantly, Angular knows *precisely* which parts of the template need to be updated. It doesn't need to check the entire component. This surgical precision is what makes Signals so incredibly fast." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Embrace the Future" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Angular Signals provide a simpler and more efficient way to build reactive applications. By explicitly defining your state and its dependencies, you enable the framework to make highly optimized updates, leading to faster and more responsive user experiences. Adopting Signals is a critical step for any developer aiming to build high-performance, viral web applications with the latest version of Angular." }] }
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

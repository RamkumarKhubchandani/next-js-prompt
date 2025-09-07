require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "The `satisfies` Operator: A Game Changer for TypeScript Type Safety";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem: Losing Specificity" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A common issue in TypeScript is when you want to ensure an object conforms to a certain type, but you don't want to lose the specific literal types of its properties. Using a standard type annotation often 'widens' the type, losing valuable information." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `type Color = 'red' | 'green' | 'blue';\ntype RGB = [number, number, number];\n\n// Our goal: Ensure all keys are valid Colors and all values are RGB arrays.\nconst palette: Record<Color, RGB> = {\n  red: [255, 0, 0],\n  green: [0, 255, 0],\n  blue: [0, 0, 255]\n};\n\n// The problem: We've lost the specific keys!\n// The type of 'palette' is just Record<Color, RGB>.\n// We can't access palette.red because TypeScript doesn't know for sure if 'red' exists.\n// const redValue = palette.red; // Error!` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `satisfies` operator, introduced in TypeScript 4.9, solves this problem perfectly." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Solution: `satisfies`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "`satisfies` lets you validate that an expression matches a certain type without changing the inferred type of that expression. It's the best of both worlds: you get to keep the specific literal types while also ensuring the object's shape is correct." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `type Color = 'red' | 'green' | 'blue';\ntype RGB = [number, number, number];\n\nconst palette = {\n  red: [255, 0, 0],\n  green: [0, 255, 0],\n  blue: [0, 0, 255]\n} satisfies Record<Color, RGB>;\n\n// No error! The type of 'palette' is inferred as:\n// {\n//   red: [number, number, number];\n//   green: [number, number, number];\n//   blue: [number, number, number];\n// }\nconst redValue = palette.red; // Works perfectly!\n\n// And we still get validation!\nconst invalidPalette = {\n  red: [255, 0, 0],\n  cyan: [0, 255, 255] // Error: 'cyan' was not expected in type 'Record<Color, RGB>'.\n} satisfies Record<Color, RGB>;` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How Does It Work?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Think of `satisfies` as a non-destructive check. A type annotation (`const x: Type = ...`) tells TypeScript, 'Forget what you know, `x` is of `Type`.' In contrast, `satisfies` tells TypeScript, 'Hey, just double-check that this expression fits the shape of `Type`, but keep the specific type you already inferred.' This allows you to access properties directly while still getting the safety of the broader type check." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Common Use Cases" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Configuration Objects: Ensure a config object has all the required properties without losing the specific values." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Theme Definitions: As seen in the `palette` example, perfect for design systems." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Feature Flags: Validate a set of feature flags while still being able to access each flag by its specific name." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: A Simple, Powerful Addition" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `satisfies` operator is a simple but incredibly effective tool for improving type safety in everyday TypeScript code. By allowing you to validate an object against a broader type while preserving its specific inferred type, it closes a common gap in type safety and leads to more robust and self-documenting code. It's a modern feature that every TypeScript developer should have in their toolkit." }] },
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

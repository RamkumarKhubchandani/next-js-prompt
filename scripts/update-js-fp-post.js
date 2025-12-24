require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Functional Programming Patterns in Modern JavaScript";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Beyond Objects: Thinking in Data Transformations" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Functional Programming (FP) is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data. In JavaScript, we can adopt functional patterns to write more predictable, declarative, and maintainable code. Instead of telling the computer *how* to do something (imperative), we describe *what* we want (declarative)." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Core Concepts: Pure Functions and Immutability" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Pure Functions: A pure function is a function that, given the same input, will always return the same output and has no side effects. It doesn't modify any external state (like a global variable or an object passed by reference). This makes them easy to test and reason about." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Immutability: Not changing data in place. When you need to modify an object or array, you create a new one with the updated values. JavaScript's spread syntax (`...`) and array methods like `.map()` and `.filter()` are key tools for this." }] }] },
        ]},
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Impure function with a side effect\nlet total = 0;\nfunction addToTotal(x) {\n  total += x; // Modifies external state\n  return total;\n}\n\n// Pure function\nfunction add(x, y) {\n  return x + y; // No side effects\n}\n\n// Mutable data modification\nconst user = { name: 'Alice' };\nuser.name = 'Bob'; // Mutated!\n\n// Immutable data modification\nconst user1 = { name: 'Alice' };\nconst user2 = { ...user1, name: 'Bob' }; // user1 is unchanged` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Pattern 1: Function Composition" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Function composition is the process of combining two or more functions to produce a new function. In JavaScript, we can create a `compose` or `pipe` utility to make this elegant." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);\n\nconst toUpperCase = (str) => str.toUpperCase();\nconst exclaim = (str) => \`\${str}!\`;\nconst reverse = (str) => str.split('').reverse().join('');\n\nconst shoutAndReverse = pipe(\n  toUpperCase,\n  exclaim,\n  reverse\n);\n\nconsole.log(shoutAndReverse('hello')); // '!OLLEH'` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This declarative style is often easier to read than nested function calls. The upcoming Pipe Operator (`|>`) will make this syntax native to JavaScript." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Pattern 2: Higher-Order Functions" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A higher-order function is a function that either takes one or more functions as arguments, or returns a function as its result. The classic examples in JavaScript are `.map()`, `.filter()`, and `.reduce()`." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const numbers = [1, 2, 3, 4, 5];\n\n// Declarative approach using higher-order functions\nconst result = numbers\n  .filter(n => n % 2 !== 0) // Keep odd numbers\n  .map(n => n * 2)      // Double them\n  .reduce((acc, n) => acc + n, 0); // Sum them\n\nconsole.log(result); // 18 ( (1*2) + (3*2) + (5*2) )` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: A Paradigm for Clarity" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Adopting functional programming patterns in your JavaScript code can lead to significant improvements in readability, testability, and maintainability. By focusing on pure functions, immutable data, and declarative patterns like composition and higher-order functions, you can write code that is less prone to bugs and easier to reason about. As the JavaScript language continues to evolve with features like the Pipe Operator, the functional style is set to become an even more central and powerful part of modern web development." }] },
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

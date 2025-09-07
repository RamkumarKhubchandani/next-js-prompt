require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "TypeScript Generics Explained: From Basics to Advanced Patterns";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why Generics? The Problem of Reusability" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Imagine you need a function that returns the first element of an array. You could write one for numbers and another for strings, but that's repetitive. You could use `any`, but then you lose all type safety. This is the problem generics solve. Generics allow us to write functions, classes, and types that can work with any type, while still preserving type information and safety." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The 'Hello World' of Generics: The Identity Function" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A generic identity function is a function that takes an argument and returns it. The key is that it preserves the exact type of the argument." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `function identity<T>(arg: T): T {\n  return arg;\n}\n\n// TypeScript infers the type of T from the argument\nlet output1 = identity('hello'); // Type is 'hello'\nlet output2 = identity(123);     // Type is 123\n\n// We can also explicitly set the type\nlet output3 = identity<string>('world'); // Type is string` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `<T>` syntax declares a 'type variable' `T`. We use `T` to denote the type of the argument and the return value. When we call the function, `T` is replaced with the actual type of the argument, giving us full type safety." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Generic Constraints: Adding a 'Where' Clause for Types" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Sometimes, we want to write a generic function that only works on types with certain properties. We can do this with generic constraints using the `extends` keyword." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `interface WithLength {\n  length: number;\n}\n\n// T must be a type that has a 'length' property of type number\nfunction logLength<T extends WithLength>(arg: T): void {\n  console.log(arg.length);\n}\n\nlogLength('hello'); // OK, string has a length property\nlogLength([1, 2, 3]); // OK, array has a length property\n// logLength(123);      // Error: number does not have a 'length' property` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Advanced Pattern 1: Using Type Parameters in Generic Constraints" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You can use one type parameter to constrain another. This is useful for ensuring that a key exists on an object." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nlet myObj = { a: 1, b: 2, c: 3 };\n\nlet propA = getProperty(myObj, 'a'); // Type is number\n// let propD = getProperty(myObj, 'd'); // Error: 'd' is not a key of myObj` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Here, `K extends keyof T` ensures that the `key` argument is a valid key of the `obj` argument. The return type `T[K]` is a lookup type, which correctly resolves to the type of the property." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Advanced Pattern 2: Generic Classes" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Classes can also be generic, allowing you to create type-safe data structures." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `class GenericBox<T> {\n  private contents: T;\n\n  constructor(initialValue: T) {\n    this.contents = initialValue;\n  }\n\n  getValue(): T {\n    return this.contents;\n  }\n}\n\nconst stringBox = new GenericBox('hello');\nconst numBox = new GenericBox(42);\n\nlet strValue: string = stringBox.getValue(); // OK\n// let numValue: number = stringBox.getValue(); // Error: Type 'string' is not assignable to type 'number'.` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: The Foundation of Reusable, Safe Code" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Generics are a cornerstone of TypeScript. They are the primary tool for writing code that is both highly reusable and strictly type-safe. Understanding how to use type variables, constraints, and apply them to functions and classes will dramatically improve the quality, robustness, and maintainability of your TypeScript code." }] },
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

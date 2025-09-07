require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Mastering Advanced Conditional Types in TypeScript";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Unlocking Dynamic Types: An Introduction" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Conditional types are one of TypeScript's most powerful features, allowing you to create types that change based on other types. They are the foundation of many advanced patterns and utility types. The basic syntax is just like a ternary operator in JavaScript, but for types:" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `type IsString<T> = T extends string ? 'yes' : 'no';\n\ntype A = IsString<string>; // 'yes'\ntype B = IsString<number>; // 'no'` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This simple concept unlocks incredible capabilities, especially when combined with generics." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The `infer` Keyword: The Key to Extraction" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The true power of conditional types is unlocked with the `infer` keyword. It allows you to 'capture' a part of a type within the `extends` clause and use it in the 'true' branch of the conditional." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's create a type that extracts the return type of a function:" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\n\ntype MyFunc = () => number;\n\ntype MyFuncReturnType = GetReturnType<MyFunc>; // number` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Here, `infer R` declares a new generic type variable `R` that captures whatever the function returns. If `T` is a function, we return `R`; otherwise, we return `never`, a special type that indicates an impossible state." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Distributive Conditional Types: Automatic Looping" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When the type you check in a conditional type is a 'naked' generic type parameter (like `T` and not `T[]` or `Promise<T>`), it becomes 'distributive'. This means if you pass a union type to it, the conditional will be applied to each member of the union individually, and the results will be unioned together." }] },
        { type:- 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `type ToArray<T> = T extends any ? T[] : never;\n\ntype MyUnion = string | number;\n\ntype Result = ToArray<MyUnion>; // string[] | number[]` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Because `T` is a naked type parameter, `ToArray<string | number>` becomes `ToArray<string> | ToArray<number>`, which resolves to `string[] | number[]`. This is an incredibly powerful feature for manipulating union types." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To prevent this behavior, you can wrap the generic in a tuple:" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `type ToArrayNonDistributive<T> = [T] extends [any] ? T[] : never;\n\ntype Result2 = ToArrayNonDistributive<MyUnion>; // (string | number)[]` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Practical Example: The `Exclude` Utility Type" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's see how TypeScript's built-in `Exclude<T, U>` utility type works. Its job is to remove types from `T` that are assignable to `U`. Its definition is surprisingly simple:" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `type Exclude<T, U> = T extends U ? never : T;` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's trace it:" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `type MyTypes = 'a' | 'b' | 'c';\n\n// How TypeScript evaluates Exclude<MyTypes, 'a' | 'b'>\n// 1. Distributive rule applies:\n//    ('a' extends 'a' | 'b' ? never : 'a') |\n//    ('b' extends 'a' | 'b' ? never : 'b') |\n//    ('c' extends 'a' | 'b' ? never : 'c')\n\n// 2. Evaluate each conditional:\n//    (never) |\n//    (never) |\n//    ('c')\n\n// 3. Final result:\n//    'c'\n\ntype MyResult = Exclude<MyTypes, 'a' | 'b'>; // 'c'` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: The Key to Type Manipulation" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Mastering conditional types, especially with `infer` and understanding distributivity, is the key to unlocking the full potential of TypeScript. It allows you to write smarter, more dynamic, and more reusable types that can adapt to the shape of your code. Almost all advanced utility types are built on these fundamental concepts, making them an essential skill for any serious TypeScript developer." }] },
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

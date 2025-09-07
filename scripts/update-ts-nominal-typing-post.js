require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Simulating Nominal Typing in TypeScript for Stronger Type Safety";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem with Structural Typing" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "TypeScript's type system is 'structural' (also known as 'duck typing'). This means if two types have the same shape, they are considered compatible. While this is often flexible and useful, it can sometimes lead to logical errors. For example, a `UserID` and a `PostID` might both be strings, but they represent fundamentally different concepts and should never be used interchangeably." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `type UserID = string;\ntype PostID = string;\n\nfunction getUser(id: UserID) { /* ... */ }\n\nconst myPostId: PostID = 'post-123';\n\n// This is a logical error, but TypeScript allows it!\n// The shapes are the same (both are strings).\ngetUser(myPostId);` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Nominal typing, by contrast, checks the explicit name of the type. `UserID` would not be compatible with `PostID`, even if they are both strings. While TypeScript doesn't have native nominal typing, we can simulate it using a technique called 'branding'." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Solution: Branded Types" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Branding (or tagging) involves adding a unique, non-existent property to a type. This makes the type's shape unique, breaking structural compatibility without changing the underlying base type." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// A generic helper type for branding\ntype Brand<K, T> = K & { __brand: T };\n\n// Create our nominally-typed IDs\ntype UserID = Brand<string, 'UserID'>;\ntype PostID = Brand<string, 'PostID'>;\n\nfunction getUser(id: UserID) {\n  console.log('Fetching user with ID:', id);\n}\n\n// We must cast our primitive types to the branded type\nconst myUserId = 'user-abc' as UserID;\nconst myPostId = 'post-123' as PostID;\n\n// This works perfectly!\ngetUser(myUserId);\n\n// This now causes a TypeScript error, as desired!\n// Error: Argument of type 'PostID' is not assignable to parameter of type 'UserID'.\n//   Type 'PostID' is not assignable to type '{ __brand: "UserID"; }'.\n//     Types of property '__brand' are incompatible.\n//       Type '"PostID"' is not assignable to type '"UserID"'.\n// getUser(myPostId);` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How Does It Work?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `Brand<K, T>` type uses an intersection (`&`) to combine the base type `K` (e.g., `string`) with a unique shape `{ __brand: T }`. The `__brand` property doesn't actually exist at runtime—it's a compile-time construct purely for the benefit of the type checker. Because `getUser` expects a `__brand` of `'UserID'` and `myPostId` has a `__brand` of `'PostID'`, TypeScript correctly identifies them as incompatible." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The only 'cost' of this technique is that you must use a type assertion (`as UserID`) when creating a value of the branded type from a primitive. This is a small price to pay for the immense increase in type safety for critical primitives like IDs." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "When to Use Branded Types" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Branding is most effective for primitive types (`string`, `number`) that represent specific domain concepts:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Database IDs (`UserID`, `ProductID`, `OrderID`)" }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Units of measurement (`Meters`, `Seconds`, `Kilograms`)" }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Specialized strings (`EmailAddress`, `URL`, `UUID`)" }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "Using this pattern prevents you from accidentally passing a weight in kilograms to a function expecting a length in meters, for example." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: A Powerful Tool for Robustness" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While structural typing is one of TypeScript's core strengths, simulating nominal typing with branded types is a powerful technique for advanced developers. It allows you to enforce domain-specific constraints at compile time, eliminating a whole class of logical errors and making your codebase significantly more robust, readable, and safe. It's an essential pattern for building mission-critical applications in TypeScript." }] },
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

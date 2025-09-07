require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Introduction to Type-Level Programming in TypeScript";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Beyond Validation: Types as Code" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Most developers think of TypeScript's type system as a tool for validation. But what if we could use the type system itself to perform computations? This is the mind-bending world of type-level programming. It involves using TypeScript's advanced features, like conditional and recursive types, to execute logic at compile time. This isn't about running your application; it's about making the compiler prove that your types are logically sound based on complex rules." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Building Blocks: Conditional and Recursive Types" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The engine for type-level programming is the combination of conditional types (`A extends B ? C : D`) and recursion. By creating a type that calls itself under certain conditions, we can create 'loops' and 'counters' that are evaluated by the TypeScript compiler." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: A Type-Level Counter" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's build a type that generates a tuple of a specific length. This is a classic example of type-level programming." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// Our recursive type-level function\ntype BuildTuple<L extends number, T extends any[] = []> =\n  // Check if the length of our accumulator T is equal to the target length L\n  T['length'] extends L \n    // If it is, we're done, return T\n    ? T \n    // Otherwise, recurse, adding a new element to T\n    : BuildTuple<L, [...T, any]>;\n\n// Usage\ntype TupleOfThree = BuildTuple<3>; // [any, any, any]\ntype TupleOfFive = BuildTuple<5>; // [any, any, any, any, any]\n\nt// TypeScript will even give an error for excessive recursion!\n// type TooBig = BuildTuple<1000>; // Error: Type instantiation is excessively deep and possibly infinite.` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's break it down:" }] },
        { type: 'orderedList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`BuildTuple<L, T extends any[] = []>`: Defines a generic type that takes a target length `L` and an 'accumulator' tuple `T`, which defaults to an empty array." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`T['length'] extends L`: This is our termination condition. We check if the length of the accumulator `T` has reached the target length `L`." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`? T`: If the condition is met, we return the accumulator `T`." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`: BuildTuple<L, [...T, any]>` If not, we call `BuildTuple` again (recursion), passing along our target length `L` and a new accumulator that includes all previous elements of `T` plus one new element." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why Is This Useful?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "While creating a tuple counter might seem academic, these techniques are the foundation for libraries that perform incredible feats of static analysis. For example:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "JSON Parsers: Libraries that can parse a JSON string literal at the type level and give you a fully typed object." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Type-Safe Routers: Routers that parse URL path strings like `/users/:id` and know that the `id` parameter is a string." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "SQL Query Builders: Tools that parse an SQL string and can tell you the exact return shape of your database query at compile time." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Pushing the Boundaries of Static Analysis" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Type-level programming is an advanced, mind-bending topic that pushes TypeScript to its absolute limits. While you may not use it directly in your day-to-day application code, understanding its principles gives you a profound appreciation for the power of the TypeScript compiler. It's what enables the most powerful, type-safe libraries in the ecosystem and represents the final frontier of static type analysis." }] },
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

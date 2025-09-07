require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Advanced Error Handling with Discriminated Unions";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem with `throw new Error()`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In JavaScript and TypeScript, the standard way to handle errors is by throwing `Error` objects. While this works, it has a major drawback: the type system has no idea what kind of error might be thrown. Any `catch` block receives an error of type `unknown` or `any`, forcing you to use `instanceof` checks and losing the benefits of static analysis. We can do much better by returning our errors as data, using the power of discriminated unions." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Result Type Pattern" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Instead of throwing errors, we can have our functions return a 'Result' type. A Result will always be one of two states: a `Success` state containing the data, or a `Failure` state containing a specific, typed error. This pattern is powered by discriminated unions." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// 1. Define the success and failure states\ntype Success<T> = { success: true; data: T };\ntype Failure<E> = { success: false; error: E };\n\n// 2. Create the Result union type\ntype Result<T, E> = Success<T> | Failure<E>;\n\n// 3. Define our specific, typed errors\ntype UserNotFoundError = { type: 'UserNotFound'; message: string };\ntype DatabaseConnectionError = { type: 'DatabaseError'; message: string };\n\n// Our function will return a Result that can succeed with a User object\n// or fail with one of our specific error types.\ntype UserResult = Result<User, UserNotFoundError | DatabaseConnectionError>;` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Implementing a Type-Safe Function" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, our function's signature explicitly declares its possible success and failure outcomes. The function will never throw; it will always return a `Result` object." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `declare function findUserById(id: string): UserResult;\n\n// --- Function implementation example ---\nfunction findUserById(id: string): UserResult {\n  try {\n    // const dbConnected = connectToDatabase();\n    // if (!dbConnected) {\n      return { success: false, error: { type: 'DatabaseError', message: 'Could not connect' } };\n    // }\n\n    // const user = db.users.find(id);\n    // if (!user) {\n    //   return { success: false, error: { type: 'UserNotFound', message: \`User \${id} not found\` } };\n    // }\n    \n    // return { success: true, data: user };\n  } catch (e) {\n    return { success: false, error: { type: 'DatabaseError', message: 'An unknown error occurred' } };\n  }\n}` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Handling the Result with Exhaustiveness" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When we call this function, we get a value that we can inspect. TypeScript's type narrowing works perfectly, allowing us to handle each success and error case with full type safety." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `const result = findUserById('123');\n\nif (result.success) {\n  // TypeScript knows 'result.data' exists and is a User\n  console.log('Found user:', result.data.name);\n} else {\n  // TypeScript knows 'result.error' exists and is one of our defined error types\n  switch (result.error.type) {\n    case 'UserNotFound':\n      console.error('User not found:', result.error.message);\n      break;\n    case 'DatabaseError':\n      console.error('Database error:', result.error.message);\n      break;\n    default:\n      // The compiler will error here if we forget to handle a new error type!\n      const exhaustiveCheck: never = result.error;\n      break;\n  }\n}` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: From Runtime Uncertainty to Compile-Time Confidence" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "By using discriminated unions to model success and error states, you transform error handling from a runtime guessing game into a predictable, compile-time-checked process. This pattern makes your code incredibly robust, self-documenting, and eliminates an entire class of bugs related to unhandled exceptions. It is a cornerstone of building resilient, mission-critical applications in TypeScript." }] },
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Building a Type-Safe State Machine in TypeScript";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem: Impossible States" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In many applications, we deal with data that can be in one of several states. For example, a data fetch can be 'idle', 'loading', 'success', or 'error'. A common but flawed approach is to use boolean flags like `isLoading`, `isSuccess`, `isError`. This can lead to impossible states. What does it mean if `isLoading` and `isError` are both `true`? To prevent these bugs, we can use a state machine, and TypeScript's advanced features make it possible to build one that is completely type-safe." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Core Pattern: Discriminated Unions" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The key to a type-safe state machine in TypeScript is the discriminated union. This is a union of object types that all share a common, literal property (the 'discriminant'), which TypeScript can use to narrow down the exact type within the union." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// 1. Define the individual states as types\ntype IdleState = { status: 'idle' };\ntype LoadingState = { status: 'loading' };\ntype SuccessState<T> = { status: 'success', data: T };\ntype ErrorState = { status: 'error', error: Error };\n\n// 2. Create the discriminated union of all possible states\ntype FetchState<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Here, `status` is our discriminant. If `state.status` is `'success'`, TypeScript knows that `state` must also have a `data` property. If it's `'error'`, it must have an `error` property. It is now impossible to represent a state where data fetching is both loading and in an error state." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Handling States Exhaustively" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "TypeScript's control flow analysis can use the discriminant to ensure you handle every possible case. A `switch` statement is perfect for this. If you miss a case, TypeScript will raise a compile-time error." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `function handleState<T>(state: FetchState<T>) {\n  switch (state.status) {\n    case 'idle':\n      console.log('Ready to fetch.');\n      break;\n    case 'loading':\n      console.log('Loading...');\n      break;\n    case 'success':\n      // TypeScript knows state.data exists here!\n      console.log('Success!', state.data);\n      break;\n    case 'error':\n      // TypeScript knows state.error exists here!\n      console.error('Error:', state.error.message);\n      break;\n    default:\n      // This part makes sure you've handled every case.\n      // If you add a new state, TypeScript will error here.\n      const exhaustiveCheck: never = state;\n      return exhaustiveCheck;\n  }\n}` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Practical Example: A React Fetch Component" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's see this in a React component. We can use `useReducer` to manage the state transitions." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// Define actions for state transitions\ntype FetchAction<T> =\n  | { type: 'FETCH' }\n  | { type: 'RESOLVE', data: T }\n  | { type: 'REJECT', error: Error };\n\nfunction fetchReducer<T>(state: FetchState<T>, action: FetchAction<T>): FetchState<T> {\n  switch (action.type) {\n    case 'FETCH':\n      return { status: 'loading' };\n    case 'RESOLVE':\n      return { status: 'success', data: action.data };\n    case 'REJECT':\n      return { status: 'error', error: action.error };\n    default:\n      return state;\n  }\n}\n\nfunction MyDataComponent() {\n  const [state, dispatch] = useReducer(fetchReducer, { status: 'idle' });\n\n  const fetchData = () => {\n    dispatch({ type: 'FETCH' });\n    // ... perform fetch ...\n    // .then(data => dispatch({ type: 'RESOLVE', data }))\n    // .catch(error => dispatch({ type: 'REJECT', error }));\n  }\n  \n  // ... render UI based on state.status ...\n}` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Modeling Logic with Confidence" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Building state machines with discriminated unions is a powerful design pattern in TypeScript. It forces you to think clearly about the possible states your application can be in and the valid transitions between them. By leveraging the compiler to enforce these rules, you can eliminate a huge category of runtime errors, making your code more predictable, robust, and easier to refactor with confidence." }] },
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

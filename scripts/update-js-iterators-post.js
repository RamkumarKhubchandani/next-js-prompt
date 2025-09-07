require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "A Deep Dive into the JavaScript Iterator and Generator Protocols";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Power of `for...of`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Have you ever wondered what makes it possible to use a `for...of` loop on an Array, a String, or a Map? The answer is the 'iteration protocol'. It's a fundamental concept in JavaScript that defines a standard way for objects to be iterable. Mastering this protocol allows you to create your own custom iterable data structures." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Iterator Protocol Explained" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For an object to be iterable, it must implement the `@@iterator` method. This means the object (or one of the objects up its prototype chain) must have a property with a `Symbol.iterator` key. This method should return an 'iterator' object, which is an object with a `next()` method." }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `next()` method must return an object with two properties:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`value`: The next value in the sequence." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`done`: A boolean that is `true` if the last value in the sequence has been consumed." }] }] },
        ]},
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Manually creating an iterable object\nconst myIterable = {\n  [Symbol.iterator]: function() {\n    let count = 0;\n    return {\n      next: function() {\n        count++;\n        if (count <= 3) {\n          return { value: count, done: false };\n        } else {\n          return { value: undefined, done: true };\n        }\n      }\n    };\n  }\n};\n\nfor (const value of myIterable) {\n  console.log(value); // 1, 2, 3\n}` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Generators: A Simpler Syntax for Iterators" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Manually creating an iterator object is verbose. Generators provide a much cleaner syntax. A generator is a special type of function (`function*`) that can be paused and resumed, allowing it to produce a sequence of values over time." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// The same iterable, written with a generator\nfunction* myGenerator() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\n\nconst iterator = myGenerator();\n\nconsole.log(iterator.next()); // { value: 1, done: false }\nconsole.log(iterator.next()); // { value: 2, done: false }\n\n// We can use it directly in a for...of loop!\nfor (const value of myGenerator()) {\n  console.log(value); // 1, 2, 3\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `yield` keyword pauses the function's execution and returns a value. When `next()` is called again, the function resumes from where it left off. A `function*` automatically returns an iterator object that conforms to the protocol." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Practical Use Case: Lazy Data Fetching" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Generators are perfect for handling 'lazy' data streams, where you don't want to load everything into memory at once. For example, we can create a generator that fetches paginated API data one page at a time." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `async function* getPaginatedData(url) {\n  let nextPageUrl = url;\n  while (nextPageUrl) {\n    const response = await fetch(nextPageUrl);\n    const data = await response.json();\n    nextPageUrl = data.nextPage;\n    yield data.results;\n  }\n}\n\n// Usage\n(async () => {\n  for await (const pageOfUsers of getPaginatedData('/api/users')) {\n    // Process one page of users at a time without loading the whole list\n    console.log('Processing page:', pageOfUsers);\n  }\n})();` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Note the `async function*` and `for await...of` syntax, which are the asynchronous versions of the protocol, perfect for working with Promises and APIs." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Unlocking Advanced Data Structures" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The iteration and generator protocols are fundamental, powerful features of modern JavaScript. They provide the foundation for how we process sequences of data. While you may not write custom iterators every day, understanding how they work under the hood gives you a deeper appreciation for the language and empowers you to build highly efficient, custom data structures and handle complex, lazy, and asynchronous data streams with elegance." }] },
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

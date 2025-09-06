require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const samplePost = {
    title: "Mastering Async/Await in JavaScript: A Beginner's Guide",
    category: 'JavaScript',
    isPremium: false,
    seo: {
        metaTitle: "JavaScript Async/Await Tutorial: Easy Guide for Beginners | JSPrompt",
        metaDescription: "Learn how to use async/await in JavaScript to write clean, readable, and efficient asynchronous code. This guide provides clear examples for beginners.",
        keywords: "javascript, async, await, asynchronous, promises, tutorial, beginners, guide, code example, frontend development",
    },
    content: {
        type: 'doc',
        content: [
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is Asynchronous JavaScript?" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "Before diving into async/await, it's crucial to understand what asynchronous code is. By default, JavaScript runs code sequentially, one line at a time. This is called synchronous execution. But what if a task takes a long time, like fetching data from a server? A synchronous approach would freeze the entire program until that task is complete. Asynchronous JavaScript allows these long-running tasks to happen in the background, without blocking the main thread, ensuring a smooth user experience." }] },
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Old Way: Callbacks and Promises" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "Initially, JavaScript used callback functions to handle asynchronous operations. However, this often led to a confusing, nested structure known as \"Callback Hell.\" Promises were introduced to clean this up, providing a more structured way to handle asynchronous results. A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation." }] },
            { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const fetchData = () => {\n  return new Promise((resolve, reject) => {\n    // Simulate fetching data\n    setTimeout(() => {\n      const data = { name: "John Doe", age: 30 };\n      resolve(data);\n      // or reject(new Error("Failed to fetch data"));\n    }, 2000);\n  });\n};\n\nfetchData()\n  .then(data => {\n    console.log("Data received:", data);\n  })\n  .catch(error => {\n    console.error("Error:", error);\n  });` }] },
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Introducing Async/Await: Syntactic Sugar for Promises" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "Async/await is modern syntax that makes working with Promises even easier and more intuitive. It's essentially \"syntactic sugar\" on top of Promises, allowing you to write asynchronous code that looks and feels synchronous. This makes it much easier to read and maintain." }] },
            { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "The `async` Keyword" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "The `async` keyword is placed before a function declaration to turn it into an async function. An async function always returns a Promise. If the function returns a value, the Promise will be resolved with that value." }] },
            { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "The `await` Keyword" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "`await` can only be used inside an `async` function. It pauses the execution of the function and waits for the Promise to resolve. Once the Promise is resolved, it \"unwraps\" the value and resumes the function's execution." }] },
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Simple Example" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "Let's rewrite our `fetchData` example using async/await:" }] },
            { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const fetchData = () => {\n  return new Promise(resolve => {\n    setTimeout(() => {\n      resolve({ name: "Jane Doe", age: 28 });\n    }, 2000);\n  });\n};\n\nconst displayData = async () => {\n  console.log("Fetching data...");\n  const data = await fetchData(); // Pauses here until the promise resolves\n  console.log("Data received:", data);\n};\n\ndisplayData();` }] },
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Error Handling with `try...catch`" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "One of the best features of async/await is that it allows you to handle errors from asynchronous operations using the familiar `try...catch` block, just like you would with synchronous code." }] },
            { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const potentiallyFailingFetch = async () => {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    if (!response.ok) {\n      throw new Error(\`HTTP error! status: \${response.status}\`);\n    }\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error("Could not fetch data:", error);\n  }\n};\n\npotentiallyFailingFetch();` }] },
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "Async/await is a powerful feature in modern JavaScript that simplifies asynchronous programming. By allowing you to write promise-based code as if it were synchronous, it makes your code cleaner, more readable, and easier to debug. Master this, and you'll be well on your way to becoming a more effective JavaScript developer!" }] },
        ],
    }
};

const generateSlug = (title) => {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

async function addSamplePost() {
  if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    const adminUser = await User.findOne({ email: ADMIN_EMAIL });
    if (!adminUser) {
        console.error(`Error: Admin user with email ${ADMIN_EMAIL} not found.`);
        process.exit(1);
    }
    
    let slug = generateSlug(samplePost.title);
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
        slug = `${slug}-${Date.now()}`;
    }

    const newPostData = {
        postID: `post-${Date.now()}`,
        title: samplePost.title,
        content: samplePost.content,
        category: samplePost.category,
        slug,
        author: adminUser._id,
        isPremium: samplePost.isPremium,
        metaTitle: samplePost.seo.metaTitle,
        metaDescription: samplePost.seo.metaDescription,
        keywords: samplePost.seo.keywords,
    };

    await Post.create(newPostData);
    console.log('Successfully created sample post:');
    console.log(`Title: ${samplePost.title}`);
    console.log(`Category: ${samplePost.category}`);
    console.log(`Slug: ${slug}`);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

addSamplePost();

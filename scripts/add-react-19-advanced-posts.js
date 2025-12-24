require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const newPosts = [
    {
        title: "React 19: Goodbye forwardRef, Hello Clean Refs",
        slug: "react-19-ref-improvements",
        description: "React 19 removes the need for forwardRef and allows cleanup functions in ref callbacks. Learn the new patterns.",
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The End of forwardRef" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "For years, passing a ref to a child component required the awkward `forwardRef` wrapper. In React 19, `ref` is just a prop. It's cleaner, easier to type, and less boilerplate." }] },
                { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// React 19\nfunction MyInput({ ref, ...props }) {\n  return <input ref={ref} {...props} />;\n}` }] },
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Ref Cleanup Functions" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "You can now return a cleanup function from a ref callback, exactly like `useEffect`. This is perfect for managing DOM observers." }] },
                { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `<div ref={node => {\n  const observer = new ResizeObserver(...);\n  observer.observe(node);\n  return () => observer.disconnect();\n}} />` }] }
            ]
        }
    },
    {
        title: "React 19: Native Metadata & Asset Loading",
        slug: "react-19-metadata-assets",
        description: "Stop using React Helmet. React 19 natively handles <title>, <meta>, and resource preloading.",
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Metadata Hoisting" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "React 19 automatically moves `<title>`, `<meta>`, and `<link>` tags to the document `<head>`, even if they are rendered deep inside your component tree." }] },
                { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `function BlogPost() {\n  return (\n    <article>\n      <title>My Post</title>\n      <meta name="description" content="Read this..." />\n      <h1>Content</h1>\n    </article>\n  );\n}` }] },
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Asset Preloading" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "New APIs like `preload`, `preinit` allow you to hint the browser about critical resources earlier in the lifecycle." }] }
            ]
        }
    },
    {
        title: "Mastering the 'use' API in React 19",
        slug: "react-19-use-api-deep-dive",
        description: "A deep dive into the new `use` API. Learn how to unwrap Promises and read Context conditionally.",
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Universal Resource Unwrapping" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "The `use` API is a new primitive that allows you to read the value of a resource like a Promise or Context." }] },
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conditional Context" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "Unlike `useContext`, `use` can be called inside `if` statements and loops." }] },
                { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `if (show) {\n  const theme = use(ThemeContext);\n  return <ThemedUI theme={theme} />;\n}` }] },
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Streaming Data" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "Pass a Promise from a Server Component to a Client Component and unwrap it with `use(promise)`. React will suspend automatically." }] }
            ]
        }
    }
];

async function seedPosts() {
    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI is not defined');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB.');

        const adminUser = await User.findOne({ email: ADMIN_EMAIL });
        if (!adminUser) {
            console.error('Admin user not found');
            process.exit(1);
        }

        for (const post of newPosts) {
            await Post.findOneAndUpdate(
                { slug: post.slug },
                {
                    $set: {
                        title: post.title,
                        content: post.content,
                        category: 'React',
                        author: adminUser._id,
                        isPremium: true,
                        metaTitle: post.title + " | JSPrompt",
                        metaDescription: post.description
                    },
                    $setOnInsert: {
                        postID: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
                    }
                },
                { upsert: true, new: true }
            );
            console.log(`Seeded: ${post.title}`);
        }

    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

seedPosts();








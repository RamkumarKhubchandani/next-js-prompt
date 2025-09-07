require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Building Streaming UIs in Next.js with Suspense and Server Components";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Ultimate User Experience: Instant UIs" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "What if you could show your users meaningful content *instantly*, even before all your data has finished loading? This is the power of Streaming UIs. Instead of waiting for the slowest data fetch on a page to finish before rendering anything, Next.js allows you to send the static parts of the UI immediately, and then 'stream' in the dynamic content as it becomes ready. This is achieved using two core React features: Server Components and Suspense." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem: The All-or-Nothing Waterfall" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Without streaming, if a page has three components that each need to fetch data, the user sees nothing until the *slowest* of the three is complete. This creates a poor user experience. Streaming with Suspense solves this." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How It Works: Suspense Boundaries" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "You can wrap a slow data-fetching component with the `<Suspense>` boundary. This tells React not to wait for that component to load. Instead, it will render a fallback UI (like a loading spinner) in its place immediately. When the data for the wrapped component is ready, React will stream the finished component down to the client and seamlessly replace the fallback." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: Streaming a User Dashboard" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Imagine a dashboard page with a static sidebar and two dynamic sections: user details (fast) and user posts (slow)." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// page.js\nimport { Suspense } from 'react';\nimport { UserDetails, UserPosts, PostsSkeleton } from './components';\n\nexport default function Dashboard() {\n  return (\n    <section>\n      <h1>My Dashboard</h1>\n      <Sidebar />\n\n      {/* UserDetails will render immediately */}\n      <UserDetails />\n\n      {/* The UI will not wait for UserPosts */}\n      {/* A loading skeleton is shown instead */}\n      <Suspense fallback={<PostsSkeleton />}>\n        <UserPosts />\n      </Suspense>\n    </section>\n  );\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In this scenario, the user instantly sees the Dashboard title, the Sidebar, the User Details, and the Posts Skeleton. As soon as the `UserPosts` component finishes its slow data fetch, React streams in the final HTML, and the skeleton is replaced with the real posts. The user experience is vastly improved." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Build for the Modern Web" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Streaming UIs with Suspense and Server Components is a revolutionary pattern for web performance. It allows you to deliver a better, faster user experience by prioritizing critical content and progressively loading the rest. Mastering this technique is essential for any developer who wants to build truly viral, modern, and high-performance applications with React and Next.js. It's the key to delighting users and dominating search rankings." }] }
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
        { $set: { content: updatedContent } },
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

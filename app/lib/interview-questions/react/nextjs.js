export const nextjsQuestions = [
  {
    id: 'react-next-1',
    category: 'Next.js',
    difficulty: 'Hard',
    question: 'Next.js App Router vs Pages Router - Complete Comparison',
    answer: `Critical for **Next.js interviews** at Vercel and modern companies.

### Pages Router (Legacy):
- File-based routing in /pages
- getServerSideProps, getStaticProps
- Client Components by default
- _app.js for layout

### App Router (New):
- File-based routing in /app
- Server Components by default
- Nested layouts
- Streaming and Suspense
- Server Actions

### Migration Strategy:
- Incremental adoption
- Both can coexist
- Move route by route

### When to Use App Router:
- New projects (recommended)
- Need Server Components
- Want better performance
- Complex layouts`,
    codeExample: `// Next.js App Router vs Pages Router
console.log('=== Pages Router (Legacy) ===');

console.log('File structure:');
console.log('pages/');
console.log('  ├─ index.js → /');
console.log('  ├─ about.js → /about');
console.log('  ├─ blog/');
console.log('  │  ├─ index.js → /blog');
console.log('  │  └─ [slug].js → /blog/:slug');
console.log('  └─ _app.js (layout)');

console.log('\\nData fetching:');
console.log('export async function getServerSideProps(context) {');
console.log('  const data = await fetchData();');
console.log('  return { props: { data } };');
console.log('}');
console.log('');
console.log('export default function Page({ data }) {');
console.log('  return <div>{data.title}</div>;');
console.log('}');

console.log('\\n=== App Router (New) ===');

console.log('\\nFile structure:');
console.log('app/');
console.log('  ├─ page.js → /');
console.log('  ├─ layout.js (root layout)');
console.log('  ├─ about/');
console.log('  │  └─ page.js → /about');
console.log('  └─ blog/');
console.log('     ├─ page.js → /blog');
console.log('     ├─ layout.js (blog layout)');
console.log('     └─ [slug]/');
console.log('        └─ page.js → /blog/:slug');

console.log('\\nServer Component (default):');
console.log('// app/blog/page.js');
console.log('export default async function BlogPage() {');
console.log('  const posts = await fetchPosts(); // Direct async!');
console.log('  return posts.map(post => <Post key={post.id} {...post} />);');
console.log('}');

console.log('\\nClient Component:');
console.log('// app/components/Counter.js');
console.log('"use client"; // Opt into client');
console.log('');
console.log('export default function Counter() {');
console.log('  const [count, setCount] = useState(0);');
console.log('  return <button onClick={() => setCount(count + 1)}>{count}</button>;');
console.log('}');

console.log('\\n=== Nested Layouts ===');

console.log('\\nRoot layout (app/layout.js):');
console.log('export default function RootLayout({ children }) {');
console.log('  return (');
console.log('    <html>');
console.log('      <body>');
console.log('        <Header />');
console.log('        {children}');
console.log('        <Footer />');
console.log('      </body>');
console.log('    </html>');
console.log('  );');
console.log('}');

console.log('\\nBlog layout (app/blog/layout.js):');
console.log('export default function BlogLayout({ children }) {');
console.log('  return (');
console.log('    <div className="blog-container">');
console.log('      <BlogSidebar />');
console.log('      <main>{children}</main>');
console.log('    </div>');
console.log('  );');
console.log('}');

console.log('\\n=== Comparison Table ===');

const comparison = {
  'Default': {
    'Pages': 'Client Components',
    'App': 'Server Components'
  },
  'Data Fetching': {
    'Pages': 'getServerSideProps',
    'App': 'async components'
  },
  'Layouts': {
    'Pages': '_app.js only',
    'App': 'Nested layouts'
  },
  'Streaming': {
    'Pages': 'No',
    'App': 'Yes (Suspense)'
  },
  'Performance': {
    'Pages': 'Good',
    'App': 'Better (RSC)'
  }
};

Object.entries(comparison).forEach(([feature, values]) => {
  console.log('\\n' + feature + ':');
  console.log('  Pages:', values.Pages);
  console.log('  App:', values.App);
});

console.log('\\n✓ App Router: modern, performant');
console.log('✓ Server Components by default');
console.log('✓ Better layouts and streaming');`
  },
  {
    id: 'react-next-2',
    category: 'Next.js',
    difficulty: 'Expert',
    question: 'Server Components vs Client Components - When to Use Each',
    answer: `Core Next.js concept asked at **Vercel and modern companies**.

### Server Components (Default):
**Run on server, send HTML to client**

**Benefits:**
- Zero JavaScript bundle
- Direct database access
- Secure (API keys safe)
- Better performance

**Use for:**
- Static content
- Data fetching
- SEO-critical pages

### Client Components ('use client'):
**Run in browser, interactive**

**Use for:**
- useState, useEffect, hooks
- Event handlers
- Browser APIs
- Third-party libraries

### Composition Pattern:
- Server Component wraps Client Component
- Pass Server Component as children
- Minimize client boundary`,
    codeExample: `// Server vs Client Components
console.log('=== Server Component (Default) ===');

console.log('// app/blog/page.js');
console.log('// No "use client" = Server Component');
console.log('');
console.log('export default async function BlogPage() {');
console.log('  // Direct database access!');
console.log('  const posts = await db.posts.findMany();');
console.log('  ');
console.log('  // Can use environment variables');
console.log('  const apiKey = process.env.SECRET_KEY;');
console.log('  ');
console.log('  return (');
console.log('    <div>');
console.log('      {posts.map(post => (');
console.log('        <article key={post.id}>');
console.log('          <h2>{post.title}</h2>');
console.log('          <p>{post.excerpt}</p>');
console.log('        </article>');
console.log('      ))}');
console.log('    </div>');
console.log('  );');
console.log('}');

console.log('\\nBenefits:');
console.log('  ✓ Zero JavaScript sent to client');
console.log('  ✓ Direct database/API access');
console.log('  ✓ Secure (secrets stay on server)');

console.log('\\n=== Client Component ===');

console.log('\\n// app/components/LikeButton.js');
console.log('"use client"; // Required for interactivity');
console.log('');
console.log('import { useState } from "react";');
console.log('');
console.log('export default function LikeButton({ postId }) {');
console.log('  const [liked, setLiked] = useState(false);');
console.log('  const [count, setCount] = useState(0);');
console.log('  ');
console.log('  const handleLike = async () => {');
console.log('    setLiked(!liked);');
console.log('    await fetch(`/ api / like / ${ postId }`, { method: "POST" });');
console.log('  };');
console.log('  ');
console.log('  return (');
console.log('    <button onClick={handleLike}>');
console.log('      {liked ? "❤️" : "🤍"} {count}');
console.log('    </button>');
console.log('  );');
console.log('}');

console.log('\\nNeeds "use client" because:');
console.log('  • Uses useState');
console.log('  • Has onClick handler');
console.log('  • Interactive');

console.log('\\n=== Composition Pattern ===');

console.log('\\n// Server Component');
console.log('export default async function BlogPost({ id }) {');
console.log('  const post = await fetchPost(id);');
console.log('  ');
console.log('  return (');
console.log('    <article>');
console.log('      <h1>{post.title}</h1>');
console.log('      <p>{post.content}</p>');
console.log('      ');
console.log('      {/* Client Component for interactivity */}');
console.log('      <LikeButton postId={id} />');
console.log('      <Comments postId={id} />');
console.log('    </article>');
console.log('  );');
console.log('}');

console.log('\\n=== Decision Tree ===');

console.log('\\nNeed interactivity (onClick, useState)?');
console.log('  → YES: Client Component ("use client")');
console.log('  → NO: Continue...');
console.log('');
console.log('Need browser APIs (localStorage, window)?');
console.log('  → YES: Client Component');
console.log('  → NO: Continue...');
console.log('');
console.log('Fetching data?');
console.log('  → YES: Server Component (better performance)');
console.log('  → NO: Server Component (default)');

console.log('\\n=== Bundle Size Impact ===');

console.log('\\nServer Component:');
console.log('  • 0 KB JavaScript');
console.log('  • Sends HTML only');

console.log('\\nClient Component:');
console.log('  • ~5 KB (React runtime)');
console.log('  • + component code');
console.log('  • + dependencies');

console.log('\\n✓ Default to Server Components');
console.log('✓ Use Client only when needed');
console.log('✓ Compose: Server wraps Client');`
  },
{
  id: 'react-next-3',
    category: 'Next.js',
      difficulty: 'Hard',
        question: 'Next.js Caching Strategies - Complete Guide',
          answer: `Performance-critical topic at **Vercel and production apps**.

### Caching Layers:
1. **Request Memoization** - Dedupe same request in render
2. **Data Cache** - Persistent across requests
3. **Full Route Cache** - Static HTML/RSC payload
4. **Router Cache** - Client-side cache

### Cache Control:
- \`revalidate\` - Time-based revalidation
- \`tags\` - On-demand revalidation
- \`cache: 'no-store'\` - Opt out
- \`dynamic = 'force-dynamic'\` - Always fresh

### Best Practices:
- Cache by default
- Revalidate appropriately
- Use tags for related data
- Opt out when needed`,
            codeExample: `// Next.js Caching Strategies
console.log('=== Request Memoization ===');

console.log('// Automatic deduplication');
console.log('async function getUser(id) {');
console.log('  console.log("Fetching user", id);');
console.log('  return fetch(\`/api/users/\${id}\`);');
console.log('}');
console.log('');
console.log('// Same render cycle');
console.log('async function Page() {');
console.log('  const user1 = await getUser(1); // Fetches');
console.log('  const user2 = await getUser(1); // Cached!');
console.log('  const user3 = await getUser(1); // Cached!');
console.log('  // Only 1 actual fetch');
console.log('}');

console.log('\\n=== Data Cache (Persistent) ===');

console.log('\\n// Default: Cache forever');
console.log('async function getPosts() {');
console.log('  const res = await fetch("https://api.example.com/posts");');
console.log('  return res.json();');
console.log('}');
console.log('// Cached until revalidated');

console.log('\\n// Time-based revalidation');
console.log('async function getPosts() {');
console.log('  const res = await fetch("https://api.example.com/posts", {');
console.log('    next: { revalidate: 3600 } // Revalidate every hour');
console.log('  });');
console.log('  return res.json();');
console.log('}');

console.log('\\n// Opt out of caching');
console.log('async function getPosts() {');
console.log('  const res = await fetch("https://api.example.com/posts", {');
console.log('    cache: "no-store" // Always fresh');
console.log('  });');
console.log('  return res.json();');
console.log('}');

console.log('\\n=== Tag-Based Revalidation ===');

console.log('\\n// Tag data for revalidation');
console.log('async function getPost(id) {');
console.log('  const res = await fetch(\`/api/posts/\${id}\`, {');
console.log('    next: { tags: ["posts", \`post-\${id}\`] }');
console.log('  });');
console.log('  return res.json();');
console.log('}');

console.log('\\n// Revalidate on-demand');
console.log('// app/api/revalidate/route.js');
console.log('import { revalidateTag } from "next/cache";');
console.log('');
console.log('export async function POST(request) {');
console.log('  const { tag } = await request.json();');
console.log('  revalidateTag(tag); // Invalidate all with this tag');
console.log('  return Response.json({ revalidated: true });');
console.log('}');

console.log('\\n// Trigger revalidation');
console.log('await fetch("/api/revalidate", {');
console.log('  method: "POST",');
console.log('  body: JSON.stringify({ tag: "posts" })');
console.log('});');

console.log('\\n=== Route Segment Config ===');

console.log('\\n// Force dynamic (no caching)');
console.log('// app/dashboard/page.js');
console.log('export const dynamic = "force-dynamic";');
console.log('');
console.log('export default async function Dashboard() {');
console.log('  const data = await fetchRealTimeData();');
console.log('  return <div>{data}</div>;');
console.log('}');

console.log('\\n// Revalidate entire route');
console.log('export const revalidate = 60; // Every 60 seconds');

console.log('\\n=== Caching Decision Tree ===');

console.log('\\nIs data user-specific?');
console.log('  → YES: cache: "no-store" or dynamic');
console.log('  → NO: Continue...');
console.log('');
console.log('Does data change frequently?');
console.log('  → YES: Short revalidate (60s) or no-store');
console.log('  → NO: Long revalidate (3600s) or default');
console.log('');
console.log('Need on-demand revalidation?');
console.log('  → YES: Use tags + revalidateTag');
console.log('  → NO: Use time-based revalidate');

console.log('\\n✓ Cache by default for performance');
console.log('✓ Revalidate appropriately');
console.log('✓ Use tags for on-demand updates');`
},
{
  id: 'react-next-4',
    category: 'Next.js',
      difficulty: 'Expert',
        question: 'Server Actions - Form Handling and Mutations',
          answer: `Next.js 14+ feature asked at **modern companies**.

### What are Server Actions?
Functions that run on the server, called from client.

**Benefits:**
- No API routes needed
- Progressive enhancement
- Type-safe with TypeScript
- Automatic revalidation

### Use Cases:
- Form submissions
- Data mutations
- File uploads
- Database operations

### Best Practices:
- Validate input
- Handle errors
- Revalidate cache
- Return meaningful data
- Use with useFormStatus`,
            codeExample: `// Server Actions
console.log('=== Basic Server Action ===');

console.log('// app/actions.js');
console.log('"use server"; // Mark as server action');
console.log('');
console.log('export async function createPost(formData) {');
console.log('  const title = formData.get("title");');
console.log('  const content = formData.get("content");');
console.log('  ');
console.log('  // Validate');
console.log('  if (!title || !content) {');
console.log('    return { error: "Title and content required" };');
console.log('  }');
console.log('  ');
console.log('  // Save to database');
console.log('  const post = await db.posts.create({');
console.log('    data: { title, content }');
console.log('  });');
console.log('  ');
console.log('  // Revalidate cache');
console.log('  revalidatePath("/blog");');
console.log('  ');
console.log('  return { success: true, postId: post.id };');
console.log('}');

console.log('\\n=== Using Server Action in Form ===');

console.log('\\n// app/blog/new/page.js');
console.log('import { createPost } from "@/app/actions";');
console.log('');
console.log('export default function NewPost() {');
console.log('  return (');
console.log('    <form action={createPost}>');
console.log('      <input name="title" required />');
console.log('      <textarea name="content" required />');
console.log('      <button type="submit">Create Post</button>');
console.log('    </form>');
console.log('  );');
console.log('}');

console.log('\\n// Progressive enhancement:');
console.log('// Works without JavaScript!');

console.log('\\n=== Client Component with useFormStatus ===');

console.log('\\n"use client";');
console.log('import { useFormStatus } from "react-dom";');
console.log('');
console.log('function SubmitButton() {');
console.log('  const { pending } = useFormStatus();');
console.log('  ');
console.log('  return (');
console.log('    <button type="submit" disabled={pending}>');
console.log('      {pending ? "Creating..." : "Create Post"}');
console.log('    </button>');
console.log('  );');
console.log('}');

console.log('\\n=== Programmatic Server Action ===');

console.log('\\n"use client";');
console.log('import { createPost } from "@/app/actions";');
console.log('import { useState } from "react";');
console.log('');
console.log('export default function CreatePostForm() {');
console.log('  const [result, setResult] = useState(null);');
console.log('  ');
console.log('  const handleSubmit = async (e) => {');
console.log('    e.preventDefault();');
console.log('    const formData = new FormData(e.target);');
console.log('    const result = await createPost(formData);');
console.log('    setResult(result);');
console.log('  };');
console.log('  ');
console.log('  return (');
console.log('    <form onSubmit={handleSubmit}>');
console.log('      {/* form fields */}');
console.log('      {result?.error && <p>{result.error}</p>}');
console.log('      {result?.success && <p>Post created!</p>}');
console.log('    </form>');
console.log('  );');
console.log('}');

console.log('\\n=== Error Handling ===');

console.log('\\n"use server";');
console.log('');
console.log('export async function deletePost(id) {');
console.log('  try {');
console.log('    await db.posts.delete({ where: { id } });');
console.log('    revalidatePath("/blog");');
console.log('    return { success: true };');
console.log('  } catch (error) {');
console.log('    console.error("Delete failed:", error);');
console.log('    return { error: "Failed to delete post" };');
console.log('  }');
console.log('}');

console.log('\\n=== Revalidation Strategies ===');

console.log('\\n// Revalidate specific path');
console.log('revalidatePath("/blog");');
console.log('');
console.log('// Revalidate by tag');
console.log('revalidateTag("posts");');
console.log('');
console.log('// Redirect after action');
console.log('redirect("/blog");');

console.log('\\n✓ Server Actions: no API routes needed');
console.log('✓ Progressive enhancement');
console.log('✓ Type-safe, automatic revalidation');`
}
];

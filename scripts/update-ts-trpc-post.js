require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Building Fully Type-Safe APIs with tRPC and Next.js";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The API Contract Problem" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For decades, building APIs has involved a manual contract. The backend team defines an endpoint (e.g., REST or GraphQL), and the frontend team consumes it. But what happens when the backend changes a field name or data type? The frontend breaks at runtime. tRPC solves this problem by eliminating the contract entirely. With tRPC, your API becomes a set of importable TypeScript functions, giving you full, static, end-to-end type safety." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How tRPC Works: No Code Generation, Just TypeScript" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "tRPC is not a new protocol. It uses HTTP for communication. Its magic lies in its router definition on the server and a special client on the frontend. The server's router type definition is automatically inferred and used by the client, so your frontend code knows the exact signature of every API procedure, including its inputs and outputs, without any code generation steps." }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Setting up the tRPC Backend in Next.js" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "First, you define your 'procedures' (queries and mutations) in a router. Let's create a simple API. Create `server/trpc.ts` for initialization and `server/routers/app.ts` for your main router." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// server/trpc.ts\nimport { initTRPC } from '@trpc/server';\nconst t = initTRPC.create();\nexport const router = t.router;\nexport const publicProcedure = t.procedure;` }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// server/routers/app.ts\nimport { router, publicProcedure } from '../trpc';\nimport { z } from 'zod';\n \n// This is our main app router.\nexport const appRouter = router({\n  // A public procedure that anyone can call\n  greeting: publicProcedure\n    // Validate the input using Zod\n    .input(z.object({ name: z.string() }))\n    .query(({ input }) => {\n      // This is the actual API logic\n      return \`Hello, \${input.name}!\`;\n    }),\n});\n \n// Export the router's type signature\nexport type AppRouter = typeof appRouter;` }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Creating the Next.js API Route Handler" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, we expose our `appRouter` through a standard Next.js API route. Create `app/api/trpc/[trpc]/route.ts`:" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app/api/trpc/[trpc]/route.ts\nimport { fetchRequestHandler } from '@trpc/server/adapters/fetch';\nimport { appRouter } from '@/server/routers/app';\n\nconst handler = (req: Request) =>\n  fetchRequestHandler({\n    endpoint: '/api/trpc',\n    req,\n    router: appRouter,\n    createContext: () => ({}), // Context can be used for auth, db connections, etc.\n  });\n\nexport { handler as GET, handler as POST };` }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 3: Setting up the Type-Safe Client" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "On the frontend, we need a tRPC client and a React Query provider to wrap our app. Create `lib/trpc-client.ts` and `lib/trpc-provider.tsx`." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// lib/trpc-client.ts\nimport { createTRPCReact } from '@trpc/react-query';\nimport type { AppRouter } from '@/server/routers/app';\n \nexport const trpc = createTRPCReact<AppRouter>();` }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// lib/trpc-provider.tsx\n'use client';\nimport { QueryClient, QueryClientProvider } from '@tanstack/react-query';\nimport { httpBatchLink } from '@trpc/client';\nimport React, { useState } from 'react';\nimport { trpc } from './trpc-client';\n\nexport function TRPCProvider({ children }: { children: React.ReactNode }) {\n  const [queryClient] = useState(() => new QueryClient());\n  const [trpcClient] = useState(() =>\n    trpc.createClient({\n      links: [\n        httpBatchLink({\n          url: '/api/trpc',\n        }),\n      ],\n    }),\n  );\n  return (\n    <trpc.Provider client={trpcClient} queryClient={queryClient}>\n      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>\n    </trpc.Provider>\n  );\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Don't forget to wrap your `RootLayout` with the `TRPCProvider`." }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 4: Calling the API with Full Type Safety" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now for the payoff. In any client component, you can call your API procedures with full auto-completion and type-checking." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app/page.tsx\n'use client';\nimport { trpc } from '@/lib/trpc-client';\n\nexport default function MyComponent() {\n  const { data, isLoading } = trpc.greeting.useQuery({ name: 'World' });\n  \n  if (isLoading) return <div>Loading...</div>;\n\n  // 'data' is fully typed as a string!\n  // If you mistype 'name' or provide a number, TypeScript will error.\n  return <div>{data}</div>;\n}` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: The Future of Full-Stack TypeScript" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "tRPC represents a paradigm shift in API development. By leveraging the power of TypeScript inference, it provides an unparalleled developer experience, eliminates an entire category of bugs, and makes refactoring a breeze. For full-stack TypeScript applications, especially within the Next.js ecosystem, tRPC is quickly becoming the new standard for building robust, maintainable, and delightful-to-work-with APIs." }] },
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

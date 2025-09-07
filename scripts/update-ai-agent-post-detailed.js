require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Building an AI Agent in React with Vercel's AI SDK 3.0";

const detailedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Ultimate Guide to Building an AI Agent from Scratch" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Agentic AI is the most significant shift in user interface design since the smartphone. Instead of users learning our software, our software will now learn from our users' goals. In this comprehensive, step-by-step guide, we will build a complete, production-ready AI agent in React and Next.js, powered by the industry-leading Vercel AI SDK 3.0. You will go from a blank folder to a deployed AI application that can use tools and generate its own UI." }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Prerequisites" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Node.js 18+ installed." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "An OpenAI API Key. You can get one from the OpenAI dashboard." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "A Vercel account for deployment (free)." }] }] },
        ]},

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Project Setup with Next.js" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "First, let's create a new Next.js application. Open your terminal and run:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npx create-next-app@latest ai-agent-app" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When prompted, choose the following options:" }, { type: 'text', text: " TypeScript: Yes, App Router: Yes, Tailwind CSS: Yes.", marks: [{ type: 'bold' }] }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Installing Dependencies" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Navigate into your new project and install the necessary libraries for our AI agent." }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "cd ai-agent-app\nnpm install ai openai zod" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 3: Setting Up Environment Variables" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Create a new file named `.env.local` in the root of your project. This file will securely store your OpenAI API key. Add the following line:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "OPENAI_API_KEY=your_openai_api_key_here" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Next.js automatically loads this file. Remember to add `.env.local` to your `.gitignore` file to keep your key secret." }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 4: The Core Logic - Creating a Server Action 'Tool'" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is where the magic happens. We will create a function that our AI can 'call'. For this example, we'll create a tool that can generate a stock market summary. Create a new file at `app/actions.tsx`:" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app/actions.tsx\n'use server'\n \nimport { createAI, getMutableAIState, render } from 'ai/rsc'\nimport { openai } from '@ai-sdk/openai'\nimport { z } from 'zod'\nimport { StockCard } from '@/components/StockCard' // We'll create this component next\n \nasync function getStockInfo(symbol: string) {\n  // In a real app, you'd fetch this from a stock API\n  return {\n    price: Math.floor(Math.random() * 1000),\n    delta: Math.floor(Math.random() * 100) - 50\n  }\n}\n \nexport async function submitUserMessage(userInput: string) {\n  'use server'\n \n  const aiState = getMutableAIState()\n  aiState.update([...aiState.get(), { role: 'user', content: userInput }])\n \n  const ui = render({\n    model: openai('gpt-4o'),\n    provider: openai,\n    messages: [{ role: 'system', content: 'You are a stock market assistant.' }, ...aiState.get()],\n    text: ({ content, done }) => {\n      if (done) {\n        aiState.done([...aiState.get(), { role: 'assistant', content }])\n      }\n      return <div>{content}</div>\n    },\n    tools: {\n      showStockInfo: {\n        description: 'Get stock information for a specific symbol',\n        parameters: z.object({ symbol: z.string() }).required(),\n        render: async function* ({ symbol }) {\n          yield <div>Loading stock info...</div>\n          const { price, delta } = await getStockInfo(symbol)\n          aiState.done([\n            ...aiState.get(),\n            {\n              role: 'assistant',\n              name: 'showStockInfo',\n              content: JSON.stringify({ symbol, price, delta })\n            }\n          ])\n          return <StockCard symbol={symbol} price={price} delta={delta} />\n        }\n      }\n    }\n  })\n \n  return { id: Date.now(), display: ui }\n}\n \nexport const AI = createAI({\n  actions: {\n    submitUserMessage\n  },\n  initialUIState: [],\n  initialAIState: []\n})\n` }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 5: Creating the UI Components" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The AI tool will render a `StockCard` component. Let's create it. Make a new directory `components` and add a file `StockCard.tsx`:" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// components/StockCard.tsx\n'use client'\n\nexport function StockCard({ symbol, price, delta }: { symbol: string, price: number, delta: number }) {\n  return (\n    <div className="p-4 border rounded-lg">\n      <h3 className="font-bold text-lg">{symbol.toUpperCase()}</h3>\n      <p>Price: \${price}</p>\n      <p className={delta > 0 ? 'text-green-500' : 'text-red-500'}>\n        Change: {delta > 0 ? '+' : ''}{delta}\n      </p>\n    </div>\n  )\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, let's build the main chat interface in `app/page.tsx`:" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app/page.tsx\n'use client'\n\nimport { useState } from 'react'\nimport { useActions, useUIState } from 'ai/rsc'\nimport { AI } from './actions'\n\nexport default function Page() {\n  const [inputValue, setInputValue] = useState('')\n  const [messages, setMessages] = useUIState<typeof AI>()\n  const { submitUserMessage } = useActions<typeof AI>()\n\n  return (\n    <div>\n      <div className="flex flex-col gap-4 p-4">\n        {messages.map((message) => (\n          <div key={message.id}>{message.display}</div>\n        ))}\n      </div>\n\n      <form\n        onSubmit={async (e) => {\n          e.preventDefault()\n          setMessages((currentMessages) => [\n            ...currentMessages,\n            { id: Date.now(), display: <div>{inputValue}</div> }\n          ])\n          const responseMessage = await submitUserMessage(inputValue)\n          setMessages((currentMessages) => [...currentMessages, responseMessage])\n          setInputValue('')\n        }} >\n        <input\n          placeholder="Ask about a stock symbol e.g., AAPL"\n          value={inputValue}\n          onChange={(e) => setInputValue(e.target.value)}\n          className="border p-2 w-full"\n        />\n      </form>\n    </div>\n  )\n}` }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 6: Wrapping the Root Layout" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For the AI state to be accessible throughout the app, we need to wrap our root layout in `app/layout.tsx` with the `AI` provider we created." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app/layout.tsx\nimport { AI } from './actions'\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body>\n        <AI>{children}</AI>\n      </body>\n    </html>\n  )\n}` }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 7: Running and Testing" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "That's it for the code! Run your development server:" }] },
        { type: 'codeBlock', attrs: { language: 'bash' }, content: [{ type: 'text', text: "npm run dev" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Open your browser to `http://localhost:3000`. Try typing in a stock symbol like 'TSLA' or 'GOOG'. You will see the AI first think, then show a loading state, and finally stream back the `StockCard` UI component. You have successfully built an AI agent!" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 8: Deployment to Vercel" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Deploying your agent is simple. First, push your code to a GitHub repository. Then, go to your Vercel dashboard, create a new project, and import your repository. Vercel will automatically detect it's a Next.js app. The final crucial step is to add your `OPENAI_API_KEY` in the Environment Variables section of your Vercel project settings. Once configured, Vercel will build and deploy your AI Agent to the world." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: You Are Now an AI Developer" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Congratulations. You have just built a sophisticated application that represents the absolute cutting-edge of web development. By understanding how to make an LLM use tools and generate UI, you have acquired the fundamental skill for the next decade of software engineering. Use this knowledge to build the next viral, agentic application." }] }
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
        { $set: { content: detailedContent } },
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

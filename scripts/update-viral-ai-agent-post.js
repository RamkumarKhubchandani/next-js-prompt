require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Building an AI Agent in React with Vercel's AI SDK 3.0";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Next Frontier of UI: Agentic Interfaces" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The future of user interfaces is not just about clicking buttons; it's about having a conversation. An 'Agentic UI' is a system where a user can state a goal in natural language, and an AI agent can understand that goal, use a set of available 'tools' to accomplish it, and stream back a rich, interactive UI representing the result. This is the most exciting trend in web development, and Vercel's AI SDK 3.0 provides the powerful tools to build these experiences in React today." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Core Concept: The AI Agent as a 'Tool User'" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The magic behind an AI agent is 'tool calling'. We don't just ask a Large Language Model (LLM) to respond with text; we give it access to a set of JavaScript functions (our 'tools'). The LLM can then decide which tools to call with which arguments to fulfill the user's request. For example, if a user asks, 'What's the weather in London?', the AI agent can decide to call your `getWeather('London')` function." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Building a Weather Agent with `useActions`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's build a simple agent that can fetch and display the weather. Vercel's AI SDK provides a powerful hook, `useActions`, that manages the entire complex workflow." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Define the 'Tool' (Your Function)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "First, we define a regular JavaScript function that gets the weather. We use `zod` to define the function's argument schema, which the AI will use to understand how to call it." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app/actions.js\n'use server';\nimport { z } from 'zod';\n\nexport async function getWeather(location) {\n  // ... fetch weather data from an API ...\n  return { temperature: '15°C', conditions: 'Cloudy' };\n}\n\nexport const getWeatherTool = {\n  description: 'Get the current weather for a specific location',\n  parameters: z.object({ location: z.string() }),\n  execute: getWeather,\n};` }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Create the Agentic UI Component" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `useActions` hook from the Vercel AI SDK handles everything: calling the LLM, interpreting the tool calls, executing your functions, and streaming the results." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// app/page.js\n'use client';\nimport { useActions } from 'ai/rsc';\nimport { getWeatherTool } from './actions';\n\nexport default function Chat() {\n  const { actions, submit } = useActions({\n    actions: { getWeather: getWeatherTool },\n  });\n\n  return (\n    <div>\n      {/* ... render chat history ... */}\n      <form onSubmit={e => submit(e)}>\n        <input name="prompt" placeholder="Ask about the weather..." />\n      </form>\n\n      {/* The AI SDK will automatically stream UI components here! */}\n      {actions.map((action, i) => \n        action.node\n      )}\n    </div>\n  );\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Generative UI: The Viral Component" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The most powerful part of this is that the LLM can decide to stream back not just text, but entire React components. When the `getWeather` tool is called, the AI SDK will automatically render a loading spinner, and once your function returns data, it can render a rich `WeatherCard` component with the results. This 'Generative UI' is the future of web interaction and the key to building an application that feels truly alive and intelligent." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Lead the Agentic Revolution" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Building AI agents is the hottest trend in software development. By combining the power of modern LLMs with the Vercel AI SDK in React, you can move beyond static forms and create dynamic, conversational, and truly 'agentic' experiences. Mastering this paradigm will place you at the absolute forefront of the industry and give you the skills to build the viral, next-generation applications that will define the future of the web." }] }
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "WebGPU: High-Performance Graphics and Computation in the Browser";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Next Generation of Graphics on the Web" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For over a decade, WebGL has been the standard for rendering 3D graphics in the browser. However, it was based on the aging OpenGL standard. WebGPU is the successor, a modern API designed from the ground up to work with today's powerful GPUs. It offers lower-level control, better performance by reducing driver overhead, and, most importantly, the ability to perform general-purpose GPU (GPGPU) computations, opening the door for machine learning, computer vision, and scientific computing directly in the browser." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Key Concepts: Adapters, Devices, and Pipelines" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "WebGPU is more verbose than WebGL because it gives you more explicit control. The main components are:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Adapter: Represents a physical GPU on the user's system." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Device: A logical connection to the GPU, used to create resources like buffers and textures." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Render Pipeline: A pre-configured set of operations that tells the GPU how to draw something. This includes 'shader' code, which is written in a new language called WGSL (WebGPU Shading Language)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Command Encoder: Records a sequence of commands (e.g., 'set pipeline', 'draw triangle') that are then submitted to the GPU to be executed." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: Initializing WebGPU" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's look at the boilerplate for getting a WebGPU device, which is the first step in any WebGPU application." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `async function initializeWebGPU(canvas) {\n  // 1. Check for WebGPU support\n  if (!navigator.gpu) {\n    throw new Error('WebGPU not supported on this browser.');\n  }\n\n  // 2. Request a GPU adapter\n  const adapter = await navigator.gpu.requestAdapter();\n  if (!adapter) {\n    throw new Error('No appropriate GPUAdapter found.');\n  }\n\n  // 3. Request a logical device\n  const device = await adapter.requestDevice();\n\n  // 4. Configure the canvas context\n  const context = canvas.getContext('webgpu');\n  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();\n  context.configure({\n    device: device,\n    format: presentationFormat,\n  });\n\n  return { device, context, presentationFormat };\n}\n\n// Usage:\n// const canvas = document.querySelector('canvas');\n// const { device } = await initializeWebGPU(canvas);` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Beyond Graphics: General-Purpose GPU (GPGPU)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The most revolutionary aspect of WebGPU is its first-class support for 'compute shaders'. These are small programs that run on the GPU, not for drawing, but for performing massively parallel computations. This unlocks the ability to run machine learning models (like TensorFlow.js's WebGPU backend), perform complex physics simulations, and process large datasets at speeds that are orders of magnitude faster than what's possible with JavaScript on the CPU." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: A New Platform for High-Performance Apps" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "WebGPU is more than just a new graphics API; it's a fundamental evolution of the web platform that brings the immense parallel processing power of modern GPUs to every browser. While its learning curve is steeper than WebGL, it unlocks a new class of applications, from next-generation 3D games and immersive experiences to in-browser AI and scientific computing. For developers looking to push the boundaries of web performance in 2025, WebGPU is the technology to watch." }] },
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

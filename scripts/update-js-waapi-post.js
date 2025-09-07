require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Mastering the Web Animations API (WAAPI) for Performant UIs";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "JavaScript-Powered Animation, Browser-Level Performance" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For years, JavaScript animations were often janky because they ran on the main thread, competing with other tasks. The Web Animations API (WAAPI) changes the game. It gives developers the power and flexibility of JavaScript to control animations, but hands off the actual rendering to the browser's high-performance compositor thread. This means you can create complex, dynamic, and interactive animations that run smoothly, just like native CSS animations." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Core of WAAPI: `.animate()`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The entry point to the WAAPI is the `.animate()` method, available on all HTML elements. It takes two arguments: an array of keyframes (just like in CSS) and an options object." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const element = document.querySelector('.my-element');\n\n// 1. Define the keyframes\nconst keyframes = [\n  { transform: 'scale(1)', opacity: 1 },\n  { transform: 'scale(0.5)', opacity: 0 }\n];\n\n// 2. Define the animation options\nconst options = {\n  duration: 1000, // 1 second\n  easing: 'ease-in-out',\n  fill: 'forwards' // Keep the final state\n};\n\n// 3. Create the animation\nconst animation = element.animate(keyframes, options);` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The `Animation` Object: Full Playback Control" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `.animate()` method returns an `Animation` object, which is the true power of the WAAPI. This object gives you full, programmatic control over the animation's playback." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// Control playback\nanimation.play();\nanimation.pause();\nanimation.reverse();\nanimation.cancel();\n\n// Jump to a specific point\nanimation.currentTime = 500; // Go to the 500ms mark\n\n// Control speed\nanimation.playbackRate = 2; // Play at double speed\n\n// Listen for events\nanimation.onfinish = () => console.log('Animation finished!');` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This level of control is impossible with CSS animations alone and is essential for building interactive experiences, like scrubbing a timeline or linking an animation to scroll position." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Practical Example: Staggered Entrance Animation" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's create a common UI pattern: a list of items that animates in one by one. The WAAPI's `delay` option makes this simple." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const items = document.querySelectorAll('.list-item');\n\nconst keyframes = [\n  { opacity: 0, transform: 'translateY(20px)' },\n  { opacity: 1, transform: 'translateY(0)' }\n];\n\nitems.forEach((item, index) => {\n  item.animate(keyframes, {\n    duration: 500,\n    easing: 'ease-out',\n    delay: index * 100, // The magic!\n    fill: 'forwards'\n  });\n});` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: The Modern Standard for Web Animation" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The Web Animations API is a mature, powerful, and browser-native solution for web animation. It provides the best of both worlds: the declarative simplicity of CSS keyframes and the dynamic, programmatic control of JavaScript, all while running off the main thread for maximum performance. For building the next generation of fluid, interactive, and beautiful user interfaces, the WAAPI is an essential tool in every frontend developer's toolkit." }] },
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

const POST_TITLE = "Source Maps in Depth: From Development to Production";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem: Debugging Minified Code" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "When your JavaScript is bundled and minified for production, it becomes a single, long, unreadable line of code. If an error occurs, the stack trace will point to a meaningless location in this minified file, making debugging nearly impossible. Source maps are a special type of file that create a mapping between your original, readable source code and the transformed, optimized output code. This allows the browser's developer tools to show you the exact line in your original code where an error occurred." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Choosing the Right `devtool`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Webpack's `devtool` property in `webpack.config.js` controls how source maps are generated. There are many options, each with a different trade-off between build speed and quality. Here are the most important ones:" }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "For Development: `inline-source-map`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This option provides a high-quality source map that is embedded directly into the generated JavaScript file as a Base64 data URI. It's relatively slow to build, but provides the best debugging experience with original line numbers. This is a great choice for development." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', "module.exports = {\n  mode: 'development',\n  devtool: 'inline-source-map',\n};" }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "For Blazing Fast Development: `eval-cheap-module-source-map`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is one of the fastest options. Each module is executed with `eval()`, and the source map only maps to the original lines (not columns). Rebuilds are very fast, making it an excellent choice for development when you prioritize speed over perfect source map quality." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', "module.exports = {\n  devtool: 'eval-cheap-module-source-map',\n};" }] },
        
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "For Production: `source-map`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is the gold standard for production. It generates a separate `.map.js` file for your bundle. This provides the highest quality mapping, including line and column numbers. The key benefit is that the source map is separate, so the browser will only download it if the developer tools are open, meaning it doesn't impact your end-users' performance." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', "module.exports = {\n  mode: 'production',\n  devtool: 'source-map',\n};" }] },
        { type: 'paragraph', content: [{ type: 'text', marks: [{type: 'bold'}], text: "Important Security Note:" }, { type: 'text', text: " Using `source-map` in production means your original, un-minified source code will be visible in the browser's developer tools. For most web apps, this is acceptable. However, if your client-side code contains proprietary or sensitive business logic, you might choose a less detailed option or not to generate source maps for production at all." }] },

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "For Production (without exposing code): `hidden-source-map`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This option is the same as `source-map`, but it doesn't add the reference comment in the bundle. This is useful if you want to upload your source maps to an error reporting service (like Sentry or LogRocket) for processing, but you don't want to expose them to end-users in the browser." }] },
    ]
};

async function updatePostContent() {
    const result = await Post.findOneAndUpdate(
        { title: POST_TITLE },
        { $set: { content: content } },
        { new: true, upsert: true }
    );

    if (result) {
        console.log(`Successfully updated or created post: ${result.title}`);
    } else {
        console.log(`Could not find or create post: "${POST_TITLE}"`);
    }
}

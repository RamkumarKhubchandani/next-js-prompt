require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default; // Adjust the path as necessary
const User = require('../app/models/User').default; // Import the User model

const MONGODB_URI = process.env.MONGODB_URI;

const defaultContent = {
    type: 'doc',
    content: [{
        type: 'paragraph',
        content: [{
            type: 'text',
            text: 'This is a placeholder for the tutorial content. It will be updated soon!',
        }, ],
    }, ],
};

const webpackPosts = [
    // 1
    {
        title: "Webpack 101: From Zero to Hero in a Single Guide",
        category: 'Webpack',
        isPremium: false,
        seo: {
            metaTitle: "Webpack 101 Tutorial (2025): From Beginner to Pro | JSPrompt",
            metaDescription: "Master the fundamentals of Webpack 5 with our complete beginner's guide. Learn core concepts, setup, loaders, and plugins to start bundling your JavaScript applications today.",
            keywords: "webpack, javascript, bundler, webpack tutorial, webpack for beginners, webpack 5, getting started with webpack"
        }
    },
    // 2
    {
        title: "Mastering webpack.config.js: A Comprehensive Deep Dive",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Mastering webpack.config.js: The Ultimate Guide (2025) | JSPrompt",
            metaDescription: "Go beyond the basics with our deep dive into webpack.config.js. Learn advanced configuration techniques for entry, output, loaders, plugins, and mode settings.",
            keywords: "webpack, webpack.config.js, webpack configuration, advanced webpack, webpack setup"
        }
    },
    // 3
    {
        title: "The Ultimate Guide to Loaders: Babel, CSS, and Asset Handling",
        category: 'Webpack',
        isPremium: false,
        seo: {
            metaTitle: "Webpack Loaders Guide: Babel, CSS, Sass, PostCSS & More | JSPrompt",
            metaDescription: "Learn how to use Webpack loaders to process more than just JavaScript. This guide covers babel-loader, css-loader, style-loader, sass-loader, and asset modules.",
            keywords: "webpack, webpack loaders, babel-loader, css-loader, style-loader, sass-loader, asset handling"
        }
    },
    // 4
    {
        title: "Unlocking Webpack Plugins: HtmlWebpackPlugin, MiniCssExtractPlugin, and More",
        category: 'Webpack',
        isPremium: false,
        seo: {
            metaTitle: "Top Webpack Plugins Explained (2025 Tutorial) | JSPrompt",
            metaDescription: "Discover the power of Webpack plugins. Learn to use HtmlWebpackPlugin for generating HTML, MiniCssExtractPlugin for CSS, and other essential plugins for optimizing your build.",
            keywords: "webpack, webpack plugins, HtmlWebpackPlugin, MiniCssExtractPlugin, webpack optimization"
        }
    },
    // 5
    {
        title: "Webpack Dev Server and Hot Module Replacement (HMR) Explained",
        category: 'Webpack',
        isPremium: false,
        seo: {
            metaTitle: "Webpack Dev Server & HMR: The Ultimate Guide | JSPrompt",
            metaDescription: "Boost your development workflow by mastering Webpack Dev Server and Hot Module Replacement (HMR). Learn to configure and use live reloading for instant feedback.",
            keywords: "webpack, webpack dev server, hmr, hot module replacement, webpack development"
        }
    },
    // 6
    {
        title: "Code Splitting for Maximum Performance: The Definitive Guide",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Webpack Code Splitting: The Ultimate Guide (2025) | JSPrompt",
            metaDescription: "Dramatically improve your app's load time with Webpack code splitting. Learn multiple techniques, including entry points, SplitChunksPlugin, and dynamic imports.",
            keywords: "webpack, code splitting, performance, optimization, SplitChunksPlugin, dynamic imports"
        }
    },
    // 7
    {
        title: "Tree Shaking Explained: How to Eliminate Dead Code in 2025",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Webpack Tree Shaking: A Complete Guide (2025) | JSPrompt",
            metaDescription: "Learn how to properly configure tree shaking in Webpack to eliminate unused, dead code from your final bundle, resulting in smaller and faster applications.",
            keywords: "webpack, tree shaking, dead code elimination, performance, optimization"
        }
    },
    // 8
    {
        title: "Lazy Loading Components and Routes for Lightning-Fast Apps",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Lazy Loading in Webpack with Dynamic Imports | JSPrompt",
            metaDescription: "Master lazy loading in your React or Vue app using Webpack and dynamic import() syntax. Load code on demand to drastically reduce initial bundle size and improve TTI.",
            keywords: "webpack, lazy loading, dynamic imports, performance, react, vue, code splitting"
        }
    },
    // 9
    {
        title: "Webpack 5 Asset Modules: The Modern Way to Handle Images and Fonts",
        category: 'Webpack',
        isPremium: false,
        seo: {
            metaTitle: "Webpack 5 Asset Modules Tutorial (Images, Fonts, SVGs) | JSPrompt",
            metaDescription: "Replace file-loader and url-loader with Webpack 5's built-in Asset Modules. Learn to handle images, fonts, SVGs, and other assets with zero extra dependencies.",
            keywords: "webpack, webpack 5, asset modules, images, fonts, svgs, file-loader"
        }
    },
    // 10
    {
        title: "Optimizing for Production: The Ultimate Webpack Build Checklist",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Webpack Production Build: The Ultimate Optimization Checklist | JSPrompt",
            metaDescription: "A comprehensive checklist for creating a production-ready Webpack build. Covers minification, code splitting, caching, tree shaking, and more for optimal performance.",
            keywords: "webpack, production build, optimization, performance, webpack checklist"
        }
    },
    // 11
    {
        title: "Webpack vs. Vite vs. Turbopack: The State of Bundlers in 2025",
        category: 'Webpack',
        isPremium: false,
        seo: {
            metaTitle: "Webpack vs. Vite vs. Turbopack: Which Bundler to Choose in 2025? | JSPrompt",
            metaDescription: "An in-depth comparison of the leading JavaScript bundlers: Webpack, Vite, and Turbopack. We analyze performance, developer experience, and ecosystem to help you choose.",
            keywords: "webpack, vite, turbopack, bundlers, javascript, performance comparison"
        }
    },
    // 12
    {
        title: "Mastering Caching: Long-Term Caching for Instant Page Loads",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Webpack Caching Guide: Long-Term Caching & Cache Busting | JSPrompt",
            metaDescription: "Learn how to configure Webpack for effective long-term caching. Use content hashing and cache busting techniques to ensure users get the latest code without re-downloading everything.",
            keywords: "webpack, caching, long-term caching, cache busting, performance"
        }
    },
    // 13
    {
        title: "Building a Custom Webpack Loader from Scratch",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "How to Create a Custom Webpack Loader (Step-by-Step) | JSPrompt",
            metaDescription: "Extend Webpack's capabilities by writing your own custom loader. This tutorial guides you through the process of creating a loader to transform source files.",
            keywords: "webpack, custom loader, webpack loader, webpack plugin development"
        }
    },
    // 14
    {
        title: "Building a Custom Webpack Plugin from Scratch",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "How to Create a Custom Webpack Plugin (Step-by-Step) | JSPrompt",
            metaDescription: "Unlock the full power of Webpack by creating your own custom plugin. Learn about the Webpack compiler hooks and build a plugin from the ground up.",
            keywords: "webpack, custom plugin, webpack plugin, webpack plugin development"
        }
    },
    // 15
    {
        title: "Webpack Bundle Analysis: Visualizing and Shrinking Your App",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Webpack Bundle Analyzer: How to Visualize & Reduce Bundle Size | JSPrompt",
            metaDescription: "Use tools like `webpack-bundle-analyzer` to visualize what's inside your bundle. Learn how to identify large dependencies and shrink your application size for better performance.",
            keywords: "webpack, bundle analyzer, performance, optimization, reduce bundle size"
        }
    },
    // 16
    {
        title: "Introduction to Micro-Frontends with Module Federation",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Micro-Frontends with Webpack Module Federation: A Beginner's Guide | JSPrompt",
            metaDescription: "Learn the fundamentals of building micro-frontends using Webpack 5's revolutionary Module Federation feature. Create scalable and independently deployable applications.",
            keywords: "webpack, module federation, micro-frontends, javascript architecture"
        }
    },
    // 17
    {
        title: "Advanced Module Federation: Sharing Dependencies and State",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Advanced Webpack Module Federation: Sharing State & Dependencies | JSPrompt",
            metaDescription: "Go beyond the basics of Module Federation. Learn advanced techniques for sharing dependencies, managing state, and handling routing in a micro-frontend architecture.",
            keywords: "webpack, module federation, micro-frontends, state management, advanced webpack"
        }
    },
    // 18
    {
        title: "Server-Side Rendering (SSR) with Webpack and Express",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "How to Set Up SSR with Webpack and Express for React | JSPrompt",
            metaDescription: "Learn to configure Webpack and an Express server to deliver server-side rendered React applications for improved SEO and initial page load performance.",
            keywords: "webpack, ssr, server-side rendering, react, express, node.js"
        }
    },
    // 19
    {
        title: "Blazing Fast Builds with esbuild-loader and swc-loader",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Speed Up Webpack Builds with esbuild-loader & swc-loader | JSPrompt",
            metaDescription: "Replace the slower babel-loader with modern, Rust-based (SWC) and Go-based (esbuild) alternatives to dramatically speed up your Webpack build and compilation times.",
            keywords: "webpack, performance, esbuild-loader, swc-loader, fast builds, babel-loader"
        }
    },
    // 20
    {
        title: "Implementing a Strict Content Security Policy (CSP) with Webpack",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Content Security Policy (CSP) with Webpack: A Practical Guide | JSPromp",
            metaDescription: "Enhance your application's security by implementing a Content Security Policy (CSP). Learn how to use Webpack plugins to automatically manage nonces and hashes.",
            keywords: "webpack, security, csp, content security policy, web security"
        }
    },
    // 21
    {
        title: "Managing Environment Variables: .env and DefinePlugin",
        category: 'Webpack',
        isPremium: false,
        seo: {
            metaTitle: "How to Use Environment Variables in Webpack (.env & DefinePlugin) | JSPrompt",
            metaDescription: "Learn the best practices for managing environment variables in your Webpack projects using `.env` files with `dotenv-webpack` and the built-in `DefinePlugin`.",
            keywords: "webpack, environment variables, .env, defineplugin, webpack config"
        }
    },
    // 22
    {
        title: "Advanced Configuration with webpack-merge for Dev vs. Prod",
        category: 'Webpack',
        isPremium: false,
        seo: {
            metaTitle: "Using webpack-merge for Development & Production Configs | JSPrompt",
            metaDescription: "Stop duplicating your Webpack configuration! Learn how to use `webpack-merge` to create a clean, maintainable setup with separate configs for development and production.",
            keywords: "webpack, webpack-merge, webpack configuration, development, production"
        }
    },
    // 23
    {
        title: "Building a Progressive Web App (PWA) with Webpack's Workbox Plugin",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Create a PWA with Webpack and Workbox (Step-by-Step) | JSPrompt",
            metaDescription: "Turn your web app into a Progressive Web App (PWA). Learn to use the `workbox-webpack-plugin` to generate a service worker for offline capabilities and more.",
            keywords: "webpack, pwa, progressive web app, workbox, service worker, offline"
        }
    },
    // 24
    {
        title: "Understanding Webpack's Resolver and Module Resolution",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Webpack Resolver Explained: A Deep Dive into Module Resolution | JSPrompt",
            metaDescription: "Ever wondered how `import 'module'` works? This guide dives deep into Webpack's resolver, explaining aliases, extensions, and the `resolve` configuration option.",
            keywords: "webpack, webpack resolver, module resolution, alias, webpack config"
        }
    },
    // 25
    {
        title: "Integrating WebAssembly (Wasm) into Your JavaScript Build",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "How to Use WebAssembly (Wasm) with Webpack 5 | JSPrompt",
            metaDescription: "Learn how to import and use WebAssembly (Wasm) modules in your JavaScript application with Webpack 5's built-in asset module support for high-performance code.",
            keywords: "webpack, webassembly, wasm, performance, javascript"
        }
    },
    // 26
    {
        title: "Optimizing a React Application with Webpack",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Optimizing React Apps with Webpack: The Ultimate Guide | JSPrompt",
            metaDescription: "A complete guide to Webpack optimizations specifically for React applications. Covers code splitting with React.lazy, bundle analysis, and production tweaks.",
            keywords: "webpack, react, optimization, performance, code splitting, react.lazy"
        }
    },
    // 27
    {
        title: "Optimizing a Vue.js Application with Webpack",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Optimizing Vue.js Apps with Webpack: A Performance Guide | JSPrompt",
            metaDescription: "Learn Webpack techniques to optimize your Vue.js applications. This guide covers async components for code splitting, bundle analysis with Vue CLI, and more.",
            keywords: "webpack, vue, optimization, performance, code splitting, async components"
        }
    },
    // 28
    {
        title: "Source Maps in Depth: From Development to Production",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Webpack Source Maps Explained: Devtool Options Deep Dive | JSPrompt",
            metaDescription: "Master the `devtool` option in Webpack. This guide explains the different types of source maps, their impact on build speed, and which ones to use for development vs. production.",
            keywords: "webpack, source maps, devtool, debugging, javascript"
        }
    },
    // 29
    {
        title: "Federated SSR: Server-Side Rendering for Micro-Frontends",
        category: 'Webpack',
        isPremium: true,
        seo: {
            metaTitle: "Server-Side Rendering (SSR) for Module Federation Micro-Frontends | JSPrompt",
            metaDescription: "Explore the cutting-edge of micro-frontends with Federated SSR. Learn how to server-render applications built with Webpack's Module Federation for ultimate performance and SEO.",
            keywords: "webpack, module federation, micro-frontends, ssr, server-side rendering, advanced webpack"
        }
    },
    // 30
    {
        title: "The Future of Webpack and its Role Alongside Rust-Based Tooling",
        category: 'Webpack',
        isPremium: false,
        seo: {
            metaTitle: "The Future of Webpack (2025): Its Role with Rust Tooling | JSPrompt",
            metaDescription: "With the rise of Rust-based tools like Turbopack and Rspack, what is the future of Webpack? We explore Webpack's roadmap, its strengths, and its evolving role in the modern web dev ecosystem.",
            keywords: "webpack, future of javascript, rust, turbopack, rspack, bundlers"
        }
    }
];

const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
};

const createPostID = (text) => {
    // Create a simple, URL-friendly ID from the title
    return slugify(text).substring(0, 50);
}


async function addWebpackPosts() {
    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI is not defined in .env.local');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB.');

        // Find the admin user to get their ObjectId
        const adminUser = await User.findOne({ email: 'ramkumarkhub@gmail.com' });
        if (!adminUser) {
            console.error('Error: Admin user ramkumarkhub@gmail.com not found.');
            process.exit(1);
        }
        const adminUserId = adminUser._id;


        for (const postData of webpackPosts) {
            const existingPost = await Post.findOne({ title: postData.title });
            if (!existingPost) {
                const newPost = new Post({
                    ...postData,
                    author: adminUserId, // Use the admin user's ObjectId
                    slug: slugify(postData.title), // Generate slug
                    postID: createPostID(postData.title), // Generate unique postID
                    content: defaultContent, // Add default content
                });
                await newPost.save();
                console.log(`Successfully added post: ${postData.title}`);
            } else {
                console.log(`Post already exists, skipping: ${postData.title}`);
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

addWebpackPosts();

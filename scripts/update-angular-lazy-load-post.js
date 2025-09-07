require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Advanced Lazy Loading Strategies in Angular for Peak Performance";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why Lazy Loading is Essential for Viral Apps" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For an application to become famous, it needs to be incredibly fast. Lazy loading is a cornerstone of performance optimization in Angular. By default, the Angular CLI bundles your entire application into a few large files. Lazy loading allows you to split your application into smaller chunks and load them on demand, for example, only when a user navigates to a specific route. This dramatically reduces the initial bundle size and leads to near-instant load times." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Basic Lazy Loading with `loadComponent`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In modern standalone Angular, lazy loading a route is simple. Instead of the `component` property in your route definition, you use the `loadComponent` property and a dynamic `import()` statement." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app.routes.ts\nimport { Routes } from '@angular/router';\n\nexport const routes: Routes = [\n  {\n    path: 'dashboard',\n    // This component will only be loaded when the user visits /dashboard\n    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)\n  },\n  // ... other routes\n];` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Advanced Strategy 1: Preloading" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Lazy loading is great, but it can introduce a small delay when the user first navigates to a lazy-loaded route. We can solve this with preloading. The `PreloadAllModules` strategy tells Angular to load the main bundle first, and then, while the user is interacting with the initial page, it starts preloading the other lazy-loaded modules in the background. By the time the user clicks a link, the module is likely already downloaded." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app.config.ts\nimport { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';\n\nexport const appConfig: ApplicationConfig = {\n  providers: [\n    provideRouter(\n      routes,\n      withPreloading(PreloadAllModules) // Enable preloading\n    )\n  ]\n};` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Advanced Strategy 2: Component-Level Lazy Loading with `defer`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Angular 17 introduced the revolutionary `@defer` block. This allows you to lazy load individual components or parts of a template, not just entire routes. This is perfect for heavy components that are not immediately visible, like a chart below the fold or a component inside a modal." }] },
        { type: 'codeBlock', attrs: { language: 'html' }, content: [{ type: 'text', text: `<!-- home.component.html -->\n\n<h2>Welcome Home!</h2>\n\n<!-- The HeavyChartComponent will not be loaded until the user scrolls it into view -->\n@defer (on viewport) {\n  <app-heavy-chart />\n} @placeholder {\n  <!-- Show a placeholder while the component is loading -->\n  <div class="chart-placeholder">Chart is loading...</div>\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Build World-Class Angular Apps" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To make your website a top-tier destination, you must deliver elite performance. Mastering advanced lazy loading is non-negotiable. By combining route-level lazy loading with a smart preloading strategy and the new `@defer` block for component-level optimization, you can build Angular applications that are not only feature-rich but also incredibly fast and responsive, ensuring the best possible user experience and SEO ranking." }] }
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

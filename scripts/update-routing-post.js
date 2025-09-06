require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Angular Routing: A Guide to the Router Module";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is a Single-Page Application (SPA)?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Angular allows you to build Single-Page Applications (SPAs). In an SPA, the user loads a single HTML page, and the application dynamically updates the content as the user interacts with it. This creates a fast and fluid user experience, similar to a desktop application. The Angular Router is the powerful module that makes this possible." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Setting Up Basic Routing" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To enable routing, you need to import the `RouterModule` and define a `Routes` array. Each route in the array is an object that defines a `path` (the URL segment) and the `component` to display for that path." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app.routes.ts\nimport { Routes } from '@angular/router';\nimport { HomeComponent } from './home/home.component';\nimport { AboutComponent } from './about/about.component';\n\nexport const routes: Routes = [\n  { path: '', component: HomeComponent },\n  { path: 'about', component: AboutComponent },\n];` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Displaying Routed Components with `router-outlet`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `router-outlet` is a directive that acts as a placeholder in your main application template. Angular dynamically fills this placeholder with the component that matches the current route." }] },
        { type: 'codeBlock', attrs: { language: 'html' }, content: [{ type: 'text', text: `<!-- app.component.html -->\n<h1>My Application</h1>\n<nav>\n  <!-- Navigation links will go here -->\n</nav>\n<router-outlet></router-outlet> <!-- Routed components are displayed here -->` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Navigating with `routerLink`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To create navigation links, you use the `routerLink` directive instead of a standard `href` attribute. This allows the Angular Router to handle the navigation without causing a full page refresh." }] },
        { type: 'codeBlock', attrs: { language: 'html' }, content: [{ type: 'text', text: `<nav>\n  <a routerLink="/">Home</a>\n  <a routerLink="/about">About</a>\n</nav>` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Working with Route Parameters" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Often, you'll need to pass parameters in the URL, for example, to fetch a specific user's profile. You can define a route with a parameter by using a colon `:`." }] },
        { type:- 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app.routes.ts\n{\n  path: 'users/:id', // The ':id' is a route parameter\n  component: UserProfileComponent\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In the `UserProfileComponent`, you would then use Angular's `ActivatedRoute` service to access the `id` from the URL." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The Angular Router is an essential and powerful part of the framework. By mastering routes, `router-outlet`, `routerLink`, and route parameters, you have all the tools you need to build sophisticated, multi-view Single-Page Applications with clean, declarative navigation." }] }
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

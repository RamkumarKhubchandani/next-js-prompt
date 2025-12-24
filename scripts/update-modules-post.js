require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Understanding Angular Modules (@NgModule)";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is an `NgModule`?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In Angular, an `NgModule` is a class marked by the `@NgModule` decorator that helps organize your application into cohesive blocks of functionality. Each module is a container for a set of related components, directives, pipes, and services. They provide a compilation context for their components and are essential for managing dependencies and improving application structure." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Anatomy of an `NgModule`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `@NgModule` decorator is a function that takes a single metadata object. Here are some of its most important properties:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`declarations`:", bold: true }, { type: 'text', text: " The components, directives, and pipes that belong to this module." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`imports`:", bold: true }, { type: 'text', text: " Other modules whose exported classes are needed by component templates in this module." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`providers`:", bold: true }, { type: 'text', text: " The services this module contributes to the global collection of services; they become accessible in all parts of the app." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`bootstrap`:", bold: true }, { type: 'text', text: " The main application view, called the root component, which hosts all other app views. Only the root `NgModule` should set this property." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Example: The Root `AppModule`" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app.module.ts\nimport { NgModule } from '@angular/core';\nimport { BrowserModule } from '@angular/platform-browser';\nimport { RouterModule } from '@angular/router';\n\nimport { AppComponent } from './app.component';\nimport { HomeComponent } from './home/home.component';\n\n@NgModule({\n  declarations: [\n    AppComponent,\n    HomeComponent,\n  ],\n  imports: [\n    BrowserModule,\n    RouterModule.forRoot([]) // Example of importing another module\n  ],\n  providers: [],\n  bootstrap: [AppComponent] // The root component\n})\nexport class AppModule { }` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Feature Modules and Lazy Loading" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "As your application grows, you can create 'Feature Modules' to organize code related to a specific feature (e.g., a customer dashboard). These modules can even be 'lazy-loaded', meaning they are only loaded by the browser when the user navigates to their routes. This is a powerful optimization technique that can significantly improve the initial load time of your application." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Future: Standalone Components" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "It's important to note that recent versions of Angular have introduced 'Standalone Components', which do not need to be declared in an `NgModule`. While `NgModule`s are still a core part of many existing Angular applications, the trend is moving towards a more module-optional architecture. However, understanding `NgModule`s is still essential for working on most professional Angular projects today." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "`NgModule`s are a fundamental concept for structuring and organizing your Angular applications. They provide a robust system for managing dependencies, separating functionality, and optimizing your application through features like lazy loading. A solid understanding of modules is key to building large-scale, maintainable Angular applications." }] }
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

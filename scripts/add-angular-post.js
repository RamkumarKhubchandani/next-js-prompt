require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const angularPost = {
    title: "Angular's Core Concepts: Components and Data Binding",
    category: 'Angular',
    isPremium: false,
    seo: {
        metaTitle: "Angular Components & Data Binding Tutorial for Beginners | JSPrompt",
        metaDescription: "Learn the core concepts of Angular: Components and Data Binding. This beginner-friendly guide explains interpolation, property binding, and event binding with clear examples.",
        keywords: "angular, components, data binding, interpolation, property binding, event binding, angular tutorial, beginners, guide, code example",
    },
    content: {
        type: 'doc',
        content: [
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Building Blocks of an Angular App: Components" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "At the heart of every Angular application are Components. A component is a self-contained block of code that controls a patch of screen real estate—a view. It consists of three main parts: an HTML template that declares what renders on the page, a TypeScript class that defines behavior, and a CSS selector that defines how the component is used in a template. Think of a web page as a tree of components, from the root component down to smaller, reusable components like buttons or form fields." }] },
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Making Components Dynamic: Data Binding" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "Data binding is the magic that connects your component's data (the TypeScript class) to its template (the HTML). It automates the process of keeping your view in sync with your application's state. Angular provides three main types of data binding." }] },
            { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "1. Interpolation: Displaying Data" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "The simplest form of data binding is interpolation. It allows you to display a component's property value in the template. You use double curly braces `{{ }}` to bind the data." }] },
            { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app.component.ts\nimport { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  template: '<h1>Hello, {{ name }}!</h1>',\n})\nexport class AppComponent {\n  name = 'Angular Developer';\n}` }] },
            { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "2. Property Binding: Setting Element Properties" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "Property binding allows you to set a property of an HTML element to the value of a component property. You use square brackets `[]` around the element property." }] },
            { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app.component.ts\n@Component({\n  selector: 'app-image',\n  template: '<img [src]="imageUrl">',\n})\nexport class ImageComponent {\n  imageUrl = 'path/to/your/image.png';\n}` }] },
            { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "3. Event Binding: Responding to User Actions" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "Event binding allows you to listen for and respond to user actions such as clicks, keystrokes, or mouse movements. You use parentheses `()` around the event name." }] },
            { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app.component.ts\n@Component({\n  selector: 'app-alert-button',\n  template: '<button (click)="onButtonClick()">Click Me</button>',\n})\nexport class AlertButtonComponent {\n  onButtonClick() {\n    alert('Button was clicked!');\n  }\n}` }] },
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Two-Way Data Binding" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "Angular also supports two-way data binding, which combines property and event binding into a single notation. It's most commonly used with forms. The syntax `[(ngModel)]` listens for events and updates the property simultaneously." }] },
            { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app.component.ts\n@Component({\n  selector: 'app-name-input',\n  template: '<input [(ngModel)]="username" type="text"> <p>Hello, {{ username }}</p>',\n})\nexport class NameInputComponent {\n  username = 'DefaultName';\n}` }] },
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
            { type: 'paragraph', content: [{ type: 'text', text: "Components are the fundamental building blocks of Angular, and data binding is the powerful mechanism that makes them dynamic. Understanding these concepts is the first and most important step to mastering Angular development." }] }
        ]
    }
};

const generateSlug = (title) => {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

async function addAngularPost() {
  if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    const adminUser = await User.findOne({ email: ADMIN_EMAIL });
    if (!adminUser) {
        console.error(`Error: Admin user with email ${ADMIN_EMAIL} not found.`);
        process.exit(1);
    }
    
    let slug = generateSlug(angularPost.title);
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
        slug = `${slug}-${Date.now()}`;
    }

    const newPostData = {
        postID: `post-${Date.now()}`,
        title: angularPost.title,
        content: angularPost.content,
        category: angularPost.category,
        slug,
        author: adminUser._id,
        isPremium: angularPost.isPremium,
        metaTitle: angularPost.seo.metaTitle,
        metaDescription: angularPost.seo.metaDescription,
        keywords: angularPost.seo.keywords,
    };

    await Post.create(newPostData);
    console.log('Successfully created Angular post:');
    console.log(`Title: ${angularPost.title}`);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

addAngularPost();

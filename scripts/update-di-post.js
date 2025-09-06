require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Dependency Injection in Angular: A Core Concept";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What is Dependency Injection (DI)?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Dependency Injection is a core design pattern in Angular that allows a class to receive its dependencies from an external source rather than creating them itself. In simple terms, instead of a component creating its own services or objects, it asks for them, and the Angular framework 'injects' them. This leads to code that is much more flexible, decoupled, and easier to test." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Key Players in Angular DI" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "The Injector:", bold: true }, { type: 'text', text: " The main DI container responsible for creating and providing instances of dependencies." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "The Provider:", bold: true }, { type: 'text', text: " A recipe that tells the injector *how* to create an instance of a dependency (e.g., a service)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "The Dependency:", bold: true }, { type: 'text', text: " The object (usually a service) that a class needs to perform its function." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Practical Example: Creating and Injecting a Service" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's create a simple `LoggerService` and inject it into a component." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Create the Service" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "We use the `@Injectable()` decorator to mark a class as a service that can be provided and injected. `providedIn: 'root'` means the service is available application-wide." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// logger.service.ts\nimport { Injectable } from '@angular/core';\n\n@Injectable({\n  providedIn: 'root',\n})\nexport class LoggerService {\n  log(message: string) {\n    console.log(message);\n  }\n}` }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Inject the Service into a Component" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "To use the service, we simply add it to the component's `constructor`. Angular's injector sees this and automatically provides an instance of `LoggerService`." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app.component.ts\nimport { Component } from '@angular/core';\nimport { LoggerService } from './logger.service';\n\n@Component({\n  selector: 'app-root',\n  template: '<button (click)="sayHello()">Say Hello</button>',\n})\nexport class AppComponent {\n  constructor(private logger: LoggerService) {}\n\n  sayHello() {\n    this.logger.log('Hello, Angular DI!');\n  }\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Benefits of Using DI" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Decoupling:", bold: true }, { type: 'text', text: " Components don't need to know how to create their dependencies. They just know they need them." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Testability:", bold: true }, { type: 'text', text: " It's easy to provide mock or fake dependencies during testing, allowing you to isolate and test your components." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Reusability:", bold: true }, { type: 'text', text: " Services can be easily reused across your entire application." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Dependency Injection is a fundamental concept that is key to writing clean, modular, and professional Angular code. By letting the framework handle the creation and provision of dependencies, you can focus on writing your application's business logic, leading to a more robust and scalable architecture." }] }
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

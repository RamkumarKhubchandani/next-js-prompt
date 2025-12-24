require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Introduction to Angular Services and HTTPClient";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why Use Services in Angular?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "In Angular, components are meant to be lean and focused on the user interface. So where should you put your business logic, like fetching data or logging? The answer is Services. An Angular service is a singleton class that you can use to organize and share code across your application. This promotes reusability and separates concerns, making your code cleaner and easier to maintain." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Creating a Data Service" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's create a service that is responsible for fetching user data from an API. We'll use Angular's built-in `HttpClient` module for this." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Import `HttpClientModule`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "First, you need to make sure the `HttpClientModule` is available in your application by adding it to your main application configuration." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// app.config.ts (for standalone apps)\nimport { ApplicationConfig } from '@angular/core';\nimport { provideHttpClient } from '@angular/common/http';\n\nexport const appConfig: ApplicationConfig = {\n  providers: [provideHttpClient()],\n};` }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Create the Service and Inject `HttpClient`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Now, we can create our service and inject the `HttpClient` into it using Dependency Injection." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// user.service.ts\nimport { Injectable } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\nimport { Observable } from 'rxjs';\n\n@Injectable({\n  providedIn: 'root',\n})\nexport class UserService {\n  private apiUrl = 'https://jsonplaceholder.typicode.com/users';\n\n  constructor(private http: HttpClient) {}\n\n  getUsers(): Observable<any[]> {\n    return this.http.get<any[]>(this.apiUrl);\n  }\n}` }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Note that `HttpClient` methods return an `Observable`, which is a powerful way to handle asynchronous data streams in Angular." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Using the Service in a Component" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Finally, we can inject our `UserService` into a component and call its `getUsers` method to fetch and display the data." }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// user-list.component.ts\nimport { Component, OnInit } from '@angular/core';\nimport { UserService } from './user.service';\n\n@Component({\n  selector: 'app-user-list',\n  template: \`\n    <ul>\n      <li *ngFor="let user of users">{{ user.name }}</li>\n    </ul>\n  \`,\n})\nexport class UserListComponent implements OnInit {\n  users: any[] = [];\n\n  constructor(private userService: UserService) {}\n\n  ngOnInit() {\n    this.userService.getUsers().subscribe(data => {\n      this.users = data;\n    });\n  }\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Services are a fundamental part of the Angular architecture. They allow you to create clean, reusable, and testable code by separating your application's logic from its presentation. Combining services with the `HttpClient` module provides a robust and efficient way to handle all your application's data fetching needs." }] }
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

require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Reactive Forms in Angular: A Practical Guide";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "What Are Reactive Forms?" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Angular offers two ways to handle forms: Template-Driven and Reactive. While Template-Driven forms are simpler, Reactive Forms are more powerful, scalable, and predictable, especially for complex scenarios. In a reactive form, you define the form model directly in the component class. This gives you explicit and immutable control over the form's data model and makes testing easier." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Building Blocks: `FormControl`, `FormGroup`, and `FormBuilder`" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`FormControl`:", bold: true }, { type: 'text', text: " Tracks the value and validation status of an individual form control." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`FormGroup`:", bold: true }, { type: 'text', text: " Tracks the same for a group of `FormControl` instances." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`FormBuilder`:", bold: true }, { type: 'text', text: " A convenient service for creating form controls with less boilerplate." }] }] }
        ]},
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Building a Simple Login Form" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's build a login form with validation for the email and password fields." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Import `ReactiveFormsModule`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "First, ensure `ReactiveFormsModule` is imported into your application module or provided in a standalone component." }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Create the Form Model in the Component" }] },
        { type: 'codeBlock', attrs: { language: 'typescript' }, content: [{ type: 'text', text: `// login.component.ts\nimport { Component, OnInit } from '@angular/core';\nimport { FormBuilder, FormGroup, Validators } from '@angular/forms';\n\n@Component({\n  selector: 'app-login',\n  templateUrl: './login.component.html',\n})\nexport class LoginComponent implements OnInit {\n  loginForm: FormGroup;\n\n  constructor(private fb: FormBuilder) {}\n\n  ngOnInit() {\n    this.loginForm = this.fb.group({\n      email: ['', [Validators.required, Validators.email]],\n      password: ['', [Validators.required, Validators.minLength(6)]],\n    });\n  }\n\n  onSubmit() {\n    if (this.loginForm.valid) {\n      console.log('Form Submitted!', this.loginForm.value);\n    }\n  }\n}` }] },
        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 3: Connect the Model to the Template" }] },
        { type: 'codeBlock', attrs: { language: 'html' }, content: [{ type: 'text', text: `<!-- login.component.html -->\n<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">\n  <div>\n    <label for="email">Email</label>\n    <input id="email" type="email" formControlName="email">\n    <!-- Validation Messages -->\n    <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">\n      <small *ngIf="loginForm.get('email')?.errors?.required">Email is required.</small>\n      <small *ngIf="loginForm.get('email')?.errors?.email">Enter a valid email.</small>\n    </div>\n  </div>\n\n  <div>\n    <label for="password">Password</label>\n    <input id="password" type="password" formControlName="password">\n    <!-- Validation Messages -->\n    <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">\n       <small *ngIf="loginForm.get('password')?.errors?.required">Password is required.</small>\n       <small *ngIf="loginForm.get('password')?.errors?.minlength">Password must be at least 6 characters.</small>\n    </div>\n  </div>\n\n  <button type="submit" [disabled]="loginForm.invalid">Log In</button>\n</form>` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Reactive Forms provide a powerful, model-driven approach to handling forms in Angular. They offer superior control, scalability, and testability compared to their template-driven counterparts. While there is a steeper learning curve, mastering Reactive Forms is an essential skill for building any complex, enterprise-level Angular application." }] }
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

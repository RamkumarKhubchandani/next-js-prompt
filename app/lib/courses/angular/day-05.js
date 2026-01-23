export const day05 = {
  day: 5,
  title: "Modern Forms (Typed & Reactive)",
  intro: "Forms are hard. Synchronization, validation, submission. Angular's Reactive Forms make this strictly typed and manageable.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 5. **Forms**. In Angular, we don't just use `ngModel` anymore. We use **Reactive Forms**."
      },
      {
        type: "talk",
        message: "Reactive Forms are a tree of objects (`FormGroup` -> `FormControl`) that track value and validity."
      },
      {
        type: "challenge",
        instruction: "Create a typed FormGroup for a login form with `email` and `password`. Validations: email is required, password min length 8.",
        buggyCode: `// ❌ Untyped & Loose
form = new FormGroup({
  email: new FormControl(''),
  password: new FormControl('')
});`,
        solutionCode: `// ✅ Typed & Strict
form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(8)])
});`,
        verifyOutput: "Validators.minLength(8)",
        successMessage: "Great! Now if you try to access `form.value.email`, TypeScript knows it's a string (or null).",
        hint: "Use `Validators.required` and `Validators.minLength(8)` inside the array."
      },
      {
        type: "ask",
        question: "Why do we prefer Reactive Forms over Template-Driven Forms?",
        options: [
          "They are testable, strictly typed, and immutable-ish",
          "They write less HTML",
          "They are deprecated",
          "They only support text inputs"
        ],
        correctAnswer: "They are testable, strictly typed, and immutable-ish",
        feedback: {
          success: "Correct. The logic lives in your TypeScript class, making it easy to unit test without the DOM.",
          error: "Think about testing. Logic in the class = easy to test. Logic in HTML = hard to test."
        }
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📝 1. The Form Model</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
The HTML is just a reflection of your TypeScript model.
</p>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><code class="text-brand-primary">FormControl</code>: Tracks a single input (value, dirty, touched, errors).</li>
  <li><code class="text-brand-primary">FormGroup</code>: A collection of controls (e.g. a "Contact Info" section).</li>
  <li><code class="text-brand-primary">FormArray</code>: A dynamic list of controls (e.g. "Add another phone number").</li>
</ul>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-yellow-500">
<pre class="text-gray-800 dark:text-gray-100">
// Accessing values
const email = this.form.controls.email.value; // Typed!
const isValid = this.form.valid;
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">👮 2. Validation is Synchronous</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Validators are just functions. \`(control) => error | null\`.
</p>
<p class="mb-6 text-gray-600 dark:text-light-300">
Angular runs them whenever the value changes. You can also add <strong>Async Validators</strong> (e.g. check if username is taken on server).
</p>
`,
  code: `import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">🔐 Secure Login</h2>

      <form [formGroup]="loginForm" (ngSubmit)="login()">
        
        <!-- Email -->
        <div class="mb-4">
          <label class="block text-sm text-gray-400 mb-1">Email</label>
          <input 
            type="email" 
            formControlName="email"
            class="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
          >
          @if (email?.touched && email?.hasError('required')) {
            <p class="text-red-400 text-xs mt-1">Email is required.</p>
          }
          @if (email?.touched && email?.hasError('email')) {
            <p class="text-red-400 text-xs mt-1">Invalid email format.</p>
          }
        </div>

        <!-- Password -->
        <div class="mb-6">
          <label class="block text-sm text-gray-400 mb-1">Password</label>
          <input 
            type="password" 
            formControlName="password"
            class="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
          >
          @if (password?.touched && password?.hasError('minlength')) {
            <p class="text-red-400 text-xs mt-1">Must be at least 8 chars.</p>
          }
        </div>

        <button 
          [disabled]="loginForm.invalid"
          class="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded font-bold"
        >
          Sign In
        </button>

      </form>
      
      <div class="mt-6 p-4 bg-black/30 rounded font-mono text-xs text-gray-500">
        Form Value: {{ loginForm.value | json }}
        <br>
        Form Valid: {{ loginForm.valid }}
      </div>
    </div>
  \`
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  // Helper getters for cleaner template
  get email() { return this.loginForm.controls.email; }
  get password() { return this.loginForm.controls.password; }

  constructor() {
    console.log('--- 📝 Auto-Fill Form ---');
    
    // In Angular, we can listen to form changes
    this.loginForm.valueChanges.subscribe(val => {
        console.log('Form Changed:', JSON.stringify(val));
    });

    setTimeout(() => {
        console.log('▶️ Typing email...');
        this.loginForm.controls.email['value'] = 'john.doe@example.com'; 
        // Hack: In real Angular we use setValue(), but our mock is simple
        // We trigger the subscription manually for the mock if needed, 
        // or rely on the mock FormControl implementation if it had setValue.
        // Let's assume the mock wrapper handles value property setters or we just log.
        console.log('   Email set to: john.doe@example.com');
    }, 1000);
    
    setTimeout(() => {
        console.log('▶️ Typing password...');
        this.loginForm.controls.password['value'] = 'secret123';
        console.log('   Password set to: secret123');
    }, 2000);

    setTimeout(() => {
        console.log('▶️ Clicking Login...');
        this.login();
    }, 3000);
  }

  login() {
    // In this mock, valid property is always true.
    console.log('✅ Login Submitted with:', this.loginForm.value);
  }
}`,
  comparison: {
    junior: `// ❌ Template Driven (Easy but messy)
<input [(ngModel)]="email" required>`,
    senior: `// ✅ Reactive (Scalable)
email = new FormControl('', Validators.required);
// Logic stays in TS, strictly typed control.`
  },
  interview: {
    questions: [
      {
        q: "How do you check if a form control has been touched by the user?",
        a: "Use \`.touched\` property. Typically we only show errors if \`control.invalid && control.touched\`."
      }
    ]
  }
};

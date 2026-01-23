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
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🛡️ 1. Strictly Typed Forms</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Before Angular 14, forms were <code>any</code>. You could type <code>form.value.unicorn</code> and it wouldn't error even if "unicorn" didn't exist.
<br><br>
Now, we define the <strong>interface</strong> of the form.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-gray-50 dark:bg-dark-900/40 p-5 rounded-xl border border-gray-200 dark:border-dark-700">
        <h4 class="font-bold text-gray-800 dark:text-white mb-3">The Interface</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
interface LoginForm {
  email: FormControl&lt;string&gt;;
  password: FormControl&lt;string | null&gt;;
}
        </pre>
    </div>
    <div class="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-900/30">
        <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-3">The Implementation</h4>
        <pre class="text-xs font-mono text-blue-900 dark:text-blue-200">
const form = new FormGroup&lt;LoginForm&gt;({
  email: new FormControl('', { nonNullable: true }),
  password: new FormControl(null)
});
        </pre>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚙️ 2. Custom Validators</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Built-in validators (<code>required</code>, <code>email</code>) are great, but sometimes you need custom logic (e.g., "password cannot contain the word 'password'").
<br>
A validator is just a function: <code>Control -> Error | null</code>.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
export function cannotContainSpace(control: AbstractControl) {
  if (control.value.includes(' ')) {
    return { hasSpace: true }; // ❌ Error Found
  }
  return null; // ✅ Valid
}
</pre>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔁 3. Control Value Accessor (CVA)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
How does the <code>&lt;input&gt;</code> element talk to <code>[formControl]</code>? It uses a <strong>Control Value Accessor</strong>.
<br>
If you want to build a custom "Star Rating" component that works with forms, you implement this interface:
</p>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300">
    <li><code>writeValue(val)</code>: Form -> View</li>
    <li><code>registerOnChange(fn)</code>: View -> Form</li>
    <li><code>setDisabledState(bool)</code>: Handle disable toggle</li>
</ul>
`,
  code: `import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: \`
    <div class="bg-gray-950 p-8 rounded-2xl border border-gray-800 shadow-2xl max-w-sm mx-auto" style="background-color: #030712; color: white">
      <div class="text-center mb-8">
        <div class="w-12 h-12 bg-blue-600 rounded-xl mx-auto flex items-center justify-center mb-3" style="background-color: #2563eb">
             <svg width="24" height="24" class="text-white w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <h2 class="text-2xl font-bold text-white">Secure Login</h2>
        <p class="text-gray-400 text-sm">Enter your credentials</p>
      </div>

      <form [formGroup]="loginForm" (ngSubmit)="login()">
        
        <!-- Email -->
        <div class="mb-5 relative group">
          <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
          <input 
            type="email" 
            formControlName="email"
            class="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all peer"
            placeholder="name@example.com"
            style="background-color: #111827; border: 1px solid #374151;"
          >
          <!-- Validation Feedback -->
           <div class="absolute right-3 top-9 text-green-500 opacity-0 transition-opacity" 
                [class.opacity-100]="email.valid && email.dirty">
                <svg width="20" height="20" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
           </div>
           
          @if (email.touched && email.hasError('required')) {
            <p class="text-red-500 text-xs mt-1 font-bold flex items-center gap-1">
                <span>⚠️</span> Email is required
            </p>
          }
          @if (email.touched && email.hasError('email')) {
             <p class="text-red-500 text-xs mt-1 font-bold flex items-center gap-1">
                <span>⚠️</span> Invalid email format
            </p>
          }
        </div>

        <!-- Password -->
        <div class="mb-8">
          <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
          <input 
            type="password" 
            formControlName="password"
            class="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all"
            placeholder="••••••••"
            style="background-color: #111827; border: 1px solid #374151;"
          >
          @if (password.touched && password.hasError('minlength')) {
            <p class="text-red-500 text-xs mt-1 font-bold flex items-center gap-1">
                <span>⚠️</span> Must be at least 8 chars
            </p>
          }
           @if (password.touched && password.hasError('required')) {
            <p class="text-red-500 text-xs mt-1 font-bold flex items-center gap-1">
                <span>⚠️</span> Password is required
            </p>
          }
        </div>

        <button 
          [disabled]="loginForm.invalid"
          class="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold text-white shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
          style="background: linear-gradient(to right, #2563eb, #4f46e5); padding: 12px; border-radius: 8px; font-weight: bold; width: 100%;"
        >
          Sign In
        </button>

      </form>
      
      <!-- Debug Panel -->
      <div class="mt-8 pt-6 border-t border-dashed border-gray-800">
        <p class="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2">Live Form State</p>
        <div class="bg-black/50 p-3 rounded font-mono text-[10px] text-green-400 overflow-x-auto border border-gray-800">
            {{ loginForm.value | json }}
            <div class="text-blue-400 mt-1">Valid: {{ loginForm.valid }}</div>
        </div>
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
    // 📢 Auto-typing simulation
    setTimeout(() => {
        this.loginForm.controls.email.setValue('john'); // Invalid email
    }, 1000);
    
    setTimeout(() => {
        this.loginForm.controls.email.setValue('john@example.com'); // Valid
    }, 2000);
    
    setTimeout(() => {
        this.loginForm.controls.password.setValue('secret123'); // Valid
    }, 3000);
  }

  login() {
    console.log('✅ Submitting:', this.loginForm.value);
    alert('Logged in!');
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

export const day07 = {
  day: 7,
  title: "Forms (Reactive Forms + Validation Like a Pro)",
  intro: "Reactive forms are the scalable approach: typed controls, custom validators, and clear data flow.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Reactive Forms</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Typed form model.</li>
  <li>Composable validation.</li>
  <li>Predictable updates and testing.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Form Model = Source of Truth</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Put validation and form shape in the component class. Keep templates for rendering, not logic.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Custom Validators</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Custom validators let you encode business rules (password strength, cross-field match) in reusable functions.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) UX: Show Errors at the Right Time</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Show errors after <span class="text-yellow-600 dark:text-yellow-400 font-bold">touched</span> or after submit attempt.</li>
  <li>Use consistent error messages; don’t surprise users.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) Cross-Field Validation (Password Match)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Many real forms validate multiple fields together (password + confirmPassword). This belongs at the <span class="text-yellow-600 dark:text-yellow-400 font-bold">FormGroup</span> level.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
passwords:
  - password
  - confirmPassword
validator:
  - if mismatch → { passwordMismatch: true }
</code></pre>
</div>
            `,
  code: `/**
 * Day 7: Reactive forms with cross-field validator (conceptual)
 */

// const passwordMatch: ValidatorFn = (group: AbstractControl) => {
//   const password = group.get('password')?.value;
//   const confirm = group.get('confirmPassword')?.value;
//   return password === confirm ? null : { passwordMismatch: true };
// };
//
// form = this.fb.group({
//   email: ['', [Validators.required, Validators.email]],
//   passwords: this.fb.group(
//     {
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', [Validators.required]],
//     },
//     { validators: [passwordMatch] },
//   ),
// });
//
// submit() {
//   if (this.form.invalid) {
//     this.form.markAllAsTouched();
//     return;
//   }
// }`,
  comparison: {
    junior: "// ❌ validation scattered in template",
    senior: `// ✅ validators in form model
// reusable + testable`
  },
  interview: {
    questions: [
      {
        q: "Template-driven vs Reactive forms?",
        a: "Template-driven is simpler for small forms but harder to scale. Reactive forms provide explicit, testable form models and complex validation composition."
      },
      {
        q: "How do async validators work?",
        a: "They return an Observable/Promise and complete with either null (valid) or an error object. Common for server checks (unique username)."
      },
      {
        q: "What is ControlValueAccessor?",
        a: "The interface that allows custom components to integrate with Angular forms as if they were native controls."
      }
    ]
  }
};

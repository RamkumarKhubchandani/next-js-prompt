export const day15 = {
  day: 15,
  title: "Advanced Forms: Dynamic Forms & Custom Validators",
  intro: "Build complex, dynamic forms with FormArray and create custom validators for business logic.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 15. **Dynamic Forms** let you add/remove form controls at runtime. Perfect for 'Add Another' buttons."
      },
      {
        type: "challenge",
        instruction: "Create a FormArray to handle a dynamic list of phone numbers.",
        buggyCode: `// ❌ Fixed number of inputs
phone1 = new FormControl('');
phone2 = new FormControl('');
phone3 = new FormControl('');`,
        solutionCode: `// ✅ Dynamic FormArray
phones = new FormArray([
  new FormControl('')
]);

addPhone() {
  this.phones.push(new FormControl(''));
}

removePhone(index: number) {
  this.phones.removeAt(index);
}`,
        verifyOutput: "FormArray",
        successMessage: "Perfect! FormArray handles dynamic lists elegantly.",
        hint: "Use FormArray with push() and removeAt() methods."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 1. FormArray for Dynamic Lists</h3>
<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-purple-500">
<pre class="text-gray-800 dark:text-gray-100">
form = new FormGroup({
  name: new FormControl(''),
  emails: new FormArray([
    new FormControl('', [Validators.required, Validators.email])
  ])
});

get emails() {
  return this.form.get('emails') as FormArray;
}

addEmail() {
  this.emails.push(new FormControl('', Validators.email));
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">✅ 2. Custom Validators</h3>
<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
function passwordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    
    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    
    const valid = hasNumber && hasUpper && hasLower;
    return valid ? null : { passwordStrength: true };
  };
}
</pre>
</div>
`,
  code: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">📋 Dynamic Forms</h2>
      
      <form [formGroup]="form">
        <div formArrayName="emails" class="space-y-3">
          @for (email of emails.controls; track $index) {
            <div class="flex gap-2">
              <input
                [formControlName]="$index"
                placeholder="Email address"
                class="flex-1 p-2 rounded bg-gray-800 border border-gray-700"
              />
              <button
                (click)="removeEmail($index)"
                class="px-3 py-2 bg-red-600 rounded"
              >
                Remove
              </button>
            </div>
          }
        </div>
        
        <button
          (click)="addEmail()"
          class="mt-4 px-4 py-2 bg-blue-600 rounded"
        >
          Add Email
        </button>
      </form>
    </div>
  \`
})
export class DynamicFormComponent {
  form = new FormGroup({
    emails: new FormArray([
      new FormControl('', [Validators.required, Validators.email])
    ])
  });

  get emails() {
    return this.form.get('emails') as FormArray;
  }

  addEmail() {
    this.emails.push(new FormControl('', [Validators.required, Validators.email]));
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }
}`,
  comparison: {
    junior: `// ❌ Hardcoded inputs
<input [(ngModel)]="email1" />
<input [(ngModel)]="email2" />`,
    senior: `// ✅ Dynamic FormArray
<div formArrayName="emails">
  @for (control of emails.controls; track $index) {
    <input [formControlName]="$index" />
  }
</div>`
  },
  interview: {
    questions: [
      {
        q: "When do you use FormArray vs FormGroup?",
        a: "FormArray for dynamic lists of controls (unknown length). FormGroup for fixed structure with named controls."
      }
    ]
  }
};

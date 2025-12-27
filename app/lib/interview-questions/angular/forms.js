export const formsQuestions = [
    {
        id: 'angular-forms-1',
        category: 'Forms',
        difficulty: 'Medium',
        question: 'Reactive Forms - FormControl, FormGroup, FormArray',
        answer: `**Reactive Forms** provide programmatic control over forms.

### Core Classes:
- **FormControl** - Single field
- **FormGroup** - Group of fields
- **FormArray** - Dynamic array of fields

### Benefits:
- Type-safe
- Testable
- Reactive
- Programmatic control`,
        codeExample: `// Reactive Forms
console.log('=== FormControl ===');
console.log('const name = new FormControl("John");');
console.log('console.log(name.value); // "John"');
console.log('name.setValue("Jane");');

console.log('\\n=== FormGroup ===');
console.log('const form = new FormGroup({');
console.log('  name: new FormControl(""),');
console.log('  email: new FormControl("")');
console.log('});');
console.log('console.log(form.value); // { name: "", email: "" }');

console.log('\\n=== FormArray ===');
console.log('const items = new FormArray([');
console.log('  new FormControl("Item 1"),');
console.log('  new FormControl("Item 2")');
console.log(']);');
console.log('items.push(new FormControl("Item 3"));');

console.log('\\n✓ Reactive forms: Programmatic control');`
    },
    {
        id: 'angular-forms-2',
        category: 'Forms',
        difficulty: 'Hard',
        question: 'Custom Validators - Sync and Async Validation',
        answer: `**Custom validators** provide custom validation logic.

### Types:
- **Sync validators** - Immediate validation
- **Async validators** - Server-side validation

### Implementation:
Return null for valid, error object for invalid`,
        codeExample: `// Custom Validators
console.log('=== Sync Validator ===');
console.log('function emailValidator(control: AbstractControl) {');
console.log('  const email = control.value;');
console.log('  const valid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);');
console.log('  return valid ? null : { invalidEmail: true };');
console.log('}');

console.log('\\n=== Using Validator ===');
console.log('const email = new FormControl("", [');
console.log('  Validators.required,');
console.log('  emailValidator');
console.log(']);');

console.log('\\n=== Async Validator ===');
console.log('function uniqueEmailValidator(http: HttpClient) {');
console.log('  return (control: AbstractControl) => {');
console.log('    return http.get("/api/check-email?email=" + control.value)');
console.log('      .pipe(');
console.log('        map(exists => exists ? { emailTaken: true } : null)');
console.log('      );');
console.log('  };');
console.log('}');

console.log('\\n✓ Custom validators: Flexible validation');`
    },
    {
        id: 'angular-forms-3',
        category: 'Forms',
        difficulty: 'Medium',
        question: 'Template-driven Forms vs Reactive Forms',
        answer: `**Two approaches** to forms in Angular.

### Template-driven:
- Simpler syntax
- Less code
- Good for simple forms

### Reactive:
- More control
- Type-safe
- Better for complex forms

### Best Practice:
Use Reactive Forms for most cases`,
        codeExample: `// Template-driven vs Reactive
console.log('=== Template-driven ===');
console.log('<form #form="ngForm" (ngSubmit)="onSubmit(form)">');
console.log('  <input name="name" ngModel required>');
console.log('</form>');

console.log('\\n=== Reactive ===');
console.log('class Component {');
console.log('  form = new FormGroup({');
console.log('    name: new FormControl("", Validators.required)');
console.log('  });');
console.log('  ');
console.log('  onSubmit() {');
console.log('    console.log(this.form.value);');
console.log('  }');
console.log('}');

console.log('\\n✓ Reactive: Better for complex forms');`
    },
    {
        id: 'angular-forms-4',
        category: 'Forms',
        difficulty: 'Hard',
        question: 'Dynamic Forms - FormArray and Dynamic Controls',
        answer: `**Dynamic forms** add/remove controls at runtime.

### Use Cases:
- Dynamic fields
- Repeating sections
- Conditional fields

### Implementation:
Use FormArray for dynamic lists`,
        codeExample: `// Dynamic Forms
console.log('=== Dynamic FormArray ===');
console.log('class Component {');
console.log('  form = new FormGroup({');
console.log('    items: new FormArray([])');
console.log('  });');
console.log('  ');
console.log('  get items() {');
console.log('    return this.form.get("items") as FormArray;');
console.log('  }');
console.log('  ');
console.log('  addItem() {');
console.log('    this.items.push(new FormControl(""));');
console.log('  }');
console.log('  ');
console.log('  removeItem(index: number) {');
console.log('    this.items.removeAt(index);');
console.log('  }');
console.log('}');

console.log('\\n=== Template ===');
console.log('@for (item of items.controls; track $index) {');
console.log('  <input [formControl]="item">');
console.log('  <button (click)="removeItem($index)">Remove</button>');
console.log('}');

console.log('\\n✓ FormArray: Dynamic fields');`
    },
    {
        id: 'angular-forms-5',
        category: 'Forms',
        difficulty: 'Expert',
        question: 'Typed Forms - FormControl<T> (Angular 14+)',
        answer: `**Typed forms** provide type safety for form controls.

### Benefits:
- Type-safe values
- Better IDE support
- Catch errors at compile time

### Migration:
Old FormControl → New FormControl<T>`,
        codeExample: `// Typed Forms
console.log('=== OLD: Untyped ===');
console.log('const name = new FormControl("");');
console.log('const value = name.value; // any');

console.log('\\n=== NEW: Typed ===');
console.log('const name = new FormControl<string>("");');
console.log('const value = name.value; // string | null');

console.log('\\n=== Typed FormGroup ===');
console.log('interface UserForm {');
console.log('  name: FormControl<string>;');
console.log('  age: FormControl<number>;');
console.log('}');
console.log('');
console.log('const form = new FormGroup<UserForm>({');
console.log('  name: new FormControl("", { nonNullable: true }),');
console.log('  age: new FormControl(0, { nonNullable: true })');
console.log('});');

console.log('\\n✓ Typed forms: Type safety');`
    },
    {
        id: 'angular-forms-6',
        category: 'Forms',
        difficulty: 'Hard',
        question: 'Form State Management - valueChanges, statusChanges',
        answer: `**Form observables** track form state changes.

### Observables:
- **valueChanges** - Value changes
- **statusChanges** - Validation status changes

### Use Cases:
- Auto-save
- Conditional validation
- Real-time search`,
        codeExample: `// Form State
console.log('=== valueChanges ===');
console.log('form.valueChanges.subscribe(value => {');
console.log('  console.log("Form value:", value);');
console.log('  this.autoSave(value);');
console.log('});');

console.log('\\n=== statusChanges ===');
console.log('form.statusChanges.subscribe(status => {');
console.log('  console.log("Form status:", status); // VALID, INVALID, PENDING');
console.log('  this.updateSubmitButton(status === "VALID");');
console.log('});');

console.log('\\n=== Real-time Search ===');
console.log('searchControl.valueChanges.pipe(');
console.log('  debounceTime(300),');
console.log('  switchMap(query => this.search(query))');
console.log(').subscribe(results => {');
console.log('  this.results = results;');
console.log('});');

console.log('\\n✓ Form observables: Reactive state');`
    }
];

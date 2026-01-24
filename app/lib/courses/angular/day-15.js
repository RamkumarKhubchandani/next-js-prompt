export const day15 = {
  day: 15,
  title: "Modern Reactive Forms: Typed & Signal-Driven",
  intro: "Untyped forms are a source of constant bugs. Today, we switch to <strong>Strictly Typed Forms</strong> and learn to sync them with <strong>Signals</strong> for reactive perfection.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 15. In modern Angular, forms are strictly typed. No more `form.value.someProp` returning `any`."
      },
      {
        type: "talk",
        message: "We also prefer `NonNullableFormBuilder` (nnfb) because it removes `undefined` from the value type, making it safer to use."
      },
      {
        type: "challenge",
        instruction: "Refactor this untyped form to a strictly Typed Form using NonNullableFormBuilder.",
        buggyCode: `// ❌ Untyped (Angular <14)
const form = new FormGroup({
  name: new FormControl(''),
  age: new FormControl(0)
});
// value is any or partial`,
        solutionCode: `// ✅ Strictly Typed
const fb = inject(NonNullableFormBuilder);
const form = fb.group({
  name: [''], // Infered as FormControl<string>
  age: [0]    // Infered as FormControl<number>
});
// form.getRawValue() returns {name: string, age: number}`,
        verifyOutput: "NonNullableFormBuilder",
        successMessage: "Type safety achieved! Now TypeScript will yell at you if you assume 'age' is a string.",
        hint: "Inject `NonNullableFormBuilder` and use `fb.group()`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🛡️ 1. Why Typed Forms?</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Before Angular 14, accessing <code>form.value.email</code> returned <code>any</code>. If you made a typo (e.g., <code>emial</code>), Angular wouldn't care, but your app would crash at runtime.
</p>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Now, <code>form.value.email</code> is a string. If you try to assign a number to it, TypeScript yells at you.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-gray-50 dark:bg-dark-900/40 p-5 rounded-xl border border-gray-200 dark:border-dark-700">
        <h4 class="font-bold text-gray-800 dark:text-white mb-3">Nullable (Standard)</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
name: FormControl&lt;string | null&gt;
// Value can be 'Bob' or null (if reset)
        </pre>
    </div>
    <div class="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-900/30">
        <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-3">NonNullable (Better)</h4>
        <pre class="text-xs font-mono text-blue-900 dark:text-blue-200">
name: FormControl&lt;string&gt;
// Value is ALWAYS a string. 
// Reset() -> goes back to initial value ('')
        </pre>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 2. Forms + Signals</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Forms are reactive (Observables). Signals are reactive (Primitives). You can bridge them using <code>toSignal(form.valueChanges)</code>.
</p>
`,
  code: `import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators, AbstractControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, debounceTime, startWith, switchMap, timer, of } from 'rxjs';

// --- ASYNC VALIDATOR (Simulated) ---
const usernameValidator = (control: AbstractControl) => {
    // Debounce is usually handled in the pipe, but for ValidatorFn we just simulate delay
    if (!control.value) return of(null);
    return timer(1000).pipe(
        map(() => ['admin', 'root', 'user'].includes(control.value.toLowerCase()) 
            ? { taken: true } 
            : null
        )
    );
};

@Component({
  selector: 'app-typed-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: \`
    <div class="max-w-xl mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <h2 class="text-2xl font-bold text-white mb-6">🛡️ Strictly Typed Signal Form</h2>

        <form [formGroup]="form" class="space-y-6">
            
            <!-- Username Input -->
            <div class="space-y-2">
                <label class="text-sm text-gray-400 font-bold uppercase">Username</label>
                <div class="relative">
                    <input formControlName="username" 
                           class="w-full bg-gray-900 border text-white rounded-lg px-4 py-3 outline-none transition-all"
                           [class.border-red-500]="username?.invalid && username?.touched"
                           [class.border-green-500]="username?.valid && username?.touched"
                           [class.border-gray-700]="username?.untouched"
                           placeholder="Type 'admin' to fail..." />
                    
                    @if (username?.pending) {
                        <div class="absolute right-3 top-3 text-xs text-blue-400 font-mono animate-pulse">Checking...</div>
                    }
                </div>
                <!-- Errors -->
                @if (username?.hasError('required') && username?.touched) {
                    <p class="text-xs text-red-500">Username is required.</p>
                }
                @if (username?.hasError('taken')) {
                    <p class="text-xs text-red-500">❌ Username is already taken.</p>
                }
                @if (username?.valid && username?.touched) {
                     <p class="text-xs text-green-500">✓ Available</p>
                }
            </div>

            <!-- Email Input -->
             <div class="space-y-2">
                <label class="text-sm text-gray-400 font-bold uppercase">Email</label>
                <input formControlName="email" 
                       class="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-all"
                       placeholder="john@example.com" />
            </div>

             <!-- Bio Input -->
             <div class="space-y-2">
                <label class="text-sm text-gray-400 font-bold uppercase">Bio</label>
                <textarea formControlName="bio" rows="3"
                       class="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-all"
                       placeholder="Tell us about yourself..."></textarea>
            </div>
            
            <!-- Read-only Signal Sync Demo -->
            <div class="mt-8 p-4 bg-gray-900 rounded-xl border border-dashed border-gray-700">
                <h3 class="text-xs text-gray-500 uppercase tracking-widest mb-4">Live Signal store Sync</h3>
                
                <div class="grid grid-cols-2 gap-4 text-sm font-mono">
                    <div class="p-2 bg-black/30 rounded">
                        <span class="block text-gray-500 text-[10px]">RAW VALUE (Signal)</span>
                        <span class="text-green-400 break-all">{{ signalValue() | json }}</span>
                    </div>
                     <div class="p-2 bg-black/30 rounded">
                        <span class="block text-gray-500 text-[10px]">FORM STATUS</span>
                         <span [class.text-green-400]="form.valid" [class.text-red-400]="form.invalid">
                             {{ form.status }}
                         </span>
                    </div>
                </div>
                
                <div class="mt-4 p-2 bg-blue-900/10 border border-blue-500/20 rounded text-center">
                    <p class="text-xs text-blue-400">
                        Is Valid & Complete: <strong class="text-white">{{ isValidAndComplete() ? 'YES' : 'NO' }}</strong>
                    </p>
                </div>
            </div>
            
             <button [disabled]="form.invalid || form.pending" type="submit" class="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20">
                Submit Account
            </button>
        </form>
    </div>
  \`
})
export class TypedFormLab {
    fb = inject(NonNullableFormBuilder);

    form = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)], [usernameValidator]],
        email: ['', [Validators.required, Validators.email]],
        bio: ['']
    });

    // ⚡ SYNC: Convert form stream to Signal
    // We use toSignal with 'initialValue' to avoid undefined issues
    signalValue = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

    // ⚡ COMPUTED: Derive state from formula
    isValidAndComplete = computed(() => {
        const val = this.signalValue();
        // Reactive check on values + internal state check manually if needed (signals don't track validity state automatically yet without custom wrappers)
        return this.form.valid && !!val.bio;
    });

    get username() { return this.form.get('username'); }
}`,
  comparison: {
    junior: `// ❌ Manual "any" casting
const val = form.value as any; 
console.log(val.usernam); // Typo! No error. Runtime crash.`,
    senior: `// ✅ Strict Types
const val = form.getRawValue();
console.log(val.username); // Autocomplete works!
// console.log(val.usernam); // Compile Error!`
  },
  interview: {
    questions: [
      {
        q: "Why use 'NonNullableFormBuilder'?",
        a: "It creates controls where the value is non-nullable (e.g. `string` instead of `string | null`). Also, `reset()` resets to the initial value instead of `null`."
      },
      {
        q: "What is 'toSignal'?",
        a: "An interop function that converts an Observable (like `valueChanges`) into a Signal, allowing you to use reactive form data in `computed()` signals."
      }
    ]
  }
};

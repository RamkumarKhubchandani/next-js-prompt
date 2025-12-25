export const day25 = {
  day: 25,
  title: "Advanced Forms (ControlValueAccessor, Dynamic Forms)",
  intro: "Build reusable form components and dynamic form builders that scale across teams.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">CVA Mental Model</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
ControlValueAccessor is the bridge between Angular forms and your custom input component.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Why CVA Exists</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Without CVA, your custom inputs can’t participate in touched/dirty/disabled states and validators.
CVA makes custom components first-class form controls.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Dynamic Forms (Config-Driven)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Dynamic forms let you build admin panels and survey builders. The trick is: keep a strong schema for config
and map it to typed form controls.
</p>
            `,
  code: `// CVA essentials:
// writeValue(value), registerOnChange(fn), registerOnTouched(fn), setDisabledState(isDisabled)`,
  comparison: {
    junior: "// ❌ custom inputs that don't integrate",
    senior: "// ✅ CVA + typed forms"
  },
  interview: {
    questions: [
      {
        q: "What does ControlValueAccessor enable?",
        a: "It allows custom components to participate in Angular forms, including validation, touched/dirty states, and disabled behavior."
      },
      {
        q: "Why dynamic forms?",
        a: "To build form UIs from configuration (admin panels, surveys) while keeping validation and types manageable."
      },
      {
        q: "How do you validate cross-field rules?",
        a: "Use a form-group validator that checks multiple controls (e.g., password + confirmPassword)."
      }
    ]
  }
};

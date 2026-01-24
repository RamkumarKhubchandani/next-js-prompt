export const day18 = {
  "day": 18,
  "title": "Declaration Files (.d.ts)",
  "intro": "How to use JavaScript libraries in TypeScript. Writing your own type definitions for untyped code.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 18. Declarations. Sometimes you need to tell TypeScript: 'Trust me, this exists on window'."
      },
      {
        "type": "challenge",
        "instruction": "Accessing `window.config` fails because `Window` interface doesn't have it. Augment the interface.",
        "buggyCode": "// ❌ Property 'config' does not exist on type 'Window'\nwindow.config = { env: 'dev' };",
        "solutionCode": "// ✅ Declaration Merging\ndeclare global {\n  interface Window {\n    config: { env: string };\n  }\n}\nwindow.config = { env: 'dev' };",
        "verifyOutput": "declare global",
        "successMessage": "Correct! This is called 'Global Augmentation'. You are adding properties to the global scope safely.",
        "hint": "Use `declare global { interface Window { ... } }`."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Ambient Context</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Use <code>declare</code> to tell TS about variables that exist at runtime (e.g., from a CDN script).\n</p>\n",
  "code": "// Day 18: Declarations\n\n// global.d.ts\ndeclare var MY_GLOBAL_CONFIG: {\n  apiUrl: string;\n};\n\n// usage.ts\nconsole.log(MY_GLOBAL_CONFIG.apiUrl); // No error",
  "labSteps": [
    {
      "id": "ts-d18-lab",
      "title": "Module Augmentation",
      "subtitle": "Extending libraries",
      "teacherNote": "Add a method to String prototype.",
      "bugCode": "String.prototype.shout = ... // Error",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "declare global { interface String { shout(): string; } }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "You must declare it before you define it."
      ]
    }
  ]
};
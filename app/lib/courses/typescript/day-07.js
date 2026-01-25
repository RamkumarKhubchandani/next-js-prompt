export const day07 = {
  "day": 7,
  "title": "Advanced Generics & Constraints",
  "intro": "Sometimes you want a generic, but not *any* type. Constraints let you limit what types can be passed to your generic.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 7. Generic Constraints. You can't just access `.length` on `T` because `T` could be a number. You must prove it."
      },
      {
        "type": "challenge",
        "instruction": "This function fails because TS doesn't know if `arg` has a `.length` property. Constrain `T` to ensure it does.",
        "buggyCode": "// ❌ Error: Property 'length' does not exist on type 'T'\nfunction logLength<T>(arg: T) {\n  console.log(arg.length);\n}",
        "solutionCode": "// ✅ Constrained\nfunction logLength<T extends { length: number }>(arg: T) {\n  console.log(arg.length);\n}",
        "verifyOutput": "extends { length: number }",
        "successMessage": "Excellent. `extends` acts like a filter. Now you can pass strings or arrays, but not numbers.",
        "hint": "Use `<T extends { length: number }>`."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) The 'extends' keyword</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Use <code>extends</code> to enforce that a generic type must have certain properties.\n</p>\n",
  "code": "// Day 7: Constraints\n\n// We want T to have a .length property\nfunction logLength<T extends { length: number }>(arg: T) {\n  console.log(arg.length);\n}\n\nlogLength(\"hello\"); // OK (string has length)\nlogLength([1, 2]); // OK (array has length)\n// logLength(10); // Error (number has no length)\n\n// keyof Constraint\nfunction getProperty<T, K extends keyof T>(obj: T, key: K) {\n  return obj[key];\n}",
  "labSteps": [
    {
      "id": "ts-d7-lab",
      "title": "Constraining Objects",
      "subtitle": "Must have ID",
      "teacherNote": "Ensure T has an id property.",
      "bugCode": "function printId<T>(obj: T) { console.log(obj.id); } // Error: id not on T",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "function printId<T extends { id: number }>(obj: T) { console.log(obj.id); }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Now TS knows 'id' exists on 'obj'."
      ]
    }
  ]
};
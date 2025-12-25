export const day07 = {
  "day": 7,
  "title": "Advanced Generics & Constraints",
  "intro": "Sometimes you want a generic, but not *any* type. Constraints let you limit what types can be passed to your generic.",
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
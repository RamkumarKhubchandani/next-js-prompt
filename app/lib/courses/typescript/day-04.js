export const day04 = {
  "day": 4,
  "title": "Functions & Call Signatures",
  "intro": "Functions are first-class citizens. We learn how to type arguments, return values, and handle function overloading.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Typing Functions</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Explicitly type arguments. Return types are usually inferred, but explicit returns prevent accidental changes.\n</p>\n",
  "code": "// Day 4: Functions\n\n// 1. Basic\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\n// 2. Optional Parameters\nfunction greet(name: string, greeting?: string) {\n  return `${greeting || 'Hello'}, ${name}`;\n}\n\n// 3. Function Types\ntype MathOp = (x: number, y: number) => number;\nconst multiply: MathOp = (x, y) => x * y;\n",
  "labSteps": [
    {
      "id": "ts-d4-lab",
      "title": "Optional Args",
      "subtitle": "Handling undefined",
      "teacherNote": "Make the last argument optional.",
      "bugCode": "function f(a: number, b: number) {} f(1); // Error",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "function f(a: number, b?: number) {} f(1); // OK",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "The '?' makes it optional."
      ]
    }
  ]
};
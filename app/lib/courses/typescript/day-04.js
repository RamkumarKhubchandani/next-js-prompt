export const day04 = {
  "day": 4,
  "title": "Functions & Call Signatures",
  "intro": "Functions are first-class citizens. We learn how to type arguments, return values, and handle function overloading.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 4. Functions. A common pitfall: you can't have a required argument *after* an optional one."
      },
      {
        "type": "challenge",
        "instruction": "This function signature is invalid. `a` is optional but `b` is required. Fix order.",
        "buggyCode": "// ❌ Invalid parameter order\nfunction f(a?: number, b: number) {}",
        "solutionCode": "// ✅ Required first, optional last\nfunction f(b: number, a?: number) {}",
        "verifyOutput": "b: number, a?: number",
        "successMessage": "Got it. When calling `f(1)`, is 1 for `a` or `b`? The ambiguity is why required args must come first.",
        "hint": "Swap `a` and `b` so the required argument comes first."
      }
    ]
  },
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
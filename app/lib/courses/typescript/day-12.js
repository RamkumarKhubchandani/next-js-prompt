export const day12 = {
  "day": 12,
  "title": "Advanced Utilities",
  "intro": "Extracting types from functions. ReturnType and Parameters allow you to infer types from existing code.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) ReturnType</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Get the return type of a function type.\n</p>\n",
  "code": "// Day 12: Advanced Utilities\n\nfunction createUser() {\n  return { id: 1, name: \"Alice\", active: true };\n}\n\n// Extract return type\ntype User = ReturnType<typeof createUser>;\n\n// Extract parameters\nfunction move(x: number, y: number) {}\ntype MoveParams = Parameters<typeof move>; // [number, number]",
  "labSteps": [
    {
      "id": "ts-d12-lab",
      "title": "Promise Return",
      "subtitle": "Async types",
      "teacherNote": "Get the type INSIDE the Promise.",
      "bugCode": "async function get() { return 1; } \ntype T = ReturnType<typeof get>; // Promise<number>",
      "bugFocus": {
        "fromLine": 2,
        "toLine": 2
      },
      "fixCode": "type T = Awaited<ReturnType<typeof get>>;",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Awaited unwraps the Promise."
      ]
    }
  ]
};
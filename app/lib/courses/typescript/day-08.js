export const day08 = {
  "day": 8,
  "title": "Unions, Intersections & Narrowing",
  "intro": "Modeling real-world data often requires combining types. Learn how to mix types and then safely pull them apart.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 8. Narrowing. TypeScript is smart enough to follow your `if` statements."
      },
      {
        "type": "challenge",
        "instruction": "This function handles a `string | number`, but the `.repeat()` method only exists on strings. Use `typeof` to narrow the type.",
        "buggyCode": "// ❌ Error: Property 'repeat' does not exist on type 'string | number'.\nfunction pad(val: string | number) {\n  return val.repeat(2);\n}",
        "solutionCode": "// ✅ Safe narrowing\nfunction pad(val: string | number) {\n  if (typeof val === 'string') {\n    return val.repeat(2);\n  }\n  return val * 2;\n}",
        "verifyOutput": "typeof val === 'string'",
        "successMessage": "Correct! Inside the `if` block, TS knows `val` is a string. This is called Control Flow Analysis.",
        "hint": "Wrap the `repeat` call in `if (typeof val === 'string')`."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Narrowing</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    TypeScript understands control flow. If you check <code>typeof x === 'string'</code>, TS knows x is a string inside that block.\n</p>\n",
  "code": "// Day 8: Narrowing\n\nfunction padLeft(padding: number | string, input: string) {\n  if (typeof padding === \"number\") {\n    // padding is number here\n    return \" \".repeat(padding) + input;\n  }\n  // padding is string here\n  return padding + input;\n}\n\n// Intersection\ntype Draggable = { drag: () => void };\ntype Resizable = { resize: () => void };\ntype UIElement = Draggable & Resizable;",
  "labSteps": [
    {
      "id": "ts-d8-lab",
      "title": "Truthiness Narrowing",
      "subtitle": "Checking for null",
      "teacherNote": "Handle the null case.",
      "bugCode": "function print(s: string | null) { console.log(s.toUpperCase()); } // Error",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "function print(s: string | null) { if (s) { console.log(s.toUpperCase()); } }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "The 'if (s)' check removes null from the type."
      ]
    }
  ]
};